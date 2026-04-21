# DOC8 — Code Architecture & Migration Guide
## Single-file artifact → Vite + React production project

**Version:** 2.0 · April 2026
**Source engine:** `Elementum/Elementum_Engine.jsx` (single-file development artifact, ~5,900 lines)
**Architecture reference:** `Documents/Designengineering/DOC4_Generation_Architecture.md`

---

## Overview

The current development state is a single-file React JSX artifact
(`Elementum_Engine.jsx`) that inlines all data, calculation logic, and UI
components into one file for fast iteration without a build step. This is
intentional for the design/content phase. When moving to production, this
file splits into a structured Vite project with proper imports.

**The data files in `Code/` are already production-ready.** They exist as
separate files now. The migration task is to wire the engine to import from
them instead of inlining copies.

---

## Current project layout (pre-migration)

```
Elementum_Project/
├── Code/
│   ├── archetypeSource.js          ← SINGLE SOURCE OF TRUTH. Hand-authored.
│   │                                  10 stem entries + 10 TG entries +
│   │                                  internal constants for generation.
│   ├── STEM_CARD_DATA.js           ← 150 variant entries (stem_band_tgPattern).
│   │                                  Pre-generated via Pipeline A.
│   │                                  Phase 1: 15 庚 entries authored.
│   │                                  Remaining 135: batchGenerate.js output.
│   ├── batchGenerate.js            ← Offline generation script (Node.js).
│   │                                  NOT bundled with the app. Run separately.
│   └── [DomEnergyTg_Data.js]       ← 50 compound archetype cards (TBD).
│                                      Output of batchGenerate.js Pipeline A.
│                                      Keyed by domEl_specificTenGod (e.g. 金_七杀).
│
├── Data/
│   └── elementum_profile_database.html  ← HTML twin of archetypeSource.js.
│                                           Parallel editing surface. Must stay
│                                           in sync with archetypeSource.js at
│                                           all times.
│
├── Documents/Designengineering/
│   ├── DOC4_Generation_Architecture.md  ← Authoritative architecture spec.
│   ├── DOC5_App_Design.md               ← UI design system + component specs.
│   ├── DOC7_Content_Generation_Guide.md ← Prompt guidance for all content fields.
│   └── DOC8_Code_Architecture_and_Migration.md  ← This file.
│
├── Elementum/
│   └── Elementum_Engine.jsx        ← Single-file dev artifact. Contains:
│                                      • Inlined copy of archetypeSource.js data
│                                      • Inlined copy of STEM_CARD_DATA.js entries
│                                      • BaZi calculation functions
│                                      • All React components
│                                      NOTE: data inlined here is a copy — the
│                                      Code/ files are the authoritative source.
│
└── Others/
    └── index.html                  ← Standalone token cost calculator (keep separate).
```

---

## File association rules (must be maintained at all times)

| File | Paired with | Rule |
|---|---|---|
| `Code/archetypeSource.js` | `Data/elementum_profile_database.html` | Every field change must be applied to both. HTML is a parallel editing surface — not generated from JS. |
| `Code/archetypeSource.js` | `Elementum/Elementum_Engine.jsx` (inlined copy) | Engine inlines archetypeSource data for single-file mode. When a field is authored in archetypeSource.js, sync it to the engine's inlined copy. |
| `Code/STEM_CARD_DATA.js` | `Elementum/Elementum_Engine.jsx` (inlined copy) | Variant entries in STEM_CARD_DATA.js must be kept in sync with the inlined entries near the bottom of STEM_CARD_DATA in the engine. |
| `Code/batchGenerate.js` | `Code/STEM_CARD_DATA.js`, `[DomEnergyTg_Data.js]` | batchGenerate.js produces these files. Do not hand-edit generated entries — re-run the pipeline with corrected prompts. |

**Key rule:** `archetypeSource.js` defines all field names. Any new field must be named there first. All downstream files (engine, HTML, STEM_CARD_DATA.js) follow. Never rename a field in a downstream file independently.

---

## Data loading architecture

### Runtime data flow (production)

