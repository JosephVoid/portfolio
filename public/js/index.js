import json from "./data.json";

$(window).on("load", function () {
  $("#loading-screen").css("opacity", 0);
  setTimeout(() => {
    $("#loading-screen").css("display", "none");
  }, 500);
});

var global_scale = 1;

$(document).ready(function () {
  $("#drg-scrl").dragpan();
  zoomIn();
});

$("#drg-scrl").on("wheel", function (event) {
  if (event.originalEvent.deltaY < 0 && global_scale < 2) zoomIn();
  else if (event.originalEvent.deltaY && global_scale > 0.7) zoomOut();
});

$("#drg-element").on("mousedown", () => {
  $("#drg-element").css("cursor", "grabbing");
});

$("#drg-element").on("mouseup", () => {
  $("#drg-element").css("cursor", "grab");
});

$("#zoomIn").on("click", () => zoomIn());

$("#zoomOut").on("click", () => zoomOut());

function zoomIn() {
  if (global_scale < 2) {
    global_scale *= 1.1;
    $("#drg-element").css("transform-origin", "0 0");
    $("#drg-element").css("transform", "scale(" + global_scale + ")");
  }
}

function zoomOut() {
  if (global_scale > 0.7) {
    global_scale *= 0.9;
    $("#drg-element").css("transform-origin", "0 0");
    $("#drg-element").css("transform", "scale(" + global_scale + ")");
  }
}

/* Register and event listener for the navigation buttons */
$("._nav").on("click", function (event) {
  event.preventDefault();

  const targetId = event.currentTarget.getAttribute("href").substring(1);
  const targetElement = $(`#${targetId}`);

  if (targetElement) {
    /* If the element exists, scroll to it, smooothly */
    targetElement.get(0).scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }
});

function scale_tags(referenceElement, elements, scales) {
  function setElements(dependentElementType, scl) {
    for (let index = 0; index < dependentElementType.length; index++) {
      const element = dependentElementType[index];
      element.style.fontSize = `${
        (referenceElement.offsetWidth + referenceElement.offsetHeight) /
        (100 * scl)
      }px`;
    }
  }

  let ro = new ResizeObserver(() => {
    for (let index = 0; index < elements.length; index++) {
      const element = elements[index];
      setElements(element, scales[index]);
    }
  });

  return ro;
}

if (screen.width > 500) {
  scale_tags(
    document.getElementById("drg-element"),
    [
      document.getElementsByTagName("p"),
      document.getElementsByTagName("h1"),
      document.getElementsByTagName("h3"),
      document.getElementsByTagName("i"),
      document.getElementsByTagName("input"),
      document.getElementsByTagName("textarea"),
    ],
    [2.3, 0.5, 1, 2.5, 2, 2]
  ).observe(document.getElementById("drg-element"));
}

if (screen.width > 500) {
  /* Slide Logic */
  let changeSlide2 = slide("slide_2");
  let changeSlide3 = slide("slide_3");
  setInterval(() => changeSlide2(), 5000);
  setInterval(() => changeSlide3(), 5000);
}

function slide(className) {
  var prev_works = document.getElementsByClassName(className);
  var overlay = document.getElementsByClassName("overlay");

  let slides = {
    turned: false,
  };

  function overlayOnOff(stat) {
    for (let index = 0; index < overlay.length; index++) {
      const overayElement = overlay[index];
      overayElement.style.opacity = stat;
    }
  }

  return function change() {
    overlayOnOff(1);
    setTimeout(() => {
      if (!slides.turned) {
        prev_works[0].style.display = "none";
        slides.turned = true;
      } else {
        prev_works[0].style.display = "block";
        slides.turned = false;
      }
      overlayOnOff(0);
    }, 400);
  };
}

