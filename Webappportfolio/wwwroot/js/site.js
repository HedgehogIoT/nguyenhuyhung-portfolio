const nav = document.querySelector(".site-nav");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".site-links");
const languageButtons = document.querySelectorAll(".lang-button");
const languageStorageKey = "portfolio-language";

const applyLanguage = (lang) => {
  document.documentElement.lang = lang === "vi" ? "vi" : "en";

  document.querySelectorAll("[data-i18n-en]").forEach((element) => {
    const value = element.dataset[`i18n${lang === "vi" ? "Vi" : "En"}`];

    if (value) {
      element.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-html-en]").forEach((element) => {
    const value = element.dataset[`i18nHtml${lang === "vi" ? "Vi" : "En"}`];

    if (value) {
      element.innerHTML = value;
    }
  });

  languageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === lang);
    button.setAttribute("aria-pressed", button.dataset.lang === lang ? "true" : "false");
  });

  localStorage.setItem(languageStorageKey, lang);
};

const savedLanguage = localStorage.getItem(languageStorageKey);
applyLanguage(savedLanguage === "vi" ? "vi" : "en");

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.lang === "vi" ? "vi" : "en");
  });
});

if (nav && navToggle && navLinks) {
  const closeMenu = () => {
    nav.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target)) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) {
      closeMenu();
    }
  });
}
