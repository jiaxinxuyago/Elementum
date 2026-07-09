# Doc 6 — Reading Schema (v2.1) — the content model for the Five Energies surface

**Official doc since 2026-06-24** (promoted from `READING_SCHEMA_V2.md`; took the Doc 6 slot vacated by the retired Manual). The Reading Schema is the **design source of truth for the reading content model** — it dictates the fields that DES_07 (archetype fields) and DES_03/DES_06 (generation) implement, and so logically precedes them.

> **⏳ PROVISIONAL — revisit pending.** This schema is **not final**. A reconciliation pass is required after **(a)** the full v2.1 doc review completes and **(b)** the engine code fix runs — both will surface concrete realities (recomputed 庚 faces, real per-element polarity splits, register + positional-data feasibility) that finalize the reading content design (FACES, registers, `rulingDomain`, 宫位 positional reads). Do not author corpus against this spec until that pass. Tracked in `DES_09_Reading_V2.1_Reconciliation_Audit.md` §5.
**D12 Step 3 · v2 base 2026-06-10 · v2.1 polarity amendment 2026-06-24**
**Derives from:** D13 wireframe v5 (`Design/Wireframes/d13-five-energies-journey.html` — word budgets are LAW) · `DES_08_Reading_Concept_Inventory.md` Parts 1–3 · DES_01 (archetype structure) · the Profile Database (`Data/elementum_profile_database.html`).
**Replaces when frozen:** the open-ended 150-key Layer-1 batch plan (Pipeline A1 retargets to this spec).

> **⚠ v2.1 POLARITY AMENDMENT (2026-06-24 · owner-locked).** Each element resolves to one Ten-God *direction* vs the Day Master; **polarity splits that direction into up to two personas/faces**. A chart surfaces, strictly by calculation, **one face if one polarity is present, two if both are**, via a new **FACES prologue** (a persona index card: dominant-energy abstract + punchline + keywords + **ruling domain**) that sits *inside* the reading before the text-heavy R/X read. Full absence is read at the element (ghost) level — there are no manufactured latent face cards. Persona content varies by **presence frame** (dominant/present/scarce/absent). Decision record: `DES_09_Reading_V2.1_Reconciliation_Audit.md`.

---

## 1 · The derivation principle

Every card on the D13 surface decomposes into three ingredients, only ONE of which is authored:

```
card content = PERSONA CORE (authored, keyed)
             ⊕ PRESENCE FRAME (templated, 4 states)
             ⊕ ROLE BADGES + numbers (derived, never authored)
```

The engine resolves any element in any chart to its Ten-God **direction** vs the Day Master, then splits that direction by **polarity** into up to two specific gods — surfacing the **face(s) actually present** (`getDominantTenGod` + the new `getElementPolaritySplit`, calculator.js — both polarity-aware). Therefore the energy cards never need per-chart authoring: a chart is an *assembly* of keyed content, and the only per-chart logic is *which* keyed faces are present and at *what presence frame*.

**v2.1 — the two-face rule (by math).** Per element the engine emits `{ presentFaces: [{god, weight}], absentGod }`: if both polarities of the element are carried, two faces surface (dominant-weighted first); if one, a single face; the absent polarity is **not** rendered as its own card — absence is read only when the *whole element* is absent (the ghost card). The middle assembly ingredient (PRESENCE FRAME) selects the persona's register: **dominant** (full read) · **present** (derived shorter read) · **scarce/absent** (cultivation read).

**v2.1 — Identity and Ten-God cards are separate sections (decision B5).** The **Identity card reads the Day-Master stem specifically** (the elemental-self: e.g. 庚 = The Blade) — its own reading section. The **Ten-God energy cards** (the dominant energies below the energy wheel) carry the persona readings — **including the self element's two faces, The Twin (比肩) and The Rival (劫财)**, surfaced by the same two-face / by-math rule. These are **two totally separate reading sections**: Mirror/Rival are neither folded into the identity card nor dropped. All 5 elements (self included) resolve faces, so all 50 K2 keys can render.

**v2.1 — two reading axes (decision B6).** Beyond the **FACES axis** (element-dominance × polarity — which personas lead *overall*), the reading adds a **POSITION axis (宫位)**: each Ten God reads differently by the *pillar* it occupies. The engine already emits a Ten God at all 7 non-DM positions (`chart.tenGods` — polarity-correct). A positional reading **composes** the (canon-sourced) Ten-God mechanism with a **palace life-domain frame** and its polarity register — see DES_02 §2.7b. The two relational palaces — **日支 (partner / 夫妻宫)** and **时柱 (children / legacy)** — are the highest-value reads. **Authoring is cheap:** the Ten-God content is reused from K2; only the ~7 palace frames are new.

