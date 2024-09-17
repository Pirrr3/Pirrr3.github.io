
function updateOrientation(event) {
    const alpha = event.alpha ? event.alpha.toFixed(2) : 'Non disponible';
    const beta = event.beta ? event.beta.toFixed(2) : 'Non disponible';
    const gamma = event.gamma ? event.gamma.toFixed(2) : 'Non disponible';

    document.getElementById('alpha').textContent = 'Alpha : ' + alpha + '°';
    document.getElementById('beta').textContent = 'Beta : ' + beta + '°';
    document.getElementById('gamma').textContent = 'Gamma : ' + gamma + '°';
}

function updateMotion(event) {
    const accelX = event.accelerationIncludingGravity.x ? event.accelerationIncludingGravity.x.toFixed(2) : 'Non disponible';
    const accelY = event.accelerationIncludingGravity.y ? event.accelerationIncludingGravity.y.toFixed(2) : 'Non disponible';
    const accelZ = event.accelerationIncludingGravity.z ? event.accelerationIncludingGravity.z.toFixed(2) : 'Non disponible';

    const rotationX = event.rotationRate.alpha ? event.rotationRate.alpha.toFixed(2) : 'Non disponible';
    const rotationY = event.rotationRate.beta ? event.rotationRate.beta.toFixed(2) : 'Non disponible';
    const rotationZ = event.rotationRate.gamma ? event.rotationRate.gamma.toFixed(2) : 'Non disponible';

    document.getElementById('accel-x').textContent = 'Accélération X : ' + accelX + ' m/s²';
    document.getElementById('accel-y').textContent = 'Accélération Y : ' + accelY + ' m/s²';
    document.getElementById('accel-z').textContent = 'Accélération Z : ' + accelZ + ' m/s²';
    document.getElementById('rotation-x').textContent = 'Rotation X : ' + rotationX + '°/s';
    document.getElementById('rotation-y').textContent = 'Rotation Y : ' + rotationY + '°/s';
    document.getElementById('rotation-z').textContent = 'Rotation Z : ' + rotationZ + '°/s';
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', updateOrientation);
    } else {
        alert('DeviceOrientation non supportée par ce navigateur.');
    }

    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', updateMotion);
    } else {
        alert('DeviceMotion non supportée par ce navigateur.');
    }
});
