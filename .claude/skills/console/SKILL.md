---
name: console
description: The job-hunt front door — the FIRST thing to run in any session. Prints the mission board (countdowns to resign / phase gate / the 15 Nov offer floor, the six counters with auto-re-cut, overdue ladder rungs, staleness flags), names the ONE next action, and hands off to the right ritual. Trigger on "/console", "what now", "where am I", "what should I do today", "status", "start", "what's due", "log an application", "I had an interview", "re-cut the plan". One run = one named next action.
---

# Mission Console — the front door

**This runs first, every session, before anything else.** It replaced `week.md` as the entry point on
2026-08-09 because `week.md` went stale for 21 days and nobody noticed.

The strategy is locked in `mission/plan.md`. This skill does not re-litigate it. It answers exactly
one question: **what is the ONE next action right now.**

## The law

**Run the script. Do not re-derive its numbers.**

```
node scripts/console.mjs
```

It parses `learning/cv-defense/progress.md`, `learning/machine-coding/queue.md`,
`learning/backend/drill-board.md`, `learning/dsa/queue.md`, `learning/interview-qa/`,
`daily/log.md`, `week.md` and the dashboard data. **You do not read those files.** That is the whole
point — the read budget is the script's stdout plus `mission/state.json`, and nothing else.

**Never glob `learning/`.** Never open `builds/`, `drills/`, `books/`, or `lessons/`. Those belong to
`/machine-coding`, the cv-defense drill loop, `/reading` and `/teach`, each under its own budget.

### Exit codes

| Code | Meaning | What you do |
|---|---|---|
| 0 | clean | Report the board. |
| 2 | **one or more parsers failed** | **Say so first, loudly.** A counter showing `??` is unknown, NOT zero. Name the file and offer to fix the header. Never guess the number. |
| 1 | script error | Report it verbatim. Check `node --version` is not 12.x. |

## Modes

### Default — the board

1. Run the script.
2. Report, in this order and nothing else:
   - **Any parse failures** (exit 2). These come before good news.
   - **Any staleness flags** — dark log, stale board, un-ingested dashboard.
   - **The countdown line**, especially days to the 15 Nov floor.
   - **The ONE next action**, with its one-line why.
3. Then hand off (below). Do not list all six counters unless asked or unless one flipped to `CUT`.

**Keep it to about eight lines.** He opens this when he is overwhelmed and looking for a place to
start. A wall of text at the front door is the thing this replaced.

### Hand-offs

| Condition | Hand to |
|---|---|
| Sunday | `/weekly-review` — then stop. Sunday is off. |
| Before ~5pm, no plan set today | `/daily-log plan` |
| After ~5pm, day not banked | `/daily-log wrap` |
| Next action is a CV drill | say **"drill me"** (`learning/cv-defense/`) |
| Next action is machine coding | `/machine-coding` — code goes in the lab, never in chat |
| Next action is a backend rung | `/backend` |
| Interview scheduled | **`mission/interview-sprint.md`**, and do not build a new plan |

### `log` — record funnel events

The only thing this system cannot derive. Edit `mission/state.json` directly.

An application: `{ "date": "YYYY-MM-DD", "company": "", "tier": "sacrificial|target", "role": "", "source": "" }`

An interview: `{ "date": "YYYY-MM-DD", "company": "", "round": "", "outcome": "passed|rejected|waiting", "punishedOn": ["..."] }`

**When logging an interview, `punishedOn` is the valuable field.** Push for specifics — the actual
questions that landed badly. Then mirror them into the Phase 2 gap queue table in
`learning/cv-defense/progress.md`. That table is the syllabus; without it he is guessing.

> An interview that went badly and produced three gap rows is a **success**. Say so. That is what the
> sacrificial wave is for, and he pre-committed to it on 2026-08-09.

### `recut` — re-plan

Run with `--json`, read the `counters` array, and report any counter at status `cut` with its
`reachable` number. **Recommend what to drop.** Never present a deficit, a percentage behind, or a
"you should have". The board re-cuts; it does not grade.

## Posture

Well-wisher, not drill sergeant. Same as `/daily-log`.

- **A floor day is a WIN.** 1 CV drill + 1 coding rep + 3 applications. If he hit the floor on a bad
  day, say plainly that the day counted. His failure mode is binary — 6/7 or 1/7 — and the collapses
  are anxiety-triggered, not discipline-triggered. The floor exists to break that.
- **Parked is not late.** DSA in Phase A and backend before 1 Sept are frozen *on purpose*. If he
  asks about them, confirm the plan is working. Never let a parked track read as debt.
- **Name one action.** Not three, not a menu. He came here because he could not decide where to
  start; handing back a list is the failure this skill exists to prevent.
- **Never re-open the strategy** unless he asks. Resign date, target tier, the 15 Nov floor and the
  DSA deferral are locked. If he wants to reopen one, that is `/grilling`, not this.

## Read budget

`scripts/console.mjs` stdout · `mission/state.json` · `mission/plan.md` **only if he asks why**.
That is the entire budget. It is what makes this cost the same in month three as on day one.