**v2.1 — the dominance → reading contract (2026-06-25).** Dominance does **not rewrite** a persona's words — it decides *which* personas surface, in *what order*, and at *what intensity register*. The persona content is keyed and authored once (K2); dominance is the assembly logic that selects and pitches it. Precisely:

- **Dominance = substance rank (旺衰), and it governs three things only:** (1) *which* faces are present (a face surfaces only if its element carries that polarity); (2) the *deck order* (self → presence desc); (3) the *presence frame / register* a present persona reads in — **dominant** energies get the full bespoke read, **present** energies a derived shorter read, **scarce/absent** the cultivation read. A more-dominant Wood does **not** swap in different Wood-persona claims — it raises that persona to the **dominant** register, so the same authored mechanism lands with more weight and length. (This is the answer to "does Wood dominance give the Wood ten-god more characteristics?" — *yes, via register and prominence, not via different content.*)
- **Substance vs function — what dominance is NOT allowed to read from.** Dominance tracks **五行 substance** only (positional 旺衰 + 真化 + relative 冲 — DEV_01 §3). **合-binding and 刑/害/破 are function/relationship texture** — they color a persona's reading (e.g. a bound energy "feels constrained," a clashed palace "destabilizes") but **must never reorder the deck or change a presence frame.** They modulate *within* a rank, never *across* ranks. A reading may name a bond/clash on a card; the engine must not let it promote or demote that card.
- **Valence ≠ intensity.** Dominance/presence-frame is the **intensity** register (how loud); the 用神 / 喜忌 layer is the **valence** register (gift vs friction, surfaced as the ↑/↓ role badges). The two are orthogonal: a scarce energy can be a high-valence gift; a dominant energy can be friction. Authoring must keep them separable — never collapse "dominant" into "good."

## 2 · The key system

| Key | Form | Count | What it carries |
|---|---|---|---|
| **K1 — stem** | `庚` | 10 | Identity: plate (name·manifesto·inscription), DM-card claims, mechanism |
| **K1b — stem × band** | `庚_concentrated` | 30 | Self-card presence reading ("how concentrated self-energy behaves") |
| **K2 — element × god** | `火_七杀` | **50** | The persona unit. **Face card (prologue):** abstract · punchline · chips · `rulingDomain`. **Reading:** R, X, gate, seeker depth — authored in presence-frame registers (dominant + absent bespoke; present derived) |
| **T — templated globals** | presence frames ×4 · cycle lines ×20 · rx-ribbon fragments ×10 · **palace frames ×7 (宫位, B6)** | ~41 | Assembly glue, slot-filled |

Why 50 is exact: per DM element, each of the 5 elements resolves to one god *pair* (2 polarity registers) → 10 pairs per DM element × 5 DM elements = 50 valid (element, god) combinations. This is DES_01's Layer-2 taxonomy, unchanged — **the D13 surface finally gives Layer 2 its native home.**

> **v2.1 — the 50 stays 50, all render.** The 50 keys are *all* valid (element, god) pairs across all Day Masters (10 per DM, non-overlapping). For one chart only that DM's 10 keys are ever in play, surfaced as faces by weight (up to two per element). The self element's faces (比肩 The Twin / 劫财 The Rival) render as **dominant-energy Ten-God cards in a section separate from the Identity card** — which reads the Day-Master stem specifically (decision B5). **No new keys.** Corpus growth comes from the **presence-frame registers** (below), not key count.

## 3 · Surface → content map

| Surface slot (budget) | Key | Count | Source today |
|---|---|---|---|
| Plate: name (≤3w) · manifesto (≤5w) | K1 | exists ×10 | `STEM_CARD_DATA.identity` ✓ |
| Plate: inscription (4–6字 + 10–16w) | K1 | drafted ×10 | wireframe v5 table |
| DM card: claims (10–16w ×3) | K1 | ×10 · claim 1 = inscription | NEW (profile DB Part One register) |
| DM card: mechanism (≤30w) | K1 | ×10 | NEW (classical anchors exist as source) |
| Self energy card: face (≤8w) + presence (≤30w) | K1b | ×30 | partial (`IDENTITY_SATURATION_READING` exists per stem×band — migrate) |
| **FACES prologue** (all 5 elements; 1–2 persona cards/element, by math): abstract / conclusion (≤8w) | K2 | ×50 | NEW — the persona index card's headline (dominant-energy abstract) |
| Faces prologue: punchline / persona line (≤20w) | K2 | ×50 | NEW — persona name + D12a definition + personal turn |
| Faces prologue: chips / keywords (≤4w ea) | K2 | ×50 | NEW — persona behavioral tags |
| Faces prologue: **ruling domain** (≤14w) | K2 | ×50 · DM-relative | NEW — the "what is this about" life-area line (decision B2) |
| Energy reading: R layer (≤30w) | K2 | ×50 · **by presence frame** | NEW — dominant + absent bespoke, present derived |
| Energy reading: X layer (≤30w) | K2 | ×50 · scarce/absent = cultivation | NEW — absorbs Seasonal Calibration content |
| Energy reading: gate teaser (≤25w) | K2 | ×50 | NEW |
| Seeker depth: shadow (≤40w) · work (≤30w) · bonds (≤30w) · season (≤30w) | K2 | ×50 ×4 blocks | **TG_CARD_DATA is the source** — shadows/outputs/frictions/domainSignatures/sixRelations exist per god ×10; specialize per element pairing |
| Rx ribbon (≤14w) | T | template + 10 fragments (5 el × lift/wear) | NEW template |
| Hour chip (≤12w) | T | ×1 | wireframe ✓ |
| Cycle expander (label ≤10w + line ≤20w) | T | ×20 (directional element pairs ×2 relations) | NEW — concept 2.1's teaching beats |
| Pillar Chart: pattern conclusions (≤25w) | T | per pattern type (~6) | partial (`ChartPatternsDetail` templates — recopy) |
| **Positional reading** (宫位 × 十神): per-pillar card — palace frame (≤14w) × the position's Ten-God persona (reused from K2) | T + K2 | ×7 positions | NEW (B6) — composes `PALACE_FRAMES` × `chart.tenGods`; per-pillar TG data already computed |

