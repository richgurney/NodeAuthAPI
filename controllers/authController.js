var User     = require('../models/user');
var mongoose = require('mongoose');
var jwt      = require('jsonwebtoken');
var config   = require('../config/config');
var secret   = config.secret

function auth(req, res) {
  User.findOne({
    name: req.body.name || req.query.name
  }, function(err, user){

    if (err) throw err;

    if(!user){
      res.json({ success: false, message: 'Authentication failed. User not found'});
    } else if (user) {

      // check password
      if(user.password != (req.body.password || req.query.password)) {
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
  auth: auth
}
