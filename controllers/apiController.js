const User = require('../models/user');
const bcrypt = require('bcrypt');

require('dotenv').config();

function setup(req, res) {
  bcrypt.hash(process.env.PASSWORD, 10, (bcryptErr, hash) => {
    if (bcryptErr) throw bcryptErr;
    const user = new User({
      name: process.env.USERNAME,
      password: hash,
      admin: true,
    });

    user.save((err) => {
      if (err) throw err;
      res.json({ success: true });
      // res.json(user);
    });
  });
}

function getUsers(req, res) {
  User.find({}, (err, users) => {
    if (err) throw err;
    res.json(users);
  });
}

function clearUsers(req, res) {
  User.remove({}, (err) => {
    if (err) throw err;
    res.json({ success: true });
  });
}

module.exports = { setup, getUsers, clearUsers };