## 4 · Schema v2.1 field spec

> **Implementation chain.** This field spec is the **design source of truth** for the reading content model. `archetypeSchema.js` (code) implements it — types, copy caps, tiers, `varyBy` cardinality — and **DES_07** mirrors that for designers, grouped by UI surface. Order: freeze this spec → rewrite `archetypeSchema.js` to it (code pass) → regenerate DES_07. Until then, `archetypeSchema.js` + DES_07 still describe the legacy v0.x model.

```js
// K1 — extend existing STEM_CARD_DATA.identity
identity: {
  archetypeName,                      // ≤3w (exists)
  manifesto,                          // ≤5w·≤5w split " · " (exists)
  inscription: { zh, en },            // 4–6字 · 10–16w  (NEW)
  claims: [c1, c2, c3],               // 10–16w each; c1 === inscription.en (NEW)
  mechanism,                          // ≤30w (NEW)
}

// K1b — SELF_CARD_DATA[stem][band]
selfCard: { face, presence }          // ≤8w · ≤30w

// K2 — ENERGY_CARD_DATA[`${element}_${god}`]  — THE persona unit (×50)
energyCard: {
  // — FACES prologue (the persona index card, shown before the text reading) —
  face,                               // ≤8w  — dominant-energy abstract / conclusion, never a category
  persona,                            // ≤20w — punchline: "X in you is The {Persona} — {definition}. {turn}."
  chips,                              // 5 × ≤4w — persona behavioral keywords
  rulingDomain,                       // ≤14w — DM-relative life-area line ("your wealth & desire"); per persona ×50 (B2)
  // — READING (text-heavy), authored per PRESENCE FRAME (B1) —
  registers: {
    dominant: { r, x, gate, seeker: { shadow, work, bonds, season } },  // BESPOKE — full read (≤30/30/25 · 40/30/30/30w)
    absent:   { r, x, gate, seeker: { shadow, work, bonds, season } },  // BESPOKE — cultivation/borrow read (whole-element-absent / ghost)
    // `present` register = DERIVED at build time (compressed from `dominant`) — NOT authored
    // `scarce` = a light derived blend toward `absent`
  },
}

// T — templated globals
PRESENCE_FRAMES: { dominant, present, scarce, absent }   // ≤20w patterns, slot-filled
CYCLE_LINES[`${elA}_${rel}_${elB}`]: { label, line }     // ≤10w · ≤20w — 20 entries
RX_FRAGMENTS[element]: { lift, wear }                    // assemble the ribbon
PALACE_FRAMES[position]: { domain, relationalReframe }   // ≤7 · year/month/dayBranch/hour life-domains (POSITION axis 宫位, B6)
// positional reading = PALACE_FRAMES[position] × chart.tenGods[position] (K2 persona, reused) × polarity — composed, not authored per cell
```

**Derived, never authored:** polarity-aware face resolution per element (`{presentFaces:[{god,weight}], absentGod}` — which 1–2 faces show, by math) · the `present`/`scarce` registers (compressed from `dominant`) · role badges (core/strongest/catalyst ↑/friction ↓/scarce/ghost) · percentages + node sizes · deck order (self → presence desc) · hour-unknown "~" state · share-card composition (= the plate).

## 5 · What this retires / migrates

