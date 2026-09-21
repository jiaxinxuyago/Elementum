# ELEMENT_PAIR.mechanism_yin

_Prompt file (data). Edit here; the harness reads this file. Born 2026-09-21 from REA_17 v0.3 §3; the source rulings are cited at the bottom of the card. Where this file and a source document disagree, the source wins and this file is corrected._

| | |
|---|---|
| **Field** | `ELEMENT_PAIR.mechanism_yin` |
| **Axis** | ELEMENT_PAIR |
| **Header** | (`base`, `catalyst_turn`, `friction_turn`) · energy page for the yin stem of the core · same registers and budgets as `mechanism` · LIVE, 19 cells, sparse |
| **Harness field key** | ELEMENT_PAIR.mechanism.turn+carry with a yin stem (--stem 辛 or a yin chart) |
| **Status** | LIVE, 19 cells, sparse |

## The card

- Construct: the same story and the same directive with the yin sibling's noun where the shared line names the yang archetype (stone and wheel for the Jewel, wall and tendril for the Vine, the close flame for the Candle, soil for the Field, mist and cloud for the Rain). Only the fields whose noun does not fit are overridden; everything else inherits.
- Checks: same as `mechanism`; the yin line's echo of the shared line is a lawful match.
- Exemplar (金_土 friction_turn for 辛): "Run heavy, the setting closes over the stone: so much preparation that the jewel never leaves the box. Comfort begins to bury what it formed. Take it out and wear it somewhere real."
- Sources: REA_16 §2c (2026-09-17 ruling 3); REA_02 §5h.

## Assembly

PROMPT = `00_MASTER_PROMPT.md` + `01_INPUT_PACK.md` (the axis pack, filled from the station with the target field redacted) + this card + the task line the harness writes for the cell (`ComparativeAnalysis/Prompts/assemble.mjs`). The gate (`validate.mjs`) enforces the checks above plus the register rules in `02_RULES_REGISTER.md`.

## Iteration log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-21 | Born from REA_17 v0.3 | compilation, no new rule |
