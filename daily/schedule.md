# Weekday Schedule — the mission routine

> The curated plan. `/daily-log` reads this to run the plan and the wrap. `/console` reads
> `mission/state.json` for the phase and the alternation.
> **Rebuilt 2026-08-09**, **real hours filled in 2026-08-10.** The 07-29 sprint override expired
> 08-06 and was never closed; the standing routine underneath it belonged to a dead strategy (system
> design, reading, workout, project blocks, two office blocks). Edit this file if the routine changes
> — **and edit the dashboard's `SCHED` array in `daily/dashboard/template.html` at the same time, or
> the now-bar starts lying.**

---

## The phases

Driven by `mission/state.json`. `/console` prints which one is live.

| Phase | Window | Office | Backend slot | Scored blocks |
|---|---|---|---|---|
| **A1** | Mon 10 Aug → Mon 31 Aug | full day, bench | **Node + PostgreSQL** (1 hr) | cv-defense · mc/iqa · apply · **backend** |
| **A2** | Tue 1 Sept → Mon 21 Sept | full day, bench | Node + PostgreSQL | + backend |
| **B** | Tue 22 Sept → Sun 15 Nov | **released** | Node + PostgreSQL, still 1 hr | + dsa, all daily |

> **.NET was cut 2026-08-15.** It only ever bought internal shortlisting, and he resigns 7 Sept. The
> backend slot became Node + PostgreSQL immediately, which moved the Node start from 1 Sept to
> **17 Aug — a 17-day gain.** Curriculum: `learning/backend/CURRICULUM.md`.

---

# Phase A1 / A2 — the office day (live now)

> **Real hours, set 2026-08-10.** The 10:00–19:00 placeholder is gone.

