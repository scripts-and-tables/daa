# Lesson 1 — Get Data & Power Query

**Time:** ~30 min.
**You'll be able to:**

- Import a CSV into Power BI Desktop, choosing the right encoding and column types
- Open Power Query (the "second app" inside Power BI) and navigate its editor
- Rename columns, change types, filter rows at load time
- Add a custom column (`delivery_days`, `is_late`) without DAX
- Decide when to do work in Power Query vs. in DAX

Power Query is the most-skipped step in Power BI tutorials and the most expensive one to skip. Clean data once, here, instead of fighting bad data forever in your measures.

## The two-step import: "Get Data" → "Transform Data"

```
Home → Get Data → Text/CSV → pick file → Transform Data
```

**Always click "Transform Data," not "Load."** "Load" dumps the raw CSV into the model with whatever types Power BI guessed. "Transform Data" opens Power Query so you can fix types and shape *before* anything reaches the model.

You're now in the **Power Query Editor** — a separate window with its own ribbon. Don't be alarmed; it's still inside Power BI.

## The Power Query interface (60-second tour)

| Pane | Job |
|---|---|
| Left: **Queries** | One entry per imported table. Click to switch. |
| Center: **Data preview** | First ~1000 rows of the current query. Doesn't update live to changes — that's intentional. |
| Right: **Query Settings** | The most important pane. Lists every step applied to this query, in order. |
| Top: **Ribbon** | Operations grouped by category (Home, Transform, Add Column, View). |

The **Applied Steps** list on the right is the soul of Power Query. Every action you take adds a step. Click an earlier step to see the data at that point. Reorder steps by drag. Delete one by clicking the X.

It's a transcript of your transformations, replayed in order on every refresh. Read it like a recipe.

## The five edits you'll do every time

### 1. Change column types

Click the type icon to the left of a column header (looks like `ABC` for text, `123` for number, calendar for date). Pick the right type.

Power BI usually guesses well — but check date columns. CSVs export dates in many formats, and one mis-typed date column silently breaks every time-series visual downstream.

### 2. Rename columns

Double-click the header. Type a friendlier name. `order_delivered_customer_date` → `Delivered Date`.

These names show up in every visual's tooltip and field list. Spending 30 seconds on naming saves 30 visits to the documentation later.

### 3. Filter rows

Click the dropdown arrow on a column header → Number/Text/Date Filters. Same look as Excel's filter button; same idea.

```
Filters → Custom Filter → "is not equal to" → "cancelled"
```

Adds a step like `Table.SelectRows(...)`. **Loaded once at refresh; the report only ever sees the filtered rows.**

### 4. Remove unused columns

Right-click a column header → Remove. Or select multiple, right-click → Remove Columns.

Less data = faster refresh, smaller `.pbix` file, faster visuals. If you'll never use a column, drop it now.

### 5. Add a custom column

```
Add Column → Custom Column
```

Two essentials for the capstone:

```m
// delivery_days
Duration.Days([order_delivered_customer_date] - [order_purchase_timestamp])

// is_late (Boolean)
[order_delivered_customer_date] > [order_estimated_delivery_date]
```

The language is called **M** — Power Query's formula language. You'll rarely write more than a one-liner; the GUI generates the rest. Don't try to learn it like Python.

Note: `Duration.Days(date1 - date2)` — subtracting two dates gives a `Duration` value, not an integer. `Duration.Days()` extracts the day count.

After adding a column, **set its type** (the small `ABC` icon next to the new header). Custom columns default to `any`, which breaks aggregations.

## Merge queries (Power Query's join)

Sometimes you need to enrich a table with columns from another — *before* the data model. Examples: translate Portuguese category names, attach a customer's state to every order.

```
Home → Combine → Merge Queries
```

Select the join column on each side, pick the join type (Left Outer is the most common), click OK. Power BI adds a column that contains the matched rows; click its expand icon (↔) to pick which columns to bring through.

**Rule of thumb:** if you'd do this enrichment as a one-time, fixed lookup, do it in Power Query. If the user filters and the result depends on the filter, do it in DAX (Lesson 4).

## Close & Apply

When you're done editing, **Home → Close & Apply**. This:

1. Closes the Power Query editor
2. Runs all your steps against the full data
3. Loads the result into the data model
4. Returns you to Report view

The first apply on a fresh `.pbix` is slow. Subsequent applies just re-run from the cache.

??? note "Try it yourself — load orders and derive `delivery_days`"
    1. **Home → Get Data → Text/CSV.** Pick `data/olist/olist_orders_dataset.csv`. Click **Transform Data**.
    2. In the preview, check that the four date columns are detected as `Date/Time`. Fix the type if not.
    3. Rename the table from `olist_orders_dataset` to `Orders` (right-click the query name in the left pane → Rename).
    4. **Add Column → Custom Column.** Name: `delivery_days`. Formula:
       ```m
       Duration.Days([order_delivered_customer_date] - [order_purchase_timestamp])
       ```
    5. Set the new column's type to **Whole Number**.
    6. **Close & Apply.**
    7. Back in Report view, drag a Card visual onto the canvas, then drag `delivery_days` into it. The default aggregation is Sum; right-click the field → **Average**. Expected value: ~12.

    ??? success "Sanity check"
        - If the average is way off, you probably forgot to set the type to Whole Number. A Date-typed column won't average correctly.
        - If you see "Sum of delivery_days" totalling in the millions, you forgot to change Sum to Average.
        - If many rows are blank, those are undelivered orders — `Duration.Days(null - date)` is null. That's correct behaviour; the average just skips them.

## Common pitfalls

1. **Clicking "Load" instead of "Transform Data".** You can re-open Power Query later (Home → Transform Data), but it's friction. Start there.
2. **Setting a column type once, then editing steps before it.** Type changes propagate forward; reordering steps can put a `Number.From` before a column exists. Pin type changes near the end of the query.
3. **Doing the same transform in every query.** If you're repeating "rename, change type, filter cancelled" in five tables, that's a sign you should use a function or parameter. (Beyond today's scope, but recognise it.)
4. **Trusting auto-detected types on a column with mixed values.** Power BI samples the first ~1000 rows. If row 5000 has a stray text value in a numeric column, the type fails. Spot-check.
5. **Adding a custom column with `[date1] - [date2]` and leaving it as `Duration`.** Visuals can't aggregate `Duration`. Wrap with `Duration.Days()` and set the type to Whole Number.

## How this shows up in the capstone

The capstone needs `delivery_days` and `is_late` on `Orders`, plus the English category name merged into `Products` from `category_translation`. All three are Power Query work — one-time transformations that don't depend on user filters.

## What's next

Continue to **[Lesson 2 — The data model](02_data_model.md)**.
