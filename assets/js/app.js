// assets/js/app.js
(() => {
  "use strict";

  // 1) Footer year (safe if the element doesn't exist)
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // 2) Ensure a theme is set (fallback if a page forgets data-theme)
  // Themes here only control accent colors via body[data-theme].
  const body = document.body;
  if (body && !body.dataset.theme) {
    const p = String(location.pathname || "").toLowerCase();
    if (p.includes("/pages/accounting")) body.dataset.theme = "accounting";
    else if (p.includes("/pages/it")) body.dataset.theme = "it";
    else body.dataset.theme = "writing";
  }

  // 3) Mark the current primary-nav link for accessibility
  // Important: resolve relative links against the CURRENT page URL, not the site root.
  const normalizePath = (pathname) => {
    const raw = String(pathname || "/");

    // Remove trailing slashes (except for root)
    let p = raw.replace(/\/+$/, "");
    if (p === "") p = "/";

    // Treat /index.html as /
    if (p.toLowerCase() === "/index.html") return "/";

    return p;
  };

  const currentPath = normalizePath(location.pathname);

  // Scope to the primary header nav only, so content links aren't affected.
  const primaryNav = document.querySelector('nav[aria-label="Primary"]');
  if (primaryNav) {
    primaryNav.querySelectorAll("a[href]").forEach((a) => {
      // Don't override if the page already set aria-current manually.
      if (a.hasAttribute("aria-current")) return;

      const href = a.getAttribute("href");
      if (!href) return;

      // Ignore hash-only links (not used in your header nav, but safe)
      if (href.trim().startsWith("#")) return;

      let url;
      try {
        // Use location.href so "portfolio.html" on /pages/* resolves to /pages/portfolio.html.
        url = new URL(href, location.href);
      } catch {
        return; // ignore malformed hrefs
      }

      // Ignore external links (different site)
      if (url.origin !== location.origin) return;

      const hrefPath = normalizePath(url.pathname);

      // Match "/" and "/index.html" as the same page.
      if (hrefPath === currentPath) {
        a.setAttribute("aria-current", "page");
      }
    });
  }

  // 4) Light friction: disable right-click ONLY on embedded previews
  // Not security; just reduces casual copying.
  document.addEventListener(
    "contextmenu",
    (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (target.closest(".embed, .no-ctx")) e.preventDefault();
    },
    { capture: true }
  );
})();
