// Before landing: every out-<id>.json holds exactly its worklist's units (key, kind, page, family), plus BP-3's new
// dated-bond versions (<bond key>.lived / .coming), and every unit has text. node verify.mjs
import fs from 'node:fs';
const HERE = new URL('.', import.meta.url).pathname;
let bad = 0;
for (const f of fs.readdirSync(HERE).filter((x) => /^worklist-.+\.json$/.test(x)).sort()) {
  const id = f.replace(/^worklist-|\.json$/g, ''); const of = `out-${id}.json`;
  if (!fs.existsSync(HERE + of)) { console.log(`${id}: no output yet`); bad++; continue; }
  const W = JSON.parse(fs.readFileSync(HERE + f, 'utf8')).units; const O = JSON.parse(fs.readFileSync(HERE + of, 'utf8')).units;
  const wk = new Map(W.map((u) => [u.key, u])); const ok = new Map(O.map((u) => [u.key, u]));
  const missing = W.filter((u) => !ok.has(u.key)).map((u) => u.key);
  const extra = O.filter((u) => !wk.has(u.key) && !(id === 'BP-3' && /\.(lived|coming)$/.test(u.key) && wk.has(u.key.replace(/\.(lived|coming)$/, '')))).map((u) => u.key);
  const drift = O.filter((u) => wk.has(u.key) && ['kind', 'page', 'family'].some((k) => wk.get(u.key)[k] !== u[k])).map((u) => u.key);
  const empty = O.filter((u) => !u.text || !u.text.trim()).map((u) => u.key);
  const kept = O.filter((u) => wk.has(u.key) && wk.get(u.key).current === u.text).length;
  const msg = [missing.length && `${missing.length} missing`, extra.length && `${extra.length} extra`, drift.length && `${drift.length} kind/page/family drift`, empty.length && `${empty.length} empty`].filter(Boolean);
  if (msg.length) { bad++; console.log(`${id}: ${msg.join(', ')}`, [...missing, ...extra, ...drift, ...empty].slice(0, 4)); }
  else console.log(`${id}: ${O.length} units (${kept} kept, ${O.length - kept} written)`);
}
process.exit(bad ? 1 : 0);
