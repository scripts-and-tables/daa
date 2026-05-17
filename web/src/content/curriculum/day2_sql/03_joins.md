# Lesson 3 — Joins

**Time:** ~40 min. The longest lesson of the day, and the one that unlocks the whole dataset.
**You'll be able to:**

- Read and write `INNER JOIN` and `LEFT JOIN` — the only two joins you'll need 95% of the time
- Chain 3+ tables in a single query
- Alias every table and reach for `o`, `c`, `i`, `r` without thinking
- Use `LEFT JOIN … IS NULL` to find rows that have no match (the SQL "anti-join")
- Recognise the cross-join trap (forgetting `ON`) and how to avoid it
- Know when a self-join is the right tool

## The mental model: "for each row in A, find matches in B"

```sql
SELECT o.order_id, c.customer_state
FROM   orders    o
JOIN   customers c ON o.customer_id = c.customer_id;
```

Reads as: "for each row in `orders`, find the matching `customers` row using `customer_id`, and combine them."

Joins are the SQL equivalent of `XLOOKUP` from Day 1 — but instead of one return column, you get the whole matched row to play with.

| Excel | SQL |
|---|---|
| `XLOOKUP(key, A[key], A[name])` | `JOIN A ON main.key = A.key`, then `SELECT A.name` |

## `INNER JOIN` — only matched rows

```sql
SELECT o.order_id, c.customer_state
FROM   orders    o
INNER JOIN customers c ON o.customer_id = c.customer_id;
```

