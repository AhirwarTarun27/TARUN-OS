---
name: scout-problem
description: Standalone, data-driven discovery and validation of a product idea. Finds (or pressure-tests) a small, underserved problem inside a high-demand field, tears down the top-10 Google competitors on UI/features/speed, checks the demand floor, and returns an honest go/no-go verdict with the data behind it. Trigger on "scout a problem", "validate this idea", "/scout-problem", "is X worth building". One run = one validated problem brief + verdict.
---

# Scout Problem — find a real, winnable problem (data, not vibes)

This is the front door of every new project. It runs BEFORE `/explore-project`. Its only job: decide, **on data**, whether a problem is worth building for the user's goals — and if yes, hand `/explore-project` a sharp brief.

**Non-negotiable: 100% data-driven.** Real SERP results, real demand signals, real competitor teardowns. Never "I like this idea." If the data is thin, say the data is thin. An honest no-go is a win — it saves weeks building the wrong thing.

## The winning pattern (the bar every idea must clear)

A buildable idea for this user looks like ALL of these:

1. **High-demand field, small specific problem.** A narrow, underserved slice of a big topic — not "appeal to everyone."
2. **Enough demand to matter.** Lower competition is good, but there is a floor: if almost nobody searches, ranking #1 still earns $0. Target a realistic minimum of a few thousand monthly searches across the keyword cluster. Flag dead niches hard.
3. **Beatable top-10.** The current page-1 Google results are weak on UI, features, or speed — something concrete we can visibly beat.
4. **Front-end-heavy, little/no backend.** Buildable mostly client-side, like Jsonbeam.
5. **AdSense-viable traffic.** Tool/utility/informational intent, skews US / high-CPM, repeat or shareable usage.
6. **MVP shippable in ~3-4 weeks** solo at ~10-12 focused hrs/week.

If an idea fails 2, 3, or 4, it is almost always a no-go. Be willing to say it.

## Inputs

- The user may arrive with a field, a rough idea, or nothing.
  - **Has an idea/field:** validate and sharpen it.
  - **Nothing:** brainstorm 5-8 candidate problems in high-demand fields with weak incumbents, then have the user pick 1-2 to validate deeply. Don't deep-research all of them.
- Read `week.md` (North Star) and `decisions/log.md` (what's been tried) for context.

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
Score each honestly: front-end-heavy / minimal backend? AdSense-viable (intent, geo, CPM)? MVP in ~3-4 weeks? Room to scale within the niche / expand later?

### Step 5 — Verdict (go / no-go / needs-data), with the evidence
A clear call backed by the data from steps 2-4. Use a simple scorecard (each criterion: pass / weak / fail).
- **No-go is a valid, good outcome.** Don't soften it. Log it and move on.
- **Needs-data** if a real keyword tool would change the call — name exactly what to check.
- **Go** only when demand floor + beatable top-10 + front-end-heavy all pass.

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
4. **One problem at a time.** Deep-research one or two candidates, not ten.
5. **Hand off clean.** A GO always ends with a saved brief + the exact `/explore-project` command.
