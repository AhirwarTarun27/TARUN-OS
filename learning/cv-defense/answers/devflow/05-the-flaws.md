# 5 — The flaws, and the maintenance story

> **They ask:** *"What's wrong with it?"* — or worse, they don't ask, they just open the commit history.

**Colour:** 🟢 — this is the file that turns the weakest thing about the repo into the strongest thing
about you.
**Updated:** 2026-08-15

---

## ⛔ Get there first — and the answer is better than you think

They will click **Commits**. They will see **5 commits, all on 2026-08-11, inside 38 minutes**, with the
first one containing 97% of the code.

**That is a packaging date, not a design date, and saying so is the whole answer.**

> "You'll notice it went in as basically one commit. That's the day I wrote it down, not the day I
> worked it out. I'd been running this by hand for about a year — across my own projects and my work
> one — and the plugin is the extraction of it. Once you already know every rule you want, typing it out
> is the fast part. There's an attribution file with 16 sources showing where the techniques I borrowed
> came from, and the rest is stuff that bit me and became a rule."

**Why this is strong rather than defensive:** most candidates describe a workflow they read about. You
are describing one you converged on by repetition and then generalised. The single-sitting commit is
*evidence of that*, not evidence against it — you don't write 2,000 lines of process in one go unless
you already knew the shape.

### The line to never cross

| Say | Never say |
|---|---|
| "I've been working this way for about a year." | "This repo has been running for a year." |
| "The plugin is recent — it's the extraction." | Anything that implies the commit dates are older. |

One checkable contradiction is worth more to a skeptical interviewer than ten good answers. Keep the
practice and the package as two separate facts and you never have a problem.

**The authorship framing:** *I designed it and directed it, the prose was written with AI assistance, I
own it.* Not *"AI generated it"* — you chose the architecture, the sources, and every rule in it. Not
*"I hand-wrote it"* — the diff says otherwise, and using AI to write your AI workflow is the point, not
the embarrassment.

> **If they push on that:** "I used the tool to write the tool. If I'd hand-typed 2,000 lines of
> markdown to prove a point, that would say something worse about my judgement than about my
> discipline."

---

## The defects I found and fixed

**These are real, they were found by auditing my own repo, and each one is a commit.**

| # | Defect | Where | Fixed |
|:--:|---|---|:--:|
| 1 | README said **"Three hooks"**; `hooks.json` registers **four** (SessionStart undocumented) | `README.md:80-87` | ✅ 08-15 |
| 2 | Two user-facing strings still said the old name `devloop` instead of `devflow` | `scripts/format-file.mjs:55`, `scripts/_lib.mjs:24` | ✅ 08-15 |
| 3 | `notes` skill's example output said `14 skills`; there are 15 | `skills/notes/SKILL.md:56` | ✅ 08-15 |
| 4 | `lint-budgets.mjs` header said *"Run in CI and pre-commit"* — **neither existed** | `scripts/lint-budgets.mjs:5` | ✅ 08-15 — CI added |
| 5 | **No tests at all**, in a repo whose thesis is *"evidence, not assertion"* | — | ✅ 08-15 — 8 tests on the guard hook |

**What actually landed on 2026-08-15:** `.github/workflows/ci.yml` running the budget linter and the
tests on every push and PR, and `tests/guard-paths.test.mjs` — 8 tests covering both exit codes that
matter, the `.agent/` exemption, `allowPaths` precedence over the block list, contract-extended patterns,
and the no-contract no-op. **All 8 pass; the budget linter passes.**

> "Number four is the one that actually embarrassed me. I wrote a linter, wrote in its header that it
> runs in CI, and never wired up the CI. Which is precisely the 'should work now' failure the rest of the
> repo exists to prevent. I found it auditing my own thing, and I fixed it along with the missing tests.
>
> The tests were worth writing for a specific reason: the whole plugin rests on the claim that a hook is
> a guarantee rather than a request. That claim isn't worth making if nothing checks that exit code 2
> actually fires. The hooks are pure functions over JSON on stdin, so testing them is cheap — spawn the
> script, write a payload, assert the exit code."

**The one that would have bitten someone:** the test asserting `allowPaths` is checked **before** the
block list. If that order ever flips, a project silently loses its escape hatch for editing a generated
file — and nothing would fail loudly. That is exactly the kind of silent regression a test exists for.

**That sentence is worth more than a clean repo.** It shows you audit your own work and you can name a
failure without flinching.

---

## The design flaw I found in my own system

