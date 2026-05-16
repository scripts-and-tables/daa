# Day 1 — Solutions

Only look here after attempting the exercises yourself.

---

## Exercise 1 — Tables and basic formulas

After `Ctrl+T` and naming the table `Orders`:

| Cell | Formula |
|---|---|
| F1 | `=SUM(Orders[Revenue])` |
| F2 | `=SUMIFS(Orders[Revenue], Orders[Region], "NE")` |
| F3 | `=COUNTIFS(Orders[Customer], "Acme")` |

Expected results: F1 = 5450, F2 = 1650, F3 = 3.

---

## Exercise 2 — XLOOKUP

In a new column on the Orders table:

```
Manager:           =XLOOKUP([@Region], Lookup[Region], Lookup[Manager])
RegionDescription: =IFS([@Region]="NE","Northeast", [@Region]="NW","Northwest", [@Region]="SE","Southeast")
```

Note the `[@Region]` syntax — this is how you reference "the Region value in the current row" inside a Table.

---

## Exercise 3 — Dates

If the date column was imported as text (sorting puts `2024-02-03` between `2024-01-22` and `2024-01-15`), select the column → Data → Text to Columns → Next → Next → choose "YMD" date format → Finish.

```
YearMonth:    =TEXT(A2, "yyyy-mm")
Feb 2024 sum: =SUMIFS(B:B, A:A, ">=2024-02-01", A:A, "<2024-03-01")
```

Or, using the YearMonth helper column:

```
=SUMIFS(B:B, C:C, "2024-02")
```

Expected: 265 (175 + 90).

---

## Exercise 4 — Pivot table + chart

1. Select the Orders table → Insert → PivotTable → New worksheet.
2. Drag fields:
   - **Rows:** Region, then Customer (in that order)
   - **Values:** Revenue (Excel defaults to Sum, which is what we want)
3. Insert → PivotChart → Clustered Bar.
4. PivotTable Analyze tab → Insert Slicer → check Region.

The slicer should filter both the table and the chart simultaneously.

**Bonus check:** sum at the bottom of the pivot should equal F1 from Exercise 1 (5450). If it doesn't, something's wrong.
