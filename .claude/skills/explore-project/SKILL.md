---
name: explore-project
description: Parent pipeline that scopes a GREENLIT project for build. Runs after /scout-problem returns GO. Orchestrates domain, stack, system design, and setup research into one build-ready Pre-Build Brief. Trigger on "/explore-project", "explore this project", "scope the build for X", usually pointed at a research/<slug>.md brief. One run = one Pre-Build Brief.
---

# Explore Project — turn a validated idea into a build-ready brief

Runs the pre-build pipeline AFTER `/scout-problem` returns GO. Input: a `research/<slug>.md` problem brief (or a clearly-described greenlit idea). Output: one consolidated **Pre-Build Brief** the user can start coding from, plus the domain decision.

This is an orchestrator. It runs four steps, each its own skill, in order. Run each, capture its output, roll everything into the final brief. If a sub-skill surfaces a blocker (no decent domain, stack can't hit the SEO need), pause and flag it — don't barrel ahead.

## Preconditions
- A GO verdict exists (from `/scout-problem`). If not, stop and tell the user to run `/scout-problem` first. Don't scope an unvalidated idea.
- Read the problem brief: the problem, keyword cluster, the wedge, rough MVP scope.

## Pipeline — run in order

### 1. Domain → `domain-namer`
Run `domain-namer` with the product brief. Capture the recommended `.com` + the top-3 shortlist with live availability. Carry the chosen name forward.

### 2. Stack → `pick-stack`
Run `pick-stack` for this project type. Capture the recommended framework/libraries optimized for max page speed + top SEO, with the rationale.

### 3. Architecture → `design-architecture`
Run `design-architecture`. Capture the recommended system design + the "why" + the front-end system-design learning notes.

### 4. Setup kit → `setup-kit`
Run `setup-kit` (it delegates research to a subagent). Capture: design direction, the famous existing skills to install (with commands), and the MCPs needed (with commands).

## Output — the Pre-Build Brief
Write `research/<slug>-prebuild.md` consolidating:
- **Name + domain** (chosen, with availability + handles to grab).
- **The wedge + MVP scope** (carried from scout-problem, refined).
- **Stack** (framework/libs + speed/SEO rationale).
- **Architecture** (system design + words-and-boxes diagram + scale-to-mass-traffic notes).
- **Setup checklist** (skills to install, MCPs to add, design direction) — copy-paste commands where possible.
- **First 3 build outcomes** — the smallest shippable slices, ready to drop into `week.md`.

Append a decision entry to `decisions/log.md`. Close by offering to set the first build week in `week.md`.

## Rules
1. **Never run on an unvalidated idea.** GO from `/scout-problem` is the gate.
2. **Run steps in order; carry context forward.** The name feeds the domain; the scope feeds the stack and architecture.
3. **Each step stays its own skill.** This parent only orchestrates and consolidates — fix logic in the sub-skill, not here.
4. **End build-ready.** The brief must be concrete enough to start coding, ending in 3 outcomes for `week.md`.
