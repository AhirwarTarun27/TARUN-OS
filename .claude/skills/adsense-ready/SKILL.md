---
name: adsense-ready
description: Make a site AdSense-approvable by construction, prove it BEFORE applying, and recover if it was rejected. Three modes — `contract` writes the compliance contract for a project being scoped (trust pages, content-depth bar, interlinking map, ad placement plan, pre-application gate); `audit` walks an existing repo against every official Google policy and returns a ranked blocker list; `recover` handles a rejection (dates the verdict against the repo, finds what would sink the re-review, and gives the deploy → reindex → wait-for-recrawl → resubmit sequence). Trigger on "/adsense-ready", "adsense compliance", "will this get approved", "audit for adsense", "low value content", "adsense rejected", "site isn't ready to show ads", "request review", "trust pages", "privacy policy for ads", "am I ready to apply". ALWAYS ask whether the site has already been submitted — an audit that runs after Apply is a post-mortem, not a gate.
---

# AdSense Ready — approvable by construction, not by cleanup

Google will not serve ads on a screen that has no publisher content. **A bare tool widget is such
a screen.** Every rule below follows from that one sentence.

This skill exists because the pipeline that produced JsonBeam and GradeJar treated AdSense as a
launch-day task. JsonBeam was **rejected for low-value content on 2026-07-08**. GradeJar was
**rejected for low-value content on 2026-07-14**. Approval is not a cleanup phase — it is a build
requirement.

## Read this before anything else: the audit is worthless if it runs after Apply

**GradeJar's rejection was not a content failure. It was an ordering failure.**

| When | What |
|---|---|
| **2026-07-03** | ads.txt + ad script deployed. **The application entered Google's queue here.** |
| 2026-07-13 | The `audit` finally runs. It finds everything. +2,722 lines of fixes ship. |
| **2026-07-14** | Rejection arrives — **for the site as it was on July 3.** |

The audit was correct, thorough, and **ten days too late to be in the thing being judged.** Google
reviewed a site that had already been fixed in the repo. Every hour spent writing prose after the
Apply button is pressed buys nothing.

So, before a single check below:

> ### Question 0 — has anyone already applied?
> **Ask the user outright: "Have you submitted this site to AdSense yet, or clicked *Request
> review*?"** Do not infer it from the repo; the Apply button lives in a dashboard, not in git.
>
> - **Not yet** → good. Run `audit`. The gate in Group H is real and it holds.
> - **Already applied, verdict pending** → **say so loudly and stop treating this as an audit.**
>   Fixes landing now are *not* being reviewed. Tell the user plainly: the verdict will be about the
>   site Google already crawled, and a rejection is likely if it was thin. Then fix anyway — but
>   frame it as preparing for the *re-review*, and go to `recover` mode for the sequencing.
> - **Already rejected** → this is **`recover` mode.** See it below. Do not just re-run the
>   checklist and tell them to click Request review; that is how the loop repeats.

**A checklist that cannot fire before the irreversible action is not a gate. It is a post-mortem.**

**This file is self-contained on purpose.** It is copied verbatim into every product repo, where it
has no access to the AIOS. It references nothing outside its own folder. Do not add relative paths
into it.

> Deeper source material (only available inside the AIOS repo, and not required to run this skill):
> `references/adsense-policy.md` for the full policy corpus with citations, and
> `references/adsense-economics.md` for the revenue math.

## Three modes

| Mode | When | Output |
|---|---|---|
| **`contract`** | A project is being *scoped*. Called by `/explore-project` step 5. **The only mode that prevents the problem.** | The **AdSense Compliance Contract** — routes, the **route→component table**, the content bar *as numbers*, interlinking map, ad plan, pre-application gate. Gets baked into the handoff prompt. |
| **`audit`** | A repo *exists* and **has not been submitted**. Run at every milestone, and before applying. | **PASS** or **NOT READY — N blockers**, ranked, each with file path + the policy violated + the fix. |
| **`recover`** | The site was **rejected**. | A **root-cause split** (what Google actually saw vs. what the repo says today), the fix list, and the **resubmission sequence** — which is not "click Request review". |

Default to `audit` if the user doesn't say. If the repo has no code yet, it's `contract`.
**If the site has been rejected, it is `recover` — always, no matter what the user asks for.**

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
- [ ] **AI-disclosure.** Google's How question: *"Is the use of automation, including AI-generation,
      self-evident to visitors through disclosures?"* If the prose was AI-drafted at scale, a human
      must own it — a named author who actually reviewed it, and copy that reflects real decisions
      the tool makes. Scaled content abuse **explicitly covers AI-generated content**; "a model wrote
      500 unique-looking words per route" is the thing the policy is aimed at, not a defence against it.

