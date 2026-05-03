---
title: Month 4 — SQL Advanced
status: stub
---

# Month 4 — SQL Advanced

!!! warning "Coming soon"

    Full content for this month lands in a later pass. Structure is final.

## Theme

The SQL that separates competent analysts from analytics engineers: window functions, set operations, indexing intuition, and an honest accounting of what differs between T-SQL, PostgreSQL, BigQuery, and Snowflake.

## Weekly plan

| Week  | Topic                                    | Outcome                                                                  |
|-------|------------------------------------------|--------------------------------------------------------------------------|
| 13    | Window functions                         | Use `ROW_NUMBER`, `RANK`, `LAG`/`LEAD`, running totals, moving averages. |
| 14    | Set operations & pivoting                | `UNION`/`INTERSECT`/`EXCEPT`; `PIVOT`/`UNPIVOT`; recursive CTEs.         |
| 15    | Indexes & query plans (intro)            | Read an execution plan; recognise a missing-index warning.               |
| 16    | Dialect differences                      | Migrate a query between T-SQL, PostgreSQL, BigQuery, and Snowflake.      |

## Prerequisites

- [Month 3 — SQL Fundamentals](../month-03-sql-fundamentals/index.md) (must be solid).

## Mini-project

Take three queries from your Month 3 mini-project and rewrite them using window functions in place of self-joins or correlated subqueries. Compare execution plans before and after.
