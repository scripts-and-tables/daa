# Day 5 — Self-test

Twelve questions. More conceptual than the previous days — about *how* to work with AI, not which function to call. Write your answer before clicking to reveal.

Quick re-read links: [Lesson 1](01_getting_started.md) · [Lesson 2](02_prompting.md) · [Lesson 3](03_plan_mode_and_verification.md) · [Lesson 4](04_ai_assisted_querying.md) · [Lesson 5](05_text_and_report.md).

---

??? question "1. Rewrite this vague prompt using the INPUT / TASK / OUTPUT template: 'Find the worst sellers.'"
    **Answer (one good version):**
    ```
    INPUT:  data/olist/olist.db, tables items, orders, reviews, sellers.
            Empty cells are empty strings, not NULL.
    TASK:   For each seller with >= 50 orders, compute total revenue,
            avg review_score, and pct of 1-2-star reviews. Rank by
            revenue × (1 - avg_review_score/5) descending.
    OUTPUT: Top 10 as a Markdown table, plus the SQL you ran.
    ```
    The key shifts: named inputs, an explicit definition of "worst," explicit output shape.

??? question "2. When should you toggle plan mode before sending a prompt?"
    **Answer:** Any task that touches multiple files, writes a file, or where you're not sure how Claude will interpret the question. Plan mode forces Claude to state its interpretation in prose before executing — which is where misreads are obvious. Skip plan mode for simple "what's the count?" questions where the answer is just a number.

??? question "3. Claude tells you 'average review score is 3.1.' Your Day 4 dashboard said 4.1. What do you do?"
    **Answer:** Don't accept either yet. Ask Claude:
    > "My Day 4 dashboard shows avg review = 4.1. You're showing 3.1. Find the discrepancy — is it the filter (e.g., only counting bad reviews), the join (e.g., LEFT JOIN inflating with NULLs), or a different population entirely?"

    Specific pushback (cite the reference number + propose a hypothesis) beats vague "are you sure?"

??? question "4. What's the 'show me the code before the result' trick, and why does it matter?"
    **Answer:** Adding "show me the SQL/code you ran before the table" to your prompt. It shifts Claude from producing an opaque answer to producing a verifiable artifact. You can then read the code, spot the wrong join/filter/dedupe before trusting the output. Without that phrase you're an oracle-consulter; with it you're an editor of code.

??? question "5. Claude's SQL query against the Olist DB returns 0 rows for 'undelivered orders.' What's the most likely cause?"
    **Answer:** Claude used `WHERE order_delivered_customer_date IS NULL`, but the SQLite DB was loaded from CSV — empty cells are **empty strings, not NULLs**. Tell Claude:
    > "This DB was loaded from CSV; empty cells are empty strings. Use `!= ''` (or `= ''` to find missing) instead of `IS NOT NULL` / `IS NULL`."

??? question "6. What's one prompt phrase that pre-empts most Olist-specific Claude mistakes for a new session?"
    **Answer:** A short preamble like:
    > "Context: Olist Brazilian e-commerce, ~100K orders 2017-2018. SQLite DB loaded from CSVs, so empty cells are empty strings (`''`), not NULLs. Product categories are in Portuguese — translate via the `category_translation` table. Always show me the SQL/code before the result."

    Pasted once per session, it eliminates the four most common silent mistakes.

??? question "7. Spot the bug: Claude wrote `pd.cut(df['delivery_days'], bins=[0, 7, 14, 30, 1000])` and the post-cut row count is smaller than the pre-cut row count."
    **Answer:** `pd.cut` defaults to **left-exclusive, right-inclusive** intervals: `(0, 7], (7, 14], …`. Rows where `delivery_days == 0` (same-day delivery) don't fit any bin and get dropped silently.

    Two fixes: change `bins[0]` from `0` to `-1`, **or** pass `include_lowest=True`. Tell Claude:
    > "Same-day deliveries are being dropped — use `bins=[-1, 7, 14, 30, 1000]`."

??? question "8. You ask Claude to extract themes from review comments. The 'other' bucket comes back at 35%. What's the move?"
    **Answer:** Iterate the taxonomy. Sample reviews from `other` and ask Claude what they're about, then propose 1–2 new theme categories.
    > "The 'other' bucket has 35% of reviews — too high. Sample 20 reviews from 'other' and tell me what they're about. Then propose 1-2 new theme categories I should add."

    Re-classify with the expanded taxonomy. Target `other` < 15%.

??? question "9. Which of these is genuinely AI-shaped work — a task you couldn't do well with Excel/SQL/vanilla-pandas?"
    **Options:** (a) summing revenue by category, (b) joining orders with reviews, (c) extracting themes from 10,000 Portuguese review comments, (d) computing % of late deliveries.
    **Answer:** (c). The other three are pure structured-data tasks the previous-day tools handle perfectly. Free-text classification at scale is where AI's value is irreplaceable.

??? question "10. You're writing the capstone's final report. Which section should Claude **not** draft?"
    **Answer:** The recommendations section. The findings (numbers, charts) can be drafted by Claude and verified against source CSVs. The recommendations require business judgment — what an analyst is hired to provide. Letting Claude write recommendations produces generic, indistinguishable-from-any-marketplace advice. Write them yourself.

??? question "11. Three verification habits from Lesson 3 — name them."
    **Answer:**

    1. **Sanity-check the magnitude** — compare Claude's numbers to your reference checkpoints from Days 1–4.
    2. **Read the code before the result** — scan for wrong joins, wrong aggregations, wrong filters.
    3. **Spot-check three rows** — pick rows from Claude's output at random and verify them against the source data.

??? question "12. When should you trust Claude without verifying?"
    **Answer:** When the cost of being wrong is low — exploratory questions, throwaway charts, draft prose you'll edit anyway. Verify proportional to the cost: a number in a deliverable, always verify; a quick sketch you'll throw away, don't bother.

---

**Got 9+ right?** **[Ship the final report →](../../capstone/day5_ai/README.md)**

**Got fewer?** Re-read the relevant lesson. The capstone is the final deliverable of the course; getting these habits right here makes the capstone smoother.
