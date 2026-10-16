# Backlog · the function page's eyebrows: three moves, three names (owner 2026-10-14)

**Status: RULED and BUILT 2026-10-14 (app chrome; no station field changes).**

## The owner's words

> Now the 3 keywords is boxed into a section that lack of a name, think about how to bridge the logic connections using titles or eyebrows from section to section, first is the definition, what shall the second be, in order to lead to the last remedy/advice section

## The chain

The page reads as a diagnosis in three moves: what the function is, how it runs in you, what to do about it.

| Move | Eyebrow | Title line | Content |
|---|---|---|---|
| 1 | THE FUNCTION | "Earth is your Mind." | the definition (v0.7.3 construct) |
| 2 | THE CHARACTER | pole-specific, the state the chart gives: "Running heavy." (friction, abundant), "Running full." (catalyst, abundant), "Running thin.", "Running empty.", "Running steady." (present), "Running over." (dominant, or the core Overfueled), "Running short." (the core Underfueled) | the three metric bars, then the three keywords |
| 3 | THE REMEDY / THE ADVICE | the remedy's first sentence, "Seek Wood, the Action energy." | the advice |

## The three questions, ruled

| Q | Choices | Ruling |
|---|---|---|
| 1. The middle eyebrow | THE CHARACTER (recommended; the station's word: the family defines the function, the god defines the character, REA_16 §6 2026-09-03) · THE SIGNS · THE READING | **THE CHARACTER** |
| 2. A title line under it | a fixed line on both poles, "How it runs in you." (recommended) · a pole-specific line, the state word the chart gives · no line | **Pole-specific line** |
| 3. Bars and chips | one section, bars then chips (recommended) · two sections, THE MEASURE and THE CHARACTER | **One section, bars then chips** |

## What was built

- `Elementum_App/src/components/journey/journeyData.js`: `characterLine(r, condition)`, the state word in the register's own vocabulary (the core runs over or short, REA_16 §1b; the other energies by volume, REA_16 §2c carry poles), handed to the page as `fnReading.characterLine`.
- `Elementum_App/src/components/journey/JourneyStage.jsx`: the eyebrow THE CHARACTER and its title line between the definition and the bars.
- On the golden chart: Earth "Running heavy.", Wood "Running full.", Metal (the core, Overfueled) "Running over.", Water and Fire "Running thin.".

## The UI pass (owner 2026-10-14: "box them apart and imply that each chip is tappable and expandable")

- The bars are a boxed measure panel: a quiet inset (a faint fill and hairline, 12px radius) so the three rows read as one object, the chart's measure. Each row ends on a disclosure chevron that turns when its gloss line is open; the open line hangs on a short left rule.
- The keywords are raised buttons apart from the panel: surface fill, a pole-tinted hairline, a soft shadow and a circled plus glyph at the end of each word, so the row reads as three things to open rather than three labels. The open one fills with its pole tint. A hint line under the row says what the tap does: "Tap a keyword to read it."
- Both are left-aligned to the reading column. Nothing authored changes; the hint line is app chrome.

## Open

- The state words are app chrome under the owner's ruling, not a station field; if the owner wants them authored per energy, they become a station axis with a card.

## 2026-10-16: THE CHARACTER's opening, the state line retired

The owner: "the page only says the condition with Running thin, or Running Full. These are jargons that will fail the user to understand. 1. We need to re-iterate if this energy is a catalyst or a friction, consider if re-introduce catalyst or friction chip here is necessary or not. 2. After the chip, add one line of diagnosis/prescription saying this energy needs to be fueled or channeled/released. This line is the diagnosis and overall manual for this energy, refer to the energy manual and refine this line."

Built: under THE CHARACTER, the pole restated as the glossary pill the catalogue already uses (Catalyst with the up arrow, Friction with the down arrow, the condition pill on the core's own page; a tap opens its definition), run in before one line of diagnosis and prescription composed from the manual's own vocabulary (the catalyst and friction definitions, the Channel and Refill tails), sized to how much of the energy the chart holds:

| Case | Line |
|---|---|
| catalyst, held in full | "Wood is a catalyst for you, and you already hold it in full. Keep it fed: it is where your core's surplus goes to work." |
| catalyst, running short | "Fire is a catalyst for you, and your chart runs short of it. Refill it: take in what feeds it, and the whole system moves easier." |
| friction, carried in plenty | "Earth is a friction for you, and you carry plenty of it: more than your core can spend. Channel it: give the extra a place to go, add none." |
| friction, thin | "... is a friction for you even at this size: your core already carries weight, and more ... adds to it. Ease off it: aim what you have, add none." |
| the core, over | "This is your core, and it runs over: more comes in than it burns. Channel it: aim the surplus, do not store it." |
| the core, short | "This is your core, and it runs short: it burns more than it takes in. Refill it: take in what feeds you." |
| balanced | "... runs balanced in you. Nothing here needs forcing; keep the mix." |

The chip: kept, as the pill rather than a new chip, because the word it restates is tappable to its definition and the catalogue uses the same pill, so the reader meets one mark for one idea. The lines are templated derived vocabulary like the energy page's diagnosis, not an authored corpus; the owner rules them row by row here.

Re-ruled the same hour: "Too long, it reads repetitive against the first paragraph. Try to use visual and design language to deliver this: whether we need to grow this energy or release it? It must echo with the remedy and edge section. Use it or seek it more?" Built: the seven lines retired; the row is the pole pill, a two-word verdict, and a direction mark in the bars' own visual language (one dot on a two-ended track between RELEASE and GROW, tinted by the pole):

| Case | Verdict | Mark |
|---|---|---|
| catalyst, held in full | Use it. (echoes THE EDGE, "How to use Wood") | grow |
| catalyst, running short | Seek it. (two words, so the row never wraps) | grow |
| friction, carried in plenty | Release it. (echoes THE REMEDY, which sends the reader to seek another energy) | release |
| friction, thin | Ease off it. | release |
| the core, over | Channel it. | release |
| the core, short | Refill it. | grow |
| balanced | Keep the mix. | keep (the dot at the middle) |

