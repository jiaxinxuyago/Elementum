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
 * See REA_03 §4 for the complete field reference and tier assignments.
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
//               See REA_03 §9 for the full authoring rules.
//               This variant schema is specific to blocks[] ONLY — all other
//               fields in STEM_CARD_DATA and all TG_CARD_DATA fields are flat.
// ═══════════════════════════════════════════════════════════════════════════

// SOURCE: Free + Pro tier · Stem energy and manual fields
export const STEM_CARD_DATA = {

  "甲": {

    // ═══════════════════════════════════════════════════════════════════
    // IDENTITY CARD  (DayMasterHero — Deliverable 1, ALL FREE)
    // ═══════════════════════════════════════════════════════════════════

    identity: {
      archetypeName:  `The Oak`,
      archetypeLabel: `Yang Wood — The Oak`,
      identityIcon:   `ArchetypeSeal`,   // placeholder — dedicated SVG TBD
      manifesto:      `Motion before readiness · The oak does not negotiate its direction.`,

      // elementIntro — Layer 0 of Elemental Nature page. World-building, third-person (no "you").
      elementIntro: {
        punch:  `The Oak is the first upward break of Yang Wood through frozen ground.`,
        expand: `Forceful and unhurried by doubt, it carries the restless certainty of something already growing toward a light it cannot yet name.`,
      },
      // manifesto renders as two lines, split on the ` · ` separator:
      //   Line 1 (bold thesis)  → "Motion before readiness"
      //   Line 2 (poetic edge)  → "The oak does not negotiate its direction."
      //
      // Badge tile data (resolved from chart at runtime, listed here for reference):
      //   Element badge  → dm.element  = "Wood"           → taps open element popup
      //   Stem badge     → dm.stem     = "甲"  + "Jiǎ"   → taps open Day Master popup
      //   Polarity badge → dm.polarity = "yang" → "Yang"   → taps open Yin/Yang popup
    },

    subtitle: `Forward motion as structure, not ambition · The Growth Impulse (Yang)`,
    chips: ["Visionary", "Initiating", "Growth-driven", "Integrity-bound", "Consolidation-resistant"],
    yourNature: {
      phrase: `The Vanguard General`,  // [INTERNAL — not rendered in UI]
      desc: `You're always the first to see where something could go — and you start moving toward it before anyone else has decided whether to begin. You build things that outlast you, but you're usually already thinking about the next thing before the current one is done.`,  // [FREE · Your Nature block — Archetype Variants: varies by STEM_Band_tgPattern]
    },

    // GIFTS & SHADOWS — phrase [FREE] · desc [FREE · one sharp 2nd-person sentence, distinct angle]
    gifts: [
      { phrase: `The First Mover`,   desc: `You start before the room has finished deciding whether to begin, and your motion becomes the permission everyone else was waiting for.` },
      { phrase: `The Forward Pull`,  desc: `People around you end up thinking bigger than they did before, usually without noticing that your reach is what raised the ceiling.` },
      { phrase: `The Built to Last`, desc: `What you make tends to still be standing years later, because you genuinely cannot put your full force behind something disposable.` },
    ],
    shadows: [
      { phrase: `The Outrun Roots`,        desc: `You commit to things deeply and then outgrow them before they've been properly established, leaving real work for someone else to finish.` },
      { phrase: `The Unnamed Destination`, desc: `You're often moving at full force without knowing what you're building toward — only that staying still is unbearable.` },
      { phrase: `The Perpetual Catch-Up`,  desc: `The people who care about you can feel a step behind, because the reaching never slows down enough to let them arrive.` },
    ],
    blocks: [
      {
        label: `How you experience the world`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: {
          default: `You don't decide to grow toward things. You just grow, the way a tree grows toward light — not because you chose the direction but because that's what you do. The next stage of anything is always visible to you before the current one has settled, so you're mentally already somewhere else while the room is still deciding whether to begin. This isn't impatience exactly. It's more like living slightly ahead of the present moment at all times.`,
          concentrated: `When the growth energy is this saturated, your living-ahead becomes a constant overrun. You're not one stage ahead — you're three, reaching toward several futures at once before any has been chosen. Beginnings multiply faster than the present can absorb them; the next thing and the thing after it are both already pulling at you. This isn't ambition turned up. It's the structural restlessness of a force that grows whether or not there's anywhere left to grow — and rarely gives you the stillness it would take to consolidate what you've already started.`,
          open: `The reaching is present, but it doesn't lead. You still see where things could go, but the upward push that normally turns your vision into motion arrives muted — a quieter pull rather than a non-negotiable one. Beginning something can feel like it needs a permission that isn't coming. The vision stays intact; what's harder to reach is the structural certainty that now is the time to move. The world arrives to you as possibility more than as imperative.`,
          tested: `The world pushes back, and your growth takes its shape from the resistance. When authority energy weighs on you, your reaching no longer extends freely in every direction — it meets a structure that says "this way, not all ways," and you grow along it. How you experience the world becomes inseparable from the constraint operating on it: your direction is being defined by something external at the same moment you're choosing it. If the constraint is legitimate, your reach concentrates into something that holds; if it isn't, you feel the growth pressing against a wall you can't yet name.`,
          pure: `With no dominant force shaping how the growth gets spent, your reaching runs as its essential self — not channeled toward a particular kind of building, not grounded by a heavy resource pull, not bent through a relational or authority register. What arrives is forward motion without a predetermined target. The world is a field of things that could be started, and the question of which one deserves your full force is genuinely more open for you than for configurations where a dominant force has already chosen. This is the unconstrained form: free to find the direction that actually warrants you.`,
          rooted: `Resource energy backing the Wood means your growth doesn't reach alone — it reaches from a base. The vision forms more slowly here and commits harder once it does: the support that generates stability also generates patience, so you can hold a direction without bolting toward it. The world arrives as something to grow into deliberately rather than rush at. The friction mirrors the gift — the same grounding that makes your commitments durable can make it harder to move on what isn't yet proven.`,
          flowing: `Output energy gives your growth somewhere to go. The reaching no longer just extends — it produces, turning your forward drive into things that get made and expressed rather than merely begun. You experience the world as raw material for what you're building, and the restlessness that might otherwise scatter finds a channel: the vision moves outward into form. At its best this is you at your most generative — growth that doesn't just stretch toward light but bears something.`,
        },
      },
      {
        label: `What you're genuinely good at`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: {
          default: `Seeing what something could become before anyone else does. Starting things — not because someone asked you to, but because the gap between what exists and what could exist is physically uncomfortable for you to leave alone. Once you start something, you generate a kind of forward pull that brings other people along without anyone deliberately organizing it. People around you tend to end up thinking bigger than they did before, often without knowing why.`,
          concentrated: `Generating momentum — almost too much of it. With the initiating force this saturated, you start things constantly, and the forward pull you create is strong enough to move other people. Nothing stays dormant near you. The structural catch is that the same abundance that makes you start everything makes finishing any one thing harder: the momentum keeps spawning the next beginning before the last has been consolidated. At full strength you're extraordinary at ignition and genuinely strained at completion.`,
          open: `The capability is real but harder to reach for. You still see what something could become — that perception doesn't dim — but converting it into the act of starting takes more from you than it does for a stronger configuration. The gift lives slightly out of reach: the vision is there, the forward pull is quieter, and initiating often waits on a push from outside. What you're good at is genuine; it just needs more favorable conditions, or someone else's invitation, to express at full force.`,
          tested: `Building under constraint — making your reach hold by letting something shape it. When your growth meets real resistance, what you're good at shifts from pure initiation toward directed construction: the vision narrows to one thing and gets built against the pressure rather than scattered across many. The classical principle is exactly this — raw wood becomes useful timber only when something cuts and defines it. Under a legitimate constraint, your reaching consolidates into structure that lasts.`,
          pure: `Pure initiation — the gift in its least mediated form. With no dominant force directing the output, what you're good at is the recognizing-and-starting itself: seeing the possibility and moving on it before the case has been made. You're at your best where the value is in the ignition rather than the management — where someone needs to believe a thing is possible and move first. The direction is yours to choose, which is both the freedom and the work.`,
          rooted: `Starting things that actually hold, because the base is there to root them. With resource energy backing you, your initiating gift comes with staying power — you don't just begin, you begin things you can sustain. What you're good at is the rare combination of vision and endurance: seeing what could be and having the ground to grow it slowly into something real. The trade is speed; you're built for the long build, less for the quick pivot.`,
          flowing: `Turning vision into output. With expression energy in play, your gift isn't only seeing what could be — it's producing it: the forward drive lands as work that gets made, shipped, shown. You're good at the whole arc from possibility to artifact, where more purely initiating configurations would stall at the starting line. The reach finds its product; the growth bears fruit.`,
        },
      },
      {
        label: `Where you consistently get stuck`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The reaching outruns the roots. You commit to something genuinely and deeply — and then outgrow it before it's fully established. There's a recurring pattern: you build something real, then move before it's been properly consolidated, leaving it in a state that needs someone else to finish. The next stage is always visible to you before the current one has actually been tested. This isn't fickleness — the investment was real. The problem is structural: your nature moves faster than the foundations can follow.

There's also a specific interpersonal cost: people who care about you often feel like they're perpetually catching up. You don't mean to move that fast. You just can't stop.` },
      },
      {
        label: `What changes when conditions are right`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The classical principle: raw wood becomes useful timber only when something shapes and defines it — converting the reaching into something specific. You don't need someone to give you direction. What you need is a force that says "this, not everything." When that arrives through the right challenge or pressure, your reach consolidates into something that holds. The growth doesn't stop. It just finally has a form.` },
      },
      {
        label: `What you rarely admit`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `That you often don't know what you're building toward — only that you're building. The momentum is real. The destination is often genuinely unclear even to you, which is part of why the reaching can go in so many directions before finding the thing that's actually worth the full force.` },
      },
    ],
    manual: {
      concentrated: `New ideas launch before old ones land. Commitments pile up faster than they can be honored. The chart or period is saturated with initiating energy — ambitious, restless, and difficult to anchor. The classical principle warns of "growth without harvest": energy expanding without converting into completed form. Restlessness is constant. Stillness feels impossible. The specific trap: more beginnings accumulate than can ever be finished, and the backlog slowly becomes its own weight.`,  // [FREE · Elemental Nature card]
      open: `Initiative is genuinely harder to find. The environment or person waits for external permission before moving. Starting things feels risky rather than natural. Leadership and forward visibility feel inaccessible — not from lack of capability but from lack of the upward-push energy that makes initiating feel worth the cost. Projects that need a champion stall at the beginning. Ambition may exist internally but stays unexpressed.`,  // [FREE · Elemental Nature card]
      catalyst: `Enter it by initiating the thing you have been circling — one specific thing, not ten. This is not a "plan more" energy; it is a "start now" energy. Commit to a direction and enter it fully before the window moves. Volunteer for the visible role, launch the project, make the first move in the relationship. The productive use is concentration of the initiating force, not dispersal. Outcome: things that had no momentum suddenly have it. Doors that required the right person to ask become accessible when you step forward as that person.`,  // [FREE · teaser  /  PRO · full analysis]
      resistance: `When 甲 energy is creating friction — growth impulse is competing with your structure rather than feeding it. Don't resist the initiating force; redirect it. Use the Metal quality (pruning, deciding, cutting options) to define which growth is worth nurturing. Stop adding beginnings — close enough open loops to make space for one thing to actually land. The corrective is not stillness but focus. Outcome: restlessness converts into directed momentum, and what was scatter becomes a clear line of forward motion.`,  // [PRO]
    },
  },

  "乙": {

    // ═══════════════════════════════════════════════════════════════════
    // IDENTITY CARD  (DayMasterHero — Deliverable 1, ALL FREE)
    // ═══════════════════════════════════════════════════════════════════

    identity: {
      archetypeName:  `The Vine`,
      archetypeLabel: `Yin Wood — The Vine`,
      identityIcon:   `ArchetypeSeal`,   // placeholder — dedicated SVG TBD
      manifesto:      `Route bends. Destination holds. · The vine finds every wall a ladder.`,

      // elementIntro — Layer 0 of Elemental Nature page. World-building, third-person (no "you").
      elementIntro: {
        punch:  `The Vine is Yin Wood — growth that bends around every obstacle.`,
        expand: `Supple and quietly relentless, it carries the intelligence of something that reaches its destination by routes no one thought to watch.`,
      },
      // manifesto renders as two lines, split on the ` · ` separator:
      //   Line 1 (bold thesis)  → "Route bends. Destination holds."
      //   Line 2 (poetic edge)  → "The vine finds every wall a ladder."
      //
      // Badge tile data (resolved from chart at runtime, listed here for reference):
      //   Element badge  → dm.element  = "Wood"           → taps open element popup
      //   Stem badge     → dm.stem     = "乙"  + "Yǐ"    → taps open Day Master popup
      //   Polarity badge → dm.polarity = "yin"  → "Yin"   → taps open Yin/Yang popup
    },

    subtitle: `Navigation as intelligence, not accommodation · The Growth Impulse (Yin)`,
    chips: ["Adaptive", "Strategically perceptive", "Resilient", "Destination-fixed", "Coiling intelligence"],
    yourNature: {
      phrase: `The Shadow Diplomat`,  // [INTERNAL — not rendered in UI]
      desc: `You always find a way through — not by pushing harder, but by reading the room and finding the opening no one else noticed. Your destination never changes; only the path you take to get there.`,  // [FREE · Your Nature block — Archetype Variants: varies by STEM_Band_tgPattern]
    },

    // GIFTS & SHADOWS — phrase [FREE] · desc [FREE · one sharp 2nd-person sentence, distinct angle]
    gifts: [
      { phrase: `The Found Route`,  desc: `You arrive exactly where you intended by means nobody predicted, going around what others wore themselves out trying to move.` },
      { phrase: `The Accurate Read`, desc: `You read what a room actually is rather than what it claims to be, and navigate by the real thing while others react to the surface.` },
      { phrase: `The Earned Trust`,  desc: `You build genuine loyalty through sustained attentiveness rather than performance, which is why it holds when performance would fail.` },
    ],
    shadows: [
      { phrase: `The Hidden Hand`,   desc: `You move so indirectly that the people you help rarely see the work, and credit you only for the outcome.` },
      { phrase: `The Withheld Ask`,  desc: `You read everyone else's needs so fluently that your own go unspoken, and the room never learns to look for them.` },
      { phrase: `The Bent Too Far`,  desc: `The flexibility that always finds a way can keep you adapting long after the honest move was to stop bending.` },
    ],
    blocks: [
      {
        label: `How you experience the world`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: {
          default: `You know where you're going before you know how to get there. You read surfaces, find the gaps, go around what can't be moved, and arrive somewhere force could never have reached. From outside this looks indirect. From inside it's extremely precise: the destination is fixed; only the path is flexible. You have a gift for reading what a situation actually is — not what it presents, not what people say it is, but the underlying reality — and navigating according to that.`,
          concentrated: `When the navigating intelligence is this saturated, every surface looks worth reading and every route worth taking. You can map a dozen ways through a room before anyone else has found the door — and that's the trap. The reading never stops, so you keep navigating without landing, adapting to terrain that didn't require it. At full strength the gift becomes motion for its own sake: precise, tireless, and not always pointed at anywhere you actually meant to arrive.`,
          open: `The reading is present, but it doesn't drive. You still sense the gaps and the openings, but the quiet confidence that turns perception into movement arrives muted — you see the route and hesitate to take it. The world asks for more directness than feels natural, and the side door you'd normally find stays just out of reach. The intelligence is intact; what's harder to access is the nerve to act on it before the way is obvious to everyone.`,
          tested: `The terrain pushes back, and your navigation takes its shape from the resistance. When authority energy presses on you, the room you're reading is also setting the rules you have to move within — you're finding the route and being routed at once. If the structure is legitimate, the constraint sharpens your path-finding into something genuinely strategic. If it isn't, you feel yourself adapting around a wall that shouldn't be there, and the flexibility starts to cost you the destination.`,
          pure: `With no dominant force shaping where the navigation points, the reading runs as its essential self — not bent toward a particular kind of gain, not anchored to a heavy base, not pressed by authority. What arrives is pure path-finding: you see the openings clearly, and the question of which one is worth taking is genuinely yours. The world is a field of routes, and for once nothing has pre-decided the destination for you. This is the unconstrained form — free to choose where the intelligence actually goes.`,
          rooted: `Resource energy backing the Wood means your navigation reaches from a base. You read more slowly here and commit to a route more firmly once you've chosen it — the support that steadies you also makes you less willing to keep endlessly re-routing. You move toward a destination deliberately rather than improvising around every obstacle. The friction mirrors the gift: the same grounding that keeps you from drifting can make you slower to find the unexpected door when the obvious one closes.`,
          flowing: `Output energy gives your navigation somewhere to land. The reading no longer just maps the terrain — it produces: the route-finding turns into things built, connections made, outcomes that actually arrive. You experience the world as a set of openings to move through into results, not merely to perceive. At your most generative this is the Vine bearing fruit — the intelligence that always found a way now has somewhere worth arriving.`,
        },
      },
      {
        label: `What you're genuinely good at`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: {
          default: `Finding the route that wasn't obvious. Arriving where you intended by means nobody predicted. Reading people and rooms with an accuracy that feels almost unfair — you pick up what's really happening before anyone has said the thing. Building genuine trust through attentiveness rather than performance. The people who know you well describe someone who always seems to end up exactly where they were heading, even when the path looked like it was going sideways.`,
          concentrated: `Reading the terrain — almost too well. With the navigating force this saturated, you see every angle, every motive, every available route at once, and that perceptiveness is genuinely formidable. The catch is that seeing all the paths can make committing to one feel like a loss; you can out-read a situation until the moment to move has passed. At full strength you're extraordinary at finding the way and strained at simply taking it.`,
          open: `The skill is real but harder to reach for. You still read people and rooms accurately — that perception doesn't dim — but converting the read into a confident move takes more from you than it should. The route is visible; the willingness to commit to it waits on better conditions or someone else's go-ahead. What you're good at is genuine; it just needs the right terrain, or an invitation, to fully engage.`,
          tested: `Navigating under constraint — finding the legitimate route through a system that's testing you. When real authority sets the terms, your gift narrows from "any path" to "the right path through this structure," and that focus makes the intelligence sharper, not smaller. You're good at working within rules without being reduced by them — finding the genuine opening the framework allows rather than the workaround that breaks it. Under a fair constraint, the path you find actually holds.`,
          pure: `Pure navigation — the gift in its least mediated form. With no dominant force directing the route, what you're good at is the reading-and-moving itself: perceiving the real shape of a situation and finding your way through it on your own terms. You're at your best where the value is in the path-finding rather than the position it serves — where someone needs the way through that no one else can see. The destination is yours to set.`,
          rooted: `Finding routes that actually hold, because there's a base beneath them. With resource energy backing you, your navigation comes with staying power — you don't just find the way through, you build durable trust and lasting position along it. What you're good at is the rare pairing of perceptiveness and steadiness: reading the terrain and committing to it long enough for the relationships to root. The trade is nimbleness; you're built for the deep alliance, less for the quick pivot.`,
          flowing: `Turning perception into outcome. With expression energy in play, your gift isn't only reading the room — it's producing through it: the route-finding lands as deals closed, introductions made, things actually built through the right people. You're good at the whole arc from insight to result, where a more purely perceptive configuration would stall at "I can see how this works." The reading bears fruit.`,
        },
      },
      {
        label: `Where you consistently get stuck`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The adaptability can become the whole point. When every surface is interesting and every route is worth exploring, you can keep navigating without actually landing anywhere. There's also a subtler risk: you adjust to surfaces so smoothly that you can slowly accommodate away from your own position without noticing — adjusting so quietly that by the time you catch it, it's hard to say exactly when it happened, or what you actually think anymore.` },
      },
      {
        label: `What changes when conditions are right`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `Your gifts fully activate when the environment is genuinely worth the full reach — a surface that deserves the climbing, a destination actually worth arriving at. In those conditions your navigation is extraordinary: precise, intelligent, landing somewhere real. In the wrong environment the gifts don't disappear — they just don't engage. This makes choosing your environments one of the highest-leverage decisions you make.` },
      },
      {
        label: `What you rarely admit`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `How much of what looks like flexibility is actually a form of self-protection — a way of staying mobile enough that no single failure can fully land on you. The adaptability is genuine intelligence. It's also, sometimes, a way of not having to find out what happens if you commit completely and it doesn't work.` },
      },
    ],
    manual: {
      concentrated: `Everything accommodates, nothing commits. The chart or period is saturated with relational intelligence — socially exhausting because the room-reading never stops. The classical trap: 柔弱 (too yielding) — the vine that never finds a surface firm enough to actually climb, and so keeps reaching in all directions simultaneously. Chronic over-adaptation gradually erodes position: you become expert at arriving where others wanted, and lose track of where you intended to go. Commitment feels like a trap because there are always other paths.`,  // [FREE · Elemental Nature card]
      open: `Relational intelligence gaps appear. The environment can only approach things directly — and direct force fails in complex political or relational terrain. Opportunities that require connection rather than competence get missed. Diplomacy becomes unavailable when it's most needed. Life becomes more transactional and confrontational, even when a side door was available and far easier. The texture of relationships turns blunt.`,  // [FREE · Elemental Nature card]
      catalyst: `Engage it through the relational field: network, collaborate, make the introduction, let others open the door. This energy rewards those who work through people rather than around them. The productive use is entering the room where the right connections already exist, not building something alone. Allow others to facilitate what direct effort would take three times as long to produce. Outcome: networks activate, referrals arrive, opportunities appear through relationship rather than visible achievement — and often move faster than any amount of direct pushing would.`,  // [FREE · teaser  /  PRO · full analysis]
      resistance: `When 乙 energy is creating friction — flexibility is working against your actual goal. You have read the room so accurately that you've accommodated yourself out of your original position. The corrective: name where you are going before you enter the adaptive mode. Know your destination clearly before you start finding routes around the obstacles. Don't add more flexibility — add a clear ending point for the navigation so it doesn't become permanent drift. Outcome: the adaptability becomes intelligent navigation rather than endless accommodation, and what was drift becomes a route.`,  // [PRO]
    },
  },

  "丙": {

    // ═══════════════════════════════════════════════════════════════════
    // IDENTITY CARD  (DayMasterHero — Deliverable 1, ALL FREE)
    // ═══════════════════════════════════════════════════════════════════

    identity: {
      archetypeName:  `The Sun`,
      archetypeLabel: `Yang Fire — The Sun`,
      identityIcon:   `ArchetypeSeal`,   // placeholder — dedicated SVG TBD
      manifesto:      `Warmth without permission · The sun does not choose who it reaches.`,

      // elementIntro — Layer 0 of Elemental Nature page. World-building, third-person (no "you").
      elementIntro: {
        punch:  `The Sun is Yang Fire — the broadcasting blaze that lights everything at once.`,
        expand: `Radiant and indiscriminate, it warms whatever it reaches, making the world around a person feel briefly more possible than before.`,
      },
      // manifesto renders as two lines, split on the ` · ` separator:
      //   Line 1 (bold thesis)  → "Warmth without permission"
      //   Line 2 (poetic edge)  → "The sun does not choose who it reaches."
      //
      // Badge tile data (resolved from chart at runtime, listed here for reference):
      //   Element badge  → dm.element  = "Fire"           → taps open element popup
      //   Stem badge     → dm.stem     = "丙"  + "Bǐng"  → taps open Day Master popup
      //   Polarity badge → dm.polarity = "yang" → "Yang"   → taps open Yin/Yang popup
    },

    subtitle: `Warmth as structural property, not personality trait · The Visibility Impulse (Yang)`,
    chips: ["Radiant", "Generative", "Involuntarily warm", "Invisibly depleting", "Trust-creating"],
    yourNature: {
      phrase: `The Court Herald`,  // [INTERNAL — not rendered in UI]
      desc: `You walk into a room and people feel more at ease, more energized, more capable — without you trying to make that happen. The cost is that you give it constantly and almost never get asked if you're okay.`,  // [FREE · Your Nature block — Archetype Variants: varies by STEM_Band_tgPattern]
    },

    // GIFTS & SHADOWS — phrase [FREE] · desc [FREE · one sharp 2nd-person sentence, distinct angle]
    gifts: [
      { phrase: `The Instant Trust`,    desc: `People relax and feel more capable in your presence before you've done anything to earn it, simply because warmth is your default.` },
      { phrase: `The Real on Hard Days`, desc: `Your warmth is believed precisely because it was still there on the difficult days, when a performed version would have flickered.` },
      { phrase: `The Raised Ceiling`,    desc: `Ideas get bigger and people braver around you, the way a surface warms under sunlight that never chose that particular spot.` },
    ],
    shadows: [
      { phrase: `The Invisible Tank`,        desc: `You give warmth so effortlessly that the depletion accumulates unnoticed, and you don't register how low you are until you're very low.` },
      { phrase: `The Assumed Inexhaustible`, desc: `Everyone treats your warmth as infinite, so the moment it dims they read it as a problem rather than a cost you were always paying.` },
      { phrase: `The Unasked Question`,      desc: `You make sure everyone in the room is okay and almost never get asked the same question in return.` },
    ],
    blocks: [
      {
        label: `How you experience the world`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: {
          default: `You don't decide to warm things. You warm them because that's what you are. People orient toward you in a room without deciding to — they just find themselves doing it. Things feel more possible near you. Ideas get bigger. Other people feel more capable of things they weren't sure they could do. This isn't something you engineer; it's a property of your presence, the way sunlight warms a surface without the sun choosing that particular spot.`,
          concentrated: `When the radiance is this saturated, you're "on" whether or not you chose to be — warmth pouring out in every direction at a level that fills any room you enter. People are drawn in, energized, lifted; the effect is undeniable. The structural cost is that broadcast warmth burns the same fuel as focused warmth and produces a fraction of the return, so the depletion runs underneath, invisible, while everyone assumes the light is endless. At full strength you are unmistakable and quietly running down.`,
          open: `The warmth is real but harder to emit. You still feel it — the wish to lift the room, the natural generosity — but the radiance that normally carries it outward arrives muted, and you can feel present without the room quite catching the light. Visibility takes effort that should be effortless. The warmth is intact; what's harder to access is the broadcast — the part that used to reach people without your trying.`,
          tested: `The room warms you back — and measures you while you warm it. When authority energy presses on the Sun, your radiance meets a standard running in parallel: you're lighting the space and being assessed inside it at once. If the standard is legitimate, it gives your warmth somewhere real to land and a reason to be more than pleasant. If it isn't, you feel the light pressing against a scrutiny that won't be warmed, and the giving starts to cost more than it returns.`,
          pure: `With no dominant force directing where the warmth goes, your radiance runs as its essential self — not spent to win, not anchored to a base, not pressed into a role. What arrives is light without a predetermined target: you warm because warming is what you are, and where it lands is genuinely open. The world is a field of things that could be lit, and for once nothing has pre-decided which. This is the unconstrained Sun — free to find what actually deserves the full light.`,
          rooted: `Resource energy backing the Fire means your warmth burns from a reserve rather than off the surface. The light steadies here — less flare, more sustained glow — and it commits: you warm specific things deeply and over time rather than flooding every room equally. The friction mirrors the gift: the same groundedness that keeps you from burning out can make you slower to shine where it isn't yet earned, holding the light back until the ground feels solid.`,
          flowing: `Output energy gives your warmth somewhere to go. The radiance no longer just fills a room — it produces: the warmth turns into things made, people moved to actually do the thing, work that carries your light into the world. You experience your presence as generative rather than merely pleasant. At your most expressive this is the Sun at its best — not more heat, but heat that finally has somewhere real to land.`,
        },
      },
      {
        label: `What you're genuinely good at`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: {
          default: `Creating trust quickly, authentically, and without trying. Moving people not through logic or performance but through what they actually believe — which means it works in rooms where performance would fail completely. Making people feel genuinely seen, not just acknowledged. Sustaining warmth over time in a way that builds rather than fluctuates — the people who receive it know it's real because it was still there on the difficult days too.`,
          concentrated: `Lifting an entire room at once — almost too much of it. With the warming force this saturated, you make people feel capable, seen, and energized without trying, and the effect ripples wider than you realize. The catch is that the warmth goes everywhere equally, which means it costs the same as focused warmth and lands with less weight per person — and you're rarely the one who gets asked how you're holding up. At full strength you're extraordinary at energizing others and quietly under-tended yourself.`,
          open: `The gift is real but harder to reach for. You can still create trust and make people feel seen — that capacity doesn't vanish — but emitting it takes more from you than it does when the fire is strong. The warmth lives slightly behind glass: present, genuine, not quite reaching. What you're good at is real; it just needs better conditions, or a context that gives something back, to shine at full strength.`,
          tested: `Warming under scrutiny — making people believe in something real while a standard watches. When legitimate authority sets the terms, your gift narrows from "warm everyone" to "warm what's worth warming, in a way that holds up," and that focus makes the trust you create sturdier, not smaller. You're good at being genuine inside a structure that tests genuineness — the warmth that survives examination is worth more than the warmth that only charms.`,
          pure: `Pure warmth — the gift in its least mediated form. With no dominant force directing the light, what you're good at is simply the warming itself: making people feel capable and seen because that's what your presence does, not because it's aimed at an outcome. You're at your best where the value is in the warmth itself rather than what it buys — where a room needs someone to make the possible feel possible. Where the light goes is yours to choose.`,
          rooted: `Warmth that holds because there's a reserve behind it. With resource energy backing you, your gift comes with endurance — you don't just warm a room once, you sustain it through the difficult days, which is exactly why people trust it. What you're good at is the rare pairing of radiance and reliability: the warmth is real and it's still there tomorrow. The trade is reach; you warm fewer people, but you warm them all the way down.`,
          flowing: `Turning warmth into momentum. With expression energy in play, your gift isn't only making people feel capable — it's moving them to actually act: the warmth lands as projects started, courage found, things built because someone believed in them out loud. You're good at the whole arc from belief to action, where a purely radiant configuration would stop at "everyone feels good." The light bears fruit.`,
        },
      },
      {
        label: `Where you consistently get stuck`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The warmth goes everywhere at once, which means it costs the same as focused warmth but produces a fraction of the impact. The giving feels effortless — which is exactly why the depletion accumulates invisibly. You don't notice the tank getting low until it's very low. Others assume you're inexhaustible. The assumption is wrong but hard to correct — the moment the warmth dims, people register it as a problem with the relationship rather than a cost that was always being paid.` },
      },
      {
        label: `What changes when conditions are right`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `Directed warmth — warmth that knows where it's going — is dramatically more powerful than broadcast warmth. When you find relationships and contexts that genuinely give back, the warmth stops being diffuse and becomes specific. What was warming a whole room starts illuminating particular things fully. That's when your quality is at its most extraordinary: not more warmth, but warmth that has somewhere real to go.` },
      },
      {
        label: `What you rarely admit`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `That you sometimes don't know whether the warmth is something you're choosing or something that just runs regardless. The giving can feel less like a gift and more like a structural fact — which makes it genuinely difficult to protect, because it's hard to guard something that operates before you've decided to give it.` },
      },
    ],
    manual: {
      concentrated: `Everything is lit up — and nothing remains private. Social momentum and recognition are high. But excess 丙 is literal overexposure: work that wasn't ready gets seen, private things become public, and being "on" continuously becomes genuinely depleting. The classical warning: 火炎土燥 (fire blazes, earth scorches) — when Fire becomes excessive, the ground beneath it dries and cracks. The environment becomes brilliant but unstable, high-energy but exhausting. Reputation risk increases alongside recognition opportunity.`,  // [FREE · Elemental Nature card]
      open: `Visibility is genuinely harder to access. Quality work exists but doesn't surface. The person or environment struggles to be noticed despite having real substance. Social connections feel effortful rather than natural. The classical image: a lantern inside a jar — the flame is real but the light doesn't reach others. Career recognition requires ten times more effort than it should because the radiance that would carry the work outward is simply not present.`,  // [FREE · Elemental Nature card]
      catalyst: `Activate it by entering public or visible contexts: put the work in front of others, attend the gathering, publish the piece, take the speaking slot. This is not a "refine quietly" energy — it produces momentum specifically through being seen. Don't wait until everything is perfect. Enter the spotlight when it's available. Outcome: recognition accelerates when conditions align. Career momentum that felt stuck suddenly moves because visibility has been restored and the quality that was invisible is now landing.`,  // [FREE · teaser  /  PRO · full analysis]
      resistance: `When 丙 energy is creating friction — warmth and visibility are running ahead of what the chart can sustain. The exposure is broader than the structure behind it can support. Channel it by directing exposure strategically rather than broadcasting broadly. Use the Water quality (depth, selectivity, substance) to give form to what's being shown — choose specific audiences, specific contexts, specific moments. Outcome: overexposure converts into targeted presence, and what felt like scatter becomes a signal that actually lands.`,  // [PRO]
    },
  },

  "丁": {

    // ═══════════════════════════════════════════════════════════════════
    // IDENTITY CARD  (DayMasterHero — Deliverable 1, ALL FREE)
    // ═══════════════════════════════════════════════════════════════════

    identity: {
      archetypeName:  `The Candle`,
      archetypeLabel: `Yin Fire — The Candle`,
      identityIcon:   `ArchetypeSeal`,   // placeholder — dedicated SVG TBD
      manifesto:      `Intimacy over range · A candle doesn't reach far — it reaches true.`,

      // elementIntro — Layer 0 of Elemental Nature page. World-building, third-person (no "you").
      elementIntro: {
        punch:  `The Candle is Yin Fire — the single flame that illuminates one thing completely.`,
        expand: `Precise and intimate, it gives whatever it attends the rare experience of being fully seen, and leaves all else in shadow.`,
      },
      // manifesto renders as two lines, split on the ` · ` separator:
      //   Line 1 (bold thesis)  → "Intimacy over range"
      //   Line 2 (poetic edge)  → "A candle doesn't reach far — it reaches true."
      //
      // Badge tile data (resolved from chart at runtime, listed here for reference):
      //   Element badge  → dm.element  = "Fire"           → taps open element popup
      //   Stem badge     → dm.stem     = "丁"  + "Dīng"  → taps open Day Master popup
      //   Polarity badge → dm.polarity = "yin"  → "Yin"   → taps open Yin/Yang popup
    },

    subtitle: `Complete illumination of exactly what it's pointed at · The Visibility Impulse (Yin)`,
    chips: ["Precise", "Intimate", "Selectively warm", "Detail-sensitive", "Flickering under depletion"],
    yourNature: {
      phrase: `The Imperial Examiner`,  // [INTERNAL — not rendered in UI]
      desc: `When your attention is fully on someone, they feel completely seen — understood at a level they rarely experience. But you can only truly light up one thing at a time, and everything else goes dark.`,  // [FREE · Your Nature block — Archetype Variants: varies by STEM_Band_tgPattern]
    },

    // GIFTS & SHADOWS — phrase [FREE] · desc [FREE · one sharp 2nd-person sentence, distinct angle]
    gifts: [
      { phrase: `The Total Attention`,    desc: `When your focus lands fully on someone, they feel understood at a depth they rarely encounter anywhere else.` },
      { phrase: `The Caught Detail`,      desc: `You notice the one thing everyone else walked past — the flaw, the tell, the small truth that turns out to matter most.` },
      { phrase: `The Remembered Quality`, desc: `The precision of your attention is something people return to, because being truly seen by you is not easy to find elsewhere.` },
    ],
    shadows: [
      { phrase: `The Flame Too Strong`,     desc: `The full force of your focus can arrive harder than the moment asked for, scorching what only needed gentle warmth.` },
      { phrase: `The Dark Around the Light`, desc: `Whatever falls outside your current focus receives almost nothing, and the people in that dark feel the absence sharply.` },
      { phrase: `The One at a Time`,         desc: `You can truly light only one thing at once, so the rest waits in the dark until your attention turns to it.` },
    ],
    blocks: [
      {
        label: `How you experience the world`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: {
          default: `You illuminate what you're pointed at completely — and nothing else. When your attention is on someone, they're genuinely seen in a way most people never experience. The attention is total. The light is complete. And whatever you're not currently pointing at receives almost nothing. This isn't the Sun's warmth, which fills a whole room. It's something more precise and more intimate: specificity is the whole point.`,
          concentrated: `When the focusing fire is this saturated, the beam narrows and intensifies — whatever you land on is lit to the floor, examined completely, held in a light most people never get. The depth is extraordinary. The structural cost is that the brighter the focus, the darker the surround: more of the world falls outside the beam than ever, and the things you aren't pointed at can go untended for a long time. At full strength you see one thing with total clarity and lose track of the rest.`,
          open: `The focusing light is real but harder to bring to bear. You can still attend completely — that capacity doesn't vanish — but kindling the beam takes more than it should, and your attention can stay diffuse when it wants to be precise. The depth is there in potential; what's harder to reach is the act of fully pointing it. The flame flickers where it would normally hold steady.`,
          tested: `What you illuminate looks back, and your focus takes its shape from the scrutiny. When authority energy presses on the Candle, the thing you're examining is also examining you — your precise attention runs while a standard runs on you in parallel. If the standard is legitimate, it sharpens the focus and gives it something real to resolve. If it isn't, the beam tightens defensively, and the intimacy that's your gift turns into a kind of guarded scanning.`,
          pure: `With no dominant force directing where the light points, your focus runs as its essential self — not aimed to win, not anchored to a base, not pressed by a role. What arrives is pure attention: you illuminate completely, and what deserves the beam is genuinely yours to choose. The world is a field of things that could be seen all the way down, and for once nothing has pre-selected which. This is the unconstrained flame — free to find what actually warrants being fully seen.`,
          rooted: `Resource energy backing the Fire means your focus burns from a reserve. The beam steadies here — less flicker, longer hold — and it commits: you attend to a few things deeply and durably rather than darting between subjects. The friction mirrors the gift: the same steadiness that lets you hold a focus for a long time can make you slow to turn the light onto something new even when it's needed elsewhere.`,
          flowing: `Output energy gives your focus somewhere to go. The light no longer just examines — it produces: the precise attention becomes craft, work of unusual fineness, the thing made exactly right because you could see exactly what it needed. You experience attention as generative rather than merely perceptive. At your most expressive this is the Candle at its best — the beam that sees the flaw now also makes the thing flawless.`,
        },
      },
      {
        label: `What you're genuinely good at`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: {
          default: `Noticing the thing that others walked past. Producing work of real quality in whatever you're fully invested in. Making people feel understood in a way that's specific to them — seen as who they actually are rather than how they've presented themselves. Your perception is unusually accurate, especially about things that are just slightly off. The quality of your attention is something people remember specifically and tend to return to.`,
          concentrated: `Seeing all the way into one thing — almost too far. With the focusing force this saturated, your perception goes deep enough to catch what no one else registers: the flaw, the tell, the thing that's slightly off. It's a formidable gift. The catch is that total focus on one subject leaves everything outside it dark, and you can pour the full beam into something that only needed a glance while a dozen other things wait unlit. At full strength you're extraordinary at depth and strained at breadth.`,
          open: `The gift is real but harder to bring to bear. You still notice what others miss and still do fine work in what you love — but mustering the full quality of attention takes more from you than it does when the fire is strong. The precision lives slightly out of reach: you can tell the depth is available without quite being able to point it. What you're good at is genuine; it just needs the right subject, or better conditions, to fully ignite.`,
          tested: `Precision under scrutiny — doing exacting work while a standard watches. When legitimate authority sets the terms, your gift sharpens from "notice everything" to "resolve the thing that actually matters here," and the constraint gives the precision a target worthy of it. You're good at fine, careful work that holds up under examination — the kind where being slightly off is caught and corrected rather than shipped. The test refines the flame.`,
          pure: `Pure attention — the gift in its least mediated form. With no dominant force directing the beam, what you're good at is the seeing itself: attending so completely to a person or a problem that its real shape comes into focus. You're at your best where the value is in the depth of perception rather than the use it's put to — where someone needs to be genuinely seen, or something needs to be genuinely understood. What you illuminate is yours to choose.`,
          rooted: `Attention that holds, because there's a reserve behind it. With resource energy backing you, your focus comes with endurance — you don't just see deeply once, you stay with a subject or a person long enough for the understanding to become real. What you're good at is the rare pairing of precision and constancy: the close attention that doesn't move on when it gets difficult. The trade is range; you go deep with a few, not wide across many.`,
          flowing: `Turning precision into craft. With expression energy in play, your gift isn't only noticing what's off — it's making things right: the exacting eye becomes exacting hands, work whose quality is felt the moment someone encounters it. You're good at the whole arc from seeing the flaw to producing the thing without it, where a purely perceptive configuration would stop at the critique. The attention bears fruit.`,
        },
      },
      {
        label: `Where you consistently get stuck`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The full force of your attention can arrive harder than the moment required. Contexts that needed gentle warmth receive the full flame. What falls outside your current focus receives almost nothing — people who aren't being fully attended to can feel the absence sharply and take it personally, even when it has nothing to do with them.

There's also an investment asymmetry that accumulates: you give the full quality of your attention without always checking whether it's being matched. The care is real. The return is often lower than what was given. And because the giving felt like connection rather than cost, the imbalance often goes unnamed for a long time.` },
      },
      {
        label: `What changes when conditions are right`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `You work best when the autonomy to direct the light is genuinely your own — when what you choose to focus on is genuinely worth the full illumination. In those conditions the precision is extraordinary: the depth of understanding, the quality of care, the accuracy of perception. The practice is learning that choosing selectively isn't a failure to be more like the Sun — it's the mechanism by which your particular kind of light actually works.` },
      },
      {
        label: `What you rarely admit`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `That when the full flame arrives at full force in a context that wasn't ready for it, you often don't understand why it didn't land the way it should have. The quality was real. The care was genuine. What you don't always account for is that not every moment wants to be fully illuminated.` },
      },
    ],
    manual: {
      concentrated: `The examining quality becomes exhaustive. Every detail gets scrutinized, every relationship gets held to a standard of depth it may not be designed for, every piece of work gets refined past the point of value. The classical problem: excess 丁 burns away what it examines — the candle that runs out of its own fuel. Anxiety emerges from examining everything and finding it insufficient. The environment becomes demanding and intense rather than illuminating. The precision becomes punishing rather than refining.`,  // [FREE · Elemental Nature card]
      open: `Things stay at surface level. Work is produced but not polished. Relationships remain pleasant but never reach real depth. The "notice what others miss" quality is not accessible. There may be energy — perhaps broad warmth from 丙 — but no concentrated, directional light. The specific deficit: work gets started and finished, but the layer beneath the surface — where the genuine quality lives — remains undeveloped.`,  // [FREE · Elemental Nature card]
      catalyst: `Activate it by going deeper into one thing rather than broader across many. Study the subject fully, not partially. Have the one-on-one conversation that a group setting would prevent. Revise the work one more time past where it felt done. Develop the skill to the level where it actually distinguishes you rather than merely qualifying you. Outcome: depth produces results that breadth never could. What is made in this focused state carries a quality that persists across time and resists erosion by competition.`,  // [FREE · teaser  /  PRO · full analysis]
      resistance: `When 丁 energy is creating friction — precision is examining rather than building. The scrutiny is consuming the energy that should go into output. The corrective: set a completion point before you begin — decide in advance what "done" looks like, so the refining faculty has a finish line. Once that point is reached, move the examining quality to the next project rather than continuing to refine the current one. Outcome: precision lands constructively rather than circling endlessly, and what was paralysis becomes a sequence of genuinely completed things.`,  // [PRO]
    },
  },

  "戊": {

    // ═══════════════════════════════════════════════════════════════════
    // IDENTITY CARD  (DayMasterHero — Deliverable 1, ALL FREE)
    // ═══════════════════════════════════════════════════════════════════

    identity: {
      archetypeName:  `The Mountain`,
      archetypeLabel: `Yang Earth — The Mountain`,
      identityIcon:   `ArchetypeSeal`,   // placeholder — dedicated SVG TBD
      manifesto:      `Immovable by design · Others find their bearings and never name why.`,

      // elementIntro — Layer 0 of Elemental Nature page. World-building, third-person (no "you").
      elementIntro: {
        punch:  `The Mountain is Yang Earth — the settled, load-bearing ground that does not move.`,
        expand: `Solid and orienting, it is the reference point others find their position by, holding far more than it ever lets show.`,
      },
      // manifesto renders as two lines, split on the ` · ` separator:
      //   Line 1 (bold thesis)  → "Immovable by design"
      //   Line 2 (poetic edge)  → "Others find their bearings and never name why."
      //
      // Badge tile data (resolved from chart at runtime, listed here for reference):
      //   Element badge  → dm.element  = "Earth"          → taps open element popup
      //   Stem badge     → dm.stem     = "戊"  + "Wù"    → taps open Day Master popup
      //   Polarity badge → dm.polarity = "yang" → "Yang"   → taps open Yin/Yang popup
    },

    subtitle: `The ground others orient by without naming · The Stability Impulse (Yang)`,
    chips: ["Grounding", "Load-bearing", "Change-resistant", "Silently accumulating", "Orientation-providing"],
    yourNature: {
      phrase: `The Mountain Warden`,  // [INTERNAL — not rendered in UI]
      desc: `You're the person everyone builds their plans around — steady, reliable, there when things shake. The part no one sees is how much you're actually holding, because you never let it show.`,  // [FREE · Your Nature block — Archetype Variants: varies by STEM_Band_tgPattern]
    },

    // GIFTS & SHADOWS — phrase [FREE] · desc [FREE · one sharp 2nd-person sentence, distinct angle]
    gifts: [
      { phrase: `The Ground Others Stand On`, desc: `People plan their lives around your steadiness, often deciding what to do based on what you think before they've even asked.` },
      { phrase: `The Unshown Cost`,           desc: `You carry weight, stress, and uncertainty without letting it show in a way that would make anyone else feel responsible for it.` },
      { phrase: `The Still There`,            desc: `When the dramatic options have run out, you're the one still present, and what you build genuinely could not be made any other way.` },
    ],
    shadows: [
      { phrase: `The Held Too Long`,      desc: `The stability everyone relies on makes letting go feel like betrayal, so you hold things in place past the point that called for release.` },
      { phrase: `The Silent Accumulation`, desc: `You absorb a great deal without naming it, and the weight no one sees builds precisely because you never showed it.` },
      { phrase: `The Forgotten Need`,      desc: `You've been reliably there for everyone so long that the question of what you need has quietly stopped being asked — including by you.` },
    ],
    blocks: [
      {
        label: `How you experience the world`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: {
          default: `You're what people orient by. You provide a kind of psychological ground — a stable reference point others use without thinking about it. Conversations land differently around you. Decisions get made based on what you think, often before anyone has formally asked. People plan their lives around your presence. The reliability isn't something you practice or maintain through effort — it's what you're made of, the way a mountain is made of stone rather than holding itself up by trying.`,
          concentrated: `When the grounding force is this saturated, the stability becomes literal heaviness. You're not just steady — you're immovable, and what should shift in you settles instead. People lean on you more than ever because nothing about you gives, and that's exactly the trap: the same density that makes you the ground everyone stands on makes it genuinely hard for you to move when moving is what's called for. At full strength you are utterly dependable and quietly stuck.`,
          open: `The grounding quality is real but harder to provide. You still want to be the steady one — the reliability is genuine — but the solidity that normally holds without effort arrives thinner, and you can feel the ground under others shifting when it should be firm. Being depended on takes effort that should be structural. The steadiness is intact; what's harder to access is the effortless permanence others used to build on.`,
          tested: `The ground itself is being tested, and your steadiness takes its shape from the pressure. When authority energy presses on the Mountain, you're holding the weight and being weighed at once — the reliability everyone leans on is also under examination. If the standard is legitimate, the pressure gives your stability a direction and turns load-bearing into genuine authority. If it isn't, you hold a position that's costing you more than it should, because holding is what you're for.`,
          pure: `With no dominant force directing what the stability serves, your steadiness runs as its essential self — not held for gain, not anchored to a particular role, not pressed by authority. What arrives is pure ground: you're solid because solid is what you are, and what's worth bearing is genuinely yours to choose. The world is a field of things that could be supported, and for once nothing has pre-decided which deserve your weight. This is the unconstrained Mountain — free to hold what actually matters.`,
          rooted: `Resource energy backing the Earth means your stability draws from a deep source. The ground steadies further here — slow, patient, almost geological — and it commits: you support specific things across very long spans rather than holding everything equally. The friction mirrors the gift: the same depth that makes you unshakeable can make you the last to move when a situation has genuinely ended and release is what it calls for.`,
          flowing: `Output energy gives your stability somewhere to go. The ground no longer just holds — it produces: the steadiness becomes the platform other things are built on, the reliable base that turns into actual output. You experience your solidity as generative rather than merely enduring. At your most expressive this is the Mountain at its best — not just bearing the weight, but growing something on the ground you've made.`,
        },
      },
      {
        label: `What you're genuinely good at`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: {
          default: `Holding what needs holding — weight, stress, uncertainty, pressure — without showing the cost in a way that makes others feel responsible for it. Building things that last because you genuinely cannot tolerate building things that won't. Following through across time, not as a discipline you impose on yourself but as a structural fact. Being the person in the room who's still there when the dramatic options have run out.`,
          concentrated: `Holding more than anyone realizes — almost too much. With the load-bearing force this saturated, your capacity to absorb weight, stress, and uncertainty is enormous, and everyone around you quietly relies on it. The catch is that the same density that lets you hold everything makes setting any of it down feel like failure, so the load only accumulates. At full strength you're extraordinary at bearing weight and strained at ever releasing it.`,
          open: `The capability is real but harder to summon. You still want to be the one who holds — the reliability is genuine — but bearing the weight takes more out of you than it does when the ground is strong, and you can feel the load nearer the surface than it should be. The steadiness is there; what's harder to reach is the effortless absorption that used to make holding feel like nothing. What you're good at is real; it just needs more support beneath it to carry the full load.`,
          tested: `Bearing weight under pressure — holding the line while something tests whether it'll hold. When legitimate authority sets the terms, your gift sharpens from "hold everything" to "hold the thing that actually matters, against real force," and the test turns endurance into demonstrated authority. You're good at being the one who doesn't break when the pressure is genuine — the steadiness that's worth more because it was proven, not assumed.`,
          pure: `Pure steadiness — the gift in its least mediated form. With no dominant force directing the support, what you're good at is the holding itself: being the ground that doesn't move, the reliability others build on, present because presence is what you are. You're at your best where the value is in the steadiness rather than what it's made to serve — where something or someone needs a base that simply won't give way. What you bear is yours to choose.`,
          rooted: `Building things that genuinely last, because the foundation goes all the way down. With resource energy backing you, your gift comes with permanence — you don't just hold, you hold across spans most people can't imagine committing to. What you're good at is the rare pairing of stability and depth: the support that's still there decades later. The trade is adaptability; you're built for the long foundation, less for the quick rebuild.`,
          flowing: `Turning steadiness into structure. With expression energy in play, your gift isn't only holding the weight — it's building on it: the reliable ground becomes the platform, the institution, the thing that stands because you made the base that could carry it. You're good at the whole arc from foundation to edifice, where a purely enduring configuration would stop at "still here." The ground bears something.`,
        },
      },
      {
        label: `Where you consistently get stuck`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The same quality that makes you load-bearing makes genuine movement difficult. When something needs to change — a relationship that's over, a position no longer tenable — you can hold it in place long past the point where the situation calls for release. Not from stubbornness. More from the fact that the stability everyone relies on makes shifting feel like a betrayal of what you're for.

There's also a slow accumulation of unspoken costs. You absorb a great deal without naming it. Over time this produces weight no one sees — because you never showed it — which means no one thought to ask whether you were okay.` },
      },
      {
        label: `What changes when conditions are right`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `When you've learned to distinguish between what needs to be held and what needs to be released, you become dramatically more powerful than the version of you that holds everything equally. The fire that activates you doesn't destabilize the stability — it gives the holding a direction. What was simply present becomes generative. What was enduring begins to produce.` },
      },
      {
        label: `What you rarely admit`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `That you need things too — specific things, from specific people — and have spent so long not needing anything visibly that you've almost stopped knowing how to name what those things are. You're so reliably there for everyone else that the question of what you need has largely stopped being asked. Which means it's also largely stopped being answered.` },
      },
    ],
    manual: {
      concentrated: `The grounding quality becomes literal heaviness. Things that should move don't. Decisions that should be made get postponed. Weight accumulates without being processed. Classical texts warn 土重则滞 (excess Earth creates stagnation) — when the Mountain grows too dense, nothing moves across it. Opportunities pass because the inertia of consolidation prevents engagement with what's new. The environment becomes utterly reliable but genuinely stuck. Stability, which was the gift, becomes the trap when it refuses to distinguish between what should be held and what should be released.`,  // [FREE · Elemental Nature card]
      open: `Foundational stability is hard to access. Things don't land or hold. Projects start but don't root — growth happens above ground, but there's no foundation for it to anchor into. Financial and physical accumulation is more difficult. The environment feels unstable or mobile in ways that are exhausting rather than exciting. Others can't build on what you offer because the surface keeps shifting before they get a chance to establish themselves on it.`,  // [FREE · Elemental Nature card]
      catalyst: `Activate it by doing the foundation work: establish the structure, formalize the arrangement, secure the position, sign the commitment. This is not a "explore and expand" energy — it is "consolidate what you have and make it permanent." The productive use is making the tentative fixed. Outcome: what was provisional becomes stable. Resources stop moving and start accumulating. What is built now stays built in a way that the previous period of movement never allowed, and the groundwork laid here supports the next several years of activity on top of it.`,  // [FREE · teaser  /  PRO · full analysis]
      resistance: `When 戊 energy is creating friction — stability is working against the movement the chart needs. The ground is too fixed to accommodate necessary change. Don't try to remove the Mountain; find the path it allows. Use Wood energy (growth impulse, directionality) to create movement within the structure rather than against it — not breaking the foundation, but finding where within it something new can grow. Outcome: resistance becomes framework, and what felt like an obstacle becomes the specific form within which something worthwhile can be built.`,  // [PRO]
    },
  },

  "己": {

    // ═══════════════════════════════════════════════════════════════════
    // IDENTITY CARD  (DayMasterHero — Deliverable 1, ALL FREE)
    // ═══════════════════════════════════════════════════════════════════

    identity: {
      archetypeName:  `The Field`,
      archetypeLabel: `Yin Earth — The Field`,
      identityIcon:   `ArchetypeSeal`,   // placeholder — dedicated SVG TBD
      manifesto:      `Nourish without credit · The soil feeds everything and claims nothing.`,

      // elementIntro — Layer 0 of Elemental Nature page. World-building, third-person (no "you").
      elementIntro: {
        punch:  `The Field is Yin Earth — soil that grows whatever it is given.`,
        expand: `Receptive and quietly generous, it creates the conditions for others to grow into themselves, and asks no credit for the growth.`,
      },
      // manifesto renders as two lines, split on the ` · ` separator:
      //   Line 1 (bold thesis)  → "Nourish without credit"
      //   Line 2 (poetic edge)  → "The soil feeds everything and claims nothing."
      //
      // Badge tile data (resolved from chart at runtime, listed here for reference):
      //   Element badge  → dm.element  = "Earth"          → taps open element popup
      //   Stem badge     → dm.stem     = "己"  + "Jǐ"    → taps open Day Master popup
      //   Polarity badge → dm.polarity = "yin"  → "Yin"   → taps open Yin/Yang popup
    },

    subtitle: `Growing things in others without announcing it · The Stability Impulse (Yin)`,
    chips: ["Nurturing", "Developmentally attuned", "Invisibly depleting", "Overcultivating", "Responsive"],
    yourNature: {
      phrase: `The Palace Gardener`,  // [INTERNAL — not rendered in UI]
      desc: `You help others grow without making a thing out of it — quietly creating the conditions for people to become better versions of themselves. The problem is you give more than you get back, and it takes longer than it should to notice.`,  // [FREE · Your Nature block — Archetype Variants: varies by STEM_Band_tgPattern]
    },

    // GIFTS & SHADOWS — phrase [FREE] · desc [FREE · one sharp 2nd-person sentence, distinct angle]
    gifts: [
      { phrase: `The Unasked Provision`, desc: `You notice what a person actually needs and provide it before they've requested it, the way soil answers a seed.` },
      { phrase: `The Quiet Development`, desc: `People become better versions of themselves around you and credit only themselves, never seeing the conditions you built.` },
      { phrase: `The Kept Word`,         desc: `Your care holds steady across time rather than appearing only when convenient, so people learn to build their lives on it.` },
    ],
    shadows: [
      { phrase: `The Uneven Exchange`, desc: `You give more than comes back and take a long time to notice, because the giving felt too natural to register as a cost.` },
      { phrase: `The Overcultivation`, desc: `You can tend a person past the point of help, supplying growth they needed to find on their own.` },
      { phrase: `The Unclaimed Ground`, desc: `You grow everything in others and rarely turn the same patient attention to what you're trying to grow in yourself.` },
    ],
    blocks: [
      {
        label: `How you experience the world`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: {
          default: `You grow things in everyone you encounter — before you decide to. You notice what people and situations need and respond before being asked, the way fertile soil responds to a seed by providing what's required for it to grow. People develop in your presence in ways they often attribute entirely to themselves — not recognizing that the conditions making the growth possible were created by someone paying close, quiet attention to what was needed.`,
          concentrated: `When the nurturing force is this saturated, you cultivate everything and everyone in reach — noticing needs, supplying conditions, tending growth in every direction at once. The generosity is enormous. The structural cost is that soil this active absorbs as readily as it feeds: you pull in everyone's difficulties along with their potential, and without drainage the fertile ground turns to mud. At full strength you grow remarkable things in others and quietly lose track of your own boundary.`,
          open: `The cultivating quality is real but harder to provide. You still notice what people need — the attunement is genuine — but the patient, sustained tending that normally flows without effort arrives thinner, and growth that should take root around you stays shallow. Caring takes effort that used to be structural. The fertility is intact; what's harder to access is the effortless provision others quietly depended on.`,
          tested: `What you're cultivating is being judged, and your nurturing takes its shape from the scrutiny. When authority energy presses on the Field, the care you give is also being measured — you're growing something while a standard asks whether it's good enough. If the standard is legitimate, it gives your cultivation a direction and turns diffuse nurturing into deliberate development. If it isn't, you over-tend defensively, supplying more than the situation needs to prove the care is real.`,
          pure: `With no dominant force directing what the cultivation serves, your nurturing runs as its essential self — not given to secure a return, not anchored to a heavy base, not pressed by authority. What arrives is pure provision: you create the conditions for growth because that's what you are, and what deserves your fertility is genuinely yours to choose. The world is a field of things that could be grown, and for once nothing has pre-decided which. This is the unconstrained Field — free to tend what actually matters.`,
          rooted: `Resource energy backing the Earth means your cultivation draws from a deep reserve. The tending steadies here — patient, sustained, almost seasonal — and it commits: you develop a few people or projects across very long spans rather than scattering care across everyone who arrives. The friction mirrors the gift: the same depth that makes your nourishment lasting can make you slow to stop tending something that has outgrown your help.`,
          flowing: `Output energy gives your cultivation somewhere to go. The tending no longer just nourishes — it produces: the care becomes things grown to completion, people developed into who they were becoming, work that visibly bears your quiet attention. You experience nurturing as generative rather than merely supportive. At your most expressive this is the Field at its best — the soil that doesn't just feed the seed but brings the whole harvest in.`,
        },
      },
      {
        label: `What you're genuinely good at`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: {
          default: `Reading what a person or situation actually needs — not what's being asked for, but the underlying requirement. Following through on care consistently across time, not just when it's convenient or visible. Building relationships that genuinely develop people rather than simply maintaining proximity. Producing a kind of trust earned specifically by consistency: when you say you'll show up, you do, and people build their lives around that accordingly.`,
          concentrated: `Reading need — almost too much of it. With the nurturing force this saturated, you sense what everyone around you requires before they've said it, and you move to supply it. The perceptiveness is real and the care is genuine. The catch is that sensing every need feels like an obligation to meet it, so you cultivate indiscriminately and deplete invisibly — growing things in people who never planted anything in you. At full strength you're extraordinary at provision and strained at withholding it.`,
          open: `The gift is real but harder to reach for. You still read what people need and still want to provide it — the attunement doesn't vanish — but the sustained follow-through takes more from you than it does when the ground is strong. The care lives slightly out of reach: you can sense the need without quite having the reserve to meet it consistently. What you're good at is genuine; it just needs replenishment beneath it to sustain the giving.`,
          tested: `Developing people under scrutiny — cultivating real growth while a standard watches. When legitimate authority sets the terms, your gift sharpens from "tend everyone" to "develop the thing that actually matters, to a real standard," and the constraint turns soft nurturing into genuine craft. You're good at growing people and work that hold up under examination — care that produces something demonstrably better, not just something that feels supported.`,
          pure: `Pure cultivation — the gift in its least mediated form. With no dominant force directing the care, what you're good at is the provision itself: reading what something needs and supplying it because that's what you do, not because it's aimed at a return. You're at your best where the value is in the growth rather than what it earns you — where a person or a project needs the conditions only patient attention provides. Who you tend is yours to choose.`,
          rooted: `Growing things that genuinely last, because the soil goes deep. With resource energy backing you, your gift comes with staying power — you don't just tend something once, you develop it across the spans real growth actually requires. What you're good at is the rare pairing of attunement and endurance: the care that's still there years into the slow work. The trade is breadth; you develop a few people deeply rather than touching many lightly.`,
          flowing: `Turning care into harvest. With expression energy in play, your gift isn't only tending growth — it's bringing it to fruit: the cultivation lands as people who became who they were meant to be, projects developed to completion, the visible result of patient attention. You're good at the whole arc from seed to harvest, where a purely nurturing configuration would stop at "I helped them grow." The care bears fruit.`,
        },
      },
      {
        label: `Where you consistently get stuck`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `You deplete invisibly. The nourishment flows outward without being tracked — and by the time the deficit becomes visible, it's been accumulating for months. The growth you create in others tends to be attributed to those others, which means you're chronically undercompensated for what you actually produce. You're also particularly susceptible to investing in contexts that absorb without returning. You're often the last to notice this, partly because caring about whether care is being returned feels, to you, like a betrayal of what genuine care should be.` },
      },
      {
        label: `What changes when conditions are right`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `In genuinely reciprocal conditions — where the care flows in both directions and you're being nourished at the same rate you nourish — what you produce is extraordinary. The growth that was quiet and consistent becomes visible and remarkable. The practice is treating your own fertility as something worth protecting rather than something to be fully spent on whoever arrives.` },
      },
      {
        label: `What you rarely admit`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `That you keep score, quietly — and that the accounting is often worse than anyone around you knows. You don't say this because saying it feels contrary to what care is supposed to be. But the gap between what's given and what returns is real, and it accumulates in you even when it isn't visible to anyone else.` },
      },
    ],
    manual: {
      concentrated: `The receptive and nurturing quality becomes absorptive without filtration. The environment or person pulls in difficulties as readily as it nourishes growth. Classical texts describe 己土混浊 (己 Earth becomes muddy) — when the fertile soil absorbs too much without drainage, it loses its cultivating quality entirely and becomes mud. Overthinking, rumination, and carrying others' emotional weight characterizes the excess state. The Field grows weeds as readily as it grows crops when there's no selectivity about what gets tended.`,  // [FREE · Elemental Nature card]
      open: `The patient-development quality is absent. Growth happens but nothing is tended. People and projects are initiated but not cultivated. The environment lacks the quiet, sustained presence that allows things to develop at their natural pace — which means the depth of development that slow nourishment produces simply never arrives. Quick results get prioritized over lasting ones, and nothing reaches the quality it could have reached with genuine care.`,  // [FREE · Elemental Nature card]
      catalyst: `Activate it by investing attention and care in what is already growing rather than starting something new. This is the energy for tending: deepening existing relationships, developing skills that have already been started, returning to projects that were begun but not fully cultivated. It specifically rewards patience — what receives genuine care and attention now develops into something of real substance over the next period. Outcome: things that were beginning deepen, relationships that were forming solidify, work that was surface-level becomes genuinely developed.`,  // [FREE · teaser  /  PRO · full analysis]
      resistance: `When 己 energy is creating friction — the absorptive quality is pulling in more than the chart can process. Obligations, relationships, and projects are accumulating faster than they can be properly nurtured. The corrective is deliberate selectivity: explicitly choose what deserves the cultivation energy and stop absorbing what doesn't. Use Metal energy (boundary, definition, cutting) to create filtration — allowing only the right material into the nurturing field. Outcome: caregiving becomes targeted and powerful rather than diffuse and depleting, and what was an endless drain converts into sustainable, productive investment.`,  // [PRO]
    },
  },

  "庚": {

    // ═══════════════════════════════════════════════════════════════════
    // IDENTITY CARD  (DayMasterHero — Deliverable 1, ALL FREE)
    // The first reading screen. Full-screen, no scroll. Rendered by the
    // DayMasterHero component in Elementum_Engine.jsx.
    // ═══════════════════════════════════════════════════════════════════

    identity: {
      archetypeName:  `The Blade`,
      archetypeLabel: `Yang Metal — The Blade`,      // full label used in pills, headers, share cards
      identityIcon:   `BladeJian`,                   // component key in Engine — 庚-specific sword SVG
      manifesto:      `Precision before intention · An edge is never given — it is forged.`,
      // manifesto renders as two lines, split on the ` · ` separator:
      //   Line 1 (bold thesis)  → "Precision before intention"
      //   Line 2 (poetic edge)  → "An edge is never given — it is forged."
      //
      // Badge tile data (resolved from chart at runtime, listed here for reference):
      //   Element badge  → dm.element  = "Metal"           → taps open element popup
      //   Stem badge     → dm.stem     = "庚"  + "Gēng"   → taps open Day Master popup
      //   Polarity badge → dm.polarity = "yang" → "Yang"   → taps open Yin/Yang popup

      // elementIntro — Layer 0 of Elemental Nature page. World-building, third-person.
      // Two sentences. punch: 9–12 words, declarative codex register, classical source grounding.
      // expand: 16–20 words, adjective-rich, describes the vibe/presence of someone carrying this energy.
      // Neither sentence uses "you". Register: game lore / fantasy codex / elemental force description.
      elementIntro: {
        punch:  `The Blade is the ancient cutting force of Metal.`,
        expand: `Sharp without announcement, cold without cruelty — it carries in a person the stillness of something that has already decided.`,
      },
    },

    // ═══════════════════════════════════════════════════════════════════
    // SECTION 1: ELEMENTAL NATURE  (user-facing label: "Elemental Nature")
    // Base Energy — DM stem identity. Free teaser + Pro full reading.
    // ═══════════════════════════════════════════════════════════════════

    subtitle: `Evaluation runs before engagement begins · The Definition Impulse (Yang)`,
    chips: ["Evaluative", "Uncompromising", "Precision-first", "Self-sufficient", "Justice-oriented"],

    // PSYCHCORE — phrase = archetype identity; desc = 2nd person portrait (2–3 sentences, displayed FREE)
    yourNature: {
      phrase: `The Imperial Executioner`,  // [INTERNAL — not rendered in UI]
      desc: `The most honest person in any room, often the most alone in it. Precision arrives before warmth does — people lean on the edge and rarely find what's behind it.`,  // [FREE · Your Nature block — Archetype Variants: varies by STEM_Band_tgPattern]
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
    // Domain content belongs in TG_CARD_DATA[tg].domains (see REA_03 §4).
    // The 11 blocks[] above already carry characterological domain content
    // implicitly. Standalone stem lifeDomains is redundant with them.
    // Retained here temporarily for reference during the migration to TG-level
    // domain content. Do not author new stem-level lifeDomains entries.

    // ═══════════════════════════════════════════════════════════════════
    // SECTION 2: THE FORCE  (user-facing label for Metal: "The Force")
    // Internal label: "Dominant Energy"
    // Characterological layer — what Metal-dominant quality brings
    // to any Ten God expression. App layer combines with TG at runtime.
    // ═══════════════════════════════════════════════════════════════════


    // ═══════════════════════════════════════════════════════════════════
    // SECTION 3: THE EDGE IN MOTION
    // Internal label: "How This Energy Moves"
    // Environmental / operational layer — catalysts, resistance,
    // seasonal calibration, liunian signatures.
    // ═══════════════════════════════════════════════════════════════════


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

    // LIUNIAN SIGNATURES  [PRO — Internal sourcing; foundation for Dynamic Energy Blueprint]
    // Structured by life domain. Each entry: what triggers it, what it produces,
    // timing guidance, and classical source for internal verification.

    // ═══════════════════════════════════════════════════════════════════
    // SECTION 4: INTERNAL REFERENCE
    // Not served to users. Synthesis pass context only.
    // ═══════════════════════════════════════════════════════════════════

  },

  "辛": {

    // ═══════════════════════════════════════════════════════════════════
    // IDENTITY CARD  (DayMasterHero — Deliverable 1, ALL FREE)
    // ═══════════════════════════════════════════════════════════════════

    identity: {
      archetypeName:  `The Jewel`,
      archetypeLabel: `Yin Metal — The Jewel`,
      identityIcon:   `ArchetypeSeal`,   // placeholder — dedicated SVG TBD
      manifesto:      `Refinement over output · The flaw is felt before the eye finds it.`,

      // elementIntro — Layer 0 of Elemental Nature page. World-building, third-person (no "you").
      elementIntro: {
        punch:  `The Jewel is Yin Metal — the refined edge that reveals true worth.`,
        expand: `Exacting and aesthetically certain, it senses quality the way others sense cold, and is never quite satisfied with what merely passes.`,
      },
      // manifesto renders as two lines, split on the ` · ` separator:
      //   Line 1 (bold thesis)  → "Refinement over output"
      //   Line 2 (poetic edge)  → "The flaw is felt before the eye finds it."
      //
      // Badge tile data (resolved from chart at runtime, listed here for reference):
      //   Element badge  → dm.element  = "Metal"          → taps open element popup
      //   Stem badge     → dm.stem     = "辛"  + "Xīn"   → taps open Day Master popup
      //   Polarity badge → dm.polarity = "yin"  → "Yin"   → taps open Yin/Yang popup
    },

    subtitle: `Quality perceived as temperature — before the question forms · The Definition Impulse (Yin)`,
    chips: ["Discerning", "Aesthetically precise", "Perfectionist", "Exacting", "Distance through refinement"],
    yourNature: {
      phrase: `The Jade Appraiser`,  // [INTERNAL — not rendered in UI]
      desc: `You sense whether something is genuinely excellent the way others sense whether a room is cold — automatically, before thinking about it. You produce work of real quality, but the same standard that makes you exceptional never quite lets you feel done.`,  // [FREE · Your Nature block — Archetype Variants: varies by STEM_Band_tgPattern]
    },

    // GIFTS & SHADOWS — phrase [FREE] · desc [FREE · one sharp 2nd-person sentence, distinct angle]
    gifts: [
      { phrase: `The Quality Sense`, desc: `You register whether something is genuinely excellent automatically, before the question forms — the way others register temperature.` },
      { phrase: `The Standard Kept`, desc: `You cannot bring yourself to release work you don't believe in, so what you do produce holds up under examination and over time.` },
      { phrase: `The Early Flaw`,     desc: `You've already seen the flaw that becomes a problem three months from now, even if you haven't said it out loud yet.` },
    ],
    shadows: [
      { phrase: `The Never Finished`,         desc: `The faculty that produces excellence keeps refining past completion, delaying what's ready and exhausting precision on what doesn't need it.` },
      { phrase: `The Standing Dissatisfaction`, desc: `The gap between what you can perceive as possible and what the world offers stays open, and in lesser conditions it turns chronic.` },
      { phrase: `The Standard Turned Inward`,   desc: `The measure you hold everything to, you hold yourself to hardest, so you're rarely quite satisfied with who you are right now.` },
    ],
    blocks: [
      {
        label: `How you experience the world`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: {
          default: `You perceive quality the way others perceive temperature — automatically, before thinking about it. Not "is this good?" as a question you ask, but an immediate, pre-verbal sense that something is or isn't genuinely excellent. This applies to work, to ideas, to environments, to people, to the way something was made. The standard is always running. It's not a habit you developed — it's a perceptual structure you were born with, as natural and involuntary as the ability to see color.`,
          concentrated: `When the discerning faculty is this saturated, the standard runs at maximum on everything at once — every object, every idea, every person measured the instant you encounter it, with no relief. The perception is exquisite. The structural cost is that nothing fully passes: the bar sits just above wherever reality has arrived, so the world presents as a near-continuous catalog of what falls short. At full strength your eye is extraordinary and your peace is rare.`,
          open: `The quality-sense is real but harder to bring to bear. You can still tell genuine excellence from the merely adequate — that perception doesn't vanish — but the fine discrimination that normally runs without effort arrives blunted, and things slip past that you'd ordinarily catch. The eye is intact; what's harder to access is the effortless precision that made the standard feel automatic. The instrument is there, just not fully calibrated.`,
          tested: `What you're judging judges back, and your discernment takes its shape from the scrutiny. When authority energy presses on the Jewel, your evaluation runs while a standard runs on you in parallel — you're appraising and being appraised at once. If the standard is legitimate, it gives your precision an external benchmark and sharpens it into genuine authority. If it isn't, the discernment turns defensive and hypercritical, guarding against a verdict rather than seeking the truth of the thing.`,
          pure: `With no dominant force directing what the discernment serves, your quality-sense runs as its essential self — not deployed to win, not anchored to a base, not pressed by a role. What arrives is pure appraisal: you perceive worth directly, and what deserves the full standard is genuinely yours to choose. The world is a field of things that could be evaluated to the floor, and for once nothing has pre-decided which. This is the unconstrained Jewel — free to refine what actually warrants it.`,
          rooted: `Resource energy backing the Metal means your discernment draws from a deep base. The eye steadies here — less restless fault-finding, more patient appraisal — and it commits: you bring the full standard to a few things and develop them properly rather than scanning everything for flaws. The friction mirrors the gift: the same depth that makes your judgment trustworthy can make you slow to release work even after it has genuinely met the bar.`,
          flowing: `Output energy gives your discernment somewhere to go. The standard no longer just evaluates — it produces: the eye that catches the flaw becomes the hand that makes the thing without it, work whose excellence is felt the instant someone encounters it. You experience discernment as generative rather than merely critical. At your most expressive this is the Jewel at its best — the judgment that doesn't just identify quality but creates it.`,
        },
      },
      {
        label: `What you're genuinely good at`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: {
          default: `Producing things of genuine distinction because you literally cannot bring yourself to output something you don't fully believe in. Identifying what's genuinely excellent when others would settle for adequate. Building things where the quality is lasting — not impressive on the surface but actually good in the way that holds up over time and under examination. You're also the one who has already noticed the flaw that will become a problem three months from now. You often don't say it immediately. But you've already seen it.`,
          concentrated: `Distinguishing excellence — almost too finely. With the discerning force this saturated, you catch gradations of quality no one else registers, and you cannot in good conscience release something that falls short of what you can see. The result is genuine distinction. The catch is that the standard keeps moving just past wherever the work arrives, so finishing becomes the hardest part: you refine past completion, polishing what's already done while a deadline passes. At full strength you produce excellence and struggle to call it finished.`,
          open: `The gift is real but harder to bring to bear. You can still tell excellent from adequate and still want to produce distinction — the standard doesn't vanish — but the precise execution it demands takes more from you than it does when the metal is strong. The quality lives slightly out of reach: you can perceive the bar without quite being able to meet it. What you're good at is genuine; it just needs better conditions, or a worthier subject, to reach full refinement.`,
          tested: `Producing to a standard while a standard watches — excellence under genuine examination. When legitimate authority sets the terms, your gift sharpens from "perfect everything" to "meet the real bar on the thing that matters," and the external benchmark gives the discernment a finish line it otherwise lacks. You're good at work that holds up under the closest scrutiny — the kind where being slightly off is caught, named, and corrected. The test is where your precision becomes authority.`,
          pure: `Pure discernment — the gift in its least mediated form. With no dominant force directing the standard, what you're good at is the appraisal itself: knowing genuine quality directly and producing only what meets it. You're at your best where the value is in the refinement rather than what it's traded for — where something needs to be made genuinely, lastingly right. What you bring the full standard to is yours to choose.`,
          rooted: `Building things whose quality genuinely lasts, because the standard rests on a deep base. With resource energy backing you, your gift comes with endurance — you don't just refine once, you develop work to a fineness that survives years and examination. What you're good at is the rare pairing of discernment and patience: the quality that was built to hold, not to impress. The trade is speed; you're built for the lasting thing, less for the quick turnaround.`,
          flowing: `Turning discernment into made things. With expression energy in play, your gift isn't only identifying excellence — it's producing it: the critical eye becomes craft, the flaw you'd have flagged in someone else's work simply never appears in yours. You're good at the whole arc from perceiving quality to embodying it, where a purely evaluative configuration would stop at the verdict. The standard bears fruit.`,
        },
      },
      {
        label: `Where you consistently get stuck`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The refining doesn't know when to stop. The same faculty that produces your excellent work keeps working past the point of completion — improving things that are done, delaying delivery of things that are ready, exhausting the precision on what doesn't need it. There's also a persistent gap between what you can perceive as possible and what the world tends to offer, creating a background friction that doesn't switch off. In environments that can't meet the standard, this becomes chronic dissatisfaction.` },
      },
      {
        label: `What changes when conditions are right`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `Your quality is most fully expressed in settings that can actually receive what you produce. In conditions that genuinely warrant the discernment, what you produce is something most other approaches simply cannot generate. The practice is protecting access to those conditions rather than applying the full standard uniformly to everything.` },
      },
      {
        label: `What you rarely admit`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `That the standard you apply to everything, you apply to yourself — and that this is often the hardest part. The gap between what you can perceive as possible in yourself and what you currently are is always visible to you. Which means you're almost never quite satisfied with who you are right now, regardless of what you've achieved.` },
      },
    ],
    manual: {
      concentrated: `The evaluative standard is applied to everything simultaneously with no relief. The environment produces either remarkable quality or paralysis — the discernment that should enable excellence instead prevents completion. Relationships and situations that don't meet the implicit standard become genuinely difficult to engage with. Classical texts note that excess 辛 Metal produces rigidity of aesthetic judgment — the jeweler so committed to perfection that no gem ever leaves the workshop. Self-criticism intensifies. The standard keeps moving just past wherever the work has arrived.`,  // [FREE · Elemental Nature card]
      open: `Discernment and quality-sensing are reduced. Things are produced without adequate evaluation. Work looks fine on the surface but doesn't hold up over time or under close examination. The environment loses its ability to distinguish what is genuinely excellent from what merely appears excellent. Recognition of real quality becomes unreliable — people accept substitutes they would have rejected had the discernment been present to notice the difference.`,  // [FREE · Elemental Nature card]
      catalyst: `Activate it by intentionally raising the standard of what you produce and what you accept. This is the period for genuine refinement: the revision that makes the work actually excellent rather than merely presentable, the relationship investment that makes the connection actually deep rather than merely consistent, the decision that reflects what you actually value rather than what is most convenient. Outcome: what is produced in this period carries lasting quality and remains recognizable as excellent well past the moment it was created. Recognition arrives for the refinement specifically.`,  // [FREE · teaser  /  PRO · full analysis]
      resistance: `When 辛 energy is creating friction — the discernment is running at a level that prevents output. The evaluating quality is being used to disqualify rather than develop. The corrective: set the completion criterion before beginning, not during. Decide in advance what "excellent enough to release" looks like, so the discernment has a defined finish line rather than an open-ended mandate to keep refining. Use Water energy (flow, depth, forward movement) to give the precision somewhere to go beyond itself. Outcome: evaluation produces completion rather than endless refinement, and the standard becomes generative rather than paralyzing.`,  // [PRO]
    },
  },

  "壬": {

    // ═══════════════════════════════════════════════════════════════════
    // IDENTITY CARD  (DayMasterHero — Deliverable 1, ALL FREE)
    // ═══════════════════════════════════════════════════════════════════

    identity: {
      archetypeName:  `The Ocean`,
      archetypeLabel: `Yang Water — The Ocean`,
      identityIcon:   `ArchetypeSeal`,   // placeholder — dedicated SVG TBD
      manifesto:      `Depth before disclosure · Oceans don't announce their depth.`,

      // elementIntro — Layer 0 of Elemental Nature page. World-building, third-person (no "you").
      elementIntro: {
        punch:  `The Ocean is Yang Water — vast deep that holds more than it shows.`,
        expand: `Expansive and unannounced, it processes at a depth most rooms cannot follow, moving currents of intelligence beneath an unremarkable surface.`,
      },
      // manifesto renders as two lines, split on the ` · ` separator:
      //   Line 1 (bold thesis)  → "Depth before disclosure"
      //   Line 2 (poetic edge)  → "Oceans don't announce their depth."
      //
      // Badge tile data (resolved from chart at runtime, listed here for reference):
      //   Element badge  → dm.element  = "Water"          → taps open element popup
      //   Stem badge     → dm.stem     = "壬"  + "Rén"   → taps open Day Master popup
      //   Polarity badge → dm.polarity = "yang" → "Yang"   → taps open Yin/Yang popup
    },

    subtitle: `More beneath the surface than is ever shown · The Intelligence Impulse (Yang)`,
    chips: ["Expansive", "Systemic", "Depth-witholding", "Untranslatable", "Ambition without edges"],
    yourNature: {
      phrase: `The River Cartographer`,  // [INTERNAL — not rendered in UI]
      desc: `You process things at a depth most people in the room aren't reaching, and you carry more beneath the surface than you ever show. The hard part is the gap between how deep you actually think and what you can get the room to understand.`,  // [FREE · Your Nature block — Archetype Variants: varies by STEM_Band_tgPattern]
    },

    // GIFTS & SHADOWS — phrase [FREE] · desc [FREE · one sharp 2nd-person sentence, distinct angle]
    gifts: [
      { phrase: `The Deeper Process`,   desc: `You hold more variables and implications at once than a situation seems to warrant, and others sense it as intelligence before they can name it.` },
      { phrase: `The Structural Depth`, desc: `Your depth was there before anything was added to it — not accumulated through study but the shape of how you're made.` },
      { phrase: `The Wide System`,       desc: `You see how the whole thing connects while others are still examining the parts, and you move by the map rather than the moment.` },
    ],
    shadows: [
      { phrase: `The Translation Gap`, desc: `The distance between how deep you actually think and what you can get a room to understand is the friction you live inside.` },
      { phrase: `The Withheld Depth`,  desc: `You disclose so little of what's beneath the surface that even people close to you work from a fraction of you.` },
      { phrase: `The Edgeless Reach`,  desc: `Your ambition has no natural limit, so without banks to define it the current can flood every direction at once and arrive nowhere.` },
    ],
    blocks: [
      {
        label: `How you experience the world`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: {
          default: `You hold more beneath the surface than you show. In any exchange, you're processing at a depth most people in the conversation can't quite follow — holding more variables, more layers, more implications at once than the situation might seem to warrant. Others sense this as intelligence before they can name what they're sensing. The depth is structural, not accumulated through study or experience. It was there before anything else was added to it.`,
          concentrated: `When the depth-force is this saturated, the processing runs at full flood — every exchange opening into more variables, more layers, more implications than anyone around you is tracking. The intelligence is vast. The structural cost is that water this high without banks disperses: the thinking ranges so widely it stops landing anywhere usable, and the gap between what you perceive and what you can convey grows until the depth becomes isolating. At full strength you see everything and can ground almost none of it.`,
          open: `The depth is real but harder to reach into. You still process beneath the surface — that capacity doesn't vanish — but the current that normally carries you down arrives weaker, and you find yourself working with less of the picture than you know is available. The systemic view narrows toward the local and immediate. The depth is there; what's harder to access is the full reach of it, the part that used to perceive the whole system at once.`,
          tested: `The deep is being sounded, and your processing takes its shape from the pressure. When authority energy presses on the Ocean, your depth runs while a standard runs on you in parallel — you're perceiving the whole system and being measured inside it at once. If the standard is legitimate, it gives the ranging intelligence banks and a target, and the depth becomes genuinely directed. If it isn't, you withdraw further into the deep rather than translate, and the distance between you and the surface widens.`,
          pure: `With no dominant force directing what the depth serves, your processing runs as its essential self — not aimed at a particular gain, not anchored to a base, not pressed by a role. What arrives is pure perception: you understand how things actually work at the level they actually operate, and what deserves the full depth is genuinely yours to choose. The world is an ocean of systems that could be understood completely, and for once nothing has pre-decided which. This is the unconstrained form — free to sound what actually warrants it.`,
          rooted: `Resource energy backing the Water means your depth flows from a deep source rather than ranging loose. The current steadies here — less flood, more channel — and it commits: you take a few systems all the way down and stay with them rather than touching everything once. The friction mirrors the gift: the same groundedness that gives your depth banks can make you slower to move into genuinely new water, preferring the channels you've already sounded.`,
          flowing: `Output energy gives your depth somewhere to go. The processing no longer just perceives — it produces: the systemic understanding becomes things made, models built, the deep insight finally translated into a form the surface can use. You experience your depth as generative rather than merely vast. At your most expressive this is the Ocean at its best — the current that doesn't just hold the whole system but carries something real to shore.`,
        },
      },
      {
        label: `What you're genuinely good at`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: {
          default: `Understanding how things actually work at the level where they actually operate — not the surface dynamics everyone can see but the real dynamics beneath them. Producing insights that emerge from holding many things at once rather than following a single logical thread, reaching conclusions by routes you can't always fully explain. Going further into complex or difficult territory than most people are willing to go, and returning with something genuinely useful.`,
          concentrated: `Going deep — almost past the point of return. With the depth-force this saturated, you can take a problem or a system further down than anyone around you, holding a staggering number of variables at once. The reach is formidable. The catch is that the deeper you go, the harder it is to bring anything back: insights form at a level the surface can't receive, and you can spend the whole dive in water no one else can follow. At full strength you're extraordinary at depth and strained at translation.`,
          open: `The gift is real but harder to reach into. You still understand things at the level they actually work — that perception doesn't vanish — but mustering the full depth takes more from you than it does when the current is strong. The systemic view lives slightly out of reach: you can tell the depth is available without quite descending all the way. What you're good at is genuine; it just needs better conditions, or a worthy problem, to reach full draw.`,
          tested: `Sounding the depths under pressure — bringing real understanding to bear while a standard watches. When legitimate authority sets the terms, your gift sharpens from "perceive everything" to "resolve the deep thing that actually matters here," and the constraint gives the ranging intelligence a target and a shore. You're good at going further than others will into genuinely hard territory and returning with something that holds up — depth that was tested, not just claimed.`,
          pure: `Pure depth — the gift in its least mediated form. With no dominant force directing the perception, what you're good at is the understanding itself: descending to the level where things really operate and grasping how they actually work. You're at your best where the value is in the depth rather than what it's put to — where a problem needs someone willing to go all the way down. What you sound is yours to choose.`,
          rooted: `Understanding that genuinely lasts, because the depth runs from a deep source. With resource energy backing you, your gift comes with staying power — you don't just perceive a system once, you live with it until the understanding becomes durable and complete. What you're good at is the rare pairing of depth and constancy: the comprehension that's still true years later. The trade is range; you sound a few systems completely rather than skimming many.`,
          flowing: `Turning depth into something usable. With expression energy in play, your gift isn't only understanding how things work — it's producing from that understanding: the systemic insight becomes models, writing, work that carries the deep view to people who couldn't reach it themselves. You're good at the whole arc from perception to product, where a purely contemplative configuration would stop at "I understand this." The depth bears fruit.`,
        },
      },
      {
        label: `Where you consistently get stuck`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The depth needs banks or it disperses. Without a specific channel — a specific form, a specific person who can engage at the level where you're actually operating — the intelligence ranges widely without landing anywhere productive. The translation problem is real: bringing what you perceive at depth into forms people at the surface can receive is a constant, effortful process that never quite finishes.

Most exchanges happen at a shallower level than where you operate. This produces a persistent sense of being encountered at the surface — of having depth no one is quite reaching. The response is often to withdraw further rather than simplify, which deepens the problem without resolving it.` },
      },
      {
        label: `What changes when conditions are right`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `In conditions of genuine exchange — where someone meets you at the level you're operating and gives something back at that level — you produce things you cannot produce alone. The depth that was ranging without form finds a channel. The intelligence that was present but not landing becomes genuinely useful. These conditions are rare, which is why you learn to recognize them quickly and protect them once found.` },
      },
      {
        label: `What you rarely admit`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `How often you're lonely in this specific way: surrounded by capable, intelligent people and still operating in a depth no one in the room is quite reaching. Not because the people are insufficient. Because the depth is structural — it was always going to be this particular width and this particular distance down, regardless of who was in the room.` },
      },
    ],
    manual: {
      concentrated: `Everything flows at once — career mobility, intellectual expansion, ambition, opportunity. High energy. But excess 壬 without structure disperses: the intelligence ranges without landing, the ambition floods available structure, the movement goes in too many directions simultaneously. Classical texts warn 壬水泛滥 (Yang Water flooding) — when the Ocean overflows its banks, it doesn't irrigate the field; it destroys the crop. The environment becomes intellectually stimulating but practically unproductive. Too many currents pull in too many directions and nothing actually advances.`,  // [FREE · Elemental Nature card]
      open: `Systemic intelligence and movement are reduced. Career positions that should be mobile become fixed. Intellectual curiosity narrows. The depth of understanding that comes from holding many frameworks simultaneously — the quality of perceiving the whole system at once — is less accessible. Decisions get made with less information than is available because the capacity to perceive depth is not fully engaged. Life becomes more local, more predictable, and more limited in range than the chart's actual capacity warrants.`,  // [FREE · Elemental Nature card]
      catalyst: `Activate it by entering movement: change the environment, take the trip, begin the intellectual pursuit that has been deferred, apply for the position that requires relocation or expansion. This energy rewards those who enter the current rather than waiting on the bank. Don't try to control the direction — learn to read where the flow is going and position yourself there. Outcome: career mobility arrives naturally when you stop resisting movement. Opportunities flow from directions that stationary positioning would never have reached, often arriving faster than effort-based strategies would have produced.`,  // [FREE · teaser  /  PRO · full analysis]
      resistance: `When 壬 energy is creating friction — flow is running against the chart's structure rather than through it. Too much movement has dispersed what needed to concentrate. The corrective is to introduce Earth energy (consolidation, containment, banks) — not to stop the Water but to give it shape. Identify specifically where the intelligence and energy should land, and build enough structure to allow accumulation rather than flooding. Outcome: movement becomes purposeful flow rather than dispersal, and what was scatter becomes a current going somewhere specific.`,  // [PRO]
    },
  },

  "癸": {

    // ═══════════════════════════════════════════════════════════════════
    // IDENTITY CARD  (DayMasterHero — Deliverable 1, ALL FREE)
    // ═══════════════════════════════════════════════════════════════════

    identity: {
      archetypeName:  `The Rain`,
      archetypeLabel: `Yin Water — The Rain`,
      identityIcon:   `ArchetypeSeal`,   // placeholder — dedicated SVG TBD
      manifesto:      `Felt before spoken · What enters water becomes water.`,

      // elementIntro — Layer 0 of Elemental Nature page. World-building, third-person (no "you").
      elementIntro: {
        punch:  `The Rain is Yin Water — pervasive moisture that seeps into everything.`,
        expand: `Permeable and quietly knowing, it senses what is true before it is spoken, absorbing the emotional weather of whatever it falls through.`,
      },
      // manifesto renders as two lines, split on the ` · ` separator:
      //   Line 1 (bold thesis)  → "Felt before spoken"
      //   Line 2 (poetic edge)  → "What enters water becomes water."
      //
      // Badge tile data (resolved from chart at runtime, listed here for reference):
      //   Element badge  → dm.element  = "Water"          → taps open element popup
      //   Stem badge     → dm.stem     = "癸"  + "Guǐ"   → taps open Day Master popup
      //   Polarity badge → dm.polarity = "yin"  → "Yin"   → taps open Yin/Yang popup
    },

    subtitle: `Knows what is true before it is spoken · The Intelligence Impulse (Yin)`,
    chips: ["Attuned", "Psychically permeable", "Absorbing", "Specifically nourishing", "Lost in own fog"],
    yourNature: {
      phrase: `The Court Oracle`,  // [INTERNAL — not rendered in UI]
      desc: `You know what's true in a room before anyone says it out loud — the feeling arrives before the reasoning does. The difficult part is that you absorb what everyone around you is feeling, and it can be hard to tell what's yours and what isn't.`,  // [FREE · Your Nature block — Archetype Variants: varies by STEM_Band_tgPattern]
    },

    // GIFTS & SHADOWS — phrase [FREE] · desc [FREE · one sharp 2nd-person sentence, distinct angle]
    gifts: [
      { phrase: `The Felt Truth`,        desc: `You know what's real in a room before anyone says it — the knowing arrives as a felt sense, ahead of any reasoning.` },
      { phrase: `The Calibrated Care`,   desc: `You nourish people in the specific way each one actually needs, which makes them feel genuinely known rather than simply seen.` },
      { phrase: `The Almost-True Named`, desc: `You find the exact words for the thing someone half-knew, and they realize it was there in them all along.` },
    ],
    shadows: [
      { phrase: `The Borrowed Feeling`,          desc: `You absorb the emotional reality around you so completely that the line between what's yours and what isn't can dissolve before you notice.` },
      { phrase: `The Carried Home`,              desc: `In charged environments you don't just witness the difficulty — you take it with you, and the accumulation has real weight.` },
      { phrase: `The Care That Outpaces Return`, desc: `You care for others at the depth you wish you were cared for, so the giving quietly runs ahead of what comes back.` },
    ],
    blocks: [
      {
        label: `How you experience the world`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: {
          default: `You sense what's true in a room before anyone says the thing. Not through observation and analysis — the knowing arrives as a felt sense, directly, before any reasoning catches up. You know when something is off, when someone is hurting, when the thing that was said isn't the thing that's actually true. This happens continuously and without your choosing it. Proximity to others is never emotionally neutral for you — you absorb the emotional reality of your environment the way rain absorbs the ground's temperature when it falls.`,
          concentrated: `When the sensing force is this saturated, you perceive everything — every mood, every undercurrent, every unspoken thing — all at once and without filter. The attunement is uncanny. The structural cost is that water this permeable floods: you absorb more than you can hold without losing your own shape, until you can no longer tell your knowing from what you've taken on from the room. At full strength your perception is extraordinary and your boundary nearly gone.`,
          open: `The attunement is real but harder to access. You still feel what's true beneath the surface — the sensitivity is genuine — but the perception that normally arrives unbidden comes muffled, and you find yourself taking things at face value that you'd usually have felt straight through. The knowing is there; what's harder to reach is its immediacy, the felt sense that used to land before the reasoning. The instrument is intact, just less finely tuned.`,
          tested: `What you're sensing senses you, and your perception takes its shape from the pressure. When authority energy presses on the Rain, your attunement runs while a standard runs on you in parallel — you're reading the room and being read inside it at once. If the standard is legitimate, it gives the diffuse sensitivity a structure to land on and turns feeling into usable judgment. If it isn't, you absorb the scrutiny along with everything else, and the permeability that's your gift becomes a way of taking on a pressure that isn't yours.`,
          pure: `With no dominant force directing what the sensitivity serves, your perception runs as its essential self — not turned to a particular use, not anchored to a base, not pressed by a role. What arrives is pure attunement: you feel what's true directly, and what deserves that perception is genuinely yours to choose. The world is a field of felt truths, and for once nothing has pre-decided which to take in. This is the unconstrained Rain — free to sense what actually matters rather than everything at once.`,
          rooted: `Resource energy backing the Water means your sensitivity falls from a deep source rather than soaking in everywhere. The perception steadies here — less flood, more deliberate — and it commits: you attune deeply to a few people and stay with them rather than absorbing every room equally. The friction mirrors the gift: the same groundedness that gives your sensitivity a filter can make you slower to open to genuinely new emotional terrain, preferring the depths you already know.`,
          flowing: `Output energy gives your sensitivity somewhere to go. The perception no longer just absorbs — it produces: the felt knowing becomes words for what someone couldn't name, care calibrated exactly to what's needed, the thing made that says what others only felt. You experience your attunement as generative rather than merely receptive. At your most expressive this is the Rain at its best — the water that doesn't just soak the ground but brings something up out of it.`,
        },
      },
      {
        label: `What you're genuinely good at`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: {
          default: `Nourishing what you touch in ways specific to what that particular person or situation actually needs — not generic care, but calibrated care. Making people feel genuinely known rather than simply seen. Perceiving the thing that's almost true but not quite, and finding the exact words for it that make the person realize it was there all along. Sustaining this across time — your care doesn't diminish when circumstances change. It's structural.`,
          concentrated: `Sensing exactly what's needed — almost too much of it. With the attuning force this saturated, you perceive what every person around you is carrying and find precisely the care that meets it. The calibration is uncanny. The catch is that feeling everyone's need this acutely makes it nearly impossible not to respond, so you pour calibrated care in every direction and absorb the weight of all of it — until you can't tell whose feeling you're actually carrying. At full strength you're extraordinary at care and saturated by it.`,
          open: `The gift is real but harder to reach into. You still sense what people need and still want to meet it — the attunement doesn't vanish — but the calibrated care it produces takes more from you than it does when the current is strong. The knowing lives slightly out of reach: you can feel the need without quite finding the exact thing it asks for. What you're good at is genuine; it just needs replenishment beneath it to sustain.`,
          tested: `Calibrated care under scrutiny — meeting real need while a standard watches. When legitimate authority sets the terms, your gift sharpens from "feel everyone" to "give the precise care the situation actually requires," and the constraint turns diffuse sensitivity into genuine skill. You're good at perception that holds up under examination — naming the true thing accurately enough that it lands and helps, not just soothes.`,
          pure: `Pure attunement — the gift in its least mediated form. With no dominant force directing the care, what you're good at is the knowing-and-meeting itself: sensing what someone actually needs and giving exactly that, because that's what you do. You're at your best where the value is in the calibration rather than what it earns you — where a person needs to feel genuinely known. Whom you attune to is yours to choose.`,
          rooted: `Care that genuinely lasts, because the sensitivity flows from a deep source. With resource energy backing you, your gift comes with constancy — you don't just meet a need once, you stay attuned across the long arc, which is exactly why people feel safe with you. What you're good at is the rare pairing of perception and endurance: the care that's still calibrated years in. The trade is breadth; you attune deeply to a few rather than absorbing every room.`,
          flowing: `Turning attunement into words and works. With expression energy in play, your gift isn't only sensing what's true — it's giving it form: the felt knowing becomes the exact sentence, the made thing, the care that arrives as something a person can actually hold. You're good at the whole arc from perception to expression, where a purely receptive configuration would stop at "I can feel it." The sensitivity bears fruit.`,
        },
      },
      {
        label: `Where you consistently get stuck`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `The permeability that makes you so perceptive makes it genuinely hard to know whose feeling is whose. You absorb what you encounter — not from weakness but from how the sensitivity is wired. In difficult or charged environments, you don't just observe the difficulty; you carry it home. The boundary between what you're sensing in others and what you're experiencing yourself can dissolve quietly, often before you've noticed it's happened.

There's also a pattern of caring for others at the level you wish you were cared for — which means the care you give is often more than what returns. Because the giving felt natural, the gap takes a long time to become visible.` },
      },
      {
        label: `What changes when conditions are right`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `In genuinely reciprocal conditions — where your sensitivity is met with sensitivity, where the nourishment returns at something close to the rate it goes out — what you produce is among the most valuable things available in close relationship. The perception is extraordinary. The care is specific. The knowing is real. Protecting these conditions isn't selfishness. It's maintenance of the instrument.` },
      },
      {
        label: `What you rarely admit`,
        bands: ['concentrated', 'balanced', 'open'],
        patterns: ['pure', 'rooted', 'flowing', 'forging', 'tested'],
        priority: { default: 5 },
        text: { default: `That you absorb far more than you show — and that the accumulation is real and has weight. Over time, in environments that don't return what's given, this becomes something between exhaustion and a kind of grief: the specific sadness of giving something real that doesn't arrive back at the same depth.` },
      },
    ],
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
// Fields (9-section schema — REA_03 §4):
//   name, sub              → display title
//   rulingRealm            → { phrase, desc } — psychological territory [FREE]
//   chips[]                → 5 TG-specific behavioral tags [FREE]
//   outputs[]              → { phrase, desc } × 3 — what force generates well-placed [FREE]
//   frictions[]            → { phrase, desc } × 3 — structural patterns when misaligned [FREE]
//   gifts, shadows         → 3 items each [FREE/PRO]
//   hiddenDynamic          → one paragraph — inner mechanism beneath surface [PRO]
//   domainSignatures       → { career, relationships, wealth, health }
//     each: {
//       sig: int,            // 1–5 significance weight (REA_03 §4 sig table)
//       sig_female: int|null,  // override for female users (六亲 relationship stars)
//       sig_male:   int|null,  // override for male users
//       mechanism: string,   // section title — evocative phrase naming TG's territory here
//       text: string,        // Pro — two-angle paragraph: (1) what force produces here,
//                            //   (2) what it reveals about person in this domain. ~80–100w.
//     }
//     Rendering: sig ≥ 4 → included at full depth. sig ≤ 3 → excluded entirely.
//     Gender overrides used when user gender is known.
//     Classical 六亲 basis: 官杀 = husband star (female); 财 = wife star (male).
//     See REA_03 §4 qualifying domains table (15 combinations).
//   sixRelations           → 六亲 description paragraph [PRO]
//   liunianSignatures      → 流年大运 event signatures paragraph [PRO]
// ═══════════════════════════════════════════════════════════════════════════

