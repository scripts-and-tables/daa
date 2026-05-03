---
title: Week 12 — Subqueries and CTEs
tags:
  - level::beginner
  - tool::sql
  - type::hands-on
time_estimate: 6h
status: complete
---

# Week 12 — Subqueries and CTEs

> Where SQL stops being a list of row-by-row operations and becomes a small functional language. By the end of the week you can decompose a complex question into a chain of named, readable steps using **CTEs**, and you know when a **subquery** is the right tool instead.

## Learning objectives

- [ ] Distinguish *scalar*, *row*, and *table* subqueries; know where each is allowed.
- [ ] Use subqueries in `SELECT`, `FROM`, and `WHERE`.
- [ ] Use `IN`, `NOT IN`, `EXISTS`, and `NOT EXISTS` correctly — and explain the `NULL` trap that makes `NOT IN` dangerous.
- [ ] Write a Common Table Expression (`WITH name AS (...)`) and chain multiple CTEs in one query.
- [ ] Refactor a deeply nested subquery into a flat sequence of CTEs without changing the result.
- [ ] Recognise a *correlated* subquery and explain why it executes once per outer row.
- [ ] Internalise when to reach for a CTE vs a subquery vs a temp table vs a view (preview of [Month 4, Week 16](../month-04-sql-advanced/index.md)).

## Prerequisites

- [Week 11 — Joins](week-11-joins.md). Most CTE chains are *grain-changing aggregations followed by joins* — exactly the fan-trap fix from last week.

## Time estimate

Total: ~6h  (Reading: 1h · Video: 2h · Hands-on: 3h)

## Curated resources

### Courses

