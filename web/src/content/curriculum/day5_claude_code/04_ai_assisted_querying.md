# Lesson 4 — AI-assisted querying & analysis

**Time:** ~30 min.
**You'll be able to:**

- Direct Claude Code to write SQL or pandas you can verify against your own
- Spot the four mistakes Claude makes most often on the Olist data
- Translate between dialects — SQL ↔ pandas ↔ DAX — in seconds
- Use "diff the answers" as a learning loop

This is the lesson where AI starts saving you real time. You've spent four days writing SQL and pandas by hand. Today you'll get Claude to write the same thing in 10 seconds — and use the comparison to learn faster than you could solo.

## The "diff the answers" learning loop

The fastest way to level up your SQL/pandas (or any code) is to write it yourself, then ask Claude to write it, then compare.

```
1. You write the SQL/pandas yourself (as you did Days 2–3)
2. You ask Claude to write the same thing from scratch
3. You compare — output should match, but Claude's code might be:
     - Better idiomatic style
     - Worse on edge cases (the empty-string trap, missing handlers)
     - Different but equivalent
4. You ask "why did you do X here?" for anything you don't recognise
```

The compare-and-question step is where the learning happens. It's the difference between "Claude does my work" and "Claude is a senior analyst pair-programming with me."

## The four mistakes Claude makes on the Olist data

These come up so often they're worth memorising before you start prompting.

### Mistake 1 — The empty-string-vs-NULL trap

Claude defaults to `IS NULL` when filtering for "missing" values. The Olist SQLite DB has empty strings, not NULLs (Day 2 Lesson 5). So:

```sql
WHERE order_delivered_customer_date IS NULL   -- Claude's default — returns 0 rows
WHERE order_delivered_customer_date = ''      -- what actually works
```

**How to head it off:** the preamble from Lesson 2.

> Empty CSV cells became EMPTY STRINGS, not NULLs, in this SQLite DB. Use `!= ''` to filter for present values.

If you forget the preamble and Claude makes this mistake, you'll see counts wildly off from Day 2's references. The fix is one specific follow-up.

### Mistake 2 — Wrong join type

`INNER JOIN` where you wanted `LEFT JOIN`. `LEFT JOIN` where the right side has duplicates and the row count silently inflates.

**How to head it off:** explicitly state the join in your prompt.

> JOIN orders to reviews with a LEFT JOIN — I want to keep all orders even if there's no review. Then dedupe reviews on order_id first if necessary.

### Mistake 3 — Hallucinated column names

Claude occasionally references a column that doesn't exist (e.g., `orders.review_score`, when `review_score` is on the `reviews` table).

**How to head it off:** in your first prompt of a session, ask Claude to list the columns it'll use.

> Before writing the query, list the columns and tables you'll join.

If a column is on the wrong table, this surfaces it immediately.

### Mistake 4 — pd.cut with bin edges at zero

`pd.cut(x, bins=[0, 7, 14, …])` drops rows where x is exactly 0 because of right-inclusive / left-exclusive intervals. Claude defaults to `bins=[0, …]` most of the time.

**How to head it off:** in the prompt, ask for `bins=[-1, …]` or `include_lowest=True`. Or check the row count: post-bin row count should equal pre-bin row count.

## Translating between dialects

One of Claude's most useful tricks is translating an analysis from one tool to another. You write SQL on Day 2; on Day 3 you want the same thing in pandas; on Day 5 you want it as a DAX measure.

```
INPUT: This SQL query from yesterday:
       <paste the query>
TASK:  Translate to pandas, assuming the same tables are loaded as DataFrames
       with the same names.
OUTPUT: a single code block. Note any places where the semantics differ
        (e.g., pandas merge handling vs SQL join handling).
```

This is one of the highest-leverage Claude Code uses. **Pair it with the diff-the-answers loop:** write it yourself, get Claude to translate, compare. You'll learn both dialects faster than studying either alone.

## Working with the SQLite DB

You'll use `data/olist/olist.db` throughout today. Claude Code can run SQLite queries directly:

> Run this against `data/olist/olist.db` and show me the first 10 rows of the result:
> ```sql
> SELECT * FROM orders LIMIT 10;
> ```

It will execute and paste the actual table back, which you can eyeball for the sanity-check habit from Lesson 3.

