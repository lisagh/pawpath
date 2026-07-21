const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

const setHeaderState = () => {
  if (!header) return;
  header.toggleAttribute("data-scrolled", window.scrollY > 16);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const setMenuOpen = (isOpen) => {
  if (!header || !navToggle) return;
  header.toggleAttribute("data-menu-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
};

navToggle?.addEventListener("click", () => {
  setMenuOpen(!header?.hasAttribute("data-menu-open"));
});

siteNav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
  }
});

const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!motionQuery.matches) {
  document.documentElement.classList.add("motion-ready");

  const revealItems = [
    document.querySelector(".hero-shell .award-badge"),
    document.querySelector(".hero-shell .hero-title"),
    document.querySelector(".hero-shell .hero-subtitle"),
    document.querySelector(".hero-art"),
    ...document.querySelectorAll(
      [
        "#problem .problem-visual",
        "#problem .problem-copy",
        "#platform .platform-copy",
        "#platform .platform-visual",
        "#system .system-intro",
        "#system .system-screen",
        "#system .system-copy",
        "#app .app-heading",
        "#app .phone-flow img",
        ".promise-section .promise-pet",
        ".promise-section .promise-copy",
        "#team .team-heading",
        "#team .team-card",
        ".site-footer .footer-panel",
        ".site-footer .footer-bottom"
      ].join(",")
    )
  ].filter(Boolean);

  revealItems.forEach((item, index) => {
    item.classList.add("reveal-item");
    item.style.setProperty("--reveal-index", String(index % 4));
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.16
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}
