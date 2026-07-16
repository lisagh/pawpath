const header = document.querySelector(".site-header");

const setHeaderState = () => {
  if (!header) return;
  header.toggleAttribute("data-scrolled", window.scrollY > 16);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });
