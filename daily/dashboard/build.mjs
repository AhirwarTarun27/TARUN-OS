#!/usr/bin/env node
/**
 * Momentum Console builder — zero-dep ESM.
 *
 *   node daily/dashboard/build.mjs            rebuild daily/dashboard.html from data/ + template.html
 *   node daily/dashboard/build.mjs --ingest   merge today.json into data/YYYY-MM.json, then rebuild
 *
 * Contract (see .claude/skills/daily-log/SKILL.md + the daily-streak-dashboard memory):
 * - Claude writes today.json and runs this script. It NEVER reads template.html or dashboard.html.
 * - data/YYYY-MM.json files are the source of truth; dashboard.html is generated output.
 * - DATA.today / DATA.month are derived here (latest pending entry, else latest entry) — never hand-set.
 * - Ingesting a scored entry drops stale pendings (date <= scored date) and appends the next
 *   WEEKDAY as a fresh pending (Fri -> Mon). Month files are created automatically at rollover.
 * - Validation failures exit 1 and write NOTHING.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(HERE, 'data');
const TEMPLATE = join(HERE, 'template.html');
const TODAY_JSON = join(HERE, 'today.json');
const META_JSON = join(DATA_DIR, 'meta.json');
const MISSION_JSON = join(HERE, 'mission.json');
const OUT = join(HERE, '..', 'dashboard.html');

// Mission board, locked 2026-08-09. Replaced the standing-routine keys
// ['reading','dsa','machineCoding','sysdesign','workout','project','interviewQa'], which had been
// rejecting every ingest since 2026-07-29 because the schedule changed and this line did not.
// Legacy entries in data/*.json keep their old keys — validation only applies to NEW ingests.
const BLOCK_KEYS = ['cvDefense', 'machineCoding', 'interviewQa', 'backend', 'apply'];
const REASONS = ['avoidance', 'capacity', 'clarity', 'energy', 'disruption', 'other'];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const fail = msg => { console.error('build.mjs: ' + msg); process.exit(1); };
const readJson = p => JSON.parse(readFileSync(p, 'utf8').replace(/^﻿/, ''));

function weekdayOf(dateStr) {
  return DAY_NAMES[new Date(dateStr + 'T12:00:00').getDay()];
}
function nextWeekday(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  do { d.setDate(d.getDate() + 1); } while (d.getDay() === 0 || d.getDay() === 6);
  return d.toISOString().slice(0, 10);
}

function validateEntry(e) {
  if (!e || typeof e !== 'object') fail('entry missing or not an object');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(e.date || '')) fail('entry.date must be YYYY-MM-DD');
  const wd = weekdayOf(e.date);
  if (e.day && e.day !== wd) fail(`entry.day "${e.day}" does not match ${e.date} (${wd})`);
  e.day = wd;
  if (e.pending) {
    if (e.mustShip != null && typeof e.mustShip !== 'string') fail('pending entry.mustShip must be a string');
    return e;
  }
  if (!e.blocks || typeof e.blocks !== 'object') fail('scored entry needs blocks{}');
  for (const k of Object.keys(e.blocks)) if (!BLOCK_KEYS.includes(k)) fail(`unknown block key "${k}"`);
  for (const k of BLOCK_KEYS) e.blocks[k] = !!e.blocks[k];
  if (!Number.isInteger(e.energy) || e.energy < 1 || e.energy > 5) fail('energy must be an integer 1-5');
  if (typeof e.office !== 'boolean') fail('office must be true/false on a scored entry');
  if (typeof e.mustShip !== 'boolean') fail('mustShip must be true/false on a scored entry');
  // The minimum viable day: 1 CV drill + 1 coding rep (either alternation track) + applications.
  // Hitting the floor is a WIN — that is the whole mechanism. Derived unless explicitly set.
  if (e.floor == null) e.floor = !!(e.blocks.cvDefense && (e.blocks.machineCoding || e.blocks.interviewQa) && e.blocks.apply);
  if (typeof e.floor !== 'boolean') fail('floor must be true/false');
  if (e.reasons) {
    for (const [k, v] of Object.entries(e.reasons)) {
      if (!BLOCK_KEYS.includes(k)) fail(`reasons: unknown block "${k}"`);
      if (e.blocks[k]) fail(`reasons: "${k}" is a HIT — reasons are for missed blocks only`);
      if (!REASONS.includes(v)) fail(`reasons.${k}="${v}" not in [${REASONS.join('|')}]`);
    }
  }
  if (e.shipped && !Array.isArray(e.shipped)) fail('shipped must be an array of strings');
  return e;
}

function loadMonths() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  const months = {};
  for (const f of readdirSync(DATA_DIR)) {
    if (/^\d{4}-\d{2}\.json$/.test(f)) months[f.slice(0, 7)] = readJson(join(DATA_DIR, f));
  }
  return months;
}
function saveMonth(months, ym) {
  const m = months[ym];
  m.entries.sort((a, b) => a.date.localeCompare(b.date));
  writeFileSync(join(DATA_DIR, ym + '.json'), JSON.stringify(m, null, 2) + '\n', 'utf8');
}
function upsert(months, entry) {
  const ym = entry.date.slice(0, 7);
  if (!months[ym]) months[ym] = { month: ym, entries: [] };
  const list = months[ym].entries;
  const i = list.findIndex(x => x.date === entry.date);
  if (i >= 0) list[i] = entry; else list.push(entry);
  return ym;
}

function ingest(months) {
  if (!existsSync(TODAY_JSON)) fail('today.json not found — write it first');
  const payload = readJson(TODAY_JSON);
  if (!payload.entry) fail('today.json has no "entry" — nothing to ingest');
  const entry = validateEntry(payload.entry);
  const touched = new Set([upsert(months, entry)]);
  let pendingNote = '';

  if (!entry.pending) {
    // drop stale pendings, then seed the next weekday
    for (const [ym, m] of Object.entries(months)) {
      const before = m.entries.length;
      m.entries = m.entries.filter(x => !(x.pending && x.date <= entry.date));
      if (m.entries.length !== before) touched.add(ym);
    }
    const nd = nextWeekday(entry.date);
    touched.add(upsert(months, { date: nd, day: weekdayOf(nd), pending: true }));
    pendingNote = ` | next pending: ${nd} ${weekdayOf(nd)}`;
  }
  if (typeof payload.weekOutcomes === 'string') {
    writeFileSync(META_JSON, JSON.stringify({ weekOutcomes: payload.weekOutcomes }, null, 2) + '\n', 'utf8');
  }
  for (const ym of touched) saveMonth(months, ym);
  rmSync(TODAY_JSON); // consumed — next ritual Writes a fresh one (no read needed)

  const hits = entry.pending ? null : BLOCK_KEYS.filter(k => entry.blocks[k]).length;
  // A day is a WIN if the floor was met, whatever else happened. That is the point of the floor:
  // an anxious day lands on it instead of on zero, and one bad day stops becoming nine dark ones.
  const win = hits == null ? '' : ` (${hits}/${BLOCK_KEYS.length}${entry.floor ? ', floor MET' : ''} ${entry.floor || hits >= 4 ? 'WIN' : 'loss'})`;
  return `ingested ${entry.date} ${entry.day}${entry.pending ? ' [pending]' : win} -> data/${entry.date.slice(0, 7)}.json${pendingNote}`;
}

function rebuild(months) {
  const entries = Object.values(months).flatMap(m => m.entries).sort((a, b) => a.date.localeCompare(b.date));
  const pendings = entries.filter(e => e.pending);
  const today = pendings.length ? pendings[pendings.length - 1].date
    : entries.length ? entries[entries.length - 1].date
    : new Date().toISOString().slice(0, 10);
  const weekOutcomes = existsSync(META_JSON) ? (readJson(META_JSON).weekOutcomes || '') : '';
  // Mission payload from `node scripts/console.mjs` — countdowns, counters, next action.
  // Optional by design: the dashboard still builds if the console has never been run.
  const mission = existsSync(MISSION_JSON) ? readJson(MISSION_JSON) : null;
  const data = { month: today.slice(0, 7), today, weekOutcomes, entries, mission };

  const tpl = readFileSync(TEMPLATE, 'utf8');
  const START = '/*__DATA_START__*/', END = '/*__DATA_END__*/';
  const a = tpl.indexOf(START), b = tpl.indexOf(END);
  if (a < 0 || b < 0 || b < a) fail('template.html is missing the __DATA_START__/__DATA_END__ markers');
  const html = tpl.slice(0, a + START.length) + ' ' + JSON.stringify(data) + ' ' + tpl.slice(b);
  writeFileSync(OUT, html, 'utf8');
  return `rebuilt dashboard.html (${entries.length} entries)`;
}

const months = loadMonths();
const notes = [];
if (process.argv.includes('--ingest')) notes.push(ingest(months));
notes.push(rebuild(months));
console.log(notes.join(' | '));
