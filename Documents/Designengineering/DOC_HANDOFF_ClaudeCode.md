# Elementum — Claude Code Handoff Prompt
## Full App Build: Vite + React, Ink & Pigment Design System

**Session context:** Design phase complete. Phase 1 (aesthetic direction) and Phase 2A (onboarding UI) are done via Claude Design. This document hands everything off to Claude Code to build the full production app.

**Your job:** Build the Elementum app as a Vite + React project, following the architecture in DOC8 and the screen specs in DOC5. The design aesthetic has been fully resolved — use the extracted source files in `Design/source/` as your visual ground truth, and DOC5 as your functional ground truth.

---

## Step 1 — Read these files before writing any code

Read all of the following in full before you start:

1. `Documents/Designengineering/DOC5_App_Design.md` — **The primary spec.** Screen-by-screen UI, components, copy tone, data contracts, motion system, color system, typography. This is the contract. Build what is in DOC5.
2. `Documents/Designengineering/DOC8_Code_Architecture_and_Migration.md` — **The build instructions.** Target Vite folder structure, which engine functions go where, extraction process, module boundaries.
3. `Design/source/design_tokens.js` — **The design system implementation.** Exact colors, SVG components (SilkPaper, DistantRidge, ElementSign, BrushUnderline), and component patterns from the Phase 2A build. This is your CSS-in-JS token file.
4. `Design/source/screen_onboarding.js` — Onboarding steps 1–7, fully implemented in Ink & Pigment style. Use as a reference for step layout, input patterns, and interaction feel.
5. `Design/source/screen_welcome.js` — Welcome / splash screen (DOC5 §6).
6. `Design/source/screen_loading.js` — Loading screen (DOC5 §8).
7. `Design/source/screen_reveal.js` — Reveal screen (DOC5 §9).
8. `Design/source/app_shell.js` — The OnboardingShell wrapper, SCREENS array, and navigation flow.
9. `Code/archetypeSource.js` — **Single source of truth** for all archetype data: 10 stem entries, 10 TG entries with name/epithet/councilRole/prop/councilVoice fields, element data, and generation constants.
10. `Code/STEM_CARD_DATA.js` — 150 variant entries (stem × element band × TG pattern). Phase 1 has 15 庚 entries authored. Remaining 135 use batchGenerate.js.

---

## Step 2 — Understand the design language

**Aesthetic direction: Ink & Pigment (设色)**

This was chosen in Phase 1 (Claude Design). It is a hybrid of Direction A (Ink & Silence) and Direction C (Modern Dao). Do not deviate from it.

The exact implementation is in `Design/source/design_tokens.js`. Key values for quick reference:

### Color palette

```javascript
// Background (silk paper layers)
const SILK       = '#F1E9D6';   // primary background
const SILK_DEEP  = '#ECE2C9';   // cards, elevated surfaces
const SILK_FOLD  = '#DDD1B3';   // card borders, subtle dividers
const PAPER_HAIR = '#CDBE9E';   // deckle card border color

// Ink (text layers)
const INK        = '#2B2722';   // primary text
const INK_SOFT   = '#4A433B';   // secondary text
const INK_LIGHT  = '#857D72';   // tertiary / labels
const INK_MIST   = '#B8AFA1';   // placeholder, disabled

// Bronze (accent / CTA system)
const BRONZE_MID  = '#8b7355';  // active states, progress, highlights
const BRONZE_DARK = '#6b5339';  // primary CTA background
const WALNUT      = '#5a4430';  // hover/pressed states

// Five-element pigments (desaturated mineral tones)
const PIG_METAL = '#8A9AA6';
const PIG_WOOD  = '#8D9C7A';
const PIG_WATER = '#6F8AA2';
const PIG_FIRE  = '#B4755E';
const PIG_EARTH = '#B59A6B';

// Seal red (year pillar, rare emphasis)
const PIG_SEAL  = '#A04030';
```

> DOC5 §2 also specifies a `#F8F6F0` background and `#8b7355` bronze accent. The DOC5 palette and the design_tokens.js palette are slightly different warm variants of the same system — use `design_tokens.js` as the authoritative values for any component derived from the Phase 2A build, and DOC5 §2 for any component built fresh from spec.

### Key SVG components (already implemented)

All of these are in `Design/source/design_tokens.js` — copy them directly into your design system file:

