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

- Construct: `face` names the band state in the element's arena ("The edge, never sheathed"); `presence` is being that state, dignified even on the Underfueled band. Two candidates are asked for on `presence` in the handoff skeleton (`candidates: 2`, owner 2026-09-30), each gated, the read picks one; `face` stays single.
- Reasoning chain: the band as a physical state of the material → a noun phrase for it → one or two sentences on living as that state, the cost implied not moralised.
- Style: situational register; the Underfueled band is never a deficit portrait ("A blade that waits is not a blade that dulled"). The presence line is a descriptive field under v0.7.1 (owner 2026-10-14): the reader its subject, no arena word in it (the face keeps the arena, the presence does not), no turn word, no tag close, its last sentence at least eight words with the reader as subject; the face stays the band state named in the element's arena.
- Checks: face ≤8w, presence ≤30w, zero dashes, cross-stem 4-gram uniqueness; on the presence the v0.7.1 gate (no arena word, no turn word, no sentence over two commas, the last sentence at least eight words with the reader as its subject: blocking; the tension note, D9).
- Exemplar (庚 Overfueled): face "The edge, never sheathed" (the face names the band state in the arena and keeps it). The presence exemplar ("The cut is always available and mostly used. Clarity this constant is a climate, and the people near you dress for it.") was removed 2026-10-14 (rule 8 of the v0.7.1 item): an arena word and a reaction close with other people as the subject. No presence exemplar until the owner rules one under v0.7.1.
- Sources: REA_03 §3; REA_16 §2c (BAND-C corpus, 2026-08-14).

## Assembly

PROMPT = `00_MASTER_PROMPT.md` + `01_INPUT_PACK.md` (the axis pack, filled from the station with the target field redacted) + this card + the task line the harness writes for the cell (`ComparativeAnalysis/Prompts/assemble.mjs`). The gate (`validate.mjs`) enforces the checks above plus the register rules in `02_RULES_REGISTER.md`.

## Iteration log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-21 | Born from REA_17 v0.3 | compilation, no new rule |
| 2026-09-30 | Two candidates asked for in the handoff skeleton (`candidates: 2`), each gated, the read picks one | owner 2026-09-30, Q1i of the v0.6 questionnaire (REA_16 §6) |
| 2026-10-14 | v0.7.1: the presence line in the ledger's register (the reader the subject, no arena word, no tag close); the presence exemplar removed | owner 2026-10-14, the seven iterations and the polish rules (`backlog/2026-10-14_prompt-v071-iterations.md`; REA_16 §6) |
