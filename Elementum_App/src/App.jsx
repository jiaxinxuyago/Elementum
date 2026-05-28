import React, { useState, useEffect } from 'react';
import {
  ChartProvider,
  useChart,
  resolveHourForCalc,
  resolveGenderForCalc,
  resolveLongitudeForCalc,
  resolveLocationName,
} from './store/chartContext.jsx';
import { calculateBaziChart } from './engine/calculator.js';
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
import RevealScreen from './components/RevealScreen.jsx';
import DetailScreenMockup from './components/mockup/DetailScreenMockup.jsx';
import EnergyMapMockup from './components/mockup/EnergyMapMockup.jsx';
// Dashboard shell + 5 tab screens (Phase 1)
import DashboardShell from './components/dashboard/DashboardShell.jsx';
import TodayScreen from './components/dashboard/tabs/TodayScreen.jsx';
import GuidanceScreen from './components/dashboard/tabs/GuidanceScreen.jsx';
import ReadingScreen from './components/dashboard/tabs/ReadingScreen.jsx';
import CompatScreen from './components/dashboard/tabs/CompatScreen.jsx';
import ProfileScreen from './components/dashboard/tabs/ProfileScreen.jsx';
// Upgrade modal (Phase 5 — cross-cutting, used by Phase 4 locked cards)
import { UpgradeModalProvider, UpgradeModalHost, useUpgrade } from './components/dashboard/UpgradeModal.jsx';
import RawChartPage from './components/dashboard/RawChartPage.jsx';
import CodexScreen from './components/dashboard/CodexScreen.jsx';
import ChartResonanceScreen from './components/dashboard/ChartResonanceScreen.jsx';
import ElementalDrawScreen from './components/dashboard/ElementalDrawScreen.jsx';
import EnergyManualScreen from './components/dashboard/EnergyManualScreen.jsx';
import SelfReportScreen from './components/dashboard/SelfReportScreen.jsx';
import AIConsultantScreen from './components/dashboard/AIConsultantScreen.jsx';
// Reading-detail pages + Energy Map (Phase 2)
import EnergyMapScreen from './components/dashboard/EnergyMapScreen.jsx';
import ElementalNatureDetail from './components/dashboard/reading-detail/ElementalNatureDetail.jsx';
import DayMasterDetail from './components/dashboard/reading-detail/DayMasterDetail.jsx';
import TenGodsDetail from './components/dashboard/reading-detail/TenGodsDetail.jsx';
import ForcesInMotionDetail from './components/dashboard/reading-detail/ForcesInMotionDetail.jsx';
import LifeChaptersDetail from './components/dashboard/reading-detail/LifeChaptersDetail.jsx';
import ChartPatternsDetail from './components/dashboard/reading-detail/ChartPatternsDetail.jsx';
import SeasonalCalibrationDetail from './components/dashboard/reading-detail/SeasonalCalibrationDetail.jsx';
import LockedDetail from './components/dashboard/reading-detail/LockedDetail.jsx';
import DevBar from './components/dev/DevBar.jsx';
import { SILK } from './styles/tokens.jsx';
import { SCREEN_BG } from './styles/backgrounds.js';
import ErrorBoundary from './components/ErrorBoundary.jsx';

// Dev-only. DevBar + phone-frame sit side-by-side on desktop; on mobile
// viewports the DevBar hides so the phone frame fills the screen.
const IS_DEV = typeof import.meta !== 'undefined' && import.meta.env?.DEV;

// Phone-frame wrapper — DOC5 §6 specifies 390×844 viewport context.
// On desktop we center a phone-shaped frame; on mobile it fills the viewport.
function PhoneFrame({ children }) {
  return (
    <div
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
      {IS_DEV && showDev && <DevBar />}
      {children}
    </div>
  );
}

