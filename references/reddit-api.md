# Reddit Data API — local reference

> Researched-once-saved-forever. Read this instead of installing a Reddit MCP.
> Refresh on command: "update the reddit-api reference".
> Last researched: 2026-07-07. Source: reddit.com/dev/api + archived OAuth2/API wikis.

**Why we have this, and the hard boundary.** Reddit is a *listening + drafting* channel, not
a posting one. This API is wired **read-only, app-only** so the engine can (a) find genuine
threads where GradeJar/JsonBeam is actually the best answer and (b) read the post + comments
so I can draft a 90/10 reply. **Posting stays human hands only** — we request no write scope,
and there is no submit/vote/comment call in this doc on purpose. See the marketing skill's
hard rule "Never automate community posting."

Pairs with the other channel refs ([[google-analytics-api]], [[bing-webmaster-api]]): those
measure traffic, this one surfaces conversations.

---

## 1. Auth — application-only OAuth (do this once)

We use **app-only ("client_credentials") OAuth**: it reads *public* data (subreddit search,
posts, comments) with no user login, no password stored, no write access. Least privilege by
construction.

**Create the app (Tarun, ~3 min):**
1. reddit.com/prefs/apps → **create another app...**
2. Type: **script** (confidential client — keeps the secret server-side).
3. Name: `tarun-os-marketing`. redirect uri: `http://localhost:8080` (unused for app-only,
   but the form requires one).
4. Save. The **client ID** is the string under the app name; the **secret** is labeled `secret`.
5. Put both in `.env` (below). Never paste them in chat.

**Get a token** (script side, on each run — tokens last ~1h, no refresh token is issued):
```
POST https://www.reddit.com/api/v1/access_token
Authorization: Basic base64(CLIENT_ID:CLIENT_SECRET)
User-Agent: <see §2>
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
```
Response: `{ "access_token": "...", "token_type": "bearer", "expires_in": 86400, "scope": "*" }`.
App-only tokens **never** include a `refresh_token` — just request a fresh one when it expires.

### .env vars
```
REDDIT_CLIENT_ID=
REDDIT_CLIENT_SECRET=
REDDIT_USER_AGENT=web:tarun-os-marketing:v1.0 (by /u/<your-reddit-username>)
```

---

## 2. Rules that get you banned if ignored

- **User-Agent is mandatory and must be unique + honest.** Format (from the API wiki, quoted):
  `<platform>:<app ID>:<version string> (by /u/<reddit username>)`
  e.g. `web:tarun-os-marketing:v1.0 (by /u/tarunbuilds)`. Default/generic UAs get
  "drastically limited" access; spoofing a browser = ban. Bump the version as the script changes.
- **Base URL for all authed calls is `https://oauth.reddit.com`** — NOT www.reddit.com (only
  the token exchange uses www). Send `Authorization: bearer TOKEN` on every call.
- **Rate limit:** the archived wiki documents **60 requests/minute** for OAuth clients; the
  current Data API free tier is commonly 100 QPM per `client_id`. Don't trust the number —
  **read the headers and treat them as truth:**
  - `X-Ratelimit-Used` — requests used this period
  - `X-Ratelimit-Remaining` — requests left
  - `X-Ratelimit-Reset` — seconds until the window resets
  Back off when `Remaining` is low. Batch/broad queries beat tight per-item loops.
- **`raw_json=1`** on every read call so Reddit stops HTML-escaping `&`, `<`, `>` in text.

---

## 3. The calls we actually use (all GET, all read-only)

