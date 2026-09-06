# The Curriculum — Node.js + PostgreSQL in 32 hours

**One hour a day. One project. Thirty-two sessions.** Read this once, then never again until you want
to know what is coming.

Every session below gives you three things:

- **Learn** — the idea, in plain English.
- **Build** — the thing you type. The project grows; it never restarts.
- **Say** — the sentence you can say in an interview afterwards. This is the actual deliverable.
  A session that taught a concept but left you with nothing to say did not happen.

**The project:** a multi-tenant cloud-cost API. Scheduled ingestion → PostgreSQL → Express REST →
each customer only ever sees their own rows. Same shape as CloudForestX, on purpose.

---

## When you are ready for what

| After | Roughly | You can |
|---|---|---|
| **S6** | 25 Aug | Explain what a server is and what Express is doing for you |
| **S13** | 2 Sept | **Survive a screen.** Real SQL, real event-loop answer |
| **S20** | 11 Sept | **Interview-safe on the backend half of a full-stack round** |
| **S26** | 21 Sept | Defend the Sequelize / TypeORM / Postgres lines on your CV |
| **S32** | 30 Sept | Take a backend-weighted round |

**S20 is the one that matters.** Everything after it is depth and defense.

---

# Phase 0 · The machine under the framework
### S1-S6 · "What is Express actually doing?"

Most people learn Express and never learn what a server is. That gap shows up the moment an
interviewer asks a *why* question. Six hours closes it permanently.

**S1 · A server with no framework**
- **Learn:** what an HTTP server is. A program that listens on a port, reads bytes, writes bytes back.
- **Build:** `node:http` server in TypeScript. Two routes. Your own tiny router. No Express.
- **Say:** *"Express is a router and a middleware chain on top of `node:http`. I've written the layer
  underneath it."*

**S2 · HTTP itself**
- **Learn:** methods, the status codes that actually matter, headers, and what "idempotent" means.
- **Build:** correct status codes on every route. 201 with a `Location` header on create. 204 on delete.
- **Say:** *"PUT is idempotent, POST isn't. Sending the same PUT twice leaves the same state, which is
  why retries are safe on one and dangerous on the other."*

**S3 · The event loop, and what blocks it**
- **Learn:** why Node handles thousands of connections with one thread. The phases. Microtasks vs
  timers. What "blocking" actually means.
- **Build:** a deliberate blocking loop in one route, then prove with two parallel requests that it
  stalls the other one.
- **Say:** *"Node isn't single-threaded, it has a single event loop plus a libuv thread pool, default
  size four, that handles filesystem and DNS work. CPU work in a handler blocks every other request."*

**S4 · Promises, `await`, and the ways they go wrong**
- **Learn:** what `await` really does. Error propagation. `Promise.all` vs awaiting in a loop.
  Floating promises and why an unhandled rejection kills the process.
- **Build:** convert the routes to async. Add a deliberate rejection and catch it properly.
- **Say:** *"`await` yields to the event loop and resumes in a microtask. Awaiting in a loop makes N
  sequential round trips; `Promise.all` makes them concurrent. That's usually the whole fix."*

**S5 · Project shape and TypeScript config**
- **Learn:** `tsconfig` strict mode, ESM vs CommonJS, npm scripts, loading config from the environment.
- **Build:** restructure into `src/` with routes, services and repositories. Real scripts. Real config.
- **Say:** *"Config comes from the environment and gets validated at boot, so the process fails at
  startup rather than at 3am on the one code path nobody hit."*

**S6 · Errors as a system**
- **Learn:** the difference between what the client sees and what you log. Custom error classes. One
  error shape for the whole API.
- **Build:** an error class hierarchy, one error-handling middleware, one JSON error shape.
- **Say:** *"Every error leaves through one handler with one shape. Handlers throw, they don't
  format. That's what stops error handling from being copy-pasted into forty routes."*
- 🔒 **Phase 0 cold drill.** All six, unaided.

---

