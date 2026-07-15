# Elementum · DEV_01 — Calculation Engine Specification

> **Formerly DOC1** — renamed in the 2026-07-09 documentation reorganization; historical citations of "DOC1" refer to this file (registry: Documents/README.md).

> **⚠ v2.1 RECONCILIATION (2026-06-24 · see `DES_09_Reading_V2.1_Reconciliation_Audit.md`).** Engine deltas: (1) the reading surface needs a first-class **per-element resolution output** `{ element: { presentFaces: [{god, weight}], absentGod } }` — which 1–2 polarity faces are present, by weight. (2) Add **`getElementPolaritySplit()`** returning `{yangW, yinW}` per element — the data already exists inside `getDominantElementPolarity` (it accumulates both then discards the split; return both accumulators). (3) **Accuracy defect to fix:** the live reading resolver `tenGodForEnergy` (`d13ReadingResolve.js`) is polarity-blind — hard-locked to the same-polarity (偏) register, so it can never surface the 正 half; retire it for the polarity-aware path. (4) **Recompute the 庚 reference chart's faces** with the polarity-aware resolver before it seeds any authoring (the old `金_比肩 · 土_偏印 · 水_食神 · 木_偏财 · 火_七杀` set is the polarity-blind output). Pillar-level Ten Gods (`getTenGod`, §2.7) are already correct and unchanged.
>
> **🔒 Accuracy guarantee (verified against code 2026-06-24).** The v2.1 polarity work touches ONLY (a) one **additive, read-only** accessor — `getElementPolaritySplit`, exposing the `yangW`/`yinW` accumulators `getDominantElementPolarity` (`calculator.js:285`) already computes and discards — and (b) the reading-**display** layer (`d13ReadingResolve.js`, never part of the canonical calc). The calculation engine is **unchanged**: `calculateBaziChart`, element scores/weights, day-master strength, `getTenGod` (`:33`, already polarity-aware via `STEM_YIN`), `getDominantTenGod` (`:341`), and `detectPatterns` all produce the **identical Canonical JSON**. The fix only makes the energy-card *display* agree with the polarity the engine already resolves correctly — so reading accuracy can only **improve**, never regress.

---

## §1 — Architecture Overview

### 1.1 The Three-Layer Pipeline

```
LAYER 1: JavaScript Calculation Engine          ← THIS DOCUMENT
  Input:  { birthDate, birthHour, gender, location }
  Output: Canonical JSON (see §4)
  Rules:  Pure computation. No LLM. Fully deterministic.
          All 10 stems × all 5 strengths × all combinations verified.

LAYER 2: Static Content Layer
  Input:  Canonical JSON
  Output: Pre-written readings by key lookup
  See:    DES_01 — Archetype System

LAYER 3: LLM Reading Generator [FUTURE]
  Input:  Canonical JSON
  Output: Literary English readings
  Model:  claude-opus-4-20250514
  Rules:  Never calculates. Never sees raw birth data.
```

**The cardinal rule:** The LLM never sees raw birth data. It receives a fully computed, validated JSON object. If this separation breaks, readings contain calculation errors that destroy trust.

### 1.2 Energy Band Mapping

The engine maps five `strength` values to three content bands used across all content layers:

| strength value | content band | description |
|---|---|---|
| `extremely_strong` | `concentrated` | Element saturates the chart |
| `strong` | `concentrated` | Element leads with clear authority |
| `moderate` | `balanced` | Element in genuine equilibrium |
| `weak` | `open` | Element needs the right conditions |
| `extremely_weak` | `open` | Element operates through alignment |

```javascript
function getEnergyBand(strength) {
  if (strength === "extremely_strong" || strength === "strong") return "concentrated";
  if (strength === "moderate") return "balanced";
  return "open";
}
```

---

## §2 — Pillar Calculation

> Sections marked **[HARD]** are non-negotiable. Every anchor listed must pass exactly.
> Sections marked **[SOFT]** are best-effort refinements applied when data is available.

### 2.1 Year Pillar [HARD]

