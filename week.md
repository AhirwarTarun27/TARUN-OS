# This Week — Tue Jul 14 → Sun Jul 19, 2026

> **Your single source of truth.** If it's not here, it's not happening this week.
> Open this file FIRST, every session. Notion, Calendar, your head — all noise until it lands here.
> Reset every Sunday by running `/weekly-review` (next: Sun Jul 19).
> **Updated 2026-07-14** — late reset via `/weekly-review`; the board had drifted since 2026-07-03 (two Sundays skipped). See `decisions/log.md` and `shipped.md` for what actually happened in the gap.

## North Star (why any of this matters)

- **Floor:** Your day job (thinksys). Keep it stable as the floor **while you actively interview for the next role** (2-3 month target, declared 2026-07-07). Pays the bills and de-risks the switch. Employer boundary still holds — no thinksys email/comms in the AIOS.
- **Engine:** A portfolio of front-end-heavy tools built for scale, money-led (AdSense), plus a paid local web-solutions side-business (started 2026-07-11). **JsonBeam = bet #1: live, Phase 0 closed 2026-07-03, resubmitted after a rejection 2026-07-08.** **GradeJar = bet #2: LIVE at gradejar.com, Phase 0 closed 2026-07-03.** Both run on the weekly-first `/marketing` engine (inverted from daily 2026-07-10). **AccentWallPlanner = bet #3: build-ready since 2026-07-10, not started** — gate before starting: pull real Semrush/Ahrefs volumes (still never done). **Kesri Enterprise = client #1** of the new web-solutions business: live at kesrienterprise.com, Phase 3 (Findable) barely started — `clients/kesri-enterprise/engagement.md` has the board.
- **Edge:** Get better as a developer *through building*. Front-end system design now. Backend depth later.
- **The rule:** Ship ugly. Done beats perfect. **DSA is the gate for Priority 1 (job hunt) and it went dark for 5 days (last rep 2026-07-09, queue still empty) — that's the actual failure this reset is naming, not a missed deploy.**

## This week's 3 outcomes (max 3 — done or NOT done)

- [ ] **DSA back on the ladder.** Minimum 3 D0 problems solved and logged in `learning/dsa/queue.md` by Sunday. Queue has been empty since setup — this is the real reset, not just a plan.
- [ ] **AdSense earning.** *(Carried — externally gated, not avoidance.)* JsonBeam was rejected for low-value content 2026-07-08, fixed + redeployed same day; re-review clock running. GradeJar separate, still `GETTING_READY`. Done = at least one site shows `READY` with ads filling, or — if still pending Sunday — confirmed clean status on both with no new rejections sitting unanswered.
- [ ] **Kesri Enterprise Phase 3 moves for real.** Two concrete pieces: (1) flip off Cloudflare's managed robots.txt on kesrienterprise.com — 5 min, currently blocking ClaudeBot + Gemini grounding; (2) actually send the client questionnaire (drafted for months at `<repo>/CLIENT-QUESTIONNAIRE.md`) — it's the longest lead time in the engagement and blocks the whole trust layer.

## Today — ONE must-ship

> The single thing that, if you do nothing else today, makes the day count.

- **Date:** Fri Jul 17
- **Must-ship:** Merge Sorted Arrays D2 cleared and logged (overdue from 07-16).
- **Today's plan:** First day of the swapped schedule — `interview-qa` at 11:00am, `reading` at 11:45pm. `dsa` = Merge Sorted D2 first (overdue, ~15 min), then **Move Zeroes as D0 #3 — must land `solo`/`hinted`** (both banked D0s are `watched`; a third watched D0 closes outcome 1 on paper and proves nothing). `machine-coding` = **Counter** (Phase 1 order 1, 15-min target) — first real rep, block has produced zero in 3 days. `sysdesign` = close the object-storage gap, then bank Ch.1. `project` (8pm) = Kesri robots.txt flip + send the questionnaire — that's all of outcome 3, ~30 min.
- **⚠ Sunday 07-19 collision:** both `watched` D0s force a **mandatory D5** on 07-19 — a weekend, on top of `/weekly-review`. Do them manually Sunday or they're overdue Monday.
- **⚠ Must-ship risk (flagged at plan):** the must-ship is not a D0, and today is the last tracked weekday before the review. If the day collapses, it scores ✅ while outcome 1 dies at 2/3. Move Zeroes is the week-critical item.

## Parking lot (capture, do NOT act)

Brain-dump here so it leaves your head. Triage it during the weekly review. Nothing here is this week's problem.

- JsonBeam: on-page SEO pass (meta/FAQ/schema) needs a code-side decision — observe mode currently blocks it. Tarun's call, log in `decisions/log.md` if it changes.
- AccentWallPlanner: pull real Semrush/Ahrefs volumes before committing any build weeks — build-ready but ungated on demand confirmation.
