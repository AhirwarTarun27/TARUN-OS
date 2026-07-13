---
name: adsense-ready
description: Make a site AdSense-approvable by construction, and prove it before applying. Two modes — `contract` writes the compliance contract for a project being scoped (trust pages, content-depth bar, interlinking map, ad placement plan, pre-application gate); `audit` walks an existing repo against every official Google policy and returns a ranked blocker list. Trigger on "/adsense-ready", "adsense compliance", "will this get approved", "audit for adsense", "low value content", "trust pages", "privacy policy for ads", "am I ready to apply". One run = one compliance contract, or one PASS/NOT-READY verdict with a ranked fix list.
---

# AdSense Ready — approvable by construction, not by cleanup

Google will not serve ads on a screen that has no publisher content. **A bare tool widget is such
a screen.** Every rule below follows from that one sentence.

This skill exists because the pipeline that produced JsonBeam and GradeJar treated AdSense as a
launch-day task. JsonBeam was **rejected for low-value content on 2026-07-08**. GradeJar's trust
pages got bolted on after the build. Both were avoidable at design time, for free. Approval is not
a cleanup phase — it is a build requirement.

**This file is self-contained on purpose.** It is copied verbatim into every product repo, where it
has no access to the AIOS. It references nothing outside its own folder. Do not add relative paths
into it.

> Deeper source material (only available inside the AIOS repo, and not required to run this skill):
> `references/adsense-policy.md` for the full policy corpus with citations, and
> `references/adsense-economics.md` for the revenue math.

## Two modes

| Mode | When | Output |
|---|---|---|
| **`contract`** | A project is being *scoped*. Called by `/explore-project` step 5. | The **AdSense Compliance Contract** — routes, content bar, interlinking map, ad plan, pre-application gate. Gets baked into the handoff prompt. |
| **`audit`** | A repo *exists*. Run at every milestone, and before applying to AdSense. | **PASS** or **NOT READY — N blockers**, ranked, each with file path + the policy violated + the fix. |

Default to `audit` if the user doesn't say. If the repo has no code yet, it's `contract`.

## Inputs

- **contract mode:** the product, its audience, the stack, and — critically — the **full route list**.
- **audit mode:** the repo. Read the routes, the layout/footer components, the ad components, the
  `public/` root, `robots.txt`, and any programmatic page generator (`getStaticPaths` or equivalent).
  If the site is live, verify the live URLs too, not just the source.

## Execution — walk all eight groups, every time

Never spot-check. A single FAIL in group C or F blocks approval on its own, and the whole point is
to find it before Google does.

### A. Publisher identity & trust pages

The privacy policy is the **one hard policy requirement** in Google's text: publishers *"must have
and abide by a privacy policy that clearly discloses any data collection, sharing, and usage."*
The rest are not named in policy but are what the reviewer's quality judgment actually rests on —
Google's own Who/How/Why framework asks *"is it self-evident to your visitors who authored your
content?"* **A site with no About and no Contact has no answer to "who made this."**

- [ ] **`/privacy`** exists and explicitly discloses:
  - third-party vendors **including Google** use cookies to serve ads based on prior visits;
  - Google's advertising cookies enable it and its partners to serve ads based on visits to this
    and other sites;
  - users can opt out via Google Ads Settings and `aboutads.info`;
  - any other ad networks are named and linked.
- [ ] **`/about`** — a real person, a real reason the tool exists, real expertise. Not a stub.
- [ ] **`/contact`** — a form that **actually sends**, or a real address. A dead form is worse than none.
- [ ] **`/terms`** — present. Cheap, expected on a monetized site.
- [ ] **`/how-it-works` or `/methodology`** — **the highest-value page a tool site can have.** Where
      the tool explains its formula, assumptions, and sources. This is what converts "a widget" into
      "a publisher with expertise." Its absence is the most common silent failure.
- [ ] The tool page carries a byline or a "built by" line that leads somewhere real.

### B. Navigation & interlinking

Google rejects sites that are *"difficult to navigate"*, naming: redirects, login walls, **broken
links**, excessive pop-ups, and **pages under construction**.

