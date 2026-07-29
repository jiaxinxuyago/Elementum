# Elementum Docs — ID Registry & Naming Convention

**Reorganized 2026-07-09** (owner directive). Seven categories, uniform naming convention. **Restructured 2026-07-27** (owner directive): the Design and Reading libraries moved out to their discipline folders — `Design/Documents/` and `Reading/Documents/` — ahead of the reading design/dev phase, and later the same day this general tree was **renamed `DevLog_Docs/` → `Operations/`** (historical citations of either `Documents/` or `DevLog_Docs/` resolve here). This README remains the ONE registry of record for ALL locations — consult it before creating or citing any document.

## The naming convention

```
[CATEGORY PREFIX]_[NN]_[Doc_Name].md
```

- **Prefix:** `DES` Design · `REA` Reading · `DEV` Development · `INF` Infrastructure · `BIZ` Business · `LEG` Legal & Admin · `PM` Project Management
- **Number:** two digits, assigned by accession. **Append-only — never renumber, never reuse.** The number is an ID, not a ranking. **ONE owner-approved exception:** the REA renumberings of 2026-07-28/29 (after the V/A consolidation) — the Reading library settled at REA_01–REA_06 + archive; the renumber table below resolves any citation from an earlier era.
- **Doc_Name:** Title_Case_With_Underscores, noun phrase, ≤5 words. No dates in living docs (git is the timeline). No status words (`FINAL`, `v2` — version control's job).
- **Exempt from numbering:** archives (`_ARCHIVE_` prefix — sorted last, non-living), dated snapshots (`*_YYYY-MM-DD.*` — immutable records; the date IS their ID), and non-document reference artifacts (e.g. `.html` replicas).
- **The DOC series (DOC1–DOC10) is CLOSED.** It was the legacy canon numbering; every DOC was converted 2026-07-09 (alias table below). New canon-grade docs are born with category prefixes.

## Registry

### Design docs — at `Design/Documents/` (moved 2026-07-27; formerly `DevLog_Docs/Design/`)
| ID | Title | Purpose | Formerly |
|---|---|---|---|
| DES_04 | App_Design | App design + §AM locked design rules | DOC5 |
| DES_13 | Design_Audit_Backlog | THE DECISION LEDGER (D-series / S-series rulings) | — |
| DES_14 | Asset_Map_Concept_Arts | Concept-art asset map | — |
| — | _ARCHIVE_Manual_RETIRED | Retired Manual (archive, exempt) | — |

### Reading docs — at `Reading/Documents/` (moved 2026-07-27; formerly `DevLog_Docs/Reading/`)
*(Library created 2026-07-23 — design/reading doc separation. Reading docs are review-grade: locked content here becomes the js data piped into the content engine. Numbers assigned by accession as files move; the DES→REA mapping below preserves old citations.)*

| ID | Title | Purpose | Lineage |
|---|---|---|---|
| REA_01 | Archetype_System | THE FRONT DOOR — the compound archetype system, explained axis-by-axis (orientation only, v2.0) | DES_01 ← DOC2 |
| REA_02 | Concept_Dictionary | THE V BOOK — vocabulary law + naming registry + BaZi concept families + ALL locked terms; finalizes the concepts (never a generation target) | old Reading_Concept_Inventory Pt 1 + old Identity_Vocabulary |
| REA_03 | Reading_Generation_Schema | THE A BOOK — the varying templates + data fields per the concepts: variables, assembly model, 50-key reference (§4b), §7 decision log (xlsx twin: `Reading/Database/REA_03_generation_schema.xlsx`, regen via `Elementum_App/tools/build-field-map-xlsx.mjs`) | old Reading_Schema + old Reading_Data_Variables + old Archetype_Fields |
| REA_04 | Knowledge_Pool | THE SOURCES — classical/psychological corpus + translation protocol; supports the reasoning, perspective, and depth behind every field's reading | DES_02 ← DOC3 |
| REA_05 | Generation_Architecture | THE PIPING — how each data template is stored (Reading/Database/templates/) and piped into code/engine (v2.0 rewrite 2026-07-29; legacy pipelines body in git) | DES_03 ← DOC4 |
| REA_06 | Concept_Ladder | Teaching order (ladder L1–L15) + section charters + teaching-status audit | old Reading_Concept_Inventory Pts 2–3 |
| — | _ARCHIVE_Reading_V2.1_Reconciliation_Audit | v2.1 polarity-faces decision record + the standing journey-lock sequencing ruling (archived 2026-07-29; ruling restated live in REA_03 §7) | was REA_08 ← DES_09 |

**Retired in the 2026-07-29 final ordering (owner-approved; recoverable from git):** `Content_Generation_Guide` (the legacy prompt cookbook — fresh prompts get written against REA_03 when generation starts) · `Reading_Format_Audit` + `Reading_Content_Review` + their generator tools (`reading-format-audit.mjs`, `build-reading-review.mjs`, `reading-replicant.html`) — they audited fields the new schema supersedes.

**THE REA RENUMBER TABLE (owner-approved — resolves any REA citation written before 2026-07-29).** Id eras, newest first:

| Doc (current id + title) | 07-28 pipeline id | 07-28 consolidation id | 07-23 era id | DES era |
|---|---|---|---|---|
| REA_01 Archetype_System | REA_01 | — | REA_01 | DES_01 |
| REA_02 Concept_Dictionary | REA_03 | REA_13 | *(inventory Pt 1 = REA_07 · vocabulary = REA_11)* | DES_08 Pt 1 + DES_12 |
| REA_03 Reading_Generation_Schema | REA_04 | REA_14 | *(schema = REA_04 · variables = REA_12 · fields = REA_06)* | DES_05 + DES_07 |
| REA_04 Knowledge_Pool | REA_02 | — | REA_02 | DES_02 |
| REA_05 Generation_Architecture | REA_05 | — | REA_03 | DES_03 |
| REA_06 Concept_Ladder | REA_07 | REA_15 | *(inventory Pts 2–3 = REA_07)* | DES_08 Pts 2–3 |
| _ARCHIVE_Reading_V2.1… | REA_08 | REA_08 | REA_08 | DES_09 |
| *(retired)* Content_Generation_Guide | REA_06 | — | REA_05 | DES_06 |
| *(retired)* Format_Audit / Content_Review | REA_09 / REA_10 | — | REA_09 / REA_10 | DES_10 / DES_11 |

Legacy **section** citations resolve at the same § numbers in the current books: old Concept_Inventory §1–3 = REA_02 §1–3 · old Identity_Vocabulary §4–6 = REA_02 §4–6 · old Reading_Schema §7 = REA_03 §7 · old Concept_Inventory §6–12 = REA_06 §6–12 · old Knowledge_Pool PARTs/§§ = REA_04 same. Ids REA_07–REA_15 are RETIRED (transition/legacy), never reused; the next new Reading doc is born REA_16.

### Development/ — engine spec, code architecture, engineering protocols
| ID | Title | Purpose | Formerly |
|---|---|---|---|
| DEV_01 | Calculation_Engine | BaZi calculation methodology (engine spec) | DOC1 |
| DEV_02 | Code_Architecture_and_Migration | Code architecture + migration record | DOC8 |
| DEV_03 | Code_Review_Standards | Review standards (cited by the nightly review routine) | — |
| DEV_04 | Engine_Accuracy_QA | MANDATORY protocol after engine changes | — |
| DEV_05 | Arch_Cleanup_Audit | 2026-07 restructuring audit (executed; retained — still carries the open Tier-D deferred backlog) | — |

**Retired (owner-approved 2026-07-09; recoverable from git history):** `DEV_06_Screens_V2_Implementation_Edits.md` (screens-v2 landed, purely historical) · `reading-replicant.html` (generated artifact — rerun `build-reading-review.mjs` to recreate). The DEV_06 number is not reused.

### Infrastructure/ — backend, workers, external services, store enrollment
| ID | Title | Purpose | Formerly |
|---|---|---|---|
| INF_01 | Backend_Architecture | Workers, Stripe, Supabase, push, LLM, §4.2a store runbooks | DOC10 |

### Business/ — strategy, financials
| ID | Title | Purpose |
|---|---|---|
| BIZ_01 | Elementum_Expense_Report | Monthly costs + phase projections + cost triggers |
| BIZ_02 | Elementum_Validation_Sprint | Beta validation strategy |

### Legal_Admin/ — legal records, entity paperwork
| File | Purpose |
|---|---|
| Elementum_Legal_Terms_Snapshot_YYYY-MM-DD.html | Dated snapshots of the live /legal page (immutable; re-snapshot on material change). Canonical source: `Elementum_App/public/legal.html` |

### Project_Management/ — automation, routines, QA operations
| ID | Title | Purpose |
|---|---|---|
| PM_01 | Automation_Runbook | Inventory of record for the automation routines + machine-local rebuild list |
| PM_02 | Pending_Tasks | THE TASK BOARD — deferred/trigger-gated/owner-pending work (STORE onboarding, INFRA gates, OWNER reviews, housekeeping); agents check here for "what's open?" |
| PM_03 | Day_Log | THE daily project record — Done / Pending / Pivots per day; append-only; written each weekday (Mon–Fri ~11:45 PM) by the project-manager routine |

## DOC# alias table (legacy citations)

DOC1→DEV_01 · DOC2→DES_01→REA_01 · DOC3→DES_02→REA_04 · DOC4→DES_03→REA_05 (Generation_Architecture) · DOC5→DES_04 · DOC6→DES_05→REA_03 (Reading_Schema, consolidated into Reading_Generation_Schema) · DOC7→DES_06→(retired) Content_Generation_Guide · DOC8→DEV_02 · DOC9→DES_07→REA_03 (Archetype_Fields, consolidated into Reading_Generation_Schema) · DOC10→INF_01 *(REA targets shown at the current 2026-07-29 numbering — see the renumber table)*

Old commit messages and external artifacts may still cite DOC#; each converted file carries a "Formerly DOC#" breadcrumb in its header, so a search for the old name always lands on the right file.

## Note on the discipline folders ("Design", "Reading")

**2026-07-27 restructuring (owner-approved; supersedes the same-day "documents in this tree, artifacts at root" note):** the two content disciplines now own their documents inside their repo-root folders. Three doc locations, one registry (this file):

- `Design/Documents/` — the DES docs (formerly `DevLog_Docs/Design/`); the rest of `Design/` is design assets (legends, tokens, libraries, handoff packages).
- `Reading/Documents/` — the REA reading library (formerly `DevLog_Docs/Reading/`), review-grade; `Reading/Database/` is the reading-data home (`elementum_profile_database.html` — the HTML twin of `archetypeSource.js` — the generated `reading-replicant.html`, and future data exports). The app's runtime content stays in `Elementum_App/src/content/` (live code lives in the app — cleanup rule #1).
- `Operations/` — everything else: Development, Infrastructure, Business, Legal_Admin, Project_Management, and this registry.

Cite with enough path to disambiguate.
