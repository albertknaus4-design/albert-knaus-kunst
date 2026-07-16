const menuButton = document.querySelector("[data-menu-button]");
const menu = document.querySelector("[data-menu]");
const header = document.querySelector("[data-header]");

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    menu.classList.toggle("is-open", !open);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
    });
  });
}

const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 12);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal");

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();

document.querySelectorAll("[data-image-zoom]").forEach((button) => {
  button.addEventListener("click", () => {
    const isZoomed = button.classList.toggle("is-zoomed");
    const label = button.querySelector("[data-zoom-label]");

    button.setAttribute("aria-pressed", String(isZoomed));
    button.setAttribute(
      "aria-label",
      isZoomed ? "Bild wieder verkleinern" : "Bild etwas vergrößern"
    );

    if (label) label.textContent = isZoomed ? "Verkleinern" : "Vergrößern";
  });
});
