// ─────────────────────────────────────────────────────────────────────────────
// ELEMENTUM · Stripe webhook → Supabase entitlements (INF_01 §4.2)
// ─────────────────────────────────────────────────────────────────────────────
// Stripe POSTs events here. On a verified checkout.session.completed carrying
// a client_reference_id (the buyer's Supabase user id — attached by the app's
// purchase flow), write the entitlement server-side (migration 0005):
//   Founding Pass → tier=seeker · has_founding · advisor_until = +12 months (S5 A)
//   Self-Report   → has_self_report
//   Subscription  → sub_tier · sub_status · stripe_customer_id (S6 A); later
//                   customer.subscription.* events find the row by customer id.
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
// without a Stripe API key, so products are routed by amount (cents). Routing
// keys on amount_subtotal (the PRE-DISCOUNT price) so promotion codes — incl.
// the 100%-off testing coupon — still identify the product; amount_total is
// the fallback for events without a subtotal.
// ⚠ If a price changes in Stripe, change it here IN THE SAME DEPLOY.
// Founding buyers before 2026-10-22 hold tier 'advisor' for life and are never
// touched; from the S5 A ruling a new pass is Seeker for life plus 12 months of
// Advisor (src/infra/entitlement.js reads advisor_until).
const YEAR_MS = 365 * 24 * 60 * 60 * 1000;
const PRODUCTS = {
  900: { name: 'founding-pass', fields: () => ({ tier: 'seeker', has_founding: true, advisor_until: new Date(Date.now() + YEAR_MS).toISOString() }) }, // $9.00
  699: { name: 'self-report',   fields: () => ({ has_self_report: true }) },                                                                          // $6.99
};

// Subscriptions (S6 A). Each subscription Payment Link carries metadata
// plan=seeker|advisor, copied to the checkout session and (through
// subscription_data.metadata) to the subscription. The recurring amount is the
// fallback, so a link set up without metadata still routes.
// ⚠ Same rule as PRODUCTS: a price change in Stripe ships with this table.
const PLANS = {
  999: 'seeker', 5999: 'seeker',     // $9.99/mo · $59.99/yr
  1999: 'advisor', 11999: 'advisor', // $19.99/mo · $119.99/yr
};
const planOf = (obj) => {
  const meta = obj?.metadata?.plan;
  if (meta === 'seeker' || meta === 'advisor') return meta;
  const price = obj?.items?.data?.[0]?.price;
  return PLANS[price?.unit_amount ?? obj?.amount_subtotal] || null;
};

// Update the row that holds this Stripe customer. Returns the rows written; an
// empty result means the checkout that links customer → user has not landed
// yet, and the caller answers 500 so Stripe retries the event later.
async function updateByCustomer(env, customerId, fields) {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/entitlements?stripe_customer_id=eq.${encodeURIComponent(customerId)}`, {
    method: 'PATCH',
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({ ...fields, updated_at: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error(`supabase update failed: ${res.status} ${await res.text()}`);
  return res.json();
}

const SUB_EVENTS = new Set(['customer.subscription.created', 'customer.subscription.updated', 'customer.subscription.deleted']);

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
      // 'no_payment_required' = a zero-total checkout (100%-off promotion
      // code) — legitimate and complete; Stripe never marks those 'paid'.
      const settled = session.payment_status === 'paid' || session.payment_status === 'no_payment_required';
      if (userId && session.mode === 'subscription') {
        // A subscription checkout (a trial completes with nothing paid yet).
        const plan = planOf(session);
        if (!plan) {
          console.error(`UNKNOWN PLAN subtotal=${session.amount_subtotal} user=${userId} session=${session.id} — set metadata plan on the Payment Link`);
          return new Response('received (unknown plan — logged)', { status: 200 });
        }
        try {
          await grantEntitlement(env, userId, { sub_tier: plan, sub_status: session.payment_status === 'paid' ? 'active' : 'trialing', stripe_customer_id: session.customer || null });
          console.log(`subscription ${plan} started: user=${userId} session=${session.id}`);
        } catch (err) {
          console.error(String(err));
          return new Response('entitlement write failed', { status: 500 });
        }
      } else if (settled && userId) {
        const cents = session.amount_subtotal ?? session.amount_total;
        const product = PRODUCTS[cents];
        if (!product) {
          // Unknown amount — a price changed in Stripe without updating PRODUCTS,
          // or an unexpected checkout. Log loudly for manual grant; ack so Stripe
          // doesn't retry forever (the data is safe in the Stripe dashboard).
          console.error(`UNKNOWN AMOUNT subtotal=${session.amount_subtotal} total=${session.amount_total} user=${userId} session=${session.id} — grant manually + update PRODUCTS`);
          return new Response('received (unknown product — logged)', { status: 200 });
        }
        try {
          await grantEntitlement(env, userId, { ...product.fields(), stripe_customer_id: session.customer || null });
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

    if (SUB_EVENTS.has(event.type)) {
      // Renewals, plan changes, failed cards and cancellations (the Customer
      // Portal and dunning both end here).
      const sub = event.data?.object || {};
      const ended = event.type === 'customer.subscription.deleted';
      const plan = planOf(sub);
      const fields = { sub_status: ended ? 'canceled' : sub.status };
      if (plan) fields.sub_tier = plan;
      try {
        const rows = sub.customer ? await updateByCustomer(env, sub.customer, fields) : [];
        if (!rows.length) {
          // A fresh event usually beat its own checkout.session.completed: ask
          // Stripe to retry. Past an hour (or a cancellation) the customer never
          // came through the app: log for manual backfill and acknowledge.
          const fresh = Date.now() / 1000 - (event.created || 0) < 3600;
          console.warn(`${event.type}: no entitlement row for customer=${sub.customer}${fresh && !ended ? ' yet — Stripe will retry' : ' — backfill by hand'}`);
          if (fresh && !ended) return new Response('customer not linked yet', { status: 500 });
          return new Response('received (customer not linked — logged)', { status: 200 });
        }
        console.log(`${event.type}: customer=${sub.customer} status=${fields.sub_status} plan=${plan || 'unchanged'}`);
      } catch (err) {
        console.error(String(err));
        return new Response('entitlement write failed', { status: 500 });
      }
    }

    // Acknowledge everything else so Stripe doesn't retry irrelevant events.
    return new Response('received', { status: 200 });
  },
};
