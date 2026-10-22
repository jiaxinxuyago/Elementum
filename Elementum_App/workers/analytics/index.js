// ─────────────────────────────────────────────────────────────────────────────
// ELEMENTUM · analytics → Workers Analytics Engine (BIZ_05 S3 A; INF_02 §3)
// ─────────────────────────────────────────────────────────────────────────────
// The app's track() beacons {n: name, d: device id, s: session id, p: props}
// here. One data point per event:
//   index1 = event name
//   blob1 = event name · blob2 = device id · blob3 = session id
//   blob4 = props as JSON (the app's allow-list; never birth or chart data)
//   blob5 = country (Cloudflare's request.cf, no IP stored)
//   double1 = 1 (a count)
// Read with the Analytics Engine SQL API (the weekly analyst routine).
// ─────────────────────────────────────────────────────────────────────────────

const ORIGINS = new Set(['https://elementum.life', 'https://dev.elementum.life']);
const NAMES = new Set([
  'app_open', 'screen_view', 'onboarding_complete', 'reveal_shown', 'reveal_continue', 'reveal_complete',
  'read_depth', 'share_click', 'invite_sent', 'email_captured', 'push_opt_in', 'push_open',
  'paywall_view', 'checkout_click',
]);
const ID = /^[A-Za-z0-9]{6,32}$/;

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const cors = { 'Access-Control-Allow-Origin': ORIGINS.has(origin) ? origin : 'https://elementum.life' };
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: { ...cors, 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type' } });
    if (request.method !== 'POST') return new Response('elementum-analytics: POST only', { status: 405, headers: cors });
    if (!ORIGINS.has(origin)) return new Response('forbidden', { status: 403, headers: cors });

    const raw = await request.text();
    if (raw.length > 2048) return new Response('too large', { status: 413, headers: cors });
    let e;
    try { e = JSON.parse(raw); } catch { return new Response('bad payload', { status: 400, headers: cors }); }
    if (!NAMES.has(e?.n) || !ID.test(e?.d || '') || !ID.test(e?.s || '')) return new Response('bad event', { status: 400, headers: cors });

    env.EVENTS.writeDataPoint({
      indexes: [e.n],
      blobs: [e.n, e.d, e.s, JSON.stringify(e.p || {}).slice(0, 512), request.cf?.country || ''],
      doubles: [1],
    });
    return new Response(null, { status: 204, headers: cors });
  },
};
