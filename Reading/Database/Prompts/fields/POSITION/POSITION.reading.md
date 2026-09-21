# POSITION.reading

_Prompt file (data). Edit here; the harness reads this file. Born 2026-09-21 from REA_17 v0.3 §3; the source rulings are cited at the bottom of the card. Where this file and a source document disagree, the source wins and this file is corrected._

| | |
|---|---|
| **Field** | `POSITION.reading` |
| **Axis** | POSITION |
| **Header** | the seat panel's summary · therapist-psychic (v2) · second person · 80–115 words · LOCKED ×70 |
| **Harness field key** | POSITION.reading+teaser+domain_readings |
| **Status** | LOCKED ×70 |

## The card

- Construct (the §9.5 ladder): sentence one DECLARES the two or three ruled domains from the eight ("This position rules Mind, Growth, and Career, and it rules them from the deepest seat your chart has.") → the shown or hidden face (stem or branch) → the era claim (when this seat runs the show) → the relations claim (through whom) → the counsel line.
- Reasoning chain: gate ground × slot kind × persona nature → which domains it rules → how the persona behaves in that arena → when in life it concentrates → through whom it arrives → what to do about it.
- Style: declarative, warm, unhedged; every predictive beat is tendency-framed; no dates; no classical quotes; the persona name once.
- Checks: 80–115w, declaration sentence first, zero dashes.
- Exemplar (偏印在月支): "This position rules Mind, Growth, and Career, and it rules them from the deepest seat your chart has. The Alchemist lives inside your Month Gate, hidden in the engine of your prime: your working life runs on private study, sideways insight, and an appetite for what most people overlook. Colleagues see the results and rarely the method…"
- Sources: REA_02 §5e; REA_04 PART 9; REA_16 §2c.

## Assembly

PROMPT = `00_MASTER_PROMPT.md` + `01_INPUT_PACK.md` (the axis pack, filled from the station with the target field redacted) + this card + the task line the harness writes for the cell (`ComparativeAnalysis/Prompts/assemble.mjs`). The gate (`validate.mjs`) enforces the checks above plus the register rules in `02_RULES_REGISTER.md`.

## Iteration log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-21 | Born from REA_17 v0.3 | compilation, no new rule |
