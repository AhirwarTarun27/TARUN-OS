# Learning record — Lesson 5: Objects & prototypes

**Drilled:** 2026-10-03 · 3 rounds (gate + speak → follow-ups → predict → label-only → one arrow retest)
**Verdict:** M5 gate **PASSED WITH OPEN ITEMS**, by his call to move on. Cleared for M6.

---

## Scores

| Round | Content | Result |
|---|---|---|
| §0 gate (fresh shapes) | arrow in a method · `call.bind(slice)` use case | **0/2** — G1 miss (read `start()` as returning a number), G2 skipped, taught |
| Speak (S1-S3) | prototype chain · shallow copy + call-by-sharing · freeze/seal/preventExtensions | 3 half |
| Follow-ups (F1-F4) | the mandatory "so why" | F2 pass · F3 half (label passed) · F1 miss · F4 taught |
| Predict (P1-P4) | cold, fresh | **3/4** (miss: `freeze` is shallow) |
| Label-only (8) | copy vs same vs not-a-copy | **7/8 — bar met** (miss: `slice` is shallow) |
| Arrow retest | `make.call(A)` then `a1.call(B)` | **pass**, cold, traced |

---

## Finding 1 — the arrow's enclosing function, missed twice then closed

G1 and F1 were the same shape and both missed: he fired "`.call` is ignored on arrows" and
stopped. In F1 the `.call` was on the **enclosing method**, not the arrow. Surface-shape matching,
**sixth costume**. Closed on a fresh snippet (`make.call` vs `a1.call`) when he traced it instead
of firing a rule. Discriminator: *which function is each `.call` on, and does a real function
enclose the arrow?*

## Finding 2 — "shallow" read as "locked/copied" by the surface word

Two misses, one root. `Object.freeze` (P4) fired "everything is locked"; `arr.slice()` (label 7)
fired "new array, so deep". Both are shallow. He got `{...a}` and `[...arr]` right in the same
session, so the knowledge is there and the **indexing** is not. Question that fixes it: *which
object does this write actually land on, and what is inside the new one still shared?*

## Finding 3 — the label gap held, and half-closed

- **Call by sharing:** said "pass by reference" in S2, then produced **call by sharing** correctly in
  F3 with a clean mechanism. Label arrived after a prompt, not cold.
- **TypeError:** produced unprompted in S3 (L2's open item stays closed). Missing the "only in
  strict mode" half until taught.
- F3: the transcript said "Too". If that was "two", it is the standing pattern: right mechanism,
  wrong value. Not confirmed.

## What was strong

P2 (shadow then delete, own vs inherited) and P3 (prototype method vs arrow class field) were clean
with a real trace. S1 mechanism and F2 (why methods live on the prototype) were sound.

---

## Open items, honest list

1. **Drill B `deepClone` not attempted.** He will do it afterwards. Layers A-B-C were taught in
   chat on 2026-10-02 (base case, flat copy, one-line recursive change). Arrays-as-empty-box is the
   next question he owes.
2. **5b and 5c were not drilled.** His call, 2026-10-03: they are for understanding. The L5 notes
   said "drill 5b before the gate"; that was skipped on purpose. If getters/setters or `new` surface
   as a gap in M6+, this is the first place to look.
3. **`freeze` is shallow / `slice` is shallow** — re-test cold at the top of M6, where `slice` vs
   `splice` lives anyway.
4. **Glossary M5 section not written.** It is the revision sheet for what he *proved*; he proved the
   copy/identity half, not the full set. Write it when `deepClone` is attempted.
5. `f.call.bind(f, ctx)` is **burned** as a cold item; the `Function.prototype.call.bind(slice)`
   use case was taught on 2026-10-03.
