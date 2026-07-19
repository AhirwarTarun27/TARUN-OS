---
name: gsc-onboard
description: Take a freshly-live domain from "nobody knows it exists" to "submitted, verified and tracked" in Google Search Console, Bing and IndexNow. Covers DNS-TXT domain verification through the Cloudflare API, property registration, sitemap submission, junk-sitemap cleanup, URL index-status inspection, Bing's real URL submission API, IndexNow, and registering the domain in .env for /site-report. Runs scripts/gsc-onboard.mjs (dry run by default). Trigger on "/gsc-onboard", "the domain is live, what now", "add to search console", "submit the sitemap", "get indexed", "verify the domain with google", "set up bing", "why isn't my site on google", "sitemap has errors", "sitemap is HTML". One run = a domain fully onboarded to search, with the one un-automatable step named. Chains from /cloudflare-go-live.
---

# GSC onboard — live domain to indexed domain

`/cloudflare-go-live` makes a domain **live**. This makes it **findable**. Run it immediately after, every time. Nothing here is optional and none of it is interesting, which is exactly why it gets skipped or half-done.

**A perfect sitemap nobody submitted is a file on a server.** That is the failure this skill exists to prevent.

## The honest boundary — read before promising automation

**"Request Indexing" in the Search Console UI has no public API. It cannot be automated. Ever.**

The tempting thing is the Indexing API (`indexing.googleapis.com/v3/urlNotifications:publish`). Google restricts it, in writing, to pages carrying `JobPosting` or `BroadcastEvent` structured data. Pointing it at ordinary pages is outside documented policy. **The script does not call it and must not be "fixed" to.** Tarun's AdSense publisher account already has two sites that were rejected for low-value content — deliberately operating an API off-policy on that account is a bad trade for a nudge.

What actually matters is the part that IS automated: **the submitted sitemap is what drives discovery.** Request Indexing is a hint for a handful of URLs, capped around 10/day, and is never the deciding factor. So the un-automatable step is also the least important one. Say that plainly instead of apologising for it.

| Job | Automated? | How |
|---|---|---|
| Domain ownership verification | **Yes** | Site Verification API + Cloudflare DNS write |
| Add property to Search Console | **Yes** | `sites.add` (`sc-domain:` form) |
| Submit sitemap | **Yes** | `sitemaps.submit` |
| Delete junk sitemap entries | **Yes** | `sitemaps.delete` (`--clean`) |
| Read index status of any URL | **Yes** | URL Inspection API (read-only) |
| Submit URLs to **Bing** for indexing | **Yes** | `SubmitUrlbatch` — sanctioned, ~10k/day |
| Ping IndexNow (Bing/Yandex/Seznam) | **Yes** | open protocol, key file + POST |
| Register domain for `/site-report` | **Yes** | writes `.env` |
| **Request Indexing on Google** | **No** | no API exists — hand step, low value |
| Enable the GCP APIs (first run only) | **No** | one click, once per Google Cloud project |

## Before you start

- `CLOUDFLARE_API_TOKEN` in `TARUN-OS/.env` with `Zone → DNS → Edit`. The token from `/cloudflare-go-live` already has it.
- `GOOGLE_APPLICATION_CREDENTIALS` pointing at the service-account JSON (already set — `secrets/ga4-service-account.json`).
- **Two Google APIs must be enabled once per GCP project** (project `fluid-gamma-501010-i5`):
  - Search Console API — *already enabled*
  - Site Verification API — enable at `console.cloud.google.com/apis/library/siteverification.googleapis.com`
  - You do not have to remember which. **Run the script.** Preflight probes them and prints the exact enable URL, then exits touching nothing.
- `GSC_OWNER_EMAIL` in `.env` — your personal Google account. **This matters more than it looks.** The service account is the automation identity and it has no browser UI. Without this, the property is verified and working but invisible to you in `search.google.com/search-console`.
- `BING_WEBMASTER_API_KEY` for the Bing steps. Already set.

## Run it

Always from the TARUN-OS repo root, because that is where `.env` lives.

```bash
# Dry run. Prints what it WOULD do. Changes nothing. Always start here.
node scripts/gsc-onboard.mjs --domain=example.com

# For real.
node scripts/gsc-onboard.mjs --domain=example.com --apply

# Full send: also write the IndexNow key file into the product repo.
node scripts/gsc-onboard.mjs --domain=example.com \
  --project-dir=../ExampleProject --apply

# Clean up a Sitemaps list someone pasted page URLs into.
node scripts/gsc-onboard.mjs --domain=example.com --step=clean --clean --apply

# Just answer "is it indexed yet?" — read-only, safe any time.
node scripts/gsc-onboard.mjs --domain=example.com --step=inspect
```

Every step is **idempotent**. Re-running is the intended workflow: run it, do the manual bit, run it again. It reports what already exists and only creates what is missing.

`--step=` runs one step: `verify|owner|property|sitemap|clean|inspect|bing|indexnow|env`.

## The sequence

