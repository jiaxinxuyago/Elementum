// THE PICK SYNTHESIZER: assembles the owner's blind-read picks into filled skeletons for a north-star station (then: node file-rewrites.mjs <out dir> --model owner-northstar).
// Synthesize the owner's 54 picks into filled skeletons for a north-star station.
import fs from 'node:fs';
import path from 'node:path';
const ROOT = '/home/user/Elementum/';
const S = ROOT + 'Reading/Database/templates/by_axis/json/';
const E = ROOT + 'ComparativeAnalysis/Evaluations/handoff-geng-golden-2026-09-23/owner-read/';
const BLIND = ROOT + 'ComparativeAnalysis/Prompts/out/handoff/2026-09-23-geng-golden-blind/codex-blind/';
const BENCH = ROOT + 'ComparativeAnalysis/Prompts/out/handoff/2026-09-23-geng-golden-benchmarked/codex/';
const OUT = ROOT + 'ComparativeAnalysis/Prompts/out/handoff/2026-09-29-geng-golden-northstar/owner-northstar/';
const MODEL = 'owner-northstar';
const strip = (o) => Array.isArray(o) ? o.map(strip) : (o && typeof o === 'object') ? Object.fromEntries(Object.keys(o).filter((k) => !k.startsWith('__ore')).map((k) => [k, strip(o[k])])) : o;
const J = (p) => strip(JSON.parse(fs.readFileSync(S + p, 'utf8')).candidates);
const get = (o, p) => p.replace(/\[(\d+)\]/g, '.$1').split('.').reduce((v, k) => v?.[k], o);
const deck = JSON.parse(fs.readFileSync(E + 'deck.json'));
const picks = JSON.parse(fs.readFileSync(E + 'picks.json'));
const key = JSON.parse(fs.readFileSync(E + 'key.json'));
const load = (dir) => Object.fromEntries(fs.readdirSync(dir).filter((f) => f.endsWith('.json') && !f.endsWith('.gate.json')).map((f) => [f.replace(/\.json$/, ''), JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'))]));
const blind = load(BLIND), bench = load(BENCH);
function original(sk, fp, spec) {
  const stemFile = (sk.cell.match(/STEM\/(\w+)/) || [])[1]; const band = (sk.cell.match(/STEM_BAND\/\w+?_(\w+)/) || [])[1]; const pair = (sk.cell.match(/ELEMENT_PAIR\/(\S+?)(\s|$)/) || [])[1];
  if (fp === 'manifesto' || fp === 'dm_overview') return J(`STEM/${stemFile}.json`)[fp];
  if (fp.startsWith('band.')) return get(J(`STEM_BAND/${stemFile}_${band}.json`), fp.slice(5));
  const pool = fp.match(/^(gifts|shadows)\[(\d+)\]$/); if (pool) { const o = J(`STEM/${stemFile}.json`)[pool[1]][+pool[2]]; return { phrase: o.phrase, dim: o.dim, desc: o.desc }; }
  if (/^ledger\[\d+\]$/.test(fp)) { const r = get(J(`ELEMENT_GOD/${spec.cell}.json`), `fn_reading.${spec.pole}.ledger[${spec.row}]`); return { word: r.word, text: r.doors[spec.door] }; }
  return get(J(`ELEMENT_PAIR/${pair}.json`), fp);
}
const clean = (v) => (v && typeof v === 'object') ? Object.fromEntries(Object.entries(v).filter(([k]) => k !== '_trace')) : v;
const fmt = (v) => typeof v === 'string' ? v : v.phrase != null ? `phrase: ${v.phrase}  |  dim: ${v.dim}  |  desc: ${v.desc}` : v.word != null ? `word: ${v.word}  |  text: ${v.text}` : `clause: ${v.clause}  |  remedy: ${v.remedy}`;
const sentences = (s) => s.match(/[^.!?]+[.!?]+(\s|$)/g).map((x) => x.trim());
const out = {}; const prov = []; let mismatches = 0;
for (const q of deck) {
  const sk = blind[q.page]; const fld = sk.fields[q.field]; const spec = fld.spec;
  const src = { original: original(sk, q.field, spec), blind: clean(blind[q.page].fields[q.field].value), benchmarked: clean(bench[q.page].fields[q.field].value) };
  // sanity: every option text must match its keyed pile's formatted value
  for (const o of q.options) { const pile = key[q.id][o.letter]; if (fmt(src[pile]) !== o.text) { mismatches++; console.error('MISMATCH', q.id, o.letter, pile, '\n  deck:', o.text.slice(0, 80), '\n  src :', fmt(src[pile]).slice(0, 80)); } }
  const p = picks[q.id]; let value, from, note = p.note || '';
  if (p.pick === 'none') { value = src.original; from = 'original (no pick: all three rejected; held as the original pending backlog item 2)'; }
  else if (p.pick.includes('+')) {
    const [a, b] = p.pick.split('+').map((l) => key[q.id][l]);
    if (q.field.startsWith('carry.')) { value = { clause: src[a].clause, remedy: src[b].remedy }; from = `split: clause ${a}, remedy ${b}`; }
    else { const sa = sentences(src[a]), sb = sentences(src[b]); value = [sa[0], ...sb.slice(1)].join(' '); from = `split: first sentence ${a}, the rest ${b} (owner: "B the first sentence, C the second sentence"; the directive kept with the second pile so the carry cut at Q48 matches)`; }
  } else { from = key[q.id][p.pick]; value = src[from]; }
  (out[q.page] = out[q.page] || {})[q.field] = { spec, value, _trace: `${q.id} · ${from}${note ? ' · owner: ' + note : ''}` };
  prov.push({ id: q.id, page: q.page, field: q.field, label: q.label, from, note, value });
}
if (mismatches) { console.error(mismatches + ' mismatches, stopping'); process.exit(1); }
fs.mkdirSync(OUT, { recursive: true });
for (const [page, fields] of Object.entries(out)) {
  const sk = { ...blind[page] }; sk._generated_by = MODEL; sk._handoff = '2026-09-29 owner blind read synthesis'; sk._instructions = 'SYNTHESIS of the owner\'s 54 blind picks (ComparativeAnalysis/Evaluations/handoff-geng-golden-2026-09-23/owner-read/): every value is the version the owner picked among original, codex-blind and codex-benchmarked; _trace names the question, the pile and the owner\'s note. Not generated by a model.';
  sk.fields = Object.fromEntries(Object.keys(blind[page].fields).map((k) => [k, fields[k]]));
  fs.writeFileSync(OUT + page + '.json', JSON.stringify(sk, null, 2) + '\n');
}
fs.writeFileSync(OUT + 'provenance.json', JSON.stringify(prov, null, 1));
console.log('wrote', Object.keys(out).length, 'pages,', prov.length, 'fields →', OUT);
