# BaZi Analysis Bible v3.0
## Elementum — Complete Engineering & Content Reference

> **Purpose:** This document is the single source of truth for the Elementum engine. A developer or AI agent reading this document should be able to reproduce the artifact to the same standard without access to any other documentation. Everything currently implemented is described here. Nothing described here is aspirational unless marked `[FUTURE]`.

> **Current build status:** Section 1 (Who You Are) and Section 2 (Your Energy Profile) are content-complete and implemented. Sections 3–10 are not yet built.

---

# PART 1 — ARCHITECTURE

## 1.1 The Two-Layer Separation (Non-Negotiable)

```
LAYER 1: JavaScript Calculation Engine
  Input:  { birthDate, birthHour, gender, location }
  Output: Canonical JSON (see Part 2)
  Rules:  Pure computation. No LLM. Fully deterministic.
          All 10 stems × all 5 strengths × all missing element combinations verified.

LAYER 2: Static Content Layer (current build)
  Input:  Canonical JSON fields (stem, strength, band, missingElements)
  Output: Pre-written readings selected by key lookup
  Rules:  No LLM at runtime for Sections 1–2. All content is hardcoded constants.
          LLM is used only for the expandable reading sections (Sections 3–10) [FUTURE].

LAYER 3: LLM Reading Generator [FUTURE — Sections 3–10 only]
  Input:  Canonical JSON
  Output: Literary English readings
  Model:  Claude Opus 4.6 (production) / claude-sonnet-4-20250514 (dev)
  Rules:  Never calculates. Only interprets. Never surfaces BaZi terminology.
```

**The cardinal rule:** The LLM never sees raw birth data. It receives a fully computed, validated JSON object. If this separation breaks, readings contain calculation errors that destroy trust.

## 1.2 Energy Band Mapping

The engine maps the five `dayMaster.strength` values to three content bands used throughout Sections 1 and 2:

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

# PART 2 — CALCULATION ENGINE

## 2.1 Year Pillar [HARD]

- BaZi year begins at 立春 (~Feb 4), NOT January 1st
- If birth date is before 立春, use previous year's stem/branch
- Year Stem Index = (year − 4) mod 10
- Year Branch Index = (year − 4) mod 12
- **Anchor:** 1984 = 甲子, 1995 = 乙亥

## 2.2 Month Pillar [HARD]

Month boundaries = solar terms, not calendar months.

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

Month Branch Index = (solarMonthIndex + 1) mod 12

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

**Anchor:** 1995-04-29 (乙 year, past 清明 = index 3) → Month = 庚辰 ✓

## 2.3 Day Pillar [HARD]

```
daysElapsed = floor((birthDate − 1900-01-01) / 86400000)
Day Stem Index   = daysElapsed mod 10
Day Branch Index = (daysElapsed + 10) mod 12
```

The +10 branch offset is calibrated and non-negotiable.

**Verification anchors (all must pass):**

| Date | Expected |
|---|---|
| 1995-04-29 | 庚寅 |
| 1984-02-04 | 甲子 |
| 2000-01-01 | 庚辰 |

## 2.4 Hour Pillar [HARD]

```
Hour Branch Index = floor((hour + 1) / 2) mod 12
```

BaZi day starts at 23:00, not midnight.

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

**Anchor:** Day stem 庚 + 18:00 → 乙酉 ✓

## 2.5 True Solar Time [SOFT]

```
Correction (hours) = (longitude − 120) / 15
True Solar Hour = local hour − correction
```

Apply before hour pillar calculation when birth location is specified.

## 2.6 Luck Pillar [HARD]

```
Direction:
  Male + Yin year OR Female + Yang year → Backward (逆行)
  Male + Yang year OR Female + Yin year → Forward (顺行)

Starting age = round(daysToNearestSolarTerm / 3), minimum 1
Each pillar lasts 10 years.
```

## 2.7 Ten God Calculation [HARD]

```
Given Day Master stem D, target stem T:
  Same element + same polarity → 比肩 (Parallel Self)
  Same element + diff polarity → 劫财 (Rob Wealth)
  D generates T + same polarity → 食神 (Food God)
  D generates T + diff polarity → 伤官 (Hurt Officer)
  D controls T + same polarity → 偏财 (Indirect Wealth)
  D controls T + diff polarity → 正财 (Direct Wealth)
  T controls D + same polarity → 七杀 (Seven Killings)
  T controls D + diff polarity → 正官 (Direct Officer)
  T generates D + same polarity → 偏印 (Indirect Seal)
  T generates D + diff polarity → 正印 (Direct Seal)

Polarity: Yang = 甲丙戊庚壬   Yin = 乙丁己辛癸
```

## 2.8 Day Master Strength & Element Composition [HARD]

### Overview: Hybrid Algorithm (C+D+B)

The engine uses three classical methods in combination:
- **Method C** (黄景泓打分法): Position weights — 月支40%, 日支20%, 月干15%, 时干10%, 年柱10%, 时支5%
- **Method D** (藏干理论): Hidden stem expansion for earthly branches
- **Method B** (穷通宝鉴): Seasonal phase multipliers per month branch
- **Method A** (子平真诠): 得令/得地/得势 three-gate check for DM strength band

This replaces the old raw character count, which was arbitrary and inaccurate.

### 2.8.1 — Position Weights (Method C)

Day stem (the DM itself) is excluded from scoring.

| Position | Key | Weight |
|---|---|---|
| Year stem | yearStem | 5% |
| Year branch | yearBranch | 5% |
| Month stem | monthStem | 15% |
| **Month branch** | monthBranch | **40%** |
| Day branch | dayBranch | 20% |
| Hour stem | hourStem | 10% |
| Hour branch | hourBranch | 5% |

### 2.8.2 — Hidden Stems / 藏干 (Method D)

Each earthly branch contains hidden stems with weighted qi distribution.

| Branch | 本气 Main | 中气 Secondary | 余气 Residual |
|---|---|---|---|
| 子 | Water 1.0 | | |
| 丑 | Earth 0.6 | Water 0.3 | Metal 0.1 |
| 寅 | Wood 0.6 | Fire 0.3 | Earth 0.1 |
| 卯 | Wood 1.0 | | |
| 辰 | Earth 0.6 | Wood 0.3 | Water 0.1 |
| 巳 | Fire 0.6 | Metal 0.3 | Earth 0.1 |
| 午 | Fire 0.7 | Earth 0.3 | |
| 未 | Earth 0.6 | Fire 0.3 | Wood 0.1 |
| 申 | Metal 0.6 | Water 0.3 | Earth 0.1 |
| 酉 | Metal 1.0 | | |
| 戌 | Earth 0.6 | Metal 0.3 | Fire 0.1 |
| 亥 | Water 0.7 | Wood 0.3 | |

### 2.8.3 — Seasonal Phase Multipliers (Method B, corrected)

Applied to all elements during composition calculation. **Earth months (辰未戌丑) use Earth-dominant phases — not the surrounding season.** This is the key correction from classical analysis.

