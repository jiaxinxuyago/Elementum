# 八字分析圣经 v2.0
## BaZi Analysis Bible — Complete Engineering & Prompting Reference

> **What changed in v2:** Added canonical JSON schema (the engine↔LLM contract), literary voice rules and jargon translation table, model pin, and per-section prompt templates for all 12 reading sections and 9 decade chapters.

---

# ARCHITECTURE OVERVIEW

## The Two-Layer Separation (Non-Negotiable)

```
LAYER 1: JavaScript/Python Calculator
  Input:  { birthDate, birthHour, gender, location }
  Output: Canonical JSON Schema (see Section 2)
  Rules:  Pure computation. No LLM. Fully deterministic. Tested.

LAYER 2: LLM Reading Generator
  Input:  Canonical JSON Schema
  Output: Literary English reading sections
  Rules:  Never calculates. Only interprets. Literary voice only.
  Model:  Claude Opus 4.6 (production) / claude-sonnet-4-20250514 (dev/artifacts)
```

**The cardinal rule:** The LLM never sees raw birth data. It never performs any arithmetic. It receives a fully computed, validated JSON object and writes literary interpretation from that. If this separation breaks, the readings will contain calculation errors that undermine trust.

---

# SECTION 1 — CALCULATION ENGINE RULES

*(All rules from v1 preserved. Hard rules = non-negotiable. Soft rules = interpretive guidelines.)*

## RULE 1.1 — Year Pillar [HARD]
- BaZi year begins at 立春 (~Feb 4), NOT January 1st
- If birth date is before 立春, use previous year
- Year Stem Index = (year − 4) mod 10
- Year Branch Index = (year − 4) mod 12
- **Anchor:** 1984 = 甲子, 1995 = 乙亥

## RULE 1.2 — Month Pillar [HARD]
Month boundaries = solar terms, not calendar months.

| Solar Term | ~Date | BaZi Month Branch | 0-Index |
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

## RULE 1.3 — Day Pillar [HARD]
```
daysElapsed = floor((birthDate − 1900-01-01) / 86400000)
Day Stem Index   = daysElapsed mod 10
Day Branch Index = (daysElapsed + 10) mod 12
```

The +10 branch offset is calibrated and non-negotiable.

**Three verification anchors (all must pass):**
| Date | Expected |
|---|---|
| 1995-04-29 | 庚寅 |
| 1984-02-04 | 甲子 |
| 2000-01-01 | 庚辰 |

## RULE 1.4 — Hour Pillar [HARD]
```
Hour Branch Index = floor((hour + 1) / 2) mod 12
```
Note: BaZi day starts at 23:00, not midnight.

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

## RULE 1.5 — True Solar Time [SOFT]
```
Correction (hours) = (longitude − 120) / 15
True Solar Hour = local hour − correction
```
Apply before hour pillar calculation when birth location is specified.

## RULE 1.6 — Luck Pillar Direction & Starting Age [HARD]
```
Direction:
  Male + Yin year OR Female + Yang year → Backward (逆行)
  Male + Yang year OR Female + Yin year → Forward (顺行)

Starting age = round(daysToNearestSolarTerm / 3), minimum 1
Each pillar lasts 10 years.
```

## RULE 1.7 — Ten God Calculation [HARD]
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

Polarity: Yang = 甲丙戊庚壬  Yin = 乙丁己辛癸
```

## RULE 1.8 — Day Master Strength Assessment [HARD]

This rule defines exactly how the engine scores Day Master strength. It produces a numeric ratio and maps it to one of five labels. **The strength label is the single most important variable in the reading** — it determines the Useful God, the correct interpretation of every luck pillar and flow year, and the paywall content structure.

### 1.8.1 — The Engine Formula (Current Implementation)

The engine uses a simplified two-factor formula for deterministic, consistent results:

```
Step 1: Count positions by element across all 8 chart positions
        (4 heavenly stems + 4 earthly branch main qi)
        Each position = 1 count. Weight: equal.

Step 2: Identify support factors for the Day Master element:
        - Same element as DM      → supportive (×1.2 bonus)
        - Parent element of DM    → supportive (×1.0)
        - All other elements      → ignored in score

        Generation chain (parent → child):
        Wood→Fire→Earth→Metal→Water→Wood
        Parent of Water = Metal
        Parent of Metal = Earth
        Parent of Earth = Fire
        Parent of Fire  = Wood
        Parent of Wood  = Water

Step 3: Calculate support score and ratio
        supportScore = (count[dmElement] × 1.2) + count[parentElement]
        ratio        = supportScore / 8
        (8 = maximum possible positions in an 8-character chart)

Step 4: Map ratio to strength label
        ratio > 0.70  → extremely_strong
        ratio > 0.50  → strong
        ratio > 0.35  → moderate
        ratio > 0.20  → weak
        ratio ≤ 0.20  → extremely_weak
```

### 1.8.2 — Worked Example: 癸 Water Day Master, Feb 14 2023, 4:00am Beijing

Reference chart: 癸卯 甲寅 癸卯 甲寅

```
Pillar breakdown:
  Year  癸卯  → stem: Water (+1),  branch: Wood (+1)
  Month 甲寅  → stem: Wood  (+1),  branch: Wood (+1)
  Day   癸卯  → stem: Water (+1),  branch: Wood (+1)
  Hour  甲寅  → stem: Wood  (+1),  branch: Wood (+1)

Element totals:
  Water = 2   (Year stem + Day stem)
  Wood  = 6   (Month stem, Hour stem, all 4 branches)
  Metal = 0
  Fire  = 0
  Earth = 0

For 癸 Water:
  DM element  = Water  → count = 2
  Parent      = Metal  → count = 0   (Metal generates Water)

supportScore = (2 × 1.2) + 0 = 2.4
ratio        = 2.4 / 8 = 0.30

0.20 < 0.30 ≤ 0.35  →  strength = "weak"

Missing elements: Fire, Earth
```

**Interpretation:** The two Water stems are severely outnumbered by six Wood positions. Wood drains Water (Water generates Wood), so the Day Master is giving away energy with nothing coming back. Metal — the one element that would generate Water — is entirely absent. This produces genuine weakness: the 癸 Rain energy is real but highly context-dependent, emerging fully only in the right conditions.

### 1.8.3 — Strength Threshold Calibration Table

| Ratio range | Label | Strength ring % | Felt quality |
|---|---|---|---|
| > 0.70 | extremely_strong | 92% | Dominant, self-directed, largely immune to external reshaping |
| 0.51–0.70 | strong | 72% | Well-supported, confident in direction, bears weight |
| 0.36–0.50 | moderate | 50% | Balanced, flexible, works across many conditions |
| 0.21–0.35 | weak | 30% | Receptive, needs the right conditions to come through fully |
| ≤ 0.20 | extremely_weak | 12% | Highly context-dependent, finds strength through support |

### 1.8.4 — What the Engine Simplifies vs Classical Method

The engine formula is intentionally simplified for deterministic output. Three classical factors are not yet implemented:

| Factor | Classical weight | Engine implementation | Impact |
|---|---|---|---|
| **月令 Month branch** | Primary weight — the month branch carries the most authority of any single position | Counted equally as 1 position | Can misclassify edge cases where month branch tips the balance |
| **藏干 Hidden stems** | Each branch hides 1–3 stems at fractional weights: main=0.7, secondary=0.5, tertiary=0.3 | Not counted | Underestimates element counts by ~20–40% for complex branches |
| **合化 Combinations** | Active stem/branch combinations transform element counts before scoring | Not applied | Can produce wrong element totals when transformations are active |

**Hidden stem reference table (for future implementation):**

| Branch | Main stem (0.7) | Secondary (0.5) | Tertiary (0.3) |
|---|---|---|---|
| 子 | 壬 Water | — | — |
| 丑 | 己 Earth | 癸 Water | 辛 Metal |
| 寅 | 甲 Wood | 丙 Fire | 戊 Earth |
| 卯 | 乙 Wood | — | — |
| 辰 | 戊 Earth | 乙 Wood | 癸 Water |
| 巳 | 丙 Fire | 庚 Metal | 戊 Earth |
| 午 | 丁 Fire | 己 Earth | — |
| 未 | 己 Earth | 丁 Fire | 乙 Wood |
| 申 | 庚 Metal | 壬 Water | 戊 Earth |
| 酉 | 辛 Metal | — | — |
| 戌 | 戊 Earth | 丁 Fire | 辛 Metal |
| 亥 | 壬 Water | 甲 Wood | — |

**For the Feb 14 2023 reference chart:** Adding hidden stems from 卯 (乙 Wood ×0.7) and 寅 (甲 Wood ×0.7, 丙 Fire ×0.5, 戊 Earth ×0.3) would not change the weak verdict — Fire and Earth would appear but in small fractional amounts, and Wood would grow even larger, further draining the Water DM. The simplified engine gives the correct result here. The gap matters most in charts that are near a threshold boundary.

### 1.8.5 — Strength and the Useful God (用神)

Once strength is determined, the Useful God follows a fixed rule:

```
Extremely strong / Strong DM:
  Primary 用神:    Wealth (财) — controls the excess DM energy
  Secondary 用神:  Officer (官杀) — also controls/directs
  Or:              Output (食伤) — channels energy outward
  AVOID:           Seal (印) and Parallel (比劫) — adds more to an already full cup

Moderate DM:
  Context-dependent — maintain balance, avoid extremes

Weak / Extremely weak DM:
  Primary 用神:    Seal (印) — generates/supports the DM
  Secondary 用神:  Parallel (比劫) — peers that share the load
  AVOID:           Wealth (财), Officer (官杀), Output (食伤) — all drain the DM

[CRITICAL RULE] Never strengthen an already strong element.
               Never further weaken an already weak element.
               The 用神 is always about restoring balance.
