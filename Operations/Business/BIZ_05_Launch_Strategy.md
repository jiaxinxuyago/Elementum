# BIZ_05 · Launch Strategy

**Born:** 2026-10-22, strategy session (marketing, infrastructure, business; no app code, no reading content).
**Question:** what stage are we at, and what must happen right after the current development stage?
**Report page (phone-friendly, with the rulings):** https://claude.ai/artifact/WU74C1XQ1bD6QBUHCoFrSB
**Companions:** `BIZ_01` (costs), `BIZ_02` (the June validation sprint, never run), `INF_01` (backend), `PM_02` (task board, row STRAT-1).

Status: **ruled 2026-10-22** (section 8). The plan below is the working plan.

---

## 1 · The stage in plain terms

Elementum is a **feature-rich private alpha**. It is Phase 0: one user (the owner), no strangers, no market numbers.

- The June validation sprint (`BIZ_02`) said "stop building, get a few dozen strangers through the reveal". It has no recorded result. Since then the product grew six premium sections: the merged reading, Domains, Life Chapters, Stars, the Energy Blueprint and Your Almanac.
- The build is ahead of the evidence by about four months. Every week of building now adds content that no stranger has read.
- The professional name for the next stage is **closed beta with real users**, and its only job is to produce the four numbers in `BIZ_02` §2 plus a Day-7 return rate.

## 2 · State assessment

### 2.1 Product

Strengths
- A real reveal. The first reading (eight cards after the Naming), Your reading, the wheel and the energy sheet give a strong first session. Voice is benchmarked line by line against The Pattern (`Reading/Database/Prompts/07_REFERENCE_BENCHMARKS.md`).
- A daily surface exists. Your Almanac (Today tab) is live, and the push worker is built (`workers/push`), so a daily return loop is possible.
- A share card exists (`src/components/share/ShareIdentityCard.jsx`, exported with `html-to-image` in `src/lib/cardExport.js`). Compatibility with a friend exists (`CompatFriendFlow.jsx`), which is the strongest invite loop in the category.
- A tier model with a ruled gating principle (DES_04 §19: recognition free, explanation paid).

Risks
- Scope is very wide for a product with zero users. Mean Pattern-parity of the new sections is about 3 of 5 (section audits 2026-10-21: Domains 3.23, Blueprint 2.68, Life Chapters 3.13; many page means between 2.5 and 3.2). Wide and unfinished reads worse to a stranger than narrow and finished.
- Free users have no account. Sign-in is purchase-gated and birth data lives only in the browser (`public/legal.html` line 110). So there is no email, no cross-device return, and a cleared browser loses the chart. The retention loop rests on Web Push, which on iPhone works only after the user adds the app to the home screen.
- `ALMANAC_PUSH` is off, so the daily loop is not running.
- The paywall offer is muddled: the code lists Seeker $9.99/mo and Advisor $19.99/mo (`src/infra/pricing.js`), but no recurring billing exists, and the only live offer is the $9 Founding Pass that grants Advisor for life.
- Known accuracy issues a stranger can hit: the luck-pillar start is ten years off for backward births between 6 January and 3 February (about 4% of charts); the strength band sometimes disagrees with the element shares; an unknown birth hour falls back to a default hour. A wrong decade on Life Chapters is the kind of error that ends trust in one screen.

### 2.2 Engineering

Strengths
- Lean, cheap architecture: a Vite PWA on Cloudflare Workers, Supabase for accounts and entitlements, a server-verified Stripe webhook (`workers/stripe-webhook`). Runtime is about $2.50 a month (`BIZ_01` §2).
- Privacy by design: chart computed on device, birth data never stored on the server, the AI consultant is opt-in with consent (`public/legal.html` §AI Consultant), the push schedule stores codes only, never birth data (`ComparativeAnalysis/Handoffs/2026-10-19-event-signature/P4_STEPS.md`).
- Cost guards on the LLM: owner-only gate, a $50 monthly kill-switch, a per-user daily cap, usage counters (`INF_01` §4.3).
- A large QA toolbox: engine regression, golden fixtures, route and journey sweeps, coverage checks (`Elementum_App/tools/qa-*`), and the eslint config exists (`npm run lint`).

