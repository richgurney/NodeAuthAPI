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

function newPost(req, res) {
  const newPostModel = new Post({
    title: req.body.title,
    author: req.body.author,
    likes: 0,
    body: req.body.body,
  });

  newPostModel.save((err, post) => {
    if (err) {
      res.send({
        message: err,
      });
    } else {
      res.status(201).json(post);
    }
  });
}

function deletePost(req, res) {
  Post.remove({ _id: req.params.id }, (err) => {
    if (err) throw err;
    res.send('Deleted');
  });
}

function clearPosts(req, res) {
  Post.remove({}, (err) => {
    if (err) throw err;
    res.json({ sucess: true });
  });
}

function likePost(req, res) {
  const id = req.params.id;

  Post.findById(id, (err, post) => {
    if (err) throw err;

    res.json(post)

    // if (post) {
    //   post.likes += 1;
    // }
    //
    // Post.save((errorSave, savedPost) => {
    //   if (errorSave) throw errorSave;
    //   res.json(savedPost);
    // });
  });
}

module.exports = { allPosts, onePost, newPost, deletePost, clearPosts, likePost };
