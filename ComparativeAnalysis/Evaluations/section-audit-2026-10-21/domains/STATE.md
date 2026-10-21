# Domains + Blueprint section audit: state check and mechanical accuracy (2026-10-21)

Session: Domains (session_0157BD3MBKbov3jAMoKYj2nT). Brief: `../BRIEF.md`, R2 A: write first, then audit the whole section. Step 1 landed in `76d725f`, with rulings Y1, Y2, S1 and T1 all A (`ComparativeAnalysis/Handoffs/2026-10-17-domains/03_RULINGS.md`).

## 1. State check

| Check | Result |
|---|---|
| Content in the station | The domain units are in `TEMPLATED/tpl_domains.json`, the seat files and the god files; the round-2 revisions landed and the 466 retired texts are kept in `__ore`. The Blueprint, By-year and slot units are in `TEMPLATED/tpl_depth.json`, 362 units. |
| Station ↔ app | `export-reading-templates.mjs --check`: in sync, 248 files. `build-depth-content.mjs --check`: in sync, 362 units. `build-domains-content.mjs --check`: in sync, 70 seats, 10 gods, 9 pairs. |
| JSON ↔ MD twins | `build-template-twins.mjs`: 251 axis twins, fresh. The `tpl_depth` twin was regenerated in `76d725f`. |
| Placeholder lines | None. `tools/qa-domains-coverage.mjs --n 3000` reports 0% on all ten surfaces over 3,003 charts: headline, How you are, seat block, gap row, By year, and Blueprint parts 1 to 4. |
| Engine golden | `qa-depth-golden`: PASS, including the three S1 structure cases. `qa-engine-regression`: PASS, 6 cases. |
| Rendered in the app | `qa/render.mjs` on dev.elementum.life, all ten preset charts at Advisor tier: the Domains and Blueprint screens render with no draft tag, no unfilled slot and no page error. The only draft tags are on Stars (R3, that session's batch not yet written) and one on Life Chapters for the 辛 preset (reported under "for other sections"). Both sites serve the step-1 lines. |
| Voice audit | Clean, 69 rows enforced. |
| Assembled pages | `pages.mjs --surface domains`: 203 pages (202 composed charts plus one page of units no sampled chart reaches), 818 distinct units. `--surface blueprint`: 136 pages (135 plus one unreached), 285 distinct units. |

## 2. Mechanical accuracy (A1), over 3,000 random charts (`qa/state.mjs`)

**The structure (格局, 子平真诠).** Every chart now names a structure. Spread: 正印格 346, 正财格 321, 七杀格 311, 正官格 303, 伤官格 301, 食神格 281, 偏印格 280, 偏财格 279, 建禄格 279, 月劫格 178, 月刃格 121. By rule path:
- no hidden stem on show, so the main stem decides: 968;
- the main stem on show: 744;
- the middle stem: 357;
- the residual stem: 232;
- 建禄 (lu): 224;
- 月劫 (jie): 178;
- 月刃 (ren): 121;
- only a Twin or Rival on show (passed): 121;
- a store month whose main stem is the Twin (own): 55.

States: formed 1,936, under strain 876, broken 188.

**Findings the auditors cannot see on a single page:**

| # | What | How many | Class |
|---|---|---|---|
| M-1 | **The rescue is already in the chart.** For a 正官格 with a 七杀 beside it, or a 七杀格 with a 正官 (官杀混杂), the engine names the output (食伤) as what protects the structure and points to the decades that bring it, even when the chart already seats a 食神 or 伤官. In 子平真诠 (论偏官, 论正官) the output already present is the remedy: it removes the General and keeps the Magistrate (去杀留官), so the mix is already cleared. Example: 2006-12-03 10:00, 丙戌 己亥 丙寅 癸巳, 七杀格 "under strain" with "what protects it · Artisan decade 2087 to 2096". The same page reads "The Artisan tames the General". | 163 of 727 charts with a rescue line (22%) | MAJOR (engine logic) |
| M-2 | **Rescue decades past 75.** The "what protects it" label lists every decade that brings the rescue, including ones that start after 75. The Domains decade lists and the missing-character lines stop at 75 (`DEC_MAX`). | 147 charts | TWEAK (code), to cap at `DEC_MAX` as elsewhere |
| M-3 | **"in your decades later".** The rescue slot `{when}` fills as now, next, later, "now and next" or "next and later", so the approved templates read "you find the time to make it in your decades later" or "in your decades now". | 514 lines (every rescue still ahead) | MINOR: the T1 wording is owner-approved, so it goes back to the owner |
| M-4 | **"tames" in a label.** The Blueprint pairing label prints the TG_PATTERN name "The Artisan tames the General" (食神制杀). The locked relation words never use "tames"; the merged reading says "shapes". | Every chart with 食神制杀 | TWEAK (label) |
| M-5 | **The year turns on 1 January, not 立春.** `readerAge` takes "this year" from the calendar year, so the By-year tab and "now" read the coming year from 1 January to about 4 February. Life Chapters fixed the same slip with Your Almanac's `periodOf('year')`. | Every reader, about five weeks a year | TWEAK (code) |
| M-6 | **Ages count no birthday.** `readerAge` is year minus birth year, so a gate or decade turns "now" up to a year early. Shared with Life Chapters, which reported it here. | Every reader | MINOR (age labels move by a year for part of the year) |

**From the other sections (shared, not changed here):** the luck-pillar start is wrong by ten years for backward births from about 6 January to 3 February (Life Chapters M1, `engine/calculator.js`), which moves those readers' Domains decade lines too. Solar-term date drift F1 (Almanac). Neither is changed here ("do not change the calculator").
