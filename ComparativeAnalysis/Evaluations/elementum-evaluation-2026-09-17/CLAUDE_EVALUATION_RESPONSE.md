# Claude response: reconciling the evaluation pack with the current reading system

Date: 2026-09-18. Checkout verified: `d5887801` (main). Status: investigation and recommendation only. No production code, canonical document or reading content was changed for this response.

Read in the order the owner set: `ComparativeAnalysis/README.md`, `00_START_HERE.md`, `SYSTEM_ALIGNED_REASSESSMENT.md`, `LANGUAGE_USE_RECOMMENDATIONS.md`, `ASSEMBLY_IMPLEMENTATION_SPEC.md`, `LANGUAGE_COMPARISONS.md`, then `FULL_EVALUATION.md`, `140_TRAIT_LEDGER.md`, `UNIT_NOTES.md`, `TRACE_EVIDENCE.json`, `REASSESSMENT_PROVENANCE.json`. Then REA_01 to REA_06, REA_16 (§2c, §6, §7), the engine (`energyRoles.js`, `buildEnergyChart.js`), the journey builder (`journeyData.js`), the selector (`resolveVariant.js`), the station JSON for every cited cell, and the app consumers of each cited field.

What I ran on the current head, not on the reviewer's `0104bd85`:

- The reviewer's four fixtures plus two of my own (moderate 庚 with Wood 40%; moderate 庚 with a 60% core) through `buildEnergyChart`, `buildJourneyModel`, `poolDoors`, `resolveDayMasterReading`, `buildCarryModel` and `buildElementScreen`.
- The transcription audit `node tools/export-reading-templates.mjs` (default, non-destructive mode).
- Station greps for every quoted line, and a pool-shape count over the ten STEM files.

---

## 1. Overall assessment

**The reassessment is right about the system and right about the voice, and the owner should adopt it as the working guide.** The first pass (FULL_EVALUATION) scored a snapshot two commits behind the code it inspected, treated several deliberate designs as defects, and wanted the language flattened. The reassessment withdrew those errors itself. What survives is a small, specific set of assembly bugs, three source-level contradictions, a handful of documentation drifts, and a short list of consequential-claim sentences in the ledgers. None of it requires a batch rewrite.

Where I agree, with verification:

- **Three assembly defects are real on the current head** (B9, B10 residual, B11). All three reproduce with the reviewer's fixtures and mine. They share one root: the pipeline resolves valence × volume once in the engine, but two consumers still read an older value (raw strength) or fall back to the Balanced baseline when the door list is empty.
- **Two content cells contradict themselves or their source** (B2 火_木, B3 水_火). Both are genuine and both sit upstream of P4 chips, so they are source-first fixes.
- **REA_04 has three documentation defects** the reviewer found: the swapped Earth labels in §3.4, the 正印/偏印 phrase collision with REA_02 §2, and PART 8 asserting a global ban that later per-surface rulings replaced.
- **The voice should be preserved.** "Never good enough" stays. The reassessment's four questions (meaning, reasoning, reading, scope) and its acceptance protocol are compatible with REA_16 §7 and phrase law v5 as written; they add reader testing, which we do not have.

Where I disagree or the pack is outdated:

- **The exporter `_ORDER.json` mismatch does not reproduce.** The audit is green on `d5887801`: 240 files in sync, exit 0.
- **The "nine Order shadows differ between pack and station" finding is a snapshot artefact, not a defect.** The pack was cut at `219cde92`, after the 2026-09-17 inner-judge ruling. The code the reviewer inspected was `0104bd85`, before it. Their "current" labels (Snaps under load, Doubts every spark) no longer exist; the pack's labels are the live ones.
- **"Excess face at 20% contradicts the 40% definition" is intentional.** REA_02 §5h says the P4 excess face shows at abundant or dominant; `carry.excess` (the valence flip) fires only at dominant. Two selectors, two thresholds, both documented. The reassessment already withdrew this.
- **"Burial belongs to 辛, never 庚" is an owner ruling with a recorded classical basis** (REA_04 line 393). The reviewer's 三命通会 citation may justify softening "never" to "house image", but I could not re-verify the citation from this environment and it does not change the shipped lines.
- **The humanized-prose skill's "older dash allowance" cannot be checked here.** `.claude/skills/` is gitignored (`**/.claude/*`); only `agents/` and `settings.json` are tracked. The file exists on the owner's laptop only.
- **k2_overview lines (M22 furniture, M26 aquifers) are off-page ore**, per REA_03 and `devVariables.js`. No reader sees them. No action.

Net: the architecture (pair definition → weighted Ten God ledger → pair advice; valence × volume; door-tagged pools under `echo_of`) is sound and should not be reopened. The work is three code fixes, roughly ten document edits, and about fifteen targeted station lines, plus a small number of owner decisions listed in §5.

---

## 2. Prioritized disposition table

Categories: **Confirmed issue** (reproduced or read on `d5887801`) · **Already fixed** · **Intentional design** (a recorded ruling covers it) · **Editorial preference** (owner call; the original may win) · **Unresolved policy question** (needs a ruling) · **Outdated / not reproducible**.

Priority: P1 ship-blocking inconsistency · P2 source contradiction or consequential claim · P3 documentation · P4 editorial comparison.

### 2a. Assembly and engine

