// import * as THREE from "./three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

function init() {
  // make  a scene and add fog 2 it :)
  const scene = new THREE.Scene();
  // scene.fog = new THREE.FogExp2("rgb(0,0,0)", 0.1, 600, 1000);

  // camera shit
  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  camera.position.x = 1;
  camera.position.y = 5;
  camera.position.z = 5;

  let clock = new THREE.Clock();

  const textureLoader = new THREE.TextureLoader();
  textureLoader.load("inline_image_preview.jpeg", function (texture) {
    var material = new THREE.MeshBasicMaterial();
    material.envMap = texture;
  });

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
  controls.maxDistance = 1500;

  //skybox
  let materialArray = [];
  let textureNegX = new THREE.TextureLoader().load("skybox/yellowcloud_bk.jpg");
  let textureNegY = new THREE.TextureLoader().load("skybox/yellowcloud_dn.jpg");
  let textureNegZ = new THREE.TextureLoader().load("skybox/yellowcloud_ft.jpg");
  let textureY = new THREE.TextureLoader().load("skybox/yellowcloud_lf.jpg");
  let textureZ = new THREE.TextureLoader().load("skybox/yellowcloud_rt.jpg");
  let textureX = new THREE.TextureLoader().load("skybox/yellowcloud_up.jpg");

  materialArray.push(new THREE.MeshBasicMaterial({ map: textureNegX }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: textureNegZ }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: textureNegY }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: textureX }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: textureY }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: textureZ }));

  let skyBoxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
  let skyBoxMesh = new THREE.Mesh(skyBoxGeo, materialArray);
  // set images to inside of skybox
  for (let i = 0; i < 6; i++) {
    materialArray[i].side = THREE.BackSide;
  }

  // var mesh = getBox(1, 1, 1);
  // mesh.position.y = mesh.geometry.parameters.height / 2;
  var plane = getPlane(20);
  plane.name = "plane-1";
  var boxGrid = getBoxGrid(38, 0.5);
  boxGrid.name = "boxGrid";
  plane.rotation.x = Math.PI / 2;

  //set sphere variable to getTorus function and set position
  var torus = getTorus(1);
  torus.position.y = 3;
  torus.rotation.x = Math.PI / 6;
  torus.name = "torus-1";

  var torus2 = getTorus2(1);
  torus2.position.y = 3;
  torus2.rotation.x = Math.PI / 6;
  torus2.name = "torus-2";

  //set pointLight variable to getPointLight Function and set intensity,
  var pointLight = getPointLight(3);
  pointLight.position.y = 1.2;

  let sphere = getSphere(0.4);
  sphere.position.y = 3;

  var spotLight = getSpotLight(4);
  spotLight.position.y = 4;

  let whitePointLight = getWhitePointLight(0.5);
  whitePointLight.position.y = 20;

  var directionalLight = getDirectionalLight(2);
  directionalLight.position.y = 7;
  directionalLight.position.x = 0;

  var ambientLight = getAmbientLight(2);
  ambientLight.position.y = 20;

  var sphereLight = getSphereLight(2);
  sphereLight.position.y = 2;

  //add shit 2 scene
  scene.add(plane);
  scene.add(ambientLight);
  scene.add(spotLight);
  scene.add(directionalLight);
  scene.add(pointLight, torus);
  scene.add(boxGrid);
  scene.add(skyBoxMesh);
  scene.add(whitePointLight);
  scene.add(sphere);
  scene.add(torus2);

  camera.lookAt(new THREE.Vector3(0, 0, 0));
  update(renderer, scene, camera, controls, clock);
  console.log(scene);
}

function getBox(x, y, z) {
  var geometry = new THREE.SphereGeometry(x, y, z);
  var material = new THREE.MeshStandardMaterial({
    color: "rgb(255,255,255)",
    roughness: 1,
    metalness: 1,
  });
  var boxMesh = new THREE.Mesh(geometry, material);
  return boxMesh;
}

