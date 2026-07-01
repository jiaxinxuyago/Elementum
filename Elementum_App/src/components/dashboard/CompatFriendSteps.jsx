// ===================================================================
// ELEMENTUM · CompatFriendSteps  (screens-v2 — Friends onboarding)
// ===================================================================
// The 6-step "their birth" flow that feeds Compatibility: a verbatim
// re-voicing of the user's own onboarding wheel steps (year → month →
// day → hour → [hour-window] → energy-current), but written in the third
// person and writing into a `friend` object instead of birthData.
//
// Each step composes the shared OnboardingShell + ScrollPicker (and the
// hour-window tile grid / yang-yin cards), so the wheel physics, layout,
// and progress bar match onboarding exactly. The eyebrow reads
// "Their birth · N of 5" (the bar still uses the /7 fractions for pixel
// parity with the design export). No tab bar — these are full-frame, like
// onboarding.
// ===================================================================

import { useMemo, useState } from 'react';
import {
  INK, INK_SOFT, INK_LIGHT, BRONZE_MID,
  PIG_METAL, PIG_WOOD, PIG_WATER, PIG_FIRE, PIG_EARTH,
  ElementSign,
} from '../../styles/tokens.jsx';
import { OnboardingShell, ScrollPicker } from '../onboarding/OnboardingShell.jsx';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// ── 1 · YEAR ───────────────────────────────────────────────────────
export function FriendYear({ friend, update, onBack, onContinue }) {
  const years = useMemo(() => {
    const arr = []; const now = new Date().getFullYear();
    for (let y = now; y >= 1900; y--) arr.push(y);
    return arr;
  }, []);
  const defaultIdx = years.indexOf(friend.year ?? 1991);
  const [sel, setSel] = useState(defaultIdx >= 0 ? defaultIdx : 0);
  return (
    <OnboardingShell
      eyebrow="Their birth · 1 of 5"
      progressValue={1 / 7}
      question="When were they born?"
      subtitle={<>“The year they arrived reveals what they carry<br />from those who came before.”</>}
      canContinue={sel >= 0}
      onBack={onBack}
      onContinue={() => { update({ year: years[sel] }); onContinue(); }}
    >
      <div style={{ padding: '12px 0' }}>
        <ScrollPicker values={years} selectedIndex={sel} onChange={setSel} />
      </div>
    </OnboardingShell>
  );
}

// ── 2 · MONTH ──────────────────────────────────────────────────────
export function FriendMonth({ friend, update, onBack, onContinue }) {
  const [sel, setSel] = useState(friend.month ? friend.month - 1 : 0);
  return (
    <OnboardingShell
      eyebrow="Their birth · 2 of 5"
      progressValue={2 / 7}
      question="Which month?"
      subtitle={<>“Their month is the season their soul<br />chose to enter this world.”</>}
      canContinue={sel >= 0}
      onBack={onBack}
      onContinue={() => { update({ month: sel + 1 }); onContinue(); }}
    >
      <div style={{ padding: '12px 0' }}>
        <ScrollPicker values={MONTHS.map((_, i) => i)} selectedIndex={sel} onChange={setSel} formatter={(i) => MONTHS[i]} />
      </div>
    </OnboardingShell>
  );
}

// ── 3 · DAY ────────────────────────────────────────────────────────
export function FriendDay({ friend, update, onBack, onContinue }) {
  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), []);
  const [sel, setSel] = useState(friend.day ? friend.day - 1 : 0);
  return (
    <OnboardingShell
      eyebrow="Their birth · 3 of 5"
      progressValue={3 / 7}
      question="What day?"
      subtitle={<>“Their day is their core — the essence<br />of who they are at the deepest level.”</>}
      canContinue={sel >= 0}
      onBack={onBack}
      onContinue={() => { update({ day: days[sel] }); onContinue(); }}
    >
      <div style={{ padding: '12px 0' }}>
        <ScrollPicker values={days} selectedIndex={sel} onChange={setSel} formatter={(v) => `${v < 10 ? '0' : ''}${v}`} />
      </div>
    </OnboardingShell>
  );
}

