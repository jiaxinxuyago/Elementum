# THE DOMAINS: writer brief (sealed writers, owner-ruled 2026-10-17)

You are writing part of Elementum's domain reading. Elementum is a reading of a person's birth chart. Each of the eight life domains (Wealth, Family, Career, Social, Mind, Growth, Health, Love) gets a page. The page is assembled from the **seats** that rule the domain. A seat is one of ten characters sitting in one of four gates:
- **Year Gate:** birth to 15.
- **Month Gate:** 16 to 34.
- **Day Gate:** 35 to 47, the self and the partner.
- **Hour Gate:** 48 on, the people after you.

Each page climbs three steps, and the reader's journey has three beats:
1. **How you are.** "It knows me."
2. **What has already happened.** "How did it know that?"
3. **What is coming.** "Is that really going to happen to me?"

**The calibration is the owner-approved golden template:** `../2026-10-17-domains-template/template.json`. Read all of it before you write. Match its register, length, confidence and sentence shapes. Your output is the same JSON shape.

## Your files
- `worklist-<N>.json`: your units, with each seat's facts and its **ore**, the old locked texts. The ore holds the classical meaning: what this character in this gate does. Carry the meaning. Never the old voice: the ore's aphorisms, imperatives and images are exactly what you must not copy.
- Write `out-<N>.json`.
- Check it with `node gate.mjs out-<N>.json worklist-<N>.json` until it reports 0 failures. Then read every text once more, as a reader would.
- Edit no other file. No git, no deploy.

## The units (for seat worklists)
For each seat:
- **`defline`:** one sentence, 10 to 25 words. Opens "The <Persona> stands at your <Gate>, in plain view: …" (stem) or "The <Persona> lives inside your <Gate>: …" (branch), and may say "holds your strongest seat" for the month branch. A colon is allowed here only.
- **`reading`:** 55 to 85 words, 3 to 4 sentences. The seat across its whole life: the drive, its cause, its cost, the era and the people it arrives through. No "This position rules …" opener. No advice.
- **For each listed domain:**
  - **`headline`:** one sentence, 3 to 12 words. The tile line, so the domain's conclusion in this seat's terms.
  - **`recognition`:** 30 to 65 words, 2 to 3 sentences. Present tense: the behaviour in this domain, its cause in the reader's own need, its cost.
  - **`lived`:** 22 to 50 words, 2 sentences. Past and definite, tied to this gate's age span:
    - Year: "by your teens", "as a child", "in your first home".
    - Month: "since your late teens", "from your late teens".
    - Day: "so far", meaning the pattern up to now, read at any age.
    - Hour: "since your late forties", read by readers over 48.
  - **`ahead`** (Day and Hour seats only): 20 to 55 words, 2 sentences. The trajectory with its age: "from your mid-thirties" (Day), "from your late forties" (Hour). Future or present tense. Never "since".

## The law (owner rulings Q8 to Q11, Q15)
- **Be definite.** No may, might, likely, perhaps, probably. No "tends to", "sometimes you", "often you". A frequency word inside a claim is fine ("at least once", "more than once").
- **The past:** definite patterns tied to an age span. Never a single dated event, a place, a named person, or a digit. The engine prints ages and years in labels; your text never contains a number written as digits.
- **People:**
  - Day seats may name "a partner".
  - Hour seats name "the people after you" with a range ("children or younger relatives or someone you train"), so a reader with no children still fits.
  - Year seats may name "someone in your first home" or "an older relative".
- **Hard news is allowed.** Name a cost or a heavy stretch plainly, and in the same unit what carries the reader through. Never illness, disease, death, divorce, bankruptcy or sums of money. Body words stay at wellness level: sleep, appetite, energy, back, shoulders, rest.
- **No advice.** No imperative sentence and no counsel line. Say what happens and what it costs, never what to do.
- **Chart invariance.** Your text is shared by every chart that holds this seat. Never lean on another seat ("the saving you started as a child" is wrong on an Hour seat).

