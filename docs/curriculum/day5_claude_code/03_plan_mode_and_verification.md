# Lesson 3 — Plan mode & verification

**Time:** ~25 min.
**You'll be able to:**

- Use plan mode to catch misunderstandings before Claude touches a file
- Build the **verification reflex** — sanity-check numbers, read generated code, spot-check rows
- Recognise the three failure modes most likely to bite you (hallucinated numbers, silent wrong joins, confident wrong answers)
- Push back productively when a number doesn't reconcile

Lessons 1 and 2 taught you how to ask. This lesson teaches you how to confirm the answer is correct. Without it, you'll be a faster wrong-answer producer; with it, you're an actual analyst with leverage.

## Plan mode

Claude Code has a **plan mode** — a switch (in the UI or via `/plan`) that puts it in "read, propose, don't execute" mode. In plan mode:

- Claude reads your files and understands the request
- Claude proposes a step-by-step plan
- **Nothing is written, run, or changed** until you approve

You read the plan, suggest changes, approve. Then Claude executes.

For any task more complex than "tell me the row count," **use plan mode.** It costs you 30 seconds and catches misunderstandings cheap.

### The plan-mode workflow

```
1. You: "INPUT/TASK/OUTPUT" prompt + toggle plan mode
2. Claude: reads files, asks clarifying questions, proposes a plan
3. You:  review the plan, push back on anything wrong, approve
4. Claude: executes the approved plan
5. You: verify the output
```

The proposed plan often surfaces an assumption you didn't know Claude was making — "I'll dedupe `reviews` on `order_id` by keeping the most recent" or "I'll treat empty `delivered_date` as on-time." If those assumptions are wrong for your purpose, this is where you say so. Cost of fixing: one sentence. Cost of fixing after execution: re-running the analysis.

### When to skip plan mode

| Skip plan mode | Use plan mode |
|---|---|
| One-shot questions ("how many rows in X?") | Anything touching multiple files |
| Quick clarifications about syntax | Anything that writes a file |
| Asking Claude to explain code | Anything where you're not sure how Claude will interpret the question |

A rough heuristic: if the answer is "a number," skip. If the answer is "a workflow," use plan mode.

## The verification reflex

Three habits, in order of frequency you'll use them:

### Habit 1 — Sanity-check the magnitude

!!! tip "Use your earlier days as ground truth"
    The four days before this one were practice; today they become your **reference set**. If Claude says avg review = 3.1 but Day 4's dashboard said 4.1 and Day 2's SQL said ~4.1 too, Claude is wrong — not the four prior days. Trust the artifact you built and verified, not the new answer.

When Claude produces a number, ask: **does it match what I already know from earlier days?**

You've been computing the same things across Excel, SQL, pandas, and Power BI all week. The numbers should line up. If today's Claude-produced answer says `avg_review = 3.1` and Day 4's dashboard said `4.1`, one of them is wrong.

Useful comparison checkpoints:

| Number Claude might give you | Cross-reference |
|---|---|
| Total order count | Day 2: `SELECT COUNT(*) FROM orders` → 99,441 |
| Average review score | Day 4 dashboard or Day 3 `reviews['review_score'].mean()` → ~4.1 |
| % of late deliveries | Day 4 `% Late` measure → ~7% |
| Late vs. on-time review gap | Day 2 Lesson 5 "Try it yourself" → ~2.3 vs ~4.2 |
| Top seller's revenue | Day 2 Lesson 4 "Try it yourself" → ~R$ 230K |

Keep a sticky note (literal or mental) of these reference numbers. Two minutes of curiosity catches confident wrong answers.

### Habit 2 — Read the code before the result

When Claude writes a SQL query or pandas snippet, **skim it before scrolling to the output.** Three minutes of code reading often catches what would otherwise become an hour of "why is this wrong?".

Things to scan for:

- **Join columns** — does the `ON` clause match what you'd pick?
- **Filters** — is the empty-string trap handled? Are dates in ISO format?
- **Aggregations** — `SUM` where it should be `AVG`? `COUNT(*)` where it should be `COUNT(DISTINCT)`?
- **Dedupe** — did Claude silently `drop_duplicates` on the right side of a merge?

You don't have to be able to write the code from scratch to read it critically. If something looks off, ask Claude to explain that specific line. "Why are you using `INNER JOIN` and not `LEFT JOIN` here?" is a great prompt.

### Habit 3 — Spot-check three rows

When Claude produces a summary (themes, classifications, "top sellers"), pick **three rows at random** and verify them by hand against the underlying data.

```
Claude says seller X has 12 1-star reviews about late delivery.
Open data/olist/olist_order_reviews_dataset.csv, filter to seller X's orders,
look at the actual review comments. Are they really about late delivery?
```

