// cloudflare-go-live.mjs — take a freshly-bought domain to a live Cloudflare Worker.
//
// Runbook + gotchas: .claude/skills/cloudflare-go-live/SKILL.md
// API details:       references/cloudflare-go-live.md
//
// SAFE BY DEFAULT. Plain runs are a DRY RUN: nothing is created or changed.
// Add --apply to actually write. Every step is idempotent, so a half-finished
// go-live can be re-run safely.
//
//   node scripts/cloudflare-go-live.mjs --domain=example.com --worker=my-worker
//   node scripts/cloudflare-go-live.mjs --domain=example.com --worker=my-worker --apply
//
// Common flags:
//   --domain=      (required) apex domain, e.g. kesrienterprise.com
//   --worker=      (required) Worker name, must match `name` in wrangler.jsonc
//   --email-to=    destination inbox for info@<domain> (enables Email Routing)
//   --resend       also add + verify the Resend sending domain (send.<domain>)
//   --subdomain=   extra hostname(s) to route to the Worker, comma separated.
//                  e.g. --subdomain=api  → api.<domain> also hits this Worker.
//                  Only needed if a future backend lives on its own subdomain;
//                  same-origin /api/* routes need nothing here.
//   --step=        run one step only: zone|worker|www|turnstile|email|resend|verify
//   --apply        actually make changes (default: dry run)
//
// Everything this script touches is on a FREE Cloudflare plan. It refuses to
// take any action that costs money and flags free-tier ceilings before you hit
// them. See the cost table in the reference doc.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

// ── .env loader (same shape as report.mjs) ───────────────────────────────────
function loadEnv() {
  const path = resolve(process.cwd(), '.env');
  if (!existsSync(path)) return {};
  const txt = readFileSync(path, 'utf8');
  const env = {};
  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    env[line.slice(0, eq).trim()] = line.slice(eq + 1).replace(/\s+#.*$/, '').trim();
  }
  return env;
}
const env = { ...loadEnv(), ...process.env };

// ── args ─────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const arg = (k, d = null) => args.find(a => a.startsWith(`--${k}=`))?.split('=').slice(1).join('=') ?? d;

const DOMAIN   = arg('domain');
const WORKER   = arg('worker');
const EMAIL_TO = arg('email-to');
const STEP     = arg('step');
const APPLY    = args.includes('--apply');
const DO_RESEND = args.includes('--resend');
// Extra hostnames to point at the same Worker, e.g. `api` → api.<domain>.
// Attaching these via the API sidesteps the dashboard's "No zones match" bug,
// which blocks adding ANY subdomain once the apex is already a Custom Domain.
const SUBDOMAINS = (arg('subdomain', '') || '')
  .split(',').map(s => s.trim()).filter(Boolean);
// Extend THIS existing Turnstile widget instead of creating a new one. Preserves
// its sitekey + secret, so no code change is needed, and does not burn one of the
// 20 free widget slots.
const SITEKEY = arg('turnstile-sitekey');

const CF_TOKEN   = env.CLOUDFLARE_API_TOKEN;
const CF_ACCOUNT = env.CLOUDFLARE_ACCOUNT_ID;
// Resend key is PER-CLIENT (each client gets their own free Resend account), so
// it is read from the flag or a project-local var, not assumed to be one global key.
const RESEND_KEY = arg('resend-key', env.RESEND_API_KEY);

// ── colours (same palette as report.mjs) ─────────────────────────────────────
const c = {
  reset: '\x1b[0m', bold: '\x1b[1m', green: '\x1b[32m', cyan: '\x1b[36m',
  yellow: '\x1b[33m', red: '\x1b[31m', dim: '\x1b[2m', magenta: '\x1b[35m',
};
const hdr  = (s) => console.log(`\n${c.bold}${c.cyan}${s}${c.reset}`);
const ok   = (s) => console.log(`  ${c.green}✓${c.reset} ${s}`);
const plan = (s) => console.log(`  ${c.yellow}+${c.reset} ${c.yellow}would create${c.reset} ${s}`);
const did  = (s) => console.log(`  ${c.green}✓ created${c.reset} ${s}`);
const warn = (s) => console.log(`  ${c.yellow}!${c.reset} ${s}`);
const bad  = (s) => console.log(`  ${c.red}✗${c.reset} ${s}`);
const info = (s) => console.log(`  ${c.dim}${s}${c.reset}`);
const manual = (s) => console.log(`  ${c.magenta}HANDS${c.reset} ${s}`);

