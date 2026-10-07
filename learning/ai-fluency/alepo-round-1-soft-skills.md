# Alepo, Round 1: Soft Skills + Salary

> **One read, ~15 minutes.** Pair file: `alepo-round-1.md` (the AI questions).
> Say the ★ answers out loud once. The rest, just read.

**Four rules for every answer**
1. **60 to 90 seconds, then stop.** Silence after a good answer is fine.
2. **"I", not "we".** Say what *you* decided.
3. **Never criticise ThinkSys.** They hear it as how you'll talk about them.
4. **No client internals.** Say "a relocation platform", not code, tickets or names beyond your CV.

---

## A. About you

### ★ 1. "Tell me about yourself."

> "I'm a full-stack developer. I spent four and a half years at ThinkSys, mostly in React, TypeScript and Node, across four client products: a corporate relocation platform, an AWS cost-optimization tool, an AI dental documentation product, and an HR system. My strength is complex React front ends, and on the cost platform I also worked across the Node and PostgreSQL layer behind them.
>
> The other thing about how I work: I've been AI-first for about a year. On my last client project I built a Claude Code setup for the codebase, with agents, rules and a learning log, and I've since turned the generic parts into a plugin. I also build and ship my own web products end to end.
>
> I left in September to give my next move my full attention, and I've been preparing full time since. This role asks for exactly the two things I've been building: engineering judgment and AI fluency."

### ★ 2. "Why did you leave after 4.5 years?"

> "Four and a half years gave me four very different products and a lot of growth. What I want next is a bigger step in ownership: taking a module end to end, through deploy and production, and working AI-first. The type of company matters less to me than the scope of the work, and it felt like the right time for a fresh challenge."

### ★ 3. "Why resign without an offer?"

> "It was a planned decision. Switching well takes real preparation, and I didn't want to do it half-hearted in the evenings. So I planned for a few months of full focus. It also means I can join immediately."

**Never say:** anything about money running out, pressure or urgency. Calm and planned is the whole answer.

### 4. "Why stay 4.5 years in one company?"

> "It never felt like one job. Four products, four domains, different stacks: Vue and React inside a .NET monolith, a large TypeScript app, a healthcare AI portal. And my role grew, from building assigned screens to working directly with the US client on requirements, demos and releases."

### 5. "What are you doing right now?"

> "Preparing full time and building. Machine-coding practice, a Node and PostgreSQL track, and my AI workflow. And I keep my own products running."

### 6. "Mechanical engineering to software? What about 2017 to 2021?"

> ✍️ **FILL THIS IN YOURSELF.** Nothing in the repo records it, so it isn't invented here.
> **Shape, 15 seconds total:** *one sentence on what you did* → *one sentence on why you switched* → straight into Masai and the 4.5 years since.
> **The mistake isn't the gap. It's a long, apologetic answer.** Short and flat closes it.

---

## B. Why Alepo

### ★ 7. "Why Alepo? Why this role?"

> "Two reasons. You're building the way I already try to work: small pods, AI-first, judgment over keystrokes. And the scale. Software running on carrier networks for hundreds of millions of subscribers is where review discipline and owning production actually matter. That's the job I want."

### 8. "You have no telecom experience."

> "Right, and I won't pretend otherwise. But I've ramped into four domains in four years: relocation, AWS cost, dental documentation and HR. My method is to trace one real feature end to end through the code before touching anything. I even built a skill that does that trace for me on my last project. Your JD already plans a 4 to 6 week ramp, and that's how I like to learn a domain: properly, from the code."

---

## C. How you work (the soft skills their JD names)

### ★ 9. "Tell me about unclear requirements." *(JD: "ambiguous requirements")*

> "A tax rule for Canadian orders: the Province had to be filled in. The written spec said 'always required'. The annotated screenshots said the departure side is only required when the Departure service is selected. Instead of guessing, I wrote it down as 'the one rule that's easy to get wrong', named which source wins, and wrote the backend handoff with the exact field keys the UI reads. So both sides built to one written contract."