```

### 1.8.6 — Strength in the Reading

The `strength` field in the canonical JSON schema is used by the LLM in two ways:

1. **Directly in the Day Master Profile (Deliverable 3):** The strength ring visual fills proportionally. The strength label and sublabel are rendered in the UI from the `STRENGTH_RING` table in the engine. The profile text is selected from the `buildDayMasterProfile()` function using the strength key.

2. **As context for every reading section:** The LLM receives `dayMaster.strength` in the canonical JSON and uses it to calibrate the interpretation — a weak Water DM reading sounds fundamentally different from a strong one even if the archetype (The Rain) is the same. The strength determines which conditions are favorable, which life domains are challenging, and what the appropriate guidance is for each section.

---

# SECTION 2 — CANONICAL JSON SCHEMA (Engine↔LLM Contract)

This schema is the locked interface between Layer 1 and Layer 2. The calculator always outputs this structure. The LLM always receives this structure. **Never pass raw birth data to the LLM.**

```json
{
  "meta": {
    "birthDate": "1995-04-29",
    "birthHour": 18,
    "location": "Beijing",
    "gender": "male",
    "calculatedAt": "2026-03-16"
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
    "archetype": "Yang Metal",
    "strength": "extremely_strong",
    "strengthScore": 0.91
  },
  "elements": {
    "Metal": { "count": 5, "dominant": true,  "present": true  },
    "Wood":  { "count": 4, "dominant": false, "present": true  },
    "Earth": { "count": 2, "dominant": false, "present": true  },
    "Water": { "count": 1, "dominant": false, "present": true  },
    "Fire":  { "count": 0, "dominant": false, "present": false }
  },
  "missingElements": ["Fire"],
  "tenGods": {
    "yearStem":    { "name": "正财", "en": "Direct Wealth",   "family": "wealth",  "polarity": "direct"   },
    "yearBranch":  { "name": "食神", "en": "Food God",        "family": "output",  "polarity": "indirect" },
    "monthStem":   { "name": "比肩", "en": "Parallel Self",   "family": "rob",     "polarity": "indirect" },
    "monthBranch": { "name": "偏印", "en": "Indirect Seal",   "family": "seal",    "polarity": "indirect" },
    "dayStem":     { "name": "日主", "en": "Day Master",      "family": "self",    "polarity": null        },
    "dayBranch":   { "name": "偏财", "en": "Indirect Wealth", "family": "wealth",  "polarity": "indirect" },
    "hourStem":    { "name": "正财", "en": "Direct Wealth",   "family": "wealth",  "polarity": "direct"   },
    "hourBranch":  { "name": "劫财", "en": "Rob Wealth",      "family": "rob",     "polarity": "direct"   }
  },
  "combinations": [
    { "type": "stemBond",   "elements": ["乙","庚"], "positions": ["yearStem","monthStem"],    "resultElement": "Metal", "activates": true, "name": "乙庚合" },
    { "type": "stemBond",   "elements": ["乙","庚"], "positions": ["hourStem","dayStem"],      "resultElement": "Metal", "activates": true, "name": "乙庚合" },
    { "type": "branchBond", "elements": ["寅","亥"], "positions": ["dayBranch","yearBranch"],  "resultElement": "Wood",  "activates": true, "name": "寅亥合" },
    { "type": "branchBond", "elements": ["辰","酉"], "positions": ["monthBranch","hourBranch"],"resultElement": "Metal", "activates": true, "name": "辰酉合" }
  ],
  "pattern": {
    "name": "食神生财格",
    "en": "Food God Generates Wealth",
    "family": "output_to_wealth",
    "description": "Talent and creative output are the primary path to wealth and success"
  },
  "luckPillars": [
    { "order": 1, "stem": "己", "branch": "卯", "startAge": 8,  "startYear": 2003, "endYear": 2012, "element": "Earth", "stemTenGod": "偏印", "branchTenGod": "正财", "isCurrent": false, "isPast": true  },
    { "order": 2, "stem": "戊", "branch": "寅", "startAge": 18, "startYear": 2013, "endYear": 2022, "element": "Earth", "stemTenGod": "偏印", "branchTenGod": "偏财", "isCurrent": false, "isPast": true  },
    { "order": 3, "stem": "丁", "branch": "丑", "startAge": 28, "startYear": 2023, "endYear": 2032, "element": "Fire",  "stemTenGod": "正官", "branchTenGod": "偏印", "isCurrent": true,  "isPast": false },
    { "order": 4, "stem": "丙", "branch": "子", "startAge": 38, "startYear": 2033, "endYear": 2042, "element": "Fire",  "stemTenGod": "七杀", "branchTenGod": "食神", "isCurrent": false, "isPast": false },
    { "order": 5, "stem": "乙", "branch": "亥", "startAge": 48, "startYear": 2043, "endYear": 2052, "element": "Wood",  "stemTenGod": "正财", "branchTenGod": "食神", "isCurrent": false, "isPast": false },
    { "order": 6, "stem": "甲", "branch": "戌", "startAge": 58, "startYear": 2053, "endYear": 2062, "element": "Wood",  "stemTenGod": "偏财", "branchTenGod": "偏印", "isCurrent": false, "isPast": false },
    { "order": 7, "stem": "癸", "branch": "酉", "startAge": 68, "startYear": 2063, "endYear": 2072, "element": "Water", "stemTenGod": "伤官", "branchTenGod": "劫财", "isCurrent": false, "isPast": false },
    { "order": 8, "stem": "壬", "branch": "申", "startAge": 78, "startYear": 2073, "endYear": 2082, "element": "Water", "stemTenGod": "食神", "branchTenGod": "比肩", "isCurrent": false, "isPast": false },
    { "order": 9, "stem": "辛", "branch": "未", "startAge": 88, "startYear": 2083, "endYear": 2092, "element": "Metal", "stemTenGod": "劫财", "branchTenGod": "偏财", "isCurrent": false, "isPast": false }
  ],
  "currentFlowYear": {
    "year": 2026, "stem": "丙", "branch": "午",
    "stemElement": "Fire", "branchElement": "Fire",
    "stemTenGod": "七杀", "branchTenGod": "正官"
  },
  "currentFlowMonth": {
    "stem": "辛", "branch": "卯",
    "stemTenGod": "劫财", "branchTenGod": "正财"
  }
}
```

---

# SECTION 3 — LITERARY VOICE RULES [NEW in v2]

## 3.1 The Jargon-Free Principle

**All BaZi technical terms are engine inputs only. They never appear in reading output.**

The LLM's job is to translate computed relationships into felt human experience. A user should be able to read their entire reading without encountering a single piece of Chinese metaphysics terminology. The system handles the astrology. The reading delivers the meaning.

**Why this matters:** The Western audience for this product is not seeking to learn BaZi — they are seeking self-understanding. Technical jargon creates distance and shifts the experience from personal revelation to academic instruction. The goal is the opposite: make every sentence feel written specifically for the person reading it.

## 3.2 The Literary Translation Table

This table is the engine's semantic translation layer. Use the right column in all reading output.

| Technical Input | Literary Output |
|---|---|
| **Day Master = Yang Metal, extremely strong** | "You have an unusually stable core. Most people drift toward what others think. You don't. Your sense of what is true arrives before the conversation does." |
| **Day Master = Yin Metal** | "You notice things others miss. There's a precision in how you see the world — not cutting, but discerning. The jewel doesn't announce itself." |
| **Day Master = Yang Wood** | "There's a reach in you that doesn't switch off. You were built to grow toward something, and the something keeps expanding." |
| **Day Master = Yin Wood** | "Flexible doesn't mean weak. You've survived things that would have broken more rigid people, because you know how to bend without losing your roots." |
| **Day Master = Yang Fire** | "People feel something when you enter a room. You radiate a quality — warmth, intensity, presence — that isn't performed. It just is." |
| **Day Master = Yin Fire** | "Your attention is one of the most valuable things you possess. When you focus on something, you illuminate it in ways others simply can't." |
| **Day Master = Yang Earth** | "Reliability is not your performance. It's your structure. People build things on you because you hold." |
| **Day Master = Yin Earth** | "You grow things. People, ideas, relationships — in your presence, things become more than they were." |
| **Day Master = Yang Water** | "Your depth is not always visible from the surface. But it's there, and it's vast. You've been thinking about things for a long time." |
| **Day Master = Yin Water** | "You nourish quietly. The gentleness is not absence of power — it's a different kind of power, one that works over time and leaves things greener than before." |
| **Missing Fire / no Officer stars** | "The part of you that gets shaped by external authority — it was born quiet. You've never been easily molded by institutions or conventional structures. This isn't rebellion. It's architecture." |
| **Strong self energy (比劫 dominant)** | "Your self-direction is structural, not chosen. You have a strong inner axis that doesn't require external confirmation to feel real." |
| **Food God pattern / output generates wealth** | "Your creativity is your financial engine. The more directly your work carries your fingerprints, the more naturally success follows. Intermediaries dilute something essential." |
| **Wealth stars present and bonded** | "What you're drawn to tends to bond with you. Wealth — in the fullest sense — arrives through genuine engagement, not transaction." |
| **Missing wealth stars** | "Money has been a more complicated relationship for you than it is for some people. Not because you can't create it, but because the conventional paths to it don't quite fit your design." |
| **Strong creative output energy (食伤)** | "There is a genuine expressive force in you. The need to make things, articulate things, build things — it isn't optional. It's structural." |
| **Indirect Seal (specialized skills)** | "You have real depth in unusual places. The knowledge you carry doesn't always fit standard categories, and that's precisely what makes it valuable." |
| **Double stem bond (乙庚合×2)** | "There's a rare double bond in your chart between your creative/partner energy and your core self. What you love tends to become part of you. Not metaphorically — structurally." |
| **Branch bonds (寅亥合, 辰酉合)** | "Hidden beneath the surface of this chart, pairs of energies are quietly combining — deepening your resources and stabilizing things that appear uncertain." |
| **Current decade brings first fire** | "The decade you're in now is the first time in your life that an external force with real leverage over your direction has arrived. This is the forge. It was always meant to come." |
| **Seven Killings in flow year** | "This year brings a testing force. Something external will press on you and ask: is the edge real? Is the work real? Are you what you say you are?" |
| **Direct Officer in flow year** | "This year carries the possibility of genuine recognition — not performance-based praise, but the kind that arrives when someone with standing encounters the real quality of what you've built." |
| **Indirect Wealth in luck pillar** | "This chapter of your life opens entrepreneurial pathways — the kind where what you build has your name genuinely on it." |
| **Seal energy dominant in decade** | "This period favors going deep rather than going wide. The expertise you build during this chapter will be the foundation everything else rests on." |
| **Hurt Officer in later decade** | "The unconventional voice — the one that breaks form because the form isn't adequate — arrives in this chapter. What arrives late, arrives fully formed." |

## 3.3 Voice Specifications

**Person:** Second person ("you", "your") throughout. Never third person.

**Tense:** Present tense for nature/character readings. Past tense allowed only for reflecting on past decades. Future tense for future decades, written as possibility not certainty.

**Register:** Wise mentor, not therapist. Emotionally intelligent friend, not horoscope app. The difference: a therapist reflects back what you say. A wise mentor tells you something true that you already suspected but hadn't fully articulated.

**Validation sequence:** Lead with what is genuinely true and affirming before naming what is hard. This isn't flattery — it's sequence. Name the strength, then name the shadow of the strength. The reader needs to feel seen before they can hear the challenge.

**Forbidden patterns:**
- Generic affirmations: "You are destined for greatness," "Your potential is limitless"
- Vague positives: "You are sensitive and creative" (without grounding in chart specifics)
- Mystical obfuscation: "The cosmic energies align to..." 
- Jargon in disguise: "Your creative output star" (still jargon)
- False precision: "On March 14th you will..." (the chart doesn't work this way)
- Catastrophizing: "You will face great difficulty..." (reframe as what is asked of you)

**Required patterns:**
- Chart specificity: Every claim must trace back to a specific computed data point
- Honest complexity: Name both the gift and its shadow
- Practical orientation: What does this mean for how I live? Always land here.
- The person's agency: The chart describes weather, not fate

## 3.4 Section Length Guidelines

| Section | Teaser | Body |
|---|---|---|
| Core sections (Nature, Fire, Path, Bonds) | 2–3 sentences | 3–4 paragraphs |
| Personal sections (Strengths, Challenges, Love, Career) | 1–2 sentences | 3 paragraphs |
| Temporal sections (Chapter, Year, Council, Synthesis) | 2–3 sentences | 3–4 paragraphs |
| Decade readings | 2 sentences | 2–3 paragraphs |
| Flow period readings (Year/Month/Day) | N/A | 3–5 sentences |

---

# SECTION 4 — MODEL PIN [NEW in v2]

## 4.1 Model Assignment

| Task | Model | Reason |
|---|---|---|
| Reading generation (production) | Claude Opus 4.6 | Prose quality, emotional precision, resistance to generic output |
| Reading generation (dev/artifacts) | claude-sonnet-4-20250514 | Same architecture, sufficient for development |
| UI/code generation | claude-sonnet-4-20250514 | Iterative loop, cost-efficient, handles JSX well |
| Calculation engine | No LLM | Pure JS/Python. Non-negotiable. |

## 4.2 Why Opus for Readings

The reading is the product. Users are paying for the quality of language they receive about their lives. Opus produces:
- More precise emotional vocabulary
- Better paragraph-to-paragraph transitions
- Stronger resistance to defaulting to generic affirmations under prompt pressure
- More specific metaphor generation (the literary translation is richer)

Do not optimize this layer for cost until you have validated that the cheaper model matches the quality bar. The quality bar is the sample output in this Bible's Appendix.

## 4.3 API Call Structure

```javascript
// Production reading generation
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "claude-opus-4-6",        // Production
    // model: "claude-sonnet-4-20250514",  // Dev/artifacts
    max_tokens: 1000,
    system: READING_SYSTEM_PROMPT,   // See Section 6
    messages: [{
      role: "user",
      content: JSON.stringify(computedChartJSON)  // Section 2 schema
    }]
  })
});
```

---

# SECTION 5 — THE 12 READING SECTION PROMPT TEMPLATES [NEW in v2]

Each template specifies: which JSON fields to draw from, the angle of the section, the opening move, and the forbidden/required patterns specific to that section.

---

## TEMPLATE 01 — Who You Are (Nature)

**JSON fields to use:** `dayMaster.element`, `dayMaster.polarity`, `dayMaster.strength`, `elements` (dominant element), `combinations` (if day master is involved)

**Angle:** This is the reader's first mirror. It names what is already true about them — something they know but may not have heard stated this clearly. Start with the felt quality of this person's presence, then explain the structure behind it.

**Opening move:** Begin with what other people experience when they encounter this person, before moving to what the person experiences from the inside.

**Section-specific rules:**
- The element archetype should be vivid and specific (a working blade, not a ceremonial one; a river, not "water energy")
- Address both the gift and the friction this core creates in the world
- End with: what this means for where this person is most alive

**Forbidden for this section:**
- Starting with a definition ("Yang Metal is...")
- Element-generic statements that could apply to anyone with this element
- Failing to address the specific strength score (极旺 is categorically different from 旺)

**Prompt:**
```
Using the computed chart data, write the "Who You Are" section.

