---
title: Week 5 — Excel UI & references
tags:
  - level::beginner
  - tool::excel
  - type::hands-on
time_estimate: 6h
status: complete
---

# Week 5 — Excel UI & references

> Excel done properly. Most self-taught users hit a productivity ceiling because they never learn the three things that separate competent users from beginners: **absolute vs relative references**, **named ranges**, and **structured references on Tables**. This week fixes that.

## Learning objectives

- [ ] Navigate the Excel ribbon, name box, formula bar, and status bar without hunting.
- [ ] Use absolute (`$A$1`), relative (`A1`), and mixed (`$A1`, `A$1`) references correctly, and predict how each behaves when copied.
- [ ] Convert a flat range into an Excel **Table** and use **structured references** (`Table1[Column]`) instead of `A2:A1000`.
- [ ] Define and use **named ranges** for clarity in formulas.
- [ ] Use Flash Fill, Quick Analysis, and the keyboard shortcuts that experienced analysts rely on.

## Prerequisites

- A working install of Excel (Microsoft 365, Excel 2021+, or Excel for the web). Older versions are missing functions that come up in [Week 6](week-06-lookup-logic-formulas.md).
- [Month 1](../month-01-foundations/index.md), particularly the data-types vocabulary.

## Time estimate

Total: ~6h  (Reading: 1h · Video: 2h · Hands-on: 3h)

## Curated resources

### Courses

- [Microsoft 365 Excel video training — Microsoft Support](https://support.microsoft.com/en-us/office/excel-video-training-9bc05390-e94c-46af-a5b3-d7c22f6990bb) — *free* · ~2h · **Why:** Microsoft's own short-format training; covers the ribbon, basic formulas, and Tables in the same vocabulary as the certification exams.
- [*Excel Skills for Business: Essentials*](https://www.coursera.org/learn/excel-essentials) — Macquarie University on Coursera · *free to audit* · ~25h (skim weeks 1–3) · **Why:** the cleanest published "from zero" Excel course. Stop after week 3; weeks 4–6 land in [Week 6](week-06-lookup-logic-formulas.md).

### Microsoft Learn / official docs

- [Overview of Excel tables](https://support.microsoft.com/en-us/office/overview-of-excel-tables-7ab0bb7d-3a9e-4b56-a3c9-6c94334e492c) — **Why:** the definitive reference. Tables (`Ctrl+T`) are the single biggest productivity unlock in Excel; structured references make formulas self-documenting and auto-extending.
- [Use cell references in a formula](https://support.microsoft.com/en-us/office/use-cell-references-in-a-formula-fe137a9d-1c6f-4f2d-9e78-9d24a006e092) — **Why:** the absolute / relative / mixed reference page, with the screenshots most beginners eventually find by accident.
- [Define and use names in formulas](https://support.microsoft.com/en-us/office/define-and-use-names-in-formulas-4d0f13ac-53b7-422e-afd2-abd7ff379c64) — **Why:** named ranges turn `=B7*C7` into `=Quantity*Price`. Worth the five minutes.

### Videos

- [*Excel Tables Tutorial*](https://www.youtube.com/watch?v=fJa4VdjV8q4) — ExcelIsFun (Mike Girvin) · ~12 min · **Why:** the canonical "why Tables matter" walkthrough. Mike Girvin has been teaching Excel for two decades; his content is the most rigorous on YouTube.
- [*Absolute, Relative, and Mixed References*](https://www.youtube.com/watch?v=MFqz7nntmcs) — Leila Gharani · ~10 min · **Why:** the sharpest 10-minute explanation of the dollar-sign rules; her diagrams stick.
- [*Top 10 Excel Keyboard Shortcuts*](https://www.youtube.com/watch?v=h0iVHJUSPGI) — Leila Gharani · ~12 min · **Why:** every shortcut here will save you an hour a week. Learn `Ctrl+T`, `Ctrl+Shift+L`, `Ctrl+Arrow`, `F4`, `Ctrl+;`.

### Books / long-form reading

- *Excel 2021 Bible* — Michael Alexander & Dick Kusleika (chapters 1–6 this week). **Why:** the comprehensive Excel reference; the early chapters are the most thorough "navigate the UI" reading you can find. Skim, do not read every line.

### Certifications (if relevant)

- **PL-300** — *Prepare the data* expects you to import from Excel into Power BI and to recognise structured references. This week locks that in.

## Practice

- **F4 drill.** Open a blank workbook. In `B2`, type `=A2`. Copy down ten rows. Note that the reference auto-adjusts — that is *relative*. Now in `D2`, type `=$A$2`. Copy down. Note that nothing changes — that is *absolute*. Repeat with `$A2` and `A$2` to feel the *mixed* cases. Press **F4** while editing a reference to cycle through all four styles.
- **Tables drill.** Take any flat dataset (the [Sample sales data](https://learn.microsoft.com/en-us/power-bi/create-reports/sample-financial-download) on Microsoft Learn works). Select all of it and press `Ctrl+T`. Rename the table to something meaningful (`Sales`). Add a calculated column that uses `[@Column]` syntax. Add a new row at the bottom — note the formula auto-extends. This is why Tables matter.
- **Named ranges drill.** Define a name `TaxRate` referring to a single cell containing `0.21`. Use it in a formula somewhere else: `=Subtotal*TaxRate`. Change the cell value; watch every dependent formula update. Now do the same with a multi-cell name like `Prices`.
- **Flash Fill.** In column A, type ten full names ("Jane Doe", "John Smith", …). In `B1`, type "Jane". Press `Ctrl+E`. Excel infers the pattern — first names extracted instantly. Repeat with email-prefix extraction, capitalisation, date reformatting.
- **Self-check questions.**
    1. Why does `=$A1` behave differently when copied *down* versus *across*?
    2. What happens if you delete a row inside a Table that a formula in another sheet refers to via structured reference?
    3. When is a named range a *worse* choice than a structured reference?

## My notes

The single biggest unlock is **Tables (`Ctrl+T`)**. Most spreadsheets you inherit are *flat ranges*, which means every formula is hard-coded against `A2:A1000` and breaks the moment a row is added. Convert to a Table once and the formulas become `=SUM(Sales[Amount])` — self-documenting, self-extending, and impossible to break by inserting a row.

The second unlock, less obvious, is **stop using the mouse for selection**. `Ctrl+Shift+End` to grab a region. `Ctrl+Arrow` to jump to the end of contiguous data. Once these are muscle memory, everything else gets faster. Leila Gharani's shortcut video is the place to start; do the keystrokes alongside the video, not just watch.

Avoid the rabbit hole of VBA macros at this stage. Power Query ([Week 8](week-08-power-query.md)) does almost everything you would have reached for VBA to do, more readably and without the macro-security warnings.

## Further / optional

- [ExcelJet](https://exceljet.net/) — searchable index of Excel formulas with clear examples. Better as a reference than a tutorial.
- [Chandoo](https://chandoo.org/) — long-running Excel blog; mixed quality but the dashboard tutorials are excellent.
- *Mr Spreadsheet's 101 Best Excel Tips & Tricks* — John Walkenbach. Skim once for the dozen tricks you didn't know existed.

## Next

→ [Week 6 — Lookup & logic formulas](week-06-lookup-logic-formulas.md)
