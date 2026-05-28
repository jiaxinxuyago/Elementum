// ===================================================================
// ELEMENTUM · CompatScreen  (DOC5 §13 — Friends / Compatibility V2)
// ===================================================================
// Three phases:
//   intro  — dual-seal visual + "Compare with someone"
//   input  — manual entry (name, birth date, optional hour, energy current)
//   result — element comparison + relationship archetype; Free shows
//            teaser + upgrade, Seeker+ shows % + full reading + share card
//
// The other person's chart is computed live via calculateBaziChart; the
// reading comes from engine/compatibility.js (25 element-pair archetypes).
// ===================================================================

import React, { useState } from 'react';
import { useChart } from '../../../store/chartContext.jsx';
import { useUpgrade } from '../UpgradeModal.jsx';
import { calculateBaziChart } from '../../../engine/calculator.js';
import { computeCompatibility } from '../../../engine/compatibility.js';
import { STEM_CARD_DATA } from '../../../content/archetypeSource.js';
import { ElementMark, Icon } from '../../shared/icons';
import {
  ink, inkSoft, inkLight, bronzeDark, gold, silk, cream,
  paperHair, quietBg, quietBorder, borderLight, cardstockBg,
  pigments, withAlpha,
} from '../../../styles/tokens';

const ELEMENT_TO_PIGMENT = { Metal: 'metal', Wood: 'wood', Fire: 'fire', Earth: 'earth', Water: 'water' };
const archetypeOf = (stem, element) => STEM_CARD_DATA[stem]?.identity?.archetypeName || `${element} Day Master`;

