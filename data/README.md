# Dataset — Olist Brazilian E-commerce

## What it is

Real anonymized data from [Olist](https://olist.com), a Brazilian e-commerce marketplace. ~100,000 orders placed between 2016 and 2018, with customers, sellers, products, payments, and customer reviews.

**Source:** Kaggle — [olistbr/brazilian-ecommerce](https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce)
**License:** CC BY-NC-SA 4.0 (non-commercial, share-alike)
**Size:** ~135 MB unzipped

## Why we chose it

- **8 related tables** — makes Day 2 (SQL joins) meaningful instead of toy
- **~100K orders** — fits in Excel (well under the 1M row limit)
- **Free-text reviews** — gives Day 5 (Claude Code) something genuinely AI-shaped to do
- **Real business problems** — delivery delays, payment mix, seller performance, review drivers
- **Well-documented schema** — easy to onboard students

## Table overview

| Table | Rows (approx) | What it contains |
|---|---|---|
| `olist_orders_dataset` | 99,441 | One row per order: status, purchase/delivery timestamps |
| `olist_order_items_dataset` | 112,650 | One row per line item: product, seller, price, freight |
| `olist_order_payments_dataset` | 103,886 | Payment method, installments, value |
| `olist_order_reviews_dataset` | 99,224 | Review score (1–5) and free-text comments |
| `olist_customers_dataset` | 99,441 | Customer location (state, city, zip prefix) |
| `olist_sellers_dataset` | 3,095 | Seller location |
| `olist_products_dataset` | 32,951 | Product category, dimensions, weight |
| `product_category_name_translation` | 71 | Portuguese → English category names |

Schema diagram is in the Kaggle page linked above.

## How to get the data

### Step 1 — download the CSVs

```bash
bash data/olist/download.sh
```

This downloads the Kaggle zip and unpacks all CSVs into `data/olist/`. The CSV files themselves are gitignored — every student downloads them locally.

If the `kaggle` CLI is not set up, the script prints manual download instructions.

### Step 2 — load into SQLite (do this before Day 2)

Day 2 (SQL) uses **SQLite**. Build a single `olist.db` database file from the CSVs in one command:

```bash
cd data/olist
sqlite3 olist.db < load_into_sqlite.sql
```

You should see row counts print at the end (~99K orders, ~112K items, etc.). If you see "Error: no such file" for any CSV, re-run the download in Step 1.

After this you have `data/olist/olist.db` — that's the database used by every Day 2 exercise and the SQL capstone. Open it with:

- **The CLI:** `sqlite3 data/olist/olist.db`
- **A GUI (recommended for beginners):** [DB Browser for SQLite](https://sqlitebrowser.org/) — free, runs on Mac/Windows/Linux, looks like Excel for databases.
