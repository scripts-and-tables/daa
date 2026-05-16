# Capstone — Day 1 (Excel)

**Time:** ~1 hour
**Goal:** load the Olist data into Excel, clean it just enough to be usable, and produce your first cut at the capstone question using pivot tables.

## The business question (reminder)

> *"Which sellers and product categories are driving low customer satisfaction, and what's the financial impact?"*

Today you'll start scoping this with Excel. You won't fully answer it — that takes 5 days. You'll set the foundation.

## Step-by-step

### 1. Load the data (15 min)

Open Excel. Use **Data → Get Data → From Text/CSV** (not double-click — that mangles dates) to import these two files from `data/olist/`:

- `olist_orders_dataset.csv` → name the sheet `Orders`
- `olist_order_reviews_dataset.csv` → name the sheet `Reviews`

In the import dialog, check that date columns are detected as dates. If not, change the type to Date in the preview pane before clicking Load.

Convert each sheet to a Table (`Ctrl+T`). Name them `Orders` and `Reviews`.

### 2. Derive a useful column (10 min)

In the `Orders` table, add a column `delivery_days`:

```
=IFERROR([@order_delivered_customer_date] - [@order_purchased_timestamp], "")
```

This gives the number of days between purchase and delivery. `IFERROR` handles orders that haven't been delivered yet (some cells are blank).

### 3. Join orders to reviews with XLOOKUP (15 min)

Each order has 0 or 1 reviews. In the `Orders` table, add a column `review_score`:

```
=XLOOKUP([@order_id], Reviews[order_id], Reviews[review_score], "")
```

Now every order row has its review score (or blank if no review).

### 4. First pivot — review score distribution (10 min)

Build a pivot table:
- **Rows:** `review_score`
- **Values:** Count of `order_id`

You should see something like: most orders are 5-star, a long tail of 1-star, fewer in the middle. **Write down the % of orders that are 1 or 2 stars** — this is the population you're investigating.

### 5. Second pivot — delivery time vs review score (10 min)

Build another pivot table:
- **Rows:** `review_score`
- **Values:** Average of `delivery_days`

Eyeball the result. Is there a relationship between slow delivery and bad reviews? **Note your hypothesis in a sticky note on the sheet** — you'll come back to this on Day 3.

## Deliverable

Save your workbook as `exploration.xlsx` in this folder:

```
capstone/day1_excel/exploration.xlsx
```

It should contain:
- `Orders` table with `delivery_days` and `review_score` columns
- `Reviews` table
- At least the two pivot tables above
- A sticky note (or cell comment) with your delivery-time hypothesis

## What good looks like

A good Day 1 deliverable answers:
- *Roughly how many orders are unhappy (1–2 stars)?* — a number
- *Does delivery time look like it correlates with review score?* — a yes/no with rough magnitude

You don't need fancy charts today. Don't waste time on formatting — that's what Day 4 (Power BI) is for.

## Going home reading

If you finish early, skim the [Olist Kaggle page](https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce) — particularly the schema diagram. Tomorrow (SQL) you'll join 4–5 tables, and the diagram makes it click.
