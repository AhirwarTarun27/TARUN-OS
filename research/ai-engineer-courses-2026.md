# Becoming an AI Engineer: the best courses, Oct 2026

*Researched 2026-10-02. Goal: software developer to AI Engineer. Ranked on content quality and fit,
not price. USD converted at roughly ₹88/$ (approximate, check at purchase).*
*Companion file: `research/ai-job-market-2026.md` (why AI Engineer).*

## What the job actually asks for (India job posts)
- **Python**, LangChain / LangGraph, RAG + vector databases, agents and multi-agent workflows,
  evals (Ragas / TruLens style), cloud deployment.
- So the plan has to end in **Python**, even though TypeScript is the strongest language.
- **The edge:** most AI engineers can't ship a whole product. A full-stack dev can. Python for the AI
  layer + TS/React for the product is a rare combo. Build toward that.

## The picks

### Live (for structure): Codebasics, AI Engineering Bootcamp for Software Engineers
- **Why:** built for working devs (2+ years coding required), IST weekends (Sat/Sun 4-7pm), and the
  closest match to Indian job posts found: RAG → advanced RAG (hybrid, SQL, graph, reranking) →
  agents → LangGraph → multi-agent → **evals + guardrails** → MCP → AWS deploy → context engineering →
  fine-tuning → cost + OWASP Top 10 for AI → AI system design → mock interviews.
- **Format:** 11 weekends, 22 live sessions, 8+ projects + capstone, recordings for a year.
- **Next:** cohort 4 starts Sun 25 Oct 2026 (ends around mid Jan 2027).
- **Fee:** listed at US$840 (about ₹74k). Cohort 3 was ₹54,000 and cohort 2 ₹48,000, so check the
  INR price on the page. Past-cohort recordings were listed at US$420 (rising to $575 on 13 Oct).
- **Weak spots:** Python only. Instructors are educators/founders, not production AI engineers.
  22 sessions over this many topics means some are intro depth. Reviews found are Trustpilot and their
  own site. No independent Reddit threads turned up.

### Self-paced spine: Ed Donner's three Udemy tracks
- **Core Track** (LLM engineering, RAG, QLoRA, agents, 8 projects) → **Agentic Track** (OpenAI Agents
  SDK, CrewAI, LangGraph, AutoGen, MCP, 8 projects) → **Production Track** (deploy to AWS/GCP/Azure/
  Vercel, Bedrock, Docker, Terraform, GitHub Actions, observability, 4 weeks).
- **Why:** 4.7★ with tens of thousands of reviews. The instructor is a 20-year engineer, AI startup
  founder, ex-JP Morgan MD. Project-heavy. The most consistently recommended self-paced AI engineer
  course found.
- **Fee:** roughly ₹500-800 each on a Udemy sale (approximate). About ₹2k for all three.

### Premium live (if money truly doesn't matter): Aurimas Griciūnas, End-to-End AI Engineering (Maven)
- **Why:** production depth. Python, LangChain/LangGraph, FastAPI, Docker, Kubernetes, LLMOps,
  observability, evals, cloud deploy. 4.9★ (114 reviews). The instructor is ex-CPO of Neptune.ai.
- **Format:** 8 weeks, 19 Oct to 13 Dec 2026. Live Mon/Tue/Thu 3-5pm UTC = **8:30-10:30pm IST**.
- **Fee:** $2,200 (about ₹1.94 lakh).
- **Catch:** asks for intermediate Python and basic ML concepts. That means doing Ed Donner's Core
  Track first, and the cohort starts in 17 days.

## The free layer (use with any path)