- [ ] Header nav reaches every top-level section. Dropdowns actually work.
- [ ] **Footer links every trust page, from every page.**
- [ ] **Zero orphan pages.** Everything is reachable within **2 clicks** of home.
- [ ] Programmatic/child pages link **up** to their parent and **across** to 3-5 siblings.
- [ ] Breadcrumbs + `BreadcrumbList` JSON-LD on nested routes.
- [ ] No broken links, no redirect chains, no under-construction routes, no login walls.
- [ ] `sitemap.xml` exists and is submitted; `robots.txt` permits crawling.

> This group is also the **session-depth lever**. Internal linking lifts pages-per-session 40-60%,
> and pages-per-session is a direct multiplier on revenue. Compliance and money are the same fix here.

### C. Original content depth — the low-value-content killer

**This is the group that rejected JsonBeam. Weight it accordingly.**

Google Publisher Policies prohibit ads *"on screens without publisher-content or with low-value
content."* Read literally: **the calculator is not the content.** It is functionality. The content
is what a human wrote around it.

- [ ] **Every ad-carrying route has original prose that stands alone without the tool.** Delete the
      widget mentally — is there still a page worth reading? If no, it is a screen without publisher
      content.
- [ ] Each money page has: a real H1, substantive hand-written body copy, and a FAQ answering
      questions people actually ask. Complete sentences and paragraphs — Google names *"too little
      text"* and pages that are *"mostly images"* as rejection reasons.
- [ ] **Ad-to-content ratio:** never more ads than publisher content on a screen.
- [ ] No scraped, replicated, or lightly-rewritten content.
- [ ] **The programmatic-SEO ruling — this is the trap.** Templated pages with variables swapped are
      **scaled content abuse** under Google's Search spam policies (*"many pages generated for the
      primary purpose of manipulating search rankings and not helping users"*). There are exactly two
      compliant options:
      1. **Differentiate them** — each page carries genuinely distinct, useful content. If you can't
         write it, you can't ship it.
      2. **Ship them `noindex` AND ad-free** — they can exist as a UX convenience; they just can't be
         indexed *and* monetized while thin.

      **Never: templated + indexed + monetized.** A generator emitting ~100 near-identical pages with
      an ad slot in the layout is an automatic FAIL, regardless of how good the tool is.

Google's own reviewer lens — if a page can't pass these, it won't pass review:
*"Does the content provide original information, reporting, research, or analysis?"* ·
*"Does it provide insightful analysis beyond the obvious?"* ·
*"Is this the sort of page you'd bookmark or share with a friend?"* ·
*"Does it provide substantial value compared to other pages in search results?"*

### D. Ad implementation & placement

- [ ] **Slots reserved at first paint** — explicit `aspect-ratio` + `min-height` per breakpoint. Ads
      load `async`. Nothing is ever inserted above the main content after paint. (CLS *and* policy.)
- [ ] **≥150px between any ad and an interactive control.** Google states this for games; **it applies
      with full force to a calculator with buttons.** An ad beside a "Calculate" button is an
      accidental-click machine and a policy violation.
- [ ] Ads are labelled only **"Advertisement"** or **"Sponsored Links"**. Never "Resources", never
      "Helpful links".
- [ ] **No ad is disguised as UI** — not styled as a button, a result card, or part of the tool.
- [ ] **No ads on empty states** (the tool before the user has entered anything), error screens, 404s,
      or under-construction routes.
- [ ] No encouragement to click: no "support us", no arrows, no animation drawing the eye to ads.
- [ ] No auto-refresh of the page or an ad slot without an explicit user action.
- [ ] **Better Ads Standards** — mobile **ad density ≤30%** of page height (desktop ≤50%). No pop-ups,
      prestitials, large sticky ads, flashing animation, or auto-playing video with sound. Sticky and
      inline ads both count toward density.

### E. Privacy & consent plumbing

- [ ] **Certified CMP integrated with IAB TCF** if EEA/UK/Switzerland traffic is expected. Mandatory
      since 2024-01-16. Without it, those users get **non-personalized ads only** — a direct revenue
      cut, not just a compliance box.
