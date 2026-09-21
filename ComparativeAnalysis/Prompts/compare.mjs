// The rewrites store and the side-by-side sheet.
// Every model output found for a run (out/<id>.<model>.json) is gated and
// filed under Reading/Database/Rewrites/<model>/<chart>/<id>.json beside its
// original and gate result (the rewrite never touches the station), then a
// side-by-side markdown per variable is written for the read:
//   node compare.mjs runs/<manifest>.json [--id G08.advise.jin-tu.F] [--out <dir>]
// Default --out: ComparativeAnalysis/Evaluations/<run name>/side-by-side/
import fs from 'node:fs';
import path from 'node:path';
import { OUT, ROOT, flat } from './lib.mjs';
import { validate } from './validate.mjs';
import { candidatesFor } from './read-sheet.mjs';
const argv = process.argv.slice(2); const opt = (n, d) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : d; };
const man = JSON.parse(fs.readFileSync(argv[0], 'utf8')); const rows = (man.rows || man).filter((r) => !opt('id') || r.id === opt('id'));
const REW = ROOT + 'Reading/Database/Rewrites/';
const outDir = opt('out', ROOT + `ComparativeAnalysis/Evaluations/${man.name}/side-by-side/`); fs.mkdirSync(outDir, { recursive: true });
const cell = (v) => flat(v).map(([p, t]) => (p ? `**${p}**: ` : '') + String(t).replace(/\|/g, '\\|').replace(/\n/g, ' ')).join('<br>');
let filed = 0, sheets = 0;
for (const r of rows) {
  const meta = JSON.parse(fs.readFileSync(OUT + r.id + '.meta.json', 'utf8')); const chartId = meta.ctx.chart?.id || 'no-chart';
  const cands = candidatesFor(r.id).map((c) => ({ ...c, text: JSON.parse(fs.readFileSync(c.file, 'utf8').trim().replace(/^```(json)?/, '').replace(/```$/, '')), R: validate(r.id, c.file, { quiet: true }) }));
  for (const c of cands) { const { _trace, ...text } = c.text; const dir = `${REW}${c.model}/${chartId}/`; fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(dir + r.id + '.json', JSON.stringify({ id: r.id, field: meta.field, cards: meta.cards, cell: meta.ctx.cell, state: meta.ctx.state || meta.ctx.pole || meta.ctx.band || null, chart: chartId, model: c.model, generatedFrom: `out/${r.id}.prompt.md (REA_17 v${meta.rea17Version})`, original: meta.original, candidate: text, trace: _trace || null, gate: { pass: c.R.pass, blocking: c.R.blocking, readFlags: c.R.readFlags, repInfo: c.R.repInfo, zone: c.R.zone ? { outside: c.R.zone.outside, per100: c.R.zone.per100 } : null }, filedAt: new Date().toISOString() }, null, 1)); filed++; }
  const md = [`# ${r.id} · ${meta.field} · ${meta.ctx.cell}${meta.ctx.pole ? ' · ' + meta.ctx.pole : ''}${meta.ctx.state && meta.ctx.state !== meta.ctx.pole ? ' · ' + meta.ctx.state : ''} · chart ${chartId}`, '', `Cards: ${meta.cards.join(', ')}. Gate per column: pass, or the blocking findings. The original is the shipping station text.`, '', `| | original | ${cands.map((c) => c.model).join(' | ')} |`, `|---|---|${cands.map(() => '---').join('|')}|`, `| text | ${cell(meta.original)} | ${cands.map((c) => cell(Object.fromEntries(Object.entries(c.text).filter(([k]) => k !== '_trace')))).join(' | ')} |`, `| gate | ${validate(r.id, OUT + r.id + '.original.json', { quiet: true }).pass ? 'pass' : 'FAIL: ' + validate(r.id, OUT + r.id + '.original.json', { quiet: true }).blocking.join('; ').replace(/\|/g, '\\|')} | ${cands.map((c) => c.R.pass ? 'pass' : 'FAIL: ' + c.R.blocking.join('; ').replace(/\|/g, '\\|')).join(' | ')} |`, `| read flags | | ${cands.map((c) => c.R.readFlags.join('; ') || '').join(' | ')} |`, `| trace | | ${cands.map((c) => c.text._trace ? String(JSON.stringify(c.text._trace)).replace(/\|/g, '\\|').slice(0, 600) : '').join(' | ')} |`, '', 'Ruling: ☐ retain original · ☐ adopt ___ · ☐ revise ___ · ☐ unresolved', ''];
  fs.writeFileSync(outDir + r.id + '.md', md.join('\n')); sheets++;
}
console.log(`${filed} rewrite(s) filed under Reading/Database/Rewrites/<model>/ · ${sheets} side-by-side sheet(s) → ${outDir}`);
