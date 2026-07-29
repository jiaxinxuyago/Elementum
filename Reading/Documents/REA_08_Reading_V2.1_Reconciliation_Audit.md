# REA_08 — Reading v2.1 — Reconciliation Audit & Decision Log

> **Formerly DES_09** — moved to the Reading library in the 2026-07-23 design/reading doc separation; historical citations of "DES_09" refer to this file (registry: Operations/README.md).

**Created 2026-06-24 · status: DECISIONS LOCKED · ✅ DOC REVIEW COMPLETE (all docs reconciled to v2.1, A1–C5 + B5/B6/B7) · ▶ engine/code pass PENDING owner approval.**
> **⏸ SEQUENCING RULING (owner, 2026-07-23): the engine pass stays parked until the READING JOURNEY is locked.** The new reading catalogue (journey redesign, merged to main 2026-07-23) dictates the full reading experience, and that design will probably profoundly reshape the two-faces reading model recorded here. Do not push the accuracy rewire or author corpus while the reading content design is not set in stone — journey lock first, then revisit v2.1 (possibly amended), then engine + corpus.
**Purpose:** record the v2.1 reading-structure decisions (the Faces prologue + polarity + ruling domain + presence-frame registers) and the per-document edits required to reconcile the whole corpus. No canonical doc has been edited yet — this is the "on paper" record that precedes the edit pass.
**Derived from:** a four-cluster scrutiny audit (engine/accuracy · archetype/knowledge · reading-schema/generation · app-design/journey) cross-checked against the live code, plus the owner questionnaire (A/B/C below).

---

## 1 · The v2.1 structure (locked model)

The reading is organized **element-first** (the 5 elements = the navigable skin), each element resolving to exactly **one Ten-God direction** relative to the Day Master, with **polarity** splitting that direction into up to two **personas/faces**.

