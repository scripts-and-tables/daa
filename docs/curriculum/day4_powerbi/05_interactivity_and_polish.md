# Lesson 5 — Interactivity, layout & polish

**Time:** ~25 min.
**You'll be able to:**

- Add slicers (single, multi, range) and pick the right type for the question
- Edit visual interactions when cross-filtering does too much
- Lay out a 1-page dashboard that a non-analyst can use without help
- Apply a theme and consistent formatting in under 60 seconds
- Export the dashboard as a PNG / PDF for embedding elsewhere

The dashboard is built. This lesson is about making it usable by someone who isn't you.

## Slicers — the visible filter

A slicer is just a filter the user can see and click. Three slicer types you'll meet:

| Slicer style | When to use |
|---|---|
| **List / dropdown** | Categorical with a few-to-many values: `customer_state`, `order_status`, `category` |
| **Between / range** | Continuous: dates, prices, scores |
| **Single-select dropdown** | Categorical, but you want one choice at a time |

### List slicer

Drop a categorical field into a Slicer visual. By default it's a multi-select list.

```
Visualizations pane → Format → Slicer settings → Selection
```

- **Multi-select with CTRL** off → click to select, click again to deselect. Cleaner for click-heavy use.
- **Single select** → behaves like a radio button. One choice at a time.

### Date / range slicer

Drop a `Date/Time` or numeric field into a Slicer. The default style is "Between" — two thumbs the user drags.

For dates, also useful: **Before** and **After** styles (Format → Slicer settings → Style). For numeric like `price`, the "Between" style works well.

### Sync slicers across pages

If your report grows to multiple pages, a slicer on page 1 doesn't automatically affect page 2.

```
View → Sync slicers → pick the pages this slicer applies to
```

For today's single-page capstone you won't need this. Worth knowing it exists.

## Edit interactions — fine control

By default, every slicer and every visual filters every other visual on the page. Sometimes that's too much.

Example: a card showing **overall** `% Late` should stay constant regardless of which bar a user clicks in the category bar chart. The card represents the population baseline; the bar chart is the per-category drill.

To break the cross-filter on one direction:

```
Select the source visual (the bar chart)
→ Format menu (top) → Edit interactions
→ Tiny toggle icons appear on every other visual:
    filter | highlight | none
→ Click "none" on the card
```

`filter` filters the target. `highlight` partially shades the target (works for bar/column). `none` ignores.

For most dashboards the defaults are fine. Reach for "Edit interactions" only when a user clicks something and the wrong thing happens.

## Themes

Apply a built-in or custom theme for consistent colors and fonts across every visual.

```
View → Themes → pick a built-in theme, or:
    Browse for themes (load a .json)
    Customise current theme (in-product editor)
```

For an internal class dashboard, the built-in **Default** or **Bold** is fine. Don't spend half your capstone hour on color palettes.

## Layout: the 4–6-visual single-page dashboard

Three rules that compound:

### 1. One page, no tabs

If you have to scroll or click a tab, your user won't. Fit everything onto one screen. The screen size to target: 16:9 at 1280 × 720 (Power BI's default "16:9" page size).

Use Power BI's grid and snap-to-grid (View → Show gridlines, Snap objects to grid). Your visuals should align.

### 2. Story flow: top-left to bottom-right

Eye travels in a Z. Put the most important number top-left:

```
┌───────────────┬───────────────┬───────────────┬─────────────┐
│  KPI 1        │  KPI 2        │  KPI 3        │  Slicers    │
├───────────────┴───────────────┴───────────────┼─────────────┤
│                                                │             │
│  Main chart (revenue by category, big)         │  Secondary  │
│                                                │  chart      │
│                                                │  (map)      │
├────────────────────────────────────────────────┴─────────────┤
│  Detail table (bottom-10 sellers)                            │
└──────────────────────────────────────────────────────────────┘
```

Numbers up top (the punchline). Charts in the middle (the evidence). Detail table at the bottom (the drill-down).

### 3. One title, one subtitle

Top of the page, big enough to read from across the room: "Seller & Satisfaction Dashboard." Just below, smaller: the business question or "as of [date range]."

Don't title every visual; that's clutter. Title the page; let the visuals' default titles do the rest.

## Tooltips

Hovering a bar shows a tooltip with the bar's value. You can enrich tooltips with extra fields:

```
Visualizations pane → Tooltips well → drag fields in
```

For the capstone's bottom-10-sellers table, useful tooltip extras: `% Late`, `Avg delivery_days`, `City`. Lets the user see context without crowding the table.

## Export

When the dashboard is done:

| Format | How | When |
|---|---|---|
| `.pbix` | Save (Ctrl+S) | Always — the source-of-truth file |
| **PDF** | File → Export → Export to PDF | Static report for email |
| **PNG screenshot** | File → Export → Power BI template, or a screenshot tool | Embedding in markdown / slides |
| **Power BI Service** | File → Publish → My workspace | Cloud-hosted, interactive, shareable |

For Day 5's final report you'll embed a PNG. Use Windows' Snipping Tool or the built-in "Export to PDF" and crop the first page.

## A note on Power BI Service

If your org has a Power BI license, you can publish the `.pbix` to the cloud and share an interactive link. Without a license, the PNG export is your distribution path.

You won't publish today — but know it's one click away when you want to share an interactive dashboard with a stakeholder.

??? note "Try it yourself — polish your three-visual dashboard from Lesson 3"
    1. Add a fourth slicer for date: drop `Orders[order_purchase_timestamp]` into a Slicer visual. Format → Slicer settings → Style → **Between**.
    2. Click a bar in your "review by status" bar chart. Notice the line chart and card filter to that status.
    3. Format → Edit interactions on the bar chart. On the Total Revenue card, click **None**. Now clicking a status doesn't filter the headline revenue.
    4. View → Themes → pick a clean built-in theme. Note that all visuals re-color.
    5. File → Export → Export to PDF. Open the resulting PDF.

    ??? success "What good looks like"
        - Slicers all in one row, top-right
        - KPI cards top-left, big and readable
        - Charts visible without scrolling
        - PDF export resembles the on-screen layout (it may add a header/footer — that's fine)

## Common pitfalls

1. **Twelve visuals on one page.** Cut. The single most common dashboard mistake.
2. **Slicers everywhere.** One slicer can filter every visual on the page — you don't need a separate slicer per chart.
3. **Default titles.** "Sum of price by product_category_name_english" looks like a tutorial screenshot. Rename every visual title.
4. **Color rainbow.** A 7-color bar chart is hard to read. Pick a single accent color; let muted greys do the rest.
5. **PDF export at the wrong page size.** Set the page size in Power BI (Format pane on a blank canvas → Page size) before exporting. Default is 16:9 — usually fine.

## How this shows up in the capstone

The capstone dashboard is a single page with three KPI cards (top), a bar chart and a map (middle), a detail table (bottom), and three slicers (top right). Same shape as the layout above.

## You've finished the lessons

Take the **[self-test](test.md)** — 12 questions covering the five lessons. Then build the dashboard: **[Day 4 capstone](../../capstone/day4_powerbi/README.md)**.
