# Day Master diagnosis and the merged reading: rulings

Session: "Elementum Day Master diagnosis page", session_01RJRm3y3yvdzEnvZoX5yTx7. Owner rulings in the order given; each names the page it was ruled on.

## 2026-10-18

| Ruling | What it settles | Page |
|---|---|---|
| B + C | The Day Master page is design B (the wheel with arrows, then tiles); the first reading is C (eight story cards after the Naming) | variations page |
| Merge, option 1 | The catalogue and the Day Master page merge into one page, "Your reading", built around the wheel | chat |
| Wheel art | "Your five energies" is the live dominance wheel unchanged; the arrows view only adds arrows and a relation under each label | https://claude.ai/artifact/8vXKMh5NeVRrUByuYxymMR |
| Energy cards | The first reading's five energy cards open on the dominance bar and "You have {n}% of {Energy} energy.", then the function teaser (`ELEMENT_PAIR.cta_verdict`) replaces the chemistry story | https://claude.ai/artifact/WNj9oWXiMR7rMET7ZGWk5o |
| Condition reading | "How am I running?" carries a reading per condition (O1–O5, U1–U5, B1–B5); wired on the dev build as a draft before the content is ruled | https://claude.ai/artifact/3jAkDqAiAukF2iM29v1aWw |
| Map all fields | Every text field in the merged journey has a station home; the golden chart's prototype text sits there as drafts to rule | https://claude.ai/artifact/TahTNJVuUNxdGca2SP2TzW |

## 2026-10-19 · the depth sections in the merged flow

Ruled on https://claude.ai/artifact/G6TYvNcaL8CXTQfGuzRT9o ("Q1 A, Q2 A, Q3 A, Q4 A, Q5 A, Q6 A").

| Q | Ruling |
|---|---|
| Q1 A | The Blueprint door moves from the retired Day Master page to the foot of "How am I running?" ("Your structure, in full: the Energy Blueprint ›", Advisor), and beat 7 keeps its own door |
| Q2 A | The "Birth Chart" door moves to the hero of Your reading, under the Yang Metal line, beside the share button |
| Q3 A | The energy sheet's ruling-domain chips open the domain reading, as the energy page's domain tiles do |
| Q4 A | Beat order: 1 Who you are · 2 Your five energies · 3 How you run, Start here, What your chart asks for · 4 Domains · 5 Life Chapters · 6 Stars · Going deeper · 7 Blueprint (beats 4–7 exactly as built, A1) |
| Q5 A | One words note at the foot with all eight words (Core, Overfueled, Catalyst, Friction, Seat, Gate, Decade, Star) |
| Q6 A | The first reading does not point to the depth sections |

## 2026-10-20

| Ruling | What it settles |
|---|---|
| Wheel default | The arrows view, "What they do to you", is the wheel's default; "By amount" is one tap away |
| How am I running? | Opens the Day Master reading card (the stem × band paragraph); the station holds all 30 (live), with the R2 rewrite approved for 庚 Overfueled only |
| Retire | The pieces the merge removes retire to ore: the Day Master page as a separate stop, the hero arrow, the energy manual, the GROW/RELEASE rails, the dot card, the seal's share action |
| Relation labels | LOCKED as "feeds you · shapes you · you feed it · you shape it · more of you", relative to the reader's core; "tames" is not used on the wheel (REA_02 §5d, `tpl_cycle_line.relation_labels`) |

## 2026-10-20 · the condition reading, last round (Q1–Q10)

Ruled on https://claude.ai/artifact/GzdMe6msCVoNb7QbtXnxrc, one by one in the session.

| Q | Ruling |
|---|---|
| Q1 | "How it works": the three sentences as drafted |
| Q2 | The balance diagram is dropped |
| Q3 | "On your chart": the one line plus "How is this worked out? ›" to the Codex panel (the engine now returns the three tests) |
| Q4 | Three gifts and three costs |
| Q5 | No heading over them: the Gifts and Costs pills only |
| Q6 | Three scenes (the fourth dropped) |
| Q7 | The Channel / Refill / Keep line plus the function rows |
| Q8 | Underfueled and Balanced follow Overfueled sentence for sentence |
| Q9 | Balanced's costs stay mild as drafted |
| Q10 | Live with the merge build |

