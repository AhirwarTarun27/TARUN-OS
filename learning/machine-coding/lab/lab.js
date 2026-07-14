/**
 * Machine Coding Lab — the engine.
 *
 * Three things this file exists to enforce, none of which a markdown doc can:
 *   1. The code editor stays LOCKED until a design is submitted.
 *   2. Hidden requirements are revealed only if he asks for them.
 *   3. The clock runs whether he likes it or not.
 *
 * And one thing it exists to capture: HOW he got there. Pauses, snapshots, milestones — the replay
 * data that self-report can never produce. See `profile.md` for what it's for.
 */

const $ = (id) => document.getElementById(id);

const PHASES = ['warmup', 'clarify', 'design', 'code', 'buzzer'];
const PHASE_SECONDS = { warmup: 5 * 60, clarify: 3 * 60, design: 5 * 60 };
const PAUSE_THRESHOLD_MS = 45_000;
const SNAPSHOT_EVERY_MS = 60_000;
const STORE_KEY = 'mc-lab-active';

let problem = null;
let warmup = null;
let session = null;

let phase = null;
let phaseEndsAt = 0;
let paused = false;
let pausedAt = 0;

let files = { jsx: '', css: '' };
let scratch = '';
let activeFile = 'jsx';
let editorLocked = true;

let lastActivity = 0;
let lastSnapshotAt = 0;
let lastSnapshotText = { jsx: null, css: null };
let runtimeErrorSinceRun = false;
let previewRoot = null;
let shadow = null;
let styleEl = null;
let mountEl = null;

const now = () => Date.now();
const t = () => (session ? now() - session.startedAtMs : 0);

/* ── Line diff ────────────────────────────────────────────────────────────
 * Prefix/suffix trim. Typing edits touch a couple of lines, so the stored diff is tiny — which is
 * the point: 30 full copies of the same file is 30x duplication, and session.json is meant to be
 * cheap to keep forever.
 */
function lineDiff(a, b) {
  const A = a.split('\n');
  const B = b.split('\n');
  let s = 0;
  while (s < A.length && s < B.length && A[s] === B[s]) s++;
  let ea = A.length;
  let eb = B.length;
  while (ea > s && eb > s && A[ea - 1] === B[eb - 1]) { ea--; eb--; }
  return { s, del: ea - s, add: B.slice(s, eb) };
}

/* ── Setup ──────────────────────────────────────────────────────────────── */

function initSetup() {
  const ps = $('problem-select');
  window.MC_PROBLEMS.forEach((p) => {
    const o = document.createElement('option');
    o.value = p.slug;
    o.textContent = `${p.order}. ${p.title}  ·  ${p.targetMinutes} min`;
    ps.appendChild(o);
  });

  const ws = $('warmup-select');
  window.MC_WARMUPS.forEach((w) => {
    const o = document.createElement('option');
    o.value = w.slug;
    o.textContent = `${w.title}  ·  ${w.minutes} min`;
    ws.appendChild(o);
  });
  ws.selectedIndex = Math.floor(Math.random() * window.MC_WARMUPS.length);

  const saved = localStorage.getItem(STORE_KEY);
  if (saved) {
    try {
      const s = JSON.parse(saved);
      $('resume-label').textContent = `${s.problemTitle} · ${s.phase}`;
      $('resume-strip').classList.remove('hidden');
    } catch { localStorage.removeItem(STORE_KEY); }
  }

  $('start-btn').onclick = startSession;
  $('resume-btn').onclick = resumeSession;
  $('discard-btn').onclick = () => {
    localStorage.removeItem(STORE_KEY);
    $('resume-strip').classList.add('hidden');
  };
}

function startSession() {
  problem = window.MC_PROBLEMS.find((p) => p.slug === $('problem-select').value);
  warmup = window.MC_WARMUPS.find((w) => w.slug === $('warmup-select').value);

  session = {
    version: 1,
    problemSlug: problem.slug,
    problemTitle: problem.title,
    rung: $('rung-select').value,
    targetMinutes: problem.targetMinutes,
    primitives: problem.primitives,
    warmupSlug: warmup.slug,
    startedAt: new Date().toISOString(),
    startedAtMs: now(),
    phases: {},
    questions: [],
    design: '',
    designReviewRequested: false,
    snapshots: [],
    pauses: [],
    runs: [],
    milestones: {},
    goals: {},
    finalCode: { jsx: '', css: '' },
    finalDom: '',
    report: {}
  };

  files = { jsx: '', css: '' };
  scratch = '';
  editorLocked = true;

  $('setup').classList.add('hidden');
  $('session').classList.remove('hidden');

  paintBrief();
  initEditor();
  initPreview();
  bindSession();
  enterPhase('warmup');
  tick();
  setInterval(tick, 250);
  setInterval(persist, 5000);
}

