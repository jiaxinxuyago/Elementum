// ===================================================================
// SCREEN 10 — REVEAL (DOC5 §9, continuous scroll)
// Ported from Design/flow/reveal.jsx. Four sections:
//   1. Identity        — seal, "You are…", archetype name, pill, essence
//   2. Energy Blueprint — 5 rows sorted high→low, missing-element callout
//   3. Balance Prescription — shown when any element is missing
//   4. CTA              — Enter Your Dashboard
// Reads live chart from ChartContext (no USER mock).
// ===================================================================

import React, { useState, useEffect, useRef } from 'react';
import {
  INK,
  INK_SOFT,
  INK_LIGHT,
  SILK,
  SILK_DEEP,
  SILK_FOLD,
  WALNUT,
  PIG_METAL,
  PIG_WOOD,
  PIG_WATER,
  PIG_FIRE,
  PIG_EARTH,
  SilkPaper,
  StatusBar,
  ElementSign,
  BrushUnderline,
  CornerInk,
  deckleCard,
  BRONZE_MID,
  BRONZE_DARK,
  PAPER_HAIR,
} from '../styles/tokens.jsx';
import { useChart } from '../store/chartContext.jsx';
// Per DOC4 §1: archetypeSource.js is the single source of truth for all reading content.
// Imported with an alias to reserve STEM_CARD_DATA for the variant file (DOC8 pattern).
import { STEM_CARD_DATA as STEM_BASELINES } from '../content/archetypeSource.js';

// Map element name → pigment color (Ink & Pigment tokens)
const PIG = {
  Metal: PIG_METAL,
  Wood:  PIG_WOOD,
  Water: PIG_WATER,
  Fire:  PIG_FIRE,
  Earth: PIG_EARTH,
};

const EL_KEY = {
  Metal: 'metal',
  Wood:  'wood',
  Water: 'water',
  Fire:  'fire',
  Earth: 'earth',
};

// DOC5 §17 data contract — pinyin label for each stem's badge tile.
const STEM_PINYIN = {
  '甲': 'JIA',  '乙': 'YI',   '丙': 'BING', '丁': 'DING',
  '戊': 'WU',   '己': 'JI',   '庚': 'GENG', '辛': 'XIN',
  '壬': 'REN',  '癸': 'GUI',
};

// Small taichi glyph for the Polarity badge. Yang variant shows the light
// half on top; Yin variant is flipped. Color threads element pigment through
// the solid half so the badge feels tied to the rest of the card.
function YinYangGlyph({ polarity = 'yang', color = '#2B2722', size = 22 }) {
  const flip = polarity === 'yin' ? -1 : 1;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={{ display: 'block', transform: `scaleY(${flip})` }}
      aria-hidden="true"
    >
      {/* Outer circle */}
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.2" fill="none" opacity="0.55" />
      {/* Filled S-curve (light half = yang) */}
      <path
        d="M 12 2 a 10 10 0 0 1 0 20 a 5 5 0 0 1 0 -10 a 5 5 0 0 0 0 -10 Z"
        fill={color}
        opacity="0.9"
      />
      {/* Dots */}
      <circle cx="12" cy="7" r="1.3" fill="#F1E9D6" />
      <circle cx="12" cy="17" r="1.3" fill={color} />
    </svg>
  );
}

