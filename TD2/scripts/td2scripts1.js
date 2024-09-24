navigator.geolocation.getCurrentPosition(showMap);


// Fonction appelée en cas de succès de la géolocalisation
function showMap(position) {
    // Coordonnées de l'utilisateur
    const userLatitude = position.coords.latitude;
    const userLongitude = position.coords.longitude;

    // Coordonnées de Nice (centre ville)
    const niceCoords = [43.7102, 7.2620];

    // Initialiser la carte centrée sur la position de l'utilisateur
    const map = L.map('map').setView([userLatitude, userLongitude], 13);

    // Ajouter le layer OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Ajouter un marqueur à la position de l'utilisateur
    const userMarker = L.marker([userLatitude, userLongitude]).addTo(map);
    userMarker.bindPopup("<b>Vous êtes ici</b>").openPopup();

    // Ajouter un marqueur à Nice
    const niceMarker = L.marker(niceCoords).addTo(map);
    niceMarker.bindPopup("<b>Nice - Centre Ville</b>").openPopup();
}
