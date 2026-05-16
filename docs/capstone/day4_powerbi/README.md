# Capstone — Day 4 (Power BI)

**Time:** ~1 hour
**Goal:** package the capstone findings into a single-page interactive dashboard that the head of marketplace operations can use without you in the room.

## The business question (reminder)

> *"Which sellers and product categories are driving low customer satisfaction, and what's the financial impact?"*

## Required dashboard layout

Build a **single page** (no tabs, no extra pages — discipline) with these visuals:

```
┌─────────────────────────────────────────────────────────────┐
│  Title: Seller & Satisfaction Dashboard                     │
├──────────┬──────────┬──────────┬─────────────────────────────┤
│ Revenue  │ Avg      │ % Late   │       Slicers:              │
│ R$ XX.XM │ Review   │ Delivery │   - State, Category, Date   │
│          │ X.X      │ X%       │                             │
├──────────┴──────────┴──────────┴─────────────────────────────┤
│                                          │                  │
│  Bar: Revenue by category (top 10)       │  Filled map:     │
│                                          │  orders by state │
│                                          │                  │
├──────────────────────────────────────────┴──────────────────┤
│  Table: Bottom-10 sellers by avg review score (with         │
│  revenue, n_orders, % late delivery shown)                  │
└─────────────────────────────────────────────────────────────┘
```

## Step-by-step

### 1. Set up the data model (15 min)

Get Data for all 7 Olist tables (orders, items, reviews, customers, sellers, products, category translation).

In Model view, ensure:
- `orders` connects to `customers`, `items`, `reviews`, `payments`
- `items` connects to `sellers`, `products`
- `products` connects to `category_translation` (via `product_category_name`)

Tip: rename the tables in the Fields pane to friendlier names (`Orders`, `Items`, `Reviews`, …). It'll show up everywhere in your visuals.

### 2. Power Query transforms (10 min)

In Power Query:
- On `Orders`: add `delivery_days` (see Lesson 1's "Try it yourself" — Power Query custom column)
- On `Orders`: add `is_late` = `[order_delivered_customer_date] > [order_estimated_delivery_date]` (Boolean column)
- On `Products`: merge in the English category name from `category_translation`

### 3. DAX measures (10 min)

Create these measures (Right-click a table → New Measure):

```dax
Total Revenue   = SUM(Items[price])
Avg Review      = AVERAGE(Reviews[review_score])
N Orders        = DISTINCTCOUNT(Orders[order_id])
Late Orders     = CALCULATE([N Orders], Orders[is_late] = TRUE)
% Late          = DIVIDE([Late Orders], [N Orders], 0)
% Bad Reviews   = DIVIDE(
                    CALCULATE([N Orders], Reviews[review_score] <= 2),
                    [N Orders],
                    0
                  )
```

Format `% Late` and `% Bad Reviews` as Percentage in the Measure tools menu.

### 4. Build the visuals (20 min)

- **3 cards** (top row): `Total Revenue`, `Avg Review`, `% Late`. Big and readable.
- **Bar chart**: Revenue by `product_category_name_english`. Sort descending. Show top 10 only (Visual filter → Top N → 10 by Revenue).
- **Filled map**: drag `customers[customer_state]` to Location. Power BI may need a state-name-to-code hint — if so, use the visual's Drill-Through "Map level" set to State.
- **Table**: bottom-10 sellers by `Avg Review`. Columns: `seller_id`, `N Orders`, `Total Revenue`, `Avg Review`, `% Late`. Sort by `Avg Review` ascending. Filter to sellers with `N Orders >= 50`.

### 5. Slicers (5 min)

Add three slicers at the top right:
- `customers[customer_state]` (multi-select)
- `products[product_category_name_english]` (multi-select)
- `orders[order_purchase_timestamp]` (between slicer, set to 2017–2018)

### 6. Export (5 min)

Save as `dashboard.pbix` in this folder. Then File → Export → Export to PDF (or use the screenshot tool) — save as `dashboard.png` for embedding in the Day 5 report.

## Deliverable

```
capstone/day4_powerbi/
├── dashboard.pbix   # the file
└── dashboard.png    # screenshot for Day 5
```

## What good looks like

- Clicking a bar (e.g., the `furniture` category) filters every other visual on the page
- The bottom-10 sellers table makes you go "huh, interesting" — these are concrete sellers the business should look at
- Numbers reconcile with Day 2 (SQL) and Day 3 (Python) when no slicers are applied

## Reconcile

Open the SQL output `capstone/day2_sql/risky_sellers.csv` next to your dashboard. With no slicers selected, the top 5 sellers in your `Bottom-10 by Avg Review` table should overlap heavily with the top 5 in the SQL output. If they don't, one of them is wrong — investigate.

## Going home reading

If you have time, glance at [Microsoft's DAX reference](https://learn.microsoft.com/en-us/dax/dax-function-reference) for `CALCULATE`. Tomorrow Claude Code will help you write more DAX — knowing what `CALCULATE` does will make you a better AI orchestrator.
