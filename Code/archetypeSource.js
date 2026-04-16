/**
 * archetypeSource.js — Elementum Engine · Source of Truth
 *
 * The single source of truth for all field names, reading templates, and
 * knowledge-pool content. An identical HTML copy exists as a parallel
 * editing surface — the JS file and the HTML file must always match.
 *
 * All downstream archetype data files (ElementNature_DATA.js,
 * DomEnergyTg_Data.js) derive their field naming from this file.
 *
 * Usage:
 *   import { STEM_CARD_DATA, TG_CARD_DATA } from './archetypeSource.js';
 *
 * STEM_CARD_DATA — 10 stems. External energy force + energy manual per stem.
 *                  Fields: energy.* (element as environmental force),
 *                  manual.* (catalyst, resistance, band paragraphs)
 * TG_CARD_DATA   — 10 Ten Gods. Full card data per Ten God (ruling realm,
 *                  personality, life domains, people, 流年大运 signatures)
 *
 * See DOC4 §4 for the complete field reference and tier assignments.
 */


// ═══════════════════════════════════════════════════════════════════════════
// STEM_CARD_DATA
// External energy + energy manual for each of the 10 Heavenly Stems.
// energy.*    → "As an External Energy" card (keywords, what, represents, liunian)
// manual.*    → "Energy Manual" card (concentrated, open, catalyst, resistance)
//
// blocks[]    → Base energy reading blocks. Uses the VARIANT SCHEMA:
//               { label, bands[], patterns[], priority{}, text{} }
//               Fallback: band_pattern → band → pattern → default
//               See DOC4 §9 for the full authoring rules.
//               This variant schema is specific to blocks[] ONLY — all other
//               fields in STEM_CARD_DATA and all TG_CARD_DATA fields are flat.
// ═══════════════════════════════════════════════════════════════════════════

