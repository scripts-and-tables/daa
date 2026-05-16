# Lesson 4 — Dates, text, and cleaning

**Time:** ~30 min.
**You'll be able to:**

- Subtract two dates to get a number of days (the formula at the heart of the capstone)
- Read and write the date functions you'll actually use: `TODAY`, `DATE`, `YEAR`, `MONTH`, `DAY`, `EOMONTH`, `DATEDIF`, `TEXT`, `DATEVALUE`
- Clean text with `TRIM`, `LEFT`/`RIGHT`/`MID`, `LEN`, `FIND`, `SUBSTITUTE`
- Concatenate fields with `&` or `TEXTJOIN`
- Reach for the three menu-bar cleaning tools that are faster than any formula: **Flash Fill**, **Remove Duplicates**, **Text to Columns**

## Dates are numbers

Burn this in: **an Excel date is a number.** Specifically, the number of days since 30 December 1899. So 1 = 31 Dec 1899, 45000 = roughly mid-2023, and **2 January 2024 minus 1 January 2024 = 1**.

This is why date arithmetic Just Works:

```
=[@delivered] - [@purchased]
```

If `delivered` is 15 Jan and `purchased` is 10 Jan, you get `5`. Format the cell as Number, not Date, if it shows up as `05/01/1900`. This subtraction is the entire `delivery_days` formula in the capstone.

!!! tip "How to know if a cell is a date or text"
    Right-align by default → it's a number/date. Left-align by default → it's text. Excel's auto-formatting tells on itself.

## The date functions you'll actually use

### `TODAY()` and `NOW()`

```
=TODAY()        -> today's date, refreshes when the workbook opens
=NOW()          -> today's date AND time
```

Volatile: they recalculate every time anything in the workbook changes. Don't use them in 100k-row formulas you'll be scrolling through — slowness adds up.

### `DATE(year, month, day)`

```
=DATE(2024, 1, 15)        -> 15 Jan 2024
=DATE([@y], [@m], [@d])   -> build a date from three separate columns
```

The only safe way to construct a date from numeric parts.

### `YEAR`, `MONTH`, `DAY`

```
=YEAR([@order_date])       -> 2024
=MONTH([@order_date])      -> 1
=DAY([@order_date])        -> 15
```

Pull the parts back out. Useful for grouping in formulas (pivots handle this for you, see Lesson 5).

### `EOMONTH` — end of month

```
=EOMONTH([@order_date], 0)     -> last day of the same month
=EOMONTH([@order_date], 1)     -> last day of next month
=EOMONTH([@order_date], -3)    -> last day of three months ago
```

The integer is the offset in months. Underrated function — much cleaner than building dates manually.

### `DATEDIF` — quirky, but the only way to get whole months/years

```
=DATEDIF([@start], [@end], "d")   -> whole days
=DATEDIF([@start], [@end], "m")   -> whole months
=DATEDIF([@start], [@end], "y")   -> whole years
```

`DATEDIF` is undocumented in modern Excel but still works. Use it when you need calendar months or years, not just day-counts.

### `TEXT` — format a date as a string

```
=TEXT([@order_date], "yyyy-mm")        -> "2024-01"
=TEXT([@order_date], "yyyy-mm-dd")     -> "2024-01-15"
=TEXT([@order_date], "mmm yyyy")       -> "Jan 2024"
=TEXT([@order_date], "dddd")           -> "Monday"
```

Returns text, not a date. Useful for building groupby keys like `"2024-01"` that sort correctly alphabetically.

### `DATEVALUE` — rescue dates trapped as text

```
=DATEVALUE("2024-01-15")     -> 45306 (the real date number)
```

When Excel imports a column as text and it's full of date-shaped strings, `DATEVALUE` converts each one. But the cleaner fix is usually **Text to Columns** (see below).

## Text functions

Five functions handle 95% of text cleaning.

### `TRIM` — strip leading/trailing whitespace

```
=TRIM([@Customer])
```

