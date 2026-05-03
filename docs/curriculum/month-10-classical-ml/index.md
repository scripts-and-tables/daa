---
title: Month 10 — AI — Classical ML
status: stub
---

# Month 10 — AI — Classical ML

!!! warning "Coming soon"

    Full content for this month lands in a later pass. Structure is final.

## Theme

Enough machine learning to evaluate a model honestly, recognise when ML is the wrong tool, and use the AutoML features that ship with Power BI and Fabric without being a passenger.

This is the **first month of the AI pillar**. The next month ([Month 11](../month-11-genai-llms/index.md)) covers GenAI and LLMs; the two together form the AI pillar.

## Weekly plan

| Week  | Topic                                          | Outcome                                                                  |
|-------|------------------------------------------------|--------------------------------------------------------------------------|
| 37    | Supervised vs unsupervised; train/test/validate | Frame an ML problem; explain the train/val/test split; avoid leakage.   |
| 38    | Regression & classification + metrics          | RMSE, MAE; accuracy, precision, recall, F1, ROC-AUC, PR-AUC.             |
| 39    | Feature engineering & overfitting              | Encoding, scaling, cross-validation, regularisation intuition.           |
| 40    | AutoML, Power BI ML, when *not* to use ML      | When a pivot table beats a model; reading vendor AutoML output critically. |

## Prerequisites

- [Month 6 — Python — Statistics](../month-06-statistics-python/index.md). Most "evaluating a model honestly" is statistics under a different name.
- [Month 5 — Python Fundamentals & pandas](../month-05-python-fundamentals/index.md). Examples are in scikit-learn.

## Mini-project

Pick a Kaggle starter competition (e.g. *Titanic* or *House Prices*). Train a baseline regression or classification model in scikit-learn. Report the metric on a hold-out set and explain what would break if the model went into production. Compare your model's performance to the AutoML feature in Power BI ([Month 8](../month-08-power-bi-core/index.md)) on the same dataset.
