# Day 2 — SQL

**Duration:** 4 hours
**Prerequisites:** Day 1 (you've seen pivot tables, joins between sheets, and aggregation in Excel — SQL is the same thinking written down)
**Learning goals:** by end of day you can write `SELECT` statements against a real database, join 3–4 tables, group + aggregate, and use a CTE to break a hard query into readable steps.

## Why SQL after Excel?

Everything you did with `XLOOKUP` and pivot tables in Excel has a direct SQL equivalent — and SQL scales to millions of rows where Excel chokes. By the end of today you'll do in 3 lines of SQL what took 5 clicks and 2 columns in Excel.

| Excel | SQL equivalent |
|---|---|
| `XLOOKUP` | `JOIN` |
| `SUMIFS` | `SELECT SUM() ... WHERE ... GROUP BY ...` |
| Filter button | `WHERE` |
| Pivot table | `GROUP BY` + aggregates |
| Sort | `ORDER BY` |

## Tooling: DuckDB

We use **[DuckDB](https://duckdb.org)** — a database that runs in-process (no server to set up) and reads CSV files directly. Zero-install for the most part: install once with `brew install duckdb` (Mac) or download a binary (Windows/Linux). Then:

```sql
SELECT * FROM 'data/olist/olist_orders_dataset.csv' LIMIT 5;
```

That's it. You're querying. The Olist CSVs you downloaded yesterday are your database today.

## Agenda

| Time | Block | Topic |
|---|---|---|
| 00:00–00:50 | Hour 1 — Basics | `SELECT`, `WHERE`, `ORDER BY`, `LIMIT` |
| 00:50–01:00 | Break | |
| 01:00–01:50 | Hour 2 — Aggregation + joins | `GROUP BY`, aggregate functions, `INNER`/`LEFT JOIN` |
| 01:50–02:00 | Break | |
| 02:00–02:50 | Hour 3 — CTEs + advanced | `WITH` clauses, multi-step queries, peek at window functions |
| 02:50–03:00 | Break | |
| 03:00–04:00 | Hour 4 — Capstone | Join 4+ tables to answer real Olist questions |

## Key concepts

### 1. The shape of a SELECT

```sql
SELECT   column_a, column_b, COUNT(*) AS n
FROM     some_table
WHERE    column_a > 100
GROUP BY column_a, column_b
HAVING   COUNT(*) > 5
ORDER BY n DESC
LIMIT    10;
```

The clauses run in this **logical** order (different from how they're written):

```
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
```

Burn this in. It explains why you can't reference a `SELECT` alias in a `WHERE` (the WHERE runs first).

### 2. Joins

A join answers "for each row in A, find the matching row(s) in B."

```sql
SELECT o.order_id, c.customer_state
FROM   olist_orders o
JOIN   olist_customers c ON o.customer_id = c.customer_id;
```

- `INNER JOIN` (just `JOIN`): only rows where both sides match
- `LEFT JOIN`: every row from the left, NULLs on the right if no match
- **You almost always want one of these two.** Right and full joins exist; you rarely need them.

**Always alias your tables** (`olist_orders o`). It saves your sanity once you join 4+ tables.

### 3. GROUP BY

Same mental model as a pivot table. The columns you put in `GROUP BY` are the "row labels" of the pivot. The aggregates in `SELECT` are the "values."

```sql
SELECT   customer_state, COUNT(*) AS n_orders, AVG(price) AS avg_price
FROM     olist_order_items
GROUP BY customer_state
ORDER BY n_orders DESC;
```

**Rule:** every column in `SELECT` must either be in `GROUP BY` or wrapped in an aggregate function (`SUM`, `COUNT`, `AVG`, `MIN`, `MAX`).

### 4. CTEs (`WITH` clauses)

When a query gets complex, break it into named steps:

```sql
WITH late_orders AS (
    SELECT order_id
    FROM   olist_orders
    WHERE  order_delivered_customer_date > order_estimated_delivery_date
),
late_reviews AS (
    SELECT r.*
    FROM   olist_order_reviews r
    JOIN   late_orders l ON r.order_id = l.order_id
)
SELECT AVG(review_score) FROM late_reviews;
```

Reads top-to-bottom like a recipe. **Use CTEs liberally** — they make queries readable. Performance is the same as a subquery in modern engines.

### 5. NULLs

`NULL` ≠ anything, not even `NULL`. Use `IS NULL` / `IS NOT NULL`, never `= NULL`.

```sql
WHERE order_delivered_customer_date IS NULL  -- orders not yet delivered
```

`COUNT(column)` ignores NULLs. `COUNT(*)` counts all rows. This trips up everyone once.

## Exercises

See [`exercises/`](exercises/) — 5 drills against the Olist data. Solutions in [`solutions/`](solutions/).

## Capstone task for today

See [`../../capstone/day2_sql/README.md`](../../capstone/day2_sql/README.md).

## Common pitfalls

- **Forgetting `GROUP BY` columns.** If you `SELECT seller_id, AVG(price)` without `GROUP BY seller_id`, you'll get a confusing error or one row.
- **Joining without ON.** Cross joins explode row counts. Always include the join condition.
- **`SELECT *` in production code.** Fine while exploring; never in a query you'll reuse — it's slow and breaks when columns change.
- **Forgetting Brazil uses commas as decimal separators.** Olist already normalized to dots, but watch for it elsewhere.
