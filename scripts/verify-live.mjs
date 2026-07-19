// verify-live.mjs — the wire-truth checker. Asserts house invariants against PRODUCTION.
// Every site in the portfolio, every client site. Prints only what's wrong.
//
// Run: node scripts/verify-live.mjs
// Flags: --all           show passing checks too (default: failures only)
//        --site=<domain> check one domain
//        --json          machine-readable output
//
// It REPORTS. It never fixes. An auto-fixer would give you a fourth thing that
// looks done — which is the exact failure this script exists to catch.
//
// Exit 0 = every P0 green. Exit 1 = at least one P0 failed.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// ── .env loader (same shape as report.mjs) ───────────────────────────────────
function loadEnv() {
  try {
    const txt = readFileSync(resolve(process.cwd(), '.env'), 'utf8');
    const env = {};
    for (const raw of txt.split(/\r?\n/)) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const eq = line.indexOf('=');
      if (eq === -1) continue;
      env[line.slice(0, eq).trim()] = line.slice(eq + 1).replace(/\s+#.*$/, '').trim();
    }
    return env;
  } catch { return {}; }
}
const env = loadEnv();
const args = process.argv.slice(2);
const SHOW_ALL = args.includes('--all');
const AS_JSON = args.includes('--json');
const ONLY = args.find(a => a.startsWith('--site='))?.split('=')[1];

// Publisher id, derived from ADSENSE_ACCOUNT_ID ("accounts/pub-XXXX").
const PUB_ID = (env.ADSENSE_ACCOUNT_ID || '').match(/pub-\d+/)?.[0] ?? null;

// ── the portfolio ────────────────────────────────────────────────────────────
// The ONLY config in this file. `monetized` gates the ads.txt check;
// `client` gates the entity-schema check. Flip AWP to monetized once it
// comes off the deliberate AdSense hold.
const SITES = [
  { domain: 'jsonbeam.com',           label: 'JsonBeam (bet #1)',           monetized: true,  client: false },
  { domain: 'gradejar.com',           label: 'GradeJar (bet #2)',           monetized: true,  client: false },
  { domain: 'accentwallplanner.com',  label: 'AccentWallPlanner (bet #3)',  monetized: false, client: false },
  { domain: 'kesrienterprise.com',    label: 'Kesri Enterprise (client #1)', monetized: false, client: true  },
];

// Classic search crawlers. A `Disallow: /` here is a de-indexing event.
const CLASSIC_BOTS = ['*', 'googlebot', 'bingbot'];
// AI crawlers. Blocking these forfeits AI-search citation — the moat, not the floor.
// See references/ai-search-visibility.md.
const AI_BOTS = ['claudebot', 'gptbot', 'google-extended', 'ccbot', 'meta-externalagent', 'perplexitybot'];

// ── colours ──────────────────────────────────────────────────────────────────
const c = {
  reset: '\x1b[0m', bold: '\x1b[1m', green: '\x1b[32m', cyan: '\x1b[36m',
  yellow: '\x1b[33m', red: '\x1b[31m', dim: '\x1b[2m',
};
const hdr = (s) => `\n${c.bold}${c.cyan}${s}${c.reset}`;
const sub = (s) => `  ${c.dim}${s}${c.reset}`;

// ── fetch with timeout ───────────────────────────────────────────────────────
async function grab(url) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 15000);
  try {
    const res = await fetch(url, {
      signal: ctl.signal,
      redirect: 'follow',
      headers: { 'User-Agent': 'TarunAIOS-verify-live/1.0 (+wire-truth checker)' },
    });
    const body = await res.text();
    return { ok: true, status: res.status, headers: res.headers, body, url: res.url };
  } catch (e) {
    return { ok: false, status: 0, headers: new Headers(), body: '', error: e.name === 'AbortError' ? 'timeout' : e.message };
  } finally { clearTimeout(t); }
}

// ── robots.txt parser ────────────────────────────────────────────────────────
// Builds agent -> rules. Consecutive User-agent lines share one group.
function parseRobots(txt) {
  const groups = new Map();
  let current = [];
  let expectingAgents = true;
  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, '').trim();
    if (!line) continue;
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const field = line.slice(0, colon).trim().toLowerCase();
    const value = line.slice(colon + 1).trim();
    if (field === 'user-agent') {
      if (!expectingAgents) { current = []; expectingAgents = true; }
      const agent = value.toLowerCase();
      current.push(agent);
      if (!groups.has(agent)) groups.set(agent, []);
    } else if (field === 'disallow' || field === 'allow') {
      expectingAgents = false;
      for (const agent of current) groups.get(agent).push({ field, value });
    }
  }
  return groups;
}

// True if this agent is blocked site-wide. Falls back to the `*` group when the
// agent has no group of its own, which is how real crawlers resolve it.
// Simplification: a bare `Disallow: /` counts as blocked even if narrower Allow
// lines exist. That is exactly the shape of the Cloudflare managed block.
function blockedSiteWide(groups, agent) {
  const rules = groups.get(agent) ?? (agent === '*' ? null : groups.get('*'));
  if (!rules) return false;
  return rules.some(r => r.field === 'disallow' && r.value === '/');
}