- BaZi year begins at **立春** (~Feb 4), NOT January 1st
- If birth date is before 立春, use previous year's stem/branch
- Year Stem Index = `(year − 4) mod 10`
- Year Branch Index = `(year − 4) mod 12`

**Anchors:** `1984 = 甲子` · `1995 = 乙亥`

---

### 2.2 Month Pillar [HARD]

Month boundaries follow solar terms, not calendar months.

| Solar Term | ~Date | Month Branch | 0-Index |
|---|---|---|---|
| 小寒 | Jan 6 | 丑 | 0 |
| 立春 | Feb 4 | 寅 | 1 |
| 惊蛰 | Mar 6 | 卯 | 2 |
| 清明 | Apr 5 | 辰 | 3 |
| 立夏 | May 6 | 巳 | 4 |
| 芒种 | Jun 6 | 午 | 5 |
| 小暑 | Jul 7 | 未 | 6 |
| 立秋 | Aug 7 | 申 | 7 |
| 白露 | Sep 8 | 酉 | 8 |
| 寒露 | Oct 8 | 戌 | 9 |
| 立冬 | Nov 7 | 亥 | 10 |
| 大雪 | Dec 7 | 子 | 11 |

```
Month Branch Index = (solarMonthIndex + 1) mod 12
```

**Five Tiger Rule (月干五虎遁):**

```
Year Stem Group → Stem of 寅 Month:
  甲 or 己 → 丙 (index 2)
  乙 or 庚 → 戊 (index 4)
  丙 or 辛 → 庚 (index 6)
  丁 or 壬 → 壬 (index 8)
  戊 or 癸 → 甲 (index 0)

Month Stem Index = (baseStemIndex + solarMonthIndex − 1) mod 10
```

**Anchor:** 1995-04-29 (乙 year, past 清明 = index 3) → Month = `庚辰` ✓

---

### 2.3 Day Pillar [HARD]

```
daysElapsed = floor((birthDate − 1900-01-01) / 86400000)
Day Stem Index   = daysElapsed mod 10
Day Branch Index = (daysElapsed + 10) mod 12
```

The **+10 branch offset is calibrated and non-negotiable.**

**Verification anchors (all must pass):**

| Date | Expected |
|---|---|
| 1995-04-29 | 庚寅 |
| 1984-02-04 | 甲子 |
| 2000-01-01 | 庚辰 |

---

### 2.4 Hour Pillar [HARD]

```
Hour Branch Index = floor((hour + 1) / 2) mod 12
```

BaZi day starts at **23:00**, not midnight.

**Five Rat Rule (时干五鼠遁):**

```
Day Stem Group → Stem of 子 Hour:
  甲 or 己 → 甲 (index 0)
  乙 or 庚 → 丙 (index 2)
  丙 or 辛 → 戊 (index 4)
  丁 or 壬 → 庚 (index 6)
  戊 or 癸 → 壬 (index 8)

Hour Stem Index = (dayStemIndex × 2 + hourBranchIndex) mod 10
```

**Anchor:** Day stem `庚` + 18:00 → `乙酉` ✓

---

### 2.5 True Solar Time [SOFT]

```
Correction (hours) = (longitude − 120) / 15
True Solar Hour = local hour − correction
```

Apply before hour pillar calculation when birth location is specified.

---

### 2.6 Luck Pillar [HARD]

```
Direction:
  Male  + Yin year  OR Female + Yang year → Backward (逆行)
  Male  + Yang year OR Female + Yin year  → Forward  (顺行)

Starting age = round(daysToNearestSolarTerm / 3), minimum 1
Each pillar lasts 10 years.
```

---

### 2.7 Ten God Calculation [HARD]

