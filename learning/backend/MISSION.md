# Mission: Backend — Node.js and .NET, taught together

_Revised 2026-07-29. Supersedes the .NET-only mission of 2026-07-18, which ran this track on employer
hours as a pure translation course._

## Why

Two real pressures, one curriculum.

**Management** told Tarun to get .NET-ready so they can shortlist him internally for a new .NET project.
He has no C# background. The code will largely be AI-assisted; what he actually has to do is *explain
it, defend it in review, and not get fired for approving something broken*.

**The job switch** (active, frontend-heavy full-stack, declared 2026-07-07) is interviewed on
**Node.js**. That is where he must write code live and answer follow-ups without hedging.

These are different skills and this course treats them differently.

| | Node.js | C# / .NET |
|---|---|---|
| Goal | Clear a backend interview | Get shortlisted internally, then hold the job |
| Performance | **Write and speak** | **Read and explain** |
| Starting point | Knows JS, Express, the ecosystem well | Zero C#, unfamiliar conventions |
| Hands-on | **Composes** from a blank file | **Transcribes** a shown pattern, then **reviews** it |
| Failure looks like | Freezing on a blank file in an interview | Approving a PR he cannot audit |

**This asymmetry is the architecture.** Typing equal amounts in both languages overspends the block on
the half that does not need composition.

## The honest framing about AI writing the code

Tarun's plan is to have AI write the high-level C#. Fine. But the firing risk was never that he cannot
*write* it. It is that he **approves** what he cannot *read*. Three examples that ship silently:

- `.Result` on a Web API 2 controller — **deadlocks** on .NET Framework, and modern .NET advice will
  never warn him because the bug disappeared in .NET Core.
- A `static` field on a controller — a race condition under a thread pool, and a complete non-issue in
  Node, which is exactly why a Node dev writes it without flinching.
- A lazy-loaded navigation property inside a loop — an N+1 nobody notices until the table grows.

None are visible without reading fluency. So the .NET skill that protects him is **code review, not
composition**, and it costs less block time than writing. **Every .NET session ends with a planted-bug
snippet he has to find and explain.**

## Success looks like

**Node (write and speak):**
- Build a small HTTP API from a blank file, live, while talking.
- Answer "what does `await` actually do" down to the microtask queue, not just "it waits".
- Say what blocks the event loop, what does not, and why that is an architectural constraint.
- Write and reason about a SQL query, and say why it is slow.

**.NET (read and explain):**
- Open any file in a Framework codebase and know what every block is doing.
- Trace a request end to end: route → controller → service → repository → EF → SQL.
- Name the four places .NET behaves differently from Node, and the *machine-level reason* for each:
  threading model, `Task` vs `Promise`, service lifetimes, deferred LINQ execution.
- Review AI-written C# and catch the three bugs above cold.
- Hold a 10-minute conversation with management about the pipeline without bluffing.

## Sequence

**C# the language comes first, and fast** — two sessions, taught purely by correlation to JavaScript,
because reading .NET is impossible without it. Then straight into .NET, which is the part that pays.

Days 1-6 produce the internal-shortlisting outcome. Days 7-10 make the interview solid. Node is written
**every single day** throughout, never deferred.

Full sequence in `reference/course-map.html`.

## Where the code lives

**Knowledge in, code out.**

```
C:\Users\ahirwar.tarun\Documents\Learning\MyProjects\backend-lab\
```

Its own repo, outside the AIOS. `node_modules` plus `bin/obj/packages` would bury this workspace and
slow every search in it. The lab is registered as an additional working directory, so a session running
from TARUN-OS can **read** the code without owning it.

**The lab never holds learning state.** Ratings, records and the drill board live here, in
`learning/backend/`. If they leak into the lab, the spaced-rep board splits in two and neither half is
true.

## Constraints

- **C# 7.3 is the hard ceiling.** .NET Framework 4.8 cannot compile records, top-level statements,
  `init` setters, nullable reference types, file-scoped namespaces, or switch expressions. Most C#
  written after 2020 targets .NET 5+ and **will not build for him**. Every lesson stays in dialect, and
  says so when the modern idiom would otherwise be the obvious answer — he *will* meet it on Stack
  Overflow and needs to recognise it as the wrong .NET.
- **Visual Studio 2022, not VS Code, for C#.** `dotnet new` does not scaffold Framework web projects;
  the old `.csproj` format and designer files need real VS. Node is written in VS Code.
- **Verified environment (2026-07-18):** VS 2022 Community + VS 2019, .NET Framework 4.8 targeting
  pack, SQL Server LocalDB, SSMS 22 all present. Node v24.13.0 (verified 2026-07-29). No setup gate.
- **Employer boundary holds.** No thinksys code, repo names, client names or work specifics enter this
  workspace. Lessons teach patterns on the lab; he maps them to the real codebase in his own head.
- Sessions are 2 hours, 3:00-5:00pm, on the sprint schedule declared 2026-07-29.

## Out of scope

- .NET Core / .NET 8-10 specifics, beyond one-line "this is different in modern .NET" markers so he is
  not confused when googling. If work moves to Core, this mission gets revised.
- Desktop .NET (WinForms, WPF), Blazor, MAUI.
- Deep C# language theory — reflection, expression trees, `Span<T>`, unsafe code, custom attributes.
- Becoming a .NET specialist. The Node half is the career; the .NET half is the job.
