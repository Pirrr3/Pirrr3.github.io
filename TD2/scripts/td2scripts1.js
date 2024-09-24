navigator.geolocation.getCurrentPosition(showMap);


function showMap(position) {
    const userLatitude = position.coords.latitude;
    const userLongitude = position.coords.longitude;

    document.getElementById('current-lat').textContent = `Latitude : ${userLatitude}`;
    document.getElementById('current-lon').textContent = `Longitude : ${userLongitude}`;

    const niceCoords = [43.7102, 7.2620];

    const map = L.map('map').setView([userLatitude, userLongitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const userMarker = L.marker([userLatitude, userLongitude]).addTo(map);
    userMarker.bindPopup("<b>Vous êtes ici</b>").openPopup();

    const niceMarker = L.marker(niceCoords).addTo(map);
    niceMarker.bindPopup("<b>Nice - Centre Ville</b>").openPopup();


    var polygon = L.polygon([
        [25.789106, -80.226529],
        [18.4663188, -66.1057427],
        [32.294887, -64.781380]
    ],
    {color: 'red'}).addTo(map);



}
