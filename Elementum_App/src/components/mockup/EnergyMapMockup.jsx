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

import React, { useEffect, useState } from 'react';
import {
  INK, INK_SOFT, INK_LIGHT, INK_MIST,
  SILK, PAPER_HAIR,
  BRONZE_MID,
  PIG_METAL, PIG_WOOD, PIG_FIRE, PIG_EARTH, PIG_WATER, PIG_SEAL,
  StatusBar, ElementSign,
} from '../../styles/tokens.jsx';
import DashboardNav from './DashboardNav.jsx';
import {
  PAGE_BG, CARD_BG, CARD_BORDER, TAG_GREY, TITLE_INK,
  IdentityRibbon, LockIcon,
} from './_shared.jsx';
import { useChart } from '../../store/chartContext.jsx';
import EnergyBlueprint, { buildComposition } from '../shared/EnergyBlueprint.jsx';
import { buildDm } from '../shared/IdentityRibbon.jsx';

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

// ─────────────────────────────────────────────────────────────
// Ceremonial entrance schedule.
// The Energy Map is the user's "full reveal of the app" moment —
// after the cinematic Reveal screen, the dashboard arrives in
// composed beats so the new chrome (tab nav included) reads as
// the surface unfolding rather than appearing.
//
// Total entrance window ~1300 ms. Same easing curve as Reveal §1
// (cubic-bezier 0.22, 1, 0.36, 1) so the two screens feel like
// one continuous ceremony, not two separate transitions.
// ─────────────────────────────────────────────────────────────
const ENTRANCE = {
  header:    { delay: 0,    duration: 350, lift: 4 },
  ribbon:    { delay: 200,  duration: 400, lift: 8 },
  blueprint: { delay: 350,  duration: 400, lift: 8 },
  pair:      { delay: 500,  duration: 400, lift: 8 },
  secondary: { delay: 650,  duration: 400, lift: 8 },
  nav:       { delay: 850,  duration: 500, lift: 12 },
};

function fade(mounted, key) {
  const cfg = ENTRANCE[key];
  return {
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : `translateY(${cfg.lift}px)`,
    transition:
      `opacity ${cfg.duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${cfg.delay}ms, ` +
      `transform ${cfg.duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${cfg.delay}ms`,
    willChange: 'opacity, transform',
  };
}

export default function EnergyMapMockup({ onBack, onOpenDetail }) {
  // Pull real chart data — same source as RevealScreen.
  const { chart } = useChart();
  const dm = buildDm(chart);

  // Inline force sub-cards: derive elements from the actual chart composition.
  // Archetype names + chip text are still placeholders — those need
  // TG_CARD_DATA wiring (planned in DOC5 §17).
  const composition = buildComposition(chart);
  const primaryEl   = composition[0];                      // most-present element (the DM)
  const secondaryEl = composition[1];                      // second-most-present
  const PRIMARY_FORCE = primaryEl ? {
    tag: 'Primary Force',
    element: primaryEl.en, elementKey: primaryEl.key, color: primaryEl.color,
    archetype: 'The Mirror',  // TODO: pull from TG_CARD_DATA[dominantTG]
    chips: ['Self-reliant', 'Consistent', 'Principled'],
  } : null;
  const SECONDARY_FORCE = secondaryEl ? {
    tag: 'Secondary Force',
    element: secondaryEl.en, elementKey: secondaryEl.key, color: secondaryEl.color,
    archetype: 'The Harvest',
    chips: ['Methodical', 'Disciplined', 'Earned'],
  } : null;

  // Double-rAF mount pattern — same as RevealScreen §1.
  // Initial DOM commits in OFF state, then we flip to ON in the next
  // frame so the transition actually fires.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    let id1, id2;
    id1 = requestAnimationFrame(() => {
      id2 = requestAnimationFrame(() => setMounted(true));
    });
    return () => {
      cancelAnimationFrame(id1);
      cancelAnimationFrame(id2);
    };
  }, []);

  // Empty state — no chart yet. Surfaces the seed presets in the DevBar.
  if (!chart || !dm) {
    return (
      <div style={{
        position: 'absolute', inset: 0, background: PAGE_BG,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'EB Garamond', serif", color: INK_LIGHT,
        textAlign: 'center', padding: 32,
      }}>
        <StatusBar tint={INK} />
        <div>
          <p style={{ fontSize: 14, fontStyle: 'italic', margin: 0 }}>
            No chart available.
          </p>
          <p style={{ fontSize: 12, marginTop: 8, opacity: 0.7 }}>
            Seed a preset (DevBar → 庚 Blade or 癸 Rain) to view the dashboard.
          </p>
        </div>
      </div>
    );
  }

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
      {/* Scroll viewport — bottom 76px reserved so nav doesn't overlap content.
          Top 84px is sticky-header territory, but content scrolls under it
          (with a backdrop blur on the header so text doesn't bleed). */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          bottom: 76,    // height of DashboardNav
          overflowY: 'auto',
        }}
      >
        {/* Sticky header — replaces both StatusBar background and page title.
            Contains: status bar safe-area, Energy Map title, ← Reveal back link.
            Backdrop blur so content scrolls behind it without bleeding text. */}
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 20,
            background: 'linear-gradient(180deg, rgba(239,229,204,0.94) 0%, rgba(239,229,204,0.88) 80%, rgba(239,229,204,0) 100%)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            paddingTop: 0,
            paddingBottom: 12,
            ...fade(mounted, 'header'),
          }}
        >
          <StatusBar tint={INK} />
          <div
            style={{
              padding: '50px 20px 4px',
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
        </header>

        <div style={{ padding: '8px 16px 24px' }}>
          {/* ── 1. Identity ribbon ──────────────────────────── */}
          <div style={fade(mounted, 'ribbon')}>
            <IdentityRibbon dm={dm} />
          </div>

          {/* ── 2. Energy Blueprint card (with inline forces) ── */}
          <div style={fade(mounted, 'blueprint')}>
            <BlueprintCard chart={chart} primary={PRIMARY_FORCE} secondary={SECONDARY_FORCE} />
          </div>

          {/* ── 3. Catalyst / Resistance pair ─────────────────── */}
          <div style={fade(mounted, 'pair')}>
            <PairRow catalyst={CATALYST} resistance={RESISTANCE} onOpenDetail={onOpenDetail} />
          </div>

          {/* ── 4. Secondary cards row (Seasonal / Life Chapters / Patterns) ── */}
          <div style={fade(mounted, 'secondary')}>
            <SecondaryCards cards={SECONDARY_CARDS} onOpenDetail={onOpenDetail} />
          </div>
        </div>
      </div>

      {/* ── Bottom tab nav (the "full reveal" punctuation — arrives last) ─── */}
      <DashboardNav
        active="energyMap"
        accent={dm.elementColor}
        style={fade(mounted, 'nav')}
      />
    </div>
  );
}

