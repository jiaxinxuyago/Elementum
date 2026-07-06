// ===================================================================
// ELEMENTUM · reading-content review + journey replicant generator
// ===================================================================
// Reads the *actual* reading-data modules and emits two review artifacts:
//   1. Documents/Designengineering/READING_CONTENT_REVIEW.md   (owner review)
//   2. Documents/Designengineering/reading-replicant.html      (journey mockup)
// Both are GENERATED — never hand-edit them. Edit the source data files
// (d13FacesContent.js, tgNames.js) and re-run:  node tools/build-reading-review.mjs
//
// The persona/card/brief copy is read verbatim from the data, so the review
// and the replicant can never drift from what the app ships. The element-page
// (P11) R/X is COMPOSED in the component at runtime; that composition is
// mirrored here (see composeElement) for a sample Metal Day Master.
// ===================================================================

import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { TG_PERSONA } from '../src/content/tgNames.js';
import {
  FACE_CARD, PERSONA_READING, PERSONA_DOMAINS,
  FAMILY_BRIEF, FAMILY_CLAUSE, FAMILY_ELEMENT,
} from '../src/components/d13/d13FacesContent.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, '../../Documents/Designengineering');
// Live art base, single-sourced from site.config.json — so the replicant shows real portraits when online.
const ART_BASE = JSON.parse(readFileSync(new URL('../site.config.json', import.meta.url), 'utf8')).liveUrl;

