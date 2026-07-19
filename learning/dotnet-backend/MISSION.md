# Mission: .NET Framework Backend (via Node.js)

## Why
Management assigned Tarun to .NET Framework backend work at thinksys (declared 2026-07-18). He has
no .NET background. He knows Node.js and JavaScript well — the *concepts* of backend (HTTP, routing,
middleware, async, ORMs, dependency graphs) are already in place. What is missing is **C# the
language** and **.NET's plumbing conventions**, not backend fundamentals.

So this is not a backend course. It is a **translation course**: map what he already knows onto
what .NET calls it, and spend the real time on the handful of places where the mapping *breaks*.

## The honest framing
Tarun is in an active job switch (frontend-heavy full-stack, 2-3 month target, declared 2026-07-07).
.NET Framework 4.x is legacy and is **not** the stack he is interviewing for. This track therefore
runs on **employer time only** — the `office-am` (3:30-5:30pm) and `office-pm` (10:00-11:30pm) blocks.
It must never consume `dsa`, `machine-coding`, `sysdesign`, or `interview-qa`. Those blocks are the
job-hunt engine and outrank this.

The goal is **not mastery**. The goal is *competence fast enough to be useful and unblocked at work*,
at near-zero cost to the switch. Optimize for time-to-productive, not for completeness.

## Success looks like
- Open any file in an existing .NET Framework codebase and know what every block is doing.
- Trace an HTTP request end to end: route → controller → service → repository → EF → SQL.
- Ship a small feature or bug fix without asking someone what a `DbContext` is.
- Know the three or four things that behave *differently* from Node and would otherwise cause a
  production bug: the threading model, service lifetimes, deferred LINQ execution, sync-over-async.
- Have a working, demoable app of his own to point at.

## The build (this is how the theory sticks)
Theory alone evaporates. Every session ends with code Tarun types himself into one growing project:

**HelpDesk API** — a support-ticket REST API. Tickets, Users, Comments. Chosen because it is the
exact shape of ~80% of enterprise .NET work, and because he could build the same thing in Express
in an afternoon — which makes .NET the *only* new variable in every session.

Stack, deliberately matching what he will actually meet at work:
- ASP.NET Web API 2 on .NET Framework 4.8 (C# 7.3)
- Entity Framework 6, Code First
- SQL Server LocalDB (`MSSQLLocalDB`, already installed)
- A layered solution: `HelpDesk.Api` / `HelpDesk.Core` / `HelpDesk.Data`
- Unity or Autofac for DI (Framework has no built-in container — this differs from .NET Core)

Lives at `MyProjects/HelpDeskApi/`, its own repo. Never inside the AIOS repo — a .NET solution
generates `bin/`, `obj/`, and `packages/` and would bury this workspace.

## Constraints
- **Verified environment (2026-07-18):** VS 2022 Community + VS 2019, .NET Framework 4.8 targeting
  pack, SQL Server LocalDB, SSMS 22 all present. No setup gate — he can build today.
- **C# 7.3 is the hard ceiling.** .NET Framework 4.8 cannot use records, top-level statements,
  `init`, nullable reference types, file-scoped namespaces, or switch expressions. Most C# content
  written after 2020 targets .NET 5+ and will not compile for him. Every lesson must stay in-dialect.
- **Visual Studio, not VS Code.** `dotnet new` does not scaffold Framework web projects; the old
  `.csproj` format and designer files need real VS.
- Sessions ~45-60 min, sized to fit inside an office block with actual work still getting done.
- All generated HTML is dark-themed.
- **Employer boundary holds.** No thinksys code, repo names, client names, or work specifics enter
  this workspace. Lessons teach patterns on HelpDesk API; Tarun maps them to the real codebase in
  his own head.

## Out of scope
- .NET Core / .NET 8-9 specifics, beyond one-line "this is different in modern .NET" markers so he
  is not confused when googling. If work moves to Core, the mission gets revised.
- Desktop .NET (WinForms, WPF), Blazor, MAUI.
- Deep C# language theory — reflection, expression trees, `Span<T>`, unsafe code, custom attributes.
- Becoming a .NET specialist. If this track ever starts competing with the job hunt, it gets cut
  back to the minimum that keeps work unblocked.
