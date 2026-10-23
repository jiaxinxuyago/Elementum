# BIZ_06 · Community Traction Plan

**Born:** 2026-10-23, strategy session, on the owner's question "how do we get traction, set up a community and get users". Ruled the same day: C1 A, C2 A, C3 A, C4 A.
**Owner from 2026-10-23:** the dedicated marketing session, session_01JGiv7YVayvtv8qWChNB3w6 (strategies, content, progress tracking). The strategy session keeps `BIZ_05` (launch plan, infra, billing).
**Companions:** `BIZ_05` (launch plan, gates §5.4, rulings), `BIZ_03` (audience and tone), `BIZ_04` (friction framing), `REA_16` (the voice), `Reading/Database/Prompts/07_REFERENCE_BENCHMARKS.md` (The Pattern benchmark), `INF_02` §3 (analytics events).

---

## 1 · The principle

Borrow audiences first, build your own home after. Nobody joins a community for an app they have not felt. Order: the reader feels "this is me" → it is easy to share and compare → the people who care get a place to gather.

## 2 · The rulings

| Code | Question | Ruled | Means |
|---|---|---|---|
| C1 | The community home | **A** | Discord with five element houses (Wood, Fire, Earth, Metal, Water), opened at about 200 engaged users. |
| C2 | The face of the brand | **A** | Faceless: the house art, voice-over, the app's own words. |
| C3 | When to start | **A** | Quiet groundwork now (handles, scripts, joining communities); the push after the freeze (`BIZ_05` S1 B). |
| C4 | The waitlist | **A** | Build it now: "get your reading when the founding round opens", into Resend contacts (free to 1,000). |

## 3 · The phases

**Phase 1 · weeks 1–4 · be found where the audience already is.** Audience: therapy-literate women 18–35 who already speak MBTI, attachment, Human Design and Western astrology; BaZi is new to most, which is the edge.
- Short video, 3 a week, TikTok and Instagram Reels, faceless. Formats: "Which element are you?" carousels; "POV: an app read me from my birth hour" with the friction lines; "Your Day Master in 30 seconds" (ten stems, ten posts); element compatibility ("Fire and Water in a relationship"). Every link carries UTM tags.
- Borrowed communities: astrology, Human Design, MBTI and Chinese-astrology subreddits and Discord servers. Answer BaZi questions; offer free readings only where the rules allow. Read each group's self-promotion rules first.
- The first 30–50 strangers (`BIZ_05` S2) come from here plus 20 warm messages.

**Phase 2 · weeks 4–8 · users recruit users (product loops; builds go to the design director and the strategy session).** The share card as the ad; "compare with a friend"; the 300 founding places; a referral (a free month of Seeker each) once subscriptions are in the upgrade sheet.

**Phase 3 · weeks 6–12 · the home: the Five Element houses (C1 A).** Discord, a channel and role badge per element. Weekly rituals: Monday "the week's energy" from Your Almanac; mid-month "your month ahead"; a compatibility thread; "ask your element". Founders get a badge and an early-access channel.

**Phase 4 · creators, once a channel converts.** 10 micro creators (5k–50k) in astrology, Human Design and wellness: a free Founding Pass and a personal code with a 30% share; no paid posts until a channel converts. Southeast Asian English-language BaZi creators are the natural first partners.

## 4 · Constraints

- **Under 100 sign-ups a day** (`BIZ_05` L2 B, Resend free plan): invites go out in waves, creator by creator, community by community.
- **Content quality first** (`BIZ_05` S1 B): the push waits for the freeze; groundwork does not.
- **Privacy:** never ask anyone for birth data in public; the app computes on the device.
- **Voice:** `REA_16` and `BIZ_03`; plain words, no fortune-telling claims (Apple 4.3(b) and the audience both reward "personality, not fortune").

## 5 · This week (C3 A)

1. Claim handles: TikTok, Instagram, a Discord server name (`elementum` / `elementum.life`). Owner.
2. Batch-write 12 video scripts: the ten Day Masters and two element carousels, from the locked reading corpus. Marketing session.
3. Join 5–8 communities; answer BaZi questions, no links yet. Owner, with drafts from the marketing session.
4. The waitlist (C4 A). Marketing session builds it with the design director's placement.

## 6 · Targets and tracking

| By | Signal | Healthy | Source |
|---|---|---|---|
| Day 30 | Strangers who finish the reveal | 50+, 60% completion | analytics `onboarding_complete`, `reveal_complete` |
| Day 30 | Shares or compares per finisher | 20%+ | `share_click`, `invite_sent` |
| Day 60 | Email list or waitlist | 300+ | Resend contacts |
| Day 60 | Founding Passes | 30+ | Supabase `entitlements` |
| Day 90 | Community | 200 members, 25% weekly active | Discord insights |

The marketing session keeps §7 current every week.

## 7 · Progress log

| Week of | Done | Numbers | Next |
|---|---|---|---|
| 2026-10-19 | Plan written and ruled (C1–C4 A) | none yet (analytics live 2026-10-23) | handles, 12 scripts, communities, waitlist |
| 2026-10-23 | Marketing session opened. `Marketing/` library and README; batch 01 drafted (10 Day Masters, 2 carousels, 1 POV hook with 3 variants), every reading line checked against `archetypeSource.js`; M1 to M3 queued in `PM_04` | waitlist 0 · strangers 0 · followers 0 | owner: handles; owner rules M1 to M3; marketing: community map and drafts, waitlist page spec to the design director, the subscribe endpoint asked of the strategy session |

## 8 · Marketing session notes (2026-10-23)

**Open rulings (`PM_04`):** M1 when short video starts, M2 where the bio link and the waitlist live, M3 how a sign-up is confirmed.

**Why post before the freeze (M1 A).** C3 A keeps the push for after the freeze, and S1 B moves the freeze out 2 to 3 weeks. New accounts need weeks of steady posting before reach comes, and the Day Master videos only show locked identity lines, not the unfinished sections. Pointing every link at the waitlist means no stranger meets the product before the freeze, which keeps F1 and C3 A intact while the accounts warm up and the list grows.

**The waitlist needs one server call.** The Resend key cannot sit in the browser. The page needs a small `subscribe` endpoint (validate the email, add the Resend contact, send the confirmation per M3, rate limit). Workers belong to the strategy session, so the marketing session writes the page and its `track('email_captured', { placement: 'waitlist_page' })` call and asks the strategy session for the endpoint. `/legal` already names Resend for email (I6); the snapshot is re-taken only if the wording changes.

**Tracking.** `app_open` records `utm_source`, `utm_campaign` and `ref`, not `utm_content`, so each piece's id rides in `utm_campaign` (`b01-s07`). The week's read: Analytics Engine `app_open` by campaign, `email_captured` by placement, Resend contact count.

