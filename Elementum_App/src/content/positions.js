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

// (the SET_PIECES ×5 one-liners were superseded 2026-08-19 by the
// TG_PATTERN axis — src/content/tgPatterns.js — which carries each
// pattern's full cell: line + reading + fused_line, owner directive:
// the relation patterns are the 精华 and a first-class reading angle)

// The locked corpus ×70, keyed `${godId}_${slotId}`.
export const POSITION_READINGS = {
  bijian_year_stem: {
    teaser: 'Independence was the family lesson, and you took it early. Expect a life where help arrives late and pride arrives first, and you manage anyway.',
    domains: ['Social', 'Family'],
    defline: 'The Twin stands at your Year Gate: independence is the first thing your story shows, inherited and worn openly.',
    reading: 'This position rules Social and Family, and it rules them from your beginnings. The Twin stood openly at your Year Gate: a self-made line, a family that praised standing on your own feet, a childhood where help was earned. The world still meets that face first, capable and unleaning. Friendships form the way siblings do for you, level or never. Expect early independence to keep paying: doors open because people trust you to carry your side. The inheritance has one gap, and you know it. Practice asking. The strong version of you can afford to.',
  },
  bijian_year_branch: {
    teaser: 'Some part of you grew up fast and private, learning to need very little. That toughness holds, though letting people in will always take deliberate effort.',
    domains: ['Family', 'Growth'],
    defline: 'The Twin lives inside your Year Gate: the root of your early world was learning to hold your own.',
    reading: 'This position rules Family and Growth, and it works from the root of your story. The Twin lives inside your Year Gate, the hidden face: somewhere early you became your own backup, in a house that treated small people as capable ones. The root took, and it still holds your weight. Growth for you starts from self-trust, and it always will. Family bonds run level, brothers and sisters in spirit if they were level too. The counsel is gentle: some help is worth accepting purely to stay in practice. Sturdiness that never leans eventually forgets how.',
  },
  bijian_month_stem: {
    teaser: 'You do your best work as nobody’s junior. Midlife rewards your independence, though shared money with friends will need clearer lines than friendship likes.',
    domains: ['Career', 'Social'],
    defline: 'The Twin stands at your Month Gate: the working world sees a colleague who carries their own weight, visibly.',
    reading: 'This position rules Career and Social, and it runs the prime of your life. The Twin stands at your Month Gate in full view: the working world meets you as the equal, the colleague who owns whole tasks and quietly declines to be managed. From your twenties into your forties, rank comes to you through competence witnessed, and partnership taxes your speed. You feel both. Among peers and siblings the same law repeats: bonds hold best side by side, never one above the other. So keep money clean with friends, written down and unromantic. Choose the two or three long roads worth sharing the wheel for. The short ones were always yours.',
    domain_readings: {
      Career: 'Your working life is a solo instrument played in public: you rise on competence witnessed, own tasks whole, and stall wherever credit blurs. Choose roles with clean scoreboards. Promotion for you follows visibility of workmanship, so work where the work can be seen, and signed.',
      Social: 'Your circle runs level: peers, never patrons, and friendship as a pact between equals. People trust you fast and lean on you rarely, because you signal so little need. Let two or three actually in. The Twin’s crowd is small on purpose, and it holds when chosen well.',
    },
  },
  bijian_month_branch: {
    teaser: 'Your prime runs on your own engine: careers built alone hold, careers built on rescue stall. Equity and credit stay cleanest when they are written down early.',
    domains: ['Career', 'Growth'],
    defline: 'The Twin holds your chart’s strongest seat: your prime runs on self-reliance, built into the frame itself.',
    reading: 'This position rules Career and Growth, and it holds the deepest seat your chart has. The Twin lives inside your Month Gate: the engine of your prime is self-propulsion, careers built with your own hands and defended with your own name. Autonomy is oxygen through your working decades, and bosses either learn that or lose you. Growth compounds when the skill is yours outright. Money made with partners blurs, so write the equity down while everyone still likes each other. Your prime will carry you exactly as far as your own engine is maintained. Maintain it.',
  },
  bijian_day_branch: {
    teaser: 'In love you need an equal, someone with a spine that matches yours. Marriage will feel like a partnership of captains, and it works when neither keeps score.',
    domains: ['Love', 'Social'],
    defline: 'The Twin sits in your spouse palace: you partner as an equal, and only as an equal.',
    reading: 'This position rules Love and Social, and it works from your marriage palace. The Twin lives inside your Day Gate: at close range you need an equal, a partner whose spine matches yours, and romance built on leaning never holds you long. Your adult chapters run as a two-captain household, strong, frank, occasionally a contest. Friends of the marriage tend to be shared and loyal. Watch for score-keeping in the kitchen, the quiet ledger of who did what. Choose someone you admire, then let them carry you now and then. That is the hard move, and the marriage-saving one.',
  },
  bijian_hour_stem: {
    teaser: 'You will age on your own terms and make it look easy. The young learn self-reliance from watching you, so leave the door open while you stand alone.',
    domains: ['Growth', 'Family'],
    defline: 'The Twin stands at your Hour Gate: what you show the future is independence, taught by demonstration.',
    reading: 'This position rules Growth and Family, and it shapes how your story ends. The Twin stands at your Hour Gate, visible to the last: you will age on your own terms, keys kept, help declined politely. What you show children and juniors is self-reliance done with dignity, and they will copy it whether you narrate it or leave it silent. Late growth stays real for you, new skills after most people stop. One counsel from the old readings: stand alone with the door open. The young remember both, and they return to the second.',
  },
  bijian_hour_branch: {
    teaser: 'Your later years run on a few chosen equals, friends who became family. Invest in that small circle now: it is the pension no market touches.',
    domains: ['Family', 'Growth'],
    defline: 'The Twin lives inside your Hour Gate: the root of your late life is company of equals, kept small and true.',
    reading: 'This position rules Family and Growth, and it works in the root of your late years. The Twin lives inside your Hour Gate: your harvest runs on a few chosen equals, friends who became family, children raised to stand level with you. The root wants respect more than care, and it will trade comfort for dignity every time it is asked. So build the small circle now that you intend to grow old inside. Two or three people who never needed you weak will keep your last chapters warm, and your independence honest.',
  },
  jiecai_year_stem: {
    teaser: 'Daring runs in your bloodline and shows early. Money moves fast around you, in and out, so your fortune favors nerve backed by a ledger someone honest keeps.',
    domains: ['Wealth', 'Social'],
    defline: 'This bold companion stands at your Year Gate: daring runs in the visible bloodline.',
    reading: 'This position rules Wealth and Social, and it rules them from your beginnings. The Rival stood openly at your Year Gate: a bold line, money that moved fast around your childhood, charm as the family currency. You inherited the nerve and the leak. People take to you quickly, and your daring opens what patience cannot. The pattern to respect: windfalls arrive social, through friends, crowds, and shared bets, and they leave the same way. Keep an honest ledger somewhere boring. Your fortune favors the brave with bookkeeping.',
  },
  jiecai_year_branch: {
    teaser: 'You grew up where mine and yours blurred, and it made you generous and watchful at once. Keep sharing on purpose: looseness with money costs you relationships first.',
    domains: ['Family', 'Wealth'],
    defline: 'Inside your Year Gate sits the shared purse: early life taught you that what is yours is rarely only yours.',
    reading: 'This position rules Family and Wealth, and it works from the root of your story. The Rival lives inside your Year Gate: you grew up where mine and yours blurred, pooled money, borrowed things, siblings or cousins close enough to claim. It made you generous and alert in the same breath. As an adult you give easily and count quietly, and both instincts are correct. Family will always have a hand near your pocket, mostly with love. Share on purpose, in writing where it matters. Clarity is how this root stays warm instead of expensive.',
  },
  jiecai_month_stem: {
    teaser: 'At work you compete the way others breathe, and people feel it. Your career rises fastest in open contests, and slowest wherever the prize must be split.',
    domains: ['Career', 'Social'],
    defline: 'At your Month Gate stands the daring colleague: the working world sees your nerve first.',
    reading: 'This position rules Career and Social, and it runs the prime of your life. The Rival stands at your Month Gate in full view: the working world reads your nerve first, the colleague who volunteers for the contest. Your prime rewards open competition, commissions, rankings, arenas with scoreboards, and it punishes vague partnerships. Allies come easily and rotate often. Through your thirties and forties, the wins are personal and the losses are usually shared bets. So compete in the open, split the prize before the race, and keep one rival you respect. They are your best coach.',
  },
  jiecai_month_branch: {
    teaser: 'Under your working life runs a gambler’s pulse: bold moves feel safer to you than waiting. Midlife pays your courage well once partners stop holding your purse.',
    domains: ['Career', 'Wealth', 'Social'],
    defline: 'Inside your Month Gate runs the gambler’s current: your prime years are built for bold, shared ventures.',
    reading: 'This position rules Career, Wealth, and Social, and it holds the deep seat of your prime. The Rival lives inside your Month Gate: under your working life runs a gambler’s pulse, bold moves feeling safer than waiting ever does. Careers with stakes suit you, sales, ventures, anything scored in public. Money through your middle decades comes in surges and leaves through company, so the vault needs one patient keeper who is not you. Friends double as colleagues and sometimes as costs. Bet your courage, insure your floor, and your prime pays the brave version of you handsomely.',
  },
  jiecai_day_branch: {
    teaser: 'You fall for bold ones, partners with fire and opinions. Home will never be dull, and it stays happy when the money keeps separate lanes.',
    domains: ['Love', 'Wealth'],
    defline: 'In your spouse palace lives the fellow gambler: love, for you, is a joint venture with real stakes.',
    reading: 'This position rules Love and Wealth, and it works from your marriage palace. The Rival lives inside your Day Gate: you fall for bold ones, partners with fire, opinions, and their own way with money. Home will never be dull. Your adult chapters carry a contested-purse quality at close range, generous seasons and tight ones, and the marriage stays happiest when the accounts keep separate lanes with one shared road. Admire the fire, fund the household by rule, and let the passion argue about anything except the rent. That division keeps both love and money warm.',
  },
  jiecai_hour_stem: {
    teaser: 'You will show the future your nerve: heirs and juniors copy your boldness first. Budget for late generosity, because people will ask, and you will want to say yes.',
    domains: ['Wealth', 'Growth'],
    defline: 'At your Hour Gate stands the risk-taker: your later ambitions stay bold, and visibly so.',
    reading: 'This position rules Wealth and Growth, and it shapes how your story ends. The Rival stands at your Hour Gate, visible in the last chapters: heirs and juniors copy your nerve first, and people will keep asking you to back them late into life. Some of that backing is your genuine growth, the pleasure of funding the young and the bold. Some is leak wearing a warm face. Decide the number early, the amount your yes can afford each year, and give inside it freely. Boldness with a boundary reads as legacy. Without one it reads as lesson.',
  },
  jiecai_hour_branch: {
    teaser: 'The people who come after you will have your fire and their own ideas. Late in life, generosity is your grace and your leak: give on purpose, not on request.',
    domains: ['Family', 'Wealth'],
    defline: 'Inside your Hour Gate sits the shared harvest: what you build late in life is built with others.',
    reading: 'This position rules Family and Wealth, and it works in the root of your late years. The Rival lives inside your Hour Gate: the generation after you carries your fire with its own steering, children and heirs who are charismatic, willful, and expensive in ways you will mostly forgive. Late life keeps a shared-purse quality: people close to you will reach for your resources, and your generosity will want to answer. Some of that is grace. Budget it anyway, on purpose, with numbers. Protect the retirement floor first and give from above it. Then the boldness you are leaving behind reads as legacy, and the leaks never get to write the ending.',
    domain_readings: {
      Family: 'Your late family life is vivid: heirs with your fire and their own compass, a household that debates because it cares. Do not mistake their independence for distance. The Rival’s children love by contending. Set the table anyway, referee lightly, and the noise turns out to be the warmth.',
      Wealth: 'Late wealth needs a gatekeeper, and it should be you on your clearest day: claims will come dressed as family, opportunity, and honor. Fix your giving number annually, protect the floor beneath your own feet first. Generosity from a defended base reads as blessing. From an open vault it reads as weather.',
    },
  },
  shishen_year_stem: {
    teaser: 'Warmth was your first language, learned young and worn openly. Doors open for you through charm and good taste, and they keep opening as long as you keep giving.',
    domains: ['Social', 'Health'],
    defline: 'The Artisan stands at your Year Gate: ease and charm are the first things your story shows.',
    reading: 'This position rules Social and Health, and it rules them from your beginnings. The Artisan stood openly at your Year Gate: warmth was your first language, learned young and worn where everyone could see it. People have fed you, hosted you, and forgiven you easily all your life, and your body has mostly returned the favor. Charm opens your doors, taste keeps them open. The constitution is genuinely good, and it stays good on rhythm rather than discipline. Keep the meals, the sleep, and the company regular. Your luck has manners, and it likes being fed.',
  },
  shishen_year_branch: {
    teaser: 'Somewhere early, someone fed you well, in every sense. That ease still lives underneath you, and providing for others will keep quietly providing for you.',
    domains: ['Family', 'Health'],
    defline: 'The Artisan lives inside your Year Gate: the root of your early world was nourishment, given and remembered.',
    reading: 'This position rules Family and Health, and it works from the root of your story. The Artisan lives inside your Year Gate, the hidden face: nourishment was built into your early world, as food, ease, or someone’s quiet generosity, and your body still remembers it. You restore quickly, you digest life well, and comfort works on you as medicine rather than indulgence. Blessing in your line flows downhill through the older generation, often by way of the kitchen. Health stays your quiet inheritance so long as you keep the habits that honor it. Feed people in your turn. Your luck has always traveled with the table, and it still does.',
    domain_readings: {
      Family: 'Your family root carries sweetness: somewhere in the early line, nurture was generous, and it still reaches you as an instinct for kinship and comfort. You gather relatives the way hearths gather chairs. Keep the recipes and the rituals. They are the family’s actual inheritance, and you are their keeper.',
      Health: 'Your constitution is fundamentally friendly: good digestion of food and of life, recovery that arrives with rest and a proper meal. The risks are indulgence-shaped rather than fragility-shaped. Keep pleasure rhythmic, feast and fast in gentle alternation, and this body will carry you further than most.',
    },
  },
  shishen_month_stem: {
    teaser: 'The working world knows you for the ease of what you make. Your career grows by appetite rather than ambition, and the work you enjoy pays best.',
    domains: ['Career', 'Social'],
    defline: 'The Artisan stands at your Month Gate: the working world sees the maker, gracious and unhurried.',
    reading: 'This position rules Career and Social, and it runs the prime of your life. The Artisan stands at your Month Gate in view: the working world knows you by the ease of what you make, output that flows without visible strain. Your prime grows by appetite rather than ambition, and the work you enjoy quietly outearns the work you force. Colleagues relax around you, which is a career asset dressed as a personality. The watch is drift: when everything flows, coasting feels like working. Pick one craft to deepen on purpose. Ease plus depth is your whole fortune.',
  },
  shishen_month_branch: {
    teaser: 'Craft sits in your bones: your prime years produce steadily, without drama, and better than louder people. Guard your health and routine, they are your production line.',
    domains: ['Career', 'Health'],
    defline: 'The Artisan holds your chart’s strongest seat: your prime runs on craft, flow, and sustainable pleasure.',
    reading: 'This position rules Career and Health, and it holds the deep seat of your prime. The Artisan lives inside your Month Gate: craft sits in your bones, and your working decades produce steadily, without drama, better than louder people manage. The engine is physical. Your output rises and falls with sleep, food, and routine, so the production line is literally your body. Careers in making, feeding, teaching, and tending pay you twice. Guard the habits the way others guard titles. Kept well, this seat gives you the rarest career arc: long, calm, and still improving at the end.',
  },
  shishen_day_branch: {
    teaser: 'You are built for a warm table and a gentle partner. Marriage feeds you, literally and otherwise, and your best fortune gathers around the home you two keep.',
    domains: ['Love', 'Family', 'Health'],
    defline: 'The Artisan sits in your spouse palace: home, for you, is where life gets savored.',
    reading: 'This position rules Love, Family, and Health, and it works from your marriage palace. The Artisan lives inside your Day Gate: you are built for a warm table and a gentle partner, and your best fortune gathers around the home you two keep. Love, for you, is fed daily rather than declared. The household tends toward comfort, good food, and soft evenings, and your health rises with the quality of your home life more than any regimen. Choose the person who makes ordinary days delicious. Guard the table together. Everything else in your chart eats from it.',
  },
  shishen_hour_stem: {
    teaser: 'What you make late in life may outshine everything before it. Children and students take after your gifts, and your last chapters read sweeter than your first.',
    domains: ['Family', 'Career'],
    defline: 'The Artisan stands at your Hour Gate: what you show the future is the joy of making.',
    reading: 'This position rules Family and Career, and it shapes how your story ends. The Artisan stands at your Hour Gate, visible in the last chapters: what you make late in life may outshine everything before it, and the young inherit your gifts along with your recipes. Children and students take after you in the best ways, ease, kindness, appetite. Your late career leans toward mentoring, hosting, and finishing the beautiful projects the busy years postponed. Plan for a productive old age rather than a resting one. Your sweetness compounds, and the last chapters read like dessert.',
  },
  shishen_hour_branch: {
    teaser: 'Ease deepens as you age: the root of your late years is comfort earned, kept, and shared. Expect a good table, good sleep, and company that stays.',
    domains: ['Family', 'Health'],
    defline: 'The Artisan lives inside your Hour Gate: your harvest is children, comfort, and a well-fed old age.',
    reading: 'This position rules Family and Health, and it works in the root of your late years. The Artisan lives inside your Hour Gate: ease deepens as you age, comfort earned, kept, and shared. Expect a good table, good sleep, and company that stays, with children or chosen family close to the kitchen. Your health in the last chapters answers to warmth: fed well and loved plainly, you last. The counsel is almost embarrassingly simple. Keep hosting. The people you feed become the people who tend you, and this root repays every meal with years.',
  },
  shangguan_year_stem: {
    teaser: 'You were the bright one early, the child who outgrew the script. Authority and you started rough, and your luck improves every year you pick your own stage.',
    domains: ['Social', 'Mind'],
    defline: 'Brilliance stands at your Year Gate: the first thing your story shows is a spark that refuses dimming.',
    reading: 'This position rules Social and Mind, and it rules them from your beginnings. The Virtuoso stood openly at your Year Gate: you were the bright one early, the child who outgrew the script and said so. Your mind moves faster than the crowd expects, and people sort quickly into the delighted and the offended. Both follow you for life, and both are useful. Expect your name to travel on wit and candor, and to cost you a warden or two along the way. Aim the voltage at work worth lighting. The early friction was never a flaw.',
  },
  shangguan_year_branch: {
    teaser: 'Underneath your story runs an early refusal: some rule at home never fit, and you knew it young. That edge becomes brilliance once it stops needing an audience.',
    domains: ['Family', 'Growth'],
    defline: 'Brilliance lives inside your Year Gate: you were rooted in a house that talent had to outgrow.',
    reading: 'This position rules Family and Growth, and it works from the root of your story. The Virtuoso lives inside your Year Gate: some rule at home never fit, and you knew it young, quietly or otherwise. That early refusal became your growth engine, the part of you that improves whatever it is handed by first doubting it. Family may still read your honesty as rebellion. Let the results argue for you. The edge turns to brilliance in every season you give it real material, and the childhood friction fades into origin story, which is where it belongs.',
  },
  shangguan_month_stem: {
    teaser: 'The working world sees your talent before your discipline, and both are real. Careers with a stage suit you, and bosses who need obedience will not keep you.',
    domains: ['Career', 'Social'],
    defline: 'Brilliance stands at your Month Gate: the working world sees the performer, dazzling and hard to manage.',
    reading: 'This position rules Career and Social, and it runs the prime of your life. The Virtuoso stands at your Month Gate in view: the working world sees your talent before your discipline, and both are real. Your prime wants a stage, formats loose enough for brilliance and honest enough to score it. Bosses who need obedience will not keep you, and the feeling is mutual. Reputation through your thirties and forties runs on performance, visible wins, quotable work. Pick collaborators who enjoy fireworks. Then finish things. Finished brilliance is the only kind the era rewards.',
  },
  shangguan_month_branch: {
    teaser: 'Your prime runs on performance: you outdo, outshine, and occasionally overstep. The money follows your gift wherever the format is loose and the spotlight honest.',
    domains: ['Career', 'Mind'],
    defline: 'Brilliance holds your chart’s strongest seat: your prime is built to break forms and sign the result.',
    reading: 'This position rules Career and Mind, and it holds the deep seat of your prime. The Virtuoso lives inside your Month Gate: under your working life runs a current of critique, the mind that sees the better version of everything instantly. It makes you invaluable and occasionally exhausting, mostly to managers. Your prime pays best where improvement is the actual job, editing, design, strategy, reform. The private cost is restlessness, a mind that files the world under drafts. Give it one worthy revision at a time. Mastery calms what variety only feeds.',
  },
  shangguan_day_branch: {
    teaser: 'You need a partner who applauds, and you notice when they do not. Marriage thrives once the two of you compete with the world instead of each other.',
    domains: ['Love', 'Mind'],
    defline: 'Brilliance sits in your spouse palace: intimacy, for you, is vivid, verbal, and never beige.',
    reading: 'This position rules Love and Mind, and it works from your marriage palace. The Virtuoso lives inside your Day Gate: at close range you need applause and honesty in the same person, a partner sharp enough to spar with and warm enough to clap. Your adult chapters run on wit at home, banter as affection, critique as intimacy. The hazard is precision aimed at the beloved. Turn the editing outward, compete with the world as a pair, and the marriage becomes a writers’ table. Praise first, polish second. The order matters more than the talent.',
  },
  shangguan_hour_stem: {
    teaser: 'Your late work will be your boldest, and the young will quote you. Expect gifted, headstrong heirs: they inherit the talent along with the allergy to instruction.',
    domains: ['Career', 'Growth'],
    defline: 'Brilliance stands at your Hour Gate: your later years intend to be seen, and heard.',
    reading: 'This position rules Career and Growth, and it shapes how your story ends. The Virtuoso stands at your Hour Gate, visible in the last chapters: your late work will be your boldest, and the young will quote you. Retirement in the resting sense is not really on your chart. Expect gifted, headstrong heirs and students, inheriting the talent with the allergy to instruction, and love them for it. Your growth keeps its edge to the end, provided the stage keeps changing. Say the true thing late in life. By then, your candor reads as wisdom.',
  },
  shangguan_hour_branch: {
    teaser: 'The root of your late years is expression that never retires. You will be making, correcting, and dazzling to the end, and it will keep you young.',
    domains: ['Family', 'Mind'],
    defline: 'Brilliance lives inside your Hour Gate: the root of your harvest is a mind that never retires.',
    reading: 'This position rules Family and Mind, and it works in the root of your late years. The Virtuoso lives inside your Hour Gate: expression never retires in you, and the last chapters stay full of making, correcting, and dazzling. The family of your late life includes minds you trained, and the house stays loud with ideas. Your own mind ages like a performer, hungry for material, allergic to idleness. Feed it projects, audiences, arguments worth having. Kept lit, this root makes old age your most honest decade, and honestly, your funniest.',
  },
  piancai_year_stem: {
    teaser: 'Generosity was visible in your beginnings: a family that spent on people and chances. Money finds you through motion and strangers, rarely through sitting still.',
    domains: ['Wealth', 'Family'],
    defline: 'Opportunity stands at your Year Gate: fortune’s door was visible from your first address.',
    reading: 'This position rules Wealth and Family, and it rules them from your beginnings. The Horizon stood openly at your Year Gate: generosity was visible in your early world, a family that spent on people and chances, often led by a father figure with range and appetite. Money entered your story as movement rather than storage. The inheritance is a nose for openings and a light grip on cash, both lifelong. Fortune finds you through motion, strangers, and distance from home. Keep one anchored account the family charm cannot reach. The rest can stay in play.',
  },
  piancai_year_branch: {
    teaser: 'Somewhere in your roots sits a wanderer, and their restlessness lives in you. Your luck travels: opportunity favors you farther from home than comfort likes.',
    domains: ['Family', 'Wealth'],
    defline: 'Opportunity lives inside your Year Gate: your root memory of providing runs wide, not deep.',
    reading: 'This position rules Family and Wealth, and it works from the root of your story. The Horizon lives inside your Year Gate: somewhere in your line sits a wanderer, and their restlessness lives on in you, quietly, underneath the settled surface. Your luck travels. Opportunity favors you farther from home than comfort likes, and family fortunes in your story tend to involve journeys, migrations, or the one relative who left. Honor the pattern: build a base, then range from it. The root gives you both the itch and the map. Use them in that order.',
  },
  piancai_month_stem: {
    teaser: 'The working world reads you as the one who spots the opening. Your career pays in windfalls and timing, so keep a steady hand on the harvests.',
    domains: ['Career', 'Wealth', 'Social'],
    defline: 'Opportunity stands at your Month Gate: the working world sees the dealmaker, already reaching.',
    reading: 'This position rules Career, Wealth, and Social, and it runs the prime of your life. The Horizon stands at your Month Gate in view: the working world reads you as the one who spots the opening, the colleague with the tip, the friend of the deal. Your prime pays in windfalls and timing rather than salary curves, and your network is genuinely an asset class. The pattern through your thirties and forties: money arrives through people and motion, and it leaves through generosity and drift. Harvest the windfalls into something boring. Then go find the next one.',
  },
  piancai_month_branch: {
    teaser: 'Under your prime runs a trader’s instinct: you sense value moving before it moves. Trust it in the field, and let someone patient mind the vault.',
    domains: ['Career', 'Wealth'],
    defline: 'Opportunity holds your chart’s strongest seat: your prime is a marketplace, and you own a stall.',
    reading: 'This position rules Career and Wealth, and it holds the deep seat of your prime. The Horizon lives inside your Month Gate: under your working life runs a trader’s instinct, value sensed moving before it moves. Careers that reward reading the field suit you, markets, sourcing, scouting, anything with a horizon in it. Your middle decades earn best in cycles, and the skill is keeping harvest discipline inside the hunting spirit. Let someone patient mind the vault while you mind the weather. Paired that way, the instinct compounds into genuine wealth instead of great stories.',
  },
  piancai_day_branch: {
    teaser: 'You are drawn to partners with range, people who open doors you would not find alone. Marriage, for you, is also where opportunity walks in.',
    domains: ['Love', 'Social', 'Wealth'],
    defline: 'Opportunity sits in your spouse palace: your intimate life keeps a horizon in it.',
    reading: 'This position rules Love, Social, and Wealth, and it works from your marriage palace. The Horizon lives inside your Day Gate: at close range you are drawn to people with reach, partners who know somebody everywhere and see openings you would walk past. The adult chapters of your life gain range through the one beside you: introductions, ventures, money that moves because the household is connected. Your home tends toward open doors and full calendars, and your fortune genuinely likes it that way. The watch-point is scatter. Choose a partner whose breadth comes with a center, and anchor the shared accounts somewhere steady. Then let the doors keep opening. They are your weather.',
    domain_readings: {
      Love: 'In love you are drawn to range: partners with reach, plans, and a suitcase half-packed. Romance for you needs a horizon in it, shared ventures, travel, the next thing planned at breakfast. Choose a partner whose breadth has a center, and the marriage stays an expedition rather than a drift.',
      Social: 'Your social world enters through the household: the partner’s people become your people, dinner guests become collaborators, and the address book grows by marriage. Host on purpose. The connected home is one of your chart’s quiet engines, and it runs on invitations.',
      Wealth: 'Money moves through your intimate life: opportunities arriving via the partner, ventures shared across the pillow, windfalls with two names on them. It prospers with clean structure, shared goals, separate accounts, written agreements even in love. Romance handles the dreaming. Paperwork keeps the dream funded.',
    },
  },
  piancai_hour_stem: {
    teaser: 'You will stay opportunity’s friend to the end: late ventures, late windfalls, a wide door. Leave the estate mapped, because your generosity will outrun your paperwork.',
    domains: ['Wealth', 'Growth'],
    defline: 'Opportunity stands at your Hour Gate: your later years keep a venture warm and a bag half packed.',
    reading: 'This position rules Wealth and Growth, and it shapes how your story ends. The Horizon stands at your Hour Gate, visible in the last chapters: you stay opportunity’s friend to the end, late ventures, late windfalls, a door that never quite closes. Younger company keeps finding you, drawn to the range. Your growth in the last era comes from new fields entered late, and it keeps you vivid. The estate needs a map, because your generosity will outrun your paperwork by a decade. Write it down while it is easy. Then keep playing. You are built for a wide ending.',
  },
  piancai_hour_branch: {
    teaser: 'Your late years keep a wide horizon: travel, ventures, younger company. Fortune stays kind to you as long as something in your life stays in motion.',
    domains: ['Family', 'Wealth'],
    defline: 'Opportunity lives inside your Hour Gate: your harvest arrives from many fields, some you forgot planting.',
    reading: 'This position rules Family and Wealth, and it works in the root of your late years. The Horizon lives inside your Hour Gate: your late chapters keep a wide door, travel, ventures, younger company, family scattered across distances and gathered in bursts. Money in the last era stays in motion, and so do you, which is precisely how your luck prefers it. Children and heirs inherit your range, and possibly your restlessness. Fund the gatherings: they are the family’s true estate. Stillness is the only real risk on this root. Keep one journey always half-planned.',
  },
  zhengcai_year_stem: {
    teaser: 'You learned early what things cost, and it shows in how carefully you build. Money grows for you the slow way, and it starts close to home.',
    domains: ['Wealth', 'Family'],
    defline: 'The Steward stands at your Year Gate: prudence is the family trait your story shows first.',
    reading: 'This position rules Wealth and Family, and it rules them from your beginnings. The Steward stood openly at your Year Gate: a household that provided by planning, elders who counted carefully, a childhood where money had rules and the rules mostly held. The world still reads that face on you, dependable and early to save. Money learned young stays learned: your fortune keeps favoring the long way around. Through the family line come your steadiest assets, advice worth taking and sometimes property worth keeping. Honor the thrift you inherited, and spend on purpose now and then. Permission to enjoy it is part of the estate.',
    domain_readings: {
      Wealth: 'Money entered your life with rules attached, and the rules took. You save younger than most, spend with a list, and quietly compound while louder people perform wealth. The curve stays boring and rising. Trust it: your fortune is built like a wall, one considered brick at a time.',
      Family: 'Family, for you, is a well-run estate more than a stage: obligations met, elders honored, help that arrives as groceries and paid bills rather than speeches. You may become the family treasurer early. Accept the role, set its limits in writing, and it becomes an honor rather than a tax.',
    },
  },
  zhengcai_year_branch: {
    teaser: 'Thrift is in your roots: a home that counted carefully and wasted little. Your fortune compounds the same way, quietly, and earlier than anyone notices.',
    domains: ['Family', 'Wealth'],
    defline: 'The Steward lives inside your Year Gate: your root is a kept house, and it keeps you still.',
    reading: 'This position rules Family and Wealth, and it works from the root of your story. The Steward lives inside your Year Gate: thrift is in your foundations, a home that counted carefully, wasted little, and kept its word about money. You absorbed it before you could name it. Your fortune compounds the same way, quietly, earlier than anyone notices, and mostly through patience the loud world mistakes for luck. Family remains your soundest network: help flows there reliably in both directions. Keep the ledgers kind and current. This root turns small discipline into generational ground.',
  },
  zhengcai_month_stem: {
    teaser: 'The working world trusts you with money and should. Your career rewards stewardship: steady roles, real budgets, value kept. Wealth arrives on schedule rather than by surprise.',
    domains: ['Career', 'Wealth'],
    defline: 'The Steward stands at your Month Gate: the working world sees the safe pair of hands.',
    reading: 'This position rules Career and Wealth, and it runs the prime of your life. The Steward stands at your Month Gate in view: the working world trusts you with money, and it should. Your prime climbs through stewardship, real budgets, steady roles, value kept and grown. Wealth arrives on schedule rather than by surprise, which suits you fine. Colleagues bring you their messes because your desk is where things become orderly. Charge properly for that. Reliability is a premium service, and your era rewards the people who price it like one.',
  },
  zhengcai_month_branch: {
    teaser: 'Your prime is built on earned ground: income you can explain, assets you maintain. It grows slower than you would like and further than you expect.',
    domains: ['Career', 'Wealth'],
    defline: 'The Steward holds your chart’s strongest seat: your prime compounds, brick by deliberate brick.',
    reading: 'This position rules Career and Wealth, and it holds the deep seat of your prime. The Steward lives inside your Month Gate: your working life is built on earned ground, income you can explain, assets you maintain, promises you keep. The engine is patience with compounding, and it runs your middle decades with quiet power. Expect your wealth curve to be unfashionably smooth: slower than you want at first, further than you guessed by the end. Avoid ventures that require you to become someone else. Your fortune is character-shaped, and the character is the moat.',
  },
  zhengcai_day_branch: {
    teaser: 'You are made for steady love: a partner who keeps what you build and builds what you keep. Marriage becomes your most reliable asset, tended like one.',
    domains: ['Love', 'Family'],
    defline: 'The Steward sits in your spouse palace: you love in deposits, steadily, for keeps.',
    reading: 'This position rules Love and Family, and it works from your marriage palace. The Steward lives inside your Day Gate: you are made for steady love, a partner who keeps what you build and builds what you keep. Your adult chapters center on a provisioned home, bills paid, pantry full, promises honored on the ordinary days. Marriage becomes your most reliable asset, and like any asset it wants tending: schedule the delight, not just the duties. Choose someone who finds maintenance romantic. With that person, your household becomes the quiet fortune the rest of the chart banks on.',
  },
  zhengcai_hour_stem: {
    teaser: 'Whatever the middle years scatter, you end well provided for. What you save builds toward an old age that pays its own way, with something left to hand on.',
    domains: ['Wealth', 'Family'],
    defline: 'The Steward stands at your Hour Gate: what you show the future is order, provided for.',
    reading: 'This position rules Wealth and Family, and it governs how your story ends. The Steward stands at your Hour Gate, plainly visible in the last chapters: whatever the middle years scatter, your late life organizes, funds, and keeps. Provision is the shape your love takes as you age, and the people after you will feel it as safety. Children and juniors learn money from watching you, which is a better inheritance than the money. Expect your estate to land where you point it, because you will have pointed it carefully. Two counsels: retire the guilt about comfort, and give some of it away while your hands are still warm.',
    domain_readings: {
      Wealth: 'Your money story ends better than it middles: late-life finances organize, debts clear, and the estate takes shape exactly when others’ unravel. Compounding is loyal to you because you were loyal to it first. Keep the discipline light in the final decades. The wall is built. Live against it.',
      Family: 'To the people after you, you are provision made visible: the one whose planning becomes their safety. Children and heirs learn money by watching you, so narrate a little, show the ledger, explain the choices. The lesson lands deeper than the inheritance, and it cannot be spent.',
    },
  },
  zhengcai_hour_branch: {
    teaser: 'Security deepens with age: the root of your late years is provision done right. Children learn thrift from you, and your estate lands where you intend it.',
    domains: ['Family', 'Health', 'Wealth'],
    defline: 'The Steward lives inside your Hour Gate: your harvest is everything you maintained, still standing.',
    reading: 'This position rules Family, Health, and Wealth, and it works in the root of your late years. The Steward lives inside your Hour Gate: provision done right is the quiet ground of your last chapters, reserves kept, care funded, children taught thrift by watching rather than lecture. Your health in late life benefits from the same stewardship, maintenance over heroics, checkups kept like appointments with yourself. Money finishes stable: the estate lands where you intend it, and the household never feels the weather. Spend some comfort on yourself deliberately. You will have earned it twice by then.',
  },
  qisha_year_stem: {
    teaser: 'Your beginnings carried real pressure, and everyone could see you carrying it. It forged you early. Expect authority to find you young and test you often.',
    domains: ['Social', 'Career'],
    defline: 'The General stands at your Year Gate: the world’s first read of you is force.',
    reading: 'This position rules Social and Career, and it rules them from your beginnings. The General stood openly at your Year Gate: pressure entered your story early and in public, a demanding house, a hard district, a name that required defending. Everyone could see you carrying it, and the carrying built you. Authority finds you young, first as weight, later as rank. Your social world sorts by respect: people either match your intensity or orbit it. Expect to be tested often and promoted for surviving it. Just retire the armor at home. It was for the field.',
  },
  qisha_year_branch: {
    teaser: 'Some early weight pressed on you where no one watched, and you turned it into spine. Crisis will always promote you: it is your native ladder.',
    domains: ['Family', 'Growth', 'Health'],
    defline: 'The General lives inside your Year Gate: your root was forged, not furnished.',
    reading: 'This position rules Family, Growth, and Health, and it works from the root of your story. The General lives inside your Year Gate: some early weight pressed where no one watched, and you turned it into spine. That hidden forge set your growth pattern for life, crisis promotes you, ease unsettles you. The body keeps the campaign records, so tension is your inheritance along with the strength. Family may never fully know what you carried. You do. Train the load on purpose now, rest like it is a discipline, and the root that pressured you becomes the root that powers you.',
  },
  qisha_month_stem: {
    teaser: 'The working world reads command on you before you speak. Careers with stakes suit you, and your rank rises fastest where others crack.',
    domains: ['Career', 'Social'],
    defline: 'The General stands at your Month Gate: the working world sees command presence and expects orders.',
    reading: 'This position rules Career and Social, and it runs the prime of your life. The General stands at your Month Gate in view: the working world reads command on you before you speak. Careers with stakes suit your prime, operations, emergencies, leadership under weather, and your rank rises fastest exactly where others crack. Colleagues respect you first and warm to you second, in that order, always. The predictive line is simple: pressure keeps arriving because you keep converting it. Choose battles worth your metal, delegate the skirmishes, and midlife hands you real authority.',
  },
  qisha_month_branch: {
    teaser: 'Your prime runs under pressure by design: you choose hard arenas because ease bores you. Power arrives midlife, through the campaigns nobody else would take.',
    domains: ['Career', 'Health'],
    defline: 'The General holds your chart’s strongest seat: your prime is a campaign, won by discipline.',
    reading: 'This position rules Career and Health, and it holds the deep seat of your prime. The General lives inside your Month Gate: your working decades run under pressure by design, hard arenas chosen because ease bores you. Power arrives midlife through the campaigns nobody else would take. The cost center is the body: this seat spends adrenaline like salary, and the invoice lands in your forties if unpaid earlier. So train, sleep, and decompress as professionally as you fight. Command with a maintained body is a long reign. Without one it is a short story.',
  },
  qisha_day_branch: {
    teaser: 'You are drawn to intensity at close range: a partner with force, a home with weather. Love holds when the two of you aim the pressure outward together.',
    domains: ['Love', 'Health'],
    defline: 'The General sits in your spouse palace: love, for you, has a chain of command to dismantle.',
    reading: 'This position rules Love and Health, and it works from your marriage palace. The General lives inside your Day Gate: you are drawn to intensity at close range, a partner with force, a home with weather. Mild love has never once held your attention. The adult chapters thrive when the two of you aim the pressure outward, shared missions, shared enemies, renovations, causes. Aimed inward, the same voltage becomes the argument that never ends, and your body scores every round. Pick a worthy co-commander. Then guard the peace at home like the strategic asset it is.',
  },
  qisha_hour_stem: {
    teaser: 'You will command to the end, and the young will both fear and follow you. Late authority is yours: soften the orders and the loyalty doubles.',
    domains: ['Career', 'Growth', 'Family'],
    defline: 'The General stands at your Hour Gate: your later years keep rank, and the young feel it.',
    reading: 'This position rules Career, Growth, and Family, and it shapes how your story ends. The General stands at your Hour Gate, visible in the last chapters: you will command to the end, and the young will both fear and follow you. Late authority is your pattern, boards, councils, the call that still comes at midnight because you still answer. Heirs inherit your standards and flinch at your delivery, so soften the orders and the loyalty doubles. Keep one campaign running past retirement age. Purpose is your pension, and this gate pays it in rank.',
  },
  qisha_hour_branch: {
    teaser: 'The root of your late years is discipline that never quite retires. Expect standing, respect, and one more campaign than you planned. Keep a gate for rest.',
    domains: ['Health', 'Family', 'Growth'],
    defline: 'The General lives inside your Hour Gate: the root of your harvest is strength, held to the last.',
    reading: 'This position rules Health, Family, and Growth, and it works in the root of your late years. The General lives inside your Hour Gate: discipline never quite retires in you, and the last chapters keep a garrison quality, routines held, standards kept, one more campaign than you planned. Family feels your protection more than your softness, and they rely on both. The body in late life responds to training like an old soldier, gratefully and fast. March daily, rest like an order, and keep a gate open for visitors. Fortresses age best with gardens.',
  },
  zhengguan_year_stem: {
    teaser: 'You come from order worn openly: a respectable name, early rules, standards met. Reputation is your inheritance, and it keeps paying as long as you keep it clean.',
    domains: ['Social', 'Family'],
    defline: 'Order stands at your Year Gate: respectability is the first thing your story shows.',
    reading: 'This position rules Social and Family, and it rules them from your beginnings. The Magistrate stood openly at your Year Gate: you come from order worn in public, a respectable name, early rules, standards met where neighbors could see them. Reputation is your inheritance, and it still opens doors before you knock. People extend you trust on sight, the way they trusted the house you came from. The estate has terms: it keeps paying while you keep it clean. Carry the name lightly, break the pointless rules privately, and the worthy ones will carry you.',
  },
  zhengguan_year_branch: {
    teaser: 'Discipline was the air of your early home, felt more than announced. It gave you a straight spine. Institutions will trust you early and promote you steadily.',
    domains: ['Family', 'Growth'],
    defline: 'Order lives inside your Year Gate: your root is a rulebook, learned before you could read it.',
    reading: 'This position rules Family and Growth, and it works from the root of your story. The Magistrate lives inside your Year Gate: discipline was the air of your early home, felt more than announced, and it gave you a straight spine before you knew you had one. Growth for you follows structure, courses finished, ranks earned, standards internalized young. Family expectations shaped you and mostly served you, and the residue is a conscience that files reports. Keep the spine, pension the guilt. Order held from love ages into dignity. Order held from fear just ages you.',
  },
  zhengguan_month_stem: {
    teaser: 'The working world sees the officer in you: reliable, correct, promotable. Your career climbs by rank and record, and your name will matter more than your salary.',
    domains: ['Career', 'Social'],
    defline: 'Order stands at your Month Gate: the working world sees an officer, promotable on sight.',
    reading: 'This position rules Career and Social, and it runs the prime of your life. The Magistrate stands at your Month Gate in view: the working world sees the officer in you, reliable, correct, promotable, and it responds with rank. Your prime climbs by record: titles find you, and they tend to stick. Your name will matter more than your salary, and eventually decide it. Socially you are the one made responsible, the emergency contact of entire departments. Accept it, it is how your era pays. Just keep one lawless hobby. Even judges need a garden.',
  },
  zhengguan_month_branch: {
    teaser: 'Your prime is built for responsibility: the frame of your working life is duty done properly. Titles find you midlife, and they tend to stick.',
    domains: ['Career', 'Growth', 'Social'],
    defline: 'Order holds your chart’s strongest seat: your prime is an office held with honor.',
    reading: 'This position rules Career, Growth, and Social, and it holds the deep seat of your prime. The Magistrate lives inside your Month Gate: the frame of your working life is duty done properly, and your growth compounds inside institutions the way interest compounds inside banks. Midlife hands you titles, and the titles stay. People organize around your steadiness, which is influence dressed as reliability. The deep cost is elasticity: the frame can hold you as much as it holds you up. Renegotiate the role every few years on purpose. Structure serves best when it is reviewed.',
  },
  zhengguan_day_branch: {
    teaser: 'You are built for committed love: a principled partner, a household that runs on kept promises. Marriage steadies your whole chart, and it arrives with weight and stays.',
    domains: ['Love', 'Family'],
    defline: 'Order sits in your spouse palace: you love formally, faithfully, and for the record.',
    reading: 'This position rules Love and Family, and it works from your marriage palace. The Magistrate lives inside your Day Gate: you are built for committed love, a principled partner, a household that runs on kept promises. Marriage steadies your whole chart, and it tends to arrive with weight, formal, meant, durable. Your adult chapters favor the long vow over the wild season, and your fortune agrees: things settle for you once the ring does. Choose character first, chemistry a close second. Then honor the small ceremonies, anniversaries, rituals, the weekly table. This palace runs on kept form.',
  },
  zhengguan_hour_stem: {
    teaser: 'Your standing grows with age: honors late, respect that outlives the job. Children measure themselves against your standards, so praise them before you correct them.',
    domains: ['Family', 'Social', 'Career'],
    defline: 'Order stands at your Hour Gate: what you show the future is standards, upheld to the end.',
    reading: 'This position rules Family, Social, and Career, and it shapes how your story ends. The Magistrate stands at your Hour Gate, visible in the last chapters: your standing grows with age, honors late, respect that outlives the job. Children and juniors measure themselves against your standards, quietly and for decades, so praise them before you correct them and the measuring becomes love. Your late career leans toward governance, boards, and the keeping of institutions you once merely served. The name you leave will be trusted, which is rarer than being missed. Endings are your specialty. Make yours exemplary.',
  },
  zhengguan_hour_branch: {
    teaser: 'Order is the root of your late years: affairs settled, duties completed, a name in good repair. Your legacy will be trusted, which is rarer than being missed.',
    domains: ['Family', 'Growth'],
    defline: 'Order lives inside your Hour Gate: the root of your harvest is a life that kept its word.',
    reading: 'This position rules Family and Growth, and it works in the root of your late years. The Magistrate lives inside your Hour Gate: order is the ground your last chapters stand on, affairs settled, duties completed, a name kept in good repair. Family in late life organizes around your word, and your word stays good. Growth continues as refinement rather than reinvention, the same values held to higher polish. Do the estate work early and thoroughly, it is your love language anyway. Then let some evenings go unscheduled. Even a completed ledger deserves a sunset.',
  },
  pianyin_year_stem: {
    teaser: 'You were the watchful child, visibly different in how you learned. Your path stays unconventional: the strange skills gathered early become the livelihood nobody predicted.',
    domains: ['Mind', 'Social'],
    defline: 'The Alchemist stands at your Year Gate: the world’s first read of you is depth, slightly apart.',
    reading: 'This position rules Mind and Social, and it rules them from your beginnings. The Alchemist stood openly at your Year Gate: you were the watchful child, visibly different in how you learned, reading sideways while the class read forward. Adults found you old, peers found you strange, and both were early compliments. Your mind remains your public signature, the odd angle people eventually pay for. Socially you run selective and always will, three real people over thirty acquaintances. Expect the strange skills gathered early to become the livelihood nobody predicted. They were never a phase. They were the plan.',
  },
  pianyin_year_branch: {
    teaser: 'Your roots hold an unusual nurture: care that came sideways, through books, silence, or an unconventional guardian. Solitude restores you, and always will.',
    domains: ['Family', 'Mind', 'Growth'],
    defline: 'The Alchemist lives inside your Year Gate: your root drinks from an odd, deep well.',
    reading: 'This position rules Family, Mind, and Growth, and it works from the root of your story. The Alchemist lives inside your Year Gate: nurture came to you sideways, through books, silence, an unconventional guardian, or a house where love spoke in ideas. It built a mind that feeds itself. Solitude restores you, and always will, so treat it as nutrition rather than absence. Family may stay slightly puzzled by you, lovingly. Growth arrives through the unusual door in every era of your life. Keep walking through those. The conventional ones were never locked. They were just empty.',
  },
  pianyin_month_stem: {
    teaser: 'The working world sees your odd angle first: the specialist, the diagnostician, the one who reads between. Career luck favors your niche over any ladder.',
    domains: ['Career', 'Mind'],
    defline: 'The Alchemist stands at your Month Gate: the working world sees the specialist it does not quite understand.',
    reading: 'This position rules Career and Mind, and it runs the prime of your life. The Alchemist stands at your Month Gate in view: the working world sees your odd angle first, the specialist, the diagnostician, the one who reads between. Your prime pays for insight rather than hours, and the niche will always outpay the ladder. Colleagues bring you the unsolvable and remember you for it. The market for your mind widens through your thirties and forties as the strange becomes the sought. Name your specialty in public. Obscurity is the only tax on this gate.',
  },
  pianyin_month_branch: {
    teaser: 'Your mind works in private, on things most people find strange, and that is exactly where your career luck lives. The niche will pay what the mainstream never will.',
    domains: ['Mind', 'Growth', 'Career'],
    defline: 'The Alchemist holds your chart’s strongest seat, the month branch, and does its thinking from the middle of your working life.',
    reading: 'This position rules Mind, Growth, and Career, and it rules them from the deepest seat your chart has. The Alchemist lives inside your Month Gate, hidden in the engine of your prime: your working life runs on private study, sideways insight, and an appetite for what most people overlook. Colleagues see the results and rarely the method. Through your prime years the pattern holds: the specialist path outpays the general one, and your best openings arrive through knowledge nobody asked you to gather. Mentors matter, though the unconventional ones serve you best. Guard time alone the way others guard salary. For you it is the same thing, and midlife will prove it.',
    domain_readings: {
      Mind: 'Your mind is a private laboratory: it absorbs sideways, incubates in silence, and produces conclusions that look sudden to everyone who missed the years underneath. Trust the incubation. Your thinking cannot be rushed, only fed, and it repays every strange book and quiet hour with interest.',
      Growth: 'You grow in leaps disguised as stillness: long plateaus of gathering, then a step-change nobody saw building. Do not measure yourself against steady climbers. Your curve is a staircase, and the landings are where the real work happens. Keep faith on the flat stretches.',
      Career: 'Professionally you are the specialist, the one called when the usual answers fail. The niche will pay what the mainstream never will, and your reputation compounds through solved unsolvables. Name your specialty publicly and let the strange work find you. It is already looking.',
    },
  },
  pianyin_day_branch: {
    teaser: 'You need a partner who respects your inner weather: closeness with breathing space built in. Marriage works as two studies with a shared door.',
    domains: ['Love', 'Mind'],
    defline: 'The Alchemist sits in your spouse palace: intimacy, for you, begins where small talk dies.',
    reading: 'This position rules Love and Mind, and it works from your marriage palace. The Alchemist lives inside your Day Gate: you need a partner who respects your inner weather, closeness with breathing space built in. Marriage for you works as two studies with a shared door, together deeply, alone regularly, both by design. Your adult chapters favor the cerebral bond, love as one long conversation. A partner who pathologizes your solitude will exhaust you, and one who guards it will keep you. Choose the guard. Then open your door on schedule. Intimacy, for you, is a practice more than an instinct.',
  },
  pianyin_hour_stem: {
    teaser: 'Late life sharpens your insight instead of dulling it. You will mentor the strange and gifted, and your best ideas may arrive after everyone expects them.',
    domains: ['Mind', 'Growth', 'Career'],
    defline: 'The Alchemist stands at your Hour Gate: your later output turns inward, and finer.',
    reading: 'This position rules Mind, Growth, and Career, and it shapes how your story ends. The Alchemist stands at your Hour Gate, visible in the last chapters: age sharpens your insight instead of dulling it, and your best ideas may arrive after everyone expects them. Late career bends toward the advisory and the arcane, the consulted mind, the strange mentor. The gifted and unusual young will find you, and they are your true heirs whatever the bloodline says. Publish the method before the end, in any form. Minds like yours are libraries, and libraries are meant to lend.',
  },
  pianyin_hour_branch: {
    teaser: 'The root of your late years is the inner library: study, intuition, chosen quiet. Age will suit you, because depth is the one asset that only accrues.',
    domains: ['Family', 'Mind', 'Growth'],
    defline: 'The Alchemist lives inside your Hour Gate: the root of your harvest is understanding, finally ripe.',
    reading: 'This position rules Family, Mind, and Growth, and it works in the root of your late years. The Alchemist lives inside your Hour Gate: the inner library is where your last chapters live, study, intuition, chosen quiet, a household that respects a shut door. Age suits you, because depth is the one asset that only accrues. Family in late life includes the young minds you quietly shaped. Keep a practice that externalizes the thinking, notes, letters, one apprentice. The mind stays lit by being poured. Poured, this root makes your old age the family’s deep well.',
  },
  zhengyin_year_stem: {
    teaser: 'You were sheltered by someone principled, and it shows in your bearing. Learning is your inheritance: credentials, teachers, and timely protection keep appearing across your life.',
    domains: ['Family', 'Mind'],
    defline: 'Care stands at your Year Gate: the first thing your story shows is that you were well held.',
    reading: 'This position rules Family and Mind, and it rules them from your beginnings. The Sage stood openly at your Year Gate: you were sheltered by someone principled, and it shows in your bearing to this day. Learning is your inheritance, credentials, teachers, timely protection that kept arriving just before you needed it. The family gave you a moral spine and a library card, in whatever form. Expect that pattern to continue: elders, mentors, and doors that open on reputation. Repay it forward rather than backward. Shelter given is how this inheritance stays alive.',
  },
  zhengyin_year_branch: {
    teaser: 'Deep in your roots is real nurture, a mother-warmth that took. You default to trust, and life keeps rewarding it with protectors you did not request.',
    domains: ['Family', 'Growth', 'Health'],
    defline: 'Care lives inside your Year Gate: your root is shelter itself, deep and possibly too warm.',
    reading: 'This position rules Family, Growth, and Health, and it works from the root of your story. The Sage lives inside your Year Gate: real nurture sits deep in your foundations, a mother-warmth that took, or a caretaker whose steadiness became your nervous system. You default to trust, and life keeps rewarding it with protectors you did not request. Your constitution is fundamentally kind to you, healing well, aging gently, provided you accept care instead of only providing it. Growth follows safety in your chart. Build the safe base first, every time. Everything you attempt from shelter succeeds sooner.',
  },
  zhengyin_month_stem: {
    teaser: 'The working world reads you as credible: the one with the knowledge and the calm. Your career advances through reputation and study, and elders open the doors.',
    domains: ['Career', 'Mind', 'Social'],
    defline: 'Care stands at your Month Gate: the working world sees the teacher, and brings it students.',
    reading: 'This position rules Career, Mind, and Social, and it runs the prime of your life. The Sage stands at your Month Gate in view: the working world reads you as credible, the one with the knowledge and the calm, and your career advances through reputation and study rather than push. Elders open your doors. Your prime years collect credentials, references, and the kind of trust that outlasts employers. Socially you become the counselor early, and the pattern deepens with rank. Keep learning in public: every course and every kindness compounds. Your name is your salary’s slow engine.',
  },
  zhengyin_month_branch: {
    teaser: 'Your prime is carried by learning: the deeper the study, the steadier the rise. Expect your name to rest on what you know, and to age well.',
    domains: ['Mind', 'Career', 'Growth'],
    defline: 'Care holds your chart’s strongest seat: your prime is built on learning that never stops arriving.',
    reading: 'This position rules Mind, Career, and Growth, and it holds the deep seat of your prime. The Sage lives inside your Month Gate: your working life is carried by learning, the deeper the study, the steadier the rise. Your name comes to rest on what you know, and it ages well, the way references beat headlines. Expect midlife to convert knowledge into quiet authority, students into allies, reading into rank. The hazard is gentle: shelter can become a reason to wait. Publish, apply, teach, before you feel ready. Your readiness has always lagged your ability by years.',
  },
  zhengyin_day_branch: {
    teaser: 'You are built to be cared for at close range, and to trust it. Marriage brings shelter: a partner whose steadiness becomes your second spine.',
    domains: ['Love', 'Family', 'Health'],
    defline: 'Care sits in your spouse palace: home, for you, must be a harbor before it is anything else.',
    reading: 'This position rules Love, Family, and Health, and it works from your marriage palace. The Sage lives inside your Day Gate: you are built to be cared for at close range, and to trust it. Marriage brings shelter, a partner whose steadiness becomes your second spine, and the household runs on kindness kept ordinary. Your health answers to your home: peace at the table shows up in your bloodwork. The adult chapters reward choosing the nurturer over the dazzler, and your chart means it. Let yourself be tended without auditing it. Receiving well is this palace’s whole lesson.',
  },
  zhengyin_hour_stem: {
    teaser: 'You will end as the elder people consult: knowledge kept warm and given away. Teach deliberately, because your protection of others is what history keeps.',
    domains: ['Family', 'Growth', 'Mind'],
    defline: 'Care stands at your Hour Gate: what you show the future is teaching, given freely.',
    reading: 'This position rules Family, Growth, and Mind, and it shapes how your story ends. The Sage stands at your Hour Gate, visible in the last chapters: you end as the elder people consult, knowledge kept warm and given away. Children and students carry your teaching further than your name, which is the better vehicle anyway. Late growth comes through giving the learning form, classes, letters, a shelf of notes that outlives you. Protect the young deliberately, the way someone once protected you. History keeps the shelter you build. It is the one estate that never probates.',
  },
  zhengyin_hour_branch: {
    teaser: 'The root of your late years is quiet backing: pensions of goodwill, children who shelter you, sleep that comes easily. Kindness banked early pays your old age.',
    domains: ['Family', 'Health', 'Mind'],
    defline: 'Care lives inside your Hour Gate: the root of your harvest is peace, tended into permanence.',
    reading: 'This position rules Family, Health, and Mind, and it works in the root of your late years. The Sage lives inside your Hour Gate: quiet backing is the ground of your last chapters, pensions of goodwill, children who shelter you, sleep that comes easily. Kindness banked early pays your old age, and you have been depositing all your life. The mind stays clear the way tended gardens stay green, with routine, reading, and company that is gentle by default. Accept the care when it comes. You taught everyone around you how, and they learned it watching you.',
  },
};
