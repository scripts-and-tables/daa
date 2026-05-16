# What to learn next

You've finished a 5-day intensive. That gets you to fluent-beginner — you can answer a real business question on a real dataset and ship a stakeholder report. The next 5 days, 5 weeks, or 5 months depend on where you're headed.

## If your next role is "data analyst" — go deeper, not wider

You have breadth from this course. Pick one tool and go deep before adding more.

| Tool | One book, one course, one habit |
|---|---|
| **SQL** | Book: *SQL for Data Analysis* (Cathy Tanimura). Course: [Mode's SQL Tutorial](https://mode.com/sql-tutorial/) (free). Habit: write at least one SQL query every working day for a month. |
| **pandas / Python** | Book: *Python for Data Analysis* (Wes McKinney, the pandas author). Course: [DataCamp's Data Analyst with Python track](https://www.datacamp.com/tracks/data-analyst-with-python). Habit: re-implement one of your team's recurring SQL reports as a pandas notebook. |
| **Power BI** | Course: Microsoft's [PL-300 learning path](https://learn.microsoft.com/en-us/training/courses/pl-300t00) (free). Habit: rebuild a dashboard your company already uses, then ask whoever made the original what they'd change. |

## Statistical thinking — the next layer above the tools

This course is light on statistics on purpose. A real analyst eventually needs:

- **Descriptive statistics done well** — when to use mean vs median, what standard deviation actually tells you, how to spot a skewed distribution before it skews your conclusion.
- **Correlation vs causation** — why "X correlates with Y" almost never means "X causes Y," and what extra evidence you'd need.
- **Sampling and confidence** — how big a sample do you need, what does a 95% confidence interval mean, when is a difference real vs noise.
- **A/B testing fundamentals** — if you'll work at a company that ships experiments, this becomes daily vocabulary.

Two good starting points:

- **Book:** *Think Stats* (Allen Downey) — free at [greenteapress.com](https://greenteapress.com/thinkstats2/).
- **Course:** DataCamp's "Statistical Thinking in Python" or Khan Academy's intro statistics course (both free).

## Data visualisation — beyond Power BI mechanics

Day 4 taught you which Power BI visuals exist and how to wire them up. What it didn't fully teach: **which chart to pick for which question, what makes a chart honest, how to design for the reader.** Two recommendations:

- **Book:** *Storytelling with Data* (Cole Nussbaumer Knaflic). 200 pages, every page useful, single best book on this topic.
- **Reference card:** [The Financial Times' Visual Vocabulary](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary). A one-page map of "this question → this chart."

## AI-assisted analytics — going further than Day 5

Day 5 introduced Claude Code for analytics. If that resonated:

- **Practice:** use Claude Code for your next three real analyses (at work or on a public dataset). Verify everything. Notice when it saves you time and when it costs you time.
- **Read:** Anthropic's [Claude Code documentation](https://docs.claude.com/en/docs/claude-code) — especially the "best practices" guide.
- **Explore:** other AI-coding tools (Cursor, GitHub Copilot) — they share the same fundamentals; prompts that work for one mostly transfer.

## A portfolio of public work

Hiring managers read your GitHub. Three reasonable ways to build a public portfolio after this course:

1. **Re-do the capstone with a different dataset.** Same business-question framing, different domain (healthcare, finance, sports). Pick something you actually care about — your output reads differently when you're curious.
2. **Find a dataset on [Kaggle](https://www.kaggle.com/datasets) and write a Day-5-style 1-page report.** No Kaggle kernel, no leaderboard — just the markdown report and the underlying CSV / SQL / notebook in a public repo.
3. **Reproduce a published analysis.** Take a finding from a news article (often based on public data) and try to recreate the numbers from scratch. You'll learn more from one reproduction than from ten tutorials.

## What we don't recommend (yet)

| Skip for now | Why |
|---|---|
| Machine learning / scikit-learn / TensorFlow | Different role (data scientist). Get tool-fluent and stats-fluent first; ML is the layer above. |
| Big data tools (Spark, Hadoop) | Until your company hits "this CSV is 10GB," pandas + SQL covers everything. |
| Dashboards-as-a-service platforms (Looker, Mode, Hex) | The mental model is the same as Power BI; learn one platform deeply before touching the others. |

## A last note

The fastest way to keep learning after this course is to **answer real questions for real people who care about the answers**. Volunteer to pull a number for a friend's small business. Take on a "this should be easy, can you just…" request at work. The difference between someone who took an analytics course and someone who *does* analytics is who replied yes to that next request.
