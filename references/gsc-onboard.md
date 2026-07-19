# Search onboarding — API reference

Backing detail for `.claude/skills/gsc-onboard/SKILL.md` and `scripts/gsc-onboard.mjs`.
Read the SKILL for the runbook; read this when you need the exact call or the citation.

## Identity and scopes

One service account (`secrets/ga4-service-account.json`) is the automation identity, because a
service-account JWT needs no browser consent and therefore runs headless. Scopes requested in a
single token:

```
https://www.googleapis.com/auth/webmasters          # write: sites.add, sitemaps.submit
https://www.googleapis.com/auth/siteverification    # getToken + verify
```

`webmasters.readonly` (what `report.mjs` uses) is **not** enough to write. Service accounts can
request any scope without a consent screen; there is no domain-wide delegation involved here
because the service account owns the resources it creates.

**Both APIs must be enabled once per GCP project** (`fluid-gamma-501010-i5`). A disabled API
answers `403` with `SERVICE_DISABLED` and an enable URL embedded in the error message — the script
parses that URL out and prints it.

## Site Verification API

Base: `https://www.googleapis.com/siteVerification/v1`

| Call | Method + path | Notes |
|---|---|---|
| Get token | `POST /token` | body: `{site:{type,identifier},verificationMethod}` → `{method,token}` |
| Verify | `POST /webResource?verificationMethod=DNS_TXT` | body: `{site:{type,identifier}}` → WebResource |
| List verified | `GET /webResource` | `{items:[{id,site,owners}]}` — used for idempotency |
| Change owners | `PUT /webResource/{id}` | body: `{site,owners:[...]}` |
| Unverify | `DELETE /webResource/{id}` | |

`site.type` values: `SITE` (a URL), `INET_DOMAIN` (a bare domain), `ANDROID_APP`.

`verificationMethod` values and what they apply to:

| Method | Applies to |
|---|---|
| `DNS_TXT` | domains only ← **the one we use** |
| `DNS_CNAME` | domains only |
| `FILE`, `META`, `TAG_MANAGER`, `ANALYTICS` | sites only |
| `DNS` | deprecated, use `DNS_TXT` |

A domain property must use `INET_DOMAIN` + `DNS_TXT`. `FILE`/`META` would verify a single hostname,
which is not the same resource and will not satisfy a `sc-domain:` property.

The identifier is the **bare domain** — `example.com`, no scheme, no trailing slash.

## Search Console API

Base: `https://www.googleapis.com/webmasters/v3`

| Call | Method + path |
|---|---|
| Add property | `PUT /sites/{siteUrl}` — no request body |
| Get property | `GET /sites/{siteUrl}` — 404 means "not added yet" |
| List properties | `GET /sites` |
| Submit sitemap | `PUT /sites/{siteUrl}/sitemaps/{feedpath}` |
| List sitemaps | `GET /sites/{siteUrl}/sitemaps` |
| Delete sitemap | `DELETE /sites/{siteUrl}/sitemaps/{feedpath}` |
| Search analytics | `POST /sites/{siteUrl}/searchAnalytics/query` (used by `report.mjs`) |

`siteUrl` for a domain property is `sc-domain:example.com`, URL-encoded in the path. For a
URL-prefix property it is the full origin with a trailing slash. **Both `siteUrl` and `feedpath`
must be percent-encoded** — `feedpath` is a full absolute URL, so it encodes to a long string.

**Adding a property does not verify it, and verifying does not add it.** They are separate
products and both are required.

### URL Inspection

`POST https://searchconsole.googleapis.com/v1/urlInspection/index:inspect`

```json
{ "inspectionUrl": "https://example.com/page", "siteUrl": "sc-domain:example.com" }
```

Quota: **2,000/day and 600/minute per property.** Read-only — it reports `coverageState`,
`robotsTxtState`, canonical, last crawl. It **cannot request indexing**.

## The Indexing API — why it is not used

`POST https://indexing.googleapis.com/v3/urlNotifications:publish`

Google's own docs: *"The Indexing API can only be used to crawl pages with either `JobPosting` or
`BroadcastEvent` embedded in a `VideoObject`."*

That is the entire supported surface. Using it for ordinary pages is off-policy. It is not wired
into this script, deliberately, and it should not be added — see the SKILL's honest-boundary
section for the reasoning, which is about account risk, not squeamishness.

