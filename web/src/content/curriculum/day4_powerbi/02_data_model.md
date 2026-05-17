# Lesson 2 — The data model

**Time:** ~25 min.
**You'll be able to:**

- Switch to Model view and read the relationship diagram
- Create and edit relationships between tables
- Distinguish one-to-many, many-to-one, and the dreaded many-to-many
- Read the `1 ─ *` cardinality notation and the cross-filter direction arrow
- Verify Power BI's auto-detected relationships before trusting them

This is the lesson where Power BI starts feeling different from Excel. You're not putting everything in one wide table — you're letting tables stay normalised and telling Power BI how they connect.

## Why the model matters

Every visual in Power BI silently runs a query against your model. If the relationships are wrong:

- Aggregates inflate (orders counted twice, revenue doubled)
- Slicers don't filter what you expected
- Cross-filtering does nothing or filters the wrong direction

**Fix the model first.** Every minute spent in Model view saves an hour debugging a visual that "almost works."

## Model view

The third icon in the left sidebar (after Report and Data). You'll see your tables as boxes, with lines connecting them.

Each line is a **relationship**. The dot ends carry cardinality markers:

- `1` — one side (each key value is unique here)
- `*` — many side (key values can repeat)

The arrow on the line shows **filter direction** — which side filters the other when a user clicks a slicer.

## The two relationship types you'll actually use

### One-to-many (the workhorse)

```
customers (1) ── orders (*)
```

Each customer appears once in `customers`; the same `customer_id` shows up many times in `orders` (one per order). Read it as "one customer has many orders." Filtering on `customers` (e.g., by state) flows down to `orders`. Filtering on `orders` does **not** flow up by default.

This is the relationship for every Olist link you'll create today.

### Many-to-many (the trap)

```
customers (*) ── orders (*)
```

This shows up when the join column **isn't unique on either side**. It "works" — Power BI lets you create it — but aggregates inflate weirdly and filter direction becomes ambiguous.

If you see `*─*` in Model view, **something's wrong**. The most common cause: you joined on the wrong column. Look at the relationship dialog (double-click the line) and check the join columns.

!!! note "Why this matters more here than in SQL"
    In SQL (Day 2 Lesson 3) you stated joins explicitly per query — wrong join = wrong query, but only in *that one query*. In Power BI you state relationships once in the model, and **every visual on every page** reuses them. A wrong cardinality silently inflates every measure that touches that join. Worth the extra five minutes here.

## Creating a relationship

Three ways:

1. **Drag** from the join column in one table to the matching column in the other.
2. **Home → Manage Relationships → New** for explicit, type-the-columns control.
3. Trust Power BI's auto-detection (it runs on first load) — then verify each one.

### The Manage Relationships dialog

| Field | What to set |
|---|---|
| Table 1, Column 1 | The "many" side (e.g., `orders`, `customer_id`) |
| Table 2, Column 2 | The "one" side (e.g., `customers`, `customer_id`) |
| Cardinality | **Many to one (\*:1)** for almost every relationship today |
| Cross filter direction | **Single** (the default) — preserves intuitive flow |
| Make this relationship active | Yes |

**Stick with the defaults** unless you have a specific reason not to. Bidirectional filtering and inactive relationships have their place, but they're advanced features. Start with single-direction many-to-one.

## Verifying auto-detected relationships

Power BI tries to detect relationships when you load tables. Some auto-detections are right; some are wrong; some are missing.

**Always do this audit after the first Close & Apply:**

1. Switch to Model view.
2. For each pair of tables you expect to be linked, look for a line.
3. For each line, check:
   - Are the join columns correct? (Double-click the line to see.)
   - Is the cardinality `1 ─ *` (not `* ─ *`)?
   - Does the arrow point from the "one" side toward the "many" side?
4. Missing line? Drag the join column from one table to the other.
5. Wrong line? Click → Delete → recreate it.

## A pattern worth knowing: the star schema

If you've heard the term and wondered: a **star schema** is one fact table (rows = events; e.g., `items` or `orders`) surrounded by dimension tables (descriptive lookups; e.g., `customers`, `products`, `sellers`). Every dimension has a one-to-many relationship into the fact table.

