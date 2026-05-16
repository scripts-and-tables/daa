# Lesson 4 — CTEs & multi-step queries

**Time:** ~30 min.
**You'll be able to:**

- Write a query as a series of named, top-to-bottom steps using `WITH … AS (…)`
- Chain multiple CTEs in one query, including a CTE that references an earlier CTE
- Use `CASE WHEN … THEN … END` to tag rows on the fly
- Recognise the cases where a CTE is clearer than a subquery — and the rare cases where it isn't
- Recognise (but not yet write) a window function

If joins gave you reach across the dataset, CTEs give you reach across **logic**: complicated questions become a recipe, not a wall of parentheses.

## The problem CTEs solve

Here's a question: *"What's the average review score for orders that were delivered late?"*

Without CTEs, you'd write nested subqueries:

```sql
SELECT AVG(review_score)
FROM   reviews r
JOIN   (
    SELECT order_id
    FROM   orders
    WHERE  order_delivered_customer_date > order_estimated_delivery_date
) late ON r.order_id = late.order_id;
```

It works. But the subquery is inline noise — you read it inside-out. Now imagine three or four nested layers. You can feel where this is going.

## `WITH … AS (…)` — name your steps

The same query as a CTE:

```sql
WITH late_orders AS (
    SELECT order_id
    FROM   orders
    WHERE  order_delivered_customer_date > order_estimated_delivery_date
)
SELECT AVG(r.review_score) AS avg_review
FROM   late_orders l
JOIN   reviews r ON l.order_id = r.order_id;
```

`WITH name AS (query)` defines a temporary, named result you can use further down. Reads top-to-bottom: "first compute `late_orders`, then aggregate reviews against it." A recipe, not a riddle.

The CTE is **not** a real table — it exists only for the duration of the query. Don't expect to find it next time you open the database.

## Multiple CTEs in one query

```sql
WITH late_orders AS (
    SELECT order_id
    FROM   orders
    WHERE  order_delivered_customer_date > order_estimated_delivery_date
),
on_time_orders AS (
    SELECT order_id
    FROM   orders
    WHERE  order_delivered_customer_date <= order_estimated_delivery_date
)
SELECT
    'late'    AS bucket, AVG(r.review_score) AS avg_review
FROM   late_orders l JOIN reviews r ON l.order_id = r.order_id
UNION ALL
SELECT
    'on_time' AS bucket, AVG(r.review_score)
FROM   on_time_orders o JOIN reviews r ON o.order_id = r.order_id;
```

Comma-separate multiple CTE definitions. Each one is independently named and reusable in the final `SELECT`.

(A cleaner version uses `CASE` instead of two CTEs — see below.)

## CTEs referencing earlier CTEs

This is where CTEs really start to pay off:

```sql
WITH seller_revenue AS (
    SELECT   seller_id,
             SUM(price)               AS revenue,
             COUNT(DISTINCT order_id) AS n_orders
    FROM     items
    GROUP BY seller_id
),
seller_reviews AS (
    SELECT   i.seller_id,
             AVG(r.review_score) AS avg_review_score
    FROM     items i
    JOIN     reviews r ON i.order_id = r.order_id
    GROUP BY i.seller_id
)
SELECT   sr.seller_id, sr.revenue, sr.n_orders, srv.avg_review_score
FROM     seller_revenue sr
JOIN     seller_reviews srv ON sr.seller_id = srv.seller_id
ORDER BY sr.revenue DESC
LIMIT    10;
```

Two CTEs (`seller_revenue` and `seller_reviews`), each one a self-contained aggregation. The final `SELECT` joins them together. **This is the canonical shape for "compute two aggregates, then combine them"** — and it's the exact shape of the capstone today.

A subquery version of this query would be unreadable. A CTE version reads like a paragraph.

## `CASE WHEN` — tag rows on the fly

CTEs combine especially well with `CASE`, which assigns a label to each row based on a condition:

```sql
SELECT order_id,
       CASE
           WHEN order_delivered_customer_date > order_estimated_delivery_date THEN 'late'
           WHEN order_delivered_customer_date IS NULL                         THEN 'undelivered'
           ELSE 'on_time'
       END AS delivery_bucket
FROM   orders;
```

