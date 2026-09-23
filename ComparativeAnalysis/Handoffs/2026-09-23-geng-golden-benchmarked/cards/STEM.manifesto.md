# STEM.manifesto

_Prompt file (data). Edit here; the harness reads this file. Born 2026-09-21 from REA_17 v0.3 §3; the source rulings are cited at the bottom of the card. Where this file and a source document disagree, the source wins and this file is corrected._

| | |
|---|---|
| **Field** | `STEM.manifesto` |
| **Axis** | STEM |
| **Header** | reveal plate A3, share card, journey J3 · carved · L1 impersonal, L2 second person · ≤14 words split " · " · LOCKED ×10 |
| **Harness field key** | STEM.manifesto |
| **Status** | LOCKED ×10 |

## The card

- Construct: a couplet. L1 is a noun-led hierarchy claim of 2 to 4 words: something the world puts second, put first ("Precision before intention"). L2 is the identity formula "You are the [Element] that …", the stem's spine verb carried as the claim ("You are the Metal that cuts things clean."). The ceremonial repetition of the formula across all ten is deliberate.
- Reasoning chain: spine verb → the one thing this material does that the others do not → L1 names what it ranks first, L2 names the material doing it.
- Style: no instruction, no moral virtue, no absolutes (never, always, everything), no punctuation beyond commas and periods; L1 never names the element or the reader.
- Checks: ≤14w, split marker present, zero dashes, L1 unique across the ten stems. L2's identity formula ("You are the [Element] that …") is shared by all ten on purpose (REA_16 §3), so the cross-stem four-gram check does not run on the manifesto (the REA_16 §2c row carries no swap-gram).
- Exemplar: "Precision before intention · You are the Metal that cuts things clean."
- Sources: REA_16 §3 (manifesto), REA_03 §3, REA_02 §2.

## Assembly

PROMPT = `00_MASTER_PROMPT.md` + `01_INPUT_PACK.md` (the axis pack, filled from the station with the target field redacted) + this card + the task line the harness writes for the cell (`ComparativeAnalysis/Prompts/assemble.mjs`). The gate (`validate.mjs`) enforces the checks above plus the register rules in `02_RULES_REGISTER.md`.

## Iteration log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-21 | Born from REA_17 v0.3 | compilation, no new rule |
| 2026-09-21 | Checks corrected: the card had claimed cross-stem 4-gram uniqueness, which the identity formula contradicts and the §2c row does not carry; L1 uniqueness stated instead | REA_16 §3 (the ceremonial repetition is deliberate); §2c manifesto row |