- **`SilkPaper`** — full-bleed silk background with grain texture. Use on every screen.
- **`DistantRidge`** — soft ink-wash mountain horizon band. Use behind the hero zone on key screens.
- **`ElementSign`** — geometric symbols for the five elements (arc = Metal, ψ = Wood, ~ = Water, △ = Fire, □ = Earth). Use wherever element identity appears.
- **`BrushUnderline`** — calligraphic accent stroke beneath section labels.
- **`SealDot`** — small vermillion seal dot for emphasis points.
- **`CornerInk`** — decorative corner ink marks for card borders.

### Card pattern

```javascript
// deckleCard style — use for identity cards, step cards, TG cards
{
  background: 'rgba(248, 241, 225, 0.92)',
  border: '1px solid #CDBE9E',
  borderRadius: 22,
}
```

### Typography

- **Display / Identity names:** Cinzel or EB Garamond, tracked wider, warm black
- **Body / Reading:** EB Garamond or Cormorant, 16–18px, ink color, line-height 1.6
- **Labels / UI:** system sans or Cormorant SC, small caps, muted ink
- **Chinese characters:** Display only — atmospheric, not informational. Never the only carrier of meaning.

---

## Step 3 — Understand the data model

### The user's chart (what the calculation engine produces)

```javascript
// Output of calculateBaZi() in the engine
{
  year:  { stem: '庚', branch: '子', element: 'Metal', polarity: 'Yang' },
  month: { stem: '戊', branch: '戌', element: 'Earth', polarity: 'Yang' },
  day:   { stem: '庚', branch: '午', element: 'Metal', polarity: 'Yang' },
  hour:  { stem: '壬', branch: '申', element: 'Water', polarity: 'Yang' },
  dayMasterStem: '庚',
  dayMasterElement: 'Metal',
  dayMasterPolarity: 'Yang',
  chartStrength: 'Strong',
  dominantElement: 'Metal',
  luckCycles: [...],   // array of 10-year luck periods
  // ... full spec in DOC5 §17 and DOC2
}
```

The calculation functions (`calculateBaZi`, `getTenGod`, `getStrength`, etc.) already exist in `Code/Elementum_Engine.jsx`. **Extract them verbatim** into `src/engine/calculator.js` — do not rewrite.

### Archetype data lookup

```javascript
// In archetypeSource.js — look up by dayMaster stem
STEM_ARCHETYPES['庚'] → {
  name: 'The Blade',
  element: 'Metal',
  polarity: 'Yang',
  epithet: 'The Blade that Seeks the Edge',
  essence: '...',
  // ... full fields
}

// Look up Ten God card by TG key
TG_CARD_DATA['七杀'] → {
  name: 'The General',
  epithet: 'The Scourged General · Wielder of the Seven-Star Halberd',
  councilRole: 'The Protector',
  prop: 'The Seven-Star Halberd',
  councilVoice: 'The pressure isn\'t here to break you. It\'s here to forge the blade.',
  // ... reading fields
}
```

---

## Step 4 — Build the pre-dashboard flow first

The onboarding flow is fully designed and implemented in the Phase 2A source files. **This is your starting reference implementation.** Build this first to establish the design system in Vite, then extend to the dashboard screens.

### Pre-dashboard screens (in order)

| Screen | DOC5 section | Source reference |
|--------|-------------|-----------------|
| Welcome / Splash | §6 | `screen_welcome.js` |
| Onboarding Steps 1–7 | §7 | `screen_onboarding.js` |
| Loading / Calculation | §8 | `screen_loading.js` |
| Reveal | §9 | `screen_reveal.js` |

**Do not redesign these screens.** Extract and adapt the JSX from the source files. The visual language, animations, copy tone, and component patterns are final. Your job is to wire them to real data (replace the `USER` constant mock in design_tokens.js with live chartContext data).

### The USER mock in design_tokens.js

The Phase 2A source uses a hardcoded reference user:
```javascript
const USER = {
  stem: '庚', stemName: 'Yang Metal', archetype: 'The Blade',
  council: 'The General', councilCN: '七杀',
  essence: 'Precision before intention',
  // ...
};
```

In your Vite build, this is replaced by `useContext(ChartContext)`. The shape must match exactly — derive all the same fields from the computed chart.

---

## Step 5 — Dashboard screens (build after onboarding is complete)

All dashboard screen specs are in DOC5. Read the relevant section before building each screen.