function resumeSession() {
  const s = JSON.parse(localStorage.getItem(STORE_KEY));
  problem = window.MC_PROBLEMS.find((p) => p.slug === s.problemSlug);
  warmup = window.MC_WARMUPS.find((w) => w.slug === s.warmupSlug);
  session = s;
  session.startedAtMs = now() - (s.elapsedMs || 0);
  files = s.finalCode || { jsx: '', css: '' };
  scratch = s.scratch || '';
  editorLocked = !s.design;

  $('setup').classList.add('hidden');
  $('session').classList.remove('hidden');

  paintBrief();
  initEditor();
  initPreview();
  bindSession();
  if (session.design) $('design-input').value = session.design;
  session.questions.forEach((q) => renderQA(q));
  enterPhase(s.phase || 'code');
  tick();
  setInterval(tick, 250);
  setInterval(persist, 5000);
}

function persist() {
  if (!session || phase === 'buzzer') return;
  session.phase = phase;
  session.elapsedMs = t();
  session.scratch = scratch;
  session.finalCode = { ...files };
  try { localStorage.setItem(STORE_KEY, JSON.stringify(session)); } catch { /* quota — ignore */ }
}

/* ── Brief ──────────────────────────────────────────────────────────────── */

function paintBrief() {
  $('brief-title').textContent = problem.title;
  $('brief-prompt').textContent = problem.prompt;
  $('warmup-spec').textContent = warmup.spec;

  const fill = (id, arr) => {
    const ul = $(id);
    ul.innerHTML = '';
    arr.forEach((x) => {
      const li = document.createElement('li');
      li.textContent = x;
      ul.appendChild(li);
    });
  };
  fill('list-p0', problem.p0);
  fill('list-p1', problem.p1);
  fill('list-p2', problem.p2);
}

/* ── Phase machine ──────────────────────────────────────────────────────── */

function enterPhase(next) {
  if (phase && session.phases[phase]) session.phases[phase].end = t();
  phase = next;
  session.phases[phase] = { start: t() };

  document.querySelectorAll('.pip').forEach((p) => {
    const i = PHASES.indexOf(p.dataset.phase);
    const j = PHASES.indexOf(phase);
    p.classList.toggle('active', i === j);
    p.classList.toggle('done', i < j);
  });

  ['clarify-pane', 'design-pane', 'editor-pane', 'buzzer-pane'].forEach((id) =>
    $(id).classList.add('hidden')
  );
  $('brief-goals').classList.add('hidden');
  $('warmup-brief').classList.add('hidden');
  $('next-btn').classList.remove('hidden');

  const secs = PHASE_SECONDS[phase] ?? problem.targetMinutes * 60;
  phaseEndsAt = now() + secs * 1000;
  $('clock-label').textContent = phase;

  if (phase === 'warmup') {
    $('warmup-brief').classList.remove('hidden');
    $('editor-pane').classList.remove('hidden');
    setLocked(false);
    activeFile = 'jsx';
    setEditorValue(scratch);
  }

  if (phase === 'clarify') {
    $('clarify-pane').classList.remove('hidden');
    $('ask-input').focus();
  }

  if (phase === 'design') {
    $('design-pane').classList.remove('hidden');
    $('design-input').focus();
  }

  if (phase === 'code') {
    // The gate. The editor does not open without a design.
    $('editor-pane').classList.remove('hidden');
    $('brief-goals').classList.remove('hidden');
    setLocked(!session.design);
    activeFile = 'jsx';
    setEditorValue(files.jsx);
    lastActivity = now();
    lastSnapshotAt = now();
    if (!editorLocked) $('editor').focus();
  }

  if (phase === 'buzzer') {
    $('buzzer-pane').classList.remove('hidden');
    $('next-btn').classList.add('hidden');
    closeOutSession();
  }
}

function advance() {
  const i = PHASES.indexOf(phase);
  if (phase === 'design' && !session.design) {
    // Design was never submitted. Bank whatever is in the box rather than let him skip the gate.
    submitDesign(true);
  }
  if (i < PHASES.length - 1) enterPhase(PHASES[i + 1]);
}

