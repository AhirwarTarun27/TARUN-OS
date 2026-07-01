---
name: explore-project
description: Parent pipeline that scopes a GREENLIT project for build. Runs after /scout-problem returns GO. Orchestrates domain, stack, system design, and setup research into one build-ready Pre-Build Brief, then writes a top-tier handoff prompt the user drops into a fresh repo to start building. Trigger on "/explore-project", "explore this project", "scope the build for X", usually pointed at a research/<slug>.md brief. One run = one Pre-Build Brief + one handoff prompt.
---

# Explore Project — turn a validated idea into a build-ready brief + handoff prompt

Runs the pre-build pipeline AFTER `/scout-problem` returns GO. Input: a `research/<slug>.md` problem brief (or a clearly-described greenlit idea). Outputs: (1) one consolidated **Pre-Build Brief** in `research/`, and (2) one **handoff prompt** in `handoff-prompts/` — a single, paste-ready, top-0.5%-engineer-grade prompt the user hands to a brand-new repository's agent to start building immediately.

This is an orchestrator. It runs four sub-skill steps in order, then synthesizes two artifacts. Run each step, capture its output, roll everything into the brief, then distill the brief into the handoff prompt. If a sub-skill surfaces a blocker (no decent domain, stack can't hit the SEO need), pause and flag it — don't barrel ahead.

## Preconditions
- A GO verdict exists (from `/scout-problem`). If not, stop and tell the user to run `/scout-problem` first. Don't scope an unvalidated idea.
- Read the problem brief: the problem, keyword cluster, the wedge, rough MVP scope.

## Pipeline — run in order, gated by user confirmation

Each step is a hard stop. Do NOT proceed to the next step until the user explicitly confirms they are happy with the current step's output. If they want changes, iterate within the current step first.

### 1. Domain → `domain-namer`
Run `domain-namer` with the product brief. Present the recommended `.com` + top-3 shortlist with live availability.

**STOP. Ask:** "Are you happy with a domain choice, or do you want to explore more options?" Do not move to step 2 until the user confirms one specific domain is finalized. Domain discussions may take multiple rounds — that is expected. Only carry the locked domain forward.

### 2. Stack → `pick-stack`
(Only run after domain is confirmed.) Run `pick-stack` for this project type. Present the recommended framework/libraries optimized for max page speed + top SEO, with the rationale.

**STOP. Ask:** "Does this stack work for you, or do you want to adjust anything before we design the architecture?" Do not move to step 3 until the user confirms.

### 3. Architecture → `design-architecture`
(Only run after stack is confirmed.) Run `design-architecture`. Present the recommended system design + the "why" + the front-end system-design learning notes.

**STOP. Ask:** "Are you good with this architecture, or do you want to change anything before we build the setup checklist?" Do not move to step 4 until the user confirms.

### 4. Setup kit → `setup-kit`
(Only run after architecture is confirmed.) Run `setup-kit` (it delegates research to a subagent). Capture: design direction, the skills to install (with commands), and the MCPs that *could* help (as suggestions only — see MCP rule below; doc-reference MCPs become local `references/mcp/` files on approval, action MCPs get installed).

**STOP. Ask:** "Setup kit looks good to proceed?" Confirm before writing the final artifacts.

## Output 1 — the Pre-Build Brief
Write `research/<slug>-prebuild.md` consolidating:
- **Name + domain** (chosen, with availability + handles to grab).
- **The wedge + MVP scope** (carried from scout-problem, refined).
- **Stack** (framework/libs + speed/SEO rationale).
- **Architecture** (system design + words-and-boxes diagram + scale-to-mass-traffic notes).
- **Setup checklist** (skills to install, MCPs *suggested* — not auto-installed; doc-reference MCPs noted as future `references/mcp/<tool>.md` files, action MCPs as install-on-approval, design direction) — copy-paste commands where possible.
- **First 3 build outcomes** — the smallest shippable slices, ready to drop into `week.md`.

## Output 2 — the handoff prompt (the deliverable for the new repo)

After the Pre-Build Brief is written, distill it into a single paste-ready prompt and save it to **`handoff-prompts/<slug>.md`** (create the `handoff-prompts/` folder if it doesn't exist). This is the artifact the user copies into a fresh repository's agent to kick off the build. Write it AS the prompt — addressed to the engineer/agent who will build it — not as notes about the prompt.

It must read like it was written by a top-0.5% engineer: precise, opinionated, no fluff, every instruction load-bearing. Required sections, in order:

1. **Role & mission.** Frame the builder as a senior/staff front-end engineer. One tight paragraph: what we're building, for whom, and the one **wedge that must never be compromised**.
2. **Operating rules.** The quality bar (ship fast, ranks #1 + loads fast beats "perfect"), code conventions, and the guardrails below — especially the **MCP rule**.
3. **Stack (pinned).** Exact frameworks/libraries/hosting, with versions where known. No ambiguity about what to install.
4. **Architecture contract.** The component model, the data schema, and the **non-negotiable invariants** (e.g. the persistence wedge, single source of truth, SEO requirements). Include the words-and-boxes diagram.
5. **Build order.** The first 3 outcomes as concrete milestones, each with explicit **acceptance criteria** (done = X observable). Build and deploy on the hosting platform's **preview URL** (e.g. Cloudflare Pages `*.pages.dev`) — treat **buying the domain + wiring DNS as the final go-live milestone, not a prerequisite** (unless the user says otherwise).
6. **Definition of done / quality gates.** Core Web Vitals budget, accessibility bar, SEO checklist, tests — the measurable gates every slice must pass.
7. **Guardrails / do-NOTs.** The known traps (project-specific) + the universal ones below.
8. **First action.** Exactly what to do first (scaffold, restate the plan back, confirm assumptions) before writing feature code.

### The MCP rule (must appear verbatim-in-spirit in every handoff prompt)
- **One standing exception — the Playwright MCP (`@playwright/mcp`) is pre-approved and included in every web project**, current and upcoming. It is the standard verification tool (drives a real browser to prove changes work, test the wedge, keyboard flows, screenshots). Wire it by default; no need to ask.
- **For every OTHER MCP: do NOT install, and do NOT run `claude mcp add` or edit MCP config.** They are optional power-ups, never prerequisites. If one would genuinely help, **surface it as a one-line suggestion and WAIT for explicit approval.**
- **On approval, branch by MCP type:**
  - **Doc-reference MCPs (read-only — they only fetch docs/knowledge that rarely changes, e.g. `astro-docs`): do NOT install.** Instead, thoroughly research the resource the MCP points at and write a local reference file at `references/mcp/<tool-name>.md` capturing the functions/endpoints, params, and usage patterns the MCP would have surfaced. Future sessions read that file directly — no live MCP call, far fewer tokens. The docs don't change often, so a cached local copy is the better default; refresh it on demand (see update trigger).
  - **Action MCPs (they execute things — open PRs, run queries, read/write files, e.g. GitHub / database / filesystem): these are the exemption.** A reference file can't run a command, so once approved, install the real MCP with `claude mcp add ...` at least-privilege scope.
- **Doc-reference tooling is near-default for the house Astro + Tailwind stack** (still suggest-first, but usually yes): `astro-docs` and Tailwind v4 docs pin the model to current APIs and prevent stale-syntax bugs. When approved, capture them as `references/mcp/` files per the rule above rather than installing the MCP. (A maintained local skill such as `tailwind-4-docs` (`Lombiq/Tailwind-Agent-Skills`) is already a local form and fine to add as-is.)
- **Update trigger:** when the user says "update the `<tool-name>` reference" (or similar), re-research the resource and overwrite `references/mcp/<tool-name>.md`. These files are refreshed on command, not automatically.
- The same restraint applies to any tooling install that isn't strictly required for the milestone in front of you. Suggest, don't auto-install. Keep the kit lean.

After both files are written, append a decision entry to `decisions/log.md`. Close by offering to set the first build week in `week.md`, and tell the user the exact path of the handoff prompt to copy into the new repo.

## Rules
1. **Never run on an unvalidated idea.** GO from `/scout-problem` is the gate.
2. **Run steps in order; carry context forward.** The name feeds the domain; the scope feeds the stack and architecture.
3. **Each step stays its own skill.** This parent only orchestrates and consolidates — fix logic in the sub-skill, not here.
4. **End build-ready, twice.** The brief must be concrete enough to start coding; the handoff prompt must be good enough to paste into a cold repo and have a strong agent build the right thing with zero extra context.
5. **Never skip a confirmation gate.** A step is not done until the user says it is. If the user is still discussing or undecided, keep iterating — do not move forward.
6. **MCP servers and non-essential tooling are suggest-only — never auto-install — with ONE standing exception: the Playwright MCP**, which is pre-approved and included in every web project (the verification backbone). All other MCPs: recommend with a one-liner, ask first. On approval, branch by type — **doc-reference (read-only) MCPs get researched into a local `references/mcp/<tool-name>.md` file instead of installed** (saves tokens; docs rarely change, refresh on command), while **action MCPs (GitHub / DB / filesystem) are the exemption and do get installed** at least-privilege. Treat `astro-docs` + Tailwind v4 docs as near-default for the Astro/Tailwind stack, captured as reference files. Bake the Playwright-standard + suggest-first + doc-MCP-as-local-file rule into every handoff prompt you write.
7. **Domain purchase is the last step.** Unless the user says otherwise, the brief and handoff prompt build and deploy on the platform's preview URL; registering the domain and attaching DNS is the final go-live milestone, never a prerequisite. Still run live availability checks early (so the name is known to be free), but don't tell the user to buy early — flag squat risk once, then respect the decision.
