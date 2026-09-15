// ===================================================================
// ELEMENTUM · dev-tools switch
// ===================================================================
// One gate for every dev-only surface (DevBar, window.__seedData/__goto
// hooks, the journey QA hooks, the Profile demo flip, the d13 preview).
//
// True in `vite dev` as before, AND in a production build made with
// VITE_DEVTOOLS=1 — the elementum-dev Worker (deploy-dev.yml, `dev` branch)
// is built that way so cloud sessions get a live staging site with the
// DevBar. The prod build (deploy.yml, `main`) never sets the flag, so the
// tooling stays out of elementum.life exactly as before.
// ===================================================================
export const IS_DEV_TOOLS = !!(
  typeof import.meta !== 'undefined'
  && (import.meta.env?.DEV || import.meta.env?.VITE_DEVTOOLS === '1')
);
