# Performance profile — Backend

**Sessions banked:** 1 (session 1, **partial** — Build B and the planted-bug review were cut) ·
**Last updated:** 2026-07-29

> **REWRITTEN at every `/backend bank`. Never appended to. Hard cap: 150 lines.**
> That cap is why a bank in month six costs the same as a bank on day one. If a section grows, something
> in it stopped being true and should be cut, not stacked on.

This models **how Tarun actually performs**, not what he has covered. Coverage is `drill-board.md`.

---

## Node write fluency

| Signal | Observed |
|---|---|
| Time to first running line | Fast. Array + 3 functions from blank in ~25 min, session 1. |
| Reaches for `async/await` unprompted | Untested. Session 1 had nothing async. |
| Structures before typing, or types first | **Types first.** Wrote the data, then each function, no shape planned up front. |
| Error handling written, or added when asked | Neither. Never came up, never asked about it. |
| What he googles | Nothing observed. He guessed instead of looking, which is the finding below. |

**What is genuinely his:** `find`, `filter`, arrow functions, template literals, destructuring-free
object literals. The mechanics are not the problem and should not be drilled.

**What is not:** `undefined` vs `null` vs absent key — could not name any of the three cold. Falsy
semantics. Returning-vs-printing as a design choice.

## C# read and explain fluency

_Still no data. Build B was cut at 9:24pm session 1 and no C# was typed. Every C# row on the drill
board remains Queued, and the lesson being **read** does not count as taught._

## Planted-bug ledger

The .NET rep. Caught cold, caught on a hint, or missed entirely.

| Bug | Session | Result |
|---|---|---|
| _none fired yet — the session-1 review was cut for time_ | | |

**The three that matter most, none yet tested:** `.Result` on a Framework controller · `static` field on
a controller · lazy-loaded navigation property in a loop.

## Recurring failure modes

**A count of 3+ is a habit, not a mistake.** Habits get lesson content written for them; mistakes do not.

| Failure mode | Count | Last seen | Status |
|---|---|---|---|
| **Reports "done" / "fixed" without running the code** | 2 | 2026-07-29 | **Open.** Both claims in session 1. The second submission threw `ReferenceError` on line 1 and never executed a single function. |
| **Reads the spec's example as a literal to copy** | 1 | 2026-07-29 | Watch. `"#3 Login fails [open]"` was an output *shape*; he hardcoded `Login fails`, then half-fixed it to `Login`. |
| **Correction given, correction not applied** | 1 | 2026-07-29 | **Watch closely.** Was told `!x` is wrong because `0` is falsy, was given `== null`, shipped `!obj.assignedToId` ten minutes later. |
| Fixes the function, forgets the caller | 1 | 2026-07-29 | Watch. `summarize` became correct; the call site still summarized one ticket instead of four. |

### Disconfirmed
Predictions that reality killed. Kept struck through so they do not get quietly re-added.

- ~~"The day-1 risk is context-switch cost between static and dynamic typing in the same hour."~~
  **Wrong, and not for a good reason.** No C# was written, so it could not be tested. But the actual
  day-1 risk turned out to be nowhere near type systems: it was **not running the code**. Re-seed this
  prediction when Build B actually happens.

## The finding that outranks the rest

**He does not run it before he calls it done.** Twice in one session, and the second time the file
threw on its first line. This is not carelessness about a detail, it is a missing feedback loop:
section 8 of the lesson argued the compiler is the fastest feedback loop in C#, and the Node corollary
is that *executing it* is the only one he gets. An interviewer watching him say "done" over code that
does not parse is a failed round regardless of what he knows.

**Protocol change, effective now:** "done" is not accepted as a submission. The submission is the
**output**. He runs it and reports what printed. Coach verifies the file before responding, every time,
which caught this one and would have caught it silently otherwise.

## Carried in from other tracks

- **Retrieval-indexing gap** (`interview-qa/learning-records/0002`, 2026-07-28). Score fell *across*
  cold-drill rounds, 4/5 → 1/5 → 1/3: right rule, wrong index, fired at the surface shape.
  **Still untested here** — session 1 never reached a drill. Test at session 4 as planned. But note the
  `!x` incident is a *different* failure and should not be confused with it: that was not
  misretrieval, the rule had been stated in writing ten minutes earlier. Correction-persistence and
  retrieval-indexing are two separate things and both are now open.
- **Definitions land, application does not.** Same record. Untested here.

## Coach's standing note

_Rewritten each bank. One paragraph._

The good news is real: his JS mechanics are quick and clean, and once told exactly what was wrong he
fixed `summarize` properly on the first try. The problem is not capability, it is that he treats a
submission as a claim rather than a demonstration, and treats a correction as information received
rather than a rule adopted. Both are cheap to fix and both are fatal in an interview, which is why they
outrank every C# item on the board right now. Next session: hold the run-gate absolutely, do not accept
a "done" without output, and re-check whether a correction from session 1 survives into session 2 —
that is the single most informative measurement available.
