import math from 'mathjs';
import randomPointOnSphere from '../calculations/randomPointOnSphere';

const youngsModulus = (tensors, totalCount = 10000, orientation) => {
  const S = math.inv(tensors);

  const result = {
    x: [],
    y: [],
    z: [],
    Y: []
  };

  for (let count = 0; count < totalCount; count++) {
    const {i, j, k} = orientation || randomPointOnSphere();

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



