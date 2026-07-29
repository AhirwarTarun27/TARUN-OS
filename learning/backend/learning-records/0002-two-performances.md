# Learning record — 0002: Two performances, not one course

**Date:** 2026-07-29 · **Type:** mission revision · **Supersedes the framing in** [[0001-starting-floor-and-the-cost-question]]

## What changed

The track was seeded 2026-07-18 as `dotnet-backend`: a .NET-only translation course, run on employer
hours, explicitly forbidden from touching a job-hunt block. Ten sessions were mapped and Lesson 1 was
authored. **Zero sessions ran.**

Tarun re-scoped it on 2026-07-29. Node is now co-taught, not assumed. Workspace renamed to
`learning/backend/`.

## The finding (this is the whole record)

**Node and .NET are not two topics here. They are two different performances of one body of knowledge,
and they decay differently.**

| | Node.js | C# / .NET |
|---|---|---|
| Performance | **write and speak** | **read and explain** |
| Tested by | composing from a blank file | catching a planted bug |
| Failure | freezing in an interview | approving a PR he cannot audit |

Every design decision in this workspace falls out of that table. It is why the hands-on is asymmetric
(compose Node, transcribe C#), why the drill board carries **two** ratings (`W` and `X`), and why the
.NET rep is a code review rather than a build.

## The non-obvious call: the .NET rep is review, not composition

Tarun's stated plan is to have AI write the high-level C#, and to focus on explanation. Taken literally
that produces a curriculum with no C# hands-on at all.

**The reframe:** the firing risk was never that he cannot *write* C#. It is that he **approves** what he
cannot *read*. `.Result` on a Framework controller, a `static` field on a controller, a lazy-loaded
navigation property in a loop — three bugs a Node developer writes without flinching, none visible
without reading fluency.

So the .NET rep became a **planted-bug review**: a snippet with one real production bug, found and
explained out loud. It trains the exact skill his goal needs, it is cheaper in block time than
composition, and it is honest about the AI-assisted reality rather than pretending it away.

## The sequencing call: C# before .NET, and it is fast

The first draft went straight to internals and servers, assuming he could read C#. He caught it. Reading
C# is a hard prerequisite for reading .NET, so Phase A is two sessions of C#-the-language taught
**purely by correlation to JavaScript** — no C# construct is ever introduced without its JS counterpart
on the same line. Then straight into .NET, which is what he is actually paid for.

Corollary law, now in `NOTES.md`: **an `.xlate` row with an empty JS column is a bug in the lesson.**

## The internals call

He asked for computer internals first. Internals-first is right for retention and wrong for sequencing —
a week of CPU and memory leaves him able to explain neither backend.

**The resolution is that they are the same thing.** Every place the two runtimes diverge *is* an
internals fact: one thread plus an event loop vs a thread pool; stack vs heap and why `int` cannot be
null; epoll vs IOCP; pool starvation causing the `.Result` deadlock; disk pages under a B-tree. So
internals is not a prologue, it is the reason the comparison is interesting. It enters at the divergence
point, via the new `.internals` component, and never as a standalone chapter.

## Carried in as a prediction, not a fact

From `interview-qa/learning-records/0002` (2026-07-28): under cold drill his score fell *across* rounds,
4/5 → 1/5 → 1/3, diagnosed as a **retrieval-indexing gap** — he fires the first rule the snippet's
surface resembles instead of reading from state.

**Prediction:** this recurs here, on `Task` vs `Promise` and on value vs reference types, both of which
have many surface shapes over one rule. **Test it at session 4. If it does not recur, strike it from
`profile.md`.** It is logged as a prediction precisely so it can be disconfirmed rather than assumed.

## Not yet demonstrated

Nothing. Zero sessions have run under either mission. Every claim in `profile.md` is seeded, not
observed. The first real data point is session 1's `.review` drill.
