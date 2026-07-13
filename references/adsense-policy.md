# Google AdSense — approval & policy reference

> Researched-once-saved-forever. Read this instead of re-searching Google's help centre.
> Refresh on command: "update the adsense-policy reference".
> Last researched: 2026-07-13. Sources: all official Google (support.google.com/adsense,
> support.google.com/publisherpolicies, developers.google.com/search) + betterads.org.

**What this file is for:** getting a site **approved** and keeping it approved. It is the
policy half of AdSense. The **revenue** half — CPC, RPM, ad-block rates, whether a niche can
actually pay — lives in `references/adsense-economics.md`.

**The one-line version:** Google will not serve ads on a screen that has no publisher content.
A bare tool widget is such a screen. Everything below follows from that.

**Who uses this file:** the `/adsense-ready` skill (which inlines the checklist so it stays
portable), `/scout-problem` (approvability screen), and `/explore-project` (the compliance
contract baked into every handoff prompt).

---

## 1. Eligibility & the approval mechanic

- **Two separate approvals.** The *account* is approved once. Then **every site is approved
  individually** and must be added to the Sites list. Both must be green before a single ad serves.
  ([eligibility](https://support.google.com/adsense/answer/9724))
- Applicant must be **18+**, must **own the site**, and must be able to **edit its HTML source**.
- Review takes **a few days, but can take 2-4 weeks**.
  ([site not ready](https://support.google.com/adsense/answer/12176698))
- **A rejection restarts the clock.** This is the entire reason the pre-application gate (§8)
  exists. Applying early is not a free roll — it is the most expensive mistake available, and
  it is the one JsonBeam already made (rejected for low-value content, 2026-07-08).
- Publishers must comply with **both** the [AdSense Program policies](https://support.google.com/adsense/answer/48182)
  **and** the [Google Publisher Policies](https://support.google.com/publisherpolicies/answer/10502938).
  Google: *"it's your responsibility to keep up-to-date."*

---

## 2. Trust & identity — the pages a site must carry

### The privacy policy is the ONE hard policy requirement

This is the only page Google's policy text actually *mandates*. Publisher Policies, verbatim:

> Publishers **"must have and abide by a privacy policy that clearly discloses any data
> collection, sharing, and usage"** — including the placement of third-party cookies.

And it must specifically disclose Google's advertising cookies.
([required disclosures](https://support.google.com/adsense/answer/1348695)) The policy must tell users:

- *"Third party vendors, including Google, use cookies to serve ads based on a user's prior
  visits to your website or other websites."*
- *"Google's use of advertising cookies enables it and its partners to serve ads to your users
  based on their visit to your sites and/or other sites on the Internet."*
- That users can **opt out** via [Google Ads Settings](https://www.google.com/settings/ads) or
  [aboutads.info](https://www.aboutads.info/choices/).
- If other ad networks serve on the site: name them, link them, and explain how to opt out.

Google deliberately **does not prescribe wording** ("publisher sites and laws across countries
vary"). But the *disclosures* above are not optional.

### About, Contact, Terms — not named in policy, load-bearing in practice

Google's policy text never says "you must have an About page." But the **review is a quality
judgment**, and the criteria Google publishes for that judgment are exactly what an About and a
Contact page answer.

From [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content),
the **Who / How / Why** framework — these are the questions a reviewer is effectively asking:

- **Who** — *"Is it self-evident to your visitors who authored your content?"* *"Do pages carry
  a byline, where one might be expected?"* *"Do bylines lead to further information about the
  author?"*
- **How** — *"Is the use of automation, including AI-generation, self-evident to visitors through
  disclosures?"*
- **Why** — *"Is content created primarily to help people, or to attract search rankings?"*

And the E-E-A-T questions: *"Does the content present information in a way that makes you want
to trust it, such as clear sourcing, evidence of the expertise involved, background about the
author or the site?"*

**A site with no About page and no Contact page has no answer to "who made this."** That is what
sinks a thin tool site in review, even when no specific policy line is cited.

### The practical trust set for a tool site

| Page | Why it exists |
|---|---|
| `/privacy` | **Hard policy requirement.** Must carry the Google-cookie disclosures above. |
| `/about` | Answers "who". A real name, a real reason the tool exists, real expertise. Not a stub. |
| `/contact` | Answers "reachable". A form that **actually works**, or a real address. A dead form is worse than none. |
| `/terms` | Not policy-mandated. Standard trust signal, cheap to add, expected on a monetized site. |
| `/how-it-works` or `/methodology` | **The E-E-A-T anchor for a tool.** This is where a calculator explains its formula, its assumptions, its sources. It is the single highest-value page a tool site can have — it converts "a widget" into "a publisher with expertise." |

---

## 3. Navigation & site behavior

The verbatim reasons a site is judged **"difficult to navigate"** and rejected
([not ready](https://support.google.com/adsense/answer/12176698) ·
[not approved](https://support.google.com/adsense/answer/81904)):

- redirects
- pages behind a login or restricted access
- **broken links**
- excessive pop-ups
- dialers
- **pages under construction or not yet launched**

From [Make sure your site's pages are ready](https://support.google.com/adsense/answer/7299563), the
navigation bar must be **aligned, readable, and functional** (dropdowns that actually work), and
must *"help users quickly understand how to interact with your site."*

Also disqualifying, from the technical list:

- Site unreachable, or password-protected so the crawler can't see it.
- **robots.txt blocking the AdSense crawler.**
- No valid SSL certificate / no HTTP→HTTPS redirect.
- Ad code missing, or not between `<head>` and `</head>`.

---

## 4. Content quality — the low-value-content killer

**This is the section that matters most for tool sites.** It is what rejected JsonBeam.

### The rule

Google Publisher Policies, **"Google-served ads on screens without publisher-content"**:

> Google-served ads are prohibited **"on screens without publisher-content or with low-value
> content"**, or screens **under construction**.

Read that literally. **A page whose only content is a widget is a screen without publisher
content.** The calculator is not the content — it is the functionality. The content is what a
human wrote around it.

### The supporting rules

- **Ad-to-content ratio** — prohibited when a screen contains *"more ads or other paid
  promotional material than publisher-content."*
- **Replicated content** — no ads on pages with *"embedded or copied content from others without
  additional commentary, curation"* or added value.
- **Insufficient content** ([not approved](https://support.google.com/adsense/answer/81904)) — a
  site with *"too little text"*, pages that are *"mostly images, videos, or Flash"*, or that lack
  *"complete sentences and paragraphs."*
- **Content quality** — a site *"lacks original, rich content that would be of value to users"*;
  auto-generated or thin affiliate content.
- **Unsupported language** — content must be primarily in a supported language.

### The spam-policy overlay (Google Search)

These get you both a Search penalty and an AdSense problem
([spam policies](https://developers.google.com/search/docs/essentials/spam-policies)):

- **Scaled content abuse** — *"many pages generated for the primary purpose of manipulating
  search rankings and not helping users."* **This is the trap for programmatic SEO.** ~100
  templated pages with only numbers swapped is precisely this.
- **Doorway pages** — pages created to rank for query variants that funnel users onward.
- **Thin affiliate**, **keyword stuffing**, **cloaking**, **expired-domain abuse**, **site
  reputation abuse**.

### The programmatic-SEO ruling

Programmatic pages are not banned. **Templated programmatic pages carrying ads are.** There are
exactly two compliant options:

1. **Differentiate them.** Each page carries genuinely distinct, useful content — not the same
   sentence with a variable swapped. If you can't write it, you can't ship it.
2. **Ship them `noindex` AND ad-free.** They can still exist as a UX convenience. They just
   can't be indexed *and* monetized while thin.

Never: templated + indexed + monetized. That is the JsonBeam failure at 100× scale.

### Google's own quality questions (the reviewer's lens)

From [creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) —
if a page can't pass these, it won't pass review:

- *"Does the content provide original information, reporting, research, or analysis?"*
- *"Does the content provide a substantial, complete, or comprehensive description of the topic?"*
- *"Does the content provide insightful analysis or interesting information that is beyond the obvious?"*
- *"Is this the sort of page you'd want to bookmark, share with a friend, or recommend?"*
- *"Would you expect to see this content in or referenced by a printed magazine, encyclopedia, or book?"*
- *"Does the content provide substantial value when compared to other pages in search results?"*
- *"Is the content produced well, or does it appear sloppy or hastily produced?"*

---

## 5. Ad placement

### Accidental clicks — the tool-site landmine
([ad placement policies](https://support.google.com/adsense/answer/1346295))

- *"Publishers are not permitted to encourage users to click on Google ads in any way."* No
  "support us", no "click the ads", no arrows or symbols pointing at ads, no flashy animation
  drawing the eye to them.
- **Ads must not be disguised as content or UI.** No formatting an ad to look like a button, a
  result panel, or part of the tool.
- Ads may only be labelled **"Advertisements"** or **"Sponsored Links"**. Never "Resources",
  never "Helpful links".
- **Keep at least 150px between ads and the edge of an interactive element.** Google states this
  for games; **it applies with full force to a calculator with buttons.** An ad next to a "Calculate"
  button is an accidental-click machine and a policy problem.
- No **auto-refresh** of a page or an element without the user requesting it.
- No ads in pop-ups/pop-unders, emails, private-communication surfaces, or software apps/extensions.

### Better Ads Standards (Google enforces these via Chrome)
([betterads.org/standards](https://www.betterads.org/standards/))

Beneath the standard, and therefore not allowed:

| Mobile web | Desktop web |
|---|---|
| Pop-up ads | Pop-up ads |
| Prestitial ads | Prestitials with a countdown |
| **Ad density > 30% of page height** | **Ad density > 50%** |
| Flashing animated ads | Auto-playing video with sound |
| Poststitials with a countdown | Large sticky ads |
| Fullscreen scrollover ads | |
| Large sticky ads | |

Sticky and inline ads **both count** toward density. A sticky ad's height counts once.

### Where ads must never go

- On **empty states** (the tool before the user has entered anything).
- On **error screens** or 404s.
- On pages under construction.
- Above the main content, inserted after first paint (this is also a CLS regression).

---

## 6. Privacy & consent plumbing

- **Certified CMP is mandatory for EEA / UK / Switzerland traffic.** Publishers must use a
  Google-certified Consent Management Platform integrated with the **IAB TCF**. Enforced since
  **2024-01-16** (EEA/UK) and **2024-07-31** (Switzerland).
  ([CMP requirement](https://support.google.com/adsense/answer/13554116))
  Without one, EEA/UK traffic can only receive **non-personalized or limited ads** — a direct
  revenue cut, not just a compliance box.
- **No PII to Google.** Never pass personally identifiable information, and never merge PII
  without *"robust notice… and the user's prior affirmative (i.e. opt-in) consent."*
- **Precise location** requires interstitial notice + express opt-in + encryption + a privacy-policy
  disclosure.
- **COPPA / child-directed content.** Personalized advertising is **prohibited** to users under 13
  and on child-directed sites. If any part of the site is child-directed, it must be tagged as such
  and personalized ads disabled. **A grade calculator has student users — this question must be
  answered explicitly, not skipped.**
- **Sensitive-category targeting is prohibited** — health status, financial status, racial or ethnic
  origin, religious belief, criminal history, political affiliation, union membership, sexual
  orientation.
- Publishers may not set, modify, intercept, or delete cookies on Google's domains.

---

## 7. Technical prerequisites

Straight from [what to do when your site is not ready](https://support.google.com/adsense/answer/12176698):

- [ ] Site is **live and publicly reachable** — no password protection, no staging-only.
- [ ] **Valid SSL certificate**, with HTTP → HTTPS redirect.
- [ ] **robots.txt does not block the AdSense crawler** (`Mediapartners-Google`).
- [ ] **Ad code in `<head>`** — or ownership verified via Search Console instead.
- [ ] Site is **added to the Sites list** in the AdSense account.
- [ ] **`ads.txt` served at the domain root** ([ads.txt](https://support.google.com/adsense/answer/12171612)).
      Recommended, not mandatory — but Publisher Policies require that any site *using* ads.txt lists
      its sellers correctly, and a missing/incorrect file triggers account alerts and lost demand.
      Exact line:
      ```
      google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
      ```
      Served at `https://example.com/ads.txt`. Changes take days to months to propagate.

---

## 8. The pre-application gate

**Do not submit the site to AdSense until every one of these is true.** A rejection restarts a
2-4 week clock.

- [ ] `/privacy` is live and carries the Google-cookie disclosures from §2.
- [ ] `/about`, `/contact`, `/terms` are live, real, and non-stub. The contact form actually sends.
- [ ] Every trust page is linked from the **footer of every page**.
- [ ] **Every indexed, ad-carrying route has original prose that stands alone without the tool.**
- [ ] **Zero thin/templated pages are indexed** — or they are `noindex` **and** ad-free.
- [ ] Navigation is clean: no broken links, no login walls, no under-construction routes.
- [ ] `ads.txt` is serving at the root and returns the correct publisher ID.
- [ ] robots.txt permits the AdSense crawler; SSL valid; HTTPS enforced.
- [ ] Site is **verified in Search Console and at least partially indexed** — if Google hasn't
      indexed it, the reviewer is looking at a site Google doesn't know.
- [ ] The COPPA / child-directed question has an explicit answer.
- [ ] A certified CMP is wired if EEA/UK/CH traffic is expected.

---

## 9. Publisher Restrictions — the revenue-collapsing categories

These are **not bans**. Ads still serve, but advertiser demand collapses, so RPM craters. Treat
this as a *revenue* screen at `/scout-problem` time, not a compliance one.
([Publisher Restrictions](https://support.google.com/publisherpolicies/answer/10437795))

Sexual content · shocking content · explosives · guns and gun parts · other weapons · tobacco ·
recreational drugs · alcohol sale or misuse · online gambling · prescription drugs · unapproved
pharmaceuticals and supplements · apps removed from the Play Store.

Fully **prohibited** (Publisher Policies, not restrictions): illegal content, IP infringement,
counterfeit goods, dangerous or derogatory content, harassment, animal cruelty, misrepresentation,
unreliable claims (health/election/climate misinformation), deceptive practices, manipulated media,
dishonest behavior, sexually explicit content, compensated sexual acts, mail-order brides, and
anything touching child safety.

---

## Source index

| Topic | URL |
|---|---|
| AdSense Program policies | https://support.google.com/adsense/answer/48182 |
| Eligibility requirements | https://support.google.com/adsense/answer/9724 |
| Make sure your site's pages are ready | https://support.google.com/adsense/answer/7299563 |
| Site not ready to show ads | https://support.google.com/adsense/answer/12176698 |
| Account wasn't approved | https://support.google.com/adsense/answer/81904 |
| Google Publisher Policies | https://support.google.com/publisherpolicies/answer/10502938 |
| Google Publisher Restrictions | https://support.google.com/publisherpolicies/answer/10437795 |
| Ad placement policies | https://support.google.com/adsense/answer/1346295 |
| Privacy / cookie disclosures | https://support.google.com/adsense/answer/1348695 |
| Certified CMP (IAB TCF) | https://support.google.com/adsense/answer/13554116 |
| ads.txt | https://support.google.com/adsense/answer/12171612 |
| Better Ads Standards | https://www.betterads.org/standards/ |
| Search spam policies | https://developers.google.com/search/docs/essentials/spam-policies |
| Helpful, people-first content | https://developers.google.com/search/docs/fundamentals/creating-helpful-content |
