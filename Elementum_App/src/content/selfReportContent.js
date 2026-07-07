// ═══════════════════════════════════════════════════════════════════
// ELEMENTUM · Self-Report — composed personal report (v1, DOC5 §12 Card 3)
// ═══════════════════════════════════════════════════════════════════
// The paid Self-Report deliverable: a one-shot personal document COMPOSED
// on-device from (chart × the user's own intake). No LLM — deliberate:
// (a) the privacy contract (birth data never leaves the device, /legal +
// DOC10 §3) forbids shipping chart+context to a model without new
// disclosure; (b) the app's whole reading corpus is authored composition,
// and this report speaks in the same voice; (c) zero marginal cost.
// When §4.3 (LLM proxy) lands, this structure becomes the prompt scaffold
// and sections ③–⑤ can be enriched — the document contract stays.
//
// Report contract (rendered by SelfReportScreen):
//   ① WHO YOU ARE   — day-master identity (reuses STEM_CARD_DATA.identity)
//   ② WHERE YOU ARE — their chapter × their element (CHAPTER_ELEMENT, 5×5)
//   ③ LIVE DOMAINS  — each chosen domain × element (DOMAIN_ELEMENT, 5×5)
//   ④ IN YOUR WORDS — their open context, echoed and framed
//   ⑤ ONE INSTRUCTION — closing line keyed by the chart's catalyst element
// ═══════════════════════════════════════════════════════════════════

import { STEM_CARD_DATA } from './archetypeSource.js';

// ── ② chapter × element — "what this stretch asks of this nature" ──────────
export const CHAPTER_ELEMENT = {
  Transition: {
    Wood:  `A transition asks Wood to do the one thing it resists: pause mid-growth. Your direction is not lost — it is being re-rooted, and the reaching can wait a season without dying.`,
    Fire:  `Fire crosses transitions the way a torch crosses open ground — impatient with the dark between rooms. Let the old light go out fully; what you carry next will burn cleaner for it.`,
    Earth: `Transitions unsettle Earth more than it admits — the ground itself is what's moving. You do not need the new shape settled today; you need one steady practice that survives the crossing.`,
    Metal: `Metal wants the clean cut — old chapter severed, new one begun. But a transition is not a cut, it is a re-forging: let the edge soften in the fire before you draw it again.`,
    Water: `Water was made for this — you move through openings others call walls. The risk is drifting through the crossing without choosing; name the shore you're actually swimming toward.`,
  },
  Building: {
    Wood:  `Building is Wood's home season — growth with a trellis to climb. Your danger is planting more than you can water; choose the two shoots that matter and let the rest go wild or die.`,
    Fire:  `Fire builds the way it does everything — visibly, and in bursts. The structure you're raising needs joists, not just light; pair every brilliant sprint with one dull, load-bearing habit.`,
    Earth: `A building chapter rewards exactly what Earth does unseen: the daily layer, the kept promise, the ground prepared before rain. Trust the compounding — it is already working.`,
    Metal: `Metal builds by refusal — every no is a wall in the right place. Keep the standard, but check the doorway: a structure with no way in becomes a monument, not a home.`,
    Water: `Water builds the way rivers build valleys — by returning. Momentum, not force, is your material; keep the current moving through the same channel and the shape will carve itself.`,
  },
  Thriving: {
    Wood:  `You are in leaf, and Wood in leaf forgets winter exists. Enjoy the reach — and bank some of this growth where the next season can find it: a skill deepened, a root fed.`,
    Fire:  `Thriving Fire is a beacon — people navigate by you now, which is its own quiet responsibility. Burn generously, but keep one hearth that is only yours, or the crowd will own the flame.`,
    Earth: `A thriving season for Earth feels less like fireworks and more like a full granary — abundance you built on purpose. Share from it; stores that never open turn to weight.`,
    Metal: `Thriving sharpens Metal's oldest temptation: to protect the win by gripping it. The polish came from use, not storage — keep the edge working on something that matters.`,
    Water: `When Water thrives it widens — more channels, more reach, more pull. Watch your depth: breadth is your gift and your leak. Choose where to run deep while the current is strong.`,
  },
  Challenging: {
    Wood:  `A hard season bends Wood before it breaks it — and bending is a skill, not a defeat. Grow around this obstacle the way roots grow around stone: slower, and stronger at the turn.`,
    Fire:  `Fire in a hard season fears one thing above all: going out. You will not. Bank the flame — smaller, hotter, closer to what you love — and refuse the urge to burn just to prove you still can.`,
    Earth: `Earth carries hard seasons so quietly that no one thinks to help — including you. The mountain does not have to hold everything; set down one load this month and see what still stands.`,
    Metal: `A challenging stretch tests Metal's edge against its brittleness. The standard that got you here may be the weight pressing on you now — keep the blade, question the armor.`,
    Water: `Hard ground teaches Water its oldest lesson: persistence beats force. You do not have to break this — you have to outlast it, drop by drop, staying soft where it wants you bitter.`,
  },
  Exploring: {
    Wood:  `Exploration for Wood is growth without a trellis — thrilling, and directionless if it runs too long. Wander widely, but mark the shoots worth returning to; not every reach must become a branch.`,
    Fire:  `An exploring season is Fire at its most alive — every door a possible stage, every stranger kindling. Follow the warmth. The only rule: notice which fires want you back.`,
    Earth: `Exploring runs against Earth's grain — unfamiliar ground, no stores laid in. That discomfort is the point. You are not losing your foundation; you are surveying where the next one goes.`,
    Metal: `Metal explores like a jeweler at a strange market — discerning, unhurried, hard to impress. Good. But buy something. An exploration that ends with empty hands taught the eye nothing.`,
    Water: `This is your native weather — open water, no banks. Range as far as the current runs. Just keep one line back to the people who hold your shape when you're everywhere at once.`,
  },
};