// ── 4 · HOUR (with the two escape links) ───────────────────────────
const linkA = { fontFamily: "'EB Garamond', serif", fontSize: 14, color: BRONZE_MID, textDecoration: 'underline', textUnderlineOffset: 3, textDecorationThickness: '1px', cursor: 'pointer', whiteSpace: 'nowrap' };
const linkB = { ...linkA, fontSize: 13, color: INK_LIGHT };

export function FriendHour({ friend, update, onBack, onContinue, onApproximate, onUnknown }) {
  const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
  const [sel, setSel] = useState(friend.hour != null ? friend.hour : 9);
  return (
    <OnboardingShell
      eyebrow="Their birth · 4 of 5"
      progressValue={4 / 7}
      question="Do you know their hour?"
      subtitle={<>“Their hour reveals how they express<br />their nature outward.”</>}
      canContinue={true}
      onBack={onBack}
      onContinue={() => { update({ hour: hours[sel], hourWindow: null, hourUnknown: false }); onContinue(); }}
    >
      <div style={{ padding: '4px 0 0' }}>
        <ScrollPicker values={hours} selectedIndex={sel} onChange={setSel} formatter={(v) => `${v < 10 ? '0' : ''}${v}:00`} />
        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <a href="#" onClick={(e) => { e.preventDefault(); onApproximate && onApproximate(); }} style={linkA}>
            I only know the general time →
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); update({ hour: null, hourWindow: null, hourUnknown: true }); onUnknown && onUnknown(); }} style={linkB}>
            I have no idea →
          </a>
        </div>
      </div>
    </OnboardingShell>
  );
}

// ── 4A · HOUR WINDOW (conditional) ─────────────────────────────────
const WINDOWS = [
  { id: 'late-night', label: 'Late night',    range: '11 pm – 3 am', branch: '子·丑', color: PIG_WATER, element: 'water' },
  { id: 'early',      label: 'Early morning', range: '3 am – 7 am',  branch: '寅·卯', color: PIG_WOOD,  element: 'wood' },
  { id: 'morning',    label: 'Morning',       range: '7 am – 11 am', branch: '辰·巳', color: PIG_WOOD,  element: 'wood' },
  { id: 'midday',     label: 'Midday',        range: '11 am – 3 pm', branch: '午·未', color: PIG_FIRE,  element: 'fire' },
  { id: 'afternoon',  label: 'Afternoon',     range: '3 pm – 7 pm',  branch: '申·酉', color: PIG_METAL, element: 'metal' },
  { id: 'evening',    label: 'Evening',       range: '7 pm – 11 pm', branch: '戌·亥', color: PIG_EARTH, element: 'earth' },
];

