const math = require('mathjs');

function randomPointSphere() {
  let i, j, k = 0;
  let running = true;

  while (running) {
    u = Math.random() * (Math.random() < 0.5 ? 1 : -1);
    v = Math.random() * (Math.random() < 0.5 ? 1 : -1);
    
    if (u*u + v*v >= 1) continue;

    i = 2 * u * Math.sqrt(1 - u*u - v*v);
    j = 2 * v * Math.sqrt(1 - u*u - v*v); 
    k = 1 - 2 * (u*u + v*v);

    running = false;
  }

  return {i, j, k};
}

module.exports = (elasticConstants) => {
  const C = math.matrix(elasticConstants);
  const {i, j, k} = randomPointSphere();
  const theta = math.acos(k);
  const sinTheta = math.sin(theta);

  let O = [ 
    [ k + (1 - k) * i * i, (1 - k) * i * j + sinTheta * -k, (1 - k) * i * k + j * sinTheta],
    [ (1 - k) * i * j + sinTheta * k, k + (1 - k) * j *j, (1 - k) * j * k + sinTheta * -i],
    [ (1 - k) * i * k + sinTheta * -j, (1 - k) * k * j + sinTheta * i, k + (1 - k) * k * k]
  ];

  let K = [
    [ O[0][0]*O[0][0], O[0][1]*O[0][1], O[0][2]*O[0][2], 2*O[0][1]*O[0][2], 2*O[0][2]*O[0][0], 2*O[0][0]*O[0][1] ],
    [ O[1][0]*O[1][0], O[1][1]*O[1][1], O[1][2]*O[1][2], 2*O[1][1]*O[1][2], 2*O[1][2]*O[1][0], 2*O[1][0]*O[1][1] ],
    [ O[2][0]*O[2][0], O[2][1]*O[2][1], O[2][2]*O[2][2], 2*O[2][1]*O[2][2], 2*O[2][2]*O[2][0], 2*O[2][0]*O[2][1] ],
    [ O[1][0]*O[2][0], O[1][1]*O[2][1], O[1][2]*O[2][2], O[1][1]*O[2][2]+O[1][2]*O[2][1], O[1][2]*O[2][0]+O[1][0]*O[2][2], O[1][0]*O[2][1]+O[1][1]*O[2][0] ],
    [ O[2][0]*O[0][0], O[2][1]*O[0][1], O[2][2]*O[0][2], O[2][1]*O[0][2]+O[2][2]*O[0][1], O[2][2]*O[0][0]+O[2][0]*O[0][2], O[2][0]*O[0][1]+O[2][1]*O[0][0] ],
    [ O[0][0]*O[1][0], O[0][1]*O[1][1], O[0][2]*O[1][2], O[0][1]*O[1][2]+O[0][2]*O[1][1], O[0][2]*O[1][0]+O[0][0]*O[1][2], O[0][0]*O[1][1]+O[0][1]*O[1][0] ]
  ];



  O = math.matrix(O);
  K = math.matrix(K);
  const KT = math.transpose(K);
  let CS = math.multiply(K, C);
  CS = math.multiply(CS, KT);

  const S = math.inv(CS);
  let Y = 1/math.subset(S, math.index(2, 2));
  
  const x = Y * i;
  const y = Y * j;
  const z = Y * k;
  Y = math.abs(Y);

  return {x, y, z, Y}
}