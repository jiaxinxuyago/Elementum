// ─────────────────────────────────────────────────────────────────────────────
// ELEMENTUM · Stripe webhook → Supabase entitlements (DOC10 §4.2)
// ─────────────────────────────────────────────────────────────────────────────
// Stripe POSTs events here. On a verified checkout.session.completed carrying
// a client_reference_id (the buyer's Supabase user id — attached by the app's
// purchase flow), write the Founding entitlement server-side:
//   tier=advisor · has_founding=true · stripe_customer_id
// This makes "paid" server-truth: the client can only READ its entitlement
// (RLS); only this Worker (service-role) can write it. Idempotent — Stripe
// retries and duplicate events converge on the same row state.
// ─────────────────────────────────────────────────────────────────────────────

const enc = new TextEncoder();

// Stripe signature scheme: header "t=<unix>,v1=<hmac>,..." where
// v1 = HMAC-SHA256(secret, `${t}.${rawBody}`) hex. Reject stale timestamps.
async function verifyStripeSignature(rawBody, header, secret, toleranceSec = 300) {
  if (!header || !secret) return false;
  let t = null;
  const v1s = [];
  for (const part of header.split(',')) {
    const [k, v] = part.split('=', 2);
    if (k === 't') t = v;
    else if (k === 'v1') v1s.push(v);
  }
  if (!t || v1s.length === 0) return false;
  if (Math.abs(Date.now() / 1000 - Number(t)) > toleranceSec) return false;

  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const mac = await crypto.subtle.sign('HMAC', key, enc.encode(`${t}.${rawBody}`));
  const expected = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, '0')).join('');

  // Constant-time-ish compare against each candidate signature.
  return v1s.some((v1) => {
    if (v1.length !== expected.length) return false;
    let diff = 0;
    for (let i = 0; i < expected.length; i++) diff |= v1.charCodeAt(i) ^ expected.charCodeAt(i);
    return diff === 0;
  });
}

// Upsert entitlement fields (on_conflict=user_id ⇒ idempotent; merge-duplicates
// updates ONLY the provided columns, so a Self-Report grant never touches tier).
async function grantEntitlement(env, userId, fields) {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/entitlements?on_conflict=user_id`, {
    method: 'POST',
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify([{
      user_id: userId,
      ...fields,
      updated_at: new Date().toISOString(),
    }]),
  });
  if (!res.ok) throw new Error(`supabase upsert failed: ${res.status} ${await res.text()}`);
  return res.json();
}

// ── Product routing ──────────────────────────────────────────────────────────
// Payment-Link webhook events carry no product identifier we can verify
// without a Stripe API key, so products are routed by amount_total (cents).
// ⚠ If a price changes in Stripe, change it here IN THE SAME DEPLOY.
const PRODUCTS = {
  900: { name: 'founding-pass', fields: { tier: 'advisor', has_founding: true } }, // $9.00
  699: { name: 'self-report',   fields: { has_self_report: true } },               // $6.99
};

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response('elementum-stripe-webhook: POST only', { status: 405 });
    }

    const rawBody = await request.text();
    const ok = await verifyStripeSignature(
      rawBody, request.headers.get('stripe-signature'), env.STRIPE_WEBHOOK_SECRET
    );
    if (!ok) return new Response('invalid signature', { status: 400 });

    let event;
    try { event = JSON.parse(rawBody); } catch { return new Response('bad payload', { status: 400 }); }

    if (event.type === 'checkout.session.completed') {
      const session = event.data?.object || {};
      const userId = session.client_reference_id;
      if (session.payment_status === 'paid' && userId) {
        const product = PRODUCTS[session.amount_total];
        if (!product) {
          // Unknown amount — a price changed in Stripe without updating PRODUCTS,
          // or an unexpected checkout. Log loudly for manual grant; ack so Stripe
          // doesn't retry forever (the data is safe in the Stripe dashboard).
          console.error(`UNKNOWN AMOUNT ${session.amount_total} user=${userId} session=${session.id} — grant manually + update PRODUCTS`);
          return new Response('received (unknown product — logged)', { status: 200 });
        }
        try {
          await grantEntitlement(env, userId, { ...product.fields, stripe_customer_id: session.customer || null });
          console.log(`${product.name} granted: user=${userId} session=${session.id}`);
        } catch (err) {
          // 500 → Stripe retries with backoff; nothing is lost.
          console.error(String(err));
          return new Response('entitlement write failed', { status: 500 });
        }
      } else {
        // Paid but no user id = a checkout that bypassed the app's account gate
        // (e.g. the bare Payment Link opened directly). Log for manual backfill.
        console.warn(`checkout completed without client_reference_id: session=${session.id} email=${session.customer_details?.email || '?'}`);
      }
    }

    // Acknowledge everything else so Stripe doesn't retry irrelevant events.
    return new Response('received', { status: 200 });
  },
};
