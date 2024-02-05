/* Dragging functionalities */
$(function() {
    $('#drg-element').dragZoom({
        scope: $("body"),
        minzoom: 0.5,
        maxzoom: 3,
        speed: 0.2
    });
});

/* Register and event listener for the navigation buttons */
$('.nav').on('click', function (event) {
    event.preventDefault();

    const targetId = event.target.getAttribute('href').substring(1);
    const targetElement = $(`#${targetId}`);

    if (targetElement) { /* If the element exists, scroll to it, smooothly */   
        targetElement.get(0).scrollIntoView({
                behavior: 'smooth', 
                block: 'center',
                inline: 'center'
            });
        }
});