Risks
- No gate before production. Both deploy workflows run only `npm ci` and `npm run build` (`.github/workflows/deploy.yml`, `deploy-dev.yml`). Several sessions push to main, and every push deploys to elementum.life. One bad push breaks the live site with no check in between.
- No product analytics. No PostHog, Plausible or Cloudflare Web Analytics in `src/` or `index.html`. The 14-event taxonomy from July is not built.
- No error monitoring beyond a React ErrorBoundary. A crash on a stranger's phone is invisible.
- Customer-data backup is disabled (PM_02 HK-10) and, when on, it runs from the owner's laptop (Windows Task Scheduler). Supabase Free has no daily backups.
- No account deletion path found in `src/` (needed for GDPR and app-store rules).
- Code health is acceptable for the stage but carries debt: `App.jsx` 881 lines, deferred lint items (PM_02 HK-5, HK-6), and the Day Log has no entry since 2026-09-30 (`PM_03`), so the project record has drifted for three weeks.

### 2.3 Operations

Strengths
- A documented operating system: one doc registry (`Operations/README.md`), a task board (`PM_02`), runbooks (`PM_01`), owner rulings in a fixed format, and agent sessions with clear ownership.
- Entity and admin basics done: Lantern Digital LLC (NY), EIN, D-U-N-S 14-193-9711, legal page live.

Risks
- The owner is the single decision-maker for every section, and many rulings are pending at once (Domains R1 to R17, Life Chapters M1 to M9, DES_15, Your Almanac P4). Decision throughput, not build speed, is the bottleneck.
- No support channel: no support@ address (INFRA-3), so a stranger with a payment problem has nowhere to go.
- No incident routine: no status check, no rollback note, no on-call rule for a solo owner.
- Google OAuth brand verification is still pending, so the consent screen shows supabase.co (OWNER-4). That costs sign-in trust.

### 2.4 Business

Strengths
- Very low runtime cost, so the product can live for years at almost no cost.
- Payments are real and server-verified; the owner's own Founding purchase went through end to end.
- A clear audience thesis (`BIZ_03`) and a clear benchmark (The Pattern).

Risks
- No revenue model that pays the all-in cost. One-time passes cannot fund recurring LLM cost (`BIZ_01` §5). The $9 lifetime Founding Pass gives away all Advisor depth and the AI consultant forever, with no cap or end date in code (`pricing.js`: "removed at official launch", no date).
- No recurring billing (INFRA-5, "post-beta").
- Tax and merchant of record are undecided (`INF_01` §9). Selling worldwide through plain Stripe makes Lantern Digital the seller of record for EU VAT and US state sales tax.
- All-in break-even is about 24 Founding Passes a month (`BIZ_01` §5), against zero sales so far beyond the owner's test.

## 3 · Market and positioning

Researched 2026-10-22. Store prices are A/B tested and change often; confidence is noted as H (primary source), M (several sources agree), L (one source or sources conflict).

### 3.1 Competitors

| App | Price | Paywall | How it grows | How it keeps users |
|---|---|---|---|---|
| Co-Star | Pro-Star $8.99/mo; one-off "Eros" $6.99, "Your Year Ahead" $11.99 (M) | soft freemium | friends and chart comparison, cultural moments (Chicken Shop Date) | blunt daily push, friend feed |
| The Pattern | subscriptions from $14.99/mo, quarterly plans, Bonds extras about $9.99 (M/L) | freemium, deep content paid | word of mouth, celebrity reactions | Bonds (compatibility), timing cycles, returning notifications |
| CHANI | $11.99/mo or $107.99/yr, 30-day trial promos (M/H) | trial then hard wall | founder audience, content | rituals, weekly content, community |
| Sanctuary | $14.99/mo or $49.99/yr, live astrologer chat paid per reading (L) | freemium plus paid chat | paid social | daily horoscope, live readers |
| Nebula (OBRIO) | paywall-heavy funnels, paid psychic chat; about $50M ARR claimed (L) | hard funnel paywall | paid acquisition at scale | psychic chat, push |
| Cantian AI (BaZi) | weekly $9.99, $12.99/mo, $19.99/mo, credits $4.99 (H) | free basics, paid AI | app store search | AI chat |
| Meta BaZi | $9.99/mo or $99/yr; Pro $19.99/mo or $199/yr (M) | free chart, paid AI | web SEO | AI chat, chart comparison |
| Joey Yap | human consults about $298, waiting list; old iBaZi app unmaintained (M) | pay per consult | authority, courses | none in-app |

Market moves:
- Midjourney bought Co-Star in spring 2026 (reported 24 July 2026; about 4.3M monthly users per Sensor Tower via Bloomberg) (M). Big money now sees personality astrology as a design and AI product.
- An English, Gen Z rebrand of BaZi is under way, led by Southeast Asian creators since 2023 (SCMP, M). TikTok BaZi content today is mostly Day Master explainers and app promos. Hashtag and keyword volumes could not be verified; run Keyword Planner before M7.
- Market-size reports range from $1.2B to $7.1B for 2025 with opaque methods. Do not cite them.

