---
title: Month 11 — Machine Learning Fundamentals
status: stub
---

# Month 11 — Machine Learning Fundamentals

!!! warning "Coming soon"

    Full content for this month lands in a later pass. Structure is final.

## Theme

Enough machine learning to evaluate a model honestly, recognise when ML is the wrong tool, and use the AutoML features that ship with Power BI and Fabric without being a passenger.

## Weekly plan

| Week  | Topic                                          | Outcome                                                                  |
|-------|------------------------------------------------|--------------------------------------------------------------------------|
| 41    | Supervised vs unsupervised; train/test/validate | Frame an ML problem; explain the train/val/test split; avoid leakage.   |
| 42    | Regression & classification + metrics          | RMSE, MAE; accuracy, precision, recall, F1, ROC-AUC, PR-AUC.            |
| 43    | Feature engineering & overfitting              | Encoding, scaling, cross-validation, regularisation intuition.          |
| 44    | AutoML, Power BI ML, when *not* to use ML      | When a pivot table beats a model; reading vendor AutoML output critically. |

## Prerequisites

- [Month 7 — Statistics for Analysts](../month-07-statistics/index.md).
- [Month 6 — Python for Analytics](../month-06-python-pandas/index.md).

## Mini-project

Pick a Kaggle starter competition (e.g. *Titanic* or *House Prices*). Train a baseline regression or classification model in scikit-learn. Report the metric on a hold-out set and explain what would break if the model went into production.
