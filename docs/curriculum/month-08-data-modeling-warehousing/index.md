---
title: Month 8 — Data Modeling & Warehousing
status: stub
---

# Month 8 — Data Modeling & Warehousing

!!! warning "Coming soon"

    Full content for this month lands in a later pass. Structure is final.

## Theme

Designing the data layer that BI dashboards and ML models actually consume. Kimball-style dimensional modelling is the centre of the month, with honest discussion of where modern variants — Data Vault, "One Big Table", dbt-style modelling — fit in.

## Weekly plan

| Week  | Topic                                | Outcome                                                              |
|-------|--------------------------------------|----------------------------------------------------------------------|
| 29    | OLTP vs OLAP                         | Explain why production DBs and analytics DBs are designed differently. |
| 30    | Facts, dimensions, star vs snowflake | Design a star schema for a sales / subscription / events business.    |
| 31    | Slowly Changing Dimensions, grain    | SCD Type 1/2/3; choose the correct grain for a fact table.            |
| 32    | Modern variants                      | Data Vault overview; OBT pragmatism; dbt's view of modelling.         |

## Prerequisites

- [Month 4 — SQL Advanced](../month-04-sql-advanced/index.md).
- [Month 5 — Visualization (Power BI)](../month-05-visualization-powerbi/index.md) — Power BI's model is essentially Kimball.

## Mini-project

Take a transactional dataset (orders, line items, customers, products) and design a star schema for it on paper, then implement it as views in your SQL sandbox. Reproduce one of your Month 5 Power BI reports against the new model.
