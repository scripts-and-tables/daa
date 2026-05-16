# Day 2 — Exercises

All exercises use the SQLite database you built from `data/olist/load_into_sqlite.sql`. If you haven't built it yet, see [`data/README.md`](../../../data/README.md) Step 2.

**Open the database** in DB Browser for SQLite (File → Open Database → `data/olist/olist.db`), or from the terminal:

```bash
sqlite3 data/olist/olist.db
```

In the CLI, turn on nicer formatting:

```
sqlite> .mode column
sqlite> .headers on
sqlite> SELECT * FROM orders LIMIT 3;
```

The tables already exist with these names — you can query them directly:

| Table | What it holds |
|---|---|
| `orders` | One row per order |
| `items` | One row per line item |
| `reviews` | One row per review |
| `customers` | Customer info |
| `sellers` | Seller info |
| `products` | Product info (Portuguese category names) |
| `payments` | Payment info |
| `category_translation` | Portuguese → English category names |

You can save your work in a `.sql` file and run `sqlite3 data/olist/olist.db < myfile.sql`, or just paste queries into DB Browser's "Execute SQL" tab.

---

## Exercise 1 — SELECT and WHERE

1. Count the total number of orders.
2. Count how many orders have status `delivered`.
3. Show the 10 most expensive line items (from `items`).
4. Show all orders placed in March 2018, sorted by purchase timestamp ascending.

---

## Exercise 2 — Aggregation

1. How many orders does each `customer_state` have? Sort descending. Top 10 only.
2. What's the average price of a line item? The max? The min?
3. For each `order_status`, count how many orders are in that status.
4. What's the total revenue (sum of `price` from `items`) per state? (Hint: you'll need to join `items` to `orders` to `customers`.)

---

## Exercise 3 — Joins

1. Show the order_id, purchase date, and customer state for the 5 most recent orders.
2. List every seller in São Paulo state (`seller_state = 'SP'`) along with the number of items they've sold.
3. Find all orders where the review score is 1 (worst). Return order_id, review comment, and the customer state. Limit to 20.
4. Some orders have no review. Use a `LEFT JOIN` to count: how many orders have no review at all? (Hint: `WHERE review_id IS NULL` after the join.)

---

## Exercise 4 — CTEs

Write a single query that answers: "What's the average review score for orders that were delivered late vs on-time?"

Use a CTE to first tag each order as late/on-time, then aggregate.

A delivery is late when `order_delivered_customer_date > order_estimated_delivery_date`. Exclude orders that don't have a delivery date.

Expected shape:

```
delivery_status | avg_review
late            | ?
on_time         | ?
```

---

## Exercise 5 — Putting it together

Find the **top 10 sellers by revenue** along with their **average review score**.

- Revenue per seller = `SUM(items.price)` for that seller
- Review score per seller = average of `review_score` across all reviews on orders containing items from that seller

A seller can appear on many orders. An order can contain items from multiple sellers — for simplicity, **count an order's review against each of its sellers**.

Expected columns: `seller_id`, `revenue`, `n_orders`, `avg_review_score`.

This one's hard. If you're stuck, write it as 2 or 3 CTEs.

---

When you finish, compare with [`../solutions/README.md`](../solutions/README.md).
