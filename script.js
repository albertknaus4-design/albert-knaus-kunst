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

const imageViewer = document.querySelector("[data-image-viewer]");
const viewerImage = imageViewer?.querySelector("[data-viewer-image]");
const viewerCaption = imageViewer?.querySelector("[data-viewer-caption]");
const viewerCloseButton = imageViewer?.querySelector(".image-viewer-close");
let lastViewerTrigger = null;

const closeImageViewer = () => {
  if (!imageViewer || imageViewer.hidden) return;

  imageViewer.hidden = true;
  imageViewer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("viewer-open");

  if (viewerImage) {
    viewerImage.removeAttribute("src");
    viewerImage.alt = "";
  }

  lastViewerTrigger?.focus();
  lastViewerTrigger = null;
};

if (imageViewer && viewerImage && viewerCaption) {
  document.querySelectorAll("[data-viewer-open]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      lastViewerTrigger = trigger;
      viewerImage.src = trigger.dataset.imageSrc || "";
      viewerImage.alt = trigger.dataset.imageAlt || "";
      viewerCaption.textContent = trigger.dataset.imageCaption || "";
      imageViewer.hidden = false;
      imageViewer.setAttribute("aria-hidden", "false");
      document.body.classList.add("viewer-open");
      viewerCloseButton?.focus();
    });
  });

  imageViewer.querySelectorAll("[data-viewer-close]").forEach((button) => {
    button.addEventListener("click", closeImageViewer);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeImageViewer();
  });
}
