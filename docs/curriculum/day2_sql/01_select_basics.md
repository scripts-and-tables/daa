# Lesson 1 — SELECT, FROM, WHERE

**Time:** ~30 min.
**You'll be able to:**

- Read and write the basic shape of a SQL query (`SELECT … FROM … WHERE … ORDER BY … LIMIT`)
- Filter rows with comparison operators, `AND`/`OR`, `IN`, `BETWEEN`, `LIKE`
- Sort results, limit how many rows come back, and alias columns for readability
- Recognise the **logical execution order** of a SELECT — and know why it matters
- Write comments that future-you (or your colleague) can follow

This lesson is the alphabet. Lessons 2–5 are sentences and paragraphs.

## The anatomy of a SELECT

```sql
SELECT   o.order_id, o.order_status
FROM     orders o
WHERE    o.order_status = 'delivered'
ORDER BY o.order_purchase_timestamp DESC
LIMIT    10;
```

Six clauses, six jobs:

| Clause | Job |
|---|---|
| `SELECT` | Which columns to return |
| `FROM` | Which table(s) to read from |
| `WHERE` | Which rows to keep |
| `GROUP BY` | (Lesson 2) Roll rows up into groups |
| `HAVING` | (Lesson 2) Filter on group-level aggregates |
| `ORDER BY` | How to sort the output |
| `LIMIT` | How many rows to return |

The semicolon at the end is optional in most clients but matters when you submit multiple queries at once. Get in the habit of writing it.

## Picking columns

```sql
SELECT order_id, order_status, order_purchase_timestamp FROM orders;
SELECT * FROM orders LIMIT 5;
SELECT COUNT(*) FROM orders;
```

`*` means "every column." Use it while exploring. **Don't use `*` in queries you'll keep** — it returns more data than you need, and breaks the moment someone adds a column.

### Aliases with `AS`

```sql
SELECT   order_id     AS id,
         order_status AS status,
         COUNT(*)     AS n
FROM     orders;
```

Column aliases let you rename for readability. Aliases on **aggregates** like `COUNT(*) AS n` are nearly mandatory — without the alias, the column header is literally `COUNT(*)`, which is ugly.

`AS` is optional in most SQL dialects (`COUNT(*) n` works), but write it out. Future-you can't read your terseness.

## Filtering with `WHERE`

```sql
SELECT * FROM orders WHERE order_status = 'delivered';
SELECT * FROM orders WHERE order_status != 'delivered';
SELECT * FROM items  WHERE price > 1000;
SELECT * FROM items  WHERE price BETWEEN 100 AND 500;
SELECT * FROM orders WHERE order_status IN ('delivered', 'shipped');
SELECT * FROM orders WHERE order_status NOT IN ('canceled', 'unavailable');
SELECT * FROM products WHERE product_category_name LIKE 'beleza%';
```

- `=`, `!=` (or `<>`), `<`, `>`, `<=`, `>=` — standard comparisons. **String comparisons use single quotes**: `'delivered'`, not `"delivered"`.
- `BETWEEN a AND b` — inclusive of both ends. Often clearer than `>= a AND <= b`.
- `IN (...)` — match any value in a list. Way nicer than chained `OR`s.
- `LIKE` — pattern match. `%` is "any number of characters," `_` is "exactly one character." `'beleza%'` matches anything starting with `beleza`.

### `AND`, `OR`, parentheses

```sql
SELECT *
FROM   orders
WHERE  order_status = 'delivered'
  AND  order_purchase_timestamp >= '2018-01-01'
  AND  order_purchase_timestamp <  '2018-04-01';
```

Mix `AND` and `OR` with explicit parentheses. `AND` binds tighter than `OR`, so `A OR B AND C` means `A OR (B AND C)` — almost never what you meant.

```sql
WHERE (order_status = 'delivered' OR order_status = 'shipped')
  AND order_purchase_timestamp >= '2018-01-01';
```

## Sorting with `ORDER BY`

```sql
ORDER BY order_purchase_timestamp DESC;
ORDER BY order_status, order_purchase_timestamp DESC;
```

Default is `ASC`. List multiple columns to break ties: first by status, then by date within each status.

