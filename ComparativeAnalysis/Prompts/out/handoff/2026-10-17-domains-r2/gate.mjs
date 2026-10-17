// THE DOMAINS gate (owner rulings 2026-10-17, Q1-Q15 A). node gate.mjs <file.json>
// Checks every unit of a domains content file (template.json shape): budgets, punctuation, bans, the domain-only
// prediction law (Q8-Q11: no digits, no dated single event, no illness/death/divorce/sums), no advice (Q15), the
// reader as the subject of the last sentence, and the keys (declared domains, ruling domains, Day/Hour-only ahead).
import fs from 'node:fs'; import path from 'node:path';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../../../..') + '/';
const file = path.resolve(process.argv[2] || 'out.json'); const C = JSON.parse(fs.readFileSync(file, 'utf8'));
const POS = ROOT + 'Reading/Database/templates/by_axis/json/POSITION/';
const RULING = { 比肩: ['Family', 'Growth', 'Social'], 劫财: ['Wealth', 'Social', 'Career'], 食神: ['Health', 'Family', 'Career'], 伤官: ['Mind', 'Career', 'Social'], 偏财: ['Wealth', 'Family', 'Social'], 正财: ['Wealth', 'Family', 'Career'], 七杀: ['Career', 'Health', 'Growth'], 正官: ['Family', 'Social', 'Career'], 偏印: ['Mind', 'Growth', 'Career'], 正印: ['Family', 'Mind', 'Health'] };
const DOMAINS = ['Wealth', 'Health', 'Career', 'Love', 'Family', 'Social', 'Mind', 'Growth'];
const words = (t) => (t.match(/[A-Za-z']+/g) || []).length;
const sents = (t) => (t.match(/[^.!?]+[.!?]+/g) || []).map((s) => s.trim());
const BUDGET = { headline: [3, 12, 1, 1], recognition: [30, 65, 2, 3], lived: [22, 50, 2, 2], ahead: [20, 55, 2, 2], decade: [18, 45, 1, 2], gap: [14, 32, 1, 1], pattern: [14, 32, 1, 1], fused: [10, 24, 1, 1], unruled: [20, 45, 1, 2], reading: [55, 85, 3, 4], defline: [10, 25, 1, 1] };
const BAN = [/[—–;]/, /\b(room|verdict|legitimate|institutional|destiny|destined|fate|fated|karma|cosmic|universe|palace|pillars?|ten gods?|bazi|day master)\b/i,
  /\b(delve|tapestry|testament|pivotal|crucial|intricate|robust|seamless|foster|underscore|showcase|leverage|vibrant|nestled|profound|realm|unlock|elevate|resonat\w*|navigate|landscape|journey)\b/i,
  /\b(trauma|trigger|boundaries|attachment style|regulate)\b/i, /\bahead of\b/i, /,\s+so\b/i, /[一-鿿]/, /\d/, /[$£€%]/,
  /\b(illness|disease|cancer|diagnos\w*|surgery|death|die|dies|died|dying|divorce\w*|miscarr\w*|bankrupt\w*)\b/i,
  /\b(may|might|perhaps|probably|likely)\b/i, /\b(you may feel|tends to|sometimes you|often you)\b/i];
const IMP = /^(Let|Keep|Ask|Take|Give|Make|Pick|Choose|Try|Say|Spend|Set|Put|Hand|Allow|Leave|Stop|Start|Go|Do|Don't|Find|Tell|Trust|Show|Read|Write|Call|Sit|Sleep|Eat|Share|Save|Send|Stay|Wait|Hold|Use|Offer|Finish|Listen|Learn|Rest|Step|Speak|Remember|Notice|Look|Watch|Protect|Guard|Build|Fix|Price|Marry|Audit|Name|Hire|Interview|Emerge|Breach|Join|Attend|Chase|Enter|Declare|Surrender|Loosen|Fund|Back|Claim|Ship|Accept|Close|Translate|Reunite|Train)\b/;
const fails = []; let n = 0;
function check(key, kind, t) {
  n++; const F = (m) => fails.push(`${key} [${kind}]: ${m}`);
  if (typeof t !== 'string' || !t.trim()) return F('missing');
  const [lo, hi, smin, smax] = BUDGET[kind]; const w = words(t), s = sents(t);
  if (w < lo || w > hi) F(`${w} words (${lo}-${hi})`);
  if (s.length < smin || s.length > smax) F(`${s.length} sentences (${smin}-${smax})`);
  if (s.join(' ').length + 1 < t.trim().length - 1) F('text outside a sentence (missing final stop?)');
  for (const re of BAN) { const m = t.match(re); if (m && !(kind === 'defline' && m[0] === ':')) F(`banned "${m[0]}"`); }
  if (kind !== 'defline' && /:/.test(t)) F('colon');
  s.forEach((x, i) => { const c = (x.match(/,/g) || []).length; if (c > 2) F(`sentence ${i + 1} has ${c} commas`); if (IMP.test(x)) F(`sentence ${i + 1} reads as advice (Q15)`); if (/\b(you|your)\b/i.test(x) === false && i === s.length - 1 && kind !== 'defline') F('last sentence has no "you"'); });
  const last = s[s.length - 1] || '';
  const readerLast = /^(\S+ ){0,3}you\b/i.test(last) || /^[^,]{0,45},\s+you\b/.test(last) || /^(Your|What you)\b/.test(last) || /,\s+(and|but)\s+(\S+ ){0,4}you\b/i.test(last);
  if (kind !== 'defline' && kind !== 'headline' && !readerLast && !(C._approved || []).includes(key)) F('the reader is not the subject of the last sentence');
  if (kind !== 'headline' && kind !== 'defline' && words(last) < 5) F('last sentence under five words');
  if (kind === 'ahead' && /\bsince your\b/i.test(t)) F('"since" in a coming beat');
  // round 2 (audit 2026-10-17): no age-naming, no pain words, at most one body part in a Health unit
  if (/\b(old age|to the end|elderly|retire(d|ment)?)\b/i.test(t)) F('names the reader as old (round 2)');
  if (/\b(sore|stiff|aching|aches|ache|pain|painful|injur\w*)\b/i.test(t)) F('pain word (round 2, M4)');
  if (/Health/.test(key)) { const bp = (t.match(/\b(back|shoulders?|neck|knees?|joints?|stomach|chest|head|jaw|skin|heart)\b/gi) || []).length; if (bp > 1) F(`${bp} body parts in a Health unit (round 2: one at most)`); }
  if (kind === 'lived' && /\bwill\b/i.test(t)) F('"will" in a lived beat');
}
for (const [id, seat] of Object.entries(C.seats || {})) {
  let decl = null; try { decl = JSON.parse(fs.readFileSync(POS + id + '.json', 'utf8')).candidates.domains; } catch { fails.push(`${id}: no such POSITION cell`); }
  if (seat.defline !== undefined) check(id, 'defline', seat.defline);
  if (seat.reading !== undefined) check(id, 'reading', seat.reading);
  for (const [d, u] of Object.entries(seat.domains || {})) {
    if (decl && !decl.includes(d)) fails.push(`${id}: ${d} is not a declared domain (${decl})`);
    for (const k of ['headline', 'recognition', 'lived']) check(`${id}.${d}`, k, u[k]);
    const late = /_(day|hour)_/.test(id);
    if (late) check(`${id}.${d}`, 'ahead', u.ahead); else if (u.ahead) fails.push(`${id}.${d}: ahead on a Year or Month seat`);
  }
}
for (const [god, ds] of Object.entries(C.decades || {})) for (const [d, poles] of Object.entries(ds)) {
  if (!RULING[god]?.includes(d)) fails.push(`decade ${god}.${d}: not one of the god's ruling domains`);
  for (const [pole, tenses] of Object.entries(poles)) { if (!['helping', 'heavy'].includes(pole)) fails.push(`decade ${god}.${d}: pole ${pole}`); for (const [tense, t] of Object.entries(tenses)) check(`decade ${god}.${d}.${pole}.${tense}`, 'decade', t); }
}
for (const [d, gs] of Object.entries(C.gaps || {})) for (const [g, t] of Object.entries(gs)) { if (!DOMAINS.includes(d) || !['month', 'day', 'hour'].includes(g)) fails.push(`gap ${d}.${g}: bad key`); check(`gap ${d}.${g}`, 'gap', t); }
const TARGETS = { shishen_zhi_sha: ['Career', 'Health'], shang_guan_pei_yin: ['Career', 'Mind'], xiao_shen_duo_shi: ['Mind', 'Career', 'Health'], shang_guan_jian_guan: ['Career'], sha_yin_xiang_sheng: ['Career', 'Growth', 'Mind'], bi_jie_duo_cai: ['Wealth'], shi_shang_sheng_cai: ['Wealth', 'Career'], cai_guan_xiang_sheng: ['Career', 'Wealth'], guan_yin_xiang_sheng: ['Career', 'Mind'] };
for (const [id, p] of Object.entries(C.patterns || {})) { for (const d of TARGETS[id] || []) check(`pattern ${id}.${d}`, 'pattern', p.readings?.[d]); for (const d of Object.keys(p.readings || {})) if (!(TARGETS[id] || []).includes(d)) fails.push(`pattern ${id}: ${d} is not a target`); check(`pattern ${id}`, 'fused', p.fused_line); }
for (const [d, t] of Object.entries(C.unruled || {})) check(`unruled ${d}`, 'unruled', t);
for (const [d, t] of Object.entries(C.unruledHeadline || {})) check(`unruledHeadline ${d}`, 'headline', t);
// coverage: node gate.mjs out-N.json worklist-N.json
const wl = process.argv[3] ? JSON.parse(fs.readFileSync(path.resolve(process.argv[3]), 'utf8')) : null;
if (Array.isArray(wl)) for (const w of wl) { if (w.current && !w.need) w.need = { domains: Object.fromEntries(Object.entries(w.current.domains || {}).map(([d, u]) => [d, Object.keys(u)])) }; const s = C.seats?.[w.id]; if (!s) { fails.push(`${w.id}: missing seat`); continue; }
  if (!s.defline) fails.push(`${w.id}: missing defline`); if (!s.reading) fails.push(`${w.id}: missing reading`);
  for (const [d, ks] of Object.entries(w.need.domains)) for (const k of ks) if (!s.domains?.[d]?.[k]) fails.push(`${w.id}.${d}: missing ${k}`); }
else if (wl && wl.current) { const cu = wl.current;
  for (const [g, ds] of Object.entries(cu.decades)) for (const [d, ps] of Object.entries(ds)) for (const [p, ts] of Object.entries(ps)) for (const t of Object.keys(ts)) if (!C.decades?.[g]?.[d]?.[p]?.[t]) fails.push(`decade ${g}.${d}.${p}.${t}: missing`);
  for (const [d, gs] of Object.entries(cu.gaps)) for (const g of Object.keys(gs)) if (!C.gaps?.[d]?.[g]) fails.push(`gap ${d}.${g}: missing`);
  for (const d of Object.keys(cu.unruled)) if (!C.unruled?.[d]) fails.push(`unruled ${d}: missing`); for (const d of Object.keys(cu.unruledHeadline)) if (!C.unruledHeadline?.[d]) fails.push(`unruledHeadline ${d}: missing`); }
else if (wl) { for (const x of wl.decades) if (!C.decades?.[x.god]?.[x.domain]?.[x.pole]?.[x.tense]) fails.push(`decade ${x.god}.${x.domain}.${x.pole}.${x.tense}: missing`);
  for (const x of wl.gaps) if (!C.gaps?.[x.domain]?.[x.gate]) fails.push(`gap ${x.domain}.${x.gate}: missing`);
  for (const d of wl.unruled) if (!C.unruled?.[d]) fails.push(`unruled ${d}: missing`); for (const d of wl.unruledHeadline) if (!C.unruledHeadline?.[d]) fails.push(`unruledHeadline ${d}: missing`); }
// no four-word run shared between two units of one seat that can render on the same page: the reading (the seat card)
// with any one domain's units, and that domain's units with each other (lived and ahead never render together); the
// gate-time phrases ("since your late teens", "from your late forties") are the seat's timeline and exempt
for (const [id, seat] of Object.entries(C.seats || {})) {
  const runsOf = (t) => { const ws = (t || '').toLowerCase().match(/[a-z']+/g) || []; const r = new Set(); for (let i = 0; i + 4 <= ws.length; i++) { const x = ws.slice(i, i + 4).join(' '); if (!/\b(teens|twenties|thirties|forties|sixteen)\b/.test(x)) r.add(x); } return r; };
  for (const [d, u] of Object.entries(seat.domains || {})) {
    const page = [['reading', seat.reading], ...['recognition', 'lived', 'ahead'].filter((k) => u[k]).map((k) => [`${d}.${k}`, u[k]])];
    for (let i = 0; i < page.length; i++) for (let j = i + 1; j < page.length; j++) {
      if (/lived$/.test(page[i][0]) && /ahead$/.test(page[j][0])) continue;
      const b = runsOf(page[j][1]); for (const r of runsOf(page[i][1])) if (b.has(r)) fails.push(`${id}: "${r}" in both ${page[i][0]} and ${page[j][0]}`);
    }
  }
}
console.log(`${path.basename(file)}: ${n} units, ${fails.length} failures`); for (const f of fails) console.log('  ✗ ' + f);
process.exit(fails.length ? 1 : 0);
