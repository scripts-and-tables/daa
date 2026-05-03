---
title: Week 6 — Lookup & logic formulas
tags:
  - level::beginner
  - tool::excel
  - type::hands-on
time_estimate: 6h
status: complete
---

# Week 6 — Lookup & logic formulas

> The formulas you will reach for every working day. `XLOOKUP`, `INDEX/MATCH`, `IFS`, the modern dynamic-array functions (`FILTER`, `SORT`, `UNIQUE`), and the text/date functions that make ETL-style cleanup possible without leaving the workbook.

## Learning objectives

- [ ] Use `XLOOKUP` for the common case and explain why it replaces both `VLOOKUP` and `HLOOKUP`.
- [ ] Use `INDEX/MATCH` as a fallback when `XLOOKUP` is not available, and recognise its match modes.
- [ ] Use `IF`, `IFS`, `SWITCH`, and the logical functions `AND` / `OR` / `NOT` correctly.
- [ ] Use the dynamic-array functions: `FILTER`, `SORT`, `UNIQUE`, `SEQUENCE`.
- [ ] Use core text functions (`TEXT`, `TEXTSPLIT`, `TEXTJOIN`, `LEFT`/`RIGHT`/`MID`, `LEN`, `TRIM`) and date functions (`EOMONTH`, `WEEKDAY`, `DATEDIF`, `EDATE`).

## Prerequisites

- [Week 5 — Excel UI & references](week-05-excel-ui-references.md). Especially Tables and structured references — every formula here will reference Tables, not raw ranges.

## Time estimate

Total: ~6h  (Reading: 1h · Video: 2h · Hands-on: 3h)

## Curated resources

### Courses

