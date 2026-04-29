// ===================================================================
// ELEMENTUM · Reveal Mockup v2 (DOC5 §9 v1.8 adaptation)
//
// Reachable at #/mockup-reveal-v2.
//
// Demonstrates the full Reveal scroll with the v1.8 Section 2
// redesign — identity ribbon + segmented-block bars — using the
// SAME primitives that drive the Energy Map dashboard. The cascade
// from Reveal → Dashboard is literal: same components, smaller scope.
//
// Section 1 is rendered as a stylised placeholder. The real
// painted-hero implementation lives in RevealScreen.jsx and is
// intentionally NOT duplicated here.
// ===================================================================

import React from 'react';
import {
  INK, INK_SOFT, INK_LIGHT, INK_MIST,
  WALNUT, BRONZE_MID,
  PAPER_HAIR,
  PIG_METAL, PIG_WOOD, PIG_FIRE, PIG_EARTH, PIG_WATER,
  StatusBar, BrushUnderline, ElementSign, SealDot,
} from '../../styles/tokens.jsx';
import {
  PAGE_BG, CARD_BG, CARD_BORDER, TAG_GREY, TITLE_INK,
  IdentityRibbon, SegmentedBar,
} from './_shared.jsx';

// ── 庚 reference data (same as Energy Map mockup — the cascade) ──
const DM = {
  stem: '庚',
  stemPinyin: 'GENG',
  element: 'Metal',
  elementColor: PIG_METAL,
  polarity: 'Yang',
  saturation: 0.92,
  saturationLine: 'Your core element saturates the chart — there is very little counterbalance to what you already are.',
  bandChips: ['Overpowering', 'Concentrated'],
};

const COMPOSITION = [
  { key: 'metal', label: 'Metal',  color: PIG_METAL, count: 4, isDM: true },
  { key: 'wood',  label: 'Wood',   color: PIG_WOOD,  count: 2 },
  { key: 'earth', label: 'Earth',  color: PIG_EARTH, count: 1 },
  { key: 'water', label: 'Water',  color: PIG_WATER, count: 1 },
  { key: 'fire',  label: 'Fire',   color: PIG_FIRE,  count: 0 },
];

const MISSING = COMPOSITION.find(c => c.count === 0);

export default function RevealMockupV2({ onContinue, onBack }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: PAGE_BG,
        overflowY: 'auto',
        fontFamily: "'EB Garamond', serif",
        color: INK,
      }}
    >
      <StatusBar tint={INK} />

      {/* Top right back link (dev affordance — not in shipping Reveal) */}
      <button
        onClick={onBack}
        style={{
          position: 'absolute',
          top: 50, right: 16,
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'inherit', fontSize: 11, color: INK_LIGHT,
          padding: '4px 8px', letterSpacing: 0.4,
          opacity: 0.6,
          zIndex: 50,
        }}
      >
        ← back
      </button>

      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — Identity (stylised placeholder)
          The real painted hero stem mark + animation lives in
          RevealScreen.jsx. Recreated minimally here so the
          Section 2 cascade reads in proper context.
          ═══════════════════════════════════════════════════════ */}
      <Section1Placeholder />

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — Energy Blueprint (NEW v1.8 vocabulary)
          ═══════════════════════════════════════════════════════ */}
      <Section2 dm={DM} composition={COMPOSITION} missing={MISSING} />

      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — Balance Prescription (conditional, simplified)
          ═══════════════════════════════════════════════════════ */}
      {MISSING && <Section3 missing={MISSING} />}

      {/* ═══════════════════════════════════════════════════════
          SECTION 4 — CTA → Dashboard
          ═══════════════════════════════════════════════════════ */}
      <Section4 onContinue={onContinue} dmColor={DM.elementColor} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 1 — Identity placeholder
