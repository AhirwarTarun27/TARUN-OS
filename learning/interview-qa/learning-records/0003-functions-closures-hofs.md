# Learning record — Lesson 0003: Functions, Closures & HOFs

**Drilled:** 2026-07-30 · 9 cold snippets, 2 rounds, no notes, no running code.

## Score

| Round | Snippets | Clean | Notes |
|---|---|---|---|
| 1 | 5 | 2 | 3 misses, all one root cause |
| 2 | 4 | 3 | root cause fixed; 1 miss is an isolated operator fact |

## The finding (this is the whole record)

**Not a closure gap. A read-point gap.** He captures the value a binding held when he first met it,
then never re-reads it after something changes it.

| Round 1 | He read the binding as of… | Actual read point | Said | Actual |
|---|---|---|---|---|
| Q2 counter, `++n` | the moment `make()` returned (`n=0`) | after two `inc()` calls | `1 1` | `2 1` |
| Q3 `var i` loop | the iteration that created the fn | the `console.log`, after the loop | `0 2` | `3 3` |
| Q5 `nums.push` | before the push | after the push | `3` | `4` |

Q1 and Q4 were clean — both are cases where the write and the read sit on adjacent lines. Every miss
put a **time gap** between the write and the read. L2's three-question procedure silently assumes the
read happens on the line you're looking at, so it doesn't fire across that gap.

Q3 is the aggravating one: it's L2's "prints 6" loop and the `3 3 3` twin that Lesson 3 deliberately
re-used. Seen three times, still missed. His comment described what `let` would do.

Q5 is the L2 failure mode recurring verbatim: he wrote `original array = [1,2,3,4]` on one line and
printed `3` on the next. **Correct mechanism stated, wrong value reported.**

## Round 2 — the fix works

Four snippets, every one separating the write from the read, with an instruction to name the moment
each function runs.

- **Q6** live binding read at call time → clean, correct reason.
- **Q8** `let` loop *and* `var` loop in the same snippet → `0 2 3 3`, both halves, right mechanism for
  each. **This is Q3 corrected.** He now holds "fresh binding per iteration" and "one shared binding"
  apart instead of firing whichever he saw last.
- **Q9** `map` copies values out, so a later `nums[0] = 99` doesn't leak into `doubled` → clean. This is
  the *inverse* of Q6 and he kept them apart — the discrimination, not just the rule.
- **Q7 ✗** `() => n++` → said `1 2 3`, actual `0 1 2`.

The read-point gap closed as soon as the procedure had a question aimed at it.

## What was solid

- `TypeError` — **the L2 open item, closed cold, first try, unprompted** (Q1, `const` reassignment).
  Named the error correctly and flagged halted execution. One more cold hit at the M5 `Object.freeze`
  drill and it's done.
- Closure independence per factory call: got this on Q2 even while getting the value wrong — `b` was
  correctly unaffected by `a`.
- `once` (Q4) fully correct, right reason.
- Procedure applied unprompted in both rounds, per-line annotation throughout. The L2 behavior gate
  held under new material.

## The fix issued

Patched Lesson 3 with **§3b "The fourth question"**:

- *When does this function actually run — and what is the binding at that moment?* Never read a
  closed-over variable at the line where the function was written.
- A captured-vs-copied table (live binding / shared `var` / per-iteration `let` / parameter / `map`
  values) — every Round 1 miss and every Round 2 snippet is a row.
- The mutation-persists note: the environment is rebuilt per call of the *factory*, not per call of
  the closure.
- A pre/post increment callout, since that was the only surviving miss.

## The one item still open

**Pre vs post increment as a returned value.** `n++` returns the old value, `++n` the new. He answered
Q2 (`++n`) as if it were a snapshot and Q7 (`n++`) as if it were pre-increment — wrong in opposite
directions, and he skipped the direct question asking him to distinguish them. Behavior of the side
effect is understood; the return value isn't tracked.

Isolated fact, not a reasoning failure — same category as L2's `TypeError` item, which this session
closed. So it carries the same way: **cold re-test at the top of Lesson 4's §0 gate check.**

## Verdict

**Gate passed → cleared for Lesson 4 (`this`, objects & prototypes).** The read-point failure is
fixed and demonstrated on three deferred-read snippets in a row. Further closure drilling has hit
diminishing returns.

## Caveat on this gate (added same day)

This gate was passed on **output prediction only**. The theory half of M3 — "what is a closure",
"pure vs impure", "why can't an arrow be a method", "callback vs HOF" — was never spoken out loud.
Per the drill-format change locked in `NOTES.md` on 2026-07-30, that is now half a drill, not a whole
one. **Owe: the M3 speak-half, to be run as part of Lesson 4's §0 cold open** alongside the pre/post
increment item. M3 stays `done` for sequencing, but its verbal coverage is unproven.

---

# Session 2 — 2026-07-31 · the owed speak half + re-drill

Run because the 07-30 gate was passed on output prediction only. Three halves: §0 gate check,
speak (S1-S7), predict (Q1-Q5). Cold, no notes, no running code.

