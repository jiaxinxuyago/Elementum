# DOC8 — Code Architecture & Migration Guide
## Single-file artifact → Vite + React production project

**Version:** 3.2 · April 2026
**Source engine:** `Reference/Elementum_Engine.jsx` (~6,900 lines)
**Related docs:** DOC4 (generation architecture) · DOC5 §9 (Reveal) · DOC5 §11 (dashboard component specs) · DOC5 §20 (Asset Library) · DOC7 (content authoring)
**Status:** Phase 1 migration **executed** — Vite project scaffolded, content files live, pre-dashboard flow (Welcome → Reveal) running. The **Reveal screen** has had its Section 1 (Identity) composition refined per DOC5 §9 v1.6 — see "Phase 1 component additions" below. Phase 2 dashboard component extraction is **pending** — use this guide for that work.

---

## Overview

Elementum was prototyped as a single-file React JSX artifact (`Elementum_Engine.jsx`) that inlined all data, calculation logic, and UI components into one file for fast iteration without a build step. That file is preserved in `Reference/` as the extraction source for Phase 2.

The production app lives in `Elementum_App/` as a Vite + React project with proper imports. **The content files are now the runtime source of truth** inside the app at `Elementum_App/src/content/`. Any remaining extraction (dashboard components, energy data, reading engine) is documented in `Reference/README.md` and the step-by-step guide below.

---

## Current project layout (post-migration)

```
Elementum_Project/
├── Elementum_App/                       ← LIVE Vite app. Runtime source of truth.
│   ├── src/content/
│   │   ├── archetypeSource.js           ← SINGLE SOURCE OF TRUTH. Hand-authored.
│   │   │                                   10 stem entries + 10 TG entries +
│   │   │                                   internal constants for generation.
│   │   ├── STEM_CARD_DATA.js            ← 150 variant entries (stem_band_tgPattern).
│   │   │                                   Phase 1: 15 庚 entries authored.
│   │   │                                   Remaining 135: batchGenerate.js output.
│   │   └── [DomEnergyTg_Data.js]        ← 50 compound archetype cards (TBD, Pipeline A2).
│   ├── src/engine/
│   │   └── calculator.js                ← Pure BaZi calc (extracted from engine 1585–2103).
│   ├── src/store/, src/styles/, src/components/  ← Other extracted / fresh modules.
│   └── package.json, vite.config.js, index.html, etc.
│
├── Data/
│   └── elementum_profile_database.html  ← HTML twin of archetypeSource.js.
│                                           Must stay in sync at all times.
│
├── Reference/
│   ├── Elementum_Engine.jsx             ← Original single-file artifact. Extraction source
│   │                                       for Phase 2 dashboard components.
│   └── README.md                        ← Extraction progress + remaining targets.
│
├── Scripts/
│   ├── batchGenerate.js                 ← Offline generation script. NOT bundled with app.
│   └── tokenCostCalculator.html         ← Standalone utility.
│
├── Design/                              ← Phase 1/2A design source (tokens, flow JSX, ink PNGs).
│
├── Documents/Designengineering/
│   ├── DOC1 … DOC8
│   ├── DOC_HANDOFF_ClaudeCode.md
│   └── ClaudeCode_Prompt_Phase1.md
│
└── .claude/launch.json                  ← Preview server config (points at Elementum_App).
```

**Retired locations (for readers of earlier DOC8 versions):**
- `Code/` — deleted. `archetypeSource.js` and `STEM_CARD_DATA.js` moved to `Elementum_App/src/content/`. `batchGenerate.js` → `Scripts/`. `Elementum_Engine.jsx` → `Reference/`.
- `Others/` — deleted. Single file folded into `Scripts/tokenCostCalculator.html`.
- `Elementum_Engine.html` (browser preview wrapper) — superseded by `Elementum_App/index.html` + Vite dev server.

---

## File association rules (maintain at all times)

