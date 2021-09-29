// import * as THREE from "./three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

function init() {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2("rgb(0,0,0)", 0.1, 50, 1000);

  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  let clock = new THREE.Clock();

  //renderer shit
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("webgl").appendChild(renderer.domElement);
  renderer.setClearColor("rgb(0,0, 0)");
  renderer.shadowMap.enabled = true;

  //Orbit controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1;
  controls.enableDamping = true;
  controls.dampingFactor = 0.02;
  controls.screenSpacePanning = true;

  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;
  // var mesh = getBox(1, 1, 1);
  // mesh.position.y = mesh.geometry.parameters.height / 2;
  var plane = getPlane(20);
  var boxGrid = getBoxGrid(120, 0.15);
  boxGrid.name = "boxGrid";
  plane.rotation.x = Math.PI / 2;

  //set sphere variable to getSphere function and set position
  var sphere = getSphere(0.07);
  sphere.position.y = 1.2;

  //set pointLight variable to getPointLight Function and set intensity,
  var pointLight = getPointLight(3);
  pointLight.position.y = 1.2;

  var spotLight = getSpotLight(3);
  spotLight.position.y = 4;

  var directionalLight = getDirectionalLight(2);
  directionalLight.position.y = 5;
  directionalLight.position.x = 0;

  var ambientLight = getAmbientLight(1);
  ambientLight.position.y = 10;

  //add shit 2 scene
  scene.add(plane);
  scene.add(ambientLight);
  scene.add(spotLight);
  scene.add(directionalLight);
  scene.add(pointLight, sphere);
  scene.add(boxGrid);

  camera.lookAt(new THREE.Vector3(0, 0, 0));
  update(renderer, scene, camera, controls, clock);
  console.log(scene);
}

function getBox(x, y, z) {
  var geometry = new THREE.BoxGeometry(x, y, z);
  var material = new THREE.MeshStandardMaterial({
    color: "rgb(120,120,120)",
    roughness: 0.4,
    metalness: 0.7,
  });
  var boxMesh = new THREE.Mesh(geometry, material);
  return boxMesh;
}

function getBoxGrid(amount, separationMultiplier) {
  var group = new THREE.Group();

  for (let i = 0; i < amount; i++) {
    var obj = getBox(0.1, 0.1, 0.1);
    obj.position.x = i * separationMultiplier;
    obj.position.y = obj.geometry.parameters.height / 2;
    group.add(obj);
    for (let j = 1; j < amount; j++) {
      var obj = getBox(0.1, 0.1, 0.1);
      obj.position.x = i * separationMultiplier;
      obj.position.y = obj.geometry.parameters.height / 2;
      obj.position.z = j * separationMultiplier;
      group.add(obj);
    }
  }
  group.position.x = -9;
  group.position.y = 0;
  group.position.z = -9;

  return group;
}

function getSphere(radius) {
  var geometry = new THREE.SphereGeometry(radius, 30, 30);
  var material = new THREE.MeshBasicMaterial({ color: "#FFFFFF" });
  var sphereMesh = new THREE.Mesh(geometry, material);
  sphereMesh.castShadow = true;
  return sphereMesh;
}

function getPlane(size) {
  var geometry = new THREE.PlaneGeometry(size, size);
  var material = new THREE.MeshPhongMaterial({
    color: "rgb(255,0,0)",
    side: THREE.DoubleSide,
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  return mesh;
}

function update(renderer, scene, camera, controls, clock) {
  renderer.render(scene, camera);
  // var plane = scene.getObjectByName("plane-1");
  // plane.rotation.y += 0.01;
  // plane.rotation.z += 0.01;
  let timeLapsed = clock.getElapsedTime();
  let boxGrid = scene.getObjectByName("boxGrid");
  boxGrid.children.forEach((child, index) => {
    child.scale.y = (Math.sin(timeLapsed * 3 + index) + 1) / 2 + 0.01;
    child.position.y = child.scale.y / 2;
  });
  controls.update();
  requestAnimationFrame(() => {
    update(renderer, scene, camera, controls, clock);
  });
}

//LIGHTS MF
function getPointLight(intensity) {
  var light = new THREE.PointLight("#FFFFFF", intensity);
  light.castShadow = true;
  light.receiveShadow = true;
  return light;
}

function getSpotLight(intensity) {
  var light = new THREE.SpotLight("rgb(255,0,0)", intensity);
  light.castShadow = true;
  return light;
}

function getDirectionalLight(intensity) {
  var light = new THREE.DirectionalLight("rgb(0,0,255)", intensity);
  light.castShadow = true;
  return light;
}

function getAmbientLight(intensity) {
  var light = new THREE.AmbientLight("rgb(94,255,186)", intensity);
  return light;
}

init();
