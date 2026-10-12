import "./index.css";
import "font-awesome/css/font-awesome.min.css";

import { initAccordion } from "./accordion.js";
import { initCanvas } from "./canvas.js";
import { renderContent } from "./content.js";
import { initProjects } from "./projects.js";

const LOADING_SCREEN_FADE_MS = 500;

// Content is rendered first: the canvas and accordion measure it.
renderContent();
initProjects();
initCanvas();
initAccordion();

window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.style.opacity = 0;
  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, LOADING_SCREEN_FADE_MS);
});
