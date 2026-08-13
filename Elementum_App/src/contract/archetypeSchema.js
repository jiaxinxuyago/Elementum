// ===================================================================
// ELEMENTUM · Archetype Schema (universal field vocabulary)
//
// Purpose
//   One canonical place that declares every field a Stem archetype
//   record carries — names, types, word/char caps, tier gating,
//   asset slots, and the UI surface each field feeds. New
//   designer/writer/engineer picks up this file first.
//
// Status
//   0.1.0-draft · nothing is frozen. Fields are added as the app is
//   built. Shape here is reverse-engineered from the completed 庚
//   reference in archetypeSource.js — not a prescriptive spec.
//
// Tier lives HERE
//   Each field declares its own tier ('free' | 'pro' | 'internal' | 'mixed').
//   Historical `// [FREE]` / `// [PRO]` comments inside archetypeSource.js
//   are developer aids, not the source of truth. If a comment and this
//   schema disagree, the schema wins. Update this file when tier changes.
//
// How to read an entry
//   Each leaf is { type, tier, required, ...constraints, note, example }.
//   Each branch may carry a `_meta` block with section/tier/notes for
//   the whole group.
//
// Relationship to existing files
//   - archetypeSource.js  = live data for all 10 stems (庚 complete,
//                           others partial). Continues to be the source.
//   - STEM_CARD_DATA.js   = band×pattern variant copy (庚 complete).
//   - elementum_profile_database.html = design-time editorial copy.
//   - THIS FILE           = the contract those three should eventually agree on.
//
// When fields change
//   Bump SCHEMA_VERSION. Mark deprecated fields with status: 'deprecated'
//   and keep them in the schema until the data is migrated.
// ===================================================================

export const SCHEMA_VERSION = '0.1.0-draft';

// -------------------------------------------------------------------
// Enum-ish references (single source of truth for controlled vocab)
// -------------------------------------------------------------------

export const TIERS = ['free', 'pro', 'internal', 'mixed'];
// 'free'     — shipped to all users
// 'pro'      — Seeker/Advisor-gated
// 'internal' — never rendered (synthesis context, author notes)
// 'mixed'    — field has sub-parts on both sides of the paywall

export const BANDS    = ['concentrated', 'balanced', 'open'];
export const PATTERNS = ['pure', 'rooted', 'flowing', 'forging', 'tested'];
export const ELEMENTS = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];

// -------------------------------------------------------------------
// VARIABILITY — the tag library
//
// `varyBy` tells the generation pipeline how many authored variants a
// field requires, and tells the DevBar coverage panel how to read a
// "missing" field (one hole, or 150 holes?).
//
// Authoring convention:
//   null                      — static, 1 authored value
//   [dim]                     — one variant per value of `dim`
//   [dim1, dim2, ...]         — one variant per (dim1 × dim2 × ...) combination
//
// A group's `_meta.varyBy` is the default for all leaves under it.
// Individual leaves can override. If nothing is declared, the walker
// assumes ['stem'] (the current baseline).
//
// NOTE: `tier` is NOT a varyBy dimension — it is gating, not authoring.
// Use the field-level `tier` declaration; never put tier inside varyBy.
// -------------------------------------------------------------------

// All dimensions we plausibly classify content by. Extend here first,
// then the library (VARY_LIBRARY) below, then any downstream code.
export const VARY_DIMENSIONS = [
  // — Core archetype identity —
  'stem',        // DM stem — 甲乙丙丁戊己庚辛壬癸
  'tg',          // Ten God — 比肩 劫财 食神 伤官 偏财 正财 七杀 正官 偏印 正印
  'element',     // Five Elements — Wood/Fire/Earth/Metal/Water (yang+yin of same element share)
  'polarity',    // Yang / Yin — orthogonal axis; mostly redundant with stem

  // — Chart structural modifiers —
  'band',        // DM strength — concentrated / balanced / open
  'tgPattern',   // TG structure — pure / rooted / flowing / forging / tested
  'branch',      // 地支 — 子丑寅卯辰巳午未申酉戌亥
  'season',      // Birth season — spring / summer / autumn / winter
  'gender',      // Reader gender — M / F / other

  // — Content-slot axes —
  'lifeDomain',  // career / relationships / wealth / health
  'lifeStage',   // rough life phase bucket when a field varies by age
  'lifePeriod',  // 大运 luck-pillar decade
  'annualPillar' // 流年 annual stem-branch pair (60-year sexagenary cycle)
];

