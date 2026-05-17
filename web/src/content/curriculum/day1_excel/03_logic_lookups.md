# Lesson 3 — Logic & lookups

**Time:** ~40 min. This is the longest lesson of the day, and the most important.
**You'll be able to:**

- Branch a formula on a condition (`IF`, `IFS`)
- Combine conditions with `AND`, `OR`, `NOT`
- Trap errors with `IFERROR` so `#N/A` and `#DIV/0!` stop wrecking your sheet
- Compute conditional aggregates: `COUNTIFS`, `SUMIFS`, `AVERAGEIFS`
- Use `XLOOKUP` to join one Table to another — the Excel equivalent of a SQL join
- Recognise `VLOOKUP` in legacy spreadsheets without using it yourself
- Know when to fall back to `INDEX` + `MATCH`

These are the formulas the capstone is built on. Get fluent here.

## `IF` — the binary branch

```
=IF([@Region]="NE", "Northeast", "Other")
```

Three arguments: condition, value-if-true, value-if-false. The condition can be any comparison: `=`, `<>`, `>`, `<`, `>=`, `<=`.

```
=IF([@Revenue] > 1000, "big", "small")
=IF([@Status]="shipped", [@Revenue], 0)     (count revenue only when shipped)
```

You can nest `IF` inside `IF`, but it gets ugly fast. After two levels, use `IFS`.

## `IFS` — multi-branch without the nesting nightmare

```
=IFS([@Region]="NE", "Northeast",
     [@Region]="NW", "Northwest",
     [@Region]="SE", "Southeast",
     TRUE, "Unknown")
```

Pairs of `condition, value`. Evaluates top-to-bottom and returns the value for the **first** condition that's true.

**The `TRUE` at the end is the catch-all.** Without it, an unmatched row returns `#N/A`. Always include it.

## `AND`, `OR`, `NOT` — combining conditions

```
=IF(AND([@Region]="NE", [@Revenue] > 1000), "big NE order", "")
=IF(OR([@Status]="shipped", [@Status]="delivered"), "fulfilled", "open")
=IF(NOT([@cancelled]), "active", "cancelled")
```

`AND(...)` is true only if every argument is true. `OR(...)` is true if any argument is true. `NOT(...)` flips the boolean.

## `IFERROR` — make errors silent

This is the single most useful function in Excel, and the one most often missing from beginner courses.

```
=IFERROR(formula, "")
=IFERROR([@Revenue] / [@Orders], 0)
=IFERROR(XLOOKUP([@id], Other[id], Other[name]), "Not found")
```

If `formula` evaluates to any error (`#N/A`, `#DIV/0!`, `#VALUE!`, etc.), return the fallback. Otherwise return the formula's result.

**Use it whenever a formula might legitimately fail** — a lookup might miss, a division might hit zero, a date subtraction might run on a blank cell. Without `IFERROR`, a single bad row turns your column into a rainbow of error codes.

!!! warning "Don't `IFERROR`-blanket bugs"
    `IFERROR` is for **expected** failures (missing lookups, blank inputs). Don't wrap a formula in `IFERROR` to silence an error you don't understand — you'll hide the real bug. Strip the `IFERROR` first, see the error, fix the cause, then add it back if the underlying case is legitimately a "no match."

## Conditional aggregation: `SUMIFS`, `COUNTIFS`, `AVERAGEIFS`

The `*IFS` family is "aggregate this column, but only for rows matching these conditions."

The argument order is consistent and worth memorising:

```
=SUMIFS(sum_range,      criteria1_range, criteria1, criteria2_range, criteria2, ...)
=COUNTIFS(              criteria1_range, criteria1, criteria2_range, criteria2, ...)
=AVERAGEIFS(avg_range,  criteria1_range, criteria1, criteria2_range, criteria2, ...)
```

`SUMIFS` and `AVERAGEIFS` start with the column you're aggregating. `COUNTIFS` doesn't — it's just counting rows that match.

Examples:

```
=SUMIFS(Orders[Revenue], Orders[Region], "NE")
=SUMIFS(Orders[Revenue], Orders[Region], "NE", Orders[Year], 2024)
=COUNTIFS(Orders[Customer], "Acme")
=AVERAGEIFS(Orders[Revenue], Orders[Status], "shipped")
```

Criteria can use comparison operators inside quotes:

```
=SUMIFS(Orders[Revenue], Orders[Revenue], ">1000")
=COUNTIFS(Orders[Date], ">=2024-01-01", Orders[Date], "<2024-02-01")
```

**Rule of thumb:** if you find yourself doing the same `SUMIFS` for ten different region values, you actually want a pivot table (Lesson 5).

## `XLOOKUP` — the modern way to join data

`XLOOKUP` is the Excel equivalent of a SQL `LEFT JOIN` for a single column. You give it a value to look up, a column to search in, and a column to pull from.

