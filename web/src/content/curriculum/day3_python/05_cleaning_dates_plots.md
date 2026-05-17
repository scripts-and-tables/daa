# Lesson 5 — Cleaning, dates, and plots

**Time:** ~30 min.
**You'll be able to:**

- Detect, fill, and drop missing values (`NaN`)
- Work with date columns: extract year/month, compute differences, group by month
- Use a handful of string methods through the `.str` accessor
- Bin continuous values with `pd.cut()`
- Make a quick chart with `.plot()` or seaborn — enough to inspect your data
- Save outputs to CSV and PNG for the capstone

This is the lesson that bridges "raw data" to "stakeholder-ready output."

## Missing values — `NaN`

pandas uses `NaN` (a float) as its universal "missing value" marker, regardless of the column's logical type. Three core methods:

```python
orders.isna().sum()                  # NaN count per column
orders.dropna(subset=['order_delivered_customer_date'])   # drop rows where col is NaN
orders['review_score'].fillna(0)     # replace NaN with a default
```

A few patterns worth memorising:

- `.isna()` and `.notna()` — return Boolean masks. `.isna().sum()` per column is your missing-data audit.
- `.dropna(subset=[…])` — drop rows where *any* of those columns is NaN. Without `subset=`, it drops rows where *any* column is NaN (almost never what you want).
- `.fillna(value)` — replace NaN with a constant. Pass a dict to fill different columns with different defaults: `df.fillna({'score': 0, 'comment': '(no comment)'})`.

!!! tip "NaN ≠ NaN"
    `np.nan == np.nan` is `False`. Same trap as SQL's `NULL = NULL`. Always use `.isna()` for the check.

## Dates — the `.dt` accessor

Once a column is `datetime64[ns]` (because you passed `parse_dates=` in `read_csv`), it grows a `.dt` accessor full of date-aware methods:

```python
orders['order_purchase_timestamp'].dt.year         # 2017, 2018, ...
orders['order_purchase_timestamp'].dt.month        # 1..12
orders['order_purchase_timestamp'].dt.day_name()   # 'Monday', 'Tuesday', ...
orders['order_purchase_timestamp'].dt.to_period('M')   # 2018-04 (monthly period)
```

`.dt.to_period('M')` is the pandas equivalent of Excel's `TEXT(date, "yyyy-mm")` — turns dates into "the month they belong to," perfect for grouping.

### Date arithmetic

Subtracting two date columns gives a `timedelta`:

```python
orders['delivery_days'] = (
    orders['order_delivered_customer_date']
    - orders['order_purchase_timestamp']
).dt.days
```

The `.dt.days` extracts the day count as an integer. (Without it, you get a `timedelta64` column which is harder to work with downstream.)

### Dates to boolean flags

A common analytics move: tag each row as "late" or "on-time" based on a date comparison.

```python
orders['is_late'] = (
    orders['order_delivered_customer_date']
    > orders['order_estimated_delivery_date']
) & orders['order_delivered_customer_date'].notna()
```

Two things going on:

1. **`>` on two date columns returns a boolean Series** — no special pandas method needed. Same as `int > int`.
2. **The `.notna()` guard** is crucial. Without it, undelivered orders (where `order_delivered_customer_date` is `NaT`) silently get `False` for `is_late`, which is *correct by accident* — but if you wrote `<` instead of `>` the same accident would mis-tag them. Make the guard explicit; the comparison itself shouldn't carry the missingness assumption.

### Conditional aggregation — different stats for late vs on-time

Once you have `is_late`, you often want per-group statistics **split** by the flag. Two equivalent patterns:

**A — Filter, then group (cleaner when readable):**

```python
late_per_seller = (
    merged[merged['is_late']]
    .groupby('seller_id')
    .agg(avg_review_late=('review_score', 'mean'),
         n_late=('order_id', 'count'))
)
on_time_per_seller = (
    merged[~merged['is_late']]
    .groupby('seller_id')
    .agg(avg_review_on_time=('review_score', 'mean'),
         n_on_time=('order_id', 'count'))
)
combined = late_per_seller.join(on_time_per_seller, how='outer')
```

