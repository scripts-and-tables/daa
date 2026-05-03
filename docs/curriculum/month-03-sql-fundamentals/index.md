---
title: Month 3 — SQL Fundamentals
---

# Month 3 — SQL Fundamentals

SQL is the single most durable skill in this curriculum — it has been the lingua franca of data for fifty years and shows no sign of being replaced. This month builds the fundamentals: the relational model, the core query, joins, and CTEs. Dialect: **T-SQL** (matching the Microsoft track), with cross-references to PostgreSQL where it differs.

## Why this month exists

If you only ever learn one analytical tool well, it should be SQL. Every BI tool, every warehouse, every data pipeline, every analytics-engineering job either uses SQL directly or generates it under the hood. The investment compounds for the rest of your career.

This month deliberately holds you on **single-table queries → joins → CTEs**, in that order. Many beginners try to learn everything at once and end up with brittle copy-paste skills; the four-week cadence forces the mental models to land before the syntax piles up.

## Weekly plan

| Week | Topic                                                                  | Time | Outcome                                                              |
|------|------------------------------------------------------------------------|------|----------------------------------------------------------------------|
| 9    | [Relational model, keys, normalisation](week-09-relational-model.md)   | ~6h  | Read an ER diagram; explain 1NF, 2NF, 3NF in your own words.         |
| 10   | [`SELECT` / `WHERE` / `GROUP BY`](week-10-select-where-groupby.md)     | ~6h  | Write filtered, sorted, aggregated queries against a single table.   |
| 11   | [Joins](week-11-joins.md)                                              | ~6h  | Join three tables; recognise and fix fan traps.                      |
| 12   | [Subqueries and CTEs](week-12-subqueries-ctes.md)                      | ~6h  | Refactor a nested subquery into a readable CTE chain.                |

## Prerequisites

- [Month 2 — Spreadsheets](../month-02-spreadsheets/index.md) — pivot tables build the same mental model as `GROUP BY`. Power Query's *merge* in Week 8 is a join in disguise.
- A working SQL sandbox. Easiest free options: [Azure SQL free tier](https://azure.microsoft.com/en-us/free/) (T-SQL, matches the curriculum dialect), [SQL Server Developer Edition](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (local install), or browser-only sandboxes like [SQLZoo](https://sqlzoo.net/) and [DB Fiddle](https://www.db-fiddle.com/) (PostgreSQL/MySQL).
- One sample database loaded. The recommended pair: [AdventureWorks](https://learn.microsoft.com/en-us/sql/samples/adventureworks-install-configure) (T-SQL/Microsoft) plus the [Mode Analytics tutorial dataset](https://mode.com/sql-tutorial/introduction-to-sql/) (in the browser).

## Mini-project

Pick **one** SQL sandbox and one sample database from the prerequisites list. Answer the following five questions about the data — each as a *single* SQL statement (CTEs allowed, temp tables not). Save the queries with comments explaining the business question each answers.

1. **Top customers by revenue** — the top 10 customers by total spend, with their order count and average order value.
2. **Cohort retention proxy** — count of customers whose first order was in each calendar month, and the count of those same customers who placed at least one more order in any subsequent month.
3. **Revenue by category over time** — monthly revenue per product category for the last 12 months of data, in long format (`Year`, `Month`, `Category`, `Revenue`).
4. **Customers with no recent orders** — every customer who placed an order in the prior year but has not placed one in the most recent six months. (Anti-join — try both `LEFT JOIN ... IS NULL` and `NOT EXISTS`.)
5. **Fan-trap check** — pick any of the queries above that joins three tables. Compute one aggregate by joining all three, and the *same* aggregate by aggregating one side first in a CTE and then joining. Show that the two answers match (or explain why one is wrong).

The point of question 5 is to internalise the pattern from [Week 11](week-11-joins.md) and [Week 12](week-12-subqueries-ctes.md): aggregate-then-join, not join-then-aggregate, when the join changes the grain.

Save the file. You will translate (most of) these queries into pandas in [Month 6](../month-06-python-pandas/index.md) and into DAX measures in [Month 5](../month-05-visualization-powerbi/index.md).

## Self-check before moving on

Before starting Month 4, you should be able to answer these without looking anything up:

- What is the *logical execution order* of the six clauses `SELECT`, `FROM`, `WHERE`, `GROUP BY`, `HAVING`, `ORDER BY`? Why does it matter?
- Why is `NULL = NULL` not `TRUE`? What is the correct way to filter for missing values?
- A `LEFT JOIN` is "silently degrading" to an `INNER JOIN`. Name the most common cause and the fix.
- A monthly revenue total disagrees with itself across two reports — one joins through `OrderLines`, one doesn't. What is the most likely cause and how would you confirm?
- When is a CTE clearer than a subquery, and when is the reverse true?

If any answer is fuzzy, redo the relevant week before opening [Month 4 — SQL Advanced](../month-04-sql-advanced/index.md).

→ Start with [Week 9 — Relational model, keys, normalisation](week-09-relational-model.md).
