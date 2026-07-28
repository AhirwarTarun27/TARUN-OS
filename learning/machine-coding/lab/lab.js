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
const LAYOUT_KEY = 'mc-lab-layout';
const CODE_LINE = 20; // must match --code-line in lab.css
const REVIEW_LABEL = 'Copy for /machine-coding design (pauses clock)';
const CONSOLE_MAX_ROWS = 500;

let problem = null;
let warmup = null;
let session = null;

let phase = null;
let phaseEndsAt = 0;
let paused = false;
let pausedAt = 0;
let tickId = null;
let persistId = null;

let files = { jsx: '', css: '' };
let scratch = '';
let activeFile = 'jsx';
let editorLocked = true;

let lastActivity = 0;
let lastSnapshotAt = 0;
let lastSnapshotText = { jsx: null, css: null };
let runtimeErrorSinceRun = false;
let hasRun = false;
let previewRoot = null;
let previewDoc = null;   // the iframe's document — also injected into his scope
let previewWin = null;   // the iframe's window — ditto
let styleEl = null;
let reactMount = null;
let vanillaMount = null;
let consoleDropped = 0;

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

  initSplitters();

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

  patchConsole();
  paintBrief();
  initEditor();
  initPreview();
  bindSession();
  enterPhase('warmup');
  startLoops();
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

  patchConsole();
  paintBrief();
  initEditor();
  initPreview();
  bindSession();
  if (session.design) $('design-input').value = session.design;
  session.questions.forEach((q) => renderQA(q));
  revealAsked();
  enterPhase(s.phase || 'code');
  startLoops();
}

function startLoops() {
  if (tickId) return;
  tick();
  tickId = setInterval(tick, 250);
  persistId = setInterval(persist, 5000);
}

function stopLoops() {
  clearInterval(tickId);
  clearInterval(persistId);
  tickId = persistId = null;
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
}

/**
 * Built at the BUZZER, not at session start.
 *
 * `display:none` hides the goals from his eyes but not from the DOM — and he is a developer with
 * devtools one keystroke away. If the whole spec is sitting in the markup while he codes, the
 * CLARIFY phase is on the honour system. Not rendering it until the buzzer costs nothing.
 */
function paintGoals() {
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
  // Preserve an existing start — resuming a session must not rewrite its own history.
  if (!session.phases[phase]) session.phases[phase] = { start: t() };

  // A phase change ALWAYS means a live clock. Without this a pause taken in DESIGN survives into
  // CODE, tick() early-returns, and the clock sits frozen showing the previous phase's countdown.
  setPaused(false);
  $('design-review-btn').textContent = REVIEW_LABEL;

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
  $('clock-wrap').classList.remove('hidden');

  const secs = PHASE_SECONDS[phase] ?? problem.targetMinutes * 60;
  phaseEndsAt = now() + secs * 1000;
  $('clock-label').textContent = phase;

  if (phase === 'warmup') {
    $('warmup-brief').classList.remove('hidden');
    $('editor-pane').classList.remove('hidden');
    setLocked(false);
    activeFile = 'jsx';
    syncTabs();
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
    setLocked(!session.design);
    activeFile = 'jsx';
    syncTabs();
    setEditorValue(files.jsx);
    lastActivity = now();
    lastSnapshotAt = now();
    if (!editorLocked) $('editor').focus();
  }

  if (phase === 'buzzer') {
    $('buzzer-pane').classList.remove('hidden');
    $('next-btn').classList.add('hidden');
    $('clock-wrap').classList.add('hidden');
    // The scorecard. This is the ONLY place P0/P1/P2 is built or shown — revealing it during CODE
    // would hand over every hidden requirement and make the CLARIFY phase decoration.
    paintGoals();
    $('brief-goals').classList.remove('hidden');
    closeOutSession();
  }

  // Repaint now rather than waiting up to 250ms for the next interval, or the previous phase's
  // countdown stays on screen after the phase has already changed.
  tick();
}

function advance() {
  const i = PHASES.indexOf(phase);
  // Bank whatever is in the box rather than let the gate be skipped. This must NOT transition:
  // the caller owns that. Transitioning here too fires enterPhase('code') twice and clobbers
  // phases.code.start, which is the baseline for time-to-first-render.
  if (phase === 'design' && !session.design) submitDesign(true);
  if (i < PHASES.length - 1) enterPhase(PHASES[i + 1]);
}

function tick() {
  if (!session) return;
  if (paused) return;
  if (phase === 'buzzer') return;

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

  if (left === 0) advance();
}

