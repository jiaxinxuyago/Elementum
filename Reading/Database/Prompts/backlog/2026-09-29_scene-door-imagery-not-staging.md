# Backlog · the scene door illustrates, it does not stage (owner feedback, 2026-09-29, during the blind read)

**Status: OWNER RULING RECORDED, prompt change pending.** Card affected: `fields/ELEMENT_GOD/ELEMENT_GOD.fn_reading.md` (the three doors). Also touches the harness spec note for scene doors and the STEM pool desc guidance.

## The takeaway, as the owner put it

The scene-door passages have been stretching too far into describing one scene with excess detail ("five o'clock on Tuesday", "at eleven at night, you turn back a page"). Those details are unnecessary and the passages end up far-fetched, a scene acted out rather than a point made. The scene door should be **imagery that illustrates the trait**: pictures, plural, that make the line vivid and picturesque, without staging one actual scene for the reader to act out.

## What it changes

- The current law (REA_16 §2c THE THREE DOORS, owner 2026-09-03; the card: "Scene opens inside a real-life example with objects and clock time … the example is USED, not displayed") asked for one representative situation with objects and a clock time. The clock time and the single staged situation are what the owner now names as the fault.
- Proposed card wording: "Scene: the trait shown through pictures. One or more concrete images from the reader's ordinary life (objects, places, small actions) that illustrate the word, used to make the claim vivid, never a single staged event with a time stamp. No clock times. A picture is an illustration of the mechanism, not a story the reader is asked to have lived."
- The harness spec note for scene doors ("opens inside a representative situation with ordinary objects and a clock time") changes with it; the non-blocking "scene carries an object or a clock time" note is retired.
- The same holds for the STEM pool `desc` ("the reader must SEE an image") and for any card that says "clock time" (the master prompt's "a representative scene with ordinary objects and a clock time is welcome").

## Evidence in the round

Blind and benchmarked passes both produced time-stamped single scenes on most scene doors (Earth Brooding "At eleven at night…", Wood Compounding "At eight in the evening…", Fire Daring "At four in the afternoon…"), because the card and the spec note asked for one. The shipping corpus does it too ("It is Thursday night and Tuesday's conversation is still running…"). The owner's picks during the read favour the versions whose scene is a set of pictures ("Fifty a month since college. A page a day, a call every Friday…") over the staged ones.

## Action items

- [ ] Re-cut the scene-door construct in the fn_reading card and the master prompt's scene sentence; note the change in REA_16 §2c (THE THREE DOORS row) and §6.
- [ ] Update `handoff.mjs` spec notes and `validate-template.mjs` / `lib.mjs` notes for scene doors.
- [ ] Re-run the scene doors of the golden set under the new construct in the next round; compare against this round's.
