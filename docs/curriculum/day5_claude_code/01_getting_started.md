# Lesson 1 — What Claude Code is & getting started

**Time:** ~20 min.
**You'll be able to:**

- Sign in to Claude Code on the Web and load this course's repository
- Recognise the parts of the interface: the chat, the file pane, the plan-mode toggle
- Ask Claude to read a file or run a small command, and read the result
- Decide, for any given task, whether to reach for Claude Code or just do it yourself

This lesson is short on purpose. Day 5's real learning happens in Lessons 2–5; this one just gets the tool in front of you so the rest works.

## What Claude Code is

[Claude Code](https://claude.ai/code) is an AI coding assistant that can read your files, run shell commands, write code, and iterate with you in plain English. Think of it as **an analyst who types 100× faster than you and never gets tired** — but who needs you to tell it what's worth doing, and to spot-check its work.

Two ways to use it:

- **Claude Code on the Web** — browser, zero install. **Recommended for class.** Sign in at [claude.ai/code](https://claude.ai/code).
- **Claude Code CLI** — terminal, installed locally with `npm install -g @anthropic-ai/claude-code`. More powerful for advanced workflows; same fundamentals.

For today we'll use the Web version exclusively. If you want to install the CLI later, the prompts and habits in this course transfer.

## Why this is the final day

You've spent four days seeing what Excel, SQL, Python, and Power BI **do**. Today you learn to **orchestrate** them through an AI assistant. The lesson is not "AI replaces analysts" — it's "AI lets a beginner do work that previously required six months of training, *if* you know how to direct it."

The day has two arcs:

1. **Lessons 2–4:** practice with Claude Code on tasks you already did by hand. You'll spot when it's right, when it's wrong, and how to steer it.
2. **Lesson 5 + capstone:** use it to do something genuinely new — extract themes from thousands of free-text product reviews — and ship the stakeholder report.

## The interface

When you open Claude Code on the Web, three things matter:

| Panel | What it does |
|---|---|
| **Chat** | Where you type prompts. Claude's responses appear here. Code blocks have a "run" button. |
| **Files** | The repo Claude can read and write. It can see anything in this directory tree. |
| **Plan mode toggle** | A switch that puts Claude in "read and propose, don't execute" mode. Critical for non-trivial tasks. (Lesson 3.) |

The chat history is saved per session. You can pick up where you left off when you come back later — even after closing the tab.

### Connecting the course repo

```
Settings → Repository → Connect → paste this repo's URL (or your fork)
```

Claude can now read `data/`, `curriculum/`, `capstone/`, and write into folders you give it access to.

## A 30-second first interaction

Open Claude Code. Paste this:

```
Read data/olist/load_into_sqlite.sql and tell me the eight tables it creates,
in one sentence each.
```

You should get back something like:

> The script creates eight tables: `orders` (one row per order with status and timestamps), `items` (line items per order with price and seller), `reviews` (one row per review with score and comment), `customers` (customer location), `sellers` (seller location), `products` (product metadata including Portuguese category names), `payments` (payment method and value per order), and `category_translation` (Portuguese → English category names).

If you got that, the connection works. If Claude says it can't find the file, the repo isn't connected — go back to Settings.

## When to use Claude Code vs. do it yourself

| Use Claude Code | Do it yourself |
|---|---|
| Generating SQL or pandas you'd find tedious to write | A quick `.value_counts()` you already know |
| **Free-text processing** (sentiment, themes, summarisation) — the real AI value | Filtering by a date range — faster to just write |
| Generating chart code in matplotlib | Clicking two buttons in Power BI |
| Writing the prose for your final report | The final business interpretation — that's *your* judgment |
| Translating between SQL ↔ pandas ↔ DAX | Running a query you've already written |
| Explaining unfamiliar code | Running familiar code |

A useful instinct: **use Claude for the typing, keep the thinking yourself.**

## How Claude Code is different from a chatbot

If you've used Claude.ai or ChatGPT for one-shot questions, Claude Code feels familiar but has three superpowers:

1. **It reads your files.** No copy-pasting CSV samples into the chat — point it at the path.
2. **It runs code.** It can execute the SQL or Python it writes and report the actual output, not a guess.
3. **It plans.** Plan mode is a structured "let me think before I do" cycle that catches misunderstandings cheaply.

The cost of these powers: Claude can also confidently produce wrong work. The next lessons are about steering it well and verifying its output.

??? note "Try it yourself — three warm-up prompts"
    Try these one at a time. Each should take Claude 5–30 seconds.

    1. *"Count the number of rows in `data/olist/olist_orders_dataset.csv` and tell me the date range of the first column. One sentence."*
    2. *"Open `docs/capstone/day1_excel/README.md` and summarise the deliverable in 50 words."*
    3. *"In `data/olist/olist_order_reviews_dataset.csv`, what fraction of `review_comment_message` values are empty?"*

    For each, two things matter:

    - **Did Claude do what you asked?** Read the response.
    - **Can you verify the number?** Open the CSV, check the date range, count the empty cells. If Claude's number matches yours, you can trust this kind of task. If not, you've discovered something useful about its limits.

    ??? success "Expected (approximate)"
        1. ~99,441 rows; dates span September 2016 to October 2018.
        2. Should faithfully reproduce the Day 1 capstone task (load orders + reviews, derive delivery_days, two pivots).
        3. ~58% of `review_comment_message` values are empty in Olist's dataset.

## Common pitfalls

1. **Pasting raw CSV samples into the prompt.** Don't. Give Claude the file path; it'll read more accurately than you can paste.
2. **Treating Claude like a search engine.** It's a collaborator. Iterate. Push back. "Try again with the right column name."
3. **Asking too vague a question.** "Analyse the reviews" produces generic output. Lesson 2 fixes this.
4. **Skipping plan mode for anything that touches files.** Lesson 3 fixes this.
5. **Ignoring the file pane.** If Claude wrote a file, look at it. Don't trust the description.

## What's next

Continue to **[Lesson 2 — Prompting that works](02_prompting.md)** — the most leverage you'll get in the entire day comes from a single template.
