# M2: THE FUNCTION definitions per persona (owner ruling, 2026-10-17)

You are rewriting THE FUNCTION definitions for one **core** (the reader's day-master element) of Elementum, a BaZi reading app. The owner's words: **"Go with B for definitions, A for advice. And if the user has 2 faces balanced for one action … treat the blend as an individual … use A's approach for a shared personas definition."** After reading a worked example, they added: **"M2 approved, apply the fix across all the content that shares the issue."**

## How a definition is built now
Each energy page opens with a definition of four sentences (three in some cells). Sentence 1 names the function, sentence 2 says how this element shapes it (the **head**), and the rest gives the pole's state (the **tail**). One text per pole is shared by the two personas who live on that energy, and they are written as opposites. So the shared tail is often true of one persona and false of the other.

## The new build (the app change is the main session's job)
- **One persona, or a clear lead** (≥60%): **head + that persona's own tail.** This is new, and you write 2 per pole per pair cell.
- **Two personas balanced** (the 2+2 page, two keywords from each): **head + one shared tail**, true of the reader as one person who carries both. No "one side of you … the other" line. This is the existing shared tail, rewritten only where it is false for either persona (option A).
- **A Balanced chart** (verdict "Keep the mix."): **catalyst head + a balanced tail** opening "In balance, …". This is new, one per pair cell. A balanced reader must never be told "as a catalyst".
- **Advice and remedy** stay shared (A). Rewrite a sentence only where it is false for one persona, most often the diagnosis line that names the reader's pattern ("You are better at keeping than at starting"). This round does not change the acts themselves (sleep, eat, sit and so on).

## Owner-approved samples (Metal core, Water as Expression, catalyst; head = "Your Expression is the gate where inner work becomes outer fact. Water makes it flow, and what you feel comes out.")
- Today's shared tail (fails both personas): "As a catalyst, your gate stays shut while you get a thing right rather than give it. You keep your kindness and your wit waiting past their moment."
- Artisan tail: "As a catalyst, the flow is thin, so it goes where it is needed most. What little you pour out lands as care."
- Virtuoso tail: "As a catalyst, the flow is thin, so it comes out sharp. You spend your words where they cut through."
- Shared tail for 2+2: "As a catalyst, the flow runs short, so your kindness and wit come out fast and then run dry. You give your best first and little after."
- Balanced tail: "In balance, the gate opens and closes when you choose. Your kindness and wit come out at the moment they are needed."
- An Earth-core Action example (Water): Steward catalyst tail "As a catalyst, the current runs thin, so you make every drop count. What you build grows slowly and stays built." Horizon catalyst tail "As a catalyst, the current runs thin, so you go looking for where it starts. Your gains come from places nobody else has reached yet." Steward friction tail "As a friction, more comes at you than feels safe, so you close the gate on it. Chances pass by while you wait for the water to settle." Horizon friction tail "As a friction, your Action spreads faster than it settles. Each opening pulls you on before the last one pays."

## Rules for the tails
- The tail names the **pole's state for this persona**, how the energy running thin (catalyst) or over (friction) shows up in this person. The keywords below the definition name the behaviour, so the tail sets them up **without repeating their acts or words**. The gate fails a tail that shares a word stem with its own keywords on that pole.
- **Catalyst** = the energy runs short. Name it as short supply showing up in this persona's way, never as the opposite habit of a keyword. The verdict above says "Grow it." **Friction** = the energy overruns, and the verdict says "Release it." Name what the overrun costs, plainly, with the reader's own need as the cause. No charge to others, no fate.
- Opener: "As a catalyst, …" / "As a friction, …". In a self-pair cell (core = energy, `self_pair: true`): "Running thin, …" / "Running over, …". Balanced: "In balance, …".
- 1 or 2 sentences. Head + tail = 30 to 50 words and 3 to 4 sentences. At most two commas per sentence. No dash, semicolon or colon.
- No instruction anywhere in a definition. No "you can/could" close. No "you do best". No reminder phrase as the close (remember, notice, forget, keep in mind…).
- The persona is the same person on every element. **The Sage shelters others** (owner ruling M5). Its need to be sheltered may only appear as a cause.
- Plain B1 to B2 English, everyday words, British spelling. No italics, Chinese, astrology terms, or chart arithmetic as the cause ("more Water than your core uses").
- The two personas' tails on one pole must not be identical. They may share an opening clause, as the samples do.

## Rules for the shared tails and the advice (A)
- **Shared tail (2+2):** keep it if it is true of the reader for all six keywords of both personas on that pole. Otherwise rewrite it. Name the need both share, never one persona's habit.
- **Advice and remedy:** keep unless a sentence is false for one persona or repeats a keyword passage. Then rewrite only what is needed, within 30 to 70 words and 3 to 7 sentences.
  - On the friction remedy, the first sentence ("Seek X, the/your own F energy.") stays exactly as it is.
  - Don't add sleep acts. Instruction steps stay instructions, since advice is where the app prescribes.
- `audit_notes` lists the auditors' findings on these pair fields, with their proposals. Use them. They are evidence, not text to paste.

## Your files
- Input: `worklist-<core>.json` in this folder. Each of the five pair cells gives the function, the catalyst and friction heads and current tails, the advice and remedy, the two personas with their catalyst and friction keywords (word + drive passage), and audit notes.
- Output: `out-<core>.json` in this folder, an array with one entry per pair cell:
```json
{ "pair_cell": "土_水",
  "tails": { "水_偏财": { "catalyst": "As a catalyst, …", "friction": "As a friction, …" },
             "水_正财": { "catalyst": "…", "friction": "…" } },
  "shared": { "catalyst": { "decision": "keep" | "rewrite", "tail": "<only if rewrite>" },
              "friction": { "decision": "keep" | "rewrite", "tail": "…" } },
  "balanced_tail": "In balance, …",
  "advise_catalyst": { "decision": "keep" | "rewrite", "text": "<full advice, only if rewrite>" },
  "advise_friction": { "decision": "keep" | "rewrite", "text": "<full remedy, only if rewrite>" } }
```
- Check with `node gate.mjs out-<core>.json` from this folder, and iterate until 0 failures. The gate checks form, not truth. Read each tail against all of that persona's keywords yourself.
- Don't edit any other file. Don't run git, wrangler or any deploy. The main session lands the work.

When the gate passes, reply with: the shared tails and advice texts you rewrote (cell and field), and for one pair cell, all five definitions as a reader would see them (head + tail).
