// M1 gate (owner 2026-10-17): a catalyst passage closes on the gift at work, its price stated flat, or the want
// under it; never on an instruction, a conditional fix, a lever, a permission or a capacity line.
//   node gate.mjs <out-energy.json>      checks a writer's output against its worklist; prints failures; exit 1 on any
import fs from 'node:fs'; import path from 'node:path'; import { execFileSync } from 'node:child_process';
const HERE = path.dirname(new URL(import.meta.url).pathname);
const outFile = process.argv[2]; const out = JSON.parse(fs.readFileSync(outFile, 'utf8'));
const energy = path.basename(outFile).replace(/^out-|\.json$/g, '');
const work = JSON.parse(fs.readFileSync(`${HERE}/worklist-${energy}.json`, 'utf8'));
const src = fs.readFileSync(`${HERE}/../../../validate-template.mjs`, 'utf8');
const REMINDER = new RegExp(src.match(/export const REMINDER_FAMILY = \/(.*)\/i;/)[1], 'i');
const IMPERATIVE = /^(Let|Keep|Ask|Take|Give|Make|Pick|Choose|Try|Say|Spend|Set|Put|Hand|Allow|Leave|Stop|Start|Go|Do|Don't|Find|Tell|Trust|Show|Read|Write|Call|Sit|Sleep|Eat|Book|Bring|Share|Save|Send|Name|Own|Stay|Wait|Move|Count|Check|Plan|Hold|Use|Add|Offer|Open|Close|Finish|Lead|Follow|Listen|Learn|Teach|Build|Rest|Step|Slow|Speak|Pitch|Accept|Forgive|Notice|Remember|Mind|Note|Look|See|Watch|Turn|Treat|Practise|Practice|Protect|Shelter|Help|Guard|Spare)\b/;
const BANS = [
  [/^(If|When|Whenever|Once|Until|Unless|Before|After|Each time|Every time|The more|The sooner|The less)\b/, 'conditional opener'],
  [/\b(if|once|until|whenever|unless) you\b/i, 'conditional fix'],
  [/\b(each|every) time you (let|ask|give|take|share|hand|choose|pick)\b/i, 'conditional lever'],
  [/\byou (can|could|may|might)\b/i, 'capacity close'],
  [/\b(are|is|feel) (free|allowed|welcome) to\b/i, 'permission close'],
  [/\b(changes that|is cheap|are cheap|costs? (you )?(nothing|little|less)|would (halve|hand|give|repay|buy))\b/i, 'lever on a cost'],
  [/\bthe (more|sooner|less)\b.*\bthe (more|sooner|less)\b/i, 'lever'],
  [/\bone (\w+ )?(a|each|every|per) (week|month|year|day|night|evening|season)\b/i, 'dosed act'],
  [/\b(rather than|instead of|ahead of|in place of|sooner than)\b/i, 'comparison in the close (M3)'],
  [/\b(sleep|slept|bed|bedtime)\b|\brest\b(?! of)/i, 'rest as the cost (M6)'],
  [/[—–;:]/, 'dash, semicolon or colon'],
  [/,\s+so\b|^So\b|\bso that\b/i, '"X, so Y" frame (owner 2026-10-17: rejected as the repeated structure)'],
];
const fails = []; const byKey = new Map(out.map((o) => [o.key, o])); const fixes = [];
for (const c of work.cells) {
  const closes = [];
  for (const r of c.catalyst_rows) for (const p of r.passages) {
    const o = byKey.get(p.key); if (!o) { fails.push(`${p.key}: missing from output`); continue; }
    const close = (o.decision === 'keep' ? p.close : (o.close || '')).trim();
    const tag = `${p.key} [${o.decision}]`;
    if (!/^[A-Z].*[.]$/.test(close) || (close.match(/[.!?]/g) || []).length !== 1) fails.push(`${tag}: the close must be one sentence ending in a full stop: "${close}"`);
    if (IMPERATIVE.test(close)) fails.push(`${tag}: imperative opener: "${close}"`);
    for (const [re, why] of BANS) if (re.test(close)) fails.push(`${tag}: ${why}: "${close}"`);
    if (REMINDER.test(close)) fails.push(`${tag}: reminder-family phrase: "${close}"`);
    if (!/\b(you|your|yours|yourself)\b/i.test(close)) fails.push(`${tag}: the reader is not in the close: "${close}"`);
    if (!['gift', 'price', 'want'].includes(o.kind)) fails.push(`${tag}: kind must be gift, price or want`);
    if (o.decision === 'rewrite') fixes.push({ key: p.key, text: `${p.keep_as_is} ${close}`, id: `${p.key} (${o.kind})` });
    closes.push({ key: p.key, close });
  }
  const seen = new Map();
  for (const x of closes) { const h = x.close.toLowerCase().split(/\s+/).slice(0, 3).join(' '); if (seen.has(h)) fails.push(`${c.cell}: two closes open the same way ("${h}…"): ${seen.get(h)} and ${x.key}`); else seen.set(h, x.key); }
}
const fixFile = path.resolve(outFile.replace(/\.json$/, '.fixes.json')); fs.writeFileSync(fixFile, JSON.stringify(fixes, null, 1));
// house limits on the assembled passage (word count, sentences, commas, dashes) via the audit kit's applier, dry
let dry = '';
try { dry = execFileSync('node', [`${HERE}/../../../audit/apply-fixes.mjs`, fixFile, '--by', 'm1-gate', '--ruling', 'dry', '--dry'], { cwd: `${HERE}/../../../../..`, encoding: 'utf8' }); } catch (e) { dry = String(e.stdout || '') + String(e.stderr || ''); }
for (const line of dry.split('\n')) if (/skipped/.test(line) && !/^DRY/.test(line)) fails.push(`house limit: ${line.trim()}`);
console.log(`${energy}: ${out.length} entries, ${fixes.length} rewrites, ${fails.length} failures`);
for (const f of fails) console.log('  ✗ ' + f);
process.exit(fails.length ? 1 : 0);