// ── ③ domain × element — "how this nature meets this domain" ───────────────
export const DOMAIN_ELEMENT = {
  Career: {
    Wood:  `Your work wants a growth edge — visible progress, or the role starts to feel like a pot too small. Engineer the next reach before restlessness engineers it for you.`,
    Fire:  `You work best seen — recognition isn't vanity for Fire, it's oxygen. Put your work where warmth can reach it, and guard against dimming yourself to fit a cold room.`,
    Earth: `Your career compounds: mastery, trust, the reputation of the one who holds. The long game is yours to win — just don't let loyalty to what is keep you from what's next.`,
    Metal: `You are the standard-keeper — the one whose work needs no excuse. The craft will carry you; the risk is dying on hills that were never yours to defend. Choose the cuts that count.`,
    Water: `You route around what blocks others — the lateral move, the unseen connection. Your career is a current, not a ladder; stop measuring it against people who climb.`,
  },
  Relationships: {
    Wood:  `You love by growing together — shared direction matters more to you than shared comfort. Say the direction out loud; the people beside you cannot follow a map you keep private.`,
    Fire:  `You warm every room you enter, and the question that shadows you is whether you're loved lit or loved whole. Let someone see the banked coals too — that's where the real heat lives.`,
    Earth: `You love by holding — provision, loyalty, the door that's always open. Remember that being held is also allowed; the mountain can lean, occasionally, and still be the mountain.`,
    Metal: `You love precisely — few people, fully chosen, held to the same clean standard as everything else. Tell them the standard is love; from outside it can read as distance.`,
    Water: `You meet people where they are — few natures listen deeper. The current flows out easily; let someone upstream once in a while. Being known is your growth edge.`,
  },
  Wealth: {
    Wood:  `Money, for you, is fuel for growth — you'd rather plant it than store it. Plant, then — but keep one bed fallow. Every gardener needs seed corn the ambitious season can't touch.`,
    Fire:  `Money moves through you the way heat moves through air — generously, visibly, fast. Build one structure the flame can't reach: automatic, boring, and yours before you see it.`,
    Earth: `Security built in steady layers — this is your home domain, and the fear of losing it is the shadow side. Audit the fear yearly: is the granary full enough yet to live a little?`,
    Metal: `You refine wealth the way you refine everything — deliberately, with contempt for waste. The discipline is real power; just confirm the saving serves a life, not the ledger.`,
    Water: `Your money flows like your attention — toward the interesting, around the tedious. Give the current banks: one channel for the flowing, one pool that nothing drains.`,
  },
  Health: {
    Wood:  `Wood's tension gathers where growth is blocked — the jaw, the shoulders, the 3 a.m. planning. The body is telling you which reach is over-extended; believe it before it shouts.`,
    Fire:  `Your energy runs in flares — brilliant burns, sudden ash. The body keeps honest books on every borrowed hour. Learn your true burn rate and feed the flame before it asks.`,
    Earth: `You hold — and holding settles in the body as weight it never agreed to carry. What steadiness turns to tension wants movement, not more endurance. Walk the load off, literally.`,
    Metal: `The standard you hold others to, your body pays for too — precision has a pulse rate. Rest is not a lowering of the bar; it is the whetstone. Blades sharpened on nothing go dull.`,
    Water: `Your reserves run deeper than most — and deeper means the warning comes late. Fatigue in Water looks like fog, not fire. When the clarity blurs, that IS the signal. Stop refilling everyone else first.`,
  },
  Purpose: {
    Wood:  `Purpose, for Wood, is a direction, not a destination — you are the reaching itself. Stop waiting to arrive; name the light you're growing toward and let that be enough to be faithful to.`,
    Fire:  `Your purpose is heat transfer — you exist to make things visible, warm, alive. The scale matters less than the truth of it: one genuinely lit room counts more than a stadium half-warmed.`,
    Earth: `You are load-bearing — purpose for Earth is being the ground others build on. Honor it, and notice when carrying becomes hiding: the mountain serves best when it also has a view.`,
    Metal: `Your purpose runs through discernment — cutting what is true from what is noise, and keeping what deserves keeping. The world needs the edge; wield it as service, not sentence.`,
    Water: `You connect what was separate — that is the purpose, even when it looks like wandering. Trust the watershed logic: every channel you've run is one map, and it is going somewhere.`,
  },
};

