// ===================================================================
// ELEMENTUM · DashboardShell
// ===================================================================
// Wraps any dashboard tab screen with its painted background and reserves
// room above the persistent tab bar (ReadingTabBar, rendered once by App
// outside the per-screen tree) so content doesn't slide under it.
//
// Spec:
//   · Tab bar is the only persistent chrome inside /dashboard/* (DOC5 §AM.2).
//   · Welcome, Onboarding, Loading, Reveal render WITHOUT the tab bar.
//   · Reading drill-downs (read-elemental, read-daymaster, read-tengods,
//     read-locked) render WITHOUT the tab bar — they push over the tabs
//     like a page in a stack.
//
// Usage:
//   <DashboardShell active="today" onTabChange={...}>
//     <TodayScreen />
//   </DashboardShell>
// ===================================================================

import PageBg from '../shared/PageBg.jsx';
import CloudVeilBackground from '../guidance/CloudVeilBackground.jsx';
import { silk } from '../../styles/tokens';

// Bar takes 76px (+ the device safe-area inset); we add the same as bottom
// padding on the scroll area so the last bit of content isn't hidden by it.
const TAB_BAR_HEIGHT = 'calc(76px + env(safe-area-inset-bottom, 0px))';

// `bg` — optional { src, opacity } painted background for the tab
// (see styles/backgrounds.js). Renders behind the scroll content; the
// translucent blurred tab bar sits above it cleanly.
// `veil` — when true, renders the ink-wash CloudVeilBackground (screens-v2 §5C)
// at the z0 background layer instead of a painted PageBg plate. Used by the
// Guidance feature screens, whose <main> is transparent so the mist shows through.
export default function DashboardShell({ children, background = silk, bg, veil = false }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background,
        overflow: 'hidden',
      }}
    >
      {/* Painted background layer — fixed behind the scroll area so it
          doesn't move as content scrolls. Accepts a painted src or a
          CSS gradient stand-in (see styles/backgrounds.js). */}
      {veil ? <CloudVeilBackground /> : (bg && <PageBg src={bg.src} opacity={bg.opacity} gradient={bg.gradient} size={bg.size} pos={bg.pos} />)}

      {/* Scrollable content area — reserves room for the tab bar via padding */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          paddingBottom: TAB_BAR_HEIGHT,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          zIndex: 1,   // above the painted bg layer
        }}
      >
        {children}
      </div>
      {/* The persistent nav is now a single static object rendered by App
          (ReadingTabBar), outside every page — so it stays pixel-aligned across
          tab switches. This shell only reserves room for it (TAB_BAR_HEIGHT)
          and paints the page background. */}
    </div>
  );
}
