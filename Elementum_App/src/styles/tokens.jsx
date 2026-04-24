// ===================================================================
// ELEMENTUM · Design System Tokens
// Ink & Pigment (设色) — extracted verbatim from Design/source/design_tokens.js
// Every component imports palette constants and SVG primitives from here.
// ===================================================================

import React, { useMemo } from 'react';

// ---------- Palette ----------
export const INK        = '#2B2722';
export const INK_SOFT   = '#4A433B';
export const INK_LIGHT  = '#857D72';
export const INK_MIST   = '#B8AFA1';

export const SILK       = '#F1E9D6';
export const SILK_DEEP  = '#ECE2C9';
export const SILK_FOLD  = '#DDD1B3';
export const PAPER_HAIR = '#CDBE9E';

export const BRONZE_MID  = '#8b7355';
export const BRONZE_DARK = '#6b5339';
export const WALNUT      = '#5a4430';

// Five-element pigments (desaturated mineral tones)
export const PIG_METAL = '#8A9AA6';
export const PIG_WOOD  = '#8D9C7A';
export const PIG_WATER = '#6F8AA2';
export const PIG_FIRE  = '#B4755E';
export const PIG_EARTH = '#B59A6B';
export const PIG_SEAL  = '#A04030';

// Reference user (DOC2): Yang Metal · The Blade · The General (七杀)
export const USER = {
  stem: '庚',
  stemName: 'Yang Metal',
  archetype: 'The Blade',
  council: 'The General',
  councilCN: '七杀',
  essence: 'Precision before intention',
  tokenPill: '庚 · Yang Metal · Blade',
  quote: '"The blade does not hesitate. It was not chosen — only found, already sharp."',
  composition: [
    { key: 'metal', en: 'Metal', color: PIG_METAL, n: 4 },
    { key: 'earth', en: 'Earth', color: PIG_EARTH, n: 3 },
    { key: 'wood',  en: 'Wood',  color: PIG_WOOD,  n: 2 },
    { key: 'water', en: 'Water', color: PIG_WATER, n: 1 },
    { key: 'fire',  en: 'Fire',  color: PIG_FIRE,  n: 0 },
  ],
  missing: 'fire',
};

// =====================================================
// iOS status bar (dark tint for silk backgrounds)
// =====================================================
export function StatusBar({ tint = INK }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 44,
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: "'EB Garamond', serif",
        fontSize: 15,
        fontWeight: 500,
        color: tint,
        zIndex: 20,
        pointerEvents: 'none',
      }}
    >
      <span>9:41</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
        <svg viewBox="0 0 18 12" width="18" height="12" fill="none">
          <rect x="1" y="8" width="3" height="3" rx="0.5" fill={tint}/>
          <rect x="6" y="5" width="3" height="6" rx="0.5" fill={tint}/>
          <rect x="11" y="2" width="3" height="9" rx="0.5" fill={tint}/>
        </svg>
        <svg viewBox="0 0 16 12" width="16" height="12" fill="none">
          <path d="M8 3.5C10 3.5 11.8 4.2 13 5.3" stroke={tint} strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M5 6.5C6 5.8 7 5.5 8 5.5C9 5.5 10 5.8 11 6.5" stroke={tint} strokeWidth="1.2" strokeLinecap="round"/>
          <circle cx="8" cy="9" r="1" fill={tint}/>
        </svg>
        <svg viewBox="0 0 26 12" width="26" height="12" fill="none">
          <rect x="0.5" y="1" width="22" height="10" rx="2.5" stroke={tint} strokeOpacity="0.5" fill="none"/>
          <rect x="2" y="2.5" width="18" height="7" rx="1" fill={tint}/>
          <rect x="23" y="4" width="2" height="4" rx="0.5" fill={tint} fillOpacity="0.5"/>
        </svg>
      </span>
    </div>
  );
}

