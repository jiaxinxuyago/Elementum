import json, html
S={u['key']:u['text'] for u in json.load(open('samples.json'))['units']}
D=json.load(open('/tmp/claude-0/-home-user-Elementum/57335382-9666-588f-b3b1-67796b0e7c50/scratchpad/dump.json'))
e=html.escape
REN={'Nobleman': 'the Noble Stranger', 'Scholar’s Star': 'the Bright Scholar', 'Heavenly Virtue': 'the Heavenly Guardian', 'Moon Virtue': 'the Moon Mender', 'Prosperity Star': 'the Rice Farmer', 'Golden Carriage': 'the Golden Courtier', 'Commander Star': 'the Banner Captain', 'Red Phoenix': 'the Red Matchmaker', 'Heavenly Joy': 'the Joyful Host', 'Canopy Star': 'the Temple Poet', 'Travelling Horse': 'the Post Rider', 'Peach Blossom': 'the Blossom Charmer', 'Ram’s Edge': 'the Ram Warrior', 'Robbery Star': 'the Road Bandit', 'Lost Spirit': 'the Secret Keeper', 'Lonely Star': 'the Lone Watcher', 'Solitary Star': 'the Quiet Hermit', 'Dipper Star': 'the Thunder Champion', 'the Void': 'the Empty Seat'}
rn=lambda n: REN.get(n,n)
guest=lambda t: t.replace('old stars sit','guests sit').replace('old star sits','guest sits').replace('a helper is arriving','a helper is on the way')
def card(kind,en,zh,where,line_now,line_after,rows,note=None):
    o=f'<div class="starc"><span class="sn {kind}">{e(rn(en))}</span><span class="zh">a star · {zh}</span>'
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
    for grp,label in (('help','Guests who help'),('test','Guests who test')):
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
    out.append('<span class="grp">Guests on their way</span>')
    for s in v['arriving']:
        rows=[(None,s['reading']['key'],s['reading']['text'],S.get(s['reading']['key']),s['reading']['draft'])]
        out.append(card('come',s['en'],s['zh'],s['where'],s['line']['text'],S.get(s['line']['key']),rows))
    return '\n'.join(out)
def years(k):
    v=D[k]['S']; ys=sorted({s['year'] for s in v['yearStars']})
    if not ys: return '<p class="pending">Advisor years: nothing shows. The current decade ends in 2026 and 2026 brings no new star. Under S6 A this chart shows 2026 to 2030: the Noble Stranger, the Post Rider, the Secret Keeper and the Lone Watcher in 2028, the Temple Poet in 2030, and more.</p>'
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
    return f'<div class="phone"><p class="ey">YOUR STARS · Seeker view{" · Advisor below" if k!="B" else ""}</p><p class="ttl">{e(guest(v["claim"]["text"]))}</p><p class="was small2">now: {e(v["claim"]["text"])}</p><p class="sub">The stars are an older, lighter layer of the reading, guests who visit your gates. Each one colours the gate it visits, and none of them overrides the characters in your seats.</p>{chart_cards(k)}{years(k)}</div>'
def Q(qid,text,opts,why=None):
    o=f'<div class="q" id="{qid}"><h4><span class="qid">{qid}</span>{text}</h4>'
    if why: o+=f'<p class="why">{why}</p>'
    for i,(lab,desc) in enumerate(opts):
        L='ABCD'[i]
        o+=f'<label class="opt"><input type="radio" name="{qid}" value="{L}" id="{qid}{L}"><span><b>{L} · {lab}</b>{" <span class=tag>recommended</span>" if i==0 else ""}<small>{desc}</small></span></label>'
    return o+'</div>'
