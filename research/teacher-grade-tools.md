# Pre-Scout Brief — Teacher Grade Tools (EZ Grader, reinvented)

**Verdict: GO.** First idea to clear the full bar, and the only one of the scouted set that passes "beatable top-10" — the criterion we elevated as the real bottleneck. One honest caveat: CPM is medium (education), offset by very high evergreen volume, a winnable SERP, and suite expansion.

Date: 2026-06-27 · Owner: Tarun · Source run: `/scout-problem`

---

## The problem (one sentence)

Teachers grading stacks of tests and quizzes need to turn raw scores into percentages and letter grades fast, but every free "EZ grader" they land on is a dated, **stateless, single-assignment** calculator that forgets their class the moment they reload — so they keep falling back to spreadsheets.

**Target user:** K-12 and college instructors (US-first, near-zero adblock, heavy repeat use through the school year). **Secondary:** students checking their own scores (long-tail volume, lower intent/CPM). **Position teacher-first** to capture the better-monetizing segment.

## Demand read

**Keyword cluster:** `ez grader`, `easy grader`, `grade calculator`, `test grade calculator`, `grade calculator for teachers`, `wrong answers to percentage / points to grade`, `grading scale calculator`.

**Read: clears the demand floor — HIGH confidence.** Convergent signals: 10+ dedicated sites actively compete on these exact terms, `omnicalculator` maintains a page for the head term, the topic is evergreen with sharp school-year seasonality. Brands don't crowd dead keywords.

**What a paid keyword tool would confirm:** exact monthly volume per phrase, and the teacher-vs-student traffic split (the split drives effective CPM). Confidence on "clears the floor" = high; on exact split = medium.

## Top-10 teardown + the wedge

| Incumbent | What it is | UI | Features | Monetization | Verdict |
|---|---|---|---|---|---|
| ezgrader.us | EZ grader | Dated (~2010s) | Scales, decimal, half-point. **Stateless. No rosters, no multi-assignment, no export.** | No ads | Beatable |
| quickgra.de | "Easiest grader for teachers" | Dated | Very thin: wrong-answer count + keyboard shortcuts. No scales/persistence/export. Likely desktop-only. | None | Beatable |
| gradecalculator.com / ezgradercalculator.com / easygrader.net / gradecalcpro.com / easygradescalculator.com / gradecalculate.com | Sea of single-purpose clones | Mostly dated | Thin, similar, stateless | Mostly AdSense | Beatable |
| omnicalculator.com/other/test-grade | Authority page | Modern | Generic calculator, not a teacher workflow | Ads | Ranks head term only |
| mathwarehouse.com/teacher-tools | Single calc on an authority domain | Dated-ish | Raw-score → percentage | Ads | Soft |

**The wedge:** every incumbent is a **stateless, single-assignment novelty**. Win with a modern, fast, mobile-first, **teacher-first grader that remembers the work** — and do it with **zero backend cost**:
- Saved classes/rosters in **browser localStorage** (no login, no server, $0)
- Multiple assignments per class + averaging
- Custom grading scales (set your own cutoffs) + presets
- Partial / half credit
- Printable + CSV/PDF export
- Best-in-class speed, no-submit instant UX

No incumbent does persistence. That's the durable gap. AdSense is proven in-niche (these small sites live on it), so monetization is de-risked.

## Fit scorecard

| Criterion | Result |
|---|---|
| Small problem, high-demand field | ✅ Pass |
| Enough demand (floor) | ✅ Pass (high confidence) |
| **Beatable top-10** | ✅ Pass — low-authority, dated, stateless incumbents |
| Front-end-heavy / zero-cost backend | ✅ Pass — localStorage, no server |
| AdSense-viable | ✅ Pass (niche runs on it) · ⚠️ CPM medium |
| MVP in ~3-4 weeks | ✅ Pass — easiest build of the scouted set |

**Risks to manage:** (1) crowded with thin competitors — must win on UX + persistence + content depth + speed, not just existence; (2) student-vs-teacher traffic split — position teacher-first for CPM; (3) medium CPM — lean on volume + suite expansion for revenue.

## Rough MVP scope (ships in ~3-4 weeks)

**Core (table stakes):** wrong-answers → percentage + letter grade, instant, with full grade chart.

**The differentiator (still small):**
1. Saved classes/rosters via localStorage (no account)
2. Multiple assignments per class + simple average
3. Custom grading scale + presets
4. Partial / half-credit support
5. Printable + CSV/PDF export
6. Mobile-first, instant, no-submit UX

**SEO architecture:** dedicated landing pages per primary keyword (`/ez-grader`, `/test-grade-calculator`, `/grade-calculator-for-teachers`) on one **brandable** domain (not exact-match) — the one-domain, many-pages suite pattern.

**Explicitly OUT of MVP (v2 / suite expansion):** accounts, cloud sync, LMS integration, rubric maker, random student picker, classroom seating chart, worksheet tools.

---

**Verdict: GO. Run `/explore-project research/teacher-grade-tools.md` to scope the build.**
