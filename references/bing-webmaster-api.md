# Microsoft Bing Webmaster Tools API — local reference

> Researched-once-saved-forever. Read this instead of a live MCP or the docs site.
> Refresh on command: "update the bing-webmaster-api reference".
> Last researched: 2026-07-03. Version: **api.svc (JSON)**. Source: learn.microsoft.com/bingwebmaster

The Microsoft-search counterpart to [[google-analytics-api]] + Google Search Console. Two
jobs:
- **Search performance** — Bing/Yahoo/DuckDuckGo clicks, impressions, and the queries you
  rank for. Bing is a second organic channel; report it next to Google.
- **URL submission / indexing** — push URLs to Bing's index (the 6 money pages) and check how
  many you're still allowed to submit.

> **One API key per USER, not per site.** Generate it once; the same key works for every
> verified site (jsonbeam.com + gradejar.com). Two quirks to remember: every JSON response
> wraps its payload under a **`d`** node, and dates come back as **`"/Date(1399014000000-0700)/"`**
> (epoch-ms + tz offset) — parse the ms with `/\/Date\((\d+)/`.

---

## 1. Auth (do this once)

- **Get the key:** Bing Webmaster Tools → sign in → **Settings** (top-right gear) → **API
  Access** → **Generate API Key**. Only one key per user; reuse it across all your sites.
- **Two options:**
  - **API key (what this project uses).** Pass it as a query param on every call:
    `?apikey=YOUR_KEY`. Simplest — no token exchange, no refresh flow. Store as
    `BING_WEBMASTER_API_KEY` in `.env`.
  - **OAuth 2.0** — Bearer token in the `Authorization` header. Only needed for
    multi-user/agency apps; overkill here.
- **Verified sites only.** A `siteUrl` must be a site you've verified in Bing Webmaster Tools,
  passed as the full origin (e.g. `https://gradejar.com`). URL-encode it in the query string.

---

## 2. Base + methods

- **JSON base URL:** `https://ssl.bing.com/webmaster/api.svc/json/{Method}`
  (POX/SOAP variants exist at `/pox/` and `/soap`; we only use JSON.)
- **Envelope:** success → `{ "d": <payload> }`. Error → HTTP 400 with
  `{"ErrorCode":n,"Message":"InvalidApiKey"}` (etc.).

  | Method | Verb | Use |
  |---|---|---|
  | `GetRankAndTrafficStats` | GET | Daily clicks + impressions (the workhorse) |
  | `GetQueryStats` | GET | Top search queries: query, clicks, impressions, avg position |
  | `GetPageStats` | GET | Per-page clicks/impressions |
  | `GetPageQueryStats` | GET | Queries that led to a specific page |
  | `GetQueryPageStats` | GET | Pages that ranked for a specific query |
  | `GetUrlTrafficInfo` | GET | Traffic + index info for one URL |
  | `GetUrlSubmissionQuota` | GET | URLs you can still submit (daily/monthly) |
  | `SubmitUrl` / `SubmitUrlBatch` | POST | Push URL(s) to Bing's index |
  | `GetUserSites` | GET | List your verified sites |

### `GetRankAndTrafficStats`
```
GET https://ssl.bing.com/webmaster/api.svc/json/GetRankAndTrafficStats?siteUrl={URL-ENCODED}&apikey={KEY}
```
Returns the **full history**, one object per day — filter to your window client-side and sum.
Response shape: `d: [{ __type, Clicks, Impressions, Date }]` where `Date` is the `/Date()/`
string.

**Sample — Bing clicks/impressions for GradeJar (sum the last N days yourself):**
```bash
curl "https://ssl.bing.com/webmaster/api.svc/json/GetRankAndTrafficStats\
?siteUrl=https%3A%2F%2Fgradejar.com&apikey=$BING_WEBMASTER_API_KEY"
```
```json
{ "d": [
  { "__type": "RankAndTrafficStats:#Microsoft.Bing.Webmaster.Api",
    "Clicks": 1, "Date": "/Date(1399014000000-0700)/", "Impressions": 30 },
  { "__type": "RankAndTrafficStats:#Microsoft.Bing.Webmaster.Api",
    "Clicks": 2, "Date": "/Date(1399100400000-0700)/", "Impressions": 100 }
] }
```

### `GetQueryStats` (which searches you rank for)
```
GET .../json/GetQueryStats?siteUrl={URL-ENCODED}&apikey={KEY}
```
Response: `d: [{ Query, Clicks, Impressions, AvgClickPosition, AvgImpressionPosition }]` —
sort by `Clicks` (or `Impressions`) desc and take the top few. The Bing analog of GA4's
"top pages / search terms": tells you the exact keywords earning Bing traffic.

---

## 3. URL submission / indexing

### `GetUrlSubmissionQuota` (how much you can still push)
```
GET .../json/GetUrlSubmissionQuota?siteUrl={URL-ENCODED}&apikey={KEY}
```
```json
{ "d": { "__type": "UrlSubmissionQuota:#Microsoft.Bing.Webmaster.Api",
         "DailyQuota": 973, "MonthlyQuota": 10973 } }
```

### `SubmitUrlBatch` (push URLs — e.g. the money pages)
```
POST .../json/SubmitUrlBatch?apikey={KEY}
Content-Type: application/json
```
Body (max 500 URLs; don't exceed the quota above):
```json
{ "siteUrl": "https://gradejar.com",
  "urlList": [ "https://gradejar.com/", "https://gradejar.com/grade-calculator" ] }
```
Success returns `{ "d": null }`. Single-URL variant: `SubmitUrl` with body `{ siteUrl, url }`.

> **IndexNow** is the newer, key-file protocol Bing also supports (submit at
> `https://www.bing.com/indexnow?url=...&key=...`). Either path pings Bing to (re)crawl — use
> the Webmaster API here since we already hold the key. Submitting nudges a crawl; it does not
> guarantee indexing.

---

## 4. Practical notes for this project

- Pair with [[google-analytics-api]] and Google Search Console: GA4 = who/where/which page,
  Bing Webmaster = the Microsoft-search slice of organic. Wired into `scripts/report.mjs`
  (`bingReport()`), run per verified site alongside GA4/AdSense/[[cloudflare-api]].
- **Date gotcha:** the `/Date(ms-offset)/` string isn't ISO. Extract ms with
  `Number(s.match(/\/Date\((\d+)/)?.[1])` → `new Date(ms)`, then keep rows within the window.
- **New sites read low.** Freshly verified/submitted sites can legitimately show 0 clicks/
  impressions for a while. A non-error response + a valid quota is the success signal, not the
  raw number.
- **Quota is per key, shared across sites.** Check `GetUrlSubmissionQuota` before a batch
  submit so you don't blow the daily allowance across both properties.
- Errors are HTTP 400 with a JSON `{ErrorCode, Message}` body — print `Message` (e.g.
  `InvalidApiKey`, `NotAuthorized`) rather than assuming success.