- [ ] **No PII passed to Google**, ever.
- [ ] **COPPA / child-directed:** answer this explicitly, do not skip it. If any part of the site is
      child-directed, tag it and disable personalized ads. **A grade calculator has student users —
      this question has a real answer and it must be written down.**
- [ ] No sensitive-category targeting (health, finance, race, religion, criminal history, politics,
      union membership, sexual orientation).
- [ ] Precise location, if collected at all, requires explicit opt-in.

### F. Technical prerequisites

- [ ] Site is **live and publicly reachable** — no password protection.
- [ ] **Valid SSL**, HTTP → HTTPS redirect.
- [ ] **`robots.txt` does not block the AdSense crawler** (`Mediapartners-Google`).
- [ ] **Ad code in `<head>`**, or ownership verified via Search Console.
- [ ] **`ads.txt` at the domain root**, serving, correct publisher ID:
      ```
      google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
      ```
- [ ] Site added to the Sites list in the AdSense account.

### G. Content policy screen

- [ ] Nothing illegal, infringing, scraped, counterfeit, dangerous, derogatory, or misrepresenting.
- [ ] No unreliable claims (health / election / climate misinformation), deceptive practices, or
      manipulated media.
- [ ] Content is primarily in a supported language.
- [ ] **Not in a Publisher-Restricted category** — sexual, shocking, weapons, tobacco, drugs, alcohol,
      gambling, prescription/unapproved pharma. These are **not bans**: ads still serve, but advertiser
      demand collapses and RPM craters. Flag as a *revenue* risk, not a compliance one.

### H. The pre-application gate

**Do not submit to AdSense until A-G are green.** Review takes days to 2-4 weeks, and **a rejection
restarts the clock.** Applying early is the most expensive mistake available — and it is the one
already made once.

- [ ] A-G all pass.
- [ ] **Site is verified in Search Console and at least partially indexed.** If Google hasn't indexed
      it, the reviewer is looking at a site Google doesn't know.
- [ ] Zero thin/templated pages indexed — or they are `noindex` **and** ad-free.

## Output

### contract mode — the AdSense Compliance Contract

Written to be pasted straight into a handoff prompt. Five parts:

1. **Site skeleton** — the exact route list including `/about`, `/contact`, `/privacy`, `/terms`,
   `/how-it-works`, and where each is linked from.
2. **Content-depth bar per route type** — what "real publisher content" means for *this* product,
   route by route, plus the explicit ruling on any programmatic routes.
3. **Interlinking map** — header nav, footer nav, breadcrumbs, up-links and sibling-links, no orphans.
4. **Ad placement plan** — which slots, reserved how, and what may never sit near the tool controls.
5. **Pre-application gate** — the checklist that must be green before submitting.

### audit mode — the verdict

A table, most severe first:

| Group | Item | Status | File | Policy | Fix |
|---|---|---|---|---|---|
| C | `/[style]/[w]x[h]-wall/` pages are templated + indexed + carry ads | **FAIL** | `src/pages/[style]/[wxh].astro` | Scaled content abuse; ads on low-value screens | `noindex` + strip the ad slot, or write distinct content per page |

Then a single line:

> **NOT READY — 4 blockers.** Fix C-1, A-1, F-2, B-3 in that order, then re-run.

or

> **READY TO APPLY.** All eight groups pass.

## Rules

1. **A bare widget is not a page.** If deleting the tool leaves nothing worth reading, the route is
   a screen without publisher content. This is the rule that everything else serves.
2. **Never templated + indexed + monetized.** Programmatic pages pick one: differentiated, or
   `noindex` + ad-free.
3. **Never approve your own homework.** Audit against the actual files and the live URLs, not against
   what the plan says was built. Cite the file path for every finding.
4. **Report before fixing.** Hand over the ranked blocker list and stop. The human decides what gets
   fixed and in what order.
5. **The gate is binary.** "Mostly compliant" is NOT READY. A rejection costs 2-4 weeks; one more
   day of writing costs one day.
6. **Compliance and revenue are the same lever.** Every fix in groups B and C also raises
   pages-per-session, which is a direct multiplier on RPM. Never present this work as a tax — it is
   the business model.
