# LinkedIn Profile Revamp — 2026-07-24

> Source: `Downloads/Profile.pdf` (LinkedIn export, 4 pages) checked line-by-line against
> `references/cv/master.tex`, `references/cv/fact-bank.md` and `learning/cv-defense/defend-map.md`.
> Nothing below invents a fact. Every new string traces to the CV or to what your own profile already claims.
>
> **Scope note:** a PDF export does not contain your photo, banner, recommendations, activity feed or
> connection count. Those need a visual check on the live profile. Everything else is covered here.

---

## Verdict

Your CV was rebuilt on 2026-07-23. Your LinkedIn was not. It is now the weaker document and it
**contradicts the CV in six places**. Recruiters open both. Conflicts read as sloppiness at best and
padding at worst.

The three biggest content problems:

1. **Two of your four projects do not exist on LinkedIn.** Dwellworks (your current, flagship, team-of-12
   project) and DentScribe (your only AI product) are missing entirely. Your About section names only
   CloudForestX and MyWorkMyDay.
2. **Zero AI keywords anywhere.** No LLM, no OpenAI, no GenAI, no agents, no MCP, no AI-assisted
   development. Your CV leads with all of it. Recruiters filter on those terms now, and you are invisible
   to that filter.
3. **Two metrics on LinkedIn are not on your CV and cannot be defended** ("improving operational
   efficiency by 40%", "increasing user engagement by 35%"). Reusable components do not cause a 35%
   engagement lift. That is the kind of line that dies in an interview.

---

## P0 — conflicts to reconcile BEFORE editing anything else

These are facts, not copy. Only you know which side is true. Pick one value and make it identical in
LinkedIn, `master.tex` and `fact-bank.md`.

| # | Field | LinkedIn says | CV says | Action |
|---|---|---|---|---|
| 1 | **ThinkSys title + dates** | Software Engineer Apr 2022 → Aug 2025, then **Senior** Software Engineer Aug 2025 → Present | **Senior Software Developer, Apr 2022 – Present** | The CV implies you have been Senior for 4 years. LinkedIn says 11 months. **Fix the CV** — split it into two roles and show the promotion. A promotion is a positive signal; a mismatch is a red flag. |
| 2 | **Title wording** | Senior Software **Engineer** | Senior Software **Developer** | Pick one string and use it everywhere. Recommend **Engineer** (higher search volume, and it is what LinkedIn already records). |
| 3 | **CloudForestX bundle cut** | **35%** | **40%** | One number. Defend-map already flags this row 🔴. If you cannot reconstruct it from the Webpack analyzer, drop the percentage on both and say "cut initial bundle size and reached 95+ Core Web Vitals". |
| 4 | **Degree** | Bachelor of **Engineering (BE)** | Bachelor of **Technology (B.Tech)** | Whatever the certificate says. This one gets verified in background checks. |
| 5 | **Masai School dates** | Sep 2021 – Mar 2022 | Jul 2021 – Apr 2022 | Pick one. |
| 6 | **Overlapping jobs (2021)** | Everest Kanto: **Mar 2021 – Oct 2021** (Gandhidham) *and* BPCL Maintenance Engineer: **Nov 2020 – Oct 2021** (Rajkot) | not on CV | Two full-time jobs in two cities for 8 months. This is a data error on LinkedIn. Fix the dates. |

---

## 1. Headline

**WHERE:** Profile → pencil icon on the top card ("Edit intro") → **Headline** field.
**LIMIT:** 220 characters.

**Current (142 chars):**
> SDE II – Fullstack Web Developer | 4+ Years | React.js, Next.js, Nodejs, AWS, TypeScript | Scalable Web Apps | Core Web Vitals & Accessibility

**What is wrong:**
- **"SDE II"** is not your title. LinkedIn's own Experience section says Senior Software Engineer.
  Nobody searches "SDE II" and it reads a rung *below* Senior.
- **"Nodejs"** is misspelled. LinkedIn keyword matching is literal. Use "Node.js".
- **AWS sits in position 4 of your skill list.** Fact-bank flags AWS 🟡 and the cost engine 🔴. A headline
  that advertises AWS invites AWS-depth questions you have decided not to claim.
- **No AI keywords at all.**
- "Scalable Web Apps" is filler that no one searches.

**PASTE THIS (191 chars, fits):**

```
Senior Software Engineer at ThinkSys | Full-Stack: React.js, TypeScript, Next.js, Node.js | 4+ yrs enterprise SaaS | LLM integration & AI-assisted development | Core Web Vitals, Accessibility
```

**Frontend-leaning variant** (use this one if you are targeting Senior Frontend titles specifically, 198 chars):

```
Senior Frontend-Focused Full-Stack Engineer | React.js, TypeScript, Next.js, Vue.js, Node.js | 4+ yrs building enterprise SaaS at ThinkSys | LLM integration, AI-assisted dev | Web Performance & a11y
```

**Do NOT put "open to work" in the headline.** Your employer sees your profile. Use the recruiter-only
switch in section 9 instead.

---

## 2. About

**WHERE:** Profile → **About** section → pencil icon.
**LIMIT:** 2,600 characters. The draft below is 1,998, so you have ~600 spare.
**FORMAT:** plain text only. No markdown, no bold. Line breaks survive, bullet characters (•) survive if
you paste them literally. The first ~3 lines show before "…see more", so the first two sentences do the work.

**What is wrong with the current one:**
- Names only CloudForestX and MyWorkMyDay. Dwellworks and DentScribe are absent.
- Calls them "two major internal Thinksys projects" — Dwellworks and DentScribe are client products,
  and framing your work as internal-only shrinks it.
- Says "SQL". The searched term is **PostgreSQL**.
- No AI, no LLM, no MCP, no agents.
- No side projects, so the two live products you own are invisible.
- "Senior Software Developer" here vs "SDE II" in the headline. Two titles on one screen.

**PASTE THIS:**

```
Senior Software Engineer at ThinkSys. 4+ years in the JavaScript ecosystem (React.js, Next.js, Vue.js, TypeScript, Node.js), building data-heavy enterprise SaaS end to end.

I work across the stack and I am strongest on the front end: turning complex, multi-tenant product surfaces into fast, typed, accessible React applications, backed by Node.js and PostgreSQL service layers.

What I have shipped at ThinkSys:

Enterprise corporate relocation platform (team of 12). Owned the front end, delivering 20+ feature modules in React and Vue.js, real-time notifications and in-app messaging over SignalR, and a legacy-to-React migration behind a server-to-client hydration layer.

CloudForestX (team of 6). Built the React and TypeScript SPA that turns cost data from 200+ enterprise AWS accounts into real-time analytics dashboards, including the charts, gauges and geo-map layer, and contributed the Node.js and PostgreSQL endpoints that serve it.

DentScribe (team of 10). Built the portal for an AI-powered dental documentation SaaS: reviewing and signing AI-generated SOAP notes, the report editor with perio charting, the appointment calendar, and the admin portal with per-model AI cost tracking.

MyWorkMyDay (team of 7). Built the core surfaces of an HR SaaS serving 20+ business clients: employee dashboard, payroll processing and analytics, with role-based access control (RBAC).

On the AI side: Large Language Model (LLM) integration, OpenAI API, AI agents and agentic workflows, Model Context Protocol (MCP), prompt and context engineering, and AI-assisted development every day (Claude Code, GitHub Copilot certified).

Outside work I ship my own products end to end. GradeJar (a local-first gradebook for teachers) and JsonBeam (a fast, ad-free JSON formatter), both static-first on Astro and Cloudflare Workers, built for sub-second loads and search visibility.

Happy to talk front-end architecture, web performance, or building with LLMs.

ahirwartarun095@gmail.com
```

**Optional last line** (only if you are willing to let ThinkSys see it):

```
Currently open to Senior Frontend and Full-Stack engineering roles.
```

Recommendation: leave it out. The recruiter-only setting in section 9 reaches recruiters without
announcing it internally.

---

## 3. Experience — ThinkSys

**WHERE:** Profile → **Experience** → pencil on each position → **Description** field.
**LIMIT:** 2,000 characters per position description.

You have two positions under ThinkSys Inc. Keep both (the promotion is a good signal). The project blocks
below go into the **Description** of the position whose dates actually cover that project. Dwellworks is
your current project, so it goes under **Senior Software Engineer**. Place the others where they belong;
do not guess the dates.

**The 2,000-character ceiling forces the split.** Measured:

| Block | Chars | Goes where |
|---|---:|---|
| Dwellworks | 912 | **Senior Software Engineer** description |
| DentScribe | 893 | **Senior Software Engineer** description |
| | **1,805** | fits, ~195 spare |
| CloudForestX | 1,014 | **Software Engineer** description |
| MyWorkMyDay | 666 | **Software Engineer** description |
| | **1,680** | fits, ~320 spare |
| ThinkSys Website | 592 | **does not fit** in either. Move it to the **Projects** section (section 7) instead. |

If your real project dates put a different pair together, check the totals before pasting: any two of
Dwellworks, CloudForestX and DentScribe together clear 1,800 and leave almost no room for a third.

### 3.0 Which project names are safe to publish (researched 2026-07-24)

The confidentiality question applies to **one** of your four projects, not all four. Evidence:

| Project | Status | Evidence | Verdict |
|---|---|---|---|
| **CloudForestX** | ThinkSys's **own product** | `cloudforestx.com` is a live commercial site with public pricing; contact is `cloudops@thinksys.com`, Noida | **Name it.** |
| **MyWorkMyDay** | ThinkSys's **own product** | `myworkmyday.com` public product with pricing tiers; Google Play package ID `com.thinksys.tsbuddy` | **Name it.** |
| **DentScribe** | Client, **publicly claimed by ThinkSys** | listed by name on `thinksys.com/clients`; DentScribe.ai is a public company with PR Newswire launches | **Name it.** ThinkSys published the relationship first. |
| **Dwellworks** | Client, **not publicly attributed** | absent from `thinksys.com/clients`; no public ThinkSys-Dwellworks link found | **Anonymize on LinkedIn.** Keep the name on the CV. |

**The rule:** is it already public, and who made it public? Your employer's own product, or a client your
employer already advertises, is free to name. A client nobody has publicly linked to your employer is not.

**CV vs LinkedIn are different risk surfaces.** The CV goes privately to one recruiter, so name all four.
LinkedIn is public, indexed, permanent and visible to your manager. Same facts, two disclosure levels.
That is not the kind of inconsistency the P0 table is about.

**"(internally, Odin)" comes out everywhere, including `master.tex` line 201.** An internal codename has
zero recruiter value, cannot be looked up, and is the one detail that reads as inside information rather
than portfolio.

### 3a. Fix first: the two blank project headers

Your current Software Engineer description shows **two project blocks with no name** (they export as
`(   )` and `(  )` — most likely emoji or special characters that did not render). A recruiter reading
the PDF version of your profile sees an unnamed project. Retype those headers as plain text.

### 3b. Dwellworks — MISSING, add it

Put this under **Senior Software Engineer**:

**Use this version on LinkedIn** (anonymized per 3.0, no client name, no internal codename):

```
Enterprise Corporate Relocation & Destination Services Platform | Team of 12

An enterprise corporate-relocation platform that manages an employee's entire international move, from home and school finding through lease, visa, tenancy and departure.

• Owned the platform's front end, the flagship relocation app, delivering 20+ feature modules in React and Vue.js.
• Managed application state (Redux, React Hooks) and the Axios data layer powering every screen.
• Built a server-to-client hydration layer and migrated legacy server-rendered pages into componentized React.
• Delivered real-time notifications and in-app messaging with SignalR for consultants and relocating families.
• Optimized a large legacy front end with Webpack code-splitting and cross-browser support down to Internet Explorer 11 (IE11).

Tech: React, Redux, Vue.js, TypeScript, JavaScript (ES6+), Webpack, SignalR, REST APIs
```

**Named version — CV only** (`master.tex`, sent privately to a recruiter). Note "(internally, Odin)" is
gone from this one too:

```
Dwellworks | Corporate Relocation & Destination Services Platform | Team of 12

An enterprise corporate-relocation platform that manages an employee's entire international move, from home and school finding through lease, visa, tenancy and departure.

• Owned the platform's front end, the flagship relocation app, delivering 20+ feature modules in React and Vue.js.
• Managed application state (Redux, React Hooks) and the Axios data layer powering every screen.
• Built a server-to-client hydration layer and migrated legacy server-rendered pages into componentized React.
• Delivered real-time notifications and in-app messaging with SignalR for consultants and relocating families.
• Optimized a large legacy front end with Webpack code-splitting and cross-browser support down to Internet Explorer 11 (IE11).

Tech: React, Redux, Vue.js, TypeScript, JavaScript (ES6+), Webpack, SignalR, REST APIs
```

### 3c. DentScribe — MISSING, add it

This is your entire AI credibility on LinkedIn. Right now it does not exist there.

```
DentScribe | AI-Powered Dental Documentation Platform | Team of 10

An AI-powered healthcare SaaS for dental practices that converts patient visits into signed SOAP notes and writes them back into the practice management software, saving 40-50 minutes per visit.

• Built the portal surface for reviewing and signing AI-generated SOAP notes, from recording to PMS writeback.
• Developed the SOAP report editor with dynamic sections, inline find-and-replace editing, and perio charting.
• Delivered the appointment calendar with operatory filtering and a multi-stage review workflow.
• Shipped the admin portal for user and subscription management, trials, and per-model AI cost tracking.
• Structured the portal on 10 Redux Toolkit slices with role-gated routing and global 401 auth middleware.

Tech: React, Redux Toolkit, TypeScript, Material-UI (MUI), NestJS, PostgreSQL, AWS S3, OpenAI API
```

### 3d. CloudForestX — rewrite

Your current version is missing three of the six things your CV credits you with (the data-viz layer,
onboarding flows and global filtering, the idle-detection and rightsizing UI), and it uses 35% where the
CV uses 40%. **The block below uses 40% to match `master.tex`. If 35% is the real number, change it here
AND in `master.tex`.**

```
CloudForestX | Cloud Cost Optimization Platform | Team of 6

A multi-tenant cloud cost optimization platform for AWS, managing 200+ enterprise accounts with cost visualization, idle and unused resource detection, rightsizing, and reservation recommendations.

• Built the React and TypeScript SPA that turns multi-account AWS cost data into real-time analytics dashboards.
• Developed the data-visualization layer (charts, gauges, geo maps) from Figma as responsive React components.
• Created account-onboarding flows and global account and date-range filtering across the dashboard.
• Contributed Node.js and PostgreSQL API endpoints that aggregate and serve cloud cost data to the front end.
• Cut initial bundle 40% and reached 95+ Core Web Vitals via code-splitting, lazy loading and TanStack Query.
• Shipped the idle-detection and rightsizing UI surfacing savings across EC2, Lambda, EFS and S3.

Tech: React, TypeScript, Redux, Zustand, Context API, TanStack Query, Axios, Webpack, Node.js, PostgreSQL, AWS
```

### 3e. MyWorkMyDay — rewrite (removes two undefendable metrics)

Delete "improving operational efficiency by 40%" and "increasing user engagement by 35%". Neither is on
your CV, neither has a mechanism, and the second one is not causally possible from building reusable
components. Replace with the CV's numbers, which have a mechanism behind them.

```
MyWorkMyDay | HR Management System | Team of 7

An HR management SaaS serving 20+ business clients with employee management, payroll processing and performance analytics.

• Built the platform's core surfaces: employee dashboard, payroll processing, and analytics views.
• Created reusable, typed React components and custom hooks for form validation and data fetching.
• Implemented role-based access control (RBAC) with authentication and authorization across user roles.
• Cut API calls 50% and load time from 3.2s to 1.1s with debounced search and memoization (React.memo, useMemo).

Tech: React, React Hooks, Redux, TanStack Query, Material-UI (MUI), TypeScript
```

### 3f. ThinkSys Website — keep it, but move it to Projects

Two bugs in the live copy: the first bullet has no `•`, and the second one is glued to the end of the
first sentence ("...page load time and performance.• Implemented..."). More importantly, **it no longer
fits** in a position description once CloudForestX and MyWorkMyDay are in there. Cut it from the position
description and add it as a **Projects** entry (section 7, Project 3).

Do not drop it. **This is the only Next.js work in your professional record** (defend-map lists Next.js
grounding as "portfolio + ThinkSys site, verbal only"), and it is what backs the Next.js keyword in your
headline. Consider adding it to `master.tex` too.

```
ThinkSys Website | Corporate Website

Corporate website for a software development and QA services company delivering end-to-end engineering solutions.

• Developed a responsive Next.js website with server-side rendering (SSR) and optimized React Query caching, improving page load time and performance.
• Implemented SEO best practices including dynamic meta tags, structured data and semantic HTML for improved search visibility.
• Collaborated with designers to translate Figma designs into pixel-perfect, reusable React components using SCSS.

Tech: Next.js, React, React Query, SCSS, SEO
```

---

## 4. Experience — the pre-software roles (2017-2021)

**WHERE:** Profile → Experience → pencil on each of: Everest Kanto Cylinder LTD, Bharat Petroleum
Corporation Limited (both positions), Euro India Cylinders LTD.

**Keep the entries** (deleting them creates an unexplained 2017-2021 gap), but **cut the descriptions to
one line each.** Right now page 3 of your exported profile is dominated by cathodic protection, effluent
treatment plants and ultrasonic testing. A recruiter skimming sees more mechanical engineering text than
software text, and LinkedIn's search relevance reads all of it.

Replace each long paragraph with a single line:

**Everest Kanto Cylinder LTD — Production Engineer**
```
Production engineering role in cylinder manufacturing, prior to transitioning into software development in 2021.
```

**Bharat Petroleum Corporation Limited — Maintenance Engineer**
```
Maintenance engineering for plant equipment and safety systems, prior to transitioning into software development in 2021.
```

**Bharat Petroleum Corporation Limited — Engineering Apprentice**
```
Graduate engineering apprenticeship across production, planning, maintenance and safety.
```

**Euro India Cylinders LTD. — Production Supervisor**
```
Supervised seamless carbon-steel cylinder production, including CNC spinning operations and online ultrasonic quality-control inspection.
```

And **fix the P0 #6 date overlap** while you are in there.

---

## 5. Skills

**WHERE:** Profile → **Skills** section → pencil (Edit). The **top 3 in this list** are what render as
"Top Skills" on your profile and in the PDF export. Drag to reorder.

**Currently pinned:** AWS Lambda · Team Facilitation · React Hooks

All three are wrong for your target role:
- **Team Facilitation** is not a keyword any engineering recruiter filters on. Demote it.
- **AWS Lambda** in slot 1 advertises the exact area fact-bank flags 🟡/🔴. It invites AWS-depth
  questions in exchange for a keyword you do not want to be found by.
- **React Hooks** is a subset of React.js. React.js is the term recruiters search.

**Set slots 1-2-3 to:**

```
React.js
TypeScript
Node.js
```

**Then add every one of these that is missing** (LinkedIn caps at 50; all of these are in the fact-bank
allow-list, so nothing here overclaims):

```
Next.js
Vue.js
JavaScript
Redux.js
Redux Toolkit
Zustand
React Query (TanStack Query)
React Hooks
Astro
HTML5
CSS3
PostgreSQL
REST APIs
SignalR
WebSockets
Material-UI (MUI)
Tailwind CSS
SASS/SCSS
Responsive Web Design
Webpack
Vite
Git
Core Web Vitals
Web Performance Optimization
Bundle Optimization
Search Engine Optimization (SEO)
Web Accessibility (WCAG)
ARIA
React Testing Library
Vitest
Large Language Models (LLM)
OpenAI API
Prompt Engineering
AI Agents
Model Context Protocol (MCP)
AI-Assisted Development
GitHub Copilot
Cloudflare Workers
Docker
Agile Methodologies
Single Page Applications (SPA)
```

**One more step that most people skip:** for each skill, use "Show we you used this skill" and attach it
to the **ThinkSys Inc** position. Skills attached to an experience entry weigh more in LinkedIn Recruiter
search than floating skills do.

---

## 6. Featured section — ADD (does not exist today)

**WHERE:** Profile → **Add profile section** → **Recommended** → **Add featured** → **Add a link**.

Add four links, in this order:

| Order | URL | Title | Description |
|---|---|---|---|
| 1 | `https://tarunahirwar.com` | Portfolio — Tarun Ahirwar | Front-end engineering work, case studies and shipped products. |
| 2 | `https://gradejar.com` | GradeJar — local-first gradebook for teachers | No-login, browser-persisted gradebook with rosters, assignments and custom grading scales. Astro, TypeScript, Cloudflare Workers, zero backend. |
| 3 | `https://jsonbeam.com` | JsonBeam — fast, ad-free JSON formatter | Static-first JSON formatter and validator built for sub-second loads and search visibility, deployed on the edge. |
| 4 | `https://github.com/AhirwarTarun27` | GitHub | Source for my personal products and experiments. |

> **Boundary check:** listing your own shipped products on your profile is career evidence and it is in
> scope for the job hunt. Writing *posts* on LinkedIn to promote GradeJar or JsonBeam is product
> marketing, and that stays off LinkedIn per `connections.md`. Featured links yes, promo posts no.

---

## 7. Projects section — ADD (does not exist today)

**WHERE:** Profile → **Add profile section** → **Additional** → **Add projects**.

**Project 1**
- Name: `GradeJar`
- URL: `https://gradejar.com`
- Description:
```
Local-first gradebook web app for teachers. A no-login, browser-persisted gradebook with rosters, assignments and custom grading scales, running entirely client-side with zero backend. Built static-first for fast loads and search visibility. Tech: Astro, TypeScript, Cloudflare Workers.
```

**Project 2**
- Name: `JsonBeam`
- URL: `https://jsonbeam.com`
- Description:
```
Fast, ad-free JSON formatter and validator. Built static-first for sub-second loads and search visibility, deployed on the edge. Tech: Astro, TypeScript, Cloudflare Workers.
```

**Project 3** (moved out of the Experience description, see 3f)
- Name: `ThinkSys Corporate Website`
- Associated with: your **ThinkSys Inc** position
- Description:
```
Corporate website for a software development and QA services company delivering end-to-end engineering solutions.

• Developed a responsive Next.js website with server-side rendering (SSR) and optimized React Query caching, improving page load time and performance.
• Implemented SEO best practices including dynamic meta tags, structured data and semantic HTML for improved search visibility.
• Collaborated with designers to translate Figma designs into pixel-perfect, reusable React components using SCSS.

Tech: Next.js, React, React Query, SCSS, SEO
```

---

## 8. Education — delete duplicates, fix the entries

**WHERE:** Profile → **Education** → pencil on each entry, or the "..." → Delete.

Your export shows **four** education entries where there should be two (plus school). Two are duplicates:

| Entry as it appears now | Action |
|---|---|
| Masai School — Full-Stack Web Development, Computer Software Engineering (Sep 2021 - Mar 2022) | **KEEP.** Fix dates per P0 #5. |
| Masai — Full Stack Web Development (no dates) | **DELETE** (duplicate, and the wrong school entity). |
| MARWADI EDUCATION FOUNDATIONS GROUP OF INSTITUTIONS-FACULTY OF TECHNOLOGY, RAJKOT-097 — Bachelor of Engineering - BE (2013 - 2017) | **DELETE.** Wrong entity page, screaming caps, and the degree conflicts with your CV. |
| Marwadi University — Bachelor of Technology (no dates) | **KEEP and complete it.** Add dates `2013 - 2017`, degree per P0 #4, field of study `Computer Engineering` (or whatever the certificate says), and Grade `7.15 / 10`. |
| Guru Nanak School For Excellence — Science (2012 - 2013) | Keep or delete. Harmless either way. |

Keeping the clean **Marwadi University** and **Masai School** entities matters: those are the pages
alumni-search and recruiter filters run against.

**Masai School — add a description** (matches your CV, which currently has three bullets LinkedIn does not):

```
• Specialized in the MERN stack and JavaScript ES6+, with hands-on delivery of 11+ major and minor projects.
• Built end-to-end solutions across frontend, backend, databases and deployment.
• React, React Hooks, Node.js, Express, MongoDB, REST APIs, Git and Agile workflows.
```

---

## 9. Settings and switches

**WHERE:** each path below starts from your profile page.

| # | Setting | Where | Do this |
|---|---|---|---|
| 1 | **Open to work — recruiters only** | Profile top card → **Open to** → "Finding a new job" | Set visibility to **"Recruiters only"**, NOT "All LinkedIn members". This is the single highest-leverage switch for an active-but-quiet switch. It puts you in LinkedIn Recruiter's "Open to Work" filter without a green banner your manager can see. Job titles: `Senior Software Engineer`, `Senior Frontend Engineer`, `Full Stack Engineer`, `Senior React Developer`. Locations: `Noida`, `Delhi NCR`, `Remote (India)`. |
| 2 | **GitHub link** | Contact info (under your headline) → pencil → **Add website** | Your export has portfolio + LinkedIn but **no GitHub**. Add `https://github.com/AhirwarTarun27`, label it "Portfolio" type or Other → "GitHub". |
| 3 | **Location** | Edit intro → Location | "Greater Delhi Area" works. If you want Noida-specific recruiter hits, set city to **Noida, Uttar Pradesh**. |
| 4 | **Custom URL** | Right rail → "Edit public profile & URL" | Already clean: `linkedin.com/in/ahirwartarun`. No change. |
| 5 | **Recommendations** | Profile → Add profile section → Recommended → Request a recommendation | Your export shows **zero**. Ask two people you have actually worked with (a lead and a peer). Two specific ones beat ten generic ones. |
| 6 | **Certifications cleanup** | Profile → Licenses & certifications → pencil per entry | **Delete "Basic Computer Course"** — it drags the section down. Keep GitHub Copilot, Edchart React SME, TypeScript Essential Training. Add the credential URLs from your CV: Udemy `https://www.udemy.com/certificate/UC-4d935bc7-5184-4be5-8d5c-2b3e0b28234c/` and Credly `https://www.credly.com/badges/7f477dfd-f09a-48e3-b867-777bd44cde19/linked_in_profile`. |
| 7 | **Photo + banner** | Not visible in a PDF export | Check by eye: a clear headshot and a plain banner. If the banner is the LinkedIn default blue, replace it. |

---

## 10. Execution order (about 45 minutes)

Do it in this order. Each step is independent, so you can stop anywhere.

1. **Open to work → Recruiters only.** 2 minutes. Highest leverage on the page.
2. **Headline.** 1 minute. Paste from section 1.
3. **About.** 3 minutes. Paste from section 2.
4. **Skills top 3 → React.js, TypeScript, Node.js.** 3 minutes.
5. **Add Dwellworks + DentScribe to Experience.** 10 minutes. This is the biggest content gap.
6. **Rewrite MyWorkMyDay** (kills the two undefendable metrics). 3 minutes.
7. **Rewrite CloudForestX**, fix the two blank project headers, cut ThinkSys Website out of the
   description (it moves to Projects). 8 minutes.
8. **Trim the four pre-software descriptions + fix the 2021 date overlap.** 6 minutes.
9. **Featured section, 4 links.** 5 minutes.
10. **Education cleanup, delete the two duplicates.** 4 minutes.
11. **Add the remaining skills.** 5 minutes.
12. **Projects section, 3 entries** (GradeJar, JsonBeam, ThinkSys Website). 6 minutes.
13. **Certifications: delete "Basic Computer Course", add credential URLs.** 3 minutes.
14. **Request 2 recommendations.** 3 minutes.

---

## 11. Facts only you can confirm

Everything above is safe to paste except where these land. Answer these and the last uncertainty is gone:

1. **Bundle cut: 35% or 40%?** Whichever you can reconstruct. If neither, drop the number from both
   documents. (Defend-map already colors this row 🔴.)
2. **Promotion date: was Aug 2025 the Senior promotion?** If yes, `master.tex` needs a two-role split.
3. **Degree: B.E. or B.Tech?** Match the certificate.
4. **2021: Everest Kanto or BPCL?** The two overlap by 8 months.
5. **ThinkSys Website — was the Next.js/SSR work yours?** If yes it belongs on the CV too, and it is what
   legitimately backs the Next.js keyword in your headline. Currently defend-map calls it "verbal only",
   which means no repo to point at in an interview.

---

## Follow-ups this generates

- `master.tex`: two-role split under ThinkSys (P0 #1), title wording (P0 #2), the bundle number (P0 #3),
  degree name (P0 #4), Masai dates (P0 #5), and possibly a ThinkSys Website entry (#5 above).
- `fact-bank.md` "Immutable set": update the employer line if the two-role split is correct, and the
  degree/dates if they change.
- `learning/cv-defense/defend-map.md`: if the ThinkSys Website work goes on the CV, it needs a row and a
  drill, because right now Next.js has no artifact behind it.