// ---------- Stem-specific brush sign (DOC5 §11 · stem iconography) ----------
// Each Heavenly Stem has its own iconic mark — what the stem *is* in painted
// form, not just its element family. Ported from v2 Direction D's BrushJian
// (the central jian/sword of the Welcome screen) and recolored in element
// pigment so 庚's sword reads as Yang Metal made manifest.
//
// Until each of the other nine stems gets its own painted sign, callers fall
// back to the generic ElementSign vocabulary via <StemSign/> below.
// BrushJian — vertical jian (双刃剑) painted in ink. The blade is a long,
// slow-tapering down-stroke (gradient inked top-to-bottom so the tip dries to
// a fine point and the body is heavy mid-blade — a sumi-e brush gesture).
// Below, a clear T: short crossguard, bound grip, pommel dot.
//
// Proportions are tuned to scale gracefully from chip (~28 px) to hero
// (~280 px) without re-authoring; the only thing that changes per scale is
// the displacement-map intensity (handled implicitly by viewBox + filter).
function BrushJian({ size = 32, color = INK }) {
  // Filter ID needs to be unique per render so multiple instances don't clash.
  const id = React.useId().replace(/:/g, '');
  // Native viewBox 60×220 (3:11 — long sword aspect). Hero size feels closer
  // to the reference picture, where the blade dominates vertically and the
  // hilt is a small terminal note rather than half the silhouette.
  const w = Math.round(size * (60 / 220));
  const h = size;
  return (
    <svg
      viewBox="0 0 60 220"
      width={w}
      height={h}
      style={{ display: 'block' }}
      aria-hidden="true"
    >
      <defs>
        <filter id={`jb-${id}`}>
          <feTurbulence baseFrequency="0.55" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="1.2" />
        </filter>
        <linearGradient id={`ji-${id}`} x1="0.5" x2="0.5" y1="0" y2="1">
          {/* tip dry-brushes in, mid-blade is wettest, base lifts slightly */}
          <stop offset="0%"   stopColor={color} stopOpacity="0.05" />
          <stop offset="6%"   stopColor={color} stopOpacity="0.45" />
          <stop offset="22%"  stopColor={color} stopOpacity="0.85" />
          <stop offset="55%"  stopColor={color} stopOpacity="0.95" />
          <stop offset="86%"  stopColor={color} stopOpacity="0.92" />
          <stop offset="100%" stopColor={color} stopOpacity="0.78" />
        </linearGradient>
      </defs>
      <g filter={`url(#jb-${id})`}>
        {/* blade — long down-stroke, ~190 of 220 height. A subtle
            pinch toward the tip and a slight swell mid-blade gives a hand-
            painted gesture instead of a printed-rectangle look. */}
        <path
          d="M30 6
             C 31 30, 31.8 70, 32 110
             C 32 140, 31.8 170, 31 178
             L 30.5 184
             L 29.5 184
             L 29 178
             C 28.2 170, 28 140, 28 110
             C 28.2 70, 29 30, 30 6 Z"
          fill={`url(#ji-${id})`}
        />
        {/* guard — short horizontal cross-piece */}
        <path
          d="M14 184
             Q 30 180, 46 184
             L 48 192
             Q 30 195, 12 192 Z"
          fill={color}
          opacity="0.95"
        />
        {/* grip — short bound handle */}
        <rect x="26" y="192" width="8" height="20" rx="1.2" fill={color} opacity="0.82" />
        {/* pommel dot */}
        <circle cx="30" cy="216" r="3" fill={color} opacity="0.95" />
      </g>
    </svg>
  );
}

// Per-stem sign dispatcher. For each painted stem we return a stem-specific
// brush mark; otherwise we fall back to the generic element sign so the badge
// tile is never empty while the rest of the iconography is still in progress.
//
// Stems with painted ink-wash signs (sword, branch, flame, …) intentionally
// render in INK rather than element pigment — the Ink & Pigment vocabulary
// reads the painted form as raw iron/wood/fire, while element pigment is
// reserved for line iconography (crescent, tree, triangle) and chip accents.
function StemSign({ stem, element, size = 26, color }) {
  switch (stem) {
    case '庚': // Yang Metal · The Blade — painted iron jian
      return <BrushJian size={size} color={color || INK} />;
    default: {
      const c = color || PIG[element] || INK;
      return <ElementSign element={EL_KEY[element] || 'metal'} size={size} color={c} />;
    }
  }
}

