// Panels are sized from their content when opened. Images inside may still be
// loading at that point, so extra room is added to avoid clipping them.
const EXTRA_PANEL_HEIGHT = 600;

/** Sets up the mobile accordion: one panel open at a time. */
export function initAccordion() {
  const items = [...document.querySelectorAll(".accordion-item")];

  for (const item of items) {
    item.querySelector(".accordion-toggle").addEventListener("click", () => {
      const shouldOpen = !isOpen(item);
      for (const other of items) setOpen(other, false);
      setOpen(item, shouldOpen);
    });
  }

  setOpen(document.querySelector(".accordion-item[data-open-on-load]"), true);
}

function isOpen(item) {
  return Boolean(item.querySelector(".accordion-panel").style.maxHeight);
}

function setOpen(item, open) {
  const panel = item.querySelector(".accordion-panel");
  const icon = item.querySelector(".accordion-toggle i");

  panel.style.maxHeight = open
    ? `${panel.scrollHeight + EXTRA_PANEL_HEIGHT}px`
    : "";
  icon.classList.toggle("fa-minus", open);
  icon.classList.toggle("fa-plus", !open);
}
