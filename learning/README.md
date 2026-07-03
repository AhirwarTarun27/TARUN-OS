# Learning

Home for everything the `/teach` skill produces. Keeps tutor state out of the AIOS root (`week.md`, `shipped.md`, the pipeline) so nothing collides.

## How it works

One topic = one subfolder. Run `/teach` from inside that subfolder so the workspace files land there, not in the repo root.

```
learning/
  <topic-slug>/
    MISSION.md              # why you're learning this — grounds every lesson
    RESOURCES.md            # curated high-trust sources + communities
    NOTES.md                # your preferences / working notes
    lessons/                # 0001-<name>.html — the interactive lessons
    reference/              # cheat sheets, glossaries, quick-reference docs
    learning-records/       # 0001-<name>.md — what you've actually learned
    assets/                 # shared stylesheet + reusable lesson components
```

## Starting a new topic

```bash
mkdir learning/<topic-slug>
cd learning/<topic-slug>
```

Then run `/teach <what you want to learn>`. First run, it interviews you to build `MISSION.md`.

Current quarter priorities to point this at: DSA, system design, interview prep.
