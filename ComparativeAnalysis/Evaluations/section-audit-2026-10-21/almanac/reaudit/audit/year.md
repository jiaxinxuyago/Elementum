# Re-audit · Your Almanac · Year pages and unreached units (sealed, scored fresh, 2026-11-14)

Scope: what the Almanac owns on these pages. That is the headline halves (`head.energy.*`, `head.land.*`, `head.mark.*`), `ground.matches`, `land.quiet`, the engine clause, and in U999 the Day and Month energy lines, the decade marker, the PUSH body and the favours pair. These are scored against the SOP §3 criteria, the AUDITOR_BRIEF limits and the owner's four rules (AM1 to AM4, 2026-11-14). Some lines on the page come from other sections: the year energy lines (`ENERGY … year.*`), `land.year.*` (both Life Chapters) and `year_domain.*` (Domains). I read them for context and contradictions, and file what I found on them under §4.

The 2026 year is 丙午 throughout, so every Year page carries the same `ground.matches` line ("Under it runs more Fire. It reaches you at full strength.").

## 1 · Scores

| Page | A1 | A2 | A3 | A4 | A5 | B | C | D | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| Y003 | 5 | 5 | 3 | 4 | 4 | 3 | 3 | 4 | 甲 Underfueled, Fire = Expression released, 午丑 harm at the Month Gate, all correct. The harm headline half "something at work quietly sours" is said again almost word for word by the year landing ("sours quietly"). |
| Y037 | 5 | 5 | 4 | 4 | 3 | 3 | 4 | 4 | Fire = Mind released for 己 Overfueled is right, and the chart has no bond (卯午 is a 破, which the engine does not model). The quiet line is correct here but flat. |
| Y067 | 5 | 5 | 4 | 4 | 4 | 3 | 4 | 4 | "Fire sharpens you, and home shifts" is accurate (Order grows for 庚, 子午 clash at the Day Gate) and tight. |
| Y078 | 5 | 5 | 3 | 4 | 3 | 3 | 3 | 4 | Body even for 丁 and the 午戌 frame at the Month Gate are correct. The headline's "work gathers pace" meets the landing's "You gather … at work". |
| Y088 | 5 | 5 | 4 | 4 | 4 | 3 | 3 | 4 | Action grows for 癸 Overfueled and the 子午 clash at the Month Gate is correct. "widens your reach" and the ground's "It reaches you" sit three lines apart. |
| Y100 | 5 | 5 | 3 | 4 | 3 | 3 | 3 | 4 | Body grows for 丙 Underfueled and the 午戌 frame at the Month Gate is correct. It shares the gather/work echo with Y078. |
| Y104 | 4 | 5 | 3 | 4 | 3 | 3 | 2 | 3 | The 寅午 frame at the Day Gate is correct. "home comes to a decision" predicts an outcome (AM1) and is restated by the landing. "reach" appears four times on the page. |
| Y105 | 5 | 5 | 4 | 4 | 4 | 3 | 4 | 4 | Same correct clash as Y067 (Order grows for 庚 Overfueled). Clean Almanac units. |
| Y108 | 3 | 5 | 4 | 4 | 4 | 3 | 3 | 4 | "Fire piles tasks on you" is right for 壬 Underfueled. The quiet line, though, says no strong bond reaches this reader. Their month and hour pillars are 丙午, an exact repeat (伏吟) of the year, and 午 self-punishes in three gates. |
| Y110 | 5 | 5 | 4 | 4 | 4 | 3 | 4 | 4 | "Fire loosens your tongue" is right for 乙 Overfueled, and the chart genuinely has no bond. |
| Y111 | 5 | 5 | 4 | 4 | 4 | 3 | 4 | 4 | Order released for 庚 Underfueled and the 子午 clash at the Year Gate are correct. "a family plan comes loose" fits the first home. |
| Y112 | 5 | 5 | 3 | 4 | 4 | 3 | 3 | 4 | The 丑午 harm at the Hour Gate is correct. "someone younger pulls away" is restated by the landing's "pulls back", and "reach" appears three times. |
| Y117 | 5 | 5 | 4 | 4 | 4 | 3 | 3 | 4 | Mind grows for 戊 Underfueled and the 子午 clash at the Month Gate is correct. "feeds your thinking" meets a Domains line's "thinking" and "think". |
| Y118 | 5 | 5 | 3 | 4 | 4 | 3 | 4 | 4 | The 丑午 harm at the Hour Gate is correct, though the engine leads with it over a 寅午 frame in two gates. The headline half is restated by the landing. |
| U999 | 4 | 4 | 4 | 4 | 3 | 2 | 3 | 3 | The even lines are correct but generic, and five of them close on a participial tail. The decade marker and its PUSH disagree on "today" versus "this year", and "decade of your life" reads as an age. "a long new chapter" is clumsy. |

