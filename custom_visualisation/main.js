const MI = [[0, 5, 4], [5, 1, 3], [4, 3, 2]];
const MK = [[1, 0.5, 0.5], [0.5, 1, 0.5], [0.5, 0.5, 1]];

const matrix2tensor = tensor => {
  const S = math.inv(tensor);

  const s = [
    [
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    ],
    [
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    ],
    [
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    ],
  ];

  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      for (let k = 0; k < 3; k++)
        for (let l = 0; l < 3; l++) {
          const m = MI[i][j];
          const n = MI[k][l];
          s[i][j][k][l] = MK[i][j] * MK[k][l] * S[m][n];
        }
  return s;
};

// let Fe = [
//   [404, -6, -6, 0, 0, 0],
//   [-6, 404, -6, 0, 0, 0],
//   [-6, -6, 404, 0, 0, 0],
//   [0, 0, 0, -66, 0, 0],
//   [0, 0, 0, 0, -66, 0],
//   [0, 0, 0, 0, 0, -66],
// ];

const Fe = [
  [247, 150, 150, 0, 0, 0],
  [150, 247, 150, 0, 0, 0],
  [150, 150, 247, 0, 0, 0],
  [0, 0, 0, 97, 0, 0],
  [0, 0, 0, 0, 97, 0],
  [0, 0, 0, 0, 0, 97],
];

// Visualisation
const textlabels = [];
let scene;

function makeTextSprite(message, opts) {
  var parameters = opts || {};
  var fontface = parameters.fontface || "Helvetica";
  var fontsize = parameters.fontsize || 60;
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  context.font = fontsize + "px " + fontface;

  // get size data (height depends only on font size)
  var metrics = context.measureText(message);
  var textWidth = metrics.width;

  // text color
  context.fillStyle = "rgba(0, 0, 0, 1.0)";
  context.fillText(message, 0, fontsize);

  // canvas contents will be used for a texture
  var texture = new THREE.Texture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  var spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
    useScreenCoordinates: false,
  });

  var sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(100, 50, 1.0);
  return sprite;
}

function createTextLabel(i, camera) {
  const div = document.createElement("div");
  div.className = "text-label";
  div.style.position = "absolute";
  div.style.width = 100;
  div.style.height = 100;
  div.innerHTML = "text";
  div.style.top = -1000;
  div.style.left = -1000;

  return {
    element: div,
    camera,
    parent: false,
    position: new THREE.Vector3(0, 0, 0),
    setParent: function(Object3D) {
      this.parent = Object3D;
    },
    updatePosition: function() {
      if (parent) {
        this.position.copy(this.parent.position);
      }

      var coords2d = this.get2DCoords(this.position, this.camera);
      this.element.style.left = coords2d.x + "px";
      this.element.style.top = coords2d.y + "px";
    },
    get2DCoords: function(position, camera) {
      var vector = position.project(camera);

      vector.x = ((vector.x + 1) / 2) * window.innerWidth + i;
      vector.y = (-(vector.y - 1) / 2) * window.innerHeight;
      return vector;
    },
  };
}

function createGrid(camera) {
  const gridGroup = new THREE.Group();
  gridGroup.name = "grid";

  const baseAxes = new THREE.AxisHelper(500);
  gridGroup.add(baseAxes);

  const gridXZ = new THREE.GridHelper(500, 10);
  gridXZ.position.set(0, -250, 0);
  gridGroup.add(gridXZ);

  const gridXY = new THREE.GridHelper(500, 10);
  gridXY.position.set(0, 0, -250);
  gridXY.rotation.x = Math.PI / 2;
  gridGroup.add(gridXY);

  const gridYZ = new THREE.GridHelper(500, 10);
  gridYZ.position.set(-250, 0, 0);
  gridYZ.rotation.z = Math.PI / 2;
  gridGroup.add(gridYZ);

  gridGroup.axes = {
    name: "axes",
    x: [],
    y: [],
    z: [],
  };

  const labels = new THREE.Object3D();
  for (let i = -200; i < 250; i += 50) {
    const labelX = makeTextSprite(i);
    const labelY = labelX.clone();
    const labelZ = labelX.clone();

    labelX.position.set(i + 35, -280, 250);
    labelY.position.set(310, -250, i);
    labelZ.position.set(310, i, -250);

    labels.add(labelX);
    labels.add(labelY);
    labels.add(labelZ);
  }

  scene.add(labels);

  return gridGroup;
}

function init() {
  scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / innerHeight,
    1,
    3000
  );

  camera.lookAt(new THREE.Vector3(0, 0, 0));

  scene.add(camera);

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  camera.position.set(0, 1, 500);
  const grid = createGrid(camera);
  scene.add(grid);

  update(renderer, scene, camera, controls);

  geometry = new THREE.SphereGeometry(1, 500, 500);

  const s = matrix2tensor(Fe);

  geometry.youngsFace = [];
  geometry.youngsVertex = [];

  geometry.faces.forEach(face => {
    const { x: i, y: j, z: k } = face.normal;

    const A = [[0, 0, i], [0, 0, j], [0, 0, k]];

    let sumYoung = 0;

    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        for (let k = 0; k < 3; k++) {
          for (let l = 0; l < 3; l++) {
            sumYoung += A[i][2] * A[j][2] * A[k][2] * A[l][2] * s[i][j][k][l];
          }
        }

    face.normal.multiplyScalar(Math.round(Math.abs(1 / sumYoung) * 100) / 100);
    geometry.youngsFace.push(Math.round(Math.abs(1 / sumYoung) * 100) / 100);
  });

  geometry.vertices.forEach(vertex => {
    const { x: i, y: j, z: k } = vertex;

    const A = [[0, 0, i], [0, 0, j], [0, 0, k]];

    let sumYoung = 0;

    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        for (let k = 0; k < 3; k++) {
          for (let l = 0; l < 3; l++) {
            sumYoung += A[i][2] * A[j][2] * A[k][2] * A[l][2] * s[i][j][k][l];
          }
        }

    vertex.multiplyScalar(Math.round(Math.abs(1 / sumYoung) * 100) / 100);
    geometry.youngsVertex.push(Math.round(Math.abs(1 / sumYoung) * 100) / 100);
  });

  let min = Number.MAX_VALUE;
  let max = -Number.MAX_VALUE;

  geometry.youngsFace.forEach(value => {
    if (value < min) {
      min = value;
    }

    if (value > max) {
      max = value;
    }
  });

  var material = new THREE.LineBasicMaterial({
    side: THREE.DoubleSide,
    vertexColors: THREE.FaceColors,
    wireframe: true,
  });

  const valRange = max - min;

  const colorScale = chroma.scale("Spectral").domain([1, 0]);
  for (var i = 0; i < geometry.faces.length; i++) {
    face = geometry.faces[i];
    let v = (geometry.youngsFace[i] - min) / valRange;

    face.color = new THREE.Color(colorScale(v).hex());
  }

  mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  return scene;
}

function update(renderer, scene, camera, controls) {
  renderer.render(scene, camera);

  controls.update();

  const grid = scene.getObjectByName("grid");

  for (let i = 0; i < grid.axes.x.length; i++) {
    grid.axes.x[i].updatePosition();
  }

  requestAnimationFrame(function() {
    update(renderer, scene, camera, controls);
  });
}

init();
