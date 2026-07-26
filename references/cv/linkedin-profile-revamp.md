# LinkedIn Profile Revamp — v4, 2026-07-26 (full-stack framing)

> **Verified against:** `references/cv/pdf-cv/Tarun_CV.pdf`, `references/cv/master.tex`,
> `references/cv/fact-bank.md`, `learning/cv-defense/defend-map.md`, and the LinkedIn export
> `Profile (1).pdf` + the three profile screenshots (Projects / Skills / top card).

---

## What changed in v4 and why

You asked for four things. Here is how each is handled, and the one place I'm pushing back.

1. **Portray as full-stack, not front-end.** Done — and it's defensible, not a stretch. Your CV summary
   title is literally **"Senior Full-Stack Developer"** (fact-bank line 222), and your backend is real on
   one project: CloudForestX Node.js + Express + PostgreSQL ingestion and APIs are flagged **🟢 built**
   (fact-bank line 204). So the full-stack line rests on real work. In the interview you say the honest
   thing — "majority front-end, real backend on the cloud-cost platform" — and nothing on the profile
   contradicts it.

2. **No company projects on the profile — just Experience with strong pointers.** Done. The three older
   client projects come **out** of the Projects section entirely. Their work is folded into your one
   ThinkSys Experience block as **generalized bullets** — the *type* of work and the skills, **no client
   or product names**. This is exactly the senior pattern you noticed, and it's the right call:
   services-company work is cleaner shown as capability than as a client roster.

3. **Two positions, content for both.** Done in §3 — earlier role (Software Developer, Apr 2022 – Aug 2025)
   and Senior role (Senior Software Developer, Aug 2025 – Present), each with its own description. This is
   actually the *more* credible structure: it shows a real promotion instead of "senior from day one".

4. **Add backend skills so it reads full-stack.** Done in §5 — Node.js / Express / PostgreSQL move up and
   get pinned alongside React.

**One thing to settle:** your CV records a single "Senior Software Developer, Apr 2022 – Present" while
LinkedIn shows the two-row promotion. Both are legitimate; they just need to tell the same story. Easiest
fix is to update `master.tex` to the two-role split so the two documents match (§9).

---

## Your portfolio-link question — why it isn't showing, and the two fixes

Your portfolio **is** in your profile (it's in Contact info in the export), but LinkedIn only shows it
inside the **Contact info popup** unless you do one of these. The profiles you saw with a visible link did
one of them.

**Fix A — the link in the top card (Contact info).**
`Profile → click "Contact info" (the link under your headline) → pencil (edit) → Website → "+ Add website"
→ URL: https://tarunahirwar.com → Type: choose "Portfolio" → Save.`
Setting the **type to "Portfolio"** (not "Other") is what makes LinkedIn surface it as a labelled link
rather than burying it. While you're in there, also add GitHub (§7).

**Fix B — the big visual card (Featured). This is the one that's actually prominent.**
`Profile → "Add profile section" → "Recommended" → "Add featured" → "+" → "Add a link".`
Featured renders as large cards with thumbnails, directly under About and above Experience — the most
visible real estate on the page. Add three: `https://tarunahirwar.com` (portfolio), `https://gradejar.com`,
`https://jsonbeam.com`. **This is also where your own products live now** (see §4) — they're your portfolio,
not company work, so they belong here, not in a Projects list.

Do both. Fix A gives the tidy top-card link; Fix B gives the eye-catching cards.

---

## 1. Headline — now full-stack

**EXACT PATH:** `Profile → top card (name + photo) → pencil icon top-right → "Edit intro" → Headline field.`

**LIMIT:** 220 characters. This is **130**.

You've already applied the v3 headline (it's in your screenshot). This swaps it to lead **Full-Stack** and
front-loads backend keywords so recruiters searching Node/PostgreSQL find you.

**PASTE THIS:**

```
Senior Full-Stack Developer | React.js, TypeScript, Node.js, Express, PostgreSQL | Enterprise SaaS | LLM & AI-assisted development
```

No company name in it, deliberately — it never needs editing when you switch jobs.

---

## 2. About — full-stack, about you, no company projects

**EXACT PATH:** `Profile → About section (under the top card) → pencil icon → text box.`

**LIMIT:** 2,600 characters. This is **866**.
**FORMAT:** plain text, no markdown. Only the first ~3 lines show before "…see more", so line 1 carries it.

