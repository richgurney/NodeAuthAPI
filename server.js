const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose'); // DB control program
const appConfig = require('./config/config');

const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;

app.set('superSecret', appConfig.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
  mongoose.connect(appConfig.database, { useMongoClient: true });
} else {
  mongoose.connect(appConfig.testDatabase, { useMongoClient: true });
}

const routes = require('./config/routes');

app.use('/api', routes);

app.listen(port, () => {
  console.log(`App listening on port - ${port}`);
});

module.exports = app;
