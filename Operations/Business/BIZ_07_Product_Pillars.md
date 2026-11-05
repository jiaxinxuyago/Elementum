# BIZ_07 · Product Pillars

**Born:** 2026-11-05, the marketing session, on the owner's four pillars ("the high concept, the product anchor, the goals and the pitch of our app"). Ruled the same day: PL1 A, PL2 A, PL3 A, PL4 A, PL5 A (§6).
**Report page (phone):** https://claude.ai/artifact/A69E539BxAQBpXNgN8y2Dq
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

## 5 · Is the direction right and reachable? (research 2026-11-05)

**Sources.** Search-based research (no in-app screens were opened, so in-app wording is mostly unverified): `Operations/Business/research/BIZ_07_competitive_research/2026-11-05_bazi_apps.md` (FateTell, Cantian AI, Meta BaZi and BaZi Hero, bazi-calculator.com, Master Sean Chan, Joey Yap, OpenFate BZTI, BluePrint) and `…/2026-11-05_identity_benchmarks.md` (Co-Star, The Pattern, CHANI, 16Personalities, myBodyGraph and two consumer Human Design apps). Each fact there carries H, M or L confidence. The app audit (`…/2026-11-05_app_audit.md`) read the code at commit 4da30d1. "None found" below means nothing surfaced in search, not proof.

### 5.1 The verdict by pillar

| Pillar | Right? | Open space? | What the app does today | The gap |
|---|---|---|---|---|
| 1 · Identity | Yes | Yes (M). No English BaZi app has a named, illustrated, shareable identity with compatibility. FateTell uses the plain Day Master and has no compatibility. Joey Yap's ten-god archetypes live in books. OpenFate BZTI has 32 types and no traction. | Ten named Day Masters and seals live. The Elementum Type is dev only (`liveFlags.js` TYPE_LIVE false) and has full content for 庚 only. Compatibility is live but one-to-one, typed by hand, not shareable. | The words "Day Master" never appear on the live first pass. No referral or `?ref` link; `invite_sent` never fires. No compat card, no groups. |
| 2 · Easiest BaZi | Yes | Yes (M). No app frames the ten-god families as plain functions with how-to-use guidance. Rivals use "Eating God", "Seven Killings", "Rob Wealth", or only the Day Master. Meta BaZi comes closest and is built for practitioners. | Body, Mind, Expression, Action and Order are live on the reveal, the Almanac, push titles and the share card. | A stranger meets about 20 named ideas before and on the reveal (budget: 5). The unknown hour is not explained where it is chosen. The loading screen says "Five pillars", and a chart has four. |
| 3 · Practical | Yes | Yes. Rivals are predictive: FateTell sells a fortune toss and a Fortune Trend (its founder admits some readings come out "scary or fatalistic"); Cantian sells love and wealth readings and a "soulmate portrait". CHANI proves rituals keep people. | The Almanac is chart-specific and live. | Live lines predict ("A chance to earn or to reach further appears today", "a lucky chance", "Fortune favors your precision", "Expect income shaped like seasons", "the verdict"). Personal push is off. The ask for push comes before any value is shown. Lines narrate outcomes instead of telling the reader what to do. |
| 4 · Visual | Yes, with a caution | Partly. FateTell is already praised as "the most visually stunning astrology product". Visuals alone are not a moat. Chinese ink tied to a named identity is. | The share card carries the painted plate. Ten stem plates are live. Forty Day Master page paintings exist on dev only. | Nine of ten stem thumbnails are missing (`DES_14`). No energy heroes (0 of 10). Painting effort is going into deep dev-only pages (90 strips and pairs to go). |

### 5.2 Reachable?

- **The segment is real.** FateTell's company figures (trade press, company-supplied, L) put its users at 25 to 35, about 60% women, with 38.7% repurchase. That is our exact reader.
- **The English market is still small and unproven.** AppGoblin estimates FateTell at about 405 monthly active users and under $10K a month (April 2026, L). BaZi interest is well documented in China and Southeast Asia (MIT Technology Review 2025, Bloomberg 2025, SCMP 2026). In English there are creator videos and features, but no primary trend numbers. No BaZi app went viral on TikTok in 2026. So the work is to teach BaZi to a new audience, not to ride an existing wave. Pillars 1 and 4 (a one-second hook and a visual everyone recognizes) carry that.
- **Price fits.** The category runs about $8 to $15 a month or $38 to $108 a year. FateTell's paywall right after onboarding draws complaints, which supports our rule that recognition is free (`DES_04` §19).
- **Web and Android are open.** FateTell, Meta BaZi and BluePrint are iPhone only.
- **Lessons to adopt.**
  - Three levels, like 16Personalities: 5 elements, each with a colour; 10 Day Masters, each with a name and a character; 50 types.
  - A free, instant result with a portrait share card.
  - One action rule per type, as Human Design does ("wait for the invitation").
  - Say plainly that the Day Master needs no birth time. That beats a Rising sign and a Human Design chart.
  - One signature diagram as recognizable as the Human Design body chart.
- **Lessons to avoid.**
  - Co-Star's harsh voice.
  - The Pattern putting the reader's own core reading behind the paywall.
  - 16Personalities' take-it-once retention.
- **A correction for `BIZ_05` §3.1:** the research could not verify that Midjourney bought Co-Star (one 2026 review repeats it). The strategy session should mark it L or confirm it.

## 6 · Rulings

