# Day 4 — Power BI

**Duration:** 4 hours
**Prerequisites:** Days 1–3
**Learning goals:** by end of day you can import data into Power BI, set up relationships across tables, write the 4 most useful DAX measures, and build a 1-page interactive dashboard that a non-analyst can use without you in the room.

## Why Power BI after pandas?

Pandas + matplotlib can make any chart, but the audience for charts isn't analysts — it's executives, marketers, ops teams. Power BI's job is to wrap your analysis in something they'll actually click through. A good dashboard answers tomorrow's question, not just today's.

## Tooling

- **Power BI Desktop** — free, Windows only. Download: [powerbi.microsoft.com/desktop](https://powerbi.microsoft.com/desktop/).
- **Mac users:** use a Windows VM, RDP into a Windows machine, or use the Power BI **Service** (browser) — Service has fewer features but works.
- File extension: `.pbix` (one file = data model + visuals + measures).

## Agenda

| Time | Block | Topic |
|---|---|---|
| 00:00–00:50 | Hour 1 — Get Data + the data model | Import CSVs, set relationships, Model view |
| 00:50–01:00 | Break | |
| 01:00–01:50 | Hour 2 — Power Query basics + first visuals | Rename, type-change, derive columns; card/bar/line |
| 01:50–02:00 | Break | |
| 02:00–02:50 | Hour 3 — DAX measures + interactivity | `SUM`, `AVERAGE`, `CALCULATE`, `DIVIDE`; slicers; cross-filtering |
| 02:50–03:00 | Break | |
| 03:00–04:00 | Hour 4 — Capstone | Build the Seller & Satisfaction Dashboard |

## Key concepts

### 1. The 3 panes you'll live in

| Pane | What it does |
|---|---|
| **Report** | Drag-and-drop dashboard canvas. Where you build visuals. |
| **Model** | Tables + relationships. Where you tell Power BI how tables connect. |
| **Power Query** | Transformations applied at load time (rename columns, change types, derive fields). |

### 2. The data model

This is the part most beginners skip and regret. **Get the model right first** or every visual will be subtly wrong.

For Olist, the relationships you'll create:

```
customers (customer_id)  ──→ orders (customer_id)
orders (order_id)        ──→ items (order_id)
                         ──→ reviews (order_id)
                         ──→ payments (order_id)
items (seller_id)        ──→ sellers (seller_id)
items (product_id)       ──→ products (product_id)
products (category)      ──→ category_translation (Portuguese name)
```

Power BI usually auto-detects these. **Verify each one in Model view.** Wrong cardinality (e.g., many-to-many where it should be one-to-many) leads to inflated numbers in every visual.

### 3. Power Query (just enough)

Before data hits the report, Power Query lets you clean it:

- **Rename columns** — `order_delivered_customer_date` → `Delivered Date` is friendlier in visuals
- **Change types** — confirm dates are dates, numbers are numbers
- **Derive columns** — `delivery_days = Delivered Date - Purchase Date`
- **Filter rows** — drop test orders, drop nulls

Apply transformations once in Power Query; they re-run every refresh. **Don't do these in DAX if Power Query can do them** — Power Query is faster and the result is the same to downstream visuals.

### 4. DAX — the 4 measures worth knowing

DAX is Power BI's formula language. You'll be tempted to learn 50 functions; resist. Master these 4 first.

```dax
Total Revenue = SUM(items[price])

Avg Review Score = AVERAGE(reviews[review_score])

Late Deliveries =
    CALCULATE(
        COUNTROWS(orders),
        orders[order_delivered_customer_date] > orders[order_estimated_delivery_date]
    )

% Late = DIVIDE([Late Deliveries], COUNTROWS(orders), 0)
```

- **`SUM`/`AVERAGE`**: aggregate one column
- **`CALCULATE`**: change the filter context. The most important DAX function. `CALCULATE(expr, filter1, filter2, ...)` says "compute `expr`, but with these additional filters applied."
- **`DIVIDE`**: safe division. Use this instead of `/` — it returns blank instead of erroring on divide-by-zero.

### 5. Visuals + interactivity

Core visuals you'll use today:

- **Card** — single big number (KPI). E.g., "Total Revenue: R$ 13.6M"
- **Bar / column** — categorical breakdowns
- **Line** — trends over time
- **Map** — filled map by Brazilian state (visual ID: "Filled Map")
- **Table / matrix** — like a pivot table
- **Slicer** — let the user filter (e.g., by date range or category)

**Cross-filtering is free.** Click a bar in one visual → all other visuals on the page filter to that selection. This is Power BI's superpower vs a static PNG.

## Exercises

See [`exercises/`](exercises/README.md) — 3 drills that build skills you'll need for the capstone. Solutions in [`solutions/`](solutions/README.md).

## Capstone task for today

See [`../../capstone/day4_powerbi/README.md`](../../capstone/day4_powerbi/README.md).

## Common pitfalls

- **Wrong relationship cardinality.** Many-to-many "works" but inflates aggregates. Confirm one-to-many in Model view (the line should be `1 ─ *`).
- **DAX in Power Query, Power Query in DAX.** Each tool has its job. Derived columns at load time → Power Query. Aggregates the user filters dynamically → DAX measures.
- **Putting columns where measures belong.** Drag a measure (Σ icon) into Values, not a column. Columns become "Count of column" by default — usually not what you want.
- **Visual clutter.** A good 1-page dashboard has 4–6 visuals. Not 12. Cut anything that doesn't directly answer the business question.
- **Forgetting Brazilian Portuguese.** Olist's product category column is Portuguese — use the translation table.
