var express    = require('express');
var path       = require('path');
var app        = module.exports = express();
var bodyParser = require('body-parser');
var morgan     = require('morgan')
var mongoose   = require('mongoose'); // DB control program
var jwt        = module.exports = require('jsonwebtoken');
var config     = require('./config/config');
var User       = require('./models/user');

require('dotenv').config()
// var authMiddleware = require('./middlewares/auth')
var port = process.env.PORT || 8888;
mongoose.connect(config.database, { useMongoClient: true });
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

var routes = require('./config/routes');

// app.use(authMiddleware)
app.use('/api/', routes);

app.listen(port)
console.log("Connection made on localhost:8888")
