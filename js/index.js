/* Dragging functionalities */
$(function () {
  $("#drg-element").dragZoom({
    scope: $("body"),
    minzoom: 0.5,
    maxzoom: 3,
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

// Get the reference and dependent elements
const referenceElement = document.getElementById("drg-element");
const dependentElements = document.getElementsByTagName("p");

let ro = new ResizeObserver(() => {
  console.log(
    `${(referenceElement.offsetWidth + referenceElement.offsetHeight) / 250}px`
  );
  for (let index = 0; index < dependentElements.length; index++) {
    const element = dependentElements[index];
    element.style.fontSize = `${
      (referenceElement.offsetWidth + referenceElement.offsetHeight) / 200
    }px`;
  }
});

ro.observe(referenceElement);
