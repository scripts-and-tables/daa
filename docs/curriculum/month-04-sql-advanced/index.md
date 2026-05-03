---
title: Month 4 — SQL Advanced & Data Modeling
status: stub
---

# Month 4 — SQL Advanced & Data Modeling

!!! warning "Coming soon"

    Full content for this month lands in a later pass. Structure is final.

## Theme

The SQL that separates competent analysts from analytics engineers, plus the data-modelling vocabulary every BI tool eventually presumes you know. By the end of this month you can write production-grade analytical SQL *and* design the dimensional schema it queries against.

## Weekly plan

| Week  | Topic                                       | Outcome                                                                  |
|-------|---------------------------------------------|--------------------------------------------------------------------------|
| 13    | Window functions                            | Use `ROW_NUMBER`, `RANK`, `LAG`/`LEAD`, running totals, moving averages. |
| 14    | Advanced query patterns                     | `UNION`/`INTERSECT`/`EXCEPT`; `PIVOT`/`UNPIVOT`; recursive CTEs.         |
| 15    | Performance & dialects                      | Read an execution plan; recognise a missing index; T-SQL ↔ PostgreSQL ↔ BigQuery ↔ Snowflake. |
| 16    | Data modeling — Kimball, star schemas, SCDs | OLTP vs OLAP; facts, dimensions, star vs snowflake; SCD Type 1/2/3; grain. |

## Prerequisites

- [Month 3 — SQL Fundamentals](../month-03-sql-fundamentals/index.md) (must be solid).

## Mini-project

Two-part. **Part A:** take three queries from your Month 3 mini-project and rewrite them using window functions in place of self-joins or correlated subqueries. Compare execution plans before and after. **Part B:** take a transactional dataset (orders, line items, customers, products) and design a star schema for it on paper, then implement it as views in your SQL sandbox. The schema you design here is the same one you will load into Power BI in [Month 8](../month-08-power-bi-core/index.md).

## Why data modeling lives here

Data modeling used to be its own month in the original plan. It collapses naturally into SQL Advanced because the modelling vocabulary (*fact*, *dimension*, *grain*, *star schema*, *SCD*) is unintelligible without comfortable SQL, and the practical work of *defining* a star schema is largely SQL DDL. Putting them together in the same month means you finish Month 4 able to both *design* and *query* a dimensional model.
