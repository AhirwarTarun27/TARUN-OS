# SERP beatability — learning / assessment / practice tool queries

Research for issue #6 (part of #1). Answers the four questions in that ticket against live SERPs.
Written 2026-08-01. All observations made on 2026-08-01 unless stated.

**Scope note:** this product carries **no advertising at any tier** (`capability-platform.md` §9). Nothing
here is evaluated on CPC, RPM, ad-block exposure or session depth. SEO is assessed purely as an
acquisition channel into a free front-door tool that must convert to trials.

**Post-dating context applied:** issue #2 resolved after this ticket was written. The
**accumulation test** (six hard gates) killed *curriculum-builder* and *skills-matrix-builder*.
This research therefore weights effort toward the surviving candidates — **spaced-repetition
practice (PASS)** and **quiz / practice-set builder (CONDITIONAL, only if it includes the taking)** —
and treats "skills matrix template", "competency framework template" and "training plan builder"
as low-priority confirmation only.

---

## 0. Verdicts, up front

| # | Question | Verdict |
|---|---|---|
| 1 | Who holds the top 10? | **Split by audience.** Consumer/student *maker* and *practice* queries are held ~100% by real interactive tools, and #1 is repeatedly a **small single-purpose site**, not a giant. Developer practice queries are also 100% tools but held by LeetCode / HackerRank / W3Schools / Codewars. Corporate L&D queries are held by **articles, listicles, glossaries, template downloads and vendor pages — not tools.** §12's "tools win" bet is **true on the consumer/student side, format-correct-but-authority-blocked on the developer side, and false on the L&D side.** |
| 2 | Do AI Overviews fire? | **Depends entirely on query shape, and the split is clean.** `[thing] maker / generator / test maker`: **0 / 8**. Developer practice queries: **0 / 7**. Corporate L&D queries: **14 / 14**. Informational/question-shaped: **5 / 5**. **BUT** `spaced repetition app` — the headline query of the one *passing* candidate — **fires an AI Overview in both observations**, and its top 10 is roughly half listicles. §12's "under 3%" figure transfers to the *maker/generator* shape and **does not transfer to the surviving candidate's own front-door query.** |
| 3 | Are the §8 incumbents on tool queries? | **§12's assertion CONFIRMED.** Zero appearances of Disco, Teachfloor, Circle, Skool, Heartbeat, EducateMe, Thinkific, Kajabi, Docebo or TalentLMS across **17 tool-shaped SERPs**. They appear only on content/commercial SERPs (blogs, glossaries, "X alternatives", category pages) — and **every one of those SERPs carries an AI Overview.** The "dying playbook" claim is now measurable, not rhetorical. |
| 4 | Is a giant already giving the free tool away? | **YES — and it is fatal for the quiz / practice-set candidate.** Google **NotebookLM / "Gemini Notebook"** generates flashcards *and* quizzes from the user's own material, free, explains wrong answers, and **since 20 March 2026 saves and loads progress across sessions** with Got it / Missed it marking and "practise only the cards you missed". That is generation **+ taking + a persisted per-person attempt record** — accumulation-test gates 1, 2 and 3 — shipped free by Google five months ago. **Spaced repetition survives, narrowly:** Google's first-party docs describe mastery tracking but **no multi-day interval scheduling**. That is the whole remaining gap, and it is one release wide. |

**Overall:** this research does **not** produce a GO for the quiz/practice-set front door. It leaves
spaced repetition alive on a thin, shrinking margin, and it surfaces one genuinely promising new
candidate (**certification exam practice**). Per §16, an honest kill is a valid outcome; the quiz
builder should be killed.

---

## 1. Method, and what it can and cannot support

**How the SERPs were read.** Live Google, via Playwright (the repo's standing pre-approved MCP
exception), URL `google.com/search?q=<query>&gl=us&hl=en`, unauthenticated automated Chrome.
Organic results read from `#search a h3`; AI Overview presence detected by matching `AI Overview` in
rendered `document.body.innerText`.

**The detection method was validated before use, not assumed:**

1. **Positive control.** `what is spaced repetition` → AI Overview present, block text captured
   verbatim. So the detector *can* see an AIO when one exists.
