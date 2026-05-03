---
title: Week 4 — Statistics intuition
tags:
  - level::beginner
  - type::theory
  - type::hands-on
time_estimate: 6h
status: complete
---

# Week 4 — Statistics intuition

> Just enough statistics to read a chart honestly and not be embarrassed in a meeting. The deeper version — confidence intervals, hypothesis testing, A/B — lands in [Month 6 — Python Statistics](../month-06-statistics-python/index.md). This week is about *intuition*.

## Learning objectives

- [ ] Compute and interpret *mean*, *median*, *mode*, *range*, *variance*, *standard deviation*, and *IQR*.
- [ ] Recognise common distributions by shape: *uniform*, *normal*, *long-tail / right-skewed*, *bimodal*.
- [ ] Explain why the median is more *robust* to outliers than the mean, and decide when to use which.
- [ ] State, in plain English, the difference between *correlation* and *causation*.

## Prerequisites

- [Week 3 — Math refresher](week-03-math-refresher.md) (percentages, ratios, basic algebra).

## Time estimate

Total: ~6h  (Reading: 1h · Video: 3h · Hands-on: 2h)

## Curated resources

### Courses

- [Khan Academy — *Statistics and probability*](https://www.khanacademy.org/math/statistics-probability) — *free* · only the *Analyzing categorical data*, *Displaying and comparing quantitative data*, and *Summarizing quantitative data* units this week (~3–4 h) · **Why:** Khan's stats curriculum has the right level of rigour for analysts; do not try to do all of it now — only the descriptive statistics units.

### Microsoft Learn / official docs

- [Statistical functions in Excel — Microsoft Support](https://support.microsoft.com/en-us/office/statistical-functions-reference-624dac86-a375-4435-bc25-76d659719ffd) — **Why:** the canonical reference for `AVERAGE`, `MEDIAN`, `STDEV.S`, `STDEV.P`, `QUARTILE`, `PERCENTILE`. You will use these next month.

### Videos

- [StatQuest — *Statistics Fundamentals* playlist](https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9) — Josh Starmer · ~5h playlist; this week watch only **Histograms**, **Mean/Median/Mode**, **Standard Deviation**, and **The Normal Distribution** · **Why:** Starmer's videos are the universally-recommended introduction to statistics for self-taught analysts. Cheerful, rigorous, free, drawn by hand.
- [3Blue1Brown — *But what is the Central Limit Theorem?*](https://www.youtube.com/watch?v=zeJD6dqJ5lo) — ~30 min · **Why:** the CLT is the engine behind nearly every inferential technique you will meet in Month 7. This is the most beautiful explanation of it on the internet. Watch even if you do not understand all of it yet.
- [*Spurious Correlations* (the website)](https://www.tylervigen.com/spurious-correlations) — *not a video, but worth the visit* · **Why:** thirty hilarious charts showing strongly correlated, unrelated time series. The fastest way to internalise correlation ≠ causation.

### Books / long-form reading

- *Naked Statistics* — Charles Wheelan (chapters 1–4 this week). **Why:** the friendliest descriptive-stats book in print; reads like a novel. The full book lands in Month 7.
- *The Visual Display of Quantitative Information* — Edward Tufte (skim only). **Why:** the canonical reference for "what is a chart for". You will return in Month 5.

### Certifications (if relevant)

- **PL-300** — *Visualize and analyze the data* expects you to read summary statistics off a chart and not say silly things about them. This week covers the underlying intuition.

## Practice

- **Compute by hand.** For the dataset `[3, 5, 5, 6, 8, 9, 12, 47]`, compute the *mean*, *median*, *mode*, *range*, *IQR*, and *standard deviation* — by hand or with a pocket calculator. Then ask yourself: *which one is the headline number, and why?* (Hint: notice the 47.)
- **Distribution shapes.** Open Wikipedia and look at the histogram on each of these pages, then describe the shape (skew? bimodal? long tail?): [income distribution](https://en.wikipedia.org/wiki/Income_distribution), [human height](https://en.wikipedia.org/wiki/Human_height), [city population](https://en.wikipedia.org/wiki/List_of_largest_cities), [exam scores](https://en.wikipedia.org/wiki/Test_score).
- **Outlier hunting.** Open the dataset from your Week 1 type-the-data exercise. Compute mean and median for one numeric column. Compare. If they disagree, investigate.
- **Correlation ≠ causation.** From [Spurious Correlations](https://www.tylervigen.com/spurious-correlations), pick one chart and write a one-paragraph explanation of why the correlation exists *despite* there being no causal link. (Confounders, sampling bias, coincidence, common cause.)
- **Self-check questions.**
    1. Why is the mean of *housing prices* almost always higher than the median? What does that tell you about the distribution shape?
    2. What is one *standard deviation* in plain English?
    3. A chart shows that ice cream sales correlate with drownings. Name two ways this could be true *without* ice cream causing drownings.
    4. You have a dataset of customer ages and a single 999-year-old customer. What is going on, and what should you do?

## Month-end mini-project (now is the time)

This is the closing week of Month 1, so do the [Month 1 mini-project](index.md#month-end-mini-project) before opening Month 2. The whole point of the four self-check questions above is to make sure your one-page memo doesn't say anything embarrassing.

## My notes

If you remember nothing else from this week, remember **always plot the data before you summarise it**. A mean of 50 can hide a uniform distribution from 0 to 100, two clusters at 0 and 100, or a tight bell around 50 — and the analytical implications are wildly different. Anscombe's quartet ([Wikipedia](https://en.wikipedia.org/wiki/Anscombe%27s_quartet)) is the canonical proof. Look at it and never forget it.

The other thing worth saying is that statistics anxiety is real and almost always caused by being taught the formal proofs before the visual intuition. StatQuest works because Josh Starmer reverses that order. Trust the order; the formulas will feel less arbitrary in Month 7.

## Further / optional

- [*Seeing Theory*](https://seeing-theory.brown.edu/) — Brown University's interactive statistics textbook. Free, browser-based, beautiful. Use as a sandbox for distribution shapes.
- *The Lady Tasting Tea* — David Salsburg. Narrative history of 20th-century statistics. Optional, fun.

## Next

→ Close out [Month 1](index.md#month-end-mini-project) by writing the one-page memo, then start [Month 2 — Spreadsheets](../month-02-spreadsheets/index.md).
