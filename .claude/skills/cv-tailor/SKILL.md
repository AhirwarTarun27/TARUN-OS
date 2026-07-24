---
name: cv-tailor
description: Tailor Tarun's CV to a specific job description so ATS shortlists it, WITHOUT changing the real work. Reads a JD, maps it against the stored master CV + fact-bank, then re-weights, reorders and re-words his genuine experience to the JD's vocabulary, saves a tailored LaTeX + a notes file with an honest gap list, and prints the paste-ready LaTeX. Never invents a skill, never changes a metric, never claims beyond what he can defend. Trigger on "/cv-tailor", "tailor my cv", "tailor my resume", "here's a JD", "make my resume match this job", "optimize my cv for this role", "will my cv pass ATS for this". One run = one tailored .tex + one gap list.
---

# /cv-tailor — the job-description CV tailor

## What this is

One master CV, many targeted versions. Every company screens differently, and ATS ranks on keyword
match, so the same true experience has to be re-pointed at each job description. This skill does that
re-pointing — and only that. **The work never changes; the emphasis does.**

## The law (read before every run)

Same DNA as the two rules that outrank everything in this AIOS: **never invent a fact.**

- **MAY change per JD:** order of skill clusters + items; the Summary's framing and emphasis; the order
  of experience bullets and which project leads; bullet wording, to mirror the JD's verbs and terms —
  drawing only from the fact-bank's **Allowed Vocabulary** or a listed **synonym**.
- **MUST NOT, ever:** change a metric, date, title, team size, employer, education or certification;
  promote a 🟡 or 🔴 line into a "built/owned/architected" claim; or introduce any skill not in the
  allow-list. **Empty beats invented.** A CV that shortlists him for a job he cannot defend in the
  interview is a loss, not a win.

## Inputs it needs

- **The JD** — pasted text, or a path/URL. If only a company name is given, ask for the JD (do not
  guess the requirements).
- Everything else comes from the two source-of-truth files. Read both, every run:
  - `references/cv/master.tex` — the canonical LaTeX. Never edited by this skill.
  - `references/cv/fact-bank.md` — the allow-list, synonym clusters, immutable facts, defensibility
    flags, gap list, and ATS rules.

## The run (six steps)

**1. Parse the JD.** Extract: role title, seniority, domain, the must-have skills, the nice-to-haves,
the ATS keywords, and the emphasis (frontend-heavy / backend / AI / cloud / a named framework). Note
the exact spelling the JD uses (React.js vs ReactJS, etc.).

**2. Map JD → fact-bank.** Sort every JD requirement into one of three buckets:
- **Direct match** — he has it, exact term. Front-load it.
- **Synonym match** — he has it under a different word (see the synonym table). Mirror the JD's word.
- **Gap** — the JD wants it, he does not have it. **Never add it.** Record it for the notes, with the
  nearest defensible adjacent skill if there is one.

**3. Tailor `master.tex` into the derivative.** Working from a copy of the master:
- **Summary** — rewrite the framing to lead with the JD's role + its top matched keywords. Same facts,
  JD-shaped. Keep "Senior Full-Stack Developer", "4+ years", the ecosystem.
- **Skills** — reorder clusters and the items inside them so JD-matched keywords sit first. You may
  rename a cluster header to the JD's category name if it still contains only real items. Add nothing
  that is not in the allow-list.
- **Experience** — reorder bullets within each project so the most JD-relevant surface first; reorder
  the projects so the one matching the JD's emphasis leads. Re-word bullets to mirror the JD's verbs
  and terms, changing wording only — never the fact or the number. Keep every `scopeNote`-equivalent
  boundary intact (contributed / integrated / did not author).
- **Untouched:** every metric, date, title, team size; Education; Certifications; contact header.

**4. Guardrail self-check (before emitting — this is the verify-live-style gate).** Confirm, explicitly:
- Every technology token in the tailored `.tex` exists in the fact-bank Allowed Vocabulary. (If one
  does not, remove it.)
- No metric value differs from `master.tex`.
- No 🟡/🔴 line was promoted into an authorship claim.
- Titles, dates, team sizes, employer, education, certs are byte-identical to the master.
If any check fails, fix the `.tex` before continuing — do not emit a CV that fails its own gate.

**5. Save both artifacts** under `references/cv/tailored/`:
- `<company>-<role>.tex` — the tailored CV (slug: lowercase, hyphenated, e.g. `stripe-frontend-engineer.tex`).
- `<company>-<role>.notes.md` — the tailoring log: a short table of JD keyword → matched real fact (or
  "GAP"); what was reordered/re-worded and why; and the **honest gap list** (must-haves he does not
  meet), so he walks into the interview knowing exactly where he is thin. This file is as valuable as
  the CV.

**6. Output.** Print the full tailored LaTeX in one fenced ```latex code block (his copy-paste rule —
never a blockquote), then a short plain-language summary: the top keywords now front-loaded, what moved
and why, and the gap list. Remind him the master is unchanged and this variant is saved for reuse.

## Notes

- **No LaTeX compiler is installed locally.** This skill emits `.tex` only; Tarun compiles it in
  Overleaf. Do not try to build a PDF here.
- **The master is append-only truth.** New real skills or a new project → update `master.tex` and
  `fact-bank.md`, never a tailored file. Tailored files are disposable derivatives.
- **When a JD is thin or generic,** tailor lightly and say so — over-tailoring to a vague JD just adds
  noise. The honest gap list is still worth producing.
- **The defensibility flags are the interview contract.** A tailored CV that surfaces a 🔴 line
  prominently (e.g. the AWS analysis engine, the 40% / 95+ numbers) must be paired with a reminder to
  drill it — that is what `learning/cv-defense/` is for. This skill does not depend on that folder, but
  the two share one rule: never claim authorship you cannot defend.
