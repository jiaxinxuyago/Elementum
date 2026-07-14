// ─────────────────────────────────────────────────────────────────────────────
// INFRA · Web Push client (INF_01 §4.4)
// ─────────────────────────────────────────────────────────────────────────────
// enablePush(): permission → pushManager.subscribe(VAPID) → register with the
// push worker (stores endpoint + preferred UTC send hour; user id if signed in).
// disablePush(): unsubscribe locally + delete the server row.
// All functions no-op gracefully where Web Push is unsupported (e.g. iOS Safari
// in the browser tab — install-to-home-screen is required there, INF_01 §4.4).
// ─────────────────────────────────────────────────────────────────────────────
import siteConfig from '../../site.config.json';

const WORKER = siteConfig.pushWorkerUrl;
const VAPID = siteConfig.vapidPublicKey;

export function pushSupported() {
  return typeof window !== 'undefined'
    && 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}

// pushManager.subscribe wants the VAPID key as a Uint8Array.
function vapidKeyBytes() {
  const pad = '='.repeat((4 - (VAPID.length % 4)) % 4);
  const raw = atob((VAPID + pad).replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}

// The user picks a LOCAL send time (onboarding step 7 / Profile); the cron
// matches on UTC hours, so convert using the device's current offset.
export function localHourToUtc(localHour) {
  const offsetHours = Math.round(new Date().getTimezoneOffset() / 60);
  return ((localHour + offsetHours) % 24 + 24) % 24;
}

// serviceWorker.ready never resolves where no SW registers (e.g. vite dev
// mode) — race it against a timeout so callers always settle.
function swReady(ms = 8000) {
  return Promise.race([
    navigator.serviceWorker.ready,
    new Promise((_, rej) => setTimeout(() => rej(new Error('sw timeout')), ms)),
  ]);
}

export async function getPushSubscription() {
  if (!pushSupported()) return null;
  try {
    const reg = await swReady(3000);
    return await reg.pushManager.getSubscription();
  } catch { return null; }
}

// → 'enabled' | 'denied' | 'unsupported' | 'error'
export async function enablePush(localHour = 8, userId = null) {
  if (!pushSupported()) return 'unsupported';
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return 'denied';
    const reg = await swReady();
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: vapidKeyBytes(),
    });
    const res = await fetch(`${WORKER}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscription: sub.toJSON(), utcHour: localHourToUtc(localHour), userId }),
    });
    return res.ok ? 'enabled' : 'error';
  } catch (err) {
    console.warn('[push] enable failed:', err);
    return 'error';
  }
}

// Ask the worker to send THIS device today's message right now (self-test /
// "send me a preview"). Only works for the device's own subscription.
export async function sendPreview() {
  const sub = await getPushSubscription();
  if (!sub) return false;
  try {
    const res = await fetch(`${WORKER}/send-now`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endpoint: sub.endpoint }),
    });
    const j = await res.json().catch(() => ({}));
    return res.ok && j.pushServiceStatus >= 200 && j.pushServiceStatus < 300;
  } catch { return false; }
}

export async function disablePush() {
  const sub = await getPushSubscription();
  if (!sub) return true;
  const endpoint = sub.endpoint;
  try { await sub.unsubscribe(); } catch { /* continue — still delete server-side */ }
  try {
    await fetch(`${WORKER}/unsubscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endpoint }),
    });
  } catch { /* row prunes automatically on next failed send */ }
  return true;
}
