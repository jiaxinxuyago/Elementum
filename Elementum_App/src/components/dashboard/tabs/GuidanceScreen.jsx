// ===================================================================
// ELEMENTUM · GuidanceScreen (DOC5 §12 — Premium Feature Hub)
// ===================================================================
// Vertical card stack of premium features. Free users see the full hub
// with locked states; cards above the current tier show a lock + an
// "Unlock" CTA that opens the shared upgrade modal (Q5.c).
//
// Cards (DOC5 §12):
//   1. Elemental Draw   (Free)    — daily question ritual
//   2. Energy Manual    (Seeker)  — 5-domain living document
//   3. Self-Report      (Seeker)  — calibration questionnaire
//   4. AI Consultant    (Advisor) — chat with your chart
//   5. BaZi Codex       (Free→Seeker) — the educational layer
//
// Feature interactions (card-draw flip, AI streaming, etc.) are out of
// scope for this pass — the hub presents the full IA with tier-locks so
// the user sees the shape of the product (DOC5 §1 "depth on demand").
// ===================================================================

import React from 'react';
import { useChart } from '../../../store/chartContext.jsx';
import { useUpgrade } from '../UpgradeModal.jsx';
import { Icon } from '../../shared/icons';
import {
  ink, inkSoft, inkLight, bronzeDark, gold, advisor,
  paperHair, quietBorder, parchment, pigments, withAlpha,
} from '../../../styles/tokens';

const TIER_RANK = { free: 0, seeker: 1, advisor: 2 };

// Each feature owns an element pigment for visual variety down the hub
// (purely aesthetic — gives the icon tile + accent a distinct hue).
const CARDS = [
  {
    key: 'draw',
    title: 'Elemental Draw',
    tier: 'free',
    icon: 'read-elemental',
    pigment: 'wood',
    route: 'app-draw',
    cta: "Draw today's card",
    body: "A daily question drawn from the day's elemental current. Today's deck follows the energy governing your Today tab.",
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
  },
  {
    key: 'selfreport',
    title: 'Self-Report',
    tier: 'seeker',
    icon: 'ico-edit',
    pigment: 'metal',
    route: 'app-selfreport',
    cta: 'Update your context',
    body: 'A short calibration that tunes your readings to how your energy actually shows up — not just how the chart computes it.',
  },
  {
    key: 'consultant',
    title: 'AI Consultant',
    tier: 'advisor',
    icon: 'tab-guidance',
    pigment: 'water',
    route: 'app-consultant',
    cta: 'Open the conversation',
    body: 'Ask anything. A consultant that has read your full chart and Manual, available whenever you need to think something through.',
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
    body: 'The educational layer — what the concepts mean and why they matter. Basics are free; advanced entries unlock with Seeker.',
  },
];

export default function GuidanceScreen({ onOpen }) {
  const { tier } = useChart();
  const { openUpgrade, advisorGlow } = useUpgrade();
  const currentRank = TIER_RANK[tier] ?? 0;

  return (
    <main style={{ minHeight: '100%', padding: '54px 20px 24px' }}>
      {/* Page header */}
      <header style={{ marginBottom: 22 }}>
        <span style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
          color: bronzeDark, fontWeight: 500,
        }}>
          Guidance · 引 路
        </span>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 38, fontWeight: 400, lineHeight: 1.1,
          color: ink, margin: '6px 0 0',
        }}>
          Guidance
        </h1>
      </header>

      {/* Feature cards */}
      {CARDS.map((card) => {
        const requiredRank = TIER_RANK[card.tier] ?? 0;
        const locked = currentRank < requiredRank;
        return (
          <FeatureCard
            key={card.key}
            card={card}
            locked={locked}
            glow={advisorGlow && card.key === 'consultant'}
            onUnlock={() => openUpgrade(card.title)}
            onOpen={card.route && !locked ? () => onOpen?.(card.route) : undefined}
          />
        );
      })}
    </main>
  );
}