- [ ] **Every bar in "The numbers" below is met.** Word floor, FAQ count, editorial-page count, ad
      count, sibling overlap. Failing one is a finding, not a debate.
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

- [ ] **The one-widget-many-routes rule — the trap that a prose-only audit walks straight past.**
      Templated *functionality* is a doorway just as templated *prose* is. **Count the distinct
      components, not just the distinct words.**

      GradeJar is the case study, and it is the reason this rule exists. After the content retrofit,
      every route had 400–700 words of genuinely unique, hand-written prose — **zero** measurable
      5-gram overlap. It passed every content check in this skill. And it was **still a keyword
      doorway cluster**, because three Preact islands were backing eleven indexed, ad-carrying routes:

      - `/ez-grader` and `/test-grade-calculator` → **byte-identical mounts.** Same component, no props.
      - `/grade-calculator` and `/weighted-grade-calculator` → **byte-identical mounts.**
      - `/semester-grade-calculator` → the same component **plus a heading string.**

      Five routes, two widgets, five keywords. A thousand unique words underneath an identical
      calculator is still one tool wearing five hats — and the shipped HTML had even confessed it
      in prose: *"the semester grade calculator is **the same tool**, framed for your whole semester."*

      **The test:** for every pair of ad-carrying routes that mount the same component, ask *"if I
      deleted one of these, what could a user no longer do?"* If the answer is "nothing — they'd just
      type the same numbers into the same boxes on the other page", **they are one page and one of
      them is a doorway.** Differentiate by **function** (different default mode, different inputs,
      different validation, a capability one genuinely cannot express) or merge them. Different words
      about the same widget do not count, and neither does a different `heading` prop.

      Grep for it: list every route's mounted component and its props. Any two routes with the same
      component and equivalent props are a **FAIL**, and the finding must name both routes.

Google's own reviewer lens — if a page can't pass these, it won't pass review:
*"Does the content provide original information, reporting, research, or analysis?"* ·
*"Does it provide insightful analysis beyond the obvious?"* ·
*"Is this the sort of page you'd bookmark or share with a friend?"* ·
*"Does it provide substantial value compared to other pages in search results?"*

#### The numbers — so this stops being a vibe check

Google publishes no word count, and neither did this skill, which meant the bar was re-invented every
run **by the same model that wrote the content**. These are not Google's thresholds; they are the
floor below which you are not allowed to argue. Failing one is a finding, not a debate:

| Bar | Floor | Why |
|---|---|---|
| Hand-written prose per ad-carrying route | **≥ 500 words** (excl. nav, footer, widget labels, FAQ) | Below this the widget *is* the page |
| FAQ per money page | **≥ 4 Q&A**, answering real queries | Fewer reads as SEO garnish |
| Pages of pure editorial (exist with **no** widget at all) | **≥ 3**, and one must be `/how-it-works` | A site of nothing but tools has no publisher voice |
| Ad units per screen | **≤ 3** in-content, and **fewer ads than content blocks** | Policy: never more ads than publisher content |
| Sibling prose overlap (5-gram Jaccard) | **< 1%** between any two routes | See below — measure it, don't assert it |

**Count the prose, not the file.** Word counts come from the **rendered page text** — strip nav,
header, footer, widget labels, button text, and the FAQ block, then count what's left. Counting the
source file (or the whole DOM) inflates every number and quietly passes a page that would fail.

#### Measure uniqueness. Do not assert it.

The old version of this skill said "each page carries genuinely distinct content" and left an LLM to
grade its own homework. **Run the numbers instead.** Extract the hand-written prose block from each
built page, shingle it into 5-grams, and compute pairwise Jaccard overlap across every pair of routes:

- **< 1%** — genuinely bespoke. Pass.
- **1–10%** — investigate. Shared *formula restatements* against a `/how-it-works` page are legitimate;
  shared *sentences between two sibling tool pages* are not.
- **> 10%** — templated. Fail. It does not matter how good it reads.

Report the actual worst pair and its number. A finding with a measurement survives an argument; a
finding with an adjective does not.

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
- [ ] **Suppress the ad LIBRARY, not just the slots.** An ad-free page that still ships
      `adsbygoogle.js` in its `<head>` is an ad library loading on a screen with no publisher content.
      GradeJar's `noAds` prop killed the `<ins>` units on a 70-word `/404` and left the script tag
      behind. **Gate the script on the same flag as the slots**, and prove it: build with ads forced
      live, then assert **0 script tags and 0 `<ins>` elements** on every ad-free page, and >0 on a
      money page. Grep the built HTML — do not take the component's word for it.
