// ===================================================================
// ELEMENTUM · the merged "Your reading" (owner 2026-10-18 →)
// ===================================================================
// The station fields opened for the merged journey (owner 2026-10-18:
// "map all fields"), transcribed by hand from
// Reading/Database/templates/by_axis/json/ (the station is the editing
// surface; export-reading-templates --check keeps the two in sync).
// Status per field lives in the station's field_status: the relation labels
// are LOCKED (2026-10-20); the rest are DRAFTS from the golden chart, ruled
// field by field later. Only the golden chart's cells are written; every
// other stem and pair is null and the app falls back (see buildMergedModel).
// ===================================================================

// STEM.who — the first reading's card 1, after "You are {archetype}."
export const STEM_WHO = {
  庚: 'You are the Blade, the Metal that has already been through fire. You are kept plain and kept sharp, and you come out only for the true thing.',
};

// CONDITION.run_line / run_short / run_headline
export const RUN_LINES = {
  Overfueled: { line: 'Your {Core} takes in more than it spends.', short: 'Takes in more than it spends', headline: 'You run Overfueled: your {Core} takes in more than it spends.' },
  Underfueled: { line: 'Your {Core} spends more than it takes in.', short: 'Spends more than it takes in', headline: 'You run Underfueled: your {Core} spends more than it takes in.' },
  Balanced: { line: 'Your {Core} takes in about what it spends.', short: 'Takes in about what it spends', headline: 'You run Balanced: your {Core} takes in about what it spends.' },
};

// ELEMENT_PAIR.head / story (yang stems; the _yin overrides are unwritten)
export const PAIR_HEAD = {
  金_土: 'Earth feeds {the archetype}',
  金_金: 'Metal strengthens {the archetype}',
  金_火: 'Fire forges {the archetype}',
  金_木: 'Wood is shaped by {the archetype}',
  金_水: 'Water draws from {the archetype}',
};
export const PAIR_STORY = {
  金_土: 'The Blade begins as ore inside the hill, where damp earth feeds it slowly until it is ready to be struck.',
  金_金: 'The Blade sharpens against other steel, and each edge grinds the next to a finer line.',
  金_火: 'The Blade is laid in the forge, where heat softens it just enough to be hammered into its shape.',
  金_木: 'The Blade meets the timber, and every log it splits gives its edge something real to do.',
  金_水: 'The Blade cools at dawn, and dew gathers on its edge and runs off into the ground.',
};

// TEMPLATED/tpl_now_line — {fn_clause}, and {volume_clause}. (core: whole)
export const NOW_LINE = {
  fn_clause: {
    Overfueled: { mind: 'It adds to a core that is already full', order: 'It gives your surplus a shape and a use', action: 'It puts your surplus to work', expression: 'It drains off your surplus' },
    Underfueled: { mind: null, order: null, action: null, expression: null },
    Balanced: { mind: null, order: null, action: null, expression: null },
  },
  core: { Overfueled: 'A full core needs outlets, and this only adds more of the same weight.', Underfueled: null, Balanced: null },
  volume_clause: { absent: null, thin: 'you have very little of it', present: null, abundant: 'you have plenty of it', dominant: null },
};

// TEMPLATED/tpl_presence_frames (draft_pattern, draft_clauses)
export const PRESENCE_LINE = {
  pattern: 'You have {n}% of {El} energy.',
  clauses: { dominant: null, present: null, scarce: null, absent: 'You have no {El} energy.' },
};

// TEMPLATED/tpl_rx_ribbon (draft_pattern, draft_clauses)
export const RX_RIBBON = {
  pattern: 'Release {ease}. Grow {seek}.',
  clauses: { balanced: 'Keep all five as they are.', start: 'Start with {El}, your {Function}.' },
};

// TEMPLATED/tpl_cycle_line.relation_labels — LOCKED 2026-10-20, read from
// the reader's core; the wheel never says "tames".
export const RELATION_LABELS = {
  own: 'more of you', feeds: 'feeds you', tames: 'shapes you', you_feed: 'you feed it', you_tame: 'you shape it',
};

// TEMPLATED/tpl_type — the Elementum Type (owner 2026-10-27, M1–M6 A): the
// archetype plus a plain mode, "The Blade · Mind mode", on the share card and
// the album hero. The mode is the function the chart holds most of; its phrase
// reads off the locked wheel words, keyed like RELATION_LABELS. The needs
// clause follows the needed energy's volume. All ruled 2026-10-27 (the needs
// clauses ×7, and "Your chart is heaviest in": the mode is the largest share,
// not always a majority).
export const TYPE_LINE = {
  name: '{Archetype} · {Fn} mode',
  pattern: '{Fn} mode. Your chart is heaviest in {mode}, {needs}',
  mode: { own: 'more of you', feeds: 'what feeds you', tames: 'what shapes you', you_feed: 'what you feed', you_tame: 'what you shape' },
  needs: {
    absent: 'and it holds none of the {El} you need.',
    thin: 'and it holds little of the {El} you need.',
    present: 'and it could use more of the {El} you need.',
    abundant: 'and the {El} you need is already there to use.',
    dominant: 'and the {El} you need is already there to use.',
    same: 'and that is the {El} you need.',
    balanced: 'and your five energies stay close to even.',
  },
  // the album's Your circle tile (K4 A, 2026-10-27); balanced is a DRAFT, to rule
  circle: { head: '{Fuel} carry the {El} you need', balanced: '{Bond} is your classical match', cta: 'Who completes your chart?' },
};

// TEMPLATED/tpl_codex_tests — needs chart.dayMaster.strengthTests
export const CODEX_TESTS = {
  score: 'You score {score} of 7. {reason} {Condition} means your core {run}.',
  reason: {
    season_and_root: 'Your season and your root both feed your {Core}, and they are the two heaviest tests.',
    neither: 'Neither your season nor your root feeds your {Core}, and they are the two heaviest tests.',
    season_only: null, root_only: null,
  },
  season: { pass: 'You were born in {a} {MonthEl} month, and {MonthEl} feeds {Core}.', pass_same: null, fail: 'You were born in {a} {MonthEl} month, and {MonthEl} spends {Core}.' },
  root: { pass: '{Core} sits in the lower half of your chart and holds you up.', fail: 'No {Core} sits in the lower half of your chart to hold you up.' },
  allies: { pass: '{N} of your three other signs back {Core}.', fail: '{N} of your three other signs backs {Core}. It takes two.' },
};