# Phase 1 · PostgreSQL from zero
### S7-S13 · The biggest real gap, and the most testable

This is where interviews are won and lost. SQL is the one thing an interviewer can put in front of you
and watch you fail at in real time.

**S7 · Postgres running, and your first query**
- **Learn:** how to run a database locally. Connection pools. **Parameterised queries and SQL injection.**
- **Build:** `docker compose up`, connect with the `pg` Pool, one real query. Every value goes through
  `$1`, never string concatenation.
- **Say:** *"Parameters are sent separately from the SQL text, so user input is never parsed as code.
  Escaping is a patch; parameterising removes the class of bug."*

**S8 · Modeling the data**
- **Learn:** primary keys, foreign keys, `NOT NULL` / `UNIQUE` / `CHECK`, and which types to actually
  use. `timestamptz` not `timestamp`. `numeric` not `float` for money.
- **Build:** the real schema. Tenants, accounts, resources, cost rows, users.
- **Say:** *"Money goes in `numeric`, never a float, because binary floating point can't represent 0.10
  and the rounding errors accumulate. Timestamps go in `timestamptz` so the zone is unambiguous."*

**S9 · Reading: `SELECT` and `JOIN`**
- **Learn:** `WHERE`, `ORDER BY`, `LIMIT`. Inner join vs left join, and when the difference bites.
- **Build:** replace every in-memory read with real SQL.
- **Say:** *"A left join keeps rows with no match and fills nulls. If you then filter that column in
  the `WHERE`, you've silently turned it back into an inner join."*

**S10 · Aggregating**
- **Learn:** `GROUP BY`, `HAVING`, `COUNT`/`SUM`/`AVG`, CTEs for readability, window functions.
- **Build:** the cost-summary endpoint. Spend per account per month, ranked.
- **Say:** *"`WHERE` filters rows before grouping, `HAVING` filters groups after. A window function
  aggregates without collapsing the rows, which is how you rank inside a group."*

**S11 · Writing, and transactions**
- **Learn:** `INSERT ... RETURNING`, upsert with `ON CONFLICT`, and what a transaction actually
  guarantees. Isolation levels. Deadlocks.
- **Build:** create-with-related-rows in a single transaction that rolls back cleanly on failure.
- **Say:** *"Anything that must be all-or-nothing goes in a transaction. The failure mode people miss
  is the `catch` that doesn't roll back, which holds the connection until the pool starves."*

**S12 · Indexes and `EXPLAIN`**
- **Learn:** what a B-tree index is. Why column order matters in a composite index. When Postgres
  ignores your index. How to read a query plan.
- **Build:** seed 200,000 rows. Time the query. Add the index. Time it again. Read the plan both ways.
- **Say:** *"I index what I filter and join on, and I check with `EXPLAIN ANALYZE` rather than
  guessing. A composite index works left-to-right, so the column order decides which queries it
  serves. Indexes cost you on every write."*

**S13 · N+1, pagination, and pool exhaustion**
- **Learn:** the N+1 query problem and the two fixes. Offset pagination vs keyset, and why offset gets
  slower the deeper you go. What pool exhaustion looks like from the outside.
- **Build:** find the N+1 in your own code, fix it, then swap offset pagination for keyset.
- **Say:** *"N+1 is one query for the list and one per row. You fix it with a join or by batching the
  ids into a single `IN`. Offset pagination has to walk and discard every skipped row, so page 5000
  scans five thousand pages of rows to return ten."*
- 🔒 **Phase 1 cold drill.** SQL written from blank, on a clock.

---

# Phase 2 · The API becomes real
### S14-S20 · Everything between "it works" and "it ships"

**S14 · Express properly, and layering**
- **Learn:** middleware order, `next(err)`, why async errors need wrapping, and the
  route → controller → service → repository split.
- **Build:** restructure onto a real router with real layers.
- **Say:** *"Routes parse and respond, services hold the rules, repositories own the SQL. The reason
  isn't tidiness, it's that the service is testable without HTTP and the SQL is swappable without
  touching the rules."*