// Collected for the closing summary.
const MANUAL_STEPS = [];
const CHECK_URLS = [];
const todo = (what, where) => MANUAL_STEPS.push({ what, where });

// ── Cloudflare API ───────────────────────────────────────────────────────────
const CF = 'https://api.cloudflare.com/client/v4';

async function cf(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${CF}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${CF_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  let json;
  try { json = await res.json(); } catch { json = null; }
  // Cloudflare returns HTTP 200 with success:false on logical errors. Always check success.
  if (!json?.success) {
    const errs = (json?.errors ?? []).map(e => `${e.code}: ${e.message}`).join('; ');
    throw new Error(`CF ${method} ${path} failed — ${errs || `HTTP ${res.status}`}`);
  }
  return json.result;
}

// A read that is allowed to 404/error into null (for "does this exist yet?" probes).
async function cfMaybe(path) {
  try { return await cf(path); } catch { return null; }
}

// Cloudflare answers "your token lacks this permission" with a flat
// `10000: Authentication error` — no hint as to WHICH permission. Dying with that
// message halfway through a go-live is miserable, so probe every API surface up
// front and name the exact permission group to add.
const SURFACES = [
  { name: 'Zones',           probe: () => `/zones?name=${DOMAIN}`,                          group: 'Zone → Zone → Read' },
  { name: 'DNS',             probe: (z) => z && `/zones/${z}/dns_records?per_page=1`,        group: 'Zone → DNS → Edit' },
  { name: 'Worker domains',  probe: () => `/accounts/${CF_ACCOUNT}/workers/domains`,         group: 'Account → Workers Scripts → Edit' },
  // The dashboard calls this group "Single Redirect". The API still calls the phase
  // "http_request_dynamic_redirect". Same thing, renamed in the UI only.
  { name: 'Redirect rules',  probe: (z) => z && `/zones/${z}/rulesets`,                      group: 'Zone → Single Redirect → Edit' },
  { name: 'Turnstile',       probe: () => `/accounts/${CF_ACCOUNT}/challenges/widgets`,      group: 'Account → Turnstile → Edit' },
  // Email Routing is TWO separate permission groups: destination addresses are
  // account-scoped, the forwarding rules are zone-scoped. Having only one of them
  // fails halfway through step 5, so probe both.
  { name: 'Email (account)', probe: () => `/accounts/${CF_ACCOUNT}/email/routing/addresses`, group: 'Account → Email Routing Addresses → Edit', when: () => !!EMAIL_TO },
  { name: 'Email (zone)',    probe: (z) => z && `/zones/${z}/email/routing/rules`,           group: 'Zone → Email Routing Rules → Edit',       when: () => !!EMAIL_TO },
];

async function checkPermissions(zoneId) {
  const missing = [];
  for (const s of SURFACES) {
    if (s.when && !s.when()) continue;
    const path = s.probe(zoneId);
    if (!path) continue;                       // needs a zone that does not exist yet
    try {
      await cf(path);
      ok(`${s.name.padEnd(16)} ${c.dim}token has access${c.reset}`);
    } catch (e) {
      if (!/10000|Authentication|9109|403/.test(e.message)) throw e;  // a real error, not a permission one
      bad(`${s.name.padEnd(16)} ${c.red}permission missing${c.reset}`);
      missing.push(s.group);
    }
  }

  if (missing.length) {
    console.log(`\n  ${c.bold}${c.red}Your Cloudflare token is missing ${missing.length} permission group(s).${c.reset}`);
    console.log(`  ${c.dim}dash.cloudflare.com → My Profile → API Tokens → your token → Edit${c.reset}\n`);
    for (const g of missing) console.log(`     ${c.bold}+ ${g}${c.reset}`);
    console.log(`\n  ${c.dim}Add them, save, then re-run. Nothing has been changed.${c.reset}\n`);
    process.exit(1);
  }
}

// ── Resend API ───────────────────────────────────────────────────────────────
async function resend(path, { method = 'GET', body } = {}) {
  const res = await fetch(`https://api.resend.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${RESEND_KEY}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(`Resend ${method} ${path} failed — ${json?.message ?? `HTTP ${res.status}`}`);
  }
  return json;
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// ── preflight ────────────────────────────────────────────────────────────────
async function preflight() {
  hdr('0. Preflight');

  if (!DOMAIN || !WORKER) {
    bad('--domain and --worker are both required.');
    info('e.g. node scripts/cloudflare-go-live.mjs --domain=example.com --worker=my-worker');
    process.exit(1);
  }
  if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(DOMAIN)) {
    bad(`--domain="${DOMAIN}" does not look like an apex domain (no scheme, no www, no path).`);
    process.exit(1);
  }

  // --step=verify is pure public HTTP. It needs no token and no permissions, so
  // it must stay usable even when the token is unscoped or absent entirely.
  if (STEP === 'verify') {
    info('verify only — public HTTP checks, no Cloudflare API access needed');
    return;
  }

  if (!CF_TOKEN || !CF_ACCOUNT) {
    bad('CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID must be set in .env');
    process.exit(1);
  }

  const v = await cfMaybe('/user/tokens/verify');
  if (!v) {
    bad('Cloudflare token is invalid or expired.');
    info('Fix: dash.cloudflare.com → My Profile → API Tokens');
    process.exit(1);
  }
  ok(`Cloudflare token valid (${v.status})`);

  if (DO_RESEND && !RESEND_KEY) {
    bad('--resend given but no Resend key. Pass --resend-key=re_xxx (each client gets their own free Resend account).');
    process.exit(1);
  }

  // Probe permissions BEFORE touching anything, so a scope gap fails loudly at
  // step 0 rather than cryptically at step 4 with the zone half-built.
  const zoneId = (await cfMaybe(`/zones?name=${DOMAIN}`))?.[0]?.id ?? null;
  await checkPermissions(zoneId);

  info(`domain   ${DOMAIN}`);
  info(`worker   ${WORKER}`);
  if (EMAIL_TO) info(`email    info@${DOMAIN} → ${EMAIL_TO}`);
  if (SUBDOMAINS.length) info(`extra    ${SUBDOMAINS.map(s => `${s}.${DOMAIN}`).join(', ')} → ${WORKER}`);
  console.log(
    APPLY
      ? `\n  ${c.bold}${c.green}APPLY MODE${c.reset} — changes will be made.`
      : `\n  ${c.bold}${c.yellow}DRY RUN${c.reset} — nothing will change. Re-run with ${c.bold}--apply${c.reset} to commit.`
  );
}

// ── 1. zone ──────────────────────────────────────────────────────────────────
// Assumes the domain was bought at an EXTERNAL registrar (BigRock). The zone
// must be created here, then its nameservers pasted back at the registrar by
// hand — there is no registrar API for that, it is always a manual step.
async function stepZone() {
  hdr(`1. Zone — ${DOMAIN}`);

  const found = await cf(`/zones?name=${DOMAIN}`);
  if (found.length) {
    const z = found[0];
    if (z.status === 'active') ok(`zone exists and is ${c.green}active${c.reset}`);
    else {
      warn(`zone exists but status is "${z.status}" — Cloudflare is not authoritative yet.`);
      info('Nameservers to set at your registrar:');
      for (const ns of z.name_servers ?? []) info(`  ${c.bold}${ns}${c.reset}`);
      todo(`Repoint nameservers for ${DOMAIN} to the two above`, 'BigRock → Domain → Nameservers → Use Custom');
    }
    return z;
  }

  if (!APPLY) {
    plan(`zone ${DOMAIN} (free plan)`);
    info('On apply, this prints the 2 nameservers you must paste into BigRock.');
    return null;
  }

  const z = await cf('/zones', {
    method: 'POST',
    body: { name: DOMAIN, account: { id: CF_ACCOUNT }, type: 'full' },
  });
  did(`zone ${DOMAIN} (status: ${z.status})`);
  console.log(`\n  ${c.bold}${c.yellow}→ Paste these two nameservers into BigRock now:${c.reset}`);
  for (const ns of z.name_servers ?? []) console.log(`     ${c.bold}${ns}${c.reset}`);
  console.log(`  ${c.dim}BigRock → My Orders → the domain → Nameservers → Use Custom Nameservers${c.reset}`);
  console.log(`  ${c.dim}Propagation is usually minutes, but can take hours. Re-run this script to check.${c.reset}`);
  todo(`Repoint nameservers for ${DOMAIN} to the two printed above`, 'BigRock → Domain → Nameservers → Use Custom');
  return z;
}

// Everything after step 1 needs an ACTIVE zone. This gate is what makes the
// script safely resumable: run it, repoint NS, walk away, run it again.
function requireActive(zone) {
  if (!zone) return false;
  if (zone.status === 'active') return true;
  warn(`zone is "${zone.status}", not "active" — skipping the remaining steps.`);
  info('Cloudflare only takes over once the registrar\'s nameservers point at it.');
  info('Repoint them, wait, then re-run this script. Nothing below can work first.');
  return false;
}

// ── 2. worker custom domains (apex + any backend subdomains) ─────────────────
// The dashboard's "Add Domain"/"Add Route" widget CANNOT attach a subdomain once
// the apex is already a Custom Domain — it dead-ends on "No zones match", even
// with a valid DNS record present. The API has no such bug. That is the single
// biggest reason to use this script over the dashboard for anything with a
// backend on api.<domain>.
async function stepWorkerDomain(zone) {
  hdr(`2. Worker custom domains → ${WORKER}`);

  const hostnames = [DOMAIN, ...SUBDOMAINS.map(s => `${s}.${DOMAIN}`)];

  for (const hostname of hostnames) {
    const existing = await cf(`/accounts/${CF_ACCOUNT}/workers/domains?hostname=${hostname}`);
    if (existing.length) {
      ok(`${hostname} already routes to Worker "${existing[0].service}"`);
      CHECK_URLS.push([`https://${hostname}`, hostname === DOMAIN ? 'the live site' : 'backend subdomain']);
      continue;
    }

    if (!APPLY) {
      plan(`custom domain ${hostname} → Worker "${WORKER}"`);
      continue;
    }

    await cf(`/accounts/${CF_ACCOUNT}/workers/domains`, {
      method: 'PUT',
      body: {
        hostname,
        service: WORKER,
        zone_id: zone.id,
        zone_name: DOMAIN,
        environment: 'production',
      },
    });
    did(`${hostname} → Worker "${WORKER}" (TLS cert provisioned automatically)`);
    CHECK_URLS.push([`https://${hostname}`, hostname === DOMAIN ? 'the live site' : 'backend subdomain']);
  }
}

