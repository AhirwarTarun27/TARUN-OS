# Python for an AI Engineer: the free path (Oct 2026)

*Researched 2026-10-03. Goal: a JS/React developer who has never used Python gets good enough to
take Ed Donner's Core Track and build AI backends. Free resources only.*
*Caveat: YouTube picks come from "best channels" roundups. I did not watch the videos.*

## Key fact
Ed Donner's course does not teach Python. His FAQ says it is possible with no Python but easiest with
the basics. He points beginners to guides in his repo's self-study folder. I could not open them, so
their contents are unchecked.

## The path

| # | Resource | What you get | Time |
|---|---|---|---|
| 1 | [Codecademy: Python for Programmers](https://www.codecademy.com/learn/python-for-programmers) | Syntax, control flow, functions, OOP, built-in data structures. Free, but projects and assessments are paid, so skip those | ~3 hrs |
| 2 | [Exercism Python track](https://exercism.org/tracks/python) | 146 exercises, 17 concepts, automatic checks, free volunteer mentors. Daily practice | 45-60 min/day, about 6 weeks (estimate) |
| 3 | FastAPI docs: [Python Types Intro](https://fastapi.tiangolo.com/python-types/), [Concurrency and async/await](https://fastapi.tiangolo.com/async/) | Type hints and async. FastAPI lists these as read-first | 2-3 hrs |
| 4 | [Pydantic: Models](https://pydantic.dev/docs/validation/latest/concepts/models/) | Typed models with validation | 1-2 hrs |
| 5 | [FastAPI official tutorial](https://fastapi.tiangolo.com/tutorial/) | Hands-on build: validation, dependencies, testing, deployment, background tasks, WebSockets + SSE | 1-2 weeks |

## How to fit it into the Ed Donner block
- Days 1-7: steps 1-3, plus about 1 hr/day of Exercism.
- Day 8 onward: start Ed Donner's Core Track. Keep Exercism at 45 min/day beside it.
- Weeks 3-6: FastAPI tutorial. Build a small API that streams a reply.
- No AI autocomplete during Exercism. Write it by hand.

## JS developer gotcha
Calling an `async def` function in Python does not run it. It returns a coroutine, which runs when you
`await` it or pass it to `asyncio.run()`. `asyncio.gather()` is the equivalent of `Promise.all()`.

## YouTube (by topic, not as courses)
- Corey Schafer: fundamentals, classes, virtual environments.
- ArjanCodes: clean code and design, for people who can already build.
- mCoding: how Python works inside. Later.
- Skip freeCodeCamp's 12-hour course. Reviewers call it slow for programmers.

## Left out
- Harvard CS50P: free to audit, but beginner-paced. Use only if Exercism feels too hard.
- Real Python: mostly free and well regarded, but I could not confirm which async/Pydantic articles are
  free. Use it as a lookup site.

## Sources
- [Codecademy: Python for Programmers](https://www.codecademy.com/learn/python-for-programmers)
- [Exercism: Python track](https://exercism.org/tracks/python)
- [FastAPI tutorial](https://fastapi.tiangolo.com/tutorial/)
- [Pydantic models docs](https://pydantic.dev/docs/validation/latest/concepts/models/)
- [Ed Donner FAQ](https://edwarddonner.com/faq/)
- [JavaScript async vs Python asyncio (DEV Community)](https://dev.to/roshan_singh_dd54d52bbaa7/-javascript-async-vs-python-asyncio-the-simplest-explanation-for-javascript-developers-1agp)
- [Python vs JavaScript async quirks (Monadical)](https://monadical.com/posts/python-vs-javascript-dealing-with-the-quirks-of-async-await.html)
- [CS50P problem sets](https://cs50.harvard.edu/python/psets/)
- [Best YouTube channels for Python, 2026 (Path)](https://learnwithpath.com/blog/best-youtube-channels-for-python-2026)
- [freeCodeCamp Python course reviews (Class Central)](https://www.classcentral.com/course/youtube-learn-python-full-course-for-beginners-tutorial-57873)
