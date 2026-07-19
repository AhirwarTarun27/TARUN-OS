// report.mjs — AIOS dashboard: GA4 traffic + AdSense earnings + Bing search for all sites.
// Run: node scripts/report.mjs
// Optional flags: --days=30  (default 7)  |  --realtime
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import crypto from 'node:crypto';

// ── .env loader ──────────────────────────────────────────────────────────────
function loadEnv() {
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
}
const env = loadEnv();
const args = process.argv.slice(2);
const DAYS = parseInt(args.find(a => a.startsWith('--days='))?.split('=')[1] ?? '7', 10);
const REALTIME = args.includes('--realtime');

async function j(res) { try { return await res.json(); } catch { return null; } }

// ── colours ──────────────────────────────────────────────────────────────────
const c = {
  reset: '\x1b[0m',
  bold:  '\x1b[1m',
  green: '\x1b[32m',
  cyan:  '\x1b[36m',
  yellow:'\x1b[33m',
  red:   '\x1b[31m',
  dim:   '\x1b[2m',
};
const hdr = (s) => `\n${c.bold}${c.cyan}${s}${c.reset}`;
const row = (label, val, unit = '') => `  ${c.dim}${label.padEnd(28)}${c.reset}${c.bold}${val}${c.reset}${unit ? ` ${c.dim}${unit}${c.reset}` : ''}`;
const sub = (s) => `  ${c.dim}${s}${c.reset}`;

// ── AdSense auth ─────────────────────────────────────────────────────────────
async function adsenseToken() {
  const r = await j(await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id:     env.ADSENSE_OAUTH_CLIENT_ID,
      client_secret: env.ADSENSE_OAUTH_CLIENT_SECRET,
      refresh_token: env.ADSENSE_REFRESH_TOKEN,
      grant_type:    'refresh_token',
    }),
  }));
  if (!r?.access_token) throw new Error(`AdSense token failed: ${JSON.stringify(r)}`);
  return r.access_token;
}

// ── GA4 service-account auth ─────────────────────────────────────────────────
function b64url(buf) {
  return Buffer.from(buf).toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
async function googleSAToken(scope) {
  const keyPath = resolve(process.cwd(), env.GOOGLE_APPLICATION_CREDENTIALS);
  const sa = JSON.parse(readFileSync(keyPath, 'utf8'));
  const now = Math.floor(Date.now() / 1000);
  const hd  = { alg: 'RS256', typ: 'JWT' };
  const cl  = { iss: sa.client_email, scope,
                aud: sa.token_uri || 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 };
  const si  = `${b64url(JSON.stringify(hd))}.${b64url(JSON.stringify(cl))}`;
  const sgn = crypto.createSign('RSA-SHA256'); sgn.update(si); sgn.end();
  const jwt = `${si}.${b64url(sgn.sign(sa.private_key))}`;
  const r   = await j(await fetch(sa.token_uri || 'https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
  }));
  if (!r?.access_token) throw new Error(`Google SA token failed (${scope}): ${JSON.stringify(r)}`);
  return r.access_token;
}
const ga4Token = () => googleSAToken('https://www.googleapis.com/auth/analytics.readonly');
const gscToken = () => googleSAToken('https://www.googleapis.com/auth/webmasters.readonly');