// ── 3. www → apex redirect ───────────────────────────────────────────────────
// NOT a Custom Domain and NOT a Route. Both dead-end with "No zones match
// www.<domain>" once the apex is already a Custom Domain — a dashboard bug we
// burned real time on. A zone-level Single Redirect is the working path, and is
// better SEO anyway (one canonical hostname instead of two serving identical HTML).
async function stepWww(zone) {
  hdr(`3. www redirect — www.${DOMAIN} → ${DOMAIN}`);

  const PHASE = 'http_request_dynamic_redirect'; // NOT http_request_redirect (that is Bulk Redirects, account-level)

  const existing = await cfMaybe(`/zones/${zone.id}/rulesets/phases/${PHASE}/entrypoint`);

  // Do NOT look for the literal "www.<domain>". Cloudflare's own built-in
  // "Redirect from WWW to root [Template]" writes a GENERIC wildcard rule:
  //   (http.request.full_uri wildcard r"https://www.*")
  // which never contains the domain name. Matching on the literal reported
  // "would create" for a rule that already existed and worked — a false positive
  // that would have created a duplicate on --apply. Match on "www." instead,
  // which catches both the template's form and our own explicit one.
  const hasWww = existing?.rules?.some(r => r.expression?.includes('www.'));
  if (hasWww) {
    const r = existing.rules.find(x => x.expression?.includes('www.'));
    ok(`www → apex redirect already exists (${r.description || r.ref})`);
    CHECK_URLS.push([`https://www.${DOMAIN}`, 'should 301 to the apex']);
    return;
  }

  const rule = {
    ref: 'redirect_www_to_apex',
    description: 'Redirect www to apex (301, query string preserved)',
    expression: `http.host eq "www.${DOMAIN}"`,
    action: 'redirect',
    action_parameters: {
      from_value: {
        target_url: { expression: `concat("https://${DOMAIN}", http.request.uri.path)` },
        status_code: 301,
        preserve_query_string: true,
      },
    },
  };

  // The www A record only exists to make the hostname resolvable so the redirect
  // can fire. 192.0.2.1 is the RFC 5737 documentation address — it is never
  // reached, because the proxy intercepts and redirects before any origin fetch.
  const wwwRecords = await cf(`/zones/${zone.id}/dns_records?name=www.${DOMAIN}`);
  const needsRecord = wwwRecords.length === 0;

  if (!APPLY) {
    if (needsRecord) plan(`DNS A record www.${DOMAIN} → 192.0.2.1 (proxied; placeholder, never reached)`);
    plan(`redirect rule 301 www.${DOMAIN} → ${DOMAIN}`);
    return;
  }

  if (needsRecord) {
    await cf(`/zones/${zone.id}/dns_records`, {
      method: 'POST',
      body: { type: 'A', name: 'www', content: '192.0.2.1', ttl: 1, proxied: true },
    });
    did(`DNS A record www.${DOMAIN} (proxied placeholder)`);
  } else {
    ok(`DNS record for www.${DOMAIN} already present`);
  }

  if (existing) {
    // Append to the zone's existing redirect ruleset rather than replacing it.
    await cf(`/zones/${zone.id}/rulesets/${existing.id}`, {
      method: 'PUT',
      body: { rules: [...(existing.rules ?? []), rule] },
    });
  } else {
    await cf(`/zones/${zone.id}/rulesets`, {
      method: 'POST',
      body: { name: 'Redirect rules', kind: 'zone', phase: PHASE, rules: [rule] },
    });
  }
  did(`redirect rule 301 www.${DOMAIN} → ${DOMAIN}`);
  CHECK_URLS.push([`https://www.${DOMAIN}`, 'should 301 to the apex']);
}