## Voice (Elementum house rules; the gate checks most)
- **The reader is the subject.** The last sentence must be the reader's ("You …", "Your …", "What you want …", or a main clause after ", and you …").
- **Every sentence follows from the one before**, on a causal joint (because, since, whenever, over time, each time, the more) or simply on the order. No "however", no "then", no "the difficulty is". At most one but, yet or still in a unit. No "X, so Y". No "ahead of". No "rather than" twice. No negative parallelism ("not X but Y").
- **Punctuation:** periods and commas only, at most two commas per sentence. No dashes, semicolons or colons (deflines excepted). No italics.
- **Words:** plain B1 to B2 English, British spelling (organise, favour, practise as a verb). Plain verbs (gets, keeps, holds, runs).
- **Banned:** room, verdict, legitimate, institutional, destiny, fate, cosmic, universe, palace, pillar, Ten Gods, BaZi, Day Master, delve, tapestry, testament, pivotal, crucial, intricate, robust, seamless, foster, underscore, showcase, leverage, vibrant, nestled, profound, realm, unlock, elevate, resonate, navigate, landscape, journey, trauma, trigger, boundaries. No Chinese characters.
- **No imagery** in these units. No blade, steel, forge, flame, root, river, crucible, granary, stage, horizon-as-metaphor and the like. Plain life nouns: money, home, work, friends, family, the body, food, rest.
- **No four-word run shared** between this seat's reading and any one of its domain units, or between that domain's units.
- **Vary openers** across the seat. The plain "You …" may open at most two of a seat's sentences in a row.

## The ten characters (cost dimension; what each one is about)
- **The Twin (比肩):** self-reliance, peers as equals, the standard held to oneself. Company that truly matches is rare.
- **The Rival (劫财):** comparison and contest, the shared prize, money and credit that others claim. Generosity that leaks.
- **The Artisan (食神):** ease, comfort, making and giving, being fed and feeding. Indulgence is the risk.
- **The Virtuoso (伤官):** brilliance against the grain, speaking out, performance. Shining reads as defiance to authority.
- **The Horizon (偏财):** opportunity from far off, windfalls, openings through people, range. Near things blur.
- **The Steward (正财):** value built and kept, steady provision, order with money. Counting what others spend freely.
- **The General (七杀):** pressure that does not ask permission, hard arenas, drive under strain. Peace can feel like demotion.
- **The Magistrate (正官):** the right standard, duty, rank, structure. The frame that holds you also holds you in.
- **The Alchemist (偏印):** unusual learning, private thinking, odd teachers, intuition. Isolation and unfinished output.
- **The Sage (正印):** shelter, care received, steady learning, protection. Shelter can become stillness.

**Stem vs branch:** a stem seat ("at", in plain view) is how others see it, so it is outward and event-like. A branch seat ("inside") is private, dispositional and felt at home first.

## The units (for worklist-6: decades, gaps, no-seat domains)
- **`decades.<god>.<Domain>.<helping|heavy>.<lived|ahead>`:** 18 to 45 words, 1 to 2 sentences. A ten-year stretch ruled by that character, read for that domain.
  - **Helping** means the decade's energy is what this chart needs, so the character's gifts land.
  - **Heavy** means the energy is already in excess, so the character's costs dominate. Name what carries the reader through.
  - **`lived`** speaks of "those years" or "those ten years", past and definite.
  - **`ahead`** speaks of "these years" or "these ten years", future or present.
  - No ages, no years, no digits.
- **`gaps.<Domain>.<month|day|hour>`:** one sentence, 14 to 32 words. It follows the engine's lead line "No seat in your <Gate> rules <Domain>." and says what that absence has meant in the era the reader is living now:
  - month: "Since sixteen …";
  - day: "Since your mid-thirties …";
  - hour: "Since your late forties …".
  - Present perfect tense; the domain took a back seat to other parts of life.
- **`unruled.<Domain>`:** 20 to 45 words, 1 to 2 sentences. Step 1 for a domain no seat rules. The decades move it instead. Template: the Health line.
- **`unruledHeadline.<Domain>`:** 3 to 12 words. The tile line for that page ("Your body follows the decade you are in.").

Reply with counts and six of your strongest lines.