```
Given Day Master stem D, target stem T:

  Same element + same polarity → 比肩  (Parallel Self)
  Same element + diff polarity → 劫财  (Rob Wealth)
  D generates T + same polarity → 食神 (Food God)
  D generates T + diff polarity → 伤官 (Hurt Officer)
  D controls T + same polarity  → 偏财 (Indirect Wealth)
  D controls T + diff polarity  → 正财 (Direct Wealth)
  T controls D + same polarity  → 七杀 (Seven Killings)
  T controls D + diff polarity  → 正官 (Direct Officer)
  T generates D + same polarity → 偏印 (Indirect Seal)
  T generates D + diff polarity → 正印 (Direct Seal)

Yang stems: 甲 丙 戊 庚 壬
Yin  stems: 乙 丁 己 辛 癸

Five-element generation cycle: Wood → Fire → Earth → Metal → Water → Wood
Five-element control cycle:    Wood → Earth → Water → Fire → Metal → Wood
```

---

## §3 — Strength & Element Composition

### 3.1 Hybrid Algorithm Overview (C+D+B+A)

| Method | Classical Source | Role |
|---|---|---|
| **C** 黄景泓打分法 | Modern synthesis | Position weights per pillar |
| **D** 藏干理论 | Classical | Hidden stem expansion for branches |
| **B** 穷通宝鉴 | Classical | Seasonal phase multipliers |
| **A** 子平真诠 | Classical | 得令/得地/得势 gate check → strength band |

This replaces the old raw character count, which was arbitrary and inaccurate.

> **⚠ COMMITTED METHODOLOGY (2026-06-25 — 子平真诠 structure-core + 滴天髓 relative-clash).** Strength & dominance follow the orthodox **substance-vs-function** principle: the **dominance number tracks 五行 substance (旺衰)** and is modified ONLY by substance-changing operations —
> - **positional 旺衰** (§3.2–§3.6: position weights, hidden stems, seasonal phase, root),
> - **真化** (gated transformation — §3.7), and
> - **relative 冲** (root-uprooting — §3.7b).
>
> **合-binding** (合而不化) and **刑/害/破** change *function/relationship*, NOT substance — they live in the **格局/用神/reading layer, never in the number** (classical sourcing + 刑害破 placement: DES_02; dominance-to-reading contract: DES_05). Day-Master **strength** is the qualitative **得令/得地/得势 gate** (§3.8, Method A), 月令-primary-but-not-sole. *Doc leads code: §3.7–§3.8 describe the committed target; the engine fix lands it (backlog task "Implement engine fix").*

---

### 3.2 Position Weights (Method C)

Day stem (the DM itself) is excluded from scoring.

| Position | Weight |
|---|---|
| Year stem | 5% |
| Year branch | 5% |
| Month stem | 15% |
| **Month branch** | **40%** |
| Day branch | 20% |
| Hour stem | 10% |
| Hour branch | 5% |

---

### 3.3 Hidden Stems / 藏干 (Method D)

| Branch | 本気 Main | wt | 中気 Secondary | wt | 余気 Residual | wt |
|---|---|---|---|---|---|---|
| 子 | Water | 1.0 | — | — | — | — |
| 丑 | Earth | 0.6 | Water | 0.3 | Metal | 0.1 |
| 寅 | Wood  | 0.6 | Fire  | 0.3 | Earth | 0.1 |
| 卯 | Wood  | 1.0 | — | — | — | — |
| 辰 | Earth | 0.6 | Wood  | 0.3 | Water | 0.1 |
| 巳 | Fire  | 0.6 | Metal | 0.3 | Earth | 0.1 |
| 午 | Fire  | 0.6 | Earth | 0.4 | — | — |
| 未 | Earth | 0.6 | Fire  | 0.3 | Wood  | 0.1 |
| 申 | Metal | 0.6 | Water | 0.3 | Earth | 0.1 |
| 酉 | Metal | 1.0 | — | — | — | — |
| 戌 | Earth | 0.6 | Fire  | 0.3 | Metal | 0.1 |
| 亥 | Water | 0.6 | Wood  | 0.4 | — | — |

---

### 3.4 Seasonal Phase Multipliers (Method B)

| Branch | 旺 1.3 | 相 1.1 | 休 0.9 | 囚 0.7 | 死 0.5 |
|---|---|---|---|---|---|
| 寅卯 | Wood | Fire | Water | Metal | Earth |
| 巳午 | Fire | Earth | Wood | Water | Metal |
| **辰未戌丑** | **Earth** | **Metal** | Fire | Wood | Water |
| 申酉 | Metal | Water | Earth | Fire | Wood |
| 亥子 | Water | Wood | Metal | Earth | Fire |

