// ===================================================================
// ELEMENTUM · the explanation ladder (owner 2026-11-06 EV1–EV5 A; words
// ruled 2026-11-13: the Blade's script V0–V9 A, then S1–S7 and P-* A)
// ===================================================================
// The first pass scored 37/100 against the four pillars (BIZ_07): labels
// stood on labels (CG1). Every first-pass label now climbs five rungs:
// what it is in nature, what it runs in a life, what the amount means in
// you, a moment you would notice, one thing to try. LADDER is shared by
// every stem; STEM_LADDER holds each Day Master's own lines (its two
// "what people notice" claims and its inscription stay where they are
// locked: DM_READING and the stem card). `overrides` are a stem's own
// versions of shared rows, keyed "table.Function.band".
// Transcribed from the station (TEMPLATED/tpl_ladder.json, STEM/*.json
// `ladder`); export-reading-templates --check keeps the two in sync.
// Record: ComparativeAnalysis/Evaluations/revelation-2026-11-05/.
// Not rendered yet: the revelation build is the design session's.
// ===================================================================

export const LADDER = {
  "naming_footnote": "Your Day Master is the element of the day you were born, read as your core self. It is not your year animal.",
  "model_heading": "Everyone holds all five elements. In you, each one runs a part of your life.",
  "model_close": "The next five cards take them one at a time.",
  "element_heading": {
    "Wood": "Wood is the element of growth. It reaches, builds and keeps going.",
    "Fire": "Fire is the element of warmth. It lights, warms and draws people in.",
    "Earth": "Earth is the element of ground. It holds, steadies and supports.",
    "Metal": "Metal is the element of clarity. It sorts, cuts and decides.",
    "Water": "Water is the element of flow. It moves, senses and finds a way."
  },
  "function_plain": {
    "Body": "Body is you yourself: confidence, limits, standing your ground.",
    "Mind": "Mind is how you take things in: learning, thinking, rest, the people you lean on.",
    "Expression": "Expression is how you put yourself out: speaking, making, showing what you feel.",
    "Action": "Action is what you go after: work, money, results you can point to.",
    "Order": "Order is the rules, deadlines and people you answer to."
  },
  "function_short": {
    "Body": "You yourself: your confidence, your limits, how you stand your ground.",
    "Mind": "How you take things in: learning, rest, the support you lean on.",
    "Expression": "How you put yourself out: speaking, making, showing what you feel.",
    "Action": "What you go after: work, money, results.",
    "Order": "The rules, deadlines and people you answer to."
  },
  "nature_pair": {
    "Wood": {
      "Water": "Water is rain and river: it soaks the roots that feed a tree.",
      "Fire": "Fire is heat and light: the flame that a tree's wood becomes.",
      "Earth": "Earth is the ground: the soil a tree's roots break open.",
      "Metal": "Metal is the blade: the pruning edge that shapes a tree."
    },
    "Fire": {
      "Wood": "Wood is fuel: the kindling a fire lives on.",
      "Earth": "Earth is the ground: the hearth where a fire leaves its warmth.",
      "Metal": "Metal is ore and steel: what a fire softens and shapes.",
      "Water": "Water is rain and river: what keeps a fire in bounds."
    },
    "Earth": {
      "Fire": "Fire is heat and light: the sun that warms the ground.",
      "Metal": "Metal is ore: what the ground brings up from inside it.",
      "Water": "Water is rain and river: what the ground holds and channels.",
      "Wood": "Wood is a tree: the roots that hold a hillside in place."
    },
    "Metal": {
      "Earth": "Earth is the ground: it holds and it absorbs.",
      "Wood": "Wood is a tree that keeps reaching.",
      "Water": "Water is flow: the river that carries things out.",
      "Fire": "Fire is heat and light: the forge that shapes metal."
    },
    "Water": {
      "Metal": "Metal is stone and ore: the rock a spring rises from.",
      "Wood": "Wood is a tree: what grows wherever water goes.",
      "Fire": "Fire is heat and light: what water cools and turns to steam.",
      "Earth": "Earth is the ground: the banks that give a river its course."
    }
  },
  "in_you": {
    "Body": {
      "absent": "You have none of it in your chart. You lean on others to steady you, and your own wants come last.",
      "thin": "You have very little. You doubt your own footing and give way before you mean to.",
      "present": "You have a fair amount. You know what you want and hold to it, without forcing it.",
      "abundant": "You have more than enough. You rely on yourself, sometimes past the point it helps.",
      "dominant": "You have a great deal. You trust yourself first, and other people's help feels like the slower way."
    },
    "Mind": {
      "absent": "You have none of it in your chart. You learn by doing, and rest feels like lost time.",
      "thin": "You have very little. You run on what you already know, and you rarely stop to refill.",
      "present": "You have a fair amount. You take things in at a steady pace and know when to rest.",
      "abundant": "You have a lot of it. You gather and prepare more than most, and you feel safest when you know enough.",
      "dominant": "You have a great deal. You think, read and plan far more than you act, and you wait to feel ready."
    },
    "Expression": {
      "absent": "You have none of it in your chart. What you feel and think stays inside, and others have to guess.",
      "thin": "You have very little. Your thoughts stay in until they are finished.",
      "present": "You have a fair amount. You say what you mean when it matters, and what you make carries you.",
      "abundant": "You have a lot of it. Ideas and words come out easily, and you show what you feel.",
      "dominant": "You have a great deal. You pour yourself out, talking, making and giving, faster than you refill."
    },
    "Action": {
      "absent": "You have none of it in your chart. Chasing results feels foreign, and you work for meaning before money.",
      "thin": "You have very little. You know what you want and put off going after it.",
      "present": "You have a fair amount. You go after what you want and finish most of what you start.",
      "abundant": "You have plenty. You build steadily, and a finished task settles you.",
      "dominant": "You have a great deal. You chase results and take on more than one person carries well."
    },
    "Order": {
      "absent": "You have none of it in your chart. You set your own rules, and outside pressure slides off you.",
      "thin": "You have very little. Outside rules sit lightly on you, and you answer mostly to yourself.",
      "present": "You have a fair amount. You respect structure and carry responsibility without being crushed by it.",
      "abundant": "You have a lot of it. You feel the weight of rules, deadlines and other people's expectations.",
      "dominant": "You have a great deal. Pressure from outside sits on you most days, and you hold yourself to every standard."
    }
  },
  "notice": {
    "Body": {
      "low": "you agree first and wonder later what you wanted.",
      "mid": "you speak up for yourself when it counts, then let the rest go.",
      "high": "you finish alone what two people would finish faster."
    },
    "Mind": {
      "low": "you start a task before you have read the instructions.",
      "mid": "you rest when you are tired, without guilt.",
      "high": "you keep researching a decision long after you could have made it."
    },
    "Expression": {
      "low": "people only learn what you think once you've already decided.",
      "mid": "you share an idea once it has a shape.",
      "high": "you have said it before you meant to."
    },
    "Action": {
      "low": "the plan is clear in your head, and the first step waits.",
      "mid": "you finish what you start, most of the time.",
      "high": "a day without one thing done leaves you restless."
    },
    "Order": {
      "low": "a deadline you set yourself slips, while one from someone else holds.",
      "mid": "you keep your word, and you expect others to keep theirs.",
      "high": "you check a rule twice before you bend it."
    }
  },
  "try": {
    "Body": {
      "grow": "say no to one request this week, and keep the no.",
      "release": "hand one task to someone else this week and leave it with them.",
      "keep": "keep one hour a week that belongs only to you."
    },
    "Mind": {
      "grow": "give yourself one quiet hour a day to read or rest.",
      "release": "give your next decision a deadline, then decide on the day.",
      "keep": "learn one new thing a week, and use it."
    },
    "Expression": {
      "grow": "say one unfinished thought out loud this week.",
      "release": "before you share it, wait one night.",
      "keep": "make one small thing a week and show it to someone."
    },
    "Action": {
      "grow": "aim it at one result that matters this week, not five that don't.",
      "release": "drop one goal this month that you only chase from habit.",
      "keep": "finish one task each day before you start the next."
    },
    "Order": {
      "grow": "take on one commitment someone else will hold you to.",
      "release": "let one rule go this week and see what holds.",
      "keep": "keep one promise to someone else this week, on time."
    }
  },
  "condition": {
    "Overfueled": {
      "heading": "You run Overfueled: more comes into you than goes out.",
      "body": "You take in, prepare and carry more than you let out. It makes you steady under pressure. It also means energy builds up with nowhere to go, and it comes out as impatience.",
      "try": "Let one thing out each day: a decision, a sentence, a finished draft."
    },
    "Underfueled": {
      "heading": "You run Underfueled: more goes out of you than comes in.",
      "body": "You give, spend and adapt more than you take in. It makes you flexible and generous. It also means you run low, and you feel it as a tiredness that is hard to explain.",
      "try": "Take one thing in each day: a slow meal, an hour of rest, a word of help."
    },
    "Balanced": {
      "heading": "You run Balanced: what comes in roughly matches what goes out.",
      "body": "You take in about as much as you give. It makes you steady and hard to tip over. The work is keeping it that way when a hard season pushes you off centre.",
      "try": "Notice which energy a hard week pulls on, and feed it back that weekend."
    }
  },
  "mode_plain": {
    "Body": "Body mode: you trust yourself first and lean on your own strength.",
    "Mind": "Mind mode: you take in and prepare before you act.",
    "Expression": "Expression mode: you put yourself out, in words, work and feeling.",
    "Action": "Action mode: you go after results and measure the day by what got done.",
    "Order": "Order mode: you hold yourself to rules and to the standards others set."
  },
  "need_phrase": {
    "Order": "real stakes from outside: someone or something to answer to",
    "Mind": "rest and support: time to take things in",
    "Expression": "a way out: words, work, something you make",
    "Action": "a real goal: something to go after and finish",
    "Body": "your own footing: time and space that are yours"
  },
  "circle_close": "Who in your life is one?",
  "need_pattern": "Your chart leans on {Mode}. The {El} you need is {phrase}."
};

