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
  res.json({ message: `This will show one post Id..${req.params.id}` });
}

module.exports = { allPosts, onePost };
