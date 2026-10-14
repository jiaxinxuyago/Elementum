// ===================================================================
// ELEMENTUM · THE FUNCTION METRICS (owner 2026-10-14; REA_19)
// ===================================================================
// Three bars per function on the energy page: two trait bars (one per god of
// the family, the height from that god's share of the chart) and one style
// bar (two plain ends, no better end, tilted by the energy's balance against
// the core). The words live in the station
// (Reading/Database/templates/by_axis/json/FUNCTION_METRICS/) and are
// transcribed here deliberately (REA_05 §1.3); the levels are computed by
// src/engine/functionMetrics.js. Edit the station, then this file; the
// transcription checker (tools/export-reading-templates.mjs) audits them.
// The gloss lines are DRAFT until the owner rules them line by line.
// ===================================================================

export const FUNCTION_METRIC_SCALE = {
  "trait_share_steps": [
    0,
    6,
    14,
    24
  ],
  "style_volume": {
    "absent": 1,
    "thin": 2,
    "present": 3,
    "abundant": 4,
    "dominant": 5
  },
  "style_core_band": {
    "Underfueled": 2,
    "Balanced": 3,
    "Overfueled": 4,
    "OverfueledExcess": 5
  },
  "bands": {
    "low": [
      1,
      2
    ],
    "mid": [
      3
    ],
    "high": [
      4,
      5
    ]
  }
};

