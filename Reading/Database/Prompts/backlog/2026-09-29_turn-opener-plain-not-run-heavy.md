# Backlog · the state line's opener: plain and prescriptive, not "Run heavy," (owner feedback, 2026-09-29, at Q30 of the blind read)

**Status: OWNER RULING RECORDED, prompt change pending.** Cards affected: `fields/ELEMENT_PAIR/ELEMENT_PAIR.mechanism.catalyst_turn.md` (both turns), `fields/ELEMENT_PAIR/ELEMENT_PAIR.carry.md` (the cut law follows the opener), `fields/POSITION/POSITION.turn_catalyst.md` (the seat turns use the same formula), the register row C3, REA_16 §2c (the mechanism row) and the harness opener checks.

## The takeaway, as the owner put it

Every state line opens "Run heavy," or "Run thin," (the seat turns too). That is too upfront: a reader who does not yet know what "running heavy" means meets the phrase cold. The line should give its prescriptive conclusion in plain terms, in a syntax such as "Having too much Wood would …" or "When Earth is running heavy, …". If all the variables are to share one syntax, it can be a different phrase than the current one. Open the field up to more variations.

## What is at stake

- The opener is a locked formula (REA_16 §2c mechanism row; the card: "Run thin, …" / "Run heavy, …"), used in all 50 pair turns, 19 yin overrides, and 140 seat turns (the 2026-09-21 ruling Q8 re-cut the one seat that skipped it). The carry law cuts the carry clause from the turn after the opener, so the opener change and the cut law move together.
- The term the opener leans on (heavy / thin) is the volume vocabulary of the manual; the page shows the definition line for Overfueled / Underfueled elsewhere, but the turn is the first place the reader meets "running heavy" as a phrase.

## Three ways to open it up (for the owner's ruling)

1. **A plain unified opener, templated, no re-authoring.** The app renders the turn with a slot lead-in from the element and the state ("When Earth runs heavy, …" / "When Water runs thin, …"), and the authored turn drops its "Run heavy," so the cut law is unchanged (the clause is still the turn's first clause). One TEMPLATED sentence pattern (REA_03 §5) covers all 209 turns. Cheapest, and it keeps one syntax everywhere.
2. **A small set of plain openers per state, authored per cell.** Like the eight wide openers: "When {Element} runs heavy," · "Too much {Element} and …" · "With {Element} this strong, …" · "Having too much {Element} would …"; the friction and catalyst sets differ; no core repeats one across its energies. More voice, more work (re-cut 50 + 19 + 140 lines), and the harness checks against the set instead of one string.
3. **Free opener, plain-terms law only.** The card says: open on a plain statement of the state in the reader's terms (the element and the volume named in ordinary words), the image, the cost, one directive; no fixed phrase. The most variation, the hardest to keep consistent across 25 cells and ten stems.

The manual's own definition lines (REA_02 §5c: "More fuel comes in than your core burns…") already speak the state in plain terms, so whichever option is chosen, the turn's opener can echo that register rather than the word "heavy".

## Action items

- [ ] Owner rules option 1, 2 or 3 (or a mix: 1 for the seats, 2 for the pair cells).
- [ ] Update the two turn cards, the carry card's cut law wording, the POSITION.turn card, register C3, the REA_16 §2c mechanism row note and §6; update the opener checks in `lib.mjs`, `validate-template.mjs` and `handoff.mjs`.
- [ ] If option 2 or 3: re-cut the turns in the next round with the new opener law, gated and ruled row by row; if option 1: a TEMPLATED row in REA_03 §5 and the render change in `buildElementScreen`.