| Resource | Why | Fee |
|---|---|---|
| Chip Huyen, *AI Engineering* (O'Reilly, 2025) | The standard book for SWE → AI engineer. Judgment: RAG vs fine-tuning, how to evaluate. One chapter a week | about ₹1.5-2.5k (approx) |
| Anthropic Academy: Building with the Claude API | 8+ hrs on tool use, streaming, caching. Free certificate | Free |
| Hugging Face Agents Course + MCP Course | Best free agents curriculum, ends with observability + evals | Free |
| Aishwarya Reganti, AI Evals for Everyone | 10 chapters on evals. The skill most courses skim and the one that reads senior in interviews | Free |
| DataTalks.Club LLM Zoomcamp | RAG + evals + monitoring, project-based. Self-paced any time | Free |

## Considered and not picked

| Option | Fee | Why not the pick |
|---|---|---|
| Udemy (365 Careers) "The AI Engineer Course 2026" | about ₹500-800 | 4.5★, but reviewers call it broad and shallow, with a non-linear order. Ed Donner goes deeper |
| ChaiCode GenAI with JS (Hitesh + Piyush) | ₹7,999 (recorded) | Good and in JS (taught in Hindi). But Indian job posts ask for Python. Use it as a TS add-on, not the spine |
| Scrimba AI Engineer Path | about ₹770/month (PPP pricing) | JS, a good intro, but only 11.4 hrs. Too short to be the main course |
| Krish Naik GenAI + Agentic AI Bootcamp | ₹8,000 | Cheapest live option, but 5-6 months and leans toward data science. Slower than needed |
| AI Makerspace AI Engineer Certification | $4,000 (about ₹3.5 lakh) | Strong, but the 2026 cohort already started (22 Sep). Their FDE certification is $5,250 |
| Hamel Husain + Shreya Shankar, AI Evals (Maven) | $4,200 (about ₹3.7 lakh) | The best evals course available, but overkill at this stage. The free evals course covers the basics |

## The 14-week plan (live route)

| Weeks | What | Output |
|---|---|---|
| 0-2 (now to 25 Oct) | Python basics + Ed Donner Core Track weeks 1-2 + Anthropic API course | One working LLM app in Python |
| 3-13 (25 Oct to mid Jan) | Codebasics cohort 4 on weekends. Chip Huyen one chapter a week. Ed Donner Agentic Track on weekdays for agent depth | Cohort projects + capstone |
| Alongside weeks 8-10 | Aishwarya's evals course, then add an eval suite to the capstone | A capstone with real evals |
| 14 | Rebuild the capstone front end in TS (Vercel AI SDK). Python AI layer + TS product | The portfolio piece that shows both halves |

**Self-paced route (about 12 weeks):** Ed Donner Core (4 wks) → Agentic (4 wks) → Production (3 wks),
with the same free layer and the same TS capstone at the end.

## Timing vs the mission
- `mission/plan.md`: runway ends around 31 Dec, and the offer floor is 15 Nov.
- The live cohort ends around mid Jan. A course instead of a job runs the money out mid-course.
- Both live picks run on weekends or IST evenings and are built for working engineers. **Job + course
  together is the intended format.** No need to pick one.

## Rules that make any course work
- One spine at a time. Two full courses in parallel = two half-finished courses.
- One real project built end to end beats 8 tutorial clones. The capstone with evals is what gets
  shown in an interview.
- Write the code yourself. Same law as `/machine-coding` and `/backend`.

## Sources
- [Codebasics: Live AI Engineering Bootcamp for Software Engineers (cohort 3 page)](https://codebasics.io/bootcamps/ai-engineering-bootcamp-software-engineers-3)
- [Codebasics: cohort 2 page](https://codebasics.io/bootcamps/ai-engineering-bootcamp-software-engineers-2)
- [Codebasics: SWE to AI Engineer roadmap](https://codebasics.io/blog/software-engineer-to-ai-engineer-the-most-effective-path-with-roadmap)
- [Codebasics Trustpilot reviews](https://www.trustpilot.com/review/codebasics.io)
- [Ed Donner: AI Engineer Core Track (Udemy)](https://www.udemy.com/course/llm-engineering-master-ai-and-large-language-models/)
- [Ed Donner: AI Engineer Agentic Track (Udemy)](https://www.udemy.com/course/the-complete-agentic-ai-engineering-course/)
- [Ed Donner: AI Engineer Production Track (Udemy)](https://www.udemy.com/course/generative-and-agentic-ai-in-production/)
- [Ed Donner Core Track review (AcademyGems)](https://academygems.com/reviews/ai-engineer-core-track-llm-engineering)
- [Aurimas Griciūnas: End-to-End AI Engineering Bootcamp (Maven)](https://maven.com/swirl-ai/end-to-end-ai-engineering)
- [AI Makerspace: AI Engineer Certification](https://aimakerspace.io/the-ai-engineer-certification/)
- [AI Makerspace: AI Engineering Bootcamp (Maven)](https://maven.com/aimakerspace/ai-eng-bootcamp)
- [Hamel Husain + Shreya Shankar: AI Evals (Maven)](https://maven.com/parlance-labs/evals)
- [Aishwarya Reganti: AI Evals for Everyone (GitHub)](https://github.com/aishwaryanr/awesome-generative-ai-guide/blob/main/free_courses/ai_evals_for_everyone/README.md)
- [Chip Huyen: AI Engineering book resources](https://github.com/chiphuyen/aie-book)
- [Pragmatic Engineer: AI Engineering with Chip Huyen](https://newsletter.pragmaticengineer.com/p/ai-engineering-with-chip-huyen)
- [DataTalks.Club: LLM Zoomcamp](https://datatalks.club/courses/llm-zoomcamp/)
- [Anthropic Academy guide](https://letscodeit.dev/blog/anthropic-academy-guide-free-ai-courses)
- [Hugging Face Agents Course overview (Scrimba article)](https://scrimba.com/articles/best-courses-to-learn-ai-agents-and-agentic-ai-in-2026/)
- [ChaiCode: GenAI cohort](https://chaicode.com/cohorts/gen-ai)
- [Scrimba AI Engineer Path review](https://scrimbaguide.tech/docs/paths/ai-engineer-path/)
- [Scrimba PPP pricing](https://www.paritylist.com/products/scrimba)
- [Krish Naik: GenAI + Agentic AI Bootcamp](https://www.krishnaik.in/liveclass2/genai?id=9)
- [Udemy: The AI Engineer Course 2026 (365 Careers)](https://aig.udemy.com/course/the-ai-engineer-course-complete-ai-engineer-bootcamp/)
- [Cognizant AI Engineer job post (skills reference)](https://careers.cognizant.com/india-en/jobs/00068075031/ai-engineer-python-langchain-langgraph-agentic-ai-api-llms/)
- [Taggd: AI Engineer skills and hiring guide India](https://taggd.in/blogs/ai-engineer/)
