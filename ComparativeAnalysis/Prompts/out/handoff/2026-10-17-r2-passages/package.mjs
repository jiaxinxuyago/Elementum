// Round 2 persona-passage work (K2 fields): R2-3 chart quantity as cause, R2-4 assumed partner/child/boss, and the round-2
// MINOR findings on K2 fields (A3-only and owner-settled kinds excluded). Pair-cell fields go to the 2026-10-17-r2-pairs writers.
import fs from 'node:fs'; import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname); const ROOT = path.resolve(HERE, '../../../../..') + '/';
const R2 = ROOT + 'ComparativeAnalysis/Evaluations/final-audit-2026-10-17/round-2/';
const { findings } = JSON.parse(fs.readFileSync(R2 + 'findings.json', 'utf8'));
const raw = fs.readdirSync(R2 + 'audit').flatMap((f) => fs.readFileSync(`${R2}audit/${f}`, 'utf8').split('\n').map((l) => ({ src: f.replace('.md', ''), l })));
const get = (o, p) => p.replace(/\[(\d+)\]/g, '.$1').split('.').reduce((a, k) => a?.[k], o);
const stOf = (cell) => JSON.parse(fs.readFileSync(`${ROOT}Reading/Database/templates/by_axis/json/ELEMENT_GOD/${cell}.json`, 'utf8'));
const items = new Map(); const add = (key, f) => { const m = key.match(/^K2 (\S+) · (.+)$/); if (!m) return; const t = get(stOf(m[1]).candidates, m[2]); if (typeof t !== 'string') return; const it = items.get(key) || { key, text: t, findings: [] }; it.findings.push(f); items.set(key, it); };
const SETTLED = /comparative (frame|middle|joint)|rather than.*(frame|count)|Intuition|Instinct|bar label|Sage.*(shelter|lean)/i;
for (const f of findings.filter((x) => x.severity === 'MINOR')) {
  const crit = (f.criterion.replace(/\*/g, '').match(/\b(A\d|B|C|D\d+)\b/g) || []); if (crit.length && crit.every((c) => c === 'A3')) continue;
  if (SETTLED.test(f.issue)) continue;
  const row = raw.find((r) => r.src === f.source && r.l.includes(`| ${f.id} |`))?.l || '';
  const def = row.match(/K2 (\S+) · fn_reading\.(catalyst|friction)\.define/); const key = def ? `K2 ${def[1]} · fn_reading.${def[2]}.define` : f.key;
  if (!/^K2 /.test(key)) continue;
  add(key, { id: `R2 ${f.source}:${f.id}`, criterion: f.criterion, issue: f.issue, auditor_note: f.fix, ...(crit.includes('A3') ? { note: 'Mixed with A3: fix only the non-A3 part (owner: A3 original wins).' } : {}) });
}
const QTY = /\b(more|less|little|much|enough)\b[^.]{0,30}\b(Wood|Fire|Earth|Metal|Water)\b|\b(Wood|Fire|Earth|Metal|Water)\b[^.]{0,40}\b(than|piles up|runs over|running over|comes in|to spare|in you)\b/;
const PEOPLE = /\b(partner|partner's|child|children|kids?|boss|promotions?|raises?|colleagues?|anyone under you|under you|above you|household|husband|wife|son|daughter|students?|employees?|staff)\b/i;
const walk = (o, p, cb) => { if (typeof o === 'string') cb(p, o); else if (Array.isArray(o)) o.forEach((v, i) => walk(v, `${p}[${i}]`, cb)); else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) walk(v, p ? `${p}.${k}` : k, cb); };
for (const f of fs.readdirSync(`${ROOT}Reading/Database/templates/by_axis/json/ELEMENT_GOD`)) {
  const cell = f.replace('.json', ''); const st = stOf(cell);
  walk(st.candidates.fn_reading, 'fn_reading', (p, t) => {
    if (/\.word$/.test(p)) return;
    if (QTY.test(t)) add(`K2 ${cell} · ${p}`, { id: 'R2-3', criterion: 'A1', issue: 'The chart\'s quantity of an element is given as the cause (owner R2-3, approved): name the reader\'s want or fear instead. Change only that sentence. If the element word is not a cause (an image, or the energy named plainly), leave it and say so in no_change_reason.' });
    if (PEOPLE.test(t)) add(`K2 ${cell} · ${p}`, { id: 'R2-4', criterion: 'A1', issue: 'A partner, child, boss, promotion or household is assumed (owner R2-4, approved). Swap in neutral words, changing only those words: "the person you love" / "the one closest to you" for a partner; "whoever learns from you" / "anyone in your care" for a child or student; "the one in charge" / "whoever signs off" for a boss; "the next step up" for a promotion or raise. Leave it if the word is not an assumption (e.g. "a partner in a venture").' });
  });
  if (st.candidates.edge?.lead) { const t = st.candidates.edge.lead; const body = t.replace(/^[^.]+\./, ''); if (PEOPLE.test(body)) add(`K2 ${cell} · edge.lead`, { id: 'R2-4', criterion: 'A1', issue: 'A partner, child or boss assumed in THE EDGE (owner R2-4). The first sentence names the ruling domains and stays.' }); }
}
const all = [...items.values()]; const half = (k) => /^K2 [木火土]/.test(k) ? 'a' : 'b';
for (const h of ['a', 'b']) fs.writeFileSync(`${HERE}/worklist-${h}.json`, JSON.stringify(all.filter((x) => half(x.key) === h), null, 1));
const c = (id) => all.filter((x) => x.findings.some((f) => f.id === id)).length;
console.log(all.length, 'fields:', all.filter((x) => half(x.key) === 'a').length, '+', all.filter((x) => half(x.key) === 'b').length, '| R2-3', c('R2-3'), '| R2-4', c('R2-4'), '| minors', all.filter((x) => x.findings.some((f) => /^R2 /.test(f.id))).length);
