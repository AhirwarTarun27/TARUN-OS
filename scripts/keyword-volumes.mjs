#!/usr/bin/env node
/**
 * keyword-volumes.mjs — pull REAL search volumes for a keyword cluster.
 *
 * Closes the demand gate that `/scout-problem` keeps deferring ("confirm with
 * Semrush/Ahrefs") and that has now been skipped on at least one shipped product.
 * Uses Bing Webmaster Tools' keyword-research endpoints, which are already
 * authenticated via BING_WEBMASTER_API_KEY — no paid SEO tool required.
 *
 * WHAT THE NUMBERS ARE (read before quoting them anywhere):
 *   - `Impressions` from Bing's GetKeywordStats is Bing's own OBSERVED impression
 *     count for that exact query, weekly, US/en-US. It is measured, not modelled —
 *     which is a different (often better) kind of evidence than Semrush's estimates.
 *   - It is BING ONLY. To reason about Google you must extrapolate by search share.
 *     Bing's US share sits roughly 7-12%; this script reports a band using x8
 *     (conservative) / x10 (midpoint) / x13 (optimistic) and labels it an ESTIMATE.
 *     Never present the extrapolated figure as measured.
 *
 * Usage:
 *   node scripts/keyword-volumes.mjs "kw one" "kw two" ...
 *   node scripts/keyword-volumes.mjs --file path/to/keywords.txt
 *   node scripts/keyword-volumes.mjs --related "seed keyword"   # discovery mode
 *   node scripts/keyword-volumes.mjs --json ...                 # machine-readable
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const env = Object.fromEntries(
  readFileSync(resolve(ROOT, '.env'), 'utf8')
    .split('\n')
    .filter((l) => l.trim() && !l.trim().startsWith('#'))
    .map((l) => {
      const i = l.indexOf('=');
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')];
    })
);

const KEY = env.BING_WEBMASTER_API_KEY;
if (!KEY) {
  console.error('Missing BING_WEBMASTER_API_KEY in .env');
  console.error('Generate: Bing Webmaster Tools → Settings → API Access → Generate API Key');
  process.exit(1);
}

const BASE = 'https://ssl.bing.com/webmaster/api.svc/json';
// Verified 2026-07-18: country MUST be lowercase `us`, language MUST be `en-US`.
// `country=US` or `language=en` both 400 with "argument out of range".
const LOCALE = 'country=us&language=en-US';

// Bing US search share is roughly 7-12%. These multipliers convert a Bing figure
// into a Google-scale ESTIMATE. Refresh yearly — search share moves.
const MULT = { low: 8, mid: 10, high: 13 };

const c = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  cyan: '\x1b[36m', green: '\x1b[32m', yellow: '\x1b[33m', red: '\x1b[31m',
};

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const relatedIdx = args.indexOf('--related');
const fileIdx = args.indexOf('--file');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(method, params) {
  const url = `${BASE}/${method}?${params}&apikey=${KEY}`;
  const r = await fetch(url);
  const text = await r.text();
  if (!r.ok) {
    let msg = text.slice(0, 200);
    try { msg = JSON.parse(text).Message ?? msg; } catch {}
    throw new Error(`HTTP ${r.status}: ${msg}`);
  }
  return JSON.parse(text);
}

/** Weekly rows → { weeks, weeklyAvg, monthly, peak, peakDate, trend }. */
async function keywordStats(kw) {
  const data = await api('GetKeywordStats', `q=${encodeURIComponent(kw)}&${LOCALE}`);
  const rows = (data?.d ?? [])
    .map((r) => ({
      // "/Date(1769241600000)/" → epoch ms
      date: new Date(Number(/\((\d+)\)/.exec(r.Date)?.[1] ?? 0)),
      impressions: r.Impressions ?? 0,
      broad: r.BroadImpressions ?? 0,
    }))
    .sort((a, b) => a.date - b.date);

  if (!rows.length) return { kw, weeks: 0, weeklyAvg: 0, monthly: 0, broadMonthly: 0, peak: 0, peakDate: null, trend: null };

  const weeklyAvg = rows.reduce((s, r) => s + r.impressions, 0) / rows.length;
  const broadAvg = rows.reduce((s, r) => s + r.broad, 0) / rows.length;
  const peakRow = rows.reduce((m, r) => (r.impressions > m.impressions ? r : m), rows[0]);

  // Trend = second half vs first half, so seasonal products read honestly.
  const mid = Math.floor(rows.length / 2);
  const firstHalf = rows.slice(0, mid).reduce((s, r) => s + r.impressions, 0) / Math.max(mid, 1);
  const secondHalf = rows.slice(mid).reduce((s, r) => s + r.impressions, 0) / Math.max(rows.length - mid, 1);
  const trend = firstHalf > 0 ? (secondHalf - firstHalf) / firstHalf : null;

  return {
    kw,
    weeks: rows.length,
    weeklyAvg,
    monthly: weeklyAvg * (52 / 12),
    broadMonthly: broadAvg * (52 / 12),
    peak: peakRow.impressions,
    peakDate: peakRow.date,
    trend,
    rows,
  };
}