This is about your expertise and how you work — front-end depth, real backend, AI, and your own products.
**No employer or client names**, so it survives a job change untouched.

**PASTE THIS:**

```
Senior Full-Stack Developer with 4+ years building data-heavy enterprise SaaS in the JavaScript ecosystem.

I work end to end. On the front end my core is React and TypeScript: single-page apps, Redux state at scale, reusable typed component libraries, and real-time, data-heavy dashboards. On the back end I build Node.js, Express and PostgreSQL REST APIs and data-ingestion services, including AWS integrations.

On the AI side I work with Large Language Model (LLM) integration, the OpenAI API, agentic workflows and the Model Context Protocol (MCP), and I build with AI-assisted development every day.

Outside work I ship my own products end to end, from domain and edge deployment to SEO and analytics: GradeJar, a local-first gradebook for teachers, and JsonBeam, a JSON formatter, both static-first on Astro and Cloudflare Workers.

ahirwartarun095@gmail.com
```

---

## 3. Experience — two ThinkSys positions, no company projects named

You want both positions shown. Keep the two rows your LinkedIn already has and paste a description into each.
The work splits cleanly by seniority: the **earlier** role carries the building years (HR, healthcare,
cloud — where your real backend proof lives), the **Senior** role carries the current platform work plus
senior-level ownership.

**One title fix first:** your CV says **"Senior Software Developer"** but your LinkedIn rows say
**"Engineer"**. Pick one word and use it in both documents. I've written these as **Developer** to match
your CV/fact-bank — change to "Engineer" everywhere only if that's what your promotion letter says.

| Row | Title (recommended) | Dates | Covers (never named) |
|---|---|---|---|
| Earlier | Software Developer | Apr 2022 – Aug 2025 | MyWorkMyDay, DentScribe, CloudForestX |
| Latest | Senior Software Developer | Aug 2025 – Present | Dwellworks |

**EXACT PATH for each:** `Profile → Experience → ThinkSys Inc → pencil on the specific row → Description box (last field).`

### 3a. Earlier position — Software Developer · Apr 2022 – Aug 2025

**997 characters.** This is the heavier block — it holds the full-stack backend proof (bullet 2).

```
Full-stack developer across US-based enterprise SaaS products in HR, healthcare and cloud infrastructure, working directly with US clients in Agile teams.

• Built data-heavy single-page apps in React and TypeScript: multi-tenant dashboards, large Redux Toolkit state, reusable typed component libraries and custom hooks adopted across each product.
• Built Node.js and Express REST APIs and data-ingestion services, pulling AWS data (EC2, EBS, S3, CloudWatch via STS cross-account roles) into PostgreSQL, plus the typed client layers that consume them.
• Integrated AI into a production clinical product: an OpenAI-backed, queue-driven generation pipeline with write-back into third-party practice-management software.
• Implemented role-based access control (RBAC) across roles, tenants and subscription state, gating both routing and in-page actions.
• Built data-visualization layers (charts, gauges, geo maps) on ECharts and Recharts, and cut redundant API calls ~50% with request debouncing.
```

### 3b. Latest position — Senior Software Developer · Aug 2025 – Present

**948 characters.** Senior framing through IC ownership (architecture, standards, client delivery) — no
people-management claim, because that isn't backed by your record.

```
Senior developer on a US-based enterprise platform, owning front-end architecture and delivery in direct partnership with the US client.

• Own the front-end architecture of a large enterprise platform, shipping React features as independently-mounted SPA bundles inside a legacy .NET monolith, migrating off legacy pages while holding IE11 support.
• Built a real-time operations dashboard (Redux + SignalR) with auto-reconnect and state recovery, tracking live activity across the platform.
• Built the shared component library — form fields, virtualized selects, advanced data grid, map views — reused across every module.
• Set front-end resilience and observability standards: layered React error boundaries with stack-trace logging, and Google Analytics 4 instrumentation for per-page drop-off visibility.
• Drive delivery directly with the US client in Agile: requirements, design sessions, demos, sprint ceremonies and release coordination.
```

Every bullet in both blocks is fact-bank clean: no "hydration layer", no "code-splitting", no bundle %, no
CWV score, no TanStack Query — all of which were banned in your 2026-07-24 audit. The only quantified claim
is the ~50% API-call cut via debouncing, the one metric that survived the audit.

