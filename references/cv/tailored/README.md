# Tailored CVs

One pair of files per job application, written by `/cv-tailor`:

- `<company>-<role>.tex` — the CV tailored to that JD's vocabulary (ATS-front-loaded), built from
  `../master.tex` and `../fact-bank.md`. Compile in Overleaf.
- `<company>-<role>.notes.md` — the tailoring log: JD keyword → matched real fact, what moved and why,
  and the **honest gap list** (must-haves not met) to prep for before the interview.

These are disposable derivatives. The source of truth is `../master.tex` + `../fact-bank.md` — update
those when a real skill or project changes, never a file in here.