> **Critical correction — 辰未戌丑:** These four Earth-dominant branches all give Metal the **相 (1.1)** multiplier because Earth generates Metal (土生金 → Metal in the nourished/child position). Old 4-season tables incorrectly penalized Metal in 辰月 by grouping it with the Spring Wood season. Corrected rule: 辰本気 = 戊Earth → Earth generates Metal → Metal = 相 (1.1). ✓

---

### 3.5 Root Modifier (Method D · 通根)

Applies to heavenly stems only. A stem without any branch root is 虚浮 (floating).

| Root condition | Modifier |
|---|---|
| Root in same-pillar branch | ×1.30 |
| Root in any other branch | ×1.15 |
| No root (虚浮) | ×0.85 |

---

### 3.6 Element Composition Formula

```
For each heavenly stem position:
  elementScore[E] += posWeight × rootModifier × seasonalPhase[E]

For each earthly branch position:
  for each hidden stem { element E, hidden weight hw }:
    elementScore[E] += posWeight × hw × seasonalPhase[E]

Normalize:  pct[E]   = elementScore[E] / sum(all elementScores)
Count:      count[E] = round(pct[E] × 10)   → 0–10 for UI display
```

---

### 3.7 Combinations 合 — 合而不化 default, 真化 gated

**Committed rule (子平真诠).** A combination **binds (羁绊); by default it does NOT convert substance** — so it makes **no shift to the composition and adds no 得势 support** (合而不化, the ordinary outcome). The shift factors below apply **only when the 真化 gate passes**.

**Bond types and results:**

| Type | Pairs | Result element |
|---|---|---|
| 天干五合 Stem bonds | 甲己 乙庚 丙辛 丁壬 戊癸 | Earth Metal Water Wood Fire |
| 地支六合 Six-harmony | 子丑 寅亥 卯戌 辰酉 巳申 午未 | Earth Wood Fire Metal Water Earth |
| 三合 Three-harmony | 寅午戌 申子辰 亥卯未 巳酉丑 | Fire Water Wood Metal |
| 半三合 Half three-harmony | Any 2 of above triplets | Same as three-harmony |

**Shift factors (apply ONLY when the 真化 gate below passes):**

| Bond type | In season (月令本気 = result) | Out of season |
|---|---|---|
| Stem bond / Six-harmony | 80% | 40% |
| Full three-harmony (all 3 present) | 90% | 55% |
| Half three-harmony (2 of 3) | 60% | 30% |

**真化 gate — transformation fires ONLY if ALL hold:**
1. **月令** — the month branch's 本気 is the **result element** (or in its 临官/帝旺/墓库 prosperous phase);
2. **透干引化** — the result element appears as a heavenly stem;
3. **no 冲破** breaks the combination;
4. **adjacency** — the combining stems/branches are adjacent (合 requires adjacency; never fire on mere presence).

When the gate is unmet → **合而不化**: no shift, no 得势 support. The combination's *functional* effect (合去 a 用神, binding a god) is a 格局 success/break factor handled qualitatively (DES_01 / DES_05) — **not** a number.

- The DM stem itself is never converted (identity is fixed).
- *(Deviation note: the prior engine auto-transformed on mere presence — the 得势-inflation that produced the QA-F2 "extremely strong / wrong dominance" artifact. This 真化 gate retires that.)*

---

### 3.7b Clashes 冲 — relative root-uprooting (NEW)

**Committed rule (滴天髓 任铁樵: 旺者冲衰衰者拔，衰神冲旺旺神发).** 六冲 modifies 五行 substance **relatively**, applied after composition:
- a **stronger** branch clashing a **weaker** one **uproots the weaker's root** → reduce that element's score;
- a **weaker** branch clashing a **stronger** one merely **provokes** it → no reduction (slight activation only).

Never a flat, context-free subtraction. The favorable/unfavorable read (uprooting a 忌神 = good vs a 喜用神 = bad) is surfaced at the **用神/reading layer**, not the number.

