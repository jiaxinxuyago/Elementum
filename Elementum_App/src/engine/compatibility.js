// ===================================================================
// ELEMENTUM · engine/compatibility.js  (DES_04 §13 Friends V2)
// ===================================================================
// Pure-JS elemental compatibility between two charts. Computes a score,
// a relationship archetype, a headline category, and a reading from the
// five-element relationship between the two Day Master elements.
//
// 15 unordered element pairs (5 same + 10 mixed) cover all 25 ordered
// combinations. Scoring follows the generating/controlling cycle:
//   generating  → harmonious (high)   · same → kindred (mid-high)
//   controlling → productive tension / challenging (mid–low)
// ===================================================================

const GEN = { Wood: 'Fire', Fire: 'Earth', Earth: 'Metal', Metal: 'Water', Water: 'Wood' };
const CTL = { Wood: 'Earth', Fire: 'Metal', Earth: 'Water', Metal: 'Wood', Water: 'Fire' };

const key = (a, b) => [a, b].sort().join('×');

// archetype · headline · score · reading (3–4 sentences) per pair.
const PAIRS = {
  'Metal×Metal': { archetype: 'The Mirror', headline: 'Kindred but Exacting', score: 70,
    reading: 'Two blades in one room. You recognise each other instantly — the same precision, the same refusal to pretend. The risk is that neither yields first; the gift is a bond where nothing needs to be explained.' },
  'Wood×Wood': { archetype: 'The Grove', headline: 'Kindred and Growing', score: 72,
    reading: 'Two reaching things, often toward the same light. You grow each other forward and rarely run out of next steps. Watch for competing for the same ground rather than rooting in your own.' },
  'Fire×Fire': { archetype: 'The Beacon', headline: 'Bright and Volatile', score: 66,
    reading: 'Two flames make a brilliant, exhausting light. When aligned you illuminate everything; when not, you consume the oxygen between you. Build in rest — fire that never banks burns out.' },
  'Earth×Earth': { archetype: 'The Mountain', headline: 'Stable and Steadfast', score: 74,
    reading: 'Two steady grounds. This is the most durable of pairings — slow to ignite, almost impossible to topple. The shadow is inertia: comfort can quietly become a refusal to move.' },
  'Water×Water': { archetype: 'The Confluence', headline: 'Deep and Fluid', score: 71,
    reading: 'Two depths that mingle without seam. You understand each other beneath words, often before words. The caution: two currents with no banks can lose direction together.' },
  'Metal×Fire': { archetype: 'The Forge', headline: 'Challenging but Growth-Focused', score: 78,
    reading: 'Fire meets Metal — the most productive tension in the five-element system. One sharpens, the other reveals; together you make each other more exact than either is alone. It runs hot, and the heat is the point — handled with care, this is the relationship that forges both of you.' },
  'Metal×Wood': { archetype: 'The Pruning', headline: 'Complementary Opposites', score: 64,
    reading: 'Metal shapes Wood. One brings direction and the cut; the other brings growth and reach. At its best this is editor-and-author; at its worst, the cutting feels like control. The balance is consent — Wood must want the shaping.' },
  'Metal×Water': { archetype: 'The Spring', headline: 'Harmonious and Creative', score: 84,
    reading: 'Metal feeds Water — a generative, easy current. You give each other clarity and flow without forcing it. One of the most naturally supportive pairings: the precision of Metal becomes the source the Water carries outward.' },
  'Earth×Metal': { archetype: 'The Vein', headline: 'Harmonious and Nourishing', score: 83,
    reading: 'Earth bears Metal — a quietly nourishing bond. One provides ground and resource; the other provides definition and worth. Steady, reliable, and unflashy in the best way; you make each other feel substantial.' },
  'Fire×Wood': { archetype: 'The Kindling', headline: 'Harmonious and Energising', score: 85,
    reading: 'Wood feeds Fire — vitality on tap. The growth-energy of one becomes the light and warmth of the other. This is an enlivening pairing; the only watch-out is burning through the fuel faster than it regrows.' },
  'Earth×Wood': { archetype: 'The Roots', headline: 'Complementary Opposites', score: 62,
    reading: 'Wood parts Earth. One wants to grow and disrupt; the other wants to hold and stabilise. Real tension lives here — and real complementarity, if each respects what the other protects. Not effortless, but generative.' },
  'Water×Wood': { archetype: 'The Rains', headline: 'Harmonious and Nourishing', score: 84,
    reading: 'Water grows Wood — a nurturing, future-facing bond. One supplies depth and feeling; the other turns it into growth and direction. You bring out each other’s capacity to become.' },
  'Earth×Fire': { archetype: 'The Hearth', headline: 'Harmonious and Warm', score: 82,
    reading: 'Fire makes Earth — warmth that builds something lasting. The passion of one settles into the foundation of the other. A grounding, generous pairing: it turns heat into home.' },
  'Fire×Water': { archetype: 'The Steam', headline: 'Challenging but Transformative', score: 56,
    reading: 'Water meets Fire — the classic clash. Left raw, one extinguishes the other; held with skill, the meeting produces steam — pure transformation. This pairing asks the most and, when it works, changes both of you the most.' },
  'Earth×Water': { archetype: 'The Riverbank', headline: 'Complementary Opposites', score: 63,
    reading: 'Earth dams Water. One contains and directs; the other flows and erodes. Boundaries are the whole story here — with clear ones, the bank gives the river its shape; without them, the water just wears the ground away.' },
};

const STEM_PINYIN_POLARITY = {
  '甲': 'Yang Wood', '乙': 'Yin Wood', '丙': 'Yang Fire', '丁': 'Yin Fire',
  '戊': 'Yang Earth', '己': 'Yin Earth', '庚': 'Yang Metal', '辛': 'Yin Metal',
  '壬': 'Yang Water', '癸': 'Yin Water',
};

// Resolve the pair record for two element strings (symmetric).
export function pairFor(elA, elB) {
  return PAIRS[key(elA, elB)] || PAIRS['Metal×Fire'];
}

// Full compatibility result. `user` + `other` are dayMaster-ish objects:
//   { stem, element, polarity }  and optional archetype names.
export function computeCompatibility(user, other) {
  if (!user || !other) return null;
  const p = pairFor(user.element, other.element);
  // Relationship from the user's perspective (for the teaser verb).
  let relation = 'same';
  if (user.element !== other.element) {
    if (GEN[user.element] === other.element) relation = 'you-generate';
    else if (GEN[other.element] === user.element) relation = 'they-generate';
    else if (CTL[user.element] === other.element) relation = 'you-control';
    else if (CTL[other.element] === user.element) relation = 'they-control';
  }
  const teaserMap = {
    'same': `${user.element} meets ${other.element} — kindred energies that recognise each other.`,
    'you-generate': `Your ${user.element} feeds their ${other.element} — you naturally give them momentum.`,
    'they-generate': `Their ${other.element} feeds your ${user.element} — they replenish what you spend.`,
    'you-control': `Your ${user.element} shapes their ${other.element} — productive tension, if handled with care.`,
    'they-control': `Their ${other.element} shapes your ${user.element} — they press on you in ways that can sharpen or strain.`,
  };
  return {
    score: p.score,
    archetype: p.archetype,
    headline: p.headline,
    reading: p.reading,
    teaser: teaserMap[relation],
    relation,
    user: { ...user, label: STEM_PINYIN_POLARITY[user.stem] || user.element },
    other: { ...other, label: STEM_PINYIN_POLARITY[other.stem] || other.element },
  };
}
