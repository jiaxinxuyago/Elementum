/* ===================================================================
   Elementum design pass · shared kit (October 2026)
   Real content captured from the running app (golden chart: 庚 The Blade,
   1995-04-29 18:00 Beijing; Underfueled sample: 乙 The Vine, 1990-09-17
   05:00). Real assets only: backgrounds, stem seals, ink dots, element
   plates from concept-arts/library, the journey symbol sprite, and the
   dominance wheel captured from the live component.
   =================================================================== */
const EL = ['metal', 'wood', 'fire', 'earth', 'water'];
const ELN = { metal: 'Metal', wood: 'Wood', fire: 'Fire', earth: 'Earth', water: 'Water' };
const HAN = { metal: '金', wood: '木', fire: '火', earth: '土', water: '水' };
const ART = { metal: 't_metal_5_w', wood: 't_wood_1_w', fire: 't_fire_5_w', earth: 't_earth_2_w', water: 't_water_5_w' };
const PORT = { metal: 't_metal_1_p', wood: 't_wood_1_p', fire: 't_fire_1_p', earth: 't_earth_2_p', water: 't_water_1_p' };

const D = {
  id: {
    stem: '庚', arch: 'The Blade', thesis: 'Precision before intention', edge: 'You are the Metal that cuts things clean.',
    lit: '庚 · YANG METAL', cast: 'CAST FROM 1995 · APRIL 29 · 17–19 CST', seal: 'stem-geng-metal.png',
    who: 'You are the Blade, the Metal that has already been through fire. You are kept plain and kept sharp, and you come out only for the true thing.',
  },
  cond: 'Overfueled', score: 6, runShort: 'Takes in more than it spends',
  runLine: 'Your Metal takes in more than it spends.',
  runHead: 'You run Overfueled: your Metal takes in more than it spends.',
  nature: 'You are what the sword is like when it wakes up as a person. The cut is always ready and mostly used. You put the truth ahead of comfort, yours and everyone’s, every day, in every setting. People bring you the questions nobody else will answer straight, then flinch at exactly what they asked for. The edge never rests. That includes the nights, and it includes you.',
  mech: [
    'Two of your five energies add to you. Body is more of your own element, and Mind is the element that feeds it.',
    'In your chart these two have your birth season or your roots behind them. Your core takes in more than a day can spend.',
    'The other three spend you. Expression lets your energy out, Action puts it to work, and Order gives it a shape. They are the outlets your surplus is looking for.',
  ],
  body: 'Metal', mind: 'Earth',
  codex: { score: 'You score 6 of 7. Your season and your root both feed your Metal, and they are the two heaviest tests. Overfueled means your core takes in more than it spends.',
    tests: [['SEASON', '+4', true, 'You were born in an Earth month, and Earth feeds Metal.'], ['ROOT', '+2', true, 'Metal sits in the lower half of your chart and holds you up.'], ['ALLIES', '+0', false, 'One of your three other signs backs Metal. It takes two.']] },
  gifts: ['You carry a heavy load without asking for help.', 'You stay steady under pressure, and you recover fast.', 'You trust your own judgement and act on it.'],
  costs: ['You grow restless when nothing asks much of you.', 'You feel sure you are right, and criticism lands hard.', 'You hold other people to your own pace and standard.'],
  scenes: [['AT WORK', 'A hard deadline brings you alive. An easy month leaves you rebuilding things that were never broken.'], ['AT REST', 'A free weekend fills with projects by Saturday noon. Doing nothing feels heavier to you than doing too much.'], ['WITH PEOPLE', 'A friend asks for advice, and you hand over the whole plan. You find it hard when they take only half of it.']],
  helps: 'Give your extra force a place to go — aim it, don’t store it.', verb: 'CHANNEL',
  grow: 'Expression, Action and Order', release: 'Body and Mind',
  rx: 'Release Metal and Earth. Grow Fire, Wood and Water.', start: 'Start with Fire, your Order.',
  ease: ['metal', 'earth'], seek: ['fire', 'wood', 'water'], first: 'fire',
  order: ['metal', 'earth', 'fire', 'wood', 'water'],
  E: {
    metal: { head: 'Metal strengthens the Blade', fn: 'Body', p: 23, pole: 'fric', rel: 'more of you', core: true,
      story: 'The Blade sharpens against other steel, and each edge grinds the next to a finer line.', now: 'A full core needs outlets, and this only adds more of the same weight.', doms: ['Family', 'Growth', 'Social'],
      teaser: 'Your strength is the kind you make alone, so you measure yourself against your own last best rather than against anyone beside you.' },
    earth: { head: 'Earth feeds the Blade', fn: 'Mind', p: 33, pole: 'fric', rel: 'feeds you',
      story: 'The Blade begins as ore inside the hill, where damp earth feeds it slowly until it is ready to be struck.', now: 'It adds to a core that is already full, and you have plenty of it.', doms: ['Mind', 'Growth', 'Career'],
      teaser: 'Because you would rather understand a thing than be quick about it, you keep only the answers you gave time to.' },
    fire: { head: 'Fire forges the Blade', fn: 'Order', p: 5, pole: 'cat', rel: 'shapes you',
      story: 'The Blade is laid in the forge, where heat softens it just enough to be hammered into its shape.', now: 'It gives your surplus a shape and a use, and you have very little of it.', doms: ['Career', 'Health', 'Growth'],
      teaser: 'You work harder for a standard someone else set than for one of your own, and you usually go looking for one.' },
    wood: { head: 'Wood is shaped by the Blade', fn: 'Action', p: 33, pole: 'cat', rel: 'you shape it',
      story: 'The Blade meets the timber, and every log it splits gives its edge something real to do.', now: 'It puts your surplus to work, and you have plenty of it.', doms: ['Wealth', 'Family', 'Career'],
      teaser: 'You want something to build more than something to be given, so you stay with what you made long after a gift would have bored you.' },
    water: { head: 'Water draws from the Blade', fn: 'Expression', p: 6, pole: 'cat', rel: 'you feed it',
      story: 'The Blade cools at dawn, and dew gathers on its edge and runs off into the ground.', now: 'It drains off your surplus, and you have very little of it.', doms: ['Health', 'Family', 'Career'],
      teaser: 'You say one true thing rather than ten pleasant ones, so you say as much by staying quiet as by speaking.' },
  },
  earthPage: {
    diag: 'Your Metal core is overfueled, and Earth pours more in. More fuel on a full fire is friction. Ease off Earth.',
    claim: 'Earth is your Mind.', verdict: 'Because you would rather understand a thing than be quick about it, you keep only the answers you gave time to.',
    chips: ['Never quite ready', 'Hard to reach', 'Second-guesses'],
    define: 'Your Mind is where the world soaks in and becomes yours. Earth holds it, and nothing you learn is lost. As a friction, the holding never stops, and needing the full picture keeps you in your head. Chances to act pass while you are still taking it in.',
    remedy: 'Wood draws on the ground it grows from and turns what it takes into something built. Let it spend what Earth stores. Send the rough draft before the clean one exists. Try a new method on a familiar problem.',
    doms: [['Career', 'Your work pays for what only you know.'], ['Mind', 'Your mind runs best on what others find strange.'], ['Growth', 'You grow late, and mostly in private.']],
  },
  domainsHead: 'Wealth and Family carry the most weight in your life',
  domains: [['Wealth', 'Your money comes through the people close to you.', 4, 'dom-wealth'], ['Family', 'You were fed well, and you became the one who feeds.', 4, 'dom-family'], ['Career', 'Your work pays for what only you know.', 3, 'dom-career'], ['Social', 'Your friends are your equals, or they drift.', 3, 'dom-social'], ['Health', 'Your body trusts food and rest to put it right.', 1, 'dom-health'], ['Love', 'You fall for people who widen your life.', 1, 'dom-love'], ['Mind', 'Your mind runs best on what others find strange.', 1, 'dom-mind'], ['Growth', 'You grow late, and mostly in private.', 2, 'dom-growth']],
  domainsIntro: 'One of ten characters sits in each seat of your chart, and each character rules certain parts of your life. Where several seats rule the same domain, that domain carries more weight for you.',
  wealth: {
    head: 'Your money comes through the people close to you.',
    sub: 'Four seats rule Wealth in your chart. One sits in your Early Chapter, one in your Home Chapter and two in your Late Chapter.',
    how: ['You find money through other people, in a tip from a friend or a side venture with someone close. Because your openings arrive through people you trust, you say yes before you read the terms, and you earn in bursts more than in a steady line. The money you make fastest is the money you hold on to least.',
      'You lose money most easily where you share it with friends and family, and you also find your safety net among those same people. They share one gate in you, and you rarely own anything that is only yours.'],
    seats: [['The Steward at the Year Gate', 'EARLY CHAPTER · BIRTH TO 15 · IN PLAIN VIEW · LIVED', 'You learned what things cost before most children do. Money at home was counted and spent with care, and by your teens you were already saving what your friends spent.'],
      ['The Horizon inside the Day Gate', 'HOME CHAPTER · FROM 35 · 2030 · INSIDE · COMING', 'From your mid-thirties your income starts to rise through the life you share with a partner, through a joint venture, a move or an opening from their side. You will earn more in these years than in all the years before, and you keep only what has both names written down.'],
      ['The Steward at the Hour Gate', 'LATE CHAPTER · FROM 48 · 2043 · IN PLAIN VIEW · COMING', 'Your late forties are when years of steady saving finally show. Debts close and the accounts settle, and you become the one in your family who has enough.'],
      ['The Rival inside the Hour Gate', 'LATE CHAPTER · FROM 48 · 2043 · INSIDE · COMING', 'From your late forties the people after you, children or younger relatives or someone you train, will start to make claims on your money. You will give more than you planned each time, and you will keep your own floor only where you set the number before anyone asks.']],
  },
  chapters: {
    head: 'You are in your Rising Chapter, carrying Metal, in a Fire decade.', short: 'You are in your Rising Chapter · a Fire decade',
    intro: 'Your chart has four gates, and each one is a stretch of your life. Each carries an energy, and so does every ten-year decade inside it. Whether your chart grows that energy or releases it sets the tone of those years.',
    age: 31,
    gates: [['EARLY', 'birth–15', 'wood', 'water', 'lift', 'LIVED'], ['RISING', '16–34', 'metal', 'earth', 'weigh', 'NOW'], ['HOME', '35–47', 'wood', null, 'lift', 'FROM 2030'], ['LATE', '48 on', 'wood', 'metal', 'even', 'FROM 2043']],
    decades: [[8, 'earth', 'weigh'], [18, 'earth', 'weigh'], [28, 'fire', 'lift', true], [38, 'fire', 'lift'], [48, 'wood', 'lift'], [58, 'wood', 'lift'], [68, 'water', 'lift']],
    list: [
      { name: 'The Early Chapter', when: 'BIRTH TO 15 · LIVED', el: 'wood', under: 'water', line: 'Wood over Water', fn: 'Action · reach and resources · you grow it', tone: 'LIFTS YOU', energy: 'Your Early Chapter carried Wood, the energy of Action, and your chart was hungry for it. The home you grew up in gave you things to do and things to reach for. You came out of it knowing that effort gets you what you want.' },
      { name: 'The Rising Chapter', when: '16 TO 34 · NOW', el: 'metal', under: 'earth', line: 'Metal over Earth', fn: 'Body · your own energy · you release it', tone: 'LEANS AGAINST YOU', now: true, energy: 'Your Rising Chapter carries Metal, your own energy, into a chart that already runs over with it. Since your late teens your work has asked you to prove yourself, and you push harder than any job needs. The strength is real, and you are learning where to spend it.',
        lands: ['In Career, this chapter favours work you share over work you carry alone, and you do your best when someone else holds the other end.', 'In Growth, this chapter favours one hard skill over many easy ones, and you grow fastest where you compete only with yourself.', 'At home, this chapter favours giving ground over holding it, and you keep the peace by letting someone else be right.'] },
      { name: 'The Home Chapter', when: '35 TO 47 · FROM 2030', el: 'wood', line: 'Wood', fn: 'Action · reach and resources · you grow it', tone: 'LIFTS YOU', energy: 'Your Home Chapter carries Wood, the energy of Action, and your chart is glad of it. From your mid-thirties a partner and a household widen your reach, with more coming in and more to look after. You take hold of more in this chapter than in any before it.' },
      { name: 'The Late Chapter', when: '48 ON · FROM 2043', el: 'wood', under: 'metal', line: 'Wood over Metal', fn: 'Action · reach and resources · you grow it', tone: 'EVEN', energy: 'Your Late Chapter carries Wood, the energy of Action, and your chart still wants it. From your late forties there is more within reach than you have time for, and the people after you bring much of it. You keep your hand on what matters most.' },
    ],
    decadeNow: { title: 'NOW · A FIRE DECADE · 2023 TO 2032 · ORDER', text: 'This decade brings Fire, the Order your chart is shortest of. It gives your strength a shape, with a clear role and people who rely on you to keep it. You take on more than you planned, and it steadies you.',
      favours: [['Your word at home', 'winning a point'], ['Keeping a role', 'starting a new one'], ['A few who rely on you', 'a wide circle']] },
    years: [[2026, 'fire', 'ORDER', 'Fire brings Order for a whole year, the energy you need most. It presses on you from outside, and you end the year harder to bend.', 'JOINS YOUR DAY GATE', 'You make a decision about home or partnership this year that you have been circling for a while.'],
      [2027, 'fire', 'ORDER', 'Fire brings Order for a second year running, the shape your chart lacks. The role you took on last year settles into place, and people start to rely on your word.'],
      [2028, 'earth', 'MIND', 'Earth brings Mind for a whole year, the thinking your chart already has too much of. Plans stay on paper longer than they should, and you get moving again through plain work and a firm deadline.', 'STRIKES YOUR DAY GATE', 'You change something at home this year, an address or the way you share your life with a partner.'],
      [2030, 'metal', 'BODY', 'Metal brings Body for a whole year, the force your chart already runs over with. Competition with peers runs hot, and you come through it by sharing the load with a team that pushes back.', 'STRIKES YOUR MONTH GATE', 'You leave a role or a team you have outgrown this year, by your own choice or by theirs.']],
  },
  stars: {
    head: 'Six old stars sit in your chart, and a helper is arriving.',
    intro: 'The symbolic stars are an older, lighter layer of the reading. Each one colours the gate it sits in, and none of them overrides the characters in your seats.',
    help: [['Scholar’s Star', '文昌', 'YEAR GATE · EARLY CHAPTER', 'Words and learning come easily to you.', 'You learned to read early and took to schoolwork faster than your effort explains. Written work and anything you could study for went better for you than for most, and you still trust a book to get you through a hard problem.'],
      ['Red Phoenix', '红鸾', 'MONTH GATE · RISING CHAPTER · NOW', 'Attraction runs high around you.', 'Your Rising Chapter carries more attraction than you planned for, much of it through work and study and the circles those years bring. You have been noticed more than you noticed, and you kept at least one feeling from these years to yourself.']],
    test: [['Ram’s Edge', '羊刃', 'HOUR GATE · LATE CHAPTER · FROM 2043', 'A hard and protective will.', 'From your late forties a will rises in you that does not bend, and you keep it for the moments that matter.'],
      ['Robbery Star', '劫煞', 'YEAR GATE · EARLY CHAPTER', 'You guard what is yours faster than most.', 'You learned to guard what was yours younger than most, and you still move faster than others when something of yours is at risk.'],
      ['Lost Spirit', '亡神', 'DAY GATE · HOME CHAPTER · FROM 2030', 'You keep part of yourself out of sight.', 'From your mid-thirties you keep a part of your life out of sight, plans and feelings that even a partner hears about late.'],
      ['Lonely Star', '孤辰', 'DAY GATE · HOME CHAPTER · FROM 2030', 'You need more time alone inside closeness than most.', 'A partner will read it as distance more than once, and you stay longest with the person who lets you go quiet without asking why.']],
    arrive: [['Nobleman', '天乙贵人', 'ARRIVES WITH YOUR MAGISTRATE DECADE, 2023 TO 2032', 'A helper with standing arrives in this decade.', 'Someone with standing opens a door for you in this decade, a mentor or a sponsor who backs you before you have proved yourself.'],
      ['Peach Blossom', '桃花', 'ARRIVES WITH YOUR GENERAL DECADE, 2033 TO 2042', 'This decade brings new people in numbers.', 'In this decade your life fills with new people, more invitations and more attention than you have had before.']],
    year: [['The Void', '空亡', 'Some of what you push for this year stays empty for a while, an answer that does not come or a plan that waits.'], ['Commander Star', '将星', 'This year people turn to you to lead, a project or a team that needs someone to decide.']],
  },
  blueprint: {
    head: 'A Steward structure · 正财格',
    sub: 'The decoding of your chart: why the rest of your reading comes out the way it does.',
    secs: [
      ['1', 'Your structure', 'Your chart is built around money kept and value earned. You do best when the work in front of you has a clear return, and you trust a slow sure gain over a fast one.', 'WHY · THE REVEALED-STEM RULE', 'The Wood hidden in your strongest seat shows on two of your stems. That makes the Steward the organising force of your life.'],
      ['2', 'What your chart runs on and lacks', 'Wood and Earth carry two thirds of your chart, and you live mostly through what you earn and what you think.', 'MISSING · NO MAGISTRATE', 'No Magistrate sits in your chart, and nobody inside it tells you what the rules are. You borrow structure from a boss or a contract.'],
      ['3', 'Seen and unseen', 'You come across as a careful provider, the one who pays on time and keeps count.', 'INSIDE · THE HORIZON', 'You keep a second plan that nobody has heard about, and you want more open roads than you admit.'],
      ['4', 'Pairings and clashes', 'Your thinking outweighs your making, and you study a thing so long that the moment to make it passes.', 'DAY BINDS WITH YEAR · 寅亥合', 'You build your own home close to the habits of the one you grew up in.'],
    ],
    season: ['三月庚 · 穷通宝鉴', 'You were born in late spring, when Earth runs the season and buries Metal more than it feeds it. Your season asks first for Wood to break that Earth open and then for Fire to temper you.'],
  },
  pillars: [['YEAR', '乙', '亥', 'wood', 'water', '壬 甲'], ['MONTH', '庚', '辰', 'metal', 'earth', '戊 乙 癸'], ['DAY · SELF', '庚', '寅', 'metal', 'wood', '甲 丙 戊'], ['HOUR', '乙', '酉', 'wood', 'metal', '辛']],
  seats: [['年干', 'The Steward at the Year Gate', ['Wealth', 'Family']], ['年支', 'The Artisan inside the Year Gate', ['Family', 'Health']], ['月干', 'The Twin at the Month Gate', ['Career', 'Social']], ['月支', 'The Alchemist inside the Month Gate', ['Mind', 'Growth', 'Career']], ['日支', 'The Horizon inside the Day Gate', ['Love', 'Social', 'Wealth']], ['时干', 'The Steward at the Hour Gate', ['Wealth', 'Family']], ['时支', 'The Rival inside the Hour Gate', ['Family', 'Wealth']]],
  almanac: {
    today: { date: 'WED 21 OCT', el: 'earth', line: 'Earth weighs on you, and work goes over old ground', tone: 'LEANS AGAINST YOU', pole: 'fric', bars: 2,
      carries: 'Earth brings Mind, the energy your chart already has too much of. Your thoughts circle, and you get less done than you meant to.',
      lands: 'The day’s Earth repeats the Earth in your Month Gate, the seat of your work.', landsText: 'Work brings back a task you thought was finished, or a meeting that covers familiar points. You get through it faster because you know the way.',
      favours: [['A simple checklist', 'endless rethinking'], ['Time spent training others', 'a personal task list'], ['Company and daylight', 'brooding indoors'], ['A known path', 'a strange detour']],
      doms: [['Career', 'Tested'], ['Wealth', 'Quiet'], ['Love', 'Open'], ['Family', 'Open'], ['Social', 'Quiet'], ['Health', 'Quiet'], ['Mind', 'Tested'], ['Growth', 'Tested']] },
    week: [['Mo', 'fire', 45], ['Tu', 'fire', 50], ['We', 'earth', -30, true], ['Th', 'earth', -20], ['Fr', 'metal', -15], ['Sa', 'metal', -30], ['Su', 'water', 15]],
    loud: [['25 Oct', 'water', 'Water loosens your tongue, and home shifts'], ['27 Oct', 'wood', 'Wood widens your reach, and work pushes back'], ['1 Nov', 'earth', 'Earth weighs on you, and a plan for later moves'], ['6 Nov', 'wood', 'Wood widens your reach, and your own day turns over'], ['8 Nov', 'fire', 'Fire sharpens you, and work pushes back']],
    month: { span: '8 OCT TO 6 NOV · AN EARTH MONTH', el: 'earth', line: 'Earth weighs on you, and work pushes back', tone: 'WEIGHS', pole: 'fric', bars: 4,
      carries: 'Earth brings Mind for a whole month, the energy your chart already has too much of. You move slower and think longer, and you hold your ground well.',
      lands: 'A role or a routine you settled comes loose this month, and you rebuild it in a different shape.',
      favours: [['Finishing', 'starting'], ['Fixing it quietly', 'raising it'], ['Second thoughts', 'quick decisions'], ['One subject', 'many']] },
    year: { span: '3 FEB 2026 TO 3 FEB 2027', el: 'fire', line: 'Fire sharpens you, and home comes to a decision', tone: 'LIFTS', pole: 'cat', bars: 2,
      carries: 'Fire brings Order for a whole year, the energy you need most. It presses on you from outside, and you end the year harder to bend.',
      lands: 'You make a decision about home or partnership this year that you have been circling for a while.',
      months: [['F', 'metal', -5], ['M', 'metal', 0], ['A', 'water', 20], ['M', 'water', 30], ['J', 'wood', 35, 'season'], ['J', 'wood', 20], ['A', 'fire', 15], ['S', 'fire', 0, 'season'], ['O', 'earth', -45, 'now'], ['N', 'earth', 0], ['D', 'metal', 0], ['J', 'metal', -35]] },
    decade: { label: 'LIFE CHAPTER · YEAR 4 OF 10', span: '2023 to 2032', done: 4 },
  },
  guidance: [['抽', 'Elemental Draw', 'Draw today’s card', 'TODAY’S RITE · EARTH DAY'], ['省', 'Self-Report', 'Calibrate your reading', 'SEEKER'], ['問', 'AI Consultant', 'Ask anything, anytime', 'ADVISOR'], ['典', 'BaZi Codex', 'The concepts, in plain words', 'LEARN']],
};

