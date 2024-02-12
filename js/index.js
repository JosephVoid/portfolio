/* Dragging functionalities */
$(function () {
  $("#drg-element").dragZoom({
    scope: $("body"),
    minzoom: 0.5,
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
  ],
  [2.3, 0.5, 1]
).observe(document.getElementById("drg-element"));
