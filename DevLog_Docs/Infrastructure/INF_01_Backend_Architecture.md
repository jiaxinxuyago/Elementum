# INF_01 — Backend Architecture & Pre-Launch Services

> **Formerly DOC10** — renamed in the 2026-07-09 documentation reorganization; historical citations of "DOC10" refer to this file (registry: Documents/README.md).

## Accounts · Payments · LLM · Push — a server-free, managed-backend plan

**Version:** 0.5 · July 2026
**Related docs:** DEV_02 (code architecture) · DES_04 §19 (pricing & content tiers) · DEV_01 (calculation engine — client-side) · DES_13 §D7 (Self-Report)
**Status:** **Planning.** No *server* backend exists yet. The app runs **fully client-side** with deliberate demo stubs placed at clean integration seams (tier, entitlement, consultant, notifications). This document is the spec + sequencing for the eventual build, and the rationale for **deferring it to a pre-beta phase**.
> **Update (2026-07):** §4.1 Auth and §4.2 Payments are **SHIPPED** — Supabase accounts (purchase-gated sign-in) + the Founding Pass with a **server-verified entitlement pipeline** (Stripe webhook → entitlements DB; see §4.2). §4.3 LLM and §4.4 Push remain client-side stubs.

> **⚠ v2.1 RECONCILIATION (2026-06-24 · see `REA_08_Reading_V2.1_Reconciliation_Audit.md`).** When the LLM-consultant payload is assembled, the Canonical JSON sent to the proxy must carry the **per-element polarity resolution** `{ element: { presentFaces:[{god,weight}], absentGod } }` (post-rewire), so the consultant sees the same faces the reading surfaces — not the old single polarity-blind god. It must also carry **`chart.tenGods`** (the per-pillar Ten Gods) so the consultant has the **positional (宫位) axis** the reading now uses (B6).

---

## 0. TL;DR

- **Designated server: NO.** Everything is achievable with a **managed BaaS + ~3 small serverless functions + third-party SaaS**. No VM, container, or long-running server to operate.
- **The core never needs a server.** The BaZi engine (`engine/calculator.js`, DEV_01) and all reading content are 100% client-side. The backend is commodity glue: accounts, payments, an LLM proxy, push.
- **Three things must run server-side** (security): the LLM API key, payment verification + entitlement writes, and the push-send scheduler. Each is a tiny serverless function.
- **Timing: defer the full backend to a focused pre-beta phase.** The seams are already clean, so integration is a *swap*, not a rewrite. Pull one item early only if a specific alpha goal demands it.
- **Privacy is the strategic constraint:** the app stores **birth dates + locations** — sensitive PII. Staying client-side today is privacy-friendly; a server DB introduces GDPR/data obligations. Store the **minimum** server-side.

---

## 1. Architecture philosophy — "managed backend, no server"

Elementum's hard problem (BaZi computation + the reading corpus) is solved entirely on the client. Therefore the backend exists only to do what a browser *cannot safely* do:

| Must be server-side | Why |
|---|---|
| Hold the LLM API key | Anything shipped to the browser is public. |
| Verify payment & write entitlements | Never trust the client's "I paid." The current `tier`/`hasSelfReport` in `localStorage` is exactly the *source of truth* a real backend replaces. |
| Send scheduled push | Cron-triggered work the client can't guarantee. |

Everything else (chart calc, reading text, UI state) stays on the client. This keeps the backend small, cheap, and largely stateless.

**"No server" precisely means:** managed Auth + managed Postgres + a few serverless functions (webhook, LLM proxy, push cron) + a managed cron. It does **not** mean "no backend code" — it means no infrastructure you provision or babysit.

---

## 2. Recommended stack

| Concern | Recommended | Alternatives |
|---|---|---|
| Auth + DB + functions + cron | **Supabase** (Postgres + Auth + Edge Functions + scheduled functions — one platform) | Firebase (Auth + Firestore + Cloud Functions); Clerk (auth) + Vercel/Netlify functions + Postgres |
| Payments | **Stripe** (Checkout + Billing) | **Paddle / Lemon Squeezy** — Merchant-of-Record, offloads global VAT/sales-tax + invoicing (higher fee, far less compliance) |
| LLM | **Anthropic / OpenAI** API via a serverless proxy | — |
| Push | **Web Push** (Push API + service worker) or **OneSignal / FCM** | FCM/APNs if later wrapped as a native app |

