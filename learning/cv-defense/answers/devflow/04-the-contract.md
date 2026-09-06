# 4 — The contract, and how it stays tech-agnostic

> **They ask:** *"You said it works on any stack. How?"*

**Grounding:** `ai-dev-workflow/README.md:59-76`, `templates/devloop.json.tmpl`, `scripts/_lib.mjs:23-25`
**Colour:** 🟢 — and `testMode` is the most original idea in the repo. Spend your time there.

---

## The one line

> **Nothing hardcodes `npm`, `dotnet` or `pytest`. Onboarding writes a contract, and every skill, agent
> and hook reads its commands from that one file.**

```
        ┌──────────────────────┐
        │  .agent/devloop.json │   written once by /devflow:onboard
        └──────────┬───────────┘
                   │  every consumer reads commands from here
     ┌─────────────┼──────────────┬──────────────┐
     ▼             ▼              ▼              ▼
  skills        agents          hooks         /setup
  (verify)     (verifier)   (verify-gate)   (install/run)

  npm project        →  { "build": "npm run build",  "lint": "eslint ." }
  .NET project       →  { "build": "dotnet build",   "lint": null       }
  python project     →  { "build": null,             "test": "pytest"   }
```

**`null` means "this project has no such step", and every consumer treats null as a silent skip, never
an error.** That is what makes it work on a repo with no linter without special-casing anything.

---

## Say this

> "The workflow doesn't know what stack it's on. Onboarding surveys the repo, proposes a JSON contract
> with the project's real commands, and asks me to confirm before writing it. After that everything —
> the skills, the agents, the hooks — reads its commands from that one file.
>
> So porting it to a .NET repo is editing six strings, not rewriting the workflow. And the hooks no-op
> silently if the contract is missing, so installing the plugin can't break a repo that hasn't been
> onboarded."

**The tuning is real, and it's evidence:** you edited `devloop.json` on your live project two days after
onboarding it. That is the mechanism doing exactly what it was designed to do, on a real codebase.

---

## What's in it

| Field | Controls |
|---|---|
| `commands.{install,build,test,lint,typecheck,format,run}` | every shell command the workflow will ever run |
| `verify: ["build","lint"]` | **the ordered gate chain** the Stop hook enforces |
| `testMode: "tdd" \| "evidence"` | **which implementation loop runs** — see below |
| `browser.enabled` / `browser.url` | whether browser verification is mandatory |
| `protectedPaths[]` / `allowPaths[]` | extra blocked globs; allow is checked **first** |
| `verifyTimeoutMs` | kill time for the gate build, default 10 minutes |
| `vcs.host` / `vcs.mainBranch` | picks `gh` vs `az repos` vs `glab`; sets the diff base |

**One substitution token only:** `{file}`, and only in `commands.format`. Deliberately minimal — a
templating language in a config file is a second language to debug.

---

## The question they are actually testing

> ### *"What happens on a legacy codebase with no tests?"*

**This is where you win the conversation, because most workflow tooling silently assumes greenfield.**

```
testMode: "tdd"                      testMode: "evidence"
───────────────                      ────────────────────
real test infrastructure exists      no meaningful test suite

write a failing test                 build + lint must pass
  ↓                                    ↓
RUN IT — confirm it fails            drive the running app
for the RIGHT reason                   ↓
  ↓                                  observe the behaviour,
write the implementation             capture the evidence
  ↓                                    ↓
test goes green                      screenshot / console / network
```

> "Most of these workflows assume you have tests. Real projects often don't, and the honest answer isn't
> to pretend. So the contract has a mode. If there's real test infrastructure you get red/green TDD.
> If there isn't, the gate becomes build, plus lint, plus observed behaviour in the running app.
>
> The point is that the bar stays 'prove it', it just changes what counts as proof. What I refused to do
> was let it assert success with nothing behind it."

**The TDD detail worth volunteering:** in tdd mode it must *run the failing test and confirm it fails for
the right reason* before writing any implementation — **"a test that passes before the code exists is
testing nothing."** That's a real trap with generated tests, which have a habit of asserting something
trivially true.

**And this is what your `.agent/evidence/` screenshots are.** Evidence mode, running on a real project,
producing artifacts. You can show them.

---

## The lineage — the most valuable unwritten section in this folder

**This is where the year lives, and it's the difference between a good answer and an unanswerable one.**

You had a project-specific setup on a .NET/React codebase before the plugin existed. `verifier` and
`impact-mapper` were generalised out of it (`ATTRIBUTION.md:37-43`).

> **⚠ UNFILLED — Tarun writes this in his own words. It will not be drafted for him.**
>
> Fill in, concretely: what the earlier per-project setups were, roughly when, on which of your repos,
> what kept breaking, and which parts survived into `verifier` and `impact-mapper`. Rough dates and
> "this kept going wrong so I added that" is plenty — it does not need to be tidy.
>
> Same rule as `drills/01-origin-and-summary.md` §1: **a claim about your own history gets written in
> your words or not at all.** A drafted version would be the one paragraph in this folder you couldn't
> defend, which is exactly backwards.

**Why this is the highest-leverage thing you'll write here.** Every claim in this folder rests on
*practice preceded package* — that's what makes the one-sitting commit history a non-issue and what
turns "I built a plugin" into "I converged on this and then extracted it." Right now that claim is
asserted. **Two or three concrete before-stories make it demonstrated**, and they're the answer to the
follow-up that would otherwise land hardest:

> *"So how did you arrive at this design?"*

The strongest possible version of that answer is not architectural reasoning. It's **three specific
things that went wrong and became rules.** Nobody can rehearse those out of a blog post.

---

## Follow-ups they will ask

| They ask | I say |
|---|---|
| *"Why JSON and not YAML?"* | It's read by four Node scripts and there are no dependencies in this repo. JSON parses in the standard library; YAML would mean pulling in a package for a config file. |
| *"Why does onboard ask before writing it?"* | Because it's guessing the project's commands from CI and package files, and a wrong build command means every gate is wrong. It's the one thing worth interrupting for. |
| *"What if the commands change?"* | Re-run onboard with `refresh`, or edit six strings. I did edit it on my current project, two days in. |
| *"Isn't `evidence` mode just... not testing?"* | It's not automated testing, no. It's the honest version of what people already do on untested legacy code, made explicit and required. The alternative isn't TDD, it's nothing. |
| *"How does it know the git host?"* | `vcs.host` in the contract, so it picks `gh`, `az repos` or `glab` at runtime. Detected at onboard. |

---

## Never get wrong

1. **`null` means skip, never error.** This is the single design decision that makes it work on
   heterogeneous repos.
2. **`testMode` is `tdd` or `evidence`.** Two values. Know them.
3. **In tdd mode, the failing test must be RUN and confirmed failing first.**
4. **Hooks no-op silently without the contract** (`_lib.mjs:23-25`) — installing the plugin can never
   break an un-onboarded repo.
5. **The file is still called `devloop.json`, not `devflow.json`.** That's deliberate history, not a
   typo — but see `05-the-flaws.md`, because two *other* places still say "devloop" and those are bugs.
