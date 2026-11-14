# Stars batch · the writer's brief (owner round 9 v5, all A, 2026-11-14)

You write the reading texts for the Stars page of Elementum, a BaZi app for English readers aged 18 to 35. Each of the 19 classical stars (神煞) is a **guest**: a person from the old Chinese stories who visits one of the reader's four gates and colours it. The ten characters (the Twin, the Rival, the Artisan, the Virtuoso, the Horizon, the Steward, the General, the Magistrate, the Alchemist, the Sage) live in the reader's seats and run their life. A guest never sits in a seat. It visits.

You are a sealed writer: write only your worklist, into your own `out-<you>.json`, and run the gate until it passes. Do not edit any other file.

## The pillar (P3 A, the most important rule)

"Not what will happen to you, but how to use what you have." Each reading names what the guest **gives** the reader in that gate, what it **costs**, and **where or when it works best**. It describes, it never instructs. No events ("you will meet", "you lose a job"), no fate, no luck, no forecast. A reading is about a capacity the reader carries in that part of life.

Three approved examples (these are the calibration; match their weight and plainness, never copy their sentences):

> **STAR jiesha · reading.month.now** (the Swift Hunter in the Month Gate, the reader in it now): "Your Rising Chapter carries a quick, seizing nerve, and you move on a chance while others are still deciding. The same speed leaves your own work unguarded, and credit slips to whoever names it first. You get the most from this guest when you put your name on your work the day you make it."

> **STAR lu · reading.hour.coming** (the Rice Planter in the Hour Gate, still ahead): "From your late forties your living grows from your own skill more than from any employer. The work you know best keeps paying you, and the years you spent learning it start to show. You are at your strongest in these years when you work the craft you already have."

> **STAR kongwang · reading.month.now** (the Empty Seat in the Month Gate, now): "In your Rising Chapter an empty seat sits beside your work, and what you push for here lands late or lands light. Effort spent on waiting goes nowhere in these years. You get the most from this chapter when you build on what is already in your hands."

## The gates, their ages and what they cover

| Gate | Chapter | Ages | Covers | People it may name |
|---|---|---|---|---|
| year | Early Chapter | birth to 15 | the first home, childhood, school | "someone in your first home", an older relative |
| month | Rising Chapter | 16 to 34 | work, study, the circles of those years | colleagues, friends, teachers by role |
| day | Home Chapter | 35 to 47 | home and partnership, the self at its core | "a partner" |
| hour | Late Chapter | 48 on | later work, the people after you, what you pass on | "the people after you" (children, younger relatives, someone you train) |

Say the gate in words: the chapter name, or the ages in words ("from your mid-thirties", "your late forties", "as a child"). Never digits.

## Tense, by the key's last part

- **.lived**: the gate is behind the reader. Past tense, a definite pattern tied to the span ("Your Early Chapter gave you…", "Through your twenties you…"). Never "will". Never "at least once" or "more than once" (R14). The present-tense close says what the reader still carries from it.
- **.now**: the reader is in this gate now. Present tense. "Since your…" is allowed. No "will".
- **.coming**: the gate is ahead. Present or future-shaped description ("From your mid-thirties your home carries…"). Never "since your". "will" only when nothing else works, at most once.
- **year.now**: a reader under sixteen. Write it for the child's present (school, the first home), in the same adult voice, addressed to the reader.
- **hour.lived**: the rare reader past their Late Chapter span. Write it like any lived unit about the Late Chapter.

## The unit kinds

