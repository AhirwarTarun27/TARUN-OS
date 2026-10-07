# Alepo, Round 1: AI-First Development

> **One read, ~20 minutes. Say every ★ line out loud once. That's the prep.**
> Pair files: `alepo-round-1-soft-skills.md` (HR + salary) and `devflow-repo-tour.md` (screen-share walkthrough).
> Backup only if a line here isn't enough: `survival-sheet.md` (terms) and `../cv-defense/answers/devflow/` (repo deep-dive).

---

## 0. Three rules for the room

1. **Show only what's yours.** devflow (public GitHub) and TARUN-OS. **Never screen-share Dwellworks code.** It's client code. Talk about it, don't show it. Say "a date picker bug", not "MP-2046".
2. **Practice is not the package.** You've worked AI-first since ~Aug 2025 (Copilot, then Claude Code). devflow was *packaged* on 11 Aug 2026. Never merge those two facts into one sentence.
3. **"I directed it, I reviewed it, I own it."** That's your answer for any code AI typed.

---

## 1. Your story: three systems, in order

| # | System | When | What it is |
|---|---|---|---|
| 1 | **Dwellworks setup** | May to Jun 2026, real tickets | Hand-built `.claude/` for one legacy .NET + React app: 4 agents, 8 skills, a learning log |
| 2 | **devflow** | Packaged 11 Aug 2026, v0.3 | The generic parts of #1, made into a Claude Code plugin for any repo |
| 3 | **TARUN-OS** | Daily | Your personal AI system: 30 of your own skills, scripts, CLAUDE.md |

Plus the products shipped with the same patterns: JsonBeam (live), GradeJar, AccentWallPlanner, and a client site (Kesri Enterprise).

**Your CV line** *"AI-assisted development day to day: self-built Claude Code agents"* sits under Dwellworks. System #1 is its proof.

**How #1 became #2** (straight from the files):

| Dwellworks | devflow |
|---|---|
| `frontend-build-verifier`: runs the build, diagnoses, **never fixes** | `verifier` |
| `regression-impact-analyzer`: blast radius, gives a retest checklist | `impact-mapper` |
| `frontend-code-reviewer`: reviews the diff + traces the whole flow | `critic` |
| `learn` skill + `learning/INDEX.md` | `compound` + `.agent/learnings/` |
| `session-handoff`, `explain-flow` | `handoff`, `explain` |

★ *"I built it for one messy codebase first. Once it had earned its keep over a couple of months of tickets, I pulled out the parts that weren't project-specific and made them a plugin."*

> ⚠ **Check before you say it.** devflow's log says it also ran on your last work project for ~a week (11 to 15 Aug) and browser verification caught an HTTP 500 a green build missed. Use that only if it matches your memory. If not, drop it. Dwellworks carries the story alone.

---

## 2. The pitch, ~75 seconds ★

**"How do you use AI in your work?"**

> "Every day, but the thing I actually built is the process around it, not the prompts.
>
> On my last client project, a big legacy .NET and React app, I built a Claude Code setup for that codebase. A CLAUDE.md with hard rules. Agents with narrow jobs: one runs the build and diagnoses failures but can't edit code. One reviews in fresh context. One maps the blast radius and hands me a retest list. And a learning log, so every non-obvious bug becomes something the next session reads before it starts.
>
> Then I pulled the generic parts into a plugin called devflow. The idea: the AI researches the real code, writes a plan, and stops. One approval gate, at the plan. A bad line of code is one bad line. A bad line of plan becomes hundreds.
>
> And the guardrails are hooks, not instructions. An instruction in CLAUDE.md is a request the model can ignore. A hook is code outside the model. It can block the edit, or refuse to end the session while the build fails.
>
> Every rule in it exists because something bit me first."

Then **stop**. Let them pick the thread.

---

## 3. The questions the JD says they'll ask

### Q1. "Walk us through a recent Claude Code session: prompts, accepted, rejected." ★

**The date picker story** (Dwellworks, 26 Jun 2026). Tell it in this order:

1. **Problem.** The date-of-birth picker only jumped ±7 years. Old birth years were unreachable.
2. **First prompt, roughly:** *"Find the root cause. Cite file and line. Don't change anything yet."* Research before fix, always.
3. **Found.** The limit lives inside a vendored library: one 404 KB minified file.
4. **Rejected: editing the vendored file.** A diff inside a minified one-liner can't be reviewed, and the next library update silently wipes it.
5. **Accepted: a runtime override.** A small patch file of our own that replaces one method (`getYears`) at load time. The library stays untouched.
6. **Why I trusted it.** It didn't assume. It grepped the minified file to prove the method names survived minification and that the patch loads before Vue caches the component.
7. **The trap I checked.** The library loads through **11 bundles**, not one. Patch one and the page you test looks fixed while 10 others stay broken. And the bundle config is compiled C#, so a browser refresh shows nothing. You need a rebuild, or "the fix doesn't work" is a false alarm.
8. **What I kept.** Wrote it to the learning log. The next session that touches a date picker reads it first.

