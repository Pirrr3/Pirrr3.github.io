// scripts/script.js

function updateDisplay(idPrefix, position) {
    document.getElementById(idPrefix + '-lat').textContent = 'Latitude : ' + position.coords.latitude;
    document.getElementById(idPrefix + '-lon').textContent = 'Longitude : ' + position.coords.longitude;
    document.getElementById(idPrefix + '-alt').textContent = 'Altitude : ' + (position.coords.altitude !== null ? position.coords.altitude + ' m' : 'Non disponible');
    document.getElementById(idPrefix + '-accuracy').textContent = 'Précision : ' + position.coords.accuracy + ' m';
    document.getElementById(idPrefix + '-speed').textContent = 'Vitesse : ' + (position.coords.speed !== null ? position.coords.speed + ' m/s' : 'Non disponible');
    document.getElementById(idPrefix + '-time').textContent = 'Date : ' + new Date(position.timestamp).toLocaleString();
}

// Obtenir la position actuelle
function getCurrentPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            updateDisplay('current', position);
        }, (error) => {
            console.error('Erreur de géolocalisation :', error);
        });
    } else {
        alert('Géolocalisation non supportée par ce navigateur.');
    }
}

// Suivre les changements de position
function watchPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
            updateDisplay('watch', position);
        }, (error) => {
            console.error('Erreur de géolocalisation :', error);
        });
    } else {
        alert('Géolocalisation non supportée par ce navigateur.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    getCurrentPosition();
    watchPosition();
});
