// Round 3 MINOR pass: every round-3 MINOR with a station key (A3-only, owner-settled, picker-only and head-sentence items
// excluded), on the live text. K2 and PAIR fields alike; split in two halves by energy.
import fs from 'node:fs'; import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname); const ROOT = path.resolve(HERE, '../../../../..') + '/';
const R = ROOT + 'ComparativeAnalysis/Evaluations/final-audit-2026-10-17/round-3/';
const { findings } = JSON.parse(fs.readFileSync(R + 'findings.json', 'utf8'));
const raw = fs.readdirSync(R + 'audit').flatMap((f) => fs.readFileSync(`${R}audit/${f}`, 'utf8').split('\n').map((l) => ({ src: f.replace('.md', ''), l })));
const get = (o, p) => p.replace(/\[(\d+)\]/g, '.$1').split('.').reduce((a, k) => a?.[k], o);
const cur = (key) => { const m = key.match(/^(K2|PAIR) (\S+) · (.+)$/); if (!m) return null; const f = `${ROOT}Reading/Database/templates/by_axis/json/${m[1] === 'K2' ? 'ELEMENT_GOD' : 'ELEMENT_PAIR'}/${m[2]}.json`; return fs.existsSync(f) ? get(JSON.parse(fs.readFileSync(f, 'utf8')).candidates, m[3]) : null; };
const SKIP = new Set(['X3-06', 'X3-08', 'X3-09', 'E3-02', 'F3-02', 'F3-03']); // picker (fixed in code) and shared head sentences (owner's leave needed)
const items = new Map(); const skipped = [];
for (const f of findings.filter((x) => x.severity === 'MINOR')) {
  const crit = (f.criterion.replace(/\*/g, '').match(/\b(A\d|B|C|D\d+)\b/g) || []);
  if (SKIP.has(f.id) || (crit.length && crit.every((c) => c === 'A3'))) { skipped.push(`${f.source}:${f.id}`); continue; }
  const row = raw.find((r) => r.src === f.source && r.l.includes(`| ${f.id} |`))?.l || '';
  const def = row.match(/K2 (\S+) · fn_reading\.(catalyst|friction)\.define/);
  const fk = f.key.replace(/ · (catalyst|friction)\./, ' · fn_reading.$1.').replace(/fn_reading\.fn_reading\./, 'fn_reading.');
  const keys = def ? [`K2 ${def[1]} · fn_reading.${def[2]}.define`] : [fk];
  if (f.id === 'X3-07') keys.splice(0, keys.length, 'K2 木_劫财 · fn_reading.catalyst.ledger[1].angles.drive');
  for (const key of keys.length ? keys : [f.key]) { const t = cur(key); if (typeof t !== 'string') continue; const it = items.get(key) || { key, text: t, findings: [] }; it.findings.push({ id: `R3 ${f.source}:${f.id}`, criterion: f.criterion, issue: f.issue + (f.id === 'X3-07' ? ' (Make the drive not need "someone just ahead", so it sits with "Goes first".)' : ''), auditor_note: f.fix, ...(crit.includes('A3') ? { note: 'Mixed with A3: fix only the non-A3 part.' } : {}) }); items.set(key, it); }
}
const all = [...items.values()]; const half = (k) => /^(K2|PAIR) [木火土]/.test(k) ? 'a' : 'b';
for (const h of ['a', 'b']) fs.writeFileSync(`${HERE}/worklist-${h}.json`, JSON.stringify(all.filter((x) => half(x.key) === h), null, 1));
console.log(all.length, 'fields:', all.filter((x) => half(x.key) === 'a').length, '+', all.filter((x) => half(x.key) === 'b').length, '| skipped', skipped.length, skipped.join(' '));
