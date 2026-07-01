# Archive — `Elementum_Engine.jsx` (legacy monolith)

> **Status: historical reference only. Not live code, not bundled, not an active
> extraction source.** Archived 2026-07 during the architecture restructuring.

This is the **original single-file React prototype** Elementum was built in — one
6,900-line / 611 KB file that inlined all data, calculation, and UI. The
production app lives in `Elementum_App/` and does **not** import this file
(the only mentions of it in `src/` are provenance comments).

## Why it's archived, not deleted

An earlier plan (see the git history of the old `Reference/README.md`) was to
**extract** the dashboard surface out of this monolith verbatim, component by
component. **That plan was superseded.** The dashboard/reading surface was
**rebuilt from scratch** in the d13 → `reading` redesign with a different
component architecture. Verification at archive time: of the 13 components the
old plan listed as "remaining to extract," **12 do not exist in `src/`** by
those names — they were rebuilt, not lifted. The app runs and renders fully
without any of them.

## What it's still useful for

A **logic / content quarry** while the reading rebuild is in progress. Ranges
worth consulting if a needed behaviour hasn't been reproduced yet:

| Range (lines) | Contains |
|---|---|
| 3580–4526 | `ELEMENT_ENERGIES`, `ENERGY_CONDITION_READINGS`, tiaohou season adjustments, `TG_PROFILES`, `getElementInsights` |
| 2251–3101 + 4527–4898 | `STRENGTH_META`, `ELEMENTAL_NATURE`, `buildDayMasterProfile`, block-selection helpers |
| 2721–2829 | `ArchetypeSeal` per-stem geometry (bisected hexagon for 庚, spiral vine, etc.) |
| 1585–2103 | BaZi calc — **already ported** to `Elementum_App/src/engine/calculator.js` |

## When it can finally be deleted

Once every behaviour/content set you still consult here has been reproduced in
`Elementum_App/` (engine + content chunks). Until the reading rebuild settles,
keep it. Git history retains it either way.
