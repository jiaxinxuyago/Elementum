# Elementum Project Memory

## 0. Purpose

This is the shared operating memory for Elementum. It captures the current product definition, repo structure, design system, engineering architecture, source-of-truth hierarchy, locked rules, implementation priorities, and working conventions so future conversations can continue without re-onboarding from scratch.

Use this memory before making any design, engineering, content, or product recommendation for Elementum.

---

## 1. Product Definition

Elementum is a personal-energy reading product built on the BaZi / 八字 / Four Pillars tradition of Chinese metaphysics.

The core user flow is:

Birth data → deterministic BaZi chart calculation → canonical JSON → archetype key computation → layered reading experience → daily and long-form guidance.

The product must feel serious, culturally grounded, and ritualistic, not like a generic horoscope app. It combines ancient Chinese metaphysical structure with a modern, highly polished mobile reading experience.

The visual world is silk-paper, ink-wash, bronze, parchment, restrained Five Element pigments, and quiet ceremonial UI.

Canonical reference user throughout the project:

庚 · Yang Metal · The Blade · “Precision before intention.”

---

## 2. Core Product Positioning

Elementum is not:

- a horoscope app
- a fortune-cookie generator
- a generic astrology chatbot
- a Western personality quiz with Chinese labels pasted on top
- a dense BaZi calculator for experts

Elementum is:

- a personal archetype and energy-reading system
- deterministic at the calculation layer
- source-grounded at the metaphysical layer
- emotionally resonant at the reading layer
- visually restrained, premium, and atmospheric at the interface layer
- accessible to Western users without requiring them to understand Chinese metaphysics

The design tension is:

Ancient seriousness + daily accessibility.

The user should feel that the reading is deep and real, while still being able to open the app before a meeting and get one clear signal.

---

## 3. Canonical Repo Structure

Top-level project structure:

```text
Elementum_Project/
├── Design/
│   ├── Legends/
│   │   ├── northstar-anchor.html
│   │   ├── legend-primitives.html
│   │   ├── legend-patterns.html
│   │   ├── legend-screens.html
│   │   ├── legend-screens-amendment.html
│   │   ├── legend-v4-polish.html
│   │   ├── legend-v6-card-archetypes.html
│   │   └── legend-v7-ink-wash.html
│   ├── tokens.css
│   ├── icons.svg
│   ├── manifest.md
│   ├── assets/
│   ├── reference/
│   ├── exports/reveal-and-energymap/
│   └── source/
│
├── Documents/Designengineering/
│   ├── DOC1_Calculation_Engine.md
│   ├── DOC2_Archetype_System.md
│   ├── DOC3_Knowledge_Pool.md
│   ├── DOC4_Generation_Architecture.md
│   ├── DOC5_App_Design.md
│   ├── DOC6_Manual.md
│   ├── DOC7_Content_Generation_Guide.md
│   ├── DOC8_Code_Architecture_and_Migration.md
│   ├── DOC9_Archetype_Fields.md
│   ├── DOC_HANDOFF_CONTEXT_TRANSFER.md
│   └── PROMPT_design_legend_v*.md
│
├── Elementum_App/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   ├── content/
│   │   ├── engine/
│   │   ├── store/
│   │   └── styles/
│   └── public/
│
├── Reference/
└── Data/
```

Runtime app lives in:

`Elementum_App/`

Design source of truth lives in:

`Design/`

Specs live in:

`Documents/Designengineering/`

Legacy/reference engine lives in:

`Reference/`

---

## 4. Document Roles

### DOC1 — Calculation Engine

Purpose: deterministic BaZi calculation rules.

Contains:

- year/month/day/hour pillar formulas
- hidden stems
- seasonal phases
- strength gates
- useful-god derivation
- canonical JSON schema
- reference chart verification tests

Do not use DOC1 for UI, content voice, archetype writing, or design decisions.

### DOC2 — Archetype System

Purpose: archetype taxonomy and key computation.

Contains:

- ten stem archetypes
- Tier 1 identity
- Layer 1 / Layer 2 / Layer 3 key system
- 50-key interaction taxonomy
- element colors

Do not use DOC2 for reading prose generation prompts or UI details.

### DOC3 — Knowledge Pool

Purpose: source library.

Contains:

- classical BaZi sources
- modern psychology bridges
- resonance frameworks
- SOURCE-FROM / VERIFY-ONLY / EXCLUDE flags

Doc 3 is additive. Existing verified source entries should not be casually rewritten.

### DOC4 — Generation Architecture

Purpose: reading content architecture and generation pipeline.

Contains:

- file structure for content data
- tier content map
- rendering logic
- field references
- voice rules
- compound card schema
- generation pipeline
- quality gates

Use DOC4 when working on reading content, data architecture, generation scripts, or paywall tiers.

### DOC5 — App Design

Purpose: full visual, UX, IA, motion, and component design spec.

Contains:

- visual identity system
- typography
- motion
- screen flow
- pre-dashboard flow
- dashboard specs
- shared component specs
- locked amendment block

DOC5 base sections may be superseded by the amendment block. Always check §AMENDMENT.

### DOC6 — Manual

Purpose: orientation and cross-document sync rules.

Read first when starting broad project work.

### DOC7 — Content Generation Guide

Purpose: how to author content fields.

Contains:

- prompt templates
- field-specific writing standards
- quality gates
- examples

Use when generating or editing archetype copy.

### DOC8 — Code Architecture & Migration

Purpose: code architecture, Vite migration, extraction plan.

Contains:

- current app layout
- reference engine extraction rules
- runtime data flow
- target Vite structure
- planned modules/components

Use when implementing or refactoring code.

### DOC9 — Archetype Fields

Purpose: designer-facing schema companion.

Contains:

- fields by UI surface
- copy caps
- tier visibility
- asset requirements
- varyBy dimensions
- field status conventions

Schema source of truth is `Elementum_App/src/content/archetypeSchema.js`. DOC9 is the companion, not the schema authority.

### DOC_HANDOFF_CONTEXT_TRANSFER

Purpose: fastest current orientation file.

Contains:

- current repo map
- source-of-truth hierarchy
- design legend history
- locked rules
- open work
- design-canvas lessons learned
- current Git state

This is the best first-read file for future collaborators.

---

## 5. Source-of-Truth Hierarchy

When sources disagree, use this authority order:

1. `northstar-anchor.html`
2. `legend-primitives.html`
3. `legend-patterns.html`
4. `legend-screens-amendment.html`
5. `legend-screens.html`
6. `DOC5 §AMENDMENT`
7. `DOC5 base sections`
8. canvas references / older mockups

Additional source-of-truth rules:

- Visual primitives: `Design/Legends/legend-primitives.html`
- CSS variables: `Design/tokens.css`
- Icon library: `Design/icons.svg`
- Component implementation bridge: `Design/manifest.md`
- Archetype schema: `Elementum_App/src/content/archetypeSchema.js`
- Archetype data: `Elementum_App/src/content/archetypeSource.js`
- Runtime app tokens: `Elementum_App/src/styles/tokens.js`
- Legacy token compatibility: `Elementum_App/src/styles/tokens.jsx`

When editing design primitives, update canonical source first, then sync app mirrors.

---

## 6. Design Legend Version History

### v1 — `legend-primitives.html`

Scope:

- color
- type
- radii
- spacing
- surfaces
- primitives
- italic gallery
- anti-patterns

Status: sealed. Italic gallery updated to v2 rule.

### v2 — `legend-patterns.html`

Scope:

- welcome
- onboarding
- loading
- bottom tab nav
- modals
- forms
- status feedback
- page header

Status: sealed, with deferred italic audit items.

### v3 — `legend-screens.html`

Scope:

- Today
- Energy Map
- Guidance
- Friends
- Profile
- DetailShell
- Calendar
- backgrounds
- tier locks
- modal taxonomy

Status: sealed, but IA superseded by amendment where specified.