- [ ] **Trust pages carry no ads at all.** `/about`, `/contact`, `/privacy`, `/terms`. A 153-word
      contact page rendering two 160×600 skyscrapers is the cleanest possible example of "ads on a
      screen without publisher content" — and it earns nothing anyway. Nobody clicks an ad on a ToS.
      Zero revenue lost, entire finding-surface deleted.
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
- [ ] **Valid SSL**, HTTP → HTTPS redirect. **Curl it.** `http://domain` must return a **301**, not a
      200 — GradeJar served both schemes for weeks and nobody noticed until it was curl'd.
- [ ] **The page has content with JavaScript disabled.** A client-rendered tool page can serve a
      crawler an effectively empty DOM — the purest possible "screen without publisher content", and
      no amount of prose in the component saves it. `curl` the URL and read what comes back. The
      prose must be in the **HTML source**, not injected on hydration.
- [ ] **`robots.txt` does not block the AdSense crawler** (`Mediapartners-Google`). Check the **live**
      file, not the repo's — a CDN can inject its own managed block (Cloudflare prepends AI-crawler
      rules). Then go further and **fetch the site as the crawler**:
      `curl -A "Mediapartners-Google" https://domain/` must return **200 with the full page**. A bot-
      management challenge in front of Googlebot means the reviewer sees a blank page and calls it
      low-value content, and `robots.txt` will look perfectly innocent while it happens.
- [ ] **Ad code in `<head>`**, or ownership verified via Search Console.
- [ ] **`ads.txt` at the domain root**, serving, correct publisher ID:
      ```
      google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
      ```
- [ ] Site added to the Sites list in the AdSense account.

**URL canonicalization — one URL per page, and everything must agree on which one.**

Four layers independently decide what a page's URL is: the **canonical tag**, the **sitemap**, the
**internal links**, and the **host** (which one actually returns 200). A static-site generator and a
CDN pick their defaults separately, so they disagree *silently* — the site looks perfect in a browser
and every page is quietly behind a redirect. Verify the triangle with curl, per page type:

```bash
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" https://domain/page   # want 200
curl -sL https://domain/page | grep -o '<link rel="canonical"[^>]*>'           # want /page
curl -s https://domain/sitemap-0.xml | grep -o '<loc>[^<]*</loc>' | head       # want /page
```

- [ ] **The canonical tag, the sitemap entry, and the URL that returns 200 are byte-identical.**
      Trailing slash included. If the canonical names a URL that 3xx-redirects, it is wrong, even
      though every page still renders fine for humans.
- [ ] **No internal link redirects.** Every `href` in the nav/footer must already be the canonical
      form. A site-wide off-by-one-slash makes Googlebot pay two requests for every link it follows,
      which halves an already-tiny crawl budget on a new domain.
- [ ] **Zero pages in "Discovered — currently not indexed" or "URL is unknown to Google."** A page
      Google has never fetched cannot count toward the content depth the reviewer is judging. Pull
      `lastCrawlTime` per URL from the API below — `NEVER` on a live, nav-linked page is a blocker,
      not a curiosity.

> **Gradejar, 2026-07-18.** Astro's default `build.format: 'directory'` emitted `/page/index.html`;
> Cloudflare's default `auto-trailing-slash` therefore served `/page/` at 200 and 307'd `/page`. But
> the canonicals and all ~120 internal links were slash-less, and `@astrojs/sitemap` followed the
> build format. Result: 11 sitemap URLs filed by GSC as *"Alternative page with proper canonical
> tag"*, every internal link a redirect, and **6 live nav-linked pages Google had never crawled at
> all** — while the site scored perfectly on every existing check in this skill. Two framework
> defaults, neither one wrong on its own.

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
restarts the clock.** Applying early is the most expensive mistake available — and it has now been
made twice (JsonBeam 2026-07-08, GradeJar 2026-07-14).

- [ ] A-G all pass.
- [ ] **Site is verified in Search Console and at least partially indexed.** Pull the number — don't
      eyeball it. If Google hasn't indexed it, the reviewer is looking at a site Google doesn't know.
