# Day 1 — Excel

**Duration:** 4 hours
**Prerequisites:** none (assumes you've opened a spreadsheet before, nothing more)
**Learning goals:** by end of day you can confidently open a messy CSV, clean it, build pivot tables and charts to answer business questions, and write the 5 most useful Excel formulas for analytics work.

## Agenda

| Time | Block | Topic |
|---|---|---|
| 00:00–00:50 | Hour 1 — Concepts + demo | Workbook navigation, data types, Tables, sorting/filtering |
| 00:50–01:00 | Break | |
| 01:00–01:50 | Hour 2 — Formulas | `XLOOKUP`, `IF`/`IFS`, `SUMIFS`/`COUNTIFS`, dates |
| 01:50–02:00 | Break | |
| 02:00–02:50 | Hour 3 — Pivots + charts | Pivot tables, pivot charts, conditional formatting |
| 02:50–03:00 | Break | |
| 03:00–04:00 | Hour 4 — Capstone | Apply to Olist data ([`capstone/day1_excel/`](../../capstone/day1_excel/README.md)) |

## What you'll be able to do

By the end of today, given a CSV of orders you've never seen before, you can:

- Open it in Excel without breaking the date columns
- Convert it to a Table (`Ctrl+T`) so formulas auto-expand
- Filter and sort to spot weird rows
- Write `XLOOKUP` to join two sheets
- Use `SUMIFS` to answer "total revenue by category"
- Build a pivot table summarizing it by any dimension
- Make a bar chart that doesn't look ugly

## Key concepts

### 1. Tables, not ranges

Convert any data to a Table with `Ctrl+T`. Then:
- Formulas auto-extend to new rows
- Column headers freeze automatically
- You can reference columns by name: `=SUM(Sales[Revenue])` instead of `=SUM(B2:B1000)`

**Rule of thumb:** if data has headers and rows, make it a Table. Always.

### 2. The 5 formulas worth knowing

| Formula | What it does | Example |
|---|---|---|
| `XLOOKUP` | Find a value in one column, return the matching value from another. Replaces `VLOOKUP`. | `=XLOOKUP(A2, Customers[ID], Customers[Name])` |
| `IF` / `IFS` | Branch based on a condition. | `=IFS(A2>100, "big", A2>10, "medium", TRUE, "small")` |
| `SUMIFS` | Sum a column where multiple conditions are true. | `=SUMIFS(Sales[Revenue], Sales[Region], "NE", Sales[Year], 2024)` |
| `COUNTIFS` | Count rows matching multiple conditions. | `=COUNTIFS(Orders[Status], "shipped")` |
| `TEXT` | Format a number or date as text. | `=TEXT(A2, "yyyy-mm")` to get month from a date |

### 3. Pivot tables

The fastest way to answer "X by Y" in Excel. Select your Table → Insert → PivotTable.

- **Rows:** what you want to group by (e.g., category)
- **Columns:** optional second grouping (e.g., year)
- **Values:** what you want to summarize (e.g., revenue — sum, count, or average)
- **Filters:** dimensions you want to slice on

**Pro tip:** drag a date field to Rows and Excel auto-groups by Year/Quarter/Month. Right-click to choose grouping.

### 4. Date columns

Excel's #1 source of pain. CSVs often have dates as text. Fix it:
- Select the column → Data → Text to Columns → Next → Next → choose date format
- Or use `DATEVALUE()` in a helper column

**Always check:** sort the date column ascending. Do the dates actually look chronological? If "12/01" sorts between "11/30" and "12/02", you're good. If it sorts as text, fix it now or pay later.

### 5. Conditional formatting (used sparingly)

Highlight cells that meet a condition (e.g., negative numbers red). Useful for spotting outliers in 100s of rows. **Don't overdo it** — a rainbow spreadsheet is harder to read than a plain one.

## Exercises

See [`exercises/`](exercises/README.md) — 4 small drills, ~15 minutes each. Solutions in [`solutions/`](solutions/README.md) (only peek when stuck).

## Capstone task for today

See [`../../capstone/day1_excel/README.md`](../../capstone/day1_excel/README.md).

## Common pitfalls

- **CSVs opened by double-click sometimes mangle dates.** Use Data → Get Data → From Text/CSV for safer import.
- **Pivot tables don't auto-refresh.** Right-click → Refresh after changing source data.
- **`VLOOKUP` only looks right.** Use `XLOOKUP` instead — it's strictly better.
- **Don't merge cells.** Ever. Merged cells break pivots, filters, sorts, and your soul.
