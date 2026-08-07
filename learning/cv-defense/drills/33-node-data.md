# Drill D33 — Node, PostgreSQL and the ORM boundary

**Phase 1, sitting 11 (with D35).** Status in `../skills-defense.md`: mostly **anchored**, TypeORM is
**quick-learn**.

**The honest position:** this is the strongest half of the "full-stack" claim and it is genuinely
yours — but it is **two projects, not four**, and the CV's Summary says "end to end." This drill makes
sure the claim comes out precise rather than broad.

**The rep that closes TypeORM (queue #3, ~45 min):** one entity + one **migration** + an
ownership-scoped query in `backend-lab`. The migration is the point — DentScribe never had one.

---

## Teach block (read once, then close)

### 1. What you actually built — name it, don't gesture at it

**CloudForestX — the full vertical, and the one to lead with.**
- **STS cross-account credential factory** (`authentication/auth.ts`): assume a role in each customer
  account, get temporary credentials, build a scoped SDK client. **That is how one service reads 200+
  AWS accounts without ever holding a customer's long-lived key.**
- Ingestion pulling EC2, EBS, S3 and CloudWatch on a cron schedule.
- **Sequelize models over PostgreSQL** — inventory, rightsizing rows, per-account threshold tables.
- **Express REST endpoints** serving the 40 dashboards.

**DentScribe — a vertical slice.** The `staff-contacts` module: guards with a `@Roles` decorator,
**ownership-scoped TypeORM queries** (`where: { _id, user: { _id: userId } }`), clamped pagination,
an **allow-listed sort field that 400s on anything else**, HTML sanitisation on request bodies, and
Swagger annotations. You also own the matching slice and surface on the front end. **That combination —
the endpoint and the UI that consumes it — is the strongest true framing available.**

> ⚠ **Never name the framework.** `fact-bank.md` is explicit and it has been reaffirmed twice: say
> **"Node.js and TypeScript REST endpoints."** Naming it invites a question with no upside.

### 2. The two details that make you sound like you wrote it

**Ownership inside the query, not after it.**
```
where: { _id, user: { _id: userId } }
```
The ownership condition is **in** the `where`, so an unauthorised row is never loaded. The alternative —
fetch by id, then compare owner in code — leaks existence through timing and error messages and is one
early `return` away from being an IDOR. **This is the single best security answer you own. Use it.**

**The allow-listed sort field.** A sort parameter that goes straight into an ORDER BY is an injection
surface and a performance surface. Allow-list it and **400 on anything else** rather than silently
falling back — a silent fallback hides a client bug forever.

### 3. STS — the follow-up ladder they'll walk

- *Why assume a role instead of storing keys?* → **you never hold the customer's credentials.** They
  grant a role, you assume it, the credentials are temporary and scoped, and they can revoke access
  without rotating anything of yours.
- *What's in the trust relationship?* → your account is the principal, usually with an **external ID**
  to prevent the confused-deputy problem.
- *What happens when credentials expire?* → they're short-lived by design; you re-assume. The factory
  builds a client per account per run rather than holding one forever.
- *How do you not get rate-limited across 200+ accounts?* → **honest answer:** the ingestion was
  cron-scheduled and job-flagged per account rather than fanning out. If you don't know a limit, say so.

### 4. Sequelize vs TypeORM — you've used both, so have the comparison

Both are ORMs over Postgres, both give you models/entities and relations. **The difference that
matters in practice is migrations.** An ORM can generate schema from your models — convenient in
development, and **`synchronize: true` in production is a real footgun**: your schema silently follows
your code, and a bad refactor becomes a destructive migration nobody reviewed.

> **You have first-hand material here:** DentScribe ran `synchronize: true` with **no migrations**. Say
> it as an observation, not a complaint: *"It's fast until the first time you need to reason about what
> actually changed in production. I'd take explicit migrations and the extra step."*

**Where you're thin, say so:** *"I've written models, relations and queries in both. I haven't run a
migration strategy across a large team — that's the piece I'd be learning."* (Until queue #3 lands,
at which point the answer improves honestly.)

### 5. Postgres — the questions that actually come

- **Index the columns you filter and join on**, and know that an index costs you on write.
- **N+1** — the ORM's default failure mode. Eager-load the association or batch the query.
- **Transactions** — anything that must be all-or-nothing.
- **Connection pooling** — a cron process and an API process hitting the same database is exactly where
  pool exhaustion shows up.

---

## Closed-book quiz

1. "What backend have you actually written?" — scope it, name the two projects.
2. "Walk me through reading data from 200+ AWS accounts."
3. Ladder: "Why assume a role instead of storing access keys?"
4. Ladder: "How would you stop one tenant reading another tenant's rows?"
5. "Sequelize vs TypeORM — what's the real difference?"
6. "What's wrong with `synchronize: true`?"
7. "You have a list endpoint that's slow. Where do you look?"

## Grading key — *Claude only*

- **Q1 fails on "I'm full-stack" without naming CloudForestX and DentScribe** and handing back
  Dwellworks' .NET. **Framework name = automatic deduction**, it's a standing instruction.
- Q2-3 → STS assume-role, temporary scoped credentials, no customer keys held. Bonus for external ID.
- **Q4 is the one that separates him.** Full marks only for **ownership inside the `where` clause**, with
  the reason (the row is never loaded). "I'd check the user id" scores 4.
- Q5-6 → migrations vs `synchronize`, with DentScribe as first-hand evidence. **Framed as an
  observation, not a complaint.**
- Q7 → indexes, N+1/eager loading, pagination, the query plan. Any two, specifically.

**Coverage gate:** scope named in Q1, STS explained, tenancy answer lands in the query, no framework name.