// SOURCE: Free + Pro tier · Stem energy and manual fields
export const STEM_CARD_DATA = {

  "甲": {
    subtitle: `Forward motion as structure, not ambition · The Growth Impulse (Yang)`,
    chips: ["Visionary", "Initiating", "Growth-driven", "Integrity-bound", "Consolidation-resistant"],
    psychCore: {
      phrase: `The Perpetual Initiator`,
      desc: `He is the person who starts things that outlast him — driven by a forward momentum so structural it operates before intention forms, with a "tall tree" quality that would rather break than bend and a deep need to find a sky large enough to grow into.`,
    },
    blocks: [
      {
        label: `How they experience the world`,
        text: `The Oak doesn't decide to grow toward things. It just grows, the way a tree grows toward light — not because it chose the direction but because that's what it does. For this person, the next stage of anything is always visible before the current one has settled. They're mentally already somewhere else while the room is still discussing whether to begin. This isn't impatience exactly. It's more like living slightly ahead of the present moment at all times.`,
      },
      {
        label: `What they're genuinely good at`,
        text: `Seeing what something could become before anyone else does. Starting things — not because someone asked them to, but because the gap between what exists and what could exist is physically uncomfortable for them to leave alone. Once they start something, they generate a kind of forward pull that brings other people along without anyone deliberately organizing it. People around them tend to end up thinking bigger than they did before, often without knowing why.`,
      },
      {
        label: `Where they consistently get stuck`,
        text: `The reaching outruns the roots. They commit to something genuinely and deeply — and then outgrow it before it's fully established. There's a recurring pattern of building something real, then moving before it's been properly consolidated, leaving things in a state that needs someone else to finish. The next stage is always visible before the current one has actually been tested. This isn't fickleness — the investment was real. The problem is structural: the nature moves faster than the foundations can follow.

There's also a specific interpersonal cost: people who care about them often feel like they're perpetually catching up. The Oak doesn't mean to move that fast. It just can't stop.`,
      },
      {
        label: `What changes when conditions are right`,
        text: `The classical principle: raw wood becomes useful timber only when something shapes and defines it — converts the reaching into something specific. The Oak doesn't need someone to give it direction. What it needs is a force that says "this, not everything." When that arrives through the right challenge or pressure, the reach consolidates into something that holds. The growth doesn't stop. It just finally has a form.`,
      },
      {
        label: `What they rarely admit`,
        text: `That they often don't know what they're building toward — only that they're building. The momentum is real. The destination is often genuinely unclear even to them, which is part of why the reaching can go in so many directions before finding the thing that's actually worth the full force.`,
      },
    ],
    psych: {
      bigFive: `High Openness/Intellect · High Assertiveness · variable Industriousness (challenge is consolidation, not initiation)`,
      jungian: `Extraverted Intuition (Ne) + Extraverted Thinking (Te) — generates possibilities and reaches toward them before consolidating`,
      attachment: `Secure-leaning with over-extension risk — commits deeply then outgrows before fully rooting`,
      shadow: `Integrity vs. Rigidity — would rather break than bend. Authority is tolerated only if the vision is genuinely shared, not merely imposed`,
    },
    archetypes: ["ENTP / ENTJ (MBTI)", "The Pioneer (Brand)", "The Hero (Jungian)", "The Magician (Campbell)", "Type 7 / Type 3 (Enneagram)", "Aries / Sagittarius (Western)", "Manifesting Generator (HD)"],
    energy: {
      keywords: [],  // [FREE · energy chips]
      what: `甲 is the first stem — the energy of spring's first upward break through frozen ground. Classically described as 木之阳 (the Yang of Wood), it represents a forceful, non-negotiable impulse to rise and expand. Think of the moment when a forest floor cracks open with new growth after winter: nothing deliberate, nothing negotiated — just life asserting itself upward. It is the atmosphere of "things beginning whether you're ready or not."`,  // [FREE · DM intro + absent energy card]
      represents: `New projects launching all around you. The feeling of ambition and possibility filling the environment. People becoming more assertive, initiating more, competing more openly. The conditions that make starting things feel natural and necessary. Also: the landscape gets crowded — more people reaching for the same things at the same time.`,  // [FREE · DM intro + absent energy card]
      liunian: `When 甲 energy enters your luck cycle or annual pillar, it acts like the first warm week of spring — activating everything that was dormant. If you're positioned to initiate, this is the energy that provides momentum. If you're not ready to move, the pressure to start still arrives. Career opportunities emerge suddenly. Competitors become more visible. For those whose chart benefits from Wood energy, this is a period of genuine forward momentum; for those whose chart is already Wood-heavy, the excess can produce restlessness, overcommitment, or difficulty consolidating what's already been started.`,  // [PRO]
    },
    manual: {
      concentrated: `New ideas launch before old ones land. Commitments pile up faster than they can be honored. The chart or period is saturated with initiating energy — ambitious, restless, and difficult to anchor. The classical principle warns of "growth without harvest": energy expanding without converting into completed form. Restlessness is constant. Stillness feels impossible. The specific trap: more beginnings accumulate than can ever be finished, and the backlog slowly becomes its own weight.`,  // [FREE · Elemental Nature card]
      open: `Initiative is genuinely harder to find. The environment or person waits for external permission before moving. Starting things feels risky rather than natural. Leadership and forward visibility feel inaccessible — not from lack of capability but from lack of the upward-push energy that makes initiating feel worth the cost. Projects that need a champion stall at the beginning. Ambition may exist internally but stays unexpressed.`,  // [FREE · Elemental Nature card]
      catalyst: `Enter it by initiating the thing you have been circling — one specific thing, not ten. This is not a "plan more" energy; it is a "start now" energy. Commit to a direction and enter it fully before the window moves. Volunteer for the visible role, launch the project, make the first move in the relationship. The productive use is concentration of the initiating force, not dispersal. Outcome: things that had no momentum suddenly have it. Doors that required the right person to ask become accessible when you step forward as that person.`,  // [FREE · teaser  /  PRO · full analysis]
      resistance: `When 甲 energy is creating friction — growth impulse is competing with your structure rather than feeding it. Don't resist the initiating force; redirect it. Use the Metal quality (pruning, deciding, cutting options) to define which growth is worth nurturing. Stop adding beginnings — close enough open loops to make space for one thing to actually land. The corrective is not stillness but focus. Outcome: restlessness converts into directed momentum, and what was scatter becomes a clear line of forward motion.`,  // [PRO]
    },
  },

  "乙": {
    subtitle: `Navigation as intelligence, not accommodation · The Growth Impulse (Yin)`,
    chips: ["Adaptive", "Strategically perceptive", "Resilient", "Destination-fixed", "Coiling intelligence"],
    psychCore: {
      phrase: `The Intelligent Navigator`,
      desc: `She survives and arrives by reading surfaces others don't notice, coiling around obstacles with a precision that looks like flexibility but is actually destination-fixed — the one who survives the storm not by standing against it but by knowing exactly which way to bend.`,
    },
    blocks: [
      {
        label: `How they experience the world`,
        text: `The Vine knows where it's going before it knows how to get there. It reads surfaces, finds the gaps, goes around what can't be moved, and arrives somewhere the Oak never could have reached through force. From outside this looks indirect. From inside it's extremely precise: the destination is fixed; only the path is flexible. They have a gift for reading what a situation actually is — not what it presents, not what people say it is, but the actual underlying reality — and navigating according to that.`,
      },
      {
        label: `What they're genuinely good at`,
        text: `Finding the route that wasn't obvious. Arriving where they intended by means that nobody predicted. Reading people and rooms with an accuracy that feels almost unfair — they pick up on what's really happening before anyone has said the thing. Building genuine trust through attentiveness, not through performance. The people who know them well describe someone who always seems to end up exactly where they were heading, even when the path looked like it was going sideways.`,
      },
      {
        label: `Where they consistently get stuck`,
        text: `The adaptability can become the whole point. When every surface is interesting and every route is worth exploring, the Vine can keep navigating without actually landing anywhere. There's also a subtler risk: the Vine adjusts to surfaces so smoothly it can slowly accommodate away from its own position without noticing — adjusting so quietly that by the time they notice, it's hard to say exactly when it happened or what they actually think anymore.`,
      },
      {
        label: `What changes when conditions are right`,
        text: `The Vine's gifts fully activate when the environment is genuinely worth the full reach — a surface that deserves the climbing, a destination that's actually worth arriving at. In those conditions, the navigation is extraordinary: precise, intelligent, arriving somewhere real. In the wrong environment, the gifts don't disappear — they just don't engage. This makes choosing environments one of the highest-leverage decisions this person makes.`,
      },
      {
        label: `What they rarely admit`,
        text: `How much of what looks like flexibility is actually a form of self-protection — a way of staying mobile enough that no single failure can fully land. The adaptability is genuine intelligence. It's also, sometimes, a way of not having to find out what happens if they commit completely and it doesn't work.`,
      },
    ],
    psych: {
      bigFive: `High Enthusiasm (Extraversion facet) · High Compassion/Agreeableness · moderate Neuroticism (accumulation cost of structural warmth)`,
      jungian: `Extraverted Feeling (Fe) — shapes the emotional climate of any space occupied, as a property of presence rather than performance`,
      attachment: `Secure with abandonment sensitivity — the giving is genuine; the depletion is real when unrecognised by others`,
      shadow: `The Authenticity Burden — performing "light" for others while sitting in one's own shadow; deep exhaustion invisible behind consistent radiance`,
    },
    archetypes: ["ENFJ / ESFJ (MBTI)", "The Hero (Brand)", "The Great Mother / Anima (Jungian)", "Type 2 / Type 7 (Enneagram)", "Leo / Aries (Western)", "Manifestor (HD)", "The Lover (Campbell)"],
    energy: {
      keywords: [],  // [FREE · energy chips]
      what: `乙 is the energy of the vine after the tree — not the initial thrust but the intelligent navigation that follows. Classically described as the Wood that bends rather than breaks, it represents pervasive, penetrating growth that finds every available path. Where 甲 forces upward, 乙 feels its way forward. It is the atmosphere of "the smart path matters more than the direct one."`,  // [FREE · DM intro + absent energy card]
      represents: `Relationship dynamics becoming more important than raw capability. Opportunities arriving through connections rather than competition. The environment rewards those who read the room well, adapt quickly, and know how to work with people. Diplomacy outperforms force. Collaboration opens doors that confrontation closes.`,  // [FREE · DM intro + absent energy card]
      liunian: `When 乙 energy enters your luck cycle or annual pillar, the environment shifts toward relationship-intelligence. Raw power becomes less effective; knowing the right people and reading the terrain correctly becomes decisive. Opportunities arrive through networking, referrals, and word of mouth rather than visible achievement. A period that rewards those who listen well and move flexibly — and frustrates those who only know how to push directly. For charts that benefit from Wood, this brings collaborative momentum; for those already Wood-heavy, it can produce over-accommodation or difficulty making firm decisions.`,  // [PRO]
    },
    manual: {
      concentrated: `Everything accommodates, nothing commits. The chart or period is saturated with relational intelligence — socially exhausting because the room-reading never stops. The classical trap: 柔弱 (too yielding) — the vine that never finds a surface firm enough to actually climb, and so keeps reaching in all directions simultaneously. Chronic over-adaptation gradually erodes position: you become expert at arriving where others wanted, and lose track of where you intended to go. Commitment feels like a trap because there are always other paths.`,  // [FREE · Elemental Nature card]
      open: `Relational intelligence gaps appear. The environment can only approach things directly — and direct force fails in complex political or relational terrain. Opportunities that require connection rather than competence get missed. Diplomacy becomes unavailable when it's most needed. Life becomes more transactional and confrontational, even when a side door was available and far easier. The texture of relationships turns blunt.`,  // [FREE · Elemental Nature card]
      catalyst: `Engage it through the relational field: network, collaborate, make the introduction, let others open the door. This energy rewards those who work through people rather than around them. The productive use is entering the room where the right connections already exist, not building something alone. Allow others to facilitate what direct effort would take three times as long to produce. Outcome: networks activate, referrals arrive, opportunities appear through relationship rather than visible achievement — and often move faster than any amount of direct pushing would.`,  // [FREE · teaser  /  PRO · full analysis]
      resistance: `When 乙 energy is creating friction — flexibility is working against your actual goal. You have read the room so accurately that you've accommodated yourself out of your original position. The corrective: name where you are going before you enter the adaptive mode. Know your destination clearly before you start finding routes around the obstacles. Don't add more flexibility — add a clear ending point for the navigation so it doesn't become permanent drift. Outcome: the adaptability becomes intelligent navigation rather than endless accommodation, and what was drift becomes a route.`,  // [PRO]
    },
  },

  "丙": {
    subtitle: `Warmth as structural property, not personality trait · The Visibility Impulse (Yang)`,
    chips: ["Radiant", "Generative", "Involuntarily warm", "Invisibly depleting", "Trust-creating"],
    psychCore: {
      phrase: `The Involuntary Illuminator`,
      desc: `She warms every room she enters without deciding to, creating trust and possibility in others while often sitting in her own unacknowledged shadow — performing light for everyone while the cost accumulates invisibly, never quite getting to ask what she needs in return.`,
    },
    blocks: [
      {
        label: `How they experience the world`,
        text: `The Sun doesn't decide to warm things. It warms things because that's what it is. People orient toward this person in a room without deciding to — they just find themselves doing it. Things feel more possible near them. Ideas get bigger. Other people feel more capable of things they weren't sure they could do. This isn't something they engineer; it's a property of their presence, the way sunlight warms a surface without the sun choosing that particular spot.`,
      },
      {
        label: `What they're genuinely good at`,
        text: `Creating trust quickly, authentically, and without trying. Moving people not through logic or performance but through what they actually believe — which means it works in rooms where performance would fail completely. Making people feel genuinely seen, not just acknowledged. Sustaining warmth over time in a way that builds rather than fluctuates — the people who receive it know it's real because it was still there on the difficult days too.`,
      },
      {
        label: `Where they consistently get stuck`,
        text: `The warmth goes everywhere at once, which means it costs the same as focused warmth but produces a fraction of the impact. The giving feels effortless — which is exactly why the depletion accumulates invisibly. They don't notice the tank getting low until it's very low. Others assume they're inexhaustible. This assumption is wrong but hard to correct — the moment the warmth dims, people register it as a problem with the relationship rather than a cost that was always being paid.`,
      },
      {
        label: `What changes when conditions are right`,
        text: `Directed warmth — warmth that knows where it's going — is dramatically more powerful than broadcast warmth. When this person finds relationships and contexts that genuinely give back, the warmth stops being diffuse and becomes specific. What was warming a whole room starts illuminating particular things fully. That's when the Sun's quality is at its most extraordinary: not more warmth, but warmth that has somewhere real to go.`,
      },
      {
        label: `What they rarely admit`,
        text: `That they sometimes don't know whether the warmth is something they're choosing or something that just runs regardless. The giving can feel less like a gift and more like a structural fact — which makes it genuinely difficult to protect, because it's hard to guard something that operates before you've decided to give it.`,
      },
    ],
    psych: {
      bigFive: `High Conscientiousness across both facets · Low Neuroticism · moderate Extraversion — structural reliability rather than effortful discipline`,
      jungian: `Introverted Sensation (Si) in its most stable expression — maintains the internal framework of what works, what has proven stable, what can be depended on`,
      attachment: `Secure provider with stagnation risk — the stability that holds everything can hold itself in place past the point of serving anyone`,
      shadow: `Internal Stagnation — "who holds the rock?" The heaviness that makes this person irreplaceable is also what prevents them from moving toward what they need`,
    },
    archetypes: ["ISTJ / ESTJ (MBTI)", "The Ruler (Brand)", "The Self / Great Father (Jungian)", "Type 9 / Type 1 (Enneagram)", "Taurus / Capricorn (Western)", "Manifestor / Generator (HD)", "The Guardian (Campbell)"],
    energy: {
      keywords: [],  // [FREE · energy chips]
      what: `丙 is the sun — the great broadcasting fire that lights everything simultaneously. Classically described as 火之阳 (the Yang of Fire), it is outward, radiant, and indiscriminate: it warms what it reaches and illuminates what it touches without choosing. The classical texts describe 丙 as giving warmth and light to all things under heaven. It is the atmosphere of "nothing stays hidden; everything becomes more visible."`,  // [FREE · DM intro + absent energy card]
      represents: `Public recognition opportunities. Career visibility increasing. Social environments expanding and becoming more energized. Fame and reputation becoming relevant — for better and for worse. What has been built becomes more publicly known. Equally, what has been concealed becomes harder to keep covered. It is the energy of the spotlight.`,  // [FREE · DM intro + absent energy card]
      liunian: `When 丙 energy enters your luck cycle or annual pillar, visibility increases across the board. If you have built something worth showing, this is when it gets seen. Career recognition can arrive quickly. Social networks expand. Opportunities come through being publicly known rather than quietly competent. The shadow is equally real: 丙 reveals everything, including what wasn't meant to be seen. For charts that benefit from Fire, this is an activating period of genuine recognition; for those already Fire-heavy, the excess can produce burnout, overexposure, or reputation risk.`,  // [PRO]
    },
    manual: {
      concentrated: `Everything is lit up — and nothing remains private. Social momentum and recognition are high. But excess 丙 is literal overexposure: work that wasn't ready gets seen, private things become public, and being "on" continuously becomes genuinely depleting. The classical warning: 火炎土燥 (fire blazes, earth scorches) — when Fire becomes excessive, the ground beneath it dries and cracks. The environment becomes brilliant but unstable, high-energy but exhausting. Reputation risk increases alongside recognition opportunity.`,  // [FREE · Elemental Nature card]
      open: `Visibility is genuinely harder to access. Quality work exists but doesn't surface. The person or environment struggles to be noticed despite having real substance. Social connections feel effortful rather than natural. The classical image: a lantern inside a jar — the flame is real but the light doesn't reach others. Career recognition requires ten times more effort than it should because the radiance that would carry the work outward is simply not present.`,  // [FREE · Elemental Nature card]
      catalyst: `Activate it by entering public or visible contexts: put the work in front of others, attend the gathering, publish the piece, take the speaking slot. This is not a "refine quietly" energy — it produces momentum specifically through being seen. Don't wait until everything is perfect. Enter the spotlight when it's available. Outcome: recognition accelerates when conditions align. Career momentum that felt stuck suddenly moves because visibility has been restored and the quality that was invisible is now landing.`,  // [FREE · teaser  /  PRO · full analysis]
      resistance: `When 丙 energy is creating friction — warmth and visibility are running ahead of what the chart can sustain. The exposure is broader than the structure behind it can support. Channel it by directing exposure strategically rather than broadcasting broadly. Use the Water quality (depth, selectivity, substance) to give form to what's being shown — choose specific audiences, specific contexts, specific moments. Outcome: overexposure converts into targeted presence, and what felt like scatter becomes a signal that actually lands.`,  // [PRO]
    },
  },

  "丁": {
    subtitle: `Complete illumination of exactly what it's pointed at · The Visibility Impulse (Yin)`,
    chips: ["Precise", "Intimate", "Selectively warm", "Detail-sensitive", "Flickering under depletion"],
    psychCore: {
      phrase: `The Focused Witness`,
      desc: `He sees completely what he chooses to look at, making people feel genuinely known in ways they rarely experience — but is a lighthouse rather than a sun: he guides people one-on-one, feels invisible in a crowd, and begins to flicker when the resources feeding his flame run low.`,
    },
    blocks: [
      {
        label: `How they experience the world`,
        text: `The Candle illuminates what it's pointed at completely — and nothing else. When the Candle's attention is on you, you are genuinely seen in a way that most people never experience. The attention is total. The light is complete. And what it's not currently pointing at receives almost nothing. This is not the Sun's warmth, which fills a whole room. This is something more precise and more intimate: specificity is the whole point.`,
      },
      {
        label: `What they're genuinely good at`,
        text: `Noticing the thing that others walked past. Producing work of real quality in whatever they're fully invested in. Making people feel understood in a way that is specific to them — seen as who they actually are rather than how they've presented themselves. Their perception is unusually accurate, especially about things that are just slightly off. The quality of their attention is something people remember specifically and tend to return to.`,
      },
      {
        label: `Where they consistently get stuck`,
        text: `The full force of attention can arrive harder than the moment required. Contexts that needed gentle warmth receive the full flame. What falls outside the current focus receives almost nothing — people who aren't being fully attended to can feel the absence sharply and take it personally, even when it has nothing to do with them.

There's also an investment asymmetry that accumulates: the Candle gives the full quality of its attention without always checking whether it's being matched. The care is real. The return is often lower than what was given. And because the giving felt like connection rather than cost, the imbalance often goes unnamed for a long time.`,
      },
      {
        label: `What changes when conditions are right`,
        text: `The Candle works best when its autonomy to direct the light is genuinely its own — when what it chooses to focus on is genuinely worth the full illumination. In those conditions, the precision is extraordinary: the depth of understanding, the quality of care, the accuracy of perception. The practice is learning that choosing selectively isn't a failure to be more like the Sun — it's the mechanism by which this particular kind of light actually works.`,
      },
      {
        label: `What they rarely admit`,
        text: `That when the full flame arrives at full force in a context that wasn't ready for it, they often don't understand why it didn't land the way it should have. The quality was real. The care was genuine. What they don't always account for is that not every moment wants to be fully illuminated.`,
      },
    ],
    psych: {
      bigFive: `High Conscientiousness/Industriousness · Low Agreeableness/Politeness · lower Neuroticism — evaluation as structural default, not as active choice`,
      jungian: `Introverted Thinking (Ti) — the evaluation operates through an internal logical framework that cannot be switched off; runs before social or emotional consideration`,
      attachment: `Dismissive-avoidant — self-sufficient, low dependency; the evaluative default reads as distance but the care is real, arriving through the same precision channel as everything else`,
      shadow: `The Justice Wound — sees the world in Right/Wrong; the bluntness is a defense mechanism for a very soft interior; the blade in the tongue is protecting something that rarely gets shown`,
    },
    archetypes: ["INTJ / ENTJ (MBTI)", "The Outlaw / Maverick (Brand)", "The Hero / Warrior (Jungian)", "Type 1 / Type 8 (Enneagram)", "Aries / Scorpio (Western)", "Manifestor (HD)", "The Warrior (Campbell)"],
    energy: {
      keywords: [],  // [FREE · energy chips]
      what: `丁 is the candle or the forge fire — concentrated, intentional, illuminating exactly what it points at. Where 丙 lights everything, 丁 lights one thing completely. Classically described as the refining and illuminating fire used to work metal and reveal detail, it is the energy of careful examination rather than broad visibility. It is the atmosphere of "the details that were missed before now come into focus."`,  // [FREE · DM intro + absent energy card]
      represents: `Learning, skill development, and careful refinement becoming more productive than broad expansion. The fine print in agreements becoming relevant. Relationships and projects kept at surface level getting examined more closely. Spiritual and intellectual insight becoming more accessible. The value of precision and quality rising relative to scale.`,  // [FREE · DM intro + absent energy card]
      liunian: `When 丁 energy enters your luck cycle or annual pillar, the environment rewards attention to detail and careful development over broad ambition. Skills cultivated during this period tend to be genuinely refined. Examinations — literal and figurative — go well for those who have prepared carefully. Agreements and commitments should be read closely. For charts that benefit from Fire, this brings focused development and meaningful insight; for those already Fire-heavy, it can produce overthinking, excessive self-examination, or anxiety from looking too closely at everything at once.`,  // [PRO]
    },
    manual: {
      concentrated: `The examining quality becomes exhaustive. Every detail gets scrutinized, every relationship gets held to a standard of depth it may not be designed for, every piece of work gets refined past the point of value. The classical problem: excess 丁 burns away what it examines — the candle that runs out of its own fuel. Anxiety emerges from examining everything and finding it insufficient. The environment becomes demanding and intense rather than illuminating. The precision becomes punishing rather than refining.`,  // [FREE · Elemental Nature card]
      open: `Things stay at surface level. Work is produced but not polished. Relationships remain pleasant but never reach real depth. The "notice what others miss" quality is not accessible. There may be energy — perhaps broad warmth from 丙 — but no concentrated, directional light. The specific deficit: work gets started and finished, but the layer beneath the surface — where the genuine quality lives — remains undeveloped.`,  // [FREE · Elemental Nature card]
      catalyst: `Activate it by going deeper into one thing rather than broader across many. Study the subject fully, not partially. Have the one-on-one conversation that a group setting would prevent. Revise the work one more time past where it felt done. Develop the skill to the level where it actually distinguishes you rather than merely qualifying you. Outcome: depth produces results that breadth never could. What is made in this focused state carries a quality that persists across time and resists erosion by competition.`,  // [FREE · teaser  /  PRO · full analysis]
      resistance: `When 丁 energy is creating friction — precision is examining rather than building. The scrutiny is consuming the energy that should go into output. The corrective: set a completion point before you begin — decide in advance what "done" looks like, so the refining faculty has a finish line. Once that point is reached, move the examining quality to the next project rather than continuing to refine the current one. Outcome: precision lands constructively rather than circling endlessly, and what was paralysis becomes a sequence of genuinely completed things.`,  // [PRO]
    },
  },

  "戊": {
    subtitle: `The ground others orient by without naming · The Stability Impulse (Yang)`,
    chips: ["Grounding", "Load-bearing", "Change-resistant", "Silently accumulating", "Orientation-providing"],
    psychCore: {
      phrase: `The Unnamed Foundation`,
      desc: `She provides the psychological ground that everyone orients by without acknowledging — the world's "rock," holding far more than she shows while rarely naming what she needs in return, and carrying a heaviness that prevents her from moving toward new opportunities even when she can see them clearly.`,
    },
    blocks: [
      {
        label: `How they experience the world`,
        text: `The Mountain is what people orient by. It provides a kind of psychological ground — a stable reference point that others use without thinking about it. Conversations land differently around them. Decisions get made based on what they think, often before anyone has formally asked. People plan their lives around their presence. The reliability isn't something they practice or maintain through effort — it's what they're made of, the way a mountain is made of stone rather than holding itself up by trying.`,
      },
      {
        label: `What they're genuinely good at`,
        text: `Holding what needs holding — weight, stress, uncertainty, pressure — without showing the cost in a way that makes others feel responsible for it. Building things that last because they genuinely cannot tolerate building things that won't. Following through across time, not as a discipline they impose on themselves but as a structural fact. Being the person in the room who is still there when the dramatic options have run out.`,
      },
      {
        label: `Where they consistently get stuck`,
        text: `The same quality that makes them load-bearing makes genuine movement difficult. When something needs to change — a relationship that's over, a position no longer tenable — the Mountain can hold it in place long past the point where the situation calls for release. Not from stubbornness. More from the fact that the stability everyone relies on makes shifting feel like a betrayal of what they're for.

There's also a slow accumulation of unspoken costs. The Mountain absorbs a great deal without naming it. Over time this produces weight that no one sees because the Mountain never showed it — which means no one thought to ask whether it was okay.`,
      },
      {
        label: `What changes when conditions are right`,
        text: `The Mountain that has learned to distinguish between what needs to be held and what needs to be released is dramatically more powerful than the one that holds everything equally. The fire that activates it doesn't destabilize the stability — it gives the holding a direction. What was simply present becomes generative. What was enduring begins to produce.`,
      },
      {
        label: `What they rarely admit`,
        text: `That they need things too — specific things, from specific people — and have spent so long not needing anything visibly that they've almost stopped knowing how to name what those things are. The Mountain is so reliably there for everyone else that the question of what it needs has largely stopped being asked. Which means it's also largely stopped being answered.`,
      },
    ],
    psych: {
      bigFive: `High Openness/Intellect · lower Extraversion Enthusiasm · High Industriousness · variable Neuroticism — competence and autonomy needs extremely high`,
      jungian: `Introverted Thinking (Ti) at vast scale + Introverted Intuition (Ni) — processes comprehensively, holding multiple frameworks simultaneously, generating systemic insight`,
      attachment: `Dismissive-avoidant — the depth that perceives everything can produce emotional distance; holding more internally than gets shown is constitutional, not a choice`,
      shadow: `Emotional Scale — thinks in "waves"; massive ambition but lack of natural limits tends to flood rooms or disappear entirely; the translation gap between depth and surface is persistent`,
    },
    archetypes: ["INTP / INTJ (MBTI)", "The Sage (Brand)", "The Wise Old Man / Self (Jungian)", "Type 5 / Type 7 (Enneagram)", "Scorpio / Aquarius (Western)", "Reflector / Projector (HD)", "The Threshold Guardian (Campbell)"],
    energy: {
      keywords: [],  // [FREE · energy chips]
      what: `戊 is the mountain or the great plain — immovable, orienting, the accumulating ground. Classically described as 土之阳 (the Yang of Earth), it is the energy of settled, solid, load-bearing stability. 三命通会 describes 戊 as the earth that "stands without moving" — the reference point by which other things find their position. It is the atmosphere of "things solidify and slow; what is built now is built to last."`,  // [FREE · DM intro + absent energy card]
      represents: `Real estate, property, and physical assets becoming more prominent. Consolidation of resources and positions. The environment favoring stability and reliability over speed and novelty. Long-term commitments and foundations gaining importance. Things taking longer to move — ideal if you are building something meant to endure, frustrating if you are pushing for rapid change.`,  // [FREE · DM intro + absent energy card]
      liunian: `When 戊 energy enters your luck cycle or annual pillar, the environment shifts toward consolidation and foundation-building. Property matters become more significant. Career positions and relationships that were fluid start to solidify — sometimes helpfully, sometimes constrainingly. The pace of change slows. Reliability and consistency become more valuable than innovation. For charts that benefit from Earth, this is a grounding, stabilizing period of genuine accumulation; for those already Earth-heavy, the excess can produce stagnation, difficulty changing course, or a heaviness that makes movement feel impossible.`,  // [PRO]
    },
    manual: {
      concentrated: `The grounding quality becomes literal heaviness. Things that should move don't. Decisions that should be made get postponed. Weight accumulates without being processed. Classical texts warn 土重则滞 (excess Earth creates stagnation) — when the Mountain grows too dense, nothing moves across it. Opportunities pass because the inertia of consolidation prevents engagement with what's new. The environment becomes utterly reliable but genuinely stuck. Stability, which was the gift, becomes the trap when it refuses to distinguish between what should be held and what should be released.`,  // [FREE · Elemental Nature card]
      open: `Foundational stability is hard to access. Things don't land or hold. Projects start but don't root — growth happens above ground, but there's no foundation for it to anchor into. Financial and physical accumulation is more difficult. The environment feels unstable or mobile in ways that are exhausting rather than exciting. Others can't build on what you offer because the surface keeps shifting before they get a chance to establish themselves on it.`,  // [FREE · Elemental Nature card]
      catalyst: `Activate it by doing the foundation work: establish the structure, formalize the arrangement, secure the position, sign the commitment. This is not a "explore and expand" energy — it is "consolidate what you have and make it permanent." The productive use is making the tentative fixed. Outcome: what was provisional becomes stable. Resources stop moving and start accumulating. What is built now stays built in a way that the previous period of movement never allowed, and the groundwork laid here supports the next several years of activity on top of it.`,  // [FREE · teaser  /  PRO · full analysis]
      resistance: `When 戊 energy is creating friction — stability is working against the movement the chart needs. The ground is too fixed to accommodate necessary change. Don't try to remove the Mountain; find the path it allows. Use Wood energy (growth impulse, directionality) to create movement within the structure rather than against it — not breaking the foundation, but finding where within it something new can grow. Outcome: resistance becomes framework, and what felt like an obstacle becomes the specific form within which something worthwhile can be built.`,  // [PRO]
    },
  },

  "己": {
    subtitle: `Growing things in others without announcing it · The Stability Impulse (Yin)`,
    chips: ["Nurturing", "Developmentally attuned", "Invisibly depleting", "Overcultivating", "Responsive"],
    psychCore: {
      phrase: `The Silent Cultivator`,
      desc: `He creates conditions for others to grow without announcing it, invested in the development of everything around him at a rate that chronically exceeds what is returned — a fertile mind that can grow anything, but often grows weeds from overthinking, and risks being "farmed" by others for his kindness.`,
    },
    blocks: [
      {
        label: `How they experience the world`,
        text: `The Field grows things in everyone it encounters — before it decides to. It notices what people and situations need and responds before being asked, the way fertile soil responds to a seed by providing what's required for it to grow. People develop in the presence of this person in ways they often attribute entirely to themselves — not recognizing that the conditions making the growth possible were created by someone paying close, quiet attention to what was needed.`,
      },
      {
        label: `What they're genuinely good at`,
        text: `Reading what a person or situation actually needs — not what's being asked for, but the underlying requirement. Following through on care consistently across time, not just when it's convenient or visible. Building relationships that genuinely develop people rather than simply maintaining proximity. Producing in others a kind of trust earned specifically by consistency: when they say they'll show up, they do, and people build their lives around that accordingly.`,
      },
      {
        label: `Where they consistently get stuck`,
        text: `The Field depletes invisibly. The nourishment flows outward without being tracked — and by the time the deficit becomes visible, it's been accumulating for months. The growth they create in others tends to be attributed to those others, which means the Field is chronically undercompensated for what it actually produces. They're also particularly susceptible to investing in contexts that absorb without returning. The Field is often the last to notice this, partly because caring about whether care is being returned feels, to them, like a betrayal of what genuine care should be.`,
      },
      {
        label: `What changes when conditions are right`,
        text: `In genuinely reciprocal conditions — where the care flows in both directions and the Field is being nourished at the same rate it nourishes — what it produces is extraordinary. The growth that was quiet and consistent becomes visible and remarkable. The practice is treating its own fertility as something worth protecting rather than something to be fully spent on whoever arrives.`,
      },
      {
        label: `What they rarely admit`,
        text: `That they keep score, quietly — and that the accounting is often worse than anyone around them knows. They don't say this because saying it feels contrary to what care is supposed to be. But the gap between what's given and what returns is real, and it accumulates in them even when it isn't visible to anyone else.`,
      },
    ],
    psych: {
      bigFive: `High Agreeableness (both Compassion and Politeness facets) · moderate Conscientiousness · variable Extraversion — parental investment theory, not simple agreeableness`,
      jungian: `Introverted Feeling (Fi) in its most relational expression — cares specifically, not broadly; nourishment directed at what the specific person or situation actually needs`,
      attachment: `Anxious-preoccupied — high caregiving activation; when unreciprocated over time, depletes invisibly without anyone noticing the accumulation`,
      shadow: `Nurturing / Suffocation Balance — can be "farmed" by others for kindness; a fertile mind that can grow anything, but often grows weeds from overthinking what was planted`,
    },
    archetypes: ["ISFJ / INFJ (MBTI)", "The Caregiver (Brand)", "The Great Mother / Nurturing Anima (Jungian)", "Type 2 / Type 9 (Enneagram)", "Cancer / Virgo (Western)", "Generator (HD)"],
    energy: {
      keywords: [],  // [FREE · energy chips]
      what: `己 is the cultivated field — fertile, absorptive, responsive to what is planted. Where 戊 holds firm and does not yield, 己 receives and nourishes what it receives. Classically described as the earth that "produces and nurtures," it is the energy of patient, receptive cultivation. It does not force growth; it creates the conditions for growth to happen. It is the atmosphere of "what you plant now grows slowly and deeply."`,  // [FREE · DM intro + absent energy card]
      represents: `Health and wellbeing becoming a more prominent theme. Long-term investments — financial, relational, and personal — becoming more productive. The environment rewarding patience and careful cultivation over aggressive acquisition. Relationships that were casual deepening. Projects that were broad becoming more specific and nourishing. The body and its needs becoming harder to ignore.`,  // [FREE · DM intro + absent energy card]
      liunian: `When 己 energy enters your luck cycle or annual pillar, the environment supports patient cultivation over quick results. Health matters tend to surface — both as concerns requiring attention and as an opportunity for genuine restoration. Long-term investments begin paying quiet dividends. Relationships deepen rather than expand. This is not a period for dramatic moves; it is a period for developing what is already growing. For charts that benefit from Earth, this brings genuine nourishment and productive development; for those already Earth-heavy, the excess can produce overthinking, accumulation of worry, or a tendency to absorb others' difficulties without adequate filtration.`,  // [PRO]
    },
    manual: {
      concentrated: `The receptive and nurturing quality becomes absorptive without filtration. The environment or person pulls in difficulties as readily as it nourishes growth. Classical texts describe 己土混浊 (己 Earth becomes muddy) — when the fertile soil absorbs too much without drainage, it loses its cultivating quality entirely and becomes mud. Overthinking, rumination, and carrying others' emotional weight characterizes the excess state. The Field grows weeds as readily as it grows crops when there's no selectivity about what gets tended.`,  // [FREE · Elemental Nature card]
      open: `The patient-development quality is absent. Growth happens but nothing is tended. People and projects are initiated but not cultivated. The environment lacks the quiet, sustained presence that allows things to develop at their natural pace — which means the depth of development that slow nourishment produces simply never arrives. Quick results get prioritized over lasting ones, and nothing reaches the quality it could have reached with genuine care.`,  // [FREE · Elemental Nature card]
      catalyst: `Activate it by investing attention and care in what is already growing rather than starting something new. This is the energy for tending: deepening existing relationships, developing skills that have already been started, returning to projects that were begun but not fully cultivated. It specifically rewards patience — what receives genuine care and attention now develops into something of real substance over the next period. Outcome: things that were beginning deepen, relationships that were forming solidify, work that was surface-level becomes genuinely developed.`,  // [FREE · teaser  /  PRO · full analysis]
      resistance: `When 己 energy is creating friction — the absorptive quality is pulling in more than the chart can process. Obligations, relationships, and projects are accumulating faster than they can be properly nurtured. The corrective is deliberate selectivity: explicitly choose what deserves the cultivation energy and stop absorbing what doesn't. Use Metal energy (boundary, definition, cutting) to create filtration — allowing only the right material into the nurturing field. Outcome: caregiving becomes targeted and powerful rather than diffuse and depleting, and what was an endless drain converts into sustainable, productive investment.`,  // [PRO]
    },
  },

  "庚": {

    // ═══════════════════════════════════════════════════════════════════
    // SECTION 1: ELEMENTAL NATURE  (user-facing label: "Elemental Nature")
    // Base Energy — DM stem identity. Free teaser + Pro full reading.
    // ═══════════════════════════════════════════════════════════════════

    subtitle: `Evaluation runs before engagement begins · The Definition Impulse (Yang)`,
    chips: ["Evaluative", "Uncompromising", "Precision-first", "Self-sufficient", "Justice-oriented"],

    // PSYCHCORE — phrase = archetype identity; desc = 2nd person portrait (2–3 sentences, displayed FREE)
    psychCore: {
      phrase: `The Structural Assessor`,
      desc: `You evaluate before you engage, and the assessment never stops — a clarity so structural it arrives as precision before warmth, making you simultaneously the most trustworthy and most difficult person in any room. What reads as a blade is actually a defense mechanism for a very soft core beneath.`,
    },

    // GIFTS & SHADOWS — phrase [FREE] · desc [FREE · one sharp sentence, distinct angle]
    gifts: [
      { phrase: `The Structural Read`,       desc: `You don't choose to assess — the read finishes before you've decided to begin it.` },
      { phrase: `The Core Beneath the Edge`, desc: `What people experience as your edge is covering a depth of care that almost no one earns access to.` },
      { phrase: `The Held Position`,         desc: `When everyone else has adjusted their position to manage the room, yours is unchanged — and people depend on that more than they say.` },
    ],
    shadows: [
      { phrase: `The Finished Too Early`, desc: `You tend to call things complete before they've fully arrived — the clarity that recognizes finished things can misread what's still becoming.` },
      { phrase: `The Internal Standard`,  desc: `The assessment you turn outward runs inward too — and it holds you to a standard that never fully declares you done.` },
      { phrase: `The Clarity Gap`,        desc: `You often know something before the room is ready to hear it, and the distance between those two moments creates a loneliness that's hard to name.` },
    ],

    blocks: [

      {
        label: `How you experience the world`,
        bands: [`concentrated`, `balanced`, `open`],
        patterns: [`pure`, `rooted`, `flowing`, `forging`, `tested`],
        priority: { default: 5, concentrated: 5 },
        text: {
          default: `You evaluate before you engage. The assessment starts when you enter a room — not as a decision you make but as a process that has already begun. You know what holds up and what doesn't before the conversation has fully started. Others feel this in your presence even when nothing has been said. This is not coldness. It's what it looks like when the first cognitive event is precision rather than warmth.`,
          concentrated: `You evaluate before you engage. The assessment starts the moment you walk into a room — not as a decision you make but as a process that has already begun before you've chosen to begin it. You know what's real and what isn't, what holds up and what doesn't, before the conversation has fully started. Others feel assessed in your presence even when nothing has been said and nothing was intended. This is not coldness. It's what it looks like when the first cognitive event is precision rather than warmth.`,
          open: `The evaluation is present, but it doesn't lead. You enter a room and something observes — notes what holds and what doesn't — but that observation doesn't arrive as a completed assessment before engagement has begun. The evaluative quality exists as an undercurrent rather than a first fact. What's different: you can be more present to what's actually in the room before the read closes. The precision functions; it just no longer runs ahead of everything else. The world arrives before the verdict does.`,
          tested: `The world evaluates back. That's the specific texture when authority energy is dominant: the precision runs as it always does, but now something is running a read on you at the same time. An institutional lens — an external standard — operates in parallel with your own. If the external standard is genuine, this sharpens rather than compresses: there's something real to measure against. If it isn't, you know before the conversation has properly started. What changes is that the assessment is no longer one-directional. You are inside a system that is also assessing you, and that fact is part of what you're evaluating.`,
        },
      },

      {
        label: `What you're genuinely good at`,
        bands: [`concentrated`, `balanced`, `open`],
        patterns: [`pure`, `rooted`, `flowing`, `forging`, `tested`],
        priority: { default: 4 },
        text: {
          default: `Cutting to what's actually true, quickly, without sentimentality — not because you don't care but because accuracy is a form of care for you. Building things that last because you genuinely cannot commit to building things that won't. Being the person whose feedback is the most difficult to hear and the most reliable in the room. The things you build tend to still be in use years later, because you could not have made them any other way.`,
          flowing: `When expression energy is dominant, the precision creates rather than just evaluates. What you're genuinely good at shifts toward generative output: producing work that carries that same standard into its execution rather than its assessment of others. The evaluative function is still running — now directed inward, at what's being made. The result is work of unusually high internal consistency: precise in execution, not just in judgment. The critique mechanism becomes craft. The edge finds what it was actually for.`,
        },
      },

      {
        label: `Where you consistently get stuck`,
        bands: [`concentrated`, `balanced`, `open`],
        patterns: [`pure`, `rooted`, `flowing`, `forging`, `tested`],
        priority: { default: 5, concentrated: 5, open: 3 },
        text: {
          default: `The assessment has no warmth channel. The person who came needing to feel less alone gets a solution rather than presence — accurate, often useful, and not what was actually needed in that moment. The care was real. It arrived through the wrong door.

The verdict also becomes load-bearing: once formed, it requires new information to pass through the same evaluative system — which is very good at finding reasons why the new information doesn't change anything. You can hold a position longer than the evidence warrants.`,
          concentrated: `The assessment has no warmth channel. The person who came needing to feel less alone gets a solution rather than presence — accurate, often useful, and not what was actually needed in that moment. The care was real. It arrived through the wrong door.

The verdict also becomes load-bearing: once formed, it requires new information to pass through the same evaluative system that produced the original conclusion — a system that is very good at finding reasons why the new information doesn't change anything. You can hold a position longer than the evidence warrants, and some part of you knows it.`,
          open: `The stuck is different in kind. The assessment runs, but verdicts don't close with the same force — positions stay open longer than they should, and the evaluative capacity can circle a question without landing somewhere that holds. Not paralysis: more like a loop that doesn't quite lock. You arrive at something that seems true, find a reason to reconsider, then return to roughly the same place. The care is real; the precision is real. What's missing is the weight that makes the conclusion feel final.`,
          tested: `The stuck is specific: you know what's right, and the structure wants something else. Not wrong — differently calibrated, optimized for criteria your standard wasn't built around. The temptation is to push the assessment through anyway because it's accurate. The cost is structural: the framework grants standing, and standing determines what gets heard. What holds you back is the gap between maintaining the verdict and operating inside the system that lets you act on it. Most of the time you find a way to manage both. The times you can't are the ones that cost something.`,
        },
      },

      {
        label: `What changes when conditions are right`,
        bands: [`concentrated`, `balanced`, `open`],
        patterns: [`pure`, `rooted`, `flowing`, `forging`, `tested`],
        priority: { default: 3, concentrated: 4 },
        text: {
          default: `The classical principle: raw metal becomes an instrument — shaped for a specific purpose — through contact with fire. The capability was always real. What fire does is specify what the precision is actually for. Without a worthy target, the evaluative apparatus runs on whatever is available. With the right challenge, the precision stops searching and starts producing. The edge was already there. Fire reveals what it was for.`,
          forging: `When wealth energy is dominant, the directing force is already in place — the precision isn't searching for what to aim at, it has a material target. What shifts is the quality of the direction: conditions are right when the target is genuinely worthy, when the system, resource, or outcome being shaped actually requires the standard. The risk: the directing energy carries the evaluative apparatus on its own momentum, toward outcomes that are achievable but not worthy. The question that matters isn't whether there's a target. It's whether the target deserves the edge.`,
        },
      },

      {
        label: `What you rarely admit`,
        bands: [`concentrated`, `balanced`],
        patterns: [`pure`, `rooted`, `flowing`, `forging`, `tested`],
        priority: { default: 4, concentrated: 5 },
        text: {
          default: `That you're often less certain than you appear. The conviction is real. The completeness of the assessment is real. But underneath the settled verdict, there is sometimes a quieter question: whether what the precision is currently aimed at actually deserves it.`,
          concentrated: `That you're often less certain than you appear. The conviction is real. The completeness of the assessment is real. But underneath the settled verdict, there is sometimes a quieter question: whether what the precision is currently aimed at actually deserves it. That question rarely makes it to the surface. It tends to come up at 2 AM.`,
        },
      },

      {
        label: `How you make decisions`,
        bands: [`concentrated`, `balanced`, `open`],
        patterns: [`pure`, `rooted`, `flowing`, `forging`, `tested`],
        priority: { default: 4, concentrated: 4, open: 3 },
        text: {
          default: `Decisions arrive as conclusions. You don't deliberate the way some people do — you build a structural picture, the picture resolves, and the answer appears. What looks like confidence from the outside is usually just completion: the assessment ran, the result is there. What gets harder is the edge case: when the evidence doesn't fully resolve, when the variables conflict, when something that should be straightforward keeps remaining ambiguous.`,
          concentrated: `Decisions arrive as conclusions. You don't deliberate the way some people do — you build a structural picture, the picture resolves, and the answer appears. What looks like confidence from the outside is usually just completion: the assessment ran, the result is there. What gets harder is the edge case: when the evidence doesn't fully resolve, when the variables conflict, when something that should be straightforward keeps remaining ambiguous. That's when the evaluative system runs over the same ground twice, then again. You make fast decisions or you make slow, grinding ones. There isn't much in between.`,
          open: `The structural picture builds, but the resolution hangs. Ambiguity lasts longer; new information reopens what felt settled more easily than it should. This isn't indecision as a character flaw — the evaluative capacity is functioning, just without the finality the concentrated case produces. What helps: external anchors. A deadline. Someone whose judgment you trust. A situation where a decision has to be made and the moment arrives. The conclusion comes when something outside provides the close the internal process didn't.`,
          tested: `Under authority pressure, a second calculation runs alongside the first: what the institutional context will accept, not just what the assessment says is true. For a mind that produces conclusions, holding both simultaneously creates specific friction — the answer is there; the path to it runs through a framework that doesn't always reach the same place. The decisions that stall longest aren't the complex ones. They're the ones where the answer is clear and the institutional route isn't.`,
        },
      },

      {
        label: `How you show up in relationships`,
        bands: [`concentrated`, `balanced`, `open`],
        patterns: [`pure`, `rooted`, `flowing`, `forging`, `tested`],
        priority: { default: 4, concentrated: 4 },
        text: {
          default: `You are more reliable than you are easy. The people who know you well understand that when you give your word, it holds — that your assessment of them is honest even when it's uncomfortable, that your care, once given, is structural and doesn't diminish. What's harder: the relationship that needs reassurance rather than accuracy, warmth rather than honesty, or presence rather than solutions. You deliver real things. Not always the thing that was needed in that specific moment.`,
          flowing: `When expression energy is dominant, there's more outward movement in the relational texture. The reliability is still there, but it arrives alongside something warmer — a tendency to contribute and express rather than assess and hold position. The precision lands differently: through what's made or shared rather than through direct judgment, which tends to create less friction on entry. The shadow shifts too: the output impulse can overproduce, or push expression in a direction the other person wasn't ready for. The care is more visible. The edge is softer at the start.`,
        },
      },

      {
        label: `What you do with pressure`,
        bands: [`concentrated`, `balanced`],
        patterns: [`pure`, `rooted`, `tested`],
        priority: { default: 3, concentrated: 5, concentrated_pure: 5 },
        text: {
          default: `Pressure clarifies. When the environment provides sufficient resistance — a real problem, a worthy challenge, a situation where the precision has something real to cut against — you tend to focus more sharply. The evaluative capacity sharpens. This is the mechanism: fire reveals the edge.`,
          concentrated: `Pressure clarifies. When the environment provides sufficient resistance — a real problem, a worthy challenge, a situation where the precision has something real to cut against — you operate at a different level than ordinary conditions allow. The evaluative capacity sharpens. Focus narrows and deepens simultaneously. This is the mechanism: fire reveals the edge. Without adequate pressure, the precision can turn inward or run on low-stakes targets, producing the same intensity that would serve you under real challenge but creates unnecessary friction where none was required.`,
          tested: `When authority energy is dominant, pressure changes register. It is no longer generative challenge — it's structural friction that requires its own assessment before it can be used. The evaluative capacity is still running, but part of it is now occupied with the source of the pressure itself. Is this authority genuine? Does the standard behind it hold? Under real institutional standing, the precision sharpens — there's something worthy to cut against, and the edge has a target it can respect. Under authority that doesn't hold up, the same capacity turns resistant. The distinction between those two experiences is one you make quickly and rarely revise.`,
        },
      },

      {
        label: `What holds you back without looking like it`,
        bands: [`concentrated`, `balanced`, `open`],
        patterns: [`pure`, `rooted`, `flowing`, `forging`, `tested`],
        priority: { default: 4, concentrated: 5 },
        text: {
          default: `You carry your verdicts. Not forever — but past the point where they serve you. A position formed under real evidence becomes the frame through which new evidence gets screened, and a system good at spotting confirmation becomes good at producing it. The thing that holds you back isn't doubt. It's certainty applied past its expiration.`,
          concentrated: `You carry your verdicts. Not forever — but past the point where they serve you. A position formed under real evidence becomes the frame through which new evidence gets screened, and a system very good at spotting confirmation becomes very good at producing it. This isn't stubbornness as a character flaw. It's structural: the same evaluative rigidity that makes your assessments reliable makes revising them costly. The thing that holds you back isn't doubt. It's certainty applied past its expiration.`,
        },
      },

      {
        label: `What activates the best version of this`,
        bands: [`concentrated`, `balanced`, `open`],
        patterns: [`pure`, `rooted`, `flowing`, `forging`, `tested`],
        priority: { default: 4, concentrated: 4, tested: 4, forging: 4 },
        text: {
          default: `Contact with something genuinely worthy of the precision. A problem hard enough that the evaluative apparatus has to operate at full range. Work where the quality actually matters and the standard is the point — not just accepted but necessary. The version of you that is most alive is the version that has found what the edge is for.`,
          concentrated: `Contact with something genuinely worthy of the precision. A problem hard enough that the evaluative apparatus has to operate at full range. A person capable of meeting the assessment directly without deflecting or collapsing under it. Work where the quality actually matters and the standard is the point — not just accepted but necessary. The version of you that is most alive is the version that has found what the edge is for. The question that recurs, quietly: is what I'm currently aimed at actually worthy of this?`,
          tested: `Recognition from something that actually has standing. Not flattery — an encounter with a structure or person that represents a real standard, one capable of assessing the precision and finding it accurate rather than merely efficient. The specific activation: a problem given by someone whose judgment is real, inside a framework where meeting it means something beyond performance. What turns on is the recognition that the standard being applied from outside and the standard running inside are, for once, pointing in the same direction. That alignment is rarer than it should be. When it arrives, the version of you that operates inside it is the clearest version.`,
          forging: `Material worthy of being shaped. Not just achievable or profitable — genuinely worthy: a system, resource, or situation where the precision has something real to define, improve, or build toward. The specific activation under forging energy: finding that the directing force and the internal standard are aimed at the same thing. When the material is real and the direction is worthy, the output carries a mark that persists. What to watch: the forging pattern can produce the feeling of activation — directed output, visible progress — without the material actually warranting the precision. That version is productive but hollow.`,
        },
      },

      {
        label: `The image and the interior`,
        bands: [`concentrated`, `balanced`],
        patterns: [`pure`, `rooted`, `flowing`, `forging`, `tested`],
        priority: { default: 3, concentrated: 5, concentrated_pure: 5 },
        text: {
          default: `What the room sees: precision and an edge that doesn't easily bend. What is underneath: a softer interior than the presence suggests, running a question the assessment doesn't fully answer — whether the verdict holds, whether the standard is being aimed at the right things. The certainty is partly real and partly structural. Most people close to you eventually sense this.`,
          concentrated: `What the room sees: precision, certainty, an edge that doesn't bend. What is actually underneath: a much softer interior than anyone in the room would guess, running a question that the assessment never quite answers — whether what you've built is actually right, whether the verdict holds, whether the standard is being applied to the right things. The blade in the tongue is protecting something. The certainty is partly real and partly structural armor. You know this. Most people close to you eventually sense it. The gap between the version of you that the room experiences and the version that exists at 2 AM is larger than most people realize.`,
        },
      },

    ],

    // ⚠ DEPRECATED — lifeDomains at stem level is being removed.
    // Domain content belongs in TG_CARD_DATA[tg].domains (see DOC4 §4).
    // The 11 blocks[] above already carry characterological domain content
    // implicitly. Standalone stem lifeDomains is redundant with them.
    // Retained here temporarily for reference during the migration to TG-level
    // domain content. Do not author new stem-level lifeDomains entries.
    lifeDomains: {
      career: {
        name: `The Precision Economy`,
        desc: `You build things that last because you literally cannot build them any other way. Environments that require genuine quality — where the standard is real and the stakes for getting it wrong are visible — are where you produce at your full range. The career challenge is finding work where the precision is the point, not a liability: where being the most rigorous person in the room is valued rather than experienced as difficult. You are most effective when you have a target worthy of the edge.`,
      },
      relationships: {
        name: `The Honest Mirror`,
        desc: `You are more useful than you are easy. The people who receive your honest assessment when they needed it — the ones who weren't coddled but were told something true — often recognize, later, that your care was real even when it arrived through the wrong door. Relationships deepen when the other person can hold your directness without collapsing, and when you can develop warmth delivery alongside accuracy. The capacity for genuine closeness is there. The channel for it requires deliberate building.`,
      },
      wealth: {
        name: `The Long Game`,
        desc: `You build toward quality, not toward speed. Financial patterns reward patience, structure, and the willingness to make clear decisions rather than keep options open — your natural mode, when not pressured into false urgency. The risk: the evaluative rigidity that protects long-term quality can also delay exits past optimal, hold positions past expiry, and mistake comfort with a previous assessment for genuine evidence. The wealth pattern is strong when the decisiveness is active; it stalls when the precision turns defensive.`,
      },
      health: {
        name: `The Structural Body`,
        desc: `The body responds to the same patterns as the mind: precision-heavy, tends toward rigidity under sustained pressure, benefits from intentional softening. Chronic tension lives in the jaw, the shoulders, and the places the evaluation never rests. The health signal to watch: when the assessment is running on the body itself — when the standard that applies to everything else gets applied to how the body performs, looks, or functions. High standards are structural; they don't take days off. The counterbalance is movement that doesn't evaluate, rest that isn't optimized, warmth in the physical sense.`,
      },
    },

    // ═══════════════════════════════════════════════════════════════════
    // SECTION 2: THE FORCE  (user-facing label for Metal: "The Force")
    // Internal label: "Dominant Energy"
    // Characterological layer — what Metal-dominant quality brings
    // to any Ten God expression. App layer combines with TG at runtime.
    // ═══════════════════════════════════════════════════════════════════

    dominantEnergy: {
      label: `The Force`,  // user-facing label (Metal-specific)

      // FREE TEASER — recognition moment + door-opener
      teaser: `When Metal is the dominant force in your chart, precision isn't something you reach for — it's the default state. The assessment runs first. Everything else follows.`,  // [FREE]

      // PRO — full characterological description of Metal dominant quality
      characterDesc: `When Metal is dominant in your chart, precision is not just your nature — it is the atmosphere you operate in. Everything you encounter gets evaluated through a standard that doesn't bend to convenience. This is not a choice you made. The Metal dominant quality is structural: it was already running before preference had a chance to form.

The gift is reliability. When you assess something, the assessment is accurate. When you commit to something, the commitment holds. What you build carries the mark of this quality in ways that outlast the moment it was made.

The cost is also structural. The same quality that produces reliability produces friction: environments, relationships, and opportunities that can't hold the standard experience you as difficult before they experience you as valuable. The precision doesn't modulate for readiness. It arrives at full force.

The productive question is not "how do I soften this" — it's "what is this precision currently aimed at, and does that target actually deserve it?"`,  // [PRO]
    },

    // ═══════════════════════════════════════════════════════════════════
    // SECTION 3: THE EDGE IN MOTION
    // Internal label: "How This Energy Moves"
    // Environmental / operational layer — catalysts, resistance,
    // seasonal calibration, liunian signatures.
    // ═══════════════════════════════════════════════════════════════════

    energy: {
      keywords: ["Defining", "Cutting", "Structural clarity", "Forced decision", "Precision force"],  // [FREE · energy chips]
      what: `庚 is the blade, the axe, the harvest tool — the Yang Metal that cuts, defines, and restructures. Classically described as 金之阳 (the Yang of Metal), it is the energy of forced decision and structural clarity. The classical texts describe 庚 as the force that "cuts away what is complete to reveal what remains." Where Wood grows and Earth accumulates, Metal defines. It is the atmosphere of "what was vague becomes clear, often by force; what was finished gets cut away."`,  // [FREE · DM intro + absent energy card]
      represents: `Major restructuring in environments — organizational, governmental, relational. Forced decisions on matters that were being kept ambiguous. Endings of cycles that had been quietly completed but not yet formally closed. Competitive pressure increasing. The need for decisive action in career and personal matters. Contracts and agreements being written, enforced, or terminated.`,  // [FREE · DM intro + absent energy card]
      liunian: `When 庚 energy enters your luck cycle or annual pillar, the environment demands clarity and decision. Things that were vague get defined — by choice or by circumstance. Relationships and situations that were being kept in comfortable ambiguity get resolved, often sharply. Restructuring happens around you and possibly to you. This period rewards those who can act decisively and punishes those who avoid decisions past the deadline. For charts that benefit from Metal, this brings productive definition and momentum-clearing restructuring; for those already Metal-heavy, the excess can produce conflict, unnecessary cutting of things not yet finished, or a bluntness that damages what it was meant to sharpen.`,  // [PRO]
    },

    manual: {
      concentrated: `The evaluating and cutting force is relentless. Everything gets assessed; everything gets cut to shape. Highly productive for those who benefit from defined edges and clear decisions. Damaging for those who needed more time or more flexibility — the cutting happens regardless of readiness. Classical texts warn 金旺伤木 (strong Metal injures Wood) — when Metal is excessive, it cuts down what was still growing, including what should have been given more time. The danger is cutting too early, deciding too harshly, and removing things that needed more development before they were ready to be shaped.`,  // [FREE · Elemental Nature card]
      open: `The ability to make definitive decisions, set clear limits, and close what is finished becomes genuinely harder. Things that are complete don't get properly ended. Ambiguity lingers past the point where it serves anyone. Relationships and projects that should close continue because there is no cutting force available to bring them to a clean conclusion. The environment feels gentler but more cluttered — less decisive, more unresolved, more drained by the energy required to maintain what should have ended.`,  // [FREE · Elemental Nature card]
      catalyst: `Activate it by making the decision you have been deferring. This energy specifically rewards categorical commitment: the contract signed, the option closed, the position stated clearly, the boundary set. Don't hedge — the productive use of this energy is definitiveness. One clear decision is worth ten careful ones that stay provisional. Outcome: clarity replaces ambiguity and frees up the energy that was being spent maintaining the unresolved situation. What was clouded becomes specific. Direction becomes actionable.`,  // [FREE · teaser  /  PRO · full analysis]
      resistance: `When 庚 energy is creating friction — the cutting force is removing what the chart needed to preserve, or pressing on growth energy in a way that damages rather than shapes it. The corrective is to redirect the precision toward what is actually finished rather than what is merely inconvenient or imperfect. Use the Fire quality (clarity of purpose, warmth of direction) to identify what the precision is actually for — so the blade knows what to spare. Outcome: the force becomes surgical rather than indiscriminate, and what was damaging becomes defining.`,  // [PRO]
    },

    // SEASONAL CALIBRATION  [PRO]
    // Internal field name: seasonalCalibration
    // Source system: 调候用神 from 穷通宝鉴 (distinct from 病药用神 / catalyst system)
    // User-facing label for Metal: "The Forging Season"
    seasonalCalibration: {
      label: `The Forging Season`,   // user-facing label (Metal-specific)
      element: `Fire`,

      // FREE TEASER — 2–3 sentences
      teaser: `There is a specific kind of period that doesn't arrive often but changes everything when it does: the encounter that specifies what the precision is actually for. The capability was always real. What fire reveals is the direction — not the capability, which was already there.`,  // [FREE]

      // PRO — full seasonal calibration reading
      desc: `The seasonal pattern for 庚: Metal is most fully expressed when Fire is present and engaged. Not because Fire adds anything to the structure — the capability was complete before Fire arrived — but because Fire specifies what the structure is an instrument for.

The classical principle from 穷通宝鉴: 金逢火炼方成器 — raw metal becomes a shaped instrument through contact with fire. The transition is from 素材 (formed, capable, unspecified raw material) to 成器 (an instrument defined for a specific purpose). The capability doesn't change. What changes is the direction.

In practice: periods when Fire energy is strong — summer months, Fire-dominant years, relationships or career contexts that carry genuine warmth, urgency, or a target worthy of the edge — bring the specific challenge, person, or context that specifies where the precision should land. Without this contact, the evaluative apparatus remains formed but unspecified: accurate, capable, and running on whatever is available rather than on what it was built for.

Note: 庚 Metal prefers 丁 Fire (the contained flame — the forge, the purposeful heat) over 丙 Fire (the open blaze, the burning sun). The forge shapes. The wildfire consumes. When Fire contact arrives through genuine purpose and directed warmth, the Forging Season is productive. When it arrives through excessive pressure or uncontrolled intensity, the metal loses temper rather than gains it.

The 2 AM version: "I know what I am. I still don't know what I'm for." The Forging Season is when that question gets answered — not once, but each time Fire provides a worthy target.`,  // [PRO]
    },

    // LIUNIAN SIGNATURES  [PRO — Internal sourcing; foundation for Dynamic Energy Blueprint]
    // Structured by life domain. Each entry: what triggers it, what it produces,
    // timing guidance, and classical source for internal verification.
    liunianSignatures: {
      career: {
        trigger: `Fire or Metal year/month bringing competitive pressure or restructuring (庚午, 庚寅, 丙庚 configurations)`,
        event: `Promotion, restructuring, or career-defining decision point. The precision finds an institutional target. Environments that have been unclear about what they want from you define themselves — often through competitive pressure or organizational change that requires someone to make a call. You are the person who makes the call.`,
        timing: `Activates most directly in 庚 and 丁 years; also activated in summer months (巳午未) when Fire energy peaks and provides the Forging Season condition`,
        source: `子平真诠 — 七杀制伏得宜，反为权贵 (Seven Killings properly contained becomes authority); 三命通会 — 庚金得地得势，刀锋所指皆有成`,
      },
      relationships: {
        trigger: `Water or Wood year/month providing contrast element; or a person whose chart brings significant Fire (specificity, warmth, directional pressure)`,
        event: `Relationship dynamic clarification — long-held ambiguities get resolved. A connection that was sustainable but undefined gets defined, sometimes against your preference. A person enters who can receive your directness without deflecting from it. The relationship either deepens structurally or ends with precision. Both outcomes are better than sustained ambiguity.`,
        timing: `Activates most strongly in 癸 (Yin Water) years — depth and sensitivity as complement to the precision; also activated in 甲乙 (Wood) years through the wealth/relationship dynamic`,
        source: `三命通会 — 庚金孤刚，得水而情生 (Rigid Yang Metal, softened by Water, produces feeling); 滴天髓 — 刚柔相推，而生变化`,
      },
      wealth: {
        trigger: `Wood year/month (wealth element for Metal Day Master — Metal controls Wood in the classical 五行 productive cycle)`,
        event: `Income expansion through precision work. A project or commitment that required genuine quality produces measurable return. The evaluation that was invested in building correctly begins paying back. Not windfall wealth — the kind that accumulates from having built something that holds up over time and under examination.`,
        timing: `甲乙 (Wood) years and 寅卯 (Wood branch) months activate the wealth dynamic; productive configurations require balanced Metal strength — excess Metal cutting Wood produces loss rather than gain`,
        source: `子平真诠 — 庚金逢木，才现而有用 (Yang Metal meets Wood — wealth appears and becomes useful); 穷通宝鉴 — Metal-Wood interaction chapters`,
      },
      health: {
        trigger: `Fire dominant periods (巳午未 branch months, 丙丁 stem years) — productive in balance, pressing in excess`,
        event: `Physical energy peaks in aligned Forging Season conditions. In over-Fire configurations, watch for inflammatory pressure or cardiovascular stress (热症 — heat conditions, classical Metal-Fire excess). In balanced Fire contact, the result is purposeful physical energy rather than the chronic muscular tension that accumulates when the assessment has nowhere productive to go.`,
        timing: `Summer months and Fire years — generative when 庚 has adequate Water or Earth grounding; pressing when Fire is excessive and no tempering element is present`,
        source: `穷通宝鉴 — 庚金喜丁火锻炼方成大器，不喜丙火烈焰过旺 (庚 Metal welcomes 丁 Fire's forging; does not welcome 丙 Fire's excess blaze); 五行医学 — 金主肺，过旺则肺气郁结 (Metal governs the lung system; excess produces respiratory tension and suppressed qi)`,
      },
    },

    // ═══════════════════════════════════════════════════════════════════
    // SECTION 4: INTERNAL REFERENCE
    // Not served to users. Synthesis pass context only.
    // ═══════════════════════════════════════════════════════════════════

    psych: {
      bigFive: `High Conscientiousness/Industriousness · Low Agreeableness/Politeness · lower Neuroticism — evaluation as structural default, not as active choice`,
      jungian: `Introverted Thinking (Ti) — the evaluation operates through an internal logical framework that cannot be switched off; runs before social or emotional consideration`,
      attachment: `Dismissive-avoidant — self-sufficient, low dependency; the evaluative default reads as distance but the care is real, arriving through the same precision channel as everything else`,
      shadow: `The Justice Wound — sees the world in Right/Wrong; the bluntness is a defense mechanism for a very soft interior; the blade in the tongue is protecting something that rarely gets shown`,
    },
    archetypes: ["INTJ / ENTJ (MBTI)", "The Outlaw / Maverick (Brand)", "The Hero / Warrior (Jungian)", "Type 1 / Type 8 (Enneagram)", "Aries / Scorpio (Western)", "Manifestor (HD)", "The Warrior (Campbell)"],
  },

  "辛": {
    subtitle: `Quality perceived as temperature — before the question forms · The Definition Impulse (Yin)`,
    chips: ["Discerning", "Aesthetically precise", "Perfectionist", "Exacting", "Distance through refinement"],
    psychCore: {
      phrase: `The Perceptual Perfectionist`,
      desc: `He perceives quality the way others perceive temperature, producing work of genuine distinction at the cost of a standard that never fully stops asking — and his "brilliance" can be a way to keep people at a distance, ensuring they see the polished surface before they can see the flaws he imagines underneath.`,
    },
    blocks: [
      {
        label: `How they experience the world`,
        text: `The Jewel perceives quality the way others perceive temperature — automatically, before thinking about it. Not "is this good?" as a question they ask, but an immediate, pre-verbal sense that something is or isn't genuinely excellent. This applies to work, to ideas, to environments, to people, to the way something was made. The standard is always running. It's not a habit they developed — it's a perceptual structure they were born with, as natural and involuntary as the ability to see color.`,
      },
      {
        label: `What they're genuinely good at`,
        text: `Producing things of genuine distinction because they literally cannot bring themselves to output something they don't fully believe in. Identifying what is genuinely excellent when others would settle for adequate. Building things where the quality is lasting — not impressive on the surface but actually good in the way that holds up over time and under examination. They're also the person who has already noticed the flaw that will become a problem three months from now. They often don't say this immediately. But they've already seen it.`,
      },
      {
        label: `Where they consistently get stuck`,
        text: `The refining doesn't know when to stop. The same faculty that produces excellent work keeps working past the point of completion — improving things that are done, delaying delivery of things that are ready, exhausting the precision on what doesn't need it. There's also a persistent gap between what the Jewel can perceive as possible and what the world tends to offer, creating a background friction that doesn't switch off. In environments that can't meet the standard, this becomes chronic dissatisfaction.`,
      },
      {
        label: `What changes when conditions are right`,
        text: `The Jewel's quality is most fully expressed in settings that can actually receive what it produces. In conditions that genuinely warrant the discernment, what the Jewel produces is something most other approaches simply cannot generate. The practice is protecting access to those conditions rather than applying the full standard uniformly to everything.`,
      },
      {
        label: `What they rarely admit`,
        text: `That the standard they apply to everything, they apply to themselves — and that this is often the hardest part. The gap between what they can perceive as possible in themselves and what they currently are is always visible to them. Which means they are almost never quite satisfied with who they are right now, regardless of what they've achieved.`,
      },
    ],
    psych: {
      bigFive: `High Openness/Aesthetics (quality-seeking, not truth-seeking) · High Conscientiousness/Orderliness · moderate-low Extraversion — healthy vs. maladaptive perfectionism axis`,
      jungian: `Introverted Sensation (Si) + Introverted Feeling (Fi) for aesthetic valuation — discernment is both perceptual (registers quality as temperature) and evaluative (assigns internal value)`,
      attachment: `Fearful-avoidant — deep relational capacity with high threshold; the discernment that identifies excellence also identifies what doesn't meet it`,
      shadow: `The Value/Perfectionism Trap — the need to be "polished" and special; brilliance as a way to keep people at a distance so they don't see the flaws perceived underneath`,
    },
    archetypes: ["ISFJ / INFP (MBTI)", "The Creator (Brand)", "The Aesthetic Anima / Puer (Jungian)", "Type 4 / Type 1 (Enneagram)", "Libra / Virgo (Western)", "Projector (HD)"],
    energy: {
      keywords: [],  // [FREE · energy chips]
      what: `辛 is the refined metal — the jewel after the forge, the precise edge after the grinding. Where 庚 cuts broadly, 辛 evaluates with precision. Classically, 辛 represents metal that has already been shaped — the stage of assessment and recognition that follows the restructuring 庚 began. 穷通宝鉴 notes that 辛 carries an inherent quality of "revealing true value." It is the atmosphere of "what things are actually worth becomes visible; past efforts receive their accurate measure."`,  // [FREE · DM intro + absent energy card]
      represents: `Recognition for past work arriving — both positive recognition and accountability for what was poorly done. The quality of what has been built being assessed honestly. Rewards for genuine excellence. Consequences for corners that were cut. Aesthetic and creative standards becoming more relevant. Fine-tuning and optimization of existing systems producing results.`,  // [FREE · DM intro + absent energy card]
      liunian: `When 辛 energy enters your luck cycle or annual pillar, the environment shifts into evaluation mode. If you have built something genuinely excellent, this is when it gets recognized. If work was shoddy or commitments were not honored, this is when the invoice arrives. Rewards and consequences from the previous cycle become visible. Aesthetic and quality matters take on more relevance — in career, in relationships, in creative work. For charts that benefit from Metal, this is a period of genuine recognition and refinement; for those already Metal-heavy, the excess can produce hypercritical evaluation of everything, perfectionism that prevents completion, or a sharpness that registers as coldness in relationships.`,  // [PRO]
    },
    manual: {
      concentrated: `The evaluative standard is applied to everything simultaneously with no relief. The environment produces either remarkable quality or paralysis — the discernment that should enable excellence instead prevents completion. Relationships and situations that don't meet the implicit standard become genuinely difficult to engage with. Classical texts note that excess 辛 Metal produces rigidity of aesthetic judgment — the jeweler so committed to perfection that no gem ever leaves the workshop. Self-criticism intensifies. The standard keeps moving just past wherever the work has arrived.`,  // [FREE · Elemental Nature card]
      open: `Discernment and quality-sensing are reduced. Things are produced without adequate evaluation. Work looks fine on the surface but doesn't hold up over time or under close examination. The environment loses its ability to distinguish what is genuinely excellent from what merely appears excellent. Recognition of real quality becomes unreliable — people accept substitutes they would have rejected had the discernment been present to notice the difference.`,  // [FREE · Elemental Nature card]
      catalyst: `Activate it by intentionally raising the standard of what you produce and what you accept. This is the period for genuine refinement: the revision that makes the work actually excellent rather than merely presentable, the relationship investment that makes the connection actually deep rather than merely consistent, the decision that reflects what you actually value rather than what is most convenient. Outcome: what is produced in this period carries lasting quality and remains recognizable as excellent well past the moment it was created. Recognition arrives for the refinement specifically.`,  // [FREE · teaser  /  PRO · full analysis]
      resistance: `When 辛 energy is creating friction — the discernment is running at a level that prevents output. The evaluating quality is being used to disqualify rather than develop. The corrective: set the completion criterion before beginning, not during. Decide in advance what "excellent enough to release" looks like, so the discernment has a defined finish line rather than an open-ended mandate to keep refining. Use Water energy (flow, depth, forward movement) to give the precision somewhere to go beyond itself. Outcome: evaluation produces completion rather than endless refinement, and the standard becomes generative rather than paralyzing.`,  // [PRO]
    },
  },

  "壬": {
    subtitle: `More beneath the surface than is ever shown · The Intelligence Impulse (Yang)`,
    chips: ["Expansive", "Systemic", "Depth-witholding", "Untranslatable", "Ambition without edges"],
    psychCore: {
      phrase: `The Submerged Intelligence`,
      desc: `He processes at a depth most people never reach, carrying more beneath the surface than he shows — with a massive ambition and a lack of natural limits that tends to flood rooms or disappear entirely into the deep, never quite landing at the level where he actually operates.`,
    },
    blocks: [
      {
        label: `How they experience the world`,
        text: `The Ocean holds more beneath the surface than it shows. In any exchange, they're processing at a depth that most people in the conversation can't quite follow — holding more variables, more layers, more implications simultaneously than the situation might seem to warrant. Others sense this as intelligence before they can name what they're sensing. The depth is structural, not accumulated through study or experience. It was there before anything else was added to it.`,
      },
      {
        label: `What they're genuinely good at`,
        text: `Understanding how things actually work at the level where they actually operate — not the surface dynamics everyone can see but the real dynamics beneath them. Producing insights that emerge from holding many things at once rather than following a single logical thread, reaching conclusions by routes they can't always fully explain. Going further into complex or difficult territory than most people are willing to go, and returning with something genuinely useful.`,
      },
      {
        label: `Where they consistently get stuck`,
        text: `The depth needs banks or it disperses. Without a specific channel — a specific form, a specific person who can engage at the level where they're actually operating — the intelligence ranges widely without landing anywhere productive. The translation problem is real: bringing what they perceive at depth into forms that people at the surface can receive is a constant, effortful process that never quite finishes.

Most exchanges happen at a shallower level than where the Ocean operates. This produces a persistent sense of being encountered at the surface — of having depth that no one is quite reaching. The response is often to withdraw further rather than simplify, which deepens the problem without resolving it.`,
      },
      {
        label: `What changes when conditions are right`,
        text: `In conditions of genuine exchange — where someone meets them at the level they're operating and gives something back at that level — the Ocean produces things it cannot produce alone. The depth that was ranging without form finds a channel. The intelligence that was present but not landing becomes genuinely useful. These conditions are rare, which is why the Ocean learns to recognize them quickly and protects them once found.`,
      },
      {
        label: `What they rarely admit`,
        text: `How often they're lonely in this specific way: surrounded by capable, intelligent people and still operating in a depth that no one in the room is quite reaching. Not because the people are insufficient. Because the depth is structural — it was always going to be this particular width and this particular distance down, regardless of who was in the room.`,
      },
    ],
    psych: {
      bigFive: `High Openness/Intellect · lower Extraversion Enthusiasm · High Industriousness · variable Neuroticism — competence and autonomy needs extremely high`,
      jungian: `Introverted Thinking (Ti) at vast scale + Introverted Intuition (Ni) — processes comprehensively, holding multiple frameworks simultaneously, generating systemic insight`,
      attachment: `Dismissive-avoidant — the depth that perceives everything can produce emotional distance; holding more internally than gets shown is constitutional, not a choice`,
      shadow: `Emotional Scale — thinks in "waves"; massive ambition but lack of natural limits tends to flood rooms or disappear entirely into the deep; the translation gap between depth and surface is persistent`,
    },
    archetypes: ["INTP / INTJ (MBTI)", "The Sage (Brand)", "The Wise Old Man / Self (Jungian)", "Type 5 / Type 7 (Enneagram)", "Scorpio / Aquarius (Western)", "Reflector / Projector (HD)", "The Threshold Guardian (Campbell)"],
    energy: {
      keywords: [],  // [FREE · energy chips]
      what: `壬 is the great river or open ocean — vast, flowing, carrying everything with it. Classically described as 水之阳 (the Yang of Water), it is the energy of movement, passage, and systemic flow. 三命通会 describes 壬 as the water that "carries and moves all things forward." Where Earth consolidates and Metal defines, Water flows. It is the atmosphere of "things begin moving; opportunity flows in from unexpected directions; boundaries become less fixed."`,  // [FREE · DM intro + absent energy card]
      represents: `Career mobility and movement opportunities. Travel and expansion becoming natural and productive. Intellectual energy and curiosity increasing across the environment. Ambition energizing the social field. Opportunities arriving through flow — through being in the right currents — rather than through direct effort. Also: the potential for flooding, for dispersion, when there is no structure to channel the movement.`,  // [FREE · DM intro + absent energy card]
      liunian: `When 壬 energy enters your luck cycle or annual pillar, things start moving. Career positions shift. Travel opens. Intellectual interests expand. Opportunities flow — sometimes all at once, requiring discernment about which currents to enter. The classical texts note that Yang Water without banks disperses and floods: this energy at its best requires structure and focus to channel productively. For charts that benefit from Water, this is a high-flow period of genuine opportunity and expanding intelligence; for those already Water-heavy, the excess can produce overwhelm, scattered attention, emotional flooding, or ambition that exceeds what the foundations can support.`,  // [PRO]
    },
    manual: {
      concentrated: `Everything flows at once — career mobility, intellectual expansion, ambition, opportunity. High energy. But excess 壬 without structure disperses: the intelligence ranges without landing, the ambition floods available structure, the movement goes in too many directions simultaneously. Classical texts warn 壬水泛滥 (Yang Water flooding) — when the Ocean overflows its banks, it doesn't irrigate the field; it destroys the crop. The environment becomes intellectually stimulating but practically unproductive. Too many currents pull in too many directions and nothing actually advances.`,  // [FREE · Elemental Nature card]
      open: `Systemic intelligence and movement are reduced. Career positions that should be mobile become fixed. Intellectual curiosity narrows. The depth of understanding that comes from holding many frameworks simultaneously — the quality of perceiving the whole system at once — is less accessible. Decisions get made with less information than is available because the capacity to perceive depth is not fully engaged. Life becomes more local, more predictable, and more limited in range than the chart's actual capacity warrants.`,  // [FREE · Elemental Nature card]
      catalyst: `Activate it by entering movement: change the environment, take the trip, begin the intellectual pursuit that has been deferred, apply for the position that requires relocation or expansion. This energy rewards those who enter the current rather than waiting on the bank. Don't try to control the direction — learn to read where the flow is going and position yourself there. Outcome: career mobility arrives naturally when you stop resisting movement. Opportunities flow from directions that stationary positioning would never have reached, often arriving faster than effort-based strategies would have produced.`,  // [FREE · teaser  /  PRO · full analysis]
      resistance: `When 壬 energy is creating friction — flow is running against the chart's structure rather than through it. Too much movement has dispersed what needed to concentrate. The corrective is to introduce Earth energy (consolidation, containment, banks) — not to stop the Water but to give it shape. Identify specifically where the intelligence and energy should land, and build enough structure to allow accumulation rather than flooding. Outcome: movement becomes purposeful flow rather than dispersal, and what was scatter becomes a current going somewhere specific.`,  // [PRO]
    },
  },

  "癸": {
    subtitle: `Knows what is true before it is spoken · The Intelligence Impulse (Yin)`,
    chips: ["Attuned", "Psychically permeable", "Absorbing", "Specifically nourishing", "Lost in own fog"],
    psychCore: {
      phrase: `The Involuntary Empath`,
      desc: `She senses what is true before it is spoken, nourishes what she touches with specific precision, and absorbs the emotional reality of her environment in ways that blur the boundary between what she perceives and what she carries — the most intuitive stem, at risk of feeling so lost in her own fog that she can no longer tell which weather is hers.`,
    },
    blocks: [
      {
        label: `How they experience the world`,
        text: `The Rain senses what's true in a room before anyone says the thing. Not through observation and analysis — the knowing arrives as a felt sense, directly, before any reasoning catches up. They know when something is off, when someone is hurting, when the thing that was said isn't the thing that is actually true. This happens continuously and without their choosing it. Proximity to others is never emotionally neutral for them — they absorb the emotional reality of their environment the way rain absorbs the ground's temperature when it falls.`,
      },
      {
        label: `What they're genuinely good at`,
        text: `Nourishing what they touch in ways that are specific to what that particular person or situation actually needs — not generic care, but calibrated care. Making people feel genuinely known rather than simply seen. Perceiving the thing that's almost true but not quite, and finding the exact words for it that make the person realize it was there all along. Sustaining this across time — their care doesn't diminish when circumstances change. It's structural.`,
      },
      {
        label: `Where they consistently get stuck`,
        text: `The permeability that makes them so perceptive makes it genuinely hard to know whose feeling is whose. The Rain absorbs what it encounters — not from weakness but from how the sensitivity is wired. In difficult or charged environments, they don't just observe the difficulty; they carry it home. The boundary between what they're sensing in others and what they're experiencing themselves can dissolve quietly, often before they've noticed it's happened.

There's also a pattern of caring for others at the level they wish they were cared for — which means the care they give is often more than what returns. Because the giving felt natural, the gap takes a long time to become visible.`,
      },
      {
        label: `What changes when conditions are right`,
        text: `In genuinely reciprocal conditions — where the sensitivity is met with sensitivity, where the nourishment returns at something close to the rate it goes out — what the Rain produces is among the most valuable things available in close relationship. The perception is extraordinary. The care is specific. The knowing is real. Protecting these conditions isn't selfishness. It's maintenance of the instrument.`,
      },
      {
        label: `What they rarely admit`,
        text: `That they absorb far more than they show — and that the accumulation is real and has weight. Over time, in environments that don't return what's given, this becomes something between exhaustion and a kind of grief: the specific sadness of giving something real that doesn't arrive back at the same depth.`,
      },
    ],
    psych: {
      bigFive: `High Neuroticism/Withdrawal (perceptual, not anxious) · High Agreeableness/Compassion · lower Extraversion — Aron's Highly Sensitive Person (HSP) framework is the most precise analog`,
      jungian: `Introverted Intuition (Ni) + Introverted Feeling (Fi) — perceives at depth and cares specifically; the intuition is immediate and uncanny, the care goes where most needed`,
      attachment: `Anxious-preoccupied — permeability means proximity to others is not emotionally neutral; absorbs the emotional state of those around it as a structural fact`,
      shadow: `Psychic Permeability — absorbs the moods of everyone around them; feels lost in their own fog; the most intuitive stem and the most at risk of losing themselves in what they perceive`,
    },
    archetypes: ["INFJ / INFP (MBTI)", "The Innocent / Mystic (Brand)", "The Anima / Sibyl (Jungian)", "Type 2 / Type 4 (Enneagram)", "Pisces / Cancer (Western)", "Reflector (HD)", "The Shape-Shifter (Campbell)"],
    energy: {
      keywords: [],  // [FREE · energy chips]
      what: `癸 is the rain, the mist, the pervasive moisture that seeps through everything without announcing itself. Classically described as the final stem — the culminating, completing water — 癸 represents the energy of endings becoming clear and hidden things rising to the surface. 子平真诠 describes 癸 as water that "nourishes in secret and completes what is unseen." It is the atmosphere of "what was hidden comes to light; what is ending becomes visible; reflection becomes more productive than action."`,  // [FREE · DM intro + absent energy card]
      represents: `Completion of cycles and projects that had been running for a long time. Hidden information surfacing — sometimes gently, sometimes as a surprise. Spiritual and reflective periods becoming more productive than outward action. Intuitive accuracy increasing. Endings that prepare space for what comes next. The body's need for rest and restoration becoming harder to suppress.`,  // [FREE · DM intro + absent energy card]
      liunian: `When 癸 energy enters your luck cycle or annual pillar, things complete and hidden truths surface. What has been quietly building over the previous cycle — good work, neglected maintenance, deferred consequences — tends to become visible. This is a period for honest reflection and honest assessment more than aggressive expansion. Spiritual and inner development tends to deepen. What is ending becomes clear, and what is beginning in the next cycle starts to emerge in the reflection. For charts that benefit from Water, this is a period of genuine completion and deepening wisdom; for those already Water-heavy, the excess can produce emotional absorption, difficulty distinguishing what is perceived from what is actually happening, or exhaustion from carrying what was never fully put down.`,  // [PRO]
    },
    manual: {
      concentrated: `Everything is perceived, everything is felt, everything is known at a level that exceeds what can be processed. The environment or person absorbs more than it can hold without losing its own shape. Classical texts describe 癸水多则迷 (excess 癸 Water creates confusion) — when the Rain becomes a flood of perception, the person can no longer distinguish their own knowing from what they have absorbed from others. Emotional and perceptual exhaustion. The intuition that was extraordinarily accurate becomes overwhelming noise, and the sensitivity that was a gift becomes genuinely difficult to live inside.`,  // [FREE · Elemental Nature card]
      open: `Perceptual intelligence that reads what is actually true in a room — beneath the surface of what people are saying — becomes harder to access. Things are taken at face value. Hidden information doesn't surface. The body's signals are missed. The slow-penetrating quality that reveals what careful reflection produces — the "soaks through to the real layer" quality — is reduced. What is ending doesn't get recognized as ending until it has already ended. Intuitive accuracy is replaced by logical analysis, which is slower and misses the layer below.`,  // [FREE · Elemental Nature card]
      catalyst: `Activate it by creating conditions for genuine perception: quiet, reduced stimulation, time for reflection without agenda. This energy does not respond to force — it responds to receptivity. The insight arrives when you stop trying to produce it and create the space where it can surface naturally. Sit with the question longer than feels productive. The answer arrives at the edge of sleep, in the transition between conversations, in the moment after the analysis stops. Outcome: what was obscure becomes clear. The right answer to a long-standing question arrives not from analysis but from having been genuinely still with it long enough for the perception to form.`,  // [FREE · teaser  /  PRO · full analysis]
      resistance: `When 癸 energy is creating friction — the permeability is absorbing what it should be allowing to pass through. The chart needs more definition (Metal) or more grounding (Earth) to give the perception a stable surface to land on. Channel it by deliberately separating what is perceived from what is chosen: use the intuition as information rather than as reality, and check what is sensed against what is actually observable before acting on it. Create physical or relational structure that filters what enters rather than remaining fully permeable to everything in the environment. Outcome: sensitivity becomes a tool rather than a burden, and what was overwhelm converts into accurate, actionable reading of the actual situation.`,  // [PRO]
    },
  },

};


