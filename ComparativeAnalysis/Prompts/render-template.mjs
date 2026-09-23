// THE PAGE RENDERER: the Day Master page and the five energy pages as the
// reader would meet them, from a folder of filled skeletons; with --against
// the original's folder, every field is shown original then candidate.
//   node render-template.mjs <dir-of-filled-skeletons> [--against <benchmark dir>] [--out <file.md>]
import fs from 'node:fs';
import path from 'node:path';
import { validateTemplate } from './validate-template.mjs';
const argv = process.argv.slice(2); const opt = (n, d) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : d; };
const dir = argv.filter((a) => !a.startsWith('--'))[0]; const against = opt('against');
const load = (d) => { const o = {}; if (!d || !fs.existsSync(d)) return o; for (const f of fs.readdirSync(d).filter((x) => x.endsWith('.json') && !x.endsWith('.gate.json'))) o[f.replace(/\.original\.json$/, '.json')] = JSON.parse(fs.readFileSync(path.join(d, f), 'utf8')); return o; };
const cand = load(dir), orig = load(against);
const str = (v) => typeof v === 'string' ? v : v && typeof v === 'object' ? Object.entries(v).filter(([k]) => k !== '_trace').map(([k, t]) => `**${k}:** ${t}`).join('  \n') : '';
const md = [`# Rendered reading · ${path.basename(dir)}${against ? ' (original then candidate per field)' : ''}`, ''];
const order = Object.keys(cand).sort((a, b) => (a.startsWith('P4') ? -1 : b.startsWith('P4') ? 1 : a.localeCompare(b)));
for (const f of order) {
  const sk = cand[f]; const R = validateTemplate(path.join(dir, f)); const o = orig[f];
  md.push(`## ${sk.page}`, '', `Gate: ${R.pass ? 'pass' : 'FAIL: ' + R.blocking.join('; ')}`, '');
  for (const [fp, fld] of Object.entries(sk.fields)) {
    md.push(`### ${fp}  \`${fld.spec.card}\`${fld.spec.door ? ' · ' + fld.spec.door + ' door' : ''}${fld.spec.cell ? ' · ' + fld.spec.cell : ''}`, '');
    if (o?.fields?.[fp]) md.push(`> **original**  \n> ${str(o.fields[fp].value).replace(/\n/g, '\n> ')}`, '');
    md.push(`${against ? '**candidate**  \n' : ''}${str(fld.value)}`, '');
    if (fld._trace || fld.value?._trace) md.push(`_trace: ${fld._trace || fld.value._trace}_`, '');
    const fr = R.fields[fp]; if (fr && !fr.pass) md.push(`⚠ ${fr.findings.join('; ')}`, '');
  }
}
const out = opt('out', path.join(dir, 'reading.md')); fs.writeFileSync(out, md.join('\n')); console.log('rendered → ' + out);
