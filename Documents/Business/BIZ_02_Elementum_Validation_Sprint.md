# Elementum — Validation Sprint
### From "A-grade builder, zero market evidence" → first real numbers
**Window:** Fri Jun 26 → ~Sun Jul 12, 2026 (2-week sprint, first-dollar track front-loaded to hit "before July")

---

## 0. The one goal

Stop building. **Get a few dozen real strangers through the reveal and find out four things you currently don't know:** does it land, do they leave an email, do they share it, will anyone pay. Everything below serves that and nothing else. If a task doesn't produce one of those four numbers, it's out of scope for this sprint.

You are not trying to grow yet. You are trying to *learn*. ~100–200 completed reveals gives you a usable read; even 30–50 gives a directional one. Volume is not the goal — signal is.

---

## 1. The hypotheses you're testing

Write these down as falsifiable bets so you can't move the goalposts later:

| # | Hypothesis | The number that proves/kills it |
|---|------------|--------------------------------|
| H1 | The reveal lands as "this is *me*" | Email opt-in rate (desire proxy) |
| H2 | People want to share their result | Share-click rate |
| H3 | Someone will pay real money, first-glance | Pay rate on the one deliverable item |
| H4 | People can get *to* the magic moment without friction | Reveal completion rate |

---

## 2. The four metrics + decision thresholds

Instrument the funnel as these six events:
`reveal_started → reveal_completed → email_captured → share_clicked → checkout_started → purchase_completed`

| Metric | Definition | 🟢 Strong | 🟡 Watch | 🔴 Rethink |
|--------|-----------|-----------|----------|-----------|
| **Reveal completion** | landed → finished reveal | ≥ 60% | 40–60% | < 40% (onboarding/loading friction) |
| **Email opt-in** | finished reveal → gave email | ≥ 30% | 15–30% | < 15% (reveal isn't landing, or ask is wrong) |
| **Share rate** | finished reveal → clicked share | ≥ 20% | 10–20% | < 10% (no viral engine — biggest long-term risk) |
| **Pay rate** | see §3 — this one is sequenced, not first-glance | any real $ from warm list = signal | — | nobody pays even warm = pricing/value problem |

> **Read this carefully on pay rate:** do **not** judge payment on cold first-glance traffic — that's an unfair test that will give a false negative. Cold subscription conversion is near-zero for everyone; your own model assumes the depth-hunger trigger fires around Day 14. The honest early money test is selling a **Founding pass to the warm segment** (friends + the email list, *after* they've felt the reveal). Pay validation comes second, to a warmed audience — never cold.

UTM-tag every marketing link (`?utm_source=tiktok&utm_campaign=blade-hook`) so you learn *which hook and channel* drives quality, not just totals.

---

## 3. The minimal build — three things, nothing else

You already have the hard part (the reveal, compat engine, daily guidance — all real). You're adding only the instrumentation to measure and the rails to capture. Estimated ~2–3 focused days total.

### Build A — Instrumentation (½ day)
- **PostHog** (free tier) for the event funnel above — it does step-by-step funnels and retention out of the box, which is exactly what you need. Drop the snippet in `index.html`, fire the six events at the right points in your flow state machine.
- **Cloudflare Web Analytics** (free, native to your stack, no cookie banner) for raw traffic/sources.
- *Why both:* PostHog tells you the funnel shape; Cloudflare tells you where traffic came from.

### Build B — Email capture at the reveal (1 day)
- Place the ask **at the reveal moment, after the wow** — never before it. Copy direction: "Save your reading / get founding access," not "join our newsletter."
- Pipe to a real ESP so you can email them later for the Founding pre-sale: **Loops**, **Kit (ConvertKit)**, or **Buttondown** — all have free tiers and an embeddable form or simple API. Do **not** roll your own KV store; the point is to be able to *email* the list, not just collect it.
- This is the single highest-value build in the sprint. Today, localStorage means every non-opt-in visitor is lost forever. This plugs the leak.

### Build C — One real payment (½–1 day)
- **Stripe Payment Link** for a **Founding Member pass** (one URL, no backend). Price it as transparent early-access: unlocks everything live today + AI/self-report when they ship, at a locked founding rate.
- Wire it to the existing flip point: success redirect → `setTier`. For a closed beta this is acceptable; add a Stripe webhook + server-side entitlement before any public scale (natural Worker route).
- **Transparency is mandatory:** show what's live now vs. rolling out. A founding offer with a visible roadmap is honest and converts. Charging full price for the scripted AI is the one move that creates the irreversible bad reviews.

