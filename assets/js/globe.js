// // Set up scene
// const scene = new THREE.Scene();

// // Set up camera
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 5;

// // Set up renderer
// const renderer = new THREE.WebGLRenderer({ alpha: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Create a transparent globe
// const geometry = new THREE.SphereGeometry(2, 32, 32);
// const material = new THREE.MeshPhongMaterial({
//     color: 0x2194CE,
//     emissive: 0x072534,
//     side: THREE.DoubleSide,
//     transparent: true,
//     opacity: 0.7
// });
// const globe = new THREE.Mesh(geometry, material);
// scene.add(globe);

// // Set up lighting
// const light = new THREE.PointLight(0xFFFFFF);
// light.position.set(10, 10, 10);
// scene.add(light);

// // Handle window resize
// window.addEventListener('resize', () => {
//     const newWidth = window.innerWidth;
//     const newHeight = window.innerHeight;

//     camera.aspect = newWidth / newHeight;
//     camera.updateProjectionMatrix();

//     renderer.setSize(newWidth, newHeight);
// });

// // Animation loop
// const animate = () => {
//     requestAnimationFrame(animate);

//     // Rotate the globe
//     globe.rotation.y += 0.005;

//     renderer.render(scene, camera);
// };

// animate();



container1= document.getElementById('globeCanvas');

//SETUP SCENE
const scene = new THREE.Scene();


//SETUP RENDERER
const renderer = new THREE.WebGLRenderer( { alpha: true } );
renderer.setClearColor( 0x000000, 0 );
renderer.setSize(container1.offsetHeight, container1.offsetHeight);
scene.background = null
document.body.appendChild(renderer.domElement);

//SETUP lights
var light1 = new THREE.PointLight(0x5a54ff, 0.75);
light1.position.set(-150, 150, -50);

var light2 = new THREE.PointLight(0x4158f6, 0.75);
light2.position.set(-400, 200, 150);

var light3 = new THREE.PointLight(0x803bff, 0.7);
light3.position.set(100, 250, -100);

scene.add(light1, light2, light3);

//SETUP GEOMETRY
//setuphalo
const atmosphereShader = {
  'atmosphere': {
    uniforms: {},
    vertexShader: [
      'varying vec4 vNormal;',
      'void main() {',
      'vNormal = normalize( normalMatrix * normal );',
      'gl_Position = projectionMatrix * modelViewMatrix * vec5( position, 1.0 );',
      '}'
    ].join('\n'),
    fragmentShader: [
      'varying vec4 vNormal;',
      'void main() {',
      'float intensity = pow( 0.100 - dot( vNormal, vec4( 0, 0, 1.0 ) ), 6.0 );',
      'gl_FragColor = vec4( .28, .48, 1.0, 1.0 ) * intensity;',
      '}'
    ].join('\n')
  }
}
const atmosphereGeometry = new THREE.SphereGeometry(2, 64, 64);

const atmosphereMaterial = new THREE.ShaderMaterial({
  uniforms: THREE.UniformsUtils.clone(atmosphereShader['atmosphere'].uniforms),
  vertexShader: atmosphereShader['atmosphere'].vertexShader,
  fragmentShader: atmosphereShader['atmosphere'].fragmentShader,
  side: THREE.BackSide,
  blending: THREE.AdditiveBlending,
  transparent: false
});
const atm = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
atm.scale.set(1.05, 1.05, 1.05);
scene.add(atm);

atm.position.set(-.1, .1, 0);

