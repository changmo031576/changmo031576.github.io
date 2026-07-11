const root = document.documentElement;
const menuButton = document.getElementById("menuButton");
const drawer = document.getElementById("drawer");
const drawerClose = document.getElementById("drawerClose");
const drawerBackdrop = document.getElementById("drawerBackdrop");
const langToggle = document.getElementById("langToggle");
const themeToggle = document.getElementById("themeToggle");

let language = localStorage.getItem("tk-language") || "en";
let theme = localStorage.getItem("tk-theme") || "light";

function setDrawer(open) {
  drawer.classList.toggle("open", open);
  drawerBackdrop.classList.toggle("show", open);
  drawer.setAttribute("aria-hidden", String(!open));
  document.body.style.overflow = open ? "hidden" : "";
}

menuButton.addEventListener("click", () => setDrawer(true));
drawerClose.addEventListener("click", () => setDrawer(false));
drawerBackdrop.addEventListener("click", () => setDrawer(false));

drawer.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => setDrawer(false));
});

function setLanguage(nextLanguage) {
  language = nextLanguage;
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";

  document.querySelectorAll("[data-en][data-zh]").forEach(el => {
    el.textContent = el.dataset[language];
  });

  langToggle.textContent = language === "en" ? "中文" : "EN";
  localStorage.setItem("tk-language", language);
}

function setTheme(nextTheme) {
  theme = nextTheme;
  root.dataset.theme = theme;
  themeToggle.textContent = theme === "light" ? "●" : "○";
  localStorage.setItem("tk-theme", theme);
}

langToggle.addEventListener("click", () => {
  setLanguage(language === "en" ? "zh" : "en");
});

themeToggle.addEventListener("click", () => {
  setTheme(theme === "light" ? "dark" : "light");
});

setLanguage(language);
setTheme(theme);
