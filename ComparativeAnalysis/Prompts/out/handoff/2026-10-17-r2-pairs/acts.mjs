// Act families by meaning (owner R2-5, 2026-10-17). OLD = the round-1 M6 families (kept, per core); MEANING = counted per reader set.
export { FAMILIES as OLD } from '../2026-10-17-m6-advice-acts/acts.mjs';
export const MEANING = {
  learn: /\b(class|course|workshop|lesson|learn|skill|study|teach yourself)\b/i,
  finish: /\b(finish|complete|see it through|to (its|an|the) end|carry [^.]{0,30} to)\b/i,
  tell: /\b(tell|share|post|announce|present|out loud)\b/i,
  slot: /\b(each week|every week|weekly|once a week|same (day|hour|time)|fixed (hour|time|slot)|each morning|every morning|daily|every day|each day)\b/i,
  plant: /\b(plant|seed|garden|herbs?)\b/i,
  cut: /\b(drop|cut|cancel|turn down|clear out|give away|say no|let go of)\b/i,
  choose: /\b(choose|pick|decide)\b/i,
  attend: /\b(go to|attend|concert|exhibition|gig|museum|a talk|a show)\b/i,
  give: /\b(give|pass on|hand)\b/i,
  ask: /\b(ask)\b/i,
  rest: /\b(rest|day off|no work|nothing planned|no plans?|no messages)\b/i,
  train: /\b(train|training|swim|climb|run|coach|gym)\b/i,
};
export const LIMIT = { choose: 2, give: 2, ask: 2 };
export const sents = (t) => (t.match(/[^.!?]+[.!?]+/g) || []).map((s) => s.trim());
const DECL = /^(You|Your|Yours|Little|Nothing|What|Whatever|With|Most|Much|Some|Each|Every|It|That|This|There|Whether|Seek|Let it|Wood|Fire|Earth|Metal|Water|Holding|The|Answering|Being|Few|Too|One side|Strength|Over)\b/;
export const actSentences = (text) => { const ss = sents(text); const i = ss.findIndex((x) => !DECL.test(x)); return i < 0 ? [] : ss.slice(i); };
export const fams = (s, table) => Object.keys(table).filter((f) => table[f].test(s));
