// gsc-onboard.mjs — put a freshly-live domain into Google's index, end to end.
//
// Runbook + gotchas: .claude/skills/gsc-onboard/SKILL.md
// API details:       references/gsc-onboard.md
//
// The sequel to cloudflare-go-live.mjs. That one makes a domain LIVE; this one
// makes it FINDABLE. Same contract, deliberately:
//
// SAFE BY DEFAULT. Plain runs are a DRY RUN: nothing is created or changed.
// Add --apply to actually write. Every step is idempotent, so a half-finished
// onboarding (or one that raced DNS propagation) is safe to re-run.
//
//   node scripts/gsc-onboard.mjs --domain=example.com
//   node scripts/gsc-onboard.mjs --domain=example.com --apply
//
// Common flags:
//   --domain=       (required) apex domain, e.g. accentwallplanner.com
//   --owner-email=  Google account to add as a GSC owner, so the property shows
//                   up in YOUR browser and not only in the service account's
//                   (which has no UI). Defaults to GSC_OWNER_EMAIL in .env.
//   --project-dir=  the product repo, for writing the IndexNow key file into
//                   its public/ dir. Skips the IndexNow step if omitted.
//   --sitemap=      override sitemap path (default: auto-probe, see stepSitemap)
//   --urls=         comma-separated URLs to prioritise for inspection + Bing +
//                   IndexNow. Default: the first 4 URLs found in the sitemap.
//   --step=         run one step only:
//                   verify|owner|property|sitemap|clean|inspect|bing|indexnow|env
//   --clean         also DELETE junk sitemap submissions (entries that are not
//                   XML — e.g. page URLs pasted into the Sitemaps box by hand)
//   --apply         actually make changes (default: dry run)
//
// ── What this CANNOT do, and why ─────────────────────────────────────────────
// There is no public API behind Search Console's "Request Indexing" button.
// The Indexing API (indexing.googleapis.com/v3/urlNotifications:publish) is
// officially limited to pages carrying JobPosting or BroadcastEvent structured
// data — Google states this explicitly. Pointing it at ordinary pages is
// outside the documented policy, so this script does NOT call it, and will not
// be "fixed" to. The sanctioned substitutes are all here: a submitted sitemap
// (which is what actually drives discovery), URL Inspection to VERIFY state,
// and IndexNow + Bing's real URL submission API for the non-Google engines.
// Manual Request Indexing stays a hand step, and it is a nudge for a handful of
// pages — never the thing that gets a site indexed.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import crypto from 'node:crypto';

// ── .env loader (same shape as report.mjs / cloudflare-go-live.mjs) ──────────
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

const DOMAIN      = arg('domain');
const OWNER_EMAIL = arg('owner-email', env.GSC_OWNER_EMAIL);
const PROJECT_DIR = arg('project-dir');
const SITEMAP_ARG = arg('sitemap');
const STEP        = arg('step');
const APPLY       = args.includes('--apply');
const CLEAN       = args.includes('--clean') || STEP === 'clean';
const URLS_ARG    = (arg('urls', '') || '').split(',').map(s => s.trim()).filter(Boolean);

const CF_TOKEN = env.CLOUDFLARE_API_TOKEN;
const BING_KEY = env.BING_WEBMASTER_API_KEY;

// GSC domain properties are addressed as `sc-domain:example.com`, NOT as a URL.
// Everything downstream (sitemaps, inspection, .env keys) keys off these two.
const SITE_URL = `sc-domain:${DOMAIN}`;
const ORIGIN   = `https://${DOMAIN}`;
// SLUG becomes the .env suffix: GSC_SITE_URL_ACCENTWALLPLANNER, etc. Matches the
// convention report.mjs already reads (GSC_SITE_URL_GRADEJAR, ...).
const SLUG = (DOMAIN || '').split('.')[0].replace(/[^a-z0-9]/gi, '').toUpperCase();

// ── colours (same palette as cloudflare-go-live.mjs) ─────────────────────────
const c = {
  reset: '\x1b[0m', bold: '\x1b[1m', green: '\x1b[32m', cyan: '\x1b[36m',
  yellow: '\x1b[33m', red: '\x1b[31m', dim: '\x1b[2m', magenta: '\x1b[35m',
};
const hdr  = (s) => console.log(`\n${c.bold}${c.cyan}${s}${c.reset}`);
const ok   = (s) => console.log(`  ${c.green}✓${c.reset} ${s}`);
const plan = (s) => console.log(`  ${c.yellow}+${c.reset} ${c.yellow}would do${c.reset} ${s}`);
const did  = (s) => console.log(`  ${c.green}✓ done${c.reset} ${s}`);
const warn = (s) => console.log(`  ${c.yellow}!${c.reset} ${s}`);
const bad  = (s) => console.log(`  ${c.red}✗${c.reset} ${s}`);
const info = (s) => console.log(`  ${c.dim}${s}${c.reset}`);

