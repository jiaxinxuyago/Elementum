// Assemble a blind generation prompt from REA_17 + the station for one field test.
import fs from 'fs';
const ROOT = '/home/user/Elementum/';
const S = ROOT + 'Reading/Database/templates/by_axis/json/';
const OUT = '/home/user/Elementum/Feedbacks/Deliverables/llm-ab-test-2026-09-21/harness/out/';
const rea17 = fs.readFileSync(ROOT + 'Reading/Documents/REA_17_Generation_Prompt_Pack.md', 'utf8');
const J = (p) => JSON.parse(fs.readFileSync(S + p, 'utf8'));
const strip = (o) => Array.isArray(o) ? o.map(strip) : (o && typeof o === 'object') ? Object.fromEntries(Object.keys(o).filter(k => !k.startsWith('__ore')).map(k => [k, strip(o[k])])) : o;
const section = (from, to) => { const a = rea17.indexOf(from), b = rea17.indexOf(to, a + 1); return rea17.slice(a, b); };
const master = section('## §1 · THE MASTER PROMPT', '## §2 ·').split('\n').map(l => l.replace(/^> ?/, '')).join('\n');
const inputPackGeneral = section('## §2 · THE INPUT PACK', '## §3 ·');
const card = (key) => { const a = rea17.indexOf('**`' + key + '`'); if (a < 0) throw new Error('no card ' + key); let b = rea17.indexOf('\n**`', a + 1); const c = rea17.indexOf('\n### ', a + 1); if (c > 0 && (b < 0 || c < b)) b = c; return rea17.slice(a, b); };
const STEM_META = { '丙': ['bing', 'Fire', 'yang'], '甲': ['jia', 'Wood', 'yang'], '癸': ['gui', 'Water', 'yin'], '庚': ['geng', 'Metal', 'yang'] };
const HZ = { Wood: '木', Fire: '火', Earth: '土', Metal: '金', Water: '水' };
const FEED = { Wood: 'Fire', Fire: 'Earth', Earth: 'Metal', Metal: 'Water', Water: 'Wood' };
const TAME = { Wood: 'Earth', Earth: 'Water', Water: 'Fire', Fire: 'Metal', Metal: 'Wood' };
const IMAGE = { '木生火': 'dry branches make the flame', '火生土': 'ash becomes soil', '土生金': 'ore grows in the mountain', '金生水': 'dew beads on the cold blade', '水生木': 'rain raises the forest', '木克土': 'roots hold the hillside', '土克水': 'banks give the river its path', '水克火': 'rain ends the blaze', '火克金': 'the forge softens the blade', '金克木': 'the knife prunes the branch' };
const relation = (core, energy) => core === energy ? ['self', 'Body'] : FEED[energy] === core ? ['feeder', 'Mind'] : FEED[core] === energy ? ['fed', 'Expression'] : TAME[core] === energy ? ['tamed', 'Action'] : ['tamer', 'Order'];
const law = (a, b) => FEED[a] === b ? `${a} feeds ${b} (${HZ[a]}生${HZ[b]}: ${IMAGE[HZ[a] + '生' + HZ[b]]})` : TAME[a] === b ? `${a} tames ${b} (${HZ[a]}克${HZ[b]}: ${IMAGE[HZ[a] + '克' + HZ[b]]})` : null;
const pairFacts = (core, energy) => { const [rel, fn] = relation(core, energy); const l = law(energy, core) || law(core, energy) || `${core} and ${energy} are the same element (the self pair)`; return `Core element ${core}, energy element ${energy}. Law: ${l}. Relative to the core the energy is the ${rel}, so ${energy} is this core's ${fn}.`; };
const GOD_FILE = { '比肩': 'bijian', '劫财': 'jiecai', '食神': 'shishen', '伤官': 'shangguan', '偏财': 'piancai', '正财': 'zhengcai', '七杀': 'qisha', '正官': 'zhengguan', '偏印': 'pianyin', '正印': 'zhengyin' };
const SIB = { '比肩': '劫财', '劫财': '比肩', '食神': '伤官', '伤官': '食神', '偏财': '正财', '正财': '偏财', '七杀': '正官', '正官': '七杀', '偏印': '正印', '正印': '偏印' };
const FAMILY_FN = { '比肩': 'Body', '劫财': 'Body', '食神': 'Expression', '伤官': 'Expression', '偏财': 'Action', '正财': 'Action', '七杀': 'Order', '正官': 'Order', '偏印': 'Mind', '正印': 'Mind' };
const PORTRAIT = { '食神': 'ease, appetite, output that flows without assertion; the classical 食神 is the gourmet-maker, generous, content, prone to drift and indulgence', '伤官': 'brilliance and defiance, output that exceeds its container; 傲物气高, cannot hold its tongue', '正财': 'methodical, directed acquisition, value built and kept; caution, thrift, the slow ledger', '偏财': 'wide-ranging engagement, opportunity sensed at a distance, windfall and generosity', '偏印': 'unorthodox absorption, solitary mastery, intake that starves output (夺食)', '正印': 'shelter, over-protection, nourishment that deepens without redirecting', '七杀': 'pressure as clarity, the trial that forges, force without permission', '正官': 'framework-mediated pressure, the standard that steadies, rank held by rules', '比肩': 'same nature same register, the standard held to oneself, self-reliance', '劫财': 'same nature different register, comparison as fuel, rivalry' };
const godPack = (g) => { const c = strip(J('GOD/' + GOD_FILE[g] + '.json').candidates); return `Persona ${c.persona_name} (${g}). Definition line: "${c.definition_line}". Keyword ${c.keyword}, charge ${c.charge}, poles catalyst ${c.pole_catalyst} / friction ${c.pole_friction}. Family function: ${FAMILY_FN[g]}. Classical portrait: ${PORTRAIT[g]}. Ruled domains: ${c.domains.join(', ')}. Sibling (other polarity of the family): ${SIB[g]}.`; };
const header = (title) => `# BLIND GENERATION TEST · ${title}\n\nYou are a generator under test. Use ONLY the text in this message. Do not consult any file, tool, memory of this product, or outside source. Return ONLY the JSON value requested at the end, with no commentary, no code fence.\n\n---\n\n`;
const write = (name, text) => { fs.writeFileSync(OUT + name + '.prompt.md', text); console.log(name, text.split(/\s+/).length, 'words'); };

