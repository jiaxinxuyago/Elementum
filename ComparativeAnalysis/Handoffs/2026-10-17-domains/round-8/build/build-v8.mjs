// Round 8 review page: the engine, the writing plan and the golden templates. node build-v8.mjs
const S = '/tmp/claude-0/-home-user-Elementum/897393f2-6618-542b-92a1-23f079c1450a/scratchpad';
const ROOT = '/home/user/Elementum/';
const fs = (await import('node:fs')).default;
const v7 = fs.readFileSync(ROOT + 'ComparativeAnalysis/Handoffs/2026-10-17-domains/round-7/pages-v7.html', 'utf8');
const style = v7.match(/<style>([\s\S]*?)<\/style>/)[1].replace(/\.shots[\s\S]*?\.shot \.cap\{text-align:center\}/, '') + `
.unit{margin:0 0 12px}
.unit .where{font-family:var(--f-mono);font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--inkLight);display:block;margin:0 0 2px}
.unit .key{font-family:var(--f-mono);font-size:10px;color:var(--inkLight);display:block;margin:3px 0 0;opacity:.85}
.unit.now .where{color:var(--seal)}
.unit p{margin:0}
.lab{font-weight:600}
.chap{background:#FBF7EC;border:1px solid var(--paperHair);border-radius:12px;padding:11px 12px;margin:10px 0}
.chap.cur{border-color:var(--seal)}
.chap .ch{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:baseline;margin:0 0 6px}
.chap .cn{font-family:var(--f-disp);font-weight:600;font-size:19px}
.chap .cs{font-family:var(--f-mono);font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--inkLight)}
.chap .cs.now{color:var(--seal)}
.dec{border-top:1px dashed var(--paperHair);padding-top:8px;margin-top:6px}
.yr{border-top:1px solid var(--paperHair);padding:9px 0 2px}
.yr:first-of-type{border-top:0}
.yr .yh{font-family:var(--f-disp);font-weight:600;font-size:17px;margin:0 0 4px}
.yr .yh small{font-family:var(--f-mono);font-size:9.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--inkLight);font-weight:400;margin-left:6px}
.yr.now .yh{color:var(--seal)}
.bondlab{font-family:var(--f-mono);font-size:9.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--seal);display:block;margin:6px 0 1px}
.starc{background:#FBF7EC;border:1px solid var(--paperHair);border-radius:12px;padding:10px 12px;margin:8px 0}
.starc .sn{display:inline-block;font-family:var(--f-app);font-size:13.5px;border-radius:99px;padding:1px 9px;margin:0 6px 4px 0}
.starc .sn.help{background:var(--gold);color:#fff}
.starc .sn.test{border:1px solid var(--inkSoft);color:var(--ink)}
.starc .sn.come{border:1px dashed var(--gold);color:var(--ink)}
.starc .zh{font-size:12.5px;color:var(--inkLight)}
.starc .one{font-family:var(--f-disp);font-weight:600;font-size:16.5px;line-height:1.25;margin:2px 0 6px}
.grp{font-family:var(--f-mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--seal);display:block;margin:14px 2px 2px}
.bp{background:#FBF7EC;border:1px solid var(--paperHair);border-radius:12px;padding:11px 12px;margin:10px 0}
.bp .pt{font-family:var(--f-mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--seal);display:block;margin:0 0 6px}
.pending{font-size:13.5px;color:var(--inkSoft);border:1px dashed var(--paperHair);border-radius:10px;padding:8px 10px;margin:8px 0}
.eng td:first-child{font-weight:600;white-space:nowrap}
.eng .zh{color:var(--muted);font-weight:400}
.num{font-variant-numeric:tabular-nums;text-align:right;white-space:nowrap}
.tot td{font-weight:600;border-top:2px solid var(--line)}
.fix{border-left:3px solid var(--warn);padding-left:10px}
.calc{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:12px 14px;margin:12px 0}
.calc .cn{font-weight:700;font-size:16px;margin:0 0 4px}
.calc .cn .zh{font-weight:400;color:var(--muted);margin-left:4px}
.calc .rule{font-size:13.5px;color:var(--muted);margin:0 0 8px}
.calc dl{display:grid;grid-template-columns:72px 1fr;gap:6px 10px;margin:0;font-size:14px}
.calc dt{font-family:var(--f-mono);font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);padding-top:2px}
.calc dd{margin:0;min-width:0}`;
const qtail = v7.match(/const box=document[\s\S]*<\/script>/)[0].replace(/'dom-v7'/g, "'dom-v8'").replace(/i===0&&id\[0\]==='P'/, "i===0");
const T = JSON.parse(fs.readFileSync(ROOT + 'ComparativeAnalysis/Prompts/out/handoff/2026-10-18-depth-template/template.json', 'utf8'));
const U = Object.fromEntries(T.units.map((u) => [u.key, u]));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const unit = (key, { now = false, label = null, where = null } = {}) => { const u = U[key]; if (!u) throw new Error('no unit ' + key);
  return `<div class="unit${now ? ' now' : ''}"><span class="where">${esc(where ?? u.where)}</span><p>${label ? `<span class="lab">${esc(label)}</span> ` : ''}${esc(u.text)}</p><span class="key">${esc(u.key)}</span></div>`; };
