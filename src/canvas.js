import { isDesktop } from "./dom.js";

const ZOOM = { initial: 1.1, min: 0.7, max: 2, inFactor: 1.1, outFactor: 0.9 };

// Text is sized from the canvas dimensions:
// font-size = (canvas width + canvas height) / (100 * divisor).
// Tags are matched across the whole document, not just inside the canvas.
const TEXT_SCALE_DIVISORS = {
  p: 2.3,
  h1: 0.5,
  h3: 1,
  i: 2.5,
  input: 2,
  textarea: 2,
};

const viewport = document.getElementById("canvas-viewport");
const canvas = document.getElementById("canvas");

let scale = ZOOM.initial;

/** Sets up the desktop canvas: drag to pan, zoom, and sidebar navigation. */
export function initCanvas() {
  enableDragPan();
  enableZoom();
  enableNavigation();
  if (isDesktop) scaleTextToCanvas();
}

function enableDragPan() {
  let lastPosition = null;

  const stopDragging = () => {
    lastPosition = null;
    viewport.classList.remove("is-dragging");
  };

  viewport.addEventListener("mousedown", (event) => {
    lastPosition = { x: event.clientX, y: event.clientY };
    viewport.classList.add("is-dragging");
  });
  viewport.addEventListener("mousemove", (event) => {
    if (!lastPosition) return;
    viewport.scrollLeft += lastPosition.x - event.clientX;
    viewport.scrollTop += lastPosition.y - event.clientY;
    lastPosition = { x: event.clientX, y: event.clientY };
  });
  viewport.addEventListener("mouseup", stopDragging);
  viewport.addEventListener("mouseleave", stopDragging);
}

function enableZoom() {
  applyScale();

  document.getElementById("zoom-in").addEventListener("click", zoomIn);
  document.getElementById("zoom-out").addEventListener("click", zoomOut);
  viewport.addEventListener("wheel", (event) => {
    if (event.deltaY < 0) zoomIn();
    else if (event.deltaY > 0) zoomOut();
  });

  // Ctrl + wheel (and trackpad pinch) would zoom the whole page instead of
  // the canvas, so the browser default is blocked.
  document.addEventListener(
    "wheel",
    (event) => {
      if (event.ctrlKey) event.preventDefault();
    },
    { passive: false },
  );
}

function zoomIn() {
  if (scale >= ZOOM.max) return;
  scale *= ZOOM.inFactor;
  applyScale();
}

function zoomOut() {
  if (scale <= ZOOM.min) return;
  scale *= ZOOM.outFactor;
  applyScale();
}

function applyScale() {
  canvas.style.transformOrigin = "0 0";
  canvas.style.transform = `scale(${scale})`;
}

function enableNavigation() {
  for (const link of document.querySelectorAll(".nav-link")) {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      document.getElementById(targetId)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    });
  }
}

function scaleTextToCanvas() {
  new ResizeObserver(() => {
    const canvasSize = canvas.offsetWidth + canvas.offsetHeight;
    for (const [tag, divisor] of Object.entries(TEXT_SCALE_DIVISORS)) {
      for (const element of document.getElementsByTagName(tag)) {
        element.style.fontSize = `${canvasSize / (100 * divisor)}px`;
      }
    }
  }).observe(canvas);
}