// ═══════════════════════════════════════════════════════════════════════════
// TG_CARD_DATA
// Full expanded card data for each of the 10 Ten Gods.
// Used for Section 3+ rendering — separate from TG_PROFILES (Layer 2 angles).
//
// ⚠ SCOPE NOTE: TG_CARD_DATA uses FLAT fields only — no variant schema.
// The band/pattern variant system ({bands, patterns, priority, text{}})
// applies exclusively to STEM_CARD_DATA[stem].blocks[].
// Ten God content is fixed per TG — it describes the TG force itself,
// not the DM configuration. DM-specific differentiation happens at the
// compound card layer (DomEnergyTg_Data.js, keyed by domEl_specificTenGod).
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
//     each: {
//       sig: int,        // 1–5 — how strongly this TG governs this domain
//                        // 5=primary · 4=high · 3=moderate · 2=secondary · 1=minimal
//       sig_female: int|null,  // override for female users (六亲 relationship stars)
//       sig_male:   int|null,  // override for male users
//       text: string,   // Pro — domain pattern signature for this TG
//                        // Written as: what recurring situation/pattern does this
//                        // TG keep creating in this domain? NOT a personality desc.
//     }
//     Rendering: show domains at sig ≥ 3 by default; sig ≥ 4 at full prominence.
//     Gender overrides (sig_female/sig_male) are used when user gender is known.
//     Classical 六亲 basis: 官杀 = husband star (female) / authority (all);
//       财 = wife star (male) / wealth (all); 食伤 = children star (female);
//       印 = mother energy (all). See DOC4 §4 reference table.
//   people            → 六亲 description paragraph
//   liunian           → 流年大运 event signatures paragraph
// ═══════════════════════════════════════════════════════════════════════════

