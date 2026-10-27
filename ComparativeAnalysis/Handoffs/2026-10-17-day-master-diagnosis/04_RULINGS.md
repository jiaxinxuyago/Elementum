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

### RULED 2026-10-27: the needs clauses and the opener (questionnaire)

- **Needs clause:** all seven are ruled, keyed by the needed energy's volume. They read none / little / could use more / already there to use (plentiful and dominant) / that is (same energy as the mode) / Balanced "your five energies stay close to even".
- **Opener:** "Your chart is heaviest in" replaces "Most of your chart", because the mode is the largest share and not always a majority. The mode phrases are the locked wheel words as noun phrases: more of you / what feeds you / what shapes you / what you feed / what you shape.
  - Example: "Mind mode. Your chart is heaviest in what feeds you, and it holds little of the Fire you need."
- **Fit:** checked on five charts, all within 306×544. `tpl_type` is fully ruled and on dev.

## The album and the card as a pair (2026-10-27; AWAITING THE OWNER, K1–K4)

The owner asked how the share card echoes the catalogue (Your reading) when the reader taps into each reading. They asked for 2–3 album variants with the new metrics, keeping the current design and the dominance wheel, shown side by side with the card. Page: https://claude.ai/artifact/RopRSiD8DoV3ZzwZhyHZUy

The variants are built from dev screenshots on the golden chart (the wheel and the depth tiles are real screenshots). Each card block is numbered to its album door.

**The three variants:**
- **A, Doors** (recommended): the chip row is the set of doors. The "How am I running?" and "Start here" tiles fold into the Run and Needs chips. A Your circle tile is added.
- **B, The card on top:** the album opens on the card's face with its share button, and the card's Release/Grow grid becomes the "asks for" tile.
- **C, Type tiles:** no chip row. The four slots become full tiles at the head of the bento.

**Rows:**
- K1: the layout.
- K2: where the Archetype chip leads (A = the first reading).
- K3: fold the two tiles into the chips.
- K4: the circle tile on the album.

### RULED 2026-10-27: K1 A, K2 A, K3 A, K4 A (built on dev, behind TYPE_V1)

- **K1, the chips are the doors.** On the album the four chips are buttons with read marks (TypeChips `doors`, `stamp`). On the share card they stay labels.
  - Archetype → the first reading's eight cards, replayed from the album (`replayOn` in JourneyStage).
  - Run → "How am I running?".
  - Mode → its energy sheet (golden: Earth).
  - Needs → its energy sheet (golden: Fire).
- **K3:** the "How am I running?" and "Start here" tiles step down when TYPE_V1.
- **K4:** the Your circle tile follows "What does my chart ask for?" (`.v5-circle`) and opens Your Circle.
  - Headline: "{Fuel} carry the {El} you need", e.g. "Suns and Candles carry the Fire you need".
  - CTA: "Who completes your chart?".
  - Station: `tpl_type.circle`. The Balanced headline "{Bond} is your classical match" is a DRAFT, to rule.
- **Verified on the local dev build:** every door opens the right page, the circle goes to #/app-compat, and there are no page errors.

### The Archetype chip opens the Day Master page (owner 2026-10-27; replaces K2 A's replay)

Owner: "It should tap into the day master reading page with all the variables the day master associated from our stations."

The new page (`DayMasterPage`, screen `daymaster`, a LeafReader on dev behind TYPE_V1) holds every live STEM field for the reader's stem:
- the painted seal, the archetype name and the stem line;
- the manifesto, moved here from "How am I running?";
- the Sign (`dm_overview`);
- your nature (`yourNature_desc`, the band-invariant baseline; the band paragraph stays on the run page);
- the inscription;
- `dm_claims` ×2, tagged draft (pending);
- `dm_mechanism`, tagged draft (pending; it still carries an em-dash);
- the type line, with doors to "How am I running?", Your Circle and the first-reading replay.

Not shown: `stem_keywords` (retired to ore 2026-09-10); the gifts and shadows pools (retired to ore 2026-10-17); `who` (a golden-only draft; it is card 1 of the replayed first reading).

### RULED 2026-10-27: P1 A, P2 A, P3 A (the Day Master page's fields)

**P2, done.** `STEM.dm_mechanism` is LOCKED ×10. In each line the dash became a comma, in the station and in DM_READING `edge`, and the REA_16 §2c row is set to locked.

**P1, in progress.** The dash in 辛's claim 2 became a comma, a mechanical fix. Three calls remain before the twenty claims lock:
- C1, C2: "room" in 丙 claim 2 and 癸 claim 1; the word is rationed corpus-wide.
- C3: three claims under the 10–16w band (庚, 己 and 乙 claim 1).

