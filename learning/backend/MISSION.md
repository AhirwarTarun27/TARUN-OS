# Mission: Backend — Node.js and PostgreSQL

_Revised 2026-08-15. Supersedes the Node-and-.NET two-stack mission of 2026-07-29, which itself
superseded the .NET-only mission of 2026-07-18._

## Why .NET is gone

The .NET half existed for exactly one reason: management wanted him .NET-ready so they could shortlist
him internally for a new .NET project.

**He resigns 7 September.** Internal shortlisting is worth nothing to someone leaving in three weeks,
and every hour it costs is an hour taken from a 15 November offer floor. So it is cut, and the whole
block goes to the stack he is actually interviewed on.

**Cutting it gains 17 days.** `mission/plan.md` had Node starting 1 September as the A2 phase. It
starts **Monday 17 August** instead.

**The forfeit, stated plainly so it is a decision and not a drift:** if anyone at work asks about .NET
progress before 7 Sept, the answer is "nothing". That is the trade and it is the right one.

---

## The real job of this course

**"Assume I don't have backend skills" is true of his hands and false of his CV.**

`references/cv/master.tex` already sells all of this, and `learning/cv-defense/skills-defense.md`
grades it:

| Token | Flag | Anchor |
|---|:--:|---|
| Node.js | 🟢 anchored | CloudForestX ingestion + Express APIs; DentScribe CRUD tier |
| Express | 🟢 anchored | CloudForestX |
| REST APIs | 🟢 anchored | all four projects |
| PostgreSQL | 🟢 anchored | CloudForestX, DentScribe |
| Sequelize | 🟢 anchored | CloudForestX models |
| TypeORM | 🟢 **quick-learn** | DentScribe `staff-contacts`, one module deep |
| TypeScript | 🟢 anchored | CloudForestX 470 `.ts` / 0 `.js` · DentScribe 317 / 0 |

The summary line on the CV says *"building data-heavy enterprise SaaS end to end, from PostgreSQL and
Node APIs to fast, typed React interfaces."*

So this is not a course that teaches backend from zero into a vacuum. It is a course that **closes the
gap between what the CV claims and what the hands can do, before someone tests it.**

That inverts the syllabus. It is reverse-engineered from the CV, not from a generic Node roadmap.
Every session is chosen because a specific claim on that résumé invites a specific follow-up.

**The rule that governs this, same as `learning/cv-defense/`: never claim authorship you can't defend.**
The course does not make claims true. It makes him able to answer for them.

---

## The two performances, now inside one stack

The old mission split the performances across two languages. They still exist, but they are now two
halves of the same skill.

| | `W` — write | `X` — explain |
|---|---|---|
| What it is | Produce it from a blank file, unaided | Say it cold in 90 seconds, including the *why* |
| Tested by | He types it. No reference, no AI help. | Spoken, no notes, two follow-ups deep. |
| Where it happens | The office hour and the next-day gate | **The commute.** No screen. |
| Failure looks like | Freezing on a blank file in an interview | An answer that dies on the second follow-up |

**Both are required. `< 4` is not yet his.** An interview answer at 3/5 is an answer that collapses on
the follow-up.

---

## Success looks like

**By S13 (~2 Sept) — survives a screen:**
- Explain what the event loop actually does, and what blocks it, without saying "single-threaded" as
  the whole answer.
- Write a real `JOIN` and a real `GROUP BY` against a live database, from memory.
- Say what a parameterised query prevents, and why string concatenation is the bug.

**By S20 (~11 Sept) — interview-safe on the backend half:**
- Build a small REST API from a blank file, live, while talking.
- Model a schema with the right keys and constraints, and defend the choices.
- Stop one tenant reading another tenant's rows, **with the ownership condition inside the `WHERE`
  clause**, and say why that beats checking after the fetch.
- Explain a transaction, an index, and an N+1, each in 90 seconds.

**By S26 (~21 Sept) — the CV is defensible:**
- Answer the whole D33 ladder from `learning/cv-defense/drills/33-node-data.md` with hands-on evidence
  rather than recall.
- Sequelize versus TypeORM, and why `synchronize: true` is a footgun, from having run a migration.