### 3.2 App-store rules

- Apple Guideline 4.3(b), rewritten June 2026, names "fortune telling" among saturated categories. New apps are accepted only with "a meaningfully different or improved experience", and Apple may remove apps that "do not attract customers" (H). Past horoscope apps were rejected as spam (WTFuture 2021; Struck rejected about ten times in 2020).
- A thin web wrapper also risks 4.2 (minimum functionality).
- In the US storefront Apple now allows links and buttons to web purchase (3.1.1(a), 3.1.3), at 0% commission today. Apple proposed 15% (5% for small businesses) in August 2026; it is pending in court (M).
- Google Play: a TWA that sells digital subscriptions must use Play Billing, or the US external-offer programme at about 10% on subscriptions (M).
- Read: web first is both the cheapest and the safest path. An iOS app later should lead with the personality system and link out to web checkout in the US.

### 3.3 Payments, tax, privacy

- **Paddle is closed to us.** Its Acceptable Use Policy (13 April 2026) bans "horoscopes, fortune-telling" (H).
- **Stripe Managed Payments** (Stripe as merchant of record): 3.5% on top of processing, about 6.4% + $0.30 all-in on a US card; needs a fully automated digital product and Stripe's eligibility review; no astrology exclusion found (H). Get written confirmation before building on it.
- **Lemon Squeezy:** 5% + $0.50 plus surcharges; no astrology ban, but owned by Stripe and signup status unclear (L).
- **Stripe direct:** 2.9% + $0.30, Billing 0.7%, Stripe Tax about 0.5%; we register and file ourselves.
- **New York:** the LLC is in New York, so New York sales tax applies from the first NY sale, whatever the thresholds. SaaS is generally taxable, but advisory opinion TSB-A-24(23)S (2024) found personalised birth-chart readings not taxable, for that petitioner only. How a subscription app is classed is open: one CPA hour.
- **EU VAT:** a non-EU seller owes VAT on digital services to EU consumers from the first sale (non-Union OSS registration). A merchant of record removes this.
- **GDPR:** birth date, time and place are personal data, not special-category data in themselves. The local-first design is the strongest possible answer. Compatibility invites carry a third person's birth data, so they need a notice and a lawful basis. Honour Global Privacy Control and never sell or share data with ad tech (Texas has no size threshold).

### 3.4 Where Elementum can win

1. **The only Pattern-grade BaZi product in English.** The BaZi apps sell AI chat and credits with thin design; the Western apps sell Western astrology. Nobody owns "therapy-literate BaZi".
2. **Personality, not fortune.** The four pillars read as a personality system (element, Day Master, strength, friction) fits the audience and is the best defence under Apple 4.3(b).
3. **Five elements are visual and shareable.** "Which element are you" is a one-second hook; the share card and friend compare are the engine (Co-Star and The Pattern both grew on comparison).
4. **Privacy as a feature.** "Your birth data never leaves your phone" is rare in the category and a real draw for this audience.
5. **Cost.** At about $2.50 a month runtime Elementum can price under The Pattern and CHANI and still be profitable at small scale.

Where we lose if we are careless: breadth over finish (many sections at parity 3 of 5), no daily loop switched on, and no paid acquisition budget against Nebula-style funnels. Do not fight on paid ads.


## 4 · The development freeze point

Strangers see the product only when this list is done. Everything else waits. Target: about 2 weeks.

| # | Must have | Why | Owner |
|---|---|---|---|
| F1 | The free path polished end to end: onboarding, the first reading, Your reading, the share card. Draft surfaces hidden on elementum.life. | The first impression cannot be taken back (`BIZ_02` §3). | Day Master session, design director |
| F2 | Luck-pillar start fixed (Life Chapters M1) | A wrong decade breaks trust on one screen. | Life Chapters session (engine change, DEV_04 protocol) |
| F3 | "I don't know my birth hour" handled honestly in onboarding | Many young users do not know their hour. | Day Master session |
| F4 | Funnel events firing (section 5.2, I1) | No numbers, no validation. | infra agent |
| F5 | Email capture after the reveal, into a real email tool | Free users have no account, so email is the only way back. | infra agent, owner copy ruling |
| F6 | Error monitoring (I2) | A crash on a stranger's phone is invisible today. | infra agent |
| F7 | A CI gate: lint, engine regression and build before deploy (I3) | Several sessions push to main, and each push goes live. | infra agent |
| F8 | support@elementum.life and a refund line on /legal | A paying stranger needs a person to reach. | owner (DNS), infra agent |
| F9 | The Founding Pass cap and end date (S5) | Stops an open-ended lifetime liability. | owner ruling, then infra agent |
| F10 | /legal updated for analytics, email and account deletion | The privacy promise must stay true. | infra agent, owner review |

