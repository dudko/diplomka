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
  http.open("POST", "/api/calcNew", true);
  http.setRequestHeader("Content-Type", "application/json");
  http.onerror = (e) => console.log(e);

  http.onload = function () {
    const { x, y, z, Y } = JSON.parse(this.response);

    var trace1 = {
      x, y, z,
      mode: 'markers',
      marker: {
        size: 12,
        color: Y,
        colorscale: 'Jet',
        opacity: 1
      },
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
    Plotly.newPlot('Ys', data, layout);

    // var scene = new THREE.Scene();
    //     var camera = new THREE.PerspectiveCamera(200, 600 / 600, 0.1, 1000);
        
    //     var renderer = new THREE.WebGLRenderer();
    //     renderer.setClearColor(new THREE.Color(0xEEEEEE));
    //     renderer.setSize(600, 600);

    //     var axes = new THREE.AxisHelper(100);
    //     scene.add(axes);

    //     const points = [];
    
    //     for (var i = 0; i <= 10000; i++) {
    //         points.push(new THREE.Vector3(x[i], y[i], z[i]));
    //     }
    //     var material = new THREE.MeshPhongMaterial({
    //         color: 0x252525
    //     });

    //     function createMesh(geom) {

    //         // assign two materials
    //         var meshMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00, transparent: true, opacity: 0.2});
    //         meshMaterial.side = THREE.DoubleSide;
    //         var wireFrameMat = new THREE.MeshBasicMaterial();
    //         wireFrameMat.wireframe = true;

    //         // create a multimaterial
    //         var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);

    //         return mesh;
    //     }

    //     var hullGeometry = new THREE.ConvexGeometry(points);
    //     mesh = createMesh(hullGeometry);
        
        
    //     // mesh.rotation.x = -0.5 * Math.PI;
    //     mesh.position.x = 0;
    //     mesh.position.y = 0;
    //     mesh.position.z = 0;
    //     scene.add(mesh);

    //     camera.position.x = -30;
    //     camera.position.y = 40;
    //     camera.position.z = 50;
    //     camera.lookAt(scene.position);

    //     document.getElementById('Ys2')
    //         .appendChild(renderer.domElement);
    //     renderer.render(scene, camera);
  }
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



//   let s = sigma.toArray();

//   let K = math.matrix([
//     [math.pow(s[0, 0], 2), math.pow(s[0, 1], 2), math.pow(s[0, 2], 2), 2*s[0, 1]*s[0, 2], 2*s[0, 2]*s[0, 0], 2*s[0, 0]*s[0, 1]],
//     [math.pow(s[1, 0], 2), math.pow(s[1, 1], 2), math.pow(s[1, 2], 2), 2*s[1, 1]*s[1, 2], 2*s[1, 2]*s[1, 0], 2*s[1, 0]*s[1, 1]],
//     [math.pow(s[2, 0], 2), math.pow(s[2, 1], 2), math.pow(s[2, 2], 2), 2*s[2, 1]*s[2, 2], 2*s[2, 2]*s[2, 0], 2*s[2, 0]*s[2, 1]],
    
// ])


