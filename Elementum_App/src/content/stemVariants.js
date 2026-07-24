// ═══════════════════════════════════════════════════════════════════════════
// stemVariants.js — Pre-generated archetype variant data (STEM_VARIANTS)
// 150 entries keyed by stem_band_tgPattern (e.g. "庚_concentrated_pure")
//
// Fields per entry (Pipeline A output):
//   yourNature.phrase  — archetype name variant (if different from stem baseline)
//   yourNature.desc    — 2nd person portrait, varies by band × tgPattern
//   gifts[]            — { phrase, desc } × 3 (varies by band × tgPattern)
//   shadows[]          — { phrase, desc } × 3 (varies by band × tgPattern)
//
// Source of truth: archetypeSource.js (stem baseline data)
// Generation guidance: REA_05 §4 (yourNature.desc), REA_05 §2 (gifts/shadows variants)
// Generation pipeline: batchGenerate.js — Pipeline A (offline, quality-checked)
//
// Phase 1 — hand-authored: 庚 yourNature.desc × 15 configs
// Phase 2 — Pipeline A: remaining 135 yourNature.desc + all gifts/shadows variants
// ═══════════════════════════════════════════════════════════════════════════

export const STEM_VARIANTS = {

  // ══════════════════════════════════════════════════════════════════════════
  // 庚 — The Imperial Executioner (Yang Metal · The Blade)
  // Phase 1: yourNature.desc hand-authored × 15 configs
  // Structure: person-first, paradox in S1, mechanism-through-people in S2 (REA_05 §4)
  // Baseline copy: archetypeSource.js → STEM_CARD_DATA["庚"].yourNature.desc
  // ══════════════════════════════════════════════════════════════════════════

  // ── balanced ─────────────────────────────────────────────────────────────

  "庚_balanced_pure": {
    yourNature: {
      desc: `The most honest person in any room, often the most alone in it. Precision arrives before warmth does — people lean on the edge and rarely find what's behind it.`,
    },
  },
  "庚_balanced_rooted": {
    yourNature: {
      desc: `The most credible read in any room, and the one hardest to argue with — the assessment lands with the weight of everything already tested and proven. People trust it structurally. The closeness it keeps is structural, too.`,
    },
  },
  "庚_balanced_flowing": {
    yourNature: {
      desc: `The most generous read in any room, given before anyone has had to ask for it — what is seen gets said, what is assessed gets delivered, and people leave with something useful. The warmth it sends out is real. What rarely comes back with it is warmth in return.`,
    },
  },
  "庚_balanced_forging": {
    yourNature: {
      desc: `The most reliable person in a crisis, occasionally the most exhausting without one. The precision sharpens when there is something worth cutting — people get the full blade when the stakes are real, and something considerably quieter when they are not.`,
    },
  },
  "庚_balanced_tested": {
    yourNature: {
      desc: `The most reliable presence inside any structure, and the one for whom the external standard was already the lower bar — the internal one was higher before the evaluation arrived. People sense the quality of what is being assessed. They also sense, correctly, that they are part of it.`,
    },
  },

  // ── concentrated ─────────────────────────────────────────────────────────

  "庚_concentrated_pure": {
    yourNature: {
      desc: `The fastest read in any room, and the one that finishes before anyone notices it has started — the verdict is already in, already right, by the time the conversation begins. People trust it completely. They also never fully stop feeling like one was passed on them.`,
    },
  },
  "庚_concentrated_rooted": {
    yourNature: {
      desc: `The most authoritative read in any room, and the one that does not move once it is settled — the assessment is backed by everything already lived and proven, and it arrives with that weight. The reliability is total. The distance that comes with it is total, too.`,
    },
  },
  "庚_concentrated_flowing": {
    yourNature: {
      desc: `The most prolific source of clarity in any room, and the one that does not pace itself — assessments flow outward faster than anyone can use them, without waiting for the room to catch up. People find the current and follow. It does not stop to receive them.`,
    },
  },
  "庚_concentrated_forging": {
    yourNature: {
      desc: `The sharpest person in any room when the room is falling apart, and the one most likely to leave marks after — what others produce with effort, this produces in surplus under pressure. The friction is where it belongs. The cost comes proportionally after.`,
    },
  },
  "庚_concentrated_tested": {
    yourNature: {
      desc: `The most formidable person under scrutiny, and the one for whom evaluation is a formality — the internal standard already exceeded the external one before it arrived. What the room sees is the gap between what was required and what was produced. It is always visible.`,
    },
  },

  // ── open ─────────────────────────────────────────────────────────────────

  "庚_open_pure": {
    yourNature: {
      desc: `The clearest read in the right room, and the quietest in the wrong one — the precision is fully there, but it does not lead everywhere. When it arrives it lands cleanly. When it steps back, people feel the difference before they can name it.`,
    },
  },
  "庚_open_rooted": {
    yourNature: {
      desc: `The most reliable read when the right foundations are in place, and the quietest when they are not — what is available when the conditions are there is backed, settled, and clear. People rely on it when it comes. They learn not to expect it at a constant rate.`,
    },
  },
  "庚_open_flowing": {
    yourNature: {
      desc: `The most accessible read in any room, and the one least likely to leave a mark — clarity moves outward easily and people find it useful rather than uncomfortable. What they rarely encounter is the actual edge. It is there. It mostly travels toward useful.`,
    },
  },
  "庚_open_forging": {
    yourNature: {
      desc: `The most surprising person under pressure, and the quietest presence without it — the precision is fully intact, but it waits for something worth cutting. When the stakes are real, what arrives is the full blade. The rest of the time, the room does not see it.`,
    },
  },
  "庚_open_tested": {
    yourNature: {
      desc: `The sharpest person inside any structure, and the most directionless outside one — give this precision something to measure against and it exceeds it; remove the standard and the force disperses. The edge is real. The right conditions make it visible.`,
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 甲乙丙丁戊己辛壬癸 — band + tested variants (Group C)
  // Resolved via the band -> pattern fallback in resolveVariant.js: a chart hits
  // `${stem}_${band}` (concentrated / open) first, else `${stem}_tested`, else the
  // archetypeSource.js baseline (the balanced reading). 2nd person, REA_05 §4 voice.
  // ══════════════════════════════════════════════════════════════════════════

  // ── 甲 The Oak ──
  "甲_concentrated": { yourNature: { desc: `You don't just see where something could go — you're already three moves into building it before the room has agreed there's anything to build. The momentum is undeniable and almost impossible to bank: you start more than you can finish, and the unfinished things pile up behind you faster than you notice.` } },
  "甲_open":         { yourNature: { desc: `You still see where things could go — the vision doesn't dim — but the push that turns seeing into starting comes quieter, and you wait for a reason to move that a stronger version of you wouldn't have needed. The reach is real; it just needs the right ground, or someone's nudge, to leave the gate.` } },
  "甲_tested":       { yourNature: { desc: `You see where something could go, and almost as fast you feel the structure that says which way it's allowed to grow. When the constraint is fair, it's the best thing that happens to you — the reaching finally narrows into one thing that holds. When it isn't, you press against a wall you can't yet name, growing sideways instead of up.` } },

  // ── 乙 The Vine ──
  "乙_concentrated": { yourNature: { desc: `You find the way through so reliably that you keep finding ways long after you've arrived — every surface looks navigable, every route worth taking, and the reading never quite stops. The intelligence is formidable; the risk is motion for its own sake, adapting around obstacles that no longer require it.` } },
  "乙_open":         { yourNature: { desc: `You can still read the room and sense the opening — that perception is intact — but the nerve to commit to the route comes harder, and you wait for the way to be obvious to everyone before you take it. The navigation works; it just needs terrain worth the climb to fully engage.` } },
  "乙_tested":       { yourNature: { desc: `You read the room and feel, in the same moment, the rules you have to move within. A legitimate structure sharpens you — the route you find is the genuine opening, not the workaround that breaks something. An illegitimate one bends you a degree at a time, until you've accommodated your way off your own path without noticing when.` } },

  // ── 丙 The Sun ──
  "丙_concentrated": { yourNature: { desc: `You don't enter a room so much as change its temperature — people lift, relax, believe more is possible, and you couldn't switch it off if you tried. The warmth pours out in every direction at the same cost as focused warmth, so the depletion runs underneath, invisible, while everyone assumes you're inexhaustible.` } },
  "丙_open":         { yourNature: { desc: `The warmth is real and people still feel it near you — but emitting it takes more than it should, and you can be fully present without the room quite catching the light. What's harder to reach isn't the caring; it's the broadcast, the part that used to warm people without you spending anything to do it.` } },
  "丙_tested":       { yourNature: { desc: `Your warmth meets a standard now — you're lighting the room and being measured inside it at once. When the standard is genuine, it gives the warmth somewhere real to land and a reason to be more than pleasant. When it isn't, the light presses against a scrutiny that won't be warmed, and the giving starts costing more than it returns.` } },

  // ── 丁 The Candle ──
  "丁_concentrated": { yourNature: { desc: `When your focus lands, it lands all the way — whatever you're attending is lit to the floor, seen more completely than most people are ever seen. The brighter that beam, the darker everything outside it: more of your life waits in shadow than you realize, and the people there feel the absence sharply.` } },
  "丁_open":         { yourNature: { desc: `You can still attend completely — that depth doesn't vanish — but kindling the beam takes more than it should, and your attention drifts diffuse when you most want it precise. The quality is there in potential; what's harder is the act of fully pointing it.` } },
  "丁_tested":       { yourNature: { desc: `What you illuminate looks back — you examine, and a standard examines you at the same time. A real one sharpens the focus and gives it something worth resolving. A false one tightens the beam defensively, and the rare intimacy of your attention narrows into a kind of guarded scanning.` } },

  // ── 戊 The Mountain ──
  "戊_concentrated": { yourNature: { desc: `You're not just steady — you're immovable, the fixed point a whole group quietly arranges itself around. The same density that makes you unshakeable makes moving genuinely hard: you hold things long past the point of holding, and the weight you never show keeps accumulating where no one thinks to look.` } },
  "戊_open":         { yourNature: { desc: `You still want to be the steady one and the reliability is genuine — but the solidity that used to hold without effort comes thinner, and you feel the ground shifting under people when it should be firm. Being depended on takes work now that used to be simply structural.` } },
  "戊_tested":       { yourNature: { desc: `The ground itself is under test — you're holding the weight and being weighed at once. A legitimate pressure turns load-bearing into real authority and gives your steadiness a direction. An illegitimate one has you holding a position that costs more than it should, because holding is what you're for.` } },

  // ── 己 The Field ──
  "己_concentrated": { yourNature: { desc: `You cultivate everything in reach — sensing what each person needs and supplying it before they ask, in every direction at once. Soil this active absorbs as readily as it feeds: you take on everyone's difficulty along with their potential, and the deficit accumulates for months before it's visible to you.` } },
  "己_open":         { yourNature: { desc: `You still read what people need and the attunement is genuine — but the sustained tending comes harder, and growth that should root around you stays shallow. The care is there; what's thinner is the effortless provision others quietly built their lives on.` } },
  "己_tested":       { yourNature: { desc: `What you're growing is being graded — you tend, and a standard asks whether it's good enough. A fair one turns soft nurturing into real development, care that produces something demonstrably better. An unfair one has you over-tending to prove the care is real, supplying more than the situation ever needed.` } },

  // ── 辛 The Jewel ──
  "辛_concentrated": { yourNature: { desc: `You register quality the way others register temperature, except the dial is turned all the way up — every object, idea, and person measured the instant you meet it, with no relief. Nothing quite passes: the bar sits just above wherever reality has arrived, so the world reads as a near-continuous catalog of what falls short, including you.` } },
  "辛_open":         { yourNature: { desc: `You can still tell genuine excellence from the merely adequate — that perception doesn't leave — but the fine discrimination that used to run on its own comes blunted, and things slip past that you'd normally have caught. The instrument is intact; it's just not fully calibrated.` } },
  "辛_tested":       { yourNature: { desc: `What you're judging judges back — you appraise, and a standard appraises you at the same time. A legitimate benchmark sharpens your discernment into genuine authority and finally gives it a finish line. A false one turns it hypercritical, guarding against a verdict instead of seeking the truth of the thing.` } },

  // ── 壬 The Ocean ──
  "壬_concentrated": { yourNature: { desc: `You process at full flood — every exchange opening into more variables and layers than anyone around you is tracking. Water this high without banks disperses: the thinking ranges so wide it stops landing anywhere usable, and the gap between what you perceive and what you can convey widens until the depth itself becomes isolating.` } },
  "壬_open":         { yourNature: { desc: `You still reach beneath the surface — that capacity doesn't vanish — but the current that carries you down comes weaker, and you work with less of the picture than you know is there. The depth is present; what's harder to access is the full reach of it.` } },
  "壬_tested":       { yourNature: { desc: `The deep is being sounded — you perceive the whole system and are measured inside it at once. A real standard gives the ranging intelligence banks and a target, and the depth becomes genuinely directed. A false one has you withdrawing further into the deep instead of translating, and the distance to the surface only grows.` } },

  // ── 癸 The Rain ──
  "癸_concentrated": { yourNature: { desc: `You perceive everything at once — every mood, every undercurrent, every unspoken thing — without a filter to slow it down. Water this permeable floods: you take in more than you can hold without losing your own shape, until you genuinely can't tell your knowing from what you've absorbed from the room.` } },
  "癸_open":         { yourNature: { desc: `You still feel what's true beneath the surface and the sensitivity is genuine — but the perception that used to arrive unbidden comes muffled, and you catch yourself taking things at face value you'd normally have felt straight through. The knowing is intact; what's harder to reach is its immediacy.` } },
  "癸_tested":       { yourNature: { desc: `What you're sensing senses you — you read the room and are read inside it at once. A legitimate structure gives the diffuse sensitivity something to land on and turns feeling into usable judgment. A false one has you absorbing the scrutiny along with everything else, until the permeability that's your gift becomes a way of carrying a pressure that was never yours.` } },

};
