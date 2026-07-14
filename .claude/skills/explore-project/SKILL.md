---
name: explore-project
description: Parent pipeline that scopes a GREENLIT project for build. Runs after /scout-problem returns GO. Orchestrates domain, stack, system design, setup research, and the AdSense compliance contract into one build-ready Pre-Build Brief, then writes a top-tier handoff prompt the user drops into a fresh repo to start building — approvable by construction, not by cleanup. Trigger on "/explore-project", "explore this project", "scope the build for X", usually pointed at a research/<slug>.md brief. One run = one Pre-Build Brief + one handoff prompt.
---

# Explore Project — turn a validated idea into a build-ready brief + handoff prompt

Runs the pre-build pipeline AFTER `/scout-problem` returns GO. Input: a `research/<slug>.md` problem brief (or a clearly-described greenlit idea). Outputs: (1) one consolidated **Pre-Build Brief** in `research/`, and (2) one **handoff prompt** in `handoff-prompts/` — a single, paste-ready, top-0.5%-engineer-grade prompt the user hands to a brand-new repository's agent to start building immediately.

This is an orchestrator. It runs **five** sub-skill steps in order, then synthesizes two artifacts. Run each step, capture its output, roll everything into the brief, then distill the brief into the handoff prompt. If a sub-skill surfaces a blocker (no decent domain, stack can't hit the SEO need, a route list that can't be made AdSense-approvable), pause and flag it — don't barrel ahead.

## Preconditions
- A GO verdict exists (from `/scout-problem`). If not, stop and tell the user to run `/scout-problem` first. Don't scope an unvalidated idea.
- Read the problem brief: the problem, keyword cluster, the wedge, rough MVP scope.
- **Check `research/<slug>-status.md` first (see "## Pipeline status file").** If it exists, this is a RESUME — read it and continue from its ▶ NEXT ACTION; do NOT restart completed steps. If it's missing, create it from the template (all steps pending, ▶ NEXT ACTION = step 1 Domain) so the run is resumable from step one.

## Pipeline status file — keep the run resumable

Every run maintains ONE living status file so a compacted or brand-new session can pick up exactly where planning stopped. This is not optional bookkeeping — it's how the pipeline survives a context reset.

- **Path:** `research/<slug>-status.md` (co-located with the scout brief + the future `-prebuild.md`).
- **Create** it at the start of the run if missing; **read + resume** from it if present (see Preconditions).
- **Update it FIRST at every confirmation gate**, before running the next sub-skill: tick the step, log the decision one-liner + date, reset ▶ NEXT ACTION. Log the step, THEN move — never advance without ticking the one behind you.
- **On completion** (both output artifacts written), set Stage = `COMPLETE — ready to build`.
- **The first time you create it, drop a one-line pointer in `week.md`** (North Star or parking lot), e.g. "Bet #N <Product> in build-planning — status + next step in `research/<slug>-status.md`", so the session that opens `week.md` first is routed to it. Optionally bank a one-line auto-memory pointing at the status file for the strongest cross-session catch.

**Template:**

```markdown
# Pipeline Status — <Project> (`/explore-project`)

> Resumable state of the build-planning pipeline for this product.
> **New session:** open `week.md`, then read THIS file, then resume from ▶ NEXT ACTION.
> Do NOT redo completed steps. After each confirmed gate, update this file BEFORE proceeding.

**Product:** <name>   **Domain:** <domain> (LOCKED / tbd)   **Stage:** <e.g. Step 2 of 5>
**▶ NEXT ACTION:** <one imperative line the next session executes>

## Pipeline checklist
- [x] Scout → GO — <brief path> — <date>
- [x] 1. Domain → <domain> LOCKED (<one-line why>) — <date>
- [~] 2. Stack → <one-line recommendation>. Awaiting confirm — <date>
- [ ] 3. Architecture → pending
- [ ] 4. Setup kit → pending
- [ ] 5. AdSense compliance → pending
- [ ] Output 1: Pre-Build Brief → `research/<slug>-prebuild.md`
- [ ] Output 2: Handoff prompt → `handoff-prompts/<slug>.md`

## Decisions captured so far
- <domain rationale one-liner>
- <stack rationale one-liner>
- <compliance contract one-liner>
(Formal record lands in `decisions/log.md` when the Pre-Build Brief is written.)
```