Out of the freeze: new sections, Stars polish, the 25 illustrations, the native apps, the AI consultant rollout to users, more Domains depth.

## 5 · The 30, 60, 90 day plan

Day 0 is the freeze point. Each item: owner, cost, effort, dependency, the number it moves.

### 5.1 Marketing

| ID | Item | Owner | Cost | Effort | Depends on | Moves |
|---|---|---|---|---|---|---|
| M1 | **Days 1 to 14. Validation wave.** 30 to 50 strangers through the reveal: Reddit and Discord communities where self-promotion is allowed (BaZi, Chinese astrology, Human Design, MBTI, astrology servers), 20 warm DMs, one Instagram story. Free full reading in exchange for a 10-minute call. | owner, research agent drafts posts | $0 | 6 h a week | F1 to F10 | reveal completion, email opt-in |
| M2 | **Days 7 to 21. Eight interviews** in the Mom Test style (what did you feel, where did you almost stop). A written synthesis. | owner, agent synthesizes | $0, or $10 gift cards | 8 h | M1 | the "this is me" rate |
| M3 | **Days 14 to 30. The share card as the ad.** Check the card on iPhone and Android, add a short link with `?ref=` and UTM, add a "compare with a friend" invite on the card. | design director, infra agent | $0 | 2 days | F1, F4 | share rate, invites per user |
| M4 | **Days 21 to 60. Short video.** Faceless TikTok and Instagram Reels: one archetype per post, "POV: an app read me from my birth hour", the friction lines (BIZ_04), the five elements. 3 posts a week, 4 hooks tested, UTM per hook. | owner posts, agent writes scripts weekly | $0 to $30 a month (editing app) | 4 h a week | M3 | visits per post, completion by source |
| M5 | **Days 30 to 60. Waitlist and email.** A welcome series of four emails: your element, your friction, your year, the Founding offer. Monthly "your month ahead" email from the Almanac content. | infra agent, owner copy ruling | $0 on free tiers | 2 days | F5 | Day-7 and Day-30 return, pay rate |
| M6 | **Days 45 to 90. Creator partnerships.** 10 micro creators (5k to 50k followers) in astrology, Human Design and therapy-adjacent wellness. Free Founding Pass plus a 30% affiliate code. No paid posts until a channel converts. | owner, agent builds the list | $0 to $300 | 5 h a week | M4 data | visits, pay rate by code |
| M7 | **Days 30 to 90. SEO for BaZi terms.** One public page per Day Master (ten stems), one per element, "what is my day master", "bazi chart calculator free", "five elements personality test". Built from the existing locked corpus, no new reading content. | content session plus infra agent | $0 | 1 week | F1 | organic visits |
| M8 | **Day 60 to 90. Public launch.** Product Hunt, a launch email to the list, a launch week of video, Founding Pass closes at the end of launch week. Only if the day-60 thresholds pass (section 5.4). | owner | $0 | 1 week | thresholds | first cohort size, paid conversions |
| M9 | **Weekly measurement.** One funnel page every Monday: visits by source, completion, opt-in, share, checkout, purchase, Day-7 return. | infra agent, PM routine | $0 | 1 h a week | F4 | all |

### 5.2 Infrastructure

