# Day 3 — Python (pandas for data analysis)

**Duration:** 4 hours
**Prerequisites:** Days 1–2
**Learning goals:** by end of day you can load CSVs into pandas DataFrames, filter/group/join them, and make quick plots. Enough to do everything you did in Excel and SQL — faster, repeatable, and on much bigger data.

> **Important framing:** today is **not** about learning Python the programming language. Today is about pandas — "Excel with code." We use just enough Python syntax to drive pandas, and skip everything else.

## Why pandas after SQL?

SQL is great until you want to:
- Loop over many similar queries and compose results
- Run statistical tests, fit a regression, build a quick model
- Make a chart that's better than the database GUI's built-in plotter
- Save your analysis as a re-runnable notebook

pandas does all of those. And under the hood, every `df.groupby(...).agg(...)` is a SQL `GROUP BY` — you already know the concepts.

| SQL | pandas |
|---|---|
| `SELECT a, b FROM t` | `df[['a', 'b']]` |
| `WHERE a > 10` | `df[df['a'] > 10]` or `df.query('a > 10')` |
| `GROUP BY a` | `df.groupby('a')` |
| `SUM(b)` | `.agg({'b': 'sum'})` or `['b'].sum()` |
| `JOIN ... ON` | `df1.merge(df2, on='id', how='left')` |
| `ORDER BY` | `df.sort_values('col', ascending=False)` |
| `LIMIT 10` | `df.head(10)` |

## Tooling: Jupyter

We use **Jupyter notebooks** — code + output + notes in one document. Two ways to run:

- **Browser, zero install:** [jupyter.org/try-jupyter/lab](https://jupyter.org/try-jupyter/lab/) → JupyterLite. Works offline-ish, no setup. **Recommended for the class** so everyone is on the same tooling.
- **Local:** install Anaconda, run `jupyter lab` from a terminal. More powerful but more install pain.

Your instructor will tell you which to use Day 3 morning. Stick with that one.

## Agenda

| Time | Block | Topic |
|---|---|---|
| 00:00–00:50 | Hour 1 — Notebook basics + DataFrames | Cells, `import pandas`, `read_csv`, `head`, `info`, `describe` |
| 00:50–01:00 | Break | |
| 01:00–01:50 | Hour 2 — Selecting and filtering | `[[...]]`, boolean indexing, `query`, `loc`/`iloc` |
| 01:50–02:00 | Break | |
| 02:00–02:50 | Hour 3 — Groupby, merge, plot | `groupby` + `agg`, `merge`, quick plots with `.plot()` / `seaborn` |
| 02:50–03:00 | Break | |
| 03:00–04:00 | Hour 4 — Capstone | Re-do Day 2's analysis in pandas + extend |

## Key concepts

### 1. The notebook workflow

A Jupyter notebook is a sequence of **cells**. Each cell holds code or markdown. Run a cell with `Shift+Enter`. The output appears below.

- **Variables persist between cells** in the order you ran them — not the order they appear. This trips up everyone once. If something's weird, restart the kernel (Kernel → Restart) and run all cells top-to-bottom.
- **Last expression in a cell auto-prints.** `df.head()` on its own line shows the head. `print(df.head())` works too.

### 2. Loading data

```python
import pandas as pd

orders = pd.read_csv('data/olist/olist_orders_dataset.csv',
                     parse_dates=['order_purchase_timestamp',
                                  'order_delivered_customer_date',
                                  'order_estimated_delivery_date'])
orders.head()
orders.info()
orders.describe()
```

- `parse_dates=` tells pandas to treat those columns as actual dates, not strings. **Always do this for date columns** — saves so much pain later.
- `.info()` shows column names, types, and null counts. **Always look at this first.**
- `.describe()` gives summary stats for numeric columns. Useful for sanity-checking ranges.

### 3. Selecting and filtering

```python
# Select columns
orders[['order_id', 'order_status']]

# Filter rows
orders[orders['order_status'] == 'delivered']

# Multiple conditions — wrap each in parens, use & not 'and'
orders[(orders['order_status'] == 'delivered') &
       (orders['order_purchase_timestamp'] >= '2018-01-01')]

# Cleaner with .query()
orders.query("order_status == 'delivered' and order_purchase_timestamp >= '2018-01-01'")
```

### 4. Groupby

Same mental model as SQL `GROUP BY` and Excel pivot tables.

```python
orders.groupby('order_status').size()

orders.groupby('order_status').agg(
    n=('order_id', 'count'),
    earliest=('order_purchase_timestamp', 'min'),
    latest=('order_purchase_timestamp', 'max'),
)
```

Multiple grouping columns: pass a list.

```python
items.groupby(['seller_id', 'product_id']).agg(total=('price', 'sum'))
```

### 5. Merge (= SQL join)

```python
joined = orders.merge(reviews, on='order_id', how='left')
```

- `on=` is the key column(s). Use `left_on=`/`right_on=` if the columns have different names.
- `how=` is the join type: `'inner'`, `'left'`, `'right'`, `'outer'`. Same meanings as SQL.
- **Always check row counts before and after a merge.** If `len(joined) != len(orders)` and you expected a left join, you've got duplicates on the right side.

### 6. Plotting

Quickest way:

```python
orders.groupby('order_status').size().plot(kind='bar')
```

Better-looking, slightly more code:

```python
import seaborn as sns
sns.countplot(data=orders, x='order_status')
```

For day 3 you don't need beautiful charts — that's Day 4 (Power BI). Quick plots to see the shape of your data is enough.

## Exercises

See [`exercises/`](exercises/) — 4 drills, ~15 minutes each. Solutions in [`solutions/`](solutions/) (as a notebook + a markdown explainer).

## Capstone task for today

See [`../../capstone/day3_python/README.md`](../../capstone/day3_python/README.md).

## Common pitfalls

- **`SettingWithCopyWarning`** — pandas yells at you when it's not sure if you're modifying a view or a copy. Use `.loc[...]` or `.copy()` explicitly to silence it.
- **Forgetting to `parse_dates`** — your "dates" are strings, sorting/filtering doesn't work as expected.
- **Comparing strings as numbers** — `'10' < '9'` is True. Check `df.dtypes`.
- **Using `and`/`or` instead of `&`/`|`** in boolean indexing — raises a confusing error.
- **Trusting `len()` after a merge** without checking. Always check.
