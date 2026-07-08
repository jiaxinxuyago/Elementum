// ===================================================================
// ELEMENTUM · Screen background map
// ===================================================================
// Single source for screen → painted-background assignment. Mirrors the
// authority table in Design/assets/Library/backgrounds-library.html
// (line ~1212) and DOC5 §20 Asset Library.
//
// PNGs live in Elementum_App/public/backgrounds/ (mirrored from
// Design/backgrounds/). Reference them by bare filename — PageBg
// resolves the /backgrounds/ path.
//
// [Group D — RESOLVED] The notes below are HISTORICAL. Every screen now maps to
// a finished v7 plate PNG (Rendered Screens v2) with a real `src` — no screen
// renders a gradient-only placeholder. Kept for context only.
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
// v7 scenery-margin PLATES (Rendered Screens v2). Each screen sits on a
// composed-silk plate — cream + grain + painted scenery baked into the
// margins, UI in the quiet center zone. The plate PNGs are the finished
// painted backgrounds in public/backgrounds/. Rendered at high opacity
// (the plates carry their own cream base, so they read as the full
// background, not a faint wash). `size: cover` to fill the frame.
const PLATE = (src, opacity = 0.78) => ({ src, opacity, size: 'cover', pos: 'center' });

export const SCREEN_BG = {
  // Reading catalogue — rice-paper plate.
  reading: PLATE('bg-reading-04-rice-paper.png', 0.7),
  // Today — quiet-paper plate.
  today:   PLATE('bg-onboarding-04-quiet-paper.png'),
  // Guidance — quiet-paper plate + a faint premium violet corner.
  guidance: {
    ...PLATE('bg-onboarding-04-quiet-paper.png'),
    gradient: 'radial-gradient(120% 50% at 100% 0%, rgba(122,94,154,0.06), transparent 55%)',
  },
  // Friends — center-glow plate (the meeting horizon).
  compat:  PLATE('bg-energymap-03-center-glow.png'),
  // Profile — corner-stamp plate (quietest, just a touch of register).
  profile: PLATE('bg-onboarding-01-corner-stamp.png', 0.7),
};

// Per-time-period plates for the Today-hub drill-downs (Day/Month/Year use
// the corner-quartet plate; Decade uses split-horizon). Consumed by the
// drill-down pages so they read distinct from the hub.
export const PLATE_BG = {
  day:    PLATE('bg-energymap-02-corner-quartet.png'),
  month:  PLATE('bg-energymap-02-corner-quartet.png'),
  year:   PLATE('bg-energymap-02-corner-quartet.png'),
  decade: PLATE('bg-reveal-04-mist-veil.png'),
  detail: PLATE('bg-onboarding-04-quiet-paper.png'),
  rawchart: PLATE('bg-reading-01-side-margins.png', 0.7),
};

// Reading-detail pages sit on the quiet-paper plate (Rendered Screens v2);
// the SceneHero band carries the element imagery on top. Subtle so the
// cards stay legible.
export function readingDetailBg() {
  return { src: 'bg-onboarding-04-quiet-paper.png', opacity: 0.5, size: 'cover', pos: 'center' };
}

// ───────────────────────────────────────────────────────────────────
// THUMBNAIL CARD LIBRARY · "Inkstone" Card Art System (v2)
// ───────────────────────────────────────────────────────────────────
// Production asset library from Claude Design's Thumbnail Card Library,
// pruned 2026-07-07 to the reachable set (§5-P6): all landscape tiles
// (`t_<el>_<n>_w`), portrait variants 1–2 (`_p`, yang/yin stem pair),
// the five catalogue energy squares (`_s`, named in surfaceContent's
// ENERGY_TILE), and the 10 scene heroes. Full pool remains in git and
// the design bundle.
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
// (The library's banner / generic-card / catalogue-crop pools and their
// resolvers were retired 2026-07-07: zero consumers, ~62 MB shipped dead
// weight — the review's §5-P6 finding. Restore from git if a redesign
// slot wants them, and re-add the PNGs from the design bundle.)
export function heroArt(n = 1) {
  const idx = ((n - 1) % 10 + 10) % 10 + 1;
  return `${LIBRARY_DIR}/g_hero_${idx}.png`;
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
//   { key:'string', kind:'tile'|'port', element:'Metal'|…, n?:1, stem?:'庚' }
//   { key:'string', kind:'hero', n?:1, range?:[lo, hi] }
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
  port:   (s, n) => portArt(s.element, n),
  hero:   (_, n) => heroArt(n),
};
const SLOT_RANGE = {
  // Themed slots — max variant index per element.
  tile: (s) => [1, ELEMENT_VARIANT_COUNT[s.element] || 6],
  // Portraits ship variants 1–2 only (yang/yin stem pair; see portArt).
  port: () => [1, 2],
  // Generic slots — overrideable via slot.range.
  hero:   (s) => s.range || [1, 10],
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
