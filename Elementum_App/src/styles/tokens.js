// ===================================================================
// ELEMENTUM · Design Tokens (canonical)
// ===================================================================
// Mirror of D:/Elementum/Elementum_Project/Design/Source/tokens.css.
//
// EDIT POLICY:
//   1. Edit Design/Source/tokens.css FIRST.
//   2. Re-generate this file from it (manual mirror — no build step yet).
//   3. tokens.jsx imports from here for the SCREAMING_SNAKE legacy aliases
//      that older app components expect.
//
// New code should import the camelCase exports from this file directly:
//   import { ink, paperHair, metal, sp16, r12 } from '../styles/tokens';
//
// Drift between this file and Design/Source/tokens.css is a doc-patch trigger.
//
// Ranges (DES_04 §3.5):
//   §3.5.A — pigment alpha ladder (10/1A/40/CC/full)
//   §3.5.B — radius scale (1, 10, 12, 16, 22, 999) — 6 tiers ONLY
//   §3.5.C — spacing scale (1, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22,
//                          26, 28, 36, 44, 56) — only these
//   §3.5.D — surface taxonomy (cream-cardstock / tinted / quiet)
// ===================================================================

// ───── Paper · Silk · Ink ─────
export const cream      = '#F8F6F0';
export const silk       = '#F1E9D6';
export const silkDeep   = '#ECE2C9';
export const silkFold   = '#DDD1B3';
export const parchment  = '#EAE5DF';
export const vellum     = '#DDD8CC';
export const paperHair  = '#CDBE9E';

export const ink        = '#2B2722';
export const inkSoft    = '#4A433B';
export const inkLight   = '#857D72';
export const inkMist    = '#B8AFA1';
export const inkDeep    = '#1a1815';

// ───── Bronze ramp ─────
export const bronzeLight = '#9d8468';
export const bronze      = '#8b7355';
export const bronzeDark  = '#6b5339';
export const walnut      = '#5a4430';
export const gold        = '#D4AF37';

// ───── Borders ─────
export const borderStd   = '#D5CDBD';
export const borderLight = '#E5DFD1';
export const borderFocus = '#8b7355';
export const dmBorder    = '#584A3E'; // Day-master pillar highlight only — never elsewhere

// ───── Five-element pigments + *Deep companions ─────
// Pigment alpha ladder (DES_04 §3.5.A — only these alphas allowed):
//   ${pigment}10 → ~6%  · soft fill (card bg)
//   ${pigment}1A → ~10% · tint fill (icon bg)
//   ${pigment}40 → ~25% · border / chip outline
//   ${pigment}CC → ~80% · eyebrow text
//   ${pigment}   → 100% · glyph / heading on tint
export const metal     = '#8ba3b8';  export const metalDeep = '#6a849a';
export const wood      = '#7a9e6e';  export const woodDeep  = '#587a4d';
export const fire      = '#c4745a';  export const fireDeep  = '#9e5540';
export const earth     = '#b89a6a';  export const earthDeep = '#927750';
export const water     = '#5a7fa8';  export const waterDeep = '#3e5f85';

// ───── Reserved accents ─────
export const seal      = '#A04030'; // MAX ONCE PER SCREEN — chop mark only
export const advisor   = '#7a5e9a'; // Premium tier accent

// ───── Surface fills (DES_04 §3.5.D) ─────
export const quietBg      = '#EBE5D6';
export const quietBorder  = '#DCD3C0';
export const cardstockBg  = 'rgba(248, 241, 225, 0.92)';
export const tabbarBg     = 'rgba(253, 253, 252, 0.85)'; // pair with backdrop-filter: blur(12px)

