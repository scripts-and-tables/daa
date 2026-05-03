---
title: Month 2 — Spreadsheets (Excel)
---

# Month 2 — Spreadsheets (Excel)

Excel is still the most-used analytics tool in the world. Treating it as "just spreadsheets" leaves a huge productivity gap. This month builds *real* Excel competence — formulas that scale, pivots that summarise, and Power Query that ingests and cleans without VBA.

## Why this month exists

Two reasons. First: a non-trivial fraction of analytical work in any company will reach you as an Excel file, and you need to read, fix, and extend it confidently. Second: **Power Query (M)** ([Week 8](week-08-power-query.md)) is shared between Excel, Power BI, and Microsoft Fabric — learning it here pays off three more times in [Month 5](../month-05-visualization-powerbi/index.md), [Month 9](../month-09-etl-elt-pipelines/index.md), and [Month 10](../month-10-azure-data-platform/index.md).

This is not a "type 100 SUM formulas" month. The four weeks pick the small number of features that separate a productive Excel user from a frustrated one.

## Weekly plan

| Week | Topic                                                              | Time | Outcome                                                                |
|------|--------------------------------------------------------------------|------|------------------------------------------------------------------------|
| 5    | [Excel UI & references](week-05-excel-ui-references.md)            | ~6h  | Comfortable with absolute/relative refs, named ranges, structured refs (Tables). |
| 6    | [Lookup & logic formulas](week-06-lookup-logic-formulas.md)        | ~6h  | `XLOOKUP`, `INDEX/MATCH`, `IFS`, dynamic arrays, text and date functions. |
| 7    | [Pivot tables & charts](week-07-pivot-tables-charts.md)            | ~6h  | Build a pivot from a 100k-row Table, slice it, chart it.               |
| 8    | [Power Query (M)](week-08-power-query.md)                          | ~6h  | Ingest, clean, and reshape data with one-click refresh.                |

## Prerequisites

- [Month 1 — Foundations](../month-01-foundations/index.md), particularly the data-types vocabulary and stats intuition.
- A Microsoft 365 or Excel 2021+ install. The modern functions (`XLOOKUP`, `FILTER`, `TEXTSPLIT`, dynamic arrays) are not in older versions and are referenced throughout the month.

## Mini-project

Take the dataset from your [Month 1 memo](../month-01-foundations/index.md#month-end-mini-project). Move it into Excel and:

1. Convert the source to a **Table** (`Ctrl+T`); rename it.
2. Write three lookup formulas you would have done by hand last month — at least one with `XLOOKUP` and one with `INDEX/MATCH`.
3. Build a **pivot table** answering one question from your Month 1 memo. Use date grouping if your data has dates.
4. Add a **slicer** for one categorical dimension; connect it to the pivot.
5. Replace at least one manual cleanup step with a **Power Query** that refreshes from the original file.

Constraint: when the source file changes, the entire workbook should be one click of *Refresh All* away from being current. If anything has to be re-pasted by hand, fix it.

Save the workbook. You will revisit it at the end of [Month 6](../month-06-python-pandas/index.md) to compare against the same task in pandas.

## Self-check before moving on

Before starting Month 3, you should be able to answer these without looking anything up:

- What is the difference between a **Table** and a **range**, and why do pivot tables and Power Query strongly prefer Tables?
- What does the *fifth* argument of `XLOOKUP` do, and why is it the argument that prevents `#N/A` cascades in production spreadsheets?
- What is the difference between *grouping by date in a pivot table* and *adding a derived `Year` column to the source Table*? When is each the right answer?
- Power Query and Power BI use the same engine. What does that mean for the M code you write this month?

If any answer is fuzzy, redo the relevant week before opening [Month 3 — SQL Fundamentals](../month-03-sql-fundamentals/index.md).

→ Start with [Week 5 — Excel UI & references](week-05-excel-ui-references.md).
