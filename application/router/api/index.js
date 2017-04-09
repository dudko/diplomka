const router = require('express').Router();
const young = require('../../module/1phase');
const youngNew = require('../../module/1phaseNew');
const Face = require('../../model/Face');
const math = require('mathjs');

router.get('/faces', (req, res) => {   
  Face.find().then(faces => res.send(faces));
})

router.post('/calc', (req, res, next) => {
  const Ys = {
    x: [],
    y: [],
    z: [],
    Y: []
  };

  for (i = 0; i< 100; i++) {
    let {x, y, z, Y} = young(req.body.matrix);
    Ys.x.push(x);
    Ys.y.push(y);
    Ys.z.push(z);
    Ys.Y.push(Y);
  }

  return res.json(Ys);
})

router.post('/calcNew', (req, res, next) => {
  const Ys = {
    x: [],
    y: [],
    z: [],
    Y: []
  };

  for (i = 0; i< 10000; i++) {
    let {x, y, z, E} = youngNew(req.body.matrix);
    Ys.x.push(x);
    Ys.y.push(y);
    Ys.z.push(z);
    Ys.Y.push(E);
  }

  return res.json(Ys);
})

router.post('/calcComposite', (req, res, next) => {
  const { matrix1: c1, matrix2: c2 } = req.body;

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

  let f1 = 0.5;
  let f2 = 0.5;

  C1 = math.multiply(f1, C1);
  C1 = math.multiply(C1, M);

  C2 = math.multiply(f2, C2);

  let C = math.add(C1, C2);
  M = math.multiply(f1, M);
  I = math.multiply(f2, I);

  let T = math.add(M, I);
  T = math.inv(T);

  C12 = math.multiply(C, T);
  
  const Ys = {
    x: [],
    y: [],
    z: [],
    Y: []
  };

  for (i = 0; i< 10000; i++) {
    let {x, y, z, E} = youngNew(C12);
    Ys.x.push(x);
    Ys.y.push(y);
    Ys.z.push(z);
    Ys.Y.push(E);
  }

  return res.json(Ys);
})

module.exports = router;
