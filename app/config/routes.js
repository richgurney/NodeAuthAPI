const express = require('express');
const authMiddleware = require('../middlewares/auth');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const postsController = require('../controllers/postsController');

const router = express.Router();

router.route('/users/setup')
  .post(userController.setup);

router.route('/authenticate')
  .post(authController.auth);

router.route('/posts')
  .get(postsController.allPosts);

router.route('/posts/:id')
  .get(postsController.onePost);

// Protect the routes below5
// ------------------------
router.use(authMiddleware);

router.route('/posts/clearall')
  .delete(postsController.clearPosts);

router.route('/posts')
  .post(postsController.newPost);

router.route('/posts/:id')
  .delete(postsController.deletePost);

router.route('/users/clear')
  .delete(userController.clearUsers);

router.route('/users')
  .get(userController.getUsers);

module.exports = router;
