# This Week — Mon Jul 20 → Sun Jul 26, 2026

> **Your single source of truth.** If it's not here, it's not happening this week.
> Open this file FIRST, every session. Notion, Calendar, your head — all noise until it lands here.
> Reset every Sunday by running `/weekly-review` (next: Sun Jul 26).
> **Updated 2026-07-19** — on-time reset via `/weekly-review`. Scored 1 of 3. Streak: 2 weeks.

## Theme

**Derive it yourself, then verify it over the wire.** Both live D0s are `watched` — nothing on the
ladder was reasoned out solo. A Kesri task was logged as shipped and wasn't. Same failure, two tracks:
**something looked done without being done.**

## North Star (why any of this matters)

- **Floor:** Your day job (thinksys). Keep it stable as the floor **while you actively interview for the next role** (2-3 month target, declared 2026-07-07). Pays the bills and de-risks the switch. Employer boundary still holds — no thinksys email/comms in the AIOS.
- **Engine:** A portfolio of front-end-heavy tools built for scale, money-led (AdSense), plus a paid local web-solutions side-business (started 2026-07-11). **JsonBeam = bet #1: live, `GETTING_READY`, resubmitted after a rejection 2026-07-08.** **GradeJar = bet #2: LIVE at gradejar.com, `GETTING_READY`.** **AccentWallPlanner = bet #3: LIVE at accentwallplanner.com since 2026-07-19**, GSC-verified + sitemap submitted, on a deliberate AdSense hold. All three run on the weekly-first `/marketing` engine. **Kesri Enterprise = client #1** of the web-solutions business: live at kesrienterprise.com, Phase 3 (Findable) stalled — `clients/kesri-enterprise/engagement.md` has the board.
- **Edge:** Get better as a developer *through building*. Front-end system design now. Backend depth later.
- **The rule:** Ship ugly. Done beats perfect. **DSA is the gate for Priority 1 (job hunt).** The ladder is alive again (2 problems) but **every D0 on it is `watched`** — a pattern you watched is not a pattern you own. This week fixes the *quality* of the reps, not just the count.

## This week's 3 outcomes (max 3 — done or NOT done)

- [ ] **DSA quality gate.** *(Carried — the one carry. Last week died at 2 of 3 on lost capacity, not avoidance.)* 3 new D0s banked, **minimum 2 tagged `solo` or `hinted`**, AND every due revision cleared on time. A third `watched` D0 does not count toward this — the tag is the outcome, not the number.
- [ ] **Machine-coding produces its first real rep.** Counter (Phase 1, order 1) reaches P0 green, session ingested, graded against the rubric, `profile.md` written. The system was built 07-14 and has produced **zero reps in 5 days** — either it starts producing or it's theater.
- [ ] **Kesri Phase 3, verified over the wire.** Not "logged as done" — *checked in production.* (1) Flip off Cloudflare's managed robots.txt and confirm with `curl -s https://kesrienterprise.com/robots.txt` showing no `BEGIN Cloudflare Managed content` block; (2) Google Business Profile created/claimed; (3) the directory board from `/client-findable` started. Each piece proven live before it's ticked.

## Today — ONE must-ship

> The single thing that, if you do nothing else today, makes the day count.

- **Date:** Thu Jul 30 *(sprint day 2 — this board is 11 days stale, see the note below)*
- **Must-ship:** **Backend Build B done, in Node.** Session 1's lesson was read on 07-29 with zero reps landed, and session 2 is blocked until Build B exists. Reading is not landing.
- **Also today, both with hard deadlines:** (1) **Counter to P0 green by 4:50pm** — last day of the extension; not green means it force-banks as `watched` and the `solo` tag he already earned is gone. (2) **Both overdue DSA D5s** (Stock + Merge Sorted) — 11 days late, both mandatory.

> ⚠ **This board expired Sun Jul 26 and was never reset.** The 3 outcomes below are from Jul 20-26.
> Two of them (DSA quality gate, machine-coding's first rep) are *still* the open items, so the day
> does ladder up — but to a dead board. Reset at the next `/weekly-review`.

## Parking lot (capture, do NOT act)

Brain-dump here so it leaves your head. Triage it during the weekly review. Nothing here is this week's problem.

- **AI crawlers are `Disallow: /` on all three older zones, not just Kesri.** ClaudeBot, GPTBot,
  Google-Extended, CCBot, meta-externalagent blocked on **jsonbeam.com, gradejar.com AND
  kesrienterprise.com**, all via the Cloudflare managed robots block. Same toggle as Kesri §0.1,
  three zones instead of one. AccentWallPlanner is clean.
  **Scope it honestly: P1, not P0.** Googlebot/Bingbot/`*` are `Allow: /` everywhere. Nothing is
  de-indexed and no ranking is at risk. What's forfeited is AI-search citation, the moat in
  `references/ai-search-visibility.md`.
  Also note: `shipped.md` 2026-07-03 claims "robots.txt allows AI crawlers" under "Phase 0 visibility
  CLOSED". That claim is false in production and the entry needs a correction stamp.
  Found by `/verify-live` on its first run, 2026-07-19. Re-check any fix with
  `node scripts/verify-live.mjs`, never by eye.

<!-- Cleared 2026-07-19:
     · JsonBeam on-page SEO pass → handed to /marketing (it's the only property with real search
       traction: avg position 8.6, 33% CTR). Still needs Tarun's code-side decision on observe mode.
     · AccentWallPlanner Semrush/Ahrefs volume gate → CONVERTED. The site shipped without the gate
       ever firing. Paid-tool gate killed; replaced with a free live-GSC demand check (~2026-08-09,
       2-3 weeks after indexing) before any further content investment. Logged in decisions/log.md.
     · AdSense "confirmed clean status" outcome → KILLED as a board item. Externally gated with no
       action available; it belongs in /site-report, not in the 3 outcomes. -->