const MANUAL_STEPS = [];
const todo = (what, where) => MANUAL_STEPS.push({ what, where });
const only = (name) => !STEP || STEP === name;
// Set by preflight when the Site Verification API is off but the run does not
// strictly need it (e.g. an already-verified domain, or --step=inspect).
let SKIP_VERIFY = false;

// ── Google service-account auth ──────────────────────────────────────────────
// Same JWT flow report.mjs uses, but asking for WRITE scopes. A service account
// needs no browser consent, which is the whole reason this can run headless —
// an OAuth user token would need a fresh consent dance per machine.
function b64url(buf) {
  return Buffer.from(buf).toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
let _tokenCache = null;
async function googleToken() {
  if (_tokenCache && _tokenCache.exp > Date.now() / 1000 + 60) return _tokenCache.tok;
  const keyPath = resolve(process.cwd(), env.GOOGLE_APPLICATION_CREDENTIALS || '');
  if (!existsSync(keyPath)) {
    throw new Error(`Service-account JSON not found at ${keyPath} — set GOOGLE_APPLICATION_CREDENTIALS in .env`);
  }
  const sa  = JSON.parse(readFileSync(keyPath, 'utf8'));
  const now = Math.floor(Date.now() / 1000);
  // All three scopes in one token. `webmasters` (not .readonly) is what lets
  // sites.add and sitemaps.submit write; siteverification is a separate product.
  const scope = [
    'https://www.googleapis.com/auth/webmasters',
    'https://www.googleapis.com/auth/siteverification',
  ].join(' ');
  const hd = { alg: 'RS256', typ: 'JWT' };
  const cl = { iss: sa.client_email, scope, aud: sa.token_uri || 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 };
  const si = `${b64url(JSON.stringify(hd))}.${b64url(JSON.stringify(cl))}`;
  const sgn = crypto.createSign('RSA-SHA256'); sgn.update(si); sgn.end();
  const jwt = `${si}.${b64url(sgn.sign(sa.private_key))}`;
  const res = await fetch(sa.token_uri || 'https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
  });
  const r = await res.json().catch(() => null);
  if (!r?.access_token) throw new Error(`Google SA token failed: ${JSON.stringify(r)}`);
  _tokenCache = { tok: r.access_token, exp: now + (r.expires_in ?? 3600) };
  return r.access_token;
}
const SA_EMAIL = () => {
  const p = resolve(process.cwd(), env.GOOGLE_APPLICATION_CREDENTIALS || '');
  return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')).client_email : '(unknown)';
};

// Generic Google API call. Returns { ok, status, json }. Never throws on HTTP
// error — callers decide, because "404 = does not exist yet" is a normal answer
// on almost every probe in this script.
async function g(url, { method = 'GET', body } = {}) {
  const token = await googleToken();
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch { /* empty 204 bodies are normal here */ }
  return { ok: res.ok, status: res.status, json };
}

// Google answers a disabled API with 403 + a very specific reason. Catching it
// here turns an opaque failure into the one URL that fixes it.
function apiDisabledHint(r) {
  const msg = r?.json?.error?.message ?? '';
  if (/has not been used in project|is disabled|SERVICE_DISABLED/i.test(msg)) {
    const m = msg.match(/https:\/\/console\.developers\.google\.com\S+/);
    return m ? m[0].replace(/[.\s]+$/, '') : 'https://console.cloud.google.com/apis/library';
  }
  return null;
}

// ── Cloudflare API (DNS only — this script never touches routing) ────────────
const CF = 'https://api.cloudflare.com/client/v4';
async function cf(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${CF}${path}`, {
    method,
    headers: { Authorization: `Bearer ${CF_TOKEN}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => null);
  if (!json?.success) {
    const errs = (json?.errors ?? []).map(e => `${e.code}: ${e.message}`).join('; ');
    throw new Error(`CF ${method} ${path} failed — ${errs || `HTTP ${res.status}`}`);
  }
  return json.result;
}

