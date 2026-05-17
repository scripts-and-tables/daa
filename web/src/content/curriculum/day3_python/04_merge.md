# Lesson 4 — Merge & combine

**Time:** ~25 min.
**You'll be able to:**

- Use `pd.merge()` (or `df1.merge(df2)`) for SQL-style joins in pandas
- Pick the right `how=`: `'inner'`, `'left'`, `'right'`, `'outer'`
- Specify keys with `on=` or `left_on=`/`right_on=`
- Defend yourself against silent row duplication with the **row-count sanity check** — the most important habit of the day
- Stack DataFrames with `pd.concat()`

Every cross-table question you wrote in SQL yesterday becomes a `merge` in pandas. The semantics are identical; the syntax is a touch wordier.

!!! tip "Day 2 ↔ Day 3 equivalents"
    Every `JOIN … ON …` you wrote yesterday becomes a `pd.merge(left, right, on=…, how=…)` today. The row-count assertion (below) is the pandas-only addition — SQL crashes when you make this mistake; pandas silently inflates your numbers.

## `df.merge` — pandas' SQL JOIN

```python
joined = orders.merge(reviews, on='order_id', how='left')
```

| pandas | SQL |
|---|---|
| `df1.merge(df2, on='id', how='inner')` | `JOIN df2 ON df1.id = df2.id` |
| `df1.merge(df2, on='id', how='left')` | `LEFT JOIN df2 ON df1.id = df2.id` |
| `df1.merge(df2, on='id', how='outer')` | `FULL JOIN df2 ON df1.id = df2.id` |
| `df1.merge(df2, on='id', how='right')` | `RIGHT JOIN df2 ON df1.id = df2.id` *(rare — rewrite as left)* |

You can write it as `pd.merge(df1, df2, …)` instead of `df1.merge(df2, …)` — same result; the method form chains better.

### Different column names with `left_on` / `right_on`

```python
orders.merge(reviews, left_on='order_id', right_on='order_ref', how='left')
```

After the merge both columns are present in the output (`order_id` *and* `order_ref`). Drop the duplicate if you want:

```python
joined = joined.drop(columns='order_ref')
```

### Joining on the index

If the key is the index of one or both DataFrames:

```python
df1.merge(df2, left_index=True, right_on='id')
```

Less common; you'll usually do `.reset_index()` first to make it a regular column.

## The row-count sanity check (do this every time)

The single most important pandas habit:

```python
n_before = len(orders)
joined = orders.merge(reviews, on='order_id', how='left')
assert len(joined) == n_before, f"merge changed row count: {n_before} -> {len(joined)}"
```

A LEFT JOIN should keep exactly `len(left)` rows. If the result is larger, **the right side has duplicates on the join key** — every duplicate becomes a separate row in the output. Aggregate the right side first, or `drop_duplicates(subset='order_id')`, before merging.

This single assertion saves more debugging time than every other pandas tip combined. Make it your default.

### What "duplicates on the right" feels like

You merge `orders` (99,441 rows) with `reviews` (99,224 rows after dedupe — but ~100,000 raw) and get 100,012 rows. The 571 extra rows are orders that match *two* review rows each. Now every per-seller revenue calculation downstream is inflated by ~0.5%. Silent. Insidious. Catch it at the merge.

### Olist-specific gotcha

The Olist `reviews` table has a small number of duplicate reviews on the same `order_id`. For most analyses, dedupe by keeping the most recent:

```python
reviews_clean = (
    reviews.sort_values('review_creation_date')
           .drop_duplicates(subset='order_id', keep='last')
)
```

Or, if all you need is the score, aggregate first:

```python
review_per_order = reviews.groupby('order_id').agg(score=('review_score', 'mean'))
joined = orders.merge(review_per_order, on='order_id', how='left')
```

Either way: explicit about the dedupe. Don't let `merge` do it implicitly by silently picking one row.

## `indicator=True` — see which rows matched

```python
joined = orders.merge(reviews, on='order_id', how='left', indicator=True)
joined['_merge'].value_counts()
# left_only    768
# both        98673
```

Adds a `_merge` column with `'left_only'`, `'right_only'`, or `'both'`. Useful for spot-checking how much of your left side actually had matches. Drop the column when you're done.

## Chaining multiple merges

```python
result = (
    orders
    .merge(customers, on='customer_id', how='left')
    .merge(items,     on='order_id',    how='left')
    .merge(sellers,   on='seller_id',   how='left')
)
```

Just chain `.merge()` calls. Reads top-to-bottom; each line adds one set of columns.

**Sanity-check every merge** when chaining — duplicates compound, so a 2× duplication at step 1 and 3× at step 2 silently yields 6× rows by step 3.

## `pd.concat` — stacking DataFrames

When you want to stack rows from multiple DataFrames with the same columns:

```python
all_orders = pd.concat([orders_2017, orders_2018], ignore_index=True)
```

`ignore_index=True` rebuilds the row index from 0. Without it, you get duplicate index values (e.g., two rows with index 0), which causes weird bugs later.

Use `pd.concat` for "union" (stacking similar rows), `merge` for "join" (matching by key). They aren't interchangeable; mistakes are obvious in retrospect, expensive in practice.

??? note "Try it yourself — merge with sanity checks"
    1. Left-merge `orders` with `reviews` on `order_id`. **Assert** that `len(merged) == len(orders)`. If it fails, dedupe reviews first by `order_id` and retry.
    2. Add the customer's `customer_state` to your merged DataFrame.
    3. Now add the *items* to that result. Why might `len()` change here? Predict, then check.

    ??? success "Reveal solution"
        ```python
        # 1
        n_before = len(orders)
        merged = orders.merge(reviews, on='order_id', how='left')
        if len(merged) != n_before:
            reviews_clean = reviews.drop_duplicates(subset='order_id', keep='last')
            merged = orders.merge(reviews_clean, on='order_id', how='left')
        assert len(merged) == n_before

        # 2
        merged = merged.merge(customers[['customer_id', 'customer_state']],
                              on='customer_id', how='left')
        assert len(merged) == n_before

        # 3
        merged_items = merged.merge(items, on='order_id', how='left')
        # len(merged_items) will be LARGER than len(orders) — that's correct.
        # Each order has 1 or more items; every item becomes a row in the result.
        # If you wanted "one row per order with item info", you'd aggregate items
        # to per-order (sum of price, count of items) BEFORE merging.
        ```

        The Lesson 3 reminder: pre-aggregating to "one row per `order_id`" before joining is how you keep the row count fixed at `len(orders)`. The capstone uses this trick.

## Common pitfalls

1. **Skipping the row-count assertion.** Duplicates on the right side silently inflate counts and sums.
2. **`merge` when you meant `concat`** (or vice versa). Merge matches by key; concat stacks rows. Different operations entirely.
3. **`outer` join when you meant `left`.** Outer keeps unmatched rows from both sides; you almost always wanted left.
4. **Joining on columns that have leading/trailing whitespace.** `'abc'` ≠ `'abc '`. Strip first: `df['key'] = df['key'].str.strip()`.
5. **Forgetting to drop the duplicate join column after `left_on`/`right_on`.** The output has both `order_id` and `order_ref`. Drop one.

## How this shows up in the capstone

The capstone's "worst categories" analysis joins five tables: `items → orders → reviews → products → category_translation`. Every join is a `merge`. Every merge gets a row-count assertion. Without that habit you'd silently triple-count revenue and produce a chart that looks plausible and is wrong.

## What's next

Continue to **[Lesson 5 — Cleaning, dates, and plots](05_cleaning_dates_plots.md)**.
