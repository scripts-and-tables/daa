---
title: Week 7 — Pivot tables & charts
tags:
  - level::beginner
  - tool::excel
  - type::hands-on
time_estimate: 6h
status: complete
---

# Week 7 — Pivot tables & charts

> Pivot tables are the cheapest, fastest way to summarise tabular data — and the mental model behind them is the same one you will reuse next month for SQL `GROUP BY`. Charts get a smaller share of this week because the *principles* of visualisation land in [Month 5](../month-05-visualization-powerbi/index.md); this week is about competence, not artistry.

## Learning objectives

- [ ] Build a pivot table from a Table source, add fields to *Rows*, *Columns*, *Values*, and *Filters* deliberately.
- [ ] Change value summarisation (`Sum`, `Count`, `Average`, `% of Column Total`, `Difference From`) and explain when each is correct.
- [ ] Group dates by month / quarter / year; group numerical fields by bin.
- [ ] Use slicers and timelines for interactive filtering; connect one slicer to multiple pivot tables.
- [ ] Build a basic pivot chart and choose the chart type that matches the data shape.
- [ ] Recognise the three pivot-table layouts (compact, outline, tabular) and the trade-offs.

## Prerequisites

- [Week 5](week-05-excel-ui-references.md) — your source data must be a Table, not a flat range, or you will fight the pivot every time a row is added.
- [Week 6](week-06-lookup-logic-formulas.md) — date functions especially; the date-grouping step uses the same date model.

## Time estimate

Total: ~6h  (Reading: 1h · Video: 2h · Hands-on: 3h)

## Curated resources

### Courses