| Code | Question | Ruled | Means |
|---|---|---|---|
| PL1 | Where the pillars live | A (2026-11-05) | This doc is canon; a short anchor block sits at the top of `BIZ_05`, `BIZ_06`, `DES_04`, `REA_01` and the registry. |
| PL2 | Pillar 3 wording | A | "Not what will happen to you, but how to use what you have." No fate or destiny words. |
| PL3 | The public identity unit | A | The Day Master is the sign (10). The fifty types are the depth layer with a sayable name. |
| PL4 | Research scope | A | The BaZi apps and the identity benchmarks above, by hand, with sources. |
| PL5 | The priority list | A | One ranked list the owner rules; the strategy session folds it into the `BIZ_05` freeze list; the design director and section sessions take their rows. |
| PR1 | The priority list in §7 | A (2026-11-05) | Adopted as ranked. The strategy session folds P0 and P1 into the `BIZ_05` freeze list; each owner takes its rows (handoff: `ComparativeAnalysis/Handoffs/2026-11-05-priority-list/NOTICE.md`). |

## 7 · The production priority list (next dev cycle, PL5 A)

Ranked by how much each item blocks the stranger test (`BIZ_05` S2 A, 30 to 50 strangers), which is the only way to prove any pillar. The owner rules the list (PR1); the strategy session folds the P0 and P1 rows into the `BIZ_05` freeze list; each row's owner takes it.

### P0 · Live problems, this week

| # | Item | Pillar | Owner | Evidence | Done when |
|---|---|---|---|---|---|
| 1 | **Check the Founding Pass link.** `foundingCheckout` carries the same id as the billing portal (`src/infra/links.js`), so the only live purchase may not open the $9 checkout. | business | owner (Stripe), strategy session | `links.js` lines 19 to 23 | a test purchase from elementum.life completes |
| 2 | **Take fate and prediction wording out of live content.** Almanac "appears today" and "a lucky chance", `k2.js` "Fortune favors" and "reads as destiny", Life Chapters "Expect …", compat "the verdict" and "written in the pillars", `tgPatterns.js` "a lucky pairing". | 3 | the Almanac, Life Chapters, Domains and Day Master sessions | `research/BIZ_07_competitive_research/2026-11-05_app_audit.md` | `voice-audit` adds fate, destiny, lucky, fortune, verdict, expect as bans and passes |
| 3 | "Five pillars gather" becomes four (`LoadingScreen.jsx:198`). | 2 | design director (MINOR) | `LoadingScreen.jsx:198` | the line is fixed |

### P1 · The stranger-test minimum (the freeze, `BIZ_05` F1 and F5)

| # | Item | Pillar | Owner | Done when |
|---|---|---|---|---|
| 4 | **Email capture after the reveal plus the waitlist page** (F5, M2, M3), with `track('email_captured')`. | all (no testers come back without it) | marketing session, design director (placement), strategy session (the subscribe endpoint) | a stranger's address reaches Resend and the event fires |
| 5 | **The first session holds five named ideas.** The reveal says "Your Day Master is The Blade", names the element, and says it is not the year animal. True Solar Time, 时辰 glyphs, 大运, the yin and yang current, the run dial, Release, Grow and Keep, and Friction and Catalyst move behind a tap or after the first reading. | 2, 1 | Day Master session, design director | a count of the named terms on the live path is 5 or fewer |
| 6 | **The unknown hour is explained where it is chosen** ("Your Day Master and five energies don't need it; your hour pillar does"). | 2 | Day Master session | the onboarding line is live |
| 7 | **The share card becomes the ad.** It says "Day Master", carries a `?ref=` and UTM link, and fires `share_click` and `invite_sent`. Delete the dead `share/ShareIdentityCard.jsx` and `ShareCardOverlay.jsx`. | 1, 4 | design director, strategy session | shares are counted by source |
| 8 | **Ask for push after the reveal**, not before it. | 3 | Day Master session | the ask follows the first reading |

### P2 · Next cycle, once strangers are coming through

| # | Item | Pillar | Owner |
|---|---|---|---|
| 9 | **A free compatibility card.** Two people, their elements, the cycle in plain words ("your Water steadies her Fire"), "how you work together", shareable. Paid depth stays paid. | 1 | the compatibility owner (design director to assign) |
| 10 | **The daily loop.** Personal push on (`ALMANAC_PUSH`, migration 0004), and Almanac lines rewritten as instructions ("use your Action on …") with one action rule per energy. | 3 | Almanac session, strategy session |
| 11 | **The Elementum Type, finished.** `energy_faces` and `STEM_WHO` for the other nine stems, a sayable type name per PL3 A, then TYPE_LIVE on. It waits for the test to show that strangers repeat their Day Master. | 1 | Day Master session |
| 12 | **Art toward the symbol set.** Ten stem thumbnails and seals, five element colours as one system, five energy heroes. The 40 remaining strips and 45 pairs wait until the test. | 4 | design director |
| 13 | **Celebrity Day Master content and the SEO pages** (`BIZ_05` M7): "what is my Day Master", one page per Day Master. | 1, 2 | marketing session |

### P3 · Later

Groups ("your friend group has no Water"), the Discord houses at 200 engaged users (C1 A), one signature chart image, the Android TWA test (S8 A).

### Stop or hold

New sections and more depth in the paid sections (S1 B already holds them), and painting for dev-only pages ahead of the symbol set.
