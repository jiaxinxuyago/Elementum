# D13 · Favorable-Element Role Classifier — spec for sign-off

**Purpose.** Turn the engine's chart output into each energy's `roles[]` + `major` flag for the dominance wheel and energy tiles (§9-item-2 of the handoff). Deterministic, grounded in the existing engine (`CATALYST_MAP`, GEN/CTL relations, `getEnergyBand`), and verified to reproduce the Blade demo exactly.

**Vocabulary (locked):** the down-arrow role is **Friction** (our concept-inventory canonical), not "Resistance." "Resistance" survives only as the internal CSS class alias `k-res` / `rl-res`.

> **[OWNER RULING] The classifier vocabulary is INTERNAL — never surfaced.** The Five Relations (self / resource / output / wealth / officer) and the 用神/忌神 rule are computation scaffolding only; no user-facing string ever shows them. Users see: the **roles** as glyphs/captions (Core · Catalyst · Friction · Missing · Ally) in P1–P3, and the **personas + official Ten-God names** (The Alchemist, etc.) deeper in P6/P7. Engine taxonomy never reaches the screen.

---

## 1 · Inputs (all already produced by the engine)

| Input | Source |
|---|---|
| `dmEl` — Day Master element | `chart.dayMaster.element` |
| `band` — concentrated / balanced / open | `getEnergyBand(chart.dayMaster.strength)` |
| `presence[el]` — 0–100, five sum to 100 | normalize `chart.elements[el].score` (the Reveal blueprint already does this) |
| relations | `GEN = {Wood:Fire,Fire:Earth,Earth:Metal,Metal:Water,Water:Wood}` · `CTL = {Wood:Earth,Earth:Water,Water:Fire,Fire:Metal,Metal:Wood}` |

## 2 · The five relations of element X to the Day Master D

| Relation | Test | BaZi (Ten-God family) |
|---|---|---|
| **SELF** | `X === D` | 比劫 |
| **RESOURCE** | `GEN[X] === D` (X generates D) | 印 |
| **OUTPUT** | `GEN[D] === X` (D generates X) | 食伤 |
| **WEALTH** | `CTL[D] === X` (D controls X) | 财 |
| **OFFICER** | `CTL[X] === D` (X controls D) | 官杀 |

## 3 · Role rule — by band

The Day Master's band sets which relations are **favorable (catalyst)** vs **unfavorable (friction)** — the classic strong/weak 用神 logic:

| Band | DM condition | **Catalyst** (favorable) | **Friction** (unfavorable) |
|---|---|---|---|
| **concentrated** | strong / over-supplied → wants draining | OUTPUT · WEALTH · OFFICER | SELF · RESOURCE |
| **open** | weak / under-supplied → wants support | RESOURCE · SELF | OUTPUT · WEALTH · OFFICER |
| **balanced** | near equilibrium → gentle | `CATALYST_MAP[D][balanced]` pair only | *(none by default — see §6 open item)* |

Then layer the universal roles on top:

- **core** — always on `X === D` (the Day Master element). Can co-hold Friction (a strong DM is its own friction) — matches the demo's Metal = `[core, friction]`.
- **missing** — `presence[X] ≈ 0` (engine `present===false` or rounded 0). **Orthogonal**: an element can be missing *and* a catalyst (demo Fire = `[missing, catalyst]`).
- **major** — exactly one catalyst gets the emphasis ring: `CATALYST_MAP[D][band][0]` (the primary favorable; if that equals `D`, use `[1]`). In the demo, `CATALYST_MAP[Metal][concentrated] = [Fire, Water]` → **Fire is major**.
- **ally** — a *supportive* catalyst that is not the major (RESOURCE/SELF relation acting favorably). Not present in the Blade demo; defined for completeness, used mainly on balanced/weak charts.

## 4 · Worked example — proves it reproduces the demo (庚 / Metal / concentrated)

`band = concentrated` → catalyst = {OUTPUT, WEALTH, OFFICER}, friction = {SELF, RESOURCE}. `CATALYST_MAP[Metal][concentrated] = [Fire, Water]` → major = Fire.

| El | Relation to Metal | presence | Roles (computed) | Demo wireframe | ✓ |
|---|---|---|---|---|---|
| metal | SELF | 42 | **core, friction** | `[core, resistance]` | ✓ |
| earth | RESOURCE (Earth→Metal) | 28 | **friction** | `[resistance]` | ✓ |
| water | OUTPUT (Metal→Water) | 16 | **catalyst** | `[catalyst]` | ✓ |
| wood | WEALTH (Metal克Wood) | 14 | **catalyst** | `[catalyst]` | ✓ |
| fire | OFFICER (Fire克Metal) | 0 | **missing, catalyst · major** | `[missing, catalyst]` major | ✓ |

Exact match on all five, including the dual `core+friction` and `missing+catalyst·major`.

## 5 · Output shape (the §3 data contract `energies[]`)

```js
classifyEnergyRoles(chart) → [
  { el:'metal', presence:42, roles:['core','friction'] },
  { el:'earth', presence:28, roles:['friction'] },
  { el:'water', presence:16, roles:['catalyst'] },
  { el:'wood',  presence:14, roles:['catalyst'] },
  { el:'fire',  presence:0,  roles:['missing','catalyst'], major:'catalyst' },
]
```
`applyDominanceRules(..., 'presence')` then seats + sizes them from `presence`.

## 6 · Open item for owner sign-off

**The `balanced` band.** Concentrated and open use the clean strong/weak rule above (3 catalyst / 2 friction). For **balanced** charts, classical practice is subtler (near-equilibrium → 用神 leans on 调候/seasonal or the weakest link). My proposed default: **catalyst = the `CATALYST_MAP[D][balanced]` pair (major = primary), no Friction badge, supportive non-catalysts → Ally.** This gives balanced charts a calmer wheel (fewer prescription arrows), which fits the "balanced" reading. **Confirm**, or specify a stricter friction rule for balanced.

*Everything else is deterministic and ready to implement as a pure `engine/energyRoles.js` helper.*
