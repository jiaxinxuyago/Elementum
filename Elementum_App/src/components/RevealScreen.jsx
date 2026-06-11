// ===================================================================
// SCREEN 10 — REVEAL (DOC5 §9, continuous scroll)
// Ported from Design/flow/reveal.jsx. Four sections:
//   1. Identity        — seal, "You are…", archetype name, pill, essence
//   2. Energy Blueprint — 5 rows sorted high→low, missing-element callout
//   3. Balance Prescription — shown when any element is missing
//   4. CTA              — Enter Your Readings
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
// Shared chart visualization — also used by Energy Map dashboard so both
// surfaces render IDENTICALLY from the same chart data.
import EnergyBlueprint, { buildComposition } from './shared/EnergyBlueprint.jsx';
// Shared identity ribbon — adds the cascade vocabulary above Section 2's
// composition (DOC5 §9 v1.8). Same component used at the top of the
// Energy Map dashboard so the user reads identical chrome on both screens.
import { IdentityRibbon, buildDm } from './shared/IdentityRibbon.jsx';
// Newest five-element marks (icons.svg #el-*) — the same set used across the
// catalogue. Replaces the legacy ElementSign line icon on the Reveal badges.
import { ElementMark } from './shared/icons';
// Ceremonial ink-wash stem seal (Rendered Screens v2) — the "one subject"
// of the Reveal / Energy Map. Falls back to HeroStemMark if a stem's seal
// PNG isn't present.
import StemSeal, { stemSealSrc } from './shared/StemSeal.jsx';

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
      return <ElementMark element={EL_KEY[element] || 'metal'} size={size} color={c} />;
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

// BlueprintRow moved to ./shared/EnergyBlueprint.jsx — used by both
// this Reveal screen and the Energy Map dashboard.

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

// ---------- Variant B · Blueprint card + 5-element Composition Wheel ----------
// Wireframe: Energy Map (Direction 2) — replaces the linear EnergyBlueprint
// bars with a flat row showing the dominant element + band classification +
// percent, followed by a 250×250 radial wheel of all five elements arranged
// on a pentagonal ring (Generating Cycle clockwise from top: Wood · Fire ·
// Earth · Metal · Water). Node sizes scale with mark count; the dominant
// element carries a thicker outline.

const BAND_LABEL = {
  concentrated: 'Concentrated',
  balanced:     'Balanced',
  open:         'Open',
};
const BAND_DESC = {
  concentrated: 'Heavily weighted — little counterbalance.',
  balanced:     'Even distribution — every element holds its share.',
  open:         'Spread thin — each element holds little weight.',
};

function BlueprintRow({ stem, element, pigColor, bandLabel, bandDesc, percent }) {
  return (
    <div style={{ ...deckleCard({ padding: '15px 18px' }) }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
        <div style={{
          width: 46, height: 46, borderRadius: 11,
          border: `1.5px solid ${pigColor}66`,
          background: `${pigColor}14`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: pigColor, fontFamily: "'Noto Serif SC', serif",
          fontSize: 22, lineHeight: 1, flexShrink: 0,
        }}>{stem}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap',
          }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 21, color: INK, fontWeight: 500, lineHeight: 1,
            }}>{element}</span>
            <span style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase',
              border: `1px solid ${PAPER_HAIR}`, borderRadius: 999,
              padding: '3px 10px', color: INK_LIGHT, fontWeight: 500,
            }}>{bandLabel}</span>
          </div>
          <div style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 12.5, color: INK_LIGHT, marginTop: 4, lineHeight: 1.4,
          }}>{bandDesc}</div>
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 23, color: INK, fontWeight: 500, flexShrink: 0,
        }}>{percent}%</div>
      </div>
    </div>
  );
}

