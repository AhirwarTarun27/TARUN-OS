// verify-connections.mjs — smoke-tests Cloudflare, Google AdSense, GA4, and Bing using .env.
// Reads .env from repo root, hits each API read-only, prints PASS/FAIL. Prints NO secrets.
// Run:  node scripts/verify-connections.mjs
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import crypto from 'node:crypto';

// ---- tiny .env loader (no deps) -------------------------------------------
function loadEnv() {
  const txt = readFileSync(resolve(process.cwd(), '.env'), 'utf8');
  const env = {};
  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1);
    val = val.replace(/\s+#.*$/, '').trim(); // strip inline comments
    env[key] = val;
  }
  return env;
}
const env = loadEnv();
const ok = (s) => `\x1b[32m[OK] ${s}\x1b[0m`;
const fail = (s) => `\x1b[31m[!!] ${s}\x1b[0m`;
const skip = (s) => `\x1b[33m[--] ${s}\x1b[0m`;
const results = [];

async function json(res) { try { return await res.json(); } catch { return null; } }

// ---- 1. Cloudflare ---------------------------------------------------------
async function checkCloudflare() {
  const tok = env.CLOUDFLARE_API_TOKEN;
  const acct = env.CLOUDFLARE_ACCOUNT_ID;
  if (!tok) { console.log(fail('Cloudflare: CLOUDFLARE_API_TOKEN missing')); results.push(['Cloudflare', false]); return; }
  const H = { Authorization: `Bearer ${tok}` };
  const base = 'https://api.cloudflare.com/client/v4';
  let pass = true;
  // token verify
  const v = await json(await fetch(`${base}/user/tokens/verify`, { headers: H }));
  if (v?.success && v.result?.status === 'active') console.log(ok('Cloudflare token: active'));
  else { console.log(fail(`Cloudflare token verify failed: ${JSON.stringify(v?.errors || v)}`)); pass = false; }
  // list zones
  const z = await json(await fetch(`${base}/zones?per_page=50`, { headers: H }));
  if (z?.success) {
    const names = (z.result || []).map((r) => `${r.name} (${r.id.slice(0, 6)}…)`);
    console.log(ok(`Cloudflare zones visible: ${names.length ? names.join(', ') : 'none'}`));
  } else { console.log(fail(`Cloudflare zones list failed: ${JSON.stringify(z?.errors)}`)); pass = false; }
  // Pages projects (needs account id + Pages perm)
  if (acct) {
    const p = await json(await fetch(`${base}/accounts/${acct}/pages/projects`, { headers: H }));
    if (p?.success) console.log(ok(`Cloudflare Pages projects: ${(p.result || []).length} found`));
    else console.log(fail(`Cloudflare Pages list failed (token may lack Pages perm): ${JSON.stringify(p?.errors)}`));
  }
  results.push(['Cloudflare', pass]);
}

// ---- 2. Google AdSense -----------------------------------------------------
async function getAccessTokenFromRefresh() {
  const body = new URLSearchParams({
    client_id: env.ADSENSE_OAUTH_CLIENT_ID,
    client_secret: env.ADSENSE_OAUTH_CLIENT_SECRET,
    refresh_token: env.ADSENSE_REFRESH_TOKEN,
    grant_type: 'refresh_token',
  });
  const r = await json(await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body,
  }));
  return r;
}
async function checkAdSense() {
  if (!env.ADSENSE_REFRESH_TOKEN) { console.log(fail('AdSense: ADSENSE_REFRESH_TOKEN missing')); results.push(['AdSense', false]); return; }
  let pass = true;
  const t = await getAccessTokenFromRefresh();
  if (!t?.access_token) { console.log(fail(`AdSense token refresh failed: ${JSON.stringify(t)}`)); results.push(['AdSense', false]); return; }
  console.log(ok('AdSense access token minted from refresh token'));
  const H = { Authorization: `Bearer ${t.access_token}` };
  // list accounts
  const a = await json(await fetch('https://adsense.googleapis.com/v2/accounts', { headers: H }));
  if (a?.accounts) {
    const names = a.accounts.map((x) => x.name);
    console.log(ok(`AdSense accounts: ${names.join(', ')}`));
    if (env.ADSENSE_ACCOUNT_ID && !names.includes(env.ADSENSE_ACCOUNT_ID))
      console.log(fail(`  ⚠ ADSENSE_ACCOUNT_ID (${env.ADSENSE_ACCOUNT_ID}) not in list above`));
  } else { console.log(fail(`AdSense accounts list failed: ${JSON.stringify(a)}`)); pass = false; }
  // tiny report (may be all zeros for a new/pre-revenue account — that's fine)
  const acct = env.ADSENSE_ACCOUNT_ID;
  if (acct) {
    const url = `https://adsense.googleapis.com/v2/${acct}/reports:generate`
      + `?dateRange=LAST_7_DAYS&metrics=ESTIMATED_EARNINGS&metrics=PAGE_VIEWS&metrics=CLICKS`;
    const rep = await json(await fetch(url, { headers: H }));
    if (rep && !rep.error) {
      const totals = rep.totals?.cells?.map((c) => c.value) ?? [];
      console.log(ok(`AdSense report OK (last 7d earnings/pageviews/clicks): [${totals.join(', ')}] ${rep.currencyCode || ''}`));
    } else {
      console.log(fail(`AdSense report note: ${rep?.error?.message || 'no data'} (often normal pre-revenue)`));
    }
  }
  results.push(['AdSense', pass]);
}

