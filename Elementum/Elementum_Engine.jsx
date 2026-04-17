import React, { useState, useRef } from "react";
// archetypeSource.js inlined for single-file mode.

const STEM_CARD_DATA = {

  "甲": {
    subtitle: `Forward motion as structure, not ambition · The Growth Impulse (Yang)`,
    chips: ["Visionary", "Initiating", "Growth-driven", "Integrity-bound", "Consolidation-resistant"],
    psychCore: {
      phrase: `The Vanguard General`,
      desc: `You're always the first to see where something could go — and you start moving toward it before anyone else has decided whether to begin. You build things that outlast you, but you're usually already thinking about the next thing before the current one is done.`,
    },
    blocks: [
      {
        label: `How they experience the world`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The Oak doesn't decide to grow toward things. It just grows, the way a tree grows toward light — not because it chose the direction but because that's what it does. For this person, the next stage of anything is always visible before the current one has settled. They're mentally already somewhere else while the room is still discussing whether to begin. This isn't impatience exactly. It's more like living slightly ahead of the present moment at all times.` },
      },
      {
        label: `What they're genuinely good at`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `Seeing what something could become before anyone else does. Starting things — not because someone asked them to, but because the gap between what exists and what could exist is physically uncomfortable for them to leave alone. Once they start something, they generate a kind of forward pull that brings other people along without anyone deliberately organizing it. People around them tend to end up thinking bigger than they did before, often without knowing why.` },
      },
      {
        label: `Where they consistently get stuck`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The reaching outruns the roots. They commit to something genuinely and deeply — and then outgrow it before it's fully established. There's a recurring pattern of building something real, then moving before it's been properly consolidated, leaving things in a state that needs someone else to finish. The next stage is always visible before the current one has actually been tested. This isn't fickleness — the investment was real. The problem is structural: the nature moves faster than the foundations can follow.

There's also a specific interpersonal cost: people who care about them often feel like they're perpetually catching up. The Oak doesn't mean to move that fast. It just can't stop.` },
      },
      {
        label: `What changes when conditions are right`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The classical principle: raw wood becomes useful timber only when something shapes and defines it — converts the reaching into something specific. The Oak doesn't need someone to give it direction. What it needs is a force that says "this, not everything." When that arrives through the right challenge or pressure, the reach consolidates into something that holds. The growth doesn't stop. It just finally has a form.` },
      },
      {
        label: `What they rarely admit`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `That they often don't know what they're building toward — only that they're building. The momentum is real. The destination is often genuinely unclear even to them, which is part of why the reaching can go in so many directions before finding the thing that's actually worth the full force.` },
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
      chips: [],  // [FREE · energy chips]
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
      phrase: `The Shadow Diplomat`,
      desc: `You always find a way through — not by pushing harder, but by reading the room and finding the opening no one else noticed. Your destination never changes; only the path you take to get there.`,
    },
    blocks: [
      {
        label: `How they experience the world`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The Vine knows where it's going before it knows how to get there. It reads surfaces, finds the gaps, goes around what can't be moved, and arrives somewhere the Oak never could have reached through force. From outside this looks indirect. From inside it's extremely precise: the destination is fixed; only the path is flexible. They have a gift for reading what a situation actually is — not what it presents, not what people say it is, but the actual underlying reality — and navigating according to that.` },
      },
      {
        label: `What they're genuinely good at`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `Finding the route that wasn't obvious. Arriving where they intended by means that nobody predicted. Reading people and rooms with an accuracy that feels almost unfair — they pick up on what's really happening before anyone has said the thing. Building genuine trust through attentiveness, not through performance. The people who know them well describe someone who always seems to end up exactly where they were heading, even when the path looked like it was going sideways.` },
      },
      {
        label: `Where they consistently get stuck`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The adaptability can become the whole point. When every surface is interesting and every route is worth exploring, the Vine can keep navigating without actually landing anywhere. There's also a subtler risk: the Vine adjusts to surfaces so smoothly it can slowly accommodate away from its own position without noticing — adjusting so quietly that by the time they notice, it's hard to say exactly when it happened or what they actually think anymore.` },
      },
      {
        label: `What changes when conditions are right`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The Vine's gifts fully activate when the environment is genuinely worth the full reach — a surface that deserves the climbing, a destination that's actually worth arriving at. In those conditions, the navigation is extraordinary: precise, intelligent, arriving somewhere real. In the wrong environment, the gifts don't disappear — they just don't engage. This makes choosing environments one of the highest-leverage decisions this person makes.` },
      },
      {
        label: `What they rarely admit`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `How much of what looks like flexibility is actually a form of self-protection — a way of staying mobile enough that no single failure can fully land. The adaptability is genuine intelligence. It's also, sometimes, a way of not having to find out what happens if they commit completely and it doesn't work.` },
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
      phrase: `The Court Herald`,
      desc: `You walk into a room and people feel more at ease, more energized, more capable — without you trying to make that happen. The cost is that you give it constantly and almost never get asked if you're okay.`,
    },
    blocks: [
      {
        label: `How they experience the world`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The Sun doesn't decide to warm things. It warms things because that's what it is. People orient toward this person in a room without deciding to — they just find themselves doing it. Things feel more possible near them. Ideas get bigger. Other people feel more capable of things they weren't sure they could do. This isn't something they engineer; it's a property of their presence, the way sunlight warms a surface without the sun choosing that particular spot.` },
      },
      {
        label: `What they're genuinely good at`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `Creating trust quickly, authentically, and without trying. Moving people not through logic or performance but through what they actually believe — which means it works in rooms where performance would fail completely. Making people feel genuinely seen, not just acknowledged. Sustaining warmth over time in a way that builds rather than fluctuates — the people who receive it know it's real because it was still there on the difficult days too.` },
      },
      {
        label: `Where they consistently get stuck`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The warmth goes everywhere at once, which means it costs the same as focused warmth but produces a fraction of the impact. The giving feels effortless — which is exactly why the depletion accumulates invisibly. They don't notice the tank getting low until it's very low. Others assume they're inexhaustible. This assumption is wrong but hard to correct — the moment the warmth dims, people register it as a problem with the relationship rather than a cost that was always being paid.` },
      },
      {
        label: `What changes when conditions are right`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `Directed warmth — warmth that knows where it's going — is dramatically more powerful than broadcast warmth. When this person finds relationships and contexts that genuinely give back, the warmth stops being diffuse and becomes specific. What was warming a whole room starts illuminating particular things fully. That's when the Sun's quality is at its most extraordinary: not more warmth, but warmth that has somewhere real to go.` },
      },
      {
        label: `What they rarely admit`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `That they sometimes don't know whether the warmth is something they're choosing or something that just runs regardless. The giving can feel less like a gift and more like a structural fact — which makes it genuinely difficult to protect, because it's hard to guard something that operates before you've decided to give it.` },
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
      phrase: `The Imperial Examiner`,
      desc: `When your attention is fully on someone, they feel completely seen — understood at a level they rarely experience. But you can only truly light up one thing at a time, and everything else goes dark.`,
    },
    blocks: [
      {
        label: `How they experience the world`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The Candle illuminates what it's pointed at completely — and nothing else. When the Candle's attention is on you, you are genuinely seen in a way that most people never experience. The attention is total. The light is complete. And what it's not currently pointing at receives almost nothing. This is not the Sun's warmth, which fills a whole room. This is something more precise and more intimate: specificity is the whole point.` },
      },
      {
        label: `What they're genuinely good at`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `Noticing the thing that others walked past. Producing work of real quality in whatever they're fully invested in. Making people feel understood in a way that is specific to them — seen as who they actually are rather than how they've presented themselves. Their perception is unusually accurate, especially about things that are just slightly off. The quality of their attention is something people remember specifically and tend to return to.` },
      },
      {
        label: `Where they consistently get stuck`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The full force of attention can arrive harder than the moment required. Contexts that needed gentle warmth receive the full flame. What falls outside the current focus receives almost nothing — people who aren't being fully attended to can feel the absence sharply and take it personally, even when it has nothing to do with them.

There's also an investment asymmetry that accumulates: the Candle gives the full quality of its attention without always checking whether it's being matched. The care is real. The return is often lower than what was given. And because the giving felt like connection rather than cost, the imbalance often goes unnamed for a long time.` },
      },
      {
        label: `What changes when conditions are right`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The Candle works best when its autonomy to direct the light is genuinely its own — when what it chooses to focus on is genuinely worth the full illumination. In those conditions, the precision is extraordinary: the depth of understanding, the quality of care, the accuracy of perception. The practice is learning that choosing selectively isn't a failure to be more like the Sun — it's the mechanism by which this particular kind of light actually works.` },
      },
      {
        label: `What they rarely admit`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `That when the full flame arrives at full force in a context that wasn't ready for it, they often don't understand why it didn't land the way it should have. The quality was real. The care was genuine. What they don't always account for is that not every moment wants to be fully illuminated.` },
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
      phrase: `The Mountain Warden`,
      desc: `You're the person everyone builds their plans around — steady, reliable, there when things shake. The part no one sees is how much you're actually holding, because you never let it show.`,
    },
    blocks: [
      {
        label: `How they experience the world`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The Mountain is what people orient by. It provides a kind of psychological ground — a stable reference point that others use without thinking about it. Conversations land differently around them. Decisions get made based on what they think, often before anyone has formally asked. People plan their lives around their presence. The reliability isn't something they practice or maintain through effort — it's what they're made of, the way a mountain is made of stone rather than holding itself up by trying.` },
      },
      {
        label: `What they're genuinely good at`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `Holding what needs holding — weight, stress, uncertainty, pressure — without showing the cost in a way that makes others feel responsible for it. Building things that last because they genuinely cannot tolerate building things that won't. Following through across time, not as a discipline they impose on themselves but as a structural fact. Being the person in the room who is still there when the dramatic options have run out.` },
      },
      {
        label: `Where they consistently get stuck`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The same quality that makes them load-bearing makes genuine movement difficult. When something needs to change — a relationship that's over, a position no longer tenable — the Mountain can hold it in place long past the point where the situation calls for release. Not from stubbornness. More from the fact that the stability everyone relies on makes shifting feel like a betrayal of what they're for.

There's also a slow accumulation of unspoken costs. The Mountain absorbs a great deal without naming it. Over time this produces weight that no one sees because the Mountain never showed it — which means no one thought to ask whether it was okay.` },
      },
      {
        label: `What changes when conditions are right`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The Mountain that has learned to distinguish between what needs to be held and what needs to be released is dramatically more powerful than the one that holds everything equally. The fire that activates it doesn't destabilize the stability — it gives the holding a direction. What was simply present becomes generative. What was enduring begins to produce.` },
      },
      {
        label: `What they rarely admit`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `That they need things too — specific things, from specific people — and have spent so long not needing anything visibly that they've almost stopped knowing how to name what those things are. The Mountain is so reliably there for everyone else that the question of what it needs has largely stopped being asked. Which means it's also largely stopped being answered.` },
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
      phrase: `The Palace Gardener`,
      desc: `You help others grow without making a thing out of it — quietly creating the conditions for people to become better versions of themselves. The problem is you give more than you get back, and it takes longer than it should to notice.`,
    },
    blocks: [
      {
        label: `How they experience the world`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The Field grows things in everyone it encounters — before it decides to. It notices what people and situations need and responds before being asked, the way fertile soil responds to a seed by providing what's required for it to grow. People develop in the presence of this person in ways they often attribute entirely to themselves — not recognizing that the conditions making the growth possible were created by someone paying close, quiet attention to what was needed.` },
      },
      {
        label: `What they're genuinely good at`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `Reading what a person or situation actually needs — not what's being asked for, but the underlying requirement. Following through on care consistently across time, not just when it's convenient or visible. Building relationships that genuinely develop people rather than simply maintaining proximity. Producing in others a kind of trust earned specifically by consistency: when they say they'll show up, they do, and people build their lives around that accordingly.` },
      },
      {
        label: `Where they consistently get stuck`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The Field depletes invisibly. The nourishment flows outward without being tracked — and by the time the deficit becomes visible, it's been accumulating for months. The growth they create in others tends to be attributed to those others, which means the Field is chronically undercompensated for what it actually produces. They're also particularly susceptible to investing in contexts that absorb without returning. The Field is often the last to notice this, partly because caring about whether care is being returned feels, to them, like a betrayal of what genuine care should be.` },
      },
      {
        label: `What changes when conditions are right`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `In genuinely reciprocal conditions — where the care flows in both directions and the Field is being nourished at the same rate it nourishes — what it produces is extraordinary. The growth that was quiet and consistent becomes visible and remarkable. The practice is treating its own fertility as something worth protecting rather than something to be fully spent on whoever arrives.` },
      },
      {
        label: `What they rarely admit`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `That they keep score, quietly — and that the accounting is often worse than anyone around them knows. They don't say this because saying it feels contrary to what care is supposed to be. But the gap between what's given and what returns is real, and it accumulates in them even when it isn't visible to anyone else.` },
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
      phrase: `The Imperial Executioner`,
      desc: `You read every room before you enter it — the assessment runs automatically, before you've decided to begin. People trust you because you're always honest, but they often find you hard to get close to.`,
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
          pure: `No dominant Ten God is shaping the deployment of this energy. The evaluative capacity runs as its essential self — not directed outward by a wealth configuration, not grounded by a dominant resource pull, not filtered through a relational or authority register. What arrives is precision without a predetermined channel. The world is a set of things to be assessed, and the question of what to do with those assessments is genuinely more open than it is for configurations where a dominant force has already specified the answer. This is not a weakness. It is the unconstrained form: the precision is free to find the target that actually deserves it, rather than the one a dominant configuration has already selected.`,
          rooted: `Resource energy supporting the Metal means the evaluation doesn't arrive alone — it arrives backed. Assessments form slower here and land harder once they do: the structural support that generates stability also generates weight. The world arrives not just as something to be cut but as something to be understood at depth, relative to what persists. There is a groundedness in how you encounter things — you don't need to immediately act on what you've assessed, and the holding capacity is real. Where this creates friction: the same structural weight that makes your verdicts reliable makes it harder to move toward things that aren't yet proven. You are well-positioned for durable work. You are less well-positioned for commitments that need to be made before confidence has fully formed.`,
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
          pure: `The pure configuration produces a specific stuck point: the precision is operational and accurate, but without a dominant directive force, the question of which valid conclusion to act on first doesn't have a built-in answer. Multiple assessments can coexist in equal standing — each accurate, none obviously prioritized. The decision machinery works. The orientational function, which would normally be supplied by a dominant wealth or authority configuration, has to be consciously constructed rather than structurally given. The stuck is subtle: you are not lacking clarity. You may be lacking the frame that tells you which clarity matters most right now.`,
          rooted: `The structural weight that makes your assessments reliable is the same force that makes revision expensive. A conclusion formed with strong resource backing doesn't revise easily — not because it can't be corrected, but because the same grounding that produced it resists being overturned by anything less than genuinely heavy counter-evidence. The stuck pattern: you identify that something may need to change, the internal evaluation runs, and it runs longer than the situation requires. By the time you've reached full confidence in the revision, the window for acting on it has sometimes closed. The other form: you hold a position past its usefulness not out of stubbornness but out of structural integrity. Same property; different cost.`,
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
          pure: `Without a dominant force specifying what the precision is for, the pure configuration can accumulate something that doesn't look like a problem from outside: technically active, producing accurate reads, operating well — but the precision isn't converging toward anything in particular. The evaluative function runs without a consistent target that builds on itself. This looks like productivity from the outside while something inside registers as drift. What holds you back is not visible failure but the absence of a compounding direction — each assessment accurate in isolation, none building systematically toward something beyond itself. The sharp edge. The unspecified purpose.`,
          rooted: `The resource backing that stabilizes you also delays you. The structural support makes commitment to unproven paths feel structurally premature — not fearful, just early. And because you are genuinely stable and functional in the current state, the cost of not moving is invisible until it isn't. Opportunities that require early commitment — relationships in their uncertain opening phase, career moves that need to be made before the destination is fully legible, positions that close if you don't act before confidence is established — arrive and pass without you registering them as losses in real time. What holds you back looks like patience from the outside. The recognition of what passed tends to arrive later, when solid is no longer the relevant question.`,
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
      phrase: `The Jade Appraiser`,
      desc: `You sense whether something is genuinely excellent the way others sense whether a room is cold — automatically, before thinking about it. You produce work of real quality, but the same standard that makes you exceptional never quite lets you feel done.`,
    },
    blocks: [
      {
        label: `How they experience the world`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The Jewel perceives quality the way others perceive temperature — automatically, before thinking about it. Not "is this good?" as a question they ask, but an immediate, pre-verbal sense that something is or isn't genuinely excellent. This applies to work, to ideas, to environments, to people, to the way something was made. The standard is always running. It's not a habit they developed — it's a perceptual structure they were born with, as natural and involuntary as the ability to see color.` },
      },
      {
        label: `What they're genuinely good at`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `Producing things of genuine distinction because they literally cannot bring themselves to output something they don't fully believe in. Identifying what is genuinely excellent when others would settle for adequate. Building things where the quality is lasting — not impressive on the surface but actually good in the way that holds up over time and under examination. They're also the person who has already noticed the flaw that will become a problem three months from now. They often don't say this immediately. But they've already seen it.` },
      },
      {
        label: `Where they consistently get stuck`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The refining doesn't know when to stop. The same faculty that produces excellent work keeps working past the point of completion — improving things that are done, delaying delivery of things that are ready, exhausting the precision on what doesn't need it. There's also a persistent gap between what the Jewel can perceive as possible and what the world tends to offer, creating a background friction that doesn't switch off. In environments that can't meet the standard, this becomes chronic dissatisfaction.` },
      },
      {
        label: `What changes when conditions are right`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The Jewel's quality is most fully expressed in settings that can actually receive what it produces. In conditions that genuinely warrant the discernment, what the Jewel produces is something most other approaches simply cannot generate. The practice is protecting access to those conditions rather than applying the full standard uniformly to everything.` },
      },
      {
        label: `What they rarely admit`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `That the standard they apply to everything, they apply to themselves — and that this is often the hardest part. The gap between what they can perceive as possible in themselves and what they currently are is always visible to them. Which means they are almost never quite satisfied with who they are right now, regardless of what they've achieved.` },
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
      phrase: `The River Cartographer`,
      desc: `You process things at a depth most people in the room aren't reaching, and you carry more beneath the surface than you ever show. The hard part is the gap between how deep you actually think and what you can get the room to understand.`,
    },
    blocks: [
      {
        label: `How they experience the world`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The Ocean holds more beneath the surface than it shows. In any exchange, they're processing at a depth that most people in the conversation can't quite follow — holding more variables, more layers, more implications simultaneously than the situation might seem to warrant. Others sense this as intelligence before they can name what they're sensing. The depth is structural, not accumulated through study or experience. It was there before anything else was added to it.` },
      },
      {
        label: `What they're genuinely good at`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `Understanding how things actually work at the level where they actually operate — not the surface dynamics everyone can see but the real dynamics beneath them. Producing insights that emerge from holding many things at once rather than following a single logical thread, reaching conclusions by routes they can't always fully explain. Going further into complex or difficult territory than most people are willing to go, and returning with something genuinely useful.` },
      },
      {
        label: `Where they consistently get stuck`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The depth needs banks or it disperses. Without a specific channel — a specific form, a specific person who can engage at the level where they're actually operating — the intelligence ranges widely without landing anywhere productive. The translation problem is real: bringing what they perceive at depth into forms that people at the surface can receive is a constant, effortful process that never quite finishes.

Most exchanges happen at a shallower level than where the Ocean operates. This produces a persistent sense of being encountered at the surface — of having depth that no one is quite reaching. The response is often to withdraw further rather than simplify, which deepens the problem without resolving it.` },
      },
      {
        label: `What changes when conditions are right`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `In conditions of genuine exchange — where someone meets them at the level they're operating and gives something back at that level — the Ocean produces things it cannot produce alone. The depth that was ranging without form finds a channel. The intelligence that was present but not landing becomes genuinely useful. These conditions are rare, which is why the Ocean learns to recognize them quickly and protects them once found.` },
      },
      {
        label: `What they rarely admit`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `How often they're lonely in this specific way: surrounded by capable, intelligent people and still operating in a depth that no one in the room is quite reaching. Not because the people are insufficient. Because the depth is structural — it was always going to be this particular width and this particular distance down, regardless of who was in the room.` },
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
      phrase: `The Court Oracle`,
      desc: `You know what's true in a room before anyone says it out loud — the feeling arrives before the reasoning does. The difficult part is that you absorb what everyone around you is feeling, and it can be hard to tell what's yours and what isn't.`,
    },
    blocks: [
      {
        label: `How they experience the world`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The Rain senses what's true in a room before anyone says the thing. Not through observation and analysis — the knowing arrives as a felt sense, directly, before any reasoning catches up. They know when something is off, when someone is hurting, when the thing that was said isn't the thing that is actually true. This happens continuously and without their choosing it. Proximity to others is never emotionally neutral for them — they absorb the emotional reality of their environment the way rain absorbs the ground's temperature when it falls.` },
      },
      {
        label: `What they're genuinely good at`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `Nourishing what they touch in ways that are specific to what that particular person or situation actually needs — not generic care, but calibrated care. Making people feel genuinely known rather than simply seen. Perceiving the thing that's almost true but not quite, and finding the exact words for it that make the person realize it was there all along. Sustaining this across time — their care doesn't diminish when circumstances change. It's structural.` },
      },
      {
        label: `Where they consistently get stuck`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The permeability that makes them so perceptive makes it genuinely hard to know whose feeling is whose. The Rain absorbs what it encounters — not from weakness but from how the sensitivity is wired. In difficult or charged environments, they don't just observe the difficulty; they carry it home. The boundary between what they're sensing in others and what they're experiencing themselves can dissolve quietly, often before they've noticed it's happened.

There's also a pattern of caring for others at the level they wish they were cared for — which means the care they give is often more than what returns. Because the giving felt natural, the gap takes a long time to become visible.` },
      },
      {
        label: `What changes when conditions are right`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `In genuinely reciprocal conditions — where the sensitivity is met with sensitivity, where the nourishment returns at something close to the rate it goes out — what the Rain produces is among the most valuable things available in close relationship. The perception is extraordinary. The care is specific. The knowing is real. Protecting these conditions isn't selfishness. It's maintenance of the instrument.` },
      },
      {
        label: `What they rarely admit`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `That they absorb far more than they show — and that the accumulation is real and has weight. Over time, in environments that don't return what's given, this becomes something between exhaustion and a kind of grief: the specific sadness of giving something real that doesn't arrive back at the same depth.` },
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

const TG_CARD_DATA = {
  "比肩": {
    // The Mirror — Same nature, same register
    name: "The Mirror",  // [INTERNAL · display label]  // [INTERNAL · display label]
    sub: "Same nature, same register",  // [INTERNAL · display label]  // [INTERNAL · display label]
    rulingRealm: {
      phrase: `Inner Validation — the ego's private standard`,  // [FREE]
      desc: `The part of a person that measures everything against their own internal benchmark before anything else. Not comparison with others — comparison with the self. Self-sufficiency is not a strategy here; it is the default operating mode.`,  // [FREE]
    },  // [FREE]
    chips: ["Self-reliant", "Consistent", "Principled", "Insular", "Complete"],  // [FREE · personality chips]
    outputs: [  // [FREE]
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
    ],
    frictions: [  // [FREE]
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
    ],
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
    hiddenDynamic: `Beneath the self-sufficiency is a deep need for peers who are genuinely equal — not admirers, not subordinates, but someone who can actually meet them at the level they operate. The specific loneliness is not about being alone. It is about being surrounded by people who engage with the surface rather than the depth.`,  // [PRO]
    domainSignatures: {  // [PRO]
      career: {
        sig: 3,
        mechanism: "比肩 → independent judgment, exceptional depth in native domain",
        text: `Excels in roles requiring sustained conviction and independent judgment. The self-amplification produces unusual depth. Collaboration is structurally harder because the reference point is always internal — genuine compromise feels like compromise of the standard itself.`,
      },
      relationships: {
        sig: 4,
        mechanism: "比肩 → peer dynamics, identity pressure, resource contention with equals",
        text: `Needs a peer who can actually meet them — not someone who defers. Tends to attract people who want to be near the self-sufficiency rather than genuine equals. The pattern: respected and relied upon, but not truly known.`,
      },
      wealth: {
        sig: 2,
        mechanism: "比肩 → independent income, personal standards drive earning",
        text: `Earns through their own effort and internally validated standards. Won't monetize things they don't believe in. Independent income sources strongly preferred over institutional dependency.`,
      },
      health: {
        sig: 2,
        mechanism: "比肩 → self-monitoring calibrated to output, depletion unrecognized",
        text: `Tends not to recognize depletion because the self-monitoring system is calibrated to output. Runs on conviction past the point where the body signals readiness to stop. Rest has to be decided, not felt.`,
      },
    },
    sixRelations: `比肩 classically represents siblings and same-status peers — people who share your nature and move in your territory. In the broader life: close friends who genuinely get it without explanation, the rare equals who don't defer. In less healthy expressions: the peers whose similarity makes them competitors for the same recognition.`,  // [PRO]
    liunianSignatures: `A 比肩 year or period brings increased peer competition, resource contention with those most similar, and pressure on the established identity. For charts that benefit: confidence, clarity of self, decisive independent action. For charts where 比肩 is resistance: conflict with equals, loss through competition, an identity challenge that forces honest self-examination.`,  // [PRO]
  },

  "劫财": {
    // The Rival — Same nature, different register
    name: "The Rival",  // [INTERNAL · display label]  // [INTERNAL · display label]
    sub: "Same nature, different register",  // [INTERNAL · display label]  // [INTERNAL · display label]
    rulingRealm: {
      phrase: `Social Performance — the ego measured against its nearest competition`,  // [FREE]
      desc: `The part of a person that measures itself against others occupying the same territory. Not the internal standard of 比肩 but the comparative ego — what am I relative to the people most like me? The reference point is always lateral.`,  // [FREE]
    },  // [FREE]
    chips: ["Competitive", "Comparative", "Socially driven", "Resource-aware", "Sharp"],  // [FREE · personality chips]
    outputs: [  // [FREE]
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
    ],
    frictions: [  // [FREE]
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
    ],
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
    hiddenDynamic: `Underneath the rivalry is a specific, rarely admitted desire: genuine recognition from exactly the people most like them. Not recognition from outsiders — that lands hollow. The need is for the specific peer who understands what the achievement cost to acknowledge it as real.`,  // [PRO]
    domainSignatures: {  // [PRO]
      career: {
        sig: 3,
        mechanism: "劫财 → lateral competition, peer performance benchmarking",
        text: `Thrives in competitive environments where performance is measured against others — fields with visible rankings and clear standards. The comparison drive produces real results when channeled toward the work rather than toward the rival.`,
      },
      relationships: {
        sig: 3,
        mechanism: "劫财 → rivalry with similar partners, resource contention",
        text: `Most significant relationships are with people most similar to them. Sharing resources with someone in the same lane feels like giving something away. The specific challenge: genuine collaboration with the people who most deserve it.`,
      },
      wealth: {
        sig: 5,
        mechanism: "劫财 → resource contention, competitive wealth dynamics",
        text: `Resource contention with peers is a recurring pattern. The competitive orientation can produce genuine wealth when directed toward building rather than measuring. Risk: losing resources to rivalry.`,
      },
      health: {
        sig: 2,
        mechanism: "劫财 → competitive overperformance, external calibration of limits",
        text: `Competitive orientation produces overperformance relative to the body's actual capacity — pushing past physical limits to match or exceed a rival. The self-monitoring calibrates to the external reference rather than internal signals.`,
      },
    },
    sixRelations: `劫财 classically represents brothers and sisters of a different nature, rivals, and those who share resources. In modern life: business partners who become competitors, colleagues in the same domain, the sibling whose achievements are the reference point.`,  // [PRO]
    liunianSignatures: `A 劫财 year or period intensifies competition from peers, brings resource loss risks through rivalry, and activates the comparative drive. For charts that benefit: the competition produces genuine performance — this can be a defining year. For charts where 劫财 is resistance: betrayal by those most similar, loss of shared resources.`,  // [PRO]
  },

  "食神": {
    // The Flow — Same-polarity output — giving that feels like being
    name: "The Flow",  // [INTERNAL · display label]  // [INTERNAL · display label]
    sub: "Same-polarity output — giving that feels like being",  // [INTERNAL · display label]  // [INTERNAL · display label]
    rulingRealm: {
      phrase: `Authentic Expression — output that happens before strategy`,  // [FREE]
      desc: `食神吐秀 (the Food God expresses elegance): refined Qi moving outward without announcement. What flows out when the self is fully itself — not the assertion of 伤官, not the pressure of 七杀, just the natural emergence of what the DM generates when nothing is in the way.`,  // [FREE]
    },  // [FREE]
    chips: ["Generous", "Expressive", "Effortless", "Non-assertive", "Pleasurable"],  // [FREE · personality chips]
    outputs: [  // [FREE]
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
    ],
    frictions: [  // [FREE]
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
    ],
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
    hiddenDynamic: `Beneath the natural generosity is often a specific unawareness that giving is happening at all — the output doesn't register as effort, which means neither does the depletion. By the time they feel genuinely exhausted, they've been running on reserves for longer than anyone knew.`,  // [PRO]
    domainSignatures: {  // [PRO]
      career: {
        sig: 4,
        mechanism: "食神 → natural output becomes the product, authentic production capacity",
        text: `Excels in roles where what flows naturally IS the product — creative work, teaching, mentoring. Struggles in highly structured environments that require output to be performed rather than expressed.`,
      },
      relationships: {
        sig: 2,
        mechanism: "食神 → naturally nourishing, structural generosity, reciprocity gap risk",
        text: `Naturally nourishing to be near — people feel genuinely fed without being able to account for why. The pattern to watch: attracting those who receive well without giving back, because the giving never seems costly.`,
      },
      wealth: {
        sig: 3,
        mechanism: "食神 → natural production capacity, undervaluation risk",
        text: `Can generate real financial value through authentic creative output. The recurring risk: what flows naturally doesn't feel like it should cost money, so it gets given away or undersold.`,
      },
      health: {
        sig: 4,
        mechanism: "食神 → invisible depletion, DM element bears the output load",
        text: `食神过旺 produces genuine physical depletion that arrives without warning because the cost was invisible at every intermediate stage. Restoration requires genuine rest, not just reduced output.`,
      },
    },
    sixRelations: `食神 classically represents children (especially for female DMs) and the people who receive the natural output. In modern life: mentees nourished without effort, creative collaborators who receive what flows naturally. Also: the physical pleasures of life — food, art, rest, anything that produces without asserting.`,  // [PRO]
    liunianSignatures: `A 食神 year or period brings creative flourishing, ease, genuine pleasure, and opportunities for authentic expression. For aligned charts: a genuinely good period — one of the few kinds of years where things feel right. For excess 食神: over-extension, depletion, difficulty stopping.`,  // [PRO]
  },

  "伤官": {
    // The Edge — Cross-polarity output — brilliance made of what it meets
    name: "The Edge",  // [INTERNAL · display label]  // [INTERNAL · display label]
    sub: "Cross-polarity output — brilliance made of what it meets",  // [INTERNAL · display label]  // [INTERNAL · display label]
    rulingRealm: {
      phrase: `Rebellion Logic — output that structurally exceeds its container`,  // [FREE]
      desc: `伤官者，聪明秀气太过: "Hurting Officer people are excessively brilliant and refined." The excess is structural, not attitudinal — the intelligence genuinely exceeds the frameworks available to receive it, so it pushes against them as a side effect of expressing itself.`,  // [FREE]
    },  // [FREE]
    chips: ["Brilliant", "Subversive", "Friction-constituted", "Non-conformist", "Ahead"],  // [FREE · personality chips]
    outputs: [  // [FREE]
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
    ],
    frictions: [  // [FREE]
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
    ],
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
    hiddenDynamic: `The specific interior cost that goes mostly unspoken: knowing you've just broken something that can't be unbroken — in a conversation, in a relationship — and not being certain whether that was necessary or excessive. The brilliance and the destruction arrived together.`,  // [PRO]
    domainSignatures: {  // [PRO]
      career: {
        sig: 5,
        mechanism: "伤官 → innovation, disruption, structural advancement beyond convention",
        text: `Exceptional in roles requiring genuine creative innovation or disruption — entrepreneurship, research, independent creative practice. Deeply unsuited to politically managed hierarchies where 伤官见官 produces constant institutional friction.`,
      },
      relationships: {
        sig: 3,
        mechanism: "伤官 → intensity, friction as intimacy, container requirements",
        text: `Others are drawn to the brilliance and encounter the friction as inseparable from it. The relationships that hold are those that can contain the full force. Intensity deepens some relationships and exhausts others.`,
      },
      wealth: {
        sig: 3,
        mechanism: "伤官 → edge output seeking adequate container, timing critical",
        text: `Can generate significant wealth when the output finds the right market or moment. The risk: the output is structurally ahead of what current audiences can receive, so timing is everything.`,
      },
      health: {
        sig: 3,
        mechanism: "伤官 → internal pressure when output has no channel, DM element depleted",
        text: `When the output has nowhere to land, the friction turns inward. The body bears the cost of sustained structural tension between what is produced and what the environment can receive.`,
      },
    },
    sixRelations: `伤官 classically represents children with challenging or expressive natures, creative collaborators who push the work further through friction, and the authority figures who constitute the structural resistance. Also: the person whose work the institution can't quite fit into existing categories.`,  // [PRO]
    liunianSignatures: `A 伤官 year or period brings creative breakthroughs, authority conflicts, and moments of genuine originality. For aligned charts: a significant output year — the defining work of a period often emerges during 伤官 activations. For charts where it creates friction: things said publicly that can't be unsaid.`,  // [PRO]
  },

  "偏财": {
    // The Field — Same-polarity wealth — wide-ranging engagement
    name: "The Field",  // [INTERNAL · display label]  // [INTERNAL · display label]
    sub: "Same-polarity wealth — wide-ranging engagement",  // [INTERNAL · display label]  // [INTERNAL · display label]
    rulingRealm: {
      phrase: `Risk/Opportunistic Vision — seeing potential before others recognize it`,  // [FREE]
      desc: `The part of a person that sees potential in everything and moves toward it broadly. Not the focused accumulation of 正财 but the ranging appetite that touches many things and activates what others walked past.`,  // [FREE]
    },  // [FREE]
    chips: ["Generous", "Opportunity-sensing", "Wide-ranging", "Socially fluid", "Diffuse"],  // [FREE · personality chips]
    outputs: [  // [FREE]
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
    ],
    frictions: [  // [FREE]
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
    ],
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
    hiddenDynamic: `The interior truth that rarely gets named: everything feels equally interesting and equally possible, which is both the gift and the structural trap. The inability to fully invest in any one thing is not indecision — it is the nature of the ranging quality.`,  // [PRO]
    domainSignatures: {  // [PRO]
      career: {
        sig: 3,
        mechanism: "偏财 → ranging intelligence, opportunity activation across many domains",
        text: `Thrives in sales, business development, entrepreneurship, and any role where moving across many domains and activating opportunity is the primary value. The ranging intelligence IS the product.`,
      },
      relationships: {
        sig: 3,
        sig_male: 5,  // 六亲: 财 is partner star for male
        sig_female: null,
        mechanism: "偏财 → broad warmth, elusive depth, diffuse investment",
        text: `Charming and genuinely warm across many connections, but full depth with any single person is harder than breadth across many. Partners often feel the warmth is real but the full presence is somehow always partially elsewhere.`,
      },
      wealth: {
        sig: 5,
        mechanism: "偏财 → multiple income streams, generation over accumulation",
        text: `Natural sense for where money can be made, especially through opportunity and social connection. Usually better at generating wealth than keeping it. Multiple income streams natural and preferred.`,
      },
      health: {
        sig: 2,
        mechanism: "偏财 → breadth depletes, rest deprioritized, paternal lineage",
        text: `Involvement in so many things makes genuine rest genuinely rare. The body's signals for slowing down tend to be treated as opportunities for new engagement. Classically relates to the father and paternal lineage in health pattern transmission.`,
      },
    },
    sixRelations: `偏财 classically represents the father (for male DMs), indirect wealth sources, and casual romantic relationships. In modern life: the broader social field — many people are activated by the 偏财 person's presence, fewer are deeply held. Also: business contacts who bring opportunity without lasting partnership.`,  // [PRO]
    liunianSignatures: `A 偏财 year or period brings unexpected financial opportunities, father-related events, expanded social networks, and activation of the opportunity field. For aligned charts: genuine windfalls, new income streams. For charts where 偏财 is friction: scattered resources, father health issues, overcommitment.`,  // [PRO]
  },

  "正财": {
    // The Harvest — Cross-polarity wealth — methodical, directed acquisition
    name: "The Harvest",  // [INTERNAL · display label]  // [INTERNAL · display label]
    sub: "Cross-polarity wealth — methodical, directed acquisition",  // [INTERNAL · display label]  // [INTERNAL · display label]
    rulingRealm: {
      phrase: `Wealth/Security Anxiety — the standard applied to what is held`,  // [FREE]
      desc: `The part of a person that evaluates what it has built and whether it is worthy of the standard applied in building it. Not greed — a specific relationship to security in which the evaluating apparatus that produced the quality also asks whether the quality is sufficient.`,  // [FREE]
    },  // [FREE]
    chips: ["Methodical", "Disciplined", "Earned", "Evaluative", "Security-oriented"],  // [FREE · personality chips]
    outputs: [  // [FREE]
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
    ],
    frictions: [  // [FREE]
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
    ],
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
    hiddenDynamic: `Beneath the methodical exterior is a specific quiet anxiety: the fear that what has been built carefully is somehow still not enough to be safe, not worthy enough to be kept. The standard that produced the quality is also what makes resting in the result genuinely difficult.`,  // [PRO]
    domainSignatures: {  // [PRO]
      career: {
        sig: 3,
        mechanism: "正财 → methodical execution, earned reputation, demonstrable quality",
        text: `Best in roles where methodical, disciplined execution produces visible, trackable results — finance, law, engineering, operations. The career trajectory is typically slower than peers but more structurally durable.`,
      },
      relationships: {
        sig: 3,
        sig_male: 5,  // 六亲: 财 is partner star for male
        sig_female: null,
        mechanism: "正财 → committed, present across time, quality-assessing",
        text: `Committed, reliable, genuinely present across time. The shadow: applies the evaluating standard to the relationship itself. The partner and the dynamic are assessed for whether they are worthy of the investment being made.`,
      },
      wealth: {
        sig: 5,
        mechanism: "正财 → methodical accumulation, conservative risk, wealth held and evaluated",
        text: `Methodical accumulation, conservative risk, genuine building over time. Usually better at keeping wealth than generating it quickly. The specific risk: the evaluating apparatus keeps asking whether the current financial position is truly sufficient.`,
      },
      health: {
        sig: 2,
        mechanism: "正财 → controlled disciplined approach to body, rigidity risk",
        text: `Tends to apply the same disciplined control to the body as to external resources. Excess 正财 produces bodily rigidity — the body is managed rather than listened to.`,
      },
    },
    sixRelations: `正财 classically represents the spouse (for male DMs) and the primary committed relationship. Also: direct income sources, reliable employers and providers, the institutions that pay fairly for demonstrated work.`,  // [PRO]
    liunianSignatures: `A 正财 year or period brings financial consolidation, committed relationship events (marriage, formal partnership), and opportunities to harvest what was methodically built. For aligned charts: genuine stability and tangible reward. For charts where 正财 creates friction: over-control of resources, relationship strain from applying the evaluating standard too strictly.`,  // [PRO]
  },

  "七杀": {
    // The Trial — Same-polarity authority — pressure that doesn't grant permission
    name: "The Trial",  // [INTERNAL · display label]  // [INTERNAL · display label]
    sub: "Same-polarity authority — pressure that doesn't grant permission",  // [INTERNAL · display label]  // [INTERNAL · display label]
    rulingRealm: {
      phrase: `Survival Instinct / Trauma / Resilience — forged, not developed`,  // [FREE]
      desc: `七杀制伏得宜，反为权贵: "When Seven Killings are properly channeled, they produce genuine authority." The force that presses against the DM without moderation, without asking whether it is ready. What gets produced — when resources are adequate — is character that could only have come from that specific pressure.`,  // [FREE]
    },  // [FREE]
    chips: ["Forged", "Resilient", "Intense", "Non-permissioned", "Bifurcated"],  // [FREE · personality chips]
    outputs: [  // [FREE]
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
    ],
    frictions: [  // [FREE]
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
    ],
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
    hiddenDynamic: `What rarely gets named: the quiet exhaustion of having been forged and knowing exactly what it cost. Not pride in the resilience — something quieter, closer to grief about what was required to become this. The question that runs beneath the authority: whether what was built through surviving was worth what was lost in the surviving.`,  // [PRO]
    domainSignatures: {  // [PRO]
      career: {
        sig: 5,
        mechanism: "七杀 → adversarial pressure tolerance, genuine authority under fire",
        text: `Exceptional in roles requiring genuine pressure-tolerance and leadership under adversity — emergency work, high-stakes entrepreneurship, competitive performance, crisis management. The authority that comes from demonstrated survival is recognized differently from institutional authority.`,
      },
      relationships: {
        sig: 4,
        sig_female: 5,  // 六亲: 官杀 is partner star for female
        sig_male: null,
        mechanism: "七杀 → intensity, testing without permission, bifurcated outcomes",
        text: `Relationships shaped by 七杀 involve significant pressure, intensity, or adversity. The bifurcation applies here too: relationships are either deeply forged or significantly damaged. Tends to attract challenging partners or bring intensity that others find difficult to sustain.`,
      },
      wealth: {
        sig: 3,
        mechanism: "七杀 → high-risk/high-reward, non-moderate financial outcomes",
        text: `Can generate significant wealth through high-risk, high-consequence situations that others won't enter. The risk: the same non-permission quality that produces exceptional outcomes also produces exceptional losses when resources run out.`,
      },
      health: {
        sig: 4,
        mechanism: "七杀 → chronic high-pressure operation, DM element depleted by adversarial force",
        text: `The body bears the cost of sustained adversarial operation. Even when external pressure subsides, the internal system calibrated for it doesn't easily downregulate.`,
      },
    },
    sixRelations: `七杀 classically for female DMs represents husband and romantic partners. More broadly: bosses who don't grant permission, adversaries, challenging authority figures who test without validating, the people who shaped you through pressure rather than warmth.`,  // [PRO]
    liunianSignatures: `A 七杀 year or period brings adversarial pressure, significant challenges, potential crises — and, when resources are adequate, genuine breakthroughs and real authority. For aligned charts with adequate resources: the forge produces something remarkable. For depleted charts: breakdown, burnout, forced confrontations that leave lasting damage.`,  // [PRO]
  },

  "正官": {
    // The Standard — Cross-polarity authority — framework-mediated pressure
    name: "The Standard",  // [INTERNAL · display label]  // [INTERNAL · display label]
    sub: "Cross-polarity authority — framework-mediated pressure",  // [INTERNAL · display label]  // [INTERNAL · display label]
    rulingRealm: {
      phrase: `Social Armor / Good Student Complex — character shaped by chosen structure`,  // [FREE]
      desc: `正官端正，主人沉稳，名声好，规则意识强: "Direct Officer upright — the person is calm and settled, with good reputation and strong rule-consciousness." The part of a person that operates within frameworks it has chosen to endorse — not because it has to, but because it has decided the framework is legitimate.`,  // [FREE]
    },  // [FREE]
    chips: ["Principled", "Framework-guided", "Reputation-conscious", "Structured", "Institutional"],  // [FREE · personality chips]
    outputs: [  // [FREE]
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
    ],
    frictions: [  // [FREE]
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
    ],
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
    hiddenDynamic: `The specific interior vulnerability: the person who genuinely followed the rules, who invested years in becoming excellent within the framework, who believed the institution would recognize this — and then discovered that what was stated and what was practiced were not the same thing.`,  // [PRO]
    domainSignatures: {  // [PRO]
      career: {
        sig: 5,
        mechanism: "正官 → legitimate institutional advancement, meritocratic recognition",
        text: `Excels within legitimate institutional structures — established professions, government, corporate ladders where the rules are genuinely real. The failure mode: institutional environments that operate by stated rules and hidden rules simultaneously.`,
      },
      relationships: {
        sig: 4,
        sig_female: 5,  // 六亲: 官杀 is partner star for female
        sig_male: null,
        mechanism: "正官 → commitment-oriented, framework-defined, endorsement-seeking",
        text: `Commitment-oriented, takes the agreed terms of a relationship seriously, reliable across time. The shadow: applies the institutional framework to relationships — there are implicit rules about what the relationship is, and deviation requires renegotiation.`,
      },
      wealth: {
        sig: 3,
        mechanism: "正官 → legitimate channels, meritocratic earning, stable accumulation",
        text: `Earns through legitimate, endorsed paths. Conservative and reliable. The risk: wealth opportunities that exist outside conventional legitimacy are difficult to engage because they don't fit the endorsable framework.`,
      },
      health: {
        sig: 2,
        mechanism: "正官 → institutional health approaches, suppression of DM expression",
        text: `Follows established health frameworks — respected medical guidance, conventional approaches. The shadow: difficulty trusting signals that fall outside the endorsed framework.`,
      },
    },
    sixRelations: `正官 classically for female DMs represents the legitimate husband and primary partnership. More broadly: official mentors, respected authorities who grant genuine recognition, institutional endorsers. The teachers who noticed you. The managers who advocated for you within the system.`,  // [PRO]
    liunianSignatures: `A 正官 year or period brings recognition from institutions, career appointments, public reputation events, marriage or formal partnership opportunities. For aligned charts: a period of genuine advancement within chosen frameworks. For charts where 正官 is unfavorable: over-regulation, the framework becoming a constraint.`,  // [PRO]
  },

  "偏印": {
    // The Well — Same-polarity resource — nourishment that deepens without redirecting
    name: "The Well",  // [INTERNAL · display label]  // [INTERNAL · display label]
    sub: "Same-polarity resource — nourishment that deepens without redirecting",  // [INTERNAL · display label]  // [INTERNAL · display label]
    rulingRealm: {
      phrase: `Niche/Occult Intelligence — depth in what others don't access`,  // [FREE]
      desc: `滋生有源 (nourishment with a continuous source). The part of a person that draws from a deep, unconventional source that others don't have access to or even know exists. The backing that sustains and deepens without redirecting.`,  // [FREE]
    },  // [FREE]
    chips: ["Deep", "Unconventional", "Niche", "Self-sustaining", "Psychically aware"],  // [FREE · personality chips]
    outputs: [  // [FREE]
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
    ],
    frictions: [  // [FREE]
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
    ],
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
    hiddenDynamic: `Knowing things others don't know, from sources others don't access, in ways that are genuinely difficult to explain or legitimize. The shadow: when the source is removed, discovering that the capacity to generate the depth independently was never fully developed. What makes this structurally different from 正印: same-polarity nourishment deepens what is already there without opening it toward something genuinely new. The well gets deeper. The territory stays the same.`,  // [PRO]
    domainSignatures: {  // [PRO]
      career: {
        sig: 4,
        mechanism: "偏印 → unconventional expertise, niche authority, alternative knowledge systems",
        text: `Excels in research, alternative knowledge systems, specialized consulting, unconventional creative fields. The depth that 偏印 produces is genuine and specific — hard to replicate, hard to credential conventionally.`,
      },
      relationships: {
        sig: 2,
        mechanism: "偏印 → depth without opening, sustaining without directing",
        text: `Deep connection with those who share or appreciate the niche; genuine bafflement with those who don't. 偏印 in relationships provides security and depth but not growth direction — sustaining without redirecting.`,
      },
      wealth: {
        sig: 2,
        mechanism: "偏印 → niche expertise monetization, unconventional income paths",
        text: `Generates income through unusual or niche expertise. When the depth is properly monetized, it works because there are few who can offer the equivalent. The risk: the abundance mentality of the source can make charging appropriately feel out of alignment.`,
      },
      health: {
        sig: 3,
        mechanism: "偏印 → specific restoration conditions, dependency on source element",
        text: `偏印 produces deep restoration specifically when the DM's element is replenished through its own nature. The health pattern: extremely effective specific recovery practices that aren't easily transferred or replaced.`,
      },
    },
    sixRelations: `偏印 classically represents step-parent or unconventional mentor; older figures who provide support without conventional relationship structure. In modern life: alternative teachers, mentors from unusual traditions, esoteric knowledge communities.`,  // [PRO]
    liunianSignatures: `A 偏印 year or period brings deep learning, withdrawal from mainstream activity, sustained engagement with unconventional knowledge, and strong support from unusual sources. For aligned charts: a genuinely nourishing and deepening period. For charts where 偏印 creates friction: over-reliance on past patterns, blocked output.`,  // [PRO]
  },

  "正印": {
    // The Root — Cross-polarity resource — nourishment that sustains and opens
    name: "The Root",  // [INTERNAL · display label]  // [INTERNAL · display label]
    sub: "Cross-polarity resource — nourishment that sustains and opens",  // [INTERNAL · display label]  // [INTERNAL · display label]
    rulingRealm: {
      phrase: `Support System / Mother Wound — backed and pointed`,  // [FREE]
      desc: `Bowlby's secure base in its most developmental form: the base that enables exploration by providing both support and direction simultaneously. The part of a person shaped by backing that came with a destination — not just sustained, but sustained AND pointed toward something.`,  // [FREE]
    },  // [FREE]
    chips: ["Grounded", "Mentored", "Directionally shaped", "Supported", "Purpose-oriented"],  // [FREE · personality chips]
    outputs: [  // [FREE]
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
    ],
    frictions: [  // [FREE]
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
      { phrase: `[TODO]`, desc: `[TODO]` },
    ],
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
    hiddenDynamic: `The question that runs beneath everything: is what I am building toward actually mine, or did the backing shape me toward its vision? What makes this structurally different from 偏印: cross-polarity nourishment sustains AND opens — it doesn't just feed what exists, it points toward what doesn't yet exist. The direction that opened with the backing — was it genuinely toward you, or toward what the source needed you to become?`,  // [PRO]
    domainSignatures: {  // [PRO]
      career: {
        sig: 4,
        mechanism: "正印 → mentored capability, institutional advancement, legitimate backing",
        text: `Excels in roles with genuine mentorship, institutional backing, and clear developmental paths — academia, established professions, organizations with real career ladders. The risk: the career direction may have been shaped by what the supporting system rewarded.`,
      },
      relationships: {
        sig: 3,
        mechanism: "正印 → vertical orientation, sustaining and directing in relationships",
        text: `The relational reference frame tends toward the vertical (mentor/mentee) rather than the horizontal (genuine peer equality). Often extraordinary in relationships where they can provide support and direction to others.`,
      },
      wealth: {
        sig: 2,
        mechanism: "正印 → institutionally backed income, endorsed paths, directionally validated earning",
        text: `Tends to generate wealth through paths that carry legitimate endorsement. Difficulty pursuing wealth through paths that aren't legitimized by the supporting structure — not from lack of capability but from lack of directional endorsement.`,
      },
      health: {
        sig: 4,
        mechanism: "正印 → nourishment and opening, inherited health approaches, maternal lineage",
        text: `The health approach tends to follow the mentors and support structures that formed the person. Classically related to the mother and maternal lineage in health pattern transmission.`,
      },
    },
    sixRelations: `正印 classically represents mother and maternal figures, formal mentors, and legitimate institutional backers. More broadly: the teachers who believed in you AND told you where to go with it; the institutions that accepted you and shaped your direction.`,  // [PRO]
    liunianSignatures: `A 正印 year or period brings mentorship opportunities, institutional recognition, educational advancement, and periods of genuine backing. Also: mother-related events, significant shifts in the primary support structure. For aligned charts: a period of genuine development within supported, directional growth. For charts where 正印 creates friction: direction given with the backing becoming a constraint.`,  // [PRO]
  },

};

// archetypeSource.js (STEM_CARD_DATA, TG_CARD_DATA) is bundled
// separately in production (Vite). In single-file artifact mode all data
// lives as inline constants below.

// ═══════════════════════════════════════════════════════════════════════════
// LAYER 0 — TIER CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════

const TIERS = { FREE: 0, SEEKER: 1, ADVISOR: 2, ORACLE: 3 };
const TIER_LABELS = { 0:"Free", 1:"Seeker", 2:"Advisor", 3:"Oracle" };
const TIER_PRICES = { 0:"$0", 1:"$9.99/mo", 2:"$19.99/mo", 3:"$29.99/mo" };
const FREE_EXPANSIONS_PER_DAY = 1;

// ═══════════════════════════════════════════════════════════════════════════
// COMPOUND_CARDS — 50 domEl × specificTenGod compound archetype cards
// 13 fields per card: hook, dynamic, your_gift, your_scene, your_interior,
// your_tension, your_fuel, your_cost, your_build, running_well, off_track,
// your_person, one_line.
// Populated via offline batch generation. Empty object = no content yet →
// engine renders placeholder skeleton. See DOC4 §9 for schema.
// ═══════════════════════════════════════════════════════════════════════════
const COMPOUND_CARDS = {};

// ═══════════════════════════════════════════════════════════════════════════
// LAYER 1 — BAZI CALCULATOR (pure JS, no LLM, fully deterministic)
// Verified: 1995-04-29 18:00 Beijing → 乙亥 庚辰 庚寅 乙酉 ✓
// ═══════════════════════════════════════════════════════════════════════════


// ████████████████████████████████████████████████████████████████████████
// LAYER 0 — CALCULATION ENGINE  →  src/engine/calculator.js
// Pure JS functions, no React. Takes birth data, returns chart JSON.
// ████████████████████████████████████████████████████████████████████████

const HS = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"];
const EB = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];
const STEM_ELEM   = {甲:"Wood",乙:"Wood",丙:"Fire",丁:"Fire",戊:"Earth",己:"Earth",庚:"Metal",辛:"Metal",壬:"Water",癸:"Water"};
const BRANCH_ELEM = {子:"Water",丑:"Earth",寅:"Wood",卯:"Wood",辰:"Earth",巳:"Fire",午:"Fire",未:"Earth",申:"Metal",酉:"Metal",戌:"Earth",亥:"Water"};
const STEM_YIN    = {甲:0,乙:1,丙:0,丁:1,戊:0,己:1,庚:0,辛:1,壬:0,癸:1};
const BRANCH_YIN  = {子:0,丑:1,寅:0,卯:1,辰:0,巳:1,午:0,未:1,申:0,酉:1,戌:0,亥:1};
const SOLAR_TERMS = [[1,6],[2,4],[3,6],[4,5],[5,6],[6,6],[7,7],[8,7],[9,8],[10,8],[11,7],[12,7]];

function getSolarTermDate(year, idx) {
  const [m, d] = SOLAR_TERMS[idx];
  const offset = year - 2000;
  const corr = offset * 0.2422 - Math.floor((offset + 1) / 4);
  return new Date(year, m - 1, Math.floor(d + corr));
}
function getSolarMonthIndex(date) {
  const y = date.getFullYear(); let idx = 0;
  for (let i = 0; i < 12; i++) if (date >= getSolarTermDate(y, i)) idx = i;
  return idx;
}
function getBaziYear(date) {
  const y = date.getFullYear();
  return date < getSolarTermDate(y, 1) ? y - 1 : y;
}
function getTenGod(dmStem, targetStem) {
  const dmEl = STEM_ELEM[dmStem], tEl = STEM_ELEM[targetStem];
  const same = STEM_YIN[dmStem] === STEM_YIN[targetStem];
  const GEN = {Wood:"Fire",Fire:"Earth",Earth:"Metal",Metal:"Water",Water:"Wood"};
  const CTL = {Wood:"Earth",Fire:"Metal",Earth:"Water",Metal:"Wood",Water:"Fire"};
  if (dmEl===tEl) return same ? {zh:"比肩",en:"Parallel Self",family:"self"} : {zh:"劫财",en:"Rob Wealth",family:"self"};
  if (GEN[dmEl]===tEl) return same ? {zh:"食神",en:"Food God",family:"output"} : {zh:"伤官",en:"Hurt Officer",family:"output"};
  if (GEN[tEl]===dmEl) return same ? {zh:"偏印",en:"Indirect Seal",family:"seal"} : {zh:"正印",en:"Direct Seal",family:"seal"};
  if (CTL[dmEl]===tEl) return same ? {zh:"偏财",en:"Indirect Wealth",family:"wealth"} : {zh:"正财",en:"Direct Wealth",family:"wealth"};
  if (CTL[tEl]===dmEl) return same ? {zh:"七杀",en:"Seven Killings",family:"officer"} : {zh:"正官",en:"Direct Officer",family:"officer"};
  return {zh:"—",en:"—",family:"none"};
}

// ── HYBRID ELEMENT CALCULATION — Method C + D with Method B modifier ─────────
// Documented in Bible Part 2.8. This replaces the old raw character count.
// Sources: 子平真诠 (Method A gates), 黄景泓打分法 (Method C weights),
//          藏干理论 (Method D hidden stems), 穷通宝鉴 (Method B seasonal phase)

// Method D — 藏干 Hidden Stems for all 12 branches
// Format: [{stem, element, weight}] where weights sum to 1.0
// 本气(Main)=0.6, 中气(Secondary)=0.3, 余气(Residual)=0.1; single=1.0; two=0.7/0.3
const HIDDEN_STEMS = {
  "子":[{s:"癸",e:"Water",w:1.0}],
  "丑":[{s:"己",e:"Earth",w:0.6},{s:"癸",e:"Water",w:0.3},{s:"辛",e:"Metal",w:0.1}],
  "寅":[{s:"甲",e:"Wood", w:0.6},{s:"丙",e:"Fire", w:0.3},{s:"戊",e:"Earth",w:0.1}],
  "卯":[{s:"乙",e:"Wood", w:1.0}],
  "辰":[{s:"戊",e:"Earth",w:0.6},{s:"乙",e:"Wood", w:0.3},{s:"癸",e:"Water",w:0.1}],
  "巳":[{s:"丙",e:"Fire", w:0.6},{s:"庚",e:"Metal",w:0.3},{s:"戊",e:"Earth",w:0.1}],
  "午":[{s:"丁",e:"Fire", w:0.7},{s:"己",e:"Earth",w:0.3}],
  "未":[{s:"己",e:"Earth",w:0.6},{s:"丁",e:"Fire", w:0.3},{s:"乙",e:"Wood", w:0.1}],
  "申":[{s:"庚",e:"Metal",w:0.6},{s:"壬",e:"Water",w:0.3},{s:"戊",e:"Earth",w:0.1}],
  "酉":[{s:"辛",e:"Metal",w:1.0}],
  "戌":[{s:"戊",e:"Earth",w:0.6},{s:"辛",e:"Metal",w:0.3},{s:"丁",e:"Fire", w:0.1}],
  "亥":[{s:"壬",e:"Water",w:0.7},{s:"甲",e:"Wood", w:0.3}],
};

// Method B — Corrected 12-branch seasonal phase multipliers
// Each branch treated individually based on 旺相休囚死 + hidden stem character.
// Earth months (辰未戌丑) use Earth-dominant phases, NOT their surrounding season.
// Derivation: 旺=1.3(ruling), 相=1.1(child of ruler), 休=0.9(parent of ruler, depleted),
//             囚=0.7(controller, overpowered), 死=0.6(controlled, most suppressed)
// Earth months modify these base scores by their specific hidden stems.
const SEASONAL_PHASE = {
  // ── Spring (Wood旺) ─────────────────────────────────────────────────────
  "寅":{Wood:1.3,Fire:1.1,Earth:0.6,Metal:0.7,Water:0.9}, // pure Wood (甲木本气)
  "卯":{Wood:1.3,Fire:1.1,Earth:0.6,Metal:0.7,Water:0.9}, // pure Wood (乙木本气)
  // ── Spring→Summer transition (Earth旺, Metal相) ──────────────────────────
  // 辰: 戊Earth本气. Metal=相(Earth→Metal=1.1). Fire=休(softened from 死 by approaching summer).
  // Wood=囚(softened by 乙木 lingering). Water=死(softened by 癸水 hidden).
  "辰":{Wood:0.8,Fire:0.9,Earth:1.3,Metal:1.1,Water:0.8},
  // ── Summer (Fire旺) ─────────────────────────────────────────────────────
  "巳":{Wood:0.9,Fire:1.3,Earth:1.1,Metal:0.6,Water:0.7}, // Fire主(丙火本气)
  "午":{Wood:0.9,Fire:1.3,Earth:1.1,Metal:0.6,Water:0.7}, // Fire主(丁火本气)
  // ── Summer→Autumn transition (Earth旺) ──────────────────────────────────
  // 未: 己Earth本气. 丁Fire lingers (休 elevated to 1.0). Metal相 weakened by heat=0.9. Water driest=0.6.
  "未":{Wood:0.7,Fire:1.0,Earth:1.3,Metal:0.9,Water:0.6},
  // ── Autumn (Metal旺) ────────────────────────────────────────────────────
  "申":{Wood:0.6,Fire:0.7,Earth:0.9,Metal:1.3,Water:1.1}, // Metal主(庚金本气)
  "酉":{Wood:0.6,Fire:0.7,Earth:0.9,Metal:1.3,Water:1.1}, // Metal主(辛金本气)
  // ── Autumn→Winter transition (Earth旺, Metal相 elevated) ─────────────────
  // 戌: 戊Earth本气. 辛Metal lingers strongly=1.2. 丁Fire fading=0.8. Wood=死(最死 in autumn).
  // Water rising toward winter=0.8.
  "戌":{Wood:0.6,Fire:0.8,Earth:1.3,Metal:1.2,Water:0.8},
  // ── Winter (Water旺) ────────────────────────────────────────────────────
  "亥":{Wood:1.1,Fire:0.6,Earth:0.7,Metal:0.9,Water:1.3}, // Water主(壬水本气)
  "子":{Wood:1.1,Fire:0.6,Earth:0.7,Metal:0.9,Water:1.3}, // Water主(癸水本气)
  // ── Winter→Spring transition (Earth旺) ──────────────────────────────────
  // 丑: 己Earth本气. 癸Water 死(softened by 癸水 present=0.9). 辛Metal相=1.0. Wood囚(stirring toward spring=0.9).
  // Fire coldest=0.6.
  "丑":{Wood:0.9,Fire:0.6,Earth:1.3,Metal:1.0,Water:0.9},
};

// Method C — Position weights (月支40%, 日支20%, 月干15%, 时干10%, 年柱10%, 时支5%)
// Day stem excluded — it IS the DM
const POS_WEIGHTS = {yearStem:0.05,yearBranch:0.05,monthStem:0.15,monthBranch:0.40,dayBranch:0.20,hourStem:0.10,hourBranch:0.05};

// Method D root modifier — does a heavenly stem have 通根 in branches?
function getRootMod(stemEl, pillars, pillarKey) {
  const branchMap = {yearBranch:pillars.year.branch,monthBranch:pillars.month.branch,dayBranch:pillars.day.branch,hourBranch:pillars.hour.branch};
  const samePillar = {yearStem:"yearBranch",monthStem:"monthBranch",hourStem:"hourBranch"};
  let hasRoot=false, samePillarRoot=false;
  for (const [bKey,branch] of Object.entries(branchMap)) {
    const hidden = HIDDEN_STEMS[branch]||[];
    if (hidden.some(h=>h.e===stemEl)) {
      hasRoot=true;
      if (samePillar[pillarKey]===bKey) samePillarRoot=true;
    }
  }
  return samePillarRoot?1.30:hasRoot?1.15:0.85;
}

// Compute weighted element composition — returns raw scores AND per-position contributions
// posContrib is used by applyBondModifiers to shift specific contributions
function computeElementComposition(pillars) {
  const phase = SEASONAL_PHASE[pillars.month.branch] || SEASONAL_PHASE["辰"];
  const posContrib = {}; // posKey → [{element, score}]
  const raw = {Metal:0, Wood:0, Fire:0, Earth:0, Water:0};

  const stemPos = [
    {key:"yearStem",  stem:pillars.year.stem,   w:POS_WEIGHTS.yearStem},
    {key:"monthStem", stem:pillars.month.stem,  w:POS_WEIGHTS.monthStem},
    {key:"hourStem",  stem:pillars.hour.stem,   w:POS_WEIGHTS.hourStem},
  ];
  for (const {key,stem,w} of stemPos) {
    const el = STEM_ELEM[stem]; if (!el) continue;
    const score = w * getRootMod(el,pillars,key) * (phase[el]||1);
    posContrib[key] = [{element:el, score}];
    raw[el] += score;
  }

  const branchPos = [
    {key:"yearBranch",  branch:pillars.year.branch,  w:POS_WEIGHTS.yearBranch},
    {key:"monthBranch", branch:pillars.month.branch, w:POS_WEIGHTS.monthBranch},
    {key:"dayBranch",   branch:pillars.day.branch,   w:POS_WEIGHTS.dayBranch},
    {key:"hourBranch",  branch:pillars.hour.branch,  w:POS_WEIGHTS.hourBranch},
  ];
  for (const {key,branch,w} of branchPos) {
    posContrib[key] = [];
    for (const {e,w:hw} of (HIDDEN_STEMS[branch]||[])) {
      const score = w * hw * (phase[e]||1);
      posContrib[key].push({element:e, score});
      raw[e] += score;
    }
  }
  return {raw, posContrib};
}

// Apply bond modifiers — stem bonds (天干五合), branch six-harmony (六合), three-harmony (三合)
// Returns bond-adjusted scores and set of stems bonded toward DM support (for 得势 gate)
function applyBondModifiers(raw, posContrib, pillars, dayStem) {
  const MAIN_QI = {"子":"Water","丑":"Earth","寅":"Wood","卯":"Wood","辰":"Earth","巳":"Fire","午":"Fire","未":"Earth","申":"Metal","酉":"Metal","戌":"Earth","亥":"Water"};
  const monthMQi = MAIN_QI[pillars.month.branch];
  const GEN = {Wood:"Fire",Fire:"Earth",Earth:"Metal",Metal:"Water",Water:"Wood"};
  const dmEl = STEM_ELEM[dayStem];

  const allStems    = [pillars.year.stem,  pillars.month.stem,  dayStem,            pillars.hour.stem];
  const allBranches = [pillars.year.branch,pillars.month.branch,pillars.day.branch, pillars.hour.branch];

  // Map branch → posContrib key
  const branchPosKey = b =>
    pillars.year.branch===b?"yearBranch":pillars.month.branch===b?"monthBranch":
    pillars.day.branch===b?"dayBranch":"hourBranch";
  // Map stem → posContrib key
  const stemPosKey = s =>
    pillars.year.stem===s?"yearStem":pillars.month.stem===s?"monthStem":"hourStem";

  const adj = {...raw};
  const bondedDMStems = new Set(); // non-DM stems whose bond converts them to DM support

  function shift(fromEl, toEl, amount) {
    adj[fromEl] = Math.max(0, (adj[fromEl]||0) - amount);
    adj[toEl]   = (adj[toEl]||0) + amount;
  }

  const STEM_BOND_PAIRS = [
    {s1:"甲",s2:"己",result:"Earth"},{s1:"乙",s2:"庚",result:"Metal"},
    {s1:"丙",s2:"辛",result:"Water"},{s1:"丁",s2:"壬",result:"Wood"},
    {s1:"戊",s2:"癸",result:"Fire"},
  ];
  const SIX_COMBO = [
    {b1:"子",b2:"丑",result:"Earth"},{b1:"寅",b2:"亥",result:"Wood"},
    {b1:"卯",b2:"戌",result:"Fire"},{b1:"辰",b2:"酉",result:"Metal"},
    {b1:"巳",b2:"申",result:"Water"},{b1:"午",b2:"未",result:"Earth"},
  ];
  const THREE_COMBO = [
    {branches:["寅","午","戌"],result:"Fire"},{branches:["申","子","辰"],result:"Water"},
    {branches:["亥","卯","未"],result:"Wood"},{branches:["巳","酉","丑"],result:"Metal"},
  ];

  // ── 1. Stem bonds (天干五合) ───────────────────────────────────────────────
  for (const {s1,s2,result} of STEM_BOND_PAIRS) {
    if (!allStems.includes(s1) || !allStems.includes(s2)) continue;
    const sf = monthMQi === result ? 0.80 : 0.40;
    for (const s of [s1,s2]) {
      if (s === dayStem) continue; // DM not shifted in composition
      const contribs = posContrib[stemPosKey(s)] || [];
      for (const c of contribs) {
        if (c.element === result) continue;
        shift(c.element, result, c.score * sf);
      }
      // Mark stem as bonded-supportive if bond result supports DM
      if (result === dmEl || GEN[result] === dmEl) bondedDMStems.add(s);
    }
  }

  // ── 2. Branch six-harmony (地支六合) ─────────────────────────────────────
  for (const {b1,b2,result} of SIX_COMBO) {
    if (!allBranches.includes(b1) || !allBranches.includes(b2)) continue;
    const sf = monthMQi === result ? 0.80 : 0.40;
    for (const b of [b1,b2]) {
      const contribs = posContrib[branchPosKey(b)] || [];
      for (const c of contribs) {
        if (c.element === result) continue;
        shift(c.element, result, c.score * sf);
      }
    }
  }

  // ── 3. Branch three-harmony (三合 / 半三合) ──────────────────────────────
  for (const {branches,result} of THREE_COMBO) {
    const present = branches.filter(b => allBranches.includes(b));
    if (present.length < 2) continue;
    const sf = present.length === 3
      ? (monthMQi === result ? 0.90 : 0.55)   // full three-combo
      : (monthMQi === result ? 0.60 : 0.30);   // half three-combo
    for (const b of present) {
      const contribs = posContrib[branchPosKey(b)] || [];
      for (const c of contribs) {
        if (c.element === result) continue;
        shift(c.element, result, c.score * sf);
      }
    }
  }

  return {adj, bondedDMStems};
}


// Method A gate check → 3-gate decision → strength label + score
// bondedDMStems: stems whose bond result supports DM (from applyBondModifiers)
function computeDMStrength(pillars, dmStem, bondedDMStems = new Set()) {
  const dmEl = STEM_ELEM[dmStem];
  const GEN  = {Wood:"Fire",Fire:"Earth",Earth:"Metal",Metal:"Water",Water:"Wood"};
  const MAIN_QI = {"子":"Water","丑":"Earth","寅":"Wood","卯":"Wood","辰":"Earth","巳":"Fire","午":"Fire","未":"Earth","申":"Metal","酉":"Metal","戌":"Earth","亥":"Water"};
  // 得令: month branch 本気 = DM element or generates DM (月令本気十神)
  const monthMainQi = MAIN_QI[pillars.month.branch] || "Earth";
  const gotLing = monthMainQi === dmEl || GEN[monthMainQi] === dmEl;
  // 得地: DM element rooted in any branch hidden stems
  const allBranches = [pillars.year.branch,pillars.month.branch,pillars.day.branch,pillars.hour.branch];
  const gotDi = allBranches.some(b=>(HIDDEN_STEMS[b]||[]).some(h=>h.e===dmEl));
  // 得势: supporting stems > draining (bond-converted stems count as supportive)
  const nonDMStems = [pillars.year.stem,pillars.month.stem,pillars.hour.stem];
  const supporting = nonDMStems.filter(s=>{
    const el = STEM_ELEM[s];
    return el===dmEl || GEN[el]===dmEl || bondedDMStems.has(s);
  });
  const gotShi = supporting.length > (nonDMStems.length - supporting.length);
  // 8-case decision table
  const g = (gotLing?4:0)+(gotDi?2:0)+(gotShi?1:0);
  if (g===7) return {strength:"extremely_strong",strengthScore:0.92};
  if (g===6||g===5||g===3) return {strength:"strong",strengthScore:0.72};
  if (g===4) return {strength:"moderate",strengthScore:0.50};
  if (g===2||g===1) return {strength:"weak",strengthScore:0.30};
  return {strength:"extremely_weak",strengthScore:0.12};
}


// ── COMPOUND ARCHETYPE SYSTEM — Doc2 §3 ─────────────────────────────────────
// Layer 1 key: [stem]_[band]_[tgPattern]   (150-key taxonomy, Doc2 §3)
// Layer 2 key: [domEl]_[specificTenGod]    (50-key pool, Doc2 §3)
//
// tgPattern is a 5-value axis. The yin/yang polarity split within Output and
// Authority families is resolved at Layer 2 via getDominantTenGod(), not here.
//   pure    = 比劫旺  (same element dominant)
//   rooted  = 印旺    (resource element dominant)
//   flowing = 食伤旺  (output element dominant — both 食神 and 伤官)
//   forging = 财旺    (wealth element dominant)
//   tested  = 官杀旺  (authority element dominant — both 正官 and 七杀)

const CATALYST_MAP = {
  Metal: {concentrated:["Fire","Water"], balanced:["Fire","Earth"],  open:["Earth","Metal"]},
  Wood:  {concentrated:["Metal","Fire"], balanced:["Metal","Water"], open:["Water","Wood"]},
  Water: {concentrated:["Earth","Wood"], balanced:["Earth","Metal"], open:["Metal","Water"]},
  Fire:  {concentrated:["Water","Earth"],balanced:["Water","Wood"],  open:["Wood","Fire"]},
  Earth: {concentrated:["Wood","Metal"], balanced:["Wood","Fire"],   open:["Fire","Earth"]},
};

// ── Helper: weighted yin/yang polarity of domEl across all 8 chart characters.
// Uses position weights (月令 highest) and hidden-stem weights (本气 > 中气 > 余气).
// Returns 0 (yang) or 1 (yin). Fallback = DM's own polarity on tie / no data.
function getDominantElementPolarity(domEl, dmStem, pillars) {
  if (!pillars) return STEM_YIN[dmStem];
  const { year, month, day, hour } = pillars;
  let yangW = 0, yinW = 0;

  // Visible heavenly stems (day stem excluded — that is the DM itself)
  const stemSlots = [
    [month?.stem, 3],   // 月干 — highest non-branch positional weight
    [hour?.stem,  2],
    [year?.stem,  1],
  ];
  for (const [stem, w] of stemSlots) {
    if (stem && STEM_ELEM[stem] === domEl)
      STEM_YIN[stem] === 0 ? (yangW += w) : (yinW += w);
  }

  // Earthly branch hidden stems — 月令本气 carries the most influence
  const branchSlots = [
    [month?.branch, 4],   // 月令 — highest overall weight
    [day?.branch,   2],
    [hour?.branch,  1.5],
    [year?.branch,  1],
  ];
  for (const [branch, baseW] of branchSlots) {
    if (!branch || !HIDDEN_STEMS[branch]) continue;
    for (const hs of HIDDEN_STEMS[branch]) {
      if (hs.e === domEl) {
        const w = baseW * hs.w; // hs.w = 本气0.6 / 中气0.3 / 余气0.1
        STEM_YIN[hs.s] === 0 ? (yangW += w) : (yinW += w);
      }
    }
  }

  if (yangW === 0 && yinW === 0) return STEM_YIN[dmStem]; // no data → fallback
  return yangW >= yinW ? 0 : 1;
}

// ── TG Pattern: the 5-value structural relationship axis (Doc2 §3).
// Yin/yang polarity within Output (食神/伤官) and Authority (正官/七杀) families
// is NOT resolved here — that lives in getDominantTenGod() for Layer 2 lookups.
function computeTgPattern(chart) {
  const dmEl   = chart.dayMaster.element;
  const GEN    = {Wood:"Fire",Fire:"Earth",Earth:"Metal",Metal:"Water",Water:"Wood"};
  const CTL    = {Wood:"Earth",Earth:"Water",Water:"Fire",Fire:"Metal",Metal:"Wood"};

  // Find highest-scoring present element (after bond modifiers)
  const sorted = Object.entries(chart.elements)
    .filter(([,d]) => d.present)
    .sort(([,a],[,b]) => (b.score||0) - (a.score||0));
  if (!sorted.length) return "pure";

  const dominant = sorted[0][0];

  if (dominant === dmEl)          return "pure";    // 比劫旺: self-element leads
  if (GEN[dominant] === dmEl)     return "rooted";  // 印旺: resource generates DM
  if (CTL[dmEl]     === dominant) return "forging"; // 财旺: DM controls dominant
  if (GEN[dmEl]     === dominant) return "flowing"; // 食伤旺: DM generates dominant
  if (CTL[dominant] === dmEl)     return "tested";  // 官杀旺: dominant controls DM

  return "pure"; // unreachable given exhaustive 五行生克 coverage above
}

// Resolve the specific Ten God for any dominant element vs Day Master.
// Uses getDominantElementPolarity to determine the dominant element's yin/yang,
// then compares with the DM's polarity to pick the precise TG within each family.
function getDominantTenGod(domEl, dmStem, pillars) {
  const dmEl  = STEM_ELEM[dmStem];
  const dmYin = STEM_YIN[dmStem];
  const domYin = getDominantElementPolarity(domEl, dmStem, pillars);
  const same  = dmYin === domYin;
  const GEN   = {Wood:"Fire",Fire:"Earth",Earth:"Metal",Metal:"Water",Water:"Wood"};
  const CTL   = {Wood:"Earth",Earth:"Water",Water:"Fire",Fire:"Metal",Metal:"Wood"};
  if (domEl === dmEl)          return same ? "比肩" : "劫财";
  if (GEN[domEl] === dmEl)     return same ? "偏印" : "正印";
  if (GEN[dmEl]  === domEl)    return same ? "食神" : "伤官";
  if (CTL[dmEl]  === domEl)    return same ? "偏财" : "正财";
  if (CTL[domEl] === dmEl)     return same ? "七杀" : "正官";
  return "比肩";
}


function getPrimaryCatalyst(chart) {
  const dmEl = chart.dayMaster.element;
  const band = getEnergyBand(chart.dayMaster.strength);
  const [primary, secondary] = CATALYST_MAP[dmEl]?.[band] || ["Fire","Water"];
  return primary === dmEl ? secondary : primary;
}

// Layer 1 lookup key: [stem]_[band]_[tgPattern]  (Doc2 §3, 150-key taxonomy)
function getArchetypeKey(chart) {
  const tgPattern = computeTgPattern(chart);
  const band      = getEnergyBand(chart.dayMaster.strength);
  return `${chart.dayMaster.stem}_${band}_${tgPattern}`;
}

// tgPattern display labels — 5 values (Doc2 §3)
const TG_PATTERN_LABELS = {
  pure:    "Pure",
  rooted:  "Rooted",
  flowing:  "Flowing",
  forging: "Forging",
  tested:  "Tested",
};
// Legacy alias — retained so any downstream code referencing TENSION_LABELS still works.
const TENSION_LABELS = TG_PATTERN_LABELS;


function calculateBaziChart(input) {
  const { year, month, day, hour, gender, location } = input;
  const longitudes = {beijing:120,shanghai:121,guangzhou:113,chengdu:104,newyork:-74,london:0,tokyo:139,paris:2,sydney:151};
  const lon = longitudes[location?.toLowerCase()] || 120;
  const trueSolarHour = (((hour - (lon - 120) / 15) % 24) + 24) % 24;
  const dateForDay = new Date(year, month-1, day, trueSolarHour);
  if (trueSolarHour >= 23) dateForDay.setDate(dateForDay.getDate() + 1);

  const baziYear = getBaziYear(new Date(year, month-1, day));
  const solarMonthIdx = getSolarMonthIndex(new Date(year, month-1, day));
  const ysi = ((baziYear-4)%10+10)%10, ybi = ((baziYear-4)%12+12)%12;
  const yearStem = HS[ysi], yearBranch = EB[ybi];
  const monthBranchIdx = (solarMonthIdx+1)%12;
  const monthBranch = EB[monthBranchIdx];
  const msi = (((ysi%5)*2+2)%10 + solarMonthIdx - 1 + 10) % 10;
  const monthStem = HS[msi];
  const anchor = new Date(1900,0,1);
  const daysElapsed = Math.floor((dateForDay - anchor) / 86400000);
  const dayStem = HS[daysElapsed%10], dayBranch = EB[(daysElapsed+10)%12];
  const hourBranchIdx = Math.floor((trueSolarHour+1)/2)%12;
  const hourBranch = EB[hourBranchIdx];
  const hourStem = HS[(HS.indexOf(dayStem)*2+hourBranchIdx)%10];

  // ── Hybrid element composition (C+D+B) ──────────────────────────────────
  const pillarsObj = {year:{stem:yearStem,branch:yearBranch},month:{stem:monthStem,branch:monthBranch},day:{stem:dayStem,branch:dayBranch},hour:{stem:hourStem,branch:hourBranch}};
  const {raw: rawScores, posContrib} = computeElementComposition(pillarsObj);
  // ── Apply bond modifiers (五合/六合/三合) ─────────────────────────────────
  const {adj: bondAdj, bondedDMStems} = applyBondModifiers(rawScores, posContrib, pillarsObj, dayStem);
  // Scale to 0-8 bar segments; ensure present elements show ≥1 bar
  const totalRaw = Object.values(bondAdj).reduce((s,v)=>s+v,0)||1;
  const elements = Object.fromEntries(
    Object.entries(bondAdj).map(([el,raw])=>{
      const pct = raw/totalRaw;
      const count = raw > 0.001 ? Math.max(1, Math.round(pct*10)) : 0;
      return [el,{count,score:parseFloat(pct.toFixed(3)),dominant:false,present:raw>0.001}];
    })
  );
  const maxCount = Math.max(...Object.values(elements).map(e=>e.count));
  if (maxCount>0) Object.values(elements).forEach(e=>{ e.dominant = e.count===maxCount; });
  // ── Method A gate check (with bond-adjusted 得势) ────────────────────────
  const dmStrengthResult = computeDMStrength(pillarsObj, dayStem, bondedDMStems);
  const { strength, strengthScore } = dmStrengthResult;

  const combinations = [];
  const tgMap = k => ({yearStem:getTenGod(dayStem,yearStem),monthStem:getTenGod(dayStem,monthStem),hourStem:getTenGod(dayStem,hourStem)}[k]);
  const outputCt = ["食神","伤官"].filter(g=>["yearStem","monthStem","hourStem"].some(k=>tgMap(k)?.zh===g)).length;
  const wealthCt  = ["偏财","正财"].filter(g=>["yearStem","monthStem","hourStem"].some(k=>tgMap(k)?.zh===g)).length;
  const officerCt = ["七杀","正官"].filter(g=>["yearStem","monthStem","hourStem"].some(k=>tgMap(k)?.zh===g)).length;
  const patternKey = outputCt>=1&&wealthCt>=1?"output_to_wealth":officerCt>=1?"institutional":"balanced";
  const PATTERNS = {
    output_to_wealth:{name:"食神生财格",en:"Creativity Generates Wealth",family:"output_to_wealth",description:"Creative output is the primary engine of wealth and success"},
    institutional:   {name:"正官格",    en:"Institutional Authority",    family:"institutional",    description:"Success through structured recognition"},
    balanced:        {name:"通关格",    en:"Balance and Flow",            family:"balanced",          description:"Harmony and adaptability across contexts"},
  };

  const yangYear = STEM_YIN[yearStem]===0;
  const male = gender==="male";
  const forward = (male&&yangYear)||(!male&&!yangYear);
  const birthDate = new Date(year,month-1,day);
  let termDays=0;
  if (forward) {
    outer: for (let off=0;off<=1;off++) for (let ti=0;ti<12;ti++) { const td=getSolarTermDate(baziYear+off,ti); if (td>birthDate){termDays=Math.round((td-birthDate)/86400000);break outer;} }
  } else {
    let prev=null;
    for (let ti=11;ti>=0;ti--) { const td=getSolarTermDate(baziYear,ti); if (td<birthDate){prev=td;break;} }
    if (!prev) prev=getSolarTermDate(baziYear-1,11);
    termDays=Math.round((birthDate-prev)/86400000);
  }
  const startAge=Math.max(1,Math.round(termDays/3));
  const currentAge=new Date().getFullYear()-year;
  const luckPillars=Array.from({length:9},(_,i)=>{
    const ns=HS[(forward?(msi+i+1)%10:((msi-i-1+10)%10))];
    const nb=EB[(forward?(monthBranchIdx+i+1)%12:((monthBranchIdx-i-1+12)%12))];
    const sa=startAge+i*10;
    return {order:i+1,stem:ns,branch:nb,element:STEM_ELEM[ns],stemTenGod:getTenGod(dayStem,ns),branchTenGod:getTenGod(dayStem,nb),startAge:sa,endAge:sa+9,startYear:year+sa,endYear:year+sa+9,isCurrent:currentAge>=sa&&currentAge<=sa+9,isPast:currentAge>sa+9};
  });

  const now=new Date();
  const cy=now.getFullYear();
  const fysi=((cy-4)%10+10)%10, fybi=((cy-4)%12+12)%12;
  const fyStem=HS[fysi],fyBranch=EB[fybi];
  const fmIdx=getSolarMonthIndex(now);
  const fmBranch=EB[(fmIdx+1)%12];
  const fmStem=HS[(((fysi%5)*2+2)%10+fmIdx-1+10)%10];
  const fdEl=Math.floor((now-anchor)/86400000);
  const fdStem=HS[fdEl%10],fdBranch=EB[(fdEl+10)%12];

  const dmEl = STEM_ELEM[dayStem];
  // Build partial chart with pillars so computeTgPattern can resolve
  // yin/yang polarity for the flowing/expressive and tested/pressured splits.
  const partialChart = {
    dayMaster: { element: dmEl, strength, stem: dayStem },
    elements,
    pillars: {
      year:  { stem: yearStem,  branch: yearBranch  },
      month: { stem: monthStem, branch: monthBranch },
      day:   { stem: dayStem,   branch: dayBranch   },
      hour:  { stem: hourStem,  branch: hourBranch  },
    },
  };
  const tgPattern    = computeTgPattern(partialChart);
  const catalyst     = getPrimaryCatalyst(partialChart);
  const archetypeKey = `${dayStem}_${getEnergyBand(strength)}_${tgPattern}`;
  return {
    meta:{birthDate:`${year}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`,birthHour:hour,location:location||"Beijing",gender,calculatedAt:now.toISOString().split("T")[0]},
    pillars:{year:{stem:yearStem,branch:yearBranch,stemElement:STEM_ELEM[yearStem],branchElement:BRANCH_ELEM[yearBranch],stemPolarity:STEM_YIN[yearStem]?"yin":"yang",branchPolarity:BRANCH_YIN[yearBranch]?"yin":"yang"},month:{stem:monthStem,branch:monthBranch,stemElement:STEM_ELEM[monthStem],branchElement:BRANCH_ELEM[monthBranch],stemPolarity:STEM_YIN[monthStem]?"yin":"yang",branchPolarity:BRANCH_YIN[monthBranch]?"yin":"yang"},day:{stem:dayStem,branch:dayBranch,stemElement:STEM_ELEM[dayStem],branchElement:BRANCH_ELEM[dayBranch],stemPolarity:STEM_YIN[dayStem]?"yin":"yang",branchPolarity:BRANCH_YIN[dayBranch]?"yin":"yang"},hour:{stem:hourStem,branch:hourBranch,stemElement:STEM_ELEM[hourStem],branchElement:BRANCH_ELEM[hourBranch],stemPolarity:STEM_YIN[hourStem]?"yin":"yang",branchPolarity:BRANCH_YIN[hourBranch]?"yin":"yang"}},
    dayMaster:{stem:dayStem,element:dmEl,polarity:STEM_YIN[dayStem]?"yin":"yang",strength,strengthScore},
    elements,
    missingElements:Object.keys(elements).filter(e=>!elements[e].present),
    tension: tgPattern, tgPattern, catalyst, archetypeKey,
    tenGods:{yearStem:getTenGod(dayStem,yearStem),yearBranch:getTenGod(dayStem,yearBranch),monthStem:getTenGod(dayStem,monthStem),monthBranch:getTenGod(dayStem,monthBranch),dayStem:{zh:"日主",en:"Day Master",family:"self"},dayBranch:getTenGod(dayStem,dayBranch),hourStem:getTenGod(dayStem,hourStem),hourBranch:getTenGod(dayStem,hourBranch)},
    combinations,pattern:PATTERNS[patternKey],luckPillars,
    currentFlowYear:{year:cy,stem:fyStem,branch:fyBranch,stemElement:STEM_ELEM[fyStem],branchElement:BRANCH_ELEM[fyBranch],stemTenGod:getTenGod(dayStem,fyStem),branchTenGod:getTenGod(dayStem,fyBranch)},
    currentFlowMonth:{stem:fmStem,branch:fmBranch,stemElement:STEM_ELEM[fmStem],branchElement:BRANCH_ELEM[fmBranch],stemTenGod:getTenGod(dayStem,fmStem),branchTenGod:getTenGod(dayStem,fmBranch)},
    currentFlowDay:{stem:fdStem,branch:fdBranch,stemElement:STEM_ELEM[fdStem],branchElement:BRANCH_ELEM[fdBranch],stemTenGod:getTenGod(dayStem,fdStem),branchTenGod:getTenGod(dayStem,fdBranch)},
  };
}


// ── TEMPLATE DATABASE ──────────────────────────────────────────────────────
// Layer 1 templates: key format [stem]_[band]_[tgPattern]  (Doc2 §3)
// 150 keys total (10 stems × 3 bands × 5 patterns).
// 1 key hand-authored as reference standard: 庚_concentrated_pure
// Remaining 149 generated via batchGenerate.js (see Doc4 §6).
// ─────────────────────────────────────────────────────────────────────────────

// TEMPLATE_DB + buildTemplateKey + findTemplate removed.
// Superseded by STEM_CARD_DATA blocks[] variant schema.

// [DEPRECATED] TG_FEEL
const TG_FEEL = {
  "正官":"a quiet recognition — something you've built is being seen clearly",
  "七杀":"a pressure to prove the work is real",
  "偏印":"a deepening of skill and unusual learning",
  "正印":"support and validation arriving from an unexpected direction",
  "食神":"your creative voice flowing easily and finding reception",
  "伤官":"an unconventional impulse that wants to break with convention",
  "正财":"steady financial and relational momentum",
  "偏财":"entrepreneurial opportunity — a chance to build on your own terms",
  "比肩":"heightened independence and self-reliance",
  "劫财":"competition sharpening your edge",
  "—":   "a neutral and open energy",
};

function staticFlowText(stemTG, branchTG, period) {
  const s = TG_FEEL[stemTG?.zh] || "an active energy";
  const b = TG_FEEL[branchTG?.zh] || "a grounding undercurrent";
  const pfx = { day:"Today carries", month:"This month carries", year:"This year carries" };
  return `${pfx[period]} ${s} on the surface, with ${b} beneath. Move with it rather than around it.`;
}

function miniChart(cd) {
  const cur = cd.luckPillars.find(l=>l.isCurrent);
  return `${cd.dayMaster.polarity} ${cd.dayMaster.element} (${cd.dayMaster.stem}) ${cd.dayMaster.strength} | ${Object.values(cd.pillars).map(p=>p.stem+p.branch).join(" ")} | Missing:${cd.missingElements.join(",")||"none"} | ${cd.pattern.en} | Decade:${cur?cur.stem+cur.branch+" "+cur.element:"none"} | FlowYear:${cd.currentFlowYear.stem}${cd.currentFlowYear.branch} | ${cd.meta.gender} ${cd.meta.birthDate}`;
}

async function genAboveFold(cd) {
  const sys = `Spiritual reading engine. No jargon. Plain English. Second person. Wise mentor.
Return ONLY valid JSON: {"nature":"1 sentence","fire":"1 sentence","path":"1 sentence","bonds":"1 sentence","decadeTheme":"3 words","decadeReading":"1 sentence"}`;
  return callAPI(sys, miniChart(cd));
}

async function genBelowFold(cd) {
  const sys = `Spiritual reading engine. No jargon. Plain English. Second person. Wise mentor.
Return ONLY valid JSON: {"strengths":"1 sentence","challenges":"1 sentence","love":"1 sentence","career":"1 sentence","chapter":"1 sentence","year":"1 sentence","council":"1 sentence","synthesis":"1 sentence"}`;
  return callAPI(sys, miniChart(cd));
}

async function expandSection(sectionId, chartData, teaser) {
  const ANGLES = {
    nature:"Core identity — felt presence, what it creates, what friction it causes.",
    fire:"Missing element as architecture — what absence created structurally, when it arrives.",
    path:"Causal chain of success — what generates what, shadow of the wrong path.",
    bonds:"Fusion patterns as identity and love — what merges with who they are.",
    strengths:"3 genuine gifts grounded in chart data, each with its shadow named honestly.",
    challenges:"3 structural shadows as features not flaws — cause, pattern, invitation.",
    love:"Depth of bonding + element tension in partnership — how they love best.",
    career:"Work blueprint + specific domain + institutional fit.",
    chapter:"Current decade — what arrived, what it asks, what becomes possible.",
    year:"Flow year pressure and opportunity — how to meet it.",
    council:"4 practical orientations: work, decade, relationships, missing element.",
    synthesis:"Central story + central tension + one thing worth keeping.",
  };
  const sys = `No jargon. Plain English. Second person present tense. Wise mentor.
Return ONLY: {"body":"para1\\n\\npara2"} — 2 paragraphs, 3-4 sentences each. Specific to this chart.`;
  const msg = `${miniChart(chartData)}\nTeaser: "${teaser}" | Angle: ${ANGLES[sectionId]}`;
  const result = await callAPI(sys, msg);
  return result?.body || "";
}

// ─── TIER-AWARE READING GENERATOR ─────────────────────────────────────────

async function generateReading(chartData, userTier, onBelowFold) {
  const SECTION_KEYS = ["nature","fire","path","bonds","strengths","challenges","love","career","chapter","year","council","synthesis"];
  const cur = chartData.luckPillars.find(l=>l.isCurrent);

  // ── FREE TIER: content rendered by renderArchetypeReading() via STEM_CARD_DATA blocks[].
  // generateReading() is retained only for SEEKER+ flow text (today/thisMonth/thisYear).
  if (userTier === TIERS.FREE) {
    const sections = {};
    SECTION_KEYS.forEach(k => { sections[k] = { teaser: "", paragraphs:[""] }; });
    return {
      sections,
      decades: cur ? [{ order: cur.order, zh: cur.stem+cur.branch, theme: "Your Current Chapter", teaser: "", reading: "" }] : [],
      today:     staticFlowText(chartData.currentFlowDay.stemTenGod,   chartData.currentFlowDay.branchTenGod,   "day"),
      thisMonth: staticFlowText(chartData.currentFlowMonth.stemTenGod, chartData.currentFlowMonth.branchTenGod, "month"),
      thisYear:  staticFlowText(chartData.currentFlowYear.stemTenGod,  chartData.currentFlowYear.branchTenGod,  "year"),
      _tier: "free",
      _templateKey: null,
      _exactMatch: false,
      _errors: [],
    };
  }
  // ── SEEKER+: live LLM above-fold, background below-fold ──────────────
  const aVal = await genAboveFold(chartData);
  const sections = {};
  SECTION_KEYS.forEach(k => { sections[k] = { teaser:"", paragraphs:[""] }; });
  ["nature","fire","path","bonds"].forEach(k => { sections[k].teaser = aVal[k]||""; });

  const reading = {
    sections,
    decades: cur ? [{ order:cur.order, zh:cur.stem+cur.branch, theme:aVal.decadeTheme||"", teaser:"", reading:aVal.decadeReading||"" }] : [],
    today:     staticFlowText(chartData.currentFlowDay.stemTenGod,   chartData.currentFlowDay.branchTenGod,   "day"),
    thisMonth: staticFlowText(chartData.currentFlowMonth.stemTenGod, chartData.currentFlowMonth.branchTenGod, "month"),
    thisYear:  staticFlowText(chartData.currentFlowYear.stemTenGod,  chartData.currentFlowYear.branchTenGod,  "year"),
    _tier: TIER_LABELS[userTier].toLowerCase(),
    _templateKey: null,
    _exactMatch: false,
    _errors: [],
  };

  genBelowFold(chartData).then(bVal => {
    ["strengths","challenges","love","career","chapter","year","council","synthesis"].forEach(k => {
      reading.sections[k].teaser = bVal[k]||"";
    });
    onBelowFold({ ...reading });
  }).catch(()=>{});

  return reading;
}

// ═══════════════════════════════════════════════════════════════════════════
// UI CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════


// ████████████████████████████████████████████████████████████████████████
// UI LAYER — REACT COMPONENTS  →  src/components/
// All React. Imports from content.js and engine/calculator.js.
// ████████████████████████████████████████████████████████████████████████

const C = {
  bg:"#f7f3ec",bgCard:"#f0ebe0",text:"#1d1b18",textSec:"#4a4540",textTer:"#8a8278",
  accent:"#8b7250",accentDark:"#5a4228",accentLight:"#c4a878",
  border:"#e0d8cc",borderLight:"#ece7df",fire:"#c4745a",
  tierFree:"#6a9860", tierSeeker:"#8b7250", tierAdvisor:"#4870a0", tierOracle:"#7a6080",
};
const EL_C  = {Metal:"#8ba3b8",Wood:"#7a9e6e",Fire:"#c4745a",Earth:"#b89a6a",Water:"#5a7fa8"};
const EL_ZH = {Metal:"金",Wood:"木",Fire:"火",Earth:"土",Water:"水"};

// ─── SECTION TITLES BY DAY MASTER ─────────────────────────────────────────
// Each stem carries its own archetype metaphor through all 12 section titles.
// The zh decorative character for "nature" = the stem itself (set dynamically).

const SECTION_TITLES_BY_STEM = {
  "甲": { // Yang Wood — The Oak
    nature:    "The Nature of Your Oak",
    fire:      "The Season You Were Waiting For",
    path:      "The Forest You Were Built to Become",
    bonds:     "The Roots That Run Beneath",
    strengths: "What You've Grown Into",
    challenges:"Where the Branch Bends",
    love:      "How the Oak Loves",
    career:    "The Work of Building a Forest",
    chapter:   "The Ring of Growth You're In",
    year:      "2026: Fire Clearing the Path",
    council:   "What the Roots Already Know",
    synthesis: "Standing at the Forest's Edge",
  },
  "乙": { // Yin Wood — The Vine
    nature:    "The Nature of Your Vine",
    fire:      "The Wall You Were Meant to Find",
    path:      "The Path That Winds and Arrives",
    bonds:     "Where You've Wrapped Your Roots",
    strengths: "What You've Grown Through",
    challenges:"Where the Vine Meets the Wind",
    love:      "How the Vine Loves",
    career:    "The Work of Reaching",
    chapter:   "The Wall You're Climbing Now",
    year:      "2026: Fire Along the Vine",
    council:   "What the Reaching Already Knows",
    synthesis: "Before You Release the Wall",
  },
  "丙": { // Yang Fire — The Sun
    nature:    "The Nature of Your Sun",
    fire:      "The Sky You Were Made to Cross",
    path:      "The Light That Draws People Forward",
    bonds:     "What Your Warmth Has Created",
    strengths: "What You Illuminate in Every Room",
    challenges:"Where the Light Meets the Long Shadow",
    love:      "How the Sun Loves",
    career:    "The Work of Genuine Illumination",
    chapter:   "The Arc of Sky You're Moving Through",
    year:      "2026: Fire Meets Fire",
    council:   "What the Light Already Knows",
    synthesis: "Before the Day Turns",
  },
  "丁": { // Yin Fire — The Candle
    nature:    "The Nature of Your Flame",
    fire:      "The Darkness You Were Made to Enter",
    path:      "The Work of Focused Light",
    bonds:     "What Your Flame Has Drawn Close",
    strengths: "What You Light in Every Room",
    challenges:"Where the Flame Meets the Wind",
    love:      "How the Candle Loves",
    career:    "The Work of Precision and Light",
    chapter:   "The Burning Season You're In",
    year:      "2026: When Flames Amplify",
    council:   "What the Flame Already Knows",
    synthesis: "Before the Wick Turns",
  },
  "戊": { // Yang Earth — The Mountain
    nature:    "The Nature of Your Mountain",
    fire:      "The Weather That Shapes the Stone",
    path:      "The Summit You Were Built to Be",
    bonds:     "What Has Been Built Upon You",
    strengths: "What You Hold Up",
    challenges:"Where the Mountain Meets the Sky",
    love:      "How the Mountain Loves",
    career:    "The Work of Holding Ground",
    chapter:   "The Elevation You're Living",
    year:      "2026: Fire on the Mountain",
    council:   "What the Stone Already Knows",
    synthesis: "The View From Here",
  },
  "己": { // Yin Earth — The Field
    nature:    "The Nature of Your Field",
    fire:      "The Seed You Were Made to Receive",
    path:      "The Harvest You Were Built to Grow",
    bonds:     "What Has Taken Root in You",
    strengths: "What You've Cultivated",
    challenges:"Where the Field Meets the Dry Season",
    love:      "How the Field Loves",
    career:    "The Work of Cultivation",
    chapter:   "The Season You're Growing Through",
    year:      "2026: Fire Ripening the Field",
    council:   "What the Soil Already Knows",
    synthesis: "Before the Next Planting",
  },
  "庚": { // Yang Metal — The Blade
    nature:    "The Nature of Your Blade",
    fire:      "The Forge You Were Built For",
    path:      "How You Were Made to Succeed",
    bonds:     "The Rare Thread Running Through You",
    strengths: "What You Carry Into Every Room",
    challenges:"Where You Meet Yourself",
    love:      "Your Heart",
    career:    "Your Work in the World",
    chapter:   "The Chapter You're Living Now",
    year:      "2026: The Year of Fire",
    council:   "A Council for This Season",
    synthesis: "A Word Before You Go",
  },
  "辛": { // Yin Metal — The Jewel
    nature:    "The Nature of Your Jewel",
    fire:      "The Pressure That Creates the Facet",
    path:      "The Standard You Were Made to Hold",
    bonds:     "What Has Been Polished Alongside You",
    strengths: "What You Clarify in Every Room",
    challenges:"Where the Jewel Meets the Rough",
    love:      "How the Jewel Loves",
    career:    "The Work of Discernment",
    chapter:   "The Facet Being Cut Right Now",
    year:      "2026: Fire in the Setting",
    council:   "What the Clarity Already Knows",
    synthesis: "The Final Polish",
  },
  "壬": { // Yang Water — The Ocean
    nature:    "The Nature of Your Ocean",
    fire:      "The Shore That Gives You Shape",
    path:      "The Current You Were Built to Follow",
    bonds:     "What Moves Beneath the Surface",
    strengths: "What You Carry in the Deep",
    challenges:"Where the Ocean Meets the Shore",
    love:      "How the Ocean Loves",
    career:    "The Work of the Deep",
    chapter:   "The Tide You're Living Now",
    year:      "2026: Fire on the Water",
    council:   "What the Deep Already Knows",
    synthesis: "Before the Next Tide",
  },
  "癸": { // Yin Water — The Rain
    nature:    "The Nature of Your Rain",
    fire:      "The Sky You Were Made to Fall From",
    path:      "The Ground You Were Made to Find",
    bonds:     "What Your Rain Has Fed",
    strengths: "What You Nourish Wherever You Fall",
    challenges:"Where the Rain Meets the Stone",
    love:      "How the Rain Loves",
    career:    "The Work of Quiet Nourishment",
    chapter:   "The Cloud You're Moving Through",
    year:      "2026: Steam Rising",
    council:   "What the Rain Already Knows",
    synthesis: "Before the Sky Clears",
  },
};

// Section nums, tags, zh decoratives — static across all stems
const SECTION_BASE = {
  nature:    { num:"I",    tag:"Who You Are",    zh_static:"木" },
  fire:      { num:"II",   tag:"Missing Element", zh_static:"火" },
  path:      { num:"III",  tag:"Your Path",       zh_static:"路" },
  bonds:     { num:"IV",   tag:"Hidden Bonds",    zh_static:"合" },
  strengths: { num:"V",    tag:"Strengths",       zh_static:"才" },
  challenges:{ num:"VI",   tag:"Challenges",      zh_static:"难" },
  love:      { num:"VII",  tag:"Love",            zh_static:"情" },
  career:    { num:"VIII", tag:"Career",          zh_static:"业" },
  chapter:   { num:"IX",  tag:"Life Chapter",    zh_static:"运" },
  year:      { num:"X",   tag:"This Year",       zh_static:"年" },
  council:   { num:"XI",  tag:"Guidance",        zh_static:"道" },
  synthesis: { num:"XII", tag:"Closing",         zh_static:"终" },
};

// Returns complete section meta for a given Day Master stem
// The "nature" section's zh shows the user's own stem character
function getSectionMeta(dayMasterStem) {
  const titles = SECTION_TITLES_BY_STEM[dayMasterStem] || SECTION_TITLES_BY_STEM["庚"];
  const meta = {};
  for (const id of Object.keys(SECTION_BASE)) {
    meta[id] = {
      ...SECTION_BASE[id],
      title: titles[id],
      // nature section: zh = user's own stem (personalised)
      // all others: zh = the static decorative character
      zh: id === "nature" ? (dayMasterStem || "元") : SECTION_BASE[id].zh_static,
    };
  }
  return meta;
}

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Noto+Serif+SC:wght@400;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'EB Garamond',Georgia,serif;background:${C.bg};color:${C.text}}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.fade{animation:fadeIn 0.4s ease forwards}
@keyframes pulse{0%,100%{opacity:0.4}50%{opacity:1}}
.pulse{animation:pulse 1.8s ease-in-out infinite}
*::-webkit-scrollbar{display:none}
*{scrollbar-width:none;-ms-overflow-style:none}
`;

// ═══════════════════════════════════════════════════════════════════════════
// UI COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

// ─── DAY MASTER HERO ──────────────────────────────────────────────────────────

// Element visual motifs — called inside component render, not at module level
function getElementMotif(element, color) {
  const s = {position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",opacity:0.12};
  if (element === "Metal") return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={s}>
      <polygon points="40,8 72,26 72,54 40,72 8,54 8,26" stroke={color} strokeWidth="1.5" fill="none"/>
      <polygon points="40,18 62,30 62,50 40,62 18,50 18,30" stroke={color} strokeWidth="0.8" fill="none"/>
      <line x1="40" y1="8" x2="40" y2="18" stroke={color} strokeWidth="1"/>
      <line x1="72" y1="26" x2="62" y2="30" stroke={color} strokeWidth="1"/>
      <line x1="72" y1="54" x2="62" y2="50" stroke={color} strokeWidth="1"/>
      <line x1="40" y1="72" x2="40" y2="62" stroke={color} strokeWidth="1"/>
      <line x1="8" y1="54" x2="18" y2="50" stroke={color} strokeWidth="1"/>
      <line x1="8" y1="26" x2="18" y2="30" stroke={color} strokeWidth="1"/>
    </svg>
  );
  if (element === "Wood") return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={s}>
      <path d="M40 72 C40 72 40 40 40 20" stroke={color} strokeWidth="1.5"/>
      <path d="M40 48 C30 38 14 34 8 30" stroke={color} strokeWidth="1"/>
      <path d="M40 48 C50 38 66 34 72 30" stroke={color} strokeWidth="1"/>
      <path d="M40 36 C32 26 20 22 14 18" stroke={color} strokeWidth="0.8"/>
      <path d="M40 36 C48 26 60 22 66 18" stroke={color} strokeWidth="0.8"/>
      <path d="M40 26 C36 18 32 12 30 8" stroke={color} strokeWidth="0.6"/>
      <path d="M40 26 C44 18 48 12 50 8" stroke={color} strokeWidth="0.6"/>
    </svg>
  );
  if (element === "Fire") return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={s}>
      {[0,45,90,135,180,225,270,315].map((deg,i) => (
        <line key={i} x1="40" y1="40"
          x2={40 + Math.cos(deg*Math.PI/180)*(i%2===0?30:20)}
          y2={40 + Math.sin(deg*Math.PI/180)*(i%2===0?30:20)}
          stroke={color} strokeWidth={i%2===0?"1.2":"0.7"}/>
      ))}
      <circle cx="40" cy="40" r="8" stroke={color} strokeWidth="1" fill="none"/>
      <circle cx="40" cy="40" r="16" stroke={color} strokeWidth="0.6" fill="none" strokeDasharray="3 3"/>
    </svg>
  );
  if (element === "Earth") return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={s}>
      <rect x="14" y="14" width="52" height="52" stroke={color} strokeWidth="1.5" fill="none"/>
      <rect x="24" y="24" width="32" height="32" stroke={color} strokeWidth="0.8" fill="none"/>
      <rect x="34" y="34" width="12" height="12" stroke={color} strokeWidth="0.6" fill="none"/>
      <line x1="14" y1="40" x2="66" y2="40" stroke={color} strokeWidth="0.6"/>
      <line x1="40" y1="14" x2="40" y2="66" stroke={color} strokeWidth="0.6"/>
    </svg>
  );
  if (element === "Water") return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={s}>
      <path d="M10 40 Q20 28 30 40 Q40 52 50 40 Q60 28 70 40" stroke={color} strokeWidth="1.5" fill="none"/>
      <path d="M10 54 Q20 42 30 54 Q40 66 50 54 Q60 42 70 54" stroke={color} strokeWidth="1" fill="none"/>
      <path d="M10 26 Q20 14 30 26 Q40 38 50 26 Q60 14 70 26" stroke={color} strokeWidth="1" fill="none"/>
      <path d="M10 68 Q20 56 30 68 Q40 80 50 68 Q60 56 70 68" stroke={color} strokeWidth="0.6" fill="none"/>
      <path d="M10 12 Q20 0 30 12 Q40 24 50 12 Q60 0 70 12" stroke={color} strokeWidth="0.6" fill="none"/>
    </svg>
  );
  return null;
}

// Strength → ring fill percentage and label
const STRENGTH_RING = {
  extremely_strong: { pct:0.92, label:"Extremely Strong", sublabel:"The element is dominant — pure and concentrated" },
  strong:           { pct:0.72, label:"Strong",           sublabel:"Well-supported and self-directed" },
  moderate:         { pct:0.50, label:"Balanced",         sublabel:"Flexible — works across many conditions" },
  weak:             { pct:0.30, label:"Receptive",        sublabel:"Needs the right conditions to come through fully" },
  extremely_weak:   { pct:0.12, label:"Extremely Receptive", sublabel:"Highly context-dependent — finds strength through support" },
};


// ████████████████████████████████████████████████████████████████████████
// CONTENT LAYER — STATIC DATA  →  src/content/content.js
// All scripted text. No logic. The single source of truth for all
// reading content. This entire block moves to content.js on migration.
// ████████████████████████████████████████████████████████████████████████

// ═══════════════════════════════════════════════════════════════════════════
// WHO YOU ARE — STATIC TEMPLATE DATA
// Tier-independent: same content for Free / Seeker / Advisor / Oracle
// Format: teaser (1-2 sentence hook) + paragraphs (2 paragraphs, ≤500 words total)
// Source: hardcoded per Day Master stem — no LLM, no runtime generation
// ═══════════════════════════════════════════════════════════════════════════

// [DEPRECATED] WHO_YOU_ARE — fallback until STEM_CARD_DATA.js generated.
const WHO_YOU_ARE = {
  "甲": {
    teaser: "You don't grow toward things because you decided to — you grow because stopping would require an effort you don't have access to.",
    bands: {
      concentrated: {
        p1: "As a Yang Wood type at concentrated energy, your default is forward projection — identifying where something is going before others have finished assessing where it is. The specific consequence most people notice: you've mentally moved to the next phase before the current one is complete.",
        p2: "Your drive is self-generating and strong enough to outpace your own foundations. The recurring challenge isn't initiating — it's consolidating. What defines this chapter is learning to build something durable rather than something fast.",
      },
      balanced: {
        p1: "As a Yang Wood type at balanced energy, you can hold a long-term direction without abandoning what's in progress — a combination your type doesn't arrive at naturally. What you're producing now has a staying power your earlier work often lacked.",
        p2: 'Your drive is real but no longer untethered. People around you have started to experience you as someone they can plan around rather than just admire. What defines this chapter is protecting that equilibrium, which your natural instinct will consistently pressure you to abandon.',
      },
      open: {
        p1: "As a Yang Wood type at receptive energy, your orientation toward growth is fully intact — what's changed is your relationship to conditions. The key insight: your output variance by environment is higher than most types. Context is the variable, not capability.",
        p2: "You're selective in a way that looks like hesitation from outside but operates as precision from inside. What defines this chapter is getting more deliberate about the conditions you choose — because the difference between the right environment and the wrong one is categorical for your type.",
      },
    },
  },
  "乙": {
    teaser: 'The path you take to get somewhere looks indirect to everyone watching — and arrives exactly where you always intended.',
    bands: {
      concentrated: {
        p1: 'As a Yin Wood type at concentrated energy, your thinking is navigational — reading surfaces, finding angles, identifying the path that actually arrives somewhere. The specific insight: you often know the route before you can explain the reasoning, and your instinct is usually correct.',
        p2: "Your independence expresses through strategy rather than assertion. You don't need to win the room — you need to arrive where you intended. What defines this chapter is whether you're committed to a specific destination rather than optimising for perpetual navigability.",
      },
      balanced: {
        p1: "As a Yin Wood type at balanced energy, your adaptability is now in service of a specific direction. You can hold your position without becoming rigid — taking in what's useful, discarding what isn't. People experience you as both reliable and resourceful simultaneously.",
        p2: "Your intelligence is pointed rather than exploratory right now. What defines this chapter is naming clearly what you're building — because the Yin Wood in balance tends to be making something more significant than they've articulated, and the articulation would accelerate it.",
      },
      open: {
        p1: "As a Yin Wood type at receptive energy, you've become attuned to which surfaces are worth the full reach. The specific insight: your instinct for what won't work is as reliable as your instinct for what will. You've learned to trust the negative signal.",
        p2: "You operate best when the environment genuinely supports your approach — not just fails to obstruct it. Those are different conditions, and you've developed the ability to tell them apart. What defines this chapter is becoming more deliberate about choosing the right walls to climb.",
      },
    },
  },
  "丙": {
    teaser: "People don't decide to orient toward you. They simply find themselves doing it.",
    bands: {
      concentrated: {
        p1: 'As a Yang Fire type at concentrated energy, your effect on people is structural rather than intentional. People often feel more capable after contact with you — and may not attribute that to you, which means the effect is real but frequently unaccounted for.',
        p2: "Your warmth operates at the same level whether or not you've chosen to direct it. The cost accumulates before you notice it, and people assume you're inexhaustible. What defines this chapter is learning to direct what you give rather than simply give more.",
      },
      balanced: {
        p1: 'As a Yang Fire type at balanced energy, your ability to affect people is directed rather than diffuse — and matched by a growing capacity to receive in return. The specific insight: your presence now creates trust rather than just warmth, and trust is more durable than enthusiasm.',
        p2: "You're learning to distinguish between giving that refills you and giving that depletes you. At this level reciprocity is becoming real rather than aspirational. What defines this chapter is protecting the selective generosity you've developed, rather than reverting to giving everything within reach.",
      },
      open: {
        p1: "As a Yang Fire type at receptive energy, your warmth is genuine but context-dependent in ways most people around you don't understand. The specific insight: what looks like inconsistency from outside is actually precision — a developed sense of where your warmth genuinely belongs.",
        p2: "You need conditions that sustain you in order to sustain others — and you've stopped pretending otherwise. What defines this chapter is becoming explicit about what genuine reciprocity looks like for you, rather than accepting its appearance as the real thing.",
      },
    },
  },
  "丁": {
    teaser: 'What you give your full attention to becomes more fully itself — that is the rarest quality in a person.',
    bands: {
      concentrated: {
        p1: "As a Yin Fire type at concentrated energy, your defining characteristic is the completeness of your attention — you illuminate what you're pointed at rather than everything in the room. The specific insight: people feel genuinely understood after real contact with you in a way they don't often feel elsewhere.",
        p2: "Your investment in whatever you engage with is total — you don't have a partial mode. The same quality that makes people feel profoundly seen can arrive at a force the moment didn't require. What defines this chapter is developing the range to choose how fully you engage.",
      },
      balanced: {
        p1: "As a Yin Fire type at balanced energy, you've developed what concentrated types typically lack: the judgment to calibrate rather than simply maximise your engagement. What you give is meaningful because it's targeted rather than uniform. People trust your assessments because you don't offer them indiscriminately.",
        p2: 'Your focus is a tool you direct rather than a force you inhabit. Your work and relationships now reflect a more accurate read of what merits deepest investment. What defines this chapter is learning to receive the same quality of attention you offer — harder for your type than it should be.',
      },
      open: {
        p1: "As a Yin Fire type at receptive energy, your capacity for focused attention is intact — but it arrives at its fullest in contexts of real exchange. The specific insight: your full engagement isn't available to everyone, and that selectivity is how the quality is maintained rather than diluted.",
        p2: "You produce your best work when you're in situations that offer something genuine in return. At this level that's not a limitation but a discovered truth about how your type functions. What defines this chapter is acting on that knowledge rather than extending full attention to contexts that won't reciprocate.",
      },
    },
  },
  "戊": {
    teaser: "You provide something most people spend their lives looking for: ground that doesn't move when everything else does.",
    bands: {
      concentrated: {
        p1: "As a Yang Earth type at concentrated energy, your presence stabilises everything around you — not because you try, but because consistency is the material you're made of. The specific insight: you've been a structural foundation for people who didn't fully realise they were building on you.",
        p2: "Your reliability doesn't require acknowledgment — which is both your most distinctive quality and your most unexamined cost. People have never had to account for what you need because you've always appeared not to need anything. What defines this chapter is examining what you're holding and whether all of it still needs to be.",
      },
      balanced: {
        p1: "As a Yang Earth type at balanced energy, you've built something your type doesn't arrive at naturally: the ability to adapt without experiencing it as instability. The specific insight: people experience you as genuinely trustworthy now rather than just predictable — and those are meaningfully different things.",
        p2: "Your reliability now includes the capacity to change course when the ground has genuinely shifted. You've started asking whether structures still serve their purpose rather than simply maintaining them. What defines this chapter is applying that question regularly to the habits and commitments you're currently sustaining.",
      },
      open: {
        p1: "As a Yang Earth type at receptive energy, your groundedness is real but requires conditions that actively support it — which tends to surprise people who've assumed your stability was unconditional. The specific insight: stable people are routinely assumed not to need support, which explains how you've ended up carrying more than you should.",
        p2: "Your reliability isn't self-replenishing. The work isn't being stable for others — it's ensuring what sustains your stability is actually present. What defines this chapter is the shift from quietly absorbing what isn't returned to naming what genuine reciprocity looks like for you.",
      },
    },
  },
  "己": {
    teaser: 'The growth you create in others is so quiet you have probably never fully accounted for what you leave behind.',
    bands: {
      concentrated: {
        p1: "As a Yin Earth type at concentrated energy, your natural mode is developmental — you notice what people and things need and respond before it's stated. The specific insight: people around you grow in ways they often attribute to themselves, without recognising the conditions you created made it possible.",
        p2: "Your care is continuous and doesn't require acknowledgment — which is what makes you genuinely valuable and the primary way you accumulate unreciprocated investment. What defines this chapter: is what you're putting out being genuinely matched, or have you been managing a deficit by not looking at it?",
      },
      balanced: {
        p1: "As a Yin Earth type at balanced energy, the care you give is increasingly matched by care you receive — and that reciprocity is changing everything you produce. You've become more targeted in where you invest, not less generous. The specific insight: selectivity is producing better outcomes than giving to everything that needed it.",
        p2: "You're treating your own development as a legitimate priority rather than something to attend to after everyone else. At this level the relationships you're most invested in are ones where growth runs in both directions. What defines this chapter is protecting that reciprocity under accumulated social pressure to revert.",
      },
      open: {
        p1: "As a Yin Earth type at receptive energy, your ability to support others is real — but performs substantially better when conditions return something genuine. The specific insight: in genuinely supportive conditions your contribution produces growth that transactional approaches can't replicate. Conditions are the variable, not your capability.",
        p2: "You've become more accurate at distinguishing genuine reciprocity from its appearance. At this level the work isn't output — it's environment selection. What defines this chapter is acting consistently on that distinction rather than extending care into contexts that drain rather than return.",
      },
    },
  },
  "庚": {
    teaser: "You don't sharpen your edge. You were born with one — and the question has always been what to cut toward.",
    bands: {
      concentrated: {
        p1: "As a Yang Metal type at concentrated energy, your thinking is evaluative by default — you register what's actually true before others have finished forming their first impression. The specific consequence: you're often several steps ahead of the room, waiting for everyone else to catch up.",
        p2: "Your independence is structural, not a preference. You've always found it difficult to sustain effort inside someone else's framework. At this level the drive needs something worthy to push against — without that, the same quality that makes you exceptional becomes restlessness. The question that defines this chapter isn't capability — it's direction.",
      },
      balanced: {
        p1: 'As a Yang Metal type at balanced energy, your analytical precision is directed toward something specific rather than simply operating as your default mode. The specific insight: people now come to you for accurate assessments — not reassuring ones — because your track record has earned that particular form of trust.',
        p2: "Your clarity is in service of something rather than simply present. The work isn't sharpening further — it's staying pointed at what you've chosen rather than being redirected by every context that presents itself as worthy. What defines this chapter is that protection of direction.",
      },
      open: {
        p1: "As a Yang Metal type at receptive energy, your precision is fully intact — what's developed is a more sophisticated sense of which contexts actually deserve and use it. The specific insight: the gap between competent and exceptional is larger for your type than most — the right conditions are a significant multiplier.",
        p2: "You've become more selective about where you apply the full force of what you bring — not from hesitation but from accuracy about where it will actually land. What defines this chapter is getting deliberate about context selection, because the environments that deserve your precision are worth seeking.",
      },
    },
  },
  "辛": {
    teaser: 'You notice things others pass over as if they were obvious — and cannot pretend the difference between what is excellent and what merely appears to be.',
    bands: {
      concentrated: {
        p1: "As a Yin Metal type at concentrated energy, your perception of quality is automatic — you feel the difference between genuine and performed before conscious assessment begins. The specific insight: your assessments tend to be accurate before the supporting evidence is visible to others. You've been right about things well before anyone else could verify it.",
        p2: "Your standards are a structural feature of how you experience the world. At this level the gap between what you perceive as possible and what's available is consistently present. What defines this chapter is applying the rigour selectively rather than continuously — reserving it for what actually merits it.",
      },
      balanced: {
        p1: "As a Yin Metal type at balanced energy, your standards are generating excellent output rather than persistent dissatisfaction. The gap between what you perceive as achievable and what exists has narrowed. The specific insight: what you're producing has a calibre that less rigorous approaches simply couldn't generate.",
        p2: "You've developed the ability to distinguish productive refinement from refinement past completion. Your discernment is functioning as a creative tool rather than a critical one — producing rather than evaluating. What defines this chapter is learning to finish to your own standard and stop, which is harder for your type than it sounds.",
      },
      open: {
        p1: "As a Yin Metal type at receptive energy, your discernment performs at its fullest in settings that genuinely warrant that level of precision. The specific insight: you've developed an accurate sense of which environments are which — even when acting on that assessment has been difficult.",
        p2: "Your standards haven't lowered — you've become more deliberate about where you apply them, and those are meaningfully different things. What defines this chapter is choosing and protecting contexts that merit your full rigour, rather than applying it uniformly and exhausting the clarity on what doesn't deserve it.",
      },
    },
  },
  "壬": {
    teaser: 'The depth you carry has always been larger than the space you have been given to show it.',
    bands: {
      concentrated: {
        p1: "As a Yang Water type at concentrated energy, you process at a scale most contexts aren't built to match. People sense you know more than you're saying — because you usually do. The specific insight: being encountered at the surface when you're actually much further down is a consistent feature of your life.",
        p2: "Your intelligence is expansive by nature — you hold multiple frameworks simultaneously and find it genuinely difficult to operate at the level most exchanges require. The challenge isn't depth — it's translation. What defines this chapter is building specific channels through which what you carry can actually reach people.",
      },
      balanced: {
        p1: "As a Yang Water type at balanced energy, your analytical range is finding channels through which it can actually reach and affect people. You've moved from operating at depth and waiting, to meeting people where they are and drawing them further. The specific insight: the work you're doing now compounds in ways that aren't immediately visible.",
        p2: "You're in a productive state where the scope of your thinking is in service of specific outcomes rather than simply present. The depth is landing rather than just existing. What defines this chapter is deepening what's already working rather than expanding into new territory because the capacity is there.",
      },
      open: {
        p1: "As a Yang Water type at receptive energy, your analytical capacity is sensitive to the quality of intellectual exchange in your environment. The specific insight: one-directional exchanges — where you bring depth and receive surface — are genuinely depleting in a way that's difficult to explain to people who haven't experienced the difference.",
        p2: "You've developed accurate instincts about which contexts are worth your full engagement — where thinking feels generative versus where it feels present but not landing. What defines this chapter is making more deliberate choices about which those are, and protecting access to them.",
      },
    },
  },
  "癸": {
    teaser: "You sense what's actually true in a room before anyone has said the thing — and you have learned, slowly, to trust that sensing.",
    bands: {
      concentrated: {
        p1: "As a Yin Water type at concentrated energy, your perceptive attunement is your most fundamental operating characteristic — you register what someone is actually feeling with an accuracy most people experience as uncanny. The specific insight: you regularly know things about people that they haven't explicitly told you.",
        p2: "Your sensitivity is continuous — you're always receiving, whether or not you've chosen to attend. At this level the permeability that makes you perceptive also makes it difficult to maintain a clear boundary between what you're sensing and what you're carrying. What defines this chapter is building structures that keep the sensitivity a tool rather than a weight.",
      },
      balanced: {
        p1: "As a Yin Water type at balanced energy, your attunement is functioning as navigational data rather than something that simply happens to you. Your perception is as accurate as ever — what's changed is your relationship to it. The specific insight: the people you're investing in are ones you've actually chosen rather than drifted into.",
        p2: "You've stopped accepting the appearance of reciprocity as the real thing — a development now shaping the quality of your closest relationships. What defines this chapter is trusting your sensitivity enough to act on what it tells you, particularly in the places where acting on it is uncomfortable.",
      },
      open: {
        p1: "As a Yin Water type at receptive energy, your attunement is real and distinctive — but it isn't self-sustaining. It requires genuine reciprocity to remain at full function. The specific insight: your contribution in genuinely reciprocal conditions is among the most specific and valuable available. Conditions are the variable, not your capability.",
        p2: "You've become more deliberate about which people and contexts get full access to what you carry — not from withholding but from understanding how your sensitivity actually works. What defines this chapter is allowing yourself to receive genuine nourishment without treating that as weakness — because for your type, it's what makes everything else possible.",
      },
    },
  },
};


// ─── ARCHETYPE BRAND DATA ─────────────────────────────────────────────────
// Manifesto lines, seals, and refined gifts/edge for all 10 Day Masters.
// These are the brand-layer assets — concise, ownable, viral-ready.

const ARCHETYPE_MANIFESTO = {
  "甲": "Builds what others can only imagine. Growth is not ambition — it is the architecture.",
  "乙": "Finds the path no one else sees. Arrives exactly where it intended.",
  "丙": "Doesn't choose to illuminate. Simply is light — and everything near it comes alive.",
  "丁": "Illuminates completely what it's pointed at. Nothing more. Nothing less.",
  "戊": "People orient their lives around it without knowing why. The ground that holds.",
  "己": "Grows things in silence. Leaves everything it touches more alive than it found it.",
  "庚": "Precision before intention · An edge is never given — it is forged.",
  "辛": "Perceives what is excellent the way others perceive temperature — before the question is asked.",
  "壬": "Holds more beneath the surface than it ever shows. Always has. Always will.",
  "癸": "Knows what is true before it is spoken. Nourishes what it touches without announcing it.",
};

// Archetype seals — unique geometric SVG marks, one per Day Master
// Rendered at 72×72, element color, opacity 0.9
function ArchetypeSeal({ stem, color, size = 72 }) {
  const s = size, h = s / 2;
  const seals = {
    "甲": ( // Oak: trunk + two branch tiers + root suggestions
      <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
        <line x1="36" y1="66" x2="36" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <line x1="36" y1="44" x2="15" y2="30" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="36" y1="44" x2="57" y2="30" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="36" y1="30" x2="19" y2="18" stroke={color} strokeWidth="1.1" strokeLinecap="round"/>
        <line x1="36" y1="30" x2="53" y2="18" stroke={color} strokeWidth="1.1" strokeLinecap="round"/>
        <line x1="36" y1="20" x2="28" y2="10" stroke={color} strokeWidth="0.7" strokeLinecap="round"/>
        <line x1="36" y1="20" x2="44" y2="10" stroke={color} strokeWidth="0.7" strokeLinecap="round"/>
        <line x1="22" y1="64" x2="36" y2="56" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.35"/>
        <line x1="50" y1="64" x2="36" y2="56" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.35"/>
      </svg>
    ),
    "乙": ( // Vine: spiral wrap around vertical axis
      <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
        <line x1="36" y1="8" x2="36" y2="64" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.25"/>
        <path d="M36 16 C52 18 56 28 48 34 C40 40 24 38 20 46 C16 54 24 62 36 62" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <circle cx="36" cy="16" r="2.5" fill={color} opacity="0.7"/>
        <line x1="48" y1="22" x2="56" y2="16" stroke={color} strokeWidth="0.9" strokeLinecap="round" opacity="0.5"/>
        <line x1="22" y1="44" x2="14" y2="40" stroke={color} strokeWidth="0.9" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
    "丙": ( // Sun: center circle + 8 rays alternating long/short
      <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
        <circle cx="36" cy="36" r="9" stroke={color} strokeWidth="1.6" fill="none"/>
        {[0,45,90,135,180,225,270,315].map((deg,i) => {
          const rad = deg * Math.PI / 180;
          const r1 = 13, r2 = i % 2 === 0 ? 28 : 22;
          return <line key={i} x1={36+r1*Math.cos(rad)} y1={36+r1*Math.sin(rad)} x2={36+r2*Math.cos(rad)} y2={36+r2*Math.sin(rad)} stroke={color} strokeWidth={i%2===0?"1.5":"0.9"} strokeLinecap="round"/>;
        })}
      </svg>
    ),
    "丁": ( // Candle: single upward flame shape
      <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
        <path d="M36 64 C28 64 22 58 22 50 C22 38 30 28 36 8 C42 28 50 38 50 50 C50 58 44 64 36 64 Z" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.08"/>
        <path d="M36 58 C32 58 29 55 29 50 C29 43 33 36 36 24 C39 36 43 43 43 50 C43 55 40 58 36 58 Z" stroke={color} strokeWidth="0.8" fill={color} fillOpacity="0.2"/>
        <line x1="36" y1="64" x2="36" y2="70" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <line x1="28" y1="68" x2="44" y2="68" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    "戊": ( // Mountain: three layered stacked lines tapering to peak
      <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
        <polygon points="36,10 64,58 8,58" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.06"/>
        <line x1="20" y1="42" x2="52" y2="42" stroke={color} strokeWidth="1.1" opacity="0.45"/>
        <line x1="27" y1="30" x2="45" y2="30" stroke={color} strokeWidth="0.8" opacity="0.3"/>
        <line x1="8" y1="58" x2="64" y2="58" stroke={color} strokeWidth="1.5"/>
        <circle cx="36" cy="10" r="2" fill={color} opacity="0.7"/>
      </svg>
    ),
    "己": ( // Field: horizontal furrow lines with growth marks
      <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
        {[38,46,54,62].map((y,i) => (
          <line key={i} x1="12" y1={y} x2="60" y2={y} stroke={color} strokeWidth={i===0?"1.4":"1.0"} opacity={1-i*0.18} strokeLinecap="round"/>
        ))}
        {[20,30,40,50].map((x,i) => (
          <g key={i}>
            <line x1={x} y1="36" x2={x} y2="22" stroke={color} strokeWidth="1.1" strokeLinecap="round"/>
            <line x1={x} y1="26" x2={x-5} y2="18" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.7"/>
            <line x1={x} y1="26" x2={x+5} y2="18" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.7"/>
          </g>
        ))}
      </svg>
    ),
    "庚": ( // Blade: bisected hexagon + vertical axis + center point
      <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
        <polygon points="36,8 64,23 64,49 36,64 8,49 8,23" stroke={color} strokeWidth="1.5" fill="none"/>
        <polygon points="36,18 54,28 54,44 36,54 18,44 18,28" stroke={color} strokeWidth="0.8" fill="none" opacity="0.5"/>
        <line x1="36" y1="8" x2="36" y2="64" stroke={color} strokeWidth="1.8"/>
        <circle cx="36" cy="36" r="3" fill={color} opacity="0.7"/>
      </svg>
    ),
    "辛": ( // Jewel: faceted diamond with inner cross lines
      <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
        <polygon points="36,8 62,36 36,64 10,36" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.05"/>
        <polygon points="36,18 54,36 36,54 18,36" stroke={color} strokeWidth="0.9" fill="none" opacity="0.6"/>
        <line x1="10" y1="36" x2="62" y2="36" stroke={color} strokeWidth="0.6" opacity="0.3"/>
        <line x1="36" y1="8" x2="36" y2="64" stroke={color} strokeWidth="0.6" opacity="0.3"/>
        <line x1="18" y1="18" x2="54" y2="54" stroke={color} strokeWidth="0.5" opacity="0.2"/>
        <line x1="54" y1="18" x2="18" y2="54" stroke={color} strokeWidth="0.5" opacity="0.2"/>
        <circle cx="36" cy="36" r="2.5" fill={color} opacity="0.6"/>
      </svg>
    ),
    "壬": ( // Ocean: concentric depth rings + horizon line
      <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
        {[28,20,13,7].map((r,i) => (
          <circle key={i} cx="36" cy="36" r={r} stroke={color} strokeWidth={1.4-i*0.2} fill="none" opacity={0.9-i*0.15}/>
        ))}
        <line x1="8" y1="36" x2="64" y2="36" stroke={color} strokeWidth="1.6" opacity="0.4"/>
        <line x1="8" y1="36" x2="64" y2="36" stroke={color} strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3"/>
      </svg>
    ),
    "癸": ( // Rain: three wave arcs + vertical fall dashes
      <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
        <path d="M10 22 Q18 12 26 22 Q34 32 42 22 Q50 12 58 22 Q66 32 74 22" stroke={color} strokeWidth="1.5" fill="none" opacity="0.85"/>
        <path d="M10 36 Q18 26 26 36 Q34 46 42 36 Q50 26 58 36 Q66 46 74 36" stroke={color} strokeWidth="1.2" fill="none" opacity="0.6"/>
        <path d="M10 50 Q18 40 26 50 Q34 60 42 50 Q50 40 58 50 Q66 60 74 50" stroke={color} strokeWidth="0.8" fill="none" opacity="0.35"/>
        {[20,32,44,56].map((x,i) => (
          <line key={i} x1={x} y1="56" x2={x-3} y2="66" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.45"/>
        ))}
      </svg>
    ),
  };
  return seals[stem] || null;
}

// Chart-specific profile text — generated from computed data, no LLM
const CORE_STRENGTHS = {
  '甲': {
    concentrated: [{label:'Initiating Force', desc:"You start things — not because you were asked to, but because you can see where something needs to go before anyone else has finished assessing whether it's worth starting."}, {label:'Visionary Output', desc:"What you build consistently has a scope others didn't see coming. Not from ambition but from a forward orientation that simply operates at a longer timeframe than most."}, {label:'Growth Leadership', desc:'People around you move forward in your presence — not because you direct them, but because your momentum creates a current that carries others without requiring their conscious decision.'}],
    balanced: [{label:'Directional Clarity', desc:"You can hold a clear long-term aim without abandoning what's immediately in front of you. This produces work that is both ambitious and actually finished."}, {label:'Sustained Momentum', desc:'You initiate and follow through in the same motion. What you build reaches completion rather than simply reaching the point where someone else has to take it over.'}, {label:'Reliable Vision', desc:"People can plan around your direction because you've demonstrated you'll still be pointed the same way months from now. That consistency is something others can actually use."}],
    open: [{label:'Environmental Discernment', desc:"You've developed an accurate read of which conditions actually produce your growth versus which ones absorb your effort without return. Most people never develop this distinction."}, {label:'Patient Cultivation', desc:"You don't force growth into conditions that won't support it. This produces results that are slower to arrive but more durable once they do."}, {label:'Selective Reach', desc:"Because you can't reach everywhere, you've become accurate about which directions are actually worth extending into. That selectivity makes what you do build more purposeful."}]
  },
  '乙': {
    concentrated: [{label:'Navigational Precision', desc:"You find paths through situations that direct approaches can't access. This isn't luck — it's a structural intelligence that reads environments accurately and moves through them efficiently."}, {label:'Strategic Arrival', desc:"You reach intended destinations by routes that weren't obvious to anyone watching. The outcome consistently validates an approach that looked indirect while it was happening."}, {label:'Adaptive Reading', desc:'You pick up more about a situation, a person, or a room than most people consciously register. This feeds decisions that appear intuitive but are actually information-dense.'}],
    balanced: [{label:'Committed Adaptability', desc:'You pursue a specific direction while staying genuinely flexible about how you get there. This makes you effective in conditions where rigid approaches consistently fail.'}, {label:'Positional Intelligence', desc:"You can hold your own view in a conversation without becoming defensive. You take in what's useful, release what isn't, and your core judgment stays intact through the exchange."}, {label:'Trustworthy Resourcefulness', desc:"People come to you when they're stuck because your track record of finding usable routes is real. The trust is based on demonstrated results, not on promise."}],
    open: [{label:'Surface Sensitivity', desc:"You've developed an accurate read of which environments are genuinely supportive versus which ones simply fail to actively obstruct. Those are different things, and you can tell them apart."}, {label:'Earned Attunement', desc:"Because you can't function in all conditions equally, you've become precise about what genuine support looks and feels like. This protects you in ways that less sensitive navigators never develop."}, {label:'Selective Extension', desc:"You extend fully into conditions that merit it and withhold from those that don't. That discrimination is a form of intelligence that produces better outcomes than reaching everywhere."}]
  },
  '丙': {
    concentrated: [{label:'Generative Presence', desc:"Your effect on people is structural rather than performed. People feel more capable, more seen, more alive to possibility in your presence — not because you engineered it but because it's what you do."}, {label:'Conviction-Driven Influence', desc:'You move people through what you genuinely believe rather than through performance. This produces a quality of influence that holds up where performance would fail.'}, {label:'Unconditional Warmth', desc:"The warmth you extend doesn't require conditions to be met first. It arrives before trust is established and creates trust as a consequence."}],
    balanced: [{label:'Directed Warmth', desc:"You've developed the ability to point your warmth toward specific people and contexts rather than distributing it uniformly. This makes what you give more impactful rather than less generous."}, {label:'Sustainable Influence', desc:"You can sustain your effect on people across time rather than burning bright and requiring recovery. What you build with people lasts because it isn't built on unsustainable output."}, {label:'Genuine Reception', desc:"You're learning to let care arrive when it's offered. That capacity creates the reciprocity that makes your level of giving sustainable over the long term."}],
    open: [{label:'Contextual Warmth', desc:'Because your warmth is conditional on being genuinely received, when it does arrive it has a quality of specificity that unconditional warmth rarely achieves.'}, {label:'Reciprocal Sensitivity', desc:"You've developed an accurate read of which people and environments genuinely feed you back versus which ones consume without returning. That distinction is protective and rare."}, {label:'Preserved Quality', desc:"Because you don't give indiscriminately, what you do give hasn't been diluted by overextension. The people who receive it know they're receiving something that isn't offered to everyone."}]
  },
  '丁': {
    concentrated: [{label:'Complete Attention', desc:'What you focus on, you focus on entirely. The quality of engagement you bring to a person or problem creates understanding that more distributed attention simply cannot produce.'}, {label:'Precise Illumination', desc:'You identify what actually matters in a situation with a speed and accuracy that others spend significant effort trying to replicate. You see the thing beneath the surface without particularly trying.'}, {label:'Deep Witness', desc:'People feel genuinely seen in your presence — not assessed, not processed, not managed. Actually witnessed. Most people never experience this from anyone and remember it when they do.'}],
    balanced: [{label:'Calibrated Focus', desc:"You've developed the ability to modulate how fully you engage rather than always arriving at maximum intensity. This makes your attention more useful because it's more precisely matched to what each situation requires."}, {label:'Selective Illumination', desc:"You choose what to illuminate and what to leave in softer light. That choice produces outcomes that blanket attention doesn't — because the right things receive the full treatment."}, {label:'Trusted Perception', desc:"People rely on your read of situations because you've shown the discipline to withhold it when you're uncertain and offer it fully when you're not. That restraint is what makes the insight trustworthy."}],
    open: [{label:'Earned Precision', desc:"Your quality of attention has been refined through conditions that required it to be specific rather than general. It works most powerfully in genuine exchange because that's the condition under which it developed."}, {label:'Reciprocal Attunement', desc:"Because your full engagement requires something genuine in return, when it does arrive it's one of the most specific and accurate forms of attention available. It was selected, not distributed."}, {label:'Protective Selectivity', desc:"You've developed an instinct for when genuine reciprocity is present and when it isn't. That instinct protects both the quality of your attention and the people who receive it."}]
  },
  '戊': {
    concentrated: [{label:'Gravitational Authority', desc:'People orient around you without being asked to. Your presence creates a reference point that others use to locate themselves — in meetings, in relationships, in decisions.'}, {label:'Unconditional Reliability', desc:"You show up the same way regardless of conditions. This isn't discipline — it's constitution. People build on you precisely because they don't have to wonder which version of you they'll get."}, {label:'Structural Holding', desc:"You can carry significant weight — responsibility, pressure, other people's uncertainty — without showing the cost. What you hold tends to stay held."}],
    balanced: [{label:'Responsive Stability', desc:'You know the difference between what needs to be held and what needs to be released. That discernment makes your reliability more useful than simple consistency.'}, {label:'Structured Flexibility', desc:"You can adapt without losing your centre. Movement no longer registers as threat — you've developed the ability to tell what genuinely needs to flex from what genuinely needs to hold."}, {label:'Trustworthy Judgment', desc:"People bring you their hardest decisions not because you're soft but because you're solid enough to hold the weight of real deliberation — and honest enough to say what you actually see."}],
    open: [{label:'Earned Groundedness', desc:"Your stability isn't inherited — it's been built through conditions that required you to find ground where it wasn't given. This makes it more genuine and more portable than the kind that comes effortlessly."}, {label:'Receptive Presence', desc:"Because you've learned you need conditions to remain grounded, you've become sensitive to what those conditions are — in environments, in people, in the quality of what surrounds you."}, {label:'Collaborative Solidity', desc:'Paired with people and environments that genuinely support you, what you provide for others is exceptional. Your groundedness in those conditions is something the people around you feel clearly.'}]
  },
  '己': {
    concentrated: [{label:'Developmental Instinct', desc:"You notice what people and situations need before anyone has named it. This isn't empathy as a style — it's a structural read that operates before you decide to pay attention."}, {label:'Generative Presence', desc:'Things grow around you. People take on more, projects find form, stuck ideas begin moving — not because you directed any of it, but because the conditions you create make it possible.'}, {label:'Sustained Investment', desc:"You follow through on people and things across time without requiring return. This consistency is what separates your care from everyone else's — it doesn't have an expiration condition."}],
    balanced: [{label:'Reciprocal Cultivation', desc:"You've learned to grow things in both directions — developing others while actively building conditions that develop you. The care is still real, but it now flows in a circuit rather than one way."}, {label:'Selective Nourishment', desc:"You've become accurate about which people and projects actually benefit from your level of investment and which ones simply absorb it. That discrimination makes everything you tend grow better."}, {label:'Earned Boundaries', desc:'You can say no to requests for care that would cost more than they return — not coldly, but with the same attentiveness you bring to everything. This is a development, not a default.'}],
    open: [{label:'Environmental Sensitivity', desc:'You read what a situation genuinely needs — not what it presents, not what it asks for. This accuracy is a function of receptivity, and it produces a quality of care that more self-sufficient approaches simply cannot replicate.'}, {label:'Relational Intelligence', desc:"You understand the dynamics between people — who needs what from whom, what's blocking something, what would genuinely help — with a precision that others attribute to intuition but is actually close reading."}, {label:'Authentic Warmth', desc:"Because your care is conditional on genuinely receiving, when it does arrive it's unmistakably real. People who matter to you feel it as specific rather than general — directed at them, not distributed."}]
  },
  '庚': {
    concentrated: [{label:'Decisive Clarity', desc:"You reach conclusions others are still circling. When you speak, people know you've already cut through what wasn't real — and they trust it."}, {label:'Productive Force', desc:"Your drive isn't motivational — it's structural. When you commit to something, you generate results that wouldn't exist without you applying yourself fully."}, {label:'Honest Directness', desc:"You say what's actually true even when a softer version would be easier. This makes you the person others come to when they need a real answer, not a reassuring one."}],
    balanced: [{label:'Strategic Precision', desc:'You know when to cut and when to hold. The analytical sharpness that others apply everywhere, you deploy where it counts — which makes it substantially more effective.'}, {label:'Principled Adaptability', desc:'You can operate inside systems and alongside people without losing your own perspective. You flex without conceding the core judgment underneath.'}, {label:'Earned Credibility', desc:"People trust your assessments because you've shown both the precision to be right and the restraint to not always insist on it. That combination is rare."}],
    open: [{label:'Refined Discernment', desc:"Your precision has been earned rather than inherited. Having had to develop it under less-than-ideal conditions means it's more specific and more reliable than it looks from outside."}, {label:'Collaborative Precision', desc:"Paired with the right people or placed in the right environment, your output has a quality that self-sufficient approaches often can't match — because you've learned to use the full system, not just yourself."}, {label:'Contextual Intelligence', desc:"You've developed an unusually accurate read of which environments and relationships bring out your actual capability versus which ones suppress it. Most people never develop this."}]
  },
  '辛': {
    concentrated: [{label:'Automatic Quality Recognition', desc:'You perceive the difference between genuine and performed, excellent and merely competent, before conscious analysis begins. This operates as a sense, not a process.'}, {label:'Uncompromising Standard', desc:"What you produce to your own standard has a durability and distinction that work produced to a lower bar simply doesn't. You can't make yourself output something you don't believe in."}, {label:'Reliable Assessment', desc:"When you say something is genuinely good, people who know you take it seriously. You've never said it carelessly, and that restraint is the source of the trust."}],
    balanced: [{label:'Productive Discernment', desc:"Your standard is generating actual output rather than perpetual evaluation. The gap between what you can see as possible and what you're producing has narrowed to something workable."}, {label:'Completable Excellence', desc:"You've developed the ability to finish things to your own standard and stop. That completion instinct transforms a capacity for refinement into a capacity for delivery."}, {label:'Contextual Application', desc:"You've learned to apply the full standard where it matters and allow something lighter in contexts that don't require the full treatment. That discrimination makes you more effective rather than less precise."}],
    open: [{label:'Contextual Refinement', desc:"Your discernment performs at its fullest in settings that genuinely warrant that level of precision. You've developed an accurate sense of which those are — and what you produce there has a quality that less selective approaches can't match."}, {label:'Earned Standard', desc:"Because your precision has been exercised under conditions that didn't always meet it, it's more robust and more specific than a standard that's never been tested against resistance."}, {label:'Setting Intelligence', desc:"You know what conditions bring out your best discernment and what conditions suppress it. That knowledge is itself a form of precision that people who've always had the right setting rarely develop."}]
  },
  '壬': {
    concentrated: [{label:'Integrative Depth', desc:"You hold more variables simultaneously than most contexts around you require. This produces insights that emerge from synthesis rather than analysis, reaching conclusions that linear thinking can't access."}, {label:'Strategic Foresight', desc:'You see where things are going before the evidence for it is complete. The pattern is visible to you while others are still accumulating the data that would confirm it.'}, {label:'Expansive Range', desc:'The scope of what you can hold in mind — how many dimensions, how many implications, how many timeframes — is genuinely unusual. People in proximity either benefit from it or feel outpaced by it.'}],
    balanced: [{label:'Channelled Depth', desc:'Your analytical range has found specific forms through which it can reach people. The depth is landing rather than existing in potential.'}, {label:'Translational Fluency', desc:'You can move between the level at which you think and the level at which exchanges operate without losing what matters in the transition. That fluency is what makes your insight actually useful.'}, {label:'Compounding Influence', desc:'What you contribute now has effects that extend further than their immediate surface suggests. People are genuinely changed by contact with your thinking in ways that accumulate over time.'}],
    open: [{label:'Receptive Intelligence', desc:"Your depth is activated by genuine intellectual engagement. When you find contexts that meet you at the level you're operating, what you produce has a quality that isolated thinking doesn't generate."}, {label:'Relational Synthesis', desc:"You think better in genuine exchange than in isolation. The right conversation doesn't distract from the depth — it extends it in directions you wouldn't reach alone."}, {label:'Depth Discernment', desc:"You've developed an accurate sense of which exchanges are genuinely generative versus which ones are transactional. That discrimination is itself a sophisticated form of intelligence."}]
  },
  '癸': {
    concentrated: [{label:'Perceptive Accuracy', desc:"You register what's actually true in a room, in a person, in a situation — before it's been stated. This isn't analysis. It arrives before the conclusion and it's usually right."}, {label:'Specific Nourishment', desc:'The care you offer is calibrated to what the person in front of you actually needs. Not generic support — specific, accurate attunement that people experience as being genuinely understood.'}, {label:'Quiet Influence', desc:"You affect people and situations in ways that are real and lasting without requiring visibility or credit. What you've changed in others tends to stay changed."}],
    balanced: [{label:'Navigational Sensitivity', desc:"Your attunement is functioning as intelligence rather than as something that happens to you. You can read what's true in a situation and use that reading to make deliberate decisions rather than simply respond to it."}, {label:'Chosen Investment', desc:"You're directing the depth of your care toward people and contexts you've actually selected rather than defaulted into. The care is as real as it's ever been and more specifically placed."}, {label:'Reciprocal Attunement', desc:"You've built relationships where genuine care runs in both directions. The nourishment you offer has a context that feeds you back, and that reciprocity changes everything about the sustainability of what you give."}],
    open: [{label:'Genuine Attunement', desc:'Because your full sensitivity is conditional on genuine reciprocity, when it does activate it is among the most specific and accurate forms of care available. It was earned by the exchange, not distributed regardless of it.'}, {label:'Ground Discernment', desc:"You've developed an accurate sense of which environments and relationships genuinely nourish you versus which ones create the appearance of reciprocity without the reality. That discrimination is protective and sophisticated."}, {label:'Relational Depth', desc:"In the right conditions, what you build with people has a quality that more armoured approaches can't create. The vulnerability that feels like a risk is what makes the depth possible."}]
  },
};

const CORE_SHADOWS = {
  '甲': {
    concentrated: [{label:'Premature Extension', desc:"You move into the next phase before the current one is consolidated. The gap between what you've built and what you've actually finished is a recurring pattern with recurring costs."}, {label:'Diminished Completion', desc:"The moment something is done, your interest migrates to what's next. This leaves a trail of well-initiated but under-finished things that others have to stabilise."}, {label:'Outpacing Relationships', desc:"The people in your life often feel like they're catching up rather than alongside. The pace that feels natural to you is faster than most can sustain without explicit slowing."}],
    balanced: [{label:'Equilibrium Fragility', desc:"The balance you've found requires active maintenance. Your instinct still pulls toward extension, and without deliberate effort the reach begins to outpace the root again."}, {label:'Impatience with Pace', desc:"You've developed the capacity to complete things but not full patience for those who move more slowly through the same process. This creates friction in collaborative work."}, {label:'Undeclared Completion', desc:"You sometimes consider something done before communicating it. Others treat it as still in progress — which creates confusion you didn't know existed."}],
    open: [{label:'Condition Reliance', desc:'Your growth in the wrong environment is genuinely limited — not from lack of will but from how your type actually functions. This creates performance gaps that are hard to explain to people who assumed effort was the only variable.'}, {label:'Withheld Initiative', desc:'You sometimes wait for conditions to be right before beginning something you already know you want to do. The wait is often longer than necessary.'}, {label:'Underestimated Potential', desc:"Because you haven't consistently had the right conditions, others — and sometimes you — don't have an accurate picture of what you're actually capable of producing."}]
  },
  '乙': {
    concentrated: [{label:'Uncommitted Navigation', desc:'The same skill that finds multiple paths can prevent full commitment to any one of them. You keep options open longer than decisions require.'}, {label:'Obscured Contribution', desc:'Because your routes are non-obvious, your contributions are frequently underattributed. People see the result without seeing the navigation that produced it.'}, {label:'Accommodated Drift', desc:"Your ability to adapt to surfaces can tip into adapting away from your own position. You sometimes concede ground you didn't intend to concede, gradually and without noticing."}],
    balanced: [{label:'Unstated Destination', desc:"You're building toward something more significant than you've named. Without naming it, you can't get full support for it — and the navigation continues without the momentum that clarity would create."}, {label:'Provisional Commitment', desc:"You commit fully enough to make things work but maintain enough flexibility that others sometimes can't tell how invested you actually are. This creates uncertainty that works against collaboration."}, {label:'Deferred Position', desc:'When your view conflicts with the room, you tend to accommodate first and push back later, if at all. By then the moment to redirect has often passed.'}],
    open: [{label:'Surface Dependence', desc:"Your effectiveness is substantially higher in the right environment than in a neutral one. That gap creates reliance on conditions you can't always control."}, {label:'Withheld Direction', desc:"When conditions aren't right, you tend to withhold your actual view rather than advance it into resistance. This means you're underrepresented in situations that need your input most."}, {label:'Delayed Commitment', desc:'You read conditions before committing, which is accurate and also means you commit later than the situation sometimes requires. The timing cost is real even when the caution is warranted.'}]
  },
  '丙': {
    concentrated: [{label:'Uncontained Radiation', desc:'You give to everything within reach without directing where the warmth goes. This diffuses your impact and costs you more than targeted giving would.'}, {label:'Depletion Blindness', desc:"The output is continuous enough that you don't notice the cost accumulating until you're running on reserves. By then you've been depleted for longer than the people around you know."}, {label:'Receiving Resistance', desc:'Accepting genuine care from others is harder than giving it. You deflect as fluently as you extend, which means the reciprocity that would sustain you rarely lands.'}],
    balanced: [{label:'Selectivity Discomfort', desc:"Choosing where the warmth goes means not giving it everywhere. That withholding still produces guilt even when it's the right decision."}, {label:'Residual Overdrive', desc:'In high-demand situations you revert to giving everything without direction. The balance is real but requires active maintenance under pressure.'}, {label:'Unaccounted Cost', desc:"You're better at tracking what others need than what your own output is costing you. The accounting still lags behind the spending."}],
    open: [{label:'Output Variability', desc:'Your warmth and presence fluctuate with your conditions in ways that surprise people who expected consistency. In unsupportive environments, what you can offer is genuinely diminished.'}, {label:'Fuel Dependency', desc:'You need genuine reciprocity to sustain what you give. Without it the output continues for a while on will alone — then dims in ways that are hard to explain to people who assumed you were inexhaustible.'}, {label:'Withheld Presence', desc:"When conditions aren't right, you hold back in ways people experience as withdrawal. The protection is real but the cost to connection is also real."}]
  },
  '丁': {
    concentrated: [{label:'Intensity Mismatch', desc:'The force of your focus is calibrated for depth, not for every situation. Contexts that needed something lighter receive the full flame, and the effect is often overwhelming rather than illuminating.'}, {label:'Tunnel Engagement', desc:"What you're focused on receives everything. What you're not focused on receives almost nothing. This creates significant gaps in attention that the people outside your current focus feel clearly."}, {label:'Unreturned Investment', desc:"You invest the full quality of your attention without calibrating to whether you'll receive equivalent investment back. The asymmetry accumulates in ways you absorb without flagging."}],
    balanced: [{label:'Calibration Cost', desc:"Modulating your engagement requires more effort than operating at full intensity. The management of your own attention is an ongoing demand that doesn't disappear."}, {label:'Selective Blind Spots', desc:"Because you've learned to choose what to illuminate, you sometimes don't illuminate things that would have benefited from the full treatment. The judgment is mostly right but not always."}, {label:'Receiving Difficulty', desc:"You give your full attention readily and struggle to accept it in return. People who want to fully see you often can't, because you redirect the light outward before it can land on you."}],
    open: [{label:'Exchange Dependence', desc:"Your deepest engagement requires genuine reciprocity to activate. In relationships or contexts that don't offer it, you stay in a shallower mode that protects you but limits what's possible."}, {label:'Misread Withdrawal', desc:"When you withhold the full depth of your attention, people who don't understand the condition experience it as indifference. The protection is real — the cost to connection is also real."}, {label:'Inconsistent Depth', desc:"The gap between what you're capable of and what you produce in the wrong conditions is large enough that people who haven't seen you fully engaged don't know what you actually are."}]
  },
  '戊': {
    concentrated: [{label:'Calcified Position', desc:"Once you've decided something is solid, moving it requires more force than the situation usually warrants. You resist change that would actually serve you because it feels indistinguishable from instability."}, {label:'Unacknowledged Load', desc:'You carry more than is yours to carry — and you do it quietly, without accounting for the cost. The people around you benefit from your holding without understanding what it requires of you.'}, {label:'Withheld Movement', desc:"There are things you've known needed to change for longer than you've acted on them. The certainty you require before shifting rarely arrives at the pace that life actually moves."}],
    balanced: [{label:'Maintenance Inertia', desc:"You're better at building structures than at retiring them. Things that have stopped serving their purpose remain in place longer than they should — because you built them and letting go still feels like losing ground."}, {label:'Unvoiced Expectations', desc:"You have clear standards for how relationships and commitments should function. You rarely state them explicitly — and then feel the gap when they aren't met."}, {label:'Deferred Reciprocity', desc:"You're capable of sustaining unequal relationships for a very long time before acknowledging the imbalance. By then the gap is larger than it needed to be."}],
    open: [{label:'Conditional Stability', desc:'Your groundedness fluctuates with your environment in ways that surprise people who assumed it was unconditional. In genuinely unsupportive conditions you can appear solid while quietly hollowing.'}, {label:'Support Scarcity', desc:"You need more active reciprocity than you receive — and you've normalised that deficit so thoroughly that you rarely name it, even to people who would want to help."}, {label:'Mistaken Self-Sufficiency', desc:"You present as not needing much. People take you at your word. The result is that genuine support — the kind that would actually sustain you — rarely arrives because you've never signalled that it's needed."}]
  },
  '己': {
    concentrated: [{label:'Invisible Depletion', desc:"You give continuously without tracking it. By the time the deficit becomes visible, it's been accumulating for months — and the people around you had no idea, because you never showed it."}, {label:'Muted Self-Advocacy', desc:'You can articulate exactly what someone else needs. Naming what you need, to someone who could actually provide it, is a different and harder task that you consistently defer.'}, {label:'Unclaimed Output', desc:"The growth you create in others tends to be attributed to them, not to you. You rarely contest this — which is generous and also means you're chronically undercompensated for what you actually produce."}],
    balanced: [{label:'Reversion Risk', desc:"Under pressure, you return to older habits — giving more, asking for less, absorbing what isn't yours to carry. The balance you've built is real but not yet automatic."}, {label:'Ambiguous Investment', desc:"You're more targeted than you used to be, but not yet fully explicit about what a relationship or project needs to offer to remain worth your full investment. The criteria exist — they're just unspoken."}, {label:'Residual Guilt', desc:'Choosing yourself over someone who needs you still produces a low-grade resistance. You do it more than before — but not yet without cost.'}],
    open: [{label:'Nourishment Threshold', desc:'You need more genuine support than most people around you understand or consistently provide. Without it your output diminishes — not from lack of will, but from how your capacity actually works.'}, {label:'Invisible Needs', desc:"You're attuned to others' needs and largely silent about your own — which means people who would genuinely want to help you don't know what you require."}, {label:'Absorbed Distress', desc:"In difficult environments you don't just read what's wrong — you carry it. The sensitivity that makes you accurate makes it hard to leave what you've perceived where you found it."}]
  },
  '庚': {
    concentrated: [{label:'Combative Certainty', desc:'Your read on situations is usually accurate — which makes it genuinely hard to stay open when challenged. You resist correction even when it would improve the outcome.'}, {label:'Uniform Force', desc:'You apply the same intensity to everything. What works in high-stakes confrontation damages collaborative or low-stakes situations that needed something lighter.'}, {label:'Closed to Shaping', desc:"You're better at changing others than at allowing yourself to be changed. Feedback that doesn't confirm your existing assessment tends to bounce off rather than land."}],
    balanced: [{label:'Inconsistent Edge', desc:"The sharpness is real but not always available. In contexts that don't activate it, you appear more conventional than you are — which frustrates people who've seen what you're capable of."}, {label:'Anchor Dependence', desc:'Your best work happens when direction is clear. Without a specific purpose or challenge to cut toward, the precision loses its target and the energy disperses into restlessness.'}, {label:'Undeclared Standards', desc:"You hold high internal standards but don't always voice them. This leads to dissatisfaction with outcomes you helped create without specifying what you actually needed."}],
    open: [{label:'Condition Dependency', desc:"Your best performance requires specific inputs — the right environment, the right challenge, the right support. Without them, capability that's genuinely there doesn't fully surface."}, {label:'Deferred Authority', desc:'You sometimes wait for external validation before acting on what you already know. The assessment is accurate — the confidence to move on it independently takes longer than it should.'}, {label:'Underestimated Ceiling', desc:'The gap between what you produce in the right conditions and what you produce in the wrong ones is large enough that others — and sometimes you — underestimate your actual ceiling.'}]
  },
  '辛': {
    concentrated: [{label:'Perpetual Refinement', desc:"The same faculty that produces excellent work keeps working past the point of completion. You improve things that are done, delay delivery of things that are ready, and exhaust the capacity on what doesn't require it."}, {label:'Continuous Friction', desc:"Your awareness of the gap between what's possible and what's currently available is a persistent background condition. In contexts that can't meet your standard, this friction is constant and costly."}, {label:'Inverted Self-Assessment', desc:'You apply the same unsparing standard to yourself that you apply to everything else. The result is a precision of self-criticism that is rarely accurate and consistently costly.'}],
    balanced: [{label:'Completion Resistance', desc:"The instinct to keep improving hasn't fully retired. It requires active decision to call something done, and that decision is still uncomfortable even when it's clearly right."}, {label:'Standard Communication', desc:"You hold high internal criteria that you don't always make explicit. Collaborators produce to a bar they haven't been told about and discover the gap at the end."}, {label:'Self-Grace Deficit', desc:"The reasonable judgment you apply to others' work doesn't apply to your own. You complete things at the level of excellence you require and then immediately see where they fell short."}],
    open: [{label:'Setting Dependency', desc:"In contexts that don't meet the conditions your discernment requires, what you produce is genuinely diminished. The capability is real — the conditions are the variable."}, {label:'Self-Directed Friction', desc:"When the external environment doesn't provide worthy material, the same faculty that assesses quality turns inward. The standard that works beautifully on output becomes a source of unnecessary self-scrutiny."}, {label:'Incomplete Visibility', desc:"Because your capability depends on conditions, people who haven't seen you in the right setting don't have an accurate picture of what you're actually capable of. Neither, sometimes, do you."}]
  },
  '壬': {
    concentrated: [{label:'Translation Gap', desc:'The distance between how you think and how most exchanges operate requires continuous downward translation. This is costly, frequently incomplete, and often produces the feeling of being encountered at the surface.'}, {label:'Undirected Depth', desc:'Without a specific channel, the depth disperses. The same range that produces insight in the right context produces unfocused elaboration in the wrong one.'}, {label:'Inaccessible Intelligence', desc:"What you carry is genuinely useful but frequently arrives in forms that others can't receive without significant translation effort on your part. The insight lands less often than it should."}],
    balanced: [{label:'Channel Maintenance', desc:'The specific contexts and relationships where your depth lands require active maintenance. Without it, you drift back toward thinking that reaches no one.'}, {label:'Scope Temptation', desc:'The capacity is still there to go wider and deeper than any given situation requires. Staying in the productive channel rather than expanding into new territory requires ongoing discipline.'}, {label:'Depth Variability', desc:"Not every exchange activates the full range. In contexts that don't, you function competently at a fraction of your actual capacity — and the gap registers as persistent dissatisfaction."}],
    open: [{label:'Activation Dependence', desc:'Your full analytical capacity requires genuine intellectual reciprocity to engage. Without it the depth is present but not active — and operating at a fraction of capacity for extended periods is genuinely depleting.'}, {label:'One-Directional Cost', desc:"Exchanges where you bring depth and receive surface leave you more depleted than exchanges where nothing is required. The asymmetry has a specific cost that's hard to explain to people who don't experience it."}, {label:'Understimulation Drift', desc:"In contexts that don't engage your full range, the excess capacity finds somewhere to go — rumination, overanalysis, elaboration that serves no one. The surplus doesn't disappear; it redirects."}]
  },
  '癸': {
    concentrated: [{label:'Absorbed States', desc:"You don't just read what others are feeling — you carry it. The same permeability that makes you accurate makes it genuinely difficult to leave what you've perceived where you found it."}, {label:'Boundary Erosion', desc:"The line between what you're sensing in others and what you're experiencing yourself dissolves under pressure. This makes difficult environments far more costly for you than they appear from outside."}, {label:'Continuous Reception', desc:"You're receiving information from your environment whether or not you've chosen to attend to it. The sensitivity doesn't have an off switch, and the accumulation is real."}],
    balanced: [{label:'Maintenance Requirement', desc:"The boundary between perception and absorption requires active maintenance. It's real but not automatic — under pressure, the pattern of simply carrying what you sense reasserts itself."}, {label:'Selective Guilt', desc:'Protecting yourself from draining exchanges still produces resistance. You do it more consistently than before, but not yet without cost.'}, {label:'Calibration Lag', desc:"Your sensitivity is accurate but still processes everything before you've decided whether to receive it. The filtering happens after the information has arrived, which means you're still managing the intake even as you get better at it."}],
    open: [{label:'Nourishment Dependency', desc:"Your sensitivity requires genuine reciprocity to remain at full function. In environments that don't provide it, you continue to function but at a cost that accumulates quietly and is rarely visible to others."}, {label:'Self-Silencing', desc:"You're attuned to others' needs and largely silent about your own. The people who would genuinely want to meet your needs often don't know what they are because you haven't named them."}, {label:'Residual Absorption', desc:"Even with better boundaries than before, genuinely charged environments still take more from you than they take from others. The protection is improving — it isn't yet complete."}]
  },
};

// ===== BLOCK SELECTION: Slot + Specificity v2 (DOC4 §11) ===================

const BLOCK_SLOTS = {
  'How you experience the world':               'lens',
  "What you're genuinely good at":              'lens',
  'Where you consistently get stuck':           'shadow',
  'What changes when conditions are right':     'activation',
  'What you rarely admit':                      'shadow',
  'How you make decisions':                     'domain',
  'How you show up in relationships':           'domain',
  'What you do with pressure':                  'domain',
  'What holds you back without looking like it':'shadow',
  'What activates the best version of this':    'activation',
  'The image and the interior':                 'shadow',
};

function resolveBlockText(block, band, pattern) {
  const compound = band + '_' + pattern;
  for (const key of [compound, band, pattern, 'default']) {
    if (block.text[key]) return block.text[key];
  }
  throw new Error('resolveBlockText: no text for "' + block.label + '" ' + compound);
}

function resolveBlockPriority(block, band, pattern) {
  const compound = band + '_' + pattern;
  return (block.priority[compound] ?? block.priority[band] ?? block.priority[pattern] ?? block.priority.default ?? 3);
}

function specificityBonus(block, band, pattern) {
  const compound = band + '_' + pattern;
  if (block.text[compound]) return 2;
  if (block.text[band] || block.text[pattern]) return 1;
  return 0;
}

function selectionScore(block, band, pattern) {
  return resolveBlockPriority(block, band, pattern) + specificityBonus(block, band, pattern);
}

function getBlocksForConfigV2(blocks, band, pattern) {
  const candidates = blocks.filter(b => b.bands.includes(band) && b.patterns.includes(pattern));
  const slots = { lens: [], shadow: [], domain: [], activation: [] };
  candidates.forEach((b, idx) => {
    const slot = BLOCK_SLOTS[b.label];
    if (slot == null) return;
    slots[slot].push({ block: b, score: selectionScore(b, band, pattern), idx });
  });
  Object.values(slots).forEach(arr => arr.sort((a, b) => b.score - a.score || a.idx - b.idx));
  return [
    slots.lens[0]?.block, slots.shadow[0]?.block, slots.shadow[1]?.block,
    slots.domain[0]?.block, slots.activation[0]?.block,
  ].filter(Boolean);
}

function renderBlocks(stem, band, pattern) {
  if (STEM_CARD_DATA == null || STEM_CARD_DATA[stem] == null) return [];
  const allBlocks = STEM_CARD_DATA[stem].blocks;
  if (allBlocks == null) return [];
  return getBlocksForConfigV2(allBlocks, band, pattern)
    .map(b => ({ label: b.label, text: resolveBlockText(b, band, pattern) }));
}

function validateStem(stem) {
  const BANDS = ['concentrated', 'balanced', 'open'];
  const PATTERNS = ['pure', 'rooted', 'flowing', 'forging', 'tested'];
  const blocks = STEM_CARD_DATA?.[stem]?.blocks;
  if (blocks == null) { console.error('validateStem: no blocks for ' + stem); return false; }
  const errors = [];
  for (const band of BANDS) for (const pattern of PATTERNS) {
    const sel = getBlocksForConfigV2(blocks, band, pattern);
    const cp = band + '_' + pattern;
    if (sel.length < 5) errors.push('Under 5: ' + stem + ' ' + cp + ' got ' + sel.length);
    for (const b of sel) {
      try {
        const t = resolveBlockText(b, band, pattern);
        if (t.startsWith('[TODO')) errors.push('[TODO] "' + b.label + '" ' + cp);
      } catch(e) { errors.push('Err: "' + b.label + '" ' + cp); }
    }
  }
  if (errors.length === 0) { console.log(stem + ' validated'); return true; }
  errors.forEach(e => console.error(e)); return false;
}

function effectiveSig(domainEntry, gender) {
  if (domainEntry == null) return 0;
  if (gender === 'female' && domainEntry.sig_female != null) return domainEntry.sig_female;
  if (gender === 'male'   && domainEntry.sig_male   != null) return domainEntry.sig_male;
  return domainEntry.sig ?? 0;
}

function getActiveDomainSignatures(tgKey, gender = null, sigThreshold = 4) {
  const tgCard = TG_CARD_DATA?.[tgKey];
  if (tgCard?.domainSignatures == null) return [];
  const active = [];
  for (const domain of ['career', 'relationships', 'wealth', 'health']) {
    const entry = tgCard.domainSignatures[domain];
    if (entry == null) continue;
    const sig = effectiveSig(entry, gender);
    if (sig < sigThreshold || entry.mechanism == null || entry.text == null) continue;
    active.push({ domain, sig, mechanism: entry.mechanism, text: entry.text });
  }
  active.sort((a, b) => b.sig - a.sig);
  return active;
}


function buildDayMasterProfile(chart) {
  const dm = chart.dayMaster;
  const sr = STRENGTH_RING[dm.strength] || STRENGTH_RING.moderate;
  const band = getEnergyBand(dm.strength);

  const ARCHETYPES = {
    "甲":"The Oak", "乙":"The Vine", "丙":"The Sun",  "丁":"The Candle",
    "戊":"The Mountain", "己":"The Field", "庚":"The Blade", "辛":"The Jewel",
    "壬":"The Ocean", "癸":"The Rain",
  };

  const CORE_LINES = {
    "甲": "The Oak grows toward light before it decides to — its nature is forward motion, its gift is building what others can only imagine.",
    "乙": "The Vine finds its way not through force but through intelligence — it reads every surface and arrives where the Oak never could.",
    "丙": "The Sun doesn't choose to warm. It simply is warm — and everything near it becomes more visible, more alive, more itself.",
    "丁": "The Candle illuminates what it's pointed at completely. Precision and warmth in the same focused flame.",
    "戊": "The Mountain is what people orient by without knowing why — the ground that holds when everything else shifts.",
    "己": "The Field doesn't announce its fertility. It simply grows things — quietly, consistently, without requiring acknowledgment.",
    "庚": "The Blade carries a precision that arrives before the decision to look — an edge present from the beginning, waiting to find its purpose.",
    "辛": "The Jewel perceives what is genuinely excellent the way others perceive temperature — automatically, accurately, before a word is spoken.",
    "壬": "The Ocean holds more beneath its surface than it ever shows — and the depth has always been larger than the space given to display it.",
    "癸": "The Rain senses what is true in a room before anyone has said the thing — and nourishes what it touches without announcing it.",
  };

  // Resolve blocks from STEM_CARD_DATA (new system)
  const tgPattern  = chart.tgPattern || chart.tension || "";
  const stemBlocks = (STEM_CARD_DATA && STEM_CARD_DATA[dm.stem]?.blocks)
    ? renderBlocks(dm.stem, band, tgPattern)
    : [];

  // Legacy fallback: WHO_YOU_ARE (deprecated)
  const wya     = WHO_YOU_ARE[dm.stem] || { teaser: "", bands: {} };
  const wyaBand = wya.bands?.[band] || {};

  return {
    archetype:      ARCHETYPES[dm.stem] || "",
    manifesto:      ARCHETYPE_MANIFESTO[dm.stem] || "",
    coreLine:       CORE_LINES[dm.stem] || "",
    // Content: new block system -> WHO_YOU_ARE legacy fallback
    blocks:          stemBlocks,
    whoYouAreTeaser: wya.teaser     || "",
    whoYouAreP1:     wyaBand.p1     || "",
    whoYouAreP2:     wyaBand.p2     || "",
    strengths:       (CORE_STRENGTHS[dm.stem]?.[band]) || [],
    shadows:         (CORE_SHADOWS[dm.stem]?.[band])   || [],
    twoAM:           null,
    landscape:       null,
    persona:         null,
    // Metadata for DayMasterHero identity card
    tgPattern:       chart.tgPattern || chart.tension || "",
    tension:         chart.tgPattern || chart.tension || "", // backwards-compat alias
    catalyst:        chart.catalyst  || "",
    archetypeKey:    chart.archetypeKey || "",
    band,
    strengthRing:    sr,
  };
}

// SVG strength ring — partial circle, same as before
function StrengthRing({ pct, color, stem, size = 80 }) {
  const r = (size / 2) - 7;
  const circumference = 2 * Math.PI * r;
  const dash = circumference * pct;
  const gap  = circumference * (1 - pct);
  const center = size / 2;
  return (
    <svg width={size} height={size} style={{display:"block"}}>
      <circle cx={center} cy={center} r={r} fill="none" stroke={`${color}20`} strokeWidth="2.5"/>
      <circle cx={center} cy={center} r={r} fill="none"
        stroke={color} strokeWidth="2.5"
        strokeDasharray={`${dash} ${gap}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${center} ${center})`}
        style={{transition:"stroke-dasharray 0.8s ease"}}
      />
      <text x={center} y={center+2}
        textAnchor="middle" dominantBaseline="middle"
        fontFamily="'Noto Serif SC', Georgia, serif"
        fontSize={size * 0.30} fontWeight="600"
        fill={color}
      >{stem}</text>
    </svg>
  );
}

function DayMasterHero({ chart, onOpenPopup = () => {} }) {
  const dm = chart.dayMaster;
  const color = EL_C[dm.element];
  const profile = buildDayMasterProfile(chart);
  const polarity = dm.polarity === "yang" ? "Yang" : "Yin";

  const STEM_PINYIN = {"甲":"Jiǎ","乙":"Yǐ","丙":"Bǐng","丁":"Dīng","戊":"Wù","己":"Jǐ","庚":"Gēng","辛":"Xīn","壬":"Rén","癸":"Guǐ"};

  // Split manifesto into two display lines on " · " separator
  const manifestoRaw = profile.manifesto || "";
  const [manifestoL1, manifestoL2] = manifestoRaw.includes(" · ")
    ? manifestoRaw.split(" · ")
    : [manifestoRaw, ""];

  const bgMap = {
    Metal:"linear-gradient(160deg, #eef2f8 0%, #f0ebe0 100%)",
    Wood: "linear-gradient(160deg, #eef5ee 0%, #f0ebe0 100%)",
    Fire: "linear-gradient(160deg, #f9efee 0%, #f0ebe0 100%)",
    Earth:"linear-gradient(160deg, #f5f0e8 0%, #f0ebe0 100%)",
    Water:"linear-gradient(160deg, #eef1f8 0%, #f0ebe0 100%)",
  };

  // ── Chinese Jian (straight sword) for 庚 ──────────────────────────────────
  const BladeJian = () => (
    <svg width="96" height="180" viewBox="0 0 96 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="jianBlade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#7a8fa8"/>
          <stop offset="30%"  stopColor="#c8d8e8"/>
          <stop offset="50%"  stopColor="#f0f5fa"/>
          <stop offset="70%"  stopColor="#c8d8e8"/>
          <stop offset="100%" stopColor="#7a8fa8"/>
        </linearGradient>
        <linearGradient id="jianGuard" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#e8c87a"/>
          <stop offset="50%"  stopColor="#d4a840"/>
          <stop offset="100%" stopColor="#a87830"/>
        </linearGradient>
        <linearGradient id="jianHandle" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#1e1008"/>
          <stop offset="50%"  stopColor="#3c2010"/>
          <stop offset="100%" stopColor="#1e1008"/>
        </linearGradient>
        <linearGradient id="jianPommel" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#e8d080"/>
          <stop offset="100%" stopColor="#a87830"/>
        </linearGradient>
        <filter id="jianGlow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#00000025"/>
        </filter>
      </defs>
      <path d="M48,6 L54,124 L48,132 L42,124 Z" fill="url(#jianBlade)" filter="url(#jianGlow)"/>
      <line x1="48" y1="8" x2="48" y2="126" stroke="#ffffff70" strokeWidth="0.7"/>
      <path d="M42,124 L48,6" stroke="#b8cce050" strokeWidth="0.5"/>
      <rect x="33" y="124" width="30" height="7" rx="2.5" fill="url(#jianGuard)" filter="url(#jianGlow)"/>
      <ellipse cx="33" cy="127.5" rx="5" ry="3.5" fill="#d4a840"/>
      <ellipse cx="63" cy="127.5" rx="5" ry="3.5" fill="#d4a840"/>
      <line x1="38" y1="127.5" x2="58" y2="127.5" stroke="#e8d07040" strokeWidth="0.6"/>
      <rect x="44" y="131" width="8" height="34" rx="2" fill="url(#jianHandle)"/>
      {[134,138,142,146,150,154,158].map(y => (
        <rect key={y} x="43" y={y} width="10" height="1.5" rx="0.75" fill="#c8a86035"/>
      ))}
      <path d="M44,132 L52,136 M44,140 L52,144 M44,148 L52,152 M44,156 L52,160"
            stroke="#c8a86040" strokeWidth="1" fill="none"/>
      <ellipse cx="48" cy="168" rx="9" ry="5.5" fill="url(#jianPommel)" filter="url(#jianGlow)"/>
      <ellipse cx="48" cy="167" rx="5.5" ry="3" fill="#f0e09060"/>
    </svg>
  );

  // ── Half Taichi (badge icon) ───────────────────────────────────────────────
  const HalfTaichi = () => {
    const isYang = polarity === "Yang";
    return (
      <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
        {isYang ? (
          <>
            <path d="M20,2 A18,18 0 0,1 20,38 A9,9 0 0,0 20,20 A9,9 0 0,1 20,2 Z"
                  fill={color} opacity="0.85"/>
            <circle cx="20" cy="11" r="3" fill={color} opacity="0.85"/>
            <circle cx="20" cy="29" r="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.55"/>
          </>
        ) : (
          <>
            <path d="M20,2 A18,18 0 0,0 20,38 A9,9 0 0,1 20,20 A9,9 0 0,0 20,2 Z"
                  fill={color} opacity="0.85"/>
            <circle cx="20" cy="29" r="3" fill={color} opacity="0.85"/>
            <circle cx="20" cy="11" r="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.55"/>
          </>
        )}
      </svg>
    );
  };

  // ── Element Gem (badge icon) ───────────────────────────────────────────────
  const ElementGem = () => (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id={`gem_${dm.element}`} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%"   stopColor={color} stopOpacity="1"/>
          <stop offset="50%"  stopColor={color} stopOpacity="0.55"/>
          <stop offset="100%" stopColor={color} stopOpacity="0.9"/>
        </linearGradient>
      </defs>
      <polygon points="16,2 27,10 22,29 10,29 5,10" fill={`url(#gem_${dm.element})`}/>
      <polygon points="16,2 27,10 16,13 5,10" fill="white" opacity="0.28"/>
      <line x1="16" y1="2" x2="16" y2="13" stroke="white" strokeWidth="0.6" opacity="0.45"/>
      <line x1="16" y1="13" x2="10" y2="29" stroke="white" strokeWidth="0.4" opacity="0.18"/>
      <line x1="16" y1="13" x2="22" y2="29" stroke="white" strokeWidth="0.4" opacity="0.18"/>
    </svg>
  );

  // ── Badge tile: icon on top, label below, tappable ────────────────────────
  const Badge = ({ icon, label, onClick }) => (
    <div
      onClick={onClick}
      style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
               gap:6,background:`${color}0e`,border:`1px solid ${color}25`,borderRadius:12,
               padding:"14px 0",width:76,minHeight:72,cursor:"pointer",userSelect:"none"}}
      onMouseEnter={e=>{e.currentTarget.style.background=`${color}18`;e.currentTarget.style.borderColor=`${color}45`;}}
      onMouseLeave={e=>{e.currentTarget.style.background=`${color}0e`;e.currentTarget.style.borderColor=`${color}25`;}}
    >
      {icon}
      <span style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:10,
                    letterSpacing:"0.13em",textTransform:"uppercase",color,lineHeight:1}}>
        {label}
      </span>
    </div>
  );

  return (
    <div
      className="fade"
      style={{
        background:bgMap[dm.element]||C.bgCard,
        minHeight:728,
        display:"flex",flexDirection:"column",justifyContent:"center",
        padding:"36px 22px 72px",
        textAlign:"center",
        position:"relative",
      }}
    >
      {/* Identity icon */}
      <div style={{display:"flex",justifyContent:"center",marginBottom:18}}>
        {dm.stem === "庚" ? <BladeJian/> : <ArchetypeSeal stem={dm.stem} color={color} size={80}/>}
      </div>

      {/* Archetype name */}
      <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:44,fontWeight:600,
                   color,lineHeight:1,marginBottom:20,letterSpacing:"0.01em"}}>
        {profile.archetype}
      </div>

      {/* Three tappable badge tiles */}
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:8,marginBottom:22}}>
        <Badge icon={<ElementGem/>} label={dm.element} onClick={() => onOpenPopup("element")}/>
        <Badge
          icon={<span style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:21,
                              color,lineHeight:1,fontWeight:400,display:"block"}}>{dm.stem}</span>}
          label={STEM_PINYIN[dm.stem]}
          onClick={() => onOpenPopup("stem")}
        />
        <Badge icon={<HalfTaichi/>} label={polarity} onClick={() => onOpenPopup("polarity")}/>
      </div>

      {/* Manifesto — two lines */}
      {manifestoL1 && (
        <div style={{textAlign:"center",maxWidth:280,margin:"0 auto"}}>
          <div style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:15,lineHeight:1.5,
                       color:C.textSec,fontWeight:600,letterSpacing:"0.01em",marginBottom:5}}>
            {manifestoL1}
          </div>
          {manifestoL2 && (
            <div style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:13,lineHeight:1.6,
                         color:`${C.textSec}90`,fontStyle:"italic"}}>
              {manifestoL2}
            </div>
          )}
        </div>
      )}

      {/* Scroll hint */}
      <div style={{position:"absolute",bottom:24,left:"50%",transform:"translateX(-50%)",
                   display:"flex",flexDirection:"column",alignItems:"center",gap:5,opacity:0.4}}>
        <span style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:9,letterSpacing:"0.22em",
                       textTransform:"uppercase",color}}>Discover</span>
        <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
          <path d="M1 1L7 7L13 1" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
// ─── DEBUG PANEL — NOT FOR PRODUCTION ─────────────────────────────────────
// This panel displays the computed user profile database for development only.
// It will NOT ship in the actual product. Expand with additional db fields later.
function DebugPanel({ chart }) {
  const [open, setOpen] = useState(false);
  const dm      = chart.dayMaster;
  const profile = buildDayMasterProfile(chart);
  const band    = getEnergyBand(dm.strength);
  const tgPat   = computeTgPattern(chart);
  const catalyst= getPrimaryCatalyst(chart);

  const rows = [
    ["Day Master stem",    dm.stem],
    ["Day Master element", dm.element],
    ["Polarity",           dm.polarity],
    ["Strength",           dm.strength],
    ["Energy band",        band],
    ["Archetype",          profile.archetype],
    ["tgPattern",          tgPat],
    ["Catalyst",           catalyst],
    ["Archetype key",      `${dm.stem}_${band}_${tgPat}`],
    ["Shareable code",     `${dm.stem} · ${(profile.archetype||"").replace("The","").trim().toUpperCase()} · ${band.toUpperCase()} · ${(tgPat||"").toUpperCase()}`],
    ["MBTI resonance",     profile.persona?.mbti_resonance?.join(" · ") || "—"],
    ["Adjectives",         profile.persona?.adjectives?.join(", ") || "—"],
    ["Tension (2AM)",      profile.twoAM ? `"${profile.twoAM.slice(0,60)}…"` : "—"],
    ["Missing elements",   chart.missingElements?.join(", ") || "none"],
    ["Element scores",     Object.entries(chart.elements||{}).map(([el,d])=>`${el}:${d.count??0}`).join(" · ")],
  ];

  const ff = "'EB Garamond',Georgia,serif";
  return (
    <div style={{marginTop:24,borderRadius:10,border:"1px dashed #c4745a50",overflow:"hidden",fontFamily:ff}}>
      <button onClick={()=>setOpen(o=>!o)} style={{width:"100%",padding:"10px 14px",background:"#c4745a08",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:9,fontWeight:600,letterSpacing:1.5,textTransform:"uppercase",color:"#c4745a",fontFamily:ff}}>⚙ Debug — User Profile Database</span>
          <span style={{fontSize:9,color:"#c4745a80",fontFamily:ff,fontStyle:"italic"}}>not shipped in production</span>
        </div>
        <span style={{fontSize:11,color:"#c4745a70"}}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{padding:"12px 14px",background:"#fdf9f7"}}>
          <div style={{fontSize:9,color:"#c4745a90",fontFamily:ff,fontStyle:"italic",marginBottom:10,lineHeight:1.6}}>
            This panel shows the computed profile data stored in the user's database record. All fields shown here are available for product features but intentionally hidden from the identity card UI. Expand this panel as new database fields are added.
          </div>
          <div style={{borderRadius:6,overflow:"hidden",border:"0.5px solid #c4745a20"}}>
            {rows.map(([label, value], i) => (
              <div key={i} style={{display:"flex",gap:10,padding:"7px 10px",borderBottom: i<rows.length-1?"0.5px solid #c4745a12":"none",background:i%2===0?"transparent":"#c4745a05"}}>
                <div style={{fontSize:10,color:"#9a8a7e",fontFamily:ff,width:140,flexShrink:0}}>{label}</div>
                <div style={{fontSize:10,color:"#584A3E",fontFamily:"monospace",flex:1,wordBreak:"break-all"}}>{value}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:10,padding:"8px 10px",background:"#c4745a08",borderRadius:6,border:"0.5px solid #c4745a18"}}>
            <div style={{fontSize:9,fontWeight:600,letterSpacing:1,textTransform:"uppercase",color:"#c4745a",fontFamily:ff,marginBottom:4}}>Pillars</div>
            {["year","month","day","hour"].map(p => {
              const pl = chart.pillars?.[p];
              if (!pl) return null;
              return (
                <div key={p} style={{display:"flex",gap:8,marginBottom:3}}>
                  <span style={{fontSize:9,color:"#9a8a7e",fontFamily:ff,width:40}}>{p}</span>
                  <span style={{fontSize:10,fontFamily:"monospace",color:"#584A3E"}}>{pl.stem}{pl.branch} — {pl.stemElement}/{pl.branchElement}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function ProfileReading({ chart, userTier = TIERS.FREE, onPaywall = ()=>{} }) {
  const dm      = chart.dayMaster;
  const color   = EL_C[dm.element];
  const profile = buildDayMasterProfile(chart);
  const ff      = "'EB Garamond',Georgia,serif";
  const divider = <div style={{height:"0.5px",background:`${color}20`,margin:"20px 0"}}/>;
  const isSeeker = userTier >= TIERS.SEEKER;

  // Gated content wrapper — blur + upgrade tap
  const GatedOverlay = ({ children, label = "Unlock on Seeker" }) => (
    <div style={{position:"relative"}}>
      <div style={{filter:"blur(4px)",pointerEvents:"none",userSelect:"none"}}>{children}</div>
      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8}}>
        <div style={{fontSize:10,letterSpacing:1.5,textTransform:"uppercase",color:C.textTer,fontFamily:ff}}>◆ {label}</div>
        <button onClick={onPaywall} style={{padding:"6px 18px",borderRadius:20,border:`1px solid ${C.accentLight}`,background:"transparent",fontFamily:ff,fontSize:12,color:C.accentDark,cursor:"pointer"}}>See full reading</button>
      </div>
    </div>
  );

  const bgMap   = {
    Metal:"linear-gradient(160deg,#eef2f8 0%,#f0ebe0 100%)",
    Wood: "linear-gradient(160deg,#eef5ee 0%,#f0ebe0 100%)",
    Fire: "linear-gradient(160deg,#f9efee 0%,#f0ebe0 100%)",
    Earth:"linear-gradient(160deg,#f5f0e8 0%,#f0ebe0 100%)",
    Water:"linear-gradient(160deg,#eef1f8 0%,#f0ebe0 100%)",
  };
  return (
    <div style={{borderRadius:16,border:`1.5px solid ${color}30`,background:bgMap[dm.element]||C.bgCard,marginBottom:24,overflow:"hidden"}} className="fade">
      <div style={{padding:"22px 22px 26px"}}>

        {/* Energy level */}
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20,padding:"14px 16px",background:`${color}06`,borderRadius:10,border:`0.5px solid ${color}15`}}>
          <StrengthRing pct={profile.strengthRing.pct} color={color} stem={dm.stem} size={48}/>
          <div>
            <div style={{fontSize:11,letterSpacing:1.2,textTransform:"uppercase",color:color,fontFamily:ff,fontWeight:500,marginBottom:3}}>{profile.strengthRing.label}</div>
            <div style={{fontSize:13,color:C.textTer,fontFamily:ff,fontStyle:"italic",lineHeight:1.5}}>{profile.strengthRing.sublabel}</div>
          </div>
        </div>

        {/* 2 AM Thought */}
        {profile.twoAM && (
          <>
            {divider}
            <div style={{borderRadius:14,padding:"18px 20px",marginBottom:4,border:`1px dashed ${color}35`,background:`${color}04`}}>
              <div style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:color,fontFamily:ff,fontWeight:500,marginBottom:10}}>2 AM Thought</div>
              {isSeeker ? (
                <p style={{fontFamily:ff,fontSize:16,lineHeight:1.8,color:C.text,fontStyle:"italic",margin:0}}>"{profile.twoAM}"</p>
              ) : (
                <>
                  <p style={{fontFamily:ff,fontSize:16,lineHeight:1.8,color:C.text,fontStyle:"italic",margin:"0 0 10px"}}>
                    "{profile.twoAM.split(" ").slice(0,8).join(" ")}…"
                  </p>
                  <button onClick={onPaywall} style={{fontSize:12,fontFamily:ff,color:C.accentDark,background:"transparent",border:`0.5px solid ${C.accentLight}`,borderRadius:20,padding:"4px 14px",cursor:"pointer"}}>◆ Full thought on Seeker</button>
                </>
              )}
            </div>
          </>
        )}

        {divider}

        {/* Core Gifts */}
        <div style={{marginBottom:14,borderRadius:14,overflow:"hidden",border:`1px solid ${color}22`}}>
          <div style={{background:`${color}18`,borderBottom:`1px solid ${color}20`,padding:"12px 18px",display:"flex",alignItems:"center",gap:10}}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <polygon points="7,1 8.8,5.5 13.5,5.5 9.7,8.5 11.2,13 7,10.2 2.8,13 4.3,8.5 0.5,5.5 5.2,5.5" fill={color} opacity="0.85"/>
            </svg>
            <div style={{fontSize:11,letterSpacing:2,textTransform:"uppercase",color:color,fontFamily:ff,fontWeight:600}}>Core Gifts</div>
            {!isSeeker && <div style={{marginLeft:"auto",fontSize:10,color:C.textTer,fontFamily:ff}}>◆ Full detail on Seeker</div>}
          </div>
          <div style={{background:`${color}06`,padding:"6px 0"}}>
            {profile.strengths.map((s,i) => (
              <div key={i} style={{padding:"14px 18px",borderBottom:i<profile.strengths.length-1?`0.5px solid ${color}15`:"none"}}>
                <div style={{fontFamily:ff,fontSize:15,fontWeight:600,color:color,lineHeight:1.4,marginBottom:isSeeker&&s.desc?5:0}}>{s.label||s}</div>
                {isSeeker && s.desc && <div style={{fontFamily:ff,fontSize:14,lineHeight:1.7,color:C.textSec}}>{s.desc}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Growing Edge */}
        <div style={{borderRadius:14,overflow:"hidden",border:`1px solid ${C.accent}22`,marginBottom:profile.landscape?14:0}}>
          <div style={{background:`${C.accent}12`,borderBottom:`1px solid ${C.accent}18`,padding:"12px 18px",display:"flex",alignItems:"center",gap:10}}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2 C7 2 11 5 11 8.5 C11 10.5 9.2 12 7 12 C4.8 12 3 10.5 3 8.5 C3 5 7 2 7 2Z" stroke={C.accent} strokeWidth="1.2" fill="none" opacity="0.8"/>
              <path d="M7 5.5 L7 8.5" stroke={C.accent} strokeWidth="1.4" strokeLinecap="round"/>
              <circle cx="7" cy="10" r="0.7" fill={C.accent} opacity="0.8"/>
            </svg>
            <div style={{fontSize:11,letterSpacing:2,textTransform:"uppercase",color:C.accent,fontFamily:ff,fontWeight:600}}>Growing Edge</div>
            {!isSeeker && <div style={{marginLeft:"auto",fontSize:10,color:C.textTer,fontFamily:ff}}>◆ Full detail on Seeker</div>}
          </div>
          <div style={{background:`${C.accent}04`,padding:"6px 0"}}>
            {profile.shadows.map((s,i) => (
              <div key={i} style={{padding:"14px 18px",borderBottom:i<profile.shadows.length-1?`0.5px solid ${C.accent}12`:"none"}}>
                <div style={{fontFamily:ff,fontSize:15,fontWeight:600,color:C.accent,lineHeight:1.4,marginBottom:isSeeker&&s.desc?5:0}}>{s.label||s}</div>
                {isSeeker && s.desc && <div style={{fontFamily:ff,fontSize:14,lineHeight:1.7,color:C.textSec}}>{s.desc}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Landscape */}
        {profile.landscape && (
          <div style={{borderRadius:14,overflow:"hidden",border:`1px solid ${color}22`}}>
            <div style={{background:`${color}10`,borderBottom:`1px solid ${color}18`,padding:"12px 18px",display:"flex",alignItems:"center",gap:10}}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 11 L4 6 L7 9 L10 4 L13 11 Z" stroke={color} strokeWidth="1.1" fill={`${color}20`} strokeLinejoin="round"/>
              </svg>
              <div style={{fontSize:11,letterSpacing:2,textTransform:"uppercase",color:color,fontFamily:ff,fontWeight:600}}>Your Landscape</div>
            </div>
            <div style={{padding:"6px 0"}}>
              <div style={{padding:"14px 18px",borderBottom:`0.5px solid ${color}15`,display:"flex",gap:12,alignItems:"flex-start"}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:color,marginTop:7,flexShrink:0}}/>
                <div>
                  <div style={{fontSize:11,letterSpacing:1,textTransform:"uppercase",color:color,fontFamily:ff,marginBottom:5}}>Where you operate at full capacity</div>
                  <div style={{fontFamily:ff,fontSize:14,lineHeight:1.75,color:C.textSec}}>{profile.landscape.thrives}</div>
                </div>
              </div>
              <div style={{padding:"14px 18px",display:"flex",gap:12,alignItems:"flex-start"}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:C.accent,marginTop:7,flexShrink:0}}/>
                <div>
                  <div style={{fontSize:11,letterSpacing:1,textTransform:"uppercase",color:C.accent,fontFamily:ff,marginBottom:5}}>Where this consistently costs you</div>
                  <div style={{fontFamily:ff,fontSize:14,lineHeight:1.75,color:C.textSec}}>{profile.landscape.costs}</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
function PillarGrid({ chart }) {
  const labels = { year:"年", month:"月", day:"日", hour:"时" };
  return (
    <div style={{display:"flex",gap:6,marginBottom:16}}>
      {["year","month","day","hour"].map(p => {
        const pl = chart.pillars[p], isDay = p==="day";
        return (
          <div key={p} style={{flex:1,borderRadius:10,border:isDay?`1.5px solid ${C.accentLight}`:`1px solid ${C.border}`,background:isDay?"#f5edd8":C.bgCard,padding:"10px 4px",textAlign:"center"}}>
            <div style={{fontSize:8,color:C.textTer,letterSpacing:1,marginBottom:5,textTransform:"uppercase"}}>{labels[p]}</div>
            <div style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:29,lineHeight:1,color:isDay?C.accentDark:EL_C[pl.stemElement],fontWeight:isDay?600:400}}>{pl.stem}</div>
            <div style={{fontSize:7,color:EL_C[pl.stemElement],marginBottom:7,marginTop:2}}>{pl.stemElement}</div>
            <div style={{height:"0.5px",background:C.border,margin:"0 6px 7px"}}/>
            <div style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:29,lineHeight:1,color:EL_C[pl.branchElement]}}>{pl.branch}</div>
            <div style={{fontSize:7,color:EL_C[pl.branchElement],marginTop:3}}>{pl.branchElement}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── ELEMENT ICONS — inline SVG per element ───────────────────────────────
function ElementIcon({ el, color, size=15 }) {
  const s = size;
  const icons = {
    Metal: <svg width={s} height={s} viewBox="0 0 18 18" fill="none"><polygon points="9,2 16,6 16,12 9,16 2,12 2,6" stroke={color} strokeWidth="1.4" fill="none"/><circle cx="9" cy="9" r="2.5" fill={color} opacity="0.65"/></svg>,
    Wood:  <svg width={s} height={s} viewBox="0 0 18 18" fill="none"><line x1="9" y1="16" x2="9" y2="4" stroke={color} strokeWidth="1.6" strokeLinecap="round"/><line x1="9" y1="10" x2="4" y2="7" stroke={color} strokeWidth="1.2" strokeLinecap="round"/><line x1="9" y1="10" x2="14" y2="7" stroke={color} strokeWidth="1.2" strokeLinecap="round"/><line x1="9" y1="7" x2="5.5" y2="4.5" stroke={color} strokeWidth="0.9" strokeLinecap="round"/><line x1="9" y1="7" x2="12.5" y2="4.5" stroke={color} strokeWidth="0.9" strokeLinecap="round"/></svg>,
    Earth: <svg width={s} height={s} viewBox="0 0 18 18" fill="none"><rect x="3" y="3" width="12" height="12" rx="1.5" stroke={color} strokeWidth="1.4" fill="none"/><line x1="3" y1="9" x2="15" y2="9" stroke={color} strokeWidth="0.8" opacity="0.5"/><line x1="9" y1="3" x2="9" y2="15" stroke={color} strokeWidth="0.8" opacity="0.5"/></svg>,
    Water: <svg width={s} height={s} viewBox="0 0 18 18" fill="none"><path d="M2 7 Q5 4 9 7 Q13 10 16 7" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M2 11 Q5 8 9 11 Q13 14 16 11" stroke={color} strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.65"/></svg>,
    Fire:  <svg width={s} height={s} viewBox="0 0 18 18" fill="none"><path d="M9 16 C5 16 3 13 3 10 C3 6 7 3 9 1 C11 3 15 6 15 10 C15 13 13 16 9 16 Z" stroke={color} strokeWidth="1.3" fill={color} fillOpacity="0.12"/><path d="M9 14 C7 14 6 12.5 6 11 C6 8.5 8 6.5 9 5 C10 6.5 12 8.5 12 11 C12 12.5 11 14 9 14 Z" fill={color} opacity="0.35"/></svg>,
  };
  return icons[el] || null;
}

// ─── ELEMENT SPECTRUM — Section 2 ─────────────────────────────────────────
// Replaces old ElementBars. Single unified component covering:
//   D1: element counts, dominant, missing, strength verdict
//   Insights: dominant + missing one-liners with guidance
//   Lifts / depletes: what lifts you / what depletes you

// ─── ELEMENT_ENERGIES — band-conditional catalyst / friction ─────────────────
// Each stem has three bands. Catalyst/friction INVERT by band per 扶抑用神:
//   Concentrated (excess DM) → needs 克泄耗 (control/exhaust/expend) → catalyst
//                             → 生助 (generate/compound) are friction
//   Balanced                 → needs moderate support; avoid extremes
//   Open (deficient DM)      → needs 生助 (generate/strengthen) → catalyst
//                             → 克泄 (control/drain) are friction
// The 调候 layer applies seasonal override on top of whichever band is selected.
const ELEMENT_ENERGIES = {
  "甲": {
    concentrated: {
      lifts: [
        { el:"Metal", line:"Metal is the force that gives your reach definition — without something that says 'here, not everywhere,' growth disperses. In environments where this force is present you stop reaching in all directions and start building something that holds." },
        { el:"Fire",  line:"Fire is where your reach converts into something visible. You pour energy outward naturally; Fire is the element that turns that outward pour into warmth and expression others can actually receive and recognise." },
      ],
      depletes: [
        { el:"Water", line:"Water nourishes what is already growing without limit — and at this level, more nourishment is the last thing needed. Environments dominated by Water tend to feed the reach before it has any reason to consolidate." },
        { el:"Wood",  line:"More of what you already carry in abundance. Wood-saturated environments compound the reaching instinct until the spread becomes structural — broad investment, shallow roots, and little that is specifically yours." },
      ],
    },
    balanced: {
      lifts: [
        { el:"Water", line:"Water nourishes without pushing — it sustains the roots quietly while the reach continues. At this level it maintains without overwhelming, and what you build with it tends to last." },
        { el:"Metal", line:"Metal provides moderate definition — enough to give the growth direction without cutting what should continue. The two are in productive tension: reach and structure holding each other in check." },
      ],
      depletes: [
        { el:"Wood",  line:"More reaching when equilibrium is what's needed. Wood-dominant environments tip the balance toward extension before consolidation, and what was sustainable becomes overextended." },
        { el:"Fire",  line:"Fire draws the energy outward into expression faster than the balance can absorb — what was moving at the right pace accelerates past the point where the roots can follow." },
      ],
    },
    open: {
      lifts: [
        { el:"Water", line:"Water is the primary nourishment for this chart — it feeds the roots directly and allows the reach to develop the depth it needs to sustain itself. This is the element that makes what you build genuinely yours." },
        { el:"Wood",  line:"More of what you are at your core gives this chart the strength it needs. In environments where Wood is present and supported, the growth that has always been potential starts to become structural." },
      ],
      depletes: [
        { el:"Metal", line:"Metal cuts against what needs to be growing — and at this level, the reach is already operating on limited resources. Environments dominated by this force tend to diminish what is still establishing itself." },
        { el:"Fire",  line:"Fire draws the energy outward into expression before the roots have established — draining what is already scarce into output that the chart cannot yet sustain." },
      ],
    },
  },
  "乙": {
    concentrated: {
      lifts: [
        { el:"Metal", line:"Metal gives the intelligence a defined path rather than a general surface — it converts the Vine's natural navigation into movement toward something specific. In environments where this force is present, the adaptability finds its actual destination." },
        { el:"Fire",  line:"Fire is where the Vine's sensitivity converts into visible expression. The navigation has always been real; Fire is what makes it visible and gives it a direction others can orient around." },
      ],
      depletes: [
        { el:"Water", line:"Water nourishes the Vine's reach further when the reach is already everywhere. Environments dominated by Water at this level tend to produce more movement than arrival — the intelligence stays in motion without committing to where it has landed." },
        { el:"Wood",  line:"More reaching compounds what is already in excess. Wood-saturated environments at this level reinforce the instinct to find another path before the current one has been fully climbed." },
      ],
    },
    balanced: {
      lifts: [
        { el:"Water", line:"Water sustains the Vine's intelligence steadily — nourishing without flooding, allowing the navigation to continue at a depth that produces genuine arrival rather than continuous movement." },
        { el:"Metal", line:"Metal provides enough definition to give the adaptability a specific surface worth committing to. The two are in productive conversation: the Vine's intelligence and the structure that lets it become something." },
      ],
      depletes: [
        { el:"Wood",  line:"More adaptability than the balance can hold. Wood-dominant environments tip toward continuous navigation at the expense of the consolidation that gives the intelligence somewhere to land." },
        { el:"Fire",  line:"Fire accelerates outward expression faster than the equilibrium can absorb — drawing the Vine's intelligence into performance before the underlying navigation has been completed." },
      ],
    },
    open: {
      lifts: [
        { el:"Water", line:"Water nourishes the intelligence at its source — feeding the Vine's capacity to read and navigate without requiring it to perform. This is the primary nourishment for what this chart does most distinctively." },
        { el:"Wood",  line:"More of the Vine's own nature gives it the strength to navigate with its full intelligence rather than in a diminished form. The adaptability deepens when it has genuine support." },
      ],
      depletes: [
        { el:"Metal", line:"Metal cuts the navigation before it reaches its destination — and at this level, the intelligence is already operating on limited resources. Environments dominated by this force tend to sever what is still finding its route." },
        { el:"Fire",  line:"Fire draws the Vine's sensitivity outward into expression before the underlying navigation has established — draining what little energy is available into visibility rather than depth." },
      ],
    },
  },
  "丙": {
    concentrated: {
      lifts: [
        { el:"Water", line:"Water is the containing force that gives the warmth a boundary — without it, the light illuminates everything at equal intensity and nothing specifically. In environments where this force is present the Sun's warmth becomes directed rather than diffuse." },
        { el:"Earth", line:"Earth is where the Sun's warmth deposits into something lasting — it converts the relational energy into structure and productive form. Fire pours; Earth holds what it pours into." },
      ],
      depletes: [
        { el:"Wood",  line:"Wood feeds what is already at full intensity — more fuel into a fire that doesn't need it. Environments dominated by this force compound the warmth until the presence becomes consuming rather than illuminating." },
        { el:"Fire",  line:"More of what you already carry in excess. Fire-saturated environments deepen the intensity until the source is expenditure without replenishment — warmth that gives everything and holds nothing back for itself." },
      ],
    },
    balanced: {
      lifts: [
        { el:"Wood",  line:"Wood nourishes the Sun at a pace the balance can absorb — sustaining the warmth without inflaming it, allowing the illumination to continue without consuming its own source." },
        { el:"Water", line:"Water provides moderate containment — enough to give the warmth direction without extinguishing it. The two forces hold each other: the Sun illuminates, Water gives what it illuminates a form." },
      ],
      depletes: [
        { el:"Fire",  line:"More warmth than the equilibrium can hold. Fire-dominant environments push toward the excess condition — the presence filling every room rather than the rooms that specifically need it." },
        { el:"Earth", line:"Earth draws the Sun's energy outward into productive deposit faster than the balance replenishes — converting warmth into structure at a pace that leaves the source running low." },
      ],
    },
    open: {
      lifts: [
        { el:"Wood",  line:"Wood is the primary nourishment for the Sun's warmth — feeding the source so the illumination can continue without burning through what little it has. This is the element that sustains what this chart does most naturally." },
        { el:"Fire",  line:"More of the Sun's own nature gives it the warmth it needs. In environments where Fire is present and genuine, the illumination deepens rather than spreading thin." },
      ],
      depletes: [
        { el:"Water", line:"Water extinguishes what needs to be burning — and at this level, the warmth is already operating without a full source. Environments dominated by this force work directly against the Sun's most essential quality." },
        { el:"Earth", line:"Earth draws the warmth outward into productive deposit before the source has replenished — at this level, the expenditure depletes what was already scarce." },
      ],
    },
  },
  "丁": {
    concentrated: {
      lifts: [
        { el:"Water", line:"Water is the containing force that gives the focused attention its boundary — without it, the candle illuminates in all directions at once and loses the precision that makes it irreplaceable. Where this force is present, the intensity becomes specific." },
        { el:"Earth", line:"Earth is where the candle's focused attention converts into something that persists — warmth deposited into form rather than released and gone. The specific illumination builds something that remains after the light moves on." },
      ],
      depletes: [
        { el:"Wood",  line:"Wood feeds what is already burning at full intensity — more nourishment into a flame that needs direction, not more fuel. Wood-dominant environments compound the focused attention until the precision becomes broadcast." },
        { el:"Fire",  line:"More of what you already carry in excess. Fire-saturated environments deepen the intensity past the point where the specificity that makes the candle irreplaceable can be sustained." },
      ],
    },
    balanced: {
      lifts: [
        { el:"Wood",  line:"Wood sustains the candle steadily — nourishing the focused attention without inflaming it past the point of precision. The flame continues; what it illuminates deepens." },
        { el:"Water", line:"Water provides moderate containment at this level — enough to keep the intensity from spreading, allowing the specific attention to continue doing its particular work." },
      ],
      depletes: [
        { el:"Fire",  line:"More intensity than the equilibrium can sustain. Fire-dominant environments push the focused attention past the specificity that gives it power — the candle becomes a torch, and the precision is lost." },
        { el:"Earth", line:"Earth draws the focused energy outward faster than the equilibrium replenishes — depositing the attention into lasting form at a pace that leaves the source running low." },
      ],
    },
    open: {
      lifts: [
        { el:"Wood",  line:"Wood is the primary nourishment for the candle's focused attention — the consistent, quiet feeding that allows the precision to continue without consuming itself. This is the element this chart most needs." },
        { el:"Fire",  line:"More of the candle's own nature gives it the warmth and specificity it needs. In genuinely supportive environments the focused attention deepens and the precision sharpens." },
      ],
      depletes: [
        { el:"Water", line:"Water extinguishes what the candle's precision depends on — and at this level, the flame is already delicate. Environments where this force dominates work directly against the most essential quality this chart carries." },
        { el:"Earth", line:"Earth draws the focused attention outward into lasting deposit before the source has anything to spare — at this level the expenditure depletes what was already insufficient." },
      ],
    },
  },
  "戊": {
    concentrated: {
      lifts: [
        { el:"Wood",  line:"Wood is the force that prevents calcification — roots that push through the Mountain's stability and require it to yield. In environments where this force is present the reliability that defines this chart becomes dynamic rather than merely weight-bearing." },
        { el:"Metal", line:"Metal is where the Mountain's accumulated stability converts into refined, specific output — it takes what the Earth has consolidated and gives it a form that can actually be used. Stability that produces something." },
      ],
      depletes: [
        { el:"Fire",  line:"Fire generates more Earth — more warmth deposited into an already-saturated foundation. Environments dominated by this force deepen the immobility rather than activating what has been patient." },
        { el:"Earth", line:"More of what you already carry in abundance. Earth-heavy environments compound the stability until it becomes inertia — the Mountain that can no longer distinguish between holding and refusing to move." },
      ],
    },
    balanced: {
      lifts: [
        { el:"Fire",  line:"Fire activates what has been patient — bringing warmth and movement to the stability without destabilising it. At this level the two are in productive conversation: the Mountain holds and the warmth gives it something to hold toward." },
        { el:"Wood",  line:"Wood provides moderate movement — enough to keep the stability dynamic and living without undermining the foundation that gives this chart its most essential quality." },
      ],
      depletes: [
        { el:"Earth", line:"More stability than the equilibrium needs. Earth-dominant environments push toward the concentrated condition — the holding becomes weight rather than ground, and movement becomes increasingly difficult." },
        { el:"Metal", line:"Metal draws the Mountain's energy outward into refinement and output faster than the balance can replenish — converting what should be steady accumulation into depletion of the source." },
      ],
    },
    open: {
      lifts: [
        { el:"Fire",  line:"Fire is the primary nourishment for the Mountain at this level — the warmth that activates what has been patient and creates the conditions for the stability to become generative rather than simply present." },
        { el:"Earth", line:"More of the Mountain's own nature gives it the depth of foundation it needs. In environments where this force is genuinely supportive, what has been holding quietly can begin to hold with authority." },
      ],
      depletes: [
        { el:"Wood",  line:"Wood controls and destabilises what is already operating on limited foundation — roots pushing through ground that hasn't yet consolidated. Environments dominated by this force work against the stability before it can establish itself." },
        { el:"Metal", line:"Metal draws the Mountain's accumulated resources outward into output before the foundation has established — at this level the expenditure depletes what was already scarce." },
      ],
    },
  },
  "己": {
    concentrated: {
      lifts: [
        { el:"Wood",  line:"Wood gives the Field's fertility a direction — it takes what nourishes in all directions and asks it to nourish something specific. In environments where this force is present the cultivation becomes intentional rather than ambient." },
        { el:"Metal", line:"Metal is where the Field's patient cultivation converts into something that can be harvested — refined, specific output from what has been quietly growing. The fertility produces something that can be held and used." },
      ],
      depletes: [
        { el:"Fire",  line:"Fire generates more Earth — more warmth and activation into a field that is already producing everywhere it turns. Environments dominated by this force compound the nourishing instinct until the fertility is dispersed without return." },
        { el:"Earth", line:"More of what you already carry in abundance. Earth-heavy environments deepen the accumulation without giving the fertility any specific direction — more soil without more harvest." },
      ],
    },
    balanced: {
      lifts: [
        { el:"Fire",  line:"Fire activates and ripens — the warmth that converts patient cultivation into visible results without depleting the source. At this level it moves the fertility toward harvest at a pace the Field can sustain." },
        { el:"Wood",  line:"Wood gives the cultivation direction without taking more than it returns. The two are in productive tension: the Field nourishes and Wood gives that nourishment something to grow toward." },
      ],
      depletes: [
        { el:"Earth", line:"More accumulation than the equilibrium needs. Earth-dominant environments tip the Field toward retention rather than production — the fertility builds without the movement toward harvest that gives it purpose." },
        { el:"Metal", line:"Metal draws the Field's resources into harvest faster than the balance can replenish — what should be a cycle of growth and rest becomes a one-directional depletion." },
      ],
    },
    open: {
      lifts: [
        { el:"Fire",  line:"Fire is the warmth that ripens and activates what this chart cultivates — the primary nourishment that converts patient growth into something that can actually be harvested. Without it, the fertility remains potential." },
        { el:"Earth", line:"More of the Field's own nature gives it the depth of soil it needs. In genuinely supportive environments the cultivation deepens and what has been quietly growing produces at a scale that surprises." },
      ],
      depletes: [
        { el:"Wood",  line:"Wood takes from what has been carefully cultivated without restoring what it uses — draining the Field's fertility at a rate the chart can't sustain. The growth it produces is real; the cost to the source is also real." },
        { el:"Water", line:"Water floods what needs careful cultivation — too much arrives before the Field can absorb it, and what was growing carefully becomes waterlogged before it can produce." },
      ],
    },
  },
  "庚": {
    concentrated: {
      lifts: [
        { el:"Fire",  line:"Fire is the forge — the external force that gives precision its direction. The capability has always been present. What Fire brings is the target: when it enters your life through the right environment, challenge, or people, the precision stops searching and starts producing." },
        { el:"Water", line:"Water is the release channel — Metal generates Water naturally, and at this level that outward flow is what prevents the precision from turning back on itself. Environments rich in Water give the edge somewhere to go rather than accumulating as pressure." },
      ],
      depletes: [
        { el:"Earth", line:"Earth generates more Metal — adding to what is already in excess. Environments dominated by Earth compound the precision until the capability deepens without finding direction, and what was formidable becomes rigid." },
        { el:"Metal", line:"More of what you already carry in abundance. Metal-heavy environments intensify the evaluative apparatus without providing a target — rigid hierarchies and pure-precision environments don't sharpen the edge. They compress it." },
      ],
    },
    balanced: {
      lifts: [
        { el:"Fire",  line:"Fire provides moderate direction at this level — enough to keep the precision purposeful without applying overwhelming pressure. The edge stays sharp and pointed toward something genuinely worth the precision." },
        { el:"Earth", line:"Earth provides moderate generation — sustaining the DM without adding to excess. At this level the two are in balance: the precision is supported and the direction is maintained." },
      ],
      depletes: [
        { el:"Metal", line:"More of the same risks tipping the equilibrium toward excess — the evaluative apparatus intensifying past the point where it serves the work rather than replacing it." },
        { el:"Water", line:"Water risks draining the precision outward faster than the balance can replenish — the release channel drawing the edge into flow before it has found what it's for." },
      ],
    },
    open: {
      lifts: [
        { el:"Earth", line:"Earth generates and sustains the precision at this level — the quiet nourishment that keeps the edge from dispersing entirely. This is the primary support for a chart that is already operating with limited resources." },
        { el:"Metal", line:"More of the DM's own nature gives it the strength it needs. In genuinely supportive environments the precision consolidates rather than dispersing, and the capability becomes structural rather than conditional." },
      ],
      depletes: [
        { el:"Fire",  line:"Fire controls and directs what is already at limited strength — at this level the pressure that refines a concentrated chart diminishes a weak one. Environments dominated by this force work against what needs to be sustained." },
        { el:"Water", line:"Water drains scarce Metal further — the outward flow that releases excess in a concentrated chart depletes what little remains in a weak one. The edge disperses before it can find its target." },
      ],
    },
  },
  "辛": {
    concentrated: {
      lifts: [
        { el:"Water", line:"Water reveals the jewel — it brings out what was always present rather than adding something new. The clarity the Jewel carries has always been real; Water is the element that makes it visible and specific rather than merely potential." },
        { el:"Fire",  line:"Fire refines with care — the heat that reveals quality when the setting is intact. At this level it gives the discernment a purpose: the standard that was internal becomes one that the world can encounter and recognise." },
      ],
      depletes: [
        { el:"Earth", line:"Earth generates more Metal — adding density to an already saturated discernment. Environments dominated by Earth compound the refinement until the precision crowds rather than clarifies, and the quality becomes obscured by its own accumulation." },
        { el:"Metal", line:"More of what you already carry in abundance. Metal-heavy environments deepen the density rather than the clarity — what should refine becomes compression, and the jewel's quality is lost in the accumulation." },
      ],
    },
    balanced: {
      lifts: [
        { el:"Water", line:"Water sustains the Jewel's clarity at the right depth — neither flooding nor withdrawing. The discernment continues to operate at its finest, and what is perceived is both accurate and usable." },
        { el:"Earth", line:"Earth holds and protects the setting — providing the structure that allows the discernment to function without being exposed to conditions that damage it. Quality requires a context that can receive it." },
      ],
      depletes: [
        { el:"Metal", line:"More density than the equilibrium can hold. Metal-dominant environments tip the balance toward the concentrated condition — the discernment deepening into compression rather than maintaining the clarity that makes it valuable." },
        { el:"Fire",  line:"Fire without Earth's mediation risks the setting — at this level the heat tests rather than reveals, and the precision can be damaged rather than refined. The balance between heat and protection is specific to this archetype." },
      ],
    },
    open: {
      lifts: [
        { el:"Earth", line:"Earth holds and protects what is already operating with limited resources — at this level it is the primary support, the setting that allows the Jewel's discernment to function at all rather than dispersing entirely." },
        { el:"Metal", line:"More of the Jewel's own nature gives the discernment the strength it needs. In genuinely supportive environments the quality that has always been real becomes something the chart can operate from rather than reaching toward." },
      ],
      depletes: [
        { el:"Fire",  line:"Fire without sufficient grounding damages what it should reveal — at this level the heat that refines a concentrated Jewel works against an open one, diminishing the setting rather than illuminating what's in it." },
        { el:"Water", line:"Water flows outward and carries the discernment with it before it can concentrate — draining what little clarity remains rather than revealing it. The Jewel needs stillness, not more movement." },
      ],
    },
  },
  "壬": {
    concentrated: {
      lifts: [
        { el:"Earth", line:"Earth gives the depth its banks — without it the intelligence flows everywhere at once and becomes impossible to navigate. In environments where this force is present the vast perceptual range finds channels and becomes something others can actually use." },
        { el:"Wood",  line:"Wood is where the Ocean's depth converts into productive growth — the intelligence poured outward into something that develops and reaches. The depth finds a direction rather than continuing to accumulate." },
      ],
      depletes: [
        { el:"Metal", line:"Metal generates more Water — adding depth to what is already vast. Environments dominated by Metal compound the intelligence until the range becomes overwhelming rather than navigable, and the depth deepens without form." },
        { el:"Water", line:"More of what you already carry in abundance. Water-heavy environments amplify the perceptual range until the intelligence is simultaneously everywhere and specifically nowhere." },
      ],
    },
    balanced: {
      lifts: [
        { el:"Metal", line:"Metal generates steadily at the right level — sustaining the depth without flooding it. The intelligence is nourished without being overwhelmed, and what is perceived continues to be specific rather than diffuse." },
        { el:"Earth", line:"Earth provides moderate containment — enough to give the depth direction without damming the current entirely. The two are in productive relationship: the depth moves within a form that allows it to reach who it's for." },
      ],
      depletes: [
        { el:"Water", line:"More depth than the equilibrium can give form to. Water-dominant environments tip toward the concentrated condition — the intelligence amplifying without the banks that make it navigable." },
        { el:"Wood",  line:"Wood draws the depth outward into expression and growth faster than the balance can replenish — the intelligence converting into output at a pace that leaves the source running low." },
      ],
    },
    open: {
      lifts: [
        { el:"Metal", line:"Metal is the primary source — the element that generates and renews the Ocean's depth. At this level it is what keeps the intelligence alive and accumulating rather than dispersing entirely into the contexts it moves through." },
        { el:"Water", line:"More of the Ocean's own nature gives it the range and depth it needs. In environments where Water is genuinely present and supportive, the intelligence that has been operating below its capacity comes through fully." },
      ],
      depletes: [
        { el:"Earth", line:"Earth dams the current — and at this level the current is already limited. Environments dominated by this force block the movement that is this chart's most natural quality, creating stagnation in what was built for depth and reach." },
        { el:"Fire",  line:"Fire evaporates the depth before it can be used — at this level the intelligence that took sustained effort to accumulate can be consumed before it reaches the people or outcomes it was moving toward." },
      ],
    },
  },
  "癸": {
    concentrated: {
      lifts: [
        { el:"Earth", line:"Earth gives the sensitivity a container — without it the perception flows everywhere and touches nothing specifically. In environments where this force is present the Rain's nourishing intelligence finds a direction and becomes something that lands." },
        { el:"Wood",  line:"Wood is where the Rain's sensitivity converts into growth and development — the intelligence poured into what needs nurturing. The perception stops flowing in all directions and becomes specifically productive." },
      ],
      depletes: [
        { el:"Metal", line:"Metal generates more Water — adding sensitivity to what is already saturated. Environments dominated by Metal compound the perceptual range until the attunement is constant and the form that gives it direction is lost." },
        { el:"Water", line:"More of what you already carry in abundance. Water-heavy environments deepen the sensitivity until it becomes exposure rather than perception — too much arrives before any of it can be given direction." },
      ],
    },
    balanced: {
      lifts: [
        { el:"Metal", line:"Metal generates steadily — sustaining the sensitivity without saturating it. The Rain's intelligence continues to perceive accurately and specifically without dispersing into diffuse attunement." },
        { el:"Earth", line:"Earth provides gentle containment — enough direction to give the sensitivity form without damming the current that makes this chart's perception distinctive." },
      ],
      depletes: [
        { el:"Water", line:"More sensitivity than the equilibrium can form. Water-dominant environments tip toward the concentrated condition — the perception deepening beyond what can be directed toward anyone or anything specifically." },
        { el:"Metal", line:"Metal generating too strongly risks flooding the sensitivity past the balance point — the intelligence amplifying beyond what the current form can give direction to." },
      ],
    },
    open: {
      lifts: [
        { el:"Metal", line:"Metal is the primary source that renews the Rain's sensitivity — feeding the perception from the inside rather than requiring it to sustain itself. At this level it is what keeps the intelligence alive and accumulating." },
        { el:"Water", line:"More of the Rain's own nature gives the sensitivity the depth it needs. In environments where Water is genuinely supportive the perception that has been operating below its capacity comes through at its full range." },
      ],
      depletes: [
        { el:"Earth", line:"Earth dams what needs to flow — and at this level the current is already limited. Environments dominated by this force contain the sensitivity before it can reach who it was moving toward." },
        { el:"Fire",  line:"Fire burns what the Rain's sensitivity depends on — working against the foundation of perception at the point where the chart can least afford the cost." },
      ],
    },
  },
};


// ─── ENERGY CONDITION READINGS — 10 stems × 3 bands ──────────────────────
// portrait: what this condition feels like for THIS archetype (2 sentences)
// dynamic:  what it creates specifically (1 sentence)
// practice: the specific Channel/Nourish/Maintain action for this archetype (1 sentence)
// Band mapping: extremely_strong|strong → concentrated · moderate → balanced · weak|extremely_weak → open

const ENERGY_CONDITION_READINGS = {
  "甲": {
    concentrated: {
      portrait: "The Oak at full force reaches before it decides to — the growth is so natural it becomes structural, and the question is not whether it will reach something but whether what it reaches can hold the weight of that arrival. At this concentration, the Oak's generosity becomes its primary risk: building for others what it hasn't yet finished building for itself.",
      dynamic:  "The energy pushes forward at a rate that consistently outpaces consolidation — the next stage is already visible before the foundations of the current one have been tested.",
      practice: "Before beginning the next thing, spend real time with what you've already built — the Oak that roots as deeply as it reaches is the one that eventually stands alone.",
    },
    balanced: {
      portrait: "The Oak in equilibrium is rare and genuinely powerful — the reach and the root are in conversation with each other, and what gets built at this level has a quality of permanence that the concentrated Oak often sacrifices for speed. The vision is still present; the patience to let it take its full form has arrived alongside it.",
      dynamic:  "Growth and consolidation are running at the same pace — the energy produces things that genuinely last rather than things that need to be rebuilt.",
      practice: "Protect this equilibrium consciously — the Oak's natural instinct is to reach further, and the temptation to accelerate is always present even when the conditions don't require it.",
    },
    open: {
      portrait: "The Oak that needs nourishment becomes its most sensitive form — the vision is entirely intact, but the energy requires the right conditions to move from potential into form. This is not a diminished Oak; it is one that has learned, through necessity, the specific quality of soil it actually needs.",
      dynamic:  "The growth is real but conditional — in genuinely supportive environments this energy produces results that surprise even the Oak itself; in the wrong conditions, the reach quietly withdraws.",
      practice: "Invest deliberately in the environments and relationships that produce real movement — the Oak that finds its soil stops waiting and starts building.",
    },
  },
  "乙": {
    concentrated: {
      portrait: "The Vine at high concentration finds paths everywhere — the intelligence that reads surfaces and discovers routes becomes so active that it can mistake movement for arrival. The risk is not that the Vine can't navigate; it's that it navigates so continuously it never fully commits to the wall it's on.",
      dynamic:  "The flexibility that is the Vine's greatest gift at this concentration risks becoming restlessness — adapting before adaptation is needed, reading exits before the current surface has been fully explored.",
      practice: "Choose one wall and climb it completely — the Vine's intelligence is most powerful when it is in service of genuine arrival rather than the perpetual exploration of options.",
    },
    balanced: {
      portrait: "The Vine in equilibrium has what it's always been reaching for — a surface worth committing to and roots deep enough to hold. The intelligence to find the right path and the stability to follow it through are finally present at the same moment.",
      dynamic:  "The adaptability serves direction rather than replacing it — the Vine's natural gift of finding the non-obvious route is now working toward a specific and sustained destination.",
      practice: "Notice what you're building rather than where you're going — the Vine in balance is often making something more significant than it realises, and naming it helps it grow.",
    },
    open: {
      portrait: "The Vine that needs nourishment is perhaps the most acutely relational of all the archetypes at this energy level — the intelligence is entirely present but it requires something genuine to push against, something real to climb. Without it, the Vine doesn't fail; it simply doesn't reach.",
      dynamic:  "The sensitivity that makes the Vine extraordinary in the right environment becomes exposure in the wrong one — what lifts this energy is specific, and what depletes it is equally specific.",
      practice: "Build the conditions before building the thing — identify the surface genuinely worth your reach and let everything else wait.",
    },
  },
  "丙": {
    concentrated: {
      portrait: "The Sun at full concentration illuminates everything in reach — the warmth is structural, not situational, and it operates whether or not it's been invited. At this level the Sun's primary challenge is not sustaining the warmth but choosing where to direct it, because diffuse warmth costs the same as focused warmth and produces a fraction of the result.",
      dynamic:  "The presence fills every room it enters, which means it is constantly being consumed by contexts that did not specifically need what it had to offer.",
      practice: "Choose three things the warmth is for and let everything else receive less — the Sun that chooses its horizon illuminates what matters rather than everything at once.",
    },
    balanced: {
      portrait: "The Sun in equilibrium has found the right arc of sky — the warmth reaches who it's for, the presence does its work without exhausting its source, and what gets illuminated at this level tends to be genuinely changed by the encounter. This is the Sun at its most powerful: sustained, directed, and fully present.",
      dynamic:  "The energy produces lasting impact rather than momentary brightness — what this Sun touches stays changed, because the warmth arrived at the depth that actually reaches people.",
      practice: "Receive as freely as you give — the Sun in balance is only possible when the reciprocity is real, and this is the moment to build that in deliberately.",
    },
    open: {
      portrait: "The Sun that needs nourishment is a paradox that confuses people who know it — the warmth is entirely real but it requires specific conditions to sustain. What looks like inconsistency from outside is actually precise sensitivity: this Sun knows, better than anyone, exactly what feeds it and what doesn't.",
      dynamic:  "The warmth arrives fully in conditions of genuine reciprocity and dims perceptibly in its absence — not performance, but physics.",
      practice: "Protect the conditions that sustain your warmth rather than spending it on environments that won't return it — what the Sun nourishes should nourish the Sun.",
    },
  },
  "丁": {
    concentrated: {
      portrait: "The Candle at full concentration illuminates what it's pointed at with an intensity that can feel overwhelming to what isn't prepared for that quality of attention. The focus is the gift and the friction simultaneously — everything receives the full flame whether or not that was what the moment required.",
      dynamic:  "The precision that makes this energy extraordinary in the right moment becomes pressure in everyday interactions — the Candle at this level is calibrating continuously between full illumination and what the room can actually receive.",
      practice: "Learn to modulate before being asked to — the Candle that can choose between full focus and gentle warmth becomes far more effective than one that can only offer the full flame.",
    },
    balanced: {
      portrait: "The Candle in equilibrium has the quality of attention the world most needs from it and the wisdom to deploy it precisely. The focus is present; so is the judgment about when to use it fully. What gets illuminated at this level is illuminated completely and chosen deliberately.",
      dynamic:  "The precision serves connection rather than creating intensity — this Candle makes people feel genuinely seen without making them feel exposed.",
      practice: "Trust the quality of your attention as it is — the Candle in balance doesn't need to do more, it needs to choose better where the light goes.",
    },
    open: {
      portrait: "The Candle that needs nourishment is exquisitely context-sensitive — the focus is entirely intact but it requires genuine reciprocity to burn at full depth. This is the Candle that gives its best illumination to those who have given it something real to focus on.",
      dynamic:  "The quality of attention this energy produces is directly proportional to the quality of what it's receiving — in genuine exchange it burns more brightly than almost anything; in one-sided contexts it dims to protect what it carries.",
      practice: "Seek the exchange before offering the full focus — the Candle that waits for genuine invitation burns longer and illuminates more completely.",
    },
  },
  "戊": {
    concentrated: {
      portrait: "The Mountain at full concentration is what everything else orients around — the stability is so complete it becomes geography, and people build their lives according to where it stands without fully realising they're doing it. At this level the Mountain's challenge is not holding but allowing: the rigidity that guarantees reliability can also prevent the movement that keeps things alive.",
      dynamic:  "The stability becomes weight when it can't differentiate between what needs holding and what needs releasing — the Mountain that never shifts eventually becomes a wall rather than a foundation.",
      practice: "Allow one thing to move before you're certain it's safe to — the Mountain that learns to shift deliberately remains a reference point rather than becoming an obstacle.",
    },
    balanced: {
      portrait: "The Mountain in equilibrium holds what needs holding and has developed the capacity to release what doesn't — a rare and genuinely powerful state for an energy that defaults so naturally to permanence. At this level the reliability is real and the flexibility, while not natural, has been earned.",
      dynamic:  "The groundedness serves growth rather than preventing it — what the Mountain holds at this level it holds genuinely, and what it releases it releases without losing itself.",
      practice: "Stay in conversation with what you're holding — the Mountain in balance needs to keep asking whether the current structures are still serving what they were built for.",
    },
    open: {
      portrait: "The Mountain that needs nourishment is not diminished — it is simply more sensitive than it appears to the conditions that support it. The groundedness is real but it requires specific inputs to remain genuinely stable rather than just appearing stable.",
      dynamic:  "The reliability that this energy is known for is present but conditional — in genuinely supportive conditions the Mountain provides what everything else is built on; in depleting ones it gradually hollows.",
      practice: "Receive support without reframing it as weakness — the Mountain that allows itself to be nourished holds everything else more genuinely.",
    },
  },
  "己": {
    concentrated: {
      portrait: "The Field at full concentration grows things in everyone it encounters — the nourishment is so natural and consistent that it operates below the threshold of conscious choice. At this level the Field's primary risk is the depletion that comes from continuous harvest with insufficient replenishment: the fertility is real, but it is not infinite.",
      dynamic:  "The giving outpaces the receiving so significantly that the Field is often unaware of how much it has given until the soil begins to show the cost.",
      practice: "Track what returns to you — the Field that monitors its own fertility rather than assuming it is infinite creates the conditions for sustained rather than temporary abundance.",
    },
    balanced: {
      portrait: "The Field in equilibrium is what cultivation is supposed to look like — the nourishment flows outward and something real flows back, and what grows in this condition has a quality that the exhausted Field never produces. The care is present; so is the reciprocity that makes it sustainable.",
      dynamic:  "The fertility serves what genuinely deserves it — what grows in this Field grows well and lasts, because the conditions were right in both directions.",
      practice: "Name what you're growing and whether it's growing back toward you — the Field in balance does this consciously rather than discovering the accounting only at harvest.",
    },
    open: {
      portrait: "The Field that needs nourishment is at its most honest about what it actually requires — the sensitivity that makes it the most genuinely caring of the archetypes is fully present, but so is the awareness that the wrong conditions produce nothing, regardless of effort.",
      dynamic:  "The fertility is entirely real but entirely conditional — what the right inputs produce in this Field is extraordinary; what the wrong ones produce is depletion disguised as generosity.",
      practice: "Choose what deserves your soil — the Field that cultivates selectively produces more per season than the one that nourishes everything equally.",
    },
  },
  "庚": {
    concentrated: {
      portrait: "At this level, precision and directness aren't traits you switch on — they're structural. You've probably never needed motivation. What you've needed is a worthy target, and conditions that don't ask you to spend energy justifying the standard you're already holding.",
      dynamic:  "Without something genuinely worthy to push against, the same force that makes you exceptionally effective starts turning inward.",
      practice: "Seek pressure, friction, and real challenge deliberately — not because you need toughening, but because this is the only condition under which the full capacity actually produces something.",
    },
    balanced: {
      portrait: "The Blade in equilibrium has found what it's for — the precision is directed, the edge is in service of something specific, and the quality of what it produces at this level has a distinctiveness that the unforged Blade never achieves. This is the Blade that has been through enough to know what it's cutting toward.",
      dynamic:  "The precision serves purpose rather than demonstrating itself — what this Blade produces is genuinely excellent because the edge is being used rather than simply maintained.",
      practice: "Protect the direction — the Blade in balance is at its most effective when it stays pointed at what it chose rather than being redirected by whatever demands attention.",
    },
    open: {
      portrait: "The Blade that needs nourishment is one that has been waiting for the right conditions to show its full edge — not diminished, but in abeyance. The precision is completely intact; what's required is the specific combination of support and challenge that allows it to operate at depth.",
      dynamic:  "The edge is real but it requires genuine conditions to cut cleanly — in the right environment this Blade produces work of extraordinary precision; in the wrong one, it stays sharp but unused.",
      practice: "Identify the forge rather than manufacturing the pressure yourself — the Blade that finds external conditions worthy of its edge stops spending energy on self-maintenance.",
    },
  },
  "辛": {
    concentrated: {
      portrait: "The Jewel at full concentration perceives quality and its absence with an accuracy that operates faster than analysis — the discernment is structural, not effortful, and at this level it applies to everything including the Jewel's own standards for itself. The precision that makes this archetype extraordinary in its work becomes the demand it places on everything it encounters.",
      dynamic:  "The gap between what this energy perceives as possible and what is actually available becomes a persistent source of friction — not because the standard is wrong but because the world rarely offers what this discernment can see.",
      practice: "Distinguish the essential standards from the comprehensive ones — the Jewel at this concentration is most powerful when it reserves the full precision for what genuinely deserves it.",
    },
    balanced: {
      portrait: "The Jewel in equilibrium has found the setting it deserves — the discernment is present and directed, the precision produces work of genuine distinction, and the gap between what's perceived and what's available has narrowed to something workable. At this level the Jewel stops measuring everything against the ideal and starts building toward it.",
      dynamic:  "The standard serves creation rather than evaluation — what this Jewel produces at this level is genuinely excellent rather than perpetually provisional.",
      practice: "Complete rather than refine — the Jewel in balance is at its most powerful when it finishes things to its own genuine standard rather than continuing to polish what is already done.",
    },
    open: {
      portrait: "The Jewel that needs nourishment is in its most sensitive and in some ways most honest form — the discernment is entirely intact but the context determines whether it produces excellence or simply consumes itself in the perception of what isn't right. In genuinely worthy conditions this Jewel produces its finest work.",
      dynamic:  "The quality this energy produces is directly proportional to the quality of what it's been given to work with — elevate the conditions and what emerges is something few other archetypes can produce.",
      practice: "Protect your discernment by protecting what it's applied to — the Jewel that works in settings worthy of its precision produces more than the one that applies its standard universally.",
    },
  },
  "壬": {
    concentrated: {
      portrait: "The Ocean at full concentration contains more than any single context has the capacity to hold — the depth is real, the range is vast, and the challenge is that most of the encounters and environments this energy moves through are simply not built to receive what it's carrying. The Ocean at this level is perpetually translating.",
      dynamic:  "The vastness becomes isolation when it can't find the channels through which it can actually reach people — the depth is present but the shore that gives it shape keeps receding.",
      practice: "Find the shore deliberately — identify the specific forms through which your depth can reach people and invest in those rather than waiting for contexts large enough to hold you.",
    },
    balanced: {
      portrait: "The Ocean in equilibrium has found its shores — the depth has channels through which it reaches people, the vastness has forms that make it useful rather than simply impressive. What this Ocean produces at this level has the quality that only genuine depth can generate: it reaches further than the surface of any exchange.",
      dynamic:  "The depth serves connection rather than demonstrating itself — this Ocean meets people at the level they can reach and draws them deeper rather than waiting at the depth they haven't found yet.",
      practice: "Stay in the channel you've found — the Ocean in balance is most powerful when it deepens what's already working rather than expanding into new vastness.",
    },
    open: {
      portrait: "The Ocean that needs nourishment is the most attuned to the quality of what it receives — the depth is entirely present but the conditions determine whether it circulates or stagnates. The right inputs produce currents that reach further than anyone watching from the shore can see.",
      dynamic:  "The depth requires genuine exchange to stay alive — without it the vastness becomes stillness, and while stillness is not nothing, it is not what this energy was built for.",
      practice: "Feed the current — identify what genuinely nourishes you and let it in without reframing receiving as a form of weakness.",
    },
  },
  "癸": {
    concentrated: {
      portrait: "The Rain at full concentration nourishes everything it touches — the sensitivity is so thoroughgoing that it operates as a permanent state of attunement, and at this level the primary cost is the difficulty of knowing whose feeling is whose, which sky the rain is falling from. The generosity is structural; the container needs to be built.",
      dynamic:  "The permeability that makes this energy extraordinarily sensitive to what's true also makes it genuinely difficult to maintain the distinction between perception and absorption — the Rain takes in more than it intends to.",
      practice: "Build the container before going into difficult conditions — the Rain at this concentration needs deliberate boundaries not to restrict the sensitivity but to ensure it remains a navigational instrument rather than a burden.",
    },
    balanced: {
      portrait: "The Rain in equilibrium has found the ground it's for — the sensitivity is present and directed, the nourishment reaches what genuinely needs it, and the quality of what grows in this Rain's proximity has a specificity that only genuine attunement produces. At this level the Rain knows what it's feeding and what's feeding it.",
      dynamic:  "The sensitivity serves rather than overwhelms — the perception arrives as information rather than as weather, and what this Rain nourishes grows in ways that reflect genuine care rather than reflexive giving.",
      practice: "Stay attuned to reciprocity — the Rain in balance has found the ground that deserves it, and the work is ensuring that relationship remains genuinely mutual.",
    },
    open: {
      portrait: "The Rain that needs nourishment is at its most explicit about what it actually requires — the sensitivity is fully present but it is not self-sustaining, and the quality of what this Rain can offer is directly proportional to the quality of what it's received. In conditions of genuine support, what this Rain nourishes is extraordinary.",
      dynamic:  "The nourishment this energy provides is among the most specific and most valuable in any chart — but it requires actual nourishment in return, not just the absence of depletion.",
      practice: "Choose your ground as deliberately as you nourish it — the Rain that falls in the right place doesn't just feed what grows there, it feeds itself in return.",
    },
  },
};

// Maps strength key to energy band for ENERGY_CONDITION_READINGS lookup
function getEnergyBand(strength) {
  if (strength === "extremely_strong" || strength === "strong") return "concentrated";
  if (strength === "moderate") return "balanced";
  return "open";
}

// ─── 调候 CLIMATE ADJUSTMENT ─────────────────────────────────────────────────
// Overrides 扶抑 (strength-based) catalyst/resistance when the chart's seasonal
// temperature is extreme (hot summer or cold winter births).
// Source: 穷通宝鉴 — month branch determines chart temperature; 调候 is a
// modifier ON TOP of 扶抑, not a replacement system.
//
// Override rule (derived from month branch element + season):
//   Cold charts (亥子丑寅卯 — Winter/early Spring):
//     → Fire promoted to top Catalyst regardless of DM strength
//     → Water demoted to Resistance if it deepens cold (Metal/Water DMs)
//   Hot charts (巳午未 — Summer):
//     → Water promoted to top Catalyst regardless of DM strength
//     → Fire demoted if it deepens heat (Fire/Wood DMs)
//   Neutral (辰申酉戌 — Late Spring/Autumn): standard 扶抑 rules, no override

const TIAOHOU_SEASON = {
  // branch → { temp: "cold"|"hot"|"neutral", humidity: "wet"|"dry"|"neutral" }
  "子":{ temp:"cold",   humidity:"wet"     },
  "丑":{ temp:"cold",   humidity:"wet"     },
  "寅":{ temp:"cold",   humidity:"neutral" },
  "卯":{ temp:"cool",   humidity:"neutral" },
  "辰":{ temp:"neutral",humidity:"wet"     },
  "巳":{ temp:"warm",   humidity:"dry"     },
  "午":{ temp:"hot",    humidity:"dry"     },
  "未":{ temp:"hot",    humidity:"dry"     },
  "申":{ temp:"cool",   humidity:"dry"     },
  "酉":{ temp:"cool",   humidity:"dry"     },
  "戌":{ temp:"neutral",humidity:"dry"     },
  "亥":{ temp:"cold",   humidity:"wet"     },
};

// Returns { promoteCatalyst: Element|null, demoteFromCatalyst: Element|null }
// promoteCatalyst: force this element to the top of the catalyst list
// demoteFromCatalyst: move this element from catalyst to resistance
function getTiaohouAdjustment(dmStem, monthBranch) {
  const season = TIAOHOU_SEASON[monthBranch];
  if (!season) return { promoteCatalyst: null, demoteFromCatalyst: null };

  const dmElement = { 甲:"Wood",乙:"Wood",丙:"Fire",丁:"Fire",
    戊:"Earth",己:"Earth",庚:"Metal",辛:"Metal",壬:"Water",癸:"Water" }[dmStem];

  const isExtremeCold = season.temp === "cold";
  const isExtremeHot  = season.temp === "hot";

  let promoteCatalyst    = null;
  let demoteFromCatalyst = null;

  if (isExtremeCold) {
    // Fire is urgently needed to warm the chart
    promoteCatalyst = "Fire";
    // Water deepens cold for Metal/Water DMs — demote it
    if (dmElement === "Metal" || dmElement === "Water") {
      demoteFromCatalyst = "Water";
    }
  } else if (isExtremeHot) {
    // Water is urgently needed to cool the chart
    promoteCatalyst = "Water";
    // Fire deepens heat for Fire/Wood DMs — demote it
    if (dmElement === "Fire" || dmElement === "Wood") {
      demoteFromCatalyst = "Fire";
    }
  }

  return { promoteCatalyst, demoteFromCatalyst };
}

// Applies 调候 adjustments to the stem's base lifts/depletes arrays.
// Returns { lifts, depletes } with reordering applied where 调候 overrides 扶抑.
function applyTiaohouToEnergies(baseEnergies, dmStem, monthBranch) {
  const { promoteCatalyst, demoteFromCatalyst } = getTiaohouAdjustment(dmStem, monthBranch);
  if (!promoteCatalyst && !demoteFromCatalyst) return baseEnergies;

  let lifts    = [...baseEnergies.lifts];
  let depletes = [...baseEnergies.depletes];

  // Demote: move element from lifts → depletes if it conflicts with 调候
  if (demoteFromCatalyst) {
    const liftIdx = lifts.findIndex(e => e.el === demoteFromCatalyst);
    if (liftIdx >= 0) {
      const [demoted] = lifts.splice(liftIdx, 1);
      // Rewrite the line to reflect 调候 reason
      const tiaohouLine = demoteFromCatalyst === "Water"
        ? `${demoted.line} — but deepens the seasonal cold, making heat the priority`
        : `${demoted.line} — but intensifies the seasonal heat, making cooling the priority`;
      depletes = [{ el: demoted.el, line: tiaohouLine }, ...depletes];
    }
  }

  // Promote: ensure element is at top of lifts
  if (promoteCatalyst) {
    const existingIdx = lifts.findIndex(e => e.el === promoteCatalyst);
    if (existingIdx > 0) {
      // Already in lifts but not first — move to top
      const [item] = lifts.splice(existingIdx, 1);
      lifts = [item, ...lifts];
    } else if (existingIdx === -1) {
      // Not in lifts at all — add it with 调候 explanation
      const tiaohouLines = {
        Fire: "The forge you need — seasonal warmth that gives cold Metal its direction and purpose",
        Water:"The cooling you need — seasonal moisture that gives hot Fire its sustainability",
      };
      lifts = [{ el: promoteCatalyst, line: tiaohouLines[promoteCatalyst] || `Seasonal priority — brings the climate balance you need` }, ...lifts];
    }
    // If already first (existingIdx === 0), no change needed
  }

  return { lifts, depletes };
}

// Per-stem dominant/missing insight lines
// ─── TEN GOD PROFILES — user-facing names, concept art, combined descriptions ──
// Each entry: en (English name), art (SVG render fn taking color), describe (fn taking element)
const TG_PROFILES = {
  "比肩": {
    en: "The Mirror",
    art: (c) => (
      <svg viewBox="0 0 80 80" width="72" height="72">
        <circle cx="40" cy="40" r="36" fill={c} opacity="0.07"/>
        <path d="M40 16 C26 16 17 27 17 40 C17 53 26 64 40 64 Z" fill={c} opacity="0.35"/>
        <path d="M40 16 C54 16 63 27 63 40 C63 53 54 64 40 64 Z" fill={c} opacity="0.18"/>
        <line x1="40" y1="14" x2="40" y2="66" stroke={c} strokeWidth="1" opacity="0.4"/>
        <circle cx="29" cy="35" r="3.5" fill={c} opacity="0.75"/>
        <circle cx="51" cy="35" r="3.5" fill={c} opacity="0.35"/>
        <path d="M30 48 Q40 54 50 48" stroke={c} strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
    describe: (el) => ({
      Metal: `金比肩 is Metal meeting Metal — your own precision amplified by a force identical in nature. The evaluative standard runs doubled: no counterpoint, no friction to mark where it has gone too far. The gift is extraordinary self-reliance and internal consistency. The cost is a self-referencing loop with no natural interrupt — the same quality that makes you exceptional is also what keeps you circling when direction is missing.`,
      Wood:  `木比肩 is reach meeting reach — the growth impulse compounding on itself without anything present to ask what should be consolidated. You invest broadly because the nature cannot distinguish between feeding what grows and growing endlessly. The gift is generosity at scale. The shadow is diffuse investment: you build for many and own little of what actually grows.`,
      Fire:  `火比肩 is warmth meeting warmth — presence amplifying presence. The room is always lit, always relational, always drawing people toward it. Without a counterforce to create depth, the warmth can become broadcast rather than specific. The gift is extraordinary reach. The shadow is the difficulty of knowing who you are when the audience is absent.`,
      Earth: `土比肩 is stability meeting stability — ground layering beneath ground. The holding capacity is exceptional; the circulation is not. What accumulates here tends to stay accumulated. The gift is reliable, load-bearing presence that others orient by without naming. The shadow is inertia that compounds quietly until it becomes weight.`,
      Water: `水比肩 is depth meeting depth — perception compounding on itself with no defined form to concentrate into. You see what's actually happening at multiple layers simultaneously, but the intelligence disperses unless a specific container is built for it. The gift is rare perceptual range. The shadow is brilliance that never quite lands in a form others can engage with directly.`,
    }[el] || `This element amplifies your Day Master directly — more of what you already are, with no moderating counterforce. The gift is intensity and self-consistency. The shadow is a loop that has no natural exit.`),
  },
  "劫财": {
    en: "The Rival",
    art: (c) => (
      <svg viewBox="0 0 80 80" width="72" height="72">
        <circle cx="40" cy="40" r="36" fill={c} opacity="0.07"/>
        <path d="M40 16 C26 16 17 27 17 40 C17 53 26 64 40 64 Z" fill={c} opacity="0.4"/>
        <path d="M42 18 C56 20 65 31 63 44 C61 57 52 65 40 64 Z" fill={c} opacity="0.15"/>
        <circle cx="28" cy="35" r="3.5" fill={c} opacity="0.8"/>
        <circle cx="52" cy="37" r="3" fill={c} opacity="0.3"/>
        <path d="M38 48 Q36 54 44 52" stroke={c} strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.5"/>
        <line x1="40" y1="14" x2="42" y2="66" stroke={c} strokeWidth="1" strokeDasharray="3 2" opacity="0.35"/>
      </svg>
    ),
    describe: (el) => ({
      Metal: `金劫财 is Metal meeting Metal across the yin-yang divide — a force that shares your nature but not your register. Close enough to feel like yourself, different enough to compete rather than simply mirror. What this produces is structural competitiveness: with your own standards, with others who occupy your space, with any outcome that almost meets the bar. The drive to be genuinely better is real — and so is the difficulty of knowing when good enough is actually good.`,
      Wood:  `木劫财 is growth meeting growth in a competing register — the developmental impulse expressed differently. Where you grow outward, this force reaches in its own direction. Collaborators who share your nature but not your approach. The gift is an instinct for where real competition lies. The shadow is resource depletion in the rivalry — investing against what should be shared rather than what should be outpaced.`,
      Fire:  `火劫财 is warmth meeting warmth in a competing key — the relational impulse at a slightly different frequency. This produces restlessness in close relationships: the people most like you are also the ones you measure yourself against. The gift is the clarity that comes from genuine peers. The shadow is the difficulty of truly collaborating with someone who mirrors you closely enough to reveal your limits.`,
      Earth: `土劫财 is stability meeting stability in a competing register. Two containing forces, each claiming the same ground. The gift is knowing what real solidity feels like. The shadow is an impulse to hold what you have against encroachment — even when sharing would produce more than defending.`,
      Water: `水劫财 is depth meeting depth across a yin-yang divide — two forms of perceptual intelligence, oriented differently. The gift is recognising genuine intelligence when it appears, because you know the real thing. The shadow is that similar minds are also the ones most likely to challenge your read — and the most difficult to yield to.`,
    }[el] || `A force sharing your element but across the yin-yang divide — close enough to feel like you, different enough to create structural competition. The gift is discernment. The shadow is rivalry where collaboration would serve better.`),
  },
  "食神": {
    en: "The Flow",
    art: (c) => (
      <svg viewBox="0 0 80 80" width="72" height="72">
        <circle cx="40" cy="40" r="36" fill={c} opacity="0.07"/>
        <path d="M20 40 C25 28 35 22 40 22 C45 22 50 26 52 32 C54 38 50 46 44 50 C38 54 30 52 26 48 C22 44 22 40 20 40 Z" fill={c} opacity="0.25"/>
        <path d="M40 22 C50 28 58 36 56 46 C54 56 44 62 36 58" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
        <circle cx="40" cy="38" r="5" fill={c} opacity="0.6"/>
        <path d="M28 52 C32 58 42 60 50 56" stroke={c} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
    describe: (el) => ({
      Water: `水食神 is the water that flows from your source — what Metal naturally produces, moving outward without needing to be asked. This is expression in its most natural form: refined, non-assertive, generous. You don't produce to be seen; production is simply what happens when you are fully yourself. The classical description is 秀气 — elegant, unforced output. The shadow is extending into what feels natural without checking whether the foundation is ready.`,
      Fire:  `火食神 is warmth generated from your core and offered freely. The creative output flows outward as heat and light — not to impress, but because that is what happens when the source is full. The gift is an effortless quality to what you give. The shadow is giving so naturally that you don't notice when the source is running low.`,
      Earth: `土食神 is the stable, nourishing ground that your energy deposits as it moves through the world — what remains after you have engaged, in the form of structure, stability, and a sense of things held together. The gift is leaving things more grounded than you found them. The shadow is building for others what you haven't yet built for yourself.`,
      Wood:  `木食神 is the outward reach of your generative energy — growth that moves toward others naturally, without calculation. You invest in what is growing because that is the direction the nature moves. The gift is developmental generosity at its most authentic. The shadow is extending the reach before checking whether there is ground beneath it.`,
      Metal: `金食神 is precision as natural output — the evaluative standard expressed freely, without agenda. Assessment and clarity emerge as gifts rather than judgments, because that is simply what happens when this energy flows. The gift is honest, usable clarity. The shadow is precision without warmth, landing harder than intended.`,
    }[el] || `The energy your core naturally generates and expresses — what flows outward when you are fully yourself. Expression is structural here, not performed. The shadow is extending the flow without checking whether the foundation is ready.`),
  },
  "伤官": {
    en: "The Edge",
    art: (c) => (
      <svg viewBox="0 0 80 80" width="72" height="72">
        <circle cx="40" cy="40" r="36" fill={c} opacity="0.07"/>
        <polygon points="40,16 58,58 40,50 22,58" fill={c} opacity="0.2"/>
        <polygon points="40,16 58,58 40,50 22,58" fill="none" stroke={c} strokeWidth="1.2" opacity="0.5"/>
        <circle cx="40" cy="36" r="4.5" fill={c} opacity="0.7"/>
        <line x1="40" y1="16" x2="40" y2="30" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        <path d="M30 54 L34 50 M50 54 L46 50" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
    describe: (el) => ({
      Water: `水伤官 is brilliance that runs ahead of the frameworks built to receive it — intelligence operating beyond the conventional. This is output that cannot be contained by existing structures because it genuinely exceeds them. Not willful rebellion, but structural emergence: what you produce is in natural tension with whatever tries to define its limits. The gift is genuine innovation. The shadow is that the same quality that creates breakthroughs also creates friction with any authority that encounters it.`,
      Fire:  `火伤官 is expressive energy that challenges rather than warms — warmth with an edge, vision that refuses the easy container. What you communicate carries more than the words; it challenges the room's assumptions even when you didn't mean it to. The gift is creative force that moves things. The shadow is intensity that exceeds what the environment was prepared for.`,
      Earth: `土伤官 is the excess of what your energy builds — output that runs beyond the containing structure and creates weight in unexpected places. The gift is productive force that leaves something real behind. The shadow is building momentum without checking whether the architecture can hold it.`,
      Wood:  `木伤官 is developmental reach in a frequency that strains existing structures — growth that exceeds the framework built to support it. You grow faster than the containers around you were built for. The gift is genuine forward motion. The shadow is leaving the supporting structure behind before you've found what comes next.`,
      Metal: `金伤官 is precision expressed as challenge — evaluation that doesn't soften when it meets authority. The standard is real and the output is honest, but it operates in structural tension with any framework that tries to grade it by conventional measure. The gift is genuine quality that doesn't perform deference. The shadow is that the same clarity that makes you trustworthy makes you difficult to manage.`,
    }[el] || `Creative output that operates ahead of the structures built to receive it — expression in structural tension with convention. The gift is genuine innovation. The shadow is that the same quality creates friction with whatever tries to contain it.`),
  },
  "偏财": {
    en: "The Field",
    art: (c) => (
      <svg viewBox="0 0 80 80" width="72" height="72">
        <circle cx="40" cy="40" r="36" fill={c} opacity="0.07"/>
        <ellipse cx="40" cy="48" rx="26" ry="10" fill={c} opacity="0.2"/>
        <ellipse cx="40" cy="40" rx="20" ry="7" fill={c} opacity="0.15"/>
        <circle cx="40" cy="32" r="8" fill={c} opacity="0.4"/>
        <circle cx="40" cy="32" r="4" fill={c} opacity="0.6"/>
        <line x1="26" y1="56" x2="54" y2="56" stroke={c} strokeWidth="1" opacity="0.3"/>
        <line x1="22" y1="60" x2="58" y2="60" stroke={c} strokeWidth="0.8" opacity="0.2"/>
      </svg>
    ),
    describe: (el) => ({
      Wood: `木偏财 is the broad field your energy naturally ranges across — growth in multiple directions, engagement distributed widely. This is the material of your reach: many things, many people, many opportunities, all within your scope. The gift is an instinct for what has potential and the willingness to engage before being asked. The shadow is breadth without depth — investing across so wide a field that little of it becomes specifically yours.`,
      Fire:  `火偏财 is scattered warmth — light distributed broadly rather than concentrated on one thing. The energy engages freely with whatever crosses its path. The gift is natural abundance and generous presence. The shadow is the difficulty of converting broad engagement into something that accumulates and holds.`,
      Earth: `土偏财 is the wide, varied ground your energy traverses — stability spread across many areas rather than concentrated. You stabilise broadly. The gift is a capacity to hold many things at once without losing composure. The shadow is that what is spread thinly doesn't always deepen.`,
      Metal: `金偏财 is the varied material your precision can be applied to — many different problems, many different domains, all responsive to evaluation. The gift is range and adaptability. The shadow is evaluation without commitment — the standard ranges across many things and settles on none of them completely.`,
      Water: `水偏财 is the broad perceptual field — depth of intelligence ranging across many contexts rather than concentrating. You read many situations simultaneously and engage across a wide surface. The gift is rare contextual intelligence. The shadow is that what is perceived broadly may never find the depth of engagement it deserves.`,
    }[el] || `The broad field of material your energy ranges across — engagement distributed widely rather than concentrated. The gift is range and natural abundance. The shadow is breadth without the depth that allows what you touch to become specifically yours.`),
  },
  "正财": {
    en: "The Harvest",
    art: (c) => (
      <svg viewBox="0 0 80 80" width="72" height="72">
        <circle cx="40" cy="40" r="36" fill={c} opacity="0.07"/>
        <rect x="22" y="44" width="36" height="16" rx="2" fill={c} opacity="0.2"/>
        <rect x="26" y="36" width="28" height="10" rx="2" fill={c} opacity="0.28"/>
        <rect x="30" y="28" width="20" height="10" rx="2" fill={c} opacity="0.36"/>
        <rect x="34" y="20" width="12" height="10" rx="2" fill={c} opacity="0.55"/>
        <line x1="40" y1="18" x2="40" y2="62" stroke={c} strokeWidth="0.8" opacity="0.2"/>
      </svg>
    ),
    describe: (el) => ({
      Wood: `木正财 is Wood as the material your precision was built to shape — living, structured, responsive to disciplined engagement. 正财 is orderly control: not grasping, but the sustained direction of something that has its own momentum. Wood has its own direction and growth; your role is to define what that growth becomes, not to possess the growth itself. The gift is methodical, earned outcomes. The shadow is controlling what you care about so thoroughly that it stops being alive.`,
      Fire:  `火正财 is the warmth and directional energy you direct and shape — the capacity for illumination under your stewardship. The gift is giving warmth a purpose and a structure. The shadow is containing what is naturally expansive until it loses the quality that made it valuable.`,
      Earth: `土正财 is the stable ground you direct and structure — the accumulated, solid material that responds to your sustained engagement. The gift is building things that endure because they were built correctly. The shadow is an orientation toward material outcomes that, at its edge, mistakes what you control for what you value.`,
      Metal: `金正财 is the precision and structure you direct toward your own domain — the standard turned outward into the world as an instrument of acquisition and organisation. The gift is high-quality, earned results. The shadow is the evaluative apparatus applied to outcomes in a way that eventually asks of everything: is this worthy? — including what you have already built.`,
      Water: `水正财 is depth and perceptual intelligence under your direction — insight made productive and actionable. The gift is intelligence that produces real outcomes rather than remaining internal. The shadow is the instrumentalisation of what was originally pure perception: depth converted to utility at the cost of its own nature.`,
    }[el] || `The material your energy shapes with discipline and structure — orderly control of something real. The gift is methodical, earned results. The shadow is the tendency to control what you care about until it stops responding.`),
  },
  "偏印": {
    en: "The Well",
    art: (c) => (
      <svg viewBox="0 0 80 80" width="72" height="72">
        <circle cx="40" cy="40" r="36" fill={c} opacity="0.07"/>
        <circle cx="40" cy="36" r="20" fill={c} opacity="0.12"/>
        <circle cx="40" cy="36" r="14" fill={c} opacity="0.18"/>
        <circle cx="40" cy="36" r="8"  fill={c} opacity="0.3"/>
        <circle cx="40" cy="36" r="3.5" fill={c} opacity="0.7"/>
        <path d="M26 58 L34 48 M54 58 L46 48" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.3"/>
      </svg>
    ),
    describe: (el) => ({
      Earth: `土偏印 is the ground that feeds your Metal from below — structural support arriving through the same-polarity register, which means it sustains and deepens rather than opening and warming. Earth here is the silent backer: it builds you up without directing you toward anything specific. The gift is genuine psychological ground — a stability you draw from without always knowing its source. The shadow is dependency on a condition you haven't examined, and a tendency toward inertia when the backing is present.`,
      Fire:  `火偏印 is warmth nourishing from the same register — activation that sustains rather than redirects. The gift is a source of forward momentum you didn't consciously build. The shadow is reliance on external activation rather than developing the internal source.`,
      Metal: `金偏印 is precision feeding precision — standards generating more standards, structure creating more structure. The gift is an extremely refined internal architecture. The shadow is a recursion of self-definition that eventually loses contact with anything outside itself.`,
      Wood:  `木偏印 is growth feeding growth from the same register — reach sustained by more reach. The gift is abundant generative energy. The shadow is momentum without consolidation: the source keeps arriving but the form never quite settles.`,
      Water: `水偏印 is depth nourishing depth — intelligence sustained by more intelligence. The gift is a perceptual faculty of unusual range and subtlety. The shadow is depth that spirals inward without ever finding a container for what it perceives.`,
    }[el] || `A nourishing force that feeds your core from the same polarity register — sustaining rather than directing. The gift is genuine backing you didn't consciously build. The shadow is a support structure you depend on without fully understanding.`),
  },
  "正印": {
    en: "The Root",
    art: (c) => (
      <svg viewBox="0 0 80 80" width="72" height="72">
        <circle cx="40" cy="40" r="36" fill={c} opacity="0.07"/>
        <circle cx="40" cy="30" r="10" fill={c} opacity="0.45"/>
        <path d="M40 40 L40 62" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
        <path d="M40 50 C33 50 26 54 24 62" stroke={c} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.4"/>
        <path d="M40 50 C47 50 54 54 56 62" stroke={c} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.4"/>
        <path d="M40 56 C36 56 32 59 30 64" stroke={c} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.25"/>
        <path d="M40 56 C44 56 48 59 50 64" stroke={c} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.25"/>
      </svg>
    ),
    describe: (el) => ({
      Earth: `土正印 is Earth nourishing Metal from the cross-polarity register — a sustaining force that also opens and directs. This is genuine resource: the institutional backing, the mentor, the deep psychological support that arrives through legitimate channels and grants the precision somewhere real to stand. The gift is groundedness you can trust. The shadow is the tendency to wait for backing before moving, and the gradual dependency on support structures you haven't examined.`,
      Fire:  `火正印 is warmth that nourishes your core and opens a direction for it — a cross-polarity resource that gives the precision a sense of purpose and warm recognition alongside it. The gift is the specific experience of being seen and supported in the same moment. The shadow is that what arrives easily can stop you from building the internal source yourself.`,
      Metal: `金正印 is precision feeding precision across the yin-yang register — standards generating more standards with a slightly different quality, which means the refinement opens rather than only consolidates. The gift is an internal architecture that is both strong and adaptable. The shadow is standards that proliferate without resolution.`,
      Wood:  `木正印 is growth sustaining growth across the yin-yang register — reach nourished from a source that also provides direction. The gift is developmental momentum with genuine backing. The shadow is reach that always expects the nourishment to continue arriving.`,
      Water: `水正印 is depth nourishing depth across the yin-yang divide — intelligence sustained by a source that also provides direction and warmth. The gift is perceptual depth that is also emotionally intelligent. The shadow is dependency on a sustaining source that you haven't learned to generate for yourself.`,
    }[el] || `A sustaining force that nourishes your core through a cross-polarity register — opening and supporting rather than simply amplifying. The gift is genuine backing you can trust. The shadow is a dependency on support that hasn't been fully examined.`),
  },
  "七杀": {
    en: "The Trial",
    art: (c) => (
      <svg viewBox="0 0 80 80" width="72" height="72">
        <circle cx="40" cy="40" r="36" fill={c} opacity="0.07"/>
        <path d="M40 16 L40 64" stroke={c} strokeWidth="1.5" opacity="0.3"/>
        <path d="M20 28 L60 52" stroke={c} strokeWidth="12" strokeLinecap="round" opacity="0.1"/>
        <path d="M20 28 L60 52" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        <circle cx="40" cy="40" r="9" fill={c} opacity="0.5"/>
        <circle cx="40" cy="40" r="5" fill={c} opacity="0.8"/>
        <path d="M18 26 L22 30" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
        <path d="M58 50 L62 54" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
    describe: (el) => ({
      Fire: `火七杀 is Fire pressing down on Metal from the same-polarity register — unmediated pressure, the forge that doesn't grant permission and doesn't moderate itself. This is the classical 七杀 condition: not a test you can pass by meeting a standard, but a force that demands you prove yourself against something that doesn't care whether you survive it. The character produced by this condition is either exceptional — what cannot be broken, isn't — or carries a cost that accumulates over years. What Fire pressure builds in Metal charts is the part that others don't see: something forged rather than developed.`,
      Metal: `金七杀 is Metal pressing on Wood from the same polarity — a force that doesn't soften its cut or grant the growth permission to continue. The pressure is real and unrelenting. The character produced is either exceptionally defined or repeatedly cut before it can consolidate.`,
      Water: `水七杀 is Water containing Fire from the same polarity — pressure that extinguishes rather than channels. The gift is the character that survives the encounter with what would put it out. The shadow is the cost of continuous containment.`,
      Wood:  `木七杀 is Wood pressing on Earth from the same polarity — roots breaking through ground. The gift is resilience and the character built by sustained resistance. The shadow is the slow destabilisation that accumulates before it is visible.`,
      Earth: `土七杀 is Earth damming Water from the same polarity — containing force against natural depth and flow. The gift is the discipline built by operating under real constraint. The shadow is the accumulated pressure of what keeps being held.`,
    }[el] || `Unmediated pressure from outside — a force that doesn't grant permission and doesn't moderate itself. The character produced is either exceptional or costly. What it builds in you is forged rather than developed.`),
  },
  "正官": {
    en: "The Standard",
    art: (c) => (
      <svg viewBox="0 0 80 80" width="72" height="72">
        <circle cx="40" cy="40" r="36" fill={c} opacity="0.07"/>
        <rect x="30" y="18" width="20" height="44" rx="3" fill={c} opacity="0.15"/>
        <rect x="34" y="22" width="12" height="36" rx="2" fill={c} opacity="0.2"/>
        <line x1="22" y1="40" x2="58" y2="40" stroke={c} strokeWidth="1.5" opacity="0.35"/>
        <circle cx="40" cy="30" r="5" fill={c} opacity="0.6"/>
        <line x1="34" y1="48" x2="46" y2="48" stroke={c} strokeWidth="1.2" opacity="0.3"/>
        <line x1="36" y1="54" x2="44" y2="54" stroke={c} strokeWidth="1" opacity="0.2"/>
      </svg>
    ),
    describe: (el) => ({
      Fire: `火正官 is Fire setting a standard for Metal from the cross-polarity register — a legitimate authority that tests whether the precision is real. This is the classical 正官 condition: orderly, structured pressure that grants recognition when the standard is genuinely met. The gift is the orientation point — a framework you have chosen to respect, which gives the precision somewhere legitimate to point. The shadow is that 正官 requires worthy authority to function well. In corrupt or absent structure, the character loses its orientation point.`,
      Metal: `金正官 is Metal setting a standard for Wood from the cross-polarity register — structured, orderly pressure that tests whether the growth is real. The gift is a framework that builds genuine quality over time. The shadow is dependence on external legitimation for what should eventually come from the inside.`,
      Water: `水正官 is Water setting a standard for Fire from the cross-polarity register — tempering force that asks whether the warmth is sustainable. The gift is depth and sustainability added to what would otherwise burn through itself. The shadow is the quality of being contained by the standard at moments when the fire genuinely needs to expand.`,
      Wood:  `木正官 is Wood setting a standard for Earth from the cross-polarity register — ordered pressure that asks whether the stability is living or merely inert. The gift is the distinction between holding and growing. The shadow is the standard that keeps arriving before the ground has had time to consolidate.`,
      Earth: `土正官 is Earth setting a standard for Water from the cross-polarity register — containing force that asks whether the depth has form. The gift is intelligence given a channel and a purpose. The shadow is depth that is contained before it has fully arrived at what it was perceiving.`,
    }[el] || `Structured external authority that tests whether the quality is real — a framework you have chosen to respect, which grants recognition when it is genuinely met. The gift is the orientation point. The shadow is dependence on worthy authority that may not always be present.`),
  },
};

function getElementInsights(chart) {
  const dm   = chart.dayMaster;
  const els  = chart.elements;
  const missing = chart.missingElements;
  const band = getEnergyBand(dm.strength);

  const counts = Object.entries(els).map(([el,v])=>({el,count:v.count})).sort((a,b)=>b.count-a.count);
  const topEl = counts[0];
  const dominant = topEl.el;

  // ── DOMINANT_DATA — element keywords + insight + guidance ──────────────────
  // traits[0..1]: two element-trait tags; third keyword = relationship tag (computed below)
  const DOMINANT_DATA = {
    Metal: {
      traits: ["Precision", "Discernment"],
      line: `You filter experience through accuracy before anything else engages — you assess what's real and what isn't automatically, before social or emotional processing begins. Others feel evaluated in your presence even when nothing has been said.`,
      guidance: `Without sufficient Fire or Wood in the chart, this discernment finds no specific target — the standard operates continuously but lacks something worthy of the full precision.`,
    },
    Wood: {
      traits: ["Growth", "Reach"],
      line: `You identify what people and things need to grow, and you invest in them before being asked. The instinct is developmental — you're always feeding something. The consequence is that you invest broadly and own little of what actually grows.`,
      guidance: `Without Metal to define what to keep, the developmental instinct spreads without concentrating — broad investment, diffuse return, and little that is specifically yours.`,
    },
    Fire: {
      traits: ["Presence", "Warmth"],
      line: `Your presence generates social heat independent of intention — people register your energy before you've spoken, and the contact leaves an impression regardless of what was said. The demand this places on you is constant whether you choose it or not.`,
      guidance: `Without Water to internalize what returns, the chart radiates without absorbing — presence accumulates outward but does not cycle back into depth or reflection.`,
    },
    Earth: {
      traits: ["Stability", "Endurance"],
      line: `You provide psychological ground for the people around you — a stability they orient by and rely on without necessarily recognizing its source. You carry the accumulated weight of being the reliable one, and it rarely gets named.`,
      guidance: `Without Wood to introduce movement, the stability calcifies — the chart holds and contains reliably, but circulates slowly and accumulates weight that compounds over time.`,
    },
    Water: {
      traits: ["Intelligence", "Depth"],
      line: `You read beneath the surface of situations automatically — you know what's actually happening before it's said, and you process several layers of context simultaneously. The consequence is operating with more information than others can verify or follow.`,
      guidance: `Without Earth to provide channel, the perceptual depth has no defined form — the intelligence perceives broadly but concentrates into output that others can engage with only when specific containers are built.`,
    },
  };

  // Relationship of dominant element to DM — becomes the third keyword tag
  const EL_GEN = {Wood:"Fire",Fire:"Earth",Earth:"Metal",Metal:"Water",Water:"Wood"};
  const EL_CTL = {Wood:"Earth",Earth:"Water",Water:"Fire",Fire:"Metal",Metal:"Wood"};
  const REL_TAG = {self:"Amplifies",resource:"Nourishes",output:"Channels",wealth:"Drives",pressure:"Shapes"};
  function getDomRel(dmEl, domEl) {
    if (domEl === dmEl)           return "self";
    if (EL_GEN[domEl] === dmEl)   return "resource";
    if (EL_GEN[dmEl] === domEl)   return "output";
    if (EL_CTL[dmEl] === domEl)   return "wealth";
    return "pressure";
  }

  const MISSING_LINES = {
    Fire: `Fire is the forge — external recognition, directional pressure, the outside force that tells precision what it's for. You've never had it by default. Every sense of direction you've built, every moment of recognition you've earned, came from the inside out.`,
    Earth:`Earth is absent from your chart — there is no natural structural ground beneath what you carry. The stability others inherit, you construct. Every container that holds what you do has been built deliberately, because none arrived by default, and the effort that has required is something most people in your life have probably never fully understood.`,
    Water:`Water is absent from your chart — the reflective depth that tempers and nourishes isn't a natural presence here. What you build tends to be strong. The question of whether it can be sustained over time, whether what's been created can rest and be renewed, requires more deliberate cultivation than what comes naturally to you.`,
    Wood: `Wood is absent from your chart — the natural outward reach, the creative momentum that grows toward things and other people, isn't a given here. What others assume will simply happen, you have to decide to do. That deliberateness is both harder than it sounds and what makes your commitments more considered than most.`,
    Metal:`Metal is absent from your chart — the precision and definition that give things their shape, the natural standards and boundaries, aren't inherited here. Every structure you operate by has been chosen rather than given. That is a more demanding way to live than most people recognise, and it produces a different kind of integrity — one that was earned rather than assumed.`,
  };
  const MISSING_GUIDANCE = {
    Fire: `When Fire arrives — through timing, environment, or the right people — something that has always been real in you finally has the heat it was built for.`,
    Earth:`Build one container strong enough to hold what you carry — not all of them at once, but one. Internal structure is the practice, and the one you build deliberately will hold better than anything that could have been inherited.`,
    Water:`Cultivate stillness as a practice rather than waiting for it to arrive. What you build without depth can stand; what stands with depth endures across the conditions that test whether it was real.`,
    Wood: `Invest in the one direction that is genuinely yours — not the one that's available, or the one that seems most reasonable, but the one that is actually yours. One root growing deep is worth more than many reaching shallow.`,
    Metal:`Define what is non-negotiable in how you work and live. Precision is a practice, and the one you develop by choosing it is more genuinely yours than any that could have arrived ready-made.`,
  };
  // Show any element scoring 3 or above — gives a natural, chart-driven list
  // without an arbitrary band cap. Charts with one strong element show 1;
  // charts with two or three meaningful forces show them all.
  const dominants = counts
    .filter(({ count }) => count >= 3)
    .slice(0, 3); // hard cap at 3 to keep UI readable

  const totalCount = counts.reduce((s, {count}) => s + count, 0) || 1;
  const results = { dominant: [], missing: [] };

  dominants.forEach(({el, count}) => {
    const data = DOMINANT_DATA[el];
    if (!data) return;
    const rel  = getDomRel(dm.element, el);
    const kws  = [...data.traits, REL_TAG[rel]];
    const line = el === dm.element
      ? data.line
      : data.line.replace(/runs through \d+ of your 8 characters\. Your chart doesn't carry [^ ]+ as a tendency — it IS [^\.]+\./, `is present at ${count}/10 strength in your chart.`);
    const tg   = getDominantTenGod(el, dm.stem, chart.pillars);
    results.dominant.push({ el, count, totalCount, tenGod: tg, line, guidance: data.guidance, keywords: kws });
  });

  missing.forEach(el => {
    if (MISSING_LINES[el]) {
      results.missing.push({ el, line: MISSING_LINES[el], guidance: MISSING_GUIDANCE[el] });
    }
  });

  return results;
}

// ─── STRENGTH_META ──────────────────────────────────────────────────────────
// Maps the 5 computed strength values to all UI content for Block 1 (Energy Condition).
//
// Three energy bands (身强 / 身中和 / 身弱) map from five strength levels:
//   CONCENTRATED (身强):  extremely_strong + strong  → Channel & Release ☀ Sun icon
//   EQUILIBRATED (身中和): moderate                  → Maintain & Attune ⚖ Scale icon
//   OPEN (身弱):          weak + extremely_weak       → Nourish & Amplify ☽ Moon icon
//
// Fields per entry:
//   label       — UI condition name ("Overpowering", "Dominant", etc.)
//   zh          — Chinese character (internal reference only, never rendered)
//   polarity    — Energy band label rendered in UI ("Concentrated", "Equilibrated", "Open")
//   frame       — One-sentence diagnosis: what this state means for this person
//   approach    — Balance approach name ("Channel & Release" / "Maintain & Attune" / "Nourish & Amplify")
//   approachLine — One-sentence approach: what to do about it in plain terms
//
// Used by: ElementSpectrum Block 1 (sm.label, sm.polarity, sm.frame, sm.approach, sm.approachLine)
//          conditionIcon (band → sun / scale / moon SVG)
//          DM support % bar (chart.dayMaster.strengthScore × 100)
const STRENGTH_META = {
  // ── CONCENTRATED (身强) ─────────────────────────────────────────────────────
  extremely_strong: {
    label:"Overpowering", zh:"极旺", polarity:"Concentrated",
    frame:"Your core element saturates the chart — there is very little counterbalance to what you already are.",
    approach:"Channel & Release",
    approachLine:"This energy needs outlets: expression, challenge, and friction. Without them it turns inward and becomes rigidity.",
  },
  strong: {
    label:"Dominant", zh:"旺", polarity:"Concentrated",
    frame:"Your core element leads the chart with clear authority — self-directed and largely independent of external conditions.",
    approach:"Channel & Release",
    approachLine:"This energy thrives when it has meaningful work to push against. Give it direction or it finds its own, usually at inconvenient moments.",
  },
  // ── EQUILIBRATED (身中和) ────────────────────────────────────────────────────
  moderate: {
    label:"Balanced", zh:"中和", polarity:"Equilibrated",
    frame:"Your core element sits in genuine equilibrium — neither overwhelming nor overwhelmed by the forces around it.",
    approach:"Maintain & Attune",
    approachLine:"This energy is naturally stable. The practice is staying attuned to what genuinely disrupts the balance, rather than forcing movement.",
  },
  // ── OPEN (身弱) ──────────────────────────────────────────────────────────────
  weak: {
    label:"Receptive", zh:"弱", polarity:"Open",
    frame:"Your core element depends on the right conditions to come through fully — it is not limited, it is context-sensitive.",
    approach:"Nourish & Amplify",
    approachLine:"This energy deepens when genuinely supported. The environment matters more than effort — seek what truly nourishes rather than what simply doesn't drain.",
  },
  extremely_weak: {
    label:"Yielding", zh:"极弱", polarity:"Open",
    frame:"Your core element operates almost entirely through alignment — when the conditions are right, the results are disproportionate to the apparent effort.",
    approach:"Nourish & Amplify",
    approachLine:"Alignment matters more than force here. The right conditions produce what years of effort in the wrong ones never will.",
  },
};



  // ── READING_ANGLES — 50 keys: domEl_specificTenGod ──────────────────────
  // Each key encodes the full interaction because the DM element is implied.
  // domEl × specificTenGod → unique DM element → unique elemental interaction.
  // Three angles per entry: how (TG mechanism), works (dynamic), deep (shadow).
  // yin/yang TG pairs are categorically different — not tonal variants.
  // Entries marked [PLACEHOLDER] need full generation (see batchGenerate.js).
  const READING_ANGLES = {
    // ── METAL DOMINANT ───────────────────────────────────────────────────────
    "金_比肩": { // Metal→Metal same-polarity · DM=Metal · Mirror
      how:   "You recognise equals instinctively and are genuinely indifferent to authority that hasn't demonstrated quality. The competitive register is structural: the drive is to be actually better, not to appear so.",
      works: "Metal-on-Metal same-polarity energises at the right intensity and compresses at excess. Environments that are all evaluation — rigid, no generative material — produce stagnation. The precision needs something real to work on rather than itself.",
      deep:  "The self-sufficiency this creates can look like independence but is isolation by standard. The people who actually reach you are the ones who match the standard without being told what it is.",
    },
    "金_劫财": { // Metal→Metal cross-polarity · DM=Metal · Rival
      how:   "You meet forces that share your nature but not your register — close enough to feel like peers, different enough to create structural competition. The orientation is comparative: not hostile, but always measuring the gap between your quality and theirs.",
      works: "The rival dynamic energises when the competition is genuine and compresses when it turns inward. The risk is applying the competitive register to yourself — the same apparatus that drives quality also drives chronic dissatisfaction with your own output.",
      deep:  "What the 劫财 mirror produces at depth: the people most like you are also the ones most likely to reveal your limits. Genuine peers are both the most useful and the most difficult to yield to.",
    },
    "金_食神": { // Metal→Earth DM · same-polarity · Flow
      how:   "The precision that emerges from your stability is non-assertive — it doesn't demand recognition. Standards appear in what you produce as a natural quality rather than a declared position. Others encounter the precision without knowing you chose it.",
      works: "The ease of natural precision can become its own risk: extending the evaluative output into what feels natural without checking whether the foundation that produces it is being maintained. The gift and the depletion come through the same door.",
      deep:  "Because the precision doesn't feel like effort from the inside, the accumulating cost of continuous high-standard output is invisible until it isn't. The system that produces quality effortlessly doesn't announce when it's running low.",
    },
    "金_伤官": { // Metal→Earth DM · cross-polarity · Edge
      how:   "The precision that emerges from your stability operates ahead of the structures built to evaluate it. Not willfully — structurally. What you produce consistently exceeds the conventional standard, which means the framework for assessing it is always slightly behind.",
      works: "The output is in structural tension with any authority that tries to contain it by conventional measure. This produces both breakthroughs and friction — the same quality creates both. The friction is not avoidable; it is the cost of genuine structural advancement.",
      deep:  "What 伤官 builds in Earth charts: the specific difficulty of working within institutions that grade on curves your output doesn't fit. The precision is real; the recognition lags. What accumulates is the gap between what you produce and what the available frameworks can acknowledge.",
    },
    "金_偏财": { // Metal→Fire DM · same-polarity · Field [PLACEHOLDER]
      how:   "The precision available to this chart is broad and distributed — warmth applied to many forms of exact knowledge simultaneously. The engagement ranges widely across material that can be refined and made precise.",
      works: "The broad distribution of precision energises when there is varied material to evaluate and dissipates when focus is required. The same ranging quality that produces wide capability makes concentrated depth harder to sustain.",
      deep:  "The distributed precision can produce a pattern of evaluating broadly without fully possessing any single domain. The warmth that generates the precision is genuine; the question is whether the precision finds its home or keeps ranging.",
    },
    "金_正财": { // Metal→Fire DM · cross-polarity · Harvest [PLACEHOLDER]
      how:   "The precision is directed toward specific, structured outcomes — focused warmth shaping the edge with cross-polarity discipline. What you build toward is methodical and earned; the standard is applied with direction, not just evaluated.",
      works: "The focused precision energises when the material is genuinely worthy and compresses when the outcome doesn't merit the full standard being applied to it. The same discipline that produces quality also resists releasing what isn't finished.",
      deep:  "正财 for Fire DM: the risk of directed precision is applying the evaluative standard to the warmth itself — asking whether the connection, the illumination, the relationship meets the bar. What was meant to be given becomes subjected to the very standard it was trying to express.",
    },
    "金_七杀": { // Metal→Wood DM · same-polarity · Trial [PLACEHOLDER]
      how:   "Metal presses on Wood without granting permission and without moderating itself. The reach has been shaped by something that doesn't care whether it survives the encounter. What this produces in character could not have been cultivated — it had to be forged.",
      works: "The 七杀 pressure is refining when the chart has sufficient resources to channel it and costly when it doesn't. The same structural condition produces the best and worst outcomes — it depends entirely on what the chart has to work with.",
      deep:  "What Metal pressure builds in Wood charts at depth: a quality of directed reach that ordinary growth could never produce. The direction is not natural — it was imposed. What remains after the imposition is the character that the reach alone would not have built.",
    },
    "金_正官": { // Metal→Wood DM · cross-polarity · Standard [PLACEHOLDER]
      how:   "Metal sets a standard for Wood that can be respected — structured precision that tests whether the reach is real and grants recognition when it is. The development operates within a framework the chart has chosen to endorse.",
      works: "The 正官 standard energises when the framework is worthy and produces disorientation when it is absent or corrupt. This chart reaches within structures it respects; when those structures fail, the reach loses its orientation point.",
      deep:  "What 正官 Metal builds in Wood charts: character that was shaped by a coherent standard rather than unmediated pressure. The shadow is dependence on worthy frameworks — the reach that learned to grow within structure has difficulty knowing what direction means without one.",
    },
    "金_偏印": { // Metal→Water DM · same-polarity · Well [PLACEHOLDER]
      how:   "Metal generates Water DM through the same-polarity register — precision sustaining depth without opening or redirecting it. The intelligence this chart carries is backed by a refining source that deepens rather than widens.",
      works: "Same-polarity generation produces backing that compounds and concentrates. The risk is a self-referencing depth that accumulates without form — precision feeding intelligence that has nowhere specific to go.",
      deep:  "What 偏印 Metal produces in Water charts at depth: standards applied to perception itself. The intelligence is backed by a source that asks of everything it perceives: is this accurate? — which is both the gift and the cost of this particular nourishment.",
    },
    "金_正印": { // Metal→Water DM · cross-polarity · Root [PLACEHOLDER]
      how:   "Metal generates Water DM through the cross-polarity register — precision nourishing depth while simultaneously opening and directing it. The intelligence this chart carries is backed by a source that both sustains and gives it somewhere to point.",
      works: "Cross-polarity generation produces nourishment that opens rather than only concentrates. The precision that feeds this chart's depth gives it form and direction — the intelligence that would otherwise range without landing finds the channel the precision provides.",
      deep:  "What 正印 Metal produces in Water charts: the specific quality of depth that has been given a shape by something sharper than itself. The intelligence is genuine; what makes it usable rather than diffuse is the precision that backs it.",
    },

    // ── WOOD DOMINANT ────────────────────────────────────────────────────────
    "木_比肩": { // Wood→Wood same-polarity · DM=Wood · Mirror [PLACEHOLDER]
      how:   "Reach amplifying reach — the developmental instinct running at double force without anything present to ask what should be consolidated. You invest in what's growing because the nature cannot distinguish between feeding what grows and growing endlessly.",
      works: "木 same-polarity amplification energises in environments with genuine material to reach toward and dissipates when the reach has nothing to consolidate around. The gift is generosity at scale; the shadow is diffuse investment that leaves nothing specifically yours.",
      deep:  "The 比肩 Wood mirror produces a specific pattern: the people who energise you most are also the ones who will not give the reach a boundary. Genuine peers in growth don't stop you from over-extending — they extend alongside you.",
    },
    "木_劫财": { // Wood→Wood cross-polarity · DM=Wood · Rival [PLACEHOLDER]
      how:   "Reach meeting reach in a competing register — developmental instinct expressed differently enough to create structural rivalry. The orientation is comparative: not hostile, but the instinct to grow is also the instinct to outpace.",
      works: "The rival Wood dynamic produces clarity about where genuine competition lies and depletes when the rivalry turns inward — reaching against yourself rather than toward the next stage.",
      deep:  "木 劫财: the people most like you in developmental drive are also the ones who reveal where your growth stalls. The rivalry is productive when it's between real equals; it's costly when it becomes measuring yourself against what others accomplish.",
    },
    "木_食神": { // Wood→Water DM · same-polarity · Flow [PLACEHOLDER]
      how:   "The reach that flows from your depth is non-assertive and natural — you grow toward things because that's what happens when the depth is full, not because you decided to. Others experience the developmental investment as something offered rather than claimed.",
      works: "The ease of natural outward reach from Water DM can become its own risk: extending into growth that feels organic without checking whether the depth sustaining it has been replenished. The depletion is invisible until it isn't.",
      deep:  "木 食神 from Water: what others don't see is that the reach is drawing from the depth. The generosity of the developmental instinct at this polarity is real; so is the cost of continuous outward movement on the source that sustains it.",
    },
    "木_伤官": { // Wood→Water DM · cross-polarity · Edge [PLACEHOLDER]
      how:   "The reach that emerges from your depth operates ahead of the frameworks that try to assess it — not willfully, but because the depth produces reach that exceeds conventional measure. The growth is structurally more advanced than what the available environment was built to contain.",
      works: "Wood 伤官 from Water produces both the breakthroughs and the friction. The same quality creates both: the reach that doesn't fit the framework is also the reach that advances beyond it. The friction is the price of genuine forward movement.",
      deep:  "What 伤官 Wood builds in Water charts: the specific difficulty of growing in environments that grade by standards your development has already outpaced. What accumulates is the gap between the depth of what you carry and the reach of what you're permitted to express.",
    },
    "木_偏财": { // Wood→Metal DM · same-polarity · Field [PLACEHOLDER]
      how:   "The living, growing material available to your precision is broad and distributed — reach ranging across many domains simultaneously. The engagement is wide: many things worth the evaluative standard, no single thing claiming its full force.",
      works: "偏财 Wood for Metal DM: the broad field energises when there is genuinely varied material to direct and dissipates when the precision is required to settle. The same ranging quality that produces wide capability resists the focused depth that mastery requires.",
      deep:  "The distributed engagement with living material produces a pattern of directing broadly without the precision finding its home. The evaluation is real; the question is whether it finds the domain where its full force is finally warranted.",
    },
    "木_正财": { // Wood→Metal DM · cross-polarity · Harvest [PLACEHOLDER]
      how:   "Precision directing living, growing material with cross-polarity discipline — the edge applied to what reaches and grows. The specific production: methodical pursuit of outcomes with genuine developmental substance. When something goes wrong, the first move is diagnostic.",
      works: "Wood as 正财 for Metal: the precision finds its direction in living material that has its own momentum. The two are catalytic — Metal defines what the growth becomes; Wood keeps the precision aimed at something alive. Without genuine Wood-type problems, the precision turns on itself.",
      deep:  "正财 Wood carries a specific shadow for Metal: the risk of controlling what you care about. The evaluative apparatus applied to living material eventually asks whether it is worthy of the standard — and doesn't always know when to stop asking.",
    },
    "木_七杀": { // Wood→Earth DM · same-polarity · Trial [PLACEHOLDER]
      how:   "Reach pressing on stability without permission and without moderation — roots that break stone over time. The Mountain has been shaped by something that keeps moving regardless of whether the ground yielded. What this produces in character could not have been cultivated.",
      works: "木 七杀 pressure on Earth: the same-polarity press is either refining or destabilising depending entirely on the chart's resources. The reach that breaks through the stability either produces dynamism or erosion — the structural condition itself doesn't care which.",
      deep:  "What Wood pressing Earth builds at depth: stability that learned to move. Not because it wanted to, but because something kept requiring it to. The Mountain that has been repeatedly pressed by roots is not the same Mountain that was never tested.",
    },
    "木_正官": { // Wood→Earth DM · cross-polarity · Standard [PLACEHOLDER]
      how:   "Reach setting a standard for stability that can be respected — movement asking whether the holding is living or merely inert. The structure that emerges from this relationship is stability that has been asked real questions and answered them.",
      works: "正官 Wood for Earth: the reach energises the stability when the framework is genuine and produces orientation loss when it is absent. This chart's stability is shaped by movement it has chosen to endorse.",
      deep:  "What 正官 Wood produces in Earth charts: the distinction between holding and growing. The stability that learned from reach has been given a question it couldn't have asked itself — and the character that results is more alive for having been asked.",
    },
    "木_偏印": { // Wood→Fire DM · same-polarity · Well [PLACEHOLDER]
      how:   "Reach sustaining warmth through the same-polarity register — the developmental instinct feeding the illuminating force from the same frequency. The nourishment compounds and deepens without opening in new directions.",
      works: "同 polarity generation produces backing that intensifies. The risk: warmth fed by same-polarity reach can become increasingly concentrated until it exceeds the container. The nourishment is real; the direction may need something other than more of the same.",
      deep:  "木 偏印 for Fire: the source sustaining the warmth is itself always reaching. The illumination is backed by something that never fully consolidates — which means the warmth is sustained but never quite settled.",
    },
    "木_正印": { // Wood→Fire DM · cross-polarity · Root [PLACEHOLDER]
      how:   "Reach nourishing warmth through the cross-polarity register — the developmental instinct feeding the illuminating force while simultaneously opening it toward something specific. The nourishment gives the warmth a direction rather than only sustaining it.",
      works: "Cross-polarity generation from Wood opens the Fire DM rather than only intensifying it. The reach provides nourishment that includes direction — the warmth that comes through this chart has somewhere to go, not just more of itself to give.",
      deep:  "正印 Wood produces in Fire charts: illumination backed by something that is always pointing toward the next stage. The warmth has a developmental quality — it doesn't just shine, it grows. The shadow is warmth that reaches past what the current recipient can hold.",
    },

    // ── FIRE DOMINANT ────────────────────────────────────────────────────────
    "火_比肩": { // Fire→Fire same-polarity · DM=Fire · Mirror [PLACEHOLDER]
      how:   "Warmth amplifying warmth — the illuminating force running at double intensity without containment or direction. The presence fills every room simultaneously and at equal depth, which is both the gift and the precise limit of this energy.",
      works: "火 same-polarity amplification energises in environments where the warmth has specific recipients and dissipates when the presence fills everything at once without landing anywhere in particular. Diffuse warmth costs as much as focused warmth and produces less.",
      deep:  "The 比肩 Fire mirror produces the specific difficulty of knowing who you are when the room isn't there to reflect back. The warmth is structural; the question at depth is whether it can sustain itself without an audience.",
    },
    "火_劫财": { // Fire→Fire cross-polarity · DM=Fire · Rival [PLACEHOLDER]
      how:   "Warmth meeting warmth in a competing register — presence at a slightly different frequency than the DM's. The relational instinct is comparative: the warmth recognises other warmth and measures itself against it without being able to help it.",
      works: "火 劫财 produces restlessness in close relationships — the people most like you in relational warmth are also the ones you measure yourself against. The gift is the clarity that comes from genuine peers; the cost is the difficulty of truly collaborating with someone who mirrors you closely enough to reveal your limits.",
      deep:  "What the rival Fire dynamic produces at depth: the specific loneliness of being most similar to the people who can't give you what you need, because they need the same thing from you.",
    },
    "火_食神": { // Fire→Wood DM · same-polarity · Flow [PLACEHOLDER]
      how:   "The warmth that flows from your reach is non-assertive and naturally generous — illumination that emerges because the developmental instinct is full and gives what it has. The warmth doesn't announce itself; it arrives because the reach produced it.",
      works: "The ease of natural warmth from Wood reach can become its own risk: extending into relational illumination that feels organic without checking whether the growth sustaining it has consolidated. The depletion of the reach-source is invisible in the warmth it produces.",
      deep:  "火 食神 from Wood: what others receive as generous warmth is drawing from the developmental source. The giving is genuine; so is the cost of continuous outward warmth on the reach that sustains it.",
    },
    "火_伤官": { // Fire→Wood DM · cross-polarity · Edge [PLACEHOLDER]
      how:   "The warmth that emerges from your reach challenges the frameworks available to receive it — not because you chose confrontation but because the illumination operates ahead of what conventional relational structures were built to contain.",
      works: "火 伤官 from Wood produces both the connections that change people and the friction with structures that weren't built for that kind of warmth. The same quality that creates profound impact creates difficulty with institutions and hierarchies that grade warmth by conventional measure.",
      deep:  "What 伤官 Fire builds in Wood charts: the specific gap between what the illumination offers and what the available framework can acknowledge. The warmth is real; the recognition consistently lags. What accumulates is the cost of giving more than the environment was built to receive.",
    },
    "火_偏财": { // Fire→Water DM · same-polarity · Field [PLACEHOLDER]
      how:   "Depth directing warmth broadly — perceptual intelligence applied to illumination as distributed material. The engagement ranges widely: many forms of warmth, many relational contexts, no single one claiming the full depth of the directing force.",
      works: "偏财 Fire for Water DM: the broad field of warmth energises when there is genuinely varied relational material to direct and dissipates when the depth is required to settle on one thing. The ranging quality that produces wide relational capability resists concentrated commitment.",
      deep:  "The distributed direction of warmth produces a pattern of engaging with many people and contexts without the depth fully landing anywhere. The intelligence directing the warmth is real; the question is whether it finds where its full force is finally warranted.",
    },
    "火_正财": { // Fire→Water DM · cross-polarity · Harvest [PLACEHOLDER]
      how:   "Depth directing warmth with cross-polarity discipline — perceptual intelligence shaping illumination into structured purpose. The warmth produced by this chart is directed rather than diffuse: it goes somewhere specific and builds something there.",
      works: "水 directing 火 as 正财: the depth gives the warmth a channel and a purpose. Without the directing force, the warmth would spread. With it, the illumination concentrates into outcomes. The shadow: the same depth that gives warmth direction can make it ask whether the warmth is justified before giving it.",
      deep:  "正财 Fire from Water: the risk is that the directing intelligence applies itself to warmth — asking whether the illumination is warranted, whether the connection meets the standard. What was meant to be freely given becomes subjected to the very precision that was trying to give it shape.",
    },
    "火_七杀": { // Fire→Metal DM · same-polarity · Trial [PLACEHOLDER]
      how:   "Fire pressing on Metal without granting permission and without moderating itself — the forge at its most uncompromising. What the Blade or Jewel carries was not developed. It was produced under conditions that didn't care whether the metal survived the temperature.",
      works: "火 七杀 on Metal: the same-polarity press is refining or damaging depending on the chart's resources. The forge that produces the finest edges also produces the most casualties. The structural condition itself makes no distinction.",
      deep:  "What Fire pressing Metal builds at depth: precision that was forged, not cultivated. The standard the Metal chart carries is real; so is the cost of the conditions that produced it. What remains after the forge is not the same metal that went in.",
    },
    "火_正官": { // Fire→Metal DM · cross-polarity · Standard [PLACEHOLDER]
      how:   "Fire setting a standard for Metal that can be respected — the forge with structure, direction, and the recognition that quality earned. What the Metal chart has built was built within a framework the warmth endorses.",
      works: "正官 Fire for Metal: the forge energises when the framework is genuine and produces orientation loss when it's absent. The precision that was shaped by structured warmth loses its direction without the framework that gave it shape.",
      deep:  "What 正官 Fire produces in Metal charts: precision that knows what it was built for. The shadow is the inverse — the precision that learned from a worthy standard has difficulty operating when no worthy standard is present.",
    },
    "火_偏印": { // Fire→Earth DM · same-polarity · Well [PLACEHOLDER]
      how:   "Warmth sustaining the Mountain through the same-polarity register — activation feeding stability from the same frequency. The nourishment intensifies what is already present rather than opening new directions.",
      works: "同 polarity Fire nourishing Earth: the stability is sustained and deepened by warmth that shares its register. The risk is a stability that becomes increasingly concentrated without the movement that would give what it holds somewhere to go.",
      deep:  "火 偏印 for Earth: the source sustaining the stability is itself always warm — which means the Mountain is nourished but not moved. What accumulates at depth is the weight of holding what the warmth keeps adding to.",
    },
    "火_正印": { // Fire→Earth DM · cross-polarity · Root [PLACEHOLDER]
      how:   "Warmth nourishing stability through the cross-polarity register — activation feeding the Mountain while simultaneously opening it toward movement. The nourishment gives the holding force a direction rather than only deepening it.",
      works: "正印 Fire for Earth: the warmth provides nourishment that includes activation — the stability is sustained and given somewhere to move. The Mountain that carries this nourishment is reliable and also alive.",
      deep:  "What 正印 Fire produces in Earth charts: the distinction between holding and giving. Stability nourished by warmth that opens has something to offer rather than only containing. The shadow is warmth that activates more than the stability can process before the next activation arrives.",
    },

    // ── EARTH DOMINANT ───────────────────────────────────────────────────────
    "土_比肩": { // Earth→Earth same-polarity · DM=Earth · Mirror [PLACEHOLDER]
      how:   "Stability amplifying stability — the holding force running at double weight without movement or release. The capacity to carry what others need carried is extraordinary; the circulation of what is held is not.",
      works: "土 same-polarity amplification energises when the holding is genuinely needed and accumulates without movement when it isn't. What is held tends to stay held; what circulates does so slowly. The gift is load-bearing presence at scale; the shadow is inertia that compounds quietly.",
      deep:  "The 比肩 Earth mirror produces the specific cost of being the ground under everyone else's feet: there is rarely anyone asking whether the ground itself is well. The stability is real; so is the invisibility of what sustains it.",
    },
    "土_劫财": { // Earth→Earth cross-polarity · DM=Earth · Rival [PLACEHOLDER]
      how:   "Stability meeting stability in a competing register — two holding forces claiming the same ground. The orientation is comparative: each form of reliability measuring itself against the other in the same space.",
      works: "土 劫财 produces clarity about where genuine solidity lies and depletes when the competition turns inward — two forms of the same holding quality pressing against each other rather than toward what needs to be held.",
      deep:  "What the rival Earth dynamic produces at depth: the specific difficulty of collaborating with someone whose stability is as real as yours but expressed differently. What should be shared ground becomes contested.",
    },
    "土_食神": { // Earth→Fire DM · same-polarity · Flow [PLACEHOLDER]
      how:   "The stability that flows from your warmth is non-assertive and naturally generous — structure that appears as a quality of what you produce rather than as a declared standard. Others encounter the reliability without knowing you chose it.",
      works: "土 食神 from Fire: the ease of natural stability from warmth can produce the same risk — extending into structural output that feels organic without checking whether the warmth sustaining it is being replenished.",
      deep:  "What the flow of stability from Fire produces at depth: the specific invisibility of the cost. The structure is genuine; the warmth that generates it doesn't announce when producing it has become a depletion.",
    },
    "土_伤官": { // Earth→Fire DM · cross-polarity · Edge [PLACEHOLDER]
      how:   "The stability produced by your warmth exceeds the structural expectations of the environment — not as assertion but as structural emergence. What you build consistently goes further than the framework was designed to evaluate.",
      works: "土 伤官 from Fire produces both the lasting structures and the friction with institutions that grade stability by conventional measure. The same quality that builds things that outlast their builders creates difficulty with whatever tries to assess them by standard means.",
      deep:  "What 伤官 Earth builds in Fire charts: the specific gap between what the stability offers and what the environment knows how to acknowledge. The structure is real; the recognition consistently arrives late or not at all.",
    },
    "土_偏财": { // Earth→Wood DM · same-polarity · Field [PLACEHOLDER]
      how:   "Reach directing stability broadly — developmental instinct applied to holding and structure as distributed material. The engagement ranges across many forms of stable outcome, no single one claiming the full force of the reach.",
      works: "偏财 Earth for Wood DM: the broad field energises when there is genuinely varied material to cultivate toward stability and dissipates when concentration is required. The ranging quality resists the settled depth that enduring structure requires.",
      deep:  "The distributed direction of stability produces a pattern of reaching toward reliable outcomes across many domains without any single one bearing the full weight of the developmental investment.",
    },
    "土_正财": { // Earth→Wood DM · cross-polarity · Harvest [PLACEHOLDER]
      how:   "Reach directing stability with cross-polarity discipline — developmental instinct shaping the holding force toward structured cultivation. The reach knows what the stability is for: it directs the fertility toward what can be harvested.",
      works: "木 directing 土 as 正财: the reach gives the stability a direction and a harvest. Without the reach, the stability accumulates without producing. With it, the holding force becomes generative. The shadow: the reach applied to stability eventually asks whether the fertility is yielding.",
      deep:  "正财 Earth from Wood: the risk is that the developmental intelligence applies itself to what is being cultivated — asking whether the growth justifies the holding. The patience that was meant to allow things to develop becomes the standard things must meet before the patience continues.",
    },
    "土_七杀": { // Earth→Water DM · same-polarity · Trial [PLACEHOLDER]
      how:   "Earth pressing on Water without permission and without moderation — the dam blocking depth that didn't ask to be contained. What the Water chart carries was shaped by a containing force that gave it the only form it has.",
      works: "土 七杀 on Water: the same-polarity press either produces depth that has found its banks or depth that was dammed before it could find its form. The containment itself doesn't care which outcome results.",
      deep:  "What Earth pressing Water builds at depth: intelligence that learned to work within a container it didn't choose. The depth is real; so is the shape that was imposed on it. What remains is not the depth that would have emerged naturally.",
    },
    "土_正官": { // Earth→Water DM · cross-polarity · Standard [PLACEHOLDER]
      how:   "Earth setting a standard for Water that can be respected — containment that asks whether the depth has form and grants recognition when it does. The intelligence this chart carries was shaped by a structure the depth chose to endorse.",
      works: "正官 Earth for Water: the containment energises when the framework is worthy and produces orientation loss when it is absent. The depth that learned to work within structure loses its sense of direction without the container that gave it shape.",
      deep:  "What 正官 Earth produces in Water charts: intelligence that knows how to be useful. The shadow is depth that learned to express only within provided containers — which can mistake the container for the intelligence itself.",
    },
    "土_偏印": { // Earth→Metal DM · same-polarity · Well [PLACEHOLDER]
      how:   "Stability sustaining precision through the same-polarity register — the holding force feeding the evaluative standard from the same frequency. The nourishment deepens the precision without opening it in new directions.",
      works: "同 polarity Earth nourishing Metal: the precision is sustained and deepened by stability that shares its register. The risk is precision that becomes increasingly concentrated without the release that would give what it evaluates somewhere to go.",
      deep:  "土 偏印 for Metal: the source sustaining the precision is itself always patient — which means the evaluative standard is nourished but not moved. What accumulates is precision applied to an increasingly refined and increasingly narrow standard.",
    },
    "土_正印": { // Earth→Metal DM · cross-polarity · Root [PLACEHOLDER]
      how:   "Stability nourishing precision through the cross-polarity register — the holding force feeding the evaluative standard while simultaneously opening it toward application. The nourishment gives the precision a direction rather than only sharpening it.",
      works: "正印 Earth for Metal: the stability provides nourishment that includes directionality. The precision is sustained and given something to evaluate — the standard is backed by ground and pointed toward what deserves it.",
      deep:  "What 正印 Earth produces in Metal charts: precision that knows where to stand. The shadow is that the stability-backing can produce a precision that requires being grounded before it can evaluate — which means the standard is sound but contingent on the ground holding.",
    },

    // ── WATER DOMINANT ───────────────────────────────────────────────────────
    "水_比肩": { // Water→Water same-polarity · DM=Water · Mirror [PLACEHOLDER]
      how:   "Depth amplifying depth — perceptual intelligence running at double range without form or channel. The capacity to hold what others cannot and perceive what isn't said is extraordinary; the capacity to concentrate that depth into something specific is not.",
      works: "水 same-polarity amplification energises when the depth has a direction and dissipates when the intelligence ranges without landing. The gift is vast perceptual range; the shadow is depth that touches everything at equal intensity and therefore nothing specifically.",
      deep:  "The 比肩 Water mirror produces the specific cost of perceiving at a range others can't follow: you operate with more information than most environments can verify or use. What accumulates is the gap between what you carry and what can be received.",
    },
    "水_劫财": { // Water→Water cross-polarity · DM=Water · Rival [PLACEHOLDER]
      how:   "Depth meeting depth in a competing register — two forms of perceptual intelligence oriented differently toward the same range of experience. The orientation is comparative: each form of intelligence measuring the depth of the other.",
      works: "水 劫财 produces clarity about where genuine intelligence lies and depletes when the comparison turns inward. The rival dynamic is productive between real equals; it's costly when the intelligence applies its full perceptual range to its own limits.",
      deep:  "What the rival Water dynamic produces at depth: the specific difficulty of the most genuinely intelligent people in your range also being the ones most likely to challenge your read. Yielding to a peer who perceives at the same depth requires a different kind of intelligence.",
    },
    "水_食神": { // Water→Metal DM · same-polarity · Flow [PLACEHOLDER]
      how:   "The depth that flows from precision is non-assertive and naturally generous — intelligence that appears as a quality of what the precision produces rather than as a declared claim. Others encounter the depth without knowing it was the precision that generated it.",
      works: "水 食神 from Metal: the ease of natural depth from precision can produce the invisible depletion risk — the intelligence that flows naturally from the evaluative standard draws from the same source that sustains the precision. The depletion of the evaluative source shows up in the depth first.",
      deep:  "What flows from Metal precision as Food God depth: the intelligence is real and appears effortless. So is the cost of sustaining a precision high enough to generate that quality of depth continuously.",
    },
    "水_伤官": { // Water→Metal DM · cross-polarity · Edge [PLACEHOLDER]
      how:   "The depth produced by your precision operates ahead of the frameworks built to assess intelligence — the perceptual range consistently exceeds what the available environment was designed to contain or verify.",
      works: "水 伤官 from Metal produces both the depth that changes how problems are understood and the friction with institutions that grade intelligence by standard measures. The same quality creates genuine insight and structural difficulty with whatever tries to evaluate it conventionally.",
      deep:  "What 伤官 Water builds in Metal charts: the specific gap between the depth of perception and the depth of recognition. The intelligence is real; the verification consistently lags. What accumulates is the cost of carrying more than the environment can use.",
    },
    "水_偏财": { // Water→Earth DM · same-polarity · Field [PLACEHOLDER]
      how:   "Stability directing depth broadly — holding force applied to intelligence and perception as distributed material. The engagement ranges across many forms of perceptual depth, no single one claiming the full weight of the containing force.",
      works: "偏财 Water for Earth DM: the broad field energises when there is genuinely varied intelligence to direct and dissipates when the stability is required to settle on one specific form of depth. The ranging quality resists the concentrated depth that mastery requires.",
      deep:  "The distributed direction of depth produces a pattern of providing ground for many forms of intelligence without the stability fully investing in any single one. What it holds is real; what it harvests from what it holds is less clear.",
    },
    "水_正财": { // Water→Earth DM · cross-polarity · Harvest [PLACEHOLDER]
      how:   "Stability directing depth with cross-polarity discipline — holding force shaping perceptual intelligence into productive form. The depth available to this chart is directed rather than diffuse: the ground gives the intelligence a channel.",
      works: "土 directing 水 as 正财: the stability gives the depth form and direction. Without the directing force, the intelligence would range. With it, the perception concentrates into outcomes others can engage with. The shadow: the stability applied to depth eventually asks whether the intelligence is being harvested correctly.",
      deep:  "正财 Water from Earth: the risk is that the containing intelligence applies itself to depth — asking whether the perception is useful, whether what is being carried meets the standard for what it's worth carrying. What was meant to flow is asked to justify its current.",
    },
    "水_七杀": { // Water→Fire DM · same-polarity · Trial [PLACEHOLDER]
      how:   "Water pressing on Fire without permission and without moderation — the extinguishing force that shapes warmth by testing whether it can survive encounter with what would put it out. What the Fire chart carries was not the original warmth; it is the warmth that remained.",
      works: "水 七杀 on Fire: the same-polarity press either produces warmth that learned to sustain itself in genuinely difficult conditions or warmth that was reduced by conditions it couldn't survive. The structural condition itself does not care which.",
      deep:  "What Water pressing Fire builds at depth: warmth that doesn't require favorable conditions to sustain itself. Not because it is impervious — because it learned to burn with less than it needed. What remains after the encounter is a different kind of warmth.",
    },
    "水_正官": { // Water→Fire DM · cross-polarity · Standard [PLACEHOLDER]
      how:   "Water setting a standard for Fire that can be respected — depth asking whether the warmth is sustainable and granting recognition when it is. The illumination this chart produces was shaped by a framework the depth endorses.",
      works: "正官 Water for Fire: the standard energises when the depth-framework is genuine and produces disorientation when it is absent. The warmth that learned to sustain itself within a coherent standard of depth loses its bearing without that standard.",
      deep:  "What 正官 Water produces in Fire charts: illumination that knows what it's for. The shadow is warmth that learned to justify itself to a standard it respected — which can make the warmth conditional on passing the justification.",
    },
    "水_偏印": { // Water→Wood DM · same-polarity · Well [PLACEHOLDER]
      how:   "Depth sustaining reach through the same-polarity register — perceptual intelligence feeding the developmental instinct from the same frequency. The nourishment deepens the reach without opening it in new directions.",
      works: "同 polarity Water nourishing Wood: the reach is sustained and deepened by depth that shares its register. The risk is reach that becomes increasingly perceptive without the definition that would give the growth somewhere specific to go.",
      deep:  "水 偏印 for Wood: the source sustaining the reach is itself always perceiving — which means the developmental instinct is nourished but not directed. The growth keeps reaching toward something the depth keeps revealing but never specifying.",
    },
    "水_正印": { // Water→Wood DM · cross-polarity · Root [PLACEHOLDER]
      how:   "Depth nourishing reach through the cross-polarity register — perceptual intelligence feeding the developmental instinct while simultaneously opening it toward something specific. The nourishment gives the growth a direction rather than only deepening it.",
      works: "正印 Water for Wood: the depth provides nourishment that includes direction — the reach is sustained and pointed toward something the depth can identify. The growth that comes through this chart has a sense of where it is going.",
      deep:  "What 正印 Water produces in Wood charts: reach that knows what it's growing toward. The shadow is reach that learned to grow only in directions the depth endorses — which can produce profound development within a narrowing range.",
    },
  };

  function getAnglesForEl(el, tenGod) {
    const key = `${el}_${tenGod}`;
    return READING_ANGLES[key] || null;
  }


// ── ELEMENTAL_NATURE — module-level constant (per-stem × per-band) ────────────
// Describes the operating MODE of the DM's core nature at this energy level.
// Defined at module level — static content, must not rebuild on every render.

// ── ELEMENTAL_NATURE — per-stem × per-band personality trait paragraph ──────
// This describes the operating MODE of the DM's core nature at this energy level.
// Different from the archetype identity (who you are) — this is how the energy RUNS.
const ELEMENTAL_NATURE = {
  "甲": {
    concentrated: "At full charge, the reach is structural — you don't decide to grow toward things, it simply happens before a deliberate choice forms. Others experience you as someone already halfway to the next stage while they're still deciding whether to begin. The risk isn't ambition. It's building for so many people at once that little of what grows is specifically yours.",
    balanced:     "The reach and the root are in genuine conversation — you can tell the difference between momentum that's working and momentum that's running ahead of itself. This is the Oak at its most architecturally sound: vision present, patience to let it fully form, and the instinct to consolidate before the next reach begins.",
    open:         "The vision is entirely intact, but the energy comes through most fully in the right conditions. You're not a diminished version of this archetype — you're the one who has learned, through necessity, exactly what kind of soil is actually needed. What you build in genuinely supportive environments surprises even you.",
  },
  "乙": {
    concentrated: "The intelligence that reads surfaces and finds non-obvious routes is running continuously — you navigate before you decide to, arriving exactly where you intended by routes others couldn't have predicted or followed. At this intensity, the gift is extraordinary; the risk is mistaking continuous movement for arrival.",
    balanced:     "The adaptability serves direction rather than replacing it. You can tell the difference between a route worth committing to and one worth exploring, which is rarer than it sounds. The Vine in balance is quietly building something more significant than it typically acknowledges.",
    open:         "The navigational intelligence is entirely real, but it requires something genuine to push against — a surface worth climbing, a destination worth the full sensitivity. Without it, the gift doesn't fail; it simply doesn't reach. This makes your choices about environment among the most consequential decisions you make.",
  },
  "丙": {
    concentrated: "The warmth is structural, not situational — it operates whether or not it's been invited, and others feel it before you announce yourself. At this intensity the challenge isn't sustaining the warmth but choosing where to direct it: diffuse warmth costs the same as focused warmth and produces a fraction of the impact.",
    balanced:     "The Sun in equilibrium has found the right arc of sky — warmth reaches who it's for, presence does its work without exhausting its source, and what gets illuminated at this level tends to stay changed. This is warmth that sustains because it chose where to go.",
    open:         "The light is genuinely present, but it comes through most fully in the right conditions. You can fill a room when the conditions are right in a way that surprises people who've only seen you in the wrong ones. The range between those two states is one of the most important things to understand about how you work.",
  },
  "丁": {
    concentrated: "The focused attention is always running — the candle illuminates completely what it's pointed at, and at this intensity it points at everything simultaneously. Precision this continuous is both irreplaceable and difficult to live near. What you light up tends to be genuinely illuminated. What doesn't receive the beam often feels that absence.",
    balanced:     "The specificity and the sustainability are finally in conversation. At this level the candle illuminates what genuinely matters rather than everything at once, and what it lights up tends to stay lit. The focused attention is your greatest gift; the balance means it actually lands.",
    open:         "The capacity for precise, specific illumination is fully present — but it requires nourishment to come through completely. In the right environment, the candle's precision is extraordinary. This makes you unusually attentive to what's feeding you and what's depleting you, even when others can't see the difference.",
  },
  "戊": {
    concentrated: "The stability is constitutional — people orient around you before they've decided to, in the way they orient around a mountain before understanding its scale. At this intensity the reliability is extraordinary and the movement is genuinely difficult: the same quality that makes you load-bearing for others requires deliberate effort to shift yourself.",
    balanced:     "Stability and movement are in productive conversation — you can hold things reliably and you can shift when genuine shifting is required. This is the Mountain that knows the difference between steadiness and stubbornness, which is rarer than it appears from the outside.",
    open:         "The capacity for genuine stability is entirely real — but it requires the right conditions to become the kind of ground others can orient by. In the right environment, what you hold is extraordinary. This means the environments and relationships you choose are not incidental to your nature. They are its conditions.",
  },
  "己": {
    concentrated: "The nourishing instinct operates below the threshold of conscious decision — you invest in what's growing around you before you've chosen to, and the cultivation continues whether or not it's acknowledged. At this intensity, the fertility is extraordinary and the risk is a kind of generosity that leaves little for the field itself.",
    balanced:     "The cultivation and the harvest are in genuine rhythm — you know the difference between growth that's real and growth that's consuming the source. This is the Field at its most productive: patient with what takes time, clear-eyed about what's ready, and genuinely nourished by what returns.",
    open:         "The capacity to cultivate and nourish is entirely real — but it comes through most fully when the conditions genuinely support it. In the right environment, what you grow is extraordinary. The care you take in choosing where to invest your fertility is not caution — it is the practice.",
  },
  "庚": {
    concentrated: "The evaluation runs before you decide to evaluate — it starts the moment you walk in and files the report before the social read has fully landed. At this intensity, the precision is a default operating state, not a mode. Others experience you as accurate before they experience you as warm. Both things are true simultaneously.",
    balanced:     "The precision and the world are in productive conversation — the evaluation is real and it takes in new information rather than simply confirming what it already concluded. This is Yang Metal at its most architecturally sound: the edge is sharp, the direction is genuine, and the standard is something others can actually work with.",
    open:         "The precision is fully present in principle — but it comes through most completely when the conditions support it. In the right environment, the evaluation is extraordinary. This makes you more selective about where you bring your full standard than people who carry theirs at all times, which is not a limitation. It is a different kind of intelligence about fit.",
  },
  "辛": {
    concentrated: "The discernment operates automatically — you perceive what is excellent the way others perceive temperature, before the question is asked. At this intensity, the standard is always running, and it applies to everything including yourself. Others may experience this as demanding before they experience it as precise. Both things are accurate.",
    balanced:     "The clarity and its container are in genuine conversation — the discernment functions without being exposed to conditions that damage it, and what it perceives tends to be both accurate and usable. This is the Jewel at its clearest: the quality is real and the setting holds it correctly.",
    open:         "The capacity for genuine discernment is entirely present — but it requires the right conditions to express at its finest. In environments that genuinely support it, what you perceive and the standard you carry are extraordinary. You are unusually clear about what's worth your discernment and what isn't, which others may mistake for selectivity but is actually a sophisticated form of accuracy.",
  },
  "壬": {
    concentrated: "The depth is always operating — you carry more beneath the surface than you ever show, and what you're perceiving in any given room is significantly more than what's being said in it. At this intensity the intelligence is vast and the challenge is form: depth this continuous needs banks or it becomes a flood that touches everything at equal depth and therefore nothing specifically.",
    balanced:     "The depth and its channels are in genuine conversation — what you perceive can actually reach people, and the range of what you can carry doesn't overwhelm the form that gives it direction. This is the Ocean at its most navigable: vast, yes, but with a current others can actually travel.",
    open:         "The perceptual range is fully real — but it comes through most completely in the right conditions. In the right environment, what you carry and what you perceive are extraordinary. You are unusually clear about what genuinely nourishes the depth and what depletes it, which is both the gift and the practice of living this way.",
  },
  "癸": {
    concentrated: "The sensitivity is always running — you know what's true before it's spoken and nourish what you touch without announcing it. At this intensity, the attunement is extraordinary and the risk is that what flows everywhere at once can lose the specific direction that gives it its greatest power.",
    balanced:     "The sensitivity and its direction are in genuine conversation — what you perceive can flow toward something specific, and the nourishing instinct has a shape rather than simply spreading. This is the Rain at its most purposeful: the attunement is real and it reaches who it's for.",
    open:         "The capacity for genuine attunement and quiet nourishment is entirely present — but it requires the right conditions to come through completely. In the right environment, what you perceive and what you offer are extraordinary. The care you take in creating those conditions is not self-protection — it is the practice of sustaining the gift.",
  },
};

function YourNature({ chart }) {
  const dm      = chart.dayMaster;
  const color   = EL_C[dm.element];
  const band    = getEnergyBand(dm.strength);
  const profile = buildDayMasterProfile(chart);
  const ff      = "'EB Garamond',Georgia,serif";

  const stemData  = STEM_CARD_DATA[dm.stem] || {};
  const psychCore = stemData.psychCore || {};
  const blocks    = stemData.blocks || [];

  const getBlock  = (kw) => blocks.find(b => b.label && b.label.toLowerCase().includes(kw.toLowerCase()));
  const blockText = (block) => { if (!block || !block.text) return ""; return block.text[band] || block.text.default || ""; };
  const firstN    = (text, n) => { if (!text) return ""; const s = text.match(/[^.!?]+[.!?]+/g) || [text]; return s.slice(0, n).join(" ").trim(); };

  const desc      = firstN(psychCore.desc || "", 2);
  const pullQuote = firstN(blockText(getBlock("experience")), 2);
  const yangText  = firstN(blockText(getBlock("good at")), 1);
  const yinText   = firstN(blockText(getBlock("get stuck")), 1);

  return (
    <div style={{borderRadius:16,border:`1.5px solid ${color}25`,overflow:"hidden",background:`linear-gradient(160deg,${color}06 0%,#faf7f2 100%)`,marginBottom:20}} className="fade">

      {/* Layer 1 — Description */}
      <div style={{padding:"28px 24px 22px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
          <span style={{fontSize:9,letterSpacing:2.5,textTransform:"uppercase",color:`${color}60`,fontFamily:ff}}>Your Nature</span>
          <span style={{width:3,height:3,borderRadius:"50%",background:`${color}35`,display:"inline-block"}}/>
          <span style={{fontSize:9,letterSpacing:1.5,textTransform:"uppercase",color:`${color}60`,fontFamily:ff}}>{profile.archetype}</span>
        </div>
        {desc && <p style={{fontFamily:ff,fontSize:15,lineHeight:1.78,color:"#4a3c32",margin:0}}>{desc}</p>}
      </div>

      {/* Layer 2 — Pull-quote */}
      {pullQuote && (
        <div style={{margin:"0 20px 22px",padding:"16px 18px",borderLeft:`3px solid ${color}`,background:`${color}08`,borderRadius:"0 10px 10px 0"}}>
          <p style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:16,lineHeight:1.72,color:"#3a2e26",fontStyle:"italic",margin:0}}>
            "{pullQuote}"
          </p>
        </div>
      )}

      {/* Layer 3 — Yang / Yin contrast */}
      {(yangText || yinText) && (
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
          <div style={{padding:"18px 18px 22px",borderTop:`0.5px solid ${color}18`,borderRight:`0.5px solid ${color}18`}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}>
              <div style={{width:12,height:12,borderRadius:"50%",border:`1.5px solid ${color}`,background:"transparent",flexShrink:0}}/>
              <span style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:`${color}80`,fontFamily:ff}}>Yang</span>
            </div>
            <p style={{fontFamily:ff,fontSize:13,lineHeight:1.65,color:"#4a3c32",margin:0}}>{yangText}</p>
          </div>
          <div style={{padding:"18px 18px 22px",borderTop:`0.5px solid ${color}18`,background:`${color}10`}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}>
              <div style={{width:12,height:12,borderRadius:"50%",background:color,flexShrink:0}}/>
              <span style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:`${color}80`,fontFamily:ff}}>Yin</span>
            </div>
            <p style={{fontFamily:ff,fontSize:13,lineHeight:1.65,color:"#4a3c32",margin:0}}>{yinText}</p>
          </div>
        </div>
      )}

      {/* Layer 4 — Curiosity hook */}
      <div style={{padding:"13px 24px 15px",borderTop:`0.5px solid ${color}12`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <p style={{fontFamily:ff,fontSize:13,fontStyle:"italic",color:`${color}80`,margin:0,lineHeight:1.5}}>
          There's a specific condition that brings out the sharpest version of this.
        </p>
        <span style={{fontSize:14,color:`${color}50`,marginLeft:10,flexShrink:0}}>›</span>
      </div>

    </div>
  );
}

function ElementSpectrum({ chart, userTier = TIERS.FREE, onPaywall = ()=>{} }) {
  const dm      = chart.dayMaster;
  const dmColor = EL_C[dm.element];
  const insights = getElementInsights(chart);
  const band = getEnergyBand(dm.strength);
  const energiesBase = (ELEMENT_ENERGIES[dm.stem]?.[band]) || ELEMENT_ENERGIES["庚"].concentrated;
  const monthBranch  = chart.pillars?.month?.branch || "";
  const energies     = applyTiaohouToEnergies(energiesBase, dm.stem, monthBranch);
  const sm  = STRENGTH_META[dm.strength] || STRENGTH_META.moderate;
  const ecr = (ENERGY_CONDITION_READINGS[dm.stem] || ENERGY_CONDITION_READINGS["庚"])[band];
  const profile = buildDayMasterProfile(chart);
  const natureTeaser = profile.whoYouAreTeaser;
  const isSeeker = userTier >= TIERS.SEEKER;

  const sortedEls = Object.entries(chart.elements)
    .map(([el, d]) => ({ el, count: d?.count || 0, present: d?.present || false }))
    .sort((a, b) => {
      if (!a.present && b.present) return 1;
      if (a.present && !b.present) return -1;
      return b.count - a.count;
    })
    .map(({ el }) => el);

  const ff = "'EB Garamond',Georgia,serif";
  const divider = <div style={{height:"0.5px",background:`${dmColor}18`,margin:"20px 0"}}/>;

  const isPure = computeTgPattern(chart) === "pure";

  // ── Compound archetype card — renders after dominant energy CalloutCard ───
  // FREE: hook + dynamic only (or empty space if not generated yet)
  // SEEKER: all 13 fields (or empty space if not generated yet)
  const CompoundReadingCard = ({ el, tenGod, color }) => {
    const key = tenGod ? `${el}_${tenGod}` : null;
    const card = key ? COMPOUND_CARDS[key] : null;
    const fields = isSeeker
      ? ["your_scene","your_interior","your_tension","your_fuel","your_cost","your_build","running_well","off_track","your_person","one_line"]
      : [];
    const fieldLabels = {
      your_scene:    "The scene that keeps finding you",
      your_interior: "Your interior",
      your_tension:  "Your tension",
      your_fuel:     "What lights you up",
      your_cost:     "What this costs",
      your_build:    "What you're building",
      running_well:  "When you're running well",
      off_track:     "When something's off",
      your_person:   "The person who gets you",
      one_line:      "The one line",
    };

    // Nothing to show for free if no compound card
    if (!isSeeker && !card?.hook) return null;

    return (
      <div style={{borderRadius:10,border:`1px dashed ${color}40`,marginTop:8,marginBottom:4,overflow:"hidden",background:`${color}04`}}>
        {/* Hook + dynamic — free */}
        {(card?.hook || card?.dynamic) ? (
          <div style={{padding:"14px 15px",borderBottom: isSeeker ? `0.5px solid ${color}15` : "none"}}>
            {card.hook && <p style={{fontFamily:ff,fontSize:14,lineHeight:1.75,color:"#584A3E",fontStyle:"italic",margin:"0 0 10px 0"}}>{card.hook}</p>}
            {card.dynamic && <p style={{fontFamily:ff,fontSize:13.5,lineHeight:1.75,color:"#7a6e64",margin:0}}>{card.dynamic}</p>}
          </div>
        ) : !card && (
          // Placeholder — not generated yet
          <div style={{padding:"14px 15px",borderBottom: isSeeker ? `0.5px solid ${color}15` : "none"}}>
            <p style={{fontFamily:ff,fontSize:13,lineHeight:1.7,color:`${color}60`,fontStyle:"italic",margin:0}}>
              Full compound reading for {el} {tenGod ? `· ${tenGod}` : ""} coming soon.
            </p>
          </div>
        )}

        {/* Seeker-only fields */}
        {isSeeker && fields.map((f, i) => (
          <div key={f} style={{padding:"12px 15px",borderBottom: i < fields.length-1 ? `0.5px solid ${color}10` : "none"}}>
            <div style={{fontSize:9,fontWeight:500,letterSpacing:1.2,textTransform:"uppercase",color:`${color}80`,fontFamily:ff,marginBottom:5}}>{fieldLabels[f]}</div>
            {card?.[f] ? (
              <p style={{fontFamily:ff,fontSize:13,lineHeight:1.75,color:"#584A3E",margin:0,fontStyle: f==="one_line" ? "italic" : "normal"}}>
                {f === "one_line" ? `"${card[f]}"` : card[f]}
              </p>
            ) : (
              <p style={{fontFamily:ff,fontSize:13,lineHeight:1.7,color:`${color}50`,fontStyle:"italic",margin:0}}>—</p>
            )}
          </div>
        ))}

        {/* Gate — free users see upgrade prompt below hook/dynamic */}
        {!isSeeker && card?.hook && (
          <div style={{padding:"12px 15px",display:"flex",alignItems:"center",justifyContent:"space-between",borderTop:`0.5px solid ${color}15`}}>
            <span style={{fontFamily:ff,fontSize:12,color:`${color}80`,fontStyle:"italic"}}>Your interior, your tension, your cost + more on Seeker</span>
            <button onClick={onPaywall} style={{padding:"5px 14px",borderRadius:20,border:`1px solid ${color}50`,background:"transparent",fontFamily:ff,fontSize:11,color:color,cursor:"pointer",flexShrink:0,marginLeft:10}}>◆ Unlock</button>
          </div>
        )}
      </div>
    );
  };

  const CalloutCard = ({ color, borderStyle="solid", icon, sectionLabel, name, line, guidance, keywords=[], angles=null, count=null, totalCount=null, tenGod=null }) => {
    const tgProfile  = tenGod ? TG_PROFILES[tenGod] : null;
    const godDesc    = tgProfile ? tgProfile.describe(icon) : null;
    return (
    <div style={{borderRadius:12,marginBottom:12,
      background: borderStyle==="dashed" ? "transparent" : `${color}0d`,
      border: borderStyle==="dashed" ? `1px dashed ${color}50` : `0.5px solid ${color}28`,
      overflow:"hidden"}}>
      {/* Card header */}
      <div style={{padding:"14px 15px",paddingBottom: angles ? 10 : 14}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom: keywords.length ? 8 : 9}}>
          <div style={{width:28,height:28,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,
            background: borderStyle==="dashed" ? "transparent" : `${color}18`,
            border: borderStyle==="dashed" ? `1px dashed ${color}55` : `0.5px solid ${color}35`}}>
            <ElementIcon el={icon} color={color} size={15}/>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:9,letterSpacing:1.5,textTransform:"uppercase",color:`${color}90`,fontFamily:ff,fontWeight:500,marginBottom:2}}>{sectionLabel}</div>
            <div style={{fontSize:14,fontWeight:600,color:color,fontFamily:ff,lineHeight:1.15}}>{name}</div>
          </div>
          {count !== null && totalCount !== null && (
            <div style={{textAlign:"right",flexShrink:0}}>
              <div style={{fontSize:20,fontWeight:600,color:color,fontFamily:"'Cormorant Garamond',Georgia,serif",lineHeight:1}}>{Math.round(count/totalCount*100)}<span style={{fontSize:11,color:`${color}70`,fontWeight:400}}>%</span></div>
            </div>
          )}
        </div>
        {count !== null && totalCount !== null && (
          <div style={{height:4,borderRadius:2,background:`${color}15`,marginBottom:9,overflow:"hidden"}}>
            <div style={{width:`${Math.round(count/totalCount*100)}%`,height:"100%",borderRadius:2,background:color,opacity:0.65,transition:"width 0.6s ease"}}/>
          </div>
        )}
        {keywords.length > 0 && (
          <div style={{display:"flex",gap:6,marginBottom:9,flexWrap:"wrap"}}>
            {keywords.map((kw,i) => (
              <span key={i} style={{fontSize:10,letterSpacing:0.5,color:color,background:`${color}14`,border:`0.5px solid ${color}30`,borderRadius:20,padding:"2px 9px",fontFamily:ff,fontWeight:500}}>{kw}</span>
            ))}
          </div>
        )}
        {!angles && <div style={{fontSize:13,lineHeight:1.68,color:C.textSec,fontStyle:"italic",fontFamily:ff,marginBottom:5}}>{line}</div>}
        {!angles && <div style={{fontSize:12,lineHeight:1.6,color:C.textTer,fontFamily:ff}}>{guidance}</div>}
      </div>

      {/* Ruling god section — only for dominant elements with TG resolved */}
      {tgProfile && godDesc && (
        <div style={{borderTop:`0.5px solid ${color}15`,padding:"14px 15px",background:`${color}06`}}>
          <div style={{fontSize:9,fontWeight:500,letterSpacing:1.2,textTransform:"uppercase",color:`${color}70`,fontFamily:ff,marginBottom:10}}>Your ruling force</div>
          <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
            {/* Concept art */}
            <div style={{flexShrink:0,borderRadius:10,overflow:"hidden",border:`0.5px solid ${color}25`,background:`${color}06`}}>
              {tgProfile.art(color)}
            </div>
            {/* Name + description */}
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:7}}>
                <span style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:16,color:color,lineHeight:1}}>{tenGod}</span>
                <span style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:15,color:color,fontWeight:400,lineHeight:1}}>{tgProfile.en}</span>
              </div>
              <p style={{fontFamily:ff,fontSize:12.5,lineHeight:1.75,color:C.textSec,margin:0}}>{godDesc}</p>
            </div>
          </div>
        </div>
      )}

      {/* Three reading angles (What this energy is now lives in the god section above) */}
      {angles && (
        <div style={{borderTop:`0.5px solid ${color}15`}}>
          {[
            {q:"How it shapes you",     body: angles.how},
            {q:"How it works with you", body: angles.works},
            {q:"What it reveals",       body: angles.deep},
          ].map((a, i, arr) => (
            <div key={i} style={{padding:"10px 15px",borderBottom: i < arr.length-1 ? `0.5px solid ${color}10` : "none"}}>
              <div style={{fontSize:9,fontWeight:500,letterSpacing:1,textTransform:"uppercase",color:`${color}65`,fontFamily:ff,marginBottom:4}}>{a.q}</div>
              <p style={{fontFamily:ff,fontSize:13,lineHeight:1.72,color:C.textSec,margin:0,fontStyle: i===2 ? "italic" : "normal"}}>{a.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    );
  };

  return (
    <div style={{borderRadius:16,border:`1.5px solid ${dmColor}30`,overflow:"hidden",
      background:`linear-gradient(160deg,${dmColor}07 0%,#faf7f2 100%)`}} className="fade">
      <div style={{padding:"22px 20px 26px"}}>

        {/* ── BLOCK 2: Elemental composition ───────────────────────────── */}
        <div style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:C.textTer,fontFamily:ff,marginBottom:12}}>Energy Blueprint</div>
        <div style={{marginBottom:6}}>
          {sortedEls.map(el => {
            const d = chart.elements[el];
            const count = d?.count || 0;
            const isMissing = !d?.present;
            const isDM = el === dm.element;
            const color = EL_C[el];
            return (
              <div key={el} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                <div style={{width:74,display:"flex",alignItems:"center",gap:7,flexShrink:0}}>
                  <div style={{width:24,height:24,borderRadius:6,flexShrink:0,
                    background: isMissing ? "transparent" : `${color}12`,
                    border: isMissing ? `1px dashed ${color}45` : `0.5px solid ${color}30`,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    opacity: isMissing ? 0.45 : 1}}>
                    <ElementIcon el={el} color={color} size={13}/>
                  </div>
                  <div style={{opacity: isMissing ? 0.45 : 1}}>
                    <div style={{fontSize:12,color:isMissing ? `${color}88` : color,
                      fontWeight:isDM ? 600 : 400,lineHeight:1,fontFamily:ff}}>
                      {el}{isDM && <span style={{fontSize:9,marginLeft:2}}>✦</span>}
                    </div>
                    {isMissing && <div style={{fontSize:9,color:C.fire,fontStyle:"italic",lineHeight:1.2,fontFamily:ff,marginTop:1}}>absent</div>}
                  </div>
                </div>
                <div style={{flex:1,display:"flex",gap:3,opacity: isMissing ? 0.35 : 1}}>
                  {[...Array(10)].map((_,i) => (
                    <div key={i} style={{flex:1,height:9,borderRadius:2,
                      background: isMissing ? "transparent" : i < count ? color : "#e4dfd6",
                      opacity: isMissing ? 1 : i < count ? (isDM ? 0.88 : 0.58) : 1,
                      border: isMissing ? `1px dashed ${color}55` : "none",
                    }}/>
                  ))}
                </div>
                <div style={{width:22,textAlign:"right",flexShrink:0,fontFamily:ff,
                  color: isMissing ? C.fire : color, opacity: isMissing ? 0.6 : 1}}>
                  {isMissing
                    ? <span style={{fontSize:11,color:C.fire}}>—</span>
                    : <span style={{fontSize:13,fontWeight:600}}>{count}</span>
                  }
                </div>
              </div>
            );
          })}
        </div>

        {divider}

        {/* ── DOMINANT ENERGY — band-weighted ordering ───────────────────── */}
        {(() => {
          const dominantSection = (
            <>
              <div style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:C.textTer,fontFamily:ff,marginBottom:4}}>
                {band === "open" ? "What shapes you most" : "Dominant energy"}
              </div>
              {isPure && (
                <div style={{fontSize:11,lineHeight:1.6,color:C.textTer,fontFamily:ff,marginBottom:10,fontStyle:"italic",borderLeft:`2px solid ${dmColor}35`,paddingLeft:10}}>
                  {dm.element} saturates your entire chart — this is what it means structurally for your core element to run with no counterforce.
                </div>
              )}
              {!isPure && (
                <div style={{fontSize:11,lineHeight:1.6,color:C.textTer,fontFamily:ff,marginBottom:10,fontStyle:"italic"}}>
                  {band === "open"
                    ? "The dominant force in your chart shapes the conditions under which your core nature comes through fully."
                    : "The element that runs most strongly through your chart — the lens through which everything else is filtered."}
                </div>
              )}
              {insights.dominant.map((d,i) => (
                <div key={i}>
                  <CalloutCard
                    color={EL_C[d.el]}
                    icon={d.el}
                    sectionLabel={`${d.el} · dominant energy`}
                    name={`${d.el} dominant`}
                    line={d.line}
                    guidance={d.guidance}
                    keywords={d.keywords}
                    angles={getAnglesForEl(d.el, d.tenGod)}
                    count={d.count}
                    totalCount={d.totalCount}
                    tenGod={d.tenGod}
                  />
                  <CompoundReadingCard el={d.el} tenGod={d.tenGod} color={EL_C[d.el]}/>
                </div>
              ))}
            </>
          );
          // For open charts, dominant energy leads (it explains the conditions)
          // For concentrated/balanced, it follows elemental nature (nature leads)
          return dominantSection;
        })()}

        {divider}

        {/* ── YOUR CATALYST ─────────────────────────────────────────────── */}
        <div style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:C.textTer,fontFamily:ff,marginBottom:6}}>What activates you</div>
        <div style={{fontSize:11,lineHeight:1.6,color:C.textTer,fontFamily:ff,marginBottom:12,fontStyle:"italic"}}>The energy that unlocks what's already in you — not what makes you comfortable, but what makes you fully operational.</div>
        {energies.lifts.map(({el, line}, i) => (
          <div key={i}>
            <CalloutCard
              color={EL_C[el]}
              icon={el}
              sectionLabel={`${el} · activating energy`}
              name={el}
              line={line}
              guidance={isSeeker ? `When ${el} is present — in your environment, your timing, or the people around you — something that has always been capable in you becomes directional.` : ""}
            />
            {!isSeeker && (
              <div style={{marginTop:-8,marginBottom:12,padding:"10px 14px",borderRadius:"0 0 10px 10px",background:`${EL_C[el]}06`,border:`0.5px dashed ${EL_C[el]}35`,borderTop:"none",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontFamily:ff,fontSize:12,color:C.textTer,fontStyle:"italic"}}>How to seek and use this · what changes when it's present</span>
                <button onClick={onPaywall} style={{padding:"4px 12px",borderRadius:20,border:`1px solid ${EL_C[el]}50`,background:"transparent",fontFamily:ff,fontSize:11,color:EL_C[el],cursor:"pointer",flexShrink:0,marginLeft:10}}>◆ Seeker</button>
              </div>
            )}
          </div>
        ))}

        {divider}

        {/* ── YOUR RESISTANCE ───────────────────────────────────────────── */}
        <div style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:C.textTer,fontFamily:ff,marginBottom:6}}>What creates friction</div>
        <div style={{fontSize:11,lineHeight:1.6,color:C.textTer,fontFamily:ff,marginBottom:12,fontStyle:"italic"}}>The energy that works against your natural flow — not a weakness, but worth recognising when it's in the room.</div>
        {energies.depletes.map(({el, line}, i) => (
          <div key={i}>
            <CalloutCard
              color={EL_C[el]}
              icon={el}
              sectionLabel={`${el} · friction energy`}
              name={el}
              line={line}
              guidance={isSeeker ? `Environments or periods where ${el} dominates tend to produce friction without forward movement — not always avoidable, but worth naming.` : ""}
            />
            {!isSeeker && (
              <div style={{marginTop:-8,marginBottom:12,padding:"10px 14px",borderRadius:"0 0 10px 10px",background:`${EL_C[el]}06`,border:`0.5px dashed ${EL_C[el]}35`,borderTop:"none",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontFamily:ff,fontSize:12,color:C.textTer,fontStyle:"italic"}}>How to channel this when it's in the room</span>
                <button onClick={onPaywall} style={{padding:"4px 12px",borderRadius:20,border:`1px solid ${EL_C[el]}50`,background:"transparent",fontFamily:ff,fontSize:11,color:EL_C[el],cursor:"pointer",flexShrink:0,marginLeft:10}}>◆ Seeker</button>
              </div>
            )}
          </div>
        ))}

        {/* ── ABSENT ELEMENT ────────────────────────────────────────────── */}
        {insights.missing.length > 0 && divider}
        {insights.missing.length > 0 && (
          <>
            <div style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:C.textTer,fontFamily:ff,marginBottom:6}}>What is absent</div>
            <div style={{fontSize:11,lineHeight:1.6,color:C.textTer,fontFamily:ff,marginBottom:12,fontStyle:"italic"}}>An element that never appeared in your chart — its absence has shaped you as actively as what's present.</div>
          </>
        )}
        {insights.missing.map((m, i) => (
          <CalloutCard key={i}
            color={C.fire}
            borderStyle="dashed"
            icon={m.el}
            sectionLabel={`${m.el} · not in your chart`}
            name={`${m.el} is absent`}
            line={m.line}
            guidance={m.guidance}
          />
        ))}

        {/* ── WHO YOU ARE TEASER ───────────────────────────────────────── */}
        {natureTeaser && (
          <>
            {divider}
            <div>
              <div style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:dmColor,fontFamily:ff,fontWeight:500,marginBottom:10}}>Who You Are</div>
              <p style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:16,lineHeight:1.8,color:C.text,fontStyle:"italic",margin:0}}>
                {natureTeaser}
              </p>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

// Paywall overlay — shown when free user tries to expand more than 1 section
function PaywallModal({ onClose, onUpgrade, onSelfReport }) {
  const ff = "'EB Garamond',Georgia,serif";
  const ffC = "'Cormorant Garamond',Georgia,serif";
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(29,27,24,0.6)",display:"flex",alignItems:"flex-end",zIndex:100}} onClick={onClose}>
      <div style={{background:C.bg,borderRadius:"20px 20px 0 0",padding:"28px 24px 44px",width:"100%",maxWidth:430,margin:"0 auto"}} onClick={e=>e.stopPropagation()}>
        <div style={{width:36,height:3,borderRadius:2,background:C.border,margin:"0 auto 22px"}}/>

        {/* Headline */}
        <div style={{fontFamily:ffC,fontSize:22,fontWeight:400,color:C.text,marginBottom:5}}>There's more here than what you've seen.</div>
        <p style={{fontFamily:ff,fontSize:14,lineHeight:1.8,color:C.textSec,marginBottom:20}}>
          You've seen the recognition layer. The depth — your interior, your tension, your cost, what you're actually building — is on Seeker.
        </p>

        {/* Seeker features */}
        <div style={{background:C.bgCard,borderRadius:10,padding:"14px 16px",marginBottom:12}}>
          <div style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:C.accent,fontFamily:ff,marginBottom:10}}>Seeker — $9.99/month</div>
          {[
            "Full compound archetype reading for all your dominant energies",
            "Catalyst and friction — full behavioral readings",
            "ProfileReading in full: gifts, edges, your landscape",
            "Life chapter readings, decade themes, annual context",
            "Unlimited AI questions",
          ].map((f,i) => (
            <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:i<4?9:0}}>
              <div style={{width:5,height:5,borderRadius:"50%",background:C.accentLight,flexShrink:0,marginTop:5}}/>
              <span style={{fontFamily:ff,fontSize:13.5,lineHeight:1.6,color:C.textSec}}>{f}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button onClick={onUpgrade} style={{width:"100%",padding:"14px",borderRadius:10,border:"none",background:C.accentDark,color:"#f7f3ec",fontFamily:ffC,fontSize:17,letterSpacing:0.5,cursor:"pointer",marginBottom:10}}>
          Unlock Seeker — $9.99/month
        </button>
        <div style={{textAlign:"center",fontFamily:ff,fontSize:12,color:C.textTer,fontStyle:"italic",marginBottom:16}}>7-day free trial · Cancel anytime</div>

        {/* Self-report one-time option */}
        <div style={{borderTop:`0.5px solid ${C.border}`,paddingTop:16}}>
          <div style={{fontFamily:ffC,fontSize:15,color:C.text,marginBottom:5}}>Just want one reading?</div>
          <p style={{fontFamily:ff,fontSize:13,lineHeight:1.7,color:C.textTer,marginBottom:10}}>
            Your chart as a single synthesized narrative — generated once, yours to keep as a PDF.
          </p>
          <button onClick={onSelfReport} style={{width:"100%",padding:"11px",borderRadius:10,border:`1px solid ${C.border}`,background:"transparent",fontFamily:ff,fontSize:14,color:C.textSec,cursor:"pointer"}}>
            Self-Report — $6.99 one-time
          </button>
        </div>
      </div>
    </div>
  );
}

function ReadingSection({ id, meta, data, chart, userTier, expansionCount, onExpansionUsed, onPaywall }) {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const [expanding, setExpanding] = useState(false);

  async function handleExpand() {
    if (open && body) { setOpen(false); return; }
    // Free tier gate
    if (userTier === TIERS.FREE && expansionCount >= FREE_EXPANSIONS_PER_DAY) {
      onPaywall(); return;
    }
    setOpen(true);
    if (!body) {
      setExpanding(true);
      if (userTier === TIERS.FREE) onExpansionUsed();
      try {
        const result = await expandSection(id, chart, data?.teaser||"");
        setBody(result);
      } catch { setBody("Unable to load this section. Please try again."); }
      setExpanding(false);
    }
  }

  const paras = body.split("\n\n").filter(Boolean);
  return (
    <div style={{marginBottom:26,paddingBottom:26,borderBottom:`0.5px solid ${C.borderLight}`}}>
      <div style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:11}}>
        <div style={{flexShrink:0,paddingTop:3}}>
          <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:10,color:C.accentLight,letterSpacing:2}}>{meta.num}</div>
        </div>
        <div style={{flex:1}}>
          <div style={{display:"inline-block",fontSize:9,letterSpacing:1.5,textTransform:"uppercase",color:C.accent,background:`${C.accent}12`,border:`0.5px solid ${C.accent}30`,borderRadius:20,padding:"2px 8px",marginBottom:7}}>{meta.tag}</div>
          <h2 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:21,fontWeight:400,color:C.text,lineHeight:1.2,marginBottom:3}}>{meta.title}</h2>
        </div>
        <div style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:24,color:`${C.accentLight}40`,lineHeight:1,flexShrink:0,paddingTop:6}}>{meta.zh}</div>
      </div>

      <p style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:15.5,lineHeight:1.85,color:C.textSec,fontStyle:"italic",marginBottom:open?12:0}}>
        {data?.teaser || <span style={{color:C.border,fontSize:13}}>Generating…</span>}
      </p>

      {open && (
        <div style={{borderLeft:`2px solid ${C.border}`,paddingLeft:14,marginBottom:4}} className="fade">
          {expanding ? (
            <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0"}}>
              <div className="pulse" style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:13,color:C.accentLight}}>元</div>
              <span style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:13,color:C.border,fontStyle:"italic"}}>Deepening this section…</span>
            </div>
          ) : (
            paras.map((p,i)=>(
              <p key={i} style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:15.5,lineHeight:1.85,color:C.textSec,marginBottom:i<paras.length-1?"1em":0}} dangerouslySetInnerHTML={{__html:p}}/>
            ))
          )}
        </div>
      )}

      {data?.teaser && (
        <button onClick={handleExpand} style={{marginTop:9,background:"transparent",border:"none",cursor:"pointer",padding:0,display:"flex",alignItems:"center",gap:6,fontFamily:"'EB Garamond',Georgia,serif",fontSize:12,color:C.accent,fontStyle:"italic"}}>
          <div style={{width:14,height:"0.5px",background:C.accentLight}}/>
          {open?(expanding?"Loading…":"Close"):"Continue reading"}
          <div style={{width:14,height:"0.5px",background:C.accentLight}}/>
        </button>
      )}
    </div>
  );
}

function FlowPeriod({ label, zh, text }) {
  return (
    <div style={{marginBottom:22,paddingBottom:22,borderBottom:`0.5px solid ${C.borderLight}`}}>
      <div style={{display:"flex",alignItems:"baseline",gap:12,marginBottom:9}}>
        <div style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:21,color:C.accentDark,lineHeight:1}}>{zh}</div>
        <div style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:12,color:C.textTer,fontStyle:"italic"}}>{label}</div>
      </div>
      <p style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:15.5,lineHeight:1.85,color:C.textSec}}>
        {text||<span style={{color:C.border}}>Generating…</span>}
      </p>
    </div>
  );
}

// ─── HERO POPUP OVERLAY ──────────────────────────────────────────────────────
// Renders chip knowledge panels. Positioned absolute inside the phone frame
// so it covers the screen without relying on position:fixed.
function HeroPopupOverlay({ popup, chart, onClose }) {
  const dm = chart.dayMaster;
  const color = EL_C[dm.element];
  const polarity = dm.polarity === "yang" ? "Yang" : "Yin";
  const STEM_PINYIN = {"甲":"Jiǎ","乙":"Yǐ","丙":"Bǐng","丁":"Dīng","戊":"Wù","己":"Jǐ","庚":"Gēng","辛":"Xīn","壬":"Rén","癸":"Guǐ"};

  const FIVE_ELEMENTS = [
    { el:"Wood",  zh:"木" }, { el:"Fire",  zh:"火" }, { el:"Earth", zh:"土" },
    { el:"Metal", zh:"金" }, { el:"Water", zh:"水" },
  ];
  const TEN_STEMS_ROWS = [
    { el:"Wood",  pair:["甲","乙"] }, { el:"Fire",  pair:["丙","丁"] },
    { el:"Earth", pair:["戊","己"] }, { el:"Metal", pair:["庚","辛"] },
    { el:"Water", pair:["壬","癸"] },
  ];

  const popups = {
    element: {
      title: `${dm.element} is your element`,
      body: "In BaZi and Chinese Taoist thought, the Five Elements — Wood, Fire, Earth, Metal, and Water — are five dynamic forces that describe the qualities of all energy and life. Your element is the medium your nature moves through.",
      visual: (
        <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:20,flexWrap:"wrap"}}>
          {FIVE_ELEMENTS.map(({ el, zh }) => {
            const c = EL_C[el]; const active = el === dm.element;
            return (
              <div key={el} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,
                background:active?`${c}18`:`${c}08`,border:`1px solid ${active?c:c+"30"}`,
                borderRadius:10,padding:"10px 8px",minWidth:52,
                boxShadow:active?`0 2px 10px ${c}35`:"none"}}>
                <span style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:22,color:c,lineHeight:1}}>{zh}</span>
                <span style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:10,letterSpacing:"0.08em",
                               textTransform:"uppercase",color:c,opacity:active?1:0.7}}>{el}</span>
              </div>
            );
          })}
        </div>
      ),
    },
    stem: {
      title: `${dm.stem} is your Day Master`,
      body: "Your Day Master is the Heavenly Stem of the day you were born — the single character in your BaZi chart that most directly represents your core self, your natural character, and how your life force moves through the world.",
      visual: (
        <div style={{display:"flex",flexDirection:"column",gap:7,marginTop:20}}>
          {TEN_STEMS_ROWS.map(({ el, pair }) => {
            const c = EL_C[el];
            return (
              <div key={el} style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:10,letterSpacing:"0.08em",
                               textTransform:"uppercase",color:c,opacity:0.65,width:36,flexShrink:0}}>{el}</span>
                {pair.map(s => {
                  const active = s === dm.stem;
                  return (
                    <div key={s} style={{display:"flex",alignItems:"center",justifyContent:"center",
                      width:42,height:42,borderRadius:8,flexShrink:0,
                      background:active?`${c}22`:`${c}08`,
                      border:`1px solid ${active?c:c+"28"}`,
                      boxShadow:active?`0 2px 10px ${c}40`:"none"}}>
                      <span style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:19,
                                     color:c,lineHeight:1,fontWeight:active?600:400}}>{s}</span>
                    </div>
                  );
                })}
                <span style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:11,color:`${c}80`,letterSpacing:"0.04em"}}>
                  {STEM_PINYIN[pair[0]]} · {STEM_PINYIN[pair[1]]}
                </span>
              </div>
            );
          })}
        </div>
      ),
    },
    polarity: {
      title: `Your polarity is ${polarity}`,
      body: "In Taoism, all things carry either Yin or Yang — two complementary forces that define how energy expresses and moves. Yang is active, initiating, and outward-moving. Yin is receptive, refining, and inward-moving.",
      visual: (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:20,marginTop:22}}>
          <svg width="100" height="100" viewBox="0 0 100 100">
            <path d="M50,2 A48,48 0 0,0 50,98 A24,24 0 0,1 50,50 A24,24 0 0,0 50,2 Z"
                  fill={color} opacity={polarity==="Yin"?"0.85":"0.15"}/>
            <path d="M50,2 A48,48 0 0,1 50,98 A24,24 0 0,0 50,50 A24,24 0 0,1 50,2 Z"
                  fill={color} opacity={polarity==="Yang"?"0.85":"0.15"}/>
            <circle cx="50" cy="26" r="10" fill={color} opacity={polarity==="Yang"?"0.15":"0.85"}/>
            <circle cx="50" cy="74" r="10" fill={color} opacity={polarity==="Yin"?"0.15":"0.85"}/>
            <circle cx="50" cy="50" r="48" fill="none" stroke={color} strokeWidth="1" opacity="0.3"/>
          </svg>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {["Yang","Yin"].map(p => (
              <div key={p} style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:10,height:10,borderRadius:"50%",flexShrink:0,
                              background:color,opacity:p===polarity?0.85:0.2}}/>
                <div>
                  <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:14,
                                 fontWeight:p===polarity?600:400,color,opacity:p===polarity?1:0.45}}>{p}</div>
                  <div style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:11,color:`${color}70`,lineHeight:1.4}}>
                    {p==="Yang"?"Active · Initiating":"Receptive · Refining"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  };

  const content = popups[popup];
  if (!content) return null;

  return (
    <div
      onClick={onClose}
      style={{position:"absolute",inset:0,background:"rgba(10,8,6,0.52)",
              display:"flex",alignItems:"center",justifyContent:"center",
              zIndex:200,padding:"20px"}}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{background:"#fdfaf6",borderRadius:20,padding:"28px 24px 28px",width:"100%",
                boxShadow:"0 20px 60px rgba(0,0,0,0.25)",position:"relative",
                maxHeight:"72vh",overflowY:"auto"}}
      >
        <button onClick={onClose}
          style={{position:"absolute",top:14,right:16,background:"none",border:"none",
                  cursor:"pointer",fontSize:22,lineHeight:1,color:"#bbb",padding:4}}>×</button>
        <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:22,
                     fontWeight:600,color,marginBottom:12,paddingRight:28,lineHeight:1.2}}>
          {content.title}
        </div>
        <div style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:14,lineHeight:1.75,color:C.textSec}}>
          {content.body}
        </div>
        {content.visual}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════

const DEFAULT_INPUT = { year:1995, month:4, day:29, hour:18, gender:"male", location:"Beijing" };

export default function App() {
  const [input, setInput]       = useState(DEFAULT_INPUT);
  const [chart, setChart]       = useState(null);
  const [reading, setReading]   = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [tab, setTab]           = useState("reading");
  const [showForm, setShowForm] = useState(true);
  const [userTier, setUserTier] = useState(TIERS.FREE);
  const [hasSelfReport, setHasSelfReport] = useState(false);
  const [expansionCount, setExpansionCount] = useState(0);
  const [showPaywall, setShowPaywall]       = useState(false);
  const [popup, setPopup]                   = useState(null); // "element"|"stem"|"polarity"|null
  const readingRef = useRef(null);

  async function handleGenerate() {
    if (!input.year||!input.month||!input.day||input.hour===undefined||!input.gender) {
      setError("Please fill in all fields."); return;
    }
    setLoading(true); setError(null); setShowForm(false);
    setReading(null); setChart(null); setExpansionCount(0);
    try {
      const computed = calculateBaziChart(input);
      setChart(computed);
      const generated = await generateReading(computed, userTier, (full) => {
        readingRef.current = full;
        setReading({...full});
      });
      readingRef.current = generated;
      setReading(generated);
    } catch(e) { setError(e.message); }
    setLoading(false);
  }

  async function handleRetry() {
    if (!chart) { setShowForm(true); return; }
    setLoading(true); setError(null);
    try {
      const generated = await generateReading(chart, userTier, (full)=>setReading({...full}));
      setReading(generated);
    } catch(e) { setError(e.message); }
    setLoading(false);
  }

  // Re-generate when tier changes (if chart exists)
  async function handleTierChange(newTier) {
    setUserTier(newTier);
    if (!chart) return;
    setLoading(true); setError(null); setExpansionCount(0);
    try {
      const generated = await generateReading(chart, newTier, (full)=>setReading({...full}));
      setReading(generated);
    } catch(e) { setError(e.message); }
    setLoading(false);
  }

  const curLP = chart?.luckPillars?.find(p=>p.isCurrent);
  const tierColor = { 0:C.tierFree, 1:C.tierSeeker, 2:C.tierAdvisor, 3:C.tierOracle }[userTier];

  return (
    <div style={{background:"#16100c",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",padding:"32px 0 64px"}}>
      <style>{STYLE}</style>
      {showPaywall && <PaywallModal onClose={()=>setShowPaywall(false)} onUpgrade={()=>{setShowPaywall(false);handleTierChange(TIERS.SEEKER);}} onSelfReport={()=>{setShowPaywall(false);if(userTier>=TIERS.SEEKER)setHasSelfReport(true);else{handleTierChange(TIERS.SEEKER);setHasSelfReport(true);}}}/>}

      {/* ── Dev bar (outside phone) — chart info, tier switcher, template debug ── */}
      <div style={{width:390,marginBottom:10,borderRadius:10,overflow:"hidden",border:`1px solid ${C.border}`,background:C.bgCard}}>
        {/* Chart info row */}
        <div style={{padding:"9px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`0.5px solid ${C.border}`}}>
          <div>
            <div style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:C.textTer,marginBottom:3}}>Birth Chart</div>
            <div style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:13,color:C.accentDark,letterSpacing:1}}>
              {chart ? Object.values(chart.pillars).map(p=>p.stem+p.branch).join("  ") : <span style={{color:C.textTer,fontStyle:"italic",fontFamily:"'EB Garamond',Georgia,serif",fontSize:12}}>no chart generated</span>}
            </div>
          </div>
          {chart && (
            <button onClick={()=>{setShowForm(true);setChart(null);setReading(null);setTab("reading");}}
              style={{fontSize:10,color:C.textTer,fontFamily:"'EB Garamond',Georgia,serif",fontStyle:"italic",background:"transparent",border:`0.5px solid ${C.border}`,borderRadius:20,padding:"4px 12px",cursor:"pointer",flexShrink:0}}>
              New Chart
            </button>
          )}
        </div>
        {/* Tier selector row */}
        <div style={{padding:"8px 14px",display:"flex",gap:5,alignItems:"center",borderBottom:(!loading && chart && reading && reading._templateKey)?`0.5px solid ${C.border}`:"none"}}>
          <span style={{fontSize:9,letterSpacing:1.5,textTransform:"uppercase",color:C.textTer,flexShrink:0,marginRight:2}}>Tier</span>
          {Object.entries(TIERS).filter(([,val])=>val<=TIERS.SEEKER).map(([label,val])=>(
            <button key={val} onClick={()=>handleTierChange(val)}
              style={{flex:1,padding:"5px 4px",borderRadius:6,border:userTier===val?`1.5px solid ${tierColor}`:`0.5px solid ${C.border}`,background:userTier===val?`${tierColor}18`:C.bg,cursor:"pointer",fontFamily:"'EB Garamond',Georgia,serif",fontSize:11,color:userTier===val?tierColor:C.textSec,transition:"all 0.15s"}}>
              {label}<div style={{fontSize:9,opacity:0.7,color:userTier===val?tierColor:C.textTer}}>{TIER_PRICES[val]}</div>
            </button>
          ))}
        </div>
        {/* Template debug badge */}
        {!loading && chart && reading && reading._templateKey && (
          <div style={{padding:"7px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:11,color:reading._exactMatch?"#3a7a38":"#7a5a10",fontStyle:"italic"}}>
              {reading._exactMatch ? "✓ Exact template match" : "⟳ Fallback template used"}
            </span>
            <span style={{fontFamily:"monospace",fontSize:9,color:reading._exactMatch?"#3a7a38":"#7a5a10",background:reading._exactMatch?"#edf7ed":"#fef9ec",padding:"2px 7px",borderRadius:4}}>
              {reading._templateKey}
            </span>
          </div>
        )}
      </div>

      {/* ── iPhone frame ── */}
      <div style={{
        position:"relative",width:390,height:844,background:C.bg,flexShrink:0,
        borderRadius:54,border:"9px solid #0e0a08",
        boxShadow:"0 0 0 1.5px #3a3530, 0 48px 120px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
        overflow:"hidden",
      }}>

        {/* Status bar + Dynamic Island (fixed overlay, no scroll) */}
        <div style={{position:"absolute",top:0,left:0,right:0,height:56,zIndex:15,pointerEvents:"none",
                     background:C.bg}}>
          {/* Dynamic Island pill */}
          <div style={{position:"absolute",top:10,left:"50%",transform:"translateX(-50%)",
                       width:120,height:34,background:"#0a0806",borderRadius:20}}/>
          {/* Status bar row */}
          <div style={{position:"absolute",bottom:2,left:0,right:0,display:"flex",
                       justifyContent:"space-between",alignItems:"center",padding:"0 26px 4px"}}>
            <span style={{fontFamily:"-apple-system,sans-serif",fontSize:14,fontWeight:600,
                          color:C.text,lineHeight:1,letterSpacing:"-0.02em"}}>9:41</span>
            <div style={{display:"flex",alignItems:"center",gap:5}}>
              {/* Signal bars */}
              <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
                <rect x="0"   y="5" width="3" height="6"  rx="0.6" fill={C.text} opacity="0.35"/>
                <rect x="4.5" y="3" width="3" height="8"  rx="0.6" fill={C.text} opacity="0.6"/>
                <rect x="9"   y="1" width="3" height="10" rx="0.6" fill={C.text} opacity="0.8"/>
                <rect x="13.5" y="0" width="3" height="11" rx="0.6" fill={C.text}/>
              </svg>
              {/* Wifi */}
              <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
                <path d="M7.5 8.5C8.1 8.5 8.5 9 8.5 9.5C8.5 10 8 10.5 7.5 10.5C7 10.5 6.5 10 6.5 9.5C6.5 9 6.9 8.5 7.5 8.5Z" fill={C.text}/>
                <path d="M4.5 6C5.6 4.9 6.5 4.3 7.5 4.3C8.5 4.3 9.4 4.9 10.5 6" stroke={C.text} strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.7"/>
                <path d="M2 3.5C3.8 1.7 5.5 0.8 7.5 0.8C9.5 0.8 11.2 1.7 13 3.5" stroke={C.text} strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.4"/>
              </svg>
              {/* Battery */}
              <svg width="25" height="11" viewBox="0 0 25 11" fill="none">
                <rect x="0.5" y="0.5" width="21" height="10" rx="3" stroke={C.text} strokeOpacity="0.35"/>
                <rect x="2" y="2" width="16" height="7" rx="1.5" fill={C.text} opacity="0.85"/>
                <path d="M23 3.5V7.5C23.8 7.2 24.5 6.5 24.5 5.5C24.5 4.5 23.8 3.8 23 3.5Z" fill={C.text} opacity="0.4"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Scrollable app content — starts below status bar, above bottom nav */}
        <div style={{position:"absolute",top:56,left:0,right:0,bottom:60,
                     overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch"}}>

      {/* Form */}
      {showForm && (
        <div style={{padding:"24px 20px 40px"}} className="fade">
          <div style={{textAlign:"center",marginBottom:26}}>
            <div style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:42,color:C.accentDark,lineHeight:1,marginBottom:7,opacity:0.8}}>元素</div>
            <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:17,color:C.text,marginBottom:6}}>Enter your birth details</div>
            <div style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:12,fontStyle:"italic",color:C.textTer}}>Currently testing as: <strong style={{color:tierColor}}>{TIER_LABELS[userTier]} tier</strong></div>
          </div>
          {[
            {key:"year",  label:"Birth Year",     type:"number", placeholder:"e.g. 1995", min:1900,max:2025},
            {key:"month", label:"Birth Month",    type:"number", placeholder:"1–12",      min:1,   max:12  },
            {key:"day",   label:"Birth Day",      type:"number", placeholder:"1–31",      min:1,   max:31  },
            {key:"hour",  label:"Birth Hour (24h)",type:"number",placeholder:"0–23",      min:0,   max:23  },
          ].map(f=>(
            <div key={f.key} style={{marginBottom:14}}>
              <div style={{fontSize:10,letterSpacing:1.5,textTransform:"uppercase",color:C.accent,marginBottom:5}}>{f.label}</div>
              <input type={f.type} value={input[f.key]} min={f.min} max={f.max} placeholder={f.placeholder}
                onChange={e=>setInput(p=>({...p,[f.key]:parseInt(e.target.value)||0}))}
                style={{width:"100%",padding:"11px 14px",borderRadius:8,border:`1px solid ${C.border}`,background:C.bgCard,fontFamily:"'EB Garamond',Georgia,serif",fontSize:16,color:C.text,outline:"none"}}/>
            </div>
          ))}
          <div style={{marginBottom:14}}>
            <div style={{fontSize:10,letterSpacing:1.5,textTransform:"uppercase",color:C.accent,marginBottom:5}}>Gender</div>
            <div style={{display:"flex",gap:8}}>
              {["male","female"].map(g=>(
                <button key={g} onClick={()=>setInput(p=>({...p,gender:g}))} style={{flex:1,padding:"11px",borderRadius:8,border:input.gender===g?`1.5px solid ${C.accentLight}`:`1px solid ${C.border}`,background:input.gender===g?"#f5edd8":C.bgCard,fontFamily:"'EB Garamond',Georgia,serif",fontSize:15,color:input.gender===g?C.accentDark:C.textSec,cursor:"pointer",textTransform:"capitalize"}}>{g}</button>
              ))}
            </div>
          </div>
          <div style={{marginBottom:24}}>
            <div style={{fontSize:10,letterSpacing:1.5,textTransform:"uppercase",color:C.accent,marginBottom:5}}>Birth Location</div>
            <input value={input.location} onChange={e=>setInput(p=>({...p,location:e.target.value}))} placeholder="e.g. Beijing, New York, London"
              style={{width:"100%",padding:"11px 14px",borderRadius:8,border:`1px solid ${C.border}`,background:C.bgCard,fontFamily:"'EB Garamond',Georgia,serif",fontSize:16,color:C.text,outline:"none"}}/>
          </div>
          {error && <div style={{color:C.fire,fontSize:13,marginBottom:14,fontFamily:"'EB Garamond',Georgia,serif"}}>{error}</div>}
          <button onClick={handleGenerate} style={{width:"100%",padding:"14px",borderRadius:10,border:"none",background:C.accentDark,color:"#f7f3ec",fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:17,letterSpacing:0.5,cursor:"pointer"}}>
            Generate Reading
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{padding:"60px 20px",textAlign:"center"}} className="fade">
          <div style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:38,color:C.accentDark,marginBottom:14,lineHeight:1}}>
            {chart ? chart.pillars.day.stem : "元"}
          </div>
          <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:17,color:C.text,marginBottom:6}}>
            {chart ? (userTier===TIERS.FREE ? "Looking up your reading…" : "Generating your reading…") : "Computing your chart…"}
          </div>
          <div style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:12,fontStyle:"italic",color:C.textTer,marginBottom:22}}>
            {userTier===TIERS.FREE ? "Template lookup — instant" : "Live LLM generation — ~4–6s"}
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:8}}>
            {["金","木","水","火","土"].map((zh,i)=>(
              <div key={zh} className="pulse" style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:14,color:["#8ba3b8","#7a9e6e","#5a7fa8","#c4745a","#b89a6a"][i],animationDelay:`${i*0.25}s`}}>{zh}</div>
            ))}
          </div>
        </div>
      )}

      {/* Reading UI */}
      {!loading && chart && reading && !showForm && (
        <>
          {/* Error / retry bar */}
          {error && (
            <div style={{padding:"9px 20px",background:"#fdf8f2",borderBottom:`0.5px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:12,color:C.accent,fontStyle:"italic"}}>{error}</span>
              <button onClick={handleRetry} style={{fontSize:11,color:C.accentDark,background:"transparent",border:`0.5px solid ${C.accentLight}`,borderRadius:12,padding:"3px 10px",cursor:"pointer",fontFamily:"'EB Garamond',Georgia,serif"}}>Retry</button>
            </div>
          )}

          {/* Reading tab */}
          {tab==="reading" && (
            <div className="fade">
              {/* ① Day Master Hero — full screen identity card */}
              <DayMasterHero chart={chart} onOpenPopup={t => setPopup(t)}/>

              {/* ② Your Elemental Nature */}
              <div style={{padding:"0 20px 80px"}}>
                <YourNature chart={chart}/>
              </div>
            </div>
          )}

          {/* Chapter tab */}
          {tab==="decades" && (
            <div style={{padding:"20px 20px 80px"}} className="fade">
              <div style={{textAlign:"center",marginBottom:20}}>
                <div style={{fontSize:8,letterSpacing:2,color:C.textTer,textTransform:"uppercase",marginBottom:10}}>Your Life Chapter · 大运</div>
                <p style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:13,fontStyle:"italic",lineHeight:1.8,color:C.textTer}}>Every decade has its own climate. This is the one you are living in now.</p>
              </div>
              {curLP && (()=>{
                const curData = reading.decades?.[0];
                const paras = (curData?.reading||"").split("\n\n").filter(Boolean);
                return (
                  <div>
                    <div style={{padding:"16px",borderRadius:12,border:`1.5px solid ${C.accentLight}`,background:"#f5edd8",marginBottom:18}}>
                      <div style={{fontSize:8,letterSpacing:2,color:C.accentDark,textTransform:"uppercase",marginBottom:8}}>Current Chapter</div>
                      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:6}}>
                        <div>
                          <div style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:30,color:C.accentDark,lineHeight:1,marginBottom:3}}>{curLP.stem}{curLP.branch}</div>
                          <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:16,color:C.text}}>{curData?.theme||"—"}</div>
                        </div>
                        <div style={{textAlign:"right",flexShrink:0,paddingTop:3}}>
                          <div style={{fontSize:11,color:C.textTer,fontFamily:"'EB Garamond',Georgia,serif",fontStyle:"italic"}}>{curLP.startAge}–{curLP.endAge}</div>
                          <div style={{fontSize:11,color:C.textTer,fontFamily:"'EB Garamond',Georgia,serif",fontStyle:"italic",marginBottom:6}}>{curLP.startYear}–{curLP.endYear}</div>
                          <div style={{fontSize:8,letterSpacing:1.5,textTransform:"uppercase",color:"#fff",background:C.accentDark,borderRadius:20,padding:"2px 8px",display:"inline-block"}}>Now</div>
                        </div>
                      </div>
                    </div>
                    {curData?.teaser && (
                      <p style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:15.5,lineHeight:1.85,color:C.textSec,fontStyle:"italic",marginBottom:paras.length>0?14:0}}>
                        {curData.teaser}
                      </p>
                    )}
                    {paras.length > 0 && (
                      <div style={{borderLeft:`2px solid ${C.accentLight}`,paddingLeft:14,marginBottom:18}}>
                        {paras.map((p,i)=>(<p key={i} style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:15.5,lineHeight:1.85,color:C.textSec,marginBottom:i<paras.length-1?"1em":0}}>{p}</p>))}
                      </div>
                    )}
                    {userTier===TIERS.FREE && !paras.length && (
                      <div style={{padding:"14px 16px",borderRadius:10,background:C.bgCard,border:`0.5px solid ${C.border}`,textAlign:"center"}}>
                        <p style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:13,color:C.textTer,fontStyle:"italic",marginBottom:10}}>The full decade reading is available on Seeker tier.</p>
                        <button onClick={()=>setShowPaywall(true)} style={{padding:"8px 20px",borderRadius:8,border:`1px solid ${C.accentLight}`,background:"transparent",fontFamily:"'EB Garamond',Georgia,serif",fontSize:13,color:C.accentDark,cursor:"pointer"}}>Unlock on Seeker — $9.99/mo</button>
                      </div>
                    )}
                    {/* Pillar timeline strip */}
                    <div style={{marginTop:8,padding:"12px 14px",borderRadius:10,background:C.bgCard,border:`0.5px solid ${C.border}`}}>
                      <div style={{fontSize:8,letterSpacing:2,color:C.textTer,textTransform:"uppercase",marginBottom:8}}>Life Arc · Nine Chapters</div>
                      <div style={{display:"flex",gap:3}}>
                        {chart.luckPillars.map((lp,i)=>(
                          <div key={i} style={{flex:1,textAlign:"center"}}>
                            <div style={{height:4,borderRadius:2,background:lp.isCurrent?C.accentDark:lp.isPast?C.border:EL_C[lp.element],opacity:lp.isPast?0.3:1,marginBottom:3}}/>
                            <div style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:8,color:lp.isCurrent?C.accentDark:lp.isPast?C.textTer:C.textSec}}>{lp.stem}{lp.branch}</div>
                            <div style={{fontSize:7,color:C.textTer}}>{lp.startAge}s</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Today tab */}
          {tab==="today" && (
            <div style={{padding:"20px 20px 80px"}} className="fade">
              <div style={{fontSize:8,letterSpacing:2,color:C.textTer,textTransform:"uppercase",textAlign:"center",marginBottom:18}}>Current Periods · 流年流月流日</div>
              <FlowPeriod label={new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})} zh={`${chart.currentFlowDay.stem}${chart.currentFlowDay.branch}日`} text={reading?.today}/>
              <FlowPeriod label={new Date().toLocaleDateString("en-US",{month:"long",year:"numeric"})} zh={`${chart.currentFlowMonth.stem}${chart.currentFlowMonth.branch}月`} text={reading?.thisMonth}/>
              <FlowPeriod label={String(new Date().getFullYear())} zh={`${chart.currentFlowYear.stem}${chart.currentFlowYear.branch}年`} text={reading?.thisYear}/>
              {curLP && (
                <div style={{padding:"14px",borderRadius:10,background:C.bgCard,border:`0.5px solid ${C.border}`}}>
                  <div style={{fontSize:8,letterSpacing:2,color:C.textTer,textTransform:"uppercase",marginBottom:10}}>Three Layers Active Now</div>
                  {[
                    {layer:"Your Chart", detail:`${chart.dayMaster.element} dominant${chart.missingElements.length>0?`, ${chart.missingElements.join("+")} absent`:""}`, color:EL_C[chart.dayMaster.element]},
                    {layer:`Decade (${curLP.stem}${curLP.branch})`, detail:reading.decades?.[0]?.theme||"—", color:EL_C[curLP.element]},
                    {layer:`Year (${chart.currentFlowYear.stem}${chart.currentFlowYear.branch})`, detail:`${chart.currentFlowYear.stemElement}+${chart.currentFlowYear.branchElement}`, color:EL_C[chart.currentFlowYear.stemElement]},
                  ].map((l,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"flex-start",gap:9,marginBottom:i<2?9:0}}>
                      <div style={{width:6,height:6,borderRadius:"50%",background:l.color,flexShrink:0,marginTop:5}}/>
                      <div><span style={{fontSize:12,color:C.text,fontStyle:"italic"}}>{l.layer}</span><span style={{fontSize:12,color:C.textTer}}> — {l.detail}</span></div>
                    </div>
                  ))}
                  <div style={{marginTop:12,paddingTop:11,borderTop:`0.5px solid ${C.border}`}}>
                    <p style={{fontFamily:"'EB Garamond',Georgia,serif",fontSize:12,fontStyle:"italic",color:C.textSec,lineHeight:1.7,margin:0}}>When the same element appears across all three layers, the effect concentrates. The chart, the decade, and the year are speaking the same language right now.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

        </div>{/* end scrollable content */}

        {/* Bottom navigation bar — fixed inside phone frame */}
        {chart && reading && !showForm && !loading && (
          <div style={{position:"absolute",bottom:0,left:0,right:0,height:60,zIndex:12,
                       background:C.bg,borderTop:`0.5px solid ${C.border}`,display:"flex"}}>
            {[{id:"reading",label:"Reading",zh:"命"},{id:"decades",label:"Chapter",zh:"运"},{id:"today",label:"Today",zh:"今"}].map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"8px 6px 4px",background:"transparent",border:"none",cursor:"pointer",borderTop:tab===t.id?`1.5px solid ${C.accentDark}`:"1.5px solid transparent",transition:"all 0.2s"}}>
                <div style={{fontFamily:"'Noto Serif SC',Georgia,serif",fontSize:15,color:tab===t.id?C.accentDark:C.textTer,lineHeight:1,marginBottom:2}}>{t.zh}</div>
                <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:10,letterSpacing:1.5,textTransform:"uppercase",color:tab===t.id?C.accentDark:C.textTer}}>{t.label}</div>
              </button>
            ))}
          </div>
        )}

        {/* Popup overlay — absolute inside phone frame, covers screen */}
        {popup && chart && (
          <HeroPopupOverlay popup={popup} chart={chart} onClose={() => setPopup(null)}/>
        )}

        {/* Home indicator — sits inside bottom nav bar */}
        <div style={{position:"absolute",bottom:6,left:"50%",transform:"translateX(-50%)",
                     width:100,height:4,background:C.text,opacity:0.15,borderRadius:3,
                     pointerEvents:"none",zIndex:13}}/>

      </div>
    </div>
  );
}
