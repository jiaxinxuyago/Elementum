# Harness self-test: the shipping originals through the pack's own gate

Date: 2026-09-21. Head: `06e38605` (station unchanged). Pack: REA_17 v0.3. Harness: `harness/` (README there). Run: `harness/runs/2026-09-21-comparison.json`, the 31 cells the comparison will use, every original written to `out/<id>.original.json` and gated with `node harness/selftest.mjs`.

Why this run exists: REA_17 §0 rule 5 makes the shipping original a candidate on equal terms, so the gate has to hold it to the same rules. Twenty-five of thirty-one pass. The six that fail are listed below with the rule each trips and where that rule is ruled. Nothing was changed in the station; each row is the owner's to rule (keep the original and amend the rule's scope, or re-cut the line).

| # | Field path | Text (verbatim) | Finding | Law |
|---|---|---|---|---|
| 1 | `POSITION/piancai_day_branch.reading` | "…and your fortune **genuinely** likes it that way." | hollow-affirmation word | REA_04 PART 8 §8.9 (genuinely, fundamentally, at your core, in essence); REA_17 §1 |
| 2 | `STEM/ding.gifts[5].dim` · `STEM/ding.shadows[1].dim` | "the work you pick" · "the edge of attention" | dim of four words | REA_16 §7 step 5 (dim ≤3 words); REA_17 STEM.gifts card |
| 3 | `STEM/xin.shadows[0].desc` (Polishes forever) · `STEM/xin.shadows[4].desc` (Sharp tongue) | "Discipline with no outlet turns on the work. The tenth revision was ready. So was the sixth. The deadline passed while you fixed a flaw nobody else will ever perceive." · "Output with no banks. The remark was accurate and it was small, and it went in deeper than you meant. You forgot it by dinner. They did not." | desc of four sentences | REA_16 §7 step 3 (desc 1–3 sentences); REA_17 STEM.gifts card |
| 4 | `ELEMENT_GOD/水_七杀.k2_domain_readings.Command` | "…Show the hand **sometimes**. Trust grows where strategy is visible." | hedge word (here as a frequency, not a reflex) | REA_16 §3 bans (hedging: often / sometimes / may); the 2026-09-17 pack allows can / when / if where meaning needs them |
| 5 | `ELEMENT_GOD/木_偏财.k2_domain_readings.Father` | "…and plant the roots he **may** have skipped." | hedge word (here guarding a biography claim about the father) | same as 4; REA_17 §1 (no assumed biography) |
| 6 | `ELEMENT_PAIR/金_木.carry_yin.catalyst` against `mechanism_yin.catalyst_turn` | turn: "Run thin, **the point has nothing to work**: skill idling without a **piece** worth it. …" · carry_yin clause: "**The wheel has nothing to cut**: skill idling without a **stone** worth it." | the yin carry clause is not cut from the yin turn (the Jewel's page turn says point and piece, its carry card says wheel and stone) | REA_02 §5h (carry lines are cut from the turn); REA_17 ELEMENT_PAIR.carry card |

Two more things the gate surfaced as read flags, not failures:

- `STEM_BAND/ding_open.yourNature_desc` opens "You guard a smaller flame **these days**…, and you've learned what the guarding is worth." The band card says a band is a present state, never a decline from an earlier self (the D7 ruling, 2026-09-20). Read question for the owner, not a mechanical failure.
- `STEM_BAND.yourNature_desc` sentence 1 for 庚 Overfueled ("You are what the sword is like…") uses a noun the sign paragraph does not (sword), so the harness's "receives the sign's image" check is a note the read decides, not a rule.

What the gate also confirmed on the replication outputs (`out/T1..T6.sonnet.json`): T1, T2, T3, T4, T6 pass with the two new checks added; T5 (Sonnet's 癸 Underfueled portrait) now fails the cross-stem four-gram check twice: "you are what the" is copied from the Blade's exemplar, and "you keep for yourself" also sits in 丙 Balanced. Both are in the replication report's read notes as the angle drift; the gate now catches the copy mechanically. REA_17 v0.3 §0 rule 8 states the rule.

## Addendum, same day: the full golden set (133 variables, `runs/golden-all.json`)

After the folder reorganisation (`Feedbacks/` → `ComparativeAnalysis/`, the prompts moved to `Reading/Database/Prompts/`), every variable the golden chart reaches was assembled (133 prompts) and its shipping original gated. Ten fail. Two overlap with the table above (rows 1 and 5); the other eight are new. Seven of the ten trip the hedge rule, which is the ruling that matters most (rules register A10).

| # | Field path | Text (verbatim, the flagged word in bold) | Finding | Law |
|---|---|---|---|---|
| 7 | `ELEMENT_GOD/土_偏印.k2_domain_readings.Learning` | "What you learn that way **tends to** outlast anything you learned for a grade." | hedge | REA_16 §3 (A10) |
| 8 | `ELEMENT_GOD/土_偏印.fn_reading.friction.ledger[1].doors.outside` (Brooding) | "What people read as calm is **often** storage, thoughts settling in layers…" | hedge | A10 |
| 9 | `ELEMENT_GOD/木_偏财.adj_chips.catalyst[1]` | "**Enterprising**" | report-card register word, banned by name | REA_16 §2c THE VOCABULARY ZONE ④ (owner 2026-09-04) (A8) |
| 10 | `ELEMENT_GOD/水_食神.fn_reading.catalyst.ledger[0].doors.trait` (Fluent) | "You **genuinely** do not know where the words are before they arrive." | hollow-affirmation word | REA_04 §8.9 (A5) |
| 11 | `POSITION/zhengcai_year_stem.reading` · `.domain_readings.Family` | "…advice worth taking and **sometimes** property worth keeping." · "You **may** become the family treasurer early." | hedge ×2 | A10 |
| 12 | `POSITION/zhengcai_year_stem.turn_catalyst` · `.turn_friction` | "**With this energy thin in you**, the seat asks for practice…" · "**With this energy running heavy**, the seat over-counts…" | the only seat of 70 whose turns do not open "Run thin," / "Run heavy," | the POSITION.turn_catalyst card (69 of 70 cells follow the formula) (C3) |
| 13 | `TG_PATTERN/bi_jie_duo_cai.fused_line` | "…write things down early and **often**." | hedge (here an adverb of frequency in a directive) | A10 |
| 14 | `POSITION/shishen_year_branch.reading` · `.domain_readings.Health` | "Blessing in your line flows downhill through the older generation, **often** by way of the kitchen." · "Your constitution is **fundamentally** friendly…" | hedge · hollow-affirmation word | A10 · A5 |

What the addendum shows: the words often, sometimes, may and tends to appear in the shipping corpus as frequency and meaning words, not only as reflex hedges. The mechanical rule as the pack states it cannot tell the two apart. The owner's ruling on A10 (keep the list mechanical and re-cut the corpus, or narrow the mechanical rule to a shorter reflex list and leave the rest to the read) decides seven of these ten rows and every future candidate.

Two validator corrections made while gating the full set, so the numbers above are the corpus's, not the tool's: the manifesto's identity formula ("You are the Metal that…") is shared by all ten stems on purpose (REA_16 §3), so the cross-stem four-gram check no longer runs on manifestos and the card file was corrected; the "scene door carries an object or a clock time" and "outside door opens from other people" checks were heuristics that seven shipping doors did not match, so they are now notes for the reader, not gate failures.
