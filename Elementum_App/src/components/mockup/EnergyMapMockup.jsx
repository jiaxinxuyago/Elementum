// ===================================================================
// ELEMENTUM · Energy Map Mockup v2 (DOC5 §11 v1.8 — content-rich)
//
// Reachable at #/mockup-energymap.
//
// Design rationale (carried over from older prototype + DOC5 v1.8):
//   - Content-rich, NOT navigation-rich.
//   - Identity ribbon → Energy Blueprint card with inline forces →
//     Catalyst/Resistance pair → secondary cards (Seasonal, Life
//     Chapters, Patterns).
//   - Bottom tab nav materialises here for the first time.
//
// Aesthetic anchor: onboarding/Reveal silk + EB Garamond serif +
// element pigments. Layout structure adapted from the older
// prototype shared by the user (segmented bars, card-in-card forces,
// Catalyst/Resistance side-by-side pair).
// ===================================================================

import React from 'react';
import {
  INK, INK_SOFT, INK_LIGHT, INK_MIST,
  SILK, PAPER_HAIR,
  BRONZE_MID,
  PIG_METAL, PIG_WOOD, PIG_FIRE, PIG_EARTH, PIG_WATER, PIG_SEAL,
  StatusBar, ElementSign,
} from '../../styles/tokens.jsx';
import DashboardNav from './DashboardNav.jsx';

const PAGE_BG = '#EFE5CC';
const CARD_BG = '#EBE5D6';
const CARD_BORDER = '#DCD3C0';
const TAG_GREY = '#8C8273';
const TITLE_INK = '#2C2825';

// ── 庚 reference data ──
const DM = {
  stem: '庚',
  stemPinyin: 'GENG',
  element: 'Metal',
  elementColor: PIG_METAL,
  polarity: 'Yang',
  band: 'concentrated',
  saturation: 0.92,
  saturationLine: 'Your core element saturates the chart — there is very little counterbalance to what you already are.',
  bandChips: ['Overpowering', 'Concentrated'],
};

// Composition: 8 chars total in chart → counts per element (sums to 8)
const COMPOSITION = [
  { key: 'metal', label: 'Metal',  color: PIG_METAL, count: 4, isDM: true },
  { key: 'wood',  label: 'Wood',   color: PIG_WOOD,  count: 2 },
  { key: 'earth', label: 'Earth',  color: PIG_EARTH, count: 1 },
  { key: 'water', label: 'Water',  color: PIG_WATER, count: 1 },
  { key: 'fire',  label: 'Fire',   color: PIG_FIRE,  count: 0 },
];

const PRIMARY_FORCE = {
  tag: 'Primary Force',
  element: 'Metal',
  elementKey: 'metal',
  color: PIG_METAL,
  archetype: 'The Mirror',
  chips: ['Self-reliant', 'Consistent', 'Principled'],
};

const SECONDARY_FORCE = {
  tag: 'Secondary Force',
  element: 'Wood',
  elementKey: 'wood',
  color: PIG_WOOD,
  archetype: 'The Harvest',
  chips: ['Methodical', 'Disciplined', 'Earned'],
};

const CATALYST = {
  intro: 'Energies that amplify your capacity and sharpen your focus.',
  items: [
    { element: 'Fire',  elementKey: 'fire',  color: PIG_FIRE,  archetype: 'The Trial' },
    { element: 'Water', elementKey: 'water', color: PIG_WATER, archetype: 'The Flow' },
  ],
};

const RESISTANCE = {
  intro: 'Energies that cost you before the work begins.',
  items: [
    { element: 'Earth', elementKey: 'earth', color: PIG_EARTH, archetype: 'The Well' },
    { element: 'Metal', elementKey: 'metal', color: PIG_METAL, archetype: 'The Mirror' },
  ],
};

const SECONDARY_CARDS = [
  { key: 'seasonal',     tag: 'Calibration',  title: 'The Forging Season', teaser: 'When Fire arrives, the precision finds its purpose.', accent: PIG_FIRE,  tier: 'pro' },
  { key: 'lifeChapters', tag: 'Temporal',     title: 'Life Chapters',       teaser: 'Decade luck cycles · how the energy field shifts.',     accent: PIG_WOOD,  tier: 'pro' },
  { key: 'patterns',     tag: 'Structural',   title: 'Chart Patterns',      teaser: '2 active patterns shape your chart.',                   accent: PIG_METAL, tier: 'pro' },
];