| File | Paired with | Rule |
|---|---|---|
| `Elementum_App/src/content/archetypeSource.js` | `Data/elementum_profile_database.html` | Every field change must be applied to both. |
| `Elementum_App/src/content/archetypeSource.js` | `Reference/Elementum_Engine.jsx` inlined `STEM_CARD_DATA` (lines 4–979) and `TG_CARD_DATA` (lines 980–1558) | When a field is authored in archetypeSource.js, sync to the engine's inlined copy **only if** you intend to open the engine in legacy browser-preview mode. The live Vite app reads from the content file directly and does not require engine sync. |
| `Elementum_App/src/content/STEM_CARD_DATA.js` | `Reference/Elementum_Engine.jsx` inlined variant entries | Same conditional — sync only for legacy preview; Vite app is already authoritative. |
| `Scripts/batchGenerate.js` | `Elementum_App/src/content/STEM_CARD_DATA.js`, `DomEnergyTg_Data.js` | Do not hand-edit generated entries — re-run the pipeline. The script reads the content files from the app folder. |

**Key rule:** `archetypeSource.js` defines all field names. Any new field must be named there first (in `Elementum_App/src/content/archetypeSource.js`). All downstream files follow. Never rename a field in a downstream file independently.

---

## Data loading architecture

### Runtime data flow

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
│  Two-level lookup (variant override → stem baseline)           │
│                                                                 │
│  1. STEM_CARD_DATA[configKey]   ← variant-specific fields      │
│     yourNature.phrase, yourNature.desc, gifts[], shadows[]     │
│     Falls back to stem baseline if configKey not found.        │
│                                                                 │
│  2. archetypeSource.STEM_CARD_DATA[stem]  ← all other fields  │
│     identity.elementIntro, subtitle, chips, blocks[], manual  │
│                                                                 │
│  3. archetypeSource.TG_CARD_DATA[tg]  ← Ten God content       │
│     title, chips, outputs[], frictions[], domainSignatures     │
└─────────────────────────────────────────────────────────────────┘
        ↓
Render: DayMasterHero → EnergyMapMenu catalogue → Detail pages
```

### Variant lookup pattern (preserve exactly in migration)

```javascript
const tgPattern  = computeTgPattern(chart);
const band       = computeBand(chart);
const configKey  = `${dm.stem}_${band}_${tgPattern}`;

const configData = STEM_CARD_DATA[configKey] || {};   // variant override
const stemData   = STEM_CARD_DATA[dm.stem]   || {};   // stem baseline

const yourNature = configData.yourNature || stemData.yourNature || {};
const desc       = firstN(yourNature.desc || "", 2);
```

---

## Target Vite project structure

Lives at `Elementum_Project/Elementum_App/`:

```
Elementum_App/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                     ← ReactDOM.createRoot + React Router BrowserRouter
    ├── constants.js                 ← C, EL_C, EL_ZH, TIERS, STYLE, ARCHETYPE_MANIFESTO
    ├── content/
    │   ├── archetypeSource.js       ← source of truth (hand-authored)
    │   ├── STEM_CARD_DATA.js        ← 150 variant entries
    │   └── DomEnergyTg_Data.js      ← added when Pipeline A2 is run
    ├── engine/
    │   ├── calculator.js            ← pure JS: BaZi calculation + lookup tables
    │   ├── energyData.js            ← ELEMENT_ENERGIES, TG_PROFILES, tiaohou functions
    │   ├── readingEngine.js         ← STRENGTH_META, ELEMENTAL_NATURE, buildDayMasterProfile
    │   ├── navigation.js            ← getSections(), tgEn() helper
    │   ├── temporal.js              ← NEW: daily/monthly/annual energy overlays
    │   └── compatibility.js         ← NEW: element pair relationship logic (25 combinations)
    ├── store/
    │   └── chartContext.jsx         ← NEW: React Context — chart + birthData + cycles + page state
    ├── services/
    │   └── aiService.js             ← NEW: Claude API calls (pro tier) + template matching (free tier)
    └── components/
        ├── App.jsx                  ← main shell + React Router v6 routes
        ├── BirthForm.jsx
        ├── DayMasterHero.jsx        ← identity hero + gradient fade overlay
        ├── HeroPopupOverlay.jsx     ← element / stem / polarity education popups
        ├── ArchetypeSeal.jsx        ← per-stem SVG seal
        ├── ElementIcon.jsx          ← inline element icons
        ├── StrengthRing.jsx         ← SVG strength ring
        ├── PillarGrid.jsx           ← four pillars display
        ├── EnergyMapMenu.jsx        ← catalogue home (page === null)
        ├── DetailShell.jsx          ← shared nav shell (back + step + prev/next)
        ├── YourNatureDetailPage.jsx
        ├── DomDetailPage.jsx        ← idx prop: 0=primary, 1=secondary
        ├── SeasonalDetailPage.jsx   ← conditional (only if missing elements)
        ├── CatalystDetailPage.jsx
        ├── ResistanceDetailPage.jsx
        ├── BlueprintDetailPage.jsx  ← dormant, retain for future use
        ├── ElementSpectrum.jsx
        ├── ProfileReading.jsx
        ├── PaywallModal.jsx
        ├── ReadingSection.jsx
        ├── FlowPeriod.jsx
        └── DebugPanel.jsx           ← dev tool, exclude from prod build