### Amendment — `legend-screens-amendment.html`

Scope:

- canonical IA reframe
- Reveal → Reading catalogue → Energy Map
- Reveal redesign
- Reading catalogue
- 10 day-master placeholders
- reading containers α / β / γ
- reading card variants

Status: canonical IA.

### v4 — `legend-v4-polish.html`

Scope:

- refined day-master ink-wash icons
- reading-section icons
- Reveal rhythm
- inline expansion motion
- tab-bar fade-in

Status: sealed.

### v5

Failed build due to scope/quota. Superseded by v6.

### v6 — `legend-v6-card-archetypes.html`

Scope:

- element/pillar tile
- section hero
- card archetypes
- halftone duotone register
- modal-from-card
- tab-strip-inside-card

Status: sealed.

### v7 — `legend-v7-ink-wash.html`

Scope:

- most current visual fidelity benchmark
- ink-wash polish
- element tile
- section hero
- modal hero
- compact strip

Status: sealed. Use as current visual benchmark.

---

## 7. Locked Visual Rules

### 7.1 Colors

Foundation palette:

- Cream: `#F8F6F0`
- Silk: `#F1E9D6`
- Silk Deep: `#ECE2C9`
- Silk Fold: `#DDD1B3`
- Parchment: `#EAE5DF`
- Vellum: `#DDD8CC`
- Paper Hair: `#CDBE9E`
- Ink: `#2B2722`
- Ink Soft: `#4A433B`
- Ink Light: `#857D72`
- Ink Mist: `#B8AFA1`
- Ink Deep: `#1a1815`

Bronze ramp:

- Bronze Light: `#9d8468`
- Bronze: `#8b7355`
- Bronze Dark: `#6b5339`
- Walnut: `#5a4430`
- Gold: `#D4AF37`

Five Element pigments:

- Metal: `#8ba3b8`; Metal Deep: `#6a849a`
- Wood: `#7a9e6e`; Wood Deep: `#587a4d`
- Fire: `#c4745a`; Fire Deep: `#9e5540`
- Earth: `#b89a6a`; Earth Deep: `#927750`
- Water: `#5a7fa8`; Water Deep: `#3e5f85`

Reserved accents:

- Seal: `#A04030`; max once per screen, chop mark only
- Advisor: `#7a5e9a`
- dmBorder: `#584A3E`; day-master pillar highlight only

### 7.2 Pigment Alpha Ladder

Only these pigment alpha suffixes are allowed:

- `${pigment}10` — about 6%, soft fill / card background
- `${pigment}1A` — about 10%, icon tint background
- `${pigment}40` — about 25%, border / chip outline
- `${pigment}CC` — about 80%, eyebrow text
- `${pigment}` — 100%, glyph / heading on tint

Forbidden examples:

- `${pigment}25`
- `${pigment}55`
- `${pigment}80`
- `${pigment}90`

Use a guarded helper such as `withAlpha()` if available.

### 7.3 Typography

Allowed font families:

- Cormorant Garamond — display, archetype titles, sub-headlines
- EB Garamond — body, labels, reading content
- Cinzel — CTA caps / architectural labels
- Noto Serif SC — Chinese glyphs / hanzi

Ma Shan Zheng existed in earlier specs but the current locked project summary emphasizes the four-font system above.

Archetype hero title:

- “The Blade” / equivalent archetype title
- Cormorant Garamond
- 38px
- weight 400
- never bold at hero scale

Title weight rule:

- Hero title ≥30px: weight 400
- Mini title ≤24px: weight 500–600 allowed

Eyebrow standard:

- EB Garamond
- 10px
- weight 500
- letter spacing 2.5px
- uppercase
- element color at 80% / `${pigment}CC`

### 7.4 Italic Rule

DOC5 §AM.10 supersedes older §3.5.E.

Italic is allowed only in two contexts:

1. Sub-headline
   - Cormorant Garamond italic
   - 19px
   - weight 500
   - inkSoft
   - example: “Precision before intention”

