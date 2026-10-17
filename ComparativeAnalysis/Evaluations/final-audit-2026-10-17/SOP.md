# Final content audit · the function pages · 2026-10-17

Commissioned by the owner 2026-10-17: a state check, then an overall quality audit with The Pattern as the north star, ending in three lists (major issues for approval, minor issues for a final polish round, small tweaks fixed along the way), so the iteration closes to a complete state before the next major task.

## 1 · Scope

The function page, as a reader sees it, for every stem and every energy: THE FUNCTION (the definition), THE CHARACTER (pole, verdict, dial, metric bars), the keyword ledger (three or four keywords, one passage each), THE REMEDY on the friction pole, THE ADVICE and THE EDGE on the catalyst pole. Out of scope: the element page, the domains, the onboarding and the stem portraits.

The unit of audit is the **assembled page**, not the field. 150 compositions in `pages/<energy>.md`: for each of 25 pair cells and both poles, each of the two gods as the single face (3 keywords) and the balanced 2+2 blend (4 keywords). `compound-report.json` holds the mechanical repetition counts per page.

## 2 · State check (done 2026-10-17)

| Check | Result |
|---|---|
| Every stem's five energy pages resolve to a pair cell and two god cells | 10 of 10 stems, 50 of 50 pages |
| Every section present in the content (25 pair cells, 50 god cells, 5 metric functions; both poles; 3 keywords × 3 angles; the remedy anchor; the edge with its ruled domains) | no gaps |
| App code ↔ station JSON (`export-reading-templates.mjs --check`) | in sync, 245 files |
| Station JSON ↔ station MD twins | 1,050 texts, none stale |
| Rendered in the app, the ten preset charts × five energies | 50 of 50 pages show every section, no page errors |

## 3 · Criteria

Each page is read whole and scored 1 to 5 on each criterion; findings are quoted.

- **A1 Accurate and logical.** The BaZi logic holds (the element relation, the function, the pole, the cure in the remedy); no section contradicts another; no claim the reading cannot know.
- **A2 Error-free.** Grammar, idiom, sense on first read at B1 to B2; no sentence a reader has to parse twice.
- **A3 On point, no restatement.** Every sentence adds something; no idea said twice in different words across the definition, the keywords and the remedy; no scene or detail that does not serve the point.
- **A4 The reader is the protagonist.** The reader acts and is seen; other people appear only as those the reader affects.
- **A5 Resonance and voice.** It lands emotionally for the audience in BIZ_03 and BIZ_04 (18 to 35, therapy-literate, screenshots lines that name them, drops apps that flatter): recognisable, specific, warm without wrapping, never preachy or clinical.
- **B Pattern parity or better.** Read against The Pattern excerpts in `07_REFERENCE_BENCHMARKS.md`: is each passage at least as specific, as true-feeling and as quotable? Score 5 = better than The Pattern, 4 = equal, 3 = close, 2 = generic, 1 = off.
- **C Compound readability.** On one page: a content word at most once (chip words, the element and the function exempt), no sentence frame, clause shape, joint ("rather than", "so you", "and you"), figure of speech or opener repeated.
- **D1 Section roles.** Each section does its own job: the definition names the function and the pole's state; the keywords name behaviour; the remedy prescribes; the edge points outward. No section pre-empts another.
- **D2 Persona truth.** The god's persona is the same person on every element and both poles; the two gods of one energy read as different people.
- **D3 Pole coherence.** The catalyst and friction pages of one cell agree on who the reader is and differ only in the direction of the energy.
- **D4 Plain cost, owned cause, open door** (ruled 2026-10-16): no sugarcoat, no charge, no fate, no capacity close.
- **D5 Quotability.** At least one line per page a reader would screenshot.
- **D6 Length and scan.** The page reads in about a minute on a phone; no passage drags.

## 4 · Severity and what happens to each

- **Major** (systemic: a pattern across many pages that needs a rule change or a rebuild): listed with evidence and a proposed fix; **nothing is done before the owner approves**.
- **Minor** (local: one passage or one page needs finessing): listed with a proposed rewrite; applied in **one final polish round** after the owner's read of the list.
- **Small tweak** (unambiguous: a typo, a grammar slip, a broken idiom, a repeated word with an obvious swap, a factual slip): **fixed during the audit**, gated, landed, and listed.

## 5 · Procedure

1. State check (section 2).
2. Assemble the 150 pages and the mechanical compound report.
3. Five sealed auditors, one per energy (30 pages each), score every page on section 3 and file findings by severity with quoted text and a proposed fix. A sixth auditor reads across energies for D2 and D3 (each persona on all five elements, every pair cell's two poles).
4. Consolidate: merge duplicates, separate systemic from local, rank by reader impact.
5. Apply the small tweaks (gate, adopt, transcribe, checks, ship).
6. Report the three lists to the owner. Major issues wait for approval; minor issues go to the final polish round.

## 6 · Definition of done, and the freeze

The function pages are complete when: no open Major; every Minor fixed or waived by the owner; every page scores at least 4 on B (Pattern parity) and on A1 to A5; the mechanical checks green. After the final polish round the corpus is **frozen**: later changes are for defects (an error, a contradiction, a false claim), not for style preference, and no new writing rule is added without a measured defect on real pages. Open style ideas go to a parked list for a future version, not into this round.
