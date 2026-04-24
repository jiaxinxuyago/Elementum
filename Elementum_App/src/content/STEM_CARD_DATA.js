// ═══════════════════════════════════════════════════════════════════════════
// STEM_CARD_DATA.js — Pre-generated archetype variant data
// 150 entries keyed by stem_band_tgPattern (e.g. "庚_concentrated_pure")
//
// Fields per entry (Pipeline A output):
//   yourNature.phrase  — archetype name variant (if different from stem baseline)
//   yourNature.desc    — 2nd person portrait, varies by band × tgPattern
//   gifts[]            — { phrase, desc } × 3 (varies by band × tgPattern)
//   shadows[]          — { phrase, desc } × 3 (varies by band × tgPattern)
//
// Source of truth: archetypeSource.js (stem baseline data)
// Generation guidance: DOC7 §4 (yourNature.desc), DOC7 §2 (gifts/shadows variants)
// Generation pipeline: batchGenerate.js — Pipeline A (offline, quality-checked)
//
// Phase 1 — hand-authored: 庚 yourNature.desc × 15 configs
// Phase 2 — Pipeline A: remaining 135 yourNature.desc + all gifts/shadows variants
// ═══════════════════════════════════════════════════════════════════════════

export const STEM_CARD_DATA = {

  // ══════════════════════════════════════════════════════════════════════════
  // 庚 — The Imperial Executioner (Yang Metal · The Blade)
  // Phase 1: yourNature.desc hand-authored × 15 configs
  // Structure: person-first, paradox in S1, mechanism-through-people in S2 (DOC7 §4)
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
  // 甲乙丙丁戊己辛壬癸 — [TODO: Pipeline A generation]
  // Use DOC7 §4 generation prompt template. Reference 庚 entries above for
  // structure and tone. Priority: concentrated first (most divergent), then open.
  // ══════════════════════════════════════════════════════════════════════════

};
            