The Olist schema is loosely a star/snowflake:

```
        customers           sellers     products
            │                  │           │
            │                  │           │
            ▼                  ▼           ▼
         orders ◄──────────  items
            │
            ▼
         reviews
```

You don't need to know the theory today. Just know that "fact + dimensions" is the default shape, and Power BI is built around it.

## Renaming tables for the field pane

Every table name shows up in the Fields pane on the right. `olist_order_items_dataset` is technically correct and visually awful.

In Model view (or Report view), double-click the table name → rename:

| From | To |
|---|---|
| `olist_orders_dataset` | `Orders` |
| `olist_order_items_dataset` | `Items` |
| `olist_order_reviews_dataset` | `Reviews` |
| `olist_customers_dataset` | `Customers` |
| `olist_sellers_dataset` | `Sellers` |
| `olist_products_dataset` | `Products` |
| `product_category_name_translation` | `Categories` |

Friendlier names show up in every tooltip and field. Cheap polish.

??? note "Try it yourself — set up the Olist model"
    Continuing from Lesson 1's `Orders` query:

    1. Load three more tables: `olist_order_items_dataset.csv` (rename to `Items`), `olist_order_reviews_dataset.csv` (rename to `Reviews`), `olist_customers_dataset.csv` (rename to `Customers`).
    2. Switch to **Model view**.
    3. Verify or create these relationships:
       - `Orders[customer_id]` → `Customers[customer_id]` (many-to-one)
       - `Items[order_id]` → `Orders[order_id]` (many-to-one)
       - `Reviews[order_id]` → `Orders[order_id]` (many-to-one)
    4. Each line should show `*` on the `Items`/`Reviews`/`Orders` (many) side and `1` on the `Orders`/`Customers` (one) side. If you see `*─*`, double-click the line and fix it.
    5. Switch back to Report view. Drag a Card onto the canvas, put `Customers[customer_state]` into Slicer. Drop `Orders[order_id]` into a Card → switch aggregation to **Count**. Click "SP" in the slicer.

    **What you should see:** the order count drops to roughly 40% of the total (SP is the biggest state). If it doesn't change, your `Orders` → `Customers` relationship isn't filtering — re-check Model view.

    ??? success "If the slicer doesn't filter"
        - **Wrong direction:** the relationship is `Orders → Customers` but Power BI didn't detect the right "many" and "one" side. Double-click the line, swap the columns if needed.
        - **Missing line:** drag `Orders[customer_id]` to `Customers[customer_id]`.
        - **`*─*` cardinality:** there are duplicate `customer_id`s in `Customers` (Olist's quirk: `customer_unique_id` is what's truly unique). For today, keep `customer_id` as the join — it's still one per order, which is what we need.

## Common pitfalls

1. **Trusting auto-detection.** It works most of the time. The 10% it gets wrong is the 10% you'll spend an hour debugging.
2. **Many-to-many "fixes" with bidirectional filters.** They work, briefly, then break in subtle ways. Almost always the right fix is a cleaner join column.
3. **Joining on text columns with whitespace.** `'SP'` ≠ `'SP '`. Trim in Power Query before the relationship.
4. **Joining `customer_id` when you should have used `customer_unique_id`.** Same person can show up under different `customer_id`s in Olist. For per-customer analysis, use `customer_unique_id`. For per-order analysis (today), `customer_id` is fine.
5. **Bidirectional cross-filter as a default.** Use single. Bidirectional is for specific cases (e.g., dimension-to-dimension lookups) and creates unexpected results in others.

## How this shows up in the capstone

The capstone dashboard joins 7 Olist tables. Every visual depends on those relationships being correct. The bottom-10-sellers table needs `Items → Sellers` and `Items → Orders → Reviews`; the map needs `Orders → Customers`; the category bar chart needs `Items → Products → Categories`. Get the model right and every visual "just works."

## What's next

Continue to **[Lesson 3 — Building visuals](03_visuals.md)**.
