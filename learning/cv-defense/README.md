# CV Defense — justify every line of the résumé, out loud, closed-book

> **Relationship: tracked and drilled.** Not a `/teach` track. This is a two-way coaching loop like
> `../project-knowledge-base/` — Claude teaches + quizzes, Tarun answers + pushes back. No skill drives it;
> you just say **"drill me"**.

## Why this exists

The finalized CV (the résumé we built this session) is strong, and a few lines deliberately reach past what
Tarun personally coded — the **defend-list**. An interviewer who catches an overclaim you can't defend will
cut you. This system closes that gap: it teaches the real grounding behind every claim and drills it until
you can hold it in the room.

Two rules govern everything here:
1. **Never claim authorship you can't defend.** Know exactly where "I built this" becomes "I integrated
   with this." That boundary is your strongest defense, not a weakness.
2. **Ground, don't memorize.** Every answer traces to real code (the repos) or the distilled study in
   `../project-knowledge-base/`. Learn the system and the words come out on their own.

## The two phases (re-sequenced 2026-07-31)

**Phase 1 — CV Surface.** Breadth-first across the whole page: every project, every bullet, the Skills
clusters, the Summary, the Education lines. Fixed order, ~15-17 sittings. **The order is in
`roadmap.md`.**

**Phase 2 — Depth.** Everything past what the CV claims. **Gap-driven** — no fixed ladder. What a real
interview punished goes to the front; when an interview is scheduled, that project's depth is pulled
forward. Tracked in `../project-knowledge-base/progress.md`.

Why this order: applications go out nightly, callbacks land in weeks, and an interviewer samples the CV
at random. Depth-first leaves you excellent on one project and mute on the rest of the page.

## How one session runs (the loop)

1. **Teach** — Claude opens the next drill: explains the concept, grounded in the repo + the kb module,
   connecting the dots across the platform.
2. **Quiz (closed-book)** — you stop reading and answer out loud. Questions are grouped by weight and end
   with an **interviewer follow-up ladder** (Claude pushes 2-3 questions deep, to the boundary).
3. **Gate** — see below. Claude asks your **Confidence /5** and logs the gate + your gaps to `progress.md`.
4. **Open floor** — you ask doubts, disagree, or ask Claude to go deeper. Claude teaches into the gap.

**The gate depends on the phase:**

- **Phase 1 — the coverage gate.** Pass = you **state the mechanism**, **survive two follow-ups**,
  **land the boundary sentence**, and **don't freeze**. No numeric score. **No re-queue** — a thin drill
  gets its gap logged and swept at the D60 mock. A slow correct answer passes; a blank does not.
- **Phase 2 — the mastery gate.** Score ≥ 7 **AND** Confidence ≥ 3 → advance, else re-queue.

**Confidence scale:** 1 no idea · 2 shaky · 3 basics · 4 confident + handle follow-ups · 5 could teach it.

> **Why Phase 1 dropped the numeric gate.** The old gate spent a whole scarce sitting re-testing a 6.8
> on a line he could already half-defend, while three other projects sat at zero. That's the right trade
> for mastery and the wrong one for coverage.

## The traffic light (defensibility)

Every claim in `defend-map.md` carries a color:
- 🟢 **Yours** — you built it. Drill = say it crisply and specifically.
- 🟡 **Fluency** — you integrated with it or contributed part. Claim understanding, never authorship.
- 🔴 **Must-learn** — the bullet implies more than you built. Heaviest teaching before it's interview-safe.

## Methods (why this works)

- **Active recall** — closed-book answering, not re-reading. The whole loop rests on it.
- **Feynman** — the 60-second plain-English pitch. If you can't explain it simply, you don't own it yet.
- **Spaced repetition** — 🔴 drills come back on a schedule (`progress.md` retest-by).
- **Interleaving** — mock rounds (T6) mix projects so you can't pattern-match.
- **Follow-up laddering** — every drill ends with the interviewer pushing to where your knowledge stops.
- **STAR** — behavioral answers get a structure (Situation, Task, Action, Result).
- **Boundary discipline** — rehearse the exact sentence that hands the backend back honestly.

## Where things live / how it connects

- `defend-map.md` — every CV line → grounding → color → drill id. **Start here.** The connect-the-dots map.
- `roadmap.md` — the two phases, the Phase 1 order, and both gates.
- `progress.md` — **the single Phase 1 exam record.** Coverage gate, confidence, gaps, and the Phase 2
  gap queue.
- `skills-defense.md` — every token on the six CV Skills lines: flag, anchor, spoken line, and the rep
  that closes it. Flags are **sourced** from `../../references/cv/fact-bank.md`, never re-derived.
- `stories.md` — the STAR bank. One place for every story, reused across projects and behavioral rounds.
- `drills/NN-<slug>.md` — one file per drill. Authored as the sequence reaches them.
- **Depth lives in `../project-knowledge-base/`** (the study modules). This folder is the *exam*; that one
  is the *library*. When a 🔴/🟡 drill needs deep project knowledge and the kb module isn't written yet, we
  author it there (depth in one place) and quiz it here.
- **Ground truth is the repos** — cited per claim in `defend-map.md`. All three are on this machine:
  `Documents/CloudForestX`, `Documents/Dwellworks/Dwellworks Solutions/Odin`, `Documents/Learning/Dentscribe`.

## One exam, one tracker

The line above — *"this folder is the exam; that one is the library"* — is the design, and **Phase 1
enforces it.** The kb also carries `tests/` files and its own scored `progress.md`, so until 2026-07-31
every topic was being examined twice under two different gates. That double-tracking is a real part of
why the system felt slow.

**While Phase 1 runs: `cv-defense/progress.md` is the only exam record.** The kb's `tests/` files and
its `progress.md` are Phase 2 instruments. Nothing was deleted — the Dwellworks Module 0 result from
2026-07-30 is carried forward into D20's gap list.

## The read budget

A session reads `defend-map.md` (the row you're on) + the one `drills/NN` file + `progress.md`. Skills
sessions add `skills-defense.md`; behavioral adds `stories.md`. Never glob `drills/`. `progress.md` and
`skills-defense.md` are **rewritten, not appended** — constant cost in month six.