// SOURCE: Free + Pro tier · Ten God personality and domain fields
// SOURCE: Free + Pro tier · Ten God personality and domain fields
export const TG_CARD_DATA = {
  "比肩": {
    // The Twin — Same nature, same register
    name: "The Twin",  // [INTERNAL · display label]
    sub: "Same nature, same register",  // [INTERNAL · display label]
    rulingRealm: {
      phrase: `Inner Validation — the ego's private standard`,  // [FREE]
      desc: `The part of a person that measures everything against their own internal benchmark before anything else. Not comparison with others — comparison with the self. Self-sufficiency is not a strategy here; it is the default operating mode.`,  // [FREE]
    },  // [FREE]
    chips: ["Self-reliant", "Consistent", "Principled", "Insular", "Complete"],  // [FREE · personality chips]
    outputs: [  // [FREE]
      { phrase: `Unwavering Conviction`, desc: `The same person in every room, every context, every crisis — pressure reveals you rather than reshaping you.` },
      { phrase: `The Held Standard`,      desc: `You never lose yourself in what others want; the core standard holds regardless of what the room offers.` },
      { phrase: `The Durable Trust`,      desc: `Those who earn entry into your real trust receive something exceptionally durable and reliable.` },
    ],
    frictions: [  // [FREE]
      { phrase: `The Loop Without Interrupt`,     desc: `Your self-reference has no natural brake, which makes it genuinely hard to know when you're wrong.` },
      { phrase: `The Loneliness of Completeness`, desc: `You can be surrounded by people and still fundamentally alone unless a genuine equal is present.` },
      { phrase: `The Closed Door`,                desc: `Information that contradicts your conviction tends to get filed as irrelevant rather than taken as a challenge.` },
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
  },

  "劫财": {
    // The Rival — Same nature, different register
    name: "The Rival",  // [INTERNAL · display label]
    sub: "Same nature, different register",  // [INTERNAL · display label]
    rulingRealm: {
      phrase: `Social Performance — the ego measured against its nearest competition`,  // [FREE]
      desc: `The part of a person that measures itself against others occupying the same territory. Not the internal standard of 比肩 but the comparative ego — what am I relative to the people most like me? The reference point is always lateral.`,  // [FREE]
    },  // [FREE]
    chips: ["Competitive", "Comparative", "Socially driven", "Resource-aware", "Sharp"],  // [FREE · personality chips]
    outputs: [  // [FREE]
      { phrase: `The Revealed Edge`,       desc: `Real peers show you where your actual limits lie, giving you a clarity others never get.` },
      { phrase: `Sharpened by Comparison`, desc: `At its best the rivalry sharpens you — you become more precisely what you are by measuring against equals.` },
      { phrase: `The Social Read`,          desc: `You read with unusual accuracy where you stand relative to the people who actually matter to you.` },
    ],
    frictions: [  // [FREE]
      { phrase: `Measuring Over Building`, desc: `Resources can get spent measuring rather than building, until the comparison quietly becomes the point.` },
      { phrase: `The Hardest Collaboration`, desc: `Working with the people most like you is the relationship that's structurally hardest to sustain.` },
      { phrase: `The Peer's Verdict`,       desc: `Validation from a true peer lands harder than any victory over those who don't understand the territory.` },
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
  },

  "食神": {
    // The Artisan — Same-polarity output — giving that feels like being
    name: "The Artisan",  // [INTERNAL · display label]
    sub: "Same-polarity output — giving that feels like being",  // [INTERNAL · display label]
    rulingRealm: {
      phrase: `Authentic Expression — output that happens before strategy`,  // [FREE]
      desc: `食神吐秀 (the Food God expresses elegance): refined Qi moving outward without announcement. What flows out when the self is fully itself — not the assertion of 伤官, not the pressure of 七杀, just the natural emergence of what the DM generates when nothing is in the way.`,  // [FREE]
    },  // [FREE]
    chips: ["Generous", "Expressive", "Effortless", "Non-assertive", "Pleasurable"],  // [FREE · personality chips]
    outputs: [  // [FREE]
      { phrase: `Effortless Output`,    desc: `What you produce has the quality of something that simply happened rather than something that was made.` },
      { phrase: `The Unperformed Gift`, desc: `Others experience your output as a gift rather than a performance, because the giving never feels like giving from the inside.` },
      { phrase: `The Sustained Flow`,    desc: `You can sustain creative or expressive work over time in ways more effortful people genuinely cannot.` },
    ],
    frictions: [  // [FREE]
      { phrase: `The Invisible Cost`,   desc: `The cost of giving is invisible from inside, so depletion accumulates without warning and arrives fully formed.` },
      { phrase: `Over-Extension`,       desc: `Pouring into what feels natural can drain your foundation without ever signaling beforehand.` },
      { phrase: `The Undervalued Ease`, desc: `Because it doesn't feel like work, what flows naturally from you is often undersold or given away.` },
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
  },

  "伤官": {
    // The Virtuoso — Cross-polarity output — brilliance made of what it meets
    name: "The Virtuoso",  // [INTERNAL · display label]
    sub: "Cross-polarity output — brilliance made of what it meets",  // [INTERNAL · display label]
    rulingRealm: {
      phrase: `Rebellion Logic — output that structurally exceeds its container`,  // [FREE]
      desc: `伤官者，聪明秀气太过: "Hurting Officer people are excessively brilliant and refined." The excess is structural, not attitudinal — the intelligence genuinely exceeds the frameworks available to receive it, so it pushes against them as a side effect of expressing itself.`,  // [FREE]
    },  // [FREE]
    chips: ["Brilliant", "Subversive", "Friction-constituted", "Non-conformist", "Ahead"],  // [FREE · personality chips]
    outputs: [  // [FREE]
      { phrase: `Structural Advancement`,  desc: `Your work moves something genuinely forward in ways people working within convention cannot produce.` },
      { phrase: `Sharpened by Resistance`, desc: `Your brilliance is sharpened by exactly what resists it — the friction is part of what makes the output what it is.` },
      { phrase: `Earned Authority`,        desc: `Your creative authority is real because you've actually exceeded the framework, not merely worked inside it.` },
    ],
    frictions: [  // [FREE]
      { phrase: `The Authority Clash`,   desc: `You're in structural tension with any authority that tries to judge your output by conventional standards.` },
      { phrase: `The Inward Turn`,       desc: `When the output has nowhere adequate to land, the force that produces breakthroughs turns back on you.` },
      { phrase: `The Inseparable Pair`,  desc: `The brilliance and the difficulty are inseparable; improving one without the other isn't on offer.` },
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
  },

  "偏财": {
    // The Horizon — Same-polarity wealth — wide-ranging engagement
    name: "The Horizon",  // [INTERNAL · display label]
    sub: "Same-polarity wealth — wide-ranging engagement",  // [INTERNAL · display label]
    rulingRealm: {
      phrase: `Risk/Opportunistic Vision — seeing potential before others recognize it`,  // [FREE]
      desc: `The part of a person that sees potential in everything and moves toward it broadly. Not the focused accumulation of 正财 but the ranging appetite that touches many things and activates what others walked past.`,  // [FREE]
    },  // [FREE]
    chips: ["Generous", "Opportunity-sensing", "Wide-ranging", "Socially fluid", "Diffuse"],  // [FREE · personality chips]
    outputs: [  // [FREE]
      { phrase: `The Early Read`,          desc: `Your sense for what's worth engaging arrives before the evidence does — you see potential before it's visible.` },
      { phrase: `The Activating Presence`, desc: `Things and people come alive in your vicinity; others find opportunities and connections simply through proximity.` },
      { phrase: `The Wide Field`,           desc: `You hold a genuine openness to what's possible across an unusually wide field of things.` },
    ],
    frictions: [  // [FREE]
      { phrase: `Touched, Never Owned`,     desc: `What you touch broadly is never fully owned — the breadth that's your gift also prevents full possession.` },
      { phrase: `Activates, Doesn't Keep`,  desc: `You activate without consolidating, building real things that other people end up keeping.` },
      { phrase: `The Unregistered Loss`,    desc: `What was never fully possessed can be lost before you've registered what you actually had.` },
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
  },

  "正财": {
    // The Steward — Cross-polarity wealth — methodical, directed acquisition
    name: "The Steward",  // [INTERNAL · display label]
    sub: "Cross-polarity wealth — methodical, directed acquisition",  // [INTERNAL · display label]
    rulingRealm: {
      phrase: `Wealth/Security Anxiety — the standard applied to what is held`,  // [FREE]
      desc: `The part of a person that evaluates what it has built and whether it is worthy of the standard applied in building it. Not greed — a specific relationship to security in which the evaluating apparatus that produced the quality also asks whether the quality is sufficient.`,  // [FREE]
    },  // [FREE]
    chips: ["Methodical", "Disciplined", "Earned", "Evaluative", "Security-oriented"],  // [FREE · personality chips]
    outputs: [  // [FREE]
      { phrase: `Earned Results`,         desc: `Your results are real and hold up over time — the line between effort and outcome is clear and verifiable.` },
      { phrase: `The Standing Commitment`, desc: `Once committed, you follow through across time without needing to be re-motivated.` },
      { phrase: `No Hidden Shortcuts`,     desc: `What you build is what was actually intended — the precision that builds also keeps shortcuts from surfacing later.` },
    ],
    frictions: [  // [FREE]
      { phrase: `The Standard That Won't Stop`, desc: `Your evaluating apparatus doesn't know when to stop, applying to relationships the same standard it applies to money.` },
      { phrase: `Precision Turned Inward`,      desc: `The precision can turn on what you value, quietly asking whether a relationship is worthy of the standard that built it.` },
      { phrase: `The Moving Finish Line`,       desc: `Security anxiety doesn't resolve at achievement — the standard keeps moving just past wherever you've arrived.` },
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
  },

  "七杀": {
    // The General — Same-polarity authority — pressure that doesn't grant permission
    name: "The General",  // [INTERNAL · display label]
    sub: "Same-polarity authority — pressure that doesn't grant permission",  // [INTERNAL · display label]
    rulingRealm: {
      phrase: `Survival Instinct / Trauma / Resilience — forged, not developed`,  // [FREE]
      desc: `七杀制伏得宜，反为权贵: "When Seven Killings are properly channeled, they produce genuine authority." The force that presses against the DM without moderation, without asking whether it is ready. What gets produced — when resources are adequate — is character that could only have come from that specific pressure.`,  // [FREE]
    },  // [FREE]
    chips: ["Forged", "Resilient", "Intense", "Non-permissioned", "Bifurcated"],  // [FREE · personality chips]
    outputs: [  // [FREE]
      { phrase: `Forged, Not Developed`,    desc: `What others carry as cultivated virtue, you carry as the residue of surviving something that offered no graceful way to fail.` },
      { phrase: `The Uncopyable Character`, desc: `Your character is the kind only sustained pressure produces — it can't be imitated by anyone who hasn't been through the equivalent.` },
      { phrase: `Tested Authority`,         desc: `Others recognize your authority as real precisely because it was tested rather than credentialed.` },
    ],
    frictions: [  // [FREE]
      { phrase: `The Resource Threshold`, desc: `Channeling the pressure takes real resources; without them, the same force that forges instead damages.` },
      { phrase: `No Moderation`,          desc: `The force doesn't moderate itself or ask whether the moment actually warrants its full weight.` },
      { phrase: `Forge or Break`,         desc: `The outcome is genuinely bifurcated — not a spectrum but a fork: the pressure either forges you or breaks you.` },
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
  },

  "正官": {
    // The Magistrate — Cross-polarity authority — framework-mediated pressure
    name: "The Magistrate",  // [INTERNAL · display label]
    sub: "Cross-polarity authority — framework-mediated pressure",  // [INTERNAL · display label]
    rulingRealm: {
      phrase: `Social Armor / Good Student Complex — character shaped by chosen structure`,  // [FREE]
      desc: `正官端正，主人沉稳，名声好，规则意识强: "Direct Officer upright — the person is calm and settled, with good reputation and strong rule-consciousness." The part of a person that operates within frameworks it has chosen to endorse — not because it has to, but because it has decided the framework is legitimate.`,  // [FREE]
    },  // [FREE]
    chips: ["Principled", "Framework-guided", "Reputation-conscious", "Structured", "Institutional"],  // [FREE · personality chips]
    outputs: [  // [FREE]
      { phrase: `Oriented Reliability`,      desc: `Shaped by legitimate structure, you know what you're building toward and the framework tells you when you've arrived.` },
      { phrase: `Weighted Recognition`,      desc: `Institutional recognition means something to you because it was granted by something you actually respected.` },
      { phrase: `Integrity Within the Frame`, desc: `You operate with unusual integrity inside chosen frameworks — the rules are real, and so is the character built within them.` },
    ],
    frictions: [  // [FREE]
      { phrase: `When Structure Suppresses`,    desc: `Light structure enables you; heavy structure suppresses, turning character shaped by endorsement into character shaped by obligation.` },
      { phrase: `The Unworthy Framework`,       desc: `When a framework reveals itself as unworthy, your disorientation runs larger than the situation looks from outside.` },
      { phrase: `The Good Student's Discovery`, desc: `You did everything right, then discovered institutions don't always work the way their stated rules suggest.` },
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
  },

  "偏印": {
    // The Alchemist — Same-polarity resource — nourishment that deepens without redirecting
    name: "The Alchemist",  // [INTERNAL · display label]
    sub: "Same-polarity resource — nourishment that deepens without redirecting",  // [INTERNAL · display label]
    rulingRealm: {
      phrase: `Niche/Occult Intelligence — depth in what others don't access`,  // [FREE]
      desc: `滋生有源 (nourishment with a continuous source). The part of a person that draws from a deep, unconventional source that others don't have access to or even know exists. The backing that sustains and deepens without redirecting.`,  // [FREE]
    },  // [FREE]
    chips: ["Deep", "Unconventional", "Niche", "Self-sustaining", "Psychically aware"],  // [FREE · personality chips]
    outputs: [  // [FREE]
      { phrase: `Uncommon Depth`,        desc: `Your depth in your domain can't be replicated through effort alone — an unconventional source has been deepening it for a long time.` },
      { phrase: `The Uncodified Knowing`, desc: `You have access to frames and knowledge the mainstream hasn't codified, and a groundedness that never felt worked-for.` },
      { phrase: `The Rare Niche`,         desc: `You're most useful and most trusted exactly where others lack depth — the niche where your unconventional backing produced something rare.` },
    ],
    frictions: [  // [FREE]
      { phrase: `The Unbuilt Capacity`,     desc: `The backing never required you to build the capacity to stand without it, so losing the source disorients disproportionately.` },
      { phrase: `Depth Without Direction`,  desc: `The well keeps deepening without ever opening onto new territory.` },
      { phrase: `Nourishment That Smothers`, desc: `In excess, the nourishment that enables you can smother the independent expression of the very capability it enabled.` },
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
  },

  "正印": {
    // The Sage — Cross-polarity resource — nourishment that sustains and opens
    name: "The Sage",  // [INTERNAL · display label]
    sub: "Cross-polarity resource — nourishment that sustains and opens",  // [INTERNAL · display label]
    rulingRealm: {
      phrase: `Support System / Mother Wound — backed and pointed`,  // [FREE]
      desc: `Bowlby's secure base in its most developmental form: the base that enables exploration by providing both support and direction simultaneously. The part of a person shaped by backing that came with a destination — not just sustained, but sustained AND pointed toward something.`,  // [FREE]
    },  // [FREE]
    chips: ["Grounded", "Mentored", "Directionally shaped", "Supported", "Purpose-oriented"],  // [FREE · personality chips]
    outputs: [  // [FREE]
      { phrase: `Rooted and Reaching`,        desc: `You feel grounded and purposeful at once — rooted and reaching at the same time, which is genuinely rare.` },
      { phrase: `The Internalized Direction`, desc: `You know what you're building toward, not just that you're building — the direction arrived with the support and feels your own.` },
      { phrase: `Quiet Confidence`,            desc: `The confidence of having had genuine backing — not asserted or performed, simply present in how you move.` },
    ],
    frictions: [  // [FREE]
      { phrase: `The Only Direction Known`, desc: `The direction that came with the backing can become the only one you know, leaving you unsure how to generate your own without it.` },
      { phrase: `Whose Vision`,             desc: `The backing may have served the source's vision as much as your own genuine calling.` },
      { phrase: `The Disproportionate Loss`, desc: `Losing the supporting structure disorients you out of all proportion to the situation itself.` },
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
  },

};


// ── Archetype variant data (stem_band_tgPattern keys) lives in STEM_CARD_DATA.js ──
// See Code/STEM_CARD_DATA.js — 150 entries keyed by stem_band_tgPattern.
// Do not add variant data here. archetypeSource.js holds stem baselines only.