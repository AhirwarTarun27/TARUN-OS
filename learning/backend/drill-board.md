# Drill board — Backend (Node.js + PostgreSQL)

The spaced-rep engine for this track. One row per **concept**, because what decays here is the
*performance*, not the code.

> Written by `/backend bank`. **Do not hand-edit in normal work.**
> **Reseeded 2026-08-15** when .NET was cut. The ladder, the ratings and the trapdoor are unchanged —
> only the syllabus behind them changed.

**Track finish line** (`mission/plan.md`): **8 concepts at `W ≥ 4` and `X ≥ 4`.**

---

## The two ratings

Two performances decay differently, so they are rated separately. Both 1-5.

| | What it measures | How it is tested | Where |
|---|---|---|---|
| **`W`** — write | Can he produce it from blank, unaided | He types it. No reference, no AI help. | The 10-min office gate |
| **`X`** — explain | Can he explain it cold, **including the *why*** | 90 seconds, spoken, no notes, two follow-ups deep. | **The commute** |

**`< 4` is not yet his.** Deliberately higher than DSA's `< 3`, same bar as `/machine-coding` — an
interview answer at 3/5 is an answer that collapses on the follow-up.

**Reject output-only answers.** "It returns 3 rows" is not an `X`. The *procedure* is the answer. This
is the exact failure `learning/interview-qa/learning-records/0002` diagnosed: right rule, wrong index,
fired at the surface shape of the question instead of read from state.

## The ladder

**T0 → T2 → T7 → T21** — offsets in days from T0.

- **T0** = the day the concept was **taught and both reps landed**. Not the day it was first mentioned.
- `X ≥ 4` at **T7** → skip to **T21**. `X < 4` → repeat the rung in 3 days.
- **T21** clean on both `W` and `X` → **Graduated**.

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

> ⚙ **Format contract — `scripts/console.mjs` parses this table.** It finds it by the header
> containing **`Concept`** and **`Next due`**, reads the columns named exactly **`W`** and **`X`**, and
> takes the rung from the *parenthesised* part of the due cell. So **`Next due` must read
> `**YYYY-MM-DD** (T7)` and nothing else** — do not write "OVERDUE" or a second date into that cell.
> The console computes lateness itself. Break this and the board reports `??`, which is the one thing
> it must never do silently.

| Concept | Node side | SQL / DB side | T0 | Tag | Last rung | W | X | Next due | Status |
|---|---|---|---|---|---|---|---|---|---|
| **absence of a value** | `undefined` / `null` / absent key · `== null` vs `!x` | `NULL`, and why `= NULL` is never true — *owed, lands S8* | 2026-07-29 | `re-read` | T0 | 2 | 2 | **2026-07-31** (T2) | Node side taught mid-session after a cold blank. **Carried through the .NET cut — it is a JS row and still valid.** |

**Why `re-read` on that row:** he could not name a single one of the three states cold, so it was taught
inside the session rather than landing from the lesson. Per the trapdoor, **T7 is mandatory** on this row
regardless of what T2 scores.

**Why `W 2`:** JS mechanics clean and fast, but three of five spec bullets wrong on first pass, a
submission that threw on line 1, and a stated correction (`!x` → `== null`) not applied ten minutes
later. **Why `X 2`:** the one explain rep (`filter(...)[0]` vs `find`) was mechanically right and gave
no internals — no short-circuit, no allocation, and both follow-ups went unanswered.

> **This row is 15 days overdue and it is the first thing S1 tests.** The SQL half of it (`NULL`
> three-valued logic, `IS NULL` vs `= NULL`) now has a home at S8, which is a better pairing than the
> `int?` it used to sit against.

## Graduated

| Concept | T0 | Graduated | Final W | Final X |
|---|---|---|---|---|
| _none yet_ | | | | |

---

## Queued — seeded from the curriculum, not yet taught

Rows move to **Active** the day their session runs and both reps land.
Full plain-English syllabus: `CURRICULUM.md`. Session map: `reference/course-map.html`.

### Phase 0 — the machine under the framework

**S1 — a server with no framework**
- what an HTTP server is · port, listen, request, response
- `node:http` vs what Express adds on top

**S2 — HTTP itself**
- methods · **idempotency**, and why it decides whether a retry is safe
- the status codes that matter · 201 + `Location` · 204

**S3 — the event loop, and what blocks it**
- the loop phases · microtasks vs timers · `nextTick` vs `setImmediate`
- **libuv thread pool, default size 4** — the detail that kills the "single-threaded" soundbite
- what "blocking" means, and why CPU work in a handler stalls every other request

