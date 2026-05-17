# Day 4 — Self-test

Twelve questions. Mix of conceptual ("which tool?"), decision ("measure or column?"), and DAX. Write your answer before clicking to reveal.

Quick re-read links: [Lesson 1](01_get_data_power_query.md) · [Lesson 2](02_data_model.md) · [Lesson 3](03_visuals.md) · [Lesson 4](04_dax_measures.md) · [Lesson 5](05_interactivity_and_polish.md).

---

??? question "1. After 'Get Data' on a CSV, why click 'Transform Data' rather than 'Load'?"
    **Answer:** "Load" dumps the CSV into the data model with whatever column types Power BI guessed. "Transform Data" opens Power Query so you can fix types, rename columns, filter rows, and add derived columns *before* the data hits the model. Fixing it later is more friction; fixing it now costs 30 seconds.

??? question "2. You need a `delivery_days` column on `Orders`. Power Query or DAX?"
    **Answer:** Power Query. `delivery_days` is a fixed property of each order — it doesn't depend on the user's filters. Compute it once at refresh time. (DAX calculated columns are the second-best option; DAX measures don't fit at all because the value isn't an aggregate.)

??? question "3. In Model view, you see `*─*` between two tables. What's wrong, and how do you fix it?"
    **Answer:** Many-to-many cardinality. Almost always means the join column isn't unique on either side — usually because you joined on the wrong column. Double-click the relationship line → check the join columns. The "one" side needs unique values; the "many" side can repeat.

??? question "4. You drag `review_score` into a bar chart's Values well. The chart looks plausible. What's the trap?"
    **Answer:** Default aggregation is **Sum**. Sum of star ratings is meaningless — a category with 1000 reviews each scoring 3 looks "better" than one with 50 reviews scoring 5. Always check the aggregation; for star ratings, set it to **Average**.

??? question "5. Spot the bug: your dashboard's `Count of order_id` card on the `Items` table shows 112,650 but Day 2's SQL `SELECT COUNT(*) FROM orders` returned 99,441."
    **Answer:** `Items` has multiple rows per order (one per line item). `COUNT(order_id)` in the `Items` table counts line items, not orders. Fix: use `Count (Distinct)` of `Items[order_id]` — or, better, count `Orders[order_id]` directly.

??? question "6. Write a DAX measure: percentage of orders that were delivered late."
    **Answer:**
    ```dax
    % Late =
        DIVIDE(
            CALCULATE(DISTINCTCOUNT(Orders[order_id]), Orders[is_late] = TRUE),
            DISTINCTCOUNT(Orders[order_id]),
            0
        )
    ```
    Or, with a `Late Orders` and `N Orders` measure already defined:
    ```dax
    % Late = DIVIDE([Late Orders], [N Orders], 0)
    ```
    Use `DIVIDE` not `/` — safe on divide-by-zero.

??? question "7. What is `CALCULATE` and why is it the most important DAX function?"
    **Answer:** `CALCULATE(expression, filter1, filter2, …)` evaluates `expression` with an **additional filter context**. It's the only way (apart from visuals themselves) to modify which rows a measure considers. Without `CALCULATE`, every measure is at the mercy of the page's filter context. With it, you can write "revenue from delivered orders only," "% bad reviews this quarter," etc.

??? question "8. A user clicks a bar in your category bar chart. The headline 'Total Revenue' card changes to show that category's revenue. They want the card to stay constant (overall revenue) regardless of bar clicks. How?"
    **Answer:** Edit interactions. Select the bar chart, go to Format → Edit interactions, find the Total Revenue card, click the **None** icon. Now clicking the bar chart no longer filters the card.

??? question "9. Spot the bug: a measure `Late Pct = [Late Orders] / [N Orders]` works most of the time but shows red error text on some visuals."
    **Answer:** Divide by zero when the filter context narrows `N Orders` to 0 (e.g., the user picks a state with no orders). Replace `/` with `DIVIDE`:
    ```dax
    Late Pct = DIVIDE([Late Orders], [N Orders], 0)
    ```

??? question "10. Implicit measure vs explicit measure — what's the difference and which should you prefer?"
    **Answer:**

    - **Implicit** — what Power BI does when you drag a numeric field into a Values well. It auto-aggregates (Sum by default). Anonymous and can't be reused.
    - **Explicit** — a named measure created via "New measure." Visible in the Fields pane, reusable, composable.

    **Always create explicit measures** for anything you'll use twice. Implicit is fine for one-off exploration.

??? question "11. What does it mean that 'measures recompute per visual cell in their filter context'?"
    **Answer:** A measure isn't a fixed number — it's a formula that evaluates for each cell of a visual, using whatever filters apply to that cell. A bar chart row's filter context includes the category for that row. A KPI card's filter context might just be the page-level slicers. So the same measure produces different numbers in different visuals — *because the inputs are different*. This is by design; understanding it removes 90% of "why is this number wrong" confusion.

??? question "12. Layout discipline: how many visuals should a single-page dashboard have, and why?"
    **Answer:** **4–6.** More than that and the user can't scan it in 10 seconds; less and you're missing the supporting evidence for your headline numbers. The capstone uses six: 3 KPI cards (the headline), 2 charts (the evidence), 1 detail table (the drill-down). Anything you can't justify in one sentence, delete.

---

**Got 9+ right?** **[Build the dashboard →](../../capstone/day4_powerbi/README.md)**

**Got fewer?** Re-read the relevant lesson. The capstone is mostly applying these patterns — getting them right here saves rebuilds there.
