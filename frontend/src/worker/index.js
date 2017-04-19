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

const young = (elasticConstants) => {
  const C = elasticConstants;
  const S = math.inv(C);

  const result = {
    x: [],
    y: [],
    z: [],
    Y: []
  };

  for (let points = 0; points < 10000; points++) {
    const {i, j, k} = randomPointSphere();

    const pow = math.pow;

    let E =
      pow(i, 4) * math.subset(S, math.index(0, 0)) +
      pow(j, 4) * math.subset(S, math.index(1, 1)) +
      pow(k, 4) * math.subset(S, math.index(2, 2)) +
      pow(i, 2) * pow(j, 2) * math.subset(S, math.index(0, 1)) +
      pow(i, 2) * pow(k, 2) * math.subset(S, math.index(0, 2)) +
      pow(j, 2) * pow(i, 2) * math.subset(S, math.index(1, 0)) +
      pow(j, 2) * pow(k, 2) * math.subset(S, math.index(1, 2)) +
      pow(i, 2) * pow(k, 2) * math.subset(S, math.index(2, 0)) +
      pow(k, 2) * pow(j, 2) * math.subset(S, math.index(2, 1)) +
      pow(j, 2) * pow(k, 2) * math.subset(S, math.index(3, 3)) +
      pow(i, 2) * pow(k, 2) * math.subset(S, math.index(4, 4)) +
      pow(i, 2) * pow(j, 2) * math.subset(S, math.index(5, 5));

    E = Math.round(Math.abs(1/E) * 100) / 100;
    result.x.push(E * i);
    result.y.push(E * j);
    result.z.push(E * k);
    result.Y.push(E);
  }

  return result;
}

onmessage = function(event) {
  postMessage(young(event.data))
}