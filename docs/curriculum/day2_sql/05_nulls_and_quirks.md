# Lesson 5 — NULLs, types & SQLite quirks

**Time:** ~25 min.
**You'll be able to:**

- Reason correctly about `NULL` — including why `NULL = NULL` is false
- Use `IS NULL`, `IS NOT NULL`, `COALESCE`, and `NULLIF`
- Handle the SQLite-from-CSV quirk where "missing" values are empty strings, not NULLs
- Compute the number of days between two date strings with `julianday()`
- Use `CAST(… AS REAL)` when SQLite's permissive typing isn't what you want
- Combine all five lessons in a CTE that tags late-vs-on-time deliveries and aggregates reviews

The last 25 minutes of Day 2. Mostly about the small things that make queries return the right number instead of a confidently wrong one.

## `NULL` is not a value — it's the absence of one

!!! note "Remember from Day 1"
    Excel's `IFERROR` swallowed missing values silently — you wrapped a formula and got a fallback. SQL's NULLs are explicit but propagate through every operation: any arithmetic involving `NULL` is `NULL`, and every comparison to `NULL` is `NULL` (not true, not false). You'll handle them deliberately here.

`NULL` means "we don't know." That's why comparisons to NULL are weird:

```sql
SELECT NULL = NULL;        -- NULL (neither true nor false)
SELECT NULL = 1;           -- NULL
SELECT NULL != NULL;       -- NULL
```

"Is unknown equal to unknown?" The honest answer is "I don't know" — which SQL spells `NULL`. Since `WHERE` keeps only rows where the predicate is *true*, a `NULL` predicate filters the row out.

**Always use `IS NULL` / `IS NOT NULL`** when checking for missing values:

```sql
SELECT COUNT(*) FROM reviews WHERE review_comment_message IS NULL;
SELECT COUNT(*) FROM reviews WHERE review_comment_message IS NOT NULL;
```

### `COUNT(*)` vs `COUNT(column)` (revisited)

```sql
SELECT COUNT(*)                       FROM reviews;   -- ~100k
SELECT COUNT(review_comment_message)  FROM reviews;   -- ~40k  (NULL comments skipped)
```

`COUNT(column)` is the same as `COUNT(*) WHERE column IS NOT NULL`. Use it to count "rows that actually have this field filled in."

### `AVG`, `SUM`, `MIN`, `MAX` ignore NULLs

If half your `review_score` rows are NULL, `AVG(review_score)` averages over the non-null half. Usually what you want — but worth remembering when a number looks suspicious.

## `COALESCE` and `NULLIF`

`COALESCE` returns the first non-NULL argument:

```sql
SELECT COALESCE(review_comment_message, '(no comment)') AS comment
FROM   reviews;
```

If `review_comment_message` is NULL, you get `'(no comment)'` instead. Same idea as Excel's `IFERROR` / a Python `or` default.

`NULLIF(a, b)` returns NULL when `a = b`, otherwise `a`. Most useful for avoiding division by zero:

```sql
SELECT total_revenue / NULLIF(n_orders, 0) AS avg_order_value
FROM   seller_stats;
```

If `n_orders` is 0, the divisor becomes NULL, and the result is NULL — no error, no garbage, just a row that says "we don't know." Pair with `COALESCE` to give it a display fallback.

## The SQLite-from-CSV gotcha: empty strings, not NULLs

The Olist database is loaded from CSV via `load_into_sqlite.sql`. SQLite's CSV import puts an **empty string `''`** wherever the CSV had no value — not `NULL`.

So this **doesn't** find undelivered orders:

```sql
SELECT COUNT(*) FROM orders WHERE order_delivered_customer_date IS NULL;
-- → 0
```

But this does:

```sql
SELECT COUNT(*) FROM orders WHERE order_delivered_customer_date = '';
-- → ~3000
```

**Rule for today's data:** to test "missing," use `= ''`. Or write `WHERE col != ''` to mean "has a value." This is the single biggest gotcha when you bridge CSV → SQLite.

In a database loaded from a "real" source (Postgres, MySQL, an ETL pipeline), use `IS NULL` as usual. The CSV-empty-string quirk is specifically about loaders that don't normalise blanks to NULL.

!!! tip "Defensive pattern"
    For columns that *might* be either:
    ```sql
    WHERE col IS NOT NULL AND col != ''
    ```
    Covers both worlds.

## SQLite's permissive types

SQLite doesn't enforce column types the way Postgres does. After CSV import every column is technically TEXT — but SQLite happily does `AVG('123.45')` because it auto-converts text-that-looks-like-a-number on the fly.

This works:

```sql
SELECT AVG(price), MAX(price) FROM items;
```

