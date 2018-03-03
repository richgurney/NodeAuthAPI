var express    = require('express');
var path       = require('path');
var app        = express();
var bodyParser = require('body-parser');
var morgan     = require('morgan')
var mongoose   = require('mongoose'); // DB control program

var jwt        = require('jsonwebtoken');
var config     = require('./config/config');
var User       = require('./models/user');

var port = process.env.PORT || 8888;
mongoose.connect(config.database, { useMongoClient: true });
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

var routes = require('./config/routes');
app.use('/api/', routes);

app.listen(port)
console.log("Connection made on localhost:8888")

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log('DATABASE CONNECTED!!');
// });

// Layout manager
// app.set('view engine', 'ejs');
// app.use(ejsLayouts);
// app.set('views', './views');

// Creates an absolute path to your public folder so you can run
// script from anywhere
// app.use(express.static(path.join(__dirname,'public')));
// parse application/x-www-form-urlencoded

// Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
// app.use(methodOVR('_method'))

// Setting up routes
//
//
//
// server.listen(port, function(){
//   console.log('App listening Port:3333');
// });
