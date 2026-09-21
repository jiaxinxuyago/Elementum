// Self-test: every original in a run manifest is a candidate (REA_17 §0 rule 5)
// and must pass its own gate. Writes out/<id>.original.json and validates it.
//   node selftest.mjs runs/<manifest>.json
import fs from 'node:fs';
import { OUT } from './lib.mjs';
import { validate } from './validate.mjs';
const man = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')); let fails = 0;
for (const r of man.rows || man) {
  const meta = JSON.parse(fs.readFileSync(OUT + r.id + '.meta.json', 'utf8')); const { _inherited, ...orig } = meta.original;
  fs.writeFileSync(OUT + r.id + '.original.json', JSON.stringify(orig, null, 1));
  const R = validate(r.id, OUT + r.id + '.original.json', { quiet: true });
  console.log(`${R.pass ? 'PASS' : 'FAIL'}  ${r.id}${R.pass ? '' : '  ← ' + R.blocking.join(' | ')}${R.repInfo.length ? `  [rep inventory ${R.repInfo.length}]` : ''}${R.zone ? `  [zone ${R.zone.outside.length} outside / ${R.zone.total}w]` : ''}`);
  if (!R.pass) fails++;
}
console.log(fails ? `✗ ${fails} original(s) fail their own gate` : '✓ every original passes its own gate');
