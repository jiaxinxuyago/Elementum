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
  SILK, PAPER_HAIR, BORDER_LIGHT,
  BRONZE_MID, BRONZE_DARK, WALNUT,
  PIG_METAL, PIG_METAL_DEEP,
  PIG_WOOD,  PIG_WOOD_DEEP,
  PIG_FIRE,  PIG_FIRE_DEEP,
  PIG_EARTH, PIG_EARTH_DEEP,
  PIG_WATER, PIG_WATER_DEEP,
  PIG_SEAL,
  StatusBar, ElementSign, SilkPaper, deckleCard,
} from '../../styles/tokens.jsx';
import DashboardNav from './DashboardNav.jsx';
import {
  PAGE_BG, CARD_BG, CARD_BORDER, TAG_GREY, TITLE_INK,
  IdentityRibbon, LockIcon,
} from './_shared.jsx';
import { useChart } from '../../store/chartContext.jsx';
import EnergyBlueprint, { buildComposition } from '../shared/EnergyBlueprint.jsx';
import { buildDm } from '../shared/IdentityRibbon.jsx';

// Element pigment lookup keyed by lowercase name (matches polished bundle)
const PIG = {
  metal: PIG_METAL,  wood: PIG_WOOD,  water: PIG_WATER,  fire: PIG_FIRE,  earth: PIG_EARTH,
};
const PIG_DEEP = {
  metal: PIG_METAL_DEEP, wood: PIG_WOOD_DEEP, water: PIG_WATER_DEEP, fire: PIG_FIRE_DEEP, earth: PIG_EARTH_DEEP,
};

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
        background: '#F4ECD9',  // matches polished V1 prototype Energy Map base
        fontFamily: "'EB Garamond', serif",
        color: INK,
        overflow: 'hidden',
      }}
    >
      {/* Painted page background — bg-energymap-01-top-band.
          Mountain band + pine trees at the top fades to clean paper
          below, framing the chrome (header + IdentityRibbon) without
          competing with the dense card stack underneath. */}
      <img
        src="/assets/backgrounds/bg-energymap-01-top-band.png"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Scroll viewport — bottom 76px reserved so nav doesn't overlap content. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          bottom: 76,    // height of DashboardNav
          overflowY: 'auto',
          zIndex: 10,
        }}
      >
        {/* Sticky top bar — polished V1 spec:
            iOS status bar (44px) on its own row, then on the next row
            "‹ ENERGY MAP" eyebrow LEFT · "Birth chart →" italic dashed link RIGHT.
            <StatusBar> is `position: absolute` (occupies 0–44px of its
            parent), so the header content row needs paddingTop ≥ 44
            to clear it. Using 56 to include the 12px gap shown in the
            reference. */}
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 20,
            background: 'linear-gradient(180deg, rgba(244,236,217,0.94) 0%, rgba(244,236,217,0.86) 80%, rgba(244,236,217,0) 100%)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            paddingBottom: 12,
            ...fade(mounted, 'header'),
          }}
        >
          <StatusBar tint={INK} />
          <div
            style={{
              padding: '56px 22px 0',  // 56 = status bar (44) + 12 gap, clears the absolute StatusBar
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <button
              onClick={onBack}
              style={{
                background: 'transparent', border: 0, padding: 0,
                display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer',
                color: INK_SOFT, whiteSpace: 'nowrap', flexShrink: 0,
                fontFamily: "'EB Garamond', serif",
              }}
            >
              <span style={{ fontSize: 16, color: BRONZE_MID, lineHeight: 1 }}>‹</span>
              <span style={{
                fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
                color: INK_LIGHT, fontWeight: 500,
              }}>Energy map</span>
            </button>
            <span style={{
              fontFamily: "'EB Garamond', serif", fontSize: 11.5,
              color: INK_LIGHT, fontStyle: 'italic',
              borderBottom: `1px dashed ${PAPER_HAIR}`, cursor: 'pointer',
              whiteSpace: 'nowrap', flexShrink: 0,
            }}>Birth chart →</span>
          </div>
        </header>

        <div style={{ padding: '12px 22px 24px' }}>
          {/* ── 1. Identity ribbon (in deckleCard, 18px padding) ──── */}
          <div style={fade(mounted, 'ribbon')}>
            <div style={{ ...deckleCard({ padding: '18px 18px 16px' }), marginBottom: 14 }}>
              <IdentityRibbon dm={dm} />
            </div>
          </div>

          {/* ── 2. Energy Blueprint card (Cormorant title + composition + inline forces) ── */}
          <div style={fade(mounted, 'blueprint')}>
            <BlueprintCard chart={chart} primary={PRIMARY_FORCE} secondary={SECONDARY_FORCE} />
          </div>

          {/* ── 3. Catalyst / Resistance pair (tinted backgrounds) ── */}
          <div style={fade(mounted, 'pair')}>
            <PairRow catalyst={CATALYST} resistance={RESISTANCE} onOpenDetail={onOpenDetail} />
          </div>

          {/* ── 4. Secondary cards row ─────────────────────────────── */}
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
// Energy Blueprint card — Cormorant title + "8 MARKS" eyebrow,
// composition chart, and inline force rows. Mirrors the polished
// V1 prototype's card structure exactly.
// ─────────────────────────────────────────────────────────────
function BlueprintCard({ chart, primary, secondary }) {
  return (
    <article
      style={{
        ...deckleCard({ padding: '18px 16px 18px', position: 'relative', overflow: 'hidden' }),
        marginBottom: 14,
      }}
    >
      {/* Header — Cormorant title left + element-tinted eyebrow right */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 14, gap: 12,
      }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 18, fontWeight: 600, color: INK, letterSpacing: 0.3,
          whiteSpace: 'nowrap',
        }}>Energy Blueprint</div>
        <span style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
          color: INK_LIGHT, fontWeight: 500, whiteSpace: 'nowrap',
        }}>8 marks</span>
      </div>

      {/* Composition chart — shared with Reveal Section 2 */}
      <EnergyBlueprint chart={chart} />

      <div style={{ height: 14 }} />

      {/* Inline force rows */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
        {primary   && <ForceRow which="primary"   force={primary}   />}
        {secondary && <ForceRow which="secondary" force={secondary} />}
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────
// ForceRow — inline grid (36px element bg + label/sentence + chevron).
// Polished V1 layout · §11 compact display of dominant TGs.
// ─────────────────────────────────────────────────────────────
function ForceRow({ which, force }) {
  const c = PIG[force.elementKey] || force.color;
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '36px 1fr auto',
      alignItems: 'center', columnGap: 12, padding: '10px 12px',
      background: 'rgba(255,255,255,0.4)',
      border: `1px solid ${BORDER_LIGHT}`,
      borderRadius: 12, cursor: 'pointer',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: `${c}1A`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <ElementSign element={force.elementKey} size={18} color={c} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontFamily: "'EB Garamond', serif", fontSize: 9.5,
          letterSpacing: 2, color: INK_LIGHT, textTransform: 'uppercase',
          fontWeight: 600, lineHeight: 1.2, marginBottom: 2,
        }}>{which === 'primary' ? 'Primary' : 'Secondary'}</div>
        <div style={{
          display: 'flex', alignItems: 'baseline', gap: 8,
          flexWrap: 'wrap', rowGap: 0,
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
            fontWeight: 600, color: INK, lineHeight: 1.2,
          }}>{force.archetype}</span>
          <span style={{
            fontFamily: "'EB Garamond', serif", fontSize: 11.5,
            color: INK_SOFT, fontStyle: 'italic', lineHeight: 1.3,
          }}>· {force.element}</span>
        </div>
      </div>
      <span style={{ color: INK_MIST, fontSize: 16, lineHeight: 1 }}>›</span>
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
// Catalyst / Resistance pair — side-by-side, element-tinted backgrounds.
// Polished V1 spec: tinted bg + arrow/label + ElementSign + Cormorant
// 18px word + italic line.
// ─────────────────────────────────────────────────────────────
function PairRow({ catalyst, resistance, onOpenDetail }) {
  const cFirst = catalyst.items?.[0];
  const rFirst = resistance.items?.[0];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
      <PairCard
        label="What lifts you"
        arrow="↑"
        elementKey={cFirst?.elementKey || 'fire'}
        word={cFirst?.element || 'Fire'}
        line={catalyst.intro}
        onTap={() => onOpenDetail?.('catalyst')}
      />
      <PairCard
        label="What depletes you"
        arrow="↓"
        elementKey={rFirst?.elementKey || 'earth'}
        word={rFirst?.element || 'Earth'}
        line={resistance.intro}
        onTap={() => onOpenDetail?.('resistance')}
      />
    </div>
  );
}

