# Backend Resources — Node.js and .NET

.NET section seeded 2026-07-18. Node, SQL and internals sections added 2026-07-29. All links
live-verified on the date of their section.

---

## Read this before you google anything about C#

Almost everything written about .NET after ~2020 targets **.NET Core / .NET 5-10, not .NET Framework
4.8**. A tutorial that opens with `WebApplication.CreateBuilder(args)` or `dotnet new webapi` is **the
wrong .NET**. Framework 4.8 content is older by necessity — that is correct here, not a staleness smell.

Always confirm a source says *Web API 2 / MVC 5 / System.Web / Global.asax / Web.config*, not
*ASP.NET Core*. Same for C# itself: **7.3 is the ceiling**, and post-2020 C# articles will show you
`record`, `init`, and switch expressions that simply will not compile.

There is no equivalent trap on the Node side. There, newer is better and current docs are correct.

---

## C# the language, for someone who knows JavaScript

- **[Tips for JavaScript and TypeScript Developers — A tour of C# (Microsoft Learn)](https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/tips-for-javascript-developers)**
  First-party, and written for exactly this situation. Covers static typing vs `dynamic`, class vs
  struct, generics, interfaces, and why inheritance is part of the type declaration rather than a
  `__proto__` assignment. **Primary source for sessions 1 and 2.**
- [A tour of C# (Microsoft Learn)](https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/)
  The language overview the page above sits inside. Use for: filling gaps between sessions 1 and 2.
- [C# Guide — .NET managed language (Microsoft Learn)](https://learn.microsoft.com/en-us/dotnet/csharp/)
  The doc-tree root. Use for: syntax lookups mid-session.
- [Language versioning — C# reference](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/language-versioning)
  Proof of the **C# 7.3 ceiling** on .NET Framework. Use for: session 1, and any time a googled snippet
  refuses to compile.
- [Configure language version — C# reference](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/configure-language-version)
  What `<LangVersion>` does and why bumping it on Framework mostly does not work. Session 1.

> **Correction worth carrying into session 4:** the common claim "value types live on the stack" is a
> simplification. A value type declared as a local lives on the stack; a struct *field inside a class*
> lives on the heap with its parent. Teach it correctly the first time — the follow-up question is a
> standard interview trap.

## Node.js — the runtime, not the framework

- **[The Node.js Event Loop, Timers and `process.nextTick()` (nodejs.org)](https://nodejs.org/learn/asynchronous-work/event-loop-timers-and-nexttick)**
  First-party and the correct level of detail: the six phases, why `process.nextTick()` is *not* part
  of the loop, and why `setImmediate()` beats a timer inside an I/O cycle. **Primary source for
  sessions 3 and 4.**
- **[libuv — Design overview](https://docs.libuv.org/en/v1.x/design.html)**
  What is actually underneath Node. Session 3.
- **[libuv — Thread pool work scheduling](https://docs.libuv.org/en/v1.x/threadpool.html)**
  The detail that kills the "Node is single-threaded" soundbite: there **is** a pool, **default size 4**
  (`UV_THREADPOOL_SIZE`, max 1024), global across loops, and it runs all filesystem work plus
  `getaddrinfo`/`getnameinfo`. Knowing this separates a real answer from a memorised one. Session 3.

## SQL

- **[Use The Index, Luke — Markus Winand](https://use-the-index-luke.com/)**
  The free web edition of *SQL Performance Explained*. Explains indexing from the ground up, vendor
  agnostic, focused on **the B-tree**, and written for developers rather than DBAs. **Primary source for
  sessions 7 and 8.** The single best SQL resource on this list.
- [Code First Migrations — EF6 (Microsoft Learn)](https://learn.microsoft.com/en-us/ef/ef6/modeling/code-first/migrations/)
  `Enable-Migrations`, `Add-Migration`, `Update-Database`. Session 7.
- [Code First to a New Database — EF6](https://learn.microsoft.com/en-us/ef/ef6/modeling/code-first/workflows/new-database)
  The clean starting workflow for the lab's data layer. Session 7.
- [Tutorial: EF6 Code First with MVC 5 (Microsoft Learn)](https://learn.microsoft.com/en-us/aspnet/mvc/overview/getting-started/getting-started-with-ef-using-mvc/creating-an-entity-framework-data-model-for-an-asp-net-mvc-application)
  Long-form, end to end, correctly on the Framework stack. Session 7 depth.

## Machine internals

- **[Beej's Guide to Network Programming (Brian Hall)](https://beej.us/guide/bgnet/)**
  Sockets from the ground up in C: `socket`, `bind`, `listen`, `accept`, `send`, `recv`. Read **only**
  the first client/server example. The point is to see the accept loop that both Node and .NET are
  wrapping, once, so neither runtime looks like magic again. Session 3.

## ASP.NET Web API 2 — the framework

- [Get Started with ASP.NET Web API 2 (C#) — Microsoft Learn](https://learn.microsoft.com/en-us/aspnet/web-api/overview/getting-started-with-aspnet-web-api/tutorial-your-first-web-api)
  The canonical first-party Web API 2 walkthrough, on the `aspnet/web-api` (4.x) doc tree — the correct
  .NET for this track. Sessions 5 and 6.
- [.NET Framework official support policy](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-framework)
  4.8 is supported as long as its parent Windows is, but has had **no new features since 4.8.1
  (Aug 2022)**. Context for why the stack feels frozen.

## The traps — highest value in the .NET half

- **[Don't Block on Async Code — Stephen Cleary](https://blog.stephencleary.com/2012/07/dont-block-on-async-code.html)**
  **The single most important external link in this track.** Why `.Result` and `.Wait()` deadlock on
  ASP.NET Framework, from the authority on .NET async. Session 4.
- [Don't Block in Asynchronous Code — Stephen Cleary](https://blog.stephencleary.com/2012/12/dont-block-in-asynchronous-code.html)
  The companion "async all the way down" rule. Session 4.
- [ASP.NET Core SynchronizationContext — Stephen Cleary](https://blog.stephencleary.com/2017/03/aspnetcore-synchronization-context.html)
  Read **only** to understand why the deadlock **disappeared in Core**, which is exactly why modern
  advice will never warn him about it. Session 4, the "why nobody mentions this" beat.

## Tutorial platforms (Framework-era, correct stack)

- [ASP.NET Web API Tutorials — Dot Net Tutorials](https://dotnettutorials.net/course/asp-net-web-api/)
  ~17 lessons, Framework-era, including auth and message handlers. Gap-filling, and session 9.
- [Learn ASP.NET Web API — TutorialsTeacher](https://www.tutorialsteacher.com/webapi)
  Compact Web API 2 reference. Quick syntax lookups.
- [Entity Framework Tutorial — EF6 section](https://www.entityframeworktutorial.net/code-first/migration-in-code-first.aspx)
  Clear EF6-specific migration walkthroughs. Session 7.

## Wisdom (communities)

- [r/node](https://reddit.com/r/node) — for the interview half. Current practice, current opinions.
- [r/dotnet](https://reddit.com/r/dotnet) — good for *"is this pattern normal or is my codebase weird"*,
  which is exactly the question a new .NET dev cannot answer alone.
- [r/csharp](https://reddit.com/r/csharp) — language-level questions. **Tag your target framework or you
  will get C# 12 answers that do not compile.**
- [Stack Overflow — `asp.net-web-api2` tag](https://stackoverflow.com/questions/tagged/asp.net-web-api2)
  Filter by this tag specifically, never `asp.net-core`.
- **Real practice:** the highest-wisdom source for the .NET half is the actual team at work. Once
  session 6 lands, the fastest learning available is reading a real PR and asking a teammate *why* they
  did it that way. Ask about **conventions**, not syntax. Syntax is what this course is for.

## Gaps

- **No DI container resource pinned** (Unity vs Autofac vs Ninject). Pin at session 6, after checking
  which one the work codebase actually uses. That decision follows reality, not preference.
- **No logging resource pinned** (log4net vs NLog vs Serilog). Pin at session 9, same reason.
- **No testing resource pinned** (xUnit vs NUnit vs MSTest + Moq). Pin at session 9.
- **No Node interview-question bank pinned yet.** `learning/interview-qa/` covers JS fundamentals but
  stops short of backend. Pin one before session 10's mock.
- Nothing here covers the work codebase's own conventions, and nothing should — employer boundary. That
  knowledge comes from teammates and PRs, not this workspace.