| Screen | DOC5 section | Route | Notes |
|--------|-------------|-------|-------|
| Today | §10 | `/today` | Temporal guidance, day/month/year tabs, CalendarGrid |
| Energy Map (My Chart) | §11 | `/chart` | Catalogue home → Detail pages. EnergyMapMenu + DetailShell |
| Guidance | §12 | `/guidance` | AI readings hub. Tier-gated. aiService.js |
| Connect | §13 | `/connect` | Compatibility. Friend profiles. |
| Me / Profile | §14 | `/me` | Account, upgrade, settings |

---

## Step 6 — Key architecture rules (from DOC8)

1. **Extract, don't rewrite.** Every calculation function, constant, and component in `Elementum_Engine.jsx` must be extracted verbatim. Only add `export` keywords and swap inline data for imports.
2. **archetypeSource.js is the single source of truth.** Never define archetype data anywhere else. All field names come from there.
3. **ChartContext is the single source of truth for runtime state.** No prop drilling. `chartContext.jsx` wraps the whole app in `App.jsx`.
4. **Calculation is pure JS, not React.** `src/engine/calculator.js` has zero React imports. It receives a birthData object and returns a chart object.
5. **Design system lives in one place.** Create `src/styles/tokens.js` — copy all palette constants and SVG primitives from `Design/source/design_tokens.js`. Every component imports from there. Never hardcode colors inline.
6. **Tier splits are explicit.** Every component that has a free/pro variant checks `chart.tier` and renders accordingly. See DOC5 §19 for the tier model.

---

## Step 7 — The Vite scaffold

Per DOC8:

```bash
cd Elementum_Project
npm create vite@latest elementum-app -- --template react
cd elementum-app
npm install react-router-dom
```

Target folder: `Elementum_Project/elementum-app/src/`

Full target structure is specified in DOC8 §"Target Vite project structure". Follow it exactly. The feature-based refactor (DOC8 §"Phase 2") comes after the initial migration is stable.

---

## What already works (do not rebuild)

| Capability | Lives in | Status |
|---|---|---|
| BaZi calculation engine | `Code/Elementum_Engine.jsx` (lines ~1593–2400) | ✅ Stable. Extract verbatim. |
| Ten God calculation | `Code/Elementum_Engine.jsx` | ✅ Extract verbatim. |
| Strength/balance analysis | `Code/Elementum_Engine.jsx` | ✅ Extract verbatim. |
| Archetype lookup data | `Code/archetypeSource.js` | ✅ Copy directly to `src/content/`. |
| Stem variant cards | `Code/STEM_CARD_DATA.js` | ✅ Copy directly to `src/content/`. |
| Onboarding UI | `Design/source/screen_onboarding.js` | ✅ Adapt for live data. |
| Reveal UI | `Design/source/screen_reveal.js` | ✅ Adapt for live data. |
| Design token set | `Design/source/design_tokens.js` | ✅ Move to `src/styles/tokens.js`. |
| Catalogue + detail pages | `Code/Elementum_Engine.jsx` (EnergyMapMenu, DetailShell, all Detail pages) | ✅ Extract verbatim. Restyle with Ink & Pigment tokens. |

---

## What needs to be written fresh

| Module | Notes |
|---|---|
| `engine/temporal.js` | Daily/monthly/annual energy scoring. Spec in DOC5 §10 and DOC8. |
| `engine/compatibility.js` | 25-element-pair relationship matrix. Spec in DOC5 §13. |
| `store/chartContext.jsx` | React Context provider. Shape in DOC8. |
| `services/aiService.js` | Claude API abstraction. Tier split. Spec in DOC8 and DOC5 §12. |
| `BirthForm.jsx` | New Ink & Pigment version. DOC5 §7 is the spec. `screen_onboarding.js` is the visual reference. |
| `LoadingScreen.jsx` | Wire `screen_loading.js` to real calculation. DOC5 §8. |
| `RevealScreen.jsx` | Wire `screen_reveal.js` to real chart data. DOC5 §9. |
| `TodayScreen.jsx` | New screen. DOC5 §10. Calls `engine/temporal.js`. |
| `GuidanceScreen.jsx` | New screen. DOC5 §12. Calls `services/aiService.js`. |
| `ConnectScreen.jsx` | New screen. DOC5 §13. Calls `engine/compatibility.js`. |
| `ProfileScreen.jsx` | New screen. DOC5 §14. |
| `PaywallModal.jsx` | Tier upgrade prompt. DOC5 §19 + §20 (Upgrade Flow). |

---

