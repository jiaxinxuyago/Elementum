# REA_18 · Reading Quality Workflow

**THE LOOP.** How the reading content is regenerated, selected, assured and adopted, batch by batch, from a ruled north star. Born 2026-09-29 from the first comparative round (`ComparativeAnalysis/Evaluations/handoff-geng-golden-2026-09-23/`) and the owner's workflow decision of the same day. Compiles REA_05 §1 (the pipeline), REA_16 (the voice and its ruling log), REA_17 (the prompt database) and the round's two reads. Defines no new content rule: every rule this workflow enforces lives in `Reading/Database/Prompts/02_RULES_REGISTER.md`.

| | |
|---|---|
| **Version** | 0.1 · 2026-09-29 (the four-stage loop, the tiered selection, the calibration protocol, the harness backlog) |
| **Owner touchpoints** | rulings by questionnaire, one field per message, never in bulk (REA_05 §1) |
| **Never** | a field lands in the station without the owner's ruling and the pipeline · `export-reading-templates.mjs --harvest` · a candidate edited by hand in a rewrite station · similarity to the north star used as a score |

---

## §0 · The premise, in four sentences

The shipping station wins the first round on both reads (the owner's blind picks and the sealed three-axis analysis), and both reads put Codex blind second and Codex benchmarked last. The two reads agree on the ranking and disagree on 34 of 53 fields, and the split has a shape: the owner picked the plainer Codex opener on definitions, chips, trait doors and Day Master lines, and the original's harder landing everywhere else. The reconciled target is therefore a hybrid no pile wrote: the original's material in the noun and hard close, under the owner's conclusion-first rule, at Codex's vocabulary level (in the analysis's units, pull 4.96 with fit 4.35). The north star station (`Reading/Database/Rewrites/owner-northstar/`) is that target assembled from the owner's picks, and the prompt earns its win rate by encoding what the owner ruled.

## §1 · The scale, so the workflow is sized to it

Authored strings in the station, by class (counted 2026-09-29, strings of eight characters or more):

| Tier | Class | Fields | What the reader meets |
|---|---|---|---|
| A | ELEMENT_GOD ledger doors (trait, scene, outside, both poles) | 900 | the energy page's ledger rows |
| A | ELEMENT_GOD chips (adj_chips and the ledger word, both poles) | 462 | the chips above the ledger |
| A | ELEMENT_PAIR (mechanism base and two turns, two definitions, two advices, verdict, four carry parts) | 300 | the energy page and the P4 carry card |
| A | STEM pools (gifts and shadows: phrase, dim, desc, echo_of) | 490 | the Day Master page |
| A | STEM_BAND (nature desc, face, presence) and STEM (manifesto, overview) | 110 | the Day Master page |
| B | POSITION (eleven fields per seat, 70 seats, plus domain readings) | 830 | the seat pages |
| C | ELEMENT_GOD k2 and structural, GOD, FAMILY, ELEMENT, CONDITION, TEMPLATED, TG_PATTERN | ~1,200 | glossary, manual, templated slots |
| | **Total** | **~4,300** | |

The owner's first blind read covered 54 fields in one session. Tier A alone is 2,262 fields. So the workflow never asks the owner to read a tier; it asks for rulings on the contested and a stratified sample, and it turns every ruling into a rule before the next batch so the contested set shrinks.

## §2 · The loop at a glance

```
Stage 1  prompt v0.6        the round's findings become rules (ruled by questionnaire), harness gates them
Stage 2  calibration        the golden set regenerated under v0.6, scored, owner reads the contested, agreement measured
Stage 3  batch generation   the station by core and by class, three-tier selection, rulings become rules, adoption through the pipeline
Stage 4  reading assurance  the assembled reading of three charts after every batch, read as the three readers
```

Each stage has a definition of done. No stage starts before the previous one's is met.

---

## §3 · Stage 1 · Prompt v0.6

**Goal.** Every fault the round exposed is a rule the harness can check or the read can name, before a single new field is generated.

**Input.** The twelve proposals in `claude-comparative-analysis.md` §5, the owner's pick notes, and the five rulings already applied 2026-09-29 (REA_17 v0.5: the doors, ruled domains, the outside door, the plain opener, the energy prescription).

**Steps.**

