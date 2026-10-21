# Catch-up

Read `../2026-10-17-domains/04_DEPTH_STATE_2026-10-19.md` first: the state of the in-depth sections, the rulings in force, who owns which files across the parallel sessions, the standing laws, and how the owner works. Then `01_TASK_BRIEF.md` here. `02_DISPATCH_PROMPT.md` is the prompt this session was started with.


## 2026-10-21 · Your Almanac is live

The owner ported every section to elementum.life (Day Master session, 2026-10-21). `ALMANAC_V1` in TodayScreen, DayPage, MonthPage and YearPage now reads `ALMANAC_LIVE` from `Elementum_App/src/liveFlags.js`. Every push to main now reaches elementum.life. Draft tags show on the dev site only. See §0 of `ComparativeAnalysis/Handoffs/2026-10-17-domains/04_DEPTH_STATE_2026-10-19.md`.

## 2026-10-21 · back on the dev site (owner L1 A, confirmed)

The owner ruled L1 A on round 4 (keep the Almanac on the dev site until the batch lands) and confirmed it when asked about the port. `ALMANAC_LIVE = false` in `Elementum_App/src/liveFlags.js`; TodayScreen, DayPage, MonthPage and YearPage read `ALMANAC_LIVE || IS_DEV_TOOLS`, so dev.elementum.life keeps the Almanac and elementum.life shows the old Today pages. Turning it live again is one line, when the owner says so.
