<div class="hero-day" data-day="2" markdown>
<div class="hero-day__icon"><img src="../../assets/illustrations/day2.svg" alt="" class="illus"></div>
<div class="hero-day__copy" markdown>
<p class="hero-day__eyebrow">Day 2 of 5 · 4 hours</p>

# SQL — querying real databases {: .hero-day__title }

<p class="hero-day__sub">Everything you did with XLOOKUP and pivots, rewritten as queries that scale. Join four tables, aggregate millions of rows, crack the Olist database.</p>
</div>
</div>

**Duration:** 4 hours
**Prerequisites:** Day 1 (you've seen pivot tables, joins between sheets, and aggregation in Excel — SQL is the same thinking written down)
**Learning goals:** by end of day you can write `SELECT` statements against a real database, join 3–4 tables, group + aggregate, and use a CTE to break a hard query into readable steps.

## Why SQL after Excel?

Everything you did with `XLOOKUP` and pivot tables in Excel has a direct SQL equivalent — and SQL scales to millions of rows where Excel chokes. By the end of today you'll do in 3 lines of SQL what took 5 clicks and 2 columns in Excel.

| Excel | SQL equivalent |
|---|---|
| `XLOOKUP` | `JOIN` |
| `SUMIFS` | `SELECT SUM() ... WHERE ... GROUP BY ...` |
| Filter button | `WHERE` |
| Pivot table | `GROUP BY` + aggregates |
| Sort | `ORDER BY` |

## Tooling: SQLite

We use **[SQLite](https://sqlite.org)** — the simplest possible "real" database. One file (`olist.db`), no server, runs everywhere. You already have it: it's built into macOS, Linux, and Python.

**Setup (5 minutes, do once):**

1. Make sure the CSVs are downloaded — `bash data/olist/download.sh`
2. Build the database (loads all 8 CSVs into one `.db` file):
   ```bash
   cd data/olist
   sqlite3 olist.db < load_into_sqlite.sql
   ```
3. Confirm it worked:
   ```bash
   sqlite3 olist.db "SELECT COUNT(*) FROM orders"
   # → 99441
   ```

**Two ways to query:**

| Tool | Best for |
|---|---|
| **[DB Browser for SQLite](https://sqlitebrowser.org/)** (GUI, free) | Beginners — looks like Excel for databases. Type query, click run, see results. **Recommended for class.** |
| `sqlite3` CLI | Comfortable terminal users — faster for batch queries |

Open the database in DB Browser: File → Open Database → pick `data/olist/olist.db`. Then "Execute SQL" tab.

### Table names

The loader gives the eight Olist tables short, query-friendly names:

| Table | What it holds |
|---|---|
| `orders` | One row per order |
| `items` | One row per line item |
| `reviews` | One row per review |
| `customers` | Customer info |
| `sellers` | Seller info |
| `products` | Product info (Portuguese category names) |
| `payments` | Payment info |
| `category_translation` | Portuguese → English category names |

## Agenda

| Time | Block | Topic | Lesson |
|---|---|---|---|
| 00:00–00:30 | Hour 1 | SELECT, FROM, WHERE, ORDER BY, LIMIT | [Lesson 1](01_select_basics.md) |
| 00:30–01:00 | Hour 1 | Aggregation: GROUP BY, HAVING, the five aggregates | [Lesson 2](02_aggregation.md) |
| 01:00–01:10 | Break | | |
| 01:10–01:50 | Hour 2 | Joins: INNER, LEFT, multi-table, anti-join | [Lesson 3](03_joins.md) |
| 01:50–02:00 | Break | | |
| 02:00–02:30 | Hour 3 | CTEs & CASE: multi-step queries | [Lesson 4](04_ctes.md) |
| 02:30–02:55 | Hour 3 | NULLs, types & SQLite quirks | [Lesson 5](05_nulls_and_quirks.md) |
| 02:55–03:00 | Self-test | 12-question gate-check | [Self-test](test.md) |
| 03:00–04:00 | Hour 4 | Capstone | [Capstone](../../capstone/day2_sql/README.md) |

## What you'll be able to do

By the end of today, given a relational database with 8 tables you've never seen before, you can:

- Read its schema and write `SELECT … FROM … WHERE` to inspect any table
- Aggregate with `GROUP BY` to answer "X by Y" questions — pivot tables, in 3 lines
- Join 3+ tables to ask cross-table questions
- Use a `LEFT JOIN … IS NULL` to find "missing things" — orders without reviews, products never sold
- Break a complex question into a recipe of CTEs
- Handle NULLs and empty-string CSV gotchas without getting silently wrong answers

## Lessons

<div class="lesson-cards" markdown>

<a class="lesson-card" data-day="2" href="01_select_basics.md" markdown="1">
<span class="lesson-card__head">
<span class="lesson-card__num">Lesson 01</span>
<span class="lesson-card__time">~30 min</span>
</span>
<span class="lesson-card__title">SELECT, FROM, WHERE</span>
<span class="lesson-card__desc">Query anatomy, filters, `ORDER BY`, `LIMIT`, and the logical execution order that trips up everyone.</span>
</a>

<a class="lesson-card" data-day="2" href="02_aggregation.md" markdown="1">
<span class="lesson-card__head">
<span class="lesson-card__num">Lesson 02</span>
<span class="lesson-card__time">~30 min</span>
</span>
<span class="lesson-card__title">Aggregation & GROUP BY</span>
<span class="lesson-card__desc">Five aggregates, the `SELECT`-must-be-grouped rule, `HAVING` vs `WHERE`, `DISTINCT`.</span>
</a>

<a class="lesson-card" data-day="2" href="03_joins.md" markdown="1">
<span class="lesson-card__head">
<span class="lesson-card__num">Lesson 03</span>
<span class="lesson-card__time">~40 min</span>
</span>
<span class="lesson-card__title">Joins</span>
<span class="lesson-card__desc">`INNER`/`LEFT`, multi-table chains, the anti-join pattern, why you always alias.</span>
</a>

<a class="lesson-card" data-day="2" href="04_ctes.md" markdown="1">
<span class="lesson-card__head">
<span class="lesson-card__num">Lesson 04</span>
<span class="lesson-card__time">~30 min</span>
</span>
<span class="lesson-card__title">CTEs & multi-step queries</span>
<span class="lesson-card__desc">`WITH … AS`, chained CTEs, `CASE WHEN`, and a peek at window functions.</span>
</a>

<a class="lesson-card" data-day="2" href="05_nulls_and_quirks.md" markdown="1">
<span class="lesson-card__head">
<span class="lesson-card__num">Lesson 05</span>
<span class="lesson-card__time">~25 min</span>
</span>
<span class="lesson-card__title">NULLs & SQLite quirks</span>
<span class="lesson-card__desc">`IS NULL` semantics, `COALESCE`, the empty-string-vs-NULL trap, `julianday`, `CAST`.</span>
</a>

<a class="lesson-card lesson-card--test" data-day="2" href="test.md" markdown="1">
<span class="lesson-card__head">
<span class="lesson-card__num">Self-test</span>
<span class="lesson-card__time">~15 min</span>
</span>
<span class="lesson-card__title">Gate-check before the capstone</span>
<span class="lesson-card__desc">12 short questions: MCQ, write-the-query, spot-the-bug. Reveal each answer only after writing yours down.</span>
</a>

</div>

Practice is **folded into each lesson** as collapsible "Try it yourself" boxes — read the concept, attempt the drill, reveal the solution.

## Self-test

When you've worked through all five lessons, take the **[12-question self-test](test.md)** to confirm you're capstone-ready. ~15 minutes.

## Capstone task for today

[`../../capstone/day2_sql/README.md`](../../capstone/day2_sql/README.md) — produce two CSVs (`worst_categories.csv` + `risky_sellers.csv`) that Day 3 will pick up in pandas.

## Common pitfalls

- **Forgetting `GROUP BY` columns.** Every column in `SELECT` must be in `GROUP BY` or wrapped in an aggregate. SQLite will silently return arbitrary values if you forget.
- **Joining without `ON`.** Cross-join explosion. Always include the join condition.
- **`column = NULL`.** Always false. Use `IS NULL`.
- **Empty strings, not NULLs, from CSV.** In this dataset, "missing" is `= ''`, not `IS NULL`. Use the defensive form `col IS NULL OR col = ''` when in doubt.
- **Integer division.** `1 / 3 = 0`. Multiply by `1.0` first when computing percentages.
- **`SELECT *` in production code.** Fine while exploring; slow and brittle once a query is reused.
