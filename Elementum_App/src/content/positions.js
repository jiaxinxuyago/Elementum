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
// (the DOMAIN_DEF one-liners were retired the day they were authored —
// owner 2026-08-19: domain rows tag their source gate instead; the wording
// is preserved in REA_02 §5e for a future Codex domains chapter)

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

// The classical set-pieces (POS-T-C, owner 2026-08-19 — REA_04 §9.3 layer 3):
// named god-pair chemistry, detected across the chart's resolved positions
// and rendered inside each participating seat (Seeker layer). Priority =
// array order; a seat carries at most one. Station home tpl_set_pieces.
export const SET_PIECES = [
  { key: 'shishen_zhi_sha', zh: '食神制杀', gods: [['食神'], ['七杀']],
    line: 'Your chart holds a rare pairing: the Artisan’s ease stands guard over the General’s pressure. Stress that grinds other people becomes production in you, and your calmest work tends to happen close to the deadline.' },
  { key: 'xiao_shen_duo_shi', zh: '枭神夺食', gods: [['偏印'], ['食神']],
    line: 'The Alchemist and the Artisan share your chart, and they compete: too much theory starves your ease. When output stalls, the cure is one finished thing made with your hands, and fewer perfect plans.' },
  { key: 'shang_guan_jian_guan', zh: '伤官见官', gods: [['伤官'], ['正官']],
    line: 'Your chart carries the old collision of brilliance and rank: the Virtuoso chafes exactly where the Magistrate climbs. Careers run smoothest when your talent gets a stage inside the structure, under a title with some give in it.' },
  { key: 'bi_jie_duo_cai', zh: '比劫夺财', gods: [['比肩', '劫财'], ['正财', '偏财']],
    line: 'Self stars and wealth stars share your pillars, the classic contested purse. Money does best held plainly in your name: partnerships loosen it, lending blurs it, and generosity deserves its own budget line.' },
  { key: 'sha_yin_xiang_sheng', zh: '杀印相生', gods: [['七杀'], ['偏印', '正印']],
    line: 'Pressure and shelter feed each other in your chart: hard chapters keep converting into wisdom and rank. What tests you also promotes you, and the pattern strengthens with age.' },
];