> If you remember the exact prompts, use yours. Saying "roughly" is honest and normal.

### Q2. "Name a class of error your AI tools produce. How do you catch it before merge?" ★

**The class: locally correct, globally incomplete.** It fixes the place it looked at and misses the other places the same rule lives.

> "Real example: Province had to be required for Canada. The fix relaxed the backend validator and looked done. But the same rule lived in three places: the backend validator, a JS 'required' marker, and a JS precheck before submit. The precheck still had the old condition. So the user clicked Accept and nothing happened. No error, just silence.
>
> How I catch it: I don't rely on the reviewer noticing. My review agent's prompt literally tells it to find code that should have changed but didn't. A separate impact agent greps every consumer of what changed and gives me a retest list. Then I test the real flow in the browser, because a green build says nothing about a click that does nothing."

**Second class, if they want one: over-broad bulk edits.** Asked to swap a repeated colour hex for a SCSS variable, `replace_all` also replaced the value inside the variable's own declaration: `$fh-color-text: $fh-color-text;`. Catch it by reading the diff at its edges. The declaration is the first place to look.

**Third, one line: claiming "done".** devflow's Stop hook won't let the turn end while build or lint fails. Its error message says *"do not weaken or delete tests"*, because deleting the failing test is the easiest way to pass.

### Q3. "How do you write a CLAUDE.md / AGENTS.md?"

> "It's paid for on every request, so it holds rules and pointers, not knowledge. At Dwellworks it had a NEVER list and an ALWAYS list. Don't edit generated files or migrations. No new dependencies without approval. Confirm before touching auth or the schema. And one pointer: check the learning index before implementing. The depth lives in files loaded only when needed."

- **AGENTS.md** is the cross-tool file. In your portfolio repo, CLAUDE.md is one line, `@AGENTS.md`, so every tool reads the same rules.
- **Say the flaw first:** "My Dwellworks and TARUN-OS CLAUDE.md files grew past 25 KB. Too big. My AccentWallPlanner one is under 3 KB and it's the better design: it just says *read the memory bank first*."

### Q4. "Have you configured MCP servers?"

> "Per project, in `.mcp.json`. My product repos run the Playwright MCP, so the agent drives the real app in a browser and reads console and network, not just the build. One also has Chrome DevTools MCP.
> My rule: MCPs that only fetch docs, I don't install. I save the docs to a local file once. MCPs that execute things get installed, least privilege."

- **Trap: "What does MCP give you over a normal function?"** Reuse, not capability. Write the server once, any client uses it.
- **Risk:** an MCP that reads untrusted text is a prompt-injection door (see Q7).

### Q5. "How do you review AI output? Who's accountable?" ★

- **Small diffs, fixed upstream.** 800 lines can't be reviewed. That's a planning failure. One phase at a time, each committed.
- **Gate at the plan.** I review the decision, not only its consequences.
- **Fresh-context reviewer.** The thing that wrote it shouldn't grade it. And it's told it may find nothing, or its findings turn into noise.
- **Evidence, not assertion.** Build, lint, then drive the real app. "A clean screen with a failed request behind it is the most common false pass."

Close with: *"If I can't explain a line in code review, it doesn't merge. I directed it, I reviewed it, I own it."*

**Bonus:** at DentScribe you built the *product* version of this: the screen where clinicians review and edit AI-generated notes section by section before signing.

### Q6. "Where don't you use AI?"

> "Long leash where mistakes are cheap and reversible: scaffolding, spikes, test setup. Line by line on auth, money and production data. And off entirely when I'm building a skill I need to own. I built myself a machine-coding practice lab with autocomplete disabled, because AI was eating my blank-file muscle."

### Q7. "What about security / prompt injection?"

> "The model can't tell my instruction from text it read. The frame I use is the lethal trifecta: private data, untrusted content, and a way to send data out. Any two is usually OK. All three is exfiltration. You don't fix it in the prompt. You cut a leg or limit the tools."

**Bonus, very strong:** "I checked devflow against it. It has all three: it reads the private repo, reads untrusted files, and `ship` calls the GitHub CLI. Not fixed yet. It's next."

### Q8. "Evals for AI-generated code?" (your honest gap)