function getBoxGrid(amount, separationMultiplier) {
  var group = new THREE.Group();

  for (let i = 0; i < amount; i++) {
    var obj = getBox(0.2, 26, 26);
    obj.position.x = i * separationMultiplier;
    obj.position.y = obj.geometry.parameters.height / 2;
    group.add(obj);
    for (let j = 1; j < amount; j++) {
      var obj = getBox(0.2, 26, 26);
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

function getTorus(radius) {
  var geometry = new THREE.TorusGeometry(radius, 0.03, 30, 200);
  var material = new THREE.MeshStandardMaterial({
    color: "#FFFFFFF",
    metalness: 1,
    roughness: 5,
  });
  var sphereMesh = new THREE.Mesh(geometry, material);
  sphereMesh.castShadow = true;
  sphereMesh.receiveShadow = true;
  sphereMesh.rotation.y += 0.1;
  return sphereMesh;
}

function getTorus2(radius) {
  var geometry = new THREE.TorusGeometry(radius, 0.03, 30, 200);
  var material = new THREE.MeshStandardMaterial({
    color: "#FFFFFFF",
    metalness: 1,
    roughness: 5,
  });
  var sphereMesh = new THREE.Mesh(geometry, material);
  sphereMesh.castShadow = true;
  sphereMesh.receiveShadow = true;
  sphereMesh.rotation.y += 0.1;
  return sphereMesh;
}
function getSphere(radius) {
  let sphereGeometry = new THREE.SphereGeometry(radius, 30, 30);
  let sphereMaterial = new THREE.MeshBasicMaterial({ color: "#000000" });
  let sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphereMesh.castShadow = true;
  return sphereMesh;
}

function getPlane(size) {
  let loader = new THREE.TextureLoader();
  var geometry = new THREE.PlaneGeometry(size, size);
  var material = new THREE.MeshStandardMaterial({
    color: "rgb(255,255,255)",
    side: THREE.DoubleSide,
  });
  material.map = loader.load("checkerboard-pattern.jpeg");
  material.roughnessMap = loader.load("checkerboard-pattern.jpeg");
  material.metalness = 0.7;
  material.roughness = 0;

  var mesh = new THREE.Mesh(geometry, material);
  mesh.receiveShadow = true;
  // mesh.castShadow = true;

  return mesh;
}

function update(renderer, scene, camera, controls, clock) {
  renderer.render(scene, camera);
  var plane = scene.getObjectByName("plane-1");
  let torus = scene.getObjectByName("torus-1");
  let torus2 = scene.getObjectByName("torus-2");

  torus.rotation.x += 0.007;
  torus.rotation.y += 0.007;

  torus2.rotation.x -= 0.007;
  torus2.rotation.y -= 0.007;

  plane.rotation.z += 0.007;
  let timeLapsed = clock.getElapsedTime();
  let boxGrid = scene.getObjectByName("boxGrid");
  boxGrid.children.forEach((child, index) => {
    child.position.y = (Math.cos(timeLapsed * 3 + index) + 1) / 2;
    // child.position.y = child.scale.y / 2;
  });
  controls.update();
  requestAnimationFrame(() => {
    update(renderer, scene, camera, controls, clock);
  });
}

//LIGHTS MF
function getPointLight(intensity) {
  var light = new THREE.PointLight("#FFFF00", intensity);
  light.castShadow = true;
  return light;
}

function getWhitePointLight(intensity) {
  let whitePointLight = new THREE.PointLight("rgb(255,255,255)", intensity);
  whitePointLight.castShadow = true;
  return whitePointLight;
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
  var light = new THREE.AmbientLight("rgb(203,249,255)", intensity);
  return light;
}

function getSphereLight(intensity) {
  var light = new THREE.DirectionalLight("rgb(0,255,0)", intensity);
  light.receiveShadow = true;
  return light;
}
init();
