import json from "./data.json";

/* Dragging functionalities */
$(function () {
  $("#drg-element").dragZoom({
    scope: $("body"),
    minzoom: 0.7,
    maxzoom: 2,
    speed: 0.2,
  });
});

/* Register and event listener for the navigation buttons */
$("._nav").on("click", function (event) {
  event.preventDefault();

  const targetId = event.target.getAttribute("href").substring(1);
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

scale_tags(
  document.getElementById("drg-element"),
  [
    document.getElementsByTagName("p"),
    document.getElementsByTagName("h1"),
    document.getElementsByTagName("h3"),
    document.getElementsByTagName("i"),
  ],
  [2.3, 0.5, 1, 2.5]
).observe(document.getElementById("drg-element"));

/* Slide Logic */
let changeSlide1 = slide("slide_1");
setInterval(() => changeSlide1(), 5000);

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

document.getElementById("expandPW1").addEventListener("click", () => {
  openModal("previousWork1");
});
document.getElementById("closeModalId").addEventListener("click", () => {
  closeModal();
});

function openModal(pw) {
  let modal = document.querySelector("dialog");
  let modalImg = document.getElementById("modalImg");
  let figCap = document.getElementById("figCap");
  modalImg.setAttribute("src", json[pw].img);
  figCap.innerText = json[pw].text;
  modal.showModal();
}

function closeModal() {
  let modal = document.querySelector("dialog");
  modal.close();
}
