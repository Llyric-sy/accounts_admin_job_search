# Accounts / Admin Job Search Tracker

Interactive job tracker for accounting, tax, finance, government, healthcare administration and corporate-office opportunities.

## GitHub Pages

This repository is ready to publish from the repository root.

In GitHub:
1. Open **Settings**
2. Open **Pages**
3. Under **Build and deployment**, choose **Deploy from a branch**
4. Select **main** and **/(root)**
5. Save

The site uses:
- `index.html` — interactive tracker UI
- `jobs.json` — live job database

The Excel download is generated in-browser from the current tracker data.

Status buttons (Applied, Disregard, Restore, Consider) are stored locally in the browser. The shared `jobs.json` database is updated separately by the tracker updater.
