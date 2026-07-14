---
name: client-handover
description: Phase 4 of the client pipeline — hand the engagement over without becoming the client's hostage-taker or their unpaid IT department forever. Transfers every account into the client's name, writes the one-page "how your site works", walks them through Search Console and Google Business Profile so they FEEL the value, then collects final payment, a testimonial, written portfolio permission, and a direct referral ask. Trigger on "/client-handover", "hand over the site", "client handover", "ask for a testimonial", "ask for referrals", "final payment". One run = one client fully handed over + a referral asked for.
---

# Client Handover — Phase 4: Handover

The phase that converts one client into two.

Handover is not paperwork at the end of a project. It is **the sales call for the next client**, and it is the only one that costs nothing. Skip it and Kesri becomes a one-off favour instead of the first entry in a portfolio and the start of a referral flywheel.

## Preconditions
- Phase 3's gate is green — the site is live, indexed, GBP is verified, and the listings are up. **You cannot show a win that doesn't exist yet.**
- `clients/<slug>/findability.md` has real URLs against the completed items.

## Step 1 — Every account in the client's name

The ledger. Go through `clients/<slug>/handover.md` and verify, one by one:

| Account | Must be owned by | Verify |
|---|---|---|
| Domain | **Client** | Registrar login is theirs, billing is theirs |
| Google Business Profile | **Client** | Their Google account is the owner; Tarun is a *manager* |
| Google Search Console | **Client** | Their account owns the property |
| Business email | **Client** | |
| Hosting (Cloudflare) | Tarun (shared account) | **Disclose this plainly** — see below |
| Every directory listing | **Client** | Created with their email |

**Tarun is the manager, never the owner.**

Two reasons, and the second is the real one:

1. **Accounts in your name make you their unpaid IT department forever.** Every password reset, every renewal, every "can you just log in and change the number" lands on a man who also has a day job.
2. **Holding a client's domain is not leverage — it is a reputation.** In a district where everyone knows everyone and the whole business runs on referrals, one client saying "he holds our domain hostage" ends the flywheel. The referral engine runs in reverse just as efficiently as it runs forward.

**The hosting exception, stated honestly:** the site runs on Tarun's shared Cloudflare account — that is what makes the free tier work. **Say this out loud, in the handover doc.** State plainly what happens if they ever leave: the code is theirs, the domain is theirs, and it can be moved. A dependency the client knows about is a service. A dependency they discover later is a trap.

Hand over credentials properly. Not over WhatsApp in plain text.

## Step 2 — The one-page "how your site works"

One page. Written for a proprietor, not a developer.

- **What the site does**, in plain language.
- **What happens when someone fills the form** — where the enquiry lands, on whose phone. (*"You'll get a WhatsApp within seconds. Reply fast — the same enquiry usually went to two other suppliers."*)
- **What the client owns** — the domain, the Google profile, the listings. And what Tarun manages.
- **What Tarun handles vs. what they do.** Explicitly. This is the Phase 1 "NOT included" list, restated where they'll actually read it.
- **How to ask for a change**, and what it costs if it's outside the retainer.
- **Their logins**, and where they're stored.

No jargon. If it contains the word "schema", rewrite it.

## Step 3 — Show them the win. This is the whole phase.

**Do not email a link and consider it delivered.** Sit with them — in person or screen-shared — and show them:

- **Google Search Console** — *"These are the actual words people typed to find you."* This is the moment. Real people, searching for what they sell, arriving. It lands harder than any number.
- **Google Business Profile** — the map pin, the calls, the direction requests.
- **The site on their phone.** Not a laptop. Their phone, in their hand, loading in under a second.
- **A test enquiry, end to end** — Tarun submits the form live and the client's phone buzzes in front of them. **This is the single best moment in the entire engagement.** It converts an abstraction ("we made you a website") into a machine they can feel working.
- **The AI prompt-check baseline** — honestly, as a baseline. *"Right now, if a buyer asks ChatGPT who supplies ETP plants near Kandla, it has never heard of you. Here's what we're doing about that, and here's how we'll show you it's working."*

**A client who doesn't feel the value doesn't refer, and doesn't renew.** They also don't *know* they got value — they see a website, which they assume is simply what they paid for. The value is invisible unless you show it.

## Step 4 — Collect. All four things, in one conversation.

Do this while the win is still on the screen. Not next week.

1. **Final payment.** The invoice is easiest to send when they've just watched their phone buzz.
2. **A testimonial.** Ask for something specific, never "say something nice." *"Would you say what changed — you had a brochure, now buyers find you on Google?"* A vague testimonial is worthless; a specific one closes client #2.
3. **Written permission** to use them in the portfolio — name, logo, screenshots, results. **Written.** A verbal yes from a relative is not permission you can put on a public website.
4. **The referral ask — directly.** Not "let me know if you hear of anyone." That produces nothing.

   > *"Who else do you know who needs this? Any supplier or plant you work with who has no website, or has one nobody can find?"*

   Name the pattern, and make it easy to say yes: ask for **one** introduction, over WhatsApp, with a message Tarun has already drafted.

Kesri knows every plant in the Kandla-Mundra belt. That address book is worth more than the ₹10K.

## Step 5 — Start the retainer

The retainer was agreed in Phase 1. **It starts now**, at handover — not "whenever they think about it."

Confirm the tier (Care or Growth), the amount, the renewal date, and **what the first monthly report will contain.** Put the date in `retainer.md`.

**Undercharging or deferring the retainer is how a client becomes unpaid lifetime support.** The "small edit" requests start about three weeks after handover and they never stop. Either they sit inside a paid retainer, or they are a favour with no end date.

## Step 6 — Bank the case study

The point of doing client #1 properly.

Write up, in `clients/<slug>/`: what the business needed, what got built, what got listed, and **the results with real numbers** — impressions, queries, calls, enquiries. Numbers, not adjectives.

This is what the agency portfolio site gets built from later. (Already decided: **the portfolio comes after Kesri ships with results.** An empty portfolio is weak, and building it first is procrastination from selling.)

## Step 7 — Close the phase

Update `engagement.md`: tick Phase 4, record the handover date, the testimonial, and the referral names. Set ▶ NEXT ACTION to the first monthly report date.

Close with: **"Run `/client-retainer <slug>` when the first monthly report is due — that's the report that makes them keep paying."**

## Rules

1. **Every account in the client's name.** Domain, GBP, GSC, email, listings. Never hold a domain hostage — it is not leverage, it is a reputation, and the referral engine runs in reverse just as fast as it runs forward.
2. **Disclose the shared-hosting dependency plainly.** A dependency the client knows about is a service. One they discover later is a trap.
3. **Show the win in person, on their phone, with a live test enquiry.** An emailed link is not a handover. A client who doesn't feel it doesn't refer and doesn't renew.
4. **Ask for the referral directly, and ask for ONE introduction.** "Let me know if you hear of anyone" produces exactly nothing.
5. **Get portfolio permission in writing.** A verbal yes from a relative is not permission to publish a client's name on a public site.
6. **The retainer starts at handover.** Deferring it is how you become unpaid lifetime support.
7. **The testimonial must be specific.** "Great work" is worthless. "We had a brochure; now buyers find us on Google" closes the next client.