// Flow state machine — each named screen is a step.
// Conditionals (4A, 6A, 7A) are handled via per-step `onX` callbacks.
//
// Post-Reveal screens live under the `app/*` namespace and render inside the
// 5-tab dashboard shell (DOC5 §AM.2). The legacy `mockup-*` entries remain
// reachable by direct hash (#/mockup-detail, #/mockup-energymap) for A/B
// comparison during the build — they are NOT linked from the main flow.
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
  // Dashboard tabs (DOC5 §10–§14) — entered from Reveal's "Enter Your Energy Map" CTA.
  'app-today',
  'app-guidance',
  'app-reading',     // catalogue (DOC5 §11)
  'app-energymap',   // Energy Map destination (DOC5 §AM.1 — same as Reveal, no first-time CTA)
  'app-codex',       // BaZi Codex (Guidance §12 Card 5)
  'app-draw',        // Elemental Draw (Guidance §12 Card 1)
  'app-manual',      // Energy Manual (Guidance §12 Card 2)
  'app-selfreport',  // Self-Report (Guidance §12 Card 3)
  'app-consultant',  // AI Consultant (Guidance §12 Card 4)
  'app-compat',
  'app-profile',
  // Reading detail destinations (DOC5 §11 drill-downs)
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
  // Legacy — kept reachable by hash for visual comparison; out of routing flow.
  'mockup-detail',
  'mockup-energymap',
];

