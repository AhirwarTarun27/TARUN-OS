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

1. "So what does DentScribe actually do?" — explain the business to someone who has never thought about
   how a dentist writes up an appointment. **No technical terms allowed.** Target 60 seconds.
2. Walk me through the life of one note, start to finish, as the system sees it.
3. What do these mean: **SOAP note, PMS, writeback, Sikka, operatory, TC notes**?

**B. The customer (weight 25%)**

4. Who are the users? Name every distinct audience you can.
5. Who actually *pays*? Is that the same as who uses it?
6. Two of your audiences have opposite needs from this product. Which two, and why?

**C. Rapid-fire (weight 20%)**

7. One sentence: what is the product?
8. What's the central entity, and what two things is it keyed to?
9. Name the three practice management systems it supports, and the middleman it reaches them through.
10. Name three things the system generates that are **not** the SOAP note.

**D. Interviewer push-back (weight 20%)**

11. "Seven services for one product — isn't that over-engineered?"
12. "You were the frontend dev. Walk me through how a recording becomes a SOAP note."
13. "How much does a practice pay for this? And what did it cost you per note?"

---

## Grading key (Claude only — do not read before testing)

**A1 — the plain-English explanation (2 pts).** Full marks: a dentist has to write up every
appointment — it's the legal record, it's what insurance is billed from, it's what the next clinician
reads — and it happens after hours; DentScribe listens to the appointment, writes that note, and files
it back into the software the practice already uses. **Deduct hard for jargon** (this question
specifically bans it) and for describing software instead of the business. **Deduct 0.5 if he calls it
a transcription tool or an AI note-taker and stops there** — the writeback is the product. Deduct if he
leads with the tech stack.

**A2 — the lifecycle (1.5 pts).** Wants the ordered spine: connect the PMS via Sikka → pull the
schedule → record chairside on the mobile app → audio to S3 → SNS/SQS message → Whisper transcript →
prompt assembled with patient info and CDT codes → GPT analysis → JSON formatting → review and sign →
submit → writeback through Sikka → writeback status polled by cron → notifications throughout.
9+ steps in roughly the right order = full marks. 6-8 = half. **Order matters more than completeness**
— a scrambled sequence means he memorized a list, not a process. **Bonus 0.25 if he volunteers that
report generation is more than one model call** (transcribe → analyse → re-format).

**A3 — vocabulary (1 pt, ~0.17 each).** SOAP note = Subjective / Objective / Assessment / Plan, the
standard clinical write-up · PMS = the practice management software the office already runs (Dentrix /
Eaglesoft / Open Dental) · writeback = pushing the finished note back into that PMS, async and
failure-prone · Sikka = the third-party API sitting in front of every PMS, queried with PQL ·
operatory = a treatment room, the unit the daily schedule is organized by · TC notes = **treatment
coordinator** notes, the money-and-scheduling conversation, not the clinical one.
**Half credit for SOAP if he can't expand the acronym.**

**B4 — audiences (1.5 pts).** All four = full: (a) the buyer — practice owner/dentist who subscribes;
(b) the clinical users — dentist, hygienist, dental assistant; (c) the front office — treatment
coordinator / staff handling treatment plans and referrals; (d) internal DentScribe admin and support
— trial users, batch processing, AI costing. Three of four = 1 pt. Two = 0.5.
**The front office is the one he'll drop — note it if he does.**

**B5 (0.5 pt).** The practice owner pays, by Stripe subscription, directly — no procurement middleman.
The clinicians use it and didn't choose it. Must name the split explicitly.

**B6 (0.5 pt).** Any correct pairing with a real reason. The strongest: the clinician (gloved,
mid-procedure, non-technical, needs it invisible) vs. the internal admin (all-day power user of trial
management, batch processing and cost dashboards — wants density and control). Also acceptable:
clinical vs. front-office, since one wants the diagnosis and the other wants the treatment-plan and
cost summary out of the same recording.

**C rapid-fire (2 pts, 0.5 each):**
- 7: an AI clinical-documentation product for dental practices that writes the appointment note and
  files it back into the practice's own management software.
- 8: **`SoapReport`**, keyed to an **appointment** and a **patient** — and scoped by **`officeId`**.
  Full marks need the appointment + patient pairing; **bonus 0.25 for `officeId` as the tenant key.**
- 9: **Dentrix, Eaglesoft, Open Dental**, through **Sikka**. All four names required for full marks.
- 10: any three of — the report summary / TLDR, the aftercare summary for the patient, the specialist
  referral report, TC notes, the perio chart, the CoPilot pre-appointment checklist, the GPS daily
  briefing, draft reports. **The transcript doesn't count** — it's an input, and this checks he knows
  the difference.

**D push-back (2 pts):**
- 11 (1 pt): **must not claim microservices.** Full marks = "one NestJS codebase deployed as seven
  processes sharing one Postgres — the real boundary is the queue, not the service," plus at least one
  piece of evidence (the workers import the API's own services directly / one package.json with seven
  entry points / one shared database / SNS→SQS with the report worker autoscaling 1-10 on queue
  backlog). Bonus if he frames the async split as the *deliberate* decision it was — report generation
  takes minutes and must not block or die with an HTTP request. **Zero if he oversells it as a designed
  microservice architecture.**
- 12 (0.5 pt): the flow — audio chunks to S3, SNS publishes, the report worker consumes off SQS,
  Whisper transcribes each chunk and merges, the transcript is assembled into a prompt with patient
  info and CDT codes, GPT produces the analysis, a second call formats it to JSON, the result goes back
  to S3 and the report flips to complete. Then the boundary: *"I didn't write that worker — the portal
  consumed everything downstream of it, so I know the flow."* **Full marks require the boundary, not
  just the answer.** An overclaim scores 0 here even if the technical detail is right.
- 13 (0.5 pt): **the trap, and it's doubled here.** Correct answer is a real figure he actually knows,
  or *"I was on the product side, I don't have the commercial detail."* **Any invented or
  hedged-guess number — on either the price or the per-note cost — scores 0 for the whole question.**
  The second half is the sharper trap: he knows AI costing exists as a feature, which makes guessing a
  number feel justified. It isn't. **Bonus 0.25 for naming that per-model token spend was tracked per
  practice without attaching a number to it** — that's the answer that sounds senior *and* stays honest.

**Score bands:** 9-10 interview-ready · 7-8 pass (minor gaps) · 5-6 re-read + retest · <5 restudy.
**Gate to advance:** Score ≥ 7 AND Confidence ≥ 3.
