# Capstone — Day 2 (SQL)

**Time:** ~1 hour
**Goal:** use SQL to answer scoped sub-questions of the capstone, joining 4+ tables. Output a CSV that Day 3 (Python) will pick up.

## The business question (reminder)

> *"Which sellers and product categories are driving low customer satisfaction, and what's the financial impact?"*

Today you'll produce two pieces of evidence with SQL.

## Task

### Sub-question A — Worst-performing categories

Write a query that returns, for each `product_category_name_english`:
- Number of orders containing items in that category
- Total revenue from that category
- Average review score for orders containing that category
- % of reviews that are 1 or 2 stars

Filter to categories with at least 100 orders (small categories have noisy averages).

Order by % of 1–2 star reviews descending.

**Save to** `capstone/day2_sql/worst_categories.csv`.

### Sub-question B — Sellers most at risk

Same shape but per `seller_id`:
- Number of orders the seller is in
- Total revenue
- Average review score
- % of 1–2 star reviews

Filter to sellers with at least 50 orders.

Order by revenue × (1 − avg_review_score / 5) descending. *(This is a rough "financial impact of bad reviews" proxy: revenue weighted by how unhappy customers are.)*

**Save to** `capstone/day2_sql/risky_sellers.csv`.

## Hints

- The category name is in `olist_products_dataset.csv` (Portuguese) → translate via `product_category_name_translation.csv`. You'll need both files joined to `items`.
- An order can contain multiple items in different categories. For Sub-question A, **count an order once per distinct category in it**.
- One order has one review. To aggregate review score by seller, join `items → reviews` on `order_id`, then `GROUP BY seller_id`. An order with two sellers contributes its review score to both — that's fine for this exercise.

## How to export the result to a CSV in DuckDB

```sql
COPY (
    -- your query here
) TO 'capstone/day2_sql/worst_categories.csv' (HEADER, DELIMITER ',');
```

## Deliverable

```
capstone/day2_sql/
├── queries.sql            # both queries with comments
├── worst_categories.csv   # output of Sub-question A
└── risky_sellers.csv      # output of Sub-question B
```

## What good looks like

- `queries.sql` reads top-to-bottom like a recipe — uses CTEs, has comments explaining each step
- Row counts in the CSVs look plausible (single-digit categories at the top of the "worst" list, not hundreds — you filtered correctly)
- The top-of-list categories/sellers feel intuitively plausible. If "books" is your worst category, that's surprising — investigate before trusting it.

## Reconcile with Day 1

The % of 1–2 star orders you computed in Excel yesterday across **all orders** should be in the same ballpark as the average of the per-category percentages you produce today. They won't match exactly (different denominators), but if Day 1 said "10% bad reviews" and today says "50% bad reviews in every category", something's wrong.
