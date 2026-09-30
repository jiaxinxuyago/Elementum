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

- Construct: one sentence explaining "{Element} is your {Function}": a behavioural truth plus ONE tendency-framed consequence beat (the prediction law). **Pole-neutral** (owner 2026-09-30): the verdict is one per pair and the app renders it on the energy page whichever pole the chart resolves (`buildElementScreen` takes `pair.cta_verdict` before it reads the pole), so it must read true on the catalyst page and the friction page alike. It says what the function IS for this core, never the state it is in: no heavy, thin, too much, too little, running over, running short, and no consequence that only one pole would pay.
- Exemplar (金_土): "Your mind takes things in slowly and keeps them forever, and your best judgments are the ones you let sit overnight." The exemplar reads true on both of Earth's pages for a Metal core (a slow, keeping mind is the function whether Earth runs thin or heavy), so it passes the pole-neutral rule as it stands.
- Checks: ≤30w, one sentence, zero dashes, no capacity opener ("You can", "can make", "can suit you" as the opener only; "can" anywhere after the first clause is untouched: the harness blocks it, owner 2026-09-30, confirmed opener-only 2026-09-30), B1–B2 zone, reads true on either pole (no pole state word: the harness notes, the read decides). Sources: REA_16 §2c (owner formula 2026-09-01); REA_04 §9.4; the pole-neutral rule: owner 2026-09-30, `journeyData.js` `buildElementScreen`.
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
