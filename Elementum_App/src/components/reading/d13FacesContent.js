// ===================================================================
// ELEMENTUM · FACES card + reading content (per Ten-God persona)
// ===================================================================
// The collapsed/expanded face-card copy for the P6–P10 FACES pages and
// the full persona readings for P12/P13, authored to the deliverable's
// fidelity (reading/The Five Energies Journey - Full.html). Wood (正财 The
// Steward + 偏财 The Horizon) is the verbatim reference; the other eight
// personas are authored in the same voice and length.
//
// Keyed by the Ten-God 汉字 (NOT by element): a Ten God's persona is the
// same reading regardless of whose chart it sits in — 比肩 is always The
// Twin (identity & autonomy). Only the element that CARRIES the god, and
// its strength, change per user. So these maps are Day-Master-independent.
//
// Persona display names live in content/tgNames.js (TG_PERSONA); this file
// carries the keywords, "what it rules" domain, the card reading teaser,
// and the full persona reading (read-lede tail + R paragraphs + pull + X).
// ===================================================================

export const FACE_CARD = {
  '比肩': { kw: ['Independent', 'Resolute', 'Self-made'], ruleT: 'Identity & autonomy', ruleB: 'standing on your own.', teaser: 'You trust your own counsel first. Self-reliance is a strength — and, now and then, a wall others can’t get past. You begin without waiting for permission and finish without needing rescue. The art is knowing the moment standing alone costs more than it’s worth.' },
  '劫财': { kw: ['Driven', 'Competitive', 'Bold'], ruleT: 'Ambition & rivalry', ruleB: 'the spur of a worthy opponent.', teaser: 'You rise to a contest. Comparison sharpens you, though it can also spend the energy you meant to keep. Put an equal in front of you and you find a gear you forgot you had. Just watch that the race doesn’t cost more than the finish line pays.' },
  '正印': { kw: ['Grounding', 'Nurturing', 'Patient'], ruleT: 'Steady support', ruleB: 'the roots that hold you.', teaser: 'You learn deeply and keep what you learn. Support — given or received — is never wasted on you. You’re nourished by what others hurry past, and steadied by roots that run long and quiet. The watch is for when “not ready yet” quietly becomes a place to stay.' },
  '偏印': { kw: ['Intuitive', 'Unorthodox', 'Transmuting'], ruleT: 'Unorthodox insight', ruleB: 'nourishment from the unexpected.', teaser: 'You feed on the strange and the oblique — understanding tends to arrive sideways, rarely on cue. You turn raw, unpromising material into sense the way few others can. Original and self-sufficient, you think best alone. Just don’t let the wondering become a room you never leave.' },
  '食神': { kw: ['Fluent', 'Generous', 'Easeful'], ruleT: 'Natural expression', ruleB: 'making that flows without strain.', teaser: 'Ideas come easily and you give them away gladly. Creation, for you, is play before it is ever work. You make rooms lighter and tables fuller without seeming to try. The one caution is drift — when everything flows, it’s easy to coast past your best.' },
  '伤官': { kw: ['Brilliant', 'Unruly', 'Daring'], ruleT: 'Brilliant expression', ruleB: 'talent that bends the rules.', teaser: 'You dazzle when you break form. The same spark that wins the room can unsettle the ones who run it. You’d rather be brilliant than merely correct — and often you’re both. The craft is aiming it where invention is wanted, not just where rules happen to be.' },
  '正财': { kw: ['Steady', 'Accruing', 'Enduring'], ruleT: 'Steady holdings', ruleB: 'wealth tended and kept.', teaser: 'Worth, to you, is built slowly and kept. Security is something earned in steady, deliberate increments. You trust the slow ledger over the lucky break, and it makes you dependable with what matters. The only real risk is holding a thing so tightly it stops growing.' },
  '偏财': { kw: ['Expansive', 'Sensing', 'Distant'], ruleT: 'Windfall & opportunity', ruleB: 'wealth that arrives in waves.', teaser: 'You read money as movement — pulled toward the deal on the horizon more than the one already in hand. Opportunity registers at a distance, and you back the bet others hesitate on. Windfall energizes you; routine quietly bores you. The skill is choosing which horizons are actually worth crossing.' },
  '七杀': { kw: ['Forging', 'Relentless', 'Decisive'], ruleT: 'Raw challenge', ruleB: 'the pressure that forges you.', teaser: 'Pressure never asks your permission. You’re sharpened by the trials you would never have chosen. You meet the hard thing head-on where others flinch — decisive, and hard to rattle. The watch is for when force becomes a reflex on what only needed a lighter hand.' },
  '正官': { kw: ['Principled', 'Measured', 'Ordered'], ruleT: 'Order & duty', ruleB: 'the structure you answer to.', teaser: 'A discipline to grow into: measured authority that holds the line without forcing it. People trust you with responsibility because you carry it evenly. You’d rather be fair than feared, and it shows. The caution is rigidity — keeping the rule after it has outlived its reason.' },
};

