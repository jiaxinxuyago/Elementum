import html
e=html.escape
def opt(rows):
    return '<div class="tw"><table>'+''.join(f'<tr><td class="k">{e(k)}</td><td>{v}</td></tr>' for k,v in rows)+'</table></div>'
def ba(rows):
    return '<div class="tw"><table><tr><th>Where</th><th>Now</th><th>Proposed</th></tr>'+''.join(f'<tr><td class="k">{e(w)}</td><td class="old">{e(a)}</td><td>{e(b)}</td></tr>' for w,a,b in rows)+'</table></div>'
def sec(code,title,note,body): return f'<section class="bt"><header><p class="code">{code}</p><h3>{title}</h3><p class="nt">{note}</p></header>{body}</section>'
B=[]
B.append(sec('BR1','When the amount and the step disagree','In a sweep of 4,000 charts, 70% have at least one energy where the two lines pull apart: a low amount told to release (most often Expression, Order, Action), or a high amount told to grow. Example today, the Vine with Fire at 3%: "You have very little. Your thoughts stay in until they are finished." then Release it: "Before you share it, wait one night."',
 opt([('A (recommended)','One bridging line before the step, and a step written for that case (2 + 10 lines below).'),('B','The two bridging lines only. The steps stay as they are.'),('C','Leave it as it is.')])
 +'<p class="sub">Low amount, Release it</p>'+opt([('Bridge','There is little here, and your chart runs easier with it small. Leave it that way.'),('Body','Let one contest go this week without stepping in.'),('Mind','Decide one small thing today on what you already know.'),('Expression','Keep one opinion to yourself this week and watch what happens.'),('Action','Leave one new opportunity alone this month.'),('Order','Turn down one new obligation this week.')])
 +'<p class="sub">High amount, Grow it</p>'+opt([('Bridge','You hold plenty, and your chart does well on it. Put it to use.'),('Body','Back your own call on one decision this week without asking around.'),('Mind','Turn one thing you have studied into a plan this week.'),('Expression','Put one finished piece in front of people this week.'),('Action','Give your biggest goal your best hours this week.'),('Order','Say yes to one responsibility that stretches you.')])))
B.append(sec('BC1','The Balanced chart\'s circle line','A Balanced chart has no needed energy, so its circle has no Fuel, only its Bond and its Mirror. The tile and the revelation\'s circle block stay hidden on elementum.life until this is ruled. Shown for an Oak, whose Bond is the Field.',
 opt([('A (recommended)','Your chart is even. The Field is your closest match.'),('B','The Field is your classical match. (today\'s draft)'),('C','Your match is the Field.')])))
k2=[('Wood · Wealth overview (k2.js:131)','Fortune arrives through the reaching.','What you gain comes through the reaching.'),
('Wood · Wealth overview (:144)','Your fortune is cumulative and alive, and it rewards the seasons you refuse to rush.','What you build is cumulative and alive, and it pays you for the seasons you refuse to rush.'),
('Fire · Performance (:254)','Brilliance plus preparation reads as destiny.','Brilliance plus preparation looks effortless from the seats.'),
('Fire · Wealth overview (:261)','Opportunity finds you at gatherings, luck likes your laugh, and money arrives in blazes and leaves by the same door. You are fortune’s favorite dinner guest.','Opportunity finds you at gatherings, doors open for your laugh, and money arrives in blazes and leaves by the same door. You are the guest every host wants at the table.'),
('Fire · Ventures (:267)','That partnership is your fortune.','That partnership is where the gain stays.'),
('Earth · shared holdings (:358)','Your fortune lives in shared soil.','Your wealth grows in shared soil.'),
('Earth · Wealth overview (:391)','Fortune trusts you because you give it somewhere to live.','Money stays with you because you give it somewhere to live.'),
('Metal · Wealth overview (:521)','Fortune favors your precision.','Your precision is what pays.'),
('Water · Wealth overview (:651)','Your fortune is distributive: many streams, wide deltas, wealth that moves.','Your wealth is distributive: many streams, wide deltas, money that moves.'),
('Water · Shares freely (:654)','Around you, a bit of good fortune turns into a party for everyone.','Around you, a good week turns into a party for everyone.'),
('Water · Wealth (:669)','Map the canals once a year and fortune stays irrigated.','Map the canals once a year and the money keeps reaching where you sent it.'),
('Pairing 伤官配印 (tgPatterns.js:34)','Underneath runs a lucky pairing: your boldest ideas and your patience for study feed each other instead of fighting.','Underneath runs a pairing that works for you: your boldest ideas and your patience for study feed each other instead of fighting.'),
('Compatibility intro (CompatScreen.jsx:56)','…two birth charts are laid side by side — to see where their energies nourish, where they clash, and whether the bond is written in the pillars.','…two birth charts are laid side by side to see where their energies nourish, where they clash, and what the bond asks of each of you.'),
('Compatibility step (:68)','Receive how your elements answer each other — and the verdict.','See how your elements answer each other, and how to use it.')]
B.append(sec('FW1','Fate words, batch 1','Fourteen live lines that say destiny, fortune, lucky or verdict, rewritten as how to use what the reader has. The old text is kept in the station\'s ore.',
 opt([('A (recommended)','Adopt all fourteen.'),('B','Adopt with changes: name the row and the wording.'),('C','Hold.')])+ba(k2)))
