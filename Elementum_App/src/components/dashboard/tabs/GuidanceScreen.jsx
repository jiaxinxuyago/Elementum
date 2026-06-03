// ===================================================================
// ELEMENTUM · GuidanceScreen — Variant C (featured + 2×2 grid)
// ===================================================================
// Direction 2 from Claude Design's consolidated wireframes.
//
//   · Header "Guidance · 引路 / Guidance"
//   · Featured ELEMENTAL DRAW card (full width) — accent bar (Wood),
//     icon tile, title, body, "Draw today's card →" CTA.
//   · 2×2 grid of the other four features — Energy Manual (Seeker),
//     Self-Report (Seeker), AI Consultant (Advisor), BaZi Codex (Free).
//     Each grid tile is a compact card: left accent bar in element
//     pigment, icon tile + tier label, title (2-line), short body.
//     Locked tiles show a lock glyph in the icon tile.
//
// Tier gating is unchanged: locked tiles open the upgrade modal;
// unlocked tiles route to the feature sub-screen.
// ===================================================================

import React from 'react';
import { useChart } from '../../../store/chartContext.jsx';
import { useUpgrade } from '../UpgradeModal.jsx';
import { Icon } from '../../shared/icons';
import { MoodboardArt } from '../VisualTile.jsx';
import {
  elementArt, ART_ENSO, ART_COMPOSITE, ART_LANDSCAPE,
} from '../../../styles/backgrounds.js';
import {
  ink, inkSoft, inkLight, bronzeDark, gold, advisor,
  paperHair, quietBorder, pigments, withAlpha,
} from '../../../styles/tokens';

const TIER_RANK = { free: 0, seeker: 1, advisor: 2 };

// Each feature owns an element pigment — accent bar + icon tint.
const CARDS = [
  {
    key: 'draw',
    title: 'Elemental Draw',
    tier: 'free',
    icon: 'read-elemental',
    pigment: 'wood',
    route: 'app-draw',
    cta: "Draw today's card",
    body: "A daily question drawn from the day's elemental current — today's deck follows your Today tab.",
    short: 'A daily question.',
  },
  {
    key: 'manual',
    title: 'Energy Manual',
    tier: 'seeker',
    icon: 'read-chapters',
    pigment: 'earth',
    route: 'app-manual',
    cta: 'Open your Manual',
    body: 'Your personalized reading across all five life domains — a living document that updates as your decades and years turn.',
    short: 'Five life domains.',
  },
  {
    key: 'selfreport',
    title: 'Self-Report',
    tier: 'seeker',
    icon: 'ico-edit',
    pigment: 'water',
    route: 'app-selfreport',
    cta: 'Update your context',
    body: 'A short calibration that tunes your readings to how your energy actually shows up.',
    short: 'Tune your readings.',
  },
  {
    key: 'consultant',
    title: 'AI Consultant',
    tier: 'advisor',
    icon: 'tab-guidance',
    pigment: 'water',
    route: 'app-consultant',
    cta: 'Open the conversation',
    body: 'Ask anything. A consultant that has read your full chart and Manual.',
    short: 'Ask anything.',
  },
  {
    key: 'codex',
    title: 'BaZi Codex',
    tier: 'free',
    tierAdvanced: 'seeker',
    icon: 'read-pillars',
    pigment: 'fire',
    route: 'app-codex',
    cta: 'Browse the Codex',
    body: 'The educational layer — what the concepts mean and why they matter.',
    short: 'The concepts, explained.',
  },
];

export default function GuidanceScreen({ onOpen }) {
  const { tier } = useChart();
  const { openUpgrade, advisorGlow } = useUpgrade();
  const currentRank = TIER_RANK[tier] ?? 0;

  const featured = CARDS.find((c) => c.key === 'draw');
  const gridCards = CARDS.filter((c) => c.key !== 'draw');

  const isLocked = (card) => {
    const required = TIER_RANK[card.tier] ?? 0;
    return currentRank < required;
  };

  return (
    <main style={{ minHeight: '100%', padding: '54px 18px 24px' }}>
      {/* Page header */}
      <header style={{ marginBottom: 16, padding: '2px 2px 0' }}>
        <span style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
          color: bronzeDark, fontWeight: 500,
        }}>
          Guidance · 引 路
        </span>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 30, fontWeight: 400, lineHeight: 1.1,
          color: ink, margin: '4px 0 0',
        }}>
          Guidance
        </h1>
      </header>

      {/* Featured Elemental Draw */}
      <FeaturedCard
        card={featured}
        locked={isLocked(featured)}
        onUnlock={() => openUpgrade(featured.title)}
        onOpen={!isLocked(featured) ? () => onOpen?.(featured.route) : undefined}
      />

      {/* 2×2 grid of the other four */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: 10,
        marginTop: 12,
      }}>
        {gridCards.map((card) => {
          const locked = isLocked(card);
          return (
            <GridTile
              key={card.key}
              card={card}
              locked={locked}
              glow={advisorGlow && card.key === 'consultant'}
              onUnlock={() => openUpgrade(card.title)}
              onOpen={!locked ? () => onOpen?.(card.route) : undefined}
            />
          );
        })}
      </div>
    </main>
  );
}

