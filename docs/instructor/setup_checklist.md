# Instructor Setup Checklist

Work through this **at least one week before Day 1**. Most items only need doing once.

## Before the course starts

### Software (you, the instructor)

- [ ] **Excel** — Microsoft 365 (cloud) or Excel 2021+ on Windows/Mac. Confirm `XLOOKUP` is available (older versions only have `VLOOKUP`).
- [ ] **SQLite** — already on macOS/Linux. On Windows: download from [sqlite.org/download.html](https://www.sqlite.org/download.html) (the "sqlite-tools" zip — extract `sqlite3.exe` somewhere on PATH). Test: `sqlite3 :memory: "SELECT 42"`.
- [ ] **DB Browser for SQLite** — free GUI from [sqlitebrowser.org](https://sqlitebrowser.org/). This is what students will use day-to-day.
- [ ] **Python + Jupyter** — Anaconda or `pip install jupyterlab pandas matplotlib seaborn`. Test: `jupyter lab`.
- [ ] **Power BI Desktop** — free, Windows only. Mac users: use a VM or the web service.
- [ ] **Claude Code** — sign in at [claude.ai/code](https://claude.ai/code) and confirm you can launch a session.

### Software (each student)

Send students this list one week ahead. Day 1 morning runs much smoother if installs are done.

- [ ] Excel (any modern version with `XLOOKUP`)
- [ ] [DB Browser for SQLite](https://sqlitebrowser.org/) (free GUI) — for Day 2. SQLite itself is already on Mac/Linux; Windows users grab `sqlite3.exe` from [sqlite.org/download.html](https://www.sqlite.org/download.html).
- [ ] [Anaconda](https://www.anaconda.com/download) **or** an account at [JupyterLite (in-browser, zero install)](https://jupyter.org/try-jupyter/lab/) — for Day 3
- [ ] [Power BI Desktop](https://powerbi.microsoft.com/desktop/) (Windows) — for Day 4
- [ ] An account at [claude.ai](https://claude.ai) — for Day 5

### Dataset

- [ ] Run `bash data/olist/download.sh` and confirm all 8 CSVs land in `data/olist/`.
- [ ] Open `olist_orders_dataset.csv` in Excel — confirm it opens in under 5 seconds.
- [ ] Build the SQLite database: `cd data/olist && sqlite3 olist.db < load_into_sqlite.sql`. Should print row counts at the end.
- [ ] Sanity-check: `sqlite3 data/olist/olist.db "SELECT COUNT(*) FROM orders"` → should print 99441.

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

- [ ] Verify every student can open `data/olist/olist.db` in DB Browser for SQLite. If a student's `olist.db` doesn't exist, walk them through `cd data/olist && sqlite3 olist.db < load_into_sqlite.sql`.
- [ ] Have a pre-built `olist.db` on a USB stick or shared drive as a fallback for students whose CSV download is broken.

### Before Day 3 (Python)

- [ ] Decide: are students using local Jupyter or JupyterLite (browser)? Pick **one** and stick with it for class consistency.

### Before Day 4 (Power BI)

- [ ] Mac users: confirm their VM/web access works. Power BI Desktop is Windows-only — don't let this surprise anyone Thursday morning.

### Before Day 5 (Claude Code)

- [ ] Confirm every student can sign in at [claude.ai/code](https://claude.ai/code).
- [ ] Have a fallback: if claude.ai is unreachable from corporate network, use the desktop app or CLI.
