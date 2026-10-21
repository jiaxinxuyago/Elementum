# Life Chapters content: the owner's rulings

## Round 1 (2026-10-19): samples and questions (waiting)

- **Page:** https://claude.ai/artifact/LLaRf2Zzzc6WvZjydWhyYF (source: `round-1/`; `build.mjs` reads `now.json`, the page model dumped by `dump.mjs`).
- **Samples:** `ComparativeAnalysis/Prompts/out/handoff/2026-10-19-chapters-template/samples.json`, 44 units (the golden Steward rewrite, chart B, chart C). `gate.mjs` there (a copy of the depth gate) passes.
- **Questions:**
  - Q1: decade lines, character × pole × tense plus an early line for a lived decade in the Early Chapter (recommended);
  - Q2: chapters read the era and never repeat a seat's domain claim (recommended), with the golden Steward rewrite;
  - Q3: years, this year and the next five across the decade boundary (recommended);
  - Q4: one bond per year, the strongest;
  - Q5: year stars as a chip on the year card;
  - Q6: the age window, confirm;
  - Q7: the closed Hour Gate note, keep with the decades;
  - Q8: the free hook, confirm;
  - Q9: the current decade sits in the reader's current chapter;
  - Q10: keep helping / weighs, every heavy unit ends on what carries the reader;
  - Q11: W5, swap the seat sheet when Life Chapters goes live;
  - S1–S3: approve the golden rewrite and the B and C samples as calibration.

Round 1 was not answered. The owner's direction of 2026-10-21 replaced it (below).

## Owner direction (2026-10-21): energy first

> "Same as the event signature system I just prompted to: … Plus, I want keep the energy as the subject for each life chapter. Instead of using Bazi characters and others, unravel the advise by saying what energy the life chapter carries, and then dive into each domain's, energy manual's advise after that. Always keep the energy as starting the threads of logic. Consider using this structure and come up with the new reading again"

The consequence, as on Your Almanac (its D1 B): on this surface the no-advice rule is lifted. The rest of the prediction law stands.

## Round 2, energy first (2026-10-21): awaiting the owner

- **Page:** https://claude.ai/artifact/1QadK8edjmZsB91oPDZ6Y1 (source: `round-2/`; `energy.mjs` reads every chapter, decade and year through `engine/almanac` (`almanacContext`, `energyMix`, `liftOf`, `groundRelation`, `energyState`), and `build2.mjs` writes the page).
- **The reading:**
  1. the energy (the stem element over the branch ground, its function, grow or release, the lift);
  2. underneath (the Almanac's ground lines);
  3. where it lands (the eight-domain board, then lines for the gate's domain and the two weightiest, saying what the chapter favours);
  4. working with it (the Energy Manual: one line, plus Seek and the decade that brings it, on the current chapter only);
  5. decades as energies (the current one in full, with favours pairs);
  6. years, shared with Your Almanac.
- **Keys:**
  - `ENERGY <fn> · chapter.<gate>.<dir>.<tense>`;
  - `chapter_domain.<Domain>.<dir>`;
  - `chapter_manual.<dir>`;
  - `decade.<dir>.<lived|early|coming>.<a|b>` and `decade.<dir>.now`;
  - `favours.decade.<Domain>.<dir>`;
  - the Almanac's `year.<state>` and `land.year.<kind>.<gate>`.
  - About 326 units in all.
- **Samples:** `ComparativeAnalysis/Prompts/out/handoff/2026-10-19-chapters-template/samples-energy.json`, 50 units. `gate-energy.mjs` there passes.
- **Questions:** L1–L10 (order, characters out, gate-aware energy line, domains chosen, favours voice, lived chapters, the manual, duplicate energies, years shared with the Almanac, the visual pieces); R1–R4 carry round 1's Q3, Q9, Q6–Q8 and Q11; S1–S2 the samples.

## Round 1 rulings (owner 2026-10-21, after the round 2 page): "Q1 A … Q11 A, S1 A, S2 A, S3 A"

These answer the round 1 page. How they carry into the energy-first round 2:
- **Carried as ruled:**
  - Q3 A = R1 A: this year and the next five;
  - Q4 A: the strongest bond only;
  - Q5 A: year stars as a chip;
  - Q6 A, Q7 A, Q8 A = R3 A;
  - Q9 A = R2 A: the current decade sits in the reader's current chapter;
  - Q11 A = R4 A: the seat sheet swaps when Life Chapters goes live.
- **Carried into the energy keys:**
  - Q1 A: the `.early` decade line;
  - Q2 A: a chapter never repeats a seat's domain claim;
  - Q10 A: every heavy unit ends on what carries the reader.
- **S1–S3 A:** the round-1 samples are approved as calibration for the voice. Under the energy-first direction they are source material, not keys.
- **Still open:** round 2's L1–L10 and its S1–S2.
