# Answers — what I actually say, per CV line

> **Built 2026-08-12.** The layer that was missing. `defend-map.md` says *which* line is risky,
> the kb modules say *what the code does* — neither one holds **the sentence you say out loud.**
> This does.

## How this folder is split, and why it is not a duplicate

`roadmap.md` §"Why the project drills have no drills/NN file" bans copying kb teaching into a second
file, because the copies drift. That rule is respected by keeping three different jobs in three places:

| Lives in | Holds | Changes when |
|---|---|---|
| `../../project-knowledge-base/<project>/` | **what the code does** — the project facts, file paths, real numbers | the repo changes |
| `answers/` (here) | **the sentence I say** + the follow-ups I will get | the CV changes |
| `concepts/` | **what the technology is** — Razor, SignalR, IE11, error boundaries | ~never (generic tech) |

**The anti-drift guard:** every answer file quotes its CV line **verbatim** at the top and links its
grounding. If the CV line changes, that file is stale — check it. Never let an answer file rehearse a
claim the CV no longer makes. *(That is exactly how `drills/00-opener.md` ended up rehearsing four
deleted claims for a week.)*

## Read budget

A sitting reads **one answer file + the concept files it links.** Never the whole folder.

---

## Opener & Summary — the two drills that come BEFORE any project

**These are NOT in this folder, deliberately.** They already have full drill files with teach block +
closed-book quiz + grading key, and duplicating them here is the drift `roadmap.md` bans. Linked so
they are findable, not copied.

| # | Drill | Lives at | State |
|---|---|---|---|
| 1 | **D00** Opener — 30s self-pitch + one pitch per project | [`../drills/00-opener.md`](../drills/00-opener.md) | ready |
| 2 | **D01** Origin & Summary — the gap, the title, the Summary line | [`../drills/01-origin-and-summary.md`](../drills/01-origin-and-summary.md) | **blocked — see below** |

> **D01 is blocked on one thing only.** §1 of that file is marked *"UNFILLED — Tarun supplies it,
> Claude never drafts it."* **Nothing in this repo records what happened between Jul 2017 and Jul
> 2021**, and a four-year gap sits on the CV in plain sight. It will not be invented or softened.
> Bring the real answer to the sitting; it gets written into §1 in his words. **The drill is not
> complete until that section is filled.**

## Dwellworks — Jun 2025 – Present

| # | Bullet | File |
|---|---|---|
| 1 | 20 mounted SPA bundles in a .NET Razor monolith, IE11 held | [01-bundles-ie11.md](dwellworks/01-bundles-ie11.md) |
| 2 | Real-time operations dashboard — Redux + SignalR | [02-realtime-dashboard.md](dwellworks/02-realtime-dashboard.md) |
| 3 | Shared component library across 20 bundles | [03-component-library.md](dwellworks/03-component-library.md) |
| 4 | Layered error boundaries + stack-trace logger | [04-error-boundaries.md](dwellworks/04-error-boundaries.md) |
| 5 | GA4 virtual pageview instrumentation | [05-ga4-instrumentation.md](dwellworks/05-ga4-instrumentation.md) |
| 6 | Client-facing — requirements, demos, ceremonies | [06-client-facing.md](dwellworks/06-client-facing.md) |

## CloudForestX — Jul 2023 – May 2025

_Not written yet. Runs at **D21**. Grounding: `project-knowledge-base/cloudforestx/04` §8/§9._
**Note before writing:** the Node/PG bullet is 🟡 pending re-grade — see `defend-map.md`.

## DentScribe — Oct 2022 – Jun 2023

_Not written yet. Runs at **D22**. Grounding: `project-knowledge-base/dentscribe/03` §10/§11._

## MyWorkMyDay — Apr 2022 – Sep 2022

_Not written yet. Runs at **D70**. No repo — mechanism only._

## devflow — the agentic workflow, built 2026-08-11

**⚠ The one folder here with no CV line.** devflow is **deliberately not on `master.tex`** (decided
2026-08-15) — he raises it verbally and shares the link if the conversation goes there. So the anti-drift
guard above ("every answer file quotes its CV line verbatim") **does not apply to this folder**; these
files are grounded in the repo at `file:line` instead, which is a stricter check, not a looser one.

**The only project here he owns outright**, and the only one an interviewer can open and read. Runs at
**D32**. Grounding: the repo itself, cited `file:line`.

| # | Answers | File |
|:--:|---|---|
| — | *(the 90-second pitch)* | **not here — `../../ai-fluency/survival-sheet.md` §0** |
| 1 | "Walk me through your workflow" | [01-the-loop.md](devflow/01-the-loop.md) |
| 2 | "How do you stop it doing something stupid?" | [02-the-guardrails.md](devflow/02-the-guardrails.md) |
| 3 | "What does orchestrating an agentic workflow mean?" | [03-the-agents.md](devflow/03-the-agents.md) |
| 4 | "You said it's tech-agnostic — how?" | [04-the-contract.md](devflow/04-the-contract.md) |
| 5 | "What's wrong with it?" + the maintenance log | [05-the-flaws.md](devflow/05-the-flaws.md) |
| 6 | "Where would you take it next?" | [06-the-roadmap.md](devflow/06-the-roadmap.md) |

> **Two rules specific to this folder.** (1) **The live project it runs on is never named or described** —
> "my current project" is the whole sentence. (2) **Practice and package are separate facts.** The way of
> working is ~a year old across several repos; the published plugin is recent. Say both, never merge
> them — the commit dates are one click away. See [devflow/README.md](devflow/README.md).

**Why the pitch is not in this folder.** It lives in `ai-fluency/survival-sheet.md` §0, which is the page
actually opened before an interview. One copy, per `roadmap.md:81`.

---

## Concepts — the "what even is this" layer

Linked from the answer files. Read the concept **once**, then the answer file makes sense forever.

| Concept | File |
|---|---|
| Razor, and why not one React SPA | [razor-vs-spa.md](concepts/razor-vs-spa.md) |
| SignalR — the server speaking first | [signalr.md](concepts/signalr.md) |
| IE11 — what it is and what it costs | [ie11.md](concepts/ie11.md) |
| Error boundaries — code, and why a class | [error-boundaries.md](concepts/error-boundaries.md) |

## The template, for when I add a file

```markdown
# Bullet N — <short name>
> "<the CV line, verbatim from master.tex>"
**Grounding:** kb `<project>/<module>` §N   **Colour:** 🟢/🟡/🔴

## Say this
<a spoken block — first person, ~60 words>

## Follow-ups they will ask
| They ask | I say |

## The boundary
<one sentence handing back what I did not build>

## Concepts
<links>

## Never get wrong
<the 2-4 facts the code would contradict>
```
