// ===================================================================
// FLOW VIEWER APP — 10-screen sequential viewer
// L/R arrow navigation, screen selector pills, annotation panel
// ===================================================================

const SCREENS = [
  {
    id: 'welcome',
    label: '1 · Welcome',
    component: window.WelcomeScreen,
    anno: {
      title: 'Welcome',
      body: [
        'Aged silk paper ground with two keyed ink-wash layers — distant ridges above, island cluster below. The ELEMENTUM wordmark sits in the lower third in Cinzel 22 / tracked 10, under a dry-brush underline, with a single italic line of EB Garamond below. No central glyph or masthead — the Reveal mark is withheld until §9.',
        'The wordmark IS the identity mark on this screen; the italic line carries tone. Primary CTA is "Discover Yours" in Cinzel tracked 4px over solid ink. "Already mapped? Sign in" is the quiet secondary path per §6.',
      ],
      motion: 'Silk paper breathes in first, then mountains key in behind; wordmark fades up first, underline paints left-to-right, then subtitle and CTA on a 0.4s stagger. Out: cross-fade into Step 1 with a 350ms slide-left.',
    },
  },
  {
    id: 'step1',
    label: '2 · Year',
    component: window.Step1_Year,
    anno: {
      title: 'Onboarding · Step 1 · Year',
      body: [
        'Unified onboarding shell: 3px bronze gradient progress bar at the top, "Step N of 7" counter, question in EB Garamond 27px bronze with 1.2px tracking, italic poetic subtitle at 15px/1.7.',
        'Custom scroll picker replaces the browser <select>. Center row is highlighted by a faint bronze wash between hairline rules; selected value is Cormorant 32px ink-dark; neighbors ghost in Cormorant 20px at 0.5/0.22 opacity. A tiny earth-element sign echoes at left as a quiet calendrical cue.',
      ],
      motion: 'Slide in from right (x: 20→0), AnimatePresence mode="wait", 350ms, easing [0.22, 1, 0.36, 1]. Back reverses direction.',
    },
  },
  {
    id: 'step2',
    label: '3 · Month',
    component: window.Step2_Month,
    anno: {
      title: 'Onboarding · Step 2 · Month',
      body: [
        'Same shell, same scroll picker, month names in full English (not numerals — warmer, more ritual). Left echo shifts to a wood-element sign — months as "the season your soul chose."',
        'The consistency across steps 1–3 is intentional: the ritual is in the rhythm of identical questions arriving one at a time, not in per-step novelty.',
      ],
      motion: 'Slide left 350ms. The previous month fades out on the upper ghosted rows as the new one fades in.',
    },
  },
  {
    id: 'step3',
    label: '4 · Day',
    component: window.Step3_Day,
    anno: {
      title: 'Onboarding · Step 3 · Day',
      body: [
        'Days 1–31, zero-padded (01, 02…) — reinforces the feel of a calendrical inscription rather than casual entry. Left echo shifts to the metal-element sign: "your day is your core."',
        'The subtitle explicitly names the Day pillar as the deepest identity marker — this is the day-stem that will become 庚 Yang Metal on the Reveal.',
      ],
      motion: 'Slide left 350ms. The center row does a subtle 30ms upward spring as it settles on the chosen day.',
    },
  },
  {
    id: 'step4',
    label: '5 · Hour',
    component: window.Step4_Hour,
    anno: {
      title: 'Onboarding · Step 4 · Birth Time',
      body: [
        'Level 1 (exact time) shown as the default — 24-hour scroll picker with "HH:00" formatting and a water-element left echo. Caption beneath in italic: "24-hour format, local time. Even an approximate time improves accuracy."',
        'Level 2 ("I only know the general time →") and Level 3 ("I have no idea →") appear as tertiary links below the picker. Tapping Level 2 swaps the picker for the 2×3 time-window grid (Late night / Early morning / Morning / Midday / Afternoon / Evening). Tapping Level 3 advances to Step 5 with hour = null and calculates a 3-pillar chart — no error, no block.',
      ],
      motion: 'Slide left 350ms. If Level 2 or 3 is tapped, the picker fades out and the window grid (or null-hour confirmation) fades in with a 300ms height animation.',
    },
  },
  {
    id: 'step5',
    label: '6 · Location',
    component: window.Step5_Location,
    anno: {
      title: 'Onboarding · Step 5 · Location',
      body: [
        'Text input on silk fill with a quiet location-pin icon. Prefilled here with "New York, USA" to show the active state; live typing would trigger geocoding → longitude for True Solar Time calculation.',
        'Bronze-tinted "Why location matters" card explains the 真太阳时 conversion and the Beijing-default fallback. Geocoding failure never blocks the user — Beijing longitude (116.4°E) is used silently, with a Profile note to update later.',
      ],
      motion: 'Slide left 350ms. Input focus draws a softer bronze ring; "Why location matters" card fades in 120ms after the field.',
    },
  },
  {
    id: 'step6',
    label: '7 · Polarity',
    component: window.Step6_Polarity,
    anno: {
      title: 'Onboarding · Step 6 · Sex / Energy Current (expanded)',
      body: [
        'Shown in the "Prefer not to say / other" expanded state per brief. Three stacked options use the spec\'s button treatment (#e8e3d8 bg, #d9d3c8 border, 17px EB Garamond); the selected "Prefer not to say" gets the bronze tint + hairline bronze border.',
        'Expanded panel has a dashed bronze border and light bronze wash. "Which energy current moves through you?" heading, then a Forward/Yang ↑ Outward vs. Inward/Yin ↓ Receptive toggle, and an "I\'m not sure →" fallback that defaults to Yang and adds a Profile note for later refinement.',
      ],
      motion: 'Selecting "Prefer not to say" expands the inline panel with height 0→auto + opacity 0→1, 300ms ease-out. Out of Step 6, slide left 350ms into Step 7.',
    },
  },
  {
    id: 'step7',
    label: '8 · Notify',
    component: window.Step7_Notify,
    anno: {
      title: 'Onboarding · Step 7 · Notifications',
      body: [
        'A centered bronze bell icon replaces the 32px ink variant — softer palette-match to the onboarding shell. The subtitle is the ritual promise ("Your energy doesn\'t wait for you to remember to check"); body copy below is supplementary, one line.',
        'Toggle card defaults to ON with 8:00 AM and a "▼ Change time" affordance. The Continue button transforms into "Reveal My Nature" in Cinzel 12/4px over a fully-rounded pill — this is the only step where the CTA shape and typography change, marking the weight of the next threshold. "Skip for now" sits below as a deferred-consent option per spec.',
      ],
      motion: 'Reveal My Nature press: 500ms slower fade (weighty), crossfades directly into the Loading screen without a horizontal slide.',
    },
  },
  {
    id: 'loading',
    label: '9 · Loading',
    component: window.LoadingScreen,
    anno: {
      title: 'Loading',
      body: [
        'Per §8: five element characters (木火土金水) pulse on staggered delays in their pigment colors — the only place in the flow where Chinese glyphs appear inline, earning their presence as the calculation signature. "Calculating your chart…" reads in Cormorant italic; a quiet subtitle extends the moment to 2.5–3s.',
        'Five element dots fill left-to-right beneath the text, each sweeping to its pigment color with a soft glow, then dimming — signalling five distinct calculations. A single distant ridge sits low in the frame, grounding the composition without competing.',
      ],
      motion: 'Duration 2.5–3s (padded if computation is faster — the wait is intentional). On completion, fade out entire screen at 500ms, then push to /reveal.',
    },
  },
  {
    id: 'reveal',
    label: '10 · Reveal',
    component: window.RevealScreen,
    anno: {
      title: 'Reveal (scroll to explore)',
      body: [
        'Design decision — following DOC5 §9 continuous scroll, not the Phase 1 tab system. Rationale: §9 is explicit ("the user is meant to spend 60–90 seconds here, not 10"); Ink & Pigment\'s whole thesis is a contemplative unfolding like a 山水 handscroll; tabs fight that metaphor. Phase 1 used tabs because the Reveal was a static preview frame — the real product flow honors the spec.',
        'Four sections: (1) Identity — archetype seal, "You are…", THE BLADE in Cormorant 44, subtitle, 庚·Yang Metal·Blade pill, essence paragraph. (2) Energy Blueprint — five rows sorted high→low with animated bars and a missing-Fire callout. (3) Balance Prescription — activated because Fire=0; "Cultivate Fire" card with Environment/Colors/Timing categories. (4) CTA — solid ink "Enter Your Dashboard →" into /dashboard/energy-map.',
      ],
      motion: 'Section 1 enters on mount: seal springs in (scale 0.5→1, bounce 0.5), then staggered fade at 0/200/400/600/800ms. Sections 2–3 trigger on scroll-into-view: blueprint bars fill 0→(count/8)×100% over 800ms ease-out. "Enter Your Dashboard" transitions to the Today tab of the Energy Map on first session.',
    },
  },
];

