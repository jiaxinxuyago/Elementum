// node gate.mjs out.json — each cell: a decision; if "rewrite", only the last sentence of ledger[0].drive or ledger[1].cost_self changes, to a want or a permission.
import fs from 'node:fs'; import path from 'node:path'; import { execFileSync } from 'node:child_process';
const HERE = path.dirname(new URL(import.meta.url).pathname); const W = JSON.parse(fs.readFileSync(`${HERE}/worklist.json`, 'utf8'));
const out = JSON.parse(fs.readFileSync(path.resolve(process.argv[2]), 'utf8')); const fails = []; const F = (m) => fails.push(m); const fixes = [];
const src = fs.readFileSync(`${HERE}/../../../validate-template.mjs`, 'utf8'); const REM = new RegExp(src.match(/export const REMINDER_FAMILY = \/(.*)\/i;/)[1], 'i');
for (const c of W) {
  const o = out.find((x) => x.cell === c.cell); if (!o) { F(`${c.cell}: missing`); continue; }
  if (o.decision === 'already') { if (!['drive', 'cost_self'].includes(o.which)) F(`${c.cell}: name which close (drive or cost_self) is already a want or permission`); continue; }
  if (o.decision !== 'rewrite') { F(`${c.cell}: decision "already" or "rewrite"`); continue; }
  const r = c.shown.find((x) => x.angle === o.which && x.angle !== 'cost_others'); if (!r) { F(`${c.cell}: rewrite the drive or the cost_self close`); continue; }
  const cl = (o.close || '').trim(); const text = `${r.keep_as_is} ${cl}`;
  if (!/^[A-Z].*\.$/.test(cl) || (cl.match(/[.!?]/g) || []).length !== 1) F(`${c.cell}: the close is one sentence`);
  if (!['want', 'permission'].includes(o.kind)) F(`${c.cell}: kind is want or permission`);
  if (/\byou (can|could|may|might)\b/i.test(cl)) F(`${c.cell}: capacity close`);
  if (/,\s+so\b|\bso that\b|\b(ahead of|sooner than)\b|\b(room|verdict)\b|[—–;:]/i.test(cl)) F(`${c.cell}: banned frame or word: "${cl}"`);
  if (/^(Let|Keep|Ask|Take|Give|Make|Try|Say|Stop|Start|Remember|Notice)\b/.test(cl)) F(`${c.cell}: no instruction close`);
  const others = c.shown.filter((x) => x !== r).map((x) => x.close); if (REM.test(cl) && others.some((x) => REM.test(x))) F(`${c.cell}: at most one reminder phrase among the shown closes`);
  fixes.push({ key: r.key, text, id: `R3 soft close (${o.kind})` });
}
const ff = path.resolve(process.argv[2]).replace(/\.json$/, '.fixes.json'); fs.writeFileSync(ff, JSON.stringify(fixes, null, 1));
let dry = ''; try { dry = execFileSync('node', [`${HERE}/../../../audit/apply-fixes.mjs`, ff, '--by', 'dry', '--ruling', 'dry', '--dry'], { cwd: path.resolve(HERE, '../../../../..'), encoding: 'utf8' }); } catch (e) { dry = String(e.stdout || '') + String(e.stderr || ''); }
for (const l of dry.split('\n')) if (/^\s+skipped/.test(l)) F(`house limit: ${l.trim()}`);
console.log(`${W.length} cells, ${fixes.length} rewrites, ${fails.length} failures`); for (const f of fails) console.log('  ✗ ' + f); process.exit(fails.length ? 1 : 0);