Returns rows **only when both sides have a match**. If an order has no matching customer (shouldn't happen, but could), it's dropped from the result.

You can write `JOIN` instead of `INNER JOIN` — they're the same. Most people drop the `INNER` and the type becomes "join is inner by default; other joins are spelled out."

## `LEFT JOIN` — every row from the left, even unmatched

```sql
SELECT o.order_id, r.review_score
FROM   orders o
LEFT JOIN reviews r ON o.order_id = r.order_id;
```

Returns **every row from `orders`**. If a matching `reviews` row exists, you get its columns; if not, you get NULLs in the `r.*` columns.

Use `LEFT JOIN` when:

- You want to keep all rows from the left table, even those without matches
- You want to find unmatched rows (see "anti-join" below)
- You're aggregating and missing rows would bias the result

### `RIGHT JOIN` and `FULL JOIN`

`RIGHT JOIN A` is exactly `LEFT JOIN A` with the tables swapped. Rewriting it as `LEFT` reads better. Almost no one writes `RIGHT JOIN` in production code.

`FULL JOIN` keeps unmatched rows from both sides. Useful occasionally. SQLite supports it as of 3.39 (2022).

**The two joins you'll write for the rest of your career: `JOIN` and `LEFT JOIN`.**

## Chaining joins

```sql
SELECT   o.order_id, c.customer_state, i.price, s.seller_state
FROM     orders    o
JOIN     customers c ON o.customer_id = c.customer_id
JOIN     items     i ON o.order_id    = i.order_id
JOIN     sellers   s ON i.seller_id   = s.seller_id
WHERE    o.order_status = 'delivered'
ORDER BY o.order_purchase_timestamp DESC
LIMIT 20;
```

Four tables, three joins, every join with explicit aliases. Read it like a graph traversal: start at `orders`, hop to `customers`, hop to `items`, hop to `sellers`. Each `JOIN … ON …` is one hop.

### Aliases are mandatory once you have 3+ tables

Compare:

```sql
SELECT olist_orders.order_id, olist_customers.customer_state
FROM   olist_orders
JOIN   olist_customers ON olist_orders.customer_id = olist_customers.customer_id;
```

vs.

```sql
SELECT o.order_id, c.customer_state
FROM   olist_orders    o
JOIN   olist_customers c ON o.customer_id = c.customer_id;
```

The second version is the same query, 40% shorter, far easier to read. **Alias every table.** Single-letter aliases for short queries (`o`, `c`, `i`); two-or-three-letter for longer ones (`ord`, `cust`, `itm`).

## The anti-join: "find rows with no match"

```sql
SELECT COUNT(*) AS orders_without_reviews
FROM   orders o
LEFT JOIN reviews r ON o.order_id = r.order_id
WHERE  r.review_id IS NULL;
```

Trick: `LEFT JOIN` keeps every order, with NULLs in `r.*` for orders that have no review. `WHERE r.review_id IS NULL` then keeps only those.

This is **the canonical SQL pattern for "find missing things"** — orders without reviews, customers without orders, products never sold.

## `ON` vs `WHERE` for join conditions

A common confusion:

```sql
-- Filter applies AFTER the join: customers without 'delivered' orders show up with NULLs
SELECT c.customer_state, o.order_id
FROM   customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE  o.order_status = 'delivered';

-- Filter applies DURING the join: customers without 'delivered' orders are kept (with NULLs)
SELECT c.customer_state, o.order_id
FROM   customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
                  AND o.order_status = 'delivered';
```

For `INNER JOIN`, the two forms give the same result (filtering on the join row vs. filtering after — same net effect). For `LEFT JOIN`, **they differ**: `WHERE` turns the LEFT JOIN into an effective INNER JOIN by discarding the NULL rows.

**Rule of thumb:** put join keys in `ON`; put filters on the *driving* table in `WHERE`. Put filters on the *joined* table in `ON` if you want the left rows kept even when the joined side fails the filter.

## The cross-join trap

Forget the `ON` clause and you get a Cartesian product — every row in A paired with every row in B:

```sql
-- DON'T — returns ~100k × ~100k = 10 billion rows
SELECT o.order_id, c.customer_state
FROM   orders o, customers c;
```

The implicit-comma syntax is a relic. **Always write `JOIN … ON …` explicitly.** If you genuinely want a cross-join (rare — usually for generating combinations), say `CROSS JOIN` and mean it.

## Self-join (briefly)

A self-join is joining a table to itself, usually with different aliases:

```sql
SELECT  emp.name, mgr.name AS manager
FROM    employees emp
LEFT JOIN employees mgr ON emp.manager_id = mgr.employee_id;
```

You won't need it for the Olist data today, but it shows up for hierarchies (employee→manager) and pair comparisons. Mention only — file it under "things SQL can do."

??? note "Try it yourself — join the Olist tables"
    1. Show `order_id`, purchase date, and customer state for the **5 most recent orders**.
    2. List every seller in São Paulo state (`seller_state = 'SP'`) along with the **number of line items they've sold**, sorted descending.
    3. Find all orders where `review_score = 1`. Return `order_id`, the review comment, and the customer state. Limit to 20.
    4. How many orders have **no review at all**? Use a `LEFT JOIN` and `IS NULL`.
    5. (From Lesson 2's preview.) Total revenue (`SUM(items.price)`) per `customer_state`.

    ??? success "Reveal solution"
        ```sql
        -- 1
        SELECT o.order_id, o.order_purchase_timestamp, c.customer_state
        FROM   orders o
        JOIN   customers c ON o.customer_id = c.customer_id
        ORDER BY o.order_purchase_timestamp DESC
        LIMIT 5;

        -- 2
        SELECT   s.seller_id, COUNT(*) AS n_items
        FROM     sellers s
        JOIN     items i ON s.seller_id = i.seller_id
        WHERE    s.seller_state = 'SP'
        GROUP BY s.seller_id
        ORDER BY n_items DESC;

        -- 3
        SELECT o.order_id, r.review_comment_message, c.customer_state
        FROM   reviews r
        JOIN   orders o    ON r.order_id    = o.order_id
        JOIN   customers c ON o.customer_id = c.customer_id
        WHERE  r.review_score = 1
        LIMIT 20;

        -- 4
        SELECT COUNT(*) AS orders_without_reviews
        FROM   orders o
        LEFT JOIN reviews r ON o.order_id = r.order_id
        WHERE  r.review_id IS NULL;

        -- 5
        SELECT   c.customer_state, SUM(i.price) AS revenue
        FROM     items i
        JOIN     orders    o ON i.order_id    = o.order_id
        JOIN     customers c ON o.customer_id = c.customer_id
        GROUP BY c.customer_state
        ORDER BY revenue DESC;
        ```

        For #5, you need three tables: revenue lives on `items`, the link to customer is via `orders`, and state is on `customers`. This is the most common shape in the Olist data — `items → orders → customers` (or `items → orders → reviews`).

## Common pitfalls

1. **Joining without `ON`.** Cross-join explosion — billions of rows. Always include `ON`.
2. **Wrong join direction.** `LEFT JOIN` keeps the left side. Putting the table you care about preserving on the right is a classic mistake.
3. **Putting a `LEFT JOIN`'s filter in `WHERE`.** Silently converts it to an `INNER JOIN`. Put filters on the joined side in `ON`.
4. **Joining the wrong key.** `items.order_id = customers.customer_id` is syntactically valid and gives garbage. Read the schema diagram before you join.
5. **Aliasing inconsistently.** `o` in one query, `ord` in another — pick a convention per project and stick with it.

## How this shows up in the capstone

The capstone is a three-way join: `items → orders → reviews` for the seller analysis, and the same plus `products → category_translation` for the category analysis. If joins feel automatic by the end of this lesson, the capstone is straightforward.

## What's next

Continue to **[Lesson 4 — CTEs & multi-step queries](04_ctes.md)** — for queries that don't fit on one screen.