| Time | Block | Code | Owner |
|------|-------|------|-------|
| 8:30–9:30 am | Commute out — **spoken reps** | `commute` | **unscored bonus.** Out loud, no screen. |
| 9:30–9:45 am | Console + today's plan | `plan` | **ritual** — `/console` then `/daily-log plan` |
| 9:45–10:15 am | **Job applications** | `apply` | you — submitted count gets logged |
| 10:15–11:15 am | Office — **backend, 1 hr** | `backend` | **Node + PostgreSQL.** `/backend`. One session/day. |
| 11:15 am–1:00 pm | Office — bench | `office` | adherence only. |
| 1:00–2:00 pm | Lunch | — | unscored |
| 2:00–4:00 pm | Office — **load tonight's rep** | `office` | unscored prep. See "load / fire" below. |
| 4:00–6:30 pm | Office — bench | `office` | adherence only. |
| 6:30–7:30 pm | Commute home | `commute` | unscored. Second spoken rep, or decompress. |
| 7:30–9:00 pm | Dinner / off | — | **genuinely off.** Not a reserve slot. |
| 9:00–10:30 pm | Machine coding **/** Interview Q&A | `machine-coding` `interview-qa` | **alternating, see below** |
| 10:30–11:30 pm | CV interview-defense | `cv-defense` | you — say **"drill me"** (`learning/cv-defense/`) |
| 11:30 pm–12:00 am | Wrap | `wrap` | **ritual** — `/daily-log wrap` |

**5 scored blocks:** `apply`, `backend`, `machineCoding`, `interviewQa`, `cvDefense`.
**`backend` scores from 2026-08-15.** It used to score only from 1 Sept, because in A1 it was .NET —
the employer's ask, not the mission's. .NET is gone, so the block is mission work from day one.

## Two kinds of time — this is the whole design

The day is not one pool of hours. It is two, and they are not interchangeable.

| | **Interruptible** | **Protected** |
|---|---|---|
| When | office, 9:45 am–6:30 pm | **9:00 pm–12:00 am** |
| Size | 0–5 h, **can vanish without notice** | 3 h, nobody can take it |
| Survives interruption? | yes — that's the entry condition | no |
| Holds | `apply` · `backend` · CV-drill reading | the **timed** coding rep · the drill |

**Why the timed round is at 9pm and not in office hours.** A machine-coding round is a clock and 90
uninterrupted minutes. Office time can end mid-sentence — you're on bench *until you aren't*. A round
interrupted at minute 40 isn't a partial rep, it's zero. So the two things that die on interruption
get the only hours nobody can take, and they go **hardest-first at 9:00**, not at 11.

**Why `apply` is first thing in the office day.** It is the most interruption-proof scored task
(30 min, no setup, no state to lose) and the one that most directly moves 15 Nov. So it takes the
office slot least likely to be eaten — before the day has a chance to fill up.

> **Fallback rule:** if office time got eaten and `apply` never happened, it collapses into the
> **11:30 wrap slot**. It costs 20 minutes. **The floor never fails because of the day job.**

## Office = LOAD. Evening = FIRE.

> **Nothing you do in office hours is its own goal.** Everything you touch there is the input for a
> **named rep you will perform that night.**

Added 2026-08-10, when the bench turned out to hold 2-3 spare hours. Every track has two halves with
opposite requirements, and only the left column belongs in interruptible time:

| Track | **Load** — office, survives interruption | **Fire** — protected block, dies on interruption |
|---|---|---|
| CV defense | read the kb section for tonight's bullet | the closed-book drill, spoken |
| Interview Q&A | read the lesson, work the snippets | speak-it → predict-it → "so why?" |
| Node / backend | the 1-hr session: read the concept, **type the build** | **the commute** — say today's sentence out loud (`X`), then next morning's 10-min cold gate (`W`) |
| Machine coding | read tonight's primitive / problem | the **timed** round |

**Why this rule and not just "study more in office".** Three tracks loose in office hours is **eight
tracks again** — which is not a hypothetical, it is the 26 days to 2026-08-09: no finish line, so no
day could end well. Load-for-tonight keeps the count at four and makes the protected block worth
roughly double. Study with its own ambitions produces a good feeling and zero output.

**The existing law applies unchanged:** *a block that produced zero applications did not happen,
however busy it felt.* **Reading for a rep you never perform is not a rep.**

### Office hours are the one resource you don't control

You are on bench *until you aren't*. So, in priority order — if the day gets eaten, you lose from the
bottom:

1. **`apply`** (9:45, 30 min) — scored, and has a fallback into the 11:30 wrap slot.
2. **Load** (2:00-4:00) — unscored. Cheapest to lose, but it is what makes tonight cheap.
3. **`backend`** (10:15-11:15, 1 hr) — scored, **no fallback.** On a day the office eats it you lose
   the block. **You never lose the floor** — the floor lives entirely in 9pm-12am.
   > The backend session is built to survive this: the hour holds reading and typing, which cost
   > minutes when interrupted. The two reps that die on interruption were moved out — the spoken `X`
   > rep rides the commute, and the cold `W` rep is the first 10 minutes of the next session.

**No part of the floor may ever depend on office hours.** If a future edit makes it, that edit is wrong.

### The employer boundary inside office hours

Until 7 Sept you are protecting **₹3.14L** with full compliance. That constrains *where*, not *what*:

- **Own device, own mobile data. Never the work machine, never the work network.**
- **Node / JS / .NET reading is safe on any screen** — it reads as professional development, because
  it is.
- **`apply`, `/cv-tailor`, and CV-defense material are phone-only.** A job board or a résumé on a work
  screen four weeks before you resign is a bad trade against ₹3.14L. Do `apply` on the commute or at
  lunch if the desk is exposed.
- Never log ThinkSys work content, repo names, client names or specifics — anywhere in this repo.

## Commute — 2 hours/day, spoken only

Unscored on purpose. A sixth scored block right after building a five-block floor is how the floor
stops meaning anything. Treat it as free upside, not an obligation.

Only one kind of work fits: **out loud, no screen.** CV answers spoken end to end, interview-qa
recall, "so why?" follow-ups, and **today's backend sentence, twice.** That happens to be exactly the
muscle interviews test and the one reading can't build — you have never once been asked to *write*
your CV answers.

> **The evening commute now has a named job.** Every backend session ends with one sentence you can
> say in an interview (`learning/backend/` law #1). Saying it out loud on the way home **is** the `X`
> rep on the drill board. It costs nothing, it needs no screen, and it is the half of the rating that
> the office hour structurally cannot produce.

**Nothing that needs a screen goes here.** If it needs a keyboard, it belongs in the protected block.

## The alternation

| Mon | Tue | Wed | Thu | Fri | Sat | Sun |
|---|---|---|---|---|---|---|
| machine-coding | interview-qa | machine-coding | interview-qa | machine-coding | **whichever is behind** | **OFF** |

Both go daily in **Phase B**, once the day job stops eating 9 hours.

## Saturday is ON. Sunday is OFF.

**Saturday** (~4 hours) is the *fresh* protected block. The weekday 9pm block is protected too, but
it lands after nine office hours and two hours of commuting — same three hours, much worse ones.
Saturday is where a rep gets your actual best. It takes whichever of machine-coding / interview-qa
the console says is behind.

**Sunday is fully off** and holds `/weekly-review` only. It is the only true rest day, and the
collapse pattern in the July logs is anxiety-driven — a week with no rest day is how a bad day
becomes a dark week.

---

## THE FLOOR — the minimum viable day

> ## 1 CV drill + 1 coding rep + 3 applications
> **~3 hours. Hitting this is a WIN, whatever else happened.**

This is the most important line in the file.

The July logs are binary: 6/7 or 1/7, with almost nothing between, and the collapses have causes
written next to them — 07-15 is *"manager signalled the project is winding down → job-security
anxiety derailed the afternoon."* That anxiety is now permanent, not an event. **A plan that assumes
calm days will fail, because there won't be many.**

The floor exists so a bad day lands somewhere above zero. `build.mjs` derives `floor` on every
scored entry and the dashboard scores a floor day as a **WIN** regardless of block count. That is
deliberate. **Do not "fix" it to a stricter bar.**

---

## Handoffs and boundaries

- **`/console` runs FIRST, every session.** It names the one next action. `week.md` is no longer the
  entry point — it went stale for 22 days and nothing caught it.
- **`cv-defense` is a two-way drill, not a skill.** Say "drill me". Read budget: `defend-map.md` +
  the one drill file + `progress.md`. **Never glob `drills/`.**
- **`machine-coding` runs through `/machine-coding`.** Code is written in the **lab**
  (`learning/machine-coding/lab/index.html`), never in chat, never in the terminal. **No AI writes
  code during that block** — that is the entire point of it.
- **`interview-qa` runs through `/teach`.** Drills are speak-it **then** predict-it, wording free,
  must-hit keywords strict, with a mandatory "so why?" follow-up.
- **`backend` runs through `/backend`.** **Node + PostgreSQL, TypeScript throughout, 32 one-hour
  sessions** — syllabus in `learning/backend/CURRICULUM.md`. The hour is 10 min cold gate → 40 min
  lesson + build → 10 min bank, and **the commute carries the spoken `X` rep.** The premise: the CV
  already sells this stack 🟢, so the course closes the gap between the claim and the hand. **The AI
  never writes the build or the SQL.** The employer boundary holds inside it: no ThinkSys code, repo
  names, client names or work specifics, ever.
- **`apply` output is submitted applications**, logged with `/console log`. Researching companies is
  not applying. Tailoring a CV is `/cv-tailor`, not this block. **A block that produced zero
  applications did not happen, however busy it felt.**
- **Office blocks are opaque.** Adherence only. Never log ThinkSys work content.
- **Interview scheduled?** `mission/interview-sprint.md`. **The board does not change** — one hour
  swaps in for the JD. Nothing new enters the window.

### What was cut, and why — do not restore without a real interview punishing you for it

`sysdesign` (Xu Vol 1) · `reading` · `workout` · `project` · `ai-fluency` · `dsa` (until Phase B) ·
**.NET entirely** (cut 2026-08-15 — it only bought internal shortlisting, and he resigns 7 Sept;
archived at `archives/learning/backend-dotnet/`).

These were not cut for being unimportant. They were cut because **14 weeks and 8 tracks is
arithmetic that produces nothing**, which is exactly what the 26 days to 2026-08-09 demonstrated.
The full reasoning per track is in `mission/plan.md`. **`workout` comes back first** if the schedule
loosens — twelve-hour desk days were a July failure mode too.
