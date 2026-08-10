#!/usr/bin/env node
/**
 * Mission Console — the job-hunt front door. Zero-dep ESM.
 *
 *   node scripts/console.mjs                    print the board
 *   node scripts/console.mjs --date 2026-09-10  pretend it is that date
 *   node scripts/console.mjs --debug-counters   show every parser's file, header and row match
 *   node scripts/console.mjs --json             machine-readable, no board
 *   node scripts/console.mjs --no-write         do not write dashboard/mission.json
 *
 * CONTRACT — read this before changing anything.
 *
 * 1. Track counters are DERIVED from the trackers the skills already maintain. This file never
 *    duplicates that state. mission/state.json holds ONLY the funnel + phases + targets.
 *
 * 2. A parser that cannot find its expected table header reports PARSE FAILED and the counter
 *    renders as "??". It MUST NEVER report 0 for a parse failure. A silent zero is a lie that
 *    looks like progress, and this repo has been burned by exactly that (verify-live v1, 6 false
 *    P0s). Every parser asserts its header first.
 *
 * 3. Targets RE-CUT against days remaining. When behind, the board prints what to CUT. It never
 *    prints a debt. A board that can accuse him is a board he stops opening — that already
 *    happened on 2026-07-26.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
// --root <dir> points the whole console at a fixture tree. Used by the negative tests that prove a
// mangled header reports PARSE FAILED rather than 0. Never needed in normal use.
const rootArg = process.argv.indexOf('--root');
const ROOT = rootArg >= 0 ? process.argv[rootArg + 1] : join(HERE, '..');
const P = {
  state: join(ROOT, 'mission', 'state.json'),
  cv: join(ROOT, 'learning', 'cv-defense', 'progress.md'),
  mc: join(ROOT, 'learning', 'machine-coding', 'queue.md'),
  backend: join(ROOT, 'learning', 'backend', 'drill-board.md'),
  dsa: join(ROOT, 'learning', 'dsa', 'queue.md'),
  iqaLessons: join(ROOT, 'learning', 'interview-qa', 'lessons'),
  iqaRecords: join(ROOT, 'learning', 'interview-qa', 'learning-records'),
  log: join(ROOT, 'daily', 'log.md'),
  week: join(ROOT, 'week.md'),
  dashData: join(ROOT, 'daily', 'dashboard', 'data'),
  missionOut: join(ROOT, 'daily', 'dashboard', 'mission.json'),
};

const DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const fail = m => { console.error('console.mjs: ' + m); process.exit(1); };

/* ------------------------------------------------------------------ dates */
const d = s => new Date(s + 'T12:00:00');
const iso = dt => dt.toISOString().slice(0, 10);
const dayName = s => DAY[d(s).getDay()];
const daysBetween = (a, b) => Math.round((d(b) - d(a)) / 86400000);
/** Working days are Mon-Sat. Sunday is off by design (it holds the weekly review). */
function workDaysBetween(a, b) {
  if (daysBetween(a, b) < 0) return 0;
  let n = 0;
  for (const t = d(a); iso(t) <= b; t.setDate(t.getDate() + 1)) if (t.getDay() !== 0) n++;
  return n;
}

/* ----------------------------------------------------------------- tables */
const readText = p => (existsSync(p) ? readFileSync(p, 'utf8').replace(/^﻿/, '') : null);
const cells = line => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
const isSep = line => /^\|[\s:|-]+\|?\s*$/.test(line.trim());
/** Placeholder rows like `_(empty — nothing yet)_` or all-blank rows are not data. */
const isPlaceholder = r => !r[0] || /^[_*—–-]*\s*\(?\s*(empty|none|n\/a)/i.test(r[0]) || r.every(c => !c || c === '—' || c === '-');
const firstDate = s => (String(s).match(/\d{4}-\d{2}-\d{2}/) || [null])[0];
const firstInt = s => { const m = String(s).match(/-?\d+/); return m ? parseInt(m[0], 10) : null; };

/**
 * Find a markdown table by a header predicate and return its data rows.
 * Returns { ok:false } when the header is absent — the caller must surface that, never zero it.
 */
function table(text, headerTest, label) {
  if (text == null) return { ok: false, error: `file not found (${label})` };
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].trim().startsWith('|')) continue;
    const head = cells(lines[i]);
    if (!headerTest(head)) continue;
    if (!isSep(lines[i + 1] || '')) continue;
    const rows = [];
    for (let j = i + 2; j < lines.length; j++) {
      const l = lines[j];
      if (!l.trim().startsWith('|')) break;
      const r = cells(l);
      if (!isPlaceholder(r)) rows.push(r);
    }
    return { ok: true, header: head, rows, line: i + 1 };
  }
  return { ok: false, error: `header not found (${label})` };
}
const has = (head, ...names) => names.every(n => head.some(h => h.toLowerCase().includes(n)));