**Built on the dev site (owner: "I want to see this build in before we start finessing"):** the merged Your reading behind `MERGE_V1 = IS_DEV_TOOLS` (JourneyStage.jsx), with the first reading's eight cards after the Naming, beats 1–3, the energy sheet, "How am I running?" as a full page, the depth beats as built, the Day Master routes landing on Your reading. elementum.life is unchanged.

## 2026-10-21 · live

Owner: "can we also push this to our official live link: elementum.life?" The merge goes live behind its own switch (`src/components/journey/mergeFlag.js`, `MERGE_V1 = true`). The depth sections stay dev only (DEPTH_V1, Domains session): on elementum.life the energy sheet's domain chips are labels, "How am I running?" has no Blueprint door, and the illustration slot is hidden.

## Still open

- The merged-journey drafts in the station (14 fields after the relation labels were locked).
- Finessing each page.

## The opening line (2026-10-26, from the design session's brief; AWAITING THE OWNER)

The owner asked, relayed by the design-director session, for a better Day Master opening line: the first thing on the album hero and on the share card, remembered, revealing, emotionally resonant. Proposal page: https://claude.ai/artifact/A23E1m8RQLJ9f3ZY8cUqhN. Candidates: `06_OPENING_LINE_CANDIDATES.json`.

- **OL1:** how the line works. A (recommended) is one line in two places. The hero L1 becomes the tell, a short second-person line, with the locked L2 identity formula under it. The card carries the same tell, finished with one beat of cost or of how people meet it.
- **OL2:** the law changes OL1 A needs. L1 becomes a second-person sentence of at most 7 words, and the couplet cap rises from 14 to 18 words. A new field, `STEM.card_line`, holds a sentence of at most 60 characters that opens with L1. This would supersede the 2026-10-14 L1-as-adjectives ruling.
- **OL3:** the design session's DM2. A (recommended) fixes only the 辛 claim dash. The 乙 and 壬 social rewrites are not needed once the card reads `card_line`.
- **甲–癸:** two candidates per stem, plus C (keep what is live).

All candidates were checked: L1 has 4–7 words and no element name; each card line is at most 60 characters; there are no dashes, absolutes or hedges; no four-word run repeats across stems. The backbone verbs and the Angle Map costs are kept.

**On a ruling:**
1. Station `STEM.manifesto` L1 ×10 and the new `STEM.card_line` ×10.
2. The REA_16 §2c registry rows and the field card.
3. Transcribe to `src/content`.
4. Replace `SHARE_CLAIM_PICK` in `JourneyStage.jsx` with the card line.
5. The pipeline, push, and verify on both sites.
6. Tell the design session.

## The Elementum Type, structure pass (2026-10-26; AWAITING THE OWNER, T1–T7)

The owner asked for a shareable archetype that works like MBTI: holistic, built from the five-energy distribution and its functions, starting from the Day Master (their example: 喜火多木的庚金), with catalyst and friction readable at the surface, viral, and leading into the in-depth reading. Structure first, words after. Proposal: https://claude.ai/artifact/BZXjPUyqXC5gQE4onUYrFG

**The slots, all computed by the engine today:**
- **Core:** the stem.
- **Run:** Over / Under / Balanced, with the 7-test score.
- **Heavy in (多):** the top share and its function.
- **Hungry for (喜):** the start element.
- **Circle:** Fuel = the cores of the hungry element; Bond = the 五合 partner; Mirror = the same core.

**Data (4,000 random charts):**
- Heavy in spreads evenly across the five functions (19–23% each), and it is a friction in 92% of charts.
- Run: Under 53%, Over 42%, Balanced 5%.
- Hungry for follows from the core and run: Over starts with the Order energy, Under with the Mind energy.
- That gives about 100 common types, plus up to 50 rarer Balanced ones.
- Ties in Heavy in come up in 1.4% of charts, the golden chart among them (Earth 33 = Wood 33).