2. Microcopy chip
   - EB Garamond italic
   - ≤11.5px
   - inkSoft or inkLight

Italic is forbidden for:

- element-name labels
- composition row names
- descriptive paragraphs
- archetype titles
- eyebrows
- CTAs
- body reading copy
- numerics
- status text

If old legends or code use italic outside these two contexts, treat it as drift.

### 7.5 Border Radius

Allowed radii only:

- `1px`
- `10px`
- `12px`
- `16px`
- `22px`
- `999px`

Forbidden:

- 4
- 6
- 8
- 14
- 18
- 20
- 24
- 28

Phone-frame-only reserved values may appear in prototype frames, not app content.

### 7.6 Spacing

Allowed spacing values only:

- 1
- 3
- 4
- 5
- 6
- 8
- 10
- 12
- 14
- 16
- 18
- 20
- 22
- 26
- 28
- 36
- 44
- 56

Forbidden spacing values include:

- 7
- 9
- 11
- 13
- 15
- 17
- 19
- 21
- 24
- 30
- 32
- 40
- 48
- 64

Do not automatically round everything to 4px multiples; the anchor allows specific non-4 values such as 5, 10, 26.

### 7.7 Card Surfaces

Only five surface types are allowed:

1. Cream-cardstock
   - `rgba(248,241,225,0.92)`
   - `paperHair` border
   - used for standard cards, chips, archetype glyph cards

2. Tinted element-themed
   - `${pigment}10` background
   - `${pigment}40` border
   - used for element-themed cards

3. Quiet
   - `#EBE5D6`
   - `#DCD3C0` border
   - used for secondary cards, lock strips

4. Elevated
   - blurred chrome / elevated sheet
   - used for modals and tab bar

5. Cardstock-active
   - gold rim
   - used for Today decade card

New surface variants require a doc patch.

---

## 8. IA and Navigation Rules

Canonical IA per DOC5 §AM.1:

1. Reveal page
   - identity card
   - full energy summary
   - “Enter Your Readings” CTA
   - acts as the first-time view of the Energy Map

2. Reading tab
   - catalogue page
   - drill-down reading cards
   - not a flat dashboard

3. Energy Map
   - destination from Reading’s top action
   - same core content as Reveal
   - no first-time CTA

4. “Energy Map” eyebrow
   - renames the formerly titled “Energy Blueprint”

Bottom tab nav per DOC5 §AM.2:

- icons-only
- no text labels
- five tabs:
  - Today
  - Guidance
  - Reading
  - Compat
  - Profile
- Reading is the center tab
- Reading carries seal-dot indicator when active
- tab nav appears only on dashboard routes
- tab bar should fade in after content settles, around 400ms where specified

---

## 9. App Architecture Memory

The live app is a React + Vite project at `Elementum_App/`.

Important runtime areas:

```text
Elementum_App/src/
├── App.jsx
├── components/
│   ├── onboarding/
│   ├── LoadingScreen.jsx
│   ├── RevealScreen.jsx
│   ├── shared/
│   └── dev/DevBar.jsx
├── content/
│   ├── archetypeSchema.js
│   ├── archetypeSource.js
│   └── STEM_CARD_DATA.js
├── engine/
│   └── calculator.js
├── store/
│   └── chartContext.jsx
└── styles/
    ├── tokens.js
    └── tokens.jsx
```

Current known component status:

Built:

- WelcomeScreen
- OnboardingShell
- OnboardingSteps
- LoadingScreen
- EnergyBlueprint
- IdentityRibbon
- Icon component wrappers
- DevBar

Partial:

- RevealScreen — exists but predates full amendment refactor
- StemSeal — partly inline / needs extraction

Planned:

- BottomTabNav
- ReadingScreen
- EnergyMapScreen
- TodayScreen
- GuidanceScreen
- FriendsScreen
- ProfileScreen
- ChartRevealPage
- most shared primitives such as ReadingCard, LockStrip, PairCard, DominantCard, ForceRow, Button, TextInput, Toggle, modals, Toast, etc.

