# CV Defense — Roadmap

> **Re-sequenced 2026-07-31 from depth-first to breadth-first.** The old order was: full deep-drill
> Dwellworks → full deep-drill CloudForestX → DentScribe → skills last. That is the wrong order for a
> live job hunt. Applications are going out in the 8pm `apply` block **now**, callbacks land in weeks,
> and an interviewer samples the CV at random. Depth-first means that at week 4 you are excellent on
> one project and mute on 70% of the page. See `decisions/log.md`.

## The two phases

| | **Phase 1 — CV Surface** | **Phase 2 — Depth** |
|---|---|---|
| **Goal** | Every line of `master.tex` defensible: mechanism → 2 follow-ups → boundary | Platform-level mastery, the material past what the CV claims |
| **Order** | Fixed, by interview-arrival probability (below) | **Gap-driven.** No fixed order |
| **Gate** | Coverage gate (below) | Mastery gate: Score ≥ 7 **AND** Confidence ≥ 3 |
| **Tracker** | `progress.md` (this folder) | `../project-knowledge-base/progress.md` |
| **Size** | ~15-17 sittings | open-ended |

## The cut that makes Phase 1 fast

**Scope, not depth.** Every line the CV *claims* still gets the full follow-up ladder and its boundary
sentence — that part is not reduced. What leaves Phase 1 is every module defending a claim the CV
**does not make**.

The clearest case: Dwellworks modules 1, 2, 4, 5, 6 and 7 (repo map, Odin .NET MVC5/EF6/Ninject/OWIN,
identity/auth, the .NET Core microservices, integrations/async, data & persistence) all exist to defend
backend work. `defend-map.md` records that the CV **dropped every .NET claim on purpose**. Six of ten
modules were defending claims that aren't on the page. Those are Phase 2.

## The coverage gate (Phase 1 pass bar)

A drill passes when, closed-book, you can:

1. **State the mechanism** — how the thing actually works, not what it was for.
2. **Survive two follow-ups** — the interviewer pushes twice toward where your knowledge stops.
3. **Land the boundary sentence** — the exact words that hand back what you didn't build.
4. **Not freeze.** A slow correct answer passes. A blank does not.

**No numeric score, no re-queue in Phase 1.** A weak drill gets its gap logged in `progress.md` and
gets swept in the D60 mock. Confidence /5 is still recorded, because it's your read, not a grade.
The mastery gate (≥7 and ≥3) comes back in Phase 2.

> **Why the gate changed.** The old gate re-queued a whole sitting for a 6.8. That's correct for
> mastery and wrong for coverage: it spends a scarce block re-testing a line you can already half-defend
> while four other projects sit at zero. Breadth first, then depth.

## Phase 1 — the sequence

Drill ids are unchanged so `defend-map.md` references stay valid.

| # | Drill | Covers | Material |
|---|---|---|---|
| 1 | **D00** Opener | 30s self-pitch + one pitch per project | seeded — `drills/00-opener.md` |
| 2 | **D01** Origin & Summary | mechanical→dev, Masai, the title span, the Summary line | `drills/01-origin-and-summary.md` |
| 3 | **D20** Dwellworks | product context + all 6 bullets + boundaries | kb `dwellworks/00`, `03` §10/§12 |
| 4 | **D21** CloudForestX | narrative + all 5 bullets + boundaries | kb `cloudforestx/00`, `04` §8/§9 |
| 5 | **D10** CloudForestX 🔴 | cost model + analysis engine — **boundary only** | kb `cloudforestx/02`, `03` |
| 6 | **D22** DentScribe | product context + all 5 bullets + boundaries | kb `dentscribe/00`, `03` §10/§11 |
| 7 | **D12** DentScribe 🔴 | AI pipeline + PMS writeback — **boundary only** | kb `dentscribe/02`, `04` |
| 8 | **D70** MyWorkMyDay | 4 bullets, mechanism-only, connect forward | kb `myworkmyday/defense-notes.md` |
| 9 | **D40/D41** Personal projects | GradeJar, JsonBeam, the agentic-workflow lead-in | `drills/40-personal-projects.md` |
| 10 | **D30/D31** Skills | Next.js · Vue | `drills/30-nextjs.md`, `31-vue.md` |
| 11 | **D33/D35** Skills | Node/PG/ORM · Cloud (AWS, Docker, build tooling) | `drills/33-node-data.md`, `35-cloud-and-tooling.md` |
| 12 | **D32/D34** Skills | AI & GenAI · Cloudflare/Astro/SEO/Quality | `drills/32-ai-genai.md`, `34-edge-and-quality.md` |
| 13 | **D50** Behavioral | the STAR bank | `drills/50-behavioral.md` + `stories.md` |
| 14 | **D60** Exit gate | whole-CV random mock, unscripted | — |

Rows 3, 4 and 6 may each run over two sittings. That's expected and it is not a failure.

> **Why the project drills have no `drills/NN` file.** D20, D21, D10, D22, D12 and D70 are run **directly
> from the kb modules** in the Material column — each of those already carries a per-CV-bullet drill
> sheet (`dwellworks/03` §10, `cloudforestx/04` §8, `dentscribe/03` §10) plus a *"facts I must never get
> wrong"* list. **Duplicating them into a drill file would create two copies of the same teaching that
> drift apart** — exactly what happened to `00-opener.md`, which sat rehearsing four deleted claims for
> a week after the CV was rewritten. Depth lives in one place and is referenced.
> **The drill files that do exist are for material with no kb home:** the opener, the origin/Summary
> lines, the six skills clusters, the personal projects and behavioral.

**Phase 1 exit condition:** one unscripted whole-CV mock where the interviewer jumps at random and
**nothing on the page produces a freeze.** Not "all drills scored ≥ 7."

### Ordering logic

Rows 1-2 first because they open literally every interview and neither existed before 2026-07-31.
Rows 3-8 in reverse-chronological CV order, because the top of the page gets asked about most.
The 🔴 boundary drills (D10, D12) sit immediately after their project so the boundary is rehearsed
while the project is warm. Skills come **before** behavioral because a keyword scan can trigger a
technical screen in week one; behavioral rounds usually come with more notice.

### D11 is retired

It drilled the *"cut bundle 40%"* claim and the *95+ Core Web Vitals* claim. **Both were deleted from
the CV on 2026-07-24** and are on the never-restore list in `cloudforestx/cv-truth-table.md`. A drill
for claims that no longer exist is pure cost. The one thing worth keeping from it — the answer for
*"why is there no test-coverage claim anywhere?"* — lives in `defend-map.md` and in `drills/34`.

## Phase 2 — gap-driven, not a ladder

Phase 2 has **no fixed order**. It runs off two inputs:

1. **What a real interview punished.** After every round, the thing you fumbled goes to the front of
   the queue. Log it in `progress.md` under Phase 2, dated, with the company/round.
2. **The JD in front of you.** When an interview is scheduled, the depth for whichever project that
   JD resembles gets pulled forward before the round, not on a schedule.

The remaining module ladders in `../project-knowledge-base/README.md` are the **menu** for Phase 2,
not its running order. Nothing in Phase 2 starts until Phase 1's D60 mock passes.

## Session unit

One drill per sitting: teach → closed-book quiz → coverage gate → open floor. **Target 45-60 minutes**,
which fits two per the 2-hour `cv-defense` block. Say **"drill me"** and Claude picks up the next open
row above.

> If a sitting can't get through teach → closed-book → gate inside an hour, the sequence is still too
> heavy. Say so, and it gets re-cut before continuing. That is a design signal, not a bad day.