| ID | Finding | Disposition | Verified on `d5887801` | Where | Pri |
|---|---|---|---|---|---|
| B9 | Shadows leak from ineligible doors | **Confirmed issue** | Weak 丁 (Wood 30 / Fire 15 / Earth 5 / Metal 10 / Water 40): eligible shadow doors = `[order]` only; output = *Takes it personally* [order] + *Can't cool down* [body], while Body is a catalyst. Synthetic strong 庚 (Metal 5 / Earth 5 / Wood 30 / Fire 30 / Water 30): eligible shadow doors = `[]`; output = three shadows (*Tense all over*, *Never reconsiders*, *Lives inside plans*) from the Balanced baseline. | `Elementum_App/src/content/resolveVariant.js:68` (`if (!list.length) return pool.slice(0, 3)`) and `:85-88` (floor of two, falls to `pool.find((x) => !used.has(x))`) | P1 |
| B10 | Energy-page turn contradicts the carry card at abundant wanted volume | **Confirmed issue (residual branch)** | Guide chart 庚: Wood 33% abundant catalyst. Carry seek row: "Wood is the widest door, the material the knife is for." Energy page turn: "Run thin, the knife has nothing to prune…". Same for all three abundant catalysts in the synthetic 庚 and for Wood 30% in weak 丁 ("Run thin, the flame eats scraps"). Thin unwanted (Metal 10, Earth 5 in weak 丁) now correctly read the `thin` line, so the 2026-09-16 migration did land everywhere except this branch. | `Elementum_App/src/components/journey/journeyData.js:449-457` (`stateTurn` has no wanted + abundant/dominant → `carry.wide` case; compare `buildCarryModel` `lineFor` at `:666`, which has it) | P1 |
| B11 | Two surfaces resolve one chart to different bands | **Confirmed issue (new fixture)** | Moderate 庚, Wood 40 / others 15: `ec.band` = open, carry lead "Metal runs Underfueled", but Your Nature is the Balanced variant ("You carry that same blade, and you carry it sheathed"). The reviewer's original Wood-30 fixture now resolves Balanced everywhere, as the reassessment says. | `Elementum_App/src/content/resolveVariant.js:25`, `:49`, `:105` (`getEnergyBand(chart.dayMaster.strength)`); should consume `ec.band` from `buildEnergyChart` | P1 |
| M6 | Order inner critic has no source | **Already fixed** | All ten Order shadows now echo `*_*.function.definition_friction` cells that carry the inner-judge sentence (ruling 2, 2026-09-17). Routing check passes: the shadow surfaces only through a present unwanted Order door, which is exactly the thin-core-heavy-Order condition; on the strong 庚 chart Order is a catalyst and the shadow does not show. | `Reading/Database/templates/by_axis/json/STEM/*.json` shadows[door=order]; `ELEMENT_PAIR/{木_金,火_水,土_木,金_火,水_土}.json` | done |
| n/a | Nine Order-shadow labels differ pack vs station | **Outdated** | Pack cut at `219cde92` (post-ruling); reviewer's code at `0104bd85` (pre-ruling). "Snaps under load" and "Doubts every spark" are not in any current pool. | `TRACE_EVIDENCE.json` → `packVsCurrentOrderShadows` | none |
| n/a | Exporter reports `_ORDER.json` mismatch | **Not reproducible** | `node tools/export-reading-templates.mjs` → "every code-mapped field in sync across 240 files", exit 0. | `Elementum_App/tools/export-reading-templates.mjs` | none |
| n/a | Excess face at abundant (20%) contradicts ≥40% | **Intentional design** | REA_02 §5h line 341: "the excess face when the energy is abundant or dominant." Distinct from `carry.excess` (dominant only). Pool shape confirms: Body and Mind carry echo + wide/excess; the three other doors carry one echo item. | `REA_02_Concept_Dictionary.md:341`; `resolveVariant.js:62` (`BIG`) | none |
| n/a | Dominant core is not flipped although the dictionary says "whatever the band" | **Unresolved policy question (D3)** | Moderate 庚 with Metal 60 / others 10 resolves Balanced; core role stays `core`, not friction. Code excludes the core deliberately; REA_02 line 341 does not say "non-core", line 342 (the guard) does. | `energyRoles.js:117-120` (`X !== dmEl`); `REA_02:341-342` | P3 |
| n/a | Minimum two chips vs one per eligible door cannot both hold | **Unresolved policy question (D2)** | Owner R3 was "two or three, follow the chart"; the floor of two is my implementation reading. With zero or one eligible door the floor must fabricate (this is the mechanism behind B9). | `resolveVariant.js:82-88`; `REA_02:339` (older rule: third slot from the heaviest door's second item) vs `:341` | P1 (blocks B9) |
| n/a | Balanced prevalence "about one in a thousand" unverified | **Intentional design, verified earlier** | The 33,604-chart re-scan (46 years) behind ruling 1 of 2026-09-17 measured ~0.1% at the dominant guard. | `REA_02:342` | none |
| n/a | 40% is a house threshold | **Intentional design** | Agreed and documented as such. No classical certification claimed. | `energyRoles.js` `VOLUME`; `REA_02:341` | none |

### 2b. Source and canon

| ID | Finding | Disposition | Verified on `d5887801` | Where | Pri |
|---|---|---|---|---|---|
| B2 | Fire/Wood excess source reversed | **Confirmed issue, source first (D1)** | The verse is 木多火炽 (fire blazes too fiercely). REA_04 glosses it "Fire self choked by fuel", and the station carries the smothering image: `carry.excess` "Too much wood chokes the fire…", `friction_turn` "the woodpile buries the fire". Dependents: 丙 *Buried in ideas* [mind/excess], 丁 *Smothered by plans* [mind/excess]. Both images are frictions; they are different mechanisms (burning out vs never lighting). | `REA_04_Knowledge_Pool.md:387`; `ELEMENT_PAIR/火_木.json` (`mechanism.friction_turn`, `carry.excess`); `STEM/bing.json`, `STEM/ding.json` shadows mind/excess | P2 |
| B3 | 水_火 Action friction gives opposite remedies | **Confirmed issue** | `definition_friction`: "urgency pulling on a system that runs deep and slow: hot chances chased…". `advise_friction`: "Keep a cooling-off rule". `mechanism.friction_turn` and `carry.friction`: "the managing never stops: every bright thing dampened into strategy… Let one blaze run wild and enjoy it." Definition and advice describe over-chasing; turn and carry describe over-managing and prescribe the opposite. The two 壬/癸 Action shadows follow the definition, so they are consistent. `carry.excess` ("Too much fire heats the water…") is also consistent with the definition. | `ELEMENT_PAIR/水_火.json` (`mechanism.friction_turn`, `carry.friction`) | P2 |
| Canon 3 | REA_04 §3.4 Earth relation labels | **Confirmed issue (doc only)** | Earth field: "produces precision for Metal DMs (食神/伤官)" should read 偏印/正印; "is generated by Fire DMs (偏印/正印)" should read 食神/伤官. The other four fields label from the Day Master's side correctly. The station is right (`金_土` = Mind). | `REA_04_Knowledge_Pool.md:664` | P3 |
| Canon 4 | "Deepens without redirecting" attributed to both Seals | **Confirmed issue (D6)** | REA_02 §2 gives it to 正印 The Sage ("the root that holds"); REA_04 lines 339, 734 and 1319 give it to 偏印 The Alchemist, and 1320 gives 正印 "deepens and opens toward something specific". `GOD/zhengyin.json` follows REA_02. | `REA_02:44`; `REA_04:339,734,1319-1320` | P3 |
| Canon 2 | REA_04 PART 8 global bans | **Confirmed outdated** | PART 8 bans all 汉字 and all persona names in user-facing text. REA_02 rule 2 allows 汉字 as texture beside the canonical name; REA_02 rule 4 requires persona names with their definition line; the Domains god sub-blocks ship persona + defline (`journeyData.js:560-566`). REA_16 rules per surface (e.g. no ten-god names on the P4 pools). | `REA_04_Knowledge_Pool.md:1199-1330` | P3 |
| Canon 1 | REA_01 / REA_05 retain older counts and statuses | **Confirmed drift** | REA_01's normative taxonomy table has no ELEMENT_PAIR ×25 or TG_PATTERN ×9 rows although both station folders exist and REA_03 rows 139 and 142 register them. REA_05 §4 still lists "Faces/deep pages (PLANNED)". | `REA_01_Archetype_System.md` taxonomy table; `REA_05_Generation_Architecture.md` §4 | P3 |
| Canon 7 | Older same-door rule not struck | **Confirmed doc tension** | REA_02 line 339 still states "third slot filled from the heaviest catalyst's second item"; line 341 states one chip per door, two or three. Code follows 341 plus a floor of two. | `REA_02:339` vs `:341` | P3 |
| Canon 9 | Duplicate REA_16 registry rows | **Confirmed (minor)** | `station:ELEMENT_PAIR.mechanism` appears at lines 170 and 172 with different registers; `station:ELEMENT_GOD.*` pending row at 177 alongside locked per-field rows. The dash-allowance claim about the skill file is unverifiable in the repo. | `REA_16_The_Voice.md:170,172,177` | P3 |
| Canon 10 | Surface status | **Confirmed with corrections** | `k2_overview` off-page (ore). `k2_functional` is LIVE as the god sub-block function line (`journeyData.js:564`); `devVariables.js:108` still labels it OFF-PAGE. `k2_domain_readings` LIVE, Seeker-gated. `fn_reading` LIVE. | `journeyData.js:560-566`; `devVariables.js:108` | P3 |
| M9 | 庚 Earth "burial" | **Intentional design (owner ruling), wording note** | REA_04 line 393 records the ruling and its 滴天髓 basis. The yang lines read weight/stall ("clogs… stalls, brooding"), the yin 辛 lines read burial. One holdout: `金_土.mechanism.friction_turn` still says "Comfort begins to bury what it formed." The reviewer's 三命通会 卷十二 citation was not re-verified here. | `REA_04:393`; `ELEMENT_PAIR/金_土.json` | P4 (D5 optional) |
| M10 | 辛 Fire yin carry | **Intentional design** | `carry_yin` and `mechanism_yin` are owner-ruled (2026-09-16, 2026-09-17). A classical sibling review is welcome but is not a defect. | `ELEMENT_PAIR/金_火.json` | none |
| M11 | Part A 正官 definition line abstract, dashed | **Unresolved policy question (already open)** | REA_16 §6, 2026-08-05: "Defline dash question for the other nine stays open." The defline ships in the Domains god sub-blocks. | `REA_02:42`; `GOD/zhengguan.json`; `journeyData.js:562` | P3 |
| M12 | Domineering / Magistrate | **Split** | Rename withdrawn: intentional. `GOD/qisha.json` `adj_friction` still carries "Domineering", which the 2026-09-04 vocabulary zone names as the banned register; the god-grain tables are fallback only, so this is hygiene. | `GOD/qisha.json`; `REA_02:152` | P4 |

### 2c. Reading content (station)

| ID | Finding | Disposition | Verified on `d5887801` | Where | Pri |
|---|---|---|---|---|---|
| B1 | Financial guarantees | **Confirmed issue (editorial, consequential)** | "You will never be flashy and never be broke. Invest in quality…" (Wealth, Seeker-gated); "everything in your portfolio gains a little every quarter, forever" (Slow and steady, trait door, live ledger). 木_正财 Wealth prescribes "land, skills, dividends". | `ELEMENT_GOD/金_正财.json` `k2_domain_readings.Wealth`, `fn_reading.catalyst` [Slow and steady]; `ELEMENT_GOD/木_正财.json` `k2_domain_readings.Wealth` | P2 |
| B8 | Safety-critical competence | **Confirmed issue (editorial)** | "the medication schedule… The double-checkers who review you have quietly stopped" (Thorough, outside door, live). 水_正印 Serene scene "pan lid, baking soda, window, done" (live). | `ELEMENT_GOD/金_正财.json` `fn_reading.catalyst` [Thorough]; `ELEMENT_GOD/水_正印.json` `fn_reading.catalyst` [Serene] | P2 |
| B7 | Invented biography, others' private judgments | **Narrowed; specific lines confirmed** | "placing quiet bets on when the crash lands" (木_七杀 Overdriven outside); "told your partner the neighbors were splitting up three months before the moving truck confirmed it" (木_偏印 scene, M16); "You knew the couple was fighting before they did" (癸 *Feels the undercurrent*); "Three months later it turned out to be the whole story" (丁 *Misses nothing*). Ordinary scenes with objects and clock-time stay. | `ELEMENT_GOD/木_七杀.json`, `木_偏印.json`; `STEM/gui.json`, `STEM/ding.json` | P2 |
| B6 | Echo chain changes the mechanism | **Confirmed for three items** | 丁 *Rekindles people*: source is "heat becoming things that last: lessons, systems, traditions"; desc is rescuing a friend's belief. 己 *Too agreeable*: source is "so much steadiness nothing new can root" (rigidity); desc is compliance ("It is always fine"). 癸 *Feels the undercurrent*: source is the wide door (plentiful exact sources); desc is a private-knowledge claim. All three are re-derivable under REA_16 §7 without changing their sources. | `STEM/ding.json`, `STEM/ji.json`, `STEM/gui.json`; sources `ELEMENT_PAIR/火_土.json`, `土_土.json`, `水_金.json` | P2 |
| M20 | Children "fruitful and fond of you" | **Confirmed issue (editorial)** | Present, Seeker-gated. Guarantees other people's affection. | `ELEMENT_GOD/木_食神.json` `k2_domain_readings.Children` | P2 |
| M23 | Learning "out-earn every credential" | **Confirmed issue (editorial)** | Present, Seeker-gated. Economic guarantee; "credential" is above the B1–B2 zone (the 2026-09-04 zone pass swapped it in the doors but not here). | `ELEMENT_GOD/土_偏印.json` `k2_domain_readings.Learning` | P2 |
| M14 | "espalier" | **Confirmed issue (editorial, one line)** | Live via the god sub-block function line. Above the vocabulary zone and carries the mechanism. | `ELEMENT_GOD/木_七杀.json` `k2_functional`; consumer `journeyData.js:564` | P3 |
| M15 | "The full program breaks everyone who tries it wholesale" | **Confirmed (editorial)** | Present, live outside door. | `ELEMENT_GOD/木_七杀.json` `fn_reading` [Hard-trained] | P3 |
| M17 | Mother "either way" | **Confirmed (editorial)** | Present, Seeker-gated. | `ELEMENT_GOD/水_正印.json` `k2_domain_readings.Mother` | P3 |
| M8 | "widest" | **Confirmed wording issue (D4)** | All 25 `carry.wide` clauses (plus yin variants) say "X is the widest door". With two abundant wanted energies both would claim it; with a tie (Earth 33 / Wood 33 on the guide chart) the superlative is unranked. | `ELEMENT_PAIR/*.json` `carry.wide`, `carry_yin.wide` | P3 |
| B4 | Shadow labels read as gifts | **Editorial preference; v5 check** | *Outshines everyone*, *Mentors everyone*, *Manages everything*, *Makes it permanent* are live. Descriptions carry the cost; phrase law v5 asks the chip alone to read its valence. Owner read-through, not a forced rename. | `STEM/bing.json`, `gui.json`, `wu.json`, `ding.json` | P4 |
| B5 | "Never looks tired" praises concealment | **Editorial preference (narrowed)** | Faithful to its source ("holds form long after the fuel is low, so you notice depletion late"). The desc's "Nobody sees you run down" is the only line that reads as approval of hiding. | `STEM/geng.json` gifts body/echo | P4 |
| M1 | 戊 inscription "nothing has ever offered to hold you" | **Editorial preference (locked corpus, D7)** | Present. An emotional absolute in a cost beat. Inscription law says specific and private, not universal. | `STEM/wu.json` `inscription` | P4 |
| M2 | 辛 "What you release is flawless" | **Editorial preference (locked corpus, D7)** | Present. | `STEM_BAND/xin_concentrated.json` | P4 |
| M3 | 乙 open "than it used to" | **Editorial (minor logical issue, D7)** | Present in `yi_open` and `bing_open` presence line. A band is a state, not a life stage; "used to" implies decline over time. | `STEM_BAND/yi_open.json`, `bing_open.json` | P4 |
| M5 | 癸 "you have never broken one" | **Editorial preference** | Present twice (gift desc and band portrait). Reassurance is valid; certainty of a perfect record is the question. | `STEM/gui.json` | P4 |
| M7 | Shoulders and jaw | **Editorial preference (keep)** | Present. Embodied metaphor, not diagnosis. | `ELEMENT_PAIR/金_金.json` `definition_friction` | none |
| M18, M19 | Course at fifty-five; "plant a decade in" | **Editorial preference (keep)** | Present. Representative scenes and preferences, not prescriptions. | `ELEMENT_GOD/木_正印.json`, `木_正官.json` | none |
| M21 | "cautious animal" | **Editorial comparison** | Present. Reader test question. | `ELEMENT_GOD/木_正财.json` [Plays it safe] outside | P4 |
| M24 | "No-frills" friction chip | **Conditional (keep unless the ledger contradicts)** | Present as a friction chip. Plainness reads as a cost only with its ledger. | `ELEMENT_GOD/金_正财.json` `adj_chips.friction` | P4 |
| M13 | 七杀 teaser "sharpened by the trials" | **Editorial (minor)** | Present. Contains an em-dash ("head-on — decisive"), which the reading-content dash ban covers. | `GOD/qisha.json` `face_teaser` | P4 |
| M4 | 壬 strong nature | **Editorial preference (keep)** | Present. "More moves through your head in a day than most people ship in a month" is rhetorical range, not a measured comparison. | `STEM_BAND/ren_concentrated.json` | none |
| M22, M26 | Furniture; aquifers | **Off-page ore** | `k2_overview` is not rendered. | `ELEMENT_GOD/火_七杀.json`, `水_正印.json` `k2_overview` | none |
| n/a | 101 flagged traits require replacement | **Withdrawn by the reassessment; agree** | The ledger is review evidence. Under §7 the pools were re-derived once already (2026-09-16); the acceptance protocol applies item by item. | `140_TRAIT_LEDGER.md` | none |

---

## 3. Implementation plan

Three lanes, in dependency order. Lane A can start once D2 is answered; lane B needs D1, D3, D6; lane C follows B for the two source-first cells and can otherwise proceed under the acceptance protocol.

### Lane A: assembly fixes (code only, no content)

1. **A1 · Unify the band (B11).** `resolveArchetype`, `archetypeKeyFor` and `variantKeys` in `resolveVariant.js` take the resolved band from `buildEnergyChart` (`ec.band`) instead of `getEnergyBand(strength)`. `readingResolve.js` passes it through; audit the other callers (Self-Report composer, consultant payload, `devVariables`) so no surface keeps the raw path. Keep raw strength available for debugging only.
   - Regression: moderate 庚 Wood 40 → Your Nature, carry lead and energy pages all say Underfueled/open. Moderate 庚 Wood 30 stays Balanced everywhere.
   - Expect golden drift in `qa-engine-regression` for every chart where a dominant non-core energy flipped a moderate core out of Balanced. Re-bless with a note, as done twice before for ruled Tier-B drift.

2. **A2 · Make selection mode explicit (B9).** In `selectPoolByDoor`: `doors === undefined` means Balanced baseline (pool order ×3, under the Balanced bridge); `doors = []` means an explicitly empty selection and returns `[]`. Remove the cross-door fallback in the floor (`pool.find((x) => !used.has(x))`). Whether a same-door second face may fill a second slot depends on D2; if allowed, it must pass the volume gate (abundant or dominant) like any other big-face pick.
   - `poolDoors` in `journeyData.js` already distinguishes Balanced (`m.balanced`) from an empty eligible set; pass `undefined` for the former.
   - P4 layout: `ReadingDayMasterCard.jsx` and `tpl_pool_bridge.json` need a zero-item and a one-item state (a bridge line such as "No energy in your chart overgrows {Arch} today" is content, small, and belongs to lane C).
   - Regression: weak 丁 → shadows = [*Takes it personally*] only (or plus the Order door's second face if D2 allows one). Synthetic 庚 → shadows = []. Balanced fixture → 3+3 unchanged.

3. **A3 · Route abundant wanted energy to `carry.wide` on the energy page (B10).** In `stateTurn` add: wanted, non-core, volume abundant or dominant → `carry.wide.clause`. `wide` has no remedy; the carry card already renders it bare, so parity is immediate. If the owner wants a directive on the page, authoring `wide.remedy` (≤12 words ×25) is a lane C item.
   - Regression: guide chart Wood 33 → page turn matches the carry line. Thin unwanted lines unchanged.

4. **A4 · "widest" (M8), if D4 = rank.** Compute the top-share wanted energy once in `buildJourneyModel`; only it selects `wide`; other abundant wanted energies fall back to the catalyst turn (which is the thin story, so this option needs a new mid line). This is why I recommend the reword option instead (lane C, no code).

5. **A5 · Dev label.** `devVariables.js:108`: `k2_functional` is live in the god sub-blocks; only `k2_overview` is ore.

6. **A6 · Fixtures as a permanent gate.** Add `tools/qa-selection-fixtures.mjs` carrying the six fixtures in this response (guide 庚, weak 丁, synthetic 庚, moderate 庚 Wood 30, Wood 40, core 60) plus one yin stem with heavy Earth (辛) for `mechanism_yin`, asserting band parity across `ec.band`, Your Nature variant, carry lead and page turns, and asserting door eligibility of every chip. Run it with the existing gates: eslint (57-warning baseline, 0 errors), build, `qa-journey-sweep` 18/18, `qa-engine-regression`, voice audit, export audit.

7. **A7 · Re-scan report.** Re-run the 33,604-chart scan and report: charts whose chip count drops to 1 or 0 per side (D2 sizing), charts whose Your Nature variant changes (A1), and charts whose page turn changes (A3). Publish the counts in the commit message and REA_16 §6.

### Lane B: source and document reconciliation

1. **B1 · 火_木 excess (D1).** Decide the reading of 木多火炽. Then, in one chain: REA_04 line 387 gloss → `火_木.mechanism.friction_turn` and `carry.excess` (yang) and any `mechanism_yin` turn → 丙 *Buried in ideas* and 丁 *Smothered by plans* re-derived under §7. Record the ruling in REA_04 §1.x change log and REA_16 §6.
2. **B2 · REA_04 §3.4 Earth field.** Swap the two labels. Note in the §3.4 header that all five fields label from the Day Master's side.
3. **B3 · Seal phrase (D6).** Make REA_02 §2 the canon (it is the locked dictionary). Add a reconciliation note at REA_04 lines 339, 734 and 1319-1320, or rewrite them to match. `GOD/zhengyin.json` already follows REA_02.
4. **B4 · REA_02 §5h.** Mark line 339 superseded by 341 (the one-per-door law); add "non-core" to the excess sentence on 341 per D3; append the D2 outcome as a dated ruling row.
5. **B5 · REA_04 PART 8.** Add a superseded banner: layer rules now live in REA_02 rules 2 and 4 (glyph texture, persona + defline) and REA_16 §2c per surface. Keep the body as history.
6. **B6 · REA_01 taxonomy table.** Add ELEMENT_PAIR ×25 (station `ELEMENT_PAIR/`, construct: mechanism · function · carry · carry_yin · mechanism_yin) and TG_PATTERN ×9. Refresh REA_05 §4's consumption map (element page, P4 pools, carry card, Domains sub-blocks are live; "Faces/deep pages (PLANNED)" is stale).
7. **B7 · REA_16 §2c hygiene.** Merge the two `station:ELEMENT_PAIR.mechanism` rows (170 and 172; the v2 register row wins), retire or scope the `station:ELEMENT_GOD.*` pending row (177). Log every lane B change in §6.
8. **B8 · REA_04 line 393 (D5, optional).** If the 三命通会 卷十二 citation checks out, soften "The 埋 image belongs to 辛" to "the house keeps the 埋 image for 辛; 三命通会 卷十二 also applies it to yang metal under heavy Earth" and leave the shipped lines alone. Also decide whether `金_土.mechanism.friction_turn` "Comfort begins to bury what it formed" should follow the yang wording ("stalls").
9. **B9 · `GOD/qisha.json` `adj_friction`.** "Domineering" → "Bossy" or mark the god-grain ADJ tables as ore in REA_02 §5d and REA_16.

### Lane C: editorial work (station JSON, under REA_16 §7 and the acceptance protocol)

Method: for every candidate, record field path, source axis, selected state, source claim, original, candidate, reason, and status (retain / adopt / revise / unresolved), as LANGUAGE_USE_RECOMMENDATIONS prescribes. Author in station JSON, regenerate twins, transcribe, run the audits. The original may win.

1. **C1 · Consequential claims (eight passages, P2).** `金_正财` Wealth (solvency), `金_正财` [Slow and steady] trait ("forever"), `金_正财` [Thorough] outside (medication, double-checkers), `水_正印` [Serene] scene (procedure checklist), `木_七杀` [Overdriven] outside (quiet bets), `木_偏印` scene (neighbors), `木_食神` Children, `土_偏印` Learning. Keep every scene's function; remove the guarantee, the private knowledge or the safety-critical demonstration.
2. **C2 · Echo-chain repairs (four items, P2).** 丁 *Rekindles people*, 己 *Too agreeable*, 癸 *Feels the undercurrent*, 丁 *Misses nothing* (desc only). Re-derive from the recorded `echo_of` under §7; phrase law v5.
3. **C3 · `水_火` friction turn and carry (B3, P2).** Rewrite `mechanism.friction_turn` and `carry.friction` to the definition's direction (over-chasing heat; the remedy is to let the next hot thing wait). Leave definition, advice and excess as they are.
4. **C4 · `火_木` after D1 (P2).** See B1.
5. **C5 · `carry.wide` reword (D4, P3).** "X is the widest door" → "X is a wide door" across 25 cells plus the yin variants, or the rank option in lane A.
6. **C6 · Vocabulary zone stragglers (P3).** `木_七杀` `k2_functional` "espalier"; `土_偏印` Learning "credential"; `GOD/qisha.json` teaser em-dash.
7. **C7 · Phrase law v5 read-through (P4).** The owner's parked read of the 140 items, now with the reviewer's fourteen ambiguity flags as the first stop: *Outshines everyone*, *Mentors everyone*, *Manages everything*, *Makes it permanent*, *Settles in*, *Never looks tired*, *Quality guaranteed*, *Prices it right*, *Careful finisher*, *First-handshake read*, *Misses nothing*, *Buried in ideas*, *Too agreeable*, *Rekindles people*.
8. **C8 · Locked band portraits and inscriptions (D7, P4).** M1, M2, M3, M5 as comparison candidates only, if the owner opens the locked corpus.
9. **C9 · Zero- and one-chip bridge lines** for lane A2 (`TEMPLATED/tpl_pool_bridge.json`).

---

## 4. Original versus proposed: language examples

These preserve the second person, the elemental image and the emotional register. They fix only the claim that fails. Each is a candidate for the acceptance protocol, not approved copy. Word counts respect the field budgets in REA_16 §2c.

**4.1 · 金_正财 Wealth (Seeker-gated domain reading). Guarantee removed, relationship kept.**

Original:
> You will never be flashy and never be broke. Invest in quality that holds its edge, including your own skills.

Proposed:
> You are never flashy about money, and you hate not knowing where it went. Buy the thing that still earns its place a year on, and treat your own skills the same way.

**4.2 · 水_火 friction turn (mechanism, ≤35 words). Turn aligned to the definition; the image stays in the pair's chemistry.**

Original:
> Run heavy, the managing never stops: every bright thing dampened into strategy, no fire left just for warmth. Let one blaze run wild and enjoy it.

Proposed:
> Run heavy, the water starts to boil: every bright chance chased, every quick pivot taken, each one costing more recovery than it returns. Let the next hot offer wait a week.

The carry clause and remedy are cut from this in the usual way: "The water starts to boil: every bright chance chased, each one costing more recovery than it returns." / "Let the next hot offer wait a week."

**4.3 · 丁 Expression gift (echo of 火_土 definition_catalyst: heat becoming things that last). Label stays warm; the mechanism returns to durable output.**

Original label and description:
> **Rekindles people** · Your belief in someone works at close range and lasts. A friend arrives half given up, and somewhere over tea at your table, the pilot light catches again.

Proposed:
> **Warmth that lasts** · Your heat turns into things that stay: the lesson someone still uses, the Sunday dinner that became a tradition. Long after the evening ends, people are still standing on what you made.

If the owner prefers to keep *Rekindles people*, the description needs the close-range warmth to land on something durable (what the friend leaves with, and still has a year later). The label alone cannot carry the source.

**4.4 · 己 Body excess shadow (echo of 土_土 carry.excess: so much steadiness nothing new can root). Compliance becomes rigidity, which is what the source says.**

Original:
> **Too agreeable** · So much ground given over to everyone else that nothing of your own can root. The group picks the plan and you say it is fine. It is always fine.

Proposed:
> **Set in stone** · So much settled ground that nothing new can take root. The plan that worked once is still the plan, and the fresh idea never gets past the doorway.

**4.5 · 癸 Mind wide gift (echo of 水_金 carry.wide: the spring that keeps your depth refilled). Private-knowledge claim removed; the early feel stays.**

Original:
> **Feels the undercurrent** · Fed by exact sources, the feel arrives early. You knew the couple was fighting before they did.

Proposed:
> **Feels the undercurrent** · Fed by exact sources, the feel arrives early. The room has shifted before anyone says so, and your tone has already changed to meet it.

**4.6 · 木_七杀 [Overdriven] outside door (35–55 words). Observable effect on others, no betting pool, no forecast.**

Original:
> Friends have stopped suggesting you slow down and started placing quiet bets on when the crash lands. The bets have gotten shorter every year. Nobody says so…

Proposed:
> Friends stopped suggesting you slow down a while ago. Now they watch your pace the way you watch weather, and they save their real questions for the rare evening you sit still. They are not waiting for a crash. They are waiting for you to notice the speed yourself.

**4.7 · 水_正印 [Serene] scene door. Scene and calm kept, the procedure checklist dropped.**

Original:
> …your voice never left its usual register: pan lid, baking soda, window, done. The story afterward was all about the flames.

Proposed:
> The pan catches while the guests are still taking off their coats. You cut the heat, cover it, open a window, and your voice never leaves its usual register. Afterward everyone tells it as the night of the fire. You remember it as a Tuesday.

This is a partial disagreement with the reviewer, who wants the emergency out of the scene entirely. A kitchen flare-up handled calmly is an ordinary scene; what read as instruction was the list. The reviewer's meeting-room candidate (LANGUAGE_USE_RECOMMENDATIONS §E) is a fair alternative if the owner prefers no fire at all.

**4.8 · 辛 concentrated Your Nature (locked corpus, D7). Felt difficulty kept, perfection removed.**

Original:
> What you release is flawless because releasing is the hard part.

Proposed (the reviewer's restrained variant, which I endorse):
> Releasing is the hard part. You still see the flaw after the work is ready to leave.

**4.9 · 火_木 excess (pending D1). Shown for the verse reading only.**

Original:
> Too much wood chokes the fire: fuel stacked past burning, the flame smothered by its own supply. · Pull a branch off. Strike.

Proposed, if 木多火炽 is read as the blaze running past its task:
> Too much wood feeds the fire past its task: every idea lights the next before the first is done. · Burn one pile at a time.

Then 丙 *Buried in ideas* would become something like *Too many fires* and 丁 *Smothered by plans* something like *Lights the next one*, each re-derived from the new line. If the owner keeps the smothering reading, the REA_04 gloss should say so explicitly as a house interpretation and nothing downstream changes.

---

## 5. Required validation and owner decisions

### Validation before any push

- The six fixtures in §2a plus a yin-stem fixture, as a permanent gate (`tools/qa-selection-fixtures.mjs`), asserting band parity across surfaces and door eligibility of every chip.
- Existing gates in the usual order: `build-template-twins` → transcription → `export-reading-templates` (default mode; never `--harvest`) → `voice-audit` → eslint (0 errors) → build → `qa-journey-sweep` 18/18 → `qa-engine-regression` (re-bless once for A1 with the count of charts whose band changed).
- The 33,604-chart re-scan with three counts: chip-count distribution per side after A2, Your Nature variant changes after A1, page-turn changes after A3.
- A P4 visual pass on `dev.elementum.life` for the one-chip and zero-chip layouts, and for a Balanced chart to confirm the baseline still renders 3+3 under its bridge.
- For every lane C line: the acceptance protocol record (original, candidate, source trace, status), read aloud, compared against its door siblings and the neighbouring stem.
- Reader testing remains the missing evidence for every "resonance" claim on either side. Until it exists, no rewrite should be described as more resonant; only as source-true, in budget and zone-clean.

### Decisions that need the owner

| # | Question | Options | My recommendation |
|---|---|---|---|
| D1 | How do we read 木多火炽 for 火_木 excess? | (a) The verse: too much fuel makes the fire blaze past its task, burning out and scattering. (b) The house image: fuel stacked so high the flame never lights. | (a). It follows the verse and the other four idioms in the set are read literally. Rewrite the gloss, the two lines and the two chips as one chain. |
| D2 | When fewer than two doors qualify for a side, how many chips show? | (a) Zero or one, with a bridge line that says so. (b) Keep a floor of two but only from an eligible door's second face when its volume allows. (c) Keep the current floor (fabricates from ineligible doors). | (a). It is the honest reading of "two or three, follow the chart" and removes the whole B9 mechanism. (b) is acceptable; (c) is not. |
| D3 | Does a dominant core flip to friction? | (a) No; the core's excess is already the band's job (Overfueled), and the dictionary adds "non-core". (b) Yes; flip the core like any other energy. | (a). Code already does this; only REA_02 line 341 needs the word. |
| D4 | "the widest door" | (a) Reword all 25 wide lines to "a wide door". (b) Rank: only the largest wanted energy gets `wide`. | (a). Cheaper, always true, no new mid-volume line to author. |
| D5 | REA_04 line 393 wording on 埋 | (a) Keep. (b) Soften "belongs to 辛" to a house choice after verifying the 三命通会 citation. | (b) if the citation holds; the shipped lines do not change either way. |
| D6 | Which Seal "deepens without redirecting"? | (a) REA_02 §2 (正印 The Sage) is canon; annotate REA_04. (b) REA_04 §3.5/§8.5 (偏印) is canon; amend REA_02 and `GOD/zhengyin.json`. | (a). REA_02 is the locked dictionary and the station follows it. |
| D7 | Open the locked band portraits and inscriptions (M1, M2, M3, M5) to the comparison protocol? | (a) Yes, as candidates only. (b) Keep locked. | (a) for M2 and M3 (a factual absolute and a time claim in a static band); (b) for M1 and M5 unless the read-aloud says otherwise. |
| D8 | The definition-line dash and register (open since 2026-08-05) | (a) Dashless deflines, plainer clause after the name. (b) Keep. | (a), scheduled with lane B; it is one line per god and ships in the Domains sub-blocks. |

### What I recommend we do not do

- No batch rewrite of the 101 flagged traits; the pools were re-derived once under §7 and the protocol is item by item.
- No renaming of The Magistrate or any locked persona.
- No global "can / when / if" prefixing; keep the three doors and the direct portraits.
- No removal of ordinary scenes, objects or clock-time.
- No change to the dominance wheel, the 40% house thresholds or the abundant-tier excess face.

---

## 6. Owner rulings, 2026-09-20

Taken one by one with a before-and-after rendering on the golden chart (1995-04-29 18:00 Beijing, 庚 The Blade, Overfueled, Earth 33 / Wood 33 / Metal 23 / Water 6 / Fire 5) or, where that chart does not exercise the decision, on the nearest chart that does. Nothing has been applied yet.

| # | Ruling | What changes at execution | Golden chart |
|---|---|---|---|
| D1 | 木多火炽 is read literally: too much fuel makes the fire blaze past its task. | REA_04 line 387 gloss and the "intake that smothers" header; `火_木` definition_friction, advise_friction, mechanism.friction_turn, carry.friction, carry.excess, carry.spared; 丙 Mind echo label *Chokes on fuel* → *Chases every idea*. The labels *Buried in ideas*, *Never ready enough* and *Smothered by plans* stay; only their descriptions move to the new mechanism. | unchanged (Metal core) |
| D1 rule | **Phrase law v6:** a chip names the symptom, the lived pattern the person recognises. Never a prescription, never a bare image without the symptom. | REA_16 §7 | n/a |
| D1 rule | Previews and carry-card copy carry no signs (arrows and the like). The card renders clause and remedy as two plain lines. | preview method; a sweep of content modules for stray signs | n/a |
| D2 | One chip per open door. Body and Mind, when they are the only open door, keep both faces (17.4% of charts, unchanged). Order, Action and Expression single doors show one chip and never borrow from Body (8.1% of charts go from two shadows to one). With no open door the shadow side hides entirely (11 charts in 33,604). Balanced baseline 3+3 unchanged. | `resolveVariant.js` selectPoolByDoor: explicit Balanced mode, no cross-door floor; `ReadingDayMasterCard.jsx` hides an empty side; pool note gains One and Two. | unchanged (3 + 2) |
| D3 | The core stays exempt from the 40% flip. No code change and no dictionary change. | none | unchanged |
| D4 | "the widest door" → "a wide door" in all 25 `carry.wide` clauses and the yin variants. **Amended later the same day:** the owner found "wide door" hard to comprehend; the 27 lines dropped the metaphor and the word door no longer reaches the reader anywhere. **Amended again:** one opener everywhere read as a template; eight plain openers now rotate so no core repeats one (golden chart: "Wood is already here in plenty, the material the knife is for."). Each wide line gets a remedy (≤12 words ×25), drafted as a batch for owner review before landing. The energy page routes a wanted abundant or dominant energy to the wide clause plus its remedy (the B10 fix). | `ELEMENT_PAIR/*.json` carry.wide, carry_yin.wide; `journeyData.js` stateTurn | Wood page turn: "Wood is a wide door, the material the knife is for. Cut what is already in front of you. Finish it." replaces "Run thin, the knife has nothing to prune…" |
| D5 | Leave both: the `金_土` friction turn keeps "Comfort begins to bury what it formed" and REA_04 line 393 keeps its wording. The 三命通会 citation could not be checked (proxy blocks the sources). | none | unchanged |
| D6 | REA_02 §2 owns "nourishment that deepens without redirecting" (The Sage). REA_04 lines 339, 734 and 1319-1320 get a reconciliation note. | REA_04 notes | unchanged |
| D8 | God definition lines join with a comma, no dash: "Unconventional nourishment, the insight that transmutes." Ten lines. | REA_02 §2, `GOD/*.json` definition_line, `TG_DEFLINE` in code | Earth page Alchemist line |
| D7 | 辛 concentrated nature: "Releasing is the hard part. You still see the flaw after the work is ready to leave." 乙 open nature: "The winding costs more in this season, so you pick your walls with care." 戊 inscription and 癸 lines stay. | `STEM_BAND/xin_concentrated.json`, `yi_open.json` (+ `stemVariants.js`) | unchanged |
| B3 | `水_火` heavy turn approved: "Run heavy, the water starts to boil: every bright chance chased, every quick pivot taken, each one costing more recovery than it returns. Let the next hot offer wait a week." Carry clause and remedy cut from it. | `ELEMENT_PAIR/水_火.json` | unchanged |

Scan behind D2 (33,604 charts, 1960 to 2005, two hours per day): shadow doors open none 0.03%, one 25.5%, two 58.4%, three or four 15.9%, Balanced 0.08%. Of the one-door charts, 17.4% of all charts are Body or Mind (second face shown), 8.1% are Order, Action or Expression (second chip borrowed from Body today). Gift doors open: one 1.0%, two 56.4%, three 42.6%.

Still to be shown as candidate batches during execution, under the same before-and-after method: the 25 wide remedies (D4), the four D1 descriptions, the eight consequential-claim passages (lane C1), the three echo-chain items (lane C2), and the documentation edits (lane B).

### 6a. Rulings added after the proof review (2026-09-20, later)

| # | Ruling | What changes at execution |
|---|---|---|
| R-rep | **No phrase repeats across the fields of one cell or the surfaces of one chart.** Each field keeps its own job: definition (what the friction or gift is, in life terms), turn (elemental image of the state plus one directive), advice (the practical programme), chip description (the moment a person recognises). Mechanical check: no shared four-word run, stop-word-only runs ignored. | REA_16 §7 (phrase law v6 gains the field-angle rule); `tools/voice-audit.mjs` gains the four-word check chip-vs-source and field-vs-field. The D1 and B3 drafts were redrafted under it (RULINGS_PROOF_2026-09-20.md). |
| R-carry | The 2026-09-15 carry law stands: the carry card clause and remedy are the turn's cut and are the one allowed match between surfaces. | none (the audit whitelists carry ↔ turn and yin ↔ yang) |
| C3 | Re-cut the 65 chip descriptions that copy runs of their source definition (61 echo faces, 4 excess faces; seven on the golden chart's 庚 pool) plus the five single overlaps inside 土_木, 木_火 and 水_木. Labels and `echo_of` links stay. Shown as a reviewed before-and-after batch before landing. | `STEM/*.json` descs; three `ELEMENT_PAIR` cells |

### 6b. Proof review verdicts (owner 2026-09-20, later)

| Item | Verdict | Effect at execution |
|---|---|---|
| 丙 Wood 45%: chip description *Buried in ideas*, carry ease row and remedy, Wood definition, Wood turn | After wins | The D1 redrafts land as shown in RULINGS_PROOF_2026-09-20.md (post-repetition-check versions). |
| Advice field, all examples | **Before wins.** The `advise_catalyst` / `advise_friction` texts stay as authored everywhere, 火_木 included ("Readiness is proven only in the open…"). | No advice line changes in this pass. The owner's own words: the older version wins across these examples. |
| Pool note (`tpl_pool_note`, the P4 chip-card foot "Five of the Blade's fourteen…") | Remove from the card. | `ReadingDayMasterCard.jsx` drops the line; the template stays in the station as ore; REA_16 §2c row → retired. |

Correction (owner, same day): the 火_木 `advise_friction` takes the plain redraft below (54 words, inside the 60-word budget, clean under the repetition check). Every other advice line stays as authored.

> You start more than you finish. Finish the one project closest to done this month, as it is, and let it ship at eighty percent. Put every new course, book or plan on a list until that one is out. When the urge to start something rises, ask which unfinished thing it would replace.

### 6c. Batch landings

| Batch | Status | Commit |
|---|---|---|
| 2 · 63 chip descriptions re-cut off their sources | **Withdrawn 2026-09-20.** The owner compared the first four side by side and kept the originals four out of four: the tight cut of the definition's own nouns is the sharper line. The repetition law is narrowed to the fields of one cell on one page; a chip echoing its definition across pages is the derivation law, like the carry line echoing the turn. The audit's chip-vs-source check is removed. The five within-cell overlaps (土_木, 木_火, 水_木) remain the only C3 items. | — |
| 1 · 20 wide remedies (27 with yin) | **Approved and landed 2026-09-20.** `carry.wide.remedy` / `carry_yin.wide.remedy`; the energy page and the carry card add the remedy after the plentiful clause. | see git log |
| 3 · 10 consequential-claim passages | **Ruled row by row and landed 2026-09-20.** 1 Wealth: After. 2 Slow and steady: Before (unchanged). 3 Thorough: After. 4 Serene: Before's scene with After's last line ("You remember it as a Tuesday."). 5 Nurture: shortened ("The nourishing thread runs like groundwater. Where care came early, you draw on it without thinking. You refill it where it ran dry."), and the Sage's third domain word renamed **Mother → Nurture** in `GOD/zhengyin.json`, the five Sage cells' `k2_domain_readings` keys and `k2.js`; the other four Sage readings open "The nurturing thread" for the same reason. 6 Overdriven: shortened and ending on who you are ("You are not built for slow. You are built to keep going until it is done."). 7 function line: "Your discipline is a strict coach: cut the extras, keep the goal, hold the line for years." 8 Perceptive: the trait head-on ("You read a table in the time it takes to sit down…"). 9 Children: said plainly ("You are patient with children and students…"). 10 Learning: After. "room" swapped out of 8 and 9 for the corpus ration. | see git log |
| 4 · 4 echo-chain chips | **Ruled row by row and landed 2026-09-20.** 丁 *Rekindles people*: straightforward description ("…What you give a friend over one evening, a push, a plan, a way to see it, is still holding them up a year later."). 己 *Too agreeable* → **Stuck in your ways** (dim: changing course), the rigidity the source names; a fixed four-word idiom, admitted as the one named exception to the three-word phrase law (REA_16 §7, the audit's list). 癸 *Feels the undercurrent* and 丁 *Misses nothing*: After (the private-knowledge claim and the confirmed prediction gone). | see git log |
| Follow-up · the other four Sage Nurture readings | **Landed 2026-09-20** in the Water shape (owner: "fix the other four the same way"): "The nourishing thread {element image}. Where care came early, you draw on it without thinking. Where it {ran thin / was cold / was missing}, you {grew your own / lit your own / became the ground yourself / set your own standard}. {one directive}." The "either way / either origin" shape is gone from all five. | see git log |
| Follow-up · the five within-cell overlaps | **Landed 2026-09-21.** 土_木 spared clause ("nobody leans on you, the ground keeps its own"); 木_火 missing remedy ("Borrow fire: put one piece in front of people.") and spared remedy ("Keep it green. Show the work once it is finished."); 水_木 heavy turn and its carry cut ("every still thing gets watered"). The narrowed repetition check reports zero findings; it can turn blocking with `rep-block` on the ELEMENT_PAIR rows. | see git log |
| Follow-up · the cold read of the 140 labels | **Landed 2026-09-21.** 57 of 140 labels replaced after the owner read every label cold, stem by stem; five four-word idioms admitted; the keyword-chip root check retired with the retired chips. Full map in THE_140_LABELS_COLD.md. | see git log |
| Follow-up · the eight open copy items from the verification pass (O1–O8) | **Landed 2026-09-21.** O1–O3 ruled After one by one; O4–O8 by the owner's blanket "proceed with all your recommended options". Details in CLAUDE_VERIFICATION_2026-09-21.md §7. | see git log |
| Follow-up · the non-copy items O9–O13 | **Closed 2026-09-21** (O9 teasers sign-free and the FACE_CARD row locked; O10 Bossy fallback; O13 boundary and god-blend fixtures). O11 and O12 are laptop-only and queued as a task card. Details in CLAUDE_VERIFICATION_2026-09-21.md §7. | see git log |