---

## 10. Runtime Data Flow

Core flow:

```text
User birth data
  → calculateBaziChart()
  → canonical chart JSON
  → dayMaster.stem
  → dayMaster.strength / band
  → tgPattern
  → dominantTGs[]
  → configKey = `${stem}_${band}_${tgPattern}`
  → variant lookup in STEM_CARD_DATA
  → baseline lookup in archetypeSource.js
  → render reading components
```

Two-level lookup pattern:

```javascript
const tgPattern = computeTgPattern(chart);
const band = computeBand(chart);
const configKey = `${dm.stem}_${band}_${tgPattern}`;

const configData = STEM_CARD_DATA[configKey] || {};
const stemData = STEM_CARD_DATA[dm.stem] || {};

const yourNature = configData.yourNature || stemData.yourNature || {};
```

Content source rules:

- `archetypeSource.js` is the hand-authored source of truth for baseline stem and TG data.
- `STEM_CARD_DATA.js` contains variant entries by `stem_band_tgPattern`.
- `archetypeSchema.js` defines canonical field shapes.
- DOC9 describes those fields by UI surface.
- Do not invent fields inside components. Add to schema first.

---

## 11. Design → Implementation Manifest Memory

`Design/manifest.md` is the engineering bridge.

Every component row defines:

- source legend section
- app file path
- tokens consumed
- icons used
- supported states
- status
- drift notes

Before implementing any component:

1. Check the manifest row.
2. Check the source legend section.
3. Check tokens and icon IDs.
4. Check DOC5 amendment if IA or visual behavior might be superseded.
5. Implement app code to match manifest.
6. If app code and manifest differ, fix app or update manifest only if the source legend changed.

Important planned component targets:

- `components/shared/BottomTabNav.jsx`
- `components/dashboard/ReadingScreen.jsx`
- `components/dashboard/EnergyMapScreen.jsx`
- `components/dashboard/TodayScreen.jsx`
- `components/dashboard/GuidanceScreen.jsx`
- `components/dashboard/FriendsScreen.jsx`
- `components/dashboard/ProfileScreen.jsx`
- `components/shared/ReadingCard.jsx`
- `components/shared/LockStrip.jsx`
- `components/shared/DominantCard.jsx`
- `components/shared/PairCard.jsx`
- `components/shared/ForceRow.jsx`

---

## 12. Icon System Memory

Canonical icon file:

`Design/icons.svg`

Mirrored to:

`Elementum_App/public/icons.svg`

Consumption pattern:

```jsx
<svg><use href="/icons.svg#icon-id" /></svg>
```

Icon prefixes:

- `el-*` — five element icons
- `dm-*` — ten day-master stem icons, currently placeholders needing ink-wash commission/polish
- `tab-*` — bottom tab navigation icons
- `read-*` — reading-section catalogue icons, currently placeholders/refinement welcome
- `ico-*` — utility/chrome icons

Important IDs:

Element icons:

- `el-metal`
- `el-wood`
- `el-fire`
- `el-earth`
- `el-water`

Day-master icons:

- `dm-jia`
- `dm-yi`
- `dm-bing`
- `dm-ding`
- `dm-wu`
- `dm-ji`
- `dm-geng`
- `dm-xin`
- `dm-ren`
- `dm-gui`

Tab icons:

- `tab-today`
- `tab-guidance`
- `tab-reading`
- `tab-compat`
- `tab-profile`

Reading icons:

- `read-elemental`
- `read-dominant`
- `read-forces`
- `read-chapters`
- `read-pillars`

Utility icons:

- `ico-lock`
- `ico-chev-r`
- `ico-chev-l`
- `ico-arrow-r`
- `ico-dismiss`
- `ico-sunrise`
- `ico-empty`
- `ico-edit`

Do not duplicate inline icons unless the manifest or legend specifically allows a local illustrative SVG. Canonical shared icons belong in `icons.svg`.

---

## 13. Core Screens Memory

