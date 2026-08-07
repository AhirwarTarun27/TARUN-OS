# Phase 0: Does personal AI substitute for the free front door?

Researched 2026-08-03. Evidence gathering, not reasoning.

---

## Verdict

**YES — the free front door survives personal AI as a substitute. But a different actor already fires the kill rule, and that finding is more dangerous than the objection under test.**

The strongest single piece of evidence: a normalised, same-subreddit, same-quarter measurement of r/AWSCertifications across three years. In Q2 of each year, posts mentioning ChatGPT went 2.1% → 7.5% → 4.8% of exam-related posts (2024 → 2025 → 2026), while posts mentioning Tutorials Dojo went 11.8% → 10.9% → **14.0%**, an all-time high. AI mentions **peaked in 2025 and fell by more than a third by 2026**; the paid practice-exam incumbent went up in the same window, in the same subreddit, against a subreddit whose overall volume fell 17%. Sub-volume decline cannot explain two opposite directions. Substitution is not happening; it was tried and it partially receded.

**The dangerous finding:** Microsoft already gives away, free and with unlimited retakes, per-exam Practice Assessments across 48 certifications, authored by the same team that writes the exams, with a score report, a per-domain performance breakdown, and a persistent history of your previous attempts. That is a measurement-shaped free front door, from a giant, for free. It does not do spaced re-delivery of wrong answers, it does not gate on an unaided attempt, and its record is not third-party-portable — but it fires the governing rule far harder than Claude Pro does. See §1c.

---

## 1. Is the practice-exam market actually being substituted by AI right now?

**Finding: No. The evidence points the other way. AI interest peaked mid-2025 and has declined since, while the incumbents grew.**

### 1a. Reddit mention time series (primary data, collected via the Reddit API and the Arctic Shift archive)

Posts per quarter mentioning "chatgpt", by subreddit. 2026-Q3 is one month partial.

| Quarter | r/AWSCertifications | r/CompTIA | r/cissp |
|---|---|---|---|
| 2024-Q2 | 12 | 52 | 9 |
| 2024-Q4 | 31 | 72 | 40 |
| **2025-Q2 (peak)** | **61** | **133** | **53** |
| 2025-Q4 | 42 | 70 | 43 |
| 2026-Q1 | 40 | 61 | 33 |
| 2026-Q2 | 32 | 37 | 29 |

Change from the 2025-Q2 peak to 2026-Q2: AWS **-48%**, CompTIA **-72%**, CISSP **-45%**.

Same subreddit, same query method, posts mentioning "tutorials dojo":

| Quarter | r/AWSCertifications |
|---|---|
| 2024-Q2 | 66 |
| 2025-Q2 | 88 |
| 2026-Q1 | 105 (all-time high) |
| 2026-Q2 | 94 |

**Normalised control.** Counting all posts containing "exam" as a volume proxy, in Q2 of each year:

| Q2 of | posts w/ "exam" | chatgpt | share | tutorials dojo | share |
|---|---|---|---|---|---|
| 2024 | 559 | 12 | 2.1% | 66 | 11.8% |
| 2025 | 808 | 61 | 7.5% | 88 | 10.9% |
| 2026 | 673 | 32 | **4.8%** | 94 | **14.0%** |

- Subreddit volume fell 17% from 2025 to 2026.
- ChatGPT mentions fell 48% in absolute terms and 36% in share.
- Tutorials Dojo mentions **rose** 7% in absolute terms and 28% in share, against declining volume.

This is the load-bearing evidence in this document. Both directions cannot be a volume artefact.

### 1b. Incumbent traffic (Similarweb, June 2026 data)