function setPaused(p) {
  $('paused-badge').classList.toggle('hidden', !p);
  if (p === paused) return;
  paused = p;
  if (p) {
    pausedAt = now();
  } else if (pausedAt) {
    // Only credit back time we actually spent paused. Without the guard, an unpause that never
    // followed a pause adds `Date.now()` to phaseEndsAt and the clock never moves again.
    phaseEndsAt += now() - pausedAt;
    pausedAt = 0;
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

/** Records the design. Locking and phase transitions are the caller's job. */
function submitDesign(auto = false) {
  const txt = $('design-input').value.trim();
  if (!txt && !auto) {
    $('design-input').focus();
    return false;
  }
  session.design = txt;
  session.milestones.designSubmitted = t();
  // Seed the file with his own plan, as a comment. He codes against the design he committed to.
  if (txt && !files.jsx) {
    files.jsx = txt.split('\n').map((l) => '// ' + l).join('\n') + '\n\n';
  }
  return true;
}

function setLocked(locked) {
  editorLocked = locked;
  $('editor-lock').classList.toggle('hidden', !locked);
  $('editor').disabled = locked;
}

let lawFlashId = null;
/** A refused action has to say why, or it just reads as a broken checkbox. */
function flashLaw(msg) {
  const el = $('law-flash');
  el.textContent = msg;
  el.classList.remove('hidden');
  clearTimeout(lawFlashId);
  lawFlashId = setTimeout(() => el.classList.add('hidden'), 2600);
}

/* The one legitimate reason to stop the clock: the Phase 1 design-review round trip. It is a
 * scaffold, so it doesn't have to be realistic. It comes off in week 3. */
async function toggleDesignReview() {
  if (paused) {
    setPaused(false);
    $('design-review-btn').textContent = REVIEW_LABEL;
    return;
  }
  const txt = $('design-input').value.trim();
  if (!txt) return;
  session.designReviewRequested = true;
  setPaused(true);
  const block = `/machine-coding design\n\nProblem: ${problem.title}\nPrompt: ${problem.prompt}\n\nMy design:\n${txt}`;
  try { await navigator.clipboard.writeText(block); } catch { /* clipboard blocked on file:// */ }
  $('design-review-btn').textContent = 'Copied — paste it to Claude. Click to resume clock.';
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
    paintEditor();
    updateAutocomplete();
  });

  // What this editor will and will not do for him, and why the line sits where it does.
  //
  // THE TEST, and it is the only one: does the feature supply KNOWLEDGE, or does it save keystrokes
  // on a decision he has already made? Knowledge is the thing being measured. Keystrokes are tax.
  //
  //   FREE — saves keystrokes on a decision already made:
  //     · Tab inserts spaces. Enter copies the current indent. Every real editor does both; a
  //       textarea that doesn't is harder than a real round in a way that trains typing, not
  //       machine coding.
  //     · Ctrl/Cmd+S formats via Prettier. Indentation is not on the rubric — "code structure" is
  //       about the component split and honest names, not where the braces sit. Ungated on purpose
  //       (unlike the CSS dropdown): formatting is not the thing being tested in ANY phase.
  //     · Typing `>` closes a JSX tag. He already decided it was an <h1>; typing `</h1>` is
  //       transcription. See the Enter branch below for why brackets are NOT the same case.
  //
  //   BANNED IN app.jsx, permanently — that IS cold API recall, it is muscle #2, and it is the
  //   entire reason this lab exists:
  //     · identifier/variable autocomplete · hook suggestions · snippets · bracket matching
  //
  //   The evidence, so this ban survives the next time it gets asked for. Session 2026-07-28
  //   (counter, 4.25/10): `const [count, setCount] = useState(0)` on line 16, `setState(...)` typed
  //   on line 19. That one identifier cost the entire 3-point P0 block. An identifier dropdown would
  //   have offered `setCount`, he would have taken it, P0 would have gone green, and the profile
  //   would now record a primitive he does not own. **The feature would have deleted the only
  //   finding the session produced.** It was requested that same day and declined for this reason.
  //
  //   styles.css gets a CSS dropdown ONLY after P0 is green; see the CSS autocomplete section for
  //   why that one exception is principled and not drift.
  //
  //   (Syntax colour is not autocomplete either: it never supplies an API name, and every real round
  //   runs in a highlighted editor. A white-on-black textarea is the unrealistic option.)
  ed.addEventListener('keydown', (e) => {
    // FIRST: the dropdown owns Enter/Tab/arrows while it is open, or the handlers below eat them.
    if (acOpen) {
      if (e.key === 'ArrowDown') { e.preventDefault(); acMove(1); return; }
      if (e.key === 'ArrowUp') { e.preventDefault(); acMove(-1); return; }
      if (e.key === 'Enter' || e.key === 'Tab') { e.preventDefault(); acceptAutocomplete(); return; }
      if (e.key === 'Escape') { e.preventDefault(); hideAutocomplete(); return; }
    }

    // He asked for "format on save". There is no save in here, so Ctrl/Cmd+S is the muscle memory
    // it maps to. preventDefault or the browser offers to save the page.
    if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
      e.preventDefault();
      formatEditor();
      return;
    }

    if (e.key === '>' && activeFile === 'jsx' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const closer = jsxCloserAt(ed.value, ed.selectionStart);
      if (closer && ed.selectionStart === ed.selectionEnd) {
        e.preventDefault();
        const s = ed.selectionStart;
        ed.setRangeText('>' + closer, s, s, 'end');
        // Caret lands between the two tags, which is where the child goes.
        ed.selectionStart = ed.selectionEnd = s + 1;
        ed.dispatchEvent(new Event('input'));
        return;
      }
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const s = ed.selectionStart;
      ed.setRangeText('  ', s, ed.selectionEnd, 'end');
      ed.dispatchEvent(new Event('input'));
      return;
    }

    if (e.key === 'Enter' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      const s = ed.selectionStart;
      const before = ed.value.slice(0, s);
      const line = before.slice(before.lastIndexOf('\n') + 1);
      const indent = (line.match(/^[ \t]*/) || [''])[0];
      // An opener earns one more level. Closing the BRACKET is still his job — and unlike a JSX
      // tag, that is not an arbitrary line: an unbalanced brace is a structural mistake, and
      // noticing it is part of holding the shape of the code in your head. A tag's closer carries
      // no such information — it is the name you already typed, spelled backwards.
      const extra = /[{([]\s*$/.test(line) ? '  ' : '';
      ed.setRangeText('\n' + indent + extra, s, ed.selectionEnd, 'end');
      ed.dispatchEvent(new Event('input'));
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runPreview();
    }
  });

  // A dropdown anchored to a caret that has scrolled away is worse than no dropdown.
  ed.addEventListener('scroll', () => {
    $('highlight').scrollTop = ed.scrollTop;
    $('gutter').scrollTop = ed.scrollTop;
    hideAutocomplete();
  });
  ed.addEventListener('blur', hideAutocomplete);
  // Moving the caret with the mouse/arrows invalidates the token the list was built from.
  ed.addEventListener('click', hideAutocomplete);

  document.querySelectorAll('.tab').forEach((btn) => {
    btn.onclick = () => {
      if (phase !== 'code') return;
      activeFile = btn.dataset.file;
      hideAutocomplete(); // the list belongs to the file it was built from
      syncTabs();
      setEditorValue(files[activeFile]);
    };
  });

  // Wrap points move when the editor's width changes, so a splitter drag has to re-measure.
  new ResizeObserver(() => paintGutter()).observe(ed);

  paintEditor();
}

function syncTabs() {
  document.querySelectorAll('.tab').forEach((b) =>
    b.classList.toggle('active', b.dataset.file === activeFile)
  );
}

function setEditorValue(v) {
  $('editor').value = v || '';
  paintEditor();
}

/* ── JSX tag auto-close ─────────────────────────────────────────────────────
 * Returns the closing tag to insert after the `>` being typed, or null to leave it alone.
 *
 * Deliberately naive about strings and comments, same tolerance as `cssContextAt`: the failure
 * mode is a tag that does not auto-close, which costs one keystroke. The opposite failure —
 * inserting a closer where none belongs — would corrupt his code mid-round, so every ambiguous
 * case returns null.
 */
const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr'
]);

function jsxCloserAt(text, pos) {
  const before = text.slice(0, pos);
  const lt = before.lastIndexOf('<');
  if (lt === -1) return null;

  const open = before.slice(lt);
  // Arrow functions in props are everywhere in this lab (`onClick={() => setCount(...)}`), and a
  // raw `>` scan would read that arrow as the tag already being closed. Blank them out first.
  if (open.replace(/=>/g, '  ').includes('>')) return null; // that `<` is already closed
  if (open.startsWith('</')) return null;                   // he's typing a closing tag
  if (open.endsWith('/')) return null;                      // self-closing: <br />
  if (open === '<') return '</>';                           // bare fragment

  const m = /^<([A-Za-z][\w.:$-]*)/.exec(open);
  if (!m) return null;                                      // `a < b`, not a tag
  if (VOID_TAGS.has(m[1].toLowerCase())) return null;
  return '</' + m[1] + '>';
}

