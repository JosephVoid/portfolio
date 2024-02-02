document.addEventListener('DOMContentLoaded', () => {

    const dragContainer = document.getElementById('drg-scrl');
    const draggedElem = document.getElementById('drg-element');
    let pos = {top: 0, left: 0, x: 0, y: 0}
    let zoom = 1;

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

    const mouseMoveHandler = function (e) {
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        if (Math.round(1920*zoom) > Number(dragContainer.offsetWidth))
            dragContainer.scrollLeft = pos.left - dx;
        if (Math.round(1080*zoom) > Number(dragContainer.offsetHeight))
            dragContainer.scrollTop = pos.top - dy;
    };

    const mouseUpHandler = function () {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);

        dragContainer.style.cursor = 'grab';
        dragContainer.style.removeProperty('user-select');
    };

    dragContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY < 0 && zoom < 1.4) {
            /* Scroll up */
            zoom += 0.02
        } else if (e.deltaY > 0 && zoom > 0.4) {
            /* Scroll down */
            zoom -= 0.02
        }
        draggedElem.style.transform = `scale(${zoom})`
    })

    dragContainer.addEventListener('mousedown', mouseDownHandler);
})