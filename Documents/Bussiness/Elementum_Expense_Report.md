# Elementum — Expense Report & Cost Projection

**As of:** 2026-07-07 · **Prepared before the §4.3 LLM investment decision** (the one recurring cost not yet committed)
**Companion docs:** `DOC10_Backend_Architecture.md` (§4.3 cost gates, §4.2a Phase-B costs) · infra ownership map (memory)
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
| **Google Cloud** (OAuth client) | personal | free (no billable APIs) | ⚪ $0 | Google sign-in |
| **Google Search Console** | personal | free | ⚪ $0 | domain verification (brand review) |
| **GitHub** (`jiaxinxuyago/Elementum`) | personal | free | ⚪ $0 | repo |
| **Anthropic API** (§4.3 consultant) | — not created | — | 🔵 **pending this decision** | the AI consultant |
| **AI dev tooling** (Claude subscription used to build all of this) | personal | — | 🟢 *(owner: add your actual plan cost — it is a real development cost of the business)* | development |

**Everything else in the stack is $0 by architecture:** raw Web Push (no OneSignal), on-device chart engine (no compute backend), composed reports (no generation API), static legal/paid pages.

---

## 2 · Current monthly total (before the LLM)

| Bucket | Amount |
|---|---|
| **Fixed monthly** | **≈ $2.50/mo** (domain amortized — literally the only fixed cost) |
| Variable per sale | 2.9% + $0.30 → $0.56 per $9 Founding · $0.50 per $6.99 Self-Report |
| One-time spent to date | domain registration (~$25–30) · $9 self-test purchase (recoverable: refund ≈ $8.44, or keep as Founding #1) |

> The infra run (domain → payments → accounts → push → legal → payment-journey) added **zero recurring cost**. The entire commercial backbone currently runs on free tiers + one domain.

---

## 3 · Projection by phase (fixed monthly, USD)

| Cost line | **Today** | **Phase 1** — Founding rollout (~50 users) | **Phase 2** — public beta (~500) | **Phase 3** — growth (~5k) |
|---|---|---|---|---|
| Domain | 2.50 | 2.50 | 2.50 | 2.50 |
| Supabase | 0 | 0 → **25** 🟡 *(Pro required when beta marketing starts — uptime/capacity)* | **25** | **25** |
| Cloudflare Workers | 0 | 0 | 0 → **5** 🟡 *(Paid plan only if request volume demands)* | **5** |
| LLM — consultant 🔵 | 0 | **5–15** (Sonnet, cached) | **20–40** (Sonnet, cached) | **25–50** *(open-model default per the SWITCH TRIGGER)* |
| Email routing / misc | 0 | 0 | 0 | 0–5 |
| **TOTAL fixed / mo** | **≈ $2.50** | **≈ $8–43** | **≈ $53–73** | **≈ $58–88** |

**Phase B (native app, whenever):** + Apple Developer **$99/yr** (~$8/mo) + Apple/Google take **15–30% of in-app revenue** (vs Stripe's ~3%) — the single biggest cost event on the roadmap; tracked in DOC10 §4.2a.

**Post-beta compliance (at real revenue):** Merchant-of-Record option (Paddle/Lemon Squeezy) trades ~+2–5% per sale for offloading global VAT/sales-tax — decision parked in DOC10 §9.

---

## 4 · Committed cost triggers (rules already on record)

1. **Supabase Free → Pro ($25/mo):** before beta *marketing* begins. (Idle-pause risk is already mitigated by the push cron's hourly traffic; Pro is a capacity/SLA decision.)
2. **LLM model switch (Sonnet → open):** when monthly LLM spend exceeds **~$50** OR **~20% of that month's revenue** — env-var flip on the worker, no rebuild. (DOC10 §4.3.)
3. **LLM outer wall:** Anthropic console monthly spend limit set at account creation (~$25 recommended) — hard stop regardless of bugs or abuse.
4. **Per-user cap:** 30 consultant messages/day → bounds the worst single user at ~$7/mo (Sonnet cached).
5. **Stripe price changes** must ship with a webhook `PRODUCTS` update in the same deploy (routing is amount-based).

---

## 5 · Break-even framing (how many sales cover the bills?)

Net revenue per sale after Stripe: **Founding $8.44** · **Self-Report $6.49**.

| Phase | Fixed cost/mo | Founding passes to break even |
|---|---|---|
| Today | ~$2.50 | **1 sale every 3 months** |
| Phase 1 | ~$43 worst case | **~5/mo** |
| Phase 2 | ~$73 worst case | **~9/mo** |
| Phase 3 | ~$88 worst case | **~11/mo** — but see the structural note ↓ |

> **Structural note (from DOC10 §4.3):** the Founding Pass is one-time revenue against forever inference cost — a typical consultant user consumes their $9 in ~a year, a heavy user in ~3 months. At Phase-3 scale the LLM must be funded by **recurring** revenue: that is the standing business case for launching the Seeker/Advisor subscriptions post-beta, and the reason the open-model switch trigger exists.

---

## 6 · Owner to-dos on this report

- [ ] Confirm actual elementum.life registration price (Cloudflare dashboard → Billing) and correct §1/§2
- [ ] Add your AI dev-tooling subscription cost to §1 if you want all-in business cost
- [ ] Decide the 🔵 LLM line (this unblocks §4.3 Phase 0) — projected impact at decision time: **+$5–15/mo**
- [ ] Revisit this report at each phase gate (it is referenced from DOC10)

*Maintained by hand — update alongside DOC10 when a cost trigger fires.*
