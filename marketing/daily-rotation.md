# The daily rotation — 15-20 min, one product a day

> **The rule that makes this work: you never decide anything.** Open the day's file, do the named
> action, tick the box, close it. Every previous version of this engine died because it handed you
> a menu, and choosing costs more than doing.
>
> Set up 2026-07-20. Sits *under* the Sunday `/marketing` session, it does not replace it.

## Before day one

`marketing/setup/pinterest.md` — one ~90 minute sitting. Nothing below runs until the Pinterest
account exists and the domains are claimed. **This is the step that failed on 07-03 and again on
07-07. Do it in one go.**

Then, in the AccentWallPlanner repo:

```powershell
node scripts/generate-pins.mjs
```

25 pins are already drawn and waiting in `marketing-out/pin-bank.md`. Re-run it any time; it only
draws what is missing.

---

## The week

| Day | Product | Do this | Open |
|---|---|---|---|
| **Mon** | AccentWallPlanner | Upload the next **3 pins** | `AccentWallPlanner/marketing-out/pin-bank.md` |
| **Tue** | JsonBeam | Do the next **1 item** | `marketing/jsonbeam/placements.md` |
| **Wed** | AccentWallPlanner | Upload the next **3 pins** | `AccentWallPlanner/marketing-out/pin-bank.md` |
| **Thu** | JsonBeam | Do the next **1 item** | `marketing/jsonbeam/placements.md` |
| **Fri** | AccentWallPlanner | Upload the next **3 pins** | `AccentWallPlanner/marketing-out/pin-bank.md` |

Weekends are off. `/daily-log` does not run then either.

**A pin upload is:** open Pinterest → Create → upload the PNG → paste Title, Description, Alt →
pick the Board → paste the Destination link → Publish. Roughly 4 minutes each once you've done
three. Everything you paste is already written in the file.

**Tick the box in the file as you go.** That is the only state tracking. Pinterest counts a pin as
fresh on the image file, so a pin that is already ticked must never be re-uploaded.

---

## Why GradeJar is not in the rotation yet

Because its content does not exist yet, and putting an empty slot in the week is how the last two
engines died.

GradeJar's Pinterest content is **reference charts** — percentage to letter grade, wrong-out-of
tables, GPA scales — not screenshots of the app. Teachers save charts. Nobody saves a screenshot of
a calculator. Building the chart generator (the same pattern as `generate-pins.mjs`, rendering from
the live `grade-core` engine) is the next build-mode task.

**When it ships, Tuesday becomes GradeJar** and JsonBeam holds Thursday alone. The JsonBeam queue is
finite anyway — roughly 6 weeks at 2 items a week — so the slot frees itself.

Until then GradeJar's marketing is what is already running: the two pitch threads (closed), the
seasonal pSEO set held for the AdSense verdict, and the **Aug 1 - Sep 15 back-to-school window**,
which is a sprint, not a daily drip. That window is the real GradeJar play and it is three weeks out.

---

## Runway

25 AWP pins ÷ 3 per session = **8 sessions ≈ 2.7 weeks** of Mon/Wed/Fri.

Before you run out, either add entries to `AccentWallPlanner/scripts/pin-set.mjs` and re-run, or ask
the AIOS to extend the set. **Add a query, never a loop** — the file explains why, and it is the same
scaled-content rule that governs the site itself.

---

## What to expect, so you don't kill it early

| When | What you should see |
|---|---|
| Week 1-2 | Pinterest impressions start climbing. **Not traffic.** |
| Day 60-90 | First real referral sessions in GA4 |
| Month 3-4 | Compounding |

**Verdict date: 2026-10-20.** Do not judge Pinterest before then. This will look dead through
August and that is the normal shape of the channel, not a failure.

**One measurement gap to close first:** AccentWallPlanner has **no GA4 property** — only JsonBeam
does. Cloudflare's edge numbers include bots and will not tell you whether a human arrived from
Pinterest. Wire GA4 on AWP before the pins start or the whole channel is unmeasurable.

---

## Rules

1. **Never re-upload a ticked pin.** Freshness is judged on the image file.
2. **Never write "ad-free" or "no tracking"** for any product. That claim caused the JsonBeam
   AdSense rejection. "Free · no sign up" is true and safe.
3. **No LinkedIn.** Hard boundary, job growth only.
4. **A missed day is skipped, not made up.** Doubling up tomorrow is how a daily habit becomes a
   chore and then becomes nothing. Just do the next three.
5. **If you have less than 15 minutes, do one pin.** One is not failure. Zero for a week is.
