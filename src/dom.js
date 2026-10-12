// Must match the max-width of the mobile media query in index.css.
const MOBILE_BREAKPOINT = 500;

export const isDesktop = screen.width > MOBILE_BREAKPOINT;

/** Builds a single element from an HTML string. */
export function createElement(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

/** Sets the same HTML on every element carrying `data-slot="<name>"`. */
export function fillSlots(name, html) {
  for (const slot of document.querySelectorAll(`[data-slot="${name}"]`)) {
    slot.innerHTML = html;
  }
}
