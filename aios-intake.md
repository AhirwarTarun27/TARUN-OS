# TARUN-OS Intake

This is the source-of-truth file for your AIOS. Fill it in by typing, voice-pasting (Wispr Flow / OS dictation), or running `/onboard` for a guided conversation. Whichever mode, this file is what `/onboard` reads to scaffold your Day-1 setup.

**Hard cap: 7 questions.** Each answerable in under 60 seconds. Don't overthink — you can edit and re-run `/onboard` any time.

---

## Q1 — Who are you, what do you sell, who do you sell it to?

Identity, offer, ICP. One paragraph each is fine.

```
WHO I AM — Tarun, a software developer. Day to day I build web applications.

WHAT I "SELL" — Not a service. I build niche web tools/applications aimed at the
masses and monetize them through Google AdSense. Shipped so far: JsonBeam. Currently
building: GradeJar (a teacher-first grade calculator that remembers your classes —
localStorage, zero backend). The goal is reach + ad revenue, not a paid product.

WHO I SELL TO — No fixed audience. The ICP is decided per product by research, not
upfront. My pipeline: /scout-problem finds a small, underserved, high-demand niche
with a beatable top-10 SERP → /explore-project scopes the build → the result lands as
a research/<slug>.md brief. So "who I sell to" = whoever the current niche targets.
Current niche (GradeJar): K-12 and college teachers (US-first), with students as a
secondary long-tail segment.
```

---

## Q2 — Paste 1-2 things you've written recently. Don't edit them.

An email, a LinkedIn post, a DM, a doc — anything that sounds like you when you're not trying. **Paste verbatim.** Do not type these mid-conversation with Claude — chat-shaped samples are worse than no samples (voice contamination).

```
[Sample 1 — LinkedIn post promoting JsonBeam, pasted raw]

As a developer, I work with JSON every single day.
And every single day I was dealing with the same frustrations —
❌ Ads everywhere
❌ Slow, laggy formatters
❌ Cluttered UI that kills focus
❌ Sites that crash on large JSON files
❌ Having to scroll through 10 features I never asked for
I kept thinking — why is there no clean, fast, no-nonsense JSON formatter out there?
So I stopped waiting and built one myself. 🚀
Introducing Jsonbeam — the JSON formatter I always wished existed.
✅ Lightning fast
✅ Zero ads, zero clutter
✅ Clean and intuitive UI
✅ Built by a developer, for developers
If you work with JSON daily — whether it's APIs, configs, or debugging — give Jsonbeam a try. I promise it feels different.
👉 https://jsonbeam.com
Would love your feedback and support. Share it with your dev friends if you find it useful! 🙌
#buildinpublic #devtools #webdev #json #frontend #developer #programming #productivity #opensource
```

Note from Tarun: "I am not good in writing, so I hand off to this operating system
to work for me — for writing, marketing, and promotion." → AIOS owns drafting; always
show a draft before anything external ships (per CLAUDE.md voice rule).

```
[Sample 2 — not yet provided]
```

---

## Q3 — What are your 2-3 biggest priorities for the next 90 days?

Quarterly priorities. Not yearly aspirations. Things that, if not done by July, would make you say "I wasted Q2."

```
1. Ship GradeJar to live and rank it on Google — get the teacher-first grade
   calculator built, deployed, and pulling organic traffic + AdSense revenue.
2. Build an AI/AIOS-run daily marketing system — it runs for me, not me running it.
   Posts genuinely helpful content about my products on a daily basis, spotlighting
   the differentiating features that aren't in the market (and that generic AI tools
   don't surface). The win is convenience: hands-off, consistent promotion.
3. Get sharper at DSA, system design, and interview-style questions.
```

---

## Q4 — Where does revenue actually land, and where is it tracked?

Multiple answers OK. Stripe? Skool? GoHighLevel? QuickBooks? A spreadsheet?

```
PRIMARY — Google AdSense. Tracked in the AdSense dashboard. Currently $0 (pre-revenue;
products are new / not yet ranking).

OPEN TO — small additional revenue ideas beyond AdSense (e.g. affiliate links,
sponsorships, a "buy me a coffee" tip jar, light premium features). Wants the AIOS to
surface low-effort options over time, but AdSense stays the primary channel for now.
```

---

## Q5 — Where do you talk to customers, your team, and the outside world day-to-day?

Email (which one — Gmail / Outlook)? Slack? Teams? DMs (Skool / Discord / iMessage)? Phone?

```
BOUNDARIES (hard):
- Work email (@thinksys.com) + all employer/work communication = OUT of the AIOS.
  Keep the side hustle fully separated from the day job. AIOS does not touch it.
- LinkedIn = NOT a product-marketing channel for the AIOS. It's for professional /
  job growth; Tarun does not want side-hustle/future projects posted there. If he ever
  wants to, he posts it himself. AIOS stays off LinkedIn for marketing.

CURRENT STATE (early/pre-launch):
- No client communication yet — products are new, no audience inbox to manage.
- Slack: could be set up later; nothing active right now.
- Product marketing channel(s) = TBD. The AI-run marketing system (Priority 2) needs a
  home that is NOT LinkedIn — decide when scoping it (candidates: X/Twitter, Reddit,
  dev communities, the product sites' own SEO content/blog). Flag for /level-up.
```

---

## Q6 — Where do meeting recordings, notes, and important docs live?

Granola? Otter? Fireflies? Google Drive? Notion? Dropbox? A folder on your desktop you keep meaning to organize?

```
SOURCE OF TRUTH (now) — this repo (research/, decisions/, week.md, etc.) + local machine.
Solo builder, so no meeting recordings to manage.

ALSO HAS (lightly used) — Notion (has some notes but cluttered, needs cleanup),
Google Drive + Google Docs (barely used yet).

LATER — as business/revenue grows, wants AIOS tips on how to organize meeting notes +
important docs across these. For now: keep it in the repo + Notion as the scratch spot.
```

---

## Q7 — What's the one task that eats your week, and where do you currently track work?

The single biggest time-suck or recurring drudgery. Plus where tasks/projects live (ClickUp / Asana / Linear / Notion / a notebook).

```
TOP PAIN — Marketing, end to end. This is the AIOS's responsibility, not Tarun's:
- Write the promo / marketing posts (he hasn't started; hands it to the AIOS).
- Research simple, effective, quick-to-execute marketing hacks for the current site.
- Find and manage the marketing approach for current AND future projects.
- Audience: US-first (primary target; US marketing research is the harder part), then
  expand to the whole world. Global is the long-term aim, US is priority #1.

WHERE WORK IS TRACKED — week.md in this repo (single source of truth) + the repo
itself. No external PM tool (no Linear/Asana/Notion board) for now.
```

---

When this file is filled, run `/onboard` (or re-run it) and the wizard will scaffold your Day-1 file set: `context/`, `references/voice.md`, populated `connections.md`, and a filled `CLAUDE.md`.
