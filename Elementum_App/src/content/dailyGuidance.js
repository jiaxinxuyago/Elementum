// ===================================================================
// ELEMENTUM · dailyGuidance.js
// ===================================================================
// Deterministic daily-guidance generator. DES_04 §10 specifies a
// `getDailyGuidance(chart, todayElement)` that personalizes the day's
// message to the user's Day Master. The Free tier uses pre-authored
// templates per `DM × day element`; the Pro tier streams from Claude.
//
// We don't have the ~50 pre-authored templates or an LLM wired in, so
// this module derives a personalized reading from the relationship
// between today's stem and the Day Master — which the calculator
// already encodes as a Ten God family on `chart.currentFlowDay.stemTenGod`.
//
// The five relationships (五行 generating/controlling cycle, as seen
// from the Day Master's perspective):
//   self      (比肩/劫财) — same element · companion / competition
//   output    (食神/伤官) — DM generates it · expression / creation
//   wealth    (正财/偏财) — DM controls it · action / acquisition
//   officer   (正官/七杀) — it controls DM · pressure / authority
//   resource  (正印/偏印) — it generates DM · support / nourishment
//
// Each relationship carries a tone, a 2–3 sentence narrative (templated
// with the element names so it reads personalized), and DO / AVOID lists.
// This makes the Today screen a live projection of the same dynamics the
// reading layer (§11) already established — no LLM required.
// ===================================================================

// Map a Ten God family (from calculator getTenGod, calculator.js:38–43)
// → guidance relationship. The calculator's family strings are:
//   self · output · seal (resource) · wealth · officer · none
const FAMILY_TO_RELATION = {
  self:    'self',
  output:  'output',
  seal:    'resource',   // 正印/偏印 — the element that generates the DM
  wealth:  'wealth',
  officer: 'officer',
  none:    'self',       // branch-only fallback; stems never return 'none'
};

const RELATIONS = {
  self: {
    label: 'A day that mirrors you',
    tone: 'companion',
    narrative: (dm, today) =>
      `Today carries ${today} energy — the same current that runs through you. ` +
      `Your ${dm} nature isn't pressed or pulled; it's reflected. The day asks little ` +
      `of you that you don't already know how to give, which makes it a good one for ` +
      `acting on your own terms rather than reacting to someone else's.`,
    doThis: [
      'Act on your own initiative — the day backs your instinct',
      'Spend time with peers who genuinely match your level',
      'Reaffirm a standard you hold, without apology',
    ],
    avoid: [
      'Competing for recognition you do not actually need',
      'Mistaking agreement for understanding',
      'Going it alone when help is genuinely on offer',
    ],
  },
  output: {
    label: 'A day to express',
    tone: 'expression',
    narrative: (dm, today) =>
      `Today's ${today} energy is what your ${dm} nature produces when it flows outward. ` +
      `This is a making day — the part of you that builds, articulates, and ships is favored. ` +
      `What you create now carries your standard into its execution, not just its judgment.`,
    doThis: [
      'Make the thing — ship work that has been waiting',
      'Say the sentence you have been rehearsing',
      'Let craft lead; precision follows it today',
    ],
    avoid: [
      'Over-polishing past the point of diminishing return',
      'Withholding output until it is "perfect"',
      'Spending the energy on critique instead of creation',
    ],
  },
  wealth: {
    label: 'A day to act',
    tone: 'acquisition',
    narrative: (dm, today) =>
      `Today's ${today} energy is territory your ${dm} nature can move on. ` +
      `This is an action day — the world is offering something to be reached for, ` +
      `negotiated, or claimed. The read is already done; today rewards the move that follows it.`,
    doThis: [
      'Make the ask — the timing favors a direct approach',
      'Close something that has been left open',
      'Convert a decision into a concrete step',
    ],
    avoid: [
      'Spreading effort across too many targets',
      'Acquiring for its own sake rather than purpose',
      'Letting opportunity sit while you re-evaluate',
    ],
  },
  officer: {
    label: 'A day that presses',
    tone: 'pressure',
    narrative: (dm, today) =>
      `Today's ${today} energy presses on ${dm} — the force that shapes you is active. ` +
      `If the standard you are measured against today is genuine, this sharpens rather ` +
      `than compresses. Use the pressure: it is not friction, it is the forge. ` +
      `What you have been evaluating comes into its sharpest focus under this energy.`,
    doThis: [
      'Meet the standard head-on — structure rewards it today',
      'Bring discipline to the thing you have been avoiding',
      'Let the pressure refine the work, not rush it',
    ],
    avoid: [
      'Pushing your verdict through a system that has not granted standing',
      'Reading legitimate pressure as a personal attack',
      'Committing under stress to something reversible later',
    ],
  },
  resource: {
    label: 'A day that supports you',
    tone: 'nourishment',
    narrative: (dm, today) =>
      `Today's ${today} energy feeds ${dm} — the day nourishes rather than demands. ` +
      `This is a restoring day: the structural support that steadies you is present, ` +
      `and conclusions formed now land with weight. A good day to learn, consolidate, ` +
      `and let something settle before you act on it.`,
    doThis: [
      'Learn something that deepens what you already do',
      'Consolidate — close loops rather than open new ones',
      'Accept support that is genuinely offered',
    ],
    avoid: [
      'Over-preparing as a way of delaying the move',
      'Leaning on comfort past the point it serves you',
      'Forcing a decision the day would rather let settle',
    ],
  },
};

