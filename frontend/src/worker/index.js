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

const youngsModulus = (tensors, totalCount = 10000, direction) => {
  const S = math.inv(tensors);

  const result = {
    x: [],
    y: [],
    z: [],
    Y: []
  };

  for (let count = 0; count < totalCount; count++) {
    const {i, j, k} = direction || randomPointSphere();

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

const prepareComposite = (matrices, f1 = 0.5, f2 = 0.5) => {
  const { '1': c1, '2': c2 } = matrices;

  let C1 = math.matrix(c1);
  let C2 = math.matrix(c2);
  
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

onmessage = function(event) {
  if (event.data.constructor === Object) {
    const prepared = prepareComposite(event.data, event.data.ratio, 1-event.data.ratio);
    const calculated = youngsModulus(prepared);
    calculated.compositeElasticity = prepared._data;

    const rangeRun = {
      x: [],
      Y: []
    };

    for (let f = 0; f <= 1; f = f + 0.01) {
      const prepared = prepareComposite(event.data, f, 1-f);
      const calculated = youngsModulus(prepared, 1, { i: 0, j: 0, k: 1 });
      rangeRun.x.push(f);
      rangeRun.Y.push(calculated.Y.pop());
    }
    calculated.rangeRun = rangeRun;
    postMessage(calculated);  
  } else {
    postMessage(youngsModulus(event.data))
  }
} 

onerror = function(err) {
  console.log(err);
}