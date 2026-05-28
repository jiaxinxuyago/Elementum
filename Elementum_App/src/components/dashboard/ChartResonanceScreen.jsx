// ===================================================================
// ELEMENTUM · ChartResonanceScreen  (DOC5 §11/§22 — hour discovery)
// ===================================================================
// A short portrait-matching exercise that narrows the likely 时辰 from
// 12 → a top candidate by tag-resonance, then applies it to the chart
// (recompute to 4 pillars) with a confidence indicator:
//   High → exact hour, no mark · Moderate/Approximate → hour stem ~
//   + "Based on chart resonance" note in Profile.
// Entry: Profile "Discover your birth hour →" (unknown-hour charts).
// ===================================================================

import React, { useState } from 'react';
import {
  useChart, resolveLongitudeForCalc, resolveLocationName, resolveGenderForCalc,
} from '../../store/chartContext.jsx';
import { calculateBaziChart } from '../../engine/calculator.js';
import { Icon } from '../shared/icons';
import {
  ink, inkSoft, inkLight, bronzeDark, gold, silk,
  paperHair, cardstockBg, withAlpha,
} from '../../styles/tokens';

// 12 时辰 — branch · animal · clock window · representative hour · tags.
const HOURS = [
  { br: '子', animal: 'Rat',     win: '11pm–1am', h: 0,  tags: ['night', 'still', 'inward'] },
  { br: '丑', animal: 'Ox',      win: '1–3am',    h: 2,  tags: ['night', 'patient', 'enduring'] },
  { br: '寅', animal: 'Tiger',   win: '3–5am',    h: 4,  tags: ['predawn', 'bold', 'pioneering'] },
  { br: '卯', animal: 'Rabbit',  win: '5–7am',    h: 6,  tags: ['dawn', 'gentle', 'fresh'] },
  { br: '辰', animal: 'Dragon',  win: '7–9am',    h: 8,  tags: ['morning', 'ambitious', 'expansive'] },
  { br: '巳', animal: 'Snake',   win: '9–11am',   h: 10, tags: ['morning', 'perceptive', 'strategic'] },
  { br: '午', animal: 'Horse',   win: '11am–1pm', h: 12, tags: ['midday', 'radiant', 'outward'] },
  { br: '未', animal: 'Goat',    win: '1–3pm',    h: 14, tags: ['afternoon', 'warm', 'accommodating'] },
  { br: '申', animal: 'Monkey',  win: '3–5pm',    h: 16, tags: ['afternoon', 'clever', 'inventive'] },
  { br: '酉', animal: 'Rooster', win: '5–7pm',    h: 18, tags: ['dusk', 'precise', 'exacting'] },
  { br: '戌', animal: 'Dog',     win: '7–9pm',    h: 20, tags: ['evening', 'loyal', 'guarded'] },
  { br: '亥', animal: 'Pig',     win: '9–11pm',   h: 22, tags: ['evening', 'generous', 'easeful'] },
];

// 3 rounds of resonance prompts; each option carries tags that score HOURS.
const ROUNDS = [
  { q: 'When does your energy naturally rise?', opts: [
    { t: 'Before the world wakes — in stillness', tags: ['night', 'predawn', 'still'] },
    { t: 'As the day begins — fresh and climbing', tags: ['dawn', 'morning', 'fresh'] },
    { t: 'At the height of day — full and bright', tags: ['midday', 'radiant', 'outward'] },
    { t: 'As things wind down — in the quiet after', tags: ['dusk', 'evening', 'still'] },
  ] },
  { q: 'How do you meet a new situation?', opts: [
    { t: 'I watch and read it first', tags: ['perceptive', 'strategic', 'guarded'] },
    { t: 'I move in boldly', tags: ['bold', 'pioneering', 'ambitious', 'radiant'] },
    { t: 'I find the gentle way in', tags: ['gentle', 'warm', 'accommodating', 'easeful'] },
    { t: 'I look for the clever angle', tags: ['clever', 'inventive', 'precise', 'exacting'] },
  ] },
  { q: 'What do people most rely on you for?', opts: [
    { t: 'Steadiness', tags: ['patient', 'enduring', 'loyal'] },
    { t: 'Vision', tags: ['pioneering', 'ambitious', 'expansive'] },
    { t: 'Warmth', tags: ['warm', 'generous', 'easeful'] },
    { t: 'Precision', tags: ['precise', 'exacting', 'strategic', 'perceptive'] },
  ] },
];

function resolve(picks) {
  const chosen = picks.flatMap((i, r) => ROUNDS[r].opts[i]?.tags || []);
  const scored = HOURS.map((hr) => ({ hr, score: hr.tags.filter((t) => chosen.includes(t)).length }));
  scored.sort((a, b) => b.score - a.score);
  const margin = scored[0].score - (scored[1]?.score ?? 0);
  const confidence = margin >= 2 ? 'high' : margin === 1 ? 'moderate' : 'approximate';
  return { top: scored[0].hr, runners: scored.slice(0, 3).map((s) => s.hr), confidence };
}

