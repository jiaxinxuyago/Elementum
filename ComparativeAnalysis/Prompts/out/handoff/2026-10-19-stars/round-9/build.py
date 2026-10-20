import json, html
S={u['key']:u['text'] for u in json.load(open('samples.json'))['units']}
D=json.load(open('/tmp/claude-0/-home-user-Elementum/57335382-9666-588f-b3b1-67796b0e7c50/scratchpad/dump.json'))
e=html.escape
REN={'Nobleman': 'Patron Star', 'Scholar’s Star': 'Learning Star', 'Heavenly Virtue': 'Grace Star', 'Moon Virtue': 'Mercy Star', 'Prosperity Star': 'Harvest Star', 'Golden Carriage': 'Comfort Star', 'Commander Star': 'Banner Star', 'Red Phoenix': 'Romance Star', 'Heavenly Joy': 'Celebration Star', 'Canopy Star': 'Muse Star', 'Travelling Horse': 'Road Star', 'Peach Blossom': 'Charm Star', 'Robbery Star': 'Raider Star', 'Lost Spirit': 'Veil Star', 'Lonely Star': 'Solitude Star', 'Solitary Star': 'Hermit Star', 'Dipper Star': 'Thunder Star'}
rn=lambda n: REN.get(n,n)
def card(kind,en,zh,where,line_now,line_after,rows,note=None):
    o=f'<div class="starc"><span class="sn {kind}">{e(rn(en))}</span><span class="zh">{zh}</span>'
    if isinstance(where,str): o+=f'<span class="wh">{e(where)}</span>'
    if line_after and line_after!=line_now:
        o+=f'<div class="ba"><span class="bl">now</span><p class="was">{e(line_now)}</p><span class="bl rec">after</span><p class="one">{e(line_after)}</p></div>'
    else: o+=f'<p class="one">{e(line_now)}</p>'
    for r in rows:
        lab,key,now,after,draft=r
        o+=f'<div class="unit">'
        if lab: o+=f'<span class="wh2">{e(lab)}</span>'
        if after and after!=now:
            o+=f'<div class="ba"><span class="bl">now{" · draft" if draft else ""}</span><p class="was">{e(now)}</p><span class="bl rec">after</span><p>{e(after)}</p></div>'
        else: o+=f'<p>{e(now)}</p>'
        o+=f'<span class="key">{e(key)}</span></div>'
    if note: o+=f'<div class="vnote"><span class="bl rec">new · S4</span><p>{e(note)}</p><span class="key">{e(note_key(kind))}</span></div>'
    return o+'</div>'
def note_key(kind): return 'TEMPLATED tpl_depth · star_void.'+('help' if kind=='help' else 'test')
TENSE={'lived':'lived','now':'now','coming':'coming'}
GN={'year':'Year Gate · Early Chapter','month':'Month Gate · Rising Chapter','day':'Day Gate · Home Chapter','hour':'Hour Gate · Late Chapter'}
VOIDS={'B':{('taohua','year')},'C':{('jiesha','month')}}
def chart_cards(k):
    v=D[k]['S']; out=[]
    for grp,label in (('help','Stars that help'),('test','Stars that test')):
        out.append(f'<span class="grp">{label}</span>')
        for s in v[grp]:
            kind='help' if grp=='help' else 'test'
            lk=f"STAR {s['id']} · line"
            rows=[]; notes=None
            for r in s['readings']:
                lab=f"{GN[r['gate']]} · {r['tense']}" + (f" · from {1995 if k=='golden' else 1990 if k=='B' else 1992}+" if False else '')
                rows.append((lab if len(s['readings'])>1 else None, r['key'], r['text'], S.get(r['key']), r['draft']))
                if (s['id'],r['gate']) in VOIDS.get(k,()): notes=S[note_key(kind)]
            where = s['where'] if len(s['readings'])==1 else None
            lineafter=S.get(lk)
            if len(s['readings'])>1: rows[0]=rows[0]
            o=card(kind,s['en'],s['zh'],where if where else '',s['line']['text'],lineafter,rows,notes)
            if len(s['readings'])>1:
                o=o.replace('<span class="wh"></span>',f'<div class="ba"><span class="bl">where, now</span><p class="was mono">{e(s["where"])}</p><span class="bl rec">where, after (S3)</span><p class="mono">{e(" / ".join(GN[r["gate"]] for r in s["readings"]))}</p></div>')
            out.append(o)
    out.append('<span class="grp">Stars arriving with your time</span>')
    for s in v['arriving']:
        rows=[(None,s['reading']['key'],s['reading']['text'],S.get(s['reading']['key']),s['reading']['draft'])]
        out.append(card('come',s['en'],s['zh'],s['where'],s['line']['text'],S.get(s['line']['key']),rows))
    return '\n'.join(out)
