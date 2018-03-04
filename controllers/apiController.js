const User = require('../models/user');

function setup(req, res) {
  const user = new User({
    name: 'username',
    password: 'password',
    admin: true,
  });

  user.save((err) => {
    if (err) throw err;
    res.json({ success: true });
  });
}

function getUsers(req, res) {
  User.find({}, (err, users) => {
    if (err) throw err;
    res.json(users);
  });
}

module.exports = { setup, getUsers };