> "Honest gap: I haven't built an eval layer. What I'd build first is simple: five fixed tasks with known-good outcomes. Did research find the right files? Did the plan cite real paths? Did verify catch a seeded bug? Re-run after every prompt change, because prompt changes are silent regressions."

**Test scaffolds** (for the QA-pod question): devflow has two modes.
- `tdd`: write the failing test, **run it, confirm it fails for the right reason**, then implement. "A test that passes before the code exists tests nothing."
- `evidence`: for legacy code with no tests. Build + lint + observed behaviour in the running app.

### Q9. "Ambiguous requirements? Pushing back on a spec?"

- **Canada Province:** as the frontend dev, you wrote the backend handoff spec with the exact error keys the UI reads. The written spec said "always required". The annotated screenshots said the departure side is only required when the Departure service is selected. You flagged the conflict and wrote down which source wins.
- **Orders redesign:** 9 design screenshots, then an impact analysis *before* any code. Every modal it reuses, every flow it touches.

### Q10. "How would you mentor juniors on AI?"

> "Pair on the plan, not the code. Teach three habits: ask it for the case against its own plan. Make it explain the code back before accepting it. Log every miss, because the second time it's a pattern, and a pattern becomes a rule or a hook."

### Q11. "Why Alepo?"

> "You're building on purpose the way I've been working on my own: small pods, AI-first, judgment over keystrokes. And carrier-grade software is exactly where review discipline stops being optional."

---

## 4. Their rubric, mapped

*Inferred from the JD. You haven't seen their scoring sheet.*

| Dimension | Your evidence in one line |
|---|---|
| **Mindset** | AI first, and you protect the skills it erodes (the no-autocomplete lab) |
| **Strategy** | One gate at the plan. Fan out to read, single-thread to write. Cheap model to search, expensive model to plan and review |
| **Building** | Agents, skills, hooks, MCP config, learning logs, across 3 systems and 5 repos |
| **Accountability** | Hooks, not instructions. Evidence, not assertion. Fresh-context review |

**L3 ("patterns you reuse, a context library you maintain"):** the `.claude/learning/` folder pattern repeats across Dwellworks, Kesri and GradeJar. The `adsense-ready` skill is copied into every product repo. TARUN-OS *is* the library.

---

## 5. Rapid-fire terms (one line each)

- **Context rot:** quality drops as the window fills, long before the limit. So less context, not more.
- **Context engineering:** deciding what's in the window at all. Yours: read budgets, subagents, notes on disk, handoff then restart.
- **Agent vs workflow:** workflow = I pick the steps. Agent = the model picks. Yours is a workflow on purpose, agentic inside each step.
- **Tool calling:** the model does **not** run the function. It asks; your code runs it. ★ Volunteer this one.
- **Subagent:** a separate context window that returns a summary. The isolation is the point.
- **Temperature 0:** not deterministic. Only closer.
- **RAG:** fetch your data and put it in the prompt. DentScribe grounded notes in chart data fetched by ID.
- **Fine-tuning:** changes form, not facts. Facts go in retrieval.
- **Prompt caching:** cache the stable prefix. Cached reads cost ~10% of normal input.

---

## 6. Boundaries: say them before they find them

- Never trained or fine-tuned a model.
- No vector store in production.
- No eval layer yet (but you know what you'd build: Q8).
- devflow is young: v0.3, one user (you), packaged 11 Aug.
- DentScribe: you built the portal, not the AI pipeline or the prompts.

---

## 7. If they ask you to screen-share

About 2 minutes each, in this order:

1. **devflow `README.md`**: the loop diagram. Point at the one gate.
2. **`hooks/hooks.json`, then `scripts/verify-gate.mjs`**: exit code 2 blocks. Line 22 (`stop_hook_active`) stops it looping forever. Then the "do not weaken or delete tests" message.
3. **`ATTRIBUTION.md`**: 15 sources. Techniques borrowed, no text copied.
4. **TARUN-OS `CLAUDE.md`**: the skills list. Then the machine-coding lab with autocomplete off.

**Numbers to know cold:** 15 skills · 5 agents · 4 hooks · 1 gate · exit code 2 · 8 tests.
**Model tiering:** scout = Haiku · verifier = Sonnet · architect, critic, impact-mapper = Opus.

If they open the commit history: *"5 commits in one afternoon. That's the day I wrote it down, not the day I worked it out."*

---

## 8. Night before: 10 minutes

Out loud, once each: the pitch (§2), the date picker (Q1), "locally correct, globally incomplete" (Q2), the boundaries (§6). Then sleep.

**Within an hour after:** write down every question you didn't have a sentence for. Then `/console log`.
