---
title: Week 2 — Problem framing
tags:
  - level::beginner
  - type::theory
  - type::hands-on
time_estimate: 6h
status: complete
---

# Week 2 — Problem framing

> The skill that separates analysts who get promoted from analysts who keep being asked to "just pull the number". Most analyses fail not because of bad SQL but because the wrong question was asked.

## Learning objectives

- [ ] Turn a vague stakeholder request ("we want to understand churn") into a *SMART* analytical question.
- [ ] Identify and document stakeholders, decision-makers, and audience for an analysis.
- [ ] Apply the *5 Whys* to find the underlying question behind a surface request.
- [ ] Decompose a high-level metric into its component drivers (the *issue tree* / MECE technique).

## Prerequisites

- [Week 1 — Data literacy](week-01-data-literacy.md) (vocabulary).

## Time estimate

Total: ~6h  (Reading: 2h · Video: 1h · Hands-on: 3h)

## Curated resources

### Courses

- [Google Data Analytics — Course 2: *Ask Questions to Make Data-Driven Decisions*](https://www.coursera.org/learn/ask-questions-make-decisions) — Coursera · *free to audit* · ~10h (skim to ~3h) · **Why:** weeks 1–2 are the cleanest published treatment of stakeholder framing and SMART questions you will find for free. The rest is filler — stop after week 2.

### Microsoft Learn / official docs

- [Discover the data analysis process — Microsoft Learn](https://learn.microsoft.com/en-us/training/modules/data-analytics-microsoft/3-data-analysis-process) — **Why:** Microsoft's five-step framing (*ask · prepare · process · analyze · share · act*). Same skeleton as Google's; useful for PL-300.

### Videos

- [*The MECE Principle* — Strategy U](https://www.youtube.com/watch?v=n-x8QzoG7tw) — ~6 min · **Why:** the consultant-style "Mutually Exclusive, Collectively Exhaustive" decomposition that makes issue trees rigorous.
- [*The 5 Whys* — Lean Enterprise Institute](https://www.lean.org/lexicon-terms/5-whys/) — ~5 min read + linked video · **Why:** the original Toyota technique for drilling from a symptom to a root cause; also works for analytical requests.
- [*Asking Better Analytical Questions*](https://www.youtube.com/watch?v=B3EYFaSLY9k) — Cassie Kozyrkov · ~12 min · **Why:** Kozyrkov ran Decision Intelligence at Google; this is the executive-summary version of how she trained analysts to push back on bad framing.

### Books / long-form reading

- *Decisive* — Chip & Dan Heath (chapters 1–3 only). **Why:** the WRAP framework (Widen options, Reality-test, Attain distance, Prepare to be wrong) is what good analysts do unconsciously. Reading it makes the unconscious explicit.
- *The Pyramid Principle* — Barbara Minto (read the introduction and chapter 1). **Why:** the bible of structured business communication. Full read lands in Month 12.

### Certifications (if relevant)

- **PL-300** — *Prepare the data* asks you to identify stakeholders and define KPIs. This week covers exactly that vocabulary.

## Practice

- **SMART rewrite.** Take three vague requests below and rewrite each as a SMART analytical question (Specific, Measurable, Achievable, Relevant, Time-bound):
    1. "We want to understand our customers better."
    2. "Sales are down. What is happening?"
    3. "Should we open a new store in Manchester?"
- **5 Whys drill.** A stakeholder says: *"The churn dashboard is wrong."* Ask "why" five times until you reach a root cause. Write down each level. (There is no single correct answer.)
- **Issue tree.** Pick a metric you care about — *monthly active users*, *gross margin*, *average response time*. Decompose it into drivers using a MECE issue tree. Two levels deep is enough.
- **Stakeholder map.** For an imaginary "build a dashboard for marketing churn" project, list: who is the *decision-maker*, who is the *audience*, who has *veto power*, and who provides the *data*. They are rarely the same person.
- **Self-check questions.**
    1. Why is *"Increase user engagement"* not a SMART question? Rewrite it.
    2. What is the difference between a *symptom* and a *root cause* in an analytics request?
    3. When is it acceptable to NOT decompose MECE — i.e. when overlapping branches are okay?

## My notes

The single highest-leverage habit you can build in your first year is to **not start the SQL until the SMART question is written down and the stakeholder has nodded at it**. Half the analyses that fail in production fail because the analyst silently re-interpreted the request and the stakeholder silently expected the original.

The Cassie Kozyrkov video has a phrase worth tattooing somewhere: *"the loss function comes before the data"*. Decide what *good* looks like before you start measuring; otherwise you will retrofit the definition of *good* to whatever the data shows, which is the textbook definition of motivated reasoning.

## Further / optional

- *Thinking in Systems* — Donella Meadows (chapters 1–2). For when the issue tree feels too rigid and you want a richer mental model.
- [*Decision Intelligence* — Cassie Kozyrkov on Medium](https://kozyrkov.medium.com/) — long blog, free, all of it good.

## Next

→ [Week 3 — Math refresher](week-03-math-refresher.md)
