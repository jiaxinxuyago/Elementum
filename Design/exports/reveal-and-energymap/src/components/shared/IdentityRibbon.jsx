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
  PAPER_HAIR,
  PIG_METAL, PIG_WOOD, PIG_WATER, PIG_FIRE, PIG_EARTH,
} from '../../styles/tokens.jsx';

const CARD_BG = '#EBE5D6';
const CARD_BORDER = '#DCD3C0';

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
// IdentityRibbon — small framed seal + element + chips +
// saturation reading + segmented saturation bar.
// ─────────────────────────────────────────────────────────────
export function IdentityRibbon({ dm, compact = false }) {
  if (!dm) return null;
  return (
    <article
      style={{
        background: CARD_BG,
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: 14,
        padding: compact ? '12px 12px 14px' : '14px 14px 16px',
        marginBottom: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <StemSeal stem={dm.stem} pinyin={dm.stemPinyin} color={dm.elementColor} />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: "'EB Garamond', serif", fontStyle: 'italic',
              fontSize: 17, color: INK, fontWeight: 500,
            }}>
              {dm.element}
            </span>
            <span style={{ color: INK_LIGHT, fontSize: 14 }}>·</span>
            {dm.bandChips.map((c, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: 10.5,
                  letterSpacing: 0.4,
                  padding: '2px 8px',
                  borderRadius: 999,
                  border: `1px solid ${PAPER_HAIR}`,
                  color: INK_SOFT,
                  background: 'transparent',
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {dm.saturationLine && (
        <div
          style={{
            fontFamily: "'EB Garamond', serif",
            marginTop: 10,
            paddingLeft: 14,
            borderLeft: `2px solid ${dm.elementColor}50`,
            fontStyle: 'italic',
            fontSize: 13,
            lineHeight: 1.55,
            color: INK_SOFT,
          }}
        >
          {dm.saturationLine}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
        <SegmentedBar count={Math.round((dm.saturation || 0) * 8)} max={8} color={dm.elementColor} />
        <span style={{
          fontSize: 12, color: dm.elementColor, fontWeight: 500,
          letterSpacing: 0.3, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        }}>
          {Math.round((dm.saturation || 0) * 100)}%
        </span>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────
// StemSeal — small framed-square Chinese character with pinyin.
// ─────────────────────────────────────────────────────────────
export function StemSeal({ stem, pinyin, color, size = 44 }) {
  return (
    <div
      style={{
        width: size, height: size, borderRadius: 10,
        background: 'rgba(248,241,225,0.92)',
        border: `1px solid ${PAPER_HAIR}`,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}
    >
      <span
        style={{
          fontFamily: 'Noto Serif SC, serif',
          fontSize: size * 0.5,
          color: color,
          letterSpacing: 0,
          lineHeight: 1,
        }}
      >
        {stem}
      </span>
      {pinyin && (
        <span
          style={{
            position: 'absolute',
            bottom: 3,
            fontSize: 7.5,
            letterSpacing: 1,
            color: INK_MIST,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            textTransform: 'uppercase',
            opacity: 0.7,
          }}
        >
          {pinyin}
        </span>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SegmentedBar — count out of max (default 8 = chart character total).
// Discrete cells, midpoint gap echoing the four-pillar structure.
// ─────────────────────────────────────────────────────────────
export function SegmentedBar({ count, max = 8, color, height = 8 }) {
  const cells = [];
  for (let i = 0; i < max; i++) {
    const isFilled = i < count;
    const isMidGap = max === 8 && i === 4;
    cells.push(
      <span
        key={i}
        style={{
          flex: 1,
          height,
          background: isFilled ? color : '#E5DFD1',
          borderRadius: 1.5,
          opacity: isFilled ? 1 : 0.85,
          marginLeft: isMidGap ? 5 : 0,
        }}
      />
    );
  }
  return (
    <div style={{ display: 'flex', flex: 1, gap: 3, alignItems: 'center' }}>
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