2. **False-negative trap found and closed.** One pass returned `aiOverview: false` for four queries
   with body length ~340 chars and **zero organic results** — Google rate-limiting, not a real SERP.
   Every reading in this document is from a page that **rendered ≥7 organic results and >2,000 chars**.
   Non-rendering reads were discarded, not counted as "no AIO".
3. **Reproducibility.** Five queries were observed twice, hours apart, with longer waits.
   **5 / 5 reproduced identically** (`quiz maker` no-AIO twice; `flashcard maker` no-AIO twice;
   `spaced repetition app` AIO twice; `practice test maker` no-AIO twice; `employee training quiz`
   AIO twice).

**Cross-check.** A parallel sweep was run through DuckDuckGo's HTML endpoint (Bing-derived index) for
the core queries. It produced the same *character* of result — tool pages, not articles — with
different ordering. Where the two disagree, the Google reading is the one reported.

**Limits you should hold this to:**

- Google refused the first automated request (HTTP 429 / `/sorry`) and **Startpage was captcha-walled**,
  so a Google-proxy cross-check was not possible.
- Requests carried `gl=us&hl=en` but originated from an **India-geolocated IP**. Location
  personalisation is reduced, not eliminated. A few results leaked local variants
  (`adobe.com/in/…`, `hl=en_IN` Play Store links).
- **One day of observation, two passes.** AIO presence is known to fluctuate over weeks. Stability
  beyond a single day is **unverified**.
- Absence of an incumbent from a top-10 I read is **not** proof it ranks nowhere. I tested 46
  queries, not the category.

---

## 2. Question 1 — who actually holds the top 10

### 2a. Consumer / student *maker* and *practice* queries — tools win, and #1 is often small

Google, `gl=us&hl=en`, 2026-08-01. "Tool" = the ranking page is itself an interactive tool.

| Query | AIO | Top-10 character | #1 |
|---|---|---|---|
| `quiz maker` | No (2/2) | **9/9 interactive tools.** Zero articles | **quiz-maker.com** (small, exact-match domain) |
| `quiz generator` | No | **10/10 tools** | smallpdf.com |
| `flashcard maker` | No (2/2) | **10/10 tools** | **revisely.com** (small) |
| `free flashcard maker` | No | 9 tools + 1 Reddit | genially.com |
| `practice test maker` | No (2/2) | 9 tools + 1 Reddit | quizlet.com |
| `online test maker` | No | **10/10 tools** (PAA present) | **onlinetestmaker.net** (small, EMD) |
| `study tool` | No | 9 tools + 1 Reddit | studytools.pro |
| `make flashcards from pdf` | **Yes** | 7 tools + 1 Reddit | remnote.com |
| `flashcard app` | **Yes** | 8 tools + 1 listicle | quizlet.com |
| `spaced repetition app` | **Yes (2/2)** | **~half listicles** — laxuai, revu.co.in, studley blogs at 5/7/8 | Play Store listing |
| `free quiz maker for teachers` | **Yes** | 7 tools + Reddit + 1 listicle | canva.com |
| `best quiz maker` | **Yes** | **listicles + Reddit**, tools pushed down | emailtooltester.com |
| `anki alternative` | **Yes** | **100% listicles / comparison pages.** No tool ranks | remnote.com blog |

**The single most encouraging finding in this research:** on `quiz maker`, `flashcard maker` and
`online test maker`, position #1 is a **small, thin, single-purpose site** — not Canva, not Quizlet,
not Google. Canva, Adobe, Typeform and Jotform are present but sit at 3-9. Small recent AI tool sites
(mindgrasp.ai, revisely, studley.ai, jungleai, quizgecko, notegpt.io) hold multiple top-10 slots.
**These SERPs are demonstrably enterable by a new well-built tool.**

**The single most discouraging finding:** the moment the query shape moves from *"make me one"*
(`maker`, `generator`) to *"which one should I use"* (`app`, `best`, `alternative`), the SERP flips to
listicles **and** an AI Overview appears. `spaced repetition app` — the front-door query for the one
candidate that **passed** all six gates — is on the wrong side of that line.

### 2b. Developer / technical practice queries — right format, wrong opponents

