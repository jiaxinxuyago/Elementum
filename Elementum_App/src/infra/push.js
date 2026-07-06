// ─────────────────────────────────────────────────────────────────────────────
// INFRA · Web Push client (DOC10 §4.4)
// ─────────────────────────────────────────────────────────────────────────────
// enablePush(): permission → pushManager.subscribe(VAPID) → register with the
// push worker (stores endpoint + preferred UTC send hour; user id if signed in).
// disablePush(): unsubscribe locally + delete the server row.
// All functions no-op gracefully where Web Push is unsupported (e.g. iOS Safari
// in the browser tab — install-to-home-screen is required there, DOC10 §4.4).
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

export async function getPushSubscription() {
  if (!pushSupported()) return null;
  try {
    const reg = await navigator.serviceWorker.ready;
    return await reg.pushManager.getSubscription();
  } catch { return null; }
}

// → 'enabled' | 'denied' | 'unsupported' | 'error'
export async function enablePush(localHour = 8, userId = null) {
  if (!pushSupported()) return 'unsupported';
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return 'denied';
    const reg = await navigator.serviceWorker.ready;
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