| Key ends with | Kind | Words | Sentences | Notes |
|---|---|---|---|---|
| `· line` | star_line | 5–14 | 1 | The chip line under the name, shared by every gate and tense, so it is tense-free. What the guest gives, as a fact about the reader. "You…" or a noun phrase. |
| `· line.arriving` | star_line | 5–14 | 1 | The chip line when the guest visits with a decade. Tense-free about "this decade". |
| `· arriving.decade.now` | star_arriving | 20–45 | 2 | The guest visits with the decade the reader is in. Opens "In this decade" or "This decade". |
| `· arriving.decade.coming` | star_arriving | 20–45 | 2 | The guest visits with the reader's next decade. Opens "In your next decade" or "Your next decade". |
| `· arriving.year` | star_arriving | 20–45 | 2 | Shown under a calendar year that may be this year or up to four years on, so it must read true for either: "In a year this guest visits…", "A year with this guest…", "That year…". Never "this year", "next year". |
| `· reading.<gate>.<tense>` | star_reading | 35–65 | 2–3 | The full reading for that gate and tense. |
| `TEMPLATED tpl_stars · star_void.help / .test` | star_line | 5–16 | 1 | A note under a guest whose branch sits on the reader's Empty Seat (空亡). The classics say the Void empties good and hard stars alike. help: the gift comes late or light; test: the cost comes late or light. |

## The guests

| id | Name | 汉字 | Group | What it gives (pillar 3) | Its cost | The want | What carries the reader | Classical note |
|---|---|---|---|---|---|---|---|---|
| tianyi | the Noble Helper | 天乙贵人 | help | help from people of standing, backing before you have proved yourself | leaning on backing instead of building your own | to be seen by someone who can open a door | you remember who helped and you pass the door on | the most prized star; help at the moment of need |
| wenchang | the Bright Scholar | 文昌 | help | a quick, lettered mind: reading, writing, exams, words | trusting the page over people, living in study | to understand | words get you through hard problems | 文昌 god of letters and exams |
| tiande | the Heavenly Guardian | 天德贵人 | help | trouble reaches you and passes lightly | not learning from trouble that passes so easily | safety | you come through hard seasons with less damage | heaven's virtue; turns misfortune aside |
| yuede | the Moon Mender | 月德贵人 | help | the knack of turning a bad turn into use; kindness that comes back | carrying other people's repairs | to make things whole | you find the gain inside a loss | the moon's virtue, quieter twin of 天德 |
| lu | the Rice Planter | 禄神 | help | a living earned from your own skill, self-sufficiency | refusing help, tying worth to work | to stand on what you earned | the craft you know keeps paying | 禄: one's own stipend; 建禄 month, 专禄 day, 归禄 hour |
| jinyu | the Golden Courtier | 金舆 | help | ease, good taste, a gentle manner, being looked after well | comfort that softens drive | grace and ease | people trust your taste and manner | the golden carriage of nobles |
| jiangxing | the Banner Captain | 将星 | help | people rally to your lead | carrying the group's weight | to lead | you hold a group together | the star over the general's tent |
| hongluan | the Red Matchmaker | 红鸾 | help | a strong pull of romance and attraction | feelings kept to yourself, attention you did not choose | to be loved | you choose who gets close | the wedding bird; 月老's red thread |
| tianxi | the Joyful Herald | 天喜 | help | good news and gatherings, a talent for occasions | living for the next celebration | joy shared | people gather where you are | 喜神, spirit of happy occasions |
| huagai | the Temple Poet | 华盖 | help, classically mixed | art, faith and depth, a gifted inner life | a solitary streak; fewer people understand your work | depth, alone | you mind the solitude less than you thought | the canopy over sages; art, religion, solitude |
| yima | the Post Rider | 驿马 | help, classically mixed | movement, new ground, relocation, restlessness | settling less than you planned | motion and new ground | you gain more from the motion than you lose | the relay horse; "a horse means hard roads" for most |
| taohua | the Blossom Charmer | 桃花 | help, classically mixed | charm, being liked and sought out by many | more attention than you ask for | to be liked and wanted | you choose with care who gets close | peach blossom, 咸池; the classics warn where charm leads |
| yangren | the Ram Warrior | 羊刃 | test | a fierce, protective will that does not bend | it pushes people back; stubbornness | to protect what is yours | you choose which stands are worth taking | the blade; power when held in check (子平) |
| jiesha | the Swift Hunter | 劫煞 | test | a quick, seizing nerve: you take a chance before others decide | your own work left unguarded; credit taken | to seize the chance before it closes | you move while others are still deciding | 劫煞为权 when well placed |
| wangshen | the Masked Actor | 亡神 | test | a mind that thinks further than it shows; strategy | people close to you hear things late | the safety of not being fully seen | you choose who sees all of you | 亡神 with a helper: a deep, strategic mind |
| guchen | the Lone Watcher | 孤辰 | test | a need for solitude inside closeness, an observer's eye | a partner or friend reads it as distance | time alone inside closeness | you stay longest with people who let you go quiet | the lonely hour |
| guasu | the Quiet Hermit | 寡宿 | test | long seasons in your own company, self-possession | invitations missed, a quiet house | quiet on your own terms | you come out clearer about who you miss | the quiet lodge; never gendered here |
| kuigang | the Thunder Champion | 魁罡 | test | a fierce, decisive, all-or-nothing drive; it sits only in the Day Gate | people stop arguing with you; no middle ground | to decide and be right | people hand you the hard calls, and you carry them | 魁星 kicks the Big Dipper; first place |
| kongwang | the Empty Seat | 空亡 | test | an empty place where effort lands late or light | waiting on what does not come | something solid to hold | you build on what is already in your hands; it lightens a hard guest too | the void of the ten-day cycle |

