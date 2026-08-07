# Drill D31 — Vue

**Phase 1, sitting 10 (with D30).** Status in `../skills-defense.md`: **quick-learn**.

**The honest position:** Vue is 🟢 and it is real — the legacy surface of the relocation platform, plus
the runtime date-picker patch, which is one of your two best stories. But it is **Vue 2, options API**.
You have not shipped Vue 3 composition API. A JD that lists Vue today means Vue 3.

**The rep that closes it (queue #5, ~1 hr):** one component in **Vue 3 composition API** — `ref`,
`computed`, `watch`, `<script setup>`. Not options API.

---

## Teach block (read once, then close)

### What you already own — lead with this

`vue-ctk-date-time-picker`'s `getYears()` generated only a ±7-year window, so entering a date of birth
meant clicking one year at a time. The choices were to fork a vendored minified file or swap the library
across a legacy Razor surface. Instead: a ~75-line runtime patch that walks the component tree to find
`YearMonthSelector` and overrides `getYears` on its `methods` object, widening the range to 80 back / 20
forward and auto-scrolling to the selected year.

> **The point to land:** *"Reversible, about 75 lines, and it fails safe — it checks the component and
> the method still exist and no-ops if they don't."*

**Why this is a Vue answer and not just a story:** patching `methods` on a component's options object at
runtime only works because **Vue 2 components are plain objects with an options contract.** You did that
deliberately. Say so.

### Options API vs Composition API — the actual difference

**Options API (what you used):** a component is an object with `data()`, `computed`, `methods`,
`watch`, lifecycle hooks. Organised **by kind of thing**.

**Composition API (Vue 3):** logic lives in `setup()` / `<script setup>` and is organised **by feature**.
Reusable logic becomes a **composable** — a plain function returning reactive state.

> **The framing that lands with a React interviewer:** *"It's the same move React made from mixins and
> class components to hooks. Options API groups code by type; composition groups by concern, so a
> feature that touches state, a computed value and a watcher lives in one block instead of three. A
> composable is Vue's custom hook."*

### Reactivity — the real difference from React, and the thing they test

| | Vue | React |
|---|---|---|
| Model | **fine-grained tracking.** Vue knows which effects read which property and re-runs only those | **re-render the component**, then diff |
| Trigger | mutate the reactive object: `count.value++` | call a setter: `setCount(c => c + 1)` |
| Memoisation | mostly unnecessary — tracking is already granular | `React.memo` / `useMemo` exist to fight over-rendering |

> *"Vue tracks dependencies at the property level, so it re-runs the effects that actually read the
> changed value. React re-renders the component and reconciles. That's why memoisation is a routine
> concern in React and mostly isn't in Vue."*

**Vue 3 specifics to have ready:** `ref()` wraps a value and you access it with `.value` (`reactive()`
wraps an object and you don't); `computed()` is cached and derived; `watch` is for side effects, not
derived state. `v-model` is two-way binding sugar — `:modelValue` down plus an `update:modelValue`
event up. **It is not magic, and knowing that it's just props-down/events-up is the follow-up answer.**

---

## Closed-book quiz

1. "Where have you used Vue?" — scope it honestly in one sentence.
2. "Walk me through the date-picker fix and why you chose that approach."
3. "Options API vs Composition API — what changed and why?"
4. "How is Vue's reactivity different from React's?"
5. Ladder: "So why does React need `useMemo` and Vue mostly doesn't?"
6. "`ref` vs `reactive`? What is `v-model` actually doing?"

## Grading key — *Claude only*

- **Q1 must contain the scope:** legacy surface, Vue 2, options API, no production Vue 3. Missing scope
  fails the drill regardless of the rest.
- Q2 → **reversible + fails safe** are the two words. Bonus for naming *why* runtime patching worked:
  Vue 2 components are plain option objects.
- Q3 → by-kind vs by-concern, composable = custom hook. The React parallel is the strong version.
- Q4-5 → **property-level dependency tracking vs component re-render + reconciliation.** Q5 is the
  differentiator and follows directly from Q4.
- Q6 → `.value` vs no `.value`; `v-model` = prop down + `update:` event up, not magic.

**Coverage gate:** scope stated in Q1, reactivity difference explained, date-picker story lands.
