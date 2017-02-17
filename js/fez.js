/*
  Helper functions
*/

/*
  Combines texture, geometry and material to create a box mesh
  then adds it to the scene using the passed position

  @textureUrl, string: URL to a texture image
  @position, object: x, y, z coordinates
*/
var createCube = function (textureUrl, position) {
  // Set the texture to wrap
  var texture = new THREE.Texture(textureUrl);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  // Make sure the pixel style remains
  texture.magFilter = THREE.NearestFilter;
  // Fix for not rendering the texture
  texture.needsUpdate = true;

  // Apply texture to material
  var material = new THREE.MeshLambertMaterial({
    map: texture,
    transparent: true
  });

  // Create a box geometry
  var geometry = new THREE.BoxGeometry(1, 1, 1);

  // Apply material to geometry creating a mesh
  var cube = new THREE.Mesh(geometry, material);

  // Set cube mesh to the correct positions
  cube.position.x = position[0];
  cube.position.y = position[1];
  cube.position.z = position[2];

  // Add cube mesh to the scene
  scene.add(cube);

  cubePositions.push(cube.position);
};

/*
  Global variables
*/

var cubePositions = [];

/*
  Setup all three.js goodness
*/

// Setup scene
var scene = new THREE.Scene();

// Setup camera
var aspectRatio = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(30, aspectRatio, 1, 1000);
camera.position.set(0, 0, 30);

// Setup engine & canvas
var renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Setup clock
var clock = new THREE.Clock();

// Setup matrixes
var rotationMatrix = new THREE.Matrix4();

// Setup spotlights
var spotLightFront = new THREE.SpotLight(0xffffff);
spotLightFront.position.set(50, 50, 1000);

var spotLightBack = new THREE.SpotLight(0xffffff);
spotLightBack.position.set(50, 50, -1000);

var spotLightLeft = new THREE.SpotLight(0xffffff, 0.4);
spotLightLeft.position.set(50, 50, 0);

var spotLightRight = new THREE.SpotLight(0xffffff, 0.4);
spotLightRight.position.set(-50, 50, 0);

scene.add(spotLightFront);
scene.add(spotLightBack);
scene.add(spotLightLeft);
scene.add(spotLightRight);

/*
  Setup scene content
*/

var initLandscape = function () {
  var i;

  // Textures
  var blueBrick = document.querySelector('#blue-brick');
  var dirt = document.querySelector('#ground');
  var grassDirt = document.querySelector('#ground-grass');
  var openLeafs = document.querySelector('#open-leafs');
  var stone = document.querySelector('#stone');
  var log = document.querySelector('#log');

  // Add mill building
  for (i = 2; i < 5; i += 1) {
    createCube(stone, [i, 3, -1]);
    createCube(stone, [i, 3, -2]);
    createCube(stone, [i, 3, -3]);
  }

  for (i = 2; i < 5; i += 1) {
    createCube(stone, [i, 4, -1]);
    createCube(stone, [i, 4, -2]);
    createCube(stone, [i, 4, -3]);
  }

  for (i = -1; i > -3; i--) {
    createCube(stone, [3, 5, i]);
  }

  // Add all cubes that form the landscape
  for (i = -6; i < 6; i += 1) {
    createCube(grassDirt, [i, 2, -4]);
    createCube(grassDirt, [i, 2, -3]);
    createCube(grassDirt, [i, 2, -2]);
    createCube(grassDirt, [i, 2, -1]);
    createCube(grassDirt, [i, 2, 0]);
  }

  for (i = -6; i < 6; i += 1) {
    createCube(dirt, [i, 1, -4]);
    createCube(dirt, [i, 1, -3]);
    createCube(dirt, [i, 1, -2]);
  }

  createCube(dirt, [-5, 1, 0]);
  createCube(dirt, [-4, 1, -1]);
  createCube(dirt, [-3, 1, 0]);
  createCube(dirt, [-2, 1, 0]);
  createCube(dirt, [-1, 1, -1]);
  createCube(dirt, [0, 1, -1]);
  createCube(dirt, [1, 1, 0]);
  createCube(dirt, [2, 1, 0]);
  createCube(dirt, [3, 1, 0]);

  for (i = -5; i < 3; i += 1) {
    createCube(dirt, [i, 0, -1]);
    createCube(dirt, [i, 0, -2]);
    createCube(dirt, [i, 0, -3]);
  }

  for (i = -4; i < 2; i += 1) {
    createCube(stone, [i, -1, Math.floor(-2 * Math.random())]);
    createCube(stone, [i, -1, -3]);
    createCube(stone, [i, -1, -4]);
  }

  for (i = -4; i < 2; i += 1) {
    createCube(stone, [i, -2, Math.floor(-2 * Math.random())]);
    createCube(stone, [i, -2, -3]);
    createCube(stone, [i, -2, -4]);
  }

  for (i = -3; i < 2; i += 1) {
    createCube(blueBrick, [i, -3, Math.floor(-2 * Math.random())]);
    createCube(blueBrick, [i, -3, -3]);
    createCube(blueBrick, [i, -3, Math.floor(-4 * Math.random())]);
  }

  for (i = -3; i < 1; i += 1) {
    createCube(blueBrick, [i, -4, Math.floor(-2 * Math.random())]);
    createCube(blueBrick, [i, -4, -3]);
    createCube(blueBrick, [i, -4, Math.floor(-4 * Math.random())]);
  }

  // Add tree
  createCube(openLeafs, [0, 0, -1]);
  createCube(openLeafs, [0, -1, -1]);
  createCube(openLeafs, [-1, -1, -1]);

  for (i = 3; i < 6; i += 1) {
    createCube(log, [-3, i, 0]);
  }

  for (i = -5; i < 0; i += 1) {
    createCube(openLeafs, [i, 5, -1]);
    createCube(openLeafs, [i, 5, 0]);
    createCube(openLeafs, [i, 5, 1]);
    createCube(openLeafs, [i, 5, Math.floor(3 * Math.random())]);
  }

  for (i = -4; i < -1; i += 1) {
    createCube(openLeafs, [i, 6, -1]);
    createCube(openLeafs, [i, 6, 0]);
    createCube(openLeafs, [i, 6, 1]);
    createCube(openLeafs, [i, 6, 0]);
  }
};
initLandscape();

