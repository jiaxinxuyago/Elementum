# ELEMENT_PAIR.cta_verdict

_Prompt file (data). Edit here; the harness reads this file. Born 2026-09-21 from REA_17 v0.3 §3; the source rulings are cited at the bottom of the card. Where this file and a source document disagree, the source wins and this file is corrected._

| | |
|---|---|
| **Field** | `ELEMENT_PAIR.cta_verdict` |
| **Axis** | ELEMENT_PAIR |
| **Header** | the dot card under the definition line · teaser · second person · ≤30 words, one sentence · LOCKED ×25 |
| **Harness field key** | ELEMENT_PAIR.cta_verdict |
| **Status** | LOCKED ×25 |

## The card

- Construct: one sentence explaining "{Element} is your {Function}": a behavioural truth plus ONE tendency-framed consequence beat (the prediction law). **Pole-neutral** (owner 2026-09-30): the verdict is one per pair and the app renders it on the energy page whichever pole the chart resolves (`buildElementScreen` takes `pair.cta_verdict` before it reads the pole), so it must read true on the catalyst page and the friction page alike. It says what the function IS for this core, never the state it is in: no heavy, thin, too much, too little, running over, running short, and no consequence that only one pole would pay. Under v0.7.1 (owner 2026-10-14) the one sentence carries the tension where it can (the harness notes a verdict without a tension sentence; the read decides), its subject is the reader, it carries no arena word and no turn word (but, yet, however: blocking), no more than two commas, and it is at least eight words, being its own last sentence.
- Exemplar (金_土): "Your mind takes things in slowly and keeps them forever, and your best judgments are the ones you let sit overnight." The exemplar reads true on both of Earth's pages for a Metal core (a slow, keeping mind is the function whether Earth runs thin or heavy), so it passes the pole-neutral rule as it stands. It predates v0.7.1 and carries no tension sentence, which the gate now notes on a verdict (polish rule 15 asks for the exemplar to gain its tension); it stands, with no arena word and no tag, until the owner rules one with the tension in it.
- Checks: ≤30w, one sentence, zero dashes, no capacity opener ("You can", "can make", "can suit you" as the opener only; "can" anywhere after the first clause is untouched: the harness blocks it, owner 2026-09-30, confirmed opener-only 2026-09-30), B1–B2 zone, reads true on either pole (no pole state word: the harness notes, the read decides); the v0.7.1 gate (no arena word, no turn word, no sentence over two commas, at least eight words with the reader as its subject: blocking; the tension note). Sources: REA_16 §2c (owner formula 2026-09-01); REA_04 §9.4; the pole-neutral rule: owner 2026-09-30, `journeyData.js` `buildElementScreen`.
- Reasoning chain: the function noun and the pair's chemistry → the one behavioural truth a reader of this core would recognise about this function (how it takes in, puts out, builds or regulates) → ONE consequence that tends to follow, framed as a tendency (REA_04 §9.4), never a date or a guarantee → one sentence, kitchen-table words.
- Style: the position-teaser register at pair grain: natural spoken syntax, no jargon past the function noun; the B1–B2 zone; no metaphor stacking; the sentence must read alone under the definition line on the dot card. Two candidates are asked for in the handoff skeleton (`candidates: 2`, owner 2026-09-30), each gated, the read picks one.
- Sources: REA_16 §2c cta_verdict row (owner formula 2026-09-01, locked the same day); REA_04 §9.4 (the prediction law); REA_16 §2c THE VOCABULARY ZONE.

## Assembly

PROMPT = `00_MASTER_PROMPT.md` + `01_INPUT_PACK.md` (the axis pack, filled from the station with the target field redacted) + this card + the task line the harness writes for the cell (`ComparativeAnalysis/Prompts/assemble.mjs`). The gate (`validate.mjs`) enforces the checks above plus the register rules in `02_RULES_REGISTER.md`.

## Iteration log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-21 | Born from REA_17 v0.3 | compilation, no new rule |
| 2026-09-23 | Reasoning chain, style and sources added from the registry row | handoff readiness check (no new rule) |
| 2026-09-30 | The verdict never opens on a capacity clause (blocking) | owner 2026-09-30, Q1a of the v0.6 questionnaire (REA_16 §6) |
| 2026-09-30 | Pole-neutral: one verdict per pair, rendered on either pole's page, true on both, no pole state word (C5) | owner 2026-09-30, Q1h of the v0.6 questionnaire (REA_16 §6) |
| 2026-09-30 | Two candidates asked for in the handoff skeleton (`candidates: 2`), each gated, the read picks one | owner 2026-09-30, Q1i of the v0.6 questionnaire (REA_16 §6) |
| 2026-10-14 | v0.7.1: the verdict in the ledger's register (the reader the subject, no arena word, no turn word, eight words at least, the tension noted); the exemplar marked pre-v0.7.1 | owner 2026-10-14, the polish rules (`backlog/2026-10-14_prompt-v071-iterations.md`; REA_16 §6) |
| 2026-10-14 | PENDING TEASER: the verdict no longer opens the function detail page (the definition follows the title, owner 2026-10-14); the 25 lines stay locked in the station as the teaser for the collapsed card before expansion (the chip-expansion step) and as the FUNCTION tile's tease meanwhile; no re-cut until that step rules the teaser's shape | owner 2026-10-14 (REA_16 §6; `backlog/2026-10-14_verdict-pending-teaser.md`) |
| 2026-10-14 | THE TEASER LINE: the verdict returns to the function detail page as the line under the three chips, read before the reader taps a keyword into its sheet (the chip expansion, one keyword at a time, one angle per chip); the 25 lines serve as written, no re-cut, the construct and caps stand; the pending-teaser item closed | owner 2026-10-14 (REA_16 §6; `backlog/2026-10-14_chip-expansion-keyword-sheet.md`) |
| 2026-10-14 | OFF THE FUNCTION PAGE: the teaser line under the chips removed the same hour on the owner's artifact ruling ("Do not put the verdict here"); the verdict's only surface is the FUNCTION tile's tease on the element page; the pending-teaser item re-opened, the 25 lines as written | owner 2026-10-14 (REA_16 §6) |
