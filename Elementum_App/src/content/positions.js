// ===================================================================
// ELEMENTUM · positions — the POSITION axis (REA_02 §5e, LOCKED ×70)
// ===================================================================
// Owner construct 2026-08-19; corpus locked 2026-08-19 (template
// pianyin_month_branch, batch authored to it). Configurations are NAMED
// EVENTS: "The Alchemist inside the Month Gate · 偏印在月支". Every
// reading DECLARES its ruled domains (canonical taxonomy ×8) first.
// Station truth: by_axis/json/POSITION/*.json; this file is the
// deliberate transcription (REA_05).
// ===================================================================

export const GATES = { year: 'Year Gate', month: 'Month Gate', day: 'Day Gate', hour: 'Hour Gate' };
export const GATE_ZH = { year: '年柱', month: '月柱', day: '日柱', hour: '时柱' };

export const DOMAIN_TAXONOMY = ['Wealth', 'Health', 'Career', 'Love', 'Family', 'Social', 'Mind', 'Growth'];

export const SLOTS = [
  { id: 'year_stem', gate: 'year', kind: 'stem', zh: '年干' },
  { id: 'year_branch', gate: 'year', kind: 'branch', zh: '年支' },
  { id: 'month_stem', gate: 'month', kind: 'stem', zh: '月干' },
  { id: 'month_branch', gate: 'month', kind: 'branch', zh: '月支' },
  { id: 'day_branch', gate: 'day', kind: 'branch', zh: '日支' },
  { id: 'hour_stem', gate: 'hour', kind: 'stem', zh: '时干' },
  { id: 'hour_branch', gate: 'hour', kind: 'branch', zh: '时支' },
];

export const positionTerm = (persona, slot) =>
  `${persona} ${slot.kind === 'stem' ? 'at' : 'inside'} the ${GATES[slot.gate]}`;
export const positionZh = (godHz, slot) => `${godHz}在${slot.zh}`;