### 3c. Fix the ThinkSys Website row (leave it, one edit)

Keep it — it's your only professional Next.js reference. Fix only the formatting: the first bullet is
missing its `•` and runs into the second ("...performance.• Implemented..."). Don't expand it.

---

## 4. Projects section — delete it, and do NOT link company projects

You wanted no company projects on the profile, so the whole Projects section goes.

**EXACT PATH:** `Profile → Projects section → pencil → on each entry, "Delete project".`

**Delete all four current entries:**
- CloudForestX — folded into Experience (§3a), now nameless.
- MyWorkMyDay — folded into Experience (§3a), now nameless.
- **Replica_of_LinkedIn.com** (Masai clone) — delete. Bootcamp clones are junior signal on a senior profile.
- **cb2.com Website Clone** (Masai clone) — delete, same reason.

**Do NOT add the company project websites.** CloudForestX / MyWorkMyDay / DentScribe are enterprise SaaS
behind a login — the link would hit an auth wall or 404, which reads as padding, and some are
client-confidential. A dead link is worse than no link.

**Your own products go in Featured, not here (§7.4).** GradeJar, JsonBeam and your portfolio are public,
live and yours to show — Featured renders them as big visual cards under About. Once the four entries above
are deleted, the Projects section is empty and LinkedIn hides it automatically.

---

## 4b. Featured card copy (your own products)

**EXACT PATH:** `Add profile section → Recommended → Add featured → "+" → Add a link → paste URL → fill Title + Description → Save.`

Same stack across both (Astro + TypeScript + Cloudflare Workers), so the copy differentiates on
**architecture and problem**, not tooling — JsonBeam is a *stateless* privacy/speed tool, GradeJar is a
*stateful* local-first app. Their "Core:" lines deliberately do not overlap. Featured cards truncate after
~2 lines, so sentence one carries the differentiator.

**JsonBeam** — `https://jsonbeam.com`
- Title: `JsonBeam — Fast, Private, Ad-Free JSON Formatter & Validator`
- Description:
```
A fast, ad-free JSON workbench that formats, validates and inspects JSON entirely in the browser — nothing is ever uploaded to a server. Built static-first with Astro and TypeScript and served from Cloudflare's edge, so it loads in under a second. Core: client-side parsing, edge deployment, Core Web Vitals, zero backend.
```

**GradeJar** — `https://gradejar.com`
- Title: `GradeJar — Local-First Gradebook for Teachers`
- Description:
```
A local-first gradebook for teachers: rosters, assignments and custom weighted grading scales that calculate in real time and save on the device — no login, no backend, so student data never leaves the browser. Built with Astro and TypeScript on Cloudflare's edge. Core: local-first state, browser persistence, client-side data modeling, offline-capable UI.
```

**Portfolio** — `https://tarunahirwar.com`
- Description:
```
My portfolio — selected projects, the products I've built end to end, and how to reach me.
```

---

## 5. Skills — full-stack, pinned, cleaned

Your Skills list (screenshot) is cluttered with low-signal entries. Fix the top 3, add backend, remove junk.

**EXACT PATH to reorder:** `Profile → Skills → pencil → drag handles.` **Top 3 = your "Top Skills".**
**EXACT PATH to add:** `Profile → Skills → "+" → "Add skill" → type → pick the dropdown suggestion (never free text).`

**Pin these as slots 1-2-3** (front-end + backend together = the full-stack signal):

```
React.js
TypeScript
Node.js
```

**DELETE these — low-signal or off-target for a full-stack engineer** (from your screenshot):

```
Team Facilitation
Certified Salesforce.com Developer
Audio Transcription
Redesigning
Data Aggregation
Technology Education
Semantic HTML
AWS CloudFormation
Open API
User Management
```

**DELETE these too if present — every one was banned by your 2026-07-24 audit:**

```
Zustand
TanStack Query
React Query
React Testing Library
NestJS
```

**ADD any of these you're missing** (all fact-bank verified, backend-forward for full-stack):

```
Express.js
PostgreSQL
Redux Toolkit
REST APIs
Next.js
Vue.js
Sequelize
Socket.IO
SignalR
Material-UI (MUI)
Tailwind CSS
ECharts
Astro
Large Language Models (LLM)
OpenAI API
Model Context Protocol (MCP)
AI-Assisted Development
Amazon Web Services (AWS)
Git
Agile Methodologies
```

