const router = require('express').Router();
const bodyParser = require('body-parser');
const contentType = require('../middleware/contentTypeValidator');
const path = require('path');

/**
 * Routes.
 */
const api = require('./api');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Content type validation
router.use(contentType({
  types: ['application/json', 'application/x-www-form-urlencoded'],
}));

router.use('/api', api);
router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

router.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

module.exports = router;
