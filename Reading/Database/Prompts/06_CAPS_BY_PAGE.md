# 06 · THE CAPS, PAGE BY PAGE (hard limits: minimum and maximum, per field, per surface)

_Prompt file (data). Every word range is a gate, both ends (owner 2026-09-23): a line over its maximum or under its minimum fails before anyone reads it. Word count = whitespace-separated tokens. The caps are the ruled registry budgets (REA_16 §2c) and the card budgets; the surface column says where the field renders in the app. Compiled 2026-09-23._

## The Day Master page (P4)

| Field | Surface | Min | Max | Person and opener |
|---|---|---|---|---|
| `STEM.manifesto` | reveal plate A3, share card, journey J3 (the couplet L1 · L2) | 4 | 14 | L1 impersonal, 2–4 words; L2 "You are the {Element} that …" |
| `STEM.inscription` | not on a live surface this round | 6 | 17 (and ≤85 characters) | "you" within the first three words |
| `STEM.dm_overview` | P4 first paragraph, THE SIGN | 55 | 85 | third person, opens on the archetype name, no "you" |
| `STEM_BAND.yourNature_desc` | P4 second paragraph, THE PERSON (the band variant) | 50 | 75 | opens on "You" |
| `STEM_BAND.self_card.face` | the core element's screen, the band mirror | 1 | 8 | impersonal noun phrase |
| `STEM_BAND.self_card.presence` | same | 5 | 30 | second person allowed |
| `STEM.gifts[].phrase` · `STEM.shadows[].phrase` | P4 chips (one per open door) | 1 | 3 (or an admitted four-word idiom) | the symptom in plain words |
| `STEM.gifts[].dim` · `STEM.shadows[].dim` | selection metadata, unrendered | 1 | 4 | the life-facet angle |
| `STEM.gifts[].desc` · `STEM.shadows[].desc` | P4 under the chip | 1 sentence | 4 sentences, ≤60 words | second person, never opening "You can" (the capacity opener, owner 2026-09-30) |
| `ELEMENT_PAIR.carry.<pole>.clause` | P4 carry card, one row per energy (EASE and SEEK rows) | 4 | 18 | cut from the pair's turn, or the state line |
| `ELEMENT_PAIR.carry.<pole>.remedy` | same | 2 | 12 | a plain directive |

## The energy page (one per energy: Metal, Earth, Wood, Water, Fire on a Metal core)

| Field | Surface | Min | Max | Person and opener |
|---|---|---|---|---|
| `ELEMENT_PAIR.mechanism.classic` | the epigraph above the story | fixed | fixed | a sourced 汉字 quotation, never rewritten |
| `ELEMENT_PAIR.mechanism.base` | the story | 45 | 75 | fully third person, no "you", no function claim, the energy's material anywhere in the field (owner 2026-09-30) |
| `ELEMENT_PAIR.mechanism.catalyst_turn` / `friction_turn` | the state line when the energy runs thin or heavy | 12 | 35 | opens on a plain statement of the state (the element and its volume in ordinary words, no fixed phrase; the reference lead-in "With too much / too little {Element}, …"), then one directive |
| `ELEMENT_PAIR.carry.wide` (clause + remedy) | the state line when a wanted energy is abundant or dominant | 4 + 2 | 18 + 12 | opens with one of the eight wide openers |
| `ELEMENT_PAIR.carry.thin` · `.excess` · `.missing` · `.spared` · `.unrooted` | the state line for those volumes | 4 + 2 | 18 + 12 | a clause and a directive |
| `ELEMENT_PAIR.function.definition_<pole>` | the hero definition | 20 | 55 | "{Element} is your {Function}, and as a catalyst / friction, it is …"; the self pair: "… and running thin / over, it is …"; one word of the energy's chemistry anywhere in the field (owner 2026-09-30) |
| `ELEMENT_GOD.adj_chips[]` (the ledger row word) | the dot card and the ledger row head | 1 | 3 | high-school vocabulary, the persona textured by the element |
| `ELEMENT_GOD.fn_reading` passage | the ledger, one angle per row (the drive · the cost to the reader · the cost to others, rotating; keys drive · cost_self · cost_others) | 35 | 55 | every passage opens on the drive as a flat claim about the reader, states the mechanism flat from the supply, names the either-or in the second person and lands on its angle's cost (owner 2026-10-01); a picture permitted, never required; no clock time, no place, no narration, no chorus, no capacity opener (owner 2026-09-30) |
| `ELEMENT_PAIR.function.advise_<pole>` | the reading's last paragraph | 20 | 60 | second person, imperatives allowed |
| `ELEMENT_PAIR.cta_verdict` | the dot card under the definition line | 8 | 30 | one sentence, "{Element} is your {Function}" explained with one tendency beat, no capacity opener (owner 2026-09-30), reads true on either pole (owner 2026-09-30) |

## Not in this round (the Domains page and the Codex)

`ELEMENT_GOD.k2_overview` 40–70 · `k2_functional` ≤22 · `k2_domain_readings` 18–55 each · `POSITION.reading` 80–115 · `teaser` ≤30 · `domain_readings` 35–60 each · `life_chapter` 35–60 · `relations` 30–55 · `turn_*` ≤30 · `shadow_line` ≤30 · `health_line` ≤30 · `TG_PATTERN.line` ≤40 · `reading` 45–70 · `fused_line` ≤25.

## Iteration log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-23 | Born; minimums made hard | owner 2026-09-23 |
| 2026-09-30 | The capacity opener named on the pool desc, the door and the verdict rows | owner 2026-09-30, Q1a of the v0.6 questionnaire (REA_16 §6) |
| 2026-09-30 | The energy's chemistry word named on the definition and base rows | owner 2026-09-30, Q1c of the v0.6 questionnaire (REA_16 §6) |
| 2026-10-01 | The ledger row re-described: three angles of one tension per row, the keys renamed drive, cost_self, cost_others (path b) | owner 2026-10-01, Q1 of the v0.7 questionnaire (REA_16 §6) |