TWO_={'N1': ('the Noble Stranger', 'The 天乙 of the folk tales: a stranger of standing who appears on your road and backs you.'), 'N2': ('the Bright Scholar', '文昌 means letters shining bright. “Bright” keeps it apart from the Sage.'), 'N3': ('the Heavenly Guardian', 'Heaven’s goodness, stepping in front of trouble.'), 'N4': ('the Moon Mender', 'The moon’s kindness, turning a bad turn into a good one. Pairs with the Heavenly Guardian.'), 'N5': ('the Rice Farmer', 'You eat from the field you worked: an earned living, no promise of a sum. Apart from the Steward, who keeps money.'), 'N6': ('the Golden Courtier', 'The one who rides the golden carriage: ease, good taste, a gentle manner.'), 'N7': ('the Banner Captain', 'People rally under your banner. The first word keeps it apart from the General.'), 'N8': ('the Red Matchmaker', '月老 and his red thread.'), 'N9': ('the Joyful Host', '喜神, celebrations gathering at your table.'), 'N10': ('the Temple Poet', 'Art and faith in one person who walks alone, the two sides of 华盖.'), 'N11': ('the Post Rider', 'The rider of the old relay roads, always on to the next town.'), 'N12': ('the Blossom Charmer', 'The peach-blossom spirit whose charm draws people in.'), 'N13': ('the Ram Warrior', 'The ram’s stubborn force in a fierce guard. Keeps the ram of D6 and joins the cast.'), 'N14': ('the Road Bandit', 'The outlaw on the road who takes without warning.'), 'N15': ('the Secret Keeper', 'What you keep out of sight. Already two words.'), 'N16': ('the Lone Watcher', 'Alone even in company, keeping watch from a little apart.'), 'N17': ('the Quiet Hermit', 'Long seasons in one’s own company. Apart from the Lone Watcher.'), 'N18': ('the Thunder Champion', '魁 is first place and 罡 is thunder’s force: a fierce, all-or-nothing mind.'), 'N19': ('the Empty Seat', 'An empty place at the table. It names what the Void does in two plain words.')}
# (id, zh, literal, group, who they are in the stories, [(name, why)...] recommended first)
NAMES=[
('N1','天乙贵人','Heaven’s Noble','Help','天乙 is the noblest spirit in the old sky, the one folk tales send down the road when you are stuck. It shows up as a stranger of standing who backs you before you have proved yourself.',[('the Patron','Someone above you who opens a door. One word, no mystery.'),('the Elder','Warmer and older, less about standing.'),('Patron Star','Version 2.')]),
('N2','文昌','Flourishing Letters','Help','文昌帝君, the god of writing and exams, the one students still pray to before a test.',[('the Scholar','Who the god is. Distinct from the Sage, who shelters and teaches you.'),('the Writer','Leans to writing only.'),('Learning Star','Version 2.')]),
('N3','天德贵人','Heaven’s Virtue','Help','Heaven’s own goodness standing over you. Trouble reaches you and passes lightly, as if someone stepped in front of it.',[('the Guardian','The one who steps in front. Pairs with N4.'),('the Angel','Instantly understood, but a Western figure.'),('Grace Star','Version 2.')]),
('N4','月德贵人','Month’s Virtue','Help','The quieter twin of N3, the moon’s kindness. Trouble turns into something you can use, and kindness comes back to you.',[('the Mender','Repairs a bad turn into a good one.'),('the Kind One','Softer, two words.'),('Mercy Star','Version 2.')]),
('N5','禄神','Spirit of the Stipend','Help','禄星, the middle one of the three star gods 福禄寿 on every New Year shelf: the god of your earned reward.',[('the Provider','A living you earn and bring home. Close to the Steward, who keeps money; the Provider earns it.'),('the Farmer','You reap what you sow, more rustic.'),('Harvest Star','Version 2.')]),
('N6','金舆','Golden Carriage','Help','The golden carriage that carries nobles in comfort. Ease, good taste, a gentle manner, people looking after you.',[('the Courtier','At ease among fine things and fine manners.'),('the Noble','Simpler, but close to the Patron.'),('Comfort Star','Version 2.')]),
('N7','将星','General’s Star','Help','The star over the general’s tent, the banner people rally under. The General is already one of the ten, so the star is the one who leads the troop.',[('the Captain','The one people fall in behind. Smaller than the General, closer to people.'),('the Chief','Plain, more tribal.'),('Banner Star','Version 2.')]),
('N8','红鸾','Red Phoenix','Help','The red 鸾 bird of weddings, and 月老, the old man under the moon who ties a red thread between two people.',[('the Matchmaker','Who ties the red thread. Known in every culture.'),('the Lover','More direct, less of the old story.'),('Romance Star','Version 2.')]),
('N9','天喜','Heaven’s Joy','Help','喜神, the spirit of happy occasions, who walks in with weddings, births and good news.',[('the Host','Celebrations gather at your table.'),('the Reveller','Livelier, more of a party.'),('Celebration Star','Version 2.')]),
('N10','华盖','Flowered Canopy','Help, classically mixed','The canopy held over emperors and over the Buddha. The classics give it art, faith and a gifted mind that walks alone.',[('the Poet','Art, depth and solitude in one person, like Li Bai drinking alone with the moon.'),('the Mystic','Leans to faith over art.'),('Muse Star','Version 2.')]),
('N11','驿马','Post Horse','Help, classically mixed','The relay horse of the old post roads, always on its way to the next town.',[('the Traveller','Always moving to the next place. British spelling.'),('the Courier','Closer to the post horse, more about errands.'),('Road Star','Version 2.')]),
('N12','桃花','Peach Blossom','Help, classically mixed','The peach-blossom spirit of the old tales, whose charm draws people in. The classics also warn about where that leads.',[('the Charmer','Easy to like, sought out by many. The price lives in the readings.'),('the Darling','Warmer, more passive.'),('Charm Star','Version 2.')]),
('N13','羊刃','Ram’s Blade','Test','A blade held by a fierce guard. A will that protects what is yours and does not bend. “The Blade” is already the 庚 Day Master.',[('the Warrior','Fierce and protective. Distinct from the General, who is pressure from outside.'),('the Fighter','Plainer, more of a brawl.'),('Ram’s Edge','The D6 ruling, which this would replace.')]),
('N14','劫煞','Robbing Sha','Test','The bandit on the mountain road who takes without warning, as in the old outlaw tales.',[('the Bandit','A storybook outlaw, plain about the cost without calling the reader a victim.'),('the Thief','Sharper and more personal.'),('Raider Star','Version 2.')]),
('N15','亡神','Fleeing Spirit','Test','亡 is “fled, gone missing”. The spirit that slips out of sight and keeps a part of you hidden.',[('the Secret Keeper','What you keep out of sight. Gentle, no echo of death.'),('the Shadow','Shorter, darker.'),('Veil Star','Version 2.')]),
('N16','孤辰','Orphan Hour','Test','The lone figure who needs to be alone even among family and close company.',[('the Loner','Chosen aloneness inside closeness. One word.'),('the Lone Wolf','More vivid, more of a cliché.'),('Solitude Star','Version 2.')]),
('N17','寡宿','Widow’s Lodge','Test','The quiet lodge where someone lives a long season alone. The literal is gendered, the old hermit of the mountain is not.',[('the Hermit','Long seasons in one’s own company. Clearly different from the Loner.'),('the Recluse','Same sense, less familiar.'),('Hermit Star','Version 2.')]),
('N18','魁罡','Dipper’s Head','Test','魁星, the fierce top scorer who kicks the Big Dipper, and 罡, the dipper’s handle. A fierce, decisive, all-or-nothing mind.',[('the Champion','魁 means first place. Fierce and set on winning.'),('the Thunderer','Force and suddenness, like 雷公.'),('Thunder Star','Version 2.')]),
('N19','空亡','Empty and Gone','Test','An empty seat at the table: what sits there arrives late, or lighter than promised.',[('the Void','Not a person. It is the empty place where a character should be, which is the meaning. One non-character keeps the cast honest.'),('the Absent Guest','A person who was invited and did not come.')]),
]
FRAME=[
('H1','羊刃','the Ram Warrior','A blade: violence, wounds, and harm to a husband or wife (刃 against the spouse).','Injury, violence, harm to a partner.','A will that does not bend, firm enough that people step back.','To protect what you built.','You choose which fights are worth having.'),
('H2','劫煞','the Road Bandit','Robbery, sudden loss, accident, a violent end.','Theft as a crime, accident, death.','Something of yours (credit, a plan, a place) taken without warning.','To keep what you built.','You guard faster than most and lose less each time.'),
('H3','亡神','the Secret Keeper','Loss, scheming, hidden dealings, lawsuits.','Deceit, scheming, legal trouble.','A part of you kept out of sight, so people close to you hear things late.','The safety of not being fully seen.','You choose who gets to see all of you.'),
('H4','孤辰','the Lone Watcher','Loneliness; “men fear 孤辰”; parents lost young.','Bereavement, anything gendered.','A partner reads your need to be alone as distance.','Time alone inside closeness.','You stay longest with the person who lets you go quiet.'),
('H5','寡宿','the Quiet Hermit','An empty house; “women fear 寡宿”; widowhood.','Widowhood, loss of a spouse, anything gendered.','Long stretches in your own company, and invitations you miss.','Quiet on your own terms.','You come out of it clearer about who you miss.'),
('H6','魁罡','the Thunder Champion','A fierce, decisive mind, wild swings of fortune; in a woman’s chart, harm to husband and children.','Harm to a partner or children, anything gendered.','A mind so decided that people stop arguing with you.','To decide, and to be right.','People hand you the hard calls, and you carry them.'),
('H7','空亡','the Empty Seat','Emptiness: whatever sits there comes to nothing; “the lone crane and the lone phoenix”.','Loss of a spouse, “nothing comes of it”.','What sits there arrives late, or lighter than it sounded.','Something solid to hold.','You trust what is already in your hands. It lightens a hard star too (S4).'),
('H8','桃花','the Blossom Charmer','Desire, scandal; “most feared in a woman’s chart”.','Scandal, affairs, anything gendered.','More attention than you ask for.','To be liked and wanted.','You choose with care who gets close.'),
('H9','驿马','the Post Rider','Travel and promotion, and for most people “a horse means hard roads”.','Exile, ruin through travel.','You settle less than you planned.','Movement and new ground.','You gain more from the motion than you lose to it.'),
('H10','华盖','the Temple Poet','Art, religion, a gifted mind, and a solitary one.','Isolation as a sentence.','Fewer people understand what you work on.','Depth, alone.','You mind it less than you thought you would.'),
]
NAMES=[(n,zh,lit,g,mean,[TWO_[n]]+([opts[0]] if n!='N19' else [('the Void','Version 3 and earlier. Not a person, the plainest word for an empty place.')])+([o for o in opts if o[1].startswith('Version 2')] if n not in ('N13','N19') else [('the Ram’s Edge','The D6 ruling. One word-pair outside the pattern.')] if n=='N13' else [])) for n,zh,lit,g,mean,opts in NAMES]
names_html='\n'.join(Q(n,f'<span class="zh2">{zh}</span> {opts[0][0]} <small class="grpl">{g} · literally “{lit}”</small>',opts,f'<b>Who it is.</b> {mean}') for n,zh,lit,g,mean,opts in NAMES if n!='N13')
first_html=Q('N0','How the star names are built',[('Two words, an image and a person','the Noble Stranger, the Red Matchmaker, the Road Bandit. One word means a character (the Twin, the General). Two words mean a star. The first word carries the meaning, the second makes a person, the way Chinese folk gods are named (月下老人, 灶君).'),('One word, like the ten','the Patron, the Matchmaker, the Bandit (version 3). Vivid, but a star and a character read the same, and several sit close: the Scholar and the Sage, the Captain and the General, the Provider and the Steward.'),('A meaning word plus “Star”','Patron Star, Raider Star (version 2).'),('The literal names','Nobleman, Red Phoenix (version 1).')])+'\n'+Q('G0','How the page talks about them',[('Guests who visit your gates','Characters sit in your seats and run your life. Stars visit a gate and colour it. The title reads “Six guests sit in your chart, and a helper is on the way.” The groups read: guests who help, guests who test, guests on their way. Every reading keeps to that: a star visits, it never sits in a seat. The gate checks it.'),('Stars, only renamed','Keep “Six old stars sit in your chart” and the groups as they are.')],'Today: “Six old stars sit in your chart, and a helper is arriving.” Groups: stars that help, stars that test, stars arriving with your time (P4).')+'\n'+Q('C0','How a reader tells them apart on screen',[('As built, made a rule','A star always shows as a pill chip, gold for help and outlined for test, with “a star · 红鸾” under its name. A character always shows as a seat card with its element dot. No new design. A star never takes a seat card, and a character never wears the star chip.'),('Ask the design director for a star mark','A small star mark inside each chip, from the design-director session. Layout is theirs.')])+'\n'+[Q(n,f'<span class="zh2">{zh}</span> {opts[0][0]} <small class="grpl">{g} · replaces the D6 ruling</small>',opts,f'<b>Who it is.</b> {mean} You ruled “the Ram’s Edge” in D6. Under N0 A it becomes one of the two-word cast.') for n,zh,lit,g,mean,opts in NAMES if n=='N13'][0]
frame_rows=''.join(f'<tr><td><b>{en}</b> <span class="zh">{zh}</span></td><td>{cl}</td><td>{nv}</td><td>{c}</td><td>{w}</td><td>{cr}</td></tr>' for _,zh,en,cl,nv,c,w,cr in FRAME)
frame_q='\n'.join(Q(h,f'<span class="zh2">{zh}</span> {en}: approve this frame?',[('Approve','The cost, the want and what carries you, as in the table.'),('Sharper','Keep the cost, and let a reading close on the cost alone when it is truer.'),('Leave the star out','Drop it from the product.')]) for h,zh,en,*_ in FRAME)
SQ=[
('S1','The mixed stars (the Blossom Charmer, the Post Rider, the Temple Poet): which group?',[('Guests who help','Keep the two groups. Each reading carries the price inside it (“you choose with care who gets close”).'),('A third group','“Guests who cut both ways” between help and test.')],'The classics call these mixed or worse. Modern readers take them as gifts. The friction rule asks for the cost to be named, which the texts do either way.'),
('S2','The Road Bandit and the Secret Keeper: one row or two?',[('Two cards','They read differently: one is loss from outside, the other a part of you held back. On the golden chart they sit in different gates.'),('One combined row','The round-5 idea, one “hard pair” row.')]),
('S3','A star in two gates (chart B: the Red Matchmaker and the Blossom Charmer)',[('One card, a labelled reading per gate','The joined “where” line goes. Each reading gets its own gate and tense label (see chart B).'),('One card per gate','Two Red Matchmaker cards on the page.')]),
('S4','A star that sits on a Void branch',[('Add one line under it','“This star sits on your Void, and you meet its gift late and light.” A test star gets “its test”. The classics say the Void empties hard stars as well as good ones. Two new units.'),('No note','The Void card speaks for itself.')],'Chart B: the Blossom Charmer sits on the Empty Seat in the Year Gate. Chart C: the Road Bandit sits on the Void in the Month Gate.'),
('S5','Heavenly and Moon Virtue on the day stem (a calculator change)',[('Count the day stem','The majority of the sources match any of the four stems, and 日德 on the day stem is the strongest seat. Chart C gains the Heavenly Guardian in the Day Gate. Golden and B are unchanged. The golden check for C is updated.'),('Keep the day stem out','As built. The day stem is the reader, so no star is read on it.')]),
('S6','Which years the Advisor list shows',[('This year and the next four','Every year’s new stars. Chart B, at the end of its decade, sees 2026 to 2030 instead of nothing.'),('The rest of the current decade','As built. Chart B shows nothing. Golden shows the years 2026 to 2032.')]),
('S7','Chip lines read true in any gate and tense',[('Rewrite to be tense-free','One chip line serves every chart. “Loss taught you to guard what is yours” is past, and wrong for a Road Bandit still coming. After: “You guard what is yours faster than most.”'),('Keep as written','')]),
('S8','Year Gate readings for readers under sixteen',[('Write them','Thirteen extra units, so a draft can never reach a reader.'),('Skip','Under-sixteens keep the draft line.')]),
('S9','I2 · Do stars stay in the product?',[('Yes, as planned','Free chips, the rest by tier.'),('No','Remove the section.')]),
('S10','I3 · Pricing for stars',[('No separate price','Free: the chips and lines. Seeker: the readings and the decade stars. Advisor: the year stars. As ruled in round 4.'),('A one-off add-on','Stars sold on their own.')]),
]
struct_q='\n'.join(Q(a,b,c,d[0] if d else None) for a,b,c,*d in SQ)
CNEW='<div class="newc">'+card('help','the Heavenly Guardian','天德贵人','Day Gate · Home Chapter · from 2027','Trouble passes you more lightly than most.',None,[(None,'STAR tiande · reading.day.coming',S['STAR tiande · reading.day.coming'],None,False)])+'</div>'
tpl=open('round-9/page.tpl.html').read()
out=tpl.replace('{{FIRST}}',first_html).replace('{{NAMES}}',names_html).replace('{{FRAME_ROWS}}',frame_rows).replace('{{FRAME_Q}}',frame_q).replace('{{STRUCT_Q}}',struct_q)\
 .replace('{{GOLDEN}}',phone('golden','','')).replace('{{B}}',phone('B','','')).replace('{{C}}',phone('C','','').replace('<span class="grp">Guests who test</span>', CNEW+'<span class="grp">Guests who test</span>',1))
ids=['N0','G0','C0','N13']+[n[0] for n in NAMES if n[0]!='N13']+[f[0] for f in FRAME]+[s[0] for s in SQ]
out=out.replace('{{IDS}}',json.dumps(ids))
open('round-9/stars-round-9.html','w').write(out)
print(len(out))