| Site | Visits (3mo) | MoM | Global rank | Note |
|---|---|---|---|---|
| [tutorialsdojo.com](https://www.similarweb.com/website/tutorialsdojo.com/) | 594.1K | -3.55% | 77,513 (improved from 78,240) | roughly flat |
| [examcompass.com](https://www.similarweb.com/website/examcompass.com/) | 397.3K | **+4.45%** | 75,986 | free question bank, AdSense-monetised, 10.0 pages/visit, 5m35s |
| [professormesser.com](https://www.similarweb.com/website/professormesser.com/) | n/a | **+10.99%** | 67,526 | free front door, growing |
| [crucialexams.com](https://www.similarweb.com/website/crucialexams.com/) | 89.3K | **+6.78%** | 285,512 | 7.05 pages/visit, 4m54s |
| [examtopics.com](https://www.similarweb.com/website/examtopics.com/) | n/a | -5.99% | 46,365 | |
| [whizlabs.com](https://www.similarweb.com/website/whizlabs.com/) | 264.8K | **-15.48%** | 170,102 (worsened from 148,734) | the one clear decliner |

Whizlabs is genuinely shrinking. Everything else is flat or growing. Could not establish whether Whizlabs' decline is AI-attributable or brand-specific.

### 1c. The competitors that ARE giving it away free are not AI subscriptions — they are the certification vendors

- **[Microsoft Practice Assessments](https://learn.microsoft.com/en-us/credentials/certifications/practice-assessments-for-microsoft-certifications)** — free, unlimited attempts, **48 certifications** listed as of 2026-07-31. Microsoft's own words: "Created by the same team that develops our certification exams"; "Receive a score report that provides the answer, rationale, and links to additional information for every question"; "View your score report with a breakdown of your performance"; "view results from previous attempts on the Certification/Exam details page." Footer: "Practice Assessments are authored with assistance from AI."
- **[AWS certification prep](https://aws.amazon.com/certification/certification-prep/)** — free 20-question Official Practice Question Sets per exam; the full Official Practice Exam with a scaled readiness score sits behind Skill Builder at $29/mo.
- **[Tutorials Dojo](https://portal.tutorialsdojo.com/product-category/free/)** — **212 free products**, mostly free practice-exam samplers, spanning AWS, Azure, GCP, GitHub, Kubernetes, and Anthropic's Claude certifications.

The free practice-question front door for IT certification is not empty and it is not being eaten by AI. It is **crowded by well-funded incumbents and by the exam vendors themselves.**

### 1d. AI-native cert-prep competitors have taken essentially zero share

| Site | Visits | Rank | Note |
|---|---|---|---|
| [studytech.ai](https://www.similarweb.com/website/studytech.ai/) | 25.5K / 3mo | 864,101 | +32.6% MoM off a tiny base |
| [certbase.io](https://www.similarweb.com/website/certbase.io/) | no measurable data | none | |
| [examcert.app](https://www.similarweb.com/website/examcert.app/) | 38.7K / mo | 886,446 | 1.52 pages/visit, **23-second** sessions — SEO traffic, not practice |

Against Tutorials Dojo at ~198K/mo with 3.90 pages/visit. Two years after AI became capable, AI-native cert prep has roughly 1/5th of one incumbent's traffic and no engagement.

### 1e. The category is expanding, not contracting

- **[Anthropic launched four proctored certifications on 2026-07-23](https://claude.com/blog/four-role-based-claude-certifications)**, administered by Pearson Professional Assessments. Anthropic's own words: "Every exam is proctored, meaning it is taken under supervision" and "test takers must validate their identity before beginning an exam." Badges issued via Credly.
- Committed certification volumes from that announcement: Accenture **50,000**, PwC **30,000**, Capgemini **20,000**, DXC **20,000**, UST **20,000**, Deloitte **15,000**, KPMG **15,000**, TCS/Cognizant/Infosys **10,000** each, EPAM **10,000+**, Ascendion its entire **8,000**-person engineering team before 2027. That is 200,000+ committed proctored exam seats.
- The AI company itself did not accept an AI-mediated self-report as its credential. It bought proctoring and identity verification.
- Tutorials Dojo shipped 2026 practice exams for the new AWS AIP-C01, SOA-C03, KCNA, and Anthropic's Claude certifications.
- CompTIA [raised prices again in May 2026](https://www.reddit.com/r/ITCareerQuestions/comments/1tlnxwa/) (479 upvotes of complaint).

### 1f. Does "just use ChatGPT instead" appear as a live recommendation?

Rarely, and it is contested when it does.

- The [r/AWSCertifications resource FAQ](https://www.reddit.com/r/AWSCertifications/comments/1nf3cab/frequently_asked_questions_on_this_subreddit/) — the subreddit's canonical, auto-posted resource index covering every AWS exam — recommends **zero AI study tools**. Its only two "AI" strings are the names of the AI Practitioner and Gen AI Developer exams.
- ["ToJo vs ChatGpt - Correct Answers"](https://www.reddit.com/r/AWSCertifications/comments/1ucn0s4/tojo_vs_chatgpt_correct_answers/) (2026-06-22). Top replies: "AWS documentation is always the best source of answers. GPT can sometimes produce errors." / "TD isn't infallible, but it's way, way, more reliable than a chat bot. There's a reason why 'AI Slop' is such a common term."
- On the [r/CompTIA ChatGPT complaint thread](https://www.reddit.com/r/CompTIA/comments/1s2e9oh/chatgpt_horrible_for_studying_and_making_your_own/), a commenter answers with a competitor rather than a defence of AI: "Why are you using AI? ... I used crucialexams, they don't violate CompTIA TOS and they're very good at explaining why your answers are wrong/correct."

---

## 2. Can a current frontier model produce calibrated practice questions?

**Finding: Mixed, and split by exam difficulty tier. Plausible questions, yes. Correctly distributed questions, no — and this is documented, not inferred.**

### 2a. Direct first-hand failure reports

- **[Claude + Practice Exam Qs](https://www.reddit.com/r/AWSCertifications/comments/1tfrgvu/claude_practice_exam_qs/)** (2026-05-17). The single most on-point thread found. The poster used **Claude Pro**, uploaded official AWS docs and study guides as context, and explicitly prompted it to mimic Tutorials Dojo / Neal Davis / Stephane Maarek style. Result: "most outputs still feel too generic, too short, very obviously wrong answers or unrealistic business scenarios." Top reply: "the quality of AI-generated exams is very questionable, only marginally better than stolen exam dumps."
- **[ChatGPT horrible for studying and making your own practice questions](https://www.reddit.com/r/CompTIA/comments/1s2e9oh/chatgpt_horrible_for_studying_and_making_your_own/)** (r/CompTIA, 2026-03-24, 51 pts). Reports information "down right incorrect ... VERY often incorrect", and question generation that "either generates just 10 questions and then repeated the same questions over and over, OR, it just generates a bunch of place holders."
- **[Settling a 4-way AI debate](https://www.reddit.com/r/AWSCertifications/comments/1ruas2v/settling_a_4way_ai_debate_aws_aifc01_practice/)** (2026-03-15, 31 pts). A single AIF-C01 question deadlocked Gemini, Grok, Claude and ChatGPT 3-to-1, each citing AWS documentation to defend its answer. The question itself was AI-generated (Gemini Quizzes). Humans in the thread resolved it. Top human comment (14 pts) reasoned it out correctly by elimination in three sentences.

### 2b. The calibration gap is a *distribution* gap, and it is stated explicitly

From **[5 AWS Certs in 1 Year](https://www.reddit.com/r/AWSCertifications/comments/1tq3wy7/5_aws_certs_in_1_year_everything_i_learned/)** (2026-05-28, 268 pts — the highest-rated study methodology post of the year):

> "In the actual exam you might see a pattern like 50% easy, 30% medium, and 20% difficult. But most practice sets are filled with 70–80% high-difficulty questions."

> "AI is useful but hallucinates on deep-dive topics."

Note what he used AI *for*. His shared prompt template is an explainer, not a generator: *"I got this question in a mock exam. I'll provide you the actual question, options, and the study material explanation. Your job is to tell me what I did wrong and teach me the related concepts."*

Even the calibrated vendors miss the distribution. This is the hardest part of the job and nobody, human or model, does it cleanly.

### 2c. Counter-evidence — do not dismiss this

- **Grounded generation works for foundational exams.** [Passed AIF-C01 in 4 days, no videos](https://www.reddit.com/r/AWSCertifications/comments/1v43pqf/passed_aws_certified_ai_practitioner_aifc01_in_4/) (2026-07-23, 205 pts): "Got topic-wise notes generated using Claude... practiced 50+ test questions, mixing Claude-generated questions with free resources." Scored 833/1000.
- On the CompTIA complaint thread, the **top reply (59 pts) blames the user, not the model**: "Your prompt is probably trash. You need to give it resources... PDFs, video transcripts, etc." A 42-pt reply gives a working recipe using the objectives PDF and Gemini.
- One commenter on the 268-pt thread: "The quizzes I was creating in **NotebookLM were more similar to the exam than the udemy ones**."
- Multiple r/CompTIA users report passing A+ Core 1 using Messer + objectives PDF + ChatGPT.

**Tier split, as best supported by the evidence:** foundational exams (AWS CLF/AIF, CompTIA A+ Core 1) are being passed on AI-generated questions today. Associate and Professional tiers are not, and the people at that tier say so.

### 2d. The strongest structural evidence on calibration comes from Google

[Gemini Study Notebooks](https://blog.google/innovation-and-ai/products/gemini-app/gemini-study-notebooks/) — free, global, adaptive, with diagnostic quizzes, gap-targeted lessons and a skill-based progress dashboard covering 100+ learning objectives. When Google needed it to be calibrated to a real external exam, it did **not** self-generate. Its SAT prep is "grounded in authoritative questions from **The Princeton Review**." JEE, NEET, ENEM, ACT and GRE were listed as coming.

Microsoft's free practice assessments are "authored with assistance from AI" — but authored by the exam team, not generated by a chatbot.

Both giants, with the best models in the world, buy or author the question bank. That is the clearest available signal that calibration against an external standard is not something the model does on its own.

---

## 3. What do certification candidates say they actually use?

**Finding: vendor practice banks are the study method. AI is a supplementary explainer. This is not close.**

Method: scanned the top ~500 posts of the past year (title + body) in each subreddit via the Reddit API and counted keyword presence.

**r/AWSCertifications (n=497 top posts, past year)**

| Resource | % of posts |
|---|---|
| "practice exam/test" | 50.9% |
| Stephane Maarek | 45.1% |
| Tutorials Dojo | 42.7% |
| Udemy | 32.2% |
| AWS Skill Builder | 12.9% |
| **ChatGPT** | **9.1%** |
| Gemini | 5.0% |
| **Claude** | **4.8%** |
| Neal Davis | 3.6% |
| Anki | 1.4% |
| Whizlabs | 0.8% |
| ExamTopics | 0.8% |

**r/CompTIA (n=498)** — Jason Dion 29.5%, Professor Messer 29.1%, "practice test" 33.9%, Udemy 11.0%, **ChatGPT 6.0%**, Claude 0.8%.

**r/cissp (n=499)** — "practice test/questions" 87.0%, LearnZapp/QE 50.7%, official study guide/Sybex 43.9%, Destination Cert 41.7%, Thor/Zerger 38.9%, **ChatGPT 16.0%**, Claude 6.8%.

**r/AzureCertification (n=498)** — Microsoft Learn 46.2%, "practice test" 37.8%, Udemy 20.1%, MeasureUp 12.9%, **ChatGPT 10.0%**.

### The stated role of AI, in candidates' own words

- [Passed AIF-C01 for free](https://www.reddit.com/r/AWSCertifications/comments/1uslbun/) (2026-07-10): "I most used Chatgpt to learn the concepts it gives u good foundational understanding but **the main drawback is it doesnt teach you everything it left out most concepts at first which i had to ask again (found the missing concepts in practice test and notes)**." The practice test is what revealed what the AI omitted.
- [I kept failing practice exams but still passed SAA-C03](https://www.reddit.com/r/AWSCertifications/comments/1s4f083/) (2026-03-26, 175 pts). The entire winning method is measurement plus wrong-answer review: scores 58/57/61 → 75/72/61, "I reviewed every question I failed, every question I guessed, even the ones I got correct but was not fully sure about." AI appears once, as a garnish: "A few extra questions using ChatGPT and Claude."
- [MLA-C01 pass with a full AI agent setup](https://www.reddit.com/r/AWSCertifications/comments/1t08c07/) (2026-04-30). The most AI-native study workflow found — a dedicated "AWS-MLA AI helper" repo with agents.md/memory.md/progress.md, using Codex, Claude and Gemini. **The mock exams are still Maarek's and Tutorials Dojo's.** The AI layer sits on top of a purchased measurement layer.

The dominant reported pattern across all four communities: **AI explains, the vendor bank measures.**

---

## 4. How large is the population that would self-direct with AI at all?

**Finding: small, and it appears to be shrinking as a share, not growing. The "possible vs done" gap is real but I could not verify the specific 74%/6% figure.**

### Verified

- **[How People Use ChatGPT](https://www.nber.org/system/files/working_papers/w34255/w34255.pdf)** (Chatterji, Cunningham, Deming, Hitzig, Ong, Shan, Wadman — NBER working paper w34255, OpenAI Economic Research). Tutoring/teaching accounts for **10.2% of conversations**. Not "structured self-directed study programme" — just any tutoring-shaped message.
- **[Anthropic Economic Index, March 2026](https://www.anthropic.com/research/economic-index-march-2026-report)**: "Coursework fell from **19% to 12%** of conversations" between November 2025 and February 2026 on Claude.ai; personal use rose 35% → 42%. Anthropic itself notes some of this is winter academic calendars. Even so, the structured-study share of the flagship $20/mo product **declined** over that window.
- **MOOC completion**: 0.7%–52.1% range, **median 12.6%** ([Open Praxis, 2024](https://openpraxis.org/articles/10.55982/openpraxis.16.3.606)); 5–12% average across Coursera/edX/FutureLearn/Udemy in a 2022 meta-analysis. This is the historical base rate for "an adult with free access to structured material actually finishing it."
- **Paid AI subscription penetration**: free-to-paid conversion of roughly **5–6%** of ChatGPT users. Sources are secondary market-stat aggregators ([Backlinko](https://backlinko.com/chatgpt-stats), [Business of Apps](https://www.businessofapps.com/data/chatgpt-statistics/)) — treat as indicative, not primary.

### The intention-vs-action gap for orgs

- The **74%** figure is real ([CIO, 2025](https://www.cio.com/article/3542980/74-of-workers-suggest-employers-to-blame-for-their-ai-skills-gap.html)): 74% of organisations reported plans to upskill or retrain in response to AI.
- **I could not verify the "6% actually doing it" companion figure.** What I found instead, from 2026 surveys: only **26%** of organisations offer formal upskilling programmes (down from 35% a year earlier), and only **33%** of workers report having participated in employer AI training in the past six months, against **55%** who regularly use AI.

### The evidence most relevant to gating on an unaided attempt

Two independent studies now document that AI-assisted study inflates unproctored performance and degrades proctored performance.

- **[The generative AI learning penalty: Evidence from Chinese secondary education](https://www.psychologytoday.com/us/blog/the-power-of-experience/202606/a-study-of-26000-students-shows-the-ai-learning-trap)** (Strömberg, Lei & Wu, CEPR Discussion Paper No. DP21577, 2026). 26,811 students, 30 months. Homework scores **+18%**, completion time **-30%**, closed-book exam scores **-20% within six months**, entrance exam scores **-18% to -24%**. ~80% of AI users showed the pattern. The best students were the most vulnerable.
- **[Faster Completion, Less Learning](https://arxiv.org/abs/2605.21629)** (Rismanchian, Uzun, Matayoshi, Cosyn, Kurd-Misto; arXiv 2605.21629, May–July 2026). 3.2 million ALEKS interactions over a ten-year panel. On randomly assigned **proctored** retention items: **-25% cumulative decline in odds of a correct response**. Non-proctored assessment showed the **opposite sign**. The authors call it "cognitive surrender."

The gap between what an AI-assisted learner *appears* to know and what they can do unaided is now measured, in two independent datasets, in the 20–25% range. That is the empirical case for both the unaided-attempt gate and the org-facing product.

---

## What I could not establish

- **Revenue trajectories for any incumbent.** Tutorials Dojo and Neal Davis are private and publish nothing. Whizlabs revenue figures from Tracxn / Growjo / Owler disagree by a factor of 2.5 ($52.8M vs ₹18Cr) and are unusable. Traffic is the only reliable proxy here.
- **Whether Whizlabs' 15% decline is AI-driven** or brand-specific decay. It was the weakest brand in the comparison set before AI existed. Could not separate the causes.
- **Whether the r/AWSCertifications 2026 volume decline (-17% YoY)** is AI substitution, a softer tech job market, cert-fatigue, or Reddit-wide traffic decline. Cannot attribute.
- **The "6% actually doing it" figure.** Found the 74% but not the 6%. Do not cite it as verified.
- **Udemy seller trajectory.** Udemy blocks automated access (403). Could not get Stephane Maarek's or Neal Davis's enrolment counts or launch cadence.
- **Google Trends data for "aws certification".** Rate-limited (429), no fallback found.
- **Whether anyone has actually launched, and succeeded with, a spaced-repetition-of-wrong-answers cert product.** Found no incumbent doing exactly this shape. Absence of evidence, not evidence of absence — I did not exhaustively enumerate the category.
- **Comment-level sentiment over time.** Reddit exposes no comment search API. All time-series work here is post-level only.
- **The paid side.** I only tested the free front door, as scoped. No evidence gathered on whether organisations will buy the readiness record. The Anthropic/Accenture data in §1e is suggestive but is about proctored exams, not about a readiness dashboard.

---

## What would change this verdict

**Would flip it to NO (front door does not survive):**

1. **Microsoft's model spreading to AWS and CompTIA.** If AWS moves its Official Practice Exams from $29/mo Skill Builder into the free tier with a per-domain readiness score, or CompTIA makes CertMaster Practice free, the free measurement front door is fully occupied by giants. Microsoft has already done it for 48 exams. **Watch this, not ChatGPT.**
2. **Gemini Study Notebooks adding IT certification tracks.** Google is already licensing authoritative external banks (Princeton Review for SAT) and listed JEE/NEET/ENEM/ACT/GRE as next. If AWS/Azure/CompTIA certifications appear on that list with a licensed bank behind them, a giant is giving away exactly this product free, with a progress dashboard, at zero acquisition cost.
3. **The Reddit trend reversing.** If 2026-Q4 and 2027-Q1 show ChatGPT mention share climbing back above the 7.5% 2025 peak while Tutorials Dojo share falls, the peak-and-reverse reading is wrong and this was a lull, not a ceiling. Re-run the §1a query — the method is reproducible in about ten minutes.
4. **Frontier models solving the difficulty distribution.** If first-hand reports at the Associate/Professional tier start saying AI-generated sets match the real exam's easy/medium/hard ratio, §2 collapses. Today, even Google buys the bank.

**Would strengthen the YES:**

1. Whizlabs' decline turning out to predate ChatGPT.
2. More vendors following Anthropic into proctored, identity-verified, org-scale certification. Every proctored seat is a candidate who needs measurement, not teaching.
3. A third study replicating the 20–25% proctored/unproctored gap.

**The honest reframing of the risk:** the objection as posed ("a $20/mo AI subscription substitutes for the front door") is not supported by the evidence and looks like it peaked in 2025. The objection you should actually be worried about is that **the free measurement front door is already crowded** — by Microsoft for free, by AWS partially for free, by Tutorials Dojo's 212 free samplers, and by ExamCompass and Professor Messer and Crucial Exams, all of which are *growing* in 2026. That is a distribution problem, not a substitution problem, and it is not the question this document was asked to answer.
