# devflow: Repo Tour

> **For screen-sharing `github.com/AhirwarTarun27/ai-dev-workflow`.** One line per file. ~10 minutes to read.
> Sections run in the order to click. Pair files: `alepo-round-1.md` (AI answers), `alepo-round-1-soft-skills.md`.

## The 10-second version ★

> "It's a Claude Code plugin. **15 skills** are the steps. **5 agents** do narrow jobs. **4 hooks** enforce the rules in code. And **one JSON contract** makes it work on any stack."

---

## The map

```
ai-dev-workflow/
├── README.md              the loop + install. START HERE
├── ATTRIBUTION.md         15 sources, techniques only, no copied text
├── LICENSE                MIT
├── .claude-plugin/        makes it an installable plugin
├── .github/workflows/     CI: budget linter + hook tests
├── skills/     (15)       the steps you type: /devflow:<name>
├── agents/     (5)        specialists the skills delegate to
├── hooks/hooks.json       wires 4 events to 4 scripts
├── scripts/               the hook code, plain Node, zero dependencies
├── templates/             what onboard writes into a project
└── tests/                 8 tests on the guard hook
```

---

## 1. Root files

| File | What it does |
|---|---|
| `README.md` | The loop diagram, install, how it stays tech-agnostic, the guardrails table. **Open this first.** |
| `ATTRIBUTION.md` | 15 sources (Anthropic, HumanLayer, Simon Willison, Matt Pocock...). What was taken is *method*, never text. |
| `.claude-plugin/plugin.json` | The plugin's identity: name `devflow`, version `0.3.0`. |
| `.claude-plugin/marketplace.json` | Lets anyone install it with `/plugin marketplace add AhirwarTarun27/ai-dev-workflow`. |
| `.github/workflows/ci.yml` | On every push and PR: runs the budget linter and the hook tests. Nothing to install. |

---

## 2. `skills/`: the 15 steps

**Joining a repo (run once)**

| Skill | Does | The line worth saying |
|---|---|---|
| `onboard` | Surveys the repo. Writes the dossier, the `devloop.json` contract and a project `CLAUDE.md` | "One expensive survey, read by everything after it." It **asks me to confirm** the commands before writing |
| `setup` | Checks prerequisites against my machine, fixes gaps, starts the app, proves it runs | Onboarding isn't done until it actually runs |
| `orient` | Teaches **me** the project in short tiers: business, architecture, flows, running | Solves my problem, not the model's: I can't review code I don't understand |

**The loop, in order**

| Skill | Does | The line worth saying |
|---|---|---|
| `kickoff` | Runs spec → research → plan, then **stops** for my approval | Asks in a way that doesn't invite a reflexive "yes" |
| `spec` | Interviews me about the hard parts and writes a spec | **Skippable.** Clear tickets don't need it |
| `research` | Reads the real code: where it goes, what to copy, what exists. `file:line` citations | **Required.** A plan without research is fiction |
| `plan` | Writes a phased plan to disk. Opens with a plain-English walkthrough | Each phase has exact file paths and its own verify step |
| **⛔ I APPROVE** | **The only gate in the system** | "A bad line of plan becomes hundreds of lines of code" |
| `implement` | One phase at a time. Verifies and commits each phase. **Arms the build gate** | Single-threaded writes. Commits are save points |
| `verify` | Runs build + lint, then drives the real app in a browser, reads console and network | "A clean screen with a failed request behind it is the most common false pass" |
| `review` | Fresh-context adversarial review + blast-radius map, in parallel | The reviewer is told it **may find nothing** |
| `ship` | Commit, push, open the PR. Detects GitHub / Azure / GitLab. **Disarms the gate** | **Never merges.** Merging is a human call |
| `compound` | Captures the one lesson this cycle taught | Once is a note. Twice becomes a rule or a hook |

**Any time**

| Skill | Does |
|---|---|
| `explain` | Traces any feature, file or PR end to end, with a diagram and `file:line` citations. For when there's no ticket |
| `notes` | Lists what the repo has: past learnings, the dossier, which skills and agents are active |
| `handoff` | Writes a structured summary before I clear context, so a fresh session continues cleanly |

---

## 3. `agents/`: 5 specialists, and **none of them can fix anything**

| Agent | Model | Tools | Job |
|---|---|---|---|
| `scout` | **Haiku** (cheap) | Read, Grep, Glob only | Answers one narrow "where is X?" question. "Read widely, report narrowly" |
| `architect` | **Opus** | + Write | Writes the plan file. **Only** the plan file, never source code |
| `verifier` | **Sonnet** | Bash, Read, Grep | Runs the checks and diagnoses to file and line. **Reports, never repairs** |
| `critic` | **Opus** | Read, Grep, Glob, Bash | "Is this right?" Correctness, security, spec compliance |
| `impact-mapper` | **Opus** | Read, Grep, Glob, Bash | "What else breaks?" Traces every consumer, gives a retest checklist |

