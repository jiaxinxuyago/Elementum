# Elementum · Doc 6 — The Manual

**Read this document first.** Always. Before opening any other document, before writing any code, before generating any content. This document tells you what exists, how it fits together, and what you can touch without breaking something downstream.

---

## §1 — The Six Documents

Elementum's documentation is split into six purpose-specific files. Each has a single audience and a single job. Mixing concerns across files is the most common source of confusion and bugs.

---

### Doc 1 — Calculation Engine Specification
**File:** `DOC1_Calculation_Engine.md`
**Audience:** Engineers implementing or verifying the calculation engine
**Job:** Every BaZi calculation rule. The deterministic input→JSON pipeline. Nothing else.
**Stability:** HIGH — rarely changes. When it does, all anchors in §5 must be re-verified.
**Contains:** Pillar formulas (year/month/day/hour), Five Tiger/Rat rules, hidden stems, seasonal phases, bond modifiers, gate checks (得令/得地/得势), useful god derivation, climate override, the Canonical JSON schema, reference charts and verification tests.

**Does NOT contain:** Archetypes, reading content, UI specs, generation prompts, knowledge frameworks.

---

### Doc 2 — Archetype System
**File:** `DOC2_Archetype_System.md`
**Audience:** Engineers, product, generation system
**Job:** The archetype formula and rules. What each archetype is, how layer keys are computed, and the full 50-key interaction taxonomy. Nothing about reading content, deliverables, or generation — those live in Doc 4.
**Stability:** HIGH — the taxonomy is the contract between the engine and all content layers.
**Contains:** Tier 1 identity (the four visible elements, archetypes, manifestos, element colors), Tier 2 key system (Layer 1 150 keys, Layer 2/3 50 keys + full 50-entry table), layer key computation code, reference chart layer derivation.

**Does NOT contain:** Reading schema, deliverable specs, voice rules, generation prompts, model assignment (all in Doc 4). Calculation math (Doc 1). Classical sources (Doc 3). UI/design specs (Doc 5).

---

### Doc 3 — Knowledge Pool
**File:** `DOC3_Knowledge_Pool.md` *(in development)*
**Audience:** Content creators, generation system (as reference)
**Job:** The complete source library. Classical BaZi texts, modern psychological frameworks, resonance bridges (MBTI, Enneagram, Western archetypes). Grows additively — you add sources, you never rewrite the protocol.
**Stability:** LOW for additions (grows frequently), HIGH for existing entries (never removed or substantially changed once verified).
**Contains:** Classical sources with SOURCE-FROM / VERIFY-ONLY / EXCLUDE flags; modern psychology framework profiles (stems, bands, tgPatterns, Ten Gods); elemental processing mode descriptions; resonance bridges to modern archetype systems.

**Does NOT contain:** Generation instructions (Doc 4), application logic (Doc 1/2), design specs (Doc 5). Doc 3 is a library — it does not tell you what to do with the sources.

---

### Doc 4 — Generation Architecture & Reading Content Guide
**File:** `DOC4_Generation_Architecture.md`
**Audience:** Generation scripts, AI agent doing batch generation, frontend engineers building reading components
**Job:** The complete reference for all reading content in Elementum. What the reading structure is, how it sounds, how it is generated, and how it is validated and shipped.
**Stability:** MEDIUM — system prompts and reasoning chain evolve with output quality; deliverable specs and voice rules are more stable.
**Contains:** Reading schema and three-angle structure (§2), literary voice rules and five elemental registers (§3), all three deliverable specs — DayMasterHero, ElementSpectrum, ProfileReading (§4–6), Pass 1 persona card generation (§7), Pass 2 reading schema generation (§8), Layer 2 angle generation (§9), compound archetype cards (§10), the reference standard reading (§11), quality gates (§12), CLI pipeline (§13), approve-then-scale workflow (§14), model assignment (§15).

**Does NOT contain:** The knowledge pool itself (Doc 3) — imports from it by reference. Calculation logic (Doc 1). Archetype taxonomy (Doc 2). UI/visual specs (Doc 5).

---

### Doc 5 — App Design Document
**File:** `DOC5_App_Design.md` *(in development)*
**Audience:** Designer, frontend engineer
**Job:** Full UI/UX. Component specs, color system, typography, animations, screen flows, interaction design.
**Stability:** LOW — the most actively evolving document. Reads from Doc 2 for what data is available and in what order.
**Contains:** Screen flows, component specifications, animation and transition specs, responsive breakpoints, accessibility requirements.

