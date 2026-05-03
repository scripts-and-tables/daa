---
title: Week 1 — Data literacy
tags:
  - level::beginner
  - type::theory
  - type::reading
time_estimate: 6h
status: complete
---

# Week 1 — Data literacy

> The vocabulary, taxonomy, and mental model of "data" itself. By the end of the week you should be able to read a job description in the analytics space and recognise every term in it.

## Learning objectives

- [ ] Distinguish *nominal*, *ordinal*, *interval*, and *ratio* data, and give an example of each.
- [ ] Describe the difference between *structured*, *semi-structured*, and *unstructured* data, and name one typical source of each.
- [ ] Map the standard data-team roles — *data analyst*, *analytics engineer*, *data engineer*, *data scientist*, *BI developer* — to the kinds of work each owns.
- [ ] Define KPI, metric, dimension, and granularity in your own words.

## Prerequisites

None. This is the entry point.

## Time estimate

Total: ~6h  (Reading: 2h · Video: 2h · Hands-on: 2h)

## Curated resources

### Courses

- [Google Data Analytics Certificate — Course 1: *Foundations: Data, Data, Everywhere*](https://www.coursera.org/learn/foundations-data) — Coursera · *free to audit / paid for cert* · ~14h (skim) · **Why:** the most accessible "what is this field" overview. Audit it; you do not need the certificate at this stage. Skim weeks 1–4 in ~3 hours; do not do every quiz.

### Microsoft Learn / official docs

- [What is data analytics? — Microsoft Learn](https://learn.microsoft.com/en-us/training/modules/data-analytics-microsoft/) — **Why:** ties the vocabulary directly to the Microsoft data stack you will use later. Free, ~30 min.
- [Data analyst career path — Microsoft Learn](https://learn.microsoft.com/en-us/training/career-paths/data-analyst) — **Why:** outlines the role and the PL-300 certification scope you will revisit in Month 5.

### Videos

- [*Types of Data: Nominal, Ordinal, Interval & Ratio*](https://www.youtube.com/watch?v=hZxnzfnt5v8) — 365 Data Science · ~7 min · **Why:** the cleanest 7-minute explanation of the four levels of measurement.
- [*What does a data analyst actually do?*](https://www.youtube.com/watch?v=yZvFH7B6gKI) — Alex The Analyst · ~10 min · **Why:** day-in-the-life view that grounds the abstract definitions.
- [*Data Engineer vs Data Analyst vs Data Scientist*](https://www.youtube.com/watch?v=rZ65VPiAuoU) — IBM Technology · ~8 min · **Why:** clears up the role confusion in one sitting.

### Books / long-form reading

- *Storytelling with Data* — Cole Nussbaumer Knaflic (read **chapter 1 only** this week). The full book lands in Month 5. **Why:** the first chapter is the canonical case for "context before chart" and sets the tone for the year.

### Certifications (if relevant)

- **PL-300** — *Prepare the data* domain (15–20% of exam) starts to make sense after this week. [Exam page](https://learn.microsoft.com/en-us/credentials/certifications/exams/pl-300/).

## Practice

- **Vocabulary recall.** Without looking, write definitions for: KPI, metric, dimension, granularity, fact, primary key, foreign key, data warehouse, data lake, ETL, ELT. Then check against the [Glossary](../../glossary.md).
- **Type-the-data exercise.** Open any spreadsheet you already have (a personal budget, a sports table, a Steam library export). For each column, classify it as nominal / ordinal / interval / ratio. There is no "correct" answer for every column — the act of arguing with yourself is the point.
- **Role mapping.** Find three real job postings — one *data analyst*, one *analytics engineer*, one *data engineer*. List the differences in required tools.
- **Self-check questions.**
    1. Why is a star rating (1–5) ordinal, not interval?
    2. Give an example of *unstructured* data your phone is generating right now.
    3. Two reports show "average revenue per user". One uses median, one uses mean. Why might both be correct?

## My notes

Most beginners conflate "data analyst" with "data scientist" and pick up the wrong learning materials as a result. The shortcut: if a job description says **dashboard, stakeholder, business question, SQL, Excel, Power BI** — that is a data analyst. If it says **model, feature, training, deployment, Python, MLflow** — that is a data scientist. There is overlap, but the centre of gravity is different and so are the books to read.

The other early trap is treating *KPI* and *metric* as synonyms. A metric is anything you can count; a KPI is a metric a stakeholder has agreed to be judged on. Conflating them produces dashboards full of noise.

## Further / optional

- [DAMA-DMBOK *Data Management Body of Knowledge* — chapter 1](https://technicspub.com/dmbok/) — encyclopedic and dry, but the canonical reference for everything-data vocabulary. Skim only.
- [*The Data Warehouse Toolkit*](https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/books/data-warehouse-dw-toolkit/) — Ralph Kimball. You will read chapters 1–3 in Month 8; bookmark for later.

## Next

→ [Week 2 — Problem framing](week-02-problem-framing.md)