**P3, drafted.** Two candidates of two or three adjectives for each of the ten L1s, per the manifesto field card. Every couplet is ≤14w and column A repeats no word across stems. The ruling page with C1–C3 and M甲–M癸 is at the link in the session.

### RULED 2026-10-27: C1 A, C2 A, C3 A, M甲–M癸 A

- **`STEM.dm_claims`:** LOCKED ×20 (REA_16 §2c row: 8–16w).
  - 丙 claim 2: "People take their mood from you before you say a word."
  - 癸 claim 1: "You feel the mood shift a beat before anyone names it."
  - The three short claims stand as written.
- **`STEM.manifesto` L1 ×10** is re-cut to adjectives. The old L1s are in `__ore.retired_2026-10-27_manifesto_l1`. The new L1s:

  | 甲 | 乙 | 丙 | 丁 | 戊 |
  |---|---|---|---|---|
  | Upright, eager, forward | Supple, persistent, resourceful | Warm, open, bright | Focused, intimate, constant | Steady, solid, unhurried |

  | 己 | 庚 | 辛 | 壬 | 癸 |
  |---|---|---|---|---|
  | Patient, receptive, quiet | Honest, exact, decisive | Precise, polished, exacting | Deep, wide, restless | Perceptive, soft, porous |

  The change is transcribed to `archetypeSource.js`, and the field card log is updated.
- **Elementum.life:** the manifesto shows on the live site today (the album hero and the reveal), so the new L1s go live with this push. The claims and the edge lines appear only on the Day Master page, which is on dev only (TYPE_V1).

### The Day Master page, reworked (owner 2026-10-27)

Owner: "What People Notice is just an opener to Your Nature, and this reading page does not echo with the five energy reading pages without the gifts and shadows as five energy catalysts and frictions."

**Your nature** now opens on the inscription. The nature paragraph follows, then "What people notice" (the two claims) as a sub-list.

**Through your five energies** (new): one face of the stem's door-tagged pool per energy, grouped Release / Grow / Keep.
- A friction shows a shadow; a catalyst or a kept energy shows a gift.
- On a doubled door (Body, Mind), an abundant or dominant energy takes the big face (gifts' wide, shadows' excess); otherwise the echo face shows. This is the retired selector's law, R1/R2.
- Each row opens that energy's reading page.
- The lead line is a DRAFT: `tpl_type.five`, with a lead and a Balanced variant.

**The pools revived from ore** (`__ore.retired_2026-10-17_diagnosis`, which is now a REVIVED note):
- STEM gifts / shadows / door_note are back in candidates ×10.
- `tools/build-dm-pools.mjs` transcribes them to `src/content/dmPools.js`; its `--check` now runs in `npm run check`.
- The export mapping is restored. `dim` and `echo_of` stay station-side.
- The voice audit is clean on the live gifts/shadows rows.

**Golden chart:**
- Release: Never reconsiders (Body, shadow) and Overprepared (Mind, shadow).
- Grow: Crisis performer (Order, gift), Plays the long game (Action, gift) and No dressed-up answers (Expression, gift).

### RULED 2026-10-27: F1 A, F2 A
The lead line over the five energies (`tpl_type.five`) is RULED. The face follows the amount: Body and Mind take the big face when plentiful (F2 A, the September R1/R2 rule). Open: whether the faces should be picked from the energy pages' own keywords (the 17 October recap precedent) rather than the stem pools.

### The five energies as an abstract reading (owner 2026-10-27; template AWAITING THE OWNER)

The question was whether the faces echo or are picked from the energy pages. Answer: they echo the same pair definitions, but they are separate labels; none appear on the reader's energy pages (golden: "Crisis performer" against the Fire page's "Clear under pressure, Takes charge, Loves high stakes").

The owner's direction: "summarize that into 2-3 adjectives that generally describe each energies' functions and expand those into a short paragraph of explanation, this will be an abstract reading of each energy, the angles of this part of the reading should come from how the Stem behaviors, so each adjectives should be the stem's native traits carried out by each energies condition and distributions."

The 庚 template is 10 cells: 5 functions × Grow/Release. Each cell has 2–3 adjectives and a paragraph of 38–46 words, and the voice lint is clean. Cells: `07_FIVE_ENERGIES_TEMPLATE_geng.json`. Ruling page: https://claude.ai/artifact/BXa7pkD55Z44f3bJZ6h9v1

**Rows:**
- S1, the field shape: 100 cells, with the amount as data; or 300 cells, by amount band.
- S2, Balanced charts: show the Grow cell, or write Keep cells.
- S3, the pools: back to the ore, or kept as headings.
- T Body … T Order: approve or revise each energy's pair of cells.