- **FACES is a prologue *inside* the reading** (not a new IA node — §AM.1's `catalogue → reading` table is intact). Tapping an element opens its face card(s) **before** the text-heavy persona reading.
- **The face card** = dominant-energy **abstract** + **punchline** + **keywords (chips)** + **ruling domain**, per persona. It is the persona's index/cover card.
- **By-math fidelity:** an element shows **one** face if one polarity is present, **two** if both are present. No manufactured latent face cards. Full absence (a 0% element) is read at the **ghost/element level** (the cultivation read), not as a within-element latent polarity.
- **Reading is persona-scoped** (one Ten-God persona), read at a depth set by its **presence frame**.
- **No jargon surfaces:** English persona names + plain-English ruling domain. Never 比肩/正财, never "yin/yang"/"polarity" in user copy.

### The 50-key clarification (resolves the "does 50 grow?" confusion)
`ENERGY_CARD_DATA[${element}_${god}]` = all valid (element, god) pairs across all Day Masters (10 per DM, non-overlapping) = **50, unchanged**. For one chart, only that DM's 10 keys are in play. The engine previously resolved **1** god per element (polarity-blind); v2.1 resolves **up to 2** and names the absent one — all inside the same 50 keys. **No new keys.** Corpus grows from **presence-frame registers**, not key count.

---

## 2 · Decision log (owner questionnaire, 2026-06-24)

| # | Decision | Ruling |
|---|---|---|
| **A1** | Faces in the IA | Faces = a **reading prologue**, not a new IA node. §AM.1 stays. Face card carries abstract + punchline + keywords + ruling domain. The 6-row→5-element catalogue (§AM.8/D3) reconciliation remains a **separate D13 matter**, not forced by v2.1. |
| **A2** | Faces routing | **Strictly by calculation:** 1 present polarity → 1 face; 2 → 2. No manufactured latent face cards. Absence handled at the ghost/element level. |
| **A3** | Engine | **Full polarity-aware rewire.** Retire `tenGodForEnergy`; engine emits per element `{presentFaces:[{god,weight}], absentGod}`. Accuracy fix; uses data already computed. |
| **B1** | Register depth | Registers = canonical **presence frames** (dominant/present/scarce/absent). **Dominant + absent bespoke; present derived** (compressed from dominant). ~1.5× corpus. |
| **B2** | Ruling-domain granularity | **Per persona (50), DM-relative.** Distinct from the per-god definition line (mechanism). |
| **B3** | Persona names | **2026-06-10 owner ruling stands** (The Twin · Rival · Muse · Edge · Horizon · Steward · General · Arbiter · Alchemist · Sage). Other name sets → **non-surfacing aliases**. |
| **B4** | Persona art | **10 Inner-Council character concepts, recolored per element** (element-color variations of the same character). 10 base concepts cover all 50 contexts. |
| **B5** | Identity vs Ten-God sections | **Two separate reading sections** (2026-06-24, schema review). The **Identity card** reads the Day-Master stem specifically (元-self, e.g. 庚 = The Blade). **The Twin (比肩) / The Rival (劫财)** render as **dominant-energy Ten-God cards below the energy wheel** — NOT folded into identity, NOT dropped. All 5 elements resolve faces; **all 50 K2 keys** render. Corpus stays **~19.5k**. |
| **B7** | Energy Faces screen | **Specced in DES_04 §11** (2026-06-24). Tap energy → **banner** (element · % · role badge · ≤14w ruling-domain reading line) → **1–2 dominant-led character cards**, **always shown, by-math** (A2) → tap card → persona reading. Cards carry a **subtle Yin/Yang marker** ("Yang Wood") — refines the earlier pure-persona mockup; vocab-law permitted. All 5 elements incl. self; identity card separate (B5). |
| **B6** | Position axis (宫位) | **Position is a first-class reading axis** (2026-06-24, from the Cece per-pillar analysis). Each Ten God reads by pillar; positional reading = **canon mechanism × palace life-domain × polarity** (REA_02 §2.7b). Composes from K2 + ~7 `PALACE_FRAMES`; per-pillar TG data already in `chart.tenGods` (calculator.js:492). 日支 (spouse) + 时柱 (children/legacy) highest-value. Elevates 宫位 from VERIFY-ONLY → behavioral driver (子平 + 宫位论法 blend). REA_02 §2.7b authored; REA_03 positional-generation chain still pending. |
| **C1** | Old Reading Schema.pdf | **Superseded** by REA_14_Reading_Generation_Schema (v2.1); stamp so its field names aren't read as canonical. |
| **C2** | 5 journey PDFs | **Historical/tone references only**, not IA truth. |
| **C3** | Archetype_Reference 5-family collapse | **Quarantined** — marketing/resonance only, never seeds the persona taxonomy. |
| **C4** | tgPattern cardinality | **REA_01/REA_14 5-pattern canonical**; Bible's 7-value scheme **superseded**. |
| **C5** | REA_03 §9 doctrine | **Exception carved** — energy-card content **does** vary by presence frame. |

---

## 3 · Per-document edit list (to execute on go-ahead)

### Reading schema → bump to v2.1 (`REA_14_Reading_Generation_Schema.md`)
- §1/§2: reframe — element→direction fixed; polarity yields 1–2 **present** faces by math; chart surfaces present face(s); absence at element level.
- §4 `energyCard`: add **presence-frame registers** (`dominant` full / `present` derived-shorter / `absent` cultivation) and a **`rulingDomain`** field (×50, DM-relative). Define the **face-card unit** = abstract + punchline + chips + rulingDomain.
- §3 surface map: add the **Faces prologue** slot (persona index card) between catalogue and the text reading; reading is persona-scoped.
- §7: mark decision #1 **RESOLVED → full 50**; append the A/B/C decisions to a "decided" log.
- §6: re-estimate corpus (dominant+absent bespoke + present derived; +50 ruling-domain lines; art = 10 base × element variants).

### Engine / accuracy
- **`d13ReadingResolve.js`** (code): retire polarity-blind `tenGodForEnergy`; resolve via the polarity-aware path.
- **`calculator.js`** (code): add `getElementPolaritySplit()` returning `{yangW,yinW}` per element (currently discarded by `getDominantElementPolarity`).
- **`buildEnergyChart.js`** (code): attach per-energy `{presentFaces, absentGod, weightSplit}`.
- **`archetypeSchema.js`** (code): add register + `rulingDomain` + faces; promote `tg` from `planned`.
- **DEV_01**: document per-element resolution output + the split; **recompute the 庚 reference chart** with the polarity-aware resolver before it seeds any authoring.
- **DEV_02**: retarget migration to `ENERGY_CARD_DATA` ×50 with presence-frame registers.
- **INF_01**: ensure the LLM payload carries the per-element god set.

### Archetype / knowledge
- **REA_01**: reconcile the 50-indexing to **DM-relative navigation**; disambiguate stem-archetypes (10 stems) vs TG-personas (10 gods); promote the persona layer from "planned."
- **REA_02**: add **presence-frame register** authoring to the 10 TG profiles; extend §8.3's 2-band model to 3-band; keep §8.6 as the no-jargon translation contract.
- **REA_14**: re-scope `dominantEnergy.characterDesc` from element-scoped to **persona-scoped**; add the **`rulingDomain`** axis (×50, DM-relative), distinct from the Western `lifeDomain` buckets.

### Generation
- **REA_03**: retarget Pipeline A2 → `ENERGY_CARD_DATA[element_god]` ×50 with presence-frame registers (dominant+absent bespoke, present derived) + `rulingDomain`; **carve the §9 exception** (C5).
- **REA_05**: add authoring sections — per-face persona prompt · register-variation prompt · ruling-domain prompt.
- **Persona_Construction_Prompt_Formula.pdf**: keep as voice reference; note it runs **per persona** and must emit a ruling-domain line.

### App design / journey
- **DES_04**: document **Faces as the reading prologue** (do NOT amend the §AM.1 IA table — it stays); §11 reading unit → persona-scoped with presence-frame depth; add ruling domain; **replace the surfaced Yin/Yang chip with the two-faces model** (also closes a pre-existing locked-rule jargon violation). Note §AM.8/D3 6-row reconciliation is a separate D13 item.
- **`Design/manifest.md`**: add `FacesScreen`, `PersonaCard` (presence-frame variants), ruling-domain atom, persona art (10 × element variants).
- **`brief-reading-tab.md`**: add the Faces prologue, ruling domain, persona-scoped reading, by-math faces, acceptance criteria.
- **`00-MASTER-CONTEXT.md`**: add Faces prologue + ruling domain to the IA map/route map.
- **`DES_13_Design_Audit_Backlog.md`**: log v2.1 as **D14, extending D13**.

### Dispositions (C1–C4) — annotations (PDFs can't be edited in place; add index/sidecar notes)
- `Reading Schema.pdf` → "SUPERSEDED by REA_14_Reading_Generation_Schema (v2.1)."
- 5 journey PDFs → "Historical/tone reference; not IA truth."
- `Archetype_Reference.pdf` → "Marketing/resonance only; not the persona taxonomy."
- `BaZi_Analysis_Bible` 7-pattern → "Superseded by REA_01/REA_14 5-pattern."

---

## 4 · Impact summary
- **Corpus:** ~12,200w → **~18k** (dominant + absent bespoke, present derived; +~700w ruling-domain lines). Driver = presence-frame registers, not key count.
- **Art:** 10 base Council character concepts × per-element recolor variants (covers 50 contexts).
- **Accuracy:** the polarity-blind resolver is a real user-facing defect (yin-weighted elements show the wrong persona); the fix uses data already computed — no new birth inputs.

## 5 · Deferred / still-open (separate tracks)
- **⏳ POST-REVIEW + POST-ENGINE: REVISIT REA_14 Reading Schema — finalize the reading content design.** The schema (`REA_14_Reading_Generation_Schema.md`) is **provisional** until two things land: **(a)** the full doc review completes, and **(b)** the engine code fix runs (recomputing the 庚 reference chart's *real* faces, the per-element polarity splits, and confirming register + positional-data feasibility). Both surface concrete realities that will reshape the reading content design — the FACES content, the presence-frame registers, the `rulingDomain` lines, and the positional (宫位) readings. **Do a final REA_14 reconciliation pass then, before authoring any corpus.**
- **⏳ POST-DOC: APP / CODE RECONCILIATION PASS (circle back after all doc edits).** The doc edits do NOT fix the running app. After the doc review completes, a code/data pass is required to bring the app in line with v2.1: (a) the engine rewire (`getElementPolaritySplit`, retire `tenGodForEnergy`, `buildEnergyChart` faces, recompute 庚 chart); (b) **propagate the 3→2 layer model** and the **canonical persona-name fix** into the generation source/data (`DomEnergyTg_Data.js`, `READING_ANGLES`, `TG_PERSONA`, etc. — grep the live app for the aliases The Flow/Harvest/Trial/Standard/Well/Root and 偏财's "The Field"); (c) build the new surfaces (FacesScreen, PersonaCard registers, ruling-domain atom). Must be done as a verified pass (live-deploys via the Stop hook).
- **D5–D8 (Cece-derived virality/rarity/cohort)** — still pending; depend on a population-distribution dataset that does not yet exist.
- **§AM.8 / D3 six-row → five-element catalogue** — D13's ongoing reconciliation; not forced by v2.1.
- **Profile DB gap:** 正印 (The Sage) card missing from the DB body — backfill before content reconstruction (per concept inventory V6).
