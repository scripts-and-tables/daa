---
title: Month 3 — SQL Fundamentals
status: stub
---

# Month 3 — SQL Fundamentals

!!! warning "Coming soon"

    Full content for this month lands in a later pass. Structure is final.

## Theme

SQL is the single most durable skill in this curriculum — it has been the lingua franca of data for fifty years and shows no sign of being replaced. This month builds the fundamentals: the relational model, the core query, joins, and CTEs. Dialect: **T-SQL** (matching the Microsoft track), with cross-references to PostgreSQL where it differs.

## Weekly plan

| Week  | Topic                                        | Outcome                                                                |
|-------|----------------------------------------------|------------------------------------------------------------------------|
| 9     | Relational model, keys, normalisation        | Read an ER diagram; explain 1NF, 2NF, 3NF in your own words.           |
| 10    | The core query: `SELECT / WHERE / GROUP BY`  | Write filtered, sorted, aggregated queries against a single table.     |
| 11    | Joins (inner / left / right / full / anti)   | Join three tables; explain when each join type is correct.             |
| 12    | Subqueries and CTEs                          | Refactor a nested subquery into a readable CTE chain.                  |

## Prerequisites

- [Month 2 — Spreadsheets](../month-02-spreadsheets/index.md) — pivot tables build the same mental model as `GROUP BY`.

## Mini-project

Pick a public SQL sandbox (e.g. *AdventureWorks* on SQL Server, *Sakila* on PostgreSQL, or [StrataScratch](https://www.stratascratch.com/) free tier). Answer five questions about the data, each requiring at least one join and one aggregation. Save the queries.