Derivation logic:
- 旺 (1.3) — the ruling element itself
- 相 (1.1) — the element the ruler generates (its child, being nourished)
- 休 (0.9) — the element that generated the ruler (parent depleted itself)
- 囚 (0.7) — the element that controls the ruler (imprisoned at ruler's peak)
- 死 (0.6) — the element the ruler controls (most suppressed)

Earth months modify base scores by their specific hidden stems.

| Branch | Wood | Fire | Earth | Metal | Water | Notes |
|---|---|---|---|---|---|---|
| 寅 | 1.3 | 1.1 | 0.6 | 0.7 | 0.9 | Pure Wood (甲木本气) |
| 卯 | 1.3 | 1.1 | 0.6 | 0.7 | 0.9 | Pure Wood (乙木本气) |
| **辰** | **0.8** | **0.9** | **1.3** | **1.1** | **0.8** | Earth旺, Metal相(Earth→Metal). Wood囚 softened by 乙. Water死 softened by 癸. Fire=休 |
| 巳 | 0.9 | 1.3 | 1.1 | 0.6 | 0.7 | Fire主(丙火本气) |
| 午 | 0.9 | 1.3 | 1.1 | 0.6 | 0.7 | Fire主(丁火本气) |
| **未** | **0.7** | **1.0** | **1.3** | **0.9** | **0.6** | Earth旺. 丁Fire lingers (休→1.0). Metal相 weakened by heat. Water driest |
| 申 | 0.6 | 0.7 | 0.9 | 1.3 | 1.1 | Metal主(庚金本气) |
| 酉 | 0.6 | 0.7 | 0.9 | 1.3 | 1.1 | Metal主(辛金本气) |
| **戌** | **0.6** | **0.8** | **1.3** | **1.2** | **0.8** | Earth旺. 辛Metal lingers strongly (相→1.2). 丁Fire fading (休→0.8). Water rising toward winter |
| 亥 | 1.1 | 0.6 | 0.7 | 0.9 | 1.3 | Water主(壬水本气) |
| 子 | 1.1 | 0.6 | 0.7 | 0.9 | 1.3 | Water主(癸水本气) |
| **丑** | **0.9** | **0.6** | **1.3** | **1.0** | **0.9** | Earth旺. 癸Water 死 softened by 癸 present. Wood囚 softened (spring stirring). Fire coldest |

**Why this corrects 辰月:** Under the old 4-season table, 辰 was grouped with 寅卯 giving Metal=0.7 (囚). Correct analysis: 辰本气 is 戊Earth. Earth generates Metal (土生金). Metal is in the 相 position (child of the ruling Earth) → Metal=1.1. This makes 庚 Metal born in 辰月 receive Earth's support, which classical texts confirm.

### 2.8.4 — Root Modifier (Method D, 通根)

Applies to heavenly stems only. A stem without roots in any branch is 虚浮 (floating) and is penalised.

| Root condition | Modifier |
|---|---|
| Root in same-pillar branch | ×1.30 |
| Root in any other branch | ×1.15 |
| No root (虚浮) | ×0.85 |

### 2.8.5 — Element Composition Formula

```
For each heavenly stem position:
  elementScore[E] += posWeight × rootModifier × seasonalPhase[E]

For each earthly branch position:
  for each hidden stem {element E, weight hw}:
    elementScore[E] += posWeight × hw × seasonalPhase[E]

Normalize: pct[E] = elementScore[E] / sum(all elementScores)
Bar count:  count[E] = round(pct[E] × 8)   → 0-8 segment display
```

### 2.8.6 — DM Strength: Method A Gate Check (得令/得地/得势)

After computing element composition, DM strength is determined by three binary gates:

**得令 (Seasonal Authority / 月令本气十神):**
Does the month branch's **本气 (main qi)** element equal the DM element, or generate the DM element?

This replaces the seasonal phase threshold check. The 本气 is the highest-weight hidden stem — the element that actually governs the month branch.

| Branch | 本气 element |
|---|---|
| 子 | Water | 丑 | Earth | 寅 | Wood | 卯 | Wood |
| 辰 | Earth | 巳 | Fire | 午 | Fire | 未 | Earth |
| 申 | Metal | 酉 | Metal | 戌 | Earth | 亥 | Water |

**Why 辰月 gives 庚 Metal 得令:** 辰本气 = 戊Earth. Earth generates Metal (土生金). Metal is in the 相 (child/nourished) position → 得令 ✓. Under the old seasonal phase check, 庚 in 辰 was incorrectly marked as 不得令 because it was grouped with the Spring season.

**得地 (Branch Root):** Does any branch's hidden stems contain the DM element?

**得势 (Stem Support):** Do more of the 3 non-DM heavenly stems support the DM (Seal 印 = generates DM; Parallel 比 = same element) than drain it?

**Decision table:**

| 得令 | 得地 | 得势 | Strength | Score | Band | Icon |
|---|---|---|---|---|---|---|
| ✓ | ✓ | ✓ | extremely_strong | 0.92 | Concentrated | ☀ Sun |
| ✓ | ✓ | — | strong | 0.72 | Concentrated | ☀ Sun |
| ✓ | — | ✓ | strong | 0.72 | Concentrated | ☀ Sun |
| — | ✓ | ✓ | strong | 0.72 | Concentrated | ☀ Sun |
| ✓ | — | — | moderate | 0.50 | Equilibrated | ⚖ Scale |
| — | ✓ | — | weak | 0.30 | Open | ☽ Moon |
| — | — | ✓ | weak | 0.30 | Open | ☽ Moon |
| — | — | — | extremely_weak | 0.12 | Open | ☽ Moon |

### 2.8.7 — Reference Chart Worked Example

Chart: 乙亥 庚辰 庚寅 乙酉 · DM: 庚 Metal · Month: 辰 (Earth主, Spring→Summer transition)

**Seasonal phase for 辰:** Earth=1.3, Metal=1.1, Fire=0.9, Wood=0.8, Water=0.8

**Element composition:**

| Position | Weight | Root mod | Element contribution |
|---|---|---|---|
| 乙 year stem | 5% | ×1.30 (rooted in 亥甲) | Wood += 0.052 |
| 亥 year branch | 5% | — | Water(70%)×0.8=0.028, Wood(30%)×0.8=0.012 |
| 庚 month stem | 15% | ×1.15 (rooted in 酉辛) | Metal×1.1 += 0.190 |
| 辰 month branch | 40% | — | Earth(60%)×1.3=0.312, Wood(30%)×0.8=0.096, Water(10%)×0.8=0.032 |
| 寅 day branch | 20% | — | Wood(60%)×0.8=0.096, Fire(30%)×0.9=0.054, Earth(10%)×1.3=0.026 |
| 乙 hour stem | 10% | ×1.15 (rooted in 辰亥寅) | Wood×0.8 += 0.092 |
| 酉 hour branch | 5% | — | Metal(100%)×1.1=0.055 |

**Normalized scores → bar segments:**
- Wood: **33.4% → 3 bars**
- Earth: **32.4% → 3 bars** (co-dominant with Wood)
- Metal: **23.5% → 2 bars**
- Water: **5.8% → 1 bar** (min 1 for present elements)
- Fire: **5.2% → 1 bar** (min 1 for present elements)

**Gate check (月令本气十神):**
- 得令: 辰本气 = 戊Earth → Earth generates Metal → ✓
- 得地: 辛 in 酉 branch → ✓
- 得势: 庚(month) supports vs 乙(year)+乙(hour) drain → 1 vs 2 → ✗

**Result: ✓✓✗ → strong (0.72) → Concentrated ☀**

**What changed from the old calculation:** Old engine: "extremely strong (0.91)" via raw character count. Old hybrid: "weak (0.30)" because seasonal phase wrongly penalized Metal in Spring. Corrected hybrid: **strong (0.72)** — 辰月 Earth supports Metal correctly, 酉 branch provides root, only 得势 is lost due to the two 乙 stems.

### 2.8.8 — Engine Implementation

```javascript
// Entry point in calculateBaziChart():
const {raw, posContrib} = computeElementComposition(pillars);
const {adj, bondedDMStems} = applyBondModifiers(raw, posContrib, pillars, dayStem);
// adj → normalize → count (0-8) → chart.elements
const {strength, strengthScore} = computeDMStrength(pillars, dayStem, bondedDMStems);
// bondedDMStems adjusts 得势 gate before strength is determined
```

### 2.8.9 — Bond Modifiers (天干五合 / 地支六合 / 三合)

Bonds partially convert bonded element scores toward the result element. Applied after raw composition is computed, before normalizing.

**Bond types:**

| Type | Pairs | Result |
|---|---|---|
| 天干五合 Stem bonds | 甲己, 乙庚, 丙辛, 丁壬, 戊癸 | Earth, Metal, Water, Wood, Fire |
| 地支六合 Six-harmony | 子丑, 寅亥, 卯戌, 辰酉, 巳申, 午未 | Earth, Wood, Fire, Metal, Water, Earth |
| 三合 Three-harmony | 寅午戌, 申子辰, 亥卯未, 巳酉丑 | Fire, Water, Wood, Metal |
| 半三合 Half three-harmony | Any 2 of the above triplets | Same as three-harmony |

**Shift factors:**

| Bond type | In season (月令本気) | Out of season |
|---|---|---|
| Stem bond / Six-harmony | 80% | 40% |
| Full three-harmony (all 3) | 90% | 55% |
| Half three-harmony (2 of 3) | 60% | 30% |

"In season" = result element equals month branch 本気 element.

**What shifts:** Non-result contributions from each bonded position shift proportionally. The DM stem itself is excluded from composition shifts (identity cannot be converted).

**Effect on 得势 gate:** When a non-DM stem is bonded and the bond result element = DM element or generates DM, that stem is counted as **supportive** in 得势, regardless of its original element.

**Reference chart bond walkthrough (乙亥 庚辰 庚寅 乙酉):**

Active bonds:
- 乙(year) + 庚(month) → 乙庚合金 → Metal. 辰本気=Earth ≠ Metal → shift 40%
- 乙(hour) + 庚(DM) → 乙庚合金 → Metal. DM excluded from composition, 乙(hour) still shifts
- 辰(month) + 酉(hour) → 辰酉合金 → Metal. Shift 40%
- 寅(day) + 亥(year) → 寅亥合木 → Wood. Shift 40%

Net effect: Metal gains ~0.109 from bond shifts (two 乙庚 + 辰酉). Wood loses 0.096 but gains 0.044 from 寅亥. Result: **Metal co-dominant with Earth, Wood reduced to secondary.**

得势 with bonds: Both 乙 stems bond to Metal (DM element) → all 3 non-DM stems now supportive → 得势 ✓

**Final gates: 得令✓ 得地✓ 得势✓ → extremely_strong (0.92) ☀**

This is the classically correct result — the double 乙庚合金 and 辰酉合金 triple bond structure is a defining feature of this chart that classical masters would immediately identify.

### 2.8.3 Useful God Derivation (扶抑用神)

```
Concentrated DM (extremely_strong / strong):
  Primary Catalyst:   Wealth (财) — controls excess DM energy
  Secondary Catalyst: Output (食伤) — channels energy outward; Officer (官杀) — directs
  Resistance:         Seal (印) + Parallel (比劫) — adds more to an already full cup

Balanced DM (moderate):
  Context-dependent — maintain equilibrium, avoid extremes in either direction

Open DM (weak / extremely_weak):
  Primary Catalyst:   Seal (印) — generates and supports the DM
  Secondary Catalyst: Parallel (比劫) — peers that share the load
  Resistance:         Wealth (财), Officer (官杀), Output (食伤) — all drain further

[CRITICAL RULE] Never strengthen an already concentrated element.
               Never further weaken an already open element.
               The Useful God is always about restoring balance.
```

### 2.8.4 Climate Adjustment Override (调候用神)

Classical source: 穷通宝鉴 — *"论命惟以月令用神为主，然亦须配气候而互参之"* — the month branch determines chart temperature; climate is a modifier on top of 扶抑, not a replacement system.

**Season temperature table:**

| Month branch | Season | Temperature | Humidity |
|---|---|---|---|
| 亥 子 丑 | Winter | Cold | Wet |
| 寅 卯 | Early Spring | Cool/Cold | Neutral |
| 辰 | Late Spring | Neutral | Wet |
| 巳 | Early Summer | Warm | Dry |
| 午 未 | Summer | Hot | Dry |
| 申 酉 | Autumn | Cool | Dry |
| 戌 | Late Autumn | Neutral | Dry |

**Override conditions:**

Cold chart (month branch 亥, 子, 丑, 寅, 卯):
- Fire → promoted to top Catalyst regardless of DM strength
- Water → demoted to Resistance for Metal and Water DMs (deepens cold)

Hot chart (month branch 巳, 午, 未):
- Water → promoted to top Catalyst regardless of DM strength
- Fire → demoted to Resistance for Fire and Wood DMs (deepens heat)

Neutral (month branch 辰, 申, 酉, 戌):
- Standard 扶抑 rules apply. No override.

**Engine implementation:**
```javascript
// In ElementSpectrum component:
const energiesBase = ELEMENT_ENERGIES[dm.stem];
const monthBranch  = chart.pillars.month.branch;
const energies     = applyTiaohouToEnergies(energiesBase, dm.stem, monthBranch);
// energies.lifts and energies.depletes are 调候-adjusted before rendering
```

**The 庚 + Water discrepancy explained:** Water is Output (食伤) for 庚, classically favorable for a strong DM. However, for 庚 born in winter (子月), Water deepens the cold — 调候 overrides and Water becomes Resistance, Fire becomes urgent Catalyst. The static `ELEMENT_ENERGIES` table for 庚 reflects the spring-birth / neutral-season case (our primary reference chart, born 庚辰月). `applyTiaohouToEnergies()` overrides this dynamically.

---

# PART 3 — CANONICAL JSON SCHEMA

This is the locked interface between the calculation engine and the content layer. The engine always outputs this structure. The content layer always reads this structure. **Never pass raw birth data to any LLM.**

```json
{
  "meta": {
    "birthDate": "1995-04-29",
    "birthHour": 18,
    "location": "Beijing",
    "gender": "male",
    "calculatedAt": "2026-03-27"
  },
  "pillars": {
    "year":  { "stem": "乙", "branch": "亥", "stemElement": "Wood",  "branchElement": "Water", "stemPolarity": "yin",  "branchPolarity": "yin"  },
    "month": { "stem": "庚", "branch": "辰", "stemElement": "Metal", "branchElement": "Earth", "stemPolarity": "yang", "branchPolarity": "yang" },
    "day":   { "stem": "庚", "branch": "寅", "stemElement": "Metal", "branchElement": "Wood",  "stemPolarity": "yang", "branchPolarity": "yang" },
    "hour":  { "stem": "乙", "branch": "酉", "stemElement": "Wood",  "branchElement": "Metal", "stemPolarity": "yin",  "branchPolarity": "yin"  }
  },
  "dayMaster": {
    "stem": "庚",
    "element": "Metal",
    "polarity": "yang",
    "strength": "extremely_strong",
    "strengthScore": 0.91
  },
  "elements": {
    "Metal": { "count": 4, "dominant": true,  "present": true  },
    "Earth": { "count": 2, "dominant": false, "present": true  },
    "Water": { "count": 2, "dominant": false, "present": true  },
    "Wood":  { "count": 1, "dominant": false, "present": true  },
    "Fire":  { "count": 0, "dominant": false, "present": false }
  },
  "missingElements": ["Fire"],
  "tenGods": {
    "yearStem":    { "name": "正财", "en": "Direct Wealth",   "family": "wealth"  },
    "yearBranch":  { "name": "食神", "en": "Food God",        "family": "output"  },
    "monthStem":   { "name": "比肩", "en": "Parallel Self",   "family": "rob"     },
    "monthBranch": { "name": "偏印", "en": "Indirect Seal",   "family": "seal"    },
    "dayStem":     { "name": "日主", "en": "Day Master",      "family": "self"    },
    "dayBranch":   { "name": "偏财", "en": "Indirect Wealth", "family": "wealth"  },
    "hourStem":    { "name": "正财", "en": "Direct Wealth",   "family": "wealth"  },
    "hourBranch":  { "name": "劫财", "en": "Rob Wealth",      "family": "rob"     }
  },
  "combinations": [
    { "type": "stemBond",   "elements": ["乙","庚"], "positions": ["yearStem","monthStem"],    "resultElement": "Metal" },
    { "type": "stemBond",   "elements": ["乙","庚"], "positions": ["hourStem","dayStem"],      "resultElement": "Metal" },
    { "type": "branchBond", "elements": ["寅","亥"], "positions": ["dayBranch","yearBranch"],  "resultElement": "Wood"  },
    { "type": "branchBond", "elements": ["辰","酉"], "positions": ["monthBranch","hourBranch"],"resultElement": "Metal" }
  ],
  "pattern": {
    "name": "食神生财格",
    "en": "Food God Generates Wealth",
    "family": "output_to_wealth"
  },
  "luckPillars": [
    { "order": 3, "stem": "丁", "branch": "丑", "startAge": 28, "startYear": 2023, "endYear": 2032, "element": "Fire", "stemTenGod": "正官", "branchTenGod": "偏印", "isCurrent": true, "isPast": false }
  ],
  "currentFlowYear": {
    "year": 2026, "stem": "丙", "branch": "午",
    "stemElement": "Fire", "branchElement": "Fire",
    "stemTenGod": "七杀", "branchTenGod": "正官"
  }
}
```

---

# PART 3A — COMPOUND ARCHETYPE SYSTEM

> This part documents the complete identity system for Elementum. It governs what every user sees as their identity, what gets stored and looked up internally, and how all template content is keyed. Read this before any content or UI work.

---

## 3A.1 Overview and Purpose

The compound archetype system replaces the previous stem × band template key with a richer five-dimensional identity fingerprint. The key insight: a 庚 Metal chart with Wood dominating is a fundamentally different person from a 庚 Metal chart where Metal dominates — different internal dynamic, different life pattern, different guidance. The old system gave both the same reading. The new system gives each a distinct identity and reading.

The system has two tiers that serve completely different purposes and audiences:

| Tier | Purpose | Audience | Format |
|---|---|---|---|
| Tier 1 | User-facing identity — what they share, remember, and buy | The user | Visual card + shareable code |
| Tier 2 | Internal template lookup — what determines which reading they receive | The engine | Key string |

These two tiers must never be conflated. Tier 1 is designed for emotional resonance and virality. Tier 2 is designed for determinism and coverage.

---

## 3A.2 Tier 1 — User-Facing Identity

### The five axes

The user's identity is composed of five axes, displayed in order of felt importance:

| Axis | What it is | Display format | Example |
|---|---|---|---|
| 1. Element | 五行 — the element at the core of who this person is | Large glyph + English name | 金 Metal |
| 2. Polarity | Yin or Yang — the mode of the element | Text inline with archetype name | Yang |
| 3. Archetype | The 10-stem character name — the emotional identity anchor | Large title text | The Blade |
| 4. Energy band | How concentrated the core element is | Icon (☀ / ⚖ / ☽) | ☀ Concentrated |
| 5. Chart tension | Relationship between the dominant chart force and the DM | Flow glyph + one word | Pure |

The **catalyst** (喜用神 — the element the chart needs) is surfaced separately as "Seeking [Element]" — not part of the main identity code but part of the card and the reading narrative.

### The shareable identity code

```
[Stem glyph] · [ARCHETYPE] · [Band icon] · [TENSION]

Examples:
  庚 · BLADE · ☀ · PURE
  乙 · VINE  · ☽ · TESTED
  壬 · OCEAN · ⚖ · FLOWING
```

This code is the MBTI-equivalent for Elementum. It is short enough for a social bio, specific enough to be distinctive (~1 in 300 people share the same code), and contains a word ("TESTED", "PURE", "FLOWING") that invites the question "what does that mean?"

### Element visual language

The Chinese character is displayed as a visual glyph — like a zodiac symbol, not as a word. It is never pronounced to the user or translated inline. Its foreignness is intentional and part of the cultural identity hook.

| Element | Glyph | English | Color |
|---|---|---|---|
| Metal | 金 | Metal | #8ba3b8 |
| Wood | 木 | Wood | #7a9e6e |
| Fire | 火 | Fire | #c4745a |
| Earth | 土 | Earth | #b89a6a |
| Water | 水 | Water | #5a7fa8 |

### Energy band icons

Three SVG icons, one per band. Rendered in element color. Never labeled alone — always paired with the band name as a tooltip or sub-label.

| Band | Icon | Meaning conveyed |
|---|---|---|
| Concentrated | ☀ Sun | Self-generating, full, radiating — no external input required |
| Equilibrated | ⚖ Scale | Two equal forces held in tension — neither overwhelms |
| Open | ☽ Moon | Receives rather than generates — context determines expression |

### Chart tension — five states (new naming)

The chart tension describes the relationship between the dominant chart element and the Day Master. This is the single most important axis for personalisation — two people with the same archetype and band live very different lives depending on their tension.

**Critical naming principle:** Names describe how the person *feels from the inside*, not what the chart *does structurally*. Each name must pass the self-recognition test: someone hears it and immediately thinks "yes, that is my dynamic."

| Tension | Classical root | What dominates | What it means for this person | Flow glyph |
|---|---|---|---|---|
| **Pure** | 比劫旺 | Same element as DM | The element at your core saturates the chart without counterbalance — the signal returns to itself, amplified. No opposing force, just more of what you already are. | Circular arrows (self-loop) |
| **Rooted** | 印旺 | Element that generates DM | Something larger than you feeds and sustains your core. The chart provides resource, backing, ground. You draw from deep support you didn't build. | Inward arrow + root lines |
| **Flowing** | 食伤旺 | Element DM generates | Your energy moves outward — the chart is built for expression, creation, generosity. You pour more than you hold. | Outward arrow from center |
| **Forging** | 财旺 | Element DM controls | The chart surrounds you with material to shape and direct. You control what dominates — the world gives you something to work with. | Downward arrow + object below |
| **Tested** | 官杀旺 | Element that controls DM | External force is the defining pressure of your chart. You are being shaped from outside — not destroyed, but refined by what resists you. | Opposing inward arrows |

**Forbidden names** (old naming, removed): Amplified, Nourished, Expressive, Driven, Pressured. These described chart mechanics, not personal experience.

### Identity card layout

The Tier 1 identity card has four visual zones (top to bottom):

```
┌──────────────────────────────────────────────────────┐
│  ZONE 1 — Core identity                              │
│  [Archetype seal SVG 52px]  [Archetype title 23px]   │
│                             [Meta: Yang Metal · 庚]   │
│                             [Watermark glyph behind] │
├──────────────────────────────────────────────────────┤
│  ZONE 2 — Dimension chips (inline pills)             │
│  [☀ Concentrated]  [↻ Pure]  [🔥 Seeking Fire]       │
│  [Metal · Yang]                                      │
├──────────────────────────────────────────────────────┤
│  ZONE 3 — Chart tension display                      │
│  [Tension flow glyph]  [Tension name 18px]           │
│                        [One-line description]        │
│  [5-pip position indicator]                          │
├──────────────────────────────────────────────────────┤
│  ZONE 4 — Shareable code                            │
│  庚 · BLADE · ☀ · PURE · FIRE         [Share ↗]     │
└──────────────────────────────────────────────────────┘
```

**Design rules:**
- All colors derived from element color — never hardcoded for a specific element
- Chinese characters (庚, 金 etc.) appear only as glyphs, never as text to be read
- Catalyst element color used for the "Seeking [Element]" chip — always Fire/Water/etc. color, not DM element color
- No dark backgrounds — card is always light/warm tinted surface

### Reveal sequence (product flow)

The identity is revealed in three moments, not one:

1. **Element reveal** — full screen, element color, large glyph: "You are Metal"
2. **Archetype name** — fades in below: "The Blade"
3. **Full identity card** — all five axes visible

This sequence is the viral mechanic. Three moments of recognition before the reading begins.

---

## 3A.3 Tier 2 — Internal Template Lookup Key

### Formula

```
[stem]_[band]_[tgPattern]_[catalyst]
```

All fields lowercase. Underscore-separated. Used as the exact key into `TEMPLATE_DB`.

| Field | Type | Values |
|---|---|---|
| stem | Chinese character | 甲 乙 丙 丁 戊 己 庚 辛 壬 癸 |
| band | string | `concentrated` · `balanced` · `open` |
| tgPattern | string | `pure` · `rooted` · `flowing` · `expressive` · `forging` · `tested` · `pressured` |
| catalyst | string | `Metal` · `Wood` · `Water` · `Fire` · `Earth` |

**Example key:** `庚_concentrated_pure_Fire`

> **Upgrade from v1:** The previous 5-value `tension` axis has been replaced by the 7-value `tgPattern` axis. The three structurally unambiguous patterns (`pure`, `rooted`, `forging`) are unchanged. The two highest-impact TG pairs are now split by yin/yang polarity: `flowing` / `expressive` (Output family) and `tested` / `pressured` (Authority family). Existing keys using `pure`, `rooted`, or `forging` are fully backwards-compatible.

---

### TG Pattern — the 7 values

The `tgPattern` encodes the Ten Gods structural relationship between the **dominant chart element** (highest-scoring element after bond modifiers) and the Day Master element, using full 五行生克 logic with yin/yang polarity resolution.

#### Step 1 — Identify the dominant element

Sort all present elements by their weighted score (post-bond modifiers). The element with the highest score is the dominant element.

#### Step 2 — Map the structural relationship

| Dominant element relationship to DM | TG Family | tgPattern values |
|---|---|---|
| Same element as DM | 比劫 (Companion) | `pure` |
| Dominant **generates** DM (印) | 印 (Seal/Resource) | `rooted` |
| DM **generates** dominant (食伤) | 食伤 (Output) | `flowing` or `expressive` |
| DM **controls** dominant (财) | 财 (Wealth) | `forging` |
| Dominant **controls** DM (官杀) | 官杀 (Authority) | `tested` or `pressured` |

The Output and Authority families each split into two values based on yin/yang polarity. The other three relationships are unambiguous and require no split.

#### Step 3 — Resolve yin/yang for Output and Authority splits

For `flowing` / `expressive` and `tested` / `pressured`, compare the **DM's polarity** against the **dominant element's weighted polarity** across all eight chart characters.

**Dominant element polarity — weighted vote algorithm:**

The polarity of the dominant element is determined by a weighted vote across all eight characters (four visible stems + four branch hidden stems). Position weights:

| Character | Weight | Rationale |
|---|---|---|
| Month branch hidden stem (本气) | 4 × 本气 weight | 月令 = highest structural authority |
| Month stem | 3 | Highest visible stem weight |
| Day branch hidden stem | 2 × hidden weight | Day branch = personal influence |
| Hour stem | 2 | Second-highest stem weight |
| Hour branch hidden stem | 1.5 × hidden weight | |
| Year stem | 1 | |
| Year branch hidden stem | 1 × hidden weight | |

Hidden stem weights: 本气 (main) = 0.6 · 中气 (secondary) = 0.3 · 余气 (residual) = 0.1

Sum yang-weighted scores and yin-weighted scores for all occurrences of the dominant element. The majority wins. On tie: default to yang.

If no contribution found (dominant element appears only through low-weight residual stems with insufficient data): fallback = DM's own polarity, which routes to `flowing` (not `expressive`) and `tested` (not `pressured`). This is an extremely rare edge case.

**Output split — 食神 vs. 伤官:**

| DM polarity vs. dominant element polarity | Classical TG | tgPattern |
|---|---|---|
| Same polarity | 食神 Food God | `flowing` |
| Different polarity | 伤官 Hurting Officer | `expressive` |

*Character profile distinction:* `flowing` describes expression that emerges naturally, generously, without friction — the archetype gives what it has because giving is structural. `expressive` describes expression that pushes against something — brilliance with an edge, creativity that challenges structure, output that carries tension.

**Authority split — 正官 vs. 七杀:**

| DM polarity vs. dominant element polarity | Classical TG | tgPattern |
|---|---|---|
| Different polarity | 正官 Direct Officer | `tested` |
| Same polarity | 七杀 Seven Killings | `pressured` |

*Character profile distinction:* `tested` describes someone shaped by structured authority — recognition is earned through legitimacy, the chart respects order and finds its place within it. `pressured` describes someone shaped by direct threat — the chart must prove itself against a force that doesn't grant permission, which produces either exceptional achievement or exceptional cost.

**Classical verification (庚 Metal DM, yang):**

| Fire source | Stem | Yin/Yang | Polarity vs. 庚 | Classical TG | tgPattern |
|---|---|---|---|---|---|
| 丙 Fire in 巳 branch (本气) | 丙 | yang | Same | 七杀 Seven Killings | `pressured` |
| 丁 Fire in 午 branch (本气) | 丁 | yin | Different | 正官 Direct Officer | `tested` |
| 壬 Water dominant | 壬 | yang | Same | 食神 Food God | `flowing` |
| 癸 Water dominant | 癸 | yin | Different | 伤官 Hurting Officer | `expressive` |

This matches classical BaZi exactly. The algorithm derives the correct TG name automatically from the weighted polarity calculation.

---

### Complete `computeTgPattern` implementation

```javascript
// Returns: pure · rooted · flowing · expressive · forging · tested · pressured
// Requires: chart.dayMaster.stem, chart.dayMaster.element, chart.elements
// Optional: chart.pillars — needed for flowing/expressive and tested/pressured splits.
//           If absent, Output defaults to "flowing", Authority defaults to "tested".

function getDominantElementPolarity(domEl, dmStem, pillars) {
  if (!pillars) return STEM_YIN[dmStem];
  const { year, month, day, hour } = pillars;
  let yangW = 0, yinW = 0;

  // Visible stems (excluding day stem = DM)
  for (const [stem, w] of [[month?.stem,3],[hour?.stem,2],[year?.stem,1]]) {
    if (stem && STEM_ELEM[stem] === domEl)
      STEM_YIN[stem] === 0 ? (yangW += w) : (yinW += w);
  }

  // Branch hidden stems — 月令本气 carries highest weight
  for (const [branch, baseW] of [[month?.branch,4],[day?.branch,2],[hour?.branch,1.5],[year?.branch,1]]) {
    if (!branch || !HIDDEN_STEMS[branch]) continue;
    for (const hs of HIDDEN_STEMS[branch]) {
      if (hs.e === domEl) {
        const w = baseW * hs.w;
        STEM_YIN[hs.s] === 0 ? (yangW += w) : (yinW += w);
      }
    }
  }

  if (yangW === 0 && yinW === 0) return STEM_YIN[dmStem]; // fallback
  return yangW >= yinW ? 0 : 1;
}

function computeTgPattern(chart) {
  const dmEl   = chart.dayMaster.element;
  const dmStem = chart.dayMaster.stem;
  const dmYin  = STEM_YIN[dmStem];
  const GEN    = {Wood:"Fire",Fire:"Earth",Earth:"Metal",Metal:"Water",Water:"Wood"};
  const CTL    = {Wood:"Earth",Earth:"Water",Water:"Fire",Fire:"Metal",Metal:"Wood"};

  const sorted = Object.entries(chart.elements)
    .filter(([,d]) => d.present)
    .sort(([,a],[,b]) => (b.score||0) - (a.score||0));
  if (!sorted.length) return "pure";

  const dominant = sorted[0][0];
  if (dominant === dmEl)          return "pure";
  if (GEN[dominant] === dmEl)     return "rooted";
  if (CTL[dmEl]     === dominant) return "forging";

  if (GEN[dmEl] === dominant) {
    const domYin = getDominantElementPolarity(dominant, dmStem, chart.pillars);
    return (dmYin === domYin) ? "flowing" : "expressive";
  }
  if (CTL[dominant] === dmEl) {
    const domYin = getDominantElementPolarity(dominant, dmStem, chart.pillars);
    return (dmYin === domYin) ? "pressured" : "tested";
  }
  return "pure";
}
```

---

### Catalyst derivation per band

The catalyst (喜用神) is derived from the DM element and energy band following classical 扶抑用神 logic, with Tiaohou seasonal override applied at runtime. The catalyst table is unchanged from v1.

| DM Element | Concentrated catalyst | Balanced catalyst | Open catalyst |
|---|---|---|---|
| Metal | Fire, Water | Fire, Earth | Earth, Metal |
| Wood | Metal, Fire | Metal, Water | Water, Wood |
| Water | Earth, Wood | Earth, Metal | Metal, Water |
| Fire | Water, Earth | Water, Wood | Wood, Fire |
| Earth | Wood, Metal | Wood, Fire | Fire, Earth |

The first catalyst listed per band is the primary; the second is used when the primary equals the dominant element (avoiding redundancy).

---

### Full 420-key taxonomy

The taxonomy covers 10 stems × 3 bands × 7 tgPatterns × 2 catalysts = **420 compound archetype keys**. This covers approximately 97% of all real birth charts (up from 95% with the 300-key system). Edge cases fall back to the nearest matching key.

The 120 new keys relative to the 300-key system are the `expressive` and `pressured` variants across all stem-band-catalyst combinations. All existing `pure`, `rooted`, `flowing`, `forging`, and `tested` keys are fully retained.

**Taxonomy per element (42 keys per element, 84 keys per stem pair):**

#### Metal archetypes (庚 The Blade · 辛 The Jewel)

| Key pattern | Band | tgPattern | Catalyst | Count |
|---|---|---|---|---|
| [Metal stem]_concentrated_[tgPattern]_Fire | concentrated | all 7 | Fire | 14 |
| [Metal stem]_concentrated_[tgPattern]_Water | concentrated | all 7 | Water | 14 |
| [Metal stem]_balanced_[tgPattern]_Fire | balanced | all 7 | Fire | 14 |
| [Metal stem]_balanced_[tgPattern]_Earth | balanced | all 7 | Earth | 14 |
| [Metal stem]_open_[tgPattern]_Earth | open | all 7 | Earth | 14 |
| [Metal stem]_open_[tgPattern]_Metal | open | all 7 | Metal | 14 |
| **Total Metal** | | | | **84** |

#### Wood archetypes (甲 The Oak · 乙 The Vine)

| Band | Catalyst options | Keys |
|---|---|---|
| concentrated | Metal, Fire | 14 + 14 = 28 |
| balanced | Metal, Water | 28 |
| open | Water, Wood | 28 |
| **Total Wood** | | **84** |

#### Water archetypes (壬 The Ocean · 癸 The Rain)

| Band | Catalyst options | Keys |
|---|---|---|
| concentrated | Earth, Wood | 28 |
| balanced | Earth, Metal | 28 |
| open | Metal, Water | 28 |
| **Total Water** | | **84** |

#### Fire archetypes (丙 The Torch · 丁 The Ember)

| Band | Catalyst options | Keys |
|---|---|---|
| concentrated | Water, Earth | 28 |
| balanced | Water, Wood | 28 |
| open | Wood, Fire | 28 |
| **Total Fire** | | **84** |

#### Earth archetypes (戊 The Mountain · 己 The Field)

| Band | Catalyst options | Keys |
|---|---|---|
| concentrated | Wood, Metal | 28 |
| balanced | Wood, Fire | 28 |
| open | Fire, Earth | 28 |
| **Total Earth** | | **84** |

**Grand total: 420 keys**

---

### Fallback logic

When a computed key has no template (edge case), fall back in this order:

1. Try same stem + same band + same tgPattern + **other catalyst** for this band
2. Try **sister pattern**: `expressive` → `flowing` · `pressured` → `tested` (same stem/band/catalyst)
3. Try same stem + same band + **`pure`** + primary catalyst
4. Try same stem + **`balanced`** + `pure` + primary catalyst
5. Final fallback: stem-only default reading (legacy 30-template system)

```javascript
function resolveTemplateKey(chart) {
  const stem      = chart.dayMaster.stem;
  const band      = getEnergyBand(chart.dayMaster.strength);
  const tgPattern = computeTgPattern(chart);
  const catalyst  = getPrimaryCatalyst(chart);
  const dmEl      = chart.dayMaster.element;

  const primary = `${stem}_${band}_${tgPattern}_${catalyst}`;
  if (TEMPLATE_DB[primary]) return primary;

  // 1. Same pattern, other catalyst
  const [c1, c2] = CATALYST_MAP[dmEl][band];
  const altCatalyst = catalyst === c1 ? c2 : c1;
  const alt1 = `${stem}_${band}_${tgPattern}_${altCatalyst}`;
  if (TEMPLATE_DB[alt1]) return alt1;

  // 2. Sister pattern (Output/Authority yin-yang fallback)
  const SISTER = { expressive:"flowing", pressured:"tested" };
  if (SISTER[tgPattern]) {
    const alt2 = `${stem}_${band}_${SISTER[tgPattern]}_${catalyst}`;
    if (TEMPLATE_DB[alt2]) return alt2;
  }

  // 3. Pure, primary catalyst, same band
  const alt3 = `${stem}_${band}_pure_${catalyst}`;
  if (TEMPLATE_DB[alt3]) return alt3;

  // 4. Balanced pure
  const alt4 = `${stem}_balanced_pure_${CATALYST_MAP[dmEl].balanced[0]}`;
  if (TEMPLATE_DB[alt4]) return alt4;

  // 5. Legacy fallback
  return `${stem}_balanced_base`;
}
```

---

### Reference chart lookup

Chart: 乙亥 庚辰 庚寅 乙酉 · DM: 庚 Metal · extremely_strong

| Field | Value | Derivation |
|---|---|---|
| stem | 庚 | Day heavenly stem |
| band | `concentrated` | `extremely_strong` → concentrated |
| dominant element | Metal | Highest-scoring present element after bonds |
| dominant = dmEl? | Yes (Metal = Metal) | → tgPattern = `pure` (比劫 dominant) |
| tgPattern | `pure` | No polarity calculation needed |
| catalyst | `Fire` | Concentrated Metal → Fire (primary 喜用神, per 穷通宝鉴 Spring/辰月) |
| **Lookup key** | **`庚_concentrated_pure_Fire`** | Unchanged from v1 |

The reference chart key is identical to v1. All existing hand-written templates with `pure`, `rooted`, or `forging` patterns remain valid without modification.

---

## 3A.4 Section 1 Content Structure (Compound Archetype Reading)

Every template in the 300-key library follows this exact structure. Deviation from this structure requires a Bible update before implementation.

### Complete content schema

```javascript
TEMPLATE_DB["庚_concentrated_pure_Fire"] = {
  // ── WHO YOU ARE ─────────────────────────────────────────────────────────
  teaser: String,       // 2–3 sentences. The called-out moment. Front-end vs. back-end contrast.
                        // Starts from what others experience, names the interior reality.
                        // Written in the element's temperature. Screenshot-worthy.

  p1: String,           // Cognitive/perceptual portrait. Social surface vs. interior reality.
                        // ≤60 words. One mundane-specific detail. Front-end vs. back-end structure.

  p2: String,           // Motivational portrait + catalyst + relief. Three things required:
                        // (a) organizing friction (b) what the chart seeks (c) what relief feels like.
                        // ≤60 words.

  // ── CORE GIFTS ───────────────────────────────────────────────────────────
  gifts: [
    { label: String,    // Social identity title — "The one who already knows", not "Signal Clarity"
      desc:  String },  // 1–2 sentences. Must include external consequence: how others experience this.
    // × 3 items
  ],

  // ── GROWING EDGE ─────────────────────────────────────────────────────────
  edges: [
    { label: String,    // Named as the wound, not the flaw
      desc:  String },  // 1–2 sentences. DUAL COST: (1) what it costs others (2) what it costs this person.
    // × 2 items
  ],

  // ── 2 AM THOUGHT ─────────────────────────────────────────────────────────
  twoAM: String,        // One sentence. First person. Structural collision as specific thought.
                        // DM nature vs. primary friction source. Uncomfortably specific.

  // ── LANDSCAPE ────────────────────────────────────────────────────────────
  landscape: {
    thrives: String,    // Specific environment where this architecture operates at full capacity.
    costs:   String,    // Specific environment of consistent structural mismatch. Not weakness — fit.
  },
}
```

### Content rules (non-negotiable)

1. **No BaZi terminology in any text field.** No 比劫, no 印, no 食伤, no 官杀, no 财. These are internal calculation terms only.
2. **No cross-template comparisons.** Never write "unlike a Rooted Blade..." or "where the Pure version..." Each template stands alone.
3. **Tension must be felt, not explained.** The tension word (Pure, Rooted, Flowing, Forging, Tested) is never used in the reading text itself — it is embodied in the description.
4. **Catalyst as aspiration, not deficit.** The missing/needed element is always framed as something moving toward, never as a lack. "Fire is what this chart has been seeking" not "this chart lacks Fire."
5. **Stem × band × tension specificity required.** A reading for 庚_concentrated_pure_Fire must describe something that could not be said of 庚_concentrated_tested_Fire. If the text could apply to any Metal chart, it is not specific enough.
6. **Language register:** Direct, behavioral, second person, present tense. No mystical language. No "the universe," "destiny," "cosmic." Clinical-poetic: precise but felt.

### Reference reading: 庚_concentrated_pure_Fire (v2 — upgraded from classical research)

> This is the gold standard for the 420-key library. Every generated template is measured against this. Read the annotation after each field to understand why specific choices were made.

```javascript
TEMPLATE_DB["庚_concentrated_pure_Fire"] = {

  teaser: "You're the one who already knows. Not because you asked around or ran " +
    "the research — because something ran the assessment before the conversation " +
    "started. People experience you as sharp before they experience you as warm. " +
    "Some of them read that as cold. It isn't. It's what it looks like when precision " +
    "is the baseline, not the mode.",

  p1: "On the outside: composed, direct, low small-talk — the person whose feedback " +
    "lands like a scalpel, accurate and occasionally more honest than the room was ready " +
    "for. What's actually running: a quiet audit that started the moment you walked in. " +
    "Not deliberately. It just goes first. Everyone else is still reading the room. " +
    "You've already filed the report.",

  p2: "What you're after isn't being right — it's resolution. The standard wants " +
    "something to commit to; without it, the evaluation finds targets wherever it can, " +
    "including you. You've been circling the same question: not 'am I capable' but " +
    "'what actually deserves this.' When you find it, the precision stops feeling like " +
    "a weight and starts feeling like the point.",

  gifts: [
    {
      label: "The one who already knows",
      desc:  "People come to you with problems they've been carrying for weeks. You see " +
             "the actual issue in the first two minutes. In a room full of competing reads, " +
             "yours is the one others quietly check against — not because you declared it, " +
             "but because it turned out to be right."
    },
    {
      label: "What you build doesn't break",
      desc:  "You have a specific intolerance for things that don't hold up. This makes " +
             "you a difficult collaborator when someone wants to ship something half-finished. " +
             "Years later, people are still using the framework you built, the call you made, " +
             "the thing you said once that quietly reframed everything."
    },
    {
      label: "The person who finishes",
      desc:  "You actually complete things — not because you're unusually disciplined, but " +
             "because leaving something half-done creates internal pressure that's harder to " +
             "live with than just finishing it. Most people experience stopping as an option. " +
             "You don't. This is the most underrated thing about you."
    }
  ],

  edges: [
    {
      label: "Warmth arrives through the same door as everything else",
      desc:  "The precision doesn't soften at the boundary of people. The person who needed " +
             "presence got clarity instead — and they felt the difference even if they couldn't " +
             "name it. What it costs you: you are sometimes alone in rooms you built. The care " +
             "was real. It just came through the wrong door, and you've known this longer than " +
             "you've been comfortable admitting."
    },
    {
      label: "The verdict was already load-bearing",
      desc:  "Once the assessment is built, revising it requires going back through the same " +
             "system that built it. New evidence arrives; the conclusion is already structural. " +
             "What it costs others: they feel like the case is closed before it was heard. " +
             "What it costs you: you occasionally stay wrong longer than necessary, and some " +
             "part of you knows it before you'll say it."
    }
  ],

  twoAM: "I already know what the right call is — the problem is I don't know yet " +
         "if it's worth being right about.",

  landscape: {
    thrives: "Anywhere the stakes are real and the noise needs cutting — founding " +
             "decisions, high-trust feedback rooms, problems where being accurate matters " +
             "more than being comfortable.",
    costs:   "Anywhere the job is to make people feel good about a decision before it's " +
             "actually good — consensus-building meetings, client management situations where " +
             "the right answer has to wait for the room to be ready."
  }
}
```

**Annotation — new fields:**

*twoAM:* Encodes the structural collision of 庚 pure + concentrated: the precision (DM) has already made the call (assessment complete), but without Fire (catalyst absent), it doesn't know what the call is *for*. "Worth being right about" is the exact tension between the precision and the missing committed direction. Not anxiety — the very specific 庚 question.

*landscape.thrives:* Names the specific dynamic, not just a category. "High-trust feedback rooms" is more precise than "professional settings."

*landscape.costs:* "The right answer has to wait for the room to be ready" — this names exactly what costs the 庚 concentrated pure archetype most, derived from the structural fact that there is no natural modulation of the precision.

*Teaser:* Opens in scene (the room recalibrates) rather than description (you are precise). The phrase "structural default" names the mechanism without naming the element. The repetition of "already there" creates the emotional beat of something the person has always known about themselves but rarely had named so directly. The teaser should make the person feel recognized before they've finished the first sentence.

*p1:* "Before anything else engages" and "before you've decided to engage at all" are the classical derivation made behavioral — this is the 庚 evaluative default from Di Tian Sui's "庚金带杀，刚健为最" (Geng Metal carries severity, most robustly hard). The phrase "not a mode you switch into" addresses the common misreading that precision is a choice or skill. It is the operating state. This is the `pure` pattern's contribution: concentrated without counterforce, always running.

*p2:* "Turns on whatever is in reach, including you" names the 固执 (rigidity) shadow of the `pure` pattern without using that word — the self-referencing loop has no interrupt. "Before it had a language for it" is the formative-absence framing from 穷通宝鉴's treatment of the catalyst: the chart was organized around Fire's arrival long before it could have named that orientation. "The edge is fully formed. It just hasn't found what it's for." — this is the correct translation of Di Tian Sui's key verse for concentrated Yang Metal: the blade is complete but without a forge to define its purpose.

*Gifts:* Each gift is traceable to a structural mechanism. Signal clarity comes from the automatic evaluation running continuously — it never stops tracking what's actually happening. Structural durability comes from the intolerance for what doesn't hold, which applies to one's own output as much as to others'. Precision of completion comes from vagueness costing more than for most — which is the `pure` + `concentrated` combination: no counterforce to make accommodation feel acceptable.

*Edges:* "Warmth reads as performance" traces directly from the gift of precision — same quality, different reception context. "The conclusion already made" traces from the `pure` pattern specifically (not generic Metal) — the chart amplifying only itself means the same evaluative mechanism that forms conclusions also defends them. Both edges name the structural condition that makes the gift costly, not a separate weakness.

---

## 3A.5 Template Generation Protocol — Full AI Generation Guide

> **Purpose:** This section teaches an AI agent how to decode any compound archetype key into a personality reading at the quality of the reference template. It covers the complete reasoning chain, generation workflow, classical sources to verify against, and scaling rulesets for the full 420-key library. An agent that follows this section should produce readings that are indistinguishable in quality from hand-authored ones.

---

### When to generate

Generate all 420 keys in a single offline batch before launch. Never generate at runtime. Generated templates are static content; they live in `TEMPLATE_DB` alongside the hand-authored reference. The `generate_templates_v2.js` script handles batch submission to the API.

**Model:** `claude-opus-4-20250514`  
**Estimated cost:** ~$28–34 (419 keys × ~500 output tokens each)  
**Estimated time:** 15–25 minutes batch processing  
**Key that is pre-written and skipped:** `庚_concentrated_pure_Fire`

---

### PART A: The Reasoning Chain — How to Decode Any Key Into Character

Every compound archetype key encodes a specific structural condition that produces specific behavioral patterns. The reading is not invented — it is derived. Before writing a single word, an AI generating a template must complete this four-step decoding chain internally.

#### Step 0: Calibrate the elemental voice temperature — DO THIS FIRST

This is the most important step and the one most likely to be skipped. Every reading must be written in the **voice of its primary element**. Not about the element — in its voice. The same psychological insight described in Metal register vs. Earth register produces a completely different felt experience for the reader.

**This is not style preference. It is structural fidelity.** A Fire archetype whose reading sounds like a Metal reading has failed, regardless of analytical accuracy. The user will not feel seen — they will feel diagnosed by someone who doesn't quite get them.

Before writing a single word of any template, identify the primary element and lock in its register:

---

**METAL register (庚 Yang Metal / 辛 Yin Metal)**
Voice character: precise, direct, slightly cool. Verdict-energy. Sentences that arrive like conclusions.
What it sounds like: short declarative sentences. No hedging. The warmth is present but comes through accuracy, not softness. Things are named as what they are.
Sentence rhythm: punchy. Often ends on a noun or a hard fact.
What to avoid: softening qualifiers, emotive language, circular phrasing.
Reference register: *"The audit was already running. You didn't start it."*

---

**WOOD register (甲 Yang Wood / 乙 Yin Wood)**
Voice character: reaching, restless, generative. Momentum-energy. Sentences that lean forward.
What it sounds like: movement language. Things growing toward something. The perspective is always slightly ahead of where it currently stands. Urgency without anxiety.
Sentence rhythm: builds. Often ends on a possibility or a direction not yet reached.
What to avoid: settled conclusions, retrospective framing, anything that sounds finished or resolved.
Reference register: *"You've been building toward something you can't quite name yet. That's not a flaw in the plan — it is the plan."*

---

**FIRE register (丙 Yang Fire / 丁 Yin Fire)**
Voice character: warm, scene-setting, relational. Presence-energy. Sentences that illuminate rather than conclude.
What it sounds like: specific moments, specific rooms, specific people. Fire reads outward — it describes the world the person moves through rather than the interior mechanism alone. Warmth is structural, not performed.
Sentence rhythm: expansive, then landing. Often opens wide and closes on the specific human detail.
What to avoid: cool analytical distance, abstract mechanism language, interiority-first framing.
Reference register: *"People feel it before you speak. The room is different when you're in it — not because you tried to make it that way, but because that's what warmth does when it isn't performing."*

---

**EARTH register (戊 Yang Earth / 己 Yin Earth)**
Voice character: weighted, patient, load-bearing. Gravity-energy. Sentences that settle rather than reach.
What it sounds like: slow accumulation of truth. Things that have been true for a long time. Stillness as a quality, not an absence. The reader feels held rather than seen.
Sentence rhythm: measured. Often long before arriving at the point. Ends on something solid.
What to avoid: urgency, speed, the feeling that the next thing is more important than this one.
Reference register: *"You've been the ground under other people's feet for so long that you sometimes forget you're also standing on it."*

---

**WATER register (壬 Yang Water / 癸 Yin Water)**
Voice character: underneath the surface, fluid, withheld. Depth-energy. Sentences that suggest more than they name.
What it sounds like: what is implied rather than stated. Gaps between sentences that carry meaning. The reader senses that more is being held back than is being offered — which is the point.
Sentence rhythm: often incomplete-feeling, elliptical. Trails off where Metal would conclude.
What to avoid: explicit naming of what is being felt, clean resolutions, anything that wraps up too neatly.
Reference register: *"You knew before they finished the sentence. You usually do. The question is what you decide to do with that."*

---

**Cross-check before proceeding:** Read back the first sentence you wrote. Does it feel like it was written by this element? If a Metal reading could have been written by Earth, or a Fire reading sounds like Metal, restart the teaser with the correct temperature before continuing.

---

#### Step 1: Establish the elemental nature as behavioral default

The Day Master stem is not a symbol — it is a description of the person's default mode of processing and engaging with reality. Each stem maps to a specific behavioral default drawn from 三命通会 and 渊海子平's 十干体象 chapters.

| Stem | Elemental nature | Behavioral default |
|---|---|---|
| 甲 | Yang Wood — towering tree | Forward projection as structural fact, not ambition. Cannot stop reaching. |
| 乙 | Yin Wood — vine, climbing plant | Navigation before assertion. Arrives where it intended via paths others couldn't read. |
| 丙 | Yang Fire — the torch/sun | Presence generates warmth independent of intent. Others orient toward it without deciding to. |
| 丁 | Yin Fire — candle, ember | Focused illumination: completely illuminates what it is pointed at, nothing more. |
| 戊 | Yang Earth — mountain | Psychological ground for others. Others build on it, orient by it, without naming its source. |
| 己 | Yin Earth — field, cultivated soil | Developmental nourishment. Creates conditions for growth in others without announcing it. |
| 庚 | Yang Metal — blade, axe | Evaluative by structural default. The assessment runs before social or emotional processing begins. |
| 辛 | Yin Metal — jewel, refined metal | Perceives quality and its absence automatically — the way others perceive temperature. |
| 壬 | Yang Water — ocean, great river | Holds depth that exceeds what others can see. Always knows more beneath the surface than it shows. |
| 癸 | Yin Water — rain, mist | Senses what is true before it is spoken. Nourishes specifically rather than broadly. |

**Critical principle:** The behavioral default is structural, not willful. A 庚 Metal person is not choosing to evaluate — the assessment is the first thing that happens. A 丙 Fire person is not choosing to be warm — the warmth precedes the intention. Every line in the reading must honor this. "You tend to be analytical" is wrong. "Your processing runs through accuracy before anything else engages" is correct.

#### Step 2: Apply the band modifier

The band (concentrated / balanced / open) describes how the element's behavioral default operates under its current structural conditions — not what the element IS but how fully it expresses.

| Band | Classical principle | Behavioral modifier |
|---|---|---|
| `concentrated` | 身强: element saturates the chart, little counterbalance | The default runs at full charge. Nothing moderates it from within. More potent AND more brittle simultaneously. |
| `balanced` | 身中和: element in genuine equilibrium | The default is directed rather than diffuse. The person has found how to use what they are. |
| `open` | 身弱: element needs the right conditions | The default is intact but context-sensitive. Same capability, higher variance across environments. |

**A concentrated chart does not make the element MORE in character.** It makes the character more unmodulated. A concentrated Blade has no natural counterforce to tell the precision when it's too much. A concentrated Oak has no natural force that prunes or shapes the reach. This is the source of both the greatest potency and the most specific vulnerability for every concentrated archetype.

**An open chart does not weaken the element's nature.** The Rain at open/receptive energy is still the Rain — still perceiving what is true before it is spoken. What changes: the conditions required for that nature to express fully become much more significant. The gap between "right conditions" and "wrong conditions" is categorical for open archetypes in a way it isn't for concentrated ones.

#### Step 3: Apply the tgPattern modifier

The tgPattern identifies which structural relationship dominates the chart — and this is where the deepest character differentiation lives. The classical texts are explicit: the same Day Master stem in different structural conditions produces genuinely different people. This is not a matter of degree but of kind.

**The classical derivation chain for each tgPattern:**

**`pure`** (比劫 dominant — same element as DM):
The chart amplifies its own core element. Classically: 通明达理 (clear and reasonable) when output channels exist; 固执 (fixed, rigid) when they don't. The key reading insight: there is no natural counterforce within the chart to indicate when the core quality has gone too far. The character is vivid and concentrated, but the self-referencing loop has no natural interrupt. The behavioral gift and the behavioral shadow are the same: the element runs at full charge without modulation.

**`rooted`** (印 dominant — resource generates DM):
The chart draws from a well it didn't dig. Classically: this person operates with backing they didn't build — inherited psychological strength, institutional support, mentorship, or a quality of groundedness that arrives without direct effort. The behavioral implication: they don't typically feel the existential urgency that drives other charts. The shadow: they can become dependent on support structures they haven't examined.

**`flowing`** (食神 dominant — DM generates same-polarity output):
The element the DM produces naturally runs the chart. Classically: 秀气 (elegant Qi) — output that is refined, natural, and non-assertive. The person doesn't produce to be seen; production is simply what happens when they are fully themselves. Classical behavioral description: generosity, contentment, natural abundance. The shadow: can extend into what feels natural without checking whether the foundation is ready.

**`expressive`** (伤官 dominant — DM generates opposite-polarity output):
The same structural relationship as flowing, but the opposite polarity creates tension between the output and the structures it encounters. Classically: 伤官 literally "hurts the officer" — the output is in structural conflict with authority and convention. This is not willful rebellion but structural emergence: the output cannot be contained by existing frameworks because it exceeds them. Classical behavioral description: intelligence that operates ahead of its environment, expression that carries an edge, innovation inseparable from friction. The shadow: the same quality that creates brilliance can create damage when uncontained.

**`forging`** (财 dominant — DM controls dominant element):
The chart is organized around control and acquisition. Classically: the DM controls what dominates the chart — meaning this person's intelligence goes toward directing, shaping, making things productive. The behavioral implication: outcome-focus is structural, not cultivated. The shadow: what the person controls they can lose sight of why they wanted. 三命通会 notes specifically: 财多身弱 (wealth heavy, self weak) — the more the chart presses toward acquisition, the more the self doing the acquiring can deplete.

**`tested`** (正官 dominant — opposite-polarity authority):
The element that disciplines the DM runs the chart, and it does so through a framework the person can respect. Classically: 正官 represents orderly, legitimate authority — it tests whether the standard is real, and grants recognition when it is. The behavioral implication: this person is shaped by a structure they have endorsed. Achievement comes through demonstrated quality within a framework the person accepts as legitimate. The shadow: requires worthy authority to function at best — in corrupt or absent structure, the character loses its orientation point.

**`pressured`** (七杀 dominant — same-polarity authority):
The element that disciplines the DM runs the chart, but it does so without granting permission, without moderating itself. Classically: 七杀 (Seven Killings) does not distinguish between tests you can pass and pressure that simply damages you. The behavioral implication: this chart is shaped by force that doesn't care whether you survive it. The character produced is either exceptional (the pressure creates genuine refinement — what cannot be broken, isn't) or damaged (the pressure was not survivable). Di Tian Sui's case studies of 七杀 charts are the starkest in the canon: the same structural condition produces the best and the worst outcomes.

