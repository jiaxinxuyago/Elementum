# STEM_BAND.self_card

_Prompt file (data). Edit here; the harness reads this file. Born 2026-09-21 from REA_17 v0.3 §3; the source rulings are cited at the bottom of the card. Where this file and a source document disagree, the source wins and this file is corrected._

| | |
|---|---|
| **Field** | `STEM_BAND.self_card` |
| **Axis** | STEM_BAND |
| **Header** | the core element's screen only · portrait · face impersonal, presence second person allowed · face ≤8w · presence ≤30w · LOCKED ×30 |
| **Harness field key** | STEM_BAND.yourNature_desc+self_card |
| **Status** | LOCKED ×30 |

## The card

- Construct: `face` names the band state in the element's arena ("The edge, never sheathed"); `presence` is being that state, dignified even on the Underfueled band.
- Reasoning chain: the band as a physical state of the material → a noun phrase for it → one or two sentences on living as that state, the cost implied not moralised.
- Style: situational register; the Underfueled band is never a deficit portrait ("A blade that waits is not a blade that dulled").
- Checks: face ≤8w, presence ≤30w, zero dashes, cross-stem 4-gram uniqueness.
- Exemplar (庚 Overfueled): face "The edge, never sheathed" · presence "The cut is always available and mostly used. Clarity this constant is a climate, and the people near you dress for it."
- Sources: REA_03 §3; REA_16 §2c (BAND-C corpus, 2026-08-14).

## Assembly

PROMPT = `00_MASTER_PROMPT.md` + `01_INPUT_PACK.md` (the axis pack, filled from the station with the target field redacted) + this card + the task line the harness writes for the cell (`ComparativeAnalysis/Prompts/assemble.mjs`). The gate (`validate.mjs`) enforces the checks above plus the register rules in `02_RULES_REGISTER.md`.

## Iteration log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-21 | Born from REA_17 v0.3 | compilation, no new rule |
