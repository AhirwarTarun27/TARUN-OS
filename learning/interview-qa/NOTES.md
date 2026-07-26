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