export default function EnergyMapMockup({ onBack, onOpenDetail }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: PAGE_BG,
        fontFamily: "'EB Garamond', serif",
        color: INK,
      }}
    >
      <StatusBar tint={INK} />

      {/* Scroll viewport — bottom 76px reserved so nav doesn't overlap content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          bottom: 76,    // height of DashboardNav
          overflowY: 'auto',
        }}
      >
        {/* Top safe-area + section header */}
        <div style={{ padding: '54px 20px 8px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <h1
              style={{
                fontSize: 22,
                fontWeight: 600,
                margin: 0,
                color: INK,
                letterSpacing: 0.2,
              }}
            >
              Energy Map
            </h1>
            <button
              onClick={onBack}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 12, color: INK_LIGHT,
                padding: '4px 8px', letterSpacing: 0.3,
              }}
            >
              ← Reveal
            </button>
          </div>
        </div>

        <div style={{ padding: '0 16px 24px' }}>
          {/* ── 1. Identity ribbon ──────────────────────────── */}
          <IdentityRibbon dm={DM} />

          {/* ── 2. Energy Blueprint card (with inline forces) ── */}
          <BlueprintCard composition={COMPOSITION} primary={PRIMARY_FORCE} secondary={SECONDARY_FORCE} />

          {/* ── 3. Catalyst / Resistance pair ─────────────────── */}
          <PairRow catalyst={CATALYST} resistance={RESISTANCE} onOpenDetail={onOpenDetail} />

          {/* ── 4. Secondary cards row (Seasonal / Life Chapters / Patterns) ── */}
          <SecondaryCards cards={SECONDARY_CARDS} onOpenDetail={onOpenDetail} />
        </div>
      </div>

      {/* ── Bottom tab nav (fixed at phone-frame bottom) ─────── */}
      <DashboardNav active="energyMap" accent={DM.elementColor} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Identity ribbon — same component shape used as Reveal §2 opener