Legend: `[x]` done · `[~]` presented / awaiting confirm · `[ ]` pending.

## Pipeline — run in order, gated by user confirmation

Each step is a hard stop. Do NOT proceed to the next step until the user explicitly confirms they are happy with the current step's output. If they want changes, iterate within the current step first.

### 1. Domain → `domain-namer`
Run `domain-namer` with the product brief. Present the recommended `.com` + top-3 shortlist with live availability.

**STOP. Ask:** "Are you happy with a domain choice, or do you want to explore more options?" Do not move to step 2 until the user confirms one specific domain is finalized. Domain discussions may take multiple rounds — that is expected. Only carry the locked domain forward. Once the user confirms, UPDATE `research/<slug>-status.md` FIRST (tick Domain, record the chosen domain + one-line why + date, set ▶ NEXT ACTION = step 2 Stack) — then run step 2.

### 2. Stack → `pick-stack`
(Only run after domain is confirmed.) Run `pick-stack` for this project type. Present the recommended framework/libraries optimized for max page speed + top SEO, with the rationale.

**STOP. Ask:** "Does this stack work for you, or do you want to adjust anything before we design the architecture?" Do not move to step 3 until the user confirms. Once the user confirms, UPDATE `research/<slug>-status.md` FIRST (tick Stack, record the stack one-liner + date, set ▶ NEXT ACTION = step 3 Architecture) — then run step 3.

### 3. Architecture → `design-architecture`
(Only run after stack is confirmed.) Run `design-architecture`. Present the recommended system design + the "why" + the front-end system-design learning notes.

**STOP. Ask:** "Are you good with this architecture, or do you want to change anything before we build the setup checklist?" Do not move to step 4 until the user confirms. Once the user confirms, UPDATE `research/<slug>-status.md` FIRST (tick Architecture, record the design one-liner + date, set ▶ NEXT ACTION = step 4 Setup kit) — then run step 4.

### 4. Setup kit → `setup-kit`
(Only run after architecture is confirmed.) Run `setup-kit` (it delegates research to a subagent). Capture: design direction, the skills to install (with commands), and the MCPs that *could* help (as suggestions only — see MCP rule below; doc-reference MCPs become local `references/mcp/` files on approval, action MCPs get installed).

**STOP. Ask:** "Setup kit looks good to proceed?" Confirm before writing the final artifacts. Once the user confirms, UPDATE `research/<slug>-status.md` FIRST (tick Setup kit, record the design-direction one-liner + date, set ▶ NEXT ACTION = step 5 AdSense compliance) — then run step 5.

### 5. AdSense compliance → `adsense-ready` (contract mode)
(Only run after the setup kit is confirmed.) Run `adsense-ready` in **contract mode**. It produces the **AdSense Compliance Contract** for this specific product: the site skeleton (trust pages + the methodology page), the content-depth bar per route type, the interlinking map, the ad placement plan, and the pre-application gate.

**This step is not paperwork. It is the money.** Every product here is AdSense-monetized, and a site Google won't approve earns exactly $0 no matter how well it ranks. **JsonBeam was rejected for low-value content on 2026-07-08** because approval was treated as a launch-day task instead of a design constraint. This step is why that stops happening.

Two things to carry in from earlier steps:
- **The route list from step 3 (architecture)** — that is what gets audited. If it contains programmatic/templated routes, they get an explicit ruling here: differentiated, or `noindex` + ad-free. Never templated + indexed + monetized.
- **The session-depth read from the scout brief's revenue model** — a bare widget with nothing to say is *both* a low-value-content rejection *and* the 1.0-pages-per-session revenue floor. **Compliance and revenue are the same lever**, so the content ecosystem this step demands is not a tax. It is the business model.

