// ===================================================================
// ELEMENTUM · Shared mockup primitives
//
// Components used by BOTH Reveal §2 and Energy Map (the cascade).
// Refactored out of EnergyMapMockup so the same vocabulary is
// literally shared, not visually paralleled.
// ===================================================================

import React from 'react';
import {
  INK, INK_SOFT, INK_LIGHT, INK_MIST,
  PAPER_HAIR,
} from '../../styles/tokens.jsx';

export const PAGE_BG = '#EFE5CC';
export const CARD_BG = '#EBE5D6';
export const CARD_BORDER = '#DCD3C0';
export const TAG_GREY = '#8C8273';
export const TITLE_INK = '#2C2825';

// ─────────────────────────────────────────────────────────────
// IdentityRibbon — used by Reveal §2 opener AND Energy Map opener.
// Same component, same data, same look. The cascade is literal.
// ─────────────────────────────────────────────────────────────
export function IdentityRibbon({ dm, compact = false }) {
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
              fontFamily: 'inherit', fontStyle: 'italic',
              fontSize: 17, color: INK, fontWeight: 500,
            }}>
              {dm.element}
            </span>
            <span style={{ color: INK_LIGHT, fontSize: 14 }}>·</span>
            {dm.bandChips.map((c, i) => (
              <span
                key={i}
                style={{
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
// Used in IdentityRibbon (44×44) and elsewhere as a chart anchor.
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
// Discrete cells reading as a tally rather than a percentage.
// Visually grouped 4+4 with a slightly bigger gap in the middle —
// echoes the four-pillar structure (year · month · day · hour),
// each pillar carrying 2 characters (stem + branch).
// ─────────────────────────────────────────────────────────────
export function SegmentedBar({ count, max = 8, color, height = 8 }) {
  const cells = [];
  for (let i = 0; i < max; i++) {
    const isFilled = i < count;
    // Add a slightly bigger gap at the midpoint so 8 cells read as 4+4.
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