// ── 4. Turnstile ─────────────────────────────────────────────────────────────
// Free plan ceiling: 20 widgets per ACCOUNT, 15 hostnames per widget. One
// Cloudflare account across all clients means widget #21 is a hard wall.
async function stepTurnstile() {
  hdr('4. Turnstile widget');

  const hostnames = [DOMAIN, `www.${DOMAIN}`];
  const widgets = await cf(`/accounts/${CF_ACCOUNT}/challenges/widgets`);

  if (widgets.length >= 18) {
    warn(`${widgets.length}/20 Turnstile widgets used on this account. The free ceiling is 20.`);
    info('Reuse a widget across sites (15 hostnames each) or the next client will not fit.');
  }

  // Already allowed? Nothing to do.
  const covering = widgets.find(w => w.domains?.includes(DOMAIN));
  if (covering) {
    const missing = hostnames.filter(h => !covering.domains.includes(h));
    if (!missing.length) {
      ok(`widget "${covering.name}" allows ${hostnames.join(', ')}`);
      info(`sitekey ${covering.sitekey}`);
      return;
    }
    if (!APPLY) { plan(`add ${missing.join(', ')} to widget "${covering.name}"`); return; }
    await cf(`/accounts/${CF_ACCOUNT}/challenges/widgets/${covering.sitekey}`, {
      method: 'PUT',
      body: { name: covering.name, mode: covering.mode, domains: [...covering.domains, ...missing] },
    });
    did(`added ${missing.join(', ')} to widget "${covering.name}"`);
    return;
  }

  // A widget exists but does NOT allow the live domain. This is the dangerous
  // state: the form looks fine in dev (localhost is allowed) and fails for every
  // real visitor, because Turnstile refuses to render on a non-allowlisted host.
  // Creating a SECOND widget here would burn one of the 20 free slots and force a
  // sitekey+secret swap in code. Extending the existing one is almost always right.
  if (widgets.length && !SITEKEY) {
    bad(`No Turnstile widget allows ${DOMAIN}. The live form is BROKEN for real visitors.`);
    for (const w of widgets) info(`  ${w.sitekey}  ${w.name}  [${(w.domains ?? []).join(', ')}]`);
    console.log(`\n  ${c.bold}Extend the existing widget${c.reset} (keeps your current sitekey + secret, no code change):`);
    console.log(`     ${c.bold}--turnstile-sitekey=${widgets[0].sitekey}${c.reset}`);
    info('Or omit it to create a NEW widget — costs a slot, and you must swap the keys in code.');
    return;
  }

  if (SITEKEY) {
    const target = widgets.find(w => w.sitekey === SITEKEY);
    if (!target) { bad(`no widget with sitekey ${SITEKEY} on this account`); return; }
    const domains = [...new Set([...(target.domains ?? []), ...hostnames])];
    if (!APPLY) { plan(`add ${hostnames.join(', ')} to widget "${target.name}" (keeps its keys)`); return; }
    await cf(`/accounts/${CF_ACCOUNT}/challenges/widgets/${SITEKEY}`, {
      method: 'PUT',
      body: { name: target.name, mode: target.mode, domains },
    });
    did(`widget "${target.name}" now allows ${domains.join(', ')}`);
    info('Sitekey and secret are unchanged, so no code change is needed.');
    return;
  }

  if (!APPLY) {
    plan(`Turnstile widget "${DOMAIN}" (managed mode) for ${hostnames.join(', ')}`);
    info('On apply, the SECRET is written to a local file, never printed to the terminal.');
    return;
  }

  const w = await cf(`/accounts/${CF_ACCOUNT}/challenges/widgets`, {
    method: 'POST',
    body: { name: DOMAIN, mode: 'managed', domains: hostnames },
  });
  did(`Turnstile widget "${DOMAIN}"`);
  info(`sitekey ${w.sitekey}  ${c.dim}(public — safe to commit in your HTML)${c.reset}`);
  writeSecrets({ TURNSTILE_SECRET_KEY: w.secret });
}