| Today | Fate |
|---|---|
| `energy.keywords` (alias) | DELETE — `chips` canonical |
| `dominantEnergy` / `seasonalCalibration` / `liunianSignatures` groups (`status:'internal'`) | DELETE from schema — superseded by K2 + Calendar surface |
| `elementIntro` punch/expand | RE-BUDGET (punch 10–14w → DM-card claim register; expand 18–24w → Self-card presence) per format audit |
| `TG_CARD_DATA` (10 gods, rich) | KEEP as the **generation source** for K2 — not rendered directly once energy cards ship |
| `IDENTITY_SATURATION_READING[stem][band]` | MIGRATE → `selfCard.presence` |
| Old catalogue row content (Forces/Dominant/Seasonal intros) | RETIRE with the rows |

## 6 · Batch sizing — the new content reality

| Unit | Count | Words (max) |
|---|---|---|
| K1 extensions (claims ×2 + mechanism) | 10 × ~62w | ~620w |
| K1b self cards | 30 × ~38w | ~1,140w |
| **K2 personas** (all 50) — prologue (face/persona/chips/rulingDomain ~62w) + **dominant** register (~195w bespoke) + **absent** register (~85w bespoke); `present` derived | **50 × ~340w** | **~17,000w** |
| Templated globals | ~34 units | ~700w |
| Palace frames (宫位 / POSITION axis, B6) | 7 × ~24w | ~170w |
| **Total authored corpus** | | **≈19,700 words (~1.6× v2)** |

v2.1 reuse reality: TG_CARD_DATA (10 gods) seeds at most the **`dominant` register of one face** per element — roughly 1 of the ~3 authored slots per persona (prologue + dominant + absent); the rest is net-new. Approve-then-scale: **first recompute the 庚 reference chart's faces with the polarity-aware resolver** — the old `金_比肩 · 土_偏印 · 水_食神 · 木_偏财 · 火_七杀` set is the *polarity-blind* output and must not seed authoring. Recompute **all 5 elements'** present faces (the self element 金 surfaces 比肩/劫财 as dominant-energy Ten-God cards, in a section separate from the Identity card — B5); generate the 庚 chart's present faces, cold-read, then bulk the remainder.

## 7 · Decisions

### Decided — v2.1 (2026-06-24, owner-locked · record: `DES_09_Reading_V2.1_Reconciliation_Audit.md`)
1. **K2 polarity — RESOLVED → full 50.** Each polarity face is its own persona; no 25-family collapse. (Was open decision #1.)
- **A1** Faces = a reading **prologue**, not a new IA node (§AM.1 intact).
- **A2** Faces shown **strictly by math** (1 or 2 present); no manufactured latent face cards; whole-element absence read at the ghost level.
- **A3** Engine **polarity-aware rewire** (retire `tenGodForEnergy`; emit `{presentFaces, absentGod}`).
- **B1** Registers = presence frames; **dominant + absent bespoke, present derived**.
- **B2** `rulingDomain` authored **per persona (×50), DM-relative**.
- **B3** Persona names = 2026-06-10 locked set; other sets are non-surfacing aliases.
- **B4** Art = 10 Inner-Council character concepts, recolored per element.
- **B5** **Identity card and Ten-God cards are separate reading sections.** The Identity card reads the Day-Master stem specifically (元-self, e.g. 庚 = The Blade). The self element's faces — **The Twin (比肩) / The Rival (劫财)** — render as **dominant-energy Ten-God cards below the energy wheel**, NOT folded into identity and NOT dropped. All 5 elements resolve faces; all 50 K2 keys can render. (Resolves former open #2.)
- **B6** **Position (宫位) is a first-class reading axis** (alongside the FACES dominance×polarity axis). Each Ten God reads by the pillar it occupies; a positional reading = **canon Ten-God mechanism × palace life-domain × polarity** (DES_02 §2.7b). Composes from K2 + ~7 new `PALACE_FRAMES`; per-pillar TG data already in `chart.tenGods`. **日支 (spouse/夫妻宫)** and **时柱 (children/legacy)** are the highest-value reads. Elevates 宫位 from VERIFY-ONLY (DES_02) to a behavioral driver — methodology now blends 子平 (格局) + 宫位论法.

### Still open
3. **Seeker depth block set:** shadow/work/bonds/season proposed (from TG_CARD_DATA's existing dimensions). Confirm or re-pick (e.g., add `sixRelations` material as a "people" block).
4. **`blocks[]` (the old 5–11 reading blocks per stem):** retire entirely, or migrate the best material into K2 seeker blocks during generation? **Recommend: mine during generation, then retire.**

---

*Next: finish the v2.1 doc reconciliation (DEV_01–10, DES_04/manifest/briefs) → engine rewire + recompute the 庚 reference chart → retarget Pipeline A2 to K2 (per-persona prologue + dominant/absent registers + rulingDomain) → approve-then-scale with the 庚 chart's recomputed faces.*
