# D13 · Prescription-Ribbon Content Model — spec for sign-off

**Purpose.** The ribbon is the one line under the wheel that **re-narrates whichever energy is selected** (tap a dot/tile → ribbon swaps). It must read for any chart, so the copy is keyed by **(stem × band × element)** — at least **30 templates** (10 stems × 3 bands), each carrying 5 element lines = 150 lines total.

**Voice:** conclusion-first, ≤ ~18 words, no jargon, no italics, no CJK (Part-1 rule). Term is **Friction**, never "Resistance."

---

## 1 · Line structure — two clauses

```
{ELEMENT DOMAIN PHRASE} — {ROLE CLAUSE, stem-voiced}.
```

- **Domain phrase** — FIXED per element, shared across all 30 charts (5 total, verbatim from the design):
  | El | Domain phrase |
  |---|---|
  | metal | Metal rules clarity and judgment |
  | earth | Earth rules stability and care |
  | water | Water rules depth and adaptability |
  | wood | Wood rules growth and vision |
  | fire | Fire rules drive and urgency |

- **Role clause** — VARIES by the element's role (from the classifier) **and** the day-master's voice. This is the authored part (150 of them).

## 2 · Role-clause pattern (the authoring guide)

Each clause is anchored by the element's computed role, so it always agrees with the tile's glyph:

| Role | Clause intent | Blade (庚) example |
|---|---|---|
| **core** | "this is you / your dominant force" | your dominant force, the edge that cuts to what is true |
| **catalyst** | "lean on it — it feeds you" | *(see Water/Wood below)* |
| **catalyst · major** | the one to reach for first | scarce in you, a heat you visit rather than hold |
| **friction** | "what costs you / to manage" | *(Earth/Metal — over-supply to drain)* |
| **missing** | "absent — borrow it" | folds into the Fire line below |
| **ally** | "quietly steadies you" | *(not in this chart)* |

## 3 · Worked example — the Blade row (庚 · concentrated), verbatim from the design

The fully-authored template for `geng_concentrated` (ships as-is, the demo's own lines):

| El | Role(s) | Ribbon line |
|---|---|---|
| metal | core, friction | Metal rules clarity and judgment — your dominant force, the edge that cuts to what is true. |
| earth | friction | Earth rules stability and care — your strongest ally, the ground that steadies and feeds you. |
| water | catalyst | Water rules depth and adaptability — the wisdom that flows around what it cannot move. |
| wood | catalyst | Wood rules growth and vision — the upward push toward what your strength is for. |
| fire | missing, catalyst·major | Fire rules drive and urgency — scarce in you, a heat you visit rather than hold. |

*(These five are the design's `INTRO` strings, ported verbatim. The catalogue defaults the ribbon to the selected energy — Metal on first load.)*

## 4 · The 30-template grid (authoring scope)

Rows = the 30 `(stem × band)` configs (matches schema-v2 **K1b**). Each cell = that chart's 5 element lines.

| Stem | concentrated | balanced | open |
|---|---|---|---|
| 甲 The Oak | ☐ | ☐ | ☐ |
| 乙 The Vine | ☐ | ☐ | ☐ |
| 丙 The Sun | ☐ | ☐ | ☐ |
| 丁 The Ember | ☐ | ☐ | ☐ |
| 戊 The Mountain | ☐ | ☐ | ☐ |
| 己 The Field | ☐ | ☐ | ☐ |
| 庚 The Blade | ✅ (above) | ☐ | ☐ |
| 辛 The Jewel | ☐ | ☐ | ☐ |
| 壬 The Ocean | ☐ | ☐ | ☐ |
| 癸 The Rain | ☐ | ☐ | ☐ |

**1 of 30 filled** (the worked example). The remaining 29 are the authoring task.

## 5 · Two ways to fill the other 29 (owner choice)

- **(A) Hand-authored, all 150 lines** — richest, most lyrical; the full content effort, batched with the D12 schema-v2 ribbon work. Approve-then-scale: author 甲/丙/壬 concentrated first, cold-read, then the rest.
- **(B) Pattern-assembled** — the role clause is generated from a small library of role × day-master-element phrasings, so any chart renders immediately; hand-polish the ones that matter later. Ships all 30 now at lower lyricism.

**Recommendation:** ship **B as the safety net** (every chart always has a ribbon) and **layer A on top** stem-by-stem — so the Blade is fully hand-authored today and the others upgrade from assembled → authored over time, never blank.

## 6 · Open items for sign-off

1. **A vs B** (or the hybrid above) for filling the 29.
2. **The domain phrases** (§1) — confirm the 5 are final (they're shared by every chart, so they're load-bearing).
3. **Default selection** — ribbon defaults to the **core/Metal** energy on load (matches the design). Confirm, or default to the **major catalyst** instead.
