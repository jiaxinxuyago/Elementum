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

## Open

- The state words are app chrome under the owner's ruling, not a station field; if the owner wants them authored per energy, they become a station axis with a card.
