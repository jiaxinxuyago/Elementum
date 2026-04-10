/**
 * profileData.js — Elementum Engine profile data constants
 * 
 * Contains behavioral and archetypal profile data for all 10 stems and 10 Ten Gods.
 * Separated from Elementum_Engine.jsx to keep the engine file focused on
 * calculation logic and UI components.
 * 
 * Usage:
 *   import { STEM_CARD_DATA, TG_CARD_DATA } from './profileData.js';
 * 
 * STEM_CARD_DATA — external energy force + energy manual per stem
 * TG_CARD_DATA   — full card data per Ten God (ruling realm, personality,
 *                  life domains, people, 流年大运 signatures)
 * COMPOUND_CARDS — 50 domEl × specificTenGod compound archetype cards (13 fields each)
 *                  Populated by Pipeline C in generate_templates_v2.js.
 *                  Empty until generation runs. See DOC4 §9 for schema.
 * 
 * Note: TG_CARD_DATA is separate from TG_PROFILES (which holds Layer 2
 * artwork + describe() functions). This file holds the expanded card data
 * for Section 3+ UI rendering.
 */


// ═══════════════════════════════════════════════════════════════════════════
// STEM_CARD_DATA
// External energy + energy manual for each of the 10 Heavenly Stems.
// energy.*    → "As an External Energy" card (keywords, what, represents, liunian)
// manual.*    → "Energy Manual" card (concentrated, open, catalyst, resistance)
// ═══════════════════════════════════════════════════════════════════════════