**Does NOT contain:** What content populates the components (Doc 2), calculation logic (Doc 1), generation protocols (Doc 4). Doc 5 is about how things look and behave, not what they contain.

---

### Doc 6 — The Manual *(this document)*
**File:** `DOC6_Manual.md`
**Audience:** Everyone, always first
**Job:** Orientation. How the documents work together, what you can edit, how to stay in sync.
**Stability:** LOW — updated whenever documents change substantially.

---

## §2 — How the Documents Flow Into Each Other

```
                    ┌─────────────────────────────────┐
                    │  DOC 1 — Calculation Engine     │
                    │  Input: { birthDate, hour, ... } │
                    │  Output: Canonical JSON          │
                    └─────────────────┬───────────────┘
                                      │ Canonical JSON
                    ┌─────────────────▼───────────────┐
                    │  DOC 2 — Archetype System        │
                    │  Defines: key taxonomy,          │
                    │  reading structure, output schema │
                    │  Contract between layers         │
                    └──────┬──────────────────┬────────┘
                           │ imports taxonomy  │ component data contract
              ┌────────────▼────┐      ┌──────▼──────────────────┐
              │  DOC 4          │      │  DOC 5 — App Design     │
              │  Generation     │      │  UI/UX specs, component  │
              │  Architecture   │      │  flows, visual system    │
              │  (DEFERRED)     │      └─────────────────────────┘
              └────────┬────────┘
                       │ imports sources from
              ┌────────▼────────┐
              │  DOC 3          │
              │  Knowledge Pool │
              │  (in dev)       │
              └─────────────────┘

DOC 6 (this document) sits above the entire system
and explains how to navigate all of the above.
```

**The data flow in production:**

```
Birth data
  → Doc 1 (calculation engine)
  → Canonical JSON
  → Doc 2 key computation
  → TEMPLATE_DB + READING_ANGLES lookup
  → Elementum_Engine.jsx renders via Doc 5 component specs
```

**The generation flow (offline batch):**

```
Doc 3 (sources) + Doc 4 (protocol)
  → generate_templates_v2.js
  → GENERATED_TEMPLATES + GENERATED_ANGLES
  → imported into Elementum_Engine.jsx constants
```

---

## §3 — Current Status of Each Document

| Doc | File | Status | Completeness |
|---|---|---|---|
| Doc 1 | `DOC1_Calculation_Engine.md` | ✅ LOCKED | Complete |
| Doc 2 | `DOC2_Archetype_System.md` | ✅ LOCKED | Complete — archetype formula and key taxonomy only |
| Doc 3 | `DOC3_Knowledge_Pool.md` | 🔲 IN DEVELOPMENT | Not yet extracted from Bible |
| Doc 4 | `DOC4_Generation_Architecture.md` | ✅ DRAFTED · LIVING | Complete — reading schema, deliverables, voice rules, generation passes, quality gates, CLI pipeline |
| Doc 5 | `DOC5_App_Design.md` | ✅ DRAFTED · LIVING | Screen flows, component specs, color system, data contracts |
| Doc 6 | `DOC6_Manual.md` | ✅ CURRENT | This document |

**Where to find content not yet extracted:**
The monolith `BaZi_Analysis_Bible_v2.md` remains the source of truth for Doc 3 content until that document is written. If you need psychological frameworks or classical sourcing detail, check the Bible first. All generation guidance and reading structure now lives in Doc 4.

---

## §4 — How to Read and Extract From Each Document

### Doc 1 — Calculation Engine

**How to read it:** Start with §1 (architecture overview) to understand the three-layer pipeline. Then go directly to the specific calculation you need — each section is self-contained with formula, anchor tests, and edge cases.

**What to look for:**
- A specific calculation rule → find the numbered section (§2.1 = Year Pillar, §2.7 = Ten Gods, §3.8 = Strength gates, etc.)
- The Canonical JSON schema → §4
- Verification anchors → §5 (run these against any new implementation)
- A specific classical source behind a rule → the `[HARD]` tags reference classical validation; sources are cited inline

**How to extract a rule:** Copy the formula block and the anchor tests together. The anchor tests are the only way to verify the formula is correct.

