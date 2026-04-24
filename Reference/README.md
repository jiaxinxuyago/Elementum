# Reference — `Elementum_Engine.jsx`

This folder holds the **original single-file React artifact** that Elementum was prototyped in. It is **not live code** — the production app lives in `Elementum_App/`. Use this file as the extraction source for any dashboard component that hasn't been ported yet.

**Source size:** 6,900 lines · 611 KB
**Status at time of migration:** April 2026

---

## What has been extracted

| Target in Elementum_App | Source lines in Engine | Notes |
|---|---|---|
| `src/engine/calculator.js` | 1585–2103 + `getEnergyBand` from 4084 | Complete. Pure JS, no React deps. |
| `src/content/archetypeSource.js` | — | Lives in the `Code/archetypeSource.js` file (formerly inlined at engine lines 4–1558); moved into the app per DOC4 §1. |
| `src/content/STEM_CARD_DATA.js` | — | Same — was separate, now in `src/content/`. |
| `src/styles/tokens.jsx` | — | Built fresh from `Design/source/design_tokens.js` (Ink & Pigment v2). |
| `src/components/onboarding/WelcomeScreen.jsx` | — | Built fresh from `Design/flow/welcome.jsx`. |
| `src/components/onboarding/OnboardingShell.jsx` | — | Built fresh from `Design/flow/primitives.jsx` + `onboarding.jsx`. |
| `src/components/onboarding/OnboardingSteps.jsx` | — | Built fresh. Steps 1–7 + conditional 4A / 6A / 7A. |
| `src/components/LoadingScreen.jsx` | — | Built fresh from `Design/flow/loading.jsx`. |
| `src/components/RevealScreen.jsx` | — | Built fresh from `Design/flow/reveal.jsx`, wired to live chart + `archetypeSource.js`. Identity composition refined on 2026-04-24 — see DOC5 §9 v1.6 / DOC8 v3.2 (HeroStemMark + StemSign + flat BadgeTile, no ring). |
| `src/store/chartContext.jsx` | — | New — React Context for birth data + computed chart. |

> The Reveal Identity composition **no longer uses ArchetypeSeal at all** — it was replaced by `<HeroStemMark>` + `<StemSign>` + `<BrushJian>` (a painted ink-wash sword for 庚, with a fallback to `<ElementSign>` for stems whose painted SVG isn't authored yet). See DOC8 v3.2 "Phase 1 component additions" for the component graph and authoring rules. The Phase 2 dashboard's `DayMasterHero` is a separate component and may still use the engine's `ArchetypeSeal` per DOC5 §11 — extract from engine lines 2721–2829 if you want the richer per-stem geometric seal (bisected hexagon for 庚, spiral vine, etc.) for that surface.

---

## What remains to extract (Phase 2 — Dashboard)

The entire dashboard surface lives inside the engine and still needs to be lifted into `Elementum_App/src/components/`. Per DOC8 Steps 3–17:

| Target | Engine lines | Key imports the extracted file will need |
|---|---|---|
| `src/engine/energyData.js` | 3580–4526 | No React deps. Exports `ELEMENT_ENERGIES`, `ENERGY_CONDITION_READINGS`, `TIAOHOU_SEASON`, `getTiaohouAdjustment`, `applyTiaohouToEnergies`, `TG_PROFILES`, `getElementInsights`. |
| `src/engine/readingEngine.js` | 2251–3101 + 4527–4898 | Imports `STEM_CARD_DATA`, `TG_CARD_DATA` (from `src/content/archetypeSource.js`). Exports `STRENGTH_META`, `ELEMENTAL_NATURE`, `buildDayMasterProfile`, block selection helpers. |
| `src/engine/navigation.js` | 5429–5512 | Exports `getSections`, `tgEn`. |
| `src/components/ArchetypeSeal.jsx` | 2721–2829 | Per-stem geometric seal (bisected hexagon, spiral vine, etc.). |
| `src/components/ElementIcon.jsx` | 3554–3579 | Lucide-based element icons. |
| `src/components/StrengthRing.jsx` | 3102–3127 | SVG partial circle showing DM strength. |
| `src/components/PillarGrid.jsx` | 3532–3553 | Four-pillar display for the `/chart-reveal` raw page. |
| `src/components/DayMasterHero.jsx` | 3128–3330 | The identity hero at the top of the Energy Map (DOC5 §11). |
| `src/components/HeroPopupOverlay.jsx` | 6381–6521 | Element / Stem / Polarity popups. |
| `src/components/ProfileReading.jsx` | 3399–3531 | Reading blocks with tier gating. |
| `src/components/ElementSpectrum.jsx` | 5061–5428 | Energy Blueprint card (reveal + energy map). |
| `src/components/DetailShell.jsx` | 5452–5512 | Shared back/next wrapper for all catalogue detail pages. |
| `src/components/EnergyMapMenu.jsx` | 5513–5888 | Catalogue home (Energy Map dashboard tab). |
| `src/components/YourNatureDetailPage.jsx` | 5889–5904 | |
| `src/components/BlueprintDetailPage.jsx` | 5905–5990 | Dormant — retain but do not wire into routing yet. |
| `src/components/DomDetailPage.jsx` | 5991–6058 | Primary / Secondary Force pages. |
| `src/components/SeasonalDetailPage.jsx` | 6059–6118 | |
| `src/components/CatalystDetailPage.jsx` | 6119–6180 | |
| `src/components/ResistanceDetailPage.jsx` | 6181–6244 | |
| `src/components/PaywallModal.jsx` | 6245–6296 | |
| `src/components/ReadingSection.jsx` | 6297–6363 | Uses `renderBlocks` from `readingEngine.js`. |
| `src/components/FlowPeriod.jsx` | 6364–6380 | |
| `src/components/DebugPanel.jsx` | 3331–3398 | **Dev only — exclude from prod build.** |

---

## Extraction rules (from DOC8)

1. **Extract, don't rewrite.** Every function and component must be lifted verbatim. The only permitted changes are:
   - Adding `export` to top-level declarations
   - Replacing inlined data with `import` statements
   - Adding required `import` statements at the top of each new file
2. **Validate after each step:**
   ```bash
   npx @babel/parser --plugin=jsx src/components/ComponentName.jsx 2>&1 | tail -5
   # Silence = valid. Any output = parse error.
   ```
   Plus: `npm run dev` and confirm no console errors before moving on.
3. **Imports map to the new structure:**
   - Colors / constants → `src/styles/tokens.jsx`
   - Archetype data → `src/content/archetypeSource.js` (import with alias `STEM_BASELINES` / `TG_CARD_DATA`)
   - Variant data → `src/content/STEM_CARD_DATA.js` (import with alias `STEM_VARIANTS`)
   - BaZi calculation → `src/engine/calculator.js`
   - Chart state → `src/store/chartContext.jsx` (via `useChart()`)

---

## Line-range extraction snippet

```bash
# From the repo root:
sed -n '3580,4526p' Reference/Elementum_Engine.jsx > Elementum_App/src/engine/energyData.js
```

(Same pattern for every row in the "Remaining" table above.)

---

## When this file can be retired

Delete `Reference/Elementum_Engine.jsx` once **every row in the "Remaining to extract" table has been lifted** and the extracted components render cleanly against the new `src/content/` data. At that point the engine has nothing left to offer and can go.

Keep this README updated as rows move from "remaining" to "done" — it's the single source of truth for extraction progress.
