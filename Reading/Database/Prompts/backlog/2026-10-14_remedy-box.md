# Backlog · the remedy box: the advice in a tinted box with the energy's glyph (owner 2026-10-14)

**Status: RULED and BUILT 2026-10-14 (app chrome; no station field changes).**

## The owner's words

> The remedy should show its remedy energy icon as well and show it in a highlighted tip box, what do you think from a design perspective

## The design, as agreed

- The advice sits in a tinted box, a different kind of box from the grey measure panel above it: grey reads as data, tinted reads as prescription. The tint is the energy's own, as on the wheel, at a low alpha with a left accent rule.
- On the friction pole the box wears the remedy energy's tint and glyph (the element mark the reader knows from the wheel and the hero card, not a function glyph). The "Seek" sentence, the first sentence of the advice by rule since v0.7.5, is the box's title line, split off by the app; the life advice follows as the body. A tap on the box opens that energy's page, with a chevron as the affordance: the prescription is a door to the energy it prescribes.
- On the catalyst pole, ruled by the owner from three choices (same box with the page's own glyph · plain advice, no box · box with no glyph): **the same box, the page's own element glyph and tint, a name line in place of the title ("Water, the Expression energy"), not tappable.** Every function page shows the same shape; the eyebrow and the colour tell the pole.

## What was built

- `Elementum_App/src/components/journey/journeyData.js`: `remedyOf(advise)` reads the energy to seek from the advice's opening sentence ("Seek Wood, the Action energy.") and splits the beat from the rest; `fnReading.remedy` on the friction pole. A friction advice that does not open on "Seek <Element>," renders as a plain box with the page's own element.
- `JourneyStage.jsx`: the remedy box (`el-remedybox`, `pv-<element>` for the tint), the head row with the ring and glyph, the title or name line, the chevron, the body; a button on the friction pole that calls `goElement(remedyEl)`.
- `journey.css`: the box, the ring, the title and name lines, the chevron, the pressed state.
- Verified on the golden chart: a tap on Earth's remedy box opens the Wood energy page.

## Open

- None on the construct. If an advice ever opens on a different prescription shape, the parser's pattern follows the card.

## 2026-10-16: the title echoes THE CHARACTER's verb

The owner: "think of a way to change the title of each remedy to echo with the action verb, for example 'Seek Fire to channel the Metal energy', or 'Seek fire to channel your body', find the best fit for this and make sure this last section has a tight relationship and logic flow with the character."

Built: the title is composed from the character's verdict and the remedy's sought energy, `Seek <Energy> to <verb> <this energy>.`: "Seek Wood to release Earth." under "Release it.", "Seek Fire to channel Metal." under "Channel it.", "Seek ... to ease off ..." under "Ease off it.". The energy's name was chosen over the function ("Seek Fire to channel your Body" reads as a bodily instruction, and the function is already the page's first line). The sought energy's function, which the old title carried ("Seek Fire, the Order energy."), rides beneath the title as the small line ("FIRE, THE ORDER ENERGY", "your own" appended where the remedy is the core itself). The station's `advise_friction` keeps its "Seek X, the F energy." opening as the parse anchor; nothing in the station changed. The flow of the page's last two sections is now: the verdict says the verb, the direction mark shows it, the remedy title repeats the verb with the energy to seek, the body says how.

