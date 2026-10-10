/* event-loop-viz.js — interactive event loop visualizer for the Interview Q&A course.
   Usage: <div data-elviz></div> + <script src="../assets/event-loop-viz.js"></script>
   Each scenario is a tiny program; simulate() applies the real event-loop rules
   (sync → drain ALL microtasks → ONE task → drain → ...) and records a snapshot per step,
   so the visual is generated from the rules, not hand-drawn. */
(function () {
  "use strict";

  // ---------- scenarios ----------
  const L = (v, line) => ({ op: "log", v: String(v), line });
  const SCENARIOS = [
    {
      id: "basics",
      title: "1 · The basics",
      blurb: "One sync log, one timer, one promise, one more sync log.",
      code: [
        "console.log(1);",
        "setTimeout(() => console.log(2), 0);",
        "Promise.resolve().then(() => console.log(3));",
        "console.log(4);"
      ],
      program: [
        L(1, 0),
        { op: "timeout", delay: 0, line: 1, label: "timer → log 2", body: [L(2, 1)] },
        { op: "then", line: 2, label: "then → log 3", body: [L(3, 2)] },
        L(4, 3)
      ],
      expect: "1 4 3 2"
    },
    {
      id: "executor",
      title: "2 · The executor trap",
      blurb: "The function inside new Promise runs immediately. Most people get this one wrong.",
      code: [
        "setTimeout(() => console.log(1), 0);",
        "console.log(2);",
        "new Promise(res => {",
        "  console.log(3);",
        "  res();",
        "}).then(() => console.log(4));",
        "console.log(5);"
      ],
      program: [
        { op: "timeout", delay: 0, line: 0, label: "timer → log 1", body: [L(1, 0)] },
        L(2, 1),
        { op: "newPromise", line: 2, executor: [L(3, 3)], resolveLine: 4, thenLine: 5,
          then: { label: "then → log 4", body: [L(4, 5)] } },
        L(5, 6)
      ],
      expect: "2 3 5 4 1"
    },
    {
      id: "drain",
      title: "3 · Microtasks drain completely",
      blurb: "A microtask that queues another microtask still runs before the timer.",
      code: [
        "setTimeout(() => console.log(\"task\"), 0);",
        "Promise.resolve().then(() => {",
        "  console.log(\"m1\");",
        "  Promise.resolve().then(() => console.log(\"m2\"));",
        "});"
      ],
      program: [
        { op: "timeout", delay: 0, line: 0, label: "timer → log task", body: [L("task", 0)] },
        { op: "then", line: 1, label: "then → m1", body: [
          L("m1", 2),
          { op: "then", line: 3, label: "then → log m2", body: [L("m2", 3)] }
        ] }
      ],
      expect: "m1 m2 task"
    },
    {
      id: "pingpong",
      title: "4 · Tasks and microtasks queue each other",
      blurb: "After EVERY task, the microtask queue is drained before the next task.",
      code: [
        "setTimeout(() => {",
        "  console.log(1);",
        "  Promise.resolve().then(() => console.log(2));",
        "}, 0);",
        "setTimeout(() => console.log(3), 0);",
        "Promise.resolve().then(() => {",
        "  console.log(4);",
        "  setTimeout(() => console.log(5), 0);",
        "});"
      ],
      program: [
        { op: "timeout", delay: 0, line: 0, label: "timer A → 1", body: [
          L(1, 1),
          { op: "then", line: 2, label: "then → log 2", body: [L(2, 2)] }
        ] },
        { op: "timeout", delay: 0, line: 4, label: "timer B → log 3", body: [L(3, 4)] },
        { op: "then", line: 5, label: "then → 4", body: [
          L(4, 6),
          { op: "timeout", delay: 0, line: 7, label: "timer C → log 5", body: [L(5, 7)] }
        ] }
      ],
      expect: "4 1 2 3 5"
    },
    {
      id: "chains",
      title: "5 · Two promise chains interleave",
      blurb: "A second .then can't be queued until the first one has run.",
      code: [
        "Promise.resolve()",
        "  .then(() => console.log(\"A1\"))",
        "  .then(() => console.log(\"A2\"));",
        "Promise.resolve()",
        "  .then(() => console.log(\"B1\"))",
        "  .then(() => console.log(\"B2\"));"
      ],
      program: [
        { op: "chain", line: 0, links: [
          { label: "then → log A1", line: 1, body: [L("A1", 1)] },
          { label: "then → log A2", line: 2, body: [L("A2", 2)] }
        ] },
        { op: "chain", line: 3, links: [
          { label: "then → log B1", line: 4, body: [L("B1", 4)] },
          { label: "then → log B2", line: 5, body: [L("B2", 5)] }
        ] }
      ],
      expect: "A1 B1 A2 B2"
    },
    {
      id: "delays",
      title: "6 · Timers run by delay, not by order written",
      blurb: "Tasks queue in the order their timers FINISH.",
      code: [
        "setTimeout(() => console.log(\"t10\"), 10);",
        "setTimeout(() => console.log(\"t0\"), 0);",
        "Promise.resolve().then(() => console.log(\"p\"));",
        "console.log(\"s\");"
      ],
      program: [
        { op: "timeout", delay: 10, line: 0, label: "timer → log t10", body: [L("t10", 0)] },
        { op: "timeout", delay: 0, line: 1, label: "timer → log t0", body: [L("t0", 1)] },
        { op: "then", line: 2, label: "then → log p", body: [L("p", 2)] },
        L("s", 3)
      ],
      expect: "s p t0 t10"
    },
    {
      id: "blocking",
      title: "7 · A busy loop blocks a 0ms timer",
      blurb: "The timer finishes on time, but its callback can't run until the stack is empty.",
      code: [
        "setTimeout(() => console.log(\"timer\"), 0);",
        "const end = Date.now() + 100;",
        "while (Date.now() < end) {}   // busy for 100ms",
        "console.log(\"loop done\");"
      ],
      program: [
        { op: "timeout", delay: 0, line: 0, label: "timer → log timer", body: [L("timer", 0)] },
        { op: "busy", ms: 100, line: 2 },
        L("loop done", 3)
      ],
      expect: "loop done timer"
    },
    {
      id: "promisify",
      title: "8 · promisify: who calls whom",
      blurb: "Your promisify, step by step. Watch which function calls which, and with what arguments.",
      code: [
        "function promisify(fn) {",
        "  return function (...args) {",
        "    return new Promise((res, rej) => {",
        "      const mess = (err, result) => {",
        "        if (err) rej(err);",
        "        else res(result);",
        "      };",
        "      fn(...args, mess);",
        "    });",
        "  };",
        "}",
        "function getUser(id, cb) {",
        "  setTimeout(() => cb(null, { id }), 100);",
        "}",
        "const getUserP = promisify(getUser);",
        "getUserP(1).then(u => console.log(u.id));"
      ],
      program: [
        { op: "frame", name: "promisify(getUser)", line: 14,
          note: "<b>promisify</b> runs <b>once</b>. It builds a new function and returns it. It does <b>not</b> call getUser. " +
                "The new function remembers <b>fn = getUser</b> (a closure). After this line, forget promisify.", body: [] },
        { op: "frame", name: "getUserP(1)   args = [1]", line: 15,
          note: "Calling the <b>new function</b>. <b>...args</b> collects the arguments into an array: <b>args = [1]</b>.", body: [
          { op: "frame", name: "executor (res, rej) => {…}", line: 2,
            note: "<b>new Promise</b> runs the executor <b>right now</b>. It creates the messenger <b>mess</b>, which can use res and rej.", body: [
            { op: "frame", name: "getUser(1, mess)", line: 7,
              note: "The executor <b>dials the worker</b>. <b>fn(...args, mess)</b> spreads args back out and adds the messenger: " +
                    "it becomes <b>getUser(1, mess)</b>.", body: [
              { op: "timeout", delay: 100, line: 12, label: "timer → cb(null, {id:1})", body: [
                { op: "frame", name: "mess(null, {id: 1})", line: 3,
                  note: "getUser's timer <b>dials the messenger</b>: <b>cb(null, { id })</b>. Whoever writes the () fills in the blanks, " +
                        "so getUser chooses <b>err = null</b> and <b>result = {id: 1}</b>.", body: [
                  { op: "resolve", pid: "p", line: 5 }
                ] }
              ] }
            ] }
          ] }
        ] },
        { op: "note", line: 15, hi: null,
          text: "getUserP returned the Promise, but it is still <b>pending</b>, because getUser hasn't answered yet." },
        { op: "pendingThen", pid: "p", line: 15, label: "then → log u.id", body: [L(1, 15)] }
      ],
      expect: "1"
    },
    {
      id: "await",
      title: "9 · await pauses the function, not the program",
      blurb: "await stops f() only. The caller keeps going, and the rest of f() comes back later as a microtask.",
      code: [
        "async function f() {",
        "  console.log(1);",
        "  await null;",
        "  console.log(2);",
        "}",
        "f();",
        "console.log(3);"
      ],
      program: [
        { op: "async", name: "f()", line: 5, body: [L(1, 1), { op: "await", line: 2, what: "value" }, L(2, 3)] },
        L(3, 6)
      ],
      expect: "1 3 2"
    },
    {
      id: "await2",
      title: "10 · Two awaits (the classic output question)",
      blurb: "Each await splits the function. The second await waits on a timer, so the rest waits for a task.",
      code: [
        "async function foo() {",
        "  console.log(\"A\");",
        "  await Promise.resolve();",
        "  console.log(\"B\");",
        "  await new Promise(r => setTimeout(r, 0));",
        "  console.log(\"C\");",
        "}",
        "console.log(\"D\");",
        "foo();",
        "console.log(\"E\");"
      ],
      program: [
        L("D", 7),
        { op: "async", name: "foo()", line: 8, body: [
          L("A", 1),
          { op: "await", line: 2, what: "value" },
          L("B", 3),
          { op: "await", line: 4, what: "timer", delay: 0, label: "timer → r()" },
          L("C", 5)
        ] },
        L("E", 9)
      ],
      expect: "D A E B C"
    }
  ];

  // ---------- simulator ----------
  function simulate(sc) {
    const steps = [];
    const st = { stack: [], web: [], micro: [], tasks: [], out: [], now: 0, line: null, phase: "sync", seq: 0, prom: {} };
    const P = id => (st.prom[id] = st.prom[id] || { state: "pending", handlers: [] });

    function snap(note, hi) {
      steps.push({
        stack: st.stack.slice(),
        web: st.web.map(w => ({ label: w.label, due: w.due })),
        micro: st.micro.map(m => m.label),
        tasks: st.tasks.map(t => t.label),
        out: st.out.slice(),
        line: st.line, phase: st.phase, now: st.now, note, hi: hi || null
      });
    }

    function moveDueTimers() {
      const due = st.web.filter(w => w.due <= st.now).sort((a, b) => a.due - b.due || a.seq - b.seq);
      due.forEach(w => { st.web.splice(st.web.indexOf(w), 1); st.tasks.push({ label: w.label, body: w.body, fn: w.fn }); });
      return due.length;
    }

    function run(stmts) { stmts.forEach(exec); }

    // an async function runs synchronously until its first await, then hands the rest back later as a microtask
    function execAsync(name, stmts, i, resumed) {
      for (; i < stmts.length; i++) {
        const s = stmts[i];
        if (s.op !== "await") { exec(s); continue; }
        st.line = s.line;
        const next = i + 1;
        const resume = { label: "rest of " + name, fn: () => execAsync(name, stmts, next, true) };
        if (s.what === "value") {
          st.micro.push(resume);
          snap("<b>await</b> pauses <b>" + name + "</b>, and only this function. The awaited value is already ready, so the <b>rest of " +
               name + "</b> goes into the <b>microtask queue</b>. " + name + " <b>returns to its caller</b>, which keeps running.", "micro");
        } else {
          st.web.push({ label: s.label, due: st.now + s.delay, body: [], seq: st.seq++, fn: () => {
            st.micro.push(resume);
            snap("The timer calls <b>r()</b>, so the awaited Promise resolves. <b>Now</b> the rest of " + name +
                 " goes into the <b>microtask queue</b>.", "micro");
          } });
          snap("<b>await</b> pauses <b>" + name + "</b> on a Promise that a <b>timer</b> will resolve. The rest of the function waits " +
               "for that timer. " + name + " <b>returns to its caller</b>, which keeps running.", "web");
        }
        return;
      }
      if (resumed) { st.line = null; snap("The rest of <b>" + name + "</b> ran to the end. Its Promise is now fulfilled."); }
    }

    function exec(s) {
      st.line = s.line;
      switch (s.op) {
        case "log":
          st.stack.push("console.log(" + s.v + ")");
          st.out.push(s.v);
          snap("<b>console.log</b> runs right now, because it's synchronous. Output: <b>" + s.v + "</b>", "out");
          st.stack.pop();
          break;
        case "timeout":
          st.stack.push("setTimeout(…, " + s.delay + ")");
          st.web.push({ label: s.label, due: st.now + s.delay, body: s.body, seq: st.seq++ });
          snap("<b>setTimeout</b> hands the timer to the browser (<b>Web APIs</b>) and returns immediately. " +
               "JavaScript does <b>not</b> wait " + s.delay + "ms.", "web");
          st.stack.pop();
          break;
        case "then":
          st.stack.push("Promise.resolve().then(…)");
          st.micro.push({ label: s.label, body: s.body });
          snap("The Promise is already resolved, so <b>.then</b> puts its callback in the <b>microtask queue</b>. " +
               "It can't run yet, because the call stack is busy.", "micro");
          st.stack.pop();
          break;
        case "chain": {
          const [first, ...rest] = s.links;
          st.stack.push("Promise.resolve().then(…).then(…)");
          st.micro.push({ label: first.label, body: first.body, rest });
          snap("Only the <b>first .then</b> is queued, because its Promise is already resolved. The second .then is waiting " +
               "on the <b>new Promise</b> that the first .then returns. That Promise isn't resolved until the first callback runs.", "micro");
          st.stack.pop();
          break;
        }
        case "newPromise":
          st.stack.push("new Promise(…)");
          st.stack.push("executor (res => {…})");
          snap("<b>new Promise</b> runs the executor <b>right now, synchronously</b>. This is the trap: " +
               "the executor is not async.", "stack");
          run(s.executor);
          st.line = s.resolveLine;
          snap("<b>res()</b> is called, so the Promise is now <b>fulfilled</b>. Nothing is listening yet.");
          st.stack.pop();
          st.line = s.thenLine;
          st.micro.push({ label: s.then.label, body: s.then.body });
          snap("<b>.then</b> is attached to an already-fulfilled Promise, so its callback goes into the <b>microtask queue</b>.", "micro");
          st.stack.pop();
          break;
        case "async":
          st.stack.push(s.name);
          snap("Calling the <b>async function " + s.name + "</b>. It starts running <b>right now, synchronously</b>, " +
               "like any function, until it reaches an await.", "stack");
          execAsync(s.name, s.body, 0, false);
          st.line = s.line;
          st.stack.pop();
          break;
        case "frame":
          st.stack.push(s.name);
          snap(s.note, "stack");
          run(s.body);
          st.line = s.line;
          st.stack.pop();
          break;
        case "note":
          snap(s.text, s.hi || null);
          break;
        case "pendingThen": {
          const pr = P(s.pid);
          st.stack.push(".then(…)");
          if (pr.state === "fulfilled") {
            st.micro.push({ label: s.label, body: s.body });
            snap("The Promise is already fulfilled, so <b>.then</b> queues its callback as a <b>microtask</b>.", "micro");
          } else {
            pr.handlers.push({ label: s.label, body: s.body });
            snap("The Promise is still <b>pending</b>, so <b>.then</b> only <b>registers</b> the callback. Nothing is queued yet: " +
                 "it waits for <b>res()</b> to be called.");
          }
          st.stack.pop();
          break;
        }
        case "resolve": {
          const pr = P(s.pid);
          st.stack.push("res(result)");
          pr.state = "fulfilled";
          const n = pr.handlers.length;
          pr.handlers.splice(0).forEach(h => st.micro.push(h));
          snap("The messenger calls <b>res(result)</b>, so the Promise is now <b>fulfilled</b>." +
               (n ? " The .then callback that was waiting goes into the <b>microtask queue</b>." : ""), n ? "micro" : null);
          st.stack.pop();
          break;
        }
        case "busy": {
          st.stack.push("while (…) {}  busy " + s.ms + "ms");
          snap("A busy loop starts. The call stack is occupied, so <b>nothing else can run</b>: no timers, no clicks, no repaint.", "stack");
          st.now += s.ms;
          const moved = moveDueTimers();
          snap(s.ms + "ms pass. " + (moved ? "The timer <b>finished on time</b> in the background, and its callback moved to the " +
               "<b>task queue</b>. But it has to wait, because the stack is <b>still busy</b>." : "The loop is still running."), moved ? "tasks" : null);
          st.stack.pop();
          break;
        }
      }
    }

    function drain() {
      if (!st.micro.length) return;
      st.phase = "micro";
      while (st.micro.length) {
        const m = st.micro.shift();
        st.stack.push(m.label);
        st.line = null;
        snap("The call stack is empty, so the event loop runs <b>microtasks first, all of them</b>. Running: <b>" + m.label + "</b>", "stack");
        if (m.fn) m.fn(); else run(m.body);
        st.line = null;
        st.stack.pop();
        if (m.rest && m.rest.length) {
          const [n, ...r] = m.rest;
          st.micro.push({ label: n.label, body: n.body, rest: r });
          st.line = n.line;
          snap("That callback finished, so the Promise its .then returned is now fulfilled. The <b>next .then</b> in the chain " +
               "joins the <b>back</b> of the microtask queue.", "micro");
        }
      }
      st.line = null;
      snap("The microtask queue is <b>empty</b>. Only now can a task run.");
    }

    // the script itself is the first task
    st.phase = "sync";
    st.stack.push("script (global)");
    snap("The whole script is the <b>first task</b>. It goes on the call stack and runs top to bottom.", "stack");
    run(sc.program);
    st.line = null;
    st.stack.pop();
    snap("The script has finished, and the <b>call stack is empty</b>. Now the <b>event loop</b> takes over.");
    drain();

    while (st.tasks.length || st.web.length) {
      if (!st.tasks.length) {
        st.phase = "wait";
        const next = Math.min.apply(null, st.web.map(w => w.due));
        if (next > st.now) st.now = next;
        const n = moveDueTimers();
        snap("Nothing is ready to run, so the loop waits. At <b>" + st.now + "ms</b> " + (n > 1 ? n + " timers finish" : "a timer finishes") +
             ", and " + (n > 1 ? "their callbacks move" : "its callback moves") + " to the <b>task queue</b>" +
             (n > 1 ? ", in order." : "."), "tasks");
      }
      const t = st.tasks.shift();
      st.phase = "task";
      st.stack.push(t.label);
      st.line = null;
      snap("The event loop takes <b>ONE</b> task from the front of the task queue and runs it: <b>" + t.label + "</b>", "stack");
      if (t.fn) t.fn(); else run(t.body);
      st.line = null;
      st.stack.pop();
      if (st.micro.length) {
        snap("That task is done. <b>Before the next task</b>, the event loop drains the microtask queue again.");
        drain();
      } else if (st.tasks.length || st.web.length) {
        snap("That task is done. There are no microtasks, so the loop goes to the next task.");
      }
    }
    st.phase = "done";
    st.line = null;
    snap("Everything is empty. Final output: <b>" + st.out.join(" ") + "</b>");
    return steps;
  }

  // ---------- styles ----------
  const CSS = `
  .elv { position: relative; left: 50%; transform: translateX(-50%); width: min(64rem, calc(100vw - 2.8rem));
    font-family: var(--sans); font-size: 0.9rem; line-height: 1.45; margin: 1.6rem 0 2rem;
    background: var(--bg-raise); border: 1px solid var(--rule); border-radius: 10px; padding: 1rem; }
  .elv:focus { outline: 2px solid color-mix(in srgb, var(--accent) 50%, transparent); outline-offset: 2px; }
  .elv-scen { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.6rem; }
  .elv button { font-family: var(--sans); font-size: 0.82rem; color: var(--ink); background: var(--bg-sink);
    border: 1px solid var(--rule); border-radius: 6px; padding: 0.35rem 0.65rem; cursor: pointer; }
  .elv button:hover { border-color: var(--accent); }
  .elv button[aria-pressed="true"] { border-color: var(--accent); color: var(--accent); }
  .elv button:disabled { opacity: 0.4; cursor: default; }
  .elv-blurb { color: var(--ink-soft); margin: 0 0 0.7rem; }
  .elv-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; margin-bottom: 0.6rem; }
  .elv-count { color: var(--ink-faint); font-size: 0.8rem; margin-left: auto; }
  .elv-speed { font-family: var(--sans); background: var(--bg-sink); color: var(--ink); border: 1px solid var(--rule);
    border-radius: 6px; padding: 0.3rem; font-size: 0.8rem; }
  .elv-note { display: flex; gap: 0.7rem; align-items: flex-start; background: var(--bg-sink); border-radius: 8px;
    padding: 0.7rem 0.85rem; margin-bottom: 0.8rem; min-height: 3.4rem; }
  .elv-phase { flex: none; font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 700;
    border-radius: 999px; padding: 0.2rem 0.6rem; color: var(--bg); white-space: nowrap; margin-top: 0.1rem; }
  .elv-phase.sync { background: var(--accent); } .elv-phase.micro { background: var(--good); }
  .elv-phase.task { background: var(--accent-2); } .elv-phase.wait { background: var(--ink-faint); }
  .elv-phase.done { background: var(--ink-soft); }
  .elv-text b { color: #fff; }
  .elv-grid { display: grid; gap: 0.6rem;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-areas: "code code stack web" "micro micro task task" "out out out out"; }
  .elv-panel { background: var(--bg-sink); border: 1px solid var(--rule); border-radius: 8px; padding: 0.55rem 0.65rem; min-width: 0; }
  .elv-h { font-size: 0.66rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-faint); margin: 0 0 0.4rem;
    display: flex; justify-content: space-between; gap: 0.4rem; }
  .elv-code { grid-area: code; } .elv-stack { grid-area: stack; } .elv-web { grid-area: web; }
  .elv-micro { grid-area: micro; border-color: color-mix(in srgb, var(--good) 45%, var(--rule)); }
  .elv-task { grid-area: task; border-color: color-mix(in srgb, var(--accent-2) 45%, var(--rule)); }
  .elv-out { grid-area: out; }
  .elv-lines { font-family: var(--mono); font-size: 0.78rem; white-space: pre; overflow-x: auto; font-variant-ligatures: none; }
  .elv-item, .elv-console { font-variant-ligatures: none; }
  .elv-lines div { padding: 0.05rem 0.4rem; border-left: 3px solid transparent; color: var(--ink-soft); }
  .elv-lines div.cur { border-left-color: var(--accent); background: color-mix(in srgb, var(--accent) 14%, transparent); color: #fff; }
  .elv-stackbox { display: flex; flex-direction: column-reverse; gap: 0.3rem; min-height: 6rem; justify-content: flex-start; }
  .elv-item { font-family: var(--mono); font-size: 0.74rem; border-radius: 5px; padding: 0.3rem 0.45rem;
    background: var(--bg-raise); border: 1px solid var(--rule); overflow-wrap: anywhere; }
  .elv-stack .elv-item:last-child { border-color: var(--accent); }
  .elv-row { display: flex; flex-wrap: wrap; gap: 0.35rem; min-height: 2rem; align-items: center; }
  .elv-micro .elv-item { border-color: color-mix(in srgb, var(--good) 55%, var(--rule)); }
  .elv-task .elv-item { border-color: color-mix(in srgb, var(--accent-2) 55%, var(--rule)); }
  .elv-row .elv-item:first-child::before { content: "next → "; color: var(--ink-faint); font-family: var(--sans); font-size: 0.68rem; }
  .elv-web .elv-item { display: block; margin-bottom: 0.3rem; }
  .elv-web small { color: var(--ink-faint); font-family: var(--sans); }
  .elv-empty { color: var(--ink-faint); font-style: italic; font-size: 0.8rem; }
  .elv-console { font-family: var(--mono); font-size: 0.85rem; display: flex; flex-wrap: wrap; gap: 0.5rem; min-height: 1.6rem; }
  .elv-console span { background: var(--bg-raise); border-radius: 4px; padding: 0.05rem 0.45rem; }
  .elv-new { animation: elvpop 0.6s ease-out; }
  @keyframes elvpop { from { transform: scale(1.12); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 45%, transparent); } to { transform: none; box-shadow: none; } }
  @media (prefers-reduced-motion: reduce) { .elv-new { animation: none; } }
  .elv-legend { color: var(--ink-faint); font-size: 0.78rem; margin: 0.7rem 0 0; }
  .elv-legend b { font-weight: 600; } .elv-legend .g { color: var(--good); } .elv-legend .o { color: var(--accent-2); } .elv-legend .bl { color: var(--accent); }
  .elv-predict { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; margin-top: 0.7rem; }
  .elv-predict input { font-family: var(--mono); font-size: 0.85rem; background: var(--bg-sink); color: var(--ink);
    border: 1px solid var(--rule); border-radius: 6px; padding: 0.35rem 0.5rem; flex: 1 1 12rem; min-width: 0; }
  .elv-verdict { font-size: 0.85rem; }
  .elv-verdict.ok { color: var(--good); } .elv-verdict.no { color: var(--bad); }
  @media (max-width: 720px) {
    .elv-grid { grid-template-columns: 1fr 1fr; grid-template-areas: "code code" "stack web" "micro micro" "task task" "out out"; }
  }
  @media (max-width: 460px) {
    .elv-grid { grid-template-columns: 1fr; grid-template-areas: "code" "stack" "web" "micro" "task" "out"; }
  }`;

  // ---------- UI ----------
  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  const PHASE = { sync: "Running sync code", micro: "Draining microtasks", task: "Running one task", wait: "Waiting for a timer", done: "Done" };

  function mount(root) {
    root.classList.add("elv");
    root.tabIndex = 0;
    root.setAttribute("aria-label", "Event loop visualizer. Left and right arrow keys step, space plays.");

    const scen = el("div", "elv-scen");
    const blurb = el("p", "elv-blurb");
    const bar = el("div", "elv-bar");
    const bReset = el("button", null, "⏮ Reset"), bBack = el("button", null, "◀ Back"),
          bStep = el("button", null, "Step ▶"), bPlay = el("button", null, "▶ Play");
    const speed = el("select", "elv-speed");
    [["Slow", 2400], ["Normal", 1500], ["Fast", 700]].forEach(([t, v], i) => {
      const o = el("option", null, t); o.value = v; if (i === 1) o.selected = true; speed.appendChild(o);
    });
    speed.setAttribute("aria-label", "Playback speed");
    const count = el("span", "elv-count");
    bar.append(bReset, bBack, bStep, bPlay, speed, count);

    const note = el("div", "elv-note");
    const phase = el("span", "elv-phase");
    const text = el("div", "elv-text");
    text.setAttribute("aria-live", "polite");
    note.append(phase, text);

    const grid = el("div", "elv-grid");
    function panel(cls, title, right) {
      const p = el("section", "elv-panel " + cls);
      const h = el("p", "elv-h"); h.append(el("span", null, title));
      const r = el("span", null, right || ""); h.append(r);
      p.append(h); grid.append(p); return { p, r };
    }
    const pCode = panel("elv-code", "Code"); const lines = el("div", "elv-lines"); pCode.p.append(lines);
    const pStack = panel("elv-stack", "Call stack", "top = now"); const stackBox = el("div", "elv-stackbox"); pStack.p.append(stackBox);
    const pWeb = panel("elv-web", "Web APIs"); const webBox = el("div"); pWeb.p.append(webBox);
    const pMicro = panel("elv-micro", "Microtask queue", "promises · runs ALL, first"); const microBox = el("div", "elv-row"); pMicro.p.append(microBox);
    const pTask = panel("elv-task", "Task queue", "timers · runs ONE per turn"); const taskBox = el("div", "elv-row"); pTask.p.append(taskBox);
    const pOut = panel("elv-out", "Console output"); const outBox = el("div", "elv-console"); pOut.p.append(outBox);

    const legend = el("p", "elv-legend");
    legend.innerHTML = "The rule: run the <b class='bl'>sync code</b> until the stack is empty → run <b class='g'>every microtask</b> → run <b class='o'>one task</b> → drain microtasks again → repeat.";

    const predict = el("div", "elv-predict");
    const pin = el("input"); pin.placeholder = "Predict the output first, e.g. 1 4 3 2"; pin.setAttribute("aria-label", "Your predicted output");
    const pbtn = el("button", null, "Check my prediction");
    const pv = el("span", "elv-verdict");
    predict.append(pin, pbtn, pv);

    root.append(scen, blurb, bar, note, grid, legend, predict);

    let sc, steps, i = 0, timer = null;

    function item(txt, isNew) { const d = el("div", "elv-item" + (isNew ? " elv-new" : ""), txt); return d; }
    function fill(box, arr, hiArea, area, emptyTxt) {
      box.replaceChildren();
      if (!arr.length) { box.append(el("span", "elv-empty", emptyTxt)); return; }
      arr.forEach((t, k) => box.append(item(t, hiArea === area && k === arr.length - 1)));
    }

    function render() {
      const s = steps[i];
      [...lines.children].forEach((d, k) => d.classList.toggle("cur", k === s.line));
      fill(stackBox, s.stack, s.hi, "stack", "empty");
      webBox.replaceChildren();
      if (!s.web.length) webBox.append(el("span", "elv-empty", "no timers running"));
      s.web.forEach((w, k) => {
        const d = item(w.label, s.hi === "web" && k === s.web.length - 1);
        d.append(document.createElement("br"), el("small", null, "fires at " + w.due + "ms"));
        webBox.append(d);
      });
      pWeb.r.textContent = "time: " + s.now + "ms";
      fill(microBox, s.micro, s.hi, "micro", "empty");
      fill(taskBox, s.tasks, s.hi, "tasks", "empty");
      outBox.replaceChildren();
      if (!s.out.length) outBox.append(el("span", "elv-empty", "nothing yet"));
      s.out.forEach((o, k) => { const sp = el("span", s.hi === "out" && k === s.out.length - 1 ? "elv-new" : null, o); outBox.append(sp); });
      phase.className = "elv-phase " + s.phase;
      phase.textContent = PHASE[s.phase];
      text.innerHTML = s.note;
      count.textContent = "step " + (i + 1) + " / " + steps.length;
      bBack.disabled = i === 0;
      bStep.disabled = i === steps.length - 1;
      if (i === steps.length - 1) stop();
    }

    function stop() { if (timer) { clearInterval(timer); timer = null; } bPlay.textContent = "▶ Play"; }
    function play() {
      if (timer) { stop(); return; }
      if (i === steps.length - 1) i = 0;
      bPlay.textContent = "⏸ Pause";
      timer = setInterval(() => { if (i < steps.length - 1) { i++; render(); } else stop(); }, +speed.value);
    }

    function load(s) {
      stop();
      sc = s; steps = simulate(s); i = 0;
      [...scen.children].forEach(b => b.setAttribute("aria-pressed", String(b.dataset.id === s.id)));
      blurb.textContent = s.blurb;
      lines.replaceChildren(...s.code.map(c => el("div", null, c)));
      pin.value = ""; pv.textContent = ""; pv.className = "elv-verdict";
      render();
    }

    const ids = (root.dataset.elviz || "").split(",").map(x => x.trim()).filter(Boolean);
    const list = ids.length ? ids.map(id => SCENARIOS.find(x => x.id === id)).filter(Boolean) : SCENARIOS;
    list.forEach((s, k) => {
      const b = el("button", null, (k + 1) + " · " + s.title.replace(/^\d+ · /, "")); b.dataset.id = s.id;
      b.addEventListener("click", () => load(s));
      scen.append(b);
    });
    bReset.addEventListener("click", () => { stop(); i = 0; render(); });
    bBack.addEventListener("click", () => { stop(); if (i > 0) { i--; render(); } });
    bStep.addEventListener("click", () => { stop(); if (i < steps.length - 1) { i++; render(); } });
    bPlay.addEventListener("click", play);
    speed.addEventListener("change", () => { if (timer) { stop(); play(); } });
    pbtn.addEventListener("click", () => {
      const norm = v => v.replace(/[,"'`]/g, " ").trim().split(/\s+/).join(" ");
      const final = steps[steps.length - 1].out.join(" ");
      if (!pin.value.trim()) { pv.textContent = "Type your prediction first."; pv.className = "elv-verdict"; return; }
      const ok = norm(pin.value) === final;
      pv.textContent = ok ? "✓ Correct: " + final : "✗ Not quite. Step through it to see why.";
      pv.className = "elv-verdict " + (ok ? "ok" : "no");
    });
    root.addEventListener("keydown", e => {
      if (e.target === pin || e.target === speed) return;
      if (e.key === "ArrowRight") { e.preventDefault(); bStep.click(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); bBack.click(); }
      else if (e.key === " ") { e.preventDefault(); play(); }
    });

    load(list[0]);
  }

  function init() {
    if (!document.getElementById("elv-css")) {
      const st = document.createElement("style"); st.id = "elv-css"; st.textContent = CSS; document.head.appendChild(st);
    }
    document.querySelectorAll("[data-elviz]").forEach(mount);
  }
  // exposed for verification
  window.__elviz = { SCENARIOS, simulate };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
