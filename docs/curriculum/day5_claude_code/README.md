# Day 5 — Claude Code (AI-assisted analytics)

**Duration:** 4 hours
**Prerequisites:** Days 1–4
**Learning goals:** by end of day you can direct an AI coding assistant to do real analytics work in plain English — from generating SQL/pandas code to processing free-text review data — and ship a polished stakeholder report.

## What is Claude Code?

[Claude Code](https://claude.ai/code) is an AI coding assistant that can read your files, run code, and iterate with you in plain English. Think of it as "an analyst who can type 100x faster than you and never gets tired" — but who needs you to tell it what's worth doing.

For this course, we'll use **Claude Code on the Web** (browser, zero install). Sign in at [claude.ai/code](https://claude.ai/code) — same account as Claude.ai.

## Why this is Day 5

You've spent 4 days seeing what Excel, SQL, Python, and Power BI **do**. Today you learn to **orchestrate** them through an AI assistant. The lesson is not "AI replaces analysts" — it's "AI lets a beginner do work that previously required 6 months of training."

The day has two arcs:

1. **Hours 1–3:** practice with the AI on tasks you've already done by hand. You'll spot when it's right, when it's wrong, and how to steer it.
2. **Hour 4:** use it to do something genuinely new — extract themes from thousands of free-text product reviews — and ship the final capstone deliverable.

## Agenda

| Time | Block | Topic |
|---|---|---|
| 00:00–00:50 | Hour 1 — How to talk to Claude Code | Prompting basics, plan mode, verifying output |
| 00:50–01:00 | Break | |
| 01:00–01:50 | Hour 2 — AI-assisted querying | Have it write the SQL/pandas you wrote yesterday; compare and learn |
| 01:50–02:00 | Break | |
| 02:00–02:50 | Hour 3 — Review-text analysis | The real "AI" value: extract themes & sentiment from review comments |
| 02:50–03:00 | Break | |
| 03:00–03:30 | Hour 4a — Final report | Compose the 1-page report with Claude Code's help |
| 03:30–04:00 | Hour 4b — Presentations | 3 min per student, 2 questions each |

## Key concepts

### 1. The verification mindset

Claude Code can make mistakes. Sometimes confidently. **Verify everything important before trusting it.** Your job today is not to outsource your judgment — it's to multiply your output by being a good editor.

Three verification habits that will save you all week:

| Habit | What to do |
|---|---|
| **Sanity check numbers** | If Claude says "average review is 4.1", and your Day 4 dashboard said 4.1, you're probably good. If they disagree, find out why. |
| **Read code before running** | When Claude writes a SQL query or Python snippet, skim it. Does the join column match what you'd pick? |
| **Spot-check a few rows** | If Claude says "negative reviews about late delivery", click into 3 actual reviews. Are they really about delivery? |

### 2. Plan mode

Claude Code has a **plan mode** (toggle in the UI, or type `/plan`). In plan mode, Claude reads your files and proposes a plan — but doesn't write or run anything yet. **Use plan mode for any non-trivial task.** It catches misunderstandings before they become 30 minutes of wrong code.

A typical good flow:

```
1. Describe the task in plain English ("analyze why reviews are bad")
2. Toggle plan mode
3. Claude proposes a step-by-step plan
4. You read it, adjust, approve
5. Claude executes
```

### 3. Prompting that works

Bad prompt: *"Analyze the reviews."*
Good prompt: *"Take the file `capstone/day3_python/late_vs_ontime_by_seller.csv`. For the 10 sellers with the worst avg_review_late, pull all their 1- and 2-star reviews from `reviews.csv`, group the review_comment_message into 3–5 themes, and tell me the top theme for each seller."*

The difference is **specificity**: what input, what scope, what output shape.

A simple template:

```
INPUT: <which file(s), which columns, which subset>
TASK:  <what to do in plain English>
OUTPUT: <what shape of result I want — table, list, summary, chart>
```

### 4. When to use Claude Code vs do it yourself

| Use Claude Code | Do it yourself |
|---|---|
| Generating SQL or pandas you'd find tedious to write | Quick `.value_counts()` you already know |
| Free-text processing (sentiment, themes, summarization) | Filtering by a date range — faster to just write |
| Generating chart code in matplotlib | Clicking 2 buttons in Power BI |
| Writing the prose for your final report | Final business interpretation — that's *your* judgment |

A useful instinct: **use Claude for the typing, keep the thinking yourself.**

## Exercises

See [`exercises/`](exercises/README.md) — 3 drills designed to build the verification reflex. Solutions in [`solutions/`](solutions/README.md) (these include example prompts and example Claude output for comparison).

## Capstone task for today

See [`../../capstone/day5_ai/README.md`](../../capstone/day5_ai/README.md).

## Common pitfalls

- **Letting Claude do the thinking.** It will happily write a 200-line analysis based on a 3-word prompt. The result will be generic and miss your business context. Be specific.
- **Trusting numbers without checking.** Claude can hallucinate. Always sanity-check key numbers against Day 2/3/4 outputs.
- **Asking for too much at once.** Break tasks into small steps. A 30-minute prompt produces 30-minute mistakes.
- **Skipping plan mode.** For anything that touches files, plan mode catches misunderstandings cheap.
- **Treating Claude like a search engine.** It's a collaborator. Iterate. Push back. "That number doesn't match — recheck and tell me where the discrepancy is."