1. **Verify ownership (DNS TXT).** Asks Google for a token, writes it as a TXT record at the apex via the Cloudflare API, polls `dns.google` until Google's own resolver sees it, then calls verify. Domain properties (`INET_DOMAIN`) accept **only** `DNS_TXT` — `FILE` and `META` are SITE-only and would cover one hostname instead of the whole domain.
2. **Add you as owner.** The service account owns the property; this hands you a seat so it appears in your browser. If Google refuses the API path, the script prints the 30-second UI fallback.
3. **Register the property** as `sc-domain:example.com`. Verification and registration are *different things* — proving ownership does not create the property.
4. **Submit the sitemap.** Auto-discovers it: `robots.txt` `Sitemap:` line first (that is what Google reads), then `/sitemap-index.xml`, `/sitemap.xml`. **Refuses to submit anything that does not serve XML** — see Gotchas.
5. **Inspect index status.** Read-only. Reports each URL's real coverage state so you never click through the console to find out whether it worked.
6. **Bing.** Adds the site, submits the sitemap, and submits URLs through `SubmitUrlbatch` — a real, sanctioned indexing request with no Google equivalent. Worth doing on its own merits: Bing's index is what ChatGPT search reads, which is the `references/ai-search-visibility.md` moat.
7. **IndexNow.** Writes a deterministic key file into the product repo's `public/`, then pings. One POST notifies Bing, Yandex, Seznam and Naver. Google does not participate, so this never replaces step 4. **The key file must be deployed before the ping works** — re-run this step after the next deploy.
8. **Register in `.env`.** Writes `GSC_SITE_URL_<SLUG>`, `BING_SITE_URL_<SLUG>`, `CLOUDFLARE_ZONE_ID_<SLUG>` so `/site-report` picks the domain up. Prints the two lines to add to `scripts/report.mjs`.

## Gotchas — every one of these cost real time

- **"Sitemap is HTML", 0 discovered pages.** Someone pasted *page URLs* into the Sitemaps box instead of URL Inspection. Google fetched them, got `text/html`, and correctly refused. The pages are fine; the submission is junk. Fix with `--step=clean --clean --apply`. **The Sitemaps box takes `.xml` files and nothing else, once, ever. Page URLs go in the search bar at the top of the page.** These two inputs look similar and are not.
- **Sitemap index shows "Discovered pages: 0" right after submitting.** Normal, not a bug. An index file contains no page URLs — only a pointer to the child sitemap. Google reads the index, then queues `sitemap-0.xml` separately. The count populates in 24-48h, usually as its own row. Do not resubmit.
- **Verification fails even though the TXT record exists.** DNS propagation. A local `nslookup` can succeed while Google's resolver is still cold. The script polls `dns.google` specifically for this reason, and if it times out the record is still created — just re-run `--step=verify --apply` later.
- **Multiple `google-site-verification` TXT records at the apex is correct**, one per verified identity. The script ADDS; it never edits or deletes an existing one. Do not "tidy up" and delete the browser-flow record.
- **The property is verified but you cannot see it.** You skipped `GSC_OWNER_EMAIL`. The service account has no UI. See step 2.
- **`Discovered – currently not indexed` on a new site is the expected day-one answer**, not a failure. Check GSC → **Pages**, not Performance, and check it in about a week. Performance lags further and will be empty long after indexing starts.
- **A domain property covers apex + www + http/https in one.** Do not create URL-prefix properties alongside it; you will split your own data.
- **Bing says `NotAuthorized`.** Not a bad API key. `AddSite` registers the site but does **not** verify ownership, and **importing from Google Search Console does not verify it either** — the site lands with `IsVerified: false` and every write is refused. The script now detects this and verifies automatically by writing a CNAME (`<hash>.<domain>` → `verify.bing.com`, **DNS-only, never proxied**) through Cloudflare, then calling `VerifySite`. Re-run `--step=bing --apply` afterwards to submit.
- **A Bing call "fails" with no error message.** Check the method name before anything else. A wrong one returns an HTML `Endpoint not found` page rather than JSON, which parses to null and looks exactly like a permissions problem. There is no `SubmitSitemap` — Bing calls sitemaps **feeds** (`SubmitFeed`, `GetFeeds`, `RemoveFeed`).
- **IndexNow 403** means the key file is not reachable or does not match. Deploy, then re-run the step.
- **The key file has to ship with the site.** `--project-dir` writes it into `public/`, but it is inert until the next deploy. Committing and deploying is what makes the ping work, so the IndexNow step almost always needs a second run.

## Chain

```
/scout-problem → /explore-project → build → /cloudflare-go-live → /gsc-onboard → /adsense-ready
```

`/cloudflare-go-live` ends by naming this skill. Run it the same day the domain goes live — indexing is a clock that only starts once the sitemap is submitted, and every day of delay is a day of no traffic.

**Do not chain into `/adsense-ready` apply-for-approval on a site with zero indexed pages.** Google reviews a site it can see. Get indexed first, and check `[[adsense-review-status]]` before adding any new site to the publisher account.

## After the run

Nothing. That is the point. Check **GSC → Pages → Indexed** in ~7 days. If all URLs are still unindexed after that, re-run `--step=inspect` and bring the output back here — that is a real signal worth diagnosing, and it is almost never the sitemap.
