
function updateDisplay(idPrefix, position) {
    document.getElementById(idPrefix + '-lat').textContent = 'Latitude : ' + position.coords.latitude;
    document.getElementById(idPrefix + '-lon').textContent = 'Longitude : ' + position.coords.longitude;
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
