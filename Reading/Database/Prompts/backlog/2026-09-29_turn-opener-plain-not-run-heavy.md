# Backlog · the state line's opener: plain and prescriptive, not "Run heavy," (owner feedback, 2026-09-29, at Q30 of the blind read)

**Status: APPLIED 2026-09-29 (commit 907439c). Ruled 2026-09-29 (owner, by questionnaire): OPTION 3, the free opener under the plain-terms law (parts 3.1 to 3.10). "Run thin," and "Run heavy," are retired. The reference lead-in the owner picked for the card's exemplars and the harness's guidance is "With too much {Element}, …" / "With too little {Element}, …" (plain, the element named, not a fixed phrase: any plain statement of the element and its volume passes). The 50 pair turns, 19 yin turns and 140 seat turns are re-cut under the new law in the next round, gated and ruled row by row. Application pending the backlog apply pass.** Cards affected: `fields/ELEMENT_PAIR/ELEMENT_PAIR.mechanism.catalyst_turn.md` (both turns), `fields/ELEMENT_PAIR/ELEMENT_PAIR.carry.md` (the cut law follows the opener), `fields/POSITION/POSITION.turn_catalyst.md` (the seat turns use the same formula), the register row C3, REA_16 §2c (the mechanism row) and the harness opener checks.

## The takeaway, as the owner put it

Every state line opens "Run heavy," or "Run thin," (the seat turns too). That is too upfront: a reader who does not yet know what "running heavy" means meets the phrase cold. The line should give its prescriptive conclusion in plain terms, in a syntax such as "Having too much Wood would …" or "When Earth is running heavy, …". If all the variables are to share one syntax, it can be a different phrase than the current one. Open the field up to more variations.

## What is at stake

- The opener is a locked formula (REA_16 §2c mechanism row; the card: "Run thin, …" / "Run heavy, …"), used in all 50 pair turns, 19 yin overrides, and 140 seat turns (the 2026-09-21 ruling Q8 re-cut the one seat that skipped it). The carry law cuts the carry clause from the turn after the opener, so the opener change and the cut law move together.
- The term the opener leans on (heavy / thin) is the volume vocabulary of the manual; the page shows the definition line for Overfueled / Underfueled elsewhere, but the turn is the first place the reader meets "running heavy" as a phrase.

## Three ways to open it up (for the owner's ruling)

