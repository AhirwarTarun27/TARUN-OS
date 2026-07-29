# Weekday Schedule — the fixed routine

> The curated weekday plan. `/daily-log` reads this to run the morning plan and the
> midnight wrap-up. Weekends are OFF (not tracked). Edit this file if the routine changes.

---

# ⚡ SPRINT OVERRIDE — active Wed 2026-07-29 → ~Thu 2026-08-06

> **`/daily-log` reads THIS table, not the standing routine below, until the sprint ends.**
> Declared by Tarun 2026-07-29 as a ~8-day push. The standing routine is intact underneath and
> resumes when this expires. **At `/weekly-review`, ask whether it is over.**

| Time | Block | Code | Owner |
|------|-------|------|-------|
| 9:00–11:00 am | Interview Q&A practice | `interview-qa` | **→ `/teach`** (50 min + 10 min break) |
| 11:00 am–1:00 pm | CV interview-defense | `cv-defense` | you — say "drill me" (`learning/cv-defense/`) |
| 1:00–1:30 pm | Lunch | — | unscored |
| 1:30–3:00 pm | Machine coding | `machine-coding` | **→ `/machine-coding`** (lab + rubric + profile) |
| **3:00–5:00 pm** | **Backend — Node.js + .NET** | **`backend`** | **→ `/backend`** (`learning/backend/`) |
| 5:00–5:10 pm | Break | — | unscored |
| 5:10–6:00 pm | AI fluency study | `ai-fluency` | you |
| 6:00–7:00 pm | Break / dinner | — | unscored |
| 7:00–8:00 pm | DSA practice | `dsa` | you |
| **8:00–9:00 pm** | **Job applications** | **`apply`** | you — see the rule below |

**7 scored blocks:** `interview-qa`, `cv-defense`, `machine-coding`, `backend`, `ai-fluency`, `dsa`,
`apply`. A day is a win when the **majority** land.

### ⚠ The triage order when the day compresses (stated 2026-07-29)

> **1. `interview-qa` · 2. Node practice (the Node half of `backend`) · 3. `cv-defense`.**

If the day falls apart, those three are what get protected. Everything else yields — including `dsa`
and `machine-coding`, which this **deliberately demotes out of the top 3**. Do not re-promote them from
the older 07-07 ordering in `context/priorities.md`.

**Inside the `backend` block this has teeth: when the block runs short, cut the C#/.NET half, never the
Node build.** .NET is the employer's ask; Node is the offer.

### Why `apply` sits at 8:00-9:00pm

It is the **lowest-cognitive-load block of the day**, so it is the only one that survives being last —
the same argument that put `reading` at 11:45pm in the standing routine. It also lands *after* DSA, so
the hard thinking is already done. **The 6:00-7:00pm gap was deliberately left alone**: 9am to 9pm is a
twelve-hour run and killing the only real break in it would cost more than the hour gains.

**The rule for this block: applications only, no polishing.** Tailoring a CV is `cv-defense` work at
11am (`/cv-tailor`). Researching companies is not applying. **The output is submitted applications, and
the count gets logged at wrap.** A block that produces zero applications did not happen, however busy it
felt.

### What the sprint drops, deliberately

`workout`, `project`, `reading`, `sysdesign` — and **both office blocks**. Recorded here so nobody
"fixes" it later and so `/weekly-review` can ask the honest questions:

- **Office blocks are gone from this table.** The standing routine has 3.5 hours of them and the .NET
  learning used to be paid for with those hours. If office work is still happening, it is happening
  outside this schedule and unlogged. **Flag it at the first wrap.**
- **`workout` is dropped for ~8 days.** Twelve hours of desk time with two breaks. That is a sprint
  trade, not a new baseline. If the sprint extends past 08-06, `workout` comes back first.
- **`backend` replaces the old `dotnet-backend` office-hours arrangement entirely.** It is now a
  scored, job-hunt-hours block, because it is ~60% Node interview prep. See below.

---

## The standing routine — resumes after the sprint

## The blocks

