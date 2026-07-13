---
name: design-architecture
description: Recommend the system design for a specific front-end-heavy project AND teach the reasoning, so it doubles as front-end system-design practice. Trigger on "/design-architecture", "system design for this", "how should I architect X". Covers component/state/data/rendering/caching/scaling-to-mass-traffic + SEO architecture. One run = one architecture doc + learning notes.
---

# Design Architecture — the system design, and the lesson inside it

Two jobs at once:
1. Recommend a concrete, practical **front-end system design** for this project — built to scale to mass traffic and rank well.
2. **Teach the reasoning** as you go, so each project quietly levels up the user's front-end system-design skill (an explicit goal). Explain trade-offs, name the patterns, point at what to study next.

## Inputs
- The project, its wedge, expected scale (mass-traffic SEO play), and the chosen stack (from `pick-stack` if run).

## Cover these, with the "why" for each
1. **Rendering & SEO architecture** — SSG vs SSR vs CSR per route; how pages get indexed; metadata/sitemap/structured-data strategy; how the tool stays instant. **The route list you produce here is the one the build is held to, so it must be monetizable and approvable, not just rankable:**
   - **Include the trust pages in the route list** — `/about`, `/contact`, `/privacy`, `/terms`, and a `/how-it-works` (or `/methodology`) page. These are not an afterthought for launch week. The privacy policy is the one hard requirement in Google's AdSense policy text, and the methodology page is the E-E-A-T anchor that turns a widget into a publisher.
   - **State the content-depth requirement per route type.** The test: *mentally delete the tool — is there still a page worth reading?* If not, it is "a screen without publisher-content" and **Google will not serve ads on it.** That is what got JsonBeam rejected.
   - **Rule on programmatic routes explicitly.** Templated pages with variables swapped are scaled content abuse. Each one is either genuinely differentiated, or `noindex` **and** ad-free. Never templated + indexed + monetized.
   - **Design the interlinking** — footer links every trust page from every page; zero orphan pages; everything ≤2 clicks from home; child pages link up to their parent and across to siblings. This is also the **session-depth lever** (internal linking lifts pages-per-session 40-60%, a direct revenue multiplier), so it is not a compliance tax.
2. **Component architecture** — how the UI breaks into components; what's shared; where complexity concentrates.
3. **State & data flow** — local vs URL vs persisted state; if there's data, where it lives and how it moves; keep it client-side where possible (front-end-heavy).
4. **Performance architecture** — code-splitting, lazy-loading, asset strategy, fonts, the Core Web Vitals plan (LCP/INP/CLS), non-blocking analytics + ads.
5. **Caching & delivery** — CDN/edge caching, immutable assets, how it stays cheap and fast at high traffic.
6. **Scale-to-mass-traffic** — what breaks at 100k+ sessions/month and how the design avoids it (mostly: stay static + edge-cached, no origin bottleneck).
7. **Minimal backend** — only the backend the wedge truly requires; default to none.

## Output
1. **The architecture** — a words-and-boxes diagram (data flow + rendering) + one paragraph per layer above, each with the decision and the reason.
2. **The scaling story** — one short section: "at mass traffic, here's what holds and why."
3. **Learning notes** — 3-5 bullets: the system-design concepts this build exercises (e.g. "SSG vs SSR trade-off", "edge caching", "URL-as-state"), with one resource/keyword to study each. This is the front-end system-design rep.
4. **The single biggest architectural risk** for this project + the mitigation.

## Rules
1. **Practical over academic.** Recommend what you'd actually build solo in 3-4 weeks, not a FAANG diagram.
2. **Always explain why.** The teaching is half the point — no unexplained choices.
3. **Bias to static + edge.** For a front-end-heavy, mass-traffic SEO tool, the simplest scalable answer is usually static + CDN. Justify any deviation.
