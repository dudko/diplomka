const math = require('mathjs');

function randomPointSphere() {
  let i = 0;
  let j = 0;
  let k = 0;
  let running = true;

  while (running) {
    u = Math.random() * (Math.random() < 0.5 ? 1 : -1);
    v = Math.random() * (Math.random() < 0.5 ? 1 : -1);

    if (u * u + v * v >= 1) continue;

    i = 2 * u * Math.sqrt(1 - u * u - v * v);
    j = 2 * v * Math.sqrt(1 - u * u - v * v);
    k = 1 - 2 * (u * u + v * v);

    running = false;
  }

  return { i, j, k };
}

module.exports = (elasticConstants) => {
  const C = elasticConstants;
  const S = math.inv(C);

  const { i, j, k } = randomPointSphere();

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

  E = Math.round(Math.abs(1 / E) * 100) / 100;
  const x = E * i;
  const y = E * j;
  const z = E * k;

  return { x, y, z, E };
};
