---
title: Week 10 — SELECT / WHERE / GROUP BY
tags:
  - level::beginner
  - tool::sql
  - type::hands-on
time_estimate: 6h
status: complete
---

# Week 10 — `SELECT` / `WHERE` / `GROUP BY`

> The single-table query. By the end of this week you can pull, filter, sort, and aggregate from one table fluently — which is something like 60% of all SQL written in industry.

## Learning objectives

- [ ] Write `SELECT` queries with column lists, expressions, and aliases.
- [ ] Filter rows with `WHERE` using comparison operators, `BETWEEN`, `IN`, `LIKE`, `IS NULL`, and boolean combinations (`AND`, `OR`, `NOT`).
- [ ] Sort with `ORDER BY` (ascending and descending; multi-column).
- [ ] Aggregate with `COUNT`, `SUM`, `AVG`, `MIN`, `MAX` and group with `GROUP BY`.
- [ ] Filter aggregates with `HAVING` (and explain why `WHERE` does not work here).
- [ ] Use `DISTINCT`, `LIMIT` / `TOP` / `FETCH FIRST` (the dialect differences matter).
- [ ] Internalise the **logical execution order** of a SQL query (`FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT`).

## Prerequisites

- [Week 9 — Relational model](week-09-relational-model.md). You need to be able to read a schema before you can query it.
- A working SQL sandbox. T-SQL is the curriculum default — use [Azure SQL free tier](https://azure.microsoft.com/en-us/free/) or [SQL Server Developer Edition](https://www.microsoft.com/en-us/sql-server/sql-server-downloads). [PostgreSQL via DB Fiddle](https://www.db-fiddle.com/) or [SQLZoo](https://sqlzoo.net/) work in the browser with no install.

## Time estimate

Total: ~6h  (Reading: 1h · Video: 2h · Hands-on: 3h)

## Curated resources

### Courses

- [Microsoft Learn — *Introduction to Transact-SQL*](https://learn.microsoft.com/en-us/training/modules/introduction-to-transact-sql/) — *free* · ~1.5h · **Why:** the canonical T-SQL introduction; covers `SELECT`, `WHERE`, sorting, and the logical execution order in Microsoft's own vocabulary. Continues directly into the *Sort and filter results* and *Combine multiple tables with JOINs* modules.
- [Mode Analytics — *SQL Tutorial: Basic*](https://mode.com/sql-tutorial/introduction-to-sql/) — *free* · ~3h · **Why:** runs in the browser against real-looking startup data. Best free hands-on intro on the web; covers `SELECT`, `WHERE`, `GROUP BY`, `ORDER BY`, and `LIMIT` with worked examples and live exercises.

### Microsoft Learn / official docs

- [`SELECT` (Transact-SQL) reference](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql) — **Why:** the canonical T-SQL `SELECT` reference. The *Logical Processing Order* note near the bottom is worth tattooing somewhere.
- [`WHERE` (Transact-SQL)](https://learn.microsoft.com/en-us/sql/t-sql/queries/where-transact-sql) — **Why:** the operator-by-operator reference. Includes the `LIKE` pattern characters most people half-remember.
- [Aggregate functions (Transact-SQL)](https://learn.microsoft.com/en-us/sql/t-sql/functions/aggregate-functions-transact-sql) — **Why:** the full list (including the ones you forget exist, like `STRING_AGG` and `STDEV`).
- [`GROUP BY` (Transact-SQL)](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-group-by-transact-sql) — **Why:** the canonical reference, including `GROUPING SETS`, `ROLLUP`, and `CUBE` (advanced; you'll meet them again in [Month 4](../month-04-sql-advanced/index.md)).

### Videos

- [*SQL Tutorial — Full Database Course for Beginners*](https://www.youtube.com/watch?v=HXV3zeQKqGY) — Mike Dane on freeCodeCamp · ~4h playlist; this week watch only the *SELECT*, *WHERE*, and *GROUP BY* sections (~1h). **Why:** the most-watched free SQL course on YouTube; clear, slow-paced, MySQL-flavoured (the syntax is essentially identical to T-SQL for this week's work).
- [*SQL Logical Query Processing Order*](https://www.youtube.com/watch?v=p3qvj9hO_Bo) — Bert Wagner · ~6 min · **Why:** the single most under-taught SQL concept. Once you know that `WHERE` runs before `SELECT`, the "why can't I reference my alias?" question answers itself.
- [*Alex The Analyst — SQL for Data Analytics*](https://www.youtube.com/playlist?list=PLUaB-1hjhk8FE_XZ87vPPSfHqb6OcM0cF) — first 6 videos this week. **Why:** practical, analyst-focused, uses a portfolio-ready dataset throughout. Pace yourself; Alex covers later weeks too.

### Books / long-form reading

- *SQL for Data Analysis* — Cathy Tanimura. Read **chapter 2** ("Preparing Data for Analysis"). **Why:** Tanimura's book is the strongest "SQL for analysts, not for DBAs" book in print. Chapter 2 covers profiling, cleaning, and the early `SELECT` patterns analysts actually write.
- [*Use The Index, Luke!*](https://use-the-index-luke.com/) — Markus Winand. Skim the introduction. **Why:** dialect-neutral, free online book on SQL performance. You will return in [Month 4](../month-04-sql-advanced/index.md).

### Certifications (if relevant)

- **PL-300** — *Prepare the data* expects fluency with these clauses for in-database transformations.
- **DP-203 / DP-700** — Synapse / Fabric serverless SQL pools speak the same T-SQL shown in the docs above.

## Practice

- **The five-clause drill.** Pick a sample database (AdventureWorks, Sakila, or the [Mode Analytics tutorial dataset](https://mode.com/sql-tutorial/introduction-to-sql/)). Write five queries — one each for `SELECT`, `WHERE`, `ORDER BY`, `GROUP BY` + aggregate, and `HAVING`. Save them.
- **Expression aliases.** Compute a derived column in `SELECT` (e.g. `Quantity * UnitPrice AS LineTotal`). Now try to use `LineTotal` in the `WHERE` clause. It will fail — and the [logical execution order](https://www.youtube.com/watch?v=p3qvj9hO_Bo) tells you why.
- **`NULL` trap.** In any table with a nullable column, run `SELECT * FROM t WHERE col != 'X'`. Notice that rows where `col IS NULL` are *not* returned. Three-valued logic is the source of more SQL bugs than any other single feature; see [Cathy Tanimura's chapter 2](#books-long-form-reading).
- **`LIKE` patterns.** Using a customers or products table, write queries that find: rows starting with `'A'`, rows ending in `'son'`, rows containing `'analy'`, rows where the second character is a digit. (Hint: `_` and `%`.)
- **Aggregation drill.** From an orders table, compute: total revenue per month, count of orders per customer, average order value per region, the *top-10* customers by total spend (`ORDER BY ... DESC` + `TOP 10` / `LIMIT 10`).
- **`HAVING` vs `WHERE`.** Find all customers whose *total spend* exceeds €1,000. You cannot put the `SUM` in `WHERE` — it has to be `HAVING`. Why? (Answer: aggregates do not exist until after `GROUP BY`.)
- **Self-check questions.**
    1. Why does `SELECT * FROM orders WHERE status != 'shipped'` skip rows with `status IS NULL`? How do you write the query to include them?
    2. What is the difference between `COUNT(*)`, `COUNT(col)`, and `COUNT(DISTINCT col)`?
    3. In what *logical* order does the database evaluate the six clauses `SELECT`, `FROM`, `WHERE`, `GROUP BY`, `HAVING`, `ORDER BY`?
    4. T-SQL uses `TOP 10`, PostgreSQL uses `LIMIT 10`, and SQL standard uses `FETCH FIRST 10 ROWS ONLY`. Which works on Azure SQL? On Snowflake? On BigQuery?

## My notes

The single concept that unlocks SQL is **logical execution order**: `FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT`. The `SELECT` you write *first* is the clause the database evaluates *almost last*. Once you internalise that, three classes of beginner bugs evaporate at once: aliases not being available in `WHERE`, aggregates not being available in `WHERE`, and column ordinal references in `ORDER BY` doing what you'd expect.

The second under-taught topic is **`NULL` and three-valued logic**. SQL's `NULL` is not "no value" — it is *unknown*. `NULL = NULL` is `UNKNOWN`, not `TRUE`. `NULL != 'X'` is `UNKNOWN`, not `TRUE`. Comparison and arithmetic with `NULL` propagates `NULL`. This is *not* a beginner pitfall — senior analysts get it wrong too. Use `IS NULL` / `IS NOT NULL` and `COALESCE` deliberately.

A note on dialects. The **T-SQL** dialect (Microsoft) is the curriculum default. The single most common dialect difference you will hit this week is **`TOP` vs `LIMIT`**. T-SQL: `SELECT TOP 10 ...`. PostgreSQL / MySQL / Snowflake / BigQuery: `... LIMIT 10`. Otherwise, the syntax of `SELECT`, `WHERE`, `GROUP BY`, and `ORDER BY` is essentially identical across all major dialects.

A note on style. Capital letters for keywords (`SELECT`, `WHERE`, `GROUP BY`) and lowercase for identifiers is the most common convention. Indent each clause on its own line. Use trailing commas (`column1,`) or leading commas (`, column1`) — pick one and be consistent. The [SQL style guide](https://www.sqlstyle.guide/) by Simon Holywell is the closest thing to a community standard.

## Further / optional

- [SQLZoo](https://sqlzoo.net/) — browser-based exercises on a sample database. Excellent for muscle-memory drills.
- [PostgreSQL tutorial](https://www.postgresqltutorial.com/) — when you want a PostgreSQL-flavoured second opinion on any topic.

## Next

→ [Week 11 — Joins](week-11-joins.md)