B.append(sec('FW2','Fate words, the rest','The same sweep found more than the dispatch listed. Rule the scope before I draft them.',
 opt([('A (recommended)','Draft all three groups as batch 2, shown to you the same way.'),('B','Draft only the "verdict" and "meant to be" lines. Leave everyday "luck".'),('C','Stop at batch 1.')])
 +opt([('"verdict", about 12 lines','The Blade\'s and Jewel\'s archetype texts use it for the reader\'s own judgement ("underneath the settled verdict…"). Two more sit on the Consultant and the Elemental Draw.'),('"luck" in the seat readings, 7 shown lines','The seat readings (positions.js): "Your luck travels", "Expect your best luck at a distance", "career luck favors your niche". That file is the Domains session\'s. It reports 7 shown lines left with "luck" (the "Expect" forecasts are already rewritten) and 8 in a field no screen shows. If you rule A, Domains applies it there, not this session.'),('Everyday "luck", 4 lines','In k2.js: "other people\'s bad luck", "Order weighs more than luck with you". These describe chance, not a forecast. I would leave them.')])))
B2=[("Blade · open band (archetypeSource.js:707)","The world arrives before the verdict does.","The world arrives before the judgement does."),
("Blade · the cost, two bands (:733, :736)","The verdict also becomes load-bearing: once formed, it requires new information to pass through the same evaluative system…","The conclusion also becomes load-bearing: once formed, it requires new information to pass through the same evaluative system…"),
("Blade · tested band (:738)","What holds you back is the gap between maintaining the verdict and operating inside the system that lets you act on it.","What holds you back is the gap between holding your conclusion and operating inside the system that lets you act on it."),
("Blade · what people miss, two bands (:761, :762)","But underneath the settled verdict, there is sometimes a quieter question…","But underneath the settled conclusion, there is sometimes a quieter question…"),
("Blade · the interior, two bands (:834, :835)","…whether the verdict holds, whether the standard is being aimed at the right things.","…whether the judgement holds, whether the standard is being aimed at the right things."),
("Jewel · tested band (:904)","…guarding against a verdict rather than seeking the truth of the thing.","…guarding against being judged rather than seeking the truth of the thing."),
("Jewel · flowing band (:922)","…where a purely evaluative configuration would stop at the verdict.","…where a purely evaluative configuration would stop at the assessment."),
("A chip title (:1271)","The Peer’s Verdict","The Peer’s Word"),
("Field · flowing band (:612)","…people who became who they were meant to be…","…people who grew into themselves…"),
("Candle variant (stemVariants.js:79)","You hold the small flame the way it was meant to be held, steady, trimmed…","You hold the small flame the way it works best, steady, trimmed…"),
("Wood · Solitude (k2.js:190)","Gardens are meant to be walked in.","A garden is for walking in."),
("Water · Knowledge (k2.js:721)","Springs are meant to be found.","Let people find the spring."),
("Faces teaser (facesContent.js:27)","You trust the slow ledger over the lucky break…","You trust the slow ledger over the quick win…"),
("Elemental Draw answer (ElementalDrawScreen.jsx:41)","Metal cuts cleanly once you stop arguing with the verdict.","Metal cuts cleanly once you stop arguing with what you already know."),
("Consultant sample reply (AIConsultantScreen.jsx:57)","Your {element} nature has likely already reached a verdict here.","Your {element} nature has likely already decided here.")]
B=[sec("FW3","Fate words, batch 2","Eighteen lines (three rows cover two lines each) that say verdict, meant to be or lucky. Most use \"verdict\" for the reader's own judgement, so the change is one word. I have not confirmed every one of these fields is shown on a screen today. The four everyday \"luck\" lines in k2.js stay as they are. The seven \"luck\" lines in the seat readings come from the Domains session.",
 opt([("A (recommended)","Adopt all."),("B","Adopt with changes: name the row and the wording."),("C","Hold.")])+ba(B2))]
page=open('tpl.html').read().replace('{{BODY}}',''.join(B))
open('rulings.html','w').write(page);print(len(page))
