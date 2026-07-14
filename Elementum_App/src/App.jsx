import React, { useState, useEffect, useTransition, Suspense, lazy } from 'react';
import {
  ChartProvider,
  useChart,
  resolveHourForCalc,
  resolveGenderForCalc,
  resolveLongitudeForCalc,
  resolveLocationName,
} from './store/chartContext.jsx';
import { AuthProvider, useAuth } from './store/authContext.jsx';
import { calculateBaziChart } from './engine/index.js';
import WelcomeScreen from './components/onboarding/WelcomeScreen.jsx';
import {
  Step1_Year,
  Step2_Month,
  Step3_Day,
  Step4_Hour,
  Step4A_HourWindow,
  Step5_Location,
  Step6_Polarity,
  Step6A_EnergyCurrent,
  Step7_Notify,
  Step7A_NotifyTime,
} from './components/onboarding/OnboardingSteps.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
// Eager — cross-cutting providers + the dashboard shell (layout/nav wrapper).
import DashboardShell from './components/dashboard/DashboardShell.jsx';
import { UpgradeModalProvider, UpgradeModalHost, useUpgrade } from './components/dashboard/UpgradeModal.jsx';
import { PURCHASE_INTENT_KEY } from './components/dashboard/AuthModal.jsx';
// Eager — the persistent dashboard chrome: the static D13 tab bar + the
// shared SVG sprite that supplies every D13 glyph (tabs, element marks, …).
import ReadingTabBar from './components/reading/ReadingTabBar.jsx';
import ReadingSprite from './components/reading/ReadingSprite.jsx';

// ── Eager core (no Suspense flash) ──────────────────────────────────────────
// The reveal + the five nav-bar destinations are loaded into the main bundle
// so tapping a tab, and the reveal handing off to the catalogue, NEVER fetches
// a chunk — the swap is synchronous with no Suspense fallback (the "white
// blink"). These pull in the reading content (archetypeSource) which the reveal
// needs the moment it plays anyway; the long onboarding flow gives the bundle
// plenty of time to arrive before first paint of any of them.
import ReadingRevealScreen from './components/reading/ReadingRevealScreen.jsx';
import ReadingScreen from './components/reading/ReadingScreen.jsx';
import TodayScreen from './components/dashboard/tabs/TodayScreen.jsx';
import GuidanceScreen from './components/dashboard/tabs/GuidanceScreen.jsx';
import CompatScreen from './components/dashboard/tabs/CompatScreen.jsx';
import ProfileScreen from './components/dashboard/tabs/ProfileScreen.jsx';

// ── Code-split (Group E) ────────────────────────────────────────────────────
// Secondary / heavier screens still load on demand, but are warmed by
// prefetchScreens() on idle so they're cached before the user reaches them.
const CodexScreen = lazy(() => import('./components/dashboard/CodexScreen.jsx'));
const ChartResonanceScreen = lazy(() => import('./components/dashboard/ChartResonanceScreen.jsx'));
const ElementalDrawScreen = lazy(() => import('./components/dashboard/ElementalDrawScreen.jsx'));
const EnergyManualScreen = lazy(() => import('./components/dashboard/EnergyManualScreen.jsx'));
const SelfReportScreen = lazy(() => import('./components/dashboard/SelfReportScreen.jsx'));
const AIConsultantScreen = lazy(() => import('./components/dashboard/AIConsultantScreen.jsx'));
const DayPage = lazy(() => import('./components/dashboard/DayPage.jsx'));
const MonthPage = lazy(() => import('./components/dashboard/MonthPage.jsx'));
const YearPage = lazy(() => import('./components/dashboard/YearPage.jsx'));
const DecadePage = lazy(() => import('./components/dashboard/DecadePage.jsx'));
const ElementalNatureDetail = lazy(() => import('./components/dashboard/reading-detail/ElementalNatureDetail.jsx'));
const TenGodsDetail = lazy(() => import('./components/dashboard/reading-detail/TenGodsDetail.jsx'));
const ForcesInMotionDetail = lazy(() => import('./components/dashboard/reading-detail/ForcesInMotionDetail.jsx'));
const LifeChaptersDetail = lazy(() => import('./components/dashboard/reading-detail/LifeChaptersDetail.jsx'));
const ChartPatternsDetail = lazy(() => import('./components/dashboard/reading-detail/ChartPatternsDetail.jsx'));
const SeasonalCalibrationDetail = lazy(() => import('./components/dashboard/reading-detail/SeasonalCalibrationDetail.jsx'));
const LockedDetail = lazy(() => import('./components/dashboard/reading-detail/LockedDetail.jsx'));
const DevBar = lazy(() => import('./components/dev/DevBar.jsx'));
const ReadingWheelPreview = lazy(() => import('./components/reading/ReadingWheelPreview.jsx'));
const ReadingDayMasterScreen = lazy(() => import('./components/reading/ReadingDayMasterScreen.jsx'));
const ReadingPillarChartScreen = lazy(() => import('./components/reading/ReadingPillarChartScreen.jsx'));
const ReadingFacesScreen = lazy(() => import('./components/reading/ReadingFacesScreen.jsx'));
const CompatFriendFlow = lazy(() => import('./components/dashboard/CompatFriendFlow.jsx'));