A single Supabase project covers auth, DB, all three functions, and scheduling. That is the leanest path for a solo/small team.

---

## 3. Data model — what lives where

**Principle: keep PII on-device; the server stores the minimum.**

| Data | Location | Notes |
|---|---|---|
| Birth data (date/time/location/gender) | **Client** (`localStorage`, see B-4) | Sensitive PII. Keep client-side if at all possible; if synced, treat as sensitive + consider encryption. |
| Computed chart + readings | **Client** | Derived; recomputable from birth data. No need to store server-side. |
| Account (id, email) | **Server** (auth provider) | Required once auth lands. |
| Entitlements (`tier`, `hasSelfReport`) | **Server** (DB) | The *real* source of truth, replacing the demo `localStorage` flags. |
| Billing (Stripe customer/subscription ids) | **Server** (DB) | Mapped to the account. |
| Self-Report context (life chapter/domains/notes) | **Client today** (`elementum_selfreport_v1`); **server only if** cross-device sync or the LLM needs it | More PII — minimize. |

> **Why this matters:** a birth-data app that stores readings server-side inherits real privacy/compliance weight (privacy policy, GDPR data-subject rights, breach surface). The recommended split means the server holds *account + entitlement + billing* and little or no astrology PII.

---

## 4. The four items

Each item lists: **what**, the **server piece**, the **client seam it replaces** (real files), **workload**, and **dependencies**.

### §4.1 Auth — the keystone
- **What:** accounts, login/logout, sessions; the identity the other three hang off.
- **Server piece:** a managed auth provider. None of your own.
- **Client seam:** Profile "Sign Out" is currently a **no-op** (`ProfileScreen.jsx`); there is no "Sign in". Add login/logout + a session-aware gate. Decide what becomes user-scoped (recommend: only entitlements).
- **Workload:** low–medium (days). Provider supplies login UI + sessions.
- **Depends on:** nothing. **Prerequisite for §4.2–§4.4.**
- **Decision:** full auth vs. a lightweight "email + magic-link at purchase" model. Full auth is needed for cross-device + per-user LLM limits.

### §4.2 Payments — Seeker subscription + Self-Report one-time
- **What:** real money for the Seeker tier ($9.99/mo, DES_04 §19) and the Self-Report add-on ($6.99 one-time, DES_13 §D7).
- **Server piece:** Stripe hosts the payment UI (PCI-compliant) + **one** serverless webhook that writes entitlements to the DB on `checkout.session.completed` / subscription events.
- **Client seam:** today `UpgradeModal` flips `tier` in memory and `purchaseSelfReport()` flips `hasSelfReport` in `localStorage` (demo). Replace: the upgrade/purchase CTAs open Stripe Checkout; `useChart().tier` / `hasSelfReport` read from the server (DB) instead of `localStorage`. **Delete the `window.__setTier` / `__buySelfReport` dev backdoor's authority** (already IS_DEV-gated).
- **Workload:** medium (days code) + non-code: Stripe account, products/prices, **tax** (consider a Merchant-of-Record to offload VAT).
- **Depends on:** §4.1 (Stripe customer ↔ user mapping).

> **✅ SHIPPED 2026-07 — server-verified (the honor-system stopgap is retired).** The **Founding Pass** ($9 one-time, lifetime Advisor — beta-only launch offer) runs the full §4.2 pipeline:
> 1. **Purchase-gated sign-in** — the Founding CTA requires an account; the Stripe Payment Link URL carries `client_reference_id=<user.id>` + `prefilled_email` (`UpgradeModal.buyFounding`).
> 2. **Webhook** — a standalone Cloudflare Worker (`elementum-stripe-webhook`, code at `Elementum_App/workers/stripe-webhook/`) verifies the `stripe-signature` HMAC and, on `checkout.session.completed` (paid), **upserts the buyer's `entitlements` row** (tier=advisor, has_founding, stripe_customer_id) via Supabase REST with the service-role key (Worker secret). Idempotent on retries; paid sessions without a user id are logged for manual backfill.
> 3. **Server-truth client** — signed-in users' `tier` is read from `entitlements` (RLS: read-own-row only; no client write path). The localStorage grant was deleted; `?founding=ok` only polls `refreshEntitlements()` and plays the ceremony **after** the server confirms. A forged URL unlocks nothing.
>
> Still open within §4.2: Seeker/Advisor **subscriptions** (their cards are disabled "Available after beta"), and tax/MoR. **Self-Report SHIPPED wired 2026-07-07**: real $6.99 Payment Link, account-gated buy, webhook routes products by **amount_subtotal** (pre-discount: 900=Founding, 699=Self-Report — ⚠ price changes must ship with a matching PRODUCTS update in workers/stripe-webhook; subtotal-keying means promotion codes — incl. the 100%-off testing coupon, whose zero-total checkouts arrive as payment_status=no_payment_required and are accepted — route correctly), has_self_report is server-truth (RLS read, webhook write; the localStorage demo flip no longer grants). URL single-sourced in `infra/links.js`; display price in `infra/pricing.js`.

