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
[stem]_[band]_[tension]_[catalyst]
```

All fields lowercase. Underscore-separated. Used as the exact key into the template object.

| Field | Type | Values |
|---|---|---|
| stem | Chinese character | 甲 乙 丙 丁 戊 己 庚 辛 壬 癸 |
| band | string | concentrated · balanced · open |
| tension | string | pure · rooted · flowing · forging · tested |
| catalyst | string | Metal · Wood · Water · Fire · Earth |

**Example key:** `庚_concentrated_pure_Fire`

### Tension computation

The tension is determined by comparing the dominant non-DM element (highest-scoring element after bond modifiers) to the DM element using the 五行生克 relationships:

| Dominant element relationship to DM | Tension |
|---|---|
| Same element as DM | pure |
| Dominant generates DM (印) | rooted |
| DM generates dominant (食伤) | flowing |
| DM controls dominant (财) | forging |
| Dominant controls DM (官杀) | tested |

If the DM element itself is the highest-scoring element, tension = **pure** (the chart is amplifying itself).

### Catalyst derivation per band

The catalyst (喜用神) is derived from the DM element and energy band following classical 扶抑用神 logic:

| DM Element | Concentrated catalyst | Balanced catalyst | Open catalyst |
|---|---|---|---|
| Metal | Fire, Water | Fire, Earth | Earth, Metal |
| Wood | Metal, Fire | Metal, Water | Water, Wood |
| Water | Earth, Wood | Earth, Metal | Metal, Water |
| Fire | Water, Earth | Water, Wood | Wood, Fire |
| Earth | Wood, Metal | Wood, Fire | Fire, Earth |

**Derivation logic:**
- **Concentrated DM:** Needs drain/control elements — Officer (controls DM), Output (DM generates), Wealth (DM controls)
- **Balanced DM:** Context-dependent — usually the opposing or missing element
- **Open DM:** Needs support — Seal (generates DM) and Parallel (same element)

The first catalyst listed per band is the primary; the second is the secondary (used when the primary is also the dominant element, which creates redundancy).

### Full 300-key taxonomy

The taxonomy covers all 10 stems × 3 bands × 5 tensions × 2 catalysts = 300 compound archetype keys. This covers approximately 95% of all real birth charts. Edge cases (e.g. extreme bond configurations) fall back to the nearest matching key.

**Taxonomy per element (30 keys per element, 60 keys per stem pair):**

#### Metal archetypes (庚 The Blade · 辛 The Jewel)

| Key pattern | Band | Tension | Catalyst | Count |
|---|---|---|---|---|
| [Metal stem]_concentrated_[tension]_Fire | concentrated | all 5 | Fire | 10 |
| [Metal stem]_concentrated_[tension]_Water | concentrated | all 5 | Water | 10 |
| [Metal stem]_balanced_[tension]_Fire | balanced | all 5 | Fire | 10 |
| [Metal stem]_balanced_[tension]_Earth | balanced | all 5 | Earth | 10 |
| [Metal stem]_open_[tension]_Earth | open | all 5 | Earth | 10 |
| [Metal stem]_open_[tension]_Metal | open | all 5 | Metal | 10 |
| **Total Metal** | | | | **60** |

#### Wood archetypes (甲 The Oak · 乙 The Vine)

| Key pattern | Catalyst options |
|---|---|
| concentrated | Metal, Fire |
| balanced | Metal, Water |
| open | Water, Wood |
| **Total Wood** | **60** |

#### Water archetypes (壬 The Ocean · 癸 The Rain)

| Key pattern | Catalyst options |
|---|---|
| concentrated | Earth, Wood |
| balanced | Earth, Metal |
| open | Metal, Water |
| **Total Water** | **60** |

#### Fire archetypes (丙 The Torch · 丁 The Ember)

| Key pattern | Catalyst options |
|---|---|
| concentrated | Water, Earth |
| balanced | Water, Wood |
| open | Wood, Fire |
| **Total Fire** | **60** |

#### Earth archetypes (戊 The Mountain · 己 The Field)

| Key pattern | Catalyst options |
|---|---|
| concentrated | Wood, Metal |
| balanced | Wood, Fire |
| open | Fire, Earth |
| **Total Earth** | **60** |

**Grand total: 300 keys**

### Fallback logic

When a computed key has no template (rare edge case), fall back in this order:

1. Try same stem + same band + same tension + other catalyst for this band
2. Try same stem + same band + neutral tension (pure) + primary catalyst
3. Try same stem + balanced + pure + primary catalyst
4. Final fallback: stem-only default reading (the original 30-template system)

```javascript
function resolveTemplateKey(chart) {
  const stem    = chart.dayMaster.stem;
  const band    = getEnergyBand(chart.dayMaster.strength);
  const tension = computeTension(chart);          // returns pure/rooted/flowing/forging/tested
  const catalyst = getPrimaryCatalyst(chart);     // returns element name
  const primary = `${stem}_${band}_${tension}_${catalyst}`;
  if (TEMPLATE_DB[primary]) return primary;
  // fallback chain...
  return `${stem}_balanced_pure_${CATALYST_MAP[chart.dayMaster.element].balanced[0]}`;
}
```

### Reference chart lookup

Chart: 乙亥 庚辰 庚寅 乙酉 · DM: 庚 Metal · extremely_strong

| Field | Value | Source |
|---|---|---|
| stem | 庚 | Day stem |
| band | concentrated | extremely_strong → concentrated |
| tension | pure | Metal is dominant element (same as DM) |
| catalyst | Fire | Concentrated Metal → Fire (controls, forges) |
| **Lookup key** | **庚_concentrated_pure_Fire** | Combined |

---

## 3A.4 Section 1 Content Structure (Compound Archetype Reading)

Every template in the 300-key library follows this exact structure. Deviation from this structure requires a Bible update before implementation.

### Complete content schema

```javascript
TEMPLATE_DB["庚_concentrated_pure_Fire"] = {
  // ── WHO YOU ARE ─────────────────────────────────────────────────────────
  teaser: String,       // 2–3 sentences. Atmospheric hook. Second person. Italic.
                        // Must make the user feel immediately seen.
                        // No BaZi terminology. No reasoning. Just the portrait.

  p1: String,           // Cognitive portrait. How this person processes the world.
                        // ≤60 words. Present tense. Second person.
                        // Grounded in the specific stem × band × tension combination.

  p2: String,           // Motivational portrait. What drives this person internally.
                        // ≤60 words. Must include the catalyst as aspiration narrative.
                        // Never repeats territory covered in p1.

  // ── CORE GIFTS ───────────────────────────────────────────────────────────
  gifts: [
    { label: String,    // 2–3 word title for the gift
      desc:  String },  // 1–2 sentences. What this gift produces for this person.
    // × 3 items
  ],

  // ── GROWING EDGE ─────────────────────────────────────────────────────────
  edges: [
    { label: String,    // 2–3 word title for the edge
      desc:  String },  // 1–2 sentences. The specific pattern this combination creates.
    // × 2 items
  ],
}
```

### Content rules (non-negotiable)

1. **No BaZi terminology in any text field.** No 比劫, no 印, no 食伤, no 官杀, no 财. These are internal calculation terms only.
2. **No cross-template comparisons.** Never write "unlike a Rooted Blade..." or "where the Pure version..." Each template stands alone.
3. **Tension must be felt, not explained.** The tension word (Pure, Rooted, Flowing, Forging, Tested) is never used in the reading text itself — it is embodied in the description.
4. **Catalyst as aspiration, not deficit.** The missing/needed element is always framed as something moving toward, never as a lack. "Fire is what this chart has been seeking" not "this chart lacks Fire."
5. **Stem × band × tension specificity required.** A reading for 庚_concentrated_pure_Fire must describe something that could not be said of 庚_concentrated_tested_Fire. If the text could apply to any Metal chart, it is not specific enough.
6. **Language register:** Direct, behavioral, second person, present tense. No mystical language. No "the universe," "destiny," "cosmic." Clinical-poetic: precise but felt.

### Reference reading: 庚_concentrated_pure_Fire

```
teaser: "Before you say a word, the room recalibrates. Precision at this
concentration has a quality people sense before it speaks — not a trait you
cultivated, but the structural default of Yang Metal running at full charge.
The edge was already there when you arrived."