Draw from: dayMaster element/polarity/strength, dominant elements, any combinations involving the day pillar.

Write 3 paragraphs:
1. Open with the felt quality of this person's presence and how others experience them. Make it specific to this chart's strength reading. Translate the element archetype into a vivid, non-technical image.
2. How does the element's dominance shape personality from the inside? What does this person experience that others don't understand about them? Address the specific strength level — extremely strong is categorically different from moderately strong.
3. What friction has this core created? What freedom has it created? Where is this person most alive? Land on something practical.

Voice: You are writing to the person, not about them. Second person. Present tense. Mentor tone.
No BaZi terminology. No generic element descriptions. Every claim traceable to specific chart data.
```

---

## TEMPLATE 02 — The Missing Element

**JSON fields to use:** `missingElements`, `dayMaster.element` (to explain why that specific missing element matters), `luckPillars` (to identify when it first arrives), current decade data

**Angle:** This is not a deficit reading. It is a structural story — why something is absent, what that absence has created, and when it arrives. The emotional register is: "this explains so much."

**Opening move:** State the missing element fact directly, then immediately reframe: this isn't a gap, it's a defining architectural feature of how this person's life works.

**Section-specific rules:**
- The explanation of WHY that specific element matters must be tied to the day master's element (e.g., Fire tempers Metal; Water feeds Wood)
- The absence must be connected to real observed patterns in the person's life (operating outside institutions, self-directing, etc.)
- The arrival of the missing element in the current or upcoming decade must be identified and named as meaningful

**Forbidden for this section:**
- Treating absence as deficiency
- Generic "you lack X" statements without explaining the life pattern this creates
- Missing the opportunity to connect the missing element to the current decade's fire arrival

**Prompt:**
```
Using the computed chart data, write the "Missing Element" section.

Draw from: missingElements array, dayMaster element (to explain the specific relationship), current luck pillar (to identify when missing element first arrives).

Write 3–4 paragraphs:
1. State what is missing. Immediately reframe: this is not a deficiency, it is architecture. What does this absence create in how this person moves through life?
2. Translate the technical relationship between the day master and the missing element into lived experience. The ancient teaching connects these two elements — what does that mean in plain human terms? What has this person been without?
3. Identify when the missing element first arrives (which decade). This is the story turning: the forge arrives late, but it arrives. Frame this as the natural arc of the life, not a cosmic correction.
4. (Optional) What is the invitation of this absence — what has it required this person to develop that they might not have developed if the missing element had been present all along?

Voice: This section should feel like someone finally articulating a pattern the reader has always sensed but couldn't name. Validating, not fixing.
No BaZi terminology. Translate "Officer stars" as "external authority" or "the force that shapes from outside."
```

---

## TEMPLATE 03 — Your Path (Governing Pattern)

**JSON fields to use:** `pattern.en`, `pattern.family`, `pattern.description`, `tenGods` (to identify output and wealth stars), `dayMaster.strength`

**Angle:** This is the career and success blueprint. It answers: what is the most natural architecture of success for this specific chart? The governing pattern is the answer.

**Opening move:** Name the pattern in plain English before any explanation. "Your path to success runs directly through what you make." Then explain why.

**Section-specific rules:**
- The output_to_wealth pattern means creativity/output precedes wealth — explain the causal chain in plain language
- Name the shadow: what happens when this person tries to succeed via a misaligned path (climbing institutional ladders, etc.)
- End with the specific intersection where this pattern thrives: not just "creative work" but the specific combination this chart suggests

**Forbidden for this section:**
- Naming the pattern in Chinese ("食神生财格")
- Vague statements like "you are creative and will be wealthy"
- Missing the specific causal chain (output GENERATES wealth, not "creative people are often successful")

**Prompt:**
```
Using the computed chart data, write the "Your Path" section about the governing success pattern.

Draw from: pattern description, output stars (food/creative energy in chart), wealth stars, dayMaster strength.

Write 3 paragraphs:
1. State the governing success pattern in one clear sentence. Then explain the causal chain: what generates what, in what order, and why this is the natural architecture for this person. Use the literary translation table — no jargon.
2. Name the shadow pattern: what happens when this person tries to succeed via a path that doesn't match this architecture? What is lost, what feels wrong, why it never quite works even when it "succeeds" technically.
3. Be specific about where this pattern thrives. Not just "creative work" but the specific intersection of elements in this chart: what combination of creative vision + technical depth + independence does this chart describe? Name the domains where this is most powerful.