**By S32 (~30 Sept) — takes a backend-weighted round:**
- Design an API out loud: resources, endpoints, status codes, schema, indexes.
- Read code and find the missing `await`, the pool leak, the un-rolled-back transaction, the IDOR.
- Read an `EXPLAIN ANALYZE` and say why the query is slow.

---

## The build

**One project, grown across all 32 sessions.** A multi-tenant cloud-cost API:

```
scheduled ingestion  →  PostgreSQL  →  Express REST  →  ownership-scoped queries
```

Deliberately the same **shape** as CloudForestX. That is the whole point: the session where he learns
multi-tenant row scoping is the same hour that makes D33's *"how do you stop one tenant reading
another tenant's rows"* a memory instead of a recall.

It grows in one direction and never restarts: a bare `node:http` server (S1) → a real schema (S8) →
real queries (S9-S13) → a layered API with auth (S14-S20) → ingestion, tests, logging (S21-S24) →
Dockerised (S27).

**Employer boundary holds inside this.** The domain is generic cloud-cost modelling. No ThinkSys code,
repo names, client names or work specifics enter the lab or any lesson, ever.

---

## The block

**One hour, office time.** That is the constraint he set, and the design falls out of it.

`daily/schedule.md` states two things this collides with: office hours are interruptible and can vanish
without notice, and *"reading for a rep you never perform is not a rep."* Writing code cold is the
interview skill and it is exactly what dies on interruption.

Resolved using only hours that already exist:

| Surface | Gets | Why it survives there |
|---|---|---|
| **Office, 1 hr** | read the concept, type today's build | an interruption costs minutes, not the rep |
| **Commute** (already carved out, unscored) | the 90-second spoken `X` rep on yesterday | no screen, which is the commute's stated design |
| **Next session, first 10 min** | cold-write yesterday's concept, unaided | short enough to survive a bad day |

**The protected 9pm-12am block and THE FLOOR are untouched.** No part of the floor may depend on office
hours. That law holds unchanged.

**In Phase B the session stays one hour.** Freed hours go to machine-coding, which `mission/plan.md`
names as the gate, and to DSA.

---

## Where the code lives

**Knowledge in, code out.**

```
C:\Users\ahirwar.tarun\Documents\Learning\MyProjects\backend-lab\
```

Its own repo, outside the AIOS. `node_modules` would bury this workspace and slow every search in it.
The lab is a registered additional working directory, so a session running from TARUN-OS can **read**
the code without owning it.

**The lab never holds learning state.** Ratings, records and the drill board live here in
`learning/backend/`. If they leak into the lab, the spaced-rep board splits in two and neither half is
true.

---

## Constraints

- **TypeScript throughout.** Not a compromise, the correct call: TS is 🟢 anchored at 470 files on
  CloudForestX and 317 on DentScribe. Plain JS would have been the artificial choice. But TS is
  **annotations in service of the backend concept**, never a subject of its own. No generic gymnastics,
  no conditional types, no decorators before S26.
- **Raw SQL is the core.** ORMs arrive at S25-S26 and not before. An interviewer can test SQL; ORM
  syntax is a lookup. A developer who reaches for an ORM before understanding the query it writes
  cannot answer "why is this slow", and that question ends rounds.
- **PostgreSQL runs in Docker.** Docker Desktop is present; `psql` is not installed. One compose file
  is a five-minute setup, resets by deleting a volume, and doubles as the S27 deploy artifact.
- **Verified environment (2026-08-15):** Node v20.20.0 · Docker Desktop present · `psql` **not
  installed**, which is the day-1 setup gate.
- **Employer boundary holds.** No ThinkSys code, repo names, client names or work specifics enter this
  workspace. Lessons teach patterns on the lab.
- **Session 1 is Monday 17 August.** Today is Saturday.

## Out of scope

Cut to protect a one-hour block, and not to be re-added without a real interview punishing him for it:

- Microservices, Kubernetes, gRPC, GraphQL.
- Message brokers beyond one conceptual session on why background work leaves the request.
- Distributed-systems theory. `mission/plan.md` already cut Xu Vol 1 for the same reason.
- **Prisma beyond name recognition.** It is not on his CV. Sequelize and TypeORM are.
- Becoming a backend specialist. The target is **frontend-heavy full-stack**. The bar is "does not
  freeze on the backend half, and can defend the CV" — not "backend engineer".