// ── GA4 report ───────────────────────────────────────────────────────────────
async function ga4Report(token) {
  const prop = env.GA_PROPERTY_ID;
  if (!prop) { console.log(`${c.red}GA4: GA_PROPERTY_ID not set${c.reset}`); return; }
  const base = `https://analyticsdata.googleapis.com/v1beta/${prop}`;
  const H    = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  // summary: users / sessions / views
  const summary = await j(await fetch(`${base}:runReport`, {
    method: 'POST', headers: H,
    body: JSON.stringify({
      dateRanges: [{ startDate: `${DAYS}daysAgo`, endDate: 'today' }],
      metrics: [
        { name: 'activeUsers' }, { name: 'newUsers' }, { name: 'sessions' },
        { name: 'screenPageViews' }, { name: 'engagementRate' }, { name: 'averageSessionDuration' },
      ],
    }),
  }));

  const mv = summary?.rows?.[0]?.metricValues ?? [];
  const [users, newUsers, sessions, views, engRate, avgDur] = mv.map(m => m.value ?? '—');

  console.log(hdr(`Google Analytics 4 — last ${DAYS} days`));
  console.log(row('Active users',           users ?? '—'));
  console.log(row('New users',              newUsers ?? '—'));
  console.log(row('Sessions',               sessions ?? '—'));
  console.log(row('Page views',             views ?? '—'));
  console.log(row('Engagement rate',        engRate ? `${(parseFloat(engRate)*100).toFixed(1)}%` : '—'));
  console.log(row('Avg session duration',   avgDur ? `${parseFloat(avgDur).toFixed(0)}s` : '—'));

  if (summary?.error) {
    console.log(`  ${c.red}Error: ${summary.error.message}${c.reset}`);
    return;
  }

  // top pages
  const pages = await j(await fetch(`${base}:runReport`, {
    method: 'POST', headers: H,
    body: JSON.stringify({
      dateRanges: [{ startDate: `${DAYS}daysAgo`, endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 8,
    }),
  }));

  if (pages?.rows?.length) {
    console.log(`\n  ${c.bold}Top pages${c.reset}`);
    for (const r2 of pages.rows) {
      const path = r2.dimensionValues?.[0]?.value ?? '?';
      const pv   = r2.metricValues?.[0]?.value ?? '0';
      const u    = r2.metricValues?.[1]?.value ?? '0';
      console.log(`  ${c.dim}${path.slice(0, 35).padEnd(36)}${c.reset}${pv.padStart(6)} views  ${u.padStart(5)} users`);
    }
  }

  // acquisition channels
  const acq = await j(await fetch(`${base}:runReport`, {
    method: 'POST', headers: H,
    body: JSON.stringify({
      dateRanges: [{ startDate: `${DAYS}daysAgo`, endDate: 'today' }],
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [{ name: 'sessions' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 6,
    }),
  }));

  if (acq?.rows?.length) {
    console.log(`\n  ${c.bold}Acquisition channels${c.reset}`);
    for (const r2 of acq.rows) {
      const ch = r2.dimensionValues?.[0]?.value ?? '?';
      const s  = r2.metricValues?.[0]?.value ?? '0';
      console.log(`  ${c.dim}${ch.padEnd(28)}${c.reset}${s.padStart(6)} sessions`);
    }
  }

  // top countries
  const geo = await j(await fetch(`${base}:runReport`, {
    method: 'POST', headers: H,
    body: JSON.stringify({
      dateRanges: [{ startDate: `${DAYS}daysAgo`, endDate: 'today' }],
      dimensions: [{ name: 'country' }],
      metrics: [{ name: 'activeUsers' }],
      orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
      limit: 5,
    }),
  }));

  if (geo?.rows?.length) {
    console.log(`\n  ${c.bold}Top countries${c.reset}`);
    for (const r2 of geo.rows) {
      const ctry = r2.dimensionValues?.[0]?.value ?? '?';
      const u    = r2.metricValues?.[0]?.value ?? '0';
      console.log(`  ${c.dim}${ctry.padEnd(28)}${c.reset}${u.padStart(6)} users`);
    }
  }

  // realtime
  if (REALTIME) {
    const rt = await j(await fetch(`${base}:runRealtimeReport`, {
      method: 'POST', headers: H,
      body: JSON.stringify({ metrics: [{ name: 'activeUsers' }] }),
    }));
    const live = rt?.rows?.[0]?.metricValues?.[0]?.value ?? '0';
    console.log(`\n  ${c.bold}Right now:${c.reset} ${c.green}${live} active users${c.reset}`);
  }
}

// ── Cloudflare Web Analytics (zone-level, for sites without a GA4 property) ──
async function cfGraphQL(query, variables) {
  return j(await fetch('https://api.cloudflare.com/client/v4/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  }));
}

async function cfReport(label, zoneId) {
  if (!zoneId) return;
  console.log(hdr(`Cloudflare Web Analytics — ${label} — last ${DAYS} days`));
  console.log(sub('Edge-log traffic (includes bots/crawlers) — not JS-beacon like GA4'));

  const now = new Date();
  const since = new Date(now.getTime() - DAYS * 86400000);

  // daily summary, summed over the range
  const daily = await cfGraphQL(`
    query ($zoneTag: string!, $since: string!, $until: string!) {
      viewer {
        zones(filter: { zoneTag: $zoneTag }) {
          httpRequests1dGroups(
            limit: 31
            filter: { date_geq: $since, date_leq: $until }
          ) {
            sum { requests, pageViews, threats }
            uniq { uniques }
          }
        }
      }
    }`, {
    zoneTag: zoneId,
    since: since.toISOString().slice(0, 10),
    until: now.toISOString().slice(0, 10),
  });

  const rows = daily?.data?.viewer?.zones?.[0]?.httpRequests1dGroups ?? [];
  if (daily?.errors) {
    console.log(`  ${c.red}Error: ${daily.errors[0]?.message}${c.reset}`);
    return;
  }
  const totalPV   = rows.reduce((s, r) => s + (r.sum?.pageViews ?? 0), 0);
  const totalReq  = rows.reduce((s, r) => s + (r.sum?.requests ?? 0), 0);
  const totalThr  = rows.reduce((s, r) => s + (r.sum?.threats ?? 0), 0);
  const avgUniq   = rows.length ? Math.round(rows.reduce((s, r) => s + (r.uniq?.uniques ?? 0), 0) / rows.length) : 0;

  console.log(row('Page views',        totalPV));
  console.log(row('Total requests',    totalReq));
  console.log(row('Daily avg uniques', avgUniq));
  if (totalThr) console.log(row('Threats blocked', totalThr));

  // top pages + countries: adaptive groups capped at a 1-day window on free plans
  const breakdown = await cfGraphQL(`
    query ($zoneTag: string!, $since: Time!, $until: Time!) {
      viewer {
        zones(filter: { zoneTag: $zoneTag }) {
          topPaths: httpRequestsAdaptiveGroups(
            limit: 8
            filter: { datetime_geq: $since, datetime_leq: $until, clientRequestPath_like: "%/" }
            orderBy: [count_DESC]
          ) { count, dimensions { clientRequestPath } }
          topCountries: httpRequestsAdaptiveGroups(
            limit: 5
            filter: { datetime_geq: $since, datetime_leq: $until, clientRequestPath_like: "%/" }
            orderBy: [count_DESC]
          ) { count, dimensions { clientCountryName } }
        }
      }
    }`, {
    zoneTag: zoneId,
    since: new Date(now.getTime() - 86400000).toISOString(),
    until: now.toISOString(),
  });

  const zone = breakdown?.data?.viewer?.zones?.[0];
  if (zone?.topPaths?.length) {
    console.log(`\n  ${c.bold}Top pages (last 24h)${c.reset}`);
    for (const p of zone.topPaths) {
      console.log(`  ${c.dim}${(p.dimensions?.clientRequestPath ?? '?').slice(0, 35).padEnd(36)}${c.reset}${String(p.count).padStart(6)} hits`);
    }
  }
  if (zone?.topCountries?.length) {
    console.log(`\n  ${c.bold}Top countries (last 24h)${c.reset}`);
    for (const ct of zone.topCountries) {
      console.log(`  ${c.dim}${(ct.dimensions?.clientCountryName ?? '?').padEnd(28)}${c.reset}${String(ct.count).padStart(6)} hits`);
    }
  }
}

// ── Bing Webmaster Tools (search traffic + indexing, per verified site) ──────
// API key auth (?apikey=), one key per user covers all sites. See references/bing-webmaster-api.md.
async function bingGet(method, siteUrl) {
  const url = `https://ssl.bing.com/webmaster/api.svc/json/${method}`
    + `?siteUrl=${encodeURIComponent(siteUrl)}&apikey=${env.BING_WEBMASTER_API_KEY}`;
  return j(await fetch(url));
}

async function bingReport(label, siteUrl) {
  if (!env.BING_WEBMASTER_API_KEY) {
    console.log(hdr(`Bing Webmaster — ${label}`));
    console.log(`  ${c.yellow}Not configured — add BING_WEBMASTER_API_KEY to .env${c.reset}`);
    console.log(sub('Generate: Bing Webmaster Tools → Settings → API Access → Generate API Key'));
    return;
  }
  if (!siteUrl) return;

  console.log(hdr(`Bing Webmaster — ${label} — last ${DAYS} days`));
  const since = Date.now() - DAYS * 86400000;

  // clicks + impressions (full history; filter to window and sum). Date is "/Date(ms-offset)/".
  const traffic = await bingGet('GetRankAndTrafficStats', siteUrl);
  if (traffic?.Message || traffic?.ErrorCode !== undefined) {
    console.log(`  ${c.red}Error: ${traffic.Message ?? 'ErrorCode ' + traffic.ErrorCode}${c.reset}`);
    return;
  }
  const days = (traffic?.d ?? []).filter(r => {
    const ms = Number(String(r.Date ?? '').match(/\/Date\((\d+)/)?.[1]);
    return Number.isFinite(ms) && ms >= since;
  });
  const clicks = days.reduce((s, r) => s + (r.Clicks ?? 0), 0);
  const impr   = days.reduce((s, r) => s + (r.Impressions ?? 0), 0);
  console.log(row('Clicks', clicks));
  console.log(row('Impressions', impr));
  if (clicks === 0 && impr === 0) {
    const seen = (traffic?.d ?? []).length;
    console.log(sub(seen
      ? 'Connected — no Bing search activity in this window yet (normal for a newly indexed site)'
      : 'Connected — Bing has no traffic rows for this site yet (still crawling; give it days–weeks)'));
  }

  // URL submission quota (relevant right after submitting the money pages)
  const quota = await bingGet('GetUrlSubmissionQuota', siteUrl);
  if (quota?.d) {
    console.log(row('Submit quota left', `${quota.d.DailyQuota ?? '—'}/day`, `· ${quota.d.MonthlyQuota ?? '—'}/mo`));
  }

  // top search queries
  const q = await bingGet('GetQueryStats', siteUrl);
  const queries = (q?.d ?? []).sort((a, b) => (b.Clicks ?? 0) - (a.Clicks ?? 0)).slice(0, 8);
  if (queries.length) {
    console.log(`\n  ${c.bold}Top Bing queries${c.reset}`);
    for (const r2 of queries) {
      const pos = r2.AvgImpressionPosition ?? r2.AvgClickPosition;
      console.log(`  ${c.dim}${String(r2.Query ?? '?').slice(0, 30).padEnd(31)}${c.reset}`
        + `${String(r2.Clicks ?? 0).padStart(4)} clk  ${String(r2.Impressions ?? 0).padStart(6)} impr`
        + `${pos != null ? `  pos ${parseFloat(pos).toFixed(1)}` : ''}`);
    }
  }
}

// ── Google Search Console (organic query data, ~2-3 day reporting lag) ───────
async function gscReport(label, siteUrl, token) {
  if (!siteUrl) {
    console.log(hdr(`Google Search Console — ${label}`));
    console.log(`  ${c.yellow}Not configured — add GSC_SITE_URL_${label.toUpperCase()} to .env${c.reset}`);
    return;
  }
  const iso = (d) => d.toISOString().slice(0, 10);
  const end   = new Date(Date.now() - 3 * 86400000); // GSC data lags ~2-3 days
  const start = new Date(end.getTime() - DAYS * 86400000);
  const base  = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
  const H     = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  console.log(hdr(`Google Search Console — ${label} — last ${DAYS} days (as of ~3d ago)`));

  const totals = await j(await fetch(base, {
    method: 'POST', headers: H,
    body: JSON.stringify({ startDate: iso(start), endDate: iso(end) }),
  }));
  if (totals?.error) {
    console.log(`  ${c.red}Error: ${totals.error.message}${c.reset}`);
    return;
  }
  const t = totals?.rows?.[0];
  if (t) {
    console.log(row('Clicks', t.clicks ?? 0));
    console.log(row('Impressions', t.impressions ?? 0));
    console.log(row('Avg CTR', `${((t.ctr ?? 0) * 100).toFixed(2)}%`));
    console.log(row('Avg position', (t.position ?? 0).toFixed(1)));
  } else {
    console.log(sub('No search data yet for this window (normal for a newly indexed site)'));
  }

  const queries = await j(await fetch(base, {
    method: 'POST', headers: H,
    body: JSON.stringify({ startDate: iso(start), endDate: iso(end), dimensions: ['query'], rowLimit: 8 }),
  }));
  if (queries?.rows?.length) {
    console.log(`\n  ${c.bold}Top Google queries${c.reset}`);
    for (const r2 of queries.rows) {
      const qy = r2.keys?.[0] ?? '?';
      console.log(`  ${c.dim}${qy.slice(0, 30).padEnd(31)}${c.reset}`
        + `${String(r2.clicks ?? 0).padStart(4)} clk  ${String(r2.impressions ?? 0).padStart(6)} impr`
        + `  pos ${(r2.position ?? 0).toFixed(1)}`);
    }
  }
}

// ── AdSense report ────────────────────────────────────────────────────────────
async function adsenseReport(token) {
  const acct = env.ADSENSE_ACCOUNT_ID;
  if (!acct) { console.log(`${c.red}AdSense: ADSENSE_ACCOUNT_ID not set${c.reset}`); return; }
  const H = { Authorization: `Bearer ${token}` };

  const dateRange = DAYS === 7 ? 'LAST_7_DAYS' : DAYS === 30 ? 'LAST_30_DAYS' : 'LAST_7_DAYS';

  // overall earnings
  const overall = await j(await fetch(
    `https://adsense.googleapis.com/v2/${acct}/reports:generate` +
    `?dateRange=${dateRange}` +
    `&metrics=ESTIMATED_EARNINGS&metrics=PAGE_VIEWS&metrics=IMPRESSIONS` +
    `&metrics=CLICKS&metrics=AD_REQUESTS_RPM&metrics=IMPRESSIONS_CTR`,
    { headers: H }
  ));

  console.log(hdr(`Google AdSense — last ${DAYS} days`));

  if (overall?.error) {
    console.log(`  ${c.red}Error: ${overall.error.message}${c.reset}`);
  } else {
    const cells = overall?.totals?.cells ?? [];
    const [earnings, pageViews, impressions, clicks, rpm, ctr] = cells.map(c2 => c2.value ?? '—');
    const cur = overall?.headers?.find(h2 => h2.name === 'ESTIMATED_EARNINGS')?.currencyCode
             ?? overall?.currencyCode ?? 'USD';
    console.log(row('Estimated earnings',  earnings !== undefined ? `${earnings} ${cur}` : '$0.00'));
    console.log(row('Page views',          pageViews  ?? '—'));
    console.log(row('Impressions',         impressions ?? '—'));
    console.log(row('Clicks',              clicks ?? '—'));
    console.log(row('Page RPM',            rpm ? `$${parseFloat(rpm).toFixed(2)}` : '—'));
    console.log(row('CTR',                 ctr ? `${(parseFloat(ctr)*100).toFixed(2)}%` : '—'));
  }

  // by site
  const bySite = await j(await fetch(
    `https://adsense.googleapis.com/v2/${acct}/reports:generate` +
    `?dateRange=${dateRange}` +
    `&metrics=ESTIMATED_EARNINGS&metrics=PAGE_VIEWS&metrics=AD_REQUESTS_RPM` +
    `&dimensions=DOMAIN_NAME&orderBy=-ESTIMATED_EARNINGS`,
    { headers: H }
  ));

  if (bySite?.rows?.length) {
    console.log(`\n  ${c.bold}Earnings by site${c.reset}`);
    for (const r2 of bySite.rows) {
      const domain   = r2.cells?.[0]?.value ?? '?';
      const earn     = r2.cells?.[1]?.value ?? '0';
      const pv       = r2.cells?.[2]?.value ?? '0';
      const rpm      = r2.cells?.[3]?.value ?? '0';
      console.log(`  ${c.dim}${domain.padEnd(28)}${c.reset}$${parseFloat(earn).toFixed(2).padStart(7)}  ${pv.padStart(7)} views  RPM $${parseFloat(rpm).toFixed(2)}`);
    }
  } else {
    console.log(sub('No per-site breakdown yet (normal if no approved sites or $0 period)'));
  }

  // sites approval status
  const sites = await j(await fetch(`https://adsense.googleapis.com/v2/${acct}/sites`, { headers: H }));
  if (sites?.sites?.length) {
    console.log(`\n  ${c.bold}Site approval status${c.reset}`);
    for (const s of sites.sites) {
      const state = s.state ?? 'UNKNOWN';
      const col   = state === 'READY' ? c.green : state === 'GETTING_READY' ? c.yellow : c.red;
      console.log(`  ${c.dim}${(s.domain ?? s.name ?? '?').padEnd(28)}${c.reset}${col}${state}${c.reset}`);
    }
  }

  // month-to-date
  const mtd = await j(await fetch(
    `https://adsense.googleapis.com/v2/${acct}/reports:generate` +
    `?dateRange=MONTH_TO_DATE&metrics=ESTIMATED_EARNINGS`,
    { headers: H }
  ));
  const mtdEarn = mtd?.totals?.cells?.[0]?.value;
  if (mtdEarn !== undefined) {
    console.log(`\n  ${c.bold}Month-to-date earnings:${c.reset} ${c.green}$${parseFloat(mtdEarn).toFixed(2)}${c.reset}`);
  }
}

// ── main ─────────────────────────────────────────────────────────────────────
console.log(`\n${c.bold}${c.cyan}═══ AIOS Dashboard ═══${c.reset}  ${c.dim}${new Date().toLocaleString()}${c.reset}`);
if (REALTIME) console.log(`${c.dim}Realtime mode on${c.reset}`);

// Every site is discovered from .env rather than hard-coded, so a domain that
// /gsc-onboard adds shows up here on the next run with no code change. The label
// is derived from the var suffix: GSC_SITE_URL_ACCENTWALLPLANNER → Accentwallplanner.
function sitesFrom(prefix) {
  return Object.keys(env)
    .filter(k => k.startsWith(prefix) && env[k])
    .map(k => {
      const slug = k.slice(prefix.length);
      return { label: slug.charAt(0) + slug.slice(1).toLowerCase(), value: env[k] };
    })
    .sort((a, b) => a.label.localeCompare(b.label));
}

try {
  const [gaToken, asToken, gscTok] = await Promise.all([ga4Token(), adsenseToken(), gscToken()]);
  await ga4Report(gaToken);
  for (const s of sitesFrom('CLOUDFLARE_ZONE_ID_')) await cfReport(s.label, s.value);
  await adsenseReport(asToken);
  for (const s of sitesFrom('GSC_SITE_URL_'))  await gscReport(s.label, s.value, gscTok);
  for (const s of sitesFrom('BING_SITE_URL_')) await bingReport(s.label, s.value);
} catch (e) {
  console.error(`\n${c.red}Fatal: ${e.message}${c.reset}`);
  process.exit(1);
}

console.log(`\n${c.dim}── run with --days=30 for monthly view · --realtime for live users ──${c.reset}\n`);