/* ---------------------------------------------------------------- parsers */

function parseCv(text) {
  const t = table(text, h => has(h, 'drill', 'status'), 'cv-defense: | # | Drill | Status |');
  if (!t.ok) return t;
  const si = t.header.findIndex(h => h.toLowerCase().includes('status'));
  let closed = 0, inProgress = 0, notStarted = 0, thin = 0;
  for (const r of t.rows) {
    const s = r[si] || '';
    if (s.includes('✅')) closed++;
    else if (s.includes('⏳')) inProgress++;
    else if (s.includes('⚠')) thin++;
    else notStarted++;
  }
  const gap = table(text, h => has(h, 'date', 'punished'), 'cv-defense: Phase 2 gap queue');
  return {
    ok: true, total: t.rows.length, closed, inProgress, notStarted, thin,
    gapRows: gap.ok ? gap.rows.length : null,
    gapError: gap.ok ? null : gap.error,
    where: `${t.rows.length} drill rows @ line ${t.line}`,
  };
}

function parseMachineCoding(text) {
  if (text == null) return { ok: false, error: 'file not found (machine-coding/queue.md)' };
  const phase = (text.match(/Current phase:\s*\*{0,2}(\d+)/) || [])[1] ?? null;
  const active = table(text, h => has(h, 'problem', 'r0'), 'machine-coding: Active (| Problem | ... | R0 |)');
  const grad = table(text, h => has(h, 'problem', 'graduated'), 'machine-coding: Graduated');
  const building = table(text, h => has(h, 'problem', 'attempt-days'), 'machine-coding: Building');
  if (!active.ok) return { ok: false, error: active.error };
  const di = active.header.findIndex(h => h.toLowerCase().includes('next due'));
  const overdue = [], dueToday = [];
  return {
    ok: true, phase,
    banked: active.rows.length + (grad.ok ? grad.rows.length : 0),
    graduated: grad.ok ? grad.rows.length : null,
    building: building.ok ? building.rows.length : null,
    buildingNames: building.ok ? building.rows.map(r => r[0].replace(/\*/g, '')) : [],
    _rows: active.rows, _dueIdx: di, overdue, dueToday,
    where: `${active.rows.length} active @ line ${active.line}`,
  };
}

function parseBackend(text) {
  const t = table(text, h => has(h, 'concept pair'), 'backend: | Concept pair | ... |');
  if (!t.ok) return t;
  const wi = t.header.findIndex(h => h.trim() === 'W');
  const xi = t.header.findIndex(h => h.trim() === 'X');
  const di = t.header.findIndex(h => h.toLowerCase().includes('next due'));
  if (wi < 0 || xi < 0) return { ok: false, error: 'backend: W / X columns not found in header' };
  let mastered = 0;
  for (const r of t.rows) {
    const w = firstInt(r[wi]), x = firstInt(r[xi]);
    if (w !== null && x !== null && w >= 4 && x >= 4) mastered++;
  }
  return { ok: true, total: t.rows.length, mastered, _rows: t.rows, _dueIdx: di, where: `${t.rows.length} rows @ line ${t.line}` };
}

function parseDsa(text) {
  const active = table(text, h => has(h, 'problem', 'd0'), 'dsa: Active');
  const grad = table(text, h => has(h, 'problem', 'graduated'), 'dsa: Graduated');
  const att = table(text, h => has(h, 'problem', 'attempt-days'), 'dsa: Attempting');
  if (!active.ok) return active;
  const di = active.header.findIndex(h => h.toLowerCase().includes('next due'));
  return {
    ok: true, active: active.rows.length, graduated: grad.ok ? grad.rows.length : null,
    attempting: att.ok ? att.rows.length : null,
    _rows: active.rows, _dueIdx: di, where: `${active.rows.length} active @ line ${active.line}`,
  };
}

