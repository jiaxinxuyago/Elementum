// THE DEPTH gate (owner P6 A, 2026-10-18): Life Chapters, Stars and the Energy Blueprint. node gate.mjs <file.json>
// A content file is { units: [{ key, kind, page, text }] }. Every unit is checked against its kind's budget, the
// master prompt's punctuation and ban lists, the prediction law (extended to these sections by G1: no digits, no
// hedge, no illness/death/divorce/sums, no advice), the reader as the subject of the last sentence, tense by key
// (.lived never says "will", .coming never says "since your"), chart invariance (a unit names no character but its
// own), and no five-word run shared with another unit on the same page or with the same seat's domain units.
import fs from 'node:fs'; import path from 'node:path';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../../../..') + '/';
const file = path.resolve(process.argv[2] || 'template.json'); const C = JSON.parse(fs.readFileSync(file, 'utf8'));
const words = (t) => (t.match(/[A-Za-z']+/g) || []).length;
const sents = (t) => (t.match(/[^.!?]+[.!?]+/g) || []).map((s) => s.trim());
// [words lo, hi, sentences lo, hi]
const BUDGET = {
  claim: [5, 16, 1, 1], chapter_at: [22, 45, 2, 2], chapter_inside: [16, 40, 1, 2], chapter_day: [30, 60, 2, 3],
  decade_now: [30, 60, 2, 3], decade_line: [14, 35, 1, 2], year_line: [20, 42, 2, 2], year_bond: [12, 30, 1, 1],
  structure: [22, 50, 2, 3], structure_rule: [18, 45, 2, 2], status: [12, 36, 1, 2], rescue: [12, 30, 1, 1],
  strongest: [12, 32, 1, 1], missing: [22, 45, 2, 2], season: [30, 60, 2, 3], seen: [9, 22, 1, 1], seen_close: [6, 16, 1, 1],
  bond: [12, 30, 1, 1], bond_none: [12, 30, 1, 1], pattern_bp: [14, 32, 1, 1],
  star_line: [5, 14, 1, 1], star_reading: [35, 65, 2, 3], star_arriving: [20, 45, 2, 2],
};
const HEADLIKE = new Set(['claim', 'star_line']);
const BAN = [/[—–;]/, /\b(room|verdict|legitimate|institutional|destiny|destined|fate|fated|karma|cosmic|universe|palace|pillars?|ten gods?|bazi|day master|luck)\b/i,
  /\b(delve|tapestry|testament|pivotal|crucial|intricate|robust|seamless|foster|underscore|showcase|leverage|vibrant|nestled|profound|realm|unlock|elevate|resonat\w*|navigate|landscape|journey)\b/i,
  /\b(trauma|trigger|boundaries|attachment style|regulate|nervous system)\b/i, /\bahead of\b/i, /,\s+so\b/i, /[一-鿿]/, /\d/, /[$£€%]/,
  /\b(illness|disease|cancer|diagnos\w*|surgery|death|die|dies|died|dying|divorce\w*|miscarr\w*|bankrupt\w*|accident\w*|curse\w*|doom\w*|misfortune|disaster)\b/i,
  /\b(may|might|perhaps|probably|likely)\b/i, /\b(you may feel|tends to|sometimes you|often you)\b/i,
  /\b(he|she|his|her|hers|him|husband|wife|boyfriend|girlfriend)\b/i,
  /\b(old age|to the end|elderly|retire(d|ment)?|sore|stiff|aching|aches|ache|pain|painful|injur\w*)\b/i];
const IMP = /^(Let|Keep|Ask|Take|Give|Make|Pick|Choose|Try|Say|Spend|Set|Put|Hand|Allow|Leave|Stop|Start|Go|Do|Don't|Find|Tell|Trust|Show|Read|Write|Call|Sit|Sleep|Eat|Share|Save|Send|Stay|Wait|Hold|Use|Offer|Finish|Listen|Learn|Rest|Step|Speak|Remember|Notice|Look|Watch|Protect|Guard|Build|Fix|Price|Marry|Audit|Name|Hire|Join|Chase|Enter|Accept|Close|Expect|Seek|Avoid|Embrace|Welcome|Beware)\b/;
const PERSONAS = { 比肩: 'Twin', 劫财: 'Rival', 食神: 'Artisan', 伤官: 'Virtuoso', 偏财: 'Horizon', 正财: 'Steward', 七杀: 'General', 正官: 'Magistrate', 偏印: 'Alchemist', 正印: 'Sage' };
const GOD_ID = { bijian: '比肩', jiecai: '劫财', shishen: '食神', shangguan: '伤官', piancai: '偏财', zhengcai: '正财', qisha: '七杀', zhengguan: '正官', pianyin: '偏印', zhengyin: '正印' };
const INVARIANT = /^(chapter_|decade_|year_line|star_|seen|missing)/; // shared by every chart that holds the unit
const INSIDE_OPEN = /^(Inside it|Beneath it|Under it|Behind it|Out of sight|In private)\b/;
const fails = []; const units = C.units || [];
function check(u) {
  const { key, kind, text: t } = u; const F = (m) => fails.push(`${key} [${kind}]: ${m}`);
  if (!BUDGET[kind]) return F('unknown kind');
  if (typeof t !== 'string' || !t.trim()) return F('missing');
  const [lo, hi, smin, smax] = BUDGET[kind]; const w = words(t), s = sents(t);
  if (w < lo || w > hi) F(`${w} words (${lo}-${hi})`);
  if (s.length < smin || s.length > smax) F(`${s.length} sentences (${smin}-${smax})`);
  if (s.join(' ').length + 1 < t.trim().length - 1) F('text outside a sentence (missing final stop?)');
  for (const re of BAN) { const m = t.match(re); if (m) F(`banned "${m[0]}"`); }
  if (/:/.test(t)) F('colon');
  s.forEach((x, i) => { const c = (x.match(/,/g) || []).length; if (c > 2) F(`sentence ${i + 1} has ${c} commas`); if (IMP.test(x)) F(`sentence ${i + 1} reads as advice`); });
  const last = s[s.length - 1] || '';
  const readerLast = /^(\S+ ){0,3}you\b/i.test(last) || /^[^,]{0,45},\s+you\b/.test(last) || /^(Your|What you)\b/.test(last) || /,\s+(and|but)\s+(\S+ ){0,2}you\b/i.test(last);
  if (!HEADLIKE.has(kind) && !readerLast && !(C._approved || []).includes(key)) F('the reader is not the subject of the last sentence');
  if (!HEADLIKE.has(kind) && words(last) < 5) F('last sentence under five words');
  if (/\.lived\b/.test(key) && /\bwill\b/i.test(t)) F('"will" in a lived unit');
  if (/\.coming\b/.test(key) && /\bsince your\b/i.test(t)) F('"since" in a coming unit');
  if (kind === 'chapter_inside' && !INSIDE_OPEN.test(t)) F('an inside seat opens with Inside it, Beneath it, Under it, Behind it, Out of sight or In private');
  if (kind === 'chapter_at' && !/^Your (Early|Rising|Late) Chapter\b/.test(t)) F('a stem seat opens its chapter by name');
  if (kind === 'chapter_day' && !/^Your Home Chapter\b/.test(t)) F('the Day seat opens the Home Chapter by name');
  if (INVARIANT.test(kind)) {
    const own = PERSONAS[GOD_ID[(key.match(/^(?:POSITION|GOD) ([a-z]+)/) || [])[1]]];
    for (const p of Object.values(PERSONAS)) if (p !== own && new RegExp(`\\b${p}s?\\b`).test(t)) F(`names the ${p} (chart invariance)`);
  }
}
units.forEach(check);
// no five-word run shared by two units of one page, or by a chapter unit and its seat's domain units
const runs = (t) => { const ws = (t || '').toLowerCase().match(/[a-z']+/g) || []; const r = new Set(); for (let i = 0; i + 5 <= ws.length; i++) { const x = ws.slice(i, i + 5).join(' '); if (!/\b(teens|twenties|thirties|forties|fifties|sixteen)\b/.test(x)) r.add(x); } return r; };
const byPage = {}; for (const u of units) (byPage[u.page] ||= []).push(u);
for (const list of Object.values(byPage)) for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
  const a = runs(list[i].text); for (const x of runs(list[j].text)) if (a.has(x)) { fails.push(`${list[i].key} and ${list[j].key}: shared run "${x}"`); break; }
}
let DOM = null; try { DOM = (await import(ROOT + 'Elementum_App/src/content/domains.js')).DOMAINS_CONTENT; } catch { /* the app content is optional */ }
let POS = null; try { POS = (await import(ROOT + 'Elementum_App/src/content/positions.js')); } catch { /* optional */ }
if (DOM) for (const u of units) {
  const id = (u.key.match(/^POSITION ([a-z_]+) ·/) || [])[1]; if (!id || !DOM.seats?.[id]) continue;
  const mine = runs(u.text);
  for (const [d, du] of Object.entries(DOM.seats[id].domains || {})) for (const [k, t] of Object.entries(du)) for (const x of runs(t)) if (mine.has(x)) { fails.push(`${u.key}: shares "${x}" with its ${d}.${k} domain unit`); break; }
}
if (fails.length) { console.log(fails.join('\n')); console.log(`\n${fails.length} problem(s) across ${units.length} units.`); process.exit(1); }
console.log(`PASS: ${units.length} units clean.`);
