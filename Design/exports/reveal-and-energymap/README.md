# Elementum · Reveal + Energy Map (mockup export)

A self-contained design-iteration package for two surfaces from the Elementum app:

- **Reveal screen** (`src/components/RevealScreen.jsx`) — the identity recognition moment that lands after onboarding. Long ceremonial scroll: hero stem mark → archetype name → manifesto → energy blueprint → balance prescription → CTA.
- **Energy Map mockup** (`src/components/mockup/EnergyMapMockup.jsx`) — the dashboard "reading hub" the user lands on after tapping `Enter Your Dashboard`. Identity ribbon → Energy Blueprint card → Catalyst/Resistance pair → secondary cards → bottom tab nav.

The two surfaces share visual vocabulary intentionally — the same `IdentityRibbon` component opens both, and the same `EnergyBlueprint` chart renders the 5-element composition on both. That cascade is the point of the design.

## Run it

```bash
npm install
npm run dev
```

Opens on http://localhost:5173. The 庚 (Yang Metal — The Blade) reference chart is auto-seeded on mount, so both screens render with real chart-derived data:

- DM stem: 庚
- Composition: Metal 4/8 · Wood 3/8 · Earth 2/8 · Water 1/8 · Fire 1/8
- Saturation: 50% (Metal count / 8 chars)

Toggle between the two screens with the floating `Reveal / Energy Map` buttons in the top-right corner. The "Enter Your Dashboard →" CTA on Reveal also navigates to Energy Map (production behavior).

## Folder layout

```
.
├── README.md                              ← you are here
├── package.json                           ← react 19 + vite, no other deps
├── vite.config.js
├── index.html                             ← loads Google Fonts (EB Garamond, Cormorant, Noto Serif SC)
├── src/
│   ├── main.jsx                           ← React root
│   ├── App.jsx                            ← minimal: pre-seeds chart, renders one screen at a time
│   ├── components/
│   │   ├── RevealScreen.jsx               ← THE Reveal page (production)
│   │   ├── LoadingScreen.jsx              ← Reveal's lead-in (kept for context if you want to test the handoff)
│   │   ├── mockup/
│   │   │   ├── EnergyMapMockup.jsx        ← THE Energy Map page (mockup, the iteration target)
│   │   │   ├── DashboardNav.jsx           ← bottom tab bar (5 tabs · Today, Map, Guidance, Friends, Profile)
│   │   │   └── _shared.jsx                ← thin re-export of identity primitives
│   │   └── shared/
│   │       ├── IdentityRibbon.jsx         ← shared between Reveal §2 and Energy Map (the cascade)
│   │       └── EnergyBlueprint.jsx        ← shared 5-element composition chart
│   ├── styles/
│   │   └── tokens.jsx                     ← palette, decorative SVGs, ElementSign, BrushUnderline, SealDot, SilkPaper
│   ├── store/
│   │   └── chartContext.jsx               ← React Context: birthData, chart, tier
│   ├── engine/
│   │   └── calculator.js                  ← BaZi calculation engine (pure JS)
│   └── content/
│       ├── archetypeSchema.js             ← canonical field spec (varyBy, tier, constraints)
│       └── archetypeSource.js             ← STEM_CARD_DATA + TG_CARD_DATA (full project data)
├── public/
│   ├── favicon.svg
│   └── assets/
│       ├── ink-a-top.png                  ← Reveal §1 hero ink-wash mountains (don't omit — Reveal looks broken without)
│       └── ink-a-bottom.png
└── docs/
    ├── DOC5_extract.md                    ← Reveal + Energy Map sections from the design doc, plus §2/§3/§4 (palette/type/motion)
    └── DOC9_Archetype_Fields.md           ← schema companion: field names, tier, varyBy, copy caps, asset slots
```

## Where to focus iteration

**Visual / layout:**
- `src/components/RevealScreen.jsx` — the long scroll
- `src/components/mockup/EnergyMapMockup.jsx` — the dashboard
- `src/components/shared/IdentityRibbon.jsx` — the cascade primitive used by both
- `src/components/shared/EnergyBlueprint.jsx` — the composition chart used by both
- `src/components/mockup/DashboardNav.jsx` — bottom tab bar

**Palette / typography / motion** is centralised in `src/styles/tokens.jsx` and described in `docs/DOC5_extract.md` §2–§4.

## What's intentionally NOT in this export

- Onboarding screens (Welcome, 7 onboarding steps) — irrelevant for these two pages
- DevBar (a developer-side debugging panel)
- TG_CARD_DATA detail pages (still in the schema but not consumed by these two surfaces)
- Other dashboard tabs (Today, Guidance, Friends, Profile) — only Energy Map is mocked
- The full Birth Chart Raw Data page (separate surface)

## Design contract — read these first

1. **`docs/DOC5_extract.md`** — what each surface is supposed to do, with timing tables, layout specs, copy register, motion rules. Section numbers preserved (§9 Reveal, §11 Energy Map).
2. **`docs/DOC9_Archetype_Fields.md`** — every data field the surfaces consume, grouped by UI surface, with copy caps and tier gating.

When DOC5/DOC9 conflict with code, the **schema (`archetypeSchema.js`) wins** for data shape; the **doc wins** for design intent. Code is the working approximation.

## The chart object

Both screens read from a `chart` object produced by `engine/calculator.js`. Key fields they touch:

```js
chart.dayMaster = {
  stem: '庚',          // Chinese character
  element: 'Metal',    // Wood/Fire/Earth/Metal/Water
  polarity: 'yang',    // 'yang' | 'yin'
  strength: 'extremely_strong',  // band — concentrated/balanced/open/etc.
}
chart.elements = {
  Metal: { count: 4, present: true, ... },
  Wood:  { count: 3, present: true, ... },
  Earth: { count: 2, present: true, ... },
  Water: { count: 1, present: true, ... },
  Fire:  { count: 1, present: true, ... },
}
chart.missingElements = []     // populated when count === 0 for any element
chart.tgPattern = 'pure'       // pure/rooted/flowing/forging/tested
chart.archetypeKey = '庚_concentrated_pure'
```

To test a different chart, edit the seed in `src/App.jsx`:

```js
updateBirthData({
  year: 1991, month: 7, day: 12, hour: 4,
  hourUnknown: false, hourWindow: null,
  location: 'Tokyo', gender: 'female', polarity: null,
});
```

## Provenance

Exported from `D:\Elementum\Elementum_Project` on 2026-04-29. Source git history available in the parent project. If you make iteration changes here, please surface them as a diff or PR description so they can be merged back upstream — this folder is a snapshot, not a fork.
