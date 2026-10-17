// Minor polish gate (owner 2026-10-17: "Approve all other fixes besides the four system-level items"; A3 restatement
// fixes not approved). Only the flagged sentence or phrase changes; the house rules still hold. node gate.mjs out-a.json
import fs from 'node:fs'; import path from 'node:path'; import { execFileSync } from 'node:child_process';
const HERE = path.dirname(new URL(import.meta.url).pathname); const outFile = path.resolve(process.argv[2]);
const half = path.basename(outFile).replace(/^out-|\.json$/g, ''); const work = JSON.parse(fs.readFileSync(`${HERE}/worklist-${half}.json`, 'utf8'));
const out = JSON.parse(fs.readFileSync(outFile, 'utf8'));
const sents = (t) => (t.match(/[^.!?]+[.!?]+/g) || []).map((s) => s.trim()); const count = (t, re) => (t.match(re) || []).length;
const IMP = /^(Let|Keep|Ask|Take|Give|Make|Pick|Choose|Try|Say|Spend|Set|Put|Hand|Allow|Leave|Stop|Start|Go|Do|Don't|Find|Tell|Trust|Show|Read|Write|Call|Sit|Sleep|Eat|Share|Save|Send|Stay|Wait|Hold|Use|Offer|Finish|Listen|Learn|Rest|Step|Speak|Remember|Notice|Look|Watch)\b/;
const fails = []; const F = (m) => fails.push(m); const fixes = [];
for (const w of work) {
  const o = out.find((x) => x.key === w.key); if (!o) { F(`${w.key}: missing`); continue; }
  const a = sents(w.text), b = sents(o.text); const changed = b.filter((s, i) => s !== a[i]).length;
  if (o.text === w.text) { if (!o.no_change_reason) F(`${w.key}: unchanged with no "no_change_reason"`); continue; }
  if (a.length !== b.length) F(`${w.key}: the sentence count changed (${a.length} → ${b.length})`);
  if (changed > 2) F(`${w.key}: ${changed} sentences changed (fix only the flagged ones)`);
  for (const [re, what] of [[/,\s+so\b|\bso that\b/g, '"X, so Y"'], [/\bahead of\b/g, '"ahead of"'], [/\bsooner than\b/g, '"sooner than"'], [/\b(room|verdict)\b/gi, '"room"/"verdict"'], [/[—–;:]/g, 'dash, semicolon or colon']]) if (count(o.text, re) > count(w.text, re) || (what === '"sooner than"' && count(o.text, re) && w.findings.some((f) => f.id === 'sweep:sooner-than') && !o.no_change_reason)) F(`${w.key}: adds or keeps ${what}`);
  const last = b[b.length - 1] || '';
  if (last !== a[a.length - 1]) {
    if (/\byou (can|could|may|might)\b/i.test(last)) F(`${w.key}: capacity close`);
    if (/\.catalyst\.ledger/.test(w.key) && (IMP.test(last) || /\b(if|once|until|whenever) you\b/i.test(last) || /\b(free|allowed) to\b/i.test(last))) F(`${w.key}: a catalyst close is the gift, the price or the want (M1)`);
  }
  for (const f of w.findings) if (f.owner_approved) { const ap = Array.isArray(f.owner_approved) ? f.owner_approved[1] : f.owner_approved; if (!o.text.includes(ap)) F(`${w.key}: use the owner-approved text "${ap}"`); }
  fixes.push({ key: w.key, text: o.text, id: w.findings.map((f) => f.id).join('+') });
}
const fixFile = outFile.replace(/\.json$/, '.fixes.json'); fs.writeFileSync(fixFile, JSON.stringify(fixes, null, 1));
let dry = ''; try { dry = execFileSync('node', [`${HERE}/../../../audit/apply-fixes.mjs`, fixFile, '--by', 'dry', '--ruling', 'dry', '--dry'], { cwd: path.resolve(HERE, '../../../../..'), encoding: 'utf8' }); } catch (e) { dry = String(e.stdout || '') + String(e.stderr || ''); }
for (const l of dry.split('\n')) if (/^\s+skipped/.test(l)) F(`house limit: ${l.trim()}`);
console.log(`${half}: ${work.length} fields, ${fixes.length} changed, ${fails.length} failures`); for (const f of fails) console.log('  ✗ ' + f);
process.exit(fails.length ? 1 : 0);