1. **A plain unified opener, templated, no re-authoring.** The app renders the turn with a slot lead-in from the element and the state ("When Earth runs heavy, …" / "When Water runs thin, …"), and the authored turn drops its "Run heavy," so the cut law is unchanged (the clause is still the turn's first clause). One TEMPLATED sentence pattern (REA_03 §5) covers all 209 turns. Cheapest, and it keeps one syntax everywhere.
2. **A small set of plain openers per state, authored per cell.** Like the eight wide openers: "When {Element} runs heavy," · "Too much {Element} and …" · "With {Element} this strong, …" · "Having too much {Element} would …"; the friction and catalyst sets differ; no core repeats one across its energies. More voice, more work (re-cut 50 + 19 + 140 lines), and the harness checks against the set instead of one string.
3. **Free opener, plain-terms law only.** The card says: open on a plain statement of the state in the reader's terms (the element and the volume named in ordinary words), the image, the cost, one directive; no fixed phrase. The most variation, the hardest to keep consistent across 25 cells and ten stems.

The manual's own definition lines (REA_02 §5c: "More fuel comes in than your core burns…") already speak the state in plain terms, so whichever option is chosen, the turn's opener can echo that register rather than the word "heavy".

## Action items

- [x] Owner rules option 1, 2 or 3 (or a mix: 1 for the seats, 2 for the pair cells).
- [x] Update the two turn cards, the carry card's cut law wording, the POSITION.turn card, register C3, the REA_16 §2c mechanism row note and §6; update the opener checks in `lib.mjs`, `validate-template.mjs` and `handoff.mjs`.
- [ ] If option 2 or 3: re-cut the turns in the next round with the new opener law, gated and ruled row by row; if option 1: a TEMPLATED row in REA_03 §5 and the render change in `buildElementScreen`.

## Draft patch (not applied)

_Drafted 2026-09-29 by the backlog drafter. Nothing below is applied. Every part is CONDITIONAL on the option the owner picks (1, 2 or 3, or a mix: the parts are written per option so a mix such as "1 for the seats, 2 for the pair cells" takes the seat parts from option 1 and the pair parts from option 2). Every "before" is the current text quoted verbatim, every "after" is the exact replacement under that option. Where an option leaves a line unchanged, the part says so._

**Facts checked before drafting.**
- The opener is enforced in four places, not three: `lib.mjs` line 171 (the pair turn task line), line 188 (the seat turn task line and its `stat`), line 234 (`validateTurnCarry`, the turn-plus-carry stat), and `handoff.mjs` line 52 (the spec's `opener` key). `validate-template.mjs` never names the string: line 26 turns any spec `opener` into a `theOpen` gate (`lib.mjs` line 271, "does not open with …"), and line 42 checks a spec `openers` array for the wide clause only. So option 1 and option 3 need no edit to `validate-template.mjs` (dropping the `opener` key from the spec removes the gate), and option 2 needs one generalisation of line 42. `lib.mjs` line 156 (`poleNoun`) also quotes the two phrases in the facts.
- The cut check (`lib.mjs` line 238) matches the carry clause inside the turn by lowercased `includes`, so it survives every option unchanged. Register F3 and the carry card's "its first clause and its own directive" stay true under every option, only the words that say where the first clause begins change.
- The station audit (`Elementum_App/tools/voice-audit.mjs`) does not check the opener (0 matches), so nothing changes there.
- The render point is `buildElementScreen` (`Elementum_App/src/components/journey/journeyData.js`, line 406), which picks the turn at lines 466 to 467 and hands it to `JourneyStage.jsx` line 704 (`<p className="body2" …>{elScreen.mech.turn}</p>`) under the label `turnLab` (line 417: "YOUR FRICTION — SKIP THIS" / "YOUR CATALYST — SEEK THIS"). The turn line, quoted:
  > `turn: stateTurn || (r.dx?.condition === 'Overfueled' ? mechanism.friction_turn`
  > `  : r.dx?.condition === 'Underfueled' ? mechanism.catalyst_turn : null),`
- The corpus: 50 pair turns, 19 yin overrides (`mechanism_yin`, the two turns where present), 140 seat turns. Under option 1 the station lines change mechanically (the opener stripped, the next letter capitalised), which is a script, not a re-authoring. The golden cell after the strip: friction "The shelter closes over the blade: so much preparation that the edge never leaves the mine. Comfort begins to bury what it formed. Dig out and cut something real." (its carry clause is already this sentence, so the cut becomes literal).

### The lead-in wording (all options share the plain terms)

The owner asked for the conclusion in plain terms. The manual's glossary (REA_02 §5c) already says the state plainly: a friction is "the energy already carrying weight", a catalyst is "the energy your chart runs short on". The drafts below use **"With too much {Element}, …"** for the friction state and **"With too little {Element}, …"** for the catalyst state: three plain words, the element named, the same syntax for every energy, and the authored clause follows unchanged. The owner's own examples are the alternatives, swapped by one word: "When {Element} is running heavy, …" (keeps the manual's word) or "Having too much {Element} would …" (changes the verb of the clause that follows, so it cannot be a lead-in to the existing lines, see option 2, part 2b).

---

## OPTION 1 · a plain lead-in rendered by the app, the authored turn drops its opener (CONDITIONAL on option 1)

### 1.1 · `fields/ELEMENT_PAIR/ELEMENT_PAIR.mechanism.catalyst_turn.md`

**1.1a · Construct.**

Before:
> - Construct: "Run thin, …" for the catalyst pole and "Run heavy, …" for the friction pole: the elemental image of the state in one clause, what it costs, then ONE directive. The friction turn speaks the shadow of the function.

After:
> - Construct: the elemental image of the state in one clause that opens the line, what it costs, then ONE directive. The app renders the state lead-in before it ("With too little {Element}, " on the catalyst pole, "With too much {Element}, " on the friction pole, the template `tpl_turn_lead`, REA_03 §5), and lowers the first letter of the authored line to join it, so the line is never written with "Run thin," or "Run heavy," and its first word is never a proper noun. The friction turn speaks the shadow of the function.

**1.1b · Style.**

Before:
> the turn is the field the carry clause and remedy are CUT from, so it must contain a first clause that stands alone and a directive that stands alone.

After:
> the turn is the field the carry clause and remedy are CUT from, so it opens on a first clause that stands alone (the carry clause is that clause, word for word) and ends on a directive that stands alone. Read the line with its lead-in in front to hear it as the reader will.

**1.1c · Checks.**

Before:
> - Checks: ≤35w, zero dashes, the repetition law (no four-word run shared with the definition or advice of the same cell).

After:
> - Checks: ≤35w, zero dashes, no "Run thin," or "Run heavy," opener (the lead-in is rendered), the first word not a proper noun, the repetition law (no four-word run shared with the definition or advice of the same cell).

**1.1d · Exemplar.**

Before:
> - Exemplar (金_土 friction): "Run heavy, the shelter closes over the blade: so much preparation that the edge never leaves the mine. Comfort begins to bury what it formed. Dig out and cut something real." · (水_火 friction, 2026-09-20): "Run heavy, the water starts to boil: every bright chance chased, every quick pivot taken, each one costing more recovery than it returns. Let the next hot offer wait a week."

After:
> - Exemplar (金_土 friction, rendered "With too much Earth, the shelter closes over the blade: …"): "The shelter closes over the blade: so much preparation that the edge never leaves the mine. Comfort begins to bury what it formed. Dig out and cut something real." · (水_火 friction, 2026-09-20, rendered "With too much Fire, the water starts to boil: …"): "The water starts to boil: every bright chance chased, every quick pivot taken, each one costing more recovery than it returns. Let the next hot offer wait a week."

**1.1e · Iteration log.** Append the row:

> | 2026-09-29 | The "Run thin," / "Run heavy," opener leaves the authored line, the app renders the plain lead-in "With too little / too much {Element}," (`tpl_turn_lead`), the 50 turns and 19 yin turns stripped by script | owner 2026-09-29, at Q30 of the blind read, option 1 (REA_16 §6) |

### 1.2 · `fields/ELEMENT_PAIR/ELEMENT_PAIR.mechanism_yin.md`, the exemplar

Before:
> - Exemplar (金_土 friction_turn for 辛): "Run heavy, the setting closes over the stone: so much preparation that the jewel never leaves the box. Comfort begins to bury what it formed. Take it out and wear it somewhere real."

After:
> - Exemplar (金_土 friction_turn for 辛, rendered "With too much Earth, the setting closes over the stone: …"): "The setting closes over the stone: so much preparation that the jewel never leaves the box. Comfort begins to bury what it formed. Take it out and wear it somewhere real."

### 1.3 · `fields/ELEMENT_PAIR/ELEMENT_PAIR.carry.md`, the cut law wording

**1.3a · Construct.**

Before:
> `catalyst` and `friction` are CUT from the pair's turn (its first clause and its own directive), never a second copy of the turn's meaning.

After:
> `catalyst` and `friction` are CUT from the pair's turn (its first clause, which is the turn's opening sentence now that the lead-in is rendered, and its own directive), never a second copy of the turn's meaning.

**1.3b · Checks.** No change ("except the lawful carry-from-turn cut" stays true).

### 1.4 · `fields/POSITION/POSITION.turn_catalyst.md`

**1.4a · Construct.**

Before:
> - Construct: "Run thin, the seat asks for …" / "Run heavy, … here" with one directive. Exemplar: "Run heavy, thought eats action here: research becomes the errand that never ends. Ship one thing before the next book."

After:
> - Construct: the catalyst turn opens "the seat asks for …", the friction turn opens on the seat's image "… here", each with one directive, ≤30 words. The app renders the state lead-in before the line ("With too little {Element}, " / "With too much {Element}, ", the seat's energy resolved per chart, `tpl_turn_lead`) and lowers the first letter to join it, so the line is never written with "Run thin," or "Run heavy,". Exemplar (friction, rendered "With too much Earth, thought eats action here: …"): "Thought eats action here: research becomes the errand that never ends. Ship one thing before the next book." · (catalyst, rendered "With too little Earth, the seat asks for study: …"): "The seat asks for study: claim one hour of deep reading daily and guard it like income."
> - Checks: ≤30w, zero dashes, no "Run thin," or "Run heavy," opener, the catalyst turn's first words "The seat asks for".

**1.4b · Iteration log.** Append the row:

> | 2026-09-29 | The opener leaves the authored line, the app renders the plain lead-in, the 140 seat turns stripped by script | owner 2026-09-29, at Q30 of the blind read, option 1 (REA_16 §6) |

### 1.5 · `02_RULES_REGISTER.md`, row C3

Before:
> | C3 | Every field keeps its budget, minimum and maximum both hard (owner 2026-09-23; `06_CAPS_BY_PAGE.md`); openers where the card demands one ("You", the archetype name, "Run thin," / "Run heavy,", "This position rules", the definition formula, "Your {Element}") | REA_16 §2c budgets; the field cards | harness · voice-audit (budgets) | explicit |

After:
> | C3 | Every field keeps its budget, minimum and maximum both hard (owner 2026-09-23, `06_CAPS_BY_PAGE.md`), and openers where the card demands one ("You", the archetype name, "This position rules", the definition formula, "Your {Element}", the seat catalyst turn's "The seat asks for"). The state turns carry no written opener: the app renders the plain lead-in "With too little / too much {Element}," (`tpl_turn_lead`, REA_03 §5) and the authored line opens on its first clause (owner 2026-09-29, option 1) | REA_16 §2c budgets, the field cards | harness · voice-audit (budgets) | RULED 2026-09-29 |

Iteration log row to append:

> | 2026-09-29 | C3: the state turns lose the "Run thin," / "Run heavy," opener, the lead-in is rendered from a template | owner 2026-09-29, at Q30 of the blind read, option 1 (REA_16 §6) |

### 1.6 · `06_CAPS_BY_PAGE.md` line 27

Before:
> | `ELEMENT_PAIR.mechanism.catalyst_turn` / `friction_turn` | the state line when the energy runs thin or heavy | 12 | 35 | "Run thin," / "Run heavy," then one directive |

After:
> | `ELEMENT_PAIR.mechanism.catalyst_turn` / `friction_turn` | the state line when the energy runs thin or heavy | 12 | 35 | opens on its first clause (the app renders "With too little / too much {Element}," before it), then one directive |

### 1.7 · REA_16 §2c, the `station:ELEMENT_PAIR.mechanism` row (line 171)

Append this sentence at the end of the row's note text (after "rep-block (the repetition law blocks here since 2026-09-21)"):

> **THE OPENER (owner 2026-09-29, at Q30 of the blind read, option 1): "Run thin," / "Run heavy," leaves the authored turns.** The reader met "running heavy" cold, before the manual had taught it. The app now renders a plain lead-in from `tpl_turn_lead` ("With too little {Element}, " for the catalyst turn, "With too much {Element}, " for the friction turn, first letter of the authored line lowered to join), and the authored turn opens on its first clause, which is the carry clause word for word. Same for `mechanism_yin` and the seat turns (`POSITION.turn_*`). 209 lines stripped by script, no re-authoring.

The two `station:POSITION.turn_*` rows (lines 165, 166) gain the same pointer, appended: "opener rendered by `tpl_turn_lead` since 2026-09-29, see the mechanism row".

### 1.8 · REA_16 §6 log row

> | 2026-09-29 | **THE STATE LINE'S OPENER, PLAIN AND RENDERED (owner, at Q30 of the blind read, option 1).** Every state turn opened "Run heavy," or "Run thin," (50 pair turns, 19 yin turns, 140 seat turns), and the reader met the phrase before the manual had taught it. Ruled: the opener leaves the authored line, and the app renders a plain lead-in from one template, `tpl_turn_lead` (REA_03 §5): "With too little {Element}, " before a catalyst turn, "With too much {Element}, " before a friction turn, the authored line's first letter lowered to join it. The authored turn now opens on its first clause, so the carry law's cut is literal (the carry clause is the turn's opening sentence) and unchanged in substance. Re-cut: the turn cards (pair, yin, seat), the carry card's cut wording, register C3, the 06 caps row, the harness (the four opener checks in lib.mjs and handoff.mjs, no change in validate-template.mjs since the spec drops its `opener` key), `buildElementScreen` (the lead-in joined at the turn line), and the station's 209 lines stripped by one script with the audit green after. Record: Reading/Database/Prompts/backlog/2026-09-29_turn-opener-plain-not-run-heavy.md. |

### 1.9 · The harness

**1.9a · `lib.mjs` line 156.**

Before:
> `const poleNoun = (pole) => pole === 'catalyst' ? 'catalyst (wanted, running thin: "Run thin,")' : 'friction (unwanted, running heavy: "Run heavy,")';`

After:
> `const poleNoun = (pole) => pole === 'catalyst' ? 'catalyst (wanted, running thin: the app renders "With too little {Element}," before its turn)' : 'friction (unwanted, running heavy: the app renders "With too much {Element}," before its turn)';`

**1.9b · `lib.mjs` line 171, the task line fragment.**

Before:
> `: ≤35 words, opens "${c.pole === 'catalyst' ? 'Run thin,' : 'Run heavy,'}", the elemental image of the state in one clause that stands alone, what it costs, then ONE plain directive that stands alone (the carry card cuts both from it).`

After:
> `: ≤35 words, opening on the elemental image of the state in one clause that stands alone (the app renders the lead-in "${c.pole === 'catalyst' ? 'With too little' : 'With too much'} {Element}," before it, so never write "Run thin," or "Run heavy," and never open on a proper noun), what it costs, then ONE plain directive that stands alone (the carry card cuts both from it).`

**1.9c · `lib.mjs` line 188, the seat task line and its stat.**

Before:
> `: ≤30 words, opens "${c.pole === 'catalyst' ? 'Run thin, the seat asks for' : 'Run heavy,'}" with one directive.`
> `stat(`opens "Run ${c.pole === 'catalyst' ? 'thin' : 'heavy'},"`, new RegExp(`^Run ${c.pole === 'catalyst' ? 'thin' : 'heavy'},`).test(o[k] || ''));`

After:
> `: ≤30 words, ${c.pole === 'catalyst' ? 'opens "The seat asks for"' : 'opens on the seat\'s image'} with one directive (the app renders the lead-in "${c.pole === 'catalyst' ? 'With too little' : 'With too much'} {Element}," before it, so never write "Run thin," or "Run heavy,").`
> `stat('no written opener (the lead-in is rendered)', !/^Run (thin|heavy),/.test(o[k] || '')); if (c.pole === 'catalyst') stat('opens "The seat asks for"', /^The seat asks for/.test(o[k] || ''));`

**1.9d · `lib.mjs` line 234, the stat in `validateTurnCarry`.**

Before:
> `stat(`turn opens "${c.pole === 'catalyst' ? 'Run thin,' : 'Run heavy,'}"`, new RegExp(`^Run ${c.pole === 'catalyst' ? 'thin' : 'heavy'},`).test(t || ''));`

After:
> `stat('turn carries no written opener (the lead-in is rendered)', !/^Run (thin|heavy),/.test(t || '')); stat('turn does not open on a proper noun', !/^(Wood|Fire|Earth|Metal|Water|The (Oak|Vine|Sun|Candle|Mountain|Field|Blade|Jewel|Ocean|Rain))\b/.test(t || ''));`

**1.9e · `handoff.mjs` line 52, the spec.**

Before:
> `opener: pole === 'catalyst' ? 'Run thin,' : 'Run heavy,', notes: 'the elemental image of the state in one clause that stands alone, what it costs, then ONE plain directive that stands alone; the carry line below is cut from it'`

After:
> `lead_in: pole === 'catalyst' ? `rendered by the app, never written: "With too little ${en}, "` : `rendered by the app, never written: "With too much ${en}, "`, notes: 'opens on the elemental image of the state in one clause that stands alone (first letter capitalised, the app lowers it to join the lead-in), what it costs, then ONE plain directive that stands alone, the carry line below is cut from it'`

**1.9f · `validate-template.mjs`.** No change: line 26 builds the `theOpen` gate from `s.opener`, and the key is gone. Line 66's exempt list reads `sp.opener` and tolerates its absence.

### 1.10 · REA_03 §5, the TEMPLATED row (the pattern is authored once)

Append to the §5 table:

> | `tpl_turn_lead` ×2 | With too little {El}, {catalyst turn, first letter lowered} · With too much {El}, {friction turn, first letter lowered} (the seat turns likewise, {El} = the seat's energy on this chart) | With too much Earth, the shelter closes over the blade: so much preparation that the edge never leaves the mine. Comfort begins to bury what it formed. Dig out and cut something real. | energy page state turn (`buildElementScreen`, `mech.turn`) · the seat panel turn | PROPOSED (owner 2026-09-29, at Q30 of the blind read) |

### 1.11 · The render point, `Elementum_App/src/components/journey/journeyData.js`, `buildElementScreen` (line 406), the turn line (lines 466 to 467)

Before:
> `turn: stateTurn || (r.dx?.condition === 'Overfueled' ? mechanism.friction_turn`
> `  : r.dx?.condition === 'Underfueled' ? mechanism.catalyst_turn : null),`

After:
> `turn: stateTurn || (r.dx?.condition === 'Overfueled' ? tplTurnLead(r.name, 'friction', mechanism.friction_turn)`
> `  : r.dx?.condition === 'Underfueled' ? tplTurnLead(r.name, 'catalyst', mechanism.catalyst_turn) : null),`

with one helper added near the other `tpl_*` builders in the same file (REA_03 §5 `tpl_turn_lead`):

> `// tpl_turn_lead (REA_03 §5, owner 2026-09-29): the plain state lead-in the authored turn no longer carries.`
> `const tplTurnLead = (name, pole, turn) => turn ? `${pole === 'friction' ? 'With too much' : 'With too little'} ${name}, ${turn.charAt(0).toLowerCase()}${turn.slice(1)}` : null;`

The state lines (`stateTurn`: missing, spared, thin, excess, wide, unrooted) keep their own openers and take no lead-in. The seat panel's render of `turn_catalyst` / `turn_friction` calls the same helper with the seat's energy name. `JourneyStage.jsx` line 704 is unchanged.

### 1.12 · The station pass (a script, not authoring)

One script over `ELEMENT_PAIR/*.json` (`mechanism.catalyst_turn`, `mechanism.friction_turn`, `mechanism_yin.catalyst_turn`, `mechanism_yin.friction_turn`) and `POSITION/*.json` (`turn_catalyst`, `turn_friction`): strip `^Run (thin|heavy), ` and capitalise the next letter, then `node tools/voice-audit.mjs` and the transcription audit. The carry clauses are untouched (they were already cut without the opener).

---

## OPTION 2 · a small set of plain openers per state, authored per cell (CONDITIONAL on option 2)

### 2.1 · The two sets (five each, so a core's five energies never repeat one, like the eight wide openers)

Every opener ends on a comma or "and", so the authored clause after it stands alone and the cut law holds word for word.

> Friction (the energy in excess): "When {Element} runs heavy, " · "Too much {Element}, and " · "With {Element} this strong, " · "Once {Element} piles up, " · "Feed {Element} past its use, and "
> Catalyst (the energy running short): "When {Element} runs thin, " · "Too little {Element}, and " · "With {Element} this scarce, " · "Once {Element} runs short, " · "Without enough {Element}, "

The backlog's "Having too much {Element} would …" is not in the set: it changes the verb of the clause after it ("would close the shelter over the blade"), so the carry clause could no longer be cut word for word. If the owner wants it, the cut law relaxes to "the same clause, verb form free", and the cut check in `lib.mjs` line 238 already tolerates that (it matches 30 lowercased characters, not the verb). Say "2.1 with would" to add it as a sixth on each side.

### 2.2 · `fields/ELEMENT_PAIR/ELEMENT_PAIR.mechanism.catalyst_turn.md`

**2.2a · Construct.**

Before:
> - Construct: "Run thin, …" for the catalyst pole and "Run heavy, …" for the friction pole: the elemental image of the state in one clause, what it costs, then ONE directive. The friction turn speaks the shadow of the function.

After:
> - Construct: one of the five state openers for the pole, the element named in it ("When {Element} runs thin, " · "Too little {Element}, and " · "With {Element} this scarce, " · "Once {Element} runs short, " · "Without enough {Element}, " for the catalyst pole, and "When {Element} runs heavy, " · "Too much {Element}, and " · "With {Element} this strong, " · "Once {Element} piles up, " · "Feed {Element} past its use, and " for the friction pole), then the elemental image of the state in one clause, what it costs, then ONE directive. No core repeats an opener across its energies on one pole. The friction turn speaks the shadow of the function.

**2.2b · Style.** Append at the end of the bullet:

Before:
> so it must contain a first clause that stands alone and a directive that stands alone.

After:
> so it must contain a first clause that stands alone (the clause after the opener, which the carry card cuts word for word) and a directive that stands alone. The opener is the plain statement of the state, never the manual's word alone.

**2.2c · Checks.**

Before:
> - Checks: ≤35w, zero dashes, the repetition law (no four-word run shared with the definition or advice of the same cell).

After:
> - Checks: ≤35w, zero dashes, opens with one of the five state openers for the pole with the cell's element in it, no opener repeated across one core's energies on a pole, the repetition law (no four-word run shared with the definition or advice of the same cell).

**2.2d · Exemplar.**

Before:
> - Exemplar (金_土 friction): "Run heavy, the shelter closes over the blade: so much preparation that the edge never leaves the mine. Comfort begins to bury what it formed. Dig out and cut something real." · (水_火 friction, 2026-09-20): "Run heavy, the water starts to boil: every bright chance chased, every quick pivot taken, each one costing more recovery than it returns. Let the next hot offer wait a week."

After:
> - Exemplar (金_土 friction): "Too much Earth, and the shelter closes over the blade: so much preparation that the edge never leaves the mine. Comfort begins to bury what it formed. Dig out and cut something real." · (水_火 friction, 2026-09-20): "When Fire runs heavy, the water starts to boil: every bright chance chased, every quick pivot taken, each one costing more recovery than it returns. Let the next hot offer wait a week."

**2.2e · Iteration log.** Append the row:

> | 2026-09-29 | The opener widens from "Run thin," / "Run heavy," to five plain state openers per pole, the element named, no core repeating one, the 69 turns re-cut in the next round | owner 2026-09-29, at Q30 of the blind read, option 2 (REA_16 §6) |

### 2.3 · `fields/ELEMENT_PAIR/ELEMENT_PAIR.mechanism_yin.md`, the exemplar

Before:
> - Exemplar (金_土 friction_turn for 辛): "Run heavy, the setting closes over the stone: so much preparation that the jewel never leaves the box. Comfort begins to bury what it formed. Take it out and wear it somewhere real."

After:
> - Exemplar (金_土 friction_turn for 辛, the yin line keeps the shared line's opener): "Too much Earth, and the setting closes over the stone: so much preparation that the jewel never leaves the box. Comfort begins to bury what it formed. Take it out and wear it somewhere real."

### 2.4 · `fields/ELEMENT_PAIR/ELEMENT_PAIR.carry.md`, the cut law wording

Before:
> `catalyst` and `friction` are CUT from the pair's turn (its first clause and its own directive), never a second copy of the turn's meaning.

After:
> `catalyst` and `friction` are CUT from the pair's turn (its first clause after the state opener, and its own directive), never a second copy of the turn's meaning.

### 2.5 · `fields/POSITION/POSITION.turn_catalyst.md`

Before:
> - Construct: "Run thin, the seat asks for …" / "Run heavy, … here" with one directive. Exemplar: "Run heavy, thought eats action here: research becomes the errand that never ends. Ship one thing before the next book."

After:
> - Construct: one of the five state openers for the pole with the seat's energy named as "this energy" (the element is resolved per chart, so the seat turn says "this energy" where the pair turn says the element: "When this energy runs thin, the seat asks for …" / "Too much of this energy, and … here"), then one directive, ≤30 words. No opener repeats across a persona's seven seats on one pole. Exemplar: "Too much of this energy, and thought eats action here: research becomes the errand that never ends. Ship one thing before the next book."
> - Checks: ≤30w, zero dashes, opens with one of the five state openers for the pole, no opener repeated across the persona's seven seats on a pole.

Iteration log row to append:

> | 2026-09-29 | The opener widens to five plain state openers per pole ("this energy" in place of the element), the 140 seat turns re-cut in the next round | owner 2026-09-29, at Q30 of the blind read, option 2 (REA_16 §6) |

### 2.6 · `02_RULES_REGISTER.md`, row C3

Before:
> | C3 | Every field keeps its budget, minimum and maximum both hard (owner 2026-09-23; `06_CAPS_BY_PAGE.md`); openers where the card demands one ("You", the archetype name, "Run thin," / "Run heavy,", "This position rules", the definition formula, "Your {Element}") | REA_16 §2c budgets; the field cards | harness · voice-audit (budgets) | explicit |

After:
> | C3 | Every field keeps its budget, minimum and maximum both hard (owner 2026-09-23, `06_CAPS_BY_PAGE.md`), and openers where the card demands one ("You", the archetype name, one of the five plain state openers per pole for the state turns (owner 2026-09-29, option 2, the element named, no core repeating one across its energies), "This position rules", the definition formula, "Your {Element}") | REA_16 §2c budgets, the field cards | harness · voice-audit (budgets) | RULED 2026-09-29 |

Iteration log row to append:

> | 2026-09-29 | C3: the state turns open with one of five plain state openers per pole instead of "Run thin," / "Run heavy," | owner 2026-09-29, at Q30 of the blind read, option 2 (REA_16 §6) |

### 2.7 · `06_CAPS_BY_PAGE.md` line 27

Before:
> | `ELEMENT_PAIR.mechanism.catalyst_turn` / `friction_turn` | the state line when the energy runs thin or heavy | 12 | 35 | "Run thin," / "Run heavy," then one directive |

After:
> | `ELEMENT_PAIR.mechanism.catalyst_turn` / `friction_turn` | the state line when the energy runs thin or heavy | 12 | 35 | one of the five plain state openers for the pole, the element named, then one directive |

### 2.8 · REA_16 §2c, the `station:ELEMENT_PAIR.mechanism` row (line 171), appended:

> **THE OPENER (owner 2026-09-29, at Q30 of the blind read, option 2): "Run thin," / "Run heavy," retired for five plain state openers per pole**, the element named in each ("When {Element} runs heavy, " · "Too much {Element}, and " · "With {Element} this strong, " · "Once {Element} piles up, " · "Feed {Element} past its use, and " for the friction turn, and "When {Element} runs thin, " · "Too little {Element}, and " · "With {Element} this scarce, " · "Once {Element} runs short, " · "Without enough {Element}, " for the catalyst turn), rotated so no core repeats one across its energies on a pole, like the eight wide openers. The carry clause is cut from the clause after the opener. The yin turns keep the shared line's opener, the seat turns say "this energy" for the element. 209 lines re-cut in the next round.

The two `station:POSITION.turn_*` rows (lines 165, 166) gain, appended: "five plain state openers per pole since 2026-09-29, see the mechanism row".

### 2.9 · REA_16 §6 log row

> | 2026-09-29 | **THE STATE LINE'S OPENER, PLAIN AND VARIED (owner, at Q30 of the blind read, option 2).** Every state turn opened "Run heavy," or "Run thin," and the reader met the phrase before the manual had taught it. Ruled: five plain state openers per pole, the element named in each, rotated so no core repeats one across its energies on a pole (the eight wide openers' law applied to the turns), the carry clause cut from the clause after the opener, the seat turns saying "this energy" for the element. Re-cut: the turn cards (pair, yin, seat), the carry card's cut wording, register C3, the 06 caps row, the harness (the opener checks now test the set, `validate-template.mjs` line 42 generalised from the wide clause to any field with `openers`). The 50 pair turns, 19 yin turns and 140 seat turns are re-cut under the new law in the next round, gated and ruled row by row. Record: Reading/Database/Prompts/backlog/2026-09-29_turn-opener-plain-not-run-heavy.md. |

### 2.10 · The harness

**2.10a · `lib.mjs`, a constant beside `WIDE_OPENERS`** (new lines):

> `export const TURN_OPENERS = { friction: ['When {Element} runs heavy, ', 'Too much {Element}, and ', 'With {Element} this strong, ', 'Once {Element} piles up, ', 'Feed {Element} past its use, and '], catalyst: ['When {Element} runs thin, ', 'Too little {Element}, and ', 'With {Element} this scarce, ', 'Once {Element} runs short, ', 'Without enough {Element}, '] };`
> `const turnOpensWith = (t, pole, el) => TURN_OPENERS[pole].some((op) => String(t || '').startsWith(op.replace('{Element}', el)));`

**2.10b · `lib.mjs` line 156.**

Before:
> `const poleNoun = (pole) => pole === 'catalyst' ? 'catalyst (wanted, running thin: "Run thin,")' : 'friction (unwanted, running heavy: "Run heavy,")';`

After:
> `const poleNoun = (pole) => pole === 'catalyst' ? 'catalyst (wanted, running thin: one of the five catalyst openers)' : 'friction (unwanted, running heavy: one of the five friction openers)';`

**2.10c · `lib.mjs` line 171, the task line fragment.**

Before:
> `: ≤35 words, opens "${c.pole === 'catalyst' ? 'Run thin,' : 'Run heavy,'}", the elemental image of the state in one clause that stands alone,`

After:
> `: ≤35 words, opens with one of the five ${c.pole} state openers with the element named (${TURN_OPENERS[c.pole].map((op) => `"${op.replace('{Element}', en)}"`).join(' · ')}), not one already used by this core on this pole, then the elemental image of the state in one clause that stands alone,`

(`en` as at line 176: `const [, en] = c.cell.split('_').map((h) => EL_OF_HZ[h]);` inside the task function.)

**2.10d · `lib.mjs` line 188, the seat task line and its stat.**

Before:
> `: ≤30 words, opens "${c.pole === 'catalyst' ? 'Run thin, the seat asks for' : 'Run heavy,'}" with one directive.`
> `stat(`opens "Run ${c.pole === 'catalyst' ? 'thin' : 'heavy'},"`, new RegExp(`^Run ${c.pole === 'catalyst' ? 'thin' : 'heavy'},`).test(o[k] || ''));`

After:
> `: ≤30 words, opens with one of the five ${c.pole} state openers with "this energy" in place of the element (${TURN_OPENERS[c.pole].map((op) => `"${op.replace('{Element}', 'this energy').replace('Too much this energy', 'Too much of this energy').replace('Too little this energy', 'Too little of this energy')}"`).join(' · ')})${c.pole === 'catalyst' ? ', then "the seat asks for …"' : ''} with one directive.`
> `stat('opens with one of the five state openers', turnOpensWith(o[k], c.pole, 'this energy') || turnOpensWith(o[k], c.pole, 'of this energy'));`

**2.10e · `lib.mjs` line 234, the stat in `validateTurnCarry`.**

Before:
> `stat(`turn opens "${c.pole === 'catalyst' ? 'Run thin,' : 'Run heavy,'}"`, new RegExp(`^Run ${c.pole === 'catalyst' ? 'thin' : 'heavy'},`).test(t || ''));`

After:
> `stat('turn opens with one of the five state openers for the pole', turnOpensWith(t, c.pole, en));`

(`en` is already in scope two lines down as `const [core, en] = …`, so that line moves above the stat.)

**2.10f · `handoff.mjs` line 52, the spec.**

Before:
> `opener: pole === 'catalyst' ? 'Run thin,' : 'Run heavy,', notes: 'the elemental image of the state in one clause that stands alone, what it costs, then ONE plain directive that stands alone; the carry line below is cut from it'`

After:
> `openers: TURN_OPENERS[pole].map((op) => op.replace('{Element}', en)), notes: 'opens with one of the openers listed (not one this core already uses on this pole), then the elemental image of the state in one clause that stands alone, what it costs, then ONE plain directive that stands alone, the carry line below is cut from the clause after the opener'`

**2.10g · `validate-template.mjs` line 42**, generalised from the wide clause to any spec with `openers`.

Before:
> `if (s.openers && !s.openers.some((o) => String(v.clause || '').startsWith(o))) F(fp, 'wide clause does not open with one of the eight openers');`

After:
> `if (s.openers && !s.openers.some((o) => String(typeof v === 'string' ? v : v.clause || '').startsWith(o))) F(fp, `does not open with one of the ${s.openers.length} openers the spec lists`);`

### 2.11 · The render point. No change: the authored line carries its opener, as now.

---

## OPTION 3 · free opener, the plain-terms law only (CONDITIONAL on option 3)

### 3.1 · `fields/ELEMENT_PAIR/ELEMENT_PAIR.mechanism.catalyst_turn.md`

**3.1a · Construct.**

Before:
> - Construct: "Run thin, …" for the catalyst pole and "Run heavy, …" for the friction pole: the elemental image of the state in one clause, what it costs, then ONE directive. The friction turn speaks the shadow of the function.

After:
> - Construct: a plain statement of the state in the reader's terms (the element named, and its volume said in ordinary words: too much, too little, piling up, running short, more than the core can use), then the elemental image of the state in one clause, what it costs, then ONE directive. No fixed phrase: "Run thin," and "Run heavy," are retired and never appear. The friction turn speaks the shadow of the function.

**3.1b · Style.** Append at the end of the bullet:

Before:
> so it must contain a first clause that stands alone and a directive that stands alone.

After:
> so it must contain a first clause that stands alone (the image clause after the state statement, which the carry card cuts) and a directive that stands alone. The state statement is the conclusion in plain words, a reader who has not read the manual understands it on the first pass, and it varies across a core's energies (no two of one core's turns on a pole open on the same four words).

**3.1c · Checks.**

Before:
> - Checks: ≤35w, zero dashes, the repetition law (no four-word run shared with the definition or advice of the same cell).

After:
> - Checks: ≤35w, zero dashes, the element named in the first sentence, no "Run thin," or "Run heavy,", no "heavy" or "thin" as the only word for the state, no four-word run shared by two of one core's turns on a pole, the repetition law (no four-word run shared with the definition or advice of the same cell).

**3.1d · Exemplar.**

Before:
> - Exemplar (金_土 friction): "Run heavy, the shelter closes over the blade: so much preparation that the edge never leaves the mine. Comfort begins to bury what it formed. Dig out and cut something real." · (水_火 friction, 2026-09-20): "Run heavy, the water starts to boil: every bright chance chased, every quick pivot taken, each one costing more recovery than it returns. Let the next hot offer wait a week."

After:
> - Exemplar (金_土 friction, re-cut to the plain-terms law): "More Earth than the edge can use, and the shelter closes over the blade: so much preparation that the edge never leaves the mine. Comfort begins to bury what it formed. Dig out and cut something real." · (水_火 friction, 2026-09-20, re-cut): "Fire piles up, and the water starts to boil: every bright chance chased, every quick pivot taken, each one costing more recovery than it returns. Let the next hot offer wait a week."

**3.1e · Iteration log.** Append the row:

> | 2026-09-29 | The fixed opener retired for a plain-terms law (the element and its volume in ordinary words, no fixed phrase), the 69 turns re-cut in the next round | owner 2026-09-29, at Q30 of the blind read, option 3 (REA_16 §6) |

### 3.2 · `fields/ELEMENT_PAIR/ELEMENT_PAIR.mechanism_yin.md`, the exemplar

Before:
> - Exemplar (金_土 friction_turn for 辛): "Run heavy, the setting closes over the stone: so much preparation that the jewel never leaves the box. Comfort begins to bury what it formed. Take it out and wear it somewhere real."

After:
> - Exemplar (金_土 friction_turn for 辛, the yin line keeps the shared line's state statement): "More Earth than the stone can use, and the setting closes over the stone: so much preparation that the jewel never leaves the box. Comfort begins to bury what it formed. Take it out and wear it somewhere real."

### 3.3 · `fields/ELEMENT_PAIR/ELEMENT_PAIR.carry.md`, the cut law wording

Before:
> `catalyst` and `friction` are CUT from the pair's turn (its first clause and its own directive), never a second copy of the turn's meaning.

After:
> `catalyst` and `friction` are CUT from the pair's turn (its image clause, the first clause after the plain statement of the state, and its own directive), never a second copy of the turn's meaning.

### 3.4 · `fields/POSITION/POSITION.turn_catalyst.md`

Before:
> - Construct: "Run thin, the seat asks for …" / "Run heavy, … here" with one directive. Exemplar: "Run heavy, thought eats action here: research becomes the errand that never ends. Ship one thing before the next book."

After:
> - Construct: a plain statement of the state in the reader's terms ("this energy" in place of the element, since the seat's energy is resolved per chart, and its volume in ordinary words), then the catalyst turn's "the seat asks for …" or the friction turn's seat image "… here", with one directive, ≤30 words. No fixed phrase. Exemplar: "Too much of this energy, and thought eats action here: research becomes the errand that never ends. Ship one thing before the next book."
> - Checks: ≤30w, zero dashes, "this energy" in the first sentence, no "Run thin," or "Run heavy,", no four-word run shared by two of the persona's seat turns on a pole.

Iteration log row to append:

> | 2026-09-29 | The fixed opener retired for the plain-terms law, the 140 seat turns re-cut in the next round | owner 2026-09-29, at Q30 of the blind read, option 3 (REA_16 §6) |

### 3.5 · `02_RULES_REGISTER.md`, row C3

Before:
> | C3 | Every field keeps its budget, minimum and maximum both hard (owner 2026-09-23; `06_CAPS_BY_PAGE.md`); openers where the card demands one ("You", the archetype name, "Run thin," / "Run heavy,", "This position rules", the definition formula, "Your {Element}") | REA_16 §2c budgets; the field cards | harness · voice-audit (budgets) | explicit |

After:
> | C3 | Every field keeps its budget, minimum and maximum both hard (owner 2026-09-23, `06_CAPS_BY_PAGE.md`), and openers where the card demands one ("You", the archetype name, "This position rules", the definition formula, "Your {Element}"). The state turns open on a plain statement of the state in the reader's terms, the element and its volume in ordinary words, no fixed phrase (owner 2026-09-29, option 3) | REA_16 §2c budgets, the field cards | harness (the element in the first sentence, no "Run thin," / "Run heavy,") · voice-audit (budgets) · read (the plain terms) | RULED 2026-09-29 |

Iteration log row to append:

> | 2026-09-29 | C3: the state turns lose the fixed opener for the plain-terms law | owner 2026-09-29, at Q30 of the blind read, option 3 (REA_16 §6) |

### 3.6 · `06_CAPS_BY_PAGE.md` line 27

Before:
> | `ELEMENT_PAIR.mechanism.catalyst_turn` / `friction_turn` | the state line when the energy runs thin or heavy | 12 | 35 | "Run thin," / "Run heavy," then one directive |

After:
> | `ELEMENT_PAIR.mechanism.catalyst_turn` / `friction_turn` | the state line when the energy runs thin or heavy | 12 | 35 | opens on a plain statement of the state (the element and its volume in ordinary words, no fixed phrase), then one directive |

### 3.7 · REA_16 §2c, the `station:ELEMENT_PAIR.mechanism` row (line 171), appended:

> **THE OPENER (owner 2026-09-29, at Q30 of the blind read, option 3): "Run thin," / "Run heavy," retired, no fixed phrase.** Each turn opens on a plain statement of the state in the reader's terms, the element named and its volume in ordinary words (too much, too little, piling up, running short, more than the core can use), then the image, the cost, one directive. The carry clause is cut from the image clause after the state statement. No two of one core's turns on a pole open on the same four words. The seat turns say "this energy" for the element. 209 lines re-cut in the next round.

The two `station:POSITION.turn_*` rows (lines 165, 166) gain, appended: "plain-terms opener since 2026-09-29, see the mechanism row".

### 3.8 · REA_16 §6 log row

> | 2026-09-29 | **THE STATE LINE'S OPENER, PLAIN AND FREE (owner, at Q30 of the blind read, option 3).** Every state turn opened "Run heavy," or "Run thin," and the reader met the phrase before the manual had taught it. Ruled: no fixed phrase, each turn opens on a plain statement of the state in the reader's terms, the element named and its volume in ordinary words, then the image, the cost and one directive, the carry clause cut from the image clause after the statement, no two of a core's turns on a pole opening on the same four words, the seat turns saying "this energy". Re-cut: the turn cards (pair, yin, seat), the carry card's cut wording, register C3, the 06 caps row, the harness (the opener checks become: the element in the first sentence, no "Run thin," / "Run heavy,", the spec's `opener` key dropped). The 50 pair turns, 19 yin turns and 140 seat turns are re-cut under the new law in the next round, gated and ruled row by row. Record: Reading/Database/Prompts/backlog/2026-09-29_turn-opener-plain-not-run-heavy.md. |

### 3.9 · The harness

**3.9a · `lib.mjs` line 156.**

Before:
> `const poleNoun = (pole) => pole === 'catalyst' ? 'catalyst (wanted, running thin: "Run thin,")' : 'friction (unwanted, running heavy: "Run heavy,")';`

After:
> `const poleNoun = (pole) => pole === 'catalyst' ? 'catalyst (wanted, running short: the turn says so in plain words, no fixed phrase)' : 'friction (unwanted, in excess: the turn says so in plain words, no fixed phrase)';`

**3.9b · `lib.mjs` line 171, the task line fragment.**

Before:
> `: ≤35 words, opens "${c.pole === 'catalyst' ? 'Run thin,' : 'Run heavy,'}", the elemental image of the state in one clause that stands alone,`

After:
> `: ≤35 words, opens on a plain statement of the state in the reader's terms (${en} named, its volume in ordinary words: ${c.pole === 'catalyst' ? 'too little, running short' : 'too much, piling up, more than the core can use'}, never "Run thin," or "Run heavy,"), then the elemental image of the state in one clause that stands alone,`

**3.9c · `lib.mjs` line 188, the seat task line and its stat.**

Before:
> `: ≤30 words, opens "${c.pole === 'catalyst' ? 'Run thin, the seat asks for' : 'Run heavy,'}" with one directive.`
> `stat(`opens "Run ${c.pole === 'catalyst' ? 'thin' : 'heavy'},"`, new RegExp(`^Run ${c.pole === 'catalyst' ? 'thin' : 'heavy'},`).test(o[k] || ''));`

After:
> `: ≤30 words, opens on a plain statement of the state with "this energy" in place of the element (${c.pole === 'catalyst' ? 'too little of this energy, then "the seat asks for …"' : 'too much of this energy, then the seat image "… here"'}, never "Run thin," or "Run heavy,") with one directive.`
> `stat('no fixed opener', !/^Run (thin|heavy),/.test(o[k] || '')); stat('"this energy" in the first sentence', /this energy/i.test(String(o[k] || '').split(/[.:]/)[0]));`

**3.9d · `lib.mjs` line 234, the stat in `validateTurnCarry`.**

Before:
> `stat(`turn opens "${c.pole === 'catalyst' ? 'Run thin,' : 'Run heavy,'}"`, new RegExp(`^Run ${c.pole === 'catalyst' ? 'thin' : 'heavy'},`).test(t || ''));`

After:
> `stat('turn carries no fixed opener', !/^Run (thin|heavy),/.test(t || '')); stat('the element is named in the first sentence', new RegExp(`\\b${en}\\b`).test(String(t || '').split(/[.:]/)[0]));`

(`en` from the `const [core, en] = …` line, moved above the stat.)

**3.9e · `handoff.mjs` line 52, the spec.**

Before:
> `opener: pole === 'catalyst' ? 'Run thin,' : 'Run heavy,', notes: 'the elemental image of the state in one clause that stands alone, what it costs, then ONE plain directive that stands alone; the carry line below is cut from it'`

After:
> `notes: `opens on a plain statement of the state in the reader's terms (${en} named, its volume in ordinary words, never "Run thin," or "Run heavy,"), then the elemental image of the state in one clause that stands alone, what it costs, then ONE plain directive that stands alone, the carry line below is cut from the image clause``

**3.9f · `validate-template.mjs`.** No change: the spec drops its `opener` key, so line 26 builds no `theOpen` gate.

### 3.10 · The render point. No change: the authored line carries its own opening, as now.

---

### Approval sheet

| Part | File | Option 1 | Option 2 | Option 3 |
|---|---|---|---|---|
| turn card | mechanism.catalyst_turn card | 1.1a–1.1e | 2.2a–2.2e | 3.1a–3.1e |
| yin card exemplar | mechanism_yin card | 1.2 | 2.3 | 3.2 |
| cut law | carry card | 1.3a | 2.4 | 3.3 |
| seat turn card | POSITION.turn_catalyst card | 1.4a–1.4b | 2.5 | 3.4 |
| register | C3 and log | 1.5 | 2.6 | 3.5 |
| caps | 06_CAPS line 27 | 1.6 | 2.7 | 3.6 |
| REA_16 §2c | mechanism row note (and the two seat rows) | 1.7 | 2.8 | 3.7 |
| REA_16 §6 | log row | 1.8 | 2.9 | 3.8 |
| harness | lib.mjs 156, 171, 188, 234 · handoff.mjs 52 · validate-template.mjs | 1.9a–1.9f | 2.10a–2.10g | 3.9a–3.9f |
| template row | REA_03 §5 `tpl_turn_lead` | 1.10 | none | none |
| render | buildElementScreen turn line | 1.11 | none | none |
| station | the 209 lines | 1.12 (a script) | re-cut next round | re-cut next round |
| lead-in wording | "With too much / too little {Element}," or the owner's "When {Element} is running heavy," | one word | one word | n/a |