### Build D — Domain (30 min, do first)
- Attach **elementum.app** (.com/.ai are taken by an enterprise SaaS co). Cloudflare Registrar → Worker → Settings → Domains & Routes → Add Custom Domain. Auto-SSL.

> **Guardrail:** expose **only the polished reveal flow** to public clicks. Soft-hide the half-built dashboard surfaces. Protect the first impression — it's the one thing you can't take back.

---

## 4. Traffic plan — narrow, organic, warm-first

| Tier | Who | Goal |
|------|-----|------|
| **1. Warm** (Days 1–3) | Friends, personal network, anyone who's seen it | First 20–50 reactions + **first dollar** (Founding pass) + qualitative feedback |
| **2. Communities** (Week 1) | Reddit/Discord: MBTI, astrology, Human Design, BaZi | Free-reading offers; respect each community's self-promo rules |
| **3. Organic short-form** (Week 1–2) | TikTok / IG Reels — your category's #1 engine | 3–5 reveal/archetype hooks, link in bio, UTM-tagged |

No paid ads. Your own GTM defers spend until PMF, and you have no funnel data to spend against yet.

**Hook ideas to test:** reaction content ("POV: an app read me from my birth time and got it uncomfortably right"), archetype carousels ("The Blade. The Oak. The Ocean — which are you?"). The output is the ad.

---

## 5. Timeline

### Weekend sprint — Days 1–3 (Jun 26–28): *build the loop + first dollar*
- [ ] **Fri:** Domain attached. PostHog + Cloudflare Analytics live, six events firing.
- [ ] **Sat:** Email capture at reveal → ESP. Stripe Founding Payment Link created + wired to unlock.
- [ ] **Sun:** Soft-launch to warm network (DM 20–30 people the link personally). Goal: **first real dollar before July 1.** ✅ deadline hit.

### Week 1 — Days 4–9 (Jun 29–Jul 5): *cold traffic + accumulate data*
- [ ] Post 3–5 short-form hooks, UTM-tagged. One per day; double down on whichever travels.
- [ ] Seed 2–3 relevant communities with free-reading offers.
- [ ] Email the warm list the Founding pre-sale (transparent roadmap).
- [ ] Daily: glance at the funnel. Don't optimize yet — just accumulate.

### Week 2 — Days 10–16 (Jul 6–12): *read, interview, decide*
- [ ] Pull the four metrics against §2 thresholds.
- [ ] **Qualitative (don't skip):** interview 5–10 people — payers, sharers, and droppers. Use *The Mom Test* style: ask what they actually did and felt, not "would you pay?" Key questions: *Did the reveal feel like you? What part? What almost stopped you from sharing/paying?*
- [ ] Make the call (§6).

---

## 6. Decision framework — what the numbers mean

| Pattern | Reading | Action |
|---------|---------|--------|
| Opt-in 🟢 + share 🟢 | The reveal *lands and travels.* You have the core. | Go: build the share-card mechanic + finish content depth. This is product-market resonance. |
| Opt-in 🟢 + share 🔴 | People love it but won't spread it | Fix the share artifact (is the card beautiful/proud-making?) before scaling spend |
| Opt-in 🔴 + completion 🟢 | They reach the reveal but it doesn't move them | The *reading itself* is the problem — depth/accuracy/voice. Back to content. |
| Completion 🔴 | They never reach the magic | Onboarding/loading friction — fix the path to reveal first |
| Warm list pays 🟢 | Real willingness to pay exists | Validated: build the paid features for real, in order (self-report first) |
| Nobody pays, even warm | Value/pricing mismatch | Re-examine the offer before investing more in monetization |

---

## 7. What this sprint deliberately is NOT
- Not more engine refinement. Product risk is largely retired.
- Not App Store submission. Separate, later race.
- Not building the real AI consultant. Validate demand first; it's the expensive feature.
- Not paid acquisition. No data to spend against yet.

**The discipline for the next two weeks: you are a validator, not a builder.** The build is good enough to test. Go get the four numbers.
