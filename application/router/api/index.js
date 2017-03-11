const router = require('express').Router();
const young = require('../../module/1phase');
const Face = require('../../model/Face');

router.get('/faces', (req, res) => {   
  Face.find().then(faces => res.send(faces));
})

router.post('/calc', (req, res, next) => {
  const Ys = [];
  for (i = 0; i< 1000; i++) Ys.push(young(req.body.matrix));

  return res.json(Ys);
})

module.exports = router;
