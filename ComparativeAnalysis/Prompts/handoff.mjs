// THE HANDOFF BUILDER: one dispatchable prompt + one zipped folder that lets a
// model with zero background write the full reading of one chart's Day Master
// page and five energy pages, field by field, as pipeable JSON.
//   node handoff.mjs --chart golden --pass blind|benchmarked [--out ../Handoffs/<name>]
// Output folder: 00_DISPATCH_PROMPT.md · README.md · prompts/ (the prompt
// database, verbatim) · cards/ (the field cards in scope) · chart/ (the engine's
// full output + the readable sheet) · skeletons/<cell>.json (the fields to
// fill, with spec, context and facts) · benchmark/ (the current text, only in
// the benchmarked pass) · and the zip beside the folder.
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { ROOT, PROMPTS, J, STEMS, HZ, EL_OF_HZ, relation, cureSet, remedyVerb, REMEDY_GLOSS, stemFacts, bandFacts, pairCellFacts, egCellFacts, WIDE_OPENERS, idioms4w, wc, master, inputPackGeneral, card } from './lib.mjs';
import { CHARTS, resolveChart, describeChart } from './chart.mjs';
const argv = process.argv.slice(2); const opt = (n, d) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : d; };
const chartId = opt('chart', 'golden'); const pass = opt('pass', 'blind'); const targeted = pass === 'targeted'; const blind = pass === 'blind' || targeted;
// --pass targeted (owner 2026-09-30, H8): the blind package plus one target per named field from --targets <targets.json>, written by the operator from the read: { "<skeleton file>": { "<field path>": { "axis": "tension|cost|vocabulary|four-question", "beat": "<one sentence on what the current line fails on that axis, never the line>" } } }. The current sentence stays withheld (red() redacts as in blind) and the benchmark folder stays out of the zip; the reuse check (validate-template.mjs --against <this folder>/benchmark) still blocks a four-word run of it.
const TARGET_AXES = ['tension', 'cost', 'vocabulary', 'four-question']; // v0.7 (owner 2026-10-01): tension = the either-or named on point; cost = the cost stated as the reader's own difficulty, need or price, in the persona's domain; vocabulary = the plain psychological lexicon at B1 to B2, no clinical term, no intensifier; four-question = the 2026-09-17 pack's four questions const targets = targeted ? JSON.parse(fs.readFileSync(opt('targets', '') || (() => { console.error('--pass targeted needs --targets <targets.json>'); process.exit(2); })(), 'utf8')) : {}; for (const [f, m] of Object.entries(targets)) if (!f.startsWith('_')) for (const [fp, t] of Object.entries(m)) if (!TARGET_AXES.includes(t.axis) || !t.beat) { console.error(`targets.json: ${f} ${fp} needs axis (${TARGET_AXES.join(' | ')}) and beat`); process.exit(2); }
const applyTargets = (file, fields) => { for (const [fp, t] of Object.entries(targets[file] || {})) if (fields[fp]) fields[fp].spec.target = { axis: t.axis, beat: t.beat, note: 'the one axis this field must beat the current line on; the current line is withheld and a four-word run of it is blocked' }; };
const ch = resolveChart(CHARTS[chartId]); const stem = ch.stem; const meta = STEMS[stem]; const stemFile = meta.file; const yin = ch.yin;
const today = new Date().toISOString().slice(0, 10);
const name = opt('out', `${ROOT}ComparativeAnalysis/Handoffs/${today}-${stemFile}-${chartId}-${pass}`);
const OUTDIR = name.replace(/\/$/, '') + '/';
for (const d of ['', 'prompts', 'prompts/fields', 'cards', 'chart', 'skeletons', 'benchmark']) fs.mkdirSync(OUTDIR + d, { recursive: true });
const red = (v) => (blind ? '[REDACTED: the field under test]' : v);
const FN_TERM = { Body: 'Body', Mind: 'Mind', Expression: 'Expression', Action: 'Action', Order: 'Order' };

