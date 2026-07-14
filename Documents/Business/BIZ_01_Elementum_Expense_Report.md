# Elementum — Expense Report & Cost Projection

**As of:** 2026-07-07 · **Prepared before the §4.3 LLM investment decision** (the one recurring cost not yet committed)
**Companion docs:** `INF_01_Backend_Architecture.md` (§4.3 cost gates, §4.2a Phase-B costs) · infra ownership map (memory)
**Convention:** 🟢 live cost · ⚪ free today · 🟡 committed-future (trigger defined) · 🔵 pending owner approval

---

## 1 · Service inventory — everything the product runs on

| Service | Account owner | Plan today | Cost today | Role |
|---|---|---|---|---|
| **Cloudflare Registrar** (elementum.life) | personal | annual registration | 🟢 **~$25–30/yr ≈ $2.50/mo** *(at-cost; CONFIRM actual from receipt)* | the domain |
| **Cloudflare Workers** ×3 (`elementum`, `elementum-stripe-webhook`, `elementum-push`) | personal | Free plan | ⚪ $0 (well under 100k req/day; cron free) | hosting, payments webhook, push |
| **Cloudflare Email Routing** | personal | — not set up | ⚪ $0 (free when enabled) | future `support@elementum.life` |
| **Supabase** (`nbactbfxqslzehzbgetp`) | personal | Free tier | ⚪ $0 | accounts, entitlements, push subscriptions |
| **Stripe** | company (Lantern Digital) | pay-per-transaction | ⚪ $0 fixed · **2.9% + 30¢ per sale** (variable) | both payment links |
| **Google Cloud** (OAuth client) | personal | free (no billable APIs) | ⚪ **$0 — structurally**: OAuth/Identity is unmetered (no per-sign-in charge, no billing account on the project); geocoding deliberately uses free Open-Meteo, not Google Maps. Phase-B Google costs are non-GCP: Play Console **$25 one-time** · FCM push free | Google sign-in |
| **Google Search Console** | personal | free | ⚪ $0 | domain verification (brand review) |
| **GitHub** (`jiaxinxuyago/Elementum`) | personal | free | ⚪ $0 | repo |
| **Anthropic API** (§4.3 consultant) | — not created | — | 🔵 **pending this decision** | the AI consultant |
| **Anthropic Claude Max** (AI dev tooling — built this entire product) | personal | Max 20× | 🟢 **$200/mo — the №1 cost, larger than all other lines combined** | development velocity |

**Everything else in the stack is $0 by architecture:** raw Web Push (no OneSignal), on-device chart engine (no compute backend), composed reports (no generation API), static legal/paid pages.

---

## 2 · Current monthly total (before the LLM)

