# REA_05 — Generation Architecture — template storage & engine piping

> **Formerly DES_03** (moved to the Reading library 2026-07-23) **and before that DOC4** (2026-07-09). Historical citations of "DES_03" or "DOC4" refer to this file (registry: Operations/README.md).

> **REWRITTEN 2026-07-29 (owner-directed, v2.0):** the old body (the April-2026 three-pass generation pipelines, `batchGenerate` orchestration, blocks-v2 selection) documented the legacy corpus model and is superseded — old body in git. This doc now owns one job: **how each data template is stored, reviewed, and piped into code and the engine.**

**Position in the library:** REA_01 explains the compound system · REA_02 finalizes the concepts · REA_03 dictates the templates and data fields · REA_04 sources the reasoning/depth · **REA_05 (this) says where the data lives and how it flows** · REA_06 orders the teaching.

---

## §1 · The storage model (three stations, one direction)

```
Reading/Database/templates/json/*.json   AUTHORING SOURCE OF TRUTH (one file per template)
        │  (generated twins: templates/md/*.md — review-grade, never hand-edited)
        ▼   owner review → lock
Elementum_App/src/content/*           RUNTIME TRUTH (js modules the app ships)
        │
        ▼
engine/journey/consumers              buildJourneyModel · Self-Report · Consultant payload
```

1. **`Reading/Database/templates/json/`** — one **JSON file per data template** (per REA_03 variable): the authoring and review station. Seeded from the live corpus for LIVE/INTERIM variables; stubbed (keys enumerated, values null) for PLANNED ones. Each JSON carries a header block (`$template`, class, axis, status, budget, source_of_truth) so a file is self-describing.
2. **Markdown twins** (`templates/md/*.md`) — GENERATED from the JSONs by `tools/build-template-twins.mjs`; clean tables for manual content review. **Never hand-edit a twin** — mark it up / request changes, the JSON updates, twins regenerate. Banner on every twin says so.
3. **`Elementum_App/src/content/`** — the runtime modules (cleanup rule #1: live code lives in the app). Locked template data is **transcribed deliberately** from the JSON station into the content modules — there is **no automatic Reading→app pipeline** (standing owner rule; an auto-pipeline would be a separate owner-scoped project). The JSON station is where content is *decided*; `src/content` is where it *ships*.

**Sync law:** on any locked change, the order is JSON → twin (regen) → `src/content` transcription → app. A divergence between a LIVE variable's JSON and its `src/content` value is a defect (auditable mechanically — the seeder doubles as a diff tool).

## §2 · File anatomy

```jsonc
// Reading/Database/templates/json/archetype_name.json
{
  "$template": "archetype_name",
  "class": "A",                      // A archetype-varying · T template pattern
  "axis": "STEM",                    // per REA_03 §1
  "status": "LIVE",                  // LIVE · INTERIM · PLANNED
  "budget": "≤3w",
  "source_of_truth": "Elementum_App/src/content/archetypeSource.js",
  "values": { "甲": "The Oak", "乙": "The Vine", "…": "…" }
}
```

- **A-class files:** `values` keyed by the axis key — 汉字 stem (×10), `element_god` (×50, e.g. `火_七杀`), position (×7). K2 register structures nest inside each key per the REA_03 §4 spec (`face`, `persona`, `chips`, `rulingDomain`, `registers.dominant/absent`).
- **T-class files:** `pattern` (the slot-filled sentence) + `clauses` maps (role/condition-keyed variants).
- **V-class is NOT stored here** — vocabulary constants live in REA_02 (doc law) and `src/content`/`journeyData` (code); templates only *reference* them by slot name (REA_03 rule #3).
- Keys are canonical code keys (汉字 stems, `element_god` compounds) so transcription is mechanical.

## §3 · The tools

| Tool | Job |
|---|---|
| `Elementum_App/tools/export-reading-templates.mjs` | Seeds/refreshes the JSON station (`templates/json/`) **from the live corpus** for LIVE/INTERIM variables (initial seed 2026-07-29); with `--check` it becomes the **drift audit** — reports JSON↔`src/content` divergence instead of overwriting. |
| `Elementum_App/tools/build-template-twins.mjs` | Regenerates every `templates/*.md` twin from its JSON. Run after any JSON edit. |
| `Elementum_App/tools/build-field-map-xlsx.mjs` | Regenerates the REA_03 xlsx twin from the schema markdown (the variable-registry view). |

## §4 · Consumption map (who reads what at runtime)

| Consumer | Reads | Notes |
|---|---|---|
| `buildJourneyModel` (`journeyData.js`) | `STEM_CARD_DATA` (identity) · vocabulary tables (V) · `FACE_CARD`/`ENERGY_TILE` | reveal → catalogue journey; piping verified total 2026-07-27 |
| Faces/deep pages (PLANNED) | `ENERGY_CARD_DATA[element_god]` (the K2 target module — created from the K2 template JSONs when authored) | registers selected by derived presence frames |
| Self-Report composer | the same content modules | one schema, all consumers (REA_03 rule #11) |
| Consultant payload | the same content modules, composed on-device | vocabulary law enforced in payload + charter |
| Engine | none of the authored content — it only *selects* (REA_03 §6 derived signatures) | the engine owns every number |

## §5 · Future stations (declared, not built)

- **Compiled per-stem profiles** — "the whole 庚 book": a generated review view resolving every variable for one stem (K1 values + its 10 shared K2 keys + patterns). The persistent single-user content template; generator written when the K2 station has content.
- **`archetypeSchema.js` rewrite** — the code schema conforms to REA_03 (types, caps, varyBy); afterwards a code-mirror doc can be regenerated as a tool artifact.
- **Validation gate** — budget/axis checks of every JSON against REA_03 (word caps, key completeness, register shape) as a pre-transcription step; extends the seeder.

## Document Metadata

| | |
|---|---|
| **Document** | REA_05 — Generation Architecture (template storage & engine piping) |
| **Version** | 2.0 · 2026-07-29 (full rewrite; legacy pipelines body in git) |
| **Status** | LIVING — tracks the data station + piping as they grow with the K2 pass |
| **Companions** | REA_03 (what the templates are) · REA_02 (the terms they use) · REA_04 (the reasoning behind them) · DEV_01/DEV_02 (engine + code architecture) |
