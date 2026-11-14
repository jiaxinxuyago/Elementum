# Life Chapters polish round: the writers' brief

On 2026-11-14 the owner ruled the Life Chapters audit: **M1–M9 A** and **MINOR A** ("apply all MINOR rewrites in one polish round, folding in the rebuilds"). Your job is one revision pass over your worklist so that every unit passes the ruled rules and answers its audit findings.

Read first:
1. `../../../final-audit-2026-10-17/SOP.md` §3, the criteria. B is The Pattern parity: 4 is equal to The Pattern, 5 is better.
2. `/home/user/Elementum/Reading/Database/Prompts/07_REFERENCE_BENCHMARKS.md`: The Pattern excerpts, the north star.
3. `/home/user/Elementum/ComparativeAnalysis/Prompts/out/handoff/2026-10-21-chapters-energy/BRIEF.md`: the original writers' brief. It covers what the page is, the five functions, grow and release, the gates and ages, the tenses, the openings per kind and the voice laws. All of it still holds unless this brief changes it.
4. `../audit/*.md`: the four audit reports, for context on what readers of your units saw.

## Your worklist

`worklist-PN.json` lists `{ key, kind, current, findings }`.
- `current` is the live text, or null for a new key.
- `findings` are the auditors' MAJOR and MINOR findings on that key, each with a `proposed` rewrite. Adopt the proposal, improve on it, or write your own, but every finding must be answered.
- A unit with no findings still has to pass the rules below. If it already passes and reads at Pattern level, keep it word for word.

Hand back `out-PN.json` with `{ "units": [ { key, kind, text } ] }`: every key of your worklist, nothing else. Run `node gate.mjs base.json out-PN.json` in this folder until it prints PASS. Do not edit `gate.mjs`, `base.json` or another writer's file. Do not run git.

## The rules (owner rulings; the gate checks most of them)

- **M2 and AM4: no ", and you" habit.**
  - At most a quarter of your units of one kind may use ", and you".
  - The shared year and landing lines use none.
  - The reader is still the subject of the last sentence: open it with "You", or use another shape ("Each X gives you…", "What you…").
  - Vary the closes. Do not trade one tic for another.
- **AM1, the year and landing lines (shared with the Almanac's Year page):** name what the reader meets and what it costs, never how it ends. Not "you end the year…", "you come through it…", "by the end". No "you feel".
- **AM2, no rank:** a shared line cannot know which energy a reader needs most. Say "an energy your chart runs short of" or "one your chart wants", never "the energy you need most" or "shortest of".
- **AM3, direction, not amount (an accuracy fix):** "release" means the chart's balance works against the energy, not that the chart has a lot of it.
  - Outside Body, never say "runs over", "overflows", "too much", "already full", "crowded with" or "more than it can carry".
  - Say "more than your chart can use", "an energy your chart does better without" or "one that works against your chart".
  - Body release is the reader's own element in excess, so "runs over" stays true there.
- **M4, what carries the reader is a neutral act.** In release and heavy units, what sees the reader through must not be an energy's own image: no mentors, teachers, study or courses (Mind); no deadlines, rules, routines or titles (Order); no crafts, stages or audiences (Expression); no ventures or income (Action); no teams, peers or rivals (Body).
  - Use plain human acts instead: rest, a slower pace, one thing at a time, time alone, help from someone close, a walk, saying no, finishing what you started.
  - The Seek chip beside the page names the element.
  - Q10 still holds: every heavy unit names what carries the reader, as a present resource, not an end state.
- **M5, people and roles the age can have.**
  - No brothers, sisters, siblings, parents or grandparents. Say "children your age", "someone in your first home", "an older relative" or "the family you came from".
  - Day-Gate landings never say "your partner"; say "a partner" or the home.
  - Domain lines must fit any reader from 16 to 75: no first job, no learning the trade, no school or exams.
  - **New `.late` lines** (decades from 55 on, and Year- and Month-Gate landings for readers from 55 on) never give bosses, managers, deadlines, exams, careers, promotions, wages or school.
    - Late life is: home, health and pace, the people after you, friends, making and teaching, what you have built, time.
    - A Month-Gate `.late` landing speaks of "your work or the part you play in the world"; a Year-Gate `.late` landing speaks of "the family you came from" and its old ties. Never assume older relatives are alive, and never mention death.
- **M7, the Love lines:** favour a way of being with a partner, never one kind of partner over another (not "a partner who … over one who …"). A Love line must not favour more of an energy the page releases.
- **M9:** the `.early` decade lines are for a decade lived mostly before 16, so the scene fits a child from 6 to 15. No jobs, bosses, partners or wages.
- **The A3 tics the auditors counted:**
  - superlative closes ("than ever", "than any before", "than at any earlier point");
  - "talent" in a dozen Expression units;
  - sleep in every Health line;
  - "hand it on" as the cure for every Late release;
  - flattering Order closes ("sits easily on you", "suits you");
  - "a craft" and "a mentor" piling up;
  - "again" and "more" claiming an earlier period the unit cannot know.

## New kinds in some worklists

- **`ground` by direction** (`TEMPLATED tpl_chapters · ground.<relation>.<grow|release>`, and the same with `.lived`):
  - Format: one sentence, 12–26 words. Present lines open "Under it runs {g}"; lived lines open "Under it ran {g}". `{e}` is the energy above it.
  - The direction is the direction of the energy above (`{e}`). Feeding an energy the reader grows is support; feeding one the chart releases keeps the pressure supplied.
  - The relations:
    - feeds: {g} feeds {e};
    - drains: {e} feeds {g}, which draws it off;
    - matches: more of the same;
    - presses: {e} holds {g} down;
    - resists: {g} pushes back against {e}.
  - Keep the Almanac's relation words: feeds, draws off, holds down, pushes back. Never "tames". No "you feel".
- **`.late` decades** (`decade.<dir>.late.<lived|coming>.<a|b>` and `decade.<dir>.late.now`): the same openings, budgets and tenses as the other decade lines, for decades from 55 on.
- **`.late` landings** (`land.year.<kind>.<year|month>.late`): one sentence, 12–30 words, saying "this year"; AM1–AM4 apply.
- **`year.even` and `body · year.core_even`**, plus their `.b` second-year lines:
  - "even" means the chart neither grows nor releases this energy: it is neutral, neither help nor burden. Write what it brings plainly.
  - Format: "{el} brings <Function> for a whole year, …", 20–42 words, exactly 2 sentences.
  - The `.b` line is the second year running and opens "{el} brings <Function> for a second year running, …".
  - The Almanac's own even lines are in the station `Reading/Database/templates/by_axis/json/TEMPLATED/tpl_almanac.json` if you want a model; do not copy them.

## Write for The Pattern

Each unit should be at least as specific, true-feeling and quotable as The Pattern: a concrete scene, a plain cost or gift, one line a reader would screenshot. Read your units as a set before you hand back.