// The locked corpus ×70, keyed `${godId}_${slotId}`.
export const POSITION_READINGS = {
  bijian_year_stem: {
    domains: ['Social', 'Family'],
    defline: 'The Twin stands at your Year Gate: independence is the first thing your story shows, inherited and worn openly.',
    reading: 'This position rules Social and Family. Your line carries self-made people, and it shows: from early on you read as someone who stands on their own feet. Support from home came as example more than shelter, and you learned to treat help as optional. Peers matter to you the way siblings do, chosen and equal. Let some of them in past the handshake. Standing alone began as heritage. It does not have to be a habit.',
  },
  bijian_year_branch: {
    domains: ['Family', 'Growth'],
    defline: 'The Twin lives inside your Year Gate: the root of your early world was learning to hold your own.',
    reading: 'This position rules Family and Growth. Somewhere in the first chapters, you became your own backup: a childhood that asked you to be sturdy early, among siblings, cousins, or a house that treated small people as capable ones. The root took. Self-reliance, for you, is a place you come from rather than a skill you learned. Watch one thing: roots this firm can quietly refuse replanting. Some help is worth accepting just to remember how.',
  },
  bijian_month_stem: {
    domains: ['Career', 'Social'],
    defline: 'The Twin stands at your Month Gate: the working world sees a colleague who carries their own weight, visibly.',
    reading: 'This position rules Career and Social. At work you read as the equal, never the subordinate: someone who takes a task and owns it whole. Colleagues trust you and rarely manage you, because managing you visibly fails. You rise on competence and independence rather than alliance. The cost sits close by: partnerships halve your speed, and you feel it. Learn to share the wheel on the long trips. The short ones are yours.',
  },
  bijian_month_branch: {
    domains: ['Career', 'Growth'],
    defline: 'The Twin holds your chart’s strongest seat: your prime runs on self-reliance, built into the frame itself.',
    reading: 'This position rules Career and Growth, from the deepest seat a chart has. The engine of your working life is your own two hands: you build careers you can hold alone, and you flourish where autonomy is real. Bosses either learn this or lose you. Money made with partners tends to blur, so keep the accounts clean and the equity written down. Your prime is self-propelled. Fuel it with skill, not just stubbornness.',
  },
  bijian_day_branch: {
    domains: ['Love', 'Social'],
    defline: 'The Twin sits in your spouse palace: you partner as an equal, and only as an equal.',
    reading: 'This position rules Love and Social. In close relationships you need a peer, someone whose spine matches yours, and romance built on leaning does not hold you. The home you make has two captains, which is its strength and its argument. Competition can slip into the kitchen: score-keeping, parallel lives, love as a quiet contest. Choose a partner you admire, then practice the one move the Twin resists. Letting them carry you sometimes.',
  },
  bijian_hour_stem: {
    domains: ['Growth', 'Family'],
    defline: 'The Twin stands at your Hour Gate: what you show the future is independence, taught by demonstration.',
    reading: 'This position rules Growth and Family. The later chapters of your life keep their own keys: you intend to need nobody, and you will likely manage it. What you pass on, to children or the people who learn from you, is self-sufficiency shown rather than preached. Fine inheritance. Add warmth to it deliberately, because the young remember who stood alone, and they also remember who stood alone with the door open.',
  },
  bijian_hour_branch: {
    domains: ['Family', 'Growth'],
    defline: 'The Twin lives inside your Hour Gate: the root of your late life is company of equals, kept small and true.',
    reading: 'This position rules Family and Growth. Your harvest years run on a few chosen peers: the friends who became family, the children raised to stand level with you. The root here wants respect more than care, and it will trade comfort for dignity every time. Build the small circle now that you intend to grow old inside. Independence ages best with two or three people who never needed you weak to love you.',
  },
  jiecai_year_stem: {
    domains: ['Wealth', 'Social'],
    defline: 'This bold companion stands at your Year Gate: daring runs in the visible bloodline.',
    reading: 'This position rules Wealth and Social. The world met you early as the fearless one, and some of that nerve was inherited: a family line of risk-takers, sharers, spenders, or all three. Money moved fast around your beginnings, in and out. You learned that fortune is a current, not a vault. Keep the boldness, it opens doors that patience cannot. Just notice who always seems to be holding your wallet when the music stops.',
  },
  jiecai_year_branch: {
    domains: ['Family', 'Wealth'],
    defline: 'Inside your Year Gate sits the shared purse: early life taught you that what is yours is rarely only yours.',
    reading: 'This position rules Family and Wealth. The root of your story involves pooled resources: family money shared, contested, or carried together, siblings close enough to borrow without asking. It made you generous and it made you alert. As an adult you give easily and track quietly. Honor both instincts. Share on purpose rather than by leakage, and let written clarity protect the relationships that looseness would eventually cost you.',
  },
  jiecai_month_stem: {
    domains: ['Career', 'Social'],
    defline: 'At your Month Gate stands the daring colleague: the working world sees your nerve first.',
    reading: 'This position rules Career and Social. Professionally you read as the one who will make the call others are still pricing: bold in negotiation, quick to bet on yourself, magnetic in a team and expensive to compete with. Careers with real stakes suit you, sales floors, launches, turnarounds. Steady ladders bore you into mischief. Pick arenas where daring is the job description, and keep one cautious friend close for the days nerve needs a brake.',
  },
  jiecai_month_branch: {
    domains: ['Career', 'Wealth', 'Social'],
    defline: 'Inside your Month Gate runs the gambler’s current: your prime years are built for bold, shared ventures.',
    reading: 'This position rules Career and Wealth, with Social close behind. The strongest seat of your chart runs on shared risk: partnerships, ventures, teams that bet together. Alone you are quick. Allied you are formidable, and the money follows the alliances. The same current drains carelessly: split equity, loose loans, friends who become expenses. Structure is not the enemy of your boldness. It is what lets you afford the next bet.',
  },
  jiecai_day_branch: {
    domains: ['Love', 'Wealth'],
    defline: 'In your spouse palace lives the fellow gambler: love, for you, is a joint venture with real stakes.',
    reading: 'This position rules Love and Wealth. Intimacy arrives as alliance: you fall for people with nerve, and your best partnerships feel like two players sharing one bankroll. It makes for a vivid home and an eventful ledger. Money and love will braid together, so braid them deliberately: shared goals, named accounts, honest stakes. The relationship thrives on adventure. It survives on the agreements you make before the adventure starts.',
  },
  jiecai_hour_stem: {
    domains: ['Wealth', 'Growth'],
    defline: 'At your Hour Gate stands the risk-taker: your later ambitions stay bold, and visibly so.',
    reading: 'This position rules Wealth and Growth. You do not intend to retire quietly: the later chapters keep a wager in them, a venture, a reinvention, a door bought open. The young see your nerve and borrow it, which is a genuine gift. Guard the principal, though. Late-life boldness pays best when the downside is fenced. Keep a portion untouchable, and let the rest play. That balance is the whole art of your finish.',
  },
  jiecai_hour_branch: {
    domains: ['Family', 'Wealth'],
    defline: 'Inside your Hour Gate sits the shared harvest: what you build late in life is built with others.',
    reading: 'This position rules Family and Wealth. Your harvest wants company: children, proteges, partners who hold a piece of what you made. Handled well, this is the warmest ending a chart can write, a table of people invested in each other. Handled loosely, it is an estate dispute. Decide early what is shared and what is sealed, and say it out loud while everyone still laughs easily. Generosity plans best before it is needed.',
  },
  shishen_year_stem: {
    domains: ['Social', 'Health'],
    defline: 'The Artisan stands at your Year Gate: ease and charm are the first things your story shows.',
    reading: 'This position rules Social and Health. You arrived with a light touch: a childhood face that put people at ease, a family style that valued good food, good humor, or good craft. Wellbeing is your inheritance, and it shows in how naturally you host, soothe, and enjoy. The shadow is softness: a start this comfortable can under-build ambition. Keep the warmth, it is real wealth. Just give it something worth making.',
  },
  shishen_year_branch: {
    domains: ['Family', 'Health'],
    defline: 'The Artisan lives inside your Year Gate: the root of your early world was nourishment, given and remembered.',
    reading: 'This position rules Family and Health. Somewhere early, someone fed you well, in meals or in patience, and the root took: you carry an instinct for care that feels ancestral. Your body keeps score gently but honestly, thriving on rhythm, rest, and pleasure taken without guilt. Recreate the nourishing house you came from, or the one you wish you had. For you, wellbeing is not maintenance. It is lineage.',
  },
  shishen_month_stem: {
    domains: ['Career', 'Social'],
    defline: 'The Artisan stands at your Month Gate: the working world sees the maker, gracious and unhurried.',
    reading: 'This position rules Career and Social. Professionally you read as the craftsman: the one whose work has finish, whose manner has warmth, who makes hard things look pleasant. Fields that reward taste suit you, teaching, food, design, care, and craft. Cutthroat arenas waste you. Your reputation compounds through work people enjoy receiving. Protect your pace, because your gift dies in a sweatshop and sings in a workshop.',
  },
  shishen_month_branch: {
    domains: ['Career', 'Health'],
    defline: 'The Artisan holds your chart’s strongest seat: your prime runs on craft, flow, and sustainable pleasure.',
    reading: 'This position rules Career and Health from the deepest seat there is. Your working prime is built for the long, warm road: mastery over grind, flow over force, a career shaped like a craft practiced daily until it feeds you. Burnout is your one real enemy, because it attacks the exact spring your success flows from. Choose work you could love for twenty years. In this chart, enjoyment is not a bonus. It is the engine.',
  },
  shishen_day_branch: {
    domains: ['Love', 'Family', 'Health'],
    defline: 'The Artisan sits in your spouse palace: home, for you, is where life gets savored.',
    reading: 'This position rules Love and Family, and it feeds Health. Intimacy arrives through the senses and the table: you love by cooking, hosting, easing, and you need a partner who can receive pleasure without suspicion. The home you build tends toward warmth, children, creatures, and comfort. Its risk is drift, sweetness with no spine. Keep one shared project alive with your partner. Delight deepens fastest when it is making something.',
  },
  shishen_hour_stem: {
    domains: ['Family', 'Career'],
    defline: 'The Artisan stands at your Hour Gate: what you show the future is the joy of making.',
    reading: 'This position rules Family and Career in their late-season forms. Your output grows more personal with age: the craft becomes teaching, the work becomes gifts, and children or students inherit your hands as much as your words. You will likely make your best things after fifty, when taste has finished compounding. Plan a legacy you can touch, books, gardens, tables, students. Yours is the kind that must be made, not merely left.',
  },
  shishen_hour_branch: {
    domains: ['Family', 'Health'],
    defline: 'The Artisan lives inside your Hour Gate: your harvest is children, comfort, and a well-fed old age.',
    reading: 'This position rules Family and Health at the root of late life. This is a blessed seat: children who stay warm toward you, appetites that survive age, an ending with flavor in it. It rewards early tending, the health kept now, the young fed patiently, the pleasures practiced rather than postponed. Build the orchard in your forties. This root intends you to sit in its shade, tasting what you planted.',
  },
  shangguan_year_stem: {
    domains: ['Social', 'Mind'],
    defline: 'Brilliance stands at your Year Gate: the first thing your story shows is a spark that refuses dimming.',
    reading: 'This position rules Social and Mind. You were the noticeable child: quick-tongued, gifted, allergic to being underestimated. Early audiences shaped you, applause or the fight for it, and your public self still carries that shine and that chip. People remember meeting you. Some remember being scorched. The talent is genuine currency, so spend it on stages worth the light, and let small slights pass unanswered. Not every spark owes the world a fire.',
  },
  shangguan_year_branch: {
    domains: ['Family', 'Growth'],
    defline: 'Brilliance lives inside your Year Gate: you were rooted in a house that talent had to outgrow.',
    reading: 'This position rules Family and Growth. The root of your story holds friction with the given order: a family whose rules your gift pressed against, a lineage you honor best by exceeding. Rebellion here is a method rather than a phase, how you learned to think. As an adult, authority still smells like childhood to you. Choose your defiances the way you choose tools, deliberately. The ones you inherit run you. The ones you pick serve you.',
  },
  shangguan_month_stem: {
    domains: ['Career', 'Social'],
    defline: 'Brilliance stands at your Month Gate: the working world sees the performer, dazzling and hard to manage.',
    reading: 'This position rules Career and Social. Professionally you are the show: articulate, inventive, visibly better than the brief, and famously difficult to supervise. Fields with stages suit you, media, advocacy, design, performance, anywhere output is signed. Bureaucracy makes you a saboteur. Your name will travel farther than your resume, for praise and for friction alike. Master one discipline completely, because dazzle with foundations is a career. Dazzle without them is a season.',
  },
  shangguan_month_branch: {
    domains: ['Career', 'Mind'],
    defline: 'Brilliance holds your chart’s strongest seat: your prime is built to break forms and sign the result.',
    reading: 'This position rules Career and Mind from the chart’s deepest seat. Your prime runs on creative force strong enough to bend the trade you enter: you see the better way immediately and cannot politely unsee it. Employers experience you as weather. The resolution is authorship, work where your name absorbs your output, founding, art, research, reform. Aim the force at problems, not personnel. Genius forgiven is genius that picked its battles.',
  },
  shangguan_day_branch: {
    domains: ['Love', 'Mind'],
    defline: 'Brilliance sits in your spouse palace: intimacy, for you, is vivid, verbal, and never beige.',
    reading: 'This position rules Love and Mind. You love with the volume up: wit, intensity, honesty past the comfortable line. A partner must be an audience and a sparring mate at once, quick enough to enjoy you, sturdy enough not to bruise. Dull peace reads to you as death, so you will test calm just to feel the current. Learn the difference between spark and damage. The right person wants your fire warm, not proven.',
  },
  shangguan_hour_stem: {
    domains: ['Career', 'Growth'],
    defline: 'Brilliance stands at your Hour Gate: your later years intend to be seen, and heard.',
    reading: 'This position rules Career and Growth in their late forms. You will not fade politely: the closing chapters hold your loudest work, memoirs, movements, late masterpieces, opinions aged into edges. The young inherit your permission to speak, which is a real bequest, so keep giving it. But sign your last decades with craft, not just volume. What outlives a brilliant person is whatever they finished.',
  },
  shangguan_hour_branch: {
    domains: ['Family', 'Mind'],
    defline: 'Brilliance lives inside your Hour Gate: the root of your harvest is a mind that never retires.',
    reading: 'This position rules Family and Mind at the root of late life. Your old age keeps its claws and its wit: the elder who says the unsayable at dinner and is usually right. Children and students sharpen against you, which is a gift when it teaches and a wound when it cuts. Save the sharpest tongue for injustice. The people you love will remember your last decade’s words verbatim. Author them.',
  },
  piancai_year_stem: {
    domains: ['Wealth', 'Family'],
    defline: 'Opportunity stands at your Year Gate: fortune’s door was visible from your first address.',
    reading: 'This position rules Wealth and Family. Money entered your story early as movement, a father or elder whose fortunes rose and traveled, a household that understood luck as something you go meet. You read openings the way others read menus, and generosity comes easily because you trust more will come. It usually does. Just distinguish the opportunities from the exits. A start this fluid teaches leaving too well.',
  },
  piancai_year_branch: {
    domains: ['Family', 'Wealth'],
    defline: 'Opportunity lives inside your Year Gate: your root memory of providing runs wide, not deep.',
    reading: 'This position rules Family and Wealth. The root of your beginnings is the wide table: resources that arrived irregularly and were shared instantly, a family that feasted and tightened by turns. It built your ease with flux and your instinct to provide. As an adult you fund people quietly, and the ledger of it lives in your head. Write some of it down. Wide generosity lasts longest when it has edges.',
  },
  piancai_month_stem: {
    domains: ['Career', 'Wealth', 'Social'],
    defline: 'Opportunity stands at your Month Gate: the working world sees the dealmaker, already reaching.',
    reading: 'This position rules Career and Wealth. Professionally you are the door-opener: territories, markets, introductions, the number that gets a first meeting. Careers with horizons suit you, trade, expansion, brokerage, anything where reach is rewarded. Desks kill you slowly. Your income will arrive in weathers rather than salaries, so build your life to metabolize a variable feast. The reach is the gift. The follow-through you must hire, marry, or become.',
  },
  piancai_month_branch: {
    domains: ['Career', 'Wealth'],
    defline: 'Opportunity holds your chart’s strongest seat: your prime is a marketplace, and you own a stall.',
    reading: 'This position rules Career and Wealth from the strongest seat there is. Your prime years are commercially alive: ventures find you, money multiplies when moving, and your best work happens in the open market rather than the org chart. The danger is dilution, six ventures at fifteen percent. Pick the two that compound. A prime like this does not need more doors. It needs the discipline to walk fully through one.',
  },
  piancai_day_branch: {
    domains: ['Love', 'Social', 'Wealth'],
    defline: 'Opportunity sits in your spouse palace: your intimate life keeps a horizon in it.',
    reading: 'This position rules Love and Social, with Wealth in the walls. Attraction, for you, wears novelty: charm, motion, people with their own passports. Settling reads as a risk rather than a relief, so partnership must be built as a shared expedition or it suffocates. Money flows around your love life, gifts, ventures, rescues. Choose a partner who loves the journey but audits the map. Romance survives adventure. It rarely survives vagueness.',
  },
  piancai_hour_stem: {
    domains: ['Wealth', 'Growth'],
    defline: 'Opportunity stands at your Hour Gate: your later years keep a venture warm and a bag half packed.',
    reading: 'This position rules Wealth and Growth late in life. Retirement, as commonly practiced, will not fit: your closing decades want projects, travel, and capital in play. Fortune stays kind to you when courted respectfully, later bets sized to later stakes. The young inherit your eye for openings, so teach it early. And park one asset where no opportunity can reach it. Even the luckiest sailor keeps a harbor.',
  },
  piancai_hour_branch: {
    domains: ['Family', 'Wealth'],
    defline: 'Opportunity lives inside your Hour Gate: your harvest arrives from many fields, some you forgot planting.',
    reading: 'This position rules Family and Wealth at the root of late life. Your endings gather widely: far-flung children, scattered investments, kindnesses returning decades late from people you barely remember helping. It makes for a rich, slightly unmappable harvest. Consolidate gently in your fifties, name things, gather papers, tell the stories that explain the assets. A wide life ends warmest when someone can find all of it.',
  },
  zhengcai_year_stem: {
    domains: ['Wealth', 'Family'],
    defline: 'The Steward stands at your Year Gate: prudence is the family trait your story shows first.',
    reading: 'This position rules Wealth and Family. You come from keeping: a line that saved, maintained, and handed things down in working order. It shows in your visible reliability, people lend to you instinctively and are right to. Money is a craft you learned at the kitchen table. The inheritance to watch is fear dressed as thrift. Spend properly on what compounds, education, tools, health. The Steward’s art is not keeping everything. It is keeping what matters.',
  },
  zhengcai_year_branch: {
    domains: ['Family', 'Wealth'],
    defline: 'The Steward lives inside your Year Gate: your root is a kept house, and it keeps you still.',
    reading: 'This position rules Family and Wealth. The root of your beginnings is maintenance as love: someone paid the bills quietly, fixed things before they broke, and taught you that care looks like continuity. Security, for you, is a foundation stone rather than a preference. Build it early and honestly, then relax inside it. The risk of this root is confusing the vault with the life. The house was kept so living could happen.',
  },
  zhengcai_month_stem: {
    domains: ['Career', 'Wealth'],
    defline: 'The Steward stands at your Month Gate: the working world sees the safe pair of hands.',
    reading: 'This position rules Career and Wealth. Professionally you are trusted with things: budgets, operations, other people’s assets, the keys. Your reputation compounds slowly and never crashes, which in a long career beats brilliance. Fields of custody suit you, finance, management, land, law. You will be underestimated by flashier colleagues and outlast every one of them. Ask for the title you have already been doing. Stewards are promoted late mainly because they never demand it.',
  },
  zhengcai_month_branch: {
    domains: ['Career', 'Wealth'],
    defline: 'The Steward holds your chart’s strongest seat: your prime compounds, brick by deliberate brick.',
    reading: 'This position rules Career and Wealth from the deepest seat a chart has. Your prime is an accumulation engine: skill gathered into position, position into assets, assets into quiet options. Nothing about it is dramatic and everything about it is durable. The single hazard is rigidity, holding a working formula two markets too long. Schedule reinvention every seventh year on purpose. Compounding is your gift. Refusing to re-pot it is the only way you lose.',
  },
  zhengcai_day_branch: {
    domains: ['Love', 'Family'],
    defline: 'The Steward sits in your spouse palace: you love in deposits, steadily, for keeps.',
    reading: 'This position rules Love and Family. Intimacy, for you, is a long account: loyalty paid in daily, promises kept until they are furniture, a partner chosen once and tended for decades. It is the marrying position, and it rewards you richly for choosing well, which means slowly. Beware love as maintenance only. Devotion needs occasional extravagance the way houses need windows. Waste something on them regularly. That, too, is keeping.',
  },
  zhengcai_hour_stem: {
    domains: ['Wealth', 'Family'],
    defline: 'The Steward stands at your Hour Gate: what you show the future is order, provided for.',
    reading: 'This position rules Wealth and Family in their closing forms. You will finish organized: the will written, the roof sound, the accounts explicable to a tired executor. It is a genuine kindness, the last chore done for people you love. Pass on the craft along with the capital, and teach the young maintenance before they inherit machines. And leave one line item for delight. Even a perfect ledger should end on a gift.',
  },
  zhengcai_hour_branch: {
    domains: ['Family', 'Health', 'Wealth'],
    defline: 'The Steward lives inside your Hour Gate: your harvest is everything you maintained, still standing.',
    reading: 'This position rules Family and Health at the root of late life, with Wealth beneath both. Your old age is built from upkeep: the body serviced on schedule, the marriage resoled every decade, the house that outlasts its street. Continuity is your pension. Its quiet risk is smallness, a kept life that forgot to grow. Add one new thing each year, a skill, a place, a person. Preservation stays noble only while something is still being planted.',
  },
  qisha_year_stem: {
    domains: ['Social', 'Career'],
    defline: 'The General stands at your Year Gate: the world’s first read of you is force.',
    reading: 'This position rules Social and Career. You broadcast intensity before you speak: strangers sit straighter around you and assume you are in charge, which becomes true suspiciously often. An early life with real pressure in it forged the bearing. Command is your resting state, so choose consciously when to holster it. The presence that wins you authority costs you ease. Off duty, show your hands. People follow longer when they stop bracing.',
  },
  qisha_year_branch: {
    domains: ['Family', 'Growth', 'Health'],
    defline: 'The General lives inside your Year Gate: your root was forged, not furnished.',
    reading: 'This position rules Family and Growth, and it marks Health. The root of your story holds pressure: a demanding house, an early responsibility, a childhood that skipped some childhood. It built load-bearing character and a nervous system that treats peace as suspicious. As an adult, you seek battles partly to feel at home. Honor the forging, it made you formidable. Then teach your body the drill it never learned. Standing down is also a discipline.',
  },
  qisha_month_stem: {
    domains: ['Career', 'Social'],
    defline: 'The General stands at your Month Gate: the working world sees command presence and expects orders.',
    reading: 'This position rules Career and Social. Professionally you are given the hard things: crises, turnarounds, teams that need spine. Authority finds you even in flat organizations, because pressure reveals you rather than bending you. Fields with stakes suit you, command, surgery, enforcement, emergency, competition. Comfortable roles rot you visibly. Build one habit above all: praise in public, correct in private. Feared leaders win campaigns. Respected ones keep the army.',
  },
  qisha_month_branch: {
    domains: ['Career', 'Health'],
    defline: 'The General holds your chart’s strongest seat: your prime is a campaign, won by discipline.',
    reading: 'This position rules Career and Health from the chart’s deepest seat. Your prime years run at wartime spec: ambition with teeth, capacity that grows under load, a career of positions taken and held. You can carry what breaks colleagues, which is exactly why your body keeps the ledger your mind refuses. Sleep, train, and decompress on schedule, like logistics, because they are. Campaigns are lost two ways. Weak enemies never. Neglected supply lines, always.',
  },
  qisha_day_branch: {
    domains: ['Love', 'Health'],
    defline: 'The General sits in your spouse palace: love, for you, has a chain of command to dismantle.',
    reading: 'This position rules Love and Health. Intimacy arrives armored: you protect fiercely, provoke instinctively, and test partners for spine before trusting them with softness. Passion runs high voltage here, and so do battles. The work of your romantic life is learning that home is not terrain. A partner is not a lieutenant, and surrender, occasionally, is not defeat. Choose someone unafraid of you. Then prove them right slowly.',
  },
  qisha_hour_stem: {
    domains: ['Career', 'Growth', 'Family'],
    defline: 'The General stands at your Hour Gate: your later years keep rank, and the young feel it.',
    reading: 'This position rules Career and Growth in their late forms, and it shapes Family. You do not disarm with age: the closing decades hold your largest commands, institutions steered, standards enforced, successors drilled. The young inherit your discipline and fear your judgment in equal measure. Soften the delivery, never the standard. A last campaign led warmly is the difference between being obeyed to the end and being loved past it.',
  },
  qisha_hour_branch: {
    domains: ['Health', 'Family', 'Growth'],
    defline: 'The General lives inside your Hour Gate: the root of your harvest is strength, held to the last.',
    reading: 'This position rules Health and Family at the root of late life. You will be the strong old one, the elder others physically lean on, and your discipline will decide how long that stays true. Train like it matters, because it is your retirement plan. With children and heirs, loosen the grip one finger per decade. What you defended them from, they must eventually fight. The best generals leave soldiers, not dependents.',
  },
  zhengguan_year_stem: {
    domains: ['Social', 'Family'],
    defline: 'Order stands at your Year Gate: respectability is the first thing your story shows.',
    reading: 'This position rules Social and Family. You were raised visible: a family with standards, a name to maintain, conduct watched and graded early. It gave you effortless propriety, people trust you on sight and put you on committees. The inheritance runs deep enough that shame is your sharpest pain. Keep the honor, drop the audience. A reputation is worth keeping only while it stays lighter than the person carrying it.',
  },
  zhengguan_year_branch: {
    domains: ['Family', 'Growth'],
    defline: 'Order lives inside your Year Gate: your root is a rulebook, learned before you could read it.',
    reading: 'This position rules Family and Growth. The root of your beginnings is structure: a household of expectations, duty modeled daily, right and wrong served with dinner. It built your spine and your ceiling both. As an adult you carry an inner magistrate whose approval you still seek. Retire him gradually. Keep the integrity he taught you, and quietly stop asking his permission. Grown correctness answers to conscience, not to childhood.',
  },
  zhengguan_month_stem: {
    domains: ['Career', 'Social'],
    defline: 'Order stands at your Month Gate: the working world sees an officer, promotable on sight.',
    reading: 'This position rules Career and Social. You are built for institutions: rank reads on you, procedure obeys you, and ladders feel like home terrain. Government, law, corporations, any structured hierarchy will recognize and raise you. Your word is your collateral, so never spend it. The risk is the ladder itself, climbing well past the floor you wanted. Every few years, check the building. A perfect ascent in the wrong tower is still the wrong tower.',
  },
  zhengguan_month_branch: {
    domains: ['Career', 'Growth', 'Social'],
    defline: 'Order holds your chart’s strongest seat: your prime is an office held with honor.',
    reading: 'This position rules Career and Growth from the strongest seat there is. Your prime years belong to institutions: responsibility arrives early, titles fit, and your name becomes a small standard others measure by. You succeed by being dependable at scale. The hazard is calcification, order kept for its own sake while the mission quietly leaves. Re-read the mission yearly. You were made an officer to serve something. Keep remembering what.',
  },
  zhengguan_day_branch: {
    domains: ['Love', 'Family'],
    defline: 'Order sits in your spouse palace: you love formally, faithfully, and for the record.',
    reading: 'This position rules Love and Family. Partnership, for you, is a vow before it is a feeling: you commit completely, honor the contract, and expect the same spine in return. It is the marriage position, stable, respectable, built to last decades. Its shadow is administration, a household run so correctly that romance files for neglect. Break your own protocol on purpose sometimes. The vow holds better when the two of you occasionally elope from it.',
  },
  zhengguan_hour_stem: {
    domains: ['Family', 'Social', 'Career'],
    defline: 'Order stands at your Hour Gate: what you show the future is standards, upheld to the end.',
    reading: 'This position rules Family and Social in their closing forms, with Career’s last chapter inside them. You will finish as the standard-bearer: the elder whose approval means something, the name attached to endowments, rules, and doors. Heirs inherit your correctness, so demonstrate mercy alongside it, or they will inherit the cage too. Endorse the young loudly while you are alive to do it. A blessing given late is worth ten written into wills.',
  },
  zhengguan_hour_branch: {
    domains: ['Family', 'Growth'],
    defline: 'Order lives inside your Hour Gate: the root of your harvest is a life that kept its word.',
    reading: 'This position rules Family and Growth at the root of late life. Your ending is orderly by construction: duties completed, relationships in their right standing, a conscience with clean books. That peace is real and earned. What remains is the one liberty correctness postponed, the trip, the art, the truth told loose. Take it while your knees permit. A kept word is a monument. A kept self is a life.',
  },
  pianyin_year_stem: {
    domains: ['Mind', 'Social'],
    defline: 'The Alchemist stands at your Year Gate: the world’s first read of you is depth, slightly apart.',
    reading: 'This position rules Mind and Social. You arrived observant: the child at the edge of the party, cataloguing, and the adult strangers call an old soul within minutes. Your public self thinks visibly, which draws the curious and unnerves the shallow. An unusual elder or education likely seeded it. Wear the strangeness openly, it filters your company for you. The ones who stay past the silence were always your people.',
  },
  pianyin_year_branch: {
    domains: ['Family', 'Mind', 'Growth'],
    defline: 'The Alchemist lives inside your Year Gate: your root drinks from an odd, deep well.',
    reading: 'This position rules Family and Mind. The root of your story is unconventional nourishment: a lineage with a mystic, a scholar, or a beautiful crank in it, a childhood fed on books, silence, or secrets. You metabolize experience into meaning by inheritance. The same root can carry old loneliness forward. Study it like everything else you study. The family strangeness is your material, not your sentence.',
  },
  pianyin_month_stem: {
    domains: ['Career', 'Mind'],
    defline: 'The Alchemist stands at your Month Gate: the working world sees the specialist it does not quite understand.',
    reading: 'This position rules Career and Mind. Professionally you are the deep one: the analyst, researcher, diagnostician, the person handed problems that have already defeated the confident. Your value is genuine and badly self-advertised, because visible thinking is not visible output. Fields of depth suit you, research, strategy, medicine, code, the hidden corners of any trade. Find one translator, a boss or partner who sells what you see. Depth plus a spokesman is a career with no ceiling.',
  },
  pianyin_month_branch: {
    domains: ['Mind', 'Growth', 'Career'],
    defline: 'The Alchemist holds your chart’s strongest seat, the month branch, and does its thinking from the middle of your working life.',
    reading: 'This position rules Mind and Growth, and it rules them from the Month Gate. The month branch is the frame of a chart, the seat that colors your whole working life, and yours is held by the quiet scholar. Insight is not a hobby here. It is how you earn, decide, and climb. Careers that reward private depth suit you, and roles that punish slowness starve you. Guard the study hours the way others guard their salary, because for you they are the same thing.',
  },
  pianyin_day_branch: {
    domains: ['Love', 'Mind'],
    defline: 'The Alchemist sits in your spouse palace: intimacy, for you, begins where small talk dies.',
    reading: 'This position rules Love and Mind. You bond through the inner life: a partner must be interesting to your depths, not just kind to your days, and silence together must feel like company. You withdraw to process, which reads as distance to the unstudied. Teach your person your weather signs early. The love this position writes is rare and quiet and total. Its only enemy is going unexplained.',
  },
  pianyin_hour_stem: {
    domains: ['Mind', 'Growth', 'Career'],
    defline: 'The Alchemist stands at your Hour Gate: your later output turns inward, and finer.',
    reading: 'This position rules Mind and Growth in their late forms. Your closing decades are your deepest: the reading finally done, the framework finished, wisdom distilled past cleverness. Late study, for you, is a metamorphosis rather than a hobby, so expect a genuine second mind after sixty. Publish it, teach it, or at minimum write it down. The young will need your strange map exactly one generation after you stop being able to draw it.',
  },
  pianyin_hour_branch: {
    domains: ['Family', 'Mind', 'Growth'],
    defline: 'The Alchemist lives inside your Hour Gate: the root of your harvest is understanding, finally ripe.',
    reading: 'This position rules Mind and Family at the root of late life. Your old age keeps a lit study: the elder others visit for the real conversation, the grandparent who explains what parents cannot. Solitude remains your medicine, so build a household that honors the closed door without fearing it. What you hand down is comprehension. Wrap it warmly. Understanding is the one inheritance that cannot be taxed, only ignored.',
  },
  zhengyin_year_stem: {
    domains: ['Family', 'Mind'],
    defline: 'Care stands at your Year Gate: the first thing your story shows is that you were well held.',
    reading: 'This position rules Family and Mind. You carry visible shelter: the manner of someone believed in early, likely by a mother or teacher whose faith still lines your voice. People sense you were loved competently and trust you accordingly. Learning comes to you as birthright, degrees, mentors, doors held open. Pass the holding on, it is the family business. Just remember that shelter received must eventually be built, or it stays borrowed.',
  },
  zhengyin_year_branch: {
    domains: ['Family', 'Growth', 'Health'],
    defline: 'Care lives inside your Year Gate: your root is shelter itself, deep and possibly too warm.',
    reading: 'This position rules Family and Health. The root of your beginnings is protection: a childhood cushioned, a mother-force strong in the walls, safety as the house style. It gave you a nervous system that heals and a baseline trust most people lack. The shade side is late launching, shelter that lingered into softness. Whatever you were protected from, go meet a sized version of it yearly. Roots this kind must be outgrown gratefully, not obeyed.',
  },
  zhengyin_month_stem: {
    domains: ['Career', 'Mind', 'Social'],
    defline: 'Care stands at your Month Gate: the working world sees the teacher, and brings it students.',
    reading: 'This position rules Career and Mind. Professionally you are the credentialed shelter: the mentor, the editor, the physician, the one whose sign-off soothes. Institutions of knowledge and care fit you like made clothes, education, medicine, publishing, counsel. Your authority is soft and durable. Its risk is invisibility, the teacher eclipsed by the taught. Claim your name on your work without apology. Generosity with credit is a virtue. Anonymity is just a leak.',
  },
  zhengyin_month_branch: {
    domains: ['Mind', 'Career', 'Growth'],
    defline: 'Care holds your chart’s strongest seat: your prime is built on learning that never stops arriving.',
    reading: 'This position rules Mind and Career from the deepest seat a chart has. Your prime runs on absorbed knowledge: you learn faster than your field produces, and your career compounds through understanding rather than positioning. Reputation arrives as trust, students, patients, readers, referrals. The hazard is passivity, knowing so much that doing feels optional. Ship something every season. In this chart, wisdom unapplied does not store. It sours.',
  },
  zhengyin_day_branch: {
    domains: ['Love', 'Family', 'Health'],
    defline: 'Care sits in your spouse palace: home, for you, must be a harbor before it is anything else.',
    reading: 'This position rules Love and Family, and it tends Health. You partner for peace: a home that restores, a person who is also a resting place, love expressed as looking after. You will likely marry someone who needs your shelter or supplies it, so watch the balance. Mothers and in-laws stand close to this palace, so set the doors early. At its best, this is the marriage people recover inside. Keep a little weather in it anyway. Harbors still need tides.',
  },
  zhengyin_hour_stem: {
    domains: ['Family', 'Growth', 'Mind'],
    defline: 'Care stands at your Hour Gate: what you show the future is teaching, given freely.',
    reading: 'This position rules Family and Growth in their closing forms. Your later years turn maternal regardless of gender: students gathered, grandchildren tutored, juniors shielded while they find their feet. Knowledge is your bequest and you will give it away with both hands, correctly. Guard against rescuing the young from their necessary storms. The last lesson a great teacher gives is stepping back. Shelter that knows when to open is the kind that gets remembered.',
  },
  zhengyin_hour_branch: {
    domains: ['Family', 'Health', 'Mind'],
    defline: 'Care lives inside your Hour Gate: the root of your harvest is peace, tended into permanence.',
    reading: 'This position rules Health and Family at the root of late life. Your ending intends gentleness: a body that responds to care, a mind that keeps its library, younger hands that arrive unasked because you taught them arriving. Invest in that outcome now, health kept like scholarship, kindness distributed like tuition. The shade to watch is retreat, comfort narrowing into a small warm circle. Keep one draft of cold air. It is how you know the door still opens.',
  },
};