**Mean B: 2.73** (41 / 15).

## 2 · Findings

| Id | Severity | Criterion | Page(s) | Station key | Quoted words | What is wrong | The fix |
|---|---|---|---|---|---|---|---|
| YR-1 | MINOR | A1 | Y108 (unit shared with Y037, Y110 and every quiet Day/Month/Year page) | TEMPLATED tpl_almanac · land.quiet | "No strong bond reaches your gates this time." | This is false for some charts. On Y108 the 丙午 year repeats the reader's 丙午 month and hour pillars exactly (伏吟), and 午午 is a self-punishment (自刑: 三命通会 lists 辰午酉亥 as 自刑) in the month, day and hour gates. The engine scores these below the threshold to lead, but the line says no strong bond exists at all, which is not what happened. | "No bond at your gates is strong enough to lead this time. What you meet comes from the energy above, at the pace it sets for you." (27 words. It stays true whatever the engine scored below the threshold.) |
| YR-2 | MINOR | A1 | Y108 (also Y100, Y104, whose 庚午 year pillar repeats the year's branch) | ENGINE clause (selection) | (no clause shown; quiet chosen) | An exact pillar repeat of the year (伏吟, 渊海子平 / 三命通会 "伏吟反吟") never leads, and 午午 自刑 is not modelled. On Y108 a reader with three 午 and two identical pillars gets the quiet page. | Rule: an exact stem-and-branch repeat of a natal pillar by the year scores at least the year lead threshold, and a self-punishing branch (辰 午 酉 亥) meeting itself counts as punish. Otherwise keep YR-1's wording. Count on this sample: 1 of 14 Year pages shown quiet when it should not be. Run it over the 400-chart sweep before ruling. |
| YR-3 | MINOR | AM1, A3 | Y104 | TEMPLATED tpl_almanac · head.land.frame.day | "home comes to a decision" | A frame gathers strength. This half settles the outcome instead (AM1: never how it ends), and on the Year page the landing then restates it ("You make a decision about home"). | "a home question gathers force" |
| YR-4 | TWEAK | C | Y088, Y104, Y108, Y112 (unit on every matching-ground page) | TEMPLATED tpl_almanac · ground.matches | "It reaches you at full strength." | It collides with the Action headline "widens your reach" and with the 偏财 Domains line "Money reaches you", so "reach" appears 3 to 4 times on a page. "meets" and "comes" would collide with land.quiet, so they are no good either. | "Under it runs more {el}. You take it at full strength." |
| YR-5 | TWEAK | A2 | U999 | TEMPLATED tpl_almanac · head.mark.decade | "a long new chapter starts" | "long new" is a clumsy stack of adjectives. The length is the information, so it should be named. | "a new ten-year chapter starts" |
| YR-6 | MINOR | A1, A2 | U999 | PUSH · mark.decade | "A new decade of your life begins today." | "Decade of your life" reads as an age birthday (30, 40), but luck cycles start at offsets such as 7, 17 or 27. It also says "today" where the marker line says "this year". | "Your next ten-year cycle begins today. Read your year." |
| YR-7 | MINOR | A1, B | U999 | TEMPLATED tpl_almanac · mark.decade | "Your next cycle of luck begins this year and runs ten years from this birthday. A different season of your life opens with it." | 起运 (the cycle's start) is worked out from the distance to the 节 and rarely falls exactly on the birthday, so "from this birthday" claims a precision the engine does not have. "this year … this birthday" clashes with the PUSH's "today". "luck" leans towards fate. The second sentence is generic (B 2). | "Your next ten-year cycle begins around this birthday and runs until the one after it. Every year inside it now reads against this new ground for you." (27 words) |
| YR-8 | TWEAK | C | U999 (any Day page showing Mind even) | ENERGY mind · day.even.a | "an energy that sits lightly on your chart" | The headline on the same page is `head.energy.mind.even` "{el} sits quietly with you", so "sits" appears twice. | "{el} brings Mind, an energy that rests lightly on your chart. Thinking stays clear and ordinary today, with learning moving at your usual speed." |
| YR-9 | TWEAK | C | U999 (any Day page showing Mind even) | ENERGY mind · day.even.b | "A quiet hour comes and goes" | It repeats "quietly" from the headline half "{el} sits quietly with you". | "{el} brings Mind, neither more than you need nor less. A calm hour comes and goes without fuss, leaving your mind your own." |
| YR-10 | TWEAK | C | U999 (any Day page showing Order even) | ENERGY order · day.even.a | "The day keeps its shape … in good time" | The headline half `head.energy.order.even` is "{el} keeps you on time", so "keeps" and "time" both repeat. ("pace" is avoided because land.quiet already uses it.) | "{el} brings Order, a mild dose of structure your chart takes calmly. The day holds its shape without pressing, each request reaching you with room to spare." |
| YR-11 | TWEAK | A2 | U999 | TEMPLATED tpl_almanac · favours_land.repeat.month | "a brand new brief" | "brand new" used before a noun needs a hyphen in British usage. "fresh" avoids the hyphen and keeps the meaning. | "Clearing a backlog\|a fresh brief" |

The engine clause is accurate on all 10 bonded Year pages: 午丑 harm ("wears at the Earth"), 子午 clash ("strikes the Water"), 午戌 and 寅午 half-frames ("joins the Earth", "joins the Wood"), and the gate seats are as the brief rules. It reads cleanly, so I filed no wording finding.

## 3 · Systemic patterns

1. **On the Year page, the landing half of the headline is restated by the year landing line.** 6 of 10 bonded pages. Y003: "something at work quietly sours" / "Something at work sours quietly". Y112 and Y118: "someone younger pulls away" / "pulls back without a word". Also Y104 (decision / decision) and Y078, Y100 (gathers / gather … at work). The headline halves are shared with the Day and Month pages, so the fix belongs on the `land.year.*` side (§4, OS-5). Not MAJOR.
2. **Shared word collisions between a fixed unit and a headline.** 7 units affected. `ground.matches` "reaches" against "widens your reach" (4 pages, YR-4). On even pages: "sits" and "quiet" (YR-8, YR-9) and "keeps … time" (YR-10). Each has a TWEAK. Not MAJOR.
3. **The even energy lines close on a participial tail.** 5 of 6 in-scope even lines: "leaving your mind your own", "with learning moving at your usual speed", "each request reaching you in good time", "asking little of your attention", "each one sized to your usual effort". The year even lines do the same (§4). The result is flat and interchangeable (B 2). Proposed rule: vary how the second sentence closes, and let the reader be the subject of at least half of them. Not MAJOR, since even states are rare (STATE: charts with no role for an element).
4. **Outcome-settling in shared outcome halves (AM1).** In scope this is 1 unit (`head.land.frame.day`, YR-3). Off scope it is pervasive in `land.year.*` and the year energy lines (§4, OS-3 and OS-5). Not MAJOR in scope.
5. **", and you" density on the Year page.** Every page carries 3 to 5. None of them is in an Almanac-owned unit: all come from Life Chapters and Domains lines (§4, OS-4 and OS-6). Under AM4 this is the largest single problem the reader sees on the Year page.

## 4 · For other sections

| Id | Section | Key(s) | Pages | Quoted | What is wrong | Proposed direction |
|---|---|---|---|---|---|---|
| OS-1 | Life Chapters | ENERGY action·order·expression·mind · year.need | Y088, Y105, Y110, Y112, Y117 | "the energy you need most" | AM2: it ranks the energy. | "an energy your chart runs short of" |
| OS-2 | Life Chapters | ENERGY expression·mind·order · year.heavy; action · year.grow | Y003, Y037, Y111, Y104 | "already overflows with"; "already has too much of"; "already carries too much of"; "already has and still wants" | AM3: these state an amount, not a direction. | "more than your chart can use" / "one that weighs on you" |
| OS-3 | Life Chapters | year.heavy, year.need, year.grow | all 14 | "you keep your footing through a fixed routine and someone who holds you to your word"; "you get moving again through plain work and a firm deadline"; "you hold steady through study, a mentor's help and a quiet hour"; "you get your hands on more than you have in years"; "you learn more in these months than in several years before"; "you end the year harder to bend" | AM1: the heavy lines prescribe a cure (advice belongs only in favours, D1 B) and settle the outcome. The need lines promise outcomes. | Rebuild each one to name what arrives and what it asks, with no cure and no result. |
| OS-4 | Life Chapters | ENERGY … year.* | 11 of 14 | ", and you get …", ", and you say …" | AM4: these sentences use the banned ", and you" joint. | Join with a full stop, "while" or "as". |
| OS-5 | Life Chapters | land.year.clash.month / clash.day / clash.year / harm.month / harm.hour / frame.month / frame.day | Y003, Y067, Y078, Y088, Y100, Y104, Y105, Y111, Y112, Y117, Y118 | "You leave a role or a team you have outgrown this year, by your own choice or by theirs"; "and you adjust quickly"; "you see it before anyone says it"; "you notice the distance before it hardens"; "it carries further than you planned"; "You make a decision about home…" | A1 and AM1: leaving a job and moving house are claims about outcomes that a year bond cannot know. "adjust quickly" and "see it before anyone says it" settle the bond in the reader's favour. ", and you" appears 6 times. Several lines restate the headline half (pattern 1). | Rebuild in the AM1 shape: what changes, where, and what it costs or asks. Add something the headline half has not said. |
| OS-6 | Domains | year_domain.* (all gods) | all 14 | ", and you …" in every line (42 lines); "you hold up under it better than anyone expects" | AM4 throughout. AM1 on the 七杀 Career line. | Apply AM4. Drop the predicted result. |
| OS-7 | Domains | year_domain.* (not pole-aware) | Y108, Y003, Y111 | Y108 Action released ("Fire piles tasks on you") next to 偏财 "Money reaches you this year through side doors"; Y003 Expression released next to 食神 "you get paid more readily for what you enjoy making"; Y111 Order released heavy next to 七杀 "you hold up … better than anyone expects" | A1 contradiction: a released energy's domain lines read as a boon. | Write domain lines per grow/release, or keep them neutral. |
| OS-8 | Domains | year_domain.Career (劫财) | Y078 | "A colleague or partner reaches for the same credit" | "partner" outside the Day Gate is ambiguous (business partner or partner). | "A colleague or a peer". |
| OS-9 | Life Chapters | ENERGY action·order·mind · year.even; expression · year.grow; body · year.core_even | U999, Y078, Y118 | "only steady building at your own rate"; "asking you to carry them as you always have"; "keeping your stride sure from spring to winter"; "giving out as much as you mean and no more" | The same participial tails as pattern 3. Generic (B 2). | Vary the closes. |

All 14 domain gods are correct for the Day Master against the year stem 丙 (子平真诠 ten gods: 甲→食神, 己→正印, 庚→七杀, 丁→劫财, 癸→正财, 丙→比肩, 壬→偏财, 乙→伤官, 戊→偏印).

## 5 · The best and the worst

Best:
1. "Fire piles tasks on you" (head.energy.action.release, Y108): four words, the cost named plainly, with the reader as its object.
2. "Fire sharpens you, and home shifts" (Y067, Y105): accurate for Order grown, short, and quotable.
3. "The year's Fire wears at the Earth in your Month Gate, the seat of your work." (ENGINE clause, Y003): an exact mechanism in plain words.

Weakest:
1. "No strong bond reaches your gates this time." (land.quiet, Y108): false for a chart that repeats the year in two pillars.
2. "home comes to a decision" (head.land.frame.day, Y104): settles the outcome, and the landing below restates it.
3. "a long new chapter starts" (head.mark.decade): clumsy, and it hides the one fact it has to give, ten years.
