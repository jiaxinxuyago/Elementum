# ComparativeAnalysis — cross-model generation and comparative evaluation

Renamed from `Feedbacks/` on 2026-09-21 (owner). Two folders:

- **`Prompts/`** — the delivery: the chart reader (`chart.mjs`, one calculation model, every chart variable), the assembler (`assemble.mjs`, any field card for any cell and state), the gate (`validate.mjs`), the run manifests (`runs/`), the assembled prompts and model outputs (`out/`), the rewrites filer and side-by-side builder (`compare.mjs`), the blind read sheet (`read-sheet.mjs`), the run report (`report.mjs`), and `DISPATCH.md` (how to run a round by hand or by API). `reference/` keeps the 2026-09-17 evaluation brief and the "how a reading is built" guide as historical context for external evaluators. The prompt text itself lives in `Reading/Database/Prompts/` (prompts as data); these tools read it from there.
- **`Evaluations/`** — the reports (renamed from `Deliverables/`): analysis, comparative scoring, rulings. Reference files to compare results, never tools or truth. `elementum-evaluation-2026-09-17/` is the reconciled evaluation pack with its cited snapshot `elementum-review-pack/`; `llm-ab-test-2026-09-21/` holds the documentation audit, the prompt replication test and the harness self-test; each comparison run adds a dated file and a `side-by-side/` folder.

Rewrites produced by the runs are filed per model under `Reading/Database/Rewrites/<model>/`, never in the station.