The single most useful text function. CSVs and copy-pastes are full of invisible spaces that ruin `XLOOKUP` (the lookup `"Acme"` won't match the stored `" Acme "`).

### `UPPER`, `LOWER`, `PROPER`

```
=UPPER([@Code])         -> "ABC"
=LOWER([@Email])        -> "alice@x.com"
=PROPER([@Name])        -> "John Smith"
```

`PROPER` capitalises every word's first letter. Useful for cleaning manually-typed names.

### `LEFT`, `RIGHT`, `MID`, `LEN`

```
=LEFT("2024-01-15", 4)         -> "2024"
=RIGHT("Order-1234", 4)        -> "1234"
=MID("ABC-DEF-GHI", 5, 3)      -> "DEF"        (start at pos 5, take 3 chars)
=LEN([@Description])           -> length of the string
```

`MID` is 1-indexed (position 1 is the first character).

### `FIND` and `SUBSTITUTE`

```
=FIND("-", "Order-1234")             -> 6   (position of first hyphen)
=SUBSTITUTE([@phone], "-", "")       -> phone number with hyphens stripped
=SUBSTITUTE([@desc], "old", "new", 1)  -> only replace the first occurrence
```

`FIND` is case-sensitive; `SEARCH` is its case-insensitive sibling. Both error on no-match — wrap in `IFERROR`.

`SUBSTITUTE` replaces text. Excellent for stripping commas from numbers stored as strings, removing prefixes, etc.

### Concatenation: `&` and `TEXTJOIN`

```
=[@first_name] & " " & [@last_name]              -> "Alice Smith"
=[@year] & "-" & TEXT([@month], "00")            -> "2024-03"
=TEXTJOIN(", ", TRUE, Orders[Customer])          -> "Acme, Beta, Acme, Gamma..."
```

`&` is the simple concatenation operator. `TEXTJOIN(delimiter, ignore_empty, range)` is the smart version: handles a whole range, skips blanks if you ask it to, and inserts the delimiter for you.

## The three menu-bar tools that beat formulas

For some cleaning jobs, a formula is the wrong tool. Use these:

### Flash Fill (`Ctrl+E`)

Type the result you want for the first row or two. Press `Ctrl+E`. Excel pattern-matches and fills the rest of the column.

Example: column A has `"Smith, Alice"`. Type `"Alice Smith"` in column B for the first row. `Ctrl+E`. The rest of column B fills.

Flash Fill is mind-reading-fast for simple transforms (extract, split, rearrange, casefix). Always try it before reaching for `LEFT`/`MID`/etc.

### Remove Duplicates

**Data → Remove Duplicates.** Pick which columns make a row "duplicate." Excel deletes the duplicates and tells you how many it removed.

**Pro tip:** *make a backup of the sheet first.* This is destructive.

### Text to Columns — the canonical date-rescue tool

When a column of dates was imported as text (left-aligned, won't sort chronologically, won't subtract), this is the fix:

1. Select the column.
2. **Data → Text to Columns**.
3. Choose **Delimited** → Next → uncheck all delimiters → Next.
4. Set the column data format to **Date**, and pick the order that matches the source (YMD if the strings are `"2024-01-15"`, DMY if `"15/01/2024"`, MDY if `"01/15/2024"`).
5. Finish.

The column now sorts chronologically and supports date arithmetic.

??? note "Try it yourself — fix the dates"
    Paste this into a new sheet:

    | Date | Amount |
    |---|---|
    | 2024-01-15 | 100 |
    | 2024-01-22 | 250 |
    | 2024-02-03 | 175 |
    | 2024-02-19 | 90 |
    | 2024-03-08 | 300 |
    | 2024-03-25 | 200 |

    Tasks:

    1. Sort the Date column ascending. Are the values in real chronological order, or alphabetical-by-string?
    2. If they're alphabetical (treated as text), fix using Text to Columns.
    3. Add a `YearMonth` column showing `2024-01`, `2024-02`, `2024-03`.
    4. In a free cell, total the Amount only for February 2024.

    ??? success "Reveal solution"
        1. If the column was imported correctly, sort should give Jan 15, Jan 22, Feb 3… If imported as text, sort gives the same string order (which happens to be the same here because of ISO format — try a column of `"15/01/2024"`-style strings to see the bug).
        2. Data → Text to Columns → Delimited → Next → no delimiters → Next → set type to Date (YMD) → Finish.
        3. `=TEXT(A2, "yyyy-mm")`
        4. Using the helper column:
           ```
           =SUMIFS(B:B, C:C, "2024-02")
           ```
           Or using the date column directly:
           ```
           =SUMIFS(B:B, A:A, ">=2024-02-01", A:A, "<2024-03-01")
           ```
           Expected: `265` (175 + 90).

## Common pitfalls

1. **Dates that look right but sort wrong.** Always sort the column ascending right after import. If 12/30/2024 comes before 1/5/2025, the column is text. Fix it before doing anything else.
2. **Mixing `"01/02/2024"` and `"02/01/2024"`.** Same string, different dates depending on locale. Use ISO format (`YYYY-MM-DD`) in every file you control.
3. **Trailing spaces in lookup keys.** `"Acme"` ≠ `"Acme "`. Wrap your lookup column in `TRIM` before importing, or `TRIM` inside the `XLOOKUP`.
4. **`Ctrl+E` (Flash Fill) needs a clean pattern.** If your example row is ambiguous (e.g., "Alice S" could mean first-letter-of-last or shortened first name), Flash Fill picks wrong. Type two examples to disambiguate.
5. **Remove Duplicates with no key columns selected.** Removes rows where every column matches. Usually you want to dedupe on `order_id` only, not all columns.

## How this shows up in the capstone

The capstone's most important formula is a date subtraction:

```
delivery_days = [@order_delivered_customer_date] - [@order_purchased_timestamp]
```

If you imported the Olist CSV via **Data → Get Data → From Text/CSV** (the capstone tells you to), Excel will detect the date columns automatically. If you double-clicked the CSV instead, they'll be text — and you'll need Text to Columns to rescue them before anything works.

## What's next

Continue to **[Lesson 5 — Pivot tables & charts](05_pivots.md)** — the visual aggregation engine that makes Excel feel like a real analytics tool.
