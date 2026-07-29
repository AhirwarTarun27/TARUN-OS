#!/usr/bin/env node
/**
 * ai-margin — the AI SaaS margin gate, as a calculator.
 *
 * Reference: references/ai-saas-economics.md
 * Used by /scout-problem to get a COGS + margin read on an AI SaaS candidate
 * BEFORE it reaches the shortlist, and by /explore-project to derive the plan cap.
 *
 * Usage:
 *   node scripts/ai-margin.mjs
 *   node scripts/ai-margin.mjs --price 49 --stable 6000 --var 2000 --out 800 --heavy 2000
 *
 * Flags (all optional, defaults are the worked example in the reference):
 *   --price     monthly plan price, USD                (29)
 *   --stable    stable/cacheable prompt tokens         (4000)
 *   --var       variable input tokens per action       (1500)
 *   --out       output tokens per action               (1200)
 *   --median    actions/month, median user             (200)
 *   --heavy     actions/month, heavy user (~5x median) (1000)
 *   --mor-pct   payment fee, percent                   (5)
 *   --mor-flat  payment fee, flat per transaction USD  (0.5)
 *   --infra     non-inference infra per account/month  (0.5)
 *   --floor     gross margin floor, percent            (60)
 *   --cached    use cached-prefix pricing              (off; see note below)
 *
 * NOTE ON --cached: below roughly one request per 5 minutes the cache write
 * premium (1.25x) outweighs the read discount, so a pre-launch product should
 * model UNCACHED. Caching is upside, not a scout-time assumption.
 *
 * Prices verified 2026-07-28. Refresh from the provider pricing pages quarterly
 * and update MODELS below.
 */

// [input $/MTok, output $/MTok, cached input $/MTok]
const MODELS = {
  'Opus 5':    [5.0,  25.0, 0.50],
  'Sonnet 5':  [3.0,  15.0, 0.30],
  'Haiku 4.5': [1.0,   5.0, 0.10],
  'Kimi K2.6': [0.95,  4.0, 0.16],
  'Kimi K2.5': [0.60,  3.0, 0.10],
};

const DEFAULTS = {
  price: 29, stable: 4000, var: 1500, out: 1200,
  median: 200, heavy: 1000,
  'mor-pct': 5, 'mor-flat': 0.5, infra: 0.5, floor: 60,
};

function parseArgs(argv) {
  const opts = { ...DEFAULTS, cached: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    if (key === 'cached') { opts.cached = true; continue; }
    if (!(key in DEFAULTS)) {
      console.error(`unknown flag: ${a}`);
      process.exit(1);
    }
    const value = Number(argv[++i]);
    if (!Number.isFinite(value)) {
      console.error(`--${key} needs a number`);
      process.exit(1);
    }
    opts[key] = value;
  }
  return opts;
}

const o = parseArgs(process.argv.slice(2));
const morFee = o.price * (o['mor-pct'] / 100) + o['mor-flat'];
const fixed = morFee + o.infra;
const usd = (n) => '$' + n.toFixed(n < 1 ? 4 : 2);
const pct = (n) => n.toFixed(0) + '%';

// Cost of one action, per model.
const cost = {};
for (const [name, [pin, pout, pcache]] of Object.entries(MODELS)) {
  const uncached = ((o.stable + o.var) * pin + o.out * pout) / 1e6;
  const cached = (o.stable * pcache + o.var * pin + o.out * pout) / 1e6;
  cost[name] = { uncached, cached, use: o.cached ? cached : uncached };
}

const margin = (c, actions) => (o.price - c * actions - fixed) / o.price * 100;

console.log(`\nAI SaaS margin gate  —  reference: references/ai-saas-economics.md`);
console.log(`price ${usd(o.price)}/mo | tokens ${o.stable} stable + ${o.var} var -> ${o.out} out`);
console.log(`payment fee ${usd(morFee)} (${o['mor-pct']}% + ${usd(o['mor-flat'])}) | infra ${usd(o.infra)} | floor ${o.floor}%`);
console.log(`pricing basis: ${o.cached ? 'CACHED prefix' : 'UNCACHED (correct for pre-launch)'}\n`);

const rows = Object.keys(MODELS).map((name) => {
  const c = cost[name];
  const mMed = margin(c.use, o.median);
  const mHeavy = margin(c.use, o.heavy);
  const capActions = Math.floor((o.price * (1 - o.floor / 100) - fixed) / c.use);
  const breakeven = Math.floor((o.price - fixed) / c.use);
  return { name, c, mMed, mHeavy, capActions, breakeven };
});

const pad = (s, n) => String(s).padEnd(n);
const rpad = (s, n) => String(s).padStart(n);

console.log(pad('model', 11) + rpad('uncached', 10) + rpad('cached', 9) + rpad('save', 6)
  + rpad(`med(${o.median})`, 11) + rpad(`heavy(${o.heavy})`, 13) + rpad('cap', 7) + rpad('b/e', 7));
console.log('-'.repeat(74));

for (const r of rows) {
  const save = pct(100 * (1 - r.c.cached / r.c.uncached));
  const verdict = r.mHeavy < o.floor ? '  <- FAILS' : '';
  console.log(
    pad(r.name, 11)
    + rpad(usd(r.c.uncached), 10)
    + rpad(usd(r.c.cached), 9)
    + rpad(save, 6)
    + rpad(pct(r.mMed), 11)
    + rpad(pct(r.mHeavy), 13)
    + rpad(r.capActions, 7)
    + rpad(r.breakeven, 7)
    + verdict
  );
}

const survivors = rows.filter((r) => r.mHeavy >= o.floor);

console.log('\n' + '='.repeat(74));
if (survivors.length === 0) {
  console.log(`VERDICT: NO-GO at ${usd(o.price)}. No model clears the ${o.floor}% floor at ${o.heavy} actions/mo.`);
  console.log('Fix one of: raise the price, cut tokens per action, or meter harder.');
} else {
  const best = survivors[survivors.length - 1];
  const cheapest = survivors[0];
  console.log(`VERDICT: viable at ${usd(o.price)} on ${survivors.map((r) => r.name).join(', ')}.`);
  console.log(`Highest-quality model that clears the floor: ${cheapest.name}.`);
  console.log(`Plan allowance to ship: ${cheapest.capActions} actions/mo on ${cheapest.name}`
    + ` (${best.capActions} on ${best.name}).`);
  console.log('Enforce that cap server-side, before the model call. A cap only on the pricing page is not a cap.');
}
console.log('='.repeat(74) + '\n');