// Secrets go to a gitignored file, never to stdout — terminal scrollback and CI
// logs both leak. Feed them to the Worker with:
//   wrangler secret put TURNSTILE_SECRET_KEY < the file
function writeSecrets(pairs) {
  const file = resolve(process.cwd(), `go-live.${DOMAIN}.secrets.env`);
  const prev = existsSync(file) ? readFileSync(file, 'utf8') : '';
  const lines = Object.entries(pairs).map(([k, v]) => `${k}=${v}`);
  writeFileSync(file, `${prev}${prev && !prev.endsWith('\n') ? '\n' : ''}${lines.join('\n')}\n`);
  warn(`secret written to ${c.bold}go-live.${DOMAIN}.secrets.env${c.reset} — gitignore it, then delete it.`);
  info(`load it into the Worker:  wrangler secret put ${Object.keys(pairs)[0]}`);
}

// ── 5. Email Routing (receive) ───────────────────────────────────────────────
// Free and unlimited. This is what makes info@<domain> land in a normal Gmail
// inbox without paying for a mailbox.
async function stepEmail(zone) {
  hdr(`5. Email Routing — info@${DOMAIN} → ${EMAIL_TO}`);

  if (!EMAIL_TO) { info('skipped (pass --email-to=you@gmail.com to enable)'); return; }

  // GET /email/routing, /email/routing/settings and /email/routing/dns all return
  // `10000: Authentication error` even with Email Routing Rules → Edit granted —
  // they sit behind a permission group the routing grants do not include. Rather
  // than demand yet another token scope, infer the state from what we CAN read:
  // Cloudflare's own MX records. If they are present, routing is on.
  const mx = await cf(`/zones/${zone.id}/dns_records?type=MX`);
  const hasMx = mx.some(r => /mx\.cloudflare\.net\.?$/i.test(r.content));

  if (hasMx) ok('Cloudflare MX records present — Email Routing is enabled');
  else if (!APPLY) plan('enable Email Routing (Cloudflare adds the MX + SPF records itself)');
  else {
    await cf(`/zones/${zone.id}/email/routing/enable`, { method: 'POST' });
    did('Email Routing enabled (MX + SPF added automatically)');
  }

  // Destination address. Cloudflare emails a confirmation link that a human MUST
  // click — there is no API to self-verify. Rules pointing at an unverified
  // address silently drop mail, so this is a real blocker, not a nicety.
  const addrs = await cf(`/accounts/${CF_ACCOUNT}/email/routing/addresses`);
  const dest = addrs.find(a => a.email === EMAIL_TO);

  if (dest?.verified) ok(`destination ${EMAIL_TO} is verified`);
  else if (dest) {
    warn(`destination ${EMAIL_TO} exists but is NOT verified`);
    manual(`Open the Cloudflare email in ${EMAIL_TO} and click the verification link.`);
    todo(`Click the Cloudflare verification link sent to ${EMAIL_TO}`, `${EMAIL_TO} inbox (check spam)`);
  } else if (!APPLY) {
    plan(`destination address ${EMAIL_TO} (sends a verification email you must click)`);
  } else {
    await cf(`/accounts/${CF_ACCOUNT}/email/routing/addresses`, { method: 'POST', body: { email: EMAIL_TO } });
    did(`destination ${EMAIL_TO} — verification email sent`);
    manual(`Open the Cloudflare email in ${EMAIL_TO} and click the link. Mail is dropped until you do.`);
    todo(`Click the Cloudflare verification link sent to ${EMAIL_TO}`, `${EMAIL_TO} inbox (check spam)`);
  }

  // Forwarding rule.
  const rules = await cf(`/zones/${zone.id}/email/routing/rules`);
  const addr = `info@${DOMAIN}`;
  if (rules.some(r => r.matchers?.some(m => m.value === addr))) {
    ok(`rule ${addr} → ${EMAIL_TO} already exists`);
    return;
  }
  if (!APPLY) { plan(`routing rule ${addr} → ${EMAIL_TO}`); return; }
  await cf(`/zones/${zone.id}/email/routing/rules`, {
    method: 'POST',
    body: {
      name: `Forward ${addr}`,
      enabled: true,
      matchers: [{ type: 'literal', field: 'to', value: addr }],
      actions: [{ type: 'forward', value: [EMAIL_TO] }],
    },
  });
  did(`routing rule ${addr} → ${EMAIL_TO}`);
}