// Add a sprite of our hero Gomez to the scene
var initGomez = function () {
  var gomez = document.querySelector('#gomez');

  var texture = new THREE.Texture(gomez);
  // Keep pixely look by setting scaling options
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  // Double width of texture to fit the spritesheet width
  texture.repeat.set(0.5, 1);
  // Fix to render the texture
  texture.needsUpdate = true;

  var material = new THREE.SpriteMaterial({
    map: texture
  });

  var spriteSheet = new THREE.Sprite(material);
  spriteSheet.position.y = 3;

  // Use frames instead of seconds because of animation speed
  var tl = new TimelineMax({
    repeat: -1,
    repeatDelay: 8 * 60,
    useFrames: true
  });

  // Eyes closed sprite
  tl.to(texture.offset, 17, {x: 0.5, ease: SteppedEase.config(1)});
  // Eyes open sprite
  tl.to(texture.offset, 0, {x: 0, ease: SteppedEase.config(1)});

  scene.add(spriteSheet);
};
initGomez();

// Add a sprite of the mill
var initMill = function () {
  var mill = document.querySelector('#mill');

  var texture = new THREE.Texture(mill);
  // Keep pixely look by setting scaling options
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  // Fix to render the texture
  texture.needsUpdate = true;

  var material = new THREE.SpriteMaterial({
    map: texture
  });

  var geometry = new THREE.PlaneGeometry(4, 4);

  var material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide
  });
  var plane = new THREE.Mesh(geometry, material);
  plane.position.set(3, 5, -0.4);

  var tl = new TimelineMax({
    repeat: -1
  });

  tl.to(plane.rotation, 2, {
    z: -Math.PI,
    ease: Power0.easeNone
  });

  scene.add(plane);
};
initMill();

/*
  Global animations
*/

var animateIntro = function (duration) {
  TweenMax.staggerFrom(cubePositions, duration, {
    z: 30,
    ease: Elastic.easeOut
  }, 0.03);

  TweenMax.from(camera.position, duration, {
    z: 100,
    x: 500,
    ease: Power2.easeOut,
    onUpdate: function () {
      camera.lookAt(scene.position);
    }
  });
};
animateIntro(7);

var rotateAroundScene = function (period) {
  // Make sure it rotates consistenly whatever the fps is
  rotationMatrix.makeRotationY(clock.getDelta() * 2 * Math.PI / period);
  camera.position.applyMatrix4(rotationMatrix);
  camera.lookAt(scene.position);
};

var rotateHandler = {
  element: document.querySelector('[rotate-handler]'),
  clickedState: false
};

rotateHandler.element.addEventListener('click', function () {
  rotateHandler.clickedState = !rotateHandler.clickedState;

  var renderRotate = function () {
    if (rotateHandler.clickedState) {
      requestAnimationFrame(renderRotate);
    }

    rotateAroundScene(10);
    renderer.render(scene, camera);
  };

  renderRotate();
});

/*
  Kick in the render cycle to actually show something
*/

var render = function () {
  requestAnimationFrame(render);

  renderer.render(scene, camera);
};
render();
