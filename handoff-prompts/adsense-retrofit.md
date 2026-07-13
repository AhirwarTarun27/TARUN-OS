# AdSense compliance retrofit — paste into an existing product repo

> **How to use this:** open the product repo (GradeJar, AccentWallPlanner, JsonBeam) in a fresh
> Claude Code session and paste everything below the line. Delete the bracketed line that doesn't
> apply to that repo. Nothing else needs editing.

---

## Your task

This site is monetized with Google AdSense. AdSense approval was never designed into the build, and
it needs to be — a sibling product in this portfolio (**JsonBeam**) was **rejected for low-value
content on 2026-07-08**, and the same failure shape is likely present here. Your job is to find it,
report it, and fix it.

### Step 0 — Install the compliance gate

Copy this folder into this repo:

```
FROM: C:\Users\ahirwar.tarun\Documents\Learning\MyProjects\TARUN-OS\.claude\skills\adsense-ready\
TO:   <this repo>\.claude\skills\adsense-ready\
```

Read `SKILL.md` in full before doing anything else. It is self-contained — it encodes the official
Google AdSense Program policies, Google Publisher Policies, ad placement policies, Better Ads
Standards, and Search spam policies, distilled into eight checkpoint groups. It is now a permanent
part of this repo: run `/adsense-ready audit` at the end of every future feature, not just today.

### Step 1 — Audit the whole repo

Run `/adsense-ready audit` across **every route in the site**, not just recently-changed files.
Check the source *and*, if the site is live, the live URLs — a route can be correct in source and
broken in production.

Walk all eight groups. Do not spot-check. Group C (content depth) and Group F (technical) each
contain single items that block approval on their own.

### Step 2 — Report, then STOP

Hand back the ranked blocker list: each finding with its **file path**, the **exact policy it
violates**, and the **fix**. Most severe first. End with the single verdict line — `READY TO APPLY`
or `NOT READY — N blockers`.

**Then stop and wait for approval.** Do not write any code until the human has picked what to fix
and in what order. Some findings may be deliberate trade-offs they already know about.

### Step 3 — Fix what's approved, then re-audit

Implement only the approved fixes. Re-run `/adsense-ready audit` until it returns PASS.

### Step 4 — Hand off

Write the commit message and hand it over. **Never run git commands.** The human pushes.

---

## Known landmines in this repo

**[ IF THIS IS AccentWallPlanner ]**
Features are complete, but the build was scoped from a handoff prompt that contained **zero**
AdSense compliance requirements. Two things are almost certainly wrong, and you should confirm both
before looking anywhere else:

1. **There are no trust pages.** The route list was `/`, four style pages, and the programmatic
   long-tail. No `/about`, `/contact`, `/privacy`, or `/terms`. The privacy policy is the **one hard
   requirement in Google's policy text** — its absence is an automatic rejection, and it must carry
   the specific Google-advertising-cookie disclosures named in the skill.
2. **The ~100 programmatic `[style]/[w]x[h]-wall/` and `[rows]x[cols]-grid/` pages are the big
   risk.** If they are templated (the same copy with numbers swapped), indexed, and carrying ads,
   that is **scaled content abuse** under Google's Search spam policies *and* ads on low-value
   screens under the Publisher Policies. Pick one: differentiate each page with genuinely distinct
   content, or ship them `noindex` **and** ad-free. Never templated + indexed + monetized.

Also check: the planner has interactive controls, so verify the **≥150px ad-to-control distance**
(accidental-click policy), and confirm **no ad renders on the empty state** before the user has
entered wall dimensions.

**[ IF THIS IS GradeJar ]**
Trust pages already exist (about / privacy / terms / contact shipped 2026-07-02), so start from the
two open questions instead:

1. **Does `/privacy` actually carry the required Google disclosures?** Existing is not the same as
   compliant. It must explicitly say that third-party vendors *including Google* use cookies to serve
   ads based on prior visits, and it must link the opt-outs (Google Ads Settings, `aboutads.info`).
2. **The COPPA / child-directed question has never been answered.** This is a grade calculator — it
   has **student users**. Personalized advertising is prohibited to users under 13 and on
   child-directed sites. Decide explicitly whether any part of this site is child-directed, write the
   answer down, and if yes, tag it and disable personalized ads. Do not skip this.

Then run the full eight groups anyway — especially Group C on any thin routes.

---

## Operating rules

- **Report before fixing.** Always.
- **Never run git commands.** Write the commit message; the human pushes.
- **Don't claim a route is compliant without opening it.** Cite the file path for every finding.
- **Don't soften the verdict.** "Mostly compliant" is NOT READY. A rejection costs 2-4 weeks of
  review clock; one more day of writing costs one day.