def years(k):
    v=D[k]['S']; ys=sorted({s['year'] for s in v['yearStars']})
    if not ys: return '<p class="pending">Advisor years: nothing shows. The current decade ends in 2026 and 2026 brings no new star. Under S6 A this chart shows 2026 to 2030: the Patron, Road, Veil and Solitude Stars in 2028, the Muse Star in 2030, and more.</p>'
    o='<div class="yrs"><span class="grp">Advisor · the years left in this decade</span>'
    for y in ys:
        o+=f'<div class="yr"><p class="yh">{y}</p>'
        for s in [s for s in v['yearStars'] if s['year']==y]:
            a=S.get(s['reading']['key'])
            o+=f'<div class="unit"><span class="wh2">{e(rn(s["en"]))} · {s["zh"]}</span>'
            if a: o+=f'<div class="ba"><span class="bl">now · draft</span><p class="was">{e(s["reading"]["text"])}</p><span class="bl rec">after</span><p>{e(a)}</p></div>'
            else: o+=f'<p{" class=was" if s["reading"]["draft"] else ""}>{e(s["reading"]["text"])}{" <span class=dr>draft, written with the batch</span>" if s["reading"]["draft"] else ""}</p>'
            o+=f'<span class="key">{e(s["reading"]["key"])}</span></div>'
        o+='</div>'
    return o+'</div>'
def phone(k,title,sub):
    v=D[k]['S']
    return f'<div class="phone"><p class="ey">YOUR STARS · Seeker view{" · Advisor below" if k!="B" else ""}</p><p class="ttl">{e(v["claim"]["text"])}</p><p class="sub">The symbolic stars are an older, lighter layer of the reading. Each one colours the gate it sits in, and none of them overrides the characters in your seats.</p>{chart_cards(k)}{years(k)}</div>'
def Q(qid,text,opts,why=None):
    o=f'<div class="q" id="{qid}"><h4><span class="qid">{qid}</span>{text}</h4>'
    if why: o+=f'<p class="why">{why}</p>'
    for i,(lab,desc) in enumerate(opts):
        L='ABCD'[i]
        o+=f'<label class="opt"><input type="radio" name="{qid}" value="{L}" id="{qid}{L}"><span><b>{L} · {lab}</b>{" <span class=tag>recommended</span>" if i==0 else ""}<small>{desc}</small></span></label>'
    return o+'</div>'
