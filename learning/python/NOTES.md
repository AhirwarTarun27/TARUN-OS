# Teaching Notes: Python for a JS developer

**Keep this file lean.** Only write what changes how the next lesson is taught. No session diaries,
no answer logs, no facts that can be looked up again.

## Preferences
- **Exercism is his only Python resource.** One chapter link at a time, one lesson per chapter.
- **Never solve the Exercism exercise.** Coach with traces, test rows and hints. The exercise is the rep.
- New to the AI field: simple words, short sentences, JS comparison wherever one exists.
- **New-words cards go at the end of each section** where the word first appears, never in one list at the
  bottom. No box if a section has no new words. Every card also goes into `reference/glossary.html`.
- **A card is a recap, never the first explanation** (his catch, 2026-10-05: PEMDAS and unary minus were only
  in the box, so §5 made no sense until he read it). Every card's word must be **named and explained in the
  section text** at the point the idea is used. A word that only shows up inside an error message or code
  output counts as unexplained. Before finishing a lesson: run `python tools/check_words.py` (must print OK),
  then reread each card and confirm the section already says what the card says.
- **Practice exercises** (his pushback, 2026-10-07): write a note only for a mistake pattern the next lesson should
  target, as one line once the exercise is finished. Nothing for status, "it passed", or follow-ups.
- JS ↔ Python side by side (`.vs`), JS habits that break in red (`.trap`). Dark theme, `assets/course.css`.

## Method
- Lesson shape: §0 cold gate (carried items) → sections → summary table → quizzes → predict-the-output →
  Exercism handoff → ask-your-teacher.
- Run every output on Python 3.14 (`...\Python314\python.exe`) as a real program before writing it down.
  Check the exercise's tests on GitHub for the handoff (e.g. `assertIs`, `__doc__` checks).
- Each lesson: extend the cheat sheet + glossary, update course-map pips.
- **No Playwright / browser checks on lessons** (his request, 2026-10-05). Every chapter uses the same CSS and
  structure. Still run all Python outputs.
- Grade the **label**, not just the output. Ask "why?" once after a right answer.
- If he misses the same point twice, stop re-explaining. Offer 3-4 numbered candidate gaps and let him pick.

## Where he is
- L1-L3 done. **L4 Conditionals built** (Meltdown Mitigation). L4 previews `raise` (§7) so Grains is doable.
- Unlocked practice he hasn't done (he asked me to name them at the right time; the course map lists each under
  its chapter): Triangle, Grains, Raindrops → after L4. Bob → after string methods. Collatz, Armstrong, Perfect
  Numbers, Pig Latin → after loops.

## Mistake patterns (feed the next §0 gate and trap boxes)
- `not (A and B)` vs `not A and not B` (De Morgan): re-test in L4.
- JS accent in `if`: `if(...)` brackets, `if c: return True else: return False`, `not x == 0` instead of `!=`.
- Read PEMDAS letter by letter (M before D). Re-test the left-to-right tie once.
- `return  x` with two spaces.

## Bridge lessons (Exercism skips these; slot after the chapter they need)
f-strings (after strings) · comprehensions (after loops) · functions in depth: kwargs, `*args`/`**kwargs`
(after unpacking) · exceptions (after classes) · modules/pip/venv/.env · files + JSON · type hints ·
async/await.
