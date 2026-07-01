# Cloudflare API — local reference

> Researched-once-saved-forever. Read this instead of calling a live MCP or the docs site.
> Covers the slice this AIOS actually needs: auth, Pages (deploy + custom domains), DNS,
> and Web Analytics. Refresh on command: "update the cloudflare-api reference".
> Last researched: 2026-06-30. API version: **v4**. Source: developers.cloudflare.com/api

Tarun's domains (JsonBeam, and GradeJar at go-live) are registered/managed in his
Cloudflare account, so DNS + Pages custom domains wire up inside one account — no
external registrar handoff.

---

## 1. Base URL + auth

- **Base URL:** `https://api.cloudflare.com/client/v4`
- **Auth (preferred):** scoped **API token** as a Bearer header:
  ```
  Authorization: Bearer $CLOUDFLARE_API_TOKEN
  Content-Type: application/json
  ```
- Legacy global API key (`X-Auth-Email` + `X-Auth-Key`) also works but is account-wide
  and over-privileged — **use a scoped token.** New tokens carry a `cfut_` prefix.
- **Create a token:** dashboard → My Profile → API Tokens → Create Token. Grant
  least-privilege permission groups (see below), restricted to the specific zone/account.
- **Verify a token:**
  ```bash
  curl "https://api.cloudflare.com/client/v4/user/tokens/verify" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
  ```

### Token permission groups to grant (least privilege)
| Task | Permission group | Level |
|---|---|---|
| Deploy to Pages | `Account` → Cloudflare Pages | Edit |
| Manage DNS records | `Zone` → DNS | Edit |
| Read zone info (find zone_id) | `Zone` → Zone | Read |
| Read Web Analytics | `Account` → Account Analytics | Read |

### Response envelope (every endpoint)
```json
{ "success": true, "errors": [], "messages": [], "result": { ... } }
```
On failure: `success:false` and `errors:[{code, message}]`. Always check `success`.

---

## 2. Finding the IDs you need

- **account_id:** dashboard URL (`dash.cloudflare.com/<account_id>`), or:
  `GET /accounts` → `result[].id`
- **zone_id** (per domain): `GET /zones?name=gradejar.com` → `result[0].id`
  ```bash
  curl "https://api.cloudflare.com/client/v4/zones?name=gradejar.com" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
  ```

---

## 3. Pages — projects, deployments, custom domains

Base: `/accounts/{account_id}/pages/projects`

| Action | Method + path |
|---|---|
| List projects | `GET /accounts/{account_id}/pages/projects` |
| Get project | `GET /accounts/{account_id}/pages/projects/{project_name}` |
| Create project | `POST /accounts/{account_id}/pages/projects` |
| Create deployment | `POST /accounts/{account_id}/pages/projects/{project_name}/deployments` |
| Add custom domain | `POST /accounts/{account_id}/pages/projects/{project_name}/domains` |
| List custom domains | `GET /accounts/{account_id}/pages/projects/{project_name}/domains` |

**Create project** body (key fields): `name`, `production_branch` (e.g. `"main"`),
plus optional `build_config` (build command, output dir) and `source` (GitHub/GitLab repo).

**Create deployment** uploads built files via `multipart/form-data` (`manifest` of file
hashes, `branch`, `commit_message`, `pages_build_output_dir`). Returns a Deployment object
with the live URL. **For most workflows use the Wrangler CLI instead of raw multipart** —
see §6.

**Add custom domain** body: `{ "name": "gradejar.com" }`. Because the zone is in the same
Cloudflare account, Cloudflare provisions the CNAME → `<project>.pages.dev` and the SSL
cert automatically. (Apex domains are flattened/CNAME'd by Cloudflare automatically.)

---

## 4. DNS records

Base: `/zones/{zone_id}/dns_records`

| Action | Method + path |
|---|---|
| List | `GET /zones/{zone_id}/dns_records` (supports `?type=`, `?name=`, sort, filter) |
| Create | `POST /zones/{zone_id}/dns_records` |
| Update (full) | `PUT /zones/{zone_id}/dns_records/{record_id}` |
| Patch (partial) | `PATCH /zones/{zone_id}/dns_records/{record_id}` |
| Delete | `DELETE /zones/{zone_id}/dns_records/{record_id}` |

**Record body fields:** `type` (A, AAAA, CNAME, MX, TXT, CAA…), `name` (full name incl.
zone, or `@` for apex), `content` (value), `ttl` (seconds; `1` = automatic), `proxied`
(bool — `true` routes through Cloudflare's proxy/CDN + orange cloud).

```bash
# Example: add a CNAME (usually unnecessary for Pages — it auto-creates one)
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" -H "Content-Type: application/json" \
  -d '{"type":"CNAME","name":"www","content":"gradejar.pages.dev","ttl":1,"proxied":true}'
```

---

## 5. Web Analytics (read traffic without Google)

Cloudflare Web Analytics is queried via the **GraphQL Analytics API**, not REST:
- **Endpoint:** `POST https://api.cloudflare.com/client/v4/graphql`
- Auth: same Bearer token (needs Account Analytics Read).
- Query the `viewer.accounts.rumPageloadEventsAdaptiveGroups` dataset for pageviews,
  visits, by path/country/referrer over a time range. (GradeJar already uses CF Web
  Analytics per the build, so this is the zero-cost traffic source before GA4 is wired.)

---

## 6. Wrangler CLI (the practical deploy path)

For deploys, the CLI beats hand-rolling multipart. Install + use:
```bash
npm i -D wrangler            # or: npm create cloudflare
npx wrangler login           # opens browser OAuth — clears the "CF auth" blocker
npm run build                # Astro → ./dist
npx wrangler pages deploy ./dist --project-name=gradejar
```
First `pages deploy` creates the project if it doesn't exist. Auth via `wrangler login`
(interactive) or `CLOUDFLARE_API_TOKEN` env var for CI. A local skill (`wrangler`) also
exists in this environment for command syntax.

---

## 7. GradeJar go-live recipe (uses the above)

1. `npx wrangler login` (clears the Cloudflare-auth blocker).
2. `npm run build` then `npx wrangler pages deploy ./dist --project-name=gradejar`
   → live at `https://gradejar.pages.dev`.
3. Buy `gradejar.com` (Cloudflare Registrar) — zone lands in the same account.
4. Add custom domain: `POST .../pages/projects/gradejar/domains` `{"name":"gradejar.com"}`
   (CNAME + cert auto-provisioned).
5. Set the project's `SITE_URL` env to `https://gradejar.com`, rebuild → canonical +
   sitemap regenerate against the real domain.
6. Verify DNS: `GET /zones?name=gradejar.com` then `GET /zones/{id}/dns_records`.

---

## Gotchas
- Always check `result.success`; Cloudflare returns 200 with `success:false` on logical errors.
- Pages production branch must match the repo default (`main`).
- Proxied (orange-cloud) records get Cloudflare's IP, not the origin's — expected for Pages.
- Rate limit: 1200 requests / 5 min per user token. Batch where possible.