function PairCard({ label, arrow, elementKey, word, line, onTap }) {
  const tint     = PIG[elementKey];
  const tintDeep = PIG_DEEP[elementKey];
  return (
    <article
      onClick={onTap}
      style={{
        ...deckleCard({
          background: `${tint}10`,
          border: `1px solid ${tint}40`,
        }),
        padding: '14px 14px 14px',
        minHeight: 130,
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <span style={{ color: tintDeep, fontSize: 14, fontWeight: 700 }}>{arrow}</span>
        <span style={{
          fontFamily: "'EB Garamond', serif", fontSize: 9.5,
          letterSpacing: 2, color: tintDeep, textTransform: 'uppercase',
          fontWeight: 600,
        }}>{label}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <ElementSign element={elementKey} size={16} color={tint} />
        <span style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: 18,
          fontWeight: 600, color: INK,
        }}>{word}</span>
      </div>
      <p style={{
        margin: 0, fontSize: 11.5, color: INK_SOFT, lineHeight: 1.5,
        fontStyle: 'italic',
      }}>{line}</p>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
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
        background: '#EBE5D6',
        border: `1px solid #DCD3C0`,
        borderRadius: 22,
        padding: '14px 18px',
        cursor: 'pointer',
        opacity: locked ? 0.85 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        overflow: 'hidden',
      }}
    >
      <div>
        <div style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
          color: card.accent, fontWeight: 500, marginBottom: 3,
        }}>
          {card.tag}
        </div>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 16, margin: 0, color: INK, fontWeight: 500,
          letterSpacing: 0.2, marginBottom: 3,
        }}>
          {card.title}
        </h3>
        <p style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: 12, color: INK_LIGHT, margin: 0, lineHeight: 1.4,
          fontStyle: 'italic',
        }}>
          {card.teaser}
        </p>
      </div>
      <span style={{
        color: locked ? INK_LIGHT : INK_MIST, fontSize: 18,
        fontFamily: "'EB Garamond', serif", lineHeight: 1,
      }}>
        {locked ? '◆' : '›'}
      </span>

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