```

### New modules (written fresh, not extracted from engine)

**`engine/temporal.js`** — computes daily, monthly, and annual energy scores by weighting each periodic element against the user's catalyst and resistance elements. Exports: `getDayElement(date)`, `getMonthCalendar(year, month, chart)`, `getYearTimeline(year, chart)`, `getDecadeIndicator(chart)`.

**`engine/compatibility.js`** — pre-authored relationship data for all 25 element-pair combinations (5×5 matrix). Exports: `getCompatibilityScore(elemA, elemB)`, `getRelationshipArchetype(elemA, elemB)`, `getRelationshipReading(elemA, elemB, tier)` (tier: 'free' | 'pro').

**`store/chartContext.jsx`** — React Context wrapping the user's computed chart, birth data, luck cycles, and current catalogue `page` state. Eliminates prop-drilling across the component tree. Provider wraps the entire app in `App.jsx`.

**`services/aiService.js`** — abstracts the tier split for AI guidance: free tier returns a matched pre-authored template; pro tier makes a fetch to the Claude API with the Canonical JSON context payload and returns a streaming response. Exports: `askChart(question, chart, tier)`.

### Phase 2: Feature-based folder structure (post-migration)

Once the Vite migration is stable and each component is extracted, the flat `components/` folder should be refactored into a feature-based structure. This is a separate step — do not attempt during the initial migration.

```
src/
├── features/
│   ├── onboarding/    ← BirthForm, LoadingScreen, onboarding steps
│   ├── reading/       ← EnergyMapMenu, DetailShell, all Detail pages (My Chart)
│   ├── today/         ← TodayScreen, tabs, CalendarGrid, EnergyTimeline
│   ├── guidance/      ← ReadingsScreen, AiModal, Codex, aiService integration
│   ├── connect/       ← FriendsScreen, CompatibilityResult
│   └── account/       ← ProfileScreen, PaywallModal
├── engine/            ← (as above, stable after migration)
├── store/             ← (as above)
├── services/          ← (as above)
└── content/           ← (as above)
```

---

## Before you start extracting

**Do not rewrite anything.** Every function, constant, and component must be extracted verbatim from the engine. The only permitted changes are:
- Adding `export` keywords to top-level declarations
- Removing `import` lines that get replaced by proper imports
- Adding `import` lines at the top of each new file
- Removing inlined `STEM_CARD_DATA` (lines 4–979) and `TG_CARD_DATA` (lines 980–1558) — replaced by imports from `src/content/`

**How to extract line ranges:**
```bash
# Run from Elementum_Project/ root. Example: extract lines 1593–2116 into a new file.
sed -n '1593,2116p' Reference/Elementum_Engine.jsx > Elementum_App/src/engine/calculator.js
```

**How to validate JSX after each step:**
```bash
npx @babel/parser --plugin=jsx src/components/ComponentName.jsx 2>&1 | tail -5
# Silence = valid. Any output = parse error.
```

**Run `npm run dev` after each component** — confirm no console errors before moving to the next.

---

## Step-by-step extraction

### Step 0 — Scaffold the Vite project

> **Already executed.** Project lives at `Elementum_Project/Elementum_App/`. Skip this step unless you are re-scaffolding from scratch. The commands below are preserved for reproducibility.

```bash
cd Elementum_Project
npm create vite@latest Elementum_App -- --template react
cd Elementum_App
npm install react-router-dom
```

**`vite.config.js`:**
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({ plugins: [react()] });
```