---

### Doc 2 — Archetype System

**How to read it:** Start with §1 (system overview) to understand the layered model. Then §3 for the key system — the 50-key taxonomy is the structural contract that all content and code builds on.

**What to look for:**
- What a user sees on the identity card → §2 (Tier 1)
- A specific key (e.g. `金_比肩`) → §3, full 50-key taxonomy table
- How layer keys are computed from the Canonical JSON → §3, layer key computation
- The ten archetypes, manifestos, element colors → §2

**How to extract a specific piece:** All tables are extraction-ready. Copy the row or section that applies. For reading content, deliverable layout, or voice rules — those are in Doc 4, not here.

---

### Doc 3 — Knowledge Pool *(once written)*

**How to read it:** Navigate by the source tier (classical BaZi → modern psychology → resonance bridges) then by tgPattern or Ten God you're working on.

**What to look for:**
- The classical source behind a specific behavioral claim → the SOURCE-FROM flagged entries
- The psychological framework behind a specific TG → the Ten God profiles section
- How to differentiate a yin/yang TG pair → each pair entry will have an explicit differentiation note

**How to extract:** Always take the derivation question alongside the source. The derivation question is what converts the classical principle into a specific behavioral claim. Source alone is insufficient.

---

### Doc 4 — Generation Architecture *(once written)*

**How to read it:** This is an operational document for the AI agent doing batch generation. Read it top to bottom before starting any generation run. Every step is sequential.

**What to look for:**
- The reasoning chain → the numbered steps (Step 0 through Step 4)
- The system prompt → the verbatim text injected into Pass 1 and Pass 2
- Quality gates → the checklist at the end of each section

**How to extract:** The reasoning chain steps and system prompts are extracted verbatim into `generate_templates_v2.js`. Do not paraphrase or summarise them — the exact wording matters.

---

### Doc 5 — App Design *(once written)*

**How to read it:** By screen or by component. Every component entry cross-references Doc 2 for the data it consumes.

**What to look for:**
- A specific screen layout → find the screen by name
- A component's visual specification → find the component entry with color, spacing, animation details
- What data a component consumes → the "Data source" field in each component entry cross-references the Doc 2 section

**How to extract:** Design specs are extracted directly into frontend component files. The component prop shapes in Doc 2 §7–8 are the data contract — Doc 5 specifies how those props are rendered.

---

## §5 — How to Edit Each Document Safely

### The cardinal rule before any edit

**Check the version header.** If the document you are about to edit is marked `LOCKED` — stop. A locked document can only be changed with full team review. If you're an AI agent and the document is locked, flag the proposed change and wait for explicit user approval before touching anything.

### Editing Doc 1 (Calculation Engine)

**Who can edit:** Engineers, with verification.
**What's allowed:** Adding a new anchor test. Correcting a formula that fails verification.
**What requires full review:** Any change to the core formulas (pillar calculation, hidden stem weights, bond shift factors, gate check logic). Any change to the Canonical JSON schema.
**After any edit:** Re-run all verification tests in §5. All must pass. Update the version history.
**Risk:** Doc 1 errors propagate silently — the calculation will produce wrong output that looks correct until an edge case exposes it. Verification anchors are the only defense.

### Editing Doc 2 (Archetype System)

**Who can edit:** Product, content, engineers.
**What's locked:** The 50-key Layer 2/3 taxonomy (§3), the ten archetypes and manifestos (§2), the element colors (§2), the reading angle schema (§4, the three-angle structure and yin/yang pair rules), the deliverable component data shapes (§7–8).
**What can evolve:** The reading architecture for Sections 3–10 (§5 is explicitly deferred). Voice rule examples (§9). New content tables that add to existing ones without removing entries.
**After any edit:** If the key taxonomy changes, update `generate_templates_v2.js` and the `LAYER2_COMBOS` constant. If a component prop shape changes, update `Elementum_Engine.jsx` and Doc 5.

### Editing Doc 3 (Knowledge Pool)

**How to add a new source:**
1. Identify which tier it belongs to (Classical / Psychology / Resonance Bridge)
2. Determine its flag: SOURCE-FROM (produces behavioral claims), VERIFY-ONLY (confirms existing claims), EXCLUDE (not anchored)
3. Write the derivation question alongside the source — never add a source without it
4. Apply the hard ceiling: max 2–3 behavioral claims per source entry
5. Add to the version history with the date and a brief description