// Warm every on-demand screen chunk during idle time so navigation never
// shows the Suspense fallback (the "white blink"). These are the SAME import
// paths as the lazy() calls above, so Vite/the browser serve the identical
// cached chunk — by the time the user taps a tab or the reveal hands off to
// the catalogue, the code is already in memory and the swap is instant.
// Runs once; dev-only harnesses (DevBar, ReadingWheelPreview) are intentionally
// excluded. First paint is unaffected — this only fires when the main thread
// is idle.
let _prefetchedScreens = false;
function prefetchScreens() {
  if (_prefetchedScreens || typeof window === 'undefined') return;
  _prefetchedScreens = true;
  const run = () => {
    Promise.all([
      import('./components/dashboard/CodexScreen.jsx'),
      import('./components/dashboard/ChartResonanceScreen.jsx'),
      import('./components/dashboard/ElementalDrawScreen.jsx'),
      import('./components/dashboard/EnergyManualScreen.jsx'),
      import('./components/dashboard/SelfReportScreen.jsx'),
      import('./components/dashboard/AIConsultantScreen.jsx'),
      import('./components/dashboard/DayPage.jsx'),
      import('./components/dashboard/MonthPage.jsx'),
      import('./components/dashboard/YearPage.jsx'),
      import('./components/dashboard/DecadePage.jsx'),
      import('./components/dashboard/reading-detail/ElementalNatureDetail.jsx'),
      import('./components/dashboard/reading-detail/TenGodsDetail.jsx'),
      import('./components/dashboard/reading-detail/ForcesInMotionDetail.jsx'),
      import('./components/dashboard/reading-detail/LifeChaptersDetail.jsx'),
      import('./components/dashboard/reading-detail/ChartPatternsDetail.jsx'),
      import('./components/dashboard/reading-detail/SeasonalCalibrationDetail.jsx'),
      import('./components/dashboard/reading-detail/LockedDetail.jsx'),
      import('./components/reading/ReadingDayMasterScreen.jsx'),
      import('./components/reading/ReadingPillarChartScreen.jsx'),
      import('./components/reading/ReadingFacesScreen.jsx'),
      import('./components/dashboard/CompatFriendFlow.jsx'),
    ]).catch(() => {});
  };
  if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 2000 });
  else setTimeout(run, 600);
}

// Warm the screen background PNGs so a page's painted ground is already
// decoded the first time the screen mounts — otherwise iOS Safari shows the
// near-white base color for a beat while the PNG fetches (the "white flash").
// These are the finished plate/ground images referenced by the dashboard
// shells (PageBg → /backgrounds/<name>), the D13 surfaces, and onboarding.
// Started promptly (not deep-idle) since they're visual-critical, but after
// first paint so they never delay the welcome screen.
let _prefetchedBg = false;
function prefetchBackgrounds() {
  if (_prefetchedBg || typeof window === 'undefined') return;
  _prefetchedBg = true;
  const urls = [
    // D13 surfaces (catalogue / energy card / reveal grounds)
    '/backgrounds/bg-energymap-01-top-band.png',
    '/backgrounds/bg-energymap-02-corner-quartet.png',
    '/backgrounds/bg-reveal-01-distant-peaks.png',
    '/backgrounds/bg-reveal-02-floating-island.png',
    // Dashboard tab plates (SCREEN_BG)
    '/backgrounds/bg-reading-04-rice-paper.png',
    '/backgrounds/bg-onboarding-04-quiet-paper.png',
    '/backgrounds/bg-energymap-03-center-glow.png',
    '/backgrounds/bg-onboarding-01-corner-stamp.png',
    // Today-hub drill-down plates (PLATE_BG)
    '/backgrounds/bg-energymap-02-corner-quartet.png',
    '/backgrounds/bg-reveal-04-mist-veil.png',
    '/backgrounds/bg-reading-01-side-margins.png',
    // Onboarding shell
    '/backgrounds/bg-onboarding-04-quiet-paper.png',
  ];
  const warm = () => urls.forEach((u) => {
    const img = new Image();
    img.src = u;
    if (img.decode) img.decode().catch(() => {});
  });
  // Kick off soon after first paint; don't wait for deep idle.
  setTimeout(warm, 250);
}

