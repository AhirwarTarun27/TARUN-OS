---
name: cloudflare-go-live
description: Take a freshly-bought domain to a live site on Cloudflare Workers, end to end. Covers adding the zone, repointing nameservers from an external registrar (BigRock), attaching the Worker custom domain, the www redirect, Turnstile, Cloudflare Email Routing for info@, and Resend as the free sending domain. Runs scripts/cloudflare-go-live.mjs (dry run by default). Trigger on "I bought a domain", "go live", "deploy to the domain", "point the domain at Cloudflare", "set up email for the domain", "connect GitHub to the worker", "www is not working", "set up turnstile". One run = a live site on the real domain, with every manual step named.
---

# Cloudflare go-live — domain to live site

The repeatable path from "I just bought a domain" to "the real site is live on it, with a working contact form and email". Built from doing it the hard way once on kesrienterprise.com. Every trap in the Gotchas section cost real time. Do not rediscover them.

**This is the whole point of this skill: the steps are boring, but four of them are non-obvious and two of them are outright Cloudflare bugs.**

## The cost contract — read this first

Tarun does not pay for infrastructure right now. Everything below is on the **free plan** and stays there.

**Never take an action that costs money without flagging it first and getting a yes.** If a step would require a paid plan, stop and say so.

| Thing | Free tier | Ceiling to watch |
|---|---|---|
| Cloudflare zones (domains) | Unlimited | 1,000 DNS records per zone |
| Workers requests | 100k/day per **account**, shared | Static asset requests are **free and unlimited** and do not count |
| Workers Builds (CI) | 3,000 build-min/month, 1 concurrent | Fine |
| Cloudflare Email **Routing** (receive) | Free, unlimited | None |
| Turnstile | Unlimited challenges | **20 widgets per account, 15 hostnames each** ← the real cap |
| Resend (send) | 3,000/month, 100/day | Per Resend **account**. New client = new free Resend account. |

**Not free, do not reach for it:** Cloudflare Email **Sending** (the send half of Email Service) needs the Workers Paid plan at $5/mo. Its "3,000 free" is not free. Resend's genuinely is. This is why the stack is Resend-for-sending + Cloudflare-for-receiving.

One Cloudflare account holds every client. Turnstile's 20-widget cap is the first wall you will hit, and only at ~20 clients.

## Before you start

- `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in `TARUN-OS/.env`.
- The token needs these permission groups. The old Pages-era token does **not** have them:
  - `Zone → Zone → Edit` (Edit, not just Read — Edit is what lets it *create* the zone)
  - `Zone → DNS → Edit`
  - `Account → Workers Scripts → Edit`
  - `Zone → Single Redirect → Edit` ← **the dashboard calls it "Single Redirect".** The API
    still calls the phase `http_request_dynamic_redirect`. Searching the dropdown for
    "dynamic" finds nothing. Same feature, renamed in the UI only.
  - `Account → Turnstile → Edit`
  - `Account → Email Routing Addresses → Edit` ← destination addresses
  - `Zone → Email Routing Rules → Edit` ← the forwarding rules. **Two different groups.**
    Having only one of them fails halfway through the email step.
- Set **Resources** to `All zones` + the account, so future client domains are covered
  without editing the token again.
- You do not have to work this out by hand. **Run the script.** Its preflight probes every API surface and prints the exact groups that are missing, then exits without changing anything.
- Resend key is **per client** (`--resend-key=re_xxx`), not a shared one. Each client gets their own free Resend account so their 3,000/month is their own.

## Run it

Always from the TARUN-OS repo root, because that is where `.env` lives.

```bash
# Dry run. Prints what it WOULD do. Changes nothing. Always start here.
node scripts/cloudflare-go-live.mjs --domain=example.com --worker=my-worker

# For real.
node scripts/cloudflare-go-live.mjs --domain=example.com --worker=my-worker \
  --email-to=you@gmail.com --resend --resend-key=re_xxx --apply
