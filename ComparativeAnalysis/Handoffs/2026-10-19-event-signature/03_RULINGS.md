# The event signature system (the Today tab): rulings

Session: "Elementum event signature system (Today tab)", session_01CtFpHCUsMdTUYosYF5mHoy.

## Round 1, design (2026-10-19): ruled 2026-10-20

Review page: https://claude.ai/artifact/Rtixt7at5a6gTSre7ZhEhs

What it proposes, all computed by the in-depth engine on the golden chart from 2026-10-19:
- **Signatures:** the day, month and year character (ten-god, helping or weighing by `decadePole`); gate bonds of the passing branch (`branchBonds({extra})`); the echo (a day hitting the gate the month already hits); star days (`arrivingStars`, `voidOf`); the pillar return 伏吟 and the pillar turned 反吟 (six days a year each); the season (`seasonOf`); markers (a solar month opens, 立春, the birthday, a decade turns, a gate opens).
- **Selection:** a score per kind, the live gate ×1.3 and the Day Gate ×1.2, +15 for an echo, half score if the signature led in the last six days, the character leads under 30.
- **Push:** every marker and pillar day plus up to two strong days (score ≥ 65) a week, about 96 a year on the golden chart. Model A: the phone computes the next 35 days and posts `{date, code}`; no birth data on the server.
- **Units:** about 175 (about 130 if headlines stay engine labels). The Year page writes none: it reads `resolveChapters(...).years` and the Stars year stars.
- **Finding:** `getSolarTermDate` in `engine/calculator.js` runs a day early (sometimes two) in many years: 立春 on 3 Feb in 1995, 2020, 2023, 2024, 2027, 2028 (real 4 Feb), on 4 Feb in 2025 (real 3 Feb); 立秋 2027 on 6 Aug (real 8 Aug).

Questions: N1 name, T1 tiers, D1 Do/Avoid, D2 Best Hours, H1 headlines, S1 gate weight, S2 freshness, V1 character variants, P1 push model, P2 cadence, P3 push time, M1 month edges, F1 solar terms. Option A is the recommendation each time.

Rulings (owner, 2026-10-20): "N1 A, T1 A, D1 B, D2 A, H1 A, S1 A, S2 A, V1 A, P1 A, P2 A, P3 A, M1 A, F1 A".
- N1 A: "Your Almanac" on screen; "event signature" stays the engine word.
- T1 A: free = hub tiles, each Day's energy and lead, marker pushes; Seeker = full Day and Month, every reminder, the week strip; Advisor = the Year page and the 35-day look-ahead.
- D1 B: Do / Avoid kept, rewritten as plain statements of what the period favours (round 2 moves them inside each domain).
- D2 A: Best Hours retired.
- H1 A: written headlines. S1 A: live gate x1.3, Day Gate x1.2. S2 A: half score after six days. V1 A: two variants per day line.
- P1 A: codes computed on the phone, no birth data on the server. P2 A: markers and pillar days plus up to two strong days a week. P3 A: on the morning, at the reader's chosen hour.
- M1 A: solar months. F1 A: a minute-exact solar-term table for the almanac now; moving the calculator onto it is a separate ruling with an audit of which charts change.

The owner's direction with the rulings (verbatim): "Plus, I want keep the energy as the subject for each daily page. Instead of using Bazi characters and others, unravel the advise by saying what energy the day, month and year it carries, and then dive into each domain's advise after that. Always keep the energy as starting the threads of logic. Consider using this structure and come up with the new reading again"

Consequence: on this surface the domain law's no-advice rule is lifted (D1 B and the direction); the rest of the law stands.

## Round 2, energy first (2026-10-20): awaiting the owner

Same review page, version 2. Every page reads: the energy (stem element, branch as the ground underneath) -> how it meets the chart (element x role state) -> where it lands (the lead signature told as energy, gate named) -> all eight domains (the energy's three ruling domains and the landing's domain first and in full, what the period favours; the rest one line) -> the week, marked days, the months. Ten-god names, star names and Chinese characters leave the reading text. About 445 units.

Questions: E1 the day's two energies, E2 names and characters, E3 how many domains, E4 Year-page domains (Domains section's By-year lines or ours), E5 star days, E6 energy line per horizon, E7 the order of a domain line.


## Round 3, the visual language (2026-10-20): awaiting the owner

The owner's direction (verbatim): "Flesh out the design using more visual language and iconographies we had before, use five energy icons more than texts. In addition, think of any data and content we can visualize, and use metrics, bars, signs, domain icons to show things in a visual form than stacking texts for readings. Changing to visual language helps you to think what content vars and metrics we show to decode the reading instead of solely relying on texts. Use visual language as a key to unlock the perspectives and angles of the readings"

Same review page, version 3 (data-driven mockups; a picker opens any day from 8 Oct to 18 Nov). It uses the app's sprite (`src/components/journey/journeyDefs.js`: element marks, the function icons Body / Mind / Expression / Action / Order, the eight domain icons, the grow / release arrows) and adds eight signs: clash, punish, harm, bind, join, repeat, star day, Void day.

The measures, each a content variable the engine fills:
- the period's two energies (stem, and branch as the ground), their mix (stem half, branch half by hidden-stem weight), each energy's function and whether the reader grows or releases it;
- lift, -1 to +1: the mix weighed by the reader's grow (+) and release (-) energies, shown as a five-step Weighs / Lifts meter;
- the chart today: the five natal percentages with the period's arrival hatched on top;
- where it lands: a gate map with a sign on each bond;
- loudness (the ruled selection score, 1 to 5 bars) and rarity (the lead's cycle);
- domain weight, 0 to 3, lift or test: the energy's three ruling domains +2, the landing's gate +1 to +3 (Year and Hour Gates to Family, Month to Career, Day to Love), star days +1;
- favours pairs ("Keeping a promise over starting a new one");
- season need slots; ribbons for the week, the month's days and the year's months.

About 410 units, much shorter: a day page carries about 90 words instead of about 260.

Questions: G1 lift meter, G2 gate map, G3 domain board, G4 favours pairs, G5 chart today, G6 loudness and rarity, G7 the Hour Gate's domain, G8 the new signs, G9 ribbons; round 2's E1 to E7 still open.
