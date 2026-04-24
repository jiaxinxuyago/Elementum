import React, { useState, useEffect } from 'react';
import { ChartProvider, useChart } from './store/chartContext.jsx';
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
import DevBar from './components/dev/DevBar.jsx';
import { SILK } from './styles/tokens.jsx';

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
      rendered = <RevealScreen onEnterDashboard={() => { /* TODO Phase 2 */ }} />;
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
      <DevHelpers />
      <Shell>
        <PhoneFrame>{rendered}</PhoneFrame>
      </Shell>
    </ChartProvider>
  );
}

// Dev-only: exposes window.__seedData() which pre-fills the ChartContext
// with the DOC1 reference chart (庚 Yang Metal, 1995-04-29, 18:00, Beijing)
// so Loading and Reveal can be tested without walking the full onboarding.
function DevHelpers() {
  const { updateBirthData } = useChart();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__seedData = (preset = 'blade') => {
        const presets = {
          // DOC1 reference: 乙亥 庚辰 庚寅 乙酉 · The Blade (Yang Metal)
          blade: {
            year: 1995, month: 4, day: 29, hour: 18,
            hourWindow: null, hourUnknown: false,
            location: 'Beijing', gender: 'male', polarity: null,
            notifyOn: true, notifyHour: 8, notifyMinute: 0, notifyMeridiem: 'AM',
          },
          // Yin Water · The Rain
          rain: {
            year: 1988, month: 6, day: 15, hour: 3,
            hourWindow: null, hourUnknown: false,
            location: 'Tokyo', gender: 'female', polarity: null,
            notifyOn: true, notifyHour: 7, notifyMinute: 0, notifyMeridiem: 'AM',
          },
        };
        updateBirthData(presets[preset] || presets.blade);
        console.log('Seeded birthData:', preset);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
