<div class="hero-day" data-day="4" markdown>
<div class="hero-day__icon"><img src="../../assets/illustrations/day4.svg" alt="" class="illus"></div>
<div class="hero-day__copy" markdown>
<p class="hero-day__eyebrow">Day 4 of 5 · 4 hours</p>

# Power BI — interactive dashboards {: .hero-day__title }

<p class="hero-day__sub">Wrap the analysis in something a non-analyst will actually click through. Model, measure, visualise, ship.</p>
</div>
</div>

**Duration:** 4 hours
**Prerequisites:** Days 1–3
**Learning goals:** by end of day you can import data into Power BI, set up relationships across tables, write the 4 most useful DAX measures, and build a 1-page interactive dashboard that a non-analyst can use without you in the room.

## Why Power BI after pandas?

Pandas + matplotlib can make any chart, but the audience for charts isn't analysts — it's executives, marketers, ops teams. Power BI's job is to wrap your analysis in something they'll actually click through. A good dashboard answers tomorrow's question, not just today's.

## Tooling

- **Power BI Desktop** — free, Windows only. Download: [powerbi.microsoft.com/desktop](https://powerbi.microsoft.com/desktop/).
- **Mac users:** use a Windows VM, RDP into a Windows machine, or use the Power BI **Service** (browser) — Service has fewer features but works.
- File extension: `.pbix` (one file = data model + visuals + measures).

## The three apps inside Power BI

| Pane / view | Job |
|---|---|
| **Power Query** | Load-time transformations: rename columns, change types, derive fields. The "ETL" step. (Lesson 1) |
| **Model view** | Tables and the relationships between them. (Lesson 2) |
| **Report view** | The dashboard canvas. Visuals, slicers, layout. (Lessons 3 & 5) |
| **DAX** | The formula language for measures and calculated columns. (Lesson 4) |

You'll be switching between these all day. Knowing which one to reach for is half of Power BI competence.

## Agenda

| Time | Block | Topic | Lesson |
|---|---|---|---|
| 00:00–00:30 | Hour 1 | Get Data & Power Query | [Lesson 1](01_get_data_power_query.md) |
| 00:30–00:55 | Hour 1 | The data model | [Lesson 2](02_data_model.md) |
| 00:55–01:05 | Break | | |
| 01:05–01:35 | Hour 2 | Building visuals | [Lesson 3](03_visuals.md) |
| 01:35–02:05 | Hour 2 | DAX measures | [Lesson 4](04_dax_measures.md) |
| 02:05–02:15 | Break | | |
| 02:15–02:40 | Hour 3 | Interactivity, layout, polish | [Lesson 5](05_interactivity_and_polish.md) |
| 02:40–02:55 | Self-test | 12-question gate-check | [Self-test](test.md) |
| 02:55–03:00 | Break | | |
| 03:00–04:00 | Hour 4 | Capstone — build the dashboard | [Capstone](../../capstone/day4_powerbi/README.md) |

## What you'll be able to do

By the end of today, given a folder of CSVs and a business question, you can:

- Import them into Power BI with clean column types and friendly names
- Build a correct data model with one-to-many relationships
- Pick the right visual for each part of the question
- Write the four DAX functions that power 80% of dashboards
- Add interactivity (slicers, cross-filters) and lay out a single-page report
- Export it as a PNG / PDF for embedding or email

## Lessons

<div class="lesson-cards" markdown>

<a class="lesson-card" data-day="4" href="01_get_data_power_query.md" markdown="1">
<span class="lesson-card__head">
<span class="lesson-card__num">Lesson 01</span>
<span class="lesson-card__time">~30 min</span>
</span>
<span class="lesson-card__title">Get Data & Power Query</span>
<span class="lesson-card__desc">Transform Data, the Applied Steps recipe, renaming, type-changing, custom columns with one-line M.</span>
</a>

<a class="lesson-card" data-day="4" href="02_data_model.md" markdown="1">
<span class="lesson-card__head">
<span class="lesson-card__num">Lesson 02</span>
<span class="lesson-card__time">~25 min</span>
</span>
<span class="lesson-card__title">The data model</span>
<span class="lesson-card__desc">One-to-many relationships, cardinality, star schema basics, verifying Power BI's auto-detection.</span>
</a>

<a class="lesson-card" data-day="4" href="03_visuals.md" markdown="1">
<span class="lesson-card__head">
<span class="lesson-card__num">Lesson 03</span>
<span class="lesson-card__time">~30 min</span>
</span>
<span class="lesson-card__title">Building visuals</span>
<span class="lesson-card__desc">The six core visuals, picking the right aggregation, Top N filters, sort, cross-filtering for free.</span>
</a>

<a class="lesson-card" data-day="4" href="04_dax_measures.md" markdown="1">
<span class="lesson-card__head">
<span class="lesson-card__num">Lesson 04</span>
<span class="lesson-card__time">~30 min</span>
</span>
<span class="lesson-card__title">DAX measures</span>
<span class="lesson-card__desc">`SUM`, `AVERAGE`, `CALCULATE`, `DIVIDE`, and the filter-context mental model that unlocks everything.</span>
</a>

<a class="lesson-card" data-day="4" href="05_interactivity_and_polish.md" markdown="1">
<span class="lesson-card__head">
<span class="lesson-card__num">Lesson 05</span>
<span class="lesson-card__time">~25 min</span>
</span>
<span class="lesson-card__title">Interactivity, layout, polish</span>
<span class="lesson-card__desc">Slicer styles, edit interactions, themes, layout discipline, exporting as PDF/PNG.</span>
</a>

<a class="lesson-card lesson-card--test" data-day="4" href="test.md" markdown="1">
<span class="lesson-card__head">
<span class="lesson-card__num">Self-test</span>
<span class="lesson-card__time">~15 min</span>
</span>
<span class="lesson-card__title">Gate-check before the capstone</span>
<span class="lesson-card__desc">12 questions covering Power Query vs DAX decisions, cardinality, measures, and common gotchas.</span>
</a>

</div>

Practice is folded into each lesson as collapsible "Try it yourself" boxes — read the concept, attempt in Power BI, reveal the sanity checks.

## Self-test

When you've worked through all five lessons, take the **[12-question self-test](test.md)** before the capstone. ~15 minutes.

## Capstone task for today

[`../../capstone/day4_powerbi/README.md`](../../capstone/day4_powerbi/README.md) — build the Seller & Satisfaction Dashboard: 3 KPI cards, a category bar chart, a Brazilian state map, a bottom-10-sellers table, and three slicers.

## Common pitfalls

- **Wrong relationship cardinality.** Many-to-many `*─*` "works" but inflates aggregates. Confirm `1 ─ *` in Model view.
- **DAX in Power Query, Power Query in DAX.** Each tool has its job. Derived columns at load time → Power Query. Aggregates that depend on user filters → DAX measures.
- **Implicit measures everywhere.** "Sum of price" is anonymous; you can't reuse it. Create explicit named measures.
- **Visual clutter.** A good 1-page dashboard has 4–6 visuals. Not 12.
- **Default aggregation = Sum.** Sum of star ratings is meaningless. Check every visual's aggregation explicitly.
