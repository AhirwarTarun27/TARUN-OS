# MyWorkMyDay — Defense Notes (mechanism-only)

**There is no repo *yet*.** Searched all of `Documents/` on 2026-07-24: nothing. This was Apr–Sep 2022,
the first engagement. **Tarun said on 2026-07-24 he will share the repo later** — so this file is the
interim standard, not the permanent one.

> ### When the repo arrives — re-verify these five things first
> 1. **TypeScript.** Count `.ts`/`.tsx` vs `.js`/`.jsx` and look for `tsconfig.json`. If it's a JS
>    project, **strip TypeScript from the stack line and "typed" from bullet 2** — exactly what was done
>    to Dwellworks. CloudForestX (470 TS files) and DentScribe (317) already carry the TS claim, so this
>    one costs nothing to drop.
> 2. **Tailwind CSS.** Added to the stack line on his instruction, unverified. Check for
>    `tailwind.config.js` and utility classes in JSX. MUI + Tailwind together is common but confirm it.
> 3. **The 50% API-call reduction.** Find the debounced search — a `useDebounce` hook, a `setTimeout`
>    in the search handler, or a lodash `debounce`. If debouncing isn't there, the number goes.
> 4. **The custom hooks.** Confirm the form-validation and data-fetching hooks exist and read them, so
>    §3 stops being a described pattern and becomes a cited file.
> 5. **RBAC.** Confirm both levels — a route guard **and** action-level gating. If only routes are
>    gated, drop "and in-page actions" from bullet 3.
>
> Then convert this file into a proper `03-*.md` module with a Sources section, and add a
> `cv-truth-table.md`, matching the other three projects.

Until then the code is not on this machine.

That changes the standard. For the other three projects you defend a bullet by **pointing at a file**.
Here you defend it by **explaining the mechanism** — how the thing works, why it was the right call, and
what it traded away. An interviewer cannot check your repo either, so mechanism *is* the proof. What
kills you here is not "I don't have the code", it's a mechanism that doesn't hold up.

**Frame the project honestly and early.** It was six months, four years ago, and it was your first
professional React work. Nobody expects deep recall. *"That was my first project out of my bootcamp,
about four years ago — I can talk through what I built and why, but I won't pretend to remember every
detail"* is a completely fine opening, and it buys you enormous latitude. **Do not oversell this
project.** Its job on the CV is to show where you started, not to compete with CloudForestX.

---

## 1. What the product was

An HR management SaaS used by **20+ business clients** — so multi-tenant, one deployment, many companies.
Three functional areas you worked on:

- **Employee management** — the employee records, org data, the CRUD around a person.
- **Payroll processing** — running pay for a period. The high-stakes surface: it involves money, so it
  needs confirmation steps, validation, and a clear audit of what was run.
- **Performance analytics** — dashboards over that data for HR and managers.

**The one-liner:** *"An HR platform that a company's HR team runs their people operations on — employee
records, payroll runs, and analytics on top. Multi-tenant, so each client company had its own data
inside one product."*

**If asked who the users were:** HR staff and managers at the client companies (the daily users),
plus each client's admin who managed roles and access. Not the employees themselves at large — that
distinction matters and shows you thought about it.

---

## 2. Bullet 1 — the core surfaces

> *Built the platform's core surfaces: employee management, payroll processing and performance analytics
> dashboards.*

**Deliberately generalized**, and that is correct for a four-year-old project. It establishes scope
without inviting detail you cannot supply.

**Expected follow-up: "which was the hardest?"** → **Payroll.** Use it:

> *"Payroll, because it's the one screen where being wrong costs real money. Everything else in an HR
> tool you can fix by editing a record. A payroll run has to validate before it commits, confirm
> explicitly, and be unambiguous about the period and the population it's running for. It made me think
> about irreversible actions in a UI differently — you design those to be slow and explicit, which is
> the opposite of every other screen."*

That answer is about **judgment**, needs no code, and is the kind of thing a senior interviewer
remembers.

**If pushed on analytics:** you built the dashboard views over the HR data — headcount, attendance and
performance breakdowns. Keep it at that level. **Do not invent chart libraries or metric names.**

---

## 3. Bullet 2 — reusable components and custom hooks

> *Created reusable, typed React components and custom hooks for form validation and data fetching,
> adopted across the platform.*

