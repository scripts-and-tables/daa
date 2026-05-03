---
title: Week 8 — Power Query (M)
tags:
  - level::beginner
  - tool::excel
  - tool::powerbi
  - type::hands-on
time_estimate: 6h
status: complete
---

# Week 8 — Power Query (M)

> The single most important tool in the modern Microsoft data stack — and the one most Excel users have never opened. Power Query is a **repeatable, point-and-click ETL engine** built into Excel and Power BI. Learn it once, use it everywhere for the rest of your career.

## Learning objectives

- [ ] Open the Power Query editor from Excel (*Data → Get Data*) and explain the difference between a *connection* and a *loaded table*.
- [ ] Connect to common sources: CSV, Excel workbook, web, folder of files.
- [ ] Apply the core transformations: promote headers, change type, remove rows, split column, replace values, group by, pivot/unpivot, merge, append.
- [ ] Read and lightly edit the underlying **M** code in the formula bar and the *Advanced Editor*.
- [ ] Refresh a query on open and parameterise a file path or folder.
- [ ] Recognise the same Power Query engine in Power BI and Microsoft Fabric Dataflows; queries are portable between them.

## Prerequisites

- [Week 5](week-05-excel-ui-references.md) (Tables) and [Week 6](week-06-lookup-logic-formulas.md) (text + date functions). Power Query replaces most ad-hoc cleanup work that you would have done with formulas.

## Time estimate

Total: ~6h  (Reading: 1h · Video: 2h · Hands-on: 3h)

## Curated resources

### Courses