```
User enters birth data
        ↓
calculateBaziChart()
  → dm.stem          (e.g. "庚")
  → band             ("concentrated" | "balanced" | "open")
  → tgPattern        ("pure" | "rooted" | "flowing" | "forging" | "tested")
  → dominantTGs[]    (ordered list of Ten God keys)
        ↓
configKey = `${dm.stem}_${band}_${tgPattern}`   (e.g. "庚_balanced_pure")
        ↓
┌─────────────────────────────────────────────────────────────────┐
│  Layer resolution (two-level lookup, falls back to baseline)    │
│                                                                 │
│  1. STEM_CARD_DATA[configKey]   ← variant-specific fields       │
│     yourNature.phrase, yourNature.desc, gifts[], shadows[]      │
│     Falls back to stem baseline if configKey not found.         │
│                                                                 │
│  2. archetypeSource.STEM_CARD_DATA[stem]  ← all other fields   │
│     identity.elementIntro, subtitle, chips, blocks[], manual,  │
│     energy, psych, archetypes                                   │
│                                                                 │
│  3. archetypeSource.TG_CARD_DATA[tg]  ← Ten God content        │
│     title, rulingRealm, chips, outputs[], frictions[],         │
│     hiddenDynamic, domainSignatures, sixRelations,             │
│     liunianSignatures                                           │
└─────────────────────────────────────────────────────────────────┘
        ↓
Render: Identity Card → Elemental Nature → Dominant Energy Cards
```

### Variant lookup — exact code pattern (preserve in migration)

```javascript
const tgPattern  = computeTgPattern(chart);
const band       = computeBand(chart);
const configKey  = `${dm.stem}_${band}_${tgPattern}`;

// Two-level lookup: config override → stem baseline
const configData = STEM_CARD_DATA[configKey] || {};
const stemData   = STEM_CARD_DATA[dm.stem]   || {};

const yourNature = configData.yourNature || stemData.yourNature || {};
const desc       = firstN(yourNature.desc || "", 2);
```

This pattern must be preserved exactly. `STEM_CARD_DATA` in production refers to
the imported `Code/STEM_CARD_DATA.js`. In single-file mode, variant keys are
inlined directly into the engine's `STEM_CARD_DATA` constant.

---

## Target Vite project structure

```
elementum-app/
├── src/
│   ├── content/
│   │   ├── archetypeSource.js      ← copy of Code/archetypeSource.js
│   │   │                              Export: STEM_CARD_DATA, TG_CARD_DATA
│   │   │                              (internal constants stay here too —
│   │   │                               batchGenerate.js imports them at gen time)
│   │   ├── STEM_CARD_DATA.js       ← copy of Code/STEM_CARD_DATA.js
│   │   │                              Export: STEM_CARD_DATA
│   │   │                              Named export — no default
│   │   └── DomEnergyTg_Data.js     ← copy of Code/DomEnergyTg_Data.js (when ready)
│   │                                  Export: COMPOUND_CARDS
│   │                                  Named export — no default
│   │
│   ├── engine/
│   │   └── calculator.js           ← BaZi calculation functions (pure JS, no React)
│   │                                  Extracted from Elementum_Engine.jsx
│   │
│   ├── components/
│   │   ├── App.jsx                 ← Main shell. State, routing, tab logic.
│   │   ├── BirthForm.jsx           ← Birth date/time input form
│   │   ├── DayMasterHero.jsx       ← Identity card (Layer 0)
│   │   ├── YourNature.jsx          ← Elemental Nature card (Layer 1–4)
│   │   ├── TenGodCard.jsx          ← Dominant energy card + TG layer
│   │   ├── ReadingBlock.jsx        ← Expandable reading block (blocks[])
│   │   ├── LuckPillars.jsx         ← Decades tab
│   │   ├── FlowPeriod.jsx          ← Today tab flow period card
│   │   ├── HeroPopupOverlay.jsx    ← Education popups (element/stem/polarity)
│   │   ├── PaywallModal.jsx        ← Tier upgrade modal
│   │   └── [shared SVG components] ← BladeIllustration, ArchetypeSeal, etc.
│   │
│   └── constants.js                ← C (colors), EL_C, EL_ZH, TIERS,
│                                      TIER_LABELS, TIER_PRICES, STYLE (CSS)
│
├── generate/
│   └── batchGenerate.js            ← copy of Code/batchGenerate.js
│                                      NOT bundled. Run with Node.js:
│                                      node generate/batchGenerate.js [command]
│
├── index.html
├── package.json
└── vite.config.js
```

---

## What to extract from `Elementum_Engine.jsx`

The engine file is structured in layers. Extract in this order:

### 1. `src/content/archetypeSource.js`
Do not extract from the engine. Copy `Code/archetypeSource.js` directly. The engine's inlined data is a copy — `Code/archetypeSource.js` is the authoritative version.

**Exports required:**
```javascript
export const STEM_CARD_DATA = { ... }   // 10 stem entries
export const TG_CARD_DATA   = { ... }   // 10 TG entries
export const CLASSICAL_STEM_ANCHORS = { ... }  // internal — for batchGenerate.js
export const CLASSICAL_TG_ANCHORS   = { ... }  // internal — for batchGenerate.js
export const BINGYI_FRAMING         = { ... }  // internal — for batchGenerate.js
export const PILLAR_STAGE           = { ... }  // internal — for batchGenerate.js
```