// ── 6. Resend sending domain ─────────────────────────────────────────────────
// Sends from send.<domain>, a SUBDOMAIN — deliberately not the apex, so its MX
// does not collide with Email Routing's apex MX. Both can then coexist.
async function stepResend(zone) {
  hdr(`6. Resend sending domain — send.${DOMAIN}`);

  if (!DO_RESEND) { info('skipped (pass --resend to set up the sending domain)'); return; }

  const name = `send.${DOMAIN}`;
  const list = await resend('/domains');
  let d = (list?.data ?? []).find(x => x.name === name);

  if (d?.status === 'verified') { ok(`${name} is verified — sending works`); return; }

  if (!d) {
    if (!APPLY) {
      plan(`Resend domain ${name}, then write its DKIM/SPF records into Cloudflare DNS`);
      info('Free tier: 3,000 emails/month, 100/day. No card required.');
      return;
    }
    d = await resend('/domains', { method: 'POST', body: { name } });
    did(`Resend domain ${name}`);
  } else {
    ok(`Resend domain ${name} exists (status: ${d.status})`);
  }

  // Write Resend's records into Cloudflare ourselves. This replaces Resend's
  // "Auto configure" button — same result, but scripted and reviewable.
  const full = await resend(`/domains/${d.id}`);
  const current = await cf(`/zones/${zone.id}/dns_records`);

  for (const r of full.records ?? []) {
    const fqdn = r.name.endsWith(DOMAIN) ? r.name : `${r.name}.${DOMAIN}`;
    if (current.some(e => e.name === fqdn && e.type === r.type)) { ok(`DNS ${r.type} ${fqdn} present`); continue; }
    if (!APPLY) { plan(`DNS ${r.type} ${fqdn}`); continue; }
    await cf(`/zones/${zone.id}/dns_records`, {
      method: 'POST',
      // proxied MUST be false: DKIM/SPF/MX are not HTTP and cannot pass through the proxy.
      body: { type: r.type, name: fqdn, content: r.value, priority: r.priority, ttl: 1, proxied: false },
    });
    did(`DNS ${r.type} ${fqdn}`);
  }

  if (!APPLY) { plan(`trigger verification of ${name}`); return; }

  await resend(`/domains/${d.id}/verify`, { method: 'POST' });
  info('verification triggered, polling…');
  for (let i = 0; i < 10; i++) {
    await sleep(6000);
    const s = (await resend(`/domains/${d.id}`))?.status;
    if (s === 'verified') { ok(`${name} verified — you can now send from website@${name}`); return; }
    if (s === 'failed') { bad(`verification failed. Check the DNS records in Cloudflare.`); return; }
  }
  warn('still pending. DNS can take a few minutes; re-run this script to re-check.');
}