function tick() {
  if (!session) return;
  if (paused) return;

  const left = Math.max(0, phaseEndsAt - now());
  const s = Math.ceil(left / 1000);
  const clock = $('clock');
  clock.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  clock.classList.toggle('warn', left < 120_000 && left > 30_000);
  clock.classList.toggle('crit', left <= 30_000);

  if (phase === 'code') {
    maybeSnapshot();
    maybeLogOngoingPause();
  }

  if (left === 0 && phase !== 'buzzer') advance();
}

function setPaused(p) {
  paused = p;
  $('paused-badge').classList.toggle('hidden', !p);
  if (p) {
    pausedAt = now();
  } else {
    phaseEndsAt += now() - pausedAt;
  }
}

/* ── Clarify ────────────────────────────────────────────────────────────── */

function ask(q) {
  const norm = q.toLowerCase();
  const hit = problem.hiddenRequirements.find((r) =>
    r.keywords.some((k) => norm.includes(k))
  );
  const rec = {
    t: t(),
    q,
    matched: !!hit,
    answer: hit ? hit.answer : "Not something I've thought about. Make a call and state your assumption.",
    reqIndex: hit ? problem.hiddenRequirements.indexOf(hit) : -1
  };
  session.questions.push(rec);
  renderQA(rec);
  revealAsked();
}

function renderQA(rec) {
  const el = document.createElement('div');
  el.className = 'qa' + (rec.matched ? '' : ' miss');
  const q = document.createElement('div');
  q.className = 'q';
  q.textContent = rec.q;
  const a = document.createElement('div');
  a.className = 'a';
  a.textContent = rec.answer;
  el.append(q, a);
  $('ask-log').prepend(el);
}

/** Only what he actually asked about lands in the brief. That's the whole mechanic. */
function revealAsked() {
  const got = session.questions.filter((q) => q.matched);
  if (!got.length) return;
  const ul = $('reqs-list');
  ul.innerHTML = '';
  const seen = new Set();
  got.forEach((q) => {
    if (seen.has(q.reqIndex)) return;
    seen.add(q.reqIndex);
    const li = document.createElement('li');
    li.textContent = q.answer;
    ul.appendChild(li);
  });
  $('brief-reqs').classList.remove('hidden');
}

/* ── Design gate ────────────────────────────────────────────────────────── */

function submitDesign(auto = false) {
  const txt = $('design-input').value.trim();
  if (!txt && !auto) {
    $('design-input').focus();
    return;
  }
  session.design = txt;
  session.milestones.designSubmitted = t();
  // Seed the file with his own plan, as a comment. He codes against the design he committed to.
  if (txt && !files.jsx) {
    files.jsx = txt.split('\n').map((l) => '// ' + l).join('\n') + '\n\n';
  }
  if (phase === 'design') enterPhase('code');
  else setLocked(false);
}

function setLocked(locked) {
  editorLocked = locked;
  $('editor-lock').classList.toggle('hidden', !locked);
  $('editor').disabled = locked;
}

/* ── Editor ─────────────────────────────────────────────────────────────── */

function initEditor() {
  const ed = $('editor');

  ed.addEventListener('input', () => {
    const v = ed.value;
    if (phase === 'warmup') { scratch = v; }
    else if (phase === 'code') {
      files[activeFile] = v;
      recordActivity();
      if (activeFile === 'css' && !session.milestones.cssTouched) {
        session.milestones.cssTouched = t();
        if (!session.goals.p0) $('css-warning').classList.remove('hidden');
      }
    }
    paintGutter();
  });

  // Tab inserts spaces instead of leaving the field. Nothing else is smart. That is deliberate:
  // no autocomplete, no bracket matching, no snippets — cold API recall is muscle #2.
  ed.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const s = ed.selectionStart;
      ed.setRangeText('  ', s, ed.selectionEnd, 'end');
      ed.dispatchEvent(new Event('input'));
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runPreview();
    }
  });

  ed.addEventListener('scroll', () => { $('gutter').scrollTop = ed.scrollTop; });

  document.querySelectorAll('.tab').forEach((btn) => {
    btn.onclick = () => {
      if (phase !== 'code') return;
      document.querySelectorAll('.tab').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeFile = btn.dataset.file;
      setEditorValue(files[activeFile]);
    };
  });

  paintGutter();
}

function setEditorValue(v) {
  $('editor').value = v || '';
  paintGutter();
}

function paintGutter() {
  const n = $('editor').value.split('\n').length;
  let s = '';
  for (let i = 1; i <= n; i++) s += i + '\n';
  $('gutter').textContent = s;
  $('gutter').scrollTop = $('editor').scrollTop;
}

