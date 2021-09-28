import * as THREE from "./three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

function init() {
  var scene = new THREE.Scene();

  const fog = new THREE.FogExp2("ffffff", 0.2);

  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("webgl").appendChild(renderer.domElement);
  renderer.setClearColor("rgb(120,120,120)");
  const controls = new OrbitControls(camera, renderer.domElement);
  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;
  var mesh = getBox(1, 1, 1);
  mesh.position.y = mesh.geometry.parameters.height / 2;
  var plane = getPlane(20);
  plane.rotation.x = Math.PI / 2;
  var sphere = getSphere(0.05);
  sphere.position.y = 1.2;
  var pointLight = getPointLight(1);
  pointLight.add(sphere);
  pointLight.position.y = 1.1;
  scene.add(plane, mesh, pointLight, sphere, fog);
  plane.name = "plane-1";
  // plane.add(mesh);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  update(renderer, scene, camera, controls);
  console.log(scene);
}

function getBox(x, y, z) {
  var geometry = new THREE.BoxGeometry(x, y, z);
  var material = new THREE.MeshPhongMaterial({ color: "rgb(120,120,120)" });
  var boxMesh = new THREE.Mesh(geometry, material);
  return boxMesh;
}

function getSphere(radius) {
  var geometry = new THREE.SphereGeometry(radius, 30, 30);
  var material = new THREE.MeshBasicMaterial({ color: "#FFFFFF" });
  var sphereMesh = new THREE.Mesh(geometry, material);
  return sphereMesh;
}

function getPlane(size) {
  var geometry = new THREE.PlaneGeometry(size, size);
  var material = new THREE.MeshPhongMaterial({
    color: "rgb(120,120,120)",
    side: THREE.DoubleSide,
  });
  var mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

function update(renderer, scene, camera, controls) {
  renderer.render(scene, camera);
  // var plane = scene.getObjectByName("plane-1");
  // plane.rotation.y += 0.01;
  // plane.rotation.z += 0.01;
  controls.update();
  requestAnimationFrame(() => {
    update(renderer, scene, camera, controls);
  });
}

function getPointLight(intensity) {
  var light = new THREE.PointLight("#FFFFFF", intensity);
  return light;
}
init();
