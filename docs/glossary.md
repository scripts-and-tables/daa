---
title: Glossary
---

# Glossary

The vocabulary used across the curriculum. Bookmark this page; you will return to it more than you think.

## A

**A/B testing**
:   A controlled experiment where two variants (A and B) are randomly served to users, and a metric is compared between groups. Covered in [Month 7](curriculum/month-07-statistics/index.md).

**Active recall**
:   The learning technique of *retrieving* information from memory rather than re-reading it. The single highest-leverage study habit. See [Learning philosophy](about/learning-philosophy.md).

## B

**BI (Business Intelligence)**
:   The umbrella term for the dashboards, reports, and KPI tracking that businesses use to monitor their operations. Power BI and Tableau are the dominant tools.

## C

**CAGR (Compound Annual Growth Rate)**
:   The average annual growth rate of a value over a period, accounting for compounding. `CAGR = (End/Start)^(1/years) − 1`. Covered in [Month 1, Week 3](curriculum/month-01-foundations/week-03-math-refresher.md).

**CTE (Common Table Expression)**
:   A named, temporary result set defined within a SQL query using `WITH`. Used to make complex queries readable. Covered in [Month 3](curriculum/month-03-sql-fundamentals/index.md).

**Confidence interval**
:   A range of values, computed from a sample, that with a stated probability (commonly 95%) contains the true population parameter. Covered in [Month 7](curriculum/month-07-statistics/index.md).

## D

**DAX (Data Analysis Expressions)**
:   The formula language used in Power BI, Excel Power Pivot, and Analysis Services. Covered in [Month 5](curriculum/month-05-visualization-powerbi/index.md).

**Dimension**
:   In dimensional modelling, a table that describes the *who / what / where / when* of a business event — customers, products, dates, stores. Compare *fact*. Covered in [Month 8](curriculum/month-08-data-modeling-warehousing/index.md).

## E

**ELT (Extract–Load–Transform)**
:   Modern variant of ETL where data is loaded into the warehouse *first* and transformed in-warehouse using SQL (often via dbt). Covered in [Month 9](curriculum/month-09-etl-elt-pipelines/index.md).

**ETL (Extract–Transform–Load)**
:   The classic data-pipeline pattern where data is extracted from sources, transformed in flight, and loaded into the target. Covered in [Month 9](curriculum/month-09-etl-elt-pipelines/index.md).

## F

**Fact**
:   In dimensional modelling, a table containing the *measurements* of a business event — quantities, amounts, durations. Compare *dimension*. Covered in [Month 8](curriculum/month-08-data-modeling-warehousing/index.md).

## G

**Granularity (grain)**
:   The level of detail represented by a row in a table. *One row per order line* is finer-grained than *one row per order*. Choosing the wrong grain breaks dashboards.

## K

**KPI (Key Performance Indicator)**
:   A metric a stakeholder has agreed to be judged on. Distinct from *metric* (anything you can count). Covered in [Month 1, Week 1](curriculum/month-01-foundations/week-01-data-literacy.md).

## M

**MECE (Mutually Exclusive, Collectively Exhaustive)**
:   A decomposition where the sub-categories do not overlap and together cover everything. Used in issue trees. Covered in [Month 1, Week 2](curriculum/month-01-foundations/week-02-problem-framing.md).

**Metric**
:   Anything you can count. Compare *KPI*.

## O

**OLAP (Online Analytical Processing)**
:   Systems and patterns optimised for analytical queries — large reads, aggregations, joins. Compare *OLTP*. Covered in [Month 8](curriculum/month-08-data-modeling-warehousing/index.md).

**OLTP (Online Transactional Processing)**
:   Systems optimised for production transactional workloads — small reads/writes, low latency, ACID guarantees. Compare *OLAP*.

## P

**Percentage point**
:   The arithmetic difference between two percentages. *4% to 6%* is a **2-percentage-point** increase but a **50% relative increase**. Confusing the two is the most common public reporting error. Covered in [Month 1, Week 3](curriculum/month-01-foundations/week-03-math-refresher.md).

## R

**RLS (Row-Level Security)**
:   Restricting which rows a user can see in a report based on their identity or group. Covered in [Month 5](curriculum/month-05-visualization-powerbi/index.md).

## S

**SCD (Slowly Changing Dimension)**
:   A pattern for handling changes to dimension attributes over time — *Type 1* overwrites, *Type 2* keeps history. Covered in [Month 8](curriculum/month-08-data-modeling-warehousing/index.md).

**SMART (Specific, Measurable, Achievable, Relevant, Time-bound)**
:   Criteria for a well-framed analytical question. Covered in [Month 1, Week 2](curriculum/month-01-foundations/week-02-problem-framing.md).

**Spaced repetition**
:   A learning technique where reviews are scheduled at expanding intervals. Anki is the canonical tool. See [Learning philosophy](about/learning-philosophy.md).

**Star schema**
:   A dimensional model with one *fact* table joined to several *dimension* tables. Compare *snowflake schema* (where dimensions are themselves normalised). Covered in [Month 8](curriculum/month-08-data-modeling-warehousing/index.md).
