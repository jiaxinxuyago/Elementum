// THE STARS gate (owner round 9 v5 all A, 2026-11-14), extended from THE DEPTH gate (owner P6 A, 2026-10-18). node gate.mjs <file.json>... [--all]
// Stars additions: P3/G0 rules, the gate words per key, tense, the year units' calendar neutrality, no guest named in its own text, and
// across all files given the cap on any one closing opener (R16).
// THE DEPTH gate (owner P6 A, 2026-10-18): Life Chapters, Stars and the Energy Blueprint. node gate.mjs <file.json>
// A content file is { units: [{ key, kind, page, text }] }. Every unit is checked against its kind's budget, the
// master prompt's punctuation and ban lists, the prediction law (extended to these sections by G1: no digits, no
// hedge, no illness/death/divorce/sums, no advice), the reader as the subject of the last sentence, tense by key
// (.lived never says "will", .coming never says "since your"), chart invariance (a unit names no character but its
// own), and no five-word run shared with another unit on the same page or with the same seat's domain units.
import fs from 'node:fs'; import path from 'node:path';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../../../..') + '/';
const files = process.argv.slice(2).filter((a) => !a.startsWith('--')); const C = { units: [], _approved: [] };
for (const f of files) { const d = JSON.parse(fs.readFileSync(path.resolve(f), 'utf8')); C.units.push(...(d.units || [])); C._approved.push(...(d._approved || [])); }
const words = (t) => (t.match(/[A-Za-z']+/g) || []).length;
const sents = (t) => (t.match(/[^.!?]+[.!?]+/g) || []).map((s) => s.trim());
// [words lo, hi, sentences lo, hi]
const BUDGET = {
  claim: [5, 16, 1, 1], chapter_at: [22, 45, 2, 2], chapter_inside: [16, 40, 1, 2], chapter_day: [30, 60, 2, 3],
  decade_now: [30, 60, 2, 3], decade_line: [14, 35, 1, 2], year_line: [20, 42, 2, 2], year_bond: [12, 30, 1, 1],
  structure: [22, 50, 2, 3], structure_rule: [18, 45, 2, 2], status: [12, 36, 1, 2], rescue: [12, 30, 1, 1],
  strongest: [12, 32, 1, 1], missing: [22, 45, 2, 2], season: [30, 60, 2, 3], season_need: [14, 32, 1, 1], seen: [9, 22, 1, 1], seen_close: [6, 16, 1, 1],
  bond: [12, 30, 1, 1], bond_none: [12, 30, 1, 1], pattern_bp: [14, 32, 1, 1],
  star_line: [5, 14, 1, 1], star_reading: [35, 65, 2, 3], star_arriving: [20, 45, 2, 2], star_void: [5, 16, 1, 1],
};
const HEADLIKE = new Set(['claim', 'star_line', 'star_void']);
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
const INVARIANT = /^(chapter_|decade_|year_line|star_|seen|missing|season)/; // shared by every chart that holds the unit
const INSIDE_OPEN = /^(Inside it|Beneath it|Under it|Behind it|Out of sight|In private)\b/;
const fails = []; const units = C.units || [];
// 2026-11-14: PL2 A (pillar 3, no fate or forecast words), R14 A (no "at least once"), R15 A (a star never uses a character's reserved words)
const PL2 = /\b(fate|fated|destiny|destined|lucky|luck|fortune\w*|verdict|expect\w*)\b/i; const R14 = /\b(at least once|more than once|at least one)\b/i;
let VERBS = {}; try { VERBS = JSON.parse(fs.readFileSync(ROOT + 'ComparativeAnalysis/Prompts/out/handoff/2026-11-14-domains-rulings/verbs.json', 'utf8')); } catch { /* optional */ }
const RESERVED = Object.entries(VERBS).filter(([c]) => c[0] !== '_').flatMap(([c, v]) => v.reserved.map((w) => [c, new RegExp(`\\b${w}`, 'i')]));
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
  { let m; if ((m = t.match(PL2))) F(`PL2 "${m[0]}"`); if ((m = t.match(R14))) F(`R14 "${m[0]}"`); }
  if (/^STAR |tpl_stars/.test(key)) for (const [c, re] of RESERVED) if (re.test(t)) F(`R15 uses the ${c}'s reserved word`);
  if (/^STAR |tpl_stars/.test(key)) starChecks(u, F);
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
function starChecks({ key, kind, text: t }, F) {
  const id = (key.match(/^STAR ([a-z]+) ·/) || [])[1]; const tail = key.split(' · ')[1] || '';
  if (/\bsits? in your\b/i.test(t)) F('G0: a guest visits, it never sits in your seat');
  if (/\bseats?\b/i.test(t) && id !== 'kongwang' && !/star_void/.test(key)) F('"seat" belongs to the Empty Seat only');
  for (const n of GUEST_NAMES) if (new RegExp(`\\b${n}\\b`, 'i').test(t)) F(`names a guest ("${n}"); the card shows the name`);
  if (/^arriving\.year$/.test(tail) && /\b(this|next|last) year\b/i.test(t)) F('a year unit reads true for any of five years: no this/next/last year');
  if (tail === 'arriving.decade.now' && !/^(In this decade|This decade)\b/.test(t)) F('a decade-now unit opens "In this decade" or "This decade"');
  if (tail === 'arriving.decade.coming' && !/^(In your next decade|Your next decade)\b/.test(t)) F('a decade-coming unit opens "In your next decade" or "Your next decade"');
  const m = tail.match(/^reading\.(year|month|day|hour)\.(lived|now|coming)$/);
  if (m) {
    if (!GATE_WORDS[m[1]].test(t)) F(`the ${m[1]} gate is not named in words (${GATE_WORDS[m[1]].source})`);
    if (m[2] === 'lived' && !/\b(was|were|had|did|gave|took|made|came|grew|kept|left|ran|knew|felt|learned|learnt|found|spent|got|brought|taught|meant|\w+ed)\b/i.test(t)) F('a lived unit uses the past tense');
    if (m[2] === 'coming' && (t.match(/\bwill\b/gi) || []).length > 1) F('a coming unit uses "will" at most once');
    if (/^(The|This) [A-Z]/.test(t) && /visits your/.test(t)) F('reads like the draft line');
  }
  if (kind === 'star_reading' && !/^STAR [a-z]+ · reading\./.test(key)) F('star_reading kind on a non-reading key');
}
const GUEST_NAMES = ['Noble Helper', 'Bright Scholar', 'Heavenly Guardian', 'Moon Mender', 'Rice Planter', 'Golden Courtier', 'Banner Captain', 'Red Matchmaker', 'Joyful Herald', 'Temple Poet', 'Post Rider', 'Blossom Charmer', 'Ram Warrior', 'Swift Hunter', 'Masked Actor', 'Lone Watcher', 'Quiet Hermit', 'Thunder Champion'];
const GATE_WORDS = {
  year: /\b(first home|Early Chapter|as a child|childhood|growing up|school|younger than|young)\b/i,
  month: /\b(Rising Chapter|teens|twenties|early thirties|working years|first jobs?|study)\b/i,
  day: /\b(Home Chapter|mid-thirties|thirties|partner|home|household)\b/i,
  hour: /\b(Late Chapter|late forties|forties|fifties|later years|people after you)\b/i,
};
units.forEach(check);
// R16 across every file given: no one closing opener (the last sentence's first four words) more than six times among the readings,
// and "You get the most from" at most twelve times in all
{ const op = {}; let most = 0;
  for (const u of units) { if (u.kind !== 'star_reading' && u.kind !== 'star_arriving') continue; const s = sents(u.text); const last = (s[s.length - 1] || '').toLowerCase(); const k = (last.match(/[a-z']+/g) || []).slice(0, 4).join(' '); (op[k] ||= []).push(u.key); if (/^you get the most from/.test(last)) most++; }
  for (const [k, v] of Object.entries(op)) if (v.length > 6) fails.push(`R16: ${v.length} closes open "${k}" (max 6): ${v.slice(0, 4).join(', ')}…`);
  if (most > 12) fails.push(`R16: "You get the most from" closes ${most} units (max 12)`); }
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
