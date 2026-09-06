# 6 — Where I'm taking it, and how I got better at using AI

> **They ask:** *"Where would you take this next?"* / *"How has your use of AI changed?"*

**Colour:** 🟢 — a roadmap is a stronger answer than a feature list, because it proves you know what
your own system is missing.
**Purpose:** these are real improvements, ordered so you actually do them. Every one is also a thing to
say.

---

## Part 1 — the habits, sharpened

**You already run most of this** — it's why devflow has the shape it has; #1, #2 and #5 are visible in
the repo's own design. This section is not a starter kit. It's the sharper version of each, plus the
words for it, because *"I do this"* and *"here's why I do this and what it cost me to learn"* land very
differently in a room.

Behavioural material outranks architectural material in interviews. Architecture shows what you built;
habits show how you'd work on their codebase on a Tuesday.

### 1. Make the diff reviewable, upstream

**The habit:** if a change would produce a diff you can't read in one sitting, that's a planning failure,
not a review problem. Split the phase.

> "My rule is that if I can't explain it in a code review, it doesn't get committed. Which means the real
> work is keeping the change small enough that explaining it is possible."

### 2. Ask it to argue against its own plan

**The habit:** before approving a plan, one prompt — *"what's the strongest argument that this approach
is wrong?"* You get the tradeoff you were about to miss, for one cheap call.

> "Models are agreeable by default. If I only ever ask 'is this good', I get yes. So I ask for the case
> against, and about a third of the time it changes what I approve."

### 3. Make it explain the code back before you accept it

**The habit:** *"walk me through why this works"* on anything non-trivial. If the explanation is vague,
the code is usually wrong in a way the build won't catch.

> "A confident wrong answer and a confident right answer come out looking identical. The explanation is
> where they diverge."

### 4. Keep a log of what it got wrong

**The habit:** one line per miss. After a few weeks the *patterns* appear, and patterns are what you turn
into hooks and rules.

> "This is how I decide what to automate. A rule I have to remember is a rule I'll forget. If it got the
> same thing wrong twice, that becomes a hook or a line in the project instructions — not a note to
> myself."

### 5. Turn it off where you're building a skill

You already do this and it's your best line. Keep it: the machine-coding lab with autocomplete
deliberately disabled.

> "I use these tools heavily and I also protect the skills they erode."

### 6. Short, hand-written instruction files

**The habit:** keep `CLAUDE.md` under ~150 lines and write it yourself.

> "There's research showing auto-generated instruction files actually perform *worse* than having none —
> measurably lower task success and over 20% higher inference cost, because they fill the window with
> generic filler that crowds out what matters. The instruction file is prime context real estate. Every
> line in it is paid for on every single request, forever."

**Do this one on your live project this week.** Its `CLAUDE.md` is ~6KB. Read it and cut anything the
model could have worked out by reading the code.

---

## Part 2 — the repo work, ranked

Ordered by **(real value × interview value) ÷ effort**. Do them top down.

### 🥇 A. Wire the CI, and test the hooks — *~1 hour, do it first*

The repo's thesis is *"evidence, not assertion"* and it has **zero automated evidence about itself.**
`lint-budgets.mjs` even claims in its header that it runs in CI.

**What to do:** a GitHub Actions workflow running `node scripts/lint-budgets.mjs`, plus a small
`node:test` file for the hooks. They're pure functions over JSON on stdin, so they're unusually easy to
test: feed `guard-paths.mjs` a path, assert exit code 2.

**Why it's worth the hour:** it fixes the one irony an interviewer will genuinely enjoy pointing out, and
it puts commits on the repo on a date after 11 August, which is the maintenance evidence you need.

> "First thing I fixed was that my linter claimed to run in CI and didn't. Then I wrote tests for the
> hooks, because a workflow that exists to stop people asserting success shouldn't be asserting its own."

---

### 🥈 B. Make `compound` actually run — *10 min/week, highest ratio on the page*

`.agent/learnings/` is **empty on the live project.** The compounding claim — *"each cycle should make
the next one cheaper"* — is currently a design intention, not a fact.

**What to do:** at the end of any real work session, one entry. What surprised you, and what you changed
because of it. If nothing surprised you, write nothing — that's allowed and it's the rule in the skill.

**Why:** it converts your daily work into evidence for free, and after three weeks you have a
compounding-loop story with actual contents.

> "The learnings directory is where the loop closes. Something bites me, it goes in the file, and if it
> bites twice it becomes a hook instead of a note."

---

### 🥉 C. Get a cost number — *~30 min, and almost nobody brings one*

You can currently say nothing about what a cycle costs. The research is blunt that **a rough number beats
any definition**, and that cost modelling is over-indexed on once you're in the role.

**What to do:** extend `session-context.mjs` (or add a `stats` command) to report tokens and approximate
cost per cycle. Even ballpark. Then structure the dossier reads so the stable parts sit where prompt
caching can hit them — cache reads run about a tenth of base input price.

