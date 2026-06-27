# Decisions Log

Append-only record of meaningful decisions and why they were made. `/level-up` Phase 2 (Method interview) writes scoped automation specs here. You can also append manually whenever you decide something worth remembering.

**Format per entry:**

```
## YYYY-MM-DD — Short title

**Decision:** what was decided.

**Why:** the reasoning, constraints, and what would change your mind.

**Alternatives considered:** what else was on the table.

**Owner:** who's accountable.
```

Keep it terse. Future-you will thank present-you for capturing the *why*, not just the *what*.

---

## 2026-06-27 — Built the project-pipeline skill set

**Decision:** Created six skills to systematize new-product creation: `/scout-problem` (standalone, data-driven idea validation) plus a `/explore-project` parent that orchestrates `/domain-namer`, `/pick-stack`, `/design-architecture`, and `/setup-kit`. Moved `domain-namer` from user-level into this repo.

**Why:** Project exploration was the repetitive pain — re-typing a long research/domain/keyword prompt for every new product. Encoding the proven Jsonbeam process into modular skills removes the re-typing and bakes in selection criteria (small underserved problem + enough demand + beatable top-10 + front-end-heavy + AdSense-viable + ~3-4 week MVP) so future projects are picked on data, not preference.

**Why all at once (against the one-at-a-time default):** The process is already proven on Jsonbeam, and the skills get reviewed/corrected one by one. Real validation comes on the first live `/scout-problem` run.

**Alternatives considered:** One skill per week via `/level-up` (rejected — process already proven, user wanted them today). One giant prompt instead of modular skills (rejected — modular skills are individually correctable).

**Owner:** Tarun.
