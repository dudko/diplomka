import math from "mathjs";
import randomPointOnSphere from "./randomPointOnSphere";
import * as types from "../actions/actionTypes";

// Matrices used for faster tensor conversion
export const MI = [[0, 5, 4], [5, 1, 3], [4, 3, 2]];

export const MK = [[1, 0.5, 0.5], [0.5, 1, 0.5], [0.5, 0.5, 1]];

const rotateTensor = (c, direction) => {
  const S = math.inv(c);

  // Normalize vector
  let [i, j, k] = direction;

  let length = math.sqrt(i * i + j * j + k * k);
  i /= length;
  j /= length;
  k /= length;

  length = math.sqrt(i * i + j * j);
  i = length === 0 ? 0 : i / length;
  j = length === 0 ? 0 : j / length;

  const s = [
    [
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    ],
    [
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    ],
    [
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    ]
  ];

  const s2 = [
    [
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    ],
    [
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    ],
    [
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    ]
  ];

  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      for (let k = 0; k < 3; k++)
        for (let l = 0; l < 3; l++) {
          const m = MI[i][j];
          const n = MI[k][l];
          s[i][j][k][l] = MK[i][j] * MK[k][l] * S[m][n];
        }

  const theta = math.acos(k);
  const sinTheta = math.sin(theta);

  let A = [
    [k + (1 - k) * j * j, -(1 - k) * i * j, -i * sinTheta],
    [-(1 - k) * i * j, k + (1 - k) * i * i, -sinTheta * j],
    [sinTheta * i, sinTheta * j, k]
  ];

  A = math.transpose(A);

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
                  s2[i][j][k][l] +=
                    A[i][a] * A[j][b] * A[k][c] * A[l][d] * s[a][b][c][d];
                }

          const m = MI[i][j];
          const n = MI[k][l];
          c2[m][n] = 1 / MK[i][j] * (1 / MK[k][l]) * s2[i][j][k][l];
        }

  return math.inv(c2);
};

const createComposite = (C1, C2, ratio) => {
  let P1 = math.matrix([
    [1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [C1[2][0], C1[2][1], C1[2][2], C1[2][3], C1[2][4], C1[2][5]],
    [C1[3][0], C1[3][1], C1[3][2], C1[3][3], C1[3][4], C1[3][5]],
    [C1[4][0], C1[4][1], C1[4][2], C1[4][3], C1[4][4], C1[4][5]],
    [0, 0, 0, 0, 0, 1]
  ]);

  let P2 = math.matrix([
    [1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [C2[2][0], C2[2][1], C2[2][2], C2[2][3], C2[2][4], C2[2][5]],
    [C2[3][0], C2[3][1], C2[3][2], C2[3][3], C2[3][4], C2[3][5]],
    [C2[4][0], C2[4][1], C2[4][2], C2[4][3], C2[4][4], C2[4][5]],
    [0, 0, 0, 0, 0, 1]
  ]);

  P1 = math.inv(P1);
  C1 = math.matrix(C1);
  C2 = math.matrix(C2);

  let M = math.multiply(P1, P2);

  let I = math.matrix([
    [1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1]
  ]);

  const f1 = ratio;
  const f2 = 1 - ratio;

  C1 = math.multiply(f1, C1);
  C1 = math.multiply(C1, M);

  C2 = math.multiply(f2, C2);

  let C = math.add(C1, C2);
  M = math.multiply(f1, M);
  I = math.multiply(f2, I);

  let T = math.add(M, I);
  T = math.inv(T);

  const result = math.multiply(C, T)._data;

  return result;
};

const calculate = (tensors, totalCount = 20000, direction) => {
  const S = math.inv(tensors);

  const s = [
    [
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    ],
    [
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    ],
    [
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    ]
  ];

  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      for (let k = 0; k < 3; k++)
        for (let l = 0; l < 3; l++) {
          const m = MI[i][j];
          const n = MI[k][l];
          s[i][j][k][l] = MK[i][j] * MK[k][l] * S[m][n];
        }

  const result = {
    x: [],
    y: [],
    z: [],
    youngs: [],
    compress: []
  };

  for (let count = 0; count < totalCount; count++) {
    const [i, j, k] = direction || randomPointOnSphere();

    const A = [[0, 0, i], [0, 0, j], [0, 0, k]];

    let sumYoung = 0;
    let sumCompress = 0;

    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        for (let k = 0; k < 3; k++) {
          sumCompress += A[i][2] * A[j][2] * s[i][j][k][k];
          for (let l = 0; l < 3; l++) {
            sumYoung += A[i][2] * A[j][2] * A[k][2] * A[l][2] * s[i][j][k][l];
          }
        }

    result.x.push(i);
    result.y.push(j);
    result.z.push(k);
    result.youngs.push(Math.round(Math.abs(1 / sumYoung) * 100) / 100);
    result.compress.push(sumCompress.toFixed(10) * 1000);
  }

  return result;
};

onmessage = ({ data: action }) => {
  let { index, matrix, rotation } = action.payload;
  matrix = rotateTensor(matrix, rotation);

  postMessage({
    type: types.SET_ROTATED,
    index,
    matrix,
    rotation
  });

  // if (materials.length == 1) {
  //   postMessage(calculate(materials.pop()));
  // } else {
  //   let composite = createComposite(materials.pop(), materials.pop(), 0.5);
  //   composite = materials.reduce((result, material) => {
  //     return createComposite(material, result, 0.5);
  //   }, composite);

  //   // elasticities = elasticities.map(e => rotateTensor(e, rotation));
  //   const results = calculate(composite);
  //   // results.compositeElasticity = compositeElasticity;
  //   // results.rotatedTensors = elasticities;

  //   // results.ratioVariations = ratioVariations;

  //   postMessage(results);
  // }
};

onerror = e => console.log(e);
