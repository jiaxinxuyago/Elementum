// ===================================================================
// ELEMENTUM · DetailShell
// ===================================================================
// Shared wrapper for any reading-detail page. Two header modes:
//
//   · TEXT header (default) — back button + eyebrow + Cormorant title.
//   · HERO header (pass `hero`) — full-bleed SceneHero (painterly art +
//     gradient veil + overlaid title) with the back button floating over
//     it. Mooon scene-hero + The Pattern reference (P3).
//
// Plus: optional painted page background, scrollable body.
// Spec: DOC5 §11 "DetailShell wrapper" (authoritative per §AM.1).
// ===================================================================

import React from 'react';
import { Icon } from '../../shared/icons';
import PageBg from '../../shared/PageBg.jsx';
import { SceneHero } from '../VisualTile.jsx';
import { getReadingSections } from './sections.js';
import { useChart } from '../../../store/chartContext.jsx';
import {
  ink, inkSoft, inkLight, bronzeDark, paperHair, silk, cardstockBg,
  withAlpha,
} from '../../../styles/tokens';

export default function DetailShell({
  onBack,
  eyebrow,                 // text-mode eyebrow, e.g. "ELEMENTAL NATURE · 元素之性"
  title,                   // text-mode title
  pigment,                 // optional — tints the eyebrow / hero veil
  hero,                    // optional { element, artSrc, eyebrow, title, subtitle } → hero mode
  sectionKey,              // optional FLOW route key → enables prev/next sequence strip
  background = silk,
  bg,                      // optional { src, opacity } painted background
  children,
}) {
  const { chart } = useChart();
  const eyebrowColor = pigment ? withAlpha(pigment, 'CC') : bronzeDark;
  const heroMode = !!hero;

  // Reading-sequence position (DOC5 §11 prev/next + "X of N").
  const sections = sectionKey ? getReadingSections(chart) : [];
  const idx = sectionKey ? sections.findIndex((s) => s.key === sectionKey) : -1;
  const prev = idx > 0 ? sections[idx - 1] : null;
  const next = idx >= 0 && idx < sections.length - 1 ? sections[idx + 1] : null;
  const goSection = (key) => () => { if (typeof window !== 'undefined') window.location.hash = `#/${key}`; };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100%',
        background,
        // Hero bleeds to the top edge; text mode keeps the 54px status reserve.
        padding: heroMode ? '0 0 24px' : '54px 0 24px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Painted background layer (behind body content) */}
      {bg && <PageBg src={bg.src} opacity={bg.opacity} gradient={bg.gradient} />}

      {/* Back button — floats top-left. In hero mode it gets a translucent
          backing so it stays legible over the painterly art. */}
      <button
        type="button"
        aria-label="Back"
        onClick={onBack}
        style={{
          position: 'absolute',
          top: heroMode ? 52 : 56, left: 16,
          width: 36, height: 36,
          borderRadius: 999,
          background: heroMode ? 'rgba(248,246,240,0.85)' : 'transparent',
          backdropFilter: heroMode ? 'blur(8px)' : 'none',
          WebkitBackdropFilter: heroMode ? 'blur(8px)' : 'none',
          border: 'none',
          color: inkSoft,
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 10,
          boxShadow: heroMode ? '0 2px 8px rgba(0,0,0,0.12)' : 'none',
        }}
      >
        <Icon id="ico-back" size={heroMode ? 20 : 22} />
      </button>

      {/* ── HERO header ─────────────────────────────────────────────── */}
      {heroMode && (
        <div style={{ position: 'relative', zIndex: 1, marginBottom: 18 }}>
          <SceneHero
            element={hero.element || pigment}
            pigment={hero.element || pigment}
            artSrc={hero.artSrc}
            eyebrow={hero.eyebrow}
            title={hero.title}
            subtitle={hero.subtitle}
            height={248}
            radius={0}
            contentBottom={18}
          />
        </div>
      )}

      {/* ── TEXT header ─────────────────────────────────────────────── */}
      {!heroMode && (
        <header
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '8px 22px 12px',
            marginLeft: 36,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <span style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
            color: eyebrowColor, fontWeight: 500,
          }}>
            {eyebrow}
          </span>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 32, fontWeight: 400, lineHeight: 1.15, color: ink, margin: 0,
          }}>
            {title}
          </h1>
        </header>
      )}

      {/* Scrollable body */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          padding: '8px 22px 0',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}

        {/* Prev/next sequence strip (DOC5 §11) */}
        {idx >= 0 && (
          <nav
            aria-label="Reading sequence"
            style={{
              display: 'flex', alignItems: 'stretch', gap: 8,
              margin: '20px 0 8px',
            }}
          >
            <SeqButton dir="prev" section={prev} onClick={prev ? goSection(prev.key) : undefined} />
            <div style={{
              flexShrink: 0, alignSelf: 'center',
              fontFamily: "'EB Garamond', Georgia, serif", fontSize: 11.5,
              letterSpacing: 0.5, color: inkLight, padding: '0 4px',
            }}>
              {idx + 1} of {sections.length}
            </div>
            <SeqButton dir="next" section={next} onClick={next ? goSection(next.key) : undefined} />
          </nav>
        )}
      </div>
    </div>
  );
}

// Prev/next strip button. Disabled (dimmed) at the ends.
function SeqButton({ dir, section, onClick }) {
  const isNext = dir === 'next';
  const enabled = !!section;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!enabled}
      aria-label={enabled ? `${isNext ? 'Next' : 'Previous'}: ${section.tag}` : undefined}
      style={{
        flex: 1, minWidth: 0,
        appearance: 'none', cursor: enabled ? 'pointer' : 'default',
        background: cardstockBg, border: `1px solid ${paperHair}`,
        borderRadius: 12, padding: '10px 12px',
        opacity: enabled ? 1 : 0.4,
        display: 'flex', alignItems: 'center', gap: 8,
        justifyContent: isNext ? 'flex-end' : 'flex-start',
        textAlign: isNext ? 'right' : 'left',
      }}
    >
      {!isNext && <Icon id="ico-chev-l" size={15} color={bronzeDark} />}
      <span style={{ minWidth: 0 }}>
        <span style={{
          display: 'block', fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase', color: inkLight,
        }}>{isNext ? 'Next' : 'Previous'}</span>
        <span style={{
          display: 'block', fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 15, fontWeight: 500, color: ink, lineHeight: 1.15,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{section ? section.tag : '—'}</span>
      </span>
      {isNext && <Icon id="ico-chev-r" size={15} color={bronzeDark} />}
    </button>
  );
}
