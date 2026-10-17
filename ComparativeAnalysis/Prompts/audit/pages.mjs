// THE PAGE ASSEMBLER (REA_20 §4 step 2): build every page of a reading surface as the reader sees it,
// from the live content modules, so an audit reads pages, not fields.
//
//   node audit/pages.mjs --surface function --out <dir>        pages/<group>.md (for reading) + pages.json (for the checks)
//   node audit/pages.mjs --list                                the surfaces this assembler knows
//
// A surface is an assembler in SURFACES below. Its contract: return an array of pages
//   { id, group, title, sections: [{ head, sub, key, text }], exempt: [words exempt from the repetition count] }
// where `key` is the station address of the section's text, written as
//   K2 <cell> · <dotted path under candidates>   (ELEMENT_GOD)
//   PAIR <cell> · <dotted path under candidates> (ELEMENT_PAIR)
// so a finding quotes it and audit/apply-fixes.mjs can write a fix back. To audit a new surface
// (the element page, the domains, a future reading type), add an assembler that meets the contract.
import fs from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../..') + '/';
const A = ROOT + 'Elementum_App/src/content/';
const argv = process.argv.slice(2); const opt = (n) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : undefined; };

const EL = ['木', '火', '土', '金', '水']; const EN = { 木: 'Wood', 火: 'Fire', 土: 'Earth', 金: 'Metal', 水: 'Water' };
const GEN = { 木: '火', 火: '土', 土: '金', 金: '水', 水: '木' }; const CTRL = { 木: '土', 土: '水', 水: '火', 火: '金', 金: '木' };
export const relation = (c, e) => c === e ? 'self' : GEN[c] === e ? 'output' : GEN[e] === c ? 'resource' : CTRL[c] === e ? 'wealth' : 'officer';
const GODS_OF = { self: ['比肩', '劫财'], output: ['食神', '伤官'], wealth: ['偏财', '正财'], officer: ['七杀', '正官'], resource: ['偏印', '正印'] };
const PERSONA = { 比肩: 'The Twin', 劫财: 'The Rival', 食神: 'The Artisan', 伤官: 'The Virtuoso', 偏财: 'The Horizon', 正财: 'The Steward', 七杀: 'The General', 正官: 'The Magistrate', 偏印: 'The Alchemist', 正印: 'The Sage' };
const FN = { self: 'Body', resource: 'Mind', output: 'Expression', wealth: 'Action', officer: 'Order' };
const ANG = ['drive', 'cost_self', 'cost_others'];
const head = (t) => (t.match(/[^.!?]+[.!?]+/g) || []).slice(0, 2).map((x) => x.trim()).join(' ');

