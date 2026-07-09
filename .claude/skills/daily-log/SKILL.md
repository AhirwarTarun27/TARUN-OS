---
name: daily-log
description: The weekday execution ritual — bookends the day and tracks the fixed routine. Morning mode (10:30am) sets today's focus per block; wrap mode (12:15am) runs a short QnA on how each block went and logs one compact entry. Keeps a terse rolling daily log, and on the last weekday of the month compresses it into a monthly summary and resets. Trigger on "/daily-log", "plan my day", "morning planning", "wrap up the day", "daily log", "how did today go", "log today". One run = one plan set OR one day banked.
---

# Daily Log — the weekday execution ritual

The daily counterpart to `/weekly-review`. `week.md` holds the 3 outcomes; this ritual makes
sure the **hours** ladder up to them. It bookends each weekday: a 15-min plan in the morning,
a 30-min wrap at night. Same well-wisher-not-drill-sergeant posture — honest, on the user's side.

**Weekdays only.** Weekends have no schedule and no log.

## Two modes

Pick the mode from the argument or the time of day:
- **`plan`** (≈10:30 am) — set today's focus. Fast. No log entry yet.
- **`wrap`** (≈12:15 am) — score the day, run the QnA, write the one compact log entry.

If invoked with no argument: before ~5pm → `plan`; after → `wrap`. Ask if genuinely unclear.

## Files this skill touches

