import math from 'mathjs';
import { MK, MI } from '../constants/tensorMatrices';

const rotateTensor = (c, direction) => {

  const S = math.inv(c);

  // Normalize vector
  let [i, j, k] = direction;
  
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

  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      for (let k = 0; k < 3; k++)
        for (let l = 0; l < 3; l++) {
          const m = MI[i][j]
          const n = MI[k][l]
          s[i][j][k][l] = MK[i][j] * MK[k][l] * S[m][n];
        }

  const theta = math.acos(k);
  const sinTheta = math.sin(theta);

  let A = [ 
    [ k + (1 - k) * i * i, (1 - k) * i * j + sinTheta * -k, (1 - k) * i * k + j * sinTheta],
    [ (1 - k) * i * j + sinTheta * k, k + (1 - k) * j *j, (1 - k) * j * k + sinTheta * -i],
    [ (1 - k) * i * k + sinTheta * -j, (1 - k) * k * j + sinTheta * i, k + (1 - k) * k * k]
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
                  s2[i][j][k][l] = s2[i][j][k][l] + A[a][i] * A[b][j] * A[c][k] * A[d][l] * s[a][b][c][d];
                  // s2[i][j][k][l] = s2[i][j][k][l] + A[i][a] * A[j][b] * A[k][c] * A[l][d] * s[a][b][c][d];  
                }
          
          const m = MI[i][j];
          const n = MI[k][l];
          c2[m][n] = (1/MK[i][j]) * (1/MK[k][l]) * s2[i][j][k][l];
        }

  return math.inv(c2);
}

export default rotateTensor;