// SOURCE: Free + Pro tier · Ten God personality and domain fields
// SOURCE: Free + Pro tier · Ten God personality and domain fields
export const TG_CARD_DATA = {
  "比肩": {
    // The Mirror — Same nature, same register
    name: "The Mirror",  // [INTERNAL · display label]  // [INTERNAL · display label]
    sub: "Same nature, same register",  // [INTERNAL · display label]  // [INTERNAL · display label]
    realmPhrase: `Inner Validation — the ego's private standard`,  // [FREE]  // [FREE]
    realmDesc: `The part of a person that measures everything against their own internal benchmark before anything else. Not comparison with others — comparison with the self. Self-sufficiency is not a strategy here; it is the default operating mode.`,  // [FREE]  // [FREE]
    keywords: ["Self-reliant", "Consistent", "Principled", "Insular", "Complete"],  // [FREE · personality chips]  // [FREE · personality chips]
    gifts: [  // [FREE · first 2–3  /  PRO · all]  // [FREE · first 2–3  /  PRO · all]
      `Unwavering conviction under genuine pressure — the same person in every room, every context, every crisis`,
    `Never loses themselves in what others want; the core standard holds regardless of what the environment offers`,
    `Those who earn entry into real trust receive something exceptionally durable and reliable`,
    ],
    shadows: [  // [FREE · first 1–2  /  PRO · all]  // [FREE · first 1–2  /  PRO · all]
      `The self-referencing loop has no natural interrupt — genuinely difficult to know when wrong`,
    `Loneliness of completeness: surrounded by people and still fundamentally alone unless extraordinary peers are present`,
    `New information that contradicts existing conviction gets processed as irrelevant rather than challenging`,
    ],
    decision: `Self-referencing — trusts their own read above all consensus. Filters new information through existing conviction. Decides quickly but resists revising. The weakness is not arrogance but structure: the system is complete enough that discrepant input doesn't create internal urgency to reconsider.`,  // [PRO]  // [PRO]
    communication: `Direct, consistent, doesn't modulate the message for different audiences. What they say is what they think. No performance in it — which can read as cold to those expecting social calibration.`,  // [PRO]  // [PRO]
    hidden: `Beneath the self-sufficiency is a deep need for peers who are genuinely equal — not admirers, not subordinates, but someone who can actually meet them at the level they operate. The specific loneliness is not about being alone. It is about being surrounded by people who engage with the surface rather than the depth.`,  // [PRO]  // [PRO]
    domains: {  // [PRO]  // [PRO]
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
    people: `比肩 classically represents siblings and same-status peers — people who share your nature and move in your territory. In the broader life: close friends who genuinely get it without explanation, the rare equals who don't defer. In less healthy expressions: the peers whose similarity makes them competitors for the same recognition.`,  // [PRO]  // [PRO]
    liunian: `A 比肩 year or period brings increased peer competition, resource contention with those most similar, and pressure on the established identity. For charts that benefit: confidence, clarity of self, decisive independent action. For charts where 比肩 is resistance: conflict with equals, loss through competition, an identity challenge that forces honest self-examination.`,  // [PRO]  // [PRO]
  },

  "劫财": {
    // The Rival — Same nature, different register
    name: "The Rival",  // [INTERNAL · display label]  // [INTERNAL · display label]
    sub: "Same nature, different register",  // [INTERNAL · display label]  // [INTERNAL · display label]
    realmPhrase: `Social Performance — the ego measured against its nearest competition`,  // [FREE]  // [FREE]
    realmDesc: `The part of a person that measures itself against others occupying the same territory. Not the internal standard of 比肩 but the comparative ego — what am I relative to the people most like me? The reference point is always lateral.`,  // [FREE]  // [FREE]
    keywords: ["Competitive", "Comparative", "Socially driven", "Resource-aware", "Sharp"],  // [FREE · personality chips]  // [FREE · personality chips]
    gifts: [  // [FREE · first 2–3  /  PRO · all]  // [FREE · first 2–3  /  PRO · all]
      `Genuine clarity about where the actual edges of capability lie — real peers reveal real limits`,
    `The competitive register sharpens rather than diminishes when healthy: you become more precisely what you are through the comparison`,
    `Socially intelligent in reading where they stand relative to those who actually matter to them`,
    ],
    shadows: [  // [FREE · first 1–2  /  PRO · all]  // [FREE · first 1–2  /  PRO · all]
      `Resources spent measuring rather than building — the comparison can become the point`,
    `Collaboration with the people most similar is structurally the hardest relationship to sustain`,
    `Validation from genuine peers lands harder than victory over those who don't understand the territory`,
    ],
    decision: `Comparative — calibrates against what similar others are doing or have achieved before committing. Lateral reference is the primary frame. Can delay decisions while reading the field.`,  // [PRO]  // [PRO]
    communication: `Asserts position, especially within shared territory. Socially aware and reads status accurately. Can be competitive in delivery without intending aggression — the natural register within the domain is assertion rather than collaboration.`,  // [PRO]  // [PRO]
    hidden: `Underneath the rivalry is a specific, rarely admitted desire: genuine recognition from exactly the people most like them. Not recognition from outsiders — that lands hollow. The need is for the specific peer who understands what the achievement cost to acknowledge it as real.`,  // [PRO]  // [PRO]
    domains: {  // [PRO]  // [PRO]
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
    people: `劫财 classically represents brothers and sisters of a different nature, rivals, and those who share resources. In modern life: business partners who become competitors, colleagues in the same domain, the sibling whose achievements are the reference point.`,  // [PRO]  // [PRO]
    liunian: `A 劫财 year or period intensifies competition from peers, brings resource loss risks through rivalry, and activates the comparative drive. For charts that benefit: the competition produces genuine performance — this can be a defining year. For charts where 劫财 is resistance: betrayal by those most similar, loss of shared resources.`,  // [PRO]  // [PRO]
  },

  "食神": {
    // The Flow — Same-polarity output — giving that feels like being
    name: "The Flow",  // [INTERNAL · display label]  // [INTERNAL · display label]
    sub: "Same-polarity output — giving that feels like being",  // [INTERNAL · display label]  // [INTERNAL · display label]
    realmPhrase: `Authentic Expression — output that happens before strategy`,  // [FREE]  // [FREE]
    realmDesc: `食神吐秀 (the Food God expresses elegance): refined Qi moving outward without announcement. What flows out when the self is fully itself — not the assertion of 伤官, not the pressure of 七杀, just the natural emergence of what the DM generates when nothing is in the way.`,  // [FREE]  // [FREE]
    keywords: ["Generous", "Expressive", "Effortless", "Non-assertive", "Pleasurable"],  // [FREE · personality chips]  // [FREE · personality chips]
    gifts: [  // [FREE · first 2–3  /  PRO · all]  // [FREE · first 2–3  /  PRO · all]
      `Output arrives without effort or announcement — what they produce has the quality of something that simply happened rather than something that was made`,
    `Natural elegance that others experience as a gift rather than a performance; the giving doesn't register as giving from the inside`,
    `Able to sustain creative or expressive work over time in ways that more effortful people genuinely cannot`,
    ],
    shadows: [  // [FREE · first 1–2  /  PRO · all]  // [FREE · first 1–2  /  PRO · all]
      `The cost of giving is invisible from the inside — depletion accumulates without warning and arrives fully formed`,
    `食神过旺则泄身太过: the over-extension into what feels natural depletes the foundation without signaling beforehand`,
    `Tends to undervalue what flows naturally — because it doesn't feel like work, it's often undersold or given away`,
    ],
    decision: `Instinct-led, trusts the natural process. Decides when it feels ready rather than when the moment is optimal. Resistant to external deadlines on creative or expressive work.`,  // [PRO]  // [PRO]
    communication: `Communicates naturally without performing the message — what they say emerges from being fully themselves rather than from strategy. Warm, generative, unforced. Others often feel genuinely nourished by the exchange.`,  // [PRO]  // [PRO]
    hidden: `Beneath the natural generosity is often a specific unawareness that giving is happening at all — the output doesn't register as effort, which means neither does the depletion. By the time they feel genuinely exhausted, they've been running on reserves for longer than anyone knew.`,  // [PRO]  // [PRO]
    domains: {  // [PRO]  // [PRO]
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
    people: `食神 classically represents children (especially for female DMs) and the people who receive the natural output. In modern life: mentees nourished without effort, creative collaborators who receive what flows naturally. Also: the physical pleasures of life — food, art, rest, anything that produces without asserting.`,  // [PRO]  // [PRO]
    liunian: `A 食神 year or period brings creative flourishing, ease, genuine pleasure, and opportunities for authentic expression. For aligned charts: a genuinely good period — one of the few kinds of years where things feel right. For excess 食神: over-extension, depletion, difficulty stopping.`,  // [PRO]  // [PRO]
  },

  "伤官": {
    // The Edge — Cross-polarity output — brilliance made of what it meets
    name: "The Edge",  // [INTERNAL · display label]  // [INTERNAL · display label]
    sub: "Cross-polarity output — brilliance made of what it meets",  // [INTERNAL · display label]  // [INTERNAL · display label]
    realmPhrase: `Rebellion Logic — output that structurally exceeds its container`,  // [FREE]  // [FREE]
    realmDesc: `伤官者，聪明秀气太过: "Hurting Officer people are excessively brilliant and refined." The excess is structural, not attitudinal — the intelligence genuinely exceeds the frameworks available to receive it, so it pushes against them as a side effect of expressing itself.`,  // [FREE]  // [FREE]
    keywords: ["Brilliant", "Subversive", "Friction-constituted", "Non-conformist", "Ahead"],  // [FREE · personality chips]  // [FREE · personality chips]
    gifts: [  // [FREE · first 2–3  /  PRO · all]  // [FREE · first 2–3  /  PRO · all]
      `Genuine structural advancement — the work moves something forward in ways people working within convention cannot produce`,
    `The brilliance is sharpened by exactly what resists it; the friction is part of the mechanism that makes the output what it is`,
    `Authentic creative authority that comes from having actually exceeded the available framework`,
    ],
    shadows: [  // [FREE · first 1–2  /  PRO · all]  // [FREE · first 1–2  /  PRO · all]
      `伤官见官，为祸百端: in structural tension with any authority that tries to evaluate the output by conventional standards`,
    `Self-destruction when the output has nowhere adequate to land: the force that produces breakthroughs turns inward`,
    `The brilliance and the difficulty are inseparable — improving the one without the other is not available`,
    ],
    decision: `Challenges assumptions before deciding. Tends to decide against the conventional option not from perversity but because the conventional option is structurally insufficient. Independent of precedent.`,  // [PRO]  // [PRO]
    communication: `Communicates with brilliance that challenges — the message often disrupts the framework of the listener as a side effect. 伤官见官 describes the specific friction with authority figures: the output challenges the framework regardless of whether challenge was intended.`,  // [PRO]  // [PRO]
    hidden: `The specific interior cost that goes mostly unspoken: knowing you've just broken something that can't be unbroken — in a conversation, in a relationship — and not being certain whether that was necessary or excessive. The brilliance and the destruction arrived together.`,  // [PRO]  // [PRO]
    domains: {  // [PRO]  // [PRO]
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
    people: `伤官 classically represents children with challenging or expressive natures, creative collaborators who push the work further through friction, and the authority figures who constitute the structural resistance. Also: the person whose work the institution can't quite fit into existing categories.`,  // [PRO]  // [PRO]
    liunian: `A 伤官 year or period brings creative breakthroughs, authority conflicts, and moments of genuine originality. For aligned charts: a significant output year — the defining work of a period often emerges during 伤官 activations. For charts where it creates friction: things said publicly that can't be unsaid.`,  // [PRO]  // [PRO]
  },

  "偏财": {
    // The Field — Same-polarity wealth — wide-ranging engagement
    name: "The Field",  // [INTERNAL · display label]  // [INTERNAL · display label]
    sub: "Same-polarity wealth — wide-ranging engagement",  // [INTERNAL · display label]  // [INTERNAL · display label]
    realmPhrase: `Risk/Opportunistic Vision — seeing potential before others recognize it`,  // [FREE]  // [FREE]
    realmDesc: `The part of a person that sees potential in everything and moves toward it broadly. Not the focused accumulation of 正财 but the ranging appetite that touches many things and activates what others walked past.`,  // [FREE]  // [FREE]
    keywords: ["Generous", "Opportunity-sensing", "Wide-ranging", "Socially fluid", "Diffuse"],  // [FREE · personality chips]  // [FREE · personality chips]
    gifts: [  // [FREE · first 2–3  /  PRO · all]  // [FREE · first 2–3  /  PRO · all]
      `Instinctive sense for potential before it's visible — the read on what's worth engaging arrives before the evidence does`,
    `Natural abundance that activates things and people in its vicinity; others find opportunities and connections through proximity`,
    `Genuine openness to what's possible across an unusually wide field`,
    ],
    shadows: [  // [FREE · first 1–2  /  PRO · all]  // [FREE · first 1–2  /  PRO · all]
      `What is touched broadly is never fully owned — the breadth that is the gift is also what prevents full possession`,
    `Activates without consolidating: builds real things that other people end up keeping`,
    `What is never fully possessed can be lost without the person fully registering what they had`,
    ],
    decision: `Opportunity-seeking, evaluates broad options simultaneously rather than sequentially. Makes decisions quickly based on intuitive read of potential. Tends toward distributed risk. Doesn't overanalyze.`,  // [PRO]  // [PRO]
    communication: `Casual, broad, comfortable across many registers and audiences. The social intelligence is wide rather than deep. Can create genuine connection quickly across very different kinds of people.`,  // [PRO]  // [PRO]
    hidden: `The interior truth that rarely gets named: everything feels equally interesting and equally possible, which is both the gift and the structural trap. The inability to fully invest in any one thing is not indecision — it is the nature of the ranging quality.`,  // [PRO]  // [PRO]
    domains: {  // [PRO]  // [PRO]
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
    people: `偏财 classically represents the father (for male DMs), indirect wealth sources, and casual romantic relationships. In modern life: the broader social field — many people are activated by the 偏财 person's presence, fewer are deeply held. Also: business contacts who bring opportunity without lasting partnership.`,  // [PRO]  // [PRO]
    liunian: `A 偏财 year or period brings unexpected financial opportunities, father-related events, expanded social networks, and activation of the opportunity field. For aligned charts: genuine windfalls, new income streams. For charts where 偏财 is friction: scattered resources, father health issues, overcommitment.`,  // [PRO]  // [PRO]
  },

  "正财": {
    // The Harvest — Cross-polarity wealth — methodical, directed acquisition
    name: "The Harvest",  // [INTERNAL · display label]  // [INTERNAL · display label]
    sub: "Cross-polarity wealth — methodical, directed acquisition",  // [INTERNAL · display label]  // [INTERNAL · display label]
    realmPhrase: `Wealth/Security Anxiety — the standard applied to what is held`,  // [FREE]  // [FREE]
    realmDesc: `The part of a person that evaluates what it has built and whether it is worthy of the standard applied in building it. Not greed — a specific relationship to security in which the evaluating apparatus that produced the quality also asks whether the quality is sufficient.`,  // [FREE]  // [FREE]
    keywords: ["Methodical", "Disciplined", "Earned", "Evaluative", "Security-oriented"],  // [FREE · personality chips]  // [FREE · personality chips]
    gifts: [  // [FREE · first 2–3  /  PRO · all]  // [FREE · first 2–3  /  PRO · all]
      `Real, earned results that hold up over time — the relationship between effort and outcome is clear and verifiable`,
    `Unusual reliability: once committed, follows through across time without requiring re-motivation`,
    `The precision that builds also reveals — what was built is what was actually intended, without shortcuts appearing later`,
    ],
    shadows: [  // [FREE · first 1–2  /  PRO · all]  // [FREE · first 1–2  /  PRO · all]
      `The evaluative apparatus doesn't know when to stop — applies the same standard to relationships that it applies to financial decisions`,
    `正财 precision can turn on what it values: asking whether a relationship is worthy of the standard used to build it`,
    `The security anxiety doesn't resolve at achievement — the standard moves just past wherever the building has arrived`,
    ],
    decision: `Methodical, researches fully, conservative risk profile. Needs the evidence before committing. Once committed, sees it through with unusual reliability. The specific weakness: over-research on decisions that required timely commitment.`,  // [PRO]  // [PRO]
    communication: `Precise and considered — the specific thing said is the specific thing meant. Doesn't expand unnecessarily. Finds vague or performative communication genuinely frustrating because it creates ambiguity.`,  // [PRO]  // [PRO]
    hidden: `Beneath the methodical exterior is a specific quiet anxiety: the fear that what has been built carefully is somehow still not enough to be safe, not worthy enough to be kept. The standard that produced the quality is also what makes resting in the result genuinely difficult.`,  // [PRO]  // [PRO]
    domains: {  // [PRO]  // [PRO]
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
    people: `正财 classically represents the spouse (for male DMs) and the primary committed relationship. Also: direct income sources, reliable employers and providers, the institutions that pay fairly for demonstrated work.`,  // [PRO]  // [PRO]
    liunian: `A 正财 year or period brings financial consolidation, committed relationship events (marriage, formal partnership), and opportunities to harvest what was methodically built. For aligned charts: genuine stability and tangible reward. For charts where 正财 creates friction: over-control of resources, relationship strain from applying the evaluating standard too strictly.`,  // [PRO]  // [PRO]
  },

  "七杀": {
    // The Trial — Same-polarity authority — pressure that doesn't grant permission
    name: "The Trial",  // [INTERNAL · display label]  // [INTERNAL · display label]
    sub: "Same-polarity authority — pressure that doesn't grant permission",  // [INTERNAL · display label]  // [INTERNAL · display label]
    realmPhrase: `Survival Instinct / Trauma / Resilience — forged, not developed`,  // [FREE]  // [FREE]
    realmDesc: `七杀制伏得宜，反为权贵: "When Seven Killings are properly channeled, they produce genuine authority." The force that presses against the DM without moderation, without asking whether it is ready. What gets produced — when resources are adequate — is character that could only have come from that specific pressure.`,  // [FREE]  // [FREE]
    keywords: ["Forged", "Resilient", "Intense", "Non-permissioned", "Bifurcated"],  // [FREE · personality chips]  // [FREE · personality chips]
    gifts: [  // [FREE · first 2–3  /  PRO · all]  // [FREE · first 2–3  /  PRO · all]
      `What others carry as developed virtue, this person carries as the residue of surviving something that did not offer the option to fail gracefully`,
    `The character that only sustained adversarial pressure without permission produces — it cannot be imitated by those who haven't been through the equivalent`,
    `Genuine authority that others recognize as real precisely because it was tested rather than credentialed`,
    ],
    shadows: [  // [FREE · first 1–2  /  PRO · all]  // [FREE · first 1–2  /  PRO · all]
      `制者必须有力: the channeling requires significant resources — without them, the same force that refines damages`,
    `Does not moderate itself, does not ask whether the moment warrants the full force`,
    `The bifurcation is genuine: not a spectrum, not a middle outcome — the pressure either forges or breaks`,
    ],
    decision: `Decides under pressure — either sharply decisive when resources are adequate, or paralyzed when they're not. Doesn't hedge well; tends toward all-or-nothing commitment.`,  // [PRO]  // [PRO]
    communication: `Direct, unmoderated, doesn't soften delivery. The message arrives at full force. Says the thing without waiting for the listener to be ready for it.`,  // [PRO]  // [PRO]
    hidden: `What rarely gets named: the quiet exhaustion of having been forged and knowing exactly what it cost. Not pride in the resilience — something quieter, closer to grief about what was required to become this. The question that runs beneath the authority: whether what was built through surviving was worth what was lost in the surviving.`,  // [PRO]  // [PRO]
    domains: {  // [PRO]  // [PRO]
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
    people: `七杀 classically for female DMs represents husband and romantic partners. More broadly: bosses who don't grant permission, adversaries, challenging authority figures who test without validating, the people who shaped you through pressure rather than warmth.`,  // [PRO]  // [PRO]
    liunian: `A 七杀 year or period brings adversarial pressure, significant challenges, potential crises — and, when resources are adequate, genuine breakthroughs and real authority. For aligned charts with adequate resources: the forge produces something remarkable. For depleted charts: breakdown, burnout, forced confrontations that leave lasting damage.`,  // [PRO]  // [PRO]
  },

  "正官": {
    // The Standard — Cross-polarity authority — framework-mediated pressure
    name: "The Standard",  // [INTERNAL · display label]  // [INTERNAL · display label]
    sub: "Cross-polarity authority — framework-mediated pressure",  // [INTERNAL · display label]  // [INTERNAL · display label]
    realmPhrase: `Social Armor / Good Student Complex — character shaped by chosen structure`,  // [FREE]  // [FREE]
    realmDesc: `正官端正，主人沉稳，名声好，规则意识强: "Direct Officer upright — the person is calm and settled, with good reputation and strong rule-consciousness." The part of a person that operates within frameworks it has chosen to endorse — not because it has to, but because it has decided the framework is legitimate.`,  // [FREE]  // [FREE]
    keywords: ["Principled", "Framework-guided", "Reputation-conscious", "Structured", "Institutional"],  // [FREE · personality chips]  // [FREE · personality chips]
    gifts: [  // [FREE · first 2–3  /  PRO · all]  // [FREE · first 2–3  /  PRO · all]
      `Character shaped by legitimate structure has a specific reliability and orientation — it knows what it's building toward and the framework tells it when it's arrived`,
    `Recognition from institutions carries genuine weight because it was granted by something the person actually respected`,
    `Operates with unusual integrity within chosen frameworks — the rules are real, and so is the character that builds within them`,
    ],
    shadows: [  // [FREE · first 1–2  /  PRO · all]  // [FREE · first 1–2  /  PRO · all]
      `官轻则贵，官重则压: light structure enables, heavy structure suppresses — when the framework becomes excessive, character shaped by endorsed structure becomes shaped by obligation`,
    `When the framework reveals itself as unworthy, the disorientation is larger than the situation warrants from outside`,
    `The "good student" who did everything right and discovered that institutions don't always work the way their stated rules suggest`,
    ],
    decision: `Framework-guided — needs a legitimate basis for the decision before committing. Consults precedent, institutional norms, and the opinions of respected authorities. The specific weakness: analysis paralysis when the legitimate framework is unclear or absent.`,  // [PRO]  // [PRO]
    communication: `Formal, structured, respects the protocol of communication within the relationship. Carries the weight of someone who means what they say within a framework that holds both parties. Doesn't freelance outside agreed terms.`,  // [PRO]  // [PRO]
    hidden: `The specific interior vulnerability: the person who genuinely followed the rules, who invested years in becoming excellent within the framework, who believed the institution would recognize this — and then discovered that what was stated and what was practiced were not the same thing.`,  // [PRO]  // [PRO]
    domains: {  // [PRO]  // [PRO]
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
    people: `正官 classically for female DMs represents the legitimate husband and primary partnership. More broadly: official mentors, respected authorities who grant genuine recognition, institutional endorsers. The teachers who noticed you. The managers who advocated for you within the system.`,  // [PRO]  // [PRO]
    liunian: `A 正官 year or period brings recognition from institutions, career appointments, public reputation events, marriage or formal partnership opportunities. For aligned charts: a period of genuine advancement within chosen frameworks. For charts where 正官 is unfavorable: over-regulation, the framework becoming a constraint.`,  // [PRO]  // [PRO]
  },

  "偏印": {
    // The Well — Same-polarity resource — nourishment that deepens without redirecting
    name: "The Well",  // [INTERNAL · display label]  // [INTERNAL · display label]
    sub: "Same-polarity resource — nourishment that deepens without redirecting",  // [INTERNAL · display label]  // [INTERNAL · display label]
    realmPhrase: `Niche/Occult Intelligence — depth in what others don't access`,  // [FREE]  // [FREE]
    realmDesc: `滋生有源 (nourishment with a continuous source). The part of a person that draws from a deep, unconventional source that others don't have access to or even know exists. The backing that sustains and deepens without redirecting.`,  // [FREE]  // [FREE]
    keywords: ["Deep", "Unconventional", "Niche", "Self-sustaining", "Psychically aware"],  // [FREE · personality chips]  // [FREE · personality chips]
    gifts: [  // [FREE · first 2–3  /  PRO · all]  // [FREE · first 2–3  /  PRO · all]
      `Extraordinary depth in their particular domain because the sustaining source has been deepening it for a long time — a depth others can't replicate through effort alone`,
    `A groundedness that doesn't feel like something worked for; access to frames and knowledge that the mainstream hasn't codified`,
    `Most useful and most trusted precisely where others lack the depth — the specific niche where the unconventional backing produced something rare`,
    ],
    shadows: [  // [FREE · first 1–2  /  PRO · all]  // [FREE · first 1–2  /  PRO · all]
      `The backing never required building the capacity to sustain without it — sudden loss of the source produces disproportionate disorientation`,
    `Depth without direction: the well deepens but without opening onto new territory`,
    `印多夺食: excess resource smothers output — the nourishment that enables can, in excess, prevent the independent expression of the capability it enabled`,
    ],
    decision: `Pattern-based, draws on established frameworks from the unconventional source rather than conventional wisdom. Slow to adopt new frameworks because the existing one has been refined over a long time.`,  // [PRO]  // [PRO]
    communication: `Withheld, communicates through depth rather than volume. Prefers one-on-one over group settings. What is shared tends to be specific and unusual enough that it doesn't land easily in general audiences.`,  // [PRO]  // [PRO]
    hidden: `Knowing things others don't know, from sources others don't access, in ways that are genuinely difficult to explain or legitimize. The shadow: when the source is removed, discovering that the capacity to generate the depth independently was never fully developed. What makes this structurally different from 正印: same-polarity nourishment deepens what is already there without opening it toward something genuinely new. The well gets deeper. The territory stays the same.`,  // [PRO]  // [PRO]
    domains: {  // [PRO]  // [PRO]
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
    people: `偏印 classically represents step-parent or unconventional mentor; older figures who provide support without conventional relationship structure. In modern life: alternative teachers, mentors from unusual traditions, esoteric knowledge communities.`,  // [PRO]  // [PRO]
    liunian: `A 偏印 year or period brings deep learning, withdrawal from mainstream activity, sustained engagement with unconventional knowledge, and strong support from unusual sources. For aligned charts: a genuinely nourishing and deepening period. For charts where 偏印 creates friction: over-reliance on past patterns, blocked output.`,  // [PRO]  // [PRO]
  },

  "正印": {
    // The Root — Cross-polarity resource — nourishment that sustains and opens
    name: "The Root",  // [INTERNAL · display label]  // [INTERNAL · display label]
    sub: "Cross-polarity resource — nourishment that sustains and opens",  // [INTERNAL · display label]  // [INTERNAL · display label]
    realmPhrase: `Support System / Mother Wound — backed and pointed`,  // [FREE]  // [FREE]
    realmDesc: `Bowlby's secure base in its most developmental form: the base that enables exploration by providing both support and direction simultaneously. The part of a person shaped by backing that came with a destination — not just sustained, but sustained AND pointed toward something.`,  // [FREE]  // [FREE]
    keywords: ["Grounded", "Mentored", "Directionally shaped", "Supported", "Purpose-oriented"],  // [FREE · personality chips]  // [FREE · personality chips]
    gifts: [  // [FREE · first 2–3  /  PRO · all]  // [FREE · first 2–3  /  PRO · all]
      `Character that feels simultaneously grounded and purposeful — rooted and reaching at the same time, which is genuinely rare`,
    `Knows what it's building toward, not just that it's building; the direction arrived with the support and feels genuinely internalized`,
    `The quiet confidence that comes from having had genuine backing — not asserted, not performed, simply present in how the person moves`,
    ],
    shadows: [  // [FREE · first 1–2  /  PRO · all]  // [FREE · first 1–2  /  PRO · all]
      `The direction given with the backing can become the only direction known — the reach grew where the nourishment pointed and may not know how to self-generate direction without it`,
    `The backing may have served the source's vision as much as the recipient's genuine calling`,
    `Loss of the supporting structure produces disorientation disproportionate to the situation`,
    ],
    decision: `Seeks guidance before deciding on significant choices. Finds genuine confidence within a decision framework provided by someone or something trusted. The weakness: difficulty accessing confidence when the backing structure is absent.`,  // [PRO]  // [PRO]
    communication: `Directional — tends to communicate in ways that include where things should go next. Feels most competent communicating from a position of endorsed knowledge. Less comfortable with pure improvisation.`,  // [PRO]  // [PRO]
    hidden: `The question that runs beneath everything: is what I am building toward actually mine, or did the backing shape me toward its vision? What makes this structurally different from 偏印: cross-polarity nourishment sustains AND opens — it doesn't just feed what exists, it points toward what doesn't yet exist. The direction that opened with the backing — was it genuinely toward you, or toward what the source needed you to become?`,  // [PRO]  // [PRO]
    domains: {  // [PRO]  // [PRO]
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
    people: `正印 classically represents mother and maternal figures, formal mentors, and legitimate institutional backers. More broadly: the teachers who believed in you AND told you where to go with it; the institutions that accepted you and shaped your direction.`,  // [PRO]  // [PRO]
    liunian: `A 正印 year or period brings mentorship opportunities, institutional recognition, educational advancement, and periods of genuine backing. Also: mother-related events, significant shifts in the primary support structure. For aligned charts: a period of genuine development within supported, directional growth. For charts where 正印 creates friction: direction given with the backing becoming a constraint.`,  // [PRO]  // [PRO]
  },

};


// ═══════════════════════════════════════════════════════════════════════════
// CLASSICAL_STEM_ANCHORS
// Classical source principles for all 10 Day Master stems.
// Source: 穷通宝鉴, 三命通会, 子平真诠, 滴天髓 — see DOC3 §2 for derivations.
//
// Usage: Inject into buildPersonaPrompt() and buildReadingPrompt() in
//   batchGenerate.js. Extends and replaces the partial STEM_CLASSICAL
//   constant in that file (庚, 辛, 甲, 戊, 壬 are already there; 乙, 丙, 丁,
//   己, 癸 are new).
//
// Hard ceiling per DOC3: max 3 behavioral claims per stem-specific entry.
//   Each 'derivation' field should yield no more than 3 reading claims.
// ═══════════════════════════════════════════════════════════════════════════

// [INTERNAL · verification only — never served to users]
// [INTERNAL · verification only — never served to users]
export const CLASSICAL_STEM_ANCHORS = {

  // ── Yang Wood ────────────────────────────────────────────────────────────
  "甲": {
    principle:   "甲木喜庚金克制，方能成材",
    translation: "Yang Wood welcomes the shaping force of 庚 Metal — then it becomes timber with form and purpose.",
    source:      "穷通宝鉴 / 三命通会 十干体象",
    derivation:  "原木 (raw growth) vs. 成材 (timber with defined form). The shaping force does not stop the growth — it defines what the growth consolidates into. Without it, 甲 growth spreads rather than holds: genuine reach without the force that converts reaching into something with form. The twoAM: 'I have been growing toward something real for a long time. I haven't yet found the force that defines what it becomes.'",
    ceiling:     3,
  },

  // ── Yin Wood ─────────────────────────────────────────────────────────────
  "乙": {
    principle:   "乙木至柔，逢难则屈，遇机则伸",
    translation: "乙 Wood is supremely yielding — it bends under difficulty and extends when opportunity opens.",
    source:      "三命通会 十干体象",
    derivation:  "The flexibility is strategic, not passive. 乙 always knows the destination; it is the route that adapts. The classical image: the vine that reaches every gap the oak cannot reach — neither less capable nor less directional, but operating by a different mechanism entirely. Shadow: the vine that bends to every surface eventually has no fixed position of its own. The navigation that survives everything can lose the sense of what it was navigating toward.",
    ceiling:     2,
  },

  // ── Yang Fire ────────────────────────────────────────────────────────────
  "丙": {
    principle:   "丙火乃太阳之火，普照万物，无所偏私",
    translation: "Yang Fire is the fire of the great sun — it illuminates ten thousand things without choosing which ones.",
    source:      "三命通会 十干体象 / 穷通宝鉴",
    derivation:  "The warmth does not choose what it reaches. Illumination is structural, not selective. The gift and the cost are the same thing: the giving is genuine and automatic, which means neither the giving nor the depletion registers as a choice from the inside. The interior question: being the source of warmth for everyone in a room and then finding oneself genuinely alone at the end of the gathering.",
    ceiling:     2,
  },

  // ── Yin Fire ─────────────────────────────────────────────────────────────
  "丁": {
    principle:   "丁火内蕴，有时如灯烛之明，有时如炉中炼金之火",
    translation: "丁 Fire is contained within — at times the clarity of the lamp, at times the refining forge for precious metal.",
    source:      "三命通会 十干体象 / 穷通宝鉴",
    derivation:  "丁 illuminates completely what it has chosen to illuminate. What falls outside the focused beam is genuinely dark for this person — not hidden, simply not pointed at. The classical forge-fire role adds precision: 丁 does not just illuminate, it transforms what it contacts through sustained, focused heat. The shadow: the sustained focus that produces genuine depth also produces a threshold for everything that doesn't meet the standard for that depth.",
    ceiling:     2,
  },

  // ── Yang Earth ───────────────────────────────────────────────────────────
  "戊": {
    principle:   "戊无水则燥 / 春土无火则寒",
    translation: "Earth without Water becomes arid. Spring Earth without Fire remains cold.",
    source:      "穷通宝鉴 — climate adjustment conditionals",
    derivation:  "Apply only the clause matching the chart's catalyst condition. Arid version (Water catalyst): the Mountain holds, structurally intact, but nothing grows on it — present, proven, producing nothing. Cold version (Fire catalyst): solid, holding, waiting for the warmth that activates what the stability was built to hold. Do not combine both clauses for the same key.",
    ceiling:     2,
    conditionality: "catalyst-conditional — Water vs. Fire clause applies to different charts. Check the chart's catalyst element before applying.",
  },

  // ── Yin Earth ────────────────────────────────────────────────────────────
  "己": {
    principle:   "己土湿润，滋生万物；己土过湿则混浊",
    translation: "己 Earth is moist and fertile — nourishes the ten thousand things. Excess moisture turns fertile soil to mud.",
    source:      "三命通会 十干体象 / 穷通宝鉴",
    derivation:  "The nourishment is genuine and continuous. What己 does for others is not a strategy — it happens at the structural level, the way fertile ground grows things. The shadow: 己土混浊 — when the absorbing quality takes in more than can be processed, the fertility becomes muddy and loses its nourishing power. The depletion does not announce itself because the giving never registered as effort.",
    ceiling:     2,
  },

  // ── Yang Metal ───────────────────────────────────────────────────────────
  "庚": {
    principle:   "金逢火炼方成器 / 金逢火炼方显锋芒",
    translation: "Metal meeting the tempering of Fire becomes an instrument. Metal meeting Fire reveals its sharp edge.",
    source:      "穷通宝鉴 — Metal stem conditionals",
    derivation:  "素材 (raw material with full capability, unspecified as to purpose) vs. 成器 (an instrument shaped toward a specific function). Fire does not add capability — it specifies what the precision is for. The edge was already real before the encounter; Fire changes manifest specificity, not the underlying capability. Relief is not 'becoming capable' — it is the precision finding a direction it fully believes in.",
    ceiling:     3,
  },

  // ── Yin Metal ────────────────────────────────────────────────────────────
  "辛": {
    principle:   "辛金性柔，须见丙火照耀，方能光彩夺目",
    translation: "辛 Metal is refined and yielding — it requires 丙 Fire's illumination to reveal the full brilliance.",
    source:      "穷通宝鉴 — Metal stem conditionals",
    derivation:  "The Jewel holds value within itself — but its full brilliance requires both the refining encounter and the protective setting that holds what is revealed. Without the setting, the heat risks damage rather than revelation. The specific interior quality: the discernment that perceives excellence registers what falls short with equal precision. The standard is structurally on, for everything, including the self.",
    ceiling:     2,
  },

  // ── Yang Water ───────────────────────────────────────────────────────────
  "壬": {
    principle:   "壬水奔流，无土则泄",
    translation: "Yang Water flows powerfully — without Earth banks it becomes runoff, dispersing without reaching anything.",
    source:      "穷通宝鉴 / 三命通会 十干体象",
    derivation:  "Apply only when tgPattern = forging (Earth as dominant element). The intelligence without containing structure ranges everywhere simultaneously and reaches nothing specifically. The banks do not diminish the Ocean — they give it direction and make it navigable. Without them: the vastness that is genuinely impressive from outside produces the interior experience of always moving and never arriving.",
    ceiling:     2,
    conditionality: "forging-pattern conditional — applies when Earth is the controlling force. Do not apply to other tgPattern values.",
  },

  // ── Yin Water ────────────────────────────────────────────────────────────
  "癸": {
    principle:   "癸水如雨露，无处不至，渗透滋润",
    translation: "癸 Water like rain and dew — reaches everywhere without directing itself, permeates and nourishes without announcing.",
    source:      "穷通宝鉴 / 三命通会 十干体象",
    derivation:  "The perception is pervasive and unconscious — 癸 knows what is true before reasoning toward it. The permeability that makes this possible also makes it difficult to distinguish what the person feels from what they've absorbed from those around them. The specific interior experience: the room's emotional state enters without permission. The gift (sensing what is true before it is spoken) and the cost (absorbing what should pass through) are the same structural fact.",
    ceiling:     2,
  },
};


// ═══════════════════════════════════════════════════════════════════════════
// CLASSICAL_TG_ANCHORS
// Classical source principles for all 10 Ten Gods.
// Source: 子平真诠, 滴天髓 (任铁樵), 三命通会 — see DOC3 §2 for derivations.
//
// Usage: Inject into buildAnglePrompt() in batchGenerate.js to give
//   generation the classical behavioral anchor behind each TG relationship.
//
// Hard ceiling per DOC3: max 2 behavioral claims per polarity per entry.
// ═══════════════════════════════════════════════════════════════════════════

// [INTERNAL · verification only — never served to users]
// [INTERNAL · verification only — never served to users]
export const CLASSICAL_TG_ANCHORS = {

  "比肩": {
    principle:   "身旺比劫旺，自立独行，难于合作",
    translation: "When the self is strong and 比肩 amplifies it — independent and self-directing, collaboration is structurally difficult.",
    source:      "三命通会 / 滴天髓 (任铁樵) — DM strength dynamics",
    derivation:  "Self-amplification without counterpoint produces a complete internal system. The completeness is genuine — not defensiveness, not ego. The specific loneliness: surrounded by people engaging with the surface while the interior runs at full depth with nothing to meet it. The gift and the shadow are structurally identical: the same self-sufficiency that produces extraordinary self-consistency is what makes genuine peers necessary and rare.",
    ceiling:     2,
    pairNote:    "比肩 is internal amplification; 劫财 is external lateral comparison. Not degrees of the same thing — categorically different orientations.",
  },

  "劫财": {
    principle:   "劫财主争竞，损耗财物，友中有敌",
    translation: "劫财 governs competition and resource contention — among those most similar, some will be rivals.",
    source:      "三命通会 论兄弟 / 渊海子平",
    derivation:  "Lateral comparison is the primary relational frame. The reference point is always the people most like you — close enough to be meaningful, different enough (cross-polarity) to generate structural competition. The gift: genuine peers sharpen and reveal actual limits in ways admirers never can. The shadow: the resources and recognition most desired are contested precisely by the people closest to your own territory.",
    ceiling:     2,
    pairNote:    "劫财 is competitive lateral reference; 比肩 is self-amplifying loop. Different structural orientations, not different intensities.",
  },

  "食神": {
    principle:   "食神吐秀，秀气流行 / 食神过旺则泄身太过",
    translation: "Food God expresses elegance — refined Qi moves outward. Excess Food God over-exposes the self.",
    source:      "子平真诠 论食神 — direct quotation",
    derivation:  "Output is elegant and non-assertive — it arrives because the person is fully themselves, not because they decided to give. The invisible cost: because the output does not feel like effort from the inside, neither does the depletion. 食神过旺: the over-extension into what feels natural depletes the foundation before any signal arrives. The gap between visible gift and invisible cost is structural.",
    ceiling:     2,
    pairNote:    "食神 gives without asserting; 伤官 produces into structural resistance. Same-polarity effortlessness vs. cross-polarity friction-constituted output.",
  },

  "伤官": {
    principle:   "伤官者，聪明秀气太过 / 伤官见官，为祸百端",
    translation: "Hurting Officer people are excessively brilliant and refined. When Hurting Officer meets authority, ten thousand conflicts arise.",
    source:      "子平真诠 论伤官 — direct quotation",
    derivation:  "太过 (excessive/beyond measure): the brilliance operates ahead of the frameworks available to receive it — not willful, structural. The intelligence genuinely exceeds the container. 伤官见官: the output is in structural tension with any framework that tries to evaluate it by conventional standards. The critical distinction from 食神: the friction that 伤官 produces is not a side effect — it is constitutive. The brilliance is partially made of what it presses against.",
    ceiling:     2,
    pairNote:    "伤官 is constituted by friction; 食神 flows without resistance. The shadow of each is symmetrically opposite: 食神 depletes invisibly through effortless output; 伤官 risks self-destruction when output finds no adequate container.",
  },

  "偏财": {
    principle:   "财为我克，偏财主广泛，与人结缘",
    translation: "Wealth is what I control — 偏财 governs broadly, touching many material forms without concentrating on one.",
    source:      "三命通会 论财 / 渊海子平",
    derivation:  "Same-polarity control produces distributed engagement — ranging across many instances of material simultaneously. The gift is range and natural ease with resources. The shadow: what is controlled broadly is never fully possessed, and what is never fully possessed can slip away without the person fully registering what they had. The engagement was wide; the grip was diffuse.",
    ceiling:     2,
    pairNote:    "偏财 is broad distributed ranging; 正财 is specific disciplined acquisition. Same controlling relationship, opposite concentrations of engagement.",
  },

  "正财": {
    principle:   "正财主诚实勤劳，按部就班获得财富",
    translation: "Direct Wealth governs honest methodical effort — wealth acquired step by step through disciplined specific control.",
    source:      "三命通会 论财 / 子平真诠",
    derivation:  "Cross-polarity control produces specific, disciplined direction. The acquisition is methodical and earned. The shadow: the evaluative apparatus applied to what you control does not know when to stop asking whether what you hold is worthy of the standard. The precision that produces genuine wealth by methodical direction continues examining after the examination is no longer useful.",
    ceiling:     2,
    pairNote:    "正财 is methodical specific control; 偏财 is distributed broad ranging. Different acquisition styles, not different quantities.",
  },

  "七杀": {
    principle:   "七杀制伏得宜，反为权贵 / 七杀为患，制者必须有力",
    translation: "When Seven Killings are properly channeled, they produce genuine authority. When Seven Killings cause trouble, the remedy must be powerful.",
    source:      "子平真诠 论七杀 / 滴天髓 任铁樵 512 case studies — bifurcation finding",
    derivation:  "七杀does not grant permission. Does not moderate itself. Does not care whether you survive the encounter. This is the most important feature. The 任铁樵 finding: the same structural condition (unmediated, same-polarity authority pressure) produces either the best or the worst outcomes — no middle result. Chart resources determine which side of the bifurcation. What high-resource 七杀 builds is character that could only have come from being forged, not developed — what others carry as virtue, this person carries as the residue of having survived something that didn't grant the option to fail gracefully.",
    ceiling:     3,
    pairNote:    "七杀 does not grant permission and does not moderate; 正官 grants recognition when quality is real. These are categorically different structures — not different pressure intensities.",
  },

  "正官": {
    principle:   "正官端正，主人沉稳，名声好，规则意识强 / 官轻则贵，官重则压",
    translation: "Direct Officer upright — the person is calm and settled, with good reputation and strong framework-consciousness. Light Officer ennobles; heavy Officer presses down.",
    source:      "子平真诠 论正官 — direct quotation",
    derivation:  "Character shaped by structure that the person has genuinely endorsed. Recognition arrives through demonstrated quality within frameworks the person accepts as legitimate. The critical nuance from 官重则压: when the authority becomes excessive or reveals itself as insufficient, the character that was shaped by a worthy structure loses its primary orientation. The disorientation is not failure — it is the structural consequence of having built identity around a framework.",
    ceiling:     2,
    pairNote:    "正官 grants recognition within endorsed frameworks; 七杀 does not grant permission and does not moderate. Framework-mediated vs. unmediated — categorically different.",
  },

  "偏印": {
    principle:   "偏印滋生有源，深固专一",
    translation: "Partial Seal nourishment has a continuous source — deepens and consolidates the existing direction.",
    source:      "三命通会 / 滴天髓 — rooted-pattern derivation",
    derivation:  "Same-polarity nourishment deepens without redirecting — consolidates what is already present. The support arrives through the same register as the DM, which means it reinforces without introducing new direction. The gift: extraordinary depth in the native domain, because the sustaining source keeps deepening what's already there. The shadow: structural dependency on conditions that were never forced to be built internally — when the supporting source withdraws, the internal reserves are thinner than they appeared.",
    ceiling:     2,
    pairNote:    "偏印 deepens same register; 正印 sustains and opens direction cross-register. Different nourishment orientations, not different intensities of support.",
  },

  "正印": {
    principle:   "正印乃慈母之爱，既养育又指引",
    translation: "Direct Seal is the care of a nurturing mother — it sustains and simultaneously provides direction.",
    source:      "三命通会 / 渊海子平 — 正印六亲 and resource theory",
    derivation:  "Cross-polarity nourishment sustains AND opens toward something specific — the resource comes from a different register and therefore gestures toward what is not yet present. The gift: being backed AND directed simultaneously — the most complete form of external support. The shadow: the direction given with the backing can become the only direction the person knows how to grow in. Reach that learned to grow only where the nourishment pointed.",
    ceiling:     2,
    pairNote:    "正印opens direction with sustenance; 偏印 deepens without redirecting. The cross-polarity of 正印 is the structural source of its directional quality.",
  },
};


// ═══════════════════════════════════════════════════════════════════════════
// BINGYI_FRAMING
// Universal catalyst/remedy framing from Shenfeng Tongkao — Bing Yao Shuo.
// Source: DOC3 section 2.6 — see that entry for full derivation and sourcing.
//
// Usage: Inject into ALL reading generation prompts as a universal constraint
//   on catalyst-related content framing. Applies to teaser, p2, and twoAM
//   fields across all 150 Layer 1 keys. Never frame the catalyst as rescue.
// ══════════════════════════════════════════════════════════