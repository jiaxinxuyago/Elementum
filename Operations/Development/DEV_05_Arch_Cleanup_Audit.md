# Architecture Cleanup — Audit & Execution Plan

**Audited:** 2026-06-26 (read-only, 3-agent fan-out + manual verification of every deletion). **Nothing modified.**
**Decision (owner):** the whole cleanup is **DEFERRED to a dedicated session** — this doc is the ready-to-execute map so that session skips re-investigation.
**Owner constraints (locked):** strictly **behavior-preserving**; all four areas in scope (dead code · file splits · folder/boundaries · naming/co-location/barrels); **audit-first → approve → execute** (verify each step in the preview).

> ⚠ Two findings overturned the starting assumptions — re-verify before deleting, but these were confirmed by JSX-render grep on 2026-06-26: `RevealScreen.jsx` is NOT live (it's only rendered by the also-dead `EnergyMapScreen`); `reading-detail/` is lazy-imported+routed but UI-unreachable.

---

## A. Dead code

### Tier 1 — confirmed dead, safe to remove (verified: never rendered as JSX / zero importers)
| File | Why dead |
|---|---|
| `components/RevealScreen.jsx` (1,313 ln) | only importer is `EnergyMapScreen` (dead); live reveal = `d13/D13RevealScreen` |
| `components/dashboard/tabs/ReadingScreen.jsx` (376) | zero importers; replaced by `d13/D13ReadingScreen` |
| `components/dashboard/EnergyMapScreen.jsx` | lazy-imported but never rendered (`app-energymap` → `D13ReadingScreen`) |
| `components/dashboard/RawChartPage.jsx` | never rendered (`chart-reveal` aliased → `D13PillarChartScreen`) |
| `components/dashboard/BottomTabNav.jsx` | zero importers; replaced by `d13/D13TabBar` |
| `components/d13/RevealPlate.jsx` | zero importers; live reveal uses `RevealDissolve` |
| `components/shared/IdentityRibbon.jsx` | only consumed by dead `RevealScreen` |
| `components/dashboard/reading-detail/DayMasterDetail.jsx` | never rendered (`read-daymaster` aliased → D13) |

Also remove the now-unused `lazy()` consts + idle-prefetch entries for these from `App.jsx` (the `app-energymap` / `chart-reveal` / `read-daymaster` *routes* stay — they render D13 screens — only the dead lazy imports go). **~2,200+ lines, low risk.** Gate: boot every route after.

### Tier 2 — OWNER DECISION: the old §11 reading IA
`components/dashboard/reading-detail/` cluster — `ElementalNatureDetail · TenGodsDetail · ForcesInMotionDetail · LifeChaptersDetail · ChartPatternsDetail · SeasonalCalibrationDetail · LockedDetail · DetailShell.jsx · sections.js` + `components/dashboard/TGRing.jsx` (used only by TenGodsDetail). **Routed but UI-unreachable** — its only entry was the now-dead `ReadingScreen`; D13 catalogue replaced it; routing already aliases `read-daymaster`/`chart-reveal` to D13. ~1,800 lines. **Delete only if owner confirms the §11 IA is retired** (not just hidden for possible revival).

## B. Oversized files → behavior-preserving splits (each behind a thin barrel = zero consumer edits)
- **`engine/calculator.js` (614)** → `constants · branchRelations · calendar · tenGods · composition · strength · band · faces` + thin `calculator.js` barrel. **Re-run `node tools/qa-accuracy-dump.mjs` — output must be byte-identical.** Watch: two different `SIX_COMBO` shapes (module `detectPatterns` array-of-pairs vs local `applyBondModifiers` array-of-objects — keep separate); consolidate the `GEN`/`CTL`/`MAIN_QI` maps (re-declared in 4+ fns) into `constants.js`. Preserve exports: `calculateBaziChart` (App, chartContext, LoadingScreen, ChartResonance, CompatFriendFlow, D13WheelPreview), `ENGINE_VERSION` (chartContext), `getEnergyBand` (resolveVariant).
- **`App.jsx` (756)** → `routes.js (FLOW/DASHBOARD_TAB/readHash) · screenRegistry · prefetch.js · components/Shell.jsx · components/ScreenRouter.jsx · devHooks.jsx` + thin App (~120 ln). Keep the render `switch` as-is inside ScreenRouter (don't convert to a slug→component map — aliased routes + DashboardShell/veil wrappers would flatten wrong). Preserve `window.__seedData/__goto/__setTier/__cycleStem` runtime contract.
- **`content/archetypeSource.js` (2,225)** → `stemBaselines · tenGodCards · classicalAnchors` + barrel. **Name-collision (high value):** this file's `STEM_CARD_DATA` (stem-baseline) collides with `content/STEM_CARD_DATA.js`'s `STEM_CARD_DATA` (band×pattern variants) — different data, same name, forcing defensive aliasing everywhere. Rename to `STEM_BASELINES` / `STEM_VARIANTS` (~14 import sites, med). Note `archetypeSchema.js` is the *contract* (keep separate). ⚠ CLAUDE.md cascade: archetypeSchema → 庚 in archetypeSource → REA_03 → consumer; HTML mirror is reference — decide if it splits too.
- **`onboarding/OnboardingSteps.jsx` (1,273)** → `onboarding/steps/StepN*.jsx` ×10 + barrel. Lowest risk; only fix relative-import depth. `Step5_Location` carries the geocoding import.

## C. Structure / boundaries / naming
1. **`@/` Vite path alias** + codemod the 14 deepest files (48 `../../../` imports; worst: every `reading-detail/` + `tabs/` file). Low, mechanical, high value.
2. **Move `guidance/{HorizonHeader,InkTile,CloudVeilBackground}` → `shared/`** (app-wide primitives, used by DashboardShell + 5 screens — not Guidance-specific). Low.
3. **Relocate root screens:** `LoadingScreen` → `onboarding/`, `ErrorBoundary` → `shared/`. Low.
4. **Per-folder barrels** for `engine/`, `content/`, `shared/`, `d13/` (icons/ barrel is the proven pattern). Low.
5. **`tokens.js` vs `tokens.jsx` footgun** — two vocabularies (camelCase `tokens.js` vs SCREAMING_SNAKE + React primitives `tokens.jsx`) chosen by import extension. Pick one canonical entry; normalize importers. Med.
6. **`D13*` prefix + Reading-tab home** — the prefix is an iteration codename (ages badly); and the Reading tab lives in `d13/` while the other 4 tabs live in `dashboard/tabs/`. De-prefix + unify the surfaces layer. Med–high; **do last**, after dead-code settles. Also collapse the 4 thin `D13*Screen`-wraps-`D13*Card` pairs if the split adds no value.

## Recommended sequence
| Phase | What | Risk | Gate |
|---|---|---|---|
| 1 | Tier-1 dead-code removal + App.jsx ref cleanup | low | boot every route |
| 2 | Tier-2: delete §11 `reading-detail/` IA | low* | **owner: retired?** |
| 3 | `@/` alias · guidance→shared · relocate root screens · barrels | low | — |
| 4 | File splits (Onboarding → App → calculator → content), barrel-preserving | low–med | calculator: QA re-run byte-identical |
| 5 | `STEM_CARD_DATA` rename · `D13*` de-prefix · tokens unification | med–high | after 1–4 |

**Coordination:** Phase 4's engine+content splits overlap parked **#6 (engine Phase 2)** — the structural (barrel-preserving) split is safe now and #6's semantic changes layer on cleanly after.

## Open owner decisions
1. **Tier-2 `reading-detail/` (the §11 IA): retire & delete, or keep?**
2. **Phase scope/order** to green-light when the session runs.
3. **`D13*` de-prefix timing** (Phase 5) and whether the `archetypeSource` HTML mirror splits with the JS.