// ── DNS propagation check, via Google's own resolver ─────────────────────────
// Deliberately dns.google and not a local lookup: this is the resolver Google's
// verifier itself reads, so a hit here means verification will actually pass.
// A local `nslookup` can be right while Google is still cold, which is exactly
// the false-positive that makes verification fail for no visible reason.
async function txtRecords(name) {
  const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(name)}&type=TXT`);
  const j = await res.json().catch(() => null);
  return (j?.Answer ?? []).map(a => String(a.data ?? '').replace(/^"|"$/g, ''));
}
async function waitForTxt(name, needle, tries = 10, delayMs = 6000) {
  for (let i = 1; i <= tries; i++) {
    const recs = await txtRecords(name);
    if (recs.some(r => r.includes(needle))) return true;
    if (i < tries) {
      info(`DNS not visible to Google yet — retry ${i}/${tries - 1} in ${delayMs / 1000}s`);
      await new Promise(r => setTimeout(r, delayMs));
    }
  }
  return false;
}

// ═════════════════════════════════════════════════════════════════════════════
// Steps
// ═════════════════════════════════════════════════════════════════════════════

async function preflight() {
  hdr(`Onboarding ${c.bold}${DOMAIN}${c.reset}${c.cyan} to Google Search Console${c.reset}`);
  if (!DOMAIN) throw new Error('--domain is required, e.g. --domain=example.com');
  if (!CF_TOKEN) throw new Error('CLOUDFLARE_API_TOKEN missing from .env');
  info(`identity   ${SA_EMAIL()}`);
  info(`property   ${SITE_URL}`);
  info(`mode       ${APPLY ? 'APPLY (writes)' : 'dry run (no changes)'}`);

  // Fail fast and loudly if an API is not enabled — the single most common
  // first-run failure, and its raw error names neither the API nor the fix.
  //
  // Only the verify/owner steps need Site Verification. A domain that is already
  // verified (or one where you only want --step=inspect) must not be blocked by
  // it, so this downgrades to a warning unless the run actually needs it.
  const needsVerification = only('verify') || only('owner');
  const probe = await g('https://www.googleapis.com/siteVerification/v1/webResource');
  const hint = apiDisabledHint(probe);
  if (hint) {
    if (needsVerification) {
      bad('Site Verification API is not enabled on this Google Cloud project.');
      info(`Enable it here, wait ~1 min, re-run: ${hint}`);
      throw new Error('Site Verification API disabled');
    }
    warn('Site Verification API is off — skipping verify/owner. Everything else still runs.');
    info(`Enable: ${hint}`);
    SKIP_VERIFY = true;
  } else if (!probe.ok && probe.status === 403) {
    warn('Site Verification API returned 403 — check the service account has the scopes.');
  } else {
    ok('Site Verification API reachable');
  }

  // The Search Console API is required by every step. No point continuing without it.
  const sc = await g('https://www.googleapis.com/webmasters/v3/sites');
  const scHint = apiDisabledHint(sc);
  if (scHint) {
    bad('Search Console API is not enabled on this Google Cloud project.');
    info(`Enable it here, wait ~1 min, re-run: ${scHint}`);
    throw new Error('Search Console API disabled');
  }
  ok('Search Console API reachable');

  // The site has to actually be live before any of this is worth doing.
  const res = await fetch(ORIGIN, { redirect: 'follow' }).catch(() => null);
  if (!res || !res.ok) {
    warn(`${ORIGIN} did not return 200 — is the site actually live? Run cloudflare-go-live first.`);
  } else {
    ok(`${ORIGIN} is live (HTTP ${res.status})`);
  }
}

// Step 1 — prove domain ownership via a DNS TXT record we write ourselves.
async function stepVerify() {
  hdr('1. Verify domain ownership (DNS TXT)');

  const listed = await g('https://www.googleapis.com/siteVerification/v1/webResource');
  const already = (listed.json?.items ?? []).find(
    it => it.site?.identifier === DOMAIN && it.site?.type === 'INET_DOMAIN'
  );
  if (already) { ok(`already verified — webResource id ${already.id}`); return already; }

  // DNS_TXT is the only method valid for INET_DOMAIN (a domain property).
  // FILE/META are SITE-only and would cover just one host, not the whole domain.
  const tok = await g('https://www.googleapis.com/siteVerification/v1/token', {
    method: 'POST',
    body: { site: { type: 'INET_DOMAIN', identifier: DOMAIN }, verificationMethod: 'DNS_TXT' },
  });
  if (!tok.ok) throw new Error(`getToken failed: ${JSON.stringify(tok.json)}`);
  const token = tok.json.token;
  info(`token  ${token}`);

  const zones = await cf(`/zones?name=${DOMAIN}`);
  const zone = zones[0];
  if (!zone) throw new Error(`No Cloudflare zone for ${DOMAIN} — run cloudflare-go-live first.`);

  // Several google-site-verification TXT records can coexist at the apex, one per
  // verified identity. So this ADDS; it never edits or removes an existing one
  // (yours, from the browser flow, must survive).
  const existing = await cf(`/zones/${zone.id}/dns_records?type=TXT&name=${DOMAIN}`);
  if (existing.some(r => r.content.includes(token))) {
    ok('TXT record already present in Cloudflare');
  } else if (!APPLY) {
    plan(`create TXT ${DOMAIN} = ${token}`);
    return null;
  } else {
    await cf(`/zones/${zone.id}/dns_records`, {
      method: 'POST',
      body: {
        type: 'TXT', name: DOMAIN, content: token, ttl: 1,
        comment: 'Google Search Console domain-property verification (gsc-onboard)',
      },
    });
    did(`created TXT ${DOMAIN}`);
  }

  if (!APPLY) { plan('verify ownership with Google'); return null; }

  info('waiting for Google\'s resolver to see the record…');
  if (!await waitForTxt(DOMAIN, token)) {
    warn('TXT still not visible after ~1 min. The record IS created — just re-run this step later.');
    todo('Re-run verification once DNS settles', `node scripts/gsc-onboard.mjs --domain=${DOMAIN} --step=verify --apply`);
    return null;
  }
  ok('TXT visible to Google');

  const ins = await g('https://www.googleapis.com/siteVerification/v1/webResource?verificationMethod=DNS_TXT', {
    method: 'POST',
    body: { site: { type: 'INET_DOMAIN', identifier: DOMAIN } },
  });
  if (!ins.ok) throw new Error(`Verification failed: ${JSON.stringify(ins.json)}`);
  did(`verified ${DOMAIN} — webResource id ${ins.json.id}`);
  return ins.json;
}

// Step 2 — the service account has no browser UI, so hand ownership to a human too.
async function stepOwner(resource) {
  hdr('2. Add you as a property owner');
  if (!OWNER_EMAIL) {
    warn('No --owner-email / GSC_OWNER_EMAIL — skipping.');
    info('Without this the property is only visible to the service account, which has no UI.');
    return;
  }
  // Re-fetch when this step runs on its own (--step=owner), otherwise the
  // resource only exists on a run that also did the verifying.
  if (!resource) {
    const listed = await g('https://www.googleapis.com/siteVerification/v1/webResource');
    resource = (listed.json?.items ?? []).find(
      it => it.site?.identifier === DOMAIN && it.site?.type === 'INET_DOMAIN'
    ) ?? null;
  }
  if (!resource) {
    if (!APPLY) { plan(`add ${OWNER_EMAIL} as an owner`); return; }
    warn(`${DOMAIN} is not verified by the service account yet — run --step=verify --apply first.`);
    return;
  }
  if ((resource.owners ?? []).includes(OWNER_EMAIL)) { ok(`${OWNER_EMAIL} is already an owner`); return; }
  if (!APPLY) { plan(`add ${OWNER_EMAIL} as an owner`); return; }

  const upd = await g(`https://www.googleapis.com/siteVerification/v1/webResource/${encodeURIComponent(resource.id)}`, {
    method: 'PUT',
    body: { site: resource.site, owners: [...(resource.owners ?? []), OWNER_EMAIL] },
  });
  if (!upd.ok) {
    // Google sometimes refuses API-added owners depending on account state. Not
    // fatal — the UI path takes 30 seconds and is the documented fallback.
    warn(`Could not add owner via API: ${upd.json?.error?.message ?? upd.status}`);
    todo(`Add ${OWNER_EMAIL} as an owner by hand`,
      `GSC → Settings → Users and permissions → Add user (or verify ${DOMAIN} yourself in the browser)`);
    return;
  }
  did(`${OWNER_EMAIL} added as owner`);
}

