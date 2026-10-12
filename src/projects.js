import data from "./data.json";
import { createElement, isDesktop } from "./dom.js";

const CARD_DESCRIPTION_LIMIT = 200;
const SLIDE_INTERVAL_MS = 5000;
const SLIDE_FADE_MS = 400; // Matches the .slide-overlay transition in index.css.
const CLAMP_CLASS = "line-clamp-4";

export function initProjects() {
  renderDesktopCards();
  renderMobileCards();
  initModal();
  if (isDesktop) startSlides();
}

function projectLinks(project) {
  const siteLink = project.site
    ? `<a target="_blank" href="${project.site}"><i class="fa fa-external-link scale-150"></i></a>`
    : "";

  return `
    <a target="_blank" href="${project.github}"><i class="fa fa-github scale-150"></i></a>
    ${siteLink}
  `;
}

// Descriptions are HTML that may contain <p> and <ul>, which cannot be nested
// in a <p> through markup. They are assigned with innerHTML after the card is
// built so the wrapper keeps its paragraph styling.
function setDescription(card, html) {
  card.querySelector(".project-description").innerHTML = html;
}

/* Desktop cards */

function renderDesktopCards() {
  const container = document.getElementById("projects-desktop");

  for (const project of data.projects) {
    // Projects with a logo alternate between the logo and the main image.
    const slides = project.logo
      ? `
        <div class="slide-overlay opacity-0 absolute w-full h-full"></div>
        <img class="project-logo rounded-xl" src="${project.logo}" alt="" />
      `
      : "";

    const card = createElement(`
      <div class="w-1/6 mr-8 flex flex-col items-center">
        <div class="w-10/12">
          <div class="flex overflow-x-clip">
            <div class="flex relative">
              ${slides}
              <img class="rounded-xl" src="${project.image}" alt="" />
            </div>
          </div>
          <div class="mb-2 mt-4 flex justify-around items-center">
            ${projectLinks(project)}
            <i class="project-expand fa fa-expand scale-150 cursor-pointer"></i>
          </div>
        </div>
        <div class="flex flex-col justify-center">
          <p class="mb-2 text-xl font-normal">${project.title}</p>
          <p class="project-description"></p>
        </div>
      </div>
    `);

    setDescription(card, truncate(project.text, CARD_DESCRIPTION_LIMIT));
    card
      .querySelector(".project-expand")
      .addEventListener("click", () => openModal(project));
    container.append(card);
  }
}

function truncate(text, limit) {
  return text.length > limit ? text.slice(0, limit) + "..." : text;
}

function startSlides() {
  const overlays = document.querySelectorAll(".slide-overlay");
  const logos = document.querySelectorAll(".project-logo");
  let showingLogo = true;

  const setOverlayOpacity = (opacity) => {
    for (const overlay of overlays) overlay.style.opacity = opacity;
  };

  setInterval(() => {
    // Fade the overlay in, swap the image behind it, then fade back out.
    setOverlayOpacity(1);
    setTimeout(() => {
      showingLogo = !showingLogo;
      for (const logo of logos) {
        logo.style.display = showingLogo ? "block" : "none";
      }
      setOverlayOpacity(0);
    }, SLIDE_FADE_MS);
  }, SLIDE_INTERVAL_MS);
}

/* Mobile cards */

function renderMobileCards() {
  const container = document.getElementById("projects-mobile");

  for (const project of data.projects) {
    const card = createElement(`
      <div class="flex flex-col items-center text-center mb-8">
        <div>
          <div class="flex overflow-x-clip">
            <div class="flex relative">
              <img class="rounded-xl" src="${project.image}" alt="" />
            </div>
          </div>
          <div class="my-2 flex justify-around items-center">
            ${projectLinks(project)}
          </div>
        </div>
        <p class="font-bold mb-2">${project.title}</p>
        <div>
          <p class="project-description ${CLAMP_CLASS}"></p>
          <span class="read-more">Read More</span>
        </div>
      </div>
    `);

    setDescription(card, project.text);
    card.querySelector(".read-more").addEventListener("click", (event) => {
      const description = card.querySelector(".project-description");
      const isClamped = description.classList.toggle(CLAMP_CLASS);
      event.currentTarget.innerText = isClamped ? "Read More" : "Show Less";
    });
    container.append(card);
  }
}

/* Modal */

const modal = {
  dialog: document.getElementById("project-modal"),
  title: document.getElementById("project-modal-title"),
  text: document.getElementById("project-modal-text"),
  image: document.getElementById("project-modal-image"),
  githubLink: document.getElementById("project-modal-github"),
  siteLink: document.getElementById("project-modal-site"),
  closeButton: document.getElementById("project-modal-close"),
};

function initModal() {
  modal.closeButton.addEventListener("click", () => modal.dialog.close());
}

function openModal(project) {
  modal.title.innerText = project.title;
  modal.text.innerHTML = project.text;
  modal.image.src = project.image;
  modal.githubLink.href = project.github;
  modal.siteLink.href = project.site;
  modal.siteLink.style.display = project.site ? "" : "none";

  modal.dialog.showModal();
}