**Rows:**
- T1, the structure: the Type Line / Archetype + Mode / the Recipe.
- T2, the code.
- T3, the Run on the card.
- T4, ties.
- T5, the circle.
- T6, what the share image carries.
- T7, park the 26 October opening-line proposal (OL) until the structure is ruled.

### Pass 2 (2026-10-26, owner: "B is a good basket of data types … use our current iconography and design assets")

Option B redrawn with the live assets only:
- the painted stem plates `concept-arts/stems/proc/*`;
- the ink dots `concept-arts/dots/*`;
- the ReadingSprite signs (`el-*`, `ic-charged/receptive/balanced`, `fn-*`, `ar-up/down`);
- the Release and Grow pills;
- the mist veil from today's share card.

The older `Design/Source/icons.svg` (placeholder Yin stems) is no longer used. Same page: https://claude.ai/artifact/BZXjPUyqXC5gQE4onUYrFG (version 2).

**Finding:** the run and the heavy-in function move together. Overfueled charts are heavy in Body or Mind, and Underfueled charts in Expression, Action or Order. Five pairs cover 89% of 4,000 charts, at 16–20% each. So the mode is the heavy-in function: 5 modes × 10 archetypes = 50 types ("You are the Deep Blade"). The mode words are working names.

**Rows M1–M7** (awaiting): the type, the card layout, the code chips, ties, the circle, the album hero, the mode words. The T1–T7 rows of pass 1 are superseded.

### Pass 3 (2026-10-26)

The owner kept Card 1 and asked for two changes:
- show Run and Mode with clearer icons the app already has;
- name the type in the plainest words, with no adjective before the archetype ("bad for archetype categorization and viral trending").

What changed, on the same page (version 3):
- **The type name** is "The Blade · Mind mode". The archetype is never renamed. 10 × 5 = 50 types.
- **The four chips:**
  - Archetype: the painted seal.
  - Run: the album's run dial, from the `Dial` component, with the needle at the score.
  - Mode: the ink dot of the energy held most, named by its function.
  - Needs: the ink dot of the start element.
- **The plain line** is built from the locked wheel words: "Mind mode. Most of your chart feeds you, and it holds little of the Fire you need."
- **The grid tags** read "your mode" and "you need". Card 2 is dropped.

**Rows M1–M6** (awaiting): the name, the chips, the plain line, ties, the circle, the album hero.

### RULED 2026-10-27: M1 A, M2 A, M3 A, M4 A, M5 A, M6 A

Built on the dev site behind `TYPE_LIVE = false` (`TYPE_V1 = TYPE_LIVE || IS_DEV_TOOLS`, `src/liveFlags.js`). elementum.life is unchanged until the owner says live.

**Model.** `buildMergedModel(...).type` in `journeyData.js` carries:
- the name;
- the line;
- the mode: the function held most. A tie takes the function that fits the run.
- the need: the start element, with its share;
- the circle: Fuel = the cores of the needed element, Bond = 天干五合, Mirror = the same core.

Across 3,000 random charts every line fills, and 47 of the 50 types appear.

**Station.** `TEMPLATED/tpl_type.json` holds the name, the pattern, the mode phrases (the locked wheel words) and the needs clauses by volume. It is mapped in the export checker and transcribed to `mergedReading.js` as `TYPE_LINE`.

**Draft, to rule.** The other needs clauses: none / could use more / already there to use / that is / Balanced "your five energies stay close to even". The ruled "holds little" fits only the thin needs, 42% of charts.

**UI** (`MergedViews.jsx`: TypeChips, TypeLine, TypeCircle):
- **Share card:** the type line in place of the claim, four chips, the "your mode" and "you need" tags, and the circle, which opens Your Circle. It fits the 9:16 frame on Overfueled, Underfueled and Balanced charts.
- **Album hero:** the line with the red rule and the chips. The Run chip opens "How am I running?", and the condition pill steps down.
- **"How am I running?"** now carries the manifesto.

**Open for the owner:** the needs-clause drafts, and "Most of your chart". The mode is the largest share, not always a majority; for the golden chart it is 33%.