- `daily/schedule.md` — the fixed routine + block codes (read every run; never edit unless the user changes their routine)
- `daily/log.md` — the current-month rolling log (append at wrap; reset at month-end)
- `daily/summaries/YYYY-MM.md` — monthly summary (write at month-end)
- `archives/daily/YYYY-MM.md` — raw month archived at month-end (never deleted)
- `week.md` — read at plan-time to tie the day to this week's 3 outcomes
- `learning/*/learning-records/` — read at wrap to pull what `/teach` covered for `sysdesign` / `interview-qa`
- `learning/dsa/queue.md` — the DSA spaced-rep tracker (read at plan for what's due; advance the rung + recompute due dates at wrap)
- `shipped.md` — if the day shipped something real, also bank a one-liner there (don't double-track routine)

## Mode: `plan` (morning)

1. Open `week.md`. State this week's 3 outcomes in one line so the day is anchored to them.
2. Open `daily/schedule.md`. The routine is fixed, so planning = deciding the **focus** for the
   flexible blocks, not rebuilding the timetable. Ask a tight set (descriptive, not a wall):
   - **Must-ship:** the ONE thing that makes today count (mirror it into `week.md` → "Today — ONE must-ship").
   - **`dsa`:** read `learning/dsa/queue.md` → surface 🔴 revisions **due today** (problem + rung), then ask which NEW problem is today's D0. The due revisions + one new problem ARE the block's plan. (See "DSA spaced-rep engine" below.)
   - **`machine-coding`:** which problem/pattern today?
   - **`sysdesign`:** which Xu Vol 1 chapter/topic → confirm to run via `/teach` (interview-focused; see learning/system-design-video-path.md for the watch-first video).
   - **`project`:** which task on the current product?
   - **`reading`:** which book / where.
   - **Flex:** any block you already know you'll move or skip today, and why.
3. Keep it to ~15 min. Don't write a log entry — that happens at wrap. End by pointing at the
   first block and, for `sysdesign`/`interview-qa`, remind that those run through `/teach`.

## Mode: `wrap` (midnight)

1. Read `daily/schedule.md` for the 8 scored block codes. Read today's `plan` intentions if set.
2. **Run the QnA — short and honest.** Go block by block, but move fast:
   - Which of the 8 blocks **hit**? (binary per block — "half" = miss, same rule as weekly-review)
   - For each **miss**, one honest question: capacity, clarity, or avoidance? Log the real cause in a few words.
   - For each **learning block** (`sysdesign`, `interview-qa`): one line on what `/teach` covered. Pull it from
     `learning/<topic>/learning-records/` if written there; otherwise ask and let `/teach` own the depth.
   - **`dsa` block:** if it hit, update `learning/dsa/queue.md` — add any new **D0** problem(s) solved (pattern + one-line key idea);
     for each **revision** done, ask the 1–5 smoothness rating, advance the rung, and recompute Next due per the ladder
     (see "DSA spaced-rep engine" below). Notes stay one-line — depth is in Tarun's notebook.
   - **Energy** for the day, 1–5.
   - Did the **must-ship** land? ✅ / ❌.
3. **Write ONE compact entry** to the top of `daily/log.md` (newest on top), ~4 lines:
   ```
   ## 2026-07-06 Mon · 6/8 · energy 4/5
   ✓ reading machine-coding workout project office-am office-pm
   ✗ sysdesign — meetings ran over · interview-qa — too tired
   notes: machine-coding=LRU cache done · project=roster rankings UI shipped · must-ship=✅ marketing queue
   ```
   Terse. This file must stay scannable across a full month.
4. If something **real** shipped (a deploy, a decision, a finished feature — not routine adherence),
   also append a one-liner to `shipped.md` and suggest logging any decision in `decisions/log.md`.
5. **Refresh the streak dashboard** (`daily/dashboard.html` → the Momentum Console). Convert today's
   `pending:true` day into a scored entry object in `DATA.entries[]` (blocks/energy/office/mustShip
   match the log entry), add tomorrow's pending day, then redeploy the Artifact to its saved URL. All
   stats are derived — only touch `DATA.entries[]`, never the computed numbers. Full workflow + URL in
   the `daily-streak-dashboard` memory. Scoring: >=4 of 7 blocks = a WIN.
6. Close with one line: blocks hit today + the single thing to fix tomorrow. No lecture.

## Month-end: compress + reset

On the **last weekday of the month** (or first run of a new month if it was missed), before writing
the new day's entry:

1. Read all of `daily/log.md` for the month.
2. Write `daily/summaries/YYYY-MM.md` — the compressed record:
   - Hit-rate per block (e.g. `reading 22/23 · sysdesign 15/23 · interview-qa 9/23`).
   - Longest streaks and the worst recurring miss (with its real cause).
   - 3–5 biggest wins of the month (cross-reference `shipped.md`).
   - 1–2 concrete adjustments to carry into next month.
3. Copy the raw month verbatim to `archives/daily/YYYY-MM.md` (**never delete** — AIOS rule).
4. Reset `daily/log.md`: new `# Daily Log — YYYY-MM (Month)` header, the format comment block, empty entries.
5. Update the summary's "carry-in" note at the top of the fresh `daily/log.md` so next month starts informed.

## Output contract

- **plan run:** this week's 3 outcomes restated, today's per-block focus set, `week.md` must-ship updated. No log entry.
- **wrap run:** the QnA answered, one compact entry prepended to `daily/log.md`, any real ship banked to `shipped.md`, the streak dashboard refreshed + redeployed, a one-line close.
- **month-end run:** a written monthly summary, raw month archived, `daily/log.md` reset clean.

## DSA spaced-rep engine

`learning/dsa/queue.md` is the source of truth (full method + tables live there). This ritual only
reads/advances it — it never teaches DSA (Rule 3). The ladder, offsets from **D0** (first-solve date):

- **D2 = D0+2** — always. Rated **≥ 3** → skip D5, next due **D10 (D0+10)**. Rated **< 3** → next due **D5 (D0+5)**.
- **D5 = D0+5** — only if D2 was < 3. After D5, next due **D10 (D0+10)** regardless.
- **D10 = D0+10** — compulsory. Rated **≥ 3** → **Graduated** (Graduated table). Rated **< 3** → flag **🔁 Revisit** (stays surfaced until re-cleared).

At **plan**, surface rows whose Next due ≤ today. At **wrap**, bank the rating + recompute Next due. Detailed notes = Tarun's notebook, not here.

## Rules

1. **Binary per block.** Hit or miss. "Almost" is a miss. Same discipline as `/weekly-review`.
2. **Short by design.** ~4 lines per day. If an entry sprawls, cut it. The log is a dashboard, not a diary.
3. **Delegate the learning.** Never teach `sysdesign` or `interview-qa` here — that's `/teach`. This ritual only tracks that they happened and what they covered.
4. **Employer boundary holds.** Office blocks are ✓/✗ time-adherence only. Never ask for or record thinksys work content.
5. **Weekdays only.** No weekend prompts.
6. **Name the real blocker.** For every miss, the honest cause in a few words — not "no time."
7. **Never delete a month.** Compress → summary, archive → raw, then reset. The record survives.
8. **Ladder to `week.md`.** The day exists to move this week's 3 outcomes. If a day's blocks don't, say so.
