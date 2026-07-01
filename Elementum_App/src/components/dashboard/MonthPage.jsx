import PanelCard from '../shared/PanelCard.jsx';
import BackBar from '../shared/BackBar.jsx';
// ===================================================================
// ELEMENTUM · MonthPage  (hub → destination, Today tab drill-down)
// ===================================================================
// Wireframe: Today Hub · Month (Direction 2). Hero + 4-week arc bars +
// Key Dates list + Lean Into / Avoid 2-col grid.
// ===================================================================

import React from 'react';
import { useChart } from '../../store/chartContext.jsx';
import { monthGrid, flowWindows } from '../../engine/index.js';

import { SceneHero } from './VisualTile.jsx';
import { elementArt } from '../../styles/backgrounds.js';
import {
  ink, inkSoft, inkLight, bronzeDark, gold,
  paperHair, cardstockBg, pigments, withAlpha,
} from '../../styles/tokens';

const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

// Short element-keyed phrases for hero title.
const MONTH_TITLE = {
  Metal: 'A month to refine',
  Wood:  'A month to initiate',
  Fire:  'A month to show',
  Earth: 'A month to consolidate',
  Water: 'A month to reflect',
};
const MONTH_LEAN = {
  Metal: ['Refining work in progress', 'Cutting away the inessential'],
  Wood:  ['Starting what was waiting', 'Reaching wider'],
  Fire:  ['Letting work be seen', 'Bold moves with witnesses'],
  Earth: ['Finishing, not starting', 'Consolidating gains'],
  Water: ['Listening before deciding', 'Quiet study'],
};
const MONTH_AVOID = {
  Metal: ['Adding more inputs', 'Softening necessary edges'],
  Wood:  ['Closing things off too early', 'Cramped scope'],
  Fire:  ['Performing without substance', 'Burning past steady'],
  Earth: ['New commitments', 'Scattering focus'],
  Water: ['Forcing visibility', 'Premature declarations'],
};

