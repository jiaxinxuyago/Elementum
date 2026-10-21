# Life Chapters section audit: state check and timing accuracy (2026-10-21)

Session: "Elementum Life Chapters reading content" (session_01LKbtNcH4nTofFBwRv1HdHf). Brief: `../BRIEF.md` (R1: audit now, retire the round-1 path).

## 1. State check

| Check | Result |
|---|---|
| Round-1 path retired (A4, R1) | Done, `f8088a4`. `depthChapters.js` removed; the round-1 samples stay in their handoff file. `resolveChapters` hands straight to `chaptersResolve.js`. |
| Content in the station | `TEMPLATED/tpl_chapters.json`, 377 units, with a REA_16 §2c row (`station:TEMPLATED.units`). |
| Station ↔ app (`export-reading-templates.mjs --check`) | In sync, 247 files. `build-chapters-content.mjs --check`: the module is in sync, 377 units. |
| JSON ↔ MD twins (`build-template-twins.mjs`) | The `tpl_chapters` twin was missing. It is now built (250 axis twins). |
| Placeholder lines | None. 480 random charts (with and without a birth hour) plus the three review charts resolve with no errors and 16,568 units, 0 of them draft. |
| Rendered in the app | Golden at Advisor and Free and chart C at Seeker (birth hour unknown, closed Late Chapter) render every block, with no page errors. Checked on the dev build and on dev.elementum.life. |
| Voice audit | Clean, 69 rows enforced. The row `station:TEMPLATED.units` is prose-checked. |
| Assembled pages | `pages.mjs --surface chapters`: 75 pages (74 composed, Advisor reader, year 2026) and one page of 42 units no sampled chart reaches. Split into `pages/group-1..3.md`. |

## 2. Timing accuracy (luck pillars and years)

The classical start of the luck pillars (起运): count the days from the birth to the next 节 (forward: a yang-year male or a yin-year female) or back to the previous 节 (backward), and take three days as one year. One day is four months and one 时辰 is ten days (渊海子平, 三命通会 卷二 "起大运"). The direction rule in `engine/calculator.js` is correct (阳男阴女顺排).

I checked `luckPillars[0].startAge` against an independent computation: Your Almanac's minute-exact 节 table (`engine/almanac/solarTerms.js`) and the birth time in Beijing. The sample was 3,000 random births, 1950–2007, all hours, both genders (script: `qa/qiyun.mjs`; `qa/model.mjs` runs the 480-chart resolve).

| Result | Charts |
|---|---|
| Start age agrees (rounded to whole years) | 2,372 (79%) |
| Off by one year (the birth hour is ignored, day-level term dates, the F1 drift) | 442 (15%) |
| **Off by about ten years** | **186 (6%)** |

The ten-year errors have two sources:
- **121 are backward-direction births between 小寒 and 立春** (about 6 January to 3 February). The backward loop in `calculator.js` searches only the bazi year's own terms (`getSolarTermDate(baziYear, 11 … 0)`). It never reaches 小寒 of the next Gregorian year, which is the true previous 节 for those births. So it lands on the 大雪 a month earlier: about 30 extra days, ten extra years.
  - Example: 1951-01-19 22:00, female, 庚寅 year, backward. The previous 节 is 小寒 on 6 January 1951, 13.4 days, start 4.5. The app counts from 大雪 on 7 December 1950, 43 days, start 14.
  - **These readers are placed in the wrong decade on Life Chapters, on the Domains decade lines and in the Almanac's decade.**
- **About 65 are births within two days of a 节**, where the day-level dates and the known drift of `getSolarTermDate` (finding F1) decide the side.

The labels have a further error. The decade labels ("2023 to 2032") are `birthYear + startAge`, a calendar year. The classical 交运 date falls inside that year or the next, so in 1,022 of 3,000 charts the label's first year differs from the exact handover year. That is precise only to about a year.

**Years.** A Chinese year runs from 立春 (about 4 February). The Advisor year cards took "now" from the calendar year, so from 1 January to 立春 the coming year was shown as "now". **Fixed in this audit (a TWEAK):** `chaptersResolve.js` takes the year from Your Almanac's `periodOf('year')`.

**Reader age.** `readerAge` (`domainsResolve.js`, Domains-owned, shared) is `nowYear − birthYear`, with no birthday. A chapter turns "now" on 1 January of the year the reader turns 16, 35 or 48, up to a year early. This goes in the report for the Domains section.

The calculator is shared engine code: a fix moves existing readers' decades on every section. So this is a MAJOR for the owner, not changed here (as with F1, "do not change the calculator").
