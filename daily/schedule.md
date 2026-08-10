# Weekday Schedule — the mission routine

> The curated plan. `/daily-log` reads this to run the plan and the wrap. `/console` reads
> `mission/state.json` for the phase and the alternation.
> **Rebuilt 2026-08-09.** The 07-29 sprint override expired 08-06 and was never closed; the standing
> routine underneath it belonged to a dead strategy (system design, reading, workout, project blocks,
> two office blocks). Edit this file if the routine changes — **and edit the dashboard's `SCHED`
> array in `daily/dashboard/template.html` at the same time, or the now-bar starts lying.**

---

## The phases

Driven by `mission/state.json`. `/console` prints which one is live.

| Phase | Window | Office | Backend slot | Scored blocks |
|---|---|---|---|---|
| **A1** | Mon 10 Aug → Mon 31 Aug | full day, bench | **.NET** (employer's ask) | cv-defense · mc/iqa · apply |
| **A2** | Tue 1 Sept → Mon 21 Sept | full day, bench | **Node** | + backend |
| **B** | Tue 22 Sept → Sun 15 Nov | **released** | Node | + dsa, all daily |

---

# Phase A1 / A2 — the office day (live now)

> ⚠ **Office hours below are a PLACEHOLDER (10:00–19:00).** Correct them here and in the dashboard's
> `SCHED` array on the first office day.

| Time | Block | Code | Owner |
|------|-------|------|-------|
| 9:30–9:45 am | Console + today's plan | `plan` | **ritual** — `/console` then `/daily-log plan` |
| 10:00 am–1:00 pm | Office — backend slot | `backend` | .NET to 31 Aug, **Node from 1 Sept** |
| 1:00–2:00 pm | Lunch | — | unscored |
| 2:00–7:00 pm | Office — bench | `office` | adherence only. **CV-drill reading happens here.** |
| 8:00–9:00 pm | CV interview-defense | `cv-defense` | you — say **"drill me"** (`learning/cv-defense/`) |
| 9:00–10:15 pm | Machine coding **/** Interview Q&A | `machine-coding` `interview-qa` | **alternating, see below** |
| 10:15–10:45 pm | Job applications | `apply` | you — submitted count gets logged |
| 10:45–11:15 pm | Wrap | `wrap` | **ritual** — `/daily-log wrap` |

**5 scored blocks:** `cvDefense`, `machineCoding`, `interviewQa`, `backend`, `apply`.
`backend` only scores from **1 Sept** (in A1 it is .NET, which is the employer's, not the mission's).

## The alternation

| Mon | Tue | Wed | Thu | Fri | Sat | Sun |
|---|---|---|---|---|---|---|
| machine-coding | interview-qa | machine-coding | interview-qa | machine-coding | **whichever is behind** | **OFF** |

Both go daily in **Phase B**, once the day job stops eating 9 hours.

## Saturday is ON. Sunday is OFF.

**Saturday** (~4 hours) exists because office weekdays crush the evening, and machine coding is the
one track that needs uninterrupted focus you won't have at 9pm after a full office day. It takes
whichever of machine-coding / interview-qa the console says is behind.

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
- **`backend` runs through `/backend`.** In A1 it is .NET **read and explained** — run it as the `X`
  half of each concept pair on `drill-board.md`, so September's Node is the `W` half of concepts you
  already understand rather than new material. **That framing is the only thing making the
  compressed Node window realistic.** The employer boundary holds inside it: no ThinkSys code, repo
  names, client names or work specifics, ever.
- **`apply` output is submitted applications**, logged with `/console log`. Researching companies is
  not applying. Tailoring a CV is `/cv-tailor`, not this block. **A block that produced zero
  applications did not happen, however busy it felt.**
- **Office blocks are opaque.** Adherence only. Never log ThinkSys work content.
- **Interview scheduled?** `mission/interview-sprint.md`. **The board does not change** — one hour
  swaps in for the JD. Nothing new enters the window.

### What was cut, and why — do not restore without a real interview punishing you for it

`sysdesign` (Xu Vol 1) · `reading` · `workout` · `project` · `ai-fluency` · `dsa` (until Phase B) ·
**.NET as prep** (office hours only, ends 31 Aug).

These were not cut for being unimportant. They were cut because **14 weeks and 8 tracks is
arithmetic that produces nothing**, which is exactly what the 26 days to 2026-08-09 demonstrated.
The full reasoning per track is in `mission/plan.md`. **`workout` comes back first** if the schedule
loosens — twelve-hour desk days were a July failure mode too.
