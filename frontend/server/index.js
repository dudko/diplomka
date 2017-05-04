/**
 * Load environment variables
 */
const path = require('path');
const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
  dotenv.load({ path: path.join(__dirname, '.env') });
}

/**
 * Module dependencies
 */
const express = require('express');
const compression = require('compression');
const morgan = require('morgan'); // only HTTP requests
const router = require('./router');

/**
 * Express server
 */
const app = express();

app.set('port', process.env.PORT || 8080);
app.use(compression());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../build'), { maxAge: 31557600000 }));

app.use(router);

app.use((err, req, res, next) => {
  console.log(err);
  return res.json(err);
});

app.listen(app.get('port'), () => {
  console.log('[RUNNING] PORT: %d MODE: %s TIME: %s', app.get('port'), app.get('env'), Date());
});

module.exports = app;