export const VARY_CARDINALITY = {
  stem: 10,
  tg: 10,
  element: 5,
  polarity: 2,
  band: 3,
  tgPattern: 5,
  branch: 12,
  season: 4,
  gender: 2,
  lifeDomain: 4,
  lifeStage: 4,
  lifePeriod: 8,      // approx typical decades covered in a reading
  annualPillar: 60,
};

// Status of each dimension — whether the schema currently uses it,
// plans to, or lists it as available for future fields.
export const VARY_LIBRARY = {
  stem:         { status: 'in-use',    category: 'archetype', description: 'Day Master stem. Primary axis for STEM_CARD_DATA.' },
  tg:           { status: 'planned',   category: 'archetype', description: '10 relational dynamics between DM and other stems. TG_CARD_DATA.' },
  element:      { status: 'available', category: 'archetype', description: 'Five Elements. Use when yang/yin stems of the same element share content.' },
  polarity:     { status: 'available', category: 'archetype', description: 'Yang/Yin axis. Usually covered by stem; use when a field is polarity-only.' },
  band:         { status: 'in-use',    category: 'modifier',  description: 'DM strength signature. Used in block-text variants.' },
  tgPattern:    { status: 'in-use',    category: 'modifier',  description: 'TG structural pattern. Used in block-text variants.' },
  branch:       { status: 'available', category: 'modifier',  description: 'Earthly Branch. Use when content varies by branch (e.g. seasonal calibration specifics).' },
  season:       { status: 'available', category: 'modifier',  description: 'Derivable from birth month; use when content is season-keyed.' },
  gender:       { status: 'available', category: 'modifier',  description: 'Only if copy must differ by gender.' },
  lifeDomain:   { status: 'in-use',    category: 'slot',      description: 'career/relationships/wealth/health. Used in TG_CARD_DATA[tg].domainSignatures.' },
  lifeStage:    { status: 'available', category: 'slot',      description: 'Reader life phase. Not currently used.' },
  lifePeriod:   { status: 'available', category: 'slot',      description: '大运 decade. Dynamic reading material.' },
  annualPillar: { status: 'available', category: 'slot',      description: '流年 annual pillar (60-year cycle).' },
};

// Common compound tags worth naming so writers and generators recognize them.
export const VARY_COMPOUND_EXAMPLES = [
  { tag: ['stem'],                         cardinality:  10, note: 'Baseline stem field' },
  { tag: ['tg'],                           cardinality:  10, note: 'Baseline Ten God field' },
  { tag: ['element'],                      cardinality:   5, note: 'Element-level (yang/yin share)' },
  { tag: ['element', 'tg'],                cardinality:  50, note: 'Compound archetype (DomEnergyTg_Data.js planned)' },
  { tag: ['band', 'tgPattern'],            cardinality:  15, note: 'Variant signature — inside a single stem' },
  { tag: ['stem', 'band', 'tgPattern'],    cardinality: 150, note: 'Full variant surface (STEM_CARD_DATA.js)' },
  { tag: ['tg', 'lifeDomain'],             cardinality:  40, note: 'Per-TG per-domain (TG_CARD_DATA domainSignatures)' },
];

export function cardinalityOf(varyBy) {
  if (!varyBy || !varyBy.length) return 1;
  return varyBy.reduce((n, dim) => n * (VARY_CARDINALITY[dim] || 1), 1);
}

