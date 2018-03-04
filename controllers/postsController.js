function allPosts(req, res) {
  res.json({ message: 'This will show all the posts' });
}

function onePost(req, res) {
  res.json({ message: `This will show one post Id..${req.params.id}` });
}

module.exports = { allPosts, onePost };
