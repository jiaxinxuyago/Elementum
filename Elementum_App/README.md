# Elementum — Vite + React app

The production app for **Elementum**, a personal-energy reading product built on the BaZi (八字 / Four Pillars) tradition. This folder is the **runtime source of truth** — anything shipped to a user runs from here.

For the design rationale, content authoring rules, and the Phase 2 extraction roadmap, read the docs in `../Documents/Designengineering/` (especially DOC4, DOC5, DOC8) and the migration progress notes in `../Reference/README.md`.

## What's in here

```
Elementum_App/
├── src/
│   ├── App.jsx                  ← flow state machine (Welcome → Onboarding → Loading → Reveal)
│   ├── components/
│   │   ├── onboarding/          ← WelcomeScreen, OnboardingShell, OnboardingSteps
│   │   ├── LoadingScreen.jsx    ← runs calculateBaziChart + 2.5s dwell
│   │   ├── RevealScreen.jsx     ← four-section continuous-scroll reading
│   │   └── dev/DevBar.jsx       ← dev-only sidebar (tier switch, jump-to, seed presets)
│   ├── content/
│   │   ├── archetypeSource.js   ← single source of truth for stem + TG card data
│   │   └── STEM_CARD_DATA.js    ← 150 variant entries (15 authored, 135 to generate)
│   ├── engine/calculator.js     ← pure-JS BaZi calculator (extracted from the engine)
│   ├── store/chartContext.jsx   ← React Context for birthData + computed chart + tier
│   ├── services/geocoding.js    ← Open-Meteo city lookup for Step 5
│   ├── styles/tokens.jsx        ← Ink & Pigment palette + shared SVG primitives
│   └── main.jsx                 ← React 18 + Vite entry
├── public/assets/               ← ink-wash PNGs, fonts, etc.
├── index.html                   ← Google Fonts + global styles + #root
└── vite.config.js
```

## Running

```bash
npm install
npm run dev          # Vite dev server on :5173
npm run build        # production bundle
```

The dev server respects URL hashes — `#/welcome`, `#/step3`, `#/reveal`, etc. are deep-linkable for design iteration. The DevBar (only visible in `import.meta.env.DEV` and viewports ≥ 720px wide) sits beside the phone-frame and exposes:

- **Pricing tier switcher** (Free / Seeker / Advisor)
- **Birth chart + birth data summary** (live readout of `useChart()`)
- **Seed presets** — `庚 Blade` (DOC1 reference user) and `癸 Rain` for instant Reveal testing
- **Jump-to-screen pills** for every step in the flow
- **Reset & regenerate** to clear chart state and return to Welcome

## Phone-frame context

Per DOC5 §6 the runtime viewport is 390×844 (iPhone 14 Pro). On desktop, `App.jsx`'s `PhoneFrame` wrapper centers a 390×844 frame with bronze-shadow and `borderRadius: 40`. On mobile viewports the frame fills the screen.

## Where state lives

| Concern | Location |
|---|---|
| Birth data (year/month/day/hour/location/gender/polarity/notify) | `store/chartContext.jsx` → `birthData` |
| Computed chart (DM, pillars, elements, tgPattern, archetypeKey) | `store/chartContext.jsx` → `chart` |
| Pricing tier (free / seeker / advisor) | `store/chartContext.jsx` → `tier` |
| Current screen | `App.jsx` `useState` + `window.location.hash` |
| Reading copy (essence, manifesto, slogan, …) per stem | `src/content/archetypeSource.js` (imported as `STEM_BASELINES`) |

## Recent design decisions worth knowing about

- **Reveal Identity composition (2026-04-24, DOC5 §9 v1.6 / DOC8 v3.2)** — the brushed `ArchetypeSeal` was removed from RevealScreen. In its place a `<HeroStemMark>` renders the painted stem icon (BrushJian for 庚) at hero scale, no ring, with negative top margin so the icon pierces THROUGH the ink-wash mountain band. The single Identity token pill became three flat silk badge tiles (Element / Stem / Polarity). See DOC8 "Phase 1 component additions" for authoring rules — these must NOT regress in future edits.
- **Section background** — `RevealScreen.jsx` uses one flat `#EFE5CC` silk fill across the full scroll height. Earlier iterations layered a `SilkPaper` SVG on top and produced a hairline at the section seam.
- **Step 7A** — the explicit reminder-time picker uses `visibleRows={3}` (compact ScrollPicker) with no quick-set chips per the simplification request.
- **Step 4** — three-tier hour input (exact / approximate 6-window / unknown) routes through `resolveHourForCalc()` in `chartContext.jsx`. Approximate windows use midpoints for the v1 calculator; `birthData.hourUnknown` lets surfaces hide hour-pillar UI.

## Phase 2 — what's still to come

The dashboard layer (Today / Energy Map / Guidance / Connect / Me) lives entirely inside `Reference/Elementum_Engine.jsx` and needs to be lifted into `src/components/`. The full extraction roadmap is in `../Reference/README.md` and DOC8 "Step-by-step extraction" (Steps 3–17). Don't add dashboard surfaces to this app without consulting that guide first — extraction order matters because of import dependencies.
