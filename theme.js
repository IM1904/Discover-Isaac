/**
 * Theme Switcher with LocalStorage Persistence
 * Automatically restores user theme preference or defaults to dark
 */
(function () {
  const STORAGE_KEY = 'isaac_website_theme';

  function getSavedTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleButtons(theme);
  }

  function updateToggleButtons(theme) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const isDark = theme === 'dark';
    const label = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
  }

  // Apply immediately upon script load to prevent flash of unstyled theme (FOUC)
  const activeTheme = getSavedTheme();
  document.documentElement.setAttribute('data-theme', activeTheme);

  // Bind click listener once the document is interactive
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
  } else {
    initThemeToggle();
  }

  function initThemeToggle() {
    updateToggleButtons(document.documentElement.getAttribute('data-theme') || 'dark');
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      });
    }
  }
})();