### Welcome Screen

Source:

`legend-patterns.html` §1

App file:

`components/onboarding/WelcomeScreen.jsx`

Status:

Built

Notes:

- First impression screen.
- Atmospheric silk/ink background.
- Returning-user redirect behavior.
- Existing background/pill alpha drift may need simplification to locked cardstock 0.92.

### Onboarding

Source:

`legend-patterns.html` §2

App files:

- `components/onboarding/OnboardingShell.jsx`
- `components/onboarding/OnboardingSteps.jsx`

Status:

Built

Notes:

- Seven-step birth data collection.
- Should feel ritualistic, not like a generic form.
- Partial progress resume matters.

### Loading Screen

Source:

`legend-patterns.html` §3

App file:

`components/LoadingScreen.jsx`

Status:

Built

Notes:

- Uses five element icons in pulse animation.
- Handoff to Reveal.

### Reveal Screen

Source:

`legend-screens-amendment.html` §A1

App file:

`components/RevealScreen.jsx`

Status:

Partial

Canonical behavior:

- first-time view
- identity card
- full energy summary
- Enter Your Readings CTA
- uses user’s day-master icon
- should align with amendment’s Reveal redesign

Known issue:

- Current component predates §A1 redesign and needs refactor.
- Ink-wash DM icons remain placeholders.

### Reading Screen

Source:

`legend-screens-amendment.html` §A2

App file:

`components/dashboard/ReadingScreen.jsx`

Status:

Planned

Canonical behavior:

- catalogue page
- not a flat dashboard
- reading card variants
- top action to Energy Map
- background likely `bg-reading-04-rice-paper`

### Energy Map Screen

Source:

`legend-screens-amendment.html` §A3

App file:

`components/dashboard/EnergyMapScreen.jsx`

Status:

Planned

Canonical behavior:

- destination from Reading top action
- same content family as Reveal
- no first-time CTA
- shared EnergyMapBlock should be reused with footer-mode prop

### Today Screen

Source:

`legend-screens.html` §2

App file:

`components/dashboard/TodayScreen.jsx`

Status:

Planned

Notes:

- Daily / temporal guidance.
- Today decade card uses `cardstock-active` gold rim.

### Guidance Screen

Source:

`legend-screens.html` §4

App file:

`components/dashboard/GuidanceScreen.jsx`

Status:

Planned

Notes:

- Daily reading plus tier-gated guidance cards.
- Uses advisor/seeker tiers.

### Friends / Compat Screen

Source:

`legend-screens.html` §5

App file:

`components/dashboard/FriendsScreen.jsx`

Status:

Planned

Notes:

- Uses Compat tab icon.
- Relationship / compatibility feature.

### Profile Screen

Source:

`legend-screens.html` §6

App file:

`components/dashboard/ProfileScreen.jsx`

Status:

Planned

Notes:

- Tier state.
- Birth-data correction entry point.
- Settings/dev fixtures.

---

## 14. Shared Components Memory

### BottomTabNav

Status: planned.

Hard rules:

- icons-only
- no labels
- five tabs: Today / Guidance / Reading / Compat / Profile
- Reading center
- active seal-dot indicator
- only visible on dashboard routes

### IdentityRibbon

Status: built.

Purpose:

- user identity summary
- day-master seal / composition rows

Current drift:

- italic v2 compliance already patched in key places.

### EnergyBlueprint

Status: built.

Purpose:

- element composition visualization
- uses segmented bars and element icons

Current note:

- “Energy Blueprint” naming should be treated carefully because IA renames main label to “Energy Map” in some surfaces.

### ReadingCard

Status: planned.

Source:

Amendment §A6.

Variants:

- standard
- featured/tinted
- daily compact
- locked
- empty

Use card archetypes from v6/v7.

### LockStrip

Status: planned.

Use:

- tier-gated content
- quiet surface
- microcopy italic allowed only at ≤11.5px

### DominantCard

Status: planned.

Important rule:

- large tinted card
- icon + name only
- no body copy per amendment §A1