- [ ] **The index reflects the CURRENT deploy.** "Indexed" is not the bar — *indexed with the fixed
      content* is. For every important URL, `lastCrawlTime` must be **later than the commit that fixed
      it**. Deploying a fix and applying the same week means the reviewer is judging the version you
      already know was rejected. This is the single most expensive ordering mistake in the file, and
      it is invisible in both the repo and the AdSense dashboard.
- [ ] Zero thin/templated pages indexed — or they are `noindex` **and** ad-free.
- [ ] **Whatever is live right now is what gets reviewed.** Not what's in `main`, not what's in the
      working tree. **Deploy, then curl the live URLs, then apply** — in that order.

**Pull the real index state — never the GSC UI's summary tiles.** The URL Inspection API returns the
per-URL truth, including the two fields that expose a canonicalization split. Auth is the same service
account used for Search Console reporting (see `scripts/report.mjs`, `googleSAToken`), scope
`https://www.googleapis.com/auth/webmasters`:

```
POST https://searchconsole.googleapis.com/v1/urlInspection/index:inspect
{ "inspectionUrl": "https://domain/page", "siteUrl": "sc-domain:domain" }
```

Read these four fields on every URL that matters:

| Field | What it tells you |
|---|---|
| `coverageState` | `Submitted and indexed` = good. `Discovered - currently not indexed` = crawl budget. `Alternate page with proper canonical tag` = a canonicalization split, go back to F. |
| `userCanonical` vs `googleCanonical` | Disagreement means Google overrode your canonical. Agreement on a URL you did **not** submit in the sitemap is the silent trailing-slash bug. |
| `lastCrawlTime` | Compare against the fix commit date. Earlier = the fix is invisible to the reviewer. `NEVER` = the page does not exist to Google. |
| `robotsTxtState` | Catches a CDN-injected managed block the repo's `robots.txt` won't show. |

**The gate only counts if it fires before the button.** The Apply button is in a dashboard; this skill
cannot press it and cannot un-press it. So the gate's real output is a sentence spoken to the human:

> **"A-G are green and the live site matches. You may now apply."**

Never imply that. **Say it, explicitly, or say the opposite.** If you have not said that sentence, the
user has not been cleared — and if they applied without it, see `recover`.

## Output

### contract mode — the AdSense Compliance Contract

Written to be pasted straight into a handoff prompt. **This is the mode that PREVENTS the problem;
`audit` only detects it, and `recover` only cleans up after it.** Everything below must be stated as a
number or a ruling the builder can fail — never as an adjective they can argue with.

**Six parts:**

1. **Site skeleton** — the exact route list including `/about`, `/contact`, `/privacy`, `/terms`,
   `/how-it-works`, and where each is linked from. Name the **≥3 pure-editorial pages** (routes that
   carry **no widget at all**) here, at scoping — a site made only of tools has no publisher voice,
   and nobody ever goes back and adds them later.

2. **The route→component table — the one-widget ruling.** *Decide this now. It is architectural and
   brutal to retrofit.* For every ad-carrying route, write down **the component it mounts and the
   props that make it a different tool**:

   | Route | Component | What makes it its own tool | Ad-carrying? |
   |---|---|---|---|
   | `/example-a` | `<Widget variant="x">` | counts by X, prints, owns the stack flow | yes |
   | `/example-b` | `<Widget variant="y">` | partial-credit mode `x` structurally cannot express | yes |

   **The test, applied at scoping:** *"if I deleted this route, what could a user no longer do?"* If
   the answer is "nothing — they'd type the same numbers into the same boxes on the sibling page",
   **the route is a doorway. Do not create it.** Differentiate by **function** — different default
   mode, different inputs, different validation, a capability the sibling genuinely cannot express.
   **Not by prose, and not by a `heading` prop.**

   > **GradeJar shipped five routes on two widgets, gave each 400–700 words of genuinely unique
   > hand-written prose, and was rejected anyway.** Unique words under an identical calculator is one
   > tool wearing five hats. Two routes mounting the same component are **one page and one doorway**,
   > however differently they're written.

3. **Content-depth bar per route type — as numbers.** What "real publisher content" means for *this*
   product, route by route. Restate the floors from **"The numbers"** in Group C and make them the
   builder's acceptance criteria, not a vibe:

   - **≥ 500 words** of hand-written prose per ad-carrying route (rendered page text — excluding nav,
     footer, widget labels, button text and the FAQ block).
   - **≥ 4 real Q&A** in the FAQ, answering queries people actually type.
   - **< 1% 5-gram overlap** between any two routes' prose. **Measured, not asserted.**
   - Plus the explicit **programmatic-route ruling**: differentiated, or `noindex` **and** ad-free.
     **Never templated + indexed + monetized.**

