const math = require('mathjs');

function randomPointSphere() {
  let i, j, k = 0;
  let running = true;

  while (running) {
    const u = Math.random() * (Math.random() < 0.5 ? 1 : -1);
    const v = Math.random() * (Math.random() < 0.5 ? 1 : -1);

    if (u*u + v*v >= 1) continue;

    i = 2 * u * Math.sqrt(1 - u*u - v*v);
    j = 2 * v * Math.sqrt(1 - u*u - v*v);
    k = 1 - 2 * (u*u + v*v);

    running = false;
  }

  return {i, j, k};
}

const youngsModulus = (tensors, totalCount = 10000, orientation) => {
  const S = math.inv(tensors);

  const result = {
    x: [],
    y: [],
    z: [],
    Y: []
  };

  for (let count = 0; count < totalCount; count++) {
    const {i, j, k} = orientation || randomPointSphere();

    const pow = math.pow;

    let Y =
      pow(i, 4) * math.subset(S, math.index(0, 0)) +
      pow(j, 4) * math.subset(S, math.index(1, 1)) +
      pow(k, 4) * math.subset(S, math.index(2, 2)) +
      pow(i, 2) * pow(j, 2) * 2* math.subset(S, math.index(0, 1)) +
      pow(i, 2) * pow(k, 2) * 2* math.subset(S, math.index(0, 2)) +
      pow(j, 2) * pow(k, 2) * 2* math.subset(S, math.index(1, 2)) +
      pow(i, 2) * j * k * math.subset(S, math.index(0, 3)) +
      pow(i, 3) * k * math.subset(S, math.index(0, 4)) +
      pow(i, 3) * j * math.subset(S, math.index(0, 5)) +
      pow(j, 2) * i * k * math.subset(S, math.index(1, 4)) +
      pow(j, 3) * k * math.subset(S, math.index(1, 3)) +
      pow(j, 3) * i * math.subset(S, math.index(1, 5)) +
      pow(k, 2) * i * j * math.subset(S, math.index(2, 5)) +
      pow(k, 3) * j * math.subset(S, math.index(2, 3)) +
      pow(k, 3) * i * math.subset(S, math.index(2, 4)) +
      pow(k, 2) * i * j * math.subset(S, math.index(3, 4)) +
      pow(j, 2) * i * k * math.subset(S, math.index(3, 5)) +
      pow(i, 2) * j * k * math.subset(S, math.index(4, 5)) +
      pow(j, 2) * pow(k, 2) * math.subset(S, math.index(3, 3)) +
      pow(i, 2) * pow(k, 2) * math.subset(S, math.index(4, 4)) +
      pow(i, 2) * pow(j, 2) * math.subset(S, math.index(5, 5));

    Y = Math.round(Math.abs(1/Y) * 100) / 100;
    result.x.push(Y * i);
    result.y.push(Y * j);
    result.z.push(Y * k);
    result.Y.push(Y);
  }

  return result;
}

