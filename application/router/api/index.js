const router = require('express').Router();
const young = require('../../module/1phase');
const youngNew = require('../../module/1phaseNew');
const Face = require('../../model/Face');
const https = require('https');
const queryString = require('query-string');

router.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

router.options('/*', (req, res) => {
  res.status(200).end();
});

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

router.get('/searchMaterialProject/:keyword', (req, res) => {
  const keyword = req.params.keyword;

  let body = [
    `criteria=%7B%22pretty_formula%22%3A%22${keyword}%22%7D`,
    '&properties=%5B%22pretty_formula%22%2C+%22elasticity.elastic_tensor%22%2C+%22spacegroup.crystal_system%22%5D'
  ].join('');

  const options = {
    hostname: 'materialsproject.org',
    port: 443,
    path: '/rest/v2/query',
    method: 'POST',
    headers: {
      'X-API-KEY': 'KtCgAZa0MTWiO5cr',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': body.length,
      'Cache-Control': 'no-cache',
    },
  };

  const searchRequest = https
    .request(options, response => {
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        data = JSON.parse(data).response.filter(
          result => result['elasticity.elastic_tensor']);
        return res.send(data);  
      });
      response.on('error', e => res.setStatus(500).send(e));
    });
    
    searchRequest.write(body);
    searchRequest.end();
});

module.exports = router;