**`index.html`** (replace scaffold):
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Elementum</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@400;600&family=Cinzel:wght@400;500&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**`src/main.jsx`:**
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```

Delete scaffold files: `src/App.jsx`, `src/App.css`, `src/index.css`, `src/assets/`.

**Validate:** `npm run dev` — blank page, no console errors.

---

### Step 1 — Content files

> **Already executed.** Files live at `Elementum_App/src/content/archetypeSource.js` and `Elementum_App/src/content/STEM_CARD_DATA.js` as the runtime source of truth. No copy step needed in the current layout — edits go directly into those files. The block below is preserved for anyone re-building the project from the `Reference/` engine alone.

```bash
# Run from Elementum_Project/. The content files were originally in Code/;
# they now live directly inside the app, so this step is no-op for the current
# checkout. Kept here for completeness.
mkdir -p Elementum_App/src/content
# (Files are already in place — no copy required.)
```

Ensure named exports exist at the bottom of each:
```javascript
// archetypeSource.js
export { STEM_CARD_DATA, TG_CARD_DATA, CLASSICAL_STEM_ANCHORS, CLASSICAL_TG_ANCHORS, BINGYI_FRAMING, PILLAR_STAGE };

// STEM_CARD_DATA.js
export { STEM_CARD_DATA };
```

⚠️ Name collision — both export `STEM_CARD_DATA`. Always import with aliases:
```javascript
import { STEM_CARD_DATA as STEM_BASELINES } from '../content/archetypeSource.js';
import { STEM_CARD_DATA as STEM_VARIANTS  } from '../content/STEM_CARD_DATA.js';
```

---

### Step 2 — Extract `src/constants.js`

**Engine lines:**
- TIERS, TIER_LABELS, TIER_PRICES, FREE_EXPANSIONS_PER_DAY → lines 1559–1562
- C, EL_C, EL_ZH → lines 2238–2250
- STYLE (CSS string) → lines 2427–2445
- ARCHETYPE_MANIFESTO → lines 2706–2720

```bash
# Extract each range, assemble into src/constants.js
sed -n '1559,1562p' Reference/Elementum_Engine.jsx
sed -n '2238,2250p' Reference/Elementum_Engine.jsx
sed -n '2427,2445p' Reference/Elementum_Engine.jsx
sed -n '2706,2720p' Reference/Elementum_Engine.jsx
```

Add `export` to each declaration. Final exports:
```javascript
export const C, EL_C, EL_ZH, TIERS, TIER_LABELS, TIER_PRICES,
             FREE_EXPANSIONS_PER_DAY, STYLE, ARCHETYPE_MANIFESTO;
```

**Validate:** `node src/constants.js` — no errors.

---

### Step 3 — Extract `src/engine/calculator.js`

**Engine lines 1585–2237** — pure JS, no React, no JSX.

```bash
sed -n '1585,2237p' Reference/Elementum_Engine.jsx > Elementum_App/src/engine/calculator.js
```

Contents (in order):
| Lines | Contents |
|---|---|
| 1585–1591 | `HS`, `EB`, `STEM_ELEM`, `BRANCH_ELEM`, `STEM_YIN`, `BRANCH_YIN`, `SOLAR_TERMS` |
| 1593–1628 | `getSolarTermDate`, `getSolarMonthIndex`, `getBaziYear`, `getTenGod` |
| 1629–1684 | `HIDDEN_STEMS`, `SEASONAL_PHASE`, `POS_WEIGHTS` |
| 1685–1866 | `getRootMod`, `computeElementComposition`, `applyBondModifiers`, `computeDMStrength` |
| 1867–1986 | `CATALYST_MAP`, `getDominantElementPolarity`, `computeTgPattern`, `getDominantTenGod`, `getPrimaryCatalyst`, `getArchetypeKey`, `TG_PATTERN_LABELS`, `TENSION_LABELS` |
| 1987–2116 | `calculateBaziChart` |
| 2117–2237 | `TG_FEEL`, `staticFlowText`, `miniChart` |

Export all top-level functions and constants. Add at top: `// src/engine/calculator.js — pure BaZi calculation, no React dependencies`

**Validate:** `node src/engine/calculator.js` — no errors.

---

### Step 4 — Extract `src/engine/energyData.js`

**Engine lines 3580–4526**

```bash
sed -n '3580,4526p' Reference/Elementum_Engine.jsx > Elementum_App/src/engine/energyData.js
```