**B — Single groupby with lambda aggregates (tighter, harder to debug):**

```python
combined = (
    merged.groupby('seller_id').agg(
        avg_review_late=('review_score', lambda s: s[merged.loc[s.index, 'is_late']].mean()),
        avg_review_on_time=('review_score', lambda s: s[~merged.loc[s.index, 'is_late']].mean()),
        n_late=('is_late', 'sum'),
        n_on_time=('is_late', lambda s: (~s).sum()),
    )
)
```

**Prefer A.** It's more lines but each line is obvious. The lambda form (B) saves typing once but breaks the moment you try to add a third condition.

## Strings — the `.str` accessor

Same idea, for `object`/string columns:

```python
products['product_category_name'].str.lower()
products['product_category_name'].str.contains('beleza', na=False)
products['product_category_name'].str.replace('_', ' ')
products['product_category_name'].str.len()
products['product_category_name'].str.split('_').str[0]   # first chunk
```

`na=False` on `.str.contains()` matters — without it, NaN values in the column produce NaN in the mask, which then crashes when you try to filter with it.

??? tip "Statistical thinking primer — the four things to internalise (sidebar, ~3 min)"
    This course doesn't teach formal statistics. But four ideas come up in every analysis you'll ever do — internalise them now:

    1. **Mean vs median.** Mean is the arithmetic average. Median is the middle value. When the distribution is skewed (a few huge values pull the mean upward), the median is the more honest summary. Olist's `delivery_days` has a few orders that took 200+ days — those pull the mean up to ~12 even though the median is ~10. Report the median, mention the mean, never just the mean.
    2. **Spread matters as much as the centre.** A category with "avg review score 4.0" and another with "avg review score 4.0" might be very different — one could be 4.0 ± 0.1 (everyone agrees), the other 4.0 ± 1.8 (half love it, half hate it). Use `.describe()` (which gives you std + percentiles) before quoting a mean.
    3. **Correlation isn't causation.** Day 2 found that late deliveries correlate with bad reviews. That's a real correlation. It does **not** prove late deliveries cause bad reviews — sellers who deliver late might also ship poor-quality products, and the product quality is what the customer is rating. Always ask: "what else could explain this?"
    4. **Your sample isn't the population.** Olist's data is one Brazilian marketplace, 2017–2018. Findings here may not generalise to other marketplaces, other countries, or post-pandemic shopping behaviour. Caveat your reports accordingly.

    If you want the real version of this primer: *Think Stats* by Allen Downey is free at greenteapress.com.

## `pd.cut` — bucket continuous values

```python
orders['delivery_bucket'] = pd.cut(
    orders['delivery_days'],
    bins=[-1, 7, 14, 30, 1000],
    labels=['0-7 days', '8-14 days', '15-30 days', '30+ days'],
)
```

`bins=` is the list of bucket edges (inclusive on the right by default). `labels=` names them. Use this for histograms, group-by buckets, anywhere you want "broad bands" instead of raw values.

For equal-frequency buckets (each bucket has the same number of rows) use `pd.qcut()` instead.

## Quick plots

For Day 3 you don't need beautiful charts — that's Day 4 (Power BI). Quick "what does this look like?" plots are enough.

### `.plot()` — straight from pandas

```python
orders['order_status'].value_counts().plot(kind='bar')
```

`kind=` controls the chart type: `'bar'`, `'barh'`, `'line'`, `'hist'`, `'scatter'`, `'box'`. Defaults to `'line'` for Series and DataFrames.

### seaborn — slightly nicer defaults

```python
import seaborn as sns

sns.countplot(data=orders, x='order_status')
sns.boxplot(data=merged, x='review_score', y='delivery_days')
```

seaborn handles colors, labels, and order more sensibly than matplotlib defaults.

