# Learning record — Lesson 6: Arrays & iteration

**Drilled:** 2026-10-04 (ran past midnight) · 5 rounds (gate + speak → follow-ups → predict → label-only → re-test)
**Verdict:** M6 gate **NOT PASSED.** Label-only scored **4/8** against the 7/8 bar. Re-run it cold,
with fresh shapes, at the top of the next session. Do not build the Map/Set page until it passes.

---

## Scores

| Round | Content | Result |
|---|---|---|
| §0 gate (fresh shapes) | `freeze` shallow + strict · `slice` shallow vs `splice` return | G1 **half** (output + mechanism right, said "the error" not `TypeError`) · G2 **miss** |
| Speak (S1-S4) | map vs forEach · default sort + fix · for-in vs for-of · find/filter/some + no-match | S1 pass · S2 half (fix skipped) · S3 half · S4 half |
| Follow-ups (F1-F4) | the mandatory "so why" | F1 pass · F2 half (fix right, why wrong) · F3 half · F4 pass |
| Predict (P1-P7) | cold, fresh | **3/7** (P3, P7 pass · P1, P6 half · P2, P4, P5 miss) |
| Label-only (8) | NEW / SAME / REMOVED / LENGTH / NOTHING / ONE | **4/8 — bar failed** (misses: `concat`, `push`, `pop`, `sort(cmp)`) |
| Re-test (R1-R3) | callback root + sort identity | R1 pass · R2 half · R3 pass |

All asserted outputs run on Node 24 before being asked.

---

## Finding 1 — the callback is a call the method makes

P2 (`["10","10","10"].map(parseInt)` → he said `[10,10,10]`) and P4 (`return` inside `forEach` →
he said it stops the loop) are one root: he reads the callback as **a loop body**, not as **a function
the method's own code calls, once per element, with `(value, index, array)`**. This is the **L4
call-point gap in an array costume**: when someone else's code runs your function, find the `(` that
actually runs it.

In-session: R1 pass (a named function passed to `filter` gets the index, traced right). R2 half: map
continued past the bare `return`, so the P4 root is fixed, but he read `return;` as "keep the original
value" (`[10, 2, 30]`). Truth `[10, undefined, 30]`: map stores whatever comes back, including
`undefined`. **Drill A `myMap` is the cure**: it is writing that loop yourself. Shipped as lesson **§2b**.

## Finding 2 — answers "did it change?", guesses "what did it return?"

Question 7 has two halves and he runs only the second. `push` and `pop` → SAME because they mutate.
`sort` → "returns a new array" **three times** (S2 skipped it, P1 said `r === p1` is `false`, label 7
said NEW with a comparator). He holds "sort mutates" and "sort returns a new array" at once without
noticing the clash. Surface-shape matching, **seventh costume**, and the lesson's §11 predicted it.
It fired anyway, in P1, before the label round.

Closed in-session on R3 (`sort` same array + `push` returns 3, both labelled right), **not cold**.
Fix shipped: the mutator-returns table in lesson **§1**, and the discipline *ask "what did it return?"
as its own question first*.

## Finding 3 — the comparator model was wrong

F2: he believed the comparator receives **strings**, `-` coerces them back to numbers, and `>`
compares text. Truth: string conversion happens **only in the no-comparator default**. A comparator
gets the real elements (proved with a `typeof` log, prints `number`). `a > b` fails because it
returns a **boolean**: 1 or 0, never negative, so sort is never told "a first". Taught, not re-tested.

## Finding 4 — an array's `length` counts index slots only

P5: with `arr.extra = "x"` he said `length` 3, for-in keys `"1 2 extra"` (truth `"01extra"`) and
for-of `"15objectobject"` (truth `15`). He got that for-in picks up `extra`. Taught (a named prop is an
L5 property on the array object, not an element), not re-tested.

## Labels

- **`TypeError`:** "the error" in G1. Produced in F1, but after G1's grade had named it, so not cold.
- **"truthy":** said "true" in F4. The value (`[0, 2, 3]`, so `-1` kept) proves the model is there.
- **"is not iterable":** remembered the message and attached it to the `forEach().map()` case. It
  belongs to `for...of` on a plain object, which was "no idea" in F3.

## What was strong

- **Filter inversion from the probe: closed.** F4 said "keeps" and got `[0, 2, 3]`.
- **`freeze` shallow (L5 open item 3): output and mechanism clean** in G1.
- **`slice` shallow:** G2 cold miss (said "the reference is shared", then left the 9 out of `a`:
  the standing right-mechanism-wrong-value pattern). **P7 pass in-session** with a precise trace:
  replacing `copy[0]` re-points the copy, `copy[1].v` mutates the shared object.
- P3 (`findIndex` returns 0, falsy) clean with the right reason.
- G2's `b = [[3]]` was a slip, by his account. Accepted, not probed.

---

## Open items, honest list

1. **Label-only round re-run, cold, 8 fresh shapes, bar 7/8.** Top of the next session, before anything new.
2. `map` with a bare `return` or a block body with no `return` → `undefined` in that slot (R2).
3. Comparator contract, cold: why `(a, b) => a > b` doesn't sort.
4. `length` ignores named props; for-in keys start at `"0"` (P5).
5. `for...of` on a plain object → `TypeError: ... is not iterable` (F3).
6. `slice` shallow: one more cold check (cold miss G2, in-session pass P7).
7. `TypeError` label: not produced cold this session.
8. **Drill A `myMap` and Drill B `secondLargest` not attempted.** `myMap` is the cure for Finding 1.
9. Glossary M6 section withheld until the gate passes.

**2026-10-06 update:** the label re-run ran as 6b §0 and scored **5/8** (up from 4/8). The `sort`/`push` family is now clean, and the remaining misses are `splice` shapes and `at`. Item 1 above has moved to `0006b-map-and-set.md`.
