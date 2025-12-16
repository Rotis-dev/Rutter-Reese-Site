(() => {
  "use strict";

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Ensure a theme is set (fallback if a page forgets data-theme)
  const body = document.body;
  if (body && !body.dataset.theme) body.dataset.theme = "writing";

  // Mark current nav link for accessibility
  const normalizePath = (path) => {
    const s = (path || "/").replace(/\/+/g, "/").replace(/\/+$/, "");
    return s === "" ? "/" : s;
  };

  const currentPath = normalizePath(location.pathname);

  document.querySelectorAll("nav a[href]").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;

    // Skip hash-only links (e.g., #section)
    if (href.startsWith("#")) return;

    try {
      const hrefPath = normalizePath(new URL(href, location.origin).pathname);
      if (hrefPath === currentPath) a.setAttribute("aria-current", "page");
    } catch {
      // ignore malformed hrefs
    }
  });

})();
