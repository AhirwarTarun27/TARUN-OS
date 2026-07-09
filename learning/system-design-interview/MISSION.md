# Mission: System Design Interview (Xu Vol 1)

## Why
Tarun is in an active job switch — a frontend-heavy full-stack role, 2-3 month target (from 2026-07-07).
System design is one of the interview rounds, and it's graded on whether you can *drive a design out loud*
using a clear framework. The goal is to walk into the design round able to take any "design X" prompt,
run the 4-step framework, and narrate the tradeoffs — not to memorize architectures.

## Success looks like
- Run Alex Xu's 4-step framework cold on any prompt: scope → high-level design → deep dive → wrap up.
- Narrate the scaling ladder out loud — single server → millions of users — naming each lever and *why*.
- Speak every core building block (load balancer, replication, cache, CDN, sharding, message queue,
  stateless tier) with a crisp one-line justification and its main tradeoff.
- Do back-of-the-envelope estimation without freezing (QPS, storage, bandwidth).
- Present, not just know: draw the boxes, defend a choice, and handle "what if traffic 10x's?"

## Constraints
- Prep is **mainly design-out-loud**, not heavy implementation. Optional: bolt a tiny version onto a project.
- Watch-first loop per `learning/system-design-video-path.md`: watch → read Xu chapter → this lesson → design aloud.
- Level: working full-stack dev who ships real products (JsonBeam, GradeJar on Cloudflare Workers, zero-backend
  architectures). Has practical building intuition; the gap is *interview framing, vocabulary, and tradeoff articulation* — not "what is a server." Teach at that altitude.
- Lesson size: medium, ~20 min per sitting. Learning must FLOW — each chapter builds on the last.
- All generated HTML is dark-themed (light hurts his eyes).

## Out of scope
- Heavy hands-on implementation of each system (this is interview prep, not a build course).
- Vol 2 topics until Vol 1's 15 chapters are done (proximity service, Maps, payments, etc.).
- Frontend-specific system design (component/state architecture) — that's the `/design-architecture` track.
