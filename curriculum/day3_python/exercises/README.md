# Day 3 — Exercises

Open a fresh notebook. Start every notebook with:

```python
import pandas as pd
import seaborn as sns
pd.options.display.max_columns = 50  # so .head() doesn't hide columns
```

Then load the data:

```python
orders   = pd.read_csv('data/olist/olist_orders_dataset.csv',
                       parse_dates=['order_purchase_timestamp',
                                    'order_delivered_customer_date',
                                    'order_estimated_delivery_date'])
items    = pd.read_csv('data/olist/olist_order_items_dataset.csv')
reviews  = pd.read_csv('data/olist/olist_order_reviews_dataset.csv')
sellers  = pd.read_csv('data/olist/olist_sellers_dataset.csv')
products = pd.read_csv('data/olist/olist_products_dataset.csv')
customers = pd.read_csv('data/olist/olist_customers_dataset.csv')
categories = pd.read_csv('data/olist/product_category_name_translation.csv')
```

---

## Exercise 1 — Basics

1. How many orders are in the data? (Hint: `len(orders)` or `.shape`.)
2. What columns does `orders` have, and what's their type? (Hint: `.info()`.)
3. How many orders are in each status? (Hint: `.value_counts()` on `order_status`.)
4. What's the date range of `order_purchase_timestamp` — earliest and latest?

---

## Exercise 2 — Filtering

1. Show the 5 most expensive line items in `items` (by `price`).
2. How many orders were placed in 2017? (Filter `order_purchase_timestamp` by year, then `len`.)
3. How many orders had at least one item with `price > 1000`? (Hint: this needs `items`, not `orders`.)
4. Compute `delivery_days = order_delivered_customer_date - order_purchase_timestamp` on the orders DataFrame. Show the distribution with `delivery_days.dt.days.describe()`.

---

## Exercise 3 — Groupby

1. Average review score by `review_score` group? (That's silly — but `value_counts()` on `review_score` is what you want. Show the distribution.)
2. Number of orders per `customer_state`. Top 10 only.
3. Total revenue per seller. Top 10 by revenue. (Reminder: revenue is `SUM(items.price)`.)
4. For each `order_status`, what's the average review score? You'll need to merge `orders` and `reviews` first.

---

## Exercise 4 — Merging + plotting

1. Merge `orders` with `reviews` (left join on `order_id`). Confirm `len()` of the result equals `len(orders)` — if not, your reviews table has duplicates and you need to dedupe first.
2. Add a `delivery_days` column to the merged DataFrame. Group by `review_score`, compute average `delivery_days`. **Plot it as a bar chart.**
3. Now do the reverse: bucket `delivery_days` into 4 buckets (`pd.cut(..., bins=[-1, 7, 14, 30, 1000])`), group by bucket, compute average review score. Plot.

You should see a clear inverse relationship: as delivery time grows, review score drops.

---

When you finish, compare with [`../solutions/`](../solutions/). The reference notebook also has the merge sanity check pattern that's worth absorbing.