// IdentityRibbon, SegmentedBar, StemSeal — imported from ./_shared.jsx
// (same primitives used by Reveal §2 — the cascade is literal)

// ─────────────────────────────────────────────────────────────
// Energy Blueprint card — composition chart + inline force sub-cards.
// Composition is rendered by the SHARED <EnergyBlueprint> component
// (src/components/shared/EnergyBlueprint.jsx) — same component used
// by RevealScreen Section 2, so both screens are pixel-identical and
// fed by the same chart data.
// ─────────────────────────────────────────────────────────────
function BlueprintCard({ chart, primary, secondary }) {
  return (
    <article
      style={{
        background: CARD_BG,
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: 14,
        padding: '16px 18px',
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
        color: INK_LIGHT, margin: '0 0 8px',
      }}>
        The pattern of all five energies across your four pillars — what is present,
        what dominates, and what is absent.
      </p>

      {/* Composition chart — shared with Reveal Section 2 */}
      <EnergyBlueprint chart={chart} />

      {/* Inline force sub-cards */}
      <div style={{ marginTop: 14 }}>
        {primary   && <ForceSubCard force={primary}   kind="primary" />}
        {secondary && <ForceSubCard force={secondary} kind="secondary" />}
      </div>
    </article>
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
      {/* Hairline divider with tag — softer than a plain section header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        margin: '14px 4px 8px',
      }}>
        <span style={{
          fontSize: 10, letterSpacing: 3, textTransform: 'uppercase',
          color: TAG_GREY, fontWeight: 500,
        }}>
          Deeper Sections
        </span>
        <span style={{ flex: 1, height: 1, background: PAPER_HAIR, opacity: 0.6 }} />
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
        overflow: 'hidden',  // so the lock-state overlay clips to the card's rounded corners
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

      {/* Lock state visual — DOC5 §11 v1.8 spec.
          Sits as an overlay covering the bottom strip of the card,
          representing the locked detail-page content beyond the tap.
          backdrop-blur-sm + rgba(248,246,240,0.7) + Lock icon + tier
          badge centered over the blur. Existing card content (header,
          title, teaser, corner pill, chevron) all preserved beneath. */}
      {locked && (
        <div
          style={{
            position: 'absolute',
            left: 0, right: 0, bottom: 0,
            height: 22,
            background: 'rgba(248,246,240,0.7)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            borderTop: `1px solid ${PAPER_HAIR}55`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            pointerEvents: 'none',
          }}
        >
          <LockIcon size={12} color="#8C857B" />
          <span style={{
            fontSize: 8.5, letterSpacing: 1.4, textTransform: 'uppercase',
            color: '#8C857B',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          }}>
            ◆ Seeker — full reading inside
          </span>
        </div>
      )}
    </article>
  );
}

// StemSeal and SegmentedBar moved to ./_shared.jsx
