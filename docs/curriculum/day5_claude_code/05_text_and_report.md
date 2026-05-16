# Lesson 5 — Text analytics & shipping the final report

**Time:** ~30 min.
**You'll be able to:**

- Use Claude Code for the analytics task that pre-AI tools couldn't do well: extracting themes from thousands of free-text reviews
- Iterate a classification taxonomy when the first pass produces a giant "other" bucket
- Assemble a stakeholder-ready report that combines numbers from Days 1–4 with qualitative themes from today
- Keep the **business interpretation** as yours — don't let Claude write the recommendations

This is the lesson that justifies AI's place in the analytics stack. Everything before today, a Python script could have done. The text analysis below could not.

## Why text is genuinely AI-shaped work

The Olist reviews include `review_comment_message` — free Portuguese text from customers. Roughly 40% of reviews have a comment. Among 1-star reviews, that's tens of thousands of short complaints.

You **cannot**, with Excel / SQL / vanilla pandas:

- Read 30,000 Portuguese comments and find the patterns
- Distinguish "the delivery was late" from "the product was wrong"
- Translate, classify, and summarise at scale

You **can** with a 2018 setup involving NLP libraries (NLTK, spaCy, custom training data) — but that's a week of setup for a one-day analysis. Claude Code makes it 30 minutes.

## The theme-extraction workflow

Six steps. Time-box each.

### 1. Filter to unhappy reviews with text (2 min)

```
INPUT: data/olist/olist_order_reviews_dataset.csv
TASK:  Filter to rows where review_score IN (1, 2) AND review_comment_message
       is non-empty. Tell me how many rows you have.
OUTPUT: the filtered count, and a sample of 5 comments to confirm
        they're Portuguese and they're complaints.
```

You should see ~9–12K rows. Skim the 5 samples to confirm scope.

### 2. Propose an initial taxonomy (5 min)

```
TASK: Without classifying yet, sample 50 of the filtered comments and
      propose 5–7 mutually exclusive theme labels that would cover them.
      For each, give a name (short, snake_case) and a one-sentence definition.
OUTPUT: a Markdown table: name | definition | example_comment_in_portuguese.
```

You're letting Claude do the cognitive work of seeing patterns. The output is a *proposed* taxonomy — not the final one.

Read the proposed themes. Push back if any feel redundant or vague. A starter set for Olist:

| theme | meaning |
|---|---|
| `delivery_late` | Slow shipping, took too long, didn't arrive on time |
| `no_show` | Order never arrived at all |
| `wrong_product` | Wrong item / different from description |
| `damaged` | Item arrived broken or damaged |
| `quality` | Item works but is low quality / not as described |
| `other` | Doesn't fit the above |

The `other` bucket is the relief valve. If it's <15% in the final pass, the taxonomy is good. If it's 30%+, the taxonomy needs more buckets.

### 3. Classify all comments (5 min)

```
INPUT: the filtered review comments from step 1.
TASK:  Classify each comment into one of the themes from step 2.
       The comments are in Portuguese — handle that.
       Reviews can have multiple themes; pick the dominant one (the primary
       complaint).
OUTPUT: a CSV at capstone/day5_ai/review_themes.csv with columns:
        order_id, review_score, review_comment_message, theme.
        Plus a summary table: theme | count | pct_of_total.
```

Claude runs through all rows. This takes a minute or two for ~10K rows.

### 4. Spot-check the classification (5 min)

The verification habit from Lesson 3, applied harder:

```
TASK: Pick 5 reviews at random from each theme. Show me:
      - the original Portuguese comment
      - the Claude-assigned theme
      - a 1-line English summary of what the comment actually says
```

For each, ask yourself: does the theme match the comment? **You may not speak Portuguese.** That's fine — Claude's English summary is what you're checking. If the summary doesn't fit the theme, the classification is wrong; investigate.

Patterns to watch for:

- **Generic comments classified specifically.** "Terrible service" → assigned to `delivery_late` when it could be anything. Ask Claude to mark vague comments as `other`.
- **Mixed complaints picked arbitrarily.** A comment about both "late and damaged" picked as just one. Decide whether to count once or to allow multi-theme.
- **English mixed in.** A few Olist comments are in English. Worth a separate spot-check.

### 5. Iterate the taxonomy (5 min)

If the `other` bucket is over 20% or the spot-check found classification errors, iterate:

```
The 'other' bucket has 28% of reviews — too high. Sample 20 reviews from
'other' and tell me what they're about. Then propose 1–2 new theme
categories I should add.
```

Apply the suggested additions. Re-classify. Re-spot-check. Two rounds is usually enough.

### 6. Cross with sellers/categories (5 min)

The real analytical payoff: which **sellers** or **categories** are dominated by which **themes**?

```
INPUT: capstone/day5_ai/review_themes.csv, plus data/olist/olist.db
       (orders, items, sellers, products tables).
TASK:  For each of the top 10 risky sellers from capstone/day2_sql/risky_sellers.csv,
       compute the breakdown of their bad reviews by theme. Same for the
       top 5 worst categories from capstone/day2_sql/worst_categories.csv.
OUTPUT: two tables — one per seller, one per category. Each row shows the
        seller/category, total bad reviews, and the % breakdown per theme.
```