export default function CompatScreen() {
  const { chart, tier } = useChart();
  const { openUpgrade } = useUpgrade();
  const [phase, setPhase] = useState('intro');
  const [form, setForm] = useState({ name: '', year: '', month: '', day: '', hour: '', yang: true });
  const [result, setResult] = useState(null);

  const dmElement = chart?.dayMaster?.element || 'Metal';
  const userPigKey = ELEMENT_TO_PIGMENT[dmElement] || 'metal';
  const userPig = pigments[userPigKey].deep;
  const isSeeker = tier !== 'free';

  const calculate = () => {
    const y = parseInt(form.year, 10), m = parseInt(form.month, 10), d = parseInt(form.day, 10);
    if (!y || !m || !d) return;
    const other = calculateBaziChart({
      year: y, month: m, day: d, hour: form.hour ? parseInt(form.hour, 10) : 12,
      gender: form.yang ? 'male' : 'female', longitude: 120, location: 'Beijing',
    });
    const user = chart?.dayMaster;
    const res = computeCompatibility(
      { stem: user.stem, element: user.element, polarity: user.polarity, archetype: archetypeOf(user.stem, user.element) },
      { stem: other.dayMaster.stem, element: other.dayMaster.element, polarity: other.dayMaster.polarity, archetype: archetypeOf(other.dayMaster.stem, other.dayMaster.element) },
    );
    setResult({ ...res, name: form.name.trim() || 'Them' });
    setPhase('result');
  };

  // ── INTRO ─────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <main style={{ minHeight: '100%', padding: '54px 22px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 38, fontWeight: 400, color: ink, margin: '0 0 10px' }}>Friends</h1>
        <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 15, lineHeight: 1.6, color: inkSoft, maxWidth: 300, margin: '0 0 32px' }}>
          Compare your energy with friends, family, or partners.
        </p>
        <DualSeal pigKey={userPigKey} pig={userPig} />
        <button type="button" onClick={() => setPhase('input')} style={primaryBtn}>Compare with someone</button>
        <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 12, color: inkLight, marginTop: 18 }}>
          {isSeeker ? 'Seeker: unlimited comparisons' : 'Free: 1 comparison · Seeker: unlimited'}
        </div>
      </main>
    );
  }

  // ── INPUT ─────────────────────────────────────────────────────
  if (phase === 'input') {
    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
    return (
      <main style={{ minHeight: '100%', padding: '54px 22px 24px' }}>
        <BackLink onBack={() => setPhase('intro')} />
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 30, fontWeight: 400, color: ink, margin: '0 0 18px' }}>Who are you comparing?</h1>
        <Field label="Name"><input value={form.name} onChange={set('name')} placeholder="A name to label the result" style={inputStyle} /></Field>
        <Field label="Birth date">
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={form.year} onChange={set('year')} placeholder="YYYY" inputMode="numeric" style={{ ...inputStyle, flex: 1.4 }} />
            <input value={form.month} onChange={set('month')} placeholder="MM" inputMode="numeric" style={{ ...inputStyle, flex: 1 }} />
            <input value={form.day} onChange={set('day')} placeholder="DD" inputMode="numeric" style={{ ...inputStyle, flex: 1 }} />
          </div>
        </Field>
        <Field label="Birth hour (optional)"><input value={form.hour} onChange={set('hour')} placeholder="0–23" inputMode="numeric" style={inputStyle} /></Field>
        <Field label="Energy current">
          <div style={{ display: 'flex', gap: 8 }}>
            {[{ k: true, t: 'Forward / Yang' }, { k: false, t: 'Inward / Yin' }].map((o) => (
              <button key={String(o.k)} type="button" onClick={() => setForm((f) => ({ ...f, yang: o.k }))} style={{
                flex: 1, appearance: 'none', cursor: 'pointer', padding: '10px', borderRadius: 12,
                fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13,
                border: `1px solid ${form.yang === o.k ? withAlpha(userPig, '40') : paperHair}`,
                background: form.yang === o.k ? withAlpha(pigments[userPigKey].base, '10') : 'transparent',
                color: form.yang === o.k ? userPig : inkLight,
              }}>{o.t}</button>
            ))}
          </div>
        </Field>
        <button type="button" onClick={calculate} disabled={!form.year || !form.month || !form.day}
          style={{ ...primaryBtn, marginTop: 8, opacity: (form.year && form.month && form.day) ? 1 : 0.5 }}>
          Calculate Compatibility →
        </button>
      </main>
    );
  }

  // ── RESULT ────────────────────────────────────────────────────
  const r = result;
  const otherPigKey = ELEMENT_TO_PIGMENT[r.other.element] || 'metal';
  return (
    <main style={{ minHeight: '100%', padding: '54px 22px 24px' }}>
      <BackLink onBack={() => setPhase('intro')} label="Friends" />

      {/* Element comparison grid */}
      <div style={{ display: 'flex', alignItems: 'stretch', gap: 10, marginBottom: 18 }}>
        <PersonCell label="You" stem={r.user.stem} element={r.user.element} sub={r.user.label} archetype={r.user.archetype} pigKey={userPigKey} />
        <div style={{ alignSelf: 'center', fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, color: inkLight }}>×</div>
        <PersonCell label={r.name} stem={r.other.stem} element={r.other.element} sub={r.other.label} archetype={r.other.archetype} pigKey={otherPigKey} />
      </div>

      {/* Relationship archetype */}
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: bronzeDark, fontWeight: 500, marginBottom: 4 }}>
          {r.user.element} meets {r.other.element}
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 400, color: ink }}>“{r.archetype}”</div>
      </div>

      {isSeeker ? (
        <>
          {/* Percentage */}
          <div style={{ textAlign: 'center', marginBottom: 18 }}>
            <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 64, fontWeight: 400, color: ink, lineHeight: 1 }}>{r.score}</span>
            <span style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 16, color: inkLight }}>% Compatible</span>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 19, fontStyle: 'italic', color: inkSoft, marginTop: 4 }}>{r.headline}</div>
          </div>
          {/* Full reading */}
          <section style={{ background: cardstockBg, border: `1px solid ${paperHair}`, borderRadius: 16, padding: '18px', marginBottom: 14 }}>
            <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 15, lineHeight: 1.75, color: inkSoft, margin: 0 }}>{r.reading}</p>
          </section>
          {/* Share card */}
          <div style={{ background: ink, borderRadius: 16, padding: '20px', textAlign: 'center', marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, marginBottom: 12, color: silk }}>
              <ElementMark element={userPigKey} size={28} />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: 'rgba(248,246,240,0.6)' }}>×</span>
              <ElementMark element={otherPigKey} size={28} />
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, color: silk }}>
              We’re {r.score}% compatible — {r.user.element} meets {r.other.element}
            </div>
            <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(248,246,240,0.4)', marginTop: 10 }}>Elementum</div>
          </div>
        </>
      ) : (
        <>
          {/* Free teaser */}
          <section style={{ background: cardstockBg, border: `1px solid ${paperHair}`, borderRadius: 16, padding: '18px', marginBottom: 14 }}>
            <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 15, lineHeight: 1.7, color: inkSoft, margin: 0 }}>{r.teaser}</p>
          </section>
          <button type="button" onClick={() => openUpgrade('the full relationship reading')} style={{
            width: '100%', padding: '14px', borderRadius: 999, border: `1px solid ${withAlpha(gold, '40')}`,
            background: withAlpha(gold, '10'), color: bronzeDark, cursor: 'pointer',
            fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <Icon id="ico-lock" size={14} color={bronzeDark} /> Unlock the full reading with Seeker
          </button>
        </>
      )}

      <button type="button" onClick={() => { setForm({ name: '', year: '', month: '', day: '', hour: '', yang: true }); setPhase('input'); }} style={{
        display: 'block', margin: '16px auto 0', appearance: 'none', background: 'transparent', border: 'none',
        color: inkLight, cursor: 'pointer', fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13,
      }}>Compare someone else →</button>
    </main>
  );
}