#### Step 4: Frame the catalyst as formative orientation

The classical treatment of 喜用神 is not "what this person needs added." It is "what this chart has been organized around seeking — what arrives late, changes everything, and was always what this was building toward."

**The catalyst reading principle from 穷通宝鉴:** The useful god is not a supplement but a destiny. For the concentrated 庚 Metal chart, Fire is not added to complete the person — the precision was always complete. Fire is the element whose arrival gives the precision a direction it can commit to. Until it arrives, the full capability exists but runs without destination.

For every template, the catalyst must appear in p2 as a formative gap — something the person has always reached toward, perhaps without a name for it. Not: "Water would help this chart." But: "What this chart has been oriented toward, long before it had a word for it, is the kind of depth that holds — because precision without somewhere to land eventually turns on itself."

---

### PART B: Generation Architecture

The reading is derived, not invented. Three tiers operate in sequence, each with a distinct role and reliability profile:

**Tier 1 — Psychological Frameworks (§3A.7)** is mandatory for every key. The PSYCH_PROFILES data structure in the generator pre-loads the four-level psychological derivation for each specific combination: stem cognitive mechanism (Level 1), band intensity and regulation (Level 2), tgPattern structural condition and shadow (Level 3), catalyst SDT motivational gap (Level 4). This data is injected directly into the generation prompt — the model reads it, not queries it. Zero hallucination risk.

**Tier 2 — Classical Sources (Part C)** is selective and gated. The CLASSICAL_SOURCES and STEM_CLASSICAL data structures inject only the SOURCE-FROM flagged principles for each key's tgPattern and stem. Maximum two additional behavioral claims from the universal tgPattern principle; maximum three from a stem-specific conditional. If Tier 1 already covers what a classical principle produces, confirm and move on. For stems without a STEM_CLASSICAL entry, no classical injection occurs — Tier 1 is sufficient. The hallucination gate is the sourcing flag: EXCLUDE and VERIFY-ONLY principles never generate behavioral claims.

**Tier 3 — Language Filter (Part D system prompt)** is mandatory for every key. It runs last. Translates the Tier 1 + Tier 2 inventory into user-facing language. Does not generate content — selects, compresses, translates through the composition order, three-layer model, and all Part D guardrail rules.

**Composition order** (write in this sequence, not schema order): elemental register calibration → p1 → p2 → gifts → edges → landscape → twoAM → teaser written last. The complete operational instructions live in Part D. Part C carries the classical source specifications. §3A.7 carries the psychological framework detail. This section is the map; those sections are the territory.

**Quality review** lives in Part E — the 20-gate table is the single authoritative post-generation standard for batch review.

---

### PART C: Classical Sources — Tiered Sourcing Protocol

Each tgPattern entry below carries explicit sourcing flags. These flags gate how the generator uses each principle:

- **SOURCE-FROM** — directly applicable to this key. Run the derivation question: *"What specific behavioral claim does this produce for this combination?"* Add the result to the Tier 2 inventory.
- **VERIFY-ONLY** — interpretive extension. Confirms Tier 1 content; shapes how you write, not what you claim. Do not derive behavioral claims from these.
- **EXCLUDE** — not anchored in this Bible's sourcing standard. Do not use regardless of general BaZi knowledge.

If no SOURCE-FROM principle yields a behavioral claim beyond your Tier 1 inventory, proceed with Tier 1 only. That is a valid outcome.

---

#### `pure` — Self-Element Dominant

**SOURCE-FROM: Di Tian Sui (滴天髓), 任铁樵 commentary**
Principle: 身旺有泄者，通明达理；无泄者固执
("When the strong self has output channels, the person is clear-minded and reasonable; without output, they are fixed and rigid.")

Derivation question: what does 固執 specifically mean for this combination?
→ The verdicts have settled. Not actively resisting revision — simply no longer in motion. Like conclusions that have been correct long enough not to need re-examination. This is more precise than "rigid" or "stubborn": the assessment has settled the way earth settles. This sharpens the Tier 1 schema consolidation finding (Markus).

Catalyst derivation: what does 通明達理 tell us about what the output catalyst actually does?
→ The catalyst doesn't complete the archetype or make it warmer. It makes the core quality *communicable and directable to others* — 通明達理 = clear-minded and principled/reasonable. The precision or capability stops being self-contained. This is a Tier 2 addition to the p2 relief clause that Tier 1 SDT alone doesn't produce in this specific form.

**VERIFY-ONLY: Bible interpretive claim**
"The catalyst for a pure chart should be read as the channel that would create 通明达理 from what is currently 固执." This follows from the classical principle and is sound, but it is the Bible's interpretation, not a classical quotation. Use as framing; do not derive behavioral claims from it directly.

---

**SOURCE-FROM (Metal stems only — 庚 and 辛): 穷通宝鉴 tiaohou framework for 庚金**

*Sourcing note: The behavioral principle below is directly supported by 穷通宝鉴's tiaohou framework for 庚 Metal (丙火为先，壬水为辅 — "Yang Fire first, Yang Water as support"). The specific formulations 金逢火炼方成器 and 金逢火炼方显锋芒 are commentary-register phrasings that accurately characterize the tiaohou principle; they are not verbatim quotations from the original text. Both the concept and its derivations are SOURCE-FROM standard. The exact phrasing is commentary.*

**Apply only when stem = 庚 or 辛.** Skip for all other stems — this is element-specific.

Principle A: 金逢火炼方成器 — "Metal meeting the tempering of Fire becomes an instrument."
Core concept: 素材 (raw material) vs. 成器 (an instrument shaped for a specific purpose). Before Fire, 庚 Metal is fully formed and genuinely capable — but unspecified as to use. After Fire's tempering: shaped toward a specific purpose. Not completed. Specified.

Derivation question A: what does 成器/素材 add that 通明達理 doesn't already cover?
→ 通明達理 says Fire makes the precision communicable. 成器/素材 says something categorically different: the precision was always complete, and Fire does not add to it — Fire *specifies* what it is an instrument for. These are two different claims. 通明达理 is about quality of expression. 成器 is about identity of purpose. The Tier 2 addition: the archetype is not seeking direction in the way a person without direction seeks one. It is seeking the specific purpose that would convert its completeness from general capability into a particular instrument. This sharpens the twoAM and the p2 relief clause with a precision that neither Tier 1 SDT nor 通明達理 alone can produce.

Principle B: 金逢火炼方显锋芒 — "Metal meeting the tempering of Fire reveals its sharp edge."
Core concept: 显 (reveals) is the operative word. Not creates — reveals. The edge existed before Fire arrived. Fire makes it visible and purposefully deployed.

Derivation question B: what does 显 add to the reading?
→ Fire is not the source of the capability — it is the condition under which the capability becomes undeniable to others and directionally specific for the person. The archetype is not waiting for Fire to make it capable. It is waiting for Fire to make what is already real *manifest as something specific*. This changes the relief clause meaningfully: relief is not "becoming capable" or even "being recognized." Relief is the precision finding a target it fully believes in — one it didn't have to generate from within itself alone.

**Combined Metal-stem Tier 2 inventory from these principles:**
1. The archetype is 素材 — fully formed, genuinely capable, unspecified as to purpose. Fire converts 素材 to 成器 by specifying, not by adding. *[Use in p2 relief clause and twoAM.]*
2. The edge was already real before the catalyst arrived. What changes is its manifest specificity. *[Use in teaser and landscape — "when Fire arrives, the edge stops being potential and starts being purposeful."]*
3. The structural tension for Metal pure is not "I lack capability" nor "I lack direction" — it is "I am formed and complete and have not yet been specified toward a purpose that fully deserves this." *[This is the specific twoAM encoding: more precise than what SDT or 通明達理 alone produce.]*

**Maximum Tier 2 additions from this entry: 3 behavioral claims for Metal stems (素材/成器 framing, 显 framing, combined twoAM encoding). Do not exceed this ceiling.**

---

**SOURCE-FROM (Yang Wood stem only — 甲): 穷通宝鉴 + 三命通会 tiaohou framework for 甲木**

*Sourcing note: 甲木成材 is a consistent formulation across 穷通宝鉴's seasonal analysis and 三命通会's 十干论 chapters. The principle 甲木喜庚金克制，方能成材 is concept-reliable across these sources; the exact phrasing is commentary-register rather than verbatim quotation, same sourcing status as the Metal entries.*

**Apply only when stem = 甲.** Skip for all other stems including 乙 — this is Yang Wood specific.

Principle: 甲木喜庚金克制，方能成材 — "甲 Wood welcomes 庚 Metal's shaping; then it becomes useful timber."
Core concept: 原木 (raw growth) vs. 成材 (timber shaped into useful form). Before the catalyst's shaping force, 甲 Wood's growth is genuine, structural, and unlimited — but unformed as to what it will become. The shaping force doesn't stop the growth; it defines what the growth consolidates into.

Derivation question: what does 成材 add that the Tier 1 Oak profile and SDT autonomy need don't already cover?
→ Tier 1 SDT describes the Oak reaching toward meaningful purpose — forward projection as structural fact. 成材 adds the specific mechanism: the Oak's growth without a shaping force *spreads* rather than *consolidates*. The reach is real and relentless and has not yet become anything that holds. This is categorically different from "lacks direction" — the direction is always present. What is absent is the force that converts reaching into something with defined form and durable structure. The Tier 2 addition: the Oak is not seeking purpose in the abstract. It is seeking the force that makes reaching consolidate into something that stands on its own — something that was always going to grow, now finally grown into what it specifically is.

