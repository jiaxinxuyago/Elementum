# THE DOMAINS, domain first: the domain-only prediction law (owner 2026-10-17)

**Status:** RULED. The owner answered "Q1 A … Q15 A, S1 A … S8 A" on https://claude.ai/artifact/Vz38yjKw7uDv3CtkpDfq2r.
- Full record: `ComparativeAnalysis/Handoffs/2026-10-17-domains/03_RULINGS.md`.
- Gate: `ComparativeAnalysis/Prompts/out/handoff/2026-10-17-domains-template/gate.mjs`.

## The law (applies to THE DOMAINS units only; the master prompt's other surfaces are unchanged)

The domain reading climbs three steps: it knows me, how did it know that, is that really going to happen.

**The past.** Definite past patterns, each tied to its gate's age span (Year to 15, Month 16 to 34, Day 35 to 47, Hour 48 on).
- Never a single dated event, a place or a named person.
- The master prompt's no-biography rule is lifted on this surface.

**The future.** Trajectories with ages ("from your mid-thirties", "your late forties") and decades.
- Calendar years and digits come only from the labels the engine prints.
- No may, might, likely or perhaps.

**People.** The Day Gate may name a partner. The Hour Gate names "the people after you", with a range (children, younger relatives, someone you train). Year Gate seats may speak of "someone in your first home" or an older relative.

**Hard news.** Allowed when tied to a gate or a decade, and the beat names what carries the reader through. Never illness, death, divorce, bankruptcy or sums of money. This lifts BIZ_04's "predicts an outcome" test for this surface.

**No advice.** No imperative and no counsel line (Q15).

**The rest of the master prompt still holds:**
- the reader is the subject, and the last sentence is the reader's;
- periods and commas only, at most two commas a sentence;
- no colon outside a defline;
- the ban lists;
- no "ahead of" and no ", so".

**Chart invariance.** A seat's text is shared by every chart that holds that seat, so it never leans on another seat.

## The units

| Unit | Key | Budget |
|---|---|---|
| headline | POSITION `domain_climb.<Domain>.headline` | 3–12 words, one sentence |
| recognition | `…recognition` | 30–65 words, 2–3 sentences |
| lived | `…lived` | 22–50 words, 2 sentences |
| ahead (Day and Hour seats only) | `…ahead` | 20–55 words, 2 sentences |
| decade line | GOD `decade_lines.<Domain>.<helping\|heavy>.<lived\|ahead>` | 18–45 words |
| gap | TEMPLATED `domain_gaps.<Domain>.<month\|day\|hour>` | 14–32 words, 1 sentence |
| pair line | TG_PATTERN `domain_lines.<Domain>` + `fused_line` | 14–32 words, 1 sentence |
| no seat | TEMPLATED `domain_unruled.<Domain>` | 20–45 words |
| seat defline / reading (rewrite) | POSITION `defline` / `reading` | ≤25 / 55–85 words |