…even though `price` is stored as text. SQLite figures it out.

When it bites: arithmetic on columns that aren't all numbers, or when the database engine you eventually move to (Postgres, the data warehouse) refuses to do the implicit conversion. Be explicit when correctness matters:

```sql
SELECT AVG(CAST(price AS REAL)) FROM items;
```

`CAST(value AS REAL)` forces a floating-point conversion. `CAST(value AS INTEGER)` forces a whole number. Use it the moment you see a numeric column behaving oddly.

### Integer division is a real thing

```sql
SELECT 1 / 3;          -- 0   (integer division)
SELECT 1.0 / 3;        -- 0.333…
SELECT 1.0 * 1 / 3;    -- 0.333…
```

When you divide two integers, SQLite returns an integer. Multiply by `1.0` or cast one side to `REAL` to force floating-point. The `100.0 * SUM(...) / COUNT(*)` pattern from Lesson 2 isn't decoration — the `100.0` is what makes the division behave.

## Date math: `julianday`

Olist's dates are ISO strings like `'2017-10-02 10:56:33'`. ISO format is sortable as a string, which is why our `WHERE order_purchase_timestamp >= '2018-03-01'` filter from Lesson 1 worked without a date type at all.

But to compute *differences* between dates — e.g., "days from purchase to delivery" — you need actual numbers:

```sql
SELECT order_id,
       CAST(julianday(order_delivered_customer_date) - julianday(order_purchase_timestamp) AS INTEGER) AS delivery_days
FROM   orders
WHERE  order_delivered_customer_date != '';
```

`julianday()` converts a date string into a floating-point number (days since Nov 24, 4714 BC, in case you're curious). Subtract two of them and you get a day count. `CAST(… AS INTEGER)` rounds it down.

Other date helpers worth knowing exist but are rarely needed for analytics: `date()`, `strftime()`, `datetime()`. Look them up if you need them.

??? note "Try it yourself — late vs on-time review scores (combines everything)"
    Write a **single query** that answers: *"What's the average review score for orders that were delivered late vs on-time?"*

    Definitions:

    - **Late** = `order_delivered_customer_date > order_estimated_delivery_date`
    - **On-time** = `order_delivered_customer_date <= order_estimated_delivery_date`
    - Skip orders where either date is missing (empty string).

    Expected output:

    ```
    delivery_status | avg_review
    late            | ?
    on_time         | ?
    ```

    *Hint:* CTE + `CASE`. Watch the empty-string filter.

    ??? success "Reveal solution"
        ```sql
        WITH delivery_status AS (
            SELECT order_id,
                   CASE WHEN order_delivered_customer_date > order_estimated_delivery_date
                        THEN 'late'
                        ELSE 'on_time'
                   END AS status
            FROM   orders
            WHERE  order_delivered_customer_date != ''
              AND  order_estimated_delivery_date != ''
        )
        SELECT   d.status, AVG(r.review_score) AS avg_review
        FROM     delivery_status d
        JOIN     reviews r ON d.order_id = r.order_id
        GROUP BY d.status;
        ```

        Expected output (approximate):

        ```
        late    | 2.3
        on_time | 4.2
        ```

        The gap is huge — late deliveries clearly cost customer satisfaction by about two stars on a five-point scale. **This is exactly the kind of finding the capstone is building toward.** Write it down in the comments of your capstone `queries.sql`.

## Common pitfalls

1. **`column = NULL` everywhere.** Always returns no rows. Use `IS NULL`.
2. **Forgetting empty-string-vs-NULL in this dataset.** `WHERE order_delivered_customer_date IS NULL` returns zero rows. Use `= ''` (or both — see the defensive pattern above).
3. **Integer division returning 0.** `SUM(bad) / COUNT(*)` is integer division. Multiply by `1.0` first.
4. **`AVG` on a column where NULL means "no value."** Fine — `AVG` skips NULLs. But it's *not* fine if NULL means "zero": you'll under-count. Use `COALESCE(col, 0)` first if NULL-as-zero is the right semantic.
5. **Trusting `CAST` to validate.** `CAST('abc' AS INTEGER)` returns 0 in SQLite (not an error). Validate inputs upstream, not in the cast.

## How this shows up in the capstone

Every aggregate in the capstone risks the integer-division gap (`100.0 *` saves you), and every filter on "delivered" risks the empty-string gap (`!= ''` saves you). These are not edge cases — they're the difference between a believable result and one that looks wrong.

## You've finished the lessons

You've covered the full Day 2 syllabus. Take the **[self-test](test.md)** — it's twelve short questions, gate-checks you before the capstone. Then move on to **[the Day 2 capstone](../../capstone/day2_sql/README.md)**.
