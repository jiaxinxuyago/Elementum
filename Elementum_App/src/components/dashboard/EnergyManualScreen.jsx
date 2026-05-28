// ===================================================================
// ELEMENTUM · EnergyManualScreen  (DOC5 §12 Card 2 — Energy Manual)
// ===================================================================
// Seeker living document across 5 life domains. First use shows a short
// setup (domains + focus → Generate); after that, domain tabs each show
// 3 sections: Natal reading · Dominant-energy lens · Current chapter.
//
// Content sources: archetype identity (Natal), TG_CARD_DATA.domain-
// Signatures (Dominant lens — real authored text where it exists), and
// templated decade/year text (Current chapter). Setup persists in
// localStorage. Advisor sees an "Ask your consultant" link per domain.
// ===================================================================

import React, { useState } from 'react';
import { useChart } from '../../store/chartContext.jsx';
import { STEM_CARD_DATA, TG_CARD_DATA } from '../../content/archetypeSource.js';
import { Icon } from '../shared/icons';
import {
  ink, inkSoft, inkLight, bronzeDark, silk,
  paperHair, cardstockBg, pigments, withAlpha,
} from '../../styles/tokens';

const SETUP_KEY = 'elementum_manual_setup_v1';
const DOMAINS = [
  { key: 'career',        label: 'Career',        sigKey: 'career',        pig: 'metal' },
  { key: 'relationships', label: 'Relationships', sigKey: 'relationships', pig: 'fire' },
  { key: 'wealth',        label: 'Wealth',        sigKey: 'wealth',        pig: 'earth' },
  { key: 'health',        label: 'Health',        sigKey: 'health',        pig: 'wood' },
  { key: 'purpose',       label: 'Purpose',       sigKey: null,            pig: 'water' },
];

function readSetup() {
  try { return JSON.parse(localStorage.getItem(SETUP_KEY) || 'null'); } catch { return null; }
}

