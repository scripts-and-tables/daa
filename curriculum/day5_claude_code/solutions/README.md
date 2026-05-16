# Day 5 — Solutions (process, not outputs)

Unlike Days 1–4, today's "solution" is about **how** you worked, not what the final answer was. Compare your process to these notes.

---

## Exercise 1 — Reproduce Day 2 in SQL

**A good Claude response** looks something like:

```sql
WITH delivery_status AS (
    SELECT order_id,
           CASE WHEN order_delivered_customer_date > order_estimated_delivery_date
                THEN 'late'
                ELSE 'on_time'
           END AS status
    FROM   read_csv_auto('data/olist/olist_orders_dataset.csv')
    WHERE  order_delivered_customer_date IS NOT NULL
)
SELECT ds.status, AVG(r.review_score)
FROM   delivery_status ds
JOIN   read_csv_auto('data/olist/olist_order_reviews_dataset.csv') r
       ON ds.order_id = r.order_id
GROUP BY ds.status;
```

Expected output:

```
late    | 2.3
on_time | 4.2
```

**Common Claude mistakes to spot:**
- Forgot `WHERE order_delivered_customer_date IS NOT NULL` — produces wrong counts because NULL dates count as "not late"
- Used `LEFT JOIN` to reviews — orders without reviews shouldn't be counted, so `JOIN` is correct here
- Used `read_csv('...')` instead of `read_csv_auto('...')` — both work in DuckDB, but `_auto` infers types

---

## Exercise 2 — Reproduce Day 3 in pandas

**A good Claude response** looks something like:

```python
import pandas as pd

orders = pd.read_csv(
    'data/olist/olist_orders_dataset.csv',
    parse_dates=['order_purchase_timestamp', 'order_delivered_customer_date']
)
reviews = pd.read_csv('data/olist/olist_order_reviews_dataset.csv')

orders['delivery_days'] = (
    orders['order_delivered_customer_date'] - orders['order_purchase_timestamp']
).dt.days

merged = orders.merge(reviews, on='order_id', how='inner')
merged['bucket'] = pd.cut(
    merged['delivery_days'],
    bins=[-1, 7, 14, 30, 1000],
    labels=['0-7', '8-14', '15-30', '30+']
)
result = merged.groupby('bucket', observed=True)['review_score'].mean()
print(result)
```

Expected output (approximate):

```
0-7      4.34
8-14     4.07
15-30    3.31
30+      2.45
```

**Common Claude mistakes to spot:**
- Bin edges starting at 0 (drops 0-day deliveries — same-day delivery)
- `observed=False` on a categorical groupby (gets a deprecation warning and extra empty rows)
- Forgot `parse_dates=` → subtraction fails

---

## Exercise 3 — Free-text theme extraction

**This is the hardest one to verify because there's no ground truth.** Your verification process is more important than the output.

A good verification workflow:

1. **Spot-check 10 random reviews across themes.** Open the original Portuguese text, run it through Google Translate, confirm the theme assigned by Claude is reasonable.
2. **Spot-check the "other" bucket.** If it has reviews that clearly belong to one of the named themes, the prompt taxonomy is broken — iterate.
3. **Check the totals reconcile.** Sum of per-theme counts should equal the filtered review count.
4. **Sanity-check magnitudes.** "delivery_late" is almost certainly the biggest bucket for a marketplace — if it's not, something's off in the classification.

**Expected rough distribution (yours will vary):**

```
delivery_late      ~35-45%
no_show            ~15-25%
wrong_product      ~8-12%
quality            ~10-15%
damaged            ~5-8%
other              ~5-10%
```

**If Claude's "other" is >25%:**

Iterate with a prompt like:
```
The "other" bucket is too large. Sample 20 reviews from "other" and
tell me what they're about. Then propose 1–2 new theme categories.
```

**Sample iteration cycle:**

```
You: "the 'other' bucket has 38% of reviews — that's too high"
Claude: "Looking at samples, many are about delivery speed but in
        less direct language. I should expand 'delivery_late' to
        include phrases like 'demorou' (took long) and 'esperando'
        (waiting). Re-running classification..."
You: "Re-run and show new distribution"
```

That back-and-forth is the lesson.

---

## What "good prompting" looks like — a meta-lesson

Look back at your three prompts. Compare to mine:

| Aspect | Beginner prompt | Better prompt |
|---|---|---|
| Input | "the reviews" | "olist_order_reviews_dataset.csv, score <= 2, non-empty comments" |
| Task | "analyze them" | "classify into 6 specific themes I list" |
| Output | "summarize" | "table of theme | count + 3 sample reviews per theme" |

The discipline of being specific about **input, task, output** is the single biggest skill multiplier in working with AI tools. It transfers to every AI tool you'll ever use.