| ID | Item | Owner | Cost | Effort | Depends on | Moves |
|---|---|---|---|---|---|---|
| I1 | **Analytics.** PostHog Cloud (free up to 1M events a month) with the six `BIZ_02` events plus `day7_return`, `push_opt_in`, `invite_sent`, `invite_accepted`, `paywall_viewed`, `account_created`, `consultant_message`, `almanac_opened`. Cookieless mode, no birth data in any event property. Cloudflare Web Analytics for traffic sources. | infra agent | $0 | 1 day | S3 ruling | every metric |
| I2 | **Error monitoring.** Sentry free tier (5k errors a month) in the app and the three workers, source maps uploaded in CI, PII scrubbing on. | infra agent | $0 | half a day | none | crash-free sessions |
| I3 | **A CI gate.** One `check` job before both deploy jobs: `npm run lint`, `qa-engine-regression`, the golden fixtures that need no browser, then the build. A deploy runs only if the check passes. Weekly route sweep stays manual. | infra agent | $0 | half a day | lint at 0 errors | broken deploys |
| I4 | **Backups.** Supabase Pro gives daily backups. Until then, a GitHub Actions nightly job with a read-only key (a new job, the existing `backup-customer-data.mjs` stays untouched). | infra agent, owner adds the secret | $0 | half a day | S14 | data-loss risk |
| I5 | **Supabase Pro** at the first public post (day about 30). | owner | $25 a month | 10 min | S14 | uptime, backups |
| I6 | **support@elementum.life** through Cloudflare Email Routing to the owner's inbox (free); Workers Paid only when sending from the app is needed. | owner | $0 | 30 min | none | support response time |
| I7 | **Privacy and GDPR.** Update /legal for analytics and email; add "delete my account and data" (Supabase row plus local wipe); a data map (what lives where); a short records-of-processing note; consent text for the email list; Anthropic and PostHog in the subprocessor list. Birth data stays on the device. | infra agent, owner review | $0 | 1 day | I1, F5 | trust, store readiness |
| I8 | **Incident basics.** A one-page runbook: how to roll back (re-run the last green deploy), how to pull the AI consultant (kill-switch), how to pause Stripe links, who to email, a status note on /legal. An uptime check on elementum.life and the webhook (free tier of an uptime service). | infra agent | $0 | half a day | I2 | time to recover |
| I9 | **Google OAuth brand verification** pushed to done (OWNER-4). | owner | $0 | 1 h | Google's queue | sign-in completion |
| I10 | **The Day Log and the docs drift.** The PM routine catches up `PM_03` from 2026-09-30 and adds the weekly funnel line. | PM routine | $0 | 1 h | none | decision speed |

### 5.3 Business

| ID | Item | Owner | Cost | Effort | Depends on | Moves |
|---|---|---|---|---|---|---|
| B1 | **The Founding Pass cap and end date** (S5). | owner ruling, infra agent | $0 | 1 h | none | LLM liability |
| B2 | **Subscriptions** (S6). Stripe Billing for Seeker monthly and annual, Customer Portal for cancel. The webhook grants and revokes the same `entitlements` rows. Live by day 60 to 75, before public launch. | infra agent | Stripe fees only | 3 days | S6, S7 | MRR |
| B3 | **Merchant of record and tax** (S7). | owner ruling | see section 3 | 1 day to switch | S7 | compliance risk |
| B4 | **The native-app decision** (S8). | owner ruling | $0 now | none now | day-90 numbers | reach |
| B5 | **Budget for 90 days** (S11). | owner | see S11 | none | none | runway |
| B6 | **Metrics with decision thresholds** (section 5.4) adopted as the gate for launch and for further building. | owner ruling | $0 | none | I1 | everything |
| B7 | **The Claude Max line.** After the freeze, review whether the build pace still needs the top plan (`BIZ_01` §6). | owner | saves up to $100 a month | none | freeze | all-in break-even |

### 5.4 The numbers and the gates

| Metric | Strong | Watch | Rethink | Read at |
|---|---|---|---|---|
| Reveal completion (landed to first reading done) | 60% or more | 40 to 60% | under 40% | day 14 |
| Email opt-in after the reveal | 30% or more | 15 to 30% | under 15% | day 14 |
| Share or invite (of completers) | 20% or more | 10 to 20% | under 10% | day 30 |
| Day-7 return (of completers) | 25% or more | 12 to 25% | under 12% | day 30 |
| Warm pay rate (Founding Pass, of email list) | 5% or more | 2 to 5% | under 2% | day 45 |
| Cold visit to paid (subscription), first 30 days | 1.5% or more | 0.5 to 1.5% | under 0.5% | day 90 |

Gates:
- **Day 30:** if completion or opt-in is red, fix the path or the reading before any video push. No new sections.
- **Day 60:** go to public launch only if completion and opt-in are green or watch, and at least one of share or Day-7 is green.
- **Day 90:** native apps, paid ads or more premium sections only if the cold pay rate is watch or better and there are at least 100 paying users or 1,000 email subscribers.

## 6 · Owner rulings

Answer in short codes, row by row (for example "S1 A, S2 A, S3 B"). The recommended option is first and marked.

