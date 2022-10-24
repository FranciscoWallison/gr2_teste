window.NAME_FILE = "aguardian90_8.gltf";
window.ROTATION_X = 5;

//Variables for setup
let container;
let camera;
let renderer;
let scene;
let animation;
let mixer;
let clock;

function init() {
  container = document.querySelector(".scene");

  //Create scene
  scene = new THREE.Scene();
  //Create clock
  clock = new THREE.Clock();


  //Camera setup
  const fov = 5;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 10000;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.y = 0;
  camera.position.z = 1000;
  // camera.lookAt(cube1.position);

  const ambient = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(0, 0, 100);
  scene.add(light);
  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //Load Model
  let loader = new THREE.GLTFLoader();
  loader.load(`./com_texture/3dmob/${window["NAME_FILE"]}`, function(gltf) {

    scene.add(gltf.scene);
    mixer = new THREE.AnimationMixer( gltf.scene );
    console.log('gltf.animations', gltf.animations)
    gltf.animations.forEach( ( clip ) => {
      mixer.clipAction( clip ).play();
    } );

    gltf.scene.children[0].rotation.x += window["ROTATION_X"];

    animate();
  });
}

function animate() {
  requestAnimationFrame(animate);
  var delta = clock.getDelta();
  if ( mixer ) mixer.update( delta );
  renderer.render(scene, camera);
}

init();
api();
function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);