function CompositionWheel({ composition, dominantElement, totalMarks }) {
  // Generating-cycle order, clockwise from top: Wood → Fire → Earth → Metal → Water.
  const ORDER = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
  const SIZE = 250;
  const RADIUS = 95;
  const CENTER = SIZE / 2;

  // Lookup composition by element name.
  const byEl = Object.fromEntries(composition.map((c) => [c.en, c]));

  return (
    <div style={{
      position: 'relative', width: SIZE, height: SIZE,
      margin: '4px auto 4px',
    }}>
      {/* Dashed inner ring */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 36,
        borderRadius: 999,
        border: `1px dashed ${PAPER_HAIR}`,
      }} />

      {/* 5 element nodes */}
      {ORDER.map((el, i) => {
        const item = byEl[el] || { n: 0, color: PIG[el] || INK_LIGHT, key: el.toLowerCase() };
        const angleDeg = (i * 72) - 90;   // start at top (-90°), clockwise
        const rad = (angleDeg * Math.PI) / 180;
        const cx = CENTER + Math.cos(rad) * RADIUS;
        const cy = CENTER + Math.sin(rad) * RADIUS;
        // Size scales with count: 28 (n=0) → 78 (n=6+).
        const nodeSize = Math.max(28, Math.min(78, 28 + item.n * 9));
        const isDominant = el === dominantElement;
        const empty = item.n === 0;
        return (
          <div key={el} style={{
            position: 'absolute',
            left: cx - nodeSize / 2,
            top:  cy - nodeSize / 2,
            width: nodeSize, height: nodeSize,
            borderRadius: 999,
            border: `${isDominant ? 2 : 1.5}px solid ${item.color}`,
            background: 'rgba(248, 241, 225, 0.92)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            opacity: empty ? 0.5 : 1,
          }}>
            <b style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: nodeSize > 50 ? 16 : 14,
              fontWeight: 600, color: INK, lineHeight: 1,
            }}>{item.n}</b>
            <span style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 7.5, letterSpacing: 0.6, textTransform: 'uppercase',
              marginTop: 2, color: INK_LIGHT,
            }}>{el}</span>
          </div>
        );
      })}

      {/* Center label — Total / N */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)', textAlign: 'center',
      }}>
        <div style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: 8.5, letterSpacing: 1.5, textTransform: 'uppercase',
          color: INK_LIGHT, fontWeight: 500,
        }}>Total</div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 18, color: INK, fontWeight: 500, marginTop: 2,
        }}>{totalMarks}</div>
      </div>
    </div>
  );
}

// ---------- Main screen ----------
// ─── Ceremonial entrance timing (DOC5 §9 v1.7) ─────────────────────
// The Reveal mounts after Loading's exit + silk-pause (~850ms). From the
// moment Section 1 mounts, identity content arrives in a deliberate
// staggered sequence — the blade leads, text follows, chips land last.
//
// Numbers below are tuned for a "ceremonial" pace: 200ms intervals between
// text beats (above the perceptual threshold so each arrival reads as a
// discrete event, not a smear), 120ms between chips (faster — they're a
// unit), and a 1000ms ink-bleed for the blade so it earns 600ms of solo
// presence before any text appears.
const ENTRANCE = {
  // [delay ms, duration ms]
  mountains:   [0,    700],
  blade:       [100,  1000],
  eyebrow:     [700,  350],
  archetype:   [900,  450],
  underline:   [1250, 350],
  manifesto:   [1500, 400],
  chip0:       [1800, 350],
  chip1:       [1920, 350],
  chip2:       [2040, 350],
  essence:     [2300, 400],
};

// Helper: compose the opacity/transform/transition styles for an entrance
// element based on a `mounted` flag. `lift` controls the rise distance for
// elements that should drift UP into place (default 6px). Pass `lift: 0`
// for elements that should only fade (e.g. mountains).
function entrance(mounted, key, opts = {}) {
  const [delay, duration] = ENTRANCE[key];
  const lift = opts.lift ?? 6;
  return {
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : `translateY(${lift}px)`,
    transition:
      `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, ` +
      `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms` +
      (opts.extraTransition ? `, ${opts.extraTransition}` : ''),
    willChange: 'opacity, transform',
  };
}

