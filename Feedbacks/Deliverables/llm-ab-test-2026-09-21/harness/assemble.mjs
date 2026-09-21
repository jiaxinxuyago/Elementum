// Assemble a blind generation prompt from REA_17 + the station for ANY field
// card, cell and state (the six replication tests are presets under --legacy).
//
//   node assemble.mjs <FIELD> <CELL> [--pole catalyst|friction] [--state wide|thin|excess|missing|spared|unrooted]
//                                    [--row 0|1|2] [--band concentrated|balanced|open] [--chart golden|ding-weak|xin-earth]
//                                    [--energy Earth|Wood|…] [--id NAME] [--print]
//   node assemble.mjs --plan [chart…]        what each chart reaches, per field family
//   node assemble.mjs --run <manifest.json>  assemble every row of a run manifest (see runs/)
//   node assemble.mjs --legacy               regenerate T1..T6 exactly as the replication test built them
//   node assemble.mjs --fields               list the field keys and their cards
//
// FIELD is a key of lib.FIELDS (or an alias: STEM.gifts, ELEMENT_PAIR.function.advise_friction,
// ELEMENT_GOD.fn_reading …). CELL is the station key: 庚 or geng (STEM, STEM_BAND with --band),
// 金_土 (ELEMENT_PAIR), 金_正财 (ELEMENT_GOD), zhengcai_day_branch (POSITION), xiao_shen_duo_shi
// (TG_PATTERN). With --chart and --energy the cell, pole and state are read off the chart
// instead of typed (the engine owns the numbers), so a run never guesses a state.
//
// Every prompt is written to out/<id>.prompt.md with out/<id>.meta.json beside it (the field,
// the cell, the state, the chart, the original, the cell's other fields for the four-gram
// check, the checks that apply). validate.mjs reads the meta file; nothing else is needed.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FIELDS, FIELD_ALIASES, OUT, HERE, master, inputPackGeneral, card, rea17Version, STEMS, STEM_OF_FILE, HZ, EL_OF_HZ, J, GOD_FILE, wc, flat } from './lib.mjs';
import { CHARTS, resolveChart, describeChart } from './chart.mjs';

const argv = process.argv.slice(2);
const opt = (name) => { const i = argv.indexOf('--' + name); return i >= 0 ? argv[i + 1] : undefined; };
const flag = (name) => argv.includes('--' + name);
const positional = argv.filter((a, i) => !a.startsWith('--') && !(i > 0 && argv[i - 1].startsWith('--') && !['plan', 'legacy', 'fields', 'print'].includes(argv[i - 1].slice(2))));
fs.mkdirSync(OUT, { recursive: true });

const header = (title) => `# BLIND GENERATION TEST · ${title}\n\nYou are a generator under test. Use ONLY the text in this message. Do not consult any file, tool, memory of this product, or outside source. Return ONLY the JSON value requested at the end, with no commentary, no code fence.\n\n---\n\n`;
const footer = (shape) => `\n\nOutput shape: ${shape}\nYou may add one optional key "_trace" holding your one-clause mechanism statement per item. Return the JSON value only, no commentary, no code fence.`;