**What not to do:** Do not remove existing SOURCE-FROM entries unless they are demonstrably wrong per classical scholarship. Do not change a SOURCE-FROM flag to EXCLUDE without documentation of why.

### Editing Doc 4 (Generation Architecture)

**The reasoning chain and system prompts are precision instruments.** Small wording changes produce measurable output quality differences. Every change to the system prompt or reasoning chain requires a before/after test on the reference chart (`庚_concentrated_pure`) and cold-reader evaluation of both versions.

**Workflow:**
1. Propose the change in writing with rationale
2. Generate reference chart reading with current version
3. Generate reference chart reading with proposed version
4. Cold-reader evaluation (AI evaluator with no prior context)
5. If new version passes, update the document and version history
6. Update `generate_templates_v2.js` system prompts to match

### Editing Doc 5 (App Design)

**Most frequently edited document.** Design decisions often cascade — changing a component's layout can affect what data Doc 2 needs to provide. Before any significant layout change, check whether the component's data contract in Doc 2 §7–8 still holds.

**Cross-document sync rule:** If Doc 5 requires a new field from `buildDayMasterProfile()` or the CalloutCard props, update Doc 2 §7–8 first, then implement in `Elementum_Engine.jsx`, then update Doc 5.

---

## §6 — The Version Header System

Every document opens with a version header block that provides orientation without opening the document. The standard format:

```
╔═══════════════════════════════════════╗
║  Version:     1.0 (Month Year)       ║
║  Status:      LOCKED / LIVING / etc. ║
║  Audience:    [who reads this]       ║
║  Purpose:     [one sentence]         ║
║  Stability:   HIGH / MEDIUM / LOW    ║
║  Used by:     [files and documents]  ║
║  Compatible:  [which doc versions]   ║
╚═══════════════════════════════════════╝
```

**Status values:**
- `LOCKED` — do not change without full team review
- `STRUCTURE LOCKED` — the structure is final; specific sections may still evolve
- `LIVING` — expected to change frequently
- `IN DEVELOPMENT` — not yet complete; content may be unreliable

**Compatible field:** Lists the specific versions of other documents this document is designed to work with. When you update a document, check whether the Compatible field in dependent documents needs updating.

---

## §7 — Synchronisation Rules

The most common failure mode when documentation is split across multiple files: one file gets updated and the dependent files don't. These rules prevent that.

### When Doc 1 changes

| What changed | Also update |
|---|---|
| Canonical JSON schema (§4) | Doc 2 §3 (key computation uses specific JSON fields) · Doc 4 (prompts reference JSON field names) · Doc 5 (components consuming new/removed fields) |
| Energy band mapping (§1.2) | Doc 2 §7 (band labels and weighting) · Doc 4 (band-level generation logic) |
| A calculation formula | Re-run Doc 1 §5 verification tests · Note in version history |

### When Doc 2 changes

| What changed | Also update |
|---|---|
| Layer 2/3 key taxonomy (§3) | `generate_templates_v2.js` LAYER2_COMBOS constant · `Elementum_Engine.jsx` READING_ANGLES constant |
| Archetype names or manifestos (§2) | `Elementum_Engine.jsx` archetype constants · Doc 5 (any hardcoded strings) |
| Component prop shape (§7–8) | `Elementum_Engine.jsx` component implementation · Doc 5 component specs |
| Reading schema field added/removed (§4) | Doc 4 generation prompts · `generate_templates_v2.js` quality gates |

### When Doc 3 changes

Doc 3 is additive. Additions do not require downstream changes unless a SOURCE-FROM entry is added for a stem or tgPattern that Gen scripts already handle — in that case, update the `STEM_CLASSICAL` or `CLASSICAL_SOURCES` constants in `generate_templates_v2.js`.

### When Doc 4 changes

| What changed | Also update |
|---|---|
| System prompt text | `generate_templates_v2.js` PERSONA_SYSTEM_PROMPT / READING_SYSTEM_PROMPT / ANGLES_SYSTEM_PROMPT |
| Quality gate rules | `generate_templates_v2.js` qualityCheckPersona / qualityCheckReading / qualityCheckAngles |
| Reasoning chain steps | This document §9 (workflow section) if it affects how to run a generation pass |

