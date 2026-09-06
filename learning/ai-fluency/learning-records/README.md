# Learning records

**One file per sitting. It records what you got WRONG.** Not a summary of the lesson — the lesson is
still on disk and re-summarising it is pure cost.

These are read **once more, at D32**, and never again. That is the whole point: they exist so the exam
knows where to push, and so Day N+1's lesson can be authored against your actual gaps instead of a
guess.

## Naming

`NNNN-<same-slug-as-the-lesson>.md` — e.g. `0002-the-loop-and-agents.md`.

## The template

```markdown
# Day N — <topic>   ·   <date>

## Cold, before the lesson
<the gate-check questions and whether you actually got them. Be honest — a wrong answer here
is the most useful line in the file.>

## Got wrong
- <the thing, and what the right answer is>

## Froze on
- <a question where you knew it but couldn't produce it out loud. Different failure, different fix.>

## The rep
Did you say it out loud on the commute? ☐ yes ☐ no
How did it come out — fluent / halting / read from notes?

## Carry to tomorrow
<one line. What Day N+1 should re-ask before starting.>
```

## The rules

1. **Wrong answers are the content.** A record that says "went well, understood everything" is a record
   that tells D32 nothing and was not worth writing.
2. **Separate "got wrong" from "froze on."** Not knowing is a knowledge gap and the fix is re-reading.
   Knowing but not being able to say it is a retrieval gap and the fix is more reps out loud. They look
   the same in the moment and need opposite treatments.
3. **Never glob this folder.** A sitting reads at most the previous day's record.
4. **The next lesson is authored against this file.** Which is why Days 3-7 don't exist yet — same
   convention as `cv-defense/drills/`, where files are authored on demand rather than pre-written, so
   they can aim at real gaps instead of predicted ones.