// Load desription for previous works description for desktop and mobile
$(document).ready(function () {
  let prev_work_desc = document.getElementsByClassName("prev-works");
  let prev_work_desc_mob = document.getElementsByClassName("prev-works-mob");
  let prev_work_title = document.getElementsByClassName("prev-works-title");
  for (let index = 0; index < prev_work_desc.length; index++) {
    const element_desc = prev_work_desc[index];
    const element_desc_mob = prev_work_desc_mob[index];
    const element_desc_title = prev_work_title[index];

    element_desc.innerHTML =
      json["pW" + (index + 1)].text.length > 200
        ? json["pW" + (index + 1)].text.slice(0, 200) + "..."
        : json["pW" + (index + 1)].text;
    element_desc_mob.innerHTML = json["pW" + (index + 1)].text;
    element_desc_title.innerText = json["pW" + (index + 1)].title;
  }

  for (let index = 0; index < prev_work_desc_mob.length; index++) {
    const element = prev_work_desc_mob[index];
  }
});

// when clicking the expand buttons
document.getElementById("expandPW1").addEventListener("click", () => {
  openModal("pW1");
});
document.getElementById("expandPW2").addEventListener("click", () => {
  openModal("pW2");
});
document.getElementById("expandPW3").addEventListener("click", () => {
  openModal("pW3");
});
document.getElementById("expandPW4").addEventListener("click", () => {
  openModal("pW4");
});
document.getElementById("closeModalId").addEventListener("click", () => {
  closeModal();
});

function openModal(pw) {
  let modal = document.querySelector("dialog");
  let modalImg = document.getElementById("modalImg");
  let figCap = document.getElementById("figCap");
  let pwTitle = document.getElementById("pw-title");
  let gitLink = document.getElementById("git-link");
  let siteLink = document.getElementById("site-link");

  modalImg.setAttribute("src", json[pw].img);
  figCap.innerHTML = json[pw].text;
  pwTitle.innerText = json[pw].title;
  gitLink.setAttribute("href", json[pw].github);

  if (json[pw].site.length == 0) siteLink.style.display = "none";
  else siteLink.setAttribute("href", json[pw].site);

  modal.showModal();
}

function closeModal() {
  let modal = document.querySelector("dialog");
  modal.close();
}

$(".collapse-button").on("click", function (event) {
  let icon = event.currentTarget.firstChild.nextElementSibling;
  let collapsable = event.target.parentNode.nextElementSibling;
  toggleCollapse(collapsable, icon);
  collapseAllExcept(collapsable.getAttribute("id"));
});

function collapseAllExcept(id) {
  let collapsables = document.getElementsByClassName("collapse-content");
  for (let index = 0; index < collapsables.length; index++) {
    const element = collapsables[index];
    const collapseButton = element.previousElementSibling.firstElementChild;
    const collapsableId =
      element.nextSibling.previousSibling.getAttribute("id");
    if (element.getAttribute("id") !== id) {
      element.style.maxHeight = null;
    }
    if (collapsableId !== id) {
      collapseButton.classList.remove("fa-minus");
      collapseButton.classList.add("fa-plus");
    }
  }
}

function toggleCollapse(coll, icon) {
  if (coll.style.maxHeight) {
    coll.style.maxHeight = null;
    icon.classList.remove("fa-minus");
    icon.classList.add("fa-plus");
  } else {
    icon.classList.remove("fa-plus");
    icon.classList.add("fa-minus");
    coll.style.maxHeight = coll.scrollHeight + "px";
  }
}

$(".read-more").on("click", function (event) {
  let descr = event.target.parentNode.firstChild.nextElementSibling;
  let readMoreBtn = event.currentTarget;
  toggleReadMore(descr, readMoreBtn);
});

function toggleReadMore(descr, readMoreBtn) {
  if (descr.className.includes("line-clamp-4")) {
    descr.classList.remove("line-clamp-4");
    readMoreBtn.innerText = "Show Less";
  } else {
    descr.classList.add("line-clamp-4");
    readMoreBtn.innerText = "Read More";
  }
}

document.addEventListener(
  "wheel",
  (e) => {
    if (e.ctrlKey) e.preventDefault(); //prevent zoom
  },
  { passive: false }
);
