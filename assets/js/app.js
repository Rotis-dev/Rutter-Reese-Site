(() => {
  "use strict";

  // 1) Footer year (safe if the element doesn't exist)
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // 2) Ensure a theme is set (fallback if a page forgets data-theme)
  // Themes are keyed off body[data-theme] in CSS.
  const body = document.body;
  if (body && !body.dataset.theme) {
    const p = (location.pathname || "").toLowerCase();
    if (p.includes("/pages/accounting")) body.dataset.theme = "accounting";
    else if (p.includes("/pages/it")) body.dataset.theme = "it";
    else body.dataset.theme = "writing";
  }

  // 3) Mark the current nav link for accessibility
  const normalizePath = (path) => {
    const s = (path || "/").replace(/\/+$/, "");
    return s === "" ? "/" : s;
  };
  const currentPath = normalizePath(location.pathname);

  document.querySelectorAll("nav a[href]").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;

    try {
      const hrefPath = normalizePath(new URL(href, location.origin).pathname);
      if (hrefPath === currentPath) a.setAttribute("aria-current", "page");
    } catch {
      // ignore malformed hrefs
    }
  });

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