| Query | AIO | Top-10 character | Who holds it |
|---|---|---|---|
| `sql practice questions` | No | 7 tools + Reddit + YouTube | LeetCode, HackerRank, DataLemur, W3Schools, StrataScratch |
| `coding practice problems` | No | 8 tools + 1 Reddit | CodeChef, LeetCode, Codewars, W3Schools, CodingBat, edabit |
| `javascript quiz` | No | **9 interactive quizzes** + 1 Reddit | W3Schools #1, then **many tiny indie sites** (javascriptquiz.com, jsisweird.com, quiz.typeofnan.dev) |
| `regex practice` | No | **8/8 tools** | regexone, regexr, regex101, HackerRank |
| `typing test` | No | **8/8 tools** | typing.com, typingtest.com, monkeytype |
| `aws certification practice exam free` | No | **8/8 practice tools / question banks** | aws.amazon.com prep page, then small banks |
| `system design interview practice` | No | Mixed: tool #1, then Reddit/blogs/courses | hellointerview.com |
| `spaced repetition for programmers` | **Yes** | Tool #1 + tool #2, then HN / Reddit / listicle | **syntaxcache.com**, **executeprogram.com** |
| `technical skills assessment tool` | **Yes** | **Listicles + enterprise vendors** (a B2B article SERP) | recruiterslineup.com listicle |
| `mock interview practice free` | **Yes** | Mostly tools, **funded AI incumbents** | freemockinterview.com, Pramp, interviewing.io, FinalRound |

**Read:** §12's format bet is *validated* here — practice tools, not articles, hold these SERPs.
But the holders are among the strongest domains on the technical web. `javascript quiz` is the notable
exception: tiny indie quiz sites rank throughout, so a *narrow* technical drill query is enterable
even though the category head is not.

**Direct competitive hit:** `spaced repetition for programmers` returns **SyntaxCache ("Spaced
Repetition for Developers")** at #1 and **Execute Program** at #2. Someone is already selling this
exact product to the exact audience the map holds as an open decision.

### 2c. Corporate L&D queries — the "tools win" bet is simply false here

| Query | AIO | Top-10 character |
|---|---|---|
| `employee training quiz` | **Yes (2/2)** | Mixed: quiz tools + templates + how-to blog |
| `training assessment tool` | **Yes** | Mostly **articles / listicles**, one NIH paper, 2 tools |
| `employee knowledge check` | **Yes** | **~100% articles and glossaries.** Zero real tools |
| `onboarding quiz template` | **Yes** | **Template downloads** (Genially, SurveyMonkey, Jotform, Flipsnack) |
| `compliance training quiz maker` | **Yes** | Tools + templates + a Valamis listicle |
| `employee skills assessment software` | **Yes** | **Listicles + Gartner + enterprise vendors** |
| `safety quiz for employees` | **Yes** | **Free content quizzes** — OSHA.gov, mysafetysign, university pages |
| `skills gap analysis` | **Yes** | Articles; **TalentLMS #1** (blog + free template); **Lepaya free tool #2** |
| `training needs analysis` | **Yes** | **100% articles / HR glossaries** |
| `how to create an employee training program` | **Yes** | **100% articles** |
| `employee training software` | **Yes** | **TalentLMS #1**, then listicles |
| `best lms for small business` | **Yes** | Listicles; **TalentLMS #4** |
| `cohort based course platform` | **Yes** | Listicles; **Maven #4**, **Disco #7** (topic page) |
| `learning management system` | **Yes** | Moodle + definitions + listicles |

**14 / 14 fired an AI Overview.** The L&D SERP is a *content* SERP wearing a software costume. A free
tool has almost nothing to rank *for* here — the queries that exist are informational, and Google
answers them itself.

One honest counter-example: **Lepaya ranks #2 on `skills gap analysis` with a free interactive tool**
("get results in < 3 minutes"). So the free-tool play is *possible* in L&D — but it is being executed
inside an AIO-covered SERP, which caps the upside.

### 2d. The two dead candidates — confirmed dead, plus one query family that does not exist

| Query | AIO | What actually ranks |
|---|---|---|
| `skills matrix template` | No | **Template downloads + HR content**: AG5, a Smartsheet `.xlsx`, Figma template, Personio, AIHR, Growthspace |
| `competency framework template` | No | **Template downloads + HR content**: Deel, Creately, Craft, IIA, Zoom, Leapsome |
| `training plan builder` | No | **A FITNESS SERP.** Strongr Fastr, Canva workout planners, Pumpd, TrainerRoad, Fitbod, Jefit, intervals.icu |

Two notes.

1. The SERPs for the two dead candidates are **document/template SERPs** — exactly what the
   accumulation test predicted from gate 3 ("fail = tools that output documents"). The gate and the
   SERP agree independently. That is a good sign for the gate.
2. **`training plan builder` is not an L&D query at all.** It is a gym query. Nothing in the top 10
   relates to workplace training. This query family should be struck from the ticket, not merely
   deprioritised.

### 2e. Domain strength — **unverified, and here is why**

I could not measure Domain Rating / Domain Authority for any ranking domain. Ahrefs, Semrush and Moz
all paywall the metric, and §12's own free demand-check stack (Keyword Planner, GSC, AlsoAsked,
Trends, Keyword Surfer) contains **no DR equivalent**. I am not estimating one.