六冲 pairs: 子午 · 丑未 · 寅申 · 卯酉 · 辰戌 · 巳亥.

⚠ **墓库冲** (e.g. 辰戌冲 "opening the vault") needs a separate rule — **OPEN**; until resolved, treat as an ordinary root-clash.

---

### 3.8 DM Strength — Method A Gate Check (得令 · 得地 · 得势)

**得令 (Seasonal Authority):**
Does the month branch's 本気 element equal the DM element, or generate the DM element?

| Branch | 本気 | Branch | 本気 |
|---|---|---|---|
| 子 | Water | 午 | Fire |
| 丑 | Earth | 未 | Earth |
| 寅 | Wood  | 申 | Metal |
| 卯 | Wood  | 酉 | Metal |
| 辰 | Earth | 戌 | Earth |
| 巳 | Fire  | 亥 | Water |

**得地 (Branch Root):** Does any branch's hidden stems contain the DM element? *(A DM root **uprooted by a stronger 冲** — §3.7b — no longer counts.)*

**得势 (Stem Support):** Do more of the 3 non-DM heavenly stems support the DM (印 generates DM; 比 = same element) than drain it? *(Bonded stems do **NOT** count as support unless **真化** fired — §3.7. This retires the QA-F2 得势-inflation.)*

**Strength decision table:**

| 得令 | 得地 | 得势 | Strength | Score | Band |
|---|---|---|---|---|---|
| ✓ | ✓ | ✓ | `extremely_strong` | 0.92 | concentrated |
| ✓ | ✓ | — | `strong` | 0.72 | concentrated |
| ✓ | — | ✓ | `strong` | 0.72 | concentrated |
| — | ✓ | ✓ | `strong` | 0.72 | concentrated |
| ✓ | — | — | `moderate` | 0.50 | balanced |
| — | ✓ | — | `weak` | 0.30 | open |
| — | — | ✓ | `weak` | 0.30 | open |
| — | — | — | `extremely_weak` | 0.12 | open |

---

### 3.9 Useful God Derivation (扶抑用神)

```
Concentrated DM (extremely_strong / strong):
  Primary Catalyst:    Wealth (财) — controls excess DM
  Secondary Catalyst:  Output (食伤) — channels outward
                       Officer (官杀) — directs
  Resistance:          Seal (印) + Parallel (比劫) — adds to a full cup

Balanced DM (moderate):
  Context-dependent. Maintain equilibrium; avoid extremes.

Open DM (weak / extremely_weak):
  Primary Catalyst:    Seal (印) — generates and supports the DM
  Secondary Catalyst:  Parallel (比劫) — peers that share the load
  Resistance:          Wealth (财) + Officer (官杀) + Output (食伤) — all drain

[CRITICAL RULE] Never strengthen an already concentrated element.
               Never further weaken an already open element.
               The Useful God always restores balance.
```

---

### 3.10 Climate Adjustment Override (调候用神)

Classical source: 穷通宝鉴 — climate is a modifier on top of 扶抑, not a replacement.

**Season table:**

| Month branch | Season | Temperature |
|---|---|---|
| 亥 子 丑 | Winter | Cold |
| 寅 卯 | Early Spring | Cool/Cold |
| 辰 | Late Spring | Neutral |
| 巳 | Early Summer | Warm |
| 午 未 | Summer | Hot |
| 申 酉 | Autumn | Cool |
| 戌 | Late Autumn | Neutral |

**Override rules:**

**Cold chart** (month branch 亥 子 丑 寅 卯):
- Fire → promoted to top Catalyst regardless of DM strength
- Water → demoted to Resistance for Metal and Water DMs (deepens cold)

**Hot chart** (month branch 巳 午 未):
- Water → promoted to top Catalyst regardless of DM strength
- Fire → demoted to Resistance for Fire and Wood DMs (deepens heat)

**Neutral** (month branch 辰 申 酉 戌): Standard 扶抑 rules. No override.

