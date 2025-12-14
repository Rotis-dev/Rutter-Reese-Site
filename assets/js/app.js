(() => {
  "use strict";

  // ============================================================
  // Rutter-Reese v2 helpers (no dependencies)
  // - Default: light mode
  // - Optional: dark mode via html[data-mode="dark"]
  // - Persists mode in localStorage
  // - Marks current nav link with aria-current="page"
  // - Sets footer year if #year exists
  // ============================================================

  // 1) Footer year (safe if missing)
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // 2) Ensure a theme is set for accent colors (writing/accounting/it)
  //    Pages should set body[data-theme] explicitly, but we add a safe fallback.
  const body = document.body;
  if (body && !body.dataset.theme) {
    const p = (location.pathname || "").toLowerCase();
    if (p.includes("/christine/")) body.dataset.theme = "accounting";
    else if (p.includes("/richie/")) body.dataset.theme = "it";
    else body.dataset.theme = "writing";
  }

  // 3) Theme mode (light/dark) — default light
  const MODE_KEY = "rr_mode";
  const root = document.documentElement;

  function applyMode(mode) {
    // Light mode = no attribute (cleaner HTML + simpler CSS defaults)
    if (mode === "dark") root.setAttribute("data-mode", "dark");
    else root.removeAttribute("data-mode");
  }

  function getSavedMode() {
    try {
      const v = localStorage.getItem(MODE_KEY);
      return v === "dark" || v === "light" ? v : null;
    } catch {
      return null;
    }
  }

  function saveMode(mode) {
    try {
      localStorage.setItem(MODE_KEY, mode);
    } catch {
      // ignore storage failures (privacy mode, blocked storage, etc.)
    }
  }

  function setMode(mode) {
    const normalized = mode === "dark" ? "dark" : "light";
    applyMode(normalized);
    saveMode(normalized);
    updateModeButtons(normalized);
  }

  function updateModeButtons(activeMode) {
    document.querySelectorAll("[data-mode-set]").forEach((btn) => {
      const el = btn;
      const target = (el.getAttribute("data-mode-set") || "").toLowerCase();
      const isActive = target === activeMode;
      el.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  // Apply saved preference (or default to light)
  const saved = getSavedMode();
  applyMode(saved || "light");

  // 4) Create footer theme controls if the page doesn't include them
  //    (Keeps HTML edits small; still works if you add your own markup later.)
  function ensureThemeControls() {
    const footer = document.querySelector("footer.site-footer");
    if (!footer) return;

    // If user already added controls, do nothing.
    if (footer.querySelector("[data-theme-controls]")) {
      updateModeButtons(saved || "light");
      return;
    }

    // Prefer appending into an existing footer row, if present.
    const footerRow = footer.querySelector(".footer-row") || footer;

    const wrap = document.createElement("div");
    wrap.className = "footer-actions";
    wrap.setAttribute("data-theme-controls", "true");

    const lightBtn = document.createElement("button");
    lightBtn.type = "button";
    lightBtn.className = "theme-toggle";
    lightBtn.textContent = "Light";
    lightBtn.setAttribute("data-mode-set", "light");

    const darkBtn = document.createElement("button");
    darkBtn.type = "button";
    darkBtn.className = "theme-toggle";
    darkBtn.textContent = "Dark";
    darkBtn.setAttribute("data-mode-set", "dark");

    wrap.appendChild(lightBtn);
    wrap.appendChild(darkBtn);

    footerRow.appendChild(wrap);

    // Wire up clicks
    wrap.addEventListener("click", (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      const mode = t.getAttribute("data-mode-set");
      if (!mode) return;
      setMode(mode);
    });

    updateModeButtons(getSavedMode() || "light");
  }

  ensureThemeControls();

  // 5) Mark current nav link for accessibility
  const normalizePath = (path) => {
    const s = (path || "/").replace(/\/+/g, "/").replace(/\/+$/, "");
    return s === "" ? "/" : s;
  };

  const currentPath = normalizePath(location.pathname);

  document.querySelectorAll("nav a[href]").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;

    try {
      const hrefPath = normalizePath(new URL(href, document.baseURI).pathname);
      if (hrefPath === currentPath) a.setAttribute("aria-current", "page");
    } catch {
      // ignore malformed hrefs
    }
  });
})();