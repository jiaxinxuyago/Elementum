# archive

Retired code and documents kept for provenance (recoverable from git either way).

- `legacy-monolith/` — the pre-split engine (`Elementum_Engine.jsx`), see its README.
- `build-review-pack.mjs` (retired 2026-09-21) — the cross-LLM review pack builder (owner 2026-09-17) that consolidated the station into four Markdown files for external evaluators. Retired with its output folder `Reading/Database/templates/review-pack/` when the comparison moved to per-field blind prompts assembled by `ComparativeAnalysis/Prompts/assemble.mjs` from the prompt database `Reading/Database/Prompts/`. The 2026-09-17 evaluation's cited snapshot survives at `ComparativeAnalysis/Evaluations/elementum-review-pack/`.
