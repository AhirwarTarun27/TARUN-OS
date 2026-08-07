# Phase 0 — Do the certifying bodies already give this away?

Research date: 2026-08-03. Falsifiable gate for the practice-exam drill product.
Decision rule under test: "a giant could build this" is NOT fatal; "a giant already gives this away free" IS fatal.

---

## Verdict

**The front door survives for cloud certification, but NOT uniformly, and Microsoft is a partial kill.** No body ships free *adaptive* practice with spaced resurfacing of wrong answers. But **Microsoft ships free, unlimited-retake, per-person-persisted practice assessments across ~48 exams, authored by the same team that writes the real exams, at zero cost behind a free Microsoft Learn login.** By the brief's own stated kill criterion — repeated practice plus a persisted per-person record — **Microsoft/Azure is dead as a target certification.** Do not build for AZ-104, AZ-900, SC-900, PL-300, or any Microsoft exam on the list. AWS survives cleanly: Official Practice Exams are explicitly "Not included" on the free account and sit behind a $29/mo or $449/yr Skill Builder subscription, with free-tier practice marked "Limited access". Google Cloud survives cleanly (a static Google Form of sample questions, no score persistence). Salesforce, ServiceNow, CompTIA and ISC2 all sell their official practice as a paid product, with CompTIA's CertMaster Practice being the only officially *adaptive* offering anywhere and it costs roughly $129-$199. CNCF/Kubernetes is a different problem: it is a hands-on performance exam, the killer.sh simulator ships bundled with the exam fee, and an MCQ drill is the wrong shape for it. HashiCorp is wide open (5 static sample questions, no product at all). **The single load-bearing prior observation — "AWS gives away only ~20 free sample questions" — is directionally correct and now verified first-party in stronger form: free tier gets "Limited access" to Exam Prep Practice and zero official practice exams.**

---

## Part A — per-body table