// ── 7. verify live ───────────────────────────────────────────────────────────
async function stepVerify() {
  hdr('7. Verify live');

  const checks = [
    [`https://${DOMAIN}`, 200, 'homepage'],
    [`https://www.${DOMAIN}`, 301, 'www redirects to apex'],
    [`https://${DOMAIN}/robots.txt`, 200, 'robots.txt'],
  ];

  for (const [url, want, label] of checks) {
    try {
      const res = await fetch(url, { redirect: 'manual' });
      const good = res.status === want;
      const line = `${label.padEnd(24)} ${res.status} ${c.dim}${url}${c.reset}`;
      good ? ok(line) : warn(`${line}  (expected ${want})`);
    } catch (e) {
      bad(`${label.padEnd(24)} unreachable ${c.dim}${url}${c.reset}`);
    }
  }

  // The workers.dev URL serves a byte-identical public copy of the whole site: a
  // second crawlable origin competing with the real domain for the same rankings.
  // `workers_dev` DEFAULTS TO TRUE, so this is on unless someone turned it off,
  // and flipping the dashboard toggle alone is undone by the next deploy.
  const sub = await cfMaybe(`/accounts/${CF_ACCOUNT}/workers/subdomain`);
  if (sub?.subdomain) {
    const devUrl = `https://${WORKER}.${sub.subdomain}.workers.dev`;
    try {
      const res = await fetch(devUrl, { redirect: 'manual' });
      if (res.status === 404) {
        ok(`workers.dev disabled       404 ${c.dim}${devUrl}${c.reset}`);
      } else {
        warn(`workers.dev STILL PUBLIC  ${res.status} ${c.dim}${devUrl}${c.reset}`);
        info('That is a duplicate, crawlable copy of the whole site competing with the real domain.');
        info(`Fix in wrangler.jsonc (NOT the dashboard toggle — it defaults back to true):`);
        console.log(`     ${c.bold}"workers_dev": false, "preview_urls": false${c.reset}`);
        info('then rebuild + wrangler deploy.');
      }
    } catch { /* network hiccup, not worth failing the run */ }
  }

  // A stale/negative DNS cache on ONE resolver can make a correct record look
  // broken for minutes. Do not trust a single failure — this cost us real time.
  info('If something 5xx/NXDOMAINs right after a DNS change, check 1.1.1.1 and 8.8.8.8');
  info('before assuming the config is wrong. Negative caching lies.');
}

