---
title: Week 11 — Joins
tags:
  - level::beginner
  - tool::sql
  - type::hands-on
time_estimate: 6h
status: complete
---

# Week 11 — Joins

> The week that earns SQL its reputation. Joins are conceptually simple — *combine rows from two tables on a matching key* — and operationally easy to get subtly wrong. Most "the dashboard numbers don't add up" investigations end at a misunderstood join.

## Learning objectives

- [ ] Use `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `FULL OUTER JOIN`, and `CROSS JOIN` correctly, and predict the row count of each.
- [ ] Use the `LEFT JOIN ... WHERE right.id IS NULL` pattern for an *anti-join* (rows on the left with no match on the right).
- [ ] Join more than two tables and reason about the order in which the joins compose.
- [ ] Recognise and fix **fan traps** (a join that silently multiplies rows because the right side has duplicates on the join key).
- [ ] Distinguish `EXISTS` and `IN` from joins, and know when each is the right tool (full treatment in [Week 12](week-12-subqueries-ctes.md)).
- [ ] Read a query with table aliases (`o`, `c`, `p`) without losing track of which side a column came from.

## Prerequisites

- [Week 10 — `SELECT` / `WHERE` / `GROUP BY`](week-10-select-where-groupby.md). Joins compose with everything from last week.
- [Week 9 — Relational model](week-09-relational-model.md). You need foreign keys to make sense of join keys.

## Time estimate

Total: ~6h  (Reading: 1h · Video: 2h · Hands-on: 3h)

## Curated resources

### Courses

- [Microsoft Learn — *Combine multiple tables with JOINs in T-SQL*](https://learn.microsoft.com/en-us/training/modules/combine-multiple-tables-data-joins/) — *free* · ~1h · **Why:** the canonical T-SQL join module; goes through inner, outer, cross, and self-joins with diagrams.
- [Mode Analytics — *SQL Tutorial: Joins*](https://mode.com/sql-tutorial/sql-joins/) — *free* · ~2h · **Why:** the strongest browser-based join tutorial; the Venn diagrams are accurate (most aren't), and the live exercises catch the fan-trap mistake immediately.

### Microsoft Learn / official docs

- [Joins (SQL Server)](https://learn.microsoft.com/en-us/sql/relational-databases/performance/joins) — **Why:** the canonical reference. The execution-plan diagrams (nested loops, merge, hash) become useful in [Month 4, Week 15](../month-04-sql-advanced/index.md) — bookmark for then.
- [`FROM` clause and `JOIN` syntax (Transact-SQL)](https://learn.microsoft.com/en-us/sql/t-sql/queries/from-transact-sql) — **Why:** the formal grammar reference, including the (mostly historical) implicit join via comma + `WHERE`.

### Videos

- [*SQL JOINs Explained — INNER, LEFT, RIGHT, FULL, CROSS*](https://www.youtube.com/watch?v=KTvYHEntvn8) — Socratica · ~7 min · **Why:** the cleanest 7-minute join overview on YouTube; sample queries you can replicate in any sandbox.
- [*Visualising SQL Joins*](https://www.youtube.com/watch?v=9yeOJ0ZMUYw) — Bert Wagner · ~12 min · **Why:** Wagner's set diagrams correctly handle the *cardinality* part that flat Venn diagrams hide. If you have only seen the Venn-diagram joins poster, this is the corrective.
- [*The Most Important SQL Skill — Joins*](https://www.youtube.com/watch?v=9yeOJ0ZMUYw) — Alex The Analyst (continuing his SQL series) · ~20 min · **Why:** practical, analyst-focused, with the gotchas (`NULL`s in join keys, duplicate keys causing row multiplication) called out explicitly.

### Books / long-form reading

- *SQL for Data Analysis* — Cathy Tanimura. **Chapter 3** ("Time Series Analysis") will land in [Month 4](../month-04-sql-advanced/index.md); for this week, re-read the joins section of chapter 2 and skim **chapter 8** ("Funnel Analysis") for the use of `LEFT JOIN` to detect drop-off.
- *Joe Celko's SQL for Smarties* — Joe Celko. Skim the joins chapter. Old-school, dense, opinionated, but the corner cases are covered nowhere else.

### Certifications (if relevant)

- **PL-300** — *Model the data* in Power BI is the visual-modeller version of a join — same vocabulary (active relationship, cardinality, cross-filter direction), different UI.
- **DP-203 / DP-700** — exam scenarios will frequently ask which join type prevents row loss when one side is incomplete.

## Practice

- **The five join types.** Pick two tables with a foreign-key relationship (e.g. `Orders` and `Customers` in any sample DB). Run an `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `FULL OUTER JOIN`, and `CROSS JOIN`. Note the row count of each. Predict each count *before* you run it.
- **Anti-join.** Find all customers who have *never* placed an order. The idiomatic SQL: `LEFT JOIN orders ... WHERE orders.customer_id IS NULL`. Do this once. (We'll see two more ways in [Week 12](week-12-subqueries-ctes.md): `NOT EXISTS` and `NOT IN`. Each has a `NULL` gotcha.)
- **Three-table join.** Join `Orders → OrderLines → Products`. Now compute revenue per product category — note that you need a `GROUP BY` after the join. Predict the row count at each intermediate step.
- **Fan trap drill.** This is the most important practical exercise of the week. Set it up: `Customers` has 100 rows. `Orders` has 500 rows. Join `Customers ⨝ Orders` and `SUM(Orders.Amount)` grouped by `Customer`. Now add a third join to `OrderLines` (which has 2,000 rows). Re-run the same `SUM`. The number is wildly different. Why? (Answer: each customer-order row is now repeated once per order line, so `Orders.Amount` is being summed multiple times.) Fix it by aggregating `OrderLines` *first* in a subquery, then joining.
- **Self-join.** From an `Employees` table with a `manager_id` foreign key back to `Employees(id)`, list every employee with their manager's name. Two aliases of the same table — `e` for employee, `m` for manager.
- **Self-check questions.**
    1. Why does `LEFT JOIN` followed by `WHERE right.col = X` silently degrade to an `INNER JOIN`? How would you keep the left-join semantics? (Hint: move the predicate into the `ON` clause.)
    2. What is a *Cartesian product* and when is `CROSS JOIN` ever the right tool?
    3. The `Orders.amount` total in two different reports doesn't match. One report joins through `OrderLines`, one doesn't. What is the most likely cause?
    4. Two ways to express "customers with no orders": `LEFT JOIN ... IS NULL` and `WHERE NOT EXISTS (...)`. Which one is more reliable when join keys can be `NULL`?

## My notes

The honest mental model for joins is **rows × rows**: every join produces a result whose row count is the product of matching rows on both sides. `INNER` keeps only the matched products. `LEFT` keeps every left row, padding right-side columns with `NULL` where there's no match. `OUTER` keeps both sides. `CROSS` makes no attempt to match — every left row is paired with every right row. The Venn-diagram poster you have probably seen is misleading because it suggests joins produce *sets of unique entities*; in reality they produce *bags of paired rows*, and duplicates on either side multiply the result.

The **fan trap** is the single most common production-data bug. The fix is always the same: aggregate to the desired grain *before* joining. If your join is `Customer ⨝ Orders ⨝ OrderLines` and you want one row per customer with total revenue, aggregate `OrderLines → revenue per Order` first, then join to `Orders`, then aggregate again to `Customer`. Or use a CTE ([Week 12](week-12-subqueries-ctes.md)) per stage so the grain is explicit at every step.

The second-most common bug is putting a filter on an outer-joined table in `WHERE` instead of `ON`. Example: `LEFT JOIN orders ON orders.customer_id = customers.id WHERE orders.status = 'shipped'` — the `WHERE` filters out all the rows where `orders.status` is `NULL` (the *unmatched* customers), turning the `LEFT JOIN` back into an `INNER JOIN`. Move the predicate into the `ON` clause to preserve the left-join semantics: `... ON orders.customer_id = customers.id AND orders.status = 'shipped'`.

A note on aliases. Use *meaningful short aliases* (`o` for `orders`, `c` for `customers`, `p` for `products`). Single-letter is fine for a query that touches three tables; once you're at five, use two- or three-letter aliases to stay readable. Always alias every table in a multi-table query so column references are unambiguous.

## Further / optional

- [*A Visual Explanation of SQL Joins*](https://blog.codinghorror.com/a-visual-explanation-of-sql-joins/) — Jeff Atwood. The original Venn-diagram joins post — useful to know exists, useful to read its critics ([Bert Wagner above](#videos)) afterwards.
- [PostgreSQL `JOIN` documentation](https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-FROM) — the cleanest joined-table grammar reference if you want a non-Microsoft second opinion.

## Next

→ [Week 12 — Subqueries and CTEs](week-12-subqueries-ctes.md)