// ───── Spacing scale (DES_04 §3.5.C — only these values allowed) ─────
// Forbidden: 7, 9, 11, 13, 15, 17, 19, 21, 24, 30, 32, 40, 48, 64
export const sp = {
  1: 1, 3: 3, 4: 4, 5: 5, 6: 6, 8: 8, 10: 10,
  12: 12, 14: 14, 16: 16, 18: 18,
  20: 20, 22: 22, 26: 26, 28: 28,
  36: 36, 44: 44, 56: 56,
};
// Convenience individual exports (for explicit usage)
export const sp1  = 1,  sp3  = 3,  sp4  = 4,  sp5  = 5,  sp6  = 6,  sp8  = 8,  sp10 = 10;
export const sp12 = 12, sp14 = 14, sp16 = 16, sp18 = 18;
export const sp20 = 20, sp22 = 22, sp26 = 26, sp28 = 28;
export const sp36 = 36, sp44 = 44, sp56 = 56;

// ───── Border-radius scale (DES_04 §3.5.B) ─────
// Forbidden: 4, 6, 8, 14, 18, 20, 28
// Reserved (phone-frame only): 47, 56
export const r = {
  1: 1, 10: 10, 12: 12, 16: 16, 22: 22, pill: 999,
};
export const r1   = 1,   r10  = 10,  r12  = 12;
export const r16  = 16,  r22  = 22,  rPill = 999;

// ───── Shadows ─────
export const shadow = {
  card:    '0 1px 0 rgba(43, 39, 34, 0.04)',
  cta:     '0 6px 18px rgba(40, 30, 20, 0.18)',
  ctaAlt:  '0 8px 22px rgba(43, 39, 34, 0.35)',
  sheet:   '0 -8px 40px rgba(0, 0, 0, 0.12)',
  bronze:  '0 4px 12px rgba(107, 83, 57, 0.20)',
  tile:    '0 1px 0 rgba(43, 39, 34, 0.04), 0 8px 18px rgba(60, 46, 28, 0.07)', // guidance/feature tile lift
  phone:
    '0 30px 60px rgba(40, 30, 20, 0.18), ' +
    '0 8px 18px rgba(40, 30, 20, 0.10), ' +
    `inset 0 0 0 8px ${ink}, ` +
    'inset 0 0 0 9px rgba(80, 72, 60, 0.4)',
};

// ───── Easing curves (DES_04 §4) ─────
export const ease = {
  out:    'cubic-bezier(0.22, 1, 0.36, 1)', // most screen entrances
  inOut:  'ease-in-out',                    // progress bars
};
export const duration = {
  fast:     150,
  medium:   220,
  slow:     400,
  ceremony: 600,
};

// ===================================================================
// Helper · CSS-variable accessor
// Use when you want the theme to resolve at render time (e.g. for live
// theme switching) rather than baking the literal value into props:
//
//   <div style={{ color: cssVar('inkSoft') }} />
//
// vs. the literal:
//
//   <div style={{ color: inkSoft }} />
// ===================================================================
export const cssVar = (name) => `var(--${name})`;

// ===================================================================
// Pigment lookup by element key — convenience for data-driven coloring
// ===================================================================
export const pigments = {
  metal: { base: metal, deep: metalDeep },
  wood:  { base: wood,  deep: woodDeep },
  fire:  { base: fire,  deep: fireDeep },
  earth: { base: earth, deep: earthDeep },
  water: { base: water, deep: waterDeep },
};

// Pigment alpha ladder helper (DES_04 §3.5.A) — appends the canonical
// hex alpha suffix to a 6-char hex color. Use only with the locked
// alphas: '10', '1A', '40', 'CC'.
//
// Example:
//   const tintBg = withAlpha(metal, '10');     // '#8ba3b810' → ~6% soft
//   const tintBd = withAlpha(metal, '40');     // '#8ba3b840' → ~25% border
//   const eyebr  = withAlpha(metal, 'CC');     // '#8ba3b8CC' → ~80% label
//
// Forbidden alphas (do not pass): '15', '20', '25', '50', '60', '80', '88'
// (i.e. any value not in the canonical set).
export const withAlpha = (hex, suffix) => {
  if (!['10', '1A', '40', 'CC'].includes(suffix)) {
    // dev-time guard — silent in production (Vite replaces import.meta.env.DEV)
    if (import.meta.env.DEV) {
      console.warn(`[tokens] Off-ladder alpha "${suffix}" — DES_04 §3.5.A only allows 10/1A/40/CC.`);
    }
  }
  return hex + suffix;
};