// =====================================================
// Silk paper ground
// =====================================================
export function SilkPaper() {
  return (
    <svg
      viewBox="0 0 390 844"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    >
      <defs>
        <linearGradient id="silkG" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%"   stopColor="#F4ECD9"/>
          <stop offset="55%"  stopColor="#EFE5CC"/>
          <stop offset="100%" stopColor="#E8DCBD"/>
        </linearGradient>
        <radialGradient id="silkMottle1" cx="0.2" cy="0.15" r="0.55">
          <stop offset="0%" stopColor="#F8F1DD" stopOpacity="0.75"/>
          <stop offset="100%" stopColor="#F8F1DD" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="silkMottle2" cx="0.82" cy="0.78" r="0.4">
          <stop offset="0%" stopColor="#DAC9A0" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#DAC9A0" stopOpacity="0"/>
        </radialGradient>
        <filter id="silkGrain">
          <feTurbulence type="fractalNoise" baseFrequency="1.8" numOctaves="2" seed="3"/>
          <feColorMatrix values="0 0 0 0 0.55
                                 0 0 0 0 0.48
                                 0 0 0 0 0.35
                                 0 0 0 0.06 0"/>
          <feComposite in2="SourceGraphic" operator="in"/>
        </filter>
      </defs>
      <rect width="390" height="844" fill="url(#silkG)"/>
      <rect width="390" height="844" fill="url(#silkMottle1)"/>
      <rect width="390" height="844" fill="url(#silkMottle2)"/>
      <rect width="390" height="844" filter="url(#silkGrain)" opacity="0.3"/>
    </svg>
  );
}

// =====================================================
// Distant ridge — atmospheric ink-wash band (v2).
// Uses the keyed ink painting (ink-a-top.png) with a linear-gradient mask
// that fades into the silk so it doesn't meet content with a hard edge.
// Kept high in the frame, heavily ghosted, so form content reads cleanly.
// =====================================================
export function DistantRidge({ y = 80, opacity = 0.18, height = 180 }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: 0,
        right: 0,
        height,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      <img
        src="/assets/ink-a-top.png"
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
          opacity,
          mixBlendMode: 'multiply',
          WebkitMaskImage:
            'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)',
          maskImage:
            'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)',
        }}
      />
    </div>
  );
}

// =====================================================
// Welcome ink scene (v2) — two keyed ink paintings:
// distant ridges at the top, island cluster at the bottom.
// Used by WelcomeScreen; establishes the Ink & Pigment atmosphere.
// =====================================================
export function WelcomeInkScene() {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: -20,
          right: -20,
          height: 210,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <img
          src="/assets/ink-a-top.png"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.3,
            mixBlendMode: 'multiply',
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: -30,
          left: -40,
          right: -40,
          height: 220,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <img
          src="/assets/ink-a-bottom.png"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.38,
            mixBlendMode: 'multiply',
          }}
        />
      </div>
    </>
  );
}

// =====================================================
// Five-element iconic signs (same vocabulary as Phase 1 D)
// =====================================================
export function ElementSign({ element, size = 28, color, muted = false, style }) {
  const c = color || INK;
  const op = muted ? 0.32 : 1;
  const sw = size * 0.07;
  const s = size;
  const cx = s / 2;
  const cy = s / 2;
  const marks = {
    metal: (
      <path
        d={`M ${cx - s*0.28} ${cy + s*0.05}
            A ${s*0.32} ${s*0.32} 0 0 1 ${cx + s*0.28} ${cy + s*0.05}`}
        stroke={c} strokeWidth={sw} strokeLinecap="round" fill="none" opacity={op}
      />
    ),
    wood: (
      <g stroke={c} strokeWidth={sw} strokeLinecap="round" fill="none" opacity={op}>
        <line x1={cx} y1={cy + s*0.3} x2={cx} y2={cy - s*0.3}/>
        <line x1={cx} y1={cy - s*0.05} x2={cx - s*0.22} y2={cy - s*0.25}/>
        <line x1={cx} y1={cy - s*0.05} x2={cx + s*0.22} y2={cy - s*0.25}/>
      </g>
    ),
    water: (
      <g stroke={c} strokeWidth={sw} strokeLinecap="round" fill="none" opacity={op}>
        <path
          d={`M ${cx - s*0.3} ${cy - s*0.08}
              Q ${cx - s*0.1} ${cy - s*0.22}, ${cx} ${cy - s*0.08}
              T ${cx + s*0.3} ${cy - s*0.08}`}
        />
        <path
          d={`M ${cx - s*0.3} ${cy + s*0.14}
              Q ${cx - s*0.1} ${cy + s*0.28}, ${cx} ${cy + s*0.14}
              T ${cx + s*0.3} ${cy + s*0.14}`}
        />
      </g>
    ),
    fire: (
      <path
        d={`M ${cx} ${cy - s*0.3}
            L ${cx + s*0.26} ${cy + s*0.22}
            L ${cx - s*0.26} ${cy + s*0.22} Z`}
        stroke={c} strokeWidth={sw} strokeLinejoin="round" fill="none" opacity={op}
      />
    ),
    earth: (
      <rect
        x={cx - s*0.26} y={cy - s*0.22} width={s*0.52} height={s*0.44}
        stroke={c} strokeWidth={sw} strokeLinejoin="round" fill="none" opacity={op} rx={s*0.04}
      />
    ),
  };
  return (
    <svg viewBox={`0 0 ${s} ${s}`} width={size} height={size} style={{ display: 'block', ...style }}>
      {marks[element]}
    </svg>
  );
}

