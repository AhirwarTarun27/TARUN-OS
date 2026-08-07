# Skills Defense — every token on the CV, and what closes it

> **The Skills block is six lines and about 45 tokens. It is the fastest-scanned part of the CV and
> the least defended part of this system.** Until 2026-07-31 it had no drill at all — it sat at tier 5,
> behind three full project deep-drills. This file is the fix.
>
> **Flags are SOURCED from `../../references/cv/fact-bank.md`, never re-derived here.** If the two ever
> disagree, the fact-bank wins and this file is wrong.
> 🟢 built/owns · 🟡 integrated/contributed · 🔴 must be justified carefully.
>
> **Rewritten, not appended.** Drills: **D30-D35**. Read this file only for those sittings.

## Status — what each token needs from you

| Status | Meaning | Work |
|---|---|---|
| **anchored** | You have a file or a live site to point at. | Say one specific sentence and move on. No study. |
| **quick-learn** | The gap is **knowledge**, and a brief plus one real rep closes it. | Do the rep. It's in the queue at the bottom. |
| **honest-scope** | The gap is **production time**, not knowledge. No rep manufactures years. | Rehearse the scoped sentence. It is a good answer, not an apology. |

**The rule that governs this file:** *"I've used it for X, not Y"* beats every bluff. On project bullets
you have ground truth because you were there. On a skills token you crammed last night you have nothing,
and **one caught bluff retroactively discredits the lines you actually own.**

---

## Line 1 — Frontend

| Token | Flag | Anchor | Status | Say |
|---|:--:|---|:--:|---|
| **React.js** | 🟢 | all four projects | anchored | Lead with the 20-bundle Odin architecture or the 40 CloudForestX dashboards. Pick by JD. |
| **Next.js** | 🟡 | `MyProjects/portfolio` (Next 16); ThinkSys site **verbal only** | **quick-learn** | *"My production React is CRA and webpack builds. Next is my own portfolio, so I know the rendering model rather than having run it at scale."* |
| **Vue.js** | 🟢 | Odin legacy surface + the `vue-ctk-date-time-picker` runtime patch | **quick-learn** | *"Vue on the legacy surface of the relocation platform — options API, Vue 2 era. I haven't shipped Vue 3 composition API in production."* |
| **TypeScript** | 🟢 | CloudForestX **470 files / 0 JS**, DentScribe **317 / 0 JS** | anchored | ⚠ **NOT Dwellworks** — Odin has zero `.ts`/`.tsx` and no tsconfig. Never claim TS there. |
| **JavaScript (ES6+)** | 🟢 | everywhere | anchored | — |
| **Redux Toolkit** | 🟢 | CFX `accountSlice`/`monthSlice` + `ALL_VALUE`; DentScribe **10 slices** + `resetStore` | anchored | The global account+month filter is the best story here. |
| **Context API** | 🟢 | Odin `FormContext`, `LoggerContext`; CFX | anchored | Good follow-up: *when Context, when Redux?* — Odin's split answers it. |
| **React Hooks** | 🟢 | `useFetchData` (request-id guard), `useEcharts`, `useGoogleAnalytics` | anchored | Custom hooks, not just `useState`. Say "custom". |
| **Astro** | 🟢 | GradeJar, JsonBeam, AccentWallPlanner, KesariEnterprise — all live | anchored | — |
| **HTML5 / CSS3** | 🟢 | everywhere | anchored | — |

## Line 2 — UI & Visualization

| Token | Flag | Anchor | Status | Say |
|---|:--:|---|:--:|---|
| **Material-UI (MUI)** | 🟢 | DentScribe (incl. MUI X Data Grid), CloudForestX | anchored | — |
| **Tailwind CSS** | 🟢 | personal projects; MyWorkMyDay | anchored | — |
| **SASS / SCSS** | 🟢 *(fact-bank)* | ⚠ **see below** | **quick-learn — weakest token on the block** | *"SCSS on the legacy Razor side of the relocation platform. My React there was plain CSS with `clsx`, and my own projects are Tailwind."* |
| **ECharts** | 🟢 | CloudForestX `useEcharts` + the geo/gauge layer | anchored | — |
| **Recharts** | 🟢 | CloudForestX | anchored | Good follow-up: *why two chart libraries?* Have an answer. |

> ### ⚠ SASS/SCSS — verified 2026-07-31, and it is thinner than the flag suggests
>
> **189 `.scss` files exist in Odin — and per `dwellworks/03` they are on the Razor side, not in his
> React bundles.** Counted directly: **CloudForestX frontend 0 · DentScribe frontend 0 · GradeJar 0 ·
> JsonBeam 0 · AccentWallPlanner 0 · KesariEnterprise 0 · portfolio 0.**
>
> This is the one token on the whole Skills block with **no artifact he can open.** It is also the
> cheapest to close for real — see the queue. **Until the rep is done, use the scoped sentence above and
> do not elaborate.**

