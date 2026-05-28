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
// Element painterly art — the 5 ink-wash element studies in
// public/concept-arts/five-elements/. Used as scene-hero imagery on
// cards/heroes (Mooon scene-hero pattern, legend-v6). Filenames contain
// spaces + parens, so we encode the path.
// ───────────────────────────────────────────────────────────────────
const ELEMENT_ART_FILE = {
  Metal: 'Metal-Blade (1).png',
  Wood:  'Wood-Wood (1).png',
  Fire:  'Fire-Burn (1).png',
  Earth: 'Earth-Earth (1).png',
  Water: 'Water-Water (1).png',
};

// Returns an encoded /concept-arts/... URL for the given element, or null.
export function elementArt(element) {
  const file = ELEMENT_ART_FILE[element];
  return file ? `/concept-arts/five-elements/${encodeURIComponent(file)}` : null;
}

// Composite of all five — useful for neutral/overview heroes.
export const ELEMENT_ART_COMPOSITE = `/concept-arts/five-elements/${encodeURIComponent('Five Elements (1).png')}`;
