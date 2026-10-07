# Learning record — 5b + 5c: getters/setters and the prototype chain

**Drilled:** 2026-10-07 · interview-level subset only, at his request (no descriptors, no `[[Set]]`)
**Verdict:** labels **2/8**, so not passed. After a single picture of the chain, a fresh 4-item check scored **4/4**, in-session.

| Round | Result |
|---|---|
| Speak S1-S4 (getter/setter · `new` · prototype vs `__proto__` · prototypal inheritance) | S4 pass · S1, S2, S3 half. He asked for code examples, which were taught |
| Predict P1-P6 + F1 | P1, P3, P6 pass · P4, P5, F1 half · P2 miss |
| Labels (OWN / INHERITED / NOT FOUND, 8) | **2/8** |
| Quick check after the chain picture (4, fresh class) | **4/4** |

## What he got wrong → what's true
- **Class fields read as "not found".** Fields (`x = 1`, arrow fields) are **own**. Methods and getters are on `T.prototype`, inherited. All 6 label misses came from not having the picture `t → T.prototype → Object.prototype → null`.
- **`toString` / `constructor` read as "not found".** Every chain ends at `Object.prototype`. `constructor` lives on `T.prototype`.
- **Spread on a getter gives `undefined`.** For an object-literal (own) getter, spread *runs* it once and stores the value, a stale snapshot (86). His `undefined` is right only for a **class** getter, which lives on the prototype and isn't copied at all.
- **`a.wheels = 3` changes `b` too.** Writing an inherited key **shadows** it on `a` only.
- **`"eat" in c` returns the function.** `in` returns a **boolean**.
- **`new` steps 3-4 garbled.** ③ run with `this` = the new object; ④ return it, unless the constructor returns its own object, in which case that object is returned instead. Step ② (the link) is what makes inheritance work, and he skipped saying that.

## Closed
- **`TypeError` named cold** (P6, `c.fly()`). This closes the open item from the arrays lesson.
- Getter recomputes on read (P1), setter validation (P3), prototypal inheritance said cleanly (S4).

## Open items (fresh shapes, cold)
1. Where class members live: field / method / getter / shadowed.
2. Spread on a getter → snapshot value.
3. `new`'s 4 steps out loud, naming step ② as the one that makes inheritance work.
4. `in` → boolean.
