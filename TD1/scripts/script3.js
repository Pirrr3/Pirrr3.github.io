const eventTypeElem = document.getElementById('event-type');
const positionElem = document.getElementById('position');
const canvas = document.getElementById('draw-canvas');
const ctx = canvas.getContext('2d');

let drawing = false;

function updateEventInfo(eventType, x, y) {
    eventTypeElem.textContent = 'Type d\'événement : ' + eventType;
    positionElem.textContent = `Position : x: ${x}, y: ${y}`;
}

function draw(x, y) {
    if (!drawing) return;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();
}

function handleTouchEvent(event) {
    event.preventDefault();
    
    const touch = event.touches[0] || event.changedTouches[0];
    const x = touch.clientX - canvas.offsetLeft;
    const y = touch.clientY - canvas.offsetTop;
    
    updateEventInfo(event.type, x, y);
    
    if (event.type === 'touchstart') {
        drawing = true;
        draw(x, y);
    } else if (event.type === 'touchmove') {
        draw(x, y);
    } else if (event.type === 'touchend') {
        drawing = false;
    }
}

canvas.addEventListener('touchstart', handleTouchEvent);
canvas.addEventListener('touchmove', handleTouchEvent);
canvas.addEventListener('touchend', handleTouchEvent);