### Saving a chart

```python
import matplotlib.pyplot as plt

ax = score_by_bucket.plot(kind='bar')
ax.set_ylabel('Avg review score')
ax.set_title('Review score vs delivery time bucket')
plt.tight_layout()
plt.savefig('delivery_vs_review.png', dpi=150)
```

`plt.tight_layout()` stops labels getting clipped. `dpi=150` is a reasonable balance of file size and sharpness.

## Saving DataFrames to CSV

```python
worst_categories.to_csv('worst_categories.csv', index=False)
```

`index=False` keeps your row index out of the CSV — almost always what you want, otherwise you get a useless `Unnamed: 0` column when someone reads it back.

??? note "Try it yourself — the Day 3 capstone preview"
    Start from `orders`, `reviews`, `items`, `customers`, `products`, `categories` loaded as in Lesson 1.

    1. Left-merge `orders` with `reviews` on `order_id`. Assert row count is preserved (dedupe reviews first if not).
    2. Add a `delivery_days` column on the merged DataFrame: `(order_delivered_customer_date - order_purchase_timestamp).dt.days`.
    3. Group by `review_score` and compute the average `delivery_days`. Plot as a bar chart.
    4. Now bucket `delivery_days` into `[-1, 7, 14, 30, 1000]` with `pd.cut`, group by bucket, compute average `review_score`. Plot.

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
        merged['delivery_days'] = (
            merged['order_delivered_customer_date']
            - merged['order_purchase_timestamp']
        ).dt.days

        # 3
        avg_delivery_by_score = (
            merged.groupby('review_score').agg(avg_days=('delivery_days', 'mean'))
        )
        avg_delivery_by_score.plot(kind='bar')

        # 4
        merged['delivery_bucket'] = pd.cut(
            merged['delivery_days'],
            bins=[-1, 7, 14, 30, 1000],
            labels=['0-7 days', '8-14 days', '15-30 days', '30+ days'],
        )
        score_by_bucket = (
            merged.groupby('delivery_bucket', observed=True)
                  .agg(avg_score=('review_score', 'mean'))
        )
        score_by_bucket.plot(kind='bar')
        ```

        The delivery-bucket chart is **the** key visual of the course. It proves Day 2's late-vs-on-time finding with a continuous gradient: as delivery slips from 0-7 days to 30+, average review score collapses from ~4.5 to ~2.5. Save it as PNG — Day 5 embeds it in the final report.

## Common pitfalls

1. **`.fillna(0)` on review scores.** Treating "no review" as a 0-star review is a bias. Either keep NaN (and let aggregations skip it) or filter to rated orders explicitly.
2. **Mixing date and string comparisons.** If the column dtype is `object`, `< '2018-01-01'` does lexicographic comparison. Reload with `parse_dates=`.
3. **Plotting before grouping.** Plotting raw `delivery_days` for 100K rows produces an unreadable smear. Aggregate first, then plot.
4. **`to_csv()` without `index=False`.** Pollutes the CSV with the pandas row index. Always pass `index=False` unless you specifically want it.
5. **`pd.cut` with `bins=[0, 7, …]` and a 0-day delivery.** `pd.cut` defaults to right-inclusive, left-*exclusive*, so `bins=[0, …]` drops rows where the value is exactly 0. Start the first bin at `-1` (or pass `include_lowest=True`).

## How this shows up in the capstone

You'll save three CSVs and one PNG. The PNG is the chart Day 5's final report builds around. The "% bad reviews" column in your two summary tables uses `pd.cut`-style thinking applied to `review_score`. Date subtraction is how you compute `delivery_days`.

## You've finished the lessons

Take the **[self-test](test.md)** — twelve questions covering the five lessons. Then move on to **[the Day 3 capstone](../../capstone/day3_python/README.md)**, which reproduces Day 2's SQL findings in pandas and extends them with the late-vs-on-time-by-seller analysis.
