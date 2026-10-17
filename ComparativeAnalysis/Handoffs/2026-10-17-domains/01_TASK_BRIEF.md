# Task brief: THE DOMAINS, domain first, then the ten-god positions

From the owner, 2026-10-17 (their words):

> Now we need to start a new session to kick off the writing for the most important next section: Domains. Currently, we have this section listed with each ten-god positioning. However, we should reveal the domains first and after the user click into each domain, we analyze the domain with each ten-gods' positioning.
>
> 1. Fix the user flow starting from domain and then dive into the positioning reading
> 2. Think about how to introduce the ten-god positioning as concept and lead into the domain reading
> 3. Polish and finalize the domain reading
>    1. The language and writing style should still follow the Pattern writing style and our systematic prompt
>    2. *** VERY IMPORTANT: Domain reading is more definitive and predictive about the user's behavior pattern, past and future life events, and implies certain life path and trajectory among all the ruling domains. *** From a reader's perspective and experience, This is the first section our reading content should elevate from resonating with a person, to giving the reader new content about their future and the past. It goes from 'Hmm it really knows me', to 'Wow how did it know that? it is accutrate!' and then to 'Wow, is that really going to happen to me?' Curate the content following this user experience journey when writing and designing the content

## 1. What exists today

**The flow.** Each energy's page has THE DOMAINS card. It opens the `elsec` sub-screen with `elSec === 'dom'` in `Elementum_App/src/components/journey/JourneyStage.jsx`. That screen leads with that energy's **seats**, each a position such as "The Steward at the Year Gate". Each seat holds the canonical domains it rules. The WHO RUNS IT god layer comes after them.
- So today the flow is **energy → seat (ten-god position) → domain**. The owner wants **domain → the seats that rule it → their reading**.
- THE EDGE's three domain tiles on catalyst pages are already doors into THE DOMAINS. They land on the seat whose reading carries the word: the honest landing, D2 in RULINGS.md. The owner's ruling was that the full fix comes with this work (DOM-1).

**The eight canonical domains** (REA_02 §5e): Family, Career, Growth, Social, Wealth, Mind, Health, Love. Each god's three ruling domains are fixed in `k2.js` `GOD_RULING_DOMAINS`. They were derived from the seats; see `Reading/Database/Prompts/backlog/2026-10-15_god-ruling-domains.md`.

**The seat corpus.** The POSITION axis has 70 cells (10 gods × 7 slots) and is locked. Each holds:
- `term`, `term_zh`, `gate`, `slot_zh`, `slot_kind`, `domains`;
- `defline`, `teaser` (one predictive beat, ≤30 words), `reading` (80–115 words);
- `domain_readings{<domain>: …}`, `life_chapter`, `relations`, `turn_catalyst`, `turn_friction`, `shadow_line`, `health_line`.

Its locations:
- **Station:** `Reading/Database/templates/by_axis/json/POSITION/<god>_<slot>.json`.
- **App code:** `src/content/positions.js` (or its successor). Resolver: `src/components/reading/positionsResolve.js` `resolvePositions(chart, hourUnknown)`, which hides uncertain hour seats.
- **History:** PM_02 POS-T, POS-D and LADDER; REA_04 §9 (the classical palace × god method: the interpretive stack, stem vs branch, the modulation layers, the teaser formula, the full-reading expansion map).

**Older layers that DOM-1 must rule on:**
- **The WHO RUNS IT layer:** god-flavoured chips from `GOD_DOMAINS` ("Peers, Independence, Self-reliance").
- **150 old K2 domain readings:** `K2_CELLS[*].domain_readings`, keyed by those nouns, in an older voice, Seeker-gated. For example, the 火_七杀 station still says "Peacetime makes you dangerous to furniture".
- **Your options:** re-key them to the canonical domains, retire them in favour of the seat readings, or rebuild them. Nothing is retired until the owner rules. Backlog entry: `Operations/Project_Management/PM_02_Pending_Tasks.md` DOM-1.

**The tier.** THE DOMAINS detail is the Seeker flagship (`src/infra/pricing.js`):
- god intros, chips, seat names and deflines are free;
- domain readings and full position readings are gated.

DOM-1 calls this "a new reading section to a new pricing tier". S1, the "$9.99/mo" price on the free domain sheet, was left until this work. Not approved earlier, and may be raised again here: the Virtuoso's domain "Mind" → "Growth".

## 2. The golden chart, read domain first

1995-04-29 18:00 Beijing, 庚 Overfueled. Its seven seats, from `resolvePositions`:

| Seat | Domains it rules |
|---|---|
| The Steward at the Year Gate | Wealth, Family |
| The Artisan inside the Year Gate | Family, Health |
| The Twin at the Month Gate | Career, Social |
| The Alchemist inside the Month Gate | Mind, Growth, Career |
| The Horizon inside the Day Gate | Love, Social, Wealth |
| The Steward at the Hour Gate | Wealth, Family |
| The Rival inside the Hour Gate | Family, Wealth |

Turned around, each domain gathers several seats:
- **Wealth:** four seats (Steward Y, Horizon D, Steward H, Rival H).
- **Family:** four seats (Steward Y, Artisan Y, Steward H, Rival H).
- **Career:** two (Twin M, Alchemist M). **Social:** two (Twin M, Horizon D).
- **Mind, Growth, Health and Love:** one each.

The gates also carry time:
- **Year Gate:** early life and the family of origin.
- **Month Gate:** youth, career and parents.
- **Day Gate:** the self and the partner.
- **Hour Gate:** later life and children.

So a domain read across its seats already gives a past-to-future arc. Wealth here runs from the Year Steward (early, careful, close to home) to the Hour Steward and the Hour Rival (later life: provided for, but shared or contested). This is the raw material for the "how did it know / will that happen" reading.

## 3. What to deliver (design and samples first, then the owner rules)

1. **The flow.** The domains come first, then the seats inside each domain.
   - Decide where the domains surface:
     - per energy (the domains this energy's seats rule);
     - as one chart-level hub of the eight domains;
     - or both.
   - Decide how THE EDGE's domain tiles and the domain sheet land, so D2 gets its full fix.
   - Propose screens with real golden-chart data. Use phone-shaped claude.ai artifact pages: before and after, a recommendation, multiple-choice questions.
2. **Introducing the ten-god positions.** How the reader first meets "a god in a gate" as a concept, without jargon, and how it leads into the domain reading. The app first teaches the ten-god vocabulary in THE DOMAINS, so this is that moment. Use REA_06, the concept ladder.
3. **The domain reading.**
   - **The ladder.** Each domain reading moves through three stages:
     1. **Recognition** ("it knows me"): the behaviour pattern in this domain.
     2. **The past** ("how did it know that?"): definite things that have likely already happened, drawn from the gates' time (Year, then Month, Day, Hour) and the gods there.
     3. **The future** ("is that really going to happen?"): the trajectory and the likely turns ahead.
   - **Where it comes from.** Every claim stands on chart logic. Use REA_04 §9's palace × god method, plus the modulation layers (stem vs branch, the turns from catalyst or friction, the chart's band).
   - **The bar.** Be definitive enough to land as specific, and honest enough to stay a tendency: no fatalism, no medical or legal claims. BIZ_04's friction framing still holds for the hard news.
   - **The style.** Write in the Pattern voice (REA_16), using the systematic prompt (REA_17 and `Reading/Database/Prompts/`).
   - **What the existing corpus holds.** The 70-cell corpus already has `domain_readings`, `life_chapter`, `relations`, `turn_*`, `shadow_line` and `health_line`. Decide what is kept, rewritten or newly written. The voice laws now in force (Memory §2) apply to new text.
4. **Samples on the golden chart, then two contrasting charts.** For example a weak core and a chart whose hour is unknown, where the hour seats are hidden. Show before and after. The owner rules row by row, never in bulk.
5. **After the owner rules:** write the corpus with the sealed-writer pattern (a handoff folder with a worklist, BRIEF.md and gate.mjs; gated, then landed by the main session). Audit it with the audit kit (`ComparativeAnalysis/Prompts/audit/`): add a "domains" surface to `pages.mjs`. Then run the full pipeline (Memory §1), update the fixtures, push to main, and verify both live sites.

## 4. Settle these with the owner early

- **Where the domains surface:** a hub of all eight, per energy, or both. And what a reader whose chart rules no seat in a domain sees there. A reader may have no Love seat, or a hidden hour.
- **The tier and the price:** what is free and what is Seeker or the new tier (S1). Check `src/infra/pricing.js`.
- **How predictive to be:** in years and ages (from the gates, and later from the 大运 luck pillars, which REA_04 §9.5 deferred), or in life stages only.
- **The old K2 domain readings:** rule on the 150 god-noun readings and the WHO RUNS IT chips.

## 5. Constraints carried over

- Memory §1 laws: the station is the truth; edits land on `main`; never run wrangler or deploy. Don't change the dominance wheel. No italic. The golden chart is the reference.
- Memory §2 voice laws, for new text.
- THE EDGE's domain words are fixed per god (`GOD_RULING_DOMAINS`). The fixtures check them.
- The Day Master diagnosis session (session_01RJRm3y3yvdzEnvZoX5yTx7) is restructuring the Day Master page at the same time. If THE DOMAINS needs a hook from the Day Master page, ask the owner how they should meet.