// The element's meaning relative to the Day Master, by Ten-God FAMILY — so
// it stays correct for any Day Master (Wood is 财/wealth for a Metal DM, but
// 比劫/self for a Wood DM). `domain` is the bold clause; `clause` is the
// poetic tail that fills out the fd-card one-line brief (P6–P10).
export const FAMILY_BRIEF = {
  '比肩': 'you', '劫财': 'you',
  '正印': 'your support & nourishment', '偏印': 'your support & nourishment',
  '食神': 'your output & expression', '伤官': 'your output & expression',
  '正财': 'your wealth & desire', '偏财': 'your wealth & desire',
  '七杀': 'your authority & structure', '正官': 'your authority & structure',
};

export const FAMILY_CLAUSE = {
  '比肩': 'the self the other four energies turn around', '劫财': 'the self the other four energies turn around',
  '正印': 'the ground you’re built on', '偏印': 'the ground you’re built on',
  '食神': 'how you meet and remake the world', '伤官': 'how you meet and remake the world',
  '正财': 'everything you treat as worth having and keeping', '偏财': 'everything you treat as worth having and keeping',
  '七杀': 'the structure you answer to and grow into', '正官': 'the structure you answer to and grow into',
};

// Element-page (P11) family copy — the appetite the energy carries (para 1)
// and the "not X alone, but…" reframe (para 2). Composed with presence/role
// and the DM cycle at render time.
export const FAMILY_ELEMENT = {
  '比肩': { appetite: 'identity, autonomy, and the standard you hold yourself to', notAlone: 'not pride alone, but the self the other four energies turn around' },
  '劫财': { appetite: 'drive, contest, and the edge you sharpen against equals', notAlone: 'not pride alone, but the self the other four energies turn around' },
  '正印': { appetite: 'learning, care, and the roots that steady you', notAlone: 'not comfort alone, but everything that feeds and restores you' },
  '偏印': { appetite: 'insight, the oblique, and understanding that transmutes', notAlone: 'not comfort alone, but everything that feeds and restores you' },
  '食神': { appetite: 'making, voice, and the urge to put something into the world', notAlone: 'not talent alone, but everything you shape and send outward' },
  '伤官': { appetite: 'brilliance, invention, and expression that bends the rules', notAlone: 'not talent alone, but everything you shape and send outward' },
  '正财': { appetite: 'value, growth, and the things worth having', notAlone: 'not money alone, but everything you treat as worth acquiring and tending' },
  '偏财': { appetite: 'value, growth, and the things worth having', notAlone: 'not money alone, but everything you treat as worth acquiring and tending' },
  '七杀': { appetite: 'challenge, pressure, and the trials that forge you', notAlone: 'not control alone, but everything that tests you and steadies you' },
  '正官': { appetite: 'order, duty, and the structure worth answering to', notAlone: 'not control alone, but everything that tests you and steadies you' },
};

