const router = require('express').Router();
const young = require('../../module/1phase');
const youngNew = require('../../module/1phaseNew');
const Face = require('../../model/Face');

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

  for (i = 0; i< 1000; i++) {
    let {x, y, z, E} = youngNew(req.body.matrix);
    Ys.x.push([x]);
    Ys.y.push([y]);
    Ys.z.push([z]);
    Ys.Y.push(E);
  }

  return res.json(Ys);
})

module.exports = router;