| Code | Question | A (recommended) | B | C |
|---|---|---|---|---|
| S1 | The freeze | **A.** Freeze new sections now; only the F1 to F10 list ships until 30 strangers have been through. | Finish the open section rulings first (2 to 3 more weeks), then freeze. | Keep building and validate in parallel. |
| S2 | The first strangers | **A.** 30 to 50 strangers from communities and warm DMs, free, 8 interviews. | A paid testing panel (about $300 for 20 sessions). | Skip and go straight to short video. |
| S3 | Analytics | **A.** The July design: a first-party worker writing to Workers Analytics Engine (needs Workers Paid, $5 a month), the 14 events in `INF_02` §3, the weekly analyst routine already written for it. No third party, no cookies. | PostHog Cloud free, cookieless: funnels and retention out of the box, but a third party. | Cloudflare Web Analytics only (traffic, no funnel). |
| S4 | Error monitoring | **A.** Sentry free tier, app and workers. | Cloudflare logs only. | None until launch. |
| S5 | The Founding Pass | **A.** Keep $9, cap at 300 passes, close at public launch; new buyers get Seeker depth for life plus the AI consultant for 12 months. Existing buyers keep what they bought. | Raise to $29, cap at 500, keep Advisor for life. | Keep as it is. |
| S6 | Subscriptions | **A.** Annual first. Seeker $59.99 a year or $9.99 a month, 7-day free trial on annual only. Advisor $119.99 a year or $19.99 a month. Live by day 60 to 75 on Stripe Billing. | Lower: Seeker $39.99 a year or $6.99 a month, Advisor $79.99 a year or $14.99 a month. | Monthly only, as coded today. |
| S7 | Merchant of record and tax | **A.** Apply now to Stripe Managed Payments and get written confirmation; switch subscriptions to it at launch. Until then plain Stripe, and one CPA hour on New York sales tax (about $300). | Stripe direct with Stripe Tax; register New York and EU non-Union OSS ourselves. | Lemon Squeezy, if signups are open. |
| S8 | Native apps | **A.** PWA only to day 90. Then an Android TWA on Play (about $25) as a cheap test. iOS with Capacitor only after the day-90 gate. | Capacitor iOS and Android now. | PWA only for the whole of 2027. |
| S9 | The lead channel | **A.** Faceless short video with the share card as the ad, then creators from day 45. | Creator partnerships first. | SEO first. |
| S10 | The email tool | **A.** Resend (already connected to this workspace: audiences, broadcasts, automations). | Loops (free to 1,000 contacts). | Kit (free to 10,000 contacts). |
| S11 | The 90-day budget, above Claude Max | **A.** Up to $100 a month: Supabase Pro $25, small tools, creator gift passes. No paid ads before the day-60 gate. | Up to $400 a month with a $300 paid-ad test at day 60. | $0, free tiers only, Supabase Pro deferred. |
| S12 | The gates | **A.** Adopt the thresholds and gates in section 5.4. | Adopt the thresholds, no hard gates. | Set other numbers. |
| S13 | The unknown birth hour | Superseded by E3 below. | | |
| S14 | Supabase Pro timing | **A.** At the first public post (about day 30). | Now. | At 500 users. |
| S15 | Who runs this plan | **A.** One infra agent session takes I1 to I8 and B1 to B2 in one sprint; this strategy session keeps the marketing scripts and the weekly funnel read. | Split infra items across the existing sessions. | The owner does it by hand. |

## 7 · Round 2 (2026-10-22): the pending items handed to this session

A scheduled task on the owner's account handed this session the open items: measurement, the safety net, billing, the engine accuracy issues, and the ruling bottleneck. Steps the owner runs are in `INF_02_Launch_Runbook.md`. Code waits for these rulings and for the owner's go on G1.

### 7.1 The engine (shared code; each fix moves readings on every section)

Counts from 20,000 random births, 1950 to 2007, all hours, both genders, Beijing (study scripts kept in the session scratchpad; the method matches `ComparativeAnalysis/Evaluations/section-audit-2026-10-21/life-chapters/qa/qiyun.mjs`).