export const FUNCTION_METRICS = {
  "Body": {
    "function": "body",
    "gods": [
      "比肩",
      "劫财"
    ],
    "element_note": "the core element itself; the style bar reads the core band",
    "bars": [
      {
        "key": "independence",
        "label": "Independence",
        "god": "比肩",
        "persona": "The Twin",
        "ask": "how much you handle on your own",
        "gloss": {
          "catalyst": {
            "low": "You lean on others easily and borrow strength without losing your own.",
            "mid": "You handle your share and ask for help when the share grows.",
            "high": "You carry your own weight without being asked, and people count on it."
          },
          "friction": {
            "low": "You rarely stand alone, and your line bends to whoever is nearest.",
            "mid": "You hold your own line most days and carry a little more than you need to.",
            "high": "You carry everything alone, past the point where help would have been faster."
          }
        }
      },
      {
        "key": "competitiveness",
        "label": "Competitiveness",
        "god": "劫财",
        "persona": "The Rival",
        "ask": "how much a rival sharpens you",
        "gloss": {
          "catalyst": {
            "low": "A rival does little for you, so you set your own bar and meet it.",
            "mid": "Someone to beat lifts your game when the stakes are real.",
            "high": "You do your best work with someone to beat, and you usually win."
          },
          "friction": {
            "low": "You keep little score, and what you win you rarely count.",
            "mid": "You keep a quiet tally with the people closest to you.",
            "high": "You keep score with the people you like, and the count costs you friends."
          }
        }
      },
      {
        "key": "solo_team",
        "label": "Solo · Team",
        "style": true,
        "ends": [
          "Team",
          "Solo"
        ],
        "ask": "whether your strength runs best alone or beside people",
        "gloss": {
          "low": "Your strength runs best beside people, with company to measure against.",
          "mid": "You work alone or with people as the day asks, with no strong pull either way.",
          "high": "Your strength runs best alone, with the room to yourself."
        }
      }
    ]
  },
  "Mind": {
    "function": "mind",
    "gods": [
      "偏印",
      "正印"
    ],
    "element_note": "the feeder element; the style bar reads its volume",
    "bars": [
      {
        "key": "intuition",
        "label": "Intuition",
        "god": "偏印",
        "persona": "The Alchemist",
        "ask": "how much you learn by your own route",
        "gloss": {
          "catalyst": {
            "low": "You learn the taught way and trust what others tested first.",
            "mid": "You pick things up by your own route when the usual one is slow.",
            "high": "You understand things nobody taught you, by a route only you can see."
          },
          "friction": {
            "low": "Your own hunches get little room, and you wait to be shown.",
            "mid": "You keep learning a little past the point of deciding.",
            "high": "You keep learning instead of deciding, and the finished thing waits."
          }
        }
      },
      {
        "key": "stability",
        "label": "Stability",
        "god": "正印",
        "persona": "The Sage",
        "ask": "how much solid ground you need before you move",
        "gloss": {
          "catalyst": {
            "low": "You move before the ground is solid, and mostly it holds.",
            "mid": "You want some solid ground before you move, then you move.",
            "high": "You give people a safe place to think, and you keep one for yourself."
          },
          "friction": {
            "low": "You find little shelter in what you know, and you move on quickly.",
            "mid": "You stay with what is proven a little longer than it needs.",
            "high": "You stay sheltered in what you know, past the point of use."
          }
        }
      },
      {
        "key": "instinct_research",
        "label": "Instinct · Research",
        "style": true,
        "ends": [
          "Instinct",
          "Research"
        ],
        "ask": "whether you act on what you sense or read up first",
        "gloss": {
          "low": "You act on what you already sense and read up afterwards, if at all.",
          "mid": "You check a little before you move and trust the rest to instinct.",
          "high": "You read up before you move, and you read a little more after that."
        }
      }
    ]
  },
  "Expression": {
    "function": "expression",
    "gods": [
      "食神",
      "伤官"
    ],
    "element_note": "the fed element; the style bar reads its volume",
    "bars": [
      {
        "key": "warmth",
        "label": "Warmth",
        "god": "食神",
        "persona": "The Artisan",
        "ask": "how much of you comes out as care",
        "gloss": {
          "catalyst": {
            "low": "Care comes out of you in small doses, and it lands when it does.",
            "mid": "People leave you a little better than they arrived.",
            "high": "People leave you better fed than they arrived, and they come back for it."
          },
          "friction": {
            "low": "You give little away, and what you give you measure.",
            "mid": "You give more than you keep, most days.",
            "high": "You give until nothing is left for you, and call it being kind."
          }
        }
      },
      {
        "key": "creativity",
        "label": "Creativity",
        "god": "伤官",
        "persona": "The Virtuoso",
        "ask": "how much of you comes out as the new idea or the sharp line",
        "gloss": {
          "catalyst": {
            "low": "You say what works more than what is new, and it works.",
            "mid": "The new angle comes to you when the usual one has been tried.",
            "high": "You say the thing nobody else saw, and you say it well."
          },
          "friction": {
            "low": "Your sharp line stays in, and the usual words do the job.",
            "mid": "The sharp line gets out a little before it is useful.",
            "high": "You say the sharp thing before anyone asked, and it lands where it should not."
          }
        }
      },
      {
        "key": "reserved_expressive",
        "label": "Reserved · Expressive",
        "style": true,
        "ends": [
          "Reserved",
          "Expressive"
        ],
        "ask": "how much of what is inside shows on the outside",
        "gloss": {
          "low": "Most of what is inside stays inside, and people guess the rest.",
          "mid": "You show what the moment needs and keep the rest for later.",
          "high": "What is inside comes out as it comes, and people always know where you stand."
        }
      }
    ]
  },
  "Action": {
    "function": "action",
    "gods": [
      "偏财",
      "正财"
    ],
    "element_note": "the tamed element; the style bar reads its volume",
    "bars": [
      {
        "key": "ambition",
        "label": "Ambition",
        "god": "偏财",
        "persona": "The Horizon",
        "ask": "how much you reach for the next opening",
        "gloss": {
          "catalyst": {
            "low": "The next opening can wait, and you let it.",
            "mid": "You spot a good chance and take it when the timing is right.",
            "high": "You spot the chance before others do, and you are already moving."
          },
          "friction": {
            "low": "You chase little, and what you start you tend to finish.",
            "mid": "You start the next thing a little before this one is done.",
            "high": "You chase the next opening before this one is finished, and both pay less."
          }
        }
      },
      {
        "key": "discipline",
        "label": "Discipline",
        "god": "正财",
        "persona": "The Steward",
        "ask": "how much you keep what you build",
        "gloss": {
          "catalyst": {
            "low": "You keep little of what you build, and you build again easily.",
            "mid": "What you build mostly stays built, and what you save mostly stays saved.",
            "high": "What you save and build stays built, and people plan on it."
          },
          "friction": {
            "low": "You hold on to little, and what you have slips through.",
            "mid": "You hold on a little past the point where letting go would pay.",
            "high": "You hold on past the point where letting go would pay, and it costs more than it keeps."
          }
        }
      },
      {
        "key": "focused_multitasking",
        "label": "Focused · Multitasking",
        "style": true,
        "ends": [
          "Focused",
          "Multitasking"
        ],
        "ask": "one thing at a time or several in motion",
        "gloss": {
          "low": "One thing at a time, finished before the next begins.",
          "mid": "Two things in motion at most, and one of them finished first.",
          "high": "Several things in motion at once, and you keep most of them moving."
        }
      }
    ]
  },
  "Order": {
    "function": "order",
    "gods": [
      "七杀",
      "正官"
    ],
    "element_note": "the tamer element; the style bar reads its volume",
    "bars": [
      {
        "key": "leadership",
        "label": "Leadership",
        "god": "七杀",
        "persona": "The General",
        "ask": "how much pressure you take on and hand out",
        "gloss": {
          "catalyst": {
            "low": "You take pressure when it comes and hand little of it out.",
            "mid": "In a crisis you get clear, and people notice.",
            "high": "You are clear in a crisis and others follow, and you went looking for the crisis."
          },
          "friction": {
            "low": "You push yourself a little harder than the day asks.",
            "mid": "You run yourself hard, and the people near you feel the pace.",
            "high": "You run everyone, yourself first, past the point of rest."
          }
        }
      },
      {
        "key": "responsibility",
        "label": "Responsibility",
        "god": "正官",
        "persona": "The Magistrate",
        "ask": "how much you answer to the rules you accepted",
        "gloss": {
          "catalyst": {
            "low": "You answer to the rules you chose and leave the rest alone.",
            "mid": "Your word holds, and people plan on it.",
            "high": "Your word holds without exception, and people build on it."
          },
          "friction": {
            "low": "You take on a duty or two more than you can comfortably carry.",
            "mid": "You cannot easily say no to a duty, even an unfair one.",
            "high": "You cannot say no to a duty, even a bad one, and it costs you sleep."
          }
        }
      },
      {
        "key": "flexible_structured",
        "label": "Flexible · Structured",
        "style": true,
        "ends": [
          "Flexible",
          "Structured"
        ],
        "ask": "how much structure you want around you",
        "gloss": {
          "low": "You want little structure around you and make the plan as you go.",
          "mid": "You want a frame to work in and room to move inside it.",
          "high": "You want the plan set and the rules clear before you start."
        }
      }
    ]
  }
};
