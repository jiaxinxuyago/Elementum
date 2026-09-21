# Verification of the ChatGPT evaluation pack against the shipping station

Date: 2026-09-21. Head verified: `3a05da26` on `main` (dev.elementum.life mirrors it; both Actions deploys green).
Companion to [CLAUDE_EVALUATION_RESPONSE.md](./CLAUDE_EVALUATION_RESPONSE.md) (the reconciliation and the rulings record). This file answers one question per item: is the pack's suggestion in the shipping corpus, and if not, why not.

## Method

- Every live field in `Reading/Database/templates/by_axis/json/` was walked (the `__ore` retired keys skipped) for each phrase the pack quotes or proposes. Station is truth; `export-reading-templates` reported 240 runtime files in sync at this head and the 330-check independent comparison found 0 mismatches.
- App consumers were traced for every field that still carries a flagged line, so a hit in a field no screen renders is reported as such.
- The voice audit was run at this head: 48 registry rows enforced, 0 blocking findings, 644 pending findings on 9 unruled surfaces.

Legend. **DONE** = the pack's suggestion is in the corpus or code. **OWNER** = the item was put to the owner and ruled, either differently from the pack or kept as it was. **FILTERED** = not implemented, with the reason (most often the pack's own reassessment withdrew or narrowed it). **OPEN** = still in the corpus and not yet put to the owner.

## 1. LANGUAGE_USE_RECOMMENDATIONS, examples A to G