**This is the best thing in this file. Volunteer it.**

> "The most interesting one isn't a typo. There's a security framing I like called the lethal trifecta:
> an agent gets dangerous when it has all three of access to private data, exposure to untrusted content,
> and the ability to communicate externally. Any two is usually survivable.
>
> I went and checked my own workflow against it. It has all three. The agents read the whole repo, which
> is private. They read arbitrary files including dependency READMEs and issue text, which is untrusted
> content I didn't write. And the ship stage shells out to the GitHub CLI, which is external
> communication.
>
> Nothing has gone wrong. But I designed a system with the exact shape that's known to be exploitable,
> and I didn't notice until I went looking. That's a real gap and it's the next thing I'm fixing."

**Why this answer is so strong:** it demonstrates that you apply security frameworks to your own work
rather than reciting them, it names a real unfixed flaw without defensiveness, and it ends on a plan.
Very few candidates will produce anything like it.

---

## What I chose NOT to fix, and why

Deliberate non-fixes are as much a signal as fixes — they show you're making calls, not just reacting.

| Thing | Why it stays |
|---|---|
| The config file is still `devloop.json`, not `devflow.json` | Renaming it breaks every repo already onboarded, for a cosmetic gain. The name is history and history is cheap. |
| No `package.json`, no dependencies | Four hooks and a linter, all standard library. Adding a manifest to add nothing is how a 2,000-line repo becomes a 40,000-line one. |
| The workflow assumes one developer | It's built for how I work. Multi-developer coordination is a real problem and it isn't the one I had. |

---

## Follow-ups they will ask

| They ask | I say |
|---|---|
| *"How much of this did you actually write?"* | I designed the architecture and every rule in it, and I picked the source material — there's an attribution file with 16 sources. The prose was written with AI assistance, which is what the repo is a workflow for, so it would be strange if it weren't. I directed it, I reviewed it, I own it. |
| *"What would you change if you started over?"* | I'd wire the CI before writing the linter, and I'd design the tool permissions against the trifecta from day one instead of retrofitting. |
| *"Has it broken?"* | Yes. On my current project the full multi-document pipeline wasn't earning its overhead for the size of changes I was making, so I collapsed it into a single working document plus a run log. That adaptation is logged. |
| *"Would you use this at our company?"* | Not as-is. The contract is per-project by design, so onboarding would be step one. And I'd want to know your test situation before deciding which verification mode is honest. |
| *"Do you have tests for the hooks?"* | Now yes — that was the first thing I fixed. A repo whose thesis is "evidence, not assertion" had no automated evidence for itself, which I couldn't defend. Eight tests on the guard hook plus CI, including one asserting that the allow-list is checked before the block-list, because if that order flips a project silently loses its escape hatch. |

---

## The running log

**This section is the evidence for "I continuously monitor it."** Append one line whenever devflow
breaks, surprises, or gets adapted on the live project. **Never let this go stale — an empty log after
three weeks makes the claim false.**

| Date | What happened | What I did |
|---|---|---|
| 2026-08-11 | Onboarded a live codebase. Produced the six-file dossier | Kept it; it's what `orient` reads from |
| 2026-08-13 | Contract's inferred commands weren't right for the project | Tuned `devloop.json` by hand. The tech-agnostic design doing its job |
| 2026-08-14 | Browser verification caught an HTTP 500 on an admin dashboard a green build had missed | Banked the screenshot as evidence. **This is the story to tell about `verify`** |
| 2026-08-14 | Full spec/research/plan document split wasn't paying for itself at the change size I work at | Collapsed to one working doc + a run log. Adaptation, not abandonment |
| 2026-08-15 | Audited the repo. Found 4 documentation/naming defects, no tests, and one design flaw (lethal trifecta) | **Fixed the 4 defects. Added CI + 8 hook tests, all passing.** Trifecta hardening is the next real piece of work |

---

## Never get wrong

1. **Practice ≠ package.** A year of working this way, true. A year-old repo, false and checkable.
   Never let the two merge into one sentence.
2. **Get to the commit history before they do** — not as an apology, as the packaging-vs-design point.
   Delivered first it's a good answer; delivered second it's a save.
3. **"I designed it and directed it"** — not "AI generated it" (reads as no ownership) and not "I
   hand-wrote it" (the diff contradicts it).
4. **The trifecta flaw is unfixed.** Do not describe it as solved.
5. **Keep the log current.** A monitoring claim with a three-week-old log is worse than no claim.
