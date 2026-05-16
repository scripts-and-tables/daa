# Day 5 — Claude Code (AI-assisted analytics)

**Duration:** 4 hours
**Prerequisites:** Days 1–4
**Learning goals:** by end of day you can direct an AI coding assistant to do real analytics work in plain English — from generating SQL/pandas code to processing free-text review data — and ship a polished stakeholder report.

## What is Claude Code?

[Claude Code](https://claude.ai/code) is an AI coding assistant that can read your files, run code, and iterate with you in plain English. Think of it as "an analyst who can type 100x faster than you and never gets tired" — but who needs you to tell it what's worth doing.

For this course, we'll use **Claude Code on the Web** (browser, zero install). Sign in at [claude.ai/code](https://claude.ai/code) with the same account as Claude.ai.

## Why this is Day 5

You've spent four days seeing what Excel, SQL, Python, and Power BI **do**. Today you learn to **orchestrate** them through an AI assistant. The lesson is not "AI replaces analysts" — it's "AI lets a beginner do work that previously required six months of training, *if* you know how to direct it."

The day has two arcs:

1. **Lessons 2–4 + Hours 1–3:** practice with Claude Code on tasks you already did by hand. You'll spot when it's right, when it's wrong, and how to steer it.
2. **Lesson 5 + Hour 4:** use it to do something genuinely new — extract themes from thousands of free-text product reviews — and ship the final capstone deliverable.

## Agenda

| Time | Block | Topic | Lesson |
|---|---|---|---|
| 00:00–00:20 | Hour 1 | What Claude Code is, getting connected | [Lesson 1](01_getting_started.md) |
| 00:20–00:50 | Hour 1 | Prompting that works (the INPUT/TASK/OUTPUT template) | [Lesson 2](02_prompting.md) |
| 00:50–01:00 | Break | | |
| 01:00–01:30 | Hour 2 | Plan mode & verification | [Lesson 3](03_plan_mode_and_verification.md) |
| 01:30–02:00 | Hour 2 | AI-assisted querying & analysis | [Lesson 4](04_ai_assisted_querying.md) |
| 02:00–02:10 | Break | | |
| 02:10–02:40 | Hour 3 | Text analytics & shipping the report | [Lesson 5](05_text_and_report.md) |
| 02:40–02:55 | Self-test | 12-question gate-check | [Self-test](test.md) |
| 02:55–03:00 | Break | | |
| 03:00–03:30 | Hour 4a | Capstone — assemble the final report | [Capstone](../../capstone/day5_ai/README.md) |
| 03:30–04:00 | Hour 4b | Presentations | (3 min each + 2 questions) |

## What you'll be able to do

By the end of today, you can:

- Sign in to Claude Code, point it at this repo, and prompt it productively
- Use INPUT/TASK/OUTPUT to get verifiable, specific answers
- Use plan mode for non-trivial tasks
- Sanity-check numbers, read generated code, spot-check rows — the verification trio
- Translate analyses between SQL, pandas, and DAX in seconds
- Extract themes from 10,000+ Portuguese reviews and tie them to specific sellers
- Assemble a 1-page stakeholder report combining numbers from four days plus today's qualitative findings

## Lessons

| # | Topic | Time | Key things |
|---|---|---|---|
| 1 | [Getting started](01_getting_started.md) | ~20 min | The interface, signing in, when to reach for AI vs. do it yourself |
| 2 | [Prompting that works](02_prompting.md) | ~25 min | INPUT/TASK/OUTPUT, specificity, iteration patterns |
| 3 | [Plan mode & verification](03_plan_mode_and_verification.md) | ~25 min | Plan mode workflow, the verification reflex, productive pushback |
| 4 | [AI-assisted querying](04_ai_assisted_querying.md) | ~30 min | Re-doing Day 2 / 3 with Claude, the four most common mistakes |
| 5 | [Text analytics & the report](05_text_and_report.md) | ~30 min | Theme extraction from reviews, taxonomy iteration, assembling the final deliverable |

Practice is folded into each lesson as collapsible "Try it yourself" boxes — try the prompt, verify the output, reveal the gotchas.

## Self-test

When you've worked through all five lessons, take the **[12-question self-test](test.md)** before the capstone. ~15 minutes. More conceptual than the previous days — about *how* to work with AI, not which function to call.

## Capstone task for today

[`../../capstone/day5_ai/README.md`](../../capstone/day5_ai/README.md) — assemble the 1-page stakeholder report, present it. The deliverable that the whole week has been building toward.

## Common pitfalls

- **Letting Claude do the thinking.** It will happily write a 200-line analysis based on a 3-word prompt. The result will be generic and miss your business context. Be specific.
- **Trusting numbers without checking.** Sanity-check key numbers against Day 2/3/4 references. The verification reflex is the whole skill.
- **Asking for too much at once.** Break tasks into small steps. A 30-minute prompt produces 30-minute mistakes.
- **Skipping plan mode.** For anything that touches files, plan mode catches misunderstandings cheap.
- **Treating Claude like a search engine.** It's a collaborator. Iterate. Push back with specific corrections, not "try again."
- **Letting Claude write the recommendations.** The headline findings can be drafted; the *what should we do* is yours.
