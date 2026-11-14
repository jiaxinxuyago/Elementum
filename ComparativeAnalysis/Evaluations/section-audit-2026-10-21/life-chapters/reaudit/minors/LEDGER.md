# Re-audit MINORs: what was adopted, what waits (2026-11-14)

The re-audit filed 65 MINORs (`../findings.json`). Under PM_04 rule 3 (D2) the session adopts the ones that are independent of the open MAJOR rows N1–N6, when the gates pass. The others wait for their N row, since its ruling decides how they are written.

Gates for the adopted set: `gate.mjs --all` PASS (484 units), `voice-audit` clean, `export-reading-templates --check` in sync, `qa/model.mjs` 480 charts with 0 errors and 0 drafts, `qa-selection-fixtures`, `qa-depth-golden`, `qa-almanac-golden`. The texts are in `out-minors.json` with their finding ids. The 29 replaced texts are in the station's `__ore.retired`.

## Adopted (29 findings)

| Finding(s) | Key | What changed |
|---|---|---|
| XR-08, G3-025 | body · chapter_domain.Health.release | No longer judges the reader by how easy others find them |
| XR-09 | mind · chapter.day.release.now | No claim about the partner; a plain carry |
| G1-009 | action · chapter_domain.Career.release | No repeat of the chapter line |
| G1-010 | order · chapter_manual.grow | Manual and Growth line no longer make one claim twice |
| G1-012, G3-011 | expression · chapter.day.release.now | The partner is no longer the victim (BIZ_04) |
| G2-009 | action · chapter.day.grow.coming | Agrees with its Family line (a shared project) |
| G2-010 | mind · chapter_domain.Career.grow | Fits a reader of any age |
| G2-014 | expression · chapter_manual.release | Says how the energy works instead of repeating the advice |
| G2-015 | body · decade.grow.late.lived.a | Three units no longer say one thing |
| G2-016 | expression · decade.release.late.lived.a | No repeat of the decade below |
| G2-018 | expression · decade.release.early.a | No repeat of the chapter's "heard you out" |
| G2-020 | body · chapter_domain.Career.grow | "Table" no longer repeats on the page |
| G3-009 | order · chapter.hour.grow.now | A grow chapter no longer closes on a price |
| G3-012 | body · chapter.day.release.now | No judgement of the partner, no promise |
| G3-013 | expression · chapter_domain.Love.grow | No guarantee of a partner's response |
| G3-014 | action · chapter_manual.grow | No guaranteed outcome |
| G3-015 | action · chapter.day.grow.now | The reader is the subject of the close |
| G3-016 | order · chapter.day.grow.lived | "Name", "home" and "ran" no longer repeat |
| G3-021 | expression · decade.grow.early.b | No repeat of "worth hearing"; fits 10 to 19 |
| G3-022 | expression · chapter_domain.Family.grow | No repeat of "make the house feel" |
| XR-07, G1-006, G3-006 | body · decade.grow.early.b | "Classmates", not "toys" (the M9 start-age rule was already in the resolver) |
| XR-15 | order · favours.decade.Love.grow | A way of being with a partner, not a kind of relationship (M7) |
| G1-015, G3-019 | ground.drains/feeds/resists/presses/matches release lines (7) | No more Order's burden words ("weight", "pressure", "strain") under every function (D2) |
| G1-016 | `chaptersResolve.js` | A chapter keeps at least two domain lines when the repeats are dropped |

Already done before this round, so no change (5): XR-06 and G3-005 (presses.grow, the 49 tweaks), G2-021 (decade labels read by age), G2-022 and the resolver half of XR-07, G1-006 and G3-006 (M9 start age 10 or under), G3-026 (order year.even.b). G1-005 asks to drop "more than your chart can use", which is the wording AM3 prescribes, so it is kept (1). 29 + 5 + 1 + 30 = 65.

## Waiting for an N row (30 findings)

| Row | Findings |
|---|---|
| N1 (reader as subject of the year and landing lines) | XR-13, XR-14, G1-011, G2-011, G3-023 |
| N2 (joints) | G2-019, G3-024 |
| N3 (scarcity words in grow lines) | G1-007, G2-004, G2-005, G2-006, G3-007, G3-008, G3-010 |
| N4 (one carrier family per function) | XR-10, XR-11, XR-12, XR-16, G1-008, G1-013, G2-007, G2-008, G2-017, G3-020 |
| N5 (page length and repeated frames) | G1-014, G2-013, G3-017, G3-018, G3-027 |
| N6 (heavy year closes) | G2-012 |

G3-017 also changes the ruled domain openings ("In Career, this chapter favours"), so it waits on the owner whatever N5 says.
