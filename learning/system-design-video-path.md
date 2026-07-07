# System Design — Watch-First Video Path (Xu Vol 1)

Companion to the `/teach` track at `learning/system-design-interview/`. This file is **mine to curate
and yours to follow** — it lives outside the `/teach` lesson HTML on purpose, so `/teach` stays
untouched. Goal: prime each topic with a video first, so the reading and the lesson land practically.

## The loop (per `sysdesign` block)

1. **Watch** the mapped video below (prime the brain — 10 to 30 min).
2. **Read** the Xu Vol 1 chapter.
3. **`/teach`** — do the lesson, active recall, quiz. This is where it sticks.
4. **Apply, lightly** — design the system *out loud* using the framework (this is the real interview
   skill). Optional: bolt a small version onto a project. Per your call, prep is **mainly
   design-out-loud**, not heavy implementation.

## Watch these TWO first — they are the backbone of every design

Before any specific system, internalize the framework. Every design round is graded on whether you
follow one.

- **ByteByteGo — the 4-step framework** (Alex Xu's own channel, mirrors the book):
  understand scope → high-level design + buy-in → deep dive → wrap up.
  Channel: <https://www.youtube.com/@ByteByteGo> · newsletter version:
  <https://blog.bytebytego.com/p/ep46-step-by-step-guide-on-system>
- **Hello Interview — Delivery Framework** (built by FAANG hiring managers; the best "how to actually
  run the 45 minutes" resource): <https://www.hellointerview.com/learn/system-design/in-a-hurry/delivery>
  · channel: <https://www.youtube.com/@hello_interview>

Xu Ch 3 ("A Framework for System Design Interviews") maps to these directly — watch both, then read Ch 3.

## Your spine channels (in trust order)

1. **ByteByteGo** — the author's channel. Highest trust; the visuals often match the book. Default source.
2. **Hello Interview** — interview delivery + modern deep-dive walkthroughs. Best for "can I present this?"
3. **Gaurav Sen** — deeper, classic single-topic explainers (great for rate limiter, consistent hashing,
   news feed, autocomplete). Use when a chapter needs more depth than the framework video gives.
4. Chapter-by-chapter Vol 1 playlist (community, not fully vetted — sanity-check against the two above):
   <https://www.youtube.com/playlist?list=PLa5knmSCeutcg0bUPRqn39c4oyWa0VbCM>

## Chapter map (Xu Vol 1)

Watch = recommended channel + the exact thing to search on it. I'll pin the specific verified link for
each chapter **when you reach it** (avoids a wall of links that go stale), the way `/teach` gathers
resources as you progress.

| Ch | Topic | Watch first |
|----|-------|-------------|
| 1 | Scale from zero to millions of users | ByteByteGo — "scale a system to millions of users" |
| 2 | Back-of-the-envelope estimation | ByteByteGo — "back of the envelope estimation" (short) |
| 3 | **Framework for SD interviews** | **The two framework videos above** (do not skip) |
| 4 | Design a rate limiter | Gaurav Sen / ByteByteGo — "rate limiter system design" |
| 5 | Consistent hashing | ByteByteGo — "consistent hashing" · Gaurav Sen for depth |
| 6 | Key-value store | ByteByteGo — "design a key-value store" |
| 7 | Unique ID generator (distributed) | ByteByteGo — "unique id generator / Snowflake" |
| 8 | URL shortener | Hello Interview — "Design Bitly" · ByteByteGo — "URL shortener" |
| 9 | Web crawler | ByteByteGo — "web crawler system design" |
| 10 | Notification system | ByteByteGo — "notification system design" |
| 11 | News feed system | Gaurav Sen — "news feed / Facebook feed" · ByteByteGo |
| 12 | Chat system | ByteByteGo — "design WhatsApp / chat system" |
| 13 | Search autocomplete | Gaurav Sen — "typeahead / autocomplete" · ByteByteGo |
| 14 | Design YouTube | Hello Interview — "Design YouTube" · ByteByteGo |
| 15 | Design Google Drive | ByteByteGo — "design Google Drive / Dropbox" |
| 16 | The learning continues | (wrap-up chapter — no video; consolidate + review learning records) |

## After Vol 1 → Vol 2

Same loop, Vol 2 (proximity service, nearby friends, Google Maps, distributed message queue, metrics/
monitoring, ad click aggregation, hotel reservation, chat/Google Docs, S3, real-time gaming, payments,
digital wallet, stock exchange). ByteByteGo covers most; pin links as you reach them.

## Interview-loop reminder (bigger than just system design)

System design is **one round**. For a frontend-heavy full-stack switch, also keep:
- **DSA (`dsa` block)** — usually the gate. Highest leverage.
- **Machine coding / frontend rounds (`machine-coding`)** — your edge.
- **Behavioral + resume + applying** — the funnel. Start early, LinkedIn is fair game for this.

---
*Sources:* [ByteByteGo YouTube](https://www.youtube.com/@ByteByteGo) · [ByteByteGo EP46 framework](https://blog.bytebytego.com/p/ep46-step-by-step-guide-on-system) · [Hello Interview delivery framework](https://www.hellointerview.com/learn/system-design/in-a-hurry/delivery) · [Hello Interview YouTube](https://www.youtube.com/@hello_interview) · [Vol 1 playlist](https://www.youtube.com/playlist?list=PLa5knmSCeutcg0bUPRqn39c4oyWa0VbCM)
