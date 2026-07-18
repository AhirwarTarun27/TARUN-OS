# Weekday Schedule — the fixed routine

> The curated weekday plan. `/daily-log` reads this to run the morning plan and the
> midnight wrap-up. Weekends are OFF (not tracked). Edit this file if the routine changes.

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
- **Weekends:** no schedule, no log. If you work a weekend, log it manually — the ritual won't prompt.