Contents:
| Lines | Contents |
|---|---|
| 3580–3909 | `ELEMENT_ENERGIES` |
| 3910–4083 | `ENERGY_CONDITION_READINGS` |
| 4084–4201 | `getEnergyBand`, `TIAOHOU_SEASON`, `getTiaohouAdjustment`, `applyTiaohouToEnergies` |
| 4202–4410 | `TG_PROFILES` |
| 4411–4526 | `getElementInsights` |

Add at top:
```javascript
// src/engine/energyData.js — elemental energy content + insight computation
```
Export all. No React dependencies.

---

### Step 5 — Extract `src/engine/readingEngine.js`

**Engine lines 2251–3101**

Contents:
| Lines | Contents |
|---|---|
| 2251–2426 | `SECTION_TITLES_BY_STEM`, `SECTION_BASE`, `getSectionMeta` |
| 2446–2704 | `getElementMotif`, `STRENGTH_RING`, `WHO_YOU_ARE` |
| 2830–2998 | `CORE_STRENGTHS`, `CORE_SHADOWS`, `BLOCK_SLOTS`, `resolveBlockText`, `resolveBlockPriority`, `specificityBonus`, `selectionScore`, `getBlocksForConfigV2`, `renderBlocks` |
| 2999–3101 | `validateStem`, `effectiveSig`, `getActiveDomainSignatures`, `buildDayMasterProfile` |

Add at top:
```javascript
// src/engine/readingEngine.js — reading data and profile builder
import { STEM_CARD_DATA as STEM_BASELINES, TG_CARD_DATA } from '../content/archetypeSource.js';
import { STEM_CARD_DATA as STEM_VARIANTS } from '../content/STEM_CARD_DATA.js';
```

Also extract `STRENGTH_META` and `ELEMENTAL_NATURE` (lines 4527–4898) — append to this file.

Export all.

---

### Step 6 — Extract `src/engine/navigation.js`

**Engine lines 5429–5512** (getSections + tgEn + DetailShell helper logic)

```javascript
// src/engine/navigation.js
import { getElementInsights } from './energyData.js';
import { TG_CARD_DATA, TG_PROFILES } from '../content/archetypeSource.js';

export const tgEn = (zh) => TG_CARD_DATA[zh]?.name || TG_PROFILES[zh]?.en || zh;

export function getSections(chart) { /* extract verbatim, lines 5429–5451 */ }
```

---

### Step 7 — Extract shared SVG components

Each is a small self-contained JSX file.

| Component | Engine lines | Import needs |
|---|---|---|
| `ArchetypeSeal.jsx` | 2721–2829 | `C`, `EL_C` from constants |
| `ElementIcon.jsx` | 3554–3579 | `EL_C` from constants |
| `StrengthRing.jsx` | 3102–3127 | `C` from constants |
| `PillarGrid.jsx` | 3532–3553 | `C`, `EL_C`, `EL_ZH` from constants |

For each:
```bash
sed -n 'START,ENDp' Reference/Elementum_Engine.jsx > Elementum_App/src/components/ComponentName.jsx
```
Add `import React from 'react';` and the relevant constants imports. Add `export default`.

Validate each with Babel.

---

### Step 8 — Extract `DayMasterHero.jsx`

**Engine lines 3128–3330**

```javascript
import React, { useState } from 'react';
import { C, EL_C, EL_ZH, ARCHETYPE_MANIFESTO } from '../constants.js';
import { STEM_CARD_DATA as STEM_BASELINES } from '../content/archetypeSource.js';
import ArchetypeSeal from './ArchetypeSeal.jsx';
import ElementIcon from './ElementIcon.jsx';
```

Preserve the gradient fade overlay exactly:
```jsx
<div style={{
  position:"absolute", bottom:0, left:0, right:0, height:120,
  background:"linear-gradient(to bottom, transparent 0%, #f7f3ec 100%)",
  pointerEvents:"none", zIndex:2,
}}/>
```

---

### Step 9 — Extract `HeroPopupOverlay.jsx`

**Engine lines 6381–6521**

```javascript
import React from 'react';
import { C, EL_C, EL_ZH } from '../constants.js';
import { STEM_CARD_DATA as STEM_BASELINES, TG_CARD_DATA } from '../content/archetypeSource.js';
import ArchetypeSeal from './ArchetypeSeal.jsx';
```

---

### Step 10 — Extract `ProfileReading.jsx`

**Engine lines 3399–3531**

