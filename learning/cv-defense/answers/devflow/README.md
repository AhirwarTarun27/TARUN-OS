# devflow — what I say about my own workflow

> **The repo:** [`github.com/AhirwarTarun27/ai-dev-workflow`](https://github.com/AhirwarTarun27/ai-dev-workflow)
> **Local:** `C:\Users\ahirwar.tarun\Documents\Learning\MyProjects\ai-dev-workflow`
> **The practice:** ~a year, across several repos. **The plugin:** extracted 2026-08-11.
> **Running on a live codebase** since, and on his own projects before that.

This folder holds **what I say** when an interviewer opens the repo and starts asking. It is not a
tutorial for the repo — the repo documents itself. It is the spoken layer.

> ### ⛔ Not on the CV. On purpose.
>
> Decided 2026-08-15. devflow is **not** in `master.tex` and `/cv-tailor` must never add it, however well
> it matches an AI-heavy JD.
>
> **Why:** the interesting fact here is that the *practice* is ~a year old and the *package* is recent.
> That distinction survives being spoken and doesn't survive being printed — a CV line has no room for
> it, so a reader supplies the commit dates themselves and draws the wrong conclusion unchallenged.
> Spoken, he gets to lead with it.
>
> **What that costs:** the AI & GenAI cluster stays Skills-list-only, which is where ATS keywords carry
> least weight. That trade is knowing and deliberate. If applications stall specifically on AI-heavy
> JDs, it is the first thing to revisit.
>
> **What it means for these files:** they are rehearsal for a *conversation*, not defence of a line. He
> chooses when it comes up, which means he can also choose not to raise it in a room where it wouldn't land.

## Where each thing lives — do not duplicate

| Need | Go to |
|---|---|
| The 90-second pitch + the honest-state sentence | **`../../../ai-fluency/survival-sheet.md` §0** |
| The AI terminology, plain, with the sentence I say | **`../../../ai-fluency/survival-sheet.md`** Tier 1 |
| The concept taught properly | `../../../ai-fluency/lessons/` |
| **What I say about my repo** | **here** |

The pitch is deliberately **not** copied into this folder. One copy, in the page I actually open before
an interview.

## The files

| # | File | The question it answers |
|:--:|---|---|
| 1 | [01-the-loop.md](01-the-loop.md) | *"Walk me through your workflow."* |
| 2 | [02-the-guardrails.md](02-the-guardrails.md) | *"How do you stop it doing something stupid?"* |
| 3 | [03-the-agents.md](03-the-agents.md) | *"What does orchestrating an agentic workflow actually mean?"* |
| 4 | [04-the-contract.md](04-the-contract.md) | *"You said it's tech-agnostic. How?"* |
| 5 | [05-the-flaws.md](05-the-flaws.md) | *"What's wrong with it?"* — **and the maintenance story** |

## Read budget

A sitting reads **one file from this folder**, plus `survival-sheet.md` if the pitch needs rehearsing.
**Never glob this folder.**

---

## ⛔ The three rules

### 1. Never name the project

The live codebase this runs on is never named, never described, never characterised. Not its domain, not
its users, not what it does. **"My current project" is the entire sentence.** If they push, *"it's under
NDA"* is a complete and normal answer that costs nothing.

### 2. The practice is a year old. The repo is not. Keep them separate.

This is the one calibration that matters, and it cuts both ways — **don't undersell the practice, don't
oversell the package.**

| ✅ True | ❌ Not true |
|---|---|
| Been working this way ~a year, across several repos | **The repo** has been running a year — commit dates say otherwise |
| Ran project-specific versions before generalising them into a plugin | A team uses it / it has users / it's adopted |
| Onboarded a live codebase; it produced a six-file dossier | Every stage has run end to end on every project |
| Tuned `devloop.json` per project — that's what tech-agnostic *means* | It replaced my team's process |
| Browser verification caught a real HTTP 500 a green build missed | Anything about the work project itself |
| Collapsed the doc pipeline when it stopped earning its overhead | |

**Why the right column is worth guarding.** Not because modesty is a virtue in an interview — because
every item there is falsifiable in one click, and a caught overclaim retroactively discounts the true
things. The left column is strong enough on its own.

**The evidence for the left column is on disk.** `.agent/project/` holds all six dossier files,
`devloop.json` was tuned by hand on 13 Aug, `.agent/evidence/` holds browser screenshots including a
captured HTTP 500, and the run log is current.

### 3. Defend the design, not the authorship

Nobody asks who typed a line. They ask why it's shaped that way. **If you can defend the design,
authorship never comes up. If you can't, no disclaimer saves you.**

The formula: **"I directed it, I reviewed it, I own it."**

And when ambushed on a line you don't remember — **read it out loud**:
> *"I don't remember that line, let me read it. ...Okay, it's doing X because Y. I'd rewrite it as Z now."*

That is a pass. Bluffing is the only failing move.

---

## The one thing to say before they find it

They will open the commit history: **5 commits, all on 2026-08-11, inside 38 minutes.** The answer isn't
a defence, it's a distinction — *that's the day I wrote it down, not the day I worked it out.* Get there
first and it stops being a question. See `05-the-flaws.md`.
