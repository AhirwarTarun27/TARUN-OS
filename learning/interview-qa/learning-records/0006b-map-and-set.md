# Learning record — Lesson 6b: Map, Set & the weak ones

**Drilled:** 2026-10-06 · 4 rounds (gate + speak → follow-ups → predict → label-only), plus both coding drills earlier the same day
**Verdict:** gate **NOT PASSED.** Both label rounds missed the 7/8 bar by a little: the L6 re-run scored **5/8** (up from 4/8) and the 6b round scored **6/8**. Predict was **3/7**.

All asserted outputs run on Node 24 before being asked.

---

## Scores

| Round | Content | Result |
|---|---|---|
| §0 G1: L6 label re-run (8 fresh) | NEW / SAME / REMOVED / LENGTH / NOTHING / ONE | **5/8.** Missed `splice(2)` (said ONE), `splice(0, 0, "x")` (said SAME), `at(-1)` (said NOTHING; `at` was never taught) |
| §0 G2 | `list.includes({ id: 1 })` vs `s.has(list[0])` | **pass, cold.** Closes the 10-06 argument-evaluation gap |
| Speak (S1-S4) | Map vs object · Set vs array · WeakMap · GC + leak | S1 half · S2 half · S3 half · S4 **miss** |
| Follow-ups (F1-F5) | the "so why" | F1 pass · F2 half (complexity half skipped) · F3 half · F4 pass · F5 half (skipped twice before he answered) |
| Predict (P1-P7) | cold, fresh | **3/7** (P1, P2 pass · P5, P7 half · P3, P4, P6 miss) |
| 6b label-only (8 fresh) | SAME / BOOL / VALUE / NUMBER / NEW / THROWS | **6/8.** Missed `new WeakSet().add(1)` (said SAME), `wm.get({})` (said THROWS) |
| Drill A `firstUnique` | Map count + insertion-order walk | **solved** after two hints. Naming nit: `value` meant two things |
| Drill B `findPairs` | nested loops, then a one-pass Set | **solved.** Brute force had an `i++` inside the inner `if` (meant "stop searching for this i"; the tool is `break`). He found it with his own `console.log` once I pointed him at it. The Set version started as `new Set(arr)`, prefilled; fixed to start empty and check before adding |

---

## Finding 1 — right mechanism, wrong value, again (P4)

In S1 he said a plain object turns every key into a string. Minutes later, in P4, he answered `o[a]` as `"A"`
(truth `"B"`: both object keys collapse to `"[object Object]"`, and the second write overwrites the first).
The Map line sat beside the object line, and the Map's rule leaked across. This is the course's standing
pattern, its sixth or so session: **the sentence is right and the value one step later is wrong.**

## Finding 2 — surface-shape matching in two more costumes

- `new WeakSet().add(1)` → SAME. "`add` returns the set" fired before "weak keys must be objects".
- `splice` in unusual shapes: one argument → ONE, insert-only → SAME. **`splice` always returns an array of
  what it removed**, even `[]`.
- The `sort` / `push` / `toSorted` / `fill` family from 10-04 is now **clean, cold**. That L6 finding has closed.

## Finding 3 — known rule, not fired in a new input shape

- P3: `new Set("banana")` gave `6 "banana"`. He knows `[...new Set(arr)]` dedupes, but the rule didn't fire
  when the input was a string.
- P7: `k = { id: 1 }` after `wm.set(k)`. Reassigning a variable re-points it to a **new** object; the old object
  is still the key, through `k2`. He answered `wm.has(k)` as `true`.
- P6: `JSON.stringify(map)` gave "throws". Truth: `"{}"`. Read on the page, not retained.

## Finding 4 — reachability didn't stick from reading

S4 was cold: "it frees on its own… not sure". After a short teach, **F4 passed** ("still in the cache; use a
WeakMap"). The label to make him say is **reachable**.

## Skipped sub-questions

F5 (insertion order + complexity) was skipped twice before he answered it. The `findPairs` complexity half
of F2 was skipped. Pasting the final `findPairs` was skipped once. It's the standing avoidance pattern; I
named it to him directly in-session.

## What closed

- **Argument evaluation (10-06 gap):** G2 cold pass.
- **L6 Finding 2 (`sort`/`push` return values):** clean, cold, in the new shapes.
- `delete` returns a boolean; Map keys aren't converted (P2), cold.
- Drill B check-then-add ordering, which he arrived at himself from the `[5]` trace.

---

## Open items

1. **Label items, cold, at the top of the next lesson:** `splice` (one argument, insert-only), `at(-1)`,
   `new WeakSet().add(primitive)` → throws, `wm.get(primitive or new object)` → `undefined` (only `set`/`add`
   throw).
2. **F5 said cold:** Map insertion order + O(n).
3. **Reachability cold:** S4 again, using the word *reachable*.
4. P3/P4/P7 shapes, fresh: Set from a string, an object key next to a Map key, reassignment after `set`.
5. `JSON.stringify(map)` → `"{}"`.
6. Glossary M6 section withheld until a gate passes.