// Normalise a cell for its axis: glyph or file for STEM; STEM_BAND accepts 庚 + --band or geng_concentrated.
function resolveCtx(fieldKey, cellArg, o) {
  const spec = FIELDS[fieldKey]; const ctx = { field: fieldKey, axis: spec.axis, pole: o.pole, state: o.state, row: o.row != null ? +o.row : undefined, band: o.band, chart: null };
  if (o.chart) {
    const ch = resolveChart(CHARTS[o.chart] || (() => { throw new Error('unknown chart ' + o.chart); })());
    ctx.chart = { id: ch.id, label: ch.label, stem: ch.stem, band: ch.band, bandTerm: ch.bandTerm, synthetic: ch.synthetic };
    ctx.stem = ch.stem; ctx.band = ctx.band || ch.band; ctx.yin = ch.yin;
    if (o.energy) {
      const e = ch.energies.find((x) => x.el.toLowerCase() === o.energy.toLowerCase()); if (!e) throw new Error('chart has no energy ' + o.energy);
      ctx.energy = { el: e.el, presence: e.presence, role: e.role, volume: e.volume, excess: e.excess, state: e.state, stateSource: e.stateSource, faces: e.faces, leadGod: e.leadGod, fnRows: e.fnRows };
      ctx.pole = ctx.pole || (e.pole === 'none' ? 'catalyst' : e.pole);
      ctx.pairKey = e.pairKey;
      if (spec.axis === 'ELEMENT_PAIR') { ctx.cell = cellArg || e.pairKey; if (fieldKey === 'ELEMENT_PAIR.carry.pole') ctx.state = ctx.state || (['catalyst_turn', 'friction_turn'].includes(e.state) ? ctx.pole : e.state); }
      if (spec.axis === 'ELEMENT_GOD') { ctx.cell = cellArg || `${e.hz}_${o.god || e.leadGod}`; }
    }
    if (spec.axis === 'POSITION' && !cellArg && o.seat) { const p = ch.positions.find((x) => x.slot === o.seat || x.id === o.seat); if (!p) throw new Error('chart has no seat ' + o.seat); ctx.cell = p.id; }
  }
  if (spec.axis === 'STEM' || spec.axis === 'STEM_BAND') {
    const stem = cellArg ? (STEMS[cellArg] ? cellArg : STEM_OF_FILE[cellArg.split('_')[0]]) : ctx.stem; if (!stem) throw new Error('STEM cell needed (glyph or file id)');
    ctx.stem = stem; ctx.yin = STEMS[stem].pol === 'yin';
    if (spec.axis === 'STEM_BAND') { ctx.band = ctx.band || (cellArg && cellArg.includes('_') ? cellArg.split('_')[1] : undefined); if (!ctx.band) throw new Error('STEM_BAND needs --band or a geng_concentrated cell'); ctx.cell = `${STEMS[stem].file}_${ctx.band}`; } else ctx.cell = STEMS[stem].file;
  } else { ctx.cell = ctx.cell || cellArg; if (!ctx.cell) throw new Error('cell needed'); }
  if (spec.axis === 'ELEMENT_PAIR') { const [core] = ctx.cell.split('_').map((h) => EL_OF_HZ[h]); if (o.stem) { ctx.stem = STEMS[o.stem] ? o.stem : STEM_OF_FILE[o.stem]; ctx.yin = STEMS[ctx.stem].pol === 'yin'; } if (ctx.yin == null) ctx.yin = false; if (!ctx.stem) ctx.stem = Object.keys(STEMS).find((s) => STEMS[s].el === core && (STEMS[s].pol === 'yin') === !!ctx.yin); }
  if (spec.axis === 'ELEMENT_GOD') { const c = J(`ELEMENT_GOD/${ctx.cell}.json`); const [hz] = ctx.cell.split('_'); ctx.pairKey = ctx.pairKey || `${HZ[c.dm_element]}_${hz}`; }
  if (['ELEMENT_PAIR.mechanism.turn', 'ELEMENT_PAIR.mechanism.turn+carry', 'ELEMENT_PAIR.function.definition', 'ELEMENT_PAIR.function.advise', 'ELEMENT_GOD.fn_reading.row', 'POSITION.turn'].includes(fieldKey) && !ctx.pole) throw new Error(fieldKey + ' needs --pole catalyst|friction (or --chart with --energy)');
  if (fieldKey === 'ELEMENT_PAIR.carry.pole' && !ctx.state) throw new Error('ELEMENT_PAIR.carry.pole needs --state');
  if (fieldKey === 'ELEMENT_GOD.fn_reading.row' && ctx.row == null) ctx.row = 0;
  return ctx;
}

