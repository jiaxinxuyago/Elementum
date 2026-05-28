// ===================================================================
// ELEMENTUM · VisualTile + SceneHero
// ===================================================================
// The two visual-thumbnail archetypes that expand flat list-row cards
// into picture-rich tiles. Grounded in:
//   · legend-v6 §7 "element tile"  — element-tinted gradient + ink mark
//     glyph + stem label, 1:1, radius 16, overflow hidden.
//   · Mooon "scene-hero" pattern   — painterly art under a transparent→
//     ink gradient veil with eyebrow + title overlaid bottom-left.
//
// Both honour the pigment alpha ladder (10 / 1A / 40 / CC) and the
// border-radius scale (12 / 16 / 22).
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

// ───────────────────────────────────────────────────────────────────
// VisualTile — element-tinted thumbnail (legend-v6 §7).
//   pigment   element key ('Metal'/'metal'/…) → tint + glyph color
//   iconId    ink-mark symbol id (dm-* / read-* / el-* / ico-*)
//   glyph     optional hanzi rendered as the large mark instead of iconId
//   eyebrow   small uppercase label
//   title     Cormorant title
//   locked    dim + lock glyph + tier chip
//   tierChip  'Seeker' | 'Advisor'
//   aspect    tile aspect ratio (default 1 = square)
//   onClick   tap handler (omit → static)
// ───────────────────────────────────────────────────────────────────
export function VisualTile({
  pigment, iconId, glyph, eyebrow, title, artSrc,
  locked = false, tierChip, aspect = 1, onClick, ariaLabel,
}) {
  const [pressed, setPressed] = useState(false);
  const pig = resolvePigment(pigment);
  const pressable = typeof onClick === 'function';
  const hasArt = !!artSrc && !locked;

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
        aspectRatio: String(aspect),
        borderRadius: 16,
        overflow: 'hidden',
        border: `1px solid ${withAlpha(pig.base, '40')}`,
        background: `linear-gradient(135deg, ${withAlpha(pig.base, '10')}, ${withAlpha(pig.base, '40')})`,
        padding: 12,
        cursor: pressable ? 'pointer' : 'default',
        textAlign: 'left',
        display: 'block',
        transform: pressed ? 'scale(0.98)' : 'none',
        filter: pressed ? 'brightness(0.97)' : 'none',
        transition: 'transform 120ms cubic-bezier(0.22,1,0.36,1), filter 120ms ease-out',
        opacity: locked ? 0.92 : 1,
      }}
    >
      {/* Painterly art layer (hybrid image tiles) — sits over the tint,
          under a veil so the mark + label stay legible. */}
      {hasArt && (
        <>
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url("${artSrc}")`,
            backgroundSize: 'cover', backgroundPosition: 'center 35%',
            opacity: 0.55,
          }} />
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(180deg, ${withAlpha(pig.base, '10')} 0%, rgba(26,24,21,0.06) 45%, rgba(26,24,21,0.42) 100%)`,
          }} />
        </>
      )}

      {/* Large ink mark / glyph — top-right, recessed */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 12, right: 12,
          color: locked ? withAlpha(pig.deep, 'CC') : (hasArt ? '#F8F6F0' : pig.deep),
          opacity: locked ? 0.5 : (hasArt ? 0.92 : 0.85),
          lineHeight: 1,
        }}
      >
        {glyph
          ? <span style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 40 }}>{glyph}</span>
          : <Icon id={locked ? 'ico-lock' : iconId} size={40} />}
      </div>

      {/* Tier chip — top-left when locked */}
      {locked && tierChip && (
        <span style={{
          position: 'absolute', top: 12, left: 12,
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 9, letterSpacing: 1.6, textTransform: 'uppercase',
          fontWeight: 500, color: bronzeDark,
          background: `${gold}28`, padding: '2px 7px', borderRadius: 999,
        }}>
          {/advisor/i.test(tierChip) ? '✦' : '◆'} {tierChip}
        </span>
      )}

      {/* Label block — bottom-left. Light text on art tiles (dark veil),
          pigment/ink on flat tinted tiles. */}
      <div style={{ position: 'absolute', left: 12, right: 12, bottom: 12 }}>
        {eyebrow && (
          <div style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 9.5, letterSpacing: 2, textTransform: 'uppercase',
            color: hasArt ? 'rgba(248,246,240,0.82)' : withAlpha(pig.deep, 'CC'),
            fontWeight: 500, marginBottom: 3,
          }}>
            {eyebrow}
          </div>
        )}
        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 19, fontWeight: 500, lineHeight: 1.12,
          color: hasArt ? '#F8F6F0' : ink,
        }}>
          {title}
        </div>
      </div>
    </button>
  );
}

// ───────────────────────────────────────────────────────────────────
// SceneHero — picture-rich hero (Mooon scene-hero pattern).
//   artSrc    painterly image URL (e.g. elementArt('Metal')); falls back
//             to an element-tinted gradient when null.
//   pigment   element key for the gradient veil + fallback tint
//   eyebrow   small uppercase label (light, on veil)
//   title     Cormorant hero title (light, on veil)
//   subtitle  optional secondary line (hanzi · label)
//   height    px height (default 200)
//   onClick   optional tap handler
// ───────────────────────────────────────────────────────────────────
export function SceneHero({
  artSrc, pigment, eyebrow, title, subtitle, height = 200, radius = 22,
  contentBottom = 16, onClick, ariaLabel, children,
}) {
  const [pressed, setPressed] = useState(false);
  const pig = resolvePigment(pigment);
  const pressable = typeof onClick === 'function';
  const Tag = pressable ? 'button' : 'div';
  const bordered = radius > 0;

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
        border: bordered ? `1px solid ${withAlpha(pig.base, '40')}` : 'none',
        borderRadius: radius,
        overflow: 'hidden',
        padding: 0,
        cursor: pressable ? 'pointer' : 'default',
        // Fallback tint shows through if the art fails to load
        background: `linear-gradient(135deg, ${withAlpha(pig.base, '10')}, ${withAlpha(pig.base, '40')})`,
        transform: pressed ? 'scale(0.99)' : 'none',
        transition: 'transform 140ms cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {/* Painterly art layer */}
      {artSrc && (
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("${artSrc}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }} />
      )}

      {/* Transparent → ink gradient veil (bottom-anchored) so text reads */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(180deg, rgba(26,24,21,0) 30%, rgba(26,24,21,0.28) 58%, rgba(26,24,21,0.74) 100%)`,
      }} />

      {/* Overlaid copy — bottom-left, light on veil */}
      <div style={{
        position: 'absolute', left: 18, right: 18, bottom: contentBottom,
        display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        {eyebrow && (
          <span style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
            color: 'rgba(248,246,240,0.82)', fontWeight: 500,
          }}>
            {eyebrow}
          </span>
        )}
        {title && (
          <span style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 30, fontWeight: 400, lineHeight: 1.05,
            color: '#F8F6F0',
          }}>
            {title}
          </span>
        )}
        {subtitle && (
          <span style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 13.5, color: 'rgba(248,246,240,0.75)', lineHeight: 1.4,
          }}>
            {subtitle}
          </span>
        )}
        {children}
      </div>
    </Tag>
  );
}
