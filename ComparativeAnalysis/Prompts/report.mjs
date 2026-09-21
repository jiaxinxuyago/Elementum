// Render a run's results as the dated markdown the owner reads cold: one row
// per candidate (field path · cell · state · model · original · candidate ·
// gate · read notes · status) and a summary table per model. Read notes and
// statuses come from a scores file the reader fills after the blind sheet
// (scores.json: { "<id>": { "<model>": { meaning, reasoning, reading, scope,
// readers, notes, status } } }); a missing entry renders as "unread".
//   node report.mjs runs/<manifest>.json --scores <scores.json> --out <report.md>
import fs from 'node:fs';
import { OUT, flat } from './lib.mjs';
import { validate } from './validate.mjs';
import { candidatesFor } from './read-sheet.mjs';
const argv = process.argv.slice(2); const opt = (n, d) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : d; };
const man = JSON.parse(fs.readFileSync(argv[0], 'utf8')); const rows = man.rows || man;
const scores = opt('scores') && fs.existsSync(opt('scores')) ? JSON.parse(fs.readFileSync(opt('scores'), 'utf8')) : {};
const one = (v) => flat(v).map(([p, t]) => (p ? `**${p}**: ` : '') + String(t).replace(/\|/g, '\\|').replace(/\n/g, ' ')).join(' · ');
const md = [`# Run ${man.name}`, '', man.note || '', '', `Rendered ${new Date().toISOString().slice(0, 16).replace('T', ' ')}. Gate = shape · mechanical · within-cell four-gram · reader zone (harness/validate.mjs). Read = the four questions (meaning · reasoning · reading · scope) and the three readers, scored blind on the read sheet. Status ∈ retain original · adopt · revise · unresolved. Nothing here lands in the station without the owner's row-by-row ruling (REA_05 §1).`, ''];
const perModel = {}; const tally = (m, k) => { perModel[m] = perModel[m] || { candidates: 0, pass: 0, read: 0, adopt: 0, revise: 0, retain: 0, unresolved: 0 }; perModel[m][k]++; };
md.push('## Per candidate', '', '| # | Field path | Cell | State | Chart | Model | Gate | Read notes | Status |', '|---|---|---|---|---|---|---|---|---|');
const bodies = [];
for (const r of rows) {
  const meta = JSON.parse(fs.readFileSync(OUT + r.id + '.meta.json', 'utf8'));
  const cands = [{ model: 'original', file: OUT + r.id + '.original.json' }, ...candidatesFor(r.id)].filter((c) => fs.existsSync(c.file));
  for (const c of cands) {
    const R = validate(r.id, c.file, { quiet: true }); const sc = scores[r.id]?.[c.model] || {};
    tally(c.model, 'candidates'); if (R.pass) tally(c.model, 'pass'); if (sc.status) { tally(c.model, 'read'); tally(c.model, ({ 'adopt': 'adopt', 'revise': 'revise', 'retain original': 'retain', 'unresolved': 'unresolved' })[sc.status] || 'unresolved'); }
    const read = sc.status ? `meaning ${sc.meaning ?? '?'} · reasoning ${sc.reasoning ?? '?'} · reading ${sc.reading ?? '?'} · scope ${sc.scope ?? '?'} · readers ${sc.readers ?? '?'}${sc.notes ? ' · ' + String(sc.notes).replace(/\|/g, '\\|') : ''}` : 'unread';
    md.push(`| ${r.id} | ${meta.field} | ${meta.ctx.cell} | ${R.state || ''} | ${meta.ctx.chart?.id || ''} | ${c.model} | ${R.pass ? 'pass' : 'FAIL: ' + R.blocking.join('; ').replace(/\|/g, '\\|')} | ${read} | ${sc.status || (R.pass ? 'unresolved' : 'not compared')} |`);
    if (c.model !== 'original') { const text = JSON.parse(fs.readFileSync(c.file, 'utf8').trim().replace(/^```(json)?/, '').replace(/```$/, '')); delete text._trace; bodies.push(`### ${r.id} · ${c.model}`, '', `Original: ${one(meta.original)}`, '', `Candidate: ${one(text)}`, ''); }
  }
}
md.push('', '## Summary by model', '', '| Model | Candidates | Gate pass | Read | Adopt | Revise | Retain original | Unresolved |', '|---|---|---|---|---|---|---|---|');
for (const [m, t] of Object.entries(perModel)) md.push(`| ${m} | ${t.candidates} | ${t.pass} | ${t.read} | ${t.adopt} | ${t.revise} | ${t.retain} | ${t.unresolved} |`);
md.push('', '## Before / after, per candidate', '', ...bodies);
fs.writeFileSync(opt('out', OUT + man.name + '.report.md'), md.join('\n')); console.log(`report → ${opt('out', OUT + man.name + '.report.md')}`);
