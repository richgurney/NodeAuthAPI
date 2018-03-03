var User     = require('../models/user');
var mongoose = require('mongoose');
var jwt      = require('jsonwebtoken');
var config   = require('../config/config');
var secret   = config.secret

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


module.exports = {
  setup: setup,
  users: users,
}