**Engine implementation:**
```javascript
const energiesBase = ELEMENT_ENERGIES[dm.stem][band];
const energies     = applyTiaohouToEnergies(energiesBase, dm.stem, monthBranch);
```

**The 庚 + Water discrepancy explained:** Water is Output (食伤) for 庚, classically favorable for a strong DM. But for 庚 born in winter (子月), Water deepens the cold — 调候 overrides and Water becomes Resistance. The static `ELEMENT_ENERGIES` table reflects the spring/neutral-season baseline. `applyTiaohouToEnergies()` overrides this dynamically at runtime.

---

### 3.11 Engine Entry Point

```javascript
// In calculateBaziChart():
const { raw, posContrib }    = computeElementComposition(pillars);
const { adj, bondedDMStems } = applyBondModifiers(raw, posContrib, pillars, dayStem);
// adj → normalize → count[0–10] → chart.elements
const { strength, strengthScore } = computeDMStrength(pillars, dayStem, bondedDMStems);
// bondedDMStems adjusts 得势 gate before strength is determined
```

---

## §4 — Canonical JSON Output Schema

This is the locked interface between the calculation engine and all content layers. The engine always outputs this structure. No content layer or LLM ever receives raw birth data.

```json
{
  "meta": {
    "birthDate": "1995-04-29",
    "birthHour": 18,
    "location": "Beijing",
    "gender": "male",
    "calculatedAt": "2026-04-08"
  },
  "pillars": {
    "year":  { "stem":"乙", "branch":"亥", "stemElement":"Wood",  "branchElement":"Water", "stemPolarity":"yin",  "branchPolarity":"yin"  },
    "month": { "stem":"庚", "branch":"辰", "stemElement":"Metal", "branchElement":"Earth", "stemPolarity":"yang", "branchPolarity":"yang" },
    "day":   { "stem":"庚", "branch":"寅", "stemElement":"Metal", "branchElement":"Wood",  "stemPolarity":"yang", "branchPolarity":"yang" },
    "hour":  { "stem":"乙", "branch":"酉", "stemElement":"Wood",  "branchElement":"Metal", "stemPolarity":"yin",  "branchPolarity":"yin"  }
  },
  "dayMaster": {
    "stem": "庚",
    "element": "Metal",
    "polarity": "yang",
    "strength": "extremely_strong",
    "strengthScore": 0.92
  },
  "elements": {
    "Metal": { "count": 4, "score": 0.41, "dominant": true,  "present": true  },
    "Earth": { "count": 3, "score": 0.32, "dominant": false, "present": true  },
    "Wood":  { "count": 2, "score": 0.16, "dominant": false, "present": true  },
    "Water": { "count": 1, "score": 0.07, "dominant": false, "present": true  },
    "Fire":  { "count": 0, "score": 0.00, "dominant": false, "present": false }
  },
  "missingElements": ["Fire"],
  "tenGods": {
    "yearStem":    { "name":"正财", "en":"Direct Wealth",   "family":"wealth"     },
    "yearBranch":  { "name":"食神", "en":"Food God",        "family":"output"     },
    "monthStem":   { "name":"比肩", "en":"Parallel Self",   "family":"companion"  },
    "monthBranch": { "name":"偏印", "en":"Indirect Seal",   "family":"resource"   },
    "dayStem":     { "name":"日主", "en":"Day Master",      "family":"self"       },
    "dayBranch":   { "name":"偏财", "en":"Indirect Wealth", "family":"wealth"     },
    "hourStem":    { "name":"正财", "en":"Direct Wealth",   "family":"wealth"     },
    "hourBranch":  { "name":"劫财", "en":"Rob Wealth",      "family":"companion"  }
  },
  "combinations": [
    { "type":"stemBond",   "elements":["乙","庚"], "positions":["yearStem","monthStem"],     "resultElement":"Metal" },
    { "type":"stemBond",   "elements":["乙","庚"], "positions":["hourStem","dayStem"],       "resultElement":"Metal" },
    { "type":"branchBond", "elements":["寅","亥"], "positions":["dayBranch","yearBranch"],   "resultElement":"Wood"  },
    { "type":"branchBond", "elements":["辰","酉"], "positions":["monthBranch","hourBranch"], "resultElement":"Metal" }
  ],
  "luckPillars": [
    {
      "order": 3, "stem":"丁", "branch":"丑",
      "startAge": 28, "startYear": 2023, "endYear": 2032,
      "element": "Fire", "stemTenGod":"正官", "branchTenGod":"偏印",
      "isCurrent": true, "isPast": false
    }
  ],
  "currentFlowYear": {
    "year": 2026, "stem":"丙", "branch":"午",
    "stemElement": "Fire", "branchElement": "Fire",
    "stemTenGod": "七杀", "branchTenGod": "正官"
  }
}
```