- [*Excel Skills for Business: Intermediate II*](https://www.coursera.org/learn/excel-intermediate-2) — Macquarie University on Coursera · *free to audit* · Power Query weeks only (~3h) · **Why:** the most accessible course-format intro to Power Query in Excel; same vocabulary as Microsoft Learn.

### Microsoft Learn / official docs

- [Power Query documentation — Microsoft Learn](https://learn.microsoft.com/en-us/power-query/) — **Why:** the canonical entry point. The same docs cover Power Query in Excel, Power BI, and Fabric Dataflows because the engine is identical.
- [Get & Transform in Excel (Power Query)](https://support.microsoft.com/en-us/office/about-power-query-in-excel-7104fbee-9e62-4cb9-a02e-5bfb1a6c536a) — **Why:** the Excel-side overview, with the menu paths and screenshots that Microsoft Learn assumes you know.
- [The Power Query M formula language](https://learn.microsoft.com/en-us/powerquery-m/power-query-m-language-specification) — **Why:** when you start clicking transformations and the formula bar generates `M`, this is the language reference. You do not need to read it cover-to-cover; bookmark and refer to it.
- [Power Query M function reference](https://learn.microsoft.com/en-us/powerquery-m/power-query-m-function-reference) — **Why:** the function-by-function index. The most useful page in the entire Power Query documentation.

### Videos

- [*Excel Power Query Tutorial — Beginner to Pro*](https://www.youtube.com/watch?v=FJxV0jdRzgI) — Leila Gharani · ~30 min · **Why:** the cleanest end-to-end walkthrough: load, transform, merge, refresh. Watch this before reading any docs.
- [*Combine Files from a Folder with Power Query*](https://www.youtube.com/watch?v=GnYQDFm_8B0) — Leila Gharani · ~12 min · **Why:** the *folder source* pattern is the killer feature. Drop a new monthly CSV into a folder; refresh the query; it appears. This single pattern replaces hours of monthly copy-paste work.
- [*Unpivot Data with Power Query*](https://www.youtube.com/watch?v=7pucKLgDpzU) — MyOnlineTrainingHub · ~8 min · **Why:** unpivoting (wide-to-long reshape) is unique to Power Query; impossible cleanly with formulas. Worth seeing once to know it exists.
- [*Power Query — The M Language*](https://www.youtube.com/watch?v=O4Hifq3vJaA) — Curbal (Ruth Pozuelo Martinez) · ~15 min · **Why:** demystifies the M code in the Advanced Editor. After this you will read `let … in` blocks without panic.

### Books / long-form reading

- *M Is for (Data) Monkey* — Ken Puls & Miguel Escobar (read chapters 2–5 this week; chapter 1 was Week 6). **Why:** the canonical Power Query book. The authors run [PowerQuery.Training](https://www.powerquery.training/); this is the most rigorous treatment in print.
- *Master Your Data with Power Query in Excel and Power BI* — Ken Puls & Miguel Escobar. The follow-up to *M Is for (Data) Monkey*; covers Power BI integration. Skim now, return to in [Month 5](../month-05-visualization-powerbi/index.md).

### Certifications (if relevant)

- **PL-300** — *Prepare the data* domain is largely a Power Query exam. Most exam questions about data ingestion, type conversion, and shaping are answered by clicking the right Power Query menu. This week is the highest-leverage Power BI prep you can do.

## Practice

- **Single CSV.** Download a public CSV (UK road accidents, Spotify charts, anything). Load it via *Data → From Text/CSV*. Promote headers, change types, remove rows where a key column is null. Note the *Applied Steps* panel — every click is a reproducible step.
- **Folder of CSVs.** Drop three monthly sales CSVs into a folder. *Data → Get Data → From File → From Folder*. Combine. Notice the auto-generated *Sample File* function — that is M code generated for you. Add a fourth CSV to the folder; refresh; it appears in the loaded table.
- **Merge (= SQL join).** Take a `Sales` table and a `Products` table from your Week 6 work. *Home → Merge Queries → as New*. Inner join on `ProductID`. Expand the joined table to bring in `ProductName` and `Category`. Compare to your `XLOOKUP` from Week 6: which is more maintainable?
- **Append (= SQL `UNION ALL`).** Stack two structurally-identical tables into one. Useful when monthly data arrives as a separate file but the schema is the same.
- **Pivot / unpivot.** Take a wide table — *Year | Q1 | Q2 | Q3 | Q4* — and unpivot the four quarter columns into a long *Year | Quarter | Value* shape. This is the move that lets you charge into pivot tables, Power BI, and pandas. Almost every pivot-table or visualisation problem becomes easy if your data is *long*.
- **Read the M.** Open the *Advanced Editor* on any of the queries above. The body is `let … in`. Find one step and modify the column name in the M code instead of clicking. Re-run; observe.
- **Refresh on open.** *Query Properties → Refresh data when opening the file*. Save. Re-open. Observe the data refresh. This is what makes a Power Query workbook a *small ETL pipeline*.
- **Self-check questions.**
    1. What is the difference between a *Connection only* query and a *Loaded* query? When would you use each?
    2. Why is changing the column type the *first* step you should do after promoting headers, not the last?
    3. The *Combine Files* feature creates several auto-generated objects (Sample File, Transform Sample File, Helper queries). What are they and why is that pattern there?
    4. How would you parameterise a folder path so that the same workbook works on your laptop and a colleague's?
    5. Power Query and Power BI use the *same* Power Query engine. What practical implication does that have for [Month 5](../month-05-visualization-powerbi/index.md)?

## Month-end mini-project (now is the time)

This is the closing week of Month 2; do the [Month 2 mini-project](index.md#mini-project) before opening Month 3. Constraint: the entire project should refresh with one click — no manual paste, no formula extension. If something breaks when source data changes, fix the underlying query, not the symptom.

## My notes

If you remember nothing else from this month: **Power Query is the same engine in Excel, Power BI, and Microsoft Fabric Dataflows**. A query you build in Excel today can be lifted into Power BI in [Month 5](../month-05-visualization-powerbi/index.md) with copy-paste of the M code. This portability is unusual in the Microsoft data stack and worth exploiting deliberately.

The mental model worth internalising is **"data flow as ordered steps"**. Each click in the Power Query UI is a *step* in the *Applied Steps* panel; the panel is a tiny program. You can rename, reorder, delete, and edit steps. Once that lands, you stop thinking of cleanup as "fixing a sheet" and start thinking of it as "a recipe I run on whatever arrives". This mental shift is exactly what dbt formalises in [Month 9](../month-09-etl-elt-pipelines/index.md); Power Query is your introduction to it.

The *Advanced Editor* is intimidating once and then unremarkable. M is a functional, quirky language — but for everyday cleanup you will only need to recognise `let … in`, `Table.SelectRows`, `Table.AddColumn`, and a handful of others. The function reference is the only page you need bookmarked.

The thing not to do this week is **VBA**. VBA is still useful in legacy contexts, but for the work this curriculum prepares you for, Power Query is strictly better: visible, reproducible, refreshable, and portable to Power BI and Fabric. If a tutorial reaches for VBA for ETL work, prefer the Power Query equivalent.

## Further / optional

- [PowerQuery.Training](https://www.powerquery.training/) — Ken Puls & Miguel Escobar's training site; some free articles, more depth than the book.
- [Curbal — Power Query playlist](https://www.youtube.com/@CurbalEN/playlists) — Ruth Pozuelo Martinez's Power Query series; excellent and free.
- [The Definitive Guide to Power Query (M)](https://www.powerquery.training/portfolio/the-definitive-guide-to-power-query-m/) — slightly older but still the deepest free single-page M reference.

## Next

→ Close out [Month 2](index.md#mini-project) by completing the mini-project, then start [Month 3 — SQL Fundamentals](../month-03-sql-fundamentals/index.md).
