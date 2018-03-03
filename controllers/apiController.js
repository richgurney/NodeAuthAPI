var Cars     = require('../models/cars');
var User     = require('../models/user');
var mongoose = require('mongoose');
var jwt      = require('jsonwebtoken');
var express  = require('express')
var app      = express();
var config   = require('../config/config');
var secret   = config.secret

//Show all the cars on the index page
function welcome(req, res) {
  res.json({ message: 'Welcome to API'})
}

function setup(req, res) {
  var rich = new User({
    name: 'Richard',
    password: 'password',
    admin: true
  });

  rich.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true })
  });
}

function users(req, res) {
  User.find({}, function(err, users){
    res.json(users)
  })
}

function auth(req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user){

    if (err) throw err;

    if(!user){
      res.json({ success: false, message: 'Authentication failed. User not found'});
    } else if (user) {

      // check password
      if(user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password'});
      } else {
        // set payload
        const payload = {
          admin: user.admin
        }
        // create token

        var token = jwt.sign(payload, secret, {
          expiresIn: 1440
        })
        // respond with success and token
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  })
}
module.exports = {
  welcome: welcome,
  setup: setup,
  users: users,
  auth: auth
}
