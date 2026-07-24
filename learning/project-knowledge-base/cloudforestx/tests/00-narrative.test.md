# Test — Module 0: Narrative & Pitch

**Format:** closed-book. Don't look at `00-narrative.md` while answering. Claude asks, you answer out loud
(or type). Claude grades a **Score /10**, asks your **Confidence /5**, and logs both to `progress.md`.

> The grading key below is for Claude. **Don't read section "Grading key" before the test** — it's the
> answer sheet.

---

## The questions

**A. The main event (weight 40%)**
1. "Tell me about a project you've worked on." — deliver your **2-minute pitch**, cold.
   Then, on request, compress it to a **30-second** version.

**B. Role & scope (weight 20%)**
2. What was your specific role, and what did you own?
3. You also list backend work — what exactly did you do on the backend vs. the frontend?

**C. Rapid-fire facts (weight 25%)**
4. One sentence: what does CloudForestX do?
5. Which cloud provider does it run on?
6. Who are the users / buyers?
7. Name the three things it does to actually save money (not just show data).
8. Is it single-tenant or multi-tenant?

**D. Interviewer push-back (weight 15%)**
9. "Cost dashboards are simple. What's actually *hard* about this product?"
10. "You were the frontend dev — why should I trust that you understand the whole system?"

---

## Grading key (Claude only — do not read before testing)

**A1/A2 — the pitch (4 pts).** Strong answer: opens with a crisp one-liner, states the problem (multi-account
cloud waste), covers see-the-spend / find-the-waste / act-on-it, names his role clearly, ends with a hook.
Fluent, no rambling, no filler. 30s version hits problem → what it does → his role only. Deduct for: reciting
a feature list with no problem framing, burying his role, or running long/unstructured.

**B2 (1 pt):** Senior Frontend Developer, ~6-person team; owned the React/TS SPA end-to-end (dashboards, viz,
state, service layer, notifications).
**B3 (1 pt):** Frontend end-to-end + **some** Node/Postgres cost-serving APIs. Must NOT claim he built the
analysis engine / fetch workers. The honest "I integrated with and understand the whole backend" framing = full marks.

**C rapid-fire (2.5 pts, ~0.5 each):**
- 4: cloud cost optimization — finds waste + recommends savings across cloud accounts.
- 5: **AWS.** (Don't claim Azure — that's not what you worked on.)
- 6: enterprise FinOps/DevOps/platform + finance teams with a big multi-account bill.
- 7: idle/oversized detection → rightsizing & reservation recommendations → auto power-scheduling. (Visualization/alerts are the wrapper, not one of the three "save money" actions.)
- 8: **multi-tenant** (tenant = company).

**D push-back (1.5 pts):**
- 9: any two of — fan-out across hundreds of accounts × regions; messy/huge cloud billing data → trustworthy recommendations; rendering a very large nested dataset fast in the UI.
- 10: "the frontend integrated with every backend service, so I had to understand where the data came from" + the honest boundary ("I didn't write the algorithms, but I can walk the whole flow").

**Score bands:** 9–10 interview-ready · 7–8 pass (minor gaps) · 5–6 re-read + retest · <5 restudy.
**Gate to advance:** Score ≥ 7 AND Confidence ≥ 3.