// ---------- Identity badge tile (DOC5 §11 · three-chip layout) ----------
// Flat silk-tone tile — no gradient, no inner highlight. Reads as a piece of
// the same paper as the deckleCard surfaces below (Energy Blueprint, etc.),
// matching the reference design's flat 庚 YANG METAL pill. Hover only nudges
// the border + adds a small lift to retain the Phase-2 tap-to-open hint.
function BadgeTile({ mark, label, color, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={label}
      style={{
        width: 84,
        height: 84,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: '10px 8px',
        borderRadius: 16,
        // Flat silk fill — same tone family as deckleCard surfaces. No diagonal
        // gradient, no inset highlight. Lets the painted stem sign do the work.
        background: 'rgba(248, 241, 225, 0.92)',
        border: `1px solid ${hover ? `${color}55` : PAPER_HAIR}`,
        boxShadow: hover
          ? `0 3px 10px ${color}22`
          : '0 1px 2px rgba(60,40,20,0.05)',
        color,
        cursor: 'pointer',
        fontFamily: "'EB Garamond', serif",
        transform: hover ? 'translateY(-1px)' : 'none',
        transition: 'all 200ms cubic-bezier(0.22, 1, 0.36, 1)',
        flexShrink: 0,
        boxSizing: 'border-box',
      }}
    >
      <span
        style={{
          height: 32,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {mark}
      </span>
      <span
        style={{
          fontSize: 10,
          letterSpacing: 2.4,
          textTransform: 'uppercase',
          fontWeight: 500,
          opacity: 0.88,
        }}
      >
        {label}
      </span>
    </button>
  );
}

// ---------- Hero stem mark — dominant centered painted sign ----------
// No ring, no seal — just the painted form of the stem (sword for 庚, etc.)
// at hero scale, positioned to pierce through the ink-wash mountain band so
// the silk landscape and the user's archetypal mark read as one painting
// (cf. the welcome-screen reference in DOC5 §6 + design folder).
function HeroStemMark({ stem, element = 'Metal', size = 280 }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        // negative margin lets the blade tip rise into the mountain band
        // without disturbing the document flow below the hilt.
        marginTop: -40,
        marginBottom: 8,
      }}
    >
      <StemSign stem={stem} element={element} size={size} color={INK} />
    </div>
  );
}

// ---------- Single blueprint row with animated bar ----------
function BlueprintRow({ el, total = 8, animate = true }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (animate) {
      const t = setTimeout(() => setMounted(true), 100);
      return () => clearTimeout(t);
    } else {
      setMounted(true);
    }
  }, [animate]);
  const pct = (el.n / total) * 100;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '28px 1fr auto',
        gap: 14,
        alignItems: 'center',
        padding: '10px 0',
      }}
    >
      <ElementSign
        element={el.key}
        size={20}
        color={el.color}
        muted={el.n === 0}
      />
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 6,
          }}
        >
          <span
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 15,
              color: el.n === 0 ? INK_LIGHT : INK_SOFT,
            }}
          >
            {el.en}
          </span>
        </div>
        <div
          style={{
            height: 6,
            width: '100%',
            background: '#E5DFD1',
            borderRadius: 999,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: mounted ? `${pct}%` : '0%',
              height: '100%',
              background: el.color,
              borderRadius: 999,
              transition: 'width 800ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
        </div>
      </div>
      <span
        style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: 13,
          color: INK_LIGHT,
          minWidth: 28,
          textAlign: 'right',
        }}
      >
        {el.n}/{total}
      </span>
    </div>
  );
}

// ---------- Prescription category (Environment / Colors / Timing) ----------
function PrescriptionCategory({ title, icon, bullets, accent = PIG_FIRE }) {
  const icons = {
    map: (
      <g
        stroke={WALNUT}
        strokeWidth="1.3"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d="M3 4 L7 3 L11 5 L15 3 L15 14 L11 15 L7 13 L3 15 Z" />
        <line x1="7" y1="3" x2="7" y2="13" />
        <line x1="11" y1="5" x2="11" y2="15" />
      </g>
    ),
    palette: (
      <g
        stroke={WALNUT}
        strokeWidth="1.3"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d="M9 3 C 5 3 2 6 2 10 C 2 13 4 15 7 15 C 8 15 8 14 8 13 C 8 12 9 11 10 11 L 12 11 C 14 11 16 9 16 6 C 16 4 13 3 9 3 Z" />
        <circle cx="5.5" cy="7.5" r="0.8" fill={WALNUT} />
        <circle cx="8.5" cy="5.5" r="0.8" fill={WALNUT} />
        <circle cx="12" cy="6.5" r="0.8" fill={WALNUT} />
      </g>
    ),
    clock: (
      <g stroke={WALNUT} strokeWidth="1.3" fill="none" strokeLinecap="round">
        <circle cx="9" cy="9" r="6.5" />
        <line x1="9" y1="9" x2="9" y2="5.5" />
        <line x1="9" y1="9" x2="12" y2="10.5" />
      </g>
    ),
  };
  return (
    <div style={{ marginBottom: 14 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 6,
        }}
      >
        <svg viewBox="0 0 18 18" width="14" height="14">
          {icons[icon]}
        </svg>
        <div
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 10.5,
            letterSpacing: 2.5,
            textTransform: 'uppercase',
            color: '#584A3E',
            fontWeight: 600,
          }}
        >
          {title}
        </div>
      </div>
      {bullets.map((b, i) => (
        <div
          key={i}
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 13.5,
            color: INK_SOFT,
            lineHeight: 1.55,
            paddingLeft: 22,
            position: 'relative',
            marginBottom: 4,
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: 8,
              top: 8,
              width: 4,
              height: 4,
              borderRadius: 999,
              background: accent,
              opacity: 0.6,
            }}
          />
          {b}
        </div>
      ))}
    </div>
  );
}

