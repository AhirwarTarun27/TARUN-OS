# About the Business

**Model:** Build niche, front-end-heavy web tools that solve a small, underserved
problem in a high-demand field, rank them on Google, and monetize the traffic with
**Google AdSense**. No paid product, no clients — reach + ad revenue is the play.

**How niches get chosen:** never upfront. Each product is validated by research first —
`/scout-problem` finds a small underserved problem with real demand and a beatable
top-10 SERP; `/explore-project` scopes the build into a Pre-Build Brief. The audience
("who I sell to") is whatever the chosen niche targets.

**Products:**
- **JsonBeam** (live) — fast, zero-ad JSON formatter/viewer/validator for developers.
- **GradeJar** (MVP built, NOT live yet) — teacher-first grade calculator. Niche: K-12 +
  college teachers, US-first; students secondary. The wedge: incumbents are stateless;
  GradeJar remembers. Code in a separate private repo: `AhirwarTarun27/GradeJar`.
  - **Built (2026-06-30):** `/ez-grader` (M1, benchmarked above top-3) + `/gradebook`
    (M2, the persistence wedge — save classes/scores, custom scales, export/import,
    Print/PDF, Undo via single-writer `store.ts`; benchmarked decisive #1 on "free
    gradebook"). AdSense wired but env-gated/off. CWV + Lighthouse all 100/100/100/100,
    CLS 0. 50 unit tests green. Stack: Astro + Preact islands + Tailwind v4.
  - **Bottleneck to revenue = go-live, not build.** Pushed to GitHub but not deployed.
    Blocked on **Cloudflare auth** → CF Pages deploy → buy/attach `gradejar.com` → set
    real AdSense client + validate ad fills → submit to Google Search Console.
  - **Not started:** M3 (more keyword landing pages reusing `grade-core`), M2 backlog
    (GPA-per-band, CSV import, weighting, named rosters → schema v2).

**Revenue:** Google AdSense (tracked in the AdSense dashboard). Currently **$0** —
products not yet live/ranking. The fastest path to first revenue is getting GradeJar
deployed and live. Open to small additional streams later (affiliate, sponsorships,
tip jar, light premium) — AdSense stays primary.

**Audience priority:** US first, then global.