export default function ChartResonanceScreen({ onBack, onDone }) {
  const { birthData, updateBirthData, setChart } = useChart();
  const [phase, setPhase] = useState('intro'); // intro | rounds | result
  const [round, setRound] = useState(0);
  const [picks, setPicks] = useState([]);
  const [result, setResult] = useState(null);

  const pick = (i) => {
    const next = [...picks, i];
    setPicks(next);
    if (round + 1 < ROUNDS.length) { setRound(round + 1); }
    else { setResult(resolve(next)); setPhase('result'); }
  };

  const apply = () => {
    const top = result.top;
    const clean = { ...birthData, hour: top.h, hourUnknown: false, hourWindow: null, hourResonance: result.confidence };
    updateBirthData({ hour: top.h, hourUnknown: false, hourWindow: null, hourResonance: result.confidence });
    try {
      const chart = calculateBaziChart({
        year: clean.year, month: clean.month, day: clean.day, hour: top.h,
        gender: resolveGenderForCalc(clean), longitude: resolveLongitudeForCalc(clean), location: resolveLocationName(clean),
      });
      setChart(chart);
    } catch (e) { /* ErrorBoundary covers */ }
    onDone?.();
  };

  // ── intro ──
  if (phase === 'intro') {
    return (
      <Shell onBack={onBack}>
        <Eyebrow>Chart Resonance · 时 辰 感 应</Eyebrow>
        <Title>Discover your birth hour</Title>
        <p style={pStyle}>
          Traditional readers recover an unknown birth hour by resonance —
          matching a person to the temperament of each 时辰 (two-hour period).
          A few honest answers narrow twelve possibilities to one. Take about
          two minutes.
        </p>
        <button type="button" onClick={() => setPhase('rounds')} style={cta}>Begin →</button>
      </Shell>
    );
  }

  // ── rounds ──
  if (phase === 'rounds') {
    const r = ROUNDS[round];
    return (
      <Shell onBack={() => round === 0 ? setPhase('intro') : (setRound(round - 1), setPicks(picks.slice(0, -1)))}>
        <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 11, color: inkLight, letterSpacing: 1, marginBottom: 14 }}>
          {round + 1} of {ROUNDS.length}
        </div>
        <Title>{r.q}</Title>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
          {r.opts.map((o, i) => (
            <button key={i} type="button" onClick={() => pick(i)} style={{
              appearance: 'none', cursor: 'pointer', textAlign: 'left', width: '100%',
              background: cardstockBg, border: `1px solid ${paperHair}`, borderRadius: 14, padding: '16px 18px',
              fontFamily: "'EB Garamond', Georgia, serif", fontSize: 15.5, lineHeight: 1.4, color: ink,
            }}>{o.t}</button>
          ))}
        </div>
      </Shell>
    );
  }

  // ── result ──
  const top = result.top;
  const confNote = {
    high: 'A clear resonance — your hour reads with confidence.',
    moderate: 'A strong resonance, with a close second. Your hour stem will carry a ~ until confirmed.',
    approximate: 'Two periods resonate nearly equally. We’ll use the closest, marked ~ as approximate.',
  }[result.confidence];

  return (
    <Shell onBack={onBack}>
      <Eyebrow>Your hour resonates with</Eyebrow>
      <div style={{ textAlign: 'center', margin: '8px 0 16px' }}>
        <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 56, color: bronzeDark, lineHeight: 1 }}>{top.br}</div>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, color: ink, marginTop: 6 }}>
          The {top.animal} Hour
        </div>
        <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13, color: inkLight, marginTop: 2 }}>{top.win}</div>
      </div>
      <section style={{ background: cardstockBg, border: `1px solid ${paperHair}`, borderRadius: 16, padding: '16px 18px', marginBottom: 12 }}>
        <p style={{ ...pStyle, margin: 0 }}>{confNote}</p>
      </section>
      {/* runner-up candidates */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 18 }}>
        {result.runners.slice(1).map((h) => (
          <span key={h.br} style={{
            fontFamily: "'EB Garamond', Georgia, serif", fontSize: 11.5, color: inkLight,
            border: `1px solid ${paperHair}`, borderRadius: 999, padding: '4px 10px',
          }}>also resonant · {h.br} {h.animal}</span>
        ))}
      </div>
      <button type="button" onClick={apply} style={cta}>
        Add this hour to my chart {result.confidence !== 'high' ? '(~)' : ''} →
      </button>
    </Shell>
  );
}

// ── layout pieces ──
function Shell({ onBack, children }) {
  return (
    <div style={{ minHeight: '100%', background: silk, padding: '54px 22px 28px', display: 'flex', flexDirection: 'column' }}>
      <button type="button" onClick={onBack} style={{
        appearance: 'none', background: 'transparent', border: 'none', color: inkLight, cursor: 'pointer',
        padding: 0, marginBottom: 18, display: 'inline-flex', alignItems: 'center', gap: 6,
        fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13,
      }}><Icon id="ico-chev-l" size={15} color={inkLight} /> Back</button>
      {children}
    </div>
  );
}
const Eyebrow = ({ children }) => <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: bronzeDark, fontWeight: 500, marginBottom: 6, textAlign: 'center' }}>{children}</div>;
const Title = ({ children }) => <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 400, lineHeight: 1.2, color: ink, margin: 0, textAlign: 'center' }}>{children}</h1>;
const pStyle = { fontFamily: "'EB Garamond', Georgia, serif", fontSize: 15, lineHeight: 1.7, color: inkSoft, margin: '16px 0 22px', textAlign: 'center' };
const cta = { appearance: 'none', cursor: 'pointer', border: 'none', borderRadius: 12, background: bronzeDark, color: silk, padding: '14px 24px', width: '100%', marginTop: 'auto', fontFamily: "'EB Garamond', Georgia, serif", fontSize: 15, fontWeight: 500, letterSpacing: 0.4 };