// Step 3 — register the property itself. Verification and registration are two
// different things: verification proves ownership, sites.add creates the property.
async function stepProperty() {
  hdr('3. Register the Search Console property');
  const enc = encodeURIComponent(SITE_URL);
  const get = await g(`https://www.googleapis.com/webmasters/v3/sites/${enc}`);
  if (get.ok) { ok(`property ${SITE_URL} already exists`); return true; }
  if (!APPLY) { plan(`add property ${SITE_URL}`); return false; }

  const add = await g(`https://www.googleapis.com/webmasters/v3/sites/${enc}`, { method: 'PUT' });
  if (!add.ok) {
    const hint = apiDisabledHint(add);
    if (hint) { bad('Search Console API is not enabled on this project.'); info(`Enable: ${hint}`); }
    throw new Error(`sites.add failed: ${add.json?.error?.message ?? add.status}`);
  }
  did(`property ${SITE_URL} created`);
  return true;
}

// Find the sitemap without being told. Order matters: an index is preferred over
// a flat sitemap, because @astrojs/sitemap emits an index even for one child.
async function discoverSitemap() {
  if (SITEMAP_ARG) return SITEMAP_ARG.startsWith('http') ? SITEMAP_ARG : `${ORIGIN}/${SITEMAP_ARG.replace(/^\//, '')}`;
  // robots.txt is authoritative when present — it is what Google reads first.
  const rb = await fetch(`${ORIGIN}/robots.txt`).then(r => r.ok ? r.text() : '').catch(() => '');
  const declared = rb.match(/^\s*Sitemap:\s*(\S+)/im)?.[1];
  if (declared) return declared.trim();
  for (const p of ['/sitemap-index.xml', '/sitemap.xml', '/sitemap_index.xml']) {
    const r = await fetch(`${ORIGIN}${p}`, { method: 'HEAD' }).catch(() => null);
    if (r?.ok) return `${ORIGIN}${p}`;
  }
  return null;
}

