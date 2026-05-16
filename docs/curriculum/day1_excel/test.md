# Day 1 — Self-test

Twelve questions covering everything in Lessons 1–5. Reveal each answer **only after you've written yours down** — clicking straight through the answers without trying is a self-test of your patience, not your Excel.

**Scoring:**

- **10–12 right:** you're ready for the capstone.
- **7–9 right:** capable but rusty. Skim the lessons you slipped on, then go.
- **6 or fewer:** re-read the lessons before the capstone. The capstone uses these formulas in combination — guessing won't carry you.

Answers reveal in collapsible blocks under each question.

---

### 1. Which Excel function should you reach for first when joining one Table to another?

??? success "Answer"
    **`XLOOKUP`.** It searches any column (not just leftmost), returns from any column, exact-matches by default, and has built-in not-found handling. `VLOOKUP` works but is strictly inferior — recognise it in legacy spreadsheets, but don't write new ones. `INDEX`+`MATCH` is the pre-`XLOOKUP` workaround; only reach for it on older Excel versions.

### 2. What does `[@order_id]` mean inside a formula? Why is it preferred over `B2`?

??? success "Answer"
    `[@order_id]` is a **structured reference** to the `order_id` value in the current row of the Table. It's preferred over `B2` because: (1) it survives column reordering — moving the column doesn't break the formula; (2) it's self-documenting — you can read it without knowing the cell address; (3) when applied in one row of a Table column, Excel auto-fills the same formula across every row.

### 3. What's wrong with this formula? `=VLOOKUP(A2, B:D, 3)`

??? success "Answer"
    **Missing the fourth argument: `FALSE` for exact match.** Without it, `VLOOKUP` defaults to **approximate match**, which silently returns wrong answers when the lookup column isn't sorted ascending. Every production `VLOOKUP` should end with `, FALSE)`. The correct form is `=VLOOKUP(A2, B:D, 3, FALSE)` — better still, `=XLOOKUP(A2, B:B, D:D)`.

### 4. Write the formula that totals `Orders[Revenue]` for the NE region only.

??? success "Answer"
    ```
    =SUMIFS(Orders[Revenue], Orders[Region], "NE")
    ```

    Note the argument order: `sum_range` first, then `(criteria_range, criteria)` pairs. `COUNTIFS` drops the `sum_range`; `AVERAGEIFS` keeps it (as `average_range`).

### 5. Your `XLOOKUP` is returning `#N/A` for some rows because the lookup value isn't found in the source. What's the cleanest fix?

??? success "Answer"
    **Use the fourth argument of `XLOOKUP`:**
    ```
    =XLOOKUP([@id], Other[id], Other[name], "")
    ```
    The fourth arg is the value to return when no match is found. Wrapping the whole thing in `IFERROR` also works, but using `XLOOKUP`'s built-in arg is cleaner because it only catches the no-match case — not unrelated errors that might hide real bugs.

### 6. Write the capstone's `delivery_days` formula: number of days between `[@order_delivered_customer_date]` and `[@order_purchased_timestamp]`, returning an empty string if the delivered date is blank.

??? success "Answer"
    ```
    =IFERROR([@order_delivered_customer_date] - [@order_purchased_timestamp], "")
    ```
    Date subtraction gives a number of days (because Excel dates are integers). `IFERROR` catches the `#VALUE!` you'd get when the delivered date is blank.

### 7. You have 100,000 rows of orders and you want to spot the 1- and 2-star reviews quickly. Best approach?

??? success "Answer"
    **Conditional formatting on the review_score column** (Home → Conditional Formatting → Highlight Cells Rules → Less Than → 3 → pick a fill colour). One rule, one colour, used once. The pivot table (Lesson 5) will tell you *how many* 1- and 2-star orders there are; conditional formatting helps you *see them* while scrolling.

### 8. What's the difference between `$A$1`, `A$1`, `$A1`, and `A1` when you drag a formula?

??? success "Answer"
    The `$` locks the part it precedes when the formula is copied or dragged.

    - `A1` — both shift (relative)
    - `$A1` — column locked, row shifts
    - `A$1` — row locked, column shifts (useful for referencing a header row from below)
    - `$A$1` — both locked (use for constants like a fixed tax rate cell)

    Press `F4` while editing a reference to cycle through all four.

### 9. Write a `SUMIFS` that totals `Orders[Revenue]` only for rows where `Orders[Year]` is `2024` **and** `Orders[Status]` is `"shipped"`.

??? success "Answer"
    ```
    =SUMIFS(Orders[Revenue], Orders[Year], 2024, Orders[Status], "shipped")
    ```
    Year is a number (no quotes); status is a string (quotes). Mismatching this is a common silent-zero bug — `Orders[Year], "2024"` works because Excel coerces, but `Orders[Status], shipped` (no quotes) doesn't.

### 10. Your pivot table still shows yesterday's totals even though you added 100 new rows this morning. What's missing?

??? success "Answer"
    **A Refresh.** Right-click in the pivot → Refresh (or `Alt+F5`, or PivotTable Analyze → Refresh). Pivots are snapshots, not live views — they only recalculate when explicitly refreshed.

    Bonus: if even after Refresh the new rows aren't there, the pivot is built on a fixed range (e.g., `A1:E1000`), not a Table. Rebuild it from the Table so new rows are included automatically.

### 11. A column of date-shaped strings like `"2024-01-15"` is left-aligned and won't sort chronologically. What's the cleanest fix?

??? success "Answer"
    **Data → Text to Columns → Delimited → Next → uncheck all delimiters → Next → set column type to Date (YMD) → Finish.**

    `=DATEVALUE(A2)` in a helper column also works, but Text to Columns fixes the column in place — fewer moving parts. Symptom of the problem: left-aligned cells (text is left-aligned by default; dates and numbers are right-aligned).

### 12. When would you use a pivot table, and when would you use a `SUMIFS` formula?

??? success "Answer"
    **Pivot table** when you want to **explore** data interactively across multiple dimensions, drag fields to reshape, slice with a slicer, and feed a chart. Great when the answer might lead to more questions.

    **`SUMIFS`** when you want a **single number in a specific cell** — a KPI you'll reference elsewhere, a number embedded in a stakeholder summary. Pivots are great for analysis; `SUMIFS` is great for reporting. Use both.

---

## Ready for the capstone?

If you got 10+ right, head to the **[Day 1 capstone](../../capstone/day1_excel/README.md)** and apply this to real Olist data.

If you missed more than two, the links below take you straight to the relevant lesson:

- Tables, structured refs, sort/filter → [Lesson 1](01_tables.md)
- `SUM`/`AVERAGE`/`COUNT`/`MIN`/`MAX`/`ROUND` → [Lesson 2](02_aggregation.md)
- `IF`/`IFS`/`IFERROR`/`SUMIFS`/`XLOOKUP`/`VLOOKUP` → [Lesson 3](03_logic_lookups.md)
- Date arithmetic, `TEXT`, Text-to-Columns → [Lesson 4](04_dates_cleaning.md)
- Pivot tables, slicers, charts → [Lesson 5](05_pivots.md)
