# Elementum — Migration Instructions for Claude Code

## Overview

Migrate a single-file React artifact (`Elementum_AI_Engine_v10_fixed.jsx`)
into a structured Vite + React project. The file is 2,184 lines and has
clear `████` section markers showing exactly where each layer starts.

---

## Step 0 — Read first, write second

Before creating any files, read `Elementum_AI_Engine_v10_fixed.jsx` in full
and confirm you understand the four layers marked in the file:

1. **LAYER 0 — CALCULATION ENGINE** → `src/engine/calculator.js`
2. **CONTENT LAYER — STATIC DATA** → `src/content/content.js`
3. **LAYER 2 — AI READING ENGINE** → `src/engine/reading.js`
4. **UI LAYER — REACT COMPONENTS** → `src/components/`

---

## Target folder structure

```
elementum/
├── src/
│   ├── content/
│   │   └── content.js          ← ALL static text/data constants
│   ├── engine/
│   │   ├── calculator.js       ← BaZi calculation functions (pure JS)
│   │   └── reading.js          ← generateReading(), callAPI(), expandSection()
│   ├── components/
│   │   ├── DayMasterHero.jsx   ← Section 1
│   │   ├── ElementSpectrum.jsx ← Section 2
│   │   ├── ReadingSection.jsx  ← expandable reading sections
│   │   ├── PillarGrid.jsx      ← four pillars display
│   │   ├── PaywallModal.jsx    ← paywall overlay
│   │   ├── TierSwitcher.jsx    ← dev tier switcher UI
│   │   └── ElementIcon.jsx     ← shared element SVG icons
│   ├── constants.js            ← C (colors), EL_C, EL_ZH, TIERS, STYLE
│   └── App.jsx                 ← main shell, wires everything together
├── generate/
│   └── generate_templates_v2.js ← batch generation script (Node.js)
├── docs/
│   └── BaZi_Analysis_Bible_v2.md
├── index.html
├── package.json
└── vite.config.js
```

---

## What goes where — precise content map

### `src/content/content.js`
Extract these constants **exactly** from the source file — do not modify content:

- `WHO_YOU_ARE` — 10 stems, teaser + 2 paragraphs each
- `ARCHETYPE_MANIFESTO` — 10 manifesto lines
- `CORE_LINES` — 10 archetype descriptions (3rd person)
- `CORE_STRENGTHS` — 10 × 3 punchy gift bullets
- `CORE_SHADOWS` — 10 × 3 growing edge invitations
- `ENERGY_CONDITION_READINGS` — 10 stems × 3 bands × {portrait, dynamic, practice}
- `ELEMENT_ENERGIES` — 10 stems × {lifts, depletes}
- `STRENGTH_META` — 5 energy conditions × {label, zh, polarity, frame, approach, approachLine}
- `DOMINANT_LINES` + `DOMINANT_GUIDANCE` — 5 elements each
- `MISSING_LINES` + `MISSING_GUIDANCE` — 5 elements each
- `SECTION_TITLES_BY_STEM` — 10 stems × 12 section titles
- `SECTION_BASE` — 12 section metadata entries
- `TEMPLATE_DB` — handcrafted reading templates (36 entries + placeholders)

Export everything: `export const WHO_YOU_ARE = { ... }`

### `src/engine/calculator.js`
Extract all pure JS functions (no React imports needed):

- All lookup tables: `HS`, `EB`, `STEM_ELEM`, `BRANCH_ELEM`, `STEM_YIN`, `BRANCH_YIN`
- `getTenGod()`, `getSolarTermDate()`, `getSolarMonthIndex()`, `getBaziYear()`
- `calculateBaziChart()` — main calculation function
- `buildTemplateKey()`, `findTemplate()`
- `getElementInsights()`, `getEnergyBand()`

### `src/engine/reading.js`
- `callAPI()`, `genAboveFold()`, `genBelowFold()`, `expandSection()`
- `generateReading()`, `staticFlowText()`, `miniChart()`
- `TG_FEEL` constant

### `src/constants.js`
- `C` (color constants)
- `EL_C`, `EL_ZH`
- `TIERS`, `TIER_LABELS`, `FREE_EXPANSIONS_PER_DAY`
- `STRENGTH_RING` (ring fill percentages)
- `STYLE` (CSS string)

### `src/components/`
One file per component. Each component imports what it needs from content.js,
engine/calculator.js, and constants.js.

- `DayMasterHero.jsx` — imports: `WHO_YOU_ARE`, `ARCHETYPE_MANIFESTO`, `ArchetypeSeal`, `buildDayMasterProfile`, `CORE_STRENGTHS`, `CORE_SHADOWS`, `CORE_LINES`, `getSectionMeta`
- `ElementSpectrum.jsx` — imports: `ENERGY_CONDITION_READINGS`, `ELEMENT_ENERGIES`, `STRENGTH_META`, `DOMINANT_LINES`, `MISSING_LINES`, `getElementInsights`, `getEnergyBand`
- `ReadingSection.jsx` — imports: `expandSection` from reading.js
- `PillarGrid.jsx` — no content imports, just chart prop
- `PaywallModal.jsx` — no content imports
- `TierSwitcher.jsx` — imports `TIERS`, `TIER_LABELS`
- `ElementIcon.jsx` — standalone SVG icon component, no imports

### `src/App.jsx`
Main shell only. Imports components and wires state. Contains:
- `useState` for chart, reading, tier, etc.
- `BirthForm` component (inline or separate)
- Tab navigation
- Render logic calling `calculateBaziChart()` and `generateReading()`

---

## Migration rules

1. **Do not modify any content strings** — extract exactly as written
2. **Use named exports** from content.js — `export const X = ...`
3. **No default exports** from content.js or engine files
4. **React components use default exports** — `export default function X`
5. **After each file**, run `npm run dev` and confirm no console errors
6. **Migrate in this order**:
   1. `src/content/content.js` (no dependencies)
   2. `src/constants.js` (no dependencies)
   3. `src/engine/calculator.js` (no dependencies)
   4. `src/engine/reading.js` (imports from constants)
   5. `src/components/*.jsx` (imports from content + engine)
   6. `src/App.jsx` (imports everything)
7. The `ArchetypeSeal` and `ElementIcon` functions stay as components —
   do not move them to content.js

---

## Font imports

The app uses Google Fonts. Add to `index.html` `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Noto+Serif+SC:wght@400;600&display=swap" rel="stylesheet">
```

---

## Generate script

Move `generate_templates_v2.js` to `generate/generate_templates_v2.js`.
Update the import at the top to point to `../src/content/content.js` for
any constants it shares (ARCHETYPE_MANIFESTO, CORE_LINES etc. should be
imported rather than duplicated).

---

## Verification checklist

After migration, confirm:
- [ ] `npm run dev` runs with no errors
- [ ] Birth form accepts input and calculates chart
- [ ] Section 1 (Day Master Hero) renders with seal, token, title, manifesto
- [ ] Section 2 (Energy Profile) renders with bars, energy condition, insights
- [ ] Tier switcher toggles between Free / Seeker / Advisor / Oracle
- [ ] Free tier shows template content, Seeker triggers API call
- [ ] Reading sections expand and collapse
- [ ] Paywall modal appears after free expansion limit
- [ ] Reference chart (1995-04-29, 18:00, Beijing, Male) produces:
    庚 Day Master, 乙亥庚辰庚寅乙酉

---

## Source files

- `Elementum_AI_Engine_v10_fixed.jsx` — main source (2,184 lines)
- `generate_templates_v2.js` — batch generation script
- `BaZi_Analysis_Bible_v2.md` — product spec (move to docs/)