## Line 3 — Backend & Data

| Token | Flag | Anchor | Status | Say |
|---|:--:|---|:--:|---|
| **Node.js** | 🟢 | CFX ingestion + Express APIs; DentScribe CRUD/support tier | anchored | Also the live `backend-lab` work. **Never name the DentScribe framework** — say "Node.js and TypeScript REST endpoints." |
| **Express** | 🟢 | CloudForestX | anchored | — |
| **REST APIs** | 🟢 | all | anchored | — |
| **PostgreSQL** | 🟢 | CloudForestX, DentScribe | anchored | — |
| **Sequelize** | 🟢 | CloudForestX models (`AWSRightSizing`, thresholds, inventory) | anchored | — |
| **TypeORM** | 🟢 *(raised 07-29)* | DentScribe `staff-contacts` — **repo has no `.git`** | **quick-learn** | Ownership-scoped queries, clamped pagination, allow-listed sort. Strong material, **one module deep**. Don't imply more. |
| **SignalR** | 🟢 | Odin `controlTowerHub`, `withSignalr` HOC, auto-reconnect | anchored | The refetch-on-reconnect answer is the one they're testing. |
| **Socket.IO** | 🟢 | CloudForestX | anchored | Good follow-up: *SignalR vs Socket.IO?* Transport negotiation + it's a .NET shop. |

## Line 4 — AI & GenAI

| Token | Flag | Anchor | Status | Say |
|---|:--:|---|:--:|---|
| **LLM Integration** | 🟡 | DentScribe — consumed a queue-backed pipeline (`dentscribe/02`) | anchored-with-boundary | Two-call design, S3 prompt archive, the `paused` state. **Then hand back the workers and prompts.** |
| **OpenAI API** | 🟡 | integrated *through* that pipeline; **never called directly** | **quick-learn** | Currently: *"I built against it, I didn't write the calls."* After the rep, that changes honestly. |
| **AI Agents & Agentic Workflows** | 🟢 | TARUN-OS — skills, subagents, this whole system | anchored | **Expect this to be probed** (`defend-map.md`). Answer concretely, never abstractly. |
| **MCP** | 🟢 | `references/mcp/`, Playwright MCP, the install policy | anchored | The doc-MCP-vs-action-MCP policy is a genuinely interesting answer. |
| **Context Engineering** | 🟢 | TARUN-OS read budgets, rewritten-not-appended trackers | anchored | *"Constant cost in month six"* is the phrase. It's real engineering, say it as engineering. |
| **Prompt Engineering** | 🟢 | the skills in this repo | anchored | — |
| **AI-Assisted Development** | 🟢 | Claude Code daily; GitHub Copilot certified (Aug 2025) | anchored | The machine-coding lab — *"I deliberately turned autocomplete off to keep the muscle"* — is a standout answer. Use it. |

## Line 5 — Cloud, Tooling & Practices

| Token | Flag | Anchor | Status | Say |
|---|:--:|---|:--:|---|
| **AWS STS** | 🟢 | CFX `auth.ts` cross-account credential factory, 200+ accounts | anchored | **The strongest AWS thing you own.** Lead with it, not with the service list. |
| **AWS EC2 / S3 / EBS / CloudWatch** | 🟢 | read via SDK in the ingestion service | anchored | *Read* through the SDK. Not "operated." |
| **AWS Lambda** | 🟡 | surfaced in the CFX UI; **never deployed one** | **quick-learn** | Until the rep: *"Lambda showed up in the cost surfaces I built. I haven't shipped one."* |
| **AWS EFS** | 🟡 | idle-EFS detection was **backend**; you rendered the dashboard | **honest-scope** | *"EFS appeared in the waste-detection surfaces. I've never provisioned or run one."* **No rep fixes this.** |
| **The AWS cost/analysis engine** | 🔴 | — | **honest-scope** | The D10 boundary sentence. See `cloudforestx/03` §5. |
| **Cloudflare Workers** | 🟢 | four live sites, domains, go-live automation | anchored | — |
| **Docker** | 🟡 *(fact-bank: "light")* | — | **quick-learn** | Until the rep: *"I can read a Dockerfile and work in a containerised setup. I haven't owned a container build."* |
| **Webpack** | 🟢 | Odin `webpack.common.js`, **20 entry points**, IE11 aliasing | anchored | Very strong. Most candidates have never configured webpack by hand. |
| **Vite** | 🟢 | personal projects | anchored | Good follow-up: *webpack vs Vite?* You've used both, for real, in anger. |
| **Git** | 🟢 | — | anchored | — |
| **Agile Methodologies** | 🟢 | Dwellworks ceremonies, demos, release coordination | anchored | Placed twice deliberately — body text is what scores. |

