# Elementum · Identity Compound Vocabulary (Layer-3 Keywords)

> **Status: OWNER-LOCKED vocabulary (2026-07-02) · design record for the identity-card / Five Energies redesign.**
> Branch: `feat/identity-card-design`. Companion to DOC2 §3 (the 50-key taxonomy) — this doc records the
> plain-English *meaning layer* decisions made 2026-07-01 → 2026-07-02 and the reasoning chain behind them.
> ⚠ DOC2 amendment pending: the "Shareable code / MBTI resonance" future fields in DOC2 §2 are being realized
> by this work; DOC2 itself is LOCKED and untouched until the owner folds this in.

---

## §1 — Problem statement (owner brief, 2026-07-01)

The dominance wheel shows five elements + percentages, but a Western user's perception of what these
mean is ~zero. Goal: make the identity as first-glance graspable and viral as MBTI — "when people talk
about the day master and five elements, people know what they represent from the first glance just as
the four letters mean in MBTI." The meaning must be rooted in Ten-God theory (e.g. 印 = support and
nourishment, but dominant 偏印 means something else), in non-jargon straightforward English.

**Owner constraints (locked):**
1. Do NOT change the design of the dominance wheel.
2. Do NOT compromise the reading catalogue.

**Owner architecture (2026-07-02):** an advanced MBTI represented in the energy wheel — instead of four
letters (INTJ), a **core A with five relations: A‑12345**. Each digit = one element's dominance + its
ten-god relation, in plain English (e.g. "your Earth is 33% with 偏印 dominant — what does 土偏印 represent?").

---

## §2 — The two-system clash, and its resolution: COMPOUND, don't pick

