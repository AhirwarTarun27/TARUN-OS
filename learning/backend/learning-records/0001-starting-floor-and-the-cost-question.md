# Starting floor: strong Node dev, zero C# — and the track has a real opportunity cost

Established at kickoff (2026-07-18), when management assigned Tarun to .NET Framework backend work.

## The floor
Tarun knows Node.js and JavaScript well and ships real products. Backend *concepts* — HTTP, routing,
middleware, async, ORMs, dependency graphs — are already in place. He has **no C# and no .NET exposure**.

**Implication for ZPD:** never teach backend fundamentals. Teach vocabulary and convention mapping, and
spend nearly all lesson time on the small set of places where the Node instinct is *actively wrong*.
The clean mappings get a table row on the translation sheet and zero lesson time. See [[MISSION.md]].

The four that are worth real time, in priority order:
1. **Threading model.** Node's single thread has been silently protecting every shared variable he has
   ever written. .NET's thread pool removes that protection. This is the highest-value thing in the
   whole course and it belongs at session 4, not the end.
2. **`.Result` / `.Wait()` deadlocks on ASP.NET Framework.** JS physically cannot block on a promise, so
   he has no instinct against it. Framework-specific — it does *not* happen in .NET Core, which means
   the modern advice he will google will never warn him.
3. **DI service lifetimes.** No Node equivalent. Only teachable *after* the threading model lands.
4. **Deferred execution / `IQueryable`.** Looks exactly like `.map().filter()`, behaves nothing like it.

## The environment (verified, not assumed)
Checked on his machine 2026-07-18: VS 2022 Community + VS 2019, .NET Framework 4.8 targeting pack,
SQL Server LocalDB (`MSSQLLocalDB`), SSMS 22 all present. **No setup gate** — he can build day one.
Worth recording because "install the tooling" is normally the first week of a .NET onboarding and it
was already done here.

## The constraint that shapes every lesson
**.NET Framework 4.8 caps at C# 7.3.** No records, top-level statements, `init`, switch expressions,
file-scoped namespaces, or nullable reference types. Effectively all C# written online since 2020
assumes .NET 5+. Showing him a modern idiom that will not compile destroys trust in the lesson, so
every snippet must be dialect-checked before it ships.

## The non-obvious call: where the hours come from
This is the part most likely to be second-guessed later, so the reasoning is banked here.

Tarun is in an **active job switch** (frontend-heavy full-stack, 2-3 month target, declared 2026-07-07).
.NET Framework 4.x is legacy and is **not** the stack he is interviewing for. His day is already fully
allocated, so this track could only come from somewhere.

**Decision: it runs on employer time only** — `office-am` (3:30-5:30pm) and `office-pm` (10:00-11:30pm).
Rationale: management assigned it, so it is work, so it is paid for with work hours. The `dsa`,
`machine-coding`, `sysdesign`, and `interview-qa` blocks are the job-hunt engine and outrank it.

**The failure mode to watch for:** .NET quietly expanding into the job-hunt blocks because it has a
boss attached to it and the job hunt does not. Urgency beating importance. If that starts happening it
should be named at `/weekly-review` as a failure, not accepted as progress.

## The pedagogical call: build alongside, always
Tarun asked for this explicitly: *"just the theory is the thing which I will forget after some time.
But when I learn by doing is the stuff then it's great thing."* Every lesson ends in a `.build` step
against one spine project (HelpDesk API). A lesson with no build step is a failed lesson.

**Note the deliberate difference from [[machine-coding-system]]:** that block forbids the AI from
writing *any* code, because it trains blank-file-to-structure under pressure. This track is not that —
he cannot type C# he has never seen. The line here is: **the AI shows syntax and patterns, Tarun types
every line that goes into HelpDesk API.** Never hand him a finished class to paste.

## Not yet demonstrated
Nothing yet — this record is the kickoff. First real signal to watch for at session 1: whether the
Visual Studio project template step goes smoothly, and whether the deliberate "rename the controller,
watch the route break" step actually lands the convention-over-configuration point. If he shrugs at
that, the whole convention model needs re-teaching before session 3.