function cursorLine() {
  const ed = $('editor');
  return ed.value.slice(0, ed.selectionStart).split('\n').length;
}

/* ── Instrumentation ────────────────────────────────────────────────────── */

function recordActivity() {
  const gap = now() - lastActivity;
  if (!session.milestones.firstKeystroke) session.milestones.firstKeystroke = t();
  if (gap > PAUSE_THRESHOLD_MS) {
    session.pauses.push({
      t: t() - gap,
      ms: gap,
      line: cursorLine(),
      file: activeFile,
      context: contextAroundCursor()
    });
  }
  lastActivity = now();
}

/** The freeze data. A pause is only useful if I know WHAT he was staring at. */
function contextAroundCursor() {
  const lines = $('editor').value.split('\n');
  const i = cursorLine() - 1;
  return lines.slice(Math.max(0, i - 1), i + 2).join(' ⏎ ').slice(0, 120);
}

function maybeLogOngoingPause() {
  // Catches a freeze that is still happening when the buzzer lands, which the keystroke handler
  // would otherwise never see.
  if (now() - lastActivity > PAUSE_THRESHOLD_MS * 2) {
    const last = session.pauses[session.pauses.length - 1];
    const startedAt = t() - (now() - lastActivity);
    if (last && Math.abs(last.t - startedAt) < 1000) {
      last.ms = now() - lastActivity;
    } else {
      session.pauses.push({
        t: startedAt, ms: now() - lastActivity, line: cursorLine(),
        file: activeFile, context: contextAroundCursor(), ongoing: true
      });
    }
  }
}

function maybeSnapshot() {
  if (now() - lastSnapshotAt < SNAPSHOT_EVERY_MS) return;
  lastSnapshotAt = now();
  ['jsx', 'css'].forEach((f) => {
    const cur = files[f];
    const prev = lastSnapshotText[f];
    if (prev === null) {
      if (!cur) return;
      session.snapshots.push({ t: t(), file: f, full: cur });
    } else if (cur !== prev) {
      session.snapshots.push({ t: t(), file: f, diff: lineDiff(prev, cur) });
    } else {
      return;
    }
    lastSnapshotText[f] = cur;
  });
}

/* ── Preview ────────────────────────────────────────────────────────────── */

function initPreview() {
  const host = $('preview-host');
  shadow = host.attachShadow({ mode: 'open' });
  styleEl = document.createElement('style');
  mountEl = document.createElement('div');
  shadow.append(styleEl, mountEl);
  previewRoot = ReactDOM.createRoot(mountEl);

  window.addEventListener('error', (e) => {
    runtimeErrorSinceRun = true;
    showPreviewError(e.message);
  });
  window.addEventListener('unhandledrejection', (e) => {
    runtimeErrorSinceRun = true;
    showPreviewError(String(e.reason));
  });

  $('run-btn').onclick = runPreview;
}

class ErrorBoundary extends React.Component {
  constructor(p) { super(p); this.state = { err: null }; }
  static getDerivedStateFromError(err) { return { err }; }
  componentDidCatch(err) { runtimeErrorSinceRun = true; showPreviewError(err.message); }
  render() {
    if (this.state.err) return null;
    return this.props.children;
  }
}

function runPreview() {
  const src = phase === 'warmup' ? scratch : files.jsx;
  runtimeErrorSinceRun = false;
  hidePreviewError();
  if (!session.milestones.firstRun) session.milestones.firstRun = t();

  styleEl.textContent = phase === 'warmup' ? '' : files.css;

  try {
    if (problem.mode === 'vanilla' && phase !== 'warmup') {
      previewRoot.render(null);
      mountEl.innerHTML = '<div id="root"></div>';
      const fn = new Function('root', src);
      fn(mountEl.querySelector('#root'));
      finishRun();
      return;
    }

    const out = Babel.transform(src, { presets: ['react'], filename: 'app.jsx' }).code;
    const factory = new Function(
      'React', 'useState', 'useEffect', 'useRef', 'useMemo', 'useCallback', 'useReducer',
      `${out}\n; return typeof App !== 'undefined' ? App : null;`
    );
    const App = factory(
      React, React.useState, React.useEffect, React.useRef,
      React.useMemo, React.useCallback, React.useReducer
    );
    if (!App) throw new Error('No component named `App`. Define `function App() { … }`.');

    previewRoot.render(
      React.createElement(ErrorBoundary, { key: Date.now() }, React.createElement(App))
    );
    finishRun();
  } catch (err) {
    runtimeErrorSinceRun = true;
    showPreviewError(err.message);
    session.runs.push({ t: t(), ok: false, error: err.message });
    $('preview-status').className = 'dot err';
  }
}

