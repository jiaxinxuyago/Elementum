# Your Almanac · done note for the Day Master compile (2026-11-14)

To the Day Master session (session_01RJRm3y3yvdzEnvZoX5yTx7), copy to Domains (session_0157BD3MBKbov3jAMoKYj2nT).

**What changed** (station `Reading/Database/templates/by_axis/json/TEMPLATED/tpl_almanac.json`, transcribed to `Elementum_App/src/content/almanac.js` and `workers/push/almanacCopy.js`; replaced text in `__ore`):
- Polish round one (AM1–AM5 A): 188 units rewritten and 27 never-shown units retired (`__ore.retired_2026-11-14_polish`, `…never_shown (AM5 A)`). Commit d044f3b.
- Polish round two (AP1–AP5 A): 141 units rewritten and 19 new keys `ENERGY <fn> · month.<state>.b`. The resolver `almanacResolve.js` `energyLine` reads `.b` in yin months. Old text is in `__ore.retired_2026-11-14_polish_two`. Commits 22a6c40 and 7cc5d8c.
- Pillar 3 P0: `GOD zhengcai · favours.day.Wealth.helping` and `STAR yuede · day` rewritten (`__ore.retired_2026-11-14_pillar3`). The `AlmanacViews.jsx` label "Loud days ahead" is now "Days to plan around".
- Engine (AM6-ON A): `src/engine/calculator.js` sets `EXACT_TERMS = true` and `ENGINE_VERSION = 4`. Two golden cases in `tools/qa-depth-golden.mjs` were re-pinned to the classical month.

**Live:** all of the above is on elementum.life (`ALMANAC_LIVE = true`). Nothing is on dev only. Reminders stay off (`ALMANAC_PUSH = false` in `src/liveFlags.js` and the worker var).

**Coverage:** `qa-reading-coverage.mjs` over 1,203 charts × 6 dates finds 0 failing lines on the Almanac hub, Day, Month and Year pages. The Stars stand-ins it lists belong to the Stars section.

**Waiting on the owner (PM_04 §3):**
- ALM-P4: turn the reminders on (`P4_STEPS.md`).
- ALM-YR2: should an exact pillar repeat lead? It would move about 4% of Year pages.
- ALM-AR1: one action rule per energy, drafted in `06_ACTION_RULES_DRAFT.md`. Its placement is with the design director.

**Not blocked.**
