---
title: Month 8 — Power BI — Core
status: stub
---

# Month 8 — Power BI — Core

!!! warning "Coming soon"

    Full content for this month lands in a later pass. Structure is final.

## Theme

Dataviz principles first, then Power BI as the primary tool. The star schema you designed in [Month 4](../month-04-sql-advanced/index.md) is exactly the model Power BI expects to see; the SQL aggregations from [Month 3](../month-03-sql-fundamentals/index.md) become DAX measures.

This is the **first month of the Power BI pillar**; advanced DAX and Azure / Fabric integration land in [Month 9](../month-09-powerbi-advanced-azure/index.md).

## Weekly plan

| Week  | Topic                                     | Outcome                                                                |
|-------|-------------------------------------------|------------------------------------------------------------------------|
| 29    | Dataviz principles                        | Cleveland's hierarchy, Few's principles, Knaflic's storytelling rules. |
| 30    | Power BI Desktop & the data model         | Star-schema in Power BI; relationships, calculated columns vs measures. |
| 31    | DAX — measures & time intelligence        | `CALCULATE`, `FILTER`, `SAMEPERIODLASTYEAR`; build a YTD measure.      |
| 32    | Publishing, RLS, dashboards (+ Tableau primer) | Publish to Power BI Service; Row-Level Security; embed.           |

## Prerequisites

- [Month 4 — SQL Advanced & Data Modeling](../month-04-sql-advanced/index.md) — the data model in Power BI is essentially relational, and the modelling vocabulary (fact, dimension, grain) is the same.
- [Month 2, Week 8 — Power Query](../month-02-spreadsheets/week-08-power-query.md) — Power BI uses the same Power Query engine you already know.

## Mini-project

Build a single-page Power BI report from your dbt project's output ([Month 7 mini-project](../month-07-python-workflows/index.md#mini-project)) or from any public dataset. Constraint: at most three charts, one filter, one KPI card. The point is restraint, not feature density.

## Certification

This month and [Month 9](../month-09-powerbi-advanced-azure/index.md) together map closely to **PL-300 (Power BI Data Analyst Associate)** — see the [Certifications track](../../tracks/certifications.md).
