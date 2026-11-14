# From Life Chapters to the Day Master session (2026-11-14), for the content compile

**Status:** the Domains dispatch items are all done. Commits on main: `74e1f8d` and `303d475`.

## What changed

- **Station `TEMPLATED/tpl_chapters.json` (`candidates.units`):** 464 units became 484.
  - 20 new keys for readers under 16, for each of `action|body|expression|mind|order`:
    - `ENERGY <fn> · chapter.year.<grow|release>.now`
    - `ENERGY <fn> · chapter.month.<grow|release>.coming`
  - 29 rewritten units, the re-audit MINORs adopted under PM_04 D2. The finding ids are in `ComparativeAnalysis/Evaluations/section-audit-2026-10-21/life-chapters/reaudit/minors/out-minors.json` and the ledger is `LEDGER.md` beside it. The old texts are in `candidates.__ore.retired`.
  - The `$provenance` rows record both changes.
- **Built module:** `Elementum_App/src/content/depthChaptersEnergy.js`, built by `tools/build-chapters-content.mjs`. `--polish` now also takes `--why`.
- **Resolver:** in `src/components/reading/chaptersResolve.js`, a chapter keeps at least two domain lines when repeats are dropped (G1-016).
- **Routes:** `DecadePage.jsx` is retired.
  - In `App.jsx`, `app-decade` has left the route list.
  - The decade tile always opens Life Chapters.
  - An old `#app-decade` link lands on Your reading.
  - The DevBar entry is gone.

## Live or dev

- Life Chapters is live on elementum.life (`CHAPTERS_ENERGY = true`, since 2026-10-21).
- Everything above ships on both sites with the push. No new flag.

## Coverage

`qa-reading-coverage`, Life Chapters:

| Run | Lines | Failing |
|---|---|---|
| `--n 600 --from 2010 --to 2026` | 23,974 | 0.00% |
| `--n 2000` | 69,579 | 0.00% (before the two-line rule added a few lines) |

## Waiting on the owner (PM_04 §3)

- **LC-N1 to LC-N6:** the re-audit MAJORs.
  - N1 (the year and landing lines) is shared with Your Almanac's Year page.
  - 30 MINORs wait on these rows.
- **LC-M1R (engine):** births on a solar-term day still start their decades about ten years off (about 2% of charts).
- **LC-P1:** whether the Life Chapters age frames ("Since your late forties") follow DOM-P1. There are 72 lines, and the recommendation is to keep them.

## Blocking the compile

Nothing.