// -------------------------------------------------------------------
// Shared shapes (referenced by itemShape: SHAPES.PhraseDesc etc.)
// -------------------------------------------------------------------

export const SHAPES = {
  PhraseDesc: {
    phrase: { type: 'string', wordCap: 5, required: true,
              note: 'Short identifying label.' },
    desc:   { type: 'string', sentenceMin: 1, sentenceMax: 2, required: true,
              note: 'One sharp sentence with a distinct angle.' },
  },
  TaggedPoolItem: {
    phrase: { type: 'string', wordCap: 3, required: true,
              note: 'Everyday trait phrase, 2–3 words (REA_16 §3 phrase law — no "The + metaphor-noun").' },
    desc:   { type: 'string', sentenceMin: 1, sentenceMax: 3, required: true,
              note: 'Concrete real-life image of the trait (REA_16 §3 desc law).' },
    bands:  { type: "string[] | 'all'", required: true,
              note: "Band tags driving selection: 'all' = every band's pool; array = only those bands." },
  },
};

// -------------------------------------------------------------------
// THE SCHEMA
//
// Every branch (object) may carry a `_meta` block. `_meta` is not a
// field — it describes the group around it. All other keys at a level
// are either leaves (field descriptors) or nested branches.
// -------------------------------------------------------------------

