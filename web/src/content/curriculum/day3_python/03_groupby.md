# Lesson 3 — Aggregation & groupby

**Time:** ~30 min.
**You'll be able to:**

- Use `.value_counts()` for instant categorical summaries
- Group by one or more columns and compute aggregates with `.agg()`
- Choose between **named aggregation** and the older dict syntax (named is preferred)
- Tell `.size()` from `.count()`
- Sort and trim grouped results
- Use `.reset_index()` to get a flat DataFrame back

You've already seen this thinking — twice.

!!! tip "Same idea you used twice already"
    Day 1's pivot tables and Day 2's `GROUP BY` are this same operation. Drag a category to **Rows** + a number to **Values** in Excel ↔ write `GROUP BY cat` + `SUM(num)` in SQL ↔ chain `.groupby('cat').agg(total=('num','sum'))` in pandas. The mental model is identical; only the syntax changes.

## `.value_counts()` — the one-liner you'll use forever

```python
orders['order_status'].value_counts()
# delivered    96478
# shipped       1107
# canceled       625
# ...
```

"For each unique value in this column, how many rows have it?" Sorted descending by count, by default. Two useful kwargs:

```python
orders['order_status'].value_counts(normalize=True)   # proportions, not counts
orders['order_status'].value_counts().head(5)         # top 5 only
```

Reach for `.value_counts()` whenever you'd say "what's the breakdown of…". Faster than a `groupby` for the simple case.

## `.groupby` — the same model as SQL

```python
orders.groupby('order_status').size()
```

Reads as: "for each value of `order_status`, count the rows." Exactly like SQL's `GROUP BY order_status` + `COUNT(*)`.

The result is a Series indexed by `order_status`. To get a DataFrame back, `.reset_index()`:

```python
orders.groupby('order_status').size().reset_index(name='n')
```

### `.size()` vs `.count()`

- `.size()` — counts **rows** in each group (always; ignores NaNs).
- `.count()` — counts **non-NaN values** per column per group.

`.size()` is what you usually want when you mean "how many rows?". Use `.count()` when you specifically need "how many non-missing values of column X?".

## `.agg()` — multiple aggregates at once

```python
orders.groupby('order_status').agg(
    n=('order_id', 'count'),
    earliest=('order_purchase_timestamp', 'min'),
    latest=('order_purchase_timestamp', 'max'),
)
```

This is **named aggregation** — `output_name=(input_column, aggregation_function)`. The output is a DataFrame with one row per group and one column per named aggregate.

Aggregation functions you'll use most:

| Aggregation | What it does |
|---|---|
| `'count'` | Non-null count |
| `'size'` | Row count (use as a column in named agg by including any column name) |
| `'sum'` | Total |
| `'mean'` | Arithmetic mean |
| `'median'` | 50th percentile |
| `'min'` / `'max'` | Extremes |
| `'std'` / `'var'` | Standard deviation / variance |
| `'nunique'` | Distinct count (like SQL's `COUNT(DISTINCT)`) |
| `'first'` / `'last'` | First/last row in the group |

You can also pass a custom function: `agg(p10=('price', lambda x: x.quantile(0.10)))`.

### The older dict syntax (you'll see it in tutorials)

```python
orders.groupby('order_status').agg({
    'order_id': 'count',
    'order_purchase_timestamp': ['min', 'max'],
})
```

Works but produces a multi-index in the columns, which is annoying. **Prefer named aggregation** (the `name=(col, fn)` form) — flat, readable output.

## Multi-column groupby

```python
items.groupby(['seller_id', 'product_id']).agg(
    total_revenue=('price', 'sum'),
    n_orders=('order_id', 'nunique'),
)
```

Pass a list of column names. One row per **unique combination** of group keys.

## Sort, then trim

`groupby` results aren't sorted by default. To get "top 10 sellers by revenue":

```python
(
    items
    .groupby('seller_id')
    .agg(revenue=('price', 'sum'))
    .sort_values('revenue', ascending=False)
    .head(10)
)
```

Notice the **method chain on parentheses-wrapped lines** — pandas idiom for legible multi-step operations. Each line is one verb: group, aggregate, sort, slice. Reads top to bottom.

## `.reset_index()` — flatten the result

By default, group keys become the index of the result, not regular columns:

```python
result = orders.groupby('order_status').size()
result.index   # the order_status values
result.columns # AttributeError — it's a Series, not a DataFrame
```

`.reset_index()` makes them columns again:

```python
result = (
    orders.groupby('order_status').size()
    .reset_index(name='n')
)
result.columns   # ['order_status', 'n']
```

This matters when you want to merge the result with another DataFrame, or export it to CSV with the group keys as proper columns.

??? note "Try it yourself — group + aggregate on Olist"
    Assume `orders`, `customers`, `items`, `reviews` are loaded.

    1. What's the distribution of `review_score` in `reviews`? Use `.value_counts()`.
    2. Number of orders per `customer_state` — top 10 only.
    3. Total revenue per seller — top 10. *(Revenue = `SUM(items.price)`.)*
    4. For each `order_status`, what's the average review score? *(Hint: you'll need a `merge` first — preview of Lesson 4.)*

    ??? success "Reveal solution"
        ```python
        # 1
        reviews['review_score'].value_counts().sort_index()
        # 1    11424
        # 2     3151
        # 3     8179
        # 4    19142
        # 5    57420

        # 2 — join needed because state lives on customers
        order_state = (
            orders.merge(customers, on='customer_id')
                  .groupby('customer_state').size()
                  .sort_values(ascending=False).head(10)
        )

        # 3
        revenue_per_seller = (
            items.groupby('seller_id')
                 .agg(revenue=('price', 'sum'))
                 .sort_values('revenue', ascending=False).head(10)
        )

        # 4
        status_review = (
            orders.merge(reviews, on='order_id')
                  .groupby('order_status')
                  .agg(avg_review=('review_score', 'mean'))
                  .sort_values('avg_review', ascending=False)
        )
        ```

        For #1, ~57% of reviews are 5-star and ~12% are 1-star — the same "U-shape" you saw in Day 1's Excel pivot.

## Common pitfalls

1. **Trying to filter group results with `.query()` mid-chain.** You can — but `.query()` evaluates against the column names, which are the group-key column + the aggregate names. If the aggregate is unnamed (multiindex), this fails confusingly. Name your aggregates.
2. **`.count()` when you meant `.size()`.** `.count()` ignores NaN, which is sometimes right and sometimes silently misleading.
3. **Forgetting `.reset_index()` before merge or export.** The group keys are in the index, not columns, and `merge` won't find them.
4. **Lambda aggregates that break vectorisation.** Built-in strings (`'mean'`, `'sum'`) are fast. Lambdas run per-group, slower. Fine for one-offs; avoid in tight loops.
5. **Forgetting `observed=True` on categorical groupings.** If your group key is a `category` dtype with unused levels, you'll get empty rows in the result. `groupby(..., observed=True)` skips them.

## How this shows up in the capstone

Both capstone tables — "worst categories" and "risky sellers" — are `groupby` + named-agg + sort + head. You'll write the same shape four or five times. Lesson 4 (merge) provides the input; this lesson summarises it.

## What's next

Continue to **[Lesson 4 — Merge & combine](04_merge.md)**.
