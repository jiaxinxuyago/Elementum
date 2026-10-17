// THE CONSOLIDATOR (REA_20 §4 step 4): read every auditor report in an audit folder, pull the findings
// tables (rows whose severity cell is MAJOR, MINOR or TWEAK) and the score tables, and write one
// findings.json plus a summary by severity, criterion and station key.
//
//   node audit/consolidate.mjs <audit-dir>        reads <audit-dir>/audit/*.md, writes <audit-dir>/findings.json
import fs from 'node:fs';
const dir = process.argv[2]; if (!dir) { console.log('usage: node audit/consolidate.mjs <audit-dir>'); process.exit(2); }
const KEY = /\b(K2|PAIR) ([^\s·|]+) · ([a-z_][\w.]*(?:\[\d+\][\w.]*)*)/;
const cells = (row) => row.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
const findings = []; const scores = [];
for (const f of fs.readdirSync(dir + '/audit').filter((x) => x.endsWith('.md'))) {
  const src = f.replace(/\.md$/, ''); let header = null;
  for (const line of fs.readFileSync(`${dir}/audit/${f}`, 'utf8').split('\n')) {
    if (!line.trim().startsWith('|')) { header = null; continue; }
    const c = cells(line); if (/^-+:?$/.test(c[0].replace(/\s/g, '')) || c.every((x) => /^:?-+:?$/.test(x))) continue;
    if (!header) { header = c.map((x) => x.toLowerCase()); continue; }
    const sevIdx = c.findIndex((x) => /^\**(MAJOR|MINOR|TWEAK)\**$/i.test(x));
    if (sevIdx >= 0) {
      const get = (name) => { const i = header.findIndex((h) => h.includes(name)); return i >= 0 ? c[i] : ''; };
      const keyCell = c.find((x) => KEY.test(x)) || ''; const m = keyCell.match(KEY);
      findings.push({ source: src, id: c[0], severity: c[sevIdx].replace(/\*/g, '').toUpperCase(), criterion: get('crit'), pages: get('page'), key: m ? `${m[1]} ${m[2]} · ${m[3].trim()}` : '', quote: get('quot'), issue: get('wrong') || get('issue'), fix: get('fix') || get('propos') || c[c.length - 1] });
    } else if (/^\**P\d{3}/.test(c[0]) && header.includes('b')) {
      const bi = header.indexOf('b'); const b = parseFloat(c[bi]); if (!isNaN(b)) scores.push({ source: src, page: c[0].match(/P\d{3}/)[0], B: b, row: c });
    }
  }
}
// A finding cited twice in one report (a summary row like "see 2.2") keeps the row that carries the fix.
const seen = new Map(); for (const f of findings) { const k = f.source + ' ' + f.id; const o = seen.get(k); if (!o || (f.key && f.fix.length > o.fix.length)) seen.set(k, f); }
findings.splice(0, findings.length, ...seen.values());
fs.writeFileSync(dir + '/findings.json', JSON.stringify({ findings, scores }, null, 1));
const by = (k) => findings.reduce((a, f) => ((a[f[k]] = (a[f[k]] || 0) + 1), a), {});
console.log(`${findings.length} findings from ${new Set(findings.map((f) => f.source)).size} reports:`, JSON.stringify(by('severity')));
console.log('by report:', JSON.stringify(findings.reduce((a, f) => ((a[f.source] = a[f.source] || {}), (a[f.source][f.severity] = (a[f.source][f.severity] || 0) + 1), a), {})));
if (scores.length) { const mean = scores.reduce((a, s) => a + s.B, 0) / scores.length; console.log(`B scores: ${scores.length} pages, mean ${mean.toFixed(2)}, below 4: ${scores.filter((s) => s.B < 4).length}`); }
const noKey = findings.filter((f) => f.severity === 'TWEAK' && !f.key).length; if (noKey) console.log(`${noKey} TWEAK findings without a station key (apply by hand)`);
