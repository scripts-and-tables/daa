---
title: Week 3 — Math refresher
tags:
  - level::beginner
  - type::theory
  - type::hands-on
time_estimate: 6h
status: complete
---

# Week 3 — Math refresher

> The minimum maths you need to read the rest of the curriculum without flinching. This is not a maths course — it is a hit-list of the topics that confuse beginners and trip up reports.

## Learning objectives

- [ ] Compute and interpret percentages, percentage-point changes, and ratios correctly.
- [ ] Use logarithms intuitively — when log scales are appropriate, what *log-transform* does to skewed data.
- [ ] Manipulate basic algebra (rearranging equations, isolating variables) for KPI definitions.
- [ ] Read and interpret rates of change — *growth rate*, *CAGR*, *velocity*.

## Prerequisites

- High-school maths from a long time ago. If that is missing entirely, do the Khan Academy *Arithmetic* and *Algebra basics* courses first.

## Time estimate

Total: ~6h  (Reading: 1h · Video: 3h · Hands-on: 2h)

## Curated resources

### Courses

- [Khan Academy — *Pre-algebra* (skim) and *Algebra basics*](https://www.khanacademy.org/math/algebra-basics) — *free* · pick gaps · **Why:** Khan Academy is the gold standard for self-paced maths refreshers. Do not do every video; use the *Practice* exercises as a diagnostic and only watch videos for what you fail.
- [Khan Academy — *Logarithms*](https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:logs) — *free* · ~2h · **Why:** logs are unavoidable in analytics (log scales, log-transformed regression, decibel-style metrics). One sitting is enough.

### Microsoft Learn / official docs

- [Working with percentages in Excel — Microsoft Support](https://support.microsoft.com/en-us/office/calculate-percentages-6b5506e9-125a-4aba-a638-d6b40e603981) — **Why:** the *percent change vs percentage point change* trap is one of the most common reporting errors in industry. This page nails the difference and gives Excel formulas you will reuse next month.

### Videos

- [*Logarithms, Explained* — TED-Ed (Steve Kelly)](https://www.youtube.com/watch?v=zzu2POfYv0Y) — ~5 min · **Why:** the cleanest visual intuition for what a log *is*.
- [*Why Do We Use Log Scales?*](https://www.youtube.com/watch?v=eJF9hiv3c-A) — Vsauce · ~10 min · **Why:** when and why log axes are honest (population, earthquakes, audio, stock returns).
- [*CAGR Explained in 4 Minutes*](https://www.youtube.com/watch?v=ud9-jQyoNkw) — Wall Street Prep · ~4 min · **Why:** Compound Annual Growth Rate is in every executive deck; you need to be able to compute it and explain it.
- [*The Magic of Compound Interest* — 3Blue1Brown](https://www.youtube.com/watch?v=v7VYDc7qzL0) — ~16 min · **Why:** Grant Sanderson's visuals turn an abstract formula into something you cannot un-see. Useful for cohort retention and growth modelling later.

### Books / long-form reading

- *How to Lie with Statistics* — Darrell Huff (1954, ~140 pages, read all of it). **Why:** every chapter teaches a percentage / ratio / scale trick that gets used either honestly or dishonestly in real reports. Old, but it has aged extraordinarily well — most "data viz crime" Twitter threads are recycling chapters of this book.

### Certifications (if relevant)

- **PL-300** does not test maths directly, but DAX time-intelligence in Month 5 (`SAMEPERIODLASTYEAR`, growth measures) presumes you understand percent change. Lock it in now.

## Practice

- **Percentages drill.** Without a calculator: a metric goes from 4% to 6%. What is the *percentage-point* change? What is the *percent* change? Why are they different and which one is the headline number? Repeat with: 0.2% → 0.3%, and 50% → 60%.
- **CAGR.** Revenue is €100k in 2020 and €175k in 2025. Compute the 5-year CAGR by hand. (Answer: ~11.8%.) Now do it in Excel using `=RATE()` or `=(EndValue/StartValue)^(1/Years)-1`.
- **Log-transform.** Take a list of 20 numbers spanning many orders of magnitude — country populations, YouTube view counts, anything skewed. Plot them on a linear scale, then a log scale, on graph paper. Note which scale lets you compare the small values.
- **Rearrange.** A KPI is defined as `Revenue per User = (Total Revenue) / (Active Users)`. Rearrange to express *Total Revenue* in terms of the other two. Trivial — but in real KPI trees this is the operation that lets you decompose.
- **Self-check questions.**
    1. Conversion rate goes from 2% to 4%. Did it "double"? Did it "increase by 2 percentage points"? Are both true?
    2. Why are stock-price charts often shown on a log scale?
    3. If something grows 10% per year, how many years does it take to double? (Use the [Rule of 72](https://en.wikipedia.org/wiki/Rule_of_72).)

## My notes

The percentage-vs-percentage-point trap is responsible for more public reporting errors than any other single mathematical mistake. Politicians, journalists, and executives make it constantly. Once you have internalised the distinction, you start to notice it everywhere — and the trick is to *never* let one of your dashboards or reports leave your machine without you having said out loud which one you mean.

Logs feel scary if they were taught badly at school. The shortcut: *the log of a number is the number of digits it has, minus one* (for base 10). `log10(1,000) = 3`. `log10(1,000,000) = 6`. That is the entire intuition for log scales.

## Further / optional

- [3Blue1Brown — *Essence of Linear Algebra*](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab) — beautiful and not yet needed; bookmark for Month 11 (ML).
- [3Blue1Brown — *Essence of Calculus*](https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr) — same.
- *The Joy of Stats* — Hans Rosling documentary (free on YouTube). Not maths per se, but a vivid argument for why maths-with-data feels different to maths-on-a-blackboard.

## Next

→ [Week 4 — Stats intuition](week-04-stats-intuition.md)