const ENG = JSON.parse(fs.readFileSync(S + '/eng8.json', 'utf8'));
const extra = fs.existsSync(S + '/v8-extra.mjs') ? await import(S + '/v8-extra.mjs') : {};

// ── 1 · the engine
const engCards = ENG.rows.map((r) => `<div class="calc"><p class="cn">${r.name} <span class="zh">${r.zh}</span></p><p class="rule">${r.rule}</p>
<dl><dt>Golden</dt><dd>${r.golden}</dd><dt>Chart B</dt><dd>${r.B}</dd><dt>Chart C</dt><dd>${r.C}</dd></dl></div>`).join('');
const engine = `<h2 id="engine">1 · The engine</h2>
<p>Eight readings from five calculators, all pure functions over the chart the app already computes. They change no existing number. For now they live in the handoff folder (<span class="src">round-8/engine/</span>), not in the app.</p>
<div class="note"><b>The three charts.</b> Golden: 乙亥 庚辰 庚寅 乙酉, born 1995, age 31. Chart B: 庚午 乙酉 乙酉 己卯, born 1990, age 36. Chart C: 壬申 乙巳 辛丑, born 1992, age 34, birth hour unknown.</div>
${engCards}
${ENG.fixes.map((f) => `<div class="note warn fix">${f}</div>`).join('')}
${ENG.notes.map((f) => `<div class="note">${f}</div>`).join('')}`;

// ── 2 · the writing plan
const plan = `<h2 id="plan">2 · The writing plan</h2>
<p>Every new unit, with its home in the station, its size and who sees it. The counts assume every tense a reader can be in (Year seats are always lived for readers over fifteen). The star readings are about 140, since some stars cannot sit in some gates. Station keys follow the domains corpus, so the same pipeline lands them.</p>
<div class="tbl"><table><thead><tr><th>Section</th><th>Unit</th><th>Key</th><th class="num">Units</th><th class="num">Words</th><th>Tier</th></tr></thead><tbody>
${ENG.plan.map((r) => `<tr><td>${r[0]}</td><td>${r[1]}</td><td class="src">${r[2]}</td><td class="num">${r[3]}</td><td class="num">${r[4]}</td><td>${r[5]}</td></tr>`).join('')}
<tr class="tot"><td colspan="3">Total new units</td><td class="num">${ENG.plan.reduce((a, r) => a + (parseInt(r[3], 10) || 0), 0)}</td><td></td><td></td></tr></tbody></table></div>
<div class="note"><b>How they are written.</b> The same sealed-writer pattern as the domains corpus: a brief, worklists, a gate (<span class="src">2026-10-18-depth-template/gate.mjs</span>) that every unit passes before it lands, then the voice audit and a page audit on composed pages. The gate already holds the master prompt's rules and the prediction law (G1). It also checks chart invariance: a unit names no character but its own. It also blocks any five-word run shared with the same seat's domain units, so a reader who opens both pages never reads the same sentence twice.</div>`;

