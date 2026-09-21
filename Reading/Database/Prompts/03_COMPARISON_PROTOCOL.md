# 03 · THE COMPARISON PROTOCOL (like-for-like across models)

_Prompt file (data). How a comparison run is fixed, gated, read and recorded. Born 2026-09-21 from REA_17 v0.3 §4 and the 2026-09-17 evaluation pack's acceptance protocol. The tools live in `ComparativeAnalysis/Prompts/`; the reports in `ComparativeAnalysis/Evaluations/`; the rewrites in `Reading/Database/Rewrites/<model>/`._

---

1. **Fix the fields.** Pick the fields to test from §3 (the P4 and energy-page fields carry most of a reading: `STEM_BAND.yourNature_desc`, `STEM.gifts/shadows` items, `ELEMENT_PAIR.function.*`, `ELEMENT_PAIR.carry.*`, `ELEMENT_GOD.fn_reading` doors, `ELEMENT_GOD.k2_domain_readings`, `POSITION.reading`).
2. **Fix the cells and states.** Use the golden chart (庚 Overfueled) and two contrast charts from the selection fixtures (weak 丁 with one Order door; 辛 Overfueled with heavy Earth) so each model writes the same cells under the same valence and volume.
3. **Fix the inputs.** Hand every model the §1 master prompt, the §2 input pack for the axis (filled from the station files, not from memory), and the §3 card. Same text, same order.
4. **Gate first.** Run every candidate through the mechanical checks (the §1 list; `tools/voice-audit.mjs` rules for that field's registry row), the within-cell four-gram check against the cell's other fields (REA_16 §7; blocking on the ELEMENT_PAIR cards that carry rep-block, an inventory elsewhere), the cross-stem four-gram check on the swap-gram fields (REA_16 §2c), and the word-level reader-zone check on the function-page fields (REA_16 §2c THE VOCABULARY ZONE; the ruled corpus and a public frequency list, ceiling calibrated to the corpus). `ComparativeAnalysis/Evaluations/llm-ab-test-2026-09-21/harness/validate.mjs` runs all of them. The shipping original runs through the same gate; its failures are findings for the owner, never exemptions. Failures are not compared.
5. **Read second.** Score the survivors and the shipping original together, blind, on the four questions of the 2026-09-17 evaluation pack: meaning (same feature, cost or feeling as the source mechanism), reasoning (traceable to the correct axis and state), reading (understood on first read, sayable about oneself), scope (a tendency or example, not a claimed event, a private thought or a guaranteed outcome). Then the three readers.
6. **Record per candidate:** field path, cell, state, model, original, candidate, gate result, read result, status (retain original · adopt · revise · unresolved). Nothing lands in the station from a test run without the owner's row-by-row ruling and the usual pipeline (REA_05 §1).

7. **Rewrites are stored per model, never in the station.** `compare.mjs` files every gated model output under `Reading/Database/Rewrites/<model>/<chart>/<id>.json` beside its original and gate result, and renders the side-by-side sheet per variable. The station changes only through the owner's ruling and the REA_05 §1 pipeline.

---

## Iteration log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-21 | Born from REA_17 v0.3 §4; step 7 added for the rewrites folder | owner 2026-09-21 (folder reorg) |