| Endpoint | Use |
|---|---|
| `GET /r/{sub}/search` | The workhorse: find threads in one sub matching our keywords |
| `GET /search` | Cross-sub search (global) when we want all subs at once |
| `GET /r/{sub}/new` | Newest posts in a sub (catch questions early, before they're buried) |
| `GET /r/{sub}/comments/{article_id}` | Full post + comment tree, to draft a reply in context |
| `GET /api/v1/me` | Sanity check / identity (only if we ever add a user token) |

### `GET /r/{subreddit}/search` — the monitor call
```
GET https://oauth.reddit.com/r/Teachers/search?q=free+gradebook&restrict_sr=1&sort=new&t=week&limit=25&raw_json=1
Authorization: bearer TOKEN
User-Agent: web:tarun-os-marketing:v1.0 (by /u/<username>)
```
Query params:
| Param | Values | Notes |
|---|---|---|
| `q` | search string | supports Reddit's search syntax (`title:`, quotes, `OR`) |
| `restrict_sr` | `1`/`true` | keep results inside this subreddit (drop it on `/search` for global) |
| `sort` | `relevance`,`hot`,`top`,`new`,`comments` | use `new` for monitoring, `top` for research |
| `t` | `hour`,`day`,`week`,`month`,`year`,`all` | time window; `week` for a daily-ish scan |
| `limit` | 1–100 | default 25 |
| `after`/`before` | fullname (`t3_xxx`) | pagination cursors |
| `type` | `sr`,`link`,`user` (comma-sep) | `link` = posts (what we want) |
| `raw_json` | `1` | always |

### Response shape (a "Listing")
```json
{ "kind": "Listing",
  "data": { "after": "t3_abc", "children": [
    { "kind": "t3", "data": {
        "id": "abc123", "name": "t3_abc123",
        "subreddit": "Teachers",
        "title": "Any free gradebook that doesn't upload student data?",
        "selftext": "My district's tool feels sketchy...",
        "author": "someteacher", "num_comments": 14, "score": 8,
        "permalink": "/r/Teachers/comments/abc123/...",
        "url": "https://www.reddit.com/r/Teachers/comments/abc123/...",
        "created_utc": 1751846400, "over_18": false } }
  ] } }
```
- `kind: "t3"` = a post/link; `kind: "t1"` = a comment (what the comments endpoint returns).
- Build a full link from `permalink`: `https://www.reddit.com` + `permalink`.
- `created_utc` is epoch seconds → `new Date(created_utc * 1000)`.

### `GET /r/{subreddit}/comments/{article_id}` — read the thread to draft a reply
```
GET https://oauth.reddit.com/r/Teachers/comments/abc123?sort=top&limit=50&raw_json=1
```
Returns a 2-element array: `[ postListing (t3), commentsListing (t1 tree) ]`. Read the post +
top comments so the drafted reply answers what was actually asked and doesn't repeat existing
answers.

---

## 4. How this plugs into our workflow

- **Keyword watchlists (per product), fed to `/r/{sub}/search`:**
  - GradeJar (r/Teachers, r/edtech): `free gradebook`, `grade calculator`, `ez grader`,
    `weighted grades`, `gpa calculator`, `student data privacy`, `no login gradebook`.
  - JsonBeam (r/webdev, r/javascript): `json formatter`, `json validator`, `json repair`,
    `format json online`, `json diff`, `json to csv`, `unexpected token in json`.
- **Scoring a thread (only surface the real ones):** a genuine question (not a rant/meme),
  recent, low-answer-count, where our tool is *actually* the best fit. Everything else is
  listening-only (audience insight → SEO pages + copy), not a reply target.
- **Draft, never post.** The engine outputs a 90/10 reply into the daily queue: answer fully
  first, tool mention only if it genuinely fits, always disclose "I built this." Tarun edits
  and posts by hand. No write scope exists on this token.
- **Account-age caveat:** a brand-new account replying with links gets torched. Hold real
  replies until ~2 weeks of pure helpfulness (see `marketing/accounts.md`). Monitoring can
  start immediately; posting waits.
- **Per-sub tolerance still governs** (see the queue notes): r/edtech ~ read-only, r/webdev
  self-promo only on Showoff Saturday, r/Teachers is the one real GradeJar posting target.
- Intended home: a `redditWatch()` block in `scripts/report.mjs` (or a small `scripts/reddit.mjs`),
  same `process.env` + `fetch` pattern as the GA4/Bing/Cloudflare blocks.

---

## 5. Gotchas

- **www vs oauth host:** token from `www.reddit.com`, data from `oauth.reddit.com`. Mixing
  them 401s.
- **App-only can't read private/quarantined subs** or anything needing a user — fine for our
  public subs. If we ever need user-context, that's a separate password/refresh-token grant and
  a deliberate scope decision, not a default.
- **No refresh token** on app-only — re-request when `expires_in` lapses.
- **Search is eventually-consistent + fuzzy:** brand-new posts may lag; combine `/search` with
  `/new` so nothing recent slips through.
- **Honor the headers, not the docs' number** for rate limits — the published figure and the
  enforced one drift.