What I can report is the **observable** proxy, which for a beatability question is arguably the more
useful signal: *what kind of site holds #1*. On `quiz maker`, `flashcard maker` and `online test maker`
it is a small single-purpose site. On `coding practice problems` and `sql practice questions` it is
LeetCode and HackerRank. That difference is the answer, and it did not require a DR number.

**Search volume and keyword difficulty are also unverified.** Keyword Planner requires an
authenticated Google Ads account and was not run. **§12's bar — "500+ monthly searches at KD under
30" — is therefore NOT tested by this document.** It remains open, and it is Phase 0 work.

---

## 3. Question 2 — AI Overviews, as actually observed

46 distinct Google queries, all rendered and verified. Tallied by shape:

| Query shape | AIO fired | Rate |
|---|---|---|
| `[thing] maker` / `generator` / `test maker` | 0 of 8 | **0%** |
| Developer practice (`sql practice`, `regex practice`, `typing test`, `aws … practice exam`, `coding practice problems`, `javascript quiz`, `system design interview practice`) | 0 of 7 | **0%** |
| Dead-candidate template queries | 0 of 3 | **0%** |
| `[thing] app` / `best [thing]` / `[thing] alternative` | 4 of 4 | **100%** |
| Informational / question-shaped | 5 of 5 | **100%** |
| **Corporate L&D (every shape, including `… quiz maker`)** | **14 of 14** | **100%** |
| Other (`study tool`, `make flashcards from pdf`, `mock interview practice free`, `spaced repetition for programmers`, `sales roleplay practice tool`, `technical skills assessment tool`, `free quiz maker for teachers`) | 5 of 7 | 71% |

**What this does to §12.** The "under 3% disruption for tools" claim **transfers cleanly to the
`maker`/`generator` query shape** — 0 of 8, twice-confirmed on the two biggest. That is real support
for the central bet, and it is the first time the map has evidence rather than a borrowed benchmark.

**What this does to the surviving candidate.** `spaced repetition app` fired an AI Overview in both
observations, and so did `flashcard app`, `anki alternative` and `best quiz maker`. The passing
candidate's natural head query is **AIO-covered and listicle-held**. If the spaced-repetition tool is
built, it must be acquired through `maker`-shaped and long-tail practice queries, **not** through
`spaced repetition app`.

**What this does to the L&D audience option.** 14/14. Every corporate query I tested — including the
tool-shaped `compliance training quiz maker` — carries an AI Overview. This is the strongest
single piece of evidence in the document, and it points one way: **the L&D side of the terminal
audience decision has no clean SEO front door.**

---

## 4. Question 3 — are the §8 incumbents on tool queries?

**Confirmed. They are not, and their content SERPs are AIO-covered.**

Across **17 tool-shaped SERPs** (§2a, §2b, §2d), the number of appearances by Disco, Teachfloor,
Circle, Skool, Heartbeat, EducateMe, Thinkific, Kajabi, Docebo and TalentLMS was **zero**.

Where they *do* appear, every instance is content or commercial:

| Incumbent | Where it ranks | Page type | AIO on that SERP |
|---|---|---|---|
| TalentLMS | `employee training software` **#1** | Solution/category page | Yes |
| TalentLMS | `skills gap analysis` **#1** | **Blog post + free template download** | Yes |
| TalentLMS | `best lms for small business` **#4** | Category landing page | Yes |
| Disco | `cohort based course platform` **#7** | **Glossary / "topics" content hub** | Yes |
| Maven | `cohort based course platform` **#4** | Homepage | Yes |
| Thinkific | ranks via `"Docebo alternatives"`, `"Kajabi alternatives"` blog posts | **Comparison content** | — |

