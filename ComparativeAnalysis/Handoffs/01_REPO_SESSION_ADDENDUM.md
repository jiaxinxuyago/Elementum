# Addendum for a repository-connected session (paste after the dispatch prompt)

You are running inside the Elementum repository. The handoff package is at `ComparativeAnalysis/Handoffs/<package>/` (no archive to unzip): read its `00_DISPATCH_PROMPT.md` and follow it; the `prompts/`, `cards/`, `chart/` and `skeletons/` folders beside it are the files it names.

## What you may read

Anything in the repository. The prompt database (`Reading/Database/Prompts/`), the four source books (`Reading/Documents/REA_01`, `REA_02`, `REA_04`, `REA_16`), the current reading content (`Reading/Database/templates/by_axis/json/`), the app code. Where a source book and the prompt database disagree, the prompt database governs for this run.

## What you may write

Only the six filled skeletons, to `ComparativeAnalysis/Prompts/out/handoff/<package>/<your model name>/<same file names>.json`, each with `"_generated_by"` at the top. Nothing else: not `Reading/Database/templates/`, not `Elementum_App/src/content/`, not the prompt database, not the handoff folder itself. Commit on a branch named `handoff/<package>/<your model name>`, never on `main`.

## What you may run

- `node ComparativeAnalysis/Prompts/validate-template.mjs <your output folder>`: the gate. Run it on your own work and fix every blocking finding before you finish; a field that fails the gate is thrown out unread.
- `node ComparativeAnalysis/Prompts/chart.mjs golden`: the chart, if you want it re-read from the engine.
- `node ComparativeAnalysis/Prompts/render-template.mjs <your output folder> --against ComparativeAnalysis/Handoffs/<package>/benchmark`: your pages beside the current text, for your own read.

## What you must never run or touch

`wrangler`, any deploy, `Elementum_App/tools/backup-customer-data.mjs`, `export-reading-templates.mjs --harvest`, `build-template-twins.mjs`, `adopt.mjs`, and no edit to any file outside your output folder. The station and the app change only by the owner's ruling.

## Facts

The chart's numbers, roles, volumes, states, faces and ledger rows come from the engine (`chart/golden.json`) and are not yours to re-derive, however much of the code you read. If you find what looks like an error in the engine or the station, write it in a note beside your output folder (`NOTES.md`) and carry on with the facts as given.