export default function MonthPage({ onBack }) {
  const { chart } = useChart();
  const now = new Date();
  const year = now.getFullYear();
  const monthIdx = now.getMonth();
  const monthName = MONTHS[monthIdx];

  const dmElement = chart?.dayMaster?.element || 'Metal';
  const fm = chart?.currentFlowMonth;
  const monthEl = fm?.stemElement || dmElement;
  const stemBranch = fm?.stem ? `${fm.stem}${fm.branch || ''}` : null;
  const title = MONTH_TITLE[monthEl] || 'A month';

  // ── 4-week arc — bucket the month into 4 (days 1-7 / 8-14 / 15-21 / 22+).
  // Score each bucket as (#high - #low + #total) / scale, normalized to 0–100.
  const weekScores = useWeekScores(year, monthIdx, chart);
  // ── Key dates — first high-flow and first low-flow runs.
  const keyDates = useKeyDates(year, monthIdx, chart);

  return (
    <main style={{ minHeight: '100%', padding: '54px 18px 24px' }}>
      <BackBar label="Readings · Month" onBack={onBack} />

      <div style={{ marginTop: 6 }}>
        <SceneHero
          pigment={monthEl}
          artSrc={elementArt(monthEl)}
          eyebrow={`${monthName} ${year} · ${monthEl} Month`}
          title={title}
          subtitle={stemBranch ? `${stemBranch} · ${monthEl} feeds ${dmElement === monthEl ? 'your nature' : `your ${dmElement.toLowerCase()}`}` : `${monthEl} Month`}
          height={158}
          radius={16}
        />
      </div>

      {/* The Month's Arc — 4 weeks */}
      <PanelCard label="The Month's Arc · 4 weeks" style={{ marginTop: 10 }}>
        <Bars
          data={weekScores}
          labels={['W1', 'W2', 'W3', 'W4']}
          sublabels={['build', 'peak', 'refine', 'rest']}
        />
      </PanelCard>

      {/* Key Dates */}
      <PanelCard label="Key Dates" style={{ marginTop: 10 }}>
        {keyDates.length ? (
          <div>
            {keyDates.map((kd, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'baseline', gap: 12,
                padding: '8px 0',
                borderTop: i === 0 ? 'none' : `1px solid ${paperHair}`,
              }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 14, fontWeight: 600, color: ink, minWidth: 72,
                }}>{kd.label}</span>
                <span style={{
                  fontFamily: "'EB Garamond', Georgia, serif",
                  fontSize: 13, color: inkSoft, lineHeight: 1.4,
                }}>{kd.note}</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 13, color: inkLight, padding: '4px 0',
          }}>No standout dates this month — read by week instead.</div>
        )}
      </PanelCard>

      {/* Lean Into / Avoid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
        <ListCard
          label="Lean Into"
          items={MONTH_LEAN[monthEl] || []}
          color={pigments[monthEl?.toLowerCase()]?.deep || bronzeDark}
          kind="do"
        />
        <ListCard
          label="Avoid"
          items={MONTH_AVOID[monthEl] || []}
          color={bronzeDark}
          kind="warn"
        />
      </div>
    </main>
  );
}

// ───── data helpers ────────────────────────────────────────────────
function useWeekScores(year, monthIdx, chart) {
  return React.useMemo(() => {
    try {
      const { weeks } = monthGrid(year, monthIdx, chart) || { weeks: [] };
      // Flatten to a day list with day# + level.
      const cells = weeks.flat().filter(Boolean);
      const buckets = [[], [], [], []];
      for (const c of cells) {
        const d = c.day;
        const b = d <= 7 ? 0 : d <= 14 ? 1 : d <= 21 ? 2 : 3;
        buckets[b].push(c);
      }
      return buckets.map((bucket) => {
        if (!bucket.length) return 50;
        const hi = bucket.filter((c) => c.level === 'high').length;
        const lo = bucket.filter((c) => c.level === 'low').length;
        // 0–100 score: midline 50 + 8 per high-day, -6 per low-day. Clamped.
        const raw = 50 + hi * 8 - lo * 6;
        return Math.max(20, Math.min(100, raw));
      });
    } catch {
      return [45, 80, 60, 35];   // wireframe seed
    }
  }, [year, monthIdx, chart]);
}

function useKeyDates(year, monthIdx, chart) {
  return React.useMemo(() => {
    try {
      const { high = [], low = [] } = flowWindows(year, monthIdx, chart) || {};
      const out = [];
      if (high.length) {
        const r = high[0];
        out.push({
          label: `${MONTHS[monthIdx].slice(0,3)} ${r.start}${r.end !== r.start ? `–${r.end}` : ''}`,
          note: 'Favorable — launch & commit',
        });
      }
      if (low.length) {
        const r = low[0];
        out.push({
          label: `${MONTHS[monthIdx].slice(0,3)} ${r.start}${r.end !== r.start ? `–${r.end}` : ''}`,
          note: 'Caution — defer decisions',
        });
      }
      return out;
    } catch { return []; }
  }, [year, monthIdx, chart]);
}

// ───── presentation ────────────────────────────────────────────────

function Bars({ data, labels, sublabels }) {
  const max = Math.max(...data, 1);
  return (
    <>
      <div style={{
        display: 'flex', gap: 8, alignItems: 'flex-end',
        height: 70, padding: '0 2px',
      }}>
        {data.map((v, i) => {
          const isPeak = v === max;
          return (
            <div key={i} style={{
              flex: 1,
              height: `${(v / 100) * 100}%`,
              background: isPeak ? gold : withAlpha(pigments.metal.base, '40'),
              borderRadius: '3px 3px 0 0',
              minHeight: 3,
            }} />
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 8, paddingTop: 6 }}>
        {labels.map((l, i) => (
          <div key={i} style={{
            flex: 1, textAlign: 'center',
            fontFamily: "'EB Garamond', Georgia, serif",
          }}>
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

function ListCard({ label, items, kind, color }) {
  return (
    <section style={{
      background: cardstockBg, border: `1px solid ${paperHair}`,
      borderRadius: 12, padding: 12, minHeight: 120,
    }}>
      <div style={{
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
        color: withAlpha(color, 'CC'), fontWeight: 500, marginBottom: 10,
      }}>{label}</div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <Marker kind={kind} color={color} />
            <span style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 13, lineHeight: 1.4, color: inkSoft,
            }}>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Marker({ kind, color }) {
  if (kind === 'warn') return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" style={{ marginTop: 2, flexShrink: 0 }}>
      <path d="M8 2 L15 14 L1 14 Z" fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
      <line x1="8" y1="6.5" x2="8" y2="10" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="8" cy="11.6" r="0.7" fill={color} />
    </svg>
  );
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" style={{ marginTop: 2, flexShrink: 0 }}>
      <rect x="2" y="2" width="12" height="12" rx="3" fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

