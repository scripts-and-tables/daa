# Data Analytics Academy (DAA)

A one-year, structured **meta-course** for learning data analytics — curated external resources from Microsoft Learn, Khan Academy, StatQuest, Coursera, classic books, and certification tracks, sequenced into 12 months of weekly topics.

This repository builds the static site published at:

> https://scripts-and-tables.github.io/daa/

The site itself is the canonical entry point. This README only covers how to **build, edit, and deploy** the site.

## Status

- **Month 1 — Foundations:** fully populated.
- **Months 2–12:** structure final, content stubbed (each month has an index page with theme, weekly plan, prerequisites, and mini-project; full weekly pages will be added in subsequent passes).

## Local development

Requires Python 3.10+.

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Live-reload preview at http://127.0.0.1:8000
mkdocs serve

# One-shot build into ./site (also what CI runs)
mkdocs build --strict
```

`--strict` fails the build on broken internal links — the CI workflow runs the same flag, so passing it locally is a strong signal the deploy will succeed.

## Repository layout

```
.github/workflows/pages.yml   # CI: build with mkdocs, deploy to GitHub Pages
docs/                         # All site content (Markdown)
  index.md                    # Landing page
  about/                      # How to use, learning philosophy
  roadmap/                    # 12-month roadmap
  curriculum/                 # Months 1-12, weekly topic pages
  tracks/                     # Cross-cutting views: certifications, tools
  resources/                  # Books, courses, YouTube, datasets
  glossary.md
  stylesheets/extra.css
_templates/topic-page.md      # Copy-paste template for new weekly pages
mkdocs.yml                    # Site config (theme, nav, plugins)
requirements.txt              # Pinned MkDocs + plugin versions
```

## Adding a new weekly topic

1. Copy `_templates/topic-page.md` into `docs/curriculum/month-XX-.../week-YY-...md`.
2. Fill in the front-matter (`title`, `tags`, `time_estimate`, `status`).
3. Replace the placeholder sections — *Learning objectives*, *Curated resources*, *Practice*, *My notes*.
4. Add the page to the `nav:` block in `mkdocs.yml` (under the right month).
5. Run `mkdocs build --strict` locally to catch broken links.
6. Commit and push.

## Deployment

`.github/workflows/pages.yml` builds the site on every push to `main` and deploys it via the modern GitHub Pages Actions flow. **One-time repo setup:**

1. Repository → **Settings** → **Pages** → **Source: GitHub Actions**.
2. Push to `main`. The workflow runs automatically.

## Conventions

- Curated external links should each have a one-line **Why** explaining the rationale. Generic links without a *Why* are stubs.
- Default pace assumed in time estimates: **~6 hours per week**.
- Tooling lean: **Microsoft-first** (Excel, Power BI, T-SQL, Azure / Fabric); Tableau, PostgreSQL, AWS, GCP referenced as alternatives.
- Audience: written in second person (*you*), public-readable. The *My notes* section per page is for personal commentary.

## Licence

- Code (build scripts, config): Apache 2.0 — see [`LICENSE`](LICENSE).
- Curriculum content (under `docs/`): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — attribution required, derivatives welcome.