// Full persona reading (P12/P13), keyed by Ten-God 汉字. Authored to the
// deliverable's length: a read-lede tail ("the one who…"), a 1–2 paragraph
// R layer, a pulled line, and an X ("what to do with it"). Steward + Horizon
// are the verbatim Wood reference; the rest match its voice and shape.
export const PERSONA_READING = {
  '比肩': {
    ledeTail: 'the one who stands on their own ground and answers to their own measure',
    r: [
      'You keep your own counsel. Before you weigh what anyone else thinks, there’s a standard already set inside you — and that’s the one you actually answer to. It makes you steady when a room wobbles, and hard to move once you’ve decided.',
      'Independence like this is a quiet kind of strength: you don’t need permission to begin, and you rarely need rescue to finish. The cost is that the same wall that keeps you upright can keep others out.',
    ],
    pull: 'You’d rather be right with yourself than agreeable with everyone.',
    x: 'Lean on it where conviction is the job — the call only you can make, the line only you will hold. Loosen it where a hand offered is worth more than a point proven.',
  },
  '劫财': {
    ledeTail: 'the one who comes alive against a worthy equal',
    r: [
      'You rise to a contest. Put an equal in front of you and something sharpens — you find a gear you didn’t know you had. Comparison isn’t vanity for you; it’s fuel, the way you learn how far you can actually go.',
      'That drive wins ground others leave on the table. But rivalry spends what it earns: the same heat that pushes you forward can burn through the very thing — energy, money, goodwill — you meant to keep.',
    ],
    pull: 'You measure yourself against the best in the room, and it makes you better and poorer at once.',
    x: 'Point it at a real opponent — a standard, a record, a version of yourself worth beating — and let it drive. Pull it back when the contest is costing more than the win is worth.',
  },
  '正印': {
    ledeTail: 'the one who learns deeply and is held by roots that run quiet and long',
    r: [
      'You take things in and keep them. Knowledge, care, the steadying presence of people who wish you well — none of it is wasted on you; it settles into ground you can stand on later. You’re the one who reads to the end, who remembers, who is nourished by what others rush past.',
      'This is the root beneath your composure. It makes you patient and hard to rattle — though roots that only ever take in can grow reluctant to move, waiting to feel ready before they begin.',
    ],
    pull: 'You are steadier than you know, and you know more than you let on.',
    x: 'Trust the slow accrual — the study, the mentor, the long relationship — where depth is the point. Notice where “not ready yet” has quietly become a place to hide.',
  },
  '偏印': {
    ledeTail: 'the one who turns the strange and the unwanted into understanding',
    r: [
      'You feed on the oblique. Insight arrives for you sideways — from the odd source, the dropped remark, the thing everyone else stepped over — and you have a knack for turning raw, unpromising material into sense. Understanding rarely comes on cue; it comes when it comes, and it’s usually worth the wait.',
      'This is the ground your edge is forged on. It makes you original and quietly self-sufficient — though the same inward turn can tip into over-thinking, or into feeding yourself so privately that nothing gets out.',
    ],
    pull: 'You make meaning from what others discard — and sometimes forget to share it.',
    x: 'Give it strange problems and let it wander; that’s where it earns its keep. Then set a deadline, because insight this good is wasted if it never leaves your head.',
  },
  '食神': {
    ledeTail: 'the one for whom making is play before it is ever work',
    r: [
      'Things flow out of you without much strain. Ideas, warmth, the small pleasures of doing a thing well — they come easily, and you give them away gladly. For you, creation starts as play; the work is just the play taken seriously.',
      'This ease is genuinely rare, and people feel it — you make rooms lighter and tables fuller. Its shadow is drift: when everything comes easily, it’s tempting to let the current carry you past the thing that would have been your best.',
    ],
    pull: 'You’d make it anyway, whether or not anyone was watching.',
    x: 'Follow the ease into real craft — pick one thing worth finishing and let the pleasure do the pulling. Guard against comfort so complete that you never test the edge of what you could do.',
  },
  '伤官': {
    ledeTail: 'the one who dazzles precisely by refusing the given form',
    r: [
      'You shine when you break the mold. Talent, for you, isn’t quiet competence — it’s the flourish, the unexpected move, the answer no one asked for that turns out to be right. You’d rather be brilliant than correct, and often you’re both.',
      'That spark wins rooms and moves work forward in leaps. It also unsettles the people whose job is to keep order — the same brilliance that impresses can read as defiance, and the friction is real.',
    ],
    pull: 'You will not be told how, and that is both the gift and the bill.',
    x: 'Aim the fireworks at problems that reward invention, where “because I said so” has failed everyone else. Spend a little of it on tact, so the work lands before the ego does.',
  },
  '正财': {
    ledeTail: 'the one who builds value slowly and refuses to let it slip',
    r: [
      'You hold what you gather. Worth, for you, is tended over time — accrued in steady increments, compounded, rarely gambled. Where others chase the windfall, you trust the slow ledger: the thing that grows because you kept showing up for it.',
      'This is the quiet engine behind your security. It makes you dependable with what matters and slow to part with it — sometimes slower than the moment deserves.',
    ],
    pull: '“Enough” is a number you can actually name — and you’re nearly always building toward it.',
    x: 'Put your hand on the long arc: the account that compounds, the craft that deepens, the bond that keeps. Notice the one place you’re holding so tightly it’s stopped growing.',
  },
  '偏财': {
    ledeTail: 'the one that reaches for what isn’t here yet',
    r: [
      'You read value as movement. Opportunity registers at a distance — the deal forming, the door about to open — and you’re pulled toward it more than toward what’s already in hand. Windfall energizes you; routine quietly bores you.',
      'Money and chance feel alive in your hands, and you’re generous with both when the mood is good. The catch is the reach itself: always leaning toward the next thing can mean the last good thing slips away uncounted.',
    ],
    pull: 'You’d rather chase the next good thing than count the last one.',
    x: 'Aim the reach: pick the horizons worth crossing and let the rest pass. Pair it with the Steward’s patience so what you catch doesn’t slip straight back out.',
  },
  '七杀': {
    ledeTail: 'the one who is forged by trials they would never have chosen',
    r: [
      'Pressure doesn’t ask your permission. It arrives — the deadline, the rival, the situation with no soft option — and something in you meets it head-on rather than flinching. You don’t go looking for the fight, but you don’t lose your nerve when it finds you.',
      'This is what forges you. The trials you’d never have picked are exactly the ones that made you sharp, decisive, hard to intimidate. The danger is that a nature built for pressure can start manufacturing it — turning force on situations, and people, that only needed a lighter hand.',
    ],
    pull: 'You’re sharpened by the trials you would never have chosen.',
    x: 'Point it at the hard, worthy thing — the challenge that genuinely needs someone who won’t blink. Ease off where force has become a habit, and a steadier touch would carry the room.',
  },
  '正官': {
    ledeTail: 'the one whose authority earns its weight by being fair',
    r: [
      'You hold the line without needing to raise your voice. There’s a sense of proportion in you — of what’s owed, what’s due, what a thing should rightly be — and people trust you with responsibility because you carry it evenly. You’d rather be fair than feared, and it shows.',
      'This is a discipline to grow into, and mostly you have. The measured authority that steadies a group can, taken too far, harden into rigidity — rules kept because they’re rules, order valued over the living thing it was meant to serve.',
    ],
    pull: 'You keep the standard because someone has to, and you’d rather it were done well.',
    x: 'Take the seat where fairness is the whole job — the call that has to be even-handed, the structure others rely on. Loosen the grip where the rule has outlived the reason, and judgment matters more than procedure.',
  },
};

