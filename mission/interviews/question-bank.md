# Question Bank

> **Every question you've actually been asked.** One entry each, best answer only. **Rewritten, never appended.**
> Before an interview: read every 🔴 and 🟡 out loud. That's the prep.
> 🔴 fumbled · 🟡 fixable · 🟢 strong · ⚪ asked, answer not recorded · **×N** = times asked

---

## About you

### 🔴 "Did you write code yourself? Hands-on?" ×1
**The mistake:** "No, I don't write code myself, I just review it." For any engineering role this reads as *can't code*. It's also not true.
**Say:**
> "Yes. My first years at ThinkSys were before these tools, so I wrote everything by hand: dashboards, hooks, the API layer. Today AI types most of the routine code, and I own the design and review every line. But I deliberately keep the hands-on skill: I practise timed machine-coding rounds with autocomplete switched off, and I'm doing a Node and PostgreSQL track where I write every line myself. **I don't want to review code I couldn't have written.**"

**The last sentence is the one that lands.** Say it every time.

### 🔴 "Are you at home? / Why aren't you working right now?" ×1
**The mistake:** sounded caught off guard, and "the offer isn't what I expected" made the gap sound like a salary complaint.
**Say:**
> "Yes, I finished my notice in September. Leaving before signing was a planned decision: I wanted to give the switch my full attention and prepare properly. It also means I can join right away. I do have an offer in hand, and I'm choosing carefully rather than taking the first one."

**Order matters:** planned → available now → offer as a calm fact. Money never comes first.
**Trigger:** your camera background. Expect this in every video interview until you join somewhere.

### 🟡 "Tell me about yourself." ×1
**The mistake:** opened with "4.5 years at ThinkSys". The domains are the interesting part.
**Say:**
> "I'm a full-stack developer who's worked across four very different products: a corporate relocation platform for a US company, an AWS cost-optimisation platform, an AI documentation product for dental practices, and an HR system. That's four and a half years at ThinkSys, mostly React, TypeScript and Node.
>
> My strength is complex React front ends, and on the cost platform I also built the Node ingestion and the Postgres layer behind them. I've worked AI-first for about [pick one number and keep it] years: I built a Claude Code setup for my last client codebase and turned it into a plugin. And I build and ship my own products end to end.
>
> I finished my notice in September, and I'm looking for a role with more ownership."

**Rule:** products first, years second, the ask last. ~60 seconds.

### 🔴 "Which modules have you owned end to end?" ×1
**The mistake:** only front end, then "the graphs on CloudForestX". No shape, and it undersold real backend work.
**Say:**
> "Three, at different depths.
>
> **My own products, fully.** JsonBeam, a JSON formatter: I built it in Astro and TypeScript, deployed it on Cloudflare Workers, set up the domain and Search Console. It's live, and nobody else touched it.
>
> **On CloudForestX, the data path and the dashboards.** On the back end I built the Node ingestion that pulls EC2, EBS, S3 and CloudWatch data from 200+ AWS accounts through STS cross-account roles into PostgreSQL. On the front, the 40 dashboards: one global account-and-month filter in Redux Toolkit, and a typed API layer across 36 service modules.
>
> **On DentScribe, one full vertical slice.** The staff contacts module: Node endpoints with role guards, ownership-scoped queries and clamped pagination, plus the React screens on top."

**Boundaries, say them if they dig:** CloudForestX recommendation logic was another team's. DentScribe backend is *one module deep*; don't imply more. Dwellworks is front end only.
**Rule:** "Three, at different depths:" first. Then one line each.

---

## AI concepts

### 🔴 "What is an agent?" ×1
**The mistake:** described a *subagent* (parallel, own context, returns a summary). That's a special case, not the definition.
**Say:**
> "An agent is a model running in a loop. It gets a goal and some tools, decides the next step itself, calls a tool, reads the result, and repeats until it's done or hits a stop condition: a step limit, a budget, or a human approval.
>
> One detail that matters: the model only *proposes* the tool call. My code decides whether to run it.
>
> Compare a workflow, where I fix the steps in code. And a subagent is one agent started by another, with its own fresh context, that hands back a summary. I use those for research so the main context stays clean."

**Rule:** definition first, your setup second.

### 🟡 "What is context engineering?" ×1
**The mistake:** framed as token-saving only, and skipped the definition. The mechanisms you named were right.
**Say:**
> "Deciding what goes into the model's context window at all, not just how the prompt is worded. It's mainly about **quality**: accuracy drops as the window fills, long before the limit. Lower cost is the bonus.
>
> In practice I do four things. Independent tasks run in subagents with fresh context, so the main window only gets a summary. State lives on disk, plans and learnings, so a new session reads a file instead of re-exploring. When a session gets long I write a handoff and restart clean. And knowledge loads only when needed: skills and learning notes load on demand, and CLAUDE.md stays small.
>
> Model choice is the cost side: cheap models for searching, strong models for planning and review."

### ⚪ "How do you review AI output? Who's accountable?" ×1
**Say:** see `learning/ai-fluency/alepo-round-1.md` Q5 (small diffs, gate at the plan, fresh-context reviewer, evidence not assertion, *"I directed it, I reviewed it, I own it"*).
**Next time:** note what you actually said, so this gets a real verdict.

---

## Behavioural

### ⚪ "Tell me about a time you disagreed with someone." ×1
**Say:** the stale-response story, `learning/ai-fluency/alepo-round-1-soft-skills.md` #10. Their reason fairly → you *showed* the bug instead of arguing → where they were right (roll out gradually) → the result.
**Remember:** the disagreement part is illustrative. Know who and roughly when before you use it again.

### ⚪ "Tell me about a failure." ×1
**Say:** JsonBeam's AdSense rejection, soft-skills #12. The key line: *"I'd misread the business model."*

### ⚪ "A time you went beyond your ticket." ×1
**Say:** the mobile keyboard bug nobody had filed, soft-skills #14. Keep it small; its value is that you *noticed*.

### ⚪ "A time you were wrong." ×1
**Say:** auditing your own CV against the code and removing claims that didn't hold, soft-skills #15. *"Nobody would have caught them, which is why it mattered."*

---

## Patterns across interviews

*Rewritten after each review. The habits that cost you, not single answers.*

1. **"What is X?" → you skip the definition.** Twice in one interview. One textbook sentence first, then "in my setup...".
2. **List questions come out shapeless.** Say the count and the shape first: "Three, at different depths."
3. **You undersell.** "The graphs" instead of "the data path and 40 dashboards". "I don't write code" instead of what you actually do. Say the real scope.
4. **Pick one number for AI-first experience.** "About a year" in prep, "1.5 years" in the room. Numbers that move get noticed.
