window.onload = init;

function init() {
  reloadLocal();
  reloadRemote();
}

function prefill(faceKey) {
  let cubic = [];

  if (faceKey) {
    cubic = JSON.parse(localStorage.getItem(faceKey));
  } else {
    cubic = [
      [106.75, 60.41, 60.41, 0, 0, 0],
      [60.41, 106.75, 60.41, 0, 0, 0],
      [60.41, 60.41, 106.75, 0, 0, 0],
      [0, 0, 0, 28.34, 0, 0],
      [0, 0, 0, 0, 28.34, 0],    
      [0, 0, 0, 0, 0, 28.34]
    ];
  }
  
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      const cell = document.getElementsByName(`${i}${j}`);
      cell[0].value = cubic[i][j];
    }
  }
}

function formToMatrix() {
  const matrix = [
    [], [], [], [], [], []
  ];

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      const cell = document.getElementsByName(`${i}${j}`);
      matrix[i][j] = parseFloat(cell[0].value);
    }
  }

  return matrix;
}

function sendMatrix() {
  const matrix = formToMatrix();

  const http = new XMLHttpRequest();
  http.open("POST", "/api/calc", true);
  http.setRequestHeader("Content-Type", "application/json");

  http.onload = function () {
    // console.log(this);
    reloadRemote();
  };

  http.send(JSON.stringify({ matrix }));
}

function saveLocaly() {
  const matrix = formToMatrix();
  const name = 'Face ' + (localStorage.length + 1);
  localStorage.setItem(name, JSON.stringify(matrix));
  reloadLocal();
}

function reloadLocal() {
  const localUl = document.getElementById('local');

  while(localUl.firstChild){
    localUl.removeChild(localUl.firstChild);
  }

  for (let faceName in localStorage) {
    const face = document.createElement('li');
    const faceAction = document.createElement('a');
    const faceText = document.createTextNode(faceName);

    faceAction.setAttribute('onclick', `return prefill("${faceName}")`);
    faceAction.appendChild(faceText);
    face.appendChild(faceAction);
    localUl.appendChild(face);
  }

}

function reloadRemote() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "/api/faces", true);
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const remoteUl = document.getElementById('remote');

        while(remoteUl.firstChild){
          remoteUl.removeChild(remoteUl.firstChild);
        }

        const faces = JSON.parse(xhr.responseText);

        faces.forEach(face => {
          const faceLi = document.createElement('li');
          const faceText = document.createTextNode(face.name);
          faceLi.appendChild(faceText);
          remoteUl.appendChild(faceLi);
        });
      } else {
        console.error(xhr.statusText);
      }
    }
  };
  xhr.onerror = function (e) {
    console.error(xhr.statusText);
  };
  xhr.send(null);
}

function marsaglia(numOfPoints) {
  const points = {
    x: [],
    y: [],
    z: []
  };

  while(numOfPoints) {
    // u, v in (-1, 1)
    const u = Math.random() * (Math.floor(Math.random()*2) == 1 ? 1 : -1)
    const v = Math.random() * (Math.floor(Math.random()*2) == 1 ? 1 : -1)

    if (Math.pow(u) + Math.pow(v) >= 1) continue;

    points.x.push(2 * u * Math.sqrt(1 - Math.pow(u, 2) - Math.pow(v, 2)));
    points.y.push(2 * v * Math.sqrt(1 - Math.pow(u, 2) - Math.pow(v, 2)));
    points.z.push(1 - 2 * (Math.pow(u, 2) + Math.pow(v, 2)));

    numOfPoints--;
  }

  return points;
}

const points = marsaglia(1000);
var trace1 = {
  x: points.x , y: points.y, z: points.z,
  mode: 'markers',
  marker: {
		size: 5,
		line: {
		color: 'rgba(217, 217, 217, 0.14)',
		width: 0.5},
		opacity: 1},
	type: 'scatter3d'
};

var data = [trace1];
var layout = {
  margin: {
    l: 0,
    r: 0,
    b: 0,
    t: 20
  }
};
Plotly.newPlot('points', data, layout);

function youngus() {
  const points = marsaglia(1000);

  const i = points.x[0];
  const j = points.y[0];
  const k = points.z[0];

  console.log(i, j, k);

  const theta = Math.acos(k);

  console.log(theta);


  let I = math.matrix([[k, 0, 0], [0, k, 0], [0, 0, k]]);
  let M = math.matrix([[0, -k, j], [k, 0, -i], [-j, i, 0]]);
  let N = math.matrix([[i*i, i*j, i*k], [j*i, j*j, j*k], [k*i, k*j, k*k]]);

  M = math.multiply(M, Math.sin(theta));
  N = math.multiply(N, 1-k);
  let sigma = math.add(I, M);
  let s = sigma.toArray();

  let K = math.matrix([
    [math.pow(s[0, 0], 2), math.pow(s[0, 1], 2), math.pow(s[0, 2], 2), 2*s[0, 1]*s[0, 2], 2*s[0, 2]*s[0, 0], 2*s[0, 0]*s[0, 1]],
    [math.pow(s[1, 0], 2), math.pow(s[1, 1], 2), math.pow(s[1, 2], 2), 2*s[1, 1]*s[1, 2], 2*s[1, 2]*s[1, 0], 2*s[1, 0]*s[1, 1]],
    [math.pow(s[2, 0], 2), math.pow(s[2, 1], 2), math.pow(s[2, 2], 2), 2*s[2, 1]*s[2, 2], 2*s[2, 2]*s[2, 0], 2*s[2, 0]*s[2, 1]],
    
])

}

