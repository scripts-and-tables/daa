-- Load the Olist CSVs into a single SQLite database.
--
-- Usage (run from data/olist/):
--   cd data/olist
--   sqlite3 olist.db < load_into_sqlite.sql
--
-- After this completes you'll have a file `olist.db` next to the CSVs.
-- Open it with the sqlite3 CLI or "DB Browser for SQLite":
--   sqlite3 olist.db
--   sqlite> SELECT COUNT(*) FROM orders;
--
-- Notes:
-- - Tables don't exist before .import, so SQLite uses the first row of
--   each CSV as the column names. All columns end up as TEXT type, which
--   is fine — SQLite is permissive and AVG/SUM still work on numeric strings.
-- - Empty cells in CSVs come in as empty strings (''), not NULL.
--   Filter with `column != ''` instead of `column IS NOT NULL`.
-- - Date columns are stored as ISO 8601 strings, so `<` / `>` comparisons
--   work directly. For date differences use `julianday(a) - julianday(b)`.

.mode csv

.import olist_orders_dataset.csv               orders
.import olist_order_items_dataset.csv          items
.import olist_order_reviews_dataset.csv        reviews
.import olist_customers_dataset.csv            customers
.import olist_sellers_dataset.csv              sellers
.import olist_products_dataset.csv             products
.import olist_order_payments_dataset.csv       payments
.import product_category_name_translation.csv  category_translation

-- Sanity check — print row counts.
SELECT 'orders'              AS table_name, COUNT(*) AS rows FROM orders
UNION ALL SELECT 'items',                COUNT(*) FROM items
UNION ALL SELECT 'reviews',              COUNT(*) FROM reviews
UNION ALL SELECT 'customers',            COUNT(*) FROM customers
UNION ALL SELECT 'sellers',              COUNT(*) FROM sellers
UNION ALL SELECT 'products',             COUNT(*) FROM products
UNION ALL SELECT 'payments',             COUNT(*) FROM payments
UNION ALL SELECT 'category_translation', COUNT(*) FROM category_translation;