/* ── Formatting ─────────────────────────────────────────────────────────────
 * Prettier, on Ctrl/Cmd+S. Keystroke only, deliberately no button. See the doctrine block in
 * initEditor for why this is free and identifier autocomplete is not.
 */

/**
 * Replace the editor's contents WITHOUT counting as activity.
 *
 * This is the whole reason formatting doesn't route through a synthetic `input` event: that path
 * calls `recordActivity()`, which resets `lastActivity` and is what detects freezes > 45s. Freezes
 * are the highest-value signal this lab produces — 3 of them on 2026-07-28, all at the wiring seam,
 * and none of it self-reportable. A Ctrl+S every 30 seconds while stuck would erase exactly the
 * pauses worth seeing.
 */
function applyEditorText(text, cursorOffset) {
  const ed = $('editor');
  ed.value = text;
  const c = Math.max(0, Math.min(cursorOffset ?? 0, text.length));
  ed.selectionStart = ed.selectionEnd = c;
  if (phase === 'warmup') scratch = text;
  else if (phase === 'code') files[activeFile] = text;
  hideAutocomplete();
  paintEditor();
}

let fmtMsgTimer = null;

/** Transient note in the tab strip. Never says WHERE the error is — see `.fmt-msg` in lab.css. */
function flashFormat(msg, warn) {
  const el = $('fmt-msg');
  el.textContent = msg;
  el.classList.toggle('warn', !!warn);
  el.classList.remove('hidden');
  clearTimeout(fmtMsgTimer);
  fmtMsgTimer = setTimeout(() => el.classList.add('hidden'), 2200);
}

async function formatEditor() {
  if (phase !== 'warmup' && phase !== 'code') return;
  if (editorLocked) return;
  const ed = $('editor');
  if (!ed.value.trim()) return;

  try {
    // formatWithCursor, not format: `format` alone drops the caret to offset 0 on every run, which
    // makes the feature actively hostile mid-line.
    const out = await prettier.formatWithCursor(ed.value, {
      parser: activeFile === 'css' ? 'css' : 'babel',
      plugins: [prettierPlugins.babel, prettierPlugins.estree, prettierPlugins.postcss],
      cursorOffset: ed.selectionStart,
      printWidth: 100,
      tabWidth: 2,
      singleQuote: true,
      semi: true
    });
    if (out.formatted === ed.value) { flashFormat('already formatted'); return; }
    applyEditorText(out.formatted, out.cursorOffset);
    session.formatCount = (session.formatCount || 0) + 1;
    flashFormat('formatted');
  } catch {
    // No line number, no parser message. Finding your own broken brace is part of the round, and a
    // formatter that points at it is a linter he didn't earn.
    flashFormat("can't format — syntax error", true);
  }
}

function paintEditor() {
  paintHighlight();
  // Measure only after the browser has laid the new markup out.
  requestAnimationFrame(paintGutter);
}

function paintHighlight() {
  const lang = activeFile === 'css' ? 'css' : 'jsx';
  const code = $('highlight-code');
  code.className = 'language-' + lang;
  // The trailing newline keeps a final empty line visible, matching the textarea.
  code.innerHTML = Prism.highlight($('editor').value + '\n', Prism.languages[lang], lang);
}

/**
 * One gutter entry per LOGICAL line, each given the exact pixel height that line occupies.
 *
 * A soft-wrapped line takes 2+ visual rows, so a naive "one number per row" gutter desyncs the
 * moment anything wraps. Measuring with a Range is exact and — unlike splitting the highlighted
 * HTML per line — it survives tokens that span newlines (block comments, template literals).
 */
/**
 * Flatten #highlight-code's text nodes with cumulative offsets, so a character offset in the
 * textarea can be mapped to a DOM position in the highlight layer.
 *
 * Shared by the gutter (which measures line heights) and the autocomplete (which needs the caret's
 * pixel position). #highlight mirrors #editor's metrics exactly — that is already load-bearing — so
 * measuring the mirror is the same as measuring the textarea, which the DOM won't let us do directly.
 */
function buildTextIndex() {
  const code = $('highlight-code');
  if (!code) return [];
  const walker = document.createTreeWalker(code, NodeFilter.SHOW_TEXT);
  const nodes = [];
  let acc = 0;
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    nodes.push({ node: n, start: acc, end: acc + n.nodeValue.length });
    acc += n.nodeValue.length;
  }
  return nodes;
}

/** Offsets only ever move forward, so a sliding cursor beats a scan per lookup. */
function makeLocator(nodes) {
  let cursor = 0;
  return (off) => {
    if (!nodes.length) return null;
    while (cursor < nodes.length - 1 && nodes[cursor].end < off) cursor++;
    while (cursor > 0 && nodes[cursor].start > off) cursor--;
    const e = nodes[cursor];
    return [e.node, Math.max(0, Math.min(off - e.start, e.node.nodeValue.length))];
  };
}

/** Viewport rect of the caret, or null. Used to hang the autocomplete under it. */
function caretRect() {
  const ed = $('editor');
  const nodes = buildTextIndex();
  if (!nodes.length) return null;
  const at = makeLocator(nodes)(ed.selectionStart);
  if (!at) return null;
  try {
    const range = document.createRange();
    range.setStart(at[0], at[1]);
    range.collapse(true);
    const r = range.getBoundingClientRect();
    // A collapsed range at a node boundary can measure zero on every axis — widen it by one char.
    if (!r || (!r.top && !r.left && !r.height)) {
      range.setEnd(at[0], Math.min(at[1] + 1, at[0].nodeValue.length));
      return range.getBoundingClientRect() || null;
    }
    return r;
  } catch { return null; }
}

function paintGutter() {
  const ed = $('editor');
  const code = $('highlight-code');
  if (!ed || !code) return;

  const lines = ed.value.split('\n');
  const nodes = buildTextIndex();
  const locate = makeLocator(nodes);
  const range = document.createRange();
  const frag = document.createDocumentFragment();
  let off = 0;

  for (let i = 0; i < lines.length; i++) {
    let h = CODE_LINE;
    if (nodes.length && lines[i].length > 0) {
      const a = locate(off);
      const b = locate(off + lines[i].length);
      if (a && b) {
        try {
          range.setStart(a[0], a[1]);
          range.setEnd(b[0], b[1]);
          // Count VISUAL ROWS, don't measure pixels. getClientRects() boxes hug the glyphs, not
          // the line boxes, so bottom-minus-top comes up short by the leading (a 4-row wrap
          // measures ~75px, not 80) and the gutter drifts a little further with every wrap.
          // One row per distinct rect top; a row split across several tokens shares one top.
          const tops = new Set();
          for (const r of range.getClientRects()) tops.add(Math.round(r.top));
          h = Math.max(1, tops.size) * CODE_LINE;
        } catch { /* offsets raced a repaint — fall back to a single row */ }
      }
    }
    const d = document.createElement('div');
    d.className = 'ln';
    d.style.height = h + 'px';
    d.textContent = String(i + 1);
    frag.appendChild(d);
    off += lines[i].length + 1;
  }

  $('gutter').replaceChildren(frag);
  $('gutter').scrollTop = ed.scrollTop;
}

