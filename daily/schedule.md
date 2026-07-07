# Weekday Schedule — the fixed routine

> The curated weekday plan. `/daily-log` reads this to run the morning plan and the
> midnight wrap-up. Weekends are OFF (not tracked). Edit this file if the routine changes.

## The blocks

| Time | Block | Code | Owner |
|------|-------|------|-------|
| 10:30–10:45 am | Today's planning (with AIOS) | `plan` | **ritual** — `/daily-log plan` |
| 11:00–11:30 am | Book reading | `reading` | you |
| 11:45 am–12:30 pm | DSA practice | `dsa` | you |
| 12:45–1:30 pm | Machine coding | `machine-coding` | you |
| 2:00–3:30 pm | System design — Xu Vol 1 (interview prep) | `sysdesign` | **→ `/teach`** (learning/system-design-interview) |
| 3:30–5:30 pm | Office work (thinksys) | `office-am` | you — time-adherence only |
| 6:00–7:00 pm | Home workout | `workout` | you |
| 8:00–9:00 pm | Project work (this OS / products) | `project` | you |
| 10:00–11:30 pm | Office work (thinksys) | `office-pm` | you — time-adherence only |
| 11:45 pm–12:15 am | Interview Q&A practice | `interview-qa` | **→ `/teach`** |
| 12:15–12:45 am | Whole-day wrap-up (with AIOS) | `wrap` | **ritual** — `/daily-log wrap` |

**7 scored blocks** — the success count: `reading`, `dsa`, `machine-coding`, `sysdesign`,
`workout`, `project`, `interview-qa`. A day is a win when the **majority of these** land.

**Office blocks (`office-am`, `office-pm`) are NOT scored** — they're the day-job floor, not the
scorecard. At `wrap` the recap still *asks* how office work went (✓/✗ adherence, logged separately),
but they never count toward the daily N/7. `plan` and `wrap` are the ritual itself, also unscored.

## Handoffs and boundaries

- **`sysdesign` and `interview-qa` run through `/teach`.** `/daily-log` never teaches these —
  it schedules them, then at wrap-up logs one line on what `/teach` covered (pulled from
  `learning/<topic>/learning-records/`). Depth lives in the learning workspace, not here.
- **Office blocks are opaque.** Track ✓/✗ adherence only. Never ask for or log thinksys work
  content — the employer boundary in `CLAUDE.md` holds inside the daily log too.
- **Weekends:** no schedule, no log. If you work a weekend, log it manually — the ritual won't prompt.