/* The Underfueled sample (乙 The Vine) — enough to show the condition flips */
const U = {
  arch: 'The Vine', stem: '乙', lit: '乙 · YIN WOOD', seal: 'stem-yi-wood.png', thesis: 'Route bends. Destination holds.', edge: 'You are the Wood that gets there anyway.',
  cond: 'Underfueled', score: 2, runShort: 'Spends more than it takes in', runLine: 'Your Wood spends more than it takes in.',
  rx: 'Release Metal, Earth and Fire. Grow Water and Wood.', start: 'Start with Water, your Mind.', first: 'water',
  nature: 'You keep the vine’s gift of finding windows, even in seasons when you knock on fewer doors. The winding costs more in this season, so you pick your walls with care.',
  pct: { metal: 74, earth: 12, wood: 11, fire: 3, water: 0 },
};

/* ── helpers ─────────────────────────────────────────────────────── */
const use = (id, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true"><use href="#jny-${id}"/></svg>`;
const mark = (el, cls = '') => use(`el-${el}`, `e-${el} ${cls}`);
const dot = (el, size = 44, label = '') => `<span class="kdot" style="--s:${size}px;background-image:url(dot-${el}.png)">${mark(el)}${label}</span>`;
const art = (name, cls = '', pos = 'center') => `<span class="kart ${cls}" style="background-image:url(${name}.jpg);background-position:${pos}"></span>`;
const pill = (pole, word, icon = true) => {
  const m = { cat: ['cat', 'ar-up', word || 'Grow'], fric: ['fric', 'ar-down', word || 'Release'], cond: ['cond', 'ic-charged', word || 'Overfueled'], core: ['core', null, word || 'Core'], adv: ['adv', null, word || 'Advisor'], seek: ['seek', null, word || 'Seeker'] }[pole];
  return `<span class="role-pill ${m[0]}">${icon && m[1] ? use(m[1]) : ''}${m[2]}</span>`;
};
const arrowBtn = (cls = '') => `<span class="readcirc ${cls}">${use('ico-arrow-r')}</span>`;
function dial(score, condition) {
  const s = score; const a = Math.PI * (1 - s / 7); const cx = 60, cy = 58, r = 44;
  const pt = (t) => [cx + r * Math.cos(Math.PI * (1 - t)), cy - r * Math.sin(Math.PI * (1 - t))];
  const arc = (t0, t1) => { const [x0, y0] = pt(t0); const [x1, y1] = pt(t1); return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`; };
  return `<svg class="mg-dial" viewBox="0 0 120 70" role="img" aria-label="${condition}: ${s} of 7"><path d="${arc(0.01, 0.36)}" class="z-u"/><path d="${arc(0.4, 0.6)}" class="z-b"/><path d="${arc(0.64, 0.99)}" class="z-o"/><line x1="${cx}" y1="${cy}" x2="${(cx + (r - 8) * Math.cos(a)).toFixed(1)}" y2="${(cy - (r - 8) * Math.sin(a)).toFixed(1)}" class="needle"/><circle cx="${cx}" cy="${cy}" r="3.5" class="hub"/></svg>`;
}
const wheel = (chart = 'golden', view = 'do', cls = '') => `<img class="kwheel ${cls}" src="wheel-${chart}-${view}.png" alt="The dominance wheel, ${view === 'do' ? 'what they do to you' : 'by amount'}">`;
const seg = (on = 'do', target = '') => `<div class="mg-seg" role="group" aria-label="Wheel view"${target ? ` data-wheel="${target}"` : ''}><button type="button" aria-pressed="${on === 'do'}" data-v="do">What they do to you</button><button type="button" aria-pressed="${on === 'amt'}" data-v="amt">By amount</button></div>`;
const presBar = (hi, P = null) => {
  const pc = P || Object.fromEntries(EL.map((e) => [e, D.E[e].p]));
  const ord = [...EL].sort((a, b) => pc[b] - pc[a]);
  return `<span class="kbar">${ord.map((e) => `<i class="b-${e}${e === hi ? ' on' : ''}" style="flex:${Math.max(pc[e], 2)}"></i>`).join('')}</span>`;
};
const status = (dark = false) => `<div class="kstatus${dark ? ' dark' : ''}"><span>9:41</span><span>●●● ⌃ ▮</span></div>`;
const tabbar = (active) => `<nav class="ktabs" aria-label="Tabs">${['today', 'guidance', 'reading', 'compat', 'profile'].map((t) => `<span class="${t === active ? 'on' : ''}" ${t === 'today' ? 'data-go="almanac-hub"' : t === 'reading' ? 'data-go="reading"' : t === 'guidance' ? 'data-go="guidance"' : ''}>${use(`tab-${t}`)}</span>`).join('')}</nav>`;
const back = (label, to) => `<button class="kback" data-go="${to}">${use('ico-chev-l')}<span>${label}</span></button>`;
const domIcon = (d) => use(({ Wealth: 'dom-wealth', Family: 'dom-family', Career: 'dom-career', Social: 'dom-social', Health: 'dom-health', Love: 'dom-love', Mind: 'dom-mind', Growth: 'dom-growth' })[d] || 'dom-career');

/* ── page engine: flows of phone frames, tap-to-travel ───────────── */
function renderVariant(V) {
  const root = document.getElementById('app');
  const idx = V.flows.map((f) => `<a href="#f-${f.id}" class="kchip">${f.short}</a>`).join('');
  root.innerHTML = `
  <header class="vhead">
    <div class="vk">${V.code} · Elementum design pass</div>
    <h1>${V.name}</h1>
    <p class="thesis">${V.thesis}</p>
    <div class="model">
      <div><span class="ml">TAP</span><p>${V.tap}</p></div>
      <div><span class="ml">SCROLL</span><p>${V.scroll}</p></div>
      <div><span class="ml">FIND NEXT</span><p>${V.next}</p></div>
    </div>
    ${V.intro ? `<p class="vintro">${V.intro}</p>` : ''}
  </header>
  <nav class="kindex" aria-label="Flows">${idx}</nav>
  ${V.flows.map((f) => `
    <section class="flow" id="f-${f.id}">
      <div class="fhead"><span class="fn">${f.short}</span><h2>${f.title}</h2>${f.note ? `<p>${f.note}</p>` : ''}</div>
      <div class="shelf">${f.screens.map((s) => `
        <figure class="frame" id="s-${s.id}">
          <figcaption><b>${s.label}</b>${s.gesture ? `<span>${s.gesture}</span>` : ''}</figcaption>
          <div class="phone ${s.cls || ''}"><div class="screen">${s.html}</div></div>
        </figure>`).join('')}</div>
    </section>`).join('')}
  ${V.after || ''}`;
  // travel: any [data-go] inside a phone scrolls to that frame and flashes it
  root.addEventListener('click', (e) => {
    const sg = e.target.closest('.mg-seg button');
    if (sg) { const g = sg.closest('.mg-seg'); g.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', b === sg)); const w = (g.dataset.wheel ? document.getElementById(g.dataset.wheel) : g.closest('.screen').querySelector('.kwheel')); if (w) w.src = w.src.replace(/-(do|amt)\.png/, `-${sg.dataset.v}.png`); return; }
    const t = e.target.closest('[data-toggle]');
    if (t) { const scr = t.closest('.screen'); const el = scr.querySelector(t.dataset.toggle); if (el) el.hidden = !el.hidden; return; }
    const g = e.target.closest('[data-go]');
    if (!g) return;
    const f = document.getElementById(`s-${g.dataset.go}`);
    if (!f) return;
    f.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    f.closest('.flow').scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => f.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }), 350);
    f.classList.remove('flash'); void f.offsetWidth; f.classList.add('flash');
  });
}

/* the Almanac ribbon (lift above the line, weight below), real values */
const ribbon = (items) => `<div class="ribbon" style="grid-template-columns:repeat(${items.length},1fr)">${items.map(([l, el, v, f]) => `<div class="rc${f === true || f === 'now' ? ' now' : ''}"><span class="bx"><i style="${v >= 0 ? `bottom:50%;height:${Math.max(v, 3) / 1.1}%` : `top:50%;height:${-v / 1.1}%`};background:var(--${el}${v >= 0 ? 'Deep' : ''});opacity:${v >= 0 ? 1 : .7}"></i></span>${mark(el)}<small>${l}${f === 'season' ? '●' : ''}</small></div>`).join('')}</div>`;
/* the life strip: four gates, the age needle (real gate energies) */
const lifeStrip = (compact = false) => `<div class="lstrip${compact ? ' c' : ''}">${D.chapters.gates.map(([g, span, el, und, tone, when]) => `<div class="lg${when === 'NOW' ? ' now' : ''}"><span class="lgn">${g}</span><span class="lgd">${dot(el, compact ? 18 : 24)}${und ? dot(und, compact ? 18 : 24) : ''}</span><span class="lgs">${span}</span></div>`).join('')}<span class="lneedle" style="left:${(31 - 16) / 19 * 25 + 25}%"><b>you · 31</b></span></div>`;
