# Test — Module 0: Product & Business Context

**Format:** closed-book. Don't look at `00-product-context.md` while answering. Claude asks, you answer
out loud (or type). Claude grades a **Score /10**, asks your **Confidence /5**, and logs both to
`progress.md`.

> The grading key below is for Claude. **Don't read section "Grading key" before the test** — it's the
> answer sheet.

**Excluded from grading:** §4 (business model), unless Tarun has filled it in before the test. The code
can't teach it, so it can't be tested.

---

## The questions

**A. Explain the domain (weight 35%)**

1. "So what does Dwellworks actually do?" — explain the business to someone who has never heard of
   corporate relocation. **No technical terms allowed.** Target 60 seconds.
2. Walk me through the life of one relocation, start to finish, as the platform sees it.
3. What do these mean: **transferee, authorization, RMC, home finding, tenancy management, Spark**?

**B. The customer (weight 25%)**

4. Who are the users? Name every distinct audience you can.
5. Who actually *pays*? Is that the same as who uses it?
6. Two of your audiences have opposite UI needs. Which two, and why?

**C. Rapid-fire (weight 20%)**

7. One sentence: what is the product?
8. What's the central entity the whole platform revolves around, and what kicks it off?
9. What is Odin?
10. Name three services delivered during an assignment (not before it).

**D. Interviewer push-back (weight 20%)**

11. "Nine repositories for one product — isn't that over-engineered?"
12. "You were the frontend dev. What do you actually know about how an authorization becomes an order?"
13. "How much does one relocation cost your client?"

---

## Grading key (Claude only — do not read before testing)

**A1 — the plain-English explanation (2 pts).** Full marks: a company moves an employee to another
city/country; the employee can't navigate a foreign housing market alone; Dwellworks runs that move —
local consultant, find a home, find schools, handle the lease and paperwork, through to move-out.
**Deduct hard for jargon** (this question specifically bans it) and for describing software instead of
the business. Deduct if he leads with the tech stack.

**A2 — the lifecycle (1.5 pts).** Wants the ordered spine: authorization → order → consultant assigned
(Spark) → intake survey → area orientation → home + school finding → lease → settling in →
tenancy management → departure/deposit → billing & reporting. 8+ steps in roughly the right order = full
marks. 5-7 = half. Order matters more than completeness — a scrambled sequence means he memorized a list,
not a process.

**A3 — vocabulary (1 pt, ~0.17 each).** transferee = the relocating employee/end user · authorization =
the corporate's formal approval to move someone, which starts the order · RMC = relocation management
company, the middleman, and **a real user with its own reporting surface** · home finding = shortlisting
and touring properties, the core service · tenancy management = ongoing lease/landlord handling *during*
the assignment · Spark = consultant (DSC) assignment/acceptance.

**B4 — audiences (1.5 pts).** All four = full: (a) buyer — corporate employer / RMC; (b) transferee +
family; (c) internal consultants & program managers; (d) supplier network — agents, brokerages, station
agents. Three of four = 1 pt. Two = 0.5. Bonus-worthy if he adds internal back-office/finance.

**B5 (0.5 pt).** The corporate/RMC pays; the transferee uses it and never chose it. Must name the
split explicitly.

**B6 (0.5 pt).** Transferee (non-technical, stressed, mobile, untrained, needs hand-holding) vs. internal
consultant (all-day power user, wants density and speed). Any correct pairing with a real reason = full.

**C rapid-fire (2 pts, 0.5 each):**
- 7: a relocation/destination-services platform that manages corporate employee moves end to end.
- 8: the **Order** (one relocation assignment), kicked off by an **authorization**.
- 9: the flagship product — "Dwellworks' Destination Software," the main app users log into; one of nine repos.
- 10: any three of — settling in, visa/immigration, tenancy management, departure/deposit recovery,
  appointments/tasks, documents, payments/funds. **Home finding and area orientation don't count** —
  the question said *during* the assignment, and this checks he knows the sequence, not just the list.

**D push-back (2 pts):**
- 11 (1 pt): **must not claim clean microservices.** Full marks = "a .NET Framework monolith (Odin) with
  .NET Core services carved off around it over time — modernization in progress, not greenfield," plus at
  least one piece of evidence (Odin is 4.6.1 / the newer services are .NET Core / identity is the one real
  shared-service boundary / ClientAPI is an external-integration boundary). Bonus if he frames legacy
  modernization as a *strength*. **Zero if he oversells it as a designed microservice architecture.**
- 12 (0.5 pt): the honest posture — ClientAPI receives authorizations from external systems
  (ServiceEngine/Destination/Aires), processes them, an order results in Odin. Then the boundary:
  *"I didn't write that service, but the front end consumed everything downstream of it, so I know the
  flow."* **Full marks require the boundary, not just the answer.** An overclaim scores 0 here even if
  the technical detail is right.
- 13 (0.5 pt): **the trap.** Correct answer is either a real figure he actually knows, or *"I was on the
  product side, I don't have the commercial detail."* **Any invented or hedged-guess number scores 0 for
  the whole question** — this is the one failure mode that loses interviews outright.

**Score bands:** 9–10 interview-ready · 7–8 pass (minor gaps) · 5–6 re-read + retest · <5 restudy.
**Gate to advance:** Score ≥ 7 AND Confidence ≥ 3.
