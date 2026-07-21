# Pinterest — one-time account setup

> **Status: NOT CREATED as of 2026-07-20.** Queued 2026-07-03, queued again 07-07, never done.
> This file exists so it stops being a decision and starts being a checklist.
> **Update the STATUS line and the log at the bottom the moment it's done.**

**Time:** ~45 minutes, one sitting. Do not split this across days — that is exactly how it died twice.
**Cost:** $0. Business accounts are free.
**Email:** personal Gmail only. **Never `@thinksys.com`.** Hard boundary.

**One account. All three products.** Pinterest added multi-domain claiming in 2021, so one
business account can claim `accentwallplanner.com`, `gradejar.com` and `jsonbeam.com`. You never
make a second Pinterest account. (A given *domain* can only be claimed by one account, which is
fine — each of ours is claimed once, here.)

---

## Step 1 — Create the business account (~5 min)

1. Go to **https://www.pinterest.com/business/create/**
2. Sign up with your **personal Gmail**. Pick a password and save it wherever you keep the others.
3. When it asks for profile details, paste these exactly:

**Profile photo:** upload `references/brand/tarun-web-solutions-mark.svg` converted to PNG, **or**
skip it for now and add it later. Do not block on this.

**Business name** (this is the display name people see — 65 char limit):

```
Tarun Builds | DIY Wall Projects & Teacher Tools
```

**Website:**

```
https://accentwallplanner.com
```

**Country/region:** India
**Language:** English

> **Why India is fine here.** Your *audience* targeting is US-first, but your account's country
> setting is just where you are. It does not restrict who sees your pins. Pinterest distributes on
> pin language and keywords, not account geography.

4. **Business type:** choose **Creator** if offered the choice, otherwise **Blogger**.
   Do NOT choose "Online merchant" — that pushes you into a shopping/catalog flow you don't need.
5. **"Do you want to run ads?"** → **No**. This is a hard $0 constraint.
6. Skip every "connect your accounts" and "install the tag" upsell for now.

---

## Step 2 — Fill the profile (~5 min)

**Settings → Public profile** (or Edit profile).

**Username** (this becomes `pinterest.com/<username>` — 30 char limit):

```
tarunbuilds
```

Fallbacks in order if taken: `tarun_builds` · `tarunmakes` · `tarunbuildsit`
**Whatever you pick, write it into `marketing/accounts.md` immediately.** Handle consistency across
platforms is the whole point of that file.

**About / bio** (160 char limit — this is 139):

```
Free tools I build: plan an accent wall to scale with a real cut list, and grade papers without uploading student data. No sign ups.
```

**Do not** write "ad-free" or "no ads" anywhere. That exact claim triggered the JsonBeam AdSense
rejection. "No sign ups" is factually true for all three products and is safe.

---

## Step 3 — Claim all three domains (~20 min, the important part)

This is what unlocks Rich Pins, attribution on every pin, and the analytics you'll judge the
channel by. Without it the whole engine is unmeasurable.

**In Pinterest:**

1. **Settings → Claimed accounts** (older UI calls it "Link to Pinterest" in the left nav)
2. Next to **Websites**, click **Claim**
3. Choose the **Add TXT record** method (not the HTML tag, not the file upload — DNS is cleaner and
   survives redeploys)
4. Click the text box to **copy the TXT value**. It looks like `pinterest-site-verification=...`

**In Cloudflare, for that domain:**

5. https://dash.cloudflare.com → select the zone → **DNS → Records → Add record**
6. Fill in exactly:

   | Field | Value |
   |---|---|
   | Type | `TXT` |
   | Name | `@` |
   | Content | *(paste the value Pinterest gave you)* |
   | TTL | Auto |

7. **Save**

**Back in Pinterest:**

8. Enter the site URL in the box and click **Verify**.

**Then repeat steps 2-8 for the other two domains:**

| Order | Domain | Why this order |
|---|---|---|
| 1st | `accentwallplanner.com` | Gets 3 of 5 daily slots. Highest value, do it first. |
| 2nd | `gradejar.com` | Tuesday slot. |
| 3rd | `jsonbeam.com` | Claim it for completeness. You will rarely pin it — devs aren't here. |

**Verification check — do this, don't assume it propagated:**

```powershell
nslookup -type=TXT accentwallplanner.com
nslookup -type=TXT gradejar.com
nslookup -type=TXT jsonbeam.com
```

Each should list a `pinterest-site-verification=` string. Cloudflare usually propagates in under a
minute. Pinterest's docs say allow up to 48 hours, but if the `nslookup` shows the record and
Pinterest still says "Verification in progress," that's Pinterest's queue, not your DNS. Wait it out.

> **Careful:** these domains already carry TXT records for Google Search Console and email. **Add** a
> new record. Do not edit or overwrite the existing ones. A domain can hold many TXT records.

---

## Step 4 — Enable Rich Pins (~5 min)

Rich Pins pull your page title and description onto the pin automatically and refresh when you update
the page. Free, and it makes every pin look native instead of like an ad.