function FlowApp() {
  const [idx, setIdx] = useState(() => {
    const saved = parseInt(localStorage.getItem('elementum-flow-idx') || '0', 10);
    return isNaN(saved) ? 0 : Math.max(0, Math.min(SCREENS.length - 1, saved));
  });

  useEffect(() => {
    localStorage.setItem('elementum-flow-idx', String(idx));
  }, [idx]);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowLeft') setIdx(i => Math.max(0, i - 1));
      if (e.key === 'ArrowRight') setIdx(i => Math.min(SCREENS.length - 1, i + 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const current = SCREENS[idx];
  const Comp = current.component;

  return (
    <div className="viewer">
      <div className="viewer-header">
        <div className="v-eyebrow">ELEMENTUM · PHASE 2A · PRE-DASHBOARD FLOW</div>
        <h1 className="v-title">Ink &amp; Pigment — Welcome → Reveal</h1>
        <div className="v-sub">
          10-screen sequential flow per DOC5 §§6–9. Reference user: <strong style={{color:'#d8d2c2'}}>Yang Metal (庚) · The Blade</strong> · dominant Inner Council force = <strong style={{color:'#d8d2c2'}}>The General (七杀)</strong>. Use ← / → arrow keys or the buttons to step through.
        </div>
      </div>

      <div className="screen-selector">
        {SCREENS.map((s, i) => (
          <button
            key={s.id}
            className={`ss-pill ${idx === i ? 'active' : ''}`}
            onClick={() => setIdx(i)}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="flow-wrap">
        <button
          className="nav-btn"
          onClick={() => setIdx(i => Math.max(0, i - 1))}
          disabled={idx === 0}
          aria-label="Previous screen">←</button>

        <div>
          <div className="phone-shell">
            <div className="phone-notch"/>
            <div className="phone-screen">
              {Comp ? <Comp
                key={current.id}
                onBack={() => setIdx(i => Math.max(0, i - 1))}
                onContinue={() => setIdx(i => Math.min(SCREENS.length - 1, i + 1))}
              /> : <div style={{padding: 40}}>Loading…</div>}
            </div>
          </div>
          <div className="frame-label">
            <strong>{idx + 1}</strong> of {SCREENS.length} · {current.label.replace(/^\d+\s·\s/, '')}
          </div>
        </div>

        <button
          className="nav-btn"
          onClick={() => setIdx(i => Math.min(SCREENS.length - 1, i + 1))}
          disabled={idx === SCREENS.length - 1}
          aria-label="Next screen">→</button>
      </div>

      <div className="annotation">
        <div className="anno-eyebrow">Screen {idx + 1} of {SCREENS.length}</div>
        <div className="anno-title">{current.anno.title}</div>
        {current.anno.body.map((p, i) => <p key={i}>{p}</p>)}
        <div className="anno-transition">
          <strong>Transition</strong>{current.anno.motion}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<FlowApp/>);
