# Lesson 2 — Aggregation & GROUP BY

**Time:** ~30 min.
**You'll be able to:**

- Write the five aggregate functions: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`
- Use `GROUP BY` to roll rows up into categories — the SQL equivalent of an Excel pivot
- Filter groups with `HAVING` (not `WHERE`)
- Spot the most common `GROUP BY` mistake: a column in `SELECT` that's neither grouped nor aggregated
- Use `DISTINCT` to dedupe before counting or summing

If Lesson 1 was "read individual rows," this lesson is "answer a question about lots of rows at once."

## The five aggregates

```sql
SELECT COUNT(*)        FROM orders;             -- total rows
SELECT COUNT(order_id) FROM orders;             -- non-NULL order_ids
SELECT SUM(price)      FROM items;              -- total revenue
SELECT AVG(price)      FROM items;              -- average price
SELECT MIN(price), MAX(price) FROM items;       -- price range
```

All five **ignore NULL values** — except `COUNT(*)`, which counts rows regardless.

!!! tip "`COUNT(*)` vs `COUNT(column)`"
    `COUNT(*)` counts rows. `COUNT(column)` counts rows where `column IS NOT NULL`. These can differ. If `review_id` has 2,000 NULLs out of 100,000 rows, `COUNT(*)` returns 100,000 and `COUNT(review_id)` returns 98,000.

### `AVG` ignores NULLs

```sql
SELECT AVG(review_score) FROM reviews;
```

If half the rows have `NULL` review_score, the average is computed over the non-null half. Usually what you want — but worth knowing when you're suspicious of a number.

## `GROUP BY` — the pivot table of SQL

The mental model from Day 1: the columns in `GROUP BY` are the **row labels** of a pivot; the aggregates in `SELECT` are the **values**.

```sql
SELECT   order_status, COUNT(*) AS n
FROM     orders
GROUP BY order_status;
```

Reads as: "for each value of `order_status`, count the rows."

You can group by multiple columns:

```sql
SELECT   customer_state, order_status, COUNT(*) AS n
FROM     orders o
JOIN     customers c ON o.customer_id = c.customer_id
GROUP BY customer_state, order_status
ORDER BY customer_state, n DESC;
```

One row per *unique combination* of state + status.

### The rule that trips up everyone

**Every column in `SELECT` must either be in `GROUP BY` or wrapped in an aggregate function.**

```sql
-- WRONG — order_id is neither grouped nor aggregated
SELECT   order_status, order_id, COUNT(*)
FROM     orders
GROUP BY order_status;

-- RIGHT
SELECT   order_status, COUNT(*) AS n, MIN(order_id) AS sample_id
FROM     orders
GROUP BY order_status;
```

Some databases (MySQL, SQLite) will let the wrong version run, returning an arbitrary `order_id` per group. That arbitrary value is almost never what you want. Postgres errors out, which is friendlier.

## `HAVING` — filter on aggregates

`WHERE` filters **rows** before grouping. `HAVING` filters **groups** after.

```sql
-- "Show states with more than 1000 orders, only counting delivered ones"
SELECT   c.customer_state, COUNT(*) AS n_delivered
FROM     orders o
JOIN     customers c ON o.customer_id = c.customer_id
WHERE    o.order_status = 'delivered'
GROUP BY c.customer_state
HAVING   COUNT(*) > 1000
ORDER BY n_delivered DESC;
```

Two filters, both correct:

- `WHERE order_status = 'delivered'` — keep delivered rows (per-row predicate)
- `HAVING COUNT(*) > 1000` — keep states with more than 1000 such rows (per-group predicate)

Don't try to use `HAVING` to filter rows — it works in some databases as a side-effect, but `WHERE` is faster and clearer.

## `DISTINCT` — dedupe

```sql
SELECT DISTINCT customer_state FROM customers;
SELECT COUNT(DISTINCT seller_id) FROM items;
```

`DISTINCT` returns unique combinations. Inside `COUNT`, it counts unique values.

**Common use:** "how many distinct sellers do we have?" → `COUNT(DISTINCT seller_id)`. Without `DISTINCT`, you'd count rows in `items` (every line item), not sellers (which appear on many lines).

## `ORDER BY` with aggregates

You can sort by aggregate aliases:

```sql
SELECT   product_category_name, COUNT(*) AS n_products
FROM     products
GROUP BY product_category_name
ORDER BY n_products DESC
LIMIT    10;
```

The alias `n_products` is available in `ORDER BY` because (remember Lesson 1) `ORDER BY` runs after `SELECT`.

??? note "Try it yourself — aggregations on Olist"
    1. How many orders does each `customer_state` have? Top 10 only, descending.
    2. What's the average, max, and min price of a line item?
    3. For each `order_status`, count how many orders are in that status. Sort by count descending.

    ??? success "Reveal solution"
        ```sql
        -- 1
        SELECT   c.customer_state, COUNT(*) AS n_orders
        FROM     orders o
        JOIN     customers c ON o.customer_id = c.customer_id
        GROUP BY c.customer_state
        ORDER BY n_orders DESC
        LIMIT 10;

        -- 2
        SELECT AVG(price), MAX(price), MIN(price) FROM items;

        -- 3
        SELECT   order_status, COUNT(*) AS n
        FROM     orders
        GROUP BY order_status
        ORDER BY n DESC;
        ```

        For #1 you need a `JOIN` — `orders` has `customer_id`, but state lives in `customers`. Joins are the next lesson; this one's a preview.

        For #3, expect `delivered` to dominate (~97%), with a long tail of canceled/unavailable/etc.

## Common pitfalls

1. **The "non-aggregated column in SELECT" error.** Either add it to `GROUP BY` or wrap it in an aggregate. There's no third option that gives sensible answers.
2. **Filtering aggregates in `WHERE`.** `WHERE COUNT(*) > 5` is an error. Use `HAVING`.
3. **Forgetting that `COUNT(*)` includes NULL rows.** If you want "rows where this column has data," use `COUNT(column)`.
4. **Summing percentages.** Adding up "% of total" columns is usually wrong — you probably want a weighted average.
5. **Counting line items when you meant orders.** `items` has many rows per order. `COUNT(*)` in `items` counts line items; `COUNT(DISTINCT order_id)` counts orders.

## How this shows up in the capstone

The capstone asks for "number of orders per category", "average review score per seller", "% of 1–2 star reviews." Every one of these is `GROUP BY` + an aggregate. Get fluent here.

The "% of 1–2 stars" calculation is a useful pattern worth seeing now:

```sql
SELECT   category,
         COUNT(*) AS n_reviews,
         AVG(review_score) AS avg_score,
         100.0 * SUM(CASE WHEN review_score <= 2 THEN 1 ELSE 0 END) / COUNT(*) AS pct_bad
FROM     ...
GROUP BY category;
```

`CASE WHEN` returns 1 for bad reviews and 0 otherwise; `SUM` of those 1s is "count of bad reviews"; divide by total `COUNT(*)` for a percentage. `CASE` is covered in Lesson 4.

## What's next

Continue to **[Lesson 3 — Joins](03_joins.md)** — every interesting question in this dataset crosses two or more tables.
