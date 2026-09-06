# Backend — Node.js and PostgreSQL

> **Relationship: taught AND drilled.** `/backend` runs the block, authors the lessons, fires the cold
> drills and banks the ratings. The ladder is `T0 → T2 → T7 → T21` in `drill-board.md`.

**One stack. One project. 32 one-hour sessions.** The course closes the gap between what
`references/cv/master.tex` already claims and what the hands can do. See `MISSION.md` for why that
framing, and `CURRICULUM.md` for the whole syllabus in plain English.

**.NET was cut on 2026-08-15.** It existed to get him shortlisted internally; he resigns 7 Sept, so it
buys nothing. Archived at `archives/learning/backend-dotnet/`.

## Where things are

| File | What it is |
|---|---|
| `CURRICULUM.md` | **Start here.** All 32 sessions in plain English: learn / build / **the sentence you say**. |
| `MISSION.md` | Why this track exists, why .NET went, and the CV-gap framing that shapes everything |
| `NOTES.md` | The three laws, the session shape, the drill protocol, the progress log |
| `RESOURCES.md` | High-trust sources, live-verified on the date of their section |
| `drill-board.md` | The spaced-rep board. One row per concept, separate `W` and `X` ratings. |
| `profile.md` | How he actually performs. **Rewritten every bank, never appended, 150-line cap.** |
| `reference/course-map.html` | The 32 sessions in 5 phases. Also the progress board. |
| `reference/node-postgres-sheet.html` | **The living cheat sheet.** Appended every session. The artifact he keeps. |
| `lessons/NNNN-*.html` | One lesson per session. Dark theme, quizzes, builds, planted-bug review. |
| `learning-records/NNNN-*.md` | Decision-grade insights only. Not a journal. |

## The read budget

A session reads **`profile.md` + the due rows of `drill-board.md` + today's lesson.** Three files.
**Never glob `lessons/`.** That is what keeps a session in month six costing the same as a session on
day one.

## The code is not here

```
C:\Users\ahirwar.tarun\Documents\Learning\MyProjects\backend-lab\
```

Its own repo, deliberately outside the AIOS. `node_modules` would bury this workspace. The lab is a
registered additional working directory, so a session running from TARUN-OS can **read** the code
without owning it.

**Nothing about what he has learned is ever written to the lab.** Ratings, records and the board live
here. This is the opposite of the product-repo rule, and deliberately so: the lab is a scratchpad, not
a source of truth.

## How a session runs

| Surface | Role | Who writes there |
|---|---|---|
| Terminal, from TARUN-OS | Teach, review, drill, bank | The AI, in `learning/backend/` only |
| Browser, the lesson HTML | Read the material, take the quizzes | Nobody. Static plus `quiz.js`. |
| VS Code, `backend-lab/` | Write and run the code | **Tarun only** |
| **The commute** | Say today's sentence out loud, twice | Nobody. No screen. |

**The hour, split:** 10 min cold gate on yesterday → 40 min lesson + build → 10 min bank.
Then the commute carries the spoken `X` rep.

**The AI reads his code and never edits it.** A bug is reported in chat with the reasoning; he types
the fix. Same law as `/machine-coding`: every line written for him is a rep he does not get.

## What this track is wired to

- **`learning/cv-defense/` D33** (`drills/33-node-data.md`) — S18 builds the ownership-scoping answer
  and S26 closes D33's pending queue item #3 (one entity + one migration + one scoped query).
- **`daily/schedule.md`** — the `backend` block, and the office/commute/gate split.
- **`mission/plan.md`** — the finish line: 8 concepts at `W ≥ 4` / `X ≥ 4`.
