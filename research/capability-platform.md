# The Product Plan — a capability platform that proves people can actually do the thing

> **Status:** Direction locked 2026-08-01 after two full research sessions (~30 categories evaluated).
> **This file is the business plan.** The detailed engineering plan is a separate session.
> **Read this file first in any new session.** It contains the decision rules, the killed list and the
> reasoning, so nothing here gets re-litigated from scratch.

---

## 1. Mission

**Make it possible to know what a person can actually do.**

AI destroyed every existing proof of competence at the exact moment the world needed to retrain
almost everyone. We build the system that closes that gap: people build a real skill by doing the
work, and the record shows what they can genuinely do unaided.

## 2. End goal

A capability system of record for organisations. Over years it becomes the place a company keeps its
honest answer to *"who here can actually do what?"* Starting with one team, growing to a whole org,
ending as enterprise infrastructure with SSO, audit, permissions and analytics.

Tarun's personal end goal: a product he can work on for years, expand a team into, onboard clients
into, and eventually retire on. Not a portfolio piece. Not a lite app.

## 3. Why — the problem, with evidence

Two things happened simultaneously and together they created the opening.

### 3a. Demand exploded

| Fact | Source |
|---|---|
| **~80% of the global workforce needs new skills by 2027** | WEF-derived 2026 reporting |
| **74% of organisations plan to upskill or retrain in response to AI**; 62% call it a priority | 2026 AI upskilling surveys |
| **Only 39% of employees who use AI have received any company training on it** | same |
| **Only 6% of companies are actually reskilling workers for AI** | 2026 reskilling gap reporting |
| Enterprises' top 3 moves: raise AI fluency (53%), formal upskilling/reskilling (48%), specialised hiring (36%) | same |

**The gap between "74% plan to" and "6% actually do" is the market.**

