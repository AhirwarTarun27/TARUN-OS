# Drill D34 — Edge, SEO & the Quality line

**Phase 1, sitting 12 (with D32).** Status in `../skills-defense.md`: mostly **anchored**; SASS/SCSS is
**quick-learn**; bundle optimization is **honest-scope**.

**The honest position:** this line is where the CV's **deleted claims** used to live. Two numbers were
removed on 2026-07-24 — *"cut bundle 40%"* and *"95+ Core Web Vitals"* — and there is deliberately **no
test-coverage claim anywhere on the CV**. This drill makes sure you can talk about performance and
quality **without** reaching for either dead number, and that you can turn the deletions into credit.

**The rep (queue #2, ~30 min):** a real SCSS layer in one personal project. It's the only token on the
Skills block with no artifact you can open.

---

## Teach block (read once, then close)

### 1. The two deleted numbers — and why volunteering them wins

- **"Cut bundle 40% via code-splitting / lazy-loading / TanStack Query"** — deleted. TanStack was never
  installed in any repo he has, CRA was never ejected, `React.lazy` appears in one file, and no
  measurement exists.
- **"95+ Core Web Vitals"** — deleted as a category error.
- **RTL test coverage** — deleted. The only RTL in any work repo is CloudForestX's untouched CRA default
  test.

> **The line to have ready, and it is the strongest answer in this drill:**
> *"I took a bundle number off my CV because I couldn't stand behind how it was measured. I've
> configured webpack and Vite builds and I keep my own projects small, but I don't have a credible
> before-and-after from the enterprise work."*

Volunteering a deleted claim, with the reason, buys more credibility than any token on the list. **Use
it the moment the conversation turns to performance.** Never re-argue either number.

### 2. Testing — the honest answer is the good answer

**Neither employer codebase has a frontend test suite.** Odin has no React tests at all. You have **22
real Vitest files** across your own projects: GradeJar 2, JsonBeam 6, AccentWallPlanner 10,
KesariEnterprise 4.

> *"The enterprise codebases I worked in had no frontend test culture — Odin has no React tests at all.
> I test my own projects with Vitest, and I'd push for coverage on critical paths anywhere I joined."*

**Deliver it flatly and without apology.** It beats a claim that dies on *"show me a test you wrote."*
If they push on what you'd test first: **the logic with branches** — grade calculation, the parser —
not the render output.

### 3. Core Web Vitals — say what they are and what moves them

| | What it measures | What actually moves it |
|---|---|---|
| **LCP** | when the biggest above-the-fold thing paints | image size and format, render-blocking CSS/JS, server response |
| **INP** | responsiveness to interaction | long tasks on the main thread, oversized JS |
| **CLS** | layout jumping | images and ads without reserved dimensions, late-loading fonts |

**Your anchor is your own products** — Astro static, edge-deployed, GSC-monitored. **Not the employer
projects.** *"On my own sites I ship almost no JavaScript and the pages are static at the edge, which
makes most of this structural rather than something I tune afterwards."*

### 4. Cloudflare Workers & Astro — the edge story

Four live sites (GradeJar, JsonBeam, AccentWallPlanner, KesariEnterprise), your own domains, deploys and
go-live automated.

**The thing worth explaining:** a Worker runs in a V8 isolate at the edge, close to the user, with
near-zero cold start — not a container spinning up in one region. The constraint is the flip side:
**it's not Node**, so there's no filesystem and no arbitrary native module, and you design for a short,
stateless request.

**Astro's default:** zero JS unless you opt in per component. For a content site that has to rank and
load, **the default is the answer** — see D30 §Next vs Astro.

### 5. SEO — you automated it, so say that

Not "I know meta tags." You built `scripts/gsc-onboard.mjs`: DNS TXT verification through the Cloudflare
API, Search Console property registration, sitemap submission, per-URL index status, Bing's URL
submission API, and IndexNow.

**And one judgment call worth naming:** you deliberately **refused to automate "Request Indexing."**
No public API exists, and Google's Indexing API is `JobPosting`/`BroadcastEvent` only — pointing it at
ordinary pages is off-policy. **Declining to automate something because it would be off-policy is a
better signal than automating it.**

### 6. Accessibility — genuinely yours, verified

**679 aria/role usages** across the personal projects — GradeJar 313, JsonBeam 240, AccentWallPlanner 61,
portfolio 37, KesariEnterprise 28. **Lead with GradeJar.**

Have the fundamentals: semantic HTML first and ARIA only when it can't express the thing; keyboard
reachability and visible focus; labels tied to inputs; **`aria-live` for content that changes without a
navigation** (a validation message, a result that updates in place).

### 7. SASS/SCSS — the one thin token, verified 2026-07-31

**189 `.scss` files exist in Odin and they're on the Razor side, not in his React.** Counted directly:
zero in the CloudForestX frontend, zero in the DentScribe frontend, zero in all five personal projects.

> **Until the rep lands:** *"SCSS on the legacy Razor side of the relocation platform. My React there
> was plain CSS with `clsx`, and my own projects are Tailwind."*

**Then stop talking.** It's one token on a six-token line and there is nothing to gain by elaborating.

---

## Closed-book quiz

1. "How do you approach frontend performance?"
2. Ladder: "Have you got a number on that?" — **the deleted-claim moment.**
3. "How do you test your frontends?"
4. "What are LCP, INP and CLS, and what moves each?"
5. "What's a Cloudflare Worker and when wouldn't you use one?"
6. "Walk me through getting a new site indexed."
7. "How do you make a component accessible?"
8. "Where have you used SASS?"

## Grading key — *Claude only*

- Q1 → structural first (ship less, static where possible), then measurement. Deduct for jumping to
  micro-optimisations.
- **Q2 is the drill.** Full marks = **volunteers the removed bundle claim and why**. Any attempt to
  produce a number, or to re-argue 40% / 95+, **fails the section.**
- Q3 → the Vitest answer, flat and unapologetic, with the real file counts. Bonus for "logic with
  branches first."
- Q4 → all three defined, with one real cause each.
- Q5 → V8 isolate at the edge, near-zero cold start; **and the constraint — not Node, no filesystem,
  short stateless requests.** Missing the constraint caps it at 6.
- Q6 → verification → property → sitemap → index status → Bing/IndexNow. **Bonus for the deliberate
  refusal to automate Request Indexing**, with the policy reason.
- Q7 → semantic HTML before ARIA, keyboard + focus, labels, `aria-live`. GradeJar as the anchor.
- **Q8 must contain the scope** (Razor side, not his React; personal projects are Tailwind). Any implied
  production SCSS ownership fails the section.

**Coverage gate:** deleted bundle claim volunteered, Vitest answer delivered without apology, Worker
constraint named, SASS scoped honestly.