**E1 · The luck-pillar start.** Classical rule (渊海子平; 三命通会 卷二 起大运): count from the birth to the next 节 (forward) or back to the previous 节 (backward), three days to a year. The backward search in `engine/calculator.js` (line 570) looks only at the bazi year's own terms, so births from 小寒 to 立春 (about 6 January to 3 February) count back to 大雪 instead of 小寒. Ten extra years.
- The one-line fix (search the next Gregorian year's 小寒 first) changes **738 of 20,000 charts (3.7%)**, every one by about ten years, and no other chart.
- Golden files: `qa-engine-regression` re-blessed only if a golden case is a January backward birth.

**E2 · The strength band against the element shares.** Classical weight: the month decides (子平真诠 论用神, "八字用神，专求月令"; 滴天髓, 得时). `computeDMStrength` scores season 4, root 2, allies 1, and maps a score of 3 (out of season, rooted, with allies) to "strong".
- Today: concentrated 55.7%, open 43.1%, balanced only **1.1%** (score 4 alone). **11.2%** of charts read concentrated while self plus resource is under 35% of the chart (the 甲 in 酉 case).
- Fix A (score 3 reads balanced): changes **17.4%** of charts; the contradiction falls to 1.2%; balanced rises to 18.5%.
- Fix B (band from the share of self plus resource: 50% and over concentrated, 36% to 50% balanced): changes 24.9%; no contradiction; the three classical tests stop deciding.
- The band is part of every archetype key (`stem_band_pattern`) and the catalyst, so a changed band changes which written reading the reader sees.

**E3 · The unknown birth hour.** `chartContext.resolveHourForCalc` fills an unknown hour with 12:00 (a known window uses its midpoint). For an unknown hour the noon band differs from the true-hour band in **16%** of births (3,200 of 20,000), and the hour pillar is wrong 11 times in 12. The classical practice without the hour is a three-pillar reading (三柱). The depth layer already takes `hourUnknown` (`engine/depth/season.js`, `stars.js`).

### 7.2 The rulings

| Code | Question | A (recommended) | B | C |
|---|---|---|---|---|
| E1 | Luck-pillar start | **A.** The one-line backward fix now (3.7% of charts move ten years to the right decade). | The fix plus minute-exact 节 times with the birth hour (about one chart in five moves by a year). | Leave it. |
| E2 | Strength band | **A.** Score 3 reads balanced (17.4% of charts change; contradictions 11.2% to 1.2%). The Domains, Life Chapters and Almanac sessions re-check their band-keyed lines. | Band from the support share (24.9% change, no contradiction, classical tests advisory only). | Leave it. |
| E3 | Unknown hour | **A.** "I don't know" gives a three-pillar chart: the hour is left out of the strength tests and shares, and hour-palace lines show "needs your birth hour". | Keep noon with a visible "approximate" note. | Require an hour or a window. |
| G1 | The deploy gate (`INF_02` §2, patch ready, all checks green today) | **A.** Push it now to both workflows. | Push it to the dev workflow only for a week, then production. | Hold. |
| D1 | One ruling day | **A.** Every session queues its rulings to one weekly page; the owner rules once a week in one sitting. | Keep a page per session, as now. | |
| D2 | Delegated rulings | **A.** Sessions adopt TWEAK and MINOR items themselves when the gates pass, and list them in the weekly page, where the owner can reverse them. The owner rules MAJOR items, money, the engine, legal and design direction. | The owner rules everything. | |
| D3 | A default | **A.** A ruling unanswered after 7 days takes option A, except money, engine, legal and anything live on elementum.life. | No default. | |

Order once ruled: G1, then E1 (smallest, clearest), then E3, then E2 (largest; the content sessions are told first). Each engine change follows `DEV_04`: crosscheck, regression, re-bless only what is ruled, and a note to the Life Chapters, Almanac and Domains sessions listing the changed charts.

## 8 · The owner's rulings (2026-10-22)

Round 1, in the owner's words: "S1 B, S2 A, S3 A, S4 A, S5 A, S6 A, S7 A, S8 A, S9 A, S10 A, S11 A, S12 A, S13 A, S14 A, S15 A". Round 2 by the owner's answers the same day: S3 means the July first-party design, E1 A, E2 A, D1 to D3 all A. S13 A and E3 A are the same ruling (a three-pillar chart for an unknown hour).

| Code | Ruled | What it means now |
|---|---|---|
| S1 | **B** | The open section rulings close first (2 to 3 weeks), then the freeze. F1 to F10 still go first when the freeze starts. |
| S2 | A | 30 to 50 strangers from communities and warm DMs, free, 8 interviews. |
| S3 | A (July) | The first-party worker on Workers Analytics Engine; Workers Paid ($5) is bought for it (`INF_02` §1.2). |
| S4 | A | Sentry free tier on the app and the workers. |
| S5 | A | The $9 pass is capped at 300 and closes at public launch. New buyers get Seeker for life plus Advisor for 12 months; existing buyers keep Advisor for life. |
| S6 | A | Seeker $59.99 a year or $9.99 a month (7-day trial on annual), Advisor $119.99 a year or $19.99 a month, by day 60 to 75. |
| S7 | A | Apply to Stripe Managed Payments; plain Stripe until launch; one CPA hour. |
| S8 | A | PWA to day 90; then an Android TWA test; iOS only after the gate. |
| S9 | A | Faceless short video with the share card; creators from day 45. |
| S10 | A | Resend. |
| S11 | A | Up to $100 a month above Claude Max; no paid ads before day 60. |
| S12 | A | The gates in §5.4. |
| S13, E3 | A | "I don't know my hour" gives a three-pillar chart. |
| S14 | A | Supabase Pro at the first public post. |
| S15 | A | This session builds I1 to I8 and B1 to B2. G1 (the deploy gate) goes in under S15. |
| E1 | A | The one-line luck-pillar fix. |
| E2 | A | Score 3 (out of season, rooted, with allies) reads balanced. |
| D1, D2, D3 | A | One weekly ruling page; sessions adopt TWEAK and MINOR items themselves; a 7-day default to A except money, engine, legal and live items. |

### 8.1 Progress

| Item | State |
|---|---|
| Rulings recorded | done 2026-10-22 |
| E1, E2, E3 | done 2026-10-22, live: record in `DEV_04` run log 2026-10-22; notice to the content sessions in `ComparativeAnalysis/Handoffs/2026-10-22-engine-accuracy/NOTICE.md` |
| B1, B2 billing (S5 A, S6 A) | code done 2026-10-22; **switched on 2026-10-23** by the owner (`INF_02` §1.8 A, B, D–G): migration 0005, both workers deployed, subscription events, products, four Payment Links and the portal. Left: the 300 cap (C, before the first public post), the upgrade sheet offering the plans (design director), one end-to-end test purchase |
| I1 analytics, I2 monitoring (app) | analytics **live 2026-10-23** (worker deployed, `ANALYTICS_URL` set, free plan); monitoring **live 2026-10-23** for the app (Sentry free plan, errors only); /legal updated and snapshotted (`Operations/Legal_Admin/Elementum_Legal_Terms_Snapshot_2026-10-22.html`) |
| D1, D2, D3 | done 2026-10-22: `Operations/Project_Management/PM_04_Ruling_Queue.md` |
| Doc drift (task 5) | done 2026-10-22: Operations audit, 15 of 18 findings fixed (INF_01 v0.7, BIZ_01, DEV_01, DEV_03, PM_01, PM_02, PM_03 header, README, INF_02); the laptop's `sync-live.ps1` and `merge-fix-branches.mjs` now run `npm run check` too. Left for their owners: the Day Log has no entry since 2026-09-30 (the PM routine is not writing), two unregistered files in `Design/Documents/`, a unit count in PM_02 EVT-1 |
| I6 support@ and email (S10 A) | done 2026-10-23: support@ and privacy@ forward to the owner's Gmail; Resend verified for elementum.life and mail.elementum.life with DMARC; Supabase sign-in emails go through Resend (the built-in mailer would not reach strangers); /legal names the two addresses (`INF_02` §1.1) |
| I3 the deploy gate | done 2026-10-22: `npm run check` (lint plus seven QA checks) runs before the build in both deploy workflows (`INF_02` §2) |

## 9 · Round 3 (2026-10-23): ready for 300 founders?

Works: onboarding, the reveal, the free reading; account, checkout, the webhook grant and unlocks; profile and restore; sign-up confirmation and forgot password (built 2026-10-23); analytics, error reports, support@ and privacy@, /legal.

Not yet: the AI Consultant answers only the owner (`OWNER_IDS` in `workers/llm/wrangler.jsonc`); Resend's free plan sends 100 emails a day (checked 2026-10-23: 100 a day, 3,000 a month, 3 of 3 domains used); paid sections average about 3 of 5 and most charts read fallback text (S1 B); no real test purchase; the 300 cap (Part C); no delete-account button; the Google consent screen shows supabase.co.

| Code | Question | A (recommended) | B | C |
|---|---|---|---|---|
| L1 | The AI Consultant for founders | **A.** Open it to every Advisor with `DAILY_CAP` 10 and `MONTHLY_BUDGET_USD` 150 (worker vars), `OWNER_IDS` emptied; the Anthropic console limit (HK-3) set to match; review at day 30. | Open it with today's limits (30 a day, $50 a month); it pauses for everyone once $50 is spent. | Keep it owner-only; take the Consultant off the pass wording until it opens. |
| L2 | Launch-week sign-up email | **A.** Resend Pro ($20) for the launch month only, then back to free. | Stay free; spread invites under 100 sign-ups a day. | |

**Ruled 2026-10-23:** L1 A (the Consultant opens to every Advisor: `OWNER_IDS` emptied, `DAILY_CAP` 10, `MONTHLY_BUDGET_USD` 150 in `workers/llm/wrangler.jsonc`; live when the owner redeploys the llm worker; the Anthropic console limit HK-3 set at or above $150; spend reviewed at day 30). L2 B (Resend stays on the free plan: invites are paced so under 100 people sign up a day; the launch sequence M1 and M8 plans invite waves accordingly).
