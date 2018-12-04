/*
 * Sphere point picking according to Marsaglia
 * @return array with three coordinates
 */

const randomPointOnSphere = () => {
  let i = 0;
  let j = 0;
  let k = 0;

  let running = true;

  while (running) {
    const u = Math.random() * (Math.random() < 0.5 ? 1 : -1);
    const v = Math.random() * (Math.random() < 0.5 ? 1 : -1);

    if (u * u + v * v >= 1) continue;

    i = 2 * u * Math.sqrt(1 - u * u - v * v);
    j = 2 * v * Math.sqrt(1 - u * u - v * v);
    k = 1 - 2 * (u * u + v * v);

    running = false;
  }

  return [i, j, k];
};

module.exports = randomPointOnSphere;
