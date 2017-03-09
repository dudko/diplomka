const router = require('express').Router();

/**
 * Controllers
 */
const mainCtrl = require('./controllers/mainCtrl');

router.get('/', mainCtrl.getMain);
router.post('/', mainCtrl.postMain);

router.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

module.exports = router;