// =====================================================
// Brush gestures — dry-brush underline, corner ink, seal dot
// =====================================================
export function BrushUnderline({ w = 120, color = INK, opacity = 0.78 }) {
  const id = useMemo(() => `uBleed-${Math.random().toString(36).slice(2, 8)}`, []);
  return (
    <svg viewBox="0 0 120 10" width={w} height={10} style={{ display: 'block' }}>
      <defs>
        <filter id={id}>
          <feTurbulence baseFrequency="1.1" numOctaves="2" seed="5"/>
          <feDisplacementMap in="SourceGraphic" scale="1.2"/>
        </filter>
      </defs>
      <path
        d="M 4 5 Q 30 2.8 60 5.2 Q 90 7 116 4.8"
        stroke={color} strokeWidth="2.2" strokeLinecap="round" fill="none"
        opacity={opacity} filter={`url(#${id})`}
      />
      <path
        d="M 14 7.2 Q 50 6, 80 7, 104 6.5"
        stroke={color} strokeWidth="0.9" strokeLinecap="round" fill="none"
        opacity={opacity * 0.35}
      />
    </svg>
  );
}

export function SealDot({ size = 10, color = PIG_SEAL, style }) {
  return (
    <svg viewBox="0 0 10 10" width={size} height={size} style={{ display: 'block', ...style }}>
      <defs>
        <filter id="sealBleedP">
          <feTurbulence baseFrequency="1.3" numOctaves="2" seed="2"/>
          <feDisplacementMap in="SourceGraphic" scale="0.8"/>
        </filter>
      </defs>
      <circle cx="5" cy="5" r="4.2" fill={color} filter="url(#sealBleedP)" opacity="0.92"/>
    </svg>
  );
}

export function CornerInk({ size = 64, color = INK, opacity = 0.08, position = 'tr' }) {
  const transforms = {
    tl: '',
    tr: 'scale(-1,1) translate(-64,0)',
    bl: 'scale(1,-1) translate(0,-64)',
    br: 'scale(-1,-1) translate(-64,-64)',
  };
  const placement =
    position === 'tl' ? { top: -8, left: -8 } :
    position === 'tr' ? { top: -8, right: -8 } :
    position === 'bl' ? { bottom: -8, left: -8 } :
                        { bottom: -8, right: -8 };
  const id = `cBleed-${position}-${Math.round(opacity * 1000)}`;
  return (
    <svg
      viewBox="0 0 64 64" width={size} height={size}
      style={{ position: 'absolute', pointerEvents: 'none', ...placement }}
    >
      <defs>
        <filter id={id}>
          <feTurbulence baseFrequency="0.9" numOctaves="2" seed="11"/>
          <feDisplacementMap in="SourceGraphic" scale="2"/>
          <feGaussianBlur stdDeviation="1.2"/>
        </filter>
      </defs>
      <g transform={transforms[position]} filter={`url(#${id})`} opacity={opacity}>
        <path d="M 0 0 Q 28 6 40 24 Q 44 36 30 40 Q 18 34 10 22 Q 4 14 0 8 Z" fill={color}/>
      </g>
    </svg>
  );
}

// =====================================================
// Soft paper card — consistent silk-on-silk style
// =====================================================
export const deckleCard = (extra = {}) => ({
  background: 'rgba(248, 241, 225, 0.92)',
  border: `1px solid ${PAPER_HAIR}`,
  borderRadius: 22,
  ...extra,
});
