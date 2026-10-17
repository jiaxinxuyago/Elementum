const S='/tmp/claude-0/-home-user-Elementum/897393f2-6618-542b-92a1-23f079c1450a/scratchpad';
const fs=(await import('node:fs')).default;
const { compose } = await import(S+'/compose.mjs');
const content=JSON.parse(fs.readFileSync('/home/user/Elementum/ComparativeAnalysis/Prompts/out/handoff/2026-10-17-domains-template/template.json','utf8'));
const v1=fs.readFileSync(S+'/domains-v1.html','utf8');
const style=v1.match(/<style>[\s\S]*?<\/style>/)[0];
const llScript=v1.match(/<script>([\s\S]*?)const Q=\[/)[1];
const esc=(t)=>String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const {r,pos}=compose({year:1995,month:4,day:29,hour:18,location:'Beijing',gender:'male'},false);
const seatsLL=(on)=>JSON.stringify({age:r.age,seats:pos.map(p=>[p.gateKey,p.kind==='stem'?'at':'inside',p.persona,p.el,on===true||on.has(p.id)?1:0]),allOn:on===true});
const beats=(arr)=>{let out='',last=null;for(const b of arr){const same=b.label===last;last=b.label;
  if(b.kind==='gap'){out+=`<div class="gap"><span class="when" style="font-family:var(--f-mono);font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--seal)">${esc(b.label)}</span><br>${esc(b.lead)} ${esc(b.text)}</div>`;continue}
  const cls=b.kind==='window'||b.kind==='decade'?'beat decade':'beat'+(b.now?' now':'');
  out+=`<div class="${cls}">${same?'':`<span class="when">${esc(b.label)}</span>`}${b.lead?`<p style="margin:0 0 6px"><b>${esc(b.lead)}</b></p>`:''}<p${b.seat?'':' style="margin:0"'}>${esc(b.text)}</p>${b.seat?`<span class="who">${esc(b.seat)}</span>`:''}</div>`}return out};
const STEPHD={Wealth:'With money',Family:'With your family',Career:'At work',Social:'With friends',Health:'With your body',Love:'In love',Mind:'In your thinking',Growth:'As you grow'};
const page=(p)=>`<div class="phone" id="pg-${p.domain}">
<p class="ey">The Domains · ${p.domain}</p><div class="ttl">${esc(p.headline)}</div>
<p class="sub">${esc(p.count)}</p>
<div class="ll" data-ll='${seatsLL(new Set(p.seats.map(s=>s.id)))}'></div>
<div class="climb"><p class="stepey">How you are</p><p class="stephd">${STEPHD[p.domain]}</p><p>${esc(p.how)}</p>${p.pattern?`<p>${esc(p.pattern.text)}</p>`:''}</div>
<div class="climb"><p class="stepey">What has already happened</p>${beats(p.past)}</div>
<div class="climb"><p class="stepey">What is coming</p>${beats(p.future)}${p.notes.map(n=>`<p class="small">${esc(n)}</p>`).join('')}</div>
<div class="card"><span class="laylab">The seats that rule ${p.domain}</span>${p.seats.map(s=>`<div class="seatcard"><span class="st">${esc(s.term)}</span><span class="zh">${s.termZh}</span><br><span class="small">${esc(content.seats[s.id].defline)}</span><p class="small" style="margin:6px 0 4px">${esc(content.seats[s.id].reading)}</p></div>`).join('')}</div>
</div>`;
const order=r.pages.map(p=>p.domain);
const tiles=r.pages.map(p=>`<a class="tile" href="#pg-${p.domain}" style="text-decoration:none;color:inherit"><div class="tn">${p.domain}</div><div class="tc">${esc(p.count)}</div><div class="th">${esc(p.headline)}</div></a>`).join('');
const rows=[['T0','The hub (claim, teaching beat, life line, eight tiles)'],...order.map((d,i)=>['T'+(i+1),`The ${d} page`]),['T9','The seven seat cards (new deflines and readings, Q14)'],['T10','The pair lines, one per domain (the 20 lines, two show here)']];
const Qs=[...rows.map(([id,t])=>[id,t,[['A','Keep as written'],['B','More definite'],['C','Softer'],['D','Rewrite (say how in chat)']]]),
 ['P1','Next step after this template',[['A','Sealed writers write the rest from this template: 63 seats (about 490 units with readings and deflines), the remaining decade lines, the gaps and the four other no-seat domains. Then audit, then land.'],['B','One more template round on charts B and C first.']]],
 ['P2','The app build',[['A','I build the screens now (hub, domain page, life line, energy card, EDGE doors), hidden behind a dev flag until the corpus lands, so you can try them on dev.elementum.life.'],['B','Build only after the corpus lands.']]]];
const qjs=`const Q=${JSON.stringify(Qs)};`;
const tail=v1.match(/const box=document[\s\S]*<\/script>/)[0].replace("'dom-v1'","'dom-t1'").replace("'dom-v1'","'dom-t1'").replace(/i===0&&id\[0\]==='Q'/,"i===0&&id[0]==='P'");
const html=`<title>The Domains, Golden Template</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=EB+Garamond:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Public+Sans:wght@400;500;600;700&display=swap">
${style}
<div class="wrap">
<p class="eyebrow">Elementum · The Domains · round 2, the template</p>
<h1>The golden chart's Domains, all eight pages</h1>
<p class="lede">Your rulings from round 1 (Q1 to Q15 A, S1 to S8 A), applied. Every page below is composed by the app's new resolver from the template content, for 1995-04-29 18:00 Beijing at age 31 in 2026: the lead seat, the gate ages, the decades and the windows are the engine's, not hand-placed. 120 units, all through the gate. Seeker view. This is the calibration the sealed writers will copy for the other 63 seats.</p>
<div class="toc">${order.map(d=>`<a href="#pg-${d}">${d}</a>`).join('')}<a href="#changes">What changed</a><a href="#questions">Questions</a></div>

<h2>The hub</h2>
<div class="phone">
<p class="ey">Your Domains</p><div class="ttl">Wealth and Family carry the most weight in your life.</div>
<p class="sub">Four seats rule each of them. Love, Health and Mind hang on one seat apiece.</p>
<p>Your chart has four gates, and each gate is a stretch of your life. Every gate holds two seats, one in plain view and one inside, and one of the ten characters sits in each seat. A character rules the parts of your life its seat touches, and the gate says when it takes over.</p>
<div class="ll" data-ll='${seatsLL(true)}'></div>
<p class="small">The lit part of the line is behind you. The shaded part is still to come.</p>
<div class="tiles">${tiles}</div></div>

<h2>The eight domain pages</h2>
<div class="pair">${r.pages.map(page).join('</div><div class="pair">')}</div>

<h2 id="changes">What changed from the round-1 samples, and why</h2>
<div class="tbl"><table>
<tr><th>Where</th><th>Change</th><th>Why</th></tr>
<tr><td>Family tile and title</td><td>"You became the careful one, and you stay the one who provides." became "You were fed well, and you became the one who feeds."</td><td>The lead rule: the highest-ranked seat whose gate the reader has already reached. For Family at 31 that is the Artisan inside the Year Gate, not a Steward.</td></tr>
<tr><td>Wealth, the Hour Gate beats</td><td>"the saving you started as a child" became "years of steady saving". "The same years bring claims on that money" became "From your late forties the people after you … will start to make claims on your money".</td><td>Every seat text is shared by every chart that holds that seat. The old wording leaned on the golden chart's other seats.</td></tr>
<tr><td>Love and Wealth, Day Gate beats</td><td>"at about 35" and "From about 35" became "in your mid-thirties".</td><td>Q8: ages and years live in the labels, which the engine prints. The text carries no digits.</td></tr>
<tr><td>The pair lines</td><td>One line per target domain (20 in all), not one per pair.</td><td>The Alchemist-starves-the-Artisan line about unfinished work read off-topic on the Health page. Its Health line now speaks of sleep and appetite.</td></tr>
<tr><td>Step 2 and step 3 order</td><td>Beats run in time order. A beat that shares the label above it drops its label.</td><td>So the page reads as one timeline.</td></tr>
<tr><td>Seat cards</td><td>New deflines and readings, 60 to 80 words, without "spouse palace", imperatives or a domain-declaration opener.</td><td>Q14 A. The seat card already shows its domains, so the "This position rules …" opener goes.</td></tr>
</table></div>

<h2 id="questions">Questions</h2>
<p class="lede">T rows rule each page. P rows decide what happens next. The first option of each P row is my recommendation.</p>
<div id="qs"></div>
<div class="bar"><output id="codes">No answers yet.</output><button id="copy" type="button">Copy my answers</button></div>
</div>
<script>${llScript}${qjs}
${tail}`;
fs.writeFileSync(S+'/domains-template.html',html); console.log('ok', html.length);