This catches the worst Claude failure mode: confident classifications that don't match the source. Especially common in free-text analysis (Lesson 5).

## The three failure modes that bite

### 1. Hallucinated numbers

Claude occasionally invents a number that wasn't in the data. Rare but catastrophic — it sounds confident, you trust it, you ship it.

**How to catch it:** the magnitude-check habit. If a number doesn't reconcile with your reference checkpoints, push: *"Where exactly did 23.4% come from? Show me the rows."*

### 2. Silent wrong joins

Claude joins the wrong way and the resulting dataset is subtly inflated or deflated. Numbers look plausible. They're systematically wrong by 10-30%.

**How to catch it:** the code-reading habit. Always look at `ON` clauses and `merge(…, on=, how=)`. Especially watch for `INNER JOIN` where you wanted `LEFT JOIN` (drops unmatched rows) or `LEFT JOIN` where duplicates on the right side weren't handled.

### 3. Confident wrong answers

Claude misreads the question and produces a confident, well-formatted answer to a different question. The bug isn't in the code — it's in the interpretation.

**How to catch it:** plan mode. Asking "let's plan this first" makes Claude state its interpretation in prose, which is where the misread is obvious. Without plan mode, you only see the answer, by which point you've already paid for the misread.

## Pushing back productively

When something is wrong, *be specific about what.* Compare:

**Vague pushback:**

> That doesn't look right.

Claude will guess what's wrong and try again, probably wrong.

**Specific pushback:**

> Your `late` count is 12,432 but my Day 2 SQL count was 7,891. The difference is 4,541. Most likely cause: you're treating empty `order_delivered_customer_date` as "before estimated date" and tagging them as late. Re-run with `WHERE order_delivered_customer_date != ''` and show me the new count.

Notice what the specific pushback contains:

- The exact mismatch
- A *hypothesis* about the cause
- A concrete instruction to verify

This is the difference between "Claude as an oracle" and "Claude as a debugging partner."

## When to trust without verifying

You won't verify everything — that defeats the purpose of using AI. Trust without verification is reasonable when:

- The task is **easily checkable** even if wrong (e.g., a quick chart that you'll eyeball)
- The output is **prose, not numbers** (a summary of a known finding)
- The cost of being wrong is **low** (a working draft of the report, not the final number)

The rule: **trust effort proportional to the cost of being wrong.** A capstone deliverable: verify. An exploratory question to spark ideas: don't bother.

??? note "Try it yourself — catch the wrong number"
    Prompt Claude Code with this *deliberately under-specified* question and watch for the trap:

    > How many Olist orders were delivered late?

    Claude will give you a number. **Before accepting it**, do all three verifications:

    1. **Magnitude check** — does it match Day 2's late-vs-on-time finding (which said ~2.3 avg review for late vs ~4.2 for on-time)? You'd expect late orders to be a minority — maybe 5–15% of delivered orders.
    2. **Read the code** — did Claude handle the empty-string-vs-NULL trap? Did it use `!= ''` (correct) or `IS NOT NULL` (wrong for this CSV-loaded DB)?
    3. **Spot-check** — pick 3 "late" `order_id`s from Claude's output. Open the orders table, look at the dates. Were they actually late?

    Now write a follow-up prompt that pins down the definition and gets the right number.

    ??? success "Reveal — a good follow-up"
        ```
        Re-run with explicit filters:
        - Only orders where order_delivered_customer_date != '' (delivered orders only)
        - Late = order_delivered_customer_date > order_estimated_delivery_date
        - Output: count and percentage of orders that are late.
        Show me the SQL.
        ```

        Expected count: ~7,800 late out of ~96,500 delivered → about 8%. If Claude gave you something wildly different on the first run, you've discovered exactly the failure mode this lesson is about.

## Common pitfalls

1. **Trusting because it's plausible.** Confident wrong is the most expensive failure mode. Numbers without verification are guesses.
2. **Skipping plan mode for "small" tasks that touch files.** Even small file-touching tasks benefit; the cost is 30 seconds.
3. **Asking Claude to "double-check itself."** Useless. You verify; Claude doesn't have a separate truth source.
4. **Iterating without a hypothesis.** "That's wrong, try again" produces another guess. "That's wrong because of the empty-string handling; re-do with `!= ''`" produces a fix.
5. **Treating verification as a chore.** It's the job. The typing is fast; the editing is where your judgment compounds.

## What's next

Continue to **[Lesson 4 — AI-assisted querying & analysis](04_ai_assisted_querying.md)** — applying everything so far to re-do the Day 2 and Day 3 work, faster.