function cursorLine() {
  const ed = $('editor');
  return ed.value.slice(0, ed.selectionStart).split('\n').length;
}

/* ── CSS autocomplete ───────────────────────────────────────────────────────
 * `styles.css` ONLY, and ONLY once P0 is green. `app.jsx` never gets this, under any condition.
 *
 * The gate IS the feature — do not quietly remove it. The reasoning, written down so it survives:
 *
 *   Cold API recall is muscle #2, and this lab exists because AI-assisted coding ate it. But nobody
 *   ever failed a machine coding round for typing `flex-direction` slowly, and every real round runs
 *   in an editor that completes CSS. The honest line is not "no help" — it is "no help with the thing
 *   being tested". CSS is not the thing being tested: law #2 says nothing gets styled until P0 works,
 *   and `cssTouched` already fires a warning for exactly that.
 *
 *   So: before P0 you get the law-#2 badge, because you should not be in this file at all. After P0,
 *   styling is the legitimate task and typing speed is pure tax. One rule across the whole lab —
 *   P0 green unlocks everything else (same rule as the P1/P2 checkboxes).
 *
 * Property NAMES only tell him what exists; the value lists are the half nobody remembers. Both are
 * curated rather than exhaustive — a 600-entry dump would bury the 20 he actually wants.
 */
const CSS_PROPS = [
  'align-content', 'align-items', 'align-self', 'animation', 'animation-delay', 'animation-duration',
  'animation-fill-mode', 'animation-iteration-count', 'animation-name', 'animation-timing-function',
  'aspect-ratio', 'backdrop-filter', 'background', 'background-color', 'background-image',
  'background-position', 'background-repeat', 'background-size', 'border', 'border-bottom',
  'border-collapse', 'border-color', 'border-left', 'border-radius', 'border-right', 'border-style',
  'border-top', 'border-width', 'bottom', 'box-shadow', 'box-sizing', 'caret-color', 'clip-path',
  'color', 'column-gap', 'columns', 'content', 'cursor', 'display', 'filter', 'flex', 'flex-basis',
  'flex-direction', 'flex-flow', 'flex-grow', 'flex-shrink', 'flex-wrap', 'float', 'font',
  'font-family', 'font-size', 'font-style', 'font-variant-numeric', 'font-weight', 'gap', 'grid',
  'grid-area', 'grid-auto-columns', 'grid-auto-flow', 'grid-auto-rows', 'grid-column',
  'grid-column-end', 'grid-column-start', 'grid-gap', 'grid-row', 'grid-row-end', 'grid-row-start',
  'grid-template', 'grid-template-areas', 'grid-template-columns', 'grid-template-rows', 'height',
  'inset', 'justify-content', 'justify-items', 'justify-self', 'left', 'letter-spacing',
  'line-height', 'list-style', 'list-style-type', 'margin', 'margin-bottom', 'margin-left',
  'margin-right', 'margin-top', 'max-height', 'max-width', 'min-height', 'min-width', 'object-fit',
  'opacity', 'order', 'outline', 'outline-offset', 'overflow', 'overflow-x', 'overflow-y',
  'overflow-wrap', 'padding', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top',
  'place-content', 'place-items', 'place-self', 'pointer-events', 'position', 'resize', 'right',
  'row-gap', 'scroll-behavior', 'text-align', 'text-decoration', 'text-overflow', 'text-shadow',
  'text-transform', 'top', 'transform', 'transform-origin', 'transition', 'transition-delay',
  'transition-duration', 'transition-property', 'transition-timing-function', 'user-select',
  'vertical-align', 'visibility', 'white-space', 'width', 'word-break', 'z-index'
];

const CSS_VALUES = {
  'align-content': ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'stretch'],
  'align-items': ['stretch', 'center', 'flex-start', 'flex-end', 'baseline'],
  'align-self': ['auto', 'stretch', 'center', 'flex-start', 'flex-end', 'baseline'],
  'background-repeat': ['no-repeat', 'repeat', 'repeat-x', 'repeat-y'],
  'background-size': ['cover', 'contain', 'auto'],
  'border-style': ['solid', 'dashed', 'dotted', 'none', 'double'],
  'box-sizing': ['border-box', 'content-box'],
  cursor: ['pointer', 'default', 'text', 'move', 'grab', 'grabbing', 'not-allowed', 'wait', 'help'],
  display: ['flex', 'grid', 'block', 'inline-block', 'inline', 'inline-flex', 'inline-grid', 'none', 'contents'],
  'flex-direction': ['row', 'column', 'row-reverse', 'column-reverse'],
  'flex-wrap': ['wrap', 'nowrap', 'wrap-reverse'],
  float: ['left', 'right', 'none'],
  'font-style': ['normal', 'italic', 'oblique'],
  'font-variant-numeric': ['tabular-nums', 'normal', 'proportional-nums'],
  'font-weight': ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  'grid-auto-flow': ['row', 'column', 'dense', 'row dense', 'column dense'],
  'justify-content': ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
  'justify-items': ['stretch', 'center', 'start', 'end'],
  'justify-self': ['auto', 'stretch', 'center', 'start', 'end'],
  'list-style-type': ['none', 'disc', 'circle', 'square', 'decimal'],
  'object-fit': ['cover', 'contain', 'fill', 'none', 'scale-down'],
  overflow: ['auto', 'hidden', 'scroll', 'visible', 'clip'],
  'overflow-x': ['auto', 'hidden', 'scroll', 'visible'],
  'overflow-y': ['auto', 'hidden', 'scroll', 'visible'],
  'overflow-wrap': ['break-word', 'normal', 'anywhere'],
  'place-content': ['center', 'start', 'end', 'space-between'],
  'place-items': ['center', 'start', 'end', 'stretch'],
  'pointer-events': ['none', 'auto'],
  position: ['relative', 'absolute', 'fixed', 'sticky', 'static'],
  resize: ['none', 'both', 'horizontal', 'vertical'],
  'scroll-behavior': ['smooth', 'auto'],
  'text-align': ['left', 'center', 'right', 'justify'],
  'text-decoration': ['none', 'underline', 'line-through', 'overline'],
  'text-overflow': ['ellipsis', 'clip'],
  'text-transform': ['uppercase', 'lowercase', 'capitalize', 'none'],
  'user-select': ['none', 'auto', 'text', 'all'],
  'vertical-align': ['middle', 'top', 'bottom', 'baseline'],
  visibility: ['visible', 'hidden', 'collapse'],
  'white-space': ['nowrap', 'normal', 'pre', 'pre-wrap', 'pre-line'],
  'word-break': ['break-word', 'break-all', 'normal', 'keep-all']
};