export const STEM_LADDER = {
  "庚": {
    "element_line": "Yang Metal, steel that has already been through the fire.",
    "recognition": "You'd rather say the true thing than the easy one.",
    "as_line": "As a Blade, you are that edge in a person.",
    "behaviour": "You see the flaw in a plan before anyone asks.",
    "contrast": "People see someone sharp and certain. Inside, you are checking every word for whether it is true.",
    "self_nature": "Metal is your own element: the edge itself.",
    "overrides": {
      "in_you.Order.thin": "You have almost none. Without someone real to answer to, you sharpen alone and wait for a test worth meeting.",
      "notice.Order.low": "you do your best work when someone whose judgement you respect sets the bar.",
      "need_phrase.Order": "real stakes from outside, someone or something that tests the edge"
    }
  },
  "辛": {
    "element_line": "Yin Metal, the cut stone that holds the light.",
    "recognition": "You know good from almost good at a glance.",
    "as_line": "As a Jewel, you are that finish in a person.",
    "behaviour": "You go back to fix a detail most people would not see.",
    "contrast": "People see someone polished and composed. Inside, you are still finding what isn't quite right.",
    "self_nature": "Metal is your own element: the cut stone itself."
  },
  "甲": {
    "element_line": "Yang Wood, the tall tree that grows toward the light.",
    "recognition": "You start before the path is clear.",
    "as_line": "As an Oak, you are that upward push in a person.",
    "behaviour": "You are already planning the next thing before this one ends.",
    "contrast": "People see someone sure of where they're going. Inside, you aren't certain the light is there, and you go anyway.",
    "self_nature": "Wood is your own element: the trunk itself."
  },
  "乙": {
    "element_line": "Yin Wood, the green that climbs and finds a way.",
    "recognition": "You get where you're going, one way or another.",
    "as_line": "As a Vine, you are that patient reach in a person.",
    "behaviour": "You change the route without changing where you're headed.",
    "contrast": "People read you as easygoing. Inside, you are working three routes at once.",
    "self_nature": "Wood is your own element: the green that climbs."
  },
  "丙": {
    "element_line": "Yang Fire, the sun that gives light to everyone.",
    "recognition": "You light up a gathering before you've said anything.",
    "as_line": "As a Sun, you are that warmth in a person.",
    "behaviour": "You notice who is left out and pull them in.",
    "contrast": "People see someone with warmth to spare. Inside, you are rarely the one anyone checks on.",
    "self_nature": "Fire is your own element: the sunlight itself."
  },
  "丁": {
    "element_line": "Yin Fire, the flame that burns close and steady.",
    "recognition": "When you care about something, it gets all of you.",
    "as_line": "As a Candle, you are that focused warmth in a person.",
    "behaviour": "You remember the small thing someone told you months ago.",
    "contrast": "People see someone quiet and contained. Inside, you are burning steadily for the few things you love.",
    "self_nature": "Fire is your own element: the flame you keep."
  },
  "戊": {
    "element_line": "Yang Earth, the mountain others find their footing on.",
    "recognition": "You're the steady one when things start to shake.",
    "as_line": "As a Mountain, you are that ground in a person.",
    "behaviour": "People bring you their plans to see if they hold.",
    "contrast": "People see someone unshakeable. Inside, you are carrying more than you've told anyone.",
    "self_nature": "Earth is your own element: the mountain itself."
  },
  "己": {
    "element_line": "Yin Earth, the field that turns what it holds into growth.",
    "recognition": "The people around you grow, and you are part of the reason.",
    "as_line": "As a Field, you are that quiet care in a person.",
    "behaviour": "You notice what someone needs before they ask.",
    "contrast": "People see someone easy and calm. Inside, you are keeping track of everyone's needs, yours last.",
    "self_nature": "Earth is your own element: the soil that grows things."
  },
  "壬": {
    "element_line": "Yang Water, the open sea that keeps moving.",
    "recognition": "Your mind runs a few moves further out than the conversation.",
    "as_line": "As an Ocean, you are that depth in a person.",
    "behaviour": "You lose interest once you've understood how something works.",
    "contrast": "People see someone calm on the surface. Inside, there is a whole current they don't see.",
    "self_nature": "Water is your own element: the open sea itself."
  },
  "癸": {
    "element_line": "Yin Water, the rain that reaches everything quietly.",
    "recognition": "You take in what others feel without trying.",
    "as_line": "As the Rain, you are that sensitivity in a person.",
    "behaviour": "You know a friend is upset from one text.",
    "contrast": "People see someone gentle and easy to be with. Inside, you are holding feelings that aren't yours.",
    "self_nature": "Water is your own element: the rain itself."
  }
};

// amount band (engine volumeOf) → the notice row; pole → the try row
export const LADDER_NOTICE_BAND = { absent: 'low', thin: 'low', present: 'mid', abundant: 'high', dominant: 'high' };
export const LADDER_TRY_POLE = { catalyst: 'grow', friction: 'release', balanced: 'keep' };
