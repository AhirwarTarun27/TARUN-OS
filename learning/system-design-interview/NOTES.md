# Teaching Notes — System Design Interview

## How Tarun wants to be taught
- **Dark theme, always.** Light HTML hurts his eyes. Every lesson/reference links `assets/course.css`.
- **Design-out-loud is the point.** He's not memorizing architectures — he's learning to *narrate and defend* a
  design. Every concept should carry a "say this in the interview" one-liner. End lessons with a talk-it-out drill.
- **Watch-first loop.** Per `learning/system-design-video-path.md`: watch the pinned video → read the Xu chapter →
  do this lesson (active recall) → design a small system out loud. The lesson assumes the video/read primed him.
- **He's a working full-stack dev.** Ships real products on Cloudflare Workers, zero-backend architectures. Don't
  explain "what is a server." Teach at the altitude of framing, vocabulary, and tradeoff articulation.
- **Medium lessons, ~20 min.** Working memory is small — one tangible win per lesson. Ch 1's win: narrate the ladder.
- **Voice:** casual but professional, short sentences, no em dashes, bullets over paragraphs.
- **Grade what was taught, not what a senior would know.** (Banked 2026-07-16 after Tarun pushed back on record
  0003.) A term that appeared only as a one-line "interview gold" callout has been *introduced*, not *taught* —
  do not score its absence as a failure. The list of missing precision items is the **next syllabus**, not a
  scorecard. First exposure ≠ mastery. When a rep exposes an un-taught concept, the response is a teach doc
  (see `lessons/0001b-backend-primitives.html`), then re-drill. Conceptual gaps in already-taught material
  (e.g. object storage in Ch 1) are fair to grade; brand-new vocabulary is not.

## Cadence
- This runs in the 2:00-3:30pm `sysdesign` block, scheduled by `/daily-log`. At wrap, `/daily-log` logs one line
  on what this covered (pulled from `learning-records/`). Keep records current so the daily log can read them.

## Course structure
- Following Xu Vol 1's 15 chapters (see `reference/course-map.html`). One lesson ≈ one chapter, sometimes split.
- Ch 3 (the 4-step framework) is the load-bearing one — everything else is a rung to practice it on.

## Component library (assets/)
- `course.css` — shared dark stylesheet (palette matches the sibling interview-qa course).
- `quiz.js` — retrieval-practice widget (`data-correct` index; equal-length options, no formatting tells).
- New SD components live here first, never inline: `.ladder` (scaling rungs), `.arch` (request-flow row),
  `.napkin` (estimation math), `.tradeoff` (two-column compare).