async function related(seed) {
  const data = await api('GetRelatedKeywords', `q=${encodeURIComponent(seed)}&${LOCALE}`);
  return (data?.d ?? []).map((r) => ({
    kw: r.Query ?? r.Keyword ?? '?',
    impressions: r.Impressions ?? r.BroadImpressions ?? 0,
  }));
}

const fmt = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(Math.round(n)));
const pct = (t) => (t === null ? '  —  ' : `${t >= 0 ? '+' : ''}${(t * 100).toFixed(0)}%`);

async function main() {
  // ── discovery mode ────────────────────────────────────────────────────────
  if (relatedIdx !== -1) {
    const seed = args[relatedIdx + 1];
    if (!seed) { console.error('--related needs a seed keyword'); process.exit(1); }
    const list = await related(seed);
    if (asJson) { console.log(JSON.stringify(list, null, 2)); return; }
    console.log(`\n${c.bold}${c.cyan}Related keywords — "${seed}"${c.reset} ${c.dim}(Bing, us/en-US)${c.reset}\n`);
    if (!list.length) { console.log(c.dim + '  none returned' + c.reset); return; }
    for (const r of list) console.log(`  ${String(r.kw).padEnd(46)} ${c.dim}${fmt(r.impressions)}${c.reset}`);
    console.log(`\n${c.dim}Feed the interesting ones back in as positional args to get full stats.${c.reset}`);
    return;
  }

  // ── volume mode ───────────────────────────────────────────────────────────
  let keywords;
  if (fileIdx !== -1) {
    const p = args[fileIdx + 1];
    keywords = readFileSync(resolve(p), 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
  } else {
    keywords = args.filter((a) => !a.startsWith('--'));
  }
  if (!keywords.length) {
    console.error('Give at least one keyword, or --file <path>, or --related <seed>.');
    process.exit(1);
  }

  const results = [];
  for (const kw of keywords) {
    try {
      results.push(await keywordStats(kw));
    } catch (e) {
      results.push({ kw, error: e.message });
    }
    await sleep(250); // be polite to the API
  }

  if (asJson) {
    console.log(JSON.stringify(results.map(({ rows, ...r }) => r), null, 2));
    return;
  }

  results.sort((a, b) => (b.monthly ?? 0) - (a.monthly ?? 0));

  console.log(`\n${c.bold}${c.cyan}Keyword volumes — Bing measured, Google estimated${c.reset}`);
  console.log(`${c.dim}Source: Bing Webmaster GetKeywordStats (us / en-US). Bing figures are OBSERVED.${c.reset}`);
  console.log(`${c.dim}Google column is an ESTIMATE at x${MULT.low}-x${MULT.high} (Bing US share ~7-12%). Do not quote it as measured.${c.reset}\n`);

  const W = Math.min(44, Math.max(...results.map((r) => r.kw.length)) + 2);
  console.log(
    `  ${c.bold}${'keyword'.padEnd(W)}${'bing/mo'.padStart(9)}${'google est/mo'.padStart(16)}${'trend'.padStart(8)}${'wks'.padStart(5)}${c.reset}`
  );
  console.log(`  ${c.dim}${'─'.repeat(W + 38)}${c.reset}`);

  let totalBing = 0;
  for (const r of results) {
    if (r.error) {
      console.log(`  ${r.kw.padEnd(W)}${c.red}${'ERROR'.padStart(9)}${c.reset}  ${c.dim}${r.error.slice(0, 40)}${c.reset}`);
      continue;
    }
    totalBing += r.monthly;
    const gLow = fmt(r.monthly * MULT.low);
    const gHigh = fmt(r.monthly * MULT.high);
    const band = `${gLow}-${gHigh}`;
    const col = r.monthly >= 100 ? c.green : r.monthly >= 25 ? c.yellow : c.dim;
    const tcol = r.trend === null ? c.dim : r.trend > 0.1 ? c.green : r.trend < -0.1 ? c.red : c.dim;
    console.log(
      `  ${r.kw.padEnd(W)}${col}${fmt(r.monthly).padStart(9)}${c.reset}${band.padStart(16)}${tcol}${pct(r.trend).padStart(8)}${c.reset}${c.dim}${String(r.weeks).padStart(5)}${c.reset}`
    );
  }

  console.log(`  ${c.dim}${'─'.repeat(W + 38)}${c.reset}`);
  console.log(
    `  ${c.bold}${'CLUSTER TOTAL'.padEnd(W)}${fmt(totalBing).padStart(9)}${`${fmt(totalBing * MULT.low)}-${fmt(totalBing * MULT.high)}`.padStart(16)}${c.reset}`
  );
  console.log(
    `\n  ${c.bold}Google-scale midpoint (x${MULT.mid}): ~${fmt(totalBing * MULT.mid)}/mo${c.reset} ${c.dim}across this cluster${c.reset}`
  );
  console.log(`\n${c.dim}Caveats: exact-match only (variants are separate rows, so a cluster total${c.reset}`);
  console.log(`${c.dim}double-counts nothing but also misses long-tail you did not list). Seasonal${c.reset}`);
  console.log(`${c.dim}products need the trend column read against their season, not in isolation.${c.reset}\n`);
}

main().catch((e) => { console.error(`${c.red}Failed:${c.reset} ${e.message}`); process.exit(1); });