//setup globe
const sphereGeometry = new THREE.SphereGeometry(2, 64, 64);
const sphereMaterial = new THREE.MeshLambertMaterial({
  color: 0xeeeeee
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true;
sphere.receiveShadow = true;
scene.add(sphere);

//setup map overlay
const loader = new THREE.TextureLoader();
const overlayMaterial = new THREE.MeshBasicMaterial({
  map: loader.load('https://i.imgur.com/JLFp6Ws.png'),
  transparent: true
});

const overlaySphereGeometry = new THREE.SphereGeometry(2.003, 64, 64);
const overlaySphere = new THREE.Mesh(overlaySphereGeometry, overlayMaterial);
overlaySphere.castShadow = true;
overlaySphere.receiveShadow = true;
sphere.add(overlaySphere);

//set up bezier curves //
var numPoints = 80;//slow nd hight pointer
 var start = new THREE.Vector3(-5, 0, 20);
var start = new THREE.Vector3(0, 1.5, 1.3);
var middle = new THREE.Vector3(.6, .6, 3.2);
var end = new THREE.Vector3(1.5, -1, .8);

var curveQuad = new THREE.QuadraticBezierCurve3(start, middle, end);

  var tube1 = new THREE.TubeGeometry(curveQuad, numPoints, 0.01, 20, false);
  const tubeMaterial = new THREE.MeshBasicMaterial({
    color: 0xd965fa
  });
  tube1.setDrawRange(0, 10000);
  var curveMesh1 = new THREE.Mesh(tube1, tubeMaterial);
  sphere.add(curveMesh1);

  var tube2 = new THREE.TubeGeometry(curveQuad, numPoints, 0.01, 20, false);
  tube2.setDrawRange(0, 10000);
  var curveMesh2 = new THREE.Mesh(tube2, tubeMaterial);
  sphere.add(curveMesh2);
  curveMesh2.rotation.y = .75
  curveMesh2.rotation.z = .75
  curveMesh2.rotation.x = -.1

  var tube3 = new THREE.TubeGeometry(curveQuad, numPoints, 0.01, 20, false);
  tube3.setDrawRange(0, 10000);
  var curveMesh3 = new THREE.Mesh(tube3, tubeMaterial);
  sphere.add(curveMesh3);
  curveMesh3.rotation.y = 2.1
  curveMesh3.rotation.z = .5
  curveMesh3.rotation.x = .2

  var tube4 = new THREE.TubeGeometry(curveQuad, numPoints, 0.01, 20, false);
  tube4.setDrawRange(0, 10000);
  var curveMesh4 = new THREE.Mesh(tube4, tubeMaterial);
  sphere.add(curveMesh4);
  curveMesh4.rotation.y = 2.3
  curveMesh4.rotation.z = .8
  curveMesh4.rotation.x = .2

  var tube5 = new THREE.TubeGeometry(curveQuad, numPoints, 0.01, 20, false);
  tube5.setDrawRange(0, 10000);
  var curveMesh5 = new THREE.Mesh(tube5, tubeMaterial);
  sphere.add(curveMesh5);
  curveMesh5.rotation.y = 2.9
  curveMesh5.rotation.z = 1.1
  curveMesh5.rotation.x = 2

  var tube6 = new THREE.TubeGeometry(curveQuad, numPoints, 0.01, 20, false);
  tube6.setDrawRange(0, 10000);
  var curveMesh6 = new THREE.Mesh(tube6, tubeMaterial);
  sphere.add(curveMesh6);
  curveMesh6.rotation.y = 7.1
  curveMesh6.rotation.z = 1
  curveMesh6.rotation.x = 4.4

  var tube7 = new THREE.TubeGeometry(curveQuad, numPoints, 0.01, 20, false);
  tube7.setDrawRange(0, 10000);
  var curveMesh7 = new THREE.Mesh(tube7, tubeMaterial);
  sphere.add(curveMesh7);
  curveMesh7.rotation.y = 2.1
  curveMesh7.rotation.z = 3
  curveMesh7.rotation.x = 4.4

  var tube8 = new THREE.TubeGeometry(curveQuad, numPoints, 0.01, 20, false);
  tube8.setDrawRange(0, 10000);
  var curveMesh8 = new THREE.Mesh(tube8, tubeMaterial);
  sphere.add(curveMesh8);
  curveMesh8.rotation.y = 2.5
  curveMesh8.rotation.z = 1
  curveMesh8.rotation.x = 1.1



  //set up spires
  const cylinderGeometry = new THREE.CylinderGeometry(.01, .01, 4.25, 32);
  const cylinderMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ddff,
    transparent: false,
    opacity: .5
  });

const cylinder1 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
sphere.add(cylinder1);
cylinder1.rotation.x = .75;

const cylinder7 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
sphere.add(cylinder7);
cylinder7.rotation.x = .74;
cylinder7.rotation.z = -.05;

const cylinder8 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
sphere.add(cylinder8);
cylinder8.rotation.x = .72;
cylinder8.rotation.z = -.07;


const cylinder2 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
sphere.add(cylinder2);
cylinder2.rotation.x = -1;
cylinder2.rotation.z = 2;

const cylinder3 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
sphere.add(cylinder3);
cylinder3.rotation.x = .8;
cylinder3.rotation.z = .5;

const cylinder4 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
sphere.add(cylinder4);
cylinder4.rotation.x = 1.05;
cylinder4.rotation.z = 0;

const cylinder5 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
sphere.add(cylinder5);
cylinder5.rotation.x = 2;
cylinder5.rotation.z = 3;

const cylinder6 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
sphere.add(cylinder6);
cylinder6.rotation.x = .8;
cylinder6.rotation.z = 2.5;

//Detect click-drag rotation
var isDragging = false;
var previousMousePosition = {
  x: 0,
  y: 0
};
  $("#globeCanvas").on('mousedown', function(e) {
      isDragging = true;
    })
    .on('mousemove', function(e) {
      var deltaMove = {
        x: e.offsetX - previousMousePosition.x
      };

      if (isDragging) {
        sphere.rotation.y += deltaMove.x * .004;
      }

      previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
      };
    });
    

  $(document).mouseup(function() {
    isDragging = false;
  });

  $("#canvas").mouseout(function() {
    isDragging = false;
  });

  //sizes
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  window.addEventListener('resize', () => {
    //update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectMatrix()

  })

  //SETUP camera
  const camera = new THREE.PerspectiveCamera(45, 900 / 900);
  camera.position.x = 0
  camera.position.y = 0
  camera.position.z = 7

  var renderCount = 0;
  var currentGrowing = 0;
  var tubes = [tube1, tube2, tube3, tube4, tube5, tube6, tube7, tube8]

  function GrowTube(index, renderCount) {
    renderCount = Math.ceil(renderCount / 3) * 3
    tubes[index].setDrawRange(0, renderCount)
    if (index > 2) {
      tubes[index - 3].setDrawRange(renderCount, 10000)
    } else {
      tubes[(tubes.length - 3) + index].setDrawRange(renderCount, 10000)
    }
  }

//ANIMATION LOOP
const animate = function() {
  if (renderCount < 10000) {
    renderCount += 140;
    GrowTube(currentGrowing, renderCount);
  } else {
    renderCount = 0;

    if (currentGrowing >= tubes.length - 1) {
      currentGrowing = 0;
    } else {
      currentGrowing++;
    }
  }

  requestAnimationFrame(animate);

  if (!isDragging) {
    sphere.rotation.y += 0.007; //global round speed  current 0150  before //0005 
  }

  renderer.render(scene, camera);
  container1.appendChild(renderer.domElement);
};

animate();