### 10. "Tell me about a time you disagreed with someone." *(JD: "disagree respectfully")*

*Sample answer, written on request. The bug and the fix are real and on your CV. The disagreement is illustrative: swap in real details wherever you remember them.*

> "On the cloud cost platform, users could switch the account filter quickly. Sometimes the slower first response arrived after the second one, and the dashboard showed the wrong account's data.
>
> A teammate wanted to fix it only on the screen where it was reported. That was a fair view: we were mid-sprint, and a small fix is lower risk. I disagreed, because the same race existed in every dashboard that fetched data. Fixing one screen meant the bug would come back somewhere else.
>
> So I didn't argue in the abstract. I reproduced the same bug on a second dashboard and showed them. Then I proposed one fix in the shared fetch layer: every request gets an id, and a response is dropped if a newer request has already gone out.
>
> Where they were right: I wanted to change all 36 service modules in one go. They said that was too much risk for one release, and they were correct. We fixed the reported screen first, then rolled it out module by module.
>
> The result: that whole class of bug disappeared, and every new dashboard got the fix for free."

**Why it works:** you state their reason fairly · you *show* instead of arguing · you admit where you were partly wrong · it ends on a result.

| Likely follow-up | You say |
|---|---|
| *"What did your teammate think in the end?"* | "They agreed once they saw it on a second screen. Showing beat arguing." |
| *"What if they still hadn't agreed?"* | "I'd take both options to the lead with the trade-off written down, then commit to whatever was decided." |
| *"What would you do differently?"* | "Bring the evidence first. The demo settled it faster than any discussion would have." |
| *"How did the fix actually work?"* | "A request id held in a ref inside a shared fetch hook. Each call takes the next id. When a response comes back, it's ignored unless its id is still the latest." |

**Don't reuse it** for "a hard bug" in the same interview. Pick a different story for that one.

**Tip:** ask first, *"Do you mean on scope, or on a technical approach?"* It buys you 5 seconds and a better answer.

### 11. "Explain a technical decision to a non-engineer." *(JD: "explain to non-engineers")*

> "When we tightened the Canada rule, I had to decide whether Save should also block without a Province. I chose not to. In plain words: Save is a draft, so you can stop halfway through. Accept is the gate, and that's where we check. If Save blocked too, nobody could save half-finished work."

### ★ 12. "Tell me about a failure."

> "JsonBeam, my JSON formatter. Fast and good at its one job, but AdSense rejected it for low-value content. The product wasn't wrong. I'd misread the business model. The tool was the product, but what gets monetised is pages. So I moved that check to before the build: every idea now gets a revenue and content plan before I write code, and it has killed ideas that would have ranked and never paid."

### 13. "Something broke. Walk me through it." *(JD: "incident response")*

> "A feature worked perfectly locally and came up unstyled on the Dev server. The JS loaded; the CSS didn't. That split was the clue. The stylesheet was a separate bundle, compiled CSS was gitignored and generated at build, and the deploy only ships files registered in the project file. The JS was registered and the CSS wasn't. I fixed it and wrote the rule down: any new stylesheet bundle must be registered or it won't deploy."

**Boundary:** that was the Dev environment, not a production outage. Say so. If you haven't been on a formal on-call rotation, say that too, plainly: *"Not formally on a pager, and I'm keen to learn it here."*

### 14. "A time you went beyond your ticket." *(JD: "high agency")*

> "Our AI assistant chat opened in a floating panel. On mobile, the keyboard pushed the input off-screen, so users couldn't see what they were typing. Nobody had filed it. I noticed it and made the chat full-screen on mobile, so the layout sits above the keyboard. Small, but it made the feature usable on the device people were actually using."

### 15. "A time you were wrong."

> "Before interviewing, I checked my own CV against the actual code. Some numbers didn't hold up. One was a load-time win I'd credited to memoization, which can't change initial load. I took them off. Nobody would have caught them, which is exactly why it mattered to me."

