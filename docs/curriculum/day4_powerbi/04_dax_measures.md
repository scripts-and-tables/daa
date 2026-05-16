# Lesson 4 — DAX measures

**Time:** ~30 min.
**You'll be able to:**

- Tell the difference between an implicit measure, an explicit measure, and a calculated column — and when to use each
- Write the four DAX functions that cover 80% of what you need: `SUM`, `AVERAGE`, `CALCULATE`, `DIVIDE`
- Reason about **filter context** — the central DAX concept and the source of every confusing result
- Use `COUNTROWS`, `DISTINCTCOUNT`, `COUNTBLANK` for counting things correctly
- Name measures so future-you can read them

DAX (Data Analysis eXpressions) is Power BI's formula language. Excel users find it familiar at first, then confusing. The confusion is almost always filter context — the thing that makes DAX powerful and weird.

## Implicit vs explicit measures

When you drag `price` into a Values well and Power BI shows "Sum of price," it's creating an **implicit measure** on the fly. Convenient — but invisible. You can't reuse it, name it, or build other measures on top of it.

**Always create explicit measures** for anything you'll use more than once.

```
Right-click a table in the Fields pane → New measure
```

Then in the formula bar:

```dax
Total Revenue = SUM(Items[price])
```

Now `Total Revenue` shows up in the Fields pane with a calculator icon. Drag it into any visual — same number everywhere.

## Measure vs calculated column vs Power Query column

Three places you can create a derived value. Pick wisely.

| Need | Where | Why |
|---|---|---|
| Value that's a fixed property of a row, doesn't depend on filters | **Power Query custom column** | Computed once, at refresh. Fast. (Lesson 1) |
| Same as above but you don't want to re-process from Power Query | **DAX calculated column** | Stored, but in the DAX engine. Use when Power Query is awkward. |
| Value that re-computes based on what the user filters | **DAX measure** | Computed at visual rendering time, in the user's filter context |

The rule: **`delivery_days` per order is a column. "% Late" across the user's slicer is a measure.**

99% of what you write today will be measures. Calculated columns are an "occasional" tool; Power Query is your default for derived columns.

## The four functions

### `SUM` and `AVERAGE` — start here

```dax
Total Revenue   = SUM(Items[price])
Avg Review      = AVERAGE(Reviews[review_score])
```

`SUM(table[column])` sums one column. `AVERAGE` averages it. There's no `SUMIF` in DAX — you use `CALCULATE`. (Next section.)

### `CALCULATE` — the most important function

`CALCULATE` evaluates an expression with **modified filter context**. The structure:

```dax
CALCULATE( expression, filter1, filter2, ... )
```

- `expression` — a measure or aggregate (e.g., `SUM(Items[price])` or `[Total Revenue]`).
- `filter1`, `filter2`, ... — Boolean conditions or `KEEPFILTERS()` / `ALL()` modifiers.

Example: total revenue, but only for delivered orders.

```dax
Delivered Revenue =
    CALCULATE(
        [Total Revenue],
        Orders[order_status] = "delivered"
    )
```

Reads as "give me Total Revenue, additionally filtered to orders where status is delivered."

Another: count of late orders.

```dax
Late Orders =
    CALCULATE(
        COUNTROWS(Orders),
        Orders[is_late] = TRUE
    )
```

`COUNTROWS(table)` counts rows in a table. `CALCULATE(COUNTROWS(Orders), filter)` counts rows that satisfy the filter.

### `DIVIDE` — safe division

`DIVIDE(numerator, denominator, alternate)` is division with a built-in fallback for divide-by-zero:

```dax
% Late =
    DIVIDE(
        [Late Orders],
        COUNTROWS(Orders),
        0
    )
```

If `COUNTROWS(Orders)` is zero (e.g., the slicer filtered everything out), the result is `0` instead of an error.

**Always use `DIVIDE` instead of `/`.** Visuals throw errors with `/`; with `DIVIDE` they show a clean zero or blank.

### Putting them together

```dax
Total Revenue   = SUM(Items[price])
Avg Review      = AVERAGE(Reviews[review_score])
N Orders        = DISTINCTCOUNT(Orders[order_id])
Late Orders     = CALCULATE([N Orders], Orders[is_late] = TRUE)
% Late          = DIVIDE([Late Orders], [N Orders], 0)

% Bad Reviews =
    DIVIDE(
        CALCULATE([N Orders], Reviews[review_score] <= 2),
        [N Orders],
        0
    )
```

These five measures plus `Total Revenue` are everything the capstone needs.

## Filter context — the central concept

When Power BI renders a visual, every cell has a **filter context** — the set of filters that apply to it. Filter context comes from:

- Slicers on the page
- Filters on the visual
- The row's position in the visual (e.g., a row in a bar chart has the category as part of its context)
- `CALCULATE`'s filter arguments

A measure recomputes per cell, in that cell's filter context. That's why the same `Total Revenue` measure gives the right number in a card (no extra filter), in a bar chart per category (extra filter: this row's category), and on a page with a state slicer (extra filter: selected state).

You don't have to "tell it" to filter. Filter context flows automatically. You only intervene with `CALCULATE` when you want to modify the context — usually to **add** an extra filter (e.g., "and order_status = delivered") or to **remove** one (`ALL(table)` clears the filter).

This is the source of 90% of "why is this measure showing the wrong number?" — the answer is almost always "you didn't realise the visual was filtering it."

## `COUNTROWS`, `DISTINCTCOUNT`, `COUNTBLANK`

The counting trio:

```dax
COUNTROWS(Orders)                  -- all rows in Orders (post-filter)
DISTINCTCOUNT(Orders[order_id])    -- unique order_ids — same number here, but useful in tables with duplicates
COUNTBLANK(Reviews[review_score])  -- how many missing scores
```

Use `DISTINCTCOUNT` when joining inflates rows. In `Items` (one row per line item), `DISTINCTCOUNT(Items[order_id])` correctly counts orders; `COUNTROWS(Items)` would count line items.

## Naming measures

Three rules:

1. **Plain English, capitalised words.** `Total Revenue`, not `total_revenue` or `TR`.
2. **One line max.** If the name is long, the measure is doing too much; split into smaller measures.
3. **Prefix percentages with `%`.** `% Late`, `% Bad Reviews` — the visual will show them with the % glyph and they sort together in the Fields pane.

Measure names show up in tooltips, legends, axis labels. Names are UX.

??? note "Try it yourself — write the capstone's measures"
    Building on the Orders/Items/Reviews/Customers model from Lessons 1–2:

    1. In Power Query (re-open via Home → Transform Data), confirm `Orders` has both `delivery_days` and `is_late` columns. If not, add them — see Lesson 1.
    2. In Report view, **right-click `Items` → New measure**:
       ```dax
       Total Revenue = SUM(Items[price])
       ```
    3. Create the remaining measures:
       ```dax
       Avg Review     = AVERAGE(Reviews[review_score])
       N Orders       = DISTINCTCOUNT(Orders[order_id])
       Late Orders    = CALCULATE([N Orders], Orders[is_late] = TRUE)
       % Late         = DIVIDE([Late Orders], [N Orders], 0)
       % Bad Reviews  = DIVIDE(
                          CALCULATE([N Orders], Reviews[review_score] <= 2),
                          [N Orders],
                          0
                        )
       ```
    4. Format `% Late` and `% Bad Reviews` as **Percentage** in the Measure tools menu at the top.
    5. Drag each into a Card. The cards should show: ~R$ 13.6M revenue, ~4.1 avg review, ~97k orders, ~7k late, ~7% late, ~15% bad reviews. (Numbers approximate.)

    ??? success "Diagnostic if numbers look off"
        - **`Total Revenue` showing R$ 0:** the Items relationship to Orders is broken, OR `price` column dtype is text. Check both.
        - **`Avg Review` showing 0 or NaN:** the Reviews-to-Orders relationship is broken.
        - **`% Late` showing 100% or 0%:** `is_late` column is the wrong type (text "TRUE"/"FALSE" instead of Boolean). Re-do the Power Query step with the right type.

## Common pitfalls

1. **Implicit measures.** Cute for exploring; bad for any visual you'll use twice. Always make explicit measures and reuse them.
2. **`CALCULATE` with a measure as the filter.** Filter arguments are Boolean expressions on table columns. `CALCULATE([N Orders], [Avg Review] < 3)` won't work the way you think — use `FILTER()` or rework the expression.
3. **Using `/` instead of `DIVIDE`.** The visual will show errors when the denominator is zero — `DIVIDE` shows a clean blank or your fallback.
4. **Calculated columns in the fact table.** Adds memory; usually slower than the equivalent measure. Use them only when you need the value to participate in a relationship.
5. **Forgetting that measures recompute per visual cell.** "But it showed the right number on the card!" The card has no extra filter; the bar chart row has the category as a filter. That's why they differ.

## How this shows up in the capstone

The six measures above are exactly the ones the capstone dashboard needs. The cards use `Total Revenue`, `Avg Review`, `% Late`. The bottom-10-sellers table breaks them down per `seller_id` using the relationships. The bar chart of revenue by category is `Total Revenue` dropped into a bar chart with `product_category_name_english` on the Y-axis — the category's filter context does the rest.

## What's next

Continue to **[Lesson 5 — Interactivity, layout & polish](05_interactivity_and_polish.md)**.