let acOpen = false;
let acItems = [];
let acIndex = 0;
let acCtx = null;

/** The gate. Read live, so unticking P0 closes the door again. */
function acEnabled() {
  return activeFile === 'css'
    && phase === 'code'
    && !!(session && session.goals && session.goals.p0);
}

/**
 * What is being typed at `pos` — a property, a value, or neither.
 * Brace counting is deliberately naive (it does not parse comments or strings); in a stylesheet this
 * small the failure mode is a dropdown that doesn't appear, which is survivable.
 */
function cssContextAt(text, pos) {
  const before = text.slice(0, pos);
  const opens = (before.match(/\{/g) || []).length;
  const closes = (before.match(/\}/g) || []).length;
  if (opens <= closes) return null; // selector context — nothing useful to offer

  const declStart = Math.max(before.lastIndexOf('{'), before.lastIndexOf(';'));
  const decl = before.slice(declStart + 1);
  const colon = decl.indexOf(':');

  if (colon === -1) {
    return { kind: 'prop', token: (decl.match(/([a-zA-Z-]*)$/) || ['', ''])[1] };
  }
  return {
    kind: 'value',
    prop: decl.slice(0, colon).trim(),
    token: (decl.slice(colon + 1).match(/([a-zA-Z-]*)$/) || ['', ''])[1]
  };
}

function updateAutocomplete() {
  if (!acEnabled()) return hideAutocomplete();
  const ed = $('editor');
  const ctx = cssContextAt(ed.value, ed.selectionStart);
  if (!ctx || !ctx.token) return hideAutocomplete(); // never pop unprompted on an empty token

  const pool = ctx.kind === 'prop' ? CSS_PROPS : (CSS_VALUES[ctx.prop] || []);
  const tok = ctx.token.toLowerCase();
  // Prefix matches first — they are what he meant — then substrings, so `content` still finds
  // `justify-content`.
  const pre = pool.filter((p) => p.startsWith(tok));
  const sub = pool.filter((p) => !p.startsWith(tok) && p.includes(tok));
  const hits = pre.concat(sub).slice(0, 40);
  if (!hits.length || (hits.length === 1 && hits[0] === tok)) return hideAutocomplete();

  acItems = hits;
  acCtx = ctx;
  acIndex = 0;
  renderAutocomplete();
}

function renderAutocomplete() {
  const box = $('css-ac');
  box.replaceChildren();
  acItems.forEach((it, i) => {
    const d = document.createElement('div');
    d.className = 'ac-row' + (i === acIndex ? ' active' : '');
    d.textContent = it;
    // mousedown, not click: click fires after blur, by which time the caret is gone.
    d.addEventListener('mousedown', (e) => { e.preventDefault(); acIndex = i; acceptAutocomplete(); });
    box.appendChild(d);
  });

  const r = caretRect();
  const area = $('editor').parentElement.getBoundingClientRect();
  if (r) {
    const left = Math.max(0, Math.min(r.left - area.left, area.width - 200));
    const below = r.bottom - area.top + 2;
    box.style.left = left + 'px';
    // Flip above the caret when there is no room below it.
    if (below + 180 > area.height && r.top - area.top > 180) {
      box.style.top = '';
      box.style.bottom = (area.height - (r.top - area.top) + 2) + 'px';
    } else {
      box.style.bottom = '';
      box.style.top = below + 'px';
    }
  }
  box.classList.remove('hidden');
  acOpen = true;
  const active = box.querySelector('.ac-row.active');
  if (active) active.scrollIntoView({ block: 'nearest' });
}

function hideAutocomplete() {
  if (!acOpen) return;
  acOpen = false;
  acItems = [];
  acCtx = null;
  $('css-ac').classList.add('hidden');
}

function acMove(d) {
  acIndex = (acIndex + d + acItems.length) % acItems.length;
  renderAutocomplete();
}

/** Returns true if it consumed the key. */
function acceptAutocomplete() {
  if (!acOpen || !acCtx) return false;
  const ed = $('editor');
  const pick = acItems[acIndex];
  const start = ed.selectionStart - acCtx.token.length;
  // A property wants its colon; a value wants its semicolon. Saves the two keys nobody enjoys.
  const suffix = acCtx.kind === 'prop' ? ': ' : ';';
  hideAutocomplete();
  ed.setRangeText(pick + suffix, start, ed.selectionStart, 'end');
  ed.dispatchEvent(new Event('input'));
  return true;
}

/* ── Panes ──────────────────────────────────────────────────────────────── */

const PANE_DEF = { brief: 270, preview: 340, console: 220 };
const PANE_LIM = { brief: [180, 460], preview: [220, 800], console: [90, 600] };
// `console` is the odd one out: it resizes vertically, inside #preview rather than across #stage.
const PANE_AXIS = { brief: 'x', preview: 'x', console: 'y' };
const CENTRE_MIN = 360;
const PREVIEW_MIN = 120; // the preview must survive the console growing
const SPLITTER_PX = 12; // two 6px handles

let panes = { ...PANE_DEF };

function applyPanes() {
  const s = $('stage');
  s.style.setProperty('--brief-w', panes.brief + 'px');
  s.style.setProperty('--preview-w', panes.preview + 'px');
  $('preview').style.setProperty('--console-h', panes.console + 'px');
}

function savePanes() {
  // Deliberately a different key from the session: discarding a session must not reset the layout.
  try { localStorage.setItem(LAYOUT_KEY, JSON.stringify(panes)); } catch { /* quota — ignore */ }
}