function parseIqa() {
  const c = p => (existsSync(p) ? readdirSync(p).filter(f => /\.(html|md)$/.test(f)).length : null);
  const lessons = c(P.iqaLessons), records = c(P.iqaRecords);
  if (lessons === null) return { ok: false, error: 'interview-qa/lessons/ not found' };
  // A built course cannot have zero lessons. Zero here means the read is broken, not that there is
  // no progress — and reporting it as 0/0 would be the silent-zero lie this file exists to prevent.
  if (lessons === 0) return { ok: false, error: 'interview-qa/lessons/ is empty — expected lesson files' };
  return { ok: true, lessons, records: records ?? 0, where: `${lessons} lessons, ${records} records (directory count)` };
}

/** Latest `## YYYY-MM-DD` heading in the rolling daily log. */
function parseLog(text) {
  if (text == null) return { ok: false, error: 'daily/log.md not found' };
  const all = [...text.matchAll(/^##\s+(\d{4}-\d{2}-\d{2})/gm)].map(m => m[1]).sort();
  if (!all.length) return { ok: false, error: 'daily/log.md: no `## YYYY-MM-DD` entry headings found' };
  return { ok: true, last: all[all.length - 1], count: all.length };
}

/** Newest ISO date in week.md's header block = when the ritual last touched it. */
function parseWeek(text) {
  if (text == null) return { ok: false, error: 'week.md not found' };
  const head = text.split(/\r?\n/).slice(0, 12).join('\n');
  const ds = [...head.matchAll(/\d{4}-\d{2}-\d{2}/g)].map(m => m[0]).sort();
  if (!ds.length) return { ok: false, error: 'week.md: no ISO date in the first 12 lines' };
  return { ok: true, updated: ds[ds.length - 1] };
}

/** Latest SCORED (non-pending) entry across the dashboard month files. */
function parseDashboard() {
  if (!existsSync(P.dashData)) return { ok: false, error: 'daily/dashboard/data/ not found' };
  let last = null, today = null, all = 0;
  for (const f of readdirSync(P.dashData)) {
    if (!/^\d{4}-\d{2}\.json$/.test(f)) continue;
    let m;
    try { m = JSON.parse(readFileSync(join(P.dashData, f), 'utf8').replace(/^﻿/, '')); }
    catch (e) { return { ok: false, error: `dashboard data/${f} is not valid JSON` }; }
    for (const e of m.entries || []) { all++; if (!e.pending && (!last || e.date > last)) last = e.date; }
  }
  return { ok: true, lastScored: last, entries: all, today };
}

/* --------------------------------------------------------------- overdue */
function ladderDue(parsed, today, tag) {
  const out = { overdue: [], dueToday: [] };
  if (!parsed.ok || !parsed._rows || parsed._dueIdx < 0) return out;
  for (const r of parsed._rows) {
    const due = firstDate(r[parsed._dueIdx]);
    if (!due) continue;
    const name = r[0].replace(/\*/g, '').trim();
    const rung = (String(r[parsed._dueIdx]).match(/\(([^)]+)\)/) || [, ''])[1];
    const item = { name, due, rung, tag, lateBy: daysBetween(due, today) };
    if (due < today) out.overdue.push(item);
    else if (due === today) out.dueToday.push(item);
  }
  out.overdue.sort((a, b) => a.due.localeCompare(b.due));
  return out;
}

/* ---------------------------------------------------------------- re-cut */
function recut(label, done, target, workDays, sustainable) {
  if (done === null || done === undefined) return { label, status: 'unknown' };
  const remaining = Math.max(0, target - done);
  if (remaining === 0) return { label, done, target, remaining: 0, status: 'done' };
  if (workDays <= 0) return { label, done, target, remaining, status: 'window-closed' };
  const pace = remaining / workDays;
  const feasible = pace <= sustainable;
  return {
    label, done, target, remaining, workDays,
    pace: Math.round(pace * 100) / 100, sustainable,
    // What IS reachable at a sustainable pace — this is what the board shows when behind.
    reachable: Math.min(target, done + Math.floor(sustainable * workDays)),
    status: feasible ? 'on-track' : 'cut',
  };
}

/* ------------------------------------------------------------------- main */
const argv = process.argv.slice(2);
const arg = n => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; };
const flag = n => argv.includes(n);

const today = arg('--date') || iso(new Date());
if (!/^\d{4}-\d{2}-\d{2}$/.test(today)) fail('--date must be YYYY-MM-DD');

