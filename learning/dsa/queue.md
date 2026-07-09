# DSA Spaced-Repetition Queue

> The engine for the Namaste DSA (Akshay Saini) method. Every problem is solved on a fixed
> ladder — **D0 → D2 → D5 (only if struggling) → D10** — so the **pattern** sticks, not just
> the answer. `/daily-log` reads this at **plan** (what's due today) and updates it at **wrap**
> (advance the rung, bank the rating, recompute the next due date).
> The **physical notebook** holds the detailed notes; this file holds the schedule + ratings + one-line gist.

## The method

- **D0 (first encounter):** watch the video → at the problem statement, **pause and attempt solo
  15–20 min** → if stuck, watch + take notebook notes → solve it again at the end.
- **Revision pass (D2/D5/D10):** struggle first → refer notebook notes → read the code → rewatch
  the video. Then solve it clean on LeetCode.
- **Rate each revision 1–5** (smoothness). **< 3 = struggling.**
- **Notebook taxonomy** (detail lives there, one-line gist here): pattern · time complexity ·
  mistake made · new concept · key idea.

## The ladder

Offsets are days from **D0** (first-solve date).

- **D2 = D0+2** — always.
  - rated **≥ 3** → skip D5, next due = **D10 (D0+10)**.
  - rated **< 3** → next due = **D5 (D0+5)**.
- **D5 = D0+5** — only if D2 was < 3. After D5, next due = **D10 (D0+10)** regardless.
- **D10 = D0+10** — compulsory final pass.
  - rated **≥ 3** → **Graduated** (move to the Graduated table).
  - rated **< 3** → flag **🔁 Revisit** — stays surfaced at plan-time until re-cleared.

Smooth path = 3 solves (D0, D2, D10). Struggling path = 4 (D0, D2, D5, D10).

## Active queue

Ratings column logs each pass, e.g. `D2:2 D5:3`. Next due e.g. `2026-07-10 (D2)`.

| Problem | Pattern | D0 | Last rung | Ratings | Next due | Key idea |
|---------|---------|----|-----------|---------|----------|----------|
| _(empty — first row lands at tonight's wrap)_ | | | | | | |

## Graduated

Pattern locked — all passes done, final rated ≥ 3.

| Problem | Pattern | Graduated | Passes | Final |
|---------|---------|-----------|--------|-------|
