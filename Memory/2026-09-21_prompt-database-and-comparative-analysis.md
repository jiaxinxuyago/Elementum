# Handoff — 2026-09-21 · Session "LLM comparison: the prompt database, the harness, the folder reorg"

Written from a cloud session (claude.ai/code). Supersedes the 2026-09-20 handoff for workstream state; standing laws there still hold. Dedicated session for the cross-model reading-content comparison.

## Where things live now (owner's folder ruling, 2026-09-21)

- **`Reading/Database/Prompts/`** — the prompt database: prompts are data, iterated like code. `00_MASTER_PROMPT.md`, `01_INPUT_PACK.md`, `02_RULES_REGISTER.md` (every rule numbered with source and enforcement; six IMPLIED → EXPLICIT rows from the self-test), `03_COMPARISON_PROTOCOL.md`, `fields/<AXIS>/<field>.md` (36 card files). REA_17 (v0.4) is the overview that points here and carries no prompt text.
- **`Reading/Database/Rewrites/<model>/<chart>/<id>.json`** — model rewrites beside their original and gate result; never the station.
- **`ComparativeAnalysis/`** (renamed from `Feedbacks/`): `Prompts/` = the harness (`chart.mjs` the chart reader: one engine, every variable; `assemble.mjs`; `validate.mjs` the gate; `compare.mjs`; `read-sheet.mjs`; `report.mjs`; `selftest.mjs`; `DISPATCH.md`; `runs/`; `out/`; `reference/` = the 2026-09-17 brief). `Evaluations/` (renamed from `Deliverables/`) = reports and rulings.
- Retired: `Reading/Database/templates/review-pack/`, `Elementum_App/tools/build-review-pack.mjs` (→ `archive/`), the review-pack zip.

## State of the comparison

- Prompts assembled: `runs/2026-09-21-comparison.json` (31 rows, three charts) and `runs/golden-all.json` (133 rows, every variable the golden chart reaches; `--reach` regenerates). No model has generated anything yet.
- Owner's rulings on the run: ChatGPT models first; the original always in the line-up; a Claude model only if worth reading; the owner does the blind read first; the golden chart (1995-04-29 18:00 Beijing, 庚) is the first experiment, one variable at a time, side-by-side per variable (`compare.mjs`). Dispatch by hand per `ComparativeAnalysis/Prompts/DISPATCH.md`; an API key route is described there for the 133-row round.
- Self-test: the shipping originals through the pack's own gate. Six of 31 fail on the three-chart run; ten of 133 on the golden set (seven on hedge words). Listed verbatim in `ComparativeAnalysis/Evaluations/llm-ab-test-2026-09-21/02_HARNESS_SELF_TEST_2026-09-21.md`. The owner will rule them one by one (paired questions); the ruling on rules-register A10 (the hedge list: mechanical everywhere, or narrowed to reflex hedges) decides most of them.

## Laws added or made explicit this session

- REA_17 §0 rule 8: exemplars are corpus, not scaffolds (swap-gram). The self pairs' definition opener ("and running thin / over"). The gate's four layers (shape · mechanical · within-cell four-gram · cross-stem four-gram · reader zone). The reader-zone check: ruled corpus ∪ frequency list, prose ceiling 14 per 100 (leave-one-out calibration), chips block on any outside word.
- Standing rule restated (rules register H3): the reasoning chain is rooted in the classics REA_04 cites, read through the ten equations and the five functions; no other school enters a card.

## 2026-09-23 · the handoff (same session)

- Owner rulings for the zero-background handoff: blind pass first then a benchmarked pass · scope = only what the golden chart shows on the Day Master page and the five energy pages (54 fields, 6 skeleton pages) · craft laws soft, everything else hard (the freedom clause in `00_MASTER_PROMPT.md`; B2, B4, B5 guidance in the register) · ChatGPT with the zip attached · minimum and maximum both hard (`06_CAPS_BY_PAGE.md`) · compiled files only, with repo paths to the four source books and the station · JSON only from the model, the harness renders.
- New prompt files: `04_READING_SYSTEM_PRIMER.md`, `05_CLASSICAL_SOURCES.md`, `06_CAPS_BY_PAGE.md`; three thin cards expanded (cta_verdict, adj_chips, k2_functional).
- New tools: `handoff.mjs` (builds `ComparativeAnalysis/Handoffs/<date>-geng-golden-<pass>/` + zip), `validate-template.mjs` (the template gate; the originals pass 6/6), `render-template.mjs` (page-by-page read, original then candidate).
- Fixed: `voice-audit.mjs` registry parse skipped hyphenated registers (POSITION ×9, TG_PATTERN ×3 were never enforced); 62 rows now enforced, corpus clean.
- Next: the owner runs the blind zip in ChatGPT, saves the six filled skeletons under `ComparativeAnalysis/Prompts/out/handoff/2026-09-23-geng-golden-blind/<model>/`; then `validate-template.mjs`, `render-template.mjs --against ../Handoffs/2026-09-23-geng-golden-blind/benchmark`, the owner's read, then the benchmarked pass.

## Open

- The owner's rulings on the self-test rows; then the ChatGPT round on the golden core 11 (`G01…G11` of the comparison manifest) and the read.
- Cloudflare tidy-ups; design-HTML sync debt (unchanged).
