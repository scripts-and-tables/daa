# Day 2 — Self-test

Twelve short questions. Mix of multiple choice, "write the query," and "spot the bug." Write your answer down (or in DB Browser) **before** clicking to reveal — the answer is one click away and your brain will short-circuit if you peek too early.

If you miss more than three, re-read the relevant lesson before starting the capstone. Quick re-read links: [Lesson 1](01_select_basics.md) · [Lesson 2](02_aggregation.md) · [Lesson 3](03_joins.md) · [Lesson 4](04_ctes.md) · [Lesson 5](05_nulls_and_quirks.md).

---

??? question "1. The clauses of a SELECT run in what **logical** order? (Pick one.)"
    **Answer:** `FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT`

    Why it matters: `WHERE` runs before `SELECT`, so you can't reference a `SELECT` alias inside `WHERE`. You *can* reference it in `ORDER BY` because that runs later.

??? question "2. What's the difference between `WHERE` and `HAVING`?"
    **Answer:** `WHERE` filters individual rows **before** grouping. `HAVING` filters groups **after** aggregation.

    Use `WHERE` for per-row predicates (`order_status = 'delivered'`), `HAVING` for predicates on aggregates (`COUNT(*) > 100`).

??? question "3. Write a query that returns the top 5 customer states by number of orders, descending."
    **Answer:**
    ```sql
    SELECT   c.customer_state, COUNT(*) AS n_orders
    FROM     orders o
    JOIN     customers c ON o.customer_id = c.customer_id
    GROUP BY c.customer_state
    ORDER BY n_orders DESC
    LIMIT 5;
    ```

    You need the join because state lives on `customers`, not `orders`. Common shortcut to forget.

??? question "4. Spot the bug: `SELECT seller_id, AVG(price) FROM items;`"
    **Answer:** Missing `GROUP BY seller_id`. The query asks for a per-seller average but doesn't tell SQL how to group. SQLite will return one arbitrary `seller_id` paired with the overall average — silently wrong. Postgres errors out.

    Fix:
    ```sql
    SELECT   seller_id, AVG(price) AS avg_price
    FROM     items
    GROUP BY seller_id;
    ```

??? question "5. When do you use `INNER JOIN` vs `LEFT JOIN`?"
    **Answer:**

    - `INNER JOIN` (or just `JOIN`) — keep only rows where **both sides match**.
    - `LEFT JOIN` — keep **every row on the left**, even if there's no match on the right (the unmatched columns become NULL).

    Use `LEFT JOIN` when you want to preserve all rows from the driving table — or when you're looking for unmatched rows (the "anti-join" pattern).

??? question "6. Write the query: how many orders have **no** review at all?"
    **Answer:**
    ```sql
    SELECT COUNT(*) AS orders_without_reviews
    FROM   orders o
    LEFT JOIN reviews r ON o.order_id = r.order_id
    WHERE  r.review_id IS NULL;
    ```

    `LEFT JOIN` keeps every order; orders without a review have `NULL` in the `r.*` columns. `WHERE r.review_id IS NULL` then keeps only those.

??? question "7. What's `COUNT(*)` vs `COUNT(review_comment_message)`?"
    **Answer:**

    - `COUNT(*)` — counts **every row** (including those with NULLs).
    - `COUNT(column)` — counts rows where `column IS NOT NULL`.

    On `reviews`, `COUNT(*)` is ~100k; `COUNT(review_comment_message)` is ~40k, because most reviews have no text comment.

??? question "8. Why does `WHERE order_delivered_customer_date IS NULL` return zero rows for the Olist data — even though many orders are undelivered?"
    **Answer:** The SQLite database is loaded from CSV. The CSV loader puts **empty strings (`''`)** where there's no value, not `NULL`. So:

    - `IS NULL` finds nothing.
    - `= ''` finds the undelivered orders.

    The defensive form `col IS NULL OR col = ''` works in both worlds.

??? question "9. Write a CTE that tags each order as `'late'` or `'on_time'`, then counts how many are in each bucket. Exclude undelivered orders."
    **Answer:**
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
    SELECT   status, COUNT(*) AS n
    FROM     delivery_status
    GROUP BY status;
    ```

    Note `!= ''` to skip undelivered orders. Without it, all undelivered orders end up tagged `'on_time'` (their empty-string `order_delivered_customer_date` is "less than" the estimated date).

??? question "10. What does `julianday('2018-04-15') - julianday('2018-04-01')` give you?"
    **Answer:** `14` (the number of days between the two dates).

    `julianday()` converts a date string into a floating-point number of days since a fixed reference point. Subtraction gives day differences. Use `CAST(... AS INTEGER)` to round to whole days.

??? question "11. Spot the bug: `SELECT 100 * SUM(CASE WHEN review_score <= 2 THEN 1 ELSE 0 END) / COUNT(*) FROM reviews;`"
    **Answer:** Integer division. `100 * count_of_bad / count_total` does the multiply first (still an integer), then divides integer-by-integer, truncating to 0 for any percentage under 100.

    Fix: write `100.0` instead of `100`. The `.0` makes the multiplication produce a float, after which the division is also a float.

    ```sql
    SELECT 100.0 * SUM(CASE WHEN review_score <= 2 THEN 1 ELSE 0 END) / COUNT(*) AS pct_bad
    FROM   reviews;
    ```

??? question "12. Write a query: average review score per `customer_state`, only for states with at least 1000 reviews, sorted worst first."
    **Answer:**
    ```sql
    SELECT   c.customer_state,
             COUNT(*) AS n_reviews,
             AVG(r.review_score) AS avg_score
    FROM     reviews r
    JOIN     orders    o ON r.order_id    = o.order_id
    JOIN     customers c ON o.customer_id = c.customer_id
    GROUP BY c.customer_state
    HAVING   COUNT(*) >= 1000
    ORDER BY avg_score ASC;
    ```

    Three tables joined; `HAVING` (not `WHERE`) for the row-count filter, because it's a predicate on the aggregate; `ORDER BY avg_score ASC` puts the worst-rated states at the top.

---

**Got 9+ right?** You're ready. **[Start the Day 2 capstone →](../../capstone/day2_sql/README.md)**

**Got fewer?** Re-read the relevant lesson(s) above. The capstone is a multi-CTE query — getting the basics solid here is cheaper than getting stuck there.