Voice: This section should feel revelatory — "this is why that other approach never felt right." Confident, not tentative.
No BaZi jargon. Translate "output star" as the creative impulse, "wealth star" as financial/relationship abundance.
```

---

## TEMPLATE 04 — The Rare Bond

**JSON fields to use:** `combinations` (type, elements, positions, resultElement, activates), `pillars` (to understand which life domains are involved)

**Angle:** This section covers active combinations and what they create in the person's life. Focus on the most significant (double bonds, triple bonds) and translate each into a relationship/identity pattern.

**Opening move:** Lead with what is unusual or rare about this chart's combinations, if anything. If there's a double bond, name that it's rare before explaining it.

**Section-specific rules:**
- Each combination must be translated into a life pattern, not just a technical observation
- Double stem bonds are identity-fusion events: what you love becomes part of you
- Branch bonds are hidden stability: things are more rooted than they appear
- The bond between the creative element and the self (as in 乙庚合) has specific relationship implications to explore

**Forbidden for this section:**
- Listing combinations technically without translating to lived experience
- Missing the relationship/love implications of bonds involving wealth stars
- "Your stems combine to form..." (still too technical)

**Prompt:**
```
Using the computed chart data, write the "Rare Bond" section about active combinations in the chart.

Draw from: combinations array — note type (stemBond vs branchBond), which pillars are involved, what element results.

Write 2–3 paragraphs based on what combinations are present:
1. For the most significant combination(s): translate into a life pattern. What does this bond create in how this person moves through the world? Focus on identity, creativity, and relationships — the domains most affected by bonds between creative/partner energy and the core self.
2. For secondary bonds: what do these hidden connections stabilize? What appears uncertain on the surface but is more rooted than it looks?
3. (If double bond present) The rarity of a double bond of the same type deserves specific attention: what does it mean that this fusion happens twice over? What is the reader being asked to understand about the depth of how they bond?

Voice: This section should feel like uncovering something hidden — a deep structural truth about how this person loves and creates. Revelatory, intimate.
No Chinese characters or technical terms. "Combinations" can be referred to as "bonds" or "fusions."
```

---

## TEMPLATE 05 — Strengths

**JSON fields to use:** `dayMaster`, `elements` (dominant), `tenGods` (output family = creative gifts, seal family = knowledge depth, wealth family = relationship/financial pull), `combinations`

**Angle:** This is a confirmation, not a discovery. The reader already senses these things are true. The job is to name them precisely enough that they feel unmistakably seen.

**Opening move:** "Let's name what you actually carry" — framing this as confirmation, not revelation. These are already present, not aspirational.

**Section-specific rules:**
- Minimum 3 genuine strengths, each grounded in a specific chart element
- Each strength named with its shadow or condition (the precision is also what creates friction)
- Ground every strength in the specific configuration, not generic element descriptions
- The output family in the chart = creative/expressive gifts; the seal family = learning depth; the self family = independence/will

**Forbidden for this section:**
- Generic compliments that could apply to any chart
- Listing traits without chart evidence
- Missing the "but" — every strength has a corresponding shadow that makes it real

**Prompt:**
```
Using the computed chart data, write the Strengths section.

Draw from: dayMaster element/strength, dominant elements, any output stars (creative/expressive gifts), any seal stars (knowledge depth), strong self energy (independence), combinations that amplify these.

Write 3 paragraphs, one per genuine strength:
Each paragraph: Name the strength with specificity. Ground it in the specific chart configuration (not generic). Name its shadow or condition — this is what makes it real, not flattery. End with: where this strength is most powerful in practice.

The three strengths to prioritize for this chart (adapt for any chart):
1. Perceptual/analytical precision (from strong self energy)
2. Creative/expressive depth (from output stars with roots)
3. Specialized learning capacity (from seal stars near the day master)

Voice: Confident, specific, matter-of-fact. Not effusive. These are structural facts, not praise.
```

---

## TEMPLATE 06 — Challenges

**JSON fields to use:** `dayMaster.strength` (if extremely strong → resistance to authority), `missingElements` (missing Officer = no external discipline structure), `tenGods` (strong self/rob energy → independence can isolate), `combinations` (deep bonds → difficulty releasing)

**Angle:** The shadow of every strength. Frame challenges as structural features, not character flaws. The reader should recognize these patterns immediately and feel that naming them honestly is an act of respect, not criticism.

**Opening move:** "Every gift has a shadow. Understanding yours isn't self-criticism — it's not being surprised by your own patterns."

**Section-specific rules:**
- Lead with what creates the challenge structurally (the chart configuration), not the behavior
- Frame in neutral terms: "this creates" not "you struggle with"
- End each challenge with: what the chart asks of you here (the invitation, not the verdict)

**Forbidden for this section:**
- Soft-pedaling real difficulties to avoid discomfort
- Framing challenges as fatal flaws
- Missing the chart-specific cause for each challenge

**Prompt:**
```
Using the computed chart data, write the Challenges section.

