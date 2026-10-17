# Task brief: the Day Master page as the chart's diagnosis

From the owner, 2026-10-17 (their words, lightly joined):

> Make sure the day master (10 stem) reading page are ruled and effectively echo with its five energy functions. The gift and shadow sections, particularly, can be rebranded to fully recap what the energy pages covered without introducing new keywords that each energy pages did not have.
>
> In addition and most importantly, consider how we can turn the day master reading page into a full diagnosis page covering all the catalysts and frictions, energy conditions, and what they means to the day master, rather diving into each traits which could overlap and repeat what the five energy functions already cover. This would be a restructure and rebrand for the day master page, to find a way to initiate the reading and echo in the best way with all the five energies.

## 1. The page today

**Code and content:**
- **Screen:** `Elementum_App/src/components/reading/ReadingDayMasterScreen.jsx` → `ReadingDayMasterCard.jsx`.
- **Sections in order:** the hero, The Sign, Your nature, Gifts & Shadows, and the Birth Chart link.
- **Resolver:** `readingResolve.js` `resolveDayMasterReading(stem, chart, doors, band)` returns `{ nature, gifts, shadows }`.
- **Where the text comes from:** `resolveArchetype` over `content/archetypeSource.js` and `content/resolveVariant.js`.
- **Doors:** `journeyData.js` `poolDoors(model)`. Gifts come through the catalyst doors and shadows through the friction doors (REA_02 §5h).

**Stations:**
- `Reading/Database/templates/by_axis/json/STEM/<stem>.json` (10 files).
- `…/STEM_BAND/<stem>_<band>.json` (30 files: concentrated / balanced / open = Overfueled / Balanced / Underfueled), holding `yourNature_desc` and `self_card`.
- The gift and shadow pools follow the P4 door-tagged design. See `Memory/2026-09-15_p4-quintessence-and-the-door-tagged-pools.md` and the 2026-09-20 rulings.

**Contracts in force:** `Elementum_App/tools/qa-selection-fixtures.mjs` covers B9 (no chip through a closed door), B11 (one band everywhere) and D2/D3. A restructure that changes these needs the owner's ruling and an updated fixture.

## 2. The evidence: on the golden chart the two layers do not echo

庚, Overfueled. Doors: the gifts come through Order (Fire, thin), Action (Wood) and Expression (Water, thin). The shadows come through Body (Metal, the core) and Mind (Earth).

| Door | Day Master page today | The energy page's own keywords |
|---|---|---|
| Order · Fire · catalyst | gift **Crisis performer** | Clear under pressure · Takes charge · Loves high stakes |
| Action · Wood · catalyst | gift **Plays the long game** | Patient builder · Saves first · Spots openings |
| Expression · Water · catalyst | gift **No dressed-up answers** | Giving · Unforced · Original |
| Body · Metal · friction | shadow **Never reconsiders** | Sealed-off · Unteachable · Keeps score |
| Mind · Earth · friction | shadow **Overprepared** | Never quite ready · Hard to reach · Second-guesses |

None of the five Day Master phrases appears on any energy page. A reader meets ten new labels for the same five doors. The energy pages show the golden chart in full: https://claude.ai/artifact/KnkX8upNnWGU9EejZ1CnD5.

## 3. What to deliver (proposal first, then the owner rules)

1. **A diagnosis-page design.** Restructure and rebrand the Day Master page into the chart's overview. It names the core and its condition, then every energy: whether it is a catalyst or a friction, its volume and condition, and what it means for this core. It should lead the reader into the five energy pages and echo them. It should not re-describe traits the energy pages already carry.
   - Propose the section order, the names and the data each section reads. Everything should come from fields the app already computes: `ec.band`, roles, volumes, the doors, the pole per energy, the edge and remedy elements, the function names Body / Mind / Expression / Action / Order.
   - Say which station fields stay, which retire and which are new.
2. **Gifts and shadows rebranded as a recap.** The labels must be the energy pages' own keywords or function names. No new keywords. Show how a recap line reads for a catalyst door and a friction door, and how the page handles Balanced charts, a lone door, and the core itself.
3. **Samples on the golden chart, then on two contrasting charts**: a weak core (Underfueled) and a Balanced chart. Show before and after on phone-shaped artifact pages, with real text and multiple-choice questions for the owner. Rule row by row, never in bulk.
4. **After the owner rules:** write the content for 10 stems × 3 bands where needed. Use the sealed-writer pattern: a handoff folder with a worklist, BRIEF.md and gate.mjs, gated, then landed by the main session. Then run the full pipeline (§1 of the Memory handoff), update the fixtures, push to main, and verify both live sites.

## 4. Things to settle with the owner early

- What stays from today's page: The Sign, the hero/manifesto, the yourNature paragraph (the 30 band variants were ruled in September) and the Share card.
- Where THE EDGE and THE REMEDY elements surface, and whether at all. For example, a one-line "what to seek / what to ease" per energy, pointing to that energy's page.
- How much of the classical diagnosis to name: 用神 / 忌神-style wording, or only the app's catalyst / friction vocabulary. The app teaches the ten-god vocabulary only in THE DOMAINS.
- The tier: the Day Master page is free today. Check `src/infra/pricing.js` before adding depth.

## 5. Constraints carried over

- **Voice:** every voice law in Memory §2 applies to new text.
  - Catalyst lines carry no instructions. Friction lines carry a plain cost, the want, or a permission.
  - No "X, so Y", "room" or "verdict". No assumed partner, child or boss. No chart quantity given as a cause.
  - B1–B2 English, British spelling.
- **Words:** the five function names are Body, Mind, Expression, Action and Order. The family names Core / Root / Voice / Drive / Duty must not return as labels.
- **Branch:** work on `main`. The new session's branch `claude/sweet-fermat-9fgzw9` is not where real edits land.
- **Leave as is:** don't change the dominance wheel. No italic.
