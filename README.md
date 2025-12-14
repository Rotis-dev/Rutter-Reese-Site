# Rutter-Reese Site (Static)

Lightweight, dependency-free portfolio site for the Rutter-Reese family.

- Hosting: Cloudflare Pages (static)
- Stack: plain HTML/CSS/JS
- Goal: recruiter-friendly pages that are fast, readable, and easy to maintain

## Structure

- `/index.html` — Matt (Writing) landing page
- `/assets/`
  - `/assets/css/styles.css` — shared design system
  - `/assets/js/app.js` — small helpers (year, theme, nav current-link, theme toggle)
  - `/assets/resume/` — optional PDF storage (placeholders by default)
- `/pages/`
  - `family.html` — hub (only links between the 3 branches)
  - **Matt**
    - `portfolio.html`
    - `resume.html`
    - `contact.html`
  - **Christine**
    - `accounting.html`
    - `accounting-portfolio.html`
    - `accounting-resume.html`
    - `accounting-contact.html`
  - **Richie**
    - `it.html`
    - `it-portfolio.html`
    - `it-resume.html`
    - `it-contact.html`

## Local preview (no build step)

Option A (Python):
```powershell
# from repo root
python -m http.server 5500
```

Then open:
- http://localhost:5500/

Option B (VS Code):
- Use any static server extension (e.g., Live Server)

## Deploy (Cloudflare Pages)

This repo is a static site:
- Framework preset: **None**
- Build command: **(leave empty)**
- Build output directory: **.** (single dot)
- Root directory: **(leave empty)**

Cloudflare Pages will deploy directly from the repository content.

## Replacing placeholders

### Resume PDFs (optional)
By default, resume pages point to placeholder paths:
- `assets/resume/matt-resume.pdf`
- `assets/resume/christine-resume.pdf`
- `assets/resume/richie-resume.pdf`

To use in-repo PDFs:
1) Create `assets/resume/`
2) Drop the PDF files with the names above
3) Commit and push

To use OneDrive/Drive links instead:
- Replace the link/embedded object URLs in the resume pages.

### Portfolio links
Portfolio pages include placeholder external links using `https://example.com/...`.
Replace them with your real view links when ready.

## Git (PowerShell) — commit + push

From the repo folder:

```powershell
git status
git add -A
git commit -m "Update site"
git push origin main
```

If OneDrive locks a file and `git add` fails:
- Close the file in VS Code
- Wait 10–30 seconds
- Retry `git add -A`

## Notes

- The “Family hub” link should appear **only** on the 3 main branch landing pages:
  - `index.html`, `pages/accounting.html`, `pages/it.html`
- Theme toggle buttons are at the footer via `app.js` and shared CSS.
