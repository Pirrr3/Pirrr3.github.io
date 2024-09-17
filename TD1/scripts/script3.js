
// Sélectionner les éléments du DOM
const eventTypeElem = document.getElementById('event-type');
const positionElem = document.getElementById('position');
const canvas = document.getElementById('draw-canvas');
const ctx = canvas.getContext('2d');

// Variables pour le dessin
let drawing = false;

// Fonction pour mettre à jour le type d'événement et la position
function updateEventInfo(eventType, x, y) {
    eventTypeElem.textContent = 'Type d\'événement : ' + eventType;
    positionElem.textContent = `Position : x: ${x}, y: ${y}`;
}

// Fonction pour dessiner sur le canvas
function draw(x, y) {
    if (!drawing) return;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();
}

// Gestion des événements tactiles
function handleTouchEvent(event) {
    event.preventDefault(); // Empêche le comportement par défaut du navigateur (comme le défilement)
    
    // Obtenir les coordonnées de la touche
    const touch = event.touches[0] || event.changedTouches[0];
    const x = touch.clientX - canvas.offsetLeft;
    const y = touch.clientY - canvas.offsetTop;
    
    // Mettre à jour les informations d'événement
    updateEventInfo(event.type, x, y);
    
    // Dessiner selon le type d'événement
    if (event.type === 'touchstart') {
        drawing = true;
        draw(x, y);
    } else if (event.type === 'touchmove') {
        draw(x, y);
    } else if (event.type === 'touchend') {
        drawing = false;
    }
}

// Ajouter les écouteurs d'événements pour le canvas
canvas.addEventListener('touchstart', handleTouchEvent);
canvas.addEventListener('touchmove', handleTouchEvent);
canvas.addEventListener('touchend', handleTouchEvent);