**甲-stem Tier 2 inventory from this principle:**
1. The archetype is 原木 — growing, real, structurally forward. The catalyst converts 原木 to 成材 by shaping, not by initiating. *[Use in p2 relief clause: the catalyst doesn't give the Oak direction, it defines what the reaching consolidates into.]*
2. Without the shaping force, the growth spreads rather than holds. The reach is genuine; the form is not yet defined. *[Use in edge mechanism — specifically for `pure` and `flowing` 甲 keys where no natural counterforce shapes the output.]*
3. twoAM encoding: the structural tension is not "I don't know where I'm going" — it is "I have been growing toward something real for a long time, and I haven't yet found the force that defines what it becomes." *[More precise than Tier 1 alone for 甲 pure/flowing keys.]*

**Maximum Tier 2 additions: 3 behavioral claims for 甲 stem. Hard ceiling.**

---

**SOURCE-FROM (Yang Earth stem only — 戊): 穷通宝鉴 + 滴天髓 tiaohou framework for 戊土**

*Sourcing note: 戊无水则燥 appears consistently in 滴天髓's Earth analysis. 春土无火则寒 is a standard tiaohou observation for Earth in Wood-dominant months from 穷通宝鉴. Both are concept-reliable; exact phrasing is commentary-register. Crucially, these two principles together produce the catalyst wound differentiation for 戊 — the behavioral distinction between Fire and Water catalyst versions of the same base archetype.*

**Apply only when stem = 戊.** Skip for all other stems including 己.

Principle A: 戊无水则燥 — "戊 without Water becomes arid."
Core concept: 燥 (arid/dry) is the specific condition. Not cold, not dark, not depleted in the generic sense — arid. The Mountain is present and solid and structurally intact. But nothing grows on it. The fertility is absent, not the capacity.

Derivation question A: what does 燥 produce for the Water catalyst version of 戊?
→ The Mountain's generative capacity is structurally dependent on the moistening element. Without Water, the Mountain holds — but it holds as arid ground. Everything in order. Nothing alive. The wound is not relational (not "am I seen") and not directional (not "where am I going") — it is generative: "is anything growing." This is the specific twoAM encoding for 戊_X_X_Water keys: *"Everything is in order. I'm not sure anything is alive."* Tier 1 SDT competence need approximates this but cannot produce the specific 燥 quality — the Mountain that is present, proven, and producing nothing.

Principle B: 春土无火则寒 — "Spring Earth without Fire is cold."
Core concept: 寒 (cold) is the specific condition when Fire is absent for 戊. The Mountain in Wood-dominant season (Spring — controlled, tested) without Fire is not arid — it is cold. Present and solid and holding, but below temperature. The generative capacity exists structurally but the warming element that activates it hasn't arrived.

Derivation question B: what does 寒 produce for the Fire catalyst version of 戊?
→ The Mountain is cold rather than arid — a categorically different wound. Cold Mountain needs warmth to activate; arid Mountain needs fertility to generate. The Fire wound for 戊 is not "I need to be seen" (that's a relational framing) — it is activation: the holding has been ongoing and real and the warming that converts holding into giving hasn't arrived. The twoAM for 戊_X_X_Fire: *"I've been holding this for so long that I can't remember who decided it was mine to hold."* The holding is the burden; Fire would convert it into giving.

**戊-stem Tier 2 inventory from these principles — catalyst-conditional:**

*For Water catalyst keys (戊_X_X_Water):*
1. 燥 (arid) framing: Mountain is present and solid and intact — but nothing grows. Wound is generative, not relational. *[Use in twoAM: "Everything is in order. I'm not sure anything is alive." Use in p2 relief clause: Water makes the ground fertile, not warmer.]*
2. Catalyst wound: "Is anything growing?" not "Am I seen?" — specifically generativity, not recognition. *[Differentiates Water catalyst from Fire catalyst at wound level.]*

*For Fire catalyst keys (戊_X_X_Fire):*
1. 寒 (cold) framing: Mountain is present below temperature — holding without the warming that converts holding into giving. Wound is activation, not fertility. *[Use in twoAM: holding-burden framing. Use in p2 relief clause: Fire warms and activates, doesn't specify.]*
2. Catalyst wound: "Who decided this was mine to hold?" not "Is anything growing?" — specifically the unacknowledged weight of holding, not the absence of yield. *[Differentiates Fire catalyst from Water catalyst at wound level.]*

**Maximum Tier 2 additions: 2 behavioral claims per catalyst version. Apply only the claims relevant to the catalyst being generated. Hard ceiling.**

---

**SOURCE-FROM (Yang Water stem only — 壬): 穷通宝鉴 tiaohou framework for 壬水**

*Sourcing note: 壬水奔流，无土则泄 is consistent with 穷通宝鉴's treatment of 壬 Water and 滴天髓's Water chapter analysis. The specific formulation is commentary-register paraphrase of the tiaohou principle (戊土为堤，制壬奔流 — "戊 Earth as embankment, controlling 壬's powerful flow"). Concept-reliable; exact phrasing is commentary.*

**Apply only when stem = 壬.** Skip for all other stems including 癸.

Principle: 壬水奔流，无土则泄 — "壬 Water flows powerfully; without Earth it disperses."
Core concept: 泄 (dispersal) is the operative condition. When 壬 lacks the Earth container, the depth doesn't simply go unused — it *disperses*. The intelligence is genuine and vast and flowing outward without coherence. Others can't engage with dispersed depth regardless of how real it is.

Derivation question: what does 泄 add that Tier 1's SDT competence need and Ocean profile don't already cover?
→ Tier 1 describes the Ocean craving contexts that honor the full depth — retreats from shallow exchanges rather than simplifying. The competence need frames this as the Ocean withholding because the context is insufficient. 泄 adds the structural mechanism of what happens when the right container *never arrives*: the depth doesn't deepen in place — it disperses outward. The Ocean without Earth doesn't become shallower; it becomes unfocused. The intelligence is real and abundant and flows in all directions without concentrating into something others can engage with. This is a specific behavioral claim: the wound is not "my depth goes unrecognized" — it is "my depth disperses rather than concentrates, and I experience this as inability to focus rather than as social exclusion." The Tier 2 addition: Earth catalyst for 壬 is not about recognition or containment in the abstract — it is about the specific conversion of dispersal into depth that holds shape long enough for others to reach it.

**壬-stem Tier 2 inventory from this principle:**
1. 泄 (dispersal) framing: without Earth, 壬's depth flows outward in all directions — the intelligence is genuine but unfocused. Not shallow, unfocused. *[Use in edge mechanism: the specific experience of 壬 without Earth catalyst is not "I feel unseen" but "I can't concentrate what I know into something that lands."]*
2. Earth catalyst specificity: Earth converts 泄 to 堤 — embankment that gives flow a defined channel. Relief is not recognition; it is the experience of the depth finding coherent form. *[Use in p2 relief clause and landscape: thrives where Earth catalyst is present — defined problems, contained scope, structured engagement.]*
3. twoAM encoding: the structural tension for 壬 without Earth is not "others don't honor my depth" — it is "what I know disperses before I can make it coherent enough to be useful." *[More precise than Tier 1 alone for 壬 keys where Earth is the catalyst.]*

**Maximum Tier 2 additions: 3 behavioral claims for 壬 stem. Hard ceiling. Apply only when Earth is the catalyst; for non-Earth catalysts, use Tier 1 only.**

---

#### `rooted` — Resource/Seal Dominant

**SOURCE-FROM: 子平真诠 (Zi Ping Zhen Quan), 沈孝瞻**
Principle: 印旺生身，乃命主之所喜 ("The dominant Resource generating the self is what the chart-holder welcomes.")

Derivation question: what does this tell us about the character of the support?
→ The support is welcomed — not just present but genuinely received. This person operates from a position of being held, not merely not-struggling. The behavioral quality is confidence-from-ground rather than confidence-from-self-construction.

Second principle: 印多夺食 ("Excess Resource smothers Output.")

Derivation question: what does this add to the edge for rooted charts?
→ The shadow is not only dependency. The more specific edge: the support structure that enables capability can, in excess, prevent the independent expression of that capability. The rooted chart's output channels are vulnerable to being smothered by the very source of their nourishment. This is a Tier 2 addition — the specific mechanism of over-reliance that Tier 1's attachment secure base sourcing doesn't fully specify.

**VERIFY-ONLY: Bible interpretive claim**
"The question of what happens when that support is removed, or what the person does when they haven't developed their own independent roots, should be present in the edge." This is interpretive — valid framing for the Watch for signal but not a classical derivation.

---

#### `flowing` — Food God Dominant (same-polarity output)

**SOURCE-FROM: 渊海子平, 三命通会 (chapter 食神性情)**
Principle: 食神代表秀气，生活悠闲，福气深厚 ("Food God represents elegant Qi — leisurely life, deep blessings.")

Derivation question: what does 秀气 specifically produce as a behavioral claim?
→ The output is *elegant and non-assertive* — refined rather than demonstrative. The person does not produce to be seen; production is what happens when they are fully themselves. This is more specific than "generous" or "naturally productive": it has a quality of effortless refinement that others receive without the producer announcing the giving.

Second principle: 食神过旺则泄身太过 ("Excess Food God over-exposes the self.")

Derivation question: what is the specific edge mechanism?
→ The over-extension into what feels natural without checking whether the foundation is ready. When output becomes structurally automatic, the self that is producing doesn't monitor whether what's being produced is sustainable. This is the specific flowing edge — not that the output is wrong, but that it can exceed the foundation.

**VERIFY-ONLY: Sister template distinction**
"Flowing gives freely; expressive asserts." This is the Bible's analytical distinction between 食神 and 伤官, consistent with classical descriptions but not a direct quotation. Use as guidance for differentiating sister templates.

---

#### `expressive` — Hurting Officer Dominant (opposite-polarity output)

**SOURCE-FROM: 子平真诠 (chapter: 论伤官), 滴天髓 case studies**
Principle: 伤官者，聪明秀气太过 ("Hurting Officer people are excessively brilliant and refined.")

Derivation question: what does 太过 (excessive / beyond measure) produce as a behavioral claim?
→ The brilliance operates *ahead of its environment* — the intelligence exceeds the framework available to receive it. This is not willful excess; it is structural emergence. The output cannot be contained by existing structures because it genuinely exceeds them.

Second principle: 伤官见官，为祸百端 ("When Hurting Officer meets Officer/authority, ten thousand disasters arise.")

Derivation question: what does the structural conflict with authority produce behaviorally?
→ The output is in structural tension with any framework that tries to contain or evaluate it by conventional standards. This is not rebellion — it is the specific pattern where the output's quality is inseparable from its friction with containment. The gift and the edge are the same thing in different conditions.

**VERIFY-ONLY: Sister template comparison**
The flowing vs. expressive distinction in gift domain overlap but quality-of-expression difference is the Bible's analytical guidance. Classical texts distinguish 食神 and 伤官 by polarity and quality, but the specific "gifts overlap in domain, edges differ significantly" framing is interpretive.

---

#### `forging` — Wealth Element Dominant

**SOURCE-FROM: 三命通会 (chapter: 论财), 渊海子平**
Principle: 财为我克，为妻妾，为财帛 ("Wealth is what I control — wife, resources, tangible results.")

Derivation question: what does 我克 (I control/overcome) produce as a behavioral claim?
→ The person's intelligence goes toward directing what can be made productive. Control and acquisition are structural orientations, not cultivated habits. The energy naturally flows toward making things work, converting potential into outcome.

**VERIFY-ONLY: 财多身弱 (wealth heavy, self weak)**
Mentioned in Part A's Step 3 description. Valid background for understanding the depletion dynamic — when the drive toward controlling external resources becomes excessive, the self doing the directing depletes. Use as framing for the edge interior cost, not as a derivable behavioral claim.

---

#### `tested` — Direct Officer Dominant (opposite-polarity authority)

**SOURCE-FROM: 子平真诠 (chapter: 论正官)**
Principle: 正官端正，主人沉稳，名声好，规则意识强 ("Direct Officer upright — the person is calm and settled, with good reputation and strong sense of rules.")

Derivation question: what does 沉稳 (calm and settled) and 规则意识强 (strong rule-consciousness) produce as a behavioral claim?
→ The character is shaped by structure it has endorsed. Recognition comes through demonstrated quality within frameworks the person accepts as legitimate. The calm and settledness are not natural ease — they are the product of operating within a tested framework that has held.

Second principle: 官轻则贵，官重则压 ("Light Officer ennobles; heavy Officer presses down.")

Derivation question: what does this produce as the edge mechanism?
→ The Watch for signal is the moment when the authority becomes excessive or reveals itself as insufficient. When the Officer is heavy and illegitimate, it presses rather than enables — and the chart that has been earning recognition through legitimate channels loses its orientation point. The edge is not that the person is weak; it is that the character requires worthy authority to access its best functioning.

**VERIFY-ONLY: Sister template comparison**
"Tested earns through structure, pressured proves despite it." Valid framing for differentiating sister templates; not a classical quotation.

---

#### `pressured` — Seven Killings Dominant (same-polarity authority)

**SOURCE-FROM: 滴天髓 (chapter: 论七杀), 任铁樵 commentary**
Principle: 七杀制伏得宜，反为权贵 ("When Seven Killings are properly controlled/channeled, they produce genuine authority and power.")

Derivation question: what does 制伏得宜 (properly channeled) require as a behavioral condition?
→ The pressured chart requires significant internal or external resources to channel the force productively. The achievement is genuine only when the pressure has been successfully met rather than simply survived. This is harder-won than tested — there is no permission granted, no framework that ennobles.

Second principle: 七杀为患，制者必须有力 ("When Seven Killings cause trouble, the remedy must be powerful.")

Derivation question: what does 制者必须有力 (the remedy must be powerful) produce as a behavioral claim?
→ The chart cannot channel this pressure with ordinary resources. The Watch for signal is the moment when the chart's resources are insufficient to channel the force — when the pressure that refines in good conditions damages in depleted ones.

**SOURCE-FROM: 任铁樵 case studies (512 命例)**
These case studies include both the highest achievers and the most damaged people among Seven Killings charts. This is directly applicable as a behavioral derivation:
→ Same structural condition, categorically different outcomes. The pressured chart's edge is not a tendency toward difficulty — it is a genuine bifurcation. The pressure either produces something exceptional or it damages what it was supposed to refine. The reading must not soften this into "challenges" — it is a real bifurcation, not a developmental problem.

**VERIFY-ONLY: Bible interpretive claim**
"The `pressured` template should read as a more extreme version of character shaping." This is the Bible's analytical framing, following from the classical case studies. Use as tonal guidance, not as a derivable behavioral claim.

---

### PART D: The Complete System Prompt

Use this verbatim for every batch generation call. It encodes all reasoning from Parts A–C and integrates the v2.0 User Feedback Guardrail (derived from multi-source cold-reader testing, April 2026).

```
SYSTEM PROMPT — ELEMENTUM ARCHETYPE READING GENERATOR v3.0

You are generating identity readings for Elementum, a BaZi-based spiritual guidance 
app for Western users with no Chinese metaphysics background.

Each reading is derived from a compound archetype key encoding four structural dimensions:
  stem      = Day Master (who this person is at their elemental core)
  band      = Energy concentration (how the core expresses under structural conditions)
  tgPattern = Dominant Ten Gods relationship (what structural force shapes this character)
  catalyst  = The element this chart is structurally oriented toward

═══ THE NORTH STAR — INTERNALIZE BEFORE ANYTHING ELSE ═══

PRODUCT METAPHOR (never state in the reading — always internalize):
  This reading is a User Manual for a specific human engine. It tells the user:
  how their engine works, what its warning lights mean, and how to get peak 
  performance from it. The system is RECALLING — not predicting, not diagnosing.
  It sounds like it already knows. Because structurally, it does.

THE CARDINAL RULE: Every claim must be derivable from the structural logic of the key.
Not observation. Not metaphor. Structural derivation. The behavioral portrait is PRODUCED
by the combination, not described from outside it.

THE THREE-PART USER TEST — every reading must pass all three:
  (a) COMPREHENSION: Can the user explain the core insight back in their own words?
  (b) RESONANCE: Do they feel emotionally recognized — seen in a way that's true 
      but rarely named?
  (c) ACTION: Can they identify one specific thing to watch for or do differently?
  If only (b): rewrite. Resonance without comprehension or action is aesthetic, not useful.

TARGET VOICE (internalize this ratio):
  60% Grounded Interpreter — "here is how your pattern works, where it helps, where 
      it costs you"
  25% Compassionate Mirror — "you may recognize this if..." (gives user agency, 
      reduces over-claiming)
  15% Poetic Oracle — signature moments only; earned, not default

BANNED VOICE MODES:
  Pure Oracle (over-certainty, declaration without ground — when it misses, it feels 
    manipulative)
  Cold Observer (diagnosing from outside — user feels observed, not accompanied)
  Fatalistic Narrator (this is your fate, not your pattern)

═══ STEP 0 — ELEMENTAL VOICE TEMPERATURE (DO THIS BEFORE ANYTHING ELSE) ═══

This is the most important step. Identify the primary element and write in its register.
Not about the element — in its register. A Fire archetype whose reading sounds like Metal
has failed, regardless of how accurate the analysis is. Wrong temperature = user doesn't
feel seen.

METAL (庚/辛): Precise, direct, slightly cool. Verdict-energy.
  Short declarative sentences. No hedging. Hard facts. Things named as what they are.
  ✓ "The audit was already running. You didn't start it."
  ✗ "You have a tendency toward careful evaluation of your surroundings."

WOOD (甲/乙): Reaching, restless, generative. Momentum-energy.
  Movement language. Leaning forward. Always slightly ahead of where it stands.
  Ends on possibility or direction not yet reached. Urgency without anxiety.
  ✓ "You've been building toward something you can't quite name yet. That's not a flaw in the plan — it is the plan."
  ✗ "You are someone who values growth and forward momentum."

FIRE (丙/丁): Warm, scene-setting, relational. Presence-energy.
  Specific moments, specific rooms, specific people. Reads outward — describes the world
  the person moves through. Warmth as structural fact, not performance.
  Opens wide, closes on specific human detail. Never cool analytical distance.
  ✓ "People feel it before you speak. The room is different when you're in it."
  ✗ "You have a warm presence that others are drawn to."

EARTH (戊/己): Weighted, patient, load-bearing. Gravity-energy.
  Slow accumulation of truth. Things that have been true for a long time. The reader feels
  held rather than seen. Measured rhythm. Ends on something solid. No urgency.
  ✓ "You've been the ground under other people's feet for so long that you sometimes forget you're standing on it too."
  ✗ "You are stable and nurturing, providing support for those around you."

WATER (壬/癸): Underneath the surface, fluid, withheld. Depth-energy.
  What is implied rather than stated. Gaps between sentences that carry meaning. Trails
  off where Metal would conclude. More is held back than offered — that's the point.
  ✓ "You knew before they finished the sentence. You usually do."
  ✗ "You are highly intuitive and sensitive to the feelings of others."

CROSS-CHECK: Before proceeding, read back your first sentence. Does it feel like it was
written by this element? If a Metal reading could have been written by Earth, or Fire
sounds like Metal — restart the teaser with the correct temperature.

═══ REASONING CHAIN ═══

STEP 1 — ELEMENTAL DEFAULT
What is this Day Master's behavioral default? Not what the element symbolizes — what it DOES
as a mode of engaging with reality. The default is structural, not willful.
  甲: Forward projection as structural fact — cannot stop reaching, cannot become smaller
  乙: Navigation before assertion — arrives via paths others couldn't read
  丙: Presence generates warmth independent of intent — others orient before deciding to
  丁: Focused illumination — completely illuminates what it's pointed at, nothing more
  戊: Psychological ground for others — they build on it without naming its source
  己: Developmental nourishment — creates conditions for growth without announcing it
  庚: Evaluative by structural default — assessment runs before social/emotional processing
  辛: Perceives quality automatically — the way others perceive temperature
  壬: Holds depth exceeding what others can see — always knows more beneath the surface
  癸: Senses what is true before it is spoken — nourishes specifically, not broadly

STEP 2 — BAND MODIFIER
  concentrated: runs at full charge, no natural internal counterforce — more potent AND
                more brittle simultaneously. Same quality, no modulation.
  balanced:     directed rather than diffuse — found how to use what it is, working with it.
  open:         intact but context-sensitive — same capability, high environment variance.
                For open archetypes: the gap between good-fit and poor-fit conditions is
                categorical, not incremental. Name the specific environment requirement.

STEP 3 — TG PATTERN: THE CHARACTER-SHAPING STRUCTURAL FORCE
This is the deepest differentiation. Apply the following classical derivations:

  pure:       Same element saturates the chart. No counterforce. The character amplifies
              itself without correction. Classical: "with output channels = clear and 
              reasonable; without = fixed and rigid." The gift and shadow are identical:
              concentrated character, no interrupt.

  rooted:     The element that generates the DM dominates. The person draws from a well
              they didn't dig. Deep support, backing, nourishment that arrives. Shadow: 
              the crucial unanswered question — what does this capability look like 
              without the ground? The Blade has never fully had to find out.

  flowing:    DM generates dominant element (same polarity). Output as natural state —
              秀气 (elegant Qi). The person produces because it's what happens when they
              are fully themselves. Non-assertive. Shadow: extends into what feels natural
              without checking whether the foundation is ready.

  expressive: DM generates dominant element (opposite polarity). Output that carries
              tension — structural conflict with what tries to contain it. Brilliance that
              operates ahead of its environment. Intelligence inseparable from friction.
              NOT willful rebellion — structural emergence. Shadow: the same quality that
              creates brilliance creates damage when uncontained.

  forging:    DM controls dominant element. Energy goes toward direction, acquisition,
              making things productive. Outcome-focus is structural. Shadow: control drive
              can become unable to let things unfold; the self doing the directing depletes.

  tested:     Opposite-polarity authority dominates. Shaped by a structure the person can
              respect. Earns recognition through legitimate channels. Requires worthy
              authority to function at best. Shadow: when authority is absent or corrupt,
              orientation point is lost in ways others don't expect from something so 
              apparently solid.

  pressured:  Same-polarity authority dominates (Seven Killings). Force without permission.
              Doesn't moderate itself. Doesn't grant recognition. Either produces exceptional
              achievement (what can't be broken isn't) or genuine damage. Shadow: can become
              unable to function without the pressure, or become the pressure for others.

STEP 4 — CATALYST AS FORMATIVE ORIENTATION
The catalyst is not what the person is missing. It is what the chart has always been
organized toward — what changes everything when it arrives, what they have been reaching
toward before they had a name for it. Frame as: "this is what [archetype] has been seeking
before it had a language for it" — never as a deficit.

CATALYST WOUND DIFFERENTIATION — when same stem+band+tgPattern exists with different
catalysts, the wound must be categorically different, not just labeled differently:
  Fire catalyst   → relational wound: warmth, recognition, acknowledgment
  Water catalyst  → generative wound: fertility, yield, "is anything alive"
  Wood catalyst   → directional wound: purpose, momentum, committed direction
  Metal catalyst  → structural wound: integrity, form, what holds
  Earth catalyst  → grounding wound: stability, being held, reliable terrain
The twoAM for each catalyst version must encode a categorically different question.

═══ PSYCHOLOGICAL GROUNDING (apply before writing any content) ═══

Each compound archetype key encodes personality at four distinct psychological levels.
Use the framework in Bible §3A.7 to ground the reading in modern psychology.
Do NOT map one-to-one (e.g., Wealth = Conscientiousness). Use multiple frameworks as 
reference pools and synthesize organically.

FOUR LEVELS — identify each before writing:

LEVEL 1 — COGNITIVE/RELATIONAL ORIENTATION (stem):
What is this person's default mode of processing and engaging with reality?
Use the Jungian cognitive function analog + Big Five supporting profile from §3A.7B.
Key: describe the MECHANISM, not the trait category.
庚 example: "Evaluative by structural default (Ti analog) — assessment runs before social
or emotional processing begins. This is not choice; it is the first cognitive event."

LEVEL 2 — INTENSITY AND REGULATION (band):
How fully and consistently does this orientation express?
concentrated = runs regardless of context (trait activation independent of cues)
balanced = directed and integrated (analogue of individuation / identified regulation)
open = context-sensitive, high environmental variance (person-environment fit critical)

LEVEL 3 — STRUCTURAL FORCE (tgPattern):
What structural condition is shaping this character?
Use the tgPattern psychological profiles from §3A.7C:
pure = one-sidedness (Jung), low integrative complexity as structural condition
rooted = secure base provision (Attachment), externally anchored strength
flowing = intrinsic motivation (SDT), Csikszentmihalyi flow state as default
expressive = reactive creativity, thwarted autonomy → assertive output (SDT/Forster)
forging = achievement motivation (McClelland nAch), competence-directed energy
tested = normative compliance, integrated regulation (SDT), secure-base-to-authority
pressured = adversarial growth (PTG), hardiness under unmoderated pressure

LEVEL 4 — MOTIVATIONAL GAP (catalyst):
What has this chart been organized around seeking?
Use the catalyst SDT mapping from §3A.7E.
Frame as formative orientation, not deficit.

MULTI-DIMENSIONALITY REQUIREMENT:
Every template must address all four levels:
1. Cognitive: how this person processes (mechanism-language, not trait-language)
2. Motivational: what drives them + what the chart seeks
3. Relational: how this character lands for others
4. Temporal: what has been built over time and what the formative absence created

VOCABULARY REQUIREMENTS (§3A.7F):
— Structural register: names the mechanism ("runs before anything else engages")
— Experiential register: names the felt quality from inside ("others feel evaluated")
— Relational register: names how it lands ("before you say a word, the room recalibrates")
Every content block needs at least structural + experiential. Teaser needs all three.

NEVER: trait labels ("you are analytical"), tendency language ("you tend to be"),
horoscope frame ("you are destined for"), vague causality ("your X gives you Y")

═══ LANGUAGE RULES (apply to every field) ═══

THE THREE-LAYER MODEL — mandatory ratio:
  Layer 1 — Clear (70% of sentences):
    Plain, direct, psychologically readable. No compression. No metaphor.
    The user can explain this sentence to a friend without pausing.
    ✓ "You finish what others lose the thread of."
    ✗ "The precision finds no natural stopping point."

  Layer 2 — Evocative (25% of sentences):
    Vivid but immediately legible. One precise image or contrast. No decoding required.
    ✓ "People build on you without knowing they're doing it."
    ✓ "You've read the entire room before you've taken your coat off."

  Layer 3 — Poetic (5% of sentences, maximum 2–3 per reading):
    High compression, high subtext. Reserved for signature moments only.
    Every poetic line must earn its place. If removed, the reading loses something 
    irreplaceable. If kept only because it sounds good, remove it.
    ✓ "Everything is in order. I'm not sure anything is alive."
    ✓ "The care was real. It just came through the wrong door."

THE BEHAVIORAL TRANSLATION RULE:
  Every abstract insight must be followed immediately by its observable behavioral 
  equivalent within two sentences. No abstract claim may stand alone.
  ✓ "The assessment runs before you decide to engage. You've already filed the 
     report before the meeting starts."
  ✗ "The assessment is structural." (abstract with no landing — forbidden)

THE CAMERA LENS RULE:
  Write as if filming a movie of their life. Nouns and verbs, not adjectives.
  Show the behavior. Let the trait emerge from what you show.
  ✓ "You're the one they call when the situation is actually serious."
  ✗ "You are highly capable under pressure."

SENTENCE LENGTH:
  Average sentence: 15–20 words.
  No sentence exceeds 40 words.
  After every two long sentences, write one short one (under 10 words).
  This creates rhythm and prevents the fatigue of uniform intensity.

METAPHOR DENSITY:
  Maximum one archetype metaphor per field (Mountain, Blade, Vine, etc.)
  After first use in a field, switch to behavioral language.
  Do not stack metaphors — "the Mountain holding the weight of the forge" is two 
  metaphors colliding. Choose one, make it land, move to plain language.

═══ CONTENT RULES (non-negotiable) ═══

1. NO BaZi terminology: no Day Master, Ten Gods, 比劫, 印, 食伤, 官杀, 财, 用神, 格局,
   大运, 流年, 喜用神, 忌神. These are internal calculation terms. Translate everything 
   into felt behavioral experience.

2. NO tgPattern names in text: never write "Pure", "Rooted", "Flowing", "Expressive",
   "Forging", "Tested", or "Pressured" anywhere in the reading text. The pattern is 
   EMBODIED, not named.

3. NO cross-template comparisons: never write "unlike a Tested Blade" or "where the 
   Flowing version..." Each template stands entirely alone.

4. THE GIFT = THE EDGE PRINCIPLE: Every edge must be the same quality as a gift, under
   specific structural conditions that make it costly. Never invent a separate weakness.
   Show the gift turning on the person.

5. STEM × BAND × TGPATTERN specificity required: the reading must describe something that
   could not be said of a different tgPattern with the same stem and band. Test yourself:
   would this p1 apply to the pressured version of this same stem/band? If yes, rewrite.

6. ELEMENTAL TEMPERATURE required: every reading must feel like it was written by the 
   primary element, not just about it. If the temperature is wrong, the user will not 
   recognize themselves regardless of analytical accuracy.

7. DUAL COST IN EDGES required: every edge must name two costs — what it costs others 
   (relational surface) AND what it costs this person specifically (interior cost). 
   The interior cost is the one that creates loyalty. "I am sometimes alone in rooms 
   I built" is an interior cost. "People find you cold" is only the relational surface.

8. AGENCY IN EDGES required: every edge must imply the user can work with this pattern 
   consciously — not transcend it, not fix it, but recognize and navigate it. Include 
   one "Watch for:" signal per edge: a specific observable moment when the pattern is 
   running, so the user can catch it in real time. This transforms diagnosis into guidance.
   ✓ "Watch for: the moment someone brings new information and you feel the need to 
      argue before you've processed it. That's the pattern running."

9. SENSORY ANCHOR required: every reading must contain at least one physical object,
   digital habit, or mundane behavioral specific that makes the archetype feel like a 
   real person. Not "you are organized" — "a desktop with nothing on it except one 
   document, open." Place in teaser or p1.

10. SPECIFIC INTERACTION required in gifts: at least one gift must show the external 
    consequence through a specific interaction with a second person — not just "you are 
    perceptive" but "in a room full of competing reads, yours is the one people check 
    against."

11. SOCIAL PROOF STRUCTURE in gifts: at least one gift description must contain a 
    sentence that begins with or implies "People come to you when..." or "They call you 
    when..." This anchors the gift in how others actually use this person.

12. BANNED WORDS: Never use —
    "Journey," "Vibrant," "Balance" (as noun), "Deeply," "Tapestry," "Empowered,"
    "Authentic," "Resonate," "Understand" (as praise), "Unique," "Special," "Gifted,"
    "Sensitive soul," "Spiritual," "Energy" (as standalone noun), "Vibration,"
    "Destiny," "Blessed," "Manifest," "At your core," "In essence," "Fundamentally,"
    "Truly," "Genuinely," "Deeply," "What it means to be."
    If a sentence needs one of these words to work, the sentence needs to be rewritten.

13. NO BRIDGE PHRASES: never "Because of your element," "Your chart shows," 
    "Psychologically speaking," "This archetype tends to," "Based on your profile."
    Describe a real person. They already exist.

14. OVER-CLAIMING GUARD: Before finalizing, read the teaser aloud. If any sentence 
    sounds like "I know you better than you know yourself" — add one softening qualifier 
    ("tends to," "often," "in most conditions") to that sentence. One qualifier per 
    paragraph maximum. Do not over-soften: one qualifier per paragraph, not per sentence.

═══ COMPOSITION ORDER (write in this order, not schema order) ═══

0. TONE CALIBRATION FIRST: Identify the primary element. Lock in its register from Step 0.
   Write one test sentence in that register before proceeding. If it doesn't feel right, 
   it won't get better deeper in.

1. p1 FIRST: the cognitive/perceptual portrait — how this person processes the world.
   MANDATORY STRUCTURE:
     Sentence 1–2: "On the outside: [observable behavior others see]"
     Sentence 3–4: "What's actually running: [internal mechanism]"
   Both sides must be true simultaneously, not contradictory. The gap between them is 
   what the user has been carrying without a name for it. Name it here.
   One mundane-specific behavioral detail: earn abstract claims through concrete reality.
   ≤80 words.

2. p2 SECOND: the motivational portrait + catalyst + relief.
   Must contain THREE things in ≤70 words:
   (a) the organizing friction — what the chart is pressing against
   (b) what the chart has always been reaching toward (catalyst as formative orientation)
   (c) the relief clause — NOT "you should find X" but "when X arrives, this is what 
       changes." Specific. Structural. Named concretely.
   No imperative sentences ("you should," "try to," "learn to").

3. gifts THIRD: 3 capabilities this stem × band × tgPattern makes structurally reliable.
   — Use social identity labels, not virtue labels. "The one who already knows" not "Signal Clarity."
   — Each description (3–4 sentences) must: show what happens when gift is active, name 
     the external consequence, include one sentence the user can point to and say "yes, 
     that's happened to me."
   — One gift must contain social proof structure: "People come to you when..."
   — One gift must describe what others say about this person when they're not in the room.

4. edges FOURTH: 2 ways the gift turns on the person. REQUIRED structure per edge:
   — Sentence 1–2: Name the pattern plainly in observable, behavioral terms.
   — "What it costs others:" — one sentence, the relational cost.
   — "What it costs you:" — one sentence, the interior cost (where loyalty lives).
   — "Watch for:" — one specific observable moment when this pattern is running.
   Both costs must come from the SAME quality as a gift. Never a separate weakness.
   Frame edges as over-utilized strengths, not character verdicts.

5. landscape FIFTH:
   thrives: where this architecture is an asset, not a liability. Specific situation.
            Include one sentence that starts with a verb: what the person DOES here.
   costs: where this architecture creates consistent friction — not failure, structural mismatch.
          Include one sentence that names what gets consumed without return.

6. twoAM LAST (closing anchor — not mid-reading):
   One sentence. First person. The structural collision encoded as the specific thought 
   this person has at 2 AM when they can't sleep. Must encode the tension between what 
   this person IS (stem + band) and what they are pressing against (tgPattern + catalyst).
   Not a mood summary — the actual unresolved thought. Uncomfortably specific.
   15–35 words. No questions that are too abstract. No answers — just the thought.
   Test: read it out loud. If it sounds like a self-help book, rewrite it. If it sounds 
   like something you'd think at 2 AM and not say out loud, it's right.

7. teaser WRITTEN LAST, DISPLAYED FIRST: 3–5 sentences. The called-out moment.
   Must start from a behavioral observation — what others experience of this person —
   then name the interior reality that produces it.
   BANNED OPENINGS: "Before you say a word..." / "You are someone who..." / "This is a chart that..."
   Pass the screenshot test: would someone forward this to a friend saying "this is you"?
   Maximum 90 words. Written in the element's temperature. No hedging. No abstraction
   without an immediately following behavioral translation.

═══ EXPRESSIVE/PRESSURED SISTER TEMPLATES ═══

When generating an `expressive` or `pressured` template, you have the corresponding
`flowing` or `tested` template for the same key available. The sister templates must:
  — Describe the same structural relationship (DM generates dominant / dominant controls DM)
  — Differ genuinely in character mode, not just intensity
  — Have gifts that overlap in domain but differ in the quality of expression
  — Have edges with different cost structures (the price of flowing vs. expressive is different)
  — Have a twoAM that encodes a categorically different internal question

═══ OUTPUT FORMAT ═══

Return ONLY valid JSON, no markdown fences, no preamble:
{
  "teaser": "3–5 sentences, ≤90 words. Behavioral observation first, interior reality second. Screenshot-worthy.",
  "p1": "≤80 words. Front-end vs. back-end contrast. 'On the outside... What's actually running...' One sensory/behavioral anchor.",
  "p2": "≤70 words. Organizing friction + catalyst as formative orientation + what relief feels like. No imperatives.",
  "gifts": [
    {"label": "Social identity title (not a virtue label)", "desc": "3–4 sentences. Observable activation, external consequence, social proof ('People come to you when...'), something the user can say 'yes, that happened to me.'"},
    {"label": "Social identity title", "desc": "3–4 sentences."},
    {"label": "Social identity title", "desc": "3–4 sentences. Include what others say about this person when not in the room."}
  ],
  "edges": [
    {"label": "Named as the pattern, not the flaw", "desc": "Pattern named plainly. 'What it costs others: [relational cost].' 'What it costs you: [interior cost].' 'Watch for: [specific observable moment].'"},
    {"label": "Named as the pattern, not the flaw", "desc": "Same structure."}
  ],
  "landscape": {
    "thrives": "2–3 sentences. Specific situation. One sentence beginning with a verb.",
    "costs": "2–3 sentences. Specific situation. Names what gets consumed without return."
  },
  "twoAM": "One sentence, 15–35 words. First person. Structural collision encoded. Closing anchor. Uncomfortably specific."
}

═══ QUALITY STANDARD — REFERENCE READINGS ═══

Study both reference readings before generating. They represent the quality bar.

庚_concentrated_pure_Fire (reference #1):
  — Temperature: Metal register — direct, slightly cool, verdict-energy
  — Teaser names the behavior ("you're the one who already knows") then the interior reality
  — p1: front-end vs. back-end contrast explicitly structured
  — p2: friction + catalyst as formative gap + specific relief named
  — Gift labels are social identity titles, not virtue labels
  — Each edge names both costs; "Watch for" signals the observable moment
  — twoAM encodes the structural collision: precision (庚) meets directionless absence (no Fire)
  — Landscape is specific situations, not abstract categories
  — twoAM appears last — closes the reading

戊_open_tested_Water (reference #2 — different stem, different wound):
  — Temperature: Earth register — weighted, patient, gravity
  — Catalyst wound is generative, not relational: "is anything alive" vs. "am I seen"
  — twoAM differs categorically from Fire version despite same stem+band+tgPattern base
  — Open band specificity: environment-dependence named concretely, not abstractly
  — "Watch for" signals are situation-specific, not generic self-monitoring advice

═══ QUALITY TEST — run before submitting ═══

RECOGNITION GATES:
1. CALLED-OUT: Would the reader feel slightly exposed — seen in a way that's true but rarely named?
2. FORWARD TEST: Would they send this to someone saying "this is you"?
3. EXPLAIN-BACK TEST: Can they explain the core insight in their own words after reading?
4. HAPPENED-TO-ME TEST: Does at least one gift sentence describe something that has specifically happened to them?

LANGUAGE GATES:
5. BEHAVIORAL TRANSLATION: Every abstract claim has an observable behavioral equivalent within 2 sentences.
6. SENTENCE LENGTH: No sentence over 40 words; short sentence follows every 2 long ones.
7. LAYER RATIO: Majority of sentences are Layer 1 (clear); poetic moments are rare and earned.
8. METAPHOR DENSITY: Maximum 1 archetype metaphor per field.

STRUCTURE GATES:
9. DUAL COST + WATCH FOR: Both relational and interior costs named per edge; "Watch for" present per edge.
10. twoAM POSITION: twoAM is the final field — closing anchor, not mid-reading.
11. twoAM SPECIFICITY: Could only apply to this archetype — not 40% of people.
12. LANDSCAPE SPECIFICITY: Both entries name specific situations, not abstract conditions.

PERSPECTIVE GATES:
13. AGENCY PRESENT: At least one edge implies the user can work with the pattern consciously.
14. NO VERDICT TONE: No edge reads as a character judgment — all costs trace to a real gift.
15. OVER-CLAIMING CHECK: No sentence sounds like "I know you better than you know yourself" without a qualifying softener.

[Reference reading text included in user prompt per generation]
```

---

### PART E: Scaling Rulesets

These rules maintain coherence, differentiation, and quality across the full 420-key library. They govern the batch generation run and the post-generation review process.

#### The Three User Tests (applied at batch review level)

Before any template is merged into TEMPLATE_DB, a reviewer must be able to confirm all three:

1. **Comprehension:** A user encountering this archetype for the first time can explain the core insight back in their own words without re-reading.
2. **Resonance:** At least one sentence in the teaser or p1 names something the user thought was a private idiosyncrasy — not just a recognizable trait.
3. **Action:** At least one edge's "Watch for:" signal describes a specific moment the user can actually catch in their daily life.

If only resonance passes: rewrite. Resonance without comprehension is aesthetic. Resonance without action is a beautiful portrait that doesn't help.

#### Stem-level consistency rules

Each stem has a core behavioral default that must remain consistent across all 42 templates for that stem. The band and tgPattern modify HOW this default expresses — they never change WHAT the default is.

Test: Read the teasers for `庚_concentrated_pure_Fire`, `庚_balanced_tested_Fire`, and `庚_open_flowing_Water` side by side. All three should be recognizably the same person (precision is the default mode) with genuinely different structural conditions producing different character expressions. If the three teasers could be from different stems, the consistency rule is broken.

Elemental temperature must also be consistent within a stem. All 庚 templates write in Metal register (direct, cool, verdict-energy) regardless of tgPattern or catalyst. If a 庚 template sounds like Earth, the temperature has drifted.

#### Band consistency rules

The behavioral modifier of each band should create recognizable patterns across stems:
- All `concentrated` templates share: "this is what this element IS, running without modulation — more potent and more brittle simultaneously"
- All `balanced` templates share: "this is what this element IS, directed toward something specific — found how to work with it"
- All `open` templates share: "this is what this element IS, and the conditions for full expression matter categorically — the gap between good-fit and poor-fit environments is large"

For `open` templates specifically: the environment-dependence must be named concretely. "Where the right conditions exist" is too abstract. "High-stakes decisions where accuracy matters more than comfort" is specific. All open templates must meet this standard.

#### tgPattern consistency rules

Within a single tgPattern, the structural condition should produce recognizable character patterns across all stems:
- All `expressive` templates share: output that carries tension, intelligence ahead of its environment, structural conflict with containment — NOT willful rebellion
- All `pressured` templates share: shaped by force without permission, achievement harder-won, shadow can become the pressure for others
- All `pure` templates share: concentrated without modulation, gift and shadow as identical quality, no natural interrupt
- All `tested` templates share: shaped by structures worth respecting, earns through legitimate channels, loses orientation when authority proves unworthy
- All `rooted` templates share: draws from a well not dug by self, the crucial unanswered question about what remains without the ground

#### Catalyst differentiation rules (critical for same-key variants)

When the same stem+band+tgPattern exists with different catalysts, the readings must diverge at the wound level — not just in the p2 catalyst mention but across the entire reading:

| Catalyst | Wound type | twoAM register |
|---|---|---|
| Fire | Relational — warmth, recognition, acknowledgment | Loneliness, being unseen despite being present |
| Water | Generative — fertility, yield, "is anything alive" | Futility, everything in order but nothing growing |
| Wood | Directional — purpose, momentum, committed direction | Capability without a target, effort without forward movement |
| Metal | Structural — integrity, form, what holds | Diffuse when it should be precise, the question of what's real |
| Earth | Grounding — stability, being held, reliable terrain | Giving ground without standing on any |

The twoAM for each catalyst version must encode a categorically different question. A reviewer placing the Fire and Water versions of the same stem+band+tgPattern side by side should immediately identify different wounds, not just different element labels.

#### Sister template rules (expressive/pressured)

Every `expressive` template pair must be reviewable alongside its `flowing` sister. A reviewer looking at both should immediately identify:
- flowing: gives naturally, the output is generous and non-assertive
- expressive: gives with an edge, the output asserts itself against containment

Every `pressured` template pair must be reviewable alongside its `tested` sister. A reviewer looking at both should immediately identify:
- tested: earns recognition through legitimate structure it can respect
- pressured: proves itself despite structure that doesn't grant permission

Sister templates must differ in their twoAM. The internal question for flowing vs. expressive is categorically different, as is tested vs. pressured. If the twoAM could apply to either sister, both need to be rewritten.

After generation, spot-check 10% of sister pairs for clear differentiation before approving the full batch.

#### Language coherence across 420 templates

The three-layer language model must be applied consistently:
- Layer 1 (clear, ~70%) is the dominant register across all templates regardless of element
- Layer 2 (evocative, ~25%) varies in texture by element temperature
- Layer 3 (poetic, ~5%) should appear no more than 2–3 times per template

If a batch review finds that most templates are running at Layer 2–3 intensity — everything is sharpened to the same high-compression register — that is a systemic failure. The variation in intensity across a reading is what makes the poetic moments land. Uniform intensity produces fatigue.

#### Perspective coherence across 420 templates

The 60/25/15 voice ratio (Grounded Interpreter / Compassionate Mirror / Poetic Oracle) must be maintained. A batch reviewer should be able to read any template and recognize it as primarily a grounded interpreter speaking, not an oracle delivering verdicts.

The banned voice modes apply batch-wide: no template may read as a Cold Observer diagnosing from outside, a Fatalistic Narrator describing immutable fate, or a Pure Oracle delivering over-certain declarations without behavioral ground.

#### Quality gates (applied after generation, before merge)

| # | Gate | Check | Pass condition |
|---|---|---|---|
| 1 | No BaZi terminology | Automated scan for forbidden term list | Zero matches |
| 2 | Schema compliance | All fields present: teaser, p1, p2, gifts[3], edges[2], landscape{thrives,costs}, twoAM | All present |
| 3 | Length compliance | teaser ≤90 words, p1 ≤80 words, p2 ≤70 words, twoAM 15–35 words | Within bounds |
| 4 | Catalyst in p2 | Catalyst element or its behavioral description appears in p2 | Present |
| 5 | Relief in p2 | p2 names what relief/resolution feels like for this specific archetype | Concrete and specific |
| 6 | Pattern embodied | tgPattern word not present verbatim in any string | Zero matches |
| 7 | Gift = edge principle | Each edge traces to a gift; dual cost structure present | Relational + interior cost in each edge |
| 8 | Watch for present | Each edge contains "Watch for:" signal with specific observable moment | Both edges contain it |
| 9 | Social proof in gifts | At least one gift contains "People come to you when..." or equivalent | Present |
| 10 | twoAM position | twoAM is the closing anchor — last field in rendering order | Confirmed |
| 11 | twoAM specificity | Encodes structural collision; would not apply to 40% of people | Manual check |
| 12 | Cross-stem specificity | Teasers for same tgPattern/band across different stems differ in behavioral default | Manual spot-check |
| 13 | Sister differentiation | For expressive/pressured: twoAM and at least one edge differ substantively from sister | Manual check on 10% |
| 14 | Elemental temperature | Teaser register matches primary element | Manual check on first 20 per element batch |
| 15 | Sensory anchor present | At least one concrete object, habit, or behavioral specific in teaser or p1 | Present |
| 16 | Behavioral translation | Every abstract claim followed by observable behavioral equivalent within 2 sentences | Manual spot-check |
| 17 | Layer ratio | No template runs entirely at Layer 2–3; clear (Layer 1) sentences are majority | Manual review |
| 18 | Banned words absent | Automated scan: Journey, Vibrant, Balance (noun), Deeply, Tapestry, Empowered, Authentic, Resonate, Spiritual, Vibration, Destiny, Manifest | Zero matches |
| 19 | Catalyst wound differentiation | For same stem+band+tgPattern with different catalysts: twoAM encodes categorically different question | Manual check on all catalyst pairs |
| 20 | Agency present | At least one edge implies user can work with pattern consciously | Present |

---

### PART F: Persona Card Generation Protocol

The persona card is the **creative source document** for every archetype. It precedes the reading schema and the reading is derived from it — not from structural analysis alone. The persona card is a vivid, multi-format portrait of a specific person living this structural combination. It lives permanently in TEMPLATE_DB as the `persona` field and serves as:

- The source material the reading fields draw from (events → teaser, architecture → p1, tension → twoAM)
- The retention and shareability content layer the app surfaces post-reading
- The creative canvas that makes readings vivid rather than analytical

**Generation order:** Persona card is generated in Pass 1. Reading schema is generated in Pass 2, with the persona card injected as context. The model's job in Pass 2 is selection, compression, and voicing — not derivation.

---

#### Schema

```javascript
persona: {
  // IDENTITY LAYER
  adjectives:      String[5-8],   // trait vocabulary — daily language, not clinical
  labels:          String[3-5],   // personified social identities: "The one who X"
  gift_phrases:    String[3],     // ≤3 words, what they give to others
  edge_phrases:    String[3],     // ≤3 words, what they cost themselves and others
  mbti_resonance:  String[2-3],   // nearest MBTI types — static lookup, not generated

  // SOCIAL PORTRAIT
  childhood_friend: String,       // unguarded, long familiarity, no professional filter
  coworker:         String,       // professional observation — the gap between intent and landing
  stranger:         String,       // first five minutes, before they know anything

  // LIVED EXPERIENCE
  events:       String[3],   // specific scenes that ONLY happen to this archetype
  excites:      String,      // what genuinely lights them up — plain language
  good_at:      String,      // what they're structurally excellent at
  struggles:    String,      // specific behavioral friction — observable, not abstract
  irritated_by: String,      // what specifically grates and why
  daily_habits: String[3],   // observable behaviors — the "oh my god that's me" kind
  under_stress: String,      // exactly what the architecture does under pressure

  // INNER WORLD
  architecture:     String,       // how they're wired — plain language, third person
  tension:          String,       // the single unresolved thing they carry
  therapist_advice: String[3-5],  // specific, behavioral, compassionate — not generic
}
```

---

#### Quality Standard for Persona Cards

**The specificity test (applies to every field):** Would this content describe someone with a different tgPattern or catalyst combination? If yes, rewrite. The events, daily habits, and therapist advice in particular must be specific enough that only this structural combination produces them.

**Events — the hardest field, the most important:**
Events are not summaries of traits. They are specific scenes with a specific person in a specific situation making a choice that only this archetype would make in this way. The test: if you replaced the protagonist with a random person, would the scene be implausible? If not, the event is too generic.
- ✗ "They once stayed up late to finish something important because their standards were high"
- ✓ "They rewrote the entire framework at 2 AM the night before the presentation — not from anxiety, but because they'd known for a week that something was structurally wrong and they couldn't present something they didn't fully believe in"

**Daily habits — must be observable and specific:**
Not character descriptions in habit clothing. An actual behavior you could watch.
- ✗ "They tend to reflect on their day before sleeping"
- ✓ "Opens their laptop before anything social happens — the first fifteen minutes are private. Interrupting this is experienced as a disruption even by people they like."

**Social portrait — must capture the gap between intent and reception:**
The childhood friend describes who this person actually is before the professional persona formed. The coworker sees the behavioral output but not the interior mechanism — this gap is where the most useful recognition happens. The stranger sees only the initial signal.

**Therapist advice — must be specific enough to act on:**
- ✗ "Work on communicating your feelings more openly"
- ✓ "The next time someone comes to you in distress, try waiting a full two minutes before moving toward a solution. Notice what happens when you stay in the problem with them instead of solving it."

---

#### Pass 1 System Prompt

```
PERSONA CARD GENERATOR — ELEMENTUM v1.0

You are building a vivid, specific portrait of a real person who lives with this
BaZi structural combination. This is not a personality summary. It is a character
study specific enough that the person reading it will recognize specific moments
from their own life — not just traits, but scenes, habits, reactions, the precise
shape of their inner world.

The tiered sourcing data provided (psychological framework levels + classical
principles) tells you the analytical truth about this person. Your job is to
translate that truth into a living human portrait. The persona card is the creative
source document — the reading is later derived from this card.

═══ SPECIFICITY RULES ═══

EVENTS — three specific scenes, not summaries:
Write each event as a scene: a specific situation, a specific choice, a specific
outcome. The protagonist must behave in a way that would be implausible for most
people but inevitable for this archetype. No abstract virtues. No generic effort.
The exact scene and what made it distinctively theirs.

DAILY HABITS — observable behaviors, not character descriptions:
Write what you could actually watch a person doing. The habit should make someone
say "oh my god I do that" rather than "that sounds like a thoughtful person."

SOCIAL PORTRAIT — capture what's actually observed:
Childhood friend: unguarded, long familiarity, notices the things that never change.
Coworker: professional context, sees the behavioral output, often doesn't understand
the interior mechanism — this gap is the most recognizable thing.
Stranger: only the initial signal — what someone picks up in five minutes.

THERAPIST ADVICE — specific enough to act on today:
Not "work on your communication." The exact behavioral experiment a good therapist
would assign this week. Compassionate, specific, behavioral.

ANTI-GENERICITY CHECK: Before submitting, read each field. Ask: would this apply
to a different tgPattern with the same stem? If yes, rewrite it.

═══ OUTPUT FORMAT ═══

Return ONLY valid JSON, no markdown fences, no preamble:
{
  "adjectives": ["word1","word2","word3","word4","word5"],
  "labels": ["The one who X","The person who Y","The X that Z"],
  "gift_phrases": ["≤3 words","≤3 words","≤3 words"],
  "edge_phrases": ["≤3 words","≤3 words","≤3 words"],
  "mbti_resonance": ["XXXX","XXXX"],
  "childhood_friend": "How a close childhood friend describes this person — unguarded, specific, long familiarity. 3-5 sentences.",
  "coworker": "How a colleague describes them — professional context, behavioral observation, the gap between what they mean and how they land. 3-5 sentences.",
  "stranger": "First impression — what someone picks up in the first five minutes before knowing anything. 2-3 sentences.",
  "events": [
    "Specific scene 1 — situation, choice, outcome. Only this archetype would do this in this way.",
    "Specific scene 2.",
    "Specific scene 3."
  ],
  "excites": "What genuinely lights them up. Plain language, specific. 2-3 sentences.",
  "good_at": "What they are structurally excellent at. 2-3 sentences.",
  "struggles": "Specific behavioral friction — observable, not abstract. 2-3 sentences.",
  "irritated_by": "What specifically grates on them and why. 2-3 sentences.",
  "daily_habits": [
    "Observable habit 1 — specific enough to recognize yourself in.",
    "Observable habit 2.",
    "Observable habit 3."
  ],
  "under_stress": "Exactly what the architecture does under pressure — not 'they get stressed' but specifically what happens to their behavior. 2-3 sentences.",
  "architecture": "How they are wired — the cognitive mechanism in plain language, third person, no jargon. 3-5 sentences.",
  "tension": "The single unresolved thing they carry — simultaneously their most distinctive quality and what they least know how to name. 1-3 sentences.",
  "therapist_advice": [
    "Specific behavioral experiment or observation — compassionate, actionable this week.",
    "Second piece of advice.",
    "Third piece of advice."
  ]
}
```

---

#### How the Reading Derives From the Persona Card

Every reading field maps to specific persona card sources:

| Reading field | Primary source | Secondary source |
|---|---|---|
| teaser | events[0] + stranger | tension (compressed) |
| p1 (front-end) | coworker description | childhood_friend contrast |
| p1 (back-end) | architecture | daily_habits[0] |
| p2 (friction) | tension | architecture |
| p2 (relief) | therapist_advice[0] framing | excites |
| gift[1] | labels[0] + events[1] as evidence | good_at |
| gift[2] | childhood_friend observation | daily_habits behavioral anchor |
| gift[3] | good_at + excites | labels[2] |
| edge[1] dual cost | struggles + events[2] | therapist_advice[1] |
| edge[2] dual cost | irritated_by + under_stress | therapist_advice[2] |
| Watch for[1] | daily_habits[1] or under_stress trigger | struggles specific moment |
| Watch for[2] | irritated_by specific trigger | under_stress onset signal |
| landscape thrives | excites + daily_habits[0] environment | good_at context |
| landscape costs | under_stress environment | irritated_by context |
| twoAM | tension → first person, one sentence | architecture collision |

The Pass 2 instruction to the model: *"The persona card for this archetype is provided. Write the reading schema as a curated distillation — the recognition moment condensed into literary form, in the elemental register. Do not invent new content. Select from the persona card and voice it."*

---

#### Reference Persona Card — 庚_concentrated_pure_Fire

This is the quality bar. Every persona card generated for 庚 and 辛 keys should produce the same level of scene-specificity and psychological precision.

```javascript
"庚_concentrated_pure_Fire": {
  adjectives: ["precise","unflinching","self-sufficient","completing","quietly demanding","verdict-first","magnetized-to-what's-real"],
  labels: ["The one who already knows","The person the room recalibrates around","The one who finishes","The one you call when it actually matters","The one who will tell you"],
  gift_phrases: ["Reads the room","Holds what holds","Gets to the thing"],
  edge_phrases: ["Alone in clarity","Verdict before vote","No warmth channel"],
  mbti_resonance: ["INTJ","ISTJ","ENTJ"],
  childhood_friend: "They always knew what we should do. Not bossy about it — they just knew. And they were usually right, which was annoying. I used to hate that they'd say the thing I was trying not to know. But I always came back. When everything was confusing, talking to them made things less confusing. They'd just name what was wrong. That was the whole thing.",
  coworker: "Intimidating at first, until you figure out the key. They're not judging you personally — they're assessing everything, including you, as a default. Once you understand that you stop taking it personally and start using it. I go to them when I need to know what's actually true. Their feedback is hard to hear but it's accurate. They're not warm but they're honest, and at work that's rarer than warm.",
  stranger: "Quiet but present. Not unfriendly, not really trying either. You get the sense they've already formed an opinion but won't offer it unless you ask. Slightly unsettling because you can't tell if they like you. But there's something there — like if you could get past the assessment you'd find something real.",
  events: [
    "They were the only person in the debrief who named the actual problem. Everyone else had been circling it for an hour. They said one sentence — quiet, no preamble — and the room went silent. Not because it was harsh. Because it was exactly right. Nobody pushed back. Two weeks later, everything they'd identified had proven out.",
    "They rewrote the entire framework at 2 AM the night before the presentation. Not from anxiety — because they'd known for a week that something was structurally wrong and they couldn't present something they didn't fully believe in. The new version was significantly better. They told no one about the rewrite.",
    "Someone came to them in crisis. They listened, then immediately started solving — named the problem, laid out the options, explained what they would do. The person left feeling worse. They couldn't understand why for days. Eventually: the person hadn't come for a solution. They'd come to not be alone. The solution had arrived. The presence hadn't."
  ],
  excites: "Problems that are actually hard — specifically the kind where most people can't see the real issue yet. The moment when a complex situation clarifies and the underlying structure becomes visible. Also finishing things. The specific feeling of something finally being complete and correct and done.",
  good_at: "Seeing what's actually happening before the room does. Holding a standard while everything around them pushes toward shortcuts. Building things that last because they cannot tolerate building things that won't.",
  struggles: "Knowing care is present and not being able to deliver it in a form that lands. Staying with a decision after new information arrives that doesn't technically change the conclusion but emotionally should reopen it. Being in environments where the right answer has to wait because the room isn't ready.",
  irritated_by: "Work that performs effort rather than produces quality. Being asked to validate a decision that's already wrong. Meetings that exist to discuss the meeting. People who confuse being liked with being trustworthy.",
  daily_habits: [
    "Opens their laptop before anything social happens. The first fifteen minutes are private — assessment runs, the day orients. Interrupting this is experienced as a disruption even by people they like.",
    "Maintains a running internal catalog of things that aren't right yet. Projects, conversations, decisions that closed prematurely. Not written anywhere — updates automatically and runs in the background of everything else.",
    "When something they built encounters a problem, first move is toward it rather than away. Not anxious — diagnostic. The same precision that runs on everything runs on their own failures."
  ],
  under_stress: "Gets quieter. Precision intensifies — tolerance for imprecision shrinks. May become more efficient and more alone simultaneously. At peak stress, starts solving problems that aren't technically theirs yet because the evaluative apparatus needs a target and runs regardless.",
  architecture: "Evaluation is the first cognitive event. It runs before the social read, before the emotional response, before the decision to engage. This is not a mode they switch into — it is how reality arrives. Everything is assessed. The precision is not something they developed; it is the default operating state. They experience themselves not as someone who enjoys being right but as someone trying to find out what's actually true.",
  tension: "They carry the knowledge that the precision is fully formed and the target for it isn't. The capability runs. The question underneath — quiet enough that it mostly isn't a question — is whether what the precision is currently aimed at deserves what it can give.",
  therapist_advice: [
    "The next time someone comes to you in distress, try waiting a full two minutes before moving toward a solution. Don't fill the silence. Notice what happens in the room when you stay in the problem with them instead of solving it.",
    "You have a very accurate model of what other people need from you. You do not have a comparably accurate model of what you need from them. This imbalance is worth examining directly.",
    "The precision being complete doesn't make the direction wrong. But it also doesn't make it right. You may be the last person to know when something needs to be let go — because the evaluative framework that would tell you is the same one that built the thing.",
    "Your threshold for 'close enough to share' is higher than most people's threshold for 'excellent.' Some things may be ready before you believe they are — and waiting for certainty can be its own form of avoidance."
  ]
}
```

---



### Computing tension

```javascript
function computeTension(chart) {
  const dmEl = chart.dayMaster.element;
  const GEN  = {Wood:"Fire",Fire:"Earth",Earth:"Metal",Metal:"Water",Water:"Wood"};
  const CTL  = {Wood:"Earth",Earth:"Water",Water:"Fire",Fire:"Metal",Metal:"Wood"};

  // Get highest-scoring element from bond-adjusted composition
  const sorted = Object.entries(chart.elements)
    .filter(([,d]) => d.present)
    .sort(([,a],[,b]) => b.score - a.score);

  const dominant = sorted[0][0];  // highest scoring element

  if (dominant === dmEl)           return "pure";
  if (GEN[dominant] === dmEl)      return "rooted";
  if (GEN[dmEl]    === dominant)   return "flowing";
  if (CTL[dmEl]    === dominant)   return "forging";
  return "tested";                 // dominant controls DM
}
```

### Computing catalyst

```javascript
const CATALYST_MAP = {
  Metal: { concentrated:["Fire","Water"], balanced:["Fire","Earth"],  open:["Earth","Metal"] },
  Wood:  { concentrated:["Metal","Fire"], balanced:["Metal","Water"], open:["Water","Wood"]  },
  Water: { concentrated:["Earth","Wood"], balanced:["Earth","Metal"], open:["Metal","Water"] },
  Fire:  { concentrated:["Water","Earth"],balanced:["Water","Wood"],  open:["Wood","Fire"]   },
  Earth: { concentrated:["Wood","Metal"], balanced:["Wood","Fire"],   open:["Fire","Earth"]  },
};

function getPrimaryCatalyst(chart) {
  const dmEl = chart.dayMaster.element;
  const band = getEnergyBand(chart.dayMaster.strength);
  const [primary, secondary] = CATALYST_MAP[dmEl][band];
  // Use secondary if primary is the DM element itself (no self-catalyst)
  return (primary === dmEl) ? secondary : primary;
}
```

### Key computation (full pipeline)

```javascript
function getArchetypeKey(chart) {
  return `${chart.dayMaster.stem}_${getEnergyBand(chart.dayMaster.strength)}_${computeTension(chart)}_${getPrimaryCatalyst(chart)}`;
}
// Reference chart: "庚_concentrated_pure_Fire"
```

---

## 3A.7 Psychological Grounding Framework

> **Purpose:** This section maps the BaZi compound archetype formula onto rigorous modern psychological frameworks. It exists to solve two specific problems with pure classical translation: (1) classical descriptions are not empirically verified, (2) their language is inaccessible to Western users shaped by MBTI, Big Five, and psychology-inflected self-awareness. This framework enables the reading system to produce portraits that are analytically precise, multi-dimensional, and feel earned — not just named.

> **The cardinal rule of this section:** No one-to-one category mapping. Do not assign: 财 = Conscientiousness, 印 = Agreeableness, etc. These are arbitrary reductions that destroy nuance. Instead, each BaZi structural dimension is read through the psychological framework that best illuminates it — using multiple frameworks as reference pools, synthesizing where necessary, and explicitly noting where the classical and modern systems describe the same phenomenon from different angles.

---

### PART A: Why Multiple Frameworks, Not One

Each axis of the compound archetype formula describes personality at a **different level of analysis**. The fundamental error of naive BaZi-psychology mapping is treating all axes as if they describe the same kind of thing.

| Formula axis | Level of analysis | Best psychological framework |
|---|---|---|
| `stem` | Cognitive/relational orientation — the *mode* through which a person processes reality and engages with others | Jung's cognitive functions (most precise) + Big Five traits (supporting color) |
| `band` | Intensity and regulation of that orientation | Trait activation theory + DeYoung's Cybernetic Big Five + regulatory focus theory |
| `tgPattern` | Dominant structural force shaping expression | Multiple frameworks depending on pattern (see below) — SDT, Attachment Theory, adversarial growth research |
| `catalyst` | Formative motivational orientation — the aspirational gap | Self-Determination Theory (SDT) basic needs framework |

These four levels are not redundant. They describe different aspects of the same person. A reading that treats them as interchangeable will produce a portrait that is too flat. The multi-dimensionality of each archetype requires treating each axis as a genuinely distinct psychological contribution.

---

### PART B: Stem-Level Psychological Profiles

The stem is the most fundamental axis — it describes the person's default mode of engaging with reality. This is not a trait (how much of something) but an **orientation** (how the person processes and responds). Jung's theory of psychological types is the best match here, because Jung's functions describe *how* people engage — not quantities of personality, but qualities of engagement.

Important caveat: BaZi yin/yang polarity within a stem pair (甲/乙, 庚/辛, etc.) is NOT just introversion/extraversion in the Jungian sense. Polarity describes the *mode* of the element's expression — outward/structural vs. inward/adaptive — which correlates with Jungian E/I orientation but is not identical to it.

#### 甲 Yang Wood — The Oak

**Behavioral default:** Forward projection as structural fact. Cannot stop reaching. Growth is not ambition — it is the architecture.

**Psychological profile:**
- **Primary Jungian analog:** Extraverted Intuition (Ne) + Extraverted Thinking (Te). The Oak generates possibilities and reaches toward them — the next stage is always visible before the current one has consolidated. This is what Ne does: perceive potential before actuality, reach before grounding.
- **Big Five signature:** High Openness/Intellect (reaches toward new possibilities) + High Assertiveness facet of Extraversion (self-initiating, goal-directed) + variable Industriousness (the challenge is consolidation, not initiation)
- **Key psychological nuance:** The Oak's defining struggle is not capability — it is **consolidation vs. extension**. Research on high Openness types documents exactly this: the vision outruns the foundations. This is not a flaw — it is the structural cost of the Oak's greatest strength.
- **DeYoung facet:** Strong on **Intellect** (speculative, idea-generative) but the challenge appears at the **Orderliness** facet (low natural impulse toward completion and organization)

#### 乙 Yin Wood — The Vine

**Behavioral default:** Navigation before assertion. Arrives exactly where it intended via routes others couldn't read.

**Psychological profile:**
- **Primary Jungian analog:** Introverted Intuition (Ni). The Vine perceives the underlying structure, the route, the destination — often before it can explain its reasoning. Ni characteristically delivers insight that arrives already complete, without the intermediate steps being consciously accessible.
- **Big Five signature:** High Openness (perceives patterns and connections) + moderate-high Agreeableness/Compassion (reads the social surface skillfully) + moderate Introversion tendency (the intelligence is inward-mapped)
- **Key psychological nuance:** The Vine is not passive — it is *strategically adaptive*. Research distinguishes **proactive** from **reactive** intelligence: the Vine is proactive in destination but reactive in path. It doesn't assert the route; it *finds* the route that reaches the destination.
- **Important distinction from 甲:** Where the Oak reaches outward structurally (Extraverted Intuition generating possibilities), the Vine perceives inward structurally (Introverted Intuition finding the pattern). The Oak grows because it cannot stop; the Vine navigates because it always knows where it's going.

#### 丙 Yang Fire — The Torch

**Behavioral default:** Presence generates warmth independent of intention. Others orient toward it before deciding to.

**Psychological profile:**
- **Primary Jungian analog:** Extraverted Feeling (Fe). The Torch's warmth is structurally outward — it shapes the emotional climate of whatever space it occupies, not as a performance but as a property of its presence.
- **Big Five signature:** High Enthusiasm facet of Extraversion (positive emotion, energy, warmth) + High Compassion facet of Agreeableness (genuinely oriented toward others' wellbeing) + moderate Neuroticism (the warmth is relatively stable but the constant demand it creates has an accumulation cost)
- **Key psychological nuance:** The critical distinction here is between **Fe (shaping the emotional field)** and **Fi (holding personal values)**. 丙 is pure Fe: the warmth radiates outward and is absorbed by others; the Torch doesn't *choose* to illuminate — it simply does. SDT's **relatedness need** is highly activated in this archetype; the Torch's wellbeing is bound up with the quality of its connections.
- **Authentic vs. performed warmth:** Research on high Agreeableness + high Extraversion documents exactly this challenge: the warmth is real but can be experienced by the person themselves as performing, since it feels automatic rather than chosen.

#### 丁 Yin Fire — The Ember

**Behavioral default:** Focused illumination. Completely illuminates what it is pointed at, nothing more.

**Psychological profile:**
- **Primary Jungian analog:** Introverted Feeling (Fi). The Ember's attention is focused by deep inner conviction — it illuminates what it has *chosen* to illuminate, fully and completely.
- **Big Five signature:** Lower Extraversion (selective rather than diffuse) + High Conscientiousness in its focused form (the Orderliness and Responsibility facets rather than Industriousness) + moderate Neuroticism potential (the depth of investment means the cost of disappointment is high)
- **Key psychological nuance:** The critical difference from 丙: where 丙 warms the room, 丁 illuminates the specific thing. This maps to a well-documented distinction in personality research between **gregarious warmth** (Extraverted Feeling — giving warmth broadly) and **targeted intimacy** (Introverted Feeling — giving deeply to what is chosen). The Ember is not a smaller Torch — it is a fundamentally different mode of caring.
- **SDT connection:** The Ember's **autonomy need** is extremely high — the illumination only works when it is self-directed. When forced to illuminate what someone else has chosen, the quality degrades.

#### 戊 Yang Earth — The Mountain

**Behavioral default:** Psychological ground for others. Others build on it, orient by it, without naming its source.

**Psychological profile:**
- **Primary Jungian analog:** Introverted Sensation (Si) in its most stable expression — maintains the internal framework of what works, what has proven stable, what can be depended on. The Mountain's reliability is structural: it doesn't choose to be stable; stability is the constitutional condition.
- **Big Five signature:** High Conscientiousness across both facets (Industriousness: does the work; Orderliness: maintains structure) + Low Neuroticism (emotional stability is what defines the Mountain's character) + moderate Extraversion (present in the world but not deriving energy from stimulation)
- **Key psychological nuance:** The Mountain's defining feature is not stubbornness — it is **structural reliability**. Research distinguishes *trait-level reliability* (this is what the Mountain is) from *effortful conscientiousness* (this is what less constitutionally stable types achieve through discipline). The Mountain doesn't try to be reliable; reliability is the default state.
- **Attachment parallel:** The Mountain is the archetype that most closely produces Secure Base provision naturally. Research on secure attachment documents that the caregiver who provides psychological security without requiring constant acknowledgment is the most valuable — this is exactly the Mountain's character structure. The shadow: its stability is so taken for granted by others that its own need for support is systematically underrecognized.

#### 己 Yin Earth — The Field

**Behavioral default:** Developmental nourishment. Creates conditions for growth in others without announcing it.

**Psychological profile:**
- **Primary Jungian analog:** Introverted Feeling (Fi) in its most relational expression — the Field cares specifically, not broadly. Its nourishment is directed at what the specific person or situation actually needs.
- **Big Five signature:** High Agreeableness (both Compassion and Politeness facets) + moderate Conscientiousness (the care is continuous but not structured) + variable Extraversion (the Field can be present in many contexts but derives energy from genuine reciprocal connection)
- **Key psychological nuance:** The Field is often misread as simply "agreeable." The critical distinction: **Agreeableness in the Big Five measures social cooperation**, but the Field's defining feature is **developmental investment** — it creates conditions for growth. This maps more accurately to research on **parental investment theory** and **mentorship quality** than to simple agreeableness. The Field doesn't just accommodate; it nourishes specifically toward what this particular person needs to become.
- **Attachment parallel:** High Caregiving Behavioral System activation — the Field's distress at not being able to nourish is genuine and substantial. The shadow is precisely what attachment research documents: when the caregiving is unreciprocated over time, the Field depletes in ways that are invisible to those being cared for.

#### 庚 Yang Metal — The Blade

**Behavioral default:** Evaluative by structural default. The assessment runs before social or emotional processing begins.

**Psychological profile:**
- **Primary Jungian analog:** Introverted Thinking (Ti). The Blade's evaluation operates through an internal logical framework that cannot be switched off — it runs before social consideration, before emotional processing, before the decision to engage. This is exactly Ti's description: subjective, standards-first, operates independently of what others think.
- **Big Five signature:** High Conscientiousness/Industriousness (standards are non-negotiable) + Low Agreeableness/Politeness (the assessment is not modulated by social concern) + lower Neuroticism (the precision is stable, not anxious) + moderate Introversion tendency (the processing is inward first)
- **Key psychological nuance:** The most critical distinction for 庚: this is not **judgment** (which implies choice) but **evaluation** (which is structural). The Blade doesn't decide to assess — the assessment is the first cognitive event. Research on **need for cognition** and **evaluative orientation** documents this: some people process evaluatively as a default mode; others as an active choice. 庚 is the former.
- **DeYoung facet:** Extremely high on **Intellect** (rigorous, analytical) with the specific profile that the analysis is *conclusion-seeking* rather than *exploration-seeking* — the Blade reaches a verdict rather than multiplying possibilities.
- **Attachment note:** The Blade's relational pattern tends toward **dismissive-avoidant** not because of emotional unavailability per se, but because the evaluative default reads as distance by others. The care is real — it simply arrives through the same evaluative channel as everything else.

#### 辛 Yin Metal — The Jewel

**Behavioral default:** Perceives quality and its absence automatically — the way others perceive temperature.

**Psychological profile:**
- **Primary Jungian analog:** Introverted Sensing (Si) in its most refined expression, combined with Introverted Feeling (Fi) for aesthetic valuation. The Jewel's discernment is perceptual (registers quality the way others register temperature) and evaluative (assigns internal value based on what it finds).
- **Big Five signature:** High Openness/Aesthetics facet (the DeYoung distinction between Intellect — truth-seeking — and Openness — beauty/quality-seeking — applies here: 辛 is on the Aesthetics side) + High Conscientiousness/Orderliness (the standards are the structure) + moderate-low Extraversion (the discernment is internal)
- **Key psychological nuance:** The critical difference from 庚: the Blade evaluates *logically* (is this accurate? does this hold up?), while the Jewel evaluates *aesthetically* (is this genuinely excellent? does this meet the real standard?). These map to the DeYoung distinction between **Intellect** (ideas, logic, analysis — 庚) and **Openness/Aesthetics** (quality, beauty, refinement — 辛). Both are evaluative, but the criterion differs fundamentally.
- **Shadow psychology:** Research on perfectionism distinguishes **healthy perfectionism** (high standards that motivate quality work) from **maladaptive perfectionism** (standards as a source of chronic dissatisfaction). The Jewel sits precisely on this axis — the same discernment that produces genuine excellence can produce a chronic gap between what is perceived as possible and what is available.

#### 壬 Yang Water — The Ocean

**Behavioral default:** Holds depth that exceeds what others can see. Always knows more beneath the surface than it shows.

**Psychological profile:**
- **Primary Jungian analog:** Introverted Thinking (Ti) operating at vast scale + Introverted Intuition (Ni) generating systemic insight. The Ocean processes comprehensively — holding multiple frameworks simultaneously, maintaining awareness of what is implied rather than stated.
- **Big Five signature:** High Openness/Intellect (analytical range, speculative capacity) + lower Extraversion Enthusiasm (the depth is internal, not displayed) + high Conscientiousness in the **Industriousness** facet (thorough, complete — the Ocean doesn't skip steps internally) + variable Neuroticism (the depth can become withdrawn if the quality of exchange is insufficient)
- **Key psychological nuance:** The Ocean's defining feature is not intelligence per se but **depth + withholding**. Research on introverted high-openness types documents a specific pattern: they process far more than they surface. The gap between internal awareness and external expression is chronic, and the frustration of being encountered at the surface when the depth is available is documented as a specific social-cognitive experience.
- **SDT connection:** The Ocean's **competence need** and **autonomy need** are extremely high — it requires contexts that honor the full depth, not just the accessible surface. When the relatedness context fails (shallow exchanges, people who can't follow the depth), the Ocean retreats rather than simplifying.
- **Important distinction from 癸:** The Ocean holds depth actively (knows more, retains more, analyzes more extensively); the Rain senses depth passively (perceives what is true without reasoning toward it).

#### 癸 Yin Water — The Rain

**Behavioral default:** Senses what is true before it is spoken. Nourishes specifically rather than broadly.

**Psychological profile:**
- **Primary Jungian analog:** Introverted Intuition (Ni) + Introverted Feeling (Fi). The Rain perceives at depth and cares specifically — the intuition is immediate and uncanny (knowing without knowing how), and the care goes where it is most needed.
- **Big Five signature:** High Neuroticism/Withdrawal facet (sensitivity is structurally high — this is the permeability that makes the Rain's perception possible) + High Agreeableness/Compassion (the care is genuine and deep) + lower Extraversion (the sensitivity is inward-processed) + variable Openness
- **Key psychological nuance:** The Rain's Neuroticism profile requires careful handling. In the Big Five, Neuroticism measures **emotional reactivity and negative affect** — but the Rain's sensitivity is not primarily anxious. It is *perceptual*. The more accurate framing is from Elaine Aron's research on **Highly Sensitive Persons (HSP)**: deeper cognitive processing of stimuli, greater sensitivity to subtleties, stronger emotional reactivity — which is simultaneously the source of the Rain's greatest gift (perceiving what is true before it is spoken) and its characteristic burden (difficulty maintaining the distinction between perception and absorption).
- **Attachment parallel:** The Rain's attachment profile tends toward **anxious-preoccupied** not because of insecurity per se, but because its permeability means that proximity to others is not emotionally neutral. The Rain absorbs the emotional state of those around it, which makes the quality of connection existentially important in a way it simply is not for less sensitive types.

---

### PART C: tgPattern Psychological Profiles

The tgPattern describes the **dominant structural force shaping the Day Master's expression**. This is where BaZi and modern psychology converge most richly — and where the anti-label warning is most important. Each pattern is not a single psychological construct but a structural condition with multiple psychological dimensions.

#### `pure` — Self-Element Dominant

**What BaZi describes:** The chart amplifies its own core element without internal counterforce. The character runs at full charge, unmodulated.

**Psychological grounding:**
- **Jung's concept of one-sidedness (Einseitigkeit):** When the dominant function runs without adequate development of its opposite, the person becomes increasingly identified with one pole of their nature. Jung explicitly described this as simultaneously the source of greatest competence and greatest rigidity. The `pure` pattern is structural one-sidedness — not pathological, but architecturally unmodulated.
- **Personality structure:** Research on what psychologists call **integrative complexity** (the ability to hold multiple perspectives simultaneously) is relevant here. High integrative complexity produces flexible, multi-perspective reasoning; low integrative complexity produces powerful, singular reasoning. The `pure` pattern tends toward lower integrative complexity — not because the person is less intelligent, but because the architecture reinforces a single evaluative framework.
- **Self-schema consolidation (Markus, 1977):** A highly consolidated self-schema produces consistent, predictable behavior and strong identity — but at the cost of permeability to new information that challenges the schema's core.
- **Key psychological nuance:** The `pure` pattern is the source of both the person's greatest distinctiveness and their most characteristic difficulty with feedback that challenges the core. The behavioral gift and shadow are *structurally identical* — concentrated without modulation is potent AND brittle simultaneously.

#### `rooted` — Resource/Seal Dominant

**What BaZi describes:** The element that generates and nourishes the Day Master dominates. The person draws from a well they didn't dig.

**Psychological grounding:**
- **Attachment theory's secure base provision:** The `rooted` pattern produces a character that has been constitutionally supported — whether through actual secure attachment, institutional backing, inherited strength, or a dispositional quality of feeling held. The behavioral implication is profound: people who have never felt the full existential urgency of being without support operate differently from those who have.
- **SDT's externally supported autonomy:** The well the person draws from is outside themselves. This maps to what SDT calls **introjected regulation** that has been sufficiently stable to become part of identity — but the foundation is external origin, even if it feels internal.
- **Big Five parallel:** Lower Neuroticism (the security is genuine) + specific pattern where the person's Agreeableness and positive affect are *anchored externally* — when the support is withdrawn, more instability appears than the person expected.
- **Key psychological nuance:** This pattern is NOT simply "supported people are better off." The critical psychological insight is about **what happens when the support is unavailable**. Research on people with secure early attachment shows robust functioning — but also documents that sudden loss of the secure base produces disproportionate disorientation because the internal resources for self-soothing were never forced to fully develop. The `rooted` reading must capture both the genuine depth of the resource AND the shadow: what is not yet internally developed because it didn't have to be.

#### `flowing` — Food God Dominant (same-polarity output)

**What BaZi describes:** The element the Day Master naturally produces dominates. Output as natural state — effortless and non-assertive.

**Psychological grounding:**
- **SDT's intrinsic motivation in its purest form:** The `flowing` pattern is the structural description of doing because doing is its own reward. Ryan and Deci's foundational research identifies intrinsic motivation as behavior that is "inherently interesting and enjoyable" — and the Food God dominant chart is exactly this: the output emerges from inherent interest rather than external pressure or reward.
- **Csikszentmihalyi's flow research:** The flowing pattern describes a person who enters **flow states** naturally — deep, effortless engagement where the challenge and skill are matched without deliberate calibration. The output is not performance; it is simply what happens when this person is fully themselves.
- **Big Five parallel:** High Openness (creative, expressive) + specific Agreeableness profile (generous rather than compliance-oriented) + the characteristic that Industriousness comes *naturally* in this person's domain rather than through willpower
- **Key psychological nuance:** The critical difference from the `expressive` pattern: flowing output is **non-assertive** — it doesn't push against anything. The person produces what they produce because that's what emerges, not because they're proving something. The shadow documented in flow research: the very ease of the output can become the complacency that prevents building the structural foundations the work needs. The flowing person over-extends into what feels natural without checking whether the ground is ready.

#### `expressive` — Hurting Officer Dominant (opposite-polarity output)

**What BaZi describes:** The element the Day Master produces dominates, but in opposite-polarity tension with the DM. Output that pushes against structure.

**Psychological grounding:**
- **Reactive creativity research (Forster & Higgins):** Creativity that emerges in response to constraints or challenges is structurally different from creativity that emerges in comfortable conditions. The `expressive` pattern describes a person whose output is *sharpened* by what it meets resistance from — the brilliance is not independent of the friction; it is partially constituted by it.
- **SDT's autonomy need under threat:** When autonomy is thwarted, the response depends on personality. Research shows that high-autonomy people don't simply comply when constrained — they push back, and the nature of the pushback reveals the character. The `expressive` pattern describes a person whose output is structurally in tension with authority/convention — not from willful rebellion but because the output *exceeds* the existing framework.
- **Innovation personality research (Patterson et al., 2009; Furnham et al.):** Research on innovative personality consistently finds a profile of High Openness + Low Agreeableness (specifically low Politeness/compliance) + variable Conscientiousness. The `expressive` chart maps to this profile at the structural level — the output pushes against structure because the existing structure is insufficient to contain it.
- **Key psychological nuance — the critical distinction from `flowing`:** Flowing output is **generous** (gives what it has because giving is structural); expressive output is **assertive** (gives what it produces into a space that resists it). A flowing person produces music; an expressive person produces music that makes the existing genre inadequate. The shadow of `expressive` is not the shadow of `flowing` — flowing over-extends; expressive potentially self-destructs when the output cannot find the right container.
- **DeYoung facet:** Strong on **Assertiveness** (Extraversion facet) + High **Intellect** (Openness facet — ideas that challenge existing frameworks) + tension between output quality and institutional reception

#### `forging` — Wealth Element Dominant

**What BaZi describes:** The element the Day Master controls and shapes dominates. The energy goes toward directing, acquiring, making productive.

**Psychological grounding:**
- **McClelland's Achievement Motivation (nAch):** The `forging` pattern most closely maps to high nAch — a strong orientation toward mastery, toward directing resources toward outcomes, toward making things work. But McClelland's research is important here: nAch is specifically about **personal mastery and directing outcomes**, not just following rules (which is more Conscientiousness) or seeking social recognition (which is more Extraversion).
- **SDT's competence need:** The forging person's psychological wellbeing is deeply bound up with feeling effective — with being able to direct what needs to be directed. Thwarting the competence need (putting this person in contexts where they cannot control outcomes) is specifically distressing.
- **Big Five parallel:** High Conscientiousness/Industriousness (achievement-striving, directed effort) + specific Assertiveness facet of Extraversion (takes charge, initiates direction) + moderate-to-lower Agreeableness (the drive to direct is not modulated by social concern for others' preferences)
- **Key psychological nuance:** The `forging` pattern is NOT just Conscientiousness. Conscientiousness measures self-regulation and orderliness; the forging pattern measures **outward-directed control and acquisition**. The distinction: a highly Conscientious person organizes themselves; a `forging` person organizes the resources around them. The shadow is what the control-and-acquisition orientation does when the forging person becomes depleted: research on high achievement motivation documents a specific pattern of self-depletion when the directing self loses access to the resources it has been directing.

#### `tested` — Direct Officer Dominant (opposite-polarity authority)

**What BaZi describes:** The element that disciplines the Day Master dominates, in a framework the person can respect. Recognition is earned through legitimate channels.

**Psychological grounding:**
- **Legitimacy theory (Tyler, 2006):** Research on why people comply with authority documents a fundamental distinction: **normative compliance** (I follow the rules because the framework is legitimate and I have chosen to accept it) vs. **instrumental compliance** (I follow the rules because I have to). The `tested` pattern maps precisely to normative compliance — the person has endorsed the framework, which is why it shapes rather than oppresses them.
- **SDT's identified regulation:** On SDT's motivation continuum, the highest form of extrinsic motivation is **integrated regulation** — behavior that aligns with one's identity and values even though it originated outside the self. The `tested` pattern describes a person whose achievement motivation has been shaped by a framework they have integrated into their identity.
- **Big Five parallel:** High Conscientiousness across both facets (Industriousness: does the work; Orderliness: respects structure) + moderate Agreeableness/Politeness (works within the system, respects the framework) + lower Neuroticism (the framework provides stability)
- **Key psychological nuance — the critical distinction from `pressured`:** The Direct Officer tests and *grants permission* when the standard is met. The person shaped by this structure has a **secure base in legitimate authority** — Bowlby's term for the structure that allows confident exploration. When the authority is genuine, the `tested` person thrives; when the authority is absent or corrupt, the orientation point is lost. This is the specific vulnerability documented in research on highly norm-endorsing individuals who encounter institutional corruption.
- **Attachment parallel:** Secure attachment to authority structures — finding legitimate frameworks *strengthening* rather than constraining. This produces the kind of reliable, principled achievement that institutions value most, and the kind of disorientation that follows when those institutions prove unworthy.

#### `pressured` — Seven Killings Dominant (same-polarity authority)

**What BaZi describes:** The element that disciplines the Day Master dominates, but it does not grant permission and does not moderate itself.

**Psychological grounding:**
- **Post-traumatic growth (PTG) research (Tedeschi & Calhoun, 1996):** Research on adversarial growth documents that the same traumatic or challenging conditions that devastate some people produce remarkable growth in others — and that the *nature of the conditions* (uncontrolled, high-intensity, unavoidable pressure) is specifically associated with the PTG phenomenon. The `pressured` pattern describes a character that has been structurally subjected to this kind of pressure — not as a choice but as a constitutional condition.
- **Hardiness theory (Kobasa, 1979):** Research on hardiness identifies three components that buffer against stress: commitment, control, and challenge. The `pressured` chart describes someone for whom the challenge component has been activated at maximum — and the question is whether commitment and control were available to process it productively.
- **Big Five parallel:** Variable and complex. High Neuroticism potential (the pressure creates emotional intensity — this is not automatically pathological but is emotionally costly) + High Conscientiousness/Industriousness (surviving pressure requires extraordinary directed effort) + variable Agreeableness (can be either very low — the pressure has hardened the response — or very high — the pressure has produced deep empathy through suffering)
- **Key psychological nuance — the critical distinction from `tested`:** This is the highest-variance pattern in the taxonomy. The same structural condition produces either exceptional achievement or significant damage. The key variable in the research is whether the person had **sufficient internal resources (roots) to process the pressure**. Without roots, the Seven Killings pressure destroys; with roots, it produces the kind of proven, unconditional capability that no other path creates. The reading must capture both possibilities without foreclosing either.
- **Adversarial social hypothesis (Wilson, 2009):** Research on individuals who perform at the highest levels in adversarial conditions documents a specific personality structure: these are people for whom the absence of the testing pressure actually *reduces* performance — they have been calibrated to the adversarial condition and require it to function at peak. This is the `pressured` pattern's most distinctive psychological signature, and its most specific shadow.

---

### PART D: Band Psychological Profiles

The band describes the *intensity and regulation* of the stem's behavioral default. This is distinct from the stem itself (which describes the orientation) and the tgPattern (which describes the structural force). The band describes how fully and consistently the orientation expresses.

#### `concentrated` — Element Saturates the Chart

**What BaZi describes:** Core element at full charge; little natural counterforce within the chart.

**Psychological grounding:**
- **Trait activation theory (Tett & Guterman, 2003):** Traits are activated by situational cues. The `concentrated` band means the trait activates *regardless of situational cues* — it runs because it runs, not because the situation calls for it. This is trait expression at maximum consistency, independent of context.
- **Low integrative complexity as a *structural condition* (not a capacity):** The concentrated person is not less capable of complexity — they have less *internal counterforce* producing it spontaneously. They can develop integrative complexity through effort; it just doesn't arise naturally.
- **Regulatory focus theory (Higgins, 1997):** Concentrated charts tend toward strong promotion OR prevention focus (depending on the element) with high intensity. The focus is clear, consistent, and hard to redirect.
- **Reading implication:** A concentrated 庚 Metal person is not *more Metal* than a balanced 庚 — they are the *same* Metal with less of the internal correction that the balanced person has. More potent in their distinctive domain; more brittle at the boundaries.

#### `balanced` — Element in Genuine Equilibrium

**What BaZi describes:** Core element neither overwhelming nor overwhelmed; in genuine productive relationship with other chart forces.

**Psychological grounding:**
- **Jung's individuation as process:** The balanced band most closely maps to what Jung described as the achievement of individuation — not the absence of the dominant function, but its integration with the opposing functions into a coherent whole. This is not a less vivid version of the concentrated type; it is a fundamentally different structural condition.
- **SDT's integrated regulation:** The balanced person has moved from external expression of their nature to genuinely autonomous engagement with it — the character is directing itself rather than running as an automatic process.
- **Research implication:** The balanced band tends to produce the highest *adaptive performance* across diverse contexts — not the peak performance in a single domain (that belongs to concentrated charts in the right conditions) but the most consistently reliable performance across varying conditions.

#### `open` — Element Needs the Right Conditions

**What BaZi describes:** Core element intact but context-sensitive; same capability, significantly higher environmental variance.

**Psychological grounding:**
- **Person-environment fit theory (Holland, 1985):** The `open` band describes a person for whom the environment quality is not merely relevant but *categorical* — the right conditions produce dramatically different results than the wrong conditions. Research on person-environment fit consistently shows that the gap between good-fit and poor-fit performance is much larger for some personality types than others.
- **Aron's Highly Sensitive Person (HSP) framework:** The `open` band often has a sensitivity component — the person's output is more attuned to contextual quality, which means both that the right conditions produce exceptional results and that the wrong conditions produce much more pronounced difficulties than for less context-sensitive types.
- **SDT implication:** The `open` band most strongly benefits from genuine **autonomy support**, **competence feedback**, and **relatedness quality** — the three basic needs from SDT that, when satisfied, enable intrinsic motivation and when thwarted, produce the most visible underperformance.
- **Reading implication:** Never frame the `open` band as a weaker version of the concentrated band. It is a different structural relationship with the world — one that makes the person more sensitive to conditions and more capable of optimal performance *in the right conditions*. The concentrated person performs at the same level regardless; the open person's range is wider at both ends.

---

### PART E: Catalyst — The SDT Motivational Gap

The catalyst (喜用神) maps most naturally to SDT's framework of **basic psychological needs**. The catalyst is not what the person is missing — it is what the chart has been organized around seeking, which is SDT's description of an unmet basic need that structures motivation over time.

| Catalyst element | SDT primary need analog | What the absence has built |
|---|---|---|
| Fire | **Autonomy** — direction from within, meaningful purpose | The chart has developed extraordinary capability without external direction; every sense of purpose has been internally constructed |
| Water | **Competence** — feeling effective through depth and substance | The chart has developed acute evaluative capacity; the craving is for conditions that deserve the full precision |
| Wood | **Autonomy** — generative reach, something to build toward | The chart has developed stability without the developmental momentum it was built for |
| Earth | **Relatedness + Stability** — grounded support | The chart has developed strength-under-pressure without the structural foundation it needs to sustain that strength |
| Metal | **Competence** — precision, definition, structure | The chart has developed broad capability without the shaping force that would make it specifically useful |

**Critical SDT-BaZi alignment:** Ryan and Deci's research shows that when basic psychological needs are chronically unmet, people develop sophisticated *substitution strategies* — they build what they can't naturally access, which produces distinctive character features. The reference chart (庚_concentrated_pure_Fire) is exactly this: a chart that has never had the Fire that gives precision a direction, and has therefore developed an extraordinary self-directed precision — but one that still seeks the forge that would give it a specific target.

---

### PART F: Vocabulary and Language Guide

This is the operational translation from psychological insight to reading language. The goal: psychologically grounded, multi-dimensional, analytically precise, emotionally resonant.

#### The three-register vocabulary framework

Every strong reading operates across three registers simultaneously. Readers feel the reading working when all three are present; when only one or two are present, the reading reads as either too clinical or too vague.

| Register | What it does | Example from reference reading |
|---|---|---|
| **Structural** | Names the mechanism — the *why* behind the behavior | "The assessment happens automatically — before the social read, before the emotional response, before you've decided to engage at all." |
| **Experiential** | Names the felt quality — what it is like from the inside | "Others feel evaluated in your presence even when you say nothing." |
| **Relational** | Names how it lands for others — what others experience | "Before you say a word, the room recalibrates." |

**Rule:** Every content block (teaser, p1, p2, each gift, each edge) should contain at least the structural and experiential registers. The relational register is most important in teasers and edges.

#### Precision vocabulary principles

**For cognitive/perceptual descriptions (p1):**
Use **process language**, not trait labels.
- Wrong: "You are analytical" (trait label — names the category)
- Wrong: "You tend to be precise" (tendency language — vague mechanism)
- Correct: "Your processing runs through accuracy before anything else engages" (process language — names the *mechanism*, not the category)

**For motivational descriptions (p2):**
Use **orientation language**, not need labels.
- Wrong: "You need direction" (need label — tells without showing)
- Wrong: "You seek purpose" (generic motivation language)
- Correct: "Fire is what this chart has been organized toward before it had a language for it — not something added, but the force that gives precision a direction it can commit to" (orientation language — names the formative structure of the seeking)

**For gifts:**
Name the **specific capability this structural combination makes reliable**, not the archetype's general virtues.
- Wrong: "You are perceptive" (could apply to any archetype)
- Wrong: "You see through complexity" (too vague)
- Correct: "When others are confused, your read sharpens. You see what is actually happening before it has been named — and you do not mistake noise for signal, because you never stopped tracking the signal in the first place." (specific mechanism: *why* this gift is reliable for this structural combination)

**For edges:**
Trace the gift backward into its shadow — same quality, different condition.
- Wrong: "You can be cold" (separate weakness, not traced from gift)
- Wrong: "Precision can hurt people" (generic shadow)
- Correct: "The same precision that makes you most capable is what makes genuine care most difficult to deliver — not because the care isn't real, but because it arrives through the same channel as everything else: evaluated, accurate, unambiguous." (traces directly from gift: same channel, same quality, different reception context)

#### The multi-dimensionality principle

Each archetype has **at minimum** four active psychological dimensions. A reading that addresses only one or two reads as flat even if each individual claim is accurate.

Required dimensions per template:
1. **Cognitive dimension** — how this person processes information (from stem + band profiles above)
2. **Motivational dimension** — what drives them internally and what the chart is oriented toward (from tgPattern + catalyst)
3. **Relational dimension** — how this character lands in relationships and social contexts (from stem relational profile)
4. **Temporal dimension** — what this character has built over time and what the formative absence has created (from catalyst as formative gap)

The reference reading addresses all four: cognitive (p1: evaluative processing), motivational (p2: resolution of what's true + Fire as formative orientation), relational (teaser: the room recalibrates; edges: warmth reads as performance), temporal (p2: "before it had a language for it").

#### Banned vocabulary and why

| Banned phrase | Why it's banned | Better alternative |
|---|---|---|
| "You are destined for..." | Removes agency, feels like horoscope | "The chart is structured toward..." |
| "Your energy is..." | Vague, non-behavioral | Describe the mechanism directly |
| "You tend to be..." | Tendency language removes structural fact | Name the structural default ("runs before anything else engages") |
| "Deep down, you..." | Condescending — implies you know better than the reader | Describe the mechanism without the presumption |
| "People like you..." | Demographic comparison — breaks the second-person contract | Keep it "you" throughout |
| "Your [element] gives you..." | Surfaces BaZi mechanism | Translate entirely into behavior |
| "Balanced/Rooted/Pure/etc." | tgPattern names never appear in text | Embody the pattern in description |
| "X makes you Y" | Mechanical causality — reads as astrology | Show the structural relationship without the causal formula |

---

### PART G: Integration Notes — Psychological Grounding and the Reading Guardrail

The psychological frameworks in §3A.7 are fully integrated into the Part D system prompt and the generator's PSYCH_PROFILES data structure. This section documents how the four framework levels interact with the language and structural rules that govern output quality. It is reference documentation — the operational instructions live in Part D.

#### How the four levels map to reading fields

Each psychological level informs specific reading fields. The frameworks determine *what to claim*; Part D's language rules determine *how to express it*:

| Framework level | Primary reading fields | Key constraint |
|---|---|---|
| Level 1 — stem mechanism | p1 (front-end/back-end), teaser, gifts | Express as behavioral observable, not Jungian label |
| Level 2 — band regulation | p1 (interior mechanism), edge mechanism | Open band: name specific environment, not "right conditions" |
| Level 3 — tgPattern shadow | edges (both costs), Watch for signal | Shadow must trace to the same quality as the gift |
| Level 4 — catalyst SDT gap | p2 (relief clause), twoAM, landscape | Catalyst is formative orientation, not deficit |

#### How the tgPattern profiles generate Watch for signals

The Watch for requirement (one per edge) is most reliably sourced from Level 3's psychological profile. Each tgPattern produces a specific observable moment:

- **pure** — watch for the moment new information arrives and the first response is to find what's wrong with the information (schema consolidation protecting itself)
- **rooted** — watch for the moment the backing is unavailable and the chart must operate without the support structure (unexpected vulnerability from secure-base dependency)
- **flowing** — watch for extension into what feels natural without checking whether the foundation is ready (intrinsic motivation continuing past sustainable threshold)
- **expressive** — watch for the moment output meets a containing structure (friction that can produce both the best and worst outcomes of this pattern)
- **forging** — watch for the moment the control drive is operating without the energy to sustain it (nAch depletion before the director recognizes it)
- **tested** — watch for the moment the framework reveals itself as inadequate or unworthy (integrated regulation collapses when the structure that endorsed it proves insufficient)
- **pressured** — watch for the moment chart resources are insufficient to channel the force productively (pressure that refines in good conditions damages in depleted ones)

#### Vocabulary constraints from the framework

The psychological frameworks are internal derivation tools — they explain the claim but never appear in the reading text. The three-register vocabulary framework (§3A.7F) governs how derived content is expressed:

- **Structural register:** names the mechanism. ✓ "runs before anything else engages" ✗ "your introverted thinking function activates"
- **Experiential register:** names the felt quality from inside. ✓ "the ground is real but dry" ✗ "you feel deeply"
- **Relational register:** names how it lands for others. ✓ "they call you when the situation is actually serious" ✗ "others perceive you as"

Every content block needs at least structural + experiential. The teaser needs all three. Every structural claim must be followed by its behavioral translation within two sentences.

Framework terminology (Jungian function names, Big Five factor names, SDT theory names, PTG) is never used in reading output. Use the insight, not the framework name.


All UI labels use these translations exclusively. No Chinese characters appear in rendered user-facing text. Chinese characters are used only as JavaScript object keys (internal only).

| Classical term | Elementum UI label | Notes |
|---|---|---|
| 喜用神 | **Your Catalyst** | The element the chart structurally needs to unlock full capacity. Active, not passive. |
| 忌神 | **Your Resistance** | The element that clogs energy flow in this chart. Friction, not threat. |
| 调候用神 | Not surfaced in UI | Informs Catalyst/Resistance ordering; never named in UI |
| 扶抑用神 | Not surfaced in UI | Informs base Catalyst/Resistance; never named in UI |
| 旺 / 极旺 → content band: concentrated | **Concentrated** | Polarity label for strong/extremely strong DM |
| 弱 / 极弱 → content band: open | **Open** | Polarity label for weak/extremely weak DM |
| 中和 → content band: balanced | **Equilibrated** | Polarity label for balanced DM |
| 极旺 → UI label | **Extremely Strong** | Energy condition card label |
| 旺 → UI label | **Dominant** | Energy condition card label |
| 中和 → UI label | **Balanced** | Energy condition card label |
| 弱 → UI label | **Receptive** | Energy condition card label |
| 极弱 → UI label | **Yielding** | Energy condition card label |

**Deprecated translations (removed from all content):**
- ~~"What lifts you"~~ → Your Catalyst
- ~~"What depletes you"~~ → Your Resistance
- ~~"Useful God"~~ → Your Catalyst
- ~~"Favorable element"~~ → Your Catalyst
- ~~"Unfavorable element"~~ → Your Resistance
- ~~"Energy condition"~~ → used only as a section label, not a section header (replaced by the specific label e.g. "Extremely Strong")

---

# PART 5 — SECTION 1: WHO YOU ARE (DayMasterHero Component)

## 5.1 What This Section Does

Section 1 is the identity anchor. It answers "who are you at your core" using Day Master element, polarity, and strength band. Everything here is pre-written static content — no LLM required. The section is always fully visible; no toggle or paywall applies.

## 5.2 Layout (Top → Bottom, Pure Scroll)

```
┌────────────────────────────────────────────────────┐
│  HEADER ZONE (centered, tinted background)         │
│                                                    │
│  [Archetype Seal — 72px SVG]                       │
│  [Identity Token pill]                             │
│  The Blade                    (38px, element color)│
│  "Precision before intention…"  (manifesto, 14px)  │
├────────────────────────────────────────────────────┤
│  BODY ZONE (padding 22px)                          │
│                                                    │
│  [Energy indicator — ring + label + sublabel]      │
│                                                    │
│  WHO YOU ARE (10px label)                          │
│  "You don't sharpen your edge…"  (teaser, 17px ital│
│  As a Yang Metal type at concentrated energy…(15px)│
│  Your independence isn't a preference…      (15px) │
│                                                    │
│  ┌─────────────────────────────────────────────┐   │
│  │ ★ CORE GIFTS                                │   │
│  │ ─────────────────────────────────────────── │   │
│  │ Decisive Clarity                            │   │
│  │ You reach conclusions others are still…     │   │
│  │ ─────────────────────────────────────────── │   │
│  │ Productive Force                            │   │
│  │ Your drive isn't motivational — it's…      │   │
│  └─────────────────────────────────────────────┘   │
│                                                    │
│  ┌─────────────────────────────────────────────┐   │
│  │ 〰 GROWING EDGE                              │   │
│  │ ─────────────────────────────────────────── │   │
│  │ Combative Certainty                         │   │
│  │ Your read on situations is usually…         │   │
│  └─────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────┘
```

**Critical design decisions:**
- No toggles, no expand/collapse in Section 1. Everything visible on scroll.
- Core Gifts and Growing Edge are boxed cards with tinted header bars (element color for Gifts, accent/warm color for Edge)
- Each item: bold label in element/accent color, desc sentence below in muted text

## 5.3 Identity System

### Archetypes (10 stems)

| Stem | Archetype | Element |
|---|---|---|
| 甲 | The Oak | Wood |
| 乙 | The Vine | Wood |
| 丙 | The Sun | Fire |
| 丁 | The Candle | Fire |
| 戊 | The Mountain | Earth |
| 己 | The Field | Earth |
| 庚 | The Blade | Metal |
| 辛 | The Jewel | Metal |
| 壬 | The Ocean | Water |
| 癸 | The Rain | Water |

### Manifesto Lines (third person, one per archetype)

| Stem | Manifesto |
|---|---|
| 甲 | "Builds what others can only imagine. Growth is not ambition — it is the architecture." |
| 乙 | "Finds the path no one else sees. Arrives exactly where it intended." |
| 丙 | "Doesn't choose to illuminate. Simply is light — and everything near it comes alive." |
| 丁 | "Illuminates completely what it's pointed at. Nothing more. Nothing less." |
| 戊 | "People orient their lives around it without knowing why. The ground that holds." |
| 己 | "Grows things in silence. Leaves everything it touches more alive than it found it." |
| 庚 | "Precision before intention. An edge that was never chosen — only found." |
| 辛 | "Perceives what is excellent the way others perceive temperature — before the question is asked." |
| 壬 | "Holds more beneath the surface than it ever shows. Always has. Always will." |
| 癸 | "Knows what is true before it is spoken. Nourishes what it touches without announcing it." |

### Identity Token (pill component)

Format: `[stem character] · [Polarity] [Element] · [Archetype without "The"]`

Example for 庚 Yang Metal: `庚 · Yang Metal · Blade`

Rendered in element color on a lightly tinted background above the archetype title. This is the Elementum equivalent of MBTI's "INTJ-A" — a compact, shareable, memorable code.

**Note:** The stem character (e.g. 庚) appears in the identity token as a visual glyph, not as a word. It is never pronounced to the user or explained in UI. It functions like a zodiac symbol.

### Archetype Seals (SVG, 72×72px)

| Stem | Seal concept |
|---|---|
| 甲 | Upward branching tree: central trunk, two branch tiers, root suggestions at base |
| 乙 | Spiral wrap: curved vine path climbing around implied vertical axis |
| 丙 | Radiating rays: central circle with 8 spokes alternating long/short |
| 丁 | Single upward flame: tapered teardrop form with inner lighter fill |
| 戊 | Layered peak: outer triangle with two internal horizontal strata lines |
| 己 | Cultivation grid: horizontal furrow lines with small sprout marks above |
| 庚 | Bisected hexagon: outer hex + inner hex + vertical axis + center point |
| 辛 | Faceted diamond: rotated square with inner cross diagonals creating facets |
| 壬 | Depth rings: 4 concentric circles + horizon line bisecting center |
| 癸 | Wave arcs: 3 descending wave paths + vertical fall-drop dashes below |

### Element Colors

| Element | Color hex |
|---|---|
| Metal | #8ba3b8 |
| Wood | #7a9e6e |
| Fire | #c4745a |
| Earth | #b89a6a |
| Water | #5a7fa8 |

## 5.4 Energy Indicator (Strength Ring)

SVG partial circle, 48px, rendered in element color. Day Master stem character centered inside. Displayed inline with label and sublabel.

| strength | Ring fill | UI label | Sublabel |
|---|---|---|---|
| extremely_strong | 92% | Extremely Strong | The element is dominant — pure and concentrated |
| strong | 72% | Dominant | Well-supported and self-directed |
| moderate | 50% | Balanced | Flexible — works across many conditions |
| weak | 30% | Receptive | Needs the right conditions to come through fully |
| extremely_weak | 12% | Yielding | Highly context-dependent — finds strength through support |

## 5.5 WHO_YOU_ARE Content Structure

Keyed as: `WHO_YOU_ARE[stem] → { teaser, bands: { concentrated, balanced, open } }`

Each band contains `{ p1, p2 }` — two portrait paragraphs.

**Teaser:** 1–2 sentence hook, always visible, italic, 17px. Written in second person. Emotional entry point. Example (庚): *"You don't sharpen your edge. You were born with one — and the question has always been what to cut toward."*

**p1 — Cognitive portrait:** How this archetype thinks at this energy level. What's specific to this type × band combination. ≤58 words. Must include a "specific insight" — something recognisable only to this archetype at this band.

**p2 — Motivational portrait:** How this archetype operates, what drives it, what defines the current chapter. ≤58 words. Must not repeat territory covered in p1.

**Rules:**
- No cross-band comparisons ("unlike the concentrated version…" — forbidden)
- No Chinese characters in any text
- Each band stands alone as a complete reading
- Language: direct behavioral register, second person, present tense

**Band-specific logic:** The three bands describe genuinely different psychological profiles, not the same traits at different magnitudes. This is informed by 用神 logic:
- Concentrated → 用神 is Output/Wealth → gifts in expression/production domains, edges in excess patterns
- Balanced → 用神 situational → gifts in range/adaptability, edges in loss of anchor
- Open → 用神 is Resource/Companion → gifts in reception/collaboration, edges in deficiency patterns

## 5.6 Core Gifts & Growing Edge

### Data Structure

```javascript
// CORE_STRENGTHS and CORE_SHADOWS are both keyed: stem → band → items[]
// Each item: { label: string, desc: string }
// Selection in buildDayMasterProfile():
//   profile.strengths = CORE_STRENGTHS[dm.stem]?.[band] || []
//   profile.shadows   = CORE_SHADOWS[dm.stem]?.[band]  || []
```

### Content Rules

**3 items per stem per band** = 90 strength items + 90 shadow items = 180 total items.

Each item has:
- `label` (2–4 words, bold, element/accent color): The trait name. Instantly quotable. Unique across all three bands for the same stem.
- `desc` (1 sentence, ~20–30 words): The behavioral consequence. Second person. What this trait does in practice.

**Gifts (CORE_STRENGTHS) — rules:**
- Labels and descs describe genuine capabilities, not aspirations
- Concentrated bands: gifts in expression/output domain (what you produce, decide, initiate)
- Open bands: gifts in reception/collaboration domain (what you read, absorb, earn)
- Balanced bands: gifts in range/adaptability domain (how you flex without losing centre)
- No cross-band comparisons in desc text
- No Chinese characters

**Growing Edge (CORE_SHADOWS) — rules:**
- Every edge is the shadow of a genuine strength, not a separate flaw
- Concentrated edges: excess patterns (rigidity, combativeness, inability to receive)
- Open edges: deficiency patterns (condition dependency, deferred authority, underestimated ceiling)
- Balanced edges: instability patterns (loss of centre, unvoiced standards, reversion under pressure)
- Language: honest but not diagnosing. Describe the behavioral consequence, not a character flaw.

### Reference example — 庚 (Yang Metal) across all three bands

**Concentrated:**
- Gifts: Decisive Clarity · Productive Force · Honest Directness
- Edges: Combative Certainty · Uniform Force · Closed to Shaping

**Balanced:**
- Gifts: Strategic Precision · Principled Adaptability · Earned Credibility
- Edges: Inconsistent Edge · Anchor Dependence · Undeclared Standards

**Open:**
- Gifts: Refined Discernment · Collaborative Precision · Contextual Intelligence
- Edges: Condition Dependency · Deferred Authority · Underestimated Ceiling

### Card visual design

**Core Gifts card:**
- Tinted header bar: element color at 18% opacity, star ★ icon (14px) in element color
- Section label: "CORE GIFTS" (11px, uppercase, tracked, element color)
- Items separated by hairline dividers (element color 15%)
- `label`: 15px, fontWeight 600, element color
- `desc`: 14px, lineHeight 1.7, muted secondary color

**Growing Edge card:**
- Same structure but accent color palette (warm amber/coral #c4745a family)
- Flame/teardrop icon in header
- `label`: 15px, fontWeight 600, accent color
- `desc`: 14px, lineHeight 1.7, muted secondary color

## 5.7 buildDayMasterProfile() — What It Returns

```javascript
{
  archetype,        // "The Blade"
  manifesto,        // "Precision before intention…"
  coreLine,         // archetype voice one-liner (internal, used in manifesto)
  strengthRing,     // { pct, label, sublabel }
  whoYouAreTeaser,  // "You don't sharpen your edge…"
  whoYouAreP1,      // cognitive portrait paragraph
  whoYouAreP2,      // motivational portrait paragraph
  strengths,        // array of { label, desc } — band-specific
  shadows,          // array of { label, desc } — band-specific
}
```

---

# PART 6 — SECTION 2: YOUR ENERGY PROFILE (ElementSpectrum Component)

## 6.1 What This Section Does

Section 2 is the elemental data layer. It answers "what's actually inside you" — not who you are as an archetype, but what energies your chart is made of and how they interact. All content is pre-written static data selected by chart variables. No LLM required.

The section is designed for viral identity recognition — like MBTI's four letters, the user should leave able to say "I'm Metal-dominant, Fire-absent" and have that mean something specific about them.

## 6.2 Six-Block Layout (Fixed Read Order)

No toggles. Everything visible on scroll. Six blocks in this exact order.

```
┌────────────────────────────────────────────────────┐
│  BLOCK 1 — Elemental Composition        (first)    │
│  Metal ✦  ████████░░  4                           │
│  Earth     ██░░░░░░░░  2                           │
│  Water     ██░░░░░░░░  2                           │
│  Wood      █░░░░░░░░░  1                           │
│  Fire      ╌╌╌╌╌╌╌╌╌  —  absent                   │
├────────────────────────────────────────────────────┤
│  BLOCK 2 — Energy Condition + Balance Approach     │
│  [☀/⚖/☽ condition icon 44px]  [Extremely Strong]  [91%] │
│                                [Concentrated] [DM support] │
│  [──────────── 91% bar ──────────────────────────] │
│  One-sentence diagnosis                            │
│  ─────────────────────────────                     │
│  Channel & Release — one-sentence approach         │
├────────────────────────────────────────────────────┤
│  BLOCK 3 — Dominant Energy                         │
│  [callout card: element icon + "Metal dominates"]  │
│  insight line (italic) + guidance line             │
├────────────────────────────────────────────────────┤
│  BLOCK 4 — Your Catalyst                           │
│  [callout card ×2: one per catalyst element]       │
│  element icon + name + italic insight + guidance   │
├────────────────────────────────────────────────────┤
│  BLOCK 5 — Your Resistance                         │
│  [callout card ×2: one per resistance element]     │
│  element icon + name + italic insight + guidance   │
├────────────────────────────────────────────────────┤
│  BLOCK 6 — What Is Absent                          │
│  [dashed-border callout card, one per missing el]  │
│  dashed icon + "Fire is absent" + insight          │
│  (omitted if no elements are absent)               │
└────────────────────────────────────────────────────┘
```

**No information is repeated.** The energy condition, polarity, and balance approach appear once (Block 1). The bar chart does not restate them. The callout cards introduce new information only.

## 6.3 Block 1 — Energy Condition + Balance Approach

One merged card. Never split. Read order: elemental composition (Block 2) appears FIRST as the visual overview, then Block 1 contextualises it.

### Visual layout (top → bottom)

```
[Condition icon 44px]  [Energy condition label]        [91%]
                       [Extremely Strong]               [DM support]
                       [Concentrated]
[──────────────── DM support % bar ────────────────────]
[One-sentence diagnosis]
[────────────────── divider ────────────────────────────]
[Balance approach] Channel & Release — [one-sentence approach line]
```

### Condition identity icons

Three SVG icons, one per energy band. Rendered in element color inside a 44px tinted tile. These are the user's vivid identity symbols for their energy state — equivalent to a zodiac glyph.

| Band | Icon | Symbol meaning | SVG description |
|---|---|---|---|
| concentrated | ☀ Sun | Self-generating, full, radiating — no external input required | Filled circle (r=7) + 8 rays (4 cardinal long, 4 diagonal short) |
| balanced | ⚖ Scale | Two equal forces in held tension — neither overwhelms | Horizontal beam + two equal-weight circles + triangular fulcrum + center post |
| open | ☽ Moon | Receives rather than generates — context determines expression | Crescent path: outer arc r=12 (center 18,18) + inner arc r=11 (center 22,18) |

**Implementation:** `conditionIcon` computed in `ElementSpectrum` from `band` value. Icon color = `dmColor` (Day Master element color). Never uses a background fill — the crescent SVG path geometry creates the shape.

### DM support percentage bar

A filled horizontal bar showing `Math.round(chart.dayMaster.strengthScore * 100)` as a percentage. Width scales from 0–100%. Rendered in element color at 65% opacity. Large percentage numeral (24px) displayed top-right alongside "DM support" label.

**What it represents:** The ratio of chart elements that support the Day Master (same element or elements that generate it) to the total chart element count. A concentrated chart scores 70–100%. A balanced chart scores 36–70%. An open chart scores 0–35%.

### STRENGTH_META — complete template

All content for Block 1 derives from `STRENGTH_META[dm.strength]`. Five strength levels map to three energy bands:

**CONCENTRATED (身强) — ☀ Sun icon**

| strength | label | polarity | frame | approach | approachLine |
|---|---|---|---|---|---|
| extremely_strong | Overpowering | Concentrated | Your core element saturates the chart — there is very little counterbalance to what you already are. | Channel & Release | This energy needs outlets: expression, challenge, and friction. Without them it turns inward and becomes rigidity. |
| strong | Dominant | Concentrated | Your core element leads the chart with clear authority — self-directed and largely independent of external conditions. | Channel & Release | This energy thrives when it has meaningful work to push against. Give it direction or it finds its own, usually at inconvenient moments. |

**EQUILIBRATED (身中和) — ⚖ Scale icon**

| strength | label | polarity | frame | approach | approachLine |
|---|---|---|---|---|---|
| moderate | Balanced | Equilibrated | Your core element sits in genuine equilibrium — neither overwhelming nor overwhelmed by the forces around it. | Maintain & Attune | This energy is naturally stable. The practice is staying attuned to what genuinely disrupts the balance, rather than forcing movement. |

**OPEN (身弱) — ☽ Moon icon**

| strength | label | polarity | frame | approach | approachLine |
|---|---|---|---|---|---|
| weak | Receptive | Open | Your core element depends on the right conditions to come through fully — it is not limited, it is context-sensitive. | Nourish & Amplify | This energy deepens when genuinely supported. The environment matters more than effort — seek what truly nourishes rather than what simply doesn't drain. |
| extremely_weak | Yielding | Open | Your core element operates almost entirely through alignment — when the conditions are right, the results are disproportionate to the apparent effort. | Nourish & Amplify | Alignment matters more than force here. The right conditions produce what years of effort in the wrong ones never will. |

### Balance approach — classical roots

| Approach | Classical root | Plain meaning |
|---|---|---|
| Channel & Release | 喜克泄耗 | Concentrated energy needs expression, challenge, and deliberate friction to stay purposeful |
| Maintain & Attune | 中和 | Balanced energy needs protection from extremes and awareness of what disrupts equilibrium |
| Nourish & Amplify | 喜生助 | Open energy comes through fully in the right conditions — environment matters more than force |

### What was removed from this block

The `ecr.portrait`, `ecr.dynamic`, and `ecr.practice` fields from `ENERGY_CONDITION_READINGS` are no longer rendered in Block 1. They are retained in the data for potential use in Section 3 [FUTURE] but do not appear in Section 2. Block 1 is deliberately concise: icon + % bar + one diagnosis sentence + one approach sentence.

## 6.4 Block 2 — Elemental Composition Bar Chart

Five rows, one per element. Sorted: highest count first, absent elements at bottom.

Each row:
- Element icon tile (24px, element color, rounded corners)
- Element name (12px); if Day Master element: fontWeight 500 + ✦ marker
- 8 discrete segments: filled in element color for each unit of count; empty segments in muted background
- Absent elements: dashed icon border, dashed bar segments, "absent" sub-label, reduced opacity overall
- Count number right-aligned

**Opacity rules:**
- Day Master element fill: 0.88 opacity (visually dominant)
- Other elements fill: 0.55 opacity
- Absent rows: 0.40 opacity overall

No legend needed — the ✦ marker and dashed treatment are self-explanatory with the labels.

## 6.5 Block 3 — Dominant Energy

Single callout card. The dominant element is always the highest-count element in `chart.elements`.

**Card structure:** element icon (28px) + section sub-label + element name + italic insight line + guidance line.

**Content source:** `getElementInsights(chart)` → `insights.dominant.line` and `insights.dominant.guidance`

**Dominant force lines (all 5 elements):**

| Element | Insight line | Guidance line |
|---|---|---|
| Metal | Metal dominates — precision without flexibility. The edge is real, but without heat it cannot find its purpose. | Seek environments that introduce friction and heat deliberately. Pressure is not the enemy — it is what gives your edge its purpose. |
| Wood | Wood overwhelms — almost all energy nourishes growth in others, leaving little for yourself. | What you grow in others is real. The question is whether any of those roots belong to you. Choose one thing you are growing entirely for yourself. |
| Fire | Fire saturates — warmth without restraint. The light is genuine but risks consuming its own source. | Choose where you direct the warmth rather than shining at everything. Selectivity is not dimming — it is precision. |
| Earth | Earth dominates — deep stability, but movement and change become genuinely difficult. | Allow movement before certainty fully arrives. The Mountain's strength is not less for being moved — it is more for having shifted deliberately. |
| Water | Water floods — depth without direction. The capacity is vast; the challenge is finding the channel. | Find the shores. The depth becomes power not by staying vast but by finding the forms through which it can actually reach people. |

## 6.6 Block 4 — Your Catalyst (喜用神)

**Label:** "Your Catalyst"

Two callout cards, one per catalyst element (from `ELEMENT_ENERGIES[dm.stem].lifts`, after 调候 adjustment applied).

**Card structure:** element icon + element name + italic one-line insight (what this element does for the chart) + guidance line (when/how it arrives).

**Content source:** `applyTiaohouToEnergies(ELEMENT_ENERGIES[dm.stem], dm.stem, monthBranch).lifts`

**ELEMENT_ENERGIES lifts per stem (pre-调候-adjustment baseline):**

| Stem | Catalyst 1 | Catalyst 2 |
|---|---|---|
| 甲 | Water: Nourishes the roots — the missing foundation | Fire: Channels growth into visible results |
| 乙 | Water: Nourishes the vine from below | Fire: Draws the vine upward and outward |
| 丙 | Wood: Feeds the flame — sustains warmth when it might exhaust itself | Fire: Genuine conviction that costs something carries furthest |
| 丁 | Wood: Sustains the flame through steady nourishment | Fire: Deepens the warmth and focus the candle carries |
| 戊 | Fire: Warms the mountain — activates what has been still | Earth: More ground deepens the foundation's reach |
| 己 | Fire: Warms the field — activates growth and ripening | Earth: More soil deepens the capacity to nourish |
| 庚 | Fire: Gives the edge purpose — transforms precision into mastery | Wood: Channels precision outward into results |
| 辛 | Water: Brings out the jewel's clarity and brightness | Earth: Holds and protects the gem's setting |
| 壬 | Metal: Generates Water — the primary source of support | Water: More depth amplifies what the Ocean can hold |
| 癸 | Wood: Flow with the dominant force — amplifies everything | Water: Supports the core while feeding what grows |

**Framing rule:** Catalyst is NOT "what feels good." It is the element the chart structurally needs to unlock its full capacity. Frame as activation, not comfort.

**Guidance line template:** "When [element] is present — in your environment, timing, or the people around you — the full capacity of this chart comes through."

## 6.7 Block 5 — Your Resistance (忌神)

**Label:** "Your Resistance"

Two callout cards, one per resistance element (from `ELEMENT_ENERGIES[dm.stem].depletes`, after 调候 adjustment).

**ELEMENT_ENERGIES depletes per stem (pre-调候-adjustment baseline):**

| Stem | Resistance 1 | Resistance 2 |
|---|---|---|
| 甲 | Metal: Cuts growth directly — the primary opposing force | Earth: Absorbs water before it reaches the roots |
| 乙 | Metal: Cuts the vine — the most direct opposing force | Earth: Too much soil smothers rather than supports |
| 丙 | Water: Extinguishes what the Sun works hardest to sustain | Metal: Absorbs warmth before it reaches who it's meant for |
| 丁 | Water: Extinguishes the focused flame | Metal: Draws the light away before it can illuminate |
| 戊 | Wood: Roots break the stone — the primary destabilising force | Water: Erodes the mountain over time |
| 己 | Wood: Takes without giving — drains the field's fertility | Water: Too much floods rather than nourishes |
| 庚 | Metal: More Metal deepens rigidity — already full | Water: Cools what needs to stay hot (spring/autumn baseline; overridden for summer births) |
| 辛 | Fire: The heat that tests — without Earth, risks damaging the facet | Metal: Too much Metal crowds rather than refines |
| 壬 | Earth: Dams the current — the primary opposing force | Fire: Evaporates depth before it can be used |
| 癸 | Metal: Disrupts the natural current | Fire: Burns Wood — undermines the entire foundation |

**Framing rule:** Resistance is NOT "what feels bad." It is the element that clogs energy flow in this specific chart. Frame as friction, not threat.

**Guidance line template:** "Environments or periods dominated by [element] energy create friction without forward movement — not always avoidable, but worth recognising."

## 6.8 Block 6 — What Is Absent

**Label:** "What is absent"

One dashed-border callout card per missing element. Dashed border signals gap vs. presence throughout the UI — this is consistent with the dashed bar segments above.

Omit the block entirely if `chart.missingElements` is empty.

**Content source:** `getElementInsights(chart)` → `insights.missing[]` (each with `.line` and `.guidance`)

**Missing element lines (all 5):**

| Missing element | Insight line | Guidance line |
|---|---|---|
| Fire | Fire is absent — no external force has shaped this chart's direction. Freedom and isolation in equal measure. | Build the conditions that make your work impossible to ignore. The forge comes to those who make themselves worth forging. |
| Earth | Earth is absent — no structural ground beneath the movement. The architecture is entirely self-generated. | Build one container strong enough to hold what you carry. Internal structure is the practice — not a destination. |
| Water | Water is absent — no reflective depth to temper or nourish. What is built may be strong; what is sustained is still developing. | Cultivate stillness as a practice, not an absence. What you build without depth can stand; what stands with depth endures. |
| Wood | Wood is absent — no natural outward reach or creative momentum. Expression must be cultivated rather than assumed. | Invest in the one direction that is genuinely yours. One root growing deep is worth more than many reaching shallow. |
| Metal | Metal is absent — no natural precision or definition. Structure must be chosen rather than inherited. | Define what is non-negotiable in how you work and live. Precision is a practice — and it begins with what you will not compromise. |

**Note on 调候 overlap:** When the absent element is also the 调候用神 (e.g. 庚 born in spring with missing Fire — Fire is both absent AND the seasonal priority), it will already appear in Block 4 (Your Catalyst) promoted to top position. Block 6 then gives the absent element its own full treatment. This intentional repetition is correct — the Catalyst block says "this is what activates you," the Absent block says "this is what's missing and what that has built in you." They do different jobs.

## 6.9 Callout Card Component

A reusable `CalloutCard` component handles Blocks 3, 4, 5, and 6. Props:

```javascript
<CalloutCard
  color={elementColor}          // element color hex
  borderStyle="solid"|"dashed"  // dashed for Block 6 (absent)
  icon={elementName}            // e.g. "Metal"
  sectionLabel="Metal · overall chart influence"
  name="Metal dominates"
  line="Insight sentence (italic)"
  guidance="Guidance sentence (plain)"
/>
```

**Solid border cards (Blocks 3, 4, 5):** light tinted background + solid border in element color
**Dashed border cards (Block 6):** transparent background + dashed border

---

# PART 7 — LITERARY VOICE RULES (All Reading Sections)

These rules apply to all LLM-generated content (Sections 3–10) [FUTURE] and inform the tone of the static content in Sections 1–2.

## 7.1 The Jargon-Free Principle

All BaZi technical terms are engine inputs only. They never appear in user-facing text. No exceptions.

**Terms that must never appear in any user-facing text:**
Day Master, Ten Gods, Food God, Hurt Officer, Seven Killings, Direct Officer, Parallel Self, Rob Wealth, Direct Wealth, Indirect Wealth, Direct Seal, Indirect Seal, 比肩, 劫财, 食神, 伤官, 偏财, 正财, 七杀, 正官, 偏印, 正印, 日主, 格局, 大运, 流年, 用神, 喜神, 忌神, 调候, 扶抑

The system handles the astrology. The reading delivers the meaning.

## 7.2 Translation Table

| Technical input | Literary output |
|---|---|
| Yang Metal, extremely strong | "You have an unusually stable core. Your sense of what is true arrives before the conversation does." |
| Missing Fire / no Officer stars | "The part of you that gets shaped by external authority — it was born quiet. You've never been easily molded by institutions or conventional structures. This isn't rebellion. It's architecture." |
| Strong self energy (比劫 dominant) | "Your self-direction is structural, not chosen. You have a strong inner axis that doesn't require external confirmation to feel real." |
| Output-to-wealth pattern | "Your creativity is your financial engine. The more directly your work carries your fingerprints, the more naturally success follows." |
| Current decade brings first fire | "The decade you're in now is the first time in your life that an external force with real leverage over your direction has arrived. This is the forge. It was always meant to come." |
| Seven Killings in flow year | "This year brings a testing force. Something external will press on you and ask: is the edge real? Is the work real?" |
| Direct Officer in flow year | "This year carries the possibility of genuine recognition — not performance-based praise, but the kind that arrives when someone with standing encounters the real quality of what you've built." |

## 7.3 Voice Specifications

**Person:** Second person ("you", "your") throughout. Never third person in readings.

**Tense:** Present tense for nature/character. Past for past decades. Possibility for future.

**Register:** Wise mentor. Emotionally intelligent friend. Not a therapist. Not a horoscope.

**Validation sequence:** Name what is genuinely true and affirming before naming what is hard. The reader needs to feel seen before they can hear the challenge.

**Forbidden patterns:**
- Generic affirmations: "You are destined for greatness"
- Vague positives without chart grounding
- Mystical obfuscation: "The cosmic energies align to..."
- False precision: "On March 14th you will..."
- Catastrophizing: "You will face great difficulty..."

**Required patterns:**
- Every claim traceable to a specific computed chart element
- Honest complexity: every strength has a shadow, name both
- Practical orientation: always land on "what does this mean for how I live"
- The person's agency: the chart describes weather, not fate

---

# PART 8 — MODEL ASSIGNMENT

| Task | Model | Reason |
|---|---|---|
| Reading generation (production) [FUTURE] | Claude Opus 4.6 | Prose quality, emotional precision, resistance to generic output |
| Reading generation (dev/artifacts) [FUTURE] | claude-sonnet-4-20250514 | Sufficient for development iteration |
| UI / code generation | claude-sonnet-4-20250514 | Iterative, cost-efficient, handles JSX |
| Calculation engine | No LLM | Pure JS. Non-negotiable. |
| Sections 1–2 content | No LLM at runtime | Static lookup. All content pre-written in engine constants. |

---

# PART 9 — READING SECTION TEMPLATES [FUTURE — Sections 3–10]

These templates are for the LLM-generated expandable reading sections, none of which are currently implemented. They are preserved here as the content specification for future build.

## Template 01 — Who You Are (Extended)

**JSON fields:** `dayMaster.element`, `dayMaster.polarity`, `dayMaster.strength`, `elements` (dominant), `combinations` involving day pillar

**Note:** Section 1 already renders the static version of "Who You Are." This template is for the deeper LLM-generated expansion [FUTURE].

**Prompt:**
```
Write 3 paragraphs:
1. The felt quality of this person's presence — how others experience them before any words. 
   Specific to this chart's strength reading. Translate the element archetype into a vivid, 
   non-technical image.
2. How the element's dominance shapes personality from the inside. What does this person 
   experience that others don't understand? Address the specific strength level.
3. What friction has this core created? What freedom? Where is this person most alive?
```

## Template 02 — The Missing Element

**JSON fields:** `missingElements`, `dayMaster`, `elements` (dominant)

**Prompt:**
```
Write 3 paragraphs on what this chart's missing element has built in the person.
1. Name the absence directly. What is not present in this chart, and what does that mean 
   structurally? Frame as something that was never given, not something that was lost.
2. What has the absence required this person to develop? What specific capacity exists in 
   them because this element was never provided externally?
3. What changes when this element arrives through timing, environment, or relationship? 
   What is waiting to unlock?
```

## Template 03 — Life Path

**JSON fields:** `pattern`, `dayMaster`, `elements`, `tenGods` (output and wealth families)

**Prompt:**
```
Write 3 paragraphs:
1. The clearest statement of how success works for this chart. What is the causal chain 
   from this person's natural gifts to meaningful success?
2. The institutional dimension. Does this chart carry Officer energy or is it absent? 
   What happens when this person tries to succeed via the wrong path?
3. The specific domain where this chart's combination produces something genuinely 
   difficult to replicate.
```

## Template 04 — Hidden Bonds

**JSON fields:** `combinations`, `dayMaster`, `elements`

**Prompt:**
```
Write on the structural fusions in this chart. Each combination should be translated into 
a felt pattern in the person's life — not what the combination IS but what it CREATES. 
Focus especially on combinations involving the day pillar.
```

## Template 05 — Core Strengths (Extended)

**JSON fields:** `dayMaster`, `elements` (output family), `tenGods`

**Note:** Section 1 renders static Core Gifts. This is the LLM-generated deeper reading.

**Prompt:**
```
Write 3 paragraphs naming the three genuine capacities this chart carries. Each must be 
traceable to a specific computed element. Not a list — a reading that builds understanding 
of how these capacities work together.
```

## Template 06 — Growing Edge (Extended)

**JSON fields:** `dayMaster.strength`, `elements`, `tenGods`

**Prompt:**
```
Write 3 paragraphs on the specific challenges this chart creates. Each challenge is the 
shadow of a genuine strength. Frame as what is being asked of the person, not what they 
struggle with.
```

## Template 07 — Love & Bonds

**JSON fields:** `dayMaster`, `elements`, `combinations`, `tenGods` (wealth/officer for partner)

**Prompt:**
```
Write 3 paragraphs:
1. How this archetype loves — structurally, not romantically. What does loving as this 
   element look like in practice?
2. The element tension: how does the day master's dominant energy interact with partner 
   energy? What does this create in relationships?
3. What this chart specifically needs from a bond in order for it to feel real.
```

## Template 08 — Work & Calling

**JSON fields:** `pattern`, `dayMaster`, `elements`, `tenGods` (output, seal, wealth)

**Prompt:**
```
Write 3 paragraphs. Do not use career categories — use elemental patterns.
1. How success is structured for this chart. What generates what?
2. The institutional fit. Where does this chart thrive / struggle structurally?
3. The specific intersection where this chart's combination produces irreplaceable work.
```

## Template 09 — Current Life Chapter (Active Luck Pillar)

**JSON fields:** current luck pillar from `luckPillars` (isCurrent: true), `missingElements` (is this decade introducing missing element for first time?)

**Prompt:**
```
Write 3–4 paragraphs:
1. Name what this decade is. What energy has arrived that wasn't present before? If this 
   introduces the missing element for the first time: name this as historically significant.
2. The lived experience. Ground in the specific ten god energy (translated to plain English).
3. The hidden undercurrents — the branch contains multiple energies simultaneously.
4. The invitation: what is this decade asking the reader to become?
```

## Template 10 — This Year

**JSON fields:** `currentFlowYear`, current luck pillar

**Prompt:**
```
Write 3–5 sentences:
- Name the year's energy in plain language.
- How does it interact with the current decade?
- What is the year asking for specifically?
- One clear orienting statement.
```

## Template 11 — Council

**JSON fields:** Full chart synthesis

**Prompt:**
```
Write 4 short paragraphs — one per domain:
1. Work: what the governing pattern asks for right now
2. This decade: the most important practice in this current chapter
3. Relationships: what this chart specifically asks for in how it loves
4. The missing element: what its absence has built, what it now invites
```

## Template 12 — Synthesis

**JSON fields:** Full chart

**Prompt:**
```
Write 3 paragraphs — the last thing the reader reads:
1. The central story. Not a list of traits — a narrative arc.
2. The central tension: what productive conflict is this chart built around?
3. The most important present-moment insight given natal + decade + year.
```

---

# PART 10 — DECADE TEMPLATES [FUTURE]

Each luck pillar gets one reading. Status-specific:
- **Past (isPast: true):** Reflective, past tense. What was being built or endured.
- **Current (isCurrent: true):** Present tense, most detailed. The lived experience of now.
- **Future:** Written as possibility. What conditions this chapter creates.

```
Write the decade reading for the luck pillar: {stem}{branch}, ages {startAge}–{startAge+9}.

Status: {past / current / future}

Write 2–3 paragraphs:
1. {Past}: What was this period doing? {Current}: What has arrived? {Future}: What conditions will this create?
2. The lived texture — ground in the translated ten god energies.
3. {Past}: What did this produce that carries forward? {Current}: The invitation.
   {Future}: What is this decade asking the person to have built to receive what it offers?
```

---

# PART 11 — MASTER SYSTEM PROMPT [FUTURE — for LLM sections]

```
SYSTEM PROMPT — ELEMENTUM READING GENERATOR v3.0

You are the reading engine for Elementum, a spiritual guidance app for Western audiences 
seeking self-understanding through BaZi.

You receive computed chart data as JSON. Write literary, emotionally intelligent readings 
in plain English that feel written by a deeply perceptive mentor who has known the reader 
for years.

CARDINAL RULE: Never use BaZi technical terminology. Not in any form. No Chinese characters.
Not even translated approximations ("your creative output star shows...").

Every technical term must be translated into a felt human experience:
- Yang Metal strength → "precision, directness, a strong inner axis"
- Missing Fire → "operating without an external forge; direction is self-constructed"
- Output-to-wealth pattern → "your creativity is the engine; work must carry your fingerprints"
- Strong self energy → "self-direction that doesn't require external confirmation"
- Seven Killings → "a testing force; something asks: is the work real"
- Direct Officer → "recognition from someone with standing encountering real quality"

VOICE:
- Second person throughout
- Present tense for character; past for past decades; possibility for future
- Wise mentor. Emotionally intelligent friend. Not a therapist. Not a horoscope.
- Name the strength before the shadow. Always.

OUTPUT FORMAT: Return valid JSON only. No preamble.
{
  "sections": {
    "nature":     { "teaser": "2-3 sentences", "body": "paragraph1\n\nparagraph2\n\nparagraph3" },
    "fire":       { "teaser": "...", "body": "..." },
    ...
  }
}
```

---

# PART 12 — REFERENCE CHARTS

## Primary Reference — 庚 Yang Metal, Extremely Strong, Missing Fire

**Birth data:** 1995-04-29, 18:00, Beijing, Male
**Pillars:** 乙亥 庚辰 庚寅 乙酉
**Day Master:** 庚 Yang Metal
**Strength:** extremely_strong → band: concentrated
**Missing:** Fire
**Month branch:** 辰 (Late Spring, neutral temperature → no 调候 override)

**Section 1 outputs:**
- Archetype: The Blade
- Manifesto: "Precision before intention. An edge that was never chosen — only found."
- Teaser: "You don't sharpen your edge. You were born with one — and the question has always been what to cut toward."
- p1 (concentrated): "As a Yang Metal type at concentrated energy, your thinking is evaluative by default — you register what's actually true before others have finished forming their first impression. The specific consequence: you're often several steps ahead of the room, waiting for everyone else to catch up."
- p2 (concentrated): "Your independence is structural, not a preference. You've always found it difficult to sustain effort inside someone else's framework. At this level the drive needs something worthy to push against — without that, the same quality that makes you exceptional becomes restlessness. The question that defines this chapter isn't capability — it's direction."
- Core Gifts (concentrated): Decisive Clarity · Productive Force · Honest Directness
- Growing Edge (concentrated): Combative Certainty · Uniform Force · Closed to Shaping

**Section 2 outputs:**
- Energy condition: Extremely Strong · Concentrated · Channel & Release
- Element bars: Metal 4 ████, Earth 2 ██, Water 2 ██, Wood 1 █, Fire — (absent)
- Dominant: Metal dominates → "precision without flexibility…"
- Catalyst: Fire (forge, purpose), Wood (channel, direction)
- Resistance: Metal (deepens rigidity), Water (cools what needs heat)
- Absent: Fire → "no external forge, direction self-constructed"

**Verification tests:**
1. The combined system (pillars + strength + band) must consistently produce the above outputs
2. Changing only the birth time from 18:00 → 02:00 should change only the Hour Pillar (not Day or Month)
3. A 癸 Yin Water DM born Feb 14, 2023 should produce an open-band profile with fundamentally different gifts and edges from the 庚 concentrated example above

## Secondary Reference — 癸 Yin Water, Weak, Missing Metal and Fire

**Birth data:** 2023-02-14, 04:00, Beijing
**Pillars:** 癸卯 甲寅 癸卯 甲寅
**Day Master:** 癸 Yin Water
**Strength:** weak → band: open
**Missing:** Metal, Fire

---

# PART 13 — VERSION HISTORY

**v3.0 — March 2026 (current)**
Complete rewrite. Removes all outdated D1/D2 specs and the conflicting multi-version Section 2 documentation. Replaces with full accurate description of what is currently implemented. Key changes:
- Part 5 documents Section 1 as it actually renders: pure scroll, no toggles, boxed cards, band-specific gifts/edges with label+desc format
- Part 6 documents Section 2 six-block structure, CalloutCard component, all content tables
- Terminology locked: Your Catalyst / Your Resistance throughout (deprecated: lifts/depletes, What lifts you, What depletes you)
- 调候 override rule documented with season table, override conditions, 庚+Water discrepancy
- All reading prompt templates moved to Parts 9-11 and marked [FUTURE]
- WHO_YOU_ARE documented as bands (concentrated/balanced/open) with p1/p2 structure
- CORE_STRENGTHS/CORE_SHADOWS documented as stem × band × items[] with label+desc format
- Reference chart outputs documented for both sections

**v2.7 — March 2026**
Added D2 six-block structure, Catalyst/Resistance terminology, 调候 override rule.

**v2.6 — March 2026**
Added D2 full spec with energy rating scale, balance approach translations, dominant/missing insight tables, lifts/depletes table.

**v2.0 — Earlier 2026**
Added canonical JSON schema, literary voice rules, model pin, per-section prompt templates.

**v1.0 — Initial**
Calculation engine rules only.

---

*Model pin: Opus 4.6 (production) / claude-sonnet-4-20250514 (dev)*
*Verified against: 穷通宝鉴, 子平真诠, shen88.cn, ebaicha.cn, junzige.com*
*Primary reference chart: 1995-04-29 18:00 Beijing Male → 乙亥 庚辰 庚寅 乙酉 (庚 Yang Metal, extremely strong, missing Fire)*
