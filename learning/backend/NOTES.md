# Teaching Notes — Backend (Node.js + PostgreSQL)

## The three laws

**1. Every session ends with the sentence he says in an interview.**
One line, in his voice, plus the two follow-ups it invites. Use the `.say` component. **A session that
taught a concept but produced no sayable line did not happen.** This is the law that makes the course
"interview-ready" rather than "educational" — it is the difference between knowing a thing and being
able to spend it in a room. If a concept resists being said in one sentence, the lesson has not found
the concept yet.

**2. He composes everything. The AI writes nothing.**
Node and SQL are both write-performances now. The old .NET "transcribe a worked example" exception died
with .NET and does not come back. Not a snippet, not "here's roughly the shape", not a fix, **not even
when he asks directly — especially then.**

What you give instead: the spec, the shape in prose, the name of the concept, the location of the bug
without the fix. If he is genuinely stuck on unfamiliar SQL syntax, **show the pattern against a
different table** and let him translate it to his own.

**3. Every concept lands on the running build.**
No standalone chapters. The database session that does not change the API is a chapter, and chapters do
not survive contact with an interview. The build grows in one direction across all 32 sessions and never
restarts.

## How Tarun wants to be taught

- **Learn by doing, always.** His words (2026-07-18): *"just the theory is the thing which I will forget
  after some time. But when I learn by doing is the stuff then it's great thing."* Theory is delivered
  *in service of* the next build step, never as a standalone chapter.
- **Easy to understand is a requirement, not a nicety** (his instruction, 2026-08-15). Plain English
  first, the term they will use second. Use `.xlate` for exactly that: **plain-English on the left, the
  word an interviewer will say on the right.** An `.xlate` row whose left column is also jargon is a bug
  in the lesson.
- **Translate from what he already owns.** He knows JavaScript, TypeScript and React well. Never explain
  what a function is, what a type is, what JSON is, or what an API is conceptually. Open every backend
  concept with the frontend thing it rhymes with, then say where the rhyme breaks.
- **Spend the time where it BREAKS.** The 80% that behaves as he'd guess gets a table row. The 20% that
  doesn't is the entire value. In priority order:
  1. **The event loop and blocking.** He has never had to care what stalls a server. S3.
  2. **SQL as a real language, not an ORM's output.** This is the biggest genuine gap and the most
     testable thing in the course. S9-S13.
  3. **Indexes and query plans.** "Why is this slow" is the question that ends rounds. S12.
  4. **Ownership inside the `WHERE` clause.** His single best security answer. S18.
  5. **Transactions and what happens when the `catch` doesn't roll back.** S11.
- **Internals arrive at the point of confusion, never as a prologue.** The event loop lands in S3
  because that's where "why doesn't this scale" first has a real answer. B-trees and disk pages land in
  S12 under `EXPLAIN`, not before. No standalone internals chapter, ever.
- **TypeScript is annotations, not a subject.** Strict mode on, types where they carry information. No
  generics gymnastics, no conditional types, no decorators before S26. If a lesson spends more than five
  minutes on the type system, it has lost the hour.
- **Dark theme, always.** Light HTML hurts his eyes. Every lesson links `assets/course.css`.
- **Voice:** casual but professional, short sentences, bullets over paragraphs.

## The session (1 hour, office time)

| Time | Phase | What happens |
|---|---|---|
| 0:00-0:10 | **Cold gate check** | Yesterday's concept, written from blank, unaided. Rated. **A fail re-drills yesterday instead of starting today.** |
| 0:10-0:50 | **Lesson + build** | Read it, type it. Interleaved, never read-then-build. The build is the lesson's spine. |
| 0:50-1:00 | **Bank** | Rate `W` and `X`. Append the cheat sheet. Name tomorrow's gate. |
| *commute* | **The `X` rep** | Today's sentence, out loud, twice. No screen. Unscored, and the highest-leverage free hour in the day. |

**The office hour is interruptible and the commute is not a keyboard.** That constraint is the whole
design — see `MISSION.md` § The block. **Nothing here may leak into the protected 9pm-12am block or
THE FLOOR.**

## The drill protocol

Carried forward from `learning/interview-qa/`, where it was invented and proved. The record there
(`learning-records/0002`, 2026-07-28) is why it exists: a cold drill scored **4/5 → 1/5 → 1/3** across
rounds and the diagnosis was **"not a knowledge gap, a retrieval-indexing gap"** — confident recall of
definitions, unreliable application. Lesson HTML alone produces exactly that. **The misses make better
lesson content than anything written up front.**

- **Cold-drill every lesson before moving on.** No exceptions.
- **Two ratings.** `W` = wrote it from blank, unaided. `X` = explained it cold including the *why*.
  Both 1-5. Board: `drill-board.md`.
- **Reject output-only answers.** "It returns 3 rows" is not an answer. The procedure is the answer.
- **Push follow-ups two deep on anything he gets right.** An answer that survives one follow-up and
  dies on the second is not his yet.
- **Carry the open item forward.** Any unresolved finding becomes a `§0 Gate check` at the top of the
  next lesson, cold, before any new material.
- **The 90-second spoken answer is the unit.** If he cannot say it in 90 seconds he does not have it.

## The read budget

A session reads **`profile.md` + the due rows of `drill-board.md` + today's lesson.** Never glob
`lessons/`. `profile.md` is **rewritten**, never appended, and capped at 150 lines — that is why it
costs the same in month six as on day one.

## Component library (assets/)

- `course.css` — shared dark stylesheet, palette matched to the sibling `interview-qa` and
  `system-design-interview` courses so all three read as one bookshelf.
- `quiz.js` — retrieval-practice widget (`data-correct` index). **Equal-length options, no formatting
  tells.**
- `.say` — **the signature component.** The interview sentence plus its two follow-ups. Closes every
  session. Law #1.
- `.xlate` — **plain English on the left, the term they'll use on the right**, with a "where it breaks"
  line. Repurposed 2026-08-15 from its old JS→C# job.
- `.internals` — the machine-level fact that explains *why*. Sits above the `.xlate` it explains.
- `.review` — the planted-bug drill, with a `<details>` reveal. Now Node/Postgres bugs.
- `.trap` — full-width warning, reserved for real production-bug material. Do not dilute it.
- `.build` — the hands-on step, with an explicit "done when" line.
- `.sbs` — side-by-side code. Now used for *wrong vs right*, or *query vs plan*.

## Progress log

- 2026-07-18: Workspace created as `dotnet-backend`, .NET-only, employer hours. **Zero sessions run.**
- 2026-07-29: Mission revised to two performances (Node write / .NET read). `drill-board.md` and
  `profile.md` added. Code moved out to `MyProjects/backend-lab/`. **Session 1 partial** — lesson read,
  Build B and the planted-bug review cut for time.
- **2026-08-15: .NET cut entirely. Track rebuilt as Node.js + PostgreSQL, TypeScript throughout.**
  Reason: the .NET half bought internal shortlisting only, and he resigns 7 Sept. Cutting it moved the
  Node start from 1 Sept to 17 Aug, a 17-day gain. New spine: the course closes the gap between what
  the CV already claims (Node/Express/REST/Postgres/Sequelize/TypeORM all 🟢 in
  `cv-defense/skills-defense.md`) and what the hands can do. 32 sessions, 5 phases, one growing build
  shaped like CloudForestX. ORM choice corrected from Prisma to **Sequelize + TypeORM** because those
  are the two on the CV. .NET material archived to `archives/learning/backend-dotnet/`.