// Best-hours windows themed by today's element. The 12 earthly branches
// map to 2-hour windows; each element peaks in its seasonal hours. We
// surface three intuitive windows (morning / peak / evening) labeled by
// what the day's element favors — kept deterministic, no clock math beyond
// the canonical element-hour associations.
const ELEMENT_HOURS = {
  Wood:  [['5–7 AM', 'Rising — plan and set intention'], ['11 AM–1 PM', 'Peak growth — start the new thing'], ['7–9 PM', 'Wind down — let ideas root']],
  Fire:  [['7–9 AM', 'Planning window'], ['11 AM–1 PM', 'Peak Fire — act boldly'], ['9–11 PM', 'Wind down, integrate']],
  Earth: [['7–9 AM', 'Ground the day'], ['1–3 PM', 'Steady work — build and hold'], ['7–9 PM', 'Settle and consolidate']],
  Metal: [['5–7 AM', 'Sharpest clarity — decide'], ['3–5 PM', 'Peak precision — execute'], ['9–11 PM', 'Refine, then rest']],
  Water: [['5–7 AM', 'Quiet planning'], ['9–11 PM', 'Peak flow — reflect and connect'], ['11 PM–1 AM', 'Deep rest — let it move']],
};

/**
 * getDailyGuidance(chart) → personalized daily reading object.
 * Reads chart.currentFlowDay (today's pillar) + chart.dayMaster.
 * Returns null if the chart is missing.
 */
export function getDailyGuidance(chart) {
  if (!chart?.currentFlowDay || !chart?.dayMaster) return null;

  const dmElement = chart.dayMaster.element;
  const today = chart.currentFlowDay;
  const todayElement = today.stemElement;
  const family = today.stemTenGod?.family || 'self';
  const relationKey = FAMILY_TO_RELATION[family] || 'self';
  const rel = RELATIONS[relationKey];

  return {
    todayElement,
    todayStem: today.stem,
    todayStemTenGod: today.stemTenGod,
    dmElement,
    label: rel.label,
    tone: rel.tone,
    narrative: rel.narrative(dmElement, todayElement),
    doThis: rel.doThis,
    avoid: rel.avoid,
    bestHours: ELEMENT_HOURS[todayElement] || ELEMENT_HOURS.Metal,
    relation: relationKey,
  };
}