// ── the scope: only what this chart shows on P4 and the five energy pages ──
const st = J(`STEM/${stemFile}.json`); const band = J(`STEM_BAND/${stemFile}_${ch.band}.json`);
const shownGifts = ch.selected.gifts, shownShadows = ch.selected.shadows;
const poolItem = (side, sel) => { const it = st[side].find((x) => x.phrase === sel.phrase); return { ...it, index: st[side].indexOf(it) }; };
const skeletons = []; const benchmark = {};
const spec = (o) => o;

// P4
{
  const fields = {};
  fields['manifesto'] = { spec: spec({ card: 'STEM.manifesto', min: 4, max: 14, candidates: 2, form: 'L1 · L2', opener_L2: `You are the ${meta.el} that`, notes: 'L1 a noun-led hierarchy claim of 2 to 4 words, never the element or the reader; L2 the identity formula carrying the spine verb; joined by " · ".' }), value: red(st.manifesto) };
  fields['dm_overview'] = { spec: spec({ card: 'STEM.dm_overview', min: 55, max: 85, person: 'third person, the sign is the only actor, no "you"', opener: `${meta.name} is` }), value: red(st.dm_overview) };
  fields['band.yourNature_desc'] = { spec: spec({ card: 'STEM_BAND.yourNature_desc', band: ch.band, min: 50, max: 75, person: 'second person', opener: 'You', notes: 'sentence 1 receives the sign paragraph\'s central image onto the reader in this stem\'s own words; the band is a present state, never a decline; no four-word run from another stem\'s portrait' }), value: red(band.yourNature_desc) };
  fields['band.self_card.face'] = { spec: spec({ card: 'STEM_BAND.self_card', min: 1, max: 8, person: 'impersonal noun phrase naming the band state in the arena' }), value: red(band.self_card.face) };
  fields['band.self_card.presence'] = { spec: spec({ card: 'STEM_BAND.self_card', min: 5, max: 30, candidates: 2, person: 'second person allowed; being that state, dignified' }), value: red(band.self_card.presence) };
  for (const [side, sels] of [['gifts', shownGifts], ['shadows', shownShadows]]) sels.forEach((sel) => { const it = poolItem(side, sel); fields[`${side}[${it.index}]`] = { spec: spec({ card: 'STEM.gifts', side: side.slice(0, -1), door: it.door, face: it.face, echo_of: it.echo_of, fixed: ['door', 'face', 'echo_of'], phrase: { min: 1, max: 3, idioms4w: [...idioms4w()] }, dim: { min: 1, max: 4 }, desc: { sentences_min: 1, sentences_max: 4, max_words: 60, person: 'second person' }, notes: `cut from ${it.echo_of} under the derivation law: same mechanism, the stem's material, the phrase names the symptom and reads as a ${side.slice(0, -1)} alone` }), value: { phrase: red(it.phrase), dim: red(it.dim), desc: red(it.desc) } }; });
  const others = [...st.gifts, ...st.shadows].filter((x) => !shownGifts.some((s) => s.phrase === x.phrase) && !shownShadows.some((s) => s.phrase === x.phrase)).map((x) => `${x.phrase} (${x.door}, ${x.face}, dim "${x.dim}")`);
  const facts = stemFacts(stem, { redact: blind ? ['manifesto', 'dm_overview'] : [], pools: true }) + `\n\nChart: ${ch.label}. Band ${ch.bandTerm}. Doors open on this chart: gifts through ${ch.doors.gifts.map((d) => d.door + ' (' + d.el + ')').join(', ')}; shadows through ${ch.doors.shadows.map((d) => d.door + ' (' + d.el + ')').join(', ')}. The chips shown are the ones in this skeleton; the other nine pool items are not shown on this chart and are listed for uniqueness only (no phrase may repeat one): ${others.join(' · ')}.`;
  applyTargets(`P4.${stemFile}.json`, fields); skeletons.push({ file: `P4.${stemFile}.json`, cell: `STEM/${stemFile} + STEM_BAND/${stemFile}_${ch.band}`, page: `The Day Master page (P4) of ${stem} ${meta.name}`, read: ['prompts/04_READING_SYSTEM_PRIMER.md', 'prompts/00_MASTER_PROMPT.md', 'cards/STEM.manifesto.md', 'cards/STEM.dm_overview.md', 'cards/STEM_BAND.yourNature_desc.md', 'cards/STEM_BAND.self_card.md', 'cards/STEM.gifts.md'], facts, fields });
}
// the five energy pages
for (const e of ch.energies) {
  const pairKey = e.pairKey; const cell = J(`ELEMENT_PAIR/${pairKey}.json`); const [core, en] = pairKey.split('_').map((h) => EL_OF_HZ[h]); const fn = relation(core, en)[1]; const self = core === en;
  const pole = e.pole === 'none' ? 'catalyst' : e.pole; const stateIsTurn = ['catalyst_turn', 'friction_turn'].includes(e.state); const carryPole = stateIsTurn ? pole : e.state;
  const useYin = yin && (cell.mechanism_yin || cell.carry_yin); const mech = useYin ? { ...cell.mechanism, ...(cell.mechanism_yin || {}) } : cell.mechanism; const carry = useYin ? Object.fromEntries([...new Set([...Object.keys(cell.carry || {}), ...Object.keys(cell.carry_yin || {})])].map((k) => [k, { ...(cell.carry?.[k] || {}), ...(cell.carry_yin?.[k] || {}) }])) : cell.carry;
  const fields = {}; const redact = [];
  fields['mechanism.base'] = { spec: spec({ card: 'ELEMENT_PAIR.mechanism.base', min: 45, max: 75, element: en, person: 'fully third person, no "you", no function claim, no persona', chemistry: `the field carries one word of the pair's chemistry somewhere in it: ${en}'s material or ${core}'s (an arena noun, its verb, or either element as a common noun); the gate blocks without it` }), value: red(mech.base) }; redact.push('mechanism.base');
  if (stateIsTurn) { fields[`mechanism.${pole}_turn`] = { spec: spec({ card: 'ELEMENT_PAIR.mechanism.catalyst_turn', min: 12, max: 35, element: en, notes: `opens on a plain statement of the state in the reader's terms (${en} named, its volume in ordinary words, the reference lead-in "${pole === 'catalyst' ? `With too little ${en}, …` : `With too much ${en}, …`}" or any plain statement, never "Run thin," or "Run heavy,"), then the elemental image of the state in one clause that stands alone, what it costs, then ONE plain directive that stands alone, the carry line below is cut from the image clause` }), value: red(mech[`${pole}_turn`]) }; redact.push(`mechanism.${pole}_turn`); }
  const cp = carry[carryPole]; if (cp) { const D = { catalyst: 'cut from the catalyst turn above: its first clause and its own directive', friction: 'cut from the friction turn above: its first clause and its own directive', wide: `${en} is wanted and abundant: the plentiful line, opening with one of the eight wide openers, no door metaphor; the remedy tells the reader to use it`, missing: `${en} wanted and absent: borrow it`, spared: `${en} unwanted and absent: absent and better so`, thin: `${en} unwanted at ≤10%: kept small`, excess: `${en} dominant: the cell's excess idiom in English, never quoted`, unrooted: 'the core at 0%' }; fields[`carry.${carryPole}`] = { spec: spec({ card: 'ELEMENT_PAIR.carry', renders: stateIsTurn ? 'P4 carry card' : 'P4 carry card and the energy page state line', clause: { min: 4, max: 18 }, remedy: { min: 2, max: 12 }, ...(carryPole === 'wide' ? { openers: WIDE_OPENERS.map((o) => o.replace('{Element}', en)) } : {}), cut_from: stateIsTurn ? `mechanism.${pole}_turn` : null, notes: D[carryPole] }), value: { clause: red(cp.clause), remedy: red(cp.remedy) } }; redact.push(`carry.${carryPole}`); }
  fields[`function.definition_${pole}`] = { spec: spec({ card: 'ELEMENT_PAIR.function.definition_catalyst', min: 20, max: 55, element: en, chemistry: `the field carries one word of the pair's chemistry anywhere in it, ${en}'s material or ${core}'s (an arena noun or the material's verb: flows, grows, burns, holds, cuts, matched as word stems)${self ? ", or the body's own material (sleep, food, recovery, stamina, muscle, breath, rest)" : ''}; the element's name in the opener does not count; the gate blocks without it`, person: 'second person', opener: self ? `${en} is your Body, and running ${pole === 'catalyst' ? 'thin' : 'over'}, it is` : `${en} is your ${fn}, and as a ${pole}, it is`, notes: `a concrete-life inventory of what the function does when it ${pole === 'catalyst' ? 'runs right' : 'overgrows'}${fn === 'Order' && pole === 'friction' ? '; carries the inner-judge sentence (the pressure ends up turned on yourself)' : ''}` }), value: red(cell.function[`definition_${pole}`]) }; redact.push(`function.definition_${pole}`);
  // ledger rows shown
  const rowCells = {};
  e.fnRows.forEach((r, i) => { const egKey = `${e.hz}_${r.god}`; const eg = J(`ELEMENT_GOD/${egKey}.json`); const led = eg.fn_reading?.[pole]?.ledger || []; const idx = led.findIndex((x) => x.word === r.word); if (idx < 0) return; (rowCells[egKey] = rowCells[egKey] || []).push(idx); const godc = J('GOD/' + ({ '比肩': 'bijian', '劫财': 'jiecai', '食神': 'shishen', '伤官': 'shangguan', '偏财': 'piancai', '正财': 'zhengcai', '七杀': 'qisha', '正官': 'zhengguan', '偏印': 'pianyin', '正印': 'zhengyin' })[r.god] + '.json'); fields[`ledger[${i}]`] = { spec: spec({ card: 'ELEMENT_GOD.fn_reading', cell: egKey, persona: `${godc.persona_name} (${r.god})`, domains: godc.domains, pole, row: idx, angle: r.angle, ...(r.door === 'scene' ? { candidates: 2 } : {}), word: { min: 1, max: 3, notes: 'the chip: the persona\'s classical portrait textured by the element, high-school vocabulary, reads as a ' + (pole === 'catalyst' ? 'gift' : 'cost') + ' alone, distinct from the other rows and from the sibling cell\'s chips' }, text: { min: 35, max: 55, angle: r.angle, cost_domain: 'the cost domain (owner 2026-09-29, re-cut 2026-10-01): name the cost in what the persona rules (its three domain words) or in ordinary life: home, money, friends, family, the body, food, rest. Work is one domain among many, never the default. The cost is placed by its noun, not by an object; any object that survives stays at a size the reader can recognise as their own (one venture, one city, a page a day), and a boast on the reader\'s behalf is not lawful. This persona rules ' + godc.domains.join(', ') + '.', notes: { drive: 'THE DRIVE (key drive): opens on a flat claim of the drive as a fact of how the reader is built, states the mechanism from the chart\'s supply, names the either-or in the second person, lands briefly on the drive\'s own price; the screenshot passage', cost_self: 'THE COST TO THE READER (key cost_self): opens on the drive, names the either-or, and spends its last two sentences on what the drive costs the reader, a difficulty, a need or a price, comparative where it helps, never an event and never a picture', cost_others: 'THE COST TO OTHERS (key cost_others): opens on the drive as the reader\'s own act, names the either-or, and lands on what that act takes from the people in the persona\'s domain, stated as a fact of the reader\'s drive, never as what those people say, think or decide, never a chorus' }[r.angle], law: 'One row, one tension, three angles (owner 2026-09-30 and 2026-10-01). Every passage: a flat claim about the reader, the mechanism stated flat from the chart\'s supply, the either-or in the reader\'s second person, the cost from this angle. No passage opens on a picture, a moment or other people; a picture is permitted where it sharpens the tension and never required; no clock time, no place, no narration, no claimed memory (a time or place stamp is blocked by the gate); no aphorism close by default. The gate notes a passage with no tension sentence (two clauses in the second person joined by or, but, yet, while, or whether … or not) and a first sentence carrying an object noun outside this persona\'s domain words; the read decides.' } }), value: { word: red(r.word), text: red(led[idx].angles[r.angle]) } }; });
  fields[`function.advise_${pole}`] = { spec: spec({ card: 'ELEMENT_PAIR.function.advise_catalyst', min: 20, max: 60, person: 'second person, imperatives allowed', ...(pole === 'friction' ? { cure_set: cureSet(pairKey) } : {}), remedy_verb: remedyVerb(pairKey, pole), remedy_gloss: `${remedyVerb(pairKey, pole)}: ${REMEDY_GLOSS[remedyVerb(pairKey, pole)]} (the band's remedy verb, REA_02 §5c; this chart's band is ${ch.bandTerm}${e.excess ? ', and the excess override applies to this energy: the carry.excess line speaks it, the advice keeps the template-level verb' : ''})`, notes: `one sentence naming the psychological truth under the state, every action in the remedy verb's shape, then small actions with objects and cadences from the family's ruled domains or ordinary life (work only where a domain word is work), ${pole === 'friction' ? 'two, closing on the energy prescription in the energy-manual register (owner 2026-09-29, the beat re-cut 2026-09-30): "Seek {Element}, the {Function} energy. {Element} {is or does, in its own material, two clauses}. Let it {spend / hold / shape} what {the overgrown element} {stores / pours / burns}." The energy is the subject, a material the reader can hold and use, no life action inside the beat; the element must be in cure_set, never one that feeds this friction; the gate blocks without the "Seek {Element}, the {Function} energy" form' : 'three or four, ending on the smallest'}; no metaphor stacking; no prescription of investments, careers or medical acts; never a guarantee` }), value: red(cell.function[`advise_${pole}`]) }; redact.push(`function.advise_${pole}`);
  fields['cta_verdict'] = { spec: spec({ card: 'ELEMENT_PAIR.cta_verdict', min: 8, max: 30, sentences: 1, candidates: 2, person: 'second person', pole_neutral: `one verdict per pair, rendered on this page whichever pole the chart shows (this chart shows the ${pole} pole; the other chart shows the other), so it must read true on both: what ${en} as your ${fn} IS, never its state, no heavy, thin, too much, too little, running over, running short`, notes: `explains "${en} is your ${fn}": a behavioural truth plus ONE tendency-framed consequence beat, true on either pole` }), value: red(cell.cta_verdict) }; redact.push('cta_verdict');
  let facts = pairCellFacts(pairKey, { redact: blind ? redact.map((p) => useYin && (p.startsWith('mechanism.') || p.startsWith('carry.')) && (cell.mechanism_yin?.[p.split('.')[1]] || cell.carry_yin?.[p.split('.')[1]]) ? p.replace('mechanism.', 'mechanism_yin.').replace('carry.', 'carry_yin.') : p) : [], yin });
  for (const [egKey, rows] of Object.entries(rowCells)) facts += '\n\n' + egCellFacts(egKey, { redact: blind ? ['adj_chips', 'fn_reading'] : [], pole, rows });
  facts += `\n\nChart: ${ch.label}. ${en} runs ${e.presence}%: ${e.role}, ${e.volume}${e.excess ? ', the excess override applies' : ''}. The page shows the ${pole} pole; its state line is ${stateIsTurn ? `the ${pole} turn` : `the carry.${e.state} line`}. Ledger rows shown: ${e.fnRows.map((r, i) => `row ${i} ${r.god} · the ${r.angle} passage`).join(', ')} (one angle per row, rotating drive · cost_self · cost_others: the drive, the cost to the reader, the cost to others).`;
  applyTargets(`energy.${pairKey}.json`, fields); skeletons.push({ file: `energy.${pairKey}.json`, cell: `ELEMENT_PAIR/${pairKey}` + (Object.keys(rowCells).length ? ' + ELEMENT_GOD/' + Object.keys(rowCells).join(', ') : ''), page: `The energy page of ${en} (your ${fn}) for a ${core} core, ${pole} pole`, read: ['prompts/04_READING_SYSTEM_PRIMER.md', 'prompts/00_MASTER_PROMPT.md', 'cards/ELEMENT_PAIR.mechanism.base.md', 'cards/ELEMENT_PAIR.mechanism.catalyst_turn.md', 'cards/ELEMENT_PAIR.carry.md', 'cards/ELEMENT_PAIR.function.definition_catalyst.md', 'cards/ELEMENT_GOD.adj_chips.md', 'cards/ELEMENT_GOD.fn_reading.md', 'cards/ELEMENT_PAIR.function.advise_catalyst.md', 'cards/ELEMENT_PAIR.cta_verdict.md'], facts, fields });
}
// ── write skeletons (+ the filled originals for the gate self-test and the benchmarked pass) ──
let nFields = 0;
for (const sk of skeletons) {
  const filled = JSON.parse(JSON.stringify(sk)); // originals as filled (values before redaction)
  const out = { _handoff: `${today} ${stemFile} ${chartId} ${pass}`, _instructions: 'Fill every "value" (strings, or the objects with the keys shown). Where a spec says "candidates": 2, add "value_b" beside "value" with a second, different candidate of the same shape (two lines, each inside the frame; the read picks one). Keep every other key byte-identical. You may add "_trace" beside any "value" holding one clause on the mechanism you cut it from. Return this file with the same name.', cell: sk.cell, page: sk.page, stem, read_first: sk.read, facts: sk.facts, fields: sk.fields };
  fs.writeFileSync(OUTDIR + 'skeletons/' + sk.file, JSON.stringify(out, null, 1)); nFields += Object.keys(sk.fields).length;
  benchmark[sk.file] = out; // values are unredacted only when pass=benchmarked
}
// the originals, always (for the template gate's self-test), from a fresh unredacted build
if (blind) { const orig = JSON.parse(execSync(`node ${path.resolve('handoff.mjs')} --chart ${chartId} --pass benchmarked --out ${OUTDIR}_orig-tmp --json-only`, { cwd: path.dirname(new URL(import.meta.url).pathname) }).toString()); for (const [f, o] of Object.entries(orig)) fs.writeFileSync(OUTDIR + 'benchmark/' + f.replace(/\.json$/, '.original.json'), JSON.stringify(o, null, 1)); fs.rmSync(OUTDIR + '_orig-tmp', { recursive: true, force: true }); }
else for (const [f, o] of Object.entries(benchmark)) fs.writeFileSync(OUTDIR + 'benchmark/' + f.replace(/\.json$/, '.original.json'), JSON.stringify(o, null, 1));
if (argv.includes('--json-only')) { console.log(JSON.stringify(benchmark)); fs.rmSync(OUTDIR, { recursive: true, force: true }); process.exit(0); }
if (blind) fs.writeFileSync(OUTDIR + 'benchmark/README.md', 'The current shipping text, filled into the same skeletons. NOT for the model in the blind pass: it is the harness\'s self-test input and the reviewer\'s side-by-side. Do not attach this folder to the blind conversation.\n');
// ── copies: the prompt database, the cards in scope, the chart ──
for (const f of fs.readdirSync(PROMPTS).filter((x) => x.endsWith('.md'))) fs.copyFileSync(PROMPTS + f, OUTDIR + 'prompts/' + f);
const cardsInScope = [...new Set(skeletons.flatMap((s) => s.read.filter((r) => r.startsWith('cards/')).map((r) => r.slice(6, -3))))];
for (const k of cardsInScope) fs.copyFileSync(`${PROMPTS}fields/${k.split('.')[0]}/${k}.md`, `${OUTDIR}cards/${k}.md`);
fs.writeFileSync(OUTDIR + 'chart/' + chartId + '.json', JSON.stringify(ch, null, 1)); fs.writeFileSync(OUTDIR + 'chart/' + chartId + '.md', '# The chart, every variable, from the one calculation model\n\n```\n' + describeChart(ch) + '\n```\n\nSource: `Elementum_App/src/engine/calculator.js` → `buildEnergyChart` → the journey model, read back by `ComparativeAnalysis/Prompts/chart.mjs`. Nothing about this chart comes from anywhere else.\n');
if (targeted) fs.writeFileSync(OUTDIR + 'targets.json', JSON.stringify(targets, null, 1)); // the operator's targets travel with the package
// ── the dispatch prompt and the README ──
const files = skeletons.map((s) => `skeletons/${s.file}`);
const dispatch = `# DISPATCH · Elementum reading, ${stem} ${meta.name}, chart ${chartId} · ${pass} pass

You are writing the reading text for one person's chart in Elementum, a BaZi reading app in English, from a system you have never seen. Everything you need is in the attached folder. Use only the attached files. Do not use any other source, memory or assumption about BaZi, and do not look anything up.

## Read, in this order

1. \`prompts/04_READING_SYSTEM_PRIMER.md\`: what the product is, who reads it, how a reading is built from a chart.
2. \`prompts/00_MASTER_PROMPT.md\`: the voice, the vocabulary law, what is fixed and what is yours, the check list.
3. \`prompts/05_CLASSICAL_SOURCES.md\`: the reasoning canon. Every claim you write traces to it through the chart.
4. \`prompts/06_CAPS_BY_PAGE.md\`: the word range of every field, both ends hard.
5. \`prompts/02_RULES_REGISTER.md\`: every rule, numbered, with its source (reference; the master prompt already states them).
6. \`chart/${chartId}.md\`: the chart, every variable, from the engine. The numbers, roles, volumes and states are facts; you never change or re-derive them.
7. The cards in \`cards/\`: one per field type, each with the construct, the reasoning chain, the style, the checks and an exemplar from the shipping corpus.
8. Then the skeletons.

## The task

Fill the ${skeletons.length} skeleton files in \`skeletons/\` (${nFields} fields in all):

${files.map((f) => '- `' + f + '`').join('\n')}

Each skeleton is one page of the reading: the Day Master page, then one energy page per energy. Each carries the page's facts (the cell's other fields, the chemistry, the chart's state for that energy${targeted ? '; the fields under test are redacted, and some carry a `target`: the one axis your line must beat the current line on, with one sentence on where the current line falls short there' : blind ? '; the fields under test are redacted' : '; the current shipping text of every field under test is shown, labelled: it is the bar to beat, and you may not reuse a four-word run of it'}), and one entry per field with a \`spec\` (the card it follows, the word range, the person, the opener where one is required, the notes) and an empty \`value\`.

Work one page at a time, in the order listed. For each field: read its card once, reason from the facts and the canon (state the mechanism to yourself in one clause), write the value, then run the master prompt's check list on it, count the words, and fix anything before moving on. Where a field is cut from another (a carry line from its turn, a chip from its definition), write the source first.

${targeted ? `## The target (this pass)

