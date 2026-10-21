# Your Almanac · state check (2026-10-21, step 1)

Section: the Today hub, Day, Month and Year pages and the reminder lines (`TEMPLATED/tpl_almanac.json`, 378 units: 58 golden templates and 320 batch units). Out of scope: the Year page's shared year lines (Life Chapters, L9 A) and the By-year domain lines (`year_domain.*`, Domains; unwritten, hidden on elementum.life). Reminders (GO-1) out of scope.

| Check | Result |
|---|---|
| Every preset chart (jia…gui, born 1995) resolves the hub, Day ×7 days, Month and Year | 10 of 10 charts, 90 pages, 600 text blocks, 0 errors |
| Draft (placeholder) lines on those pages, the Almanac's own units | 0 of 600 |
| 400 random charts × random dates 2026–2028, every Almanac key the resolver asks for | 0 missing |
| Station ↔ app (`export-reading-templates.mjs --check`) | in sync, 248 files |
| Station JSON ↔ MD twins (`build-template-twins.mjs`) | fresh |
| `almanac.js` vs the station (`build-almanac-content.mjs --check`) | current, 378 units |
| Golden checks (`qa-almanac-golden.mjs`, `qa-depth-golden.mjs`) | pass |
| Pages assembled for the audit (`audit/pages.mjs --surface almanac`) | 118 pages (68 Day, 36 Month, 14 Year) by greedy cover, plus one page of 44 units no page reaches |

## Timing (A1, mechanical)

| Check | Result |
|---|---|
| Day pillar against published anchors (2000-01-01 戊午, 1949-10-01 甲子) | match |
| The almanac's 节 table against published instants (2024–2027 立春, 2025 寒露, 立冬) | within 7 minutes |
| The almanac's month and year periods vs the calculator, every day 1950–2030 | differ on 821 days of 29,585 (2.8%) |
| … of which: dates from 1 January to 小寒 | 351 days (4.3 a year): the calculator gives the 丑 month; the classical month is still 子 (`getSolarMonthIndex` starts every year at index 0) |
| … of which: term-day drift (F1) | 470 days (5.8 a year): the calculator's approximate term dates run a day or two early or late |

The Almanac reads its months and years from the exact table, so its own pages are right. The calculator's differences touch the natal charts of readers born on those days (F1, extended by the January case); the calculator is not changed in this audit.

## Units no page reaches (structural, from the selection rule)

44 units can never or almost never show, because their signature never leads or never scores a reminder:
- the reminder bodies for bind, frame, harm and repeat (16): a reminder needs a score of 65; these kinds top out below it;
- the month landing lines for repeat (4): a repeat scores under the 30 a month needs to lead;
- the landing favours pairs for frame (3 of 4): a frame weighs a domain only 1, under the 2 that lights a favours row;
- the star days Scholar and Red Phoenix (4 units): they score 25, under the 30 a day needs to lead;
- the `even` energy states (12): only charts with no role for an element; rare;
- the decade marker (3): reached only on the birthday of a decade's first year.
