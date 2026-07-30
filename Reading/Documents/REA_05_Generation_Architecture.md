# REA_05 — Generation Architecture — template storage & engine piping

> **Formerly DES_03** (moved to the Reading library 2026-07-23) **and before that DOC4** (2026-07-09). Historical citations of "DES_03" or "DOC4" refer to this file (registry: Operations/README.md).

> **REWRITTEN 2026-07-29 (owner-directed, v2.0):** the old body (the April-2026 three-pass generation pipelines, `batchGenerate` orchestration, blocks-v2 selection) documented the legacy corpus model and is superseded — old body in git. This doc now owns one job: **how each data template is stored, reviewed, and piped into code and the engine.**

**Position in the library:** REA_01 explains the compound system · REA_02 finalizes the concepts · REA_03 dictates the templates and data fields · REA_04 sources the reasoning/depth · **REA_05 (this) says where the data lives and how it flows** · REA_06 orders the teaching.

---

## §1 · The storage model (three stations, one direction)

```
Reading/Database/templates/json/<AXIS>/  AUTHORING SOURCE OF TRUTH (one folder per axis,
                                         one template per ARCHETYPE of that axis — REA_01 taxonomy)
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
// Reading/Database/templates/json/STEM/geng.json
{
  "$archetype": "geng",
  "axis": "STEM",                      // per the REA_01 normative taxonomy
  "key": "庚",
  "canonical_name": "The Blade",
  "construct": "TBD — ruled per-axis with the owner",
  "sources": ["…"],
  "candidates": { "archetype_name": "The Blade", "manifesto": "…", "__ore": { "…": "…" } }
}
```

- **Archetype files:** `` + `axis` + `key` + `canonical_name` + `construct` (TBD marker) + `candidates` (+ `__ore`). The per-axis variable CONSTRUCT is decided in the owner-supervised data rulings; until then every value is a candidate.
- **T-class files:** `pattern` (the slot-filled sentence) + `clauses` maps (role/condition-keyed variants).
- **V-class is NOT stored here** — vocabulary constants live in REA_02 (doc law) and `src/content`/`journeyData` (code); templates only *reference* them by slot name (REA_03 rule #3).
- Keys are canonical code keys (汉字 stems, `element_god` compounds) so transcription is mechanical.

## §3 · The tools

| Tool | Job |
|---|---|
| `Elementum_App/tools/export-reading-templates.mjs` | Builds/reseeds the AXIS STATION (`templates/json/<AXIS>/`) from the live corpus + REA_02 locks + the REA_03 §4b table (rebuild 2026-07-30; note: a reseed OVERWRITES — once owner rulings edit the JSONs, they become the source and the seeder retires or learns to merge). **`--check` mode (added 2026-07-30, the §1 sync-law audit): harvests the same state but writes nothing — diffs every template against the on-disk station byte-for-byte, prints `DRIFT`/`MISSING` per file, exit 1 on any drift.** Verified both directions at station closure: 138/138 in sync; a planted mutation is caught and named. |
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

- **Compiled per-stem profiles — RETIRED 2026-07-30 with the flat variable-major station** (both superseded by the axis station; a joined reading view can be regenerated later if wanted).
- **`archetypeSchema.js` rewrite** — the code schema conforms to REA_03 (types, caps, varyBy); afterwards a code-mirror doc can be regenerated as a tool artifact.
- **Validation gate** — budget/axis checks of every JSON against REA_03 (word caps, key completeness, register shape) as a pre-transcription step; extends the seeder.

## Document Metadata

| | |
|---|---|
| **Document** | REA_05 — Generation Architecture (template storage & engine piping) |
| **Version** | 2.0 · 2026-07-29 (full rewrite; legacy pipelines body in git) |
| **Status** | LIVING — tracks the data station + piping as they grow with the K2 pass |
| **Companions** | REA_03 (what the templates are) · REA_02 (the terms they use) · REA_04 (the reasoning behind them) · DEV_01/DEV_02 (engine + code architecture) |