export function assemble(fieldArg, cellArg, o = {}) {
  const fieldKey = FIELDS[fieldArg] ? fieldArg : FIELD_ALIASES[fieldArg]; if (!fieldKey) throw new Error('unknown field ' + fieldArg + ' (node assemble.mjs --fields)');
  const spec = FIELDS[fieldKey]; const ctx = resolveCtx(fieldKey, cellArg, o);
  const { ask, shape } = spec.task(ctx);
  const cardKeys = spec.cardsFor ? spec.cardsFor(ctx) : spec.cards;
  const original = spec.original(ctx);
  // A card's exemplar that IS the cell under test is withheld, so the test stays blind.
  const withheld = [];
  const cards = cardKeys.map(card).map((text) => { let t = text; for (const [p, v] of flat(original)) { const needle = String(v || ''); if (needle.length >= 20 && /\s/.test(needle) && !/^[一-鿿]+_[一-鿿]+\./.test(needle) && t.includes(needle)) { t = t.split(needle).join('[withheld: this exemplar is the cell under test]'); withheld.push(p); } } return t; }).join('\n\n');
  const chartLine = ctx.chart ? `\n\nChart under test: ${ctx.chart.label}. Band ${ctx.chart.bandTerm}.${ctx.energy ? ` ${ctx.energy.el} runs ${ctx.energy.presence}%: ${ctx.energy.role}, ${ctx.energy.volume}${ctx.energy.excess ? ', the excess override applies' : ''}; the state under test is ${ctx.state || ctx.pole}.` : ''}` : '';
  const title = `${fieldKey} · ${ctx.cell}${ctx.pole ? ' · ' + ctx.pole : ''}${ctx.state && ctx.state !== ctx.pole ? ' · ' + ctx.state : ''}${ctx.row != null ? ' · row ' + ctx.row : ''}${ctx.band && spec.axis === 'STEM_BAND' ? ' · ' + ctx.band : ''}`;
  const prompt = header(title) + master + '\n\n---\n\n' + inputPackGeneral + '\n\n---\n\n## THE FIELD CARD' + (spec.cards.length > 1 ? 'S' : '') + '\n\n' + cards + '\n\n---\n\n' + spec.facts(ctx) + chartLine + '\n\n## TASK\n\n' + ask + footer(shape);
  const id = o.id || [fieldKey.replace(/[^A-Za-z0-9_+.]/g, ''), ctx.cell, ctx.pole, ctx.state && ctx.state !== ctx.pole ? ctx.state : null, ctx.row != null ? 'row' + ctx.row : null, spec.axis === 'STEM_BAND' ? null : ctx.band && ctx.chart ? null : null, ctx.chart ? ctx.chart.id : null].filter(Boolean).join('.');
  const meta = { id, field: fieldKey, cards: cardKeys, exemplarWithheld: withheld, ctx, original, repFields: spec.rep(ctx), repBlock: !!spec.repBlock, swapGram: spec.swapGram || null, zone: !!spec.zone, zoneBlock: !!spec.zoneBlock, shape, promptWords: wc(prompt), rea17Version, assembledAt: new Date().toISOString() };
  return { id, prompt, meta };
}
export function write({ id, prompt, meta }) { fs.writeFileSync(OUT + id + '.prompt.md', prompt); fs.writeFileSync(OUT + id + '.meta.json', JSON.stringify(meta, null, 1)); console.log(`${id}: ${meta.promptWords} words → out/${id}.prompt.md (+ .meta.json)${meta.exemplarWithheld?.length ? ' · exemplar withheld (' + meta.exemplarWithheld.join(', ') + ')' : ''}`); return id; }

// The six replication tests, as the old assemble built them (ids kept).
export const LEGACY = {
  T1: ['STEM.gifts+shadows', '丙', {}], T2: ['ELEMENT_PAIR.mechanism.turn+carry', '木_水', { pole: 'friction' }], T3: ['ELEMENT_GOD.fn_reading.row', '水_食神', { pole: 'catalyst', row: 0 }],
  T4: ['POSITION.reading+teaser+domain_readings', 'zhengcai_day_branch', {}], T5: ['STEM_BAND.yourNature_desc+self_card', '癸', { band: 'open' }], T6: ['ELEMENT_GOD.k2_domain_readings', '土_正财', {}],
};

if (fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  if (flag('fields')) { for (const [k, v] of Object.entries(FIELDS)) console.log(k.padEnd(44), v.axis.padEnd(13), v.cards.join(' + '), v.zone ? ' [reader zone]' : '', v.repBlock ? ' [rep-block]' : ''); console.log('\naliases:', Object.keys(FIELD_ALIASES).join(', ')); }
  else if (flag('plan')) { const ids = positional.length ? positional : Object.keys(CHARTS); for (const id of ids) console.log(describeChart(resolveChart(CHARTS[id])) + '\n'); }
  else if (flag('legacy')) { const originals = {}; for (const [id, [f, c, o]] of Object.entries(LEGACY)) { const a = assemble(f, c, { ...o, id }); write(a); originals[id] = a.meta.original; } fs.writeFileSync(OUT + 'originals.json', JSON.stringify(originals, null, 1)); console.log('originals.json rewritten'); }
  else if (opt('run')) { const man = JSON.parse(fs.readFileSync(opt('run'), 'utf8')); const rows = man.rows || man; for (const r of rows) { const a = assemble(r.field, r.cell, r); write(a); } console.log(`${rows.length} prompts assembled from ${opt('run')}`); }
  else {
    const [fieldArg, cellArg] = positional; if (!fieldArg) { console.log(fs.readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').filter((l) => l.startsWith('//')).slice(0, 20).join('\n')); process.exit(0); }
    const a = assemble(fieldArg, cellArg, { pole: opt('pole'), state: opt('state'), row: opt('row'), band: opt('band'), chart: opt('chart'), energy: opt('energy'), god: opt('god'), seat: opt('seat'), stem: opt('stem'), id: opt('id') });
    if (flag('print')) console.log(a.prompt); else write(a);
  }
}
