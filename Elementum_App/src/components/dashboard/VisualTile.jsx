// ===================================================================
// ELEMENTUM · VisualTile + SceneHero
// ===================================================================
// "Inkstone" Card Art System from the Thumbnail Card Moodboard.
//
// One ink-wash treatment applied across every card surface in Elementum.
// The painting carries the imagery; element identity enters through a
// restrained pigment wash, the seal mark, and the eyebrow — never by
// recolouring the painting.
//
// Three legibility recipes:
//   1. SILK-FOOTER — art fades into opaque silk paper; dark type sits
//      on paper. Default for catalogue tiles (Elemental Nature, etc).
//   2. INK-SCRIM   — dark bottom gradient anchors light type. For
//      full-bleed heroes, Today-hub tiles, stem portraits.
//   3. PIGMENT WASH (17%) — built into both recipes; unifies every
//      painting and signals the element at a glance.
//
// Plus: 50% saturate / 20% silk veil / SVG-noise grain on every art
// layer so the paintings look like they share a paper.
// ===================================================================

import React, { useState } from 'react';
import { Icon } from '../shared/icons';
import {
  ink, inkSoft, inkLight, cream, silk, paperHair, gold, bronzeDark,
  pigments, withAlpha,
} from '../../styles/tokens';

const ELEMENT_TO_PIGMENT = {
  Metal: 'metal', Wood: 'wood', Fire: 'fire', Earth: 'earth', Water: 'water',
  metal: 'metal', wood: 'wood', fire: 'fire', earth: 'earth', water: 'water',
};

function resolvePigment(key) {
  const k = ELEMENT_TO_PIGMENT[key] || 'metal';
  return { key: k, base: pigments[k].base, deep: pigments[k].deep };
}

// SVG fractal-noise grain — same source as the moodboard for cross-screen
// paper consistency. Re-rendered at 50% overlay blend per the recipe.
const GRAIN_URL =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='120' height='120' filter='url(%23n)' opacity='0.5'/></svg>\")";

// ───────────────────────────────────────────────────────────────────
// MoodboardArt — the shared art-layer stack.
//   1. Painting (saturate .5 · brightness 1.06 · contrast .98)
//   2. Paper veil (20% silk so type stays warm)
//   3. Pigment wash (17% multiply corner — signals the element)
//   4. SVG grain (50% overlay — paper texture)
//   5. Optional bottom ink scrim (for light-type recipes)
//   6. Optional fade-to-silk footer band (for paper-footer recipes)
// ───────────────────────────────────────────────────────────────────
export function MoodboardArt({ src, pigBase, scrim, footerFade, footerColor = silk }) {
  if (!src) return null;
  return (
    <>
      {/* 1. Painting */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("${src}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'contrast(.98) brightness(1.06) saturate(.5)',
      }} />
      {/* 2. Paper veil */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: 'rgba(241,233,214,0.2)',
        pointerEvents: 'none',
      }} />
      {/* 3. Pigment wash — multiply corner */}
      {pigBase && (
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background:
            `linear-gradient(150deg, ${pigBase} 0%, transparent 55%),
             radial-gradient(120% 80% at 50% 110%, ${pigBase} 0%, transparent 60%)`,
          mixBlendMode: 'multiply',
          opacity: 0.17,
          pointerEvents: 'none',
        }} />
      )}
      {/* 4. Grain */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        backgroundImage: GRAIN_URL,
        mixBlendMode: 'overlay',
        opacity: 0.5,
        pointerEvents: 'none',
      }} />
      {/* 5. Bottom ink scrim — for light-type variants */}
      {scrim && (
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background:
            'linear-gradient(to top, rgba(20,17,13,.90) 0%, rgba(20,17,13,.52) 30%, rgba(20,17,13,.10) 58%, rgba(20,17,13,0) 74%)',
          pointerEvents: 'none',
        }} />
      )}
      {/* 6. Fade-to-silk footer band — for paper-footer recipes */}
      {footerFade && (
        <div aria-hidden="true" style={{
          position: 'absolute', left: 0, right: 0, bottom: -1,
          height: '46%',
          background: `linear-gradient(to top, ${footerColor} 8%, ${footerColor}00 100%)`,
          pointerEvents: 'none',
        }} />
      )}
    </>
  );
}

