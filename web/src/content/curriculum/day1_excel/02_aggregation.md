# Lesson 2 — Math & aggregation

**Time:** ~25 min.
**You'll be able to:**

- Write the seven aggregation functions you'll use every day: `SUM`, `AVERAGE`, `COUNT`, `COUNTA`, `MIN`, `MAX`, and `ROUND`
- Compute "% of total" and "% growth" without breaking on division by zero
- Read the bottom-right status bar to get instant aggregations without writing a formula
- Spot when to use `COUNT` vs `COUNTA` (this trips up everyone once)

## Arithmetic, the boring foundation

Every formula starts with `=`. After that, normal math:

```
=[@Revenue] - [@Cost]
=[@Quantity] * [@UnitPrice]
=[@Price] / 1.21         (strip VAT)
=2 ^ 10                  (exponentiation)
```

Order of operations is what you'd expect: parentheses → exponents → `*` and `/` → `+` and `-`. When in doubt, add parentheses. Readability beats cleverness.

## The seven you'll use every day

### `SUM` — total a range or column

```
=SUM(Orders[Revenue])
```

Most-used function in Excel. Returns the total. Ignores text, treats blanks as zero.

### `AVERAGE` — arithmetic mean

```
=AVERAGE(Orders[Revenue])
```

Ignores blanks and text. Counts zero as zero. If you want the average over only non-zero rows, you need `AVERAGEIFS` (Lesson 3).

### `COUNT` — count numbers only

```
=COUNT(Orders[Revenue])
```

Counts cells in the column that contain a number. **Blanks and text don't count.** If your column has any text values (like the string `"unknown"`), this number is smaller than the row count.

### `COUNTA` — count anything-not-blank

```
=COUNTA(Orders[order_id])
```

Counts cells that aren't empty, regardless of type. Use this when you want "how many rows do I have?" — the `order_id` column should never be blank in a clean dataset.

!!! tip "`COUNT` vs `COUNTA`"
    `COUNT` only counts numbers. `COUNTA` counts everything that isn't blank. Pointing `COUNT` at an `order_id` column of text codes returns `0`, which has caused more than one wasted afternoon.

### `MIN` and `MAX` — smallest and largest

```
=MIN(Orders[Revenue])
=MAX(Orders[Revenue])
```

Useful for sanity checks: if `MIN(Orders[order_date])` returns a date in 1900, something imported wrong. If `MAX(Orders[Quantity])` is 999,999 in a normal dataset, you have a data error or a stress test.

### `ROUND`, `ROUNDUP`, `ROUNDDOWN`

```
=ROUND(123.456, 2)       -> 123.46
=ROUND(123.456, 0)       -> 123
=ROUND(12345, -2)        -> 12300         (round to nearest hundred)
=ROUNDUP(0.001, 2)       -> 0.01
=ROUNDDOWN(99.9999, 0)   -> 99
```

The second argument is digits **after** the decimal. Negative values round to the left of the decimal.

**Don't confuse rounding with display formatting.** If you format a cell to show 2 decimals, the underlying value still has 15. Use `ROUND` when you want the value itself to change — e.g., before a `=A1=B1` equality check on floats.

## Percentage patterns

Two patterns you'll write hundreds of times.

### % of total

```
=[@Revenue] / SUM(Orders[Revenue])
```

Then format the cell as Percentage (`Ctrl+Shift+%`). One row's revenue divided by the total.

### % growth between two columns

```
=([@Revenue_2024] - [@Revenue_2023]) / [@Revenue_2023]
```

Same shape as `(new - old) / old`. The dangerous part is when `old` is zero — you get `#DIV/0!`. The fix uses `IFERROR`, which you'll meet in Lesson 3.

## The status bar — Excel's free aggregator

Select any range of cells. Look at the **bottom right of the Excel window**. You'll see SUM, AVERAGE, and COUNT of the selection, computed instantly.

Right-click the status bar to add MIN, MAX, and others.

This is the fastest way to spot-check a number. You don't always need to write a formula — sometimes you just need to glance.

??? note "Try it yourself — aggregate the Orders Table"
    Using the `Orders` Table you built in Lesson 1, write formulas in cells F1–F4:

    1. F1: total revenue across all orders
    2. F2: average revenue per order, rounded to whole dollars
    3. F3: count of orders (use the OrderID column)
    4. F4: minimum revenue in the dataset

    ??? success "Reveal solution"
        ```
        F1: =SUM(Orders[Revenue])
        F2: =ROUND(AVERAGE(Orders[Revenue]), 0)
        F3: =COUNTA(Orders[OrderID])
        F4: =MIN(Orders[Revenue])
        ```

        Expected results: F1 = 5450, F2 = 908, F3 = 6, F4 = 300.

        Note F3 uses `COUNTA` because `OrderID` is a label — if you used `COUNT(Orders[OrderID])` it would also work today (the IDs are numbers) but it would silently break if the IDs were ever changed to strings like `"O-001"`.

## Common pitfalls

1. **Using `COUNT` on a text column.** Returns `0`. Use `COUNTA`.
2. **Formatting vs rounding.** Cell format only hides decimals; it doesn't change the value. Use `ROUND` if the value itself needs to change.
3. **Hard-coded ranges.** `=SUM(B2:B500)` is wrong the moment a 501st row arrives. Use `=SUM(Orders[Revenue])` and stop worrying.
4. **Dividing by something that could be zero.** You'll see `#DIV/0!` and the cell goes red. Wrap with `IFERROR` (next lesson).
5. **Summing percentages.** Most of the time, summing a column of percentages is wrong — you probably want a weighted average. Stop and think.

## How this shows up in the capstone

You won't write a lot of `SUM` / `AVERAGE` directly in the Day 1 capstone — pivot tables do that for you. But understanding what each aggregation means is what lets you read a pivot output and know whether the numbers are sensible.

## What's next

Continue to **[Lesson 3 — Logic & lookups](03_logic_lookups.md)**, where things get interesting: conditional aggregation, branching logic, and the formula that joins two sheets together.
