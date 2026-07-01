---
name: setup-kit
description: For a greenlit project, determine the design direction and assemble the build kit — which famous existing (installable) skills to add and which MCPs are needed — delegating the research to a subagent. Trigger on "/setup-kit", "what skills and MCPs do I need", "assemble the kit". One run = a design direction + an install checklist.
---

# Setup Kit — design direction + the skills/MCPs to install

For a specific greenlit project, produce: (1) a **design direction**, and (2) a **build kit** — the existing, famous, *installable* skills and the MCPs this project needs. Install existing tools; don't reinvent. **Delegate the research to a subagent** so it's thorough and parallel.

## Inputs
- The project, wedge, stack, and architecture (from earlier steps).
- What's already available: the repo's `.claude/skills/`, user-level `~/.claude/skills/`, installed plugins, and configured MCPs. Don't recommend installing what's already there.

## Execution

### 1. Design direction (fast, opinionated)
Recommend a concrete UI/design direction for the wedge: visual tone, layout pattern, a known design reference or two, light/dark, type + color approach. Point at the available `frontend-design` skill if useful. Keep it a tight, buildable direction — not a brand bible.

### 2. Delegate the kit research to the `kit-researcher` subagent
**Your job here is to give the subagent excellent context — that is what makes its research good.** Garbage context in, garbage list out. Launch the `kit-researcher` agent (Agent tool, `subagent_type: "kit-researcher"`) and hand it a full brief:
- The **project type + the wedge** (what makes it win).
- The **chosen stack** (from `pick-stack`) and **architecture** (from `design-architecture`).
- The **"already installed" inventory** you know of, so it doesn't recommend duplicates.
- The **priorities in order**: page speed, SEO, fast solo shipping.

`kit-researcher` will detect what's already installed, research candidates live, verify each one exists and is maintained, and return a ranked, install-ready checklist. **Do not do this research inline — delegate it.** It exists at `.claude/agents/kit-researcher.md`.

### 3. Assemble the checklist
From the subagent's findings:
- **Skills to install** — name, one-line why, exact install/add command, only if not already present.
- **MCPs** — name, why, and type. **Doc-reference MCPs (read-only — they only fetch docs/knowledge that rarely changes): do NOT install.** On approval, research the resource and write `references/mcp/<tool-name>.md` (the functions/params/usage the MCP would surface) so future sessions read locally instead of paying MCP-call tokens. **Action MCPs (they execute things — GitHub / DB / filesystem):** install the real server with `claude mcp add ...` at least-privilege scope. Playwright is the standing pre-approved exception.
- **Skip list** — what you deliberately did NOT recommend and why (avoid bloat).

## Output
1. **Design direction** — a short, concrete paragraph + 2-3 references.
2. **Install checklist** — copy-paste commands for skills + action MCPs (least-privilege); for doc-reference MCPs, the `references/mcp/<tool>.md` file to research on approval instead of an install command.
3. **What you already have** — existing skills/MCPs that already cover needs, so nothing is double-installed.

## Rules
1. **Install, don't reinvent.** Prefer famous, maintained, existing skills/MCPs.
2. **Delegate the research to a subagent**, and make it verify live — popularity + maintenance, not vibes.
3. **Prefer local reference files over live MCPs for docs; least privilege on the rest.** Doc-reference (read-only) MCPs should be captured as `references/mcp/<tool-name>.md` files instead of installed — saves tokens since docs rarely change (refresh on command). Only action MCPs (which execute things) get installed, at the narrowest scope/token that works. Playwright is the standing exception.
4. **No bloat.** Every recommendation earns its place; list what you skipped.
