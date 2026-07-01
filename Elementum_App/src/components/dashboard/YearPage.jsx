// ===================================================================
// ELEMENTUM · YearPage  (hub → destination, Today tab drill-down)
// ===================================================================
// Wireframe: Today Hub · Year (Direction 2). Hero + Four Quarters bars
// (from yearEnergy) + Element Balance (5-bar) + The Year's Counsel.
// ===================================================================

import React from 'react';
import { useChart } from '../../store/chartContext.jsx';
import { yearEnergy, energyContext } from '../../engine/index.js';
import { Icon } from '../shared/icons';
import { SceneHero } from './VisualTile.jsx';
import { elementArt } from '../../styles/backgrounds.js';
import {
  ink, inkSoft, inkLight, bronzeDark, gold,
  paperHair, cardstockBg, pigments, withAlpha,
} from '../../styles/tokens';

const YEAR_TITLE = {
  Metal: 'A year to sharpen',
  Wood:  'A year to expand',
  Fire:  'A year to be seen',
  Earth: 'A year to build',
  Water: 'A year to listen',
};

// Seasonal element overlay used when monthly elements aren't authored.
// Loose Chinese seasonal mapping: spring/summer/late-summer/autumn/winter.
const SEASON_OF_MONTH = [
  'Water','Wood','Wood','Wood','Fire','Fire',
  'Earth','Earth','Metal','Metal','Water','Water',
];

export default function YearPage({ onBack }) {
  const { chart } = useChart();
  const fy = chart?.currentFlowYear;
  const year = fy?.year || new Date().getFullYear();
  const dmElement = chart?.dayMaster?.element || 'Metal';
  const yearEl = fy?.stemElement || dmElement;
  const ctx = energyContext(chart) || { catalyst: '', resistance: '', dmElement };

  const stemBranch = fy?.stem ? `${fy.stem}${fy.branch || ''}` : null;
  const title = YEAR_TITLE[yearEl] || 'A year';
  const subtitle = yearEl === ctx.catalyst
    ? `${yearEl} lifts your ${dmElement}`
    : yearEl === ctx.resistance
      ? `${yearEl} tests your ${dmElement}`
      : `${yearEl} alongside your ${dmElement}`;

  // ── Four Quarters — aggregate yearEnergy 12-month series.
  const series = yearEnergy(chart) || [];
  const quarters = React.useMemo(() => {
    if (!series.length) return [70, 50, 85, 40];
    const q = [0, 0, 0, 0];
    const n = [0, 0, 0, 0];
    series.forEach((m, i) => {
      const qi = Math.floor(i / 3);
      q[qi] += (m.score || 50);
      n[qi] += 1;
    });
    return q.map((s, i) => Math.round(s / Math.max(1, n[i])));
  }, [series]);

  // ── Element Balance — sum yearEnergy scores by month's seasonal element.
  const elementBalance = React.useMemo(() => {
    const buckets = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };
    const counts  = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };
    series.forEach((m, i) => {
      const el = SEASON_OF_MONTH[i] || 'Earth';
      buckets[el] += (m.score || 50);
      counts[el] += 1;
    });
    // Year's element gets a +20% lift (visualises dominance).
    const out = {};
    Object.keys(buckets).forEach((el) => {
      const avg = counts[el] ? buckets[el] / counts[el] : 50;
      out[el] = Math.min(100, Math.round(avg + (el === yearEl ? 20 : 0)));
    });
    return out;
  }, [series, yearEl]);

  const counsel = yearEl === ctx.catalyst
    ? `Visibility favours you — let work be seen. Guard against burning bright too early.`
    : yearEl === ctx.resistance
      ? `The current runs against you — a year to refine, protect reserves, let pressure sharpen rather than scatter you.`
      : `Neither strongly with nor against you — a year that rewards steadiness. Build quietly; foundations laid now hold.`;

  return (
    <main style={{ minHeight: '100%', padding: '54px 18px 24px' }}>
      <BackBar label="Readings · Year" onBack={onBack} />

      <div style={{ marginTop: 6 }}>
        <SceneHero
          pigment={yearEl}
          artSrc={elementArt(yearEl)}
          eyebrow={`${year}${stemBranch ? ` · ${stemBranch}` : ''} · ${yearEl} Year`}
          title={title}
          subtitle={subtitle}
          height={158}
          radius={16}
        />
      </div>

      {/* Four Quarters */}
      <SectionCard label="Four Quarters" style={{ marginTop: 10 }}>
        <Bars
          data={quarters}
          labels={['Q1','Q2','Q3','Q4']}
          sublabels={['ignite','steady','harvest','close']}
        />
      </SectionCard>

      {/* Element Balance · this year */}
      <SectionCard label="Element Balance · this year" style={{ marginTop: 10 }}>
        <ElementBars balance={elementBalance} highlight={yearEl} />
      </SectionCard>

      {/* The Year's Counsel */}
      <SectionCard label="The Year's Counsel" style={{ marginTop: 10 }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 14.5, lineHeight: 1.55, color: ink, margin: 0,
        }}>{counsel}</p>
      </SectionCard>
    </main>
  );
}

function Bars({ data, labels, sublabels }) {
  const max = Math.max(...data, 1);
  return (
    <>
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 70 }}>
        {data.map((v, i) => (
          <div key={i} style={{
            flex: 1,
            height: `${(v / 100) * 100}%`,
            background: v === max ? gold : withAlpha(pigments.metal.base, '40'),
            borderRadius: '3px 3px 0 0', minHeight: 3,
          }} />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, paddingTop: 6 }}>
        {labels.map((l, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', fontFamily: "'EB Garamond', Georgia, serif" }}>
            <div style={{ fontSize: 10, color: ink, fontWeight: 600 }}>{l}</div>
            {sublabels && (
              <div style={{ fontSize: 9, color: inkLight, marginTop: 1, letterSpacing: 0.5 }}>
                {sublabels[i]}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function ElementBars({ balance, highlight }) {
  const order = ['Fire','Earth','Metal','Water','Wood'];
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {order.map((el) => {
        const v = balance[el] || 50;
        const isHi = el === highlight;
        const pig = pigments[el.toLowerCase()];
        return (
          <div key={el} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: '100%', height: 60,
              background: cardstockBg, border: `1px solid ${paperHair}`,
              borderRadius: 3, display: 'flex', alignItems: 'flex-end', overflow: 'hidden',
            }}>
              <div style={{
                width: '100%',
                height: `${v}%`,
                background: isHi ? pig.deep : withAlpha(pig.base, '40'),
              }} />
            </div>
            <span style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 9, letterSpacing: 1.2, textTransform: 'uppercase',
              color: isHi ? pig.deep : inkLight, fontWeight: isHi ? 600 : 400,
            }}>{el}</span>
          </div>
        );
      })}
    </div>
  );
}

function SectionCard({ label, children, style }) {
  return (
    <section style={{
      background: cardstockBg, border: `1px solid ${paperHair}`,
      borderRadius: 12, padding: 12, ...(style || {}),
    }}>
      <div style={{
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
        color: bronzeDark, fontWeight: 500, marginBottom: 10,
      }}>{label}</div>
      {children}
    </section>
  );
}

function BackBar({ label, onBack }) {
  return (
    <button type="button" onClick={onBack}
      style={{
        appearance: 'none', background: 'transparent', border: 'none',
        padding: '4px 0 4px', display: 'inline-flex', alignItems: 'center', gap: 6,
        cursor: 'pointer', color: inkLight,
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase',
      }}>
      <Icon id="ico-chev-l" size={14} color={inkLight} />
      {label}
    </button>
  );
}
