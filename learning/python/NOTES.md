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
- **Every exercise name is a link** (his request, 2026-10-08), in the lesson and on the course map:
  `https://exercism.org/tracks/python/exercises/<slug>` (slug from the track `config.json`). Check it returns 200.
- Each lesson: extend the cheat sheet + glossary, update course-map pips.
- **No Playwright / browser checks on lessons** (his request, 2026-10-05). Every chapter uses the same CSS and
  structure. Still run all Python outputs.
- Grade the **label**, not just the output. Ask "why?" once after a right answer.
- If he misses the same point twice, stop re-explaining. Offer 3-4 numbered candidate gaps and let him pick.
- **Drills (agreed 2026-10-07). A light version, NOT interview-qa's two-half gated drill.** Python is a tool for AI
  work, so what fades is the JS→Python difference, not the concepts.
  1. §0 warm-up: he pastes his answers to me before reading on (from L5, the §0 text says so).
  2. After each chapter's main exercise: one ~10-min **trap drill** in chat, one snippet at a time. About 6
     predict-the-output snippets drawn only from that chapter's red trap boxes. **Score outputs and labels
     separately** (his rule, 2026-10-09): a right output is right, even if he named no trap; list label gaps
     as notes, not as misses. For snippets that error, the error's name IS the output. No explain-out-loud half, no repeat rounds, no gate. Misses go into the next lesson's §0.
  3. The main work is writing code: the practice exercises that fit, then reading 3-4 community solutions.
  4. Put more practice into AI-heavy chapters (strings/f-strings, lists, dicts, loops, comprehensions, function
     args, exceptions, JSON, async) and less into basics/bools/numbers.

## Where he is
- L1-L4 done, all four drilled. **L5 Comparisons built** (Black Jack, then Darts). L5 §0 re-tests the drill
  misses below; he pastes his answers before reading on.
- Open practice (not done): Armstrong, Collatz, Perfect Numbers → after loops. Bob, Pig Latin → after string
  methods. Matching Brackets is locked. The course map lists each under its chapter.
- Drill misses to re-test (outputs: L1 3/6, L2 2/6, L3 1/6, L4 5/6):
  - Error NAMES: `"1" + 1` is TypeError (he said ValueError); a missing argument is TypeError.
  - JS-style precedence: `not 1 == 2` is True in Python; `True or False and False` is True. Gave him the ladder.
  - `and` returns the last operand when the first is truthy; `==` is not truthiness (`"" == False` is False).
  - `return ValueError("x")` doesn't stop anything (prints `x`); only `raise` does.
  - `7 // 2` is 3; `-7 % 3` is 2 (he knows "remainder", gave him the 0-to-2 clock); `/` gives `9.0` not `9`.
  - Traces function bodies too fast: forgot `Hi Sam` printed before `None`.

## Mistake patterns (feed the next §0 gate and trap boxes)
- `not (A and B)` vs `not A and not B` (De Morgan): re-test in L4.
- JS accent in `if`: `if(...)` brackets, `if c: return True else: return False`, `not x == 0` instead of `!=`.
- Read PEMDAS letter by letter (M before D). Re-test the left-to-right tie once.
- `return  x` with two spaces.
- Triangle: still wraps a bool in `if cond: return X else: return False` after Leap. Helper returned `0`, not
  `False` (`a and b and c` hands back an operand). Re-test "and returns an operand" and "return the condition".
- Grains: off-by-one in "the next square" (used the last one, twice). Redo `total()` with a loop after loops.
- Percentages: attaches "X% of base" to the wrong variable (Meltdown task 3, twice; asked for the answer on the
  last fix). Re-test: "within 10% of N" range, and which number gets the 90%.

## Bridge lessons (Exercism skips these; slot after the chapter they need)
f-strings (after strings) · comprehensions (after loops) · functions in depth: kwargs, `*args`/`**kwargs`
(after unpacking) · exceptions (after classes) · modules/pip/venv/.env · files + JSON · type hints ·
async/await.