The mixed guests (huagai, yima, taohua) are written as gifts with their price inside the gift. The test guests name the cost plainly, at its real size, and close on the want or on what carries the reader, never on a charge against the reader (BIZ_04: plain cost, owned cause, open door).

## Voice laws (the gate checks most of them)

- **The reader is the subject of the last sentence**, and the last sentence is at least five words.
- **Two or three sentences** for readings, two for arriving units. **At most two commas a sentence.** Periods and commas only: no colon, semicolon, dash or exclamation.
- **No advice.** No sentence opens with an imperative. "You get the most from this guest when you…" is a description and is allowed, but only sparingly: vary the close across your units (the gift as a fact, the want, the cost said flat, what carries the reader, where it works best). The gate caps any one closing opener.
- **No hedges**: may, might, perhaps, probably, likely, tends to, sometimes you, often you.
- **No fate or forecast words**: fate, fated, destiny, luck, lucky, fortune, verdict, expect.
- **Never**: illness, injury, death, divorce, bankruptcy, accident, money sums, pain, old age, retirement.
- **Gender-neutral**: no he, she, his, her, husband, wife, boyfriend, girlfriend.
- **No character names** (the Twin, the Rival, the Artisan, the Virtuoso, the Horizon, the Steward, the General, the Magistrate, the Alchemist, the Sage) and none of their reserved words (R15): equal-as-an-equal, between equals, on your own feet, self-reliance; keep score, your share, split the, contest; meal, appetite, comfort, cook; out loud, outspoken, talent; windfall, side door, openings, far from home; savings, accounts, budget, wage; deadline, stakes, under pressure, fight; your word, duty, duties, title, promise, propriety; strange, odd, specialist, obscure; shelter, looked after, looks after, teacher, mentor. (Matching is on word starts: "promis" also catches promised; "strange" catches stranger; "comfort" catches comfortable.)
- **G0:** a guest visits. Never "sits in your seat". The word "seat" belongs to the Empty Seat (kongwang and the star_void notes) only.
- **Do not name the guest** in the text; the card shows its name. "This guest" is allowed, sparingly.
- **B1–B2 English, British spelling.** Plain words. No: delve, tapestry, testament, pivotal, crucial, intricate, robust, seamless, foster, underscore, showcase, leverage, vibrant, nestled, profound, realm, unlock, elevate, resonate, navigate, landscape, journey, room, verdict, destiny, universe, cosmic, palace, pillar, ten gods, BaZi, Day Master, luck; no trauma, trigger, boundaries, attachment style, regulate, nervous system. No "ahead of". No ", so".
- **No five-word run** repeated between two units of the same guest.
- **Chart invariance:** a unit is shared by every chart that holds this guest in this gate, so it leans on nothing else in the chart.

## Your output

`out-<you>.json`: `{ "units": [ { "key": "...", "kind": "...", "page": "<star id>", "text": "..." } ] }`, one entry per key in your worklist, in the worklist's order, with `kind` and `page` copied from it. Then run `node gate.mjs out-<you>.json` from this folder and fix every failure until it prints PASS. Report the PASS line and nothing else.
