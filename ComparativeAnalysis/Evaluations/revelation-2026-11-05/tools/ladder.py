import json,re
R='ruled'; D='draft'
FN=['Body','Mind','Expression','Action','Order']
data={
"_doc":"The explanation ladder (owner EV2 A, 2026-11-06) for all ten stems. Rows marked ruled come from the Blade's script (V0-V9 A, 2026-11-13); rows marked draft are new, for the owner to rule. After ruling, these move into the stations (TEMPLATED/tpl_ladder.json and STEM/*.json) through the usual pipeline.",
"shared":{
 "naming_footnote":{"text":"Your Day Master is the element of the day you were born, read as your core self. It is not your year animal.","status":R},
 "model_heading":{"text":"Everyone holds all five elements. In you, each one runs a part of your life.","status":R},
 "model_close":{"text":"The next five cards take them one at a time.","status":R},
 "element_heading":{
  "Wood":("Wood is the element of growth. It reaches, builds and keeps going.",D),
  "Fire":("Fire is the element of warmth. It lights, warms and draws people in.",D),
  "Earth":("Earth is the element of ground. It holds, steadies and supports.",D),
  "Metal":("Metal is the element of clarity. It sorts, cuts and decides.",R),
  "Water":("Water is the element of flow. It moves, senses and finds a way.",D)},
 "function_plain":{
  "Body":("Body is you yourself: confidence, limits, standing your ground.",R),
  "Mind":("Mind is how you take things in: learning, thinking, rest, the people you lean on.",R),
  "Expression":("Expression is how you put yourself out: speaking, making, showing what you feel.",R),
  "Action":("Action is what you go after: work, money, results you can point to.",R),
  "Order":("Order is the rules, deadlines and people you answer to.",R)},
 "function_short":{
  "Body":("You yourself: your confidence, your limits, how you stand your ground.",R),
  "Mind":("How you take things in: learning, rest, the support you lean on.",R),
  "Expression":("How you put yourself out: speaking, making, showing what you feel.",R),
  "Action":("What you go after: work, money, results.",R),
  "Order":("The rules, deadlines and people you answer to.",R)},
 "nature_pair":{
  "Wood":{"Water":("Water is rain and river: it soaks the roots that feed a tree.",D),"Fire":("Fire is heat and light: the flame that a tree's wood becomes.",D),"Earth":("Earth is the ground: the soil a tree's roots break open.",D),"Metal":("Metal is the blade: the pruning edge that shapes a tree.",D)},
  "Fire":{"Wood":("Wood is fuel: the kindling a fire lives on.",D),"Earth":("Earth is the ground: the hearth where a fire leaves its warmth.",D),"Metal":("Metal is ore and steel: what a fire softens and shapes.",D),"Water":("Water is rain and river: what keeps a fire in bounds.",D)},
  "Earth":{"Fire":("Fire is heat and light: the sun that warms the ground.",D),"Metal":("Metal is ore: what the ground brings up from inside it.",D),"Water":("Water is rain and river: what the ground holds and channels.",D),"Wood":("Wood is a tree: the roots that hold a hillside in place.",D)},
  "Metal":{"Earth":("Earth is the ground: it holds and it absorbs.",R),"Wood":("Wood is a tree that keeps reaching.",R),"Water":("Water is flow: the river that carries things out.",R),"Fire":("Fire is heat and light: the forge that shapes metal.",R)},
  "Water":{"Metal":("Metal is stone and ore: the rock a spring rises from.",D),"Wood":("Wood is a tree: what grows wherever water goes.",D),"Fire":("Fire is heat and light: what water cools and turns to steam.",D),"Earth":("Earth is the ground: the banks that give a river its course.",D)}},
 "in_you":{
  "Body":{"absent":("You have none of it in your chart. You lean on others to steady you, and your own wants come last.",D),"thin":("You have very little. You doubt your own footing and give way before you mean to.",D),"present":("You have a fair amount. You know what you want and hold to it, without forcing it.",D),"abundant":("You have more than enough. You rely on yourself, sometimes past the point it helps.",R),"dominant":("You have a great deal. You trust yourself first, and other people's help feels like the slower way.",D)},
  "Mind":{"absent":("You have none of it in your chart. You learn by doing, and rest feels like lost time.",D),"thin":("You have very little. You run on what you already know, and you rarely stop to refill.",D),"present":("You have a fair amount. You take things in at a steady pace and know when to rest.",D),"abundant":("You have a lot of it. You gather and prepare more than most, and you feel safest when you know enough.",R),"dominant":("You have a great deal. You think, read and plan far more than you act, and you wait to feel ready.",D)},
  "Expression":{"absent":("You have none of it in your chart. What you feel and think stays inside, and others have to guess.",D),"thin":("You have very little. Your thoughts stay in until they are finished.",R),"present":("You have a fair amount. You say what you mean when it matters, and what you make carries you.",D),"abundant":("You have a lot of it. Ideas and words come out easily, and you show what you feel.",D),"dominant":("You have a great deal. You pour yourself out, talking, making and giving, faster than you refill.",D)},
  "Action":{"absent":("You have none of it in your chart. Chasing results feels foreign, and you work for meaning before money.",D),"thin":("You have very little. You know what you want and put off going after it.",D),"present":("You have a fair amount. You go after what you want and finish most of what you start.",D),"abundant":("You have plenty. You build steadily, and a finished task settles you.",R),"dominant":("You have a great deal. You chase results and take on more than one person carries well.",D)},
  "Order":{"absent":("You have none of it in your chart. You set your own rules, and outside pressure slides off you.",D),"thin":("You have very little. Outside rules sit lightly on you, and you answer mostly to yourself.",D),"present":("You have a fair amount. You respect structure and carry responsibility without being crushed by it.",D),"abundant":("You have a lot of it. You feel the weight of rules, deadlines and other people's expectations.",D),"dominant":("You have a great deal. Pressure from outside sits on you most days, and you hold yourself to every standard.",D)}},
 "notice":{
  "Body":{"low":("you agree first and wonder later what you wanted.",D),"mid":("you speak up for yourself when it counts, then let the rest go.",D),"high":("you finish alone what two people would finish faster.",R)},
  "Mind":{"low":("you start a task before you have read the instructions.",D),"mid":("you rest when you are tired, without guilt.",D),"high":("you keep researching a decision long after you could have made it.",R)},
  "Expression":{"low":("people only learn what you think once you've already decided.",R),"mid":("you share an idea once it has a shape.",D),"high":("you have said it before you meant to.",D)},
  "Action":{"low":("the plan is clear in your head, and the first step waits.",D),"mid":("you finish what you start, most of the time.",D),"high":("a day without one thing done leaves you restless.",R)},
  "Order":{"low":("a deadline you set yourself slips, while one from someone else holds.",D),"mid":("you keep your word, and you expect others to keep theirs.",D),"high":("you check a rule twice before you bend it.",D)}},
 "try":{
  "Body":{"grow":("say no to one request this week, and keep the no.",D),"release":("hand one task to someone else this week and leave it with them.",R),"keep":("keep one hour a week that belongs only to you.",D)},
  "Mind":{"grow":("give yourself one quiet hour a day to read or rest.",D),"release":("give your next decision a deadline, then decide on the day.",R),"keep":("learn one new thing a week, and use it.",D)},
  "Expression":{"grow":("say one unfinished thought out loud this week.",R),"release":("before you share it, wait one night.",D),"keep":("make one small thing a week and show it to someone.",D)},
  "Action":{"grow":("aim it at one result that matters this week, not five that don't.",R),"release":("drop one goal this month that you only chase from habit.",D),"keep":("finish one task each day before you start the next.",D)},
  "Order":{"grow":("take on one commitment someone else will hold you to.",R),"release":("let one rule go this week and see what holds.",D),"keep":("keep one promise to someone else this week, on time.",D)}},
 "condition":{
  "Overfueled":{"heading":("You run Overfueled: more comes into you than goes out.",R),"body":("You take in, prepare and carry more than you let out. It makes you steady under pressure. It also means energy builds up with nowhere to go, and it comes out as impatience.",R),"try":("Let one thing out each day: a decision, a sentence, a finished draft.",R)},
  "Underfueled":{"heading":("You run Underfueled: more goes out of you than comes in.",D),"body":("You give, spend and adapt more than you take in. It makes you flexible and generous. It also means you run low, and you feel it as a tiredness that is hard to explain.",D),"try":("Take one thing in each day: a slow meal, an hour of rest, a word of help.",D)},
  "Balanced":{"heading":("You run Balanced: what comes in roughly matches what goes out.",D),"body":("You take in about as much as you give. It makes you steady and hard to tip over. The work is keeping it that way when a hard season pushes you off centre.",D),"try":("Notice which energy a hard week pulls on, and feed it back that weekend.",D)}},
 "mode_plain":{
  "Body":("Body mode: you trust yourself first and lean on your own strength.",D),"Mind":("Mind mode: you take in and prepare before you act.",R),"Expression":("Expression mode: you put yourself out, in words, work and feeling.",D),"Action":("Action mode: you go after results and measure the day by what got done.",D),"Order":("Order mode: you hold yourself to rules and to the standards others set.",D)},
 "need_phrase":{
  "_pattern":"Your chart leans on {Mode}. The {El} you need is {phrase}.",
  "Order":("real stakes from outside: someone or something to answer to",D),"Mind":("rest and support: time to take things in",D),"Expression":("a way out: words, work, something you make",D),"Action":("a real goal: something to go after and finish",D),"Body":("your own footing: time and space that are yours",D)},
 "circle_close":{"text":"Who in your life is one?","status":R}},
"stems":{
 "庚":{"name":"The Blade","element_line":("Yang Metal, steel that has already been through the fire.",R),"recognition":("You'd rather say the true thing than the easy one.",R),"as_line":("As a Blade, you are that edge in a person.",R),"behaviour":("You see the flaw in a plan before anyone asks.",R),"claims":"locked","contrast":("People see someone sharp and certain. Inside, you are checking every word for whether it is true.",R),"self_nature":("Metal is your own element: the edge itself.",R),"overrides":{"in_you.Order.thin":"You have almost none. Without someone real to answer to, you sharpen alone and wait for a test worth meeting.","notice.Order.low":"you do your best work when someone whose judgement you respect sets the bar.","need_phrase.Order":"real stakes from outside, someone or something that tests the edge"}},
 "辛":{"name":"The Jewel","element_line":("Yin Metal, the cut stone that holds the light.",D),"recognition":("You know good from almost good at a glance.",D),"as_line":("As a Jewel, you are that finish in a person.",D),"behaviour":("You go back to fix a detail most people would not see.",D),"contrast":("People see someone polished and composed. Inside, you are still finding what isn't quite right.",D),"self_nature":("Metal is your own element: the cut stone itself.",D)},
 "甲":{"name":"The Oak","element_line":("Yang Wood, the tall tree that grows toward the light.",D),"recognition":("You start before the path is clear.",D),"as_line":("As an Oak, you are that upward push in a person.",D),"behaviour":("You are already planning the next thing before this one ends.",D),"contrast":("People see someone sure of where they're going. Inside, you aren't certain the light is there, and you go anyway.",D),"self_nature":("Wood is your own element: the trunk itself.",D)},
 "乙":{"name":"The Vine","element_line":("Yin Wood, the green that climbs and finds a way.",D),"recognition":("You get where you're going, one way or another.",D),"as_line":("As a Vine, you are that patient reach in a person.",D),"behaviour":("You change the route without changing where you're headed.",D),"contrast":("People read you as easygoing. Inside, you are working three routes at once.",D),"self_nature":("Wood is your own element: the green that climbs.",D)},
 "丙":{"name":"The Sun","element_line":("Yang Fire, the sun that gives light to everyone.",D),"recognition":("You light up a gathering before you've said anything.",D),"as_line":("As a Sun, you are that warmth in a person.",D),"behaviour":("You notice who is left out and pull them in.",D),"contrast":("People see someone with warmth to spare. Inside, you are rarely the one anyone checks on.",D),"self_nature":("Fire is your own element: the sunlight itself.",D)},
 "丁":{"name":"The Candle","element_line":("Yin Fire, the flame that burns close and steady.",D),"recognition":("When you care about something, it gets all of you.",D),"as_line":("As a Candle, you are that focused warmth in a person.",D),"behaviour":("You remember the small thing someone told you months ago.",D),"contrast":("People see someone quiet and contained. Inside, you are burning steadily for the few things you love.",D),"self_nature":("Fire is your own element: the flame you keep.",D)},
 "戊":{"name":"The Mountain","element_line":("Yang Earth, the mountain others find their footing on.",D),"recognition":("You're the steady one when things start to shake.",D),"as_line":("As a Mountain, you are that ground in a person.",D),"behaviour":("People bring you their plans to see if they hold.",D),"contrast":("People see someone unshakeable. Inside, you are carrying more than you've told anyone.",D),"self_nature":("Earth is your own element: the mountain itself.",D)},
 "己":{"name":"The Field","element_line":("Yin Earth, the field that turns what it holds into growth.",D),"recognition":("The people around you grow, and you are part of the reason.",D),"as_line":("As a Field, you are that quiet care in a person.",D),"behaviour":("You notice what someone needs before they ask.",D),"contrast":("People see someone easy and calm. Inside, you are keeping track of everyone's needs, yours last.",D),"self_nature":("Earth is your own element: the soil that grows things.",D)},
 "壬":{"name":"The Ocean","element_line":("Yang Water, the open sea that keeps moving.",D),"recognition":("Your mind runs a few moves further out than the conversation.",D),"as_line":("As an Ocean, you are that depth in a person.",D),"behaviour":("You lose interest once you've understood how something works.",D),"contrast":("People see someone calm on the surface. Inside, there is a whole current they don't see.",D),"self_nature":("Water is your own element: the open sea itself.",D)},
 "癸":{"name":"The Rain","element_line":("Yin Water, the rain that reaches everything quietly.",D),"recognition":("You take in what others feel without trying.",D),"as_line":("As the Rain, you are that sensitivity in a person.",D),"behaviour":("You know a friend is upset from one text.",D),"contrast":("People see someone gentle and easy to be with. Inside, you are holding feelings that aren't yours.",D),"self_nature":("Water is your own element: the rain itself.",D)}}}
def norm(o):
  if isinstance(o,tuple): return {"text":o[0],"status":o[1]}
  if isinstance(o,dict): return {k:norm(v) for k,v in o.items()}
  return o
out=norm(data)
json.dump(out,open('/home/user/Elementum/ComparativeAnalysis/Evaluations/revelation-2026-11-05/LADDER_ALL_STEMS_DRAFT.json','w'),ensure_ascii=False,indent=1)
# voice check
bad=re.compile(r'—|;|\bnever\b|\balways\b|\bnothing\b|\bnobody\b|\broom\b|\byou can\b|\bverdict\b|\bfate|\bdestin|\blucky\b|\bfortune',re.I)
cnt={'ruled':0,'draft':0};hits=[]
def walk(o,path=''):
  if isinstance(o,dict):
    if 'text' in o and 'status' in o:
      cnt[o['status']]+=1
      if o['status']=='draft' and bad.search(o['text']): hits.append((path,o['text']))
    for k,v in o.items(): walk(v,path+'.'+k)
walk(out); print(cnt, 'voice hits:',hits)
