# POSITION.teaser

_Prompt file (data). Edit here; the harness reads this file. Born 2026-09-21 from REA_17 v0.3 §3; the source rulings are cited at the bottom of the card. Where this file and a source document disagree, the source wins and this file is corrected._

| | |
|---|---|
| **Field** | `POSITION.teaser` |
| **Axis** | POSITION |
| **Header** | the dot card · therapist-psychic · second person · ≤30 words, one line · LOCKED ×70 |
| **Harness field key** | POSITION.reading+teaser+domain_readings |
| **Status** | LOCKED ×70 |

## The card

- Construct: [a personality truth: persona nature × gate arena, in "you" language] + [ONE predictive beat: era, relations or domain of the gate, tendency-framed].
- Style: natural spoken syntax, a therapist or psychic to a friend; no jargon past the persona name the row already shows.
- Exemplar: "Your mind works in private, on things most people find strange, and that is exactly where your career luck lives. The niche will pay what the mainstream never will."
- Sources: REA_04 §9.4; REA_16 §2c.

## Assembly

PROMPT = `00_MASTER_PROMPT.md` + `01_INPUT_PACK.md` (the axis pack, filled from the station with the target field redacted) + this card + the task line the harness writes for the cell (`ComparativeAnalysis/Prompts/assemble.mjs`). The gate (`validate.mjs`) enforces the checks above plus the register rules in `02_RULES_REGISTER.md`.

## Iteration log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-21 | Born from REA_17 v0.3 | compilation, no new rule |
