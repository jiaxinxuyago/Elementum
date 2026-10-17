// THE PAGE CHECK (REA_20 §3 C, REA_18 §6 step 2): compound readability across one assembled page.
// The owner's standard (2026-10-17): on one page a content word optimally once; no sentence frame, joint,
// opener, close or figure repeated. Counts are reported per page and summarised for the corpus.
//
//   node audit/page-check.mjs <dir>/pages.json [--json]      (pages.mjs runs it too and stamps each page)
//
// Thresholds live in LIMITS so a surface can tune them; a value over its limit is a finding, at the limit a note.
import fs from 'node:fs';
export const LIMITS = { word: 2, joint: 1, opener: 2, close: 1, youShare: 0.4 };
const STOP = new Set('a an the and or but so to of in on at for with by from as is are was were be been being it its this that these those you your yours yourself they them their theirs he she we us our i me my not no nor than then too very just more most less much many few one each every all any some what which who whom when where while how why if into out up down over under again once only own same other such there here can will would should could may might must do does did have has had am about after before because through until also even ever still yet both either neither'.split(' '));
export const JOINTS = ['rather than', 'more than', 'instead of', 'ahead of', 'sooner than', 'so you', 'and you', 'because', 'since', 'until', 'while', 'each time', 'every time', 'feels like', 'like a', 'the way', 'you are allowed to', 'you end up', 'you never', 'remember'];
const stem = (w) => w.toLowerCase().replace(/[^a-z']/g, '').replace(/'s$/, '').replace(/(ing|ed|es|s|ly)$/, '');
const sentences = (t) => String(t || '').trim().split(/(?<=[.!?])\s+/).filter(Boolean);
export function checkPage(pg) {
  const prose = pg.sections.filter((s) => !s.nonProse);
  const text = prose.map((s) => s.text).join(' ');
  const exempt = new Set((pg.exempt || []).join(' ').split(/\s+/).map(stem));
  const cnt = {}; for (const w of text.split(/\s+/)) { const raw = w.toLowerCase().replace(/[^a-z]/g, ''); const s = stem(w); if (!s || s.length < 3 || STOP.has(raw) || exempt.has(s)) continue; cnt[s] = (cnt[s] || 0) + 1; }
  const words = Object.entries(cnt).filter(([, n]) => n > LIMITS.word).sort((a, b) => b[1] - a[1]);
  const low = text.toLowerCase(); const joints = JOINTS.map((j) => [j, (low.match(new RegExp('\\b' + j + '\\b', 'g')) || []).length]).filter(([, n]) => n > LIMITS.joint);
  const sents = prose.flatMap((s) => sentences(s.text));
  const op = {}; for (const s of sents) { const k = s.split(/\s+/).slice(0, 2).join(' ').toLowerCase(); op[k] = (op[k] || 0) + 1; }
  const openers = Object.entries(op).filter(([, n]) => n > LIMITS.opener);
  const cl = {}; for (const s of prose.map((x) => sentences(x.text).slice(-1)[0] || '')) { const k = s.split(/\s+/).slice(0, 2).join(' ').toLowerCase(); cl[k] = (cl[k] || 0) + 1; }
  const closes = Object.entries(cl).filter(([, n]) => n > LIMITS.close);
  const youShare = sents.filter((s) => /^You\b/.test(s)).length / (sents.length || 1);
  const findings = [...words.map(([w, n]) => `word "${w}" ×${n}`), ...joints.map(([j, n]) => `joint "${j}" ×${n}`), ...openers.map(([o, n]) => `opener "${o}" ×${n}`), ...closes.map(([o, n]) => `close "${o} …" ×${n}`), ...(youShare > LIMITS.youShare ? [`"You" opens ${Math.round(youShare * 100)}% of sentences`] : [])];
  return { words: text.split(/\s+/).length, sentences: sents.length, findings, summary: `${text.split(/\s+/).length} words, ${sents.length} sentences; ${findings.length ? findings.join('; ') : 'clean'}` };
}
export function checkPages(pages) { for (const pg of pages) pg.check = checkPage(pg); return summarise(pages); }
export function summarise(pages) {
  const tally = {}; for (const pg of pages) for (const f of pg.check.findings) { const k = f.replace(/ ×\d+.*/, '').replace(/\d+%.*/, ''); tally[k] = (tally[k] || 0) + 1; }
  const clean = pages.filter((p) => !p.check.findings.length).length;
  return { pages: pages.length, clean, top: Object.entries(tally).sort((a, b) => b[1] - a[1]).slice(0, 20) };
}
if (import.meta.url === `file://${process.argv[1]}`) {
  const f = process.argv[2]; if (!f) { console.log('usage: node audit/page-check.mjs <pages.json> [--json]'); process.exit(2); }
  const pages = JSON.parse(fs.readFileSync(f, 'utf8')); const s = checkPages(pages);
  if (process.argv.includes('--json')) fs.writeFileSync(f.replace(/pages\.json$/, 'page-check.json'), JSON.stringify(pages.map((p) => ({ id: p.id, title: p.title, ...p.check })), null, 1));
  console.log(`${s.pages} pages, ${s.clean} clean. Most frequent findings (pages):`); for (const [k, v] of s.top) console.log(`  ${String(v).padStart(4)}  ${k}`);
}
