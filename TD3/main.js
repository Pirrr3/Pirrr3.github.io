import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new THREE.TextureLoader();
loader.load('./textures/background.jpg', function (texture) {
    scene.background = texture;
});

const scene = new THREE.Scene();

// fog
scene.fog = new THREE.Fog(0x000000, 1, 15);

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// couleur cube
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

// texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./textures/wood.jpg');

// cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { map : texture  } );
const cube = new THREE.Mesh( geometry, material );

scene.add( cube );

camera.position.z = 5;


// pluie
const rainCount = 1000;
const rainGeometry = new THREE.BufferGeometry();
const rainPositions = new Float32Array(rainCount * 3);

for (let i = 0; i < rainCount * 3; i += 3) {
  rainPositions[i] = (Math.random() - 0.5) * 20;
  rainPositions[i + 1] = Math.random() * 20;
  rainPositions[i + 2] = (Math.random() - 0.5) * 20;
}

rainGeometry.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));

const rainMaterial = new THREE.PointsMaterial({
  color: 0xaaaaaa,
  size: 0.1,
  transparent: true,
  opacity: 0.5
});

const rain = new THREE.Points(rainGeometry, rainMaterial);
scene.add(rain);


// orientation
window.addEventListener('deviceorientation', handleOrientation);

// rotation cube et pluie
function animate() {
    requestAnimationFrame(animate);
  
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  
    const rainPositions = rain.geometry.attributes.position.array;
    for (let i = 1; i < rainPositions.length; i += 3) {
      rainPositions[i] -= 0.1;
  
      if (rainPositions[i] < 0) {
        rainPositions[i] = 20;
      }
    }
    rain.geometry.attributes.position.needsUpdate = true;
  
    renderer.render(scene, camera);
}
  


function handleOrientation(event) {
    const alpha = event.alpha;
    const beta = event.beta;
    const gamma = event.gamma;
  
    cube.rotation.x = beta * (Math.PI / 180);
    cube.rotation.y = gamma * (Math.PI / 180);
    cube.rotation.z = alpha * (Math.PI / 180);
  }