---

## D. Strengths, weakness, future

### ★ 16. "Your strengths?"

- **Judgment about AI output.** I use it heavily and I know how it fails.
- **Ramping into new domains fast.** Four domains in four years.
- **End to end ownership.** My own products run live, from domain to deploy.

### ★ 17. "Your weakness?"

> "AI-assisted coding had eroded my blank-file speed, writing structure from nothing without help. I noticed it while preparing, so I built myself a practice lab with autocomplete disabled, and I do timed reps in it. It's improving, and it taught me to protect the skills the tools wear down."

**Don't** pick DSA as your weakness here. Their JD lists CS fundamentals as a must-have.

### 18. "Where do you see yourself in 3 to 5 years?"

> "Owning a module end to end, then leading a pod. And being the person who sets how the team uses AI well: the instruction files, the review habits, the guardrails. Your JD lists mentoring on AI practice as part of the job, which is a big reason I applied."

---

## E. Salary and logistics ★ (read this section twice)

**Your facts:** current CTC **13 LPA** · one offer in hand at **13 LPA** · released and available now.
**Before the call:** know your fixed vs variable split, and when the 13 LPA offer expires.

| They ask | You say |
|---|---|
| **"Current CTC?"** | *"13 LPA."* Plain, no rounding up. They can ask for payslips. |
| **"Expected CTC?"** | *"I'm looking at 18 to 20 LPA, based on the scope of this role: end-to-end ownership through production, with AI fluency as a baseline."* **Then stop talking.** |
| **"Any other offers?"** | *"Yes, one offer in hand. I haven't accepted it because it's at my current level, and I'd rather join a role like this."* |
| **"How much is the offer?"** | *"13. I interviewed before my appraisal. The appraisal then moved my current CTC to 13, so the offer ended up flat. That's why I'm still looking."* **Never inflate it.** They can ask for the letter. |
| **"Your current is 13. Why 18?"** | *"Because I'm pricing this role, not my last payslip. 13 was for my previous role. This one asks for more: owning a module into production, plus AI fluency. A 30 to 40% jump is a normal switch, and I can join immediately."* |
| **"Can you come down?"** | *"I have some flexibility for the right role. Help me understand the fixed part and the growth path, and I'll tell you where I can land."* **Never say your floor on the call.** |
| **"They offer 15 or 16 on the spot."** | *"Thank you. Can you send the breakdown, fixed and variable? I'll come back within a day."* **Never accept on the call.** |
| **"When can you join?"** | *"Immediately. I'm fully released, so within a week."* |
| **"Interviewing elsewhere?"** | *"Yes, a few companies. This one's near the top because of how you're building with AI."* |
| **"Open to relocating?"** | ✍️ Decide before the call: Pune / Navi Mumbai, yes or no, and your conditions. |

### Your private numbers (never say these out loud)

- **Ask:** 18 to 20 LPA (a 40 to 50% hike on 13, which leaves room for them to counter).
- **Walk-away floor until 15 Nov:** **16 LPA**, mostly fixed. That's the bottom of the band in `mission/plan.md`.
- **Compare fixed pay, not CTC.** A 17 with a big variable can be worse than a fixed 16.
- **The 13 LPA offer is your safety net, not your anchor.** Keep it alive as long as its deadline allows.
- **After 15 Nov,** your own pre-commitment applies: take the best offer on the table (`mission/plan.md`).

---

## F. Your questions for them (ask 2)

1. *"What separates L2 from L3 on your AI Fluency Rubric in day-to-day work?"*
2. *"How do pods check agent output today? Does the QA pod own the eval harness?"*
3. *"What does the 4 to 6 week domain ramp look like in practice?"*

---

## Before the call: 10 minutes

Out loud, once each: **#1** (about you), **#2 + #3** (why leave), **#7** (why Alepo), **#17** (weakness), and **section E**. Fill in ✍️ **#6** and **relocation** first. Make **#10** your own words.