// Lazy-load placeholder — a silk page while a screen's chunk arrives. With
// prefetchScreens() warming chunks on idle, this is rarely seen after the
// first moments; it matches the frame's silk so any residual frame is calm.
//
// It doubles as a stuck-chunk watchdog: on iOS Safari the service worker can
// be killed mid-request and the in-flight dynamic import() stalls WITHOUT
// rejecting — no ErrorBoundary, no vite:preloadError, just this fallback on
// screen forever as an empty page. If we're still mounted after WATCHDOG_MS,
// reload once to re-request the chunk; the sessionStorage stamp caps it at
// one retry per minute so a truly offline device doesn't reload-loop.
const CHUNK_WATCHDOG_MS = 10000;
function ScreenFallback() {
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        const last = Number(sessionStorage.getItem('el_chunk_reload') || 0);
        if (Date.now() - last < 60000) return;
        sessionStorage.setItem('el_chunk_reload', String(Date.now()));
      } catch { /* storage unavailable (private mode) — reload unguarded */ }
      window.location.reload();
    }, CHUNK_WATCHDOG_MS);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{ width: '100%', height: '100%', minHeight: 480, background: SILK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: "'EB Garamond', serif", fontSize: 13, letterSpacing: 2.5, textTransform: 'uppercase', color: INK_LIGHT, animation: 'el-fallback-breathe 1.8s ease-in-out infinite' }}>
        A moment…
      </span>
      <style>{'@keyframes el-fallback-breathe { 0%, 100% { opacity: 0.35; } 50% { opacity: 0.85; } }'}</style>
    </div>
  );
}
import { SILK, INK_LIGHT } from './styles/tokens.jsx';
import { SCREEN_BG, PLATE_BG } from './styles/backgrounds.js';
import ErrorBoundary from './components/ErrorBoundary.jsx';

// Dev-only. DevBar + phone-frame sit side-by-side on desktop; on mobile
// viewports the DevBar hides so the phone frame fills the screen.
const IS_DEV = typeof import.meta !== 'undefined' && import.meta.env?.DEV;

