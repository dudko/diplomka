const router = require('express').Router();
const young = require('../../module/1phase');
const youngNew = require('../../module/1phaseNew');
const math = require('mathjs');
const https = require('https');
const http = require('http');
const queryString = require('query-string');
const cheerio = require('cheerio');

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

router.get('/searchMaterialProject/:keyword', (req, res) => {
  const keyword = req.params.keyword;

  let body = [
    `criteria=%7B%22pretty_formula%22%3A%22${keyword}%22%7D`,
    '&properties=%5B%22pretty_formula%22%2C+%22elasticity.elastic_tensor%22%2C+%22spacegroup.crystal_system%22%2C+%22task_ids%22%5D'
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

router.post('/elateAnalyse', (req, res, next) => {
  const matrix = req.body;

  let body = matrix.map(row => row.join('+')).join('%0D%0A');
  body = `matrix=${body}`;

  const options = {
    hostname: 'progs.coudert.name',
    port: 80,
    path: '/elate',
    method: 'POST',
    headers: {
      'Content-Type': 'text/html'
    },
  };

  const analyseRequest = http
    .request(options, response => {
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        $ = cheerio.load(data);
        const tables = [];
        $('table', 'body').each(function() {
          tables.push($(this).html());
        });        
        return res.send(tables);  
      });
      response.on('error', e => res.setStatus(500).send(e));
    });
    
    analyseRequest.write(body);
    analyseRequest.end();
});

module.exports = router;