export function FriendHourWindow({ friend, update, onBack, onContinue, onUnknown }) {
  const [sel, setSel] = useState(friend.hourWindow || 'morning');
  const tile = (w) => {
    const isActive = sel === w.id;
    return (
      <button key={w.id} onClick={() => setSel(w.id)} style={{
        position: 'relative', padding: '14px 12px 13px', borderRadius: 10,
        border: isActive ? `1px solid ${BRONZE_MID}` : '1px solid #d9d3c8',
        background: isActive ? 'rgba(139,115,85,0.13)' : 'rgba(232,227,216,0.7)',
        fontFamily: "'EB Garamond', serif", color: INK, cursor: 'pointer', textAlign: 'center',
        transition: 'all 220ms ease', boxSizing: 'border-box', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 6, left: 7, opacity: isActive ? 0.55 : 0.3 }}>
          <ElementSign element={w.element} size={11} color={w.color} />
        </div>
        <div style={{ fontSize: 14.5, fontWeight: 500, letterSpacing: 0.2 }}>{w.label}</div>
        <div style={{ fontSize: 11.5, color: INK_LIGHT, marginTop: 3, letterSpacing: 0.4, fontVariantNumeric: 'tabular-nums' }}>{w.range}</div>
        <div style={{ fontSize: 10, color: BRONZE_MID, marginTop: 4, letterSpacing: 1.4, opacity: 0.7 }}>{w.branch}</div>
      </button>
    );
  };
  return (
    <OnboardingShell
      eyebrow="Their birth · hour unknown"
      progressValue={4.5 / 7}
      question="Which part of their day?"
      subtitle={<>“An approximate window still places<br />them within a true 时辰.”</>}
      canContinue={sel !== null}
      onBack={onBack}
      onContinue={() => { update({ hour: null, hourWindow: sel, hourUnknown: false }); onContinue(); }}
    >
      <div style={{ padding: '0 2px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>{WINDOWS.map(tile)}</div>
        <div style={{ marginTop: 16, textAlign: 'center', fontFamily: "'EB Garamond', serif", fontSize: 12.5, color: INK_LIGHT, lineHeight: 1.55, padding: '0 12px' }}>
          Each window covers one traditional two-hour 时辰,<br />the unit Chinese astrology has always used.
        </div>
        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'center' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); update({ hour: null, hourWindow: null, hourUnknown: true }); onUnknown && onUnknown(); }} style={linkB}>
            I have no idea →
          </a>
        </div>
      </div>
    </OnboardingShell>
  );
}

// ── 5 · ENERGY CURRENT (final step → triggers the reading) ─────────
export function FriendCurrent({ friend, update, onBack, onContinue }) {
  const [current, setCurrent] = useState(friend.polarity || 'yang');
  const curBtn = (id, title, subtitle) => {
    const isActive = current === id;
    return (
      <button key={id} onClick={() => setCurrent(id)} style={{
        flex: '1 1 0', minWidth: 0, padding: '16px 14px', borderRadius: 10,
        border: isActive ? `1px solid ${BRONZE_MID}` : '1px solid #d9d3c8',
        background: isActive ? 'rgba(139,115,85,0.15)' : 'rgba(232,227,216,0.7)',
        fontFamily: "'EB Garamond', serif", color: INK, cursor: 'pointer', textAlign: 'center',
        transition: 'all 250ms ease', boxSizing: 'border-box',
      }}>
        <div style={{ fontSize: 15, fontWeight: 500 }}>{title}</div>
        <div style={{ fontSize: 12, color: INK_LIGHT, marginTop: 4, letterSpacing: 0.5 }}>{subtitle}</div>
      </button>
    );
  };
  const finish = (polarity) => { update({ polarity }); onContinue(polarity); };
  return (
    <OnboardingShell
      eyebrow="Their birth · 5 of 5"
      progressValue={6.5 / 7}
      question="Which current moves through them?"
      subtitle={<>“A quiet follow-up — this sets the direction of<br />their Life Chapters.”</>}
      canContinue={current !== null}
      continueLabel="See the reading"
      onBack={onBack}
      onContinue={() => finish(current)}
    >
      <div style={{ padding: '0 2px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          {curBtn('yang', 'Forward / Yang', '↑ Outward')}
          {curBtn('yin', 'Inward / Yin', '↓ Receptive')}
        </div>
        <div style={{ marginTop: 4, padding: '12px 14px', borderRadius: 10, border: '1px dashed rgba(139,115,85,0.35)', background: 'rgba(139,115,85,0.05)', fontFamily: "'EB Garamond', serif", fontSize: 12.5, color: INK_SOFT, lineHeight: 1.55, textAlign: 'center' }}>
          Either choice is structural only — we use it<br />to read 大运, not to name them.
        </div>
        <div onClick={() => finish('yang')} style={{ textAlign: 'center', fontFamily: "'EB Garamond', serif", fontSize: 13.5, color: INK_LIGHT, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3, marginTop: 2 }}>
          I’m not sure →
        </div>
      </div>
    </OnboardingShell>
  );
}
