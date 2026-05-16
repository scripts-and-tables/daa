# Day 3 — Solutions

Reference answers. Try the exercises first.

---

## Exercise 1 — Basics

```python
len(orders)                # ~99441
orders.info()              # shows column dtypes + null counts
orders['order_status'].value_counts()
orders['order_purchase_timestamp'].agg(['min', 'max'])
```

---

## Exercise 2 — Filtering

```python
# 1
items.sort_values('price', ascending=False).head(5)

# 2
orders_2017 = orders[orders['order_purchase_timestamp'].dt.year == 2017]
len(orders_2017)

# 3
expensive_orders = items[items['price'] > 1000]['order_id'].nunique()
expensive_orders

# 4
orders['delivery_days'] = (
    orders['order_delivered_customer_date'] - orders['order_purchase_timestamp']
).dt.days
orders['delivery_days'].describe()
```

Expected: mean delivery is ~12 days, median ~10. Max is wild (200+ days) — a few outliers.

---

## Exercise 3 — Groupby

```python
# 1
reviews['review_score'].value_counts().sort_index()
# ~57% 5-stars, ~12% 1-stars

# 2
order_state = (
    orders.merge(customers, on='customer_id')
          .groupby('customer_state').size()
          .sort_values(ascending=False).head(10)
)

# 3
revenue_per_seller = (
    items.groupby('seller_id').agg(revenue=('price', 'sum'))
         .sort_values('revenue', ascending=False).head(10)
)

# 4
status_review = (
    orders.merge(reviews, on='order_id')
          .groupby('order_status').agg(avg_review=('review_score', 'mean'))
          .sort_values('avg_review', ascending=False)
)
```

---

## Exercise 4 — Merging + plotting

```python
# 1 — merge with row-count sanity check
n_before = len(orders)
merged = orders.merge(reviews, on='order_id', how='left')
print(f"orders: {n_before}, merged: {len(merged)}, diff: {len(merged)-n_before}")
# A diff > 0 means reviews has duplicates on order_id — investigate before continuing.
# Olist has a small number of duplicate reviews; if you see ~99k -> ~100k, dedupe:
# reviews_dedup = reviews.drop_duplicates(subset='order_id')

# 2
merged['delivery_days'] = (
    merged['order_delivered_customer_date'] - merged['order_purchase_timestamp']
).dt.days
avg_delivery_by_score = (
    merged.groupby('review_score').agg(avg_days=('delivery_days', 'mean'))
)
avg_delivery_by_score.plot(kind='bar')

# 3
merged['delivery_bucket'] = pd.cut(
    merged['delivery_days'],
    bins=[-1, 7, 14, 30, 1000],
    labels=['0-7 days', '8-14 days', '15-30 days', '30+ days']
)
score_by_bucket = (
    merged.groupby('delivery_bucket', observed=True)
          .agg(avg_score=('review_score', 'mean'))
)
score_by_bucket.plot(kind='bar')
```

The Exercise 4.3 chart is the key insight of Day 3 — it visually proves what Day 2's SQL CTE exercise showed numerically. Average review score drops from ~4.3 (fast delivery) to ~2.5 (slow delivery). Save this chart — it goes into your final report.

---

## The merge sanity-check pattern

Always do this around merges:

```python
n_before = len(orders)
merged = orders.merge(reviews, on='order_id', how='left')
assert len(merged) == n_before, f"merge changed row count: {n_before} -> {len(merged)}"
```

If the assertion fires, dedupe the right side or pick a different join key. **Catching this here saves you 2 hours of debugging later.**