**S4 — promises, `await`, and how they go wrong**
- what `await` actually does · resumption in a microtask
- `Promise.all` vs awaiting in a loop
- floating promises · unhandled rejection kills the process

**S5 — project shape and TypeScript config**
- `tsconfig` strict · ESM vs CommonJS
- config from the environment, validated at boot

**S6 — errors as a system**
- custom error classes · one error shape · error middleware
- what the client sees vs what you log

### Phase 1 — PostgreSQL from zero

**S7 — Postgres running, and the first query**
- connection pool · why a socket is expensive
- **parameterised queries** · why escaping is a patch and parameterising removes the bug class

**S8 — modeling the data**
- PK · FK · `NOT NULL` / `UNIQUE` / `CHECK` · `ON DELETE`
- `numeric` vs float for money · `timestamptz` vs `timestamp` · `jsonb` · `uuid`
- **`NULL` and three-valued logic** — the SQL half of the overdue Active row

**S9 — reading: `SELECT` and `JOIN`**
- `WHERE` · `ORDER BY` · `LIMIT`
- inner vs left join · **the left join silently turned back into an inner join by a `WHERE`**

**S10 — aggregating**
- `GROUP BY` · **`WHERE` before grouping vs `HAVING` after**
- CTEs · subqueries · window functions (`ROW_NUMBER`, `RANK`)

**S11 — writing, and transactions**
- `INSERT ... RETURNING` · upsert with `ON CONFLICT`
- what a transaction guarantees · isolation levels (**Postgres implements 3, not 4**) · deadlocks
- **the `catch` that doesn't roll back, and the pool starvation that follows**

**S12 — indexes and `EXPLAIN`**
- the B-tree · why an index is fast · what it costs on write
- **composite index column order** · when the planner ignores an index
- reading `EXPLAIN ANALYZE` · seq scan vs index scan

**S13 — N+1, pagination, pool exhaustion**
- N+1 · the join fix vs the batched-`IN` fix
- offset vs keyset pagination · why offset degrades with depth
- pool sizing · `waitingCount` as the exhaustion signal

### Phase 2 — the API becomes real

**S14 — Express properly, and layering**
- middleware order · `next(err)` · async error wrapping
- route → controller → service → repository, and *why* (testable without HTTP)

**S15 — validation and one error contract**
- validate at the boundary · 400 vs 422
- **unique violation → 409, not 500**

**S16 — passwords and identity**
- hash, never encrypt · salt · **why fast hashes are the wrong tool**
- session vs token

**S17 — JWT end to end**
- signed not encrypted · verification middleware
- access vs refresh · expiry · **why you can't revoke a JWT, and what that forces**

**S18 — multi-tenancy** ⭐
- **ownership inside the `WHERE` clause** · why post-fetch checks leak existence
- IDOR · allow-listed sort · clamped pagination
- _Builds the answer already written in `cv-defense/drills/33-node-data.md` §2._

**S19 — the security layer**
- **CORS is a browser policy, not server security** · helmet · rate limiting
- mass assignment · secrets · what never enters a log

**S20 — migrations** 🎯 *interview-safe gate*
- schema changes as reviewed code · up vs down
- **`synchronize: true` as the footgun** — first-hand DentScribe material

### Phase 3 — production shape

**S21 — scheduled ingestion**
- why background work leaves the request · idempotency · retries and backoff
- the job as its own process

**S22 — testing**
- integration through HTTP against a real database · **why mocking the DB tests the mock**
- transaction-rollback per test

**S23 — logging and observability**
- structured logs · request id threaded through · levels
- what must never be logged · health endpoint

**S24 — caching and performance**
- cache-aside · TTL · invalidation
- **when caching is the wrong answer** (trading slow for wrong)

**S25 — Sequelize** _(CloudForestX's stack)_
- models · associations · eager loading
- **the invisible N+1 from lazy access in a loop**

**S26 — TypeORM and the migration rep** ⭐
- entities · ownership-scoped queries · **one real migration**
- Sequelize vs TypeORM: the difference that matters is migrations
- _Closes `cv-defense` D33 queue #3._

### Phase 4 — the interview

**S27 — Docker and deployment**
- Dockerfile · compose · **graceful shutdown on SIGTERM, and the dropped requests without it**

**S28-S32 — performance, not new concepts**
- S28 API design round, spoken · S29 planted-bug round · S30 SQL under a clock ·
  S31 CV-defense integration (the D33 ladder) · S32 full 45-minute mock.
- No new rows. Everything above, interleaved, cold.