1. Go to **https://developers.pinterest.com/tools/url-debugger/**
2. Paste `https://accentwallplanner.com/board-and-batten` and click **Validate**
3. If it passes, click **Apply now**. Approval is usually instant to a few hours.
4. Repeat once with a `gradejar.com` URL.

All three sites already emit Open Graph tags (each has an `og.png` and OG meta), so this should pass
first try. If it fails, note the exact error in the log below — that's a real product bug worth fixing,
not something to work around.

---

## Step 5 — Create the boards (~10 min)

Board names are Pinterest's keyword surface. These are chosen off the real search data in
`research/accent-wall-trim-planner-demand.md`, not invented.

**Create each board as PUBLIC. Leave "Keep board secret" OFF.** A secret board ranks for nothing.

### AccentWallPlanner boards (6)

| Board name | Description to paste |
|---|---|
| `Accent Wall Ideas` | Accent wall layouts you can actually build. Board and batten, picture frame molding, wainscoting and slat wall, each planned to scale with a real cut list. |
| `Board and Batten Accent Wall` | Board and batten spacing, layouts and cut lists for real wall sizes. Even and uneven batten spacing, planned to scale before you cut anything. |
| `Wainscoting Ideas and Layouts` | Wainscoting panel layouts, heights and spacing worked out to scale. Includes the exact cut list so you buy the right number of boards. |
| `Picture Frame Molding Walls` | Picture frame molding grids and box layouts, including different size boxes on one wall. Long point miter measurements included. |
| `Slat Wall Ideas` | Slat wall spacing and layouts planned to scale, with the cut list and board count worked out for your wall size. |
| `Accent Wall Colors` | Accent wall color ideas including tone on tone, where the trim matches the wall. Plaster, greige, sage, dusty blue, clay, olive, navy, forest, charcoal and ink. |

`Wainscoting Ideas and Layouts` matters most. `wainscoting` is **2,900 searches/mo and flat across
25 weeks** — the biggest term in the entire niche, and the site currently barely targets it.

### GradeJar boards (3)

| Board name | Description to paste |
|---|---|
| `Grading Charts for Teachers` | Printable grading charts and quick reference tables. Percentage to letter grade, wrong out of total, and standard vs plus minus scales. |
| `GPA Scales and Conversion` | GPA scale charts and conversion tables. 4.0 scale, weighted vs unweighted, percentage to GPA, and SGPA to CGPA. |
| `Teacher Time Savers` | Free classroom tools that save grading time. Nothing uploaded, no logins, no student data leaving your browser. |

> These replace the four boards drafted in `accounts.md` on 07-03 (`Grading Tips · Gradebook Setup ·
> GPA Help · Teacher Time-Savers`). Three reasons: `GPA Help` and `Grading Tips` carry almost no
> search weight as phrases, `Gradebook Setup` describes a feature rather than something a teacher
> searches for, and three well-fed boards beat four thin ones.

### JsonBeam boards

**None. Do not create any.** Developers do not use Pinterest to find tools. The domain is claimed for
completeness and attribution only. JsonBeam is marketed through directories, Product Hunt and
GitHub — see `marketing/jsonbeam/placements.md`.

---

## Step 6 — Register what you did

Open `marketing/accounts.md` and fill in:

- The username you actually got
- Today's date
- Which of the three domains verified, and which are still pending

Then update the STATUS line at the top of this file.

---

## What NOT to do

- **Don't pin anything yet.** The images and their copy come first — run
  `node scripts/generate-pins.mjs` in the AccentWallPlanner repo, which writes both to
  `marketing-out/`. (25 pins are already drawn.)
  A board with 2 random pins looks abandoned; the first batch should land together.
- **Don't buy Pinterest ads.** $0 is a hard constraint.
- **Don't install the Pinterest tag** on any site. It's a third-party tracker, it costs you page
  speed on sites where Lighthouse 100 is a real target, and you get the numbers you need from
  Pinterest Analytics plus GA4 referral data anyway.
- **Don't convert your personal Pinterest account** if you have one. Fresh business account, clean slate.
- **Don't create a second Pinterest account for a second product.** That's the whole reason this file
  is portfolio-wide.

---

## What to expect (so you don't kill it early)

Pinterest is slow and front-loads the work. From Pinterest's own published behaviour:

| When | What you should see |
|---|---|
| Week 1-2 | Impressions start. Not traffic. **Impressions are the only early signal that matters.** |
| Day 60-90 | First real referral traffic in GA4 |
| Month 3-4 | Compounding starts |

**Verdict date: 2026-10-20.** Do not judge this channel before then. Judge it on Pinterest Analytics
impressions plus GA4 referral sessions, and write the verdict into `decisions/log.md` either way.

---

## Log

| Date | What happened |
|---|---|
| 2026-07-03 | Queued in the first marketing session. Not done. |
| 2026-07-07 | Queued again as a "Sunday ~30-min batch". Not done. |
| 2026-07-20 | This runbook written. Account still not created. |