// THE FUNCTION PAGE: every pair cell × both poles × (each god as the single face, and the 2+2 blend),
// the order the app renders (journeyData.buildElementScreen): definition, character, keywords, remedy or advice + edge.
async function functionSurface() {
  const { pickBlendRows } = await import(ROOT + 'Elementum_App/src/components/journey/journeyData.js');
  const { K2_CELLS } = await import(A + 'k2.js'); const { PAIR_CELLS } = await import(A + 'pairs.js'); const { FUNCTION_METRICS } = await import(A + 'metrics.js');
  const pages = []; let n = 0;
  for (const el of EL) for (const core of EL) {
    const r = relation(core, el); const [g1, g2] = GODS_OF[r]; const fnName = FN[r]; const p = PAIR_CELLS[`${core}_${el}`].function;
    for (const pole of ['friction', 'catalyst']) for (const [lead, minor] of [[g1, null], [g2, null], [g1, g2]]) {
      const L = K2_CELLS[`${el}_${lead}`]; const M = minor ? K2_CELLS[`${el}_${minor}`] : null;
      // the keywords as the app picks them (M4: a 2+2 page never sets a keyword beside its opposite)
      const picked = minor ? pickBlendRows(L.fnReading[pole].ledger, M.fnReading[pole].ledger, 2, lead, minor) : L.fnReading[pole].ledger.map((x) => ({ ...x, god: lead }));
      const rows = picked.map((x) => [x, x.god, (x.god === lead ? L : M).fnReading[pole].ledger.findIndex((y) => y.word === x.word)]);
      // the definition as the app builds it (M2): the pair's head + the persona's own tail; the 2+2 page reads the shared text
      const tail = minor ? null : L.fnReading[pole].define;
      const def = tail ? { key: `PAIR ${core}_${el} · function.definition_${pole} (sentences 1-2) + K2 ${el}_${lead} · fn_reading.${pole}.define`, text: `${head(p[`definition_${pole}`])} ${tail}` } : { key: `PAIR ${core}_${el} · function.definition_${pole}`, text: p[`definition_${pole}`] };
      const sections = [{ head: 'THE FUNCTION', sub: `${EN[el]} is your ${fnName}.`, ...def },
        { head: 'THE CHARACTER', sub: pole === 'friction' ? 'Friction · Release it.' : 'Catalyst · Grow it.', key: '', text: `Bars: ${(FUNCTION_METRICS[fnName]?.bars || []).map((b) => b.label).join(' · ')}`, nonProse: true }];
      rows.forEach(([x, g, ri], i) => sections.push({ head: `KEYWORD · ${x.word}`, sub: `(${PERSONA[g]}, ${ANG[i % 3]})`, key: `K2 ${el}_${g} · fn_reading.${pole}.ledger[${ri}].angles.${ANG[i % 3]}`, text: x.angles[ANG[i % 3]] }));
      if (pole === 'friction') sections.push({ head: 'THE REMEDY', sub: '', key: `PAIR ${core}_${el} · function.advise_friction`, text: p.advise_friction });
      else { sections.push({ head: 'THE ADVICE', sub: '', key: `PAIR ${core}_${el} · function.advise_catalyst`, text: p.advise_catalyst }); if (L.edge) sections.push({ head: 'THE EDGE', sub: L.edge.domains.join(' · '), key: `K2 ${el}_${lead} · edge.lead`, text: L.edge.lead }); }
      n++; pages.push({ id: `P${String(n).padStart(3, '0')}`, group: EN[el].toLowerCase(), title: `${EN[core]} core · ${EN[el]} page · ${pole} · ${minor ? `blend ${PERSONA[lead]}+${PERSONA[minor]} (2+2)` : PERSONA[lead]}`,
        sections, exempt: [...rows.map(([x]) => x.word), EN[el], fnName, ...Object.values(EN)] });
    }
  }
  // the Balanced chart (bug check S5, owner M2): verdict "Keep the mix.", the pair's balanced text, the catalyst keywords
  for (const el of EL) for (const core of EL) {
    const r = relation(core, el); const [g1] = GODS_OF[r]; const fnName = FN[r]; const p = PAIR_CELLS[`${core}_${el}`].function; const L = K2_CELLS[`${el}_${g1}`];
    if (!p.definition_balanced) continue;
    const sections = [{ head: 'THE FUNCTION', sub: `${EN[el]} is your ${fnName}.`, key: `PAIR ${core}_${el} · function.definition_balanced`, text: p.definition_balanced },
      { head: 'THE CHARACTER', sub: 'Balanced · Keep the mix.', key: '', text: `Bars: ${(FUNCTION_METRICS[fnName]?.bars || []).map((b) => b.label).join(' · ')}`, nonProse: true }];
    L.fnReading.catalyst.ledger.forEach((x, i) => sections.push({ head: `KEYWORD · ${x.word}`, sub: `(${PERSONA[g1]}, ${ANG[i % 3]})`, key: `K2 ${el}_${g1} · fn_reading.catalyst.ledger[${i}].angles.${ANG[i % 3]}`, text: x.angles[ANG[i % 3]] }));
    sections.push(p.advise_balanced ? { head: 'THE ADVICE', sub: '', key: `PAIR ${core}_${el} · function.advise_balanced`, text: p.advise_balanced } : { head: 'THE ADVICE', sub: '', key: `PAIR ${core}_${el} · function.advise_catalyst`, text: p.advise_catalyst }); if (L.edge) sections.push({ head: 'THE EDGE', sub: L.edge.domains.join(' · '), key: `K2 ${el}_${g1} · edge.lead`, text: L.edge.lead });
    n++; pages.push({ id: `P${String(n).padStart(3, '0')}`, group: EN[el].toLowerCase(), title: `${EN[core]} core · ${EN[el]} page · balanced chart · ${PERSONA[g1]}`, sections, exempt: [...L.fnReading.catalyst.ledger.map((x) => x.word), EN[el], fnName, ...Object.values(EN)] });
  }
  return pages;
}

export const SURFACES = { function: { describe: 'the function page: definition, character, metric bars, keywords, remedy or advice and edge (150 compositions + 25 Balanced-chart pages)', build: functionSurface } };

export function toMarkdown(pages, group) {
  const parts = [`# ${group} · pages as read`, ''];
  for (const pg of pages) {
    parts.push(`## ${pg.id} · ${pg.title}`, '');
    for (const s of pg.sections) parts.push(`**${s.head}**${s.sub ? ' ' + s.sub : ''}${s.key ? ` [${s.key}]` : ''}\n${s.text}\n`);
    if (pg.check) parts.push(`_Compound check: ${pg.check.summary}_`, '');
  }
  return parts.join('\n');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  if (argv.includes('--list')) { for (const [k, v] of Object.entries(SURFACES)) console.log(`${k}: ${v.describe}`); process.exit(0); }
  const surface = opt('surface'); const out = opt('out'); if (!SURFACES[surface] || !out) { console.log('usage: node audit/pages.mjs --surface <name> --out <dir>   (--list for surfaces)'); process.exit(2); }
  const pages = await SURFACES[surface].build();
  const { checkPages } = await import('./page-check.mjs'); checkPages(pages);
  fs.mkdirSync(out + '/pages', { recursive: true }); fs.writeFileSync(out + '/pages.json', JSON.stringify(pages, null, 1));
  for (const g of [...new Set(pages.map((p) => p.group))]) fs.writeFileSync(`${out}/pages/${g}.md`, toMarkdown(pages.filter((p) => p.group === g), g));
  console.log(`${pages.length} pages of "${surface}" → ${out}/pages/*.md and pages.json`);
}
