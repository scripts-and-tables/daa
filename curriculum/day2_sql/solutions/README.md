# Day 2 — Solutions

Only peek after attempting.

Assumes the views from `exercises/README.md` are already created.

---

## Exercise 1 — SELECT and WHERE

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

---

## Exercise 2 — Aggregation

```sql
-- 1
SELECT   c.customer_state, COUNT(*) AS n_orders
FROM     orders o
JOIN     'data/olist/olist_customers_dataset.csv' c ON o.customer_id = c.customer_id
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

-- 4 (needs customers — create a view if you haven't)
CREATE VIEW IF NOT EXISTS customers AS
  SELECT * FROM 'data/olist/olist_customers_dataset.csv';

SELECT   c.customer_state, SUM(i.price) AS revenue
FROM     items i
JOIN     orders o    ON i.order_id    = o.order_id
JOIN     customers c ON o.customer_id = c.customer_id
GROUP BY c.customer_state
ORDER BY revenue DESC;
```

---

## Exercise 3 — Joins

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
```

---

## Exercise 4 — CTEs

```sql
WITH delivery_status AS (
    SELECT order_id,
           CASE WHEN order_delivered_customer_date > order_estimated_delivery_date
                THEN 'late'
                ELSE 'on_time'
           END AS status
    FROM   orders
    WHERE  order_delivered_customer_date IS NOT NULL
      AND  order_estimated_delivery_date IS NOT NULL
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

The gap is large — late deliveries clearly cost satisfaction. **This is exactly the kind of finding the capstone is building toward.**

---

## Exercise 5 — Top sellers

```sql
WITH seller_revenue AS (
    SELECT   seller_id,
             SUM(price)       AS revenue,
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
LIMIT 10;
```

**Sanity check:** the #1 seller's revenue should be in the hundreds of thousands of reais. If it's millions or just a few thousand, you've probably duplicated rows by joining wrong.
