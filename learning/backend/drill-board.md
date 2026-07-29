# Drill board — Backend

The spaced-rep engine for this track. One row per **concept pair**, because what decays here is the
*performance*, not the code.

> Written by `/backend bank`. **Do not hand-edit in normal work.**

---

## The two ratings

Two performances decay differently, so they are rated separately. Both 1-5.

| | What it measures | How it is tested |
|---|---|---|
| **`W`** — write | Can he produce it in **Node**, from blank, unaided | He types it. No reference, no autocomplete help from the AI. |
| **`X`** — explain | Can he explain it cold, **including the internals *why*** | 90 seconds, spoken, no notes. Covers both stacks. |

**`< 4` is not yet his.** Deliberately higher than DSA's `< 3`, same bar as `/machine-coding` — an
interview answer at 3/5 is an answer that collapses on the follow-up.

**Reject output-only answers.** "It prints 6" is not an `X`. The *procedure* is the answer. This is the
exact failure `learning/interview-qa/learning-records/0002` diagnosed: right rule, wrong index, fired at
the surface shape of the question instead of read from state.

## The ladder

**T0 → T2 → T7 → T21** — offsets in days from T0.

- **T0** = the day the concept was **taught and both reps landed**. Not the day it was first mentioned.
- `X ≥ 4` at **T7** → skip to **T21**. `X < 4` → repeat the rung in 3 days.
- **T21** clean on both `W` and `X` → **Graduated**.
- A row can graduate on `X` while still owing `W`. That is normal for the .NET-only pairs — they are
  never written, only read. Those rows are marked `X-only`.

## The T0 tag

How the concept landed the first time. It changes the ladder.

| Tag | Meaning | Effect |
|---|---|---|
| `clean` | Got it from the lesson, first pass | Normal ladder |
| `prompted` | Needed a hint or a second explanation | Normal ladder, watch it at T7 |
| `re-read` | Had to go back to the material to answer at all | **T7 is mandatory** regardless of the T2 rating |

The `re-read` trapdoor exists because a concept re-read and then recalled 2 days later feels learned and
is not. Same rule as DSA's `watched` and machine-coding's R0 tag.

## Daily priority when the block runs short

1. Overdue rungs
2. Rungs due today
3. The new lesson

**A failed gate check re-drills yesterday instead of starting today.** The lesson can wait a day. A
concept that half-landed and then got buried under a new one cannot be recovered later.

---

## Active

| Concept pair | Node side | .NET side | T0 | Tag | Last rung | W | X | Next due | Status |
|---|---|---|---|---|---|---|---|---|---|
| **absence of a value** | `undefined` / `null` / absent key · `== null` vs `!x` | `null` only · `int?` — *not yet taught* | 2026-07-29 | `re-read` | T0 | 2 | 2 | **2026-07-31** (T2) | Node side taught mid-session after a cold blank. **.NET side owed.** |

**Why `re-read` on that row:** he could not name a single one of the three states cold, so it was taught
inside the session rather than landing from the lesson. Per the trapdoor, **T7 is mandatory** on this row
regardless of what T2 scores.

**Why `W 2`:** JS mechanics clean and fast, but three of five spec bullets wrong on first pass, a
submission that threw on line 1, and a stated correction (`!x` → `== null`) not applied ten minutes
later. **Why `X 2`:** the one explain rep (`filter(...)[0]` vs `find`) was mechanically right and gave
no internals — no short-circuit, no allocation, and both follow-ups went unanswered.

## Graduated

| Concept pair | T0 | Graduated | Final W | Final X |
|---|---|---|---|---|
| _none yet_ | | | | |

---

## Queued — seeded from the course map, not yet taught

Rows move to **Active** the day their session runs and both reps land.

**Session 1 — C# for a JS dev: the file** · _lesson READ 2026-07-29, no C# rep landed. Build B and the
planted-bug review were cut at 9:24pm for time. **Reading is not landing** — these stay Queued until a
rep lands, and session 2 does not start until Build B is done._
- static typing vs dynamic · `var` is inference, not JS `var` — `X-only`
- value vs reference types · why `int` cannot be null — `X-only`
- properties vs fields vs object properties — `X-only`
- `List<T>` / `Dictionary<K,V>` ↔ array / Map — `X-only`

**Session 2 — C# for a JS dev: the shapes**
- interfaces, and why enterprise .NET has so many — `X-only`
- LINQ ↔ array methods · `Select/Where/FirstOrDefault` — `X-only`
- exceptions ↔ error-first callbacks · `using` / `IDisposable` — `X-only`

**Session 3 — What a server actually is**
- process · thread · socket · syscall · the accept loop
- event loop + libuv pool ↔ .NET thread pool + IOCP
- what "blocks" means, and why it differs

**Session 4 — async/await: one keyword, two machines**
- `Promise` (cold, always async) ↔ `Task` (hot, can complete sync)
- microtask queue ↔ `SynchronizationContext`
- `.Result` / `.Wait()` deadlock on Framework — `X-only`
- stack · heap · GC generations

**Session 5 — The request pipeline**
- Express middleware chain ↔ Web API 2's four extension points
- routing · model binding

**Session 6 — DI, lifetimes, layering**
- Singleton / Scoped / Transient, as memory ownership — `X-only`
- Controller → Service → Repository ↔ Node module composition

**Session 7 — SQL: the query**
- B-tree over disk pages · why an index is fast
- joins · execution plans
- `IEnumerable` vs `IQueryable` · deferred execution — `X-only`

**Session 8 — SQL: connections and correctness**
- connection pooling · why sockets are expensive
- transactions · isolation levels
- N+1 · `.Include()` ↔ eager loading in Node

**Session 9 — Errors, auth, production shape**
- exception handling both sides
- JWT both sides
- validation · logging · config and secrets

**Session 10 — The double mock**
- no new pairs. Everything above, interleaved, cold.
