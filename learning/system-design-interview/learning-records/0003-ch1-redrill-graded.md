# Ch 1 re-drill, graded: 6.5/10 — skeleton is now banked, but you re-ran the rep instead of drilling the fix

Second design-out-loud rep (2026-07-16). Same prompt: scale a photo-sharing app one user → millions,
unaided, ~3 min. This drill had ONE job — close the four precision gaps from
[[0002-ch1-photo-app-narration-graded]]. It closed one of them. **Verdict: Chapter 1 still NOT banked.
One more rep — but a constrained fix-only rep, not another narration.**

## What moved (real, keep it)

- **The ladder is now durable.** Two clean reps a day apart, ~9 of 11 rungs, correct order, a reason on
  most. Recall survived overnight and came out cleaner. The *skeleton* is banked now — stop worrying about
  rung recall, it's in there.
- **Network vocabulary fixed.** No "single DNS I own," no "located DNS server." CDN described correctly this
  time: static assets, served from the edge, by user location. That was failure mode #1 — closed.
- **Stateless tier came out crisp.** "Session data across servers → shared store (NoSQL / cache)." Named the
  rung and its reason unprompted. Good.

## What did NOT move — and this was the whole assignment

Three of the four targets are still open, including the fatal one.

1. **Still never said where the bytes live.** *(#3 — the fatal one, unchanged.)* It's a photo app. Photos are
   large blobs — they go to **object storage (S3/R2)**, and the DB holds only **metadata** (photo id, owner,
   the object key/URL, caption, timestamp). You talked replication, sharding, "write to multiple databases" —
   all still implying images sit in DB rows. Your CDN's origin is the object store; you never named it. This
   single gap caps the grade on its own.
2. **Cache is still a bypass, not a cache.** *(#2, unchanged.)* "Expensive computation, accessible via cache
   instead of going through the DB." That's still the inverted model. You never said **read-through** (DB is
   source of truth; miss → read DB → populate → return), and named zero of the four considerations
   (**TTL, LRU eviction, write consistency, cache-as-SPOF**).
3. **Sharding: you gave the WHY again, never the CHALLENGE.** *(#4, unchanged.)* "Single master is the write
   bottleneck, so shard the writes" — correct, and that's the rationale, which you already had. The drill asks
   for the **challenge**: a **shard key** (user_id), plus **resharding / hotspot / cross-shard queries**. Still
   stopped at the boundary.

Also still missing, both flagged last time:
- **Multi-DC + geo-DNS** (the highest rung) — skipped again.
- **No scoping.** Zero clarifying questions, zero numbers. Assigned drill #3 from rep 1 (open with two
  clarifying questions) — not done. You jumped straight into the ladder both times.
- **Replication lag walked past again.** It's sitting in the middle of your own design and you stepped over it
  both reps. This one story is worth three rungs (see the say-this line below).

## The diagnosis that generalizes

Rep 1's read was "knows the lever, can't name what it costs." Rep 2 confirms it and adds a meta-lesson:
**re-narrating is not re-drilling.** Given a re-drill scoped to four fixes, you re-ran the thing you already
pass — the happy-path ladder — because that's the comfortable rep. The four gaps are uncomfortable precisely
because they're the cost/failure edges, which is exactly where the interviewer probes and exactly what
separates 6.5 from a hire. You practiced the part that was already done.

## The next rep is constrained. No ladder allowed.

Do NOT narrate the ladder a third time — it's banked, narrating it again earns nothing. Next `sysdesign` rep,
≤4 min, produce ONLY these five things, out loud:

1. **Trace one photo end to end** (assigned rep-1 drill #2, still not done): browser → LB → app server → write
   metadata to DB + bytes to object storage → CDN caches from object storage → another user's read → cache →
   CDN → bytes. If you can't trace it, the boxes are decoration.
2. Where the bytes live (object storage + metadata split).
3. The cache, as read-through, with its four considerations.
4. Sharding: key + one named challenge.
5. The replication-lag story.

Then, and only then, is Ch 1 banked and Ch 2 (estimation) opens.

## Calibration correction (added 2026-07-16, after Tarun pushed back)

He flagged, fairly: TTL / LRU / SPOF / write consistency / resharding were **first-contact terms** — Lesson 1
only named them in compressed callouts, never taught them. Grading three of them as "unfixed" implied he'd
been taught them and failed to apply them. He hadn't. **So the three "unfixed gaps" above are the SYLLABUS,
not a scorecard.** The one genuine miss that stands is the object-storage gap (#3) — that was taught in
Lesson 1 and is conceptual, not vocabulary. Fix logged: wrote `lessons/0001b-backend-primitives.html`, a
from-scratch teach of all three clusters. The constrained re-drill only becomes fair AFTER he reads 1b.
Teaching-calibration rule banked in `NOTES.md` so future reps don't grade first-exposure vocab as a failure.

## Say-this-in-the-interview lines (the five you're missing)

- **Object storage:** "Photos are large binaries, so they don't go in the relational DB. Bytes go to object
  storage — S3 or R2 — and the DB holds only metadata: photo id, owner, the object key, caption, timestamp.
  The CDN's origin is that object store."
- **Read-through cache:** "Read-through cache in front of the metadata DB. DB stays source of truth. Read:
  check cache, on a miss read DB, populate, return. Four things I watch — TTL for staleness, LRU eviction,
  write consistency (write-through or invalidate the key), and the cache becoming a SPOF, so I cluster it."
- **Sharding:** "Shard key is user_id so a user's photos live together. Three challenges: resharding a hot
  shard — consistent hashing so I'm not rehashing everything; the celebrity hotspot; and cross-shard queries —
  a global feed hits many shards and can't do a simple join, so I denormalize or fan-out."
- **Multi-DC + geo-DNS:** "Past one region, multi-data-center with geo-routed DNS — nearest DC per user,
  replicate across DCs, fail over if one dies. Hard part is cross-DC consistency."
- **Replication lag:** "One catch with master/replica — lag. User uploads, write hits master, their refresh
  reads a lagging replica, their own photo is missing. So for read-your-own-writes I route their reads to
  master briefly."
