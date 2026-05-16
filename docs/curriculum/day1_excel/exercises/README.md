# Day 1 — Exercises

These drills use small sample data (you'll create or paste it in). The Olist capstone is separate — see [`../../../capstone/day1_excel/`](../../../capstone/day1_excel/README.md).

Time per exercise: ~15 minutes.

---

## Exercise 1 — Tables and basic formulas

Paste this data into a new sheet, starting at A1:

| OrderID | Customer | Region | Revenue |
|---|---|---|---|
| 1 | Acme | NE | 1200 |
| 2 | Beta | NW | 800 |
| 3 | Acme | NE | 450 |
| 4 | Gamma | SE | 2100 |
| 5 | Beta | NW | 300 |
| 6 | Acme | SE | 600 |

**Tasks:**
1. Convert it to a Table (`Ctrl+T`). Name the table `Orders`.
2. In cell F1, write a formula that gives total revenue across all orders.
3. In cell F2, write a formula that gives total revenue **for region NE only**.
4. In cell F3, count how many orders Acme placed.

---

## Exercise 2 — XLOOKUP

Add a second sheet with this lookup:

| Region | Manager |
|---|---|
| NE | Alice |
| NW | Bob |
| SE | Carol |

**Tasks:**
1. Back in the Orders sheet, add a column `Manager` that uses `XLOOKUP` to find the manager for each order's region.
2. Add a column `RegionDescription` that returns "Northeast" / "Northwest" / "Southeast" — use `IFS` (no extra lookup table).

---

## Exercise 3 — Dates

Paste this data into a new sheet:

| Date | Amount |
|---|---|
| 2024-01-15 | 100 |
| 2024-01-22 | 250 |
| 2024-02-03 | 175 |
| 2024-02-19 | 90 |
| 2024-03-08 | 300 |
| 2024-03-25 | 200 |

**Tasks:**
1. Confirm the Date column is being treated as dates, not text (sort it ascending; the order should be chronological).
2. Add a column `YearMonth` showing `2024-01`, `2024-02`, etc. — use `TEXT(A2, "yyyy-mm")`.
3. Use `SUMIFS` to total the amount for `2024-02` in a single cell.

---

## Exercise 4 — Pivot table + chart

Use the Orders table from Exercise 1.

**Tasks:**
1. Insert a pivot table summarizing **total revenue by Region**.
2. Add Customer as a second row dimension (so each region is broken down by customer).
3. Insert a pivot chart (bar chart) showing the same data.
4. Add a slicer for Region. Click it — confirm the chart updates.

---

When you finish, peek at [`../solutions/README.md`](../solutions/README.md) to compare. Then move on to the capstone.
