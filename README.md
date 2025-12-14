# Rutter-Reese Site (v3)

Static, recruiter-first portfolio site with three separate branches:

- Writing (Matt): `/index.html` + `/pages/portfolio.html`, `/pages/resume.html`, `/pages/contact.html`
- Accounting (Christine): `/pages/accounting.html` + related pages
- IT (Richie): `/pages/it.html` + related pages

No cross-links between branches by design.

## Run locally
Use a static server (recommended) so links resolve correctly.

- VS Code: Live Server extension
- Python: `python -m http.server 8000` (if installed)

## Deploy (Cloudflare Pages)
Framework preset: None  
Build command: (leave empty)  
Build output directory: .  
Root directory: (leave empty)

## Replace placeholders
- Photos:
  - `assets/img/matt.jpg` (included)
  - `assets/img/placeholder-person.svg` (used for others)
- Resume PDFs:
  - `assets/resume/*.pdf` (placeholders included)
- Portfolio PDF links in each portfolio page.
