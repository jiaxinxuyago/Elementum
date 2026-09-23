# ComparativeAnalysis/Prompts — the harness (prompt delivery, chart reader, gate)

Builds blind generation prompts from the prompt database (`Reading/Database/Prompts/`, one file per field card) and the station (`Reading/Database/templates/by_axis/json/`), gates model outputs before any read, files the rewrites, and renders the comparison. Run from the repo root or from this folder with `node`. Nothing here writes to the station or the app. Start with `DISPATCH.md` for a round by hand.

| File | Job |
|---|---|
| `lib.mjs` | station and pack loaders · the input packs per axis (REA_17 §2, target field redacted) · the field registry (28 entries, one per §3 card family) · the gate (mechanical · within-cell four-gram · cross-stem four-gram · reader zone) |
| `chart.mjs` | THE CHART READER: one calculation model, every chart variable. Runs a chart through the app's own engine and selection code and reads back the pillars with hidden stems and ten gods, strength, composition, band, presences, volumes, roles, the excess override, faces, ledger rows, doors, chips shown, seats, god-pair patterns, luck pillars and current flow. `node chart.mjs [golden|ding-weak|xin-earth]`, `--json` for the full dump, `--birth 1995-04-29T18 --location Beijing` for any birth |
| `assemble.mjs` | `node assemble.mjs <FIELD> <CELL> [--pole … --state … --row … --band … --chart … --energy … --seat … --stem …]` writes `out/<id>.prompt.md` and `out/<id>.meta.json`. `--fields` lists the field keys, `--plan` prints the charts, `--run runs/<manifest>.json` assembles a batch, `--reach <chart>` writes the manifest of every variable a chart reaches (`runs/golden-all.json`: 133 rows), `--legacy` rebuilds T1–T6. A card exemplar that is the cell under test is withheld |
| `validate.mjs` | `node validate.mjs <id> <output.json> [--json] [--quiet]`: THE GATE. Exit 1 on any blocking finding; a failing candidate is not compared |
| `compare.mjs` | files every model output under `Reading/Database/Rewrites/<model>/<chart>/<id>.json` with its original and gate result, and writes the side-by-side sheet per variable (`--id` for one) |
| `selftest.mjs` | every original in a manifest is a candidate and runs through its own gate (`node selftest.mjs runs/<manifest>.json`) |
| `handoff.mjs` | THE HANDOFF BUILDER: `node handoff.mjs --chart golden --pass blind\|benchmarked` writes `../Handoffs/<date>-<stem>-<chart>-<pass>/` (dispatch prompt, README, the prompt database, the cards in scope, the chart, one skeleton per page with spec + facts + empty values, the originals as `benchmark/`) and zips it (the blind zip excludes `benchmark/`) |
| `validate-template.mjs` | THE TEMPLATE GATE: a filled skeleton (or a folder of them) checked field by field: both ends of the word range, the mechanical law, the cut law, the within-page four-gram, the cross-stem four-gram, the reader zone |
| `file-rewrites.mjs` | THE REWRITES STATION FILER: a model's filled skeletons → `Reading/Database/Rewrites/<model>/by_axis/json/<AXIS>/<cell>.<model>.json` (the station's shape, sparse, `$original` and `$gate_findings` beside every value), `by_variable/json/<var>.<model>.json`, readable twins; the model's `_generated_by` line names it |
| `adopt.mjs` | THE ADOPTION STEP: `node adopt.mjs <model> <AXIS>/<cell> <field path>` lands one ruled field in the final template station with `$provenance`, then the REA_05 pipeline (`--dry` to preview) |
| `render-template.mjs` | the Day Master page and the energy pages rendered from filled skeletons, original then candidate per field with `--against <benchmark dir>` |
| `read-sheet.mjs` | the blind sheet: gate every candidate, shuffle the survivors with the original, letter them, write the key beside the sheet |
| `report.mjs` | the dated run report: one row per candidate (field path · cell · state · chart · model · gate · read notes · status) plus the summary by model, from a scores file the reader fills |
| `runs/` | run manifests: `2026-09-21-comparison.json` (31 rows, three charts), `golden-all.json` (133), `ding-weak-all.json` (70), `xin-earth-all.json` (67) |
| `out/` | prompts, meta, originals, model outputs (`<id>.<model>.json`), gate results |
| `data/` | the frequency list behind the reader-zone check (see its README for the license) |

## Model outputs

Save each model's answer as `out/<id>.<model>.json` (the raw JSON value the prompt asked for; a stray code fence is stripped). The model never sees a file: paste `out/<id>.prompt.md` as the whole message, or send it through an API with a JSON output mode where one exists.

## The gate, in order

1. **Shape**: keys, counts, doors, faces, `echo_of` resolution, openers, budgets, the carry cut, the domain keys, the sibling clash, per field.
2. **Mechanical** (REA_17 §1 audit list, mirrors `Elementum_App/tools/voice-audit.mjs`): signs, Chinese characters, the banned list (AI cluster, courtroom tier, report-card register, mystical register, hollow affirmations per REA_04 PART 8 §8.9), hedges, the rationed word, BaZi labels, negative parallelism, person and opener rules, budgets.
3. **Within-cell four-gram** (REA_16 §7, the repetition law): the candidate against the cell's other fields, stop-word-only runs ignored, the lawful cuts exempt (carry ↔ turn, yin ↔ shared, the definitions' templated opener, a pool item against its `echo_of` source). Blocking on the ELEMENT_PAIR cards that carry `rep-block`; an inventory elsewhere. A ledger door against the pair definition or advice on the same page is inventoried, not blocked (the law as ruled scopes to the pair cell).
4. **Cross-stem four-gram** (REA_16 §2c `swap-gram`): manifesto, inscription, yourNature_desc, the band portraits and self_card must not share a four-word run with another stem's field. Blocking.
5. **Reader zone** (REA_16 §2c THE VOCABULARY ZONE, B1–B2 on the function page): every word is looked up in the ruled function-page corpus (definitions, advice, chips, doors, dot-card lines, k2_functional: 5,870 word forms) and in a public frequency list (rank ≤ 3,000 in zone, 3,001–6,000 edge, beyond that outside). Chips block on any outside word. Prose reports the outside words and blocks past 14 per 100 words, the ceiling the ruled corpus itself reaches under leave-one-out calibration (`zoneCalibrate()`: max 13.64, p95 6.9, median 2.2 at head 06e38605). The read still judges word choice; the check only names the words.

Non-blocking channels: `note` (a heuristic the read decides, e.g. whether sentence 1 of a band portrait receives the sign's image) and `read flags` (a scope or angle question, e.g. a portrait that reads as a decline from an earlier self).

## Self-test

At head 06e38605, six of the 31 shipping originals in `runs/2026-09-21-comparison.json` fail the pack's own gate: `POSITION/piancai_day_branch.reading` carries "genuinely" (REA_04 §8.9); two 丁 dims run to four words and two 辛 descs to four sentences (REA_16 §7); `水_七杀.k2_domain_readings.Command` and `木_偏财.k2_domain_readings.Father` carry a hedge (REA_16 §3); `金_木.carry_yin.catalyst` is not cut from `mechanism_yin.catalyst_turn` (REA_02 §5h). On the full golden set (`runs/golden-all.json`) ten fail, seven of them on the hedge words the corpus uses freely. All are listed with verbatim text in `../Evaluations/llm-ab-test-2026-09-21/02_HARNESS_SELF_TEST_2026-09-21.md` for the owner's ruling; the station is untouched.
