# Capstone — Day 5 (Claude Code) + Final Report + Presentation

**Time:** ~1 hour (30 min build, 30 min present)
**Goal:** ship a 1-page stakeholder report answering the capstone question, then present it.

## The business question (final answer time)

> *"Which sellers and product categories are driving low customer satisfaction at Olist, and what's the financial impact?"*

## The deliverable

A markdown file: `final_report.md`.

Must contain:

1. **TL;DR** — 3 bullets a stakeholder reads in 30 seconds.
2. **The findings** — 2–3 concrete things you discovered, each backed by a number from one of the previous days.
3. **A chart** — the delivery-vs-review chart from Day 3 (`delivery_vs_review.png`).
4. **A dashboard screenshot** — the Power BI dashboard from Day 4 (`../day4_powerbi/dashboard.png`).
5. **The qualitative finding** — what the unhappy reviews actually say (from Day 5 Exercise 3 themes).
6. **Recommended actions** — what should Olist's marketplace ops team do? Be specific. Name 2–3 sellers or categories.

## Suggested structure

```markdown
# Olist customer satisfaction analysis

## TL;DR
- Late delivery is the #1 driver of bad reviews (X% of 1–2 star reviews mention delivery)
- N sellers account for Y% of all bad reviews — concentrated risk
- Z categories systematically underperform — even on-time orders get bad reviews

## The data
Olist Brazilian e-commerce platform — ~100K orders, 2017–2018.

## Finding 1: Delivery time strongly drives review score
[chart: delivery_vs_review.png]
On-time orders average 4.2 stars; orders >30 days late average 2.5 stars.

## Finding 2: The damage concentrates in N sellers
[table: top 5 risky sellers by revenue × low-review impact]
These 5 sellers represent X% of revenue but Y% of bad-review impact.

## Finding 3: Some bad-review patterns are not about delivery
[review theme breakdown from Day 5 Exercise 3]
~25% of bad reviews mention product quality or wrong-item issues, independent of shipping.

## Dashboard
[image: dashboard.png]
Interactive version: capstone/day4_powerbi/dashboard.pbix

## Recommendations
1. ...
2. ...
3. ...
```

## How to use Claude Code for this hour

Here's a worked workflow. Adapt it to your style.

### Step 1 — Have Claude assemble a first draft (10 min)

Prompt:

```
INPUT: Look at all CSVs in capstone/ (day2_sql, day3_python) and the
       markdown READMEs in each day's folder. Also read curriculum/day5_claude_code/
       exercises/README.md Exercise 3 for the review theme analysis I did.
TASK:  Draft a 1-page markdown report following the structure I'll paste below.
       Use real numbers from the CSVs. Don't invent anything.
OUTPUT: Save as capstone/day5_ai/final_report.md.

Structure: [paste the structure above]
```

### Step 2 — Sanity-check the numbers (10 min)

For every number Claude wrote in the draft, find its source in your earlier work. If you can't, ask Claude where the number came from. **Do not ship a number you can't trace.**

### Step 3 — Replace the recommendations with your own (5 min)

The "Recommended actions" section is **your** judgment. Don't let Claude write it. Look at the findings, think for 5 minutes, then write 3 specific recommendations in your own words.

### Step 4 — Polish (5 min)

Read the report aloud. Anything jargon-y? Replace it. Any sentence longer than 20 words? Split it. A non-analyst should read this and feel informed in 5 minutes.

## Presentation (30 min, last block of the day)

Each student gets **3 minutes** + 2 audience questions. Use a timer.

Suggested presentation structure (3 min):
- **30s:** The business question and why it matters
- **60s:** Your 1–2 most surprising findings (with the number)
- **60s:** What you'd do about it (the recommendations)
- **30s:** What was hardest and what you'd do next

**Don't read your slides.** Speak to the audience.

## Deliverable checklist

```
capstone/day5_ai/
├── final_report.md
├── presentation.md            # optional speaker notes — bullet form is fine
└── (no extra screenshots needed — link to day4_powerbi/dashboard.png
    and day3_python/delivery_vs_review.png)
```

## Rubric

| Dimension | What we're looking for |
|---|---|
| **Correctness** | Every number is traceable to one of the earlier days |
| **Clarity** | A non-analyst gets the point in 5 minutes |
| **Insight depth** | You went beyond "here are some numbers" to "here's what to do" |
| **Tool use** | Claude Code helped you go faster, didn't do the thinking |

## After the course

Push your capstone folder to your own fork of this repo. Add the report URL to your LinkedIn / portfolio. **This is real work** — 5 days, real data, real findings. Most analytics bootcamps don't produce something this concrete.
