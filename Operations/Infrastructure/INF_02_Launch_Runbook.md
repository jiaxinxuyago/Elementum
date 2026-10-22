# INF_02 · Launch Runbook

**Born:** 2026-10-22, strategy session (session_019UR4wQXx6NmFH7gv99Zf7U), from `BIZ_05` (the launch plan).
**Purpose:** the exact steps for the launch safety net. Steps marked OWNER need the owner's accounts or card; agents never hold billing or bank credentials (standing rule, `BIZ_01`). Steps marked AGENT are code a session builds after the owner rules.
**Status:** proposed. Each section says what it waits on.

---

## 1 · Owner steps (accounts and money)

Do them in this order. Each takes under 15 minutes.

### 1.1 support@elementum.life (INFRA-3, free) · waits on nothing
Receiving:
1. Cloudflare dashboard → elementum.life → Email → Email Routing → Enable. Accept the DNS records it adds (MX and SPF).
2. Destination addresses → add the inbox you read daily → click the link in the verification email.
3. Routing rules → Custom address `support` → action "Send to an email" → that inbox. Repeat for `privacy` (the GDPR contact on /legal).
4. Test: send a mail to support@elementum.life from another account.

Sending as support@ (to answer customers), without Workers Paid:
5. Resend is already connected to this workspace. Resend → Domains → Add `elementum.life` → add the DKIM and return-path records it shows in Cloudflare DNS → Verify. Free tier: 3,000 emails a month.
6. Tell the strategy session when the domain shows Verified; it then sets up replies and the email list through Resend.

### 1.2 Workers Paid ($5 a month) · waits on S3
Only needed if S3 is A (the July first-party analytics on Workers Analytics Engine).
1. Cloudflare dashboard → Workers & Pages → Plans → Workers Paid → Purchase.
2. Add the $5 line to `BIZ_01` §1 (or tell the strategy session to).

### 1.3 Supabase Pro ($25 a month) · waits on S14 (recommended: at the first public post)
1. supabase.com → the organization that holds project `nbactbfxqslzehzbgetp` → Billing → Change subscription plan → Pro.
2. Leave the spend cap ON (it stops surprise overage charges).
3. Project → Database → Backups: confirm daily backups are listed (Pro keeps 7 days).
4. Add the $25 line to `BIZ_01` §1.

### 1.4 Customer-data backup revival (PM_02 HK-10) · waits on the first stranger
On the primary laptop, PowerShell as the owner. `tools/backup-customer-data.mjs` is never edited.
```powershell
schtasks /Change /TN "Elementum Customer Data Backup" /ENABLE
$t = Get-ScheduledTask -TaskName "Elementum Customer Data Backup"
$t.Settings.DisallowStartIfOnBatteries = $false
$t.Settings.StopIfGoingOnBatteries = $false
$t.Settings.StartWhenAvailable = $true
Set-ScheduledTask -InputObject $t
Start-ScheduledTask -TaskName "Elementum Customer Data Backup"
```
Then check that a new dated export sits in both `D:/Elementum/Backups/customer-data/` and OneDrive `Desktop/Elementum/Backups/customer-data/`, and that `%TEMP%\customer-backup.log` ends without an error. Tell a session to mark HK-10 done and correct `PM_01` §3.6 and row 12.

Why it still matters after Supabase Pro: Pro backups live inside Supabase. The laptop copy is the only copy outside it.

### 1.5 Stripe Managed Payments application (S7) · waits on S7
1. Stripe dashboard (Lantern Digital account) → Settings → search "Managed Payments" → apply.
2. Product description to use: "Elementum: a personality app based on the Chinese Five Elements (BaZi). Fully automated software: the user enters a birth date and receives computed personality readings, a daily almanac and an optional AI chat. No human services."
3. Tax code to request: SaaS, personal use (`txcd_10103000`).
4. Ask in writing whether astrology-based personality software is eligible. Keep the reply in `Operations/Legal_Admin/`.

### 1.6 Tax adviser hour (S7) · waits on S7
One hour with a New York CPA. Questions:
1. Is a subscription to a personality web app (computed BaZi readings) taxable in New York as prewritten software or an information service, given TSB-A-24(23)S (2024)?
2. Should Lantern Digital register for New York sales tax before the first sale?
3. With Stripe Managed Payments as merchant of record, what is left for us to file?

### 1.7 Google OAuth brand verification (OWNER-4)
Google Cloud console → APIs & Services → OAuth consent screen → check the status; answer any email from the Trust and Safety team. Until it clears, the consent screen shows supabase.co.

## 2 · The deploy gate (live since 2026-10-22, S15 A)

A `check` script in `Elementum_App/package.json`, run by both deploy workflows before the build. A failure stops the deploy.

| Check | What it guards | Time |
|---|---|---|
| `eslint .` | syntax and hook errors (0 errors today, 62 warnings) | about 10 s |
| `tools/qa-engine-regression.mjs` | engine output against the blessed golden cases | under 1 s |
| `tools/qa-pillar-crosscheck.mjs` | pillars against an independent derivation | under 1 s |
| `tools/qa-depth-golden.mjs` | the in-depth layer | under 1 s |
| `tools/qa-almanac-golden.mjs` | Your Almanac | under 1 s |
| `tools/qa-selection-fixtures.mjs` | content selection | under 1 s |
| `tools/qa-domains-coverage.mjs` | no placeholder line on Domains | about 1 s |
| `tools/qa-blend-clashes.mjs` | blend clashes | under 1 s |