```javascript
import React, { useState } from 'react';
import { C, EL_C, TIERS } from '../constants.js';
import { buildDayMasterProfile } from '../engine/readingEngine.js';
import StrengthRing from './StrengthRing.jsx';
```

---

### Step 11 — Extract `ElementSpectrum.jsx`

**Engine lines 5061–5428**

```javascript
import React, { useState } from 'react';
import { C, EL_C, EL_ZH, TIERS } from '../constants.js';
import { STEM_CARD_DATA as STEM_BASELINES } from '../content/archetypeSource.js';
import { STEM_CARD_DATA as STEM_VARIANTS } from '../content/STEM_CARD_DATA.js';
import { ELEMENT_ENERGIES, getElementInsights, applyTiaohouToEnergies } from '../engine/energyData.js';
import { STRENGTH_META, ELEMENTAL_NATURE } from '../engine/readingEngine.js';
import ElementIcon from './ElementIcon.jsx';
```

---

### Step 12 — Extract `DetailShell.jsx`

**Engine lines 5452–5512**

```javascript
import React from 'react';
import { C } from '../constants.js';
import { getSections } from '../engine/navigation.js';
```

---

### Step 13 — Extract `EnergyMapMenu.jsx`

**Engine lines 5513–5888**

```javascript
import React from 'react';
import { C, EL_C, EL_ZH } from '../constants.js';
import { STEM_CARD_DATA as STEM_BASELINES, TG_CARD_DATA } from '../content/archetypeSource.js';
import { getElementInsights, applyTiaohouToEnergies, ELEMENT_ENERGIES } from '../engine/energyData.js';
import { tgEn } from '../engine/navigation.js';
import ElementIcon from './ElementIcon.jsx';
```

---

### Step 14 — Extract detail page components

| Component | Engine lines | Key imports |
|---|---|---|
| `YourNatureDetailPage.jsx` | 5889–5904 | `DetailShell`, `ElementSpectrum` |
| `BlueprintDetailPage.jsx` | 5905–5990 | dormant — extract but do not wire into routing |
| `DomDetailPage.jsx` | 5991–6058 | `TG_CARD_DATA`, `getElementInsights`, `tgEn`, `ElementIcon`, `DetailShell` |
| `SeasonalDetailPage.jsx` | 6059–6118 | `getElementInsights`, `ElementIcon`, `DetailShell` |
| `CatalystDetailPage.jsx` | 6119–6180 | `applyTiaohouToEnergies`, `ELEMENT_ENERGIES`, `tgEn`, `ElementIcon`, `DetailShell` |
| `ResistanceDetailPage.jsx` | 6181–6244 | same as Catalyst |

All detail pages: add `import React from 'react'`, `import { C, EL_C } from '../constants.js'`, and each component-specific import above.

---

### Step 15 — Extract remaining components

| Component | Engine lines | Notes |
|---|---|---|
| `PaywallModal.jsx` | 6245–6296 | `C`, `TIERS` |
| `ReadingSection.jsx` | 6297–6363 | `C`, `TIERS`, `renderBlocks` from readingEngine |
| `FlowPeriod.jsx` | 6364–6380 | `C` |
| `DebugPanel.jsx` | 3331–3398 | dev only — omit from prod build |

---

### Step 16 — Extract `BirthForm.jsx`

The birth form is embedded inside App (lines 6524–6900). Find the form rendering block and extract it as a standalone component.

```javascript
import React, { useState } from 'react';
import { C, EL_C } from '../constants.js';
import { calculateBaziChart } from '../engine/calculator.js';
```

---

### Step 17 — Extract `App.jsx`

**Engine lines 6524–6900.** After all other components are extracted, App becomes mostly state and routing.

**State variables to keep:**
```javascript
const [chart, setChart] = useState(null);
const [tab, setTab] = useState("reading");
const [page, setPage] = useState(null);          // null = catalogue home
const [popup, setPopup] = useState(null);
const [userTier, setUserTier] = useState(TIERS.FREE);
const [hasSelfReport, set
```

---

## Phase 1 component additions (post-DOC8 v3.1)

These components exist **only in the live Vite app** (`Elementum_App/src/components/`) and were authored fresh — they are not present in `Reference/Elementum_Engine.jsx`. Phase 2 extraction does not need to look for them in the engine.