// Persona reading pages (P12/P13): the life-domains this face rules, plus the
// Seeker gate copy. Authored Wood-first (§8 of the deliverable) — 正财 The
// Steward + 偏财 The Horizon are the reference personas; other gods fall back
// to the R/X + gate reading (no domain deep-dive) until authored. Icons: one
// of dom-wealth | dom-rel | dom-career | dom-health.
export const PERSONA_DOMAINS = {
  '正财': {
    secSub: 'The Steward shapes how you handle money, love, work and your own body. Open any one for its reading.',
    domains: [
      { icon: 'dom-wealth', name: 'Wealth', tease: 'Your home domain — security built in steady layers, and the fear of ever losing it.' },
      { icon: 'dom-rel', name: 'Relationships', tease: 'You love by providing and keeping. Loyalty runs deep; letting go runs hard.' },
      { icon: 'dom-career', name: 'Career', tease: 'You compound mastery. The long game rewards you where the quick pivot would not.' },
      { icon: 'dom-health', name: 'Health', tease: 'How holding-on settles in the body — where steadiness turns to tension. Seeker.', locked: true },
    ],
    gateLabel: 'Seeker — the full Steward reading',
    gateBody: 'Every domain in depth · where holding turns to hoarding · the season it tightens.',
  },
  '偏财': {
    secSub: 'The Horizon shows up most where timing and appetite decide the outcome.',
    domains: [
      { icon: 'dom-wealth', name: 'Wealth', tease: 'Upside over safety — you back the bet others hesitate on, and feel the swings.' },
      { icon: 'dom-career', name: 'Career', tease: 'You thrive on the new venture, the open lane — and stall when the work goes flat.' },
      { icon: 'dom-rel', name: 'Relationships', tease: 'Drawn to the spark of the new — where novelty helps, and where it costs. Seeker.', locked: true },
    ],
    gateLabel: 'Seeker — the full Horizon reading',
    gateBody: 'Every domain in depth · where reaching turns to restlessness · the season it spikes.',
  },
};