| # | Pack suggestion | Status | What ships |
|---|---|---|---|
| A | Keep *Never good enough*; description optional | DONE | Label and original description unchanged in `STEM/jia.json` (owner passed 甲 in the cold read). |
| B | Keep *Keeps reworking it* unchanged | OWNER | Label became **Never calls it done** in the cold read (phrase law v6, a named four-word idiom). Description kept verbatim ("smaller brush… Done is a decision you keep reopening"). |
| C | *Takes it personally*: drop "every time" | **OPEN** | `STEM/ding.json` shadow description still reads "…a criticism of your soul, every time." A one-phrase deletion, never put to the owner. |
| D | 辛 strong nature: remove "flawless", keep the felt difficulty | DONE | D7: "Releasing is the hard part. You still see the flaw after the work is ready to leave." (the pack's own restrained variant). |
| E | Serene scene: replace the compressed emergency procedure | OWNER | Batch 3 row 4: the owner kept the kitchen scene and its list, changed only the close ("You remember it as a Tuesday."). |
| F | Wealth: remove "never be broke" and the investment prescription | DONE | `金_正财` Wealth: "You are never flashy about money, and you hate not knowing where it went. Buy the thing that still earns its place a year on, and treat your own skills the same way." |
| G | *Rekindles people*: repair the source bridge, label may stay | DONE | Label kept (the pack's "if it can be supported" path); description now lands on what lasts: "…is still holding them up a year later." |

## 2. LANGUAGE_COMPARISONS, examples 1 to 12

| # | Item | Status | What ships |
|---|---|---|---|
| 1 | Never good enough | DONE | As A above. |
| 2 | Takes it personally, remove universal certainty | **OPEN** | As C above. |
| 3 | Keeps reworking it, keep unchanged | OWNER | As B above; the triad opening the pack asked to allow is kept. |
| 4 | Can't switch off: keep label and heat image, remove the asserted sleep symptom | **OPEN** | 丙 *Can't switch off* and 丁 *Can't cool down* both still open "More heat than your days can spend. Sleep will not come…". Never put to the owner. |
| 5 | Mentors everyone → clearer shadow label | OWNER | Cold read: **Everyone's helper** (owner's label, not the pack's *Gives too much*). |
| 6 | Misses nothing: resolve source mismatch, drop the three-month confirmation | OWNER | Batch 4 dropped "Three months later…"; cold read relabelled **Spots the detail**. `echo_of` stays on `火_木.carry.wide` by owner acceptance. |
| 7 | Rekindles people | DONE | As G above. |
| 8 | Quality guaranteed: remove the outcome guarantee | OWNER | Cold read: **Built to last**. The owner chose a label that owns the durability claim; the description ("years later your work is the one still holding up under inspection") is unchanged. |
| 9 | Jewel portrait | DONE | As D above. |
| 10 | Vine portrait: remove the assumed decline | DONE | D7 took the pack's own "still lighter option": second sentence only ("The winding costs more in this season, so you pick your walls with care."). Ending kept by the owner. |
| 11 | Steward wealth | DONE | As F above. |
| 12 | Serene scene | OWNER | As E above. |

## 3. SYSTEM_ALIGNED_REASSESSMENT, the 37 ranked findings

| ID | Status | Evidence at head |
|---|---|---|
| B1 financial promises | DONE / OWNER / **OPEN** | `金_正财` Wealth fixed (F). `金_正财` [Slow and steady] "gains a little every quarter, forever": owner kept Before (Batch 3 row 2). **Open:** `木_正财` Wealth still prescribes holdings: "Buy things that grow, land, skills, dividends…". |
| B2 Fire/Wood excess | DONE | D1: 木多火炽 read literally; REA_04 gloss, `火_木` definition/turn/carry/advice, 丙 and 丁 chips re-derived. "chokes the fire" gone. |
| B3 opposite Action remedies | DONE | `水_火` heavy turn and carry: "the water starts to boil… Let the next hot offer wait a week." |
| B4 shadows read as gifts | OWNER | Cold read: Outshines everyone → **Steals the spotlight**, Mentors everyone → **Everyone's helper**, Manages everything → **Micromanages**, Makes it permanent → **Overplans the fun**. *Settles in* kept. |
| B5 Never looks tired | FILTERED (owner) | Label and description kept in the cold read; the reassessment itself narrowed this to a portrait question. |
| B6 echo chain changes mechanism | DONE | Batch 4: 己 Too agreeable → **Resists change** (rigidity, the source's claim); 丁 Rekindles people and 癸 Feels the undercurrent descriptions re-derived. |
| B7 invented biography | DONE | "quiet bets", "neighbors splitting up", "fond of you", "three months later", the Mother either-way story: all gone. Ordinary scenes with objects and clock-time kept, per the narrowing. |
| B8 guaranteed competence | DONE / OWNER | [Thorough] medication and double-checkers passage replaced (Batch 3 row 3). [Serene] kitchen scene kept by the owner (E). |
| B9 ineligible shadows | DONE | `selectPoolByDoor`: one chip per open door, no cross-door borrow, explicit Balanced 3+3, empty side hides. Fixtures gate. |
| B10 thin/heavy contradiction | DONE | `stateTurn` routes a wanted abundant or dominant energy to the wide clause plus its remedy. Golden chart Wood page opens "Wood is already here in plenty…". |
| B11 split band | DONE | One band passed from the screen into `resolveArchetype`; fixtures for Wood 30 (Balanced) and Wood 40 (open). |
| M1 戊 inscription | OWNER | D7: 戊 stays. The inscription is not on a live surface (awaiting dm_claims). |
| M2 flawless Jewel | DONE | As D. |
| M3 Vine "used to" | DONE | As 10. |
| M4 Ocean superiority | **OPEN** | `STEM_BAND/ren_concentrated.json`: "More moves through your head in a day than most people ship in a month." Not in D7 (which covered 戊, 辛, 乙, 癸); never put to the owner. |
| M5 "signal never broken" | OWNER / **OPEN** | D7: the 癸 open nature line stays. **Open (small):** the 癸 gift *Keeps secrets safe* still ends "and you have never broken one", an absolute about history the pack's rule targets. |
| M6 Order inner critic | DONE | Source locked 2026-09-17; nothing further. |
| M7 shoulder/jaw | FILTERED | Reassessment: an embodied metaphor is not a diagnosis. 庚 *Tense all over* kept in the cold read. |
| M8 "widest" | DONE | No wide line says widest. The 丁 manifesto "burns closest, not widest" is range, not volume. |
| M9 Geng burial | OWNER | D5: `金_土` turn and REA_04 line 393 both kept. |
| M10 Xin/Fire carry source review | **OPEN (blocked)** | Classical sources unreachable from this environment (proxy). Needs the owner's laptop or a pasted passage. |
| M11 abstract god definition | DONE | D8: ten deflines comma-joined and plainer ("Unconventional nourishment, the insight that transmutes."). |
| M12 Domineering / Magistrate | DONE / FILTERED | Live axis: `火_七杀` chips say **Bossy**; all 50 ELEMENT_GOD cells carry their own chips, so the god-grain fallback never renders. Housekeeping: `GOD/qisha.json` adj_friction and `journeyData.js` ADJ_FRICTION still list "Domineering" in that dead fallback. Persona rename withdrawn by the pack. |
| M13 "adversity sharpens" teaser | **OPEN (unruled surface)** | `GOD/qisha.json` face_teaser and `FACE_CARD` in code keep "You're sharpened by the trials you would never have chosen" and an em-dash. The faces page merged into the element screen 2026-08-19; no journey component renders `faces[].teaser`. The row sits in the audit's pending inventory (8 teasers with em-dashes). |
| M14 espalier | DONE | Gone; `木_七杀` k2_functional: "Your discipline is a strict coach…". |
| M15 program "breaks everyone" | **OPEN** | `木_七杀` [Hard-trained] outside door: "The full program breaks everyone who tries it wholesale." Batch 3 covered the [Overdriven] door, not this one. |
| M16 neighbors splitting up | DONE | Perceptive scene: "You read a table in the time it takes to sit down…". |
| M17 Mother either-way | DONE | All five Sage Nurture readings in the Water shape; domain renamed Mother → Nurture. |
| M18 course at fifty-five | FILTERED | B7 narrowing: a representative learning scene with objects is authorised scene craft; it asserts no confirmed vindication. |
| M19 decade career horizon | FILTERED | `木_正官` Career reads as preference ("Choose organizations you would plant a decade in"), which the reassessment allows. |
| M20 fruitful/fond children | DONE | `木_食神` Children: "You are patient with children and students…". |
| M21 cautious animal | **OPEN (editorial)** | `木_正财` [Plays it safe] outside door unchanged. The reassessment asks for a reader test; none exists. |
| M22 dangerous to furniture | FILTERED | Humour permitted; `火_七杀` k2_overview is locked corpus (2026-08-19). |
| M23 out-earns credentials | DONE | `土_偏印` Learning rewritten (Batch 3 row 10). The `水_正印` Knowledge line "more than your credentials admit" is not an economic claim. |
| M24 No-frills | FILTERED | Kept; the three doors under it carry the cost, which is the reassessment's condition for keeping the chip. |
| M25 kitchen fire | OWNER | As E. |
| M26 aquifers | FILTERED | Locked overview; metaphor allowed; no comprehension evidence against it. |

## 4. Canon reconciliation, items 1 to 10

| # | Item | Status | Where |
|---|---|---|---|
| 1 | Active-field contract | DONE (differently) | REA_02 §5h ("one chip per OPEN door") plus the dated rulings rows in REA_16 §6 and REA_02; no separate versioned policy file. |
| 2 | Translation protocol by layer | DONE | REA_04 PART 8 banner. |
| 3 | Earth relation labels | DONE | REA_04 §3.4 corrected. |
| 4 | Resource sibling language | DONE | D6: REA_02 §2 owns "deepens without redirecting" (The Sage); REA_04 annotated. |
| 5 | Fire/Wood gloss | DONE | D1 gloss in REA_04. |
| 6 | Valence × volume completion claim | DONE | B10 branch fixed; REA_02 rulings row records it. |
| 7 | Balanced and counts | DONE | D2. |
| 8 | Core dominance | DONE | D3; non-core wording in REA_02. |
| 9 | Voice lint scope | PARTIAL | REA_16 §2c duplicate rows merged. The humanized-prose skill file is gitignored and cannot be checked from this session. |
| 10 | Surface status | DONE | Keywords are ore; `face` ruled selection metadata (REA_03); k2_functional LIVE. |

## 5. ASSEMBLY_IMPLEMENTATION_SPEC, sections 1 to 8

| § | Status | Notes |
|---|---|---|
| 1 Active contract | DONE | The five questions are all ruled (D2, D3, REA_02 §5h). |
| 2 One presentation state | DONE / FILTERED | One `band` flows from the screen to nature, chips and carry; Balanced mode explicit. No `policyVersion` or `contentVersion` fields were added; the station-to-runtime audit does that job. |
| 3 Explicit trait selection | DONE | Fixtures cover weak 丁 (one Order door), synthetic 庚 (empty stays empty), Balanced 3+3, lone Mind door, core exempt, yin stem. |
| 4 Valence × volume | DONE / **OPEN (tests)** | The missing branch is fixed. The boundary matrix (just below, at and above 0.5, 10, 20, 40) has not been run as a fixture set. |
| 5 Weighted god ledger | preserved | Untouched by this work. |
| 6 Echo reasoning and scoped imagery | DONE | D1 and B3 repaired as chains; Batch 4 re-derived the echo chips; mechanism_yin overrides untouched. |
| 7 Author through the workflow | DONE | Every landing went station → twins → transcription → audits → build → sweeps. |
| 8 Acceptance evidence | PARTIAL | Run: 8 selection fixtures, engine regression, 18/18 journey sweep, 33,604-chart re-scan, 330-check sync. Not run: the boundary matrix, the 59.9/60/60.1 and 50/50 god-blend cases, the all-25 sibling-pair reachable-blend audit. |

## 6. FULL_EVALUATION §4, §5, §6

**§4 systemic patterns.** 1 anecdote-as-proof: narrowed (B7) and applied to every flagged passage; no global rule. 2 Barnum: filtered, no reader test exists and no resonance claim is made anywhere in the records. 3 valence/volume collapse: done in the engine classifier and `stateTurn`. 4 enforced source chain: `echo_of` and `face` are recorded on all 140 chips; the owner ruled the derivation law (a chip is cut from its definition's own nouns), so no per-source mechanism statement was added. 5 two voices: deflines dashless (D8); the FACE_CARD teasers and other unruled surfaces remain in the 644-finding pending inventory. 6 sibling imagery: filtered (D5). 7 overuse explains every friction: done, the state set now distinguishes missing, thin, spared, excess and wide. 8 snapshot identity: the export audit compares station to runtime file by file and every record cites its commit; no content hash on exports.

**§5 house-rule disagreements (ten).** Balanced math: documented as non-core (D3). Two chips versus eligibility: D2. Dominant core: D3. Excess face at 20%: kept, the reassessment withdrew the objection. 40% threshold: kept as a house threshold (out of scope by standing constraint). Burial: D5. Inner judge: locked source. Never-hedge: kept, withdrawn by the reassessment. Cost on every positive chip: no rule change. Magistrate: withdrawn.

**§6 fifteen rewrite candidates.** None of the pack's proposed labels was adopted verbatim; the owner read all 140 labels cold and chose their own under phrase law v6. Outcomes: 14 kept · 20 kept · 37 **Steals the spotlight** · 39 kept (description moved to the D1 mechanism) · 46 **Spots the detail** · 47 kept, description fixed · 54 **Overplans the fun** · 79 **Resists change** · 85 kept · 86 **Finishes properly** · 87 kept · 104 kept · 105 **Built to last** · 130 kept, description fixed · 138 **Everyone's helper**.

## 7. Still open

Copy items, each a small edit, drafted for a row-by-row ruling. **Landed 2026-09-21:** O1, O2 and O3 were ruled After one by one; the owner then ruled O4 to O8 to proceed with the recommended text ("I've noticed these small language tweaking, you can proceed automatically with all your recommended options"). All eight are in the station and the runtime (gates green, see the commit). One departure from the table: O5 keeps a short second clause ("and nobody on shore would guess how much") so the 壬 portrait stays inside its 50–75 word budget (57 words).

| # | Field | Before | Proposed |
|---|---|---|---|
| O1 | 丁 *Takes it personally* desc | "…lands as a criticism of your soul, every time. The checking costs more…" | "…lands as a criticism of your soul. The checking costs more…" |
| O2 | 丙 *Can't switch off* desc | "More heat than your days can spend. Sleep will not come, intensity leaks into every conversation, and rest feels like a punishment." | "More heat than your days can spend. The day will not end on time, intensity leaks into every conversation, and rest feels like a punishment." |
| O3 | 丁 *Can't cool down* desc | "…Sleep will not come, and the intensity leaks into every conversation until rest feels like punishment." | "…The evening will not end, and the intensity leaks into every conversation until rest feels like punishment." |
| O4 | 癸 *Keeps secrets safe* desc | "…the half-formed hope, and you have never broken one." | "…the half-formed hope, and they stay where they were put." |
| O5 | 壬 concentrated nature | "More moves through your head in a day than most people ship in a month, and the surface shows almost none of it." | "More moves through your head in a day than ever reaches the surface." |
| O6 | `木_正财` Wealth | "Buy things that grow, land, skills, dividends, and let time do the heaviest lifting. It intends to." | "You like what grows on its own, a skill, a plot, a stake left alone, and you let time do the heaviest lifting. It intends to." |
| O7 | `木_七杀` [Hard-trained] outside | "The full program breaks everyone who tries it wholesale." | "Nobody manages the full program in one go." |
| O8 | `木_正财` [Plays it safe] outside | "People bring you opportunities the way they feed a cautious animal, slowly and with both hands visible." | "People bring you opportunities gently, one at a time, with the exit left open." (editorial; the original may win) |

Non-copy items (owner 2026-09-21: "close the non-copy items too, O9 to O13"):

- **O9 · CLOSED.** The ten face teasers are sign-free in the station (`GOD/*.json` face_teaser) and in the code twin (`FACE_CARD`): eight em-dashes to commas or periods, the 偏财 semicolon to a period, the rationed word "room" swapped three times (place, crowd, gatherings). The 七杀 line "sharpened by the trials you would never have chosen" stays: it names a pressure response, which the reassessment preserves. The REA_16 `code:reading#FACE_CARD` row is now locked, so the audit enforces it; the field remains unrendered on the journey (faces merged into the element screen 2026-08-19, R5 scope still open).
- **O10 · CLOSED.** 七杀 "Domineering" → "Bossy" in REA_02 §4b, `GOD/qisha.json` and the `ADJ_FRICTION` fallback table, so the dead fallback matches the live `火_七杀` chip.
- **O11 · LAPTOP.** Every classical-text route is blocked from this environment (wikisource, shidianguji, guoxuedashi, the web archive). Queued as a task card for the primary laptop together with O12: check 滴天髓 and 三命通會 for the 庚/辛 burial caveat and 窮通寶鑑 for the 辛/Fire condition, and document the result without changing the D5-ruled lines.
- **O12 · LAPTOP.** The humanized-prose skill file is gitignored and absent from the cloud clone. Same task card: remove its trailing dash allowance and log the fix in REA_16 §6.
- **O13 · CLOSED.** `tools/qa-selection-fixtures.mjs` now runs the boundary matrix and the god-blend matrix from spec §4 and §8. Classifier: 12 points around 0.5, 10, 20 and 40; Balanced guard at 39.9 / 40 / 40.1 and core 60. Assembled page turns: ten states across 0 / 1, 10 / 11, 19 / 20 and 39 / 40 for a wanted (Wood) and an unwanted (Earth) energy on a strong 庚, each asserting the right line (missing, catalyst turn, wide, excess, spared, thin, friction turn) and that no abundant wanted energy reads thin and no thin unwanted energy reads heavy. Ledger: single face 3 rows, 59.4 → 2+2, 60 and 60.6 → 2+1, reversed lead, 50/50 tie with the yang face leading, door rotation trait / scene / outside by position, card chips equal the ledger words, and a balanced face split never reads as the Balanced chart. One finding for the record: the model compares the rounded whole-percent share the card displays, so 59.5 to 59.9 read as 60 and take the 2+1 shape, in step with the shown number. All green at head.

## 8. Tally

| Bucket | Count |
|---|---|
| Language recommendations A–G: done or owner-ruled | 7 of 7 examples ruled or landed, 1 sub-item open (C) |
| Comparisons 1–12: done or owner-ruled | 10 of 12; open: 2 (Takes it personally), 4 (sleep symptom) |
| Reassessment 37 findings: done | 22 |
| Reassessment 37 findings: owner-ruled or filtered | 12 |
| Reassessment 37 findings: open | 7 (B1 one cell, M4, M5 one chip, M10, M13, M15, M21) |
| Canon items done | 9 of 10 (9 partial) |
| Spec sections done | 7 of 8 (§8 partial on test matrices) |