# (id, zh, literal, group, what it means, [(name, why)...] recommended first)
NAMES=[
('N1','天乙贵人','Heaven’s Noble','Help','Help from people with standing, at the moment you need it. The most prized star.',[('Patron Star','A patron backs you before you have proved yourself, which is the reading.'),('Benefactor Star','Same sense, longer and more formal.'),('Nobleman','The usual English, a literal title.')]),
('N2','文昌','Flourishing Letters','Help','Learning, writing, exams, a quick and literate mind.',[('Learning Star','Says it at once.'),('Quill Star','An image for writing, softer on study.'),('Scholar’s Star','The working name.')]),
('N3','天德贵人','Heaven’s Virtue','Help','Protection: trouble reaches you and passes lightly.',[('Grace Star','Grace is unearned protection, which is the star. Pairs with N4.'),('Shield Star','Plainer, more defensive.'),('Heavenly Virtue','The literal.')]),
('N4','月德贵人','Month’s Virtue','Help','The quieter twin of N3: trouble turns into gain, kindness comes back to you.',[('Mercy Star','Grace and Mercy are an English pair, as 天德 and 月德 are a Chinese one.'),('Mending Star','Says the turn from trouble to gain.'),('Moon Virtue','The working name.')]),
('N5','禄神','Spirit of the Stipend','Help','A living you earn yourself, your own root and reward.',[('Harvest Star','You reap what you work for. No promise of a sum.'),('Livelihood Star','Exact, flatter.'),('Prosperity Star','The working name. Promises money the text cannot give.')]),
('N6','金舆','Golden Carriage','Help','Comfort, ease, refinement, being carried through life gently.',[('Comfort Star','Says the meaning plainly.'),('Velvet Star','An image of soft ease, a little fancy.'),('Golden Carriage','The literal.')]),
('N7','将星','General’s Star','Help','Leadership: people rally to you and follow your call.',[('Banner Star','People gather under your banner. Keeps clear of the General character.'),('Leader Star','Plain.'),('Commander Star','The working name.')]),
('N8','红鸾','Red Phoenix','Help','Romance and love arriving, the star of courtship.',[('Romance Star','Plain, and distinct from the Charm Star (N12).'),('Spark Star','The first pull of attraction.'),('Red Phoenix','The literal.')]),
('N9','天喜','Heaven’s Joy','Help','Celebrations, good news, happy occasions gathering around you.',[('Celebration Star','Names what happens.'),('Good News Star','Plain, a little long.'),('Heavenly Joy','The literal.')]),
('N10','华盖','Flowered Canopy','Help, classically mixed','Art, spirit and depth, with a solitary streak.',[('Muse Star','The gift of art and inner life. The solitude lives in the readings.'),('Sanctuary Star','The inward retreat, less of the art.'),('Canopy Star','The literal.')]),
('N11','驿马','Post Horse','Help, classically mixed','Movement: travel, relocation, change of place, restlessness.',[('Road Star','Short and plain.'),('Voyage Star','Grander, leans to long travel.'),('Travelling Horse','The literal.')]),
('N12','桃花','Peach Blossom','Help, classically mixed','Charm and magnetism: being liked, noticed and sought out by many.',[('Charm Star','Says the gift, keeps the price for the readings.'),('Magnet Star','Stronger pull, less grace.'),('Peach Blossom','The literal, already known in English.')]),
('N13','羊刃','Ram’s Blade','Test','A hard, fierce will that protects what is yours and does not bend.',[('Ram’s Edge','Ruled in D6. Already says the meaning: the ram’s stubborn force. “Blade” is taken by the 庚 Day Master.'),('Iron Will Star','Plain meaning, fits the Star pattern.')]),
('N14','劫煞','Robbing Sha','Test','Sudden loss from outside: something of yours taken without warning.',[('Raider Star','Something comes in and takes. Plain about the cost.'),('Loss Star','Plainer and bleaker.'),('Robbery Star','The working name.')]),
('N15','亡神','Fleeing Spirit','Test','A part of you held out of sight: secrets, plans, a hidden self.',[('Veil Star','What you keep behind a veil. No echo of death.'),('Shadow Star','Darker.'),('Lost Spirit','The working name. Reads like death in English.')]),
('N16','孤辰','Orphan Hour','Test','A need to be alone even inside closeness.',[('Solitude Star','Chosen aloneness, which is the reading.'),('Island Star','An image, a little poetic.'),('Lonely Star','The working name. Sadder than the reading.')]),
('N17','寡宿','Widow’s Lodge','Test','Long stretches in your own company, a quiet house. The literal is gendered.',[('Hermit Star','Retreat over long seasons. Clearly different from the Solitude Star.'),('Quiet House Star','Closer to the image, longer.'),('Solitary Star','The working name. A near twin of N16.')]),
('N18','魁罡','Dipper’s Head','Test','A fierce, decisive, all-or-nothing mind.',[('Thunder Star','Force and suddenness.'),('Firebrand Star','Fierce, but it hints at the Fire element.'),('Dipper Star','The literal, says nothing.')]),
('N19','空亡','Empty and Gone','Test','Emptiness: what sits here arrives late or lighter than promised.',[('the Void','Already says the meaning. It is an empty slot, not a star, so it keeps no “Star”.'),('Hollow Star','Fits the pattern, weaker image.')]),
]
FRAME=[
('H1','羊刃','Ram’s Edge','A blade: violence, wounds, and harm to a husband or wife (刃 against the spouse).','Injury, violence, harm to a partner.','A will that does not bend, firm enough that people step back.','To protect what you built.','You choose which fights are worth having.'),
('H2','劫煞','Raider Star','Robbery, sudden loss, accident, a violent end.','Theft as a crime, accident, death.','Something of yours (credit, a plan, a place) taken without warning.','To keep what you built.','You guard faster than most and lose less each time.'),
('H3','亡神','Veil Star','Loss, scheming, hidden dealings, lawsuits.','Deceit, scheming, legal trouble.','A part of you kept out of sight, so people close to you hear things late.','The safety of not being fully seen.','You choose who gets to see all of you.'),
('H4','孤辰','Solitude Star','Loneliness; “men fear 孤辰”; parents lost young.','Bereavement, anything gendered.','A partner reads your need to be alone as distance.','Time alone inside closeness.','You stay longest with the person who lets you go quiet.'),
('H5','寡宿','Hermit Star','An empty house; “women fear 寡宿”; widowhood.','Widowhood, loss of a spouse, anything gendered.','Long stretches in your own company, and invitations you miss.','Quiet on your own terms.','You come out of it clearer about who you miss.'),
('H6','魁罡','Thunder Star','A fierce, decisive mind, wild swings of fortune; in a woman’s chart, harm to husband and children.','Harm to a partner or children, anything gendered.','A mind so decided that people stop arguing with you.','To decide, and to be right.','People hand you the hard calls, and you carry them.'),
('H7','空亡','the Void','Emptiness: whatever sits there comes to nothing; “the lone crane and the lone phoenix”.','Loss of a spouse, “nothing comes of it”.','What sits there arrives late, or lighter than it sounded.','Something solid to hold.','You trust what is already in your hands. It lightens a hard star too (S4).'),
('H8','桃花','Charm Star','Desire, scandal; “most feared in a woman’s chart”.','Scandal, affairs, anything gendered.','More attention than you ask for.','To be liked and wanted.','You choose with care who gets close.'),
('H9','驿马','Road Star','Travel and promotion, and for most people “a horse means hard roads”.','Exile, ruin through travel.','You settle less than you planned.','Movement and new ground.','You gain more from the motion than you lose to it.'),
('H10','华盖','Muse Star','Art, religion, a gifted mind, and a solitary one.','Isolation as a sentence.','Fewer people understand what you work on.','Depth, alone.','You mind it less than you thought you would.'),
]
names_html=Q('N0','How the names are built',[('A meaning word plus “Star”','Patron Star, Raider Star, Muse Star. One pattern for the whole set. It keeps them clear of the ten characters (the Twin, the General) and the Day Master names (the Blade, the Oak).'),('Bare figures','“the Patron”, “the Raider”. More vivid, but a third family of “the X” beside the characters and the Day Masters.'),('The literal names','Nobleman, Red Phoenix, Canopy Star, as in round 9 version 1.')])+'\n'+'\n'.join(Q(n,f'<span class="zh2">{zh}</span> {opts[0][0]} <small class="grpl">{g} · literally “{lit}”</small>',opts,f'<b>What it means.</b> {mean}') for n,zh,lit,g,mean,opts in NAMES)
frame_rows=''.join(f'<tr><td><b>{en}</b> <span class="zh">{zh}</span></td><td>{cl}</td><td>{nv}</td><td>{c}</td><td>{w}</td><td>{cr}</td></tr>' for _,zh,en,cl,nv,c,w,cr in FRAME)
frame_q='\n'.join(Q(h,f'<span class="zh2">{zh}</span> {en}: approve this frame?',[('Approve','The cost, the want and what carries you, as in the table.'),('Sharper','Keep the cost, and let a reading close on the cost alone when it is truer.'),('Leave the star out','Drop it from the product.')]) for h,zh,en,*_ in FRAME)
SQ=[
('S1','The mixed stars (Charm, Road and Muse): which group?',[('Stars that help','Keep the two groups. Each reading carries the price inside it (“you choose with care who gets close”).'),('A third group','“Stars that cut both ways” between help and test.')],'The classics call these mixed or worse. Modern readers take them as gifts. The friction rule asks for the cost to be named, which the texts do either way.'),
('S2','The Raider Star and the Veil Star: one row or two?',[('Two cards','They read differently: one is loss from outside, the other a part of you held back. On the golden chart they sit in different gates.'),('One combined row','The round-5 idea, one “hard pair” row.')]),
('S3','A star in two gates (chart B: the Romance Star and the Charm Star)',[('One card, a labelled reading per gate','The joined “where” line goes. Each reading gets its own gate and tense label (see chart B).'),('One card per gate','Two Romance Star cards on the page.')]),
('S4','A star that sits on a Void branch',[('Add one line under it','“This star sits on your Void, and you meet its gift late and light.” A test star gets “its test”. The classics say the Void empties hard stars as well as good ones. Two new units.'),('No note','The Void card speaks for itself.')],'Chart B: the Charm Star sits on the Void in the Year Gate. Chart C: the Raider Star sits on the Void in the Month Gate.'),
('S5','Heavenly and Moon Virtue on the day stem (a calculator change)',[('Count the day stem','The majority of the sources match any of the four stems, and 日德 on the day stem is the strongest seat. Chart C gains the Grace Star in the Day Gate. Golden and B are unchanged. The golden check for C is updated.'),('Keep the day stem out','As built. The day stem is the reader, so no star is read on it.')]),
('S6','Which years the Advisor list shows',[('This year and the next four','Every year’s new stars. Chart B, at the end of its decade, sees 2026 to 2030 instead of nothing.'),('The rest of the current decade','As built. Chart B shows nothing. Golden shows the years 2026 to 2032.')]),
('S7','Chip lines read true in any gate and tense',[('Rewrite to be tense-free','One chip line serves every chart. “Loss taught you to guard what is yours” is past, and wrong for a Raider Star still coming. After: “You guard what is yours faster than most.”'),('Keep as written','')]),
('S8','Year Gate readings for readers under sixteen',[('Write them','Thirteen extra units, so a draft can never reach a reader.'),('Skip','Under-sixteens keep the draft line.')]),
('S9','I2 · Do stars stay in the product?',[('Yes, as planned','Free chips, the rest by tier.'),('No','Remove the section.')]),
('S10','I3 · Pricing for stars',[('No separate price','Free: the chips and lines. Seeker: the readings and the decade stars. Advisor: the year stars. As ruled in round 4.'),('A one-off add-on','Stars sold on their own.')]),
]
struct_q='\n'.join(Q(a,b,c,d[0] if d else None) for a,b,c,*d in SQ)
CNEW='<div class="newc">'+card('help','Grace Star','天德贵人','Day Gate · Home Chapter · from 2027','Trouble passes you more lightly than most.',None,[(None,'STAR tiande · reading.day.coming',S['STAR tiande · reading.day.coming'],None,False)])+'</div>'
tpl=open('round-9/page.tpl.html').read()
out=tpl.replace('{{NAMES}}',names_html).replace('{{FRAME_ROWS}}',frame_rows).replace('{{FRAME_Q}}',frame_q).replace('{{STRUCT_Q}}',struct_q)\
 .replace('{{GOLDEN}}',phone('golden','','')).replace('{{B}}',phone('B','','')).replace('{{C}}',phone('C','','').replace('<span class="grp">Stars that test</span>', CNEW+'<span class="grp">Stars that test</span>',1))
ids=[n[0] for n in NAMES]+[f[0] for f in FRAME]+[s[0] for s in SQ]
out=out.replace('{{IDS}}',json.dumps(ids))
open('round-9/stars-round-9.html','w').write(out)
print(len(out))