★ **Say:** *"Cheap model to search, expensive model to plan and review. Those are the two places being wrong is costly."*
★ **Say:** *"Fan out to read, single-thread to write. Parallel readers are great. Parallel writers make conflicting decisions."*

---

## 4. `hooks/hooks.json` + `scripts/`: the guardrails ★

`hooks.json` just maps events to scripts. **The scripts are the real thing.**

| Script | Fires on | Does |
|---|---|---|
| `guard-paths.mjs` | **PreToolUse** (Edit / Write) | **Blocks** edits to secrets, lockfiles, `dist/`, `node_modules/`, vendored code. **Exit 2 = blocked**, and the reason goes back to the model |
| `format-file.mjs` | **PostToolUse** (Edit / Write) | Runs the project's own formatter on the file just edited. Silent, never blocks |
| `verify-gate.mjs` | **Stop** (end of turn) | **Won't let the turn end** while build or lint fails. Only armed during `implement` |
| `session-context.mjs` | **SessionStart** | Injects stack, verify chain, the active plan, and whether the gate is armed |
| `_lib.mjs` | (shared) | Reads the hook's JSON from stdin, finds the project root, loads the contract, holds the protected-paths list |
| `lint-budgets.mjs` | CI | Caps skills at **100 lines**, agents at **80**. Every loaded line costs tokens for the rest of the session |

**The four details in `verify-gate.mjs` that prove you wrote it:**
1. **Armed by a marker file** (`.agent/state/active-gate`). Otherwise every casual question would trigger a full build.
2. **Line 22, `stop_hook_active`**: stops the hook from looping on its own retry.
3. **Can't trap you**: Claude Code force-ends after 8 blocks in a row.
4. **Its error message says "do not weaken or delete tests"**, because deleting the failing test is the easiest way to pass.

★ **Say:** *"An instruction in CLAUDE.md is a request the model can ignore. A hook is not."*

---

## 5. `templates/`: what onboard writes into a project

| File | Becomes |
|---|---|
| `devloop.json.tmpl` | `.agent/devloop.json`, **the contract**. The project's real build, test, lint and format commands. **`null` = this project has no such step, so skip it silently** |
| `CLAUDE.md.tmpl` | The project's `CLAUDE.md`. Under 150 lines. Test for every line: *"Would removing it cause a mistake? If not, cut it."* |
| `gitignore-block.txt` | Adds `.agent/` to the project's `.gitignore` |

**Key contract fields:** `verify` (which checks the gate runs) · `testMode` (`tdd` or `evidence`) · `protectedPaths` / `allowPaths` · `vcs.host`.

★ **Say:** *"Nothing hardcodes npm or dotnet. Moving it to a new stack means editing six strings."*
★ **`testMode`:** `tdd` = write the failing test, **run it, see it fail**, then build. `evidence` = no real tests, so prove it with build + lint + the running app.

---

## 6. `tests/guard-paths.test.mjs`: 8 tests

Checks both exit codes (2 blocks, 0 allows), that `.agent/` is exempt, and that **`allowPaths` is checked before the block list**. If that order ever flipped, a project would silently lose its escape hatch.

★ **Say:** *"The whole plugin claims a hook is a guarantee. That's only worth saying if something tests it."*

---

## 7. What it creates in a project: `.agent/` (gitignored)

```
.agent/
├── devloop.json     the contract
├── project/         the dossier: business, architecture, flows, running,
│                    conventions, open-questions (what the code could NOT tell you)
├── specs/ research/ plans/     one file per ticket
├── learnings/       gotchas worth keeping
└── state/           active-gate (the marker), last-verify.json (proof it passed)
```

★ **Say:** *"Everything AI-related stays out of the repo's history. The team sees normal commits."*

---

## 8. If they point at something

| They notice | You say |
|---|---|
| **Commit history: 5 commits in one afternoon (11 Aug)** | *"That's the day I wrote it down, not the day I worked it out. I'd been running it by hand on my last client project first."* |
| **The 15 Aug commit is titled "Fix stale devloop naming" but also adds CI and tests** | *"Fair catch. That should have been two commits. The message undersells it."* |
| **"Why is the config `devloop.json`, not `devflow.json`?"** | *"Old name. Renaming it would break every repo already onboarded, for a cosmetic gain."* |
| **"No `package.json`?"** | *"Only Node built-ins. Nothing to install, nothing to break."* |
| **"`onboard` is exactly 100 lines"** | *"It's at the budget cap. The linter would fail at 101."* |
| **"Why cap file length at all?"** | *"The setup this came from drifted to about 40% pasted boilerplate. A loaded skill stays in context all session, so length is a recurring cost."* |
| **"What's missing?"** | *"Evals: when I change a prompt I can't yet prove it got better. And the lethal trifecta: it reads the private repo, reads untrusted files, and `ship` talks to GitHub. Isolating that is next."* |
