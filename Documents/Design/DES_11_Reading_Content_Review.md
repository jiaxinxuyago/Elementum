# Reading Content — Owner Review

> **Generated** by `Elementum_App/tools/build-reading-review.mjs` — do **not** hand-edit.
> Edit the source data (`d13FacesContent.js`, `tgNames.js`) and re-run the script.
> Companion visual: [`reading-replicant.html`](reading-replicant.html) (open in a browser).

**Legend** — ✅ persona **reading** (R/X + lede + pull) is verbatim from the deliverable · ✍️ Claude-authored, **needs your review**.

> ⚠ **Card teasers were enriched for _all_ ten personas this pass** (the deliverable's were ~2 sentences; grown to 3–4). So even the ✅ personas' teasers, the element briefs, and the composed element pages are new copy worth a read.

---

## 0 · Where the reading data lives (architecture audit)

The reading **data is pure** (no engine/React deps — every file below is Node-importable), but it is **not yet a single library** — it is split between `src/content/` and `src/components/d13/`, and `d13ReadingResolve.js` mixes data maps with resolve logic. Consolidating into one `content/reading/` library with barrels is **Phase 4 of `DEV_05_Arch_Cleanup_Audit.md` — deferred, pending your approval** (strictly behavior-preserving). So: the separation you expected is **not done yet**; the data is clean and extractable, just scattered.

| File | Exports (reading data) | Keyed by | Pure? |
|---|---|---|---|
| `components/d13/d13FacesContent.js` | `FACE_CARD`, `PERSONA_READING`, `PERSONA_DOMAINS`, `FAMILY_BRIEF`, `FAMILY_CLAUSE`, `FAMILY_ELEMENT` | Ten-God 汉字 / family | ✅ pure |
| `content/tgNames.js` | `TG_PERSONA` (persona display names) | Ten-God 汉字 | ✅ pure |
| `components/d13/d13ReadingContent.js` | `ENERGY_CONTENT` (per-element fallback) | element | ✅ pure |
| `components/d13/d13ReadingResolve.js` | `PERSONA_COPY`, `FACE_ABSTRACT`, `DOMAIN_BY_GOD` + `resolve*()` | Ten-God 汉字 | ⚠ data+logic (imports engine) |
| `content/archetypeSource.js` | `STEM_CARD_DATA`, `TG_CARD_DATA` (base corpus) | stem / Ten-God | ✅ pure |

This document + replicant cover the **FACES reading layer** (`d13FacesContent.js` + `tgNames.js`) — the copy enriched in this pass. The Day-Master (stem) corpus in `archetypeSource.js` is a separate review.

---

## 1 · Element briefs (P6–P10 · the dominant-energy card)

_The one-line brief shown on each element's FACES page. Same for any Day Master with that element in that family role._

| Element (for a Metal DM) | Brief |
|---|---|
| **Metal** 金 · 比劫 · self | Metal is **you** — the self the other four energies turn around. |
| **Earth** 土 · 印 · resource | Earth is **your support & nourishment** — the ground you’re built on. |
| **Water** 水 · 食伤 · output | Water is **your output & expression** — how you meet and remake the world. |
| **Wood** 木 · 财 · wealth | Wood is **your wealth & desire** — everything you treat as worth having and keeping. |
| **Fire** 火 · 官杀 · authority | Fire is **your authority & structure** — the structure you answer to and grow into. |

---

## 2 · The 10 personas (P12/P13 full readings + P6–P10 card teasers)

### The Steward · 正财  — ✅ verbatim
*Rules: Steady holdings — wealth tended and kept.*  ·  keywords: Steady · Accruing · Enduring

**Card teaser** (P6–P10):
> Worth, to you, is built slowly and kept. Security is something earned in steady, deliberate increments. You trust the slow ledger over the lucky break, and it makes you dependable with what matters. The only real risk is holding a thing so tightly it stops growing.

**Reading page** (lede tail): _…wears the face of The Steward — the one who builds value slowly and refuses to let it slip._

**What it says about you · R:**
> You hold what you gather. Worth, for you, is tended over time — accrued in steady increments, compounded, rarely gambled. Where others chase the windfall, you trust the slow ledger: the thing that grows because you kept showing up for it.
>
> This is the quiet engine behind your security. It makes you dependable with what matters and slow to part with it — sometimes slower than the moment deserves.
>
> _“Enough” is a number you can actually name — and you’re nearly always building toward it._

**What to do with it · X:** Put your hand on the long arc: the account that compounds, the craft that deepens, the bond that keeps. Notice the one place you’re holding so tightly it’s stopped growing.

**Life domains** (4): Wealth · Relationships · Career · Health 🔒
- **Wealth** — Your home domain — security built in steady layers, and the fear of ever losing it.
- **Relationships** — You love by providing and keeping. Loyalty runs deep; letting go runs hard.
- **Career** — You compound mastery. The long game rewards you where the quick pivot would not.
- **Health** _(Seeker)_ — How holding-on settles in the body — where steadiness turns to tension. Seeker.
- _Gate:_ Seeker — the full Steward reading — Every domain in depth · where holding turns to hoarding · the season it tightens.

---

### The Horizon · 偏财  — ✅ verbatim
*Rules: Windfall & opportunity — wealth that arrives in waves.*  ·  keywords: Expansive · Sensing · Distant

**Card teaser** (P6–P10):
> You read money as movement — pulled toward the deal on the horizon more than the one already in hand. Opportunity registers at a distance, and you back the bet others hesitate on. Windfall energizes you; routine quietly bores you. The skill is choosing which horizons are actually worth crossing.

**Reading page** (lede tail): _…wears the face of The Horizon — the one that reaches for what isn’t here yet._

**What it says about you · R:**
> You read value as movement. Opportunity registers at a distance — the deal forming, the door about to open — and you’re pulled toward it more than toward what’s already in hand. Windfall energizes you; routine quietly bores you.
>
> Money and chance feel alive in your hands, and you’re generous with both when the mood is good. The catch is the reach itself: always leaning toward the next thing can mean the last good thing slips away uncounted.
>
> _You’d rather chase the next good thing than count the last one._

**What to do with it · X:** Aim the reach: pick the horizons worth crossing and let the rest pass. Pair it with the Steward’s patience so what you catch doesn’t slip straight back out.

**Life domains** (3): Wealth · Career · Relationships 🔒
- **Wealth** — Upside over safety — you back the bet others hesitate on, and feel the swings.
- **Career** — You thrive on the new venture, the open lane — and stall when the work goes flat.
- **Relationships** _(Seeker)_ — Drawn to the spark of the new — where novelty helps, and where it costs. Seeker.
- _Gate:_ Seeker — the full Horizon reading — Every domain in depth · where reaching turns to restlessness · the season it spikes.

---

### The Twin · 比肩  — ✍️ authored — review
*Rules: Identity & autonomy — standing on your own.*  ·  keywords: Independent · Resolute · Self-made

**Card teaser** (P6–P10):
> You trust your own counsel first. Self-reliance is a strength — and, now and then, a wall others can’t get past. You begin without waiting for permission and finish without needing rescue. The art is knowing the moment standing alone costs more than it’s worth.

**Reading page** (lede tail): _…wears the face of The Twin — the one who stands on their own ground and answers to their own measure._

**What it says about you · R:**
> You keep your own counsel. Before you weigh what anyone else thinks, there’s a standard already set inside you — and that’s the one you actually answer to. It makes you steady when a room wobbles, and hard to move once you’ve decided.
>
> Independence like this is a quiet kind of strength: you don’t need permission to begin, and you rarely need rescue to finish. The cost is that the same wall that keeps you upright can keep others out.
>
> _You’d rather be right with yourself than agreeable with everyone._

**What to do with it · X:** Lean on it where conviction is the job — the call only you can make, the line only you will hold. Loosen it where a hand offered is worth more than a point proven.

---

### The Rival · 劫财  — ✍️ authored — review
*Rules: Ambition & rivalry — the spur of a worthy opponent.*  ·  keywords: Driven · Competitive · Bold

**Card teaser** (P6–P10):
> You rise to a contest. Comparison sharpens you, though it can also spend the energy you meant to keep. Put an equal in front of you and you find a gear you forgot you had. Just watch that the race doesn’t cost more than the finish line pays.

**Reading page** (lede tail): _…wears the face of The Rival — the one who comes alive against a worthy equal._

**What it says about you · R:**
> You rise to a contest. Put an equal in front of you and something sharpens — you find a gear you didn’t know you had. Comparison isn’t vanity for you; it’s fuel, the way you learn how far you can actually go.
>
> That drive wins ground others leave on the table. But rivalry spends what it earns: the same heat that pushes you forward can burn through the very thing — energy, money, goodwill — you meant to keep.
>
> _You measure yourself against the best in the room, and it makes you better and poorer at once._

**What to do with it · X:** Point it at a real opponent — a standard, a record, a version of yourself worth beating — and let it drive. Pull it back when the contest is costing more than the win is worth.

---

### The Sage · 正印  — ✍️ authored — review
*Rules: Steady support — the roots that hold you.*  ·  keywords: Grounding · Nurturing · Patient

**Card teaser** (P6–P10):
> You learn deeply and keep what you learn. Support — given or received — is never wasted on you. You’re nourished by what others hurry past, and steadied by roots that run long and quiet. The watch is for when “not ready yet” quietly becomes a place to stay.

**Reading page** (lede tail): _…wears the face of The Sage — the one who learns deeply and is held by roots that run quiet and long._

**What it says about you · R:**
> You take things in and keep them. Knowledge, care, the steadying presence of people who wish you well — none of it is wasted on you; it settles into ground you can stand on later. You’re the one who reads to the end, who remembers, who is nourished by what others rush past.
>
> This is the root beneath your composure. It makes you patient and hard to rattle — though roots that only ever take in can grow reluctant to move, waiting to feel ready before they begin.
>
> _You are steadier than you know, and you know more than you let on._

**What to do with it · X:** Trust the slow accrual — the study, the mentor, the long relationship — where depth is the point. Notice where “not ready yet” has quietly become a place to hide.

---

### The Alchemist · 偏印  — ✍️ authored — review
*Rules: Unorthodox insight — nourishment from the unexpected.*  ·  keywords: Intuitive · Unorthodox · Transmuting

**Card teaser** (P6–P10):
> You feed on the strange and the oblique — understanding tends to arrive sideways, rarely on cue. You turn raw, unpromising material into sense the way few others can. Original and self-sufficient, you think best alone. Just don’t let the wondering become a room you never leave.

**Reading page** (lede tail): _…wears the face of The Alchemist — the one who turns the strange and the unwanted into understanding._

**What it says about you · R:**
> You feed on the oblique. Insight arrives for you sideways — from the odd source, the dropped remark, the thing everyone else stepped over — and you have a knack for turning raw, unpromising material into sense. Understanding rarely comes on cue; it comes when it comes, and it’s usually worth the wait.
>
> This is the ground your edge is forged on. It makes you original and quietly self-sufficient — though the same inward turn can tip into over-thinking, or into feeding yourself so privately that nothing gets out.
>
> _You make meaning from what others discard — and sometimes forget to share it._

**What to do with it · X:** Give it strange problems and let it wander; that’s where it earns its keep. Then set a deadline, because insight this good is wasted if it never leaves your head.

---

### The Artisan · 食神  — ✍️ authored — review
*Rules: Natural expression — making that flows without strain.*  ·  keywords: Fluent · Generous · Easeful

**Card teaser** (P6–P10):
> Ideas come easily and you give them away gladly. Creation, for you, is play before it is ever work. You make rooms lighter and tables fuller without seeming to try. The one caution is drift — when everything flows, it’s easy to coast past your best.

**Reading page** (lede tail): _…wears the face of The Artisan — the one for whom making is play before it is ever work._

**What it says about you · R:**
> Things flow out of you without much strain. Ideas, warmth, the small pleasures of doing a thing well — they come easily, and you give them away gladly. For you, creation starts as play; the work is just the play taken seriously.
>
> This ease is genuinely rare, and people feel it — you make rooms lighter and tables fuller. Its shadow is drift: when everything comes easily, it’s tempting to let the current carry you past the thing that would have been your best.
>
> _You’d make it anyway, whether or not anyone was watching._

**What to do with it · X:** Follow the ease into real craft — pick one thing worth finishing and let the pleasure do the pulling. Guard against comfort so complete that you never test the edge of what you could do.

---

### The Virtuoso · 伤官  — ✍️ authored — review
*Rules: Brilliant expression — talent that bends the rules.*  ·  keywords: Brilliant · Unruly · Daring

**Card teaser** (P6–P10):
> You dazzle when you break form. The same spark that wins the room can unsettle the ones who run it. You’d rather be brilliant than merely correct — and often you’re both. The craft is aiming it where invention is wanted, not just where rules happen to be.

**Reading page** (lede tail): _…wears the face of The Virtuoso — the one who dazzles precisely by refusing the given form._

**What it says about you · R:**
> You shine when you break the mold. Talent, for you, isn’t quiet competence — it’s the flourish, the unexpected move, the answer no one asked for that turns out to be right. You’d rather be brilliant than correct, and often you’re both.
>
> That spark wins rooms and moves work forward in leaps. It also unsettles the people whose job is to keep order — the same brilliance that impresses can read as defiance, and the friction is real.
>
> _You will not be told how, and that is both the gift and the bill._

**What to do with it · X:** Aim the fireworks at problems that reward invention, where “because I said so” has failed everyone else. Spend a little of it on tact, so the work lands before the ego does.

---

### The General · 七杀  — ✍️ authored — review
*Rules: Raw challenge — the pressure that forges you.*  ·  keywords: Forging · Relentless · Decisive

**Card teaser** (P6–P10):
> Pressure never asks your permission. You’re sharpened by the trials you would never have chosen. You meet the hard thing head-on where others flinch — decisive, and hard to rattle. The watch is for when force becomes a reflex on what only needed a lighter hand.

**Reading page** (lede tail): _…wears the face of The General — the one who is forged by trials they would never have chosen._

**What it says about you · R:**
> Pressure doesn’t ask your permission. It arrives — the deadline, the rival, the situation with no soft option — and something in you meets it head-on rather than flinching. You don’t go looking for the fight, but you don’t lose your nerve when it finds you.
>
> This is what forges you. The trials you’d never have picked are exactly the ones that made you sharp, decisive, hard to intimidate. The danger is that a nature built for pressure can start manufacturing it — turning force on situations, and people, that only needed a lighter hand.
>
> _You’re sharpened by the trials you would never have chosen._

**What to do with it · X:** Point it at the hard, worthy thing — the challenge that genuinely needs someone who won’t blink. Ease off where force has become a habit, and a steadier touch would carry the room.

---

### The Magistrate · 正官  — ✍️ authored — review
*Rules: Order & duty — the structure you answer to.*  ·  keywords: Principled · Measured · Ordered

**Card teaser** (P6–P10):
> A discipline to grow into: measured authority that holds the line without forcing it. People trust you with responsibility because you carry it evenly. You’d rather be fair than feared, and it shows. The caution is rigidity — keeping the rule after it has outlived its reason.

**Reading page** (lede tail): _…wears the face of The Magistrate — the one whose authority earns its weight by being fair._

**What it says about you · R:**
> You hold the line without needing to raise your voice. There’s a sense of proportion in you — of what’s owed, what’s due, what a thing should rightly be — and people trust you with responsibility because you carry it evenly. You’d rather be fair than feared, and it shows.
>
> This is a discipline to grow into, and mostly you have. The measured authority that steadies a group can, taken too far, harden into rigidity — rules kept because they’re rules, order valued over the living thing it was meant to serve.
>
> _You keep the standard because someone has to, and you’d rather it were done well._

**What to do with it · X:** Take the seat where fairness is the whole job — the call that has to be even-handed, the structure others rely on. Loosen the grip where the rule has outlived the reason, and judgment matters more than procedure.

---
