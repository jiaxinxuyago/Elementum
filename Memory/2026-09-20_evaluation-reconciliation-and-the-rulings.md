# Handoff — 2026-09-20 · Session "The evaluation pack reconciled: ten rulings, four batches"

Written from a cloud session (claude.ai/code). Supersedes the 2026-09-15 handoff for workstream
state; standing laws there still hold unless amended below. Record of every ruling and landing:
`Feedbacks/Deliverables/elementum-evaluation-2026-09-17/CLAUDE_EVALUATION_RESPONSE.md` §6, §6a, §6b, §6c
and `RULINGS_PROOF_2026-09-20.md` (before/after on the golden chart 1995-04-29 18:00 Beijing, 庚).

## What changed in the reading (all on main, all gated)

- **One band per surface (B11):** `resolveArchetype` / `resolveDayMasterReading` take `ec.band`; the
  nature paragraph, chips, carry card and pages agree. 424 of 33,604 charts had read two bands.
- **No chip through a closed door (D2):** `selectPoolByDoor` — doors omitted = Balanced baseline 3+3,
  `[]` = nothing; a lone open door shows both its faces (Body/Mind carry two for this); an empty
  side hides, header included. `poolDoors` returns `undefined` sides for Balanced. Pool note retired.
  2,737 charts lost a false Body shadow; 11 lost three baseline shadows.
- **The plentiful line (D4, amended twice):** `carry.wide` reads plainly — eight openers rotate, no core
  repeats one ("Wood is already here in plenty, the material the knife is for."); each has a
  remedy (`carry.wide.remedy` ×27, Batch 1); the energy page speaks it for a wanted abundant/dominant
  energy (`stateTurn`, B10). The word **door never reaches a reader**; it is internal vocabulary.
- **火_木 blazes (D1):** 木多火炽 read literally (REA_04 PART 2); definition, heavy turn, carry friction /
  excess / spared re-cut; advice in the owner's own words; 丙 *Chases every idea* replaces *Chokes on
  fuel*; the other three Mind labels kept, descriptions moved.
- **水_火 heavy turn (B3)** agrees with its definition. **辛/乙 portraits (D7)** lose two absolutes.
  **Ten deflines (D8)** comma-joined, dashless (REA_02 §2, GOD station, `tgNames.js`).
- **Batch 3 (ten consequential claims)** ruled row by row: guarantees, a private prediction, a
  medication schedule, a betting pool, "espalier" gone; originals kept where sharper. **The Sage's
  third domain word Mother → Nurture** (`GOD/zhengyin.json`, five `k2_domain_readings` keys, `k2.js`).
- **All five Sage Nurture readings** now share the Water shape (where care came early / where it ran dry, one directive); "either way" is gone.
- **Batch 4 (four echo-chain chips):** 己 *Too agreeable* → *Stuck in your ways* (four-word idiom
  admitted by name in the audit's list); 丁 *Rekindles people* lands on what lasts; two private-knowledge
  claims gone.
- **Batch 2 (63 chip re-cuts) WITHDRAWN:** the owner kept the originals four out of four. The tight
  cut of the definition's own nouns is the better line.
- Unchanged by ruling: D3 (core exempt from the 40% flip, no doc edit), D5 (金_土 "bury" turn and
  REA_04 line 393), D6 (REA_02 keeps "deepens without redirecting" for The Sage; REA_04 annotated).

## New laws (REA_16 §7, REA_02 §5h)

- **Phrase law v6:** a chip names the SYMPTOM the person recognises, never a prescription or a bare
  image. ≤3 words, or a fixed idiom of four named in the audit.
- **The repetition law (narrowed the same day):** no phrase repeats across the fields of one cell on
  one page (definition · turn · advice · remedy). Carry ↔ turn, yin ↔ yang and the definitions'
  templated opening are lawful. A chip echoing its definition across pages is the derivation law
  working, NOT repetition (`voice-audit.mjs` within-cell four-word check; zero findings since 2026-09-21, ready to turn
  blocking with `rep-block` on the ELEMENT_PAIR rows).
- **The advice field keeps its authored voice everywhere** (owner: the older version wins): short
  orders, one concrete detail, no imagery the clause has not set. Reading copy and previews carry
  no signs.
- Method that worked: every proposal rendered before/after on the golden chart or the nearest chart
  that trips it, then ruled by multiple choice one item at a time; batches of content shown as a
  file, then paired Before/After questions. Previews show copy exactly as the card does.

## Tools

- `tools/qa-selection-fixtures.mjs` — eight-chart gate (band parity, door eligibility, lone-door
  faces, core exempt, page turn = wide line, no signs). Run with the other gates.
- `tools/voice-audit.mjs` — within-cell repetition check; `IDIOMS_4W` list.
- Scratchpad transcriber (`transcribe.py`, cloud scratchpad only) now carries `advise_*` and
  `wide.remedy`; ELEMENT_GOD text is transcribed into `k2.js` by verbatim replacement.

## Open

- Owner's read of the 140 items under phrase law v6 (parked since 2026-09-16).
- Cloudflare tidy-ups; design-HTML sync debt (unchanged from the 2026-09-15 handoff).