// Pull every <loc> out of a sitemap, following one level of index nesting.
async function sitemapUrls(sitemapUrl, depth = 0) {
  const xml = await fetch(sitemapUrl).then(r => r.ok ? r.text() : '').catch(() => '');
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map(m => m[1]);
  const isIndex = /<sitemapindex/i.test(xml);
  if (!isIndex || depth > 1) return locs;
  const out = [];
  for (const child of locs) out.push(...await sitemapUrls(child, depth + 1));
  return out;
}

// Step 4 — submit the sitemap. This is the step that actually drives discovery.
async function stepSitemap() {
  hdr('4. Submit the sitemap');
  const sitemap = await discoverSitemap();
  if (!sitemap) { bad('No sitemap found. Is `site:` set in astro.config.mjs?'); return null; }
  info(`found ${sitemap}`);

  // A sitemap that answers text/html is the classic failure: it means a PAGE url
  // got submitted, and GSC reports "Sitemap is HTML" with zero discovered pages.
  const head = await fetch(sitemap, { method: 'GET' }).catch(() => null);
  const ctype = head?.headers.get('content-type') ?? '';
  if (!/xml/i.test(ctype)) {
    bad(`${sitemap} serves "${ctype}", not XML. Google will reject it as "Sitemap is HTML".`);
    return null;
  }
  ok(`serves ${ctype.split(';')[0]}`);

  const enc = encodeURIComponent(SITE_URL);
  const listed = await g(`https://www.googleapis.com/webmasters/v3/sites/${enc}/sitemaps`);
  const known = (listed.json?.sitemap ?? []).map(s => s.path);

  if (known.includes(sitemap)) {
    ok('already submitted');
  } else if (!APPLY) {
    plan(`submit ${sitemap}`);
  } else {
    const sub = await g(`https://www.googleapis.com/webmasters/v3/sites/${enc}/sitemaps/${encodeURIComponent(sitemap)}`, { method: 'PUT' });
    if (!sub.ok) throw new Error(`sitemaps.submit failed: ${sub.json?.error?.message ?? sub.status}`);
    did(`submitted ${sitemap}`);
  }

  // --clean removes the junk rows: anything submitted that is not an .xml path.
  // This is the exact mess made by pasting page URLs into the Sitemaps box.
  if (CLEAN) {
    const junk = (listed.json?.sitemap ?? []).filter(s => !/\.xml($|\?)/i.test(s.path));
    if (!junk.length) ok('no junk sitemap entries');
    for (const s of junk) {
      if (!APPLY) { plan(`DELETE bogus sitemap entry ${s.path}`); continue; }
      const del = await g(`https://www.googleapis.com/webmasters/v3/sites/${enc}/sitemaps/${encodeURIComponent(s.path)}`, { method: 'DELETE' });
      del.ok ? did(`removed bogus entry ${s.path}`) : warn(`could not remove ${s.path}`);
    }
  }
  return sitemap;
}

// Step 5 — URL Inspection. Read-only by design: this REPORTS index state, it
// cannot request indexing (no API exists for that). It is how you answer
// "did it work?" without clicking through the console.
async function stepInspect(urls) {
  hdr('5. Inspect index status');
  if (!urls.length) { warn('No URLs to inspect.'); return; }
  info(`${urls.length} URL(s) — quota is 2000/day, 600/min per property`);

  const label = {
    INDEXING_ALLOWED: 'indexable', PASS: 'indexed', PARTIAL: 'partial',
    FAIL: 'problem', NEUTRAL: 'not indexed',
  };
  for (const u of urls) {
    const r = await g('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
      method: 'POST',
      body: { inspectionUrl: u, siteUrl: SITE_URL },
    });
    if (!r.ok) {
      const hint = apiDisabledHint(r);
      if (hint) { bad('Search Console API not enabled.'); info(`Enable: ${hint}`); return; }
      warn(`${u} — ${r.json?.error?.message ?? r.status}`);
      continue;
    }
    const idx = r.json?.inspectionResult?.indexStatusResult ?? {};
    const state = idx.coverageState ?? label[idx.verdict] ?? 'unknown';
    const mark = /Submitted and indexed|Indexed/i.test(state) ? c.green
      : /not indexed|Discovered|Crawled/i.test(state) ? c.yellow : c.dim;
    const path = u.replace(ORIGIN, '') || '/';
    console.log(`  ${c.dim}${path.padEnd(30)}${c.reset}${mark}${state}${c.reset}`);
  }
  info('"Discovered – currently not indexed" is the normal day-one answer.');
}