if (!existsSync(P.state)) fail(`mission/state.json not found at ${P.state}`);
const S = JSON.parse(readFileSync(P.state, 'utf8').replace(/^﻿/, ''));

const cv = parseCv(readText(P.cv));
const mc = parseMachineCoding(readText(P.mc));
const be = parseBackend(readText(P.backend));
const dsa = parseDsa(readText(P.dsa));
const iqa = parseIqa();
const log = parseLog(readText(P.log));
const week = parseWeek(readText(P.week));
const dash = parseDashboard();

const phase = S.phases.find(p => today >= p.start && today <= p.end)
  || (today < S.phases[0].start ? { ...S.phases[0], notStarted: true } : S.phases[S.phases.length - 1]);
const dn = dayName(today);
const isSunday = dn === 'Sun';
const codingTrack = S.alternation[dn];

// Ladders. DSA only counts as actionable in Phase B, but overdue is always shown.
const dueMc = ladderDue(mc, today, 'machine-coding');
const dueBe = ladderDue(be, today, 'backend');
const dueDsa = ladderDue(dsa, today, 'dsa');

// A track the current phase deliberately parked is NOT overdue — it is parked. Showing a 21-day-late
// DSA rung during Phase A would be the board accusing him for following the plan, which is the exact
// failure this design forbids. Parked ladders are reported as one calm line, never in the overdue list.
const parkedTracks = ['machine-coding', 'backend', 'dsa'].filter(t => {
  const key = t === 'machine-coding' ? 'machineCoding' : t;
  return !phase.tracks.includes(key);
});
const isParked = t => parkedTracks.includes(t);
const parked = [...dueMc.overdue, ...dueBe.overdue, ...dueDsa.overdue].filter(o => isParked(o.tag));

const allOverdue = [...dueMc.overdue, ...dueBe.overdue, ...dueDsa.overdue]
  .filter(o => !isParked(o.tag))
  .sort((a, b) => a.due.localeCompare(b.due));
const allDueToday = [...dueMc.dueToday, ...dueBe.dueToday, ...dueDsa.dueToday].filter(o => !isParked(o.tag));

const gateEnd = S.milestones.phaseGate;
const wdGate = workDaysBetween(today, gateEnd);
const wdFloor = workDaysBetween(today, S.milestones.offerFloor);

// Node's window opens when the backend track does (1 Sept, after .NET stops), not today.
const nodeStart = S.phases.find(p => p.tracks.includes('backend')).start;
const nodeWindow = workDaysBetween(today > nodeStart ? today : nodeStart, gateEnd);

const counters = [
  recut('CV drills', cv.ok ? cv.closed : null, S.targets.cvDrills, wdGate, S.sustainablePace.cvDrills),
  recut('MC builds (R0)', mc.ok ? mc.banked : null, S.targets.mcBuilds, wdGate, S.sustainablePace.mcBuilds),
  recut('IQA lessons', iqa.ok ? iqa.records : null, iqa.ok ? iqa.lessons : 0, wdGate, S.sustainablePace.iqaLessons),
  recut('Node concepts', be.ok ? be.mastered : null, S.targets.nodeConcepts, nodeWindow, S.sustainablePace.nodeConcepts),
  recut('Applications', S.applications.length, S.targets.applications, wdGate, 3),
  recut('Interviews sat', S.interviews.length, S.targets.interviews, wdGate, 0.2),
];
// A counter whose track this phase has not opened yet is "starts <date>", never a pace or a verdict.
if (today < nodeStart) counters[3] = { ...counters[3], status: 'not-yet', startsOn: nodeStart };

const stale = [];
const push = (cond, msg) => { if (cond) stale.push(msg); };
if (log.ok) push(daysBetween(log.last, today) >= 2, `daily log DARK ${daysBetween(log.last, today)} days (last ${log.last})`);
else stale.push(`daily log UNREADABLE — ${log.error}`);
if (week.ok) push(daysBetween(week.updated, today) >= 8, `week.md STALE ${daysBetween(week.updated, today)} days (updated ${week.updated})`);
else stale.push(`week.md UNREADABLE — ${week.error}`);
if (dash.ok && dash.lastScored) push(daysBetween(dash.lastScored, today) >= 2, `dashboard not ingested ${daysBetween(dash.lastScored, today)} days (last ${dash.lastScored})`);
else if (!dash.ok) stale.push(`dashboard UNREADABLE — ${dash.error}`);

