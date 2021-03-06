const jwt = require('jsonwebtoken');
const config = require('../config/config');

const secret = config.secret;

module.exports = function auth(req, res, next) {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.json({ success: false, message: 'Failed to authenticate token' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).send({
      success: false,
      message: 'No token provided',
    });
  }
};
