# Teaching Notes — Backend (Node + .NET)

## The three laws

**1. Every C# construct is introduced beside its JavaScript counterpart. Never alone.**
He knows JS and Express well. A C# keyword that arrives without its JS twin costs him working memory he
needs for the *concept*. Use the `.xlate` component. **An `.xlate` row with an empty JS column is a bug
in the lesson**, not a construct that happens to have no equivalent — if there genuinely is no
equivalent, that is the interesting part and it gets a sentence, not a blank cell.

**2. He composes Node. He transcribes C#.**
Node is the interview performance, so the Node build starts from a blank file and the AI never writes
it. C# is the reading performance, so the pattern is shown and he types it to build syntax muscle. Never
hand him a finished class to paste on *either* side. If he is stuck on C#, show the pattern on a
different domain object and let him translate it.

**3. Every .NET session ends with a planted-bug review.**
A snippet with one real production bug in it. He finds it and says *why*, out loud. This is the skill
that keeps him employed when AI writes the code, and it is cheaper in block time than composition.
Use the `.review` component. Reserve `.trap` for the genuinely dangerous ones (threading,
sync-over-async, N+1) so it does not get diluted.

## How Tarun wants to be taught

- **Learn by doing, always.** His words (2026-07-18): *"just the theory is the thing which I will
  forget after some time. But when I learn by doing is the stuff then it's great thing."* Theory is
  delivered *in service of* the next build step, never as a standalone chapter.
- **Translate, don't teach from zero.** Never explain what middleware is, what REST is, what an ORM is,
  or what async means conceptually. Open every concept with the thing he already owns.
- **Spend the time where the mapping BREAKS.** The 80% that maps cleanly gets a table row. The 20% that
  does not is the entire value of this course. In priority order:
  1. **Threading.** Node = one request at a time per process. .NET = thread pool, requests genuinely in
     parallel. Shared mutable state and statics are real bugs in .NET and mostly are not in Node. This
     is the #1 thing that burns Node devs. Day 3, not day 9.
  2. **`async`/`await` looks identical and is not.** `Task` is hot and can complete synchronously;
     `Promise` is always async. `.Result` / `.Wait()` **deadlocks** on ASP.NET Framework because of
     `SynchronizationContext`, and this bug does *not* exist in .NET Core, so modern advice will not
     warn him. Day 4.
  3. **DI service lifetimes** (Singleton / Scoped / Transient) — no Node equivalent, and they only make
     sense *after* the threading model lands. Order matters. Day 6.
  4. **Deferred execution in LINQ / `IQueryable`** — looks like `.map().filter()`, but nothing runs
     until enumerated, and `IQueryable` silently becomes SQL. Day 7.
- **Internals arrive at the divergence, never as a prologue.** Process, thread, socket and syscall land
  on day 3 because that is where the two runtimes first disagree. Stack, heap and GC land on day 4
  because that is what makes "an `int` cannot be null" mean something. Disk pages land on day 7 under
  a B-tree. No standalone internals chapter, ever.
- **Stay in C# 7.3.** Never show a record, top-level statement, `init` setter, switch expression or
  file-scoped namespace. It will not compile on 4.8 and it destroys trust in the lesson. When a modern
  idiom would be the obvious answer, say so explicitly and give the 7.3 way.
- **Dark theme, always.** Light HTML hurts his eyes. Every lesson links `assets/course.css`.
- **Voice:** casual but professional, short sentences, no em dashes, bullets over paragraphs.

## The session (2 hours, 3:00-5:00pm)

| Time | Phase | What happens |
|---|---|---|
| 3:00-3:10 | **Cold gate check** | Yesterday's concept, spoken, no notes. Rated. **A fail re-drills yesterday instead of starting today.** |
| 3:10-3:50 | **Lesson** | The HTML lesson. Internals → JS/Node → C#/.NET → SQL where relevant. |
| 3:50-4:00 | Break | His own 50/10 rhythm. |
| 4:00-4:25 | **Node build** | He **composes** from blank. 25-40 lines. The interview rep. |
| 4:25-4:40 | **C# twin** | He **transcribes** the shown equivalent. Syntax muscle only. |
| 4:40-4:50 | **Code review drill** | The planted bug. He finds it and says why. |
| 4:50-5:00 | **Bank** | Append the translation sheet, write the record, set tomorrow's gate. |

45 of the 120 minutes are production, not reading. That is deliberate and it is the whole anti-passive
mechanism.

## The drill protocol

Carried forward from `learning/interview-qa/`, where it was invented and proved. The record there
(`learning-records/0002`, 2026-07-28) is why it exists: a cold drill scored **4/5 → 1/5 → 1/3** across
rounds and the diagnosis was **"not a knowledge gap, a retrieval-indexing gap"** — confident recall of
definitions, unreliable application. The lesson HTML alone produces exactly that. The drill is where
the real diagnosis comes from, and **the misses make better lesson content than anything written up
front**.

- **Cold-drill every lesson before moving on.** No exceptions.
- **Two ratings, because the two performances decay differently.** `W` = wrote it in Node unaided.
  `X` = explained it cold including the internals *why*. Both 1-5. Board: `drill-board.md`.
- **Reject output-only answers.** "It prints 6" is not an answer. The procedure is the answer.
- **Carry the open item forward.** Any unresolved finding becomes a `§0 Gate check` at the top of the
  next lesson, cold, before any new material. That pattern repeats for every open finding.
- **The 90-second spoken answer is the unit.** Same answer serves an interviewer and serves management.
  If he cannot say it in 90 seconds he does not have it.

## The read budget

A session reads **`profile.md` + the due rows of `drill-board.md` + today's lesson.** Never glob
`lessons/`. `profile.md` is **rewritten**, never appended, and capped at 150 lines — that is why it
costs the same in month six as on day one.

## Component library (assets/)

- `course.css` — shared dark stylesheet, palette matched to the sibling `interview-qa` and
  `system-design-interview` courses so all three read as one bookshelf.
- `quiz.js` — retrieval-practice widget (`data-correct` index). **Equal-length options, no formatting
  tells.**
- `.xlate` — the JS→C# translation table with a "where it breaks" line. The signature component.
- `.internals` — the machine-level fact that explains *why* the two differ. Sits above the `.xlate`.
- `.review` — the planted-bug drill, with a `<details>` reveal. Closes every .NET session.
- `.trap` — full-width warning, reserved for real production-bug material. Do not dilute it.
- `.build` — the hands-on step, with an explicit "done when" line.
- `.sbs` — side-by-side Node vs C# code.

## Progress log

- 2026-07-18: Workspace created as `dotnet-backend`, .NET-only, employer hours. Built the course map,
  `node-to-dotnet.html`, and Lesson 1 (The shape of a .NET app). **Zero sessions run.**
- 2026-07-29: **Mission revised and workspace renamed to `learning/backend/`.** Reframed from a .NET
  translation course into two performances: Node = write and speak (interview), .NET = read and explain
  (job). Sequence changed to put C#-the-language first, taught purely by correlation to JS, because
  reading .NET is impossible without it. Added the planted-bug review as the .NET rep, replacing
  composition. Added `drill-board.md` (T0→T2→T7→T21, separate W/X ratings) and `profile.md`. Code moved
  out of the repo to `MyProjects/backend-lab/`. Lesson 1 replaced with `0001-csharp-for-a-js-dev-the-file`.
