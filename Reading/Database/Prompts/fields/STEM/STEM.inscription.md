# STEM.inscription

_Prompt file (data). Edit here; the harness reads this file. Born 2026-09-21 from REA_17 v0.3 §3; the source rulings are cited at the bottom of the card. Where this file and a source document disagree, the source wins and this file is corrected._

| | |
|---|---|
| **Field** | `STEM.inscription` |
| **Axis** | STEM |
| **Header** | not on a live surface (Day Master claim 1, surfaces when `dm_claims` ships) · carved · second person within the first three words · ≤17 words, ≤85 characters · LOCKED ×10 |
| **Harness field key** | STEM.inscription |
| **Status** | · not on a live surface (Day Master claim 1, surfaces when `dm_claims` ships) |

## The card

- Construct: two beats. Beat 1 names the MECHANISM, not the trait ("You say what others soften", never "You are honest"). Beat 2 names the COST at one notch above the reader's present intensity, private, specific, from the stem's own cost dimension.
- Reasoning chain: Angle Map cost dimension → the moment it is paid → the mechanism that causes it → cut to two beats joined by a comma or period.
- Style: descriptive of a way of being, never instruction, prediction or doom; never the unwitnessed-giving angle except for 丙, 己, 庚, each differently.
- Checks: ≤17w, ≤85c, "you" inside three words, zero dashes, cross-stem 4-gram uniqueness.
- Exemplar: "You say what others soften, then quietly pay for being the one who did."
- Sources: REA_16 §3, §5; REA_03 §3.

## Assembly

PROMPT = `00_MASTER_PROMPT.md` + `01_INPUT_PACK.md` (the axis pack, filled from the station with the target field redacted) + this card + the task line the harness writes for the cell (`ComparativeAnalysis/Prompts/assemble.mjs`). The gate (`validate.mjs`) enforces the checks above plus the register rules in `02_RULES_REGISTER.md`.

## Iteration log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-21 | Born from REA_17 v0.3 | compilation, no new rule |