> "A full research-plan-implement cycle on a medium ticket runs me roughly X. The fan-out research is
> most of it, which is why the scouts run on the cheap model. Caching the dossier took it down further,
> because that content is identical across every call in a session."

---

### 🏅 D. An eval set for the workflow itself — *~3 hours, THE differentiator*

**This is the single highest-value item on this page for interviews, and it closes your named evals gap.**

Right now, when you change a skill, you have no idea whether you made it better. You're doing exactly
what you built the workflow to stop other people doing: asserting improvement.

**What to do:** pick 5 fixed, representative tasks. Run them. Record what "good" looks like for each —
did research find the right files, did the plan have real paths, did verify catch the seeded bug. Re-run
them after any meaningful change to a skill or agent prompt.

**Why it's disproportionate:** eval literacy is repeatedly named as *the* signal separating people who
have built with LLMs from people who have watched videos. Almost no candidate at your level has it. And
it turns your honest gap — *"I've never built an evaluation layer"* — into *"I built one for my own
system first."*

> "I changed a skill prompt and realised I had no way to know if it helped. So I fixed a set of five
> tasks with known-good outcomes and I re-run them when I change anything. It's crude — it's not
> LLM-as-judge, it's me checking properties — but it's the difference between changing a prompt and
> improving one."

---

### 🔒 E. Break the lethal trifecta — *~2 hours, the best security story you'll have*

Your own system has all three legs: private repo data, untrusted content (any file, any dependency
README), and external communication (`gh` in `ship`). See `05-the-flaws.md`.

**What to do, in order of cheapness:**
1. **Separate the legs in time.** `ship` already runs as its own stage — make it explicit that no agent
   which has read untrusted content is live when the external call happens.
2. **Least-privilege the external step.** `ship` needs `gh pr create` and nothing else.
3. **Human confirmation on the external action.** You already gate the plan; gate the push.

> "I checked my own workflow against the lethal trifecta and it had all three legs. So I'm separating
> them: the stage that talks to the outside world doesn't run with agents that have been reading
> arbitrary repo content, and the external step gets the narrowest permission that does the job."

---

### F. Document the fourth hook — *2 minutes*

`README.md:80` says three hooks; there are four. Trivial, but it's the first thing a careful reader
compares.

---

## Part 3 — what this sounds like in the room

> **"Where would you take it next?"**
>
> "Three things, in order.
>
> Nearest term, it needs tests and CI. It's a workflow built on the idea that you don't get to assert
> success, and it has no automated evidence about itself. That's a contradiction I'd rather fix than
> defend.
>
> Then evals. When I change a prompt I currently have no way to know whether I improved it, which is the
> same problem I built the thing to solve. A fixed set of tasks with known-good outcomes fixes that, and
> it's the piece I most want to learn properly because it generalises way past this repo.
>
> Longest term, the security shape. It has the lethal trifecta and I want the external-communication
> stage isolated from the stages that read untrusted content.
>
> Underneath all three is the same principle, which is the one I actually care about: **anything I can
> enforce in deterministic code, I should, and I should save the model's attention for things that
> genuinely need judgment.**"

**That closing line is the best summary of your engineering philosophy available.** It's true, it's
specific, and it's the opposite of the AI-maximalism most candidates bring.

---

## Follow-ups they will ask

| They ask | I say |
|---|---|
| *"How do you decide what to automate?"* | If it bit me twice, it becomes a hook. Once is bad luck, twice is a pattern, and a rule I have to remember is a rule I'll forget. |
| *"What did you get wrong about AI a year ago?"* | I thought the leverage was in better prompting. It's mostly in controlling what's in the context and in building things the model can't route around. Prompting is the smallest lever of the three. |
| *"Do you think this makes you faster?"* | On the right kind of work, a lot. On unfamiliar code it made me *slower* at first, because I was reviewing output I didn't have the context to judge. That's why the onboarding half of the workflow exists — it was solving my problem, not the model's. |
| *"What's the biggest risk with AI-assisted development?"* | Reviewing less as output volume goes up. The volume grows and the attention doesn't, so the ratio quietly gets worse. Everything I've built is basically an attempt to make that ratio structural instead of a matter of my discipline on a given afternoon. |

---

## Progress

| # | Item | Effort | Status |
|:--:|---|---|:--:|
| A | CI + hook tests | ~1 h | **✅ 2026-08-15** — 8 tests passing, CI on push + PR |
| B | `compound` running weekly | 10 min/wk | ☐ |
| C | Cost number + caching | ~30 min | ☐ |
| D | **Eval set — 5 fixed tasks** | ~3 h | ☐ |
| E | Break the trifecta | ~2 h | ☐ |
| F | Document the fourth hook | 2 min | **✅ 2026-08-15** |
| — | Cut the live project's `CLAUDE.md` | 20 min | ☐ |

**Next up: B.** It's ten minutes a week and it's the one that makes the compounding claim true. Do it at
the end of the next real work session on the live project.

**Tick these as they land.** An interviewer asking *"did you do it?"* about your own roadmap is the
easiest question in the world to answer well, and the worst one to answer with silence.
