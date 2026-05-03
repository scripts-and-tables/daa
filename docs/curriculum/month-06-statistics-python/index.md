---
title: Month 6 — Python — Statistics
status: stub
---

# Month 6 — Python — Statistics

!!! warning "Coming soon"

    Full content for this month lands in a later pass. Structure is final.

## Theme

The deeper version of [Week 4 — Stats intuition](../month-01-foundations/week-04-stats-intuition.md), now using Python (`scipy.stats`, `statsmodels`, `pingouin`). By the end of this month you can defend a finding statistically and read an A/B test report without missing a trick.

This is the **second month of the Python pillar**. The work transfers directly into [Month 10 — Classical ML](../month-10-classical-ml/index.md), where most "evaluating a model honestly" is statistics under a different name.

## Weekly plan

| Week  | Topic                                    | Outcome                                                              |
|-------|------------------------------------------|----------------------------------------------------------------------|
| 21    | Descriptive statistics — deep dive       | Distributions, moments, quantiles, robust statistics.                |
| 22    | Sampling, CLT, confidence intervals      | Compute and interpret a 95% CI for a proportion and a mean.          |
| 23    | Hypothesis testing                       | t-test, chi-square, ANOVA — when each applies; p-values honestly.    |
| 24    | Correlation, causation, A/B testing      | Design and read an A/B test; recognise common pitfalls.              |

## Prerequisites

- [Week 4 — Stats intuition](../month-01-foundations/week-04-stats-intuition.md).
- [Month 5 — Python Fundamentals & pandas](../month-05-python-fundamentals/index.md) — examples will use `scipy.stats` and `pandas` interchangeably.

## Mini-project

Find a public A/B-test write-up (e.g. Booking.com, Netflix, Spotify experiments blogs). Re-derive the conclusion: compute the test statistic and CI yourself in Python. Decide whether you agree with the published claim.