const parseErrors = [];
const chk = (o, n) => { if (!o.ok) parseErrors.push(`${n}: ${o.error}`); };
chk(cv, 'cv-defense'); chk(mc, 'machine-coding'); chk(be, 'backend');
chk(dsa, 'dsa'); chk(iqa, 'interview-qa');
if (cv.ok && cv.gapError) parseErrors.push(`cv-defense gap queue: ${cv.gapError}`);

/* ---------------------------------------------------- the ONE next action */
function nextAction() {
  if (isSunday) return { do: 'Run /weekly-review. Sunday is off — the board resumes tomorrow.', why: 'Sunday is the only true rest day and it holds the review.' };
  if (allOverdue.length) {
    const o = allOverdue[0];
    return { do: `Clear the overdue ${o.tag} rung: ${o.name} (${o.rung}, ${o.lateBy}d late)`, why: 'Overdue rungs beat everything. A missed revision decays a pattern you half-own.' };
  }
  if (cv.ok && cv.closed < S.targets.cvDrills) {
    const n = cv.inProgress ? 'finish the drill already in progress' : 'start the next drill';
    return { do: `CV defense: ${n}. Say "drill me".`, why: '100% of interviews start here and it is the biggest open gap.' };
  }
  if (mc.ok && mc.building) return { do: `Machine coding: get ${mc.buildingNames[0]} to a working P0. Lab: learning/machine-coding/lab/index.html`, why: 'It is carried at Building and blocks the ladder.' };
  return { do: `${codingTrack === 'interviewQa' ? 'interview-qa lesson' : 'machine-coding: next build'} + 3 applications`, why: "Today's alternation slot, plus the floor." };
}
const action = nextAction();

/* --------------------------------------------------------------- rendering */
const pad = (s, n) => String(s).padEnd(n);
const bar = (n = 74) => '='.repeat(n);
const num = (o, k) => (o.status === 'unknown' ? '??' : o[k]);

function render() {
  const L = [];
  L.push('');
  L.push(bar());
  L.push(`  MISSION CONSOLE   ${today} ${dn}   phase ${phase.notStarted ? phase.id + ' (starts ' + phase.start + ')' : phase.id}`);
  L.push(bar());

  if (parseErrors.length) {
    L.push('');
    L.push('  !! PARSE FAILED — these counters are UNKNOWN, not zero:');
    for (const e of parseErrors) L.push(`     - ${e}`);
  }
  if (stale.length) {
    L.push('');
    L.push('  !! ' + stale.join('\n  !! '));
  }

  L.push('');
  L.push(`  COUNTDOWN   resign ${daysBetween(today, S.milestones.resign)}d` +
    `   phase gate ${daysBetween(today, gateEnd)}d` +
    `   OFFER FLOOR ${daysBetween(today, S.milestones.offerFloor)}d (${wdFloor} working)`);
  L.push(`  WAVE        ${today < S.waves.target.start ? 'SACRIFICIAL — services, recruiters, roles you would decline' : 'TARGET — the 16-26 LPA startups'}`);

  L.push('');
  L.push('  ' + pad('COUNTER', 18) + pad('DONE', 10) + pad('PACE NEEDED', 15) + 'VERDICT');
  L.push('  ' + '-'.repeat(70));
  for (const c of counters) {
    if (c.status === 'unknown') { L.push('  ' + pad(c.label, 18) + pad('??', 10) + pad('-', 15) + 'PARSE FAILED'); continue; }
    const done = `${c.done}/${c.target}`;
    const pace = (c.status === 'done' || c.status === 'not-yet') ? '-' : `${c.pace}/day`;
    const verdict = c.status === 'done' ? 'DONE'
      : c.status === 'not-yet' ? `starts ${c.startsOn}`
      : c.status === 'on-track' ? 'on track'
      : c.status === 'window-closed' ? 'window closed'
      : `CUT to ${c.reachable} at a sustainable ${c.sustainable}/day`;
    L.push('  ' + pad(c.label, 18) + pad(done, 10) + pad(pace, 15) + verdict);
  }

  if (allOverdue.length || allDueToday.length) {
    L.push('');
    L.push('  LADDERS');
    for (const o of allOverdue) L.push(`    ${pad('OVERDUE ' + o.lateBy + 'd', 14)}${pad(o.tag, 16)}${o.name} (${o.rung}, due ${o.due})`);
    for (const o of allDueToday) L.push(`    ${pad('due today', 14)}${pad(o.tag, 16)}${o.name} (${o.rung})`);
  }
  if (parked.length) {
    L.push('');
    L.push('  PARKED      frozen on purpose this phase. NOT late — this is the plan working.');
    for (const t of [...new Set(parked.map(p => p.tag))]) {
      const key = t === 'machine-coding' ? 'machineCoding' : t;
      const resumes = S.phases.find(p => p.start > today && p.tracks.includes(key));
      const n = parked.filter(p => p.tag === t).length;
      L.push(`              ${pad(t, 16)}${n} rung(s)  resumes ${resumes ? `${resumes.start} (phase ${resumes.id})` : 'after an interview punishes you for it'}`);
    }
  }

  L.push('');
  L.push(`  TODAY       ${isSunday ? 'SUNDAY — off. Weekly review only.' : `coding slot = ${codingTrack === 'behind' ? 'whichever track is behind' : codingTrack}`}`);
  L.push(`  FLOOR       ${S.floor.cvDrill} CV drill + ${S.floor.codingRep} coding rep + ${S.floor.applications} applications`);
  L.push('');
  L.push('  >> NEXT: ' + action.do);
  L.push('     why:  ' + action.why);
  L.push('');
  L.push(bar());
  L.push('  plan: mission/plan.md   |   interview scheduled? mission/interview-sprint.md');
  L.push(bar());
  L.push('');
  return L.join('\n');
}

