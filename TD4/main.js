import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Initialisation de la scène
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 2, 0, 5 );

// Initialisation du renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Contrôles de la caméra
//const controls = new OrbitControls( camera, renderer.domElement );

// Création de la sphère représentant la Terre
const geometryE = new THREE.SphereGeometry(1, 32, 32);
const textureE = new THREE.TextureLoader().load( './textures/2k_earth_daymap.jpg' );
const materialTexE = new THREE.MeshBasicMaterial( { map: textureE } );
const earth = new THREE.Mesh( geometryE, materialTexE );
scene.add( earth );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1.5 );
scene.add( directionalLight );


function latLonToCartesian(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return new THREE.Vector3(x, y, z);
    }



    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const userPosition = latLonToCartesian(latitude, longitude, 1.01);

        const userMarkerGeometry = new THREE.SphereGeometry(0.01, 32, 32);
        const userMarkerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const userMarker = new THREE.Mesh(userMarkerGeometry, userMarkerMaterial);
        userMarker.position.copy(userPosition);


        scene.add(userMarker);

        // Load 3D model at user's position
        const loader = new GLTFLoader();
        loader.load('models/soldier.gltf', (gltf) => {
            const model = gltf.scene;
            model.position.copy(userPosition);
            model.scale.set(0.1, 0.1, 0.1);
            scene.add(model);
        });
    });

    // Add markers for countries
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(countries => {
            countries.forEach(country => {
                const { latlng, flags } = country;
                if (latlng) {
                    const [lat, lon] = latlng;
                    const countryPosition = latLonToCartesian(lat, lon, 1.01);
                    const countryMarkerGeometry = new THREE.SphereGeometry(0.01, 32, 32);
                    const flagTexture = new THREE.TextureLoader().load(flags.png);
                    const countryMarkerMaterial = new THREE.MeshBasicMaterial({ map: flagTexture });
                    const countryMarker = new THREE.Mesh(countryMarkerGeometry, countryMarkerMaterial);
                    countryMarker.position.copy(countryPosition);
                    scene.add(countryMarker);
                }
            });
        });

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);


// Fonction d'animation
const animate = function () {
    requestAnimationFrame(animate);
    //earth.rotation.y += 0.001;
    renderer.render(scene, camera);
};

animate();

// Ajuster le rendu lors du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
