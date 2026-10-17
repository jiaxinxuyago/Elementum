import fs from 'node:fs'; import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname); const ROOT = path.resolve(HERE, '../../../../..') + '/';
const S = '/tmp/claude-0/-home-user-Elementum/3b4796cb-be4f-503e-8cc5-4f44b1a6a522/scratchpad';
const work = JSON.parse(fs.readFileSync(`${S}/minor-work.json`, 'utf8'));
const get = (o, p) => p.replace(/\[(\d+)\]/g, '.$1').split('.').reduce((a, k) => a?.[k], o);
const cur = (key) => { const m = key.match(/^(K2|PAIR) (\S+) · (.+)$/); return get(JSON.parse(fs.readFileSync(`${ROOT}Reading/Database/templates/by_axis/json/${m[1] === 'K2' ? 'ELEMENT_GOD' : 'ELEMENT_PAIR'}/${m[2]}.json`, 'utf8')).candidates, m[3]); };
const APPROVED = { 'E-19': 'Spreading yourself thin feels safer than betting on one thing, and it keeps you tired.', 'E-05': 'Preparing is the part you control, and you choose another round of it over a first attempt.', 'F-34': 'You feel more warmth than your partner ever gets to see.', 'W-049': ['a child', 'them'], 'MT-14': ['A mistake marks your name in your eyes,', 'A mistake feels like a mark on your name,'], 'MT-12': ['you fail your own hard test sooner than pass someone else\'s.', 'you would rather fail your own hard test than pass someone else\'s easy one.'] };
const items = []; const byKey = new Map();
for (const f of work) {
  const t = cur(f.key); if (typeof t !== 'string') continue;
  const it = byKey.get(f.key) || { key: f.key, text: t, findings: [] }; it.findings.push({ id: `${f.source}:${f.id}`, criterion: f.criterion, issue: f.issue, auditor_note: f.fix, ...(APPROVED[f.id] ? { owner_approved: APPROVED[f.id] } : {}) });
  if (!byKey.has(f.key)) { byKey.set(f.key, it); items.push(it); }
}
// the "sooner than" sweep: every passage that uses it as a disguised "rather than"
const walk = (o, p, cb) => { if (typeof o === 'string') cb(p, o); else if (Array.isArray(o)) o.forEach((v, i) => walk(v, `${p}[${i}]`, cb)); else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) walk(v, p ? `${p}.${k}` : k, cb); };
for (const [ax, axis, flds] of [['K2', 'ELEMENT_GOD', ['fn_reading', 'edge']], ['PAIR', 'ELEMENT_PAIR', ['function']]]) for (const f of fs.readdirSync(`${ROOT}Reading/Database/templates/by_axis/json/${axis}`)) {
  const st = JSON.parse(fs.readFileSync(`${ROOT}Reading/Database/templates/by_axis/json/${axis}/${f}`, 'utf8'));
  for (const fl of flds) walk(st.candidates[fl], fl, (p, t) => { if (!/\bsooner than\b/.test(t)) return; const key = `${ax} ${f.replace('.json', '')} · ${p}`; const it = byKey.get(key) || { key, text: t, findings: [] }; it.findings.push({ id: 'sweep:sooner-than', criterion: 'A2', issue: '"sooner than" used as a disguised "rather than" (owner approved the sweep with the MT-12 sample). Where it means time, it stays.' }); if (!byKey.has(key)) { byKey.set(key, it); items.push(it); } });
}
const half = (k) => /^(K2|PAIR) [木火土]/.test(k) ? 'a' : 'b';
for (const h of ['a', 'b']) fs.writeFileSync(`${HERE}/worklist-${h}.json`, JSON.stringify(items.filter((x) => half(x.key) === h), null, 1));
console.log(items.length, 'fields;', items.filter((x) => half(x.key) === 'a').length, '+', items.filter((x) => half(x.key) === 'b').length);
