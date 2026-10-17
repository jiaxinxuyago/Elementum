// M3, narrowed (owner 2026-10-17): every station text that uses "ahead of", with its address, for a one-phrase swap.
import fs from 'node:fs'; import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname); const ROOT = path.resolve(HERE, '../../../../..') + '/';
const out = [];
const walk = (o, p, cb) => { if (typeof o === 'string') cb(p, o); else if (Array.isArray(o)) o.forEach((v, i) => walk(v, `${p}[${i}]`, cb)); else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) walk(v, p ? `${p}.${k}` : k, cb); };
for (const [ax, axis, fields] of [['K2', 'ELEMENT_GOD', ['fn_reading', 'edge']], ['PAIR', 'ELEMENT_PAIR', ['function']]]) {
  const D = `${ROOT}Reading/Database/templates/by_axis/json/${axis}/`;
  for (const f of fs.readdirSync(D).filter((x) => x.endsWith('.json')).sort()) {
    const st = JSON.parse(fs.readFileSync(D + f, 'utf8')); const cell = f.replace('.json', '');
    for (const fld of fields) walk(st.candidates[fld], fld, (p, t) => { if (/\bahead of\b/i.test(t)) out.push({ key: `${ax} ${cell} · ${p}`, text: t }); });
  }
}
fs.writeFileSync(`${HERE}/worklist.json`, JSON.stringify(out, null, 1));
console.log(out.length, 'texts,', out.reduce((n, x) => n + x.text.match(/\bahead of\b/gi).length, 0), 'uses');
