---
title: Month 9 — ETL/ELT & Pipelines
status: stub
---

# Month 9 — ETL/ELT & Pipelines

!!! warning "Coming soon"

    Full content for this month lands in a later pass. Structure is final.

## Theme

Move data reliably from sources into the warehouse, transform it, and trust the result. This month covers concepts (ETL vs ELT, batch vs streaming), orchestration (Azure Data Factory, Microsoft Fabric Pipelines, with Airflow as the open-source reference), dbt fundamentals, and data-quality testing.

## Weekly plan

| Week  | Topic                                  | Outcome                                                              |
|-------|----------------------------------------|----------------------------------------------------------------------|
| 33    | ETL vs ELT, batch vs streaming         | Pick the right pattern for a use case and defend the choice.         |
| 34    | Orchestration — ADF / Fabric Pipelines | Build a simple two-step pipeline; understand triggers and retries.   |
| 35    | dbt fundamentals                       | Models, sources, tests, documentation; the "ELT in SQL" pattern.     |
| 36    | Data quality, testing, observability   | Schema tests, freshness, lineage, alerting on broken pipelines.      |

## Prerequisites

- [Month 8 — Data Modeling & Warehousing](../month-08-data-modeling-warehousing/index.md).

## Mini-project

Build a small dbt project that reads a public CSV, applies cleaning logic, and produces a star schema with at least three `not_null` and `unique` tests. Run it locally; export the docs.
