
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


function showMap(position) {
    const userLatitude = position.coords.latitude;
    const userLongitude = position.coords.longitude;

    const niceCoords = [43.7102, 7.2620];

    const map = L.map('map').setView([userLatitude, userLongitude], 13);

    // Ajouter le layer OpenStreetMap
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Ajouter un marqueur à la position de l'utilisateur
    const userMarker = L.marker([userLatitude, userLongitude]).addTo(map);
    userMarker.bindPopup("<b>Vous êtes ici</b>").openPopup();

    // Ajouter un marqueur à Nice
    const niceMarker = L.marker(niceCoords).addTo(map);
    niceMarker.bindPopup("<b>Nice - Centre Ville</b>").openPopup();
}