function finishRun() {
  // createRoot().render() is async, so success can only be judged a tick later.
  setTimeout(() => {
    const ok = !runtimeErrorSinceRun && mountEl.innerHTML.trim().length > 0;
    session.runs.push({ t: t(), ok });
    $('preview-status').className = 'dot ' + (ok ? 'ok' : 'err');
    if (ok && !session.milestones.firstRender && phase === 'code') {
      session.milestones.firstRender = t();
    }
  }, 60);
}

function showPreviewError(msg) {
  const el = $('preview-error');
  el.textContent = msg;
  el.classList.remove('hidden');
  $('preview-status').className = 'dot err';
}
function hidePreviewError() { $('preview-error').classList.add('hidden'); }

/* ── Buzzer + export ────────────────────────────────────────────────────── */

function closeOutSession() {
  session.finalCode = { ...files };
  session.finalDom = shadow ? mountEl.innerHTML.slice(0, 4000) : '';
  session.endedAt = new Date().toISOString();
  session.elapsedMs = t();

  const askedIdx = new Set(session.questions.filter((q) => q.matched).map((q) => q.reqIndex));
  session.missedRequirements = problem.hiddenRequirements
    .map((r, i) => ({ i, r }))
    .filter(({ i }) => !askedIdx.has(i))
    .map(({ r }) => r.answer);

  if (session.missedRequirements.length) {
    const ul = $('missed-list');
    ul.innerHTML = '';
    session.missedRequirements.forEach((a) => {
      const li = document.createElement('li');
      li.textContent = a;
      ul.appendChild(li);
    });
    $('missed-reqs').classList.remove('hidden');
  }
}

function collectReport() {
  session.report = {
    stuck: $('report-stuck').value.trim(),
    lookups: $('report-lookups').value.trim(),
    rating: $('report-rating').value ? Number($('report-rating').value) : null,
    tag: $('report-tag').value
  };
  session.goals = session.goals || {};
  return session;
}

function exportSession() {
  const s = collectReport();
  const date = s.startedAt.slice(0, 10);
  const blob = new Blob([JSON.stringify(s, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `mc-session-${date}-${s.problemSlug}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  localStorage.removeItem(STORE_KEY);
}

/* ── Wiring ─────────────────────────────────────────────────────────────── */

function bindSession() {
  $('next-btn').onclick = advance;
  $('end-btn').onclick = () => { if (confirm('End the session now?')) enterPhase('buzzer'); };

  $('ask-form').onsubmit = (e) => {
    e.preventDefault();
    const v = $('ask-input').value.trim();
    if (!v) return;
    ask(v);
    $('ask-input').value = '';
  };

  $('design-submit-btn').onclick = () => submitDesign();

  // The one legitimate reason to stop the clock: the Phase 1 design-review round trip. It is a
  // scaffold, so it doesn't have to be realistic. It comes off in week 3.
  $('design-review-btn').onclick = async () => {
    const txt = $('design-input').value.trim();
    if (!txt) return;
    session.designReviewRequested = true;
    setPaused(true);
    const block = `/machine-coding design\n\nProblem: ${problem.title}\nPrompt: ${problem.prompt}\n\nMy design:\n${txt}`;
    try { await navigator.clipboard.writeText(block); } catch { /* clipboard blocked on file:// — fall through */ }
    $('design-review-btn').textContent = 'Copied — paste it to Claude. Click to resume clock.';
    $('design-review-btn').onclick = () => {
      setPaused(false);
      $('design-review-btn').textContent = 'Copy for /machine-coding design (pauses clock)';
      bindSession();
    };
  };

  ['p0', 'p1', 'p2'].forEach((g) => {
    $(`${g}-done`).onchange = (e) => {
      if (e.target.checked) session.goals[g] = t();
      else delete session.goals[g];
      if (g === 'p0' && e.target.checked) $('css-warning').classList.add('hidden');
    };
  });

  $('export-btn').onclick = exportSession;
  $('copy-btn').onclick = async () => {
    const s = collectReport();
    await navigator.clipboard.writeText(JSON.stringify(s, null, 2));
    $('copy-btn').textContent = 'Copied';
  };
}

initSetup();
