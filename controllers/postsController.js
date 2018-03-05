const mongoose = require('mongoose');
const Post = require('../models/post');

function allPosts(req, res) {
  const query = Post.find({});
  query.exec((err, posts) => {
    if (err) res.send(err);
    res.json(posts);
  });
}

function onePost(req, res) {
  Post.findById(req.params.id, (err, post) => {
    if (err) res.send(err);
    res.json(post);
  });
}

module.exports = { allPosts, onePost };
