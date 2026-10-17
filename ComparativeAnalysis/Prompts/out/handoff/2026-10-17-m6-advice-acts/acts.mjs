// The act families of THE ADVICE and THE REMEDY (owner M6, 2026-10-17). Shared by the gate and the counter.
export const FAMILIES = {
  sleep: /\b(sleep|slept|asleep|night|nights|overnight|bed|bedtime|nap)\b/i,
  eat: /\b(eat|eats|meal|meals|lunch|dinner|breakfast|food|cook)\b/i,
  sit: /\b(sit|sits|sitting|seated)\b/i,
  read: /\b(read|reading|chapter|book|books|page)\b/i,
  deadline: /\b(deadline|date|dated|by friday|due)\b/i,
  elder: /\b(older|elder|oldest|someone who has done it|who has done it before)\b/i,
  above: /\b(above you|boss|manager|senior)\b/i,
  child: /\b(child|children|kid|kids)\b/i,
  write: /\b(write|written|writing|note down|notebook|list)\b/i,
  walk: /\b(walk|walking|stroll)\b/i,
  call: /\b(call|phone|ring)\b/i,
  money: /\b(save|savings|spend|budget|sum|account)\b/i,
};
export const sents = (t) => (t.match(/[^.!?]+[.!?]+/g) || []).map((s) => s.trim());
// the act sentences of an advice text: everything from its first imperative on. The diagnosis and, in a remedy, the
// "Seek X" line, the image and the "Let it …" line come first and are not acts.
const DECL = /^(You|Your|Yours|Little|Nothing|What|Whatever|With|Most|Much|Some|Each|It|That|This|There|Whether|Seek|Let it|Wood|Fire|Earth|Metal|Water)\b/;
export const actSentences = (text) => { const ss = sents(text); const i = ss.findIndex((x) => !DECL.test(x)); return i < 0 ? [] : ss.slice(i); };
export const familiesOf = (s) => Object.keys(FAMILIES).filter((f) => FAMILIES[f].test(s));
