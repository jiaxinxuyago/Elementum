// ===================================================================
// ELEMENTUM · Screen background map
// ===================================================================
// Single source for screen → painted-background assignment. Mirrors the
// authority table in Design/assets/Library/backgrounds-library.html
// (line ~1212) and DOC5 §20 Asset Library.
//
// PNGs live in Elementum_App/public/backgrounds/ (mirrored from
// Design/assets/backgrounds/). Reference them by bare filename — PageBg
// resolves the /backgrounds/ path.
//
// NOTE: the Today / Guidance / Friends / Profile / reading-detail PNGs
// are currently low-fidelity placeholder art (flat/gradient stand-ins,
// ~14 KB) pending the ChatGPT/DALL-E generation pipeline. They drop in
// at the same filename when the picture-rich versions are produced — no
// code change needed. The reveal / onboarding / energymap / reading
// catalogue backgrounds are final painted art.
// ===================================================================

// IMPORTANT: only 5 of the library's 24 backgrounds are finished painted
// art (reveal · onboarding · energymap · reading-catalogue rice-paper).
// The other 8 are "PLACEHOLDER · TO BE GENERATED" spec cards with text
// printed on them — NOT usable as image backgrounds (they bleed the word
// "PLACEHOLDER" through the UI). So for those screens we render a CSS
// `gradient` that honours the entry's documented composition intent, and
// switch `gradient` → `src` once the real PNG lands at the same filename.
// Atmospheric ink-wash scenery (lightweight, ~300–450KB) used as subtle
// low-opacity page backgrounds (DOC5 §20 opacity ladder). Each dashboard
// tab gets a fitting scene + position + optional warm/cool wash.
const MIST_5 = '/concept-arts/atmospheric/atmospheric-5-layer.png'; // layered ridges, panoramic
const MIST_3 = '/concept-arts/atmospheric/atmospheric-3-layer.png'; // quieter, 3-layer

export const SCREEN_BG = {
  // Reading catalogue — real painted rice-paper texture.
  reading: { src: 'bg-reading-04-rice-paper.png', opacity: 0.10 },

  // Today — layered ridges anchored at top, warm gold glow washed over
  // ("subtle warm glow at top, fades to paper").
  today: {
    src: MIST_5, opacity: 0.16, pos: 'center top', size: '140% auto',
    gradient: 'radial-gradient(150% 60% at 50% -10%, rgba(212,175,55,0.10), rgba(212,175,55,0) 58%)',
  },
  // Guidance — quiet mist, centered, faint premium violet corner.
  guidance: {
    src: MIST_3, opacity: 0.12, pos: 'center', size: '160% auto',
    gradient: 'radial-gradient(120% 50% at 100% 0%, rgba(122,94,154,0.06), transparent 55%)',
  },
  // Friends — ridges centered (the horizon = the meeting line).
  compat: { src: MIST_5, opacity: 0.13, pos: 'center', size: '150% auto' },
  // Profile — quietest: 3-layer mist sunk to the bottom, very faint.
  profile: { src: MIST_3, opacity: 0.08, pos: 'center bottom', size: '150% auto' },
};

// Reading-detail pages carry their imagery in the SceneHero band now
// (P3), so they no longer need a full-page background. Kept as a no-op
// resolver so callers can opt back in if a real immersive bg is produced.
export function readingDetailBg() {
  return null;
}

// ───────────────────────────────────────────────────────────────────
// THUMBNAIL CARD LIBRARY · "Inkstone" Card Art System (v2)
// ───────────────────────────────────────────────────────────────────
// Production asset library from Claude Design's Thumbnail Card Library.
// 102 themed tiles (5 elements × 6–8 motif variants × 3 shapes —
// landscape `_w`, square `_s`, portrait `_p`) + 40 generic art assets
// (10 scene-heroes, 10 premium banners, 20 generic cards).
//
// Assets live in /concept-arts/library/ (mirrored from the bundle).
// Each painting carries the same shuǐmò treatment so themed and generic
// read as one family.
const LIBRARY_DIR = '/concept-arts/library';

// Variant counts per element from the bundle's EL config.
const ELEMENT_VARIANT_COUNT = {
  Wood: 6, Fire: 8, Earth: 6, Metal: 6, Water: 8,
};