**TalentLMS was also checked directly for a standalone free tool page and does not have one** — its
quiz/AI-question-generation features live inside the logged-in product, documented only in help-centre
and blog articles. That is the content playbook in its purest form: write *about* the tool, never ship
the tool as a public URL.

So §12's assertion survives contact with the data, and the "dying" half is now measurable: **every
incumbent SERP I observed carries an AI Overview**, while the tool SERPs they are absent from mostly
do not. They are competing exclusively on the disrupted side of the line.

**Caveat, stated plainly:** I tested 46 queries. Absence from those top-10s is not proof of absence
everywhere.

---

## 5. Question 4 — is a giant already giving this away free? (the fatal question)

### 5a. Google NotebookLM / "Gemini Notebook" — yes, and it now has carry-over

This is the finding that should change the map.

**Verified, first-party:**

- **Flashcards and Quizzes generated from the user's own uploaded sources**, with customisable count
  and difficulty (easy/medium/hard), an **Explain** button on wrong answers, grounded in the user's
  material. Launched to educators and students **2 September 2025**
  (Google Workspace Updates, 11 Sep 2025).
- **20 March 2026, Google Workspace Updates, verbatim:** *"Progress is now saved and loaded across
  sessions when using Flashcards and Quizzes in NotebookLM. Users can also now mark flashcards as
  'Got it' or 'Missed it,' shuffle the deck, and use a new results screen to rerun any cards they
  missed."* The same post states these are **available to all NotebookLM users regardless of
  subscription tier**.
- **Google's own help documentation:** *"Gemini Notebook will remember your progress, and you can
  pick up where you left off if you leave and return."* Users can mark Got it / Missed it, review
  results, retake, and practise **"Only cards you missed"**. Flashcards export to CSV.
- It **ranks #7 on Google for `study tool`** (`notebooklm.google/students`) — it is not just built,
  it is in the SERP.

**Reported but NOT first-party verified:** a free-tier cap of **10 flashcard sets + 10 quizzes per
day** (plus 50 chats, 3 audio/video overviews). Multiple third-party sources agree; Google's own help
page states no caps. Treat the exact number as unverified — but note that even if the cap is real,
10 sets/day is far beyond what a front-door tool's free user would consume.

**Run this against the accumulation test:**

| Gate | Does Google's free product already satisfy it? |
|---|---|
| 1. Recurrence | Yes — studying recurs |
| **2. Carry-over (the disqualifier)** | **Yes, since 20 Mar 2026.** Progress persists; visit #2 differs from visit #1 |
| 3. Same object, smaller scale | **Yes.** It produces a real attempt record for a real person — not a document |
| 4a. Person recurs across spaced sessions | **Partly.** It remembers and lets you rerun what you missed, but does **not** schedule across days |
| 5. Wall at the second person | N/A — Google has no team layer here |
| 6. Cheap at zero revenue | Google's problem, not ours |

**Verdict on the CONDITIONAL candidate — quiz / practice-set builder: FATAL under §13 rule 3.**
Issue #2 made it conditional on *"only if it includes the TAKING, not just the making."* Google gives
away the making, the taking, the explanation of wrong answers, **and now the record**. This is not
"a giant could build this". This is "a giant already gives this away free", shipped five months ago,
which the map itself calls fatal — the same rule that killed subscription analytics.

**Verdict on the PASS candidate — spaced-repetition practice tool: alive, but on one feature.**
The only thing Google's free study loop does *not* do is **schedule review across days at expanding
intervals**. Google's first-party docs describe mastery marking and "rerun what you missed" — session
mechanics, not an interval scheduler. Third-party analysis in April 2026 reaches the same conclusion
and calls interval scheduling the obvious next feature. That is the entire remaining moat of the free
front door, and it is one release wide.

### 5b. The rest of the giants — all present, all free