## Score

| Half | Result |
|---|---|
| §0 — pre/post increment | **Missed cold**, taught, then **passed twice unprompted** (Q1, Q5) |
| Speak — S1-S7 | 5 pass, 1 miss (HOF vs callback), 1 half (memory leaks) |
| Predict — Q1-Q5 | 3/5 |

## The finding (this is the whole record)

**Closures are not the weak spot. Naming things is.** Every single miss across all three halves was
a **label or an isolated fact** — never a mechanism. In three separate cases he stated the correct
mechanism and then produced the wrong label or the wrong value from it:

| Item | Mechanism he stated | What he then answered | Correct |
|---|---|---|---|
| Q4 `out === user` | "it still points to the same reference" | `false` | `true` |
| §0 `n++` / `++n` | side effect understood, direction of travel right | `a = 6` | `a = 5` |
| S4 HOF vs callback | had *built* `once`, `memoize`, a factory | "a function inside another function" | takes/returns a function |

This is the same avoidance shape as L2's `TypeError` refusal, now confirmed across three sessions and
three unrelated topics. **It is a labelling gap, not a reasoning gap.** In a whiteboard round it costs
little; in a phone screen it reads as not knowing the concept at all.

## Speak half — detail

- **S1 closure ✓** hit **lexical**. Missing clause: *retains access after the outer function has
  returned* — without it he's described nesting, not closure.
- **S2 independence ✓** "separate environment per call". Said "copy"; F1 corrected it to **reference to
  the variable**. F1 also exposed a second confusion — he thought two factory calls made one shared
  counter climb by two. Fix given as the pair rule: **per call of the factory → new environment; per
  call of the closure → same environment, re-read.**
- **S3 pure/impure ✓** definition clean. Example weak (`setTimeout` — async muddies it). F2 supplied a
  reusable interview example (`total += n`) plus the *consequence* framing, which is what he was missing.
- **S4 HOF vs callback ✗** the miss. Defined both as nesting. Corrected: HOF **takes or returns** a
  function, position in source irrelevant; callback is **passed in to be called later**. Anchored to his
  own `once` / `memoize` / `make`. Also separated **HOF and closure as two ideas that travel together** —
  `memoize` is a HOF for its signature, a closure for its `cache`.
- **S5 arrow as method ✓** hit "no own `this`", "borrows from outer". Missed the must-hit **call time**.
  Volunteered a hoisting remark that doesn't belong in the answer.
- **S6 IIFE ✓ / ✗** definition right (**private scope**), the "replaced by" wrong — said closures, which
  can't be right since an IIFE *is* one. Correct answer: **`let`/`const` block scoping and ES modules**.
- **S7 memory leaks ½** had retention, missed the verdict: **closures don't cause leaks; a forgotten
  retained reference does** (unremoved listener, live `setInterval`, closed-over DOM node).

## Predict half — detail

- **Q1 ✓** `2`, and annotated `inc()` returning `0` then `1` — **§0 applied correctly, cold, unprompted,
  ~30 min after missing it.**
- **Q2 ✗** said `0 4`, actual `0 3`. **Closure reasoning fully correct** — fresh `let` binding per
  iteration vs one shared `var`, held apart, Q8 from session 1 still holding. The error was **loop exit
  value**: he thought `var j` ends at `4`. Rule issued: *a loop leaves the counter at the exact value
  that broke the condition* — `j < 3` exits at `3`; read the condition, not the body.
- **Q3 ✓** `10 10`, right reason. `once` now solid across two sessions.
- **Q4 ✗** said `X false`, actual `X true`. See the finding table. Corrected `===` on objects as
  **reference identity, never structural equality**, and tied it to the React re-render bug (React
  compares by `===`; mutate-in-place → same reference → no re-render). **Also skipped the attached
  "is `rename` pure?" sub-question** — third session running. It is impure: **it mutates its argument.**
- **Q5 ✓** `0 1 2`. Post-increment twice in one expression, both correct.

## Items closed

- **Pre vs post increment** — carried from session 1, missed cold, taught, then demonstrated twice
  unprompted in the same session. **Closed.**
- **The M3 speak-half debt** — owed since 07-30. **Discharged.** M3 verbal coverage now proven.

## Items carried into Lesson 4's §0 gate check

1. **HOF vs callback** — the definition, cold, and he must not be handed examples first.
2. **`===` on objects** — reference identity vs structural equality. Pairs naturally with M4's
   objects/prototypes material, so test it there rather than in isolation.

## Verdict

**M3 fully closed — both halves now proven.** Cleared for Lesson 4 (`this`, objects & prototypes),
which was already the standing verdict; this session removes the caveat that gate was carrying.

## Generalisation for future lessons

He also skipped an explicitly attached sub-question ("say what `n++` vs `++n` changes and why") while
answering the output. **A skipped sub-question is a miss signal, not an oversight** — it's the same
avoidance shape as L2's refusal to name `TypeError`: describe the behavior, dodge the label. Grade the
attached question, not just the output.