### PairCard

Status: planned.

Use:

- catalyst / resistance / paired force
- element-tinted surface
- `${pigment}10` fill + `${pigment}40` border

### SegmentedBar

Status: planned.

Use:

- IdentityRibbon
- EnergyBlueprint
- possible Friends axis display

Geometry:

- 8-cell bar
- gap 3px
- height 7px
- radius 1

---

## 15. Content and Voice Memory

Elementum prose should be:

- declarative
- precise
- psychologically resonant
- structurally grounded
- non-hedging
- not self-help generic
- not therapy-speak
- not moralizing

Avoid:

- “may sometimes”
- “tends to”
- “you might”
- “people with this chart”
- generic positive affirmations
- unsupported mystical claims
- dense BaZi jargon in user-facing output

The user-facing reading should feel like recognition, not explanation.

Core principle:

The reading is a recognition event, not information delivery.

Chinese as art, English as information:

- Chinese characters can appear as glyphs/art/authenticity markers.
- User-facing information must be understandable in English.
- Do not require Western users to understand BaZi terms.

---

## 16. Tier and Product Model Memory

Known tiers/content logic:

- Free content: core identity, elemental nature, basic daily signal
- Seeker / Pro: expanded readings, domain content, seasonal calibration, deeper unlocked cards
- Advisor: deeper AI/guidance layer or premium assistant-like consultation
- Self-report synthesis: generated on purchase only, not generated at serve time

Important architectural principle from DOC4/DOC6:

Profile data is the single source of truth, not LLM-generated content. Free and Pro content should be hand-authored or generated offline and shipped as data. LLM generation is deferred to specific paid/self-report synthesis flows.

---

## 17. Calculation / BaZi Engine Memory

DOC1 governs calculation.

Do not casually alter calculation logic.

Any calculation engine change requires:

1. identify exact formula section
2. preserve anchor tests
3. rerun verification tests
4. update version history if formulas/schema change
5. sync dependent docs if canonical JSON changes

Core calculation outputs feed:

- dayMaster stem
- element
- polarity
- strength / band
- element composition
- tgPattern
- dominant Ten Gods
- catalyst / resistance / seasonal calibration

Reference chart for product design:

庚 Yang Metal · The Blade.

---

## 18. Open Work Memory

Current pending engineering tasks:

1. Promote v7 ink-wash icons into `Design/icons.svg`, replacing `dm-*` placeholders.
2. Wire `BottomTabNav` component according to icons-only rule.
3. Build `ReadingScreen` catalogue page using v6/v7 card archetypes.
4. Build `EnergyMapScreen` as destination from Reading top action.
5. Refactor `RevealScreen` to match amendment §A1.
6. Patch/monitor token drift between `tokens.css`, `tokens.js`, and `tokens.jsx`.
7. Audit remaining italic drift in older legends and app code.
8. Extract/shared primitives: StemSeal, SegmentedBar, Button, ReadingCard, LockStrip, PairCard, DominantCard, ForceRow.
9. Build dashboard screens: Today, Guidance, Friends/Compat, Profile.

Pending design work:

1. v8 expansion of v7 ink-wash system to all 10 stems × all sizes.
2. Full Reading catalogue screen.
3. Full Today / Guidance / Friends / Profile screens.
4. Reading-content destination pages.
5. Hand-finished day-master ink-wash brushwork.

Pending DOC5 patches:

1. Cascade old §11 references with amendment IA.
2. Fold motion primitive §AM.4 into base motion system.
3. Continue italic v2 cross-reference cleanup.

---

## 19. Design Canvas Lessons Memory

From v1–v7 iteration history:

1. Canvas can produce SVG, not true raster ink painting.
2. Ink-wash quality improves only when actual reference paintings are uploaded.
3. Canvas cannot fetch URLs; upload files directly.
4. Tight scope works better than broad screen sets.
5. Acceptance criteria must be quantifiable.
6. Do not give hedge options like “brushwork OR geometric” if brushwork is required.
7. Always ensure the current DOC5 with §AMENDMENT is included before design generation.
8. Use public-domain / open-access ink references as study material.
9. v7 succeeded because it was tightly scoped to four archetypes with uploaded ink references.

