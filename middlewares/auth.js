var jwt      = require('jsonwebtoken');
var express  = require('express')
var app      = express();
var config   = require('../config/config');
var secret   = config.secret

module.exports = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  console.log(token)
  // decode token
  if (token) {
    jwt.verify(token, secret, function(err, decoded){
      if(err){
        return res.json({ success: false, message: 'Failed to authenticate token'});
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided'
    });
  }
}
