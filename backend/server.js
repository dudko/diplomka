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
const mongoose = require('mongoose');

/**
 * Express server
 */
const app = express();

app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'router/web/views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/**
 * Routes
 */
app.use(router);

/**
 * Error Handler
 */
app.use((err, req, res, next) => {
  console.log(err);
  return res.json(err);
});

/**
 * MongoDb
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log('MongoDB connection established!');
});
mongoose.connection.on('error', () => {
  console.log('MongoDB connection error.');
  process.exit();
});


app.listen(app.get('port'), () => {
  console.log('[RUNNING] PORT: %d MODE: %s TIME: %s', app.get('port'), app.get('env'), Date());
});

module.exports = app;
