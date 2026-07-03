---
name: marketing
description: The daily marketing engine for every product in the portfolio (GradeJar, JsonBeam, future launches). Reads each active marketing/<product>/action-plan.md + content-strategy.md, drafts today's content (pins, Reddit replies, pitches, page copy) into ONE marketing/queue/YYYY-MM-DD.md for a 15-minute approve-and-post, and logs posted items to marketing/log.md. Weekly mode (Sundays or "marketing week") scores channels per product against live data and adjusts each plan. Trigger on "run marketing", "daily marketing", "marketing queue", "draft today's posts", "promote gradejar", "promote jsonbeam", "what should I post". Drafts only — Tarun posts everything himself.
---

# Marketing — the daily engine

Priority 2 made real: hands-off, consistent promotion for the whole portfolio. The AIOS
drafts, Tarun approves and posts in ~15 min/day TOTAL across all products. Strategy lives
in `marketing/` — this skill executes it one day at a time. Never invent strategy mid-run;
if a plan looks wrong, say so and propose an edit to the plan file instead.

## Products

Every subfolder of `marketing/` with an `action-plan.md` is an active product (today:
`gradejar/`, `jsonbeam/`). One run covers all of them: one queue, one shared budget. New
products join by getting a folder (see `marketing/playbook.md`, per-launch SOP).

## Files this skill touches

Per product `<p>` (e.g. `gradejar`, `jsonbeam`):
- `marketing/<p>/action-plan.md` — what phase we're in, what's open. THE driver.
- `marketing/<p>/content-strategy.md` — cadences, calendar spine, repurposing chain.
- `marketing/<p>/channels.md` — per-channel rules (90/10, disclosure, anti-spam).
- `marketing/<p>/outreach-targets.md` — PR/blog target list with status per target.
- `marketing/<p>/idea-bank.md` — content ideas; every idea runs the repurposing chain.

Shared:
- `marketing/playbook.md` — criteria, master channel table, SOPs. The strategy home.
- `marketing/queue/YYYY-MM-DD.md` — today's output. ONE file per day, all products.
- `marketing/log.md` — append-only record of everything posted/sent. Never delete.
- `references/voice.md` — every external draft matches this register.
- `week.md` — respect the week's outcomes; marketing never trumps the must-ship.

## Daily run — in order

### 1. Orient

For each active product: read its `action-plan.md` (current phase + open checkboxes) and
`content-strategy.md` (today's position on its calendar). Then the last 7 days of
`marketing/log.md` (never repeat or crowd a channel) and yesterday's queue (carry over
anything unposted, marked CARRIED).

### 2. Build today's queue

Write `marketing/queue/YYYY-MM-DD.md`. Pick 3-6 items max ACROSS ALL PRODUCTS — a
15-minute approval budget, not a backlog dump. Prioritize: (1) Phase-0/blocking tasks for
any product, (2) time-sensitive items (pitch windows, live threads, scheduled issues,
seasonal spikes), (3) steady-state cadence items. Split attention by need, not evenly: a
product in Phase 0 or a seasonal window outranks another product's routine items.

Every item must be **ready to ship**, formatted as:

```
## [product · channel] Short title
**Why now:** one line tying it to the plan/calendar.
**Where:** exact destination (URL, subreddit, board, email address).
**Action:** post / send / schedule / build.
**Draft:** the full, final copy — paste-ready, in his voice.
```

Drafting rules:
- Community drafts (Reddit/FB/HN): answer the question fully first, tool mention only if
  it genuinely fits, always include the "I built this" disclosure. 90/10 stands.
- Pitches: personalized to the target (name what they publish), value-first, short. From
  personal email only.
- Pins: title + description + alt text + image copy spec (headline, subline, style note).
- Page drafts: full copy + meta title/description + FAQ JSON-LD block.
- US-first phrasing everywhere. No em dashes. Short sentences.

### 3. Present for approval

Show the queue as a tight numbered list: product, channel, title, one-line why. Ask
nothing except "approve, edit, or skip per item." He posts manually; never post for him.

### 4. Log what shipped

When he confirms items went out (same session or next run), append each to
`marketing/log.md`: `| date | product | channel | title | destination/URL | result notes |`.
Unconfirmed items carry into the next queue once, then drop with a note.

## Weekly mode — Sundays, or on "marketing week" (pairs with /weekly-review)

1. Run `node scripts/report.mjs` (and `--days=30`). Bing Webmaster search data (clicks/impressions + top Bing queries per site) is now live in the report — score it as a second organic channel. Read GSC once wired.
2. Score each active channel PER PRODUCT: sessions, trend, anything shipped vs. results
   in the log.
3. Verdicts, honestly: **feed it** (working), **hold** (fair test still running — feed
   channels get 4-6 weeks, SEO gets 3 months), **kill** (fair test failed — mark it L in
   that product's column in `marketing/playbook.md` and log why in `decisions/log.md`).
4. Update each product's `action-plan.md` checkboxes + next week's emphasis. Propose, he
   approves.
5. Bank one line per product-channel in `marketing/log.md` under a `### Weekly scorecard`
   heading.

## Monthly (first weekly run of the month)

- AI-citation spot check per product: ask ChatGPT/Claude/Perplexity the money questions
  ("best free gradebook for teachers", "best online json formatter"), log who gets cited.
- Rank spot-check on 5 money keywords per product. Refresh 1-2 aging pages.
- Prune each product's `idea-bank.md`; every surviving idea gets scheduled or cut.

## Hard rules

1. **Draft, never post.** Every external word crosses his eyes first (CLAUDE.md voice rule).
2. **Never LinkedIn. Never the work email.** No exceptions, not even "just a repost".
3. **No paid anything** while the plan says $0.
4. **Never automate community posting** (Reddit/FB/HN) — drafts only, human hands only.
5. **≤15 min of his time TOTAL across all products.** If the queue can't be cleared in
   15 minutes, it's too long.
6. **The log only grows.** It's the marketing track record — same rule as metrics-log.
7. **Blocked items stay visible.** Any product's Phase-0 items (GSC, AdSense, robots.txt,
   WAF) headline every queue until done — they gate everything else for that product.
8. **His voice** (`references/voice.md`): casual, direct, short sentences, no em dashes.
