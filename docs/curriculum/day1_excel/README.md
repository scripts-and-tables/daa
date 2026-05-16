<div class="hero-day" data-day="1" markdown>
<div class="hero-day__icon" markdown>:material-microsoft-excel:</div>
<div class="hero-day__copy" markdown>
<p class="hero-day__eyebrow">Day 1 of 5 · 4 hours</p>

# Excel — the foundation {: .hero-day__title }

<p class="hero-day__sub">Open a messy CSV, clean it, pivot it. Five lessons take you from "I've used Excel a few times" to writing the formulas every later tool builds on.</p>
</div>
</div>

**Duration:** 4 hours
**Prerequisites:** none (assumes you've opened a spreadsheet before, nothing more)
**Learning goals:** by end of day you can confidently open a messy CSV, clean it, write the formulas that matter for analytics work, build pivot tables and charts to answer business questions, and join two sheets together with `XLOOKUP`.

## Why start with Excel?

Most analytics work in companies still happens in spreadsheets. SQL and Python are faster at scale, but Excel is what your stakeholder will open on their laptop, what HR will hand you for the headcount review, and what marketing will paste survey results into.

By the end of today you'll know the Excel patterns that matter — the seven aggregation functions, the conditional logic family, lookups, dates, and pivots — and you'll have applied them to ~100k rows of real Olist e-commerce data. Tomorrow (SQL) does the same operations on millions of rows.

## Agenda

| Time | Block | What you'll work on |
|---|---|---|
| 00:00–00:50 | Hour 1 — Foundations | [Lesson 1 — Tables & references](01_tables.md), [Lesson 2 — Math & aggregation](02_aggregation.md) |
| 00:50–01:00 | Break | |
| 01:00–01:50 | Hour 2 — Formulas that earn their keep | [Lesson 3 — Logic & lookups](03_logic_lookups.md) |
| 01:50–02:00 | Break | |
| 02:00–02:50 | Hour 3 — Cleaning, dates, and pivots | [Lesson 4 — Dates, text, and cleaning](04_dates_cleaning.md), [Lesson 5 — Pivot tables & charts](05_pivots.md) |
| 02:50–03:00 | Break + [self-test](test.md) | |
| 03:00–04:00 | Hour 4 — Capstone | [Apply to Olist data](../../capstone/day1_excel/README.md) |

## What you'll be able to do

By the end of today, given a CSV of orders you've never seen before, you can:

- Open it in Excel without breaking the date columns
- Convert it to a Table (`Ctrl+T`) so formulas auto-expand
- Filter and sort to spot weird rows
- Write `XLOOKUP` to join two sheets
- Use `IFERROR` to handle missing data without your formulas going red
- Use `SUMIFS` / `COUNTIFS` to answer "total revenue by category", "count of orders by status"
- Build a pivot table summarising it by any dimension
- Add a slicer so a stakeholder can filter the pivot without touching a formula
- Make a bar chart that doesn't look ugly

## The five lessons

| # | Lesson | Headline skills |
|---|---|---|
| 1 | [Tables & references](01_tables.md) | `Ctrl+T`, `[@col]`, `Sales[Revenue]`, `$A$1` vs `A$1`, sort/filter/freeze |
| 2 | [Math & aggregation](02_aggregation.md) | `SUM`, `AVERAGE`, `COUNT` vs `COUNTA`, `MIN`/`MAX`, `ROUND`, % patterns |
| 3 | [Logic & lookups](03_logic_lookups.md) | `IF`, `IFS`, `IFERROR`, `SUMIFS`/`COUNTIFS`/`AVERAGEIFS`, **`XLOOKUP`** |
| 4 | [Dates, text & cleaning](04_dates_cleaning.md) | Date arithmetic, `TEXT`, `TRIM`, Flash Fill, Text-to-Columns |
| 5 | [Pivot tables & charts](05_pivots.md) | Build from a Table, slicers, date grouping, pivot charts |

Each lesson is 25–40 minutes and ends with a collapsible "Try it yourself" drill plus a list of pitfalls. Work through them in order — Lesson 3 builds on Lesson 1, and the capstone uses formulas from every lesson.

## Test yourself

Before the capstone, run the **[self-test](test.md)** — twelve questions, ~15 minutes, collapsible answers. Treat it as the gate-check: if you can't write the `XLOOKUP`/`IFERROR`/date-subtraction formulas from memory, re-read the relevant lesson before opening the Olist data.

## Capstone task for today

See **[the Day 1 capstone](../../capstone/day1_excel/README.md)**. You'll load two Olist CSVs into Excel, derive `delivery_days`, join Orders to Reviews with `XLOOKUP`, and build two pivot tables to first-scope the capstone question: *"which sellers and product categories are driving low customer satisfaction, and what's the financial impact?"*

## Common pitfalls (a preview)

Each lesson has its own pitfalls section. Three you'll meet today no matter what:

- **CSVs opened by double-click sometimes mangle dates.** Use **Data → Get Data → From Text/CSV** for safer import.
- **Pivot tables don't auto-refresh.** Right-click → Refresh after changing source data.
- **Don't merge cells.** Ever. Merged cells break pivots, filters, sorts, and your soul.
