# REA_05 — Generation Architecture — template storage & engine piping

> **Formerly DES_03** (moved to the Reading library 2026-07-23) **and before that DOC4** (2026-07-09). Historical citations of "DES_03" or "DOC4" refer to this file (registry: Operations/README.md).

> **REWRITTEN 2026-07-29 (owner-directed, v2.0):** the old body (the April-2026 three-pass generation pipelines, `batchGenerate` orchestration, blocks-v2 selection) documented the legacy corpus model and is superseded — old body in git. This doc now owns one job: **how each data template is stored, reviewed, and piped into code and the engine.**

**Position in the library:** REA_01 explains the compound system · REA_02 finalizes the concepts · REA_03 dictates the templates and data fields · REA_04 sources the reasoning/depth · **REA_05 (this) says where the data lives and how it flows** · REA_06 orders the teaching.

---

## §1 · The storage model (three stations, one direction)

```
Reading/Database/templates/by_axis/json/<AXIS>/  AUTHORING SOURCE OF TRUTH (one folder per
                                         axis, one template per ARCHETYPE — REA_01 taxonomy)
        │  (generated views, never hand-edited:
        │     by_axis/md/<AXIS>/*.md        — review twin per archetype file
        │     by_variable/{json,md}/<var>.* — comparative pivot per registry variable)
        ▼   owner review → lock
Elementum_App/src/content/*           RUNTIME TRUTH (js modules the app ships)
        │
        ▼
engine/journey/consumers              buildJourneyModel · Self-Report · Consultant payload
```

The station has **two parent views** (owner-ruled 2026-08-03): **`by_axis/`** — the axis-major truth, "show me everything about 庚" — and **`by_variable/`** — the generated variable-major pivot, "show me `inscription` across all ten stems," built for comparative line-by-line content iteration.

**EDITING-SURFACE FLIP (owner-ruled 2026-08-04 · Option B):** the station is now the true editing surface for content values — the harvest era (code → station mirroring) is over. The seeder's default mode is a **field-level transcription audit**: for every code-mapped candidate variable it compares station vs live code and prints `OWED <file> :: <field>` where they differ (exit 1 — the pending-transcription worklist). Station-only fields (authored-ahead content with no code target yet, e.g. `zh` inscriptions), file metadata, and `__ore` are **station-owned and never compared**. The old overwrite behavior survives only as `--harvest` — a destructive bootstrap flag that rebuilds the station from code and loses station-side rulings; never run it casually.

1. **`Reading/Database/templates/by_axis/json/`** — one **JSON file per data template** (per REA_03 variable): the authoring and review station and the ONLY editing surface. Seeded from the live corpus for LIVE/INTERIM variables; stubbed (keys enumerated, values null) for PLANNED ones. Each JSON carries a header block (`$template`, class, axis, status, budget, source_of_truth) so a file is self-describing. The seeder also emits `_ORDER.json` — the canonical archetype order per axis, which fixes variant order in the pivot.
2. **Generated views** — rebuilt together by `tools/build-template-twins.mjs`; **never hand-edit either** (banner on every file says so):
   - **Axis md twins** (`by_axis/md/<AXIS>/*.md`) — clean per-archetype tables for manual review.
   - **By-variable pivot** (`by_variable/json/<var>.json` + `by_variable/md/<var>.md`) — one file per registry variable holding ALL its archetype variants in taxonomy order. Registry fields only: `__ore` never pivots, and TEMPLATED is excluded (each of its by_axis files already is a single-variable view). This revives the retired variable-major view (§5) as a projection, not a second truth.
3. **`Elementum_App/src/content/`** — the runtime modules (cleanup rule #1: live code lives in the app). Locked template data is **transcribed deliberately** from the JSON station into the content modules — there is **no automatic Reading→app pipeline** (standing owner rule; an auto-pipeline would be a separate owner-scoped project). The JSON station is where content is *decided*; `src/content` is where it *ships*.

**Sync law (station-first since 2026-08-04):** on any content change, the order is **station JSON edit → twins/pivot regen (`build-template-twins.mjs`) → deliberate `src/content` transcription → transcription audit green (`export-reading-templates.mjs`, default mode)**. An `OWED` line is the worklist, not necessarily a defect — it means a station ruling awaits its transcription (or an unintended edit needs reverting). A LIVE variable left `OWED` at session end IS a defect.

## §2 · File anatomy

```jsonc
// Reading/Database/templates/by_axis/json/STEM/geng.json
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
| `Elementum_App/tools/export-reading-templates.mjs` | **The transcription checker (default mode, station-first since 2026-08-04):** field-level audit of every code-mapped candidate variable, station vs live code — prints `OWED <file> :: <field>` per divergence, exit 1; station-only fields / metadata / `__ore` never compared (station-owned). `--check` = alias of the default. **`--harvest` = the retired seeder, kept as a DESTRUCTIVE bootstrap flag** — rebuilds the station (+ `_ORDER.json`) from live corpus + REA_02 locks + REA_03 §4b, overwriting station-side rulings; prints a warning banner, review the git diff before committing. Flip verified 2026-08-04: green on sync, a planted station edit reports `OWED`, a station-only `inscription_zh` field is tolerated. |
| `Elementum_App/tools/build-template-twins.mjs` | Regenerates every generated view from the by_axis JSONs: the `by_axis/md` twins AND the `by_variable/{json,md}` pivot. Run after any JSON edit. |
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

- **Compiled per-stem profiles — RETIRED 2026-07-30 with the flat variable-major station** (both superseded by the axis station; a joined reading view can be regenerated later if wanted). *Update 2026-08-03: the variable-major view IS now regenerated — as the `by_variable/` pivot (§1), a generated projection of the by_axis truth, not a second station.*
- **`archetypeSchema.js` rewrite** — the code schema conforms to REA_03 (types, caps, varyBy); afterwards a code-mirror doc can be regenerated as a tool artifact.
- **Validation gate** — budget/axis checks of every JSON against REA_03 (word caps, key completeness, register shape) as a pre-transcription step; extends the seeder.

## Document Metadata

| | |
|---|---|
| **Document** | REA_05 — Generation Architecture (template storage & engine piping) |
| **Version** | 2.0 · 2026-07-29 (full rewrite; legacy pipelines body in git) |
| **Status** | LIVING — tracks the data station + piping as they grow with the K2 pass |
| **Companions** | REA_03 (what the templates are) · REA_02 (the terms they use) · REA_04 (the reasoning behind them) · DEV_01/DEV_02 (engine + code architecture) |