function tierBadge(tierKey) {
  if (tierKey === 'advisor') return { mark: '✦', label: 'Advisor', color: advisor };
  if (tierKey === 'seeker')  return { mark: '◆', label: 'Seeker',  color: bronzeDark };
  return null;
}

// ── Featured card — wide, with accent bar + body + CTA ────────────
function FeaturedCard({ card, locked, onUnlock, onOpen }) {
  const pig = pigments[card.pigment] || pigments.metal;
  const badge = tierBadge(card.tier);
  return (
    <section style={{
      background: '#FDFBF8',
      border: `1px solid ${quietBorder}`,
      borderRadius: 16,
      padding: '16px 18px 16px 21px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Left accent bar in feature pigment */}
      <div aria-hidden="true" style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
        background: locked ? withAlpha(pig.base, '40') : pig.deep,
        opacity: locked ? 0.5 : 0.9,
      }} />
      {badge && (
        <span style={{
          position: 'absolute', top: 14, right: 16,
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase',
          color: badge.color, fontWeight: 500,
        }}>
          <span aria-hidden="true">{badge.mark}</span> {badge.label}
        </span>
      )}
      <div aria-hidden="true" style={{
        width: 44, height: 44, borderRadius: 11,
        background: withAlpha(pig.base, '1A'),
        border: `1px solid ${withAlpha(pig.base, '40')}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: locked ? inkLight : pig.deep,
        marginBottom: 12,
      }}>
        <Icon id={locked ? 'ico-lock' : card.icon} size={22} />
      </div>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 22, fontWeight: 500, color: ink, margin: '0 0 6px',
      }}>{card.title}</h2>
      <p style={{
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 13, lineHeight: 1.55, color: inkSoft, margin: 0,
      }}>{card.body}</p>
      <div style={{ marginTop: 14 }}>
        {locked ? (
          <button type="button" onClick={onUnlock} style={ctaStyle(gold, bronzeDark)}>
            Unlock with {tierBadge(card.tier)?.label || 'Seeker'}
            <Icon id="ico-arrow-r" size={13} color={bronzeDark} />
          </button>
        ) : (
          <button type="button" onClick={onOpen} style={ctaStyle(pig.base, pig.deep)}>
            {card.cta || 'Open'}
            <Icon id="ico-arrow-r" size={13} color={pig.deep} />
          </button>
        )}
      </div>
    </section>
  );
}

// ── Grid tile — compact 2×2 cell ─────────────────────────────────
function GridTile({ card, locked, glow, onUnlock, onOpen }) {
  const pig = pigments[card.pigment] || pigments.metal;
  const badge = tierBadge(card.tier);
  return (
    <button
      type="button"
      onClick={locked ? onUnlock : onOpen}
      aria-label={`${card.title}${locked ? ` (locked — ${badge?.label})` : ''}`}
      style={{
        appearance: 'none',
        background: '#FDFBF8',
        border: `1px solid ${quietBorder}`,
        borderRadius: 14,
        padding: '12px 13px 12px 16px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        minHeight: 132,
        animation: glow ? 'advisorGlow 1200ms ease-in-out' : 'none',
      }}
    >
      {glow && <style>{`@keyframes advisorGlow { 0% { box-shadow: 0 0 0 0 rgba(122,94,154,0) } 50% { box-shadow: 0 0 26px 6px rgba(122,94,154,0.30) } 100% { box-shadow: 0 0 0 0 rgba(122,94,154,0) } }`}</style>}
      {/* Left accent bar */}
      <div aria-hidden="true" style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
        background: locked ? withAlpha(pig.base, '40') : pig.deep,
        opacity: locked ? 0.5 : 0.85,
      }} />

      {/* Top row — icon + tier */}
      <div style={{
        display: 'flex', alignItems: 'flex-start',
        justifyContent: 'space-between', gap: 8,
      }}>
        <div aria-hidden="true" style={{
          width: 34, height: 34, borderRadius: 9,
          background: withAlpha(pig.base, '1A'),
          border: `1px solid ${withAlpha(pig.base, '40')}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: locked ? inkLight : pig.deep,
        }}>
          <Icon id={locked ? 'ico-lock' : card.icon} size={17} />
        </div>
        {badge && (
          <span style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 9, letterSpacing: 1.4, textTransform: 'uppercase',
            color: badge.color, fontWeight: 500,
            display: 'inline-flex', alignItems: 'center', gap: 3,
            marginTop: 2,
          }}>
            <span aria-hidden="true" style={{ fontSize: 7 }}>{badge.mark}</span>
            {badge.label}
          </span>
        )}
      </div>

      {/* Title + short body */}
      <div style={{ marginTop: 'auto' }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 17, fontWeight: 500, color: ink, lineHeight: 1.08,
        }}>{card.title}</div>
        <div style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 11.5, lineHeight: 1.4, color: inkLight,
          marginTop: 4,
        }}>{card.short || card.body}</div>
      </div>
    </button>
  );
}

function ctaStyle(baseColor, fgColor) {
  return {
    appearance: 'none',
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '10px 18px', borderRadius: 999,
    border: `1px solid ${withAlpha(baseColor, '40')}`,
    background: withAlpha(baseColor, '10'),
    color: fgColor, cursor: 'pointer',
    fontFamily: "'EB Garamond', Georgia, serif",
    fontSize: 13, letterSpacing: 0.4,
  };
}
