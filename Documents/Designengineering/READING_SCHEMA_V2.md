# Reading Schema v2 — the content model for the Five Energies surface

**D12 Step 3 (draft for owner markup)** · 2026-06-10
**Derives from:** D13 wireframe v5 (`Design/Wireframes/d13-five-energies-journey.html` — word budgets are LAW) · `READING_CONCEPT_INVENTORY.md` Parts 1–3 · DOC2 (archetype structure) · the Profile Database (`Data/elementum_profile_database.html`).
**Replaces when frozen:** the open-ended 150-key Layer-1 batch plan (Pipeline A1 retargets to this spec).

---

## 1 · The derivation principle

Every card on the D13 surface decomposes into three ingredients, only ONE of which is authored:

```
card content = PERSONA CORE (authored, keyed)
             ⊕ PRESENCE FRAME (templated, 4 states)
             ⊕ ROLE BADGES + numbers (derived, never authored)
```

The engine already resolves any element in any chart to **one specific Ten God** (`getDominantTenGod`, calculator.js — polarity-aware). Therefore the energy cards never need per-chart authoring: a chart is an *assembly* of keyed content.

## 2 · The key system

| Key | Form | Count | What it carries |
|---|---|---|---|
| **K1 — stem** | `庚` | 10 | Identity: plate (name·manifesto·inscription), DM-card claims, mechanism |
| **K1b — stem × band** | `庚_concentrated` | 30 | Self-card presence reading ("how concentrated self-energy behaves") |
| **K2 — element × god** | `火_七杀` | **50** | The energy card core: face line, persona line, R, X, gate, seeker depth |
| **T — templated globals** | presence frames ×4 · cycle lines ×20 · rx-ribbon fragments ×10 | ~34 | Assembly glue, slot-filled |

Why 50 is exact: per DM element, each of the 5 elements resolves to one god *pair* (2 polarity registers) → 10 pairs per DM element × 5 DM elements = 50 valid (element, god) combinations. This is DOC2's Layer-2 taxonomy, unchanged — **the D13 surface finally gives Layer 2 its native home.**

## 3 · Surface → content map

| Surface slot (budget) | Key | Count | Source today |
|---|---|---|---|
| Plate: name (≤3w) · manifesto (≤5w) | K1 | exists ×10 | `STEM_CARD_DATA.identity` ✓ |
| Plate: inscription (4–6字 + 10–16w) | K1 | drafted ×10 | wireframe v5 table |
| DM card: claims (10–16w ×3) | K1 | ×10 · claim 1 = inscription | NEW (profile DB Part One register) |
| DM card: mechanism (≤30w) | K1 | ×10 | NEW (classical anchors exist as source) |
| Self energy card: face (≤8w) + presence (≤30w) | K1b | ×30 | partial (`IDENTITY_SATURATION_READING` exists per stem×band — migrate) |
| Energy card: face / deck line (≤8w) | K2 | ×50 | NEW |
| Energy card: persona line (≤20w) | K2 | ×50 | NEW — persona name + D12a definition + personal turn |
| Energy card: R layer (≤30w) | K2 | ×50 | NEW — from TG_CARD_DATA gifts/hiddenDynamic register |
| Energy card: X layer (≤30w) | K2 | ×50 (absent keys: cultivation register) | NEW — absorbs Seasonal Calibration content |
| Energy card: gate teaser (≤25w) | K2 | ×50 | NEW |
| Seeker depth: shadow (≤40w) · work (≤30w) · bonds (≤30w) · season (≤30w) | K2 | ×50 ×4 blocks | **TG_CARD_DATA is the source** — shadows/outputs/frictions/domainSignatures/sixRelations exist per god ×10; specialize per element pairing |
| Rx ribbon (≤14w) | T | template + 10 fragments (5 el × lift/wear) | NEW template |
| Hour chip (≤12w) | T | ×1 | wireframe ✓ |
| Cycle expander (label ≤10w + line ≤20w) | T | ×20 (directional element pairs ×2 relations) | NEW — concept 2.1's teaching beats |
| Pillar Chart: pattern conclusions (≤25w) | T | per pattern type (~6) | partial (`ChartPatternsDetail` templates — recopy) |

## 4 · Schema v2 field spec

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

// K2 — ENERGY_CARD_DATA[`${element}_${god}`]  — THE central new unit (×50)
energyCard: {
  face,                               // ≤8w  — a conclusion, never a category
  persona,                            // ≤20w — "X in you is The {Persona} — {definition}. {turn}."
  r,                                  // ≤30w — one specific behavioral truth
  x,                                  // ≤30w — prescription (absence keys: cultivation)
  gate,                               // ≤25w — names what's behind it
  seeker: { shadow, work, bonds, season },  // ≤40/30/30/30w — gated
}

// T — templated globals
PRESENCE_FRAMES: { dominant, present, scarce, absent }   // ≤20w patterns, slot-filled
CYCLE_LINES[`${elA}_${rel}_${elB}`]: { label, line }     // ≤10w · ≤20w — 20 entries
RX_FRAGMENTS[element]: { lift, wear }                    // assemble the ribbon
```

**Derived, never authored:** god resolution per element · role badges (core/strongest/catalyst ↑/friction ↓/scarce/ghost) · percentages + node sizes · deck order (self → presence desc) · hour-unknown "~" state · share-card composition (= the plate).

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
| **K2 energy cards (full)** | **50 × ~195w** | **~9,750w** |
| Templated globals | ~34 units | ~700w |
| **Total authored corpus** | | **≈12,200 words** |

Versus the old 150-key open-ended plan: **smaller, exactly scoped, and 10 of the 50 K2 god-cores already exist in TG_CARD_DATA + the Profile Database** — the generation pipeline's job is *specializing each god core into its 5 element contexts*, not inventing from nothing. Approve-then-scale: generate the 庚-chart's 5 cards first (金_比肩 · 土_偏印 · 水_食神 · 木_偏财 · 火_七杀), cold-read, then bulk the remaining 45.

## 7 · Open decisions (owner)

1. **K2 polarity collapsing:** author all 50, or author 25 *family* cores (5 el × 5 families) + a polarity inflection line? Full 50 is cleaner (D12a personas are per-god); 25+inflection halves the batch. **Recommend: full 50.**
2. **Self-element god pair (比肩/劫财):** does the Self card carry its Mirror/Rival reading as a depth layer (sibling-energy in your own element), or is self-presence (K1b) enough? **Recommend: K1b only for launch; Mirror/Rival as a Seeker depth block later.**
3. **Seeker depth block set:** shadow/work/bonds/season proposed (from TG_CARD_DATA's existing dimensions). Confirm or re-pick (e.g., add `sixRelations` material as a "people" block).
4. **`blocks[]` (the old 5–11 reading blocks per stem):** retire entirely, or migrate the best material into K2 seeker blocks during generation? **Recommend: mine during generation, then retire.**

---

*Next: owner markup → freeze schema v2 → retarget Pipeline A1 (`Scripts/batchGenerate.js`) to K2 generation (god core × element context) → approve-then-scale with the 庚 chart's 5 cards.*
