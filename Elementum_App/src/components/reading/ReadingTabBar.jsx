// ===================================================================
// ELEMENTUM · ReadingTabBar  (the persistent dashboard nav — "cold" tabs)
// ===================================================================
// The single, static bottom navigation shared by EVERY post-reveal
// dashboard surface (Today · Guidance · Reading · Compat · Profile).
// Rendered once by App, OUTSIDE the swappable page content, so it never
// re-mounts or shifts as the user moves between tabs — the icons stay
// pixel-aligned regardless of which page is on screen.
//
// Design: icons-only, no seal-dot (DES_04 §AM.2). Active tab = ink; the
// rest = inkLight — the cold-state affordance. Same markup + .tabbar CSS
// the reveal dissolve resolves onto, so the handoff is seamless.
//
// The host is an inset:0 overlay that is pointer-transparent except the
// bar itself, so taps on the page below pass straight through. The
// global D13 sprite (rendered once in App) supplies the #tab-* glyphs.
// ===================================================================

import './reading.css';

// Locked order — DES_04 §AM.2. The keys are the routeTab() tab keys.
const TABS = ['today', 'guidance', 'reading', 'compat', 'profile'];

export default function ReadingTabBar({ active, onTab }) {
  return (
    <div className="reading reading-tabhost">
      <nav className="tabbar" aria-label="Primary navigation">
        {TABS.map((id) => (
          <button
            key={id}
            type="button"
            className={`tab${active === id ? ' active' : ''}`}
            aria-label={id}
            aria-current={active === id ? 'page' : undefined}
            onClick={() => onTab && onTab(id)}
          >
            <span className="tico"><svg viewBox="0 0 24 24"><use href={`#tab-${id}`} /></svg></span>
          </button>
        ))}
      </nav>
    </div>
  );
}
