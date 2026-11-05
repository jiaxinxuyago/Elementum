# BIZ_07 · Product Pillars

**Born:** 2026-11-05, the marketing session, on the owner's four pillars ("the high concept, the product anchor, the goals and the pitch of our app"). Ruled the same day: PL1 A, PL2 A, PL3 A, PL4 A, PL5 A (§6).
**Status:** canon. Every session reads §1 to §4 before it proposes a feature, a section, a design or a piece of marketing. A change to a pillar is an owner ruling.
**Companions:** `BIZ_05` (launch plan and gates), `BIZ_06` (traction plan), `BIZ_03` (audience), `DES_04` (app design), `REA_01` (the archetype system), `REA_16` (the voice).

---

## 1 · The high concept

**Elementum is the Five Elements personality system.** It turns BaZi into a new identity people can say, share and compare, the way they say "I'm a Scorpio" or "I'm an INFJ". It is the easiest BaZi to understand, it tells you how to use your energy instead of what will happen to you, and it looks like nothing else in the category.

**The one line (the pitch):** Find your Day Master. Learn your five energies. Use them.

**The 30-second pitch:** Western astrology apps all run on the same zodiac, and MBTI is a quiz you can game. BaZi is a 2,000-year-old Chinese system that reads personality from the day you were born, and almost nobody outside Asia has a good way into it. Elementum gives it to them: ten Day Masters you can name yourself by, fifty types for depth, a compatibility logic that actually explains why two people fit, and a daily guide to using each of your five energies. It is painted in Chinese ink, so the first thing people remember is how it looks.

## 2 · The four pillars

### Pillar 1 · A new identity system

**The claim.** Elementum pushes a new system of identity from BaZi, as sayable as a zodiac sign and as discussable as an MBTI type: something people talk about, sort themselves into, and match on.

**What it means in the product.**
- **The sign is the Day Master (PL3 A).** Ten of them (The Oak, The Vine, The Sun, The Candle, The Mountain, The Field, The Blade, The Jewel, The Ocean, The Rain). A birth date is enough to know it. It is the unit on every first touch: the hook, the reveal, the share card, the comment section.
- **The depth is the Elementum Type.** Ten Day Masters by five modes, fifty types (ruled 2026-10-27, `ComparativeAnalysis/Handoffs/2026-10-17-day-master-diagnosis/04_RULINGS.md`). The type carries a name a person can say in one breath.
- **Compatibility is a first-class feature.** The five-element cycle explains a match (Wood feeds Fire, Water checks Fire) where the zodiac only asserts one. Pairs and groups ("your friend group has no Water") are the second thing people share.

**Our edge.** Co-Star, The Pattern and CHANI all run on the Western zodiac. MBTI is self-reported. A birth-date identity cannot be faked and has never had a Pattern-grade English product.

**Goal.** A stranger repeats their Day Master to someone else. Measured by share and invite rate (`BIZ_05` §5.4: 20% of finishers) and by "what's your Day Master" showing up unprompted in comments.

**Guardrails.** One label per layer. Never "your year animal". The year animal is a different thing, and every first touch says so.

### Pillar 2 · The easiest BaZi to understand

**The claim.** The most comprehensible BaZi app for a Western reader. Each energy gets a functional concept (Body, Mind, Expression, Action, Order) that says what it does in a life, and the onboarding closes the cognitive gap before the reveal.

**What it means in the product.**
- **Functions, not jargon.** The ten-god families read as five plain functions (`Elementum_App/src/content/metrics.js`). Chinese terms and romanized names are texture, never the thing a reader has to learn (`REA_16` §1b).
- **A vocabulary budget.** A stranger meets at most five named ideas in the first session: element, Day Master, the five energies, their type, compatibility. Everything else waits behind a tap.
- **Honest about the hour.** "I don't know my birth hour" gives a three-pillar chart (`BIZ_05` E3 A), and the reader is told what that changes.

**Our edge.** To be verified by the competitive research (§5): most English BaZi products teach the classical terms ("Direct Officer", "Eating God") or translate them literally.

