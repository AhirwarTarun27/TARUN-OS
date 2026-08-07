# Drill D40/D41 — Personal projects & the "end to end" lead-in

**Phase 1, sitting 9.** Everything here is 🟢. **This is the easiest drill on the board and the one
most likely to be wasted**, because 🟢 material still comes out badly if it's never been said out loud.

**What it covers:** the two CV Projects entries (GradeJar, JsonBeam) and — more importantly — the
**Projects section lead-in**, which `defend-map.md` explicitly flags with *"expect it to be probed."*

---

## Teach block (read once, then close)

### 1. Why this section exists on the CV at all

Every employer bullet on this CV describes **owning a slice of someone else's platform.** That's the
truth and it's normal for a services company, but it leaves one question unanswered: *can you take
something from nothing to live?*

**That's the only job of this section.** So the answer to *"tell me about your side projects"* is never
a feature tour. It's:

> *"They're where I own the whole thing — the research, the build, the domain, the edge deploy, the SEO
> and the analytics. At work I own a layer of a large platform. Here I own all of it, and that's
> deliberate: it's the part of being a developer my day job doesn't exercise."*

**Land that, then let them pick a project.**

### 2. GradeJar — `gradejar.com`

**What it is:** a gradebook for teachers. Rosters, assignments, custom grading scales. **No login, no
account, no backend** — everything persists in the browser.

**The decision worth defending — local-first with zero backend:**
- Teachers handle **student data**. A product with no server has **nothing to breach**, and a teacher
  doesn't have to get anything approved by a district to try it.
- No accounts means **no signup friction** — the biggest drop-off in a tool people evaluate in ninety
  seconds.
- No backend means **no hosting cost per user**, which is what makes an ad-supported free tool viable.

**The honest cost — volunteer it:** data lives on one browser on one machine. Clear the storage and it's
gone. **No sync, no multi-device, no recovery.** *"That's the trade I chose, and export is what makes it
survivable."*

**Grounded facts:** Astro + TypeScript, deployed on Cloudflare Workers, **24 files under `src/pages`**,
**11 storage call sites**, **2 Vitest files**, and **313 aria/role usages** — the most accessible thing
you've built. Lead with GradeJar on any accessibility question.

### 3. JsonBeam — `jsonbeam.com`

**What it is:** a fast, ad-free JSON formatter and validator.

**The decision worth defending — static-first:** it's a developer utility in a category with dozens of
competitors, so the only differentiators are **speed and not being hostile.** Static at the edge means
it's usable before a heavier competitor has finished loading. **6 Vitest files** — the most-tested of the
four.

**The honest one, and it's a good story:** it was **rejected by AdSense for low-value content** on
2026-07-08. *"A single-purpose tool page is thin by a content policy's standards, no matter how well it
works. I'd misread the business model — the tool was the product, but the thing being monetised is
pages. That changed how I scope every project since: I now check monetisability at scoping time, not
after building."* **A rejection you learned a scoping lesson from is a better answer than a launch that
went fine.**

### 4. The lead-in — the probe `defend-map.md` warns about

> *"…research, build, deploy, and operate end to end — domain, edge infrastructure, SEO, and analytics"*
> *"…an agentic AI development workflow (Claude Code, Model Context Protocol) that I built and
> orchestrate myself"*

**Both will be probed. Answer concretely.**

**"End to end" means, specifically:** validating the idea against real search demand before building;
choosing and buying the domain; Cloudflare zone, nameservers, Workers deploy, the www redirect, email
routing; Search Console and Bing verification and sitemap submission; and live traffic and revenue
reporting via a script that pulls the real numbers. **Named steps, not adjectives.**

**"Agentic AI development workflow"** → see `32-ai-genai.md` §3. Answer with **skills, subagents, MCP
and the doc-MCP-vs-action-MCP policy.**

> ⚠ **The one hard boundary on this line:** it is **his own system**. Do not let it drift into implying
> AI agent work at ThinkSys. DentScribe's LLM work stays 🟡 integration.

### 5. If they ask "how are they doing?"

**Answer with real numbers or say you'll get them — never guess.** The live figures come from
`scripts/report.mjs`. Pre-revenue is a fine answer; a made-up traffic number is not.

**If they ask why you build these:** the honest reason is better than a rehearsed one — *"I wanted a
loop I fully control, where I make every decision and find out if I was right."*

---

## Closed-book quiz

1. "Tell me about your side projects." — **watch whether he leads with ownership or with features.**
2. "Why would you build a gradebook with no backend and no login?"
3. Ladder: "What happens when the teacher clears their browser?"
4. "JsonBeam is a JSON formatter. There are fifty of those. Why yours?"
5. "Your CV says you take these end to end. What does that involve?"
6. "What's an agentic AI development workflow that you built yourself?"
7. "Have any of them made money?"

## Grading key — *Claude only*

- **Q1 → ownership, not features.** *"I own a layer at work; here I own all of it."* Feature-touring
  caps the section at 5.
- Q2 → all three reasons: nothing to breach, no signup friction, no per-user cost. Two of three is a 7.
- **Q3 → he must volunteer the cost, not concede it.** No sync, no recovery, export is the mitigation.
- Q4 → speed and not-hostile as the only real differentiators. **Bonus for volunteering the AdSense
  rejection and the scoping lesson** — that's the strongest answer available on this project.
- Q5 → **named steps**: demand validation, domain, Cloudflare/Workers, GSC + Bing + sitemap, analytics.
  Adjectives instead of steps caps it at 5.
- Q6 → skills, subagents, MCP, the doc-vs-action policy. **Any drift toward implying this was ThinkSys
  work fails the section.**
- Q7 → *"pre-revenue"* is a full-marks answer. **Any invented number fails the drill outright.**

**Coverage gate:** leads with ownership, volunteers the local-first cost, names concrete end-to-end
steps, keeps the AIOS boundary, invents no numbers.
