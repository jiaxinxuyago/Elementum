# Batch 4 rule candidates, from the batch 3 audits

Status: DRAFT, for the owner's ruling before batch 4 (the Earth core) is dispatched. Nothing here is in the gate or the register yet.

The five batch 3 audits found 106 violations; three kinds recurred on every share and were caught only by a reader. Each is proposed below as a mechanical check or a blocking form, with the question the owner rules.

## 1. The close-frame share, in the gate (B9)

Finding: the most common violation on every share. One close frame ("You pay for ... in ...", "Remember that ...", "Keep in mind that ...") on half the rows of a page, so the page reads as a template.

Proposal: `validate-template.mjs` counts the opening three words of every close sentence across a page's fields; a frame on more than a third of the rows, or two rows closing alike, fails the file (blocking, not a note).

Question: block at a third, or at two rows alike only?

## 2. The catalyst invitation close, as a blocking form (D12)

Finding: every catalyst close on the Fire share was a flat loss ("You pay for every skipped quiet week in sleep"), where D12 wants an invitation with the price inside it ("If you bring that clear head into a calm week, you keep it for the next crisis").

Proposal: the register states the catalyst close as a form: an invitation (an "if", a "when", an imperative with its gain) that carries the price, never a loss alone; the gate flags a catalyst close that opens on "You pay", "You lose", "It costs" as a failure.

Question: a word list in the gate (cheap, narrow) or an auditor's read only (wide, slow)?

## 3. Exemplar scaffolds (E4)

Finding: pair cells and ledgers on two shares written from the card's exemplar as a scaffold, the same sentence skeleton with the nouns swapped.

Proposal: the gate compares each value to the card's exemplar by four-gram overlap, as it already does between value and value_b; a share above a set overlap fails.

Question: the threshold, two shared four-grams or three?
