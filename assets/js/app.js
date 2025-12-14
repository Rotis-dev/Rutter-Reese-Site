(() => {
  "use strict";

  // 1) Footer year (safe if the element doesn't exist)
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // 2) Ensure a theme is set (fallback if a page forgets data-theme)
  // Themes are defined in CSS and keyed off body[data-theme].
  const body = document.body;
  if (body && !body.dataset.theme) {
    const p = (location.pathname || "").toLowerCase();
    if (p.includes("/pages/accounting")) body.dataset.theme = "accounting";
    else if (p.includes("/pages/it")) body.dataset.theme = "it";
    else body.dataset.theme = "writing";
  }

  // 3) Mark the current nav link for accessibility
  // aria-current indicates the current item in a set (like navigation). :contentReference[oaicite:0]{index=0}
  const normalizePath = (path) => (path || "/").replace(/\/+$/, "") || "/";
  const currentPath = normalizePath(location.pathname);

  document.querySelectorAll("nav a[href]").forEach((a) => {
    try {
      const hrefPath = normalizePath(
        new URL(a.getAttribute("href"), location.origin).pathname
      );
      if (hrefPath === currentPath) a.setAttribute("aria-current", "page");
    } catch {
      // ignore malformed hrefs
    }
  });

  // 4) Light friction: disable right-click ONLY on embedded previews
  // This is not security; it only reduces casual copying.
  // contextmenu can be canceled with preventDefault(). :contentReference[oaicite:1]{index=1}
  // closest() is used to detect if the click happened inside an .embed/.no-ctx region. :contentReference[oaicite:2]{index=2}
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
