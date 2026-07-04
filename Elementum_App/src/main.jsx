import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App.jsx';

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
