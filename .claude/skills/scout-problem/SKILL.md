---
name: scout-problem
description: Standalone, data-driven discovery and validation of a product idea. Finds (or pressure-tests) a small, underserved problem inside a high-demand field, tears down the top-10 Google competitors on UI/features/speed, checks the demand floor, and returns an honest go/no-go verdict with the data behind it. Trigger on "scout a problem", "validate this idea", "/scout-problem", "is X worth building". One run = one validated problem brief + verdict.
---

# Scout Problem — find a real, winnable problem (data, not vibes)

This is the front door of every new project. It runs BEFORE `/explore-project`. Its only job: decide, **on data**, whether a problem is worth building for the user's goals — and if yes, hand `/explore-project` a sharp brief.

**Non-negotiable: 100% data-driven.** Real SERP results, real demand signals, real competitor teardowns. Never "I like this idea." If the data is thin, say the data is thin. An honest no-go is a win — it saves weeks building the wrong thing.

**Equally non-negotiable: greenfield + impact-first.** Every product is built from scratch and judged on its own merits. NEVER favor an idea because it resembles, or could reuse the code of, a previous project (GradeJar, JsonBeam, etc.). Code reuse is not a selection criterion and must never enter the verdict — it biases toward safe clones over the genuinely highest-impact problem. Prior projects inform only *what's already been tried* (so you don't repeat a scout), never *what to pick*. Rank surviving candidates by expected impact = demand × CPM × winnability, not by how cheap they'd be to assemble from what already exists.

## The winning pattern (the bar every idea must clear)

**Three factors are make-or-break — clear ALL THREE or it's a no-go:**

1. **Enough demand to matter.** Lower competition is good, but there is a floor: if almost nobody searches, ranking #1 still earns $0. Target a realistic minimum of a few thousand monthly searches across the keyword cluster. Flag dead niches hard.
2. **Beatable top-10 (highly rankable).** Page-1 Google results are weak on something concrete — UI, features, speed, coverage, freshness — that a *highly usable* build can visibly beat and realistically outrank in the MVP window. This is the single most important gate: a fortress SERP (national brands, high-authority sites, `.edu`, or a pack of already-modern tools) kills the idea no matter how good the product would be.
3. **Money-model viable.** AdSense-friendly intent (tool/utility/informational, skews US, decent-to-high CPM, repeat or shareable) **AND** cost-to-serve stays comfortably below ad revenue. A free AdSense tool that costs more per pageview to serve than it earns is dead on arrival.

**Strong priorities that shape the pick (not hard gates):**

4. **High-demand field, small specific problem.** A narrow, underserved slice of a big topic — not "appeal to everyone."
5. **Front-end-heavy — preferred, not required.** Default to buildable-mostly-client-side (fast to ship, cheap to serve, ranks well). But this is a *priority, not a gate*: a project that's ~30-40% backend is fully in-scope when demand, usability, and rankability are strong and cost-to-serve still clears gate 3. Cheap/cacheable/edge/static-generated backend work is fine; per-request expensive calls (a paid API or a server LLM on every pageview) are what break the money model, not backend per se. Don't confine the hunt to pure front-end — the front-end preference only breaks ties.
6. **MVP shippable in ~3-4 weeks from scratch,** solo at ~10-12 focused hrs/week. Assume zero code reuse — if an idea only fits the window by borrowing an existing project's code, it does not fit the window.

**No preset wedge.** Do NOT assume any particular feature — persistence / "it remembers", a saved roster, offline, etc. — is the required differentiator. That's a past-project hangover, not a rule. Some winning products need persistence, many don't. The wedge is whatever the *data* shows every incumbent is concretely weak on; derive it fresh in Step 3, never carry it in.

If an idea fails gate 1, 2, or 3, it is almost always a no-go. Be willing to say it.

## Inputs

- The user may arrive with a field, a rough idea, or nothing.
  - **Has an idea/field:** validate and sharpen it.
  - **Nothing:** run a **demand-gated brainstorm** (Step 0 below). NEVER present a candidate whose demand you have not actually checked with live search. A shortlist built from memory/vibes is a process failure — the user will (rightly) reject it. The shortlist that reaches the user must already be filtered on real demand data, each row carrying its evidence.
