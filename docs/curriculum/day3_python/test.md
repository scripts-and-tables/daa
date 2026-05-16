# Day 3 — Self-test

Twelve questions. Write your answer **before** clicking to reveal. If you miss more than three, re-read the relevant lesson before the capstone.

Quick re-read links: [Lesson 1](01_notebooks_and_loading.md) · [Lesson 2](02_selecting_filtering.md) · [Lesson 3](03_groupby.md) · [Lesson 4](04_merge.md) · [Lesson 5](05_cleaning_dates_plots.md).

---

??? question "1. What's the standard pandas import line, and why do everyone uses the same alias?"
    **Answer:** `import pandas as pd`. The alias is conventional — every tutorial, book, and Stack Overflow answer uses `pd`. Renaming it makes your code unfamiliar to every other pandas user.

??? question "2. Why pass `parse_dates=['col_a', 'col_b']` to `read_csv`?"
    **Answer:** Without it, those columns load as strings (`object` dtype). String comparisons are lexicographic — `'2018-3-15' > '2018-04-01'` is True. Filters and sorts silently misbehave. Pass `parse_dates=` for any column you intend to treat as a date.

??? question "3. Spot the bug: `df[df['status'] == 'delivered' and df['price'] > 100]`"
    **Answer:** Use `&` instead of `and`, and parenthesise both conditions:
    ```python
    df[(df['status'] == 'delivered') & (df['price'] > 100)]
    ```
    `and`/`or` only work on single Booleans; for arrays of Booleans you need `&`/`|`/`~`. Parentheses are required because `&` binds tighter than `==`.

??? question "4. Difference between `df.loc[0:5]` and `df.iloc[0:5]`?"
    **Answer:**

    - `df.iloc[0:5]` — positional, end-exclusive. Returns **5 rows** (positions 0–4).
    - `df.loc[0:5]` — label-based, end-inclusive. Returns **6 rows** if the index has labels 0..5.

    `.loc` inclusivity is the one inconsistency in pandas slicing — burn it in.

??? question "5. What's the difference between `.size()` and `.count()` after a `groupby`?"
    **Answer:**

    - `.size()` — counts **rows** in each group (including NaNs).
    - `.count()` — counts **non-NaN values** per column per group.

    `.size()` is what you want for "how many rows" — `.count()` is for "how many values of this specific column are present."

??? question "6. Write the pandas equivalent of: `SELECT customer_state, COUNT(*) AS n FROM customers GROUP BY customer_state ORDER BY n DESC LIMIT 10;`"
    **Answer:**
    ```python
    (
        customers.groupby('customer_state')
                 .size()
                 .sort_values(ascending=False)
                 .head(10)
                 .reset_index(name='n')
    )
    ```
    Or with named aggregation:
    ```python
    (
        customers.groupby('customer_state')
                 .agg(n=('customer_id', 'count'))
                 .sort_values('n', ascending=False)
                 .head(10)
        )
    ```

??? question "7. Why is the row-count assertion after a `merge` so important?"
    **Answer:** A `left` merge should keep exactly `len(left)` rows. If the right side has duplicates on the join key, every duplicate becomes a new row in the output — silently inflating sums and averages downstream. The assertion (`assert len(merged) == n_before`) catches this at the join, where it's a 1-line fix, instead of three hours later when the dashboard numbers look weird.

??? question "8. You merge `orders` with `reviews` on `order_id` and `len()` grows from 99,441 to 100,012. What's happening and how do you fix it?"
    **Answer:** The Olist `reviews` table has ~571 duplicate rows on `order_id`. Dedupe before merging:
    ```python
    reviews_clean = reviews.drop_duplicates(subset='order_id', keep='last')
    merged = orders.merge(reviews_clean, on='order_id', how='left')
    assert len(merged) == len(orders)
    ```
    Or aggregate the right side first if you only need a per-order summary.

??? question "9. How do you extract the year from a `datetime64` column?"
    **Answer:** `series.dt.year`. The `.dt` accessor exposes year, month, day, weekday, hour, etc. for date-typed columns. (If you get an `AttributeError`, the column is probably `object`-dtype strings, not actual dates — reload with `parse_dates=`.)

??? question "10. Write a snippet that adds a `delivery_days` column to `orders` and shows its distribution."
    **Answer:**
    ```python
    orders = orders.copy()                     # avoid SettingWithCopyWarning
    orders['delivery_days'] = (
        orders['order_delivered_customer_date']
        - orders['order_purchase_timestamp']
    ).dt.days
    orders['delivery_days'].describe()
    ```
    The `.dt.days` extracts the day count as an integer. Without it you get a `timedelta64` column.

??? question "11. Spot the bug: `df.to_csv('out.csv')` produces a file with a useless `Unnamed: 0` column when reloaded."
    **Answer:** Missing `index=False`. By default `to_csv` writes the row index as the first column. The fix:
    ```python
    df.to_csv('out.csv', index=False)
    ```
    Almost always what you want, unless the index actually holds meaningful labels.

??? question "12. You write `pd.cut(orders['delivery_days'], bins=[0, 7, 14, 30, 1000])` and the rows with `delivery_days == 0` disappear from the result. Why, and how do you fix it?"
    **Answer:** `pd.cut` defaults to right-inclusive, left-**exclusive** intervals: `(0, 7], (7, 14], …`. A delivery of exactly 0 days isn't in any bucket.

    Two fixes:

    1. Start the first bin at `-1`: `bins=[-1, 7, 14, 30, 1000]`.
    2. Pass `include_lowest=True`.

    The `-1` trick is the more common form.

---

**Got 9+ right?** **[Start the Day 3 capstone →](../../capstone/day3_python/README.md)**

**Got fewer?** Re-read the relevant lesson(s). The capstone uses `merge` with multiple sanity-checks and at least one `pd.cut`-flavoured grouping — getting them solid here is cheaper than fighting them there.