// Stem → canonical variant index within its element family.
// Yang stems → variant 1, Yin stems → variant 2. Variants 3–N are
// alternates available to other slots (Dominant, Today day-art, etc.).
const STEM_VARIANT = {
  '甲': 1, '乙': 2,
  '丙': 1, '丁': 2,
  '戊': 1, '己': 2,
  '庚': 1, '辛': 2,
  '壬': 1, '癸': 2,
};
const STEM_ELEMENT = {
  '甲': 'Wood',  '乙': 'Wood',
  '丙': 'Fire',  '丁': 'Fire',
  '戊': 'Earth', '己': 'Earth',
  '庚': 'Metal', '辛': 'Metal',
  '壬': 'Water', '癸': 'Water',
};

const lowerEl = (el) => (el || '').toLowerCase();
const clampN = (el, n) => {
  const max = ELEMENT_VARIANT_COUNT[el] || 6;
  if (!n || n < 1) return 1;
  if (n > max) return ((n - 1) % max) + 1;
  return n;
};

// ── Themed asset resolvers ─────────────────────────────────────────
// Returns the landscape (wide) catalogue-tile painting for an element.
// `n` defaults to 1 (the Yang stem's variant); pass the desired motif
// index to grab an alternate (e.g. Dominant uses a different variant
// from Elemental Nature even though both are the DM element).
export function tileArt(element, n = 1) {
  if (!element) return null;
  const el = lowerEl(element);
  const idx = clampN(element, n);
  return `${LIBRARY_DIR}/t_${el}_${idx}_w.png`;
}

// Square 1:1 themed feature tile (guidance grid, elemental-draw deck).
export function sqArt(element, n = 1) {
  if (!element) return null;
  const el = lowerEl(element);
  const idx = clampN(element, n);
  return `${LIBRARY_DIR}/t_${el}_${idx}_s.png`;
}

// 3:4 portrait card-face — for day-master hero, compat person cards,
// reading-detail hero. The stem's variant index keeps Yin stems on
// their own painting so 辛 the jewel reads differently from 庚 the blade.
export function portArt(element, nOrStem) {
  if (!element) return null;
  const el = lowerEl(element);
  const n = typeof nOrStem === 'string' && STEM_VARIANT[nOrStem]
    ? STEM_VARIANT[nOrStem]
    : (nOrStem || 1);
  const idx = clampN(element, n);
  return `${LIBRARY_DIR}/t_${el}_${idx}_p.png`;
}

// ── Generic asset resolvers ────────────────────────────────────────
// Scene-hero band — neutral landscape (10 variants).
export function heroArt(n = 1) {
  const idx = ((n - 1) % 10 + 10) % 10 + 1;
  return `${LIBRARY_DIR}/g_hero_${idx}.png`;
}

// Premium banner — panoramic with left-anchored scrim (10 variants).
export function bannerArt(n = 1) {
  const idx = ((n - 1) % 10 + 10) % 10 + 1;
  return `${LIBRARY_DIR}/g_banner_${idx}.png`;
}

// Generic card — 1-8 square, 9-14 portrait, 15-20 wide (20 variants).
export function genericCardArt(n = 1) {
  const idx = ((n - 1) % 20 + 20) % 20 + 1;
  return `${LIBRARY_DIR}/g_card_${idx}.png`;
}

// Picks a deterministic generic-card index from a string key (e.g. a
// stem-branch or seed). Keeps the same chart showing the same painting
// every time without manually wiring a mapping.
export function genericCardArtFor(key, range = [1, 20]) {
  const [lo, hi] = range;
  let h = 0;
  const s = String(key || '');
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  const span = hi - lo + 1;
  const idx = lo + (((h % span) + span) % span);
  return genericCardArt(idx);
}

// ── Backward-compatible legacy resolvers ───────────────────────────
// `stemArt(stem)` — returns the portrait variant for a stem. Updated to
// pull from the new library so existing consumers automatically get the
// richer art (Yin stems read distinct from Yang within the same element).
export function stemArt(stem) {
  const element = STEM_ELEMENT[stem];
  if (!element) return null;
  return portArt(element, stem);
}

