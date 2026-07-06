// ─────────────────────────────────────────────────────────────────────────────
// ELEMENTUM · Web Push service (DOC10 §4.4)
// ─────────────────────────────────────────────────────────────────────────────
// Three jobs:
//   POST /subscribe    {subscription, utcHour, userId?} → upsert push_subscriptions
//   POST /unsubscribe  {endpoint}                       → delete row
//   GET  /message      → today's DATE-BASED reading hook (no PII — same for all)
//   cron (hourly)      → payload-less push to every sub whose utc_hour matches;
//                        the service worker wakes, fetches /message, shows it.
//
// Payload-less sends need only VAPID auth (ES256 JWT) — no RFC 8291 payload
// encryption. Dead subscriptions (404/410 from the push service) are pruned.
// ─────────────────────────────────────────────────────────────────────────────

const HS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const STEM_META = [
  { el: 'Wood',  name: 'the Oak',      line: 'Wood runs today — growth wants a direction. One deliberate step counts double.' },
  { el: 'Wood',  name: 'the Vine',     line: 'Yin Wood runs today — progress bends around obstacles instead of breaking on them.' },
  { el: 'Fire',  name: 'the Sun',      line: 'Fire runs today — visibility is cheap and attention is warm. Show the thing.' },
  { el: 'Fire',  name: 'the Ember',    line: 'Yin Fire runs today — a small sustained warmth outlasts a blaze. Tend one thing.' },
  { el: 'Earth', name: 'the Mountain', line: 'Earth runs today — steadiness reads as strength. Hold your position.' },
  { el: 'Earth', name: 'the Field',    line: 'Yin Earth runs today — quiet tending compounds. Feed what is already planted.' },
  { el: 'Metal', name: 'the Blade',    line: 'Metal runs today — the current favors clean cuts and honest edges.' },
  { el: 'Metal', name: 'the Jewel',    line: 'Yin Metal runs today — refinement over force. Polish beats effort.' },
  { el: 'Water', name: 'the Ocean',    line: 'Water runs today — momentum comes from flowing around, not pushing through.' },
  { el: 'Water', name: 'the Rain',     line: 'Yin Water runs today — soft persistence wears through stone. Stay with it.' },
];

// Sexagenary day stem — same anchor as the engine (1995-04-29 = 庚, index 6).
function todayStemIndex(now = new Date()) {
  const days = Math.floor((Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - Date.UTC(1995, 3, 29)) / 86400000);
  return ((6 + days) % 10 + 10) % 10;
}
function dailyMessage() {
  const i = todayStemIndex();
  const m = STEM_META[i];
  return {
    title: `${m.el} day · ${HS[i]}`,
    body: `${m.line} See what it stirs in your chart.`,
    url: '/#/app-today',
  };
}

// ── VAPID (RFC 8292) — ES256 JWT per push-service origin ────────────────────
const b64u = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const enc = new TextEncoder();

async function vapidHeader(audience, env) {
  const key = await crypto.subtle.importKey(
    'jwk', JSON.parse(env.VAPID_PRIVATE_JWK), { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']
  );
  const header = b64u(enc.encode(JSON.stringify({ typ: 'JWT', alg: 'ES256' })));
  const claims = b64u(enc.encode(JSON.stringify({
    aud: audience,
    exp: Math.floor(Date.now() / 1000) + 12 * 3600,
    sub: env.VAPID_SUBJECT,
  })));
  const sig = await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, key, enc.encode(`${header}.${claims}`));
  return `vapid t=${header}.${claims}.${b64u(sig)}, k=${env.VAPID_PUBLIC}`;
}

// Payload-less push: authenticated POST, empty body. 201 = queued.
async function sendPush(sub, env) {
  const audience = new URL(sub.endpoint).origin;
  const res = await fetch(sub.endpoint, {
    method: 'POST',
    headers: {
      Authorization: await vapidHeader(audience, env),
      TTL: '86400',
      Urgency: 'normal',
    },
  });
  return res.status;
}

// ── Supabase REST (service-role) ─────────────────────────────────────────────
const sb = (env) => ({
  headers: {
    apikey: env.SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
    'Content-Type': 'application/json',
  },
  url: `${env.SUPABASE_URL}/rest/v1/push_subscriptions`,
});

// CORS — the app origin only (plus localhost for dev builds).
function corsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  const ok = origin === 'https://elementum.life' || /^http:\/\/localhost(:\d+)?$/.test(origin);
  return {
    'Access-Control-Allow-Origin': ok ? origin : 'https://elementum.life',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}
const json = (obj, status, cors) => new Response(JSON.stringify(obj), {
  status, headers: { 'Content-Type': 'application/json', ...cors },
});

export default {
  async fetch(request, env) {
    const cors = corsHeaders(request);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    const { pathname } = new URL(request.url);

    if (request.method === 'GET' && pathname === '/message') {
      return json(dailyMessage(), 200, cors);
    }

    if (request.method === 'POST' && pathname === '/subscribe') {
      let body;
      try { body = await request.json(); } catch { return json({ error: 'bad json' }, 400, cors); }
      const s = body?.subscription;
      if (!s?.endpoint || !s?.keys?.p256dh || !s?.keys?.auth) return json({ error: 'bad subscription' }, 400, cors);
      const utcHour = Number.isInteger(body.utcHour) && body.utcHour >= 0 && body.utcHour <= 23 ? body.utcHour : 8;
      const { url, headers } = sb(env);
      const res = await fetch(`${url}?on_conflict=endpoint`, {
        method: 'POST',
        headers: { ...headers, Prefer: 'resolution=merge-duplicates' },
        body: JSON.stringify([{
          endpoint: s.endpoint, p256dh: s.keys.p256dh, auth: s.keys.auth,
          user_id: body.userId || null, utc_hour: utcHour,
        }]),
      });
      return json({ ok: res.ok }, res.ok ? 200 : 500, cors);
    }

    if (request.method === 'POST' && pathname === '/unsubscribe') {
      let body;
      try { body = await request.json(); } catch { return json({ error: 'bad json' }, 400, cors); }
      if (!body?.endpoint) return json({ error: 'endpoint required' }, 400, cors);
      const { url, headers } = sb(env);
      const res = await fetch(`${url}?endpoint=eq.${encodeURIComponent(body.endpoint)}`, { method: 'DELETE', headers });
      return json({ ok: res.ok }, res.ok ? 200 : 500, cors);
    }

    return json({ service: 'elementum-push', today: dailyMessage().title }, 200, cors);
  },

  // Hourly: send to every subscription whose preferred UTC hour is now.
  async scheduled(_event, env, ctx) {
    ctx.waitUntil((async () => {
      const hour = new Date().getUTCHours();
      const { url, headers } = sb(env);
      const res = await fetch(`${url}?utc_hour=eq.${hour}&select=endpoint,p256dh,auth`, { headers });
      if (!res.ok) { console.error('sub fetch failed', res.status); return; }
      const subs = await res.json();
      let sent = 0, pruned = 0;
      for (const sub of subs) {
        try {
          const status = await sendPush(sub, env);
          if (status === 404 || status === 410) {
            await fetch(`${url}?endpoint=eq.${encodeURIComponent(sub.endpoint)}`, { method: 'DELETE', headers });
            pruned += 1;
          } else if (status >= 200 && status < 300) sent += 1;
          else console.warn('push non-2xx', status, sub.endpoint.slice(0, 60));
        } catch (err) { console.error('push failed', String(err)); }
      }
      console.log(`push cron hour=${hour} subs=${subs.length} sent=${sent} pruned=${pruned}`);
    })());
  },
};
