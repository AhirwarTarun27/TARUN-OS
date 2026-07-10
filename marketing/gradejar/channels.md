# GradeJar — Channel Research

Researched 2026-07-03 with live search. Audience: US K-12 + college teachers first, students second.
Positioning hooks that work everywhere: **teacher-first, no login, private (grades never leave the browser), free, fast.**
The privacy hook is bigger than it looks: teachers are told constantly not to put student data in random cloud tools. A gradebook that stores nothing server-side sidesteps the whole student-data-privacy (FERPA) anxiety. Lead with it.

All traffic/conversion numbers are estimates to set expectations, not promises.

---

## Tier 1 — full deep dives (these are the plan)

### 1. Google SEO (core pages)

- **Why:** Grade calculators are pure search-demand products. RogerHub built a 12.5M-student franchise on one page ranking for "final grade calculator". Tool queries also resist AI Overviews: you can't use a gradebook inside a Google answer box.
- **Who's there:** Everyone. Teachers search "ez grader", "grade calculator for teachers", "online gradebook free". Students search "final grade calculator", "what do I need on my final".
- **Audience behavior:** High intent, zero patience. They click the top result, use it, and either bookmark it or bounce. Winning = ranking + loading instantly + being obviously usable in 2 seconds. GradeJar already benchmarks #1 on build quality.
- **Content that performs:** Tool pages with the tool above the fold, followed by a short how-it-works, an FAQ (schema'd), and internal links. Supporting explainer pages for long-tails.
- **Non-spammy promotion:** n/a, it's our own site.
- **Frequency:** 1-2 new/refreshed pages per week until the keyword map is covered, then monthly refreshes.
- **Mistakes to avoid:** Publishing before GSC is wired (flying blind). Chasing head terms ("grade calculator") before winning long-tails. Thin doorway pages with no real content differences.
- **Traffic potential:** 10k-100k+ visits/mo at maturity (competitors prove the ceiling; RogerHub does far more in finals weeks).
- **Conversion:** Teachers become weekly repeat users; students are seasonal. Both monetize via ad views.
- **Difficulty:** Medium. **Time:** AIOS drafts; Tarun ships pages. **Budget:** $0. **ROI:** Highest of any channel.
- **Automatable:** High. AIOS owns keyword map, drafts every page, tracks rankings via GSC.
- **Tools:** GSC (must wire), GA4, existing Astro build.
- **Workflow:** AIOS picks next keyword from map -> drafts page copy + meta + FAQ JSON-LD -> Tarun reviews, builds, deploys -> submit URL in GSC -> log -> check impressions at 2/6/12 weeks.
- **CRITICAL right now (found in the 2026-07-03 audit):** gradejar.com is NOT indexed. Not in GSC, not in AdSense, no GA4 property in the dashboard. Nothing else in this file matters until that's fixed.

### 2. Programmatic SEO

- **Why:** The proven calculator-site model (Omni: 3,700 pages, ~7M organic visits/mo; InchCalculator: ~12k backlinks). A repeatable keyword pattern + a template + real per-page differences = hundreds of long-tail rankings small competitors can't be bothered to build.
- **Patterns for GradeJar:**
  - `/ez-grader/N-questions` for N = 5..100: "ez grader 25 questions" etc. Each page = full chart for that test size. Teachers search exactly this.
  - "What do I need on my final" variants: current-grade x target-grade explainer pages feeding the final-grade calculator.
  - Grading scales: per-state and per-system pages (10-point scale, 7-point scale, E/S/N elementary scales, IB, AP).
  - GPA conversions: 4.0 vs 4.33, percentage-to-GPA by country/system (SGPA-to-CGPA page already exists and targets India: good test case).
- **Audience behavior:** Ultra-specific searches with instant-answer intent. The page must answer in the first screen AND offer the interactive tool.
- **Mistakes:** Generating pages with identical content and only a number swapped (thin-content penalty). Every page needs the real chart/data difference plus 2-3 unique sentences. Launch in batches of 10-20, watch GSC, then scale.
- **Traffic potential:** 5k-50k visits/mo across the long tail. **Conversion:** same as SEO. **Difficulty:** Medium. **Budget:** $0. **ROI:** Very high.
- **Automatable:** Very high. This is template + data. AIOS generates all copy and data tables; Tarun reviews batches and deploys.
- **Workflow:** AIOS proposes pattern + keyword list with demand evidence -> generate batch of pages -> deploy -> sitemap ping -> GSC watch -> scale or kill per data.

### 3. AI Search Optimization (GEO)

- **Why:** Teachers and students increasingly ask ChatGPT/Perplexity/Gemini "best free gradebook for teachers", "how do I calculate my final grade". AI referral traffic is small (<5% of Google's) but converts ~3-4x better, and it compounds as AI search grows. Nobody in the grade-calculator niche is optimizing for it yet: open field.
- **BLOCKER FOUND:** gradejar.com's robots.txt (Cloudflare managed) currently blocks ClaudeBot, GPTBot, CCBot, Google-Extended, Amazonbot and more. AI engines cannot read the site, so they will never cite it. Fix in Cloudflare: allow at minimum OAI-SearchBot, ChatGPT-User, ClaudeBot/Claude-SearchBot, PerplexityBot. Blocking trainers-only (GPTBot, Google-Extended, CCBot) is a defensible middle ground, but citation engines must get in.
- **How citation works (2026):** AI engines cite extractable passages: front-loaded answers, Q&A structure, schema. They also weigh multi-source consensus: a tool mentioned on Reddit + YouTube + blogs + its own site gets cited; a site that only talks about itself doesn't. Reddit ~46% of Perplexity's citations; YouTube = most-cited social platform. So Reddit/YouTube work is ALSO GEO work.
- **Content that performs:** FAQ blocks that answer in the first sentence ("The fastest way to grade a 25-question test is..."), comparison content ("GradeJar vs paper EZ grader"), stat-anchored claims.
- **Mistakes:** Treating GEO as separate from SEO (it's the same content, structured harder). Expecting volume in weeks; citations show up in ~8-10 weeks of consistent presence.
- **Traffic potential:** Hundreds/mo near-term, growing. **Conversion:** High (pre-qualified). **Difficulty:** Low. **Budget:** $0. **ROI:** High, compounding.
- **Automatable:** High. AIOS structures every page for extraction and runs a monthly citation check (ask the money questions in ChatGPT/Claude/Perplexity, log who's cited).
- **Workflow:** Unblock crawlers -> restructure FAQ answers to front-load -> build consensus mentions via Reddit/YouTube/PR -> monthly citation audit in `marketing/log.md`.

### 4. Backlinks / Digital PR (includes HARO-style + teacher blog outreach)

- **Why:** The site is new: zero authority. Rankings for anything competitive need links. Calculator sites earn links naturally once seeded (mortgage/grade calculators get cited by bloggers, teachers' resource pages, school sites). Also the #1 lever competitors can't copy overnight.
- **Targets:**
  - Teacher blogs/newsletters that run tool roundups: WeAreTeachers, Edutopia, Larry Ferlazzo (posts daily tool roundups), Cult of Pedagogy, TeachThought, Bored Teachers, ClassPoint/NWEA-style "best tools" lists. Pitch window for back-to-school lists is NOW (July): editors assemble them weeks ahead.
  - School/district resource pages and .edu "for teachers" link pages: value-first email, free tool, no strings.
  - HARO successors: Source of Sources (free, original HARO founder), Qwoted free tier, Featured. Answer education/edtech/grading queries as "developer of a privacy-first gradebook". #JournoRequest on X too.
  - The privacy/FERPA angle is the PR story: "grades that never leave the teacher's browser" is pitchable to edtech press; "best tools" lists need a privacy-friendly pick.
- **Non-spammy:** Personalized, short, value-first pitches. No link exchanges, no paid links, no mass blasts.
- **Frequency:** 3-5 pitches/week + daily 5-min scan of SOS/Qwoted queries (AIOS pre-filters, drafts answers).
- **Mistakes:** Pitching "please link to my calculator" instead of a story. Ignoring follow-up (one, after 7 days). Using the work email (never: personal email only).
- **Traffic potential:** Direct referral is modest; the SEO lift is the point. 10-30 quality links in 90 days changes what the domain can rank for.
- **Difficulty:** Medium. **Time:** AIOS drafts everything; Tarun sends. **Budget:** $0. **ROI:** Very high (multiplies channel #1).
- **Automatable:** High. AIOS builds/maintains target list, drafts every pitch and HARO answer; Tarun approves + sends.
- **Workflow:** AIOS keeps `marketing/gradejar/outreach-targets.md` -> weekly queue includes any live SOS/Qwoted matches + 1 outreach draft -> Tarun sends -> log -> follow-up reminder day 7.

### 5. Pinterest

- **Why:** Still the teacher planning engine in 2026. Teachers hunt classroom resources there before and during back-to-school; TpT sellers build whole businesses on it. It's a visual SEARCH engine, not a social feed: pins rank and compound for years. Perfect fit for a 15-min/day, AIOS-drafted rhythm.
- **Who's there:** overwhelmingly teachers (and teacher-adjacent planners), heavily US, majority women, in planning-and-saving mode.
- **Content that performs:** Vertical pins (2:3) that promise a utility: "Grade a 40-question test in one tap - free EZ grader", "The gradebook that never uploads student data", "Grading scale cheat sheets". Cheat-sheet/printable-style pins earn saves, saves earn distribution.
- **Non-spammy:** Pinterest is promotion-native. Just make pins genuinely useful. Mix destination pins (to gradejar.com) with pure-value pins (grading tips) ~1:1.
- **Frequency:** 1-2 fresh pins/day, scheduled weekly in one batch via Pinterest's free native scheduler (30 days ahead).
- **Mistakes:** Re-pinning the same image to 10 boards (spam signal). Ignoring pin SEO (title/description keywords). Quitting at week 6: Pinterest compounds on a 2-4 month curve.
- **Traffic potential:** 1k-10k+ outbound clicks/mo at maturity (teacher-niche accounts prove this). **Conversion:** Good: planners bookmark tools. **Difficulty:** Low-medium. **Budget:** $0 (Canva free for templates). **ROI:** High.
- **Automatable:** Very high. AIOS drafts pin titles, descriptions, alt text, and image copy specs; Tarun renders in a Canva template (or we build an HTML-to-image pin template once) and schedules weekly.
- **Workflow:** Weekly: AIOS drafts 7-14 pins mapped to keyword calendar -> Tarun batches images ~30 min Sunday -> native-schedules them -> AIOS reviews Pinterest analytics monthly.

### 6. Reddit

- **Why:** Where US teachers actually talk (r/Teachers ~1M+, r/teaching, r/education, r/edtech, subject subs like r/MathTeachers, r/ELATeachers; student side: r/college, r/HomeworkHelp). Doubles as GEO: Reddit is ~46% of Perplexity's citations, so authentic Reddit mentions literally become AI answers.
- **Audience behavior:** Allergic to marketing, generous to helpers. Threads like "what do you use for grading?" and "gradebook app that doesn't need student emails?" recur every back-to-school.
- **Content that performs:** Genuine answers to grading-workflow questions; "I built a free thing, tear it apart" posts in tool-friendly subs (r/edtech, r/InternetIsBeautiful, r/SideProject); comment-level recommendations with "I made this" disclosure.
- **Non-spammy:** 90/10 rule strictly. Answer the question fully in-thread, mention the tool only when it truly fits, always disclose. Age the account, build karma in-niche first. NEVER automate posting (ban + brand damage).
- **Frequency:** 3-5 helpful comments/week + at most 1 tool mention/week early on. One sub at a time.
- **Mistakes:** Link-dropping day one. Posting the same thing across subs. Arguing with mods. Using new accounts that smell like marketing.
- **Traffic potential:** Spiky: a good thread = 500-5,000 visits; steady-state modest. The AI-citation echo is the real long-term payoff.
- **Difficulty:** Medium (tone). **Time:** inside the weekly window (live threads can trigger a micro-day). **Budget:** $0. **ROI:** High.
- **Automatable:** Medium. AIOS scans relevant threads and drafts replies in Tarun's voice; a human must review and post every one.
- **Workflow:** The queue (weekly session, or a triggered micro-day for a live thread) lists 1-3 threads worth answering + drafted replies -> Tarun edits 10%, posts -> log thread URLs -> AIOS tracks which mentions get traffic (UTM-free: watch referral spikes).

### 7. Email newsletter (own list)

- **Why:** The only channel nobody's algorithm can take away. Teachers who join in August open all year. Converts one-time back-to-school visitors into weekly-repeat gradebook users (the highest-LTV behavior GradeJar has).
- **What it is:** A capture box on gradejar.com ("Grading tips + new tools, twice a month, no spam") + a light digest: one grading tip, one feature spotlight, one seasonal reminder (finals-prep in Nov/Apr).
- **Content that performs:** Short, practical, teacher-voice. Printable/cheat-sheet freebies drive signups (pairs perfectly with Pinterest).
- **Frequency:** 2x/month. **Mistakes:** Daily emails (unsubscribe city), buying lists (never), gating the calculator (kills the product).
- **Traffic potential:** Slow build: 100-1,000 subs in first months. Worth it for retention, not acquisition.
- **Difficulty:** Low. **Budget:** $0 (MailerLite/Buttondown free tier). **ROI:** High, compounding.
- **Automatable:** Very high. AIOS drafts every issue; Tarun approves and hits send. Signup form is a one-time product task.
- **Workflow:** Add form -> AIOS drafts issue on the 1st and 15th -> Tarun approves -> send -> AIOS tracks opens/clicks in the free dashboard.

### 8. Facebook Groups

- **Why:** Still the biggest established teacher hangout (larger share than X/Threads/Bluesky per 2026 teacher surveys). Groups like Teachers Ask Teachers and Amazing Educational Resources are exactly where "what gradebook do you use?" gets asked daily.
- **Audience behavior:** Practical, recommendation-driven, moderator-policed. Self-promo is banned in most groups EXCEPT when answering a direct "what do you recommend?" request: that's the play.
- **Content that performs:** Helpful answers to recommendation threads; occasional value posts (grading-time-saver tips) in groups that allow them; free-resource shares in "free resource" groups.
- **Non-spammy:** Join 3-5 groups, read the rules, contribute for 2 weeks before any mention. Recommendation-thread replies only. Disclose maker status.
- **Frequency:** 2-4 helpful replies/week. **Mistakes:** Posting links as first activity; cross-posting identical text; ignoring group rules (bans are permanent).
- **Traffic potential:** Modest steady drip, occasionally spiky. **Conversion:** Good (peer-recommended). **Difficulty:** Medium. **Budget:** $0. **ROI:** Medium-high.
- **Automatable:** Medium. AIOS can't browse private groups; Tarun spots threads during his own scroll, AIOS drafts replies on request. Keep it opportunistic.
- **Workflow:** Tarun flags a thread -> AIOS drafts reply in his voice -> post -> log.

---

## Tier 2 — activate later or at trigger events (M)

- **YouTube + Shorts:** Highest-leverage M channel. 2-4 min screencasts ("Set up a private gradebook in 5 minutes", "Grade a stack of tests in one tap") rank in Google video results, feed AI citations (YouTube = most-cited platform), and live for years. Cost: recording time and some comfort on mic (script fully AIOS-drafted; faceless screen-recording is fine). Trigger: after Tier 1 is humming, ~Aug. Shorts = cutdowns of the same recordings.
- **Bluesky (#EduSky):** Small (single-digit % of teachers) but genuinely native educator community, link-friendly, zero competition. 3 posts/week, AIOS-drafted, minutes to run. Cheap experiment: start anytime.
- **X:** Half of teachers still there but organic link reach is throttled. Use mainly for #JournoRequest monitoring + a light presence. AIOS drafts.
- **Quora:** Diminished direct traffic but AI engines train on it. Answer the top 20 evergreen grading/GPA questions once, well, with disclosure. One-time batch + monthly top-up.
- **Product Hunt:** One launch when roster/CSV import ships. Realistic result for a consumer utility: a few hundred visitors, a permanent backlink, social proof. Prep kit is fully draftable by AIOS. Don't expect teachers there: it's for the backlink + indie credibility.
- **Directories (one-time batch):** EdTech Index (Common Sense Education paused reviews Feb 2026: submit to the successor instead), AlternativeTo, free-tool directories, startup directories (BetaList etc.). ~20 submissions, one afternoon, AIOS pre-fills every form's copy. Value = backlinks + long-tail discovery.
- **Teacher influencer partnerships:** After traction (need usage numbers to pitch). Micro teacher-creators (10k-100k) review free tools constantly. AIOS builds the list + drafts outreach; offer = early features/feedback loop, never payment.
- **In-product referral mechanics:** "Share this class report" / "send to your department" buttons. Product work in the GradeJar repo, not marketing time. High leverage once usage exists.

## Tier 3 — not for GradeJar (L)

- **Instagram/TikTok/Threads:** Teacher presence is real but links are hostile or dead, video production is heavy, and TikTok skews student + volatile. Revisit only if a repurposing pipeline (YouTube -> Shorts -> TikTok/Reels) becomes free to run.
- **Discord/Slack:** Communities exist but are small, private, and human-only. Not worth the human budget.
- **Medium/Dev.to/Hashnode/GitHub/HN/Indie Hackers:** Wrong audience (devs/builders). Note: several fit JsonBeam well: reuse this table there. HN gets one shot only if we ever want to tell the "local-first, zero-backend gradebook" engineering story.
- **Podcasts/guest posts:** Real but slow and human-heavy. Revisit at 10k+ visits/mo when there's a story to tell.
- **Cold email/affiliates/local:** Spam, no margin, and not-applicable respectively.

## Excluded (X)

- **Paid ads (all platforms):** $0 budget, and the AdSense math loses money on almost any CPC.
- **LinkedIn:** Hard boundary. Job-growth only. Never in any queue.
