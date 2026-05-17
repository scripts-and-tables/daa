<div class="hero-day" data-day="3" markdown>
<div class="hero-day__icon"><img src="../../assets/illustrations/day3.svg" alt="" class="illus"></div>
<div class="hero-day__copy" markdown>
<p class="hero-day__eyebrow">Day 3 of 5 · 4 hours</p>

# Python — pandas for analysis {: .hero-day__title }

<p class="hero-day__sub">Excel with code. Load, filter, group, join, and chart 100K rows in a notebook you can re-run tomorrow.</p>
</div>
</div>

**Duration:** 4 hours
**Prerequisites:** Days 1–2
**Learning goals:** by end of day you can load CSVs into pandas DataFrames, filter/group/join them, and make quick plots. Enough to do everything you did in Excel and SQL — faster, repeatable, and on much bigger data.

> **Important framing:** today is **not** about learning Python the programming language. Today is about pandas — "Excel with code." We use just enough Python syntax to drive pandas, and skip everything else.

## Why pandas after SQL?

SQL is great until you want to:
- Loop over many similar queries and compose results
- Run statistical tests, fit a regression, build a quick model
- Make a chart that's better than the database GUI's built-in plotter
- Save your analysis as a re-runnable notebook

pandas does all of those. And under the hood, every `df.groupby(...).agg(...)` is a SQL `GROUP BY` — you already know the concepts.

| SQL | pandas |
|---|---|
| `SELECT a, b FROM t` | `df[['a', 'b']]` |
| `WHERE a > 10` | `df[df['a'] > 10]` or `df.query('a > 10')` |
| `GROUP BY a` | `df.groupby('a')` |
| `SUM(b)` | `.agg({'b': 'sum'})` or `['b'].sum()` |
| `JOIN ... ON` | `df1.merge(df2, on='id', how='left')` |
| `ORDER BY` | `df.sort_values('col', ascending=False)` |
| `LIMIT 10` | `df.head(10)` |

## Tooling: Jupyter

Jupyter notebooks let you mix code, output, and prose in one document. Two ways to run:

- **Browser, zero install:** [jupyter.org/try-jupyter/lab](https://jupyter.org/try-jupyter/lab/) → JupyterLite. Works offline-ish, no setup. **Recommended for the class** so everyone is on the same tooling.
- **Local:** install Anaconda, run `jupyter lab` from a terminal. More powerful but more install pain.

Your instructor will tell you which to use Day 3 morning. Stick with that one.

## Agenda

| Time | Block | Topic | Lesson |
|---|---|---|---|
| 00:00–00:25 | Hour 1 | Notebooks, loading data, inspecting DataFrames | [Lesson 1](01_notebooks_and_loading.md) |
| 00:25–00:55 | Hour 1 | Selecting & filtering | [Lesson 2](02_selecting_filtering.md) |
| 00:55–01:05 | Break | | |
| 01:05–01:35 | Hour 2 | Aggregation & groupby | [Lesson 3](03_groupby.md) |
| 01:35–02:00 | Hour 2 | Merge & combine | [Lesson 4](04_merge.md) |
| 02:00–02:10 | Break | | |
| 02:10–02:40 | Hour 3 | Cleaning, dates, plots | [Lesson 5](05_cleaning_dates_plots.md) |
| 02:40–02:55 | Self-test | 12-question gate-check | [Self-test](test.md) |
| 02:55–03:00 | Break | | |
| 03:00–04:00 | Hour 4 | Capstone | [Capstone](../../capstone/day3_python/README.md) |

## What you'll be able to do

By the end of today, given a folder of CSVs and a question, you can:

- Load each CSV with proper date parsing and audit it with `.info()`
- Filter rows with boolean masks or `.query()`
- Group and aggregate with named aggregations
- Merge several tables with row-count sanity checks at each step
- Clean missing values, compute day differences between dates, and bin continuous values
- Save the result to a CSV and produce a quick chart for the report

## Lessons

<div class="lesson-cards" markdown>

<a class="lesson-card" data-day="3" href="01_notebooks_and_loading.md" markdown="1">
<span class="lesson-card__head">
<span class="lesson-card__num">Lesson 01</span>
<span class="lesson-card__time">~25 min</span>
</span>
<span class="lesson-card__title">Notebooks & loading data</span>
<span class="lesson-card__desc">`read_csv` with `parse_dates`, the 30-second inspection routine: `.info()`, `.head()`, `.describe()`.</span>
</a>

<a class="lesson-card" data-day="3" href="02_selecting_filtering.md" markdown="1">
<span class="lesson-card__head">
<span class="lesson-card__num">Lesson 02</span>
<span class="lesson-card__time">~30 min</span>
</span>
<span class="lesson-card__title">Selecting & filtering</span>
<span class="lesson-card__desc">Boolean masks, `.query()`, `&`/`|`/`~` with parentheses, taming `SettingWithCopyWarning`.</span>
</a>

<a class="lesson-card" data-day="3" href="03_groupby.md" markdown="1">
<span class="lesson-card__head">
<span class="lesson-card__num">Lesson 03</span>
<span class="lesson-card__time">~30 min</span>
</span>
<span class="lesson-card__title">Aggregation & groupby</span>
<span class="lesson-card__desc">`.value_counts()`, named aggregations, `.size()` vs `.count()`, sort + trim chains.</span>
</a>

<a class="lesson-card" data-day="3" href="04_merge.md" markdown="1">
<span class="lesson-card__head">
<span class="lesson-card__num">Lesson 04</span>
<span class="lesson-card__time">~25 min</span>
</span>
<span class="lesson-card__title">Merge & combine</span>
<span class="lesson-card__desc">`pd.merge`, the row-count sanity-check pattern, `indicator=True`, when `concat` is the right tool.</span>
</a>

<a class="lesson-card" data-day="3" href="05_cleaning_dates_plots.md" markdown="1">
<span class="lesson-card__head">
<span class="lesson-card__num">Lesson 05</span>
<span class="lesson-card__time">~30 min</span>
</span>
<span class="lesson-card__title">Cleaning, dates, plots</span>
<span class="lesson-card__desc">`.isna()`/`.fillna()`, the `.dt`/`.str` accessors, `pd.cut`, quick plots, saving CSV + PNG.</span>
</a>

<a class="lesson-card lesson-card--test" data-day="3" href="test.md" markdown="1">
<span class="lesson-card__head">
<span class="lesson-card__num">Self-test</span>
<span class="lesson-card__time">~15 min</span>
</span>
<span class="lesson-card__title">Gate-check before the capstone</span>
<span class="lesson-card__desc">12 questions covering the five lessons. Reveal each answer only after writing yours down.</span>
</a>

</div>

Practice is folded into each lesson as collapsible "Try it yourself" boxes — read the concept, attempt the drill, reveal the solution.

## Self-test

When you've worked through all five lessons, take the **[12-question self-test](test.md)** to confirm you're capstone-ready. ~15 minutes.

## Capstone task for today

[`../../capstone/day3_python/README.md`](../../capstone/day3_python/README.md) — reproduce yesterday's two SQL output tables in pandas, then extend with a per-seller late-vs-on-time review analysis. The PNG you save today gets embedded in Day 5's final report.

## Common pitfalls

- **`SettingWithCopyWarning`** — pandas isn't sure if you're modifying a view or a copy. Use `.loc[…]` assignment or `.copy()` explicitly.
- **Forgetting `parse_dates`** — your "dates" are strings; sorting/filtering doesn't work as expected.
- **Comparing strings as numbers** — `'10' < '9'` is True. Check `df.dtypes`.
- **Using `and`/`or` instead of `&`/`|`** in boolean indexing — raises a confusing error.
- **Trusting `len()` after a merge** without asserting. Duplicates on the right inflate everything downstream.