All pass on `main` at `beb5574` (2026-10-22). Browser checks (`qa-route-sweep`, `qa-journey-sweep`) stay manual: they need a dev server and Playwright.

Effect on other sessions: a push that breaks a golden file no longer reaches elementum.life. An intended engine change must re-bless its golden file in the same push (`DEV_04`).

## 3 · Analytics (AGENT, waits on S3)

**The July 2026 design** (`Elementum_App/tools/routines/analytics-report.prompt.md`): the app sends events to a small first-party worker, which writes them to Workers Analytics Engine. No third party, no cookies, an anonymous device id. The weekly analyst routine answers five fixed questions: activation, resonance, depth, retention, monetization. The full July list of 14 events lives in the owner's local memory; the list below rebuilds it from the routine's definitions and the `BIZ_02` funnel. The owner confirms or corrects it before the build.

| # | Event | Fires when | Properties | Answers |
|---|---|---|---|---|
| 1 | `app_open` | each session start | first_session, utm_source, utm_campaign, ref, standalone (installed PWA) | traffic, retention |
| 2 | `onboarding_step` | each onboarding step shown | step | activation funnel |
| 3 | `onboarding_complete` | birth data submitted | hour_known (yes, window, no) | activation; BIZ_02 reveal_started |
| 4 | `reveal_shown` | the first reading's first card | none | resonance |
| 5 | `reveal_continue` | the reader moves past the first card | seconds_since_shown | resonance (within 60 s) |
| 6 | `reveal_complete` | the eighth card, into Your reading | none | BIZ_02 reveal_completed |
| 7 | `read_depth` | a reading surface closes | surface, bucket (25, 50, 75, 100), dwell_s | depth |
| 8 | `share_click` | the share card is exported or shared | card | BIZ_02 share_clicked |
| 9 | `invite_sent` | a compatibility invite or friend compare | none | virality |
| 10 | `email_captured` | the email form succeeds | placement | BIZ_02 email_captured |
| 11 | `push_opt_in` | the browser grants push | none | retention |
| 12 | `push_open` | a push notification opens the app | kind | retention |
| 13 | `paywall_view` | an upgrade sheet or locked card is opened | surface, tier | monetization |
| 14 | `checkout_click` | a Stripe link is tapped | product | BIZ_02 checkout_started |
| server | `purchase_success` | the Stripe webhook grants an entitlement | product | BIZ_02 purchase_completed (server truth) |

Rules: no birth date, time, place, chart, stem, element or reading text in any event. The device id is random, stored on the device, and reset by "delete my data". `/legal` changes in the same push.

## 4 · Error monitoring (AGENT, waits on S4)

Sentry free tier (5,000 errors a month): the browser SDK in `main.jsx` beside the ErrorBoundary, and the Cloudflare SDK in the three workers. `sendDefaultPii: false`; a `beforeSend` that drops request bodies, so no birth data or chat text leaves. Source maps uploaded in the deploy workflow with a `SENTRY_AUTH_TOKEN` repo secret (OWNER adds it). An alert email on any new issue to support@.

## 5 · Privacy and GDPR basics for birth data (AGENT drafts, OWNER approves)

What is already right: the chart is computed on the device; birth data never reaches the server (`public/legal.html`); the AI consultant asks for consent before it sends anything; the push schedule stores codes, not birth data.

To do before strangers:
1. **Delete my data.** One control in Profile: wipes local storage and, for account holders, deletes the Supabase user, entitlements and push subscriptions (a worker route with the user's token). Stripe records stay for tax law; /legal says so.
2. **/legal additions:** the analytics events and the random device id; the email list (consent, unsubscribe in every email); Sentry and Resend as processors; the privacy@ contact; the EU and UK rights (access, deletion, objection) and a reply within 30 days; that we never sell or share data for ads, and that we honour Global Privacy Control.
3. **Compatibility invites:** the friend's birth data stays on the inviter's device. The invite screen says so.
4. **Age:** /legal states the service is for people 16 and over (the GDPR default age of consent for information society services, as set by many member states).
5. **A data map**, one table in `INF_01`: what lives where (device, Supabase, Stripe, Anthropic, Resend, Sentry, Cloudflare) and how long.
6. **Snapshot** `/legal` into `Operations/Legal_Admin/` on change (existing rule).

## 6 · Incident basics (AGENT writes, OWNER keeps)

| Situation | First move | Where |
|---|---|---|
| The site is broken after a push | Actions → "Deploy elementum.life" → the last green run → Re-run all jobs. That redeploys the older build. Then revert the bad commit. | GitHub |
| The AI consultant misbehaves or costs spike | Lower `MONTHLY_BUDGET_USD` on the elementum-llm worker to 0 (the kill-switch), or remove the Anthropic key | Cloudflare, Anthropic console |
| Payments wrong | Stripe → Payment Links → deactivate the link; refund from the payment | Stripe |
| Data exposure suspected | Rotate the Supabase secret keys; write down what, when, who; GDPR gives 72 hours to notify the regulator when EU users are at risk | Supabase |
| A customer cannot get in | Check `entitlements` for their email; re-grant by hand if Stripe shows payment | Supabase |

Uptime: a free uptime monitor on `https://elementum.life`, alerting support@. The webhook has no health route; a failed delivery shows in Stripe → Developers → Webhooks, and Stripe emails the account after repeated failures.