function initSplitters() {
  try {
    const saved = JSON.parse(localStorage.getItem(LAYOUT_KEY) || '{}');
    panes = {
      brief: saved.brief || PANE_DEF.brief,
      preview: saved.preview || PANE_DEF.preview,
      console: saved.console || PANE_DEF.console
    };
  } catch { panes = { ...PANE_DEF }; }
  applyPanes();

  document.querySelectorAll('.splitter').forEach((sp) => {
    const which = sp.dataset.split;
    const axis = PANE_AXIS[which];

    sp.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      sp.setPointerCapture(e.pointerId);
      sp.classList.add('dragging');
      document.body.classList.add('dragging', 'dragging-' + axis);

      const p0 = axis === 'x' ? e.clientX : e.clientY;
      const w0 = panes[which];

      const move = (ev) => {
        const p = axis === 'x' ? ev.clientX : ev.clientY;
        // `brief` is the only pane whose handle sits AFTER it. Every other handle sits before its
        // pane (preview's is to its left, console's is above it), so the delta has to flip or the
        // pane shrinks when you drag towards it.
        const d = which === 'brief' ? p - p0 : p0 - p;
        const [lo, hi] = PANE_LIM[which];

        let roomFor;
        if (axis === 'x') {
          const total = $('stage').getBoundingClientRect().width;
          const other = which === 'brief' ? panes.preview : panes.brief;
          roomFor = total - other - SPLITTER_PX - CENTRE_MIN;
        } else {
          // The console shares #preview's column with the frame, the head and the error banner.
          const box = $('preview').getBoundingClientRect().height;
          const head = $('preview').querySelector('.preview-head').offsetHeight;
          roomFor = box - head - PREVIEW_MIN - 6;
        }

        // Math.min BEFORE Math.max, so `lo` still wins when the pane genuinely has no room —
        // a squeezed pane beats a pane that vanishes.
        panes[which] = Math.round(Math.max(lo, Math.min(hi, Math.min(w0 + d, roomFor))));
        applyPanes();
      };
      const up = () => {
        try { sp.releasePointerCapture(e.pointerId); } catch { /* already released */ }
        sp.classList.remove('dragging');
        document.body.classList.remove('dragging', 'dragging-' + axis);
        sp.removeEventListener('pointermove', move);
        sp.removeEventListener('pointerup', up);
        sp.removeEventListener('pointercancel', up);
        savePanes();
      };

      sp.addEventListener('pointermove', move);
      sp.addEventListener('pointerup', up);
      sp.addEventListener('pointercancel', up);
    });

    sp.addEventListener('dblclick', () => {
      panes[which] = PANE_DEF[which];
      applyPanes();
      savePanes();
    });
  });
}

/* ── Console ────────────────────────────────────────────────────────────── */

const NATIVE_CONSOLE = {
  log: console.log.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console),
  info: console.info.bind(console)
};
let consolePatched = false;

function fmtArg(a) {
  if (typeof a === 'string') return a;
  if (a instanceof Error) return a.stack || a.message;
  if (typeof a === 'function') return a.toString().split('\n')[0];
  if (a === undefined) return 'undefined';
  try { return JSON.stringify(a) ?? String(a); } catch { return String(a); }
}

/**
 * Capped, because half the warm-up bank logs from a timer.
 *
 * An interval that forgets its cleanup keeps logging forever — correct React behaviour, and exactly
 * the lesson `timer-cleanup` exists to teach, so it is NOT suppressed. But uncapped it also grows
 * the DOM without limit and grinds the tab to a halt mid-round, which teaches nothing and costs him
 * the session. Keep the lesson, drop the oldest rows.
 */
function pushConsole(kind, args) {
  const log = $('console-log');
  if (!log) return;
  const atBottom = log.scrollHeight - log.scrollTop - log.clientHeight < 40;

  const row = document.createElement('div');
  row.className = 'c-row c-' + kind;
  row.textContent = args.map(fmtArg).join(' ');
  log.appendChild(row);

  // The "N dropped" note lives at the top of the log, which means it is also a child of it — so it
  // must be excluded from the count AND skipped when evicting, or it gets dropped as the oldest row,
  // recreated, and counted again on every single push (which double-counted every eviction).
  let note = log.querySelector('.c-dropped');
  let over = log.children.length - (note ? 1 : 0) - CONSOLE_MAX_ROWS;
  if (over > 0) {
    consoleDropped += over;
    while (over-- > 0) {
      const oldest = note ? note.nextSibling : log.firstChild;
      if (!oldest) break;
      log.removeChild(oldest);
    }
    if (!note) {
      note = document.createElement('div');
      note.className = 'c-row c-dropped';
      log.prepend(note);
    }
    note.textContent = `… ${consoleDropped} earlier lines dropped (console capped at ${CONSOLE_MAX_ROWS})`;
  }

  // Don't yank him back to the bottom if he has scrolled up to read something.
  if (atBottom) log.scrollTop = log.scrollHeight;
}

/**
 * Patched for the whole session, not just the synchronous run.
 *
 * A debounce drill logs from a timer 300ms later; an onClick logs minutes later. Restoring the
 * native console after the run returns would silently swallow exactly the output those drills
 * exist to produce.
 */
function patchConsole() {
  if (consolePatched) return;
  consolePatched = true;
  ['log', 'warn', 'error', 'info'].forEach((k) => {
    console[k] = (...args) => { NATIVE_CONSOLE[k](...args); pushConsole(k, args); };
  });
}

/* ── Preview ────────────────────────────────────────────────────────────── */

/**
 * The preview is a real `<iframe>` document, not a shadow root.
 *
 * A shadow root has no `body` and no `:root`, so the two lines every round opens with —
 * `body { margin: 0 }` and `:root { --brand: … }` — silently did NOTHING, with no error to explain
 * why. Worse, a shadow root does NOT block inherited properties: the preview quietly handed his
 * component the lab's own font and text colour, so code he had never styled still *looked* styled.
 * A real round starts black-on-white Times. Now this one does too.
 *
 * His code still RUNS in the lab's realm — the iframe is a rendering surface and a CSS document,
 * nothing more. That is what keeps this cheap: Babel, the patched console, window.onerror and the
 * try/catch in runPreview all keep working, because nothing crosses a realm boundary.
 */