// ── run ──────────────────────────────────────────────────────────────────────
const only = (name) => !STEP || STEP === name;

(async () => {
  await preflight();

  // The standalone verify path touches no Cloudflare API at all.
  if (STEP === 'verify') {
    await stepVerify();
    console.log('');
    process.exit(0);
  }

  let zone = null;
  if (only('zone'))     zone = await stepZone();
  else                  zone = (await cf(`/zones?name=${DOMAIN}`))[0] ?? null;

  const live = requireActive(zone);

  if (live) {
    if (only('worker'))    await stepWorkerDomain(zone);
    if (only('www'))       await stepWww(zone);
    if (only('turnstile')) await stepTurnstile();
    if (only('email'))     await stepEmail(zone);
    if (only('resend'))    await stepResend(zone);
    await stepVerify();
  }

  // ── closing summary ────────────────────────────────────────────────────────
  if (MANUAL_STEPS.length) {
    hdr('You must do these by hand — no API exists for them');
    for (const m of MANUAL_STEPS) {
      console.log(`  ${c.magenta}▸${c.reset} ${m.what}`);
      console.log(`    ${c.dim}${m.where}${c.reset}`);
    }
  }

  // These four are never automatable. Say so every run so they are never forgotten.
  hdr('Always manual (by design)');
  console.log(`  ${c.dim}• Connect GitHub → Worker: Settings → Build (dashboard OAuth, no API)${c.reset}`);
  console.log(`  ${c.dim}• Build variable PUBLIC_SITE_URL=https://${DOMAIN}: Settings → Build → Build variables${c.reset}`);
  console.log(`  ${c.dim}  (NOT Settings → Variables and secrets — that one is runtime. Different place.)${c.reset}`);
  console.log(`  ${c.dim}• Submit the contact form once, solving the real Turnstile. Bots cannot; that is the point.${c.reset}`);

  hdr('Check your work');
  const links = [
    [`https://dash.cloudflare.com/?to=/:account/${DOMAIN}`, 'zone overview + DNS'],
    [`https://dash.cloudflare.com/?to=/:account/workers/services/view/${WORKER}`, 'the Worker'],
    ...CHECK_URLS,
  ];
  for (const [url, label] of links) console.log(`  ${c.dim}${label.padEnd(26)}${c.reset}${url}`);

  if (!APPLY) {
    console.log(`\n  ${c.bold}${c.yellow}That was a dry run. Nothing changed.${c.reset}`);
    console.log(`  Re-run with ${c.bold}--apply${c.reset} to commit.\n`);
  } else {
    console.log(`\n  ${c.bold}${c.green}Done.${c.reset}\n`);
  }
})().catch(e => {
  console.error(`\n  ${c.red}${c.bold}Failed:${c.reset} ${e.message}\n`);
  process.exit(1);
});
