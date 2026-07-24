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

## How one session runs (the loop)

1. **Teach** — Claude opens the next drill: explains the concept, grounded in the repo + the kb module,
   connecting the dots across the platform.
2. **Quiz (closed-book)** — you stop reading and answer out loud. Questions are grouped by weight and end
   with an **interviewer follow-up ladder** (Claude pushes 2-3 questions deep, to the boundary).
3. **Grade** — Claude scores **/10**, asks your **Confidence /5**, and logs both + your gaps to `progress.md`.
4. **Open floor** — you ask doubts, disagree, or ask Claude to go deeper. Claude teaches into the gap.
5. **Gate** — Score ≥ 7 **AND** Confidence ≥ 3 → advance. Otherwise the drill re-queues (🔴 soonest).

**Confidence scale:** 1 no idea · 2 shaky · 3 basics · 4 confident + handle follow-ups · 5 could teach it.

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
- `roadmap.md` — the drill order (T0 → T6) and the gate.
- `progress.md` — your scores, confidence, and what's due for re-drill.
- `drills/NN-<slug>.md` — one file per drill. `00-opener.md` is seeded; the rest are authored on demand.
- **Depth lives in `../project-knowledge-base/`** (the study modules). This folder is the *exam*; that one
  is the *library*. When a 🔴/🟡 drill needs deep project knowledge and the kb module isn't written yet, we
  author it there (depth in one place) and quiz it here.
- **Ground truth is the repos** — cited per claim in `defend-map.md`.

## The read budget

A session reads `defend-map.md` (the row you're on) + the one `drills/NN` file + `progress.md`. Never glob
`drills/`. `progress.md` is **rewritten, not appended** — constant cost in month six.
