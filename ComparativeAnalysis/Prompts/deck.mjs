// THE DECK BUILDER (first cut, 2026-10-01): a shuffled, sealed questionnaire deck from one handoff round: original vs the candidates (value and value_b), one question per field. Generalise the paths into arguments before the next round.
import fs from 'node:fs';
import path from 'node:path';
const ROOT = '/home/user/Elementum/';
const CAND = ROOT + 'ComparativeAnalysis/Prompts/out/handoff/2026-10-01-geng-golden-v07/fable-v07/';
const ORIG = ROOT + 'ComparativeAnalysis/Handoffs/2026-10-01-geng-golden-v07/benchmark/';
const OUT = ROOT + 'ComparativeAnalysis/Evaluations/handoff-geng-golden-2026-10-01/owner-read/';
const SEED = 20261001;
let s = SEED; const rnd = () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; };
const clean = (v) => (v && typeof v === 'object') ? Object.fromEntries(Object.entries(v).filter(([k]) => k !== '_trace')) : v;
const fmt = (v) => typeof v === 'string' ? v : v.phrase != null ? `phrase: ${v.phrase}  |  dim: ${v.dim}  |  desc: ${v.desc}` : v.word != null ? `word: ${v.word}  |  text: ${v.text}` : `clause: ${v.clause}  |  remedy: ${v.remedy}`;
const pageLabel = { 'P4.geng': 'Day Master page', 'energy.金_土': 'Earth page (your Mind, friction, heavy)', 'energy.金_木': 'Wood page (your Action, catalyst, abundant)', 'energy.金_金': 'Metal page (your Body, friction, heavy)', 'energy.金_水': 'Water page (your Expression, catalyst, thin)', 'energy.金_火': 'Fire page (your Order, catalyst, thin)' };
const order = ['P4.geng', 'energy.金_土', 'energy.金_木', 'energy.金_金', 'energy.金_水', 'energy.金_火'];
const deck = []; const key = {}; let n = 0;
for (const page of order) {
  const c = JSON.parse(fs.readFileSync(CAND + page + '.json', 'utf8'));
  const o = JSON.parse(fs.readFileSync(ORIG + page + '.original.json', 'utf8'));
  for (const [fp, fld] of Object.entries(c.fields)) {
    n++; const id = 'Q' + String(n).padStart(2, '0');
    const spec = fld.spec; const angle = spec.angle ? ` (${spec.angle.replace('_', ' ')}, ${spec.persona || ''})` : '';
    const label = `${pageLabel[page]} · ${fp}${angle} · ${spec.card}`;
    const opts = [{ pile: 'original', text: fmt(clean(o.fields[fp].value)) }, { pile: 'fable-v07', text: fmt(clean(fld.value)) }];
    if (fld.value_b != null) opts.push({ pile: 'fable-v07-b', text: fmt(clean(fld.value_b)) });
    for (let i = opts.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [opts[i], opts[j]] = [opts[j], opts[i]]; }
    const letters = 'ABC'; key[id] = {}; const options = opts.map((x, i) => { key[id][letters[i]] = x.pile; return { letter: letters[i], text: x.text }; });
    deck.push({ id, page, field: fp, label, options });
  }
}
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(OUT + 'deck.json', JSON.stringify(deck, null, 1));
fs.writeFileSync(OUT + 'key.json', JSON.stringify(key, null, 1));
fs.writeFileSync(OUT + 'picks.json', '{}\n');
console.log(deck.length, 'questions;', deck.filter((q) => q.options.length === 3).length, 'with a second candidate');