---

## 20. Project Work Protocol

Before proposing design work:

1. Check this memory.
2. Check `DOC_HANDOFF_CONTEXT_TRANSFER.md` for current status.
3. Check DOC5 §AMENDMENT.
4. Check `Design/manifest.md` for component mapping.
5. Check relevant legend file.
6. Check `tokens.css` and `icons.svg` if primitives are involved.

Before proposing code work:

1. Identify target app file.
2. Check manifest status.
3. Check source legend and DOC5 amendment.
4. Check if data fields already exist in `archetypeSchema.js`.
5. Do not invent tokens, icons, fields, spacing, radius, or surfaces.
6. Preserve existing data flow.

Before editing content:

1. Check DOC7 for field writing guidance.
2. Check DOC9 for field cap and UI surface.
3. Check `archetypeSchema.js` for actual field shape.
4. Match 庚 / The Blade quality bar.
5. Avoid hedging and generic self-help language.

Before touching calculation:

1. Check DOC1.
2. Do not improvise formulas.
3. Use anchor tests.
4. Sync dependent docs if schema changes.

---

## 21. Assistant Behavior for Elementum Conversations

When discussing Elementum, act as:

- senior product/design engineer
- systems-minded creative technologist
- strict design-system guardian
- direct technical collaborator

Response style:

- concise but specific
- call out drift and violations directly
- prioritize implementation path over abstract commentary
- distinguish canonical vs outdated sources
- do not flatter weak ideas
- propose concrete files/components/patches
- preserve the project’s high aesthetic bar

When uncertain:

- say what source is missing
- do not invent missing repo details
- ask for the file only if needed
- otherwise proceed using the current memory and best-known source hierarchy

---

## 22. Quick Locked Rules Checklist

Before finalizing any Elementum recommendation, verify:

- Does it follow Reveal → Reading catalogue → Energy Map?
- Is the tab nav icons-only?
- Did I avoid forbidden italic contexts?
- Did I use only allowed radii?
- Did I use only allowed spacing values?
- Did I use only approved card surfaces?
- Did I use only allowed pigment alpha suffixes?
- Did I avoid duplicate inline icons?
- Did I avoid inventing schema fields?
- Did I preserve `seal #A04030` max once per screen?
- Did I avoid using `dmBorder` outside day-master pillar highlight?
- Did I check `Design/manifest.md` for component path/status?
- Did I respect `tokens.css` as canonical?
- Did I keep “The Blade” hero title at Cormorant 38 / 400 if relevant?

---

## 23. Current Best Next Implementation Sequence

Recommended implementation order from the current state:

1. Build `BottomTabNav.jsx`
   - relatively contained
   - unlocks dashboard shell
   - enforces critical icons-only amendment rule

2. Build dashboard shell / routing structure
   - Today / Guidance / Reading / Compat / Profile route placeholders
   - show tab nav only on dashboard routes

3. Build `ReadingScreen.jsx`
   - core IA correction
   - use ReadingCard variants
   - top action to Energy Map

4. Refactor `RevealScreen.jsx`
   - align with amendment §A1
   - share EnergyMapBlock with EnergyMapScreen

5. Build `EnergyMapScreen.jsx`
   - reuse Reveal energy summary without first-time CTA

6. Extract/standardize shared primitives
   - ReadingCard
   - LockStrip
   - StemSeal
   - SegmentedBar
   - PairCard
   - DominantCard

7. Then build Today / Guidance / Compat / Profile.

Do not start with broad visual redesign. The main risk now is IA/component drift, not lack of visual direction.

---

## 24. One-Sentence Project Compass

Elementum should feel like opening a private silk-paper codex that knows your energetic structure: deterministic underneath, poetic on the surface, restrained in UI, and precise enough to feel uncomfortably accurate.

