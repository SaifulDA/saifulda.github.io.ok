(() => {
  "use strict";

  const getStoredTheme = () => localStorage.getItem("theme");
  const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const setTheme = (theme) => {
    if (theme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
    }
  };

  const showActiveTheme = (theme, initialLoad = false) => {
    const activeThemeIcon = document.querySelector(".theme-icon-active");
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`);
    const iconOfActiveBtn = btnToActive.querySelector("i").dataset.themeIcon;

    document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
      element.classList.remove("active");
      element.setAttribute("aria-pressed", "false");
    });

    btnToActive.classList.add("active");
    activeThemeIcon.classList.remove(activeThemeIcon.dataset.themeIconActive);
    activeThemeIcon.classList.add(iconOfActiveBtn);
    activeThemeIcon.dataset.themeIconActive = iconOfActiveBtn;

    if (!initialLoad) {
      // Handler untuk perubahan tema di sini (jika diperlukan)
    }
  };

  const handleThemeChange = (theme) => {
    setStoredTheme(theme);
    setTheme(theme);
    showActiveTheme(theme);
  };

  const handleToggleClick = (toggle) => {
    const theme = toggle.getAttribute("data-bs-theme-value");
    handleThemeChange(theme);
  };

  const initThemeToggler = () => {
    setTheme(getPreferredTheme());
    showActiveTheme(getPreferredTheme(), true);

    document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        handleToggleClick(toggle);
      });
    });
  };

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    const storedTheme = getStoredTheme();
    if (storedTheme !== "light" && storedTheme !== "dark") {
      const preferredTheme = getPreferredTheme();
      handleThemeChange(preferredTheme);
      showActiveTheme(preferredTheme);
    }
  });

  window.addEventListener("DOMContentLoaded", () => {
    initThemeToggler();
  });
})();
