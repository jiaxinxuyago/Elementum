// ===================================================================
// ELEMENTUM · EnergyBlueprint (shared component)
//
// Single source of truth for the 5-element composition chart that
// appears on BOTH the Reveal screen (Section 2) and the Energy Map
// dashboard. Same component, same data, same visual treatment —
// no parallel implementations.
//
// Visual: matches the polished V1 prototype at
// Design/exports/reveal-and-energymap/reveal-and-energymap.bundle.html.
//   - 5 rows sorted by count descending (DM-element row leads when tied)
//   - Per row: 22px element icon · 60px regular name · 8-cell segmented bar · count
//     (element-name was italic under v1 §3.5.E; reverted to regular per DOC5 §AM.10)
//   - Cells use `repeat(8, 1fr)` for exactly even widths · gap 3 · no midpoint gap
//   - Filled cells in the element pigment, empty cells in BORDER_LIGHT (#E5DFD1)
//   - Element icon muted when count === 0
// ===================================================================

import {
  INK_SOFT, INK_LIGHT,
  BORDER_LIGHT,
  PIG_METAL, PIG_WOOD, PIG_WATER, PIG_FIRE, PIG_EARTH,
} from '../../styles/tokens.jsx';
// Element marks now come from the shared icon library (Design/icons.svg via /icons.svg).
// Single source of truth — no more inline SVG drift between component code and the legends.
import { ElementMark } from './icons';

const PIG = {
  Metal: PIG_METAL,
  Wood:  PIG_WOOD,
  Water: PIG_WATER,
  Fire:  PIG_FIRE,
  Earth: PIG_EARTH,
};

const EL_KEY = {
  Metal: 'metal',
  Wood:  'wood',
  Water: 'water',
  Fire:  'fire',
  Earth: 'earth',
};

/**
 * Compute the 5-row composition list from a chart.
 * Sorted descending by count. Each row carries the english label,
 * lowercase key (for ElementSign), pigment color, and count.
 */
export function buildComposition(chart) {
  if (!chart?.elements) return [];
  const order = ['Metal', 'Wood', 'Water', 'Fire', 'Earth'];
  return order
    .map((el) => ({
      key: EL_KEY[el],
      en: el,
      color: PIG[el],
      n: chart.elements[el]?.count ?? 0,
    }))
    .sort((a, b) => b.n - a.n);
}

/**
 * EnergyBlueprint — the shared 5-row composition chart.
 *
 * Props:
 *   chart    — the chart object from useChart() / calculator.js
 *   compact  — if true, slightly tighter row gap (used in dashboard cards)
 *   total    — denominator for the bar (default: 8)
 */
export default function EnergyBlueprint({ chart, compact = false, total = 8 }) {
  const composition = buildComposition(chart);
  if (composition.length === 0) {
    return (
      <div style={{
        // DOC5 §AM.10 — descriptive paragraph is regular (was italic 13 under v1 §3.5.E)
        fontSize: 13, color: INK_LIGHT,
        textAlign: 'center', padding: 20,
      }}>
        No chart data — seed a preset to render.
      </div>
    );
  }
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: compact ? 8 : 11,
    }}>
      {composition.map((el) => (
        <BlueprintRow key={el.key} el={el} total={total} />
      ))}
    </div>
  );
}

/**
 * BlueprintRow — single composition row.
 * Grid: 22px icon · 60px element name · 1fr 8-cell bar · 18px count.
 * (element-name was italic under v1 §3.5.E; reverted to regular per DOC5 §AM.10)
 */
export function BlueprintRow({ el, total = 8 }) {
  const empty = el.n === 0;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '22px 60px 1fr 18px',
        gap: 10,
        alignItems: 'center',
      }}
    >
      <ElementMark
        element={el.key}
        size={18}
        color={empty ? INK_LIGHT : el.color}
        style={{ opacity: empty ? 0.32 : 1 }}
      />
      <div style={{
        // DOC5 §AM.10 — element-name label is regular (was italic 14 under v1 §3.5.E)
        fontFamily: "'EB Garamond', serif",
        fontSize: 14,
        color: INK_SOFT,
      }}>
        {el.en}
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${total}, 1fr)`,
        gap: 3,
      }}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              height: 8,
              borderRadius: 1,
              background: i < el.n ? el.color : BORDER_LIGHT,
            }}
          />
        ))}
      </div>
      <div style={{
        fontFamily: "'EB Garamond', serif",
        fontSize: 13,
        color: INK_LIGHT,
        textAlign: 'right',
        fontVariantNumeric: 'tabular-nums',
      }}>
        {el.n}
      </div>
    </div>
  );
}