// Phone-frame wrapper — DES_04 §6 specifies 390×844 viewport context.
// On desktop we center a phone-shaped frame; on mobile it fills the viewport.
function PhoneFrame({ children }) {
  return (
    <div
      className="el-frame"
      style={{
        position: 'relative',
        width: 390,
        height: 844,
        maxHeight: 'calc(100vh - 40px)',
        maxWidth: 'calc(100vw - 40px)',
        aspectRatio: '390 / 844',
        background: SILK,
        borderRadius: 40,
        overflow: 'hidden',
        boxShadow: '0 30px 80px rgba(0,0,0,0.45), 0 0 0 6px #0f0d0b',
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

// Outer shell — dark backdrop, centers phone + dev sidebar.
function Shell({ children }) {
  // Hide DevBar on narrow viewports (phone-sim only) — it's a designer tool.
  // Threshold = phone frame (390 + 40 shadow allowance) + DevBar (260) + gap (24) ~= 714px.
  const [showDev, setShowDev] = React.useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 720 : true
  );
  React.useEffect(() => {
    const onResize = () => setShowDev(window.innerWidth >= 720);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div
      className="el-shell"
      style={{
        minHeight: '100vh',
        background: '#1a1815',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 64,
        padding: 20,
      }}
    >
      {IS_DEV && showDev && <Suspense fallback={null}><DevBar /></Suspense>}
      {children}
    </div>
  );
}

// Flow state machine — each named screen is a step.
// Conditionals (4A, 6A, 7A) are handled via per-step `onX` callbacks.
//
// Post-Reveal screens live under the `app/*` namespace and render inside the
// 5-tab dashboard shell (DES_04 §AM.2).
const FLOW = [
  'welcome',
  'step1',
  'step2',
  'step3',
  'step4',
  'step4a',   // conditional — only via approximate-hour link
  'step5',
  'step6',
  'step6a',   // conditional — only via prefer-not-to-specify
  'step7',
  'step7a',   // conditional — only via Change time
  'loading',
  'reveal',
  // Dashboard tabs (DES_04 §10–§14) — entered from Reveal's "Enter Your Readings" CTA.
  'app-today',
  // Today-hub drill-downs (Direction 2 — wireframes/Elementum - Screens.html)
  'app-day',
  'app-month',
  'app-year',
  'app-decade',
  'app-guidance',
  'app-reading',     // catalogue (DES_04 §11)
  'app-daymaster',   // D13 P4 — Day Master card (wheel-centre seal)
  'app-pillars',     // D13 P5 — 八字 Pillar Chart (from the Day Master)
  'app-energy',      // energy reading — polarity faces (tap a node/spine; the swipe carousel was retired with ReadingFacesScreen)
  'app-energymap',   // Energy Map destination (DES_04 §AM.1 — same as Reveal, no first-time CTA)
  'app-codex',       // BaZi Codex (Guidance §12 Card 5)
  'app-draw',        // Elemental Draw (Guidance §12 Card 1)
  'app-manual',      // Energy Manual (Guidance §12 Card 2)
  'app-selfreport',  // Self-Report (Guidance §12 Card 3)
  'app-consultant',  // AI Consultant (Guidance §12 Card 4)
  'app-compat',
  'compat-friends',  // full-frame "their birth" friend onboarding flow (no tab bar)
  'app-profile',
  // Reading detail destinations (DES_04 §11 drill-downs)
  'read-elemental',  // Elemental Nature (built fully)
  'read-daymaster',  // Day Master (built fully)
  'read-tengods',    // Ten Gods (built fully)
  'read-forces',     // Forces in Motion — Catalyst + Resistance
  'read-chapters',   // Life Chapters — decade timeline
  'read-patterns',   // Chart/Pillar Patterns — 合冲刑害
  'read-seasonal',   // Seasonal Calibration — missing-element prescription
  'chart-reveal',    // Birth Chart Raw Data — four-pillar grid
  'chart-resonance', // Chart Resonance — hour-discovery flow (§11/§22)
  'read-locked',     // generic locked-card for not-yet-built sections
  // Dev-only reading-component render harness (#/d13preview) — excluded from
  // FLOW in prod builds so readHash() rejects the route for real users.
  ...(IS_DEV ? ['d13preview'] : []),
];

// Which dashboard tab is "active" for a given screen — drives the single
// persistent D13 tab bar (rendered once by App, outside the page). Screens
// absent here (welcome/onboarding/reveal + the stacked read-*/chart-* detail
// pages) show NO tab bar — they own the full frame. Drill-downs map back to
// their parent tab so the bar stays lit correctly.
const DASHBOARD_TAB = {
  'app-today': 'today', 'app-day': 'today', 'app-month': 'today', 'app-year': 'today', 'app-decade': 'today',
  'app-guidance': 'guidance', 'app-codex': 'guidance', 'app-draw': 'guidance', 'app-manual': 'guidance',
  'app-selfreport': 'guidance', 'app-consultant': 'guidance',
  'app-reading': 'reading', 'app-daymaster': 'reading', 'app-pillars': 'reading', 'app-energy': 'reading',
  // retired routes aliased to the D13 screens above
  'read-daymaster': 'reading', 'chart-reveal': 'reading', 'app-energymap': 'reading',
  'app-compat': 'compat',
  'app-profile': 'profile',
};

// Read the initial screen from URL hash so refresh/deep-links land correctly.
function readHash() {
  const h = (typeof window !== 'undefined' ? window.location.hash : '')
    .replace(/^#\/?/, '')
    .toLowerCase();
  return FLOW.includes(h) ? h : 'welcome';
}

// Stripe's Payment Link success URLs return here as `<origin>/?founding=ok`
// or `<origin>/?selfreport=ok`. Unlocks are SERVER-TRUTH (INF_01 §4.2): the
// Stripe webhook writes the entitlement to the buyer's account; this handler
// only polls until the write lands (it can lag the redirect by a few seconds)
// and then plays the product's arrival moment. Forged URLs unlock nothing.
// (§4.2b note: the primary journey is now new-tab checkout + focus-refresh —
// these ?ok paths remain as the fallback for same-tab/legacy flows.)
function PurchaseRedirect() {
  const { refreshEntitlements, hasFounding } = useChart();
  const { playCeremony } = useUpgrade();

  // §4.2b: a Self-Report buyer returning from Google OAuth lands on Welcome,
  // but their one-tap resume card lives on the Self-Report screen — route them
  // there. Intent is NOT cleared here; the screen's consumer clears it and
  // shows the resume card. (The founding intent needs no routing —
  // UpgradeModalHost is globally mounted and re-opens the paywall itself.)
  const { user } = useAuth();
  useEffect(() => {
    if (!user || typeof window === 'undefined') return;
    try {
      if (sessionStorage.getItem(PURCHASE_INTENT_KEY) === 'selfreport') {
        window.location.hash = '#/app-selfreport';
      }
    } catch { /* storage unavailable — user can navigate manually */ }
  }, [user]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const founding = params.get('founding') === 'ok';
    const selfreport = params.get('selfreport') === 'ok';
    if (!founding && !selfreport) return;
    // Strip the params so refresh/back can't replay the arrival.
    params.delete('founding'); params.delete('selfreport');
    const qs = params.toString();
    window.history.replaceState(null, '', window.location.pathname + (qs ? `?${qs}` : '') + window.location.hash);
    if (founding && hasFounding) return; // already a known founder — nothing to confirm
    // Poll for the webhook write (~1.5s × 14 ≈ 21s window). Arrival moments play
    // only once the SERVER confirms the entitlement — a forged URL shows nothing.
    let tries = 0;
    const timer = setInterval(async () => {
      tries += 1;
      const ent = await refreshEntitlements();
      if (founding && ent?.tier === 'advisor') { clearInterval(timer); playCeremony(); }
      else if (selfreport && ent?.hasSelfReport) {
        clearInterval(timer);
        window.location.hash = '#/app-selfreport'; // land in the new purchase
      } else if (tries >= 14) clearInterval(timer);
    }, 1500);
    return () => clearInterval(timer);
    // Run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

export default function App() {
  const [screen, setScreenState] = useState(readHash);
  // Navigations run as a transition: if the target screen is still lazy-loading,
  // React keeps the CURRENT screen on-screen until it's ready instead of
  // dropping to the blank Suspense fallback — so there's no "white blink" even
  // on a cold cache. Eager core screens (above) swap synchronously regardless.
  const [, startTransition] = useTransition();

  // Keep URL hash in sync so reloads preserve state (and screens are
  // deep-linkable during development).
  const setScreen = (next) => {
    const name = typeof next === 'function' ? next(screen) : next;
    startTransition(() => setScreenState(name));
    if (typeof window !== 'undefined') {
      window.location.hash = `#/${name}`;
    }
  };

  // Listen for external hash changes (e.g. preview_eval setting location.hash)
  useEffect(() => {
    const onHashChange = () => startTransition(() => setScreenState(readHash()));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Warm all on-demand screen chunks on idle so tab/nav/reveal transitions
  // are instant (no Suspense "white blink"). Runs once; first paint unaffected.
  useEffect(() => { prefetchScreens(); prefetchBackgrounds(); }, []);

  // Dev-only helper: window.__goto('step3') to jump to any screen for testing.
  // Gated to dev builds (IS_DEV) so the navigation/test hook never ships to users.
  useEffect(() => {
    if (IS_DEV && typeof window !== 'undefined') {
      window.__goto = (name) => {
        if (FLOW.includes(name)) setScreen(name);
        else console.warn('Unknown screen:', name, '; valid:', FLOW);
      };
      // Route inventory for automated QA (tools/qa-route-sweep.mjs) — the
      // sweep enumerates screens from the running app, never a copied list.
      window.__screens = [...FLOW];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goto = (name) => () => setScreen(name);

  // Maps a ReadingTabBar key ('today', 'guidance', 'reading', 'compat',
  // 'profile') to the corresponding FLOW screen ('app-*'). Used as the
  // `onTabChange` callback by every DashboardShell render.
  const routeTab = (tabKey) => setScreen(`app-${tabKey}`);
  // Which energy the reading card opens on (set when a node/tile is tapped).
  const [energyEl, setEnergyEl] = useState(null);
  const openEnergy = (el) => { setEnergyEl(el); setScreen('app-energy'); };

  // Back handler: previous in the linear sequence, respecting conditionals
  // (so that a user on step5 who came through step4a returns to step4a).
  const back = () => {
    setScreen((s) => {
      switch (s) {
        case 'step1':   return 'welcome';
        case 'step2':   return 'step1';
        case 'step3':   return 'step2';
        case 'step4':   return 'step3';
        case 'step4a':  return 'step4';
        case 'step5':   return 'step4';   // 4A is optional; 4 is the main path
        case 'step6':   return 'step5';
        case 'step6a':  return 'step6';
        case 'step7':   return 'step6';
        case 'step7a':  return 'step7';
        default:        return s;
      }
    });
  };

  // Dev-only D13 component harness — renders isolated (no phone-frame wrapper).
  if (screen === 'd13preview') {
    return <Suspense fallback={null}><ReadingWheelPreview /></Suspense>;
  }

  let rendered;
  switch (screen) {
    case 'welcome':
      rendered = <WelcomeScreen onContinue={goto('step1')} onEnterApp={goto('app-today')} />;
      break;
    case 'step1':
      rendered = <Step1_Year onBack={back} onContinue={goto('step2')} />;
      break;
    case 'step2':
      rendered = <Step2_Month onBack={back} onContinue={goto('step3')} />;
      break;
    case 'step3':
      rendered = <Step3_Day onBack={back} onContinue={goto('step4')} />;
      break;
    case 'step4':
      rendered = (
        <Step4_Hour
          onBack={back}
          onContinue={goto('step5')}
          onApproximate={goto('step4a')}
          onUnknown={goto('step5')}
        />
      );
      break;
    case 'step4a':
      rendered = (
        <Step4A_HourWindow
          onBack={back}
          onContinue={goto('step5')}
          onUnknown={goto('step5')}
        />
      );
      break;
    case 'step5':
      rendered = <Step5_Location onBack={back} onContinue={goto('step6')} />;
      break;
    case 'step6':
      rendered = (
        <Step6_Polarity
          onBack={back}
          onContinue={goto('step7')}
          onPreferNot={goto('step6a')}
        />
      );
      break;
    case 'step6a':
      rendered = <Step6A_EnergyCurrent onBack={back} onContinue={goto('step7')} />;
      break;
    case 'step7':
      rendered = (
        <Step7_Notify
          onBack={back}
          onContinue={goto('loading')}
          onChangeTime={goto('step7a')}
        />
      );
      break;
    case 'step7a':
      rendered = <Step7A_NotifyTime onBack={back} onContinue={goto('loading')} />;
      break;
    case 'loading':
      rendered = <LoadingScreen onComplete={goto('reveal')} />;
      break;
    case 'reveal':
      // D13: the reveal is the ceremonial plate that scroll-dissolves into the
      // energy catalogue; the tab bar fades in live at the end (Reading active).
      rendered = <ReadingRevealScreen onTab={routeTab} onDone={() => setScreen('app-reading')} />;
      break;

    // ────────────────────────────────────────────────────────────────
    // Dashboard tabs (DES_04 §10–§14) — all wrapped in DashboardShell; the
    // persistent icons-only ReadingTabBar is rendered once by App (below),
    // outside the per-screen tree, and routes via routeTab.
    // ────────────────────────────────────────────────────────────────
    case 'app-today':
      rendered = (
        <DashboardShell active="today" onTabChange={routeTab} bg={SCREEN_BG.today}>
          <TodayScreen onOpen={(route) => setScreen(route)} />
        </DashboardShell>
      );
      break;
    // ── Today Hub drill-downs: Day · Month · Year · Decade ─────────
    case 'app-day':
      rendered = (
        <DashboardShell active="today" onTabChange={routeTab} bg={PLATE_BG.day}>
          <DayPage
            onBack={goto('app-today')}
            onOpen={(route) => setScreen(route)}
          />
        </DashboardShell>
      );
      break;
    case 'app-month':
      rendered = (
        <DashboardShell active="today" onTabChange={routeTab} bg={PLATE_BG.month}>
          <MonthPage onBack={goto('app-today')} />
        </DashboardShell>
      );
      break;
    case 'app-year':
      rendered = (
        <DashboardShell active="today" onTabChange={routeTab} bg={PLATE_BG.year}>
          <YearPage onBack={goto('app-today')} />
        </DashboardShell>
      );
      break;
    case 'app-decade':
      rendered = (
        <DashboardShell active="today" onTabChange={routeTab} bg={PLATE_BG.decade}>
          <DecadePage onBack={goto('app-today')} />
        </DashboardShell>
      );
      break;
    case 'app-guidance':
      rendered = (
        <DashboardShell active="guidance" onTabChange={routeTab}>
          <GuidanceScreen onOpen={(route) => setScreen(route)} />
        </DashboardShell>
      );
      break;
    case 'app-codex':
      rendered = (
        <DashboardShell active="guidance" onTabChange={routeTab} veil>
          <CodexScreen onBack={goto('app-guidance')} />
        </DashboardShell>
      );
      break;
    case 'app-draw':
      rendered = (
        <DashboardShell active="guidance" onTabChange={routeTab} veil>
          <ElementalDrawScreen onBack={goto('app-guidance')} />
        </DashboardShell>
      );
      break;
    case 'app-manual':
      rendered = (
        <DashboardShell active="guidance" onTabChange={routeTab} veil>
          <EnergyManualScreen onBack={goto('app-guidance')} onOpenConsultant={goto('app-consultant')} />
        </DashboardShell>
      );
      break;
    case 'app-selfreport':
      rendered = (
        <DashboardShell active="guidance" onTabChange={routeTab} veil>
          <SelfReportScreen onBack={goto('app-guidance')} />
        </DashboardShell>
      );
      break;
    case 'app-consultant':
      // Chat needs the full frame height — render without the scroll shell's
      // padding, but keep the tab bar via DashboardShell.
      rendered = (
        <DashboardShell active="guidance" onTabChange={routeTab}>
          <AIConsultantScreen onBack={goto('app-guidance')} />
        </DashboardShell>
      );
      break;
    case 'app-reading':
      // D13: the at-rest energy catalogue. Tapping the wheel-centre seal
      // descends into the Day Master card (P4).
      rendered = <ReadingScreen onTab={routeTab} onDayMaster={goto('app-daymaster')} onOpenEnergy={openEnergy} />;
      break;
    case 'app-daymaster':
      // D13 P4 — the Day Master reference card; "Birth Chart" → P5.
      rendered = <ReadingDayMasterScreen onBack={goto('app-reading')} onBirthChart={goto('app-pillars')} />;
      break;
    case 'app-pillars':
      // D13 P5 — the 八字 Four-Pillars data page; "Discover it" → hour flow.
      rendered = <ReadingPillarChartScreen onBack={goto('app-daymaster')} onDiscoverHour={goto('chart-resonance')} />;
      break;
    case 'app-energy':
      // D13 P6b — the polarity faces page: dominant-energy briefing + the
      // energy's 1–2 Ten-God faces, each a door to its reading.
      rendered = <ReadingFacesScreen initialEl={energyEl} onBack={goto('app-reading')} />;
      break;
    case 'app-compat':
      rendered = (
        <DashboardShell active="compat" onTabChange={routeTab} bg={SCREEN_BG.compat}>
          <CompatScreen onStartCompare={goto('compat-friends')} onCompareAgain={goto('compat-friends')} />
        </DashboardShell>
      );
      break;
    case 'compat-friends':
      // Full-frame friend onboarding (no tab bar) — like the user's own
      // onboarding. Computes the reading on finish → returns to app-compat.
      rendered = <CompatFriendFlow onExit={goto('app-compat')} onDone={goto('app-compat')} />;
      break;
    case 'app-profile':
      rendered = (
        <DashboardShell active="profile" onTabChange={routeTab} bg={SCREEN_BG.profile}>
          <ProfileScreen />
        </DashboardShell>
      );
      break;

    // ────────────────────────────────────────────────────────────────
    // Reading-detail destinations + Energy Map (Phase 2).
    // Detail pages share DetailShell (back button + section header).
    // All render OUTSIDE DashboardShell — they push over the tab bar
    // like a page in a stack, per DES_04 §11 v1.7 "DetailShell wrapper"
    // (carried forward by §AM.1 as authoritative).
    // ────────────────────────────────────────────────────────────────
    case 'app-energymap':
      // Retired standalone Energy Map — the energy overview is the catalogue
      // (and folds into P5). Alias to the D13 catalogue.
      rendered = <ReadingScreen onTab={routeTab} onDayMaster={goto('app-daymaster')} onOpenEnergy={openEnergy} />;
      break;
    case 'read-elemental':
      rendered = <ElementalNatureDetail onBack={goto('app-reading')} />;
      break;
    case 'read-daymaster':
      // Retired DayMasterDetail — aliased to the D13 Day Master card (P4).
      rendered = <ReadingDayMasterScreen onBack={goto('app-reading')} onBirthChart={goto('app-pillars')} />;
      break;
    case 'read-tengods':
      rendered = <TenGodsDetail onBack={goto('app-reading')} />;
      break;
    case 'read-forces':
      rendered = <ForcesInMotionDetail onBack={goto('app-reading')} />;
      break;
    case 'read-chapters':
      rendered = <LifeChaptersDetail onBack={goto('app-reading')} />;
      break;
    case 'read-patterns':
      rendered = <ChartPatternsDetail onBack={goto('app-reading')} />;
      break;
    case 'read-seasonal':
      rendered = <SeasonalCalibrationDetail onBack={goto('app-reading')} />;
      break;
    case 'chart-reveal':
      // Retired RawChartPage — aliased to the D13 八字 Pillar Chart (P5).
      rendered = <ReadingPillarChartScreen onBack={goto('app-daymaster')} onDiscoverHour={goto('chart-resonance')} />;
      break;
    case 'chart-resonance':
      // After recovering the hour, land on the D13 Pillar Chart (not the old raw chart).
      rendered = <ChartResonanceScreen onBack={goto('app-profile')} onDone={goto('app-pillars')} />;
      break;
    case 'read-locked':
      rendered = <LockedDetail onBack={goto('app-reading')} />;
      break;
    default:
      rendered = <WelcomeScreen onContinue={goto('step1')} />;
  }

  // Welcome needs a CTA hook; pass onContinue as an onClick on the button.
  // Since the current WelcomeScreen doesn't accept onContinue yet, we wrap
  // its CTA via a sibling click listener on the container. See v2 design —
  // the welcome button routes to Step 1.
  return (
    <AuthProvider>
    <ChartProvider>
      <UpgradeModalProvider>
        {/* Stripe founding-pass success redirect → grant access + ceremony (once). */}
        <PurchaseRedirect />
        {/* Dev/test hooks (window.__seedData/__setTier/__buySelfReport/etc.) —
            gated to dev builds so they never ship as a console backdoor. */}
        {IS_DEV && <DevHelpers />}
        <Shell>
          <PhoneFrame>
            {/* Graceful recovery — a calc/render error never blanks the
                screen; it offers a soft path back to adjust birth data. */}
            {/* The key remounts the wrapper per navigation, restarting the
                fade-through-silk enter animation (global.css .el-screen-enter).
                The tab bar below is a sibling, so it stays static. */}
            <ErrorBoundary><Suspense fallback={<ScreenFallback />}>
              <div key={screen} className="el-screen-enter" style={{ position: 'absolute', inset: 0 }}>{rendered}</div>
            </Suspense></ErrorBoundary>
            {/* One global D13 glyph sprite feeds every #tab-/#el-/#ico- <use>
                across the app (the tab bar, wheel, shelf …). */}
            <ReadingSprite />
            {/* The single persistent dashboard nav — rendered here, OUTSIDE the
                swappable page, so it never re-mounts or shifts between tabs.
                Hidden on welcome/onboarding/reveal + stacked detail pages. */}
            {DASHBOARD_TAB[screen] && <ReadingTabBar active={DASHBOARD_TAB[screen]} onTab={routeTab} />}
            {/* Upgrade modal overlays only the phone frame (DES_04 §21) */}
            <UpgradeModalHost />
          </PhoneFrame>
        </Shell>
      </UpgradeModalProvider>
    </ChartProvider>
    </AuthProvider>
  );
}

// Dev-only: exposes window.__seedData() / window.__cycleStem() which
// pre-fill the ChartContext with synthetic charts targeting each of the
// 10 day-master stems so dashboard screens can be visually swept across
// all stems without rewalking onboarding.
//
// Stem-date math: the calculator computes `dayStem = HS[daysElapsed%10]`
// (calculator.js:372). So shifting the date by ±N days shifts the stem
// by N positions in HS (甲乙丙丁戊己庚辛壬癸). The DEV_01 reference date
// 1995-04-29 lands on 庚 (index 6); each subsequent day advances by 1.
function DevHelpers() {
  const { updateBirthData, setChart, setTier, setHasSelfReport, purchaseSelfReport } = useChart();
  const { playWelcomeBack, openUpgrade } = useUpgrade();
  // Dev hook: demo the §21 "Welcome to Seeker" returning-user screen.
  useEffect(() => {
    if (typeof window !== 'undefined') window.__welcomeSeeker = () => playWelcomeBack();
  }, [playWelcomeBack]);
  // Dev hook: open the upgrade modal (used to QA the Founding-pass card).
  useEffect(() => {
    if (typeof window !== 'undefined') window.__openUpgrade = (label) => openUpgrade(label || 'AI Consultant');
  }, [openUpgrade]);
  // Dev hooks: flip tier + the one-time Self-Report entitlement for testing.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__setTier = (t) => setTier(t);
      window.__setSelfReport = (v = true) => setHasSelfReport(v);
      window.__buySelfReport = () => purchaseSelfReport();
    }
  }, [setTier, setHasSelfReport, purchaseSelfReport]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Base preset shared across all 10 stem variants — only the date shifts.
      const base = {
        hour: 18, hourWindow: null, hourUnknown: false,
        location: 'Beijing', gender: 'male', polarity: null,
        notifyOn: true, notifyHour: 8, notifyMinute: 0, notifyMeridiem: 'AM',
      };
      // Day-master stem cycle order, anchored on 庚 = 1995-04-29.
      const STEM_PRESETS = {
        jia:  { ...base, year: 1995, month: 5, day: 3,  __stem: '甲' },
        yi:   { ...base, year: 1995, month: 5, day: 4,  __stem: '乙' },
        bing: { ...base, year: 1995, month: 5, day: 5,  __stem: '丙' },
        ding: { ...base, year: 1995, month: 5, day: 6,  __stem: '丁' },
        wu:   { ...base, year: 1995, month: 5, day: 7,  __stem: '戊' },
        ji:   { ...base, year: 1995, month: 5, day: 8,  __stem: '己' },
        geng: { ...base, year: 1995, month: 4, day: 29, __stem: '庚' }, // canonical
        xin:  { ...base, year: 1995, month: 4, day: 30, __stem: '辛' },
        ren:  { ...base, year: 1995, month: 5, day: 1,  __stem: '壬' },
        gui:  { ...base, year: 1995, month: 5, day: 2,  __stem: '癸' },
      };
      // Backwards-compat alias names.
      const ALIASES = { blade: 'geng', rain: 'gui' };
      // Ordered cycle (DEV_01 / DES_01 canonical order: 甲乙丙丁戊己庚辛壬癸).
      const CYCLE_ORDER = ['jia','yi','bing','ding','wu','ji','geng','xin','ren','gui'];

      window.__seedData = (preset = 'geng') => {
        const key = ALIASES[preset] || preset;
        const data = STEM_PRESETS[key];
        if (!data) {
          console.warn(`[seed] Unknown preset "${preset}". Try one of:`, CYCLE_ORDER);
          return;
        }
        // Strip the __stem debug marker before storing.
        const { __stem, ...clean } = data;
        updateBirthData(clean);
        // Recompute chart synchronously so dashboard screens reflect the new
        // day-master immediately (without round-tripping through Loading).
        // Same call shape as LoadingScreen.jsx — keep in sync if that changes.
        try {
          const chart = calculateBaziChart({
            year: clean.year,
            month: clean.month,
            day: clean.day,
            hour: resolveHourForCalc(clean),
            gender: resolveGenderForCalc(clean),
            longitude: resolveLongitudeForCalc(clean),
            location: resolveLocationName(clean),
          });
          setChart(chart);
          console.log(`[seed] ${__stem} ${key} → dm=${chart.dayMaster?.stem}`);
        } catch (err) {
          console.error('[seed] calculateBaziChart failed:', err);
        }
      };

      // Track cycle index in a closure so successive calls advance.
      let cycleIdx = CYCLE_ORDER.indexOf('geng');
      window.__cycleStem = (dir = 'next') => {
        if (dir === 'next') cycleIdx = (cycleIdx + 1) % CYCLE_ORDER.length;
        else if (dir === 'prev') cycleIdx = (cycleIdx - 1 + CYCLE_ORDER.length) % CYCLE_ORDER.length;
        else if (typeof dir === 'string' && CYCLE_ORDER.includes(dir)) cycleIdx = CYCLE_ORDER.indexOf(dir);
        window.__seedData(CYCLE_ORDER[cycleIdx]);
        return CYCLE_ORDER[cycleIdx];
      };
      window.__stemCycleOrder = CYCLE_ORDER;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
