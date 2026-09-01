// ===================================================================
// ELEMENTUM · k2 — the ELEMENT_GOD depth corpus (K2 campaign)
// ===================================================================
// Owner construct ruling 2026-08-19 (the energy-page depth breakdown):
//   · grain: ELEMENT_GOD ×50 (element-flavored from day one)
//   · cell: overview (the "what it means" body, replaces the interim
//     mean line) + functional ×5 (Mind · Expression · Order · Action ·
//     Body) + domain readings (one per the god's ruled domains)
//   · position, layered: GOD_DOMAINS = the god's inherent ruling
//     domains (this file, ×10, free) · palace placement line = engine-
//     derived, PENDING the palace-noun vocabulary ruling
//   · tier: overview + functions + domain MAP free · domain READINGS
//     Seeker-gated
// Station truth: by_axis/json/ELEMENT_GOD/*.json (+ GOD/*.json domains);
// this file is the deliberate transcription (REA_05). Register: K2 =
// god cost × element arena (REA_16 §2b-G), humanize gate, dashless.
// Corpus complete ×50 (2026-08-19): 土_偏印 template + 49 batched cells.
// ===================================================================

// The five functional categories (owner-ruled set, in render order).
export const K2_FUNCTIONS = [
  { key: 'mind', label: 'Mind' },
  { key: 'expression', label: 'Expression' },
  { key: 'order', label: 'Order' },
  { key: 'action', label: 'Action' },
  { key: 'body', label: 'Body' },
];

// The god's inherent ruling domains (×10, everyday nouns; the classical
// 六亲 roles kept where they teach: Mother 正印 · Father 偏财 · Children 食神).
export const GOD_DOMAINS = {
  '比肩': ['Peers', 'Independence', 'Self-reliance'],
  '劫财': ['Rivalry', 'Shared stakes', 'Boldness'],
  '食神': ['Expression', 'Enjoyment', 'Children'],
  '伤官': ['Talent', 'Performance', 'Defiance'],
  '偏财': ['Opportunity', 'Ventures', 'Father'],
  '正财': ['Wealth', 'Savings', 'Steady love'],
  '七杀': ['Pressure', 'Command', 'Crisis'],
  '正官': ['Career', 'Status', 'Order'],
  '偏印': ['Learning', 'Intuition', 'Solitude'],
  '正印': ['Knowledge', 'Shelter', 'Mother'],
};