// ─────────────────────────────────────────────────────────────
function IdentityRibbon({ dm }) {
  return (
    <article
      style={{
        background: CARD_BG,
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: 14,
        padding: '14px 14px 16px',
        marginBottom: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <StemSeal stem={dm.stem} color={dm.elementColor} />
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

      {/* Saturation reading */}
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

      {/* Saturation bar (segmented blocks, like composition) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
        <SegmentedBar count={Math.round(dm.saturation * 8)} max={8} color={dm.elementColor} />
        <span style={{
          fontSize: 12, color: dm.elementColor, fontWeight: 500,
          letterSpacing: 0.3, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        }}>
          {Math.round(dm.saturation * 100)}%
        </span>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────
// Energy Blueprint card — composition bars + inline force sub-cards
// ─────────────────────────────────────────────────────────────
function BlueprintCard({ composition, primary, secondary }) {
  return (
    <article
      style={{
        background: CARD_BG,
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 14, color: INK_LIGHT, lineHeight: 1 }}>≡</span>
        <h2 style={{
          fontSize: 18, margin: 0, color: INK, fontWeight: 600, letterSpacing: 0.2,
        }}>
          Energy Blueprint
        </h2>
      </div>
      <p style={{
        fontStyle: 'italic', fontSize: 13, lineHeight: 1.55,
        color: INK_LIGHT, margin: '0 0 14px',
      }}>
        The pattern of all five energies across your four pillars — what is present,
        what dominates, and what is absent.
      </p>

      {/* Composition bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
        {composition.map((row) => (
          <CompositionRow key={row.key} row={row} />
        ))}
      </div>

      {/* Inline force sub-cards */}
      <ForceSubCard force={primary} kind="primary" />
      <ForceSubCard force={secondary} kind="secondary" />
    </article>
  );
}

function CompositionRow({ row }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '24px 60px 1fr 18px', alignItems: 'center', gap: 8 }}>
      <span style={{
        width: 24, height: 24, borderRadius: 6,
        background: 'rgba(248,241,225,0.9)',
        border: `1px solid ${PAPER_HAIR}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <ElementSign element={row.key} size={14} color={row.color} />
      </span>
      <span style={{
        fontSize: 14, color: INK_SOFT, fontWeight: row.isDM ? 500 : 400,
        display: 'flex', alignItems: 'center', gap: 4,
      }}>
        {row.label}
        {row.isDM && <span style={{ color: row.color, fontSize: 11 }}>✦</span>}
      </span>
      <SegmentedBar count={row.count} max={8} color={row.color} />
      <span style={{
        fontSize: 12, color: row.count === 0 ? INK_MIST : INK_LIGHT, textAlign: 'right',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      }}>
        {row.count}
      </span>
    </div>
  );
}

function ForceSubCard({ force, kind }) {
  return (
    <div
      style={{
        background: 'rgba(248,241,225,0.45)',
        border: `1px solid ${PAPER_HAIR}`,
        borderRadius: 11,
        padding: '12px 14px',
        marginTop: 8,
        display: 'grid',
        gridTemplateColumns: '38px 1fr auto',
        alignItems: 'center',
        gap: 12,
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          width: 38, height: 38, borderRadius: 9,
          background: 'rgba(248,241,225,0.92)',
          border: `1px solid ${PAPER_HAIR}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <ElementSign element={force.elementKey} size={18} color={force.color} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontSize: 9.5, letterSpacing: 0.18 * 10, textTransform: 'uppercase',
          color: TAG_GREY, marginBottom: 2,
        }}>
          {force.tag}
        </div>
        <div style={{
          display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6, flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: 17, fontWeight: 600, color: TITLE_INK, letterSpacing: 0.1 }}>
            {force.element}
          </span>
          <span style={{
            fontStyle: 'italic', fontSize: 12.5, color: INK_LIGHT,
          }}>
            {force.archetype}
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {force.chips.map((c, i) => (
            <span
              key={i}
              style={{
                fontSize: 10.5,
                padding: '2px 8px',
                borderRadius: 999,
                border: `1px solid ${PAPER_HAIR}`,
                color: INK_SOFT,
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
      <span
        style={{
          width: 26, height: 26, borderRadius: 999,
          border: `1px solid ${PAPER_HAIR}`,
          background: 'rgba(248,241,225,0.7)',
          color: INK_LIGHT, fontSize: 13, lineHeight: '24px', textAlign: 'center',
        }}
      >
        →
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Catalyst / Resistance pair (side-by-side)
// ─────────────────────────────────────────────────────────────
function PairRow({ catalyst, resistance, onOpenDetail }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
      <PairCard
        title="Catalyst"
        arrow="↑"
        arrowColor={PIG_WOOD}
        intro={catalyst.intro}
        items={catalyst.items}
        onTap={() => onOpenDetail?.('catalyst')}
      />
      <PairCard
        title="Resistance"
        arrow="↓"
        arrowColor={PIG_FIRE}
        intro={resistance.intro}
        items={resistance.items}
        onTap={() => onOpenDetail?.('resistance')}
      />
    </div>
  );
}

function PairCard({ title, arrow, arrowColor, intro, items, onTap }) {
  return (
    <article
      onClick={onTap}
      style={{
        background: CARD_BG,
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: 14,
        padding: '14px 14px 12px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 18, color: arrowColor, lineHeight: 1, fontWeight: 500 }}>
          {arrow}
        </span>
        <span style={{
          width: 22, height: 22, borderRadius: 999,
          border: `1px solid ${PAPER_HAIR}`,
          background: 'rgba(248,241,225,0.7)',
          color: INK_LIGHT, fontSize: 11, lineHeight: '20px', textAlign: 'center',
        }}>
          →
        </span>
      </div>
      <h3 style={{ fontSize: 17, margin: 0, color: TITLE_INK, fontWeight: 600 }}>
        {title}
      </h3>
      <p style={{
        fontStyle: 'italic', fontSize: 12.5, lineHeight: 1.5,
        color: INK_LIGHT, margin: 0,
      }}>
        {intro}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 4 }}>
        {items.map((it, i) => (
          <ItemBadge key={i} item={it} />
        ))}
      </div>
    </article>
  );
}

function ItemBadge({ item }) {
  return (
    <div
      style={{
        background: 'rgba(248,241,225,0.55)',
        border: `1px solid ${PAPER_HAIR}`,
        borderRadius: 9,
        padding: '7px 10px',
        display: 'grid',
        gridTemplateColumns: '24px 1fr',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <span style={{
        width: 24, height: 24, borderRadius: 6,
        background: 'rgba(248,241,225,0.9)',
        border: `1px solid ${PAPER_HAIR}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <ElementSign element={item.elementKey} size={14} color={item.color} />
      </span>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: 13.5, color: item.color, fontWeight: 500, lineHeight: 1.2 }}>
          {item.element}
        </span>
        <span style={{ fontSize: 11, color: INK_LIGHT, fontStyle: 'italic', lineHeight: 1.2 }}>
          {item.archetype}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Secondary cards (Seasonal / Life Chapters / Patterns)
// ─────────────────────────────────────────────────────────────
function SecondaryCards({ cards, onOpenDetail }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{
        fontSize: 10, letterSpacing: 0.3 * 10, textTransform: 'uppercase',
        color: TAG_GREY, fontWeight: 500, margin: '4px 4px 4px',
      }}>
        Deeper Sections
      </div>
      {cards.map((c) => (
        <SecondaryCard key={c.key} card={c} onTap={() => onOpenDetail?.(c.key)} />
      ))}
    </div>
  );
}

function SecondaryCard({ card, onTap }) {
  const locked = card.tier === 'pro';
  return (
    <article
      onClick={onTap}
      style={{
        position: 'relative',
        background: CARD_BG,
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: 12,
        padding: '12px 14px',
        cursor: 'pointer',
        boxShadow: `inset 3px 0 0 ${card.accent}55`,
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <div>
        <div style={{
          fontSize: 9.5, letterSpacing: 0.18 * 10, textTransform: 'uppercase',
          color: TAG_GREY, marginBottom: 2,
        }}>
          {card.tag}
        </div>
        <h3 style={{
          fontSize: 16, margin: 0, color: TITLE_INK, fontWeight: 600,
          letterSpacing: 0.1, marginBottom: 3,
        }}>
          {card.title}
        </h3>
        <p style={{
          fontSize: 12, color: INK_LIGHT, margin: 0, lineHeight: 1.4,
          fontStyle: 'italic',
        }}>
          {card.teaser}
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {locked && (
          <span style={{
            fontSize: 8.5, letterSpacing: 1.4, textTransform: 'uppercase',
            color: '#8b5a44', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            padding: '2px 6px', borderRadius: 999,
            background: 'rgba(180,117,94,0.08)', border: '1px solid rgba(180,117,94,0.25)',
          }}>
            ◆ Seeker
          </span>
        )}
        <span style={{
          width: 26, height: 26, borderRadius: 999,
          border: `1px solid ${PAPER_HAIR}`, background: 'rgba(248,241,225,0.7)',
          color: INK_LIGHT, fontSize: 13, lineHeight: '24px', textAlign: 'center',
        }}>
          →
        </span>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────
// Shared bits: stem seal, segmented bar
// ─────────────────────────────────────────────────────────────
function StemSeal({ stem, color }) {
  return (
    <div
      style={{
        width: 44, height: 44, borderRadius: 10,
        background: 'rgba(248,241,225,0.92)',
        border: `1px solid ${PAPER_HAIR}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontFamily: 'Noto Serif SC, serif',
          fontSize: 22,
          color: color,
          letterSpacing: 0,
          lineHeight: 1,
        }}
      >
        {stem}
      </span>
    </div>
  );
}

function SegmentedBar({ count, max = 8, color }) {
  const cells = [];
  for (let i = 0; i < max; i++) {
    cells.push(
      <span
        key={i}
        style={{
          flex: 1,
          height: 8,
          background: i < count ? color : '#E5DFD1',
          borderRadius: 1.5,
          opacity: i < count ? 1 : 0.85,
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
