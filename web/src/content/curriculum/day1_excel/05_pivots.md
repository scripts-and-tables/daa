# Lesson 5 — Pivot tables & charts

**Time:** ~35 min.
**You'll be able to:**

- Build a pivot table from a Table in three clicks
- Drag fields into Rows, Columns, Values, Filters and know what each one does
- Change the aggregation from Sum to Average / Count / Max / Min
- Group dates by Year, Quarter, or Month — automatically
- Add a slicer so you (or your stakeholder) can click-filter the pivot
- Build a pivot chart that stays in sync with its pivot
- Recognise when **not** to use a pivot (and use `SUMIFS` or a chart-on-a-Table instead)

A pivot table is the single biggest force-multiplier in Excel. If Lessons 1–4 teach you to write formulas, this lesson teaches you to **answer questions** without writing any.

## The mental model: a pivot is a SQL `GROUP BY`

If you've ever wanted to ask "total revenue by region by month, with a filter for shipped orders," that's a `GROUP BY` in SQL or a pivot in Excel. Same operation, different ergonomics.

| In a question | In pivot terms |
|---|---|
| "**by** region" | drag Region to **Rows** |
| "**by** month" (second grouping) | drag Date to **Columns** |
| "**total** revenue" | drag Revenue to **Values** (aggregation: Sum) |
| "**only** shipped orders" | drag Status to **Filters**, pick "shipped" |

Once that mapping clicks, you'll build pivots without thinking.

## Building your first pivot

Starting from a Table (always start from a Table — pivots on raw ranges break when rows are added):

1. Click anywhere inside the Table.
2. **Insert → PivotTable**.
3. Excel asks where to put it. Leave the default (**New Worksheet**) for now.
4. Click OK. You land on a new sheet with an empty pivot and a **PivotTable Fields** pane on the right.

The Fields pane lists every column from your Table at the top, and four drop zones below: **Filters**, **Columns**, **Rows**, **Values**.

Drag fields between zones. Each drag rebuilds the pivot instantly.

### What goes where

- **Rows:** the dimension you want **down the left**, one group per row. E.g., Region.
- **Columns:** an optional second dimension across the top. E.g., Year. Leave empty if you only want one grouping.
- **Values:** the numeric column you're aggregating. Drop the same field in twice to see it as both Sum and Average.
- **Filters:** dimensions you want to **slice on**. Show up as drop-downs above the pivot.

Try dragging Region to Rows and Revenue to Values. You should see a tiny three-row table: each region with its total revenue.

## Changing aggregation

By default, Excel sums numeric fields and counts text fields. To change:

- **Right-click any number in the Values area → Summarize Values By → Sum / Count / Average / Max / Min / etc.**

Or:

- In the PivotTable Fields pane, click the dropdown next to the field name in the Values zone → **Value Field Settings**.

For analytics work, the four you'll switch between are **Sum**, **Average**, **Count**, and **Max**.

!!! tip "Count of what?"
    Dragging `order_id` to Values defaults to **Count of order_id** — which is "how many rows." Useful for "how many orders?" questions. Dragging a numeric column like Revenue defaults to Sum. Always glance at the header to confirm.

## Date auto-grouping

Drag a date field into **Rows**. Excel automatically groups by **Year, Quarter, and Month**. You'll see expandable triangles on each year.

If you don't want all three levels, **right-click any date → Group**, then choose only the levels you want. **Months only** is the most common choice.

If you want to group by week, you can't from the Group dialog — you need a helper column with `=TEXT([@Date], "yyyy-ww")` (Lesson 4) and drag that instead.

## Slicers — clickable filters

A slicer is a visual filter button. Much friendlier than the dropdown above a Filter field.

1. Click inside the pivot.
2. **PivotTable Analyze tab → Insert Slicer**.
3. Check the dimensions you want to slice by (e.g., Region, Customer).
4. Click OK.

Each slicer is a floating panel of buttons. Click one or more to filter. `Ctrl+click` for multi-select. The pivot — and any pivot chart pointing at it — updates instantly.

This is the trick that makes pivots feel interactive. If you've ever sent a stakeholder a workbook and asked them to "change the dropdown," send them a slicer instead.

## Pivot charts

A pivot chart is a chart that stays glued to a pivot. If the pivot is filtered, so is the chart.

1. Click inside the pivot.
2. **PivotTable Analyze → PivotChart**.
3. Pick a chart type. **Bar / column** for category comparisons, **line** for time series. Avoid pie for anything with more than three slices.

The chart drops onto the sheet. Move it. Resize it. The chart and the pivot are linked — clicking a slicer filters both.

## Calculated fields — the formula inside a pivot

Sometimes you need a derived value that isn't in your source Table. **PivotTable Analyze → Fields, Items, & Sets → Calculated Field**.

