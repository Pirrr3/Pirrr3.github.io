// Vérification si la géolocalisation est disponible
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showMap, showError);
} else {
    alert("La géolocalisation n'est pas supportée par votre navigateur.");
}

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

// Fonction appelée en cas d'erreur de géolocalisation
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("L'utilisateur a refusé la demande de géolocalisation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Les informations de localisation sont indisponibles.");
            break;
        case error.TIMEOUT:
            alert("La demande de localisation a expiré.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Une erreur inconnue s'est produite.");
            break;
    }
}
