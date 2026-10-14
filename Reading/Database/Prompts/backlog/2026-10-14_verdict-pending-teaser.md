# Backlog · the verdict as a pending teaser (owner 2026-10-14)

**Status: CLOSED 2026-10-14 in the chip-expansion item (`2026-10-14_chip-expansion-keyword-sheet.md`): the verdict renders as the teaser line under the chips on the function detail page, the line the reader reads before tapping a keyword into its sheet; the 25 lines serve as written, no re-cut. The FUNCTION tile's tease on the element page stays.**

## The owner's words

> Regarding the verdict you just removed, backlog those in the database file as pending teasers we gonna use before tapping into the collapsed or expanded pages.

## What is recorded

- The 25 `ELEMENT_PAIR.cta_verdict` lines stay in the station (`Reading/Database/templates/by_axis/json/ELEMENT_PAIR/<cell>.json`, `candidates.cta_verdict`), locked, untouched by this item. Five of them (the Metal core) were adopted from batch 1 on 2026-10-14; the other twenty are the station's own.
- Their surface changed on 2026-10-14: the verdict no longer opens the function detail page above the chips (commit 1d3eb0d; the definition follows the title there). It still renders as the FUNCTION tile's tease on the element page.
- Their next surface is the teaser on the collapsed card before the reader taps into the expanded page, to be designed in the chip-expansion step (step 3). Until that step rules the teaser's shape (one sentence, the tension, pole-neutral, 8 to 30 words as now, or re-cut), no verdict is re-cut and the card's construct stands.
- The registry row (REA_16 §2c), the card (`ELEMENT_PAIR.cta_verdict.md`) and the caps row carry the same PENDING TEASER note.

## Where it closed

In the chip-expansion item, 2026-10-14. The owner ruled the expansion as a pop-up sheet, one keyword at a time, one angle per chip as today; the verdict is the teaser line under the chips (`el-fnteaser` in `JourneyStage.jsx`), read before the tap. The current verdicts serve as written; the card's construct and caps stand.
