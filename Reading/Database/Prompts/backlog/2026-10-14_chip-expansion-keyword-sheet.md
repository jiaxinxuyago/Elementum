# Backlog · the chip expansion: one keyword at a time, in a sheet (owner 2026-10-14)

**Status: RULED and BUILT 2026-10-14 (step 3 of the owner's order for The Function section: 1 definition construct, 2 metrics derivation, 3 chip expansion, 4 icons).**

## The owner's words

> Collapsible chips. (from the three-point feedback on The Function section, 2026-10-14)

> Let's proceed to the verdict teasers and chip expansions, what is your approach and how you want to start it?

> Throw those 3 calls to me one by one.

> We only have one angle per chip as for right now correct? It should stay as what it looks like now.

## The three calls, ruled

| Call | Choices offered | Ruling |
|---|---|---|
| 1. Where the keyword opens | inline expansion under the chip row · a pop-up sheet over the page (compared first on the owner's ask: "Compare inline vs pop up CTAs and find the best") | **Pop-up sheet.** The passage opens in the keyword sheet, the glossary's chrome (`wordpop` / `wp-sheet`), the chip as its pill, the eyebrow "{Element} is your {Function}", the passage as the body, closed by the scrim or the close mark. The page under it keeps its length. |
| 2. How many open at once | all three keywords expanded together · one keyword, swapped by tapping another chip | **One keyword, swap by tapping a chip.** A tap opens that chip's passage; tapping another chip replaces it. |
| 3. How many angles a chip shows | the three angles of the row together · one angle per chip, the one its position assigns (as today) | **One angle per chip, as today.** The rotation drive → cost_self → cost_others by position stays (REA_16 §2c, fixture contract §5); nothing in the data changes. |

## What was built

- `Elementum_App/src/components/journey/JourneyStage.jsx`: the ledger paragraphs leave the function detail page. The chips are buttons (`el-fnchipbtn`); a tap opens the keyword sheet at root level (`kwOpen`), one keyword at a time. A chip with no passage (a cell without a ledger row) stays a plain chip, disabled.
- The verdict returns to the page as the teaser line under the chips (`el-fnteaser`): the line that invites the tap. This closes `2026-10-14_verdict-pending-teaser.md`: the 25 verdicts serve as written, no re-cut; the FUNCTION tile's tease on the element page stays.
- `journey.css`: the button chip, its focus ring, the open state, the teaser line.
- No station field changes, so no adoption, no transcription and no new fixture contract: the passage a chip opens is the row's passage under the §5 rotation, already under contract. Build green; `qa-selection-fixtures.mjs` green.

## The page's order after this step

Title ("Earth is your Mind.") → the definition (v0.7.3 construct) → the three metric bars → the three chips, each a button → the verdict as the teaser line → THE REMEDY (friction) or THE ADVICE (catalyst).

## Open after this step

- Step 4, the icons (a design item, outside the prompt database).
- The sheet's chrome is the glossary's; if the owner wants the keyword sheet distinct (a title row with the angle name, a next-chip control), that is a design ruling, not a prompt one.
