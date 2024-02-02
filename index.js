document.addEventListener('DOMContentLoaded', () => {

    const dragContainer = document.getElementById('drg-scrl'); /* Get all the container */
    const draggedElem = document.getElementById('drg-element'); /* Get all the main draggable frame */
    const navBtns = document.querySelectorAll('.nav'); /* Get all the .nav elements */

    let pos = {top: 0, left: 0, x: 0, y: 0} /* This is the starting scroll and cursor(when dragging) position */
    let zoom = 0.8; /* This is the initial zoom level */
    let cursor_pos = {x: 0, y:0}; /* This will have the cursor location in the container */

    /* Get the initial position of scroll and cursor, store them and register and event listeners
        For mouse movement when dragging and when let go
    */
    const mouseDownHandler = function (e) {
        dragContainer.style.cursor = 'grabbing';
        dragContainer.style.userSelect = 'none';

        pos = {
            /* Get the current mouse position */
            left: dragContainer.scrollLeft,
            top: dragContainer.scrollTop,
            /* Get the current mouse position */
            x: e.clientX,
            y: e.clientY
        }

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    }

    /* Event handler when the draggable is being dragged, it scrolls the container up to a limit */
    const mouseMoveHandler = function (e) {
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;
        /* If the size of the draggable(zoom & adjustment applied) is less than container size, don't scroll */
        if (Math.round(1920*zoom*1.2) > Number(dragContainer.offsetWidth))
            dragContainer.scrollLeft = pos.left - dx;
        if (Math.round(1080*zoom*1.2) > Number(dragContainer.offsetHeight))
            dragContainer.scrollTop = pos.top - dy;
    };

    /* Event handler when the draggable is let go */
    const mouseUpHandler = function () {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);

        dragContainer.style.cursor = 'grab';
        dragContainer.style.removeProperty('user-select');
    };

    /* Register and event listener for the navigation buttons */
    navBtns.forEach(nav => nav.addEventListener('click', function smoothScroll(event) {
        event.preventDefault();
    
        const targetId = event.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
    
        if (targetElement) { /* If the element exists, scroll to it, smooothly */
          dragContainer.scrollTo({
            top: targetElement.offsetTop,
            left: targetElement.offsetLeft,
            behavior: 'smooth'
          });
          draggedElem.style.transform = `scale(1)`
        }
      }))

    /* Register and event listener to track the cursor is in the container */
    dragContainer.addEventListener('mousemove', (e) => {
        cursor_pos.x = e.clientX;
        cursor_pos.y = e.clientY;
    })

    /* Event listener for listening to scroll, used to zoom in or zoom out */
    dragContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        /* Zoom in upto x1.6 or Zoom out upto x0.6 */
        if (e.deltaY < 0 && zoom < 1.6)
            zoom += 0.06;
        else if (e.deltaY > 0 && zoom > 0.6)
            zoom -= 0.06;
        /* Set the center of transformation to cursor */
        draggedElem.style.transformOrigin = cursor_pos.x < 400 ? `-50px calc(${cursor_pos.y}px - 50px)` : `${cursor_pos.x}px ${cursor_pos.y}px`
        /* Set zoom */
        draggedElem.style.transform = `scale(${zoom})`
    })
    /* Register the mouse down handler */
    dragContainer.addEventListener('mousedown', mouseDownHandler);
})