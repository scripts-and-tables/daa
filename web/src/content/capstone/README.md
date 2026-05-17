<div class="hero-day" data-day="capstone" markdown>
<div class="hero-day__icon" markdown>:material-flag-checkered:</div>
<div class="hero-day__copy" markdown>
<p class="hero-day__eyebrow">Capstone · across all 5 days</p>

# The threaded project {: .hero-day__title }

<p class="hero-day__sub">One business question. One real dataset. Five days of work. By Friday evening you'll answer it with each day's tool — five different ways.</p>
</div>
</div>

# Capstone Project

One project, threaded through all 5 days. By Friday you'll have used Excel, SQL, Python, Power BI, and Claude Code to answer the same real business question — and you'll present your findings in the final hour of Day 5.

## The business question

> **"Which sellers and product categories are driving low customer satisfaction at Olist, and what's the financial impact?"**

You're playing the role of a junior analyst at Olist, asked by the head of marketplace operations to investigate why some orders get bad reviews and which sellers/categories deserve attention. Your final deliverable is a 1-page report they can read in 5 minutes.

## How the capstone works each day

Every day, the last hour (~Hour 4) is dedicated to applying that day's tool to the capstone. You commit your work into your day's folder:

| Day | Folder | What you'll produce |
|---|---|---|
| 1 | `capstone/day1_excel/` | Cleaned data + first pivots in `exploration.xlsx` |
| 2 | `capstone/day2_sql/` | SQL queries answering scoped sub-questions in `queries.sql` |
| 3 | `capstone/day3_python/` | A pandas analysis notebook `analysis.ipynb` |
| 4 | `capstone/day4_powerbi/` | A 1-page dashboard `dashboard.pbix` + PNG screenshot |
| 5 | `capstone/day5_ai/` | The final 1-page report `final_report.md` + short presentation |

Each folder has its own README with the precise task for that day.

!!! warning "Things to question about this data (a 90-second ethics sidebar)"
    Every dataset is a partial, biased view of reality. Before you ship a finding from Olist, you should be able to answer how each of these affects your numbers:

    1. **Sample representativeness.** Olist is one Brazilian marketplace, 2017–2018. Findings here don't automatically generalise to other countries, other marketplaces, or current behaviour. Caveat your report's recommendations accordingly.
    2. **Observability bias.** Only ~40% of orders have a review. The reviews you analyse aren't a random sample — people with strong feelings (good or bad) leave reviews more often. Your "average review score" is the average of *reviewers*, not of *customers*.
    3. **Language bias in reviews.** Day 5's theme extraction reads Portuguese comments via an AI assistant. Translation has biases: idioms get flattened, sarcasm gets missed, regional slang gets misclassified. Spot-check translations of edge cases.
    4. **Time-window bias.** The data ends October 2018. Any "trend over time" stops there — not because the trend stopped, but because the data stopped. Don't extrapolate beyond the window.
    5. **Survivorship bias.** You only see sellers who *kept selling* through 2018. Sellers who were delisted earlier (perhaps for being bad) aren't in the data. Your "worst sellers" are the worst *surviving* sellers, which understates the real problem.

    A good final report names at least two of these explicitly in its caveats section. A great one names the one that most threatens its conclusion and explains how it could be checked.

## What the final deliverable looks like

<figure class="schema-figure">
<img src="../assets/illustrations/day5_artifact.svg" alt="Mockup of the 1-page stakeholder report" />
<figcaption>The Day 5 deliverable: one page, three findings, embedded chart, recommendations.</figcaption>
</figure>

## Rubric

You'll be assessed on the final report (Day 5) against four dimensions, equally weighted:

| Dimension | What we're looking for |
|---|---|
| **Correctness** | Numbers reconcile across days. If your SQL says "12% late deliveries" and your dashboard says "18%", something's wrong. |
| **Clarity** | A non-analyst stakeholder should understand your findings without you in the room. Plain English, no jargon. |
| **Insight depth** | Not just "here are some numbers" — what does it mean? What should the business do about it? |
| **Tool use** | Did you use each day's tool appropriately, not just by reflex? E.g., don't use Python where SQL is cleaner. |

## Tips

- **Reconcile your numbers across days.** If Day 2 (SQL) and Day 3 (Python) give different answers to the same question, find out why before moving on.
- **Keep a running notes file.** A `notes.md` in this folder is a good place to write down weird things you spot in the data — they often become the most interesting parts of the final report.
- **Don't try to answer everything.** A focused report on 2–3 concrete findings beats a sprawling tour of the dataset.