export const STEM_CARD_DATA = {
  "甲": {
    // Yang Wood — The Oak
    energy: {
      keywords: ["Initiation", "Rising ambition", "New beginnings", "Competition", "Upward thrust"],
      what: `甲 is the first stem — the energy of spring's first upward break through frozen ground. Classically described as 木之阳 (the Yang of Wood), it represents a forceful, non-negotiable impulse to rise and expand. Think of the moment when a forest floor cracks open with new growth after winter: nothing deliberate, nothing negotiated — just life asserting itself upward. It is the atmosphere of "things beginning whether you're ready or not."`,
      represents: `New projects launching all around you. The feeling of ambition and possibility filling the environment. People becoming more assertive, initiating more, competing more openly. The conditions that make starting things feel natural and necessary. Also: the landscape gets crowded — more people reaching for the same things at the same time.`,
      liunian: `When 甲 energy enters a luck cycle or annual pillar, it acts like the first warm week of spring — activating everything dormant. The environment rewards boldness and punishes hesitation. Career opportunities emerge suddenly. Competitors become more visible. For charts that benefit from Wood: forward momentum. For already Wood-heavy charts: restlessness, overcommitment, difficulty consolidating.`,
    },
    manual: {
      concentrated: `New ideas launch before old ones land. Commitments pile up faster than they can be honored. The classical principle warns of "growth without harvest": energy expanding without converting into completed form. Restlessness is constant. The specific trap: more beginnings accumulate than can ever be finished, and the backlog slowly becomes its own weight.`,
      open: `Initiative is genuinely harder to find. The environment or person waits for external permission before moving. Starting things feels risky rather than natural. Projects that need a champion stall at the beginning. Ambition may exist internally but stays unexpressed.`,
      catalyst: `Enter it by initiating the thing you have been circling — one specific thing, not ten. Commit to a direction and enter it fully before the window moves. Volunteer for the visible role, launch the project, make the first move. Outcome: things that had no momentum suddenly have it. Doors that required the right person to ask become accessible when you step forward.`,
      resistance: `When 甲 energy creates friction — growth impulse is competing with your structure rather than feeding it. Don't resist the initiating force; redirect it. Use Metal quality (pruning, cutting options) to define which growth is worth nurturing. Stop adding beginnings — close enough open loops to make space for one thing to land. Outcome: restlessness converts into directed momentum.`,
    },
  },

  "乙": {
    // Yin Wood — The Vine
    energy: {
      keywords: ["Networking", "Adaptive intelligence", "Relationship weaving", "Soft persistence", "Finding the gap"],
      what: `乙 is the energy of the vine after the tree — not the initial thrust but the intelligent navigation that follows. Classically described as the Wood that bends rather than breaks, it represents pervasive, penetrating growth that finds every available path. Where 甲 forces upward, 乙 feels its way forward. It is the atmosphere of "the smart path matters more than the direct one."`,
      represents: `Relationship dynamics becoming more important than raw capability. Opportunities arriving through connections rather than competition. The environment rewards those who read the room well, adapt quickly, and know how to work with people. Diplomacy outperforms force. Collaboration opens doors that confrontation closes.`,
      liunian: `When 乙 energy enters a luck cycle or annual pillar, the environment shifts toward relationship-intelligence. Raw power becomes less effective; knowing the right people and reading the terrain correctly becomes decisive. Opportunities arrive through networking and referrals. For charts that benefit from Wood: collaborative momentum. For already Wood-heavy charts: over-accommodation, difficulty committing.`,
    },
    manual: {
      concentrated: `Everything accommodates, nothing commits. The chart or period is saturated with relational intelligence — socially exhausting because the room-reading never stops. The classical trap: 柔弱 (too yielding) — the vine that never finds a surface firm enough to climb. Chronic over-adaptation gradually erodes position.`,
      open: `Relational intelligence gaps appear. Direct approaches are the only available tool, which fails in complex political or relational terrain. Opportunities that require connection rather than competence get missed. Life becomes more transactional and confrontational.`,
      catalyst: `Engage it through the relational field: network, collaborate, make the introduction, let others open the door. Enter the room where the right connections already exist. Outcome: networks activate, referrals arrive, opportunities appear through relationship — and often move faster than direct pushing would produce.`,
      resistance: `When 乙 energy creates friction — flexibility is working against your actual goal. You've read the room so accurately that you've accommodated yourself out of your original position. Name where you are going before entering adaptive mode. Know your destination clearly before you start finding routes around the obstacles. Outcome: adaptability becomes intelligent navigation rather than drift.`,
    },
  },

  "丙": {
    // Yang Fire — The Sun
    energy: {
      keywords: ["Visibility", "Public exposure", "Recognition", "Radiance", "Everything in the light"],
      what: `丙 is the sun — the great broadcasting fire that lights everything simultaneously. Classically described as 火之阳 (the Yang of Fire), it is outward, radiant, and indiscriminate: it warms what it reaches and illuminates what it touches without choosing. It is the atmosphere of "nothing stays hidden; everything becomes more visible."`,
      represents: `Public recognition opportunities. Career visibility increasing. Social environments expanding and becoming more energized. Fame and reputation becoming relevant — for better and for worse. What has been built becomes more publicly known. Equally, what has been concealed becomes harder to keep covered.`,
      liunian: `When 丙 energy enters a luck cycle or annual pillar, visibility increases across the board. Career recognition arrives quickly. Social networks expand. The shadow is equally real: 丙 reveals everything, including what wasn't meant to be seen. For charts that benefit from Fire: an activating period of genuine recognition. For already Fire-heavy charts: burnout, overexposure, reputation risk.`,
    },
    manual: {
      concentrated: `Everything is lit up — and nothing remains private. Social momentum and recognition are high. But excess 丙 is literal overexposure: the classical warning 火炎土燥 — when Fire becomes excessive, the ground beneath it dries and cracks. The environment becomes brilliant but unstable, high-energy but exhausting.`,
      open: `Visibility is genuinely harder to access. Quality work exists but doesn't surface. The person or environment struggles to be noticed despite having real substance. The classical image: a lantern inside a jar — the flame is real but the light doesn't reach others.`,
      catalyst: `Activate it by entering public or visible contexts: put the work in front of others, attend the gathering, publish the piece, take the speaking slot. This is not a "refine quietly" energy — it produces momentum specifically through being seen. Outcome: recognition accelerates. Career momentum that felt stuck suddenly moves.`,
      resistance: `When 丙 energy creates friction — warmth and visibility are running ahead of what the chart can sustain. Channel it by directing exposure strategically rather than broadcasting broadly. Use Water quality (depth, selectivity, substance) to give form to what's being shown. Outcome: overexposure converts into targeted presence.`,
    },
  },

  "丁": {
    // Yin Fire — The Candle
    energy: {
      keywords: ["Focused insight", "Careful examination", "Refinement", "Hidden details", "Precision light"],
      what: `丁 is the candle or the forge fire — concentrated, intentional, illuminating exactly what it points at. Where 丙 lights everything, 丁 lights one thing completely. Classically described as the refining and illuminating fire used to work metal and reveal detail. It is the atmosphere of "the details that were missed before now come into focus."`,
      represents: `Learning, skill development, and careful refinement becoming more productive than broad expansion. The fine print in agreements becoming relevant. Relationships and projects kept at surface level getting examined more closely. Spiritual and intellectual insight becoming more accessible.`,
      liunian: `When 丁 energy enters a luck cycle or annual pillar, the environment rewards attention to detail over broad ambition. Skills cultivated during this period tend to be genuinely refined. Agreements and commitments should be read closely. For charts that benefit from Fire: focused development and meaningful insight. For already Fire-heavy charts: overthinking, excessive self-examination, anxiety.`,
    },
    manual: {
      concentrated: `The examining quality becomes exhaustive. Every detail gets scrutinized, every relationship held to a standard of depth it may not be designed for. The classical problem: excess 丁 burns away what it examines — the candle that runs out of its own fuel. Anxiety emerges from examining everything and finding it insufficient.`,
      open: `Things stay at surface level. Work is produced but not polished. Relationships remain pleasant but never reach genuine depth. The "notice what others miss" quality is not accessible. There is energy but no concentrated, directional light.`,
      catalyst: `Activate it by going deeper into one thing rather than broader across many. Study the subject fully. Have the one-on-one conversation that a group setting would prevent. The classical insight: the Candle with the right material doesn't just illuminate — it forges. Outcome: depth produces results that breadth never could.`,
      resistance: `When 丁 energy creates friction — precision is examining rather than building. Set a completion point before you begin — decide what "done" looks like so the refining faculty has a finish line. Once that point is reached, move the examining quality to the next project. Outcome: precision lands constructively rather than circling endlessly.`,
    },
  },

  "戊": {
    // Yang Earth — The Mountain
    energy: {
      keywords: ["Consolidation", "Foundation", "Stabilizing force", "Resistance to change", "Accumulation"],
      what: `戊 is the mountain or the great plain — immovable, orienting, the accumulating ground. Classically described as 土之阳 (the Yang of Earth), it is the energy of settled, solid, load-bearing stability. 三命通会 describes 戊 as the earth that "stands without moving." It is the atmosphere of "things solidify and slow; what is built now is built to last."`,
      represents: `Real estate, property, and physical assets becoming more prominent. Consolidation of resources and positions. The environment favoring stability and reliability over speed and novelty. Long-term commitments and foundations gaining importance. Things taking longer to move.`,
      liunian: `When 戊 energy enters a luck cycle or annual pillar, the environment shifts toward consolidation. Property matters become significant. The pace of change slows. Reliability becomes more valuable than innovation. For charts that benefit from Earth: grounding, stabilizing, accumulation. For already Earth-heavy charts: stagnation, difficulty changing course, heaviness.`,
    },
    manual: {
      concentrated: `The grounding quality becomes literal heaviness. Classical texts warn 土重则滞 (excess Earth creates stagnation) — when the Mountain grows too dense, nothing moves across it. Opportunities pass because the inertia of consolidation prevents engagement with what's new.`,
      open: `Foundational stability is hard to access. Things don't land or hold. Projects start but don't root. Financial and physical accumulation is more difficult. The environment feels unstable or mobile in ways that are exhausting rather than exciting.`,
      catalyst: `Activate it by doing the foundation work: establish the structure, formalize the arrangement, secure the position, sign the commitment. The productive use: make the tentative fixed. Outcome: what was provisional becomes stable. Resources stop moving and start accumulating. What is built now stays built.`,
      resistance: `When 戊 energy creates friction — stability is working against the movement the chart needs. Don't try to remove the Mountain; find the path it allows. Use Wood energy (growth impulse, directionality) to create movement within the structure. Outcome: resistance becomes framework — an obstacle becomes the form within which something can be built.`,
    },
  },

  "己": {
    // Yin Earth — The Field
    energy: {
      keywords: ["Cultivation", "Slow nourishment", "Reception", "Health focus", "Patient growth"],
      what: `己 is the cultivated field — fertile, absorptive, responsive to what is planted. Where 戊 holds firm and does not yield, 己 receives and nourishes what it receives. Classically described as the earth that "produces and nurtures." It does not force growth; it creates the conditions for growth to happen. It is the atmosphere of "what you plant now grows slowly and deeply."`,
      represents: `Health and wellbeing becoming a more prominent theme. Long-term investments — financial, relational, and personal — becoming more productive. The environment rewarding patience and careful cultivation over aggressive acquisition. Relationships deepening rather than expanding.`,
      liunian: `When 己 energy enters a luck cycle or annual pillar, the environment supports patient cultivation. Health matters tend to surface. Long-term investments begin paying quiet dividends. For charts that benefit from Earth: genuine nourishment and productive development. For already Earth-heavy charts: overthinking, accumulation of worry, absorbing others' difficulties.`,
    },
    manual: {
      concentrated: `The receptive and nurturing quality becomes absorptive without filtration. Classical texts describe 己土混浊 — when the fertile soil absorbs too much without drainage, it loses its cultivating quality and becomes mud. Overthinking, rumination, and carrying others' emotional weight characterizes the excess state.`,
      open: `The patient-development quality is absent. Growth happens but nothing is tended. The environment lacks the quiet, sustained presence that allows things to develop at their natural pace. Quick results get prioritized over lasting ones, and nothing reaches the quality it could have reached with genuine care.`,
      catalyst: `Activate it by investing attention and care in what is already growing rather than starting something new. Deepen existing relationships, develop skills that have already been started, return to projects begun but not fully cultivated. Outcome: things that were beginning deepen, relationships solidify, work that was surface-level becomes genuinely developed.`,
      resistance: `When 己 energy creates friction — the absorptive quality is pulling in more than can be processed. Choose explicitly what deserves the cultivation energy and stop absorbing what doesn't. Use Metal energy (boundary, definition) to create filtration. Outcome: caregiving becomes targeted and powerful rather than diffuse and depleting.`,
    },
  },

  "庚": {
    // Yang Metal — The Blade
    energy: {
      keywords: ["Reform", "Decisive restructuring", "Forced clarity", "Cutting away", "Defined edges"],
      what: `庚 is the blade, the axe, the harvest tool — the Yang Metal that cuts, defines, and restructures. Classically described as 金之阳 (the Yang of Metal). The classical texts describe 庚 as the force that "cuts away what is complete to reveal what remains." It is the atmosphere of "what was vague becomes clear, often by force; what was finished gets cut away."`,
      represents: `Major restructuring in environments — organizational, governmental, relational. Forced decisions on matters that were being kept ambiguous. Endings of cycles that had been quietly completed but not yet formally closed. Competitive pressure increasing. The need for decisive action.`,
      liunian: `When 庚 energy enters a luck cycle or annual pillar, the environment demands clarity and decision. Things that were vague get defined — by choice or by circumstance. Restructuring happens. For charts that benefit from Metal: productive definition and momentum-clearing restructuring. For already Metal-heavy charts: conflict, unnecessary cutting, bluntness that damages.`,
    },
    manual: {
      concentrated: `The evaluating and cutting force is relentless. Everything gets assessed; everything gets cut to shape. Classical texts warn 金旺伤木 — when Metal is excessive, it cuts down what was still growing. The danger: cutting too early, deciding too harshly, removing things that needed more development.`,
      open: `The ability to make definitive decisions, set clear boundaries, and close what is finished becomes genuinely harder. Things that are complete don't get properly ended. Ambiguity lingers. The environment feels gentler but more cluttered — less decisive, more unresolved.`,
      catalyst: `Activate it by making the decision you have been deferring. This energy rewards categorical commitment: the contract signed, the option closed, the position stated, the boundary set. Don't hedge. Outcome: clarity replaces ambiguity. Direction becomes actionable. The cut that seemed difficult turns out to have cleared the space for what actually matters.`,
      resistance: `When 庚 energy creates friction — the cutting force is removing what the chart needed to preserve. Redirect the precision toward what is actually finished rather than what is merely inconvenient. Use Fire quality (clarity of purpose, warmth of direction) to identify what the precision is actually for. Outcome: force becomes surgical rather than indiscriminate.`,
    },
  },

  "辛": {
    // Yin Metal — The Jewel
    energy: {
      keywords: ["Evaluation", "Reward and consequence", "Refined quality", "Recognition", "Accounting"],
      what: `辛 is the refined metal — the jewel after the forge, the precise edge after the grinding. Where 庚 cuts broadly, 辛 evaluates with precision. 穷通宝鉴 notes that 辛 carries an inherent quality of "revealing true value." It is the atmosphere of "what things are actually worth becomes visible; past efforts receive their accurate measure."`,
      represents: `Recognition for past work arriving — both positive recognition and accountability for what was poorly done. The quality of what has been built being assessed honestly. Rewards for genuine excellence. Consequences for corners that were cut. Aesthetic and creative standards becoming more relevant.`,
      liunian: `When 辛 energy enters a luck cycle or annual pillar, the environment shifts into evaluation mode. Past efforts receive their accurate measure — which means rewards for good work and consequences for shoddy work. For charts that benefit from Metal: recognition and refinement. For already Metal-heavy charts: hypercritical evaluation, perfectionism that prevents completion.`,
    },
    manual: {
      concentrated: `The evaluative standard is applied to everything simultaneously with no relief. The environment produces either remarkable quality or paralysis. Classical: 辛金过旺 — the jeweler so committed to perfection that no gem ever leaves the workshop. Self-criticism intensifies. The standard keeps moving just past wherever the work has arrived.`,
      open: `Discernment and quality-sensing are reduced. Things are produced without adequate evaluation. Work looks fine on the surface but doesn't hold up under close examination. The environment loses its ability to distinguish what is genuinely excellent from what merely appears excellent.`,
      catalyst: `Activate it by intentionally raising the standard of what you produce and what you accept. This is the period for genuine refinement: the revision that makes the work actually excellent, the relationship investment that makes the connection actually deep. Outcome: what is produced carries lasting quality. Recognition arrives for the refinement.`,
      resistance: `When 辛 energy creates friction — the discernment is running at a level that prevents output. Set the completion criterion before beginning — decide what "excellent enough to release" looks like so the discernment has a defined finish line. Use Water energy (flow, forward movement) to give the precision somewhere to go. Outcome: evaluation produces completion rather than endless refinement.`,
    },
  },

  "壬": {
    // Yang Water — The Ocean
    energy: {
      keywords: ["Movement", "Flowing opportunity", "Expanding intelligence", "Ambition", "Boundary dissolution"],
      what: `壬 is the great river or open ocean — vast, flowing, carrying everything with it. Classically described as 水之阳 (the Yang of Water). 三命通会 describes 壬 as the water that "carries and moves all things forward." It is the atmosphere of "things begin moving; opportunity flows in from unexpected directions; boundaries become less fixed."`,
      represents: `Career mobility and movement opportunities. Travel and expansion becoming natural and productive. Intellectual energy and curiosity increasing across the environment. Ambition energizing the social field. Opportunities arriving through flow rather than through direct effort.`,
      liunian: `When 壬 energy enters a luck cycle or annual pillar, things start moving. Career positions shift. Travel opens. Intellectual interests expand. The classical note: Yang Water without banks disperses. For charts that benefit from Water: high-flow opportunity period. For already Water-heavy charts: overwhelm, scattered attention, ambition that exceeds what the foundations can support.`,
    },
    manual: {
      concentrated: `Everything flows at once. The intelligence ranges without landing, the ambition floods available structure. Classical: 壬水泛滥 — when the Ocean overflows its banks, it destroys rather than irrigates. The environment becomes intellectually stimulating but practically unproductive. Too many currents pull in too many directions.`,
      open: `Systemic intelligence and movement are reduced. Career positions that should be mobile become fixed. The depth of understanding that comes from holding many frameworks simultaneously is less accessible. Life becomes more local and more limited in range than the chart's actual capacity warrants.`,
      catalyst: `Activate it by entering movement: change the environment, take the trip, begin the intellectual pursuit that has been deferred. Don't try to control the direction of the flow — learn to read it and enter where it's going. Outcome: career mobility arrives naturally. Opportunities flow from directions that stationary positioning would never have reached.`,
      resistance: `When 壬 energy creates friction — flow is running against the chart's structure. Too much movement has dispersed what needed to concentrate. Introduce Earth energy (consolidation, containment, banks) — not to stop the Water but to give it shape. Identify specifically where the intelligence and energy should land. Outcome: movement becomes purposeful flow rather than dispersal.`,
    },
  },

  "癸": {
    // Yin Water — The Rain
    energy: {
      keywords: ["Completion", "Hidden truth surfacing", "Reflection", "Intuitive clarity", "Cycle endings"],
      what: `癸 is the rain, the mist, the pervasive moisture that seeps through everything without announcing itself. 子平真诠 describes 癸 as water that "nourishes in secret and completes what is unseen." It is the atmosphere of "what was hidden comes to light; what is ending becomes visible; reflection becomes more productive than action."`,
      represents: `Completion of cycles and long-running projects. Hidden information surfacing — sometimes gently, sometimes as a surprise. Spiritual and reflective periods becoming more productive than outward action. Intuitive accuracy increasing. Endings that prepare space for what comes next.`,
      liunian: `When 癸 energy enters a luck cycle or annual pillar, things complete and hidden truths surface. This is a period for honest reflection more than aggressive expansion. What is ending becomes clear. For charts that benefit from Water: genuine completion and deepening wisdom. For already Water-heavy charts: emotional absorption, difficulty distinguishing what is perceived from what is actually happening.`,
    },
    manual: {
      concentrated: `Everything is perceived, everything is felt, at a level that exceeds what can be processed. Classical: 癸水多则迷 — when the Rain becomes a flood of perception, one can no longer distinguish their own knowing from what they've absorbed. Emotional and perceptual exhaustion. The intuition that was extraordinary becomes overwhelming noise.`,
      open: `Perceptual intelligence that reads what is actually true in a room becomes harder to access. Things are taken at face value. Hidden information doesn't surface. The slow-penetrating quality that reveals what careful reflection produces is reduced.`,
      catalyst: `Activate it by creating conditions for genuine perception: quiet, reduced stimulation, time for reflection without agenda. This energy does not respond to force — it responds to receptivity. The insight arrives when you stop trying to produce it. Outcome: what was obscure becomes clear. The right answer to a long-standing question arrives not from analysis but from having been genuinely still with it.`,
      resistance: `When 癸 energy creates friction — the permeability is absorbing what it should be letting pass. Introduce Metal energy (definition, boundary) or Earth energy (grounding) to give the perception a stable surface to land on. Separate what is perceived from what is chosen — use intuition as information rather than reality. Outcome: sensitivity becomes a tool rather than a burden.`,
    },
  },

};