export const ARCHETYPE_SCHEMA = {

  // ─────────────────────────────────────────────────────────────
  identity: {
    _meta: {
      tier: 'free',
      varyBy: ['stem'],
      section: 'Identity Card · DayMasterHero (first reading screen, full-screen, no scroll)',
      status: 'stable',
    },
    archetypeName: {
      type: 'string', wordCap: 3, tier: 'free', required: true,
      note: 'Short archetype label. Appears in hero heading.',
      example: 'The Blade',
    },
    archetypeLabel: {
      type: 'string', wordCap: 6, tier: 'free', required: true,
      note: 'Polarity + element + archetype. Used in pills, headers, share cards.',
      example: 'Yang Metal — The Blade',
    },
    identityIcon: {
      type: 'ComponentKey', tier: 'free', required: true,
      valid: ['BladeJian', 'ArchetypeSeal'],
      placeholderValues: ['ArchetypeSeal'],
      note: 'React component name resolved in RevealScreen.StemSign / HeroStemMark. ' +
            'ArchetypeSeal is an accepted generic fallback, flagged as placeholder by the coverage walker. ' +
            'Each stem should eventually get its own key (like BladeJian for 庚).',
      example: 'BladeJian',
    },
    manifesto: {
      type: 'string', wordCap: 14, tier: 'free', required: true,
      splitOn: ' · ',
      note: 'Two-line tagline. Line 1 bold thesis · Line 2 poetic edge.',
      example: 'Precision before intention · An edge is never given — it is forged.',
    },
    elementIntro: {
      _meta: { tier: 'free', varyBy: ['stem'], section: 'Elemental Nature · Layer 0 (world-building, third-person)' },
      punch: {
        type: 'string', wordMin: 9, wordMax: 12, tier: 'free', required: true,
        note: 'Declarative codex register, third-person, classical source grounding. No "you".',
        example: 'The Blade is the ancient cutting force of Metal.',
      },
      expand: {
        type: 'string', wordMin: 16, wordMax: 20, tier: 'free', required: true,
        note: 'Adjective-rich. Describes the vibe/presence of someone carrying this energy. No "you".',
        example: 'Sharp without announcement, cold without cruelty — it carries in a person the stillness of something that has already decided.',
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  subtitle: {
    type: 'string', tier: 'free', varyBy: ['stem'], required: true,
    section: 'Section 1 · Elemental Nature (sub-header)',
    splitOn: ' · ',
    note: 'Two-part subtitle. Right half names the impulse (Yin/Yang).',
    example: 'Evaluation runs before engagement begins · The Definition Impulse (Yang)',
  },

  // ─────────────────────────────────────────────────────────────
  chips: {
    type: 'string[]', tier: 'free', varyBy: ['stem'], required: true,
    section: 'Section 1 · Elemental Nature (keyword row)',
    arrayLen: 5, itemWordCap: 3,
    note: 'Five single-word (or hyphenated compound) keywords.',
    example: ['Evaluative', 'Uncompromising', 'Precision-first', 'Self-sufficient', 'Justice-oriented'],
  },

  // ─────────────────────────────────────────────────────────────
  yourNature: {
    _meta: {
      tier: 'mixed',
      varyBy: ['stem'],
      section: 'Your Nature block',
      note: 'desc overrides varyBy to stem×band×tgPattern — variants live in STEM_CARD_DATA.js.',
    },
    phrase: {
      type: 'string', wordCap: 4, tier: 'internal', required: false,
      note: 'Archetype sub-identity (e.g. "The Imperial Executioner"). Not rendered — authoring anchor.',
      example: 'The Imperial Executioner',
    },
    desc: {
      type: 'string', sentenceMin: 2, sentenceMax: 3, tier: 'free', required: true,
      varyBy: ['stem', 'band', 'tgPattern'],
      note: '2nd-person portrait. Overridden per band×pattern via STEM_CARD_DATA.js (150 variants).',
      example: "You put the truth ahead of your own comfort, and usually ahead of your own company. People keep the clarity you hand them and stay careful around the edge it came from. The cost never comes up. You've never once shown anyone the bill.",
    },
  },

  // ─────────────────────────────────────────────────────────────
  gifts: {
    _meta: { tier: 'free', varyBy: ['stem', 'band'], section: 'Gifts row (band-tagged pool ×5 → chart sees ×3)', itemShape: 'TaggedPoolItem' },
    type: 'object[]', arrayLen: 5, required: true,
    itemShape: SHAPES.TaggedPoolItem,
    note: 'Band-tagged pool (REA_16 §3 pool laws). selectPoolByBand picks the chart\'s trio: band-tagged items first, then all-tagged in pool order. Authored station-first; `dim` (angle tag) stays station-side.',
    example: [{ phrase: 'Crisis performer', desc: "The day everything breaks is the day you're calmest. While others freeze, you're already cutting the problem into pieces that can be solved.", bands: ['concentrated'] }],
  },

  shadows: {
    _meta: { tier: 'free', varyBy: ['stem', 'band'], section: 'Shadows row (band-tagged pool ×5 → chart sees ×3)', itemShape: 'TaggedPoolItem' },
    type: 'object[]', arrayLen: 5, required: true,
    itemShape: SHAPES.TaggedPoolItem,
    note: 'Symmetric with gifts — same pool construct and selection law.',
    example: [{ phrase: 'Endless second-guessing', desc: "You reach an answer, then reopen it, then reopen it again. The decision everyone's waiting on is still on your desk, not because you can't decide, but because deciding never feels finished.", bands: ['open'] }],
  },

  // ─────────────────────────────────────────────────────────────
  blocks: {
    _meta: {
      tier: 'free',
      varyBy: ['stem'],       // block list shape varies per stem; text keys below expand it
      section: 'Blocks grid (detail page)',
      status: 'stable',
      note: 'Each block carries default text + per-band / per-pattern / per-(band_pattern) overrides. ' +
            'Renderer picks the most specific key available for the active chart. ' +
            'Effective generation cost for text = stems × blocks × variants (~ 10 × 8 × 15 ≈ 1200 pieces at full expansion).',
    },
    type: 'object[]', arrayMin: 5, arrayMax: 11, required: true,
    itemShape: {
      label:   { type: 'string', wordCap: 7, required: true, varyBy: ['stem'],
                 note: 'Block heading. E.g. "How you experience the world".' },
      bands:   { type: 'string[]', valid: BANDS,    required: true, varyBy: ['stem'] },
      patterns:{ type: 'string[]', valid: PATTERNS, required: true, varyBy: ['stem'] },
      priority:{ type: 'object', required: true, varyBy: ['stem'],
                 note: 'Render-order weights keyed by variant signature. `default` is the fallback. Higher = earlier.' },
      text:    { type: 'object', required: true, varyBy: ['stem', 'band', 'tgPattern'],
                 note: 'Keyed by variant signature (e.g. "default", "concentrated", "tested", "concentrated_pure"). ' +
                       '`default` is required. More specific keys override.' },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // (energy block retired 2026-07-24 — never rendered; the keyword row it
  // aliased lives on as the top-level `chips` field. Reference research on
  // stem energy lives in the REA library, not in code.)
  manual: {
    _meta: { tier: 'mixed', varyBy: ['stem'], section: 'Elemental Nature · Usage Manual' },
    concentrated: { type: 'string', tier: 'free', required: true,
                    note: 'When this stem/element is concentrated in the chart.' },
    open:         { type: 'string', tier: 'free', required: true,
                    note: 'When this stem/element is absent or weak.' },
    catalyst:     { type: 'string', tier: 'mixed', required: true,
                    note: 'How to activate it. FREE teaser + PRO full analysis share the field — paywall splits at a natural paragraph break.' },
    resistance:   { type: 'string', tier: 'pro', required: true,
                    note: 'How to work with it when it is creating friction.' },
  },

};

// -------------------------------------------------------------------
// ASSET CONVENTIONS
//
// Where visual assets live, how they are named, and what slot in the
// schema they plug into. Grows as we add more surfaces.
// -------------------------------------------------------------------

export const ASSET_CONVENTIONS = {
  identityIcon: {
    fieldPath: 'identity.identityIcon',
    location:  'Elementum_App/src/components/RevealScreen.jsx (inline SVG components for now). ' +
               'Will migrate to Elementum_App/src/components/stems/<stem>.jsx when we split.',
    naming:    '<ArchetypeName><Shape> — e.g. BladeJian for 庚. Generic fallback: ArchetypeSeal.',
    format:    'React component rendering inline SVG. Props: { size, color }. Size-agnostic.',
    status:    '庚 complete (BladeJian). 甲乙丙丁戊己辛壬癸 use ArchetypeSeal placeholder.',
  },
  stemGlyph: {
    fieldPath:  '(derived from chart.dayMaster.stem)',
    location:   'Elementum_App/src/components/RevealScreen.jsx — HeroStemMark / StemSign',
    format:     'Chinese character rendered in typeface. No raster asset.',
    status:     'stable',
  },
  // Room to grow: stemBadge, elementPigment, tierBadge, blockDividers …
};

// -------------------------------------------------------------------
// UI SURFACE INDEX
//
// Reverse-lookup: "which fields feed which screen?"
// Use when scoping a new component — tells you the fields you can reach for.
// -------------------------------------------------------------------

export const UI_SURFACES = {
  'DayMasterHero (Reveal screen)': [
    'identity.archetypeName',
    'identity.archetypeLabel',
    'identity.identityIcon',
    'identity.manifesto',
  ],
  'Elemental Nature (Layer 0 / world-building)': [
    'identity.elementIntro.punch',
    'identity.elementIntro.expand',
  ],
  'Elemental Nature · Section 1': [
    'subtitle',
    'chips',
    'yourNature.desc',
    'gifts[].phrase', 'gifts[].desc',
    'shadows[].phrase', 'shadows[].desc',
  ],
  'Detail page · Blocks grid': [
    'blocks[].label',
    'blocks[].text.{default|band|pattern|band_pattern}',
  ],
  'Usage Manual': [
    'manual.concentrated',
    'manual.open',
    'manual.catalyst',
    'manual.resistance  [PRO]',
  ],
};
