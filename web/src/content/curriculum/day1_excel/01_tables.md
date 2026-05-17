# Lesson 1 — Tables & references

**Time:** ~30 min.
**You'll be able to:**

- Open a CSV in Excel without breaking dates or row counts
- Turn any rectangle of data into a Table (`Ctrl+T`) so formulas auto-extend
- Reference data by name (`Orders[Revenue]`, `[@order_id]`) instead of fragile cell coords (`B2`, `$B$1:$B$1000`)
- Read the four reference styles (`A1`, `$A1`, `A$1`, `$A$1`) and know when each one is right
- Sort, filter, freeze, and find-and-replace your way around a sheet that won't fit on one screen

## The unit of analysis: a Table, not a range

A **range** is "cells B2 through G500". A **Table** is "the Orders dataset, which currently has 499 rows." The difference matters once your data grows:

- Formulas extend automatically when new rows arrive.
- Column headers freeze when you scroll.
- You reference columns by name, so renaming a column doesn't break every formula downstream.
- Pivot tables and charts that point at a Table auto-pick-up new rows.

**Rule of thumb:** if data has a header row and consistent columns, make it a Table. Always. Before you write any formula.

### How to do it

1. Click anywhere inside the data.
2. `Ctrl+T` (Mac: `Cmd+T`).
3. In the dialog, leave "My table has headers" checked. Click OK.
4. On the **Table Design** tab (Mac: Table tab), give it a real name. `Orders`, not `Table1`. Always rename — `Table7` six weeks from now means nothing.

The data is now a Table. It looks the same but behaves differently.

## Structured references

Inside a Table, you stop using `B2:B500` and start using names.

| What you mean | How you write it |
|---|---|
| The entire `Revenue` column | `Orders[Revenue]` |
| The Revenue cell in **this row** (inside a Table formula) | `[@Revenue]` |
| The header of the Revenue column | `Orders[[#Headers],[Revenue]]` (rare) |
| Two columns at once | `Orders[[Revenue]:[Cost]]` |

The two you'll write 95% of the time are `TableName[Column]` and `[@Column]`.

```
=SUM(Orders[Revenue])
=[@Revenue] - [@Cost]
=XLOOKUP([@order_id], Reviews[order_id], Reviews[review_score])
```

**Why this matters for the capstone:** every formula you'll write on Day 1's capstone uses `[@field]` — `delivery_days`, `review_score`, the lot. Get fluent here and the capstone becomes mechanical.

## When you still need `$A$1`-style references

Inside a Table, structured references handle everything. Outside a Table — or when referencing a single fixed cell from anywhere — you still need the classic style.

| Syntax | What's locked when you drag the formula | Use when |
|---|---|---|
| `A1` | Nothing | You want both row and column to shift |
| `$A1` | Column only | Dragging across columns; the column source is fixed |
| `A$1` | Row only | Dragging down rows; the row source is fixed (e.g., a header row) |
| `$A$1` | Both | This single cell never moves — typically a constant like a tax rate |

The `$` literally means "lock this part." `$A$1` always points to A1 no matter where you drag the formula. `A$1` shifts column but keeps row 1. Press `F4` while editing to cycle through the four styles.

## Sort, filter, freeze, find

Four things you'll do constantly. None of them are formulas — they're the navigation grammar of Excel.

### Sort and filter (via Table headers)
A Table puts a drop-down arrow on every header. Click → Sort A→Z, or filter to specific values. Filtering hides rows; it doesn't delete them.

### Freeze panes
**View → Freeze Top Row** keeps row 1 visible while you scroll down 100k rows. **View → Freeze Panes** (with a cell selected) freezes everything above and to the left.

You almost always want Freeze Top Row.

### Find & Replace (`Ctrl+H`)
Replace "n/a" with empty. Replace "United States" with "USA". Use **Options → Match entire cell contents** when you don't want partial matches.

**Pro tip:** check **Match case** when replacing short strings — `=` inside a formula doesn't want to be replaced.

??? note "Try it yourself — make a Table"
    Paste this into a new sheet starting at cell A1:

    | OrderID | Customer | Region | Revenue |
    |---|---|---|---|
    | 1 | Acme | NE | 1200 |
    | 2 | Beta | NW | 800 |
    | 3 | Acme | NE | 450 |
    | 4 | Gamma | SE | 2100 |
    | 5 | Beta | NW | 300 |
    | 6 | Acme | SE | 600 |

    Tasks:

    1. Convert it to a Table with `Ctrl+T`. Name it `Orders` in the Table Design tab.
    2. In cell F1, write a formula referencing the whole Revenue column by name. (Don't worry about which function — pick one you know, like `SUM`.)
    3. Add a 7th row: `7, Delta, NE, 900`. Check whether the Table extended to include it without you doing anything.
    4. Filter to Region = "NE" using the header drop-down. Then clear the filter.

    ??? success "Reveal solution"
        1. Click in the data, `Ctrl+T`, leave headers checked. Click OK. Then rename to `Orders` in Table Design.
        2. `=SUM(Orders[Revenue])` — result is `5450`. If you wrote `=SUM(D2:D7)` it works today but breaks the moment a row is added.
        3. Click cell A8 and type `7`. The Table border should auto-extend to include row 8 as you tab across. Your F1 formula now reads `6350`.
        4. Header drop-down on Region → uncheck (Select All), check only NE, OK. Four rows visible. Drop-down again → clear filter.

## Common pitfalls

1. **Skipping the rename step.** `Table1`, `Table2`, `Table3` are forgettable. Every formula gets harder to read.
2. **Merged cells.** They break sorts, filters, pivots, and your soul. Never merge cells in a Table. Use "Center across selection" if you need the visual effect.
3. **Blank rows inside a Table.** Tables stop at the first fully blank row. If you accidentally leave one in the middle of your data, the Table only sees the top half.
4. **Pasting over a Table column with a static value.** This breaks the column's formula. If a column has a formula in row 2, every row inherits it; pasting `350` into one cell drops the formula for *every* row in that column.
5. **Double-clicking a CSV to open it.** Excel guesses date and number formats — usually wrong. Always import via **Data → Get Data → From Text/CSV** so you see and control the column types.

## How this shows up in the capstone

The Olist capstone starts with two CSVs imported as Tables (`Orders` and `Reviews`). Every derived column you'll write — `delivery_days`, `review_score` — uses `[@field]` syntax. If Tables don't feel automatic by the end of this lesson, come back before doing the capstone.

## What's next

Continue to **[Lesson 2 — Math & aggregation](02_aggregation.md)**, where you'll write the formulas that actually compute things on the Table you just built.
