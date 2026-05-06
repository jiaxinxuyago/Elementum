// ===================================================================
// ELEMENTUM · IdentityRibbon (shared component)
//
// Single source of truth for the identity ribbon used at the top of
// BOTH Reveal Section 2 AND the Energy Map dashboard. Same component,
// same data shape, same look — the cascade designed in DOC5 §9 v1.8
// and §11 v1.8 is literal, not visually paralleled.
//
// Companion helper `buildDm(chart)` derives the ribbon's data object
// from a real chart so both screens read from the same source.
// ===================================================================

import React from 'react';
import {
  INK, INK_SOFT, INK_LIGHT, INK_MIST,
  PAPER_HAIR, BORDER_LIGHT,
  PIG_METAL, PIG_WOOD, PIG_WATER, PIG_FIRE, PIG_EARTH,
} from '../../styles/tokens.jsx';

// ── Lookup tables shared by buildDm ────────────────────────────
const PIG_BY_NAME = {
  Metal: PIG_METAL, Wood: PIG_WOOD, Water: PIG_WATER, Fire: PIG_FIRE, Earth: PIG_EARTH,
};
const STEM_PINYIN = {
  '甲':'JIA', '乙':'YI', '丙':'BING', '丁':'DING',
  '戊':'WU',  '己':'JI', '庚':'GENG', '辛':'XIN',
  '壬':'REN', '癸':'GUI',
};
const BAND_CHIPS = {
  extremely_strong: ['Overpowering', 'Concentrated'],
  strong:           ['Concentrated'],
  balanced:         ['Balanced'],
  weak:             ['Open'],
  extremely_weak:   ['Open', 'Vulnerable'],
};

/**
 * Build the IdentityRibbon's `dm` prop from a real chart object.
 * Saturation is computed as `chart.elements[dmElement].count / 8`
 * (real number, not placeholder) — the same denominator the
 * EnergyBlueprint composition chart uses.
 */
export function buildDm(chart) {
  if (!chart) return null;
  const stem    = chart.dayMaster?.stem;
  const element = chart.dayMaster?.element;
  if (!stem || !element) return null;
  const elementColor = PIG_BY_NAME[element] || PIG_METAL;
  const dmCount      = chart.elements?.[element]?.count ?? 0;
  const saturation   = dmCount / 8;
  const band         = chart.dayMaster?.strength || 'balanced';
  return {
    stem,
    stemPinyin: STEM_PINYIN[stem] || '',
    element,
    elementColor,
    polarity: chart.dayMaster?.polarity === 'yang' ? 'Yang' : 'Yin',
    band,
    saturation,
    saturationLine: saturation >= 0.5
      ? 'Your core element saturates the chart — there is very little counterbalance to what you already are.'
      : 'Your core element runs through the chart with room around it — other forces share the structure.',
    bandChips: BAND_CHIPS[band] || ['Balanced'],
  };
}

// ─────────────────────────────────────────────────────────────
// IdentityRibbon — stem seal + italic element + state chip + saturation %
// (header row), italic saturation reading, full-width segmented bar.
//
// Component returns just the inner contents — the consumer wraps it in
// a card (use `deckleCard()` from styles/tokens.jsx for the polished
// silk-card look).
// ─────────────────────────────────────────────────────────────
export function IdentityRibbon({ dm, compact = false }) {
  if (!dm) return null;
  // Use the most specific (last) chip when multiple are computed by
  // buildDm — the polished V1 prototype shows a single state chip.
  const chip = (dm.bandChips || []).slice(-1)[0];
  const sat  = dm.saturation || 0;
  return (
    <div>
      {/* Header row: seal · element · state chip · spacer · %
          (element-name was italic under v1 §3.5.E; reverted to regular per DOC5 §AM.10) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <StemSeal stem={dm.stem} color={dm.elementColor} />
        <span style={{
          // DOC5 §AM.10 — element-name label is regular (was italic 16/500 under v1 §3.5.E)
          fontFamily: "'EB Garamond', serif",
          fontSize: 16, color: INK, fontWeight: 500,
        }}>
          {dm.element}
        </span>
        {chip && (
          <span style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 9.5, letterSpacing: 1.8, textTransform: 'uppercase',
            padding: '4px 9px', border: `1px solid ${PAPER_HAIR}`,
            borderRadius: 999, background: 'transparent',
            color: INK_LIGHT, fontWeight: 500,
          }}>{chip}</span>
        )}
        <div style={{ flex: 1 }} />
        <span style={{
          fontFamily: "'EB Garamond', serif", fontSize: 14,
          color: dm.elementColor, fontWeight: 600,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {Math.round(sat * 100)}%
        </span>
      </div>

      {/* Saturation reading (full width, regular, no left-border accent)
          (was italic 12.5 under v1 §3.5.E; reverted to regular per DOC5 §AM.10) */}
      {!compact && dm.saturationLine && (
        <p style={{
          // DOC5 §AM.10 — descriptive paragraph is regular (was italic 12.5 under v1 §3.5.E)
          fontFamily: "'EB Garamond', serif",
          fontSize: 12.5, color: INK_SOFT, lineHeight: 1.5,
          margin: '10px 0 8px', maxWidth: 320,
        }}>
          {dm.saturationLine}
        </p>
      )}

      {/* Saturation bar — 8 evenly spaced cells, height 5 */}
      <SegmentedBar
        count={Math.round(sat * 8)}
        max={8}
        color={dm.elementColor}
        height={5}
        marginTop={compact ? 8 : 4}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// StemSeal — small framed-square Chinese character. Centered, single
// glyph (no pinyin underneath — matches the polished V1 prototype).
// ─────────────────────────────────────────────────────────────
export function StemSeal({ stem, color, size = 44 }) {
  return (
    <div
      style={{
        width: size, height: size, borderRadius: 12,
        background: 'rgba(248,241,225,0.92)',
        border: `1px solid ${PAPER_HAIR}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: "'Noto Serif SC', serif",
          fontSize: size * 0.5,
          color,
          fontWeight: 600,
          letterSpacing: 0,
          lineHeight: 1,
        }}
      >
        {stem}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SegmentedBar — `max` evenly-spaced cells (no midpoint gap).
// Cells use `repeat(max, 1fr)` so widths are exactly equal —
// matches the polished V1 prototype exactly.
// ─────────────────────────────────────────────────────────────
export function SegmentedBar({ count, max = 8, color, height = 8, marginTop = 0 }) {
  const cells = [];
  for (let i = 0; i < max; i++) {
    cells.push(
      <div
        key={i}
        style={{
          height,
          borderRadius: 1,
          background: i < count ? color : BORDER_LIGHT,
        }}
      />
    );
  }
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${max}, 1fr)`,
      gap: 3,
      marginTop,
    }}>
      {cells}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// LockIcon — small key/padlock glyph (DOC5 §11 lock state visual).
// ─────────────────────────────────────────────────────────────
export function LockIcon({ size = 16, color = '#8C857B' }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="7" width="10" height="6.5" rx="1.5" />
      <path d="M5 7 V5 a3 3 0 0 1 6 0 V7" />
    </svg>
  );
}