### §4.2b — Payment user journey (local) — TRACKED FIX (owner-reported 2026-07-07)

**Problem:** both purchase CTAs (Founding, Self-Report) navigate the SAME tab/webview to Stripe (`window.location.href = <paymentLink>` in `UpgradeModal.goToStripe` + `SelfReportScreen.goToStripe`). Abandoning checkout then depends on browser chrome — and the installed PWA has none, so a buyer who quits mid-payment can be stranded on the Stripe page with no obvious way back to the app.

**Fix design (v1):**
1. Open checkout in a NEW context (`window.open(url, '_blank', 'noopener')`) — the app never navigates away; quitting = closing the checkout tab, the app is exactly where they left it.
2. Behind it, show a quiet waiting state on the paywall/gate ('Complete your purchase in the opened page — this unlocks automatically') with a manual 'I've paid → refresh' affordance.
3. Sync on return: refresh entitlements on window focus/visibilitychange, so the PWA unlocks the moment the buyer switches back — independent of where the success redirect landed (the ?ok redirect then only matters for browser-tab flows, where it still works).

**Trade-off accepted:** in the installed PWA the success redirect lands in the system browser (not the PWA); the focus-refresh makes the PWA unlock anyway. **Status: SHIPPED 2026-07-07** — new-tab checkout w/ same-tab fallback (note: opener severed manually, NOT via the noopener feature string, which makes open() return null even on success and broke blocked-detection); waiting cards + in-place ceremony (UpgradeModal payState) / gate-to-form unlock (SelfReportScreen); one-tap resume after Google OAuth (entitled owners suppressed at render); always-on 10s-throttled focus-refresh in chartContext; static /paid return page (owner re-pointed both Stripe after-payment URLs to https://elementum.life/paid). The ?ok redirect paths remain as legacy fallback.

### §4.2a — Wallets & native-app billing (Apple Pay / Google Pay / IAP) — **critical platform split**

Apple Pay / Google Pay are **not a separate integration** — their availability depends entirely on *where* the purchase happens:

- **Web / PWA (today):** Apple Pay + Google Pay are **payment methods *inside* Stripe**. On the hosted Payment Link (`buy.stripe.com`) they surface automatically on supported devices (Safari/iOS → Apple Pay; Chrome/Android → Google Pay), with **no domain verification** (checkout is on Stripe's domain, not ours). **Already live, ~2.9%+30¢, zero extra work.**
- **Native App Store / Play Store app (Phase B — Capacitor/TestFlight):** Apple & Google **prohibit Stripe (and Apple-Pay-via-Stripe) for digital in-app unlocks.** Digital content must use **Apple In-App Purchase** + **Google Play Billing** (~15–30% commission). Routing the Founding Pass / tier unlocks through Stripe inside a native binary = **App Store / Play rejection.** (Apple-Pay-via-Stripe is permitted only for *physical* goods.)

**Roadmap implications:**
- The current Stripe path fully covers the **web/PWA** channel (both wallets included) — **nothing to build** for wallets.
- A **native build** triggers a **separate billing workstream**: StoreKit (IAP) + Play Billing, *plus* the accounts backend (§4.1) to tie a purchase to a user across web + app, *plus* reconciling web-Stripe vs. store-IAP entitlements.
- Apple/Google rules are **evolving** (post-Epic external-link entitlements; EU DMA alternative billing) — re-evaluate at Phase B, not now.
- **Recommendation:** stay web/Stripe while PWA-only (avoids the ~30% cut); treat IAP/Play Billing as a Phase-B decision bundled with §4.1 accounts.

> **§4.2a ADDENDUM (2026-07-07, owner) — Apple Developer & App Store setup STARTED.**
>
> **Enrollment decision (owner-locked): ORGANIZATION under Lantern Digital** — matches the ownership map (commerce identities are company-owned, like Stripe; infra identities personal-owned). Seller line on the App Store will read Lantern Digital.
>
> **The runbook (owner actions, in order):**
> 1. **D-U-N-S number for Lantern Digital** — the long-lead item (typically 2–6 weeks; free). First CHECK whether one already exists (D&B often auto-issues on company registration): Apple's D-U-N-S lookup at developer.apple.com/enroll/duns-lookup/ — search; if found, note the number; if not, the same tool submits the request. Company legal name/address must match registration EXACTLY. **→ SUBMITTED 2026-07-08 via Apple's form. → SAME DAY: D&B iResearch requested documentation (72-HOUR reply window): completed Business Information Form (their attachment) + up to two docs showing business name+address EXACTLY as submitted — best pair for an incorporated entity: Business Registration Certificate + IRS EIN letter (CP 575). Reply directly to their email. **→ DOCS SENT SAME DAY (2026-07-08, from lanterndigitalhodl@gmail.com):** completed BIR form (`Documents/Legal_Admin/BIR_FORM_USA_FILLED.docx` — NAICS 513210/SIC 7372, $0 prior-year sales, $3k projection) + stamped Articles of Organization + IRS CP 575; registered-agent-vs-business-address clarification included in the body. **→ ✅ RESOLVED 2026-07-09 (D&B case 10640876, SAME-DAY): D-U-N-S NUMBER SECURED — 14-193-9711** (Lantern Digital LLC, 2244 Jackson Ave, Long Island City NY 11101). The number ALREADY EXISTED — auto-issued from the NY registration (this is why the runbook says check-first); D&B verified via NY Secretary of State (file 7668771) + company spokesperson and updated the record with our submitted details (propagates 24–48h). **Two D&B-side data quirks, non-blocking — monitor at Phase-B enrollment:** structured record shows Legal Form "Corporation" (should be LLC; their own resolution comment correctly says LLC) and Start Year "2026" (registered 2025-07-24). Apple keys on legal name + D-U-N-S + enrollment authority, so these shouldn't obstruct — correct via D&B support only if Apple's enrollment form balks. **STORE-ENROLLMENT STATE: BOTH stores now enrollment-ready; every remaining step is Phase-B-gated** (Apple $99 org enrollment · Play $25 org account · then the platform bundle).**
> 2. **Apple ID on the company email** (Lantern Digital address, not personal gmail) with two-factor on — the account that will hold the membership.
> 3. **Enroll** at developer.apple.com/programs/enroll/ as Organization once the D-U-N-S resolves: legal entity name + D-U-N-S + website (elementum.life) + the enroller must have legal authority to bind the company (owner does). Apple may phone-verify. **$99/yr — pay only when Phase B is actually scheduled** (the membership year starts at purchase; an idle year is wasted money). Add to `BIZ_01_Elementum_Expense_Report.md` (~$8.25/mo amortized) when paid.
>
> **What the membership unlocks:** TestFlight (10k testers — the B2 closed-beta channel if we want it; beta does NOT wait for this — PWA covers it), App Store distribution, APNs certificates, Sign in with Apple, IAP/StoreKit.
>
> **Three rules that change the product at Phase B (restated as commitments):**
> 1. **IAP replaces Stripe in the native binary** (digital unlocks; 15% at our size via the Small Business Program). Second entitlement pipeline: App Store Server Notifications → a worker granting the SAME `entitlements` rows the Stripe webhook writes — server-truth design already accommodates dual grantors; client is agnostic.
> 2. **Web Push subscriptions die at the native boundary** → APNs migration (§4.4 decision 3).
> 3. **Sign in with Apple becomes mandatory** the moment Google sign-in ships in the store app (guideline 4.8) — Supabase supports it; wire in the Phase-B bundle.
>
> **Review-risk note:** divination/astrology apps draw extra App Review scrutiny (minimal-functionality + "fortune telling" categories). Elementum's reading-first depth is the defense; still budget one rejection-and-resubmit cycle into the Phase-B timeline. (Cece's 八字 takedown was Chinese regulation, not Apple policy.)
>
> **Sequencing:** D-U-N-S now (background clock) → hold $99 until Phase B is scheduled → Phase B bundle = Capacitor wrap → IAP + store-server webhook → APNs migration → Apple sign-in → TestFlight → review.
>
> **Google Play counterpart (scoped 2026-07-08, same ruling applied):** **Organization account under Lantern Digital** — Play ALSO requires a D-U-N-S for org accounts (since 2023), so **the one Lantern Digital request covers both stores**. $25 one-time (no annual clock), pay at Phase B alongside Apple. Org account additionally skips the personal-account gate (20 testers × 14 continuous days of closed testing before production). Same platform law: digital unlocks in Play-distributed apps use **Play Billing** (15% at our size) — the Phase-B dual-grantor entitlement webhook serves both stores. Push = FCM (free; same §4.4 migration). **Android-specific option to evaluate at Phase B:** a Trusted Web Activity wraps the live PWA for Play with no Capacitor build — distribution-only shortcut (Play Billing still applies), possible Android-first ship. Separate item, already in flight: Google OAuth **brand verification** sits in Google's review queue (consent screen shows supabase.co until it clears) — no action, unrelated to Play.

### §4.3 AI Consultant — real LLM
- **What:** replace scripted replies with a real model that has the user's chart + Energy Manual + Self-Report.
- **Server piece:** a serverless **proxy** holding the API key, injecting context into a system prompt, streaming the response back; enforces rate-limits + a per-user cost cap.
- **Client seam:** `AIConsultantScreen.jsx` already **simulates token streaming**; `buildReplies(chart, selfReport)` returns scripted text. Swap `buildReplies`/`send()` to `fetch` the proxy (SSE/stream). The streaming UI, context bar, and Self-Report wiring already exist (DES_13 §D7).
- **Workload:** medium basic / **ongoing for quality**. Hard parts: prompt design, cost caps + rate-limiting (per-token spend), guardrails/abuse, latency.
- **Depends on:** §4.1 (per-user limits). **Highest product uncertainty + ongoing cost of the four** — the scripted version is an acceptable demo placeholder.

> **PLAN LOCKED 2026-07-07 (owner) — greenlit, build starts when the Anthropic API key arrives.**
>
> **Decisions:** Claude **Sonnet for beta** (voice = the product); **model-agnostic proxy** with a Workers-AI/open-model arm built in from day one — the model is an env var, never a rewrite. **30 messages/day per-user cap** + global monthly budget kill-switch. **Conversations on-device only** (localStorage; server stores zero chat content). **Owner-only Phase 0** allowlist. **Prompt caching from day one** (system+chart blocks repeat every turn; ~50–60% input-cost cut).
>
> **Timeline + cost gates:** Phase 0 build+tune (owner-only; Sonnet-vs-open bake-off with real conversations) → Phase 1 Founding rollout (~$5–15/mo Sonnet cached) → Phase 2 public beta (~$20–40/mo) → **SWITCH TRIGGER: monthly LLM spend > ~$50 OR > ~20% of monthly revenue → default flips to the open arm** (~$25–50/mo at 5k users vs $150–250 Sonnet; optional hybrid keeps Sonnet for the first message per session). Structural note: one-time Founding revenue vs. forever-inference cost is the standing reason post-beta subscriptions exist. Per-message atom: ~4k tokens in (≈2.9k cacheable: system ~1.2k + chart payload ~1.5k + self-report ~0.2k; history ~1.1k uncached) + ~350 out ⇒ Sonnet ≈1.8¢ uncached / ≈0.8¢ cached; Haiku ≈0.5¢; open ≈0.25¢.
>
> **Build inventory:** ① system prompt = the voice charter (reading-first register, concept-inventory persona vocabulary, /legal-mirroring safety rails, 120–250-word replies) — owner reviews; ② `chartToLLMPayload()` serializer per the v2.1-locked payload spec (pillars, DM+band, pattern, catalyst, missing, per-element `presentFaces`/`absentGod`, positional `chart.tenGods`) + Self-Report + today's current; ③ 3–5 few-shot exemplars mined from scripted replies + the 庚 golden reading; ④ rolling ~6-turn history window (client-held); ⑤ first-use consent screen + /legal amendment (Anthropic sub-processor, no-training, no server storage) — REQUIRED BEFORE Phase 1; ⑥ `elementum-llm` Worker (JWT verify → advisor entitlement check → caps via `llm_usage` → prompt assembly → Anthropic-with-caching / Workers-AI switch → SSE passthrough); ⑦ migration `0003_llm_usage.sql`; ⑧ `AIConsultantScreen.send()` swap to streaming fetch; ⑨ Phase-0 owner allowlist env var.
>
> **✅ SHIPPED 2026-07-07 — Phase 0 live (owner-only), E2E verified with real Sonnet conversations.** All nine inventory items built. Phase-0 tuning rounds so far (each = a charter/payload edit + worker redeploy, driven by owner's real conversations):
> 1. **Temporal layer** (owner: "not picking up year and day readings") — payload gained `today` + `dailyGuidance` (the same composition the Today tab renders) + day/month/year `currents` + 12-month `yearFlow` + `decade` chapters (prev/current/next luck pillars); charter gained the TIME-IS-PART-OF-THE-CHART rule.
> 2. **Voice charter v2 — the warm confidant** (owner: too long/lecture-y, too mystical/flowery, too generic): 40–120 words / one idea per turn; ≤1 elemental image per reply, metaphor chains banned; BE-SPECIFIC-OR-BE-SILENT (every reply anchors to a concrete fact of theirs); curiosity-first dialogic register that builds across turns.
> 3. **`authoredVoice` — the dynamic-content contract** (owner: the consultant must digest the LATEST reading content and speak in its fashion). **Architecture rule: the payload is composed ON-DEVICE AT MESSAGE TIME from the same content modules the reading screens render** — manifesto + `elementIntro` + `DM_READING` for their stem, `PERSONA_READING` for each element's lead persona, and the composed Self-Report (`composeSelfReport`). Consequence: polishing reading copy and shipping the app updates the consultant automatically — **no worker redeploy, no sync step; the worker only changes when the REGISTER (charter) changes, the app only when CONTENT does.** Charter counterpart: the SPEAK-IN-THE-APP'S-OWN-VOICE rule (authoredVoice is canon; extend, never contradict, let its diction tune the reply). Payload ≈2.8k tokens, deterministic ⇒ prompt-cache stays warm across a conversation.
> 4. **Thinking-budget fix** (owner: occasional '…' empty replies, esp. on broad questions like "what will happen to me this year?") — claude-sonnet-5 thinks by default and thinking spends from `max_tokens` FIRST; broad questions sometimes consumed all 700 tokens with zero text streamed, and the client posted a literal '…'. Fixed: `thinking:{type:'disabled'}` on the worker call (charter replies are short — no hidden deliberation needed; latency + output cost drop too); client now surfaces in-stream `error` events (they arrive under HTTP 200) and treats an empty stream as a failure, never a bubble.
> **Key-rotation ops doctrine (2026-07-08):** the ANTHROPIC_API_KEY rotates on EVENTS (exposure / offboarding / annual hygiene), NOT a schedule — full automation is impossible by design (Anthropic key creation is console-only; an Admin-API rotator would itself be an unrotatable bigger secret) and unnecessary (the $50/mo kill-switch + 30/day cap bound idle risk). Tooling: `tools/rotate-llm-key.ps1` automates everything between the two console clicks (~60s: hidden prompt → API validation → wrangler secret put) — the hidden prompt keeps keys out of chat/history, the failure mode both 2026-07 keys hit.
>
> 5. **The vocabulary law** (owner: only concept-inventory BaZi terms — no direct translations, Chinese words, or alien jargon) — enforced at BOTH layers: the payload strips the engine's translated god names (banished aliases per `REA_07_Reading_Concept_Inventory` §1–2) so every ten-god field carries only the persona register (The Twin … The Sage), `decade`→`lifeChapters` (canonical: Life Chapters), pillar stems ride canonical names; the charter gains THE VOCABULARY LAW section (personas + first-appearance definition lines, Life Chapters / this year's energy / Catalyst / Friction, no Chinese or romanized jargon in speech). Principle: **the model can only speak what it sees — sanitize the data, then legislate the register.** Live-probe verified: pure-canon reply, zero banned terms.

### §4.4 Push notifications — daily reading reminder

> **✅ SHIPPED 2026-07 — verified end-to-end on iOS (installed PWA, encrypted payload via Apple push) + desktop Chrome (FCM).** elementum-push Worker live with hourly cron; RFC 8291 aes128gcm payloads (Apple requires them — payload-less is silently dropped); POST /send-now for preview sends; dead subs pruned. Known follow-ups: wire onboarding step 7 to the real subscribe, and reconcile the Profile toggle with actual subscription state (it defaults ON cosmetically).

> **DECISIONS LOCKED 2026-07 (owner):**
> 1. **Raw Web Push** (VAPID, no vendor) — not OneSignal/FCM SDKs. Zero cost, no third-party tracking, runs on the existing Cloudflare Worker + Supabase stack.
> 2. **Date-based message, no personalization server-side.** The daily elemental current (day stem/element) derives from the DATE alone — identical for all users, zero PII. The personalized layer renders client-side after tap-through. This preserves the §3 privacy split (birth data never leaves the device) — the server stores only a push endpoint + preferred send hour.
> 3. **Native-app push (FCM/APNs) is DEFERRED to Phase B** — tracked alongside the §4.2a IAP/Play-Billing bundle. When the Capacitor wrap happens, Web Push subscriptions do not carry over into the native binary; a push-provider migration (FCM/APNs, likely via the §4.2a store-migration workstream) is required. **Do not treat Web Push infra as reusable for the native app.**

- **What:** the "daily reading" reminder actually firing, as Web Push from `elementum.life` (no app store).
- **Platform reality:** Android/desktop — works from the browser directly. **iOS 16.4+ — works ONLY for the installed PWA** (Add to Home Screen first); Safari browsing alone cannot receive push. The install step is the iOS friction; the A2HS prompt is therefore part of the push funnel.
- **Server piece:** `elementum-push` Cloudflare Worker — (a) subscribe/unsubscribe API writing `push_subscriptions` via service-role (no client RLS surface), (b) hourly **cron** that sends to every subscription whose preferred UTC hour matches, (c) `/message` endpoint serving today's date-based text. Sends are **payload-less** (VAPID auth only — sidesteps RFC 8291 payload encryption); the service worker fetches `/message` on wake and shows the notification.
- **Client seam:** onboarding step 7 + the Profile notify toggle stop being cosmetic: permission request → `pushManager.subscribe(VAPID public key)` → POST to the Worker. Custom SW push/notificationclick handlers ride `importScripts` into the vite-plugin-pwa generated SW.
- **Depends on:** nothing server-side beyond the Worker + one table (deliberately NOT on §4.1 accounts — anonymous users can subscribe; `user_id` is attached when a session exists).

---

## 5. Integration seams already in the code

The app was built so each backend item is a localized swap, not a rewrite:

| Stub today | File | Replace with |
|---|---|---|
| `tier` (in-memory demo flip) | `store/chartContext.jsx`, `UpgradeModal.jsx` | server entitlement read (DB) |
| `hasSelfReport` + `purchaseSelfReport()` (localStorage) | `store/chartContext.jsx`, `SelfReportScreen.jsx` | Stripe purchase → webhook → DB |
| `buildReplies()` scripted + simulated stream | `AIConsultantScreen.jsx` | `fetch` LLM proxy (real stream) |
| Sign Out no-op | `ProfileScreen.jsx` | auth provider sign-out |
| Notify toggle cosmetic | `ProfileScreen.jsx`, onboarding | push permission + provider |
| `window.__setTier` / `__buySelfReport` | `App.jsx` (IS_DEV-gated) | remove authority once entitlements are server-side |

Keeping `useChart()` as the single accessor for `tier`/`hasSelfReport` means the swap is concentrated in `chartContext` + the purchase CTAs.

---

## 6. Sequencing — now vs. pre-beta

**Recommendation: defer the full backend to a focused pre-beta phase.**

**Why defer**
- The app is fully usable + demo-able today via the stubs; no product/UX/content iteration is blocked.
- The seams are clean → late integration is a swap, not a rewrite.
- Standing up live auth/payments/DB now adds cost, ops, security surface, and **privacy/compliance liability (birth data)** before the product is settled.
- Backend-driving requirements (final pricing, consultant scope, cadence) firm up late.

**Pull one item early only if the alpha must learn that thing**
- Validate willingness-to-pay → do **§4.2 Payments** early; stub the rest.
- Validate the consultant → do **§4.3 LLM** early; stub the rest.

**Build order (when you do build):** **§4.1 Auth → §4.2 Payments → §4.3 LLM → §4.4 Push.** Auth is the prerequisite for the other three.

**Worth doing now (decisions, ~no code)**
1. Lock the **data model** (§3) — client-vs-server split.
2. **Pick providers** so login/checkout UIs can be designed against the real flow.
3. Decide **pricing + Stripe-vs-MoR** (affects purchase copy today).

---

## 7. Privacy & compliance (do not skip)

- Storing birth dates/locations server-side = sensitive PII → **privacy policy, GDPR data-subject rights, breach exposure.**
- The §3 data model (PII on-device, server holds account + entitlement + billing) **minimizes** this.
- Stripe/Paddle handle PCI; a Merchant-of-Record additionally handles VAT/sales-tax.
- If Self-Report or chart data is ever sent to the LLM, that is a data-processing flow to disclose (sub-processor: the LLM vendor).

---

## 8. Cost shape

- **Fixed/managed:** Supabase + auth + push provider — generous free tiers cover an alpha; low monthly at small scale.
- **Usage-based:** LLM (per-token — needs hard per-user caps) is the main variable cost and the reason to gate §4.3 behind real entitlements.
- **Revenue-share:** Stripe ~2.9%+30¢; a Merchant-of-Record takes more but removes tax/compliance work.
- **Rough build estimate:** ~2–4 focused weeks of code for a basic, shippable version of all four (each ≈ days), plus non-code (accounts, legal/tax, privacy policy) and ongoing usage cost.

---

## 9. Open decisions

1. Auth model: full accounts vs. lightweight magic-link-at-purchase.
2. Stripe direct vs. Merchant-of-Record (Paddle / Lemon Squeezy).
3. Does any astrology PII go server-side, or stays strictly on-device?
4. Web Push (PWA) now vs. native push later (does the roadmap include a wrapped app?).
5. LLM vendor + the consultant's exact remit + cost cap per user/tier.
6. **Native-app billing (Phase B):** if/when wrapped for App Store/Play, digital unlocks must move to **Apple IAP + Google Play Billing** (~15–30%) — Stripe is web/PWA-only for digital goods. Decide: PWA-only (keep Stripe) vs. native + IAP vs. hybrid (web purchase + account-based unlock, navigating Apple anti-steering). Bundle with §4.1 accounts. (See §4.2a.)

---

## Version history

| Version | Date | Notes |
|---|---|---|
| 0.1 | June 2026 | Initial draft. Server-free managed-backend plan; four items (auth/payments/LLM/push) scoped against the existing client seams; deferral rationale; data-model + privacy guidance. Pre-implementation. |
| 0.2 | July 2026 | Founding Pass shipped (interim, honor-system Stripe Payment Link) — recorded in §4.2. Added §4.2a wallets & native-app billing (Apple Pay/Google Pay work via Stripe on web/PWA; native App Store/Play require Apple IAP + Google Play Billing) + open decision #6. |
| 0.4 | July 2026 | §4.4 Web Push shipped + verified (iOS + desktop). RFC 8291 encrypted payloads required for Apple delivery. |
| 0.3 | July 2026 | **§4.1 + §4.2 shipped server-verified.** Supabase auth (purchase-gated sign-in, entitlements table + RLS + signup trigger), Stripe webhook Worker (signature-verified → entitlement upsert), server-truth tier in the client, honor-system grant retired. Stack note: serverless functions run on **Cloudflare Workers** (not Supabase Edge Functions) — wrangler was already authenticated, same platform as the app. |
| 0.5 | July 2026 | **§4.3 AI Consultant shipped (Phase 0)** — elementum-llm Worker + five tuning rounds (see §4.3 tuning log); Phase-1 gates done (/legal AI amendment + on-device chat persistence); Phase 1 = empty OWNER_IDS. **§4.2a addendum: Apple Developer setup started** — Organization enrollment under Lantern Digital locked; D-U-N-S runbook + the three Phase-B product-changing rules recorded. |
