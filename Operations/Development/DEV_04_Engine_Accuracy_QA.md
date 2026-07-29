# Engine Accuracy QA — mandatory after any engine code change

**Status: STANDING WORKFLOW / QA HYGIENE (instituted 2026-06-24).**
**Rule:** after **any** change to the calculation/resolution engine (`calculator.js`, `buildEnergyChart.js`, `readingResolve.js`, `energyRoles.js`, `dominanceWheel.js`), run this accuracy QA **before** the change is considered done. No engine change ships unverified.

---

## 1 · The dimensions, and the bar

| Dimension | Tier | Bar |
|---|---|---|
| **Four Pillars** (year/month/day/hour stems + branches) | **A — deterministic** | **Must match a reference site EXACTLY.** Pure calendar math (solar terms + sexagenary cycle). Any mismatch = real bug. |
| **Stem Ten Gods** (per pillar) | **A — deterministic** | **Exact.** Derived from pillars + Day Master. |
| **合冲刑害 patterns** (六合/六冲/六害/三刑/自刑) | **A — deterministic** | **Exact** which combinations/clashes exist (from branches). |
| **Element dominance** (which elements lead, ranking) | **B — algorithmic** | **Qualitative consensus.** Exact % will differ across sites (each weights stems/hidden-stems/season differently) — but the *ranking* and which element dominates should agree. |
| **Day Master strength** (strong/weak) + **band** (concentrated/balanced/open) | **B — algorithmic** | **Qualitative consensus.** Sites disagree on thresholds; the strong-vs-weak verdict should align. |
| **Catalyst / favourable element** | **B — algorithmic** | Consensus direction. |

> **Note — branch / hidden-stem Ten Gods are out of scope:** Elementum's chart intentionally does **not** display 藏干 (hidden stems) or branch Ten Gods (only stem Ten God + branch *element* per pillar). Hidden stems ARE used internally for element scoring. So do not flag "missing branch Ten Gods" as an accuracy error — it's a scope choice. (The internal `chart.tenGods.*Branch` field is vestigial/"—" and unused — a cleanup item, not a bug.)

## 2 · Reference sites (2–3, cross-checked)

1. **BaZi Lab** — `bazi-lab.com/bazi-calculator` (Five-Element balance, Ten Gods, DM strength, favourable elements).
2. **Master Sean Chan** — `masterseanchan.com/bazi-calculator` (Ten Gods, hidden stems, solar-time, ShenSha, Luck Pillars).
3. **Your Chinese Astrology** — `yourchineseastrology.com/calendar/bazi` (Four Pillars, element scores, Ten Gods, DM strength).

> ⚠ **Browser-MCP allowlist:** as of 2026-06-24 the Chrome extension blocks all three domains ("Navigation to this domain is not allowed"). Add them to the extension's allowed sites before an MCP-driven run, or compare manually.

## 3 · Procedure

1. **Dump Elementum's output:** `node tools/qa-accuracy-dump.mjs` (prints all dimensions for the test charts).
2. **For each reference site:** enter the **same** birth data, read the chart.
3. **Compare** Tier A exactly, Tier B for consensus. Log every discrepancy.
4. **Gate:** zero Tier-A discrepancies. Any Tier-A mismatch blocks the engine change.

## 4 · Caveats (read before comparing)

- **Solar time:** Elementum treats `Beijing` as the **120°E standard meridian** (no longitude correction). Many sites use Beijing's *actual* longitude (~116.4°E, ~14 min earlier). **Use Beijing-born charts** so this difference is neutral, OR set each site to the same longitude. Mismatched solar handling near an hour boundary changes the **hour pillar** — a false "bug."
- **Hour-boundary sensitivity:** avoid test times within ~20 min of an odd hour (the 时辰 boundaries 23/01/03/…). `18:00` is mid-酉 (17–19) → safe.
- **Element %:** never expected to match digit-for-digit; compare ranking/dominance only.

## 5 · Test charts

