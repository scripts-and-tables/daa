---
title: Month 9 — Power BI — Advanced & Azure
status: stub
---

# Month 9 — Power BI — Advanced & Azure

!!! warning "Coming soon"

    Full content for this month lands in a later pass. Structure is final.

## Theme

The second half of the Power BI pillar. Two threads: **advanced DAX & deployment** (filter context, deployment pipelines, performance), and **Azure / Microsoft Fabric integration** (ADLS, Synapse, Fabric capacities, Purview governance). For each Azure service named, the cross-cloud equivalent on AWS and GCP is briefly noted so the knowledge transfers.

## Weekly plan

| Week  | Topic                                       | Outcome                                                              |
|-------|---------------------------------------------|----------------------------------------------------------------------|
| 33    | Advanced DAX — filter context, `CALCULATE`  | Confidently reason about row vs filter context; debug DAX measures.  |
| 34    | Power BI + Azure / Fabric data sources      | Connect to ADLS, Synapse Serverless, Fabric Lakehouse; DirectQuery vs Import. |
| 35    | Performance & deployment pipelines          | Vertipaq engine intuition; deployment pipelines (dev → test → prod). |
| 36    | Governance — Purview, RLS, tenant admin     | Sensitivity labels, lineage, RLS at scale, workspace governance.     |

## Prerequisites

- [Month 8 — Power BI Core](../month-08-power-bi-core/index.md).
- [Month 7 — Python Workflows & ETL](../month-07-python-workflows/index.md) — the Azure data sources you connect to are populated by the same kinds of pipelines you built in Month 7.

## Mini-project

Provision a free-tier Azure subscription. Stand up an Azure Data Lake Storage account and a serverless SQL pool in Synapse (or a Fabric trial). Load one CSV from your Month 7 dbt project, build a Power BI report on top, and shut everything down. Total spend target: **€0**. Wrap up by writing two advanced DAX measures (a YTD-vs-prior-YTD comparison and a basket-size cohort) using `CALCULATE` deliberately.

## Certification

This month + [Month 8](../month-08-power-bi-core/index.md) together complete the **PL-300 (Power BI Data Analyst Associate)** mapping. The Azure portion overlaps with **DP-203 / DP-700 (Azure / Fabric Data Engineer)** — see the [Certifications track](../../tracks/certifications.md). Note: DP-203 is being replaced/refreshed by DP-700 (Fabric); confirm current exam IDs before booking.
