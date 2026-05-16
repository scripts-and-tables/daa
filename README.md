# Data Analytics Academy

A 5-day, 20-hour intensive course taking absolute beginners from "I've used Excel a few times" to "I've shipped a real analytics project end-to-end."

## What you'll learn

| Day | Topic | What you'll be able to do by end of day |
|---|---|---|
| 1 | **Excel** | Clean a CSV, build pivot tables, write `XLOOKUP`/`SUMIFS`, make a chart |
| 2 | **SQL** | Query a real database with `SELECT`, `JOIN`, `GROUP BY`, CTEs |
| 3 | **Python (pandas)** | Load data into DataFrames, filter/group/join, make plots |
| 4 | **Power BI** | Build an interactive 1-page dashboard with a real data model |
| 5 | **Claude Code** | Direct an AI assistant to do analytics work in plain English |

Each day is 4 hours: 3 hours of teaching + 1 hour applying that day's tool to the capstone project.

## The capstone

One dataset (Brazilian e-commerce, ~100K orders), one business question, threaded through all 5 days:

> *"Which sellers and product categories are driving low customer satisfaction, and what's the financial impact?"*

By Friday evening you'll have answered it using all 5 tools and presented your findings.

## Audience

- **Primary:** colleagues at the host company, mostly non-technical roles
- **Public release:** all materials are MIT-licensed for free use

No coding background assumed. If you've opened a spreadsheet before, you're ready.

## How this repo is organized

```
curriculum/   Lesson materials (READMEs, exercises, solutions) per day
capstone/     The threaded capstone project — one folder per day
data/         Dataset documentation + download script
instructor/   Setup checklist and timing notes for whoever is teaching
```

## Getting started

**Students:** start with [`curriculum/day1_excel/README.md`](curriculum/day1_excel/README.md). Before Day 2, download the dataset via [`data/olist/download.sh`](data/olist/download.sh).

**Instructors:** start with [`instructor/setup_checklist.md`](instructor/setup_checklist.md).

## License

MIT — see [LICENSE](LICENSE).
