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
// No gloss lines (owner 2026-10-15: no level glosses, static bars; the
// seventy-five drafts are retired in the station, never rendered). Each bar
// keeps its fixed ask line, the metric defined in one question, backlogged
// for the glossary and not rendered for now.
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
        "ask": "how much you handle on your own"
      },
      {
        "key": "competitiveness",
        "label": "Competitiveness",
        "god": "劫财",
        "persona": "The Rival",
        "ask": "how much a rival sharpens you"
      },
      {
        "key": "solo_team",
        "label": "Solo · Team",
        "style": true,
        "ends": [
          "Team",
          "Solo"
        ],
        "ask": "whether your strength runs best alone or beside people"
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
        "ask": "how much you learn by your own route"
      },
      {
        "key": "stability",
        "label": "Stability",
        "god": "正印",
        "persona": "The Sage",
        "ask": "how much solid ground you need before you move"
      },
      {
        "key": "instinct_research",
        "label": "Instinct · Research",
        "style": true,
        "ends": [
          "Instinct",
          "Research"
        ],
        "ask": "whether you act on what you sense or read up first"
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
        "ask": "how much of you comes out as care"
      },
      {
        "key": "creativity",
        "label": "Creativity",
        "god": "伤官",
        "persona": "The Virtuoso",
        "ask": "how much of you comes out as the new idea or the sharp line"
      },
      {
        "key": "reserved_expressive",
        "label": "Reserved · Expressive",
        "style": true,
        "ends": [
          "Reserved",
          "Expressive"
        ],
        "ask": "how much of what is inside shows on the outside"
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
        "ask": "how much you reach for the next opening"
      },
      {
        "key": "discipline",
        "label": "Discipline",
        "god": "正财",
        "persona": "The Steward",
        "ask": "how much you keep what you build"
      },
      {
        "key": "focused_multitasking",
        "label": "Focused · Multitasking",
        "style": true,
        "ends": [
          "Focused",
          "Multitasking"
        ],
        "ask": "one thing at a time or several in motion"
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
        "ask": "how much pressure you take on and hand out"
      },
      {
        "key": "responsibility",
        "label": "Responsibility",
        "god": "正官",
        "persona": "The Magistrate",
        "ask": "how much you answer to the rules you accepted"
      },
      {
        "key": "flexible_structured",
        "label": "Flexible · Structured",
        "style": true,
        "ends": [
          "Flexible",
          "Structured"
        ],
        "ask": "how much structure you want around you"
      }
    ]
  }
};