Draw from: dayMaster strength (extremely strong → difficulty with external authority), missing elements (missing Officer = self-generated discipline only), strong self energy (independence that can become isolation), deep bonds (difficulty releasing what you've bonded to).

Write 3 paragraphs, one per structural challenge:
Each paragraph: Name what creates the challenge (the chart configuration, translated to plain English). Describe what this looks like in lived experience — specifically enough that the reader recognizes it. End with the invitation: what this pattern is asking the reader to develop or choose differently.

The three challenges to address for this chart (adapt for any chart):
1. The resistance to external authority (from absent Officer + strong self energy)
2. The dependence on inner conviction for discipline (from missing fire)
3. The depth of bonding and difficulty releasing (from double bond structure)

Voice: Honest, respectful, not apologetic. Name what is real. Trust the reader.
```

---

## TEMPLATE 07 — Your Heart (Love & Relationships)

**JSON fields to use:** `tenGods` (wealth stars for male = partner energy; Officer stars for female = partner energy), `dayBranch` element and ten god, `combinations` (bonds involving wealth/partner stars), `dayMaster.strength` relative to partner element

**Angle:** This is the most intimate section. It should feel like the truest thing anyone has ever said about how this person loves. Lead with the depth, not the difficulty.

**Opening move:** Begin with what is genuinely beautiful about how this person loves before naming the complexity.

**Section-specific rules:**
- For male chart: direct wealth star is the partner energy; translate into partnership qualities
- Identify the element tension between the day master and partner element (e.g., Metal dominant over Wood = natural tendency to lead/dominate in partnerships)
- The day branch (home/spouse domain) gives specific information about what this person needs in a partner
- End with: what the most fulfilling version of love looks like for this specific chart

**Forbidden for this section:**
- Generic relationship advice
- Missing the element tension between DM and partner star
- Framing dominance tendency as simply negative without naming the positive version

**Prompt:**
```
Using the computed chart data, write the Love and Relationships section.

Draw from: wealth stars (male chart partner energy) or Officer stars (female chart partner energy), day branch element and its ten god, any combinations involving partner stars, the strength ratio between day master and partner element.

Write 3 paragraphs:
1. What is genuinely true and beautiful about how this person loves? Lead with the depth, the seriousness, the quality of attention they bring to relationships. Ground this in the partner star configuration.
2. The element tension: how does the day master's dominant energy interact with the partner energy? Is there a natural tendency to lead, to merge, to maintain distance? What does this create in relationships? Frame honestly but not as a flaw.
3. What does the most fulfilling version of love look like for this specific chart? What qualities in a partner would actually complement rather than be overwhelmed by this energy? Be specific about the day branch's qualities.

Voice: Intimate, honest, caring. This section should feel like the truest thing anyone has said about how this person loves.
```

---

## TEMPLATE 08 — Career & Work

**JSON fields to use:** `pattern` (governing success pattern), `tenGods` (presence/absence of Officer stars = relationship to institutions), `dayMaster.element` and `strength`, output stars, seal stars

**Angle:** The work blueprint. What does success look like, structurally, for this person? Where does the natural path run? What path leads to attrition even when it "succeeds"?

**Opening move:** Start with the clearest statement of how success works for this chart before explaining the institutional dimension.

**Section-specific rules:**
- The output→wealth pattern has specific implications: work must carry the fingerprints of the person doing it
- Absence of Officer stars = not built for long-term institutional comfort (this is structural, not character)
- The seal energy near the day master = specific depth-learning capacity that creates differentiation
- End with: the specific type of work this chart describes (intersection of creative + technical + independent)

**Forbidden for this section:**
- Vague encouragement ("follow your passion")
- Missing the institutional structure point (no Officer = not built for it)
- Generic "creative person" descriptions without chart-specific technical depth

**Prompt:**
```
Using the computed chart data, write the Career and Work section.

Draw from: governing pattern (output_to_wealth = work must be directly attributed), Officer star presence/absence (institutional comfort level), output star strength (creative capacity), seal stars near day master (specialized learning), day master strength (independence and direction).

Write 3 paragraphs:
1. The clearest statement of how success works for this chart. What generates what? What is the causal chain from this person's natural gifts to financial and meaningful success? Be specific — not "creative work" but what combination of vision, technical depth, and independence this chart describes.
2. The institutional dimension. Does this chart carry Officer energy (comfortable with hierarchy, thrives within structures) or is it absent (operates best with independence)? What happens when this person tries to succeed via the other path?
3. The specific type of work. Based on the combination of day master element, dominant elements, output stars, and seal stars — what domain best fits? Where does this chart's combination of capabilities produce something genuinely distinctive?

Voice: Direct and practical. Career guidance, not life coaching. Specific enough that the reader can make decisions from it.
```

---

## TEMPLATE 09 — Current Life Chapter (Current Decade)

**JSON fields to use:** current luck pillar from `luckPillars`, current pillar `stemTenGod` + `branchTenGod` + `element`, hidden stems of current pillar branch, `missingElements` (is the current decade introducing the missing element for the first time?), `meta.calculatedAt` for context

**Angle:** This is the most immediately relevant section. It should feel like the reader has just received the most accurate description of what's happening in their life right now.

**Opening move:** Name what this decade is. What energy has arrived? What did the previous decade have that this one doesn't? What does this one have that nothing before did?

**Section-specific rules:**
- If the current decade introduces the missing element for the first time: this must be named as a significant, once-in-a-lifetime structural change
- Translate the stem's ten god into what that energy asks of the person (not what it "is")
- The hidden stems of the branch = the three undercurrents of this decade, all active simultaneously
- The decade has a first half (stem dominant) and second half (branch dominant): note this if relevant

**Forbidden for this section:**
- Generic "good decade / bad decade" framing
- Missing the historic significance if this is the first introduction of a missing element
- Failing to translate the hidden stems into simultaneous real-world pressures and gifts

**Prompt:**
```
Using the computed chart data, write the Current Life Chapter section for the active luck pillar.

Draw from: current luck pillar (stem + branch + element), stemTenGod and branchTenGod of current pillar, hidden stems of the branch (look up standard BaZi hidden stem table), whether this decade introduces a missing element for the first time.

Write 3–4 paragraphs:
1. Name what this decade is. What energy has arrived that wasn't present before? If this introduces the missing element for the first time in the chart, name this as historically significant. Translate the stem's energy into plain English: what does it ask of the person?
2. What is the lived experience of this decade? Ground in the specific ten god energy of the stem: Direct Officer asks for proof; Seven Killings pressure-tests; Indirect Seal deepens skill; etc. Translate without using these terms.
3. The hidden undercurrents: the branch contains multiple energies simultaneously. What are the three concurrent undercurrents of this decade? Name each and what it means in lived experience.
4. The invitation: what is this decade asking the reader to become? What does the person who moves through this decade fully present look like on the other side?

Voice: This should feel like the most accurate description of what's happening in the reader's life right now. Specific, immediate, honest about the difficulty without making the difficulty feel like failure.
```

---

## TEMPLATE 10 — This Year (Flow Year)

**JSON fields to use:** `currentFlowYear` (stem, branch, stemTenGod, branchTenGod, stemElement, branchElement), current luck pillar (for three-layer context)

**Angle:** The current year's climate. How does the annual energy interact with this person's natal chart and current decade? What is the year asking for?

**Opening move:** Name the year's dominant energy immediately. Then: pressure or opportunity or both, and why.

**Section-specific rules:**
- Officer energy in flow year = recognition opportunity, but also accountability
- Seven Killings in flow year = testing, pressure, requirement to prove
- When flow year brings first introduction of a missing element: significant year
- Three-layer context: always mention that year energy sits on top of decade energy and natal chart — the convergence or divergence of these layers matters

**Prompt:**
```
Write the This Year flow period reading.

Draw from: currentFlowYear stem/branch/tenGods/elements, current luck pillar stem/branch for context.

Write 3–5 sentences in paragraph form:
- Name the year's energy in plain language. What has arrived?
- How does it interact with what the current decade is already bringing? Is it amplifying, moderating, or adding a new layer?
- What is the year asking for specifically? What is available if the person shows up fully?
- One clear orienting statement: how to approach this year.

Voice: Practical, direct. Not fortune-telling. Orienting guidance.
```

---

## TEMPLATE 11 — Council (Practical Guidance)

**JSON fields to use:** All sections synthesized — this is the integration section.

**Angle:** The practical distillation. Not predictions. Orientations. How do you work WITH what this chart reveals?

**Opening move:** "Reading a chart is useful. Living it is the work."

**Section-specific rules:**
- Each piece of guidance must be traceable to a specific chart element
- Address: work, the current decade, relationships, and the missing element invitation
- Frame as choices, not prescriptions: "the chart rewards X" not "you must do X"
- End with the central invitation of the current moment

**Prompt:**
```
Write the Council section — practical, actionable guidance synthesized from the full chart.

Draw from: governing pattern (work guidance), current decade energy (what to lean into now), partner star configuration (relationship guidance), missing element (what to develop), overall chart structure (what to protect).

Write 4 short paragraphs, one per domain:
1. Work: What does the chart's governing pattern specifically ask for right now? What question should the reader keep asking about their work?
2. This decade: What is the most important practice during this current chapter? What happens if they stay in it vs. step around it?
3. Relationships: What does this chart specifically ask for in how it loves and connects? What to protect, what to be deliberate about?
4. The missing element: What has its absence required them to develop? What is it now inviting them toward as it arrives?

Voice: Wise, practical, specific. Not advice — orientations. The reader should be able to make decisions from these.
```

---

## TEMPLATE 12 — Synthesis / Closing

**JSON fields to use:** Full chart (synthesizing all sections)

**Angle:** The whole of it in one cohesive statement. What is this chart's central story? What is the person being invited to become?

**Opening move:** The chart as a whole — not a sum of parts but a coherent narrative.

**Section-specific rules:**
- Name the central tension of the chart (what is in productive conflict)
- The arc: what was this person before, what are they becoming, what does the finished version look like
- The most important present-moment insight: given the natal chart + current decade + current year, what is the single most important thing?
- End with something worth returning to

**Prompt:**
```
Write the Synthesis closing section.

Draw from: the full chart — synthesizing day master, missing element, governing pattern, current decade, and current year into a coherent narrative.

Write 3 paragraphs:
1. The central story of this chart. Not a list of traits — a narrative. What is the arc? What has this person been, what are they becoming, what does the finished version look like? Use the chart's central metaphor (if one has emerged through the reading).
2. The central tension: what productive conflict is this chart built around? What two forces are in dialogue throughout this person's life? This tension is not a problem to solve — it is the engine.
3. The most important present-moment insight. Given natal chart + current decade + current year: what is the single most relevant thing right now? End with something the reader will return to.

Voice: This is the last thing the reader reads. Make it worth returning to. Not a summary — a landing.
```

---

# SECTION 6 — DECADE PROMPT TEMPLATES [NEW in v2]

## Generic Decade Template

Each decade gets one reading. The template adapts to past/current/future and to the specific energies of that pillar.

**JSON fields to use:** The specific luck pillar object (stem, branch, element, stemTenGod, branchTenGod, startAge, startYear, endYear, isPast, isCurrent)

**Status-specific approach:**
- **Past decade (isPast: true):** Write in reflective mode. Past tense. "Looking back at this period..." What was being built or endured? What seeds were planted that bore fruit later?
- **Current decade (isCurrent: true):** Most detailed, present tense. The lived experience of right now. What is this decade asking? What is available? What does showing up fully look like?
- **Future decade (isPast: false, isCurrent: false):** Written as possibility, not certainty. What conditions will this chapter create? What will be available? Written with the context of what the previous decades will have built.

**Prompt:**
```
Write the decade reading for the luck pillar: {stem}{branch}, ages {startAge}–{startAge+9}, {startYear}–{endYear}.

Status: {past / current / future}

The stem energy ({stemTenGod} translated to plain English):
[Use the literary translation table — translate this ten god into what it asks of the person]

The branch energy ({branchTenGod} translated to plain English):
[Translate similarly]

The dominant element of this decade: {element}
[What element climate is this? What does this element ask for / enable?]

Write 2–3 paragraphs:
1. {If past}: Reflective opening — what was this period doing? What was accumulating, being tested, or laid as foundation?
   {If current}: What has arrived that wasn't present before? What does the dominant energy ask of the person right now?
   {If future}: What conditions will this chapter create? What becomes available that wasn't before?

2. The lived texture of this decade. Ground in the specific ten god energies (translated). What does the stem's energy ask? What does the branch's energy carry?

3. {If past}: What did this period produce that carries forward?
   {If current}: The invitation — what does the person who moves through this decade fully present look like on the other side?
   {If future}: What is this decade asking the person to have built or become in order to fully receive what it offers?

Voice:
- Past decades: reflective, warm, honoring what was hard
- Current decade: immediate, specific, honest about difficulty, forward-facing
- Future decades: possibility-oriented, building on context of what came before
- All decades: no BaZi terminology, second person (except past reflection which can shift to address the younger self)
```

---

# SECTION 7 — MASTER AI SYSTEM PROMPT [Updated in v2]

This is the complete system prompt for the reading generation API call. Pass this as the `system` parameter. The `user` message is the computed chart JSON.

```
SYSTEM PROMPT — ELEMENTUM BAZI READING GENERATOR v2.0

You are the reading engine for Elementum, a spiritual guidance app designed for Western audiences seeking self-understanding through the Chinese metaphysical system of BaZi.

You receive computed chart data as JSON. Your job is to write literary, emotionally intelligent readings in plain English that feel like they were written by a deeply perceptive mentor who has known the reader for years.

═══════════════════════════════════
SECTION A — THE CARDINAL RULE
═══════════════════════════════════

NEVER use BaZi technical terminology in your output. Not in any form.

These terms must NEVER appear in reading text:
Day Master, Ten Gods, Food God, Hurt Officer, Seven Killings, Direct Officer, 
Parallel Self, Rob Wealth, Direct Wealth, Indirect Wealth, Direct Seal, Indirect Seal,
比肩, 劫财, 食神, 伤官, 偏财, 正财, 七杀, 正官, 偏印, 正印, 日主, 格局, 大运, 流年

Every technical term must be translated into a felt human experience before it enters the reading.

TRANSLATION PRINCIPLES:
- Yang Metal strength → "precision, directness, a strong inner axis"
- Missing Fire/Officer → "operating outside conventional authority structures"  
- Output-to-wealth pattern → "your creativity is your financial engine; the work must carry your fingerprints"
- Strong self energy → "self-direction that doesn't require external confirmation"
- Creative output stars → "genuine expressive and creative force"
- Seal stars → "technical depth, specialized knowledge"
- Double stem bond → "what you love fuses with who you are at a structural level"
- Current decade with first fire → "the forge arrives; the first external force with real leverage over your direction"
- Seven Killings in flow year → "a testing force; something asks: is the work real, is the edge real"
- Direct Officer → "recognition; genuine external validation from someone with standing"

═══════════════════════════════════
SECTION B — VOICE AND TONE
═══════════════════════════════════

PERSON: Second person ("you", "your") throughout
TENSE: Present tense for nature/character; past for past decades; possibility for future
REGISTER: Wise mentor. Emotionally intelligent friend. Not a therapist. Not a horoscope.

THE VALIDATION SEQUENCE (mandatory):
Always name what is genuinely true and affirming before naming what is hard.
Never lead with a challenge. Always lead with what is real and strong.
Then: name the shadow of that strength honestly. That's what makes it real, not flattery.

FORBIDDEN PATTERNS:
- "You are destined for greatness" or any ungrounded affirmation
- Vague positives not tied to specific chart data
- Mystical language ("the cosmic energies align...")
- Catastrophizing ("you will face great difficulty")
- False precision ("on March 14th you will...")
- Jargon in disguise ("your creative output star shows...")

REQUIRED PATTERNS:
- Every claim traceable to a specific computed chart element
- Honest complexity: every strength has a shadow, name both
- Practical orientation: always land on "what does this mean for how I live"
- The person's agency: the chart describes weather, not fate

═══════════════════════════════════
SECTION C — OUTPUT FORMAT
═══════════════════════════════════

Return ONLY valid JSON. No preamble, no markdown, no explanation outside the JSON.

{
  "sections": {
    "nature":     { "teaser": "2-3 sentences", "body": "paragraph1\n\nparagraph2\n\nparagraph3" },
    "fire":       { "teaser": "...", "body": "..." },
    "path":       { "teaser": "...", "body": "..." },
    "bonds":      { "teaser": "...", "body": "..." },
    "strengths":  { "teaser": "...", "body": "..." },
    "challenges": { "teaser": "...", "body": "..." },
    "love":       { "teaser": "...", "body": "..." },
    "career":     { "teaser": "...", "body": "..." },
    "chapter":    { "teaser": "...", "body": "..." },
    "year":       { "teaser": "...", "body": "..." },
    "council":    { "teaser": "...", "body": "..." },
    "synthesis":  { "teaser": "...", "body": "..." }
  },
  "decades": [
    {
      "order": 1,
      "zh": "己卯",
      "theme": "3-4 word theme name",
      "teaser": "2 sentences",
      "reading": "paragraph1\n\nparagraph2\n\nparagraph3"
    }
    // ... one object per luck pillar
  ],
  "today": "3-5 sentences for current day's flow pillar",
  "thisMonth": "3-5 sentences for current month's flow",
  "thisYear": "3-5 sentences for current year's flow"
}

SECTION LENGTHS:
- teaser: 2-3 sentences, the hook that draws the reader in
- body: 3-4 paragraphs separated by \n\n, each paragraph 3-6 sentences
- decade reading: 2-3 paragraphs separated by \n\n
- flow periods (today/month/year): 3-5 sentences as a single paragraph

═══════════════════════════════════
SECTION D — QUALITY STANDARD
═══════════════════════════════════

After generating, verify:
1. Does any reading section contain a BaZi technical term? If yes, rewrite.
2. Does every major claim have a specific chart element as evidence? If not, add or remove.
3. Does the nature section feel written for THIS chart, not a generic Yang Metal? 
4. Does the current decade section feel like the most accurate description of the reader's present?
5. Would the synthesis be worth returning to?
```

---

# SECTION 8 — DELIVERABLES CHECKLIST [Updated in v2]

The deliverables are ordered by **what the user sees first in the app**, not by what is calculated first. The Day Master Profile is the emotional opening act — it comes before the chart data because the sequence is: *who you are → your chart → your reading*.

---

## DELIVERABLE 1 — Day Master Profile

**The first thing the user sees.** Opens the reading before the four pillars grid. The emotional sequence is: *who the archetype is → who you are → your reading*.

This deliverable is **fully static and tier-independent**. Every component is computed from the Day Master stem and strength score — no LLM, no runtime generation, identical across Free / Seeker / Advisor / Oracle.

---

### Card layout (top → bottom)

```
┌────────────────────────────────────────────┐
│  HERO ZONE (centered, text-aligned center) │
│  ┌──────────────────────────────────────┐  │
│  │  Archetype Seal  (72×72px SVG)       │  │
│  │  Identity Token  [庚 · Yang Metal · Blade] │
│  │  Archetype Title  "The Blade"  38px  │  │
│  │  Manifesto Line   (italic, 13.5px)   │  │
│  └──────────────────────────────────────┘  │
├────────────────────────────────────────────┤
│  BODY ZONE                                 │
│  Strength ring (52px) + label + sublabel   │
│  ─────────────────────────────────────     │
│  WHO YOU ARE label                         │
│  Teaser (1-2 sentences, always visible)    │
│  [↓ Read more about The Blade] button      │
│    → Para 1 + Para 2 revealed on tap       │
│  ─────────────────────────────────────     │
│  Core Gifts │ Growing Edge  (2 columns)    │
└────────────────────────────────────────────┘
```

---

### Component specifications

**1. Archetype Seal**
- Unique SVG geometric mark per Day Master stem, 72×72px, element color
- Rendered in the top center of the hero zone
- Serves as the ownable visual identity — equivalent to a zodiac glyph
- Full seal designs: see Section 8 item 7 (Seal table)

**2. Identity Token**
- Compact pill displayed above the archetype title
- Format: `[stem character] · [Polarity Element] · [Archetype without "The"]`
- Example: `庚 · Yang Metal · Blade`
- The BaZi equivalent of INTJ-A — a code that can be put in a bio, shared as a screenshot, said in conversation
- Rendered in element color on a lightly tinted background

**3. Archetype Title**
- Font: Cormorant Garamond, 38px, weight 600, element color
- Always prefixed "The" — "The Blade", "The Rain", "The Oak"
- The largest text on the card — this is what the user remembers

**4. Manifesto Line**
- Font: EB Garamond, 13.5px, italic, secondary text color
- Third-person voice — describes the archetype as a force, not the user
- Max 280px wide, centered
- Full manifesto lines: see Section 8 item 6 (Manifesto table)
- Example (庚): *"Precision before intention. An edge that was never chosen — only found."*

**5. Strength Ring**
- SVG partial circle, 52px, rendered inline with label and sublabel beside it
- Stem character centered inside the ring in element color
- Fill percentage and labels:

| Strength | Ratio | Ring fill | Label | Sublabel |
|---|---|---|---|---|
| extremely_strong | > 0.70 | 92% | Extremely Strong | The element is dominant — pure and concentrated |
| strong | 0.51–0.70 | 72% | Strong | Well-supported and self-directed |
| moderate | 0.36–0.50 | 50% | Balanced | Flexible — works across many conditions |
| weak | 0.21–0.35 | 30% | Receptive | Needs the right conditions to come through fully |
| extremely_weak | ≤ 0.20 | 12% | Extremely Receptive | Highly context-dependent — finds strength through support |

**6. Who You Are — teaser + expand**
- Section label: "WHO YOU ARE" in 8px uppercase tracking
- Teaser: 1–2 sentence hook, always visible, italic, 14.5px
- "↓ Read more about The Blade" button — archetype-specific, element color, pill border
- On tap: 2 paragraphs revealed (≤500 words total), fade-in animation
- "↑ Show less" to collapse
- Content source: `WHO_YOU_ARE[stem]` — top-level static constant, not the reading layer
- All 10 stems populated: teaser + 2 paragraphs each
- **Tier rule:** identical across all tiers — Free, Seeker, Advisor, Oracle

**7. Core Gifts · Growing Edge (two-column)**
- Left column (element color tint): Core Gifts — 3 bullet points
- Right column (warm amber tint): Growing Edge — 3 bullet points
- Font: EB Garamond 12.5px, line-height 1.55
- Gifts: punchy 3-5 word phrases, instantly quotable
- Growing Edge: framed as invitations/practices, never diagnoses
- Full tables: see Section 8 items 8–9

**8. Element background gradient**
- Card background is a directional gradient per element, parchment-toned:
  - Metal: `linear-gradient(135deg, #eef2f8, #f0ebe0)`
  - Wood: `linear-gradient(135deg, #eef5ee, #f0ebe0)`
  - Fire: `linear-gradient(135deg, #f9efee, #f0ebe0)`
  - Earth: `linear-gradient(135deg, #f5f0e8, #f0ebe0)`
  - Water: `linear-gradient(135deg, #eef1f8, #f0ebe0)`
- Border: 1.5px solid element color at 40% opacity

---

### What was removed (and why)

| Removed | Reason |
|---|---|
| Element/polarity chips `[Metal]` `[Yang]` | Redundant — identity token carries this information more elegantly |
| "No Fire" / "No Earth" chips | Alarming to first-time users without context; missing elements addressed in Section 2 reading |
| "Your Day Master" label | Jargon — replaced by "Who You Are" |
| Element motif watermark | Replaced by the archetype Seal which is more distinct and ownable |
| Strength line ("Your Water energy is receptive…") | Replaced by strength ring + sublabel |
| Missing element line | Moved to Section 2 (Missing Element) where it has full context |
| coreLine rendered as standalone quote | Now the manifesto line serves this function more concisely |

---

### Worked example — 庚 Yang Metal, extremely strong, missing Fire

```
Seal:           Bisected hexagon (outer hex + inner hex + vertical axis + center point)
Identity token: 庚 · Yang Metal · Blade
Title:          The Blade  (38px, #6080a0)
Manifesto:      "Precision before intention. An edge that was never chosen — only found."

Strength ring:  92% filled, label "Extremely Strong"
Sublabel:       "The element is dominant — pure and concentrated"

Who You Are teaser:
  "You don't sharpen your edge. You were born with one —
   and the question has always been what to cut toward."

Read more → Para 1 (The Blade doesn't decide to be precise…)
           Para 2 (The forge is the missing piece…)

Core Gifts:      Sees through what isn't real
                 Creative force that won't dilute
                 Goes further than most dare

Growing Edge:    Let heat shape you, not just test you
                 Feedback is information, not challenge
                 Make room inside the precision
```

Reference birth date for the 癸 weak example: **February 14, 2023 · 4:00am · Beijing**
Chart: 癸卯 甲寅 癸卯 甲寅 (Water=2, Wood=6, Metal=0, Fire=0, Earth=0, ratio=0.30 → weak)

---

**5. Core Lines — one memorable sentence per Day Master:**

These describe the archetype as a character (third person), not the user. They introduce the archetype before the user is addressed directly. Written to be quoted and shared — the MBTI "Architect" / "Campaigner" equivalent.

| Stem | Archetype | Core Line |
|---|---|---|
| 甲 | The Oak | "The Oak grows toward light before it decides to — its nature is forward motion, its gift is building what others can only imagine." |
| 乙 | The Vine | "The Vine finds its way not through force but through intelligence — it reads every surface and arrives where the Oak never could." |
| 丙 | The Sun | "The Sun doesn't choose to warm. It simply is warm — and everything near it becomes more visible, more alive, more itself." |
| 丁 | The Candle | "The Candle illuminates what it's pointed at completely. Precision and warmth in the same focused flame." |
| 戊 | The Mountain | "The Mountain is what people orient by without knowing why — the ground that holds when everything else shifts." |
| 己 | The Field | "The Field doesn't announce its fertility. It simply grows things — quietly, consistently, without requiring acknowledgment." |
| 庚 | The Blade | "The Blade carries a precision that arrives before the decision to look — an edge present from the beginning, waiting to find its purpose." |
| 辛 | The Jewel | "The Jewel perceives what is genuinely excellent the way others perceive temperature — automatically, accurately, before a word is spoken." |
| 壬 | The Ocean | "The Ocean holds more beneath its surface than it ever shows — and the depth has always been larger than the space given to display it." |
| 癸 | The Rain | "The Rain senses what is true in a room before anyone has said the thing — and nourishes what it touches without announcing it." |

**6. Manifesto Lines — the brand one-liner:**

Each archetype has a manifesto: 1-2 short sentences that describe what the archetype IS as a force in the world. Written in third person. Designed to be quoted, shared, put in bios. This is the MBTI "type description headline" equivalent — the thing people say when they introduce their type to a friend.

Voice rule: No "you". No "your". The archetype speaks for itself.

| Stem | Archetype | Manifesto |
|---|---|---|
| 甲 | The Oak | "Builds what others can only imagine. Growth is not ambition — it is the architecture." |
| 乙 | The Vine | "Finds the path no one else sees. Arrives exactly where it intended." |
| 丙 | The Sun | "Doesn't choose to illuminate. Simply is light — and everything near it comes alive." |
| 丁 | The Candle | "Illuminates completely what it's pointed at. Nothing more. Nothing less." |
| 戊 | The Mountain | "People orient their lives around it without knowing why. The ground that holds." |
| 己 | The Field | "Grows things in silence. Leaves everything it touches more alive than it found it." |
| 庚 | The Blade | "Precision before intention. An edge that was never chosen — only found." |
| 辛 | The Jewel | "Perceives what is excellent the way others perceive temperature — before the question is asked." |
| 壬 | The Ocean | "Holds more beneath the surface than it ever shows. Always has. Always will." |
| 癸 | The Rain | "Knows what is true before it is spoken. Nourishes what it touches without announcing it." |

**7. Archetype Seals — unique visual marks:**

Each archetype has a unique SVG geometric seal, rendered at 72×72px in element color. The seal is the visual equivalent of a zodiac glyph — ownable, recognisable, shareable.

| Stem | Archetype | Seal concept |
|---|---|---|
| 甲 | The Oak | Upward branching tree: central trunk, two branch tiers, root suggestions at base |
| 乙 | The Vine | Spiral wrap: curved vine path climbing around implied vertical axis |
| 丙 | The Sun | Radiating rays: central circle with 8 spokes alternating long/short |
| 丁 | The Candle | Single upward flame: tapered teardrop form with inner glow fill |
| 戊 | The Mountain | Layered peak: outer triangle with two internal horizontal strata lines |
| 己 | The Field | Cultivation grid: horizontal furrow lines with small sprout marks above |
| 庚 | The Blade | Bisected hexagon: outer hex + inner hex + vertical axis + center point |
| 辛 | The Jewel | Faceted diamond: rotated square with inner cross diagonals creating facets |
| 壬 | The Ocean | Depth rings: 4 concentric circles + horizon line bisecting center |
| 癸 | The Rain | Wave arcs: 3 descending wave paths + vertical fall-drop dashes below |

**8. Identity Token — the shareable code:**

Displayed as a compact pill above the archetype title: `[stem] · [polarity element] · [archetype name without "The"]`

Example: `庚 · Yang Metal · Blade`

This is the BaZi equivalent of INTJ-A — a compact, readable code that can be quoted in conversation, put in a bio, or shared as a screenshot. The three components give the skeptic enough to ask "what does that mean?" and the enthusiast enough to recognize the system.

**9. Core Gifts & Growing Edge — punchy, quotable versions:**

Rewritten from descriptive phrases to 3-5 word punchy labels. Designed for the same memorability as MBTI trait descriptions — short enough to repeat, specific enough to recognize yourself in.

| Stem | Core Gifts | Growing Edge |
|---|---|---|
| 甲 | Vision before proof exists · Structural courage — goes first · Others build on you | Root as deep as you reach · Receive support — mean it · Let what's planted land |
| 乙 | Navigates what others can't · Bends without breaking · Connection that actually lasts | Trust your own position · Know when adapting becomes erasing · Build inward as much as outward |
| 丙 | Changes rooms on entry · Warmth as structure, not performance · Belief that moves people | Choose where to direct the light · Receive as freely as you give · Be seen — not only illuminating |
| 丁 | Makes people feel genuinely seen · Precision of attention · Quality through full focus | Read the room before the full flame · Receive witnessing in return · Focused light is enough |
| 戊 | The reference point in any room · Patience that outlasts pressure · Reliability as structural fact | Allow movement before certainty · Stay open to being shaped · Let others carry some weight |
| 己 | Grows what others abandon · Care without announcement · Reads what things need to flourish | Harvest for yourself too · Know when the field is full · Receive nourishment as naturally as you give it |
| 庚 | Sees through what isn't real · Creative force that won't dilute · Goes further than most dare | Let heat shape you, not just test you · Feedback is information, not challenge · Make room inside the precision |
| 辛 | Accuracy others come to rely on · Work of real distinction · Standards that outlast trends | Find peace in what's available · Extend yourself the grace you see in others · Your facet is already enough |
| 壬 | Depth others simply can't reach · Synthesizes across the full range · Holds without needing to control | Translate depth into forms others can reach · Choose which currents are worth following · Find the shores that give you shape |
| 癸 | Senses truth before it's said · Nourishes everything it reaches · Quiet intelligence that outlasts noise | Build a container for your sensitivity · Choose your ground deliberately · Let yourself be nourished in return |

**Voice rule for Growing Edge:** Every item must read as an invitation or a practice, never a diagnosis. Frame as *here is something opening for you* — not *here is what you struggle with*.

---

## DELIVERABLE 2 — Your Energy Profile (Five Element Balance)

**The second thing the user sees.** Sits directly below the Day Master Profile card. Bridges archetype identity → the underlying elemental data → spiritual guidance. No BaZi jargon is surfaced — all Chinese terms are translated or replaced.

This deliverable is **fully computed, no LLM required**. All content derives from `chart.elements`, `chart.dayMaster.strength`, `chart.missingElements`, and `chart.dayMaster.stem`.

---

### Card layout (top → bottom)

```
┌────────────────────────────────────────────────┐
│  Your Energy Profile              (title 22px) │
│  [Day Master legend] [absent legend]            │
│                                                 │
│  Metal  [icon] ████████░░  8                   │
│  Wood   [icon] ████░░░░░░  4                   │
│  Earth  [icon] ██░░░░░░░░  2                   │
│  Water  [icon] █░░░░░░░░░  1   Day Master      │
│  Fire   [icon] ╌╌╌╌╌╌╌╌╌  —   absent          │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │  Day Master energy    Balance approach   │  │
│  │  Overpowering         Channel & Release  │  │
│  │  ──────────────────────────────────────  │  │
│  │  "Your energy runs at full capacity…"    │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ▌ Dominant force · Metal                      │
│    [insight line]                               │
│    [guidance line]                              │
│                                                 │
│  ▌ Missing fire                                │
│    [insight line]                               │
│    [guidance line]                              │
│  ─────────────────────────────────────────     │
│  What lifts you      │  What depletes you       │
│  Fire — …            │  Metal — …               │
│  Wood — …            │  Water — …               │
└────────────────────────────────────────────────┘
```

---

### Component specifications

**1. Element bars (segmented, 8 positions)**
- Five rows: Metal · Wood · Earth · Water · Fire (always in this order)
- Each row: icon (SVG) + English label + 8 discrete segments + count number
- Day Master element: higher opacity segments (0.82), "Day Master" sub-label
- Absent elements: dashed-border segments, "absent" sub-label, count shows "—"
- Legend: small colored square = Day Master, dashed rectangle = absent

**2. Element icons — SVG, 15×15px, element color**

| Element | Icon description |
|---|---|
| Metal | Hexagon outline + center dot |
| Wood | Upward branching tree |
| Earth | Square with cross grid lines |
| Water | Two wave arcs |
| Fire | Flame silhouette with inner fill |

**3. Energy rating block**

Two-column header inside a tinted card:

| Chinese | English label | Balance approach |
|---|---|---|
| 极旺 | Overpowering | Channel & Release |
| 旺 | Dominant | Channel & Release |
| 中和 | Balanced | Maintain & Attune |
| 弱 | Receptive | Nourish & Amplify |
| 极弱 | Yielding | Nourish & Amplify |

Balance approach translation rationale:
- **Channel & Release** = 喜克泄耗 — strong Day Masters need outlets: expression, challenge, and friction to stay purposeful rather than rigid
- **Nourish & Amplify** = 喜生助 — receptive/yielding Day Masters come through fully in the right conditions; seek genuine support, not force
- **Maintain & Attune** = 中和 — balanced charts need protection from extremes and awareness of what genuinely disrupts equilibrium

Approach line (italic, 12px) shown below the divider within the card — one sentence explaining the balance approach in concrete, spiritual terms.

**4. Dominant force — always shown**

The highest-count element in the chart is always surfaced, regardless of count. Label: "Dominant force · [Element]". Two sub-lines:
- Insight line (italic): names what the dominant force creates structurally
- Guidance line (plain): what to do about it spiritually

Full dominant insight lines:

| Element | Insight | Guidance |
|---|---|---|
| Metal | Metal dominates — precision without flexibility. The edge is real, but without heat it cannot find its purpose. | Seek environments that introduce friction and heat deliberately. Pressure is not the enemy — it is what gives your edge its purpose. |
| Wood | Wood overwhelms — almost all energy nourishes growth in others, leaving little for yourself. | What you grow in others is real. The question is whether any of those roots belong to you. Choose one thing you are growing entirely for yourself. |
| Fire | Fire saturates — warmth without restraint. The light is genuine but risks consuming its own source. | Choose where you direct the warmth rather than shining at everything. Selectivity is not dimming — it is precision. |
| Earth | Earth dominates — deep stability, but movement and change become genuinely difficult. | Allow movement before certainty fully arrives. The Mountain's strength is not less for being moved — it is more for having shifted deliberately. |
| Water | Water floods — depth without direction. The capacity is vast; the challenge is finding the channel. | Find the shores. The depth becomes power not by staying vast but by finding the forms through which it can actually reach people. |

**5. Missing element insights — one block per absent element**

Label: "Missing [element]". Two sub-lines same structure as dominant.

Full missing element lines:

| Element | Insight | Guidance |
|---|---|---|
| Fire | Fire is absent — no external force has shaped this chart's direction. Freedom and isolation in equal measure. | Build the conditions that make your work impossible to ignore. The forge comes to those who make themselves worth forging. |
| Earth | Earth is absent — no structural ground beneath the movement. The architecture is entirely self-generated. | Build one container strong enough to hold what you carry. Internal structure is the practice — not a destination. |
| Water | Water is absent — no reflective depth to temper or nourish. What is built may be strong; what is sustained is still developing. | Cultivate stillness as a practice, not an absence. What you build without depth can stand; what stands with depth endures. |
| Wood | Wood is absent — no natural outward reach or creative momentum. Expression must be cultivated rather than assumed. | Invest in the one direction that is genuinely yours. One root growing deep is worth more than many reaching shallow. |
| Metal | Metal is absent — no natural precision or definition. Structure must be chosen rather than inherited. | Define what is non-negotiable in how you work and live. Precision is a practice — and it begins with what you will not compromise. |

**6. What lifts you · What depletes you**

Two-column grid. Left = favourable elements (喜用). Right = unfavourable elements (忌凶).

Translation note: "What lifts you" / "What depletes you" is the preferred Western translation for 喜用/忌凶. It is energetic and wellness-adjacent — immediately understood without any BaZi vocabulary.

Each item: element icon circle + "Element — one-line reason".

Full lifts/depletes per stem:

| Stem | What lifts you | What depletes you |
|---|---|---|
| 甲 | Water: Nourishes the roots · Fire: Channels growth into visible results | Metal: Cuts growth directly · Earth: Absorbs water before it reaches the roots |
| 乙 | Water: Nourishes the vine from below · Fire: Draws the vine upward | Metal: Cuts the vine · Earth: Too much soil smothers rather than supports |
| 丙 | Wood: Feeds the flame · Fire: Genuine conviction carries furthest | Water: Extinguishes the Sun · Metal: Absorbs warmth before it reaches anyone |
| 丁 | Wood: Sustains the flame · Fire: Deepens the warmth | Water: Extinguishes the focused flame · Metal: Draws light away |
| 戊 | Fire: Warms the mountain · Earth: Deepens the foundation | Wood: Roots break the stone · Water: Erodes over time |
| 己 | Fire: Warms the field · Earth: Deepens capacity | Wood: Drains the field's fertility · Water: Too much floods rather than nourishes |
| 庚 | Fire: Gives the edge purpose · Wood: Channels precision outward | Metal: More Metal deepens rigidity · Water: Cools what needs to stay hot |
| 辛 | Water: Brings out clarity · Earth: Holds and protects the setting | Fire: Tests without Earth risks the facet · Metal: Too much crowds rather than refines |
| 壬 | Metal: Generates Water · Water: Amplifies depth | Earth: Dams the current · Fire: Evaporates depth before it can be used |
| 癸 | Wood: Flow with the dominant force · Water: Supports the core | Metal: Disrupts the natural current · Fire: Burns Wood — undermines the foundation |

---

### Worked example — 庚 Yang Metal, extremely strong, missing Fire

```
Element bars:   Metal 5 ████████░░░  Day Master
                Wood  4 ███████░░░░
                Earth 2 ████░░░░░░░
                Water 1 ██░░░░░░░░░
                Fire  — ╌╌╌╌╌╌╌╌╌  absent

Energy rating:  Overpowering (极旺)
Balance:        Channel & Release
Approach line:  "Your energy runs at full capacity — it needs expression,
                challenge, and friction to stay purposeful rather than becoming rigid."

Dominant:       Metal — "Metal dominates — precision without flexibility.
                The edge is real, but without heat it cannot find its purpose."
                Guidance: "Seek environments that introduce friction and heat
                deliberately. Pressure is not the enemy..."

Missing:        Fire — "Fire is absent — no external force has shaped this
                chart's direction. Freedom and isolation in equal measure."
                Guidance: "Build the conditions that make your work impossible
                to ignore. The forge comes to those who make themselves
                worth forging."

Lifts:          Fire — gives the edge purpose
                Wood — channels precision outward
Depletes:       Metal — more Metal deepens rigidity
                Water — cools what needs to stay hot
```

---

---

## DELIVERABLES 4–10 (Summary)

- [ ] **D4 — Pattern Declaration:** Governing pattern name, plain English causal chain, supporting/opposing elements
- [ ] **D5 — Combination Analysis:** All active 合/冲/刑 translated to life patterns, no unlisted combinations
- [ ] **D6 — Ten God Analysis:** Dominant gods, missing gods, career/wealth/relationship mapping (internal use — not surfaced in UI directly, translated into literary reading sections)
- [ ] **D7 — Luck Pillar Timeline:** All 9 pillars, current pillar in full depth, next pillar previewed
- [ ] **D8 — Current Year Analysis:** Flow year ten gods, natal interactions, practical guidance
- [ ] **D9 — Life Domain Summary:** Career, wealth, relationships, personal development
- [ ] **D10 — Synthesis Statement:** Specific chart-derived paragraph, central tension, present-moment insight

---

## Full Deliverables Checklist

Every complete reading must produce the following, **in this exact order**:

- [ ] **D1 — Day Master Profile** ← first in reading order, tier-independent
  - [ ] Archetype Seal rendered (correct geometry for stem)
  - [ ] Identity token: `stem · polarity element · archetype-without-The`
  - [ ] Archetype title 38px in element color
  - [ ] Manifesto line in italic below title
  - [ ] Strength ring at correct fill %, stem character centered, label + sublabel beside
  - [ ] "Who You Are" teaser visible (1-2 sentences)
  - [ ] "Read more about The [Archetype]" button present
  - [ ] 2 body paragraphs revealed on tap
  - [ ] Core Gifts: 3 punchy bullets, element color
  - [ ] Growing Edge: 3 invitations, amber tone
  - [ ] Element background gradient correct for element
  - [ ] No chips, no element watermark, no "Your Day Master" label
- [ ] **D2 — Your Energy Profile** ← Section 2, computed, no LLM
  - [ ] Five element bars (8 segments, icons, English labels, Day Master + absent markers)
  - [ ] Energy rating block: label (Overpowering/Dominant/Balanced/Receptive/Yielding) + balance approach (Channel & Release / Maintain & Attune / Nourish & Amplify)
  - [ ] Balance approach line (one sentence, italic)
  - [ ] Dominant force always shown — insight line + guidance line
  - [ ] Missing element(s) shown — insight line + guidance line per absent element
  - [ ] What lifts you: 2 elements with reason lines
  - [ ] What depletes you: 2 elements with reason lines
  - [ ] No BaZi jargon visible — all Chinese terms translated or removed
- [ ] Governing pattern (plain English, causal chain)
- [ ] Active combinations (translated to life patterns)
- [ ] Strengths (3 minimum, each chart-grounded)
- [ ] Challenges (3 minimum, framed as structural features)
- [ ] Love/relationships (partner element tension addressed)
- [ ] Career (governing pattern + institutional fit)
- [ ] Current decade (most detailed section)
- [ ] Flow year reading
- [ ] Practical council (4 domains)
- [ ] Synthesis/closing
- [ ] All 9 decade readings (past/current/future differentiated)
- [ ] Flow month reading
- [ ] Flow day reading

---

# APPENDIX — SAMPLE OUTPUT

**Reference chart:** 乙亥 庚辰 庚寅 乙酉 (born 1995-04-29, 18:00, Beijing, male)

The complete generated reading for this chart, produced following the v2 Bible rules, is the quality anchor for all future readings. If a newly generated reading for a different chart doesn't feel equally specific, honest, and literary — the prompts need adjustment before shipping.

**Three verification tests for any new reading:**
1. Remove the person's birth data. Could this reading apply to another person? If yes — it's too generic.
2. Read the challenges section. Does it feel honest enough to be slightly uncomfortable? If not — it's too soft.
3. Read the synthesis. Would the reader want to keep it? If not — it didn't land.

---

*Bible v2.6 — Updated March 2026*
*Added: Section 2 full spec — D2 Your Energy Profile. Documents energy rating scale (Overpowering/Dominant/Balanced/Receptive/Yielding), balance approach translations (Channel & Release / Maintain & Attune / Nourish & Amplify with 喜克泄耗/喜生助 rationale), dominant force insight table (5 elements), missing element insight table (5 elements), lifts/depletes table (10 stems). D2 checklist added (8 items). Old D2 Four Pillars + D3 Five Element merged into new D2.*
*Model pin: Opus 4.6 (production) / claude-sonnet-4-20250514 (dev)*
*Verified against: shen88.cn, ebaicha.cn, junzige.com*