```

Every step is **idempotent**. A half-finished go-live can be re-run safely, and that is the intended workflow: run it, do the manual bit, run it again. It reports what already exists and only creates what is missing.

`--worker=` must match `name` in the project's `wrangler.jsonc` exactly.

## The sequence

Steps marked **HANDS** have no API. They are manual, forever. The script names them at the end of every run so they cannot be forgotten.

| # | Step | Who |
|---|---|---|
| 1 | Buy the domain (BigRock) | **HANDS** |
| 2 | Create the Cloudflare zone, read back the 2 nameservers | script |
| 3 | Paste those nameservers into BigRock | **HANDS** |
| 4 | Wait for the zone to flip to Active | script (polls) |
| 5 | Attach the apex as a Worker Custom Domain | script |
| 6 | `www` → apex 301 redirect | script |
| 7 | Turnstile widget for the real hostnames | script |
| 8 | Email Routing: enable, MX/SPF, `info@` rule | script |
| 9 | Click the Email Routing verification link | **HANDS** |
| 10 | Resend: add `send.<domain>`, write DKIM into Cloudflare DNS, verify | script |
| 11 | `"workers_dev": false` + `"preview_urls": false` in `wrangler.jsonc` | **HANDS** (one-line edit) |
| 12 | Connect GitHub → Worker (Settings → Build) | **HANDS** |
| 13 | Build variable `PUBLIC_SITE_URL` | **HANDS** |
| 14 | Deploy, then submit the contact form once for real | **HANDS** |

### 3. Repointing nameservers at BigRock

BigRock → My Orders → the domain → **Nameservers** → *Use Custom Nameservers* → paste the two the script printed → save.

There is no BigRock API. This is always manual. Propagation is usually minutes but the TTL can stretch it to hours. Nothing after step 4 can work until the zone is Active, and the script hard-gates on that rather than failing weirdly downstream.

### 12–13. GitHub and the two different variable screens

Connecting the repo is a dashboard OAuth flow. No API. Worker → **Settings → Build** → Connect.

Build command `npm run build`, deploy command `wrangler deploy`, root `/`.

**Connecting the repo does not trigger a deploy.** The site will sit on its old build until you either push a commit or run `wrangler deploy` yourself. Do not assume the connection means the site is current. Check the Deployments tab.

Then the trap that will cost you an hour if you miss it. There are **two** variable screens and they are not interchangeable:

- **Settings → Build → Build variables and secrets** — build time. `PUBLIC_SITE_URL` goes here. It is baked into canonical URLs, OG tags and the sitemap at build time.
- **Settings → Variables and secrets** — runtime. `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY` go here. Same thing as `wrangler secret put`.

Put one in the other's place and it silently is not there when the code looks for it.

If the Worker only serves static assets, the dashboard will refuse runtime variables outright: *"Variables cannot be added to a Worker that only has static assets."* That message is a useful signal. It means your `/api/*` route did not ship.

### 14. The last mile

Deploy with `PUBLIC_SITE_URL` set, or the canonical URL is wrong on every page:

```bash
PUBLIC_SITE_URL=https://example.com npm run build && npx wrangler deploy
```

Then submit the contact form once, by hand, solving the real Turnstile. **This cannot be automated and that is the entire purpose of Turnstile.** Do not try. Do not claim the form works until a human has done it and the email actually arrived.

## Gotchas — each of these cost real time

1. **A dashboard screenshot is not proof a setting saved. Only the API is authoritative.**
   On kesrienterprise.com the Turnstile hostname allowlist was marked "confirmed done" from a
   screenshot. The API showed it had never persisted: the widget still allowed only `localhost`,
   `127.0.0.1` and `workers.dev`. **The live contact form was broken for every real visitor**,
   and nobody knew, because the Phase 5 test had run on `workers.dev` — which *was* allowlisted.
   Run the script's dry run against a zone you believe is finished. If it disagrees with you,
   it is probably right.

   Related: **always extend an existing Turnstile widget, never create a second one.**
   `--turnstile-sitekey=<sitekey>` keeps the sitekey and secret, so no code change and no
   redeploy. A new widget burns one of the 20 free slots and forces a key swap in code.

2. **Turn off `workers.dev` at go-live, or the site is public on two origins.**
   `<worker>.<subdomain>.workers.dev` serves a byte-identical, crawlable copy of every page,
   competing with the real domain for the same rankings. The canonical tag points Google back
   at the apex, but that is a hint Google may ignore. Not serving the duplicate is the real fix.

   In `wrangler.jsonc`, **not** the dashboard toggle:
   ```jsonc
   "workers_dev": false,
   "preview_urls": false,
   ```
   **`workers_dev` defaults to `true`**, so the dashboard toggle is silently undone by the next
   deploy. It has to be in the config file. After this, `wrangler deploy` prints
   `No targets deployed` — that is expected, not an error: the custom domain is attached
   server-side, not declared as a route. The script's verify step now checks this automatically.

3. **Pin `.node-version`, or the first Workers Build dies on `npm ci`.**
   Workers Builds defaults to **Node 22.16.0 / npm 10**. If you develop on a newer Node (npm 11),
   the lockfile you commit is in npm 11's shape, and CI's npm 10 rejects it:

   ```
   npm error `npm ci` can only install packages when your package.json and
   npm error package-lock.json are in sync.
   npm error Missing: @emnapi/runtime@1.11.2 from lock file
   ```

   It looks like a missing dependency or a Windows/Linux problem. **It is neither.** npm 10 and
   npm 11 hoist optional wasm deps (`@emnapi/*`, pulled in by Sharp and Tailwind's oxide) to
   different places in the tree. `npm install` is lenient and never notices; `npm ci` is strict
   and is what CI runs — which is why it builds fine locally and only ever breaks in CI.

   **Fix both halves:**
   ```bash
   echo 22.16.0 > .node-version                    # pin CI so it cannot drift
   npx npm@10.9.2 install --package-lock-only      # regenerate the lock in CI's shape
   npx npm@10.9.2 ci --dry-run                     # prove it before pushing
   ```
   **Then remember: a bare `npm install` on the newer local npm rewrites the lock and re-breaks
   CI.** After any dependency change, regenerate with the pinned npm above.

4. **`www` cannot be added as a Custom Domain or a Route.** Once the apex is a Custom Domain, both dashboard widgets dead-end on `No zones match www.<domain>`, even with a valid DNS record present. It is a bug in that zone-search widget, not a DNS problem.
   **Fix: a zone-level Single Redirect instead.** 301 `www` → apex. Better SEO anyway, since two hostnames serving identical HTML is a duplicate-content problem you do not want.
   The script does this over the API and sidesteps the bug entirely. **This is also why a future `api.<domain>` backend must be attached with `--subdomain=api` via the script, not the dashboard — same bug.**

5. **The redirect ruleset phase is `http_request_dynamic_redirect`, kind `zone`.** Not `http_request_redirect`, which is account-level Bulk Redirects and a different product. Getting this wrong produces a rule that never fires. Even the docs summaries conflate them.

6. **A brand-new domain NXDOMAINs on your own resolvers for hours after go-live, while the site
   is perfectly live for everyone else. Check the domain's AGE before debugging anything.**

   accentwallplanner.com (2026-07-19): the site was serving 200s worldwide within 20 minutes of
   delegation, but Chrome showed `DNS_PROBE_FINISHED_NXDOMAIN` on the office network **and** on
   mobile data. Nothing was misconfigured. The domain was 26 minutes old. Fast public resolvers
   (1.1.1.1, 8.8.8.8) pick up a new delegation in minutes; ISP, corporate and mobile-carrier
   resolvers lag anywhere from an hour to a day, and many had cached "does not exist" from the
   window before the nameservers were repointed — which was genuinely true at the time.

   **Get the domain's age from RDAP first. It answers the question in one call:**
   ```bash
   curl -s https://rdap.verisign.com/com/v1/domain/EXAMPLE.COM | tr ',' '\n' \
     | grep -iE '"status"|eventAction|eventDate'
   ```
   That also confirms there is no `clientHold` / `serverHold`. A registrar suspension is the one
   thing that really does kill a domain globally, and from the browser it looks identical to
   propagation lag. `client transfer prohibited` alone is normal.

   **Then prove the site is up from outside, and stop touching DNS:**
   ```bash
   nslookup example.com 1.1.1.1                        # and 8.8.8.8, 9.9.9.9
   nslookup example.com <ns>.ns.cloudflare.com         # the authoritative answer
   curl -s --resolve example.com:443:<cf-ip> https://example.com -o /dev/null -w '%{http_code}\n'
   ```
   `--resolve` bypasses DNS entirely and proves what the server actually serves. Two more that
   run from **outside** the network, for when every local path is poisoned: WebFetch
   `https://dns.google/resolve?name=example.com&type=A` (`"Status":0` means NOERROR) and WebFetch
   `https://r.jina.ai/https://example.com`, which fetches the page server-side.

   **Do not "fix" correct records during this window.** Editing them changes nothing about the
   wait and risks breaking a working config. `ipconfig /flushdns` does nothing either — it clears
   the Windows stub cache, never the upstream resolver's. Mid-propagation a resolver can return
   AAAA-only or otherwise partial answers for a few minutes; that is the record arriving, not a
   fault. The honest answer is "wait", usually 1-4 hours.

   **Do not narrate a theory as the cause.** On this incident the guess was corporate
   newly-registered-domain filtering, which fit the office network and was then contradicted by
   mobile data failing the same way. Age plus an outside-the-network fetch settles it with
   evidence; a plausible story just sends the next hour in the wrong direction.

7. **Cloudflare returns HTTP 200 with `success: false`** on logical errors. Always check the envelope, never the status code.

8. **A missing token permission surfaces as a flat `10000: Authentication error`** with no hint which one. The script's preflight probe exists purely to translate that into a name.

9. **Resend sends from `send.<domain>`, a subdomain, never the apex.** The apex MX belongs to Email Routing. Putting Resend's MX on the apex collides with it and breaks receiving. Subdomain keeps sending and receiving independent.

10. **DKIM/SPF/MX records must be `proxied: false`.** They are not HTTP. Orange-clouding them silently breaks mail.

11. **`wrangler pages deploy` is wrong for this stack.** Cloudflare Pages is not supported by `@astrojs/cloudflare`. It is Workers with Static Assets, and the command is `wrangler deploy`. Any guide saying otherwise is out of date.

12. **The placeholder DNS records are supposed to look wrong.** A finished zone dumps as:
    ```
    AAAA   example.com       -> 100::        proxied=true
    A      www.example.com   -> 192.0.2.1    proxied=true
    ```
    `100::` is the IPv6 discard prefix, `192.0.2.1` is a documentation address, and nothing ever
    connects to either. Because both records are **proxied**, Cloudflare's edge answers with real
    anycast IPs — A *and* AAAA — no matter what the record holds. The apex having only an AAAA
    record is normal for a Worker custom domain. Do not replace these with "real" IPs.

## Check your work

| What | Where |
|---|---|
| Zone status + nameservers | `dash.cloudflare.com` → the domain → Overview |
| DNS records | → DNS → Records |
| Worker custom domains | → Workers → the Worker → Settings → Domains & Routes |
| The www redirect rule | → the domain → Rules → Redirect Rules |
| Turnstile widget + hostnames | `dash.cloudflare.com` → Turnstile |
| Email Routing rules + destination status | → the domain → Email → Email Routing |
| Resend domain verification | `resend.com/domains` |
| Build + deploy history | → the Worker → Deployments |
| Live checks (200 / 301 / robots) | `node scripts/cloudflare-go-live.mjs --step=verify --domain=...` |
| Domain age + registrar hold | `curl -s https://rdap.verisign.com/com/v1/domain/<DOMAIN>` |
| Is it live from outside your network | WebFetch `https://r.jina.ai/https://<domain>` |

## If a backend gets added later

The domain steps do not change at all. What changes is inside the Worker, and the free plan has walls:

- **CPU: 10ms per request.** Milliseconds, not seconds. Enough for validation, a DB query, a fetch-and-forward. Not enough for image processing, PDF generation, or anything heavy. This is the wall that would force the $5 plan.
- **100k requests/day**, account-wide across every client. Static assets stay free and unlimited, so only dynamic routes count.
- **50 subrequests per request** (every outbound `fetch` counts).
- Turn on observability (`observability.enabled: true` in `wrangler.jsonc`) or you are debugging blind.
- Free data stores if needed: D1 5GB, R2 10GB with zero egress, KV 1GB but only **1,000 writes/day** (that one is tight).
- Backend on its own subdomain needs `--subdomain=api`. Same-origin `/api/*` on the same Worker needs nothing.

## The site is live. Now go get it indexed.

**Chain straight into `/gsc-onboard`.** A live domain that Google has never heard of earns nothing, and the indexing clock does not start until the sitemap is submitted — so every day between go-live and onboarding is a day of zero traffic that you cannot get back.

```bash
node scripts/gsc-onboard.mjs --domain=example.com --project-dir=../ExampleProject --apply
```

It verifies the domain by writing a DNS TXT through this same Cloudflare token, registers the Search Console property, submits the sitemap, sets up Bing and IndexNow, and registers the domain in `.env` so `/site-report` picks it up. Same contract as this script: dry run by default, idempotent, names every manual step.

## Rules

1. **Dry run first, always.** The default is a dry run for a reason. A typo in `--domain` becomes a real zone in the account.
2. **Free only.** Flag anything that costs money before doing it. Do not quietly opt into a paid plan.
3. **Never automate the Turnstile submission.** It is designed to stop exactly that.
4. **Secrets never go to stdout.** The script writes them to a gitignored file. Load them with `wrangler secret put NAME < file`, then delete the file.
5. **Name every manual step.** The script prints them at the end of every run. Never let one hide.