// ---------- Element-specific prescription copy ----------
const PRESCRIPTIONS = {
  Fire: {
    blurb:
      'The blade without the forge grows cold. Without Fire, you may hold precision but lose the warmth that moves others to follow it. What you lack is what you must cultivate.',
    categories: [
      { title: 'Environment', icon: 'map', bullets: [
        'Sit facing south — the direction of summer sun.',
        'Seek warmth: lit hearths, candlelight, open kitchens.',
      ]},
      { title: 'Colors', icon: 'palette', bullets: [
        'Wear cinnabar, amber, and burnished red accents.',
        'Avoid all-grey palettes — they echo your excess.',
      ]},
      { title: 'Timing', icon: 'clock', bullets: [
        'Act between 11am and 3pm — Fire’s daily window.',
        'Summer months (May–July) amplify your effort.',
      ]},
    ],
  },
  Water: {
    blurb:
      'Without Water, movement settles before it has had time to soften. What you lack is depth on call — the part of you that knows before being told. Cultivate it.',
    categories: [
      { title: 'Environment', icon: 'map', bullets: [
        'Sit facing north — the direction of winter stillness.',
        'Keep still water nearby: a bowl, a fountain, a pool.',
      ]},
      { title: 'Colors', icon: 'palette', bullets: [
        'Wear deep blues, slate, and midnight black accents.',
        'Avoid saturated reds — they scatter Water’s quiet.',
      ]},
      { title: 'Timing', icon: 'clock', bullets: [
        'Act between 11pm and 3am — Water’s daily window.',
        'Winter months (Nov–Jan) clarify your perception.',
      ]},
    ],
  },
  Wood: {
    blurb:
      'Without Wood, the reach that makes you grow falls silent. What you lack is upward momentum — the structural drive to build and extend. Cultivate it.',
    categories: [
      { title: 'Environment', icon: 'map', bullets: [
        'Sit facing east — the direction of sunrise and new growth.',
        'Surround yourself with living plants and open windows.',
      ]},
      { title: 'Colors', icon: 'palette', bullets: [
        'Wear forest green, moss, and warm olive accents.',
        'Avoid stark white — it halts Wood’s forward motion.',
      ]},
      { title: 'Timing', icon: 'clock', bullets: [
        'Act between 3am and 7am — Wood’s daily window.',
        'Spring months (Feb–April) carry your ambition.',
      ]},
    ],
  },
  Metal: {
    blurb:
      'Without Metal, the cut that clarifies never arrives. What you lack is precise judgment — the edge that names what is and is not. Cultivate it.',
    categories: [
      { title: 'Environment', icon: 'map', bullets: [
        'Sit facing west — the direction of autumn clarity.',
        'Keep polished stone, metalwork, or a clean blade nearby.',
      ]},
      { title: 'Colors', icon: 'palette', bullets: [
        'Wear silver, slate, and cool pearl accents.',
        'Avoid overly warm tones — they blunt the edge.',
      ]},
      { title: 'Timing', icon: 'clock', bullets: [
        'Act between 3pm and 7pm — Metal’s daily window.',
        'Autumn months (Aug–Oct) sharpen your verdict.',
      ]},
    ],
  },
  Earth: {
    blurb:
      'Without Earth, the ground beneath your choices can shift without warning. What you lack is stability — the unhurried load-bearing weight. Cultivate it.',
    categories: [
      { title: 'Environment', icon: 'map', bullets: [
        'Sit grounded — low chairs, floor cushions, open earth.',
        'Keep stoneware, clay, and unglazed ceramics close.',
      ]},
      { title: 'Colors', icon: 'palette', bullets: [
        'Wear umber, ochre, and warm sand accents.',
        'Avoid purely reflective surfaces — they resist rooting.',
      ]},
      { title: 'Timing', icon: 'clock', bullets: [
        'Act at the transition hours — 7–9am, 1–3pm, 7–9pm.',
        'Late-season months (April, July, Oct, Jan) root you.',
      ]},
    ],
  },
};

