# Learning record — 0003: "Done" is a claim, output is a demonstration

**Date:** 2026-07-29 · **Type:** protocol change · **Trigger:** session 1, Build A

> **Still live as of 2026-08-15**, and the only record from the old two-stack course kept in the track —
> 0001 and 0002 were archived with the .NET material because their framing died with it. **This one got
> more important, not less.** Its C#/.NET references below are historical; the finding is not. In plain
> JS a bad submission throws loudly on line 1, which is how this was caught. **In SQL a wrong query
> returns rows, with a 200 and no stack trace.** There is no compiler and no exception to save him, so
> the run-gate is now the only feedback loop the track has. Make him state the row count he expected
> *before* he reads the one he got.

## What happened

Build A was submitted three times in one session. Twice it was reported as done or fixed without
having been run.

The second submission was the one that mattered. He had written `assignedToId` as a bare shorthand
property with no such variable in scope, which throws `ReferenceError: assignedToId is not defined`
while the array literal is still being evaluated. **Not one function in the file ever executed.** It
was reported as fixed.

The third submission ran, but still shipped a string sentinel (`'unset'`) that had been explicitly
flagged an hour earlier as the thing that would not survive Build B, and a falsy check (`!x`) that had
been explicitly named as a bug ten minutes earlier with the correct alternative given in writing.

## The finding

**Two separate failures, and conflating them would have been the mistake.**

1. **No run-gate.** He treats "I edited the file" as equivalent to "it works." This is a missing
   feedback loop, not carelessness.
2. **Corrections do not persist.** `!x` versus `== null` was not a retrieval failure. The rule was on
   screen, in writing, ten minutes old. He reached for the habit anyway.

These need different interventions. The first is a protocol fix. The second is a spaced-rep problem and
now sits on the drill board with a mandatory T7.

## Why this outranks the C# curriculum

The track exists to serve two performances: writing Node live in an interview, and reading C# well
enough not to approve a broken PR. Both collapse on this.

An interviewer watching a candidate say "done" over code that does not parse has already decided,
regardless of what the candidate knows. And a reviewer who approves without running is *precisely* the
firing risk `MISSION.md` was written around — the `.Result` deadlock and the `static` controller field
both ship exactly this way.

So this is not a study-habits nitpick. It is the same defect the mission is about, showing up on the
Node side first.

## The protocol, effective session 2

- **"Done" is not a submission.** The submission is the **output**. He runs it and reports what printed.
- **The coach reads the file before responding, every time.** This caught it once; without it the
  ReferenceError would have been coached over silently and the session would have been a total loss.
- **A correction from session N gets re-checked cold at session N+1.** Whether a correction survives
  24 hours is the single most informative measurement available on this track right now.

## What this cost

Build B and the planted-bug review, both cut. Session 1 is incomplete and session 2 does not start
until Build B is done. That is the correct trade under the daily priority rule, but it is worth naming
that the cost of three unrun submissions was the entire C# half of the session.

## Explicitly not concluded

That he is sloppy, or that he does not know JavaScript. Neither is supported. His `find`/`filter`/
template-literal mechanics were quick and correct from a blank file, and once told precisely what was
wrong he rewrote `summarize` correctly on the first attempt. The defect is in the loop, not the hands.