| Label | DOB | DM | Why |
|---|---|---|---|
| REFERENCE 庚 (strong) | 1995-04-29 18:00 Beijing male | 庚 yang metal | the golden reference; strong DM, pure pattern |
| *(add)* yin DM | — | e.g. 辛/乙/丁 | exercise the polarity path on a yin Day Master |
| *(add)* weak DM | — | — | exercise the strong/weak band threshold |
| *(add)* boundary hour | — | — | exercise hour-pillar / solar-time edge |

## 6 · Last run — 2026-06-24 (post Phase-1 polarity-resolver fix)

**Elementum output (REFERENCE chart):**
- Pillars **乙亥 · 庚辰 · 庚寅 · 乙酉** — **✅ all four verified independently**: year/month/hour by 五虎遁/五鼠遁 rules; **day pillar 庚寅 by JDN + anchor** (JDN 1995-04-29 = 2449837; anchor 1900-01-01 = 甲戌 → (2449837−2415021+10) mod 60 = index 26 = 庚寅). Tier-A deterministic layer is clean.
- Stem Ten Gods **正财 · 比肩 · 日主 · 正财** ✓.
- DM **庚 extremely_strong / concentrated / pure**, catalyst **Fire**.
- Dominance **Metal 42 > Wood 32 > Earth 20 > Water 3 ≈ Fire 3**.
- Patterns **六合 寅亥 · 六合 辰酉**.
- Faces (post-fix): wood now correctly leads **正财 The Steward** (was polarity-blind 偏财 The Horizon).

**Findings:**
- **F1 (now SUPERSEDED by B6 — do NOT remove):** `chart.tenGods.*Branch` = "—" (passes a branch to `getTenGod`, which only takes stems). It is unused *today*, but the **宫位 positional axis (B6, REA_14 §1)** will read a per-pillar Ten God at the branch positions — so the fix is to **derive each `*Branch` from the branch's main hidden stem** (`getTenGod(dayStem, HIDDEN_STEMS[branch][0].s)`), not delete the field. Folded into the engine Phase-2 / positional-surface work. Until then it's a harmless "—".

