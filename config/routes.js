var express = require('express');
var router = express.Router();
var authMiddleware = require('../middlewares/auth');
var apiController = require('../controllers/apiController');
var authController = require('../controllers/authController');
var postsController = require('../controllers/postsController');

router.route('/authenticate')
  .post(authController.auth)

router.route('/posts')
  .get(postsController.allPosts)

router.route('/posts/:id')
  .get(postsController.onePost)

// Protect the routes below
router.use(authMiddleware)

// TODO - Remove this route in future
router.route('/setup')
  .get(apiController.setup)

// Show all users
router.route('/users')
  .get(apiController.users)

module.exports = router;