You can sort by a `SELECT` alias too:

```sql
SELECT order_status, COUNT(*) AS n
FROM   orders
GROUP BY order_status
ORDER BY n DESC;        -- sort by the alias
```

## Limiting with `LIMIT`

```sql
SELECT * FROM orders LIMIT 10;
SELECT * FROM items ORDER BY price DESC LIMIT 10;
```

`LIMIT` cuts off the result set after N rows. Combine with `ORDER BY` to get "top 10 by X." Without `ORDER BY`, the order is undefined — you get *some* 10 rows, not the first 10 in any meaningful sense.

## Logical execution order — the thing that confuses everyone

You **write** clauses in this order:

```
SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT
```

But the database **runs** them in this order:

```
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
```

Burn this in. It's the answer to two of the top three SQL questions on Stack Overflow:

- **"Why can't I use a SELECT alias in WHERE?"** Because WHERE runs before SELECT — the alias doesn't exist yet.
- **"Why can I use a SELECT alias in ORDER BY?"** Because ORDER BY runs after SELECT — by then the alias exists.

```sql
-- Doesn't work — `n` doesn't exist when WHERE runs
SELECT customer_state, COUNT(*) AS n
FROM   customers
WHERE  n > 100              -- ERROR
GROUP BY customer_state;

-- Works — filter on the aggregate with HAVING instead
SELECT   customer_state, COUNT(*) AS n
FROM     customers
GROUP BY customer_state
HAVING   COUNT(*) > 100
ORDER BY n DESC;            -- alias works in ORDER BY
```

## Comments

```sql
-- this is a one-line comment

/*
   this is a block comment.
   useful for paragraph-length explanations.
*/

SELECT order_id    -- inline comment after a column
FROM   orders;
```

Comment **intent**, not mechanics. `-- count delivered orders` is useless. `-- filtering out 2018 because of the strike` is useful.

??? note "Try it yourself — basic queries on the Olist data"
    Open `data/olist/olist.db` in DB Browser for SQLite (or `sqlite3` in a terminal). The tables are: `orders`, `items`, `reviews`, `customers`, `sellers`, `products`, `payments`, `category_translation`.

    Write a query for each:

    1. Count the total number of orders.
    2. Count how many orders have status `delivered`.
    3. Show the 10 most expensive line items from `items`.
    4. Show all orders placed in March 2018, sorted by purchase timestamp ascending.

    ??? success "Reveal solution"
        ```sql
        -- 1
        SELECT COUNT(*) FROM orders;
        -- ~99441

        -- 2
        SELECT COUNT(*) FROM orders WHERE order_status = 'delivered';
        -- ~96478

        -- 3
        SELECT * FROM items ORDER BY price DESC LIMIT 10;

        -- 4
        SELECT *
        FROM   orders
        WHERE  order_purchase_timestamp >= '2018-03-01'
          AND  order_purchase_timestamp <  '2018-04-01'
        ORDER BY order_purchase_timestamp;
        ```

        For #4, the `>=` / `<` pair (instead of `BETWEEN '2018-03-01' AND '2018-03-31'`) avoids missing rows on the very last day. SQLite stores these as ISO date strings, which compare correctly with `<` and `>`.

## Common pitfalls

1. **Double quotes around strings.** `WHERE name = "Acme"` works in some databases, errors in others, and means "the identifier `Acme`" in standard SQL. Always use single quotes for strings.
2. **Forgetting to add `ORDER BY` before `LIMIT`.** "Top 10" without sort gives "some 10."
3. **Mixing `AND` and `OR` without parentheses.** Operator precedence rarely matches what you intended. Be explicit.
4. **Querying with `SELECT *` and complaining about slow results.** Pick only the columns you need.
5. **`column = NULL`.** Always false. Use `IS NULL`. (More in Lesson 5.)

## How this shows up in the capstone

Every query you'll write today starts with `SELECT … FROM … WHERE`. The capstone is several queries chained together — get fluent with the basic shape now and the joins/CTEs of later lessons feel like adding pieces, not learning a new language.

## What's next

Continue to **[Lesson 2 — Aggregation & GROUP BY](02_aggregation.md)**.