| Time | Block | Code | Owner |
|------|-------|------|-------|
| 10:30–10:45 am | Today's planning (with AIOS) | `plan` | **ritual** — `/daily-log plan` |
| 11:00–11:30 am | Interview Q&A practice | `interview-qa` | **→ `/teach`** |
| 11:45 am–12:30 pm | DSA practice | `dsa` | you |
| 12:45–1:30 pm | Machine coding | `machine-coding` | **→ `/machine-coding`** (lab + rubric + profile) |
| 2:00–3:30 pm | System design — Xu Vol 1 (interview prep) | `sysdesign` | **→ `/teach`** (learning/system-design-interview) |
| 3:30–5:30 pm | Office work (thinksys) | `office-am` | you — time-adherence only |
| 6:00–7:00 pm | Home workout | `workout` | you |
| 8:00–9:00 pm | Project work (this OS / products) | `project` | you |
| 10:00–11:30 pm | Office work (thinksys) | `office-pm` | you — time-adherence only |
| 11:45 pm–12:15 am | Book reading — **intake only** | `reading` | you — read, then one line. No AI. |
| 12:15–12:45 am | Whole-day wrap-up (with AIOS) | `wrap` | **ritual** — `/daily-log wrap` |

**7 scored blocks** — the success count: `reading`, `dsa`, `machine-coding`, `sysdesign`,
`workout`, `project`, `interview-qa`. A day is a win when the **majority of these** land.

> **Swapped 2026-07-17** (`reading` ↔ `interview-qa`). `interview-qa` hit 1 of 5 weekdays sitting at
> 11:45pm — the only learning block stranded after two office blocks. That was **placement, not
> discipline**, so it moved to the fresh 11:00am slot. `reading` took the late slot because it's the
> one block cheap enough to survive it. See `decisions/log.md`.

**Office blocks (`office-am`, `office-pm`) are NOT scored** — they're the day-job floor, not the
scorecard. At `wrap` the recap still *asks* how office work went (✓/✗ adherence, logged separately),
but they never count toward the daily N/7. `plan` and `wrap` are the ritual itself, also unscored.

## Handoffs and boundaries

- **`sysdesign` and `interview-qa` run through `/teach`.** `/daily-log` never teaches these —
  it schedules them, then at wrap-up logs one line on what `/teach` covered (pulled from
  `learning/<topic>/learning-records/`). Depth lives in the learning workspace, not here.
- **`machine-coding` runs through `/machine-coding`.** The code gets written in the **lab**
  (`learning/machine-coding/lab/index.html`), never in chat and never in the terminal. `/daily-log`
  surfaces what's due at plan and confirms the session was ingested at wrap — it never grades and
  never coaches. **No AI writes code during that block.** That is the entire point of it.
- **`reading` is INTAKE ONLY — the block never runs `/reading`.** Read. If something bites, write
  **one line**. That's the whole block. The one-line capture *is* the rep — if you can't say what bit
  you in one line, it didn't bite you. The drill (`/reading` — compress, test, own) is expensive and
  runs **on demand**, prompted at `/weekly-review`, never at 11:45pm. Splitting intake from thinking
  is the entire point: putting a synthesis drill in this slot is exactly what killed `interview-qa`
  here, and it would kill `reading` the same way. `/daily-log wrap` banks the line at 12:15am, while
  it's still warm.
- **The late slot is narrative books only.** Psychology/business/biography survive 11:45pm after two
  office blocks. A dense technical book does not — it becomes a page you re-read four times. If a
  dense book matters, it needs a morning block or it doesn't get read. See `learning/reading/README.md`.
- **Office blocks are opaque.** Track ✓/✗ adherence only. Never ask for or log thinksys work
  content — the employer boundary in `CLAUDE.md` holds inside the daily log too.
- **The backend track (`/backend`) replaced the old .NET arrangement on 2026-07-29.** It was seeded
  2026-07-18 as `learning/dotnet-backend/`, .NET-only, paid for with employer hours and forbidden from
  touching a job-hunt block. **Zero sessions ran under that framing.** It is now
  `learning/backend/` — **two performances**: Node.js written and spoken (the interview), C#/.NET read
  and explained (the job). Roughly 60% of it is Node interview prep, so it legitimately earns job-hunt
  hours and is a **scored block** in the sprint table above. Code lives outside this repo at
  `MyProjects/backend-lab/`.
  - **The employer boundary still holds inside it.** No thinksys code, repo names, client names or work
    specifics — in the workspace, in a lesson, or in the daily log. At wrap, log the session number and
    the ratings, never work content.
  - **When the sprint ends and office blocks return, the hours question returns with them.** If the
    .NET half starts crowding out `dsa`, `machine-coding` or `interview-qa`, flag it at
    `/weekly-review` as a failure, not as progress. The risk is unchanged: .NET has a boss attached to
    it and the job hunt does not, so urgency will keep trying to beat importance.
- **Weekends:** no schedule, no log. If you work a weekend, log it manually — the ritual won't prompt.
