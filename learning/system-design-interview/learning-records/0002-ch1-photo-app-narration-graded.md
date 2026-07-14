# Ch 1 design-out-loud, graded: 6/10 — skeleton banked, precision is not

First real design-out-loud rep (2026-07-15). Prompt: the Lesson 1 drill — scale a photo-sharing app from
one user to 10M. Unaided, from memory. **Verdict: Chapter 1 NOT banked. Re-drill before Ch 2.**

## What the rep proved he HAS

The ladder itself is in there. He hit 9 of 11 rungs **in the correct order** with a reason attached to most,
which is the genuinely hard part and the thing most candidates cannot do. Specifically clean:

- Started single-server and justified it (cost, don't split prematurely). Interviewers want this.
- **"Vertical has a ceiling and no failover"** — the exact line, unprompted.
- Master writes / replicas read, *because reads dominate*. Plus failover.
- Reached for the **message queue** for async image processing on his own.
- Sharded for the right trigger: replication only scales reads, single master is the write bottleneck.

## The four failure modes (this is the coaching payload)

1. **Vocabulary slips on the network layer.** Said "a single DNS" as if he owns it, and called a CDN edge
   node a "located DNS server." DNS = third-party lookup, nothing more. CDN = **edge server / PoP**.
2. **Cache model is inverted.** Said he'd keep hot data "in Redis instead of the database." That's a second
   database, not a cache. He does not yet have **read-through** internalized (DB stays source of truth;
   miss → read DB → populate → return). Named zero of the four considerations (TTL, LRU eviction,
   consistency drift, cache-as-SPOF).
3. **Never said where the bytes live.** *The fatal one.* It's a photo app and he never said photos go to
   **object storage** (S3/R2) with only **metadata** in the relational DB. Everything downstream (his
   CDN plan, his sharding plan) was therefore built on an implied "images in MySQL rows."
4. **Explains the WHY, never names the CHALLENGE.** Drill explicitly asked for one sharding challenge. He
   gave the rationale and stopped. No sharding key, no resharding / celebrity problem / cross-shard joins.

Also skipped **Rung 9 (multi-DC + geoDNS)** entirely, and never scoped: no clarifying questions, no numbers.
Jumped straight to Xu's step 2.

## The diagnosis that generalizes

**He narrates the happy path of the architecture and stops at the boundary of the failure mode.** Every gap
above is the same shape: he knows the lever, he cannot yet name what the lever *costs*. That is exactly the
line between "knows the concepts" (already true, see [[0001-starting-floor-and-mission]]) and "passes the
round." An interviewer probes precisely there.

The tell: **replication lag was sitting in the middle of his own design and he walked past it.** User uploads
a photo, write hits master, refresh reads a lagging replica, *their own photo is missing*. Read-your-own-writes.
That story, dropped unprompted, is worth more than three more rungs of recall.

## Implication for teaching

- **Stop rewarding rung recall. Start demanding the cost of each rung.** From Lesson 2 on, every lever he
  names gets the follow-up: "and what does that break?"
- Don't advance to Ch 2 (estimation) on a pass. Re-drill Ch 1 cold, ≤3 min, fixing only the four items.
- Assigned drills: (1) re-narrate cold tomorrow, (2) **trace one photo end to end through every box he drew**
  — if he can't, the boxes are decoration, (3) open with two clarifying questions before touching the ladder.
- The blob-storage gap suggests his zero-backend Cloudflare instinct (everything is static + edge) has a
  blind spot around stateful/large-object tiers. Worth probing again in Ch 15 (S3-like object storage).