// Bing ownership via DNS, written through Cloudflare — the same trick as the
// Google step, so no dashboard visit is needed. Bing hands back a
// `DnsVerificationCode` of the form "<hash>.<domain>"; that whole string is the
// CNAME name, pointing at verify.bing.com.
async function bingVerifyByDns(site) {
  const code = site.DnsVerificationCode;
  if (!code) {
    todo('Verify the site in Bing by hand', 'https://www.bing.com/webmasters → the site → Verify');
    return;
  }
  const zones = await cf(`/zones?name=${DOMAIN}`);
  const zone = zones[0];
  if (!zone) { warn('No Cloudflare zone — cannot write the CNAME.'); return; }

  const existing = await cf(`/zones/${zone.id}/dns_records?type=CNAME&name=${encodeURIComponent(code)}`);
  if (existing.length) ok(`CNAME ${code} already present`);
  else if (!APPLY) { plan(`create CNAME ${code} → verify.bing.com`); return; }
  else {
    // proxied:false is NOT optional. An orange-clouded CNAME resolves to
    // Cloudflare's edge IPs instead of verify.bing.com, and Bing's check fails
    // with no useful message.
    await cf(`/zones/${zone.id}/dns_records`, {
      method: 'POST',
      body: {
        type: 'CNAME', name: code, content: 'verify.bing.com', ttl: 1, proxied: false,
        comment: 'Bing Webmaster site verification (gsc-onboard)',
      },
    });
    did(`created CNAME ${code} → verify.bing.com (DNS only)`);
  }

  if (!APPLY) return;
  info('waiting for the CNAME to resolve…');
  for (let i = 0; i < 8; i++) {
    const r = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(code)}&type=CNAME`)
      .then(x => x.json()).catch(() => null);
    if ((r?.Answer ?? []).some(a => String(a.data).includes('verify.bing.com'))) { ok('CNAME resolves'); break; }
    if (i === 7) { warn('CNAME not resolving yet — re-run --step=bing --apply in a few minutes.'); return; }
    await new Promise(res => setTimeout(res, 5000));
  }

  // Bing exposes VerifySite on some accounts and not others. Try it; fall back
  // to the one-click UI rather than pretending this is fully hands-off.
  const res = await fetch(`https://ssl.bing.com/webmaster/api.svc/json/VerifySite?apikey=${BING_KEY}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ siteUrl: ORIGIN }),
  }).catch(() => null);
  const vj = await res?.json().catch(() => null);
  if (res?.ok && !vj?.ErrorCode) {
    did('Bing ownership verified');
    info('Re-run --step=bing --apply to submit the sitemap and URLs.');
  } else {
    warn('Bing did not verify over the API — the DNS record is in place, so the UI click will succeed instantly.');
    todo('Click Verify in Bing (DNS record already written)',
      'https://www.bing.com/webmasters → the site → Verify → DNS/CNAME method');
  }
}

// Step 6 — Bing. Unlike Google, Bing has a real, sanctioned URL submission API.
// Worth doing on its own merits, and Bing's index is what ChatGPT search reads.
async function stepBing(sitemap, urls) {
  hdr('6. Bing Webmaster Tools');
  if (!BING_KEY) { warn('BING_WEBMASTER_API_KEY missing — skipping.'); return; }
  const B = (m) => `https://ssl.bing.com/webmaster/api.svc/json/${m}?apikey=${BING_KEY}`;
  const post = async (m, body) => {
    const res = await fetch(B(m), {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    });
    const j = await res.json().catch(() => null);
    return { ok: res.ok && !j?.ErrorCode, j };
  };

  // GetUserSites returns the array directly as `d` — NOT `d.Sites`. Reading the
  // wrong shape silently yields "no sites", which makes this step re-add a site
  // that already exists on every run. Bing stores URLs WITH a trailing slash.
  const sitesRes = await fetch(B('GetUserSites')).then(r => r.json()).catch(() => null);
  const sites = Array.isArray(sitesRes?.d) ? sitesRes.d : (sitesRes?.d?.Sites ?? []);
  const mine = sites.find(s => String(s.Url ?? '').replace(/\/$/, '') === ORIGIN);

  if (mine) ok(`${ORIGIN} already in Bing`);
  else if (!APPLY) plan(`add ${ORIGIN} to Bing`);
  else {
    const r = await post('AddSite', { siteUrl: ORIGIN });
    r.ok ? did(`added ${ORIGIN}`)
         : warn(`AddSite failed (${r.j?.Message ?? 'unknown'}) — import from GSC in the Bing UI instead`);
    if (!r.ok) todo('Add the site in Bing Webmaster Tools', 'https://www.bing.com/webmasters → Import from Google Search Console');
  }

  // Being IN the account is not the same as being VERIFIED, and importing from
  // GSC does not always carry verification across. Every write below 401s until
  // IsVerified is true, so settle it here rather than failing three times.
  if (mine && mine.IsVerified === false) {
    warn(`${ORIGIN} is in Bing but NOT verified (IsVerified: false).`);
    await bingVerifyByDns(mine);
    return;
  }

  // AddSite puts the site in the account but does NOT verify ownership, and Bing
  // refuses every write until it is verified. That surfaces as a flat
  // "NotAuthorized" on the next call, which reads like a bad API key and is not.
  // Detect it once and emit the real fix instead of two identical warnings.
  let notAuthorized = false;
  const bingWrite = async (m, body, okMsg) => {
    const r = await post(m, body);
    if (r.ok) { did(okMsg); return; }
    const msg = String(r.j?.Message ?? r.j?.ErrorCode ?? 'failed');
    if (/NotAuthorized|Unauthorized/i.test(msg)) { notAuthorized = true; return; }
    warn(`${m}: ${msg}`);
  };

  // The method is SubmitFeed, NOT SubmitSitemap. Bing calls sitemaps "feeds"
  // throughout its API (GetFeeds/RemoveFeed/SubmitFeed). A wrong method name
  // does not return JSON at all — it returns an HTML "Endpoint not found" page,
  // which parses to null and looks exactly like a permissions failure.
  if (sitemap) {
    const feeds = await fetch(`${B('GetFeeds')}&siteUrl=${encodeURIComponent(ORIGIN)}`)
      .then(r => r.json()).catch(() => null);
    const known = (Array.isArray(feeds?.d) ? feeds.d : []).map(f => f.Url ?? f.FeedUrl);
    if (known.includes(sitemap)) ok('sitemap already submitted to Bing');
    else if (!APPLY) plan(`submit sitemap ${sitemap} to Bing`);
    else await bingWrite('SubmitFeed', { siteUrl: ORIGIN, feedUrl: sitemap }, 'sitemap submitted to Bing');
  }

  // THIS is a real indexing request — Bing sanctions it, up to ~10k/day.
  if (urls.length) {
    if (!APPLY) plan(`submit ${urls.length} URL(s) to Bing for indexing`);
    else if (!notAuthorized) await bingWrite('SubmitUrlbatch', { siteUrl: ORIGIN, urlList: urls }, `${urls.length} URL(s) submitted for indexing`);
  }

  if (notAuthorized) {
    warn(`${ORIGIN} is in your Bing account but NOT verified — Bing blocks writes until it is.`);
    info('Fastest fix: "Import from Google Search Console" in the Bing UI. It verifies automatically.');
    todo('Verify the site in Bing, then re-run --step=bing --apply',
      'https://www.bing.com/webmasters → Import from Google Search Console (one click, auto-verifies)');
  }
}