The two hooks are the substance. Be ready to describe both **as patterns**, since you can't show code.

**The form-validation hook.** The recognizable shape:

```
useForm({ initialValues, validate })
  → values, errors, touched
  → handleChange, handleBlur, handleSubmit
  → validate on blur and on submit, not on every keystroke
```

> **Q: "Why write your own instead of using Formik or react-hook-form?"**
> *"Honestly, partly because it was 2022 and it was my first project and building it taught me the
> problem. But the real reason it stayed is that our forms were mostly the same shape — a set of fields,
> a validation rule per field, a submit — and the hook covered that in far less code than adopting a
> library's API everywhere. Today I'd use react-hook-form; it handles uncontrolled inputs and re-render
> cost better than anything hand-rolled, and there's no reason to own that code."*

**Naming the honest reason and the modern answer is what makes this good.** "I'd do it differently now"
is a strength on a four-year-old project, not a weakness.

**The data-fetching hook.** The shape:

```
useFetch(url)  →  { data, loading, error }
  → fetch on mount / on dependency change
  → cancel or ignore the response if the component unmounted
```

> **Q: "What's the bug everyone hits with a hook like that?"**
> *"Setting state after the component unmounted, and stale responses landing out of order. You guard
> both — a cleanup flag or an AbortController in the effect's return. **That exact problem came back at
> CloudForestX and I solved it properly there** with a request-id guard in a shared fetch hook, so a
> slow earlier response can't overwrite a newer one."*

**That connection is the single best thing you can do with this project** — it turns your weakest,
unverifiable entry into the origin story for a genuinely senior pattern you can prove in code. Link
them out loud.

**On "typed":** if TypeScript comes up, keep it modest — typed props and interfaces on the shared
components. **If you cannot picture the setup, say TypeScript came later in your career** and let
CloudForestX (470 TS files) and DentScribe (317) carry the claim. They are ironclad; this one adds
nothing. Never bluff a `tsconfig` you don't remember.

---

## 4. Bullet 3 — RBAC at two levels

> *Implemented role-based access control (RBAC) across user roles, gating both route access and in-page
> actions.*

**The two levels are the whole bullet.** Say them explicitly:

1. **Route level** — a guard component wrapping protected routes. If the user's role isn't permitted,
   redirect rather than render.
2. **Action level** — within a page a user is allowed to see, individual controls are gated. An HR user
   may view an employee record but not the payroll run button.

> **Q: "Why do you need both? Isn't the route check enough?"**
> *"No, because roles overlap on the same screen. Two roles both need the employee list, but only one can
> edit salary. If you only gate routes you end up building a separate page per role, which duplicates
> everything. Gating actions inside a shared page keeps one screen and lets permissions vary inside it."*

**Then the sentence that must always follow** — same as DentScribe:

> *"And none of that is security. It's UX. The API enforces permissions server-side; the client-side
> gating exists so users aren't shown controls that would fail. If the front end were the only check,
> you'd just call the endpoint directly."*

**Say this unprompted.** A candidate who claims RBAC without distinguishing client UX from server
enforcement looks junior. A candidate who volunteers the distinction looks senior. It costs one sentence.

---

## 5. Bullet 4 — the performance claim

> *Cut redundant search API calls 50% with request debouncing, and reduced re-render cost with React.memo
> and useMemo.*

**This bullet was rewritten on 2026-07-24 and you need to know why**, because the old version is on
résumés already in circulation.

### What was removed and why

The old bullet read *"Cut API calls 50% and load time from 3.2s to 1.1s with debounced search and
memoization (React.memo, useMemo)."*

**`React.memo` and `useMemo` cannot improve initial load time.** They reduce re-renders of an app that is
already running. Load time is bundle size, network latency, server response and render-blocking work.
The claim attached a number to a mechanism that cannot produce it — the same category error as the "95+
Core Web Vitals" claim that was deleted from this CV (Core Web Vitals have no 0–100 score). **In your own
specialty, that is the most expensive kind of mistake.** One question — *"how did memoization improve
your load time?"* — and you lose both the bullet and some credibility.

**If anyone ever asks about the old number, the answer is:** *"I took that off — I couldn't stand behind
how it was measured, and memoization wasn't what would have caused it."* That answer is a **credit** to
you. Never try to defend it.

### The half that is real — debouncing

**The mechanism, precisely:**

