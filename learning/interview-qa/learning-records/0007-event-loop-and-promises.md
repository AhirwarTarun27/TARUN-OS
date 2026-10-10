# Learning record — Lesson 7: The event loop & Promises

**Drilled:** 2026-10-08 · 4 rounds (gate + speak → gate re-ask + follow-ups → predict → labels)
**Verdict:** **gate passed.** Labels 7/8 (bar met), predict 5/6, all four follow-ups passed.

| Round | Result |
|---|---|
| Speak S1-S4 | S1 pass · S3 pass · S2 half · S4 half. **He skipped the whole gate on the first ask** |
| Gate (re-asked) | G1 2/4 (`at(-1)`, `in` missed, both for the second time) · **G2 4/4: where class members live is closed, cold** · G3 half (`new` steps 3-4 not said) |
| Follow-ups F1-F4 | all pass |
| Predict P1-P6 | **5/6.** Miss: P1, a `.then` on a pending Promise |
| Labels S/MICRO/TASK (8) | **7/8.** #6 (`.catch` callback) skipped, not answered wrong |

## What he got wrong → what's true
- **A `.then` queues its callback straight away.** It queues only when the Promise **resolves**. On a pending Promise (`res()` inside a timer) it only registers the callback (P1: said `A C E D B`, truth `A C E B D`).
- **"Asynchronous code goes to microtasks."** Only promise callbacks go there. Timers and events are tasks. The order is **all microtasks → ONE task → drain again**, not "all microtasks, then all tasks".
- **`.then` after a rejection returns `undefined`.** The callback is **skipped** and the returned Promise **rejects with the same error**.
- **`arr.at(-1)` gives `[]`.** It gives the last element, `3`. Second miss.
- **`"x" in { x: undefined }` gives `undefined`.** `in` gives `true`: it's a boolean "does the key exist". Second miss.

## Closed
- Class members: field / method / shadowed / `Object.prototype` (G2 4/4, cold).
- `TypeError` named cold for a primitive WeakMap key.
- Settles once, `.catch` recovery, microtask ordering (P2-P6).

## Open items (fresh shapes, cold)
1. A `.then` on a pending Promise: it queues only on resolve.
2. `at(-1)` → an element. `in` → a boolean.
3. `new`, all 4 steps out loud (③ run with `this`, ④ return it).
4. Say "all microtasks → one task → drain again" in the task-vs-microtask answer.
5. The skip habit: he skipped the whole gate once, and one label.