| Giant | What it gives away free | Verified |
|---|---|---|
| **OpenAI — ChatGPT Study Mode** | Quizzes you, generates practice questions, flashcard-style review, explains what you missed, Socratic step-through. **On the Free tier**, launched **29 July 2025** | TechCrunch 29 Jul 2025 + OpenAI help centre. OpenAI's own announcement page returned HTTP 403 |
| **Anki** | **Free and open source**, desktop on Windows/macOS/Linux, AnkiDroid free; **ships SM-2 and FSRS scheduling** — real spaced repetition, the category standard. Only the official iOS app is paid | apps.ankiweb.net, docs.ankiweb.net, github.com/ankitects/anki |
| **Canva** | Free AI quiz maker + free AI flashcard maker. **Ranks top-6 on both `quiz maker` and `flashcard maker`** | Observed in both SERPs |
| **Adobe (Acrobat)** | Free AI flashcard maker and quiz maker from PDFs. Ranks top-6 on both | Observed in both SERPs |
| **Google Forms / Microsoft Forms** | Free **self-grading** quizzes with answer keys, per-question feedback, instant scoring. Google Forms' support page ranks **#1 for `how to create a quiz for students`** | Observed; vendor how-to docs |
| **Quizlet** | Free set creation + basic flashcard review; ranks #1-2 on several head queries | Free/paid split (Learn mode daily caps, AI practice tests behind Plus) is **third-party sourced only** — `quizlet.com/upgrade` returned HTTP 403 |
| **Wayground (ex-Quizizz)** | Free quiz creation, live sessions, large teacher-made library (20 saved activities on free) | Third-party review; ranks top-4 on several quiz queries |

**On Anki specifically — a consistency problem the map has to face.** §14 killed spec-driven
development tooling with the reasoning *"GitHub Spec Kit is free, open source, 93K+ stars; giants give
it away."* Anki is the same shape: free, open source, cross-platform, the acknowledged standard, with
the best public scheduling algorithm built in. If Spec Kit was fatal, Anki deserves at minimum the
same scrutiny before the spaced-repetition candidate is treated as clear.

The honest counter is that Anki has no generation-from-source, hostile UX, and no org layer — real
gaps. But the gap that mattered (generation) is exactly what Google now does free, and the gap Anki
fills (scheduling) is exactly what Google is missing. **Between them, Google and Anki cover the entire
free front door. The unoccupied space is the seam between the two, not a room.**

### 5c. What is genuinely NOT given away free

To be fair to the map, three things remain unoccupied by any giant found here:

1. **The unaided gate** (§5) — nobody free makes you prove it *without help* before advancing.
2. **The second person** — no free tool gives a manager an honest cross-person capability picture.
   Google's study loop is resolutely single-player. Gate 5's wall is intact.
3. **Verified rather than self-rated ability** — Google marks what *you say* you got right.

All three sit on the **paid** side of the map's own design. None of them is a *front door*. That is
the problem: the map needs a free tool that ranks, and the ranking free tool is the part Google
already ships.

---

## 6. New candidates that might pass the accumulation test

Requested as a secondary output, because issue #7's shortlist has one clean candidate. Each was
SERP-checked live. **None of these has been run through the six gates properly — that is issue #7's
job.** These are flags, not verdicts.

### Flag 1 — Certification exam practice — **strongest new candidate found**

- **Queries:** `aws certification practice exam free`, and the family: `pmp practice exam`,
  `comptia security+ practice test`, `azure az-104 practice questions`.
- **SERP character (verified):** `aws certification practice exam free` — **no AI Overview**,
  **8/8 practice tools / question banks**. #1 is `aws.amazon.com/certification/certification-prep/`,
  then **small independent banks**: digitalcloud.training, examtopics.com, cloudcertprep.io,
  kananinirav.com, w3schools. **Enterable.**
- **Why it may pass the gates:** recurs intensely over a bounded 4-12 week study window — and gate 4
  explicitly blesses a bounded window ("90-day onboarding qualifies"). Carry-over is the whole point:
  which domains you keep failing. The object is an attempt record, not a document. Org level is real
  and funded — companies push staff through cloud/security certifications on a budget line, annually.
  The free loop can be fully deterministic: fixed question bank, self-rated, zero recurring AI.
- **Giant risk (checked):** AWS gives away only **20 official sample questions** per certification on
  Skill Builder; full official practice exams sit behind the paid subscription. **The giant has
  deliberately left the front door open here.**