1. **Draft the remaining changes as one backlog item** (`Reading/Database/Prompts/backlog/2026-09-30_prompt-v06.md`), before and after per file, one part per change, in the same form as the five applied items:
   - 1a the hedge ban extended to the capacity opener ("You can", "People can", "Listeners can", "can keep you") on chip descs, ledger rows and verdict cards (register B row; `lib.mjs` reflex-hedge regex; the three cards);
   - 1b the chip law's negative examples Codex-shaped: "Steady under pressure" fails, "Crisis performer" passes; "Speaks with ease" fails, "No dressed-up answers" passes (STEM.gifts card, ELEMENT_GOD.adj_chips card);
   - 1c the element's noun required in the definition's first sentence and in the mechanism base (ELEMENT_PAIR definition and base cards; a harness check against the arena noun list in `lib.mjs` ARENA);
   - 1d the definition family-level by construction: one inventory item per persona of the family (the definition card; the read);
   - 1e the band's remedy verb beside every advice field: Overfueled → Channel (an outlet), Underfueled → Refill (intake); Body advice that prescribes brakes on an Overfueled chart fails (advise card; `handoff.mjs` spec key `remedy_verb`; a harness note);
   - 1f the repetition law run across the rows of one page, not only the pair's fields (`validate-template.mjs`: four-gram over all ledger rows of a page);
   - 1g the stem's rhythm reported as a soft check: sentences over twenty words per field, reported never blocking (the freedom clause stands);
   - 1h cta_verdict marked pole-neutral in its card (it renders on either pole's page);
   - 1i two candidates requested on the pull-heavy fields (manifesto, presence, verdict, scene) in the handoff skeleton (`handoff.mjs`: `candidates: 2` on those specs; `file-rewrites.mjs` files both as `.a` and `.b`);
   - 1j the benchmarked mode redefined: one named axis to beat per field, the original sentence withheld (`handoff.mjs --pass targeted`; the reuse check stays).
2. **Rule by questionnaire**, one part per question, the owner's wording wins where they reword.
3. **Apply** in dependency order (cards, then register, then harness, then REA_16 §2c and §6), commit per part.
4. **Gate the gate:** `node selftest.mjs runs/golden-all.json` must fail only on the classes the new rules name; each new failure is listed in the backlog item as expected. `node tools/voice-audit.mjs` clean. `node validate-template.mjs` on the north-star skeletons: new failures listed and expected.
5. **Bump REA_17 to 0.6**, rebuild the handoff package (`node handoff.mjs --chart golden --pass blind --out ../Handoffs/<date>-geng-golden-v06`), zip it.

**Done when:** every proposal is ruled (applied or dropped with a reason), the self-test's failures are all named in the backlog item, REA_17 says 0.6, the handoff zip exists.

**Owner effort:** one questionnaire session, about ten questions.

---

## §4 · Stage 2 · Calibration on the golden set

**Goal.** Turn the owner's taste into a selection method with a measured error rate, on the 54 fields where the north star already exists.

**Writers.** Claude Fable is the primary writer, run in a clean context with the v0.6 handoff zip and nothing else (a fresh session in the project with no memory of the station; the dispatch prompt is the only instruction). Codex blind runs the same zip as the second candidate on the plain-statement classes only (definitions, chips, trait doors, turns and carries, advice). Nothing is shown the original.

**Steps.**

1. **Generate.** Fable fills the six skeletons; two candidates on the pull-heavy fields. Codex fills the plain classes. Outputs land in `ComparativeAnalysis/Prompts/out/handoff/<date>-geng-golden-v06/<writer>/`.
2. **Gate.** `node validate-template.mjs <skeleton>` per file. A field that fails a hard rule is sent back to its writer once with the finding, in the same session, before anything is read. Second failure: the field is out of the round and the failure is logged against the rule, not the writer.
3. **File.** `node file-rewrites.mjs <dir> --model fable-v06` (and `codex-v06`). Stations under `Reading/Database/Rewrites/`, never the truth.
4. **Score.** The three-axis read from the first round (`claude-comparative-analysis.md` §1: accuracy, audience fit, pull, one to five each, plus the four language questions), run by a reader session that sees the candidates, the north star and the rules, and never the writers' names. Output: `scores.json` per the `report.mjs` schema, one row per candidate per field, and a winner per field.
5. **Triage for the owner.** The owner reads only:
   - fields where the scorer's winner differs from the north star's pile by more than one point on any axis;
   - fields where two candidates are within one point;
   - every field of two classes chosen at random for a full read (the control).
   Deck built by `deck.mjs` (the scratch `pick.mjs` promoted to the harness: shuffled letters, sealed key, one field per question, notes captured, picks committed after every answer).
6. **Measure agreement** (`agreement.mjs`): same winner, split, different, no pick, per class. Target: same winner on at least four of five contested fields, and no class below three of five.
7. **If below target:** every disagreement with a note becomes a candidate rule (the backlog item form), the owner rules, the prompt goes to 0.6.1, the failing classes are regenerated and rescored. One repeat at most before the target is questioned rather than the prompt.

**Outputs.** The calibrated scorer: the rubric plus the labelled picks (the first round's 54 and this round's), plus per-class priors (the owner's win rates by pile and by class from both rounds), written to `ComparativeAnalysis/Evaluations/<date>-calibration/`.

**Done when:** agreement meets target on the contested set, or the owner rules that the remaining disagreement is taste and names which classes are read by the owner regardless of score.

**Owner effort:** one to two questionnaire sessions of fifteen to twenty-five fields.

---

## §5 · Stage 3 · Batch generation and tiered selection

**Goal.** Regenerate Tier A, then Tier B, under the calibrated method, adopting through the pipeline, with the owner reading a bounded set per batch.

**Batches.** By core element for the pair and ledger classes, by stem for the Day Master classes, by seat family for the positions:

| Batch | Scope | Fields |
|---|---|---|
| 1 | Metal core: 5 ELEMENT_PAIR cells, 10 ELEMENT_GOD cells (both poles), on the golden chart and 辛 contrast | ~470 |
| 2 to 5 | Wood, Fire, Earth, Water cores, same shape | ~470 each |
| 6 | The ten stems: STEM pools, STEM_BAND (30), manifesto and overview | ~600 |
| 7 to 9 | POSITION by family (seats of the same God family together), the two turns first, then the rest | ~280 each |
| later | Tier C, only where the read names a fault | |

**Per batch, the steps.**

1. **Package.** `node handoff.mjs --scope <batch manifest> --pass blind` builds one zip: prompts, cards, the cell facts for every cell in scope, skeletons per cell and state (all states the cell renders: catalyst_turn, friction_turn, wide, thin, excess, missing, spared, unrooted, both poles of the ledger), no benchmark folder.
2. **Generate.** Fable primary on every field; Codex blind second on the plain-statement classes; two candidates on the pull-heavy fields. Each writer in a clean session per batch.
3. **Gate.** `validate-template.mjs` on every skeleton; one send-back per field; failures logged per rule.
4. **File.** `file-rewrites.mjs` per writer into `Reading/Database/Rewrites/<writer>-<batch>/`.
5. **Score.** The calibrated scorer on every field: the current station line and every candidate, one row each.
6. **Triage** (`triage.mjs`), three tiers written to `triage.json` with the reason per field:
   - **Auto-adopt:** the best candidate passes every hard rule, the current line fails one (the retired opener, a clock time, a missing prescription beat, a banned register), and the candidate wins the calibrated score by at least two points. About one field in six of the current station fails under v0.5 and will fall here.
   - **Keep the original:** the current line passes every hard rule and no candidate beats it by two points.
   - **Contested:** everything else, plus the stratified sample (two fields per class per batch, drawn at random, whatever their scores).
7. **The owner's read.** `deck.mjs` builds the contested deck: one field per question, the current line and the candidates lettered and shuffled, the key sealed. The owner picks, notes, or rejects all. Every note is logged in the batch's backlog file the same day.
8. **Rulings become rules.** Before the next batch: every owner note is drafted as a backlog part, ruled, applied, gated, logged in REA_16 §6. The contested set of the next batch is expected to shrink; if it grows, the batch pauses and the rules are reviewed.
9. **Adopt.** For every auto-adopt field and every contested field the owner picked a candidate on: `node adopt.mjs <writer>-<batch> <AXIS>/<cell> <field path> --ruling "owner <date> <deck id>"` (auto-adopts carry `--ruling "triage auto-adopt <rule failed>"` and are listed for the owner in the batch report, revertable one by one). Then the pipeline, once per batch: `build-template-twins.mjs`, the deliberate transcription into `src/content`, `export-reading-templates.mjs` (audit mode), `voice-audit.mjs`, `qa-selection-fixtures.mjs`. Commit per batch with the batch report in `ComparativeAnalysis/Evaluations/<date>-batch-<n>/`.

**Done when:** every field in scope is in one of the three tiers with its reason, every contested field has a ruling, the pipeline is green, and the batch report lists adoptions, keeps, rejections and the rules born from the batch.

**Owner effort per batch:** one questionnaire session, forty to eighty fields, falling as rules accumulate.

---

## §6 · Stage 4 · Reading-level assurance

**Goal.** Catch what a field table cannot: a page that scores well row by row and reads flat, repeats itself, or lands the wrong emotional register.

**After every batch:**

1. **Assemble** the full reading (Day Master page, five energy pages, the seats in scope) for the golden chart (庚, Overfueled) and the two contrast charts (丁 The Candle, weak; 辛 The Jewel, heavy Earth): `node assemble.mjs --chart golden|ding-weak|xin-earth --render`.
2. **Page-level checks** (`page-check.mjs`, to build): four-grams across all rows of a page; hedge density per page; sentence-length distribution against the stem's rhythm row; the same image or prop appearing on two pages of one reading; a cure named twice on one reading.
3. **The three-reader read.** A reader session reads each assembled reading once, cold, as the Screenshot Curator (would post one line: which), the Depth Migrant (trusts the system: where it wobbles), the Heritage-Curious (winces: where). Output: one page of notes per chart, the lines named.
4. **The owner reads the assembled reading**, not the fields: one chart per batch, rotating. Notes go to the backlog like any other.

**Done when:** no page-level check fails, and the owner's reading notes for the batch are logged.

---

## §7 · The selection method, defined

The scorer is triage, never judge, and it is calibrated to the owner, never to the north star's text.

| Layer | What it decides | How |
|---|---|---|
| Hard gate | in or out | the register's mechanical rules in `validate-template.mjs`: shape, caps both ends, banned registers and hedges, four-grams within cell and across the page, reader zone, the cut law, the opener law, the stamp law, the cure set, the arena noun |
| Accuracy | one to five | the reader session against the primer, the ten equations, the excess idioms, the door law, the derivation law, the sibling test, the persona's cost in the arena |
| Audience fit | one to five | the reader zone report, the hedge count, sentence length, the surface's register, first-pass comprehension at the bottom of the band |
| Pull | one to five | the three readers' test, the cost named and checkable, the material in the noun, the hard close; never similarity to the north star |
| Priors | tie-breaks and thresholds | the owner's win rates by pile and by class from every read so far; a class where the owner has overruled the scorer three times is read by the owner regardless of score |
| The owner | the ruling | contested fields and the stratified sample, one per question, notes captured |

Two rules keep it honest. The scorer never sees the writers' names. The north star is the reference reading a scorer may consult for what the owner meant by a class, and a candidate is never scored up for resembling its sentences.

---

## §8 · What the harness needs (backlog for Stage 1 and 2)

| Tool | Does | Status |
|---|---|---|
| `deck.mjs` | builds a shuffled, sealed questionnaire deck from any set of candidates; records picks and notes; the scratch `pick.mjs` promoted | to build |
| `agreement.mjs` | owner picks against scorer winners: same, split, different, none, per class | to build (logic exists in the 2026-09-29 results script) |
| `score.mjs` | the three-axis read sheet per field for a reader session, output in the `report.mjs` schema | to build |
| `triage.mjs` | the three tiers from `scores.json` and the gate, with reasons | to build |
| `page-check.mjs` | the page-level checks of §6 | to build |
| `handoff.mjs --scope` | a batch manifest (cells and states) instead of one chart | to extend |
| `handoff.mjs --pass targeted` | one named axis to beat per field, the sentence withheld | to build (Stage 1, 1j) |
| `file-rewrites.mjs` | two candidates per field (`.a`, `.b`) | to extend |
| `adopt.mjs --batch` | adopt from a triage file, one provenance row per field | to extend |
| `synth-picks.mjs` | rebuild a north star from a deck's picks (exists for the 2026-09-23 round) | generalise to any deck |

---

## §9 · Definitions of done and the standing rules

- A batch is done when its report exists, its adoptions are in the station with provenance, the pipeline is green, REA_16 §6 carries the batch's rulings, and the next batch's rules are applied.
- The workflow is done for Tier A when the golden chart and both contrast charts render with no field older than v0.6 rules, and the owner's last assembled read has no open note.
- The owner rules row by row, by questionnaire, never in bulk. Auto-adopts are listed and revertable, never silent.
- Nothing lands in the station except through `adopt.mjs` and the REA_05 §1 pipeline. Rewrite stations are never edited by hand.
- Every rule the workflow enforces cites its ruling in the register and REA_16 §6. A prompt never invents a rule.

## §10 · Log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-29 | Born: the four-stage loop, tiered selection, calibration protocol, harness backlog | owner workflow decision 2026-09-29, after the first comparative round's two reads |
