# Lesson 3 — Building visuals

**Time:** ~30 min.
**You'll be able to:**

- Choose the right visual for the question: card, bar, line, map, table, slicer
- Drop fields onto a visual and pick the aggregation you actually mean
- Apply a "Top N" filter to a visual
- Sort a visual by any field
- Use cross-filtering (free) instead of building twelve separate dashboards

This is where Power BI starts feeling like the productivity multiplier it is. Most of what you'll do for the capstone is in this lesson.

## The six visuals you'll use today

| Visual | When to use it | Example |
|---|---|---|
| **Card** | Single big number (a KPI) | "Total Revenue: R$ 13.6M" |
| **Bar / column** | Compare a number across categories | Revenue by product category |
| **Line** | A number changing over time | Orders per month |
| **Filled map** | Geographic distribution | Orders by Brazilian state |
| **Table / matrix** | Detail rows + totals; matrix = table with row + column groups | Bottom-10 sellers list |
| **Slicer** | Let the user filter the page | State, date range, category |

You'll also see Donut, Tree map, Funnel, Scatter, KPI, Gauge. They have niche uses — start with the six above; everything else is icing.

??? tip "Visualisation principles — which chart, when (a 90-second primer)"
    The Power BI visual gallery doesn't tell you which chart to pick. Use these heuristics:

    | Question shape | Chart |
    |---|---|
    | "What's the headline number?" | **Card** |
    | "How does X compare across categories?" (≤12 categories) | **Bar / column**, sorted by value |
    | "How does X change over time?" (continuous time axis) | **Line** |
    | "Where is X happening geographically?" | **Filled map** (only when the spatial dimension matters — don't map data that fits in a table) |
    | "Show me the detail" | **Table** with sortable columns |
    | "Let me slice the page" | **Slicer** |

    Five rules that compound:

    1. **One question per visual.** If you can't say what question a chart answers in one sentence, the chart is the wrong shape.
    2. **Sort bars by value, not alphabetically.** Alphabetical bar charts hide the finding.
    3. **One color carries the message; the rest is grey.** A seven-color rainbow says "I want all of these to feel equally important" — almost never the truth.
    4. **Don't truncate the Y-axis on a bar chart.** It exaggerates differences. Truncating on a line chart is fine because the eye reads slope, not bar length.
    5. **A pie chart is almost always a bar chart in disguise.** Use the bar.

    Further reading: *Storytelling with Data* by Cole Nussbaumer Knaflic — the single best book on this for analysts. The Financial Times publishes a free [Visual Vocabulary](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary) one-pager that maps "this question → this chart" — print it, pin it next to your monitor.

## Adding a visual

Three equivalent paths:

1. Click an empty area on the canvas, then click a visual icon in the **Visualizations pane** (right side).
2. Drag a field from the **Fields pane** onto a blank canvas — Power BI guesses a visual type.
3. Right-click a visual → **Change visualization type** to convert.

Once a visual is on the canvas, its **Fields wells** appear in the Visualizations pane: X-axis, Y-axis, Legend, Values, etc. Drop fields into the correct well.

## Picking the aggregation

When you drop a numeric field into Values, Power BI defaults to **Sum**. This is right roughly half the time and silently wrong the other half.

**Always check the aggregation.** Click the field in the Values well → a dropdown lists Sum, Average, Min, Max, Count, Count (Distinct), etc.

Examples:

| Field | Right aggregation |
|---|---|
| `price` (revenue per line item) | Sum |
| `review_score` | Average — summing star ratings is meaningless |
| `delivery_days` | Average (or Median) |
| `order_id` (when you want "how many orders") | **Count (Distinct)** |

The "sum of review scores" mistake is the most common one. Bar chart of `Avg Review by Category` with Sum aggregation gives a chart proportional to *how many* reviews each category got. Looks reasonable. Is wrong.

## Visual filters: "Top N"

Often you want "bar chart of top 10 categories by revenue," not "all 70 categories crammed together."

In the **Filters pane** (right side, between Fields and Visualizations):

1. Find **Filters on this visual** for your bar chart.
2. Drag the category column into the filter well.
3. **Filter type:** Top N.
4. Show: **Top 10** by **Sum of price** (or your revenue measure).
5. Apply filter.

Now the visual shows only the top 10. Add a "By value" filter (`Sum of price > 1000`) for an alternative.

There are three filter scopes in Power BI:

- **Filters on this visual** — only this visual
- **Filters on this page** — every visual on this page (slicers are a visible version of this)
- **Filters on all pages** — global

Almost everything you do is "this visual" or "this page" via slicers.

## Sorting a visual

Click the three-dot menu on the visual (top-right) → **Sort by** → pick a field, ascending or descending.

For a bar chart, the most common sort is "by the value, descending." Categories on the Y-axis, longest bar at the top.

## Cross-filtering — the superpower

Click a bar in one visual. Every other visual on the page filters to that selection.

This is the entire reason Power BI exists. Don't build a separate dashboard for "São Paulo only" and "Rio only" — build one dashboard and let the user click the bar/state/category they care about.

By default, **clicking filters; ctrl-click adds to selection; click empty space resets**.

To change how visuals interact (e.g., "this slicer shouldn't affect that card"):

```
Format → Edit interactions
```

Each visual gets little filter/cross-filter/none toggles on every other visual. Useful for fine control on a polished dashboard.

## Formatting in 60 seconds

Click a visual → **Format your visual** tab (paint roller icon) in the Visualizations pane.

Three things worth setting:

1. **Title** — every visual should have one. Default titles like "Sum of price by product_category_name_english" are ugly. Set a clean title.
2. **Data labels** — for bar charts especially, turn them on so users don't squint at the axis.
3. **Tooltips** — additional fields shown on hover. Drag fields into the Tooltips well to enrich without cluttering the visual.

Don't go further today. Theme polish is a Day 5 conversation; today's goal is "the numbers are right and the layout is readable."

## Layout discipline: 4–6 visuals, one page

The single biggest difference between a good dashboard and a bad one isn't fanciness — it's restraint. A page with 12 visuals is unreadable. A page with 4–6 well-chosen visuals tells a story.

For the capstone:

1. **3 KPI cards** at the top (Revenue, Avg Review, % Late)
2. **Bar chart** of revenue by category (top 10)
3. **Map** of orders by state
4. **Table** of bottom-10 sellers

Six visuals. Every one answers a part of the business question. No "interesting trivia" visuals.

??? note "Try it yourself — three visuals + a slicer"
    Continuing from Lesson 2's model:

    1. **Card** — Total Revenue. Drag `Items[price]` into a Card. Default aggregation is Sum — perfect.
    2. **Bar chart** — average review score by `Orders[order_status]`. Drag `order_status` to Y-axis. Drag `Reviews[review_score]` to X-axis, **change aggregation to Average**.
    3. **Line chart** — orders over time. Drag `Orders[order_purchase_timestamp]` to X-axis (Power BI will offer the date hierarchy — pick **Month**). Drag `Orders[order_id]` to Y-axis, change aggregation to **Count (Distinct)**.
    4. **Slicer** — by `Customers[customer_state]`. Insert a Slicer visual, drag the state field in.
    5. Click "SP" in the slicer. All three visuals should filter to São Paulo orders.

    ??? success "Sanity check"
        - Revenue card drops to ~40% of the total
        - Line chart still shows two years but with smaller numbers per month
        - Bar chart shape stays similar (the late/cancelled/delivered distribution doesn't change much by state)

        If the Revenue card doesn't move when you click the slicer, your `Orders → Customers` relationship is wrong — go back to Model view (Lesson 2).

## Common pitfalls

1. **Leaving aggregation at Sum.** Sum of star ratings is meaningless. Sum of order IDs is double-meaningless. Check every value field.
2. **Counting on the wrong column.** `Count of order_id` in the `Items` table counts line items, not orders. Use the `Orders` table or `Count (Distinct)`.
3. **No titles.** Default titles are ugly. Spend 5 seconds per visual.
4. **Twelve visuals on one page.** Cut. If you can't explain why a visual is there in one sentence, delete it.
5. **Slicers everywhere.** One slicer can filter every visual. You don't need a separate slicer per chart.

## How this shows up in the capstone

Six visuals + three slicers, on one page. Everything you build today.

## What's next

Continue to **[Lesson 4 — DAX measures](04_dax_measures.md)**, where you'll write the formulas that power the cards.