// T1 · STEM.gifts + shadows for 丙 The Sun (full pool, blind)
{
  const [file, el] = STEM_META['丙']; const st = strip(J(`STEM/${file}.json`).candidates);
  const doors = st.door_note; let pairs = '';
  for (const [door, en] of Object.entries(doors)) { const cell = strip(J(`ELEMENT_PAIR/${HZ[el]}_${HZ[en]}.json`).candidates); pairs += `\n### Pair cell ${HZ[el]}_${HZ[en]} (door ${door}, ${pairFacts(el, en)})\n- function.definition_catalyst: "${cell.function.definition_catalyst}"\n- function.definition_friction: "${cell.function.definition_friction}"\n- carry.wide: ${cell.carry.wide ? JSON.stringify(cell.carry.wide) : 'none (self pair): the Body wide gift is cut from this cell\'s definition_catalyst, echo_of = ' + HZ[el] + '_' + HZ[en] + '.function.definition_catalyst'}\n- carry.excess: ${JSON.stringify(cell.carry.excess)}\n`; }
  const facts = `## CELL FACTS (from the station)\n\nStem 丙 The Sun, Yang Fire. Spine: radiates. Manifesto: "${st.manifesto}". Inscription: "${st.inscription}". dm_overview (the sign): "${st.dm_overview}". Door map (function → element): ${JSON.stringify(doors)}. The yang stem reads carry.excess (no carry_yin).${pairs}`;
  const ask = `\n\n## TASK\n\nWrite the full gifts and shadows pool for 丙 The Sun: exactly 7 gifts and 7 shadows, as {"gifts":[...],"shadows":[...]} where every item is {"phrase","dim","door","face","echo_of","desc"}. Faces: one "echo" item per door on each side (gift cut from definition_catalyst, shadow from definition_friction); Body and Mind carry a second item (gift "wide" cut from carry.wide, shadow "excess" cut from carry.excess). echo_of is the exact station path, e.g. "火_木.function.definition_catalyst" or "火_木.carry.wide". Return the JSON only.`;
  write('T1_bing_pools', header('STEM.gifts and STEM.shadows · 丙 The Sun') + master + '\n\n---\n\n' + inputPackGeneral + '\n\n---\n\n## THE FIELD CARD\n\n' + card('STEM.gifts') + '\n\n---\n\n' + facts + ask);
}
// T2 · ELEMENT_PAIR 木_水 friction turn + carry friction/thin/excess (blind)
{
  const cell = strip(J('ELEMENT_PAIR/木_水.json').candidates);
  const facts = `## CELL FACTS\n\n${pairFacts('Wood', 'Water')}\n- mechanism.classic: ${cell.mechanism.classic}\n- mechanism.base: "${cell.mechanism.base}"\n- mechanism.catalyst_turn (the other pole, for contrast and the repetition law): "${cell.mechanism.catalyst_turn}"\n- function.definition_friction: "${cell.function.definition_friction}"\n- function.advise_friction: "${cell.function.advise_friction}"\n- carry.catalyst (the other pole, for the cut law): ${JSON.stringify(cell.carry.catalyst)}\n- carry.wide: ${cell.carry.wide ? JSON.stringify(cell.carry.wide) : 'none (self pair): the Body wide gift is cut from this cell\'s definition_catalyst, echo_of = ' + HZ[el] + '_' + HZ[en] + '.function.definition_catalyst'}\n- carry.missing: ${JSON.stringify(cell.carry.missing)}\n- carry.spared: ${JSON.stringify(cell.carry.spared)}\n\nThe classical excess idiom for too much Water on Wood: 水多木漂 (the wood floats, uprooted and drifting).`;
  const ask = `\n\n## TASK\n\nWrite for 木_水: (a) mechanism.friction_turn (≤35 words, opens "Run heavy,"); (b) carry.friction = {clause ≤18w, remedy ≤12w} CUT from that turn (its first clause and its own directive); (c) carry.thin = {clause, remedy} for Water unwanted at ≤10%; (d) carry.excess = {clause, remedy} for dominant Water, the idiom in English, never quoted. Return {"friction_turn": "...", "carry": {"friction": {...}, "thin": {...}, "excess": {...}}} only.`;
  write('T2_mu_shui_turn_carry', header('ELEMENT_PAIR 木_水 friction turn + carry poles') + master + '\n\n---\n\n' + inputPackGeneral + '\n\n---\n\n## THE FIELD CARDS\n\n' + card('ELEMENT_PAIR.mechanism.catalyst_turn') + '\n\n' + card('ELEMENT_PAIR.carry') + '\n\n---\n\n' + facts + ask);
}
// T3 · ELEMENT_GOD 水_食神 fn_reading catalyst row 1, three doors (blind)
{
  const cell = strip(J('ELEMENT_GOD/水_食神.json').candidates); const sib = strip(J('ELEMENT_GOD/水_伤官.json').candidates);
  const facts = `## CELL FACTS\n\nCell 水_食神 (Water carrying the Artisan). ${godPack('食神')}\nElement arena: Water (depth, current, tide, rain, spring, flow). dm_element (which core reads this cell): ${cell.dm_element}. structural_interaction seed: "${cell.structural_interaction}".\n- k2_overview: "${cell.k2_overview}"\n- k2_functional: "${cell.k2_functional}"\n- adj_chips: ${JSON.stringify(cell.adj_chips)}\n- Sibling cell 水_伤官 chips (nothing you write may fit the sibling): ${JSON.stringify(sib.adj_chips)}; its catalyst row 1 trait door, for contrast: "${sib.fn_reading.catalyst.ledger[0].doors.trait}"\n- Row rank: you are writing catalyst row 1, word "${cell.adj_chips.catalyst[0]}".`;
  const ask = `\n\n## TASK\n\nWrite the three door passages for the catalyst ledger row 1 of 水_食神, word "${cell.adj_chips.catalyst[0]}": {"word": "${cell.adj_chips.catalyst[0]}", "doors": {"trait": "...", "scene": "...", "outside": "..."}}, each door 35–55 words. Return the JSON only.`;
  write('T3_shui_shishen_ledger', header('ELEMENT_GOD 水_食神 fn_reading row') + master + '\n\n---\n\n' + inputPackGeneral + '\n\n---\n\n## THE FIELD CARD\n\n' + card('ELEMENT_GOD.fn_reading') + '\n\n---\n\n' + facts + ask);
}
// T4 · POSITION zhengcai_day_branch reading + teaser + domain_readings (blind)
{
  const pos = strip(J('POSITION/zhengcai_day_branch.json').candidates);
  const facts = `## CELL FACTS\n\nNamed event: "${pos.term}" · ${pos.term_zh}. ${godPack('正财')}\nGate: ${pos.gate} (ground: the self's seat and the spouse palace). Slot kind: ${pos.slot_kind} (branch = the root, private, dispositional, "inside the Gate"). Era: the Home Chapter (~35–48, adulthood, the marriage years). Relations register: the spouse, the intimate self. Seat rank: 日支 is third of seven. Declared domains: ${JSON.stringify(pos.domains)}.\n- defline (existing, for context): "${pos.defline}"`;
  const ask = `\n\n## TASK\n\nWrite {"reading": "...", "teaser": "...", "domain_readings": {${pos.domains.map(d => `"${d}": "..."`).join(', ')}}} for this position: reading 80–115 words opening with the domain declaration sentence; teaser ≤30 words, one line; one paragraph of 35–60 words per declared domain. Return the JSON only.`;
  write('T4_zhengcai_day_branch', header('POSITION 正财 inside the Day Gate') + master + '\n\n---\n\n' + inputPackGeneral + '\n\n---\n\n## THE FIELD CARDS\n\n' + card('POSITION.teaser') + '\n\n' + card('POSITION.reading') + '\n\n' + card('POSITION.domain_readings') + '\n\n---\n\n' + facts + ask);
}
// T5 · STEM_BAND 癸 open yourNature_desc + self_card (blind)
{
  const st = strip(J('STEM/gui.json').candidates);
  const facts = `## CELL FACTS\n\nStem 癸 The Rain, Yin Water. Spine: permeates. Band: open = Underfueled (the core burns more than it takes in). Manifesto: "${st.manifesto}". dm_overview (the sign whose central image sentence 1 must receive): "${st.dm_overview}". Baseline yourNature_desc (band-neutral, for the person's trait): "${st.yourNature_desc}".`;
  const ask = `\n\n## TASK\n\nWrite {"yourNature_desc": "...", "self_card": {"face": "...", "presence": "..."}} for 癸 on the Underfueled band: yourNature_desc 50–75 words opening on "You" and receiving the sign's image; face ≤8 words; presence ≤30 words. Return the JSON only.`;
  write('T5_gui_open_band', header('STEM_BAND 癸 Underfueled') + master + '\n\n---\n\n' + inputPackGeneral + '\n\n---\n\n## THE FIELD CARDS\n\n' + card('STEM_BAND.yourNature_desc') + '\n\n' + card('STEM_BAND.self_card') + '\n\n---\n\n' + facts + ask);
}
// T6 · ELEMENT_GOD 土_正财 k2_domain_readings (blind)
{
  const cell = strip(J('ELEMENT_GOD/土_正财.json').candidates); const god = strip(J('GOD/zhengcai.json').candidates);
  const facts = `## CELL FACTS\n\nCell 土_正财 (Earth carrying the Steward). ${godPack('正财')}\nElement arena: Earth (ground, soil, load, field, bedrock, harvest). dm_element: ${cell.dm_element}. structural_interaction: "${cell.structural_interaction}".\n- k2_overview: "${cell.k2_overview}"\n- k2_functional: "${cell.k2_functional}"\n- adj_chips: ${JSON.stringify(cell.adj_chips)}`;
  const ask = `\n\n## TASK\n\nWrite k2_domain_readings for 土_正财 as {${god.domains.map(d => `"${d}": "..."`).join(', ')}}, one paragraph of 18–55 words per domain. Return the JSON only.`;
  write('T6_tu_zhengcai_domains', header('ELEMENT_GOD 土_正财 k2_domain_readings') + master + '\n\n---\n\n' + inputPackGeneral + '\n\n---\n\n## THE FIELD CARD\n\n' + card('ELEMENT_GOD.k2_domain_readings') + '\n\n---\n\n' + facts + ask);
}
// originals for the structural comparison
const originals = {
  T1: (() => { const c = strip(J('STEM/bing.json').candidates); return { gifts: c.gifts, shadows: c.shadows }; })(),
  T2: (() => { const c = strip(J('ELEMENT_PAIR/木_水.json').candidates); return { friction_turn: c.mechanism.friction_turn, carry: { friction: c.carry.friction, thin: c.carry.thin, excess: c.carry.excess } }; })(),
  T3: strip(J('ELEMENT_GOD/水_食神.json').candidates).fn_reading.catalyst.ledger[0],
  T4: (() => { const c = strip(J('POSITION/zhengcai_day_branch.json').candidates); return { reading: c.reading, teaser: c.teaser, domain_readings: c.domain_readings }; })(),
  T5: (() => { const c = strip(J('STEM_BAND/gui_open.json').candidates); return { yourNature_desc: c.yourNature_desc, self_card: c.self_card }; })(),
  T6: strip(J('ELEMENT_GOD/土_正财.json').candidates).k2_domain_readings,
};
fs.writeFileSync(OUT + 'originals.json', JSON.stringify(originals, null, 1));
console.log('originals saved');
