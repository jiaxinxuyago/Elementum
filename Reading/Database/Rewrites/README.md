# Reading/Database/Rewrites — model rewrites, per model, never the station

One folder per language model (`GPT-5/`, `Claude-Opus/`, …), one sub-folder per chart (`golden/`, `ding-weak/`, `xin-earth/`), one JSON per rewritten variable:

```
Rewrites/<model>/<chart>/<id>.json   { id, field, cards, cell, state, chart, model, original, candidate, trace, gate, filedAt }
```

Filed by `ComparativeAnalysis/Prompts/compare.mjs` from the harness outputs after the gate has run; the gate result travels with the rewrite. The shipping original sits beside every candidate so any variable can be pulled up side by side (`compare.mjs runs/<manifest>.json --id <id>` writes the sheet to `ComparativeAnalysis/Evaluations/<run>/side-by-side/`).

Rules:
- Nothing here is truth. The station (`templates/by_axis/json/`) changes only through the owner's row-by-row ruling and the REA_05 §1 pipeline.
- A rewrite is never edited by hand; regenerate it or file a new one. The ruling is recorded in the run report under `ComparativeAnalysis/Evaluations/`.
- The first experiment is the golden chart (1995-04-29 18:00 Beijing, 庚 The Blade), one variable at a time.