| Body | Free material | Paid material | Price | Does it adapt? | Persists per-person score? | Source |
| --- | --- | --- | --- | --- | --- | --- |
| **AWS** | Exam Prep Review (video) fully free. Exam Prep Practice = **"Limited access"**. Escape Room = demo only. Free account required. | Official Pretests and Practice Exams = **"Not included"** on free tier. Full Exam Prep Practice, SimuLearn, Escape Room. | Monthly **$29**; Annual **$449**; Team **$449/seat/yr**, 5-seat min | No first-party claim of adaptivity | No first-party claim of a persisted readiness score | [skillbuilder.aws/subscriptions](https://skillbuilder.aws/subscriptions) |
| **Microsoft (Azure)** | **Practice Assessments — free, ~48 exams, unlimited retakes, per-question rationale + links, score report by skill area, previous attempts viewable.** Free Microsoft Learn login. | MeasureUp practice tests for exams with no free assessment | Free tier = $0. MeasureUp priced separately | No first-party adaptivity claim (inferred: fixed pool, random draw) | **YES — "view results from previous attempts on the Certification/Exam details page"** | [MS Learn practice assessments](https://learn.microsoft.com/en-us/credentials/certifications/practice-assessments-for-microsoft-certifications), [FAQ](https://learn.microsoft.com/en-us/credentials/certifications/frequently-asked-questions) |
| **Google Cloud** | Sample questions via a **Google Form**, free, per certification. Familiarisation only. | None official found | $0 | No | No (Google Form, no cross-session record) | [cloud.google.com ACE cert page](https://cloud.google.com/learn/certification/cloud-engineer) |
| **Salesforce** | Trailhead modules, flashcards, cert-prep trailmixes. No free official practice exam. | Official practice tests on Trailhead Academy, per certification | ~**$20** per practice test (could not confirm first-party) | No evidence | Results shown on submission; cross-session persistence not established | [Trailhead Academy practice test](https://trailheadacademy.salesforce.com/certificate/exam-platform-admin-practice-test---Plat-Admn-201-PT) |
| **ServiceNow** | Free training content on ServiceNow University. No free official practice exam found. | Official practice tests **via MeasureUp partnership** | Paid, price not established first-party | No evidence | No evidence | [ServiceNow University](https://www.servicenow.com/university/training-and-certification.html) |
| **CompTIA** | Nothing meaningful free. Exam objectives are public. | **CertMaster Practice** — "Timed practice exams, objective quizzes, **exam objective mastery scores**", 10-20 hrs. Plus CertMaster Learn/Labs/Perform | CertMaster Practice ~**$129-$199** (third-party sourced; CompTIA does not publish price on the cert page) | **YES — CertMaster Practice is marketed as adaptive** (third-party sourced; the CompTIA product page does *not* use the word) | **YES — "exam objective mastery scores"** (first-party wording) | [CompTIA Security+](https://www.comptia.org/en-us/certifications/security/) |
| **ISC2** | Free official interactive **flash cards** per credential (CISSP, CCSP, SSCP, CC) | Official practice tests / self-paced training, sold separately | Flash cards $0; paid tiers not established first-party | No | No evidence for flash cards | [ISC2 flash cards](https://www.isc2.org/certifications/flash-cards) |
| **CNCF / Linux Foundation (CKA)** | Nothing free standalone | **killer.sh simulator bundled with every CKA/CKAD/CKS exam purchase** — 2 attempts, 36 hrs each, 17 scenarios per env, **same questions for every user and every attempt** | Included in the exam fee (not separately free) | No — explicitly static | Graded per attempt; no readiness ladder | [Linux Foundation announcement](https://training.linuxfoundation.org/blog/linux-foundation-kubernetes-certifications-now-include-exam-simulator/), [CNCF](https://www.cncf.io/announcements/2021/06/02/linux-foundation-kubernetes-certifications-now-include-exam-simulator/) |
| **HashiCorp** | **5 static sample questions** on the docs site. No login. Nothing else. | None found | $0 | No | No | [Terraform Associate 004 sample questions](https://developer.hashicorp.com/terraform/tutorials/certification-004/associate-questions-004) |

---

## Part A — narrative notes

### Microsoft — the kill
This is the finding that matters. Verified first-party, quoted:

- "Practice Assessments are available at no cost and **can be attempted as many times as desired**."
- "Created by **the same team that develops our certification exams**, Practice Assessments are updated in step with certifications."
- "Once you have completed an assessment, **view results from previous attempts** on the Certification/Exam details page."
- "Practice Assessments are available **for free to every learner** and can be taken as many times as you want. You will need to sign in to your Learn profile."

That is: free + unlimited repetition + a persisted per-person record + ground-truth authorship. Coverage is 48 exams as of 2026-07-31 including AZ-104, AZ-305, AZ-500, AZ-900, SC-100/200/300/900, PL-300, DP-600/700, MS-102, plus the whole GitHub GH-xxx line. Microsoft explicitly states it is still expanding: "Over the next few months, Microsoft will roll out free Practice Assessments for **additional exams**."

What Microsoft does **not** do: adapt, resurface your wrong answers on a spaced schedule, gate you on an unaided attempt, or compute a readiness verdict. The differentiator survives in theory. But the acquisition channel does not — you cannot win a free-tool SEO race against Microsoft's own domain offering the same thing for free on the exam's own detail page.

### AWS — the front door is open, verified
The subscription comparison table on skillbuilder.aws is unambiguous. Free account column:
- Exam Prep Review: **Included**
- Exam Prep Practice: **"Limited access"**
- AWS Escape Room: Exam Prep: **"Demo course only"**
- **AWS Certification Official Pretests and Practice Exams: "Not included"**

Paid unlock at $29/month. Note the annual price is **$449**, not the $299 figure that circulates in third-party blogs — the live page shows $449 annual and $449/seat team. AWS ran a time-limited free-premium promo for Cloud Practitioner and AI Practitioner exam prep that ended 2026-01-05; that is a promo, not a policy shift, and it targeted only the two entry-level certs.

No first-party language anywhere describes AWS practice content as adaptive or as maintaining a persisted readiness score.

### Google Cloud — wide open
Google's own certification pages link to a **Google Form** of sample questions. That is it. No score history, no retake ladder, no product. This is the weakest official offering of any body examined and the best target on that axis.

### CompTIA — the shape you want, but paid
CompTIA's own product copy for CertMaster Practice: "Timed practice exams, objective quizzes, **exam objective mastery scores**", "Confirm exam readiness and close gaps", 10-20 hours. That is close to the product being validated. It is **paid** (~$129-$199, price not published on the cert page itself), and adaptivity is claimed by resellers rather than by CompTIA's own certification page. CompTIA is therefore the body with the highest strategic risk: the giant has already built the thing, it just charges for it. If CompTIA ever makes CertMaster Practice free, that lane closes.

### CNCF / Kubernetes — wrong shape, not a competitive kill
CKA/CKAD/CKS are hands-on performance exams in a live cluster, not multiple-choice. The bundled killer.sh simulator is "the same for every attempt and every user". An MCQ spaced-repetition drill does not address what the CKA actually tests. Recommend dropping Kubernetes from the shortlist on product-fit grounds, not competitive grounds.

### HashiCorp — open but thin
Five sample questions, no product, no login. Genuinely open. The counter-risk is demand volume, not competition, and that is out of scope for this document.

---

## Part B — can an original question bank be authored legitimately?

**Confidence flag: MODERATE on the trademark documents (I read the actual guideline pages and quote them below), LOW on how any of this would be enforced in practice. I am not a lawyer and none of this is legal advice. The two questions that genuinely need counsel are flagged at the end.**

### B1. Trademark and brand use — what the actual documents say

**AWS.** The [AWS Trademark Guidelines](https://aws.amazon.com/trademark-guidelines) permit referential use in a specific format and prohibit several things that bear directly on SEO strategy. Quoted:

- Permitted format: `[Your Brand] [relational phrase] [AWS Mark]`, e.g. "YourApp for Amazon S3".
- "**Fair use does not permit you to state or imply affiliation, sponsorship, or endorsement by AWS.**"
- "**You will not incorporate AWS Marks into the names of your organization, products, or services, or into your trademarks or logos.**"
- "**You will not register any domain name that contains an AWS Mark, including any variation or modification, or use any AWS Mark in a subdomain.**" AWS marks in URL *paths* (example.com/aws) are allowed for AWS-related content.
- "You will not combine, abbreviate, telescope, or hyphenate AWS Marks with any other words, trademarks, or brand elements."

**Practical read on the actual question asked:** a page title of the literal form "Practice Exam for AWS Certified Solutions Architect Associate" leads with a permitted relational structure only if your brand leads. The AWS-specified format puts *your* brand first. A domain like `awspracticeexam.com` is directly barred by the domain clause. A path like `yourbrand.com/aws-certified-solutions-architect-associate` is the compliant construction. No partner programme is required for this referential use.

**Microsoft.** The [publications, seminars and conference guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/publications) are the closest first-party analogue to a third-party training product and are unusually specific. Marks may appear in a title if:

1. "The Marks are directly related to a specific Microsoft product or service"
2. "**Your name and logo appear more prominently than the Mark on all printed materials**"
3. A disclaimer is carried: "*[Title] is an independent [publication/seminar/conference] and is neither affiliated with, nor authorized, sponsored, or approved by, Microsoft Corporation.*"

Prohibited: using the mark "as the leading word or most prominent element", or "more prominently than your product, service, or company name". Microsoft "reserves all rights not expressly granted" and "may revoke these guidelines at any time".

**This is the sharpest constraint found in the whole study.** Both AWS and Microsoft, in their own words, forbid leading with their mark. That is in direct tension with the SEO instinct to title a page "AZ-104 Practice Exam". The compliant title leads with your brand. Whether that costs meaningful ranking is an SEO question, not a legal one, but it is a real product constraint and should be priced into the acquisition model now rather than discovered later.

**CompTIA.** No partner requirement found for publishing practice material. CompTIA's [Unauthorized Training Materials](https://www.comptia.org/testing/testing-policies-procedures/test-policies/unauthorized-training-materials) page defines the prohibited thing narrowly and usefully: unauthorized material is "a source ... that contains certification exam content. The content included in unauthorized training materials is **exactly the same or substantially similar to questions appearing on a CompTIA certification exam**." Their listed red flags for fraudulent material are behavioural, not structural: questions and answers with no educational substance, content claiming to be "actual exam content", communities that encourage sharing real exam questions, persistent typos and bad grammar.

**Google, Salesforce, ServiceNow, ISC2, CNCF, HashiCorp** — I did not locate and read a trademark guideline document specific to certification-practice use for these six. Treat their position as **not established**.

### B2. Are the published exam guides/blueprints usable as source material?

**Yes, with high confidence for AWS, Microsoft and CompTIA.** All three publish exam guides / "skills measured" / exam objectives openly and unauthenticated, precisely so candidates and trainers can build against them. AWS publishes a consolidated [exam guides PDF](https://docs.aws.amazon.com/pdfs/aws-certification/latest/examguides/aws-certification-exam-guides.pdf). Microsoft publishes "Skills measured" on every exam page and states: "The best way to prepare for an exam is to practice the skills listed in the 'Skills measured' section of the exam details page." CompTIA distinguishes exam *objectives* (public) from exam *content* (never released): "CompTIA's exam content is never released to the general public."

The line is clean and consistent across bodies: **the blueprint is public and is the intended authoring surface; the questions are confidential.** Authoring original questions against a published blueprint is the legitimate path. That path is now confirmed rather than assumed.

### B3. What the confidentiality terms actually prohibit

AWS: the content of each exam is confidential and may not be disclosed or discussed; candidates may not copy, reproduce or distribute exam content. Disclosing exam questions or answers "in whole or in part, by any means whatsoever" violates the [AWS Certification Program Agreement](https://aws.amazon.com/certification/certification-agreement). Note this binds **the candidate who sat the exam**, not an unrelated third party who never signed it. A third-party author who has never taken the exam is not bound by that NDA; the exposure would be copyright, not contract. That distinction is exactly the kind of thing a lawyer should confirm.

Microsoft: "Microsoft does not review study materials developed by third parties and is not responsible for their content." Microsoft acknowledges third-party prep material exists and disclaims it. It does not prohibit it.

### B4. How legitimate players position themselves

Tutorials Dojo carries the standard construction: "This app is an independent exam preparation tool by Tutorials Dojo and **is not affiliated with, endorsed by, or sponsored by Amazon Web Services**. AWS and related marks are trademarks of Amazon.com, Inc." They describe questions as "written by AWS certified professionals" with explanations and links back to official AWS documentation — i.e. they position as authored-original with educational substance, which is precisely the opposite of CompTIA's braindump red-flag list.

**I found no evidence of any certifying body acting against Tutorials Dojo, Whizlabs, or an established Udemy practice-exam instructor.** That is an absence of evidence over a decade-plus of these businesses operating openly, which is meaningful but is not proof of safety.

### B5. What actually happened to ExamTopics and similar sites

**I could not establish what happened to ExamTopics specifically.** No lawsuit, judgment, or takedown against ExamTopics was found in first-party or reliable secondary sources. ExamTopics remains reachable. Do not build a risk model on an ExamTopics story I could not verify.

What I *did* verify about enforcement generally:
- CompTIA sued an overseas braindump operator in 2003 and expanded it to TroyTec.com, whose owner planned to settle ([CertCities](https://certcities.com/editorial/news/story.asp?EditorialsID=497)).
- Microsoft filed copyright infringement suits against braindump operators in 2006-2007.
- Vendors routinely use cease-and-desist letters and takedown notices to ISPs and registrars rather than litigation.

**The line drawn from real cases:** every verified enforcement action targeted sites reproducing *actual exam content* — verbatim or substantially similar questions. None targeted a site authoring original questions from a published blueprint. The mechanism in every case was **copyright over the questions**, not trademark over the certification name. That is the correct thing to be afraid of, and it is fully avoidable by construction.

### B6. Partner / affiliate programmes

- AWS: no partner programme is needed for the nominative-use construction described in B1. An AWS Training Partner programme exists but is aimed at delivering official AWS courseware, which is a different business.
- Microsoft: no licence appears to be required for the publications-guideline construction; a formal licence *is* required to use the Microsoft **logo**. Use the name in text, never the logo.
- CompTIA, Google, Salesforce, ServiceNow, ISC2, CNCF, HashiCorp: **could not establish** whether a relevant partner programme exists or what it would cost.

---

## What I could not establish

- Whether Microsoft Practice Assessments **adapt**. No first-party claim of adaptivity exists. I infer they are a fixed pool with a random draw, but I did not sit one and cannot confirm.
- Whether Microsoft persists a *readiness verdict* as opposed to a *history of attempt scores*. Verified: attempt history. Not verified: any pass-probability or readiness signal.
- Exact first-party price of Salesforce official practice tests. The ~$20 figure is third-party. The Trailhead Academy product page would not render for me.
- ServiceNow official practice test pricing and whether it persists scores. The MeasureUp partnership is confirmed; the mechanics are not.
- ISC2's paid practice-test tier — price, adaptivity, persistence.
- Exact CompTIA CertMaster Practice price from CompTIA's own site. CompTIA does not publish it on the certification page. The $129-$199 range is third-party.
- Whether CompTIA's own materials describe CertMaster Practice as **adaptive**. Resellers say adaptive; the CompTIA certification page I read does not use the word.
- Trademark/brand-use guideline documents for Google Cloud, Salesforce, ServiceNow, ISC2, CNCF and HashiCorp certification names.
- What happened to ExamTopics. Nothing verifiable found.
- Whether any legitimate authored-original practice-exam business has ever been acted against. Absence of evidence, not evidence of absence.

---

## What would change this verdict

**Would kill remaining lanes:**
1. AWS moving Official Practice Exams into the free account tier, or making Exam Prep Practice unlimited on free. Watch the skillbuilder.aws subscription comparison table — it is a single page and the "Not included" cell is the whole gate. Re-check quarterly.
2. CompTIA making CertMaster Practice free or freemium. It is already the right product shape; only price separates it.
3. Google Cloud replacing the sample-questions Google Form with a real free practice platform. Google has the least to lose by doing this and the most obvious gap.
4. Microsoft extending Practice Assessments beyond Microsoft exams (it already covers the GitHub GH-xxx line, which is a precedent for expanding outside classic Microsoft product exams).

**Would open lanes back up:**
5. Microsoft retiring or paywalling free Practice Assessments. Unlikely; they are stated as a growing programme.
6. Evidence that Microsoft's free assessments have a hard question-pool ceiling small enough that serious candidates exhaust them — that would restore a real gap even with Microsoft in the market.

**Needs a lawyer, not more research:**
7. Whether leading a page title with a certification name is defensible nominative fair use notwithstanding AWS's and Microsoft's stated "do not lead with the mark" guidance. This directly determines the SEO strategy and should be answered before any page templates are built.
8. Whether an author who has never sat the exam and works only from the public blueprint carries any residual NDA or copyright exposure.

---

## Recommended shortlist change

- **DROP Microsoft/Azure.** Free, unlimited, persisted, first-party, still expanding.
- **DROP Kubernetes/CKA.** Wrong exam format for an MCQ drill.
- **KEEP AWS** as primary. Front door verified open first-party.
- **KEEP Google Cloud** as secondary. Weakest official offering of any body.
- **KEEP HashiCorp** as a low-competition long tail, subject to a demand check.
- **HOLD CompTIA, Salesforce, ServiceNow, ISC2.** Front door is open (all paywalled) but CompTIA in particular has already built the product and could reprice at will.