For complex queries with CTEs or subqueries, save them to `.sql` files in `capstone/day5_ai/` first:

```
Save this query to capstone/day5_ai/seller_ranking.sql and run it:
<your CTE>
Then show me the top 10 rows.
```

This way the query is version-controlled — you can reference it later or share it with a teammate.

## Working with pandas in a notebook

For pandas work, Claude can create or edit a Jupyter notebook directly:

```
Create capstone/day5_ai/exploration.ipynb. In the first cell, set up
imports (pd, sns, parse_dates). In the second cell, load all 7 Olist CSVs
into named DataFrames. In the third cell, run my row-count sanity check
against the SQL totals.
```

You'll be editing notebooks in the Claude Code UI — same chat, but the file pane shows the `.ipynb` rendered.

??? note "Try it yourself — reproduce Day 2's late-vs-on-time CTE in two dialects"
    Day 2 Lesson 5's "Try it yourself" answered: *"What's the average review score for orders delivered late vs on-time?"* The reference answer:

    - `late = 2.3`
    - `on_time = 4.2`

    Two prompts:

    **Prompt A — SQL**

    ```
    INPUT: data/olist/olist.db (SQLite, loaded from CSVs — empty cells
           are empty strings, not NULL).
           Tables: orders, reviews.
    TASK:  Write a single SQL query that returns the average review score
           for orders delivered late vs on-time.
           "Late" = order_delivered_customer_date > order_estimated_delivery_date.
           Skip orders without a delivery date (empty string).
    OUTPUT: a SQL query I can paste into DB Browser for SQLite, plus the
            result of running it.
    ```

    **Prompt B — pandas**

    ```
    INPUT: data/olist/olist_orders_dataset.csv,
           data/olist/olist_order_reviews_dataset.csv
    TASK:  Using pandas in a notebook cell, classify each order as 'late'
           or 'on_time' based on delivered vs estimated date.
           Skip rows where delivered date is missing.
           Then merge with reviews (left join on order_id; dedupe reviews
           on order_id first by keeping the latest if there are duplicates)
           and compute the average review_score per group.
    OUTPUT: a code cell I can run in Jupyter, and the resulting table.
    ```

    **Verify:** Both should give roughly `late = 2.3, on_time = 4.2`. If either is off, find which mistake from this lesson Claude made.

    ??? success "Common failure modes you might catch"
        - **SQL: forgot the empty-string filter.** Late count balloons because every undelivered order is "before" the estimated date (empty string < any real date). Tell Claude the rule again.
        - **pandas: skipped the dedupe.** Late count comes out slightly inflated. Add `reviews.drop_duplicates(subset='order_id', keep='last')` before the merge.
        - **Numbers off by 0.1–0.2.** Acceptable; methodology differences (e.g., null handling on review_score itself) cause minor variance. Investigate only if you're off by more.

## When to fight back and when to keep moving

You won't catch every Claude mistake. The line:

| Worth a follow-up | Move on |
|---|---|
| Numbers don't match your reference checkpoints | Slightly different code style |
| Code is using the wrong join column | Code is using `JOIN` where you'd have used `LEFT JOIN` but the result is the same |
| Output has wrong sign or wildly wrong magnitude | Output has rounding differences in the third decimal |
| Claude invented a column name | Claude used a more verbose column alias than you would |

Push back when the numbers are wrong or the logic is wrong. Move on when only the style differs from yours — code style is the cheapest thing to be opinionated about.

## Common pitfalls

1. **Asking Claude to "fix the bug" without finding the bug yourself.** Claude will guess, often wrong. Find the bug; tell Claude what to fix.
2. **Letting Claude do work you already did.** You've already written the late-vs-on-time SQL. Don't redo it from scratch with Claude unless you're learning. Translate, don't reinvent.
3. **Forgetting the preamble.** Every fresh session benefits from the "Empty strings, not NULLs" reminder. It pre-empts the most common mistake.
4. **Running code without reading it first.** The whole point of "show me the code" is that you read it. Don't fast-forward.
5. **Skipping verification when the answer matches your gut.** Confirmation bias is real. Verify against the *reference numbers*, not against what feels right.

## What's next

Continue to **[Lesson 5 — Text analytics & shipping the final report](05_text_and_report.md)** — the genuinely AI-shaped task, and how to assemble the final deliverable.
