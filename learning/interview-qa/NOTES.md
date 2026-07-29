# Teaching Notes — Interview Q&A

## User preferences (locked)
- **Rebuild from fundamentals.** Assume nothing; clean re-teach.
- **Medium lessons:** ~8-10 questions, ~20 min each.
- **FLOW is the whole point.** Re-sequence the ebook by dependency, not by its format-based sections.
  Never introduce a keyword before the lesson that owns it. Every lesson explicitly connects back to
  the previous one and forward to the next.
- **Dark theme** for all HTML (light hurts his eyes). Shared stylesheet: `assets/course.css`.
- **Ignore Angular** (20 scenario Qs). React is his core library.
- He's a working dev — respect that. Rebuilding = filling gaps + sharpening articulation, not baby steps.

## Method
- Interleave: teach a concept, then immediately pull the ebook's OUTPUT-based Qs and PROBLEMS that use
  it as retrieval practice in the same/next lesson. This is what makes the dots connect.
- Every lesson: knowledge (cited) → retrieval quiz → output-prediction/coding drill → primary source → next.
- Source of truth for question mapping: `reference/232Questions.txt` (extracted from the PDF).

## TODO / backlog
- [ ] Build `reference/glossary.html` once term count justifies it (hoisting, TDZ, coercion, closure, etc.).
- [ ] Find a trusted React machine-coding source before Module 17 (see RESOURCES Gaps).

## Progress log
- 2026-07-07: Workspace created. Mapped all 5 non-Angular sections. Built course map + Lesson 0001 (Types & Coercion).
- 2026-07-25: M1 marked done. Built Lesson 0002 (Scope, Hoisting & the TDZ) — scope chain, hoisting
  table, TDZ, var/let/const 4-axis answer, the "prints 6" loop with both fixes, 4 quizzes + shadowing
  bonus. Added `.tbl` / `.tbl-scroll` comparison-table styles to `assets/course.css` (first lesson to
  need tables). Deliberately previewed a closure at the end of the loop drill so M3 lands as a name
  for something already felt. Next: Lesson 0003 — Functions, closures & HOFs.
- 2026-07-28: Drilled L2 cold — 13 snippets, 3 rounds. Score fell round over round (4/5 → 1/5 → 1/3).
  Finding: **not a knowledge gap, a retrieval-indexing gap.** He answered three rules correctly and
  then missed the SAME rule in a different-shaped snippet minutes later. He fires the first rule the
  snippet's surface resembles and stops, instead of reading binding state per line. Fix shipped as
  lesson §7 "The three-question procedure" + a 4×4 state/operation table (every miss was one cell).
  Full record: `learning-records/0002-scope-hoisting-tdz.md`.
  **Gate for Lesson 3: he applies the procedure unprompted, not that he scores higher.** Re-drill 5
  snippets first and reject output-only answers.
  → Round 4 (same day): 3/5 clean, procedure applied, halted execution flagged unprompted. **Gate
  passed, cleared for Lesson 3.** One item still open: he will not name `TypeError` (3 misses in one
  session, behavior understood, label won't stick). Re-test it cold at the top of Lesson 3 and again
  at the `Object.freeze` drill in M5, where it recurs naturally.
- 2026-07-29: Built Lesson 0003 (Functions, Closures & HOFs). Opens with a **§0 gate check** re-testing
  the open `TypeError` item before any new material — that pattern (carry the open item into the next
  lesson's cold open) should repeat for every unresolved drill finding. Covers functions-as-values →
  lexical environment → closure → private state → callbacks → HOFs → pure/impure → IIFE → arrow limits,
  plus `once`/`memoize`/counter drills. Deliberately re-uses M2's "prints 6" loop and its `3 3 3`
  synchronous twin, so closures are introduced as the NAME for something already met twice.
  `this` is parked for M4 with an explicit note (arrows can't be taught without touching it).
  M2 marked done, M3 current. **Not drilled yet — do not advance to M4 until it is.**
- Teaching note (generalise this): cold-drill every lesson before moving on. The lesson HTML alone
  produced confident recall of definitions and unreliable application. The drill is where the real
  diagnosis came from, and the misses are better lesson content than anything written up front.
