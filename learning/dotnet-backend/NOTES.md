# Teaching Notes — .NET Framework Backend

## How Tarun wants to be taught
- **Learn by doing, always.** His words (2026-07-18): *"just the theory is the thing which I will
  forget after some time. But when I learn by doing is the stuff then it's great thing."* Every
  lesson ends in a `.build` block — code he types into HelpDesk API that same session. A lesson
  with no build step is a failed lesson. Theory is delivered *in service of* the next build step,
  never as a standalone chapter.
- **Translate, don't teach from zero.** He knows Node/Express/JS well. Never explain what middleware
  is, what REST is, what an ORM is, or what async means conceptually. Open every concept with the
  Node equivalent he already owns, then show the .NET name for it. Use the `.xlate` component.
- **Spend the time where the mapping BREAKS.** The 80% that maps cleanly deserves a table row. The
  20% that doesn't is the entire value of this course. Those are, in priority order:
  1. **Threading.** Node = one request at a time per process. .NET = thread pool, requests in
     parallel. Shared mutable state and statics are real bugs in .NET and mostly aren't in Node.
     This is the #1 thing that burns Node devs and it belongs early (session 4), not late.
  2. **`async`/`await` looks identical and is not.** `Task` is hot and can be sync-completed;
     `Promise` is always async. `.Result` / `.Wait()` **deadlocks** on ASP.NET Framework because of
     `SynchronizationContext` — and this specific bug does *not* exist in .NET Core, so most modern
     advice will not warn him. High-value, Framework-specific.
  3. **DI service lifetimes** (Singleton / Scoped / Transient) — no Node equivalent, and they only
     make sense *after* the threading model lands. Order matters.
  4. **Deferred execution in LINQ / `IQueryable`** — looks like `.map().filter()`, but nothing runs
     until enumerated, and `IQueryable` silently becomes SQL.
- **Stay in C# 7.3.** Never show him a record, top-level statement, `init` setter, switch
  expression, or file-scoped namespace. It will not compile on 4.8 and it destroys trust in the
  lesson. When a modern-C# idiom would be the obvious answer, say so explicitly and give the 7.3
  way — he *will* hit the modern version on Stack Overflow and needs to recognize it.
- **Dark theme, always.** Light HTML hurts his eyes. Every lesson/reference links `assets/course.css`.
- **Voice:** casual but professional, short sentences, no em dashes, bullets over paragraphs.

## The code rule (important, and different from `/machine-coding`)
`/machine-coding` forbids the AI from writing *any* code — that block trains blank-file-to-structure
under time pressure. **This track is not that.** He cannot type C# he has never seen; syntax
acquisition requires worked examples.

The line:
- **The AI shows** syntax, patterns, side-by-side Express↔C# snippets, and worked micro-examples.
- **Tarun types** every line that goes into HelpDesk API. The AI gives the spec and the shape,
  not the file.
- Never hand him a finished class to paste. If he is stuck, show the *pattern* on a different
  domain object and let him translate it to his.

## Cadence and placement
- Runs in the **`office-am` (3:30-5:30pm) and `office-pm` (10:00-11:30pm)** blocks. This is
  employer-mandated work, so it is paid for with employer hours.
- **It must never take a job-hunt block.** `dsa`, `machine-coding`, `sysdesign`, and `interview-qa`
  outrank this track. If .NET starts eating them, that is a failure state — flag it at
  `/weekly-review`, do not quietly let it happen.
- Office blocks are **unscored and opaque** per `daily/schedule.md`, and the employer boundary in
  `CLAUDE.md` holds inside this workspace too. `/daily-log` should note only that a .NET session
  ran and which lesson number — never work content.

## Course structure
- 10 sessions in three phases: **Read** (1-3) → **Write** (4-7) → **Ship** (8-10).
  See `reference/course-map.html`.
- Phase Read is the priority. Reading fluency is the gate for everything else, and it is what makes
  him useful at work fastest — he can be handed a bug on day one of Phase Write.
- One spine project throughout: HelpDesk API at `MyProjects/HelpDeskApi/`.

## Component library (assets/)
- `course.css` — shared dark stylesheet, palette matched to the sibling `system-design-interview`
  and `interview-qa` courses so all three read as one bookshelf.
- `quiz.js` — retrieval-practice widget (`data-correct` index; equal-length options, no formatting
  tells).
- Course-specific components, added here first and never inlined:
  - `.xlate` — the Node→.NET translation table with a "where it breaks" line. The signature
    component; most concepts get introduced through it.
  - `.trap` — full-width warning, reserved for real production-bug material (threading,
    sync-over-async, N+1). Do not dilute it with general notes.
  - `.build` — the hands-on step that closes every lesson, with an explicit "done when" line.
  - `.sbs` — side-by-side Express vs Web API code.