export default function EnergyManualScreen({ onBack, onOpenConsultant }) {
  const { chart, tier } = useChart();
  const [setup, setSetup] = useState(readSetup);
  const [picked, setPicked] = useState(['career', 'relationships']);
  const [focus, setFocus] = useState('');
  const [domain, setDomain] = useState('career');

  const stem = chart?.dayMaster?.stem || '庚';
  const element = chart?.dayMaster?.element || 'Metal';
  const data = STEM_CARD_DATA[stem] || {};
  const archetype = data.identity?.archetypeName || `${element} Day Master`;
  const isAdvisor = tier === 'advisor';

  // Primary Ten God (month stem, else first non-self) for the "dominant lens".
  const tg = chart?.tenGods || {};
  const primaryZh = tg.monthStem && tg.monthStem.family !== 'self'
    ? tg.monthStem.zh
    : [tg.yearStem, tg.hourStem, tg.monthStem].find((t) => t && t.family !== 'self')?.zh;
  const tgCard = primaryZh ? TG_CARD_DATA[primaryZh] : null;

  const decade = (chart?.luckPillars || []).find((d) => d.isCurrent);
  const fy = chart?.currentFlowYear;

  const generate = () => {
    const s = { domains: picked, focus, at: new Date().toISOString().slice(0, 10) };
    try { localStorage.setItem(SETUP_KEY, JSON.stringify(s)); } catch {}
    setSetup(s);
    setDomain(picked[0] || 'career');
  };

  // ── Setup gate ────────────────────────────────────────────────
  if (!setup) {
    return (
      <main style={{ minHeight: '100%', padding: '54px 20px 24px' }}>
        <BackLink onBack={onBack} />
        <Header sub="Energy Manual · 能 量 手 册" title="Set up your Manual" />
        <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14.5, lineHeight: 1.65, color: inkSoft, margin: '0 0 18px' }}>
          Your Manual is a living reading across the domains that matter most.
          Choose where to focus — it updates on its own as your cycles turn.
        </p>
        <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: bronzeDark, fontWeight: 500, marginBottom: 10 }}>
          Which domains matter most?
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 22 }}>
          {DOMAINS.map((d) => {
            const on = picked.includes(d.key);
            return (
              <button key={d.key} type="button" onClick={() => setPicked((p) => on ? p.filter((x) => x !== d.key) : [...p, d.key])}
                style={{
                  appearance: 'none', cursor: 'pointer', borderRadius: 999, padding: '8px 14px',
                  fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13,
                  border: `1px solid ${on ? withAlpha(pigments[d.pig].base, '40') : paperHair}`,
                  background: on ? withAlpha(pigments[d.pig].base, '10') : 'transparent',
                  color: on ? pigments[d.pig].deep : inkLight,
                }}>{d.label}</button>
            );
          })}
        </div>
        <input value={focus} onChange={(e) => setFocus(e.target.value)} placeholder="Your biggest focus in the next 6 months (optional)"
          style={{
            width: '100%', boxSizing: 'border-box', padding: '12px 14px', borderRadius: 12,
            border: `1px solid ${paperHair}`, background: cardstockBg, marginBottom: 22,
            fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14, color: ink,
          }} />
        <button type="button" onClick={generate} disabled={!picked.length}
          style={{
            appearance: 'none', width: '100%', padding: '14px', borderRadius: 12, border: 'none',
            background: picked.length ? bronzeDark : '#D8D0C0', color: silk, cursor: picked.length ? 'pointer' : 'default',
            fontFamily: "'EB Garamond', Georgia, serif", fontSize: 15, fontWeight: 500, letterSpacing: 0.5,
          }}>Generate my Manual →</button>
      </main>
    );
  }

  // ── Post-setup document ───────────────────────────────────────
  const active = DOMAINS.find((d) => d.key === domain) || DOMAINS[0];
  const pig = pigments[active.pig].deep;
  const sig = active.sigKey && tgCard?.domainSignatures?.[active.sigKey];

  const natal = `As ${archetype}, your ${element} nature shapes ${active.label.toLowerCase()} before any circumstance does — you meet this domain the way you meet everything: ${data.subtitle ? data.subtitle.split('·')[0].trim().toLowerCase() : 'on your own terms'}.`;
  const current = decade && fy
    ? `Right now you are in the ${decade.element} Decade (age ${decade.startAge}–${decade.endAge}), and ${fy.year} runs on ${fy.stemElement}. Together they tilt ${active.label.toLowerCase()} toward ${fy.stemElement === decade.element ? 'a single, reinforced theme' : 'a quiet negotiation between two pulls'} this year.`
    : `Your current decade and year shape how ${active.label.toLowerCase()} unfolds now.`;

  return (
    <main style={{ minHeight: '100%', padding: '54px 20px 24px' }}>
      <BackLink onBack={onBack} />
      <Header sub="Energy Manual · 能 量 手 册" title="Your Manual" />

      {/* Domain tabs */}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 6, marginBottom: 16 }}>
        {DOMAINS.map((d) => {
          const on = d.key === domain; const dpig = pigments[d.pig].deep;
          return (
            <button key={d.key} type="button" onClick={() => setDomain(d.key)} style={{
              appearance: 'none', cursor: 'pointer', flexShrink: 0, borderRadius: 999, padding: '7px 14px',
              fontFamily: "'EB Garamond', Georgia, serif", fontSize: 12.5, letterSpacing: 0.3,
              border: `1px solid ${on ? withAlpha(pigments[d.pig].base, '40') : paperHair}`,
              background: on ? withAlpha(pigments[d.pig].base, '10') : 'transparent',
              color: on ? dpig : inkLight, fontWeight: on ? 600 : 400,
            }}>{d.label}</button>
          );
        })}
      </div>

      <Section pig={pig} label="Natal — your base nature here">{natal}</Section>
      {sig && <Section pig={pig} label="Dominant energy — how it shows up">{sig.text}</Section>}
      <Section pig={pig} label="Current chapter — now">{current}</Section>

      {isAdvisor && (
        <button type="button" onClick={onOpenConsultant} style={{
          appearance: 'none', background: 'transparent', border: 'none', color: bronzeDark, cursor: 'pointer',
          fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13, letterSpacing: 0.3, padding: '6px 0',
          borderBottom: `1px dashed ${paperHair}`, display: 'inline-flex', alignItems: 'center', gap: 5,
        }}>Ask your consultant about this →</button>
      )}
    </main>
  );
}

function BackLink({ onBack }) {
  return (
    <button type="button" onClick={onBack} style={{
      appearance: 'none', background: 'transparent', border: 'none', color: inkLight, cursor: 'pointer',
      padding: 0, marginBottom: 12, display: 'inline-flex', alignItems: 'center', gap: 6,
      fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13,
    }}>
      <Icon id="ico-chev-l" size={15} color={inkLight} /> Guidance
    </button>
  );
}
function Header({ sub, title }) {
  return (
    <header style={{ marginBottom: 18 }}>
      <span style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: bronzeDark, fontWeight: 500 }}>{sub}</span>
      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 34, fontWeight: 400, lineHeight: 1.1, color: ink, margin: '6px 0 0' }}>{title}</h1>
    </header>
  );
}
function Section({ pig, label, children }) {
  return (
    <section style={{ background: cardstockBg, border: `1px solid ${paperHair}`, borderRadius: 16, padding: '18px', marginBottom: 14 }}>
      <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: withAlpha(pig, 'CC'), fontWeight: 500, marginBottom: 10 }}>{label}</div>
      <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 15, lineHeight: 1.75, color: inkSoft, margin: 0 }}>{children}</p>
    </section>
  );
}
