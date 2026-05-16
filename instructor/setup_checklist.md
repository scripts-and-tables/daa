# Instructor Setup Checklist

Work through this **at least one week before Day 1**. Most items only need doing once.

## Before the course starts

### Software (you, the instructor)

- [ ] **Excel** — Microsoft 365 (cloud) or Excel 2021+ on Windows/Mac. Confirm `XLOOKUP` is available (older versions only have `VLOOKUP`).
- [ ] **DuckDB** — `brew install duckdb` (macOS) or download from [duckdb.org/docs/installation](https://duckdb.org/docs/installation). Test: `duckdb -c "SELECT 42"`.
- [ ] **Python + Jupyter** — Anaconda or `pip install jupyterlab pandas matplotlib seaborn`. Test: `jupyter lab`.
- [ ] **Power BI Desktop** — free, Windows only. Mac users: use a VM or the web service.
- [ ] **Claude Code** — sign in at [claude.ai/code](https://claude.ai/code) and confirm you can launch a session.

### Software (each student)

Send students this list one week ahead. Day 1 morning runs much smoother if installs are done.

- [ ] Excel (any modern version with `XLOOKUP`)
- [ ] [DuckDB CLI](https://duckdb.org/docs/installation) — for Day 2
- [ ] [Anaconda](https://www.anaconda.com/download) **or** an account at [JupyterLite (in-browser, zero install)](https://jupyter.org/try-jupyter/lab/) — for Day 3
- [ ] [Power BI Desktop](https://powerbi.microsoft.com/desktop/) (Windows) — for Day 4
- [ ] An account at [claude.ai](https://claude.ai) — for Day 5

### Dataset

- [ ] Run `bash data/olist/download.sh` and confirm all 8 CSVs land in `data/olist/`.
- [ ] Open `olist_orders_dataset.csv` in Excel — confirm it opens in under 5 seconds.
- [ ] Run `duckdb -c "SELECT COUNT(*) FROM 'data/olist/olist_orders_dataset.csv'"` — should print ~99441.

### Capstone dry run

- [ ] Spend 90 minutes doing the full capstone yourself, end-to-end, using only the tools students will have. Note anywhere you got stuck — those are the spots students will get stuck.

### Logistics

- [ ] Confirm screen sharing works in your conferencing tool — students need to see DAX formulas and Python code clearly.
- [ ] Set up a shared chat channel (Slack/Teams/Discord) for between-session questions.
- [ ] Decide on a recording policy and tell students Day 1.

## Day-by-day pre-class checks

### Before Day 1 (Excel)

- [ ] Open `curriculum/day1_excel/exercises/` — confirm exercise files load cleanly in your Excel.
- [ ] Pre-download Olist CSVs to a USB stick or shared drive in case student internet is patchy.

### Before Day 2 (SQL)

- [ ] Verify every student can run `duckdb -c "SELECT 42"`. Fix installs in the first 15 min if not.

### Before Day 3 (Python)

- [ ] Decide: are students using local Jupyter or JupyterLite (browser)? Pick **one** and stick with it for class consistency.

### Before Day 4 (Power BI)

- [ ] Mac users: confirm their VM/web access works. Power BI Desktop is Windows-only — don't let this surprise anyone Thursday morning.

### Before Day 5 (Claude Code)

- [ ] Confirm every student can sign in at [claude.ai/code](https://claude.ai/code).
- [ ] Have a fallback: if claude.ai is unreachable from corporate network, use the desktop app or CLI.