Some fields carry a \`target\` in their spec: an \`axis\` (tension · cost · vocabulary · four-question) and a \`beat\`, one sentence on what the current line fails on that axis. The current line itself is withheld, and you will never see it. Write the field to beat the target on that one axis while keeping every other rule of the card; do not guess at the withheld line, do not write around it, and do not try to reconstruct it. A field with no target is written as in the blind pass. Your lines are checked for any four-word run shared with the withheld line, so a paraphrase of what you imagine it says gains nothing.

` : ''}## The output contract

- Return each skeleton as a file with the same name, every \`value\` filled, every other key byte-identical, and one line added at the very top of each file: \`"_generated_by": "<your model name and version, exactly as your vendor names it>"\`. Your work is filed as a station under \`Reading/Database/Rewrites/<that name>/\`, by axis and by variable, beside the current text and its gate result; a field is adopted into the final templates only by the owner's ruling, so the name must be right and the same in all six files. Strings stay strings; the objects (\`{phrase, dim, desc}\`, \`{clause, remedy}\`, \`{word, text}\`) keep exactly those keys. Where a spec says \`"candidates": 2\` (the manifesto, the presence line, the verdict, a scene door), return \`"value_b"\` beside \`"value"\`: a second, different candidate, not a variation of the first; both are gated, and a missing second candidate throws the field out.
- You may add \`"_trace"\` beside any \`value\`: one clause naming the mechanism you cut the line from. Nothing else may be added.
- No commentary outside the files. No code fences inside the JSON. No Chinese characters in any value. No em-dash, semicolon or arrow in any value.
- Word counts are gated before anyone reads your work: a value outside its range is thrown out unread, whatever its quality. Count.

## What is yours

Sentence shapes, figures of speech, storytelling, the scene you build, the expressions you reach for. Be as inventive as you like inside the fixed frame, as long as an intermediate English reader (CEFR B1–B2) understands the line on the first pass, the words stay in the zone, and each line would survive the three readers named in the primer. The current version is the bar; the goal is a reading the target reader would screenshot as themselves and a tradition-raised reader would not wince at.

## Where the truth lives (for reference only; not attached)

The four source books are in the repository at \`Reading/Documents/REA_01_Archetype_System.md\`, \`REA_02_Concept_Dictionary.md\`, \`REA_04_Knowledge_Pool.md\` and \`REA_16_The_Voice.md\`; the current reading content is the station at \`Reading/Database/templates/by_axis/json/\`. The attached prompts govern for this run.

Start with \`prompts/04_READING_SYSTEM_PRIMER.md\`.
`;
fs.writeFileSync(OUTDIR + '00_DISPATCH_PROMPT.md', dispatch);
fs.writeFileSync(OUTDIR + 'README.md', `# Handoff · ${stem} ${meta.name} · chart ${chartId} · ${pass} pass · built ${today}

Attach this folder's files to a fresh conversation (no memory, no custom instructions) and paste \`00_DISPATCH_PROMPT.md\` as the message. ${targeted ? 'Do NOT attach `benchmark/`: the targeted pass withholds the current text and hands the model one axis to beat per field (`target` in the spec, from `targets.json`); the folder is the harness\'s reuse-check input.' : blind ? 'Do NOT attach `benchmark/`: it holds the current shipping text for the harness self-test and the reviewer\'s side-by-side.' : 'The `benchmark/` folder holds the current shipping text and is part of this pass.'}

| Folder | Contents |
|---|---|
| \`00_DISPATCH_PROMPT.md\` | the one message to paste |
| \`prompts/\` | the prompt database verbatim: primer · master prompt · input pack · rules register · comparison protocol · classical sources · caps by page |
| \`cards/\` | the ${cardsInScope.length} field cards in scope |
| \`chart/\` | the chart, every variable, from the engine (json + readable) |
| \`skeletons/\` | the ${skeletons.length} pages to fill (${nFields} fields) |
| \`benchmark/\` | the current text in the same skeletons (${blind ? 'harness only' + (targeted ? ', the reuse check: run validate-template.mjs with --against on it' : '') : 'shown to the model in this pass'}) |${targeted ? `\n| \`targets.json\` | the operator's targets for this round, one axis and one beat per named field (copied into the package root) |` : ''}