// ── 3 · Life Chapters
const chapters = `<h2 id="chapters">3 · Life Chapters, on the golden chart</h2>
<p>Seeker view at age 31. Each chapter card composes its seats: the stem seat opens the chapter by name, the seat inside follows. The decade lines sit in the chapter they fall in. The current decade gets the full reading.</p>
<div class="phone">
<p class="ey">YOUR LIFE CHAPTERS</p>
<p class="ttl">${esc(U['TEMPLATED tpl_depth · chapters.claim'].text)}</p>
<span class="key src">TEMPLATED tpl_depth · chapters.claim</span>
<div class="chap"><div class="ch"><span class="cn">The Early Chapter</span><span class="cs">birth to 15 · lived</span></div>
${unit('POSITION zhengcai_year_stem · chapter.lived')}${unit('POSITION shishen_year_branch · chapter.lived')}
<div class="dec">${unit('GOD zhengyin · chapter_decade.heavy.lived')}</div></div>
<div class="chap cur"><div class="ch"><span class="cn">The Rising Chapter</span><span class="cs now">16 to 34 · now</span></div>
${unit('POSITION bijian_month_stem · chapter.now', { now: true })}${unit('POSITION pianyin_month_branch · chapter.now', { now: true })}
<div class="dec">${unit('GOD pianyin · chapter_decade.heavy.lived')}${unit('GOD zhengguan · chapter_decade.helping.now', { now: true })}</div></div>
<div class="chap"><div class="ch"><span class="cn">The Home Chapter</span><span class="cs">35 to 47 · from 2030</span></div>
${unit('POSITION piancai_day_branch · chapter.coming')}
<div class="dec">${unit('GOD qisha · chapter_decade.helping.coming')}</div></div>
<div class="chap"><div class="ch"><span class="cn">The Late Chapter</span><span class="cs">48 on · from 2043</span></div>
${unit('POSITION zhengcai_hour_stem · chapter.coming')}${unit('POSITION jiecai_hour_branch · chapter.coming')}
<div class="dec">${unit('GOD zhengcai · chapter_decade.helping.coming')}${unit('GOD piancai · chapter_decade.helping.coming')}${unit('GOD shangguan · chapter_decade.helping.coming')}</div></div>
</div>
<h3>The same seat, at other ages</h3>
<p>The Horizon inside the Day Gate is written three times, because a reader can meet it before, during or after the Home Chapter.</p>
<div class="pair"><div class="phone">${unit('POSITION piancai_day_branch · chapter.now')}</div><div class="phone">${unit('POSITION piancai_day_branch · chapter.lived')}</div></div>`;

// ── 4 · Your years
const yrs = [[2026, 'General', 'qisha', 'helping', 'year_bond.frame.day', 'Joins your Day Gate · 寅午'], [2027, 'Magistrate', 'zhengguan', 'helping', null, null], [2028, 'Alchemist', 'pianyin', 'heavy', 'year_bond.clash.day', 'Clashes with your Day Gate · 寅申'], [2029, 'Sage', 'zhengyin', 'heavy', 'year_bond.bind.month', 'Binds with your Month Gate · 辰酉'], [2030, 'Twin', 'bijian', 'heavy', 'year_bond.clash.month', 'Clashes with your Month Gate · 辰戌'], [2031, 'Rival', 'jiecai', 'heavy', 'year_bond.bind.day', 'Binds with your Day Gate · 寅亥'], [2032, 'Artisan', 'shishen', 'helping', 'year_bond.frame.month', 'Joins your Month Gate · 子辰']];
const years = `<h2 id="years">4 · Your years, on the golden chart</h2>
<p>Advisor view: each year from now to the end of the decade. A year carries its character's line, plus one line for the strongest bond its branch makes with your gates (a clash before a punishment, a harm, a bind or a frame). The years already lived stay as chips.</p>
<div class="phone"><p class="ey">YOUR LIFE CHAPTERS · THE MAGISTRATE DECADE · YEAR BY YEAR</p>
${yrs.map(([y, g, id, pole, bk, bl]) => `<div class="yr${y === 2026 ? ' now' : ''}"><p class="yh">${y}, a ${g} year<small>${y === 2026 ? 'now · ' : ''}${pole === 'helping' ? 'helping' : 'weighs'}</small></p>
${unit(`GOD ${id} · year_line.${pole}`, { where: '' }).replace('<span class="where"></span>', '')}
${bk ? `<span class="bondlab">${bl}</span>${unit('TEMPLATED tpl_depth · ' + bk, { where: '' }).replace('<span class="where"></span>', '')}` : ''}</div>`).join('')}
</div>
<div class="note">2027 and 2032 also carry a star chip on this page (the Nobleman returns in 2027). The star's year line lives on the Stars page, so the years list stays one line per year plus one bond.</div>`;

