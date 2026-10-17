# THE DOMAINS: the owner's rulings

## Round 1 (owner 2026-10-17): "Q1 A … Q15 A, S1 A … S8 A"

Page: https://claude.ai/artifact/Vz38yjKw7uDv3CtkpDfq2r

| Row | Ruling |
|---|---|
| Q1 | A chart-wide hub of all eight domains on Your Reading. The energy page's THE DOMAINS card lists the domains its seats rule. Both open the same chart-wide domain pages. |
| Q2 | The hub is a fourth beat after YOUR ENERGY MAP, with a bridge line ("See where your life is ruled"). |
| Q3 | An EDGE domain tile opens that domain's page directly. The domain sheet retires, and its "$9.99/mo" line with it (D2 in full, S1 closed). |
| Q4 | A domain with no seat keeps a dashed tile. Its page is read from the decades that rule it. |
| Q5 | No birth hour: the Hour Gate shows closed on the life line, with a link to the hour discovery. The closed note shows only on domains an Hour seat could rule. |
| Q6 | A teaching beat at the top of the hub: the claim, three sentences, and the life line with "you · {age}". The ten are called "characters". |
| Q7 | Three labelled steps (How you are · What has already happened · What is coming), then the seats. |
| Q8 | Ages come from the gates and calendar years from the decades. Both live in the labels; the text carries no digits. |
| Q9 | **The domain-only law, the past.** Definite past patterns tied to an age span. Never a single dated event, a place or a named person. This replaces the master prompt's no-biography rule on this surface only. |
| Q10 | **People.** The Day Gate may name "a partner". The Hour Gate names "the people after you", with a range (children, younger relatives, someone you train). |
| Q11 | **Hard news.** Allowed when tied to a decade or a gate, and the same beat says what carries the reader through. Never illness, death, divorce or sums of money. |
| Q12 | Free: the hub, the life line and step 1 on every domain page. Seeker: steps 2 and 3 and the seat readings. |
| Q13 | WHO RUNS IT and the 150 god-noun K2 domain readings leave the page and stay in the station as ore. Each seat card keeps a one-line "About the …". |
| Q14 | The 70 seat readings and deflines are rewritten in the current voice: 60 to 80 words, no "spouse palace", no imperative closes. |
| Q15 | No advice on the domain pages. Advice stays on THE REMEDY. |
| S1–S8 | The sample texts are approved as written. They are the calibration. |

## How a page is composed (domainsResolve.js)

**The lead seat.** The highest-ranked seat (SLOT_RANK) among those whose gate the reader has reached. The Day Gate counts as always reached, because it is the self.

**Step 1.** The lead seat's recognition. If a classical pair (TG_PATTERNS, in priority order) has both sides present and targets this domain, its per-domain line follows, plus the fused line when the pair shares a gate.

**Step 2:**
- the lived beat of each seat whose gate has opened (Hour from 48);
- a Day seat's lived beat as "the pattern so far" while the reader is under 35;
- the last fully past decade whose character rules the domain;
- the gap line when the gate the reader lives in holds no seat in this domain.

**Step 3, in time order:**
- the current decade, when its character rules the domain;
- the ahead beats of the Day seats (under 48) and the Hour seats (under 48);
- the next two decades that rule the domain. The first decade whose character matches one of this domain's seats is the strongest window (helping) or the heaviest window (heavy). The match names the seat in the latest gate.

**Notes:**
- "Your later gates hold no X seat …"
- "Love has no decade of its own …"
- the closed Hour Gate.

**A decade's pole:** helping when its element is a catalyst for the chart, or the core of an Underfueled chart. Heavy otherwise.

## Round 2: the golden template (waiting)

- Page: https://claude.ai/artifact/YSEbBsneiSwky8sC1t9F7Z (source: `round-2/`).
- Content: `ComparativeAnalysis/Prompts/out/handoff/2026-10-17-domains-template/template.json` (120 units, gate 0 failures).
- Gate: `gate.mjs` in the same folder.