- [*Excel Skills for Business: Intermediate I*](https://www.coursera.org/learn/excel-intermediate-1) — Macquarie University on Coursera · *free to audit* · pivot-table modules only (~3h) · **Why:** the most thorough, didactic walkthrough of pivot tables in any free course.

### Microsoft Learn / official docs

- [Create a PivotTable to analyze worksheet data](https://support.microsoft.com/en-us/office/create-a-pivottable-to-analyze-worksheet-data-a9a84538-bfe9-40a9-a8e9-f99134456576) — **Why:** the canonical "first pivot table" reference, complete with the Recommended PivotTables shortcut.
- [Use slicers to filter data](https://support.microsoft.com/en-us/office/use-slicers-to-filter-data-249f966b-a9d5-4b0f-b31a-12651785d29d) — **Why:** slicers + report connections are how you turn a single pivot table into a small dashboard. The same idea reappears in Power BI.
- [Group or ungroup data in a PivotTable](https://support.microsoft.com/en-us/office/group-or-ungroup-data-in-a-pivottable-c9d1ddd0-6580-47d1-82bc-c84a5a340725) — **Why:** date grouping is the single most useful pivot-table feature people miss.
- [Available chart types in Office](https://support.microsoft.com/en-us/office/available-chart-types-in-office-a6187218-807e-4103-9e0a-27cdb19afb90) — **Why:** quick reference for choosing chart type. You will revisit chart *choice* properly in [Month 5, Week 17](../month-05-visualization-powerbi/index.md).

### Videos

- [*Excel PivotTables — From Beginner to Pro*](https://www.youtube.com/watch?v=qIw5UAY-tCk) — Leila Gharani · ~30 min · **Why:** end-to-end, including value-field settings, calculated fields, and the gotchas (blank rows, mixed data types in a column).
- [*PivotTables — Show Values As*](https://www.youtube.com/watch?v=1-NKAVMTFW0) — MyOnlineTrainingHub · ~10 min · **Why:** the *Show Values As* menu (`% of Total`, `Difference From`, `Running Total`) is the feature that turns a pivot table from "summary" into "analysis". Most users never find it.
- [*Slicers and Timelines*](https://www.youtube.com/watch?v=hZF2CC7ahWk) — Excel Campus (Jon Acampora) · ~12 min · **Why:** the cleanest demo of connecting one slicer to multiple pivot tables — the basis of any Excel "dashboard".

### Books / long-form reading

- *Pivot Table Data Crunching* — Bill Jelen ("Mr Excel") & Michael Alexander. Chapters 1–4 this week. **Why:** the canonical pivot-table book; the early chapters cover everything above and a dozen edge cases.
- *Storytelling with Data* — Cole Knaflic (skim chapter 2 only — *choosing an effective visual*). **Why:** keeps you honest before you start building charts. The full read lands in [Month 5](../month-05-visualization-powerbi/index.md).

### Certifications (if relevant)

- **PL-300** — *Visualize and analyze* expects you to recognise when a pivot table / matrix is the right answer and when a chart is. The *Show Values As* options map almost 1:1 to DAX measures (`% of Total`, `YoY Difference`).

## Practice

- **Build the canonical pivot.** Take a transactional dataset (the [`AdventureWorks` Sales sample](https://learn.microsoft.com/en-us/sql/samples/adventureworks-install-configure) or any 5,000+-row table with `Date`, `Category`, `Region`, `Amount`). Build a pivot table with `Category` on Rows, `Year` on Columns (using date grouping), and `Sum of Amount` in Values. This is the analyst's "hello world".
- **Show Values As drill.** From the pivot above, change Values from `Sum` to `% of Column Total`, then to `% of Row Total`, then to `Difference From Previous Year`, then to `Running Total in`. Pause at each and ask: *what business question does this version answer?*
- **Date grouping drill.** Add a second pivot with `Date` (grouped by Month) on Rows and `Sum of Amount` in Values. Ungroup, regroup by Quarter. Notice how the same data answers a different question depending on grain.
- **Slicer drill.** Add a slicer for `Region`. Add a second pivot table on a new sheet using the same Table. Right-click the slicer → *Report Connections* → tick both pivots. Click a region; both update. This is a 5-minute Excel dashboard.
- **Pivot-chart drill.** From the canonical pivot, click *PivotChart* and pick a clustered column chart. Then a stacked column. Then a line. For each, ask: *does this chart answer my business question, or is it just pretty?* Save only the one that does.
- **Layout drill.** Cycle the pivot through *Compact*, *Outline*, and *Tabular* layouts (Design → Report Layout). Notice which works best when copying values out of the pivot into another sheet (hint: tabular).
- **Self-check questions.**
    1. Why does `Sum of Quantity` produce wrong results when one row has `Quantity` stored as text? How would you find which row?
    2. What is the difference between *grouping by Date in the pivot* and *adding a derived `Year` column to the source Table*?
    3. When is a pivot chart a worse choice than a static chart built from the pivot's output?
    4. A slicer is connected to two pivots and one of them updates but the other does not. What is the most likely cause?

## My notes

The mental model: **rows × columns × values × filters**. *Rows* and *Columns* are the dimensions you slice by; *Values* are the measures you summarise; *Filters* are the dimensions you slice on but do not display. This is the same vocabulary you will use in SQL (`GROUP BY` ≈ rows + columns; aggregation function ≈ value-field setting; `WHERE` ≈ filter), in Power BI, and in pandas (`pivot_table(index=, columns=, values=, aggfunc=)`). Once it lands here, it lands everywhere.

The biggest practical trap is that **a pivot table never refreshes itself**. If you change source data and forget to right-click → *Refresh*, the pivot is stale and silently wrong. The fix: source from a Table (not a range), and consider setting the workbook to *Refresh on open* (PivotTable Options → Data).

The second trap is **mixed data types in a column**. One stray `"N/A"` in an `Amount` column and the entire column is treated as text — `Sum` quietly returns zero. Always sanity-check the row count: `COUNT` (numeric only) and `COUNTA` (any non-blank) should match.

Avoid building "Excel dashboards" with slicers as your end goal for the year. The work transfers cleanly to Power BI in [Month 5](../month-05-visualization-powerbi/index.md), where it scales further; treat the slicer-and-pivot dashboard as an intermediate skill, not the final state.

## Further / optional

- [ExcelJet — Pivot tables](https://exceljet.net/glossary/pivot-table) — short reference articles on individual pivot features.
- [Mr Excel — *Pivot Table Tricks* playlist](https://www.youtube.com/@MrExcel) — Bill Jelen's channel; a deep well of pivot-table edge cases.

## Next

→ [Week 8 — Power Query (M)](week-08-power-query.md)