function jsonLdTypes(html) {
  const types = new Set();
  const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    try {
      const walk = (node) => {
        if (Array.isArray(node)) return node.forEach(walk);
        if (!node || typeof node !== 'object') return;
        const t = node['@type'];
        if (typeof t === 'string') types.add(t);
        if (Array.isArray(t)) t.forEach(x => typeof x === 'string' && types.add(x));
        if (node['@graph']) walk(node['@graph']);
      };
      walk(JSON.parse(m[1].trim()));
    } catch { /* malformed block — reported by the schema check as absent */ }
  }
  return types;
}

// ── the invariants ───────────────────────────────────────────────────────────
async function checkSite(site) {
  const base = `https://${site.domain}`;
  const out = [];
  const add = (level, name, ok, detail) => out.push({ level, name, ok, detail });

  const [home, robots, adstxt] = await Promise.all([
    grab(`${base}/`),
    grab(`${base}/robots.txt`),
    site.monetized ? grab(`${base}/ads.txt`) : Promise.resolve(null),
  ]);

  // The sitemap path is NOT a constant. Astro's @astrojs/sitemap emits
  // sitemap-index.xml; hand-rolled sites use sitemap.xml. robots.txt declares
  // the real one, so trust that first and only probe as a fallback.
  const declared = robots.ok ? robots.body.match(/^\s*sitemap:\s*(\S+)/im)?.[1] : null;
  let sitemap = declared ? await grab(declared) : null;
  let sitemapUrl = declared;
  if (!sitemap || sitemap.status !== 200) {
    for (const p of ['sitemap.xml', 'sitemap-index.xml']) {
      const probe = await grab(`${base}/${p}`);
      if (probe.status === 200) { sitemap = probe; sitemapUrl = `${base}/${p}`; break; }
      sitemap = sitemap ?? probe;
      sitemapUrl = sitemapUrl ?? `${base}/${p}`;
    }
  }

  // 1 — the site is up
  add('P0', 'home responds 200', home.ok && home.status === 200,
    home.ok ? `got ${home.status}` : `request failed: ${home.error}`);

  // 2 — robots.txt is served, and served as text
  const robotsOk = robots.ok && robots.status === 200;
  const ctype = robots.headers.get('content-type') ?? '';
  add('P0', 'robots.txt is 200 + text/plain', robotsOk && ctype.includes('text/plain'),
    robotsOk ? `${robots.status}, content-type: ${ctype || 'none'}` : `request failed: ${robots.error}`);

  if (robotsOk) {
    const groups = parseRobots(robots.body);

    // The Cloudflare managed block is NOT a failure by itself — its default
    // content is `User-agent: * / Allow: /`. It only matters as a pointer to
    // WHERE a block lives (CF dashboard, not the app route), so it is a
    // diagnostic hint on the checks below, never a check of its own.
    const managed = /BEGIN Cloudflare Managed content/i.test(robots.body);
    const where = managed ? ' — source is the Cloudflare managed block, fix in the CF dashboard, not the repo'
                          : ' — source is the app robots route';

    // 3 — classic crawlers can reach the site. This is the de-indexing check.
    const blockedClassic = CLASSIC_BOTS.filter(b => blockedSiteWide(groups, b));
    add('P0', 'classic crawlers not blocked', blockedClassic.length === 0,
      blockedClassic.length ? `Disallow: / applies to ${blockedClassic.join(', ')}${where}`
                            : 'googlebot + bingbot + * all allowed');

    // 4 — the AI-search moat. Not a de-indexing event, so P1 — but it forfeits
    // citation in ChatGPT/Perplexity/AI Overviews. See references/ai-search-visibility.md.
    const blockedAI = AI_BOTS.filter(b => blockedSiteWide(groups, b));
    add('P1', 'AI crawlers not blocked', blockedAI.length === 0,
      blockedAI.length ? `Disallow: / applies to ${blockedAI.join(', ')}${where}`
                       : 'all six allowed');
  }

  // 5 — sitemap is XML, not the SPA shell. The /gsc-onboard "sitemap is HTML" bug.
  const smOk = sitemap?.ok && sitemap.status === 200;
  const smIsXml = smOk && /^\s*(<\?xml|<urlset|<sitemapindex)/i.test(sitemap.body);
  let smDetail;
  if (!smOk) {
    smDetail = `no sitemap at ${sitemapUrl ?? `${base}/sitemap.xml`} (${sitemap?.error || sitemap?.status || 'no response'})`;
  } else if (!smIsXml) {
    smDetail = `${sitemapUrl} returned HTML, not XML — the app shell is answering this route`;
  } else if (/<sitemapindex/i.test(sitemap.body)) {
    // An index lists child sitemaps, not pages. Follow them so the URL count is
    // the real page count and not a misleading "1".
    const children = [...sitemap.body.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map(m => m[1]).slice(0, 5);
    let urls = 0;
    for (const child of children) {
      const r = await grab(child);
      if (r.status === 200) urls += (r.body.match(/<loc>/g) || []).length;
    }
    smDetail = `${sitemapUrl} — ${children.length} child sitemap(s), ${urls} URLs`;
  } else {
    smDetail = `${sitemapUrl} — ${(sitemap.body.match(/<loc>/g) || []).length} URLs`;
  }
  add('P0', 'sitemap is 200 + real XML', !!smIsXml, smDetail);

  // 7 — nothing is telling search engines to go away
  if (home.ok && home.status === 200) {
    const headEnd = home.body.search(/<\/head>/i);
    const head = headEnd === -1 ? home.body.slice(0, 20000) : home.body.slice(0, headEnd);
    const metaNoindex = /<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(head);
    const hdrNoindex = /noindex/i.test(home.headers.get('x-robots-tag') ?? '');
    add('P0', 'no noindex on the homepage', !metaNoindex && !hdrNoindex,
      metaNoindex ? 'meta robots noindex in <head>' : hdrNoindex ? 'X-Robots-Tag: noindex header' : 'clean');
  }

  // 8 — monetized sites must serve a matching ads.txt
  if (site.monetized) {
    const aOk = adstxt.ok && adstxt.status === 200;
    const match = aOk && PUB_ID && new RegExp(`google\\.com,\\s*${PUB_ID}`, 'i').test(adstxt.body);
    add('P0', 'ads.txt served + matches publisher', !!match,
      match ? 'serving, publisher id matches .env'
            : !aOk ? `request failed: ${adstxt.error || adstxt.status}`
            : !PUB_ID ? 'ADSENSE_ACCOUNT_ID missing from .env — cannot verify'
            : 'ads.txt does not list this publisher id');
  }

  // 9 — client sites need an entity for AI search to cite
  if (site.client && home.ok && home.status === 200) {
    const types = jsonLdTypes(home.body);
    const hasEntity = [...types].some(t => /LocalBusiness|Organization|ProfessionalService|Store/i.test(t));
    add('P1', 'entity schema present', hasEntity,
      hasEntity ? `@type: ${[...types].join(', ')}` : 'no LocalBusiness/Organization JSON-LD found');
  }

  return out;
}

// ── run ──────────────────────────────────────────────────────────────────────
const targets = ONLY ? SITES.filter(s => s.domain === ONLY) : SITES;
if (!targets.length) {
  console.error(`No site matching "${ONLY}". Known: ${SITES.map(s => s.domain).join(', ')}`);
  process.exit(2);
}

const results = [];
for (const site of targets) {
  results.push({ site, checks: await checkSite(site) });
}

if (AS_JSON) {
  console.log(JSON.stringify(results.map(r => ({ domain: r.site.domain, checks: r.checks })), null, 2));
  process.exit(results.some(r => r.checks.some(k => !k.ok && k.level === 'P0')) ? 1 : 0);
}

const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
console.log(hdr(`Wire truth — ${stamp} UTC`));
console.log(sub('Production is the source of truth. This script never fixes anything.'));

let p0Fails = 0, p1Fails = 0;
for (const { site, checks } of results) {
  const bad = checks.filter(k => !k.ok);
  const shown = SHOW_ALL ? checks : bad;
  p0Fails += bad.filter(k => k.level === 'P0').length;
  p1Fails += bad.filter(k => k.level === 'P1').length;

  const verdict = bad.some(k => k.level === 'P0') ? `${c.red}FAIL${c.reset}`
                : bad.length ? `${c.yellow}WARN${c.reset}`
                : `${c.green}OK${c.reset}`;
  console.log(`\n${c.bold}${site.domain}${c.reset} ${c.dim}— ${site.label}${c.reset}  [${verdict}]`);
  if (!shown.length) { console.log(sub('all invariants green')); continue; }
  for (const k of shown) {
    const mark = k.ok ? `${c.green}✓${c.reset}` : k.level === 'P0' ? `${c.red}✗${c.reset}` : `${c.yellow}!${c.reset}`;
    console.log(`  ${mark} ${c.dim}[${k.level}]${c.reset} ${k.name}`);
    console.log(`      ${c.dim}${k.detail}${c.reset}`);
  }
}

console.log(hdr('Summary'));
if (p0Fails === 0 && p1Fails === 0) {
  console.log(`  ${c.green}${c.bold}Every invariant green across ${targets.length} site(s).${c.reset}`);
} else {
  console.log(`  ${p0Fails ? c.red : c.dim}${p0Fails} P0 failure(s)${c.reset}  ${p1Fails ? c.yellow : c.dim}${p1Fails} P1 warning(s)${c.reset}`);
}
console.log(sub('Paste-ready stamp for a board or a log entry:'));
console.log(`  Re-verified live ${new Date().toISOString().slice(0, 10)} (verify-live.mjs): ` +
  `${p0Fails} P0, ${p1Fails} P1 across ${targets.length} site(s).`);

process.exit(p0Fails > 0 ? 1 : 0);
