const User = require('../models/user');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secret = config.secret;

function auth(req, res) {
  User.findOne({
    name: req.body.name || req.query.name,
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found' });
    } else if (user) {
      // Check password
      bcrypt.compare((req.body.password || req.query.password), user.password, (bcryptErr, bcryptRes) => {
        if (bcryptRes) {
          // If passwords match
          // Set payload
          const payload = {
            admin: user.admin,
          };
          // Create JWT token
          const token = jwt.sign(payload, secret, {
            expiresIn: 1440,
          });
          // Respond with success and token
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token,
          });
        } else {
          res.json({ success: false, message: 'Authentication failed. Wrong password' });
        }
      });
    }
  });
}

module.exports = { auth };
