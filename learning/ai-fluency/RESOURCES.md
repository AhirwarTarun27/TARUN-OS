# Resources

**Eight links. All primary or near-primary. All short.** Nothing gets added here without a reason, and
nothing gets added that takes more than 20 minutes to read. A 10-hour YouTube series is how the box
breaks.

## Read these three, in this order

| # | Link | Why | Time |
|:--:|---|---|:--:|
| 1 | [Anthropic — Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) | The workflow-vs-agent definitions and the five named patterns. **The single highest-ROI read on this page.** Quote it by name in an interview | ~15 min |
| 2 | [Anthropic — Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | The primary source for the term. Compaction, just-in-time retrieval, structured note-taking, tool scoping — all four are in devflow | ~15 min |
| 3 | [Canva Engineering — Yes, You Can Use AI in Our Interviews](https://www.canva.dev/blog/engineering/yes-you-can-use-ai-in-our-interviews/) | The only first-party account of how a company actually grades AI use in interviews. Effectively the rubric | ~5 min |

## Skim these when the relevant day comes

| # | Link | For | Time |
|:--:|---|---|:--:|
| 4 | [Model Context Protocol — Introduction](https://modelcontextprotocol.io/docs/getting-started/intro) | Day 6. Gets you the USB-C analogy and the three primitives | 5 min |
| 5 | [Simon Willison — The Lethal Trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) | Day 6. The security answer that reads senior | 5 min |
| 6 | [Anthropic — Prompt Caching docs](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) | Day 7. **Skim the pricing table only.** You want the 90%-off number | 5 min |
| 7 | [OpenAI — A Practical Guide to Building Agents (PDF)](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf) | Day 7. 34pp — read the model/tools/instructions section and the guardrails section, skip the rest | 15 min |
| 8 | [Stack Overflow 2025 Developer Survey — AI section](https://survey.stackoverflow.co/2025/ai) | Stat-mining for the numbers in `survival-sheet.md` §Numbers | 10 min |

## Not a reading link — the one thing worth building

[Vercel AI SDK docs](https://ai-sdk.dev/docs/introduction). A single streaming feature in TypeScript
would close three gaps at once (OpenAI API, evals, cost modelling) in the language you're strongest in.
**Deferred by decision on 2026-08-15** — revisit at Day 7. See `README.md` and the plan's §5.

---

## ⚠ Sourcing discipline

Three things surfaced during research that need flagging, because repeating them would cost more than
saying nothing:

1. **The Gartner "context engineering is in, prompt engineering is out" quote.** Circulating widely.
   **Could not be traced to Gartner anywhere.** Do not quote it. Cite Anthropic (#2 above) instead — it
   says the same thing and it's a primary source.
2. **"MCP was donated to a neutral foundation."** Widely reported, not confirmed from a primary source.
   Safe version: *"it's supported natively across Claude, ChatGPT, VS Code and Cursor"* — that part is
   verifiable.
3. **AI coding tool market-share percentages and "X% of code at Google is AI-generated."** Aggregator
   blogs, not audited. Quoting a stale or wrong number is worse than quoting none.

**The rule:** a number you can't source is a number you don't say. Stale specifics are worse than
silence, because they invite a follow-up you can't survive.

## What is deliberately not here

RAG tutorials, vector database comparisons, LangChain guides, transformer explainers, fine-tuning
walkthroughs, and every "top 50 AI interview questions" listicle. Those are Tier 3 or they're written for
AI/ML engineer candidates, which is a different job with a different interview loop.