**There is no public API behind the "Request Indexing" button.** That is a hand step forever, it is
capped around 10/day, and it is a nudge rather than the mechanism. The submitted sitemap is the
mechanism.

## Bing Webmaster API

Base: `https://ssl.bing.com/webmaster/api.svc/json/{Method}?apikey=KEY`

| Call | Body |
|---|---|
| `GetUserSites` | GET, no body |
| `AddSite` | `{siteUrl}` |
| `VerifySite` | `{siteUrl}` — works once the DNS CNAME resolves |
| `SubmitFeed` | `{siteUrl, feedUrl}` ← **sitemaps are "feeds"** |
| `GetFeeds` | GET `?siteUrl=` — for idempotency |
| `SubmitUrlbatch` | `{siteUrl, urlList:[...]}` — note the lowercase `b` |
| `GetUrlSubmissionQuota` | GET `?siteUrl=` (used by `report.mjs`) |

Full method list: [`IWebmasterApi`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.bing.webmaster.api.interfaces.iwebmasterapi).

**Three traps, all hit for real on 2026-07-19:**

1. **There is no `SubmitSitemap`.** Bing calls sitemaps *feeds* throughout
   (`SubmitFeed`/`GetFeeds`/`RemoveFeed`). A wrong method name does not return JSON — it returns an
   HTML `Endpoint not found` page, which parses to `null` and is indistinguishable from a
   permissions error. If a Bing call "fails" with no message, check the method name first.
2. **`GetUserSites` returns the array as `d` directly**, not `d.Sites`. Reading the wrong shape
   yields a silent empty list, which makes `AddSite` re-run forever against a site that exists.
   Bing stores URLs **with a trailing slash** (`https://example.com/`).
3. **Being in the account ≠ being verified.** Importing from Google Search Console adds the site
   with `IsVerified: false`. Every write then fails `NotAuthorized`. Check the flag, do not assume.

Bing returns HTTP 200 with an `ErrorCode` field on logical failures, so check the body, not just
the status. `SubmitUrlbatch` allows roughly 10,000 URLs/day for verified sites (quota readable via
`GetUrlSubmissionQuota`) — a real, sanctioned indexing request with **no Google equivalent**.

### Bing verification by DNS

`GetUserSites` returns a `DnsVerificationCode` shaped `<hash>.<domain>`. That entire string is the
**CNAME name**, pointing at `verify.bing.com`:

```
CNAME   e3e9c7fd….accentwallplanner.com   →   verify.bing.com
```

**It must be DNS-only, never proxied.** An orange-clouded CNAME resolves to Cloudflare's edge IPs
instead of `verify.bing.com`, and Bing's check fails with no useful message. Once it resolves,
`VerifySite` succeeds over the API — no dashboard visit needed.

## IndexNow

Open protocol. One POST notifies Bing, Yandex, Seznam and Naver at once. **Google does not
participate**, so it supplements the sitemap and never replaces it.

1. Host a key at `https://example.com/<key>.txt` whose body is exactly the key. 8-128 hex chars.
   The script derives it deterministically from the domain so re-runs reuse one key.
2. `POST https://api.indexnow.org/IndexNow`, `Content-Type: application/json; charset=utf-8`:

```json
{ "host": "example.com", "key": "<key>", "keyLocation": "https://example.com/<key>.txt",
  "urlList": ["https://example.com/"] }
```

`200` = accepted. `202` = accepted, key pending verification (normal on a first ping).
`403` = the key file is unreachable or does not match. `400` = malformed URL.

No published per-day cap as of 2026, but engines rate-limit and quality-score submissions.

## Sources

- [Indexing API restrictions](https://developers.google.com/search/apis/indexing-api/v3/quickstart)
- [Site Verification API — getToken](https://developers.google.com/site-verification/v1/webResource/getToken)
- [Site Verification API — insert](https://developers.google.com/site-verification/v1/webResource/insert)
- [Search Console API — sites.add](https://developers.google.com/webmaster-tools/v1/sites/add)
- [Search Console API — authorizing](https://developers.google.com/webmaster-tools/v1/how-tos/authorizing)
- [IndexNow documentation](https://www.indexnow.org/documentation)
- [Bing IndexNow getting started](https://www.bing.com/indexnow/getstarted)
