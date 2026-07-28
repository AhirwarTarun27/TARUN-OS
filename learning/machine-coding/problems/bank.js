/**
 * The Phase 1 problem bank.
 *
 * Loaded by the lab via a plain <script> tag — NOT fetch(). A file:// page cannot fetch() a local
 * JSON file (Chrome blocks it), but a classic script tag loads fine. That's why this is .js and not
 * .json, and it's why the lab stays a double-click-and-go page with no local server to run.
 *
 * Every problem is deliberately VAGUE in `prompt`. The real requirements live in
 * `hiddenRequirements` and are revealed ONLY if he asks for them in the CLARIFY phase. What he never
 * asks, he never learns — and at the buzzer he sees exactly what he missed. That's how the clarify
 * muscle gets trained with no interviewer in the room.
 *
 * Every problem's LAST hidden requirement answers "what must work if I run out of time?" — the best
 * question in the round, because it makes the interviewer hand you the P0 themselves.
 */

window.MC_PROBLEMS = [
  {
    slug: "counter",
    title: "Counter",
    phase: 1,
    order: 1,
    targetMinutes: 15,
    mode: "react",
    prompt: "Build a counter.",
    // No controlled input anywhere in a counter — this said `controlled-input-react` until
    // 2026-07-28, which would have credited the profile with a primitive the problem never trains.
    // What it actually trains: count lives in the parent, the buttons live in the child.
    primitives: ["lifting-state", "derived-state"],
    teaches:
      "The bounds are DERIVED (count === max), not stored. If you add an `isMaxed` state, that's the bug this problem exists to find.",
    hiddenRequirements: [
      { keywords: ["start", "initial", "begin", "default"], answer: "Starts at 0." },
      { keywords: ["step", "increment by", "how much"], answer: "Step of 1." },
      { keywords: ["min", "max", "limit", "bound", "negative", "range"], answer: "Min 0, max 10. The buttons should disable at the bounds." },
      { keywords: ["reset"], answer: "Yes, a reset button. P1." },
      { keywords: ["persist", "refresh", "storage", "reload"], answer: "No persistence needed." },
      { keywords: ["style", "css", "design", "look", "pretty"], answer: "Unstyled is fine. Function over form." },
      { keywords: ["run out of time", "most important", "must work", "priority", "p0", "one thing"], answer: "Plus and minus updating a number on screen. That's it." }
    ],
    p0: ["A number is displayed", "A + button increments it", "A − button decrements it"],
    p1: ["Reset button", "+ disabled at max (10), − disabled at min (0)"],
    p2: ["Step size configurable via a prop", "ArrowUp / ArrowDown keyboard support"]
  },

  {
    slug: "star-rating",
    title: "Star Rating",
    phase: 1,
    order: 2,
    targetMinutes: 20,
    mode: "react",
    prompt: "Build a star rating component.",
    primitives: ["list-render", "controlled-input-react", "derived-state"],
    teaches:
      "Two pieces of state (committed rating + hover rating) and the display is derived from both: `hover || rating`. Most people try to do it with one and get stuck.",
    hiddenRequirements: [
      { keywords: ["how many", "number of stars", "count", "five", "5"], answer: "5 stars." },
      { keywords: ["hover", "preview", "mouse over"], answer: "Yes — hovering previews the rating without committing it. P1." },
      { keywords: ["half", "decimal", "fraction", "0.5"], answer: "Whole stars only." },
      { keywords: ["clear", "reset", "unset", "deselect", "same star"], answer: "Clicking the currently selected star clears it back to 0. P2." },
      { keywords: ["readonly", "read only", "disabled"], answer: "Not needed." },
      { keywords: ["icon", "image", "svg", "library", "character"], answer: "Use the ★ and ☆ characters. Do not go hunting for an icon library." },
      { keywords: ["persist", "storage", "refresh"], answer: "No." },
      { keywords: ["accessib", "a11y", "keyboard", "screen reader"], answer: "Nice to have. P2." },
      { keywords: ["run out of time", "most important", "must work", "priority", "p0", "one thing"], answer: "Click a star, the rating sets, and the stars fill up to it." }
    ],
    p0: ["5 stars render", "Clicking star N fills stars 1 through N", "The current rating is visible as a number"],
    p1: ["Hover previews the rating", "Mouse-out reverts to the committed rating"],
    p2: ["Clicking the selected star clears it to 0", "Keyboard accessible"]
  },

  {
    slug: "accordion",
    title: "Accordion",
    phase: 1,
    order: 3,
    targetMinutes: 25,
    mode: "react",
    prompt: "Build an accordion.",
    primitives: ["list-render", "derived-state"],
    teaches:
      "Store ONE `openIndex`, not an `isOpen` boolean on every item. If you store a flag per item you now have to close the others by hand, and that's a bug factory. This is the derived-state lesson in its purest form.",
    hiddenRequirements: [
      { keywords: ["how many", "items", "sections", "data", "content"], answer: "Hard-code 4 sections. Each has a title and a paragraph of body text." },
      { keywords: ["multiple", "one at a time", "single", "simultaneous", "more than one"], answer: "Only ONE section open at a time. Opening a new one closes the previous. (This is the whole problem.)" },
      { keywords: ["all closed", "default", "initial", "start", "first"], answer: "All closed on mount." },
      { keywords: ["animate", "transition", "slide", "smooth"], answer: "Not required. P2." },
      { keywords: ["nested", "nesting"], answer: "No nesting." },
      { keywords: ["indicator", "arrow", "chevron", "icon"], answer: "A ▸ / ▾ indicator would be good. P1." },
      { keywords: ["run out of time", "most important", "must work", "priority", "p0", "one thing"], answer: "Click a header, its body shows. Click another header, the first one closes." }
    ],
    p0: ["4 section headers render", "Clicking a header reveals that section's body", "Opening one closes the previously open one"],
    p1: ["Clicking an already-open header closes it (all closed)", "A ▸ / ▾ open-state indicator"],
    p2: ["Smooth height transition", "Enter/Space toggles, arrow keys move between headers"]
  },

  {
    slug: "tabs",
    title: "Tabs",
    phase: 1,
    order: 4,
    targetMinutes: 20,
    mode: "react",
    prompt: "Build a tabs component.",
    primitives: ["list-render", "derived-state", "keyboard-nav"],
    teaches:
      "Render ONLY the active panel. Rendering all three and hiding two with `display:none` is the lazy version and an interviewer will ask you about it.",
    hiddenRequirements: [
      { keywords: ["how many", "tabs", "data", "content"], answer: "3 tabs, hard-coded. Each has a label and some body content." },
      { keywords: ["default", "initial", "first", "active on load"], answer: "First tab active on mount." },
      { keywords: ["lazy", "mount", "unmount", "hide", "display none", "keep alive"], answer: "Only render the ACTIVE tab's content. Don't render all three and hide with CSS." },
      { keywords: ["url", "route", "hash", "query", "link"], answer: "Not needed." },
      { keywords: ["keyboard", "arrow"], answer: "P2. Arrow keys move between tabs if there's time." },
      { keywords: ["style", "active", "highlight", "underline"], answer: "The active tab must look visibly different. Anything is fine — a border, a background, bold." },
      { keywords: ["run out of time", "most important", "must work", "priority", "p0", "one thing"], answer: "Click a tab, its content shows, and the active tab looks active." }
    ],
    p0: ["3 tab headers render", "Clicking a tab shows its content", "The active tab is visually distinct"],
    p1: ["Only the active panel is in the DOM (not CSS-hidden)"],
    p2: ["Arrow-key navigation", "ARIA roles: tablist / tab / tabpanel"]
  },

  {
    slug: "stopwatch",
    title: "Stopwatch",
    phase: 1,
    order: 5,
    targetMinutes: 25,
    mode: "react",
    prompt: "Build a stopwatch.",
    primitives: ["timer-cleanup", "useeffect-cleanup", "derived-state"],
    teaches:
      "Timer drift. If you do `setElapsed(e => e + 10)` every 10ms you will be wrong within seconds, because intervals are not precise. Store the START TIMESTAMP and compute `Date.now() - start`. Interviewers watch for exactly this.",
    hiddenRequirements: [
      { keywords: ["format", "display", "millisecond", "precision", "show"], answer: "mm:ss:ms — show hundredths of a second." },
      { keywords: ["button", "control", "start", "stop", "pause", "resume", "reset"], answer: "Start, Pause, Reset. Start becomes Pause while it's running." },
      { keywords: ["accurate", "drift", "precise", "exact", "interval"], answer: "Excellent question. Use a timestamp delta — do NOT accumulate +10ms per tick, it drifts badly." },
      { keywords: ["lap", "split"], answer: "P2. Only if there's time." },
      { keywords: ["persist", "refresh", "storage"], answer: "No." },
      { keywords: ["cleanup", "unmount", "leak"], answer: "Yes — the interval must be cleared. I will look for this." },
      { keywords: ["run out of time", "most important", "must work", "priority", "p0", "one thing"], answer: "Hit start, the number counts up. Hit pause, it stops." }
    ],
    p0: ["Start begins counting", "Elapsed time is displayed and visibly updating", "Pause stops it", "Reset zeroes it"],
    p1: ["Correct zero-padded mm:ss:ms formatting", "Start toggles to Pause while running", "No drift (timestamp-based)"],
    p2: ["Lap times", "Interval cleaned up on unmount"]
  },

  {
    slug: "todo-list",
    title: "Todo List",
    phase: 1,
    order: 6,
    targetMinutes: 30,
    mode: "react",
    prompt: "Build a todo list.",
    primitives: ["list-crud", "controlled-input-react", "localstorage"],
    teaches:
      "Immutable list updates. `map` to toggle, `filter` to delete, spread to add. If you `push` into state, nothing re-renders and you'll waste five minutes wondering why.",
    hiddenRequirements: [
      { keywords: ["persist", "refresh", "storage", "reload", "survive"], answer: "Yes — it must survive a page refresh. localStorage. P1." },
      { keywords: ["edit", "rename", "update", "change text"], answer: "P1. Double-click to edit inline." },
      { keywords: ["delete", "remove"], answer: "Yes. P0." },
      { keywords: ["toggle", "complete", "done", "check"], answer: "Yes — click to toggle done, with a visual strike-through. P0." },
      { keywords: ["filter", "all", "active", "completed", "tab"], answer: "P2." },
      { keywords: ["empty", "no todos", "blank", "validation"], answer: "Two things: show an empty state when the list is empty, AND don't let them add a blank todo. Both P1." },
      { keywords: ["backend", "api", "server", "database"], answer: "No backend. Local only." },
      { keywords: ["count", "remaining", "left"], answer: "P1 — show how many are left." },
      { keywords: ["run out of time", "most important", "must work", "priority", "p0", "one thing"], answer: "Add a todo, see it in the list, toggle it done, delete it." }
    ],
    p0: ["Typing + submit adds a todo", "Todos render in a list", "Clicking toggles complete, with a strike-through", "Delete removes it"],
    p1: ["Persists to localStorage across refresh", "Empty state message", "Rejects a blank todo", "Remaining count"],
    p2: ["Inline edit on double-click", "Filter: all / active / completed"]
  },

  {
    slug: "search-filter",
    title: "Searchable List",
    phase: 1,
    order: 7,
    targetMinutes: 25,
    mode: "react",
    prompt: "Build a searchable list.",
    primitives: ["controlled-input-react", "derived-state", "list-render"],
    teaches:
      "NEVER store `filteredItems` in state. The filtered list is DERIVED from (items, query) — compute it during render. Storing it means keeping two things in sync forever, and that is the single most common structural bug in this round.",
    hiddenRequirements: [
      { keywords: ["data", "items", "how many", "source", "api", "list"], answer: "A hard-coded array of ~20 country names. No API." },
      { keywords: ["debounce", "throttle", "delay"], answer: "Not needed — and think about why. Debounce protects a NETWORK call. Filtering a 20-item array is instant." },
      { keywords: ["case", "sensitive", "lowercase"], answer: "Case-insensitive." },
      { keywords: ["match", "start", "contain", "fuzzy", "substring"], answer: "Substring match anywhere in the name is fine." },
      { keywords: ["empty", "no result", "nothing found", "not found"], answer: "Yes — show a 'no results' message. This is the state everybody forgets. P1." },
      { keywords: ["clear", "reset", "x button"], answer: "P1 — a clear (×) button." },
      { keywords: ["highlight", "bold", "mark"], answer: "P2." },
      { keywords: ["run out of time", "most important", "must work", "priority", "p0", "one thing"], answer: "Type in the box, the list narrows to matching items." }
    ],
    p0: ["~20 items render", "Typing filters the list, case-insensitively", "Clearing the box restores the full list"],
    p1: ["'No results' empty state", "A clear (×) button"],
    p2: ["Highlight the matched substring", "Show a result count"]
  },

  {
    slug: "progress-bar",
    title: "Progress Bar",
    phase: 1,
    order: 8,
    targetMinutes: 20,
    mode: "react",
    prompt: "Build a progress bar.",
    primitives: ["timer-cleanup", "useeffect-cleanup", "derived-state"],
    teaches:
      "The runaway interval. When it hits 100% you must actually CLEAR the interval — not just stop updating the number. An interval that keeps firing forever is a real bug an interviewer will catch.",
    hiddenRequirements: [
      { keywords: ["auto", "animate", "fill", "manual", "control", "how does it"], answer: "It fills automatically from 0 to 100 over about 5 seconds when you hit Start." },
      { keywords: ["percent", "label", "number", "text"], answer: "Yes, show the percentage as text." },
      { keywords: ["complete", "done", "finish", "100"], answer: "At 100% it stops and shows a 'Done' state. The interval must actually be cleared." },
      { keywords: ["pause", "stop", "reset"], answer: "P1." },
      { keywords: ["multiple", "many", "stack", "several"], answer: "P2 — several independent bars running at once." },
      { keywords: ["transition", "smooth", "css", "jumpy"], answer: "P2 — a CSS transition rather than jumpy steps." },
      { keywords: ["run out of time", "most important", "must work", "priority", "p0", "one thing"], answer: "Hit start, a bar visibly fills to 100%." }
    ],
    p0: ["A bar visually fills from 0 to 100%", "Start kicks it off", "The percentage shows as text"],
    p1: ["It stops cleanly at 100% and clears the interval", "Pause / Reset"],
    p2: ["Multiple independent bars", "Smooth CSS transition"]
  },

  {
    slug: "traffic-light",
    title: "Traffic Light",
    phase: 1,
    order: 9,
    targetMinutes: 25,
    mode: "react",
    prompt: "Build a traffic light.",
    primitives: ["timer-cleanup", "useeffect-cleanup", "usereducer"],
    teaches:
      "Drive it from a config array — `[{color:'green', ms:3000}, ...]` — and the whole thing becomes `next = (i + 1) % lights.length`. The switch-statement version works but doesn't scale, and the config version is what separates a 6 from an 8.",
    hiddenRequirements: [
      { keywords: ["timing", "duration", "how long", "second", "ms"], answer: "Green 3s → Yellow 1s → Red 4s → back to Green. Loops forever." },
      { keywords: ["order", "sequence", "cycle", "which"], answer: "Green → Yellow → Red → Green. Standard cycle." },
      { keywords: ["manual", "button", "click", "next", "skip"], answer: "P1 — a button that forces the next light and resets the timer." },
      { keywords: ["pause", "stop"], answer: "P2." },
      { keywords: ["config", "prop", "configurable", "hardcode", "array"], answer: "P2, but it's the elegant version — drive the whole cycle from a config array instead of a switch." },
      { keywords: ["pedestrian", "crossing", "walk"], answer: "Out of scope." },
      { keywords: ["run out of time", "most important", "must work", "priority", "p0", "one thing"], answer: "Three lights, and the active one cycles on its own with the right timings." }
    ],
    p0: ["Three lights render", "Exactly one is active at a time", "It cycles automatically on the correct timings"],
    p1: ["A 'next' button that forces an advance and resets the timer", "Interval cleaned up properly"],
    p2: ["Cycle driven by a config array, not a switch", "Pause / resume"]
  },

  {
    slug: "otp-input",
    title: "OTP Input",
    phase: 1,
    order: 10,
    targetMinutes: 30,
    mode: "react",
    prompt: "Build an OTP input.",
    primitives: ["refs", "keyboard-nav", "controlled-input-react"],
    teaches:
      "An array of refs, and the backspace rule. Backspace on an EMPTY box must move focus back AND clear the previous one — that's the bit everyone gets wrong, and it's the bit that gets asked about.",
    hiddenRequirements: [
      { keywords: ["how many", "digit", "length", "boxes", "six", "6"], answer: "6 boxes, one digit each." },
      { keywords: ["auto", "focus", "advance", "next", "move"], answer: "Yes — typing a digit auto-advances focus to the next box. P0." },
      { keywords: ["backspace", "delete", "back"], answer: "Backspace on an EMPTY box moves focus back and clears the previous box. P1. This is the one everyone gets wrong." },
      { keywords: ["paste"], answer: "P1 — pasting a 6-digit code should fill all six boxes at once." },
      { keywords: ["number", "letter", "validate", "only", "alpha", "restrict"], answer: "Digits only. Reject letters." },
      { keywords: ["submit", "complete", "done", "full", "assembled"], answer: "When all 6 are filled, show the assembled code somewhere." },
      { keywords: ["arrow", "left", "right"], answer: "P2." },
      { keywords: ["run out of time", "most important", "must work", "priority", "p0", "one thing"], answer: "Six boxes, type digits, focus auto-advances, and the full code is readable." }
    ],
    p0: ["6 single-digit boxes render", "Typing a digit fills it and advances focus", "Only digits accepted", "The assembled 6-digit code is visible"],
    p1: ["Backspace on an empty box focuses AND clears the previous box", "Paste fills all 6 boxes"],
    p2: ["Arrow keys move between boxes", "Auto-submit when full"]
  }
];

