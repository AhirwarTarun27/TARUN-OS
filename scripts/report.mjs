// report.mjs — AIOS dashboard: GA4 traffic + AdSense earnings for all sites.
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
async function ga4Token() {
  const keyPath = resolve(process.cwd(), env.GOOGLE_APPLICATION_CREDENTIALS);
  const sa = JSON.parse(readFileSync(keyPath, 'utf8'));
  const now = Math.floor(Date.now() / 1000);
  const hd  = { alg: 'RS256', typ: 'JWT' };
  const cl  = { iss: sa.client_email, scope: 'https://www.googleapis.com/auth/analytics.readonly',
                aud: sa.token_uri || 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 };
  const si  = `${b64url(JSON.stringify(hd))}.${b64url(JSON.stringify(cl))}`;
  const sgn = crypto.createSign('RSA-SHA256'); sgn.update(si); sgn.end();
  const jwt = `${si}.${b64url(sgn.sign(sa.private_key))}`;
  const r   = await j(await fetch(sa.token_uri || 'https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
  }));
  if (!r?.access_token) throw new Error(`GA4 token failed: ${JSON.stringify(r)}`);
  return r.access_token;
}

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

try {
  const [gaToken, asToken] = await Promise.all([ga4Token(), adsenseToken()]);
  await ga4Report(gaToken);
  await adsenseReport(asToken);
} catch (e) {
  console.error(`\n${c.red}Fatal: ${e.message}${c.reset}`);
  process.exit(1);
}

console.log(`\n${c.dim}── run with --days=30 for monthly view · --realtime for live users ──${c.reset}\n`);