p1: "Your processing runs through accuracy before anything else engages. The
assessment happens automatically — before the social read, before the emotional
response, before you've decided to engage at all. Others feel evaluated in your
presence even when you say nothing, because structurally, you are always
evaluating. The precision is not a choice — it is the operating mode."

p2: "What drives you isn't achievement — it's the resolution of what's actually
true. The Pure chart intensifies this: without a counterbalancing force, the
precision turns on whatever is in reach, including yourself. Fire is what this
chart has been seeking before it had a language for it — the force that gives
precision a direction. Without it, the edge is fully formed but unpointed."

gifts: [
  { label: "Signal clarity",
    desc: "When others are confused, your read sharpens. You see what's
    actually happening before it has been named, and you do not mistake
    noise for signal." },
  { label: "Structural durability",
    desc: "What you build holds. You cannot tolerate what does not, which means
    everything you put your name on carries a durability others cannot easily
    replicate." },
  { label: "Precision of completion",
    desc: "You finish what others lose the thread of. Vagueness costs you more
    than most, making your follow-through structural rather than motivational." }
]

edges: [
  { label: "Warmth reads as performance",
    desc: "Without Fire in this chart, precision registers as coldness rather
    than rigor. The same quality that makes you most capable is what makes
    genuine care difficult to offer — and harder for others to feel." },
  { label: "Rigidity under new information",
    desc: "A Pure chart compounds Metal's tendency toward fixed assessment. The
    conclusion already made becomes difficult to revise, even when new evidence
    arrives that should change it." }
]
```

---

## 3A.5 Template Generation Protocol

### When to generate

Generate all 300 templates in a single batch before launch. Do not generate at runtime. Generated templates are static content identical to all other static content in TEMPLATE_DB.

### Generation model

Model: `claude-opus-4-6` (Opus 4.6)  
Estimated cost: $20–25 for full 300-key library  
Estimated time: 15–20 minutes batch  
Input: This Bible section (3A) + the reference reading (庚_concentrated_pure_Fire) as few-shot example  
Output: JSON object conforming to the schema in 3A.4

### Generation prompt structure

```
System: You are generating content for Elementum, a BaZi-based spiritual guidance app.
        You are writing for Western users who have no prior knowledge of BaZi.
        Follow the Bible rules in Part 3A.4 exactly.
        Use the reference reading as your quality standard.

User:   Generate the template for key: [stem]_[band]_[tension]_[catalyst]
        DM: [archetype name] ([element], [polarity])
        Band: [band description from STRENGTH_META]
        Tension: [tension name] — [tension description]
        Catalyst: [element] — [what it means for this DM at this band]
        Output: valid JSON with keys: teaser, p1, p2, gifts (array of 3), edges (array of 2)
```

### Quality gates (applied after generation, before merge)

1. No BaZi terminology present in any string
2. teaser ≤ 3 sentences, p1 ≤ 60 words, p2 ≤ 60 words
3. gifts array has exactly 3 items, edges array has exactly 2 items
4. Catalyst appears in p2 as aspiration narrative
5. Reading does not duplicate the reference reading structure verbatim
6. Tension is embodied (not named or explained in the text)

---

## 3A.6 Engine Integration

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

# PART 4 — TERMINOLOGY (Canonical Elementum Translations)


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