**One step most people skip:** on each skill, use **"Show we you used this skill"** and attach it to the
**ThinkSys Inc** position. Skills bound to an experience entry weigh more in LinkedIn Recruiter search.

---

## 6. Pre-software roles + Education (unchanged from v3 — quick recap)

- **2017–2021 roles (Everest Kanto, BPCL, Euro India):** keep the entries (deleting them opens a gap), but
  cut each description to one line. Fix the date overlap — Everest Kanto (Mar 2021 – Oct 2021, Gandhidham)
  and BPCL Maintenance (Nov 2020 – Oct 2021, Rajkot) show two full-time jobs in two cities at once.
- **Education:** you have four entries; two are duplicates. Keep **Masai School** (set dates Jul 2021 – Apr
  2022) and **Marwadi University → B.Tech, Mechanical Engineering, Aug 2013 – Jul 2017** (leave Grade
  blank). Delete the duplicate Masai row and the all-caps "MARWADI EDUCATION FOUNDATIONS… BE" row (wrong
  entity, and BE contradicts the B.Tech on your CV).

---

## 7. Settings

| # | What | EXACT PATH | Do this |
|---|---|---|---|
| 1 | **Open to work, recruiters only** | top card → **"Open to"** → **"Finding a new job"** | Set **"Choose who sees you're open"** to **"Recruiters only"** — no green banner your manager sees. Titles: `Senior Full Stack Developer`, `Senior Software Developer`, `Full Stack Engineer`, `Senior React Developer`. Locations: `Noida`, `Delhi NCR`, `Remote (India)`. |
| 2 | **Portfolio link at top** | Contact info → pencil → Website → Add | `https://tarunahirwar.com`, Type **"Portfolio"** (see Fix A above). |
| 3 | **GitHub link** | Contact info → pencil → Website → Add | `https://github.com/AhirwarTarun27`, Type "Other", label "GitHub". Your export has no GitHub link. |
| 4 | **Featured (portfolio + products)** | "Add profile section" → "Recommended" → "Add featured" → "+" → "Add a link" | The three links from Fix B. This replaces the deleted Projects section as where your own work shows. |
| 5 | **Location** | top card → pencil → Location | Set **Noida, Uttar Pradesh** for city-level recruiter hits (keeps "Greater Delhi Area" as region). |
| 6 | **Certifications** | Licenses & certifications → pencil per row | **Delete "Basic Computer Course."** Keep GitHub Copilot (Udemy) and Edchart React (Credly); add their credential URLs. |
| 7 | **Recommendations** | "Add profile section" → "Recommended" → "Request a recommendation" | You have zero. Ask two people you actually worked with. |

> **Boundary:** Featured links and a portfolio URL are career evidence and in scope. Writing LinkedIn
> *posts* promoting GradeJar or JsonBeam is product marketing and stays off LinkedIn per `connections.md`.

---

## 8. Execution order (~35 minutes)

1. **Open to work → Recruiters only** (§7.1). 2 min. Highest leverage.
2. **Headline** (§1). 1 min.
3. **About** (§2). 2 min.
4. **Paste both Experience descriptions; fix the title word (Developer vs Engineer)** (§3). 6 min.
5. **Delete the Projects section — all four entries** (§4). 3 min.
6. **Featured: 3 links; Contact info: portfolio type + GitHub** (§7.2-7.4). 5 min.
7. **Skills: fix top 3, delete the junk + banned, add backend** (§5). 8 min.
8. **Trim pre-software descriptions, fix 2021 date overlap; Education cleanup** (§6). 6 min.
9. **Delete "Basic Computer Course"; request 2 recommendations** (§7.6-7.7). 2 min.

---

## 9. Still open for `master.tex` / `fact-bank.md` (not blocking LinkedIn)

- **`fact-bank.md` synonym table is stale** (lines 179-187, 230): still maps JD terms to Zustand, TanStack
  Query, React Testing Library and code-splitting — all banned above it in the same file. `/cv-tailor`
  reads that table, so it will re-introduce banned terms until it's fixed. Say the word and I'll repair it.
- **`master.tex` older than the compiled PDF** (they match today, but sync the `.tex` if you edit in Overleaf).
