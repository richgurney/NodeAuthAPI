var User     = require('../models/user');
var mongoose = require('mongoose');
var jwt      = require('jsonwebtoken');
var config   = require('../config/config');
var secret   = config.secret

//Show all the cars on the index page
function allPosts(req, res) {
  res.json({ message: 'This will show all the posts'})
}

function onePost(req, res) {
  res.json({ message: "This will show one post" + "Id.." + req.params.id})
}

module.exports = {
  allPosts: allPosts,
  onePost: onePost,
}
