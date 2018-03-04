const User = require('../models/user');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

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
      if (user.password !== (req.body.password || req.query.password)) {
        res.json({ success: false, message: 'Authentication failed. Wrong password' });
      } else {
        // Set payload
        const payload = {
          admin: user.admin,
        };
        // Create token
        const token = jwt.sign(payload, secret, {
          expiresIn: 1440,
        });
        // Respond with success and token
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token,
        });
      }
    }
  });
}

module.exports = { auth };