const rotateTensors = (c, orientation) => {
  const S = math.inv(c);

  // Normalize direction vector
  let { x: i, y: j, z: k } = orientation;
  
  const length = math.sqrt(i*i + j*j + k*k);

  i = i / length;
  j = j / length;
  k = k / length;
  
  const s = [
    [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]],
    [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]],
    [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]]
  ];

  const s2 = [
    [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]],
    [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]],
    [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]]
  ];

  let m, n, coefIJ, coefKL;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++)
      for (let k = 0; k < 3; k++)
        for (let l = 0; l < 3; l++) {
          if (i === j) {
            m = i;
            coefIJ = 1;
          } else {
            coefIJ = 0.5;
            if ((i === 0) && (j === 1)) m = 5;
            if ((i === 0) && (j === 2)) m = 4;
            if ((i === 1) && (j === 2)) m = 3;
            if ((i === 1) && (j === 0)) m = 5;
            if ((i === 2) && (j === 0)) m = 4;
            if ((i === 2) && (j === 1)) m = 3;
          }

          if (k === l) {
            n = k;
            coefKL = 1;
          }
          else {
            coefKL = 0.5;
            if ((k === 0) && (l === 1)) n = 5;
            if ((k === 0) && (l === 2)) n = 4;
            if ((k === 1) && (l === 2)) n = 3;
            if ((k === 1) && (l === 0)) n = 5;
            if ((k === 2) && (l === 0)) n = 4;
            if ((k === 2) && (l === 1)) n = 3;
          }
          s[i][j][k][l] = coefIJ * coefKL * math.subset(S, math.index(m, n));
        }
  }

  const theta = math.acos(k);
  const sinTheta = math.sin(theta);

  let A = [ 
    [ k + (1 - k) * i * i, (1 - k) * i * j + sinTheta * -k, (1 - k) * i * k + j * sinTheta],
    [ (1 - k) * i * j + sinTheta * k, k + (1 - k) * j *j, (1 - k) * j * k + sinTheta * -i],
    [ (1 - k) * i * k + sinTheta * -j, (1 - k) * k * j + sinTheta * i, k + (1 - k) * k * k]
  ];

  A = math.transpose(A);

  const MI = [
    [0, 5, 4],
    [5, 1, 3],
    [4, 3, 2],
  ];

  const MK = [
    [1, 0.5, 0.5],
    [0.5, 1, 0.5],
    [0.5, 0.5, 1],
  ];

  const c2 = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
  ];


  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      for (let k = 0; k < 3; k++)
        for (let l = 0; l < 3; l++) {
          
          for (let a = 0; a < 3; a++)
            for (let b = 0; b < 3; b++)
              for (let c = 0; c < 3; c++)
                for (let d = 0; d < 3; d++) {
                  // s2[i][j][k][l] = s2[i][j][k][l] + A[a][i] * A[b][j] * A[c][k] * A[d][l] * s[a][b][c][d];
                  s2[i][j][k][l] = s2[i][j][k][l] + A[i][a] * A[j][b] * A[k][c] * A[l][d] * s[a][b][c][d];  
                }
          
          m = MI[i][j];
          n = MI[k][l];
          c2[m][n] = (1/MK[i][j]) * (1/MK[k][l]) * s2[i][j][k][l];
        }

  return c2;
}

