# Drill D35 — Cloud & tooling (AWS, Docker, build tools)

**Phase 1, sitting 11 (with D33).** **New drill 2026-07-31** — this cluster had no home in the old
roadmap. Status in `../skills-defense.md`: STS and webpack **anchored**, Lambda and Docker
**quick-learn**, EFS and the cost engine **honest-scope**.

**Why it needed its own drill:** the Cloud line is the **highest-risk line on the whole Skills block.**
It reads `AWS (EC2, S3, EBS, EFS, Lambda, CloudWatch, STS)` — seven services in one parenthesis, and
they are not all the same colour. One of them you built the credential layer for. One of them you have
never touched.

**Reps:** Docker (queue #4, ~1 hr) · Lambda (queue #7, ~1.5 hr).

---

## Teach block (read once, then close)

### 1. Sort your own AWS list before someone else does

| Service | Reality | Say |
|---|---|---|
| **STS** | 🟢 you wrote the cross-account credential factory | **Lead with this.** Not the service list. |
| **EC2 / EBS / S3 / CloudWatch** | 🟢 read through the SDK in the ingestion service | *"Read via the SDK across 200+ accounts."* Not "operated." |
| **Lambda** | 🟡 appeared in the cost surfaces you built. Never deployed one | *"It showed up in the surfaces I built. I haven't shipped one."* → changes after the rep |
| **EFS** | 🟡 idle-EFS detection was backend; you rendered the dashboard | **honest-scope**: *"I've never provisioned or run one."* No rep fixes this |
| **The cost/analysis engine** | 🔴 | the D10 boundary sentence |

> **The move that wins this line:** when they say "tell me about your AWS experience," **do not
> enumerate the parenthesis.** Answer with STS and the 200-account problem, which is genuinely
> interesting and entirely yours. Then let them pick where to go next. Reciting a service list invites
> them to choose the one you're weakest on.

### 2. Docker — what a 1-hour rep actually needs to teach you

- **Image vs container:** an image is the built, immutable filesystem plus metadata. A container is a
  running instance of it. *"An image is the class, a container is the instance"* is fine and it's true.
- **Layers and the cache:** each instruction makes a layer, and layers cache. **`COPY package*.json`
  and `npm ci` go BEFORE `COPY . .`** — otherwise every source change reinstalls every dependency.
  **That one ordering rule is the most commonly asked Docker question there is.**
- **Multi-stage build:** build in a fat image, copy only the artifact into a slim runtime image. Smaller
  image, no build toolchain in production.
- **Compose:** several services with one network and named volumes. Node + Postgres is the canonical
  case and it's exactly your rep.
- **`.dockerignore`** — leave `node_modules` and `.git` out or the build context balloons.
- **Config and secrets come in as environment**, not baked into the image.

**Until the rep lands:** *"I can read a Dockerfile and work in a containerised setup. I haven't owned a
container build."*

### 3. Lambda — the concepts, then the rep

- **Cold start** — a new execution environment initialises before your handler runs. Anything at module
  scope (a DB client, a config load) runs once per environment, not once per invocation. **Put reusable
  clients outside the handler.**
- **The database problem:** many concurrent Lambdas each opening a Postgres connection exhausts the
  pool. This is *the* Lambda-plus-relational-DB gotcha; naming it is worth more than any config detail.
- **Timeout and memory are one dial** — memory allocation also scales CPU, so raising memory often makes
  a function cheaper by finishing faster.
- **When not to use it:** long-running work, steady high-volume traffic, or anything latency-critical
  where a cold start is unacceptable.

### 4. Webpack — this one is genuinely strong, don't undersell it

Odin's `webpack.common.js` has **20 entry points** producing `dist/[name]/[name].bundle.js`, each
mounted into a Razor view — plus IE11 aliasing and Node 12.18.1 pinned in `.nvmrc`.

**Most candidates have never configured webpack by hand.** You maintained a 20-entry config against a
legacy browser target. Have the honest cost ready: **React ships 20 times, there is no vendor chunk,
and there is no `splitChunks`.** Volunteering the weakness is what makes the strength credible.

> ⚠ **Never say "code-splitting" about either employer project.** Odin has no `splitChunks`, no
> `React.lazy`, no dynamic `import()`. CloudForestX has `React.lazy` in exactly one file. It's on the
> deleted list.

**Webpack vs Vite, since you've shipped both:** Vite serves native ES modules in dev so startup doesn't
scale with project size, and bundles with Rollup for production. Webpack bundles up front for dev too,
which is why a 20-entry build is slow. *"I use Vite on new projects and maintain webpack on the legacy
one — the difference you feel every day is dev server startup."*

---

## Closed-book quiz

1. "Tell me about your AWS experience." — **watch what he leads with.**
2. Ladder: "Have you deployed a Lambda?"
3. Ladder: "What's EFS and where have you used it?"
4. "How would you containerise a Node app with a Postgres database?"
5. Ladder: "Why does the order of instructions in a Dockerfile matter?"
6. "What's a cold start, and what breaks when Lambdas talk to Postgres?"
7. "You've used both webpack and Vite. What's the actual difference?"
8. "Tell me about the most complex build setup you've worked on."

## Grading key — *Claude only*

- **Q1 is the whole drill.** Full marks = leads with **STS and the 200-account problem**, does not
  recite the parenthesis. Reciting the service list caps the section at 5 even if everything after is
  right — it hands the interviewer the choice of weapon.
- **Q2-3 fail on any inflation.** The correct answers are *"I haven't shipped one"* and *"I've never
  provisioned or run one."* Both are short and both are fine.
- Q4-5 → compose with two services; **`COPY package*.json` + install before `COPY . .`** and why. Bonus
  for multi-stage and `.dockerignore`.
- Q6 → module scope vs handler scope; **connection exhaustion** is the answer that matters.
- Q7 → native ESM in dev vs bundle-first; Rollup for production builds.
- Q8 → the 20-entry Odin config. **Full marks only if he volunteers the cost** (React ships 20 times, no
  vendor chunk). **Instant deduction for "code-splitting."**

**Coverage gate:** led with STS, Lambda and EFS scoped honestly, Dockerfile layer ordering explained,
no "code-splitting."