- [*Excel Skills for Business: Essentials*](https://www.coursera.org/learn/excel-essentials) — Macquarie University on Coursera · *free to audit* · weeks 4–6 (~8h, skim to ~3h) · **Why:** the formula-heavy half of the course you started in Week 5.

### Microsoft Learn / official docs

- [`XLOOKUP` function](https://support.microsoft.com/en-us/office/xlookup-function-b7fd680e-6d10-43e6-84f9-88eae8bf5929) — **Why:** the canonical reference, with all six arguments explained and examples for exact match, approximate match, and reverse search.
- [`FILTER` function](https://support.microsoft.com/en-us/office/filter-function-f4f7cb66-82eb-4767-8f7c-4877ad80c759) — **Why:** the most useful dynamic-array function; replaces complex array formulas with a single readable expression.
- [Overview of formulas in Excel](https://support.microsoft.com/en-us/office/overview-of-formulas-in-excel-ecfdc708-9162-49e8-b993-c311f47ca173) — **Why:** the Microsoft master index for all formula functions; bookmark it.
- [Date and time functions (reference)](https://support.microsoft.com/en-us/office/date-and-time-functions-reference-fd1b5961-c1ae-4677-be58-074152f97b81) — **Why:** the canonical date-function index. Date arithmetic in Excel is full of traps (1900 vs 1904 epoch, fractional days for time); this page is the reference.
- [Text functions (reference)](https://support.microsoft.com/en-us/office/text-functions-reference-cccd86ad-547d-4ea9-a065-7bb697c2a56e) — **Why:** index of every text function, including the modern `TEXTSPLIT` / `TEXTJOIN` / `TEXTBEFORE` / `TEXTAFTER` family.

### Videos

- [*XLOOKUP — The Best Excel Function*](https://www.youtube.com/watch?v=fqhQqrkbzgs) — Leila Gharani · ~12 min · **Why:** end-to-end XLOOKUP including reverse search, approximate match, and the not-found argument that prevents `#N/A` cascades.
- [*VLOOKUP vs INDEX/MATCH vs XLOOKUP*](https://www.youtube.com/watch?v=jBcRedGT3LQ) — MyOnlineTrainingHub · ~14 min · **Why:** the side-by-side comparison that explains *why* `VLOOKUP` is on its way out, in case you have to read someone else's older spreadsheet.
- [*Dynamic Arrays in Excel*](https://www.youtube.com/watch?v=_QwLR4QSE6w) — ExcelIsFun · ~20 min · **Why:** the spilling behaviour, the `@` implicit-intersection operator, and `FILTER`/`SORT`/`UNIQUE` in one sitting.

### Books / long-form reading

- *Excel 2021 Bible* — Michael Alexander & Dick Kusleika (chapters on formulas and functions, ~chapters 11–18). Use as a reference, not a read-through.
- [*Practical Excel*](https://exceljet.net/key-functions) on ExcelJet — short focused articles per function, with one realistic example each.

### Certifications (if relevant)

- **PL-300** — *Prepare the data* and *Model the data* expect fluency with these formulas before you load data into Power BI. The skills overlap directly with M / Power Query in [Week 8](week-08-power-query.md).

## Practice

- **`XLOOKUP` drill.** Build a two-table workbook: a `Products` table with `ProductID` / `Name` / `Price`, and a `Sales` table with `SaleID` / `ProductID` / `Quantity`. In `Sales`, add a column `ProductName` that pulls from `Products` using `XLOOKUP`. Now add a `LineTotal` column. Then handle the not-found case: what should `ProductName` show if the `ProductID` is missing in `Products`?
- **`IF`/`IFS` drill.** Add a `Discount` column to `Sales` with this rule: 0% if `Quantity < 10`, 5% if `10 ≤ Quantity < 50`, 10% otherwise. Write it once with nested `IF`, once with `IFS`, once with `SWITCH`. Notice which is most readable.
- **Dynamic-array drill.** On a fresh sheet, write `=UNIQUE(Sales[ProductID])`. Watch it spill. Then `=SORT(UNIQUE(Sales[ProductID]))`. Then `=FILTER(Sales, Sales[Quantity]>20)`. The single-cell formula returning a whole table is the point.
- **Text-cleanup drill.** Take a column of badly-formatted names — `"  jane Doe "`, `"JOHN smith"`, `"Mary  O'Brien "`. Use `TRIM`, `PROPER`, and `SUBSTITUTE` to normalise. Then split *FullName* into *First* and *Last* using `TEXTSPLIT` or `TEXTBEFORE`/`TEXTAFTER`.
- **Date drill.** Given a column of `OrderDate`, compute: month-end (`EOMONTH`), day of week (`TEXT(date,"dddd")` or `WEEKDAY`), days since order (`TODAY()-date`), and the same date one year later (`EDATE(date,12)`).
- **Self-check questions.**
    1. What is the *fifth* argument of `XLOOKUP` and why does it matter?
    2. Why is `INDEX/MATCH` still worth knowing if `XLOOKUP` exists?
    3. When does a dynamic-array formula spill, and what is the `@` implicit-intersection operator for?
    4. Excel stores dates as numbers. What integer is `2024-01-01`, and why does that matter for date arithmetic?

## My notes

`XLOOKUP` is one of the cleanest API additions Excel has ever made. It collapses `VLOOKUP`, `HLOOKUP`, `INDEX/MATCH`, and the *not-found* `IFERROR` wrapper into one function with named arguments. If you have Microsoft 365 or Excel 2021+, default to `XLOOKUP` for everything.

The reason `INDEX/MATCH` is still on the curriculum is **legacy spreadsheets**. You will inherit workbooks built before `XLOOKUP` existed, and you will need to read them. Spend the time to understand the two-function decomposition; it also generalises better than `XLOOKUP` does for the rare two-dimensional lookup case.

`IFS` and `SWITCH` are aesthetics. They produce cleaner formulas than nested `IF`s but compute the same thing. Reach for them when readability matters — i.e. always, for formulas anyone else will read.

Dynamic arrays are the most underused recent feature. Once you internalise that a single formula can spill into many cells, half of your previous "pivot table for the simple case" workflows become a one-line `FILTER`.

The Excel date-as-number model trips up everyone once. The integer `45292` is `2024-01-01`. Times are fractions of a day. Subtracting two dates gives an integer day count. Once that lands, `DATEDIF`, `EOMONTH`, and `WEEKDAY` all stop feeling magical.

## Further / optional

- [ExcelJet — formula examples](https://exceljet.net/formulas) — searchable, indexed by function. The best fast-reference on the web.
- *M Is for (Data) Monkey* — Ken Puls & Miguel Escobar (chapter 1 only this week). The full read lands in [Week 8 — Power Query](week-08-power-query.md).

## Next

→ [Week 7 — Pivot tables & charts](week-07-pivot-tables-charts.md)