**STOP. Ask:** "Compliance contract locked? This is what makes the site approvable — confirm before I write the handoff prompt." Once the user confirms, UPDATE `research/<slug>-status.md` FIRST (tick AdSense compliance, record the contract one-liner + date, set ▶ NEXT ACTION = write the two output artifacts) — then write the outputs.

## Output 1 — the Pre-Build Brief
Write `research/<slug>-prebuild.md` consolidating:
- **Name + domain** (chosen, with availability + handles to grab).
- **The wedge + MVP scope** (carried from scout-problem, refined).
- **Stack** (framework/libs + speed/SEO rationale).
- **Architecture** (system design + words-and-boxes diagram + scale-to-mass-traffic notes).
- **Setup checklist** (skills to install, MCPs *suggested* — not auto-installed; doc-reference MCPs noted as future `references/mcp/<tool>.md` files, action MCPs as install-on-approval, design direction) — copy-paste commands where possible.
- **AdSense compliance contract** (from step 5) — the site skeleton incl. trust pages + the methodology page, the content-depth bar per route type, the interlinking map, the ad placement plan, and the pre-application gate. **The route list here is the one the build is held to.**
- **First 3 build outcomes** — the smallest shippable slices, ready to drop into `week.md`.

## Output 2 — the handoff prompt (the deliverable for the new repo)

