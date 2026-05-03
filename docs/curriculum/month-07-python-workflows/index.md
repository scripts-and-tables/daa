---
title: Month 7 — Python — Workflows & ETL
status: stub
---

# Month 7 — Python — Workflows & ETL

!!! warning "Coming soon"

    Full content for this month lands in a later pass. Structure is final.

## Theme

Move data reliably from sources into the warehouse, transform it, and trust the result. This month combines two threads: **Python in production-flavoured workflows** (APIs, ingestion patterns, virtual environments, `pytest`, `great_expectations`) and the **ETL/ELT vocabulary** (batch vs streaming, orchestration, dbt fundamentals, data quality).

This is the **third month of the Python pillar** and closes it out. By the end of Month 7 you can build a small reproducible pipeline that reads from somewhere, transforms with pandas or dbt, writes somewhere else, and includes data-quality tests.

## Weekly plan

| Week  | Topic                                    | Outcome                                                              |
|-------|------------------------------------------|----------------------------------------------------------------------|
| 25    | APIs, ingestion, environments            | Read JSON from an API; manage venvs; handle pagination & rate limits. |
| 26    | ETL vs ELT, orchestration concepts       | Pick the right pattern; intro to Airflow / ADF / Fabric Pipelines.   |
| 27    | dbt fundamentals                         | Models, sources, tests, documentation; the "ELT in SQL" pattern.     |
| 28    | Data quality, testing, observability     | `pytest` for analytics code; `great_expectations`; freshness & lineage. |

## Prerequisites

- [Month 5 — Python Fundamentals & pandas](../month-05-python-fundamentals/index.md).
- [Month 4 — SQL Advanced & Data Modeling](../month-04-sql-advanced/index.md) — dbt is "SQL with software-engineering practices around it".

## Mini-project

Build a small dbt project that reads a public CSV (or pulls from a public API), applies cleaning logic, and produces a star schema with at least three `not_null` and `unique` tests. Run it locally; export the docs. The schema lands cleanly into [Month 8 — Power BI Core](../month-08-power-bi-core/index.md).
