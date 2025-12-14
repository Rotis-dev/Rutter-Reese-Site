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
    const s = (path || "/").replace(/\/+/g, "/").replace(/\/g, "/").replace(/\/+$/, "");
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

  // Light-first mode with optional footer toggle
  const root = document.documentElement;

  const setMode = (mode) => {
    root.setAttribute("data-mode", mode);
    try { localStorage.setItem("rr_mode", mode); } catch {}
  };

  const getMode = () => {
    try {
      const saved = localStorage.getItem("rr_mode");
      if (saved === "dark" || saved === "light") return saved;
    } catch {}
    return "light";
  };

  const ensureFooterThemeControls = () => {
    const footerRow = document.querySelector(".site-footer .footer-row");
    if (!footerRow) return;

    // If already present, do nothing
    if (footerRow.querySelector("[data-rr-theme-controls]")) return;

    const wrap = document.createElement("div");
    wrap.className = "footer-actions";
    wrap.setAttribute("data-rr-theme-controls", "true");

    const lightBtn = document.createElement("button");
    lightBtn.type = "button";
    lightBtn.className = "button secondary";
    lightBtn.textContent = "Light";
    lightBtn.addEventListener("click", () => setMode("light"));

    const darkBtn = document.createElement("button");
    darkBtn.type = "button";
    darkBtn.className = "button secondary";
    darkBtn.textContent = "Dark";
    darkBtn.addEventListener("click", () => setMode("dark"));

    wrap.appendChild(lightBtn);
    wrap.appendChild(darkBtn);
    footerRow.appendChild(wrap);
  };

  setMode(getMode());
  ensureFooterThemeControls();
})();
