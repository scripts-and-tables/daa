# Lesson 2 — Selecting & filtering

**Time:** ~30 min.
**You'll be able to:**

- Pick columns and rows out of a DataFrame: `df['col']`, `df[['a', 'b']]`, `df.loc[]`, `df.iloc[]`
- Filter rows with boolean masks and the `.query()` mini-language
- Combine conditions with `&`/`|`/`~` (and know why `and`/`or` raise an error)
- Use `.isin()`, `.between()`, `.str.contains()`
- Avoid (or silence) the `SettingWithCopyWarning`

If Lesson 1 was "load and look," this lesson is "narrow down to what you care about."

## Picking columns

```python
orders['order_status']                     # one column → Series
orders[['order_id', 'order_status']]       # list of columns → DataFrame
```

The key distinction: **a single string gives you a Series (1-D); a list of strings gives you a DataFrame (2-D)**, even if the list has one element. `df['col']` and `df[['col']]` are not the same shape.

```python
type(orders['order_status'])     # pandas.Series
type(orders[['order_status']])   # pandas.DataFrame
```

For most analysis you want a DataFrame. For arithmetic on one column, a Series.

## Picking rows by position vs. label: `.iloc` and `.loc`

```python
orders.iloc[0]              # first row (by position) — returns a Series
orders.iloc[0:5]            # first 5 rows
orders.iloc[0:5, 0:3]       # first 5 rows, first 3 columns
orders.iloc[[0, 2, 4]]      # rows at positions 0, 2, 4

orders.loc[0]               # row with index label 0 (often the same as iloc[0])
orders.loc[0:5]             # INCLUSIVE on both ends — gives 6 rows!
orders.loc[:, 'order_id']   # all rows, one column by name
```

**The single confusing rule:** `.loc` slices are **inclusive** of both ends; `.iloc` slices are **exclusive** of the end (like Python lists). `loc[0:5]` gives 6 rows; `iloc[0:5]` gives 5. Trips up everyone once.

You'll rarely use raw `.iloc` in day-to-day analytics — most of the time you want to filter by a condition, not by position.

## Boolean indexing — the workhorse

```python
orders[orders['order_status'] == 'delivered']
```

What's happening: `orders['order_status'] == 'delivered'` produces a Boolean Series (one True/False per row). `orders[bool_series]` keeps rows where that Series is True.

You can pull the mask out and re-use it:

```python
is_delivered = orders['order_status'] == 'delivered'
delivered    = orders[is_delivered]
not_delivered = orders[~is_delivered]      # ~ inverts the mask
```

### Combining conditions: `&`, `|`, `~`

```python
# Multiple conditions — wrap each in parens, use & not 'and'
orders[
    (orders['order_status'] == 'delivered')
    & (orders['order_purchase_timestamp'] >= '2018-01-01')
]
```

| Operator | What it means |
|---|---|
| `&` | AND |
| `\|` | OR |
| `~` | NOT |

**Do not use `and`/`or`/`not` here.** Python's keyword operators work on single Booleans; we have arrays of Booleans, which need the bitwise operators. Worse, the error message (`The truth value of a Series is ambiguous`) is famously cryptic.

**Always parenthesise each condition.** `&` and `|` bind tighter than `==`, so `a == b & c == d` parses as `a == (b & c) == d` — almost never what you meant.

### `.isin()`, `.between()`, `.str.contains()`

```python
orders[orders['order_status'].isin(['delivered', 'shipped'])]
items[items['price'].between(100, 500)]
products[products['product_category_name'].str.contains('beleza', na=False)]
```

- `.isin([…])` — the pandas `IN` operator.
- `.between(a, b)` — inclusive of both ends.
- `.str.contains('pattern', na=False)` — substring match. The `na=False` keeps NaN values out of the result instead of letting them crash the Boolean.

## `.query()` — the readable alternative

For more than two conditions, the parentheses get noisy. `.query()` uses a mini-language that reads more like SQL:

```python
orders.query("order_status == 'delivered' and order_purchase_timestamp >= '2018-01-01'")

# variable interpolation with @
threshold = 1000
items.query("price > @threshold")
```

`.query()` takes a string, so it's slightly slower than boolean indexing on tiny DataFrames — but for ~100K rows you won't notice, and the readability wins. Use whichever feels clearer in context.

## `SettingWithCopyWarning` — what it is and how to make it shut up

Sooner or later you'll see:

```
SettingWithCopyWarning: A value is trying to be set on a copy of a slice from a DataFrame.
Try using .loc[row_indexer,col_indexer] = value instead
```

The root cause: pandas isn't sure whether your assignment is modifying the original DataFrame or a copy of a slice — and the two behave differently. Two patterns that avoid it:

**Pattern A — assign with `.loc`:**

```python
orders.loc[orders['order_status'] == 'canceled', 'flag'] = 'BAD'
```

**Pattern B — make an explicit copy first:**

```python
recent = orders[orders['order_purchase_timestamp'] >= '2018-01-01'].copy()
recent['delivery_days'] = (
    recent['order_delivered_customer_date'] - recent['order_purchase_timestamp']
).dt.days
```

The warning is pandas saving you from a confusing bug. Don't silence it with `pd.options.mode.chained_assignment = None` — fix the underlying ambiguity.

??? note "Try it yourself — filtering the Olist data"
    Assume `orders` is loaded with `parse_dates=` as in Lesson 1.

    1. Show the 5 most expensive line items in `items` (sort by `price`).
    2. How many orders were placed in 2017? (Use `.dt.year` on the timestamp column.)
    3. How many *orders* had at least one item with `price > 1000`?
    4. Add a `delivery_days` column to `orders`: `(order_delivered_customer_date - order_purchase_timestamp).dt.days`. What's its `.describe()`?

    ??? success "Reveal solution"
        ```python
        # 1
        items.sort_values('price', ascending=False).head(5)

        # 2
        orders_2017 = orders[orders['order_purchase_timestamp'].dt.year == 2017]
        len(orders_2017)

        # 3 — orders, not items. .nunique() on the join key gets the distinct count.
        expensive_orders = items[items['price'] > 1000]['order_id'].nunique()

        # 4 — use .copy() to avoid the SettingWithCopyWarning
        orders = orders.copy()
        orders['delivery_days'] = (
            orders['order_delivered_customer_date'] - orders['order_purchase_timestamp']
        ).dt.days
        orders['delivery_days'].describe()
        ```

        Expected for #4: mean ~12 days, median ~10, max ~200 (a few outliers — investigate or cap later).

## Common pitfalls

1. **Using `and`/`or` in boolean masks.** Use `&`/`|` and parenthesise each clause.
2. **Forgetting parentheses around individual conditions.** Operator precedence breaks the predicate silently.
3. **`.loc[0:5]` vs `.iloc[0:5]`.** Different row counts because `.loc` is inclusive of the end.
4. **`SettingWithCopyWarning` cargo-culted away.** Silencing it hides real bugs. Use `.copy()` or `.loc[]` assignment instead.
5. **`'10' < '9'` on a string column.** String comparison is lexicographic. Check `dtype`; cast if necessary.

## How this shows up in the capstone

The capstone is full of "compute X **for** orders that match Y" — every Y is a filter. The faster you can write filters without thinking, the more brainpower you have for the analysis itself.

## What's next

Continue to **[Lesson 3 — Aggregation & groupby](03_groupby.md)**.
