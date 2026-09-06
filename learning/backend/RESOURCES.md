# Backend Resources — Node.js and PostgreSQL

Node, SQL and internals sections seeded 2026-07-29, **rebuilt and re-verified 2026-08-15** when .NET
was cut. All links live-verified on the date of their section.

> **The .NET sourcing trap is gone with the .NET half.** There is no equivalent trap here: on Node and
> Postgres, **newer is better and current docs are correct.** Link `/docs/current/` on postgresql.org
> rather than pinning a version, so the reference doesn't rot.

---

## PostgreSQL — the primary source for Phase 1

The official docs are unusually good and are the right level for this course. **Read these, not
tutorial sites.**

- **[PostgreSQL Documentation (current)](https://www.postgresql.org/docs/current/)**
  The doc-tree root. Current release is **18** (verified 2026-08-15).
- **[Chapter 11 — Indexes](https://www.postgresql.org/docs/current/indexes.html)**
  B-tree, multicolumn indexes and **why column order decides which queries an index serves**,
  index-only scans, and when the planner ignores an index. **Primary source for S12.**
- **[Using EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html)**
  How to read a plan. Seq scan vs index scan, cost vs actual time, the `ANALYZE` difference. S12.
- **[Chapter 13 — Concurrency Control](https://www.postgresql.org/docs/current/mvcc.html)** and
  **[13.2 Transaction Isolation](https://www.postgresql.org/docs/current/transaction-iso.html)**
  MVCC, the four standard isolation levels, and the detail worth knowing: **Postgres implements only
  three — Read Uncommitted behaves as Read Committed.** S11.
- [Data Types](https://www.postgresql.org/docs/current/datatype.html)
  For the S8 decisions: `numeric` vs floating point for money, `timestamptz` vs `timestamp`, `jsonb`
  vs `json`, `uuid`. S8.
- [INSERT — including `ON CONFLICT`](https://www.postgresql.org/docs/current/sql-insert.html)
  Upsert, and `RETURNING`. S11.
- [Window Functions Tutorial](https://www.postgresql.org/docs/current/tutorial-window.html)
  The gentlest correct introduction to the thing that ranks inside a group without collapsing rows. S10.

## SQL, taught properly

- **[Use The Index, Luke — Markus Winand](https://use-the-index-luke.com/)**
  The free web edition of *SQL Performance Explained*. Indexing from the ground up, vendor-agnostic,
  focused on **the B-tree**, written for developers rather than DBAs. **The single best SQL resource on
  this list.** Primary source for S12 and S13. _(Verified 2026-07-29, still current.)_

## Node.js — the runtime, not the framework

- **[The Node.js Event Loop, Timers and `process.nextTick()` (nodejs.org)](https://nodejs.org/learn/asynchronous-work/event-loop-timers-and-nexttick)**
  First-party and the correct level of detail: the six phases, why `process.nextTick()` is *not* part
  of the loop, and why `setImmediate()` beats a timer inside an I/O cycle. **Primary source for S3 and
  S4.**
- **[libuv — Design overview](https://docs.libuv.org/en/v1.x/design.html)**
  What is actually underneath Node. S3.
- **[libuv — Thread pool work scheduling](https://docs.libuv.org/en/v1.x/threadpool.html)**
  The detail that kills the "Node is single-threaded" soundbite: there **is** a pool, **default size
  4** (`UV_THREADPOOL_SIZE`, max 1024), global across loops, running all filesystem work plus
  `getaddrinfo`/`getnameinfo`. Knowing this separates a real answer from a memorised one. S3.
- [Node.js `http` module API](https://nodejs.org/docs/latest/api/http.html)
  For S1, where he builds a server without a framework.

## The driver and the ORMs

- **[node-postgres — Pool API](https://node-postgres.com/apis/pool)**
  The `pg` Pool: `max`, `idleTimeoutMillis`, `connectionTimeoutMillis`, and the properties that
  diagnose exhaustion — `totalCount`, `idleCount`, **`waitingCount`**. States the failure mode
  explicitly: *"if you forget to release a client, your application will quickly exhaust available idle
  clients and further calls to `pool.connect` will timeout or hang."* **Primary source for S7 and S13.**
  _(Verified 2026-08-15.)_
- [node-postgres — ESM](https://node-postgres.com/features/esm) — for the S5 module decision.
- [Sequelize docs](https://sequelize.org/docs/v6/) — **S25.** CloudForestX's ORM. Models, associations,
  eager loading.
- [TypeORM docs](https://typeorm.io/) — **S26.** DentScribe's ORM. Entities, migrations, and the
  `synchronize` setting that is the whole point of that session.

> **Prisma is deliberately absent.** It is not on his CV; Sequelize and TypeORM are. One paragraph of
> name-recognition in S26 is the entire budget. See `MISSION.md` § Out of scope.

## Machine internals

- **[Beej's Guide to Network Programming (Brian Hall)](https://beej.us/guide/bgnet/)**
  Sockets from the ground up in C: `socket`, `bind`, `listen`, `accept`, `send`, `recv`. Read **only**
  the first client/server example. The point is to see the accept loop that Node is wrapping, once, so
  the runtime never looks like magic again. S1 or S3, optional depth.

## Wisdom (communities)

- [r/node](https://reddit.com/r/node) — current practice, current opinions, for the interview half.
- [r/PostgreSQL](https://reddit.com/r/PostgreSQL) — good for *"is this schema normal or is mine weird"*,
  which is exactly the question someone new to backend modelling cannot answer alone.
- [Stack Overflow — `postgresql` tag](https://stackoverflow.com/questions/tagged/postgresql).

## What this list deliberately does not cover

Microservices, Kubernetes, gRPC, GraphQL, message brokers, distributed-systems theory. All cut in
`MISSION.md` § Out of scope to protect a one-hour block. Do not add a resource for a thing the course
does not teach — a resource list that outgrows the syllabus is how a one-hour block becomes three.

## Gaps

- **No Node interview-question bank pinned yet.** `learning/interview-qa/` covers JS fundamentals but
  stops short of backend. Pin one before S32's mock.
- **No testing library pinned** (`node:test` vs vitest, plus supertest). Pin at S22 — decide by what is
  least setup on Node 20, not by preference.
- **No logging library pinned** (pino vs winston). Pin at S23. pino is the likely answer on speed and
  structured output, but verify before writing the lesson.
- Nothing here covers the work codebase's conventions, and nothing should — employer boundary.
