// Structural + mechanical gate over a blind-generated output. Usage: node validate.mjs <test> <output.json>
import fs from 'fs';
const [,, test, file] = process.argv;
const OUT = '/home/user/Elementum/Feedbacks/Deliverables/llm-ab-test-2026-09-21/harness/out/';
const S = '/home/user/Elementum/Reading/Database/templates/by_axis/json/';
let raw = fs.readFileSync(file, 'utf8').trim().replace(/^```(json)?/,'').replace(/```$/,'').trim();
let out; try { out = JSON.parse(raw); } catch (e) { console.log('✗ not valid JSON:', e.message.slice(0,80)); process.exit(1); }
const orig = JSON.parse(fs.readFileSync(OUT + 'originals.json', 'utf8'))[test];
const wc = (s) => String(s || '').trim().split(/\s+/).filter(Boolean).length;
const BANNED = /\b(delve|tapestry|testament|pivotal|crucial|intricate|robust|seamless|foster|underscore|showcase|leverage|boasts|vibrant|nestled|profound|realm|unlock|elevate|resonat\w*|navigate|landscape|verdict|legitimate|legitimacy|institutional|diligent|exemplary|enterprising|meticulous|destiny|fated|karmic|cosmic|zodiac|manifest\w*|journey)\b/i;
const HEDGE = /\b(often|sometimes|may|tends? to|perhaps)\b/i;
const findings = []; const F = (w, m) => findings.push(`${w} :: ${m}`);
const gate = (where, text, { budget, min, youOpen, noYou } = {}) => {
  const t = String(text || ''); if (!t) { F(where, 'EMPTY'); return; }
  if (/[—–;→]/.test(t)) F(where, 'sign (em-dash / semicolon / arrow)');
  if (/[一-鿿]/.test(t)) F(where, 'Chinese character');
  const b = t.match(BANNED); if (b) F(where, `banned word "${b[0]}"`);
  const h = t.match(HEDGE); if (h) F(where, `hedge "${h[0]}"`);
  if (/\broom\b/i.test(t)) F(where, '"room" (rationed)');
  if (/\b(Day Master|Ten God|Seven Killings|Direct Officer|Indirect Seal|Rob Wealth|Food God|Hurt Officer|BaZi|Bazi)\b/i.test(t)) F(where, 'BaZi label');
  const n = wc(t); if (budget && n > budget) F(where, `${n}w > ${budget}w`); if (min && n < min) F(where, `${n}w < ${min}w`);
  if (youOpen && !/^You\b/.test(t)) F(where, 'does not open on "You"');
  if (noYou && /\byou\b/i.test(t)) F(where, 'second person in a third-person field');
};
const stat = (label, ok) => console.log(`${ok ? '  ok ' : '  ✗  '} ${label}`);
console.log(`\n## ${test} · ${file.split('/').pop()}`);
if (test === 'T1') {
  const g = out.gifts || [], s = out.shadows || [];
  stat(`shape 7 + 7 (got ${g.length} + ${s.length})`, g.length === 7 && s.length === 7);
  const keys = ['phrase','dim','door','face','echo_of','desc'];
  const allKeys = [...g, ...s].every(it => keys.every(k => k in it)); stat('every item carries phrase/dim/door/face/echo_of/desc', allKeys);
  const doorsG = g.map(x => x.door), doorsS = s.map(x => x.door);
  const cnt = (a) => a.reduce((m, d) => (m[d] = (m[d] || 0) + 1, m), {});
  const expect = { body: 2, mind: 2, expression: 1, action: 1, order: 1 };
  stat(`gift doors ${JSON.stringify(cnt(doorsG))}`, JSON.stringify(cnt(doorsG), Object.keys(expect).sort()) === JSON.stringify(expect, Object.keys(expect).sort()));
  stat(`shadow doors ${JSON.stringify(cnt(doorsS))}`, JSON.stringify(cnt(doorsS), Object.keys(expect).sort()) === JSON.stringify(expect, Object.keys(expect).sort()));
  const facesG = cnt(g.map(x => x.face)), facesS = cnt(s.map(x => x.face));
  stat(`gift faces ${JSON.stringify(facesG)} (expect echo 5, wide 2)`, facesG.echo === 5 && facesG.wide === 2);
  stat(`shadow faces ${JSON.stringify(facesS)} (expect echo 5, excess 2)`, facesS.echo === 5 && facesS.excess === 2);
  // echo_of resolution against the station
  const resolve = (p) => { try { const [cell, ...path] = p.split('.'); const j = JSON.parse(fs.readFileSync(`${S}ELEMENT_PAIR/${cell}.json`, 'utf8')).candidates; let v = j; for (const k of path) v = v?.[k]; return v != null; } catch { return false; } };
  const bad = [...g, ...s].filter(x => !resolve(x.echo_of)).map(x => x.echo_of); stat(`echo_of resolves (${bad.length} unresolved${bad.length ? ': ' + bad.slice(0,3).join(', ') : ''})`, bad.length === 0);
  const IDIOMS = new Set(['never calls it done','never forgets a kindness','plays the long game','ahead of the curve','waits to be moved']);
  for (const [side, arr] of [['gift', g], ['shadow', s]]) arr.forEach((it, i) => {
    const w = `${side}[${i}] ${it.phrase}`;
    const pw = wc(it.phrase); if (pw > 3 && !IDIOMS.has(String(it.phrase).toLowerCase())) F(w, `phrase ${pw} words`);
    if (String(it.phrase).toLowerCase() === String(it.dim).toLowerCase()) F(w, 'phrase = dim');
    if (wc(it.dim) > 3) F(w, 'dim > 3 words');
    gate(w + ' desc', it.desc, { budget: 60 });
    const sents = String(it.desc).split(/[.!?]+\s/).filter(Boolean).length; if (sents > 3) F(w, `desc ${sents} sentences`);
  });
  const dimsG = g.map(x => x.dim.toLowerCase()), dimsS = s.map(x => x.dim.toLowerCase());
  stat('dims unique within each pool', new Set(dimsG).size === dimsG.length && new Set(dimsS).size === dimsS.length);
  // uniqueness across the other nine pools
  const all = new Set(); for (const f of fs.readdirSync(S + 'STEM')) if (f.endsWith('.json') && f !== 'bing.json') { const c = JSON.parse(fs.readFileSync(S + 'STEM/' + f, 'utf8')).candidates; [...(c.gifts||[]), ...(c.shadows||[])].forEach(x => all.add(x.phrase.toLowerCase())); }
  const dup = [...g, ...s].filter(x => all.has(x.phrase.toLowerCase())).map(x => x.phrase); stat(`phrases unique across the other nine pools (${dup.length} clash${dup.length ? ': ' + dup.join(', ') : ''})`, dup.length === 0);
  console.log('  labels:', g.map(x => x.phrase).join(' / '), ' || ', s.map(x => x.phrase).join(' / '));
  console.log('  original:', orig.gifts.map(x => x.phrase).join(' / '), ' || ', orig.shadows.map(x => x.phrase).join(' / '));
}
if (test === 'T2') {
  const t = out.friction_turn; gate('friction_turn', t, { budget: 35 }); stat('turn opens "Run heavy,"', /^Run heavy,/.test(t || ''));
  for (const pole of ['friction', 'thin', 'excess']) { const c = out.carry?.[pole]; stat(`carry.${pole} present {clause, remedy}`, !!(c && c.clause && c.remedy)); if (c) { gate(`carry.${pole}.clause`, c.clause, { budget: 18 }); gate(`carry.${pole}.remedy`, c.remedy, { budget: 12 }); } }
  const c = out.carry?.friction; if (c && t) { const cut = t.replace(/^Run heavy,\s*/, ''); stat('carry.friction.clause is cut from the turn (turn contains the clause text)', cut.toLowerCase().includes(String(c.clause).toLowerCase().replace(/^the /,'').slice(0, 30)) || t.toLowerCase().includes(String(c.clause).toLowerCase().slice(5, 40))); stat('carry.friction.remedy is the turn\'s directive', t.toLowerCase().includes(String(c.remedy).toLowerCase().replace(/\.$/, '').slice(0, 25))); }
  console.log('  turn:', t); console.log('  original:', orig.friction_turn); console.log('  excess:', JSON.stringify(out.carry?.excess)); console.log('  original excess:', JSON.stringify(orig.carry.excess));
}
if (test === 'T3') {
  stat(`word = "${out.word}" (expected "${orig.word}")`, out.word === orig.word);
  for (const d of ['trait', 'scene', 'outside']) { const t = out.doors?.[d]; stat(`door ${d} present (${wc(t)}w)`, !!t); gate(`door ${d}`, t, { budget: 55, min: 35 }); }
  stat('trait door opens on the trait claim (not on a scene object)', /^(You|Your|[A-Z][a-z]+ing\b|Giving|Making|Feeding|Ease|Output)/.test(out.doors?.trait || ''));
  stat('scene door carries an object or a clock time', /\b(table|kitchen|phone|Tuesday|Thursday|morning|evening|minute|hour|o'clock|dinner|desk|bus|pan|soup|cup|tabs?|notebook|weekend|midnight|noon)\b/i.test(out.doors?.scene || ''));
  stat('outside door opens from other people', /^(People|Friends|Others|Colleagues|Everyone|Nobody|The people|Those|Guests|Your friends|Anyone|Strangers)/.test(out.doors?.outside || ''));
  console.log('  scene:', out.doors?.scene); console.log('  original scene:', orig.doors.scene);
}
if (test === 'T4') {
  gate('reading', out.reading, { budget: 115, min: 80 }); stat('reading opens with the domain declaration', /^This position rules /.test(out.reading || ''));
  gate('teaser', out.teaser, { budget: 30 }); stat('teaser is one or two sentences', (String(out.teaser||'').match(/[.!?]/g) || []).length <= 2);
  const dr = out.domain_readings || {}; stat(`domain keys ${JSON.stringify(Object.keys(dr))} = declared ${JSON.stringify(Object.keys(orig.domain_readings))}`, JSON.stringify(Object.keys(dr).sort()) === JSON.stringify(Object.keys(orig.domain_readings).sort()));
  for (const [k, v] of Object.entries(dr)) gate(`domain ${k}`, v, { budget: 60, min: 35 });
  if (/\b(19|20)\d\d\b|\bat (twenty|thirty|forty|fifty)\b/.test(out.reading || '')) F('reading', 'dated or aged claim');
  console.log('  reading:', out.reading); console.log('  original:', orig.reading);
}
if (test === 'T5') {
  gate('yourNature_desc', out.yourNature_desc, { budget: 75, min: 50, youOpen: true });
  stat('sentence 1 receives the sign image (rain / cloud / water / weather noun)', /^You[^.]*\b(rain|cloud|water|drizzle|mist|weather|shower|dew|drop)\b/i.test(out.yourNature_desc || ''));
  gate('self_card.face', out.self_card?.face, { budget: 8 }); gate('self_card.presence', out.self_card?.presence, { budget: 30 });
  if (/\b(used to|than before|no longer|these days|anymore)\b/i.test(out.yourNature_desc || '')) F('yourNature_desc', 'assumed decline from an earlier self');
  console.log('  desc:', out.yourNature_desc); console.log('  original:', orig.yourNature_desc); console.log('  card:', JSON.stringify(out.self_card)); console.log('  original card:', JSON.stringify(orig.self_card));
}
if (test === 'T6') {
  stat(`domain keys ${JSON.stringify(Object.keys(out))} = ${JSON.stringify(Object.keys(orig))}`, JSON.stringify(Object.keys(out).sort()) === JSON.stringify(Object.keys(orig).sort()));
  for (const [k, v] of Object.entries(out)) { gate(`domain ${k}`, v, { budget: 55, min: 18 }); if (/never be broke|guarantee|always (pays|wins)|will never/i.test(v)) F(k, 'outcome guarantee'); }
  for (const k of Object.keys(out)) console.log(`  ${k}:`, out[k]); console.log('  original Wealth-ish:', JSON.stringify(orig).slice(0, 400));
}
console.log(findings.length ? `  gate findings (${findings.length}):\n   - ` + findings.join('\n   - ') : '  gate findings: none');
