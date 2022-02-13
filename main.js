import './style.css'

import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

const scene = new THREE.Scene()

// Camera conf
const fov = 75
const aspectRatio = window.innerWidth /window.innerHeight
const frustrumNear = 0.1
const frustrumFar = 1000
const camera = new THREE.PerspectiveCamera(fov, aspectRatio, frustrumNear, frustrumFar)
camera.position.setZ(30);


// engine renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera)



// lights
const pointLight = new THREE.PointLight(0xffffff)
const ambientLight = new THREE.AmbientLight(0xffffff)
pointLight.position.set(5,5,5)
scene.add(pointLight, ambientLight)

// Helpers
// const lightHelper = new THREE.PointLightHelper(pointLight) // help visualise pointLight 
// const gridHelper = new THREE.GridHelper(200,50)
// scene.add(lightHelper, gridHelper)
const controls = new OrbitControls(camera, renderer.domElement) // place grid to visualise and manipulate space


// Instanciate G_Objects
const spongeTexture = new THREE.TextureLoader().load("fish.jpg")  // sponge planet
const sponge = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: spongeTexture
  })
)
sponge.position.setZ(30)
sponge.position.setX(-10)
Array(200).fill().forEach(addStar) // stars randomly placed

// background
const bg_texture = new THREE.TextureLoader().load('space.jpg')

scene.background = bg_texture
scene.add(sponge)
animate()

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24,24)
    const material = new THREE.MeshStandardMaterial({map: spongeTexture})
    const star = new THREE.Mesh(geometry, material)

    const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100))
    star.position.set(x,y,z)
    scene.add(star)
}

function animate() {
  requestAnimationFrame(animate)
  sponge.rotation.x +=0.02;
  sponge.rotation.y +=0.005;
  sponge.rotation.z +=0.01;
  
  
  renderer.render(scene, camera)
  controls.update()
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function moveCamera() {
  const positionScrolled = document.body.getBoundingClientRect().top;
  sponge.rotation.x += 0.05
  sponge.rotation.y += 0.075
  sponge.rotation.z += 0.05

  camera.position.z = positionScrolled * -0.01;
  camera.position.x = positionScrolled * -0.0002;
  camera.position.y = positionScrolled * -0.0002;

}

document.body.onscroll =moveCamera
