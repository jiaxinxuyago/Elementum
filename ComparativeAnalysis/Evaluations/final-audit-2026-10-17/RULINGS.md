# Final audit: the owner's rulings on the Majors (2026-10-17)

Source: the three-lists page (https://claude.ai/artifact/SVcnEvG6DzSLVkqAoveyT9) and the M2 worked example (https://claude.ai/artifact/2XnZgwsgYig3uo4jjnv6H3).

| Major | Ruling | What it means for the rebuild |
|---|---|---|
| M1 · catalyst closes | No instructions | A catalyst passage closes on the gift at work, its price stated flat, or the want under it. No imperative and no "If/When you X, you Y" fix. THE ADVICE alone prescribes. |
| M2 · shared definitions | B for definitions, A for advice | Each definition is a shared opening (pair cell, the function and the element) plus a persona tail (persona cell, the pole's state for that persona). The tail shares no main act with its own persona's keywords. Advice and remedy stay shared; each is true of all six keywords of both personas on that pole, with a neutral diagnosis line. |
| M2 · balanced faces | No blend tail; one shared definition | When both personas of an energy are balanced (the 2+2 page), the definition does not name the split ("one side of you … the other"). It is one shared text in A's way, true of the reader as one person. The owner's words: "treat the blend as an individual." |
| M4 · blend keywords | Keep 2+2, filter clashes | The 2+2 page keeps two keywords from each persona. The picker skips a keyword that opposes the other persona's (the antonym pairs in cross.md X-03). |
| M3 · one sentence shape | **Rejected after the samples** (owner 2026-10-17): "the fix suggest a regression. We tried to not use the same sentence structure X, so Y, your fix regressed to all of those. The originals has better readability than having all as X, so Y." The middle sentences stay as they are. New text (M1 closes, M2 tails) may not use the "X, so Y" frame; both gates fail it. Narrowed the same day: "For M3, only focus on fixing the misuse of 'ahead of'." Each "ahead of" used as a disguised "rather than" gets a one-phrase swap in place (before, over, above, more than; instead of or rather than only where nothing else fits). Nothing else in the sentence changes. It runs after M1 and M2 land. **Approved after the new samples** (owner 2026-10-17): "M3 approved, apply the fix across all content." | (superseded) Both poles, middle only | Among a pole's three passages, at most one turns its middle sentence on a comparison ("rather than / instead of / ahead of / more than"). "Ahead of" only means "before". The friction closes ruled on 2026-10-16 stay. A page check fails three or more comparisons on one page. |
| M6 · advice acts | Act budget per core | Across the ten advice and remedy texts one core can show, each act family (sleep, eat, sit, read, a deadline, ask an elder, hand to someone above) appears at most once. Acts draw on the element (Wood starts, Fire shows, Earth keeps, Metal cuts, Water takes in). Lost rest is the cost in at most one passage per page. |
| M5 · persona drift | **Rejected after the samples**, then **new, narrower samples** offered (the Sage's inclination kept; only the copied Alchemist sentence, the corrector, the unlinked two-sided page, the General/Artisan drift and the shared keywords), awaiting the owner. Original rejection (owner 2026-10-17): "The original reads more like The Sage, as the sage is the one who looks for shelters, or having shelters come to them. Shelter others is an outer behavior but the inclination is more like it also attracts shelters. The original wins. M5 not applies." | The Sage's inclination is to seek or attract shelter; sheltering others is its outer behaviour. No Sage keyword is rebuilt. (Superseded: "The Sage shelters".) |

## The bug check (qa/app-bug-check.md)

| Item | Ruling |
|---|---|
| D1, D3 to D7 | Fixed and live (commit c0af218). |
| D2 · EDGE doors land where the tapped domain has no reading | Honest landing now: the sheet title names a seat only if that seat rules the word, and the landing opens THE DOMAINS without promising the word otherwise. The full fix comes with DOM-1. |
| S5 · a Balanced chart is told "As a catalyst" | Add to the rebuild: a balanced tail per pair cell, so a balanced reader is never told "as a catalyst". |
| S1 · "$9.99/mo" on the free domain sheet | Leave until DOM-1, which reworks The Domains' tier and price. |
| S2, S3, S4 | Not ruled; kept on the backlog (browser back leaves the reading; read-elemental back loses the tab bar; two "Current plan" labels on Advisor). |

## The Minor list (owner, 2026-10-17)

Status before the polish round: 166 Minor findings. 88 were already resolved by the M1, M2, M3 and M6 rewrites. 69 are still open in the live text. 9 are system-level, and 5 of those are covered by the M5 renames. Samples: https://claude.ai/artifact/RB9VgL8Wdv19nh4tJiiMmB

| Item | Ruling |
|---|---|
| A3 · restatement (17 open) | **Not approved; the originals stay.** "A3 original wins, the table example reads less better than the chair, not approved, keep the original." It applies to all A3 findings ("All A3 skipped"). |
| A1, A2, D4 and the other kinds | **Approved** (owner 2026-10-17): "Approve all other fixes besides the four system-level items." Re-counted on the live text: 55 open findings (A3-only excluded; on mixed findings only the non-A3 part is fixed) plus the "sooner than" sweep, 64 fields. The six approved samples that are not A3 are used word for word. |
| Remedy "Let it …" verb | **Approved and applied.** Each core now uses each verb once, the verb fits its element, and Wood and Metal no longer "pour" (7 lines). |
| Mind bar "Intuition" → "Insight" | Not approved. Stays as is. |
| Virtuoso "Mind" domain → "Growth" | Not approved. Stays as is (can go to DOM-1). |

## Round 2 (owner, 2026-10-17)

Results: https://claude.ai/artifact/Sg5Q7Jzy5qP1XErcHSgtDR. 16 MAJOR (five themes), 104 MINOR, 87 TWEAK (applied). Mean B 4.10 (round 1: 3.65).

| Item | Ruling |
|---|---|
| R2-1 · Balanced pages read as catalyst pages | **Approved.** A balanced advice per pair cell (`function.advise_balanced`): a keep-the-mix diagnosis and acts drawn on the element. Balanced definitions are reworded where they deny a persona's keywords. |
| R2-2 · the 2+2 picker | **Approved.** The picker searches every combination and always shows two keywords per persona. New opposed pairs are added to the clash list. |
| R2-3 · the chart's quantity as a cause | **Approved.** Each such sentence names the reader's need instead. |
| R2-4 · a partner, child or boss assumed | **Approved.** Neutral wording, changing only those words. |
| R2-5 · the same act under another name | **Approved.** Acts are counted by meaning, per reader set (weak, strong, Balanced) of one core. |
| Gift closes that end on other people | **Allowed** ("Allow them"). A catalyst gift close may show its effect on others. |

### A finding while landing round 2 (2026-10-17)
In the app, a catalyst page and a Balanced page end on **THE EDGE**, and THE ADVICE is not shown there (JourneyStage.jsx: the advice box renders only where there is no edge; all 50 cells carry an edge since the THE EDGE ruling of 2026-10-15). So `advise_catalyst` and `advise_balanced` are not read on any page today. THE REMEDY on friction pages is read. The audit page builder showed THE ADVICE on catalyst pages in rounds 1 and 2; it now mirrors the app. Work done on the catalyst and balanced advice (M6, R2-1, R2-5) is stored and checked but not visible until the owner decides whether catalyst and Balanced pages should show it.
**Owner ruling:** "EDGE only (as now)". Catalyst and Balanced pages keep ending on THE EDGE. `advise_catalyst` and `advise_balanced` stay stored, not rendered. Round 3 audits the pages exactly as the app shows them.

## Round 3 (2026-10-17)
1 MAJOR (F3-01, friction pages that show only losses: the owner's 2026-10-16 want-or-permission close extended to the three shown passages; 26 closes rewritten), 44 MINOR and 66 TWEAK applied, five clash pairs added. Mean B 4.29.

## Round 4 (2026-10-17): the stop condition is met
**0 MAJOR in all six reports.** 32 MINOR, 69 TWEAK, mean B 4.31, one page below 4.
- The 67 TWEAK fields were applied (commit 0e54f43).
- The MINOR pass was done by two sealed writers and gated. 34 fields landed (19a6b69), plus one clash pair: Never asks × Spends shared money (W4-02).
- Two keywords were renamed: 金_食神 "Takes it easy" → "Looks effortless" (X4-04), and 木_七杀 "Impossible to please" → "Never satisfied" (X4-05).
- W4-01: the auditor proposed "Running high". The "Running over," opener was kept, as in the ten sister cells, and only the "no outlet" contradiction was fixed, in all three Water tails.

Left for the owner, never changed without leave:
- the six friction Horizon+Steward blends that have no clean 2+2 and show 2+1;
- the shared head sentences F3-02 (木_火 "whatever you do shows") and F3-03 (水_火 "in time");
- 土_正财 friction cost_others still assumes a household ("the people you live with"; R2-4 wording, not flagged this round).