// ── pieces ────────────────────────────────────────────────────
const primaryBtn = {
  appearance: 'none', cursor: 'pointer', border: 'none', borderRadius: 12, background: bronzeDark, color: silk,
  padding: '13px 24px', width: '100%', fontFamily: "'EB Garamond', Georgia, serif", fontSize: 15, fontWeight: 500, letterSpacing: 0.5,
};
const inputStyle = {
  width: '100%', boxSizing: 'border-box', padding: '11px 14px', borderRadius: 12,
  border: `1px solid ${paperHair}`, background: cardstockBg, color: ink,
  fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14,
};

function BackLink({ onBack, label = 'Back' }) {
  return (
    <button type="button" onClick={onBack} style={{
      appearance: 'none', background: 'transparent', border: 'none', color: inkLight, cursor: 'pointer',
      padding: 0, marginBottom: 12, display: 'inline-flex', alignItems: 'center', gap: 6,
      fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13,
    }}><Icon id="ico-chev-l" size={15} color={inkLight} /> {label}</button>
  );
}
function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: bronzeDark, fontWeight: 500, marginBottom: 8 }}>{label}</div>
      {children}
    </div>
  );
}
function PersonCell({ label, stem, element, sub, archetype, pigKey }) {
  const pig = pigments[pigKey].deep;
  return (
    <div style={{ flex: 1, background: withAlpha(pigments[pigKey].base, '10'), border: `1px solid ${withAlpha(pigments[pigKey].base, '40')}`, borderRadius: 16, padding: '14px 10px', textAlign: 'center' }}>
      <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 9.5, letterSpacing: 1.5, textTransform: 'uppercase', color: inkLight, marginBottom: 8 }}>{label}</div>
      <div style={{ width: 48, height: 48, borderRadius: 12, margin: '0 auto 8px', background: withAlpha(pigments[pigKey].base, '1A'), display: 'flex', alignItems: 'center', justifyContent: 'center', color: pig }}>
        <ElementMark element={pigKey} size={26} />
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, justifyContent: 'center' }}>
        <span style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 18, color: pig }}>{stem}</span>
        <span style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 11, color: inkLight }}>{sub}</span>
      </div>
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, color: ink, marginTop: 2 }}>{archetype}</div>
    </div>
  );
}
function DualSeal({ pigKey, pig }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
      <div style={{ width: 80, height: 80, borderRadius: 999, border: `2px solid ${pig}`, background: withAlpha(pigments[pigKey].base, '10'), display: 'flex', alignItems: 'center', justifyContent: 'center', color: pig }}>
        <ElementMark element={pigKey} size={42} />
      </div>
      <div style={{ width: 40, height: 1.5, background: `linear-gradient(90deg, ${pig}, ${paperHair})`, animation: 'compatPulse 2s ease-in-out infinite' }} />
      <style>{`@keyframes compatPulse { 0%,100% { opacity: 0.4; } 50% { opacity: 0.9; } }`}</style>
      <div style={{ width: 80, height: 80, borderRadius: 999, border: `2px dashed ${paperHair}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: inkLight }}>
        <span style={{ fontSize: 26, lineHeight: 1 }}>+</span>
      </div>
    </div>
  );
}
