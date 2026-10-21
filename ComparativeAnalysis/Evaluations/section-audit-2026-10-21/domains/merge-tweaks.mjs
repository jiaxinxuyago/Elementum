// The Domains + Blueprint section audit: merge the TWEAK findings into one fix per station key (2026-10-21).
//   node ComparativeAnalysis/Evaluations/section-audit-2026-10-21/domains/merge-tweaks.mjs
// Reads findings.json; writes tweaks.json (to land with apply-tweaks.mjs) and tweaks-held.json (for the owner):
//   - one fix per key: the one closest to the current text (a TWEAK must not change the meaning);
//   - held: a unit still word for word an owner-approved golden text, a key a MAJOR also names, and fixes that are
//     not a clean replacement text (they go by hand).
import fs from 'node:fs';
import path from 'node:path';

const HERE = path.dirname(new URL(import.meta.url).pathname) + '/';
const ROOT = path.resolve(HERE, '../../../..') + '/';
const ST = ROOT + 'Reading/Database/templates/by_axis/json/';
const HO = ROOT + 'ComparativeAnalysis/Prompts/out/handoff/';
const rd = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const { findings } = rd(HERE + 'findings.json');

// the owner-approved texts: the 10-17 golden template, the round-8 golden units, the seven Y2 lines, the T1 slots
const golden = new Set();
const walk = (o) => { if (typeof o === 'string') golden.add(o.trim()); else if (o && typeof o === 'object') Object.values(o).forEach(walk); };
const t17 = rd(HO + '2026-10-17-domains-template/template.json'); walk(t17.seats); walk(t17.decades); walk(t17.gaps); walk(t17.patterns); walk(t17.unruled);
for (const f of ['2026-10-18-depth-template/template.json', '2026-10-21-domains-blueprint/approved.json', '2026-10-21-domains-blueprint/out-slots.json']) for (const u of rd(HO + f).units) golden.add((u.template || u.text).trim());

// the current text of a key
const depth = rd(ST + 'TEMPLATED/tpl_depth.json').candidates.units; const dom = rd(ST + 'TEMPLATED/tpl_domains.json').candidates;
const get = (o, p) => p.split('.').reduce((v, k) => v?.[k], o);
function current(key) {
  let m;
  if (depth[key]) return depth[key];
  if ((m = key.match(/^POSITION (\w+) · (.+)$/))) return get(rd(ST + `POSITION/${m[1]}.json`).candidates, m[2]);
  if ((m = key.match(/^GOD (\w+) · (decade_lines\..+)$/))) return get(rd(ST + `GOD/${m[1]}.json`).candidates, m[2]);
  if ((m = key.match(/^TG_PATTERN (\w+) · (domain_lines\..+|fused_line)$/))) return get(rd(ST + `TG_PATTERN/${m[1]}.json`).candidates, m[2]);
  if ((m = key.match(/^TEMPLATED tpl_domains · (.+)$/))) return get(dom, m[1]);
  return null;
}
// a clean fix: the replacement text alone, quotes and backticks stripped
const clean = (s) => String(s).trim().replace(/^\*\*|\*\*$/g, '').replace(/^["“`']+|["”`']+$/g, '').replace(/\\\|/g, '|').trim();
const words = (s) => s.toLowerCase().match(/[a-z']+/g) || [];
function distance(a, b) { // word-level edit distance
  const x = words(a), y = words(b); const d = Array.from({ length: x.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= y.length; j++) d[0][j] = j;
  for (let i = 1; i <= x.length; i++) for (let j = 1; j <= y.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (x[i - 1] === y[j - 1] ? 0 : 1));
  return d[x.length][y.length];
}
const majorKeys = new Set(findings.filter((f) => f.severity === 'MAJOR' && f.key).map((f) => f.key));
const byKey = new Map();
for (const f of findings.filter((x) => x.severity === 'TWEAK')) (byKey.get(f.key || `(no key) ${f.source} ${f.id}`) || byKey.set(f.key || `(no key) ${f.source} ${f.id}`, []).get(f.key || `(no key) ${f.source} ${f.id}`)).push(f);
const apply = []; const held = [];
for (const [key, fs_] of byKey) {
  const ids = fs_.map((f) => `${f.source.replace('group-', '')}:${f.id}`);
  const cur = fs_[0].key ? current(key) : null;
  const why = (r) => held.push({ key, ids, reason: r, current: cur, fixes: fs_.map((f) => ({ id: f.id, issue: f.issue, fix: f.fix })) });
  if (!fs_[0].key) { why('no station key'); continue; }
  if (typeof cur !== 'string') { why('no text at this key'); continue; }
  if (/^POSITION \w+ · reading$/.test(key)) { why('seat card: the fix carries the printed opening, by hand'); continue; }
  if (golden.has(cur.trim())) { why('golden, to owner'); continue; }
  if (majorKeys.has(key)) { why('a MAJOR names this key'); continue; }
  const cands = fs_.map((f) => ({ f, text: clean(f.fix) })).filter((c) => /[.!?]$/.test(c.text) && !/\s(→|->)\s|^(Replace|Change|Rewrite|Use|Drop|Delete)\b/i.test(c.text) && c.text !== cur);
  if (!cands.length) { why('no clean replacement text'); continue; }
  cands.sort((a, b) => distance(cur, a.text) - distance(cur, b.text));
  apply.push({ id: ids.join(' + '), key, text: cands[0].text, from: cands[0].f.id, issue: cands[0].f.issue });
}
fs.writeFileSync(HERE + 'tweaks.json', JSON.stringify(apply, null, 1) + '\n');
fs.writeFileSync(HERE + 'tweaks-held.json', JSON.stringify(held, null, 1) + '\n');
const tally = held.reduce((a, h) => ((a[h.reason] = (a[h.reason] || 0) + 1), a), {});
console.log(`${byKey.size} keys: ${apply.length} to apply, ${held.length} held`, JSON.stringify(tally));