After the Pre-Build Brief is written, distill it into a single paste-ready prompt and save it to **`handoff-prompts/<slug>.md`** (create the `handoff-prompts/` folder if it doesn't exist). This is the artifact the user copies into a fresh repository's agent to kick off the build. Write it AS the prompt — addressed to the engineer/agent who will build it — not as notes about the prompt.

It must read like it was written by a top-0.5% engineer: precise, opinionated, no fluff, every instruction load-bearing. Required sections, in order:

1. **Role & mission.** Frame the builder as a senior/staff front-end engineer. One tight paragraph: what we're building, for whom, and the one **wedge that must never be compromised**.
2. **Operating rules.** The quality bar (ship fast, ranks #1 + loads fast beats "perfect"), code conventions, and the guardrails below — especially the **MCP rule**.
3. **Stack (pinned).** Exact frameworks/libraries/hosting, with versions where known. No ambiguity about what to install.
4. **Architecture contract.** The component model, the data schema, and the **non-negotiable invariants** (e.g. the persistence wedge, single source of truth, SEO requirements). Include the words-and-boxes diagram.
5. **Monetization contract — AdSense-ready by construction.** The step-5 compliance contract, **inline and in full**, so the prompt stands alone even if the builder never opens the skill. Sits here, before Build order, so the milestones can reference it. Must carry:
   - **The site skeleton** — the complete route list, including `/about`, `/contact`, `/privacy`, `/terms`, and a `/how-it-works` (or `/methodology`) page. State plainly that the **privacy policy is the one hard requirement in Google's policy text** and must disclose Google's advertising cookies + the opt-out links.
   - **The content-depth bar per route type** — the rule: *delete the tool mentally; if there's nothing left worth reading, it's "a screen without publisher-content" and Google will not serve ads on it.*
   - **The programmatic-route ruling**, if the architecture has any: differentiated, or `noindex` **and** ad-free. **Never templated + indexed + monetized** — that is scaled content abuse.
   - **The one-widget-many-routes ruling** — decided **now**, at scoping, because it is architectural and brutal to retrofit. If two ad-carrying routes would mount the same component, they are **one page and one doorway**, however differently they're written. Each keyword route must differ by **function** (different default mode, inputs, validation, or a capability the sibling genuinely cannot express) — not by prose, and not by a `heading` prop. GradeJar shipped five routes on two widgets, wrote 400–700 unique words on each, and **was still rejected**: unique words under an identical calculator is one tool wearing five hats. If you cannot name what a route *does* that its sibling can't, **do not create the route.**
   - **The interlinking map** — footer links every trust page from every page; zero orphans; ≤2 clicks from home; child pages link up and across.
   - **The ad placement plan** — slots reserved at first paint; **≥150px from any interactive control**; no ads on empty states or error screens; mobile ad density ≤30%.
   - **The pre-application gate** — do not submit to AdSense until all of the above is green and the site is indexed in Search Console. **A rejection restarts a 2-4 week clock.** State it as an instruction to the *human*, not a checkbox for the builder: **the Apply button is in a dashboard, so no skill can gate it — only the person can.** Nobody clicks Apply until `/adsense-ready audit` has said, in words, *"you may now apply."* **GradeJar applied on 2026-07-03 and ran the audit on 2026-07-13; Google reviewed the July 3 site and rejected it. The fixes were real, correct, and ten days too late to be in the thing being judged.** Applying early doesn't just risk a rejection — it *wastes* every fix that lands afterwards.
6. **Build order.** The first 3 outcomes as concrete milestones, each with explicit **acceptance criteria** (done = X observable). Build and deploy on the hosting platform's **preview URL** (e.g. Cloudflare Pages `*.pages.dev`) — treat **buying the domain + wiring DNS as the final go-live milestone, not a prerequisite** (unless the user says otherwise). Two compliance requirements are baked in here:
   - **The trust-page routes land in the scaffold; the trust-page *content* is a named milestone that must be green BEFORE go-live** — never bolted on after. (GradeJar built its trust pages *after* the handoff prompt, by luck rather than design. Don't repeat it.)
   - **Every milestone's acceptance criteria ends with:** *"`/adsense-ready audit` returns no new FAILs."*
7. **Definition of done / quality gates.** Core Web Vitals budget, accessibility bar, SEO checklist, tests — the measurable gates every slice must pass. Plus, alongside them: **"AdSense: `/adsense-ready audit` returns PASS. No ad-carrying route is a bare widget, and no two ad-carrying routes mount the same widget."**
8. **Guardrails / do-NOTs.** The known traps (project-specific) + the universal ones below. Always include these four:
   - Do not ship templated programmatic pages that are indexed **and** carry ads.
   - Do not place ads on empty states, error screens, or within 150px of an interactive control.
   - Do not leave the trust pages until the end.
   - Do not apply to AdSense before the pre-application gate is green.
9. **First action.** Exactly what to do first (scaffold, restate the plan back, confirm assumptions) before writing feature code. **It must open with step 0, verbatim:**

   ```
   0. Install the compliance gate. Copy
      C:\Users\ahirwar.tarun\Documents\Learning\MyProjects\TARUN-OS\.claude\skills\adsense-ready\
      into <this repo>/.claude/skills/adsense-ready/ and read it now.
      Every milestone in §6 ends with `/adsense-ready audit`
      and does not count as done until it returns no new FAILs.
   ```

   The skill is self-contained and portable by design — copying it means the new repo can run
   `/adsense-ready audit` as a real slash command at every gate, with no dependency on this repo.

### The MCP rule (must appear verbatim-in-spirit in every handoff prompt)
- **One standing exception — the Playwright MCP (`@playwright/mcp`) is pre-approved and included in every web project**, current and upcoming. It is the standard verification tool (drives a real browser to prove changes work, test the wedge, keyboard flows, screenshots). Wire it by default; no need to ask.
- **For every OTHER MCP: do NOT install, and do NOT run `claude mcp add` or edit MCP config.** They are optional power-ups, never prerequisites. If one would genuinely help, **surface it as a one-line suggestion and WAIT for explicit approval.**
- **On approval, branch by MCP type:**
  - **Doc-reference MCPs (read-only — they only fetch docs/knowledge that rarely changes, e.g. `astro-docs`): do NOT install.** Instead, thoroughly research the resource the MCP points at and write a local reference file at `references/mcp/<tool-name>.md` capturing the functions/endpoints, params, and usage patterns the MCP would have surfaced. Future sessions read that file directly — no live MCP call, far fewer tokens. The docs don't change often, so a cached local copy is the better default; refresh it on demand (see update trigger).
  - **Action MCPs (they execute things — open PRs, run queries, read/write files, e.g. GitHub / database / filesystem): these are the exemption.** A reference file can't run a command, so once approved, install the real MCP with `claude mcp add ...` at least-privilege scope.
- **Doc-reference tooling is near-default for the house Astro + Tailwind stack** (still suggest-first, but usually yes): `astro-docs` and Tailwind v4 docs pin the model to current APIs and prevent stale-syntax bugs. When approved, capture them as `references/mcp/` files per the rule above rather than installing the MCP. (A maintained local skill such as `tailwind-4-docs` (`Lombiq/Tailwind-Agent-Skills`) is already a local form and fine to add as-is.)
- **Update trigger:** when the user says "update the `<tool-name>` reference" (or similar), re-research the resource and overwrite `references/mcp/<tool-name>.md`. These files are refreshed on command, not automatically.
- The same restraint applies to any tooling install that isn't strictly required for the milestone in front of you. Suggest, don't auto-install. Keep the kit lean.

After both files are written, UPDATE `research/<slug>-status.md` one last time: tick both outputs, set **Stage = `COMPLETE — ready to build`**, and ▶ NEXT ACTION = "hand the prompt at `handoff-prompts/<slug>.md` to the new repo." Then append a decision entry to `decisions/log.md`. Close by offering to set the first build week in `week.md`, and tell the user the exact path of the handoff prompt to copy into the new repo.

## Rules
1. **Never run on an unvalidated idea.** GO from `/scout-problem` is the gate.
2. **Run steps in order; carry context forward.** The name feeds the domain; the scope feeds the stack and architecture.
3. **Each step stays its own skill.** This parent only orchestrates and consolidates — fix logic in the sub-skill, not here.
4. **End build-ready, twice.** The brief must be concrete enough to start coding; the handoff prompt must be good enough to paste into a cold repo and have a strong agent build the right thing with zero extra context.
5. **Never skip a confirmation gate.** A step is not done until the user says it is. If the user is still discussing or undecided, keep iterating — do not move forward.
6. **MCP servers and non-essential tooling are suggest-only — never auto-install — with ONE standing exception: the Playwright MCP**, which is pre-approved and included in every web project (the verification backbone). All other MCPs: recommend with a one-liner, ask first. On approval, branch by type — **doc-reference (read-only) MCPs get researched into a local `references/mcp/<tool-name>.md` file instead of installed** (saves tokens; docs rarely change, refresh on command), while **action MCPs (GitHub / DB / filesystem) are the exemption and do get installed** at least-privilege. Treat `astro-docs` + Tailwind v4 docs as near-default for the Astro/Tailwind stack, captured as reference files. Bake the Playwright-standard + suggest-first + doc-MCP-as-local-file rule into every handoff prompt you write.
7. **Domain purchase is the last step.** Unless the user says otherwise, the brief and handoff prompt build and deploy on the platform's preview URL; registering the domain and attaching DNS is the final go-live milestone, never a prerequisite. Still run live availability checks early (so the name is known to be free), but don't tell the user to buy early — flag squat risk once, then respect the decision.
8. **Keep the run resumable.** Maintain `research/<slug>-status.md` — create it on start (or resume from it), update it FIRST at every gate before advancing, and complete it at the end. A step logged after the fact is a bug: log it *before* you move on. See "## Pipeline status file".
9. **AdSense approval is a build requirement, not a launch task.** Every product here is AdSense-monetized, so **a site Google won't approve earns $0 no matter how well it ranks.** The compliance contract (step 5) is designed *into* the route list and *into* the milestones — never bolted on at go-live. Two proofs this is real: JsonBeam was rejected for low-value content on 2026-07-08, and GradeJar's trust pages were built after the fact by luck. Never write a handoff prompt without §5 and the step-0 skill copy in §9. And never present the content ecosystem as a compliance tax — **session depth and approvability are the same lever**, so it is also the cheapest revenue multiplier available.