| Bucket | Amount |
|---|---|
| **Fixed monthly — all-in** | **≈ $202.50/mo** = Claude Max $200 (development) + domain $2.50 |
| **Fixed monthly — product runtime only** | **≈ $2.50/mo** (what the shipped product costs to keep running) |
| Variable per sale | 2.9% + $0.30 → $0.56 per $9 Founding · $0.50 per $6.99 Self-Report |
| One-time spent to date | domain registration (~$25–30) · $9 self-test purchase (recoverable: refund ≈ $8.44, or keep as Founding #1) |

> **The two-bucket view matters:** Claude Max is a *development* cost — it buys build velocity and exists whether or not users show up; it could be scaled down in a maintenance phase. The *runtime* cost of the shipped product is ~$2.50/mo — the infra run (domain → payments → accounts → push → legal → payment-journey) added **zero recurring runtime cost**; everything runs on free tiers + one domain. Business break-even must clear the all-in number; product-viability math uses the runtime number.

---

## 3 · Projection by phase (fixed monthly, USD)

| Cost line | **Today** | **Phase 1** — Founding rollout (~50 users) | **Phase 2** — public beta (~500) | **Phase 3** — growth (~5k) |
|---|---|---|---|---|
| **Claude Max (development)** | **200** | **200** | **200** | **200** *(revisit: maintenance phase could downshift the plan)* |
| Domain | 2.50 | 2.50 | 2.50 | 2.50 |
| Supabase | 0 | 0 → **25** 🟡 *(Pro required when beta marketing starts — uptime/capacity)* | **25** | **25** |
| Cloudflare Workers | 0 | 0 | 0 → **5** 🟡 *(Paid plan only if request volume demands)* | **5** |
| LLM — consultant 🔵 | 0 | **5–15** (Sonnet, cached) | **20–40** (Sonnet, cached) | **25–50** *(open-model default per the SWITCH TRIGGER)* |
| Email routing / misc | 0 | 0 | 0 | 0–5 |
| **Runtime subtotal / mo** | ≈ 2.50 | ≈ 8–43 | ≈ 53–73 | ≈ 58–88 |
| **TOTAL all-in / mo** | **≈ $202.50** | **≈ $208–243** | **≈ $253–273** | **≈ $258–288** |

> Perspective: the entire §4.3 LLM debate (Sonnet vs open, ~$25–200/mo at scale) plays out INSIDE the shadow of the Claude Max line. Development tooling — not runtime infrastructure — is where this business spends money today.

**Phase B (native app, whenever):** + Apple Developer **$99/yr** (~$8/mo) + Apple/Google take **15–30% of in-app revenue** (vs Stripe's ~3%; 15% at our size via the Small Business Program) — the single biggest cost event on the roadmap; tracked in INF_01 §4.2a. **Enrollment STARTED 2026-07:** Organization under Lantern Digital (owner-locked); free D-U-N-S request is the current step; the $99 is deliberately deferred until Phase B is scheduled (membership year starts at purchase).

**Post-beta compliance (at real revenue):** Merchant-of-Record option (Paddle/Lemon Squeezy) trades ~+2–5% per sale for offloading global VAT/sales-tax — decision parked in INF_01 §9.

---

## 4 · Committed cost triggers (rules already on record)

1. **Supabase Free → Pro ($25/mo):** before beta *marketing* begins. (Idle-pause risk is already mitigated by the push cron's hourly traffic; Pro is a capacity/SLA decision.)
2. **LLM model switch (Sonnet → open):** when monthly LLM spend exceeds **~$50** OR **~20% of that month's revenue** — env-var flip on the worker, no rebuild. (INF_01 §4.3.)
3. **LLM outer wall:** Anthropic console monthly spend limit set at account creation (~$25 recommended) — hard stop regardless of bugs or abuse.
4. **Per-user cap:** 30 consultant messages/day → bounds the worst single user at ~$7/mo (Sonnet cached).
5. **Stripe price changes** must ship with a webhook `PRODUCTS` update in the same deploy (routing is amount-based).

---

## 5 · Break-even framing (how many sales cover the bills?)

Net revenue per sale after Stripe: **Founding $8.44** · **Self-Report $6.49**.

| Phase | Runtime only → passes/mo | **All-in (incl. Claude Max) → passes/mo** |
|---|---|---|
| Today | ~$2.50 → 1 per quarter | **~$202.50 → ~24/mo** |
| Phase 1 | ~$43 → ~5/mo | **~$243 → ~29/mo** |
| Phase 2 | ~$73 → ~9/mo | **~$273 → ~33/mo** |
| Phase 3 | ~$88 → ~11/mo | **~$288 → ~35/mo** — see the structural note ↓ |

> **The honest read:** covering the all-in number with one-time $9 passes means ~25–35 *new* buyers every month indefinitely — not a plan. The realistic paths to all-in break-even are (a) post-beta **subscriptions** ($9.99/$19.99 recurring: ~20–25 Seeker subs covers everything), and/or (b) treating Claude Max as a bounded **investment phase** that downshifts once the build stabilizes. Runtime-only break-even, by contrast, is nearly free — the product itself is cheap to keep alive.

> **Structural note (from INF_01 §4.3):** the Founding Pass is one-time revenue against forever inference cost — a typical consultant user consumes their $9 in ~a year, a heavy user in ~3 months. At Phase-3 scale the LLM must be funded by **recurring** revenue: that is the standing business case for launching the Seeker/Advisor subscriptions post-beta, and the reason the open-model switch trigger exists.

---

## 6 · Owner to-dos on this report

- [ ] Confirm actual elementum.life registration price (Cloudflare dashboard → Billing) and correct §1/§2
- [x] ~~Add AI dev-tooling cost~~ — **Claude Max $200/mo added (the №1 line)**
- [x] ~~Decide the 🔵 LLM line~~ — **decided + live 2026-07-07: §4.3 Phase 0 shipped (Sonnet, $50/mo kill-switch); actuals accrue in `llm_usage`**
- [ ] Apple Developer: complete the Lantern Digital D-U-N-S request; pay the $99 only when Phase B is scheduled, then add the line to §1/§2 (~$8.25/mo amortized)
- [ ] Periodically revisit whether the Max plan tier still matches the build phase (heavy build vs maintenance)
- [ ] Revisit this report at each phase gate (it is referenced from INF_01)

*Maintained by hand — update alongside INF_01 when a cost trigger fires.*

---

## Deferred spending backlog (triggers, not dates) — est. 2026-07-09

| Item | Cost | Trigger | Unlocks |
|---|---|---|---|
| Cloudflare Workers Paid | $5/mo | ~4 wks before first external users (early Aug for Sept ship, or validation-sprint wave) | Analytics pipeline (WAE) + customer email (support@) |
| Supabase Pro | ~$25/mo | Before beta marketing (idle-pause already mitigated by push cron) | Capacity/SLA |
| Apple Developer (Lantern Digital org) | $99/yr | Phase B scheduled (D-U-N-S in progress) | App Store distribution |

Monthly budget report (automation piece #10, 1st of month) tracks this table + actuals; statement reconciliation is owner-fed CSV drops into `Documents/Business/statements/` (gitignored) — agents NEVER hold bank/financial credentials (standing rule).
