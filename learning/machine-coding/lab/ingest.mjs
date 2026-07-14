#!/usr/bin/env node
/**
 * Machine Coding Lab — session ingest.
 *
 *   node learning/machine-coding/lab/ingest.mjs [path-to-session.json]
 *
 * Finds the newest `mc-session-*.json` in ~/Downloads (the browser can't write into the repo — it's
 * sandboxed), unpacks it into `builds/<date>-<slug>/`, advances the ladder in `queue.md`, and deletes
 * the download. Same shape as `daily/dashboard/build.mjs --ingest`.
 *
 * It writes TWO representations on purpose:
 *   - `session.md`  — the ~25-line summary. This is what gets read at review time.
 *   - `session.json` — the raw replay. Almost never read. Kept forever because disk is free.
 *
 * That split is the whole reason this system still costs ~1,600 tokens a session in month six.
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const MC = path.resolve(HERE, '..');
const BUILDS = path.join(MC, 'builds');
const QUEUE = path.join(MC, 'queue.md');

const mmss = (ms) => {
  if (ms == null) return '—';
  const s = Math.round(ms / 1000);
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
};
const addDays = (iso, n) => {
  const d = new Date(iso + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

/* ── Find the session ─────────────────────────────────────────────────── */

function findSession() {
  if (process.argv[2]) return path.resolve(process.argv[2]);
  const dl = path.join(os.homedir(), 'Downloads');
  if (!fs.existsSync(dl)) die(`No Downloads folder at ${dl}. Pass the file path as an argument.`);
  const hits = fs
    .readdirSync(dl)
    .filter((f) => f.startsWith('mc-session-') && f.endsWith('.json'))
    .map((f) => ({ f, p: path.join(dl, f), m: fs.statSync(path.join(dl, f)).mtimeMs }))
    .sort((a, b) => b.m - a.m);
  if (!hits.length) die('No mc-session-*.json in ~/Downloads. Hit "Export session" in the lab first.');
  return hits[0].p;
}