const CAP = { metal: 'Metal', earth: 'Earth', water: 'Water', wood: 'Wood', fire: 'Fire' };
const ZH = { metal: '金', earth: '土', water: '水', wood: '木', fire: '火' };
const GEN = { wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood' };
const CTL = { wood: 'earth', earth: 'water', water: 'fire', fire: 'metal', metal: 'wood' };

// The deliverable authored Wood end-to-end; those two personas are verbatim.
const VERBATIM = new Set(['正财', '偏财']);

// Sample journey for a yang-Metal Day Master (matches the deliverable's DM).
// Each element carries its Ten-God family's two polarity faces. lead = gods[0].
const JOURNEY = [
  { el: 'metal', fam: '比劫 · self',      gods: ['比肩', '劫财'], role: 'core',     presence: 34 },
  { el: 'earth', fam: '印 · resource',    gods: ['正印', '偏印'], role: 'catalyst', presence: 22 },
  { el: 'water', fam: '食伤 · output',    gods: ['食神', '伤官'], role: null,       presence: 20 },
  { el: 'wood',  fam: '财 · wealth',      gods: ['正财', '偏财'], role: 'friction', presence: 16 },
  { el: 'fire',  fam: '官杀 · authority', gods: ['正官', '七杀'], role: null,       presence: 8 },
];
const DM = 'metal';
const byGod = {}; // god → { el, role, presence, isLead, polarity }
JOURNEY.forEach((s) => s.gods.forEach((g, i) => {
  byGod[g] = { el: s.el, role: s.role, presence: s.presence, isLead: i === 0, polarity: i === 0 ? 'yang' : 'yin' };
}));

const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ── mirror of D13FacesScreen.readingBadges + element composition ──────────
function readingBadges(el, role, leadGod, presence) {
  const ghost = presence <= 3;
  const roleB = role === 'core' ? { t: 'your core', c: '' }
    : role === 'catalyst' ? { t: '↑ your catalyst', c: 'up' }
    : role === 'friction' ? { t: '↓ your friction', c: 'down' }
    : ghost ? { t: 'scarce in you', c: '' } : null;
  const domain = (FAMILY_BRIEF[leadGod] || '').replace(/^your /, '');
  return [roleB, domain ? { t: domain, c: '' } : null].filter(Boolean);
}
function composeElement(el, leadGod, role, presence) {
  const Element = CAP[el];
  const fam = FAMILY_ELEMENT[leadGod] || {};
  const appetite = fam.appetite || 'what this energy reaches for';
  const notAlone = fam.notAlone || 'not one thing alone, but everything it touches';
  const ledeBold = FAMILY_BRIEF[leadGod] || Element;
  const presenceClause = presence >= 25 ? 'the loudest voice in it' : presence > 3 ? 'a real current in it' : 'a faint thread in it';
  const roleSentence = role === 'catalyst'
    ? `As your catalyst, it lifts you rather than drains you — the part of you that reaches for ${appetite}.`
    : role === 'friction'
      ? `As your friction, it presses on you more than it lifts — the part of you that wrestles with ${appetite}.`
      : role === 'core'
        ? `It is your core, the lens the rest are read through — the part of you that carries ${appetite}.`
        : `It runs quietly alongside the rest — the part of you that still reaches for ${appetite}.`;
  const cycle = GEN[el] === DM ? `${Element} feeds your ${CAP[DM]} self — it is the resource your nature draws on.`
    : GEN[DM] === el ? `Your ${CAP[DM]} self feeds ${Element} — it is what flows out of you.`
    : CTL[DM] === el ? `Your ${CAP[DM]} self shapes ${Element} — it is the material your nature is for.`
    : CTL[el] === DM ? `${Element} presses on your ${CAP[DM]} self — it is the force that tests you.`
    : `${Element} runs alongside your ${CAP[DM]} self — it is your own register.`;
  return {
    lede: `${Element} is <b>${esc(ledeBold)}</b> — ${esc((FAMILY_CLAUSE[leadGod] || 'the current running through you'))}.`,
    p1: `${Element} runs ${presence}% of your chart — ${presenceClause}. ${roleSentence}`,
    p2: `In the language of the chart, this is ${ledeBold} — ${notAlone}.`,
    x: `${cycle} The two faces below are the two ways that material speaks — one reaching outward for the new, one holding and compounding what’s already yours.`,
  };
}

// ============================ MARKDOWN ============================
function buildMarkdown() {
  const L = [];
  L.push('# Reading Content — Owner Review');
  L.push('');
  L.push('> **Generated** by `Elementum_App/tools/build-reading-review.mjs` — do **not** hand-edit.');
  L.push('> Edit the source data (`d13FacesContent.js`, `tgNames.js`) and re-run the script.');
  L.push('> Companion visual: [`reading-replicant.html`](reading-replicant.html) (open in a browser).');
  L.push('');
  L.push('**Legend** — ✅ persona **reading** (R/X + lede + pull) is verbatim from the deliverable · ✍️ Claude-authored, **needs your review**.');
  L.push('');
  L.push('> ⚠ **Card teasers were enriched for _all_ ten personas this pass** (the deliverable\'s were ~2 sentences; grown to 3–4). So even the ✅ personas\' teasers, the element briefs, and the composed element pages are new copy worth a read.');
  L.push('');
  L.push('---');
  L.push('');
  L.push('## 0 · Where the reading data lives (architecture audit)');
  L.push('');
  L.push('The reading **data is pure** (no engine/React deps — every file below is Node-importable), but it is **not yet a single library** — it is split between `src/content/` and `src/components/d13/`, and `d13ReadingResolve.js` mixes data maps with resolve logic. Consolidating into one `content/reading/` library with barrels is **Phase 4 of `ARCH_CLEANUP_AUDIT.md` — deferred, pending your approval** (strictly behavior-preserving). So: the separation you expected is **not done yet**; the data is clean and extractable, just scattered.');
  L.push('');
  L.push('| File | Exports (reading data) | Keyed by | Pure? |');
  L.push('|---|---|---|---|');
  L.push('| `components/d13/d13FacesContent.js` | `FACE_CARD`, `PERSONA_READING`, `PERSONA_DOMAINS`, `FAMILY_BRIEF`, `FAMILY_CLAUSE`, `FAMILY_ELEMENT` | Ten-God 汉字 / family | ✅ pure |');
  L.push('| `content/tgNames.js` | `TG_PERSONA` (persona display names) | Ten-God 汉字 | ✅ pure |');
  L.push('| `components/d13/d13ReadingContent.js` | `ENERGY_CONTENT` (per-element fallback) | element | ✅ pure |');
  L.push('| `components/d13/d13ReadingResolve.js` | `PERSONA_COPY`, `FACE_ABSTRACT`, `DOMAIN_BY_GOD` + `resolve*()` | Ten-God 汉字 | ⚠ data+logic (imports engine) |');
  L.push('| `content/archetypeSource.js` | `STEM_CARD_DATA`, `TG_CARD_DATA` (base corpus) | stem / Ten-God | ✅ pure |');
  L.push('');
  L.push('This document + replicant cover the **FACES reading layer** (`d13FacesContent.js` + `tgNames.js`) — the copy enriched in this pass. The Day-Master (stem) corpus in `archetypeSource.js` is a separate review.');
  L.push('');
  L.push('---');
  L.push('');
  L.push('## 1 · Element briefs (P6–P10 · the dominant-energy card)');
  L.push('');
  L.push('_The one-line brief shown on each element\'s FACES page. Same for any Day Master with that element in that family role._');
  L.push('');
  L.push('| Element (for a Metal DM) | Brief |');
  L.push('|---|---|');
  JOURNEY.forEach((s) => {
    const lead = s.gods[0];
    const brief = `${CAP[s.el]} is **${FAMILY_BRIEF[lead]}**${FAMILY_CLAUSE[lead] ? ` — ${FAMILY_CLAUSE[lead]}` : ''}.`;
    L.push(`| **${CAP[s.el]}** ${ZH[s.el]} · ${s.fam} | ${brief} |`);
  });
  L.push('');
  L.push('---');
  L.push('');
  L.push('## 2 · The 10 personas (P12/P13 full readings + P6–P10 card teasers)');
  L.push('');
  const order = ['正财', '偏财', '比肩', '劫财', '正印', '偏印', '食神', '伤官', '七杀', '正官'];
  order.forEach((g) => {
    const card = FACE_CARD[g] || {};
    const rd = PERSONA_READING[g] || {};
    const b = byGod[g] || {};
    const tag = VERBATIM.has(g) ? '✅ verbatim' : '✍️ authored — review';
    L.push(`### ${TG_PERSONA[g]} · ${g}  — ${tag}`);
    L.push(`*Rules: ${card.ruleT} — ${card.ruleB}*  ·  keywords: ${(card.kw || []).join(' · ')}`);
    L.push('');
    L.push(`**Card teaser** (P6–P10):`);
    L.push(`> ${card.teaser || '—'}`);
    L.push('');
    L.push(`**Reading page** (lede tail): _…wears the face of ${TG_PERSONA[g]} — ${rd.ledeTail || '—'}._`);
    L.push('');
    L.push(`**What it says about you · R:**`);
    (rd.r || []).forEach((p) => { L.push(`> ${p}`); L.push('>'); });
    if (rd.pull) L.push(`> _${rd.pull}_`);
    L.push('');
    L.push(`**What to do with it · X:** ${rd.x || '—'}`);
    const dom = PERSONA_DOMAINS[g];
    if (dom) {
      L.push('');
      L.push(`**Life domains** (${dom.domains.length}): ${dom.domains.map((d) => d.name + (d.locked ? ' 🔒' : '')).join(' · ')}`);
      dom.domains.forEach((d) => L.push(`- **${d.name}**${d.locked ? ' _(Seeker)_' : ''} — ${d.tease}`));
      L.push(`- _Gate:_ ${dom.gateLabel} — ${dom.gateBody}`);
    }
    L.push('');
    L.push('---');
    L.push('');
  });
  return L.join('\n');
}

// ============================ HTML REPLICANT ============================
const CSS = `
:root{--silk:#f4eedf;--silkDeep:#e8dfc9;--ink:#2b2722;--inkSoft:#6b6355;--line:#d9cfb6;
--wood:#7c8a4f;--woodDeep:#55632f;--fire:#b5643f;--fireDeep:#8a3f22;--earth:#b79a5a;--earthDeep:#8a6d33;
--metal:#9a9488;--metalDeep:#6b6459;--water:#5b7d8a;--waterDeep:#37525c;--up:#55632f;--down:#8a3f22;}
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#ece4d0;color:var(--ink);font-family:Georgia,'Songti SC',serif;padding:32px 16px 80px;-webkit-font-smoothing:antialiased;}
h1.page{font-size:26px;text-align:center;margin-bottom:4px;}
.sub{text-align:center;color:var(--inkSoft);font-size:13px;margin-bottom:6px;}
.legend{text-align:center;color:var(--inkSoft);font-size:12px;margin-bottom:28px;}
.rail{display:flex;gap:20px;overflow-x:auto;padding:14px 6px 26px;align-items:flex-start;scroll-snap-type:x proximity;}
.rail-title{max-width:1180px;margin:34px auto 0;font-size:15px;letter-spacing:.14em;text-transform:uppercase;color:var(--inkSoft);border-top:1px solid var(--line);padding-top:20px;}
.rail-note{max-width:1180px;margin:2px auto 0;font-size:12.5px;color:var(--inkSoft);}
.phone{flex:0 0 330px;scroll-snap-align:start;background:var(--silk);border:10px solid #1c1a17;border-radius:38px;height:690px;overflow:hidden;position:relative;box-shadow:0 12px 30px rgba(0,0,0,.18);}
.tag{position:absolute;top:8px;left:50%;transform:translateX(-50%);z-index:5;font-family:ui-sans-serif,system-ui;font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:#fff;background:rgba(28,26,23,.62);padding:3px 9px;border-radius:20px;white-space:nowrap;}
.pad{position:absolute;inset:0;overflow-y:auto;padding:52px 18px 26px;}
.eyebrow{font-family:ui-sans-serif,system-ui;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--inkSoft);margin-bottom:14px;}
.hero{position:relative;height:132px;border-radius:16px;overflow:hidden;margin-bottom:12px;background:linear-gradient(120deg,var(--silkDeep),#cfc4a6);}
.hero img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.9);}
.hero .hc{position:absolute;left:14px;bottom:11px;right:14px;}
.reye{font-family:ui-sans-serif,system-ui;font-size:9.5px;letter-spacing:.11em;text-transform:uppercase;color:#40382c;margin-bottom:3px;text-shadow:0 1px 6px rgba(244,238,223,.9);}
.htitle{font-size:23px;line-height:1.05;color:var(--ink);}
.badges{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:12px;}
.rb{font-family:ui-sans-serif,system-ui;font-size:10.5px;letter-spacing:.02em;border:1px solid var(--line);border-radius:20px;padding:4px 11px;color:var(--inkSoft);}
.rb.up{color:var(--up);border-color:color-mix(in srgb,var(--up) 40%,var(--line));}
.rb.down{color:var(--down);border-color:color-mix(in srgb,var(--down) 40%,var(--line));}
.lede{font-size:16px;line-height:1.42;margin:2px 0 14px;}
.lede b{font-weight:400;color:var(--pigDeep,var(--ink));border-bottom:2px solid color-mix(in srgb,var(--pig,var(--line)) 60%,transparent);}
.layer{background:#fbf7ec;border:1px solid var(--line);border-radius:14px;padding:13px 14px;margin-bottom:11px;}
.layer.tinted{background:color-mix(in srgb,var(--pig,var(--silkDeep)) 8%,#fbf7ec);border-color:color-mix(in srgb,var(--pig,var(--line)) 28%,transparent);}
.ll{font-family:ui-sans-serif,system-ui;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--pigDeep,var(--inkSoft));margin-bottom:7px;}
.layer p{font-size:13.5px;line-height:1.5;color:#3f3a31;margin-bottom:8px;}
.layer p:last-of-type{margin-bottom:0;}
.pull{display:block;font-style:italic;font-size:13.5px;line-height:1.45;color:var(--pigDeep,var(--inkSoft));border-top:1px solid var(--line);margin-top:9px;padding-top:9px;}
.sec-head{display:flex;justify-content:space-between;align-items:baseline;margin:16px 2px 3px;}
.sec-head .t{font-size:16px;}.sec-head .k{font-family:ui-sans-serif,system-ui;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--inkSoft);}
.sec-sub{font-size:12.5px;color:var(--inkSoft);margin:0 2px 10px;line-height:1.4;}
.dd{display:flex;gap:11px;align-items:flex-start;background:#fbf7ec;border:1px solid var(--line);border-radius:13px;padding:11px 12px;margin-bottom:9px;}
.dd.locked{opacity:.7;}
.dd .ic{flex:0 0 30px;height:30px;border-radius:9px;display:grid;place-items:center;background:color-mix(in srgb,var(--pig,var(--silkDeep)) 22%,#fff);color:var(--pigDeep,var(--inkSoft));font-family:ui-sans-serif,system-ui;font-size:13px;}
.dd .nm{font-size:14px;display:block;margin-bottom:2px;}
.dd .tz{font-size:11.5px;color:var(--inkSoft);line-height:1.35;}
.gate{display:flex;gap:11px;background:#f0e7d2;border:1px dashed color-mix(in srgb,var(--metalDeep) 40%,var(--line));border-radius:13px;padding:12px;margin-top:6px;}
.gate .gl{flex:0 0 26px;height:26px;border-radius:50%;display:grid;place-items:center;background:#e2d7bd;font-size:12px;}
.gate .ll{margin-bottom:4px;}.gate p{font-size:12px;color:var(--inkSoft);line-height:1.4;}
.fd{background:#fbf7ec;border:1px solid var(--line);border-radius:16px;padding:14px;margin-bottom:16px;}
.fd .top{display:flex;align-items:center;gap:11px;margin-bottom:3px;}
.fd .mk{flex:0 0 40px;height:40px;border-radius:11px;background:color-mix(in srgb,var(--pig,var(--silkDeep)) 22%,#fff);display:grid;place-items:center;font-size:18px;color:var(--pigDeep);}
.fd .nm{font-size:19px;}.fd .zh{color:var(--inkSoft);font-size:15px;}
.fd .role{margin-left:auto;}
.fd-brief{font-size:13px;line-height:1.5;color:var(--inkSoft);margin-top:11px;}
.caps{font-family:ui-sans-serif,system-ui;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--inkSoft);margin:14px 0 9px;}
.fc{background:#fbf7ec;border:1px solid var(--line);border-radius:15px;overflow:hidden;margin-bottom:12px;}
.fc .art{height:120px;position:relative;background:linear-gradient(120deg,var(--silkDeep),#d3c8aa);}
.fc .art img{width:100%;height:100%;object-fit:cover;}
.fc .art .flag{position:absolute;top:9px;right:9px;font-family:ui-sans-serif,system-ui;font-size:9px;letter-spacing:.1em;text-transform:uppercase;background:var(--pigDeep,#555);color:#fff;padding:3px 8px;border-radius:14px;}
.fc .bd{padding:12px 13px 14px;}
.fc .pn{font-size:18px;margin-bottom:8px;}
.fc .kw{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:9px;}
.fc .kw span{font-family:ui-sans-serif,system-ui;font-size:10px;letter-spacing:.02em;background:color-mix(in srgb,var(--pig,var(--silkDeep)) 16%,#fff);border:1px solid var(--line);border-radius:14px;padding:3px 9px;color:var(--inkSoft);}
.zlabel{font-family:ui-sans-serif,system-ui;font-size:9px;letter-spacing:.13em;text-transform:uppercase;color:var(--inkSoft);margin:8px 0 3px;}
.zdom{font-size:13px;}.zdom b{color:var(--pigDeep);}
.zteaser{font-size:12.5px;line-height:1.45;color:#3f3a31;margin-top:3px;}
.dk-metal{--pig:var(--metal);--pigDeep:var(--metalDeep);}
.dk-earth{--pig:var(--earth);--pigDeep:var(--earthDeep);}
.dk-water{--pig:var(--water);--pigDeep:var(--waterDeep);}
.dk-wood{--pig:var(--wood);--pigDeep:var(--woodDeep);}
.dk-fire{--pig:var(--fire);--pigDeep:var(--fireDeep);}
.flag.auth{background:#8a6d33;}.flag.verb{background:#55632f;}
`;

function facePortrait(el, polarity) { return `${ART_BASE}/concept-arts/library/t_${el}_${polarity === 'yang' ? 1 : 2}_p.png`; }
function elWash(el) { return `${ART_BASE}/concept-arts/library/t_${el}_1_w.png`; }
const roleBadgeHtml = (b) => `<span class="rb ${b.c}">${esc(b.t)}</span>`;
const DOM_ICON = { 'dom-wealth': '¤', 'dom-rel': '♥', 'dom-career': '▤', 'dom-health': '✚' };

function facesPage(s) {
  const lead = s.gods[0];
  const Element = CAP[s.el];
  const brief = `${Element} is <b>${esc(FAMILY_BRIEF[lead])}</b>${FAMILY_CLAUSE[lead] ? ` — ${esc(FAMILY_CLAUSE[lead])}` : ''}.`;
  const roleChip = s.role === 'catalyst' ? '<span class="rb up role">↑ Catalyst</span>'
    : s.role === 'friction' ? '<span class="rb down role">↓ Friction</span>'
    : s.role === 'core' ? '<span class="rb role">Core</span>' : '';
  const cards = s.gods.map((g) => {
    const c = FACE_CARD[g] || {};
    const flag = VERBATIM.has(g) ? '<span class="flag verb">verbatim</span>' : '<span class="flag auth">authored</span>';
    return `<div class="fc dk-${s.el}">
      <div class="art"><img src="${facePortrait(s.el, byGod[g].polarity)}" alt="" onerror="this.style.display='none'">${flag}</div>
      <div class="bd">
        <div class="pn">${esc(TG_PERSONA[g])}</div>
        <div class="kw">${(c.kw || []).map((k) => `<span>${esc(k)}</span>`).join('')}</div>
        <div class="zlabel">What it rules</div><div class="zdom"><b>${esc(c.ruleT)}</b> — ${esc(c.ruleB)}</div>
        <div class="zlabel">The reading</div><div class="zteaser">${esc(c.teaser)}</div>
      </div></div>`;
  }).join('');
  return `<div class="phone"><div class="tag">P6–P10 · FACES — ${Element}</div><div class="pad dk-${s.el}">
    <div class="eyebrow">Your energies · ${Element.toUpperCase()}</div>
    <div class="fd dk-${s.el}"><div class="top"><span class="mk">${ZH[s.el]}</span><div><div class="nm">${Element} <span class="zh">${ZH[s.el]}</span></div></div>${roleChip}</div><div class="fd-brief">${brief}</div></div>
    <div class="caps">Its two faces</div>${cards}
  </div></div>`;
}

function personaPage(g) {
  const b = byGod[g]; const el = b.el; const Element = CAP[el];
  const rd = PERSONA_READING[g] || {}; const c = FACE_CARD[g] || {};
  const badges = readingBadges(el, b.role, g, b.presence).map(roleBadgeHtml).join('');
  const rParas = (rd.r || []).map((p) => `<p>${esc(p)}</p>`).join('');
  const flag = VERBATIM.has(g) ? '<span class="flag verb">verbatim</span>' : '<span class="flag auth">authored</span>';
  const dom = PERSONA_DOMAINS[g];
  let domHtml = '';
  if (dom) {
    domHtml = `<div class="sec-head"><span class="t">Where it lives in your life</span><span class="k">${dom.domains.length} domains</span></div>
      <div class="sec-sub">${esc(dom.secSub)}</div>` +
      dom.domains.map((d) => `<div class="dd dk-${el} ${d.locked ? 'locked' : ''}"><span class="ic">${DOM_ICON[d.icon] || '•'}</span><span><span class="nm">${esc(d.name)}</span><span class="tz">${esc(d.tease)}</span></span></div>`).join('') +
      `<div class="gate"><span class="gl">🔒</span><div><div class="ll">${esc(dom.gateLabel)}</div><p>${esc(dom.gateBody)}</p></div></div>`;
  }
  return `<div class="phone"><div class="tag">P12/P13 · ${TG_PERSONA[g]}</div><div class="pad dk-${el}">
    <div class="eyebrow">${Element.toUpperCase()} · ${esc(TG_PERSONA[g]).toUpperCase()}</div>
    <div class="hero"><img src="${facePortrait(el, b.polarity)}" alt="" onerror="this.style.display='none'"><div class="hc"><div class="reye">${Element.toUpperCase()} · ${g} · ${b.polarity.toUpperCase()}</div><div class="htitle">${esc(TG_PERSONA[g])} in you</div></div><div style="position:absolute;top:9px;right:9px;">${flag}</div></div>
    <div class="badges">${badges}</div>
    <p class="lede">${Element} in you ${b.isLead ? 'wears' : 'also wears'} the face of <b>${esc(TG_PERSONA[g])}</b> — ${esc(rd.ledeTail)}.</p>
    <div class="layer"><div class="ll">What it says about you · R</div>${rParas}${rd.pull ? `<span class="pull">${esc(rd.pull)}</span>` : ''}</div>
    <div class="layer tinted"><div class="ll">What to do with it · X</div><p>${esc(rd.x)}</p></div>
    ${domHtml}
  </div></div>`;
}

function elementPage(s) {
  const lead = s.gods[0]; const el = s.el; const Element = CAP[el];
  const comp = composeElement(el, lead, s.role, s.presence);
  const badges = readingBadges(el, s.role, lead, s.presence).map(roleBadgeHtml).join('');
  return `<div class="phone"><div class="tag">P11 · Element — ${Element}</div><div class="pad dk-${el}">
    <div class="eyebrow">${Element.toUpperCase()} · YOUR ENERGY</div>
    <div class="hero"><img src="${elWash(el)}" alt="" onerror="this.style.display='none'"><div class="hc"><div class="reye">${Element.toUpperCase()} · ${s.presence}% OF YOUR CHART</div><div class="htitle">${Element} in you</div></div></div>
    <div class="badges">${badges}</div>
    <p class="lede">${comp.lede}</p>
    <div class="layer"><div class="ll">What this energy is · R</div><p>${esc(comp.p1)}</p><p>${esc(comp.p2)}</p></div>
    <div class="layer tinted"><div class="ll">How it moves in you · X</div><p>${esc(comp.x)}</p></div>
  </div></div>`;
}

function buildHtml() {
  const order = ['正财', '偏财', '比肩', '劫财', '正印', '偏印', '食神', '伤官', '七杀', '正官'];
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Elementum · Reading Journey Replicant</title><style>${CSS}</style></head><body>
<h1 class="page">Elementum · Reading Journey Replicant</h1>
<div class="sub">Sample chart: <b>yang-Metal Day Master</b> · every screen renders the live reading data — art loads from the deployed app.</div>
<div class="legend"><span style="color:#55632f">■ verbatim (deliverable)</span> &nbsp; <span style="color:#8a6d33">■ Claude-authored — needs review</span> &nbsp;·&nbsp; regenerate: <code>node tools/build-reading-review.mjs</code></div>

<div class="rail-title">1 · FACES pages (P6–P10) — one per element, its two faces beneath the briefing</div>
<div class="rail-note">Tapping a face card opens its persona reading (row 2); tapping the briefing arrow opens the element reading (row 3).</div>
<div class="rail">${JOURNEY.map(facesPage).join('')}</div>

<div class="rail-title">2 · Persona readings (P12/P13) — the 10 faces, full readings</div>
<div class="rail-note">Steward &amp; Horizon are the verbatim Wood reference; the other eight are authored in the same voice.</div>
<div class="rail">${order.map(personaPage).join('')}</div>

<div class="rail-title">3 · Element readings (P11) — the substance, composed per Day-Master cycle</div>
<div class="rail-note">This R/X is composed in the component at runtime (mirrored here for the Metal DM), not stored as data.</div>
<div class="rail">${JOURNEY.map(elementPage).join('')}</div>
</body></html>`;
}

// ============================ EMIT ============================
mkdirSync(OUT_DIR, { recursive: true });
const mdPath = resolve(OUT_DIR, 'READING_CONTENT_REVIEW.md');
const htmlPath = resolve(OUT_DIR, 'reading-replicant.html');
writeFileSync(mdPath, buildMarkdown(), 'utf8');
writeFileSync(htmlPath, buildHtml(), 'utf8');
console.log('✓ wrote', mdPath);
console.log('✓ wrote', htmlPath);
