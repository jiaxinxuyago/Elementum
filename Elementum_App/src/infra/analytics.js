// ─────────────────────────────────────────────────────────────────────────────
// INFRA · product analytics (BIZ_05 S3 A, the July first-party design; INF_02 §3)
// ─────────────────────────────────────────────────────────────────────────────
// track(name, props) sends one event to the elementum-analytics Worker, which
// writes it to Workers Analytics Engine. First-party, no cookies, no third
// party. An event carries: its name, a random device id (kept on this device,
// cleared by "delete my data"), a session id, and only the props listed for
// that event in ALLOWED below. Birth data, the chart and reading text never
// leave the device, so no prop may hold them.
// A no-op until ANALYTICS_URL is set (after the owner deploys the Worker), on
// the dev site, and on localhost.
// ─────────────────────────────────────────────────────────────────────────────
import { IS_DEV_TOOLS } from '../devtools.js';

// The Worker's address (deployed 2026-10-23, INF_02 §1.9).
export const ANALYTICS_URL = 'https://elementum-analytics.jiaxinxuyago.workers.dev';

const DEVICE_KEY = 'elementum_aid';
const SESSION_KEY = 'elementum_sid';

// The 14 client events (INF_02 §3) and the props each may carry.
const ALLOWED = {
  app_open: ['first_session', 'utm_source', 'utm_campaign', 'ref', 'standalone'],
  screen_view: ['screen'],
  onboarding_complete: ['hour_known'],
  reveal_shown: [],
  reveal_continue: ['seconds_since_shown'],
  reveal_complete: ['seconds_since_shown'],
  read_depth: ['surface', 'bucket', 'dwell_s'],
  share_click: ['method'],
  invite_sent: [],
  email_captured: ['placement'],
  push_opt_in: [],
  push_open: ['kind'],
  paywall_view: ['surface'],
  checkout_click: ['product'],
};

function store(kind) {
  try { return kind === 'session' ? window.sessionStorage : window.localStorage; } catch { return null; }
}
function idFrom(kind, key) {
  const s = store(kind);
  let id = null;
  try { id = s?.getItem(key) || null; } catch { /* storage blocked */ }
  if (!id) {
    id = (crypto.randomUUID?.() || String(Math.random()).slice(2)).replace(/-/g, '').slice(0, 16);
    try { s?.setItem(key, id); } catch { /* storage blocked: the id lives for this page only */ }
  }
  return id;
}

function enabled() {
  return !!ANALYTICS_URL && !IS_DEV_TOOLS && typeof window !== 'undefined' && !/^(localhost|127\.)/.test(window.location.hostname);
}

export function track(name, props = {}) {
  const keys = ALLOWED[name];
  if (!keys || !enabled()) return;
  const p = {};
  for (const k of keys) {
    const v = props[k];
    if (v == null) continue;
    p[k] = typeof v === 'number' || typeof v === 'boolean' ? v : String(v).slice(0, 64);
  }
  const body = JSON.stringify({ n: name, d: idFrom('local', DEVICE_KEY), s: idFrom('session', SESSION_KEY), p });
  try {
    // text/plain keeps the beacon a simple request (no CORS preflight).
    if (!navigator.sendBeacon?.(ANALYTICS_URL, new Blob([body], { type: 'text/plain' }))) {
      fetch(ANALYTICS_URL, { method: 'POST', body, keepalive: true, headers: { 'Content-Type': 'text/plain' } }).catch(() => {});
    }
  } catch { /* analytics never breaks the app */ }
}

// The first event of a page load: where the visit came from.
export function trackAppOpen() {
  if (!enabled()) return;
  const q = new URLSearchParams(window.location.search);
  let first = false;
  try { first = !window.localStorage.getItem(DEVICE_KEY); } catch { /* blocked */ }
  track('app_open', {
    first_session: first,
    utm_source: q.get('utm_source'),
    utm_campaign: q.get('utm_campaign'),
    ref: q.get('ref'),
    standalone: !!window.matchMedia?.('(display-mode: standalone)').matches,
  });
  if (q.get('src') === 'push') track('push_open', { kind: q.get('kind') });
}

// "Delete my data" clears the device id with the rest (INF_02 §5).
export function forgetAnalyticsId() {
  try { window.localStorage.removeItem(DEVICE_KEY); window.sessionStorage.removeItem(SESSION_KEY); } catch { /* blocked */ }
}