function initPreview() {
  const frame = $('preview-frame');
  // about:blank inherits the creator's origin, so contentDocument stays reachable even on file://
  // (verified). srcdoc is NOT used — its origin rules are the fragile ones here.
  const doc = frame.contentDocument;
  doc.open();
  // TWO mounts, deliberately. React owns #react-root and nothing else may touch it — clearing a
  // React container by hand leaves its fiber tree pointing at nodes that are no longer in the
  // document, and the next render reconciles against a ghost. Vanilla drills get their own #root to
  // scribble in, which runPreview is free to wipe between runs.
  doc.write(
    '<!doctype html><html><head><meta charset="utf-8"><style id="user-css"></style></head>'
    + '<body><div id="react-root"></div><div id="root"></div></body></html>'
  );
  doc.close();

  previewDoc = doc;
  previewWin = frame.contentWindow;
  styleEl = doc.getElementById('user-css');
  reactMount = doc.getElementById('react-root');
  vanillaMount = doc.getElementById('root');
  previewRoot = ReactDOM.createRoot(reactMount);

  // Gated on hasRun so a bug in the lab itself doesn't paint his preview red before he has
  // even pressed Run.
  window.addEventListener('error', (e) => {
    if (!hasRun) return;
    runtimeErrorSinceRun = true;
    showPreviewError(e.message);
  });
  window.addEventListener('unhandledrejection', (e) => {
    if (!hasRun) return;
    runtimeErrorSinceRun = true;
    showPreviewError(String(e.reason));
  });

  $('run-btn').onclick = runPreview;
  $('console-clear').onclick = () => $('console-log').replaceChildren();
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

/**
 * Babel's `react` preset does not transform ES modules, and `new Function` cannot execute an
 * `import`. So imports are structurally impossible here — but muscle memory will keep typing them.
 *
 * The lab's printed promise is "No imports needed (they're stripped)". That promise must hold for
 * ANY import shape, including a malformed one: the previous regex required a *quoted* specifier, so
 * `import {useState} from React;` (no quotes) sailed through untouched and Babel died on it with
 * `Unexpected token (7:23)` — a lab-mechanics failure wearing a compiler's clothes.
 *
 * Stripping is not the same as forgiving. `runPreview` warns about every strip, and names a
 * malformed one, so the mistake still gets taught — see IMPORT_NOTE.
 */
function stripModuleSyntax(src) {
  let importsStripped = 0;
  let malformed = 0;
  // Blank the match instead of deleting it: every newline survives, so line numbers in a Babel or
  // runtime error still point at the line he is looking at. (Deleting collapsed a multi-line import
  // from 4 lines to 1 and silently shifted every error below it.)
  const tally = (m) => {
    importsStripped++;
    // A real bundler needs `from 'react'`. Bare/unquoted specifiers are worth saying out loud.
    if (/\bfrom\b/.test(m) && !/\bfrom[ \t]*['"]/.test(m)) malformed++;
    return m.replace(/[^\n]/g, '');
  };

  const code = src
    // Braced form, including multi-line. `[^{}]*` cannot cross another brace, so an unclosed import
    // can never run away and eat real code below it.
    .replace(/^[ \t]*import\b[^{;\n]*\{[^{}]*\}[^\n]*$/gm, tally)
    // Everything else on one line: default, namespace, side-effect — and malformed/unquoted.
    .replace(/^[ \t]*import\b[^\n]*$/gm, tally)
    .replace(/^([ \t]*)export[ \t]+default[ \t]+/gm, '$1')
    .replace(/^([ \t]*)export[ \t]+(?=(?:const|let|var|function|class|async)\b)/gm, '$1');

  return { code, importsStripped, malformed };
}

/* ── Error lessons ──────────────────────────────────────────────────────────
 * The rule for this whole file: NEVER fail on lab mechanics, NEVER hide a real React mistake.
 * Translate, don't suppress.
 *
 * `Cannot read properties of null (reading 'useState')` is a true statement and a useless one — it
 * describes React's internals, not his bug. Every entry below renames the error into the mistake and
 * points at the primitive that owns it (numbering from `primitives.md`, his file, his vocabulary).
 *
 * An error with no entry passes through VERBATIM. Never invent a lesson for an error I don't
 * recognise — a confident wrong diagnosis costs more than a raw stack trace.
 */
const ERROR_LESSONS = [
  {
    re: /Cannot read propert(?:y|ies) of null \(reading 'use\w+'\)|Invalid hook call|Cannot read properties of null \(reading 'H'\)/,
    title: 'Hook called outside a component',
    why: "useState/useEffect only run INSIDE a component body — function App() { … } — or a custom hook. "
       + 'A hook at module top level has no component to attach its state to, so React has no dispatcher '
       + 'and hands you a null. Move it inside App.',
    primitive: '#11 Controlled input (React)'
  },
  {
    re: /Rendered (?:more|fewer) hooks than|change in the order of Hooks/,
    title: 'Hooks ran in a different order',
    why: 'A hook is inside an if / loop / early-return, so a later render called a different number of '
       + 'them. Every hook must run on every render, in the same order. Move it above the branch.',
    primitive: '#14 useEffect + cleanup'
  },
  {
    re: /Too many re-renders|Maximum update depth exceeded/,
    title: 'setState during render',
    why: 'You called a setter in the render body, so it re-rendered, so it called it again. '
       + 'onClick={handle()} CALLS handle immediately — you want onClick={handle} or onClick={() => handle()}.',
    primitive: '#15 Derived vs stored state'
  },
  {
    re: /Objects are not valid as a React child/,
    title: 'Rendered an object',
    why: 'You put an object or array where text goes. Reach for the field: {user.name}, not {user}.',
    primitive: '#1 Render a list from an array'
  },
  {
    re: /Cannot update a component .* while rendering a different component/,
    title: 'setState on another component mid-render',
    why: "You're setting a parent's state from inside a child's render. Move it into an event handler "
       + 'or an effect.',
    primitive: '#13 Lifting state up'
  },
  {
    re: /changing an uncontrolled input to be controlled|changing a controlled input to be uncontrolled/,
    title: 'Uncontrolled → controlled input',
    why: 'value={x} where x started as undefined. Initialise the state to \'\' (empty string), not undefined.',
    primitive: '#11 Controlled input (React)'
  },
  {
    re: /unique "key" prop|Each child in a list should have/,
    title: 'Missing key',
    why: 'Every item from .map() needs a stable key. Use the item id — the array index is a bug the '
       + 'moment the list reorders or an item is deleted.',
    primitive: '#12 List CRUD in state'
  },
  {
    re: /is not a function/,
    title: 'Called something that is not a function',
    why: 'Usually a destructuring slip — const [a, b] = useState() gives a VALUE and a SETTER, in that '
       + 'order. Check you are not calling the value.',
    primitive: null
  },
  {
    re: /(\w+) is not defined/,
    title: 'Not in scope',
    why: 'No imports needed here — React, the hooks, document, window and root are all injected (see the '
       + 'IN SCOPE strip). If it is your own helper, define it above the line that uses it.',
    primitive: null
  }
];

/** Returns the matching lesson, or null. Null means: show him the raw error, unedited. */
function translateError(msg) {
  const s = String(msg || '');
  return ERROR_LESSONS.find((l) => l.re.test(s)) || null;
}

/* `document`, `window` and `root` all point INTO the preview iframe, so vanilla drills get a real
 * page (`document.body`, `document.querySelector`) instead of the lab's own chrome. */
const SCOPE_NAMES = [
  'React', 'ReactDOM', 'useState', 'useEffect', 'useLayoutEffect', 'useRef', 'useMemo',
  'useCallback', 'useReducer', 'useContext', 'createPortal', 'Fragment', 'memo',
  'root', 'document', 'window'
];
const scopeValues = (rootEl) => [
  React, ReactDOM, React.useState, React.useEffect, React.useLayoutEffect, React.useRef,
  React.useMemo, React.useCallback, React.useReducer, React.useContext,
  ReactDOM.createPortal, React.Fragment, React.memo,
  rootEl, previewDoc, previewWin
];

function runPreview() {
  const src = phase === 'warmup' ? scratch : files.jsx;
  runtimeErrorSinceRun = false;
  hasRun = true;
  hidePreviewError();
  $('console-log').replaceChildren();
  if (!session.milestones.firstRun) session.milestones.firstRun = t();

  styleEl.textContent = phase === 'warmup' ? '' : files.css;
  // Only the vanilla mount. React's container is React's business — see initPreview.
  vanillaMount.innerHTML = '';

  const { code, importsStripped, malformed } = stripModuleSyntax(src);
  session.importsStripped = importsStripped;

  // Say it out loud. A silent strip means he writes `from React` for six months and finds out in a
  // real interview — which is the exact opposite of what this lab is for.
  if (importsStripped) {
    const n = importsStripped === 1 ? '1 import' : `${importsStripped} imports`;
    pushConsole('info', [
      `${n} stripped — nothing needs importing here; everything is already in scope (see IN SCOPE).`
    ]);
    if (malformed) {
      pushConsole('warn', [
        'That import is also malformed: a module specifier must be QUOTED — `from \'react\'`, not '
        + '`from React`. It would not compile in a real project either.'
      ]);
    }
  }

  try {
    const out = Babel.transform(code, {
      presets: ['react'],
      filename: 'app.jsx',
      sourceType: 'script'
    }).code;

    const factory = new Function(
      ...SCOPE_NAMES,
      `${out}\n; return typeof App !== 'undefined' ? App : null;`
    );
    // Side effects (a vanilla drill, a console.log) happen during this call.
    const App = factory(...scopeValues(vanillaMount));

    // StrictMode double-invokes effects on mount, so a useEffect that forgets its cleanup shows up
    // immediately instead of at the buzzer. Vite and CRA both do this by default — a round that
    // only works outside StrictMode is a round with a bug in it.
    previewRoot.render(
      App
        ? React.createElement(
            React.StrictMode, null,
            React.createElement(ErrorBoundary, { key: Date.now() }, React.createElement(App))
          )
        : null
    );

    // A warm-up drill is plain JS with no component — that is not an error, its result is whatever
    // it logged or wrote into `root`. In the CODE phase, a missing App IS worth saying out loud.
    if (!App && phase === 'code') {
      showPreviewError('No component named `App` yet. Define `function App() { … }`, then Run.');
    }
    finishRun(!!App);
  } catch (err) {
    runtimeErrorSinceRun = true;
    showPreviewError(err.message);
    session.runs.push({ t: t(), ok: false, error: err.message });
    $('preview-status').className = 'dot err';
  }
}

function finishRun(hadApp) {
  // createRoot().render() is async, so success can only be judged a tick later.
  setTimeout(() => {
    const painted =
      reactMount.innerHTML.trim().length > 0 || vanillaMount.innerHTML.trim().length > 0;
    const logged = $('console-log').children.length > 0;
    const ok = !runtimeErrorSinceRun && (painted || logged);
    session.runs.push({ t: t(), ok });
    $('preview-status').className = 'dot ' + (ok ? 'ok' : 'err');
    // Time-to-first-render only means anything for a real component in the CODE phase.
    if (ok && hadApp && !session.milestones.firstRender && phase === 'code') {
      session.milestones.firstRender = t();
    }
  }, 60);
}

/**
 * One error, two places, on purpose.
 *
 * The banner is a headline he cannot miss; the console is the record, with the raw compiler text
 * intact. Previously the error only ever reached the banner — so the console he was actually
 * watching sat there saying "console.log output lands here" while the run was on fire.
 */
function showPreviewError(msg) {
  const lesson = translateError(msg);
  const el = $('preview-error');

  // Banner: the headline only. The detail lives in the console, which is scrollable and keeps history.
  el.textContent = lesson ? lesson.title : String(msg).split('\n')[0];
  el.classList.remove('hidden');
  $('preview-status').className = 'dot err';

  if (lesson) {
    pushConsole('error', [lesson.title]);
    pushConsole('lesson', [
      lesson.why + (lesson.primitive ? `\n→ primitive ${lesson.primitive}` : '')
    ]);
    // The compiler's own words still go in. The translation is a lens, never a replacement — if my
    // match is wrong, the raw text is right there to catch me out.
    pushConsole('raw', [String(msg)]);
  } else {
    // No lesson matched: show it verbatim rather than guess.
    pushConsole('error', [String(msg)]);
  }
}
function hidePreviewError() { $('preview-error').classList.add('hidden'); }

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

/* ── Buzzer + export ────────────────────────────────────────────────────── */

function closeOutSession() {
  session.finalCode = { ...files };
  session.finalDom = reactMount
    ? (reactMount.innerHTML + vanillaMount.innerHTML).slice(0, 4000)
    : '';
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

  // Only worth showing if there was a plan to drift from.
  if (session.design) {
    $('diff-design').textContent = session.design;
    $('diff-built').textContent = files.jsx || '(nothing)';
    $('design-diff').classList.remove('hidden');
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
  stopLoops();
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

  $('design-submit-btn').onclick = () => { if (submitDesign()) enterPhase('code'); };
  $('design-review-btn').onclick = toggleDesignReview;

  ['p0', 'p1', 'p2'].forEach((g) => {
    $(`${g}-done`).onchange = (e) => {
      // Law #1, enforced instead of trusted: "Never start P1 before P0 works." It was on the honour
      // system, and the honour system is what the clock beats.
      if (e.target.checked && g !== 'p0' && !session.goals.p0) {
        e.target.checked = false;
        flashLaw('P0 first. Law #1 — P0 working beats everything.');
        return;
      }
      if (e.target.checked) session.goals[g] = t();
      else delete session.goals[g];

      if (g === 'p0') {
        $('css-warning').classList.toggle('hidden', !!e.target.checked);
        // Unticking P0 must re-gate everything it unlocked, or the gate is a one-way door he can
        // walk through once and leave open.
        if (!e.target.checked) {
          ['p1', 'p2'].forEach((x) => { $(`${x}-done`).checked = false; delete session.goals[x]; });
          hideAutocomplete();
        }
      }
    };
  });

  $('export-btn').onclick = exportSession;
  $('copy-btn').onclick = async () => {
    const s = collectReport();
    await navigator.clipboard.writeText(JSON.stringify(s, null, 2));
    $('copy-btn').textContent = 'Copied';
  };
}

/* Prism ships a single `keyword` token, but Dark+ splits it: `const`/`function`/`class` are blue,
 * while `return`/`if`/`for`/`await` are purple. Tag the control-flow half so the CSS can. */
const CONTROL_KEYWORDS = new Set([
  'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'break', 'continue',
  'throw', 'try', 'catch', 'finally', 'new', 'delete', 'typeof', 'instanceof', 'void',
  'import', 'export', 'from', 'as', 'await', 'async', 'yield'
]);
if (window.Prism) {
  Prism.hooks.add('wrap', (env) => {
    if (env.type === 'keyword' && CONTROL_KEYWORDS.has(env.content)) {
      env.classes.push('control-flow');
    }
  });
}

initSetup();