4. **Interlinking map** — header nav, footer nav, breadcrumbs, up-links and sibling-links, no orphans,
   ≤2 clicks from home.

5. **Ad placement plan** — which slots, reserved at first paint, **≥150px from any interactive
   control**, ≤3 in-content units per screen, mobile density ≤30%. Plus the two rulings that only
   surface after launch:
   - **No ads on trust pages at all** (`/about`, `/contact`, `/privacy`, `/terms`) — they earn nothing
     and they are pure finding-surface.
   - **The ad-free flag must gate the ad LIBRARY, not just the slots.** A page with zero `<ins>`
     elements that still ships `adsbygoogle.js` in its `<head>` is an ad library loading on a screen
     with no publisher content. Build with ads forced live and assert **0 script tags and 0 `<ins>`**
     on every ad-free route.

6. **The URL contract — decide the trailing slash at scoping, in writing.** One URL per page, and
   **four layers must be made to agree on it**: the canonical tag, the sitemap, every internal link,
   and the URL the host actually serves at 200. The SSG and the CDN each default this independently,
   so "just leave the defaults" is how they end up disagreeing. Write the ruling into the contract:

   > **Canonical URL form: `<slash-less | trailing-slash>`.** Set it explicitly in the framework
   > config (Astro: `trailingSlash` + `build.format`; Next: `trailingSlash`), confirm the host's
   > behaviour matches (Cloudflare Workers Static Assets defaults to `auto-trailing-slash`, which
   > follows the emitted file layout), and write every internal `href` in that form.

   **The acceptance test, run against the live site before launch — three commands that must return
   the same string:**

   ```bash
   curl -s -o /dev/null -w "%{http_code}\n" https://domain/page      # 200, not 3xx
   curl -sL https://domain/page | grep -o '<link rel="canonical"[^>]*>'
   curl -s https://domain/sitemap-0.xml | grep -o '<loc>[^<]*</loc>' | head
   ```

   Cheap to set at scoping. Expensive later: fixing it after launch means re-canonicalizing every
   indexed URL, and it will not show up in any content audit, word count, or Lighthouse score.

7. **Pre-application gate — written as an instruction to the HUMAN.** The Apply button lives in a
   dashboard, not in git: **no skill can gate it, only the person can.** So the contract must say, in
   words the builder will read:

   > **Nobody clicks Apply until `/adsense-ready audit` has said, out loud: "you may now apply."**
   > Applying early does not merely risk a rejection — it **wastes every fix that lands afterwards**,
   > because Google reviews the site it already crawled. GradeJar applied on 2026-07-03, ran the audit
   > on 2026-07-13, and was rejected on 2026-07-14 **for the July 3 site**. The fixes were real,
   > correct, and ten days too late to be in the thing being judged.

### audit mode — the verdict

A table, most severe first:

| Group | Item | Status | File | Policy | Fix |
|---|---|---|---|---|---|
| C | `/[style]/[w]x[h]-wall/` pages are templated + indexed + carry ads | **FAIL** | `src/pages/[style]/[wxh].astro` | Scaled content abuse; ads on low-value screens | `noindex` + strip the ad slot, or write distinct content per page |

Then a single line:

> **NOT READY — 4 blockers.** Fix C-1, A-1, F-2, B-3 in that order, then re-run.

or

> **READY TO APPLY.** All eight groups pass.

### recover mode — after a rejection

A rejection is a verdict on **a specific snapshot of the site**, and the single most important thing
you can establish is *which* snapshot. Do this before proposing a single fix.

**1. Date the verdict against the repo.** Get the application date (ask — it's not in git; the ads.txt
/ ad-script commit is usually the best proxy) and `git log` the content commits. Then say plainly
which of these is true:

- **The rejection predates the fixes** → *the reviewed site no longer exists.* Do **not** rebuild in a
  panic, and do not let the user conclude the content is hopeless. Say so directly: this was an
  ordering failure. Then hunt only for what would sink the *next* review.
- **The rejection postdates the fixes** → the fixes were genuinely insufficient. Different problem,
  much more serious. Re-run A–H properly and be harsh.

**2. Find what would sink review #2.** The bar is higher now — a re-review is looked at by someone who
has already said no once. Hunt specifically for:
- anything in a trust page that is **factually false** (a privacy policy claiming a CMP that isn't
  installed is worse than one that says nothing — and reviewers *read* privacy policies);