// (Stylised; for full implementation see RevealScreen.jsx.)
// ─────────────────────────────────────────────────────────────
function Section1Placeholder() {
  return (
    <section
      style={{
        minHeight: 720,
        padding: '90px 32px 60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Painted blade placeholder — the real implementation uses BladeJian SVG */}
      <div
        style={{
          marginTop: 20,
          fontFamily: 'Noto Serif SC, serif',
          fontSize: 92,
          fontWeight: 400,
          color: INK,
          opacity: 0.92,
          letterSpacing: 0,
          lineHeight: 1,
          marginBottom: 30,
        }}
      >
        庚
      </div>

      <div
        style={{
          fontSize: 11,
          letterSpacing: 4,
          textTransform: 'uppercase',
          color: INK_LIGHT,
          marginBottom: 12,
        }}
      >
        You are…
      </div>

      <h1
        style={{
          fontFamily: "'Cormorant Garamond', 'EB Garamond', serif",
          fontSize: 44,
          fontWeight: 600,
          color: WALNUT,
          letterSpacing: 1,
          margin: '0 0 12px',
          textShadow: '0 2px 4px rgba(139,115,85,0.15)',
        }}
      >
        THE BLADE
      </h1>

      <BrushUnderline w={140} />

      <p
        style={{
          fontFamily: "'Cormorant Garamond', 'EB Garamond', serif",
          fontStyle: 'italic',
          fontSize: 22,
          fontWeight: 500,
          color: INK_SOFT,
          letterSpacing: 0.3,
          lineHeight: 1.3,
          maxWidth: 320,
          margin: '20px 0 26px',
        }}
      >
        Precision before intention
      </p>

      {/* Three flat silk badge tiles */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 26 }}>
        <BadgeTile label="Metal">
          <ElementSign element="metal" size={32} color={PIG_METAL} />
        </BadgeTile>
        <BadgeTile label="GĒNG">
          <span style={{
            fontFamily: 'Noto Serif SC, serif',
            fontSize: 26,
            color: PIG_METAL,
          }}>庚</span>
        </BadgeTile>
        <BadgeTile label="Yang">
          <YinYangGlyph polarity="yang" color={PIG_METAL} size={28} />
        </BadgeTile>
      </div>

      <p
        style={{
          fontSize: 15,
          color: INK_SOFT,
          lineHeight: 1.7,
          maxWidth: 320,
          margin: 0,
          letterSpacing: 0.05,
        }}
      >
        An edge is never given — it is forged. The blade does not hesitate;
        it was not chosen, only found, already sharp.
      </p>

      <div
        style={{
          marginTop: 60,
          fontSize: 10,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: INK_MIST,
          opacity: 0.6,
        }}
      >
        ↓ scroll
      </div>

      {/* Annotation */}
      <div
        style={{
          marginTop: 12,
          fontSize: 9,
          letterSpacing: 1.4,
          textTransform: 'uppercase',
          color: INK_MIST,
          opacity: 0.5,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        }}
      >
        [§1: identity — placeholder. real impl: RevealScreen.jsx]
      </div>
    </section>
  );
}

function BadgeTile({ label, children }) {
  return (
    <div
      style={{
        width: 84,
        height: 84,
        borderRadius: 16,
        background: 'rgba(248,241,225,0.92)',
        border: `1px solid ${PAPER_HAIR}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
      }}
    >
      {children}
      <span
        style={{
          fontSize: 10,
          letterSpacing: 1.6,
          textTransform: 'uppercase',
          color: INK_LIGHT,
          fontFamily: 'inherit',
          fontWeight: 500,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function YinYangGlyph({ polarity, color, size = 28 }) {
  const isYang = polarity === 'yang';
  return (
    <svg viewBox="0 0 28 28" width={size} height={size} style={{ display: 'block' }}>
      <circle cx="14" cy="14" r="12" stroke={color} strokeWidth="1.5" fill="none" />
      {isYang ? (
        <>
          <path d="M 14 2 A 12 12 0 0 1 14 26 A 6 6 0 0 0 14 14 A 6 6 0 0 1 14 2 Z" fill={color} />
          <circle cx="14" cy="8" r="1.6" fill={color === PIG_METAL ? '#F1E9D6' : '#1a1815'} />
        </>
      ) : (
        <>
          <path d="M 14 2 A 12 12 0 0 0 14 26 A 6 6 0 0 1 14 14 A 6 6 0 0 0 14 2 Z" fill={color} />
          <circle cx="14" cy="20" r="1.6" fill={color === PIG_METAL ? '#F1E9D6' : '#1a1815'} />
        </>
      )}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 2 — Energy Blueprint (NEW v1.8)
// Identity ribbon + segmented-block composition bars + missing
// callout. This is the cascade vocabulary — identical primitives
// reused on the Energy Map dashboard.
// ─────────────────────────────────────────────────────────────
function Section2({ dm, composition, missing }) {
  return (
    <section
      style={{
        padding: '40px 16px 40px',
        position: 'relative',
      }}
    >
      <SectionLabel color={dm.elementColor}>Your Energy Blueprint</SectionLabel>

      <IdentityRibbon dm={dm} />

      <article
        style={{
          background: CARD_BG,
          border: `1px solid ${CARD_BORDER}`,
          borderRadius: 14,
          padding: 16,
          marginBottom: 12,
        }}
      >
        <p style={{
          fontStyle: 'italic', fontSize: 13, lineHeight: 1.55,
          color: INK_LIGHT, margin: '0 0 14px',
        }}>
          The pattern of all five energies across your four pillars — what is present,
          what dominates, and what is absent.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {composition.map((row) => (
            <CompositionRow key={row.key} row={row} />
          ))}
        </div>
      </article>

      {missing && (
        <div
          style={{
            background: `${missing.color}10`,
            border: `1px solid ${missing.color}40`,
            borderRadius: 14,
            padding: 16,
            marginBottom: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <ElementSign element={missing.key} size={18} color={missing.color} />
            <span style={{
              fontSize: 13.5,
              color: missing.color,
              fontWeight: 500,
              letterSpacing: 0.3,
            }}>
              Your {missing.label} is missing
            </span>
          </div>
          <p style={{
            fontSize: 13,
            color: INK_SOFT,
            margin: 0,
            lineHeight: 1.55,
          }}>
            Without {missing.label}, the precision has no purposeful target — it runs
            in atmosphere, looking for something worthy to cut.
          </p>
        </div>
      )}

      {/* Cascade hint: this same vocabulary reappears on the dashboard */}
      <div
        style={{
          marginTop: 24,
          textAlign: 'center',
          fontSize: 10,
          letterSpacing: 1.6,
          textTransform: 'uppercase',
          color: INK_MIST,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          opacity: 0.55,
        }}
      >
        ─── this vocabulary continues on the dashboard ───
      </div>
    </section>
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

// ─────────────────────────────────────────────────────────────
// SECTION 3 — Balance Prescription (conditional)
// ─────────────────────────────────────────────────────────────
function Section3({ missing }) {
  return (
    <section style={{ padding: '20px 16px 40px' }}>
      <SectionLabel color={missing.color}>What Balances You</SectionLabel>

      <article
        style={{
          background: CARD_BG,
          border: `1px solid ${CARD_BORDER}`,
          borderRadius: 14,
          padding: 18,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <ElementSign element={missing.key} size={20} color={missing.color} />
          <span style={{
            fontSize: 13,
            letterSpacing: 2.2,
            textTransform: 'uppercase',
            fontWeight: 600,
            color: missing.color,
          }}>
            Cultivate {missing.label}
          </span>
        </div>

        <PrescriptionCategory
          icon="○"
          title="Environment"
          items={['Sun-warmed spaces', 'Open hearths and candle-lit corners', 'Places of warmth']}
        />
        <PrescriptionCategory
          icon="◇"
          title="Colors"
          items={['Vermilion · ember red', 'Gold-leaf accents', 'Sun-glaze ochre']}
        />
        <PrescriptionCategory
          icon="✦"
          title="Timing"
          items={['Summer months · 巳午未', 'High noon hours', '丙 / 丁 stem days']}
        />
      </article>
    </section>
  );
}

function PrescriptionCategory({ icon, title, items }) {
  return (
    <div style={{ paddingTop: 12, borderTop: `1px solid ${PAPER_HAIR}50`, marginTop: 12 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        marginBottom: 6,
      }}>
        <span style={{ fontSize: 13, color: BRONZE_MID, opacity: 0.7 }}>{icon}</span>
        <span style={{
          fontSize: 11,
          letterSpacing: 1.4,
          textTransform: 'uppercase',
          color: '#584A3E',
          fontWeight: 600,
        }}>
          {title}
        </span>
      </div>
      <ul style={{
        listStyle: 'none',
        margin: 0,
        padding: '0 0 0 20px',
        fontSize: 13,
        lineHeight: 1.6,
        color: INK_SOFT,
      }}>
        {items.map((it, i) => (
          <li key={i} style={{ marginBottom: 2 }}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION 4 — CTA → Dashboard
// ─────────────────────────────────────────────────────────────
function Section4({ onContinue, dmColor }) {
  return (
    <section
      style={{
        padding: '40px 32px 90px',
        textAlign: 'center',
      }}
    >
      <SealDot size={14} style={{ margin: '0 auto 20px' }} />
      <p
        style={{
          fontFamily: "'Cormorant Garamond', 'EB Garamond', serif",
          fontStyle: 'italic',
          fontSize: 16,
          color: INK_LIGHT,
          margin: '0 0 24px',
          lineHeight: 1.5,
          maxWidth: 280,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        Your reading begins.
      </p>
      <button
        onClick={onContinue}
        style={{
          background: INK,
          color: '#F1E9D6',
          border: 'none',
          borderRadius: 14,
          padding: '14px 32px',
          fontFamily: 'inherit',
          fontSize: 15,
          fontWeight: 500,
          letterSpacing: 0.6,
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        }}
      >
        Enter Your Dashboard →
      </button>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Section label — small uppercase tag in element color @ 80%
// (DOC5 §3 lines 147–160)
// ─────────────────────────────────────────────────────────────
function SectionLabel({ color, children }) {
  return (
    <div
      style={{
        fontSize: 10,
        letterSpacing: 2.5,
        textTransform: 'uppercase',
        color: `${color}cc`,
        marginBottom: 14,
        fontFamily: "'EB Garamond', serif",
        fontWeight: 600,
        paddingLeft: 4,
      }}
    >
      {children}
    </div>
  );
}
