# Capstone — Day 3 (Python)

**Time:** ~1 hour
**Goal:** reproduce yesterday's SQL findings in pandas, then extend them with one analysis that SQL alone couldn't do as cleanly.

## The business question (reminder)

> *"Which sellers and product categories are driving low customer satisfaction, and what's the financial impact?"*

## Task

### Part A — Reproduce Day 2 in pandas (30 min)

Open a new notebook `analysis.ipynb` in this folder. Re-create yesterday's two output tables:

1. **`worst_categories`** — same columns as yesterday's CSV: category, n_orders, revenue, avg_review_score, pct_bad_reviews
2. **`risky_sellers`** — same as yesterday: seller_id, n_orders, revenue, avg_review_score, pct_bad_reviews

**Critical: reconcile with yesterday.** Load yesterday's CSV and pandas result side by side. The numbers should match exactly. If they don't, find out why before moving on — that's the most important debugging exercise of the week.

```python
yesterday = pd.read_csv('../day2_sql/worst_categories.csv')
today = your_pandas_result
comparison = yesterday.merge(today, on='product_category_name_english', suffixes=('_sql', '_pandas'))
# Look for rows where the values disagree
```

### Part B — Extend with a delivery analysis (30 min)

Add a new analysis: **how much of the "bad review" problem is explained by late delivery vs the seller/category itself?**

Steps:

1. Compute `delivery_days` and `is_late` (= delivered after estimated date) on the merged orders+reviews DataFrame.
2. Split orders into two groups: late and on-time.
3. For each of your top 10 risky sellers, compute their average review score **separately for late vs on-time deliveries**.

```
seller_id | n_late | avg_review_late | n_on_time | avg_review_on_time
```

4. Look at the result. For some sellers, ALL their bad reviews come from late deliveries — they ship great products, just slowly. For others, even on-time orders get bad reviews — that's a product/seller-quality problem, not a logistics one.

**This is the key insight of the capstone.** It distinguishes "fix the warehouse" from "drop the seller" — two very different business actions.

### Part C — Save outputs (5 min)

Save these from your notebook to this folder:

```python
worst_categories.to_csv('worst_categories.csv', index=False)
risky_sellers.to_csv('risky_sellers.csv', index=False)
late_vs_ontime_by_seller.to_csv('late_vs_ontime_by_seller.csv', index=False)
```

Also save the delivery-bucket chart from yesterday's Exercise 4.3 as a PNG — you'll embed it in the Day 5 final report.

```python
import matplotlib.pyplot as plt
ax = score_by_bucket.plot(kind='bar')
ax.set_ylabel('Avg review score')
ax.set_title('Review score vs delivery time bucket')
plt.tight_layout()
plt.savefig('delivery_vs_review.png', dpi=150)
```

## Deliverable

```
capstone/day3_python/
├── analysis.ipynb                       # the notebook with everything
├── worst_categories.csv
├── risky_sellers.csv
├── late_vs_ontime_by_seller.csv         # the new finding
└── delivery_vs_review.png               # chart for Day 5
```

## What good looks like

- Numbers in your CSVs match yesterday's SQL exactly (rounding aside)
- The `late_vs_ontime_by_seller` table clearly distinguishes "logistics-bad" sellers from "intrinsically-bad" sellers
- The notebook is readable top-to-bottom — markdown cells explain *why*, not just *what*. Imagine your future self opening this in 6 months.
- You used `merge` with row-count assertions

## Going home reading

If you finish early, look at the Olist Power BI sample dashboards online. Tomorrow you'll build one — having seen 2–3 examples helps you plan layout.
