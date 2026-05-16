# Day 4 — Exercises

All exercises happen inside Power BI Desktop. We don't ship `.pbix` exercise files — instead each exercise is "starting from a blank report, do these steps."

If you've never opened Power BI before: launch it, dismiss the start screen, and you're in. The big empty canvas is the Report view.

---

## Exercise 1 — Get Data and build the model

**Goal:** load 4 Olist CSVs and set up correct relationships.

1. **Home → Get Data → Text/CSV** for each of:
   - `olist_orders_dataset.csv`
   - `olist_order_items_dataset.csv`
   - `olist_order_reviews_dataset.csv`
   - `olist_customers_dataset.csv`
   For each, click **Transform Data** (not Load) — confirm the column types look right in the preview, then **Close & Apply**.

2. Switch to **Model view** (left sidebar, third icon). You should see four tables. Power BI may have auto-detected some relationships.

3. Verify or create these relationships (drag from key to key):
   - `orders[customer_id]` → `customers[customer_id]` (many-to-one)
   - `items[order_id]` → `orders[order_id]` (many-to-one)
   - `reviews[order_id]` → `orders[order_id]` (many-to-one)

4. **Verify cardinality:** each relationship line should show `*` on the "items/reviews" side and `1` on the "orders/customers" side. If it shows `*─*`, click the relationship → "Edit relationship" → set cardinality correctly.

---

## Exercise 2 — Power Query: derive `delivery_days`

**Goal:** add a calculated column at load time.

1. **Home → Transform Data** to open Power Query.
2. Click the `olist_orders` table.
3. **Add Column → Custom Column.** Name it `delivery_days`. Formula:
   ```
   Duration.Days([order_delivered_customer_date] - [order_purchase_timestamp])
   ```
4. Set the new column's type to **Whole Number**.
5. **Close & Apply.**
6. Back in Report view, drag `delivery_days` into a Card visual. The default aggregation is "Sum" — change it to **Average** (right-click in the Values pane → Average).

You should see ~12 days average.

---

## Exercise 3 — Three visuals + a slicer

**Goal:** build a small dashboard with cross-filtering.

1. **Card** showing total revenue. Drag `items[price]` into a Card. Default aggregation is Sum — perfect.

2. **Bar chart**: average review score by `order_status`.
   - Drag `orders[order_status]` to Y-axis.
   - Drag `reviews[review_score]` to X-axis, change aggregation to Average.

3. **Line chart**: orders over time.
   - Drag `orders[order_purchase_timestamp]` to X-axis. Power BI will offer Year/Quarter/Month/Day — pick **Month**.
   - Drag `orders[order_id]` to Y-axis, change to Count.

4. **Slicer**: by `customer_state`.
   - Insert → Slicer.
   - Drag `customers[customer_state]` into the Field.

5. Click "SP" in the slicer. All 3 visuals should filter to São Paulo orders. Click again to deselect.

---

When you finish, compare layout choices with [`../solutions/README.md`](../solutions/README.md). Then move to the capstone — you'll build the real thing.
