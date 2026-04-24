// ===================================================================
// ELEMENTUM · Pre-Dashboard Flow · Primitives
// Extracted from Phase 1 Direction D (Ink & Pigment / 设色)
// Shared ground: silk paper, ink scenes, element signs, brush gestures
// ===================================================================

const { useState, useEffect, useRef, useMemo } = React;

// ---------- Palette ----------
const INK        = '#2B2722';
const INK_SOFT   = '#4A433B';
const INK_LIGHT  = '#857D72';
const INK_MIST   = '#B8AFA1';

const SILK       = '#F1E9D6';
const SILK_DEEP  = '#ECE2C9';
const SILK_FOLD  = '#DDD1B3';
const PAPER_HAIR = '#CDBE9E';

const BRONZE_MID  = '#8b7355';
const BRONZE_DARK = '#6b5339';
const WALNUT      = '#5a4430';

// Five-element pigments (desaturated mineral tones)
const PIG_METAL = '#8A9AA6';
const PIG_WOOD  = '#8D9C7A';
const PIG_WATER = '#6F8AA2';
const PIG_FIRE  = '#B4755E';
const PIG_EARTH = '#B59A6B';
const PIG_SEAL  = '#A04030';

// Reference user (DOC2): Yang Metal · The Blade · The General (七杀)
const USER = {
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
function StatusBar({ tint = INK }) {
  return (
    <div className="status-bar" style={{ color: tint }}>
      <span>9:41</span>
      <span className="sb-icons">
        <svg viewBox="0 0 18 12" fill="none">
          <rect x="1" y="8" width="3" height="3" rx="0.5" fill={tint}/>
          <rect x="6" y="5" width="3" height="6" rx="0.5" fill={tint}/>
          <rect x="11" y="2" width="3" height="9" rx="0.5" fill={tint}/>
        </svg>
        <svg viewBox="0 0 16 12" fill="none">
          <path d="M8 3.5C10 3.5 11.8 4.2 13 5.3" stroke={tint} strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M5 6.5C6 5.8 7 5.5 8 5.5C9 5.5 10 5.8 11 6.5" stroke={tint} strokeWidth="1.2" strokeLinecap="round"/>
          <circle cx="8" cy="9" r="1" fill={tint}/>
        </svg>
        <svg viewBox="0 0 26 12" fill="none">
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
function SilkPaper() {
  return (
    <svg viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0 }}>
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
// Distant ridge — single soft atmospheric band used on
// onboarding screens. Kept high in the frame so form
// content reads cleanly beneath.
// =====================================================
function DistantRidge({ y = 80, opacity = 0.18 }) {
  return (
    <svg viewBox="0 0 390 200" width="390" height="200"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: 'absolute', top: y, left: 0, right: 0,
        pointerEvents: 'none', zIndex: 1, mixBlendMode: 'multiply'
      }}>
      <defs>
        <filter id="ridgeBleed">
          <feTurbulence baseFrequency="0.7" numOctaves="2" seed="7"/>
          <feDisplacementMap in="SourceGraphic" scale="1.6"/>
        </filter>
        <linearGradient id="ridgeFade" x1="0.5" x2="0.5" y1="0" y2="1">
          <stop offset="0%"  stopColor={INK} stopOpacity={opacity * 1.4}/>
          <stop offset="70%" stopColor={INK} stopOpacity={opacity * 0.5}/>
          <stop offset="100%" stopColor={INK} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <g filter="url(#ridgeBleed)">
        <path d="M 0 140 Q 30 120 60 130 Q 90 115 125 125 Q 155 108 195 120
                 Q 225 110 260 125 Q 295 112 330 122 Q 360 115 390 128 L 390 200 L 0 200 Z"
          fill="url(#ridgeFade)"/>
        <path d="M 0 160 Q 40 150 85 155 Q 130 145 175 152 Q 220 142 265 150
                 Q 310 140 355 148 L 390 150 L 390 200 L 0 200 Z"
          fill={INK} fillOpacity={opacity * 0.55}/>
      </g>
    </svg>
  );
}

// =====================================================
// Five-element iconic signs (same vocabulary as Phase 1 D)
// =====================================================
function ElementSign({ element, size = 28, color, muted = false, style }) {
  const c = color || INK;
  const op = muted ? 0.32 : 1;
  const sw = size * 0.07;
  const s = size;
  const cx = s / 2;
  const cy = s / 2;
  const marks = {
    metal: (
      <path d={`M ${cx - s*0.28} ${cy + s*0.05}
                A ${s*0.32} ${s*0.32} 0 0 1 ${cx + s*0.28} ${cy + s*0.05}`}
        stroke={c} strokeWidth={sw} strokeLinecap="round" fill="none" opacity={op}/>
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
        <path d={`M ${cx - s*0.3} ${cy - s*0.08}
                  Q ${cx - s*0.1} ${cy - s*0.22}, ${cx} ${cy - s*0.08}
                  T ${cx + s*0.3} ${cy - s*0.08}`}/>
        <path d={`M ${cx - s*0.3} ${cy + s*0.14}
                  Q ${cx - s*0.1} ${cy + s*0.28}, ${cx} ${cy + s*0.14}
                  T ${cx + s*0.3} ${cy + s*0.14}`}/>
      </g>
    ),
    fire: (
      <path d={`M ${cx} ${cy - s*0.3}
                L ${cx + s*0.26} ${cy + s*0.22}
                L ${cx - s*0.26} ${cy + s*0.22} Z`}
        stroke={c} strokeWidth={sw} strokeLinejoin="round" fill="none" opacity={op}/>
    ),
    earth: (
      <rect x={cx - s*0.26} y={cy - s*0.22} width={s*0.52} height={s*0.44}
        stroke={c} strokeWidth={sw} strokeLinejoin="round" fill="none" opacity={op} rx={s*0.04}/>
    ),
  };
  return (
    <svg viewBox={`0 0 ${s} ${s}`} width={size} height={size} style={{ display:'block', ...style }}>
      {marks[element]}
    </svg>
  );
}

// =====================================================
// Brush gestures — dry-brush underline, corner ink, seal dot
// =====================================================
function BrushUnderline({ w = 120, color = INK, opacity = 0.78 }) {
  const id = useMemo(() => `uBleed-${Math.random().toString(36).slice(2,8)}`, []);
  return (
    <svg viewBox="0 0 120 10" width={w} height={10} style={{ display: 'block' }}>
      <defs>
        <filter id={id}>
          <feTurbulence baseFrequency="1.1" numOctaves="2" seed="5"/>
          <feDisplacementMap in="SourceGraphic" scale="1.2"/>
        </filter>
      </defs>
      <path d="M 4 5 Q 30 2.8 60 5.2 Q 90 7 116 4.8"
        stroke={color} strokeWidth="2.2" strokeLinecap="round" fill="none"
        opacity={opacity} filter={`url(#${id})`}/>
      <path d="M 14 7.2 Q 50 6, 80 7, 104 6.5"
        stroke={color} strokeWidth="0.9" strokeLinecap="round" fill="none"
        opacity={opacity * 0.35}/>
    </svg>
  );
}

function SealDot({ size = 10, color = PIG_SEAL, style }) {
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

function CornerInk({ size = 64, color = INK, opacity = 0.08, position = 'tr' }) {
  const transforms = {
    tl: '',
    tr: 'scale(-1,1) translate(-64,0)',
    bl: 'scale(1,-1) translate(0,-64)',
    br: 'scale(-1,-1) translate(-64,-64)',
  };
  const placement = position === 'tl' ? { top: -8, left: -8 } :
                    position === 'tr' ? { top: -8, right: -8 } :
                    position === 'bl' ? { bottom: -8, left: -8 } :
                                        { bottom: -8, right: -8 };
  const id = `cBleed-${position}-${Math.round(opacity*1000)}`;
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}
      style={{ position: 'absolute', pointerEvents: 'none', ...placement }}>
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
const deckleCard = (extra = {}) => ({
  background: 'rgba(248, 241, 225, 0.92)',
  border: `1px solid ${PAPER_HAIR}`,
  borderRadius: 22,
  ...extra,
});

// =====================================================
// Onboarding shell — progress bar, step counter, question,
// poetic subtitle, children (input), back/continue
// =====================================================
function OnboardingShell({
  step, total = 7, question, subtitle,
  children, canContinue, onBack, onContinue,
  continueLabel = 'Continue', finalStep = false,
}) {
  const progress = step / total;
  return (
    <div style={{
      background: SILK, color: INK, position: 'relative',
      width: '100%', height: '100%', overflow: 'hidden'
    }}>
      <SilkPaper/>
      <DistantRidge y={54} opacity={0.13}/>

      {/* progress bar — 3px at very top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 3, background: 'rgba(205,190,158,0.35)', zIndex: 30,
      }}>
        <div style={{
          height: '100%',
          width: `${progress * 100}%`,
          background: `linear-gradient(90deg, ${BRONZE_MID} 0%, ${BRONZE_MID} 60%, #9d8468 100%)`,
          transition: 'width 500ms cubic-bezier(0.22, 1, 0.36, 1)'
        }}/>
      </div>

      <StatusBar tint={INK}/>

      {/* content area */}
      <div style={{
        position: 'absolute', inset: 0,
        padding: '70px 34px 0',
        display: 'flex', flexDirection: 'column',
        zIndex: 10,
      }}>
        <div style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: 11,
          letterSpacing: 3.2,
          textTransform: 'uppercase',
          color: INK_LIGHT,
          textAlign: 'center',
          marginTop: 8,
        }}>Step {step} of {total}</div>

        <h1 style={{
          fontFamily: "'EB Garamond', serif",
          fontWeight: 500,
          fontSize: 27,
          lineHeight: 1.2,
          color: BRONZE_MID,
          letterSpacing: 1.2,
          textAlign: 'center',
          margin: '28px 0 14px',
        }}>{question}</h1>

        <p style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: 15,
          fontStyle: 'italic',
          color: INK_SOFT,
          lineHeight: 1.7,
          textAlign: 'center',
          margin: '0 auto',
          maxWidth: 290,
        }}>{subtitle}</p>

        {/* input zone */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 8 }}>
          {children}
        </div>

        {/* buttons */}
        <div style={{
          display: 'flex', gap: 12, alignItems: 'center',
          paddingBottom: 32, paddingTop: 8,
        }}>
          <button onClick={onBack} style={{
            padding: '13px 22px',
            background: 'transparent',
            border: `1px solid #d9d3c8`,
            borderRadius: 999,
            fontFamily: "'EB Garamond', serif",
            fontSize: 12,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: INK_SOFT,
            cursor: 'pointer',
          }}>← Back</button>

          <button
            disabled={!canContinue}
            onClick={onContinue}
            style={{
              flex: 1,
              padding: finalStep ? '16px 22px' : '14px 22px',
              background: canContinue ? BRONZE_DARK : 'rgba(107,83,57,0.45)',
              color: SILK,
              border: 0,
              borderRadius: finalStep ? 999 : 10,
              fontFamily: finalStep ? 'Cinzel, serif' : "'EB Garamond', serif",
              fontSize: finalStep ? 12 : 15,
              letterSpacing: finalStep ? 4 : 0.5,
              fontWeight: 500,
              textTransform: finalStep ? 'uppercase' : 'none',
              cursor: canContinue ? 'pointer' : 'not-allowed',
              opacity: canContinue ? 1 : 0.55,
              boxShadow: canContinue ? '0 4px 12px rgba(107,83,57,0.2)' : 'none',
              transition: 'all 200ms ease',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            }}>
            {continueLabel}
            {!finalStep && <span style={{ fontSize: 17, lineHeight: 1 }}>→</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  INK, INK_SOFT, INK_LIGHT, INK_MIST,
  SILK, SILK_DEEP, SILK_FOLD, PAPER_HAIR,
  BRONZE_MID, BRONZE_DARK, WALNUT,
  PIG_METAL, PIG_WOOD, PIG_WATER, PIG_FIRE, PIG_EARTH, PIG_SEAL,
  USER,
  StatusBar, SilkPaper, DistantRidge,
  ElementSign, BrushUnderline, SealDot, CornerInk,
  deckleCard, OnboardingShell,
});
