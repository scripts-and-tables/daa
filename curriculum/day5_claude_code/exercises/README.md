# Day 5 — Exercises

These exercises practice **verification** as much as prompting. The goal isn't "get Claude to produce an answer" — it's "produce an answer **and confirm it's right**."

Each exercise has three parts: the prompt to give Claude, what to check, and what to do if the check fails.

---

## Exercise 1 — Reproduce Day 2 in SQL

**Prompt to Claude Code:**

```
INPUT: data/olist/olist_orders_dataset.csv,
       data/olist/olist_order_reviews_dataset.csv
TASK:  Using DuckDB, write a single SQL query that returns the
       average review score for orders delivered late vs on-time.
       "Late" = order_delivered_customer_date > order_estimated_delivery_date.
       Skip orders without a delivery date.
OUTPUT: a SQL query I can paste into duckdb, and the result of running it.
```

**Verify:**
- Open `curriculum/day2_sql/solutions/README.md` Exercise 4. Compare Claude's query to the reference. They might look different but should produce the same numbers (~2.3 late, ~4.2 on-time).
- If Claude's numbers differ by more than ±0.1, ask: *"My reference shows late=2.3, on_time=4.2. Yours shows X and Y. What's the discrepancy?"*

**If the check fails:** the most common cause is Claude joining incorrectly (e.g., inner join when left join needed, or filtering reviews before joining). Read Claude's query and find the issue yourself — don't just re-ask.

---

## Exercise 2 — Reproduce Day 3 in pandas

**Prompt to Claude Code:**

```
INPUT: data/olist/olist_orders_dataset.csv,
       data/olist/olist_order_reviews_dataset.csv
TASK:  Using pandas in a notebook cell, bucket orders by delivery time
       (0-7, 8-14, 15-30, 30+ days), then compute the average review
       score per bucket.
OUTPUT: a code cell I can run in Jupyter, and the resulting table.
```

**Verify:**
- Compare to your own Day 3 Exercise 4.3 result.
- Bucket order should match: review score should drop monotonically as buckets get worse.

**If the check fails:** common bug — Claude might use `pd.cut` with wrong bin edges (e.g., 0 instead of -1 as the first edge, which drops 0-day deliveries). Or it might `parse_dates` wrong.

---

## Exercise 3 — Free-text analysis (the real AI task)

This is the one Excel/SQL/Python can't do well on their own.

**Prompt to Claude Code:**

```
INPUT: data/olist/olist_order_reviews_dataset.csv
TASK:
  1. Filter to reviews with review_score IN (1, 2) and a non-empty
     review_comment_message (these are unhappy customers who wrote something).
  2. The comments are in Portuguese. For each comment, classify the
     primary complaint into one of these themes:
     - "delivery_late" — anything about slow shipping, didn't arrive
     - "wrong_product" — wrong item sent
     - "damaged" — item arrived broken/damaged
     - "quality" — item works but is low quality / not as described
     - "no_show" — order never arrived at all
     - "other"
  3. Produce a count per theme, and a sample of 3 reviews per theme.
OUTPUT: a summary table (theme | count), plus the sample reviews.
```

**Verify:**
- Pick 5 reviews from Claude's output at random. Translate them (or use Claude itself in a separate prompt) and confirm the theme matches.
- Total of theme counts should equal the number of filtered reviews. If it doesn't, Claude double-counted or missed some.
- The "other" bucket should be small (<15%). If it's huge, the themes are too narrow — iterate with Claude on the taxonomy.

**If the check fails:**
- Wrong language detection: Claude might assume English. The prompt explicitly mentions Portuguese — that should fix it.
- Themes overlapping: ask Claude to make them mutually exclusive.
- Hallucinated reviews: very rare but possible. The "sample 3 reviews per theme" check catches this — if you can't find the sample text in the source CSV, Claude made it up. Push back hard.

---

When you finish, compare your prompts + verification process with [`../solutions/README.md`](../solutions/README.md). The solutions there are about **process**, not specific outputs (your numbers may differ slightly from the reference, that's fine).