**The clash (found 2026-07-01 by content audit):** two conflicting persona systems were live —
- *Element-essence* (`content/reading/readingContent.js` `ENERGY_CONTENT`): DM-blind, one fixed persona
  per element (metal→"The Magistrate", earth→"The Alchemist", fire→"The General", wood→"The Cultivator",
  water→"The Strategist"; Cultivator/Strategist aren't in the canonical registry; stale "Arbiter" gate line).
- *Ten-god faces* (v2.1, `TG_PERSONA`/`FACE_CARD` via `resolveElementFaces`): DM-relative, polarity-aware.
  Same Metal = "The Twin" on the faces page and "The Magistrate" on the element Read card → contradiction
  fatal to the MBTI-clarity promise.

**Resolution (owner, 2026-07-02): both systems compound — neither wins.** Per DOC2 §3, the meaning unit
is the 50-key `[element]_[tenGod]` compound: the **element is the substance/flavor**, the **ten-god is
the relation to the core**. `ENERGY_CONTENT` (element-only) and `FACE_CARD` (god-only) were both
half-implementations of DOC2's compound; they merge into the 50 cells rather than fight over the slot.
The Day Master is the core noun; the five elements are its relations. **A‑12345 = DOC2's Layer 1
(core, `stem_band_pattern`) + Layer 2 (the five `element_tenGod` relations).**

---

## §3 — The three-layer identity architecture (owner, 2026-07-02)

| Layer | What it shows | Ambiguity | Surface |
|---|---|---|---|
| **1 · Whole picture** | Day Master (self) + five-element dominance wheel — the energy condition as a gestalt | **Singular** — one node per element | The wheel (UNCHANGED) |
| **2 · Diagnosis** | Per energy: what it does to the self — its ten-god *function* + catalyst/friction *role*; and what's inside: the yin/yang faces with presence/dominance | Function singular; **faces split 1–2** | Per-energy card (yin/yang weight bar) |
| **3 · Meaning** | The verdict/keyword — what the ten-god in that energy means | **Two opposite keywords** possible (the 正/偏 faces) | Keyword chips + per-cell reading |

**Load-bearing insight:** for a fixed Day Master, element→family is SINGULAR (for a Metal DM, Earth is
always Resource 印 — no ambiguity at the element level). Only the *character* splits (up to 2 faces by
polarity), and that split lives at Layers 2–3, **never on the wheel**. The engine already returns it
(`resolveElementFaces` → `faces[{god,weight,polarity}]`, `leadGod`, `absentGod`).

**Answer to "does the wheel need redesign?" — No.** The two-god split is a keyword problem, not a wheel
problem. Optional at most: a singular role tint (catalyst/friction) per node — an addition, not a redesign.

**Build order (dictated by the architecture):** L3 keywords → L2 diagnosis card → L1 wheel (unchanged).

---

## §4 — LOCKED: the ten face keywords (Layer 3 vocabulary)

One sharp trait-noun per ten-god face. The two faces of each family are deliberate **opposites** — the
yin/yang split made legible. Owner-locked 2026-07-02 after wordsmithing (Ease→Fluency, Reach→Enterprise
[Venture rejected: act-noun, drifts into Rival's risk territory], Substance→Prudence [not a person-trait]).

| Family | Face | 汉字 | Charge | **Keyword** |
|---|---|---|---|---|
| Self 比劫 | The Twin | 比肩 | steady | **Independence** |
| | The Rival | 劫财 | fierce | **Rivalry** |
| Output 食伤 | The Artisan | 食神 | gentle | **Fluency** |
| | The Virtuoso | 伤官 | fierce | **Brilliance** |
| Wealth 财 | The Horizon | 偏财 | dynamic | **Enterprise** |
| | The Steward | 正财 | gentle | **Prudence** |
| Authority 官杀 | The General | 七杀 | fierce | **Force** |
| | The Magistrate | 正官 | gentle | **Order** |
| Resource 印 | The Alchemist | 偏印 | fierce | **Insight** |
| | The Sage | 正印 | gentle | **Nurture** |

**Pair oppositions:** Independence↔Rivalry (standing alone vs measuring against others) ·
Fluency↔Brilliance (effortless vs dazzling-and-forced) · Enterprise↔Prudence (venturing to seize vs
managing to keep) · Force↔Order (raw power vs legitimate structure) · Insight↔Nurture (self-made knowing
vs received support).

**Valence model:** each face's charge (gentle/fierce/steady/dynamic) and gift↔shadow spectrum are
INTRINSIC and fixed (Layer 3). Where a person sits on the spectrum is tipped by the chart **role**
(catalyst/friction/needed/missing — Layer 2, computed per chart; role ≠ %). A 33% force can be friction;
a 5% force can be the needed 用神. Never conflate charge with chart benefit; frame verdicts as direction
("you run heavy on ground, light on fire"), never judgment.

Gift/shadow poles per face (draft register, to refine during 50-cell authoring):
- 比肩 Independence: + trusts own read, finishes without rescue · − isolates, walls others out
- 劫财 Rivalry: + bold, rises against a worthy equal · − comparison-driven, burns resources
- 食神 Fluency: + fluent, warm, generous talent · − complacent, indulgent, coasts
- 伤官 Brilliance: + dazzling originality, breaks stale rules · − rebels for its own sake, over-exposes
- 偏财 Enterprise: + sees openings, resourceful, generous · − scattered, over-extends, holds nothing long
- 正财 Prudence: + builds slowly, loyal, compounds · − clings, hoards, "enough" never comes
- 七杀 Force: + decisive, brave under fire, forged sharp · − self-punishing, domineering, burnout
- 正官 Order: + integrity, responsibility, trusted · − rigid, over-conforms, keeps rules past their reason
- 偏印 Insight: + intuition, unorthodox mastery, transmutes · − detached, overthinks, starves enjoyment
- 正印 Nurture: + protective, patient, held and holding · − dependency, over-protection, inertia

---

## §5 — LOCKED: the five element modifiers

One trait-adjective per element; `[modifier] + [keyword]` yields every 50-cell glance-label by formula.
Owner-locked 2026-07-02 (Wood: **Vital** chosen over Growing — gerund reads as quantity, not flavor).

| Element | **Modifier** | Rationale |
|---|---|---|
| Metal 金 | **Sharp** | the edge — clear, precise, cutting |
| Wood 木 | **Vital** | alive, reaching — combines cleanly (Vital Force, Vital Prudence) |
| Fire 火 | **Ardent** | drive + radiance — passionate, not merely warm |
| Earth 土 | **Grounded** | the centre — steady, holding |
| Water 水 | **Deep** | the descent — depth, quiet adaptability |

**The 50 glance-labels (formula-derived).** Examples: 土偏印 = **Grounded Insight** · 土正印 = **Grounded
Nurture** · 水食神 = **Deep Fluency** · 火七杀 = **Ardent Force** · 金比肩 = **Sharp Independence** ·
木正财 = **Vital Prudence**. The full 50 = {Sharp, Vital, Ardent, Grounded, Deep} × {Independence,
Rivalry, Fluency, Brilliance, Enterprise, Prudence, Force, Order, Insight, Nurture} — each cell's valid
DM implied per DOC2 §3's 50-key table.

**Reference reading of a compound (土偏印, the worked example):** 印 = the force that backs and feeds
you; 偏 = the indirect face — self-generated, intuitive, unorthodox support (The Alchemist; classically
can "steal the food" 梟印奪食); 土 = stable, grounding, patient. Compound: *a self-made, grounded,
intuitive footing — you hold yourself up.* Role flips the verdict: at `needed` = "a precious inner
footing — lean in"; at `friction` 33% on a strong self = "over-grounded; the comfort that stalls the
blade" (the reference Blade's actual case, DOC2 §3 reference chart).

---

## §6 — Worked compounds (A‑12345 examples)

**庚 The Blade (reference chart, DOC2 §3):** Metal 23% 金比肩 **Sharp Independence** (self) · Wood 33%
木正财 **Vital Prudence** (drive, catalyst) · Earth 33% 土偏印 **Grounded Insight** (ground, friction) ·
Water 6% 水食神 **Deep Fluency** (voice) · Fire 5% 火七杀 **Ardent Force** (forge, needed 用神).

Illustrative (faces/percentages notional): **甲 Oak** — Vital Independence · Grounded Prudence · Deep
Nurture · Sharp Order · Ardent Fluency. **丙 Sun** — Ardent Independence · Grounded Fluency · Sharp
Enterprise · Vital Nurture · Deep Force. **戊 Mountain** — Grounded Independence · Deep Prudence · Sharp
Brilliance · Ardent Nurture · Vital Force. **壬 Ocean** — Deep Independence · Vital Brilliance · Ardent
Enterprise · Sharp Insight · Grounded Order.

**Why the compound is the unit — the "Sharp" rotation:** the same Metal reads Sharp Independence (Blade,
self) · Sharp Order (Oak, pressure) · Sharp Enterprise (Sun, drive) · Sharp Brilliance (Mountain, voice)
· Sharp Insight (Ocean, support). Element alone could never say this; element × ten-god is the engine of
the whole system.

---

## §7 — Open decisions & pending work

| Item | Status |
|---|---|
| Deeper per-cell readings (translate DOC2 §3's 50 semi-jargon "structural interactions" to plain English, role-aware) | NEXT — not started |
| Layer-2 diagnosis card design (function + role + yin/yang face bar) | after 50 cells |
| Surface valence framing (collapse 5 engine roles → 3 readable states: fuels / balanced / overloads-or-lacking?) | proposed, not locked |
| Code ordering (function-ordered code vs dominance-ordered reading — two views) | proposed, not locked |
| Speakable headline ("Core + defining relation", e.g. "a Blade, Alchemist-heavy") | proposed, not locked |
| Legacy `ENERGY_CONTENT` merge/retire into the 50 cells | required by §2, not implemented |
| Remaining archetype worked examples (乙 Vine · 丁 Candle · 己 Field · 辛 Jewel · 癸 Rain) | not drafted |
| DOC2 §2 amendment (Shareable code / MBTI resonance realized by this system) | owner to fold in |

**Do-not-break:** `DominanceWheel` consumes only `{el,presence,roles,major}` — the compound layer never
touches it. `EnergyShelf` catalogue anatomy (hook/pol/role) is the user-facing contract; the compound
enriches tiles, never replaces the catalogue.

---

## Document Metadata

| | |
|---|---|
| **Document** | Identity Compound Vocabulary — Layer-3 keyword system |
| **Version** | 1.0 · 2026-07-02 |
| **Status** | §4 + §5 vocabulary OWNER-LOCKED · §7 items open |
| **Audience** | Owner, engineers, content generation |
| **Purpose** | Record of the compound (core + five relations) identity decisions: the two-system clash resolution, the three-layer architecture, the locked 10 face keywords + 5 element modifiers, and the 50-cell glance-label formula |
| **Companion to** | DOC2 §3 (50-key taxonomy) · READING_V2.1_RECONCILIATION_AUDIT.md · DOC6 |