- the one-widget-many-routes cluster (Group C — it survives a prose-only fix);
- ads on any screen that isn't real content.

**3. The resubmission sequence — this is the part everyone gets wrong.**

> **Clicking "Request review" does not make Google re-read your site.** It queues a review of what
> Google has *already crawled*. Request it too early and you are resubmitting the exact site that was
> just rejected, and you burn the cycle.

1. **Deploy.** Confirm with `curl` that the live HTML actually changed. Diff the live page against the
   local build (`md5sum`) rather than trusting the deploy log — a Git-integration build that silently
   never fired looks identical to a successful one from inside the repo.
2. **Search Console → Request indexing** on every changed URL. Resubmit the sitemap.
3. **Wait for the recrawl — 3–5 days.** Confirm it with the **URL Inspection API** (Group H), not by
   eyeballing GSC: `lastCrawlTime` must be **later than the fix commit** on every URL that matters.
   This step has no shortcut and no substitute.
4. **Only then** tick *"I confirm that I have fixed the issues"* and Request review.

**If they already clicked Request review before step 3 — which is the common case, because the button
is right there in the rejection email — do not panic and do not withdraw.**

- Check the live state first: AdSense Management API, `GET /v2/{account}/sites`. `GETTING_READY` means
  the review is **in flight**, not failed. Nothing is decided yet.
- **Let it run.** There is no "cancel and resubmit properly" that comes out ahead; a withdrawal still
  burns the cycle, and re-applying restarts the same queue.
- **Ship the fixes anyway, during the review.** Anything that doesn't change an already-indexed URL is
  safe to deploy mid-review and can only improve what a re-crawl finds.
- **Pull `lastCrawlTime` per URL now and write the dates down.** If review #2 comes back rejected,
  that table is the evidence that it was judged on stale content — which is a far stronger position
  for review #3 than starting over on a guess. Gather it *before* the verdict, not after.

**4. Say the number.** Tell the user how long this takes and do not soften it. A re-review is days to
weeks. The instinct after a rejection is to click the button immediately; that instinct is the trap,
and naming it is part of the job.

## Rules

1. **Ask whether they've already applied — first, every time.** An audit that runs after the Apply
   button is a post-mortem, not a gate. This is the failure that cost GradeJar its approval, and the
   checklist below cannot detect it, because the button isn't in the repo.
2. **A bare widget is not a page.** If deleting the tool leaves nothing worth reading, the route is
   a screen without publisher content. This is the rule that everything else serves.
3. **Count the components, not just the words.** Two routes mounting the same widget are one page and
   one doorway, however differently they're written. Templated *functionality* is templated content.
4. **Never templated + indexed + monetized.** Programmatic pages pick one: differentiated, or
   `noindex` + ad-free.
5. **Measure what you claim.** "Distinct content" is a number (5-gram overlap), not an adjective.
   "Enough words" is a count. An LLM grading the prose it just wrote is not evidence. Report the
   worst pair and its actual value.
6. **Never approve your own homework.** Audit against the actual files **and the live URLs** — curl
   them, fetch them as `Mediapartners-Google`, grep the built HTML. Not against what the plan says
   was built. Cite the file path for every finding.
7. **Report before fixing.** Hand over the ranked blocker list and stop. The human decides what gets
   fixed and in what order.
8. **The gate is binary, and it must be spoken.** "Mostly compliant" is NOT READY. Clearance is the
   explicit sentence *"you may now apply"* — if you didn't say it, they aren't cleared.
9. **After a rejection, the recrawl is the whole game.** "Request review" reviews what Google has
   already crawled. Deploy → request indexing → **wait 3–5 days** → then submit. Skipping the wait
   resubmits the site that was just rejected. **"Indexed" is not the bar — indexed with the *fixed*
   content is.** The pass condition is a number: `lastCrawlTime` later than the fix commit, per URL.
10. **One URL per page, and four layers must agree on it.** Canonical tag, sitemap entry, internal
    links, and the URL that actually returns 200. Framework and CDN defaults decide this
    independently and disagree silently — the site renders perfectly in a browser while every page
    sits behind a redirect and Googlebot burns half its budget on 307s. This is invisible to prose
    audits, content-depth counts, and Lighthouse. **Only curl catches it.** Check it at build time,
    not after GSC emails about it.
11. **Compliance and revenue are the same lever.** Every fix in groups B and C also raises
    pages-per-session, which is a direct multiplier on RPM. Never present this work as a tax — it is
    the business model.
