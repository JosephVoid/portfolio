import data from "./data.json";
import { fillSlots } from "./dom.js";

// Sidebar entries; `target` is the id of a card on the canvas.
const NAV_SECTIONS = [
  { label: "Photo", target: "intro" },
  { label: "About Me", target: "about" },
  { label: "My Skills", target: "skills" },
  { label: "My Projects", target: "projects" },
  { label: "Experience", target: "experience" },
  { label: "Links", target: "links" },
  { label: "Contact Me", target: "contact" },
];

const CONTACT_FORM_ACTION = "https://formcarry.com/s/03yDUikSVQg";

/** Renders everything that comes from data.json into both layouts. */
export function renderContent() {
  renderNavigation();
  renderPersonalInfo();
  renderSkills();
  renderExperience();
  renderLinks();
  renderContactForms();
}

function renderNavigation() {
  document.getElementById("sidebar-nav").innerHTML = NAV_SECTIONS.map(
    ({ label, target }) => `
      <a class="nav-link" href="#${target}">
        <div
          class="hover:bg-lightest-grey p-3 rounded-md flex justify-between items-center"
        >
          <h4>${label}</h4>
          <i class="fa fa-arrow-right"></i>
        </div>
      </a>
    `,
  ).join("");
}

function renderPersonalInfo() {
  const { name, about } = data.personalInfo;

  for (const slot of document.querySelectorAll('[data-slot="name"]')) {
    slot.textContent = name;
  }
  fillSlots(
    "about",
    about
      .map((paragraph) => `<p class="text-start">${paragraph}</p>`)
      .join("<br/>"),
  );
}

function renderSkills() {
  for (const image of document.querySelectorAll("[data-skill]")) {
    image.src = data.skills[image.dataset.skill];
  }
}

function renderExperience() {
  fillSlots(
    "experience",
    data.experience
      .map(
        (job) => `
          <tr>
            <td class="w-1/5 pb-4">
              <a target="_blank" href="${job.linkedin}">
                <img class="object-contain rounded-lg" src="${job.logo}" alt="" />
              </a>
            </td>
            <td class="ps-4">
              <p class="text-start font-normal">${job.title}, ${job.location}</p>
              <p class="text-start">${job.year}</p>
            </td>
          </tr>
        `,
      )
      .join(""),
  );
}

function renderLinks() {
  fillSlots(
    "links",
    data.links
      .map(
        (link) => `
          <a target="_blank" href="${link.url}">
            <div class="flex items-center rounded-md justify-start p-3 bg-lightest-grey mb-2">
              <i class="fa ${link.icon}"></i>
              <p class="ml-4">${link.name}</p>
            </div>
          </a>
        `,
      )
      .join(""),
  );
}

function renderContactForms() {
  // Each layout gets its own form, so field ids are prefixed to stay unique.
  for (const slot of document.querySelectorAll("[data-contact-form]")) {
    const prefix = slot.dataset.contactForm;
    const inputClasses = "p-2 mb-4 border border-gray-200 rounded-md";

    slot.innerHTML = `
      <form
        action="${CONTACT_FORM_ACTION}"
        enctype="multipart/form-data"
        method="post"
        class="w-full relative flex flex-col justify-start text-start"
      >
        <label for="${prefix}-email"><p>Email</p></label>
        <input type="email" name="email" id="${prefix}-email" class="${inputClasses}" />
        <label for="${prefix}-subject"><p>Subject</p></label>
        <input type="text" name="subject" id="${prefix}-subject" class="${inputClasses}" />
        <label for="${prefix}-body"><p>Message</p></label>
        <textarea name="body" id="${prefix}-body" cols="30" rows="4" class="${inputClasses}"></textarea>
        <button type="submit" class="bg-gray-600 rounded-md text-white p-2">
          <p>Send</p>
        </button>
      </form>
    `;
  }
}
