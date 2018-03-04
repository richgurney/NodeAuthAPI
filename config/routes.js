const express = require('express');
const authMiddleware = require('../middlewares/auth');
const apiController = require('../controllers/apiController');
const authController = require('../controllers/authController');
const postsController = require('../controllers/postsController');

const router = express.Router();

router.route('/authenticate')
  .post(authController.auth);

router.route('/posts')
  .get(postsController.allPosts);

router.route('/posts/:id')
  .get(postsController.onePost);

// Protect the routes below
router.use(authMiddleware);

// TODO - Remove this route in future
router.route('/setup')
  .get(apiController.setup);

// Show all users
router.route('/users')
  .get(apiController.getUsers);

module.exports = router;
