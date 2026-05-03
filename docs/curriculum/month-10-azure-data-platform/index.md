---
title: Month 10 — Azure Data Platform
status: stub
---

# Month 10 — Azure Data Platform

!!! warning "Coming soon"

    Full content for this month lands in a later pass. Structure is final.

## Theme

Cloud platform fluency, with Azure as the primary lens (matching the Microsoft track). For each Azure service we name, the cross-cloud equivalent on AWS and GCP is briefly noted so the knowledge transfers.

## Weekly plan

| Week  | Topic                                       | Outcome                                                              |
|-------|---------------------------------------------|----------------------------------------------------------------------|
| 37    | Cloud basics + cross-cloud map              | Regions, IAM, storage classes; Azure ↔ AWS ↔ GCP service map.        |
| 38    | ADLS, Synapse, Microsoft Fabric             | Lake/lakehouse architecture; choose the right service per workload.  |
| 39    | Databricks & Spark — intro                  | Notebooks on Spark; when to reach for distributed compute.           |
| 40    | Cost, security, governance (Purview)        | Tag resources, set budgets, basic data governance with Purview.      |

## Prerequisites

- [Month 9 — ETL/ELT & Pipelines](../month-09-etl-elt-pipelines/index.md).

## Mini-project

Provision a free-tier Azure subscription. Stand up an Azure Data Lake Storage account and a serverless SQL pool in Synapse (or a Fabric trial). Load one CSV from your dbt project, query it from Synapse, and shut everything down. Total spend target: **€0**.

## Certification

This month maps closely to **DP-203 (Azure Data Engineer Associate)** — see the [Certifications track](../../tracks/certifications.md). Note: DP-203 is being replaced/refreshed by DP-700 (Fabric); confirm current exam IDs before booking.