// ── 5 · Stars
const starCard = (k, name, zh, where, lineKey, readKey) => `<div class="starc"><span class="sn ${k}">${name}</span><span class="zh">${zh}</span><span class="where" style="display:block;font-family:var(--f-mono);font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--inkLight)">${where}</span>
<p class="one">${esc(U[lineKey].text)}</p><span class="key src">${esc(lineKey)}</span>${readKey ? unit(readKey, { where: '' }).replace('<span class="where"></span>', '') : ''}</div>`;
const stars = `<h2 id="stars">5 · Stars, on the golden chart</h2>
<p>Seeker view, grouped as you ruled in P4. The sourced rules give the golden chart the same six stars as round 5. The Void and the years that bring a star are Advisor.</p>
<div class="phone"><p class="ey">YOUR STARS</p><p class="ttl">${esc(U['TEMPLATED tpl_depth · stars.claim'].text)}</p>
<span class="grp">Stars that help</span>
${starCard('help', 'Scholar’s Star', '文昌', 'Year Gate · Early Chapter', 'STAR wenchang · line', 'STAR wenchang · reading.year.lived')}
${starCard('help', 'Red Phoenix', '红鸾', 'Month Gate · Rising Chapter · now', 'STAR hongluan · line', 'STAR hongluan · reading.month.now')}
<span class="grp">Stars that test</span>
${starCard('test', 'Lonely Star', '孤辰', 'Day Gate · the partner’s seat · from 2030', 'STAR guchen · line', 'STAR guchen · reading.day.coming')}
${starCard('test', 'Ram’s Edge', '羊刃', 'Hour Gate · Late Chapter · from 2043', 'STAR yangren · line', 'STAR yangren · reading.hour.coming')}
${starCard('test', 'Robbery Star', '劫煞', 'Year Gate · Early Chapter', 'STAR jiesha · line', 'STAR jiesha · reading.year.lived')}
${starCard('test', 'Lost Spirit', '亡神', 'Day Gate · from 2030', 'STAR wangshen · line', 'STAR wangshen · reading.day.coming')}
<span class="grp">Stars arriving with your time</span>
${starCard('come', 'Nobleman', '天乙贵人', 'Arrives with your decade, 2023 to 2032', 'STAR tianyi · line', 'STAR tianyi · arriving.decade.now')}
${unit('STAR tianyi · arriving.year', { where: 'Again in 2027 · Advisor' })}
${starCard('come', 'Peach Blossom', '桃花', 'Arrives with your decade, 2033 to 2042', 'STAR taohua · line', 'STAR taohua · arriving.decade.coming')}
${unit('STAR kongwang · arriving.year', { where: 'the Void · 空亡 · falls on 2026 and 2027 · Advisor' })}
</div>
${extra.starsNote || ''}`;

