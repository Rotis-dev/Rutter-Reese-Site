# Rutter-Reese Portfolio Site (Static)

Lightweight static portfolio site for operations-focused technical writing.

## What this is

- Plain HTML/CSS/JS (no framework)
- Hosted on Cloudflare Pages (Git integration)
- Single shared stylesheet: `assets/css/styles.css`
- Theme accents via `body[data-theme]`: `writing` (blue), `accounting` (green), `it` (purple)
- Small JS helper: `assets/js/app.js` (footer year, aria-current, theme fallback, right-click disabled only on embeds)

## Local dev

Any static server works.

### Option A: Python (recommended)

```bash
python -m http.server 8000
```
