# The reminder phrase is one close pattern (owner 2026-10-16)

**Ruled:** "Go with your recommendations for both issues", on the read page `Reminder Closes and Remedy Lines` (claude.ai/artifact/37g4wnYQwSzaJoEPFc6mFa).

## The question

B9 says the close frame varies across a page and no frame closes more than a third of it. The batch 2 to 5 audits counted each wording as its own frame, so "Remember that", "Keep in mind that", "Do not forget that" and "It is worth remembering that" were four frames, and every page passed. On the live app a reader tapping through a friction page's keywords often met the same move on every sheet (the 甲 chart's Water page: "Remember that …", "Never forget that …", "It is worth remembering that …").

Measured on the live text before the ruling: 238 of 450 friction closes carry the phrase; counted as one pattern, 37 of 50 friction ledgers carry it on more than three of nine closes; 6 of the 17 friction pages on the preset charts end every keyword on it. Writers had begun dodging the wording count ("You are keeping a score, remember, that …"; "Tell yourself plainly that …").

## The ruling

- The reminder phrase is one close pattern on the friction pole, whatever its wording or its place in the last sentence: remember (any form), keep or bear in mind, keep sight of, do not forget, never forget, notice that, know that, you (already) know, worth noticing or knowing, remind yourself, hold on to the fact, tell yourself, take it as given, spare a thought, be honest with yourself; the mid-sentence form ("…, remember, …") and the tail ("…, and that is worth remembering") count.
- At most three of a ledger page's nine primary closes carry it; the others carry the reminder in the content, as the 壬 chart's Earth page does ("You refuse the rest that no one else can take for you.").
- The gate blocks a fourth (`ComparativeAnalysis/Prompts/validate-template.mjs`, `REMINDER_FAMILY`, v0.7.6). The second candidates (value_b) are not rendered and are not counted.

## Rejected

- Keep counting by wording (no change; the repetition stays on the page).
- Ban the phrase outright (the largest re-cut, nearly half of all friction closes, and it removes a move the ruled exemplars use).

## Applied

- The gate (`validate-template.mjs`, v0.7.6) blocks a fourth reminder close on a friction ledger, and a second one among the five passages the app shows (ledger[0], [2], [3], [4], [8]: the lead god's rows at their rotated angles, and the minority god's row 0 cost_others and row 1 drive). The shown-page limit follows from the ruling's purpose, the page the reader taps through, and was added once the writers found files that passed the count but showed the phrase twice.
- The phrase family was widened twice during the re-cut to the near-forms the writers found ("Mind that", "Hold onto the thought", "Keep it in view", "Take note", "Keep this with you", "lose sight of", any form of notice or forget).
- Five sealed Opus writers, one per element, re-cut 169 closes in 46 of the 50 friction ledgers, last sentences only, from the live station text (`ComparativeAnalysis/Prompts/out/handoff/2026-10-16-reminder-closes/`); two unshown second candidates on 金_劫财 and 金_比肩 were cleared of older faults. 50 of 50 pass; adopted with provenance (`adoption-2026-10-16.json` there), transcribed into k2.js, twins rebuilt, checks green.
- Left for a later read: a few four-word runs the writers could not touch (in sentences one and two, or in second candidates), listed in their reports.
