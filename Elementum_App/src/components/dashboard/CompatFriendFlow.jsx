// ===================================================================
// ELEMENTUM · CompatFriendFlow  (screens-v2 — Friends onboarding driver)
// ===================================================================
// Full-frame orchestrator for the 6-step "their birth" flow (no tab bar,
// like onboarding). Holds the phase machine + a local `friend` object,
// then on the final step computes the compatibility reading from the
// user's chart + the friend's data (via the shared resolver helpers) and
// stashes it in ChartContext (compatResult) before returning to the
// Compatibility tab, which renders the result.
// ===================================================================

import { useState } from 'react';
import {
  useChart,
  resolveHourForCalc,
  resolveGenderForCalc,
  resolveLongitudeForCalc,
  resolveLocationName,
} from '../../store/chartContext.jsx';
import { calculateBaziChart, computeCompatibility } from '../../engine/index.js';
import { STEM_CARD_DATA } from '../../content/index.js';
import {
  FriendYear, FriendMonth, FriendDay, FriendHour, FriendHourWindow, FriendGender, FriendCurrent,
} from './CompatFriendSteps.jsx';
import { ink, inkSoft, inkLight, silk, cream, paperHair, bronzeDark } from '../../styles/tokens';

const INITIAL_FRIEND = { year: null, month: null, day: null, hour: null, hourWindow: null, hourUnknown: false, gender: null, polarity: 'yang' };
const archetypeOf = (stem, element) => STEM_CARD_DATA[stem]?.identity?.archetypeName || `${element} Day Master`;

export default function CompatFriendFlow({ onExit, onDone }) {
  const { chart, setCompatResult } = useChart();
  const [phase, setPhase] = useState('year');
  const [friend, setFriend] = useState(INITIAL_FRIEND);
  const update = (patch) => setFriend((f) => ({ ...f, ...patch }));
  const [confirming, setConfirming] = useState(false);

  // Quiet cancel: on the very first step (no data committed yet) just leave;
  // once the user is past it, confirm before discarding the half-entered friend.
  const requestCancel = () => { if (phase === 'year') onExit(); else setConfirming(true); };

  // Final step → compute the friend's chart + the relationship reading.
  const computeAndExit = (finalPatch) => {
    const f = { ...friend, ...finalPatch };
    const user = chart?.dayMaster;
    if (user) {
      const other = calculateBaziChart({
        year: f.year, month: f.month, day: f.day,
        hour: resolveHourForCalc(f),
        gender: resolveGenderForCalc(f),
        longitude: resolveLongitudeForCalc(f),
        location: resolveLocationName(f),
      });
      const res = computeCompatibility(
        { stem: user.stem, element: user.element, polarity: user.polarity, archetype: archetypeOf(user.stem, user.element) },
        { stem: other.dayMaster.stem, element: other.dayMaster.element, polarity: other.dayMaster.polarity, archetype: archetypeOf(other.dayMaster.stem, other.dayMaster.element) },
      );
      setCompatResult({ ...res, name: 'Them' });
    }
    onDone();
  };

  const common = { friend, update };
  let step;
  switch (phase) {
    case 'month':
      step = <FriendMonth {...common} onBack={() => setPhase('year')} onContinue={() => setPhase('day')} />; break;
    case 'day':
      step = <FriendDay {...common} onBack={() => setPhase('month')} onContinue={() => setPhase('hour')} />; break;
    case 'hour':
      step = <FriendHour {...common} onBack={() => setPhase('day')} onContinue={() => setPhase('gender')} onApproximate={() => setPhase('hourwindow')} onUnknown={() => setPhase('gender')} />; break;
    case 'hourwindow':
      step = <FriendHourWindow {...common} onBack={() => setPhase('hour')} onContinue={() => setPhase('gender')} onUnknown={() => setPhase('gender')} />; break;
    case 'gender':
      step = <FriendGender {...common} onBack={() => setPhase('hour')} onContinue={(gender) => computeAndExit({ gender })} onPreferNot={() => setPhase('current')} />; break;
    case 'current':
      step = <FriendCurrent {...common} onBack={() => setPhase('gender')} onContinue={(polarity) => computeAndExit({ polarity })} />; break;
    case 'year':
    default:
      step = <FriendYear {...common} onBack={onExit} onContinue={() => setPhase('month')} />; break;
  }

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {step}
      {/* Quiet cancel — sits in the empty ridge band above the question, clear
          of the status bar and the step content. */}
      <button
        type="button"
        onClick={requestCancel}
        aria-label="Cancel"
        style={{
          position: 'absolute', top: 52, right: 18, zIndex: 31,
          width: 32, height: 32, borderRadius: 999, border: 'none', background: 'transparent',
          color: inkLight, fontSize: 18, lineHeight: 1, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >✕</button>

      {confirming && (
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 60,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(28,24,19,0.42)', padding: 24,
          }}
          onClick={() => setConfirming(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: cream, border: `1px solid ${paperHair}`, borderRadius: 16,
              padding: '22px 20px', maxWidth: 300, width: '100%', textAlign: 'center',
              boxShadow: '0 12px 40px rgba(28,24,19,0.35)',
            }}
          >
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 21, fontWeight: 500, color: ink, lineHeight: 1.2 }}>
              Leave the joining?
            </div>
            <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14, lineHeight: 1.5, color: inkSoft, margin: '8px 0 18px' }}>
              Their details won’t be saved.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                style={{
                  flex: 1, padding: '12px', borderRadius: 999, border: `1px solid ${paperHair}`,
                  background: 'transparent', color: bronzeDark, cursor: 'pointer',
                  fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13, letterSpacing: 1, textTransform: 'uppercase',
                }}
              >Stay</button>
              <button
                type="button"
                onClick={onExit}
                style={{
                  flex: 1, padding: '12px', borderRadius: 999, border: 'none',
                  background: ink, color: silk, cursor: 'pointer',
                  fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13, letterSpacing: 1, textTransform: 'uppercase',
                }}
              >Leave</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