### 2. `src/content/STEM_CARD_DATA.js`
Copy `Code/STEM_CARD_DATA.js` directly. Do not use the inlined variant entries from the engine.

**Export:**
```javascript
export const STEM_CARD_DATA = { ... }   // 150 stem_band_tgPattern entries
```

⚠️ **Name collision:** both `archetypeSource.js` and `STEM_CARD_DATA.js` export a constant named `STEM_CARD_DATA`. In `App.jsx` and components, import them with aliases:
```javascript
import { STEM_CARD_DATA as STEM_BASELINES } from './content/archetypeSource.js';
import { STEM_CARD_DATA as STEM_VARIANTS  } from './content/STEM_CARD_DATA.js';
```

### 3. `src/engine/calculator.js`
Extract all pure calculation functions from the engine. These have no React dependencies and can be tested independently.

**Extract these constants and functions:**
```javascript
// Lookup tables
const HS, EB, STEM_ELEM, BRANCH_ELEM, STEM_YIN, BRANCH_YIN

// Solar term tables
const SOLAR_TERMS_2000_2100  (large lookup table — extract exactly)

// Core functions
function getTenGod(dmEl, dmYin, tEl, tYin)
function getSolarTermDate(year, termIndex)
function getSolarMonthIndex(date, year)
function getBaziYear(date)
function calculateBaziChart(birthData)   // main chart calculation

// Band and pattern resolution
function computeBand(chart)
function computeTgPattern(chart)

// Utility
function firstN(str, n)
```

**Export all as named exports. No default export.**

### 4. `src/constants.js`
Extract from the engine:
```javascript
export const C = { ... }               // color system
export const EL_C = { ... }            // element colors
export const EL_ZH = { ... }           // element Chinese chars
export const TIERS = { ... }
export const TIER_LABELS = { ... }
export const TIER_PRICES = { ... }
export const STYLE = `...`             // global CSS string
export const ARCHETYPE_MANIFESTO = { ... }  // 10 stem manifestos
```

### 5. `src/components/` — React components
Extract each component from the engine. Components are clearly separated by
function declarations and comments in the engine file. Key components and their
data dependencies:

| Component | Imports from |
|---|---|
| `DayMasterHero` | `archetypeSource.STEM_CARD_DATA`, `ARCHETYPE_MANIFESTO`, `constants` |
| `YourNature` | `archetypeSource.STEM_CARD_DATA` (baseline), `STEM_VARIANTS` (config override), `calculator` |
| `TenGodCard` | `archetypeSource.TG_CARD_DATA`, `constants` |
| `ReadingBlock` | `archetypeSource.STEM_CARD_DATA` (blocks[]), `constants` |
| `LuckPillars` | `calculator`, `constants` |
| `FlowPeriod` | `constants` |
| `HeroPopupOverlay` | `archetypeSource.STEM_CARD_DATA`, `archetypeSource.TG_CARD_DATA` |
| `PaywallModal` | `constants` |
| `BirthForm` | `calculator`, `constants` |

### 6. `src/components/App.jsx`
The main shell. Imports all components, wires state. Contains:
- `useState` for `chart`, `reading`, `tab`, `tier`, `popup`, `showPaywall`
- Calls `calculateBaziChart()` on form submit
- Resolves `configKey`, `configData`, `stemData` at the App level and passes down as props
- Tab navigation: `reading` / `decades` / `today`

---

## Import map — production wiring

```javascript
// App.jsx
import { calculateBaziChart, computeBand, computeTgPattern } from './engine/calculator.js';
import { STEM_CARD_DATA as STEM_BASELINES } from './content/archetypeSource.js';
import { TG_CARD_DATA }                     from './content/archetypeSource.js';
import { STEM_CARD_DATA as STEM_VARIANTS  } from './content/STEM_CARD_DATA.js';
import { COMPOUND_CARDS }                   from './content/DomEnergyTg_Data.js';
import { C, EL_C, EL_ZH, TIERS, ARCHETYPE_MANIFESTO } from './constants.js';

// Component variant lookup (replaces engine's inline pattern)
const stemData   = STEM_BASELINES[dm.stem]  || {};
const configData = STEM_VARIANTS[configKey] || {};
const yourNature = configData.yourNature || stemData.yourNature || {};
```

---

## Migration order

Migrate in this exact order — each step has no unresolved dependencies:

1. **`src/constants.js`** — no dependencies
2. **`src/engine/calculator.js`** — no dependencies
3. **`src/content/archetypeSource.js`** — copy from `Code/`; no dependencies
4. **`src/content/STEM_CARD_DATA.js`** — copy from `Code/`; no dependencies
5. **`src/content/DomEnergyTg_Data.js`** — copy from `Code/` when Pipeline A complete
6. **`src/components/[shared SVGs]`** — no data dependencies
7. **`src/components/BirthForm.jsx`** — imports calculator
8. **`src/components/DayMasterHero.jsx`** — imports content + constants
9. **`src/components/YourNature.jsx`** — imports content + constants
10. **`src/components/TenGodCard.jsx`** — imports content + constants
11. **`src/components/ReadingBlock.jsx`** — imports content + constants
12. **`src/components/LuckPillars.jsx`** — imports calculator + constants
13. **`src/components/FlowPeriod.jsx`** — imports constants
14. **`src/components/HeroPopupOverlay.jsx`** — imports content + constants
15. **`src/components/PaywallModal.jsx`** — imports constants
16. **`src/components/App.jsx`** — imports everything; wires state and variant lookup

After each step: `npm run dev` — confirm no console errors before proceeding.

---

## Generation pipelines (run before or after migration — separate from app build)

`batchGenerate.js` is a Node.js script run outside the Vite build. It generates
the content files that the app imports. Run it in `generate/`:

```bash
# Pipeline A — Compound archetype cards (50 keys, one-time offline)
# Output → src/content/DomEnergyTg_Data.js
node generate/batchGenerate.js generate-compound
node generate/batchGenerate.js retrieve-compound [batch-id]
node generate/batchGenerate.js check-compound
node generate/batchGenerate.js merge-compound

# Pipeline A (planned) — Archetype variant templates (150 keys)
# Output → src/content/STEM_CARD_DATA.js (merges with hand-authored entries)
# TBD — defined when archetypeSource.js content authoring is complete.

# Pipeline B — Self-report synthesis (per user, on purchase, at runtime via API)
# NOT a batch script — called server-side at purchase time.
# TBD — see DOC4 §7 for synthesis prompt structure.
```

**Key rule:** `batchGenerate.js` imports internal constants from `archetypeSource.js`
(`CLASSICAL_STEM_ANCHORS`, `CLASSICAL_TG_ANCHORS`, `BINGYI_FRAMING`, `PILLAR_STAGE`).
These are verification/grounding constants — they are never served to users.
In the Vite project, `batchGenerate.js` imports directly from `src/content/archetypeSource.js`.

---

## package.json and vite.config.js

```json
{
  "name": "elementum",
  "type": "module",
  "scripts": {
    "dev":   "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react":     "^18.x",
    "react-dom": "^18.x"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.x",
    "vite": "^5.x"
  }
}
```

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

---

## index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Elementum</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Noto+Serif+SC:wght@400;600&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

Note: `Others/index.html` (token cost calculator) is a standalone tool — it does
not migrate into the Vite project. Keep it in `Others/`. This doc lives
at `Documents/Designengineering/DOC8_Code_Architecture_and_Migration.md`.

---

## Verification checklist

After migration, confirm:

- [ ] `npm run dev` runs with no console errors
- [ ] Birth form accepts input, calls `calculateBaziChart()`, chart renders
- [ ] Identity card renders: archetype name, manifesto, element/stem/polarity badges, SVG illustration
- [ ] "The Element" block renders (elementIntro.punch + elementIntro.expand)
- [ ] "Your Nature" block renders the correct `yourNature.desc` for the chart's `configKey`
- [ ] Variant lookup falls back to stem baseline when configKey not in STEM_CARD_DATA
- [ ] Dominant energy cards render with correct TG content
- [ ] Pro gate hides/shows content correctly by tier
- [ ] Decades tab renders luck pillar timeline
- [ ] Today tab renders current flow period

**Reference chart for testing:**
Birth: `1995-04-29, 18:00, Beijing (UTC+8), Male`
Expected: 庚 Day Master · 乙亥年 庚辰月 庚寅日 乙酉时
Expected archetype config: `庚_[band]_[tgPattern]` (verify band/tgPattern from chart output)

---

## Field name authority

All field names are defined in `Code/archetypeSource.js`. When in doubt, that file is the authority. Common sources of naming confusion during migration:

| Correct field name | Old/wrong names (do not use) |
|---|---|
| `yourNature` | `psychCore`, `psychcore` |
| `identity.elementIntro` | `elementalIntro`, `stemIntro` |
| `STEM_CARD_DATA` (archetypeSource) | `STEM_DATA`, `ARCHETYPE_DATA` |
| `STEM_CARD_DATA` (variants file) | `STEM_NATURE_VARIANTS`, `TEMPLATE_DB` |
| `blocks[]` | `readingBlocks`, `sections` |
| `manual.concentrated` | `manual.strong`, `manual.heavy` |
| `manual.open` | `manual.weak`, `manual.absent` |
