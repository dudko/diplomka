const router = require('express').Router();
const bodyParser = require('body-parser');
const contentType = require('../middleware/contentTypeValidator');

/**
 * Routes.
 */
const web = require('./web');
const api = require('./api');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Content type validation
router.use(contentType({
  types: ['application/json', 'application/x-www-form-urlencoded']
}));


router.use('/api', api);
router.use('/', web);

router.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

module.exports = router;
