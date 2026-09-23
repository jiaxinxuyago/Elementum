# Reading/Database/Rewrites — one rewrite station per model, never the truth

Every language model that generates reading content gets its own station here, in the same two views as the final template station (`Reading/Database/templates/`), so any cell or any variable can be compared side by side and the author is never in doubt:

```
Rewrites/<model>/by_axis/json/<AXIS>/<cell>.<model>.json     the station shape, sparse: only the fields this model wrote;
                                                              candidates = the rewrite · $original = the shipping text ·
                                                              $gate_findings per field · $generated_by, $handoff, $filed in the header
Rewrites/<model>/by_axis/md/<AXIS>/<cell>.<model>.md          the readable twin (original | model | gate)
Rewrites/<model>/by_variable/json/<var>.<model>.json          the pivot: one variable across the cells this model wrote
Rewrites/<model>/README.md                                    how and when it was filed
```

Filed by `ComparativeAnalysis/Prompts/file-rewrites.mjs` from a model's filled skeletons after the template gate has run; the model's own `_generated_by` line names it. The older flat form (`<model>/<chart>/<id>.json` from `compare.mjs`) is kept for the per-prompt comparison runs.

Rules:
- Nothing here is truth. The final template station is `Reading/Database/templates/` (by_axis the truth, by_variable generated from it). A field moves there only by the owner's ruling, through `adopt.mjs`, which records provenance (`$provenance` in the station file: field, model, date, ruling, the replaced text) and hands over to the REA_05 §1 pipeline.
- A rewrite is never edited by hand; regenerate it or file a new one. Rulings are recorded in the run report under `ComparativeAnalysis/Evaluations/` and in REA_16 §6.
- The first experiment is the golden chart (1995-04-29 18:00 Beijing, 庚 The Blade), the Day Master page and the five energy pages, one variable at a time.