```
Name:    Profit
Formula: =Revenue - Cost
```

The calculated field becomes a draggable column in the Fields pane. It's evaluated **on the aggregated values**, which can surprise you — `=Revenue / Orders` gives `SUM(Revenue) / SUM(Orders)`, not the average of per-row ratios. For row-level math, add the column to the Table itself (Lesson 1) and pivot on that.

## `Refresh` — pivots are snapshots

A pivot does **not** update automatically when you change the underlying Table. After editing source data:

**Right-click anywhere in the pivot → Refresh.**

Or **PivotTable Analyze → Refresh**. Or `Alt+F5`.

Refresh every pivot in the workbook with **Data → Refresh All**.

!!! warning "The most common pivot bug"
    "I added 50 rows but my pivot still shows the old totals." You forgot to Refresh. Always Refresh after touching the source.

## When NOT to use a pivot

Pivots are wrong when:

- **You need to see individual rows alongside aggregates.** A pivot shows aggregates only. Use a Table with `SUMIFS` in helper columns.
- **You're computing one number for a stakeholder.** A pivot for "total revenue" is overkill — just write `=SUM(Orders[Revenue])` in a cell.
- **You need a custom row-level metric in the aggregation.** Calculated fields aggregate first; add a helper column to the Table instead (see "Calculated fields" above).
- **The data won't grow.** Pivots are most valuable when the data is alive. A static 20-row summary doesn't need one.

## Conditional formatting (used sparingly)

**Home → Conditional Formatting.** Highlight cells based on rules: top 10%, below average, between two values, etc.

**Use it for outlier-spotting on long columns**, not for decorating reports. A rainbow spreadsheet is harder to read than a plain one. One rule per column. Tasteful colours. Stop.

??? note "Try it yourself — Region pivot with slicer and chart"
    Using the `Orders` Table from Lesson 1 (or paste it fresh):

    | OrderID | Customer | Region | Revenue |
    |---|---|---|---|
    | 1 | Acme | NE | 1200 |
    | 2 | Beta | NW | 800 |
    | 3 | Acme | NE | 450 |
    | 4 | Gamma | SE | 2100 |
    | 5 | Beta | NW | 300 |
    | 6 | Acme | SE | 600 |

    Tasks:

    1. Insert a pivot table summarising **total Revenue by Region**.
    2. Add Customer as a second row dimension (Region first, Customer second). Notice the expandable triangles.
    3. Insert a pivot chart (clustered bar).
    4. Insert a slicer for Region. Click each region — confirm the chart updates.
    5. **Sanity check:** the grand total in the pivot should equal `=SUM(Orders[Revenue])` from Lesson 2 (5450). If it doesn't, the pivot is missing rows.

    ??? success "Reveal solution"
        1. Click in Table → Insert → PivotTable → New worksheet → OK. Drag Region to Rows, Revenue to Values. Excel defaults to Sum of Revenue.
        2. Drag Customer to Rows below Region. The pivot now shows Region groups with Customer subgroups.
        3. With the pivot selected: PivotTable Analyze → PivotChart → Clustered Bar → OK.
        4. PivotTable Analyze → Insert Slicer → check Region → OK. Click "NE" — the pivot and the chart both show only NE rows.
        5. Total = 5450. If you see a different number, you probably built the pivot before extending the Table to row 7, or you're missing rows entirely. Right-click the pivot → Refresh, or rebuild from the Table.

## Common pitfalls

1. **Pivot from a range, not a Table.** The pivot won't see new rows added later. Always build from a Table.
2. **Forgetting to Refresh.** Pivots are snapshots. After any source change, Refresh — every time.
3. **Date columns showing as text strings, not auto-grouped.** Means the column is text, not date. Fix with Text to Columns (Lesson 4) before building the pivot.
4. **Calculated fields aggregating in surprising ways.** `=Revenue / Orders` is `SUM(Revenue)/SUM(Orders)`, not per-row ratios averaged. For per-row math, add the column to the source Table.
5. **Slicers that don't filter the chart.** The slicer must be connected to the same pivot the chart points at. Right-click slicer → Report Connections → confirm.
6. **One pivot per question.** Resist the urge to overload a single pivot with five dimensions and three values. Multiple small pivots beat one giant one.

## How this shows up in the capstone

The capstone has two pivots, both from the `Orders` Table:

- **Pivot 1:** review_score in Rows, Count of order_id in Values → distribution of review scores.
- **Pivot 2:** review_score in Rows, Average of delivery_days in Values → does slow delivery correlate with bad reviews?

That's the entire visible Day 1 deliverable. Get fluent with Rows/Values and aggregation-switching and you're 80% done.

## What's next

You've covered the five lessons. Run the **[self-test](test.md)** to check your understanding before starting the **[Day 1 capstone](../../capstone/day1_excel/README.md)**.
