# Lesson 1 — Notebooks & loading data

**Time:** ~25 min.
**You'll be able to:**

- Navigate a Jupyter notebook: cells, run order, kernel state
- Load a CSV into a pandas DataFrame with proper date parsing
- Inspect a DataFrame the right way: `.info()`, `.head()`, `.describe()`, `.shape`, `.dtypes`
- Read pandas' type names (`int64`, `float64`, `object`, `datetime64`) and know what to do when they're wrong

This lesson covers the first 25 minutes of every analysis you'll ever do in pandas. Get it into your fingers; the next four lessons assume it.

## The notebook workflow

A Jupyter notebook is a sequence of **cells**, each holding code or markdown. Run a cell with `Shift+Enter`. Output appears below.

Three rules of survival:

1. **Variables persist across cells in the order you ran them — not the order they appear.** If something is mysteriously wrong, restart the kernel (Kernel → Restart) and run all cells top-to-bottom. This catches "ghost variable" bugs faster than any debugging.
2. **The last expression in a cell auto-prints.** `df.head()` on its own line shows the head — no `print()` needed. `print(df.head())` works too, but for DataFrames the auto-print is prettier.
3. **Markdown cells are for explaining *why*, not narrating *what*.** Future-you opening this in six months wants context, not commentary.

## Imports

Every notebook starts the same way:

```python
import pandas as pd
import seaborn as sns                     # for charts later
pd.options.display.max_columns = 50       # so .head() doesn't hide columns
```

`pd` is the universal alias for pandas — used in every tutorial, book, and Stack Overflow answer. Don't rename it.

## `pd.read_csv` — your only data-loading function (today)

```python
orders = pd.read_csv(
    'data/olist/olist_orders_dataset.csv',
    parse_dates=[
        'order_purchase_timestamp',
        'order_delivered_customer_date',
        'order_estimated_delivery_date',
    ],
)
```

Two things worth knowing now; everything else has a sensible default.

**`parse_dates=[…]`** tells pandas to read those columns as actual dates rather than strings. **Do this every time** you have date columns. The penalty for skipping it: every later date filter, sort, and arithmetic operation silently misbehaves because `'2018-04-01'` < `'2018-3-15'` as a string.

**Other useful kwargs you'll occasionally need:**

| kwarg | what it does |
|---|---|
| `usecols=['a', 'b']` | only load these columns (faster + less memory on wide CSVs) |
| `dtype={'col': str}` | force a column's type (e.g., keep zero-padded IDs as strings) |
| `nrows=1000` | only load the first N rows (good for prototyping on huge files) |
| `sep=';'` | for European CSVs that use semicolons |

## Inspecting a DataFrame — the 30-second routine

```python
orders.shape       # (n_rows, n_cols)
orders.head()      # first 5 rows
orders.info()      # column names, dtypes, non-null counts
orders.describe()  # min/mean/max/quartiles for numeric columns
```

Burn this routine into your fingers. Every fresh DataFrame gets `.shape`, `.head()`, `.info()` before anything else.

### What `.info()` is telling you

```
RangeIndex: 99441 entries, 0 to 99440
Data columns (total 8 columns):
 #   Column                          Non-Null Count  Dtype
---  ------                          --------------  -----
 0   order_id                        99441 non-null  object
 1   customer_id                     99441 non-null  object
 2   order_status                    99441 non-null  object
 3   order_purchase_timestamp        99441 non-null  datetime64[ns]
 4   order_approved_at               99281 non-null  datetime64[ns]
 5   order_delivered_carrier_date    97658 non-null  datetime64[ns]
 6   order_delivered_customer_date   96476 non-null  datetime64[ns]
 7   order_estimated_delivery_date   99441 non-null  datetime64[ns]
```

- **`99441 entries`** — row count. Compare to the SQL `SELECT COUNT(*)` from yesterday. They should match exactly.
- **`Non-Null Count`** per column — how many rows have a value. The four delivery-date columns have fewer non-nulls because some orders aren't delivered. **This is your missing-data inventory.**
- **`Dtype`** — pandas' type for the column. Read on.

### pandas dtypes you'll meet

| dtype | What it means | When you'll see it |
|---|---|---|
| `int64` | Integers | counts, IDs that are real numbers |
| `float64` | Floats (decimals) | prices, ratios, anything with decimals — *also*, any int column that has a NaN somewhere becomes float |
| `object` | Strings (or mixed) | text columns, IDs stored as text |
| `datetime64[ns]` | Dates / times | only if you used `parse_dates` |
| `bool` | True/False | results of comparisons |
| `category` | Fixed set of strings | optimization for repeated values like state codes |

**`object` is the suspicious one.** If a column you expected to be numeric shows up as `object`, something's text-y about it — a comma, a stray header, a `"N/A"` someone typed. Fix it with `pd.to_numeric(col, errors='coerce')` (turns un-parseable values into NaN).

## A common gotcha: int columns becoming float

Pandas can't put NaN inside an `int64` column. So if a column is mostly integers but has one missing value, the whole column becomes `float64`:

```python
ser = pd.Series([1, 2, None, 4])
ser.dtype  # float64
ser
# 0    1.0
# 1    2.0
# 2    NaN
# 3    4.0
```

Mildly annoying. Use the newer nullable integer type if it matters:

```python
ser.astype('Int64')   # capital I — pandas' nullable integer type
```

You won't need this often, but it's good to recognise.

??? note "Try it yourself — basics on the Olist data"
    Load `orders` as shown above. Then answer:

    1. How many orders are in the data?
    2. What columns does `orders` have, and what's their type?
    3. How many orders are in each status? (Hint: `.value_counts()` on `order_status`.)
    4. What's the date range of `order_purchase_timestamp` — earliest and latest?

    ??? success "Reveal solution"
        ```python
        # 1
        len(orders)                # 99441
        orders.shape               # (99441, 8)

        # 2
        orders.info()              # column names + dtypes + non-null counts

        # 3
        orders['order_status'].value_counts()
        # delivered    96478
        # shipped       1107
        # ...

        # 4
        orders['order_purchase_timestamp'].agg(['min', 'max'])
        # min   2016-09-04 21:15:19
        # max   2018-10-17 17:30:18
        ```

        The row count should match yesterday's `SELECT COUNT(*) FROM orders`. If it doesn't, one of the two queries (today's or yesterday's) has a bug — find it before going further.

## Common pitfalls

1. **Skipping `.info()`.** Hidden missing values and surprise `object` dtypes are why later analysis goes sideways. Look first.
2. **Forgetting `parse_dates=`.** Dates load as strings; comparisons silently lie. Always pass `parse_dates=` for known date columns.
3. **"Out-of-order cell execution" weirdness.** When in doubt, Kernel → Restart and run all.
4. **Loading 5GB CSVs without `usecols`.** RAM goes south. Pull only the columns you need.
5. **Renaming `pd` to something else.** Don't.

## How this shows up in the capstone

You'll be loading 6 of the 8 Olist CSVs and joining them. Every one starts with a `read_csv` + `.info()` check. The row counts you note here are the ones you'll be reconciling against yesterday's SQL CSVs.

## What's next

Continue to **[Lesson 2 — Selecting & filtering](02_selecting_filtering.md)**.