This is **the** answer to the business question. Now you know whether seller X's problem is logistics (fix it via SLAs / carrier change) or product quality (fix it by dropping the seller or auditing inventory).

## Assembling the final report

The capstone deliverable is a 1-page markdown file: `capstone/day5_ai/final_report.md`. Required sections:

| Section | What's in it | Where the data comes from |
|---|---|---|
| TL;DR | 3 bullets — punchline, 30 seconds to read | Synthesised across all days |
| The data | One paragraph about Olist, the time range, the question | Generic intro |
| Finding 1 | Delivery time drives review score | Day 3 chart `delivery_vs_review.png` + Day 2 numbers |
| Finding 2 | A concentrated set of sellers cause disproportionate harm | Day 2 / 3 risky_sellers, Day 4 dashboard table |
| Finding 3 | A meaningful share of bad reviews are product / quality, not delivery | Today's theme analysis |
| Dashboard | Embed `dashboard.png` from Day 4 | Day 4 |
| Recommendations | 3 specific actions for Olist's ops team | **Your judgment — not Claude's** |

The first six sections Claude can draft well. The seventh is where you stop and write yourself.

### Drafting with Claude

```
INPUT: All CSVs in capstone/ (day2_sql/, day3_python/, day5_ai/),
       and the structure I'll paste below.
TASK:  Draft a 1-page markdown report following the structure.
       Use real numbers from the CSVs — don't invent any.
       For each number, add a parenthetical citing the source file.
OUTPUT: capstone/day5_ai/final_report.md.

Structure: [paste the table above with your section names]
```

Read the draft. Trace every number to its source CSV. Fix anything that doesn't reconcile.

### Replace the recommendations yourself

For the recommendations section, **close Claude Code and write it yourself**. Five minutes. Three concrete actions for Olist's marketplace ops team. Specific names of sellers, specific categories, specific interventions.

Example shape (don't copy — write your own based on what you found):

```markdown
## Recommended actions

1. **Logistics intervention for the 5 worst-delivery sellers**
   (seller IDs: X, Y, Z, …). Their on-time orders rate as well as the
   marketplace average — the issue is fulfillment, not the product.
   Action: SLA enforcement or carrier change.

2. **Quality review for `furniture` and `electronics`.**
   Even on-time orders in these two categories score 1.2 stars below average.
   Action: spot-check seller listings; audit return rates per SKU.

3. **Make the delivery estimate visible at checkout.**
   The data shows estimate accuracy correlates with satisfaction independently
   of actual speed — customers tolerate a slow delivery they expected but not
   a fast one that broke the estimate. Action: tighten estimator,
   show it prominently.
```

This section is **why analysts get hired.** Don't outsource it.

## Sanity-check the final report

Before submitting:

- [ ] Every number is traceable to one of the day-2/3/4 CSVs or to today's theme analysis
- [ ] The chart from Day 3 (`delivery_vs_review.png`) renders
- [ ] The dashboard PNG from Day 4 renders
- [ ] The recommendations are in your own words and feel specific
- [ ] TL;DR is exactly 3 bullets — not 2, not 5
- [ ] Total length: 1 page when rendered. Cut if longer.

??? note "Try it yourself — propose a taxonomy"
    Open Claude Code. Use the Lesson 2 INPUT/TASK/OUTPUT template to ask:

    *"Sample 50 reviews from olist_order_reviews_dataset.csv where review_score is 1 or 2 and the comment is non-empty. Propose 5–7 mutually exclusive theme categories that cover them. Don't classify yet — just propose."*

    Read Claude's proposed taxonomy. Spot-check 3 of the example comments against the proposed themes. Note any themes that overlap or feel vague.

    Then iterate: ask Claude to propose 1 better taxonomy after you point out the overlaps.

    ??? success "What good iteration looks like"
        **First pass** might give you: `delivery`, `product_quality`, `customer_service`, `wrong_item`, `other`.

        Problems you might spot:
        - `delivery` is too broad — split into `delivery_late` and `no_show`?
        - `customer_service` doesn't show up in the actual reviews; Claude inferred it generically.

        **Second pass**, after pushback: `delivery_late`, `no_show`, `wrong_product`, `damaged`, `quality`, `other`. Tighter, all five visible in the data.

        Two rounds of iteration is normal. More than three suggests the data doesn't cluster cleanly — accept a bigger `other` bucket or pivot to a finer-grained taxonomy.

## Common pitfalls

1. **Letting Claude write the recommendations.** Generic recommendations are the giveaway that no human thought about the data. Always write yours.
2. **Trusting the first taxonomy.** Always do at least one spot-check pass.
3. **Numbers in the report that don't reconcile.** Every TL;DR bullet needs a Day 2/3/4 source. If you can't cite it, cut it.
4. **Embedding screenshots without testing the markdown.** Open the report after writing; confirm both PNGs render.
5. **Submitting a report longer than one page.** The constraint isn't aesthetic — it's the test of whether you've actually synthesised. Cut.

## You've finished the lessons

Take the **[self-test](test.md)** — 12 questions covering the five lessons. Then ship: **[Day 5 capstone — final report + presentation](../../capstone/day5_ai/README.md)**.
