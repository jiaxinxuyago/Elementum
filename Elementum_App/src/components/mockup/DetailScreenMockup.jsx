// ===================================================================
// ELEMENTUM · DetailScreen Mockup (concept)
//
// Visual mockup of the post-Reveal Detail page (Blocks grid).
// Reachable at hash #/mockup-detail (dev-only). Renders 庚's actual
// blocks[].label + blocks[].text.default verbatim from archetypeSource.js
// — no logic, no variant resolver, no chart context. Just the visual.
//
// What the real Detail page would add:
//   - Variant resolver: text.{band_pattern} → text.{band} → text.{pattern} → text.default
//   - Priority sort: blocks[].priority drives render order
//   - Chart context wiring (band, tgPattern from useChart)
//   - Hooked navigation: ← back to Reveal, scroll progress
// ===================================================================

import React from 'react';
import { STEM_CARD_DATA } from '../../content/archetypeSource.js';
import {
  INK, INK_SOFT, INK_LIGHT,
  SILK, PAPER_HAIR,
  BRONZE_MID, BRONZE_DARK, WALNUT,
  PIG_METAL, PIG_SEAL,
  StatusBar, BrushUnderline, SealDot,
} from '../../styles/tokens.jsx';

const STEM = STEM_CARD_DATA['庚'];

export default function DetailScreenMockup({ onBack }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: SILK,
        overflowY: 'auto',
        fontFamily: "'EB Garamond', serif",
        color: INK,
      }}
    >
      <StatusBar tint={INK} />

      {/* ── Mini-header: archetype identity strip ─────────────── */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background:
            'linear-gradient(180deg, rgba(241,233,214,0.96) 0%, rgba(241,233,214,0.94) 70%, rgba(241,233,214,0) 100%)',
          backdropFilter: 'blur(6px)',
          padding: '50px 24px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: INK_SOFT,
            fontSize: 22,
            cursor: 'pointer',
            padding: 0,
            lineHeight: 1,
            fontFamily: 'inherit',
          }}
          aria-label="Back to Reveal"
        >
          ←
        </button>
        <div style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: 0.3 }}>庚</span>
          <span style={{ fontSize: 13, color: INK_LIGHT, letterSpacing: 0.4 }}>
            {STEM.identity.archetypeName} · Yang Metal
          </span>
        </div>
        <span style={{ fontSize: 11, color: INK_LIGHT, letterSpacing: 1.5, textTransform: 'uppercase' }}>
          Reading
        </span>
      </header>

      {/* ── Page title ────────────────────────────────────────── */}
      <section style={{ padding: '8px 32px 24px' }}>
        <div style={{ fontSize: 11, color: BRONZE_MID, letterSpacing: 2.4, textTransform: 'uppercase', marginBottom: 6 }}>
          Section 1 · Elemental Nature
        </div>
        <h1 style={{
          fontFamily: "'EB Garamond', serif",
          fontStyle: 'italic',
          fontSize: 28,
          margin: 0,
          letterSpacing: 0.3,
          color: INK,
        }}>
          Your reading
        </h1>
        <div style={{ marginTop: 8 }}>
          <BrushUnderline w={140} />
        </div>
        <p style={{ fontSize: 13, color: INK_LIGHT, marginTop: 12, lineHeight: 1.55 }}>
          {STEM.subtitle}
        </p>

        {/* Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
          {STEM.chips.map((c) => (
            <span
              key={c}
              style={{
                fontSize: 11,
                padding: '4px 10px',
                borderRadius: 14,
                border: `1px solid ${PAPER_HAIR}`,
                background: 'rgba(248,241,225,0.6)',
                color: INK_SOFT,
                letterSpacing: 0.3,
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* ── Your Nature opener (single anchor block before grid) ── */}
      <section style={{ padding: '0 32px 28px' }}>
        <p style={{
          fontSize: 17,
          lineHeight: 1.62,
          fontStyle: 'italic',
          color: INK_SOFT,
          margin: 0,
          letterSpacing: 0.1,
          paddingLeft: 14,
          borderLeft: `2px solid ${BRONZE_MID}55`,
        }}>
          {STEM.yourNature.desc}
        </p>
      </section>

      {/* ── Blocks grid ───────────────────────────────────────── */}
      <section style={{ padding: '0 32px 12px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          margin: '12px 0 22px',
        }}>
          <span style={{ fontSize: 11, color: BRONZE_MID, letterSpacing: 2.4, textTransform: 'uppercase' }}>
            The reading · {STEM.blocks.length} chapters
          </span>
          <span style={{ flex: 1, height: 1, background: PAPER_HAIR, opacity: 0.6 }} />
        </div>

        {STEM.blocks.map((block, i) => (
          <BlockCard key={block.label} block={block} index={i} />
        ))}
      </section>

      {/* ── Footer (placeholder for tier upsell or next-section nav) ── */}
      <footer style={{ padding: '32px 32px 80px', textAlign: 'center' }}>
        <SealDot size={14} style={{ margin: '0 auto 12px' }} />
        <div style={{ fontSize: 11, color: INK_LIGHT, letterSpacing: 1.6, textTransform: 'uppercase' }}>
          Continues — The Force, The Edge in Motion, The Forging Season
        </div>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Single block card — label + body text (default variant only).
// In production, body comes from the variant resolver.
// ─────────────────────────────────────────────────────────────
function BlockCard({ block, index }) {
  const text = block.text?.default || '';
  const paragraphs = text.split(/\n\n+/);

  return (
    <article style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
        <span style={{
          fontSize: 11,
          color: BRONZE_MID,
          letterSpacing: 1.8,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          minWidth: 22,
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <h2 style={{
          fontSize: 17,
          fontWeight: 600,
          margin: 0,
          color: INK,
          letterSpacing: 0.2,
          flex: 1,
        }}>
          {block.label}
        </h2>
      </div>

      <div style={{ paddingLeft: 32 }}>
        {paragraphs.map((p, i) => (
          <p key={i} style={{
            fontSize: 14.5,
            lineHeight: 1.68,
            color: INK_SOFT,
            margin: i === 0 ? '4px 0 12px' : '0 0 12px',
            letterSpacing: 0.05,
          }}>
            {p}
          </p>
        ))}

        {/* Variant signature footer (debug-style hint, will be removed in production) */}
        <div style={{
          fontSize: 10,
          color: INK_LIGHT,
          opacity: 0.5,
          letterSpacing: 1.2,
          textTransform: 'uppercase',
          marginTop: 4,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        }}>
          variants: {Object.keys(block.text || {}).join(' · ')}
        </div>
      </div>
    </article>
  );
}