- **Risk:** paid incumbents are strong (Udemy question banks, Whizlabs, Tutorials Dojo), and question
  banks raise a content-licensing question the map has not considered.

### Flag 2 — Narrow technical syntax drills

- **Queries:** `regex practice` (no AIO, 8/8 tools), `javascript quiz` (no AIO, 9 interactive quizzes,
  **tiny indie sites throughout the top 10**).
- **Read:** the cleanest, most enterable tool SERPs in the entire study. Incumbents are old static
  sites. But org-level recurrence is weak — nobody buys a team seat for regex drilling.
  **Front-door material, not a business.** Possibly the right *free tool* for a technical-audience
  version of the product.

### Flag 3 — Typing / keyboard skill practice

- **Query:** `typing test` — no AIO, 8/8 tools.
- Carry-over is genuine (WPM history over time) and recurrence is daily. But typing.com,
  typingtest.com and monkeytype are entrenched and beloved, and the org buyer is thin outside BPO
  hiring. **Weak.**

### Flag 4 — Recurring safety / compliance knowledge checks

- **Query:** `safety quiz for employees` — **AIO fires**; top 10 is **free content** owned by
  OSHA.gov, mysafetysign, insurers and universities.
- **Org recurrence is the strongest of any candidate here** — statutory, scheduled, budgeted, and it
  repeats forever, which is exactly gate 4's org half. But the free front door is already occupied by
  **free government content**, and the SERP is AIO-covered. **Org-strong, SEO-dead.**
  Worth reconsidering only if acquisition comes from somewhere other than search.

### Flag 5 — Explicitly flagged as *probably dead*

- **Mock interview practice** (`mock interview practice free`): AIO fires; interviewing.io, Pramp,
  FinalRound, plus many funded AI entrants. Matches §14's "AI *is* the product" graveyard pattern.
- **Sales-call roleplay** (`sales roleplay practice tool`): AIO fires; SERP is listicles plus funded
  vendors — Second Nature, Hyperbound, Mindtickle. Same pattern.
- **Spaced repetition for developers**: already occupied — **SyntaxCache #1, Execute Program #2** on
  `spaced repetition for programmers`. Not empty ground.

---

## 7. What this changes in `capability-platform.md`

Recommendations only — not applied, per the review-first instruction on this ticket.

1. **§12 candidate table — kill the quiz / practice-set builder.** It was CONDITIONAL on including
   the taking. Google now gives away making + taking + a persisted record, free, to everyone.
   §13 rule 3 says that is fatal. (§5a)
2. **§12 — replace the borrowed "under 3%" row with the measured split.** The number holds for
   `maker`/`generator` queries (0/8) and collapses for `app`/`best`/`alternative` (4/4) and corporate
   L&D (14/14). Cite what was observed, not the general benchmark.
3. **§12 — record that `spaced repetition app` is AIO-covered and listicle-held.** The passing
   candidate cannot use its own head term as the acquisition query. Long-tail and `maker`-shaped
   entry only.
4. **§8 / #9 — the audience decision has moved.** It was held as terminal, to be broken by data.
   This is data: the L&D side has **no un-disrupted tool SERP** (14/14 AIO, article-held), while the
   technical side has clean tool SERPs but entrenched holders. That does not decide it, but it stops
   being symmetric.
5. **§14 — add Anki to the absorption discussion** for consistency with the Spec Kit precedent, and
   record NotebookLM's 20 Mar 2026 progress-persistence release as the event that killed the quiz
   builder.
6. **Strike `training plan builder`** from every candidate and query list. It is a fitness query.
7. **§16 Phase 0 still owes the volume/difficulty gate.** Nothing here tests "500+ searches at KD<30".

---

## 8. Explicitly unverified

Listed so nothing in this document is mistaken for something it is not.

