const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose'); // DB control program
const appConfig = require('./config/config');
// const config = require('config');

const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;

mongoose.connect(appConfig.database, { useMongoClient: true });
app.set('superSecret', appConfig.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

const routes = require('./config/routes');

// app.use(authMiddleware)
app.use('/api', routes);

app.listen(port);
console.log("Connection made on localhost:3000");

module.exports = app
