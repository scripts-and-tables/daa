# Timing Notes

Each day is 4 hours. Real-world timing always slips. Here's what to **cut first** if you're running behind, and what to **stretch** if you're ahead.

## General timing principles

- **Hour 1 (concepts):** 50 min teaching + 10 min break. Don't skip the break — beginners burn out fast.
- **Hour 2–3 (exercises):** circulate, answer questions, encourage students to help each other.
- **Hour 4 (capstone):** keep talking light. Students should be doing, not listening.

If you're 30+ minutes behind by the end of Hour 2, **cut from Hour 3, never from Hour 4**. The capstone is the spine of the course.

## Day 1 — Excel

| If running long, cut: | If running short, add: |
|---|---|
| `IFS` / `SUMIFS` formula deep-dive (students Google these later) | A second pivot table angle on the capstone data |
| Conditional formatting beyond basic | Power Query intro (foreshadows Day 4) |

## Day 2 — SQL

| If running long, cut: | If running short, add: |
|---|---|
| Window functions (only meant as a teaser anyway) | A second join exercise involving reviews |
| CTE complexity — keep to single-CTE examples | `EXPLAIN` plan walkthrough |

**Watch for:** students getting stuck on syntax errors. Have everyone use the same query editor (DB Browser for SQLite) — switching tools mid-class wastes time. Also watch for the `!= ''` vs `IS NOT NULL` gotcha when filtering empty cells — call this out in Hour 1, not as a surprise in Hour 4.

## Day 3 — Python

| If running long, cut: | If running short, add: |
|---|---|
| List comprehensions and other "Pythonic" syntax | Seaborn `pairplot` on capstone data |
| `apply` with lambdas | Quick intro to `merge` performance on big DataFrames |

**Watch for:** time vanishing into install/environment troubleshooting. If a student's Jupyter won't start by Hour 1 minute 30, move them to JupyterLite in the browser and keep going.

## Day 4 — Power BI

| If running long, cut: | If running short, add: |
|---|---|
| Power Query transforms beyond rename/type-change | A second page with drill-through |
| Theming and visual polish | Publish to Power BI Service walkthrough |

**Watch for:** the data model. If relationships aren't right, every visual looks weird. Spend the time to get them right in Hour 1.

## Day 5 — Claude Code

| If running long, cut: | If running short, add: |
|---|---|
| CLI install walkthrough (web is enough) | A second pass on the review-theme extraction with a different prompt |
| Plan-mode deep-dive | Have students automate one of Day 2 or Day 3's exercises with Claude Code |

**Watch for:** students who try to do *everything* with Claude Code. Steer them back to "use it where it adds value, do it yourself where you already can."

## Presentations (Day 5, last 30 min)

- **3 minutes per presenter.** Use a timer. Be strict.
- **2 questions per presenter** from the audience.
- Skip slides if needed — markdown report on screen is fine.
- End with a 5-minute group debrief: what surprised you, what would you do differently, what's next.
