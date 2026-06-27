# Joshua Academy v1.0

**From Warehouse Specialist to Operations Leader.**

A personal career-development dashboard for tracking the 12-week (here: 2-week v1.0) Warehouse Operations onboarding track — daily missions, XP by category, and a promotion-readiness score.

## What's in this repo

- `index.html` — the entire app (HTML/CSS/JS, no build step, no dependencies). This is the file GitHub Pages will serve.
- `apps-script-sync.gs` — optional Google Apps Script code for syncing progress across devices via a Google Sheet.

## How to deploy on GitHub Pages

1. Create a new repository (e.g. `joshua-academy`).
2. Upload `index.html` to the root of the repo.
3. Go to **Settings → Pages** in the repo.
4. Under "Build and deployment", set **Source: Deploy from a branch**, branch: `main`, folder: `/ (root)`.
5. Save. GitHub will give you a URL like `https://<your-username>.github.io/joshua-academy/` within a minute or two.

## How to enable cross-device sync (optional)

Follow the setup instructions at the top of `apps-script-sync.gs` — it walks through creating the Google Sheet, deploying the Apps Script as a Web App, and getting the URL to paste into the app's Sync Settings panel.

Without this step, the app still works fully — it just saves progress to that one browser/device only (via localStorage).

## What v1.0 includes

- Shift-board style dashboard with live PH-time clock
- XP tracking across 4 categories: Leadership, Warehouse, Inventory, Analytics
- Promotion Readiness composite score
- 14-day mission track covering: Receiving, Putaway, Picking, Packing, Sorting, Inventory, Returns, Cross Dock, Cycle Count, Shift Handover, Warehouse KPIs, Labor Planning, Safety, Root Cause Analysis
- Each day: a Study topic, a Practical Exercise, a Leadership Mission, and a written Reflection
- Optional Google Sheets sync

## What's planned for later versions

- v1.5: Leadership Academy expansion, warehouse simulations, weekly assessments
- v2.0: Data Analytics Academy (Excel → SQL → Power BI → Python), Portfolio Builder, full Promotion Readiness engine
- v3.0: AI-adaptive mentor mode, full interview simulator