// ── ⑤ closing instruction — keyed by the chart's CATALYST element ──────────
export const CATALYST_CLOSE = {
  Wood:  `Your catalyst is Wood: when this season stalls, plant something — start the thing, sign up, break ground. Growth is the medicine your chart reaches for.`,
  Fire:  `Your catalyst is Fire: when this season stalls, add heat — show the work, say the thing, light the room. Visibility is the medicine your chart reaches for.`,
  Earth: `Your catalyst is Earth: when this season stalls, add ground — a routine kept, a promise made structural. Steadiness is the medicine your chart reaches for.`,
  Metal: `Your catalyst is Metal: when this season stalls, refine — cut one thing, finish one thing, raise one standard. Precision is the medicine your chart reaches for.`,
  Water: `Your catalyst is Water: when this season stalls, soften and connect — ask, listen, go around. Flow is the medicine your chart reaches for.`,
};

// ── the composer ────────────────────────────────────────────────────────────
/**
 * composeSelfReport(chart, sr) → report object, or null without a chart.
 * `sr` = { chapter, domains[], context, at } (the intake, from localStorage).
 * Pure + deterministic: same inputs, same report. All content on-device.
 */
export function composeSelfReport(chart, sr) {
  if (!chart?.dayMaster) return null;
  const stem = chart.dayMaster.stem || '庚';
  const element = chart.dayMaster.element || 'Metal';
  const identity = STEM_CARD_DATA[stem]?.identity || {};
  const archetypeName = identity.archetypeName || `${element} Day Master`;
  const strength = chart.dayMaster.strength || null;
  const catalyst = chart.catalyst || element;
  const chapter = sr?.chapter || null;
  const domains = Array.isArray(sr?.domains) ? sr.domains : [];
  const context = (sr?.context || '').trim();

  const sections = [];

  // ① WHO YOU ARE
  sections.push({
    key: 'who',
    eyebrow: 'Who you are',
    title: `${stem} · ${archetypeName}`,
    body: [
      [identity.elementIntro?.punch, identity.elementIntro?.expand].filter(Boolean).join(' '),
      strength
        ? `The chart behind this report runs ${strength}, and ${catalyst} is the element that most repays your deliberate attention.`
        : `${catalyst} is the element that most repays your deliberate attention.`,
    ].filter(Boolean),
  });

  // ② WHERE YOU ARE
  if (chapter && CHAPTER_ELEMENT[chapter]?.[element]) {
    sections.push({
      key: 'where',
      eyebrow: 'Where you are',
      title: `A ${chapter.toLowerCase()} chapter`,
      body: [CHAPTER_ELEMENT[chapter][element]],
    });
  }

  // ③ YOUR LIVE DOMAINS
  const domainItems = domains
    .filter((d) => DOMAIN_ELEMENT[d]?.[element])
    .map((d) => ({ name: d, text: DOMAIN_ELEMENT[d][element] }));
  if (domainItems.length) {
    sections.push({
      key: 'domains',
      eyebrow: 'Your live domains',
      title: domainItems.length === 1 ? domainItems[0].name : `${domainItems.length} domains, read through ${element}`,
      items: domainItems,
    });
  }

  // ④ IN YOUR WORDS
  if (context) {
    sections.push({
      key: 'words',
      eyebrow: 'In your words',
      title: 'What you named',
      quote: context,
      body: [
        `You put this in your own words, which matters — the chart describes the nature, but you described the terrain. Read the sections above with this in hand: they are speaking to it.`,
      ],
    });
  }

  // ⑤ ONE INSTRUCTION
  sections.push({
    key: 'instruction',
    eyebrow: 'One instruction',
    title: 'Carry this',
    body: [CATALYST_CLOSE[catalyst] || CATALYST_CLOSE[element] || CATALYST_CLOSE.Metal],
  });

  return {
    date: sr?.at || new Date().toISOString().slice(0, 10),
    stem,
    element,
    archetypeName,
    archetypeLabel: identity.archetypeLabel || `${element} — ${archetypeName}`,
    manifesto: identity.manifesto || null,
    sections,
  };
}
