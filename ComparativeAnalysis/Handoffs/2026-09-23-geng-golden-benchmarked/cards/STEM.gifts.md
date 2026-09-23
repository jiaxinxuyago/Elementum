# STEM.gifts

_Prompt file (data). Edit here; the harness reads this file. Born 2026-09-21 from REA_17 v0.3 §3; the source rulings are cited at the bottom of the card. Where this file and a source document disagree, the source wins and this file is corrected._

| | |
|---|---|
| **Field** | `STEM.gifts` |
| **Axis** | STEM |
| **Header** | **`STEM.gifts` and `STEM.shadows`** · Day Master page P4, one chip per open door · portrait (desc) and chip (phrase) · second person in desc · phrase ≤3w (or an admitted four-word idiom), desc 1–4 sentences · LIVE ×7 + ×7 per stem |
| **Harness field key** | STEM.gifts+shadows |
| **Status** | LIVE ×7 + ×7 per stem |

## The card

- Construct: seven gifts and seven shadows, `{phrase, dim, door, face, echo_of, desc}`. One echo face per door on each side; Body and Mind carry a second item (gift: the wide face from `carry.wide`; shadow: the excess face from `carry.excess`, or `carry_yin.excess` for the yin stem). **The Body door is the self pair, which has no `carry.wide`: its wide gift is cut from the self pair's `definition_catalyst` ("plenty of the self") and its `echo_of` names that field.** The count is always 7 + 7. `face` and `echo_of` are selection metadata, never rendered.
- Reasoning chain (THE POOL DERIVATION PROMPT): (1) read the named source field (`definition_catalyst` / `definition_friction` / `carry.wide` / `carry.excess`) and name its mechanism in one clause; (2) say the same mechanism in the stem's material, as something recognisable in a week of the reader's life, same mechanism, different noun, never a neighbouring mechanism and never the turn's imagery in place of the definition's; (3) cut the desc, one concrete image, the source's key noun or action still recognisable inside it; (4) cut the phrase LAST from the desc under the phrase law v6; (5) set the dim, the life-facet angle, ≤4 words, unique in the pool, never a restatement of the phrase.
- Style: a gift is a capability of the material that holds on any chart of that stem (tempo and channel lifted out: "Stays decided", not "Quick to conclude"); a shadow is the function OVERGROWN, never underuse (underuse belongs to the carry card's SEEK rows); the desc may show the picture, the phrase stays plain.
- Checks: pool shape 7+7 with Body and Mind doubled; every `echo_of` resolves; phrase ≤3w or admitted idiom; phrase ≠ dim; phrase unique across the ten pools; dim unique in the pool; zero dashes; the item read beside its source shows the same mechanism.
- Exemplar (庚 Mind gift, echo of 金_土.function.definition_catalyst): **First-handshake read** · dim "first impressions" · "Ten minutes in, you know who they are. Years of quiet watching went in first, and it comes back as judgment. Months later everyone else catches up to the handshake." Shadow (庚 Mind excess, from 金_土.carry.excess): **Overprepared** · "Fed past use, the edge stalls. Everything goes in and nothing comes out, and the brooding gets mistaken for depth."
- Sources: REA_16 §7 (the full prompt), §3 (pool laws), §2c; REA_02 §5h; REA_03 §3, §5 (face row).

## Assembly

PROMPT = `00_MASTER_PROMPT.md` + `01_INPUT_PACK.md` (the axis pack, filled from the station with the target field redacted) + this card + the task line the harness writes for the cell (`ComparativeAnalysis/Prompts/assemble.mjs`). The gate (`validate.mjs`) enforces the checks above plus the register rules in `02_RULES_REGISTER.md`.

## Iteration log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-21 | Born from REA_17 v0.3 | compilation, no new rule |
| 2026-09-21 | desc 1–4 sentences; dim ≤4 words | owner rulings Q2, Q3 (REA_16 §6, §7) |
