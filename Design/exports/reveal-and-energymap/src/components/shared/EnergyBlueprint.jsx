// ===================================================================
// ELEMENTUM · EnergyBlueprint (shared component)
//
// Single source of truth for the 5-element composition chart that
// appears on BOTH the Reveal screen (Section 2) and the Energy Map
// dashboard. Same component, same data, same visual treatment —
// no parallel implementations.
//
// Data contract: takes a `chart` object as produced by engine/calculator.js.
// Reads `chart.elements[ElementName].count` for each of the 5 elements.
// Sorts by count descending (so the user's dominant element leads).
//
// Visual: continuous fill bars (rounded), animated 0 → (count/8)×100%
// over 800ms easeOut on mount. Each row: ElementSign + element name +
// bar + count out of 8.
// ===================================================================

import React, { useEffect, useState } from 'react';
import {
  INK_SOFT, INK_LIGHT,
  PIG_METAL, PIG_WOOD, PIG_WATER, PIG_FIRE, PIG_EARTH,
  ElementSign,
} from '../../styles/tokens.jsx';

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
 *   animate  — whether to animate the bars filling on mount (default: true)
 *   total    — denominator for the bar width (default: 8 — total chars in 八字 chart)
 */
export default function EnergyBlueprint({ chart, animate = true, total = 8 }) {
  const composition = buildComposition(chart);
  if (composition.length === 0) {
    return (
      <div style={{
        fontSize: 13, color: INK_LIGHT, fontStyle: 'italic',
        textAlign: 'center', padding: 20,
      }}>
        No chart data — seed a preset to render.
      </div>
    );
  }
  return (
    <>
      {composition.map((el) => (
        <BlueprintRow key={el.key} el={el} total={total} animate={animate} />
      ))}
    </>
  );
}

/**
 * BlueprintRow — single composition row.
 * ElementSign + element name + animated bar + count.
 *
 * Lifted verbatim from the prior RevealScreen.jsx implementation
 * so the visual is unchanged. RevealScreen and EnergyMap now both
 * import this — no parallel rendering.
 */
export function BlueprintRow({ el, total = 8, animate = true }) {
  const [mounted, setMounted] = useState(!animate);
  useEffect(() => {
    if (animate) {
      const t = setTimeout(() => setMounted(true), 100);
      return () => clearTimeout(t);
    }
  }, [animate]);
  const pct = (el.n / total) * 100;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '28px 1fr auto',
        gap: 14,
        alignItems: 'center',
        padding: '10px 0',
      }}
    >
      <ElementSign
        element={el.key}
        size={20}
        color={el.color}
        muted={el.n === 0}
      />
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 6,
          }}
        >
          <span
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 15,
              color: el.n === 0 ? INK_LIGHT : INK_SOFT,
            }}
          >
            {el.en}
          </span>
        </div>
        <div
          style={{
            height: 6,
            width: '100%',
            background: '#E5DFD1',
            borderRadius: 999,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: mounted ? `${pct}%` : '0%',
              height: '100%',
              background: el.color,
              borderRadius: 999,
              transition: 'width 800ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
        </div>
      </div>
      <span
        style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: 13,
          color: INK_LIGHT,
          minWidth: 28,
          textAlign: 'right',
        }}
      >
        {el.n}/{total}
      </span>
    </div>
  );
}
