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
// Shared shapes (referenced by itemShape: 'LiunianEntry' etc.)
// -------------------------------------------------------------------

export const SHAPES = {
  PhraseDesc: {
    phrase: { type: 'string', wordCap: 5, required: true,
              note: 'Short identifying label.' },
    desc:   { type: 'string', sentenceMin: 1, sentenceMax: 2, required: true,
              note: 'One sharp sentence with a distinct angle.' },
  },
  LiunianEntry: {
    trigger: { type: 'string', required: true,
               note: 'Year/month/pillar configuration that activates this signature.' },
    event:   { type: 'string', required: true,
               note: 'What the user experiences when it activates.' },
    timing:  { type: 'string', required: true,
               note: 'Concrete years/branches when it peaks.' },
    source:  { type: 'string', required: true,
               note: 'Classical source citation (for internal verification — not rendered).' },
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
      _meta: { tier: 'free', section: 'Elemental Nature · Layer 0 (world-building, third-person)' },
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
    type: 'string', tier: 'free', required: true,
    section: 'Section 1 · Elemental Nature (sub-header)',
    splitOn: ' · ',
    note: 'Two-part subtitle. Right half names the impulse (Yin/Yang).',
    example: 'Evaluation runs before engagement begins · The Definition Impulse (Yang)',
  },

  // ─────────────────────────────────────────────────────────────
  chips: {
    type: 'string[]', tier: 'free', required: true,
    section: 'Section 1 · Elemental Nature (keyword row)',
    arrayLen: 5, itemWordCap: 3,
    note: 'Five single-word (or hyphenated compound) keywords.',
    example: ['Evaluative', 'Uncompromising', 'Precision-first', 'Self-sufficient', 'Justice-oriented'],
  },

  // ─────────────────────────────────────────────────────────────
  yourNature: {
    _meta: {
      tier: 'mixed',
      section: 'Your Nature block',
      note: 'desc varies by STEM_band_tgPattern — variants live in STEM_CARD_DATA.js.',
    },
    phrase: {
      type: 'string', wordCap: 4, tier: 'internal', required: false,
      note: 'Archetype sub-identity (e.g. "The Imperial Executioner"). Not rendered — authoring anchor.',
      example: 'The Imperial Executioner',
    },
    desc: {
      type: 'string', sentenceMin: 2, sentenceMax: 3, tier: 'free', required: true,
      note: '2nd-person portrait. Overridden per band×pattern via STEM_CARD_DATA.js.',
      example: "The most honest person in any room, often the most alone in it. Precision arrives before warmth does — people lean on the edge and rarely find what's behind it.",
    },
  },

  // ─────────────────────────────────────────────────────────────
  gifts: {
    _meta: { tier: 'free', section: 'Gifts row (3 cards)', itemShape: 'PhraseDesc' },
    type: 'object[]', arrayLen: 3, required: true,
    itemShape: SHAPES.PhraseDesc,
    example: [{ phrase: 'The Structural Read', desc: "You don't choose to assess — the read finishes before you've decided to begin it." }],
  },

  shadows: {
    _meta: { tier: 'free', section: 'Shadows row (3 cards)', itemShape: 'PhraseDesc' },
    type: 'object[]', arrayLen: 3, required: true,
    itemShape: SHAPES.PhraseDesc,
    example: [{ phrase: 'The Finished Too Early', desc: "You tend to call things complete before they've fully arrived — the clarity that recognizes finished things can misread what's still becoming." }],
  },

  // ─────────────────────────────────────────────────────────────
  blocks: {
    _meta: {
      tier: 'free',
      section: 'Blocks grid (detail page)',
      status: 'stable',
      note: 'Each block carries default text + per-band / per-pattern / per-(band_pattern) overrides. ' +
            'Renderer picks the most specific key available for the active chart.',
    },
    type: 'object[]', arrayMin: 5, arrayMax: 11, required: true,
    itemShape: {
      label:   { type: 'string', wordCap: 7, required: true,
                 note: 'Block heading. E.g. "How you experience the world".' },
      bands:   { type: 'string[]', valid: BANDS,    required: true },
      patterns:{ type: 'string[]', valid: PATTERNS, required: true },
      priority:{ type: 'object', required: true,
                 note: 'Render-order weights keyed by variant signature. `default` is the fallback. Higher = earlier.' },
      text:    { type: 'object', required: true,
                 note: 'Keyed by variant signature (e.g. "default", "concentrated", "tested", "concentrated_pure"). ' +
                       '`default` is required. More specific keys override.' },
    },
  },

  // ─────────────────────────────────────────────────────────────
  lifeDomains: {
    _meta: {
      tier: 'internal',
      status: 'deprecated',
      note: 'Stem-level lifeDomains is being migrated to TG_CARD_DATA[tg].domains. ' +
            'Do NOT author new stem-level entries. Retained for reference only.',
    },
  },

  // ─────────────────────────────────────────────────────────────
  dominantEnergy: {
    _meta: { tier: 'mixed', section: 'Section 2 · The Force (Dominant Energy layer)' },
    label: {
      type: 'string', wordCap: 3, tier: 'free', required: true,
      note: 'User-facing element-specific label. e.g. "The Force" for Metal.',
      example: 'The Force',
    },
    teaser: {
      type: 'string', sentenceMin: 2, sentenceMax: 3, tier: 'free', required: true,
      note: 'Recognition moment + door-opener for the element-dominant quality.',
    },
    characterDesc: {
      type: 'string', paragraphMin: 3, paragraphMax: 5, tier: 'pro', required: true,
      note: 'Full characterological description of the element-dominant quality.',
    },
  },

  // ─────────────────────────────────────────────────────────────
  energy: {
    _meta: { tier: 'mixed', section: 'Section 3 · The Edge in Motion (environmental/operational)' },
    keywords: {
      type: 'string[]', arrayLen: 5, itemWordCap: 3, tier: 'free', required: true,
      aliases: ['chips'],
      note: 'Canonical name: `keywords`. Older entries may use `chips`. Normalize on read.',
      example: ['Defining', 'Cutting', 'Structural clarity', 'Forced decision', 'Precision force'],
    },
    what:       { type: 'string', tier: 'free', required: true,
                  note: 'Classical description of the stem energy. Used by DM intro + absent-energy card.' },
    represents: { type: 'string', tier: 'free', required: true,
                  note: 'What this energy represents when present in the environment.' },
    liunian:    { type: 'string', tier: 'pro', required: true,
                  note: 'What happens when this energy enters the luck cycle or annual pillar.' },
  },

  // ─────────────────────────────────────────────────────────────
  manual: {
    _meta: { tier: 'mixed', section: 'Elemental Nature · Usage Manual' },
    concentrated: { type: 'string', tier: 'free', required: true,
                    note: 'When this stem/element is concentrated in the chart.' },
    open:         { type: 'string', tier: 'free', required: true,
                    note: 'When this stem/element is absent or weak.' },
    catalyst:     { type: 'string', tier: 'mixed', required: true,
                    note: 'How to activate it. FREE teaser + PRO full analysis share the field — paywall splits at a natural paragraph break.' },
    resistance:   { type: 'string', tier: 'pro', required: true,
                    note: 'How to work with it when it is creating friction.' },
  },

  // ─────────────────────────────────────────────────────────────
  seasonalCalibration: {
    _meta: {
      tier: 'mixed',
      section: 'The Forging Season (PRO detail page) · 调候用神 system',
      note: 'Source: 穷通宝鉴. Distinct from 病药用神 / catalyst system.',
    },
    label:   { type: 'string', wordCap: 3, tier: 'free', required: true,
               note: 'User-facing element-specific label. e.g. "The Forging Season" for Metal.' },
    element: { type: 'Element', valid: ELEMENTS, tier: 'free', required: true,
               note: 'The calibrating element this stem responds to seasonally.' },
    teaser:  { type: 'string', sentenceMin: 2, sentenceMax: 3, tier: 'free', required: true },
    desc:    { type: 'string', paragraphMin: 4, paragraphMax: 6, tier: 'pro', required: true,
               note: 'Full seasonal calibration reading. Includes classical source anchors.' },
  },

  // ─────────────────────────────────────────────────────────────
  liunianSignatures: {
    _meta: {
      tier: 'pro',
      section: 'Dynamic Energy Blueprint (foundation)',
      note: 'Structured by life domain. Each entry uses the LiunianEntry shape.',
    },
    career:        { type: 'object', required: true, itemShape: SHAPES.LiunianEntry },
    relationships: { type: 'object', required: true, itemShape: SHAPES.LiunianEntry },
    wealth:        { type: 'object', required: true, itemShape: SHAPES.LiunianEntry },
    health:        { type: 'object', required: true, itemShape: SHAPES.LiunianEntry },
  },

  // ─────────────────────────────────────────────────────────────
  psych: {
    _meta: { tier: 'internal', section: 'Synthesis pass context — never rendered', status: 'stable' },
    bigFive:    { type: 'string', required: true, note: 'Big Five / HEXACO signature.' },
    jungian:    { type: 'string', required: true, note: 'Dominant function + cognitive pattern.' },
    attachment: { type: 'string', required: true, note: 'Attachment style + texture.' },
    shadow:     { type: 'string', required: true, note: 'Core wound / defense mechanism.' },
  },

  archetypes: {
    type: 'string[]', tier: 'internal', required: false,
    note: 'External framework mappings (MBTI, Jungian, Enneagram, etc.). Author reference only.',
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
  'Section 2 · The Force': [
    'dominantEnergy.label',
    'dominantEnergy.teaser',
    'dominantEnergy.characterDesc  [PRO]',
  ],
  'Section 3 · The Edge in Motion': [
    'energy.keywords',
    'energy.what',
    'energy.represents',
    'energy.liunian  [PRO]',
  ],
  'Usage Manual': [
    'manual.concentrated',
    'manual.open',
    'manual.catalyst',
    'manual.resistance  [PRO]',
  ],
  'The Forging Season (PRO detail)': [
    'seasonalCalibration.label',
    'seasonalCalibration.element',
    'seasonalCalibration.teaser',
    'seasonalCalibration.desc  [PRO]',
  ],
  'Dynamic Energy Blueprint (PRO)': [
    'liunianSignatures.career',
    'liunianSignatures.relationships',
    'liunianSignatures.wealth',
    'liunianSignatures.health',
  ],
};