// ── 6 · Blueprint
const blueprint = `<h2 id="blueprint">6 · The Energy Blueprint, on the golden chart</h2>
<p>Advisor view. The bold labels and the chip lines are printed by the engine. Everything else is a unit.</p>
<div class="phone"><p class="ey">YOUR ENERGY BLUEPRINT</p><p class="ttl">A Steward structure · 正财格</p>
<div class="bp"><span class="pt">1 · Your structure</span>${unit('STRUCTURE zhengcai_ge · reading', { where: '' }).replace('<span class="where"></span>', '')}${unit('TEMPLATED tpl_depth · structure_rule.middle', { where: 'why · the revealed-stem rule' })}${unit('STRUCTURE wealth · status.strained.peers', { label: 'Formed, under strain.', where: '' }).replace('<span class="where"></span>', '')}${unit('TEMPLATED tpl_depth · rescue.officer', { where: 'what protects it · Magistrate decade 2023 to 2032 · General decade 2033 to 2042' })}</div>
<div class="bp"><span class="pt">2 · What your chart runs on and lacks</span>${unit('TEMPLATED tpl_depth · strongest.two', { label: 'Strongest.', where: '' }).replace('<span class="where"></span>', '')}${unit('GOD zhengguan · missing', { label: 'Missing.', where: 'no Magistrate · it arrives with your decade 2023 to 2032' })}${unit('GOD zhengyin · missing', { where: 'no Sage · your Sage decade 2003 to 2012 is lived' })}
<span class="lab" style="font-family:var(--f-app)">Your season · 调候.</span>${unit('SEASON geng.chen · reading', { where: '三月庚金 · 穷通宝鉴: 先甲后丁' })}${unit('GOD piancai · season_need.rooted', { where: 'first need · 甲, the Horizon · inside a branch, not on show' })}
<div class="pending">The second need, 丁 (the Magistrate), is absent, so it joins the Missing line above (“your season asks for it too”) instead of repeating it.</div>
<div class="pending">The Seek and Ease pills and the watercolour plates follow here, unchanged from round 7.</div></div>
<div class="bp"><span class="pt">3 · Seen and unseen</span><span class="lab" style="font-family:var(--f-app)">In plain view.</span>${unit('GOD zhengcai · seen.plain', { where: 'the Steward, twice' })}${unit('GOD bijian · seen.plain', { where: 'the Twin' })}
<span class="lab" style="font-family:var(--f-app)">Inside.</span>${unit('GOD shishen · seen.inside', { where: 'the Artisan' })}${unit('GOD pianyin · seen.inside', { where: 'the Alchemist' })}${unit('GOD piancai · seen.inside', { where: 'the Horizon' })}${unit('GOD jiecai · seen.inside', { where: 'the Rival' })}${unit('TEMPLATED tpl_depth · seen.close', { where: '' }).replace('<span class="where"></span>', '')}</div>
<div class="bp"><span class="pt">4 · Pairings and clashes</span>${unit('TG_PATTERN bi_jie_duo_cai · blueprint_line', { where: 'Peers beside the purse · 比劫夺财' })}${unit('TG_PATTERN xiao_shen_duo_shi · blueprint_line', { where: 'Thinking starves making · 枭神夺食' })}${unit('TEMPLATED tpl_depth · bond.bind.year_day', { where: 'Day binds with Year · 寅亥合' })}${unit('TEMPLATED tpl_depth · bond.bind.month_hour', { where: 'Month binds with Hour · 辰酉合' })}${unit('TEMPLATED tpl_depth · bond.none_hard', { where: '' }).replace('<span class="where"></span>', '')}</div>
</div>`;

const Q = ENG.questions;
const html = `<title>In-Depth Engine and Templates</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=EB+Garamond:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Public+Sans:wght@400;500;600;700&display=swap">
<style>${style}</style>
<div class="wrap">
<p class="eyebrow">Elementum · the in-depth sections · round 8</p>
<h1>The engine, the writing plan, and the golden templates</h1>
<p class="lede">Your P6 ruling, carried out. The calculators for structure, season, branch bonds and stars, the full list of new units, and every new unit the golden chart shows, written and gated, for you to read before any batch writing starts. Nothing is in the app. No screen changed.</p>
<div class="toc"><a href="#engine">Engine</a><a href="#plan">Writing plan</a><a href="#chapters">Life Chapters</a><a href="#years">Your years</a><a href="#stars">Stars</a><a href="#blueprint">Blueprint</a><a href="#questions">Questions</a></div>
${engine}${plan}${chapters}${years}${stars}${blueprint}
<h2 id="questions">7 · Questions</h2>
<p class="lede">The first option is my recommendation each time.</p>
<div id="qs"></div>
<div class="bar"><output id="codes">No answers yet.</output><button id="copy" type="button">Copy my answers</button></div>
</div>
<script>const Q=${JSON.stringify(Q)};
${qtail}`;
fs.writeFileSync(S + '/depth-v8.html', html);
console.log('wrote', (html.length / 1024).toFixed(0) + 'KB');