// ---- 3. Google Analytics 4 (service account) -------------------------------
function b64url(buf) {
  return Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
async function getGaAccessToken() {
  const keyPath = resolve(process.cwd(), env.GOOGLE_APPLICATION_CREDENTIALS);
  const sa = JSON.parse(readFileSync(keyPath, 'utf8'));
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claim = {
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    aud: sa.token_uri || 'https://oauth2.googleapis.com/token',
    iat: now, exp: now + 3600,
  };
  const signingInput = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(claim))}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signingInput); signer.end();
  const jwt = `${signingInput}.${b64url(signer.sign(sa.private_key))}`;
  const body = new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt });
  const r = await json(await fetch(sa.token_uri || 'https://oauth2.googleapis.com/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body,
  }));
  return { token: r?.access_token, saEmail: sa.client_email, err: r };
}
async function checkGA4() {
  if (!env.GA_PROPERTY_ID) { console.log(fail('GA4: GA_PROPERTY_ID missing')); results.push(['GA4', false]); return; }
  let pass = true;
  const { token, saEmail, err } = await getGaAccessToken();
  if (!token) { console.log(fail(`GA4 service-account auth failed: ${JSON.stringify(err)}`)); results.push(['GA4', false]); return; }
  console.log(ok(`GA4 access token minted for ${saEmail}`));
  const url = `https://analyticsdata.googleapis.com/v1beta/${env.GA_PROPERTY_ID}:runReport`;
  const rep = await json(await fetch(url, {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      metrics: [{ name: 'activeUsers' }, { name: 'sessions' }, { name: 'screenPageViews' }],
    }),
  }));
  if (rep && !rep.error) {
    const totals = rep.rows?.[0]?.metricValues?.map((m) => m.value) ?? ['0', '0', '0'];
    console.log(ok(`GA4 runReport OK (last 7d users/sessions/views): [${totals.join(', ')}]`));
  } else {
    console.log(fail(`GA4 runReport failed: ${rep?.error?.message || JSON.stringify(rep)}`));
    if (rep?.error?.status === 'PERMISSION_DENIED')
      console.log(`   → Add the service account (${saEmail}) as a Viewer on property ${env.GA_PROPERTY_ID} in GA4 Admin.`);
    pass = false;
  }
  results.push(['GA4', pass]);
}

// ---- 4. Bing Webmaster Tools (API key) -------------------------------------
async function checkBing() {
  if (!env.BING_WEBMASTER_API_KEY) {
    console.log(skip('Bing: BING_WEBMASTER_API_KEY not set yet — generate it in Bing Webmaster Tools → Settings → API Access, then add to .env'));
    results.push(['Bing', 'skip']);
    return;
  }
  const site = env.BING_SITE_URL_GRADEJAR || env.BING_SITE_URL_JSONBEAM;
  if (!site) { console.log(fail('Bing: no BING_SITE_URL_* set')); results.push(['Bing', false]); return; }
  // cheapest per-key call: quota for one verified site
  const url = `https://ssl.bing.com/webmaster/api.svc/json/GetUrlSubmissionQuota`
    + `?siteUrl=${encodeURIComponent(site)}&apikey=${env.BING_WEBMASTER_API_KEY}`;
  const r = await json(await fetch(url));
  if (r?.d && r.ErrorCode === undefined) {
    console.log(ok(`Bing quota OK for ${site} (daily ${r.d.DailyQuota ?? '?'}, monthly ${r.d.MonthlyQuota ?? '?'})`));
    results.push(['Bing', true]);
  } else {
    console.log(fail(`Bing check failed: ${r?.Message || `ErrorCode ${r?.ErrorCode}` || JSON.stringify(r)}`));
    results.push(['Bing', false]);
  }
}

// ---- run -------------------------------------------------------------------
console.log('\n=== Connection check ===\n');
console.log('— Cloudflare —');        await checkCloudflare().catch((e) => { console.log(fail(`Cloudflare threw: ${e.message}`)); results.push(['Cloudflare', false]); });
console.log('\n— Google AdSense —');   await checkAdSense().catch((e) => { console.log(fail(`AdSense threw: ${e.message}`)); results.push(['AdSense', false]); });
console.log('\n— Google Analytics 4 —'); await checkGA4().catch((e) => { console.log(fail(`GA4 threw: ${e.message}`)); results.push(['GA4', false]); });
console.log('\n— Bing Webmaster Tools —'); await checkBing().catch((e) => { console.log(fail(`Bing threw: ${e.message}`)); results.push(['Bing', false]); });

console.log('\n=== Summary ===');
for (const [name, p] of results) console.log(p === 'skip' ? skip(`${name} (not configured yet)`) : p ? ok(name) : fail(name));
const allGood = results.every(([, p]) => p !== false);
console.log(allGood ? '\n\x1b[32mAll connections OK.\x1b[0m\n' : '\n\x1b[33mSome checks need attention (see above).\x1b[0m\n');
process.exit(allGood ? 0 : 1);
