# What a data analyst actually does

Before the tools, the job.

A data analyst sits between the people who have a question — a head of operations, a product manager, a marketer — and the data that *might* answer it. The job is rarely "run this query." It's almost always "what's actually being asked, what would a credible answer look like, and which numbers are trustworthy enough to put my name next to?"

## The four hats you'll wear

| Hat | What it looks like |
|---|---|
| **Translator** | Turning a stakeholder's vague request ("are our sellers underperforming?") into a specific, answerable question ("which sellers in the 50-order+ population have an average review score below 3.5, and how much revenue do they represent?") |
| **Detective** | Pulling the data, joining the tables, spotting the empty-strings-vs-NULL gotchas, sanity-checking magnitudes, deciding which 5% of rows to throw out and which to investigate |
| **Cartographer** | Picking the chart that lets a non-analyst see the finding in 5 seconds — not the chart that looks most impressive |
| **Editor** | Distilling 15 numbers into the 3 that the stakeholder needs, in the order they need them, with caveats they can act on |

This course teaches the tool fluency for all four hats. The hats themselves are what your stakeholder is paying for.

## The five questions you'll ask of every dataset

Before any aggregation, ask:

1. **Where did this data come from?** Who logged it, on what device, for what purpose? (Almost no dataset is a neutral record of reality.)
2. **What's missing — and why?** A `NULL` review isn't an unrated order; it's an order whose customer didn't leave a review. Those two populations are different.
3. **What's the unit of analysis?** One row = one order? One line item? One review? Mixing units silently doubles or halves everything downstream.
4. **What time window am I looking at?** Olist's data ends in October 2018. Any "growth trend" stops there for a reason.
5. **Who's NOT in this data?** Customers who never ordered. Sellers who got delisted. Reviews that were filtered out. The story of a marketplace is partly told by who's absent.

These are not optional. The capstone explicitly tests them. Run through them as a habit before you write the first formula.

## The mindset shift from "answer found" to "answer trusted"

A beginner runs a query, gets a number, ships the number. An analyst runs a query, gets a number, then asks: *does this match what I'd expect?* If yes, ship. If no, dig — sometimes the data is wrong, sometimes the expectation is wrong, sometimes a join inflated a count. The dig is the job.

This is why this course teaches every analysis in **multiple tools**. By the end of Day 4, you'll have computed the same numbers four different ways. They should match. When they don't, you've discovered something — either a bug or a hidden detail of the data — and that's the actual moment you became a data analyst.

## What this course doesn't teach

| Out of scope | Why |
|---|---|
| Hypothesis testing, t-tests, p-values | You'll see "correlation vs causation" in passing. Real statistical inference is a separate course. |
| Machine learning / predictive models | Different role (data scientist). The line is real and worth respecting. |
| Pipeline / ETL engineering | Different role (data engineer). You'll consume cleaned data from Day 2 onwards, not build the pipeline that produced it. |
| Domain expertise (finance, marketing, healthcare-specific KPIs) | You'll learn this on the job. Tools transfer; domains don't. |

Five days. Tool fluency. The mindset above. That's the deliverable.

Now — head to **[Day 1 — Excel](curriculum/day1_excel/README.md)**, or [see the syllabus](index.md#whats-inside).
