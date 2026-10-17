// M5 gate (owner 2026-10-17, the narrower samples): each keyword belongs to one persona; renamed keywords get three
// new passages in house shape; the Sage keeps the owner's reading (drawn to shelter). node gate.mjs out.json
import fs from 'node:fs'; import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname);
const W = JSON.parse(fs.readFileSync(`${HERE}/worklist.json`, 'utf8')); const out = JSON.parse(fs.readFileSync(path.resolve(process.argv[2]), 'utf8'));
const src = fs.readFileSync(`${HERE}/../../../validate-template.mjs`, 'utf8'); const REMINDER = new RegExp(src.match(/export const REMINDER_FAMILY = \/(.*)\/i;/)[1], 'i');
const sents = (t) => (t.match(/[^.!?]+[.!?]+/g) || []).map((s) => s.trim());
const fails = []; const F = (m) => fails.push(m);
const IMP = /^(Let|Keep|Ask|Take|Give|Make|Pick|Choose|Try|Say|Spend|Set|Put|Hand|Allow|Leave|Stop|Start|Go|Do|Don't|Find|Tell|Trust|Show|Read|Write|Call|Sit|Sleep|Eat|Share|Save|Send|Stay|Wait|Hold|Use|Offer|Finish|Listen|Learn|Rest|Step|Speak|Remember|Notice|Look|Watch)\b/;
const passage = (tag, t, pole, isNew) => {
  const ss = sents(t); const n = t.split(/\s+/).length; const last = ss[ss.length - 1] || '';
  if (n < 30 || n > 45) F(`${tag}: ${n} words (30 to 45)`);
  if (ss.length < 2 || ss.length > 3) F(`${tag}: ${ss.length} sentences (2 to 3)`);
  for (const s of ss) if ((s.match(/,/g) || []).length > 2) F(`${tag}: more than two commas: "${s}"`);
  if (/[—–;:]/.test(t)) F(`${tag}: dash, semicolon or colon`);
  if (/\b(room|verdict)\b/i.test(t)) F(`${tag}: rationed or banned word`);
  if (/[一-鿿]/.test(t) || /\bmore (Wood|Fire|Earth|Metal|Water) (in you )?than\b/.test(t)) F(`${tag}: chart arithmetic or Chinese as the cause`);
  if (isNew && /,\s+so\b|\bso that\b|(^|\. )So\b/.test(t)) F(`${tag}: "X, so Y" frame (owner rejected)`);
  if (/\byou (can|could|may|might)\b/i.test(last)) F(`${tag}: capacity close`);
  if (pole === 'catalyst') {
    if (IMP.test(last) || /^(If|When|Whenever|Once|Until|Unless)\b/.test(last) || /\b(if|once|until|whenever) you\b/i.test(last) || /\b(free|allowed) to\b/i.test(last) || /\b(costs? (you )?(nothing|little|less)|is cheap|changes that)\b/i.test(last)) F(`${tag}: a catalyst close is the gift, the price or the want (M1), not an instruction or a fix: "${last}"`);
    if (REMINDER.test(last)) F(`${tag}: reminder phrase in a catalyst close`);
  }
};
const used = new Set(W.all_keyword_words);
for (const r of W.renames) {
  const o = (out.renames || []).find((x) => x.cell === r.cell && x.pole === r.pole && x.i === r.i); const tag = `${r.cell} ${r.pole}[${r.i}] ${r.persona}`;
  if (!o) { F(`${tag}: missing`); continue; }
  if (r.approved_word && o.word !== r.approved_word) F(`${tag}: use the owner-approved word "${r.approved_word}"`);
  if (!r.approved_word && (used.has(o.word) || o.word === r.word)) F(`${tag}: "${o.word}" is already a keyword somewhere; each keyword belongs to one persona`);
  if (!/^[A-Z][a-z'-]*( [a-z'-]+){0,3}$/.test(o.word || '')) F(`${tag}: keyword is 1 to 4 words, sentence case: "${o.word}"`);
  if (r.approved_drive && o.angles?.drive !== r.approved_drive) F(`${tag}: use the owner-approved drive word for word`);
  for (const a of ['drive', 'cost_self', 'cost_others']) { const t = o.angles?.[a]; if (!t) { F(`${tag} ${a}: missing`); continue; } passage(`${tag} ${a}`, t, r.pole, !(r.approved_drive && a === 'drive')); }
}
const newWords = (out.renames || []).map((x) => x.word); if (new Set(newWords).size !== newWords.length) F('two renames chose the same word');
for (const t of W.texts) {
  const o = (out.texts || []).find((x) => x.key === t.key); if (!o) { F(`${t.key}: missing`); continue; }
  passage(t.key, o.text, /\.catalyst\./.test(t.key) ? 'catalyst' : 'friction', false);
  if (/水_正印/.test(t.key)) { const a = sents(t.text), b = sents(o.text); if (a[0] !== b[0] || a[a.length - 1] !== b[b.length - 1]) F(`${t.key}: change only the middle sentence`); if (/,\s+so\b/.test(b[1] || '')) F(`${t.key}: "X, so Y" in the new middle sentence`); }
}
console.log(`${(out.renames || []).length} renames, ${(out.texts || []).length} texts, ${fails.length} failures`); for (const f of fails) console.log('  ✗ ' + f);
process.exit(fails.length ? 1 : 0);
