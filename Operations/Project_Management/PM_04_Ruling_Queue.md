# PM_04 · Ruling Queue

**Born:** 2026-10-22 on the owner's rulings D1 A, D2 A, D3 A (`BIZ_05` §7.2, §8).
**Purpose:** one place where every session queues the decisions it needs from the owner, so the owner rules once a week in one sitting instead of on many pages every day.

---

## 1 · The rules

1. **One queue (D1).** A session that needs an owner ruling adds a row to §3, not only to its own page. Its own page may still carry the detail; the row links to it.
2. **Ruling day.** The owner rules the queue once a week, in the established format (codes, recommended option first), in any session. The strategy session publishes the week's queue as one phone page each Friday and records the answers here.
3. **What sessions decide themselves (D2).** TWEAK and MINOR items (wording polish, small layout fixes, mechanical doc fixes) are adopted by the session when its gates pass (`npm run check`, its own audits). Each adoption is listed in §4 so the owner can reverse it.
4. **What only the owner decides.** MAJOR items, money (prices, spend, billing), the engine (anything under `Elementum_App/src/engine/`), legal (`/legal`, privacy, tax), design direction, and anything that changes elementum.life for readers in a way they would notice.
5. **The default (D3).** A queued ruling unanswered 7 days after it was queued takes option A, except the owner-only kinds in rule 4 that are money, engine, legal or live-on-elementum.life. Those wait. The session that applies a default records it in §4.

## 2 · Row format

`| Code | Queued | Session | Kind | Question | A (recommended) | B | C | Detail | Status |`

- **Code:** the session's own code (for example R3, M1), prefixed with the section when it could clash (DOM-R3).
- **Kind:** MAJOR, money, engine, legal, design, live, or MINOR.
- **Status:** queued · ruled X (date) · default A (date) · withdrawn.

## 3 · The queue

| Code | Queued | Session | Kind | Question | A (recommended) | B | C | Detail | Status |
|---|---|---|---|---|---|---|---|---|---|
| L1 | 2026-10-23 | strategy | money | Open the AI Consultant to founders? | Open to every Advisor, 10 messages a day, $150 a month safety limit, review at day 30 | Open with today's limits (30 a day, $50) | Keep owner-only; drop it from the pass wording | `BIZ_05` §9 | ruled A (2026-10-23) |
| L2 | 2026-10-23 | strategy | money | Launch-week sign-up email | Resend Pro ($20) for the launch month only | Stay free; under 100 sign-ups a day | | `BIZ_05` §9 | ruled B (2026-10-23) |
| M1 | 2026-10-23 | marketing | MAJOR | When short video starts | Post now as groundwork, 3 a week (Mon, Wed, Fri) from 2026-10-26; batch 01 covers four weeks; links go to the waitlist until the freeze | Hold all posting until the freeze (S1 B) | Post daily from 2026-10-26 | `BIZ_06` §8; `Marketing/scripts/2026-10-23_batch-01_day-masters.md` | queued |
| M2 | 2026-10-23 | marketing | live | Where the bio link and the waitlist live | A plain page at elementum.life/waitlist (one email field, one line on the founding round) as the bio link until the freeze; after it, the bio link goes to the app and the waitlist moves to the email capture after the reveal (F5) | The bio link goes to the app now, with the email capture after the reveal | A waitlist field on the existing landing screen only | `BIZ_06` §8; layout with the design director | queued |
| M3 | 2026-10-23 | marketing | legal | How a waitlist sign-up is confirmed | Double opt-in: one confirmation email, the contact counts only after the click (best for GDPR and deliverability; each costs one of the 100 free emails a day) | Single opt-in with a welcome email | Single opt-in, no email until the founding round | `BIZ_06` §8 | queued |

Open rulings that live on other pages today and should move here at the next ruling day: Domains R1–R17, G1, MN (`ComparativeAnalysis/Evaluations/section-audit-2026-10-21/domains/`), Life Chapters M2–M9 (M1 closed by E1), Your Almanac P4 steps and F1, DES_15 directions. Each owning session moves its own rows.

## 4 · Adopted by sessions and defaults applied

| Date | Session | Code | What was adopted | Gates | Reverse by |
|---|---|---|---|---|---|
| | | | | | |