```
=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])
```

The first three are required. The fourth, `if_not_found`, is what makes `XLOOKUP` so much better than `VLOOKUP`.

Concrete example — the heart of the Day 1 capstone:

```
=XLOOKUP([@order_id], Reviews[order_id], Reviews[review_score], "")
```

For each order, look up its `order_id` in the `Reviews` Table, return the matching `review_score`, return `""` if there's no match.

What `XLOOKUP` does that `VLOOKUP` cannot:

- Searches in **any column** (not just leftmost)
- Returns from **any column** (not by column-index-number)
- Exact match by default — no surprise approximate matches
- Built-in not-found handling — no `IFERROR` wrapper needed
- Searches right-to-left or top-to-bottom-of-last-match (the `search_mode` arg)

### `VLOOKUP` — recognise it, don't write it

You'll see this in every legacy spreadsheet in your company:

```
=VLOOKUP(A2, Sheet2!B:D, 3, FALSE)
```

Translation: "find A2's value in column B of Sheet2; return the value in the 3rd column of the range (column D); FALSE means exact match."

`FALSE` for exact match is mandatory — the default is approximate, which silently returns wrong answers if the lookup column isn't sorted. **The most common production bug in Excel** is a `VLOOKUP` missing its `FALSE`.

Replace `VLOOKUP` with `XLOOKUP` when you can. If you can't (older Excel), at least always pass `FALSE`.

### `INDEX` + `MATCH` — the classic alternative

Before `XLOOKUP` existed (Excel 365, 2019+), the workaround was:

```
=INDEX(Reviews[review_score], MATCH([@order_id], Reviews[order_id], 0))
```

`MATCH` returns the row position; `INDEX` returns the value at that position. Strictly more flexible than `VLOOKUP` (any direction), strictly less ergonomic than `XLOOKUP`. You'll see it in inherited spreadsheets and stack-overflow answers. Recognise it; reach for `XLOOKUP` first.

??? note "Try it yourself — lookups and labels"
    Add a second sheet called `Lookup` with this data:

    | Region | Manager |
    |---|---|
    | NE | Alice |
    | NW | Bob |
    | SE | Carol |

    Convert it to a Table named `Lookup`. Now, in your `Orders` Table from Lesson 1:

    1. Add a column `Manager` that uses `XLOOKUP` to return the manager for each row's region.
    2. Add a column `RegionDescription` that returns `Northeast`, `Northwest`, or `Southeast` based on the region code — without using a lookup Table. (Hint: `IFS`.)
    3. In a free cell, compute total revenue for region NE only.
    4. In another free cell, compute total revenue for Acme orders where the region is NE specifically.

    ??? success "Reveal solution"
        ```
        Manager:           =XLOOKUP([@Region], Lookup[Region], Lookup[Manager])
        RegionDescription: =IFS([@Region]="NE","Northeast",
                                [@Region]="NW","Northwest",
                                [@Region]="SE","Southeast")
        NE total:          =SUMIFS(Orders[Revenue], Orders[Region], "NE")
        Acme NE total:     =SUMIFS(Orders[Revenue], Orders[Customer], "Acme", Orders[Region], "NE")
        ```

        Expected: NE total = 1650, Acme NE total = 1650 (both NE rows happen to be Acme in this sample).

## Common pitfalls

1. **`VLOOKUP` without `FALSE`.** Silent wrong answers. The flag is mandatory in every `VLOOKUP` you write or inherit.
2. **`IFS` with no catch-all.** Returns `#N/A` for unmatched rows. End every `IFS` with `TRUE, "default-value"`.
3. **Wrong argument order in `SUMIFS`.** It's `sum_range` first, then pairs. `COUNTIFS` doesn't have a sum_range. Easy to mix up because they look similar.
4. **Mixing `[@field]` and absolute refs in a Table column.** A Table column should be uniform — the same formula in every row. If you accidentally type a literal `B5` in one cell, the column becomes "calculated" inconsistently.
5. **Looking up the wrong direction with `VLOOKUP`.** `VLOOKUP` only searches the leftmost column of the range. If your key column is on the right, you need `XLOOKUP` or `INDEX`+`MATCH`.

## How this shows up in the capstone

The capstone is one giant `XLOOKUP` + `IFERROR` sandwich:

```
delivery_days:  =IFERROR([@order_delivered_customer_date] - [@order_purchased_timestamp], "")
review_score:   =XLOOKUP([@order_id], Reviews[order_id], Reviews[review_score], "")
```

If those two lines feel comfortable, the capstone is mostly clicking pivot table buttons.

## What's next

Continue to **[Lesson 4 — Dates, text, and cleaning](04_dates_cleaning.md)**, where you'll learn why subtracting two cells gives you a number of days, and how to fix the date columns Excel parsed wrong.
