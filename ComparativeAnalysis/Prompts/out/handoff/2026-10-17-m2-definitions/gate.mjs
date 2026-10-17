// M2 gate (owner 2026-10-17): definitions = shared head (pair, sentences 1-2) + a persona tail (persona cell) for a
// single or lead persona; one shared text for the 2+2 balanced faces; a balanced text for a Balanced chart.
// Advice and remedy stay shared and must be true of both personas.
//   node gate.mjs <out-core.json>     exit 1 on any failure
import fs from 'node:fs'; import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname);
const outFile = process.argv[2]; const out = JSON.parse(fs.readFileSync(outFile, 'utf8'));
const core = path.basename(outFile).replace(/^out-|\.json$/g, '');
const work = JSON.parse(fs.readFileSync(`${HERE}/worklist-${core}.json`, 'utf8'));
const src = fs.readFileSync(`${HERE}/../../../validate-template.mjs`, 'utf8');
const REMINDER = new RegExp(src.match(/export const REMINDER_FAMILY = \/(.*)\/i;/)[1], 'i');
const sents = (t) => (t.match(/[^.!?]+[.!?]+/g) || []).map((s) => s.trim());
const words = (t) => t.trim().split(/\s+/).length;
const IMPERATIVE = /^(Let|Keep|Ask|Take|Give|Make|Pick|Choose|Try|Say|Spend|Set|Put|Hand|Allow|Leave|Stop|Start|Go|Do|Don't|Find|Tell|Trust|Show|Read|Write|Call|Sit|Sleep|Eat|Book|Bring|Share|Save|Send|Name|Own|Stay|Wait|Move|Count|Check|Plan|Hold|Use|Add|Offer|Open|Finish|Lead|Follow|Listen|Learn|Build|Rest|Step|Speak|Remember|Notice|Look|Watch|Treat)\b/;
const STOP = new Set('your with into from them they what that this more less over last long much most never always every thing things does goes gets than when then just only even each also into onto upon been have will would could should their there here where which while about after before first'.split(' '));
const stems = (t) => new Set(t.toLowerCase().match(/[a-z']+/g).filter((w) => w.length >= 4 && !STOP.has(w)).map((w) => w.slice(0, 4)));
const fails = []; const F = (m) => fails.push(m);
const checkDef = (tag, full, { min = 30, max = 50, sMin = 3, sMax = 4 } = {}) => {
  const ss = sents(full); const n = words(full);
  if (n < min || n > max) F(`${tag}: ${n} words (${min} to ${max})`);
  if (ss.length < sMin || ss.length > sMax) F(`${tag}: ${ss.length} sentences (${sMin} to ${sMax})`);
  for (const s of ss) if ((s.match(/,/g) || []).length > 2) F(`${tag}: more than two commas in "${s}"`);
  if (/[—–;:]/.test(full)) F(`${tag}: dash, semicolon or colon`);
  if (/[一-鿿]/.test(full)) F(`${tag}: Chinese characters`);
  const last = ss[ss.length - 1] || '';
  if (/\byou (can|could|may|might)\b/i.test(last)) F(`${tag}: capacity close`);
  if (/\byou do best\b/i.test(full)) F(`${tag}: "you do best" (advice inside a definition)`);
};
const checkTail = (tag, tail, opener) => {
  if (!tail || !tail.trim()) { F(`${tag}: missing`); return; }
  if (!opener.test(tail)) F(`${tag}: must open with ${opener.source.replace(/\\/g, '')}: "${tail.slice(0, 40)}…"`);
  for (const s of sents(tail)) if (IMPERATIVE.test(s)) F(`${tag}: imperative sentence "${s}"`);
  if (/,\s+so\b|\bso that\b|^So\b/i.test(tail)) F(`${tag}: "X, so Y" frame (owner 2026-10-17: rejected as the repeated structure)`);
  const last = sents(tail).pop() || '';
  if (REMINDER.test(last)) F(`${tag}: reminder-family close`);
  if (sents(tail).length < 1 || sents(tail).length > 2) F(`${tag}: the tail is 1 or 2 sentences`);
};
for (const c of work.cells) {
  const o = out.find((x) => x.pair_cell === c.pair_cell); if (!o) { F(`${c.pair_cell}: missing`); continue; }
  const OPEN = { catalyst: c.self_pair ? /^Running thin, / : /^As a catalyst, /, friction: c.self_pair ? /^Running over, / : /^As a friction, / };
  for (const pole of ['catalyst', 'friction']) {
    const head = c[pole].head;
    for (const p of c.personas) {
      const tail = o.tails?.[p.k2_cell]?.[pole]; const tag = `${c.pair_cell} ${p.persona} ${pole} tail`;
      checkTail(tag, tail, OPEN[pole]); if (!tail) continue;
      checkDef(tag, `${head} ${tail}`);
      const own = stems(p[`${pole}_keywords`].map((k) => k.word).join(' ')); const hit = [...stems(tail)].filter((s) => own.has(s));
      if (hit.length) F(`${tag}: repeats its own keyword words (${hit.join(', ')})`);
    }
    if (o.tails?.[c.personas[0].k2_cell]?.[pole] && o.tails[c.personas[0].k2_cell][pole] === o.tails?.[c.personas[1].k2_cell]?.[pole]) F(`${c.pair_cell} ${pole}: the two persona tails are identical`);
    const sh = o.shared?.[pole]; const tag = `${c.pair_cell} shared ${pole}`;
    if (!sh || !['keep', 'rewrite'].includes(sh.decision)) F(`${tag}: decision keep or rewrite`);
    else { const tail = sh.decision === 'keep' ? c[pole].current_tail : sh.tail; checkTail(tag, tail, OPEN[pole]); if (tail) checkDef(tag, `${head} ${tail}`); }
  }
  checkTail(`${c.pair_cell} balanced tail`, o.balanced_tail, /^In balance, /); if (o.balanced_tail) checkDef(`${c.pair_cell} balanced`, `${c.catalyst.head} ${o.balanced_tail}`);
  for (const pole of ['catalyst', 'friction']) {
    const a = o[`advise_${pole}`]; const tag = `${c.pair_cell} advise_${pole}`;
    if (!a || !['keep', 'rewrite'].includes(a.decision)) { F(`${tag}: decision keep or rewrite`); continue; }
    if (a.decision === 'keep') continue;
    const t = a.text || ''; checkDef(tag, t, { min: 30, max: 70, sMin: 3, sMax: 7 });
    if (pole === 'friction') { const s0 = sents(c.advise_friction)[0]; if (sents(t)[0] !== s0) F(`${tag}: the first sentence ("${s0}") stays exactly as it is`); }
    if (/\b(sleep|slept|bed)\b/i.test(t) && !/\b(sleep|slept|bed)\b/i.test(c[`advise_${pole}`])) F(`${tag}: adds sleep (M6)`);
  }
}
console.log(`${core}: ${work.cells.length} cells, ${fails.length} failures`); for (const f of fails) console.log('  ✗ ' + f);
process.exit(fails.length ? 1 : 0);
