# Backend — Node.js and .NET

> **Relationship: taught AND drilled.** `/teach` conventions author the lessons; `/backend` runs the
> block, fires the drills and banks the ratings. The ladder is `T0 → T2 → T7 → T21` in `drill-board.md`.

Two performances, one curriculum. **Node = write and speak** (the interview). **.NET = read and
explain** (the job). See `MISSION.md` for why they are trained differently.

## Where things are

| File | What it is |
|---|---|
| `MISSION.md` | Why this track exists, and the two-performance split that shapes everything |
| `NOTES.md` | The three laws, the session shape, the drill protocol, the progress log |
| `RESOURCES.md` | High-trust sources, split by side. **The .NET sourcing trap is documented here — read it before googling C#.** |
| `drill-board.md` | The spaced-rep board. One row per concept pair, separate `W` and `X` ratings. |
| `profile.md` | How he actually performs. **Rewritten every bank, never appended, 150-line cap.** |
| `reference/course-map.html` | The 10 sessions in 5 phases. Also the progress board. |
| `reference/node-to-dotnet.html` | **The living cheat sheet.** Appended every session. The artifact he keeps. |
| `lessons/NNNN-*.html` | One lesson per session. Dark theme, quizzes, builds, planted-bug review. |
| `learning-records/NNNN-*.md` | What was actually learned, and what the drill found. Not a journal. |

## The read budget

A session reads **`profile.md` + the due rows of `drill-board.md` + today's lesson.** Three files.
**Never glob `lessons/`.** That is what keeps a session in month six cost the same as a session on
day one.

## The code is not here

```
C:\Users\ahirwar.tarun\Documents\Learning\MyProjects\backend-lab\
```

Its own repo, deliberately outside the AIOS. `node_modules` plus `bin/obj/packages` would bury this
workspace. The lab is a registered additional working directory, so a session running from TARUN-OS can
**read** the code without owning it.

**Nothing about what he has learned is ever written to the lab.** Ratings, records and the board live
here. This is the opposite of the product-repo rule, and deliberately so: the lab is a scratchpad, not a
source of truth.

## How a session runs

| Surface | Role | Who writes there |
|---|---|---|
| Terminal, from TARUN-OS | Teach, review, drill, bank | The AI, in `learning/backend/` only |
| Browser, the lesson HTML | Read the material, take the quizzes | Nobody. Static plus `quiz.js`. |
| VS Code / Visual Studio, `backend-lab/` | Write and run the code | **Tarun only** |

`/backend teach` authors the lesson and opens it → he reads it → he writes the Node build and
transcribes the C# twin in the lab → he says "done" → **the AI reads those files, reviews them, and
fires the cold drill** → `/backend bank` writes the rating and record back here.

**The AI reads his code and never edits it.** A bug is reported in chat with the reasoning; he types the
fix. Same law as `/machine-coding`: every line written for him is a rep he does not get.
