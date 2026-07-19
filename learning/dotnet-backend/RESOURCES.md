# .NET Framework Backend Resources

Seeded 2026-07-18. All links below were live-verified via search on that date.

**The sourcing problem for this track, read this first.** Almost everything written about .NET after
~2020 targets .NET Core / .NET 5-10, not .NET Framework 4.8. A tutorial that opens with
`WebApplication.CreateBuilder(args)` or `dotnet new webapi` is **the wrong .NET** for Tarun. Framework
4.8 content is older by necessity — that is correct here, not a staleness smell. Always confirm a
source says *Web API 2 / MVC 5 / System.Web / Global.asax / Web.config*, not *ASP.NET Core*.

## Knowledge — the backbone

- [Get Started with ASP.NET Web API 2 (C#) — Microsoft Learn](https://learn.microsoft.com/en-us/aspnet/web-api/overview/getting-started-with-aspnet-web-api/tutorial-your-first-web-api)
  The canonical first-party Web API 2 walkthrough, on the `aspnet/web-api` (4.x) doc tree — the
  correct .NET for this track. Use for: sessions 1 and 3, project scaffolding and routing.
- [Language versioning — C# reference (Microsoft Learn)](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/language-versioning)
  Proof of the **C# 7.3 ceiling** on .NET Framework. Use for: session 2, and any time a googled
  snippet refuses to compile.
- [Configure language version — C# reference](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/configure-language-version)
  What `<LangVersion>` does and why bumping it on Framework mostly does not work. Use for: session 2.
- [Code First Migrations — EF6 (Microsoft Learn)](https://learn.microsoft.com/en-us/ef/ef6/modeling/code-first/migrations/)
  `Enable-Migrations`, `Add-Migration`, `Update-Database`. Use for: session 6.
- [Code First to a New Database — EF6](https://learn.microsoft.com/en-us/ef/ef6/modeling/code-first/workflows/new-database)
  The clean starting workflow for HelpDesk API's data layer. Use for: session 6.
- [Tutorial: Get Started with EF6 Code First using MVC 5 — Microsoft Learn](https://learn.microsoft.com/en-us/aspnet/mvc/overview/getting-started/getting-started-with-ef-using-mvc/creating-an-entity-framework-data-model-for-an-asp-net-mvc-application)
  Long-form, end-to-end, and correctly on the Framework stack. Use for: session 6 depth.
- [.NET Framework official support policy](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-framework)
  4.8 is supported for as long as its parent Windows is — but has had **no new features since
  4.8.1 (Aug 2022)**. Useful context for why the stack feels frozen.

## Knowledge — the traps (highest value in this course)

- [Don't Block on Async Code — Stephen Cleary](https://blog.stephencleary.com/2012/07/dont-block-on-async-code.html)
  **The single most important external link in this track.** Why `.Result` and `.Wait()` deadlock on
  ASP.NET Framework, explained by the authority on .NET async. Use for: session 4.
- [Don't Block in Asynchronous Code — Stephen Cleary](https://blog.stephencleary.com/2012/12/dont-block-in-asynchronous-code.html)
  Companion piece, the "async all the way down" rule. Use for: session 4.
- [ASP.NET Core SynchronizationContext — Stephen Cleary](https://blog.stephencleary.com/2017/03/aspnetcore-synchronization-context.html)
  Read *only* to understand why this deadlock **disappeared in Core** — which is exactly why modern
  advice will not warn Tarun about it. Use for: session 4, the "why nobody mentions this" beat.

## Knowledge — tutorial platforms (Framework-era, correct stack)

- [ASP.NET Web API Tutorials — Dot Net Tutorials](https://dotnettutorials.net/course/asp-net-web-api/)
  ~17 lessons on Web API basics, plus auth, message handlers, token auth. Framework-era. Use for:
  filling gaps between sessions, and session 10 (auth).
- [Learn ASP.NET Web API — TutorialsTeacher](https://www.tutorialsteacher.com/webapi)
  Compact step-by-step Web API 2 reference. Use for: quick syntax lookups.
- [Entity Framework Tutorial — EF6 section](https://www.entityframeworktutorial.net/code-first/migration-in-code-first.aspx)
  Clear EF6-specific migration walkthroughs. Use for: session 6.

## Wisdom (Communities)

- [r/dotnet](https://reddit.com/r/dotnet) — active, opinionated. Good for "is this pattern normal
  or is my codebase weird", which is exactly the question a new .NET dev cannot answer alone.
- [r/csharp](https://reddit.com/r/csharp) — language-level questions. Tag questions with your
  target framework or you will get C# 12 answers that do not compile.
- [Stack Overflow — `asp.net-web-api2` tag](https://stackoverflow.com/questions/tagged/asp.net-web-api2)
  Filter by this tag specifically, not `asp.net-core`, or the answers are for the wrong .NET.
- **Real practice:** the highest-wisdom source here is the actual team at work. Once Phase Read is
  done, the fastest learning available is reading a real PR and asking a teammate why they did it
  that way. Ask about *conventions*, not syntax — syntax is what this course is for.

## Gaps
- **No DI container resource pinned yet** (Unity vs Autofac vs Ninject). Pin at session 7, after
  checking which one the work codebase actually uses — that decision should follow reality, not
  preference.
- **No logging resource pinned** (log4net vs NLog vs Serilog). Same reason. Pin at session 9.
- **No testing resource pinned** (xUnit vs NUnit vs MSTest + Moq). Pin at session 10.
- Nothing here covers the work codebase's own conventions, and nothing should — employer boundary.
  That knowledge comes from teammates and PRs, not this workspace.