// Read the initial screen from URL hash so refresh/deep-links land correctly.
function readHash() {
  const h = (typeof window !== 'undefined' ? window.location.hash : '')
    .replace(/^#\/?/, '')
    .toLowerCase();
  return FLOW.includes(h) ? h : 'welcome';
}

export default function App() {
  const [screen, setScreenState] = useState(readHash);

  // Keep URL hash in sync so reloads preserve state (and screens are
  // deep-linkable during development).
  const setScreen = (next) => {
    const name = typeof next === 'function' ? next(screen) : next;
    setScreenState(name);
    if (typeof window !== 'undefined') {
      window.location.hash = `#/${name}`;
    }
  };

  // Listen for external hash changes (e.g. preview_eval setting location.hash)
  useEffect(() => {
    const onHashChange = () => setScreenState(readHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Dev-only helper: window.__goto('step3') to jump to any screen for testing.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__goto = (name) => {
        if (FLOW.includes(name)) setScreen(name);
        else console.warn('Unknown screen:', name, '; valid:', FLOW);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Linear-forward helper — skips any screen not matched by the named chain.
  const advance = (current, to) => () => setScreen(to);

  const goto = (name) => () => setScreen(name);

  // Maps a BottomTabNav key ('today', 'guidance', 'reading', 'compat',
  // 'profile') to the corresponding FLOW screen ('app-*'). Used as the
  // `onTabChange` callback by every DashboardShell render.
  const routeTab = (tabKey) => setScreen(`app-${tabKey}`);

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

  let rendered = null;
  switch (screen) {
    case 'welcome':
      rendered = <WelcomeScreen onContinue={goto('step1')} />;
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
      // §AM.1: Reveal CTA lands the user inside the Reading tab catalogue
      // (the dashboard's centre tab), not on a separate Energy Map page.
      rendered = <RevealScreen onEnterDashboard={goto('app-reading')} />;
      break;

    // ────────────────────────────────────────────────────────────────
    // Dashboard tabs (DOC5 §10–§14) — all wrapped in DashboardShell so
    // BottomTabNav is persistent across them. The tab→screen mapping
    // mirrors `TAB_KEYS` exported from BottomTabNav.
    // ────────────────────────────────────────────────────────────────
    case 'app-today':
      rendered = (
        <DashboardShell active="today" onTabChange={routeTab} bg={SCREEN_BG.today}>
          <TodayScreen />
        </DashboardShell>
      );
      break;
    case 'app-guidance':
      rendered = (
        <DashboardShell active="guidance" onTabChange={routeTab} bg={SCREEN_BG.guidance}>
          <GuidanceScreen onOpen={(route) => setScreen(route)} />
        </DashboardShell>
      );
      break;
    case 'app-codex':
      rendered = (
        <DashboardShell active="guidance" onTabChange={routeTab} bg={SCREEN_BG.guidance}>
          <CodexScreen onBack={goto('app-guidance')} />
        </DashboardShell>
      );
      break;
    case 'app-draw':
      rendered = (
        <DashboardShell active="guidance" onTabChange={routeTab} bg={SCREEN_BG.guidance}>
          <ElementalDrawScreen onBack={goto('app-guidance')} />
        </DashboardShell>
      );
      break;
    case 'app-manual':
      rendered = (
        <DashboardShell active="guidance" onTabChange={routeTab} bg={SCREEN_BG.guidance}>
          <EnergyManualScreen onBack={goto('app-guidance')} onOpenConsultant={goto('app-consultant')} />
        </DashboardShell>
      );
      break;
    case 'app-selfreport':
      rendered = (
        <DashboardShell active="guidance" onTabChange={routeTab} bg={SCREEN_BG.guidance}>
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
      rendered = (
        <DashboardShell active="reading" onTabChange={routeTab} bg={SCREEN_BG.reading}>
          <ReadingScreen
            onOpen={(route) => setScreen(route)}
            onOpenEnergyMap={goto('app-energymap')}
          />
        </DashboardShell>
      );
      break;
    case 'app-compat':
      rendered = (
        <DashboardShell active="compat" onTabChange={routeTab} bg={SCREEN_BG.compat}>
          <CompatScreen />
        </DashboardShell>
      );
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
    // like a page in a stack, per DOC5 §11 v1.7 "DetailShell wrapper"
    // (carried forward by §AM.1 as authoritative).
    // ────────────────────────────────────────────────────────────────
    case 'app-energymap':
      rendered = <EnergyMapScreen onBack={goto('app-reading')} />;
      break;
    case 'read-elemental':
      rendered = <ElementalNatureDetail onBack={goto('app-reading')} />;
      break;
    case 'read-daymaster':
      rendered = <DayMasterDetail onBack={goto('app-reading')} />;
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
      rendered = <RawChartPage onBack={goto('read-daymaster')} />;
      break;
    case 'chart-resonance':
      rendered = <ChartResonanceScreen onBack={goto('app-profile')} onDone={goto('chart-reveal')} />;
      break;
    case 'read-locked':
      rendered = <LockedDetail onBack={goto('app-reading')} />;
      break;

    // ────────────────────────────────────────────────────────────────
    // Legacy mockups — reachable only by direct hash. Kept around for
    // A/B comparison during the dashboard build per Q3 (b). Will be
    // deleted once the real screens are confirmed.
    // ────────────────────────────────────────────────────────────────
    case 'mockup-detail':
      rendered = <DetailScreenMockup onBack={goto('reveal')} />;
      break;
    case 'mockup-energymap':
      rendered = (
        <EnergyMapMockup
          onBack={goto('reveal')}
          onOpenDetail={() => setScreen('mockup-detail')}
        />
      );
      break;
    default:
      rendered = <WelcomeScreen onContinue={goto('step1')} />;
  }

  // Welcome needs a CTA hook; pass onContinue as an onClick on the button.
  // Since the current WelcomeScreen doesn't accept onContinue yet, we wrap
  // its CTA via a sibling click listener on the container. See v2 design —
  // the welcome button routes to Step 1.
  return (
    <ChartProvider>
      <UpgradeModalProvider>
        <DevHelpers />
        <Shell>
          <PhoneFrame>
            {/* Graceful recovery — a calc/render error never blanks the
                screen; it offers a soft path back to adjust birth data. */}
            <ErrorBoundary>{rendered}</ErrorBoundary>
            {/* Upgrade modal overlays only the phone frame (DOC5 §21) */}
            <UpgradeModalHost />
          </PhoneFrame>
        </Shell>
      </UpgradeModalProvider>
    </ChartProvider>
  );
}

// Dev-only: exposes window.__seedData() / window.__cycleStem() which
// pre-fill the ChartContext with synthetic charts targeting each of the
// 10 day-master stems so dashboard screens can be visually swept across
// all stems without rewalking onboarding.
//
// Stem-date math: the calculator computes `dayStem = HS[daysElapsed%10]`
// (calculator.js:372). So shifting the date by ±N days shifts the stem
// by N positions in HS (甲乙丙丁戊己庚辛壬癸). The DOC1 reference date
// 1995-04-29 lands on 庚 (index 6); each subsequent day advances by 1.
function DevHelpers() {
  const { updateBirthData, setChart } = useChart();
  const { playWelcomeBack } = useUpgrade();
  // Dev hook: demo the §21 "Welcome to Seeker" returning-user screen.
  useEffect(() => {
    if (typeof window !== 'undefined') window.__welcomeSeeker = () => playWelcomeBack();
  }, [playWelcomeBack]);
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
      // Ordered cycle (DOC1 / DOC2 canonical order: 甲乙丙丁戊己庚辛壬癸).
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
