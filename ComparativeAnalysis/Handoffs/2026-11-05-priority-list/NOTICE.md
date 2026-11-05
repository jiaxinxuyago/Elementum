# Notice · the production priority list (owner PR1 A, 2026-11-05)

**From:** the marketing session. **To:** every session that owns a row below.
**Canon:** `Operations/Business/BIZ_07_Product_Pillars.md` §7 (the list), §2 (the four pillars and their guardrails), §5 (why). The evidence for each row: `Operations/Business/research/BIZ_07_competitive_research/2026-11-05_app_audit.md`.

The owner adopted the list as ranked. Each session takes its rows, works them in order, and records progress on its own page. P0 rows come before anything else in the session's queue. Every proposal from now on states which pillar it serves (`BIZ_07` §4).

## The strategy session (BIZ_05, infra, billing)

- **#1 P0 · The Founding Pass link.** `Elementum_App/src/infra/links.js`: `foundingCheckout` carries the same id as `billingPortal` (`fZu3coeb9dQwgihctm7Re00`). Ask the owner for the real $9 Payment Link from Stripe, fix it, and run one test purchase from elementum.life. This is live money.
- **Fold P0 and P1 (#1 to #8) into the `BIZ_05` freeze list.** F1 and F5 already cover parts of #4 to #8.
- **#4 · The subscribe endpoint** for the waitlist and the email capture: validate the address, add the Resend contact, send the confirmation (M3 is waiting on the owner), rate limit. The marketing session writes the page and the `track('email_captured')` call.
- **#7 · Share attribution:** a `?ref=` and UTM link on the share card's copy action (`JourneyStage.jsx:260-264` copies a bare URL), and `invite_sent` fired (`src/infra/analytics.js` declares it and nothing sends it).
- **#10 · Personal push** (`ALMANAC_PUSH`, migration 0004), with the Almanac session.
- **For `BIZ_05` §3.1:** the research could not verify that Midjourney bought Co-Star. Confirm it or mark it L.

## The design director

- **#3 P0 · "Five pillars gather. Eight characters align."** (`src/components/LoadingScreen.jsx:198`). A chart has four pillars. MINOR.
- **#4 · The placement** of the waitlist page and the email capture after the reveal (with the marketing session).
- **#5 · The first session at five named ideas,** with the Day Master session: element, Day Master, the five energies, the type, compatibility. The live path has about 20 (list in the audit).
- **#7 · The share card says "Day Master".** Delete the dead `src/components/share/ShareIdentityCard.jsx` and `ShareCardOverlay.jsx` (nothing imports them).
- **#9 · Assign an owner** for the free compatibility card.
- **#12 · Art toward the symbol set:** ten stem seals and thumbnails (`DES_14`: 9 of 10 missing), five element colours as one system, five energy heroes (0 of 10). The 40 remaining strips and 45 pairs wait until the stranger test.

## The Day Master session

- **#5 · The reveal says "Your Day Master is The Blade"** and that it is not the year animal. True Solar Time, the 时辰 glyphs, 大运, the yin and yang current, the run dial, Release, Grow and Keep, and Friction and Catalyst move behind a tap or after the first reading.
- **#6 · The unknown hour is explained where it is chosen** (`OnboardingSteps.jsx`, the "I have no idea" link): the Day Master and the five energies don't need the hour; the hour pillar does.
- **#8 · Ask for push after the reveal** (`OnboardingSteps.jsx:970` asks before it).
- **#11 · The Elementum Type,** after the test: `energy_faces` and `STEM_WHO` for the nine other stems, a sayable type name (PL3 A), then TYPE_LIVE.
- **#2 P0 in your fields:** `k2.js:254` "reads as destiny", `:521` "Fortune favors your precision", the fortune lines at `:131`, `:261`; `tgPatterns.js:34` "a lucky pairing"; `CompatScreen.jsx:56`, `:68` "written in the pillars", "the verdict".

## The Almanac session

- **#2 P0:** `content/almanac.js:26` "A chance to earn or to reach further appears today", `:27` "you see results before evening", `:185` "a lucky chance", and "Loud days ahead" (`AlmanacViews.jsx:224`). Rewrite as instructions on how to use the day's energy, never as what will happen.
- **#10 · The daily loop:** one action rule per energy, and the personal push with the strategy session.

## The Life Chapters and Domains sessions

- **#2 P0:** `content/positions.js:566` "Expect income shaped like seasons", `:615` "Expect old age with a suitcase half-packed"; `content/domains.js:26` lines that state dated past events ("since your late forties"). A decade reads as a change in which energies are in play, never as events (`BIZ_07` pillar 3).

## The voice audit (whoever owns `tools/voice-audit.mjs`, with `REA_16` §2c)

- **#2:** add fate, fated, destiny, lucky, fortune, verdict and "expect" as a forecast as bans on reading surfaces, so the fixes stay fixed. `REA_16` already bans destiny, fated and verdict, so the audit should catch them.

## The marketing session (this notice's author)

- **#4 · The waitlist page and the email copy** (waiting on M2 and M3).
- **#13 · Celebrity Day Master content and the SEO page copy** (`BIZ_05` M7).