> ⚠ **The 6% figure is UNVERIFIED (issue #11, 2026-08-03).** A dedicated re-check confirmed the **74%**
> against a named source ([CIO, 2025](https://www.cio.com/article/3542980/74-of-workers-suggest-employers-to-blame-for-their-ai-skills-gap.html))
> but **could not find the 6% anywhere**. Do not cite it as fact. The nearest verified 2026 numbers:
> only **26%** of organisations offer formal upskilling programmes (down from 35% a year earlier), and
> only **33%** of workers report employer AI training in the past six months against **55%** who use AI
> regularly. **The gap is real and the argument survives — it is roughly 74 vs 26, not 74 vs 6.**
> Fix the sentence above before this number reaches a customer-facing page or a pitch.

### 3b. Proof collapsed

| Fact | Source |
|---|---|
| **53% of employers say validating skill claims is their single biggest challenge** when evaluating people | WGU report |
| *"AI tools now produce realistic transcripts, diplomas, and supporting documentation with accurate formatting, institutional seals, and registrar signatures"* | 2026 credential-fraud reporting |
| *"Organisations have committed to evaluating talent based on competencies yet lack reliable mechanisms to validate those competencies at scale"* | 2026 skills-verification analysis |
| **45% of companies that dropped degree requirements changed "in name only"** — they had nothing to replace them with | 2026 skills-based hiring research |
| *"Hire for skills is meaningless until someone writes down which skills, at what level."* | same |

### 3c. Why existing tools cannot fix it

| Category | What it measures | Why it fails in 2026 |
|---|---|---|
| **LMS** (Cornerstone, Docebo, TalentLMS) | Course completion | AI can complete anything. Completion is now noise |
| **Course platforms** (Thinkific, Kajabi) | Video watched | Built for a solo self-paced learner. **Completion runs 3–15%** |
| **Cohort platforms** (Disco, Teachfloor, Circle, Skool) | Attendance + engagement | **90%+ completion** thanks to the group format, but they are content hosting plus a chat room. They prove attendance, not ability |

**Nobody measures whether the person can do the thing.** That is the entire product.

## 4. Why now (a 2026-native problem)

This problem did not exist in 2022. Certificates worked. Take-homes worked. Portfolios worked. AI
broke all three inside 24 months, while simultaneously forcing the largest reskilling wave in modern
history. Both curves crossed in 2026.

**Honest caveat kept on the record:** the *category* (learning software) is old. The *problem* is new.
We are claiming a new problem inside an old category, not a new category. If that framing ever stops
being believable, the thesis is in trouble.

## 5. The product in plain words

**A place where a team learns a skill by actually doing it, and where the record shows what each
person can genuinely do.**

The analogy to use with every customer: **a driving certificate versus a driving test.** The
certificate says you attended. The test says you can drive. Every product on the market sells
certificates. We sell the test, and the practice that gets you through it.

### How it works

1. A company or trainer puts in the material people need to learn
2. The product turns it into **practice, not lectures**. Real tasks, real problems
3. People practise, get it wrong, get feedback, come back
4. The product **brings things back at the right time** so they stick, instead of one-and-done
5. It **does not let you move on until you can do it unaided.** The gate is behaviour, not a score
6. The manager sees an honest picture: can do these five alone, these two with help, these three not yet

### The mechanism (the actual IP)

The learning mechanics come from the system Tarun already runs on himself in `TARUN-OS` and has
tested under real pressure for months:

- **Spaced repetition where D0 = the day it was SOLVED, not the day it was seen** (`learning/dsa/queue.md`)
- **Cold rebuild, not re-solve** — re-solving proves nothing (`learning/machine-coding/`)
- **Gates are behaviours, not scores** (`learning/interview-qa/`)
- **Phase gates that refuse to advance you early** (machine-coding phases 0→3)
- **"Never claim authorship you can't defend"** (`learning/cv-defense/`)

Every competitor treats learning as content delivery. Tarun already believes, from lived experience,
that content delivery is the part that does not work. **That is the founder-market fit, and it is not
manufactured. It is in the repo.**

## 6. What this product is NOT (hard guardrails)

Load-bearing. Breaking one breaks the thesis.

1. **It never makes hiring or promotion decisions.** Verification only. The moment it feeds an
   employment decision it lands in the **EU AI Act Annex III high-risk class** (AI-disclosure duty
   from August 2026, Annex III obligations December 2027, penalties up to €15M or 3%). Verification
   is fine. Judgement about someone's job is not. **This line is absolute.**
2. **It is not a content library.** We never compete on how many courses we host.
3. **It is not an LMS.** We never sell completion tracking.
4. **It is not a data-entry system.** The user never types in "what happened." The work happens
   inside the product and the record is a byproduct. (This rule killed workforce ops, PSA, CMMS and
   inventory — see §14.)
5. **AI usage is never subsidised.** See §10.

## 7. Why it is defensible

**The record becomes the company's memory of its own capability.** After six months it holds who can
do what across the whole team. Nobody moves that.

**The hard part is invisible.** When something should come back, what counts as proof, how to gate
without making people quit. That is years of tuning and it cannot be seen from outside. Anyone can
copy a screen. Nobody can copy the tuning.

**Competitors would have to throw away their core.** Every one is built on content delivery.
Rebuilding around proof means discarding what they sell. That is why they will not do it.

### Why AI cannot replace this

**AI can teach you. It cannot tell your employer that you learned.**

That needs a neutral system keeping a record over time. The moment the learner and the examiner are
the same chat window, the proof is worth nothing. Nobody accepts "the AI says I'm good at this."

And **AI makes this problem bigger every month.** The more AI can do the work, the less anyone can
tell who can do the work. This is a category AI feeds, not one it eats.

## 8. Competitive position

| Competitor | What they own | Our wedge |
|---|---|---|
| Disco ($399/mo, no free tier), Teachfloor ($59–349), Maven (free until a student pays, then 10%), Circle, Skool, Heartbeat, EducateMe | Cohort delivery + community | They prove attendance. We prove ability |
| Thinkific, Kajabi | Solo self-paced courses | 3–15% completion. Wrong format for the era |
| Cornerstone, Docebo, TalentLMS | Enterprise compliance training | They sell completion, which AI made meaningless |
| LinkedIn Learning, Coursera | Content at scale | Content, not proof |

**No giant gives this away free.** Google Classroom is K-12. LinkedIn Learning is content. Maven only
takes a cut after a student pays. This clears the one absorption test still in force (§13, rule 3).

**Incumbent satisfaction is poor and price anger is the #1 complaint category** across course
platforms (Circle 2.5/5 on Trustpilot with 55% one-star, Thinkific 2.3/5, price increases of
40–160%). *Treat those ratings as directional only. Trustpilot self-selects for angry users.*

## 9. Business model

- **Free trial only, then everyone pays.** No permanent free tier. **The free front-door tool in §12
  is NOT a free tier of the product** — it is permanently free (it has to be, or it cannot rank), and
  that does not breach this rule, because **100% of the buyer's value is absent at n=1**. A solo user
  gets self-practice; a buyer gets capability visibility across people (§2, §5 step 6). Those are not
  the same product at two sizes. *(§9/§12 contradiction reconciled 2026-08-01, issue #2.)*
- **Flat plan pricing with an included AI allowance.** Not pure per-seat — per-seat pricing was the
  single most-complained-about model in every adjacent category researched.
- Indicative ladder (to be validated, not final):
  - **Starter** ~$29/mo — one small team, capped learners, small AI allowance
  - **Team** ~$99–199/mo — multiple programs, manager views, larger allowance
  - **Business** ~$499+/mo — org-wide, reporting, larger allowance
  - **Enterprise** — custom: SSO/SAML, SCIM, audit logs, permissions, analytics
- **Sales calls are acceptable. Per-customer implementation work is not.** Onboarding must be
  self-serve. Tarun sells; he does not implement.
- **No advertising, at any tier, ever — including on the free front-door tool.** Subscription is the
  only revenue line. This is the one product in the portfolio that is not an AdSense play, and the
  free tool in §12 is a free *acquisition* surface, not an ad-monetized one. SEO still matters fully;
  it feeds trials rather than impressions. Do not apply `/adsense-ready`,
  `references/adsense-economics.md` or `/scout-problem`'s revenue band to this product.
  *(Made explicit 2026-08-01 — §9 already implied it, but every neighbouring product and `CLAUDE.md`
  itself default to ads, so silence here was a trap.)*

## 10. AI cost control — the rule that must be coded, not hoped

> **AI cost for any customer must never exceed ~20% of what that customer pays.**

Enforcement, all of it inside the product:

1. **Every AI action is a named, priced unit** — "generate a practice set", "grade an answer",
   "explain a mistake". Users see actions, never tokens
2. **Every call logs its real measured input/output token cost** to Postgres, per organisation.
   Measured, never estimated
3. **Each plan includes an allowance** stated in human terms ("200 practice generations this month")
4. **When the allowance runs out, the deterministic product keeps working.** Records, gates,
   scheduling and progress never stop. Only AI features pause. They top up or upgrade
5. **Cheap model for cheap work.** The expensive model only where quality visibly shows
6. **Cache aggressively.** The same material must never be regenerated twice

### Where AI is used (the metered surface)

- Turning raw material into practice tasks
- Grading open-ended answers and giving feedback
- Explaining what went wrong
- Choosing what to practise next

**The deterministic core — the record, the gates, the scheduling — is the flat fee. AI is the
accelerant on top.** This is deliberate: every category where AI *was* the product attracted ten
funded competitors within 24 months (see §14).

### Indicative per-action cost (2026 mid-tier model pricing)

| Action | Rough cost |
|---|---|
| Generate a practice set from material | ~$0.07 |
| Grade an open answer with feedback | ~$0.02 |
| Explain a mistake | ~$0.014 |

A very active learner doing **100 AI actions/month costs ~$2–5**. At a $19–29 seat that is 10–20% of
revenue, inside the guardrail. Heavier users hit the allowance and pay for more.

## 11. Cost model

### Phase A — building (months 1–3, zero customers)

| Item | Cost |
|---|---|
| Domain (.com) | ~$12/year |
| App hosting (Node API + React) | $0–5/mo (free tier or ~€4 VPS) |
| Postgres | $0 (free tier) |
| Redis (queues) | $0 (free tier) |
| File storage | $0 (free tier) |
| Email | $0 (Resend free tier = 3,000/mo) |
| AI API for integration testing | $20–50/mo |
| **Total** | **~$25–60/month** |

**Claude Pro is the prompt-development environment.** Tarun has Claude Pro, so **prompt design,
grading-rubric iteration and output-quality testing for each module happen in Claude Pro first, at
zero marginal cost.** Only the final wired-up integration test burns API credit. This meaningfully
cuts the AI line above. Existing AI coding tools are already paid for and are not a new cost.

### Phase B — first customers (1–50)

| Item | Cost |
|---|---|
| Hosting + database + Redis + storage + email | **$30–90/mo total** |
| AI API | Variable, metered per §10 |
| Payment processing | ~2.9–5% + a fixed fee per charge |

### Phase C — scaling (100+ customers)

Infra grows slowly and roughly linearly: **~$150–400/mo at a few hundred customers.** AI is the only
cost that grows with usage, and it is metered by design.

### Break-even

- Fixed cost at launch: **~$60/month**
- A $29 customer nets ~**$23** after AI and payment fees
- **Break-even at 3 paying customers**
- 20 customers ≈ **$460/mo net** · 100 customers ≈ **$2,300/mo net**

**This is the point of this product shape: the fixed cost base is almost nothing.** There is no
server bill that forces a shutdown while waiting for traction.

## 12. Distribution — the free-tool front door

The reason this product was chosen over better-known categories, and Tarun's one genuinely rare
asset: **he has ranked three sites from zero on organic search.**

### Why this channel is the right bet in 2026

| Fact | Implication |
|---|---|
| **AI Overviews now appear on ~48% of all queries**, up 58% YoY | Content SEO is collapsing |
| Informational queries trigger AIO **36%** of the time; commercial **8%**; transactional **5%** | Buyer-intent queries are largely spared |
| Healthcare/education content sees **30–45% CTR erosion**; transactional **8–15%** | Damage is concentrated in content |
| *"AI Overviews cannot replicate calculators, configuration tools, interactive comparisons, or dynamic assessments"* — **under 3% disruption, highest engagement** | **Tool SEO is the last channel standing** |
| **Free tools and templates convert 2x–4x higher** than educational blog content in SaaS funnels | Tools also convert better |
| A well-built free tool **earns hundreds of backlinks with no outreach** | Permanent domain authority for the whole site |

Every competitor running a content-marketing playbook is watching their channel die. The one channel
still standing is the exact one Tarun has executed three times.

### The design rule that stops this becoming JsonBeam again

> **The free tool does the job ONCE, for ONE thing, for ONE person.
> The paid product does it REPEATEDLY, for a TEAM, with HISTORY.**

**"ONCE" means SCOPE, not FREQUENCY** *(clarified 2026-08-01, issue #2)*. Read literally it kills the
mechanism: one run is one attempt, one attempt is not a record, and spaced repetition across a single
session is nothing. So the free tool is **unlimited in depth, capped in breadth** — one person, one
skill, the *full* mechanism (real spaced repetition, the real unaided gate, a real accumulating
record). **The wall is the second person**, not the second session and not the second skill. A skill
cap is a weaker wall: a solo learner gets real ongoing value forever and never hits it.

JsonBeam ranks #1 and earns $0 because the free tool *was* the whole product. The visitor's job was
finished and there was nothing to upgrade to. **If a visitor can finish their job on the free tool
and never return, we have rebuilt JsonBeam.** The bridge is designed in from the first sketch.

Candidate front doors: quiz/practice-set builder, spaced-repetition practice tool, curriculum
builder, skills-matrix builder. **Which one is decided by data, not argument — see Phase 0.**

> ⚠ **ALL FOUR CANDIDATES ABOVE ARE DEAD as of 2026-08-03 (issue #7).** This paragraph is kept as the
> record of what was tried. **The live shortlist is issue #7's resolution comment, not this list.**

| Candidate | Verdict | Why |
|---|---|---|
| Spaced-repetition practice tool | ~~PASS~~ **KILLED 08-03** | **Anki** — free, open source, dominant, ships FSRS. §13 rule 3, applied evenly with §14's Spec Kit kill |
| Quiz / practice-set builder | ~~CONDITIONAL~~ **KILLED 08-01** | **NotebookLM** ships generation + taking + a persisted per-person attempt record, free to all tiers (issue #6) |
| Curriculum builder | **FAIL** | Outputs a document. No carry-over, wrong object |
| Skills-matrix builder | **FAIL** | Outputs a document. No carry-over, wrong object |

**Widen the shortlist by finding new candidates that pass — never by softening the gates to readmit
any of these.** That rule was honoured: the replacement shortlist was built from new ground, not by
rescoring the dead.

**The replacement, locked 2026-08-03 (issue #7).** One product shape, verticals as the variable:

> **A free practice-exam drill that returns your wrong answers on a spaced schedule, gates you on an
> unaided attempt, and keeps a persistent per-person readiness record.**

Five candidates, 21 seed queries, each vertical measured at an **entry tier** (junior certifications —
the measured population) and a **senior tier** (who opens the free door) separately: cloud
certification, platform admin certification, security certification, Kubernetes/IaC certification,
and trade licensing as a control. **Free-loop cost is $0 recurring** — one cached generation of the
bank, then multiple-choice grades itself deterministically, which clears gate 6 without relying on
self-rating.

Three consequences worth carrying:

1. **The audience is decided by channel, not by the volume table.** Issue #6 found no tool-shaped SERP
   on the corporate L&D side at all, so there was never a measurable candidate on that side. This
   supersedes the map's original sequencing plan.
2. **Phase 0 now tests ONE product shape, not five independent bets.** If the shape is wrong, every
   row fails together. Stated so it is not discovered late.
3. **The free tool serves the senior; the paid product measures the juniors.** See `decisions/log.md`
   2026-08-03, which also carries the §6.1 positioning rule that comes with it.

**Cut to 3 live + 4 on hold, 2026-08-03 (issue #12).** Full evidence in
`research/phase0-certifying-bodies.md`.

| Vertical | Status | Why |
|---|---|---|
| Cloud — **AWS** | **LIVE, primary** | Front door verified first-party: Official Practice Exams **"Not included"** on the free account, paid at $29/mo. #6's load-bearing observation confirmed in stronger form |
| Cloud — **Google Cloud** | **LIVE, secondary** | Weakest official offering of any body examined. Its practice material is a **Google Form** |
| **HashiCorp** (IaC) | **LIVE, long tail** | 5 static sample questions, no login, no product. Open on competition; entirely subject to the demand check |
| Cloud — **Microsoft / Azure** | **DEAD** | **Free Practice Assessments, ~48 exams, unlimited retakes, per-person attempt history, authored by the exam team.** Gates 1-3 satisfied by the incumbent for free, on the exam's own page. §13 rule 3, same as NotebookLM |
| **Kubernetes / CKA** | **DEAD** | Dropped on **product fit, not competition** — hands-on performance exam in a live cluster. An MCQ drill does not test what it tests |
| **CompTIA** | HOLD | Paywalled today (~$129-199), but **CertMaster Practice is already this product**: *"exam objective mastery scores"*, *"confirm exam readiness and close gaps"*. Standing reprice risk — the highest on the board |
| Salesforce / ServiceNow / ISC2 | HOLD | All paywalled. Not yet volume-checked |
| Trade licensing (control) | HOLD | Unchanged. Expected to lose |

Two constraints this produced, both load-bearing later:

- **The mark cannot lead.** AWS bars its marks in domains and subdomains outright and requires
  `[Your Brand] [relational phrase] [AWS Mark]`; Microsoft bars its mark as *"the leading word or most
  prominent element"*. So `awspracticeexam.com` is out and
  `yourbrand.com/aws-certified-solutions-architect-associate` is the compliant construction. **Marks in
  URL paths are permitted.** No partner programme is needed for referential use. Price this into the
  acquisition model before any page template is built.
- **Authoring original questions from the published blueprint is confirmed legitimate, not assumed.**
  Blueprints are public and are the intended authoring surface; questions are confidential. Every
  verified enforcement action targeted **reproduction of real exam content**, via **copyright over the
  questions, not trademark over the name** — avoidable by construction. Two questions here need a
  lawyer rather than more research; both are recorded on issue #12 and block a build, not Phase 0.

### Free demand-check stack (no paid SEO tools needed)

Google Keyword Planner + Search Console + AlsoAsked + Google Trends + Keyword Surfer replace roughly
**80–90% of a $129/mo Ahrefs plan** for this purpose. ~~**Bar to clear: 500+ monthly searches at
keyword difficulty under 30.**~~

> ⚠ **The 500 bar is DEAD (issue #4).** Replaced by **~3,000 monthly searches on the addressable
> cluster at KD under 30**, derived from a 20-customer floor. Keyword Planner's free precision returns
> buckets like "1K – 10K", and 3,000 sits *inside* that bucket — a bucketed range straddling the bar
> cannot adjudicate it in either direction, and **a bucket midpoint is not an answer** (§13 rule 1).

## 13. Decision rules (do not re-litigate)

Derived over two sessions. Binding on all future candidate evaluation.

1. **Only claim what the product can prove.** No inferred metrics. (This killed AI-code detection:
   there is no reliable way to tell AI-written code from human-written code.)
2. **Value must appear before deep integration.** No repo, CI or cloud credentials required to get value.
3. **The absorption test, corrected:** *"a giant could build this"* is **not** fatal. *"a giant
   already gives this away free"* **is** fatal. Linear thrives next to Jira, Supabase next to
   Firebase. But ProfitWell being free killed subscription analytics.
4. **The work must happen IN the product.** Anything where a user reports on work done elsewhere is
   rejected (the "SAP feeling"). The record must be a byproduct of doing the job.
5. **AI is never the product.** Every category where AI *was* the product drew 10+ funded entrants in
   under 24 months. AI is a metered accelerant on a deterministic core.
6. **Not built on ground Tarun has already covered.** Nothing rebuilding Dwellworks, DentScribe,
   CloudForestX or MyWorkMyDay work.
7. **No regulated territory.** See §6 guardrail 1 for the specific line here.
8. **Competition is acceptable; execution decides.** Big proven market, take a sliver.

## 14. Killed ideas (do not resurrect without new evidence)

| Idea | Why it died |
|---|---|
| Subscription/revenue analytics | ProfitWell free (Paddle-owned); ChartMogul free to $120K ARR. Giants give away the target price band |
| AI-search visibility monitoring | Ahrefs + Semrush ship free AI-visibility checkers; 22+ tools already |
| Immigration case management | Regulated + PII + no domain knowledge |
| FinOps / cloud cost | **User rejected.** Also mid-market filling fast; AWS ships free tooling |
| Freight / CHA / forwarder ops | **User rejected** |
| Agency all-in-one / client delivery | Graveyard; 1–10 person agencies churn 32%/yr |
| Documentation drift merge gate | **User rejected** on integration friction — repo + CI before any value |
| Flaky tests / API contract drift | Same structural flaw: deep repo/CI access before value |
| Data observability | Free OSS at the bottom; dbt Labs acquired Metaplane in the middle |
| B2B customer onboarding (Rocketlane/GuideCX/Arrows) | **User killed.** Price gap but no quality gap (G2 4.7–4.8). Too close to "PM with a customer in it" |
| RFP / proposal response | 10+ funded AI-native entrants (SparrowGenie, AutoRFP, Inventive, 1up, Arphie, Tribble, SiftHub); "self-updating knowledge bases" already a comparison axis |
| Test management | Tuskr already at $9/user **with** AI test generation |
| PRM / partner portals | Kiflo ($149) and Allbound already fill the SMB band |
| Presales / POC management | **Homerun is self-funded, profitable and growing**; 15+ players; Tarun is not the user |
| Engineering career frameworks | A templates problem, not a software market; plus EU AI Act on promotion AI |
| **On-call / incident response** | **Squeezed both ends.** Better Stack at $29/responder already bundles incidents + status pages + logs + AI SRE; **Datadog On-Call (June 2024) absorbs paging into observability.** Opsgenie's forced migration (EOS 5 Apr 2027, all data deleted) is real but is being harvested by funded players |
| Workforce ops / PSA / CMMS / inventory | **User rejected the shape** — data-entry heavy, "SAP kind of application." Also Zoho, Katana and Sortly give inventory away free; MaintainX has a free tier |
| AI code review / verification | **~$420M ARR already split.** CodeRabbit ~140K paid users + $88M raised; Greptile Benchmark-led at $180M valuation; Qodo ~$51M; **Graphite acquired by Cursor Dec 2025.** Also no tool-shaped front door |
| Spec-driven development tooling | **GitHub Spec Kit is free, open source, 93K+ stars**; AWS Kiro is the other pole. Giants give it away |
| ContextOps / AI rules governance | Thin layer; Anthropic, Cursor and GitHub would each ship it natively; Packmind and BuildBetter already there |

## 15. Tech stack (high level — detailed engineering plan is a separate session)

Locked by requirement, and every piece is load-bearing.

| Layer | Choice | Why |
|---|---|---|
| Frontend | **React + TypeScript** | Required. Strongest surface |
| API | **Node.js + Express + TypeScript** | Required |
| Database | **PostgreSQL** (SQL required) | Genuinely relational: orgs → programs → skills → people → attempts → evidence → schedules |
| ORM | TypeORM *(preference, not requirement)* | Matches the CV; Prisma acceptable if it proves better |
| Queue / jobs | Redis + BullMQ | Keeps AI calls off the request path. Non-negotiable for cost control and latency |
| AI | Metered provider calls, cost logged per org | See §10 |
| Local dev | **Docker Compose** (api / web / postgres / redis) | Required. A clean clone must come up in one command |
| Deploy | Start cheap (VPS or managed container), grow into AWS | Cost discipline first, AWS depth later |
| Payments | Stripe, or a merchant-of-record — **see §17** | Must be resolved before Phase 3 |

**Real backend depth exists here** and grows with success: spaced-repetition scheduling, adaptive
path selection, assessment and grading pipelines, evidence integrity, cohort orchestration,
multi-tenant isolation, and later reporting rollups. This is a years-long build, not CRUD.

## 16. Phase-by-phase plan

### Phase 0 — Demand gate (2 weeks, NO product code)

The one gate that must not be skipped. It is exactly the gate skipped on AccentWallPlanner and later
converted in `decisions/log.md`.

- Shortlist 4–6 candidate front-door tools
- Run each through the free stack (Keyword Planner, Search Console, AlsoAsked, Trends, Keyword Surfer)
- **Pass bar: 500+ monthly searches, KD under 30, and the accumulation test cleared**
- **Apply the ACCUMULATION TEST BEFORE the volume test**, or we just find another popular free tool
  with no business behind it. *(Renamed from "the recurring-job test" 2026-08-01 — recurrence alone
  does not discriminate, and a recurrence test would have passed JsonBeam. The six hard gates are
  defined in issue #2; recurrence survives as gate 1, a cheap pre-filter.)*
- Decide the **first audience**. Technical teams is the tightest scope and the one Tarun can judge
  quality on; corporate L&D is the bigger market but a slower first sale
- **Exit criterion:** one front-door tool and one first audience, in writing, with the numbers. Log
  the decision in `decisions/log.md`. *If nothing clears, that is a valid outcome. Do not manufacture
  a GO.*

### Phase 1 — The spine (month 1)

- `docker compose up` from a clean clone brings up api / web / postgres / redis
- Auth, organisations, invitations, roles
- Schema + migrations for the core domain: org → program → skill → person → attempt → evidence → schedule
- **Exit criterion:** an integration test proving org A cannot read org B's rows through any endpoint

### Phase 2 — The core loop (month 2) — *this is the product*

- Add material → generate practice → run a drill → record the attempt → schedule the return
- The verification mechanism: what counts as proof, what "unaided" means, how a gate opens
- The spaced-repetition scheduler
- AI actions wired with **per-call cost logging from the very first call, never retrofitted**
- **Prompt and rubric quality developed in Claude Pro first**, then wired to the API
- **Exit criterion:** one person can learn one real skill end to end, and the record honestly reflects
  what they can and cannot do

### Phase 3 — Sellable (month 3)

- The free front-door tool, on the same domain, with a real upgrade path into the app
- Billing, free trial, fully self-serve signup — **zero human contact required to pay**
- AI allowance enforcement live (allowance exhausted → AI pauses, core keeps working)
- Deploy to production
- **Exit criterion:** sign up from a clean browser, reach the aha moment, and pay, without Tarun
  touching anything

### Phase 4+ — Driven by paying customers only (month 4 onward)

In roughly this order, and **only when a paying customer asks**:

1. Manager and team views — the honest capability picture
2. Cohorts and programs — group runs with start and end dates
3. Reporting and capability trends over time
4. **The enterprise ladder:** SSO/SAML, SCIM, audit logs, fine-grained permissions, multi-team,
   org-wide analytics
5. Public API and integrations

**Nothing in Phase 4 gets built before someone pays for it.** Building the enterprise ladder before
customer one is how a multi-year project dies in month four.

## 17. Open items (none block Phases 0–2)

1. **Payments from India selling worldwide.** Stripe India restricts international sales; Indian
   founders commonly route via a merchant-of-record (Paddle, Lemon Squeezy). **The 2026 rules are not
   verified — do not state them as fact.** Must be settled before Phase 3.
2. **Product name and domain.** Undecided. Run `/domain-namer` once Phase 0 fixes the audience.
3. **First audience.** Technical teams vs corporate L&D. Decided in Phase 0.
4. **Verification beyond technical skills.** Proving someone can code is tractable; proving they can
   manage or sell is much harder. Scope discipline is essential.

## 18. Honest risks

1. **"Modern" is a framing argument, not a fact.** The category is old; the claim is that the
   *problem* is new. If that stops being believable, the thesis weakens.
2. **The market has 8–10 real players** (Disco, Teachfloor, Circle, Skool, Heartbeat, EducateMe,
   Mighty Networks, Maven). None does verification, but they have funding, teams and head starts.
3. **Creator-side churn is high and creators are price sensitive.** The corporate side has better
   economics and slower sales.
4. **Trustpilot evidence is a biased sample.** Angry customers self-select. Directional only.
5. **Capacity.** ~2 hrs/day, and **the job hunt stays priority #1** per `context/priorities.md`. This
   runs in the 8pm `project` block and at weekends. It does not touch DSA or machine-coding time.
6. **Honest benchmark:** median time to $10K MRR for bootstrapped SaaS is **12–18 months**, and only
   ~6% ever clear it. Plan for the long version.
7. **AI cost is the one variable that can go wrong fast.** §10 must be built in Phase 2, not later.

## 19. Verification (how each phase is proven done)

- **Phase 0:** a written decision with real numbers in `decisions/log.md`. No numbers, no GO
- **Phase 1:** `docker compose up` from a clean clone works in one command; the tenant-isolation test passes
- **Phase 2:** a real person learns a real skill end to end, and the record matches reality when
  checked by hand
- **Phase 3:** a clean-browser signup reaches payment with zero human contact; the free tool is
  indexed (use `/gsc-onboard`, then `/site-report` for the funnel)
- **Ongoing:** verify production over the wire before claiming anything shipped, never from a status
  file. Both of Kesri's P0 problems were invisible to every file in its repo