// K2 cells, keyed `${elementHanzi}_${god}` (×50, station-regenerated).
export const K2_CELLS = {
  '木_比肩': {
    overview: 'Your Wood moves as the Twin: growth that stands beside others without leaning on them. You rise the way two trees share a hillside, close enough to shelter each other, rooted enough to stand alone. Ambition, for you, is upward and personal. You measure yourself against your own last season, and quietly against the tree beside you.',
    functional: {
      mind: 'You think in growth lines: where you were, where you are, what the next height requires.',
      expression: 'You speak plainly and upward, more comfortable stating goals than confessing doubts.',
      order: 'Your rules are your own rings: grown from inside, read by nobody else, and never up for vote.',
      action: 'You start on your own signal and keep your own pace. Seasons of effort suit you better than sprints.',
      body: 'Your stamina is vegetal: quiet, continuous, renewed by daylight and outdoor air.',
    },
    domain_readings: {
      Peers: 'Your peers are the grove: people growing the same direction at their own speeds. Comparison is your fertilizer and your poison, so use the grove for shade and shelter, and race only your own rings.',
      Independence: 'Wood independence is having your own soil: your plot, your craft, your income no one else waters. Secure it early. You bend badly when planted in someone else’s garden.',
      'Self-reliance': 'You hold yourself up through storms that flatten louder people, and you rarely mention the wind afterward. Let someone stake you when you are newly transplanted. It is not dependence. It is horticulture.',
    },
  },
  '木_劫财': {
    overview: 'Your Wood moves as the Rival: growth that races the grove. Another’s success reads to you as proof of reachable height, and it pulls you upward faster than any plan. You share ground generously and compete on it constantly. Handled well, that doubles every harvest. Handled loosely, the roots start strangling.',
    functional: {
      mind: 'You think comparatively: their height, your height, the fastest honest way to close the gap.',
      expression: 'You talk in ambitions and dares, half invitation, half challenge.',
      order: 'Rules read as trellises to outgrow: you climb them hardest when someone says they hold you.',
      action: 'You accelerate when someone runs beside you. Alone, you coast. Recruit pace-setters.',
      body: 'Your energy feeds on contest and outdoor motion, and sours in idle shade.',
    },
    domain_readings: {
      Rivalry: 'Your rivalries are growth spurts: every worthy competitor adds a ring. Keep them seasonal rather than permanent. A race that never ends stops being training and becomes a root war.',
      'Shared stakes': 'You pool naturally: gardens, ventures, family plots tended together. Write down whose branch is whose before the fruit comes in. Shared soil grows the most and disputes the hardest.',
      Boldness: 'Your daring is springlike: sudden reach toward light others have not noticed yet. Trust it early in ventures and slow it near contracts. Green wood bends into bad deals when the sun is exciting.',
    },
  },
  '木_食神': {
    overview: 'Your Wood moves as the Artisan: growth that fruits. Everything you tend produces, gardens, projects, people, and the producing feels less like work than like season. You nourish by cultivating: patient feeding, honest pruning, harvests shared at the fence. Your gift ripens on its own schedule. Respect the schedule.',
    functional: {
      mind: 'You think in seasons and yields: what to plant now for the table you want later.',
      expression: 'Your words grow on people slowly and stay. You persuade the way spring does.',
      order: 'Your order is seasonal: rhythms rather than rules, kept because they feel like growing.',
      action: 'You work in cycles, steady tending over heroic pushes, and your harvests prove the method.',
      body: 'Your health is agricultural: sun, movement, real food, and rest between seasons.',
    },
    domain_readings: {
      Expression: 'Your expression bears fruit: gardens, meals, projects that people can taste and hold. Make output a rhythm rather than an event. An orchard produces because producing is simply what it does.',
      Enjoyment: 'You enjoy abundance in its natural forms: tables full, gardens loud, seasons honored with their own pleasures. Guard the fallow time too. Delight, like soil, needs its resting years.',
      Children: 'Children and students flourish around you like well-watered rows: fed patiently, staked when young, given sun and left to grow. Your line, biological or chosen, tends to be fruitful and fond of you.',
    },
  },
  '木_伤官': {
    overview: 'Your Wood moves as the Virtuoso: growth that will not stay trellised. You branch where the plan said hedge, flower out of season, and produce originality the way forests produce spring, excessively and without apology. Every constraint reads as a suggestion. Your best work grows exactly where they told you nothing could.',
    functional: {
      mind: 'You think in wild branches: the unplanned connection, the growth no gardener predicted.',
      expression: 'You express organically and abundantly, ideas leafing faster than any format can hold.',
      order: 'You prune every rule you meet: dead convention falls fast, and only living structure earns your care.',
      action: 'You work in growth spurts toward light only you see. Fences slow you less than doubt.',
      body: 'Your energy is sap-driven: surging seasons, then hard winters that demand real rest.',
    },
    domain_readings: {
      Talent: 'Your talent is generative: new shoots daily, whole canopies of ideas. The gift needs an editor the way forests need clearings. Cut sightlines through your own abundance so the best trees show.',
      Performance: 'You perform by unveiling growth: the project no one authorized, suddenly in bloom. Time the reveals. A garden shown at flowering converts skeptics that a garden shown as seeds cannot.',
      Defiance: 'Your defiance is botanical: quiet, continuous, growing over walls rather than arguing with them. It wins by finished fact. Just verify the wall you are overgrowing is not holding your own soil.',
    },
  },
  '木_偏财': {
    overview: 'Your Wood moves as the Horizon: growth that reaches for distant light. Opportunity, for you, is territory: new markets, new cities, branches extended where no one from home has grown. You expand naturally and prune reluctantly. Fortune arrives through the reaching. Roots decide how much of it you keep.',
    functional: {
      mind: 'You think expansively: the next territory, the wider canopy, the branch worth risking.',
      expression: 'You speak in possibilities that make people pack their bags.',
      order: 'Your order is an open field with three fences: few rules, firmly placed, everything else left to range.',
      action: 'You grow toward opportunity steadily, extending reach every season without retreating.',
      body: 'Your energy expands with novelty and travel, and wilts in cramped pots.',
    },
    domain_readings: {
      Opportunity: 'Opportunities appear to you as open land: markets unplanted, niches unclaimed. You see fertile ground others call wilderness. Scout it, but check the soil before transplanting everything.',
      Ventures: 'Your ventures grow in groves: several trunks sharing a root system of skills and contacts. Let each mature before seeding the next. Orchards fail from planting fever, not planting.',
      Father: 'The father-thread runs green and rangy: a paternal figure of journeys, enterprises, or restlessness. His pattern of reaching shaped yours. Keep the reach, and plant the roots he may have skipped.',
    },
  },
  '木_正财': {
    overview: 'Your Wood moves as the Steward: growth banked in rings. You build worth the way orchards do, planted early, tended patiently, harvested honestly, replanted always. Assets in your care grow. So do people. Your fortune is cumulative and alive, and it rewards the seasons you refuse to rush.',
    functional: {
      mind: 'You think in compounding seasons: what today’s planting yields in ten rings.',
      expression: 'Your promises grow: modest words, expanding follow-through.',
      order: 'Your order grows in rows: planted routines, weeded weekly, yielding exactly what was sown.',
      action: 'You build annually: steady deposits of effort that quietly become an estate.',
      body: 'Your health compounds: small kept habits growing into late-life sturdiness.',
    },
    adj: { catalyst: ['Cultivating', 'Compounding', 'Deep-rooted'], friction: ['Root-bound', 'Risk-averse', 'Inflexible'] },
    domain_readings: {
      Wealth: 'Your wealth is orchard-shaped: productive assets, patient growth, income in seasons. Buy things that grow, land, skills, dividends, and let time do the heaviest lifting. It intends to.',
      Savings: 'You save like a granary: harvests stored against winters. Rotate the stock, reinvest the surplus, and remember granaries exist so that planting can be brave.',
      'Steady love': 'You love agriculturally: devotion planted deep, tended daily, expected to fruit for decades. Choose a fellow gardener. Then keep courting through every season, even the mud ones.',
    },
  },
  '木_七杀': {
    overview: 'Your Wood moves as the General: growth under discipline. Your ambition climbs like bamboo, fast, segmented, unstoppable, turning pressure into height. You command by growing first, taking the arrows meant for everyone behind you. Just remember trees also bend. The rigid campaign is the one that snaps.',
    functional: {
      mind: 'You think in campaigns of growth: heights to take, seasons to take them in.',
      expression: 'You speak in marching orders wrapped as encouragement: upward, together, now.',
      order: 'Your discipline is espalier: severe training, few branches, everything bent toward the chosen wall.',
      action: 'You advance relentlessly by stages, each node a consolidation before the next push.',
      body: 'Your energy is green iron: flexible strength that still requires dormant seasons.',
    },
    domain_readings: {
      Pressure: 'Pressure accelerates your growth: deadlines, competition, expectation all read as sunlight. Choose pressures that build height, and shed the ones that only strip bark.',
      Command: 'You command by example and altitude: first up, most exposed, setting pace. It inspires and it isolates. Grow lieutenants deliberately so the canopy is not one tree.',
      Crisis: 'In crisis you are the tree others shelter under: bending, holding, regrowing what storms take. After each one, tend your own roots first. Shelter has a maintenance cost.',
    },
  },
  '木_正官': {
    overview: 'Your Wood moves as the Magistrate: living order that grows. You build careers and codes like trellises, principled frames that help everything on them climb. Authority suits you when it nurtures. People accept your rules because your rules have leaves. Prune the dead ones each season and the frame stays believed in.',
    functional: {
      mind: 'You think in frameworks that grow: policies with branching plans.',
      expression: 'You give direction like a gardener: firm stakes, patient tone.',
      order: 'Order is your native climate: you grow straight inside good structure and warp without it.',
      action: 'You advance by cultivating order: process planted, tended, scaled.',
      body: 'Your health likes structured growth: progressive training, seasonal rest, upright posture.',
    },
    domain_readings: {
      Career: 'Your career grows like a managed forest: steady rings, widening responsibility, roots deepening in one good house. Choose organizations you would plant a decade in. Transplanting yearly wastes your kind of compounding.',
      Status: 'Your standing grows organically: respect accruing ring by ring until you are somehow the oak everyone consults. Let it. Just keep lower branches reachable.',
      Order: 'Your order is cultivated: rules as trellises rather than cages, standards that make growing easier. Systems you design get adopted willingly. Revisit them each season so the living thing never outgrows the frame.',
    },
  },
  '木_偏印': {
    overview: 'Your Wood moves as the Alchemist: knowledge grown rather than gathered. Understanding grafts onto you slowly and lives, ideas cross-pollinating in ways textbooks never planned. Your learning is a garden with strange hybrids. Tend it privately as you must, then let people taste the fruit. It is stranger and better than you think.',
    functional: {
      mind: 'You think by grafting: splicing distant ideas until something new takes root.',
      expression: 'You explain in organic metaphors: knowledge with soil still on it.',
      order: 'Your order is a walled garden: an inner system, strange from outside, flawlessly logical within.',
      action: 'You act on grown conviction: slow to sprout, deep-rooted once moving.',
      body: 'Your body learns like a plant: gradual conditioning, sunlight and quiet, no forced seasons.',
    },
    domain_readings: {
      Learning: 'You learn like an ecosystem: slowly, laterally, everything connecting to everything. Formal courses feel like pots. Give yourself wild ground, mixed sources, and the hybrids will astonish.',
      Intuition: 'Your intuition grows on the underside of awareness: a slow mycelium that suddenly fruits an answer. Give questions dormancy. What you cannot force overnight arrives by spring.',
      Solitude: 'Your solitude is a greenhouse: ideas need protected warmth before weather. Take the seclusion without guilt. Just transplant finished thoughts outdoors. Gardens are meant to be walked in.',
    },
  },
  '木_正印': {
    overview: 'Your Wood moves as the Sage: living shelter, the teaching tree. Care in you grows canopies, patience wide enough for slow learners, roots that hold ground for whole families. What you know, you plant in people. It is the gentlest power in the system. Just keep one sunny patch that grows things purely for you.',
    functional: {
      mind: 'You think in growth arcs: what this person could become with the right seasons.',
      expression: 'You teach by cultivation: questions as water, encouragement as light.',
      order: 'Your order is an old orchard’s: patient principles rather than posted rules, teaching by shade and season.',
      action: 'You act by tending: consistent small care that compounds into forests.',
      body: 'Your body thrives on green routine: nature, gentle movement, seasonal patience with yourself.',
    },
    domain_readings: {
      Knowledge: 'Your knowledge is arboreal: living, branching, taught best by walking someone through the grove. You learn to pass on. Teaching is how your roots drink.',
      Shelter: 'Your shelter is canopy: people rest under your patience and grow in your shade. The forest never asks who waters the oldest tree. Arrange your own rain.',
      Mother: 'The mother-thread is orchard-deep: a nurturing figure who planted daily, or soil you had to enrich alone. Either way you became the gardener. Tend your own roots with the same hands.',
    },
  },
  '火_比肩': {
    overview: 'Your Fire moves as the Twin: a flame that burns on its own fuel and stands level with every other light. You warm a gathering without needing to lead it, and you bristle when anyone tries to carry you. Two torches burn brighter side by side. That is your theory of company, and mostly it works.',
    functional: {
      mind: 'You think fast and first-person: what I would do arrives before what they meant.',
      expression: 'You speak with heat and certainty. People rarely wonder where you stand.',
      order: 'Your code is a kept flame: self-lit, self-tended, and no one else’s hand adjusts it.',
      action: 'You ignite your own starts and dislike waiting on anyone’s match. Momentum is personal.',
      body: 'Your energy burns bright and social: fed by activity, drained by standing in another’s shadow.',
    },
    domain_readings: {
      Peers: 'Your peers are fellow fires: vivid friends, loud tables, mutual sparks. The heat of comparison can flare into rivalry fast, so choose companions who celebrate blaze rather than compete for oxygen.',
      Independence: 'Fire independence is your own hearth: warmth that no one can dim by leaving. Build a life that stays lit in an empty house, and company becomes a pleasure instead of a fuel line.',
      'Self-reliance': 'You reignite yourself after setbacks that extinguish others, usually overnight. The skill to learn is banking coals: resting without calling it defeat, so the relight costs less each time.',
    },
  },
  '火_劫财': {
    overview: 'Your Fire moves as the Rival: flame that leaps between torches. You catch ambition from the people around you and pass yours back doubled, the most contagious energy in any gathering. Stakes make you luminous. The same draft that spreads your fire can spread it thin, so choose which blazes are actually yours.',
    functional: {
      mind: 'You think in surges: ideas arrive lit, borrowed sparks included, and sorting comes later.',
      expression: 'You talk people into things, including yourself. Enthusiasm is your native tongue.',
      order: 'Rules are heat to you: you honor the referee who survives your testing and burn past the rest.',
      action: 'You move fastest in a pack with a prize. Solo marathons dim you.',
      body: 'Your energy flares with company and stakes, then needs true dark to recover.',
    },
    domain_readings: {
      Rivalry: 'Your rivals are accelerants: nothing focuses your flame like a nearby blaze. Keep rivalry ritual, races and games and friendly scoreboards, so the heat builds camaraderie instead of ash.',
      'Shared stakes': 'You fund and join easily, splitting bills and risks in the same warm gesture. Enthusiasm signs faster than judgment reads. Let every shared blaze get one cold morning review before you pour fuel.',
      Boldness: 'Your boldness ignites others, which multiplies its consequences. Lead the charges worth leading. A spark that picks its tinder builds bonfires. One that does not builds regrets.',
    },
  },
  '火_食神': {
    overview: 'Your Fire moves as the Artisan: warmth that cooks instead of burns. You turn heat into hospitality, talent into entertainment, an ordinary evening into something people retell for years. Pleasure is your medium and generosity your technique. The feast only fails when the cook forgets to eat.',
    functional: {
      mind: 'You think in delight: what would make this warmer, tastier, more alive for everyone present.',
      expression: 'You express in performances of warmth: stories, meals, toasts that leave everyone lit.',
      order: 'Your discipline is a warm hearth: gentle routines that hold because they feed you.',
      action: 'You work best hosting the work: projects with an audience and a payoff people can enjoy.',
      body: 'Your energy loves festivity and pays for excess. Alternate feast days with hearth days.',
    },
    domain_readings: {
      Expression: 'Your expression is the lit table: cooking, performing, hosting, celebrating. It is real art, so treat it as one. The gatherings you make are the memories a whole circle keeps.',
      Enjoyment: 'You enjoy loudly and generously, and your appetite blesses whatever it touches. The discipline is savoring over consuming: fewer, better feasts. The flame tastes more when it eats slower.',
      Children: 'With the young you are the warm hearth: fun, feeding, festival. They will remember your kitchen as childhood itself. Add one steady ritual to the sparkle, so the warmth has a schedule they can lean on.',
    },
  },
  '火_伤官': {
    overview: 'Your Fire moves as the Virtuoso: light that must be seen. You are the flare, the show, the opinion that ignites the whole street, talent with a spotlight built in. Attention comes to you like oxygen and behaves like it too. Managed, you illuminate everything. Unmanaged, you are magnificent arson.',
    functional: {
      mind: 'You think in flashes: whole answers arriving lit, faster than you can show the working.',
      expression: 'You express in fireworks: dazzling, loud, unforgettable, occasionally singeing the front seats.',
      order: 'You outshine dull rules on principle and honor only the rare ones that dazzle back.',
      action: 'You act in brilliant bursts. Sustained grind dims you, so build around intensity.',
      body: 'Your energy is flare-shaped: spectacular output, real crashes. Sleep is your fire code.',
    },
    domain_readings: {
      Talent: 'Your talent is incandescent and public: performing, persuading, lighting ideas so others finally see them. It needs an audience the way flame needs air. Book the stage instead of apologizing for wanting one.',
      Performance: 'Performance is your natural habitat: the pitch, the stage, the moment all eyes turn. Rehearse enough to deserve the attention you attract. Brilliance plus preparation reads as destiny.',
      Defiance: 'Your defiance burns visibly: the public no, the bridge lit for warmth. Some bridges deserve it. Count to ten anyway, and keep a fireproof list of the ones that lead home.',
    },
  },
  '火_偏财': {
    overview: 'Your Fire moves as the Horizon: light that spends itself gladly. Opportunity finds you at gatherings, luck likes your laugh, and money arrives in blazes and leaves by the same door. You are fortune’s favorite dinner guest. Learn to pocket the bread, and the feast never really ends.',
    functional: {
      mind: 'You think in sparks of chance: tonight’s introduction, this week’s opening, luck as a live wire.',
      expression: 'You charm opportunity out of hiding: the pitch that feels like a party.',
      order: 'You run on sparks rather than schedules: two or three iron rules keep the rest free to stay weather.',
      action: 'You seize chances at speed, brilliant in windows, bored in pipelines.',
      body: 'Your energy is festive and spendy: fueled by occasions, emptied by them too.',
    },
    domain_readings: {
      Opportunity: 'Chances come to you socially: the tip at the table, the partner met at the party. Keep circulating, it is genuinely your economy. Just write things down before the candles burn out.',
      Ventures: 'Your ventures shine at launch: openings, campaigns, anything with a lit fuse and a crowd. Pair every firework with a caretaker who loves the quiet part. That partnership is your fortune.',
      Father: 'The father-thread flickers warm and irregular: a paternal figure of charisma, generosity, or absence in flares. You inherited the shine and the volatility. Spend the first, insure against the second.',
    },
  },
  '火_正财': {
    overview: 'Your Fire moves as the Steward: a hearth, not a bonfire. You keep warmth the way households keep flame, fed regularly, banked at night, never wasted on show. Your providing glows: steady income, warm table, festivals on schedule. It is the rarest fire, the kind that lasts.',
    functional: {
      mind: 'You think in fuel budgets: what sustains the warmth, what merely burns it.',
      expression: 'You promise warmly and deliver on time. Your word keeps people warm.',
      order: 'Your discipline banks the fire: steady hours and kept accounts that turn heat into lasting warmth.',
      action: 'You work in sustainable heat: consistent output that never needs rescue.',
      body: 'Your energy is banked flame: protected sleep, regular meals, celebration in season.',
    },
    domain_readings: {
      Wealth: 'Your wealth is hearth-warm: earned brightly, spent on the household’s glow, kept steady over spectacular. Fund the gatherings and the securities both. A warm home is your portfolio’s purpose.',
      Savings: 'You save for warmth: reserves that keep winters kind. Automate them so celebration cannot raid the woodpile. A banked fire relights fast. An empty grate does not.',
      'Steady love': 'You love like kept flame: daily warmth, faithful attention, romance on the calendar and off it. Your constancy is the gift. Add sparks deliberately so the hearth never assumes.',
    },
  },
  '火_七杀': {
    overview: 'Your Fire moves as the General: heat weaponized into will. You command like a charge, blazing conviction that armies of ordinary people find themselves following. Crisis makes you luminous. Peacetime makes you dangerous to furniture. Aim the cannon, always. Unaimed, this much fire tests every relationship it warms.',
    functional: {
      mind: 'You think in offensives: the bold stroke, the morale, the moment to charge.',
      expression: 'You speak fire into formations: rally, order, charge, all in one breath.',
      order: 'Your order is fire discipline: absolute at the front, enforced on yourself before anyone else feels it.',
      action: 'You attack problems frontally at full heat, and mostly the problems lose.',
      body: 'Your energy is artillery: devastating volleys, mandatory cooldowns, maintenance between engagements.',
    },
    adj: { catalyst: ['Swift', 'Daring', 'Crisis-ready'], friction: ['Scorching', 'Domineering', 'Burned-out'] },
    domain_readings: {
      Pressure: 'Pressure ignites you: stakes convert your heat into focus. Without real battles you invent them, so keep a worthy campaign running at all times, professional or physical.',
      Command: 'You command by fire: vision hot enough to melt objections. Troops follow the light. Mind the scorch radius, and let cooler officers handle the discipline your heat would burn.',
      Crisis: 'Crisis is your parade ground: you charge while others count. Victory loves you. Afterward, check who got trampled in the charge, including you.',
    },
  },
  '火_正官': {
    overview: 'Your Fire moves as the Magistrate: civic light, authority that illuminates. You carry rules the way lighthouses carry flame, visibly, warmly, for everyone’s navigation. People follow your lead because it brightens rather than binds. Office becomes you. Keep the light public and tended, and rank will keep arriving on its own.',
    functional: {
      mind: 'You think in public standards: what the light should show, who steers by it.',
      expression: 'You announce rather than memo: clarity with warmth, direction people can see.',
      order: 'You carry order like a lantern: visible standards others steer by, kept lit at personal cost.',
      action: 'You act as the example: first to follow the rule, brightest while doing it.',
      body: 'Your energy is ceremonial flame: strong on stage and schedule, needing dark hours off duty.',
    },
    domain_readings: {
      Career: 'Your career runs on visible service: roles where leading and lighting are the same act. Teaching, governance, the public face of good systems. Seek podiums attached to substance.',
      Status: 'Your standing is luminous and watched: warmth draws the credit and the scrutiny together. Live as if lit, because you are. The honest glow survives every inspection.',
      Order: 'Your order is inspirational: people comply because you made the rule glow with purpose. That is rare governance. Write things down too. Light needs a lamp when you leave.',
    },
  },
  '火_偏印': {
    overview: 'Your Fire moves as the Alchemist: illumination in a closed vessel. Your insight comes in flashes, sudden clarity that lights a whole cavern, then dims while you sketch what you saw. You understand things sideways, by vision rather than proof. Keep notebooks. The flashes are real, and unrecorded lightning teaches no one.',
    functional: {
      mind: 'You think in flashes: whole answers arriving lit, proofs assembled after.',
      expression: 'You explain in images that ignite: one metaphor doing an hour’s lecturing.',
      order: 'Your order is an observatory at night: private protocols, odd hours, instruments nobody else may touch.',
      action: 'You act on illumination: bursts of inspired work between contemplative dark.',
      body: 'Your energy strobes: brilliant hours, ash hours, restored by solitude and low light.',
    },
    domain_readings: {
      Learning: 'You learn by ignition: nothing for weeks, then a spark takes and you consume a field in days. Honor the cycle. Keep fuel stacked for when the flash comes.',
      Intuition: 'Your intuition arrives as vision: sudden, whole, and correct more often than you can justify. Note it immediately. The flash fades faster than the truth it showed.',
      Solitude: 'Your solitude is the dark that makes flashes visible: crowds wash out your signal. Reserve real darkness, evenings unplugged, questions held alone. Then carry the light out.',
    },
  },
  '火_正印': {
    overview: 'Your Fire moves as the Sage: hearth-wisdom, knowledge kept warm for others. You learned at somebody’s fireside, or built the fireside you never had, and now people gather at yours, fed soup and stories and courage. Your teaching glows rather than lectures. Keep logs aside for your own cold nights too.',
    functional: {
      mind: 'You think in warm stories: knowledge kept as tales that teach without lecturing.',
      expression: 'You encourage like firelight: people speak their best selves near you.',
      order: 'Your order is hearth law: warm principles enforced by welcome, correction that feels like being fed.',
      action: 'You care actively: soup made, lamps lit, courage rekindled by hand.',
      body: 'Your warmth needs fuel: real meals, real sleep, gatherings balanced with quiet embers.',
    },
    domain_readings: {
      Knowledge: 'Your knowledge lives as story: wisdom kept warm and passed mouth to mouth. You remember what mattered, not what was footnoted. Tell it often. Stories die refrigerated.',
      Shelter: 'Your shelter is firelight: people arrive cold and leave believing in themselves. That rekindling is rare medicine. Notice who only visits to warm their hands, and bank accordingly.',
      Mother: 'The mother-thread glows in you: a warming figure whose kitchen was church, or a cold hearth you swore to answer. Your tending is the answer. Let someone tend the tender.',
    },
  },
  '土_比肩': {
    overview: 'Your Earth moves as the Twin: ground that holds its own plot beside everyone else’s. You are the neighbor with the straight fence, generous across it, immovable about where it runs. Belonging matters to you, but merger does not. You stand with people the way hills stand in a range: together, and entirely yourselves.',
    functional: {
      mind: 'You think in boundaries and holdings: what is mine to carry, what is theirs, where the line sits.',
      expression: 'You say less than you know and stand behind all of it.',
      order: 'Your order is a surveyed boundary: you honor lines you drew and quietly ignore the rest.',
      action: 'You work your own plot at your own pace, and what you start gets finished, quietly.',
      body: 'Your energy is bedrock steady: unhurried, unshakable through long loads, renewed by routine.',
    },
    domain_readings: {
      Peers: 'Your peers are landholders like you: solid people with their own ground and no designs on yours. Trade help across fences freely. The neighbors you respect at seventy are the wealth this position promises.',
      Independence: 'Earth independence is owned ground: a home, a trade, a name that stands without cosigners. You will have it, because you refuse alternatives. Just leave a gate in the fence.',
      'Self-reliance': 'You carry your own weather and everyone else’s overflow without filing complaints. Twice a year, let someone shovel your side. The ground stays firmer when it is not also the whole world’s floor.',
    },
  },
  '土_劫财': {
    overview: 'Your Earth moves as the Rival: ground that expands by wager. You bet acreage where others bet coins, patient about the campaign, bold about the claim. Shared land, family stakes, and joint holdings follow you through life. You win them by daring and keep them by the paperwork you almost skipped.',
    functional: {
      mind: 'You think in claims and campaigns: what ground is winnable, and what holding it costs.',
      expression: 'You speak calmly about enormous bets, which makes people join them.',
      order: 'You test every fence by leaning: the ones that hold earn your respect and your best work.',
      action: 'You move deliberately then decisively: long surveys, sudden purchases.',
      body: 'Your energy is heavy machinery: slow to start, formidable engaged, needing scheduled idle.',
    },
    domain_readings: {
      Rivalry: 'Your rivalries are territorial and patient: the competing shop, the sibling’s acreage, the slow contest of estates. Compete by building better rather than holding harder. Ground won by improvement stays won.',
      'Shared stakes': 'Everything significant you own will at some point be co-owned: family land, joint ventures, marriages of assets. Survey early, deed clearly, and revisit the map annually. Your fortune lives in shared soil.',
      Boldness: 'Your daring moves mountains occasionally: the land bought unseen, the advantage taken calmly. Because your bets are heavy, space them. Earth recovers slowly from the ones that slide.',
    },
  },
  '土_食神': {
    overview: 'Your Earth moves as the Artisan: ground that sets a table. Nourishment is your native act, the meal made, the household provisioned, the comfort arranged before anyone asked. You produce abundance the way fields do, reliably and without spectacle. People leave your care fed in ways they cannot fully name.',
    functional: {
      mind: 'You think in provisions: who needs what, what stores are low, how comfort gets arranged.',
      expression: 'You express through provision more than proclamation. The full pantry is your love letter.',
      order: 'Your order is a well-laid table: unhurried routine, kept generously, upset by nothing except harshness.',
      action: 'You produce steadily and domestically, greatness in the daily bread rather than the grand gesture.',
      body: 'Your wellbeing is homestead-shaped: regular meals, familiar beds, seasons of honest work.',
    },
    domain_readings: {
      Expression: 'Your expression is the kept table: cooking, homemaking, the craft of comfort itself. It looks humble and it is foundational. Whole families run on exactly what you make daily.',
      Enjoyment: 'You enjoy the settled pleasures: harvest meals, familiar comforts, the deep satisfaction of enough. Let abundance be enjoyed, not only stored. A pantry is for feasts as well as winters.',
      Children: 'Children grow sturdy in your keeping: fed on time, held warmly, raised on rhythm. Yours is the house they bring their own children back to. Build it knowing that.',
    },
  },
  '土_伤官': {
    overview: 'Your Earth moves as the Virtuoso: ground that refuses to stay flat. You produce solid, startling things, the building nobody zoned, the old order reimagined from bedrock. Your rebellion wears work boots. It shows up early, builds the alternative, and lets the results argue. Slow genius, permanent output.',
    functional: {
      mind: 'You think in foundations others call impossible, then quietly draw the blueprints anyway.',
      expression: 'You express in built things: the model, the prototype, the standing proof.',
      order: 'You quake settled order to test its footing: what stands after your shaking, you build on.',
      action: 'You out-build objections. By the time they finish arguing, the structure is up.',
      body: 'Your energy is geological: massive reserves, slow spend, real quakes when pressed too long.',
    },
    domain_readings: {
      Talent: 'Your talent is constructive genius: making real what others only pitch. It compounds with patience, so pick projects worth years. Your monuments will outlast every clever thing said about them.',
      Performance: 'You perform through results: the opening day, the finished span, the harvest weighed. Let there be openings, invite people to what you built. Even mountains benefit from an unveiling.',
      Defiance: 'Your defiance is seismic: rare, slow, landscape-changing. When you finally move against a structure, you replace it. Use that power on things that matter, not on every irritating fence.',
    },
  },
  '土_偏财': {
    overview: 'Your Earth moves as the Horizon: ground that acquires. You accumulate opportunity the way land accumulates value, steadily, tangibly, with paperwork. Your ventures have foundations, your windfalls become holdings, and your generosity comes deeded. Fortune trusts you because you give it somewhere to live.',
    functional: {
      mind: 'You think in holdings: what appreciates, what depreciates, what the land under it is worth.',
      expression: 'You make offers people can stand on: concrete terms, real collateral.',
      order: 'Your order travels light for an Earth: campsite rules, pitched fast, struck without grief when the horizon calls.',
      action: 'You acquire deliberately: surveyed chances, patient closings, ownership that sticks.',
      body: 'Your energy is estate-like: unhurried, substantial, maintained by routine and good meals.',
    },
    domain_readings: {
      Opportunity: 'Your opportunities are tangible: property, inventory, businesses with floors and keys. You distrust vapor correctly. Walk the ground before buying it, and buy ground more often than promises.',
      Ventures: 'Your ventures should hold weight: real assets, real product, margins you can stack. Compound patiently. In your hands, boring holdings quietly outperform everyone’s exciting stories.',
      Father: 'The father-thread is foundational: a paternal figure tied to property, provision, or their weighty absence. What he built or failed to build shaped your acquiring. Build yours on your own survey.',
    },
  },
  '土_正财': {
    overview: 'Your Earth moves as the Steward: ground that keeps. This is stewardship in its home element, doubled: holdings maintained, households provisioned, value settled into soil. What enters your care appreciates. The risk is weight for its own sake. Keep the estate serving the family, not the family serving the estate.',
    functional: {
      mind: 'You think in inventory and upkeep: what is held, what it needs, what it is for.',
      expression: 'You commit in cornerstones: few words, permanent.',
      order: 'Your order is masonry: rule on rule, checked level, built to hold other people’s weight.',
      action: 'You maintain relentlessly: the fixed fence, the paid tax, the kept schedule.',
      body: 'Your health is a homestead: solid while kept up, creaky when routine slips.',
    },
    domain_readings: {
      Wealth: 'Your wealth is literal ground: property, durables, enterprises with deeds. In your element, holdings hold. Diversify just enough that one bad season cannot take the whole farm.',
      Savings: 'You save geologically: layers on layers, bedrock reserves. The craft is knowing enough. Set the number, then let the surplus fund life above ground.',
      'Steady love': 'You love in permanence: home built, name shared, decades assumed. It is the marrying ground itself. Bring the assumption out loud sometimes. Even bedrock likes being chosen again.',
    },
  },
  '土_七杀': {
    overview: 'Your Earth moves as the General: mass mobilized. Your authority is siege-grade, patient, inevitable, built of logistics and will. You do not charge. You surround, supply, and wait, and what you press eventually yields. People obey your stillness more than others’ shouting. Use that gravity on real fortresses.',
    functional: {
      mind: 'You think in sieges: supply lines, patience, which walls fall to time.',
      expression: 'You command in few words with tectonic weight. Repetition is beneath the mountain.',
      order: 'Your order is a fortress code: few gates, hard walls, and zero exceptions after dark.',
      action: 'You apply steady, crushing persistence. Nothing outlasts you on purpose.',
      body: 'Your energy is garrison-strength: vast, slow-burning, needing scheduled leave.',
    },
    domain_readings: {
      Pressure: 'You metabolize pressure into foundation: loads that flatten others become your footing. The watch-point is accumulation. Mountains crack invisibly first, so audit the strain you call normal.',
      Command: 'You command through immovability: the standard that does not shift, the decision that stays decided. It builds empires of order. Leave one gate for appeals, or the fortress becomes a wall.',
      Crisis: 'In crisis you are the ground itself: unshaken, absorbing, the place others stand. Afterward the ground deserves surveying too. Even bedrock records every earthquake somewhere.',
    },
  },
  '土_正官': {
    overview: 'Your Earth moves as the Magistrate: bedrock law, order with geological patience. You hold standards the way mountains hold borders, unmoved, unhurried, outlasting every argument. Institutions rest on people like you. The honor is real and so is the load. Survey what you carry, and set down the duties that were never yours.',
    functional: {
      mind: 'You think in precedent and foundation: what has held, what will keep holding.',
      expression: 'You rule in plain stone: few words, level, final.',
      order: 'You are the standing wall others build against: order is less your duty than your substance.',
      action: 'You keep order by bearing it: reliable weight, terms served fully.',
      body: 'Your health is load-bearing: strong under routine, needing the pack taken off some days.',
    },
    domain_readings: {
      Career: 'Your career is foundation work: operations, governance, the roles that hold everything up. Advancement comes as accumulated trust. Claim the title when it is due. Bedrock underasks.',
      Status: 'Your standing is landmark-grade: slow to build, nearly impossible to erode. People locate themselves by you. Accept the monument quietly and stay reachable at ground level.',
      Order: 'Your order is settled ground: rules that feel less like commands than terrain. Things stay where you put them. Walk the fences yearly. Even terrain shifts, and you shift last.',
    },
  },
  '土_偏印': {
    overview: 'Your Earth carries the Alchemist’s current: nourishment that arrives as understanding rather than comfort. This is ground that reads before it feeds, soil that turns experience over slowly until it becomes insight. It shelters you the way a library shelters, quiet, stocked, slightly apart, and it asks one rent: time alone to do the turning.',
    functional: {
      mind: 'Thinking runs deep and sideways. You digest slowly, connect strangely, and surface with conclusions no straight line could have reached.',
      expression: 'You speak after the thinking is done, so words come out finished. People mistake the pause for absence. It was assembly.',
      order: 'Your order is a cellar archive: private shelving no visitor can parse and you can walk blindfolded.',
      action: 'You act once the inner map is drawn. Slow to start, hard to derail, allergic to being rushed through step one.',
      body: 'Your energy pools and releases. Long stillness, then focused bursts. Rest for you is genuinely productive, not avoidance.',
    },
    adj: { catalyst: ['Deep-reading', 'Unhurried', 'Inventive'], friction: ['Withdrawn', 'Brooding', 'Shut-away'] },
    domain_readings: {
      Learning: 'Learning is where this Earth feeds you best. Not the classroom kind so much as the deep private kind: the obsession studied at midnight, the field entered through the side door. Give it one strange subject at a time and it will quietly out-earn every credential in the house.',
      Intuition: 'The hunch arrives before the reason does, and for you it is usually load-bearing. Treat the sudden knowing as a first draft: trust it enough to write it down, doubt it enough to check the math by morning.',
      Solitude: 'Time alone is this energy’s rent, and it collects whether you schedule it or not. Taken on purpose, solitude turns into your best material. Taken by accident, it curdles into distance from the people who were waiting outside the study.',
    },
  },
  '土_正印': {
    overview: 'Your Earth moves as the Sage: mother ground, nurture in its home element, doubled. You hold people the way land holds houses, unconditionally, for generations, without once mentioning the load. Wisdom settles in you and stays. The whole village builds on your patience. Somewhere in the acreage, keep a field that feeds only you.',
    functional: {
      mind: 'You think in generational wisdom: what held the family, what will hold it next.',
      expression: 'You comfort in few words: presence that says stay, eat, rest.',
      order: 'Your order is bedrock custom: unwritten, unhurried, and steadier than anything laminated on a wall.',
      action: 'You care by carrying: the meals, the moves, the long unthanked logistics.',
      body: 'Your body is the homestead: sturdy under routine, honest about weather, deserving repair too.',
    },
    domain_readings: {
      Knowledge: 'Your knowledge is settled sediment: practical wisdom layered by years, the kind villages consult. You know what actually works. Write the almanac down. Ground should not be the only copy.',
      Shelter: 'Your shelter is the family land itself: people return to you between every attempt at the world. Being home is holy work with no clock. Post seasons. Even land lies fallow.',
      Mother: 'The mother-thread is bedrock here: nurture received deep or a hollow you filled by becoming the ground yourself. Either origin made you everyone’s home. Claim one plot back.',
    },
  },
  '金_比肩': {
    overview: 'Your Metal moves as the Twin: a standing force that meets the world edge-first and equal. Nothing about you waits for permission. You hold your line the way a blade holds its shape, and you respect exactly the people who hold theirs. Company, for you, is two swords in one sheath: close, parallel, never fused.',
    functional: {
      mind: 'You think in positions taken: clear stances, held firmly, revised only by better steel than yours.',
      expression: 'You say it straight and once. Repetition feels like begging, so your words carry their full weight the first time.',
      order: 'Your standards are self-forged: exact, private, and enforced on yourself before anyone hears of them.',
      action: 'You act alone by default and finish what you start. Shared handles slow your swing.',
      body: 'Your energy is tempered and even: slow to tire, slow to bend, restored by solitary work.',
    },
    adj: { catalyst: ['Self-forged', 'Tempered', 'Unshakeable'], friction: ['Sealed-off', 'Rigid', 'Solitary'] },
    domain_readings: {
      Peers: 'Your peers are fellow blades: rivals you respect, colleagues you measure against, friends won through tested mettle. Keep two or three whose standards match yours. Iron sharpens iron is not a proverb to you. It is your social life.',
      Independence: 'Independence, in metal, is structural: you do not perform autonomy, you are made of it. Guard it without sealing it. A blade alone stays sharp but unused, and your edge exists for work that matters.',
      'Self-reliance': 'You carry your own weight and everyone can feel it. The practice to add is borrowing well: one tool, one favor, one opinion at a time. Even the finest steel was forged by other hands.',
    },
  },
  '金_劫财': {
    overview: 'Your Metal moves as the Rival: an edge that sharpens against other edges. Competition wakes you up, stakes clarify you, and you cut boldest when something real is on the table. Money and metal both change hands fast around you. The trick of your life is dueling without wounding, and betting without handing over the sword.',
    functional: {
      mind: 'You think in contests: openings, counters, what winning this exchange actually costs.',
      expression: 'Your words carry challenge even in kindness. Sparring is how you show interest.',
      order: 'You cross blades with every rule once: the ones that parry become your own code.',
      action: 'You strike while others weigh. Decisiveness under stakes is your cleanest edge.',
      body: 'Your energy spikes for contests and crashes after. Build recovery into the schedule like a trainer would.',
    },
    domain_readings: {
      Rivalry: 'Rivalry is your whetstone: you improve fastest with a named competitor in view. Choose rivals worth becoming, because you will absorb their shape. And retire each rivalry the day it stops sharpening and starts nicking.',
      'Shared stakes': 'You bet alongside people easily: ventures, splits, loans between friends. Metal keeps clean edges, so keep clean papers. The partnerships that survive you are the ones with terms as sharp as the trust.',
      Boldness: 'Your nerve is surgical: boldest when the cut is clear. Practice sizing the wager to the blade. Full force is for openings that deserve it, not for every glinting chance.',
    },
  },
  '金_食神': {
    overview: 'Your Metal moves as the Artisan: an edge that makes beautiful, useful things instead of wounds. Craft flows out of you calmly, finished on the first pass more often than seems fair. You feed people with precision, the perfectly chosen gift, the exact right word, and your pleasure runs quiet and specific.',
    functional: {
      mind: 'You think in finishes: how the rough thing becomes the polished one, step by even step.',
      expression: 'You say precise, kind things that people keep. Your compliments are engraved, not sprayed.',
      order: 'Your discipline is craft habit: the daily whetstone kept for pleasure and never as punishment.',
      action: 'You work in smooth passes, without drama or waste. The bench stays tidy and the output keeps coming.',
      body: 'Your wellbeing tracks your hands: making rests you, idleness corrodes, rhythm is your maintenance.',
    },
    domain_readings: {
      Expression: 'Your expression is craftsmanship: things made exactly, words placed cleanly, taste visible in every output. You do not need volume. One finished piece says what an hour of talk cannot, so keep finishing pieces.',
      Enjoyment: 'You enjoy like a connoisseur of the specific: the correct knife, the true note, the single well-made thing. Fund those pleasures without guilt. Precision delight is how this energy refuels its edge.',
      Children: 'With children and the people you mentor, you teach by craft: hands shown, tools trusted early, standards kept warm. What they inherit from you is the quiet confidence of making things properly.',
    },
  },
  '金_伤官': {
    overview: 'Your Metal moves as the Virtuoso: an edge that performs. You cut with style, argue like a fencing match, and produce work so sharp it draws blood and applause in the same stroke. Standards bore you unless you set them. Authority irritates you unless it earned itself. The world calls it attitude. It is precision refusing dullness.',
    functional: {
      mind: 'You think in critiques: instantly seeing the flaw, the fix, and the better version nobody ordered.',
      expression: 'Your wit cuts clean and quotable. People fear your reviews and collect them.',
      order: 'You cut rules open to see their workings: the well-made ones you sharpen, the rest you retire.',
      action: 'You execute with flourish, better than asked and different than specified.',
      body: 'Your energy runs keen and high-strung: honed by challenge, notched by tedium.',
    },
    domain_readings: {
      Talent: 'Your talent is the brilliant edge: work with finish other people cannot reach. Sign it, show it, price it properly. Metal brilliance that stays sheathed reads as arrogance without the receipts.',
      Performance: 'You perform with precision: the flawless delivery, the duel won in public. Choose stages where exactness shines, competitions, critiques, crafts. Applause for sharpness is the kind you can actually live on.',
      Defiance: 'Your defiance is the refusal to dull: standards no supervisor can lower, corners you will not round. Aim it at shoddiness rather than at every hand holding a clipboard. Rebellion with a portfolio wins.',
    },
  },
  '金_偏财': {
    overview: 'Your Metal moves as the Horizon: an edge pointed outward. You mint opportunity, spotting value with an assayer’s eye and striking while metal is hot. Deals sharpen you, markets read like open books, and money is a tool you handle without trembling. Fortune favors your precision. Fence one treasury it cannot touch.',
    functional: {
      mind: 'You think in valuations: what this is worth, to whom, and when the price moves.',
      expression: 'You pitch cleanly: terms polished, numbers ready, a handshake worth filing.',
      order: 'You keep a light code with hard edges: few laws, brightly kept, and everything else negotiable by noon.',
      action: 'You strike opportunities with timing others envy: measured approach, decisive cut.',
      body: 'Your energy is transactional and crisp: peaks in negotiations, restored by order.',
    },
    domain_readings: {
      Opportunity: 'You see openings as clearly as flaws in ore: the undervalued asset, the mispriced moment. Trust the eye and audit the appetite. Two ventures cut deep beat ten scratched shallow.',
      Ventures: 'Your ventures favor precision plays: quality arbitrage, timing trades, craft turned to commerce. Structure each like a blade, defined edge, clean handle, known length, and your record stays enviable.',
      Father: 'The father-thread in your chart carries metal: a paternal figure of standards, trade, or discipline whose mark shows in how you value things. Settle those accounts. Honor or forgiveness both count as payment.',
    },
  },
  '金_正财': {
    overview: 'Your Metal moves as the Steward: an edge in service of what it keeps. You maintain value with a craftsman’s discipline, tools oiled, accounts true, promises weighed before signing. Nothing gaudy, everything durable. What passes through your hands leaves better organized, and what stays becomes quietly excellent.',
    functional: {
      mind: 'You think in maintenance schedules: what needs truing before it breaks.',
      expression: 'You speak in accurate commitments: dates kept, numbers exact, words engraved.',
      order: 'Your order is a true ledger: entries exact, standards audited, loosened only by deliberate choice.',
      action: 'You execute with clean precision: zero waste, nothing reworked, every screw accounted for.',
      body: 'Your health runs on maintenance: tuned habits, regular checks, quality inputs.',
    },
    domain_readings: {
      Wealth: 'Your wealth is machined: earned exactly, kept polished, compounded without drama. You will never be flashy and never be broke. Invest in quality that holds its edge, including your own skills.',
      Savings: 'You save like an armorer: reserves as protection, kept bright and counted. The vault serves the life, so define what it defends, and spend without guilt inside those lines.',
      'Steady love': 'You love in maintained condition: reliability, kept promises, care with no rust on it. Choose someone who values upkeep, then schedule delight as faithfully as inspections.',
    },
  },
  '金_七杀': {
    overview: 'Your Metal moves as the General: edge given rank. Pressure organizes you, crisis promotes you, and your will cuts through what committees cannot. This is the sword in its born office, decisive, disciplined, feared a little and needed often. Command the campaigns worth blood. Sheathe everywhere else.',
    functional: {
      mind: 'You think in objectives: what falls first, what follows, what gets deliberately spared.',
      expression: 'You issue orders that sound like conclusions. People execute before questioning.',
      order: 'Your rules are field orders: few, absolute, and enforced first on your own conduct.',
      action: 'You strike decisively where others deliberate. Hesitation is not among your defects.',
      body: 'Your energy is martial: strengthened by training, corroded by idle tension.',
    },
    domain_readings: {
      Pressure: 'Pressure is your forge: you harden correctly under loads that crack others. Seek arenas with real stakes. Comfort dulls you faster than any enemy could.',
      Command: 'Command fits you like a sword fits its grip: natural, tested, dangerous if idle. Take charge where the mission deserves it, and practice the harder art, releasing command without losing edge.',
      Crisis: 'In crisis you become simple and effective: triage, decision, stroke. People will remember your calm longer than the emergency. Keep one habit for after: cleaning the blade, debriefing the heart.',
    },
  },
  '金_正官': {
    overview: 'Your Metal moves as the Magistrate: the law in its own element. Rules read to you like well-machined parts, and you keep them because precision deserves keeping. Rank finds you early, trust follows, and your signature means something. The discipline is real steel. Just check, yearly, that the code you enforce is still one you believe.',
    functional: {
      mind: 'You think in regulations and cases: what the standard says, where it applies.',
      expression: 'You speak with official weight: exact, citable, safe to build on.',
      order: 'You are the measure others calibrate to: exact, upright, and honest about your own tolerances.',
      action: 'You execute by the book you helped write: correct, complete, on time.',
      body: 'Your health obeys regimen: inspections kept, discipline holding the frame straight.',
    },
    domain_readings: {
      Career: 'Your career climbs through correctness: credentials, rank, a record without dents. Institutions promote you because you are what their rules dream of. Pick ones whose rules deserve you.',
      Status: 'Your standing is engraved, earned slowly, hard to tarnish. Guard it without worshiping it. A reputation is a tool for doing right at scale, not the point of the work.',
      Order: 'You produce order like a mint produces coin: standardized, trusted, circulating. Systems you touch stay fixed. Leave a tolerance in every spec. Perfect fits crack under weather.',
    },
  },
  '金_偏印': {
    overview: 'Your Metal moves as the Alchemist: a mind that refines. You take raw knowledge and smelt it, testing claims, discarding slag, keeping only what rings true when struck. Your insight is assay-grade and arrives in solitude. Share the refined ingots. The lonely part of the craft is the furnace, not the life.',
    functional: {
      mind: 'You think by refinement: melt the claim, pour off error, keep the metal.',
      expression: 'You speak rarely and precisely: conclusions already tested, edges deburred.',
      order: 'Your order is a locksmith’s bench: private tolerances, strange tools, and results that open what experts cannot.',
      action: 'You act after analysis: one clean stroke where others attempt ten.',
      body: 'Your body runs cool and exact: solitary recovery, tension pooling in the jaw and shoulders.',
    },
    domain_readings: {
      Learning: 'You learn by testing: every teaching struck against evidence before acceptance. Slow intake, permanent retention. Choose dense material worth the smelting. Shallow content wastes your furnace.',
      Intuition: 'Your intuition is metallurgical: a felt sense for what is alloyed with falsehood. When something rings wrong, it is wrong. Trust the ear and verify the details later.',
      Solitude: 'Solitude is your workshop: insight forms only with the door closed. Guard those hours without apology. Just open the shop some evenings. Refined gold unshared stays ore.',
    },
  },
  '金_正印': {
    overview: 'Your Metal moves as the Sage: tempered care, nurture with a fine edge of standards. You were shaped by teachings that held you to something, and you shelter others the same way, protection that also sharpens. Knowledge in your keeping stays true. Let some care through unpolished. Warmth needs no proofing.',
    functional: {
      mind: 'You think in tested doctrine: knowledge kept because it held under strikes.',
      expression: 'You teach in exact kindness: correction and care in the same clean line.',
      order: 'Your order is a keeper’s: principles held like heirlooms, polished by use, never brandished.',
      action: 'You act as trained: disciplined kindness, standards kept even while comforting.',
      body: 'Your body responds to disciplined rest: real recovery scheduled like practice.',
    },
    domain_readings: {
      Knowledge: 'Your knowledge is armory-grade: fewer books, deeply proofed, instantly deployable. You trust what survived testing. Curate hard, and reread the masters yearly. Your edge is depth.',
      Shelter: 'Your shelter is a forge-side bench: people come to you and leave straightened. You protect by tempering. Remember some visitors need only warmth. Not everything cracked wants rework.',
      Mother: 'The mother-thread runs steel-true: a nurturing figure of standards, or the ache where that discipline should have been. Her exactness lives in your caring. Keep the precision, soften the grading.',
    },
  },
  '水_比肩': {
    overview: 'Your Water moves as the Twin: a current that keeps its own channel while running beside others. You match people without merging into them, fluent in company, private in depth. Two rivers to the same sea is your model of friendship: shared direction, separate water, and no argument about whose current is whose.',
    functional: {
      mind: 'You think independently inside consensus: agreeing on the surface while your own current runs deeper.',
      expression: 'You speak easily and reveal selectively. The stream shows movement, not the bed.',
      order: 'Your discipline runs underground: a private channel steering you where public rules never reach.',
      action: 'You move at your own gradient: steady, self-directed, impossible to dam for long.',
      body: 'Your energy runs in currents: even output for weeks, then a quiet season to refill the source.',
    },
    domain_readings: {
      Peers: 'Your peers are parallel currents: fellow travelers heading the same direction by different beds. You collect companions across every landscape you cross. Keep a few for the whole length of the river, not just the pretty stretches.',
      Independence: 'Water independence is having your own source: income, opinions, and inner weather that no one else controls upstream. Protect the headwaters. Everything else about you can flex.',
      'Self-reliance': 'You route around what others need rescuing from, so smoothly that nobody notices there was an obstacle. Occasionally say the obstacle out loud. Even self-sufficient rivers deserve witnesses.',
    },
  },
  '水_劫财': {
    overview: 'Your Water moves as the Rival: current that races current. You compete the way tides do, quietly, continuously, gaining by inches that look like accidents. Shared flows suit you: pooled funds, joint journeys, split winnings. Just remember that merged water is hard to unmix. Mark what is yours before the confluence.',
    functional: {
      mind: 'You think in currents of advantage: where things flow, who is upstream, what leaks.',
      expression: 'You compete so smoothly it reads as cooperation until the finish.',
      order: 'You probe order like water probes a dam: respectfully, constantly, and straight through the first crack.',
      action: 'You advance through openings others miss, water finding the crack in every dam.',
      body: 'Your energy ebbs and floods: read your own tide chart and schedule accordingly.',
    },
    domain_readings: {
      Rivalry: 'Your rivalries run underwater: unspoken races, silent measurements, positions gained without visible waves. Surface one or two. A named, laughing rivalry refreshes you more than ten secret ones.',
      'Shared stakes': 'Money and effort pool around you like watersheds: group funds, family flows, blended accounts. You track it all mentally and forgive it all eventually. Put banks around what must not flood away.',
      Boldness: 'Your daring is fluid: risks taken by drift and momentum more than announcement. It carries you far. Just check occasionally that the current you are riding is one you chose.',
    },
  },
  '水_食神': {
    overview: 'Your Water moves as the Artisan: a spring that feeds everything downstream. Your output flows, words, ideas, comfort, care, without visible effort, and people drink from it more than you notice. You nourish by permeating: the right thing said gently, the mood eased, the story that waters a dry week.',
    functional: {
      mind: 'You think in nourishing streams: what this person needs to hear, and the gentlest channel for it.',
      expression: 'Your expression pours: fluent, warm, endlessly refilled. Writing and talk both come as flow.',
      order: 'Your order flows: soft routines that bend around life and still arrive where they meant to.',
      action: 'You produce continuously in small volumes, a stream that quietly out-carries the dramatic flood.',
      body: 'Your energy is a spring: generous when protected, muddied by overdraw. Guard the source.',
    },
    adj: { catalyst: ['Fluent', 'Nourishing', 'Easygoing'], friction: ['Drifting', 'Indulgent', 'Unstirred'] },
    domain_readings: {
      Expression: 'Your expression is the stream itself: writing, conversation, comfort flowing daily. Volume is natural to you, so add channels: publish, record, send. Water that reaches others is what turns gift to harvest.',
      Enjoyment: 'You enjoy in gentle currents: long baths, slow music, conversation into the night. Honor these as necessities. A spring that is never let pool goes brackish.',
      Children: 'With the young you nourish invisibly: the listening, the softening, the words that raise them without their noticing. They will quote you for life, usually without knowing whom they are quoting.',
    },
  },
  '水_伤官': {
    overview: 'Your Water moves as the Virtuoso: a current too clever for its banks. You express in floods of insight, subversive, fluid, impossible to police, the writer between the lines, the wit that erodes pomposity by morning. Nothing contains you long. The art is choosing what your torrent carves next.',
    functional: {
      mind: 'You think around things: under rules, past assumptions, arriving where logic swims later.',
      expression: 'Your expression flows subversive and quotable, satire and insight braided into one current.',
      order: 'You erode order you never argue with: convention wears away wherever your current disagrees.',
      action: 'You erode obstacles rather than storming them: patient, fluid, suddenly through.',
      body: 'Your energy is tidal and cerebral: brilliant tides, murky lows, cleared by moving water.',
    },
    domain_readings: {
      Talent: 'Your talent is fluid genius: writing, strategy, humor, any craft where thought must flow around form. It resists containers and needs them. Choose loose ones, essays, seasons, series, and pour.',
      Performance: 'You perform by currents: the essay that spreads, the remark that travels. Your stage is wherever words flow. Publish more, polish less. Rivers are judged by movement, not by stillness.',
      Defiance: 'Your defiance dissolves things: authority mocked into smallness, rules outlived rather than fought. It is elegant and it accumulates enemies slowly. Now and then, defend something openly. It sweetens the water.',
    },
  },
  '水_偏财': {
    overview: 'Your Water moves as the Horizon: current that finds every sea. Opportunity reaches you through flow, conversations, crossings, currents of information arriving before the news does. Your fortune is distributive: many streams, wide deltas, wealth that moves. Dam a portion. Deltas are rich and hard to hold.',
    functional: {
      mind: 'You think in flows of information: who knows what, where value moves next.',
      expression: 'You trade in currents: tips shared, introductions made, value moving through your words.',
      order: 'Your order is tidal: it organizes around opportunity and needs one fixed shore to come back to.',
      action: 'You move liquidly between chances, in early, out clean, rarely anchored.',
      body: 'Your energy circulates: many light engagements over one heavy load, refreshed by travel.',
    },
    domain_readings: {
      Opportunity: 'Your chances arrive by water: distant markets, moving information, the current nobody else has felt yet. Act while it is early. Your edge is timing, and timing evaporates.',
      Ventures: 'Your ventures should float: trade, media, logistics, anything that moves. Portfolios over monuments. Keep each light enough to steer and honest enough to dock anywhere.',
      Father: 'The father-thread flows distant or briny: a paternal figure of travel, commerce, or currents that carried him elsewhere. From him, your range. The mooring you may have to build yourself.',
    },
  },
  '水_正财': {
    overview: 'Your Water moves as the Steward: current disciplined into irrigation. You manage flows, income streams, schedules, family logistics, with the calm of a well-run canal. Nothing floods, nothing dries. It is unglamorous mastery, and every life around you runs smoother because your channels hold.',
    functional: {
      mind: 'You think in flows and reservoirs: what comes in, what goes out, what pools.',
      expression: 'You communicate in reliable streams: the update sent, the answer returned, always.',
      order: 'Your order irrigates: careful channels that turn every drop of effort toward something that grows.',
      action: 'You administer gracefully: systems, budgets, routines that run without drought.',
      body: 'Your health is hydraulic: consistent sleep, steady intake, motion that keeps circulation honest.',
    },
    domain_readings: {
      Wealth: 'Your wealth is flow-managed: salaries channeled, streams diversified, leaks found early. You prosper by routing, not risking. Map the canals once a year and fortune stays irrigated.',
      Savings: 'You save in reservoirs: automatic diversions filling quiet pools. Name each pool’s purpose, storm, harvest, joy, and the discipline becomes drinkable.',
      'Steady love': 'You love in reliable supply: presence delivered daily, needs anticipated, storms weathered by good infrastructure. Choose someone who notices plumbing. Then surprise the schedule occasionally. Even canals enjoy weather.',
    },
  },
  '水_七杀': {
    overview: 'Your Water moves as the General: force that arrives as tide. You command indirectly, positioning, timing, the pressure of inevitability, and opponents find themselves outflanked by someone who never raised a voice. Strategy is your sword arm. The deep game, played patiently, with the current doing the marching.',
    functional: {
      mind: 'You think three tides ahead: position, advantage, the battle won before contact.',
      expression: 'You direct in suggestions that turn out to be orders in retrospect.',
      order: 'Your discipline moves like a cold current: quiet, total, and felt only when someone crosses it.',
      action: 'You apply pressure like water: total, patient, finding every gap in the defense.',
      body: 'Your energy is deep current: enormous, unhurried, dangerous to overdraw.',
    },
    domain_readings: {
      Pressure: 'You convert pressure into depth: threats make you quieter and more exact. Beware pressure you keep underwater. Even oceans need to storm occasionally.',
      Command: 'You command by current: framing choices, shaping terrain, letting people arrive at your conclusion. It is masterful and unsettling. Show the hand sometimes. Trust grows where strategy is visible.',
      Crisis: 'In crisis you flow while others freeze: instant rerouting, calm surface, decisive undertow. You will save situations quietly and collect credit never. Log your victories somewhere. Currents deserve historians.',
    },
  },
  '水_正官': {
    overview: 'Your Water moves as the Magistrate: navigable law, order that flows. You govern the way good rivers govern valleys, setting course without shouting, adjusting to terrain while staying a river. Your rules bend around cases and still arrive at the sea. It is the subtlest authority, and people obey it thinking they chose to.',
    functional: {
      mind: 'You think in channels and cases: where the rule should flow, where it should pool.',
      expression: 'You direct fluently: guidance that reads as conversation and lands as policy.',
      order: 'Your order runs like a canal: dug once with care, then carrying everyone’s traffic for decades.',
      action: 'You administer adaptively: process that reroutes around obstacles without losing the sea.',
      body: 'Your health is regulated flow: steady rhythms, flexible plans, stagnation as the only enemy.',
    },
    domain_readings: {
      Career: 'Your career advances by navigation: reading currents, timing passages, arriving at rank without visible strain. Diplomacy, coordination, the harbor-master roles. Your course is quiet and it compounds.',
      Status: 'Your standing spreads like watershed reputation: carried by word of mouth into places you have never been. Tend the source. Everything downstream tastes of it.',
      Order: 'Your order is current-shaped: rules that adapt to terrain yet keep direction. People experience your governance as ease. Document the channel, or it evaporates when you do.',
    },
  },
  '水_偏印': {
    overview: 'Your Water moves as the Alchemist: depth studying itself. Knowledge does not sit in you, it dissolves, becoming a dark solution where fields merge and strange clarities precipitate. You understand what people have not said yet. The depth is real and isolating. Surface on a schedule, carrying one crystal at a time.',
    functional: {
      mind: 'You think in solution: everything dissolved together until the pattern precipitates.',
      expression: 'You surface rarely with words: distilled, unsettling, accurate.',
      order: 'Your order is an underground river: no visible banks, yet it arrives exactly where it intended.',
      action: 'You act from the deep read: moves that seem sudden and were years in solution.',
      body: 'Your body is tidal: rhythms of immersion and surfacing, drained by shallow noise.',
    },
    domain_readings: {
      Learning: 'You learn by immersion: total absorption until a field saturates and understanding crystallizes whole. Interrupted immersion loses everything, so defend the deep dives. Come up between them.',
      Intuition: 'Your intuition is sonar: reading what moves beneath speech, sensing the shape of the unsaid. It is uncannily accurate about people. Verify before acting. Sonar shows shape, never color.',
      Solitude: 'Your solitude is the deep itself: home pressure, true thinking depth. The danger is forgetting the surface has weather worth feeling. Schedule the ascent. Bring someone a pearl.',
    },
  },
  '水_正印': {
    overview: 'Your Water moves as the Sage: the source spring, nourishment that never announces itself. Care flows from you the way aquifers feed valleys, invisibly, constantly, taken for granted precisely because it never fails. You absorb others’ storms and hand back calm. Watch your own water table. Springs fail silently first.',
    functional: {
      mind: 'You think in absorbed understanding: knowledge soaked up whole, recalled as instinct.',
      expression: 'You soothe as you speak: words that lower the listener’s water line.',
      order: 'Your order is a spring-fed pool: principle rising quietly from depth, settling everyone who sits near it.',
      action: 'You sustain quietly: needs met before they were named, credit declined.',
      body: 'Your body absorbs ambient stress: it needs literal water, sleep, and shores away from everyone.',
    },
    domain_readings: {
      Knowledge: 'Your knowledge is absorbed rather than studied: understanding soaked from every source you touch. You know more than your credentials admit. Let it surface. Springs are meant to be found.',
      Shelter: 'Your shelter is stillness: people pour out their storms and you hand back a level surface. That absorption has a cost curve. Drain what you take in somewhere safe.',
      Mother: 'The mother-thread runs like groundwater: nurture that seeped in early and constant, or a dryness you learned to spring against. You became water for others either way. Refill upstream.',
    },
  },
};