---

## §5 — Reference Charts & Verification Tests

### Primary Reference — 庚 Yang Metal · Extremely Strong

**Input:** 1995-04-29 · 18:00 · Beijing · Male
**Pillars:** 乙亥 庚辰 庚寅 乙酉
**Expected output:** `extremely_strong` · `concentrated` · Missing: Fire

**Bond walkthrough:**
- 乙(year) + 庚(month) → 乙庚合金 → Metal (40% shift, out of season)
- 乙(hour) + 庚(DM) → 乙庚合金 → Metal (DM excluded; 乙 hour shifts)
- 辰(month) + 酉(hour) → 辰酉合金 → Metal (40% shift)
- 寅(day) + 亥(year) → 寅亥合木 → Wood (40% shift)

**Gate check after bonds:**
- 得令: 辰本気 = 戊Earth → Earth generates Metal → ✓
- 得地: 辛 in 酉 branch → ✓
- 得势: Both 乙 stems bonded to Metal → all 3 non-DM stems supportive → ✓

**Result: ✓✓✓ → `extremely_strong` (0.92) · Concentrated**

---

### Secondary Reference — 癸 Yin Water · Weak

**Input:** 2023-02-14 · 04:00 · Beijing
**Pillars:** 癸卯 甲寅 癸卯 甲寅
**Expected output:** `weak` · `open` · Missing: Metal, Fire

---

### Verification Tests

Run these against any new implementation before going to production:

1. Primary reference → `extremely_strong`, `concentrated`, missing Fire ✓
2. Changing birth time 18:00 → 02:00 → only Hour Pillar changes ✓
3. Secondary reference → `open` band, missing Metal and Fire ✓
4. 庚 born in 子月 → Water flagged as Resistance via 调候 override ✓
5. All pillar anchors in §2.1–2.4 produce documented stems/branches exactly ✓

---

## §6 — Version History

| Version | Date | Changes |
|---|---|---|
| 1.0 | April 2026 | Extracted from monolith Bible. All calculation content locked. |
| 0.9 | March 2026 | Corrected 辰月 seasonal phase for Metal. Bond modifiers added. |
| 0.8 | March 2026 | Hybrid C+D+B+A algorithm replacing raw character count. |
| 0.1 | Early 2026 | Initial calculation engine rules. |

---

*Model pin: claude-opus-4-20250514 (production) · claude-sonnet-4-6 (dev)*
*Verified against: 穷通宝鉴 · 子平真诠 · shen88.cn · ebaicha.cn · junzige.com*

---

## Document Metadata

| | |
|---|---|
| **Document** | Doc 1 — Calculation Engine Specification |
| **Last Updated** | 2026-04-10 |
| **Version** | 1.0  ·  April 2026 |
| **Status** | LOCKED — changes require full team review and anchor re-verification |
| **Audience** | Engineers implementing or verifying the calculation engine |
| **Purpose** | Single source of truth for all BaZi math. The deterministic input → Canonical JSON pipeline. No content, no LLM, no design. |
| **Stability** | HIGH — changes only when calculation logic changes |
| **Used by** | Elementum_Engine.jsx · batchGenerate.js (via JSON output) |
| **Compatible with** | DES_01 v1.0 · DES_05 v1.0 |
| **Verified against** | 穷通宝鉴 · 子平真诠 · shen88.cn · ebaicha.cn · junzige.com |
