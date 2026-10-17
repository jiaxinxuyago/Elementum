# The Minor polish round (owner ruling, 2026-10-17)

The final audit's Minor list: one passage or one field each, with an auditor's note. The owner read samples and ruled:
- **"Approve all other fixes besides the four system-level items."**
- **A3 (restatement) is not approved: "A3 original wins … keep the original."** If a finding is partly A3 (for example "A2, A3"), fix only the non-A3 part. Never cut or reword a sentence only because it repeats another.

## What to do for each field in your worklist
- Read the `findings` on the field (criterion, issue, auditor note) and fix **only the flagged sentence or phrase**. At most two sentences change, and the sentence count stays the same.
  - The auditor's note is a guide, not text to paste. Several notes were written before today's rules and use the "X, so Y" frame, which the owner rejected.
- Where `owner_approved` is given, use that text exactly. It is either a full sentence, or a [from, to] phrase swap.
- **The "sooner than" sweep:** where "sooner than" stands in for "rather than" (the owner-approved sample: "you fail your own hard test sooner than pass someone else's" → "you would rather fail your own hard test than pass someone else's easy one"), rewrite that clause. Where it truly means time, keep it and say so in `no_change_reason`.
- If a finding no longer applies to the current text, leave the text as it is and give a short `no_change_reason`.

## The rules that still hold (the gate checks them)
- **Length:** passages are 30 to 45 words and 2 to 3 sentences. Definitions and advice keep their own limits. At most two commas per sentence. No dash, semicolon or colon.
- **Frames:** no new "X, so Y", "ahead of" or "sooner than". No "room" or "verdict".
- **Catalyst closes (M1):** the gift, the price stated flat, or the want, never an instruction or a fix.
- **Friction closes:** a plain cost, the want underneath, or a permission. Never "you can/could".
- **Cost to others:** no charge, no implied deceit, no victim.
- **Persona:** each one stays true to itself. The Sage is drawn to shelter, or shelter comes to it (owner).
- **The reader:** don't assume a child, a partner or a boss.
- Plain B1 to B2 English, British spelling.

## Files
- Input: `worklist-<a|b>.json`, `[{ key, text, findings }]`.
- Output: `out-<a|b>.json`, `[{ "key", "text", "no_change_reason"? }]`, one entry per worklist key.
- Check with `node gate.mjs out-<a|b>.json` until it reports 0 failures, then read every changed text once through.
- Edit no other file. Run no git, wrangler or deploy.

Reply with the counts (changed, unchanged with reasons) and eight before/after sentences.