- [Microsoft Learn — *Write subqueries in T-SQL*](https://learn.microsoft.com/en-us/training/modules/write-subqueries/) — *free* · ~1h · **Why:** the canonical T-SQL module on subqueries; covers scalar / multi-valued / correlated cleanly.
- [Mode Analytics — *SQL Tutorial: Intermediate*](https://mode.com/sql-tutorial/sql-sub-queries/) — *free* · *Subqueries* and *Common Table Expressions* sections only this week (~2h) · **Why:** the same browser-based sandbox you used in [Week 10](week-10-select-where-groupby.md), now with the harder exercises that show why CTEs make queries readable.

### Microsoft Learn / official docs

- [Subqueries (SQL Server)](https://learn.microsoft.com/en-us/sql/relational-databases/performance/subqueries) — **Why:** the canonical reference; the *correlated subquery* and *quantified comparisons* sections are the bits beginners miss.
- [`WITH` common_table_expression (Transact-SQL)](https://learn.microsoft.com/en-us/sql/t-sql/queries/with-common-table-expression-transact-sql) — **Why:** the formal CTE grammar reference, including the *recursive* CTE form (advanced; you will meet it again in [Month 4, Week 14](../month-04-sql-advanced/index.md)).

### Videos

- [*SQL Subqueries*](https://www.youtube.com/watch?v=GpC0XGUtHrI) — Socratica · ~10 min · **Why:** the cleanest 10-minute walkthrough of subquery shapes, including correlated subqueries.
- [*CTEs (Common Table Expressions)*](https://www.youtube.com/watch?v=QNfnuK-1YYY) — Alex The Analyst · ~10 min · **Why:** practical, analyst-focused; the example refactors a nested mess into a CTE chain step by step.
- [*EXISTS vs IN — Performance and Semantics*](https://www.youtube.com/watch?v=pfg99HfBgCM) — Brent Ozar · ~12 min · **Why:** Ozar is one of the most respected SQL Server consultants in the world; this is the definitive comparison and explains why `NOT IN` with a nullable subquery quietly returns no rows.

### Books / long-form reading

- *SQL for Data Analysis* — Cathy Tanimura. **Chapter 4** ("Cohort Analysis") and **chapter 5** ("Text Analysis") use CTE chains throughout — the right time to read both. **Why:** the cohort-analysis chapter especially shows a CTE chain *as analysis methodology*, not just syntax.
- *Joe Celko's SQL for Smarties* — Joe Celko. The chapter on subqueries and the chapter on `EXISTS` are short and worth reading once.

### Certifications (if relevant)

- **PL-300** — Power Query M and DAX both have constructs analogous to CTEs (`let` expressions in M, variables in DAX). Recognising the pattern in SQL transfers to both.

## Practice

- **Subquery in `WHERE`.** From an `Orders` table, find every order whose `Amount` is greater than the *average* order amount. Two ways: with a scalar subquery (`WHERE amount > (SELECT AVG(amount) FROM orders)`), and with a CTE.
- **Subquery in `FROM` (derived table).** Compute revenue per customer per month; then in an outer query, select customers whose monthly revenue exceeds €10k *in any month*. Use a derived-table subquery in `FROM` for the inner aggregation. Now refactor to a CTE — note that the CTE version is easier to read.
- **The `NOT IN` trap.** Set up: `Customers` with 100 rows; `Orders` with `customer_id` mostly populated but with one `NULL`. Run `SELECT * FROM customers WHERE id NOT IN (SELECT customer_id FROM orders)`. The result is *empty*. Why? Now run the same with `NOT EXISTS`. The result is correct. Read the explanation in the [Brent Ozar video above](#videos) and the [my notes](#my-notes) section.
- **CTE chain.** Compose the following as four named CTEs:
    1. `daily_revenue` — revenue per day.
    2. `weekly_revenue` — sum of `daily_revenue` per ISO week.
    3. `weekly_change` — week-over-week percentage change of `weekly_revenue` (use `LAG`, foreshadowing [Week 13](../month-04-sql-advanced/index.md)).
    4. `outlier_weeks` — weeks where the change exceeds ±20%.
   The final `SELECT` returns from `outlier_weeks`. Notice: the query reads top-to-bottom like prose.
- **Refactor a nested mess.** Write a deliberately bad three-deep nested subquery for any of the questions above. Now refactor into a flat CTE chain. Compare readability to a colleague (or yourself in 6 months).
- **Correlated subquery.** Find each customer's most recent order date with a correlated subquery: `SELECT c.id, (SELECT MAX(o.order_date) FROM orders o WHERE o.customer_id = c.id) AS last_order FROM customers c`. Now do the same with a `LEFT JOIN` + `GROUP BY`. Now do it with a window function (`MAX(...) OVER (PARTITION BY customer_id)` — preview of [Week 13](../month-04-sql-advanced/index.md)). Three ways, same answer.
- **Self-check questions.**
    1. Why is `NOT IN (subquery_returning_a_NULL)` returning zero rows? Show the truth-table reasoning.
    2. When is a CTE *guaranteed* to be evaluated only once vs evaluated per reference? (Hint: it depends on the dialect and version. PostgreSQL ≤12 always materialises; PostgreSQL ≥13 inlines unless you say `WITH name AS MATERIALIZED (...)`. SQL Server inlines.)
    3. When is a subquery in `WHERE` clearer than a CTE? (Hint: when it is small, scalar, and used once.)
    4. What is the difference between a CTE, a temporary table, and a view?

## Month-end mini-project (now is the time)

This is the closing week of Month 3; do the [Month 3 mini-project](index.md#mini-project) before opening Month 4. Constraint: every query in your final answer should be a *single* SQL statement (CTEs allowed; temp tables not). The point is to internalise that complex analyses can be one query.

## My notes

The single highest-leverage habit you can build this month is **default to CTEs over nested subqueries**. A query with three named CTEs reads like a recipe; the same query with three nested subqueries reads like a cryptic crossword. The runtime is identical in modern dialects (SQL Server, PostgreSQL ≥13, BigQuery, Snowflake, Databricks all inline CTEs unless you ask them not to). The readability difference is enormous.

The **`NOT IN` `NULL` trap** is the single most expensive subquery bug. The reason it returns zero rows when the subquery contains a `NULL` is three-valued logic: `id NOT IN (1, 2, NULL)` desugars to `id != 1 AND id != 2 AND id != NULL`, and `id != NULL` is `UNKNOWN`, not `TRUE`. The whole `AND` chain therefore never evaluates to `TRUE`. The fix is to use `NOT EXISTS` (which uses correlated existence rather than equality) or to filter out `NULL`s in the subquery (`WHERE col IS NOT NULL`). I personally use `NOT EXISTS` by default and treat `NOT IN` as a code smell.

A correlated subquery is one where the inner query references a column from the outer query. Conceptually, the inner query runs *once per outer row*. In practice, modern optimisers rewrite many correlated subqueries into joins or semi-joins, but the conceptual model is what you should reason from. If a correlated subquery and a `LEFT JOIN ... GROUP BY` express the same thing, the join version is usually faster and always more obvious.

When to reach for what:

- **Subquery in `WHERE`** — small, scalar (returns one value), used once. `WHERE x > (SELECT AVG(...) FROM ...)`.
- **CTE** — anything used twice, anything more than ~5 lines, anything that helps name an intermediate step.
- **Derived table (subquery in `FROM`)** — same use as a CTE; CTE is more readable. Use derived tables only when staying compatible with an old MySQL version that lacks CTEs, or for very small one-shot inline cases.
- **Temp table** — when an intermediate result is large and reused multiple times in a session, or when you want indexes on it.
- **View** — when the query is reused across sessions. (Materialised view if the cost of recomputation is high — preview of [Month 4, Week 16](../month-04-sql-advanced/index.md).)

## Further / optional

- [*Modern SQL — `WITH RECURSIVE`*](https://modern-sql.com/feature/with) — Markus Winand's deep dive on CTEs, including the recursive form. The whole `modern-sql.com` site is excellent.
- [*Use The Index, Luke!* — Subquery chapter](https://use-the-index-luke.com/sql/where-clause/the-equals-operator/subqueries) — when you want to know what your subqueries are doing under the hood.

## Next

→ Close out [Month 3](index.md#mini-project) by completing the mini-project, then start [Month 4 — SQL Advanced](../month-04-sql-advanced/index.md).
