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

## Read the course online

**📘 [scripts-and-tables.github.io/daa](https://scripts-and-tables.github.io/daa/)** — the full course as a navigable site.

## How this repo is organized

```
web/                            The Astro static-site that publishes scripts-and-tables.github.io/daa
├── package.json                Astro 5 + minimal deps
├── astro.config.mjs            Site URL, base path, markdown config
├── public/assets/              Static SVG illustrations served as-is
└── src/
    ├── content/curriculum/     All 25 lesson markdown files + 5 day READMEs + 5 self-tests
    ├── content/capstone/       6 capstone markdowns (overview + 5 day-specific)
    ├── content/pages/          about-the-role, next-steps, data, instructor pages
    ├── layouts/                BaseLayout (head/footer)
    ├── components/             TopNav, Footer (homepage components are inline in index.astro)
    ├── pages/                  index.astro (Coursera-style homepage), [...slug].astro (every lesson)
    └── styles/global.css       Design tokens + base styles

data/olist/                     Download script + SQLite loader (referenced from lessons)
```

## Getting started

**Students:** start with [Day 1 — Excel](https://scripts-and-tables.github.io/daa/curriculum/day1_excel/). Before Day 2, download the dataset via [`data/olist/download.sh`](data/olist/download.sh).

**Instructors:** start with the [setup checklist](https://scripts-and-tables.github.io/daa/instructor-setup/).

**Working on the site:**

```bash
cd web
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # production build into web/dist
```

## License

MIT — see [LICENSE](LICENSE).
