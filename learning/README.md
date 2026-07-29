# Learning

Home for every learning track. Keeps tutor state out of the AIOS root (`week.md`, `shipped.md`, the pipeline) so nothing collides.

## Not every track is a `/teach` track

`/teach` owns the **taught** tracks — it authors HTML lessons and cheat sheets from high-trust sources. Some tracks are driven by something other than a lesson, and each one declares which it is in its own README's opening blockquote:

| Track | Relationship | Driven by |
|---|---|---|
| `system-design-interview/`, `interview-qa/` | **Taught** — full `/teach` workspaces | `/teach` |
| `backend/` | **Taught *and* drilled** | `/backend` + the T0→T2→T7→T21 ladder |
| `dsa/` | **Tracked, not taught** | course + the D0→D2→D5→D10 queue |
| `machine-coding/` | **Tracked *and* coached** | `/machine-coding` + the R0→R3→R10 ladder |
| `cv-defense/` | **Tracked and drilled, not taught** | say "drill me" — no skill drives it |
| `reading/` | **Tracked and interrogated, not taught** | `/reading` — the source is the book, not the AI |

Read that blockquote first — it tells you who owns the folder.

## How a `/teach` workspace works

One topic = one subfolder. Run `/teach` from inside that subfolder so the workspace files land there, not in the repo root.

```
learning/
  <topic-slug>/
    MISSION.md              # why you're learning this — grounds every lesson
    RESOURCES.md            # curated high-trust sources + communities
    NOTES.md                # your preferences / working notes
    lessons/                # 0001-<name>.html — the interactive lessons
    reference/              # cheat sheets, glossaries, quick-reference docs
    learning-records/       # 0001-<name>.md — what you've actually learned
    assets/                 # shared stylesheet + reusable lesson components
```

## Starting a new topic

```bash
mkdir learning/<topic-slug>
cd learning/<topic-slug>
```

Then run `/teach <what you want to learn>`. First run, it interviews you to build `MISSION.md`.

Current quarter priorities to point this at: DSA, system design, interview prep. Reading runs alongside on its own cadence (`/reading`).