**Goal.** Reveal completion of 60% or more (`BIZ_05` §5.4), and strangers who can say back what their Day Master means in an interview (`BIZ_05` M2).

**Guardrails.** Being easy comes from having fewer named things. A new term needs a reason that a stranger would feel.

### Pillar 3 · The most practical guidance

**The claim.** Not what will happen to you, but how to use what you have (PL2 A). Each energy is a function in a life, so Elementum tells the reader where to spend it, where to grow it and where to let it go, day to day and year to year.

**What it means in the product.**
- Your Almanac reads the day's energy against the reader's chart and says what to do with it.
- Each energy page explains what the function does for the reader, what it costs when it runs too high or too low, and how to use it.
- Life Chapters read a decade as a change in which energies are in play, never as events.

**Our edge.** The Western apps give horoscopes and wellness tips, and the BaZi apps give lucky days and luck forecasts. Nobody teaches the reader to use their own chart.

**Goal.** Day-7 return of 25% or more (`BIZ_05` §5.4), carried by the daily surface and its push.

**Guardrails.** No fate, destiny or prediction words (`REA_16` bans, Apple guideline 4.3(b)). Advice is specific to the chart or it is not given. The Body function never becomes health or medical advice.

### Pillar 4 · The most visual app, rooted in Chinese aesthetics

**The claim.** The most illustrated app in the category, painted in Chinese ink, so people remember the art, see themselves in it and grasp the concepts through it. The art is how the app spreads.

**What it means in the product.**
- **A recognizable symbol set first.** One seal per Day Master and one colour per element, used on every surface and wanted as an avatar, the way zodiac glyphs are.
- **Art on the share card.** The share card is the ad (`BIZ_05` S9 A), so the painting travels with the identity.
- **Paintings that teach.** The Day Master page and the energy pages use paintings to show what an energy does (`DES_15`, the ink pipeline).

**Our edge.** Co-Star is minimal black and white, The Pattern is mostly text, and the BaZi apps are tables and charts.

**Goal.** The share card is shared, and the art is named in feedback ("the ink one").

**Guardrails.** Heritage, not costume: the "would the heritage reader wince?" test (`REA_16` §3) applies to images. Art spend follows what is shared: the symbol set and the share card before deep-page paintings.

## 3 · How the pillars work together

| Funnel step | Pillar | The question it answers |
|---|---|---|
| Attention and sharing | 4 · Visual | Why did I stop scrolling, and what do I post? |
| Recognition and talk | 1 · Identity | Who am I in this system, and who are you? |
| Getting through onboarding | 2 · Comprehensible | Do I understand it in one sitting? |
| Coming back and paying | 3 · Practical | What do I do with it today? |

## 4 · The pillar test (for every session)

A new feature, section, design or piece of content states which pillar it serves and the number it should move. Work that serves none waits. Work that breaks a guardrail is not shipped. When pillars compete for build time, the funnel order in §3 runs backwards from the gate the product is at: before the first strangers, comprehension and the share card come first.

## 5 · Is the direction right and reachable? (the research)

To be filled from the 2026-11-05 competitive research: the BaZi apps (Fatetell, Cantian AI, Meta BaZi, Mingli-type calculators, Joey Yap), the identity benchmarks (Co-Star, The Pattern, CHANI, 16Personalities, Human Design apps), and an audit of the current app against each pillar.

## 6 · Rulings

| Code | Question | Ruled | Means |
|---|---|---|---|
| PL1 | Where the pillars live | A (2026-11-05) | This doc is canon; a short anchor block sits at the top of `BIZ_05`, `BIZ_06`, `DES_04`, `REA_01` and the registry. |
| PL2 | Pillar 3 wording | A | "Not what will happen to you, but how to use what you have." No fate or destiny words. |
| PL3 | The public identity unit | A | The Day Master is the sign (10). The fifty types are the depth layer with a sayable name. |
| PL4 | Research scope | A | The BaZi apps and the identity benchmarks above, by hand, with sources. |
| PL5 | The priority list | A | One ranked list the owner rules; the strategy session folds it into the `BIZ_05` freeze list; the design director and section sessions take their rows. |
