# DOC10 — Backend Architecture & Pre-Launch Services

## Accounts · Payments · LLM · Push — a server-free, managed-backend plan

**Version:** 0.1 · June 2026 (draft — pre-implementation)
**Related docs:** DOC8 (code architecture) · DOC5 §19 (pricing & content tiers) · DOC1 (calculation engine — client-side) · DOC7 / D7 (Self-Report)
**Status:** **Planning.** No backend exists yet. The app runs **fully client-side** with deliberate demo stubs placed at clean integration seams (tier, entitlement, consultant, notifications). This document is the spec + sequencing for the eventual build, and the rationale for **deferring it to a pre-beta phase**.

---

## 0. TL;DR

- **Designated server: NO.** Everything is achievable with a **managed BaaS + ~3 small serverless functions + third-party SaaS**. No VM, container, or long-running server to operate.
- **The core never needs a server.** The BaZi engine (`engine/calculator.js`, DOC1) and all reading content are 100% client-side. The backend is commodity glue: accounts, payments, an LLM proxy, push.
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
- **What:** real money for the Seeker tier ($9.99/mo, DOC5 §19) and the Self-Report add-on ($6.99 one-time, D7).
- **Server piece:** Stripe hosts the payment UI (PCI-compliant) + **one** serverless webhook that writes entitlements to the DB on `checkout.session.completed` / subscription events.
- **Client seam:** today `UpgradeModal` flips `tier` in memory and `purchaseSelfReport()` flips `hasSelfReport` in `localStorage` (demo). Replace: the upgrade/purchase CTAs open Stripe Checkout; `useChart().tier` / `hasSelfReport` read from the server (DB) instead of `localStorage`. **Delete the `window.__setTier` / `__buySelfReport` dev backdoor's authority** (already IS_DEV-gated).
- **Workload:** medium (days code) + non-code: Stripe account, products/prices, **tax** (consider a Merchant-of-Record to offload VAT).
- **Depends on:** §4.1 (Stripe customer ↔ user mapping).

### §4.3 AI Consultant — real LLM
- **What:** replace scripted replies with a real model that has the user's chart + Energy Manual + Self-Report.
- **Server piece:** a serverless **proxy** holding the API key, injecting context into a system prompt, streaming the response back; enforces rate-limits + a per-user cost cap.
- **Client seam:** `AIConsultantScreen.jsx` already **simulates token streaming**; `buildReplies(chart, selfReport)` returns scripted text. Swap `buildReplies`/`send()` to `fetch` the proxy (SSE/stream). The streaming UI, context bar, and Self-Report wiring already exist (D7).
- **Workload:** medium basic / **ongoing for quality**. Hard parts: prompt design, cost caps + rate-limiting (per-token spend), guardrails/abuse, latency.
- **Depends on:** §4.1 (per-user limits). **Highest product uncertainty + ongoing cost of the four** — the scripted version is an acceptable demo placeholder.

### §4.4 Push notifications — daily reading reminder
- **What:** the "daily reading" reminder actually firing.
- **Server piece:** a push provider + a **cron** serverless function that, per opted-in user, computes the daily message and sends.
- **Client seam:** the Profile notify toggle + onboarding notify steps are **cosmetic** today. Add: permission request + service worker (Web Push) or SDK (OneSignal). The daily-message logic already exists client-side (`content/dailyGuidance.js`) and is replicated server-side for the send (or recomputed from stored birth data).
- **Workload:** medium, platform-dependent. Native push (if wrapped) = FCM/APNs.
- **Depends on:** §4.1 + a server-side chart or birth data.

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

---

## Version history

| Version | Date | Notes |
|---|---|---|
| 0.1 | June 2026 | Initial draft. Server-free managed-backend plan; four items (auth/payments/LLM/push) scoped against the existing client seams; deferral rationale; data-model + privacy guidance. Pre-implementation. |
