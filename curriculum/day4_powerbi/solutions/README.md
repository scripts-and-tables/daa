# Day 4 — Solutions

Power BI doesn't have "code" the way SQL/Python do — solutions are about **decisions** (relationships, aggregations, layout). Compare yours against these.

---

## Exercise 1 — Get Data and build the model

Expected model after Close & Apply:

```
customers ─1───*─ orders ─1───*─ items
                       │
                       └─1───*─ reviews
```

**Things to check:**
- Each line shows `1` on one end, `*` on the other. No `*─*` lines.
- Arrow direction: from the "many" side to the "one" side (the direction filters flow).
- No duplicate relationships — only one line between each pair of tables.

**Common mistake:** Power BI sometimes auto-detects a relationship through the wrong column (e.g., `customer_unique_id` instead of `customer_id`). Always verify the join column in the relationship dialog.

---

## Exercise 2 — Power Query: derive `delivery_days`

Reference formula:

```
Duration.Days([order_delivered_customer_date] - [order_purchase_timestamp])
```

Expected card after switching aggregation to Average: **~12** (days).

**Why Power Query, not DAX?** This is a static transformation that doesn't change based on user filters. Derive it at load time so every measure that uses it is faster.

**Why `Duration.Days(...)` not just subtraction?** Subtracting two datetimes gives a Duration type. `Duration.Days` extracts the integer day count.

---

## Exercise 3 — Three visuals + a slicer

Layout suggestion (top-left to bottom-right):

```
┌──────────────┬─────────────────────────────────────┐
│ Card: Total  │   Slicer: customer_state            │
│ Revenue      │                                     │
├──────────────┴─────────────────────────────────────┤
│   Line chart: orders per month                     │
│                                                    │
├────────────────────────────────────────────────────┤
│   Bar chart: avg review score by order status      │
│                                                    │
└────────────────────────────────────────────────────┘
```

**Aggregations to set:**
- Card: `items[price]` → Sum
- Bar: `reviews[review_score]` → Average (NOT Sum — that's a meaningless number)
- Line: `orders[order_id]` → Count

**Cross-filter check:** clicking "SP" in the slicer should:
- Drop the Revenue card to ~40% (SP is ~40% of the dataset)
- Filter the line chart and bar chart accordingly

If the card doesn't change, your relationship between `orders` and `customers` is broken — go back to Model view and fix it.

---

## Decision: derived column vs measure?

A useful framing for the rest of today (and forever in Power BI):

| Need | Use |
|---|---|
| Value that's a fixed property of a row, doesn't depend on filters | **Power Query column** (computed at load) or **calculated column** (in DAX, less common) |
| Value that should re-compute based on what the user filters | **Measure** (always wrapped in `CALCULATE`, `SUM`, etc.) |

`delivery_days` per order = column. `% Late` across the user's current filter = measure.