## Line 6 — Quality & Performance

| Token | Flag | Anchor | Status | Say |
|---|:--:|---|:--:|---|
| **Vitest** | 🟢 | **22 real test files** — GradeJar 2, JsonBeam 6, AccentWallPlanner 10, KesariEnterprise 4 | anchored | *"Neither enterprise codebase had a frontend test culture — Odin has no React tests at all. I test my own projects with Vitest and I'd push for coverage on critical paths anywhere I joined."* **That answer is a credit. Give it confidently.** |
| **Core Web Vitals** | 🟢 | personal projects — Astro static, edge-deployed, GSC-monitored | anchored | ⚠ **The 95+ claim is deleted. Never re-argue it.** Employer projects are not the anchor here. |
| **Bundle Optimization** | 🟢 | personal projects; Odin webpack config | **honest-scope** | ⚠ **The "cut bundle 40%" claim is deleted.** *"I've configured builds and kept my own projects small. I don't have a measured before/after from the enterprise work — that's why it's not on my CV."* Volunteering the deletion is stronger than defending a number. |
| **WCAG / ARIA** | 🟢 | **verified 2026-07-31: 679 aria/role usages** — GradeJar 313, JsonBeam 240, AccentWallPlanner 61, portfolio 37, Kesri 28 | anchored | Genuinely yours. **Lead with GradeJar.** |
| **SEO** | 🟢 | 4 live sites, GSC + Bing + IndexNow onboarding, `scripts/gsc-onboard.mjs` | anchored | You automated it. That's beyond "I know meta tags." |

---

## The quick-learn queue

Ordered by **cost to close**, cheapest first. Several ride the `backend` block or `project` block, so
they cost less than they look. **A row is only marked done when the artifact exists on disk** — read the
file, never accept "done" (`feedback-verify-claimed-fixes`).

| # | Token | The rep | Where | Est. | Done |
|:--:|---|---|---|:--:|:--:|
| 1 | **OpenAI API** | One script that calls the API directly — a real request, a real response, one retry path | scratch or `backend-lab` | 20 min | ☐ |
| 2 | **SASS/SCSS** | A real SCSS layer in one personal project: nesting, variables, one mixin, one partial | GradeJar or portfolio | 30 min | ☐ |
| 3 | **TypeORM** | One entity + one **migration** (the thing DentScribe never had) + an ownership-scoped query | `backend-lab` | 45 min | ☐ |
| 4 | **Docker** | `Dockerfile` + `compose` running Node + Postgres together | `backend-lab` | 1 hr | ☐ |
| 5 | **Vue** | One component in **Vue 3 composition API** — `ref`/`computed`/`watch`, not options API | scratch | 1 hr | ☐ |
| 6 | **Next.js** | Explain `portfolio`'s current rendering strategy out loud, then **add one route in a different mode** and be able to say why | `MyProjects/portfolio` | 1.5 hr | ☐ |
| 7 | **AWS Lambda** | Deploy one Lambda on free tier. Trigger it. See the CloudWatch log. | AWS console | 1.5 hr | ☐ |

**Total: about 6.5 hours across three drill sittings.** Items 3 and 4 are the ones to prioritise if
time compresses — they double as `backend` track work and they're the two an interviewer is most likely
to probe on a full-stack JD.

> **After a rep lands, the token's spoken line changes and this file gets rewritten.** *"I've deployed a
> Lambda on a side project, not run one in production"* is a completely different answer from *"I
> haven't shipped one."* Both are honest. Only one of them is earned.

## The three honest-scope sentences — memorise these, don't improvise them

1. **AWS EFS:** *"EFS showed up in the waste-detection surfaces I built. I've never provisioned or run
   one."*
2. **The AWS cost/analysis engine:** *"I built the surface that shows the recommendation and the
   ingestion that feeds it. I didn't write the analysis in between."*
3. **Bundle optimization:** *"I've configured webpack and Vite builds and I keep my own projects small,
   but I don't have a measured before-and-after from the enterprise work. That's why there's no number
   on my CV — I took one off because I couldn't stand behind how it was measured."*

**#3 is the strongest answer in this entire file.** Volunteering a deleted claim, with the reason, buys
more credibility than any token on the list. Use it when the conversation turns to performance.