function debugCounters() {
  const rows = [
    ['cv-defense/progress.md', cv, cv.ok ? `closed=${cv.closed} inProgress=${cv.inProgress} notStarted=${cv.notStarted} thin=${cv.thin} total=${cv.total} gapRows=${cv.gapRows}` : cv.error],
    ['machine-coding/queue.md', mc, mc.ok ? `phase=${mc.phase} banked=${mc.banked} graduated=${mc.graduated} building=${mc.building} [${mc.buildingNames.join(', ')}]` : mc.error],
    ['backend/drill-board.md', be, be.ok ? `rows=${be.total} mastered(W>=4,X>=4)=${be.mastered}` : be.error],
    ['dsa/queue.md', dsa, dsa.ok ? `active=${dsa.active} graduated=${dsa.graduated} attempting=${dsa.attempting}` : dsa.error],
    ['interview-qa/', iqa, iqa.ok ? `lessons=${iqa.lessons} records=${iqa.records}` : iqa.error],
    ['daily/log.md', log, log.ok ? `last=${log.last} entries=${log.count}` : log.error],
    ['week.md', week, week.ok ? `updated=${week.updated}` : week.error],
    ['dashboard/data/', dash, dash.ok ? `lastScored=${dash.lastScored} entries=${dash.entries}` : dash.error],
  ];
  console.log('\n  PARSER DEBUG — verify each against the real file before trusting the board\n');
  for (const [file, o, detail] of rows) {
    console.log(`  ${o.ok ? 'OK  ' : 'FAIL'}  ${pad(file, 28)} ${detail}`);
    if (o.ok && o.where) console.log(`        ${o.where}`);
  }
  console.log('');
}

/* ------------------------------------------------------------------ output */
const payload = {
  generatedAt: new Date().toISOString(),
  today, day: dn, phase: phase.id, wave: today < S.waves.target.start ? 'sacrificial' : 'target',
  countdown: {
    resign: daysBetween(today, S.milestones.resign),
    phaseGate: daysBetween(today, gateEnd),
    offerFloor: daysBetween(today, S.milestones.offerFloor),
    offerFloorWorkDays: wdFloor,
  },
  counters, overdue: allOverdue, dueToday: allDueToday,
  stale, parseErrors, action, floor: S.floor,
  codingTrack, funnel: { applications: S.applications.length, interviews: S.interviews.length },
};

if (flag('--debug-counters')) debugCounters();
if (flag('--json')) console.log(JSON.stringify(payload, null, 2));
else if (!flag('--debug-counters')) console.log(render());

if (!flag('--no-write')) writeFileSync(P.missionOut, JSON.stringify(payload, null, 2) + '\n', 'utf8');

// Parse failures are a real condition, not a warning. Exit non-zero so a caller cannot ignore them.
process.exit(parseErrors.length ? 2 : 0);