### `RevealScreen.jsx` — Identity Section composition

The Reveal screen's Section 1 was redesigned in DOC5 §9 v1.6. The component graph for the Identity area:

```
RevealScreen
├── (mountains: <img src="/assets/ink-a-top.png">) absolute, zIndex 1
└── <section> zIndex 10, padding 90px / 32px / 120px, justifyContent: flex-start
    ├── <HeroStemMark stem={dmStem} element={dmElement} size={280} />
    │     └── <StemSign>      ← per-stem dispatcher
    │           └── <BrushJian size={280} color={INK} />   for stem "庚"
    │               (or fallback <ElementSign> for unauthored stems)
    ├── eyebrow "You are…"
    ├── <h1>archetype name</h1>
    ├── <BrushUnderline />
    ├── manifesto line 1 (Cormorant italic 22px)
    ├── three <BadgeTile> chips:
    │     · Element  → <ElementSign element={EL_KEY[dmElement]} />  pigment color
    │     · Stem     → <span>{dmStem}</span> Noto Serif SC, pigment color
    │     · Polarity → <YinYangGlyph polarity={dmPolarity} />        pigment color
    └── essence paragraph
```

**Key authoring rules (do NOT regress in future edits):**

1. **No ring around the hero stem mark.** The `ArchetypeSeal` component (brushed circle) was removed from `RevealScreen.jsx`. Phase 2's `DayMasterHero` (DOC5 §11) is a separate decision — it may still render an ArchetypeSeal per its own spec, but the Reveal Identity composition is now ring-less.
2. **HeroStemMark uses `marginTop: -40`** so the painted icon's tip pierces ABOVE the mountain peaks. Section padding-top must remain at `90px` to keep the negative-margin geometry right.
3. **StemSign renders in `INK`**, not element pigment. Element pigment is reserved for the chip strip (`BadgeTile.color`), the seal-ring tint (if/when reintroduced elsewhere), and the BrushUnderline.
4. **BadgeTile is flat silk** (`rgba(248,241,225,0.92)` fill, single hairline border in `PAPER_HAIR`, single 1px shadow). NO diagonal gradient, NO inset highlight, NO inner ring.
5. **Section background is a single flat `#EFE5CC` silk fill** spanning the full scrollable height. Do NOT layer a `SilkPaper` SVG on top — earlier iterations did this and produced a hairline at the section seam where the SVG ended.

### Per-stem stem-sign authoring path

When you add the painted SVG for another stem (e.g. `OakArchetype` for 甲 / The Oak):

```
1. Build the SVG component in RevealScreen.jsx alongside BrushJian
   (or move it to a dedicated src/components/stems/ folder once you have 3+).
2. Add a case to the StemSign switch:
     case '甲': return <OakArchetype size={size} color={color || INK} />;
3. Verify chip-scale (size=28) and hero-scale (size=280) both render acceptably.
4. Update DOC5 §20 status column from "NEEDED" → "INLINE SVG".
```

The `<StemSign>` dispatcher's fallback to `<ElementSign>` means the hero slot stays filled — for users on stems without painted art, the seal of the element family (crescent, tree, triangle, square, waves) renders at hero scale, in INK, with the same negative-margin geometry. This is acceptable as an interim state while the remaining nine painted SVGs are authored.

### Files touched by today's Reveal redesign

| File | Change |
|---|---|
| `Elementum_App/src/components/RevealScreen.jsx` | Added `BrushJian`, `StemSign`, `HeroStemMark`. Removed `ArchetypeSeal`. Rewrote `BadgeTile` from gradient to flat silk. Recomposed Section 1 (`padding: 90px 32px 120px`, `justifyContent: flex-start`). Switched section background to a single flat `#EFE5CC` fill. |

---

## Version history

| Version | Date | Changes |
|---|---|---|
| 3.0 | April 2026 | Initial migration guide drafted. |
| 3.1 | April 2026 | Migration executed; `Code/` retired; paths updated to `Elementum_App/src/content/`; Reference/Scripts split documented. |
| 3.2 | 2026-04-24 | Added "Phase 1 component additions" section documenting the RevealScreen Identity composition (HeroStemMark, StemSign, BrushJian, flat BadgeTile) per DOC5 §9 v1.6. Added authoring rules + per-stem extension path so the composition does not regress in future edits. |