- Read `week.md` (North Star) and `decisions/log.md` (what's been tried) for context.

### Step 0 — Demand-gated brainstorm (only when the user arrives with nothing)

Do NOT hand the user a list of ideas you *think* have demand. Verify first, then present survivors.

1. **Generate a wide raw list (~12-20)** of small, specific problems in high-CPM, tool/utility-intent fields. Cast wide across verticals (home improvement, auto, garden, events, fitness, hobby/maker, etc.). Exclude anything already killed or built in `decisions/log.md`, YMYL (health/finance/legal advice), and pure-developer audiences (adblock kills RPM).
2. **Run a fast demand pre-screen on EVERY raw candidate** using Step 2's triangulation method (a quick pass, not the deep teardown): head-keyword SERP composition, autocomplete/PAA/related breadth, Reddit/forum activity + recency, whether dedicated tools exist and get traction, and any search-volume numbers cited in results. Get to a rough monthly-search read + confidence for each. Batch the searches in parallel to move fast.
3. **Kill everything that fails the demand floor** (a few-thousand searches/month across the cluster). A candidate you did not search does not go on the list.
4. **Present only the 6-7 survivors**, ranked by impact (demand × CPM × winnability), each row showing: the demand evidence you actually saw (signals + rough volume read + confidence), a CPM read, and a one-line winnability/incumbent hunch (so the list isn't all obvious fortresses). Then have the user pick 1-2 for the full Step 1-6 teardown. Do not deep-teardown all of them.

State plainly what a paid keyword tool would confirm and where confidence is low. If most of the raw list fails the demand floor, say so and present fewer than 6 rather than padding with unverified ideas.

## Execution — run in order, with live web research

### Step 1 — Lock the candidate problem
State it in one sentence: *"People who [do X] struggle to [Y], and today they [current bad workaround]."* If the user can't get it that crisp, the idea isn't ready — sharpen before researching.

### Step 2 — Demand research (is anyone actually looking?)
Use `WebSearch` / `WebFetch`. You won't have a paid keyword tool, so triangulate convergent signals:
- The primary keyword cluster (3-6 phrases people would actually type).
- Google autocomplete + "People also ask" + "related searches" for those terms.
- Reddit / forums / Stack Overflow / communities: are people actively asking for this? How often, how recently?
- Existing tools' traction (reviews, GitHub stars, "alternatives to" searches).

**Apply the demand floor.** Estimate whether the cluster clears a few-thousand-searches/month bar. If it reads as a dead niche, flag it now and consider stopping. State confidence (high/medium/low) and what a real keyword tool would confirm.

### Step 3 — Competitor teardown (the top 10, concretely)
Pull the **actual top 10 Google results** for the main keyword. For each relevant one capture:
- What it is, and roughly how strong (brand, age, authority feel).
- **UI quality** — modern/clean or dated/cluttered?
- **Features** — what it does and visibly lacks.
- **Speed** — does it load fast? (Note obvious bloat, ad-choke, jank.)
- **Monetization** — ads? paywall? (tells you the money model that already works here.)

Then state **the wedge**: the specific, concrete thing(s) every incumbent is weak on that we can win on (e.g. "top 5 are all ad-choked and slow; a clean, instant, ad-light tool wins on UX"). If incumbents are strong, modern, and fast — say so. That's a likely no-go.

For a heavy SERP, you MAY delegate the teardown to a `general-purpose` subagent and have it return a structured table — but the verdict stays here.

### Step 4 — Fit check against the user's constraints
Score each honestly, as a **standalone greenfield build**: money-model viable (AdSense intent/geo/CPM **and** cost-to-serve under ad revenue)? Highly usable versus the incumbents? MVP in ~3-4 weeks with no borrowed code? Front-end-heavy — or, if it carries a backend (~30-40% is fine), does cost-to-serve still clear the money gate? Room to scale within the niche / expand later? Do NOT score an idea higher for reusing a past project's engine, and do NOT down-rank it merely for having a backend — judge on demand × usability × rankability × money-model, per the three gates.

### Step 5 — Verdict (go / no-go / needs-data), with the evidence
A clear call backed by the data from steps 2-4. Use a simple scorecard (each criterion: pass / weak / fail).
- **No-go is a valid, good outcome.** Don't soften it. Log it and move on.
- **Needs-data** if a real keyword tool would change the call — name exactly what to check.
- **Go** only when the three make-or-break gates all pass: demand floor + beatable top-10 (highly rankable) + money-model viable (cost-to-serve under ad revenue). Front-end-heavy is a priority, not a gate — a backend-carrying idea can still be a GO when those three hold.

### Step 6 — If GO, write the brief + hand off
Write `research/<project-slug>.md`:
- The one-sentence problem + target user.
- The keyword cluster + demand read (with confidence).
- The top-10 teardown table + the wedge.
- The fit scorecard.
- A rough MVP scope (smallest thing that delivers the wedge and ships in ~3-4 weeks).

Append a one-line entry to `decisions/log.md`. Close with: *"Verdict: GO. Run `/explore-project research/<project-slug>.md` to scope the build."*

## Rules
1. **Data or it didn't happen.** Every claim about demand or competition traces to a real search/page you looked at. Cite what you saw.
2. **State confidence.** You're triangulating, not pulling exact volumes. Say high/medium/low and what would raise it.
3. **No-go is success.** Killing a weak idea early is the highest-ROI outcome here.
4. **One problem at a time — for the deep teardown.** The full Step 1-6 teardown runs on one or two candidates, not ten. The Step 0 demand pre-screen is different and deliberately wide: fast-check ~12-20 so the shortlist is real, then deep-dive only the 1-2 the user picks.
5. **Hand off clean.** A GO always ends with a saved brief + the exact `/explore-project` command.
6. **Greenfield, evaluated independently.** Judge every idea on its own data and rank by impact (demand × CPM × winnability). Never credit code reuse, template reuse, or similarity to GradeJar/JsonBeam — that biases toward clones over the highest-impact problem. Past builds tell you what *not* to re-scout, nothing more.