**S15 · Validation and one error contract**
- **Learn:** validating at the edge with zod. 400 vs 422. Mapping database errors to HTTP.
- **Build:** every endpoint validates its input. A unique-violation returns 409, not 500.
- **Say:** *"Validation happens once at the boundary, so everything past it is typed and trusted. A
  duplicate insert is a 409, not a 500 — a 500 tells the client to retry something that will never
  succeed."*

**S16 · Passwords and identity**
- **Learn:** why you hash and never encrypt, what a salt does, why bcrypt/argon2 and not SHA-256.
  Sessions vs tokens.
- **Build:** register and login endpoints. Real hashing.
- **Say:** *"SHA-256 is fast, and fast is exactly wrong for passwords — it's what lets an attacker try
  billions per second. bcrypt is deliberately slow and salted per user, so one leaked hash doesn't
  crack the other accounts."*

**S17 · JWT, end to end**
- **Learn:** what's inside a token, signing vs encrypting, verification middleware, access vs refresh,
  expiry, and the logout problem.
- **Build:** issue, verify, refresh. An auth middleware that populates the request.
- **Say:** *"A JWT is signed, not encrypted — anyone can read the payload, they just can't forge it.
  The trade is that you can't revoke one before it expires, which is why access tokens are short and
  refresh tokens are the thing you can actually revoke."*

**S18 · Multi-tenancy — the most valuable hour in the course**
- **Learn:** ownership scoping inside the query. IDOR. Allow-listed sort fields. Clamped pagination.
- **Build:** every read carries the tenant condition **in the `WHERE` clause**. A sort parameter that
  isn't on the allow-list returns 400.
- **Say:** *"The ownership condition goes inside the `WHERE`, so an unauthorised row is never loaded.
  Fetching by id and then comparing the owner in code leaks existence through timing and error
  messages, and it's one early return away from being an IDOR."*
- 📌 This is the single best security answer you own. It is already written up in
  `learning/cv-defense/drills/33-node-data.md` — after this session you will have *built* it.

**S19 · The security layer**
- **Learn:** CORS and what it actually protects, helmet, rate limiting, mass assignment, secrets.
- **Build:** the middleware stack, in the right order. Nothing sensitive in a log line.
- **Say:** *"CORS is a browser policy, not server security — it stops a page on another origin reading
  your response, it does nothing about a direct request. Rate limiting is the one that protects the
  server."*

**S20 · Migrations** 🎯 **Interview-safe after this one**
- **Learn:** why schema changes are code, up vs down, and why `synchronize: true` is a footgun.
- **Build:** convert the hand-written schema into real migrations. Run them forward and back.
- **Say:** *"Schema changes are reviewed code, same as everything else. `synchronize: true` makes the
  database silently follow your models, so a bad refactor becomes a destructive migration nobody
  reviewed."*
- 🔒 **Phase 2 cold drill.** Build a small API from blank, on a clock, while talking.

---

# Phase 3 · Production shape
### S21-S26 · The answers to "what happens when it's real"

**S21 · Scheduled ingestion**
- **Learn:** why background work leaves the request, idempotency, retries with backoff, why the job
  runs as its own process.
- **Build:** the cron-scheduled ingestion job. Re-running it twice changes nothing.
- **Say:** *"The job is idempotent, so a retry is free and a partial failure is recoverable. It runs as
  a separate process because a long job inside the web process competes with requests for the loop."*

**S22 · Testing**
- **Learn:** unit vs integration, testing against a real database, rolling back per test, what is
  actually worth testing.
- **Build:** supertest integration tests against a test database. Each test in a transaction that
  rolls back.
- **Say:** *"I test the API through HTTP against a real Postgres, because mocking the database mostly
  tests the mock. Each test runs in a transaction that rolls back, so they're isolated and fast."*

