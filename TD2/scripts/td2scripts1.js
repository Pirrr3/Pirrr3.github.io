navigator.geolocation.getCurrentPosition(showMap);

function showMap(position) {
    const userLatitude = position.coords.latitude;
    const userLongitude = position.coords.longitude;

    document.getElementById('current-lat').textContent = `Latitude : ${userLatitude}`;
    document.getElementById('current-lon').textContent = `Longitude : ${userLongitude}`;

    const niceCoords = [43.7102, 7.2620];
    const marseilleCoords = [43.2965, 5.3698];

    const map = L.map('map').setView([userLatitude, userLongitude], 12);

    /*
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/%7Bz%7D/%7By%7D/%7Bx%7D', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
    }).addTo(map);
    */
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const userMarker = L.marker([userLatitude, userLongitude]).addTo(map);
    userMarker.bindPopup("<b>Vous êtes ici</b>").openPopup();

    const niceMarker = L.marker(niceCoords).addTo(map);
    niceMarker.bindPopup("<b>Nice - Centre Ville</b>").openPopup();

    const marseilleMarker = L.marker(marseilleCoords).addTo(map);

    var polygon = L.polygon([
        [25.789106, -80.226529],
        [18.4663188, -66.1057427],
        [32.294887, -64.781380]
    ],
    {color: 'red'}).addTo(map);

    const precisionRadius = position.coords.accuracy;
    L.circle([userLatitude, userLongitude], { 
        color: 'blue', 
        radius: precisionRadius 
    }).addTo(map).bindPopup("Précision de géolocalisation");




    const line = L.polyline([marseilleCoords, niceCoords], { color: 'green' }).addTo(map);

    const distanceToMarseille = getDistance(marseilleCoords[0], marseilleCoords[1], userLatitude, userLongitude);
    document.getElementById('distance').textContent = `Distance à Marseille : ${distanceToMarseille.toFixed(2)} km`;

    marseilleMarker.bindPopup(`Distance Nice-Marseille : ${distanceToMarseille.toFixed(2)} km`);

    
}


function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    const distance = R * c;
    return distance;
}