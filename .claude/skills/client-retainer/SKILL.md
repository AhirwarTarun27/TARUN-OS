---
name: client-retainer
description: Phase 5 of the client pipeline and the actual business — the recurring layer. Produces the monthly "here's what people searched to find you" report from Search Console, GBP, lead counts and the AI prompt-check, then works the Growth queue (new pages, GBP posts, review chasing, listing upkeep). The report is what makes a client keep paying and keep referring. Trigger on "/client-retainer", "monthly client report", "client report due", "renewal", "growth work for <client>", "what did we do for the client this month". One run = one monthly report sent + next month's growth queue set.
---

# Client Retainer — Phase 5: the actual business

**One-time builds are a treadmill.** Finish a site, get paid once, start hunting again. Recurring income is the business, and this phase is the whole reason the previous four are worth running properly.

The retainer is not "support." It is a service the client can *see*. The month they can't see it is the month they cancel.

## Preconditions
- Handover is done. Accounts are in the client's name, and the retainer tier + renewal date are in `clients/<slug>/retainer.md`.
- **Search Console has been collecting data for at least a month.** No GSC, no report, no renewal. It is that direct.

## The two tiers

| | **Care** | **Growth** |
|---|---|---|
| What | Hosting, domain renewal, uptime, backups, small edits | Care **+ actively keeping them found** |
| Work | Reactive. Keep it alive. | New pages, GBP posts, review chasing, listing upkeep, AI-search work |
| Report | Uptime + what changed | **The full monthly report** |
| Price | ₹1.5K-4K/mo | ₹5K-15K/mo |

**Growth is where the real money is**, and it is also where the client actually gets value. A Care client is a client slowly forgetting why they pay you.

## Step 1 — Pull the numbers

Sources, in order of how much the client cares:

1. **Google Search Console** — queries, impressions, clicks, position, and **which pages**. This is the heart of the report.
2. **Google Business Profile insights** — calls, direction requests, profile views, searches.
3. **Lead count** — form submissions (the `/thank-you` conversion event), plus WhatsApp enquiries if the client will share the number.
4. **The AI prompt check** — re-run the 5-8 buying questions in ChatGPT, Perplexity, and AI Overviews. Log to `clients/<slug>/reports/`.
5. **Reviews** — new ones this month, current count, current average.

`scripts/report.mjs` already speaks GSC and GA4 for Tarun's own products. **When Kesri has a real month of data, fork it into `scripts/client-report.mjs`, parameterized by client.** Until there's real data to report, building the script is procrastination — do it when the first report is actually due.

## Step 2 — Write the report

**One page. Written for a proprietor.** If it needs explaining, it has failed.

The spine — and the title is the product:

> ## What people searched to find you — <Month>

```
WHAT PEOPLE SEARCHED FOR YOU
  "etp plant gandhidham"          42 times · you showed up · position 6
  "ro plant supplier kutch"       31 times · you showed up · position 4
  "water treatment mundra"        18 times · you showed up · position 11

WHAT THAT TURNED INTO
  1,240 people saw you on Google      (up from 890)
  73 clicked through to the site
  9 called you straight from Google Maps
  4 sent an enquiry through the site

AI SEARCH
  We check monthly whether ChatGPT and Perplexity recommend you.
  This month: Perplexity named you for "RO plant AMC Gandhidham." ← first time
  Still not appearing for 4 of the 6 questions we track. Working on it.

WHAT WE DID
  · Added 3 new questions your buyers actually ask, with your answers
  · Posted twice on your Google profile
  · Got 2 new reviews (you're at 7 now, 4.8 average)

WHAT WE'RE DOING NEXT MONTH
  · <one or two things>

WHAT WE NEED FROM YOU
  · <the one thing they owe us — usually content or a decision>
```

What makes it work:

- **Real queries, in the client's language.** *"These are the actual words people typed."* Nothing else in the entire engagement lands like this. It is the moment the site stops being a cost and becomes a channel.
- **Honesty about what isn't working.** A report that is all good news reads like marketing and gets skimmed. A report that says *"we're still invisible for 4 of 6 AI questions, here's the plan"* reads like a partner and gets trusted. **The bad news is what makes the good news believable.**
- **"What we need from you"** — every report ends with a small ask. It keeps them engaged, and it puts their bottleneck on paper where it belongs.
- **Never invent or inflate a number.** If it was a bad month, say so. The client can see their own phone.

## Step 3 — Work the Growth queue

Ranked by what actually moves the outcome sentence from `engagement.md`:

- **Answer new questions.** Mine the month's real enquiries and GSC queries for questions the site doesn't answer yet, and add them as question-headed sections. **The client's inbox is a better keyword tool than any SEO software**, and this is the highest-return content work there is — it feeds classic ranking *and* AI citation with the same effort.
- **Chase reviews.** 2-4 real ones a month. Ask at the moment of delivered value.
- **GBP posts.** Cheap, and a freshness signal.
- **Fill the gaps the questionnaire finally closed.** Every answer that arrives unlocks a field that has been rendering as nothing — certifications, geo coordinates, capacities. Ship them.
- **Re-run the location-page substance test.** New real projects mean new *true* facts, which may finally earn a location page that was correctly skipped before.
- **Keep listings alive.** Directories rot. Re-check quarterly.
- **Re-run the technical gate.** Robots, indexing, sitemap, AI crawlers. **A dashboard toggle or a stale build can silently de-index a site months after launch, and nothing in the repo will show it.** Check it every month — it takes 60 seconds and it is the highest-consequence check in the queue.

## Step 4 — Protect the renewal

The renewal is decided long before the invoice.

- **Send the report on time, every month, even in a quiet month.** A skipped report is the beginning of a cancellation. A quiet month with an honest report is fine; a good month with no report is worse.
- **Reply fast to small requests.** The two-minute favour is what makes them keep paying for the ₹5K.
- **Watch scope creep.** "Small edits" inside Care is fine. A new page, a new feature, a new campaign is a **new quote**. Say it kindly, say it immediately, and say it every time — the first time it slides, it becomes the norm.
- **Re-ask for referrals when the news is good.** A month where the report shows real enquiries is the best possible moment to ask *"who else should we be doing this for?"*

## Step 5 — Close the cycle

Update `retainer.md`: log the report date, the headline numbers, what shipped, and next month's queue. Set ▶ NEXT ACTION to the next report date.

Bank the good months into the case study in `clients/<slug>/`. **This is what the agency portfolio site gets built from** — real numbers from a real client, which is the only kind of portfolio worth having.

## Rules

1. **The report IS the retainer.** It is not admin around the work — it is the deliverable the client is buying. Skip it and you are charging for something invisible, and invisible things get cancelled.
2. **Send it every month, even when the news is bad.** Honest bad news builds more trust than silence, and it is what makes the good months believable.
3. **Never invent or inflate a number.** They can see their own phone and their own inbox. One padded figure ends the relationship.
4. **Lead with the queries.** "Here are the words people typed to find you" is the most persuasive sentence in the whole business. Open with it.
5. **Growth over Care.** Care is a client slowly forgetting why they pay. Move clients to Growth by showing them what Growth does.
6. **Scope creep gets a quote, not a sigh.** Small edits are Care; new pages and new features are new work. Say it the first time or it becomes the norm.
7. **Re-run the technical gate monthly.** 60 seconds, and it catches the silent de-indexing that no status file and no repo will ever show you.
8. **Ask for referrals in the good months.** A report full of real enquiries is the cheapest sales call you will ever make.