/**
 * The 5-minute warm-up drills. One primitive, cold, from a blank file, before the timed build.
 *
 * This is the reps that fix muscle #2 (API recall without autocomplete). You are not being clever.
 * You are making `debounce` come out of your fingers without thinking, the way `for (let i = 0`
 * already does.
 *
 * The lab rotates these. `/machine-coding` will tell you which one to pick when your profile has
 * enough data to know your weakest.
 */
window.MC_WARMUPS = [
  { slug: "debounce", title: "debounce(fn, ms)", minutes: 5, spec: "Return a wrapped fn. Every call clears the pending timer and sets a new one. Trailing edge." },
  { slug: "throttle", title: "throttle(fn, ms)", minutes: 5, spec: "Leading edge. Fire immediately, then ignore calls until ms has passed." },
  { slug: "event-delegation", title: "Event delegation", minutes: 5, spec: "ONE listener on a <ul>. Clicking any <li> logs its text. Must work for <li>s added after the listener." },
  { slug: "list-render", title: "Render a list", minutes: 3, spec: "Array of 5 strings → 5 <li> in the DOM. Vanilla, no framework." },
  { slug: "localstorage", title: "localStorage round-trip", minutes: 4, spec: "Load an array on init (guard the null/parse), save it on every change." },
  { slug: "fetch-states", title: "Fetch: 4 states", minutes: 6, spec: "loading / error / empty / data. All four. Empty is not loading." },
  { slug: "timer-cleanup", title: "Interval + cleanup", minutes: 5, spec: "useEffect that starts an interval and returns the clearInterval. Prove it stops." },
  { slug: "event-emitter", title: "Event emitter", minutes: 8, spec: "on(evt, fn) / off(evt, fn) / emit(evt, ...args). A Map of event → Set of handlers. off must actually remove." },
  { slug: "keyboard-nav", title: "Arrow-key nav", minutes: 6, spec: "Arrow up/down moves a highlighted index through a list. preventDefault or the page scrolls." },
  { slug: "list-crud", title: "Immutable list CRUD", minutes: 8, spec: "add / toggle / delete / edit on an array in state. No push, no splice, no mutation." },
  { slug: "derived-state", title: "Derive, don't store", minutes: 4, spec: "Given items + query in state, render the filtered list WITHOUT a third state variable." },
  { slug: "refs", title: "Array of refs", minutes: 4, spec: "6 inputs. Clicking a button focuses the 3rd. Use a ref array." },
  { slug: "portal-modal", title: "Modal essentials", minutes: 12, spec: "createPortal + Escape to close + click-outside to close. Clean up the key listener." },
  { slug: "tree-recursion", title: "Recursive render", minutes: 10, spec: "A component that renders itself. Nested {name, children[]} → an indented tree." }
];