function die(msg) {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

/* ── session.md — the summary I actually read ─────────────────────────── */

function summarize(s) {
  const target = s.targetMinutes * 60_000;
  const codeStart = s.phases?.code?.start ?? 0;
  const used = (s.phases?.code?.end ?? s.elapsedMs) - codeStart;

  const ev = [];
  const at = (t, label, note = '') => ev.push({ t, label, note });

  for (const [name, p] of Object.entries(s.phases || {})) {
    if (p.start != null) at(p.start, name.toUpperCase());
  }
  for (const q of s.questions || []) {
    at(q.t, 'asked', `"${q.q}" ${q.matched ? '✓' : '✗ (not a listed requirement)'}`);
  }
  const m = s.milestones || {};
  if (m.designSubmitted != null) at(m.designSubmitted, 'design submitted', `${(s.design || '').split('\n').length} lines`);
  if (m.firstKeystroke != null) at(m.firstKeystroke, 'first keystroke');
  if (m.firstRun != null) at(m.firstRun, 'first run');
  if (m.firstRender != null) at(m.firstRender, 'FIRST RENDER', '← time-to-first-render');
  if (m.cssTouched != null) {
    const early = s.goals?.p0 == null || m.cssTouched < s.goals.p0;
    at(m.cssTouched, 'css touched', early ? '⚠ BEFORE P0 was green — law #2' : '');
  }
  for (const g of ['p0', 'p1', 'p2']) {
    if (s.goals?.[g] != null) at(s.goals[g], `${g.toUpperCase()} done`);
  }
  for (const p of s.pauses || []) {
    at(p.t, `FREEZE ${mmss(p.ms)}`, `${p.file}:${p.line} — ${p.context || ''}`);
  }
  const fails = (s.runs || []).filter((r) => !r.ok).length;

  ev.sort((a, b) => a.t - b.t);

  const ttfr = m.firstRender != null && codeStart != null ? m.firstRender - codeStart : null;
  const longest = (s.pauses || []).reduce((a, p) => Math.max(a, p.ms), 0);

  const L = [];
  L.push(`# ${s.problemSlug} · ${s.rung} · ${s.startedAt.slice(0, 10)}`);
  L.push('');
  L.push(`**Target** ${mmss(target)} · **used** ${mmss(used)} ${used > target ? '(OVER)' : '(under)'}`);
  L.push(`**Tag** \`${s.report?.tag ?? '—'}\` · **self-rated cold fluency** ${s.report?.rating ?? '—'}/5`);
  L.push(`**Goals** P0 ${s.goals?.p0 != null ? '✓' : '✗'} · P1 ${s.goals?.p1 != null ? '✓' : '✗'} · P2 ${s.goals?.p2 != null ? '✓' : '✗'}`);
  L.push('');
  L.push('## Headline numbers');
  L.push('');
  L.push('| | |');
  L.push('|---|---|');
  L.push(`| Time-to-first-render | ${ttfr != null ? mmss(ttfr) : '**never rendered**'} |`);
  L.push(`| Clarifying questions asked | ${(s.questions || []).length} (${(s.questions || []).filter((q) => q.matched).length} landed) |`);
  L.push(`| Requirements never asked about | ${(s.missedRequirements || []).length} |`);
  L.push(`| Freezes > 45s | ${(s.pauses || []).length} · longest ${mmss(longest)} |`);
  L.push(`| Failed runs | ${fails} |`);
  L.push(`| Design block | ${(s.design || '').trim() ? `${s.design.split('\n').length} lines` : '**none written**'} |`);
  L.push('');
  L.push('## Timeline');
  L.push('');
  L.push('```');
  for (const e of ev) L.push(`${mmss(e.t)}  ${e.label.padEnd(18)} ${e.note}`);
  L.push('```');
  L.push('');

  if ((s.missedRequirements || []).length) {
    L.push('## Never asked about');
    L.push('');
    for (const r of s.missedRequirements) L.push(`- ${r}`);
    L.push('');
  }

  L.push('## Self-report');
  L.push('');
  L.push(`**Stuck on:** ${s.report?.stuck || '—'}`);
  L.push(`**Looked up:** ${s.report?.lookups || '—'}`);
  L.push('');
  return L.join('\n');
}

/* ── queue.md — advance the ladder ────────────────────────────────────── */

/**
 * `r0Tag` is the tag banked at R0 — NOT this session's tag. The rule is "a WATCHED R0 forces R7",
 * because a build he copied is still fresh at R3, so R3 rates high, R7 gets skipped, and by R10 the
 * structure is gone. Reading the current session's tag here would silently disable that trap-door.
 */
function nextDue(s, r0Date, r0Tag) {
  const rating = s.report?.rating ?? 0;
  const tag = s.rung === 'R0' ? (s.report?.tag ?? 'solo') : r0Tag;
  switch (s.rung) {
    case 'R0':
      return { due: addDays(r0Date, 3), rung: 'R3' };
    case 'R3':
      if (tag === 'watched' || rating < 4) return { due: addDays(r0Date, 7), rung: 'R7' };
      return { due: addDays(r0Date, 10), rung: 'R10' };
    case 'R7':
      return { due: addDays(r0Date, 10), rung: 'R10' };
    case 'R10': {
      const target = s.targetMinutes * 60_000;
      const used = (s.phases?.code?.end ?? s.elapsedMs) - (s.phases?.code?.start ?? 0);
      if (rating >= 4 && used <= target) return { due: null, rung: 'GRADUATED' };
      return { due: addDays(new Date().toISOString().slice(0, 10), 5), rung: 'R10 🔁' };
    }
    default:
      return { due: null, rung: '?' };
  }
}

function updateQueue(s) {
  let q = fs.readFileSync(QUEUE, 'utf8');
  const date = s.startedAt.slice(0, 10);
  const rating = s.report?.rating ?? '—';
  const tag = s.report?.tag ?? '—';

  const lines = q.split('\n');
  const idx = lines.findIndex((l) => l.includes('| _(empty — the first row lands'));

  // A stray `|` in his self-report would silently corrupt the table.
  const cell = (v) => String(v ?? '—').replace(/\|/g, '/').replace(/\n/g, ' ');

  if (s.rung === 'R0') {
    const { due, rung } = nextDue(s, date, tag);
    const row = `| ${cell(s.problemTitle)} | ${(s.primitives || []).join(', ') || '—'} | ${date} | \`${tag}\` | R0 | R0:${rating} | ${due} (${rung}) | ${s.targetMinutes} min | ${cell(s.report?.stuck).slice(0, 40)} |`;
    if (idx >= 0) lines[idx] = row;
    else {
      const head = lines.findIndex((l) => l.startsWith('| Problem | Primitives | R0 |'));
      lines.splice(head + 2, 0, row);
    }
  } else {
    const i = lines.findIndex(
      (l) => l.startsWith('| ' + s.problemTitle + ' |') && l.split('|').length > 8
    );
    if (i < 0) {
      console.warn(`  ⚠ no Active row for "${s.problemTitle}" — banked the build, but update queue.md by hand.`);
    } else {
      const c = lines[i].split('|').map((x) => x.trim());
      const r0Date = c[3];
      const r0Tag = c[4].replace(/`/g, '');
      const { due, rung } = nextDue(s, r0Date, r0Tag);
      c[5] = s.rung;
      c[6] = `${c[6] === '—' ? '' : c[6] + ' '}${s.rung}:${rating}`.trim();
      c[7] = due ? `${due} (${rung})` : '**GRADUATED**';
      lines[i] = c.slice(1, -1).map((x) => ` ${x} `).join('|').replace(/^/, '|').replace(/$/, '|');
    }
  }
  fs.writeFileSync(QUEUE, lines.join('\n'));
}

/* ── Run ──────────────────────────────────────────────────────────────── */

const src = findSession();
const s = JSON.parse(fs.readFileSync(src, 'utf8'));
if (!s.problemSlug || !s.startedAt) die(`${path.basename(src)} doesn't look like a lab session.`);

const date = s.startedAt.slice(0, 10);
const dir = path.join(BUILDS, `${date}-${s.problemSlug}`);
fs.mkdirSync(dir, { recursive: true });

fs.writeFileSync(path.join(dir, 'session.md'), summarize(s));
fs.writeFileSync(path.join(dir, 'session.json'), JSON.stringify(s, null, 2));
fs.writeFileSync(path.join(dir, 'app.jsx'), s.finalCode?.jsx || '');
if (s.finalCode?.css) fs.writeFileSync(path.join(dir, 'styles.css'), s.finalCode.css);
fs.writeFileSync(
  path.join(dir, 'DESIGN.md'),
  `# Design — ${s.problemTitle} (${s.rung}, ${date})\n\n` +
    `_Written BEFORE any code. This is the muscle being rebuilt._\n\n` +
    '```\n' + (s.design || '(none written)') + '\n```\n'
);

updateQueue(s);

if (!process.argv[2]) fs.unlinkSync(src);

const ttfr = s.milestones?.firstRender != null
  ? mmss(s.milestones.firstRender - (s.phases?.code?.start ?? 0))
  : 'never rendered';

console.log(
  `✓ ${s.problemTitle} ${s.rung} → builds/${date}-${s.problemSlug}/ · ` +
    `P0 ${s.goals?.p0 != null ? '✓' : '✗'} · first render ${ttfr} · ` +
    `${(s.pauses || []).length} freeze(s) · ${(s.questions || []).length} question(s) asked`
);
console.log('  Next: /machine-coding review');