| Claim | Why unverified |
|---|---|
| Domain Rating / Authority of any ranking domain | Ahrefs / Semrush / Moz paywall it; §12's free stack has no equivalent. **Not estimated.** |
| Search volume and keyword difficulty for any query | Keyword Planner needs an authenticated Ads account; not run. §12's KD<30 / 500+ bar is untested. |
| NotebookLM free-tier caps (10 sets + 10 quizzes/day) | Third-party sources only; Google's help page states no caps |
| Quizlet's current free vs. Plus split | `quizlet.com/upgrade` → HTTP 403. Third-party blogs only |
| ChatGPT Study Mode free-tier availability | `openai.com/index/chatgpt-study-mode/` → HTTP 403. Rests on TechCrunch (29 Jul 2025) + OpenAI help-centre text via search |
| AIO stability over weeks | Two passes, one day. 5/5 reproduced, but that is same-day reproduction only |
| Full geo-neutrality | `gl=us&hl=en` sent from an India-geolocated IP; some local variants leaked into results |
| That the §8 incumbents rank for *no* tool query | 46 queries tested, not the category. Absence ≠ proof |
| Google-proxy cross-check of rankings | Startpage captcha-walled; Google's first automated request returned 429 |

---

## 9. Sources

All accessed **2026-08-01** unless noted.

**Live SERPs (primary observation).** Google `google.com/search?q=…&gl=us&hl=en` via Playwright,
46 distinct queries, all listed in §2 and §3, each verified rendered (≥7 organic results, >2,000
chars body text); 5 queries re-observed on a second pass. Cross-check sweep via
`https://html.duckduckgo.com/html/?q=…` (Bing-derived index).

**Google / NotebookLM — first party**
- https://workspaceupdates.googleblog.com/2026/03/new-ways-to-customize-and-interact-with-your-content-in-NotebookLM.html — announcement dated **20 March 2026**; progress saved across sessions, Got it / Missed it, results screen, rerun missed cards; all tiers
- https://workspaceupdates.googleblog.com/2025/09/flashcards-quizzes-reports-notebook-lm-google-education.html — dated **11 September 2025**, rollout from 2 September 2025; flashcards + quizzes for educators and students
- https://support.google.com/notebooklm/answer/16958963?hl=en — Generate Flashcards or Quizzes; *"Gemini Notebook will remember your progress…"*; "Only cards you missed"; CSV export; **no interval scheduling described**
- https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-app-quizzes-flashcards/
- https://notebooklm.google/students — observed ranking #7 for `study tool`

**OpenAI**
- https://techcrunch.com/2025/07/29/openai-launches-study-mode-in-chatgpt — **29 July 2025**; Free, Plus, Pro, Team
- https://help.openai.com/en/articles/11780217-chatgpt-study-mode-faq — HTTP 403 on direct fetch; content via search result text
- https://openai.com/index/chatgpt-study-mode/ — HTTP 403 on direct fetch

**Anki**
- https://apps.ankiweb.net/ — free desktop, open source, spaced-repetition scheduling
- https://docs.ankiweb.net/background.html and https://faqs.ankiweb.net/what-spaced-repetition-algorithm — SM-2 and FSRS
- https://github.com/ankitects/anki

**AWS**
- https://aws.amazon.com/certification/certification-prep/ — observed #1 for `aws certification practice exam free`
- https://skillbuilder.aws/ — official practice **question sets** (20 questions) free; full practice exams paid

**Incumbents (§8) — tool-page checks**
- https://www.talentlms.com/blog/tests-quizzes-talentlms/ and https://help.talentlms.com/ — quiz features documented in blog/help only; **no standalone free tool page found**
- https://www.talentlms.com/blog/skills-gap-analysis-template/ — observed #1 for `skills gap analysis`
- https://www.talentlms.com/solutions/employee-training-software — observed #1 for `employee training software`
- https://www.disco.co/topics/cohort-based-learning — observed #7 for `cohort based course platform`
- https://www.thinkific.com/blog/docebo-alternatives/ , https://www.thinkific.com/blog/kajabi-alternatives-free-paid/ — comparison-content playbook

**Third-party (used only where marked, and marked as such)**
- https://elephas.app/blog/notebooklm-daily-limit — NotebookLM free daily caps
- https://notebooklm-guide.com/notebooklm-quiz-flashcard-upgrade-2026-enhanced — April 2026 analysis; spaced repetition still absent
- https://flashrecall.app/blog/quizlet-free , https://learn.org/articles/quizlet-free-vs-paid — Quizlet free vs Plus
- https://www.lepaya.com/skills-gap-analysis — free L&D tool observed ranking #2

**Repo context**
- `research/capability-platform.md` §8, §9, §12, §13, §14, §16
- Issue #2 resolution (accumulation test, six gates, pre-screen table)
