# POSITION.domain_readings

_Prompt file (data). Edit here; the harness reads this file. Born 2026-09-21 from REA_17 v0.3 §3; the source rulings are cited at the bottom of the card. Where this file and a source document disagree, the source wins and this file is corrected._

| | |
|---|---|
| **Field** | `POSITION.domain_readings` |
| **Axis** | POSITION |
| **Header** | the seat panel, one dedicated paragraph per declared domain (a Wealth reading is not a Love reading) · therapist-psychic · second person · 35–60 words each · LOCKED ×70 (~172 paragraphs) |
| **Harness field key** | POSITION.reading+teaser+domain_readings |
| **Status** | LOCKED ×70 (~172 paragraphs) |

## The card

- Construct: the persona's business in that one domain from that gate, ending on counsel. A triggered TG_PATTERN weaves its analysis into the matching domain paragraph at render.
- Exemplar (Growth): "You grow in leaps disguised as stillness: long plateaus of gathering, then a step-change nobody saw building. Do not measure yourself against steady climbers. Your curve is a staircase, and the landings are where the real work happens. Keep faith on the flat stretches."
- Checks: 35–60w, keys equal the declared domains, zero dashes.

## Assembly

PROMPT = `00_MASTER_PROMPT.md` + `01_INPUT_PACK.md` (the axis pack, filled from the station with the target field redacted) + this card + the task line the harness writes for the cell (`ComparativeAnalysis/Prompts/assemble.mjs`). The gate (`validate.mjs`) enforces the checks above plus the register rules in `02_RULES_REGISTER.md`.

## Iteration log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-21 | Born from REA_17 v0.3 | compilation, no new rule |