// The locked corpus ×70, keyed `${godId}_${slotId}`.
export const POSITION_READINGS = {
  bijian_year_stem: {
    teaser: 'Independence was the family lesson, and you took it early. Expect a life where help arrives late and pride arrives first, and you manage anyway.',
    domains: ['Social', 'Family'],
    defline: 'The Twin stands at your Year Gate: independence is the first thing your story shows, inherited and worn openly.',
    reading: 'This position rules Social and Family. Your line carries self-made people, and it shows: from early on you read as someone who stands on their own feet. Support from home came as example more than shelter, and you learned to treat help as optional. Peers matter to you the way siblings do, chosen and equal. Let some of them in past the handshake. Standing alone began as heritage. It does not have to be a habit.',
  },
  bijian_year_branch: {
    teaser: 'Some part of you grew up fast and private, learning to need very little. That toughness holds, though letting people in will always take deliberate effort.',
    domains: ['Family', 'Growth'],
    defline: 'The Twin lives inside your Year Gate: the root of your early world was learning to hold your own.',
    reading: 'This position rules Family and Growth. Somewhere in the first chapters, you became your own backup: a childhood that asked you to be sturdy early, among siblings, cousins, or a house that treated small people as capable ones. The root took. Self-reliance, for you, is a place you come from rather than a skill you learned. Watch one thing: roots this firm can quietly refuse replanting. Some help is worth accepting just to remember how.',
  },
  bijian_month_stem: {
    teaser: 'You do your best work as nobody’s junior. Midlife rewards your independence, though shared money with friends will need clearer lines than friendship likes.',
    domains: ['Career', 'Social'],
    defline: 'The Twin stands at your Month Gate: the working world sees a colleague who carries their own weight, visibly.',
    reading: 'This position rules Career and Social, and it runs the prime of your life. The Twin stands at your Month Gate in full view: the working world meets you as the equal, the colleague who owns whole tasks and quietly declines to be managed. From your twenties into your forties, rank comes to you through competence witnessed, and partnership taxes your speed. You feel both. Among peers and siblings the same law repeats: bonds hold best side by side, never one above the other. So keep money clean with friends, written down and unromantic. Choose the two or three long roads worth sharing the wheel for. The short ones were always yours.',
  },
  bijian_month_branch: {
    teaser: 'Your prime runs on your own engine: careers built alone hold, careers built on rescue stall. Equity and credit stay cleanest when they are written down early.',
    domains: ['Career', 'Growth'],
    defline: 'The Twin holds your chart’s strongest seat: your prime runs on self-reliance, built into the frame itself.',
    reading: 'This position rules Career and Growth, from the deepest seat a chart has. The engine of your working life is your own two hands: you build careers you can hold alone, and you flourish where autonomy is real. Bosses either learn this or lose you. Money made with partners tends to blur, so keep the accounts clean and the equity written down. Your prime is self-propelled. Fuel it with skill, not just stubbornness.',
  },
  bijian_day_branch: {
    teaser: 'In love you need an equal, someone with a spine that matches yours. Marriage will feel like a partnership of captains, and it works when neither keeps score.',
    domains: ['Love', 'Social'],
    defline: 'The Twin sits in your spouse palace: you partner as an equal, and only as an equal.',
    reading: 'This position rules Love and Social. In close relationships you need a peer, someone whose spine matches yours, and romance built on leaning does not hold you. The home you make has two captains, which is its strength and its argument. Competition can slip into the kitchen: score-keeping, parallel lives, love as a quiet contest. Choose a partner you admire, then practice the one move the Twin resists. Letting them carry you sometimes.',
  },
  bijian_hour_stem: {
    teaser: 'You will age on your own terms and make it look easy. The young learn self-reliance from watching you, so leave the door open while you stand alone.',
    domains: ['Growth', 'Family'],
    defline: 'The Twin stands at your Hour Gate: what you show the future is independence, taught by demonstration.',
    reading: 'This position rules Growth and Family. The later chapters of your life keep their own keys: you intend to need nobody, and you will likely manage it. What you pass on, to children or the people who learn from you, is self-sufficiency shown rather than preached. Fine inheritance. Add warmth to it deliberately, because the young remember who stood alone, and they also remember who stood alone with the door open.',
  },
  bijian_hour_branch: {
    teaser: 'Your later years run on a few chosen equals, friends who became family. Invest in that small circle now: it is the pension no market touches.',
    domains: ['Family', 'Growth'],
    defline: 'The Twin lives inside your Hour Gate: the root of your late life is company of equals, kept small and true.',
    reading: 'This position rules Family and Growth. Your harvest years run on a few chosen peers: the friends who became family, the children raised to stand level with you. The root here wants respect more than care, and it will trade comfort for dignity every time. Build the small circle now that you intend to grow old inside. Independence ages best with two or three people who never needed you weak to love you.',
  },
  jiecai_year_stem: {
    teaser: 'Daring runs in your bloodline and shows early. Money moves fast around you, in and out, so your fortune favors nerve backed by a ledger someone honest keeps.',
    domains: ['Wealth', 'Social'],
    defline: 'This bold companion stands at your Year Gate: daring runs in the visible bloodline.',
    reading: 'This position rules Wealth and Social. The world met you early as the fearless one, and some of that nerve was inherited: a family line of risk-takers, sharers, spenders, or all three. Money moved fast around your beginnings, in and out. You learned that fortune is a current, not a vault. Keep the boldness, it opens doors that patience cannot. Just notice who always seems to be holding your wallet when the music stops.',
  },
  jiecai_year_branch: {
    teaser: 'You grew up where mine and yours blurred, and it made you generous and watchful at once. Keep sharing on purpose: looseness with money costs you relationships first.',
    domains: ['Family', 'Wealth'],
    defline: 'Inside your Year Gate sits the shared purse: early life taught you that what is yours is rarely only yours.',
    reading: 'This position rules Family and Wealth. The root of your story involves pooled resources: family money shared, contested, or carried together, siblings close enough to borrow without asking. It made you generous and it made you alert. As an adult you give easily and track quietly. Honor both instincts. Share on purpose rather than by leakage, and let written clarity protect the relationships that looseness would eventually cost you.',
  },
  jiecai_month_stem: {
    teaser: 'At work you compete the way others breathe, and people feel it. Your career rises fastest in open contests, and slowest wherever the prize must be split.',
    domains: ['Career', 'Social'],
    defline: 'At your Month Gate stands the daring colleague: the working world sees your nerve first.',
    reading: 'This position rules Career and Social. Professionally you read as the one who will make the call others are still pricing: bold in negotiation, quick to bet on yourself, magnetic in a team and expensive to compete with. Careers with real stakes suit you, sales floors, launches, turnarounds. Steady ladders bore you into mischief. Pick arenas where daring is the job description, and keep one cautious friend close for the days nerve needs a brake.',
  },
  jiecai_month_branch: {
    teaser: 'Under your working life runs a gambler’s pulse: bold moves feel safer to you than waiting. Midlife pays your courage well once partners stop holding your purse.',
    domains: ['Career', 'Wealth', 'Social'],
    defline: 'Inside your Month Gate runs the gambler’s current: your prime years are built for bold, shared ventures.',
    reading: 'This position rules Career and Wealth, with Social close behind. The strongest seat of your chart runs on shared risk: partnerships, ventures, teams that bet together. Alone you are quick. Allied you are formidable, and the money follows the alliances. The same current drains carelessly: split equity, loose loans, friends who become expenses. Structure is not the enemy of your boldness. It is what lets you afford the next bet.',
  },
  jiecai_day_branch: {
    teaser: 'You fall for bold ones, partners with fire and opinions. Home will never be dull, and it stays happy when the money keeps separate lanes.',
    domains: ['Love', 'Wealth'],
    defline: 'In your spouse palace lives the fellow gambler: love, for you, is a joint venture with real stakes.',
    reading: 'This position rules Love and Wealth. Intimacy arrives as alliance: you fall for people with nerve, and your best partnerships feel like two players sharing one bankroll. It makes for a vivid home and an eventful ledger. Money and love will braid together, so braid them deliberately: shared goals, named accounts, honest stakes. The relationship thrives on adventure. It survives on the agreements you make before the adventure starts.',
  },
  jiecai_hour_stem: {
    teaser: 'You will show the future your nerve: heirs and juniors copy your boldness first. Budget for late generosity, because people will ask, and you will want to say yes.',
    domains: ['Wealth', 'Growth'],
    defline: 'At your Hour Gate stands the risk-taker: your later ambitions stay bold, and visibly so.',
    reading: 'This position rules Wealth and Growth. You do not intend to retire quietly: the later chapters keep a wager in them, a venture, a reinvention, a door bought open. The young see your nerve and borrow it, which is a genuine gift. Guard the principal, though. Late-life boldness pays best when the downside is fenced. Keep a portion untouchable, and let the rest play. That balance is the whole art of your finish.',
  },
  jiecai_hour_branch: {
    teaser: 'The people who come after you will have your fire and their own ideas. Late in life, generosity is your grace and your leak: give on purpose, not on request.',
    domains: ['Family', 'Wealth'],
    defline: 'Inside your Hour Gate sits the shared harvest: what you build late in life is built with others.',
    reading: 'This position rules Family and Wealth, and it works in the root of your late years. The Rival lives inside your Hour Gate: the generation after you carries your fire with its own steering, children and heirs who are charismatic, willful, and expensive in ways you will mostly forgive. Late life keeps a shared-purse quality: people close to you will reach for your resources, and your generosity will want to answer. Some of that is grace. Budget it anyway, on purpose, with numbers. Protect the retirement floor first and give from above it. Then the boldness you are leaving behind reads as legacy, and the leaks never get to write the ending.',
  },
  shishen_year_stem: {
    teaser: 'Warmth was your first language, learned young and worn openly. Doors open for you through charm and good taste, and they keep opening as long as you keep giving.',
    domains: ['Social', 'Health'],
    defline: 'The Artisan stands at your Year Gate: ease and charm are the first things your story shows.',
    reading: 'This position rules Social and Health. You arrived with a light touch: a childhood face that put people at ease, a family style that valued good food, good humor, or good craft. Wellbeing is your inheritance, and it shows in how naturally you host, soothe, and enjoy. The shadow is softness: a start this comfortable can under-build ambition. Keep the warmth, it is real wealth. Just give it something worth making.',
  },
  shishen_year_branch: {
    teaser: 'Somewhere early, someone fed you well, in every sense. That ease still lives underneath you, and providing for others will keep quietly providing for you.',
    domains: ['Family', 'Health'],
    defline: 'The Artisan lives inside your Year Gate: the root of your early world was nourishment, given and remembered.',
    reading: 'This position rules Family and Health, and it works from the root of your story. The Artisan lives inside your Year Gate, the hidden face: nourishment was built into your early world, as food, ease, or someone’s quiet generosity, and your body still remembers it. You restore quickly, you digest life well, and comfort works on you as medicine rather than indulgence. Blessing in your line flows downhill through the older generation, often by way of the kitchen. Health stays your quiet inheritance so long as you keep the habits that honor it. Feed people in your turn. Your luck has always traveled with the table, and it still does.',
  },
  shishen_month_stem: {
    teaser: 'The working world knows you for the ease of what you make. Your career grows by appetite rather than ambition, and the work you enjoy pays best.',
    domains: ['Career', 'Social'],
    defline: 'The Artisan stands at your Month Gate: the working world sees the maker, gracious and unhurried.',
    reading: 'This position rules Career and Social. Professionally you read as the craftsman: the one whose work has finish, whose manner has warmth, who makes hard things look pleasant. Fields that reward taste suit you, teaching, food, design, care, and craft. Cutthroat arenas waste you. Your reputation compounds through work people enjoy receiving. Protect your pace, because your gift dies in a sweatshop and sings in a workshop.',
  },
  shishen_month_branch: {
    teaser: 'Craft sits in your bones: your prime years produce steadily, without drama, and better than louder people. Guard your health and routine, they are your production line.',
    domains: ['Career', 'Health'],
    defline: 'The Artisan holds your chart’s strongest seat: your prime runs on craft, flow, and sustainable pleasure.',
    reading: 'This position rules Career and Health from the deepest seat there is. Your working prime is built for the long, warm road: mastery over grind, flow over force, a career shaped like a craft practiced daily until it feeds you. Burnout is your one real enemy, because it attacks the exact spring your success flows from. Choose work you could love for twenty years. In this chart, enjoyment is not a bonus. It is the engine.',
  },
  shishen_day_branch: {
    teaser: 'You are built for a warm table and a gentle partner. Marriage feeds you, literally and otherwise, and your best fortune gathers around the home you two keep.',
    domains: ['Love', 'Family', 'Health'],
    defline: 'The Artisan sits in your spouse palace: home, for you, is where life gets savored.',
    reading: 'This position rules Love and Family, and it feeds Health. Intimacy arrives through the senses and the table: you love by cooking, hosting, easing, and you need a partner who can receive pleasure without suspicion. The home you build tends toward warmth, children, creatures, and comfort. Its risk is drift, sweetness with no spine. Keep one shared project alive with your partner. Delight deepens fastest when it is making something.',
  },
  shishen_hour_stem: {
    teaser: 'What you make late in life may outshine everything before it. Children and students take after your gifts, and your last chapters read sweeter than your first.',
    domains: ['Family', 'Career'],
    defline: 'The Artisan stands at your Hour Gate: what you show the future is the joy of making.',
    reading: 'This position rules Family and Career in their late-season forms. Your output grows more personal with age: the craft becomes teaching, the work becomes gifts, and children or students inherit your hands as much as your words. You will likely make your best things after fifty, when taste has finished compounding. Plan a legacy you can touch, books, gardens, tables, students. Yours is the kind that must be made, not merely left.',
  },
  shishen_hour_branch: {
    teaser: 'Ease deepens as you age: the root of your late years is comfort earned, kept, and shared. Expect a good table, good sleep, and company that stays.',
    domains: ['Family', 'Health'],
    defline: 'The Artisan lives inside your Hour Gate: your harvest is children, comfort, and a well-fed old age.',
    reading: 'This position rules Family and Health at the root of late life. This is a blessed seat: children who stay warm toward you, appetites that survive age, an ending with flavor in it. It rewards early tending, the health kept now, the young fed patiently, the pleasures practiced rather than postponed. Build the orchard in your forties. This root intends you to sit in its shade, tasting what you planted.',
  },
  shangguan_year_stem: {
    teaser: 'You were the bright one early, the child who outgrew the script. Authority and you started rough, and your luck improves every year you pick your own stage.',
    domains: ['Social', 'Mind'],
    defline: 'Brilliance stands at your Year Gate: the first thing your story shows is a spark that refuses dimming.',
    reading: 'This position rules Social and Mind. You were the noticeable child: quick-tongued, gifted, allergic to being underestimated. Early audiences shaped you, applause or the fight for it, and your public self still carries that shine and that chip. People remember meeting you. Some remember being scorched. The talent is genuine currency, so spend it on stages worth the light, and let small slights pass unanswered. Not every spark owes the world a fire.',
  },
  shangguan_year_branch: {
    teaser: 'Underneath your story runs an early refusal: some rule at home never fit, and you knew it young. That edge becomes brilliance once it stops needing an audience.',
    domains: ['Family', 'Growth'],
    defline: 'Brilliance lives inside your Year Gate: you were rooted in a house that talent had to outgrow.',
    reading: 'This position rules Family and Growth. The root of your story holds friction with the given order: a family whose rules your gift pressed against, a lineage you honor best by exceeding. Rebellion here is a method rather than a phase, how you learned to think. As an adult, authority still smells like childhood to you. Choose your defiances the way you choose tools, deliberately. The ones you inherit run you. The ones you pick serve you.',
  },
  shangguan_month_stem: {
    teaser: 'The working world sees your talent before your discipline, and both are real. Careers with a stage suit you, and bosses who need obedience will not keep you.',
    domains: ['Career', 'Social'],
    defline: 'Brilliance stands at your Month Gate: the working world sees the performer, dazzling and hard to manage.',
    reading: 'This position rules Career and Social. Professionally you are the show: articulate, inventive, visibly better than the brief, and famously difficult to supervise. Fields with stages suit you, media, advocacy, design, performance, anywhere output is signed. Bureaucracy makes you a saboteur. Your name will travel farther than your resume, for praise and for friction alike. Master one discipline completely, because dazzle with foundations is a career. Dazzle without them is a season.',
  },
  shangguan_month_branch: {
    teaser: 'Your prime runs on performance: you outdo, outshine, and occasionally overstep. The money follows your gift wherever the format is loose and the spotlight honest.',
    domains: ['Career', 'Mind'],
    defline: 'Brilliance holds your chart’s strongest seat: your prime is built to break forms and sign the result.',
    reading: 'This position rules Career and Mind from the chart’s deepest seat. Your prime runs on creative force strong enough to bend the trade you enter: you see the better way immediately and cannot politely unsee it. Employers experience you as weather. The resolution is authorship, work where your name absorbs your output, founding, art, research, reform. Aim the force at problems, not personnel. Genius forgiven is genius that picked its battles.',
  },
  shangguan_day_branch: {
    teaser: 'You need a partner who applauds, and you notice when they do not. Marriage thrives once the two of you compete with the world instead of each other.',
    domains: ['Love', 'Mind'],
    defline: 'Brilliance sits in your spouse palace: intimacy, for you, is vivid, verbal, and never beige.',
    reading: 'This position rules Love and Mind. You love with the volume up: wit, intensity, honesty past the comfortable line. A partner must be an audience and a sparring mate at once, quick enough to enjoy you, sturdy enough not to bruise. Dull peace reads to you as death, so you will test calm just to feel the current. Learn the difference between spark and damage. The right person wants your fire warm, not proven.',
  },
  shangguan_hour_stem: {
    teaser: 'Your late work will be your boldest, and the young will quote you. Expect gifted, headstrong heirs: they inherit the talent along with the allergy to instruction.',
    domains: ['Career', 'Growth'],
    defline: 'Brilliance stands at your Hour Gate: your later years intend to be seen, and heard.',
    reading: 'This position rules Career and Growth in their late forms. You will not fade politely: the closing chapters hold your loudest work, memoirs, movements, late masterpieces, opinions aged into edges. The young inherit your permission to speak, which is a real bequest, so keep giving it. But sign your last decades with craft, not just volume. What outlives a brilliant person is whatever they finished.',
  },
  shangguan_hour_branch: {
    teaser: 'The root of your late years is expression that never retires. You will be making, correcting, and dazzling to the end, and it will keep you young.',
    domains: ['Family', 'Mind'],
    defline: 'Brilliance lives inside your Hour Gate: the root of your harvest is a mind that never retires.',
    reading: 'This position rules Family and Mind at the root of late life. Your old age keeps its claws and its wit: the elder who says the unsayable at dinner and is usually right. Children and students sharpen against you, which is a gift when it teaches and a wound when it cuts. Save the sharpest tongue for injustice. The people you love will remember your last decade’s words verbatim. Author them.',
  },
  piancai_year_stem: {
    teaser: 'Generosity was visible in your beginnings: a family that spent on people and chances. Money finds you through motion and strangers, rarely through sitting still.',
    domains: ['Wealth', 'Family'],
    defline: 'Opportunity stands at your Year Gate: fortune’s door was visible from your first address.',
    reading: 'This position rules Wealth and Family. Money entered your story early as movement, a father or elder whose fortunes rose and traveled, a household that understood luck as something you go meet. You read openings the way others read menus, and generosity comes easily because you trust more will come. It usually does. Just distinguish the opportunities from the exits. A start this fluid teaches leaving too well.',
  },
  piancai_year_branch: {
    teaser: 'Somewhere in your roots sits a wanderer, and their restlessness lives in you. Your luck travels: opportunity favors you farther from home than comfort likes.',
    domains: ['Family', 'Wealth'],
    defline: 'Opportunity lives inside your Year Gate: your root memory of providing runs wide, not deep.',
    reading: 'This position rules Family and Wealth. The root of your beginnings is the wide table: resources that arrived irregularly and were shared instantly, a family that feasted and tightened by turns. It built your ease with flux and your instinct to provide. As an adult you fund people quietly, and the ledger of it lives in your head. Write some of it down. Wide generosity lasts longest when it has edges.',
  },
  piancai_month_stem: {
    teaser: 'The working world reads you as the one who spots the opening. Your career pays in windfalls and timing, so keep a steady hand on the harvests.',
    domains: ['Career', 'Wealth', 'Social'],
    defline: 'Opportunity stands at your Month Gate: the working world sees the dealmaker, already reaching.',
    reading: 'This position rules Career and Wealth. Professionally you are the door-opener: territories, markets, introductions, the number that gets a first meeting. Careers with horizons suit you, trade, expansion, brokerage, anything where reach is rewarded. Desks kill you slowly. Your income will arrive in weathers rather than salaries, so build your life to metabolize a variable feast. The reach is the gift. The follow-through you must hire, marry, or become.',
  },
  piancai_month_branch: {
    teaser: 'Under your prime runs a trader’s instinct: you sense value moving before it moves. Trust it in the field, and let someone patient mind the vault.',
    domains: ['Career', 'Wealth'],
    defline: 'Opportunity holds your chart’s strongest seat: your prime is a marketplace, and you own a stall.',
    reading: 'This position rules Career and Wealth from the strongest seat there is. Your prime years are commercially alive: ventures find you, money multiplies when moving, and your best work happens in the open market rather than the org chart. The danger is dilution, six ventures at fifteen percent. Pick the two that compound. A prime like this does not need more doors. It needs the discipline to walk fully through one.',
  },
  piancai_day_branch: {
    teaser: 'You are drawn to partners with range, people who open doors you would not find alone. Marriage, for you, is also where opportunity walks in.',
    domains: ['Love', 'Social', 'Wealth'],
    defline: 'Opportunity sits in your spouse palace: your intimate life keeps a horizon in it.',
    reading: 'This position rules Love, Social, and Wealth, and it works from your marriage palace. The Horizon lives inside your Day Gate: at close range you are drawn to people with reach, partners who know somebody everywhere and see openings you would walk past. The adult chapters of your life gain range through the one beside you: introductions, ventures, money that moves because the household is connected. Your home tends toward open doors and full calendars, and your fortune genuinely likes it that way. The watch-point is scatter. Choose a partner whose breadth comes with a center, and anchor the shared accounts somewhere steady. Then let the doors keep opening. They are your weather.',
  },
  piancai_hour_stem: {
    teaser: 'You will stay opportunity’s friend to the end: late ventures, late windfalls, a wide door. Leave the estate mapped, because your generosity will outrun your paperwork.',
    domains: ['Wealth', 'Growth'],
    defline: 'Opportunity stands at your Hour Gate: your later years keep a venture warm and a bag half packed.',
    reading: 'This position rules Wealth and Growth late in life. Retirement, as commonly practiced, will not fit: your closing decades want projects, travel, and capital in play. Fortune stays kind to you when courted respectfully, later bets sized to later stakes. The young inherit your eye for openings, so teach it early. And park one asset where no opportunity can reach it. Even the luckiest sailor keeps a harbor.',
  },
  piancai_hour_branch: {
    teaser: 'Your late years keep a wide horizon: travel, ventures, younger company. Fortune stays kind to you as long as something in your life stays in motion.',
    domains: ['Family', 'Wealth'],
    defline: 'Opportunity lives inside your Hour Gate: your harvest arrives from many fields, some you forgot planting.',
    reading: 'This position rules Family and Wealth at the root of late life. Your endings gather widely: far-flung children, scattered investments, kindnesses returning decades late from people you barely remember helping. It makes for a rich, slightly unmappable harvest. Consolidate gently in your fifties, name things, gather papers, tell the stories that explain the assets. A wide life ends warmest when someone can find all of it.',
  },
  zhengcai_year_stem: {
    teaser: 'You learned early what things cost, and it shows in how carefully you build. Money grows for you the slow way, and it starts close to home.',
    domains: ['Wealth', 'Family'],
    defline: 'The Steward stands at your Year Gate: prudence is the family trait your story shows first.',
    reading: 'This position rules Wealth and Family, and it rules them from your beginnings. The Steward stood openly at your Year Gate: a household that provided by planning, elders who counted carefully, a childhood where money had rules and the rules mostly held. The world still reads that face on you, dependable and early to save. Money learned young stays learned: your fortune keeps favoring the long way around. Through the family line come your steadiest assets, advice worth taking and sometimes property worth keeping. Honor the thrift you inherited, and spend on purpose now and then. Permission to enjoy it is part of the estate.',
  },
  zhengcai_year_branch: {
    teaser: 'Thrift is in your roots: a home that counted carefully and wasted little. Your fortune compounds the same way, quietly, and earlier than anyone notices.',
    domains: ['Family', 'Wealth'],
    defline: 'The Steward lives inside your Year Gate: your root is a kept house, and it keeps you still.',
    reading: 'This position rules Family and Wealth. The root of your beginnings is maintenance as love: someone paid the bills quietly, fixed things before they broke, and taught you that care looks like continuity. Security, for you, is a foundation stone rather than a preference. Build it early and honestly, then relax inside it. The risk of this root is confusing the vault with the life. The house was kept so living could happen.',
  },
  zhengcai_month_stem: {
    teaser: 'The working world trusts you with money and should. Your career rewards stewardship: steady roles, real budgets, value kept. Wealth arrives on schedule rather than by surprise.',
    domains: ['Career', 'Wealth'],
    defline: 'The Steward stands at your Month Gate: the working world sees the safe pair of hands.',
    reading: 'This position rules Career and Wealth. Professionally you are trusted with things: budgets, operations, other people’s assets, the keys. Your reputation compounds slowly and never crashes, which in a long career beats brilliance. Fields of custody suit you, finance, management, land, law. You will be underestimated by flashier colleagues and outlast every one of them. Ask for the title you have already been doing. Stewards are promoted late mainly because they never demand it.',
  },
  zhengcai_month_branch: {
    teaser: 'Your prime is built on earned ground: income you can explain, assets you maintain. It grows slower than you would like and further than you expect.',
    domains: ['Career', 'Wealth'],
    defline: 'The Steward holds your chart’s strongest seat: your prime compounds, brick by deliberate brick.',
    reading: 'This position rules Career and Wealth from the deepest seat a chart has. Your prime is an accumulation engine: skill gathered into position, position into assets, assets into quiet options. Nothing about it is dramatic and everything about it is durable. The single hazard is rigidity, holding a working formula two markets too long. Schedule reinvention every seventh year on purpose. Compounding is your gift. Refusing to re-pot it is the only way you lose.',
  },
  zhengcai_day_branch: {
    teaser: 'You are made for steady love: a partner who keeps what you build and builds what you keep. Marriage becomes your most reliable asset, tended like one.',
    domains: ['Love', 'Family'],
    defline: 'The Steward sits in your spouse palace: you love in deposits, steadily, for keeps.',
    reading: 'This position rules Love and Family. Intimacy, for you, is a long account: loyalty paid in daily, promises kept until they are furniture, a partner chosen once and tended for decades. It is the marrying position, and it rewards you richly for choosing well, which means slowly. Beware love as maintenance only. Devotion needs occasional extravagance the way houses need windows. Waste something on them regularly. That, too, is keeping.',
  },
  zhengcai_hour_stem: {
    teaser: 'Whatever the middle years scatter, you end well provided for. What you save builds toward an old age that pays its own way, with something left to hand on.',
    domains: ['Wealth', 'Family'],
    defline: 'The Steward stands at your Hour Gate: what you show the future is order, provided for.',
    reading: 'This position rules Wealth and Family, and it governs how your story ends. The Steward stands at your Hour Gate, plainly visible in the last chapters: whatever the middle years scatter, your late life organizes, funds, and keeps. Provision is the shape your love takes as you age, and the people after you will feel it as safety. Children and juniors learn money from watching you, which is a better inheritance than the money. Expect your estate to land where you point it, because you will have pointed it carefully. Two counsels: retire the guilt about comfort, and give some of it away while your hands are still warm.',
  },
  zhengcai_hour_branch: {
    teaser: 'Security deepens with age: the root of your late years is provision done right. Children learn thrift from you, and your estate lands where you intend it.',
    domains: ['Family', 'Health', 'Wealth'],
    defline: 'The Steward lives inside your Hour Gate: your harvest is everything you maintained, still standing.',
    reading: 'This position rules Family and Health at the root of late life, with Wealth beneath both. Your old age is built from upkeep: the body serviced on schedule, the marriage resoled every decade, the house that outlasts its street. Continuity is your pension. Its quiet risk is smallness, a kept life that forgot to grow. Add one new thing each year, a skill, a place, a person. Preservation stays noble only while something is still being planted.',
  },
  qisha_year_stem: {
    teaser: 'Your beginnings carried real pressure, and everyone could see you carrying it. It forged you early. Expect authority to find you young and test you often.',
    domains: ['Social', 'Career'],
    defline: 'The General stands at your Year Gate: the world’s first read of you is force.',
    reading: 'This position rules Social and Career. You broadcast intensity before you speak: strangers sit straighter around you and assume you are in charge, which becomes true suspiciously often. An early life with real pressure in it forged the bearing. Command is your resting state, so choose consciously when to holster it. The presence that wins you authority costs you ease. Off duty, show your hands. People follow longer when they stop bracing.',
  },
  qisha_year_branch: {
    teaser: 'Some early weight pressed on you where no one watched, and you turned it into spine. Crisis will always promote you: it is your native ladder.',
    domains: ['Family', 'Growth', 'Health'],
    defline: 'The General lives inside your Year Gate: your root was forged, not furnished.',
    reading: 'This position rules Family and Growth, and it marks Health. The root of your story holds pressure: a demanding house, an early responsibility, a childhood that skipped some childhood. It built load-bearing character and a nervous system that treats peace as suspicious. As an adult, you seek battles partly to feel at home. Honor the forging, it made you formidable. Then teach your body the drill it never learned. Standing down is also a discipline.',
  },
  qisha_month_stem: {
    teaser: 'The working world reads command on you before you speak. Careers with stakes suit you, and your rank rises fastest where others crack.',
    domains: ['Career', 'Social'],
    defline: 'The General stands at your Month Gate: the working world sees command presence and expects orders.',
    reading: 'This position rules Career and Social. Professionally you are given the hard things: crises, turnarounds, teams that need spine. Authority finds you even in flat organizations, because pressure reveals you rather than bending you. Fields with stakes suit you, command, surgery, enforcement, emergency, competition. Comfortable roles rot you visibly. Build one habit above all: praise in public, correct in private. Feared leaders win campaigns. Respected ones keep the army.',
  },
  qisha_month_branch: {
    teaser: 'Your prime runs under pressure by design: you choose hard arenas because ease bores you. Power arrives midlife, through the campaigns nobody else would take.',
    domains: ['Career', 'Health'],
    defline: 'The General holds your chart’s strongest seat: your prime is a campaign, won by discipline.',
    reading: 'This position rules Career and Health from the chart’s deepest seat. Your prime years run at wartime spec: ambition with teeth, capacity that grows under load, a career of positions taken and held. You can carry what breaks colleagues, which is exactly why your body keeps the ledger your mind refuses. Sleep, train, and decompress on schedule, like logistics, because they are. Campaigns are lost two ways. Weak enemies never. Neglected supply lines, always.',
  },
  qisha_day_branch: {
    teaser: 'You are drawn to intensity at close range: a partner with force, a home with weather. Love holds when the two of you aim the pressure outward together.',
    domains: ['Love', 'Health'],
    defline: 'The General sits in your spouse palace: love, for you, has a chain of command to dismantle.',
    reading: 'This position rules Love and Health. Intimacy arrives armored: you protect fiercely, provoke instinctively, and test partners for spine before trusting them with softness. Passion runs high voltage here, and so do battles. The work of your romantic life is learning that home is not terrain. A partner is not a lieutenant, and surrender, occasionally, is not defeat. Choose someone unafraid of you. Then prove them right slowly.',
  },
  qisha_hour_stem: {
    teaser: 'You will command to the end, and the young will both fear and follow you. Late authority is yours: soften the orders and the loyalty doubles.',
    domains: ['Career', 'Growth', 'Family'],
    defline: 'The General stands at your Hour Gate: your later years keep rank, and the young feel it.',
    reading: 'This position rules Career and Growth in their late forms, and it shapes Family. You do not disarm with age: the closing decades hold your largest commands, institutions steered, standards enforced, successors drilled. The young inherit your discipline and fear your judgment in equal measure. Soften the delivery, never the standard. A last campaign led warmly is the difference between being obeyed to the end and being loved past it.',
  },
  qisha_hour_branch: {
    teaser: 'The root of your late years is discipline that never quite retires. Expect standing, respect, and one more campaign than you planned. Keep a gate for rest.',
    domains: ['Health', 'Family', 'Growth'],
    defline: 'The General lives inside your Hour Gate: the root of your harvest is strength, held to the last.',
    reading: 'This position rules Health and Family at the root of late life. You will be the strong old one, the elder others physically lean on, and your discipline will decide how long that stays true. Train like it matters, because it is your retirement plan. With children and heirs, loosen the grip one finger per decade. What you defended them from, they must eventually fight. The best generals leave soldiers, not dependents.',
  },
  zhengguan_year_stem: {
    teaser: 'You come from order worn openly: a respectable name, early rules, standards met. Reputation is your inheritance, and it keeps paying as long as you keep it clean.',
    domains: ['Social', 'Family'],
    defline: 'Order stands at your Year Gate: respectability is the first thing your story shows.',
    reading: 'This position rules Social and Family. You were raised visible: a family with standards, a name to maintain, conduct watched and graded early. It gave you effortless propriety, people trust you on sight and put you on committees. The inheritance runs deep enough that shame is your sharpest pain. Keep the honor, drop the audience. A reputation is worth keeping only while it stays lighter than the person carrying it.',
  },
  zhengguan_year_branch: {
    teaser: 'Discipline was the air of your early home, felt more than announced. It gave you a straight spine. Institutions will trust you early and promote you steadily.',
    domains: ['Family', 'Growth'],
    defline: 'Order lives inside your Year Gate: your root is a rulebook, learned before you could read it.',
    reading: 'This position rules Family and Growth. The root of your beginnings is structure: a household of expectations, duty modeled daily, right and wrong served with dinner. It built your spine and your ceiling both. As an adult you carry an inner magistrate whose approval you still seek. Retire him gradually. Keep the integrity he taught you, and quietly stop asking his permission. Grown correctness answers to conscience, not to childhood.',
  },
  zhengguan_month_stem: {
    teaser: 'The working world sees the officer in you: reliable, correct, promotable. Your career climbs by rank and record, and your name will matter more than your salary.',
    domains: ['Career', 'Social'],
    defline: 'Order stands at your Month Gate: the working world sees an officer, promotable on sight.',
    reading: 'This position rules Career and Social. You are built for institutions: rank reads on you, procedure obeys you, and ladders feel like home terrain. Government, law, corporations, any structured hierarchy will recognize and raise you. Your word is your collateral, so never spend it. The risk is the ladder itself, climbing well past the floor you wanted. Every few years, check the building. A perfect ascent in the wrong tower is still the wrong tower.',
  },
  zhengguan_month_branch: {
    teaser: 'Your prime is built for responsibility: the frame of your working life is duty done properly. Titles find you midlife, and they tend to stick.',
    domains: ['Career', 'Growth', 'Social'],
    defline: 'Order holds your chart’s strongest seat: your prime is an office held with honor.',
    reading: 'This position rules Career and Growth from the strongest seat there is. Your prime years belong to institutions: responsibility arrives early, titles fit, and your name becomes a small standard others measure by. You succeed by being dependable at scale. The hazard is calcification, order kept for its own sake while the mission quietly leaves. Re-read the mission yearly. You were made an officer to serve something. Keep remembering what.',
  },
  zhengguan_day_branch: {
    teaser: 'You are built for committed love: a principled partner, a household that runs on kept promises. Marriage steadies your whole chart, and it arrives with weight and stays.',
    domains: ['Love', 'Family'],
    defline: 'Order sits in your spouse palace: you love formally, faithfully, and for the record.',
    reading: 'This position rules Love and Family. Partnership, for you, is a vow before it is a feeling: you commit completely, honor the contract, and expect the same spine in return. It is the marriage position, stable, respectable, built to last decades. Its shadow is administration, a household run so correctly that romance files for neglect. Break your own protocol on purpose sometimes. The vow holds better when the two of you occasionally elope from it.',
  },
  zhengguan_hour_stem: {
    teaser: 'Your standing grows with age: honors late, respect that outlives the job. Children measure themselves against your standards, so praise them before you correct them.',
    domains: ['Family', 'Social', 'Career'],
    defline: 'Order stands at your Hour Gate: what you show the future is standards, upheld to the end.',
    reading: 'This position rules Family and Social in their closing forms, with Career’s last chapter inside them. You will finish as the standard-bearer: the elder whose approval means something, the name attached to endowments, rules, and doors. Heirs inherit your correctness, so demonstrate mercy alongside it, or they will inherit the cage too. Endorse the young loudly while you are alive to do it. A blessing given late is worth ten written into wills.',
  },
  zhengguan_hour_branch: {
    teaser: 'Order is the root of your late years: affairs settled, duties completed, a name in good repair. Your legacy will be trusted, which is rarer than being missed.',
    domains: ['Family', 'Growth'],
    defline: 'Order lives inside your Hour Gate: the root of your harvest is a life that kept its word.',
    reading: 'This position rules Family and Growth at the root of late life. Your ending is orderly by construction: duties completed, relationships in their right standing, a conscience with clean books. That peace is real and earned. What remains is the one liberty correctness postponed, the trip, the art, the truth told loose. Take it while your knees permit. A kept word is a monument. A kept self is a life.',
  },
  pianyin_year_stem: {
    teaser: 'You were the watchful child, visibly different in how you learned. Your path stays unconventional: the strange skills gathered early become the livelihood nobody predicted.',
    domains: ['Mind', 'Social'],
    defline: 'The Alchemist stands at your Year Gate: the world’s first read of you is depth, slightly apart.',
    reading: 'This position rules Mind and Social. You arrived observant: the child at the edge of the party, cataloguing, and the adult strangers call an old soul within minutes. Your public self thinks visibly, which draws the curious and unnerves the shallow. An unusual elder or education likely seeded it. Wear the strangeness openly, it filters your company for you. The ones who stay past the silence were always your people.',
  },
  pianyin_year_branch: {
    teaser: 'Your roots hold an unusual nurture: care that came sideways, through books, silence, or an unconventional guardian. Solitude restores you, and always will.',
    domains: ['Family', 'Mind', 'Growth'],
    defline: 'The Alchemist lives inside your Year Gate: your root drinks from an odd, deep well.',
    reading: 'This position rules Family and Mind. The root of your story is unconventional nourishment: a lineage with a mystic, a scholar, or a beautiful crank in it, a childhood fed on books, silence, or secrets. You metabolize experience into meaning by inheritance. The same root can carry old loneliness forward. Study it like everything else you study. The family strangeness is your material, not your sentence.',
  },
  pianyin_month_stem: {
    teaser: 'The working world sees your odd angle first: the specialist, the diagnostician, the one who reads between. Career luck favors your niche over any ladder.',
    domains: ['Career', 'Mind'],
    defline: 'The Alchemist stands at your Month Gate: the working world sees the specialist it does not quite understand.',
    reading: 'This position rules Career and Mind. Professionally you are the deep one: the analyst, researcher, diagnostician, the person handed problems that have already defeated the confident. Your value is genuine and badly self-advertised, because visible thinking is not visible output. Fields of depth suit you, research, strategy, medicine, code, the hidden corners of any trade. Find one translator, a boss or partner who sells what you see. Depth plus a spokesman is a career with no ceiling.',
  },
  pianyin_month_branch: {
    teaser: 'Your mind works in private, on things most people find strange, and that is exactly where your career luck lives. The niche will pay what the mainstream never will.',
    domains: ['Mind', 'Growth', 'Career'],
    defline: 'The Alchemist holds your chart’s strongest seat, the month branch, and does its thinking from the middle of your working life.',
    reading: 'This position rules Mind, Growth, and Career, and it rules them from the deepest seat your chart has. The Alchemist lives inside your Month Gate, hidden in the engine of your prime: your working life runs on private study, sideways insight, and an appetite for what most people overlook. Colleagues see the results and rarely the method. Through your prime years the pattern holds: the specialist path outpays the general one, and your best openings arrive through knowledge nobody asked you to gather. Mentors matter, though the unconventional ones serve you best. Guard time alone the way others guard salary. For you it is the same thing, and midlife will prove it.',
  },
  pianyin_day_branch: {
    teaser: 'You need a partner who respects your inner weather: closeness with breathing space built in. Marriage works as two studies with a shared door.',
    domains: ['Love', 'Mind'],
    defline: 'The Alchemist sits in your spouse palace: intimacy, for you, begins where small talk dies.',
    reading: 'This position rules Love and Mind. You bond through the inner life: a partner must be interesting to your depths, not just kind to your days, and silence together must feel like company. You withdraw to process, which reads as distance to the unstudied. Teach your person your weather signs early. The love this position writes is rare and quiet and total. Its only enemy is going unexplained.',
  },
  pianyin_hour_stem: {
    teaser: 'Late life sharpens your insight instead of dulling it. You will mentor the strange and gifted, and your best ideas may arrive after everyone expects them.',
    domains: ['Mind', 'Growth', 'Career'],
    defline: 'The Alchemist stands at your Hour Gate: your later output turns inward, and finer.',
    reading: 'This position rules Mind and Growth in their late forms. Your closing decades are your deepest: the reading finally done, the framework finished, wisdom distilled past cleverness. Late study, for you, is a metamorphosis rather than a hobby, so expect a genuine second mind after sixty. Publish it, teach it, or at minimum write it down. The young will need your strange map exactly one generation after you stop being able to draw it.',
  },
  pianyin_hour_branch: {
    teaser: 'The root of your late years is the inner library: study, intuition, chosen quiet. Age will suit you, because depth is the one asset that only accrues.',
    domains: ['Family', 'Mind', 'Growth'],
    defline: 'The Alchemist lives inside your Hour Gate: the root of your harvest is understanding, finally ripe.',
    reading: 'This position rules Mind and Family at the root of late life. Your old age keeps a lit study: the elder others visit for the real conversation, the grandparent who explains what parents cannot. Solitude remains your medicine, so build a household that honors the closed door without fearing it. What you hand down is comprehension. Wrap it warmly. Understanding is the one inheritance that cannot be taxed, only ignored.',
  },
  zhengyin_year_stem: {
    teaser: 'You were sheltered by someone principled, and it shows in your bearing. Learning is your inheritance: credentials, teachers, and timely protection keep appearing across your life.',
    domains: ['Family', 'Mind'],
    defline: 'Care stands at your Year Gate: the first thing your story shows is that you were well held.',
    reading: 'This position rules Family and Mind. You carry visible shelter: the manner of someone believed in early, likely by a mother or teacher whose faith still lines your voice. People sense you were loved competently and trust you accordingly. Learning comes to you as birthright, degrees, mentors, doors held open. Pass the holding on, it is the family business. Just remember that shelter received must eventually be built, or it stays borrowed.',
  },
  zhengyin_year_branch: {
    teaser: 'Deep in your roots is real nurture, a mother-warmth that took. You default to trust, and life keeps rewarding it with protectors you did not request.',
    domains: ['Family', 'Growth', 'Health'],
    defline: 'Care lives inside your Year Gate: your root is shelter itself, deep and possibly too warm.',
    reading: 'This position rules Family and Health. The root of your beginnings is protection: a childhood cushioned, a mother-force strong in the walls, safety as the house style. It gave you a nervous system that heals and a baseline trust most people lack. The shade side is late launching, shelter that lingered into softness. Whatever you were protected from, go meet a sized version of it yearly. Roots this kind must be outgrown gratefully, not obeyed.',
  },
  zhengyin_month_stem: {
    teaser: 'The working world reads you as credible: the one with the knowledge and the calm. Your career advances through reputation and study, and elders open the doors.',
    domains: ['Career', 'Mind', 'Social'],
    defline: 'Care stands at your Month Gate: the working world sees the teacher, and brings it students.',
    reading: 'This position rules Career and Mind. Professionally you are the credentialed shelter: the mentor, the editor, the physician, the one whose sign-off soothes. Institutions of knowledge and care fit you like made clothes, education, medicine, publishing, counsel. Your authority is soft and durable. Its risk is invisibility, the teacher eclipsed by the taught. Claim your name on your work without apology. Generosity with credit is a virtue. Anonymity is just a leak.',
  },
  zhengyin_month_branch: {
    teaser: 'Your prime is carried by learning: the deeper the study, the steadier the rise. Expect your name to rest on what you know, and to age well.',
    domains: ['Mind', 'Career', 'Growth'],
    defline: 'Care holds your chart’s strongest seat: your prime is built on learning that never stops arriving.',
    reading: 'This position rules Mind and Career from the deepest seat a chart has. Your prime runs on absorbed knowledge: you learn faster than your field produces, and your career compounds through understanding rather than positioning. Reputation arrives as trust, students, patients, readers, referrals. The hazard is passivity, knowing so much that doing feels optional. Ship something every season. In this chart, wisdom unapplied does not store. It sours.',
  },
  zhengyin_day_branch: {
    teaser: 'You are built to be cared for at close range, and to trust it. Marriage brings shelter: a partner whose steadiness becomes your second spine.',
    domains: ['Love', 'Family', 'Health'],
    defline: 'Care sits in your spouse palace: home, for you, must be a harbor before it is anything else.',
    reading: 'This position rules Love and Family, and it tends Health. You partner for peace: a home that restores, a person who is also a resting place, love expressed as looking after. You will likely marry someone who needs your shelter or supplies it, so watch the balance. Mothers and in-laws stand close to this palace, so set the doors early. At its best, this is the marriage people recover inside. Keep a little weather in it anyway. Harbors still need tides.',
  },
  zhengyin_hour_stem: {
    teaser: 'You will end as the elder people consult: knowledge kept warm and given away. Teach deliberately, because your protection of others is what history keeps.',
    domains: ['Family', 'Growth', 'Mind'],
    defline: 'Care stands at your Hour Gate: what you show the future is teaching, given freely.',
    reading: 'This position rules Family and Growth in their closing forms. Your later years turn maternal regardless of gender: students gathered, grandchildren tutored, juniors shielded while they find their feet. Knowledge is your bequest and you will give it away with both hands, correctly. Guard against rescuing the young from their necessary storms. The last lesson a great teacher gives is stepping back. Shelter that knows when to open is the kind that gets remembered.',
  },
  zhengyin_hour_branch: {
    teaser: 'The root of your late years is quiet backing: pensions of goodwill, children who shelter you, sleep that comes easily. Kindness banked early pays your old age.',
    domains: ['Family', 'Health', 'Mind'],
    defline: 'Care lives inside your Hour Gate: the root of your harvest is peace, tended into permanence.',
    reading: 'This position rules Health and Family at the root of late life. Your ending intends gentleness: a body that responds to care, a mind that keeps its library, younger hands that arrive unasked because you taught them arriving. Invest in that outcome now, health kept like scholarship, kindness distributed like tuition. The shade to watch is retreat, comfort narrowing into a small warm circle. Keep one draft of cold air. It is how you know the door still opens.',
  },
};