// `elementArt(element, stem?)` — returns the landscape catalogue-tile
// painting for an element, preferring the stem's variant when known.
export function elementArt(element, stem) {
  if (!element) return null;
  const n = (stem && STEM_VARIANT[stem]) || 1;
  return tileArt(element, n);
}

// ── Generic constants — back-compat aliases ────────────────────────
// The old moodboard's composite / landscape / enso are mapped to the
// new generic cards. The old generic-card consumers (Pillar Patterns,
// Life Chapters) now reach into the richer 20-card pool.
export const ART_LANDSCAPE = heroArt(1);
export const ART_COMPOSITE = genericCardArt(1);
export const ART_ENSO      = genericCardArt(14);
export const ART_METAL_BLADE = portArt('Metal', 1);
export const ELEMENT_ART_COMPOSITE = ART_COMPOSITE;

// ───────────────────────────────────────────────────────────────────
// DESIGN RULE · No two thumbnails on the same page show the same painting.
// ───────────────────────────────────────────────────────────────────
// dedupeArt(slots) takes a list of art "slot" preferences and returns a
// map keyed by slot.key where every URL is distinct. If a slot's
// preferred art is already claimed by an earlier slot, the helper bumps
// it to the next variant in the SAME family (themed → next motif index
// for that element; generic → next card index in the shape range).
//
// Slot shape:
//   { key:'string', kind:'tile'|'sq'|'port', element:'Metal'|…, n?:1, stem?:'庚' }
//   { key:'string', kind:'hero'|'banner'|'card', n?:1, range?:[lo, hi] }
//
// Usage in a screen:
//   const arts = useMemo(() => dedupeArt([
//     { key:'elemental', kind:'tile', element:dmElement, n:1 },
//     { key:'dominant',  kind:'tile', element:dmElement, n:3 },
//     { key:'forces',    kind:'tile', element:catalystEl, n:1 },
//     { key:'chapters',  kind:'card', n:20, range:[15,20] },
//   ]), [dmElement, catalystEl]);
//   <VisualTile artSrc={arts.elemental} … />
//
// First slot in the list wins its preferred art; later slots bump.
// Order your slots by visual prominence (hero / featured first).
const SLOT_RESOLVERS = {
  tile:   (s, n) => tileArt(s.element, n),
  sq:     (s, n) => sqArt(s.element, n),
  port:   (s, n) => portArt(s.element, n),
  hero:   (_, n) => heroArt(n),
  banner: (_, n) => bannerArt(n),
  card:   (_, n) => genericCardArt(n),
};
const SLOT_RANGE = {
  // Themed slots — max variant index per element.
  tile: (s) => [1, ELEMENT_VARIANT_COUNT[s.element] || 6],
  sq:   (s) => [1, ELEMENT_VARIANT_COUNT[s.element] || 6],
  port: (s) => [1, ELEMENT_VARIANT_COUNT[s.element] || 6],
  // Generic slots — overrideable via slot.range.
  hero:   (s) => s.range || [1, 10],
  banner: (s) => s.range || [1, 10],
  card:   (s) => s.range || [1, 20],
};

export function dedupeArt(slots) {
  const used = new Set();
  const out = {};
  for (const slot of slots) {
    const resolve = SLOT_RESOLVERS[slot.kind];
    if (!resolve) { out[slot.key] = null; continue; }
    const [lo, hi] = SLOT_RANGE[slot.kind](slot);
    // Preferred variant — accept slot.n as a string-or-stem (port can
    // take a stem), otherwise fall back to the range's lower bound.
    let preferred = slot.n;
    if (slot.kind === 'port' && typeof slot.stem === 'string' && STEM_VARIANT[slot.stem]) {
      preferred = STEM_VARIANT[slot.stem];
    }
    let n = typeof preferred === 'number' ? preferred : lo;
    let url = resolve(slot, n);
    // Walk the family until we find an unused painting (or exhaust the range).
    const max = hi - lo + 1;
    for (let attempts = 0; url && used.has(url) && attempts < max; attempts++) {
      n = lo + (((n - lo + 1) % max + max) % max);
      url = resolve(slot, n);
    }
    out[slot.key] = url;
    if (url) used.add(url);
  }
  return out;
}