**External cross-check — BaZi Lab (`bazi-lab.com`), via owner screenshot (Chrome MCP blocks the domain for nav/read/screenshot):**
- **Tier-A: ✅ EXACT MATCH, zero discrepancies.** Pillars 乙亥·庚辰·庚寅·乙酉 and stem Ten Gods 正财·比肩·日主·正财 match exactly (BaZi Lab run used 18:45→True Solar 18:31, still 酉 hour → identical pillars). Hidden stems (壬甲/戊乙癸/甲丙戊/辛) match → Elementum's element-scoring inputs are correct. BaZi Lab also displays branch-deity Ten Gods (per hidden stem) which Elementum intentionally omits (confirms F1 is scope, not error).
**External cross-check #2 — Your Chinese Astrology (`yourchineseastrology.com`), via owner screenshot (WebFetch 403'd; Chrome MCP blocked):**
- **Tier-A: ✅ exact again** — pillars 乙亥·庚辰·庚寅·乙酉, DM 庚 Yang Metal, and the **simple element count Wood 3 / Metal 3 / Earth 1 / Water 1 / Fire 0 matches Elementum exactly** (raw element identification correct).
- **Tier-B: ⚠ DIVERGENCE FOUND (calibration, not a deterministic bug — no single ground truth in BaZi strength algorithms):**
  - **Weighted scores** — Elementum: Metal 42 · Wood 32 · Earth 20 · Water 3 · Fire 3. YCA: Wood 36.3 · Metal 33 · Water 9.36 · Earth 5.5 · Fire 3.18.
  - **Dominance #1 flips:** Elementum **Metal**; YCA **Wood** (near-tie both ways) — this decides the "core" persona.
  - **DM strength diverges materially:** Elementum **extremely_strong / concentrated (0.92)**; YCA **"Balanced"** (self-group Metal+Earth 38.5 < opposing Wood+Water+Fire 48.84). Drives Elementum's `band = concentrated`.
  - **Root cause (consistent):** Elementum weights the **self-group heavier** (Metal 42 + Earth **20** vs YCA's Metal 33 + Earth **5.5**) and **Water lighter** (3 vs 9.36) → inflates both DM strength and Metal's rank.
- **⇒ STATUS: RESOLVED (2026-06-25)** by the 合而不化 + adjacency + relative-冲 engine fix — see **§7** below for the before/after run. The metal-inflation and the non-adjacent-bond band flip are both gone. One residual calibration item (Earth via `monthBranch=0.40`) is carried forward as **QA-F3**. *(Originally DEFERRED 2026-06-24; root cause + 12-chart diagnostic captured then, fix implemented now.)*

**QA-F2 — root cause (investigated 2026-06-24, `calculator.js`):** a single mechanism drives BOTH the dominance flip and the strength inflation — the **stem-combination (合) handling** (`applyBondModifiers`, lines ~204–216). For `乙庚→Metal`:
  1. It fires on **mere presence** (`allStems.includes(s1)&&includes(s2)`) — **no adjacency check** (合 should require adjacent stems) and **no 合化-condition check**.
  2. It then (a) **shifts each combining stem's score 40% toward Metal** (`shift(...)`) → inflates Metal / deflates Wood in the dominance, and (b) **adds the wood stems to `bondedDMStems`** (line 214) → they count as DM support in 得势.
  Net: both 乙 (wood = 财, should drain a metal DM) are reclassified as metal-support → 得势 (`gotShi`) passes → `g=7` → **extremely_strong**; and Metal out-scores Wood.
  Secondary lever: `POS_WEIGHTS.monthBranch = 0.40` (here 辰=earth) inflates Earth (20 vs YCA 5.5).
  **Fix options (each re-shifts EVERY chart → needs multi-chart + multi-reference QA before/after):** (i) require **adjacency** for 合; (ii) gate the score-shift + DM-support behind real **合化 conditions** (else treat 合 as *binding*, not transformation — don't count the bound stem as support); (iii) lower `monthBranch` weight. **Do not change the core strength algorithm reflexively** — pick a direction, then re-run this QA across several charts.

  **Diagnostic data (12-chart counterfactual, `tools/qa-strength-diagnostic.mjs`, 2026-06-24):** of 12 varied charts, **4** have a DM-supporting 合; **all 4** had their DM strength inflated by it (actual > no-合 counterfactual); **2/4 fired NON-ADJACENT** (a clear bug); **1 flipped its band** (chart `己未丙寅壬子辛亥`, 壬 DM: a *non-adjacent* 丙辛合 → weak became strong → open→concentrated band → wrong archetype). ⇒ TWO real issues: **(a) adjacency gap = unambiguous bug** (fix: require adjacency); **(b) 合-as-transformation = systematic inflation** even when adjacent (the reference chart's 乙庚合 is adjacent, so only a 合化-conditions/binding fix changes it). Re-run this diagnostic after any fix.

---

## 7 · Run — 2026-06-25 (post 合而不化 + adjacency + relative-冲 fix)

**What shipped** (`calculator.js`, per DEV_01 §3.7 / §3.7b / §3.8):
- **Site 1 — `applyBondModifiers`:** 合 now **binds by default (合而不化)** and touches no numbers unless the **真化 gate** passes (adjacency + 月令 commands the result + month branch not 冲破). Full 三合 bureau self-sufficient (gate = no 冲破); 六合/半合/天干合 need 月令. Retires the presence-only, always-transform behaviour that caused QA-F2.
- **Site 2 — `computeDMStrength` 得地:** a DM root on the **weaker side of a present 六冲** is uprooted and no longer anchors the DM (滴天髓 旺者冲衰衰者拔; strength ≈ position weight, 月令 strongest).
- **No change:** 刑/害/破 stay reading-only (`detectPatterns`); polarity faces unchanged (read raw pillars).

**12-chart before→after (`tools/qa-strength-diagnostic.mjs`):** every strength change is a **de-inflation** (the intended direction). Only **1 band change**, and it is the *fix*:

| Chart | DM | strength before → after | dominance before → after | band change |
|---|---|---|---|---|
| 乙亥庚辰庚寅乙酉 (REF) | 庚 | extremely_strong → **strong** | metal → **wood**-led (wood .333 / earth .324) | concentrated → concentrated |
| 己未丙寅壬子辛亥 | 壬 | strong → **weak** | wood → fire | **concentrated → open** ✅ fixes the non-adj-bond archetype |
| 癸酉壬戌戊子丁巳 | 戊 | extremely_strong → **strong** | earth → water | concentrated → concentrated |
| 壬子丙午癸巳乙卯 | 癸 | weak → **extremely_weak** | fire → fire | open → open (Site 2: 子午冲 uproots DM root) |
| 甲申丁卯丙申戊戌 | 丙 | extremely_strong (=) | fire → wood | concentrated → concentrated |
| 戊寅癸丑己未辛未 | 己 | extremely_strong → **strong** | earth → earth | concentrated → concentrated |
| *(other 6 charts)* | — | unchanged | unchanged | none |

**Tier-A:** unaffected (deterministic layer untouched) — pillars/stem-ten-gods still exact.

**REFERENCE chart (`tools/qa-accuracy-dump.mjs`):** `庚 strong (0.72) · concentrated · pattern forging · catalyst Fire`. Scores **earth 33% (.324) · wood 33% (.333) · metal 23% (.234) · water 6% · fire 5%**. Faces polarity-correct (wood 正财/偏财 · earth 偏印 · metal 比肩/劫财). ⇒ **archetype key `庚_concentrated_pure` → `庚_concentrated_forging`** (Metal 42→23 de-inflated; the 辰酉→Metal and 乙庚→Metal transforms no longer fire). Owner-validated ("forging is definitely me"). **Tier-B convergence vs YCA (2026-06-24 cross-check):** wood now **leads**, matching YCA's Wood-first (was Metal — a divergence); DM strength one notch closer (extremely_strong → strong vs YCA Balanced).

**App:** reloads clean (fresh `vite connecting → connected`, no runtime errors); engine module compiles + computes via `node` (diagnostic + dump).

### QA-F3 (NEW, 2026-06-25) — two residual items the de-inflation exposed
1. **wood/earth near-tie + sort inconsistency.** On the REF chart wood (.333) edges earth (.324) — both round to 33%. `computeTgPattern` ranks by raw **score** → wood-led → **forging** (correct). But `buildEnergyChart.energies` ranks by rounded **%** with an `EL_ORDER` tie-break (metal→earth→water→wood→fire) → shows **earth first** on the wheel. So the wheel's lead energy and the archetype pattern can disagree on a near-tie. **Recommended fix:** make the wheel's tie-break fall through to raw score (one line in `buildEnergyChart`), so wheel order and archetype agree. Affects every chart's tie-break → an app-reconciliation (Phase 2) decision, not shipped here.
2. **Earth still inflated vs YCA** (ours 33 vs YCA 5.5) — driven by `POS_WEIGHTS.monthBranch = 0.40` (here 辰=Earth), the *secondary lever* flagged in QA-F2, **not** the 合 handling. Left unchanged deliberately (separate knob). If Earth is lowered, wood becomes the *clear* dominant and `forging` stops being knife-edge. Owner calibration call.

---

## Run log addendum — 2026-07-09 · ENGINE v3 (two Tier-A fixes)

Found by `tools/qa-pillar-crosscheck.mjs` (independent sexagenary derivation, anchored on the verified 庚寅 golden day) on its first run over the expanded case pool; owner-approved same day.

1. **真太阳时 sign inversion** (`calculator.js` trueSolarHour): corrected to clock **+** 4min×(经度−120°). Guard case: `庚 Ürümqi solar-time` (87.6°E, 18:00 → 申时 甲申; all other pillars = golden).
2. **五虎遁 wrap-month stem** (小寒→立春 births): 丑 month offset from 寅 is +11, not −1. Guard case: `庚 pre-立春 year boundary` (1997-01-28 → 丙子年 **辛丑**月).

Verification: crosscheck **6/6 agreement** · goldens re-blessed at 6 cases · all previously verified charts byte-identical (golden 乙亥 庚辰 庚寅 乙酉 unchanged) · journey suite 16/16 through the UI · ENGINE_VERSION 2→3 (cached charts recompute on next open). Cross-site spot-check of the two new guard cases per the §-protocol remains a recommended owner errand (independent-derivation verification applied in its place).