When the filled files come back: check each carries \`_generated_by\`, then save them as \`ComparativeAnalysis/Prompts/out/handoff/${today}-${stemFile}-${chartId}-${pass}/<model>/<file>\` and run, in order: \`node validate-template.mjs <dir>${targeted ? ' --against <this folder>/benchmark' : ''}\` (the gate${targeted ? ', with the reuse check against the withheld lines' : ''}) · \`node file-rewrites.mjs <dir>\` (and \`--candidate b\` for the second candidates, filed as \`<model>-b\`) (files the work as a rewrite station under \`Reading/Database/Rewrites/<model>/\`, by axis and by variable) · \`node render-template.mjs <dir> --against <benchmark dir>\` (the page-by-page read) · the owner's ruling per field · \`node adopt.mjs <model> <AXIS>/<cell> <field>\` for every adopted field (lands it in the final template station with provenance, then the REA_05 pipeline).

Generated by \`ComparativeAnalysis/Prompts/handoff.mjs\` at REA_17 v0.6, prompt database of ${today}.
`);
const zip = OUTDIR.replace(/\/$/, '') + '.zip'; fs.rmSync(zip, { force: true });
execSync(`cd "${path.dirname(OUTDIR.replace(/\/$/, ''))}" && zip -qr "${zip}" "${path.basename(OUTDIR.replace(/\/$/, ''))}"${blind ? ' -x "*/benchmark/*"' : ''}`);
console.log(`${skeletons.length} skeletons, ${nFields} fields, ${cardsInScope.length} cards → ${OUTDIR}\nzip → ${zip}`);