```
Without debounce:  each keystroke → one request
   typing "engineer"  =  8 requests, 7 of them already stale on arrival

With a ~300ms debounce: fire only after typing pauses
   typing "engineer"  =  1 request
```

> *"The employee search fired a request per keystroke. Most of those responses were obsolete before they
> arrived — the user had already typed another character — so we were paying for network and server work
> to render results nobody would ever see. Debouncing means the request goes out once the user pauses,
> around 300 milliseconds. Fewer requests, less server load, and the UI actually feels faster because
> it's not thrashing."*

**Why 50% is a conservative, believable number:** per-keystroke → debounced typically cuts far more than
half on a long query. 50% is what you get when you average across short queries, backspacing, and
users who search by pasting. **If asked how it was measured:** *"We watched request volume on the search
endpoint before and after."* If you don't remember the measurement, say so — *"it was a clear
before-and-after on request counts; I don't have the exact instrumentation in front of me four years
on"* — and do **not** invent a tool name.

> **Q: "Debounce or throttle?"** — a common trap.
> *"Debounce, because I only care about the final value. Throttle fires at a fixed interval regardless,
> which for search means firing on intermediate strings the user has already moved past. Throttle is
> right for scroll or resize handlers where you want steady updates; debounce is right for 'wait until
> they've stopped'."*

> **Q: "What else would you do now?"**
> *"Cancel the in-flight request when a new one starts, so an old response can't land after a new one —
> AbortController, or the request-id guard I used at CloudForestX. And cache by query string so
> backspacing to a previous term is instant instead of another round trip."*

### The memoization half — bind it to the right effect

> *"`React.memo` skips re-rendering a component when its props haven't changed by reference; `useMemo`
> caches an expensive computed value between renders. On a long employee list where a parent re-rendered
> on every keystroke, that stops every row re-rendering with it. It's about **re-render cost during
> interaction** — not about how fast the page loads."*

> **Q: "When is memoization the wrong tool?"**
> *"Most of the time, honestly. The comparison and the cache have their own cost, so wrapping everything
> makes things slower and much harder to read. And it silently does nothing if you pass a new object or
> arrow function as a prop each render — the reference changes, so `React.memo` bails every time. It's
> worth it on lists that re-render often and on genuinely expensive computations. Everywhere else it's
> noise. The right order is measure with the profiler, then memoize what's actually hot."*

**That answer is worth more than the bullet itself.** Knowing when *not* to reach for a tool is the
clearest seniority signal there is.

---

## 6. The framing that makes this project work for you

It is your oldest and smallest entry. Its value is **trajectory**, and you should use it that way:

> *"MyWorkMyDay is where I learned the fundamentals — I hand-rolled a form hook and a fetch hook because
> I didn't know the libraries yet, and building them badly is how I learned what they solve. The stale-
> response bug I half-handled there is the one I fixed properly at CloudForestX with a request-id guard
> across 36 services. Same problem, four years of judgment apart."*

**That is a narrative an interviewer will actually remember**, and it converts an unverifiable project
into evidence of growth.

---

## 7. Facts I must never get wrong

- **No repo exists.** Never imply you can show code. Never invent a file, folder or library name.
- **Apr 2022 – Sep 2022**, team **7**, HR SaaS, **20+ business clients** *(his own business figure)*.
- Three surfaces: **employee management, payroll processing, performance analytics.**
- **The 3.2s → 1.1s load-time claim is deleted and may never return.** Memoization does not affect load
  time.
- The surviving number is **50% fewer search API calls, caused by debouncing** — not by memoization.
- Memoization = **re-render cost**, never load time.
- RBAC = **route level + action level**, and it is **UX, not security** — the server enforces.
- Stack: **React, React Hooks, Redux, TypeScript, Material-UI (MUI), Tailwind CSS, REST APIs.**
  **TanStack Query is struck** — it exists in no repo he has.
- **This is not the project to go deep on.** Answer, connect it forward to CloudForestX or DentScribe,
  and move the conversation there.

---

### Sources

**None — deliberately.** There is no repository, so nothing here is code-grounded. Every claim in this
file is either (a) Tarun's own account of his work, or (b) a general React/web mechanism that is true
independent of this project. That separation is the point: the mechanisms are defensible anywhere, and
the project specifics are stated only as far as he actually remembers them.
