# Performance profile — Backend

**Sessions banked:** 1 (session 1, **partial** — the build and the review were cut) ·
**Last updated:** 2026-08-15 (track rebuilt to Node + PostgreSQL; .NET sections cut)

> **REWRITTEN at every `/backend bank`. Never appended to. Hard cap: 150 lines.**
> That cap is why a bank in month six costs the same as a bank on day one. If a section grows, something
> in it stopped being true and should be cut, not stacked on.

This models **how Tarun actually performs**, not what he has covered. Coverage is `drill-board.md`.

---

## Node / TypeScript write fluency

| Signal | Observed |
|---|---|
| Time to first running line | Fast. Array + 3 functions from blank in ~25 min, session 1. |
| Reaches for `async/await` unprompted | **Untested.** Session 1 had nothing async. First real read at S4. |
| Structures before typing, or types first | **Types first.** Wrote the data, then each function, no shape planned up front. |
| Error handling written, or added when asked | Neither. Never came up, never asked about it. First real read at S6. |
| What he googles | Nothing observed. He guessed instead of looking, which is the finding below. |

**What is genuinely his:** `find`, `filter`, arrow functions, template literals, object literals. The JS
mechanics are not the problem and should not be drilled.

**What is not:** `undefined` vs `null` vs absent key — could not name any of the three cold. Falsy
semantics. Returning-vs-printing as a design choice.

**Carried in, untested here:** TypeScript is 🟢 anchored on the CV (CloudForestX 470 `.ts` / 0 `.js`,
DentScribe 317 / 0), so **assume TS fluency and do not spend block time teaching the type system.** If
S1-S5 contradict that, this line is the first thing to rewrite.

## SQL / PostgreSQL fluency

_No data. This is the largest genuine gap in the track and the most testable thing in an interview._
**First real measurement is S7-S9.** Seed a prediction here after S9 rather than guessing now.

## Planted-bug ledger

The review rep, retargeted from C# to Node/Postgres on 2026-08-15. Caught cold, caught on a hint, or
missed entirely.

| Bug | Session | Result |
|---|---|---|
| _none fired yet — the session-1 review was cut for time_ | | |

**The bugs that matter most, none yet tested:** missing `await` on a promise-returning call · a floating
promise that swallows its rejection · a pooled client never released (`waitingCount` climbs, then hangs)
· a `catch` that never rolls back the transaction · N+1 from lazy access in a loop · string-concatenated
SQL · an ownership check done *after* the fetch instead of inside the `WHERE`.

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
  **Dead twice over.** It was never tested (no C# was written), and the .NET half it belonged to was
  cut on 2026-08-15. The actual day-1 risk was nowhere near type systems: it was **not running the
  code**.

## The finding that outranks the rest

**He does not run it before he calls it done.** Twice in one session, and the second time the file threw
on its first line. This is not carelessness about a detail, it is a missing feedback loop.

**This got MORE dangerous when the track moved to Postgres, not less.** A JS typo throws immediately and
loudly. A SQL query that returns the *wrong rows* returns them silently, with a 200, and looks like
success. There is no compiler and no stack trace. **The only feedback loop available is checking the
output against what he expected before he looks.**

**Protocol, unchanged and now doubly binding:** "done" is not accepted as a submission. The submission is
the **output** — the printed rows, the response body, the query plan. He runs it and reports what
appeared. Coach verifies the file before responding, every time. That caught this once and would have
missed it silently otherwise.

## Carried in from other tracks

- **Retrieval-indexing gap** (`interview-qa/learning-records/0002`, 2026-07-28). Score fell *across*
  cold-drill rounds, 4/5 → 1/5 → 1/3: right rule, wrong index, fired at the surface shape.
  **Still untested here** — session 1 never reached a drill. Test at S4. Note the `!x` incident is a
  *different* failure and should not be confused with it: that was not misretrieval, the rule had been
  stated in writing ten minutes earlier. Correction-persistence and retrieval-indexing are two separate
  things and both are open.
- **Definitions land, application does not.** Same record. Untested here.
- **The CV runs ahead of the hands.** `cv-defense/skills-defense.md` grades Node, Express, REST,
  PostgreSQL and Sequelize 🟢 **anchored**. That is the premise of the whole rebuilt track and it is
  also a risk: **anchored means the code exists and does those things, not that he can reproduce it.**
  Grade what he does in the lab, never what the CV says he did.

## Coach's standing note

_Rewritten each bank. One paragraph._

The good news is real: his JS mechanics are quick and clean, and once told exactly what was wrong he
fixed `summarize` properly on the first try. The problem is not capability, it is that he treats a
submission as a claim rather than a demonstration, and treats a correction as information received
rather than a rule adopted. Both are cheap to fix and both are fatal in an interview. The track just
lost its .NET half and gained 17 days, so there is no longer any excuse of a split block — but the same
two habits will now be tested against SQL, where **wrong answers look exactly like right ones**. Session
1 of the new curriculum: hold the run-gate absolutely, do not accept a "done" without output, and
re-check whether the `== null` correction from 29 July survived three weeks. That last one is the single
most informative measurement available and it is now a genuinely cold test.