// `hideCTA` — DOC5 §AM.1: the Energy Map page renders the same content
// as Reveal but without the first-time "Enter Your Readings" CTA.
// When true, Section 4 is suppressed and `onEnterDashboard` is ignored.
export default function RevealScreen({ onEnterDashboard, hideCTA = false }) {
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

  // Entrance flag — flips to true after first paint so CSS transitions run.
  // We use rAF + a short timeout (rather than setting it in render) so the
  // initial DOM is committed in the OFF state before the transition kicks in.
  // Without this, React batches the initial render with the state flip and
  // the "from" frame is never painted → animations don't run.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!chart) return;
    let raf1 = 0, raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setMounted(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [chart]);

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

  // Build ordered composition (sorted descending by count). Same calculation
  // shared with the Energy Map dashboard via buildComposition().
  const composition = buildComposition(chart);
  const missing = composition.find((el) => el.n === 0);
  // Identity ribbon data — same helper used by Energy Map (DOC5 §9 v1.8).
  const dm = buildDm(chart);

  // Variant B composition wheel — band classification, total marks, dominant %.
  const totalMarks = composition.reduce((s, c) => s + c.n, 0) || 8;
  const dominantPct = totalMarks ? Math.round((composition[0].n / totalMarks) * 100) : 0;
  const _strength = chart.dayMaster?.strength || 'moderate';
  const bandKey =
    _strength === 'extremely_strong' || _strength === 'strong' ? 'concentrated' :
    _strength === 'moderate' ? 'balanced' : 'open';
  const bandLabel = BAND_LABEL[bandKey];
  const bandDesc  = BAND_DESC[bandKey];

  return (
    /* Outer phone-frame container. Holds the FIXED painted background
       layer + the scrolling content layer. The painted ink-wash stays
       anchored to the phone frame; only the inner content scrolls past
       it. (Pattern matches the polished V1 prototype.) */
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#EFE5CC',  // page silk — visible behind the painted bg & between cards
        color: INK,
        overflow: 'hidden',
      }}
    >
      {/* ── Fixed top-mountains backdrop (does NOT scroll) ────────
          bg-reveal-01-distant-peaks. Painted ink-wash anchored to the
          top of the phone frame. As the user scrolls, the cards slide
          UP past these mountains; the painting stays put.
          v2.4: band height 320 → 422 (50% of 844 phone height), mask
          tightened from 40%-fade to 25%-fade so the painted mountain
          fills the upper half prominently — matches Library §A3
          showcase composition. */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 422,
          zIndex: 1,
          pointerEvents: 'none',
          WebkitMaskImage:
            'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)',
          maskImage:
            'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)',
          ...entrance(mounted, 'mountains', { lift: 0 }),
        }}
      >
        <img
          src="/assets/backgrounds/bg-reveal-01-distant-peaks.png"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />
      </div>

      {/* ── Fixed bottom-islands backdrop (does NOT scroll) ────────
          bg-reveal-02-floating-island. Painted ink-wash anchored to the
          bottom of the phone frame. The CTA in §4 (which scrolls into
          this same area at the end of the scroll) lands ON TOP of the
          islands — Welcome-page composition. `mixBlendMode: multiply`
          drops the painting's cream base so it doesn't create a seam
          against the silk page color above. Top edge masked into a soft
          fade so there's no hard line.
          v2.4: band height 280 → 422 (50% of 844), mask tightened from
          38%-fade to 25%-fade so the painted bottom landscape fills the
          lower half prominently — matches Library §A3 showcase. The two
          bands meet at y=422 with overlapping soft fades for a seamless
          horizon line. */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: -20,
          right: -20,
          height: 422,
          zIndex: 1,
          pointerEvents: 'none',
          WebkitMaskImage:
            'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 100%)',
          maskImage:
            'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 100%)',
        }}
      >
        <img
          src="/assets/backgrounds/bg-reveal-02-floating-island.png"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center bottom',
            mixBlendMode: 'multiply',
            opacity: 0.6,
          }}
        />
      </div>

      <StatusBar tint={INK} />

      {/* ── Scroll layer (content only) ────────────────────────────
          Skip the 44px status-bar zone with `top: 44`. zIndex above
          the painted backdrop so cards render in front of the
          mountains/islands. Background transparent so the fixed
          painted bg shows through between cards. */}
      <div
        ref={scrollRef}
        style={{
          position: 'absolute',
          top: 44,
          left: 0,
          right: 0,
          bottom: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          zIndex: 10,
        }}
      >

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
            from above and end its hilt just above the eyebrow line.
            Ceremonial entrance: ink-bleed effect via opacity + filter blur
            (6px → 0) over 1000ms — the blade looks like wet ink drying
            into the silk paper. Lift is small (4px) — this is a deposit,
            not a drift. */}
        <div
          style={{
            ...entrance(mounted, 'blade', {
              lift: 4,
              extraTransition: 'filter 1000ms cubic-bezier(0.22, 1, 0.36, 1) 100ms',
            }),
            filter: mounted ? 'blur(0px)' : 'blur(6px)',
          }}
        >
          {stemSealSrc(dmStem)
            ? <StemSeal stem={dmStem} size={200} style={{ margin: '0 auto' }} />
            : <HeroStemMark stem={dmStem} element={dmElement} size={280} />}
        </div>

        {/* YOU ARE… eyebrow — matches the polished V1 Eyebrow primitive
            (10px / EB Garamond / weight 500 / 2.5 letterSpacing / no italic). */}
        <div
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 10,
            letterSpacing: 2.5,
            textTransform: 'uppercase',
            color: INK_LIGHT,
            marginBottom: 14,
            fontWeight: 500,
            ...entrance(mounted, 'eyebrow'),
          }}
        >
          You are…
        </div>

        {/* Archetype name — Cormorant h1. Visually calibrated against
            the design mockup: even at the spec's weight 600 our render
            came across heavier than the design (likely because the
            design's woff2 subset is hinted differently from the Google
            Fonts CDN we load). Dropping to weight 400 lands closer to
            the design's actual visual weight. */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: 44,
            lineHeight: 1.05,
            color: WALNUT,
            letterSpacing: 0.5,
            margin: '0 0 14px',
            textShadow: '0 2px 4px rgba(139,115,85,0.15)',
            ...entrance(mounted, 'archetype', { lift: 10 }),
          }}
        >
          {archetypeName}
        </h1>

        {/* Brush underline — drawn left-to-right via scaleX from a left-
            anchored origin. Reads as a brush stroke being painted in time,
            not a static line fading in. */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '0 0 14px',
            transformOrigin: 'left center',
            transform: mounted ? 'scaleX(1)' : 'scaleX(0)',
            opacity: mounted ? 1 : 0,
            transition:
              `opacity ${ENTRANCE.underline[1]}ms cubic-bezier(0.22, 1, 0.36, 1) ${ENTRANCE.underline[0]}ms, ` +
              `transform ${ENTRANCE.underline[1]}ms cubic-bezier(0.22, 1, 0.36, 1) ${ENTRANCE.underline[0]}ms`,
            willChange: 'opacity, transform',
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
              fontSize: 19,
              fontWeight: 500,
              color: INK_SOFT,
              letterSpacing: 0.3,
              lineHeight: 1.3,
              maxWidth: 320,
              marginBottom: 22,
              ...entrance(mounted, 'manifesto'),
            }}
          >
            {manifestoLine1}
          </div>
        )}

        {/* Three badge tiles — Element · Stem · Polarity. Stacked
            rounded-squares per DOC5 §17 data contract. Hover lifts +
            warms the border to hint the tap-to-open-popup affordance
            (Phase 2: element / stem / polarity knowledge panels).
            Ceremonial entrance: each chip rises + fades 120ms apart so
            they land as a coordinated unit, not three independent items. */}
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
          <div style={entrance(mounted, 'chip0', { lift: 8 })}>
            <BadgeTile
              color={PIG[dmElement]}
              mark={<ElementMark element={EL_KEY[dmElement]} size={26} color={PIG[dmElement]} />}
              label={dmElement}
            />
          </div>
          <div style={entrance(mounted, 'chip1', { lift: 8 })}>
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
          </div>
          <div style={entrance(mounted, 'chip2', { lift: 8 })}>
            <BadgeTile
              color={PIG[dmElement]}
              mark={<YinYangGlyph polarity={dmPolarity} color={PIG[dmElement]} size={24} />}
              label={polarityLabel}
            />
          </div>
        </div>

        {/* Essence paragraph — world-building elementIntro.expand from
            archetypeSource.js (DOC7 §3). Falls back to the original
            "doesn't hesitate / found already sharp" register if the stem's
            elementIntro isn't authored yet.
            (was Cormorant italic 16.5 under v1 §3.5.E; descriptive paragraphs
            revert to regular per DOC5 §AM.10.) */}
        <p
          style={{
            // DOC5 §AM.10 — descriptive paragraph is regular (was italic 16.5 under v1 §3.5.E)
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 16.5,
            color: INK_SOFT,
            lineHeight: 1.65,
            maxWidth: 310,
            margin: '0 auto 32px',
            ...entrance(mounted, 'essence'),
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
              // DOC5 §AM.10 — eyebrow-shaped label is regular (italic forbidden on eyebrows + microcopy chips)
              fontFamily: "'EB Garamond', serif",
              fontSize: 10,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: INK_LIGHT,
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
      {/* Full-viewport "page" — DOC5 §9 says each Reveal section gets near
          full viewport height. Content is vertically centered so when the
          user lands on this section, the cards sit in the middle of the
          frame and Section 1's tail is fully off-screen above. A soft
          ink-wash painting fills the bottom of the section so the empty
          area beneath the composition card doesn't read as dead space. */}
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: 828,                 // matches Section 1 — one viewport per section
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',       // vertically centers the content block
          padding: '60px 28px 60px',
          overflow: 'hidden',             // contain the ink-wash bleed beyond edges
        }}
      >
        {/* §2 painted background intentionally omitted — keeping the
            scroll on a single consistent silk paper avoids the visible
            seam that appeared when §1's and §2's painted PNGs (each with
            their own cream base) butted up against each other. The §1
            painting handles the atmosphere; sections below sit on the
            page's `#EFE5CC` silk uniformly. */}

        {/* Section content sits above the (now-uniform) silk page bg */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 10,
              letterSpacing: 2.5,
              textTransform: 'uppercase',
              color: INK_LIGHT,
              textAlign: 'center',
              marginBottom: 18,
              fontWeight: 500,
            }}
          >
            Your Energy Blueprint
          </div>

          {/* Blueprint card — stem mark + element + band pill + sub + dominant % */}
          <BlueprintRow
            stem={dmStem}
            element={dmElement}
            pigColor={PIG[dmElement]}
            bandLabel={bandLabel}
            bandDesc={bandDesc}
            percent={dominantPct}
          />

          {/* Composition wheel card — 5 elements arranged on a pentagonal ring */}
          <div style={{ ...deckleCard({ padding: '14px 18px 12px' }), marginTop: 13 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 2,
            }}>
              <span style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
                color: INK_LIGHT, fontWeight: 500,
              }}>Composition</span>
              <span style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
                color: INK_LIGHT, fontWeight: 500,
              }}>{totalMarks} marks</span>
            </div>
            <CompositionWheel composition={composition} dominantElement={dmElement} totalMarks={totalMarks} />
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — Balance Prescription (restored · audit D5) ─── */}
      {/* DOC5 §9 Section 3: shown only when an element is entirely absent
          from the chart — "Cultivate [missing element]." Re-instated after
          the v2 audit; helpers (PRESCRIPTIONS, PrescriptionCategory) were
          already present, only the render had been removed in Variant B. */}
      {missing && PRESCRIPTIONS[missing.en] && (
        <section style={{ position: 'relative', zIndex: 1, padding: '16px 20px 4px' }}>
          <div style={{ ...deckleCard({ padding: '18px 18px 8px' }) }}>
            <div
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
                color: INK_LIGHT, fontWeight: 500, marginBottom: 8,
              }}
            >
              What You Must Cultivate
            </div>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 26, fontWeight: 400, color: INK, margin: '0 0 8px',
                lineHeight: 1.1,
              }}
            >
              Cultivate {missing.en}
            </h3>
            <p
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 14, lineHeight: 1.6, color: INK_SOFT,
                margin: '0 0 16px',
              }}
            >
              {PRESCRIPTIONS[missing.en].blurb}
            </p>
            {PRESCRIPTIONS[missing.en].categories.map((cat) => (
              <PrescriptionCategory
                key={cat.title}
                title={cat.title}
                icon={cat.icon}
                bullets={cat.bullets}
                accent={PIG[missing.en]}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── SECTION 4 — CTA ───────────────────────────────── */}
      {/* Suppressed when this component renders inside the Energy Map
          per DOC5 AM.1 — same content as Reveal, no first-time CTA. */}
      {hideCTA ? null : (
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: 360,
          padding: '40px 28px 70px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          overflow: 'hidden',
        }}
      >
        {/* §4 painted backdrop intentionally omitted — the bottom
            islands are now a FIXED layer on the outer phone-frame
            wrapper (does not scroll). When the user scrolls to the
            end and the CTA arrives at the bottom of the viewport,
            the button overlays the fixed islands automatically. */}
        <button
          onClick={onEnterDashboard}
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            padding: '18px 22px',
            background: INK,
            color: SILK,
            border: 0,
            borderRadius: 999,
            fontFamily: 'Cinzel, serif',
            fontSize: 11,
            letterSpacing: 4,
            textTransform: 'uppercase',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          Enter Your Readings
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
      </section>
      )}
      </div>{/* /scroll layer */}
    </div>
  );
}