// ═══════════════════════════════════════════════════════════════════════════
// TG_CARD_DATA
// Full expanded card data for each of the 10 Ten Gods.
// Used for Section 3+ rendering — separate from TG_PROFILES (Layer 2 angles).
//
// Fields:
//   name, sub         → display title
//   realmPhrase       → ruling realm one-liner
//   realmDesc         → ruling realm description paragraph
//   keywords          → 5 trait keywords
//   gifts, shadows    → 3 items each
//   decision          → decision-making style paragraph
//   communication     → communication style paragraph
//   hidden            → inner self / hidden traits paragraph
//   domains           → { career, relationships, wealth, health }
//     each: { mechanism, text }
//   people            → 六亲 description paragraph
//   liunian           → 流年大运 event signatures paragraph
// ═══════════════════════════════════════════════════════════════════════════

export const TG_CARD_DATA = {
  "比肩": {
    // The Mirror — Same nature, same register
    name: "The Mirror",
    sub: "Same nature, same register",
    realmPhrase: `Inner Validation — the ego's private standard`,
    realmDesc: `The part of a person that measures everything against their own internal benchmark before anything else. Not comparison with others — comparison with the self. Self-sufficiency is not a strategy here; it is the default operating mode.`,
    keywords: ["Self-reliant", "Consistent", "Principled", "Insular", "Complete"],
    gifts: [
      `Unwavering conviction under genuine pressure — the same person in every room, every context, every crisis`,
    `Never loses themselves in what others want; the core standard holds regardless of what the environment offers`,
    `Those who earn entry into real trust receive something exceptionally durable and reliable`,
    ],
    shadows: [
      `The self-referencing loop has no natural interrupt — genuinely difficult to know when wrong`,
    `Loneliness of completeness: surrounded by people and still fundamentally alone unless extraordinary peers are present`,
    `New information that contradicts existing conviction gets processed as irrelevant rather than challenging`,
    ],
    decision: `Self-referencing — trusts their own read above all consensus. Filters new information through existing conviction. Decides quickly but resists revising. The weakness is not arrogance but structure: the system is complete enough that discrepant input doesn't create internal urgency to reconsider.`,
    communication: `Direct, consistent, doesn't modulate the message for different audiences. What they say is what they think. No performance in it — which can read as cold to those expecting social calibration.`,
    hidden: `Beneath the self-sufficiency is a deep need for peers who are genuinely equal — not admirers, not subordinates, but someone who can actually meet them at the level they operate. The specific loneliness is not about being alone. It is about being surrounded by people who engage with the surface rather than the depth.`,
    domains: {
      career: {
        mechanism: "比肩 → independent judgment, exceptional depth in native domain",
        text: `Excels in roles requiring sustained conviction and independent judgment. The self-amplification produces unusual depth. Collaboration is structurally harder because the reference point is always internal — genuine compromise feels like compromise of the standard itself.`,
      },
      relationships: {
        mechanism: "比肩 → peer dynamics, identity pressure, resource contention with equals",
        text: `Needs a peer who can actually meet them — not someone who defers. Tends to attract people who want to be near the self-sufficiency rather than genuine equals. The pattern: respected and relied upon, but not truly known.`,
      },
      wealth: {
        mechanism: "比肩 → independent income, personal standards drive earning",
        text: `Earns through their own effort and internally validated standards. Won't monetize things they don't believe in. Independent income sources strongly preferred over institutional dependency.`,
      },
      health: {
        mechanism: "比肩 → self-monitoring calibrated to output, depletion unrecognized",
        text: `Tends not to recognize depletion because the self-monitoring system is calibrated to output. Runs on conviction past the point where the body signals readiness to stop. Rest has to be decided, not felt.`,
      },
    },
    people: `比肩 classically represents siblings and same-status peers — people who share your nature and move in your territory. In the broader life: close friends who genuinely get it without explanation, the rare equals who don't defer. In less healthy expressions: the peers whose similarity makes them competitors for the same recognition.`,
    liunian: `A 比肩 year or period brings increased peer competition, resource contention with those most similar, and pressure on the established identity. For charts that benefit: confidence, clarity of self, decisive independent action. For charts where 比肩 is resistance: conflict with equals, loss through competition, an identity challenge that forces honest self-examination.`,
  },

  "劫财": {
    // The Rival — Same nature, different register
    name: "The Rival",
    sub: "Same nature, different register",
    realmPhrase: `Social Performance — the ego measured against its nearest competition`,
    realmDesc: `The part of a person that measures itself against others occupying the same territory. Not the internal standard of 比肩 but the comparative ego — what am I relative to the people most like me? The reference point is always lateral.`,
    keywords: ["Competitive", "Comparative", "Socially driven", "Resource-aware", "Sharp"],
    gifts: [
      `Genuine clarity about where the actual edges of capability lie — real peers reveal real limits`,
    `The competitive register sharpens rather than diminishes when healthy: you become more precisely what you are through the comparison`,
    `Socially intelligent in reading where they stand relative to those who actually matter to them`,
    ],
    shadows: [
      `Resources spent measuring rather than building — the comparison can become the point`,
    `Collaboration with the people most similar is structurally the hardest relationship to sustain`,
    `Validation from genuine peers lands harder than victory over those who don't understand the territory`,
    ],
    decision: `Comparative — calibrates against what similar others are doing or have achieved before committing. Lateral reference is the primary frame. Can delay decisions while reading the field.`,
    communication: `Asserts position, especially within shared territory. Socially aware and reads status accurately. Can be competitive in delivery without intending aggression — the natural register within the domain is assertion rather than collaboration.`,
    hidden: `Underneath the rivalry is a specific, rarely admitted desire: genuine recognition from exactly the people most like them. Not recognition from outsiders — that lands hollow. The need is for the specific peer who understands what the achievement cost to acknowledge it as real.`,
    domains: {
      career: {
        mechanism: "劫财 → lateral competition, peer performance benchmarking",
        text: `Thrives in competitive environments where performance is measured against others — fields with visible rankings and clear standards. The comparison drive produces real results when channeled toward the work rather than toward the rival.`,
      },
      relationships: {
        mechanism: "劫财 → rivalry with similar partners, resource contention",
        text: `Most significant relationships are with people most similar to them. Sharing resources with someone in the same lane feels like giving something away. The specific challenge: genuine collaboration with the people who most deserve it.`,
      },
      wealth: {
        mechanism: "劫财 → resource contention, competitive wealth dynamics",
        text: `Resource contention with peers is a recurring pattern. The competitive orientation can produce genuine wealth when directed toward building rather than measuring. Risk: losing resources to rivalry.`,
      },
      health: {
        mechanism: "劫财 → competitive overperformance, external calibration of limits",
        text: `Competitive orientation produces overperformance relative to the body's actual capacity — pushing past physical limits to match or exceed a rival. The self-monitoring calibrates to the external reference rather than internal signals.`,
      },
    },
    people: `劫财 classically represents brothers and sisters of a different nature, rivals, and those who share resources. In modern life: business partners who become competitors, colleagues in the same domain, the sibling whose achievements are the reference point.`,
    liunian: `A 劫财 year or period intensifies competition from peers, brings resource loss risks through rivalry, and activates the comparative drive. For charts that benefit: the competition produces genuine performance — this can be a defining year. For charts where 劫财 is resistance: betrayal by those most similar, loss of shared resources.`,
  },

  "食神": {
    // The Flow — Same-polarity output — giving that feels like being
    name: "The Flow",
    sub: "Same-polarity output — giving that feels like being",
    realmPhrase: `Authentic Expression — output that happens before strategy`,
    realmDesc: `食神吐秀 (the Food God expresses elegance): refined Qi moving outward without announcement. What flows out when the self is fully itself — not the assertion of 伤官, not the pressure of 七杀, just the natural emergence of what the DM generates when nothing is in the way.`,
    keywords: ["Generous", "Expressive", "Effortless", "Non-assertive", "Pleasurable"],
    gifts: [
      `Output arrives without effort or announcement — what they produce has the quality of something that simply happened rather than something that was made`,
    `Natural elegance that others experience as a gift rather than a performance; the giving doesn't register as giving from the inside`,
    `Able to sustain creative or expressive work over time in ways that more effortful people genuinely cannot`,
    ],
    shadows: [
      `The cost of giving is invisible from the inside — depletion accumulates without warning and arrives fully formed`,
    `食神过旺则泄身太过: the over-extension into what feels natural depletes the foundation without signaling beforehand`,
    `Tends to undervalue what flows naturally — because it doesn't feel like work, it's often undersold or given away`,
    ],
    decision: `Instinct-led, trusts the natural process. Decides when it feels ready rather than when the moment is optimal. Resistant to external deadlines on creative or expressive work.`,
    communication: `Communicates naturally without performing the message — what they say emerges from being fully themselves rather than from strategy. Warm, generative, unforced. Others often feel genuinely nourished by the exchange.`,
    hidden: `Beneath the natural generosity is often a specific unawareness that giving is happening at all — the output doesn't register as effort, which means neither does the depletion. By the time they feel genuinely exhausted, they've been running on reserves for longer than anyone knew.`,
    domains: {
      career: {
        mechanism: "食神 → natural output becomes the product, authentic production capacity",
        text: `Excels in roles where what flows naturally IS the product — creative work, teaching, mentoring. Struggles in highly structured environments that require output to be performed rather than expressed.`,
      },
      relationships: {
        mechanism: "食神 → naturally nourishing, structural generosity, reciprocity gap risk",
        text: `Naturally nourishing to be near — people feel genuinely fed without being able to account for why. The pattern to watch: attracting those who receive well without giving back, because the giving never seems costly.`,
      },
      wealth: {
        mechanism: "食神 → natural production capacity, undervaluation risk",
        text: `Can generate real financial value through authentic creative output. The recurring risk: what flows naturally doesn't feel like it should cost money, so it gets given away or undersold.`,
      },
      health: {
        mechanism: "食神 → invisible depletion, DM element bears the output load",
        text: `食神过旺 produces genuine physical depletion that arrives without warning because the cost was invisible at every intermediate stage. Restoration requires genuine rest, not just reduced output.`,
      },
    },
    people: `食神 classically represents children (especially for female DMs) and the people who receive the natural output. In modern life: mentees nourished without effort, creative collaborators who receive what flows naturally. Also: the physical pleasures of life — food, art, rest, anything that produces without asserting.`,
    liunian: `A 食神 year or period brings creative flourishing, ease, genuine pleasure, and opportunities for authentic expression. For aligned charts: a genuinely good period — one of the few kinds of years where things feel right. For excess 食神: over-extension, depletion, difficulty stopping.`,
  },

  "伤官": {
    // The Edge — Cross-polarity output — brilliance made of what it meets
    name: "The Edge",
    sub: "Cross-polarity output — brilliance made of what it meets",
    realmPhrase: `Rebellion Logic — output that structurally exceeds its container`,
    realmDesc: `伤官者，聪明秀气太过: "Hurting Officer people are excessively brilliant and refined." The excess is structural, not attitudinal — the intelligence genuinely exceeds the frameworks available to receive it, so it pushes against them as a side effect of expressing itself.`,
    keywords: ["Brilliant", "Subversive", "Friction-constituted", "Non-conformist", "Ahead"],
    gifts: [
      `Genuine structural advancement — the work moves something forward in ways people working within convention cannot produce`,
    `The brilliance is sharpened by exactly what resists it; the friction is part of the mechanism that makes the output what it is`,
    `Authentic creative authority that comes from having actually exceeded the available framework`,
    ],
    shadows: [
      `伤官见官，为祸百端: in structural tension with any authority that tries to evaluate the output by conventional standards`,
    `Self-destruction when the output has nowhere adequate to land: the force that produces breakthroughs turns inward`,
    `The brilliance and the difficulty are inseparable — improving the one without the other is not available`,
    ],
    decision: `Challenges assumptions before deciding. Tends to decide against the conventional option not from perversity but because the conventional option is structurally insufficient. Independent of precedent.`,
    communication: `Communicates with brilliance that challenges — the message often disrupts the framework of the listener as a side effect. 伤官见官 describes the specific friction with authority figures: the output challenges the framework regardless of whether challenge was intended.`,
    hidden: `The specific interior cost that goes mostly unspoken: knowing you've just broken something that can't be unbroken — in a conversation, in a relationship — and not being certain whether that was necessary or excessive. The brilliance and the destruction arrived together.`,
    domains: {
      career: {
        mechanism: "伤官 → innovation, disruption, structural advancement beyond convention",
        text: `Exceptional in roles requiring genuine creative innovation or disruption — entrepreneurship, research, independent creative practice. Deeply unsuited to politically managed hierarchies where 伤官见官 produces constant institutional friction.`,
      },
      relationships: {
        mechanism: "伤官 → intensity, friction as intimacy, container requirements",
        text: `Others are drawn to the brilliance and encounter the friction as inseparable from it. The relationships that hold are those that can contain the full force. Intensity deepens some relationships and exhausts others.`,
      },
      wealth: {
        mechanism: "伤官 → edge output seeking adequate container, timing critical",
        text: `Can generate significant wealth when the output finds the right market or moment. The risk: the output is structurally ahead of what current audiences can receive, so timing is everything.`,
      },
      health: {
        mechanism: "伤官 → internal pressure when output has no channel, DM element depleted",
        text: `When the output has nowhere to land, the friction turns inward. The body bears the cost of sustained structural tension between what is produced and what the environment can receive.`,
      },
    },
    people: `伤官 classically represents children with challenging or expressive natures, creative collaborators who push the work further through friction, and the authority figures who constitute the structural resistance. Also: the person whose work the institution can't quite fit into existing categories.`,
    liunian: `A 伤官 year or period brings creative breakthroughs, authority conflicts, and moments of genuine originality. For aligned charts: a significant output year — the defining work of a period often emerges during 伤官 activations. For charts where it creates friction: things said publicly that can't be unsaid.`,
  },

  "偏财": {
    // The Field — Same-polarity wealth — wide-ranging engagement
    name: "The Field",
    sub: "Same-polarity wealth — wide-ranging engagement",
    realmPhrase: `Risk/Opportunistic Vision — seeing potential before others recognize it`,
    realmDesc: `The part of a person that sees potential in everything and moves toward it broadly. Not the focused accumulation of 正财 but the ranging appetite that touches many things and activates what others walked past.`,
    keywords: ["Generous", "Opportunity-sensing", "Wide-ranging", "Socially fluid", "Diffuse"],
    gifts: [
      `Instinctive sense for potential before it's visible — the read on what's worth engaging arrives before the evidence does`,
    `Natural abundance that activates things and people in its vicinity; others find opportunities and connections through proximity`,
    `Genuine openness to what's possible across an unusually wide field`,
    ],
    shadows: [
      `What is touched broadly is never fully owned — the breadth that is the gift is also what prevents full possession`,
    `Activates without consolidating: builds real things that other people end up keeping`,
    `What is never fully possessed can be lost without the person fully registering what they had`,
    ],
    decision: `Opportunity-seeking, evaluates broad options simultaneously rather than sequentially. Makes decisions quickly based on intuitive read of potential. Tends toward distributed risk. Doesn't overanalyze.`,
    communication: `Casual, broad, comfortable across many registers and audiences. The social intelligence is wide rather than deep. Can create genuine connection quickly across very different kinds of people.`,
    hidden: `The interior truth that rarely gets named: everything feels equally interesting and equally possible, which is both the gift and the structural trap. The inability to fully invest in any one thing is not indecision — it is the nature of the ranging quality.`,
    domains: {
      career: {
        mechanism: "偏财 → ranging intelligence, opportunity activation across many domains",
        text: `Thrives in sales, business development, entrepreneurship, and any role where moving across many domains and activating opportunity is the primary value. The ranging intelligence IS the product.`,
      },
      relationships: {
        mechanism: "偏财 → broad warmth, elusive depth, diffuse investment",
        text: `Charming and genuinely warm across many connections, but full depth with any single person is harder than breadth across many. Partners often feel the warmth is real but the full presence is somehow always partially elsewhere.`,
      },
      wealth: {
        mechanism: "偏财 → multiple income streams, generation over accumulation",
        text: `Natural sense for where money can be made, especially through opportunity and social connection. Usually better at generating wealth than keeping it. Multiple income streams natural and preferred.`,
      },
      health: {
        mechanism: "偏财 → breadth depletes, rest deprioritized, paternal lineage",
        text: `Involvement in so many things makes genuine rest genuinely rare. The body's signals for slowing down tend to be treated as opportunities for new engagement. Classically relates to the father and paternal lineage in health pattern transmission.`,
      },
    },
    people: `偏财 classically represents the father (for male DMs), indirect wealth sources, and casual romantic relationships. In modern life: the broader social field — many people are activated by the 偏财 person's presence, fewer are deeply held. Also: business contacts who bring opportunity without lasting partnership.`,
    liunian: `A 偏财 year or period brings unexpected financial opportunities, father-related events, expanded social networks, and activation of the opportunity field. For aligned charts: genuine windfalls, new income streams. For charts where 偏财 is friction: scattered resources, father health issues, overcommitment.`,
  },

  "正财": {
    // The Harvest — Cross-polarity wealth — methodical, directed acquisition
    name: "The Harvest",
    sub: "Cross-polarity wealth — methodical, directed acquisition",
    realmPhrase: `Wealth/Security Anxiety — the standard applied to what is held`,
    realmDesc: `The part of a person that evaluates what it has built and whether it is worthy of the standard applied in building it. Not greed — a specific relationship to security in which the evaluating apparatus that produced the quality also asks whether the quality is sufficient.`,
    keywords: ["Methodical", "Disciplined", "Earned", "Evaluative", "Security-oriented"],
    gifts: [
      `Real, earned results that hold up over time — the relationship between effort and outcome is clear and verifiable`,
    `Unusual reliability: once committed, follows through across time without requiring re-motivation`,
    `The precision that builds also reveals — what was built is what was actually intended, without shortcuts appearing later`,
    ],
    shadows: [
      `The evaluative apparatus doesn't know when to stop — applies the same standard to relationships that it applies to financial decisions`,
    `正财 precision can turn on what it values: asking whether a relationship is worthy of the standard used to build it`,
    `The security anxiety doesn't resolve at achievement — the standard moves just past wherever the building has arrived`,
    ],
    decision: `Methodical, researches fully, conservative risk profile. Needs the evidence before committing. Once committed, sees it through with unusual reliability. The specific weakness: over-research on decisions that required timely commitment.`,
    communication: `Precise and considered — the specific thing said is the specific thing meant. Doesn't expand unnecessarily. Finds vague or performative communication genuinely frustrating because it creates ambiguity.`,
    hidden: `Beneath the methodical exterior is a specific quiet anxiety: the fear that what has been built carefully is somehow still not enough to be safe, not worthy enough to be kept. The standard that produced the quality is also what makes resting in the result genuinely difficult.`,
    domains: {
      career: {
        mechanism: "正财 → methodical execution, earned reputation, demonstrable quality",
        text: `Best in roles where methodical, disciplined execution produces visible, trackable results — finance, law, engineering, operations. The career trajectory is typically slower than peers but more structurally durable.`,
      },
      relationships: {
        mechanism: "正财 → committed, present across time, quality-assessing",
        text: `Committed, reliable, genuinely present across time. The shadow: applies the evaluating standard to the relationship itself. The partner and the dynamic are assessed for whether they are worthy of the investment being made.`,
      },
      wealth: {
        mechanism: "正财 → methodical accumulation, conservative risk, wealth held and evaluated",
        text: `Methodical accumulation, conservative risk, genuine building over time. Usually better at keeping wealth than generating it quickly. The specific risk: the evaluating apparatus keeps asking whether the current financial position is truly sufficient.`,
      },
      health: {
        mechanism: "正财 → controlled disciplined approach to body, rigidity risk",
        text: `Tends to apply the same disciplined control to the body as to external resources. Excess 正财 produces bodily rigidity — the body is managed rather than listened to.`,
      },
    },
    people: `正财 classically represents the spouse (for male DMs) and the primary committed relationship. Also: direct income sources, reliable employers and providers, the institutions that pay fairly for demonstrated work.`,
    liunian: `A 正财 year or period brings financial consolidation, committed relationship events (marriage, formal partnership), and opportunities to harvest what was methodically built. For aligned charts: genuine stability and tangible reward. For charts where 正财 creates friction: over-control of resources, relationship strain from applying the evaluating standard too strictly.`,
  },

  "七杀": {
    // The Trial — Same-polarity authority — pressure that doesn't grant permission
    name: "The Trial",
    sub: "Same-polarity authority — pressure that doesn't grant permission",
    realmPhrase: `Survival Instinct / Trauma / Resilience — forged, not developed`,
    realmDesc: `七杀制伏得宜，反为权贵: "When Seven Killings are properly channeled, they produce genuine authority." The force that presses against the DM without moderation, without asking whether it is ready. What gets produced — when resources are adequate — is character that could only have come from that specific pressure.`,
    keywords: ["Forged", "Resilient", "Intense", "Non-permissioned", "Bifurcated"],
    gifts: [
      `What others carry as developed virtue, this person carries as the residue of surviving something that did not offer the option to fail gracefully`,
    `The character that only sustained adversarial pressure without permission produces — it cannot be imitated by those who haven't been through the equivalent`,
    `Genuine authority that others recognize as real precisely because it was tested rather than credentialed`,
    ],
    shadows: [
      `制者必须有力: the channeling requires significant resources — without them, the same force that refines damages`,
    `Does not moderate itself, does not ask whether the moment warrants the full force`,
    `The bifurcation is genuine: not a spectrum, not a middle outcome — the pressure either forges or breaks`,
    ],
    decision: `Decides under pressure — either sharply decisive when resources are adequate, or paralyzed when they're not. Doesn't hedge well; tends toward all-or-nothing commitment.`,
    communication: `Direct, unmoderated, doesn't soften delivery. The message arrives at full force. Says the thing without waiting for the listener to be ready for it.`,
    hidden: `What rarely gets named: the quiet exhaustion of having been forged and knowing exactly what it cost. Not pride in the resilience — something quieter, closer to grief about what was required to become this. The question that runs beneath the authority: whether what was built through surviving was worth what was lost in the surviving.`,
    domains: {
      career: {
        mechanism: "七杀 → adversarial pressure tolerance, genuine authority under fire",
        text: `Exceptional in roles requiring genuine pressure-tolerance and leadership under adversity — emergency work, high-stakes entrepreneurship, competitive performance, crisis management. The authority that comes from demonstrated survival is recognized differently from institutional authority.`,
      },
      relationships: {
        mechanism: "七杀 → intensity, testing without permission, bifurcated outcomes",
        text: `Relationships shaped by 七杀 involve significant pressure, intensity, or adversity. The bifurcation applies here too: relationships are either deeply forged or significantly damaged. Tends to attract challenging partners or bring intensity that others find difficult to sustain.`,
      },
      wealth: {
        mechanism: "七杀 → high-risk/high-reward, non-moderate financial outcomes",
        text: `Can generate significant wealth through high-risk, high-consequence situations that others won't enter. The risk: the same non-permission quality that produces exceptional outcomes also produces exceptional losses when resources run out.`,
      },
      health: {
        mechanism: "七杀 → chronic high-pressure operation, DM element depleted by adversarial force",
        text: `The body bears the cost of sustained adversarial operation. Even when external pressure subsides, the internal system calibrated for it doesn't easily downregulate.`,
      },
    },
    people: `七杀 classically for female DMs represents husband and romantic partners. More broadly: bosses who don't grant permission, adversaries, challenging authority figures who test without validating, the people who shaped you through pressure rather than warmth.`,
    liunian: `A 七杀 year or period brings adversarial pressure, significant challenges, potential crises — and, when resources are adequate, genuine breakthroughs and real authority. For aligned charts with adequate resources: the forge produces something remarkable. For depleted charts: breakdown, burnout, forced confrontations that leave lasting damage.`,
  },

  "正官": {
    // The Standard — Cross-polarity authority — framework-mediated pressure
    name: "The Standard",
    sub: "Cross-polarity authority — framework-mediated pressure",
    realmPhrase: `Social Armor / Good Student Complex — character shaped by chosen structure`,
    realmDesc: `正官端正，主人沉稳，名声好，规则意识强: "Direct Officer upright — the person is calm and settled, with good reputation and strong rule-consciousness." The part of a person that operates within frameworks it has chosen to endorse — not because it has to, but because it has decided the framework is legitimate.`,
    keywords: ["Principled", "Framework-guided", "Reputation-conscious", "Structured", "Institutional"],
    gifts: [
      `Character shaped by legitimate structure has a specific reliability and orientation — it knows what it's building toward and the framework tells it when it's arrived`,
    `Recognition from institutions carries genuine weight because it was granted by something the person actually respected`,
    `Operates with unusual integrity within chosen frameworks — the rules are real, and so is the character that builds within them`,
    ],
    shadows: [
      `官轻则贵，官重则压: light structure enables, heavy structure suppresses — when the framework becomes excessive, character shaped by endorsed structure becomes shaped by obligation`,
    `When the framework reveals itself as unworthy, the disorientation is larger than the situation warrants from outside`,
    `The "good student" who did everything right and discovered that institutions don't always work the way their stated rules suggest`,
    ],
    decision: `Framework-guided — needs a legitimate basis for the decision before committing. Consults precedent, institutional norms, and the opinions of respected authorities. The specific weakness: analysis paralysis when the legitimate framework is unclear or absent.`,
    communication: `Formal, structured, respects the protocol of communication within the relationship. Carries the weight of someone who means what they say within a framework that holds both parties. Doesn't freelance outside agreed terms.`,
    hidden: `The specific interior vulnerability: the person who genuinely followed the rules, who invested years in becoming excellent within the framework, who believed the institution would recognize this — and then discovered that what was stated and what was practiced were not the same thing.`,
    domains: {
      career: {
        mechanism: "正官 → legitimate institutional advancement, meritocratic recognition",
        text: `Excels within legitimate institutional structures — established professions, government, corporate ladders where the rules are genuinely real. The failure mode: institutional environments that operate by stated rules and hidden rules simultaneously.`,
      },
      relationships: {
        mechanism: "正官 → commitment-oriented, framework-defined, endorsement-seeking",
        text: `Commitment-oriented, takes the agreed terms of a relationship seriously, reliable across time. The shadow: applies the institutional framework to relationships — there are implicit rules about what the relationship is, and deviation requires renegotiation.`,
      },
      wealth: {
        mechanism: "正官 → legitimate channels, meritocratic earning, stable accumulation",
        text: `Earns through legitimate, endorsed paths. Conservative and reliable. The risk: wealth opportunities that exist outside conventional legitimacy are difficult to engage because they don't fit the endorsable framework.`,
      },
      health: {
        mechanism: "正官 → institutional health approaches, suppression of DM expression",
        text: `Follows established health frameworks — respected medical guidance, conventional approaches. The shadow: difficulty trusting signals that fall outside the endorsed framework.`,
      },
    },
    people: `正官 classically for female DMs represents the legitimate husband and primary partnership. More broadly: official mentors, respected authorities who grant genuine recognition, institutional endorsers. The teachers who noticed you. The managers who advocated for you within the system.`,
    liunian: `A 正官 year or period brings recognition from institutions, career appointments, public reputation events, marriage or formal partnership opportunities. For aligned charts: a period of genuine advancement within chosen frameworks. For charts where 正官 is unfavorable: over-regulation, the framework becoming a constraint.`,
  },

  "偏印": {
    // The Well — Same-polarity resource — nourishment that deepens without redirecting
    name: "The Well",
    sub: "Same-polarity resource — nourishment that deepens without redirecting",
    realmPhrase: `Niche/Occult Intelligence — depth in what others don't access`,
    realmDesc: `滋生有源 (nourishment with a continuous source). The part of a person that draws from a deep, unconventional source that others don't have access to or even know exists. The backing that sustains and deepens without redirecting.`,
    keywords: ["Deep", "Unconventional", "Niche", "Self-sustaining", "Psychically aware"],
    gifts: [
      `Extraordinary depth in their particular domain because the sustaining source has been deepening it for a long time — a depth others can't replicate through effort alone`,
    `A groundedness that doesn't feel like something worked for; access to frames and knowledge that the mainstream hasn't codified`,
    `Most useful and most trusted precisely where others lack the depth — the specific niche where the unconventional backing produced something rare`,
    ],
    shadows: [
      `The backing never required building the capacity to sustain without it — sudden loss of the source produces disproportionate disorientation`,
    `Depth without direction: the well deepens but without opening onto new territory`,
    `印多夺食: excess resource smothers output — the nourishment that enables can, in excess, prevent the independent expression of the capability it enabled`,
    ],
    decision: `Pattern-based, draws on established frameworks from the unconventional source rather than conventional wisdom. Slow to adopt new frameworks because the existing one has been refined over a long time.`,
    communication: `Withheld, communicates through depth rather than volume. Prefers one-on-one over group settings. What is shared tends to be specific and unusual enough that it doesn't land easily in general audiences.`,
    hidden: `Knowing things others don't know, from sources others don't access, in ways that are genuinely difficult to explain or legitimize. The shadow: when the source is removed, discovering that the capacity to generate the depth independently was never fully developed. What makes this structurally different from 正印: same-polarity nourishment deepens what is already there without opening it toward something genuinely new. The well gets deeper. The territory stays the same.`,
    domains: {
      career: {
        mechanism: "偏印 → unconventional expertise, niche authority, alternative knowledge systems",
        text: `Excels in research, alternative knowledge systems, specialized consulting, unconventional creative fields. The depth that 偏印 produces is genuine and specific — hard to replicate, hard to credential conventionally.`,
      },
      relationships: {
        mechanism: "偏印 → depth without opening, sustaining without directing",
        text: `Deep connection with those who share or appreciate the niche; genuine bafflement with those who don't. 偏印 in relationships provides security and depth but not growth direction — sustaining without redirecting.`,
      },
      wealth: {
        mechanism: "偏印 → niche expertise monetization, unconventional income paths",
        text: `Generates income through unusual or niche expertise. When the depth is properly monetized, it works because there are few who can offer the equivalent. The risk: the abundance mentality of the source can make charging appropriately feel out of alignment.`,
      },
      health: {
        mechanism: "偏印 → specific restoration conditions, dependency on source element",
        text: `偏印 produces deep restoration specifically when the DM's element is replenished through its own nature. The health pattern: extremely effective specific recovery practices that aren't easily transferred or replaced.`,
      },
    },
    people: `偏印 classically represents step-parent or unconventional mentor; older figures who provide support without conventional relationship structure. In modern life: alternative teachers, mentors from unusual traditions, esoteric knowledge communities.`,
    liunian: `A 偏印 year or period brings deep learning, withdrawal from mainstream activity, sustained engagement with unconventional knowledge, and strong support from unusual sources. For aligned charts: a genuinely nourishing and deepening period. For charts where 偏印 creates friction: over-reliance on past patterns, blocked output.`,
  },

  "正印": {
    // The Root — Cross-polarity resource — nourishment that sustains and opens
    name: "The Root",
    sub: "Cross-polarity resource — nourishment that sustains and opens",
    realmPhrase: `Support System / Mother Wound — backed and pointed`,
    realmDesc: `Bowlby's secure base in its most developmental form: the base that enables exploration by providing both support and direction simultaneously. The part of a person shaped by backing that came with a destination — not just sustained, but sustained AND pointed toward something.`,
    keywords: ["Grounded", "Mentored", "Directionally shaped", "Supported", "Purpose-oriented"],
    gifts: [
      `Character that feels simultaneously grounded and purposeful — rooted and reaching at the same time, which is genuinely rare`,
    `Knows what it's building toward, not just that it's building; the direction arrived with the support and feels genuinely internalized`,
    `The quiet confidence that comes from having had genuine backing — not asserted, not performed, simply present in how the person moves`,
    ],
    shadows: [
      `The direction given with the backing can become the only direction known — the reach grew where the nourishment pointed and may not know how to self-generate direction without it`,
    `The backing may have served the source's vision as much as the recipient's genuine calling`,
    `Loss of the supporting structure produces disorientation disproportionate to the situation`,
    ],
    decision: `Seeks guidance before deciding on significant choices. Finds genuine confidence within a decision framework provided by someone or something trusted. The weakness: difficulty accessing confidence when the backing structure is absent.`,
    communication: `Directional — tends to communicate in ways that include where things should go next. Feels most competent communicating from a position of endorsed knowledge. Less comfortable with pure improvisation.`,
    hidden: `The question that runs beneath everything: is what I am building toward actually mine, or did the backing shape me toward its vision? What makes this structurally different from 偏印: cross-polarity nourishment sustains AND opens — it doesn't just feed what exists, it points toward what doesn't yet exist. The direction that opened with the backing — was it genuinely toward you, or toward what the source needed you to become?`,
    domains: {
      career: {
        mechanism: "正印 → mentored capability, institutional advancement, legitimate backing",
        text: `Excels in roles with genuine mentorship, institutional backing, and clear developmental paths — academia, established professions, organizations with real career ladders. The risk: the career direction may have been shaped by what the supporting system rewarded.`,
      },
      relationships: {
        mechanism: "正印 → vertical orientation, sustaining and directing in relationships",
        text: `The relational reference frame tends toward the vertical (mentor/mentee) rather than the horizontal (genuine peer equality). Often extraordinary in relationships where they can provide support and direction to others.`,
      },
      wealth: {
        mechanism: "正印 → institutionally backed income, endorsed paths, directionally validated earning",
        text: `Tends to generate wealth through paths that carry legitimate endorsement. Difficulty pursuing wealth through paths that aren't legitimized by the supporting structure — not from lack of capability but from lack of directional endorsement.`,
      },
      health: {
        mechanism: "正印 → nourishment and opening, inherited health approaches, maternal lineage",
        text: `The health approach tends to follow the mentors and support structures that formed the person. Classically related to the mother and maternal lineage in health pattern transmission.`,
      },
    },
    people: `正印 classically represents mother and maternal figures, formal mentors, and legitimate institutional backers. More broadly: the teachers who believed in you AND told you where to go with it; the institutions that accepted you and shaped your direction.`,
    liunian: `A 正印 year or period brings mentorship opportunities, institutional recognition, educational advancement, and periods of genuine backing. Also: mother-related events, significant shifts in the primary support structure. For aligned charts: a period of genuine development within supported, directional growth. For charts where 正印 creates friction: direction given with the backing becoming a constraint.`,
  },

};

// ═══════════════════════════════════════════════════════════════════════════
// COMPOUND_CARDS
// 50 domEl × specificTenGod compound archetype cards. 13 fields per card.
// Generated by Pipeline C in generate_templates_v2.js.
// Priority: forge combinations (七杀/正官) first — see DOC4 §9 for authoring order.
//
// Workflow:
//   node generate_templates_v2.js generate-compound   (submit batch)
//   node generate_templates_v2.js retrieve-compound   (collect results)
//   node generate_templates_v2.js check-compound      (validate 13 fields)
//   node generate_templates_v2.js merge-compound      (→ generated_compounds.js)
//   Paste GENERATED_COMPOUNDS body here to populate.
//
// Fields per card: hook, dynamic, your_gift, your_scene, your_interior,
//   your_tension, your_fuel, your_cost, your_build, running_well, off_track,
//   your_person, one_line
// ═══════════════════════════════════════════════════════════════════════════

export const COMPOUND_CARDS = {
  // Populated after Pipeline C generation run.
  // Engine reads from here — CompoundReadingCard in ElementSpectrum renders
  // empty placeholder state when a key is missing.
};
