// ─────────────────────────────────────────────────────────────────────────────
// INFRA · error monitoring (BIZ_05 S4 A; INF_02 §4)
// ─────────────────────────────────────────────────────────────────────────────
// Sentry, loaded as its own chunk only when SENTRY_DSN is set, so the main
// bundle does not grow before the owner creates the project. No personal data:
// sendDefaultPii off, request bodies, breadcrumb data and local-storage values
// are dropped before an event leaves, so no birth data or chat text is sent.
// Off on the dev site and localhost.
// ─────────────────────────────────────────────────────────────────────────────
import { IS_DEV_TOOLS } from '../devtools.js';

// The project's public DSN, set once the owner creates it (INF_02 §1.10).
export const SENTRY_DSN = null;

let sentry = null;

function scrub(event) {
  if (event.request) { delete event.request.data; delete event.request.cookies; }
  if (event.user) event.user = undefined;
  for (const b of event.breadcrumbs || []) delete b.data;
  return event;
}

export function initMonitoring() {
  if (!SENTRY_DSN || IS_DEV_TOOLS || typeof window === 'undefined' || /^(localhost|127\.)/.test(window.location.hostname)) return;
  import('@sentry/browser').then((S) => {
    S.init({
      dsn: SENTRY_DSN,
      sendDefaultPii: false,
      tracesSampleRate: 0,
      beforeSend: scrub,
      beforeBreadcrumb: (b) => (b.category === 'console' ? null : b),
    });
    sentry = S;
  }).catch(() => { /* monitoring never breaks the app */ });
}

// Called by the ErrorBoundary for a render crash it recovered from.
export function reportError(error, info) {
  try { sentry?.captureException(error, { extra: { componentStack: info?.componentStack?.slice(0, 2000) } }); } catch { /* ignore */ }
}
