# Python (for a JS developer) Resources

**Rule: Exercism is the only resource Tarun follows.** Everything under "Citation only" backs up
claims in the lessons. Never send him there as reading. The lessons do that job.

## Knowledge

- [Exercism Python track](https://exercism.org/tracks/python)
  **The one resource.** 17 concepts, each with a learning exercise, plus ~146 practice exercises with
  automatic tests and free volunteer mentors. Use for: every chapter and every exercise.
  Concept order (from the track's `config.json`, checked 2026-10-03): basics → bools → numbers →
  conditionals → comparisons → strings → string-methods → lists → list-methods → loops → tuples →
  dicts → dict-methods → unpacking → sets → classes → generators.

### Citation only (backs up lesson claims, not for him to read)
- [Python 3 docs](https://docs.python.org/3/) and the [tutorial](https://docs.python.org/3/tutorial/).
  Use for: exact language rules and error names.
- [PEP 8: style guide](https://peps.python.org/pep-0008/). Use for: naming (snake_case, SCREAMING_SNAKE_CASE).
- [PEP 257: docstrings](https://peps.python.org/pep-0257/). Use for: what a docstring is and how to write one.
- [PEP 20: the Zen of Python](https://peps.python.org/pep-0020/). Use for: `import this`, "readability counts".
- [OpenAI Agents SDK: function tools](https://openai.github.io/openai-agents-python/tools/).
  Use for: proof that agent frameworks read docstrings to describe tools to the model.
- [Exercism Python source on GitHub](https://github.com/exercism/python). Use for: checking what an
  exercise's tests actually require, so lesson handoffs are accurate. Never for solutions.

## Wisdom (Communities)

- [Exercism mentoring](https://exercism.org/tracks/python) (built into every exercise).
  Free human review of his solution. Use for: "is this how a Python person would write it?" This is
  the one community that sits inside his single resource, so it costs no extra context switching.

## Gaps (Exercism doesn't teach these; the course covers them as bridge lessons)
- f-strings / string formatting (Exercism's `pretty-leaflet` exercise is still work-in-progress)
- Functions in depth: default args, keyword args, `*args` / `**kwargs`
- Comprehensions
- Exceptions: `try` / `except` / `raise`
- Modules, `import`, `pip`, virtual environments, `.env` files
- Files, `with`, JSON
- Type hints (FastAPI and Pydantic are built on them)
- `async` / `await` and `asyncio`
