import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App.jsx';
import { IS_DEV_TOOLS } from './devtools.js';
import { initMonitoring } from './infra/monitoring.js';
import { initNative } from './infra/native.js';

initMonitoring();
initNative();   // the Capacitor shell (STORE-3): a no-op on the web

// The live build hides the "draft" tags on units still being written (owner
// 2026-10-21: the sections go live with their drafts); the dev site keeps them.
if (!IS_DEV_TOOLS && typeof document !== 'undefined') document.documentElement.classList.add('is-live');

// A deploy invalidates the running session's lazy-chunk URLs: the autoUpdate
// service worker swaps the precache under the open page, and the old hashed
// files are gone from the server too. Vite fires vite:preloadError when a
// dynamic import fails — reload to pick up the fresh build instead of letting
// the ErrorBoundary blame the user's birth data for a stale-deploy crash.
window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault();
  window.location.reload();
});

createRoot(document.getElementById('root')).render(<App />);