// Step 7 — IndexNow. Open protocol, one ping reaches Bing/Yandex/Seznam/Naver.
// Google does not participate, so this never replaces the sitemap.
async function stepIndexNow(urls) {
  hdr('7. IndexNow (Bing, Yandex, and friends)');
  if (!PROJECT_DIR) { warn('No --project-dir — skipping (the key file must ship with the site).'); return; }
  const pub = join(PROJECT_DIR, 'public');
  if (!existsSync(pub)) { warn(`${pub} not found — skipping.`); return; }

  // The key doubles as proof of control: it must be reachable at /<key>.txt.
  // Deterministic from the domain so re-runs reuse one key instead of littering.
  const key = crypto.createHash('sha256').update(`indexnow:${DOMAIN}`).digest('hex').slice(0, 32);
  const keyFile = join(pub, `${key}.txt`);
  const keyUrl = `${ORIGIN}/${key}.txt`;

  if (existsSync(keyFile)) ok(`key file present (${key}.txt)`);
  else if (!APPLY) plan(`write ${keyFile}`);
  else { mkdirSync(pub, { recursive: true }); writeFileSync(keyFile, key, 'utf8'); did(`wrote public/${key}.txt`); }

  const liveKey = await fetch(keyUrl).then(r => r.ok ? r.text() : null).catch(() => null);
  if (liveKey?.trim() !== key) {
    warn('Key file is not live yet — deploy the site, then re-run --step=indexnow --apply.');
    todo('Deploy so the IndexNow key file is reachable', `${keyUrl} must return: ${key}`);
    return;
  }
  ok('key file is live');

  if (!urls.length) { warn('No URLs to ping.'); return; }
  if (!APPLY) { plan(`ping IndexNow with ${urls.length} URL(s)`); return; }
  const res = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: DOMAIN, key, keyLocation: keyUrl, urlList: urls }),
  }).catch(() => null);
  // 200 = accepted, 202 = accepted pending key check (normal on a first ping).
  if (res && [200, 202].includes(res.status)) did(`pinged IndexNow with ${urls.length} URL(s) (HTTP ${res.status})`);
  else warn(`IndexNow returned ${res?.status ?? 'no response'} — 403 means the key file did not match.`);
}

