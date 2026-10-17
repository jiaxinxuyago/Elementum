import fs from 'node:fs'; import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname); const ROOT = path.resolve(HERE, '../../../../..') + '/';
const { K2_CELLS } = await import(ROOT + 'Elementum_App/src/content/k2.js');
const P = { 比肩: 'the Twin', 劫财: 'the Rival', 食神: 'the Artisan', 伤官: 'the Virtuoso', 偏财: 'the Horizon', 正财: 'the Steward', 七杀: 'the General', 正官: 'the Magistrate', 偏印: 'the Alchemist', 正印: 'the Sage' };
const row = (cell, pole, i) => { const c = K2_CELLS[cell]; const r = c.fnReading[pole].ledger[i]; return { cell, persona: P[cell.split('_')[1]], pole, i, word: r.word, angles: r.angles, cell_keywords: { catalyst: c.fnReading.catalyst.ledger.map((x) => x.word), friction: c.fnReading.friction.ledger.map((x) => x.word) } }; };
const RENAME = [
  ['火_正官', 'friction', 2, 'Never says no is the Artisan\'s keyword (Wood, Fire).'],
  ['金_正财', 'catalyst', 2, 'Keeps your word is the Magistrate\'s keyword (Wood, Metal).'],
  ['木_偏印', 'catalyst', 2, 'Sleeps on it is the Steward\'s keyword (Water).'],
  ['金_偏财', 'catalyst', 2, 'Gives freely is the Artisan\'s keyword (Fire).'],
  ['土_正印', 'friction', 0, 'Plays it safe is the Steward\'s keyword (Fire, Metal). Write it to the owner\'s reading of the Sage: drawn to shelter, or shelter comes to them.'],
  ['水_正官', 'friction', 0, 'Plays it safe is the Steward\'s keyword. Owner-approved new word: "Holds the yes" (use it).'],
  ['土_七杀', 'friction', 2, 'Shuts people out is the Twin\'s keyword (Earth). The General drifted into the Twin\'s withdrawal here; write the General (takes charge, hard on yourself, never off duty).'],
  ['土_食神', 'catalyst', 1, 'Makes things last is the Steward\'s keyword (Earth). The auditor proposed "Unhurried" for the Artisan, the one who enjoys the making.'],
  ['水_比肩', 'friction', 0, 'Hard to reach is the Alchemist\'s keyword (Earth, Metal, Water).'],
  ['金_食神', 'catalyst', 0, 'Finishes things is the Steward\'s keyword (Metal). The Artisan on Metal had drifted into a perfectionist; write the Artisan (makes and gives with ease and enjoyment).'],
  ['金_正印', 'friction', 2, '"Loves by correcting" is neither side of the Sage. Owner-approved new word "Waits to be told" with an approved drive (in approved_drive); write cost_self and cost_others to match.'],
].map(([c, p, i, why]) => ({ ...row(c, p, i), why, ...(c === '金_正印' ? { approved_word: 'Waits to be told', approved_drive: 'You wait to be told before you trust your own read. A word from someone wiser feels like cover, and you keep asking long after you know. You hand your best judgement to people who know less than you do.' } : c === '水_正官' ? { approved_word: 'Holds the yes' } : {}) }));
const TEXTS = [
  ['金_正印', 'catalyst', 2, 'cost_others', 'The Sage on Metal turns into a corrector here ("hand the one who came for comfort a lesson"). Rewrite the first two sentences to the owner\'s reading of the Sage; the close (from M1) may stay if it still fits.'],
  ['水_正印', 'friction', 2, 'drive', 'This page also shows "Lets it drift" and "Stays sheltered". Link them as the owner approved for the Fire Sage: protecting others is the outer act of someone who wants shelter. Change only the middle sentence, e.g. "Feeling safe is what you want most, and you shelter them the way you wish to be sheltered." The friction close may stay.'],
].map(([c, p, i, a, why]) => ({ key: `K2 ${c} · fn_reading.${p}.ledger[${i}].angles.${a}`, text: K2_CELLS[c].fnReading[p].ledger[i].angles[a], why, persona: P[c.split('_')[1]] }));
const all = new Set(); for (const c of Object.values(K2_CELLS)) for (const p of ['catalyst', 'friction']) for (const r of c.fnReading?.[p]?.ledger || []) all.add(r.word);
fs.writeFileSync(`${HERE}/worklist.json`, JSON.stringify({ renames: RENAME, texts: TEXTS, all_keyword_words: [...all].sort() }, null, 1));
console.log(RENAME.length, 'renames', TEXTS.length, 'texts');
