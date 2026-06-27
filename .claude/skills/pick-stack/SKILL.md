---
name: pick-stack
description: Recommend the best framework, libraries, and hosting for a specific front-end-heavy project, optimized for maximum page speed and top SEO. Trigger on "/pick-stack", "what stack for this", "best framework for SEO + speed". Data-driven and practical, tuned to fast solo shipping. One run = one stack recommendation with rationale.
---

# Pick Stack — fastest-loading, best-ranking stack for THIS build

Recommend the stack for a specific project, optimized in priority order for: **(1) page speed, (2) SEO, (3) fast solo shipping, (4) cheap scale to mass traffic.** Front-end-heavy, minimal backend unless the project truly needs it.

Reason from the project, not dogma. But default toward boring, proven, fast.

## Inputs
- The project type + the wedge (from the problem brief): tool/utility, content site, or interactive app?
- What the user already has: this environment ships Cloudflare skills (Workers, Pages, KV, D1, R2) and `web-perf`. Prefer a stack that uses what's already set up.

## Decide across these axes
1. **Rendering strategy** — the SEO + speed lever:
   - Mostly static content/tools → **static-first (SSG)**. Fastest, cheapest, ranks great.
   - Needs per-request/dynamic SEO pages → **SSR / edge rendering**.
   - Pure client tool with one landing page → static shell + client JS, pre-rendered landing for SEO.
2. **Framework** — match the rendering need (e.g. Astro for content/tool sites that should ship minimal JS; Next.js for app-like + SSR/SEO; plain Vite + a light framework for a single-purpose tool). Pick the one that ships the LEAST JS for the job.
3. **UI libraries** — keep the bundle small. Justify every dependency against page speed. Prefer system fonts, minimal CSS, no heavy UI kit unless it earns its weight.
4. **Hosting/CDN** — default **Cloudflare Pages/Workers** (the user is set up for it): global edge, fast TTFB, cheap at scale, US-fast.
5. **Analytics/ads** — note the lightweight, non-blocking way to load Google Analytics + AdSense so they don't wreck Core Web Vitals.

## Output
- **Recommended stack**, one line per layer (framework, rendering, UI, hosting, analytics/ads).
- **Why** — tie each choice to page speed and SEO explicitly.
- **The one Core Web Vitals risk** for this stack and how to avoid it (point at `web-perf` to measure).
- **2 alternatives** considered + why they lost.
- Decisive: one recommended stack, not a menu.

## Rules
1. **Speed and SEO win ties.** Always prefer the option that ships less JS and ranks better.
2. **Use what's already wired** (Cloudflare) unless there's a real reason not to.
3. **Every dependency must justify its bytes.** Default to fewer, lighter libs.