// Round mark badge — backdrop-blur paper chip with element seal at center.
// Used in footer variant (top-left of the art frame).
function MarkBadge({ iconId, pigBase, pigDeep, size = 30 }) {
  return (
    <span aria-hidden="true" style={{
      position: 'absolute',
      top: 10, left: 11,
      width: size, height: size, borderRadius: 999,
      background: 'rgba(248,244,236,0.78)',
      backdropFilter: 'blur(2px)',
      WebkitBackdropFilter: 'blur(2px)',
      border: `1px solid ${withAlpha(pigBase, '40')}`,
      color: pigDeep,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 3,
    }}>
      <Icon id={iconId} size={Math.round(size * 0.55)} />
    </span>
  );
}

// Hanzi watermark — Noto Serif SC at 0.5 opacity. Top-right of frame.
function HanziWatermark({ hanzi, pigDeep, fontSize = 26 }) {
  return (
    <span aria-hidden="true" style={{
      position: 'absolute',
      top: 10, right: 13,
      fontFamily: "'Noto Serif SC', serif",
      fontWeight: 500,
      fontSize, lineHeight: 1,
      color: pigDeep,
      opacity: 0.5,
      zIndex: 3,
    }}>{hanzi}</span>
  );
}

// ───────────────────────────────────────────────────────────────────
// VisualTile — element-tinted thumbnail with the moodboard treatment.
//   variant   'footer' (silk paper footer, dark type) — default for
//             catalogue tiles. 'scrim' (full-bleed art + dark scrim,
//             light type) — used for hub mosaic + feature tiles.
//   pigment   element key
//   iconId    seal-mark id (rendered in the round badge)
//   glyph     optional hanzi rendered as the large mark instead of iconId
//   hanzi     optional hanzi watermark (top-right of art frame)
//   eyebrow   uppercase label (pigment in footer, cream in scrim)
//   title     Cormorant title
//   subtitle  optional secondary line
//   artSrc    moodboard painting URL
//   locked    dim + lock glyph + tier chip
//   tierChip  'Seeker' | 'Advisor'
//   aspect    tile aspect ratio (default 1 = square)
//   height    explicit height (px) — overrides aspect
//   compact   smaller mark + title (for 84-px row tiles)
//   onClick   tap handler
// ───────────────────────────────────────────────────────────────────
export function VisualTile({
  pigment, iconId, glyph, hanzi,
  eyebrow, title, subtitle, artSrc,
  locked = false, tierChip,
  aspect = 1, height, compact = false,
  variant = 'footer',
  titleSize: titleSizeOverride,
  onClick, ariaLabel,
}) {
  const [pressed, setPressed] = useState(false);
  const pig = resolvePigment(pigment);
  const pressable = typeof onClick === 'function';
  const hasArt = !!artSrc && !locked;
  const isFooter = variant === 'footer';

  const pad = compact ? 10 : 12;
  // Default sizes follow the rendered-screens hierarchy:
  //   featured (non-compact, no override) → 21px
  //   compact tile                        → 15px
  //   scrim hub tile                      → 19px
  // Pass `titleSize={17}` for the catalogue's themed pair.
  const titleSize = titleSizeOverride
    ?? (compact ? 15 : (isFooter ? 21 : 19));
  // Eyebrow size is 10px across the system per the rendered moodboard.
  const eyebrowSize = 10;

  return (
    <button
      type="button"
      aria-label={ariaLabel || title}
      onClick={onClick}
      disabled={!pressable}
      onPointerDown={() => pressable && setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        appearance: 'none',
        position: 'relative',
        width: '100%',
        aspectRatio: height ? undefined : String(aspect),
        // `height` is treated as a MINIMUM in footer mode so multi-line
        // eyebrows/titles can push the tile taller instead of clipping.
        // In scrim mode `height` is exact (overlaid text doesn't reflow).
        minHeight: height && isFooter ? height : undefined,
        height: height && !isFooter ? height : undefined,
        borderRadius: 16,
        overflow: 'hidden',
        border: `1px solid ${withAlpha(pig.base, '40')}`,
        background: isFooter ? silk
          : `linear-gradient(135deg, ${withAlpha(pig.base, '10')}, ${withAlpha(pig.base, '40')})`,
        padding: 0,
        cursor: pressable ? 'pointer' : 'default',
        textAlign: 'left',
        display: 'flex', flexDirection: 'column',
        transform: pressed ? 'scale(0.98)' : 'none',
        filter: pressed ? 'brightness(0.97)' : 'none',
        transition: 'transform 120ms cubic-bezier(0.22,1,0.36,1), filter 120ms ease-out',
        opacity: locked ? 0.92 : 1,
        boxShadow: '0 1px 0 rgba(43,39,34,.04), 0 10px 26px rgba(60,46,28,.07)',
      }}
    >
      {/* Art frame — fills remaining space (footer variant) or full-bleed (scrim).
          In footer mode the frame flexes around the content-sized paper footer
          so multi-line titles never clip. */}
      <div style={{
        position: 'relative',
        flex: 1,
        minHeight: isFooter ? 0 : '100%',
        overflow: 'hidden',
      }}>
        {hasArt && (
          <MoodboardArt
            src={artSrc}
            pigBase={pig.base}
            scrim={!isFooter}
            footerFade={isFooter}
            footerColor={silk}
          />
        )}
        {/* Fallback: pigment-tint gradient when no art */}
        {!hasArt && !locked && (
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(135deg, ${withAlpha(pig.base, '10')}, ${withAlpha(pig.base, '40')})`,
          }} />
        )}

        {/* Mark badge top-left (footer variant) OR top-right (scrim variant) */}
        {iconId && !glyph && (
          isFooter
            ? <MarkBadge iconId={locked ? 'ico-lock' : iconId} pigBase={pig.base} pigDeep={pig.deep} size={30} />
            : (
              <div aria-hidden="true" style={{
                position: 'absolute', top: pad, right: pad, zIndex: 3,
                color: locked ? withAlpha(pig.deep, 'CC') : '#F8F6F0',
                opacity: locked ? 0.5 : 0.92, lineHeight: 1,
              }}>
                <Icon id={locked ? 'ico-lock' : iconId} size={compact ? 22 : 36} />
              </div>
            )
        )}
        {glyph && (
          <div aria-hidden="true" style={{
            position: 'absolute', top: pad, right: pad, zIndex: 3,
            color: isFooter ? pig.deep : '#F8F6F0',
            opacity: 0.85, lineHeight: 1,
            fontFamily: "'Noto Serif SC', serif",
            fontSize: compact ? 26 : 40,
          }}>{glyph}</div>
        )}

        {/* Hanzi watermark top-right (footer variant only — in scrim variant
            it conflicts with the mark/icon placement) */}
        {hanzi && isFooter && (
          <HanziWatermark hanzi={hanzi} pigDeep={pig.deep} fontSize={compact ? 20 : 26} />
        )}

        {/* Tier chip — top-left when locked (over scrim) */}
        {locked && tierChip && (
          <span style={{
            position: 'absolute', top: pad, left: pad, zIndex: 3,
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 9, letterSpacing: 1.6, textTransform: 'uppercase',
            fontWeight: 500, color: bronzeDark,
            background: `${gold}28`, padding: '2px 7px', borderRadius: 999,
          }}>
            {/advisor/i.test(tierChip) ? '✦' : '◆'} {tierChip}
          </span>
        )}

        {/* Scrim-variant label block — overlaid on art (bottom-left, light) */}
        {!isFooter && (eyebrow || title) && (
          <div style={{
            position: 'absolute', left: pad, right: pad, bottom: pad, zIndex: 2,
          }}>
            {eyebrow && (
              <div style={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontSize: eyebrowSize, letterSpacing: 2, textTransform: 'uppercase',
                color: 'rgba(248,246,240,0.86)',
                fontWeight: 500, marginBottom: 3,
              }}>{eyebrow}</div>
            )}
            <div style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: titleSize, fontWeight: 500, lineHeight: 1.12,
              color: '#F8F6F0',
            }}>{title}</div>
            {subtitle && (
              <div style={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontSize: 12, lineHeight: 1.4, marginTop: 4,
                color: 'rgba(248,246,240,0.80)',
              }}>{subtitle}</div>
            )}
          </div>
        )}
      </div>

      {/* Silk footer (footer variant only) — eyebrow + title on paper. Sized
          to its content so multi-line eyebrows/titles never clip. The tile's
          `minHeight` grows the whole card if the footer pushes it taller. */}
      {isFooter && (
        <div style={{
          flex: '0 0 auto',
          background: silk,
          padding: compact ? '8px 11px 10px' : '10px 13px 13px',
          display: 'flex', flexDirection: 'column', gap: 2,
        }}>
          {eyebrow && (
            <div style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: eyebrowSize, letterSpacing: 2, textTransform: 'uppercase',
              color: pig.deep, fontWeight: 600, marginBottom: 2,
              lineHeight: 1.35,
            }}>{eyebrow}</div>
          )}
          <div style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: titleSize, fontWeight: 600, lineHeight: 1.06,
            color: ink,
          }}>{title}</div>
          {subtitle && (
            <div style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 12.5, lineHeight: 1.4, color: inkLight, marginTop: 3,
            }}>{subtitle}</div>
          )}
        </div>
      )}
    </button>
  );
}

// ───────────────────────────────────────────────────────────────────
// SceneHero — full-bleed hero with the moodboard treatment + 3px top
// pigment hairline + oversized hanzi watermark at 16% white.
//   artSrc    moodboard painting URL
//   pigment   element key (drives top hairline + pigment wash + fallback tint)
//   eyebrow   small uppercase label (light cream)
//   title     Cormorant hero title (light)
//   subtitle  optional secondary line
//   hanzi     optional bottom-right hanzi watermark (16% white)
//   height    px height (default 200)
//   radius    border-radius (default 22; 0 for bleeding-to-edge heroes)
//   onClick   optional tap handler
// ───────────────────────────────────────────────────────────────────
export function SceneHero({
  artSrc, pigment, eyebrow, title, subtitle, hanzi,
  height = 200, radius = 22, contentBottom = 16,
  onClick, ariaLabel, children,
}) {
  const [pressed, setPressed] = useState(false);
  const pig = resolvePigment(pigment);
  const pressable = typeof onClick === 'function';
  const Tag = pressable ? 'button' : 'div';

  return (
    <Tag
      type={pressable ? 'button' : undefined}
      aria-label={pressable ? (ariaLabel || title) : undefined}
      onClick={onClick}
      onPointerDown={() => pressable && setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        appearance: 'none',
        position: 'relative',
        display: 'block',
        width: '100%',
        height,
        border: radius > 0 ? `1px solid ${withAlpha(pig.base, '40')}` : 'none',
        borderRadius: radius,
        overflow: 'hidden',
        padding: 0,
        cursor: pressable ? 'pointer' : 'default',
        background: `linear-gradient(135deg, ${withAlpha(pig.base, '10')}, ${withAlpha(pig.base, '40')})`,
        transform: pressed ? 'scale(0.99)' : 'none',
        transition: 'transform 140ms cubic-bezier(0.22,1,0.36,1)',
        boxShadow: radius > 0 ? '0 14px 34px rgba(40,30,20,.16)' : 'none',
      }}
    >
      {/* Moodboard art stack + ink scrim */}
      {artSrc && (
        <MoodboardArt
          src={artSrc}
          pigBase={pig.base}
          scrim={true}
        />
      )}

      {/* 3-px top pigment hairline — frames the painting */}
      <div aria-hidden="true" style={{
        position: 'absolute', left: 0, right: 0, top: 0,
        height: 3, background: pig.base, opacity: 0.9, zIndex: 4,
      }} />

      {/* Oversized hanzi watermark — bottom-right, 16% white */}
      {hanzi && (
        <span aria-hidden="true" style={{
          position: 'absolute', right: 18, bottom: 6, zIndex: 2,
          fontFamily: "'Noto Serif SC', serif",
          fontWeight: 300, fontSize: Math.round(height * 0.36),
          lineHeight: 0.8, color: 'rgba(255,255,255,0.16)',
        }}>{hanzi}</span>
      )}

      {/* Overlaid copy — bottom-left, light on scrim */}
      <div style={{
        position: 'absolute', left: 22, right: 22, bottom: contentBottom, zIndex: 3,
        display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        {eyebrow && (
          <span style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
            color: 'rgba(248,246,240,0.86)', fontWeight: 500,
          }}>{eyebrow}</span>
        )}
        {title && (
          <span style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 30, fontWeight: 500, lineHeight: 1.02,
            color: '#F6F1E6',
          }}>{title}</span>
        )}
        {subtitle && (
          <span style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 14, color: '#D8CDB6', lineHeight: 1.4,
          }}>{subtitle}</span>
        )}
        {children}
      </div>
    </Tag>
  );
}