---

## §8 — What Is Locked vs. In Development

### Locked — do not change without team review

- The five-element system and its relationships (generation cycle, control cycle)
- The ten stems and their archetypes, manifestos, and element assignments
- The five energy bands and their mapping to strength values
- The five tgPattern values and their classical roots
- The 50-key Layer 2/3 taxonomy
- The three-angle reading schema (how/works/deep)
- The Canonical JSON schema
- The element colors (#8ba3b8 Metal, #7a9e6e Wood, #c4745a Fire, #b89a6a Earth, #5a7fa8 Water)
- The jargon-free principle (no BaZi terms in user-facing output, ever)

### In active development

- Section 3–10 reading architecture (Doc 2 §5 still deferred)
- The knowledge pool additions (Doc 3 grows with each generation run)
- The app design document (Doc 5 — not yet created)
- The MBTI resonance bridge (stored in persona cards; not yet surfaced in UI)
- The shareable code mechanic (stored; not yet built)
- Section 3+ (Ten Gods reading, Work & Calling, Relationships, etc.)

### Key redesign in Doc 4

The generation reasoning chain was redesigned for Doc 4. The core change: **portrait-first, not source-first**. The old approach ran sources through a sequential checklist and generated fields from structural analysis. The new approach treats the portrait pre-write as the generative event — sources are input material, the portrait is the working model, fields are derived from the portrait. This produces more vivid readings at the cost of slightly less predictable output — the approve-then-scale workflow (Doc 4 §7) manages this.

### Deliberately deferred

- The catalyst dimension as a Layer 1 identity axis — retired. Catalyst now lives as a band-conditional calculation in the UI layer only. Do not reinstate it as a generation variable.
- The `expressive` and `pressured` tgPattern values — retired. Polarity split lives in Layer 2 Ten God identification. Do not reinstate.
- Seven-value tgPattern system — retired.

---

## §9 — Common Workflows

### Starting a new conversation or AI agent session

1. Read Doc 6 (this document) — full read, not skim
2. Check §3 for current document status
3. Identify which document covers your task (§10 quick reference)
4. Read the relevant section of that document
5. Check the version header of that document for `Compatible` — confirm you're working with aligned versions

### Verifying the calculation engine

1. Open Doc 1
2. Go to §5 (Reference Charts & Verification Tests)
3. Run tests 1–5 against your implementation
4. If any test fails, trace back through the specific formula section using the test's field name
5. Never ship a calculation change without all 5 tests passing

### Computing a user's archetype key

1. Run the calculation engine (Doc 1) → get Canonical JSON
2. From JSON: extract `dayMaster.stem`, `dayMaster.strength` → compute band via `getEnergyBand()`
3. From JSON: extract element scores → compute `computeTgPattern()` → Layer 1 key
4. From JSON: find elements scoring ≥3 (excluding DM element) → run `getDominantTenGod()` → Layer 2/3 key
5. Look up keys in TEMPLATE_DB and READING_ANGLES

### Running a generation batch

See Doc 4 §13–14 for the full CLI reference and approve-then-scale workflow.

1. `node generate_templates_v2.js generate-persona` → submit Layer 1 Pass 1
2. `node generate_templates_v2.js retrieve-persona` → collect → `personas.json`
3. Sample 3–5 results against Doc 4 §11 reference standard. Approve before continuing.
4. `node generate_templates_v2.js generate-readings` → submit Layer 1 Pass 2
5. `node generate_templates_v2.js retrieve-readings` → collect → `templates.json`
6. `node generate_templates_v2.js generate-angles` → submit Layer 2
7. `node generate_templates_v2.js retrieve-angles` → collect → `angles.json`
8. `node generate_templates_v2.js check` → validate all schemas
9. `node generate_templates_v2.js merge` → `generated_output.js`
10. Import into engine constants. Verify reference chart still produces expected output.

### Adding a new archetype template (single key)

1. Identify the key (e.g. `甲_balanced_flowing`)
2. Read the relevant sections of Doc 3 (source library for this stem and pattern) and Doc 4 §7–8 (Pass 1 + Pass 2 generation)
3. Follow the portrait-first generation flow: portrait pre-write → coherence tests → field generation → voice register check
4. Verify against Doc 4 §12 quality gates
5. Add to TEMPLATE_DB in `Elementum_Engine.jsx`
6. Add key to `LAYER1_SKIP` in `generate_templates_v2.js` to prevent overwriting at batch time

### Editing a UI component

1. Identify which deliverable it belongs to (Doc 4 §4, §5, or §6)
2. Check the component's data contract (CalloutCard props in Doc 4 §5, `buildDayMasterProfile` shape in Doc 4 §6)
3. Check Doc 5 for visual specification
4. If you need a new field: update Doc 4 §5–6 first, then implement in `Elementum_Engine.jsx`, then update Doc 5
5. If you're removing a field: check Doc 4 §13 to ensure generation scripts don't produce it unnecessarily

---

## §10 — Quick Reference: Where to Find Specific Information

| I need to know... | Look in |
|---|---|
| How to calculate the month pillar | Doc 1 §2.2 |
| What hidden stems are in 辰 branch | Doc 1 §3.3 |
| Why Metal gets 相 (1.1) in 辰月 | Doc 1 §3.4 note |
| The Canonical JSON schema | Doc 1 §4 |
| The reference chart verification tests | Doc 1 §5 |
| What the user sees on the identity card | Doc 2 §2 |
| All 50 Layer 2/3 keys | Doc 2 §3, full taxonomy table |
| How layer keys are computed from the JSON | Doc 2 §3, layer key computation |
| The element colors | Doc 2 §2 |
| Why `expressive` and `pressured` were retired | Doc 2 §3, note on 5 vs 7 tgPattern values |
| How `金_比肩` differs from `金_劫财` | Doc 4 §2, yin/yang pair rules |
| The three reading angles (how/works/deep) | Doc 4 §2 |
| The five elemental voice registers | Doc 4 §3 |
| Which BaZi terms are banned from UI | Doc 4 §3, jargon-free principle |
| DayMasterHero component spec | Doc 4 §4 |
| ElementSpectrum component spec | Doc 4 §5 |
| How catalyst/friction is derived per band | Doc 4 §5, band-conditional derivation table |
| The catalyst/friction table for all 10 stems | Doc 4 §5 |
| The `buildDayMasterProfile()` return shape | Doc 4 §6 |
| The Pass 1 persona card system prompt | Doc 4 §7 |
| The Pass 2 reading schema system prompt | Doc 4 §8 |
| Reading field specs (teaser, twoAM, etc.) | Doc 4 §8 |
| Layer 2 angle generation system prompt | Doc 4 §9 |
| TG mechanism descriptions for prompts | Doc 4 §9 |
| Compound archetype card schema (13 fields) | Doc 4 §10 |
| The reference reading (庚 Metal) | Doc 4 §11 |
| Quality gates for all three passes | Doc 4 §12 |
| Forbidden vocabulary (complete list) | Doc 4 §12.4 |
| The generation batch CLI commands | Doc 4 §13 |
| Approve-then-scale workflow | Doc 4 §14 |
| Which model to use for which task | Doc 4 §15 |
| The psychological framework behind 七杀 | Bible §3A.7 Part F (until Doc 3 is written) |
| The classical source behind the pure tgPattern | Bible §3A.5 Part C (until Doc 3 is written) |
| Why the catalyst dimension was retired | Doc 6 §8 (deliberately deferred) + Bible §3A.7 Part A note |

---

## §11 — Version History

| Version | Date | Changes |
|---|---|---|
| 1.1 | April 2026 | Updated to reflect Doc 2 scope narrowing and Doc 4 expansion. All cross-references updated. Quick reference table rebuilt. |
| 1.0 | April 2026 | Initial creation. Documents 1, 2, 6 written. Docs 3, 4, 5 status noted. |

---

## Document Metadata

| | |
|---|---|
| **Document** | Doc 6 — The Manual |
| **Last Updated** | 2026-04-10 |
| **Version** | 1.1  ·  April 2026 |
| **Status** | LIVING — update whenever a document is added, split, or restructured |
| **Audience** | Any new AI agent, new team member, or new conversation starting work on Elementum |
| **Purpose** | Read this first. Always. Explains what exists, what each document is for, how they depend on each other, and how to edit safely. |
| **Stability** | LOW — the most frequently updated document in the system |
| **Used by** | Everyone, as orientation before touching anything else |
