# Lesson 2 — Prompting that works

**Time:** ~25 min.
**You'll be able to:**

- Write prompts that consistently produce useful, verifiable output
- Use the **INPUT / TASK / OUTPUT** template — the most useful 30 seconds of the day
- Be specific about file paths, columns, scopes, and result shapes
- Recognise when a prompt is too vague and tighten it
- Iterate on prompts when the first answer isn't right

If you take one thing from Day 5, take this lesson. The difference between a 10-second answer that's correct and a 30-minute analysis that's generic is mostly about the prompt.

## The single most useful prompt template

```
INPUT:  <which file(s), which columns, which subset>
TASK:   <what to do in plain English>
OUTPUT: <what shape of result you want — a table, list, summary, chart>
```

Three lines. Used consistently, they produce a 5-10× quality lift over freeform prompting.

### Compare two prompts

**Too vague:**

> Analyse the reviews.

What you'll get back: a generic 200-line essay with high-level observations, half of which don't apply to Olist, and zero verifiable numbers.

**Specific:**

> INPUT: `data/olist/olist_order_reviews_dataset.csv`, filtered to rows where `review_score <= 2` and `review_comment_message` is non-empty.
> TASK: Sample 200 of those reviews. Classify each into one of six themes: `delivery_late`, `wrong_product`, `damaged`, `quality`, `no_show`, `other`. The comments are in Portuguese — handle that.
> OUTPUT: a table with `theme | count | three_sample_comments`, plus the assumptions you made when classifying.

What you'll get back: an actual table with numbers you can verify and decisions you can push back on.

The difference isn't AI cleverness; it's specificity.

## Specificity, in detail

### Be specific about inputs

| Vague | Specific |
|---|---|
| "the reviews" | "rows in `olist_order_reviews_dataset.csv` where `review_score <= 2`" |
| "the orders" | "the `orders` table in `olist.db`, joined with `customers` to get state" |
| "the data" | (don't say this) |

File paths and column names beat noun phrases. Claude has no way to disambiguate "the data" without asking; pre-empt the question.

### Be specific about scope

| Vague | Specific |
|---|---|
| "all customers" | "customers with at least 5 orders" |
| "recent orders" | "orders placed after 2018-01-01" |
| "bad reviews" | "reviews with score 1 or 2 *and* a non-empty comment" |

Edge cases (NULLs, empty strings, undelivered orders) are where vague prompts produce wrong numbers. Spell out the filter.

### Be specific about output shape

| Vague | Specific |
|---|---|
| "summarise" | "a 3-row Markdown table: column, count, average score" |
| "tell me what's happening" | "TL;DR in 3 bullets; then 1 short paragraph per finding" |
| "make a chart" | "matplotlib bar chart, x = bucket, y = avg review, saved to `out.png`" |

Output shape is what makes the answer **comparable to other answers** — yours, your colleague's, last week's. Without it, you can't verify; you can only nod.

## A useful preamble for analytical tasks

Stick this at the top of your message when working with the Olist data:

```
Context: We're working with the Olist Brazilian e-commerce dataset.
- ~100K orders, 2017–2018.
- SQLite DB at data/olist/olist.db loaded from CSVs.
- Empty CSV cells become EMPTY STRINGS (''), not NULLs in this DB.
- Date columns in CSVs need parse_dates= when loaded via pandas.
- Product categories are in Portuguese — translate via the category_translation table.
```

You don't need to repeat this every prompt — Claude carries context within a conversation. But for the first prompt of a session, this preamble eliminates the most common silent mistakes.

## Iterating when the first answer is off

The first response is rarely the final one. Three iteration patterns:

### 1. The targeted correction

> Your query joined on `customer_id` but I want to count distinct customers across both years — use `customer_unique_id`. Re-run and show the new numbers.

Don't ask Claude to "try again" or "do it better." Tell it specifically what to change.

### 2. The "show me first" follow-up

> Before computing the average, show me the histogram of `delivery_days` so I can see whether outliers are skewing the mean.

When a number surprises you, demand the intermediate evidence before accepting it.

### 3. The reconciliation

> My Day 2 SQL gave `late = 2.3` and `on_time = 4.2`. Your pandas version gave 2.5 and 4.0. Find the discrepancy — is it the join, the filter, or the dedupe?

This is the move that turns Claude from "stochastic answer generator" into "debugging partner."

## What to avoid

| Don't say | Why |
|---|---|
| "Be creative" | Creativity is what's making it generic. |
| "Make assumptions if needed" | It will. Without telling you which. Better: "list any assumptions explicitly." |
| "Use best practices" | Means nothing. State the constraint you care about. |
| "Make it production-ready" | We're doing analysis, not shipping software. |
| "Be concise" | Useless without a target length. Say "TL;DR in 3 bullets." |

## The prompt I use most

A worked example I reach for constantly:

```
INPUT: <file path or table name>, columns <list>, filtered to <condition>
TASK: Compute <specific metric> grouped by <dimension>. Use <approach>
      (SQL / pandas / etc).
OUTPUT: A table with columns <a, b, c>. Sort by <column> <direction>.
        Top <N> rows. Show me the code you ran before showing the result.
```

Notice **"show me the code before the result."** That single phrase shifts Claude from "produce an answer" to "produce a verifiable artifact." You can now read the code, spot the mistake before trusting the number, and fix it specifically.

??? note "Try it yourself — rewrite a vague prompt"
    Here's a vague prompt:

    > Find the worst sellers in the dataset.

    Rewrite it in INPUT / TASK / OUTPUT form so it produces a specific, verifiable answer. Constraints to think about: what defines "worst"? Which seller table? How many to return? What columns?

    Drop your rewritten prompt into Claude Code and see what it returns.

    ??? success "Reveal a good rewrite"
        ```
        INPUT: `data/olist/olist.db` — tables `items`, `reviews`, `orders`,
               `sellers`. Empty cells are empty strings, not NULL.
        TASK:  For each seller with at least 50 orders, compute:
                 - total revenue (SUM of items.price)
                 - average review score across orders containing the seller's items
                 - % of reviews that are 1 or 2 stars
               Rank sellers by `revenue * (1 - avg_review_score / 5)` descending —
               this approximates "financial impact of bad reviews."
        OUTPUT: a Markdown table of the top 10, with seller_id, revenue,
                avg_review_score, pct_bad, and rank_score. Show me the SQL
                you ran before the table.
        ```

        Versus the original "find the worst sellers" — that produces a generic top-10 by review count. Your rewrite produces the *capstone-ready* answer.

## Common pitfalls

1. **"Help me with X."** Replace with "INPUT / TASK / OUTPUT for X."
2. **Asking for everything at once.** Five tasks in one prompt produces five mediocre answers. Chain them in separate prompts.
3. **Hidden assumptions about file content.** If Claude needs to know that empty strings mean missing, tell it. Don't expect it to remember from yesterday's session.
4. **Confusing "make it look good" with "make it right."** Visual polish ≠ correctness. Demand the underlying numbers first.
5. **Skipping "show me the code."** Without that phrase, you'll be trusting opaque output. With it, you're an editor of code, which is what you actually want to be.

## What's next

Continue to **[Lesson 3 — Plan mode & verification](03_plan_mode_and_verification.md)** — the structured way to catch misunderstandings before they become wrong work.