// ---------- Main screen ----------
export default function RevealScreen({ onEnterDashboard }) {
  const { chart } = useChart();
  const scrollRef = useRef(null);

  // Track scroll position so the "Continue ↓" hint fades out once the user
  // starts scrolling — the hint's job is done the moment motion begins.
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setScrollY(el.scrollTop);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [chart]);
  const hintOpacity = Math.max(0, 1 - scrollY / 120);

  if (!chart) {
    // Still calculating or no data yet
    return (
      <div
        style={{
          background: SILK,
          color: INK,
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SilkPaper />
        <StatusBar tint={INK} />
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            color: INK_LIGHT,
            fontSize: 18,
            zIndex: 10,
          }}
        >
          Preparing your reading…
        </div>
      </div>
    );
  }

  const dmStem = chart.dayMaster.stem;
  const dmElement = chart.dayMaster.element; // 'Metal' | 'Wood' | ...
  const dmPolarity = chart.dayMaster.polarity; // 'yang' | 'yin'

  // DOC4 §1 — pull all reading content for this stem from archetypeSource.js.
  const baseline = STEM_BASELINES[dmStem] || {};
  const identity = baseline.identity || {};
  const archetypeName = identity.archetypeName || 'Your Archetype';
  const manifesto = identity.manifesto || '';
  const [manifestoLine1, manifestoLine2] = manifesto.split(' · ');
  // World-building intro line from archetypeSource.js (DOC7 §3). Third-person,
  // ~18 words, adjective-rich. Used as the essence paragraph on the Reveal.
  const elementIntroExpand = identity.elementIntro?.expand || '';
  const polarityLabel = dmPolarity === 'yang' ? 'Yang' : 'Yin';
  // archetypeWord ("Blade" from "The Blade") — unused in the three-chip layout
  // but kept for future features like share cards or compact references.
  // eslint-disable-next-line no-unused-vars
  const _archetypeWord = archetypeName.replace(/^The\s+/, '');

  // Build ordered composition — dm element first, then descending count
  const order = ['Metal', 'Wood', 'Water', 'Fire', 'Earth'];
  const composition = order
    .map((el) => ({
      key: EL_KEY[el],
      en: el,
      color: PIG[el],
      n: chart.elements[el]?.count ?? 0,
    }))
    .sort((a, b) => b.n - a.n);

  const missing = composition.find((el) => el.n === 0);

  return (
    <div
      ref={scrollRef}
      style={{
        // One consistent silk fill that spans the full scrollable content.
        // Previously we layered a 844px SilkPaper SVG over a flat SILK
        // fallback — they didn't match in tone, producing a visible hairline
        // where the SVG ended. Now a single flat silk tone (the midpoint of
        // the original silkG gradient) covers every section uniformly —
        // no transitions, no bands, no hairlines.
        background: '#EFE5CC',
        color: INK,
        position: 'relative',
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      {/* SilkPaper intentionally omitted here — the CSS gradient above covers
          the full scroll height, so there's no viewport-height cut-off. */}

      {/* Ink scene — reuse welcome ink for continuity.
          Stays anchored to the viewport top (position: fixed-within-scroll
          via position:absolute on the scroll container) and fades out at
          the bottom so it dissolves into the silk without a hard edge. */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          left: -20,
          right: -20,
          height: 260,
          zIndex: 1,
          pointerEvents: 'none',
          WebkitMaskImage:
            'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)',
          maskImage:
            'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)',
        }}
      >
        <img
          src="/assets/ink-a-top.png"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.22,
            mixBlendMode: 'multiply',
          }}
        />
      </div>

      <StatusBar tint={INK} />

      {/* ── SECTION 1 — IDENTITY ───────────────────────────
          Composition: ink-wash mountains (zIndex=1) hold the upper third;
          the painted stem mark (zIndex=10 inside the section) descends
          THROUGH them — tip emerging above the peaks, hilt resting just
          above the headline — so the silk landscape and the archetype's
          identity read as one painting (cf. user reference). Identity text
          sits below the hilt; chips and essence anchor the lower portion. */}
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: 828,
          padding: '90px 32px 120px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          textAlign: 'center',
        }}
      >
        {/* Hero stem mark — large painted sword (or other stem-specific
            mark), no ring around it. Sized to pierce the mountain band
            from above and end its hilt just above the eyebrow line. */}
        <HeroStemMark stem={dmStem} element={dmElement} size={280} />

        {/* YOU ARE… eyebrow — tracked italic caps */}
        <div
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 12,
            letterSpacing: 3.2,
            textTransform: 'uppercase',
            color: INK_LIGHT,
            marginBottom: 14,
            fontStyle: 'italic',
          }}
        >
          You are…
        </div>

        {/* Archetype name — Cormorant h1 */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600,
            fontSize: 44,
            lineHeight: 1,
            color: WALNUT,
            letterSpacing: 1,
            margin: '0 0 14px',
            textShadow: '0 2px 4px rgba(139,115,85,0.15)',
          }}
        >
          {archetypeName}
        </h1>

        {/* Brush underline */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '0 0 14px',
          }}
        >
          <BrushUnderline w={100} color={WALNUT} opacity={0.5} />
        </div>

        {/* Manifesto line 1 — the stem's slogan (identity.manifesto split on ' · ').
            Kept in Cormorant italic for family consistency with the archetype
            name above and the essence paragraph below; just sized up so it
            dominates the essence text hierarchy. */}
        {manifestoLine1 && (
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 22,
              fontStyle: 'italic',
              fontWeight: 500,
              color: INK_SOFT,
              letterSpacing: 0.3,
              lineHeight: 1.3,
              maxWidth: 320,
              marginBottom: 22,
            }}
          >
            {manifestoLine1}
          </div>
        )}

        {/* Three badge tiles — Element · Stem · Polarity. Stacked
            rounded-squares per DOC5 §17 data contract. Hover lifts +
            warms the border to hint the tap-to-open-popup affordance
            (Phase 2: element / stem / polarity knowledge panels). */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            marginBottom: 28,
          }}
        >
          {/* First chip: ELEMENT family sign (Metal crescent, Wood tree,
              etc.) in element pigment. The chip identifies the element
              family — the stem's painted identity (sword, branch, …) lives
              up top as the dominant hero mark, not duplicated here. */}
          <BadgeTile
            color={PIG[dmElement]}
            mark={<ElementSign element={EL_KEY[dmElement]} size={26} color={PIG[dmElement]} />}
            label={dmElement}
          />
          <BadgeTile
            color={PIG[dmElement]}
            mark={
              <span
                style={{
                  fontFamily: "'Noto Serif SC', serif",
                  fontSize: 26,
                  color: PIG[dmElement],
                  fontWeight: 500,
                  lineHeight: 1,
                }}
              >
                {dmStem}
              </span>
            }
            label={STEM_PINYIN[dmStem] || dmStem}
          />
          <BadgeTile
            color={PIG[dmElement]}
            mark={<YinYangGlyph polarity={dmPolarity} color={PIG[dmElement]} size={24} />}
            label={polarityLabel}
          />
        </div>

        {/* Essence paragraph — world-building elementIntro.expand from
            archetypeSource.js (DOC7 §3). Falls back to the original
            "doesn't hesitate / found already sharp" register if the stem's
            elementIntro isn't authored yet. */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 16.5,
            fontStyle: 'italic',
            color: INK_SOFT,
            lineHeight: 1.65,
            maxWidth: 310,
            margin: '0 auto 32px',
          }}
        >
          {elementIntroExpand || (
            <>
              A classical reading of who you are,
              <br />rendered for your birth alone.
            </>
          )}
        </p>

        {/* Scroll hint — fades out as the user scrolls */}
        <div
          style={{
            position: 'absolute',
            bottom: 28,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            opacity: 0.55 * hintOpacity,
            pointerEvents: 'none',
            transition: 'opacity 120ms linear',
          }}
        >
          <div
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 10,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: INK_LIGHT,
              fontStyle: 'italic',
            }}
          >
            Continue
          </div>
          <svg viewBox="0 0 16 16" width="14" height="14">
            <path
              d="M4 6 L8 11 L12 6"
              stroke={INK_LIGHT}
              strokeWidth="1.3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* ── SECTION 2 — ENERGY BLUEPRINT ─────────────────── */}
      {/* No borderTop — the scroll should feel like one continuous silk surface. */}
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '48px 28px 32px',
        }}
      >
        <div
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 11,
            letterSpacing: 3.5,
            textTransform: 'uppercase',
            color: INK_LIGHT,
            textAlign: 'center',
            marginBottom: 8,
            fontWeight: 600,
          }}
        >
          Your Energy Blueprint
        </div>

        <p
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 13.5,
            fontStyle: 'italic',
            color: INK_LIGHT,
            textAlign: 'center',
            margin: '0 0 28px',
            lineHeight: 1.6,
          }}
        >
          Eight characters. Five elements.
          <br />
          This is how they fall in your chart.
        </p>

        <div style={{ ...deckleCard({ padding: '12px 18px' }) }}>
          {composition.map((el) => (
            <BlueprintRow key={el.key} el={el} />
          ))}
        </div>

        {/* Missing element callout */}
        {missing && (
          <div
            style={{
              marginTop: 20,
              padding: '18px 20px',
              background: `${missing.color}10`,
              border: `1px solid ${missing.color}40`,
              borderRadius: 16,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <CornerInk size={48} color={missing.color} opacity={0.12} position="tr" />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 10,
                position: 'relative',
              }}
            >
              <ElementSign
                element={missing.key}
                size={18}
                color={missing.color}
              />
              <div
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: 11,
                  letterSpacing: 2.8,
                  color: missing.color,
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Your {missing.en} is missing
              </div>
            </div>
            <p
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 14,
                color: INK_SOFT,
                lineHeight: 1.6,
                margin: 0,
                position: 'relative',
              }}
            >
              {PRESCRIPTIONS[missing.en]?.blurb ||
                'What you lack is what you must cultivate.'}
            </p>
          </div>
        )}
      </section>

      {/* ── SECTION 3 — BALANCE PRESCRIPTION ─────────────── */}
      {missing && (
        <section
          style={{
            position: 'relative',
            zIndex: 10,
            padding: '40px 28px 32px',
          }}
        >
          <div
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 11,
              letterSpacing: 3.5,
              textTransform: 'uppercase',
              color: INK_LIGHT,
              textAlign: 'center',
              marginBottom: 22,
              fontWeight: 600,
            }}
          >
            What Balances You
          </div>

          <div
            style={{
              background: '#EBE5D6',
              border: `1px solid #DCD3C0`,
              borderRadius: 18,
              padding: 24,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 18,
                paddingBottom: 16,
                borderBottom: `1px solid ${missing.color}33`,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  background: `${missing.color}22`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ElementSign
                  element={missing.key}
                  size={18}
                  color={missing.color}
                />
              </div>
              <div
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: 12,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: missing.color,
                  fontWeight: 600,
                }}
              >
                Cultivate {missing.en}
              </div>
            </div>

            {(PRESCRIPTIONS[missing.en]?.categories || []).map((cat) => (
              <PrescriptionCategory
                key={cat.title}
                title={cat.title}
                icon={cat.icon}
                bullets={cat.bullets}
                accent={missing.color}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── SECTION 4 — CTA ───────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '40px 28px 80px',
        }}
      >
        <button
          onClick={onEnterDashboard}
          style={{
            width: '100%',
            padding: '18px 22px',
            background: INK,
            color: SILK,
            border: 0,
            borderRadius: 999,
            fontFamily: 'Cinzel, serif',
            fontSize: 12,
            letterSpacing: 4,
            textTransform: 'uppercase',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          Enter Your Dashboard
          <span
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 17,
              letterSpacing: 0,
            }}
          >
            →
          </span>
        </button>
        <p
          style={{
            marginTop: 14,
            textAlign: 'center',
            fontFamily: "'EB Garamond', serif",
            fontSize: 12,
            fontStyle: 'italic',
            color: INK_LIGHT,
            letterSpacing: 0.3,
          }}
        >
          Your reading refreshes with each sunrise.
        </p>
      </section>
    </div>
  );
}