const prepareComposite = (matrices, ratio, orientation) => {
  let [c1, c2]  = matrices;
  const f1 = ratio;
  const f2 = 1-ratio;

  c1 = rotateTensors(c1, orientation);
  c2 = rotateTensors(c2, orientation);

  let C1 = math.matrix(c1);
  let C2 = math.matrix(c2);
  
  C1 = math.inv(C1); 
  C2 = math.inv(C2);

  let P1 = [
    [1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [c1[2][0], c1[2][1], c1[2][2], c1[2][3], c1[2][4], c1[2][5]],
    [c1[3][0], c1[3][1], c1[3][2], c1[3][3], c1[3][4], c1[3][5]],
    [c1[4][0], c1[4][1], c1[4][2], c1[4][3], c1[4][4], c1[4][5]],
    [0, 0, 0, 0, 0, 1]
  ];

  let P2 = [
    [1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [c2[2][0], c2[2][1], c2[2][2], c2[2][3], c2[2][4], c2[2][5]],
    [c2[3][0], c2[3][1], c2[3][2], c2[3][3], c2[3][4], c2[3][5]],
    [c2[4][0], c2[4][1], c2[4][2], c2[4][3], c2[4][4], c2[4][5]],
    [0, 0, 0, 0, 0, 1]
  ];

  P1 = math.matrix(P1);
  P2 = math.matrix(P2);

  P1 = math.inv(P1);

  let M = math.multiply(P1, P2);

  let I = [];
  for (let i = 0; i < 6; i++) {
    const row = [0, 0, 0, 0, 0, 0];
    row[i] = 1; 
    I.push(row);
  }

  I = math.matrix(I); 

  C1 = math.multiply(f1, C1);
  C1 = math.multiply(C1, M);

  C2 = math.multiply(f2, C2);

  let C = math.add(C1, C2);
  M = math.multiply(f1, M);
  I = math.multiply(f2, I);

  let T = math.add(M, I);
  T = math.inv(T);

  return math.multiply(C, T);
}

const newYoungsModulus = (tensors, totalCount = 10000, orientation) => {
  const S = math.inv(tensors);

  const s = [
    [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]],
    [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]],
    [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]]
  ];

  let m, n, coefIJ, coefKL;

  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      for (let k = 0; k < 3; k++)
        for (let l = 0; l < 3; l++) {
          if (i === j) {
            m = i;
            coefIJ = 1;
          } else {
            coefIJ = 0.5;
            if ((i === 0) && (j === 1)) m = 5;
            if ((i === 0) && (j === 2)) m = 4;
            if ((i === 1) && (j === 2)) m = 3;
            if ((i === 1) && (j === 0)) m = 5;
            if ((i === 2) && (j === 0)) m = 4;
            if ((i === 2) && (j === 1)) m = 3;
          }

          if (k === l) {
            n = k;
            coefKL = 1;
          }
          else {
            coefKL = 0.5;
            if ((k === 0) && (l === 1)) n = 5;
            if ((k === 0) && (l === 2)) n = 4;
            if ((k === 1) && (l === 2)) n = 3;
            if ((k === 1) && (l === 0)) n = 5;
            if ((k === 2) && (l === 0)) n = 4;
            if ((k === 2) && (l === 1)) n = 3;
          }
          s[i][j][k][l] = coefIJ * coefKL * math.subset(S, math.index(m, n));
        }
        
  const result = {
    x: [],
    y: [],
    z: [],
    Y: [],
    compressiblity: [],
  };

  for (let count = 0; count < totalCount; count++) {
    const {i, j, k} = orientation || randomPointSphere();

    const A = [
      [0, 0, i],
      [0, 0, j],
      [0, 0, k]
    ];

    const s2 = [
      [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]],
      [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]],
      [[[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 0], [0, 0, 0]]]
    ];

    let sumYoung = 0;
    let sumCompressibility = 0;
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        for (let k = 0; k < 3; k++)
          for (let l = 0; l < 3; l++) {
            sumYoung = sumYoung + A[i][2] * A[j][2] * A[k][2] * A[l][2] * s[i][j][k][l];
            sumCompressibility = sumCompressibility + A[i][2] * A[j][2] * s[i][j][k][k];
         }
    
    result.x.push(i);
    result.y.push(j);
    result.z.push(k);
    result.Y.push(Math.round(Math.abs(1/sumYoung) * 100) / 100);
    result.compressiblity.push(sumCompressibility.toFixed(10))
  }

  return result;
}

onmessage = function(event) {
  if (event.data.constructor === Object) {
    
    const { elasticities, ratio, rotation } = event.data;

    const prepared = prepareComposite(elasticities, ratio, rotation);
    const calculated = youngsModulus(prepared);
    calculated.compositeElasticity = prepared._data;

    const rangeRun = {
      x: [],
      Y: []
    };

    // for (let f = 0; f <= 1; f = f + 0.01) {
    //   const prepared = prepareComposite(event.data, f, 1-f, event.data.orientation);
    //   const calculated = youngsModulus(prepared, 1, { i: 0, j: 0, k: 1 });
    //   rangeRun.x.push(f);
    //   rangeRun.Y.push(calculated.Y.pop());
    // }
    calculated.rangeRun = rangeRun;
    postMessage(calculated);  
  } else {
    postMessage(newYoungsModulus(event.data))
  }
} 

onerror = function(err) {
  console.log(err);
}