## File inventory (what you have to work with)

```
Elementum_Project/
├── Code/
│   ├── Elementum_Engine.jsx        ← ~6,900-line reference. Calculations + all components.
│   ├── archetypeSource.js          ← Archetype data. Single source of truth.
│   ├── STEM_CARD_DATA.js           ← 150 variant entries.
│   └── batchGenerate.js            ← Generation script (not bundled).
│
├── Design/
│   ├── Onboarding_Phase2A.html     ← Full Phase 2A standalone bundle (16MB, not human-readable).
│   └── source/                     ← ⭐ EXTRACTED READABLE SOURCE — USE THESE
│       ├── design_tokens.js        ← Colors + SVG primitives + base components.
│       ├── screen_welcome.js       ← Welcome screen (§6).
│       ├── screen_onboarding.js    ← Onboarding steps 1–7 (§7).
│       ├── screen_loading.js       ← Loading screen (§8).
│       ├── screen_reveal.js        ← Reveal screen (§9).
│       └── app_shell.js            ← Shell + SCREENS array + flow navigation.
│
└── Documents/Designengineering/
    ├── DOC2_Archetype_System.md    ← Data contracts and archetype logic.
    ├── DOC5_App_Design.md          ← ⭐ PRIMARY SPEC. All screens.
    ├── DOC7_Content_Generation_Guide.md
    └── DOC8_Code_Architecture_and_Migration.md  ← ⭐ BUILD INSTRUCTIONS.
```

---

## Build order — two phases with a visual checkpoint

Do not build the entire app in one pass. Follow this sequence and pause at Milestone 1 for visual sign-off before continuing.

---

### Phase 1 — Pre-dashboard flow (onboarding → reveal)

**Milestone 1 (checkpoint before anything else):**

1. Read DOC5, DOC8, and `Design/source/design_tokens.js` in full.
2. Scaffold the Vite project per DOC8 §"Target Vite project structure".
3. Create `src/styles/tokens.js` — copy all palette constants and SVG primitives verbatim from `design_tokens.js`.
4. Build `WelcomeScreen.jsx` from `Design/source/screen_welcome.js` — adapt JSX for Vite imports, keep all visual code identical.
5. Run `npm run dev`. Confirm visually in the browser:
   - SilkPaper background texture renders correctly
   - DistantRidge ink horizon appears behind the hero zone
   - 元 素 / ELEMENTUM title in correct typography and color
   - Tagline *"Your elemental energy, read from the moment you were born."* in EB Garamond italic
   - Bronze CTA button renders at correct color `#6b5339`
   - Enso SVG draw-on animation plays on load

**⛔ Stop here. Do not proceed until the Welcome screen is visually confirmed.**

Once Milestone 1 is signed off, continue:

6. Extract calculation engine into `src/engine/calculator.js` (verbatim from `Elementum_Engine.jsx`).
7. Build `store/chartContext.jsx`.
8. Build `OnboardingSteps.jsx` from `Design/source/screen_onboarding.js` — wire to live `birthData` state.
9. Build `LoadingScreen.jsx` from `Design/source/screen_loading.js` — wire to real `calculateBaZi()` call.
10. Build `RevealScreen.jsx` from `Design/source/screen_reveal.js` — replace `USER` mock with `useContext(ChartContext)`.
11. Wire the full pre-dashboard flow: Welcome → Steps 1–7 → Loading → Reveal.
12. Run full onboarding flow end-to-end. Confirm chart calculates correctly and Reveal screen shows real data.

---

### Phase 2 — Dashboard screens

Only begin Phase 2 once the complete pre-dashboard flow runs without errors.

13. Extract dashboard components from `Elementum_Engine.jsx` (EnergyMapMenu, DetailShell, all Detail pages) — restyle with Ink & Pigment tokens from `src/styles/tokens.js`.
14. Build `TodayScreen.jsx` per DOC5 §10. Write `engine/temporal.js` fresh.
15. Build `GuidanceScreen.jsx` per DOC5 §12. Wire `services/aiService.js` last (requires Claude API key).
16. Build `ConnectScreen.jsx` per DOC5 §13. Write `engine/compatibility.js` fresh.
17. Build `ProfileScreen.jsx` per DOC5 §14.
18. Build `PaywallModal.jsx` per DOC5 §19–20.

---

*Handoff prepared: April 2026. Phase 1 ✅ Phase 2A ✅ Phase 2B–5 → Claude Code.*