function tierBadge(tierKey) {
  if (tierKey === 'advisor') return { mark: '✦', label: 'Advisor', color: advisor };
  if (tierKey === 'seeker') return { mark: '◆', label: 'Seeker', color: bronzeDark };
  return null;
}

// ───────────────────────────────────────────────────────────────────
// FeatureCard — one hub feature. Locked variant dims + adds an Unlock CTA.
// ───────────────────────────────────────────────────────────────────
function FeatureCard({ card, locked, onUnlock, onOpen, glow }) {
  const badge = tierBadge(card.tier);
  const pig = pigments[card.pigment] || pigments.metal;
  return (
    <section style={{
      background: '#FDFBF8',
      border: `1px solid ${quietBorder}`,
      borderRadius: 20,
      padding: '22px 22px 22px 24px',
      marginBottom: 16,
      position: 'relative',
      overflow: 'hidden',
      animation: glow ? 'advisorGlow 1200ms ease-in-out' : 'none',
    }}>
      {glow && <style>{`@keyframes advisorGlow { 0% { box-shadow: 0 0 0 0 rgba(122,94,154,0) } 50% { box-shadow: 0 0 30px 8px rgba(122,94,154,0.30) } 100% { box-shadow: 0 0 0 0 rgba(122,94,154,0) } }`}</style>}
      {/* Left accent bar in the feature's pigment */}
      <div aria-hidden="true" style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
        background: locked ? withAlpha(pig.base, '40') : pig.deep,
        opacity: locked ? 0.5 : 0.85,
      }} />

      {/* Tier badge top-right */}
      {badge && (
        <span style={{
          position: 'absolute',
          top: 18, right: 18,
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase',
          color: badge.color, fontWeight: 500,
          display: 'inline-flex', alignItems: 'center', gap: 4,
        }}>
          <span aria-hidden="true">{badge.mark}</span>{badge.label}
        </span>
      )}

      {/* Icon tile — pigment-tinted, rounded square (matches tile language) */}
      <div aria-hidden="true" style={{
        width: 44, height: 44, borderRadius: 12,
        background: withAlpha(pig.base, '1A'),
        border: `1px solid ${withAlpha(pig.base, '40')}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: locked ? inkLight : pig.deep,
        marginBottom: 16,
      }}>
        <Icon id={locked ? 'ico-lock' : card.icon} size={22} />
      </div>

      <h2 style={{
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 20, color: ink, margin: '0 0 8px', fontWeight: 500,
      }}>
        {card.title}
      </h2>
      <p style={{
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 15, lineHeight: 1.65, color: inkSoft,
        margin: locked ? '0 0 16px' : 0,
      }}>
        {card.body}
      </p>

      {/* Unlock CTA — only when locked */}
      {locked && (
        <button
          type="button"
          onClick={onUnlock}
          style={{
            appearance: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '10px 18px',
            borderRadius: 999,
            border: `1px solid ${withAlpha(gold, '40')}`,
            background: withAlpha(gold, '10'),
            color: bronzeDark,
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 13,
            letterSpacing: 0.4,
            cursor: 'pointer',
          }}
        >
          Unlock with {tierBadge(card.tier)?.label}
          <Icon id="ico-arrow-r" size={13} color={bronzeDark} />
        </button>
      )}

      {/* Open CTA — unlocked cards with a destination (e.g. Codex) */}
      {!locked && onOpen && (
        <button
          type="button"
          onClick={onOpen}
          style={{
            appearance: 'none', marginTop: 16,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '10px 18px', borderRadius: 999,
            border: `1px solid ${withAlpha(pig.base, '40')}`,
            background: withAlpha(pig.base, '10'),
            color: pig.deep, cursor: 'pointer',
            fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13, letterSpacing: 0.4,
          }}
        >
          {card.cta || 'Open'}
          <Icon id="ico-arrow-r" size={13} color={pig.deep} />
        </button>
      )}
    </section>
  );
}