Each row gets a value from one of the `WHEN` branches; `ELSE` is the fallback. Wrap the whole thing with `AS some_name` to give the new column a name.

Combined with `GROUP BY`, `CASE` turns "tag and aggregate" into one pass:

```sql
SELECT   CASE
             WHEN order_delivered_customer_date > order_estimated_delivery_date THEN 'late'
             ELSE 'on_time'
         END AS delivery_bucket,
         AVG(r.review_score) AS avg_review
FROM     orders o
JOIN     reviews r ON o.order_id = r.order_id
WHERE    o.order_delivered_customer_date != ''
  AND    o.order_estimated_delivery_date != ''
GROUP BY delivery_bucket;
```

Or with `SUM(CASE WHEN … THEN 1 ELSE 0 END)` to count things matching a condition — the pattern from Lesson 2's "% of bad reviews."

## A peek at window functions (preview only)

Window functions compute aggregates without collapsing rows:

```sql
SELECT order_id,
       price,
       AVG(price) OVER (PARTITION BY seller_id) AS seller_avg_price
FROM   items;
```

Reads as: "for each row, also tell me the average price across all rows with the same `seller_id`." Original rows preserved; the new column is the group's average attached to each row.

You won't write window functions for the capstone. Just recognise the syntax when you meet it — `OVER (PARTITION BY …)` is the signature. Day 3 (pandas) revisits the same idea as `groupby(...).transform()`.

??? note "Try it yourself — top 10 sellers by revenue + their reviews"
    Write a query that returns the **top 10 sellers by revenue**, with each seller's:

    - `seller_id`
    - `revenue` — total `SUM(price)` from `items`
    - `n_orders` — `COUNT(DISTINCT order_id)` across the seller's items
    - `avg_review_score` — average review score across orders containing the seller's items

    A seller can appear on many orders. An order can contain items from multiple sellers — for simplicity, **count an order's review against each of its sellers**.

    *Hint:* two CTEs, joined.

    ??? success "Reveal solution"
        ```sql
        WITH seller_revenue AS (
            SELECT   seller_id,
                     SUM(price)               AS revenue,
                     COUNT(DISTINCT order_id) AS n_orders
            FROM     items
            GROUP BY seller_id
        ),
        seller_reviews AS (
            SELECT   i.seller_id,
                     AVG(r.review_score) AS avg_review_score
            FROM     items i
            JOIN     reviews r ON i.order_id = r.order_id
            GROUP BY i.seller_id
        )
        SELECT   sr.seller_id, sr.revenue, sr.n_orders, srv.avg_review_score
        FROM     seller_revenue sr
        JOIN     seller_reviews srv ON sr.seller_id = srv.seller_id
        ORDER BY sr.revenue DESC
        LIMIT    10;
        ```

        **Sanity check:** the #1 seller's revenue should be in the hundreds of thousands of reais. If it's millions or just a few thousand, you've probably duplicated rows by joining wrong — most often by joining `items` to `reviews` before aggregating.

## Common pitfalls

1. **Treating a CTE like a real table.** It doesn't persist. It exists only inside this one query.
2. **Reusing the same CTE name twice in one query.** Each CTE name must be unique within a `WITH` block.
3. **Defining a CTE you never use.** It still executes. Delete unused CTEs — they're not free.
4. **Putting a comma after the *last* CTE.** Common typo. `WITH a AS (…), b AS (…),` then `SELECT …` is a syntax error. Last CTE has no trailing comma.
5. **Premature CTE-ification.** A one-line subquery doesn't need a CTE. Reach for CTEs when the query is hard to read — not as a default style choice.

## How this shows up in the capstone

The capstone is two questions, each shaped exactly like the "top 10 sellers" drill above: aggregate revenue per group, aggregate reviews per group, combine them, sort by impact. CTEs are how you'll write it without losing your mind.

## What's next

Continue to **[Lesson 5 — NULLs, types & SQLite quirks](05_nulls_and_quirks.md)** — the rough edges of CSV-loaded data that bite if you don't see them coming.