**S23 · Logging and knowing what happened**
- **Learn:** structured logging, request ids, log levels, what must never be logged, health endpoints.
- **Build:** pino with a request id threaded through every log line for a request.
- **Say:** *"Logs are JSON with a request id, so one failed request is one query across every service
  it touched. Passwords, tokens and PII never enter a log line."*

**S24 · Caching and performance**
- **Learn:** cache-aside, TTLs, invalidation, and when caching is the wrong answer.
- **Build:** cache the expensive cost-summary query. Measure before and after.
- **Say:** *"I cache what's expensive to compute and tolerant of being slightly stale. The dangerous
  cache is the one on data that must be correct, because you've traded a slow endpoint for a wrong one."*

**S25 · Sequelize** — the CloudForestX stack
- **Learn:** models, associations, eager loading, and where the ORM writes SQL you didn't expect.
- **Build:** the same queries as S9-S11, through Sequelize. Compare the generated SQL.
- **Say:** *"I've written models and relations in Sequelize over Postgres. The thing to watch is eager
  loading, because the default lazy access inside a loop is an N+1 you can't see in the code."*

**S26 · TypeORM and the migration rep**
- **Learn:** entities, ownership-scoped queries, and the real difference between the two ORMs.
- **Build:** one entity, **one migration**, one ownership-scoped query.
- **Say:** *"Both give you entities and relations. The difference that matters in practice is
  migrations. DentScribe ran `synchronize: true` with none — it's fast until the first time you need
  to reason about what actually changed in production."*
- 📌 **This closes `learning/cv-defense/` D33, queue item #3.** It has been waiting since 29 July.
- 🔒 **Phase 3 cold drill.**

---

# Phase 4 · The interview
### S27-S32 · Performance, not learning

**S27 · Docker and deployment**
- **Build:** Dockerfile, compose with the app and Postgres together, graceful shutdown on SIGTERM.
- **Say:** *"On SIGTERM it stops accepting connections, finishes in-flight requests, then closes the
  pool. Without that, a deploy drops the requests that were mid-flight."*

**S28 · The API design round** — spoken, no code
- Design an API out loud from a one-line brief: resources, endpoints, status codes, schema, indexes.
- Graded on whether you ask about scale and access patterns **before** designing.

**S29 · The planted-bug round**
- Real code, real bugs, no hint about how many. Missing `await` · floating promise · pool leak ·
  transaction that never rolls back · N+1 · injection · IDOR · `synchronize: true`.
- You find it and say *why*, out loud.

**S30 · SQL under a clock**
- Cold questions against the real database. Written, timed, no reference.

**S31 · CV defense integration**
- The full D33 ladder: CloudForestX ingestion, STS, Sequelize over Postgres, DentScribe's scoped
  queries. Answered from having built the shape, not from having read the drill.

**S32 · Full mock**
- 45-minute backend build, cold, while talking. Follow-ups two deep. Graded on the rubric.

---

## The three laws of this course

1. **Every session ends with a sentence you can say.** Not a summary. A sentence, plus the two
   follow-ups it invites.
2. **You write every line.** The AI never writes the build, never writes the SQL, never writes the fix.
   It gives you the spec, the shape in prose, the name of the concept, and the location of the bug.
   Every line written for you is a rep you don't get.
3. **Every concept lands on the running build.** No standalone chapters. A database session that
   doesn't change the API is a chapter, and chapters don't survive contact with an interview.

## How a session runs

| Where | When | What |
|---|---|---|
| Office | first 10 min | **Cold gate.** Write yesterday's concept, unaided. A fail re-drills yesterday. |
| Office | 40 min | Read the lesson. Type the build. |
| Office | last 10 min | Bank it. Rate `W` and `X`. Name tomorrow's gate. |
| **Commute** | going home | **Say today's sentence out loud, twice.** No screen. This is the `X` rep. |

**A fail at the gate re-drills yesterday instead of starting today.** The lesson can wait a day. A
concept that half-landed and then got buried under a new one cannot be recovered later.