// Step 8 — persist the wiring so /site-report picks this domain up automatically.
async function stepEnv() {
  hdr('8. Register in .env for /site-report');
  const path = resolve(process.cwd(), '.env');
  const txt = existsSync(path) ? readFileSync(path, 'utf8') : '';
  let zoneId = null;
  try { zoneId = (await cf(`/zones?name=${DOMAIN}`))[0]?.id ?? null; } catch { /* non-fatal */ }

  const want = {
    [`GSC_SITE_URL_${SLUG}`]: SITE_URL,
    [`BING_SITE_URL_${SLUG}`]: ORIGIN,
    ...(zoneId ? { [`CLOUDFLARE_ZONE_ID_${SLUG}`]: zoneId } : {}),
  };
  const missing = Object.entries(want).filter(([k]) => !new RegExp(`^${k}=`, 'm').test(txt));
  if (!missing.length) { ok('.env already has this domain'); return; }
  for (const [k, v] of missing) {
    if (!APPLY) { plan(`.env  ${k}=${v}`); continue; }
  }
  if (!APPLY) return;
  const block = `\n# ${DOMAIN} — added by gsc-onboard ${new Date().toISOString().slice(0, 10)}\n`
    + missing.map(([k, v]) => `${k}=${v}`).join('\n') + '\n';
  writeFileSync(path, txt.replace(/\s*$/, '\n') + block, 'utf8');
  did(`wrote ${missing.length} var(s) to .env`);
  // No code change needed: report.mjs discovers every GSC_SITE_URL_* /
  // BING_SITE_URL_* / CLOUDFLARE_ZONE_ID_* var at runtime, so writing .env here
  // is the whole registration. /site-report picks this domain up on its next run.
  info('/site-report will include this domain from its next run — no code change needed.');
}

// ═════════════════════════════════════════════════════════════════════════════
(async () => {
  await preflight();

  let resource = null;
  if (only('verify') && !SKIP_VERIFY)   resource = await stepVerify();
  if (only('owner')  && !SKIP_VERIFY)   await stepOwner(resource);
  if (SKIP_VERIFY) todo('Enable the Site Verification API, then re-run --step=verify --apply',
    'https://console.cloud.google.com/apis/library/siteverification.googleapis.com');
  if (only('property')) await stepProperty();

  let sitemap = null;
  if (only('sitemap') || only('clean')) sitemap = await stepSitemap();
  else sitemap = await discoverSitemap();

  // Priority URLs: explicit --urls, else the best 4 from the sitemap. Four because
  // that is a sane manual Request-Indexing batch, and the daily UI quota is ~10.
  //
  // Sitemap order is alphabetical, which would hand the top slots to /about and
  // /contact — the pages that will never earn a click. Rank instead: home first,
  // then real content, and trust pages last. They still get crawled via the
  // sitemap; they just do not deserve a scarce priority slot.
  const TRUST = /\/(about|privacy|terms|contact|disclaimer|cookies?)(\/|$)/i;
  let urls = URLS_ARG;
  if (!urls.length && sitemap) {
    const all = await sitemapUrls(sitemap);
    const rank = (u) => {
      const path = u.replace(ORIGIN, '').replace(/\/$/, '');
      if (path === '') return 0;          // home
      if (TRUST.test(u)) return 2;        // legally required, commercially dead
      return 1;                           // actual content
    };
    urls = all.sort((a, b) => rank(a) - rank(b)).slice(0, 4);
  }

  if (only('inspect'))  await stepInspect(urls);
  if (only('bing'))     await stepBing(sitemap, urls);
  if (only('indexnow')) await stepIndexNow(urls);
  if (only('env'))      await stepEnv();

  if (MANUAL_STEPS.length) {
    hdr('You must do these by hand');
    for (const m of MANUAL_STEPS) {
      console.log(`  ${c.magenta}▸${c.reset} ${m.what}`);
      console.log(`    ${c.dim}${m.where}${c.reset}`);
    }
  }

  // Said every run, because it is the one thing people assume got automated.
  hdr('Always manual (by design)');
  console.log(`  ${c.dim}• "Request Indexing" in GSC has NO public API. The Indexing API is${c.reset}`);
  console.log(`  ${c.dim}  JobPosting/BroadcastEvent only — using it for normal pages is off-policy.${c.reset}`);
  console.log(`  ${c.dim}  The submitted sitemap is what drives discovery. Requesting is a nudge${c.reset}`);
  console.log(`  ${c.dim}  for a handful of URLs, capped ~10/day, and never the deciding factor.${c.reset}`);
  if (urls.length) {
    console.log(`  ${c.dim}  If you want the nudge, paste these into URL Inspection (top search bar):${c.reset}`);
    for (const u of urls) console.log(`  ${c.dim}    ${u}${c.reset}`);
  }

  hdr('Check your work');
  console.log(`  ${c.dim}${'GSC property'.padEnd(20)}${c.reset}https://search.google.com/search-console?resource_id=${encodeURIComponent(SITE_URL)}`);
  console.log(`  ${c.dim}${'Bing'.padEnd(20)}${c.reset}https://www.bing.com/webmasters/sitemaps?siteUrl=${encodeURIComponent(ORIGIN)}`);
  console.log(`  ${c.dim}${'Indexed pages'.padEnd(20)}${c.reset}check GSC → Pages in ~7 days, not Performance (it lags further)